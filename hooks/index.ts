export { useAuth } from '@/context/AuthContext';
export { useCart } from '@/context/CartContext';
export { useRestaurant } from '@/context/RestaurantContext';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

export function useRole() {
  const { role } = useAuth();
  return role;
}

export function useRequireAuth(allowedRoles?: ('customer' | 'restaurant')[]) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();

  return { isAuthenticated, isLoading, role, router };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

import { useState, useEffect } from 'react';