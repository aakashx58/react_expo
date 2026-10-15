# System Architecture

## Food Delivery App - Technical Design

**Version:** 1.0  
**Last Updated:** October 14, 2026

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Native (Expo)                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │   UI     │  │  Router  │  │ Context  │  │     Hooks        │ │
│  │Components│──│  (File)  │──│ Providers│──│  (useAuth,       │ │
│  │          │  │          │  │          │  │   useCart, etc.) │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     Layer: Application                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────────────────────────┐  │
│  │   Expo Router    │  │     React Navigation                 │  │
│  │   (File-based    │  │     (under the hood)                 │  │
│  │    Routing)      │  │                                      │  │
│  └──────────────────┘  └──────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                     Layer: Data/Mock                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │   AuthContext    │  │ RestaurantsCtx   │  │  AsyncStorage │  │
│  │   (User, Role)   │  │ (Menus, Orders)  │  │  (Session,    │  │
│  │                  │  │                  │  │   Cart Cache) │  │
│  └──────────────────┘  └──────────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Navigation Architecture

### 2.1 Route Tree (Expo Router)

```
app/
├── _layout.tsx                    # Root: Splash → Auth Check → Redirect
├── +not-found.tsx
│
├── (auth)/                        # Public - no auth required
│   ├── _layout.tsx                # Stack: Welcome → Login/Register
│   ├── welcome.tsx                # Landing page with role select
│   ├── customer-login.tsx
│   ├── restaurant-login.tsx
│   └── register.tsx
│
├── (customer)/                    # Protected - customer role only
│   ├── _layout.tsx                # Stack with bottom tabs
│   ├── index.tsx                  # Home: restaurant list
│   ├── restaurant/
│   │   └── [id].tsx               # Dynamic: menu & cart preview
│   ├── cart.tsx
│   ├── checkout.tsx
│   ├── orders.tsx
│   └── profile.tsx
│
└── (restaurant)/                  # Protected - restaurant role only
    ├── _layout.tsx                # Stack with bottom tabs
    ├── index.tsx                  # Dashboard: stats & quick actions
    ├── menu.tsx                   # Menu CRUD
    ├── orders.tsx                 # Order management
    └── profile.tsx
```

### 2.2 Navigation Guards

```typescript
// app/_layout.tsx (pseudo)
useEffect(() => {
  if (!isLoading) {
    if (!session) router.replace('/(auth)/welcome');
    else if (session.role === 'customer') router.replace('/(customer)');
    else if (session.role === 'restaurant') router.replace('/(restaurant)');
  }
}, [session, isLoading]);
```

### 2.3 Layout Hierarchy

| Layout | Purpose | Includes |
|--------|---------|----------|
| Root | Auth check, theme provider | `AuthProvider`, `ThemeProvider`, Splash |
| Auth | Login flows | Header with back, keyboard avoiding |
| Customer | Main app | Bottom tabs (Home, Orders, Cart, Profile) |
| Restaurant | Business tools | Bottom tabs (Dashboard, Menu, Orders, Profile) |

---

## 3. State Management

### 3.1 Context Architecture

