import React from 'react';
import { Image, View, Text, StyleSheet, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { theme } from '@/constants/theme';

interface AvatarProps {
  source?: ImageSourcePropType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  style?: ViewStyle;
}

const sizeMap: Record<AvatarProps['size'], number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const fontSizeMap: Record<AvatarProps['size'], number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
};

export const Avatar = ({ source, size = 'md', name, style }: AvatarProps) => {
  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getColorFromName = (fullName: string) => {
    const colors = [
      theme.colors.primary,
      theme.colors.primaryLight,
      theme.colors.accent,
      theme.colors.statusAccepted,
      theme.colors.statusPreparing,
    ];
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (source) {
    return (
      <Image
        source={source}
        style={[
          styles.avatar,
          { width: dimension, height: dimension, borderRadius: dimension / 2 },
          style,
        ]}
      />
    );
  }

  if (name) {
    const initials = getInitials(name);
    const bgColor = getColorFromName(name);

    return (
      <View
        style={[
          styles.avatar,
          { width: dimension, height: dimension, borderRadius: dimension / 2, backgroundColor: bgColor },
          style,
        ]}
      >
        <Text style={[styles.initials, { fontSize }, { color: theme.colors.surface }]}>
          {initials}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.avatar,
        { width: dimension, height: dimension, borderRadius: dimension / 2, backgroundColor: theme.colors.surfaceContainer },
        style,
      ]}
    >
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontWeight: '600',
  },
  placeholder: {
    width: '50%',
    height: '50%',
    borderRadius: '50%',
    backgroundColor: theme.colors.outline,
  },
});