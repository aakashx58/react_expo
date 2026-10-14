# Design System

## Food Delivery App - Visual Language

**Version:** 1.0  
**Reference:** "Fresh Finance" Aesthetic

---

## 1. Design Principles

### 1.1 Core Values

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Fresh** | Light, airy, natural | Green palette, generous whitespace |
| **Trust** | Professional, reliable | Consistent shadows, clear hierarchy |
| **Efficient** | Task-focused, fast | Pill buttons, 3-step maximum flows |
| **Premium** | Polished, refined | Mesh gradients, smooth animations |

### 1.2 Mood
- Soft financial app meets modern food delivery
- Calming greens with white space dominance
- Friendly but not childish
- Organized, predictable layouts

---

## 2. Color Palette

### 2.1 Primary Colors

```
┌─────────────────────────────────────────────────────────────┐
│  MESH GRADIENT (use for hero sections, auth screens)         │
│                                                              │
│  Linear: #66BB6A → #81C784 → #B2EBF2 → #C8E6C9             │
│  Angle: 135deg                                               │
│                                                              │
│  Radial center: #A5D6A7                                      │
│  Radial edges:   #E8F5E9                                     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#1B5E20` | Buttons, active states, headers |
| `primaryLight` | `#66BB6A` | Gradient start, hover states |
| `accent` | `#81C784` | Highlights, badges, success |
| `surface` | `#FFFFFF` | Card backgrounds, main bg |
| `surfaceVariant` | `#F1F8E9` | Secondary backgrounds, input fills |
| `surfaceContainer` | `#ECF2EC` | Subtle cards, modal backgrounds |
| `onSurface` | `#1A331A` | Primary text, headings |
| `onSurfaceVariant` | `#5C685D` | Secondary text, captions |
| `outline` | `#C4D1C4` | Borders, dividers |
| `outlineVariant` | `#E8F5E9` | Subtle borders |
| `error` | `#C62828` | Errors, destructive actions |
| `errorContainer` | `#FFEBEE` | Error backgrounds |
| `success` | `#2E7D32` | Confirmations, delivered status |
| `warning` | `#F9A825` | Pending, preparing status |

### 2.3 Status Colors (Order Flow)

| Status | Color | Background | Usage |
|--------|-------|------------|-------|
| `pending` | `#F57C00` | `#FFF3E0` | New orders |
| `accepted` | `#1976D2` | `#E3F2FD` | Confirmed |
| `preparing` | `#F9A825` | `#FFFDE7` | In progress |
| `ready` | `#388E3C` | `#E8F5E9` | Ready for pickup |
| `delivered` | `#1B5E20` | `#C8E6C9` | Complete |

---

## 3. Typography

### 3.1 Font Stack

| Platform | Primary | Fallback |
|----------|---------|----------|
| iOS | SF Pro Display | -apple-system |
| Android | Roboto | sans-serif |
| Web | Inter | -apple-system |

**Weights Used:**
- 400: Regular (body)
- 500: Medium (labels, buttons)
- 600: Semi-Bold (emphasis, numbers)
- 700: Bold (headings)

### 3.2 Type Scale

| Token | Size/Line | Weight | Usage |
|-------|-----------|--------|-------|
| `displayLarge` | 48/56 | 600 | Hero numbers (prices, stats) |
| `displayMedium` | 36/44 | 600 | Page titles |
| `displaySmall` | 32/40 | 600 | Section headers |
| `headlineLarge` | 28/36 | 600 | Card titles |
| `headlineMedium` | 24/32 | 600 | Subsections |
| `headlineSmall` | 20/28 | 600 | Item titles |
| `titleLarge` | 22/28 | 500 | Dialog titles |
| `titleMedium` | 16/24 | 500 | List items |
| `titleSmall` | 14/20 | 500 | Dense lists |
| `bodyLarge` | 16/24 | 400 | Primary content |
| `bodyMedium` | 14/20 | 400 | Secondary content |
| `bodySmall` | 12/16 | 400 | Captions, metadata |
| `labelLarge` | 14/20 | 500 | Buttons, tabs |
| `labelMedium` | 12/16 | 500 | Small buttons |
| `labelSmall` | 11/16 | 500 | Overlines, badges |

---

## 4. Spacing System

### 4.1 Base Unit: 4px

| Token | Value | Used For |
|-------|-------|----------|
| `xs` | 4px | Icon gaps, tight padding |
| `sm` | 8px | Input internal padding |
| `md` | 16px | Card padding, grid gaps |
| `lg` | 24px | Section spacing, large cards |
| `xl` | 32px | Screen padding, major gaps |
| `2xl` | 48px | Hero section padding |
| `3xl` | 64px | Auth screen vertical spacing |

### 4.2 Standard Layouts

```
Screen Padding: 16px horizontal, 20px top
Card Padding: 20px
Grid Gap: 16px (2-column), 12px (3-column)
Section Gap: 24px
Input Height: 56px (large), 48px (medium)
Button Height: 52px (primary), 44px (secondary)
```

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | Full-bleed images |
| `sm` | 8px | Badges, small chips |
| `md` | 12px | Buttons, inputs, small cards |
| `lg` | 16px | Medium cards |
| `xl` | 24px | Large cards, modals |
| `2xl` | 32px | Hero cards, prominent elements |
| `full` | 9999px | Pills, avatars, FABs |

