import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth, useRestaurant } from '@/hooks';
import { theme, styles, formatCurrency, formatTime } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Order, OrderStatus } from '@/types/order';

const STATUS_ORDER: OrderStatus[] = ['pending', 'accepted', 'preparing', 'ready', 'delivered'];

export default function OrdersScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders, fetchOrders, isLoading } = useRestaurant();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'past'>('all');

  useEffect(() => {
    if (user) {
      fetchOrders(user.id, 'customer');
    }
  }, [user, fetchOrders]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (user) await fetchOrders(user.id, 'customer');
    setRefreshing(false);
  };

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return !['delivered', 'cancelled'].includes(order.status);
    if (selectedFilter === 'past') return ['delivered', 'cancelled'].includes(order.status);
    return true;
  });

  const getStatusProgress = (status: OrderStatus) => {
    return STATUS_ORDER.indexOf(status);
  };

  const renderOrder = ({ item }: { item: Order }) => {
    const progress = getStatusProgress(item.status);
    const isActive = !['delivered', 'cancelled'].includes(item.status);

    return (
      <TouchableOpacity
        onPress={() => router.push(`/(customer)/order-detail/${item.id}` as any)}
        activeOpacity={0.9}
      >
        <Card style={styles.orderCard} elevated>
          <View style={styles.orderHeader}>
            <View style={styles.orderRestaurant}>
              <Ionicons name="storefront-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.orderRestaurantName} numberOfLines={1}>{item.restaurantName}</Text>
            </View>
            <StatusBadge status={item.status} />
          </View>

          <View style={styles.orderProgress}>
            {STATUS_ORDER.map((status, index) => (
              <View key={status} style={styles.progressStep}>
                <View style={[
                  styles.progressDot,
                  index <= progress ? styles.progressDotActive : {},
                  index === progress && isActive ? styles.progressDotCurrent : {},
                ]} />
                {index < STATUS_ORDER.length - 1 && (
                  <View style={[
                    styles.progressLine,
                    index < progress ? styles.progressLineActive : {},
                  ]} />
                )}
              </View>
            ))}
          </View>

          <View style={styles.orderItems}>
            {item.items.slice(0, 3).map((cartItem, i) => (
              <View key={i} style={styles.orderItem}>
                <Text style={styles.orderItemName}>{cartItem.menuItem.name}</Text>
                <Text style={styles.orderItemQty}>×{cartItem.quantity}</Text>
              </View>
            ))}
            {item.items.length > 3 && (
              <Text style={styles.orderItemMore}>+{item.items.length - 3} more items</Text>
            )}
          </View>

          <View style={styles.orderFooter}>
            <View style={styles.orderFooterLeft}>
              <Text style={styles.orderTime}>{formatTime(new Date(item.createdAt))}</Text>
              <Text style={styles.orderTotal}>{formatCurrency(item.total)}</Text>
            </View>
            <View style={styles.orderFooterRight}>
              {isActive && (
                <Button
                  title="Track"
                  onPress={() => router.push(`/(customer)/order-detail/${item.id}` as any)}
                  variant="secondary"
                  size="sm"
                />
              )}
              {item.status === 'delivered' && (
                <Button
                  title="Reorder"
                  onPress={() => Alert.alert('Reorder', 'Feature coming soon!')}
                  variant="ghost"
                  size="sm"
                />
              )}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.pageTitle}>My Orders</Text>
          <View style={styles.filterTabs}>
            {(['all', 'active', 'past'] as const).map(filter => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  styles.filterTab,
                  selectedFilter === filter && styles.filterTabActive,
                ]}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === filter && styles.filterTabTextActive,
                ]}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.emptyTitle}>
              {selectedFilter === 'active' ? 'No active orders' : 'No past orders'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === 'active'
                ? 'Your active orders will appear here'
                : 'Your order history will appear here'}
            </Text>
            {selectedFilter !== 'all' && (
              <Button
                title="View All Orders"
                onPress={() => setSelectedFilter('all')}
                variant="secondary"
                style={styles.emptyButton}
              />
            )}
            {selectedFilter === 'all' && (
              <Button
                title="Browse Restaurants"
                onPress={() => router.replace('/(customer)' as any)}
                style={styles.emptyButton}
              />
            )}
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            renderItem={renderOrder}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListContentComponentStyle={styles.listContent}
          />
        )}
      </ScrollView>
    </View>
  );
}

import { Alert } from 'react-native';

const ordersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
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
  header: {
    marginBottom: theme.spacing.lg,
  },
  pageTitle: {
    ...theme.typography.displaySmall,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.md,
  },
  filterTabs: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  filterTab: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterTabText: {
    ...theme.typography.labelMedium,
    color: theme.colors.onSurfaceVariant,
  },
  filterTabTextActive: {
    color: theme.colors.surface,
    fontWeight: '500',
  },
  orderCard: {
    padding: theme.spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  orderRestaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  orderRestaurantName: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
  },
  orderProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  progressStep: {
    flex: 1,
    alignItems: 'center',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.outlineVariant,
  },
  progressDotActive: {
    backgroundColor: theme.colors.primary,
  },
  progressDotCurrent: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: theme.colors.surface,
  },
  progressLine: {
    position: 'absolute',
    left: '50%',
    right: '50%',
    top: 5,
    height: 2,
    backgroundColor: theme.colors.outlineVariant,
  },
  progressLineActive: {
    backgroundColor: theme.colors.primary,
  },
  orderItems: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.xs,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderItemName: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurface,
    flex: 1,
  },
  orderItemQty: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  orderItemMore: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineVariant,
  },
  orderFooterLeft: {
    gap: theme.spacing.xs,
  },
  orderTime: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  orderTotal: {
    ...theme.typography.headlineSmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  orderFooterRight: {
    gap: theme.spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
    paddingHorizontal: theme.spacing.xl,
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
  separator: {
    height: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
});