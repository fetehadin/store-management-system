import React, { useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, StatusBar, Modal, TextInput, KeyboardAvoidingView, Platform,
  ActivityIndicator, RefreshControl, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';

const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'https://tajstore-backend.onrender.com';

const resolveImageUrl = (url: string) => {
  if (!url) return null;
  if (url.startsWith('data:') || url.startsWith('http')) return url;
  return `${BASE_IP}${url}`;
};

export default function StockScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const isAdmin = role === 'ADMIN' || role === null;

  const [activeCategory, setActiveCategory] = useState('All');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<{ id: string, name: string, price: string } | null>(null);
  const [newPriceInput, setNewPriceInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const { data: stock = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-inventory'],
    queryFn: async () => {
      const response = await apiClient.get('/inventory/products');
      return response.data?.data || [];
    },
    enabled: isAdmin,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const updatePriceMutation = useMutation({
    mutationFn: async ({ id, price }: { id: string, price: number }) => {
      return apiClient.patch(`/inventory/products/${id}/price`, { price });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inventory'] });
      setIsEditModalVisible(false);
      setActiveItem(null);
      setNewPriceInput('');
    },
    onError: (error: any) => {
      Alert.alert("Update Failed", error.response?.data?.message || "Could not update selling price.");
    }
  });

  const categories = useMemo(() => {
    const cats = new Set(stock.map((item: any) => item.category || 'Uncategorized'));
    return ['All', ...Array.from(cats)];
  }, [stock]);

  const filteredInventory = activeCategory === 'All' 
    ? stock 
    : stock.filter((item: any) => (item.category || 'Uncategorized') === activeCategory);

  const openEditModal = (id: string, name: string, currentPrice: number) => {
    setActiveItem({ id, name, price: currentPrice.toString() });
    setNewPriceInput(currentPrice.toString());
    setIsEditModalVisible(true);
  };

  const handleUpdatePrice = () => {
    if (!activeItem || !newPriceInput) return;
    const updatedPrice = parseFloat(newPriceInput);
    if (isNaN(updatedPrice) || updatedPrice <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid price.");
      return;
    }
    updatePriceMutation.mutate({ id: activeItem.id, price: updatedPrice });
  };

  const theme = {
    bg: isDarkMode ? '#020617' : '#F8FAFC',
    text: isDarkMode ? '#F8FAFC' : '#0F172A',
    textMuted: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#1E293B' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#0F172A' : '#FFFFFF',
    inputBg: isDarkMode ? '#0F172A' : '#F1F5F9',
    subCardBg: isDarkMode ? '#1E293B' : '#F8FAFC',
  };

  if (!isAdmin) {
    return (
      <View style={[styles.unauthorizedContainer, { backgroundColor: theme.bg, paddingTop: insets.top }]}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={[styles.unauthorizedTitle, { color: theme.text }]}>Access Restricted</Text>
        <Text style={[styles.unauthorizedSubtitle, { color: theme.textMuted }]}>This portal is exclusively for system administrators.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(rep)/home')}>
          <Text style={styles.backButtonText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.bg, paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} translucent />

      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => router.replace('/(admin)/dashboard')}>
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Store Inventory</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.text} />}>
        <View style={styles.categoriesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {categories.map((cat: any) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity key={cat} style={[styles.categoryPill, { backgroundColor: isActive ? theme.invertedBg : (isDarkMode ? theme.cardBg : '#FFFFFF') }, { borderColor: isActive ? theme.invertedBg : theme.border }]} onPress={() => setActiveCategory(cat)}>
                  <Text style={[styles.categoryText, { color: isActive ? theme.invertedText : theme.textMuted }]}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.productList}>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.invertedBg} style={{ marginTop: 40 }} />
          ) : filteredInventory.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 40, color: theme.textMuted }}>No products found in stock.</Text>
          ) : (
            filteredInventory.map((item: any) => {
              const isLowStock = item.stock < 20;
              const imageUrl = resolveImageUrl(item.imageUrl);
              
              return (
                <View key={item.id} style={[styles.productCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
                  <View style={styles.productTopRow}>
                    <View style={[styles.productImagePlaceholder, isDarkMode && { backgroundColor: '#1E293B' }, imageUrl && { backgroundColor: 'transparent' }]}>
                      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.productImage} /> : <Ionicons name="cube-outline" size={28} color={theme.textMuted} />}
                    </View>
                    
                    <View style={styles.productInfo}>
                      <View style={styles.titleRow}>
                        <Text style={[styles.productName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
                      </View>
                      <View style={[styles.categoryTag, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}>
                        <Text style={[styles.categoryTagText, { color: theme.textMuted }]}>{item.category || 'Uncategorized'}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.productBottomRow}>
                    <View style={styles.metricColumn}>
                      <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Active FIFO Cost</Text>
                      <Text style={[styles.metricValue, { color: theme.textMuted }]}>ETB {Number(item.costPrice || 0).toFixed(2)}</Text>
                    </View>
                    
                    <TouchableOpacity style={[styles.editableColumn, isDarkMode && { backgroundColor: '#1E293B' }]} onPress={() => openEditModal(item.id, item.name, item.sellingPrice)}>
                      <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Selling Price</Text>
                      <View style={styles.editPriceRow}>
                        <Text style={[styles.metricValue, { color: theme.text }]}>ETB <Text style={styles.metricValueBold}>{Number(item.sellingPrice || 0).toFixed(2)}</Text></Text>
                        <Ionicons name="pencil" size={14} color={theme.invertedBg} style={{ marginLeft: 6 }} />
                      </View>
                    </TouchableOpacity>

                    <View style={[styles.metricColumn, { alignItems: 'flex-end' }]}>
                      <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Available</Text>
                      <Text style={[styles.metricValueBold, { color: isLowStock ? '#DC2626' : '#059669' }]}>
                        {item.stock} Units
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      <Modal visible={isEditModalVisible} animationType="fade" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Update Pricing</Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.helperText, { color: theme.textMuted, marginBottom: 20 }]}>
              Adjusting the selling price for <Text style={{ fontWeight: '700', color: theme.text }}>{activeItem?.name}</Text>. This change will instantly sync to all active sales reps.
            </Text>

            <Text style={[styles.inputLabel, { color: theme.text }]}>New Selling Price (ETB)</Text>
            <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, fontSize: 24, fontWeight: '800' }]} placeholder="0.00" placeholderTextColor={theme.textMuted} keyboardType="numeric" value={newPriceInput} onChangeText={setNewPriceInput} autoFocus />

            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg, opacity: updatePriceMutation.isPending ? 0.7 : 1 }]} onPress={handleUpdatePrice} disabled={updatePriceMutation.isPending}>
              <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>{updatePriceMutation.isPending ? 'Updating...' : 'Confirm New Price'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }, headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 }, menuButton: { marginRight: 12 }, headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 }, scrollContentDark: { paddingBottom: 100, paddingTop: 12 }, scrollContentLight: { paddingBottom: 100, paddingTop: 12 }, categoriesWrapper: { marginBottom: 20 }, categoriesScroll: { paddingHorizontal: 20, alignItems: 'center' }, categoryPill: { borderWidth: 1, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100, marginRight: 10 }, categoryText: { fontSize: 13, fontWeight: '700' }, productList: { paddingHorizontal: 20 }, productCard: { borderRadius: 20, padding: 20, marginBottom: 16 }, lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 }, productTopRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 }, productImagePlaceholder: { width: 60, height: 60, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16, overflow: 'hidden' }, productImage: { width: '100%', height: '100%', resizeMode: 'cover' }, productInfo: { flex: 1, paddingTop: 2 }, titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }, productName: { fontSize: 18, fontWeight: '800', flex: 1, paddingRight: 8 }, categoryTag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }, categoryTagText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }, productBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E2E8F0', paddingTop: 16 }, metricColumn: { justifyContent: 'center' }, editableColumn: { justifyContent: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: 'rgba(29, 97, 242, 0.05)' }, editPriceRow: { flexDirection: 'row', alignItems: 'center' }, metricLabel: { fontSize: 11, marginBottom: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }, metricValue: { fontSize: 15, fontWeight: '600' }, metricValueBold: { fontSize: 16, fontWeight: '800' }, unauthorizedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }, unauthorizedTitle: { fontSize: 24, fontWeight: '800', marginTop: 16, marginBottom: 8 }, unauthorizedSubtitle: { fontSize: 15, textAlign: 'center', marginBottom: 24 }, backButton: { backgroundColor: '#1D61F2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 100 }, backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 }, modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }, bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 }, sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, sheetTitle: { fontSize: 20, fontWeight: '800' }, closeBtn: { padding: 4 }, helperText: { fontSize: 13, lineHeight: 20 }, inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, letterSpacing: 0.5 }, input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, textAlign: 'center' }, submitBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }, submitBtnText: { fontSize: 16, fontWeight: '700' },
});