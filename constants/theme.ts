import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const theme = {
  colors: {
    primary: '#1B5E20',
    primaryLight: '#66BB6A',
    accent: '#81C784',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F8E9',
    surfaceContainer: '#ECF2EC',
    onSurface: '#1A331A',
    onSurfaceVariant: '#5C685D',
    outline: '#C4D1C4',
    outlineVariant: '#E8F5E9',
    error: '#C62828',
    errorContainer: '#FFEBEE',
    success: '#2E7D32',
    warning: '#F9A825',
    statusPending: '#F57C00',
    statusPendingBg: '#FFF3E0',
    statusAccepted: '#1976D2',
    statusAcceptedBg: '#E3F2FD',
    statusPreparing: '#F9A825',
    statusPreparingBg: '#FFFDE7',
    statusReady: '#388E3C',
    statusReadyBg: '#E8F5E9',
    statusDelivered: '#1B5E20',
    statusDeliveredBg: '#C8E6C9',
    statusCancelled: '#C62828',
    statusCancelledBg: '#FFEBEE',
    gradientStart: '#66BB6A',
    gradientMid: '#81C784',
    gradientEnd: '#B2EBF2',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  borderRadius: {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  typography: {
    displayLarge: { fontSize: 48, fontWeight: '600' as const, lineHeight: 56 },
    displayMedium: { fontSize: 36, fontWeight: '600' as const, lineHeight: 44 },
    displaySmall: { fontSize: 32, fontWeight: '600' as const, lineHeight: 40 },
    headlineLarge: { fontSize: 28, fontWeight: '600' as const, lineHeight: 36 },
    headlineMedium: { fontSize: 24, fontWeight: '600' as const, lineHeight: 32 },
    headlineSmall: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
    titleLarge: { fontSize: 22, fontWeight: '500' as const, lineHeight: 28 },
    titleMedium: { fontSize: 16, fontWeight: '500' as const, lineHeight: 24 },
    titleSmall: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
    bodyLarge: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    bodyMedium: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    bodySmall: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
    labelLarge: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
    labelMedium: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
    labelSmall: { fontSize: 11, fontWeight: '500' as const, lineHeight: 16 },
  },
  shadows: {
    level1: {
      shadowColor: '#1B5E20',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    level2: {
      shadowColor: '#1B5E20',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    level3: {
      shadowColor: '#1B5E20',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 4,
    },
    level4: {
      shadowColor: '#1B5E20',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 32,
      elevation: 8,
    },
    level5: {
      shadowColor: '#1B5E20',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.24,
      shadowRadius: 48,
      elevation: 12,
    },
  },
} as const;

export type Theme = typeof theme;

export type ColorToken = keyof typeof theme.colors;
export type SpacingToken = keyof typeof theme.spacing;
export type BorderRadiusToken = keyof typeof theme.borderRadius;
export type TypographyToken = keyof typeof theme.typography;
export type ShadowToken = keyof typeof theme.shadows;

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  screenPadding: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.level2,
  },
  cardElevated: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.level3,
  },
  heroCard: {
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.xl,
    minHeight: 280,
    justifyContent: 'flex-end',
  },
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
  input: {
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
    paddingHorizontal: theme.spacing.md,
    ...theme.typography.bodyLarge,
    color: theme.colors.onSurface,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  badge: {
    height: 24,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 80,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineVariant,
  },
  shadow1: theme.shadows.level1,
  shadow2: theme.shadows.level2,
  shadow3: theme.shadows.level3,
  shadow4: theme.shadows.level4,
  shadow5: theme.shadows.level5,
});

export const getStatusStyles = (status: keyof typeof theme.colors & `status${string}`) => {
  const color = theme.colors[status as ColorToken] as string;
  const bgColor = theme.colors[`${status}Bg` as ColorToken] as string;
  return { color, bgColor };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};