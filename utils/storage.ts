import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  SESSION: '@food_delivery_session',
  CART: '@food_delivery_cart',
  USER_PREFERENCES: '@food_delivery_preferences',
} as const;

export const setItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (error) {
    console.warn(`Failed to save ${key}:`, error);
  }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const json = await AsyncStorage.getItem(key);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.warn(`Failed to load ${key}:`, error);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove ${key}:`, error);
  }
};

export const clearCart = async (): Promise<void> => {
  await removeItem(STORAGE_KEYS.CART);
};

export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.SESSION,
      STORAGE_KEYS.CART,
      STORAGE_KEYS.USER_PREFERENCES,
    ]);
  } catch (error) {
    console.warn('Failed to clear storage:', error);
  }
};