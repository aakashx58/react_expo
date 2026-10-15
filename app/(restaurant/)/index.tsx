import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth, useRestaurant } from '@/hooks';
import { theme, styles, formatCurrency } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Order, OrderStatus } from '@/types/order';

const STATUS_ORDER: OrderStatus[] = ['pending', 'accepted', 'preparing', 'ready', 'delivered'];

export default function RestaurantDashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders, menuItems, fetchOrders, isLoading } = useRestaurant();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'active'>('all');

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

  const restaurantOrders = orders;
  const pendingOrders = restaurantOrders.filter(o => o.status === 'pending');
  const activeOrders = restaurantOrders.filter(o => ['accepted', 'preparing', 'ready'].includes(o.status));
  const completedToday = restaurantOrders.filter(o => 
    o.status === 'delivered' && 
    new Date(o.createdAt).toDateString() === new Date().toDateString()
  );

  const todayRevenue = completedToday.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = completedToday.length > 0 ? todayRevenue / completedToday.length : 0;

  const filteredOrders = selectedFilter === 'all'
    ? restaurantOrders
    : selectedFilter === 'pending'
    ? pendingOrders
    : activeOrders;

  const statCards = [
    { label: "Today's Revenue", value: formatCurrency(todayRevenue), icon: 'cash-outline', color: theme.colors.success },
    { label: 'Total Orders', value: restaurantOrders.length.toString(), icon: 'receipt-outline', color: theme.colors.primary },
    { label: 'Pending', value: pendingOrders.length.toString(), icon: 'time-outline', color: theme.colors.warning },
    { label: 'Avg. Order', value: formatCurrency(avgOrderValue), icon: 'calculator-outline', color: theme.colors.accent },
  ];

  const quickActions = [
    { label: 'Add Menu Item', icon: 'add-circle-outline', href: '/(restaurant)/menu?add=true' },
    { label: 'View All Orders', icon: 'list-outline', href: '/(restaurant)/orders' },
    { label: 'Edit Profile', icon: 'settings-outline', href: '/(restaurant)/profile' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.headerCard}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Avatar size="lg" name={user?.name || 'Restaurant'} />
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{user?.name || 'Restaurant Owner'}</Text>
                <Text style={styles.headerRestaurant}>{user?.email || ''}</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color={theme.colors.onSurface} />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <View style={styles.statsGrid}>
          {statCards.map((stat, i) => (
            <Card key={i} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name={stat.icon} size={24} color={stat.color} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => router.push(action.href as any)}
                style={styles.quickAction}
                activeOpacity={0.9}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name={action.icon} size={24} color={theme.colors.primary} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <View style={styles.orderFilters}>
              {(['all', 'pending', 'active'] as const).map(filter => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setSelectedFilter(filter)}
                  style={[
                    styles.filterPill,
                    selectedFilter === filter && styles.filterPillActive,
                  ]}
                >
                  <Text style={[
                    styles.filterPillText,
                    selectedFilter === filter && styles.filterPillTextActive,
                  ]}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              {[1, 2, 3].map(i => (
                <Card key={i} style={styles.skeletonCard} />
              ))}
            </View>
          ) : filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={48} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.emptyTitle}>
                {selectedFilter === 'pending' ? 'No pending orders' : 'No active orders'}
              </Text>
              <Text style={styles.emptySubtitle}>
                New orders will appear here
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
        </View>
      </ScrollView>
    </View>
  );
}

const renderOrder = ({ item }: { item: Order }) => {
  const canAccept = item.status === 'pending';
  const canPrepare = item.status === 'accepted';
  const canReady = item.status === 'preparing';
  const canDeliver = item.status === 'ready';

  return (
    <TouchableOpacity
      onPress={() => {}}
      style={styles.orderCard}
      activeOpacity={0.9}
    >
      <Card style={styles.orderCardInner} elevated>
        <View style={styles.orderHeader}>
          <View style={styles.orderCustomer}>
            <Avatar size="sm" name={item.customerName} />
            <View>
              <Text style={styles.orderCustomerName}>{item.customerName}</Text>
              <Text style={styles.orderTime}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
          </View>
          <StatusBadge status={item.status} />
        </View>

        <View style={styles.orderItems}>
          {item.items.slice(0, 3).map((cartItem, i) => (
            <View key={i} style={styles.orderItem}>
              <Text style={styles.orderItemName}>{cartItem.menuItem.name}</Text>
              <Text style={styles.orderItemQty}>×{cartItem.quantity}</Text>
            </View>
          ))}
          {item.items.length > 3 && (
            <Text style={styles.orderItemMore}>+{item.items.length - 3} more</Text>
          )}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>{formatCurrency(item.total)}</Text>
          <View style={styles.orderActions}>
            {canAccept && (
              <Button
                title="Accept"
                onPress={() => {}}
                variant="primary"
                size="sm"
                style={styles.actionButton}
              />
            )}
            {canPrepare && (
              <Button
                title="Start Preparing"
                onPress={() => {}}
                variant="primary"
                size="sm"
                style={styles.actionButton}
              />
            )}
            {canReady && (
              <Button
                title="Mark Ready"
                onPress={() => {}}
                variant="secondary"
                size="sm"
                style={styles.actionButton}
              />
            )}
            {canDeliver && (
              <Button
                title="Mark Delivered"
                onPress={() => {}}
                variant="success"
                size="sm"
                style={styles.actionButton}
              />
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

import { Alert } from 'react-native';

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  headerCard: {
    marginBottom: theme.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  headerText: {
    gap: theme.spacing.xs,
  },
  headerName: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onSurface,
  },
  headerRestaurant: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    padding: theme.spacing.xs,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '48%',
    padding: theme.spacing.lg,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statContent: {
    gap: theme.spacing.xs,
  },
  statValue: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onSurface,
    fontWeight: '600',
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  quickAction: {
    flex: 1,
    minWidth: '48%',
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.level1,
  },
  quickActionLabel: {
    ...theme.typography.labelMedium,
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  orderFilters: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  filterPill: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  filterPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterPillText: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
  },
  filterPillTextActive: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  orderTotal: {
    ...theme.typography.headlineSmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  orderActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    minWidth: 100,
  },
  loadingContainer: {
    gap: theme.spacing.md,
  },
  skeletonCard: {
    height: 160,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  emptyTitle: {
    ...theme.typography.headlineSmall,
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