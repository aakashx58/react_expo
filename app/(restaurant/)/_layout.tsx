import React from 'react';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';

export default function RestaurantLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}