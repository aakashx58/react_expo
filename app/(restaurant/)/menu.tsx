import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth, useRestaurant } from '@/hooks';
import { theme, styles, formatCurrency } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { MenuItem } from '@/types/restaurant';

export default function RestaurantMenuScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { menuItems, fetchMenu, addMenuItem, updateMenuItem, deleteMenuItem, currentRestaurant } = useRestaurant();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    preparationTime: '',
    isAvailable: true,
  });

  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Drinks', 'Pizza', 'Pasta', 'Salads', 'Bowls', 'Sides', 'Coffee'];

  useEffect(() => {
    if (currentRestaurant) {
      fetchMenu(currentRestaurant.id);
    }
  }, [currentRestaurant, fetchMenu]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (currentRestaurant) await fetchMenu(currentRestaurant.id);
    setRefreshing(false);
  };

  const handleAddItem = () => {
    resetForm();
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      preparationTime: item.preparationTime.toString(),
      isAvailable: item.isAvailable,
    });
    setEditingItem(item);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      preparationTime: '',
      isAvailable: true,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const itemData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      preparationTime: parseInt(formData.preparationTime) || 10,
      isAvailable: formData.isAvailable,
      restaurantId: currentRestaurant?.id || '',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop',
    };

    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, itemData);
      } else {
        await addMenuItem(itemData);
      }
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Failed to save item');
    }
  };

  const handleDelete = async (item: MenuItem) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteMenuItem(item.id) },
      ]
    );
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      onPress={() => handleEditItem(item)}
      style={styles.menuItemCard}
      activeOpacity={0.9}
    >
      <Card style={styles.menuItemCardInner} elevated>
        <View style={styles.menuItemContent}>
          <View style={styles.menuItemImage} />
          <View style={styles.menuItemInfo}>
            <View style={styles.menuItemHeader}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Badge variant={item.isAvailable ? 'success' : 'default'} size="sm">
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </Badge>
            </View>
            <Text style={styles.menuItemCategory}>{item.category}</Text>
            <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.menuItemFooter}>
              <Text style={styles.menuItemPrice}>{formatCurrency(item.price)}</Text>
              <Text style={styles.menuItemPrep}>{item.preparationTime} min prep</Text>
            </View>
          </View>
          <View style={styles.menuItemActions}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                handleEditItem(item);
              }}
              style={styles.actionButton}
            >
              <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                handleDelete(item);
              }}
              style={styles.actionButton}
            >
              <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.pageTitle}>Menu Management</Text>
            <Text style={styles.pageSubtitle}>{menuItems.length} items</Text>
          </View>
          <Button
            title="Add Item"
            onPress={handleAddItem}
            icon={<Ionicons name="add" size={20} color={theme.colors.surface} />}
          />
        </View>

        {menuItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={64} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.emptyTitle}>No menu items yet</Text>
            <Text style={styles.emptySubtitle}>Add your first dish to get started</Text>
            <Button
              title="Add Menu Item"
              onPress={handleAddItem}
              style={styles.emptyButton}
            />
          </View>
        ) : (
          <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListContentComponentStyle={styles.listContent}
          />
        )}
      </ScrollView>

      <Modal visible={showAddModal} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingItem ? 'Edit Item' : 'Add Menu Item'}</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalForm} showsVerticalScrollIndicator={false}>
              <Input
                label="Item Name"
                placeholder="e.g., Margherita Pizza"
                value={formData.name}
                onChangeText={text => setFormData({ ...formData, name: text })}
                leftIcon={<Ionicons name="pizza-outline" size={22} color={theme.colors.onSurfaceVariant} />}
              />
              <Input
                label="Description"
                placeholder="Fresh tomatoes, mozzarella, basil"
                value={formData.description}
                onChangeText={text => setFormData({ ...formData, description: text })}
                multiline
                numberOfLines={3}
                leftIcon={<Ionicons name="document-text-outline" size={22} color={theme.colors.onSurfaceVariant} />}
              />
              <View style={styles.formRow}>
                <Input
                  label="Price"
                  placeholder="0.00"
                  value={formData.price}
                  onChangeText={text => setFormData({ ...formData, price: text })}
                  keyboardType="decimal-pad"
                  style={styles.halfInput}
                  leftIcon={<Ionicons name="cash-outline" size={22} color={theme.colors.onSurfaceVariant} />}
                />
                <Input
                  label="Prep Time (min)"
                  placeholder="10"
                  value={formData.preparationTime}
                  onChangeText={text => setFormData({ ...formData, preparationTime: text })}
                  keyboardType="numeric"
                  style={styles.halfInput}
                  leftIcon={<Ionicons name="time-outline" size={22} color={theme.colors.onSurfaceVariant} />}
                />
              </View>
              <View style={styles.formRow}>
                <View style={styles.halfInput}>
                  <Text style={styles.selectLabel}>Category</Text>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.selectInput}
                  >
                    <Text style={[
                      styles.selectText,
                      formData.category ? styles.selectTextSelected : {},
                    ]}>
                      {formData.category || 'Select category'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color={theme.colors.onSurfaceVariant} />
                  </TouchableOpacity>
                </View>
                <View style={styles.halfInput}>
                  <View style={styles.toggleContainer}>
                    <Text style={styles.selectLabel}>Available</Text>
                    <TouchableOpacity
                      onPress={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
                      style={[
                        styles.toggle,
                        formData.isAvailable && styles.toggleActive,
                      ]}
                    >
                      <View style={[
                        styles.toggleThumb,
                        formData.isAvailable && styles.toggleThumbActive,
                      ]} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setShowAddModal(false)}
                variant="secondary"
                style={styles.modalCancelButton}
              />
              <Button
                title={editingItem ? 'Save Changes' : 'Add Item'}
                onPress={handleSubmit}
                style={styles.modalSaveButton}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  headerLeft: {
    gap: theme.spacing.xs,
  },
  pageTitle: {
    ...theme.typography.displaySmall,
    color: theme.colors.onSurface,
  },
  pageSubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  menuItemCard: {
    marginBottom: 0,
  },
  menuItemCardInner: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItemContent: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
  },
  menuItemInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemName: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurface,
    fontWeight: '500',
  },
  menuItemCategory: {
    ...theme.typography.labelSmall,
    color: theme.colors.primary,
  },
  menuItemDesc: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xs,
  },
  menuItemPrice: {
    ...theme.typography.headlineSmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  menuItemPrep: {
    ...theme.typography.bodySmall,
    color: theme.colors.onSurfaceVariant,
  },
  menuItemActions: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.md,
  },
  actionButton: {
    padding: theme.spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  emptyTitle: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: theme.spacing.md,
  },
  separator: {
    height: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
  },
  modalTitle: {
    ...theme.typography.headlineMedium,
    color: theme.colors.onSurface,
  },
  modalForm: {
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  formRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  selectLabel: {
    ...theme.typography.labelSmall,
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.xs,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
  },
  selectText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  selectTextSelected: {
    color: theme.colors.onSurface,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggle: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.outlineVariant,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.level2,
  },
  toggleThumbActive: {
    marginLeft: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineVariant,
  },
  modalCancelButton: {
    flex: 1,
  },
  modalSaveButton: {
    flex: 1,
  },
});