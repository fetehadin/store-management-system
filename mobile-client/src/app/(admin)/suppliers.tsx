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
import { useAuthStore } from '../../store/authStore';

// Complex Data Structure for Vendors, Batches, and specific Items
const SUPPLIERS_DATA = [
  {
    id: '1',
    name: 'Oromia Oil Mills',
    category: 'Cooking Oil & Fats',
    totalPayable: 85000,
    isExpanded: true,
    batches: [
      {
        id: 'BATCH-114',
        date: 'Oct 12, 2026',
        status: 'Unpaid',
        totalAmount: 45000,
        items: [
          { id: 'i1', name: 'Sunflower Oil (1L)', qty: 100, cost: 320 },
          { id: 'i2', name: 'Palm Oil (5L)', qty: 10, cost: 1300 }
        ]
      },
      {
        id: 'BATCH-109',
        date: 'Sep 28, 2026',
        status: 'Paid',
        totalAmount: 40000,
        items: [
          { id: 'i3', name: 'Sunflower Oil (1L)', qty: 125, cost: 320 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Addis Sugar Factory',
    category: 'Refined Sugar',
    totalPayable: 35000,
    isExpanded: false,
    batches: [
      {
        id: 'BATCH-110',
        date: 'Oct 01, 2026',
        status: 'Unpaid',
        totalAmount: 35000,
        items: [
          { id: 'i4', name: 'White Sugar (50kg)', qty: 10, cost: 3500 }
        ]
      }
    ]
  }
];

export default function SuppliersScreen() {
  const router = useRouter();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const isAdmin = role === 'ADMIN' || role === null;

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

  const [activeNav, setActiveNav] = useState('Suppliers');
  const [suppliers, setSuppliers] = useState(SUPPLIERS_DATA);

  // Modals State
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isAdjustModalVisible, setIsAdjustModalVisible] = useState(false);
  const [activeBatchId, setActiveBatchId] = useState<string | null>(null);

  // Add Supplier Form State
  const [newSupplierName, setNewSupplierName] = useState('');
  const [newSupplierCategory, setNewSupplierCategory] = useState('');
  const [initialItemName, setInitialItemName] = useState('');
  const [initialItemQty, setInitialItemQty] = useState('');
  const [initialItemCost, setInitialItemCost] = useState('');

  const toggleExpand = (id: string) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, isExpanded: !s.isExpanded } : s));
  };

  const handleAddSupplier = () => {
    console.log("New Supplier:", { newSupplierName, initialItemName, initialItemQty, initialItemCost });
    setIsAddModalVisible(false);
    // Reset fields...
  };

  const openAdjustModal = (batchId: string) => {
    setActiveBatchId(batchId);
    setIsAdjustModalVisible(true);
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#1D61F2',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
    subCardBg: isDarkMode ? '#1E293B' : '#F8FAFC',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Standardized Admin Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => router.replace('/(admin)/dashboard')}>
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Active Suppliers</Text>
        </View>
        <View style={styles.headerRight}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=Admin&background=1D61F2&color=fff' }} style={styles.avatar} />
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        {/* Title & Summary Badge */}
        <View style={styles.titleContainer}>
          <View style={styles.summaryBadgeRow}>
            <View style={styles.payableBadge}>
              <Text style={styles.payableBadgeText}>ETB 120,000 Total Payable</Text>
            </View>
            <Text style={[styles.activeSuppliersText, { color: theme.textMuted }]}>Across {suppliers.length} active vendors</Text>
          </View>
        </View>

        {/* Primary Action Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.mainActionBtn, { backgroundColor: theme.invertedBg }]} onPress={() => setIsAddModalVisible(true)}>
            <Ionicons name="add" size={20} color={theme.invertedText} style={styles.btnIcon} />
            <Text style={[styles.mainActionText, { color: theme.invertedText }]}>Enroll Supplier & Batch</Text>
          </TouchableOpacity>
        </View>

        {/* Suppliers Accordion List */}
        <View style={styles.listContainer}>
          {suppliers.map((supplier) => (
            <View 
              key={supplier.id} 
              style={[
                styles.supplierCard, 
                { backgroundColor: theme.cardBg },
                isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow
              ]}
            >
              {/* Supplier Header */}
              <TouchableOpacity 
                style={styles.supplierHeaderRow} 
                onPress={() => toggleExpand(supplier.id)}
                activeOpacity={0.7}
              >
                <View style={styles.supplierMetaRow}>
                  <View style={[styles.supplierIconBox, isDarkMode && { backgroundColor: '#1E293B' }]}>
                    <Ionicons name="business-outline" size={24} color="#1D61F2" />
                  </View>
                  <View>
                    <Text style={[styles.supplierName, { color: theme.text }]}>{supplier.name}</Text>
                    <Text style={[styles.supplierCategory, { color: theme.textMuted }]}>
                      {supplier.category} • ETB {supplier.totalPayable.toLocaleString()} Due
                    </Text>
                  </View>
                </View>
                <Ionicons name={supplier.isExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textMuted} />
              </TouchableOpacity>

              {/* Expanded Batches & Items Section */}
              {supplier.isExpanded && (
                <View style={[styles.batchesContainer, { borderTopColor: theme.border }]}>
                  <Text style={[styles.batchesTitle, { color: theme.textMuted }]}>INVENTORY BATCHES</Text>
                  
                  {supplier.batches.map((batch) => (
                    <View key={batch.id} style={[styles.batchCard, { backgroundColor: theme.subCardBg, borderColor: theme.border }]}>
                      {/* Batch Header */}
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

                      {/* Items Ledger within Batch */}
                      <View style={[styles.itemsLedger, { borderTopColor: theme.border }]}>
                        {batch.items.map(item => (
                          <View key={item.id} style={styles.itemRow}>
                            <View style={styles.itemInfo}>
                              <Ionicons name="cube-outline" size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
                              <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                            </View>
                            <Text style={[styles.itemMath, { color: theme.textMuted }]}>
                              {item.qty} × {item.cost} = <Text style={{ color: theme.text, fontWeight: '700' }}>{(item.qty * item.cost).toLocaleString()}</Text>
                            </Text>
                          </View>
                        ))}
                      </View>

                      {/* Adjust / Refund Action */}
                      <TouchableOpacity 
                        style={[styles.adjustBtn, { borderColor: theme.border, backgroundColor: theme.cardBg }]}
                        onPress={() => openAdjustModal(batch.id)}
                      >
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

      {/* Universal Bottom Navigation */}
      <View style={isDarkMode ? [styles.darkBottomNav, { backgroundColor: theme.bg, borderTopColor: theme.border }] : styles.lightBottomNavContainer}>
        <View style={isDarkMode ? { flexDirection: 'row', width: '100%', justifyContent: 'space-around' } : styles.lightBottomNav}>
          {[
            { id: 'Home', icon: 'grid', route: '/(admin)/dashboard' },
            { id: 'Sales', icon: 'bar-chart', route: '/(admin)/sales' },
            { id: 'Stock', icon: 'cube', route: '/(admin)/stock' },
            { id: 'Suppliers', icon: 'people', route: '/(admin)/suppliers' },
            { id: 'Approvals', icon: 'checkmark-circle', route: '/(admin)/approvals' },
          ].map((tab) => {
            const isActive = activeNav === tab.id;
            return (
              <TouchableOpacity 
                key={tab.id}
                style={isDarkMode ? styles.darkNavItem : (isActive ? styles.lightNavItemActive : styles.lightNavItem)}
                onPress={() => {
                  setActiveNav(tab.id);
                  router.replace(tab.route as any);
                }}
              >
                <Ionicons name={isActive ? tab.icon as any : `${tab.icon}-outline` as any} size={24} color={isDarkMode ? (isActive ? theme.text : theme.textMuted) : (isActive ? '#FFFFFF' : '#64748B')} />
                <Text style={[isDarkMode ? styles.darkNavText : styles.lightNavText, { color: isDarkMode ? (isActive ? theme.text : theme.textMuted) : (isActive ? '#FFFFFF' : '#64748B') }, isActive && { fontWeight: '700' }]}>
                  {tab.id}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Add Supplier Modal */}
      <Modal visible={isAddModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Enroll Supplier</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Vendor Name</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="e.g. Mojo Coffee Mills" placeholderTextColor={theme.textMuted} value={newSupplierName} onChangeText={setNewSupplierName} />
              
              <Text style={[styles.inputLabel, { color: theme.text }]}>Primary Category</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="e.g. Coffee Beans" placeholderTextColor={theme.textMuted} value={newSupplierCategory} onChangeText={setNewSupplierCategory} />

              <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
              <Text style={[styles.sectionSubtitle, { color: theme.text }]}>Record Initial Batch</Text>

              <Text style={[styles.inputLabel, { color: theme.text }]}>Item Received</Text>
              <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="e.g. Arabica Grade 1 (50kg)" placeholderTextColor={theme.textMuted} value={initialItemName} onChangeText={setInitialItemName} />

              <View style={styles.rowInputs}>
                <View style={styles.halfInput}>
                  <Text style={[styles.inputLabel, { color: theme.text }]}>Quantity</Text>
                  <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="0" keyboardType="numeric" placeholderTextColor={theme.textMuted} value={initialItemQty} onChangeText={setInitialItemQty} />
                </View>
                <View style={styles.halfInput}>
                  <Text style={[styles.inputLabel, { color: theme.text }]}>Unit Cost (ETB)</Text>
                  <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="0.00" keyboardType="numeric" placeholderTextColor={theme.textMuted} value={initialItemCost} onChangeText={setInitialItemCost} />
                </View>
              </View>

              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg }]} onPress={handleAddSupplier}>
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Save Supplier & Batch</Text>
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
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Refund Faulty Items</Text>
              <TouchableOpacity onPress={() => setIsAdjustModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.helperText, { color: theme.textMuted }]}>
              Enter the quantity of items being returned to the supplier. This will automatically deduct from the payable debt ledger.
            </Text>
            
            {/* Mockup for refund input */}
            <View style={[styles.refundRow, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
              <Text style={[styles.refundItemName, { color: theme.text }]}>Sunflower Oil (1L)</Text>
              <TextInput style={[styles.refundInput, { borderColor: theme.border, color: theme.text, backgroundColor: theme.cardBg }]} placeholder="- Qty" placeholderTextColor={theme.textMuted} keyboardType="numeric" />
            </View>

            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#DC2626' }]} onPress={() => setIsAdjustModalVisible(false)}>
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
  
  scrollContentDark: { paddingBottom: 24, paddingTop: 8 },
  scrollContentLight: { paddingBottom: 130, paddingTop: 8 },
  
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
  batchesTitle: { fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 12 },
  
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
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  itemInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  itemName: { fontSize: 13, fontWeight: '600' },
  itemMath: { fontSize: 13 },

  adjustBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, borderWidth: 1, marginTop: 12 },
  adjustBtnText: { fontSize: 13, fontWeight: '700' },

  unauthorizedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#F8FAFC' },
  unauthorizedTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 16, marginBottom: 8 },
  unauthorizedSubtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 24 },
  backButton: { backgroundColor: '#1D61F2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 100 },
  backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  darkBottomNav: { borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: 24, paddingTop: 12, flexDirection: 'row', alignItems: 'center' },
  darkNavItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  darkNavText: { fontSize: 10, fontWeight: '500', marginTop: 4 },
  
  lightBottomNavContainer: { position: 'absolute', bottom: 24, left: 20, right: 20 },
  lightBottomNav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 8, justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 15 },
  lightNavItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 8 },
  lightNavItemActive: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#1D61F2', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 100 },
  lightNavText: { fontSize: 10, fontWeight: '600', marginTop: 4 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  
  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '600' },
  
  rowInputs: { flexDirection: 'row', gap: 12 },
  halfInput: { flex: 1 },
  dividerLine: { height: 1, marginVertical: 20 },
  sectionSubtitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },

  helperText: { fontSize: 13, marginBottom: 20, lineHeight: 20 },
  refundRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 12, borderWidth: 1 },
  refundItemName: { fontSize: 15, fontWeight: '700', flex: 1 },
  refundInput: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, width: 80, textAlign: 'center', fontWeight: '700' },

  submitBtn: { marginTop: 32, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '700' },
});