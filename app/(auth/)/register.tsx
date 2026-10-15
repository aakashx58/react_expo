import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/hooks';
import { theme, styles } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function RegisterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { register } = useAuth();
  const role = (params.role as 'customer' | 'restaurant') || 'customer';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register({ name, email, password, role, phone });
      router.replace(role === 'customer' ? '/(customer)' : '/(restaurant)' as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
              <Ionicons name={role === 'customer' ? 'person-add-outline' : 'storefront-outline'} size={40} color={theme.colors.primary} />
            </View>
            <Text style={[styles.title, theme.typography.displaySmall]}>Create Account</Text>
            <Text style={styles.subtitle}>
              {role === 'customer' ? 'Join as a customer' : 'Register your restaurant'}
            </Text>
          </View>

          <Card style={styles.formCard}>
            <View style={styles.form}>
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoComplete="name"
                leftIcon={<Ionicons name="person-outline" size={22} color={theme.colors.onSurfaceVariant} />}
              />
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
                label="Phone (optional)"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
                leftIcon={<Ionicons name="call-outline" size={22} color={theme.colors.onSurfaceVariant} />}
              />
              <Input
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="new-password"
                leftIcon={<Ionicons name="lock-closed-outline" size={22} color={theme.colors.onSurfaceVariant} />}
              />
              <Input
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="new-password"
                leftIcon={<Ionicons name="lock-closed-outline" size={22} color={theme.colors.onSurfaceVariant} />}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}

              <Button
                title={role === 'customer' ? 'Create Account' : 'Register Restaurant'}
                onPress={handleRegister}
                loading={isLoading}
                fullWidth
                style={styles.submitButton}
              />
            </View>
          </Card>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Already have an account?</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Sign In Instead"
            onPress={() => router.push(`/${role}-login` as any)}
            variant="secondary"
            fullWidth
          />

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

const registerStyles = StyleSheet.create({
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