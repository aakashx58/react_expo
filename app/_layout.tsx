import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { RestaurantProvider } from '@/context/RestaurantContext';
import { useAuth } from '@/hooks';
import { theme } from '@/constants/theme';

function RootLayoutInner() {
  const router = useRouter();
  const { isLoading, isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (role === 'customer') {
        router.replace('/(customer)' as any);
      } else if (role === 'restaurant') {
        router.replace('/(restaurant)' as any);
      }
    } else if (!isLoading && !isAuthenticated) {
      router.replace('/(auth)/welcome' as any);
    }
  }, [isLoading, isAuthenticated, role, router]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(customer)" />
      <Stack.Screen name="(restaurant)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <RestaurantProvider>
          <RootLayoutInner />
        </RestaurantProvider>
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
});