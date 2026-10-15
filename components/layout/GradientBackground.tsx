import React from 'react';
import { View, StyleSheet, ViewStyle, Image } from 'react-native';
import { theme } from '@/constants/theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GradientBackground = ({
  children,
  style,
}: GradientBackgroundProps) => {
  return (
    <View style={[styles.gradient, style]}>
      {children}
    </View>
  );
};

export const MeshGradient = ({
  children,
  style,
}: { children: React.ReactNode; style?: ViewStyle }) => {
  return (
    <View style={[styles.meshContainer, style]}>
      <View style={styles.meshLayer1} />
      <View style={styles.meshLayer2} />
      <View style={styles.meshLayer3} />
      {children}
    </View>
  );
};

export const HeroGradient = ({
  children,
  style,
  imageSource,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  imageSource?: string;
}) => {
  return (
    <View style={[styles.heroContainer, style]}>
      {imageSource && (
        <Image
          source={{ uri: imageSource }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.heroOverlay} />
      <View style={styles.heroContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  meshContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  meshLayer1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: theme.colors.primaryLight + '40',
  },
  meshLayer2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: theme.colors.accent + '30',
  },
  meshLayer3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.primaryLight + '20',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  heroContainer: {
    position: 'relative',
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 94, 32, 0.5)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.xl,
  },
});