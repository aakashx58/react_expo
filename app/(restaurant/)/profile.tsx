import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/hooks';
import { theme, styles } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';

const MENU_ITEMS = [
  { id: 'profile', label: 'Business Profile', icon: 'storefront-outline' },
  { id: 'hours', label: 'Operating Hours', icon: 'time-outline' },
  { id: 'delivery', label: 'Delivery Settings', icon: 'bike-outline' },
  { id: 'payments', label: 'Payout Settings', icon: 'card-outline' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications-outline' },
  { id: 'help', label: 'Help & Support', icon: 'help-circle-outline' },
  { id: 'settings', label: 'Settings', icon: 'settings-outline' },
];

export default function RestaurantProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [restaurantName, setRestaurantName] = useState('Bella Italia');
  const [ownerName, setOwnerName] = useState('Maria Rossi');
  const [email, setEmail] = useState('owner@bella.com');
  const [phone, setPhone] = useState('+1 (555) 987-6543');
  const [address, setAddress] = useState('123 Main St, Downtown, SF 94102');
  const [description, setDescription] = useState('Authentic Italian cuisine with wood-fired pizzas and handmade pasta.');

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/welcome' as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Card style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Avatar size="xl" name={restaurantName} />
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>{restaurantName}</Text>
                <Text style={styles.profileOwner}>{ownerName} • Owner</Text>
                <View style={styles.roleBadge}>
                  <Text style={styles.roleText}>Restaurant</Text>
                </View>
              </View>
            </View>
          </Card>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Information</Text>
            <Card style={styles.formCard}>
              <View style={styles.form}>
                <Input
                  label="Restaurant Name"
                  placeholder="Bella Italia"
                  value={restaurantName}
                  onChangeText={setRestaurantName}
                  leftIcon={<Ionicons name="storefront-outline" size={22} color={theme.colors.onSurfaceVariant} />}
                />
                <Input
                  label="Owner Name"
                  placeholder="Maria Rossi"
                  value={ownerName}
                  onChangeText={setOwnerName}
                  leftIcon={<Ionicons name="person-outline" size={22} color={theme.colors.onSurfaceVariant} />}
                />
                <Input
                  label="Email"
                  placeholder="owner@restaurant.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Ionicons name="mail-outline" size={22} color={theme.colors.onSurfaceVariant} />}
                />
                <Input
                  label="Phone"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  leftIcon={<Ionicons name="call-outline" size={22} color={theme.colors.onSurfaceVariant} />}
                />
                <Input
                  label="Address"
                  placeholder="123 Main St, City, State ZIP"
                  value={address}
                  onChangeText={setAddress}
                  multiline
                  numberOfLines={2}
                  leftIcon={<Ionicons name="location-outline" size={22} color={theme.colors.onSurfaceVariant} />}
                />
                <Input
                  label="Description"
                  placeholder="Tell customers about your restaurant"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  leftIcon={<Ionicons name="document-text-outline" size={22} color={theme.colors.onSurfaceVariant} />}
                />
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account & Settings</Text>
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
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
                </TouchableOpacity>
              ))}
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
            <Text style={styles.versionText}>FoodFlow Restaurant v1.0.0</Text>
          </View>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
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
  profileOwner: {
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
  formCard: {
    marginBottom: theme.spacing.md,
  },
  form: {
    gap: theme.spacing.lg,
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
  menuLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    flex: 1,
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