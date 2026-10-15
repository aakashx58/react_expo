import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useRouter, useLocalSearchParams } from 'expo-router';

type TabItem = {
  name: string;
  label: string;
  icon: string;
  activeIcon: string;
  href: string;
};

const CUSTOMER_TABS: TabItem[] = [
  { name: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home', href: '/(customer)' },
  { name: 'orders', label: 'Orders', icon: 'receipt-outline', activeIcon: 'receipt', href: '/(customer)/orders' },
  { name: 'cart', label: 'Cart', icon: 'cart-outline', activeIcon: 'cart', href: '/(customer)/cart' },
  { name: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person', href: '/(customer)/profile' },
];

const RESTAURANT_TABS: TabItem[] = [
  { name: 'dashboard', label: 'Dashboard', icon: 'speedometer-outline', activeIcon: 'speedometer', href: '/(restaurant)' },
  { name: 'menu', label: 'Menu', icon: 'list-outline', activeIcon: 'list', href: '/(restaurant)/menu' },
  { name: 'orders', label: 'Orders', icon: 'receipt-outline', activeIcon: 'receipt', href: '/(restaurant)/orders' },
  { name: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person', href: '/(restaurant)/profile' },
];

interface TabBarProps {
  tabs: TabItem[];
  activeTab?: string;
}

export const TabBar = ({ tabs, activeTab }: TabBarProps) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const currentPath = params.href as string || '/';

  const getActiveTab = () => {
    if (activeTab) return activeTab;
    return tabs.find(tab => currentPath.startsWith(tab.href))?.name || tabs[0].name;
  };

  const active = getActiveTab();

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = tab.name === active;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.replace(tab.href as any)}
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={24}
                color={isActive ? theme.colors.primary : theme.colors.onSurfaceVariant}
              />
              {isActive && (
                <View style={styles.activeIndicator} />
              )}
            </View>
            <Text style={[
              styles.tabLabel,
              { color: isActive ? theme.colors.primary : theme.colors.onSurfaceVariant },
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const CustomerTabBar = () => <TabBar tabs={CUSTOMER_TABS} />;
export const RestaurantTabBar = () => <TabBar tabs={RESTAURANT_TABS} />;

const tabStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineVariant,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  activeIndicator: {
    position: 'absolute',
    top: -4,
    left: '50%',
    transform: [{ translateX: -2 }],
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
  tabLabel: {
    ...theme.typography.labelSmall,
    fontSize: 11,
  },
});