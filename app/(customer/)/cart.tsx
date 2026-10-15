import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useCart, useRestaurant } from '@/hooks';
import { theme, styles, formatCurrency } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Restaurant } from '@/types/restaurant';

export default function CartScreen() {
  const router = useRouter();
  const { items, total, itemCount, updateQuantity, removeItem, clearCart, isLoading } = useCart();
  const { currentRestaurant } = useRestaurant();

  useEffect(() => {
    // Cart loads automatically from storage
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading cart...</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyCard}>
          <Ionicons name="cart-outline" size={64} color={theme.colors.onSurfaceVariant} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some delicious food to get started</Text>
          <Button
            title="Browse Restaurants"
            onPress={() => router.replace('/(customer)' as any)}
            style={styles.emptyButton}
          />
        </View>
      </View>
    );
  }

  const restaurant = currentRestaurant || items[0]?.menuItem.restaurantId
    ? { name: items[0].menuItem.name } // fallback
    : null;

  const deliveryFee = 2.99;
  const subtotal = total;
  const grandTotal = subtotal + deliveryFee;

  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.cartItemCard} elevated>
      <View style={styles.cartItemContent}>
        <View style={styles.cartItemImage} />
        <View style={styles.cartItemInfo} onPress={() => {}}>
          <Text style={styles.cartItemName}>{item.menuItem.name}</Text>
          <Text style={styles.cartItemPrice}>{formatCurrency(item.menuItem.price)}</Text>
        </View>
        <View style={styles.cartItemControls}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={styles.qtyButton}
            activeOpacity={0.8}
            disabled={item.quantity <= 1}
          >
            <Ionicons name="remove" size={20} color={item.quantity <= 1 ? theme.colors.outline : theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={styles.qtyButton}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => removeItem(item.id)}
          style={styles.removeButton}
        >
          <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {restaurant && (
          <Card style={styles.restaurantHeaderCard}>
            <View style={styles.restaurantHeaderContent}>
              <Ionicons name="storefront-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.restaurantHeaderName}>{items[0].menuItem.name.split(' ')[0]}'s Kitchen</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
            </View>
          </Card>
        )}

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListContentComponentStyle={styles.listContent}
        />

        <Card style={styles.summaryCard}>
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRows}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal ({itemCount} items)</Text>
                <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>{formatCurrency(deliveryFee)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service Fee</Text>
                <Text style={styles.summaryValue}>{formatCurrency(1.50)}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRowTotal}>
                <Text style={styles.summaryLabelTotal}>Total</Text>
                <Text style={styles.summaryValueTotal}>{formatCurrency(grandTotal)}</Text>
              </View>
            </View>
          </View>
        </Card>

        <Button
          title={`Place Order · ${formatCurrency(grandTotal)}`}
          onPress={() => router.push('/(customer)/checkout' as any)}
          fullWidth
          style={styles.checkoutButton}
        />
      </ScrollView>
    </View>
  );
}

const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyCard: {
    alignItems: 'center',
    padding: theme.spacing.xxxl,
    gap: theme.spacing.lg,
  },
  emptyTitle: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: theme.spacing.md,
  },
  restaurantHeaderCard: {
    marginBottom: theme.spacing.md,
  },
  restaurantHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  restaurantHeaderName: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    flex: 1,
  },
  cartItemCard: {
    padding: theme.spacing.md,
  },
  cartItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  cartItemImage: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
  },
  cartItemInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  cartItemName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  cartItemPrice: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  cartItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    ...theme.typography.labelLarge,
    color: theme.colors.onSurface,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: theme.spacing.xs,
  },
  separator: {
    height: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  summaryCard: {
    marginTop: theme.spacing.lg,
  },
  summarySection: {
    gap: theme.spacing.md,
  },
  summaryTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
  },
  summaryRows: {
    gap: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  summaryValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  summaryLabelTotal: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
  },
  summaryValueTotal: {
    ...theme.typography.headlineSmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
    marginVertical: theme.spacing.xs,
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 0,
    left: theme.spacing.md,
    right: theme.spacing.md,
    bottom: theme.spacing.md + 20,
  },
});