---

## 6. Elevation / Shadows

```
Level 1 (Subtle):    0 1px 2px rgba(27, 94, 32, 0.05)
Level 2 (Card):      0 2px 8px rgba(27, 94, 32, 0.08)
Level 3 (Floating):  0 4px 16px rgba(27, 94, 32, 0.12)
Level 4 (Modal):     0 8px 32px rgba(27, 94, 32, 0.16)
Level 5 (Overlay):   0 16px 48px rgba(27, 94, 32, 0.24)
```

**Note:** All shadows use green tint for cohesion.

---

## 7. Component Specifications

### 7.1 Button

**Primary Button (Pill):**
```
Height: 52px
Padding: 0 32px horizontal
Border Radius: 26px (full)
Background: primary (#1B5E20)
Text: labelLarge, White
States:
  - Pressed: scale(0.98), opacity(0.9)
  - Disabled: opacity(0.5)
  - Loading: ActivityIndicator white
```

**Secondary Button:**
```
Same dimensions
Background: transparent
Border: 1.5px solid outline
Text: labelLarge, primary
```

**Ghost Button:**
```
No background, no border
Text: primary with opacity on press
```

**Icon Button (Circular):**
```
Size: 48px diameter
Border Radius: 24px
Background: surfaceVariant
Icon: 24px, onSurface
```

### 7.2 Card

**Base Card:**
```
Border Radius: lg or xl (16px or 24px)
Background: surface
Shadow: Level 2
Padding: md or lg (16px or 20px)
```

**Hero Card (Gradient):**
```
Border Radius: 2xl (32px)
Background: Mesh gradient (see colors)
Min Height: 280px
Padding: lg to xl
Content: Bottom-aligned
```

**Stats Card:**
```
Aspect: 1:1 or flexible
Border Radius: xl (24px)
Background: surfaceVariant
Center-aligned content
```

### 7.3 Input

```
Height: 56px
Padding: 0 16px
Border Radius: md (12px)
Background: surfaceVariant
Text: bodyLarge, onSurface
Placeholder: onSurfaceVariant @ 60%
Focus: Border 2px primary, background surface
Error: Border 2px error, helper text error
```

### 7.4 Badge / Status Pill

```
Height: 24px
Padding: 0 12px horizontal
Border Radius: 12px (full)
Text: labelSmall
Background: Status color @ 12%
Text Color: Status color
```

### 7.5 Bottom Navigation Bar

```
Height: 80px (with safe area)
Background: surface
Border Top: 1px solid outlineVariant

Active Tab:
  - Icon: filled, primary
  - Label: visible
  - Indicator: 4px line, primary, top of icon

Inactive Tab:
  - Icon: outlined, onSurfaceVariant
  - Label: hidden (or 11px xs)
```

---

## 8. Iconography

### 8.1 Icon Set
- **Library:** @expo/vector-icons (Ionicons)
- **Style:** Outlined for inactive, filled for active
- **Size:** 24px default, 20px dense, 28px large

### 8.2 Key Icons

| Use | Icon |
|-----|------|
| Home | `home-outline` / `home` |
| Orders | `receipt-outline` / `receipt` |
| Cart | `cart-outline` / `cart` |
| Profile | `person-outline` / `person` |
| Search | `search` |
| Back | `arrow-back` |
| Add | `add`, `add-circle` |
| Menu | `ellipsis-horizontal` |
| Notifications | `notifications-outline` |

---

## 9. Imagery

### 9.1 Placeholder Services

| Type | Service | Example |
|------|---------|---------|
| Restaurant Cover | Unsplash Source | `https://source.unsplash.com/featured/?restaurant,interior` |
| Food Item | Unsplash Source | `https://source.unsplash.com/featured/?food,dish` |
| Avatar | UI Faces | `https://i.pravatar.cc/150?img={n}` |

### 9.2 Image Guidelines

- **Hero images:** 16:9 or 4:3 ratio, dark gradient overlay
- **Thumbnails:** 1:1 ratio, rounded lg
- **Avatars:** Perfect circle, 48px standard, 64px large

---

## 10. Animation Guidelines

### 10.1 Durations

| Type | Duration | Easing |
|------|----------|--------|
| Micro-interactions | 150-200ms | Ease-out |
| Screen transitions | 300ms | Ease-in-out |
| Modal open/close | 250ms | Spring (damping: 20) |

### 10.2 Common Animations

**Button Press:**
```javascript
scale: 1 → 0.98 → 1 (Reanimated)
```

**Card Entry:**
```javascript
opacity: 0 → 1
translateY: 20 → 0
stagger: 50ms per card
```

**Tab Switch:**
```javascript
opacity crossfade: 100ms
```

---

## 11. Accessibility (a11y)

### 11.1 Color Contrast (WCAG AA)

