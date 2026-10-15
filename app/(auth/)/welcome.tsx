import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { theme, styles } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GradientBackground } from '@/components/layout/GradientBackground';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleRoleSelect = (role: 'customer' | 'restaurant') => {
    router.push(`/${role}-login` as any);
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="restaurant-outline" size={64} color={theme.colors.surface} />
          </View>
          <Text style={[styles.title, theme.typography.displayMedium]}>FoodFlow</Text>
          <Text style={styles.subtitle}>Fresh food delivered fast</Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            onPress={() => handleRoleSelect('customer')}
            style={styles.roleCard}
            activeOpacity={0.9}
          >
            <View style={styles.roleIcon}>
              <Ionicons name="person-outline" size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.roleTitle, theme.typography.headlineMedium]}>I'm a Customer</Text>
            <Text style={styles.roleDesc}>Browse restaurants, order food, track delivery</Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.feature}>🍕 Restaurant discovery</Text>
              <Text style={styles.feature}>🛒 Easy ordering</Text>
              <Text style={styles.feature}>📍 Live tracking</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleRoleSelect('restaurant')}
            style={styles.roleCard}
            activeOpacity={0.9}
          >
            <View style={styles.roleIcon}>
              <Ionicons name="storefront-outline" size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.roleTitle, theme.typography.headlineMedium]}>I'm a Restaurant</Text>
            <Text style={styles.roleDesc}>Manage menu, track orders, view analytics</Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.feature}>📊 Dashboard analytics</Text>
              <Text style={styles.feature}>🍽️ Menu management</Text>
              <Text style={styles.feature}>📦 Order fulfillment</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text>{' '}
            and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxl,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.level3,
  },
  title: {
    color: theme.colors.surface,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.surface,
    opacity: 0.9,
    ...theme.typography.bodyLarge,
  },
  cardsContainer: {
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xxl,
  },
  roleCard: {
    ...styles.cardElevated,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  roleTitle: {
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  roleDesc: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    ...theme.typography.bodyMedium,
    marginBottom: theme.spacing.lg,
  },
  roleFeatures: {
    gap: theme.spacing.sm,
    width: '100%',
  },
  feature: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
  },
  footerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  link: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
});