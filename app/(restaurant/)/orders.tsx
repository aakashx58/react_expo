import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth, useRestaurant } from '@/hooks';
import { theme, styles, formatCurrency, formatTime } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Order, OrderStatus } from '@/types/order';

const STATUS_ORDER: OrderStatus[] = ['pending', 'accepted', 'preparing', 'ready', 'delivered'];

export default function RestaurantOrdersScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders, fetchOrders, updateOrderStatus } = useRestaurant();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (user) {
      fetchOrders(user.id, 'restaurant');
    }
  }, [user, fetchOrders]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (user) await fetchOrders(user.id, 'restaurant');
    setRefreshing(false);
  };

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return order.status === 'pending';
    if (selectedFilter === 'active') return ['accepted', 'preparing', 'ready'].includes(order.status);
    if (selectedFilter === 'completed') return ['delivered', 'cancelled'].includes(order.status);
    return true;
  });

  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    const index = STATUS_ORDER.indexOf(status);
    if (index < STATUS_ORDER.length - 1) {
      return STATUS_ORDER[index + 1];
    }
    return null;
  };

  const getActionLabel = (status: OrderStatus): string => {
    switch (status) {
      case 'pending': return 'Accept';
      case 'accepted': return 'Start Preparing';
      case 'preparing': return 'Mark Ready';
      case 'ready': return 'Mark Delivered';
      default: return '';
    }
  };

  const getActionVariant = (status: OrderStatus): 'primary' | 'secondary' | 'success' => {
    if (status === 'pending' || status === 'accepted') return 'primary';
    if (status === 'preparing') return 'secondary';
    if (status === 'ready') return 'success';
    return 'primary';
  };

  const handleStatusUpdate = async (orderId: string, currentStatus: OrderStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;

    try {
      await updateOrderStatus(orderId, nextStatus);
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const renderOrder = ({ item }: { item: Order }) => {
    const nextStatus = getNextStatus(item.status);
    const canUpdate = nextStatus !== null && !['delivered', 'cancelled'].includes(item.status);
    const actionLabel = getActionLabel(item.status);
    const actionVariant = getActionVariant(item.status);

    return (
      <TouchableOpacity
        onPress={() => {}}
        style={styles.orderCard}
        activeOpacity={0.9}
      >
        <Card style={styles.orderCardInner} elevated>
          <View style={styles.orderHeader}>
            <View style={styles.orderTop}>
              <View style={styles.orderCustomer}>
                <Avatar size="sm" name={item.customerName} />
                <View>
                  <Text style={styles.orderCustomerName}>{item.customerName}</Text>
                  <Text style={styles.orderTime}>{formatTime(new Date(item.createdAt))}</Text>
                </View>
              </View>
              <StatusBadge status={item.status} />
            </View>

            {item.deliveryAddress && (
              <View style={styles.orderAddress}>
                <Ionicons name="location-outline" size={14} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.orderAddressText}>{item.deliveryAddress.street}, {item.deliveryAddress.city}</Text>
              </View>
            )}
          </View>

          <View style={styles.orderItems}>
            {item.items.map((cartItem, i) => (
              <View key={i} style={styles.orderItem}>
                <View style={styles.orderItemLeft}>
                  <Text style={styles.orderItemName}>{cartItem.menuItem.name}</Text>
                  <Text style={styles.orderItemQty}>×{cartItem.quantity}</Text>
                </View>
                <Text style={styles.orderItemPrice}>{formatCurrency(cartItem.menuItem.price * cartItem.quantity)}</Text>
              </View>
            ))}
          </View>

          {item.notes && (
            <View style={styles.orderNotes}>
              <Ionicons name="chatbox-outline" size={14} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.orderNotesText}>{item.notes}</Text>
            </View>
          )}

          <View style={styles.orderFooter}>
            <View style={styles.orderFooterLeft}>
              <Text style={styles.orderSubtotal}>Subtotal: {formatCurrency(item.subtotal)}</Text>
              <Text style={styles.orderTotal}>Total: {formatCurrency(item.total)}</Text>
            </View>
            <View style={styles.orderFooterRight}>
              {canUpdate && (
                <Button
                  title={actionLabel}
                  onPress={() => handleStatusUpdate(item.id, item.status)}
                  variant={actionVariant}
                  size="sm"
                  style={styles.actionButton}
                />
              )}
              {item.status === 'delivered' && (
                <Text style={styles.deliveredText}>Delivered</Text>
              )}
              {item.status === 'cancelled' && (
                <Text style={styles.cancelledText}>Cancelled</Text>
              )}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

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
          <View style={styles.headerLeft}>
            <Text style={styles.pageTitle}>Orders</Text>
            <Text style={styles.pageSubtitle}>{orders.length} total orders</Text>
          </View>
        </View>

        <View style={styles.filterTabs}>
          {(['all', 'pending', 'active', 'completed'] as const).map(filter => (
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

        {isLoading ? (
          <View style={styles.loadingContainer}>
            {[1, 2, 3].map(i => (
              <Card key={i} style={styles.skeletonCard} />
            ))}
          </View>
        ) : filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.emptyTitle}>No orders</Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === 'pending' ? 'No pending orders' :
               selectedFilter === 'active' ? 'No active orders' :
               selectedFilter === 'completed' ? 'No completed orders' :
               'Orders will appear here'}
            </Text>
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

const isLoading = false;

const ordersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  headerLeft: {
    gap: theme.spacing.xs,
  },
  pageTitle: {
    ...theme.typography.displaySmall,
    color: theme.colors.onSurface,
  },
  pageSubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  filterTabs: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  filterTab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    alignItems: 'center',
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
    marginBottom: 0,
  },
  orderCardInner: {
    padding: theme.spacing.md,
  },
  orderHeader: {
    marginBottom: theme.spacing.md,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  orderCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  orderCustomerName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  orderTime: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  orderAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  orderAddressText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  orderItems: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  orderItemLeft: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  orderItemName: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurface,
  },
  orderItemQty: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  orderItemPrice: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  orderNotes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  orderNotesText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurface,
    flex: 1,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderFooterLeft: {
    gap: theme.spacing.xs,
  },
  orderSubtotal: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  orderTotal: {
    ...theme.typography.headlineSmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  orderFooterRight: {
    alignItems: 'flex-end',
  },
  actionButton: {
    minWidth: 120,
  },
  deliveredText: {
    ...theme.typography.labelMedium,
    color: theme.colors.success,
  },
  cancelledText: {
    ...theme.typography.labelMedium,
    color: theme.colors.error,
  },
  loadingContainer: {
    gap: theme.spacing.md,
  },
  skeletonCard: {
    height: 200,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.md,
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
  separator: {
    height: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
});