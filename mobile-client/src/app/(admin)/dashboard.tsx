import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ViewToken,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;
const CARD_SPACING = 16;

const TIME_FILTERS = ['Today', 'Yesterday', 'This Week', 'Total'];

// Demo Data (To be replaced with API hooks)
const FINANCE_DATA = {
  'Today': [
    { id: '0', title: 'Total Net Balance', amount: 'ETB 12,400', icon: 'pie-chart-outline' as const },
    { id: '1', title: 'Total Revenue (Sales)', amount: 'ETB 18,500', icon: 'wallet-outline' as const },
    { id: '2', title: 'Total Debt (Suppliers)', amount: 'ETB 6,100', icon: 'receipt-outline' as const },
  ],
  'Total': [
    { id: '0', title: 'Total Net Balance', amount: 'ETB 125,300', icon: 'pie-chart-outline' as const },
    { id: '1', title: 'Total Revenue (Sales)', amount: 'ETB 240,500', icon: 'wallet-outline' as const },
    { id: '2', title: 'Total Debt (Suppliers)', amount: 'ETB 115,200', icon: 'receipt-outline' as const },
  ]
};

const CORE_MODULES = [
  { id: 'Stock', title: 'Inventory & Stock', sub: 'Monitor warehouse capacities', icon: 'cube-outline', lightBg: '#EBF2FF', lightColor: '#1D61F2', route: '/(admin)/stock' },
  { id: 'Sales', title: 'Sales Ledger', sub: 'Audit field transactions', icon: 'bar-chart-outline', lightBg: '#E6F9F2', lightColor: '#059669', route: '/(admin)/sales' },
  { id: 'Suppliers', title: 'Supplier Directory', sub: 'Manage vendors and credit', icon: 'people-outline', lightBg: '#ECFDF5', lightColor: '#10B981', route: '/(admin)/suppliers' },
];

export default function AdminDashboard() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<keyof typeof FINANCE_DATA>('Total');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  const router = useRouter();
  
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);
  const userName = useAuthStore((state) => (state as any).userName || 'Admin');
  
  const flatListRef = useRef<FlatList>(null);
  const currentCards = FINANCE_DATA[activeFilter] || FINANCE_DATA['Total'];

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F1419',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : 'transparent',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    dotActive: isDarkMode ? '#FFFFFF' : '#177CA5',
    dotInactive: isDarkMode ? '#2F3336' : '#CBD5E1',
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveCardIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter as keyof typeof FINANCE_DATA);
    setIsDropdownOpen(false);
    setActiveCardIndex(0);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle" size={32} color={theme.textMuted} />
        </TouchableOpacity>
        {/* <Text style={[styles.headerTitle, { color: isDarkMode ? theme.text : '#1D61F2' }]}>ibnTaju's Store</Text> */}
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Open Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={theme.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { marginLeft: 8 }]} onPress={toggleTheme}>
            <Ionicons name={isDarkMode ? "sunny-outline" : "moon-outline"} size={22} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        {/* Greeting & Dropdown Filter (Aligned) */}
        <View style={styles.greetingHeaderRow}>
          <View style={styles.greetingTextContainer}>
            <Text style={[styles.greetingTitle, { color: theme.text }]}>Hello, {userName}</Text>
            <Text style={[styles.greetingSubtitle, { color: theme.textMuted }]}>Your operational summary.</Text>
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

        {/* Full-Width Sliding Carousel */}
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
            snapToAlignment="start"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            getItemLayout={(_, index) => ({ length: CARD_WIDTH + CARD_SPACING, offset: (CARD_WIDTH + CARD_SPACING) * index, index })}
            renderItem={({ item, index }) => {
              const isActive = activeCardIndex === index;
              
              return (
                <View 
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
                      !isDarkMode && !isActive && styles.lightCardIconWrapperSecondary,
                      isDarkMode && { padding: 8, borderRadius: 10, backgroundColor: isActive ? 'rgba(0,0,0,0.1)' : '#1E293B' }
                    ]}>
                      <Ionicons name={item.icon} size={28} color={isActive ? theme.invertedText : (isDarkMode ? theme.text : '#64748B')} />
                    </View>
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={[styles.cardLabel, { color: isActive ? theme.invertedText : theme.textMuted }]}>{item.title}</Text>
                    <Text style={[styles.cardAmount, { color: isActive ? theme.invertedText : theme.text }]}>{item.amount}</Text>
                  </View>
                </View>
              );
            }}
          />
          
          <View style={styles.paginationContainer}>
            {currentCards.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.dot, 
                  { backgroundColor: activeCardIndex === index ? theme.dotActive : theme.dotInactive },
                  activeCardIndex === index && styles.dotActiveWide
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Management Directory */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Core Modules</Text>
          
          {CORE_MODULES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.listItem, isDarkMode ? { borderBottomWidth: 1, borderBottomColor: theme.border } : styles.lightListItem]}
              onPress={() => {
                setActiveNav(item.id);
                router.replace(item.route as any);
              }}
            >
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

        {/* Action Items
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Action Items</Text>

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
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  iconButton: { padding: 4, position: 'relative' },
  notificationBadge: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: '#DC2626', borderWidth: 1, borderColor: '#FFFFFF' },
  headerTitle: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  
  scrollContentDark: { paddingBottom: 24 },
  scrollContentLight: { paddingBottom: 120 },
  
  greetingHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', // Fixed Alignment
    paddingHorizontal: 20, marginTop: 16, marginBottom: 12,
  },
  greetingTextContainer: { flex: 1, paddingRight: 12 },
  greetingTitle: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 15, marginTop: 4 },
  
  dropdownTrigger: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12,
  },
  dropdownTriggerDark: { borderWidth: 1, borderColor: '#2F3336' },
  dropdownTriggerLight: { backgroundColor: '#FFFFFF', shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  dropdownTriggerText: { fontSize: 13, fontWeight: '700' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' },
  dropdownMenu: {
    position: 'absolute', top: 140, right: 20, width: 140, borderRadius: 12, padding: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8,
  },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8 },
  
  cardsWrapper: { paddingVertical: 16 },
  flatListContent: { paddingHorizontal: 20 },
  financeCard: {
    width: CARD_WIDTH, borderRadius: 24, padding: 24, marginRight: CARD_SPACING,
    height: 180, justifyContent: 'space-between',
  },
  lightModePrimaryShadow: { shadowColor: '#177CA5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 10 },
  lightModeSecondaryShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  lightCardIconWrapperPrimary: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  lightCardIconWrapperSecondary: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  
  cardBody: { marginTop: 'auto' },
  cardLabel: { fontSize: 13, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 },
  cardAmount: { fontSize: 36, fontWeight: '900', letterSpacing: -1.5 },
  
  paginationContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 4 },
  dotActiveWide: { width: 18 },

  sectionContainer: { paddingHorizontal: 20, marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16, letterSpacing: -0.5 },
  
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  lightListItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  listIconWrapper: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTextContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  listSubtitle: { fontSize: 14 },
  
});