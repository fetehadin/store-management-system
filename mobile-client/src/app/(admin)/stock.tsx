import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useInventoryStore } from '../../store/inventoryStore';

const BASE_URL = 'http://172.30.75.101:5000/api/v1';

export default function StockScreen() {
  const router = useRouter();
  
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => (state as any).token);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const isAdmin = role === 'ADMIN' || role === null;

  const stock = useInventoryStore((state) => state.stock);
  const updateSellingPrice = useInventoryStore((state) => state.updateSellingPrice);
  const setStock = useInventoryStore((state) => state.setStock); // Assuming you add this to your store

  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Edit Price Modal States
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<{ id: string, name: string, price: string } | null>(null);
  const [newPriceInput, setNewPriceInput] = useState('');

  // Extract unique categories dynamically
  const CATEGORIES = ['All', ...Array.from(new Set(stock.map(item => item.category)))];

  const fetchLiveInventory = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with live backend route
      // const response = await fetch(`${BASE_IP}/api/v1/inventory`, { headers: { Authorization: `Bearer ${token}` } });
      // const data = await response.json();
      // setStock(data); 
    } catch (error) {
      console.error("Failed to fetch live inventory", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchLiveInventory();
  }, [isAdmin]);

  const filteredInventory = activeCategory === 'All' 
    ? stock 
    : stock.filter(item => item.category === activeCategory);

  const openEditModal = (id: string, name: string, currentPrice: number) => {
    setActiveItem({ id, name, price: currentPrice.toString() });
    setNewPriceInput(currentPrice.toString());
    setIsEditModalVisible(true);
  };

  const handleUpdatePrice = async () => {
    if (!activeItem || !newPriceInput) return;
    const updatedPrice = parseFloat(newPriceInput);
    
    try {
      // TODO: Connect this to your backend
      // await fetch(`${BASE_IP}/api/v1/inventory/${activeItem.id}`, { method: 'PATCH', body: JSON.stringify({ sellingPrice: updatedPrice }) });
      
      updateSellingPrice(activeItem.id, updatedPrice);
      setIsEditModalVisible(false);
      setActiveItem(null);
      setNewPriceInput('');
    } catch (error) {
      console.error("Failed to update price", error);
    }
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.unauthorizedContainer}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={styles.unauthorizedTitle}>Access Restricted</Text>
        <Text style={styles.unauthorizedSubtitle}>This portal is exclusively for system administrators.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(rep)/pos')}>
          <Text style={styles.backButtonText}>Return to POS</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => router.replace('/(admin)/dashboard')}>
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Store Inventory</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        <View style={styles.categoriesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {CATEGORIES.map((cat) => {
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

        <View style={styles.productList}>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.invertedBg} style={{ marginTop: 40 }} />
          ) : (
            filteredInventory.map((item) => {
              const isLowStock = item.stock < 20;
              return (
                <View 
                  key={item.id} 
                  style={[
                    styles.productCard, 
                    { backgroundColor: theme.cardBg },
                    isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow
                  ]}
                >
                  <View style={styles.productTopRow}>
                    <View style={[styles.productImagePlaceholder, isDarkMode && { backgroundColor: '#1E293B' }]}>
                      <Ionicons name={item.icon as any} size={28} color={theme.textMuted} />
                    </View>
                    
                    <View style={styles.productInfo}>
                      <View style={styles.titleRow}>
                        <Text style={[styles.productName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
                      </View>
                      <View style={[styles.categoryTag, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}>
                        <Text style={[styles.categoryTagText, { color: theme.textMuted }]}>{item.category}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.productBottomRow}>
                    <View style={styles.metricColumn}>
                      <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Batch Cost</Text>
                      <Text style={[styles.metricValue, { color: theme.textMuted }]}>ETB {item.costPrice.toFixed(2)}</Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.editableColumn}
                      onPress={() => openEditModal(item.id, item.name, item.sellingPrice)}
                    >
                      <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Selling Price</Text>
                      <View style={styles.editPriceRow}>
                        <Text style={[styles.metricValue, { color: theme.text }]}>ETB <Text style={styles.metricValueBold}>{item.sellingPrice.toFixed(2)}</Text></Text>
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
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, fontSize: 24, fontWeight: '800' }]}
              placeholder="0.00"
              placeholderTextColor={theme.textMuted}
              keyboardType="numeric"
              value={newPriceInput}
              onChangeText={setNewPriceInput}
              autoFocus
            />

            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg }]} onPress={handleUpdatePrice}>
              <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Confirm New Price</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  menuButton: { marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  
  scrollContentDark: { paddingBottom: 100, paddingTop: 12 },
  scrollContentLight: { paddingBottom: 100, paddingTop: 12 },
  
  categoriesWrapper: { marginBottom: 20 },
  categoriesScroll: { paddingHorizontal: 20, alignItems: 'center' },
  categoryPill: { borderWidth: 1, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100, marginRight: 10 },
  categoryText: { fontSize: 13, fontWeight: '700' },
  
  productList: { paddingHorizontal: 20 },
  productCard: { borderRadius: 20, padding: 20, marginBottom: 16 },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  
  productTopRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  productImagePlaceholder: { width: 60, height: 60, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16, backgroundColor: '#F1F5F9' },
  productInfo: { flex: 1, paddingTop: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  productName: { fontSize: 18, fontWeight: '800', flex: 1, paddingRight: 8 },
  categoryTag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  categoryTagText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  
  productBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E2E8F0', paddingTop: 16 },
  metricColumn: { justifyContent: 'center' },
  editableColumn: { justifyContent: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: 'rgba(29, 97, 242, 0.05)' },
  editPriceRow: { flexDirection: 'row', alignItems: 'center' },
  metricLabel: { fontSize: 11, marginBottom: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  metricValue: { fontSize: 15, fontWeight: '600' },
  metricValueBold: { fontSize: 16, fontWeight: '800' },

  unauthorizedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#F8FAFC' },
  unauthorizedTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 16, marginBottom: 8 },
  unauthorizedSubtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 24 },
  backButton: { backgroundColor: '#1D61F2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 100 },
  backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sheetTitle: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  
  helperText: { fontSize: 13, lineHeight: 20 },
  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, letterSpacing: 0.5 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, textAlign: 'center' },
  
  submitBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '700' },
});