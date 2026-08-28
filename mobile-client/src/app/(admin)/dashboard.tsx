import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 260;
const CARD_SPACING = 16;

const TIME_FILTERS = ['Today', 'Yesterday', 'This Week', 'Total'];

const FINANCE_DATA = {
  'Today': [
    { id: '0', title: 'Total Net Balance', amount: 'ETB 12,400', icon: 'pie-chart-outline' as const },
    { id: '1', title: 'Total Revenue (Sales)', amount: 'ETB 18,500', icon: 'wallet-outline' as const },
    { id: '2', title: 'Total Debt (Suppliers)', amount: 'ETB 6,100', icon: 'receipt-outline' as const },
  ],
  'Yesterday': [
    { id: '0', title: 'Total Net Balance', amount: 'ETB 9,200', icon: 'pie-chart-outline' as const },
    { id: '1', title: 'Total Revenue (Sales)', amount: 'ETB 15,000', icon: 'wallet-outline' as const },
    { id: '2', title: 'Total Debt (Suppliers)', amount: 'ETB 5,800', icon: 'receipt-outline' as const },
  ],
  'This Week': [
    { id: '0', title: 'Total Net Balance', amount: 'ETB 45,800', icon: 'pie-chart-outline' as const },
    { id: '1', title: 'Total Revenue (Sales)', amount: 'ETB 82,300', icon: 'wallet-outline' as const },
    { id: '2', title: 'Total Debt (Suppliers)', amount: 'ETB 36,500', icon: 'receipt-outline' as const },
  ],
  'Total': [
    { id: '0', title: 'Total Net Balance', amount: 'ETB 125,300', icon: 'pie-chart-outline' as const },
    { id: '1', title: 'Total Revenue (Sales)', amount: 'ETB 240,500', icon: 'wallet-outline' as const },
    { id: '2', title: 'Total Debt (Suppliers)', amount: 'ETB 115,200', icon: 'receipt-outline' as const },
  ]
};

