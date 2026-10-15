import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useCart, useAuth } from '@/hooks';
import { theme, styles, formatCurrency } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export default function CheckoutScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, total, itemCount, clearCart } = useCart();

  const [address, setAddress] = useState('123 Main St, San Francisco, CA 94102');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);

  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const grandTotal = total + deliveryFee + serviceFee;

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      Alert.alert('Please enter a delivery address');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    clearCart();
    setIsLoading(false);

    router.replace('/(customer)/orders?newOrder=true' as any);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderItemName}>{item.menuItem.name}</Text>
      <View style={styles.orderItemRight}>
        <Text style={styles.orderItemQty}>×{item.quantity}</Text>
        <Text style={styles.orderItemPrice}>{formatCurrency(item.menuItem.price * item.quantity)}</Text>
      </View>
    </View>
  );

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
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Input
              label="Address"
              placeholder="Enter delivery address"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              leftIcon={<Ionicons name="location-outline" size={22} color={theme.colors.onSurfaceVariant} />}
            />
            <Text style={styles.addressHint}>Deliver to door • Ring doorbell</Text>
          </Card>

          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentOptions}>
              <TouchableOpacity
                onPress={() => setPaymentMethod('card')}
                style={[
                  styles.paymentOption,
                  paymentMethod === 'card' && styles.paymentOptionActive,
                ]}
              >
                <View style={styles.paymentIcon}>
                  <Ionicons name="card-outline" size={24} color={paymentMethod === 'card' ? theme.colors.primary : theme.colors.onSurfaceVariant} />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentLabel}>Credit/Debit Card</Text>
                  <Text style={styles.paymentDetail}>•••• 4242</Text>
                </View>
                {paymentMethod === 'card' && (
                  <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPaymentMethod('cash')}
                style={[
                  styles.paymentOption,
                  paymentMethod === 'cash' && styles.paymentOptionActive,
                ]}
              >
                <View style={styles.paymentIcon}>
                  <Ionicons name="cash-outline" size={24} color={paymentMethod === 'cash' ? theme.colors.primary : theme.colors.onSurfaceVariant} />
                </View>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentLabel}>Cash on Delivery</Text>
                  <Text style={styles.paymentDetail}>Pay when delivered</Text>
                </View>
                {paymentMethod === 'cash' && (
                  <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Order Notes (Optional)</Text>
            <Input
              label="Special Instructions"
              placeholder="e.g., Extra spicy, no onions, leave at door"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              leftIcon={<Ionicons name="chatbox-outline" size={22} color={theme.colors.onSurfaceVariant} />}
            />
          </Card>

          <Card style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={styles.orderItemDivider} />}
              ListContentComponentStyle={styles.orderItemsList}
            />
            <View style={styles.summaryRows}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal ({itemCount} items)</Text>
                <Text style={styles.summaryValue}>{formatCurrency(total)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>{formatCurrency(deliveryFee)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service Fee</Text>
                <Text style={styles.summaryValue}>{formatCurrency(serviceFee)}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRowTotal}>
                <Text style={styles.summaryLabelTotal}>Total</Text>
                <Text style={styles.summaryValueTotal}>{formatCurrency(grandTotal)}</Text>
              </View>
            </View>
          </Card>

          <Button
            title={`Place Order · ${formatCurrency(grandTotal)}`}
            onPress={handlePlaceOrder}
            loading={isLoading}
            fullWidth
            style={styles.placeOrderButton}
          />

          <View style={styles.secureRow}>
            <Ionicons name="lock-closed" size={16} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.secureText}>Your payment is secured with 256-bit encryption</Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

import { Alert } from 'react-native';

const checkoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: 120,
  },
  keyboardView: {
    flex: 1,
  },
  sectionCard: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.lg,
  },
  addressHint: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.sm,
  },
  paymentOptions: {
    gap: theme.spacing.md,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
  },
  paymentOptionActive: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    backgroundColor: theme.colors.surfaceVariant,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  paymentLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  paymentDetail: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  summaryCard: {
    marginBottom: theme.spacing.md,
  },
  orderItemsList: {
    marginBottom: theme.spacing.md,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  orderItemName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  orderItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  orderItemQty: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  orderItemPrice: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  orderItemDivider: {
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
  },
  summaryRows: {
    gap: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  summaryValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  summaryLabelTotal: {
    ...theme.typography.headlineSmall,
    color: theme.colors.onSurface,
  },
  summaryValueTotal: {
    ...theme.typography.headlineSmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
    marginVertical: theme.spacing.xs,
  },
  placeOrderButton: {
    marginTop: theme.spacing.lg,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  secureText: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
});