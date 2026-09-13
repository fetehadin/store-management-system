import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'expo-router';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, FlatList, Dimensions, Modal, TouchableWithoutFeedback,
  ViewToken, Platform, Image, RefreshControl, Alert, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../api/client';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;
const CARD_SPACING = 16;

const TIME_FILTERS = ['Today', 'Yesterday', 'This Week', 'Total'];

const CORE_MODULES = [
  { id: 'Stock', title: 'Inventory & Stock', sub: 'Monitor warehouse capacities', icon: 'cube-outline', lightBg: '#EBF2FF', lightColor: '#1D61F2', route: '/(admin)/stock' },
  { id: 'Sales', title: 'Sales Ledger', sub: 'Audit field transactions', icon: 'bar-chart-outline', lightBg: '#E6F9F2', lightColor: '#059669', route: '/(admin)/sales' },
  { id: 'Suppliers', title: 'Supplier Directory', sub: 'Manage vendors and credit', icon: 'people-outline', lightBg: '#ECFDF5', lightColor: '#10B981', route: '/(admin)/suppliers' },
];

const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'https://tajstore-backend.onrender.com';

export default function AdminDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);
  const logout = useAuthStore((state) => state.logout);
  
  const userName = useAuthStore((state: any) => state.userName || state.user?.fullName || 'Admin');
  const rawProfilePic = useAuthStore((state: any) => state.profilePic || state.user?.profilePic);

  const getAvatarUri = (uri: string | null | undefined) => {
    if (!uri) return null;
    if (uri.startsWith('http') || uri.startsWith('file://') || uri.startsWith('data:')) {
      let cleanUri = uri.replace('http://localhost:5000', BASE_IP);
      cleanUri = cleanUri.replace('http://172.30.75.101:5000', BASE_IP);
      return cleanUri;
    }
    return uri.startsWith('/') ? `${BASE_IP}${uri}` : `${BASE_IP}/${uri}`;
  };

  const avatarUri = getAvatarUri(rawProfilePic);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('Total');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const { data: stats, refetch } = useQuery({
    queryKey: ['admin-finance-summary', activeFilter],
    queryFn: async () => {
      const response = await apiClient.get('/analytics/summary', { params: { period: activeFilter } });
      return response.data?.data;
    },
    placeholderData: { netBalance: 0, totalRevenue: 0, totalDebt: 0 }
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const currentCards = [
    { id: '0', title: 'Total Net Balance', amount: `ETB ${Number(stats?.netBalance || 0).toLocaleString()}`, icon: 'pie-chart-outline' as const },
    { id: '1', title: 'Total Revenue (Sales)', amount: `ETB ${Number(stats?.totalRevenue || 0).toLocaleString()}`, icon: 'wallet-outline' as const },
    { id: '2', title: 'Total Debt (Suppliers)', amount: `ETB ${Number(stats?.totalDebt || 0).toLocaleString()}`, icon: 'receipt-outline' as const },
  ];

  // UPGRADED THEME: Classic Dark Slate Palette
  const theme = {
    bg: isDarkMode ? '#020617' : '#F8FAFC', // Deep rich slate background
    cardBg: isDarkMode ? '#0F172A' : '#FFFFFF', // Elevated slate card
    cardActive: isDarkMode ? '#1E293B' : '#177CA5', // Highlighted active card
    text: isDarkMode ? '#F8FAFC' : '#0F1419', // Soft white
    textMuted: isDarkMode ? '#94A3B8' : '#64748B', // Elegant muted grey
    border: isDarkMode ? '#1E293B' : '#E2E8F0', // Subtle borders
    iconBg: isDarkMode ? '#1E293B' : '#EBF2FF', // Icon wrappers
    dotActive: isDarkMode ? '#F8FAFC' : '#177CA5',
    dotInactive: isDarkMode ? '#334155' : '#CBD5E1',
    menuBg: isDarkMode ? '#0F172A' : '#FFFFFF',
    invertedText: '#FFFFFF', // Used for light mode active card text
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveCardIndex(viewableItems[0].index);
    }
  }).current;
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter);
    setIsDropdownOpen(false);
    setActiveCardIndex(0);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const navigateFromProfile = (route: string) => {
    setIsProfileMenuVisible(false);
    router.push(route as any); 
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out of your account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => { setIsProfileMenuVisible(false); logout(); router.replace('/'); } }
    ]);
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.bg, paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setIsProfileMenuVisible(true)}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: theme.iconBg }} />
          ) : (
            <Ionicons name="person-circle" size={34} color={theme.textMuted} />
          )}
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigateFromProfile('/(admin)/message')}>
            <Ionicons name="notifications-outline" size={24} color={theme.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]} onPress={toggleTheme}>
            <Ionicons name={isDarkMode ? "sunny-outline" : "moon-outline"} size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.text} />}
      >       
        <View style={styles.greetingHeaderRow}>
          <View style={styles.greetingTextContainer}>
            <Text style={[styles.greetingTitle, { color: theme.text }]}>Hello, {userName.split(' ')[0]}</Text>
            <Text style={[styles.greetingSubtitle, { color: theme.textMuted }]}>Your operational summary.</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.dropdownTrigger, isDarkMode ? { backgroundColor: theme.cardBg, borderWidth: 1, borderColor: theme.border } : styles.dropdownTriggerLight]}
            onPress={() => setIsDropdownOpen(true)}
          >
            <Text style={[styles.dropdownTriggerText, { color: theme.text }]}>Filter: {activeFilter}</Text>
            <Ionicons name="chevron-down" size={14} color={theme.text} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* Dropdown Modal */}
        <Modal visible={isDropdownOpen} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
            <View style={styles.modalOverlay}>
              <View style={[styles.dropdownMenu, { backgroundColor: theme.menuBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
                {TIME_FILTERS.map((filter) => (
                  <TouchableOpacity 
                    key={filter} 
                    style={[styles.dropdownItem, activeFilter === filter && { backgroundColor: isDarkMode ? theme.iconBg : '#F1F5F9' }]}
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

        {/* Finance Cards */}
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
                    { backgroundColor: isActive ? theme.cardActive : theme.cardBg },
                    isDarkMode && { borderWidth: 1, borderColor: isActive ? '#334155' : theme.border },
                    !isDarkMode && isActive && styles.lightModePrimaryShadow,
                    !isDarkMode && !isActive && styles.lightModeSecondaryShadow,
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <View style={[
                      !isDarkMode && isActive && styles.lightCardIconWrapperPrimary,
                      !isDarkMode && !isActive && styles.lightCardIconWrapperSecondary,
                      isDarkMode && { padding: 10, borderRadius: 14, backgroundColor: isActive ? '#334155' : theme.iconBg }
                    ]}>
                      <Ionicons name={item.icon} size={24} color={isActive ? (isDarkMode ? '#FFFFFF' : theme.invertedText) : (isDarkMode ? '#94A3B8' : '#64748B')} />
                    </View>
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={[styles.cardLabel, { color: isActive ? (isDarkMode ? '#94A3B8' : theme.invertedText) : theme.textMuted }]}>{item.title}</Text>
                    <Text style={[styles.cardAmount, { color: isActive ? (isDarkMode ? '#F8FAFC' : theme.invertedText) : theme.text }]}>{item.amount}</Text>
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

        {/* Core Modules - Unified Block Design */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text, paddingHorizontal: isDarkMode ? 4 : 0 }]}>Core Modules</Text>
          
          <View style={[isDarkMode && { backgroundColor: theme.cardBg, borderRadius: 24, paddingVertical: 8, borderWidth: 1, borderColor: theme.border }]}>
            {CORE_MODULES.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.listItem, 
                  isDarkMode ? { paddingHorizontal: 20 } : styles.lightListItem,
                  isDarkMode && index !== CORE_MODULES.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border }
                ]}
                onPress={() => router.replace(item.route as any)}
              >
                <View style={[styles.listIconWrapper, isDarkMode ? { backgroundColor: theme.iconBg } : { backgroundColor: item.lightBg }]}>
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
        </View>
      </ScrollView>

      {/* Left Side Drawer - Updated for Classic Dark Mode */}
      <Modal visible={isProfileMenuVisible} animationType="fade" transparent>
        <View style={styles.drawerOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setIsProfileMenuVisible(false)} />
          <View style={[styles.sideDrawer, { backgroundColor: theme.menuBg, borderColor: theme.border, borderRightWidth: isDarkMode ? 1 : 0 }]}>
            <SafeAreaView style={styles.drawerSafeArea}>
              <View style={styles.drawerContent}>
                
                <View style={styles.drawerHeaderProfile}>
                  <View style={[styles.largeAvatarPlaceholder, isDarkMode && { backgroundColor: theme.iconBg }]}>
                    {avatarUri ? (
                      <Image source={{ uri: avatarUri }} style={{ width: 64, height: 64, borderRadius: 32 }} />
                    ) : (
                      <Ionicons name="person" size={32} color={theme.textMuted} />
                    )}
                  </View>
                  <View style={styles.drawerUserInfo}>
                    <Text style={[styles.drawerName, { color: theme.text }]} numberOfLines={1}>{userName}</Text>
                    <Text style={[styles.drawerRole, { color: theme.textMuted }]}>System Administrator</Text>
                  </View>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <View style={styles.drawerMenuList}>
                  <TouchableOpacity style={styles.drawerMenuItem} onPress={() => navigateFromProfile('/(admin)/profile')}>
                    <Ionicons name="person-outline" size={24} color={theme.text} style={styles.drawerMenuIcon} />
                    <Text style={[styles.drawerMenuText, { color: theme.text }]}>Profile & Security</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerMenuItem} onPress={() => navigateFromProfile('/(admin)/note')}>
                    <Ionicons name="journal-outline" size={24} color={theme.text} style={styles.drawerMenuIcon} />
                    <Text style={[styles.drawerMenuText, { color: theme.text }]}>Admin Notes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerMenuItem} onPress={() => navigateFromProfile('/(admin)/message')}>
                    <Ionicons name="mail-outline" size={24} color={theme.text} style={styles.drawerMenuIcon} />
                    <Text style={[styles.drawerMenuText, { color: theme.text }]}>Messages</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }} />
                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
                  <Ionicons name="log-out-outline" size={24} color="#DC2626" style={styles.drawerMenuIcon} />
                  <Text style={[styles.drawerMenuText, { color: '#DC2626' }]}>Sign Out</Text>
                </TouchableOpacity>

              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  iconButton: { padding: 4 },
  notificationBadge: { position: 'absolute', top: 6, right: 6, width: 9, height: 9, borderRadius: 4.5, backgroundColor: '#DC2626', borderWidth: 1.5, borderColor: '#FFFFFF' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  
  scrollContentDark: { paddingBottom: 100 },
  scrollContentLight: { paddingBottom: 100 },
  
  greetingHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 16, marginBottom: 16 },
  greetingTextContainer: { flex: 1, paddingRight: 12 },
  greetingTitle: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 15, marginTop: 4 },
  
  dropdownTrigger: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  dropdownTriggerLight: { backgroundColor: '#FFFFFF', shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  dropdownTriggerText: { fontSize: 13, fontWeight: '700' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  dropdownMenu: { position: 'absolute', top: 140, right: 20, width: 140, borderRadius: 16, padding: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 10 },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 10 },
  
  cardsWrapper: { paddingVertical: 16 },
  flatListContent: { paddingHorizontal: 20 },
  financeCard: { width: CARD_WIDTH, borderRadius: 28, padding: 24, marginRight: CARD_SPACING, height: 185, justifyContent: 'space-between' },
  lightModePrimaryShadow: { shadowColor: '#177CA5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 10 },
  lightModeSecondaryShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  lightCardIconWrapperPrimary: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  lightCardIconWrapperSecondary: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  
  cardBody: { marginTop: 'auto' },
  cardLabel: { fontSize: 12, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1.2 },
  cardAmount: { fontSize: 36, fontWeight: '900', letterSpacing: -1 },
  
  paginationContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 4 },
  dotActiveWide: { width: 20 },

  sectionContainer: { paddingHorizontal: 20, marginBottom: 32, marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16, letterSpacing: -0.5 },
  
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18 },
  lightListItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 20, marginBottom: 12, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  listIconWrapper: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTextContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  listSubtitle: { fontSize: 13 },

  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row' },
  sideDrawer: { width: SCREEN_WIDTH * 0.75, height: '100%', borderTopRightRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 4, height: 0 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 15 },
  drawerSafeArea: { flex: 1 },
  drawerContent: { flex: 1, padding: 24, paddingTop: Platform.OS === 'android' ? 24 : 12 },
  
  drawerHeaderProfile: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 20 },
  largeAvatarPlaceholder: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden' },
  drawerUserInfo: { justifyContent: 'center' },
  drawerName: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  drawerRole: { fontSize: 14, fontWeight: '500' },

  drawerMenuList: { marginTop: 16 },
  drawerMenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  drawerMenuIcon: { marginRight: 18 },
  drawerMenuText: { fontSize: 17, fontWeight: '600', flex: 1 },

  divider: { height: 1, marginVertical: 8 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingBottom: Platform.OS === 'ios' ? 0 : 16 },
});