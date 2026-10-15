import React, { forwardRef } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import { theme } from '@/constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    style,
    inputStyle,
    containerStyle,
    secureTextEntry = false,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasError = !!error;

    return (
      <View style={[inputStyles.inputContainer, containerStyle]}>
        {label && (
          <Text
            style={[
              inputStyles.inputLabel,
              { color: hasError ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.onSurfaceVariant },
            ]}
          >
            {label}
          </Text>
        )}
        <View
          style={[
            inputStyles.inputWrapper,
            isFocused && inputStyles.inputFocused,
            hasError && inputStyles.inputError,
            style,
          ]}
        >
          {leftIcon && (
            <View style={inputStyles.inputIcon}>
              {leftIcon}
            </View>
          )}
          <TextInput
            ref={ref}
            secureTextEntry={secureTextEntry}
            style={[
              inputStyles.input,
              inputStyle,
              { color: theme.colors.onSurface },
            ]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            {...props}
          />
          {rightIcon && (
            <View style={inputStyles.inputIcon}>
              {rightIcon}
            </View>
          )}
        </View>
        {(error || helperText) && (
          <Text
            style={[
              inputStyles.inputHelper,
              { color: hasError ? theme.colors.error : theme.colors.onSurfaceVariant },
            ]}
          >
            {error || helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const inputStyles = StyleSheet.create({
  inputContainer: {
    gap: theme.spacing.xs,
    width: '100%',
  },
  inputLabel: {
    ...theme.typography.labelMedium,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  inputError: {
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: theme.spacing.md,
    ...theme.typography.bodyLarge,
  },
  inputIcon: {
    paddingHorizontal: theme.spacing.sm,
  },
  inputHelper: {
    ...theme.typography.bodySmall,
  },
});