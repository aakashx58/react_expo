# FoodFlow - Food Delivery App

A dual-role food delivery mobile application built with **React Native (Expo)**, **TypeScript**, and **Expo Router**. Serves both customers ordering food and restaurant owners managing their business in a single codebase.

## Features

### Customer App
- 🍽️ Browse restaurants by category
- 🔍 Search restaurants and dishes
- 🛒 Add to cart with quantity controls
- 💳 Checkout with address & payment
- 📦 Real-time order tracking (pending → preparing → ready → delivered)
- 📋 Order history with reorder option
- 👤 Profile management

### Restaurant Admin
- 📊 Dashboard with today's stats (revenue, orders, pending)
- 🍽️ Menu management (add/edit/delete items)
- 📦 Order management with status updates
- 🏪 Business profile settings
- 🔔 Order notifications

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Expo SDK 51+ |
| Language | TypeScript 5.3+ |
| Navigation | Expo Router (file-based) |
| State | React Context + Hooks |
| Styling | StyleSheet + Design Tokens |
| Icons | @expo/vector-icons (Ionicons) |
| Storage | @react-native-async-storage/async-storage |
| Gestures | react-native-gesture-handler + reanimated |

## Project Structure

```
food-delivery/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout with providers
│   ├── +not-found.tsx           # 404 screen
│   ├── (auth)/                  # Public auth screens
│   │   ├── welcome.tsx          # Role selection
│   │   ├── customer-login.tsx
│   │   ├── restaurant-login.tsx
│   │   └── register.tsx
│   ├── (customer)/              # Customer-protected screens
│   │   ├── index.tsx            # Restaurant list
│   │   ├── restaurant/[id].tsx  # Menu & ordering
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   ├── orders.tsx
│   │   ├── profile.tsx
│   │   └── search.tsx
│   └── (restaurant)/            # Restaurant-protected screens
│       ├── index.tsx            # Dashboard
│       ├── menu.tsx             # Menu CRUD
│       ├── orders.tsx           # Order management
│       └── profile.tsx
├── components/
│   ├── ui/                      # Button, Card, Input, Badge, Avatar
│   └── layout/                  # Header, TabBar, GradientBackground
├── context/                     # React Context providers
│   ├── AuthContext.tsx          # User auth & role
│   ├── CartContext.tsx          # Shopping cart
│   └── RestaurantContext.tsx    # Restaurants, menus, orders
├── hooks/                       # Custom hooks
├── data/                        # Mock data (API-ready)
├── constants/                   # Theme, design system
├── types/                       # TypeScript definitions
└── utils/                       # Storage helpers
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or bun
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Clone and install
git clone <repo-url>
cd food-delivery
npm install

# Start development server
npx expo start
```

### Run on Device

```bash
# Android
npx expo run:android

# iOS (macOS only)
npx expo run:ios

# Web
npx expo start --web
```

## Design System

The app follows a **"Fresh Finance"** aesthetic:
- **Colors**: Green-based palette (`#1B5E20` primary, soft gradients)
- **Typography**: 13-level scale (displayLarge → labelSmall)
- **Spacing**: 4px base grid (xs=4, sm=8, md=16, lg=24, xl=32)
- **Border Radius**: 8px–32px scale
- **Shadows**: 5 levels with green tint

See `constants/theme.ts` for all design tokens.

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Customer | customer@demo.com | demo123 |
| Restaurant | owner@bella.com | demo123 |

## Data Layer

Currently uses **mock data** in `data/mockData.ts` with:
- 5 restaurants with menus
- Sample orders with full lifecycle
- User accounts for both roles

**Ready for backend integration** - swap `RestaurantContext` methods for real API calls.

## Building for Production

### EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login & configure
eas login
eas build:configure

# Build
eas build --platform android --profile preview    # APK for testing
eas build --platform android --profile production # AAB for Play Store
eas build --platform ios --profile production     # iOS for TestFlight
```

### Local Build

```bash
# Development build
npx expo run:android
npx expo run:ios
```

## Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npx expo lint      # Lint code
npx tsc --noEmit   # Type check
npx expo-doctor    # Diagnose issues
```

## Documentation

- `docs/PRD.md` - Product requirements & user stories
- `docs/ARCHITECTURE.md` - Technical architecture & data models
- `docs/DESIGN_SYSTEM.md` - Visual design system & components

## License

MIT License - see LICENSE file for details.