import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@/constants/theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: theme.colors.surfaceContainer, text: theme.colors.onSurfaceVariant },
  success: { bg: theme.colors.statusReadyBg, text: theme.colors.statusReady },
  warning: { bg: theme.colors.statusPreparingBg, text: theme.colors.statusPreparing },
  error: { bg: theme.colors.statusCancelledBg, text: theme.colors.statusCancelled },
  info: { bg: theme.colors.statusAcceptedBg, text: theme.colors.statusAccepted },
};

const sizeStyles: Record<BadgeSize, ViewStyle> = {
  sm: { height: 20, paddingHorizontal: theme.spacing.sm, borderRadius: 10 },
  md: { height: 24, paddingHorizontal: theme.spacing.md, borderRadius: 12 },
};

const textSizeStyles: Record<BadgeSize, TextStyle> = {
  sm: { ...theme.typography.labelSmall, fontSize: 10 },
  md: theme.typography.labelSmall,
};

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) => {
  const colors = variantColors[variant];

  return (
    <View
      style={[
        sizeStyles[size],
        { backgroundColor: colors.bg },
        style,
      ]}
    >
      <Text style={[textSizeStyles[size], { color: colors.text, fontWeight: '500' }, textStyle]}>
        {children}
      </Text>
    </View>
  );
};

export const StatusBadge = ({ status }: { status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'cancelled' }) => {
  const statusMap: Record<string, BadgeVariant> = {
    pending: 'warning',
    accepted: 'info',
    preparing: 'warning',
    ready: 'success',
    delivered: 'success',
    cancelled: 'error',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Pending',
    accepted: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  return <Badge variant={statusMap[status] || 'default'}>{statusLabels[status] || status}</Badge>;
};