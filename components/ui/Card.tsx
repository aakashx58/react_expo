import React from 'react';
import { View, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  padded?: boolean;
  gradient?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card = React.forwardRef<
  React.ElementRef<typeof View>,
  CardProps
>(({ children, elevated = false, padded = true, gradient = false, style, onPress }, ref) => {
  const Content = onPress ? TouchableOpacity : View;

  return (
    <Content
      ref={ref}
      onPress={onPress}
      style={[
        gradient ? styles.heroCard : elevated ? styles.cardElevated : styles.card,
        padded ? { padding: theme.spacing.lg } : {},
        gradient ? { backgroundColor: 'transparent' } : {},
        style,
      ]}
      activeOpacity={onPress ? 0.95 : undefined}
    >
      {children}
    </Content>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => (
  <View style={[styles.cardHeader, style]}>{children}</View>
);

export const CardContent = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => (
  <View style={[styles.cardContent, style]}>{children}</View>
);

export const CardFooter = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => (
  <View style={[styles.cardFooter, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.level2,
  },
  cardElevated: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.level3,
  },
  heroCard: {
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.xl,
    minHeight: 280,
    justifyContent: 'flex-end',
  },
  cardHeader: {
    marginBottom: theme.spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  cardFooter: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineVariant,
  },
});