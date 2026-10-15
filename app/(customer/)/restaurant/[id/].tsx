import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useCart, useRestaurant } from '@/hooks';
import { theme, styles, formatCurrency } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { MenuItem, Restaurant, CartItem } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { HeroGradient } from '@/components/layout/GradientBackground';

const CATEGORIES = ['All', 'Popular', 'Pizza', 'Pasta', 'Starters', 'Desserts', 'Drinks', 'Bowls', 'Salads', 'Sides', 'Coffee'];

export default function RestaurantDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const restaurantId = params.id as string;
  const { items, total, itemCount, addItem } = useCart();
  const { fetchMenu, menuItems, currentRestaurant, isLoading } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchMenu(restaurantId);
  }, [restaurantId, fetchMenu]);

  const restaurant = currentRestaurant;
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const categories = useMemo(() => {
    const cats = [...new Set(menuItems.map(item => item.category))];
    return ['All', ...cats];
  }, [menuItems]);

  const getCartItemQuantity = (menuItemId: string) => {
    const cartItem = items.find(item => item.menuItem.id === menuItemId);
    return cartItem?.quantity || 0;
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem(menuItem, 1);
    setShowCart(true);
  };

  const handleQuantityChange = (menuItem: MenuItem, delta: number) => {
    const currentQty = getCartItemQuantity(menuItem.id);
    const newQty = Math.max(0, currentQty + delta);
    // We can't easily update quantity with current cart API, so just re-add
    if (newQty > currentQty) {
      addItem(menuItem, 1);
    }
  };

  if (!restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="restaurant-outline" size={48} color={theme.colors.onSurfaceVariant} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: MenuItem }) => {
    const qty = getCartItemQuantity(item.id);
    const inCart = qty > 0;

    return (
      <Card style={styles.menuItemCard} elevated>
        <View style={styles.menuItemContent}>
          <View style={styles.menuItemInfo} onPress={() => handleAddToCart(item)}>
            <View style={styles.menuItemText}>
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                {item.isPopular && (
                  <Badge variant="success" size="sm">Popular</Badge>
                )}
              </View>
              <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
              <Text style={styles.menuItemPrice}>{formatCurrency(item.price)}</Text>
            </View>
          </View>
          <View style={styles.menuItemActions}>
            {inCart ? (
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item, -1)}
                  style={styles.qtyButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="remove" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{qty}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item, 1)}
                  style={styles.qtyButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleAddToCart(item)}
                style={styles.addButton}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={24} color={theme.colors.surface} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <HeroGradient
          imageSource={restaurant.image}
          style={styles.hero}
        >
          <View style={styles.heroTop}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <View style={styles.backButtonInner}>
                <Ionicons name="arrow-back" size={24} color={theme.colors.surface} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favButton}>
              <View style={styles.favButtonInner}>
                <Ionicons name="heart-outline" size={24} color={theme.colors.surface} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.heroBottom}>
            <View style={styles.heroInfo}>
              <Text style={styles.heroName}>{restaurant.name}</Text>
              <View style={styles.heroMeta}>
                <View style={styles.heroMetaItem}>
                  <Ionicons name="star" size={16} color={theme.colors.warning} />
                  <Text style={styles.heroMetaText}>{restaurant.rating}</Text>
                  <Text style={styles.heroMetaText}>({restaurant.reviewCount})</Text>
                </View>
                <View style={styles.heroMetaItem}>
                  <Ionicons name="time-outline" size={16} color={theme.colors.surface} />
                  <Text style={styles.heroMetaText}>{restaurant.deliveryTime}</Text>
                </View>
                <View style={styles.heroMetaItem}>
                  <Ionicons name="cash-outline" size={16} color={theme.colors.surface} />
                  <Text style={styles.heroMetaText}>
                    {restaurant.deliveryFee === 0 ? 'Free' : formatCurrency(restaurant.deliveryFee)} delivery
                  </Text>
                </View>
              </View>
              <Text style={styles.heroAddress}>{restaurant.address}</Text>
            </View>
          </View>
        </HeroGradient>

        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.categoriesScroll}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((cat, i) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.categoryPill,
                  selectedCategory === cat && styles.categoryPillActive,
                ]}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            {[1, 2, 3, 4].map(i => (
              <Card key={i} style={styles.skeletonCard} />
            ))}
          </View>
        ) : filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={48} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.emptyText}>No items in this category</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListContentComponentStyle={styles.listContent}
          />
        )}
      </ScrollView>

      {itemCount > 0 && (
        <View style={styles.floatingCart} pointerEvents="box-none">
          <TouchableOpacity
            onPress={() => router.push('/(customer)/cart' as any)}
            style={styles.floatingCartButton}
            activeOpacity={0.9}
            pointerEvents="box-only"
          >
            <View style={styles.floatingCartContent}>
              <View style={styles.floatingCartIcon}>
                <Ionicons name="cart" size={24} color={theme.colors.surface} />
              </View>
              <View style={styles.floatingCartInfo}>
                <Text style={styles.floatingCartLabel}>View Cart</Text>
                <Text style={styles.floatingCartTotal}>
                  {itemCount} item{itemCount !== 1 ? 's' : ''} · {formatCurrency(total)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.surface} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  hero: {
    minHeight: 300,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  backButton: {
    zIndex: 1,
  },
  backButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favButton: {
    zIndex: 1,
  },
  favButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.spacing.xl,
  },
  heroInfo: {
    gap: theme.spacing.sm,
  },
  heroName: {
    ...theme.typography.displaySmall,
    color: theme.colors.surface,
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  heroMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  heroMetaText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.surface,
  },
  heroAddress: {
    ...theme.typography.bodyMedium,
    color: theme.colors.surface,
    opacity: 0.9,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
  },
  categoriesScroll: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.md,
  },
  categoryPill: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  categoryPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    ...theme.typography.labelMedium,
    color: theme.colors.onSurfaceVariant,
  },
  categoryTextActive: {
    color: theme.colors.surface,
    fontWeight: '500',
  },
  menuItemCard: {
    marginHorizontal: theme.spacing.md,
    padding: theme.spacing.md,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  menuItemText: {
    gap: theme.spacing.xs,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  menuItemName: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    flex: 1,
  },
  menuItemDesc: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  menuItemPrice: {
    ...theme.typography.headlineSmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  menuItemActions: {
    flexShrink: 0,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    ...theme.typography.labelLarge,
    color: theme.colors.surface,
    minWidth: 24,
    textAlign: 'center',
  },
  loadingContainer: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  skeletonCard: {
    height: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  emptyText: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
  },
  separator: {
    height: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  floatingCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  floatingCartButton: {
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.level4,
    overflow: 'hidden',
  },
  floatingCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    gap: theme.spacing.md,
  },
  floatingCartIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingCartInfo: {
    flex: 1,
    gap: 2,
  },
  floatingCartLabel: {
    ...theme.typography.labelLarge,
    color: theme.colors.surface,
  },
  floatingCartTotal: {
    ...theme.typography.bodySmall,
    color: theme.colors.surface,
    opacity: 0.9,
  },
});