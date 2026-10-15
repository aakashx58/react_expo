import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@/constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const buttonStyles = StyleSheet.create({
  buttonPrimary: {
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  buttonSecondary: {
    height: 52,
    borderRadius: 26,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.outline,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  buttonGhost: {
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  buttonSuccess: {
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { height: 40, paddingHorizontal: theme.spacing.md },
  md: { height: 52, paddingHorizontal: theme.spacing.xl },
  lg: { height: 56, paddingHorizontal: theme.spacing.xxl },
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: buttonStyles.buttonPrimary,
  secondary: buttonStyles.buttonSecondary,
  outline: {
    ...buttonStyles.buttonSecondary,
    backgroundColor: 'transparent',
  },
  ghost: buttonStyles.buttonGhost,
  success: buttonStyles.buttonSuccess,
};

const textStyles: Record<ButtonVariant, TextStyle> = {
  primary: { ...theme.typography.labelLarge, color: theme.colors.surface },
  secondary: { ...theme.typography.labelLarge, color: theme.colors.primary },
  outline: { ...theme.typography.labelLarge, color: theme.colors.primary },
  ghost: { ...theme.typography.labelLarge, color: theme.colors.primary },
  success: { ...theme.typography.labelLarge, color: theme.colors.surface },
};

export const Button = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}, ref) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        variantStyles[variant],
        sizeStyles[size],
        { width: fullWidth ? '100%' : undefined, opacity: isDisabled ? 0.6 : 1 },
        style,
      ]}
      activeOpacity={0.9}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'success' ? theme.colors.surface : theme.colors.primary} size="small" />
      ) : (
        <>
          {icon && <View style={{ marginRight: theme.spacing.sm }}>{icon}</View>}
          <Text style={[textStyles[variant], textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';