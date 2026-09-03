import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../store/authStore';
import { useInventoryStore } from '../../store/inventoryStore';

const EXISTING_CATALOG = [
  { name: 'Sunflower Cooking Oil (1L)', category: 'Cooking Oil & Fats' },
  { name: 'Palm Oil (5L)', category: 'Cooking Oil & Fats' },
  { name: 'Wheat Flour (5kg)', category: 'Flour & Baking' },
  { name: 'White Sugar (50kg)', category: 'Refined Sugar' },
  { name: 'Premium Dark Chocolate', category: 'Confectionery' },
];

export default function SuppliersScreen() {
  const router = useRouter();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const isAdmin = role === 'ADMIN' || role === null;

  // Zustand Store Hooks
  const suppliers = useInventoryStore((state) => state.suppliers);
  const toggleSupplierExpand = useInventoryStore((state) => state.toggleSupplierExpand);
  const enrollSupplierAndBatch = useInventoryStore((state) => state.enrollSupplierAndBatch);
  const addBatchToSupplier = useInventoryStore((state) => state.addBatchToSupplier);
  const processRefund = useInventoryStore((state) => state.processRefund);

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

  // Modals State
  const [isEnrollModalVisible, setIsEnrollModalVisible] = useState(false);
  const [isAddBatchModalVisible, setIsAddBatchModalVisible] = useState(false);
  const [isAdjustModalVisible, setIsAdjustModalVisible] = useState(false);
  
  const [activeSupplierId, setActiveSupplierId] = useState<string | null>(null);
  const [activeBatch, setActiveBatch] = useState<any | null>(null);

  // Form States
  const [vendorName, setVendorName] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [batchItems, setBatchItems] = useState([
    { localId: '1', name: '', category: '', qty: '', cost: '', selling: '', photoUri: null as string | null }
  ]);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(null);
  const [refundInputs, setRefundInputs] = useState<Record<string, string>>({});

  const addBatchItem = () => {
    setBatchItems(prev => [...prev, { localId: Date.now().toString(), name: '', category: '', qty: '', cost: '', selling: '', photoUri: null }]);
  };

  const removeBatchItem = (index: number) => {
    if (batchItems.length > 1) {
      setBatchItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateBatchItem = (index: number, field: string, value: string) => {
    setBatchItems(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  const handlePickImage = async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      updateBatchItem(index, 'photoUri', result.assets[0].uri);
    }
  };

  const applyAutocomplete = (index: number, name: string, category: string) => {
    const newItems = [...batchItems];
    newItems[index].name = name;
    newItems[index].category = category;
    setBatchItems(newItems);
    setFocusedItemIndex(null);
  };

  const resetForm = () => {
    setVendorName('');
    setPrimaryCategory('');
    setBatchItems([{ localId: '1', name: '', category: '', qty: '', cost: '', selling: '', photoUri: null }]);
    setFocusedItemIndex(null);
  };

  const handleEnrollSupplier = () => {
    if (!vendorName.trim()) return;
    const formattedItems = batchItems.map(item => ({
      name: item.name,
      category: item.category || 'General',
      qty: parseInt(item.qty) || 0,
      cost: parseFloat(item.cost) || 0,
      selling: parseFloat(item.selling) || 0,
      photoUri: item.photoUri,
    }));

    enrollSupplierAndBatch(vendorName, primaryCategory || 'General', formattedItems);
    setIsEnrollModalVisible(false);
    resetForm();
  };

  const handleAddBatch = () => {
    if (!activeSupplierId) return;
    const formattedItems = batchItems.map(item => ({
      name: item.name,
      category: item.category || 'General',
      qty: parseInt(item.qty) || 0,
      cost: parseFloat(item.cost) || 0,
      selling: parseFloat(item.selling) || 0,
      photoUri: item.photoUri,
    }));

    addBatchToSupplier(activeSupplierId, formattedItems);
    setIsAddBatchModalVisible(false);
    setActiveSupplierId(null);
    resetForm();
  };

  const openAddBatchModal = (supplierId: string) => {
    setActiveSupplierId(supplierId);
    resetForm();
    setIsAddBatchModalVisible(true);
  };

  const openAdjustModal = (batch: any) => {
    setActiveBatch(batch);
    setRefundInputs({});
    setIsAdjustModalVisible(true);
  };

  const handleConfirmRefund = () => {
    if (!activeSupplierId && activeBatch) {
      // Find supplier containing this batch
      const parentSup = suppliers.find(s => s.batches.some(b => b.id === activeBatch.id));
      if (parentSup) {
        const refundsList = Object.entries(refundInputs).map(([itemId, qtyStr]) => ({
          id: itemId,
          refundQty: parseInt(qtyStr) || 0
        }));
        processRefund(parentSup.id, activeBatch.id, refundsList);
      }
    }
    setIsAdjustModalVisible(false);
    setActiveBatch(null);
  };

  const totalPayableSum = suppliers.reduce((acc, s) => acc + s.totalPayable, 0);

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
    subCardBg: isDarkMode ? '#1E293B' : '#F8FAFC',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  const renderBatchItems = () => (
    <>
      {batchItems.map((item, index) => {
        const showSuggestions = focusedItemIndex === index && item.name.length > 1;
        const suggestions = EXISTING_CATALOG.filter(c => c.name.toLowerCase().includes(item.name.toLowerCase()));

        return (
          <View key={item.localId} style={[styles.itemEntryCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={styles.itemEntryHeader}>
              <Text style={[styles.itemEntryTitle, { color: theme.text }]}>Item {index + 1}</Text>
              {batchItems.length > 1 && (
                <TouchableOpacity onPress={() => removeBatchItem(index)}>
                  <Ionicons name="trash-outline" size={20} color="#DC2626" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={[styles.photoPicker, { backgroundColor: theme.inputBg, borderColor: theme.border }]} onPress={() => handlePickImage(index)}>
              {item.photoUri ? (
                <Image source={{ uri: item.photoUri }} style={styles.previewImage} />
              ) : (
                <>
                  <Ionicons name="image-outline" size={24} color={theme.textMuted} />
                  <Text style={[styles.photoPickerText, { color: theme.textMuted }]}>Item Image (Optional)</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={[styles.inputLabel, { color: theme.text }]}>Item Name</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
              placeholder="Start typing item name..." 
              placeholderTextColor={theme.textMuted} 
              value={item.name} 
              onChangeText={(val) => updateBatchItem(index, 'name', val)}
              onFocus={() => setFocusedItemIndex(index)}
            />

            {showSuggestions && suggestions.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionScroll}>
                {suggestions.map((suggestion, sIdx) => (
                  <TouchableOpacity 
                    key={sIdx} 
                    style={[styles.suggestionPill, { backgroundColor: theme.invertedBg }]}
                    onPress={() => applyAutocomplete(index, suggestion.name, suggestion.category)}
                  >
                    <Text style={{ color: theme.invertedText, fontWeight: '600', fontSize: 13 }}>{suggestion.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <Text style={[styles.inputLabel, { color: theme.text }]}>Category</Text>
            <TextInput 
              style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
              placeholder="e.g. Beverages" 
              placeholderTextColor={theme.textMuted} 
              value={item.category} 
              onChangeText={(val) => updateBatchItem(index, 'category', val)} 
            />

            <View style={styles.rowInputs}>
              <View style={styles.thirdInput}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>Qty</Text>
                <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="0" keyboardType="numeric" placeholderTextColor={theme.textMuted} value={item.qty} onChangeText={(val) => updateBatchItem(index, 'qty', val)} />
              </View>
              <View style={styles.thirdInput}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>Cost</Text>
                <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="0.00" keyboardType="numeric" placeholderTextColor={theme.textMuted} value={item.cost} onChangeText={(val) => updateBatchItem(index, 'cost', val)} />
              </View>
              <View style={styles.thirdInput}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>Selling</Text>
                <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="0.00" keyboardType="numeric" placeholderTextColor={theme.textMuted} value={item.selling} onChangeText={(val) => updateBatchItem(index, 'selling', val)} />
              </View>
            </View>
          </View>
        );
      })}

      <TouchableOpacity style={[styles.addAnotherBtn, { borderColor: theme.border }]} onPress={addBatchItem}>
        <Ionicons name="add" size={18} color={theme.text} style={{ marginRight: 6 }} />
        <Text style={{ color: theme.text, fontWeight: '700' }}>Add Another Item</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => router.replace('/(admin)/dashboard')}>
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Active Suppliers</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        <View style={styles.titleContainer}>
          <View style={styles.summaryBadgeRow}>
            <View style={styles.payableBadge}>
              <Text style={styles.payableBadgeText}>ETB {totalPayableSum.toLocaleString()} Total Payable</Text>
            </View>
            <Text style={[styles.activeSuppliersText, { color: theme.textMuted }]}>Across {suppliers.length} active vendors</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.mainActionBtn, { backgroundColor: theme.invertedBg }]} onPress={() => setIsEnrollModalVisible(true)}>
            <Ionicons name="add" size={20} color={theme.invertedText} style={styles.btnIcon} />
            <Text style={[styles.mainActionText, { color: theme.invertedText }]}>Enroll Supplier & Batch</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {suppliers.map((supplier) => (
            <View key={supplier.id} style={[styles.supplierCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
              <TouchableOpacity style={styles.supplierHeaderRow} onPress={() => toggleSupplierExpand(supplier.id)} activeOpacity={0.7}>
                <View style={styles.supplierMetaRow}>
                  <View style={[styles.supplierIconBox, isDarkMode && { backgroundColor: '#1E293B' }]}>
                    <Ionicons name="business-outline" size={24} color="#1D61F2" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.supplierName, { color: theme.text }]}>{supplier.name}</Text>
                    <Text style={[styles.supplierCategory, { color: theme.textMuted }]}>
                      ETB {supplier.totalPayable.toLocaleString()} Due
                    </Text>
                  </View>
                </View>
                <Ionicons name={supplier.isExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textMuted} />
              </TouchableOpacity>

              {supplier.isExpanded && (
                <View style={[styles.batchesContainer, { borderTopColor: theme.border }]}>
                  <View style={styles.batchesHeaderRow}>
                    <Text style={[styles.batchesTitle, { color: theme.textMuted }]}>INVENTORY BATCHES</Text>
                    <TouchableOpacity onPress={() => openAddBatchModal(supplier.id)} style={styles.addBatchBtnInline}>
                      <Ionicons name="add-circle" size={16} color="#1D61F2" style={{ marginRight: 4 }} />
                      <Text style={styles.addBatchInlineText}>New Batch</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {supplier.batches.map((batch) => (
                    <View key={batch.id} style={[styles.batchCard, { backgroundColor: theme.subCardBg, borderColor: theme.border }]}>
                      <View style={styles.batchHeader}>
                        <View>
                          <Text style={[styles.batchId, { color: theme.text }]}>{batch.id}</Text>
                          <Text style={[styles.batchDate, { color: theme.textMuted }]}>{batch.date}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                          <View style={[styles.statusPill, batch.status === 'Paid' ? styles.statusPaid : styles.statusUnpaid]}>
                            <Text style={[styles.statusPillText, batch.status === 'Paid' ? { color: '#059669' } : { color: '#DC2626' }]}>
                              {batch.status}
                            </Text>
                          </View>
                          <Text style={[styles.batchTotal, { color: theme.text }]}>ETB {batch.totalAmount.toLocaleString()}</Text>
                        </View>
                      </View>

                      <View style={[styles.itemsLedger, { borderTopColor: theme.border }]}>
                        {batch.items.map(item => (
                          <View key={item.id} style={styles.itemRow}>
                            <View style={styles.itemInfo}>
                              <Ionicons name="cube-outline" size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
                              <View>
                                <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                                <Text style={[styles.itemSellingPrice, { color: '#059669' }]}>Sells for ETB {item.selling}</Text>
                              </View>
                            </View>
                            <Text style={[styles.itemMath, { color: theme.textMuted }]}>
                              {item.qty} × {item.cost} = <Text style={{ color: theme.text, fontWeight: '700' }}>{(item.qty * item.cost).toLocaleString()}</Text>
                            </Text>
                          </View>
                        ))}
                      </View>

                      <TouchableOpacity style={[styles.adjustBtn, { borderColor: theme.border, backgroundColor: theme.cardBg }]} onPress={() => openAdjustModal(batch)}>
                        <Ionicons name="swap-horizontal" size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
                        <Text style={[styles.adjustBtnText, { color: theme.text }]}>Adjust / Refund Items</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Enroll Supplier Modal */}
      <Modal visible={isEnrollModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.bg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0, maxHeight: '95%' }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Enroll Supplier</Text>
              <TouchableOpacity onPress={() => setIsEnrollModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Vendor Name</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="e.g. Mojo Coffee Mills" placeholderTextColor={theme.textMuted} value={vendorName} onChangeText={setVendorName} />
              
              <Text style={[styles.inputLabel, { color: theme.text }]}>Primary Category</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="e.g. Coffee Beans" placeholderTextColor={theme.textMuted} value={primaryCategory} onChangeText={setPrimaryCategory} />

              <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
              <Text style={[styles.sectionSubtitle, { color: theme.text }]}>Record Initial Batch</Text>

              {renderBatchItems()}

              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg }]} onPress={handleEnrollSupplier}>
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Save Supplier & Update Stock</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Add Batch Modal */}
      <Modal visible={isAddBatchModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.bg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0, maxHeight: '95%' }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Receive New Batch</Text>
              <TouchableOpacity onPress={() => setIsAddBatchModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>
              {renderBatchItems()}
              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg }]} onPress={handleAddBatch}>
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Record Batch & Update Stock</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Adjust / Refund Modal */}
      <Modal visible={isAdjustModalVisible} animationType="fade" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Refund Items ({activeBatch?.id})</Text>
              <TouchableOpacity onPress={() => setIsAdjustModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.helperText, { color: theme.textMuted }]}>
              Enter the quantity returned. This deducts from global Stock and reduces the supplier payable ledger instantly.
            </Text>
            
            {activeBatch?.items.map((item: any) => (
              <View key={item.id} style={[styles.refundRow, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.refundItemName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.refundCostInfo, { color: theme.textMuted }]}>Available Qty: {item.qty} | Cost: ETB {item.cost}</Text>
                </View>
                <TextInput 
                  style={[styles.refundInput, { borderColor: theme.border, color: theme.text, backgroundColor: theme.cardBg }]} 
                  placeholder="0" 
                  placeholderTextColor={theme.textMuted} 
                  keyboardType="numeric"
                  value={refundInputs[item.id] || ''}
                  onChangeText={(val) => setRefundInputs(prev => ({ ...prev, [item.id]: val }))}
                />
              </View>
            ))}

            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#DC2626' }]} onPress={handleConfirmRefund}>
              <Text style={[styles.submitBtnText, { color: '#FFFFFF' }]}>Process Deduction</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menuButton: { marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  
  scrollContentDark: { paddingBottom: 120, paddingTop: 8 },
  scrollContentLight: { paddingBottom: 120, paddingTop: 8 },
  
  titleContainer: { paddingHorizontal: 20, marginBottom: 20 },
  summaryBadgeRow: { flexDirection: 'row', alignItems: 'center' },
  payableBadge: { backgroundColor: '#FEE2E2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, marginRight: 12 },
  payableBadgeText: { color: '#DC2626', fontWeight: '800', fontSize: 13 },
  activeSuppliersText: { fontSize: 14, fontWeight: '500' },

  actionContainer: { paddingHorizontal: 20, marginBottom: 24 },
  mainActionBtn: { flexDirection: 'row', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnIcon: { marginRight: 8 },
  mainActionText: { fontWeight: '700', fontSize: 15 },

  listContainer: { paddingHorizontal: 20 },
  supplierCard: { borderRadius: 24, padding: 20, marginBottom: 16, overflow: 'hidden' },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  
  supplierHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  supplierMetaRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  supplierIconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  supplierName: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  supplierCategory: { fontSize: 13, fontWeight: '500' },

  batchesContainer: { marginTop: 20, paddingTop: 16, borderTopWidth: 1 },
  batchesHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  batchesTitle: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  addBatchBtnInline: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#EFF6FF', borderRadius: 100 },
  addBatchInlineText: { fontSize: 12, fontWeight: '700', color: '#1D61F2' },
  
  batchCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  batchHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  batchId: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
  batchDate: { fontSize: 12 },
  batchTotal: { fontSize: 16, fontWeight: '900', marginTop: 4 },
  
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusPaid: { backgroundColor: '#ECFDF5' },
  statusUnpaid: { backgroundColor: '#FEF2F2' },
  statusPillText: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },

  itemsLedger: { borderTopWidth: 1, paddingTop: 12, borderStyle: 'dashed' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  itemInfo: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  itemSellingPrice: { fontSize: 11, fontWeight: '600' },
  itemMath: { fontSize: 13, marginTop: 2 },

  adjustBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, borderWidth: 1, marginTop: 12 },
  adjustBtnText: { fontSize: 13, fontWeight: '700' },

  unauthorizedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#F8FAFC' },
  unauthorizedTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 16, marginBottom: 8 },
  unauthorizedSubtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 24 },
  backButton: { backgroundColor: '#1D61F2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 100 },
  backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  sheetScroll: { paddingBottom: 40 },
  
  itemEntryCard: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 16 },
  itemEntryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  itemEntryTitle: { fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  
  addAnotherBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', marginBottom: 24 },
  
  suggestionScroll: { flexDirection: 'row', marginTop: 4, marginBottom: 12 },
  suggestionPill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100, marginRight: 8 },

  photoPicker: { height: 70, borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden' },
  photoPickerText: { marginTop: 4, fontWeight: '600', fontSize: 12 },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  
  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '600' },
  
  rowInputs: { flexDirection: 'row', gap: 8 },
  thirdInput: { flex: 1 },
  dividerLine: { height: 1, marginVertical: 20 },
  sectionSubtitle: { fontSize: 16, fontWeight: '800', marginBottom: 12 },

  helperText: { fontSize: 13, marginBottom: 20, lineHeight: 20 },
  refundRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  refundItemName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  refundCostInfo: { fontSize: 12 },
  refundInput: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, width: 80, textAlign: 'center', fontWeight: '700' },

  submitBtn: { marginTop: 12, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '700' },
});