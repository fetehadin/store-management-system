import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
  StatusBar, Modal, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';

export default function SuppliersScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const isAdmin = role === 'ADMIN' || role === null;

  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isEnrollModalVisible, setIsEnrollModalVisible] = useState(false);
  const [isAddBatchModalVisible, setIsAddBatchModalVisible] = useState(false);
  const [isAdjustModalVisible, setIsAdjustModalVisible] = useState(false);
  const [isPayModalVisible, setIsPayModalVisible] = useState(false);
  
  const [activeSupplierId, setActiveSupplierId] = useState<string | null>(null);
  const [activeBatch, setActiveBatch] = useState<any | null>(null);

  // Track exactly which input is focused for displaying inline suggestion chips
  const [focusedField, setFocusedField] = useState<{ index: number, field: 'name' | 'category' } | null>(null);

  const [vendorName, setVendorName] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [batchItems, setBatchItems] = useState([
    { localId: '1', name: '', category: '', qty: '', cost: '', selling: '', photoUri: null as string | null }
  ]);
  const [refundInputs, setRefundInputs] = useState<Record<string, string>>({});

  // 1. Fetch Suppliers
  const { data: suppliers = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-suppliers'],
    queryFn: async () => {
      const response = await apiClient.get('/admin/suppliers');
      return response.data?.data || [];
    },
    enabled: isAdmin,
  });

  // 2. Fetch all known products once for instant, in-memory filtering (No more typing lag!)
  const { data: allProducts = [] } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const response = await apiClient.get('/inventory/products');
      return response.data?.data || [];
    },
    enabled: isAdmin,
  });

  // Extract a master list of unique categories
  const uniqueCategories = Array.from(new Set(allProducts.map((p: any) => p.category).filter(Boolean)));

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Mutations
  const enrollSupplierMutation = useMutation({
    mutationFn: async (payload: any) => apiClient.post('/admin/suppliers', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
      Alert.alert('Success', 'Supplier enrolled successfully.');
      setIsEnrollModalVisible(false);
      resetForm();
    },
    onError: (error: any) => Alert.alert('Error', error.response?.data?.message || 'Failed to save supplier.')
  });

  const deleteSupplierMutation = useMutation({
    mutationFn: async (supplierId: string) => apiClient.delete(`/admin/suppliers/${supplierId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
      Alert.alert('Success', 'Supplier removed successfully.');
    },
    onError: (error: any) => Alert.alert('Error', error.response?.data?.message || 'Failed to delete supplier.')
  });

  const deleteBatchMutation = useMutation({
    mutationFn: async ({ supplierId, batchId }: { supplierId: string, batchId: string }) => 
      apiClient.delete(`/admin/suppliers/${supplierId}/batches/${batchId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
      Alert.alert('Cleared', 'Fully sold and paid batch has been removed.');
    },
    onError: (error: any) => Alert.alert('Error', error.response?.data?.message || 'Failed to remove batch.')
  });

  const addBatchMutation = useMutation({
    mutationFn: async ({ id, items }: { id: string, items: any[] }) => apiClient.post(`/admin/suppliers/${id}/batches`, { items }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
      Alert.alert('Success', 'New batch added to stock.');
      setIsAddBatchModalVisible(false);
      setActiveSupplierId(null);
      resetForm();
    },
    onError: (error: any) => Alert.alert('Error', error.response?.data?.message || 'Failed to record batch.')
  });

  const payBatchMutation = useMutation({
    mutationFn: async ({ supplierId, batchId, amount }: { supplierId: string, batchId: string, amount: number }) => 
      apiClient.post(`/admin/suppliers/${supplierId}/batches/${batchId}/pay`, { amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
      Alert.alert('Success', 'Payment distributed and logged securely.');
      setIsPayModalVisible(false);
      setActiveBatch(null);
    },
    onError: (error: any) => Alert.alert('Error', error.response?.data?.message || 'Payment failed.')
  });

  const refundMutation = useMutation({
    mutationFn: async ({ supplierId, batchId, refunds }: { supplierId: string, batchId: string, refunds: any[] }) => 
      apiClient.post(`/admin/suppliers/${supplierId}/batches/${batchId}/refund`, { refunds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-suppliers'] });
      Alert.alert('Success', 'Refund processed correctly.');
      setIsAdjustModalVisible(false);
      setActiveBatch(null);
    },
    onError: (error: any) => Alert.alert('Refund Blocked', error.response?.data?.message || 'Failed.')
  });

  // Handlers
  const toggleSupplierExpand = (id: string) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleDeleteSupplier = (supplierId: string, supplierName: string) => {
    Alert.alert(
      "Delete Supplier",
      `Are you sure you want to delete ${supplierName}? This will remove all associated history.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteSupplierMutation.mutate(supplierId) }
      ]
    );
  };

  const handleDeleteBatch = (supplierId: string, batchId: string) => {
    Alert.alert(
      "Remove Batch",
      "This batch is fully sold out and completely paid off. Archive it?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Archive", style: "destructive", onPress: () => deleteBatchMutation.mutate({ supplierId, batchId }) }
      ]
    );
  };

  const addBatchItem = () => setBatchItems(prev => [...prev, { localId: Date.now().toString(), name: '', category: '', qty: '', cost: '', selling: '', photoUri: null }]);
  const removeBatchItem = (index: number) => { if (batchItems.length > 1) setBatchItems(prev => prev.filter((_, i) => i !== index)); };
  const updateBatchItem = (index: number, field: string, value: string) => {
    setBatchItems(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  const resetForm = () => {
    setVendorName(''); setPrimaryCategory(''); setPaymentAmount('');
    setBatchItems([{ localId: '1', name: '', category: '', qty: '', cost: '', selling: '', photoUri: null }]);
  };

  const handleEnrollSupplier = () => {
    if (!vendorName.trim()) return;
    const formattedItems = batchItems.map(item => ({
      name: item.name, category: item.category || 'General', qty: parseInt(item.qty) || 0, cost: parseFloat(item.cost) || 0, selling: parseFloat(item.selling) || 0, photoUri: item.photoUri,
    }));
    enrollSupplierMutation.mutate({ name: vendorName, category: primaryCategory, items: formattedItems });
  };

  const handleAddBatch = () => {
    if (!activeSupplierId) return;
    const formattedItems = batchItems.map(item => ({
      name: item.name, category: item.category || 'General', qty: parseInt(item.qty) || 0, cost: parseFloat(item.cost) || 0, selling: parseFloat(item.selling) || 0, photoUri: item.photoUri,
    }));
    addBatchMutation.mutate({ id: activeSupplierId, items: formattedItems });
  };

  const handleConfirmRefund = () => {
    if (activeSupplierId && activeBatch) {
      const formattedRefunds = Object.entries(refundInputs)
        .map(([itemId, qtyStr]) => ({ itemId, refundQty: parseInt(qtyStr) || 0 }))
        .filter(r => r.refundQty > 0);
      if (formattedRefunds.length === 0) return Alert.alert("Error", "Enter at least one refund quantity.");
      refundMutation.mutate({ supplierId: activeSupplierId, batchId: activeBatch.id, refunds: formattedRefunds });
    }
  };

  const handleConfirmPayment = () => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) return Alert.alert("Invalid Amount", "Please enter a valid payment amount.");
    if (activeSupplierId && activeBatch) {
      payBatchMutation.mutate({ supplierId: activeSupplierId, batchId: activeBatch.id, amount });
    }
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

  const totalPayableSum = suppliers.reduce((acc: number, s: any) => acc + Number(s.totalPayable || 0), 0);

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC', text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B', border: isDarkMode ? '#2F3336' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5', invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF', subCardBg: isDarkMode ? '#1E293B' : '#F8FAFC',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  const renderBatchItems = () => (
    <>
      {batchItems.map((item, index) => {
        // --- IN-MEMORY CLASSIC FILTERING ---
        const categorySearch = item.category.toLowerCase();
        const filteredCategories = uniqueCategories.filter((c: any) => c.toLowerCase().includes(categorySearch));

        const nameSearch = item.name.toLowerCase();
        // Only suggest items that match the currently typed/selected category
        const availableItemsInCategory = allProducts.filter((p: any) => p.category === item.category);
        const filteredItems = availableItemsInCategory.filter((p: any) => p.name.toLowerCase().includes(nameSearch));

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
            
            {/* 1. CATEGORY INPUT FIRST */}
            <View>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Category</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
                placeholder="e.g. Beverages" 
                placeholderTextColor={theme.textMuted} 
                value={item.category} 
                onFocus={() => setFocusedField({ index, field: 'category' })}
                onChangeText={(val) => updateBatchItem(index, 'category', val)} 
              />
              
              {/* Classic Horizontal Chips for Categories */}
              {focusedField?.index === index && focusedField?.field === 'category' && filteredCategories.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScrollContainer} keyboardShouldPersistTaps="always">
                  {filteredCategories.map((cat: any, cIdx: number) => (
                    <TouchableOpacity 
                      key={cIdx} 
                      style={[styles.chip, { backgroundColor: theme.invertedBg }]} 
                      onPress={() => { 
                        updateBatchItem(index, 'category', cat); 
                        setFocusedField({ index, field: 'name' }); // Auto-advance to item name!
                      }}
                    >
                      <Text style={[styles.chipText, { color: theme.invertedText }]}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* 2. ITEM NAME INPUT SECOND */}
            <View style={{ marginTop: 12 }}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Item Name (Filtered by Category)</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
                placeholder="e.g. Cooking Oil" 
                placeholderTextColor={theme.textMuted} 
                value={item.name} 
                onFocus={() => setFocusedField({ index, field: 'name' })}
                onChangeText={(val) => updateBatchItem(index, 'name', val)} 
              />
              
              {/* Classic Horizontal Chips for Items */}
              {focusedField?.index === index && focusedField?.field === 'name' && filteredItems.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScrollContainer} keyboardShouldPersistTaps="always">
                  {filteredItems.map((prod: any, pIdx: number) => (
                    <TouchableOpacity 
                      key={pIdx} 
                      style={[styles.chip, { backgroundColor: theme.invertedBg }]} 
                      onPress={() => { 
                        updateBatchItem(index, 'name', prod.name); 
                        updateBatchItem(index, 'selling', prod.sellingPrice.toString()); 
                        setFocusedField(null); 
                      }}
                    >
                      <Text style={[styles.chipText, { color: theme.invertedText }]}>{prod.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
            
            {/* 3. MATH INPUTS */}
            <View style={[styles.rowInputs, { marginTop: 16 }]}>
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

      <ScrollView 
        keyboardShouldPersistTaps="handled" 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
        contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} 
        showsVerticalScrollIndicator={false}
      >
        
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
          {isLoading ? <ActivityIndicator size="large" color="#177CA5" style={{ marginTop: 40 }} /> : suppliers.map((supplier: any) => {
            const isExpanded = expandedIds.includes(supplier.id);

            return (
            <View key={supplier.id} style={[styles.supplierCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
              <View style={styles.supplierHeaderRow}>
                <TouchableOpacity style={styles.supplierMetaRow} onPress={() => toggleSupplierExpand(supplier.id)} activeOpacity={0.7}>
                  <View style={[styles.supplierIconBox, isDarkMode && { backgroundColor: '#1E293B' }]}>
                    <Ionicons name="business-outline" size={24} color="#1D61F2" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.supplierName, { color: theme.text }]}>{supplier.name}</Text>
                    <Text style={[styles.supplierCategory, { color: theme.textMuted }]}>
                      ETB {Number(supplier.totalPayable).toLocaleString()} Due
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => handleDeleteSupplier(supplier.id, supplier.name)} style={{ padding: 8, marginRight: 8 }}>
                    <Ionicons name="trash-outline" size={20} color="#DC2626" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleSupplierExpand(supplier.id)}>
                    <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>

              {isExpanded && (
                <View style={[styles.batchesContainer, { borderTopColor: theme.border }]}>
                  <View style={styles.batchesHeaderRow}>
                    <Text style={[styles.batchesTitle, { color: theme.textMuted }]}>INVENTORY BATCHES</Text>
                    <TouchableOpacity onPress={() => { setActiveSupplierId(supplier.id); setIsAddBatchModalVisible(true); }} style={styles.addBatchBtnInline}>
                      <Ionicons name="add-circle" size={16} color="#1D61F2" style={{ marginRight: 4 }} />
                      <Text style={styles.addBatchInlineText}>New Batch</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {supplier.batches.map((batch: any) => {
                    const isFullySoldOut = batch.items.every((item: any) => (item.remainingQty ?? item.qty) === 0);
                    const isFullyPaid = batch.unpaidAmount <= 0;
                    const canRemoveBatch = isFullySoldOut && isFullyPaid;

                    return (
                      <View key={batch.id} style={[styles.batchCard, { backgroundColor: theme.subCardBg, borderColor: theme.border }]}>
                        <View style={styles.batchHeader}>
                          <View>
                            <Text style={[styles.batchId, { color: theme.text }]}>{batch.id}</Text>
                            <Text style={[styles.batchDate, { color: theme.textMuted }]}>{batch.date}</Text>
                          </View>
                          <View style={{ alignItems: 'flex-end' }}>
                            <View style={[styles.statusPill, isFullyPaid ? styles.statusPaid : styles.statusUnpaid]}>
                              <Text style={[styles.statusPillText, isFullyPaid ? { color: '#059669' } : { color: '#DC2626' }]}>
                                {isFullyPaid ? 'CLEARED' : `UNPAID: ETB ${batch.unpaidAmount.toLocaleString()}`}
                              </Text>
                            </View>
                            <Text style={[styles.batchTotal, { color: theme.text }]}>Total: ETB {Number(batch.totalAmount).toLocaleString()}</Text>
                          </View>
                        </View>

                        <View style={[styles.itemsLedger, { borderTopColor: theme.border }]}>
                          {batch.items.map((item: any) => (
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

                        {canRemoveBatch ? (
                          <TouchableOpacity style={[styles.adjustBtn, { marginTop: 12, borderColor: '#DC2626', backgroundColor: '#FEF2F2' }]} onPress={() => handleDeleteBatch(supplier.id, batch.id)}>
                            <Ionicons name="trash-outline" size={14} color="#DC2626" style={{ marginRight: 6 }} />
                            <Text style={[styles.adjustBtnText, { color: '#DC2626' }]}>Remove Cleared Batch</Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.batchActionRow}>
                            <TouchableOpacity style={[styles.adjustBtn, { flex: 1, marginRight: 6, borderColor: theme.border, backgroundColor: theme.cardBg }]} onPress={() => { setActiveBatch(batch); setActiveSupplierId(supplier.id); setRefundInputs({}); setIsAdjustModalVisible(true); }}>
                              <Ionicons name="swap-horizontal" size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
                              <Text style={[styles.adjustBtnText, { color: theme.text }]}>Refund</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.adjustBtn, { flex: 1, marginLeft: 6, borderColor: '#059669', backgroundColor: '#ECFDF5' }]} onPress={() => { setActiveBatch(batch); setActiveSupplierId(supplier.id); setPaymentAmount(''); setIsPayModalVisible(true); }}>
                              <Ionicons name="cash-outline" size={14} color="#059669" style={{ marginRight: 6 }} />
                              <Text style={[styles.adjustBtnText, { color: '#059669' }]}>Pay</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          )})}
        </View>
      </ScrollView>

      {/* Pay Batch Modal */}
      <Modal visible={isPayModalVisible} animationType="fade" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Record Payment</Text>
              <TouchableOpacity onPress={() => setIsPayModalVisible(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color={theme.textMuted} /></TouchableOpacity>
            </View>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Payment Amount (ETB)</Text>
            <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, fontSize: 24, fontWeight: '800' }]} placeholder="0.00" placeholderTextColor={theme.textMuted} keyboardType="numeric" value={paymentAmount} onChangeText={setPaymentAmount} autoFocus />
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#059669', marginTop: 24, opacity: payBatchMutation.isPending ? 0.7 : 1 }]} onPress={handleConfirmPayment} disabled={payBatchMutation.isPending}>
              <Text style={[styles.submitBtnText, { color: '#FFFFFF' }]}>{payBatchMutation.isPending ? 'Processing...' : 'Confirm Payment'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Adjust / Refund Modal */}
      <Modal visible={isAdjustModalVisible} animationType="fade" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Refund Items</Text>
              <TouchableOpacity onPress={() => setIsAdjustModalVisible(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color={theme.textMuted} /></TouchableOpacity>
            </View>
            {activeBatch?.items.map((item: any) => (
              <View key={item.id} style={[styles.refundRow, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.refundItemName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.refundCostInfo, { color: theme.textMuted }]}>Available: {item.qty} | Cost: ETB {item.cost}</Text>
                </View>
                <TextInput style={[styles.refundInput, { borderColor: theme.border, color: theme.text, backgroundColor: theme.cardBg }]} placeholder="0" placeholderTextColor={theme.textMuted} keyboardType="numeric" value={refundInputs[item.id] || ''} onChangeText={(val) => setRefundInputs(prev => ({ ...prev, [item.id]: val }))} />
              </View>
            ))}
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#DC2626', opacity: refundMutation.isPending ? 0.7 : 1 }]} onPress={handleConfirmRefund} disabled={refundMutation.isPending}>
              <Text style={[styles.submitBtnText, { color: '#FFFFFF' }]}>{refundMutation.isPending ? 'Processing...' : 'Process Refund'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Enroll Supplier Modal */}
      <Modal visible={isEnrollModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.bg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0, maxHeight: '95%' }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Enroll Supplier</Text>
              <TouchableOpacity onPress={() => setIsEnrollModalVisible(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color={theme.textMuted} /></TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>
              <Text style={[styles.inputLabel, { color: theme.text, marginTop: 0 }]}>Vendor Name</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} value={vendorName} onChangeText={setVendorName} />
              {renderBatchItems()}
              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg, opacity: enrollSupplierMutation.isPending ? 0.7 : 1 }]} onPress={handleEnrollSupplier}>
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Save Supplier</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Receive New Batch Modal */}
      <Modal visible={isAddBatchModalVisible} animationType="slide" transparent>
         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.bg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0, maxHeight: '95%' }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Receive New Batch</Text>
              <TouchableOpacity onPress={() => setIsAddBatchModalVisible(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color={theme.textMuted} /></TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>
              {renderBatchItems()}
              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg, opacity: addBatchMutation.isPending ? 0.7 : 1 }]} onPress={handleAddBatch}>
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Record Batch</Text>
              </TouchableOpacity>
            </ScrollView>
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
  batchActionRow: { flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' },
  adjustBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, borderWidth: 1 },
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
  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 8 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '600' },
  rowInputs: { flexDirection: 'row', gap: 8 },
  thirdInput: { flex: 1 },
  refundRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  refundItemName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  refundCostInfo: { fontSize: 12 },
  refundInput: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, width: 80, textAlign: 'center', fontWeight: '700' },
  submitBtn: { marginTop: 12, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '700' },
  
  // NEW CLASSIC UI CHIPS
  chipScrollContainer: { marginTop: 8, marginBottom: 4 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, marginRight: 8 },
  chipText: { fontSize: 13, fontWeight: '600' },
});