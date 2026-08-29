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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const SUPPLIERS_DATA = [
  {
    id: '1',
    name: 'Oromia Oil Mills',
    isExpanded: true,
    batches: [
      { id: 'BATCH-114', date: 'Oct 12, 2023 • 500 Cartons', amount: '45,000', status: 'Unpaid' },
      { id: 'BATCH-109', date: 'Sep 28, 2023 • 450 Cartons', amount: '40,000', status: 'Unpaid' },
      { id: 'BATCH-092', date: 'Aug 15, 2023 • 300 Cartons', amount: '25,000', status: 'Paid' },
    ]
  },
  {
    id: '2',
    name: 'Addis Sugar Factory',
    category: 'Refined Sugar',
    isExpanded: false,
    batches: [
      { id: 'BATCH-110', date: 'Oct 01, 2023 • 200 Cartons', amount: '35,000', status: 'Unpaid' },
    ]
  }
];

export default function SuppliersScreen() {
  const router = useRouter();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const isAdmin = role === 'ADMIN' || role === null;

  // Strict Admin Gate
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

  const [suppliers, setSuppliers] = useState(SUPPLIERS_DATA);
  const [activeNav, setActiveNav] = useState('Suppliers');

  const toggleExpand = (id: string) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, isExpanded: !s.isExpanded } : s));
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#EFF3F4',
    invertedBg: isDarkMode ? '#E7E9EA' : '#1D61F2',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
    subCardBg: isDarkMode ? '#1E293B' : '#F8FAFC',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
          <Text style={[styles.pageTitle, { color: theme.text }]}>Active Suppliers </Text>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        {/* Title & Summary Badge */}
        <View style={styles.titleContainer}>
          <View style={styles.summaryBadgeRow}>
            <View style={styles.payableBadge}>
              <Text style={styles.payableBadgeText}>ETB 120,000 Payable</Text>
            </View>
            <Text style={[styles.activeSuppliersText, { color: theme.textMuted }]}>Across 8 active suppliers</Text>
          </View>
        </View>

        {/* Primary Action Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.mainActionBtn, { backgroundColor: theme.invertedBg }]} onPress={() => console.log('Add Supplier')}>
            <Ionicons name="add" size={20} color={theme.invertedText} style={styles.btnIcon} />
            <Text style={[styles.mainActionText, { color: theme.invertedText }]}>Add Supplier</Text>
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
                activeOpacity={0.8}
              >
                <View style={styles.supplierMetaRow}>
                  <View style={[styles.supplierIconBox, isDarkMode && { backgroundColor: '#1E293B' }]}>
                    <Ionicons name="business-outline" size={24} color="#1D61F2" />
                  </View>
                  <View>
                    <Text style={[styles.supplierName, { color: theme.text }]}>{supplier.name}</Text>
                    <Text style={[styles.supplierCategory, { color: theme.textMuted }]}>{supplier.category}</Text>
                  </View>
                </View>

                <Ionicons 
                  name={supplier.isExpanded ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={theme.textMuted} 
                />
              </TouchableOpacity>

              {/* Expanded Batches Section */}
              {supplier.isExpanded && (
                <View style={[styles.batchesContainer, { borderTopColor: theme.border }]}>
                  <Text style={[styles.batchesTitle, { color: theme.textMuted }]}>RECENT BATCHES</Text>
                  
                  {supplier.batches.map((batch, index) => (
                    <View key={index} style={[styles.batchItem, { backgroundColor: theme.subCardBg, borderColor: theme.border }]}>
                      <View style={styles.batchLeft}>
                        <View style={styles.batchIconWrapper}>
                          <Ionicons 
                            name={batch.status === 'Paid' ? "checkmark-circle-outline" : "cube-outline"} 
                            size={20} 
                            color={batch.status === 'Paid' ? '#059669' : '#64748B'} 
                          />
                        </View>
                        <View>
                          <Text style={[styles.batchId, { color: theme.text }]}>#{batch.id}</Text>
                          <Text style={[styles.batchMeta, { color: theme.textMuted }]}>{batch.date}</Text>
                        </View>
                      </View>

                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[styles.batchAmount, { color: theme.text }]}>ETB {batch.amount}</Text>
                        <View style={[
                          styles.statusPill, 
                          batch.status === 'Paid' ? styles.statusPaid : styles.statusUnpaid
                        ]}>
                          <Text style={[
                            styles.statusPillText, 
                            batch.status === 'Paid' ? { color: '#059669' } : { color: '#DC2626' }
                          ]}>
                            {batch.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Adaptive Bottom Navigation */}
      <View style={isDarkMode ? [styles.darkBottomNav, { backgroundColor: theme.bg, borderTopColor: theme.border }] : styles.lightBottomNavContainer}>
        <View style={isDarkMode ? { flexDirection: 'row', width: '100%', justifyContent: 'space-around' } : styles.lightBottomNav}>
          {[
            { id: 'Home', icon: 'grid' },
            { id: 'Sales', icon: 'bar-chart' },
            { id: 'Stock', icon: 'cube' },
            { id: 'Suppliers', icon: 'people' },
            { id: 'Approvals', icon: 'checkmark-circle' },
          ].map((tab) => {
            const isActive = activeNav === tab.id;
            return (
              <TouchableOpacity 
                key={tab.id}
                style={isDarkMode ? styles.darkNavItem : (isActive ? styles.lightNavItemActive : styles.lightNavItem)}
                onPress={() => {
                  setActiveNav(tab.id);
                  if (tab.id === 'Home') router.replace('/(admin)/dashboard');
                  if (tab.id === 'Sales') router.replace('/(admin)/sales');
                  if (tab.id === 'Stock') router.replace('/(admin)/stock');
                  if (tab.id === 'Approvals') router.replace('/(admin)/approvals');
                }}
              >
                <Ionicons 
                  name={isActive ? tab.icon as any : `${tab.icon}-outline` as any} 
                  size={24} 
                  color={isDarkMode ? (isActive ? theme.text : theme.textMuted) : (isActive ? '#FFFFFF' : '#64748B')} 
                />
                <Text style={[
                  isDarkMode ? styles.darkNavText : styles.lightNavText, 
                  { color: isDarkMode ? (isActive ? theme.text : theme.textMuted) : (isActive ? '#FFFFFF' : '#64748B') },
                  isActive && { fontWeight: '700' }
                ]}>
                  {tab.id}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menuButton: { marginRight: 12 },
  logoTextContainer: { flexDirection: 'column' },
  logoText: { fontSize: 20, fontWeight: '900', lineHeight: 22, letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  
  scrollContentDark: { paddingBottom: 24 },
  scrollContentLight: { paddingBottom: 130 },
  
  titleContainer: { paddingHorizontal: 20, marginTop: 16, marginBottom: 20 },
  pageTitle: { fontSize: 32, fontWeight: '900', letterSpacing: -1, marginBottom: 8 },
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
  supplierMetaRow: { flexDirection: 'row', alignItems: 'center' },
  supplierIconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  supplierName: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  supplierCategory: { fontSize: 14, fontWeight: '500' },

  batchesContainer: { marginTop: 20, paddingTop: 16, borderTopWidth: 1 },
  batchesTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
  batchItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 16, borderWidth: 1, marginBottom: 10 },
  batchLeft: { flexDirection: 'row', alignItems: 'center' },
  batchIconWrapper: { marginRight: 12 },
  batchId: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  batchMeta: { fontSize: 12 },
  batchAmount: { fontSize: 15, fontWeight: '800', marginBottom: 4 },
  
  statusPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-end' },
  statusPaid: { backgroundColor: '#ECFDF5' },
  statusUnpaid: { backgroundColor: '#FEF2F2' },
  statusPillText: { fontSize: 11, fontWeight: '700' },

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
});