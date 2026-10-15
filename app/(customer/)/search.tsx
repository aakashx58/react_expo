import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useRestaurant } from '@/hooks';
import { theme, styles, formatCurrency } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Restaurant, MenuItem } from '@/types';

export default function SearchScreen() {
  const router = useRouter();
  const { restaurants, menuItems, fetchRestaurants, isLoading } = useRestaurant();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ type: 'restaurant' | 'item'; data: Restaurant | MenuItem }[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  useEffect(() => {
    if (query.length >= 2) {
      const restaurantMatches = restaurants
        .filter(r => r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.categories.some(c => c.toLowerCase().includes(query.toLowerCase())))
        .map(r => ({ type: 'restaurant' as const, data: r }));

      const itemMatches = menuItems
        .filter(item => item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()))
        .map(item => ({ type: 'item' as const, data: item }));

      setResults([...restaurantMatches, ...itemMatches].slice(0, 10));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query, restaurants, menuItems]);

  const handleResultPress = (result: { type: 'restaurant' | 'item'; data: Restaurant | MenuItem }) => {
    setQuery('');
    setShowResults(false);
    if (result.type === 'restaurant') {
      router.push(`/(customer)/restaurant/${result.data.id}` as any);
    }
  };

  const recentSearches = ['Pizza', 'Sushi', 'Burgers', 'Healthy', 'Desserts'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants, cuisines, dishes..."
          value={query}
          onChangeText={setQuery}
          onFocus={() => setShowResults(query.length >= 2)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {showResults && query.length >= 2 && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Results for "{query}"</Text>
            {results.length === 0 ? (
              <View style={styles.noResults}>
                <Ionicons name="search-outline" size={48} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.noResultsText}>No results found</Text>
              </View>
            ) : (
              <FlatList
                data={results}
                renderItem={({ item }) => {
                  if (item.type === 'restaurant') {
                    const r = item.data as Restaurant;
                    return (
                      <TouchableOpacity
                        key={r.id}
                        onPress={() => handleResultPress(item)}
                        style={styles.resultItem}
                        activeOpacity={0.8}
                      >
                        <View style={styles.resultIcon}>
                          <Ionicons name="storefront-outline" size={24} color={theme.colors.primary} />
                        </View>
                        <View style={styles.resultInfo}>
                          <Text style={styles.resultName}>{r.name}</Text>
                          <Text style={styles.resultMeta}>{r.categories.slice(0, 3).join(' • ')} · {r.deliveryTime}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
                      </TouchableOpacity>
                    );
                  } else {
                    const m = item.data as MenuItem;
                    const restaurant = restaurants.find(r => r.id === m.restaurantId);
                    return (
                      <TouchableOpacity
                        key={m.id}
                        onPress={() => handleResultPress(item)}
                        style={styles.resultItem}
                        activeOpacity={0.8}
                      >
                        <View style={styles.resultIcon}>
                          <Ionicons name="fast-food-outline" size={24} color={theme.colors.primary} />
                        </View>
                        <View style={styles.resultInfo}>
                          <Text style={styles.resultName}>{m.name}</Text>
                          <Text style={styles.resultMeta}>{restaurant?.name} · {formatCurrency(m.price)}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
                      </TouchableOpacity>
                    );
                  }
                }}
                keyExtractor={item => item.data.id}
                ItemSeparatorComponent={() => <View style={styles.resultDivider} />}
              />
            )}
          </View>
        )}

        {!showResults && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Searches</Text>
              <View style={styles.popularGrid}>
                {recentSearches.map((search, i) => (
                  <TouchableOpacity
                    key={search}
                    onPress={() => {
                      setQuery(search);
                      setShowResults(true);
                    }}
                    style={styles.popularPill}
                  >
                    <Text style={styles.popularPillText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <ScrollView
                horizontal
                contentContainerStyle={styles.categoryScroll}
                showsHorizontalScrollIndicator={false}
              >
                {['Italian', 'Asian', 'Burgers', 'Healthy', 'Desserts', 'Drinks', 'Mexican', 'Indian'].map((cat, i) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => {
                      setQuery(cat);
                      setShowResults(true);
                    }}
                    style={styles.categoryPill}
                  >
                    <Text style={styles.categoryPillText}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <View style={styles.recentList}>
                {recentSearches.slice(0, 5).map((search, i) => (
                  <TouchableOpacity
                    key={search}
                    onPress={() => {
                      setQuery(search);
                      setShowResults(true);
                    }}
                    style={styles.recentItem}
                  >
                    <Ionicons name="time-outline" size={20} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.recentText}>{search}</Text>
                    <Ionicons name="close" size={20} color={theme.colors.onSurfaceVariant} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  searchInput: {
    height: 52,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: theme.spacing.md,
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  resultsSection: {
    marginBottom: theme.spacing.xl,
  },
  resultsTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  resultIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  resultName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  resultMeta: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  resultDivider: {
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  noResultsText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.md,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  popularPill: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  popularPillText: {
    ...theme.typography.labelMedium,
    color: theme.colors.onSurface,
  },
  categoryScroll: {
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
  categoryPillText: {
    ...theme.typography.labelMedium,
    color: theme.colors.onSurfaceVariant,
  },
  recentList: {
    gap: theme.spacing.xs,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
  },
  recentText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    flex: 1,
    marginHorizontal: theme.spacing.md,
  },
});