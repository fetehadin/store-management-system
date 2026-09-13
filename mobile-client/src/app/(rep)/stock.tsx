import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  Platform,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../api/client';

const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'http://10.54.178.101:5000';

const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('file://')) return url;
  if (url.startsWith('http')) return url.replace(/^https?:\/\/[^\/]+/, BASE_IP);
  return url.startsWith('/') ? `${BASE_IP}${url}` : `${BASE_IP}/${url}`;
};

export default function RepStockScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['warehouse-products-rep'],
    queryFn: async () => {
      const response = await apiClient.get('/inventory/products');
      return response.data?.data || [];
    },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // UPGRADED THEME: Classic Dark Slate Palette
  const theme = {
    bg: isDarkMode ? '#020617' : '#F8FAFC',
    text: isDarkMode ? '#F8FAFC' : '#0F172A',
    textMuted: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#1E293B' : '#E2E8F0',
    cardBg: isDarkMode ? '#0F172A' : '#FFFFFF',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    inputBg: isDarkMode ? '#0F172A' : '#F1F5F9',
  };

  const CATEGORIES = ['All', ...Array.from(new Set(products.map((item: any) => item.category || 'General')))];

  const filteredStock = products.filter((item: any) => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || (item.category || 'General') === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = products.find((s: any) => s.id === id);
    const price = item ? Number(item.sellingPrice || item.costPrice || 0) : 0;
    return total + (price * qty);
  }, 0);

  const updateCartDelta = (id: string, delta: number, maxAvailable: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(current + delta, maxAvailable));
      const updated = { ...prev };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  const handleManualInput = (id: string, text: string, maxAvailable: number) => {
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
    setCart(prev => {
      const updated = { ...prev };
      if (isNaN(numericValue) || numericValue === 0) {
        delete updated[id];
      } else {
        updated[id] = Math.min(numericValue, maxAvailable);
      }
      return updated;
    });
  };

  const handleCheckout = async () => {
    Alert.alert(
      "Confirm Dispatch",
      `Checking out ETB ${cartTotal.toLocaleString()} worth of stock. This will be added to your active debt.`,
      [
        { text: "Cancel", style: "cancel" }, 
        { 
          text: "Confirm", 
          onPress: async () => {
            setIsProcessing(true);
            
            try {
              for (const [itemId, qty] of Object.entries(cart)) {
                if (qty > 0) {
                  const item = products.find((s: any) => s.id === itemId);
                  if (!item) continue;

                  await apiClient.post('/inventory/issue', {
                    productId: item.id,
                    qtyIssued: qty,
                    wholesalePrice: Number(item.sellingPrice || 0)
                  });
                }
              }

              Alert.alert("Success", "Stock dispatched and debt updated successfully.");
              
              setCart({});
              queryClient.invalidateQueries({ queryKey: ['rep-profile-financials'] });
              queryClient.invalidateQueries({ queryKey: ['warehouse-products-rep'] });
              
              router.replace('/(rep)/home');
            } catch (error: any) {
              const errorMsg = error.response?.data?.message || error.message || 'Network request failed.';
              Alert.alert('Checkout Failed', errorMsg);
            } finally {
              setIsProcessing(false);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.bg, paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} translucent />

      <View style={[styles.header, { borderBottomColor: theme.border, borderBottomWidth: isDarkMode ? StyleSheet.hairlineWidth : 1 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Warehouse Checkout</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={[styles.searchWrapper, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
        <Ionicons name="search" size={20} color={theme.textMuted} />
        <TextInput 
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search items by system name..."
          placeholderTextColor={theme.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {(CATEGORIES as string[]).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity 
                key={cat}
                style={[
                  styles.categoryPill, 
                  { backgroundColor: isActive ? theme.invertedBg : (isDarkMode ? theme.bg : '#FFFFFF') },
                  { borderColor: isActive ? theme.invertedBg : theme.border },
                ]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryText, { color: isActive ? theme.invertedText : theme.textMuted }]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.text} />}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.invertedBg} style={{ marginTop: 40 }} />
        ) : filteredStock.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>No products available in the warehouse.</Text>
        ) : (
          filteredStock.map((item: any) => {
            const currentQty = cart[item.id] || 0;
            const maxAvailable = Number(item.stock ?? 0); 
            const price = Number(item.sellingPrice || 0);
            const isOutOfStock = maxAvailable <= 0;

            return (
              <View key={item.id} style={[styles.productCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }, !isDarkMode && styles.lightShadow]}>
                
                {item.imageUrl ? (
                  <Image 
                    source={{ uri: resolveImageUrl(item.imageUrl) }} 
                    style={styles.productImage} 
                  />
                ) : (
                  <View style={[styles.iconPlaceholder, { backgroundColor: isDarkMode ? '#1E293B' : theme.inputBg }]}>
                    <Ionicons name={'cube-outline'} size={28} color={theme.textMuted} />
                  </View>
                )}
                
                <View style={styles.productDetails}>
                  <Text style={[styles.productName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
                  <Text style={[styles.productPrice, { color: '#059669' }]}>Sells for ETB {price.toLocaleString()}</Text>
                  <Text style={[styles.stockText, { color: isOutOfStock ? '#DC2626' : theme.textMuted }]}>
                    {isOutOfStock ? 'Out of Stock' : `${maxAvailable} Available`}
                  </Text>
                </View>

                <View style={[styles.stepper, { backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC' }]}>
                  <TouchableOpacity 
                    style={[styles.stepBtn, { borderColor: theme.border }]} 
                    onPress={() => updateCartDelta(item.id, -1, maxAvailable)}
                    disabled={currentQty === 0}
                  >
                    <Ionicons name="remove" size={16} color={currentQty === 0 ? theme.textMuted : theme.text} />
                  </TouchableOpacity>
                  
                  <TextInput
                    style={[styles.stepQtyInput, { color: theme.text }]}
                    value={currentQty === 0 ? '' : currentQty.toString()}
                    placeholder="0"
                    placeholderTextColor={theme.textMuted}
                    keyboardType="numeric"
                    onChangeText={(text) => handleManualInput(item.id, text, maxAvailable)}
                  />

                  <TouchableOpacity 
                    style={[styles.stepBtn, { borderColor: theme.border }]} 
                    onPress={() => updateCartDelta(item.id, 1, maxAvailable)}
                    disabled={currentQty >= maxAvailable || isOutOfStock}
                  >
                    <Ionicons name="add" size={16} color={currentQty >= maxAvailable || isOutOfStock ? theme.textMuted : theme.text} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <View style={[styles.checkoutFooter, { backgroundColor: theme.bg, borderTopColor: theme.border }]}>
        <View>
          <Text style={{ color: theme.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 }}>CHECKOUT TOTAL</Text>
          <Text style={{ color: theme.text, fontSize: 22, fontWeight: '900' }}>ETB {cartTotal.toLocaleString()}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.checkoutBtn, { backgroundColor: cartTotal > 0 ? theme.invertedBg : (isDarkMode ? '#1E293B' : '#E2E8F0') }, isProcessing && { opacity: 0.7 }]}
          disabled={cartTotal === 0 || isProcessing}
          onPress={handleCheckout}
        >
          {isProcessing ? (
            <ActivityIndicator color={theme.invertedText} />
          ) : (
            <Text style={{ color: cartTotal > 0 ? theme.invertedText : theme.textMuted, fontWeight: '800', fontSize: 15 }}>Add to Ledger</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 12, marginBottom: 16, paddingHorizontal: 16, borderWidth: 1, borderRadius: 12 },
  searchInput: { flex: 1, paddingVertical: 14, paddingHorizontal: 12, fontSize: 15, fontWeight: '500' },
  categoriesWrapper: { marginBottom: 16 },
  categoriesScroll: { paddingHorizontal: 20, alignItems: 'center' },
  categoryPill: { borderWidth: 1, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100, marginRight: 10 },
  categoryText: { fontSize: 13, fontWeight: '700' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
  productCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20, marginBottom: 12 },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  iconPlaceholder: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  productImage: { width: 48, height: 48, borderRadius: 12, marginRight: 16, backgroundColor: '#E2E8F0', resizeMode: 'cover' },
  productDetails: { flex: 1, paddingRight: 8 },
  productName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  productPrice: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  stockText: { fontSize: 12, fontWeight: '600' },
  stepper: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 4 },
  stepBtn: { width: 32, height: 32, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' },
  stepQtyInput: { width: 44, textAlign: 'center', fontSize: 16, fontWeight: '800', padding: 0 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 15, fontWeight: '500' },
  checkoutFooter: { position: 'absolute', bottom: Platform.OS === 'ios' ? 85 : 65, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, borderTopWidth: 1 },
  checkoutBtn: { paddingHorizontal: 24, paddingVertical: 16, borderRadius: 100, minWidth: 140, alignItems: 'center' }
});