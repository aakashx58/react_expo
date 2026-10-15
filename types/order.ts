export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: Date;
  estimatedDelivery?: Date;
  deliveryAddress: Address;
  notes?: string;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface OrderStatusConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusConfig> = {
  pending: {
    label: 'Pending',
    color: '#F57C00',
    bgColor: '#FFF3E0',
    icon: 'time-outline',
  },
  accepted: {
    label: 'Confirmed',
    color: '#1976D2',
    bgColor: '#E3F2FD',
    icon: 'checkmark-circle-outline',
  },
  preparing: {
    label: 'Preparing',
    color: '#F9A825',
    bgColor: '#FFFDE7',
    icon: 'flame-outline',
  },
  ready: {
    label: 'Ready',
    color: '#388E3C',
    bgColor: '#E8F5E9',
    icon: 'checkmark-done-outline',
  },
  delivered: {
    label: 'Delivered',
    color: '#1B5E20',
    bgColor: '#C8E6C9',
    icon: 'checkmark-done-circle-outline',
  },
  cancelled: {
    label: 'Cancelled',
    color: '#C62828',
    bgColor: '#FFEBEE',
    icon: 'close-circle-outline',
  },
};

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'pending',
  'accepted',
  'preparing',
  'ready',
  'delivered',
];