```
┌─────────────────────────────────────────┐
│           RootLayout                    │
│  ┌─────────────────────────────────┐    │
│  │      AuthProvider               │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │    RestaurantProvider   │    │    │
│  │  │  ┌─────────────────┐    │    │    │
│  │  │  │   CartProvider  │    │    │    │
│  │  │  │   (conditionally │    │    │    │
│  │  │  │    for customer)│    │    │    │
│  │  │  └─────────────────┘    │    │    │
│  │  └─────────────────────────┘    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### 3.2 Context Details

#### AuthContext
```typescript
interface AuthState {
  user: User | null;
  role: 'customer' | 'restaurant' | null;
  isLoading: boolean;
  login(email: string, password: string, role: Role): Promise<void>;
  register(data: RegisterData): Promise<void>;
  logout(): Promise<void>;
}
```

**Storage:**
- Key: `@food_delivery_session`
- Value: `{ user: User, role: Role, token: string }`

#### RestaurantContext (Mock Data Layer)
```typescript
interface RestaurantState {
  restaurants: Restaurant[];
  currentRestaurant: Restaurant | null;  // when restaurant logged in
  menuItems: MenuItem[];
  orders: Order[];
  isLoading: boolean;
  fetchRestaurants(): Promise<void>;
  fetchMenu(restaurantId: string): Promise<void>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>;
  addMenuItem(item: MenuItem): Promise<void>;
  updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<void>;
  deleteMenuItem(id: string): Promise<void>;
}
```

#### CartContext
```typescript
interface CartState {
  items: CartItem[];  // { menuItem, quantity }
  addItem(item: MenuItem, quantity: number): void;
  removeItem(itemId: string): void;
  updateQuantity(itemId: string, quantity: number): void;
  clearCart(): void;
  total: number;
  itemCount: number;
}
```

**Storage:** Persisted to AsyncStorage per user

---

## 4. Data Models

### 4.1 Core Types

```typescript
// types/user.ts
type Role = 'customer' | 'restaurant';

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  createdAt: Date;
}

// types/restaurant.ts
interface Restaurant {
  id: string;
  name: string;
  image: string;
  categories: string[];
  rating: number;
  deliveryTime: string;  // "25-35 min"
  deliveryFee: number;
  minOrder: number;
  isActive: boolean;
  ownerId: string;  // linked restaurant owner
}

interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  preparationTime: number;  // minutes
}

// types/order.ts
type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: Date;
  estimatedDelivery?: Date;
  deliveryAddress: Address;
}

interface Address {
  street: string;
  city: string;
  zipCode: string;
  coordinates?: { lat: number; lng: number };
}
```

---

## 5. Component Architecture

### 5.1 Component Categories

```
components/
├── ui/                    # Atomic, reusable
│   ├── Button.tsx        # Pill button with variants
│   ├── Card.tsx          # Base card with shadow
│   ├── Badge.tsx         # Status pills
│   ├── Input.tsx         # Form inputs
│   ├── Avatar.tsx        # Circle image
│   └── Typography.tsx    # Text variants
│
├── customer/
│   ├── RestaurantCard.tsx
│   ├── MenuItemCard.tsx
│   ├── CartItemRow.tsx
│   └── OrderStatusTimeline.tsx
│
├── restaurant/
│   ├── StatsCard.tsx
│   ├── OrderCard.tsx
│   └── MenuItemForm.tsx
│
└── layout/
    ├── Header.tsx        # With search/avatar
    ├── TabBar.tsx        # Custom bottom bar
    └── GradientBackground.tsx
```

### 5.2 Primitive Component API

```typescript
// ui/Button.tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

