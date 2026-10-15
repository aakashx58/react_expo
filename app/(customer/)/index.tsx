import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth, useRestaurant } from '@/hooks';
import { theme, styles, formatCurrency } from '@/constants/theme';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Restaurant } from '@/types/restaurant';
import { MeshGradient } from '@/components/layout/GradientBackground';

const MOCK_CATEGORIES = ['All', 'Italian', 'Asian', 'Burgers', 'Healthy', 'Desserts'];

export default function CustomerHomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { restaurants, isLoading, fetchRestaurants } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRestaurants();
    setRefreshing(false);
  };

  const filteredRestaurants = selectedCategory === 'All'
    ? restaurants
    : restaurants.filter(r => r.categories.includes(selectedCategory));

  const renderCategory = ({ item }: { item: string }) => {
    const isActive = item === selectedCategory;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        style={[
          styles.categoryPill,
          isActive ? styles.categoryPillActive : {},
        ]}
      >
        <Text style={[
          styles.categoryText,
          isActive ? styles.categoryTextActive : {},
        ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRestaurant = ({ item }: { item: Restaurant }) => (
    <Link href={`/(customer)/restaurant/${item.id}`} as={TouchableOpacity}>
      <Card style={styles.restaurantCard} elevated>
        <View style={styles.restaurantImageContainer}>
          <View style={styles.restaurantImage} />
        </View>
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={theme.colors.warning} />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviewCount})</Text>
            </View>
          </View>
          <Text style={styles.restaurantCategories} numberOfLines={1}>
            {item.categories.slice(0, 3).join(' • ')}
          </Text>
          <View style={styles.restaurantMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.metaText}>{item.deliveryTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="cash-outline" size={14} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.metaText}>
                {item.deliveryFee === 0 ? 'Free' : formatCurrency(item.deliveryFee)} delivery
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </Link>
  );

  return (
    <View style={styles.container}>
      <MeshGradient>
        <View style={styles.gradientHeader}>
          <Header
            showSearch={true}
            showAvatar={true}
            onSearchPress={() => router.push('/(customer)/search' as any)}
          />
        </View>
      </MeshGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            {user?.name ? `Hi, ${user.name.split(' ')[0]}!` : 'Hi there!'}
          </Text>
          <Text style={styles.welcomeSubtext}>What are you craving today?</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.categoryScroll}
          showsHorizontalScrollIndicator={false}
        >
          {MOCK_CATEGORIES.map((cat, i) => (
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

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Restaurants' : `${selectedCategory} Restaurants`}
          </Text>
          <Text style={styles.sectionCount}>{filteredRestaurants.length} places</Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            {[1, 2, 3].map(i => (
              <Card key={i} style={styles.skeletonCard} />
            ))}
          </View>
        ) : filteredRestaurants.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={48} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.emptyText}>No restaurants found</Text>
            <Text style={styles.emptySubtext}>Try a different category</Text>
          </View>
        ) : (
          <FlatList
            data={filteredRestaurants}
            renderItem={renderRestaurant}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Ionicons name="restaurant-outline" size={48} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.emptyText}>No restaurants found</Text>
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  gradientHeader: {
    paddingTop: 0,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  welcomeSection: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  welcomeText: {
    ...theme.typography.headlineLarge,
    color: theme.colors.onSurface,
  },
  welcomeSubtext: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.xs,
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
  sectionCount: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  categoryScroll: {
    paddingRight: theme.spacing.md,
    gap: theme.spacing.sm,
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
  restaurantCard: {
    padding: 0,
    overflow: 'hidden',
  },
  restaurantImageContainer: {
    height: 160,
    width: '100%',
  },
  restaurantImage: {
    flex: 1,
    backgroundColor: theme.colors.surfaceContainer,
  },
  restaurantInfo: {
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  restaurantName: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  ratingText: {
    ...theme.typography.labelMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  reviewCount: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
  },
  restaurantCategories: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  restaurantMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  metaText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  loadingContainer: {
    gap: theme.spacing.md,
  },
  skeletonCard: {
    height: 240,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  emptyText: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
  },
  emptySubtext: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  separator: {
    height: theme.spacing.md,
  },
});