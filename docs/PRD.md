# Product Requirements Document (PRD)

## Food Delivery App - MVP

**Version:** 1.0  
**Date:** October 14, 2026  
**Status:** Draft → Approved

---

## 1. Executive Summary

A dual-purpose food delivery mobile application built with React Native (Expo) that serves both customers browsing restaurants and restaurant owners managing their business in a single codebase. The app features a modern, clean design aesthetic inspired by premium financial apps, prioritizing user experience and visual clarity.

---

## 2. Problem Statement

### 2.1 Customer Pain Points
- Fragmented food discovery experience across multiple apps
- Difficulty tracking order status in real-time
- Unclear pricing and hidden fees

### 2.2 Restaurant Owner Pain Points
- Complex, separate admin dashboards requiring technical expertise
- No unified view of operations
- Difficulty updating menus on-the-fly

---

## 3. Target Users

### 3.1 Primary Personas

**Customer - "Busy Professional"**
- Age: 25-45
- Values: Speed, clarity, visual appeal
- Wants: Quick browse → order → track flow

**Restaurant Owner - "Bistro Manager"**
- Age: 30-55
- Values: Efficiency, control, analytics
- Wants: Dashboard overview → quick menu updates → order management

### 3.2 User Roles

| Role | Access Level | Key Actions |
|------|--------------|-------------|
| Customer | Browse, Order, Review | Search, Filter, Order, Track |
| Restaurant Owner | Full Access | Menu CRUD, Order Management, Analytics |

---

## 4. Core Features (MVP)

### 4.1 Must-Have Features

#### Customer Side
1. **Restaurant Discovery**
   - Grid/list view of restaurants
   - Category filtering (Italian, Fast Food, Healthy, etc.)
   - Search by restaurant name or cuisine

2. **Menu Browsing**
   - Item cards with images, names, prices
   - Category sections (Appetizers, Mains, Desserts, Drinks)
   - Add to cart with quantity

3. **Cart & Checkout**
   - Item quantity adjustment
   - Clear pricing breakdown
   - Order confirmation

4. **Order Tracking**
   - Status timeline (pending → accepted → preparing → ready → delivered)
   - Order history with re-order capability

#### Restaurant Side
1. **Dashboard**
   - Today's stats (orders, revenue, pending)
   - Quick actions (add item, view orders)

2. **Menu Management**
   - Add/edit/delete menu items
   - Image upload placeholders
   - Category organization

3. **Order Management**
   - Incoming order notifications
   - Status updates (accept → preparing → ready)
   - Order history filtering

### 4.2 Explicitly Out of Scope (V2)
- Real payment processing
- Push notifications
- Live driver tracking
- Multi-language support
- Customer reviews/ratings
- Coupons & promotions
- Driver app

---

## 5. Non-Functional Requirements

### 5.1 Performance
- App load time < 3 seconds
- Smooth 60fps scrolling
- Optimized image loading

### 5.2 Usability
- Max 3 steps to complete any core action
- Consistent navigation patterns
- Empty states with clear CTAs

### 5.3 Accessibility
- WCAG AA color contrast
- Minimum 48px touch targets
- Screen reader compatible labels

---

## 6. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Task completion rate | > 95% | Time to complete order |
| Cart abandonment | < 30% | Sessions without checkout |
| Menu update time | < 2 min | Owner dashboard usage |
| Order accuracy | 100% | Status consistency |

---

## 7. Technical Constraints

### 7.1 Platform Requirements
- **Framework:** Expo SDK 51+
- **Language:** TypeScript 5.3+
- **Navigation:** Expo Router (file-based)
- **State Management:** React Context + Hooks
- **Styling:** StyleSheet.create (no external UI lib)

### 7.2 Data Layer
- Mock data with AsyncStorage persistence
- Structure ready for Firebase/Supabase migration

### 7.3 Dependencies (Pre-approved)
```json
{
  "expo": "^51.0.0",
  "expo-router": "^3.4.0",
  "expo-vector-icons": "^14.0.0",
  "react-native-safe-area-context": "^4.8.0",
  "react-native-screens": "^3.29.0"
}
```

---

## 8. User Stories

### Epic 1: Authentication
```
US-1.1: As a customer, I want to login with email so that my orders are saved
US-1.2: As a restaurant owner, I want a separate login to access my business tools
US-1.3: As a new user, I want to choose my role during registration
```

### Epic 2: Customer - Discovery
```
US-2.1: As a customer, I want to browse restaurants by category
US-2.2: As a customer, I want to see restaurant ratings and delivery time
US-2.3: As a customer, I want to search for specific dishes or cuisines
```

### Epic 3: Customer - Ordering
```
US-3.1: As a customer, I want to add items to cart with quantities
US-3.2: As a customer, I want to see order total before confirming
US-3.3: As a customer, I want to track my order status in real-time
```

### Epic 4: Restaurant - Operations
```
US-4.1: As an owner, I want to see today's performance at a glance
US-4.2: As an owner, I want to update my menu items with images and prices
US-4.3: As an owner, I want to update order statuses for customer visibility
```

---

## 9. Design Guidelines Reference

Follow the **Design System v1.0** document for:
- Color palette (green-based, fresh financial aesthetic)
- Component specifications (cards, buttons, inputs)
- Layout grids and spacing
- Typography scale

---

## 10. Release Plan

### Phase 1: Foundation (Week 1)
- [ ] Project setup with Expo Router
- [ ] Auth flows for both roles
- [ ] Navigation guards working

### Phase 2: Customer Core (Week 2)
- [ ] Restaurant listing + details
- [ ] Menu browsing
- [ ] Cart functionality

### Phase 3: Restaurant Admin (Week 3)
- [ ] Dashboard with stats
- [ ] Menu CRUD
- [ ] Order management

### Phase 4: Polish & QA (Week 4)
- [ ] Empty states
- [ ] Loading states
- [ ] Error handling
- [ ] Final design polish

---

## 11. Future Considerations

- **V2:** Payment integration, real-time updates via WebSockets
- **V3:** Driver app, customer reviews, loyalty program
- **Scale:** Migrate to Supabase/Firebase, add CI/CD, EAS Build

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| Session | Logged-in state, persisted via AsyncStorage |
| Hero Card | Large gradient card at top of screens |
| Mesh Gradient | Multi-color radial gradient background |
| Order Lifecycle | pending → accepted → preparing → ready → delivered |

---

**Sign-off**

| Role | Name | Date |
|------|------|------|
| Product Owner | _________ | _____ |
| Tech Lead | _________ | _____ |
