# Food Delivery App - Agent Guidelines

## Project Overview

A dual-role food delivery mobile application:
- **Customers**: Browse restaurants, order food, track orders
- **Restaurant Owners**: Manage menu, view orders, track analytics

Built with Expo (React Native), TypeScript, and file-based routing.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on specific platform
npx expo start --android
npx expo start --ios
```

---

## Directory Structure

```
├── app/                    # Expo Router screens
│   ├── (auth)/            # Public auth screens
│   ├── (customer)/        # Customer-protected screens
│   ├── (restaurant)/      # Restaurant-protected screens
│   └── _layout.tsx        # Root layout with providers
├── components/
│   ├── ui/                # Atomic UI components (Button, Card, Input)
│   ├── customer/          # Customer-specific components
│   ├── restaurant/        # Restaurant-specific components
│   └── layout/            # Navigation, headers, tab bars
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── data/                  # Mock data (ready for API swap)
├── constants/             # Theme, config, routes
├── types/                 # TypeScript definitions
└── utils/                 # Helper functions
```

---

## Code Conventions

### TypeScript
- Strict mode enabled
- No `any` without explicit comment
- Prefer `interface` over `type` for objects

### Styling
- Use `StyleSheet.create` from theme constants
- Follow 4px grid system
- Only use theme colors (no hardcoded hex)
- Design tokens in `constants/theme.ts`

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Types: `camelCase.ts`

### Component Pattern
```typescript
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface Props {
  title: string;
  onPress?: () => void;
}

export function MyComponent({ title, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
  },
  text: {
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurface,
  },
});
```

---

## Design System Reference

See `docs/DESIGN_SYSTEM.md` for:
- Color palette (green financial aesthetic)
- Component specifications
- Typography scale
- Spacing system
- Screen templates

---

## State Management

- **AuthContext**: User, role, login/logout
- **CartContext**: Cart items (customer only)
- **RestaurantContext**: Restaurants, menus, orders

Access via hooks:
```typescript
const { user, role } = useAuth();
const { items, total, addItem } = useCart();
const { restaurants, orders, updateOrderStatus } = useRestaurant();
```

---

## Testing Checklist

Before committing:
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] No console errors in Expo
- [ ] Both roles work correctly
- [ ] Design system followed
- [ ] Empty states handled

---

## Documentation

| Document | Purpose |
|----------|---------|
| `docs/PRD.md` | Product requirements, user stories |
| `docs/ARCHITECTURE.md` | Technical design, data models, routes |
| `docs/DESIGN_SYSTEM.md` | Visual language, components, tokens |

---

## Do NOT

- ❌ Hardcode colors or spacing
- ❌ Use class components (functional + hooks only)
- ❌ Add new dependencies without approval
- ❌ Modify root `_layout.tsx` without discussion
- ❌ Skip TypeScript types

---

## Common Tasks

### Add a new screen
1. Create file in `app/(customer)/` or `app/(restaurant)/`
2. Update relevant `_layout.tsx` if adding tabs
3. Add route constant in `constants/routes.ts`

### Add a mock API call
1. Add type to `types/`
2. Add mock data to `data/`
3. Update `RestaurantContext` with async method
4. Use `useRestaurant()` hook to access

### Create a reusable component
1. Add to `components/ui/` if atomic
2. Follow design system specs
3. Export with proper TypeScript interface
4. Use theme constants for styling

---

## Environment

| Tool | Version |
|------|---------|
| Node | 18+ |
| Expo SDK | 51+ |
| TypeScript | 5.3+ |

---

*Last updated: October 14, 2026*