// ui/Card.tsx
interface CardProps {
  children: ReactNode;
  elevated?: boolean;        // shadow
  padded?: boolean;          // inner spacing
  gradient?: boolean;        // mesh gradient background
  style?: StyleProp<ViewStyle>;
}
```

---

## 6. Screen-by-Screen Breakdown

### Customer App

| Screen | Route | Components | Data Fetch |
|--------|-------|------------|------------|
| Home | `/(customer)` | `Header`, `RestaurantCard` grid, `CategoryPills` | `fetchRestaurants()` |
| Restaurant | `/(customer)/restaurant/[id]` | Hero image, `MenuItemCard` list, `FloatingCart` | `fetchMenu(id)` |
| Cart | `/(customer)/cart` | `CartItemRow`, total summary, `Button` | Local state |
| Orders | `/(customer)/orders` | `OrderCard` with timeline, filter tabs | `orders` filtered by customer |
| Profile | `/(customer)/profile` | Avatar, info card, logout button | Local state |

### Restaurant Admin

| Screen | Route | Components | Data Fetch |
|--------|-------|------------|------------|
| Dashboard | `/(restaurant)` | `StatsCard` row, `OrderCard` recent, quick actions | `orders`, `menuItems` |
| Menu | `/(restaurant)/menu` | `MenuItemForm` modal, `MenuItemList`, add FAB | `menuItems` |
| Orders | `/(restaurant)/orders` | `OrderCard` with action buttons, status filters | `orders` filtered by restaurant |
| Profile | `/(restaurant)/profile` | Business info, settings | Local state |

---

## 7. File Structure

```
src/
├── app/                      # Expo Router screens
│   ├── (auth)/              # Public screens
│   ├── (customer)/          # Customer protected
│   ├── (restaurant)/        # Restaurant protected
│   ├── _layout.tsx
│   └── +not-found.tsx
│
├── components/
│   ├── ui/                  # Atomic components
│   ├── customer/            # Customer-specific
│   ├── restaurant/          # Restaurant-specific
│   └── layout/              # Headers, tab bars
│
├── context/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── RestaurantContext.tsx
│
├── hooks/
│   ├── useAuth.ts           # Re-export context hooks
│   ├── useCart.ts
│   ├── useRole.ts           # Check current role
│   └── useDebounce.ts
│
├── data/
│   ├── mockRestaurants.ts   # Static seed data
│   ├── mockMenuItems.ts
│   └── mockOrders.ts
│
├── constants/
│   ├── theme.ts             # Colors, spacing, typography
│   ├── routes.ts            # Route constants
│   └── config.ts            # App config
│
├── types/
│   ├── user.ts
│   ├── restaurant.ts
│   └── order.ts
│
├── utils/
│   ├── formatCurrency.ts
│   ├── formatDate.ts
│   └── storage.ts           # AsyncStorage helpers
│
└── App.tsx                  # Entry point
```

---

## 8. Security & Privacy

### 8.1 Authentication
- Mock auth with role validation
- No real passwords stored (hashed if integrated)
- Session persistence via secure AsyncStorage

### 8.2 Data Access
- Route guards enforce role-based access
- Context providers scope data by role
- No sensitive data in screens

---

## 9. Testing Strategy

### 9.1 Manual Testing Checklist

| Flow | Steps | Expected |
|------|-------|----------|
| Customer Registration | Register → Login → Browse | Smooth onboarding |
| Order Completion | Add items → Cart → Checkout | Order appears in history |
| Status Update | Restaurant updates status | Customer sees real-time update |
| Role Separation | Login as both roles | Correct dashboards shown |

### 9.2 Future: Automated Testing
- Unit: Jest + React Native Testing Library
- E2E: Detox

---

## 10. Performance Optimization

1. **Images**: `react-native-fast-image` or `expo-image` with caching
2. **Lists**: `FlatList` with `getItemLayout` for fixed heights
3. **Navigation**: Lazy loading via Expo Router
4. **State**: Memoized contexts with selective updates

---

## 11. Migration Path to Production

| Current | Production | Migration Effort |
|---------|-----------|------------------|
| Mock Data | Supabase/Firebase | Medium - similar API shape |
| AsyncStorage | Secure Store | Low - wrapper exists |
| File Router | Same | None |
| Manual State | React Query | Medium - add data fetching layer |

---

## Appendix B: Key Dependencies

```json
{
  "dependencies": {
    "expo": "~51.0.28",
    "expo-router": "~3.5.23",
    "expo-status-bar": "~1.12.1",
    "expo-constants": "~16.0.2",
    "expo-linking": "~6.3.1",
    "@expo/vector-icons": "^14.0.2",
    "react-native-safe-area-context": "4.10.5",
    "react-native-screens": "3.31.1",
    "react-native-gesture-handler": "~2.16.1",
    "react-native-reanimated": "~3.10.1",
    "react-native-async-storage": "^1.23.1"
  }
}
```

---

**Architecture Review**

| Role | Name | Date |
|------|------|------|
| Tech Lead | _________ | _____ |
| Senior Dev | _________ | _____ |
