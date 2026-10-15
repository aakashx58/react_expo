import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { Avatar } from '@/components/ui/Avatar';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showAvatar?: boolean;
  onSearchPress?: () => void;
  onAvatarPress?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export const Header = ({
  title,
  showSearch = false,
  showAvatar = false,
  onSearchPress,
  onAvatarPress,
  leftAction,
  rightAction,
  style,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <View style={[styles.header, style]}>
      {leftAction || (title && (
        <Text style={[styles.title, theme.typography.headlineMedium]}>{title}</Text>
      ))}
      <View style={styles.actions}>
        {showSearch && (
          <TouchableOpacity
            onPress={onSearchPress || (() => router.push('/(customer)/search' as any))}
            style={styles.actionButton}
          >
            <Ionicons name="search" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
        )}
        {showAvatar && (
          <TouchableOpacity
            onPress={onAvatarPress || (() => router.push('/(customer)/profile' as any))}
            style={styles.actionButton}
          >
            <Avatar size="md" name="Alex Johnson" />
          </TouchableOpacity>
        )}
        {rightAction}
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  title: {
    color: theme.colors.onSurface,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.xs,
  },
});

export const SearchHeader = ({ onSearchPress, onFilterPress }: { onSearchPress?: () => void; onFilterPress?: () => void }) => (
  <View style={searchStyles.searchHeader}>
    <TouchableOpacity onPress={onSearchPress} style={searchStyles.searchBar}>
      <Ionicons name="search" size={22} color={theme.colors.onSurfaceVariant} style={searchStyles.searchIcon} />
      <Text style={searchStyles.searchPlaceholder}>Search restaurants, cuisines...</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onFilterPress} style={searchStyles.filterButton}>
      <Ionicons name="funnel-outline" size={24} color={theme.colors.onSurface} />
    </TouchableOpacity>
  </View>
);

const searchStyles = StyleSheet.create({
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.xs,
  },
  searchPlaceholder: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    flex: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
});