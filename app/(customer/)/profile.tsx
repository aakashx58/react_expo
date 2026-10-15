import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/hooks';
import { theme, styles, formatCurrency } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

const MENU_ITEMS = [
  { id: 'orders', label: 'My Orders', icon: 'receipt-outline', badge: '3' },
  { id: 'favorites', label: 'Favorites', icon: 'heart-outline', badge: null },
  { id: 'addresses', label: 'Delivery Addresses', icon: 'location-outline', badge: '2' },
  { id: 'payment', label: 'Payment Methods', icon: 'card-outline', badge: '1' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications-outline', badge: '5' },
  { id: 'help', label: 'Help & Support', icon: 'help-circle-outline', badge: null },
  { id: 'settings', label: 'Settings', icon: 'settings-outline', badge: null },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/welcome' as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Avatar size="xl" name={user?.name || 'Guest'} source={user?.avatar} />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{user?.name || 'Guest User'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'Not signed in'}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>Customer</Text>
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Card style={styles.menuCard}>
            {MENU_ITEMS.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {}}
                style={styles.menuItem}
                activeOpacity={0.8}
              >
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                {item.badge && (
                  <View style={styles.menuBadge}>
                    <Text style={styles.menuBadgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Card style={styles.menuCard}>
            <TouchableOpacity
              onPress={() => router.push('/(customer)/orders' as any)}
              style={styles.quickAction}
              activeOpacity={0.8}
            >
              <View style={styles.quickIcon}>
                <Ionicons name="receipt-outline" size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.quickContent}>
                <Text style={styles.quickLabel}>View All Orders</Text>
                <Text style={styles.quickSubtitle}>Track and manage your orders</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace('/(customer)' as any)}
              style={styles.quickAction}
              activeOpacity={0.8}
            >
              <View style={styles.quickIcon}>
                <Ionicons name="restaurant-outline" size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.quickContent}>
                <Text style={styles.quickLabel}>Browse Restaurants</Text>
                <Text style={styles.quickSubtitle}>Discover new places to eat</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="outline"
            fullWidth
            style={styles.logoutButton}
          />
        </View>

        <View style={styles.version}>
          <Text style={styles.versionText}>FoodFlow v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  profileHeader: {
    marginBottom: theme.spacing.xl,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  profileDetails: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  profileName: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onSurface,
  },
  profileEmail: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  roleText: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.md,
  },
  menuCard: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
  },
  menuBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  menuBadgeText: {
    ...theme.typography.labelSmall,
    color: theme.colors.surface,
    fontWeight: '500',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickContent: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  quickLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  quickSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  logoutButton: {
    marginTop: theme.spacing.md,
  },
  version: {
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  versionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
});