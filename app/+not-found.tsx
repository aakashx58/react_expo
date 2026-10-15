import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={notFoundStyles.container}>
      <View style={notFoundStyles.content}>
        <Ionicons name="compass-outline" size={64} color={theme.colors.primary} />
        <Text style={notFoundStyles.title}>Page Not Found</Text>
        <Text style={notFoundStyles.subtitle}>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <View style={notFoundStyles.actions}>
          <Button
            title="Go Home"
            onPress={() => router.replace('/(auth)/welcome' as any)}
            fullWidth
          />
          <Button
            title="Back"
            onPress={() => router.back()}
            variant="secondary"
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

const notFoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  title: {
    ...theme.typography.headlineLarge,
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
});