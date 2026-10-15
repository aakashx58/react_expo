import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/hooks';
import { theme, styles } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function CustomerLoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('customer@demo.com');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login({ email, password, role: 'customer' });
      router.replace('/(customer)' as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login({ email: 'customer@demo.com', password: 'demo123', role: 'customer' });
      router.replace('/(customer)' as any);
    } catch {
      Alert.alert('Error', 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>

          <View style={styles.logoSection}>
            <View style={styles.logo}>
              <Ionicons name="person-outline" size={40} color={theme.colors.primary} />
            </View>
            <Text style={[styles.title, theme.typography.displaySmall]}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your customer account</Text>
          </View>

          <Card style={styles.formCard}>
            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon={<Ionicons name="mail-outline" size={22} color={theme.colors.onSurfaceVariant} />}
              />
              <Input
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                leftIcon={<Ionicons name="lock-closed-outline" size={22} color={theme.colors.onSurfaceVariant} />}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}

              <View style={styles.forgotRow}>
                <Link href="/(auth)/forgot-password" style={styles.forgotText}>
                  Forgot password?
                </Link>
              </View>

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                fullWidth
                style={styles.submitButton}
              />
            </View>
          </Card>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Demo Account"
            onPress={handleDemoLogin}
            variant="secondary"
            fullWidth
            loading={isLoading}
            icon={<Ionicons name="flask-outline" size={20} color={theme.colors.primary} />}
          />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link href="/(auth)/register?role=customer" style={styles.signupLink}>
              Sign Up
            </Link>
          </View>

          <View style={styles.backToWelcome}>
            <Link href="/(auth)/welcome" style={styles.backToWelcomeText}>
              ← Back to role selection
            </Link>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    ...theme.typography.bodyMedium,
  },
  formCard: {
    width: '100%',
  },
  form: {
    gap: theme.spacing.lg,
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: -theme.spacing.md,
  },
  forgotText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary,
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
  },
  dividerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.lg,
  },
  signupText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  signupLink: {
    ...theme.typography.bodyMedium,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  backToWelcome: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  backToWelcomeText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
});