export default function AdminDashboard() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<keyof typeof FINANCE_DATA>('Total');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  
  const flatListRef = useRef<FlatList>(null);
  const currentCards = FINANCE_DATA[activeFilter];

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F1419',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : 'transparent',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
  };

  const handleCardPress = (index: number) => {
    setActiveCardIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
  };

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter as keyof typeof FINANCE_DATA);
    setIsDropdownOpen(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=Admin&background=0F1419&color=fff' }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? theme.text : '#1D61F2' }]}>ibnTaju DMS</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setIsDarkMode(!isDarkMode)}>
            <Ionicons name={isDarkMode ? "sunny-outline" : "moon-outline"} size={22} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        {/* Greeting & Dropdown Filter */}
        <View style={styles.greetingHeaderRow}>
          <View>
            <Text style={[styles.greetingTitle, { color: theme.text }]}>Hello, Admin</Text>
            <Text style={[styles.greetingSubtitle, { color: theme.textMuted }]}>Here's what's happening today.</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.dropdownTrigger, isDarkMode ? styles.dropdownTriggerDark : styles.dropdownTriggerLight]}
            onPress={() => setIsDropdownOpen(true)}
          >
            <Text style={[styles.dropdownTriggerText, { color: theme.text }]}>Filter: {activeFilter}</Text>
            <Ionicons name="chevron-down" size={16} color={theme.text} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        {/* Dropdown Modal */}
        <Modal visible={isDropdownOpen} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
            <View style={styles.modalOverlay}>
              <View style={[styles.dropdownMenu, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }]}>
                {TIME_FILTERS.map((filter) => (
                  <TouchableOpacity 
                    key={filter} 
                    style={[styles.dropdownItem, activeFilter === filter && { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' }]}
                    onPress={() => handleFilterSelect(filter)}
                  >
                    <Text style={{ color: activeFilter === filter ? (isDarkMode ? '#FFFFFF' : '#1D61F2') : theme.textMuted, fontWeight: activeFilter === filter ? '700' : '500' }}>
                      {filter}
                    </Text>
                    {activeFilter === filter && <Ionicons name="checkmark" size={16} color={isDarkMode ? '#FFFFFF' : '#1D61F2'} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Dynamic Snap-Centered Cards */}
        <View style={styles.cardsWrapper}>
          <FlatList
            ref={flatListRef}
            data={currentCards}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            decelerationRate="fast"
            getItemLayout={(_, index) => ({ length: CARD_WIDTH + CARD_SPACING, offset: (CARD_WIDTH + CARD_SPACING) * index, index })}
            renderItem={({ item, index }) => {
              const isActive = activeCardIndex === index;
              
              return (
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => handleCardPress(index)}
                  style={[
                    styles.financeCard,
                    { backgroundColor: isActive ? theme.invertedBg : (isDarkMode ? theme.bg : '#FFFFFF') },
                    isDarkMode && !isActive && { borderWidth: 1, borderColor: theme.border },
                    !isDarkMode && isActive && styles.lightModePrimaryShadow,
                    !isDarkMode && !isActive && styles.lightModeSecondaryShadow,
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <View style={[
                      !isDarkMode && isActive && styles.lightCardIconWrapperPrimary,
                      !isDarkMode && !isActive && styles.lightCardIconWrapperSecondary
                    ]}>
                      <Ionicons 
                        name={item.icon} 
                        size={24} 
                        color={isActive ? theme.invertedText : (isDarkMode ? theme.text : '#64748B')} 
                      />
                    </View>
                    {!isDarkMode && isActive && (
                      <View style={styles.lightActivePill}>
                        <Text style={styles.lightActivePillText}>Active</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={[styles.cardLabel, { color: isActive ? theme.invertedText : theme.textMuted }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.cardAmount, { color: isActive ? theme.invertedText : theme.text }]}>
                      {item.amount}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Management List */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Management</Text>
          
          {[
            { title: 'Inventory & Stock', sub: 'Manage warehouse levels', icon: 'cube-outline', lightBg: '#EBF2FF', lightColor: '#1D61F2' },
            { title: 'Sales Ledger', sub: 'Audit daily transactions', icon: 'bar-chart-outline', lightBg: '#E6F9F2', lightColor: '#059669' },
            { title: 'Supplier Directory', sub: 'Vendor credit and orders', icon: 'people-outline', lightBg: '#ECFDF5', lightColor: '#10B981' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={[styles.listItem, isDarkMode ? { borderBottomWidth: 1, borderBottomColor: theme.border } : styles.lightListItem]}>
              <View style={[styles.listIconWrapper, !isDarkMode && { backgroundColor: item.lightBg }]}>
                <Ionicons name={item.icon as any} size={22} color={isDarkMode ? theme.text : item.lightColor} />
              </View>
              <View style={styles.listTextContainer}>
                <Text style={[styles.listTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.listSubtitle, { color: theme.textMuted }]}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Pending Actions */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Pending Actions</Text>

          <View style={[styles.receiptCard, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightReceiptCard]}>
            <View style={styles.receiptHeader}>
              <View style={[styles.listIconWrapper, !isDarkMode && { backgroundColor: '#F8FAFC' }]}>
                <Ionicons name="document-text-outline" size={22} color={theme.textMuted} />
              </View>
              <View style={styles.receiptInfo}>
                <Text style={[styles.receiptTitle, { color: theme.text }]}>TX-8832 • Rep Abebe</Text>
                <Text style={[styles.receiptSubtitle, { color: theme.textMuted }]}>Submitted 10m ago</Text>
              </View>
              <Text style={[styles.receiptAmount, { color: theme.text }]}>ETB 15,000</Text>
            </View>
            
            <View style={styles.receiptActions}>
              <TouchableOpacity style={[styles.actionBtn, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="close" size={16} color={isDarkMode ? '#F4212E' : '#DC2626'} style={{ marginRight: 4 }}/>
                <Text style={[styles.rejectBtnText, isDarkMode ? { color: '#F4212E' } : { color: '#DC2626' }]}>Reject</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: isDarkMode ? theme.invertedBg : '#059669' }]}>
                <Ionicons name="checkmark" size={16} color={isDarkMode ? theme.invertedText : '#FFFFFF'} style={{ marginRight: 4 }}/>
                <Text style={[styles.approveBtnText, { color: isDarkMode ? theme.invertedText : '#FFFFFF' }]}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Adaptive Bottom Navigation */}
      <View style={isDarkMode ? [styles.darkBottomNav, { backgroundColor: theme.bg, borderTopColor: theme.border }] : styles.lightBottomNavContainer}>
        <View style={isDarkMode ? { flexDirection: 'row', width: '100%', justifyContent: 'space-around' } : styles.lightBottomNav}>
          {[
            { id: 'Home', icon: 'home' },
            { id: 'Sales', icon: 'cash' },
            { id: 'Stock', icon: 'cube' },
            { id: 'Suppliers', icon: 'people' },
            { id: 'Approvals', icon: 'checkmark-circle' },
          ].map((tab) => {
            const isActive = activeNav === tab.id;
            return (
              <TouchableOpacity 
                key={tab.id}
                style={isDarkMode ? styles.darkNavItem : (isActive ? styles.lightNavItemActive : styles.lightNavItem)}
                onPress={() => setActiveNav(tab.id)}
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
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  iconButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  
  scrollContentDark: { paddingBottom: 24 },
  scrollContentLight: { paddingBottom: 120 }, // Extra padding for floating nav
  
  greetingHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginTop: 12, marginBottom: 4,
  },
  greetingTitle: { fontSize: 24, fontWeight: '700' },
  greetingSubtitle: { fontSize: 15, marginTop: 4 },
  
  dropdownTrigger: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12,
  },
  dropdownTriggerDark: { borderWidth: 1, borderColor: '#2F3336' },
  dropdownTriggerLight: { backgroundColor: '#FFFFFF', shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  dropdownTriggerText: { fontSize: 13, fontWeight: '600' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' },
  dropdownMenu: {
    position: 'absolute', top: 140, right: 20, width: 140, borderRadius: 12, padding: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8,
  },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8 },
  
  cardsWrapper: { paddingVertical: 24 },
  flatListContent: { paddingHorizontal: 20 },
  financeCard: {
    width: CARD_WIDTH, borderRadius: 20, padding: 20, marginRight: CARD_SPACING,
    height: 150, justifyContent: 'space-between',
  },
  lightModePrimaryShadow: { shadowColor: '#177CA5', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8 },
  lightModeSecondaryShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lightCardIconWrapperPrimary: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  lightCardIconWrapperSecondary: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  lightActivePill: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  lightActivePillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  
  cardBody: { marginTop: 'auto' },
  cardLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardAmount: { fontSize: 28, fontWeight: '800', letterSpacing: -1 },
  
  sectionContainer: { paddingHorizontal: 20, marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16, letterSpacing: -0.5 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  lightListItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  listIconWrapper: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTextContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  listSubtitle: { fontSize: 14 },
  
  receiptCard: { borderRadius: 16, padding: 16 },
  lightReceiptCard: { backgroundColor: '#FFFFFF', shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  receiptHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  receiptInfo: { flex: 1 },
  receiptTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  receiptSubtitle: { fontSize: 13 },
  receiptAmount: { fontSize: 16, fontWeight: '800' },
  
  receiptActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  actionBtn: { flex: 1, flexDirection: 'row', paddingVertical: 12, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  rejectBtnText: { fontWeight: '700', fontSize: 15 },
  approveBtnText: { fontWeight: '700', fontSize: 15 },
  
  darkBottomNav: { borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: 24, paddingTop: 12, flexDirection: 'row', alignItems: 'center' },
  darkNavItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  darkNavText: { fontSize: 10, fontWeight: '500', marginTop: 4 },
  
  lightBottomNavContainer: { position: 'absolute', bottom: 24, left: 20, right: 20 },
  lightBottomNav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 8, justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 15 },
  lightNavItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 8 },
  lightNavItemActive: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#1D61F2', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 100 },
  lightNavText: { fontSize: 10, fontWeight: '600', marginTop: 4 },
});