| Combination | Ratio | Pass |
|-------------|-------|------|
| onSurface on surface | 12.5:1 | AAA |
| primary on surface | 8.2:1 | AAA |
| White on primary | 8.2:1 | AAA |
| bodySmall on surface | 7.1:1 | AAA |

### 11.2 Touch Targets

- Minimum: 48×48px
- Recommended: 56×56px for primary actions
- Adequate spacing: 8px minimum between targets

---

## 12. Screen Templates

### 12.1 List Screen (Home)

```
┌─────────────────────────────────────┐
│  [Safe Area]                        │
│  ┌─────────────────────────────┐    │
│  │  Header (gradient)          │    │
│  │  - Search bar               │    │
│  │  - Avatar (48px)            │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Category pills (scroll)    │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Restaurant Card (xl radius) │    │
│  │  - Image 4:3                │    │
│  │  - Name + rating            │    │
│  │  - Categories + time        │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Restaurant Card ...        │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Tab Bar]                          │
└─────────────────────────────────────┘
```

### 12.2 Detail Screen (Restaurant)

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │  Hero Image                 │    │
│  │  - Back button (overlay)    │    │
│  │  - Favorite (overlay)       │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Info Card (overlapping)    │    │
│  │  - Name, rating, time       │    │
│  │  - Address                  │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Tab Bar: Menu | Info       │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Category Pills (sticky)    │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Menu Item Card List        │    │
│  │  - Image, name, desc, price │    │
│  │  - Add button               │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Floating Cart Button]             │
└─────────────────────────────────────┘
```

### 12.3 Dashboard (Restaurant)

```
┌─────────────────────────────────────┐
│  [Safe Area]                        │
│  ┌─────────────────────────────┐    │
│  │  Header: Name + Avatar      │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Stats Grid (2x2)           │    │
│  │  - Revenue | Orders         │    │
│  │  - Pending | Rating         │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Quick Actions              │    │
│  │  [Add Item] [View Orders]   │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │  Recent Orders List         │    │
│  │  - Order cards with status  │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Tab Bar]                          │
└─────────────────────────────────────┘
```

---

## 13. Design Tokens Export

Copy-paste ready for `constants/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: '#1B5E20',
    primaryLight: '#66BB6A',
    accent: '#81C784',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F8E9',
    surfaceContainer: '#ECF2EC',
    onSurface: '#1A331A',
    onSurfaceVariant: '#5C685D',
    outline: '#C4D1C4',
    outlineVariant: '#E8F5E9',
    error: '#C62828',
    errorContainer: '#FFEBEE',
    success: '#2E7D32',
    warning: '#F9A825',
    // Order statuses
    statusPending: '#F57C00',
    statusPendingBg: '#FFF3E0',
    statusAccepted: '#1976D2',
    statusAcceptedBg: '#E3F2FD',
    statusPreparing: '#F9A825',
    statusPreparingBg: '#FFFDE7',
    statusReady: '#388E3C',
    statusReadyBg: '#E8F5E9',
    statusDelivered: '#1B5E20',
    statusDeliveredBg: '#C8E6C9',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  borderRadius: {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  typography: {
    displayLarge: { fontSize: 48, fontWeight: '600', lineHeight: 56 },
    displayMedium: { fontSize: 36, fontWeight: '600', lineHeight: 44 },
    displaySmall: { fontSize: 32, fontWeight: '600', lineHeight: 40 },
    headlineLarge: { fontSize: 28, fontWeight: '600', lineHeight: 36 },
    headlineMedium: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
    headlineSmall: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    titleLarge: { fontSize: 22, fontWeight: '500', lineHeight: 28 },
    titleMedium: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
    titleSmall: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    bodyLarge: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    bodyMedium: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    bodySmall: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    labelLarge: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    labelMedium: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
    labelSmall: { fontSize: 11, fontWeight: '500', lineHeight: 16 },
  },
  shadows: {
    level1: '0px 1px 2px rgba(27, 94, 32, 0.05)',
    level2: '0px 2px 8px rgba(27, 94, 32, 0.08)',
    level3: '0px 4px 16px rgba(27, 94, 32, 0.12)',
    level4: '0px 8px 32px rgba(27, 94, 32, 0.16)',
    level5: '0px 16px 48px rgba(27, 94, 32, 0.24)',
  },
} as const;

export type Theme = typeof theme;
```

---

## 14. Component Checklist

Use this checklist when building each screen:

- [ ] **Layout**: Screen padding consistent, safe areas respected
- [ ] **Colors**: Only theme colors used, no hardcoded hex
- [ ] **Typography**: Design system scale followed
- [ ] **Spacing**: 4px grid system
- [ ] **Shadows**: Level 2 for cards, level 3 for floating
- [ ] **Buttons**: Primary pill style, correct height
- [ ] **Inputs**: 56px height, correct border radius
- [ ] **Loading**: ActivityIndicator with primary color
- [ ] **Empty States**: Centered, friendly, with CTA
- [ ] **Error States**: Error color, retry action

---

**Design Review**

| Role | Name | Date |
|------|------|------|
| Design Lead | _________ | _____ |
| UX Researcher | _________ | _____ |
