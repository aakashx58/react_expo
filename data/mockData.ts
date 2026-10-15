import { Restaurant, MenuItem, CartItem, Category } from '@/types/restaurant';
import { Order, OrderStatus } from '@/types/order';
import { User, Role } from '@/types/user';

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Italian', icon: 'pizza-outline' },
  { id: '2', name: 'Asian', icon: 'bowl-outline' },
  { id: '3', name: 'Burgers', icon: 'fast-food-outline' },
  { id: '4', name: 'Healthy', icon: 'leaf-outline' },
  { id: '5', name: 'Desserts', icon: 'ice-cream-outline' },
  { id: '6', name: 'Drinks', icon: 'wine-outline' },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    categories: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.8,
    reviewCount: 234,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minOrder: 15.00,
    isActive: true,
    ownerId: 'restaurant_1',
    address: '123 Main St, Downtown',
    description: 'Authentic Italian cuisine with wood-fired pizzas and handmade pasta.',
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
    categories: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.9,
    reviewCount: 189,
    deliveryTime: '30-40 min',
    deliveryFee: 3.49,
    minOrder: 20.00,
    isActive: true,
    ownerId: 'restaurant_2',
    address: '456 Oak Ave, Midtown',
    description: 'Fresh sushi and traditional Japanese dishes made daily.',
  },
  {
    id: '3',
    name: 'Burger Joint',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    categories: ['American', 'Burgers', 'Fast Food'],
    rating: 4.6,
    reviewCount: 456,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minOrder: 10.00,
    isActive: true,
    ownerId: 'restaurant_3',
    address: '789 Elm St, Uptown',
    description: 'Gourmet burgers with premium beef and artisanal buns.',
  },
  {
    id: '4',
    name: 'Green Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    categories: ['Healthy', 'Vegan', 'Salads'],
    rating: 4.7,
    reviewCount: 312,
    deliveryTime: '25-35 min',
    deliveryFee: 2.49,
    minOrder: 12.00,
    isActive: true,
    ownerId: 'restaurant_4',
    address: '321 Pine Rd, Westside',
    description: 'Nourishing bowls, fresh salads, and plant-based delights.',
  },
  {
    id: '5',
    name: 'Sweet Treats Bakery',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    categories: ['Desserts', 'Bakery', 'Coffee'],
    rating: 4.9,
    reviewCount: 167,
    deliveryTime: '15-25 min',
    deliveryFee: 2.99,
    minOrder: 8.00,
    isActive: true,
    ownerId: 'restaurant_5',
    address: '555 Maple Ln, Eastside',
    description: 'Artisan pastries, cakes, and specialty coffee.',
  },
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  // Bella Italia
  { id: '1', restaurantId: '1', name: 'Margherita Pizza', description: 'San Marzano tomatoes, fresh mozzarella, basil, olive oil', price: 16.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop', category: 'Pizza', isAvailable: true, preparationTime: 15, isPopular: true },
  { id: '2', restaurantId: '1', name: 'Pepperoni Pizza', description: 'Tomato sauce, mozzarella, pepperoni, oregano', price: 18.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop', category: 'Pizza', isAvailable: true, preparationTime: 15 },
  { id: '3', restaurantId: '1', name: 'Spaghetti Carbonara', description: 'Guanciale, egg, Pecorino Romano, black pepper', price: 17.99, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop', category: 'Pasta', isAvailable: true, preparationTime: 12, isPopular: true },
  { id: '4', restaurantId: '1', name: 'Lasagna Bolognese', description: 'Layers of pasta, meat ragù, béchamel, Parmigiano', price: 19.99, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=200&h=200&fit=crop', category: 'Pasta', isAvailable: true, preparationTime: 20 },
  { id: '5', restaurantId: '1', name: 'Tiramisu', description: 'Espresso-soaked ladyfingers, mascarpone, cocoa', price: 8.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop', category: 'Desserts', isAvailable: true, preparationTime: 5 },
  { id: '6', restaurantId: '1', name: 'Caesar Salad', description: 'Romaine, croutons, Parmigiano, Caesar dressing', price: 11.99, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=200&h=200&fit=crop', category: 'Starters', isAvailable: true, preparationTime: 8 },

  // Sakura Sushi
  { id: '7', restaurantId: '2', name: 'Salmon Nigiri (6pc)', description: 'Fresh Atlantic salmon over seasoned rice', price: 14.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop', category: 'Nigiri', isAvailable: true, preparationTime: 10, isPopular: true },
  { id: '8', restaurantId: '2', name: 'Tuna Sashimi (8pc)', description: 'Premium bluefin tuna, sliced fresh', price: 18.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop', category: 'Sashimi', isAvailable: true, preparationTime: 8 },
  { id: '9', restaurantId: '2', name: 'Dragon Roll', description: 'Eel, cucumber, avocado, unagi sauce', price: 16.99, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=200&fit=crop', category: 'Rolls', isAvailable: true, preparationTime: 12 },
  { id: '10', restaurantId: '2', name: 'Miso Soup', description: 'Traditional soybean paste soup with tofu and scallions', price: 4.99, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop', category: 'Soups', isAvailable: true, preparationTime: 5 },
  { id: '11', restaurantId: '2', name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 6.99, image: 'https://images.unsplash.com/photo-1623889379874-e4f1b6b7c4a5?w=200&h=200&fit=crop', category: 'Starters', isAvailable: true, preparationTime: 5 },
  { id: '12', restaurantId: '2', name: 'Green Tea Ice Cream', description: 'Premium matcha ice cream', price: 5.99, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop', category: 'Desserts', isAvailable: true, preparationTime: 3 },

  // Burger Joint
  { id: '13', restaurantId: '3', name: 'Classic Cheeseburger', description: 'Angus beef, cheddar, lettuce, tomato, special sauce', price: 12.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop', category: 'Burgers', isAvailable: true, preparationTime: 10, isPopular: true },
  { id: '14', restaurantId: '3', name: 'Bacon BBQ Burger', description: 'Angus beef, bacon, cheddar, onion rings, BBQ sauce', price: 15.99, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop', category: 'Burgers', isAvailable: true, preparationTime: 12 },
  { id: '15', restaurantId: '3', name: 'Crispy Chicken Sandwich', description: 'Buttermilk fried chicken, pickles, spicy mayo', price: 13.99, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop', category: 'Sandwiches', isAvailable: true, preparationTime: 12 },
  { id: '16', restaurantId: '3', name: 'Truffle Fries', description: 'Crispy fries, truffle oil, Parmesan, herbs', price: 7.99, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=200&h=200&fit=crop', category: 'Sides', isAvailable: true, preparationTime: 8, isPopular: true },
  { id: '17', restaurantId: '3', name: 'Chocolate Milkshake', description: 'Rich vanilla ice cream, chocolate syrup, whipped cream', price: 6.99, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200&h=200&fit=crop', category: 'Drinks', isAvailable: true, preparationTime: 3 },

  // Green Bowl
  { id: '18', restaurantId: '4', name: 'Quinoa Power Bowl', description: 'Quinoa, roasted veggies, chickpeas, tahini dressing', price: 14.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop', category: 'Bowls', isAvailable: true, preparationTime: 10, isPopular: true },
  { id: '19', restaurantId: '4', name: 'Kale Caesar Salad', description: 'Kale, quinoa, avocado, nutritional yeast, lemon', price: 13.99, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop', category: 'Salads', isAvailable: true, preparationTime: 8 },
  { id: '20', restaurantId: '4', name: 'Acai Bowl', description: 'Acai, banana, granola, berries, honey', price: 12.99, image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=200&h=200&fit=crop', category: 'Bowls', isAvailable: true, preparationTime: 7 },
  { id: '21', restaurantId: '4', name: 'Green Juice', description: 'Kale, apple, cucumber, lemon, ginger', price: 7.99, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop', category: 'Drinks', isAvailable: true, preparationTime: 3 },

  // Sweet Treats
  { id: '22', restaurantId: '5', name: 'Chocolate Croissant', description: 'Buttery, flaky, filled with dark chocolate', price: 4.99, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop', category: 'Pastries', isAvailable: true, preparationTime: 3, isPopular: true },
  { id: '23', restaurantId: '5', name: 'Fruit Tart', description: 'Vanilla custard, fresh berries, glaze', price: 6.99, image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=200&h=200&fit=crop', category: 'Cakes', isAvailable: true, preparationTime: 4 },
  { id: '24', restaurantId: '5', name: 'Caramel Latte', description: 'Espresso, steamed milk, caramel drizzle', price: 5.99, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=200&h=200&fit=crop', category: 'Coffee', isAvailable: true, preparationTime: 3 },
];

export const MOCK_USERS: Record<string, User> = {
  customer_1: {
    id: 'customer_1',
    email: 'customer@demo.com',
    name: 'Alex Johnson',
    role: 'customer',
    phone: '+1 (555) 123-4567',
    createdAt: new Date('2024-01-15'),
  },
  restaurant_1: {
    id: 'restaurant_1',
    email: 'owner@bella.com',
    name: 'Maria Rossi',
    role: 'restaurant',
    phone: '+1 (555) 987-6543',
    createdAt: new Date('2024-01-10'),
  },
  restaurant_2: {
    id: 'restaurant_2',
    email: 'owner@sakura.com',
    name: 'Kenji Tanaka',
    role: 'restaurant',
    phone: '+1 (555) 456-7890',
    createdAt: new Date('2024-02-01'),
  },
};

const generateOrders = (): Order[] => [
  {
    id: 'ORD-001',
    customerId: 'customer_1',
    customerName: 'Alex Johnson',
    restaurantId: '1',
    restaurantName: 'Bella Italia',
    items: [
      { id: 'ci1', menuItem: MOCK_MENU_ITEMS[0], quantity: 2 },
      { id: 'ci2', menuItem: MOCK_MENU_ITEMS[2], quantity: 1 },
    ],
    status: 'delivered',
    subtotal: 53.97,
    deliveryFee: 2.99,
    total: 56.96,
    createdAt: new Date('2024-12-10T18:30:00'),
    estimatedDelivery: new Date('2024-12-10T19:15:00'),
    deliveryAddress: { street: '123 Main St', city: 'San Francisco', zipCode: '94102' },
  },
  {
    id: 'ORD-002',
    customerId: 'customer_1',
    customerName: 'Alex Johnson',
    restaurantId: '3',
    restaurantName: 'Burger Joint',
    items: [
      { id: 'ci3', menuItem: MOCK_MENU_ITEMS[12], quantity: 1 },
      { id: 'ci4', menuItem: MOCK_MENU_ITEMS[15], quantity: 1 },
    ],
    status: 'preparing',
    subtotal: 20.98,
    deliveryFee: 1.99,
    total: 22.97,
    createdAt: new Date('2024-12-12T12:15:00'),
    estimatedDelivery: new Date('2024-12-12T12:45:00'),
    deliveryAddress: { street: '123 Main St', city: 'San Francisco', zipCode: '94102' },
  },
  {
    id: 'ORD-003',
    customerId: 'customer_1',
    customerName: 'Alex Johnson',
    restaurantId: '2',
    restaurantName: 'Sakura Sushi',
    items: [
      { id: 'ci5', menuItem: MOCK_MENU_ITEMS[6], quantity: 1 },
      { id: 'ci6', menuItem: MOCK_MENU_ITEMS[9], quantity: 2 },
    ],
    status: 'pending',
    subtotal: 24.97,
    deliveryFee: 3.49,
    total: 28.46,
    createdAt: new Date('2024-12-12T19:00:00'),
    estimatedDelivery: new Date('2024-12-12T19:40:00'),
    deliveryAddress: { street: '123 Main St', city: 'San Francisco', zipCode: '94102' },
  },
  {
    id: 'ORD-004',
    customerId: 'customer_1',
    customerName: 'Alex Johnson',
    restaurantId: '4',
    restaurantName: 'Green Bowl',
    items: [
      { id: 'ci7', menuItem: MOCK_MENU_ITEMS[17], quantity: 1 },
    ],
    status: 'ready',
    subtotal: 14.99,
    deliveryFee: 2.49,
    total: 17.48,
    createdAt: new Date('2024-12-11T13:00:00'),
    estimatedDelivery: new Date('2024-12-11T13:30:00'),
    deliveryAddress: { street: '123 Main St', city: 'San Francisco', zipCode: '94102' },
  },
];

export const MOCK_ORDERS: Order[] = generateOrders();

export const getRestaurantOrders = (restaurantId: string): Order[] => {
  return MOCK_ORDERS.filter(order => order.restaurantId === restaurantId);
};

export const getCustomerOrders = (customerId: string): Order[] => {
  return MOCK_ORDERS.filter(order => order.customerId === customerId);
};

export const getRestaurantMenu = (restaurantId: string): MenuItem[] => {
  return MOCK_MENU_ITEMS.filter(item => item.restaurantId === restaurantId);
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return MOCK_RESTAURANTS.find(r => r.id === id);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return MOCK_MENU_ITEMS.find(item => item.id === id);
};