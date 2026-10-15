import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Restaurant, MenuItem, Order, OrderStatus, CartItem } from '@/types';
import { MOCK_RESTAURANTS, MOCK_MENU_ITEMS, MOCK_ORDERS, getRestaurantOrders, getCustomerOrders, getRestaurantMenu, getRestaurantById } from '@/data/mockData';

interface RestaurantContextType {
  restaurants: Restaurant[];
  currentRestaurant: Restaurant | null;
  menuItems: MenuItem[];
  orders: Order[];
  isLoading: boolean;
  fetchRestaurants: () => Promise<void>;
  fetchMenu: (restaurantId: string) => Promise<void>;
  fetchOrders: (userId: string, role: 'customer' | 'restaurant') => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  setCurrentRestaurant: (restaurant: Restaurant | null) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRestaurants = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setRestaurants(MOCK_RESTAURANTS);
    setIsLoading(false);
  };

  const fetchMenu = async (restaurantId: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const menu = MOCK_MENU_ITEMS.filter(item => item.restaurantId === restaurantId);
    setMenuItems(menu);
    const restaurant = MOCK_RESTAURANTS.find(r => r.id === restaurantId);
    if (restaurant) setCurrentRestaurant(restaurant);
    setIsLoading(false);
  };

  const fetchOrders = async (userId: string, role: 'customer' | 'restaurant') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const userOrders = role === 'customer'
      ? getCustomerOrders(userId)
      : getRestaurantOrders(userId);
    setOrders(userOrders);
    setIsLoading(false);
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newItem: MenuItem = {
      ...item,
      id: `item_${Date.now()}`,
    };
    MOCK_MENU_ITEMS.push(newItem);
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_MENU_ITEMS.findIndex(item => item.id === id);
    if (index >= 0) {
      MOCK_MENU_ITEMS[index] = { ...MOCK_MENU_ITEMS[index], ...updates };
      setMenuItems(prev => prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ));
    }
  };

  const deleteMenuItem = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_MENU_ITEMS.findIndex(item => item.id === id);
    if (index >= 0) {
      MOCK_MENU_ITEMS.splice(index, 1);
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        currentRestaurant,
        menuItems,
        orders,
        isLoading,
        fetchRestaurants,
        fetchMenu,
        fetchOrders,
        updateOrderStatus,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        setCurrentRestaurant,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }
  return context;
}