import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem } from '@/types/restaurant';
import { STORAGE_KEYS } from '@/utils/storage';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  isLoading: boolean;
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  restoreCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  const restoreCart = async () => {
    try {
      const { getItem } = await import('@/utils/storage');
      const savedCart = await getItem(STORAGE_KEYS.CART);
      if (savedCart && Array.isArray(savedCart)) {
        setItems(savedCart);
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsLoading(false);
    }
  };

  const saveCart = async (cartItems: CartItem[]) => {
    try {
      const { setItem } = await import('@/utils/storage');
      await setItem(STORAGE_KEYS.CART, cartItems);
    } catch {
      // Ignore storage errors
    }
  };

  const addItem = (menuItem: MenuItem, quantity = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.menuItem.id === menuItem.id);
      let newItems: CartItem[];

      if (existingIndex >= 0) {
        newItems = prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `cart_${menuItem.id}_${Date.now()}`,
          menuItem,
          quantity,
        };
        newItems = [...prev, newItem];
      }

      saveCart(newItems);
      return newItems;
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prev => {
      const newItems = prev.filter(item => item.id !== itemId);
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prev => {
      const newItems = prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    saveCart([]);
  };

  useEffect(() => {
    restoreCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        restoreCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}