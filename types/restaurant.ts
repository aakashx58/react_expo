export interface Restaurant {
  id: string;
  name: string;
  image: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  isActive: boolean;
  ownerId: string;
  address: string;
  description: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  preparationTime: number;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}