import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'expo-router';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
  StatusBar, FlatList, Dimensions, Modal, TouchableWithoutFeedback,
  ViewToken, Platform, Image, RefreshControl, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
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

// CRITICAL FIX: Wired to your .env file
const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'http://10.54.178.101:5000';

export default function AdminDashboard() {
  const router = useRouter();
  
  // Auth & Theme State
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);
  const logout = useAuthStore((state) => state.logout);
  
  const userName = useAuthStore((state: any) => state.userName || state.user?.fullName || 'Admin');
  const rawProfilePic = useAuthStore((state: any) => state.profilePic || state.user?.profilePic);

  // CRITICAL FIX: Clean the URI and enforce the correct IP address
  const getAvatarUri = (uri: string | null | undefined) => {
    if (!uri) return null;
    if (uri.startsWith('http') || uri.startsWith('file://') || uri.startsWith('data:')) {
      // Strip out localhost or old hardcoded IPs just in case they are cached in Zustand
      let cleanUri = uri.replace('http://localhost:5000', BASE_IP);
      cleanUri = cleanUri.replace('http://172.30.75.101:5000', BASE_IP);
      return cleanUri;
    }
    return uri.startsWith('/') ? `${BASE_IP}${uri}` : `${BASE_IP}/${uri}`;
  };

  const avatarUri = getAvatarUri(rawProfilePic);

  // UI State
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

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F1419',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : 'transparent',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    dotActive: isDarkMode ? '#FFFFFF' : '#177CA5',
    dotInactive: isDarkMode ? '#2F3336' : '#CBD5E1',
    menuBg: isDarkMode ? '#1E293B' : '#FFFFFF',
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
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          style: "destructive", 
          onPress: () => {
            setIsProfileMenuVisible(false);
            logout();
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setIsProfileMenuVisible(true)}>
          {avatarUri ? (
            <Image 
              source={{ uri: avatarUri }} 
              style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: isDarkMode ? '#2F3336' : '#E2E8F0' }} 
            />
          ) : (
            <Ionicons name="person-circle" size={32} color={theme.textMuted} />
          )}
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigateFromProfile('/(admin)/message')}>
            <Ionicons name="notifications-outline" size={22} color={theme.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { marginLeft: 8 }]} onPress={toggleTheme}>
            <Ionicons name={isDarkMode ? "sunny-outline" : "moon-outline"} size={22} color={theme.text} />
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
            style={[styles.dropdownTrigger, isDarkMode ? styles.dropdownTriggerDark : styles.dropdownTriggerLight]}
            onPress={() => setIsDropdownOpen(true)}
          >
            <Text style={[styles.dropdownTriggerText, { color: theme.text }]}>Filter: {activeFilter}</Text>
            <Ionicons name="chevron-down" size={16} color={theme.text} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

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

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Core Modules</Text>
          
          {CORE_MODULES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.listItem, isDarkMode ? { borderBottomWidth: 1, borderBottomColor: theme.border } : styles.lightListItem]}
              onPress={() => router.replace(item.route as any)}
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
      </ScrollView>

      {/* Left Side Drawer */}
      <Modal visible={isProfileMenuVisible} animationType="fade" transparent>
        <View style={styles.drawerOverlay}>
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            activeOpacity={1} 
            onPress={() => setIsProfileMenuVisible(false)}
          />
          <View style={[styles.sideDrawer, { backgroundColor: theme.menuBg, borderColor: theme.border, borderRightWidth: isDarkMode ? 1 : 0 }]}>
            <SafeAreaView style={styles.drawerSafeArea}>
              <View style={styles.drawerContent}>
                
                <View style={styles.drawerHeader}>
                  <View style={[styles.largeAvatarPlaceholder, isDarkMode && { backgroundColor: '#0F1419' }]}>
                    {avatarUri ? (
                      <Image 
                        source={{ uri: avatarUri }} 
                        style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: isDarkMode ? '#2F3336' : '#E2E8F0' }} 
                      />
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
                    <Ionicons name="person-outline" size={26} color={theme.text} style={styles.drawerMenuIcon} />
                    <Text style={[styles.drawerMenuText, { color: theme.text }]}>Profile & Security</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.drawerMenuItem} onPress={() => navigateFromProfile('/(admin)/note')}>
                    <Ionicons name="journal-outline" size={26} color={theme.text} style={styles.drawerMenuIcon} />
                    <Text style={[styles.drawerMenuText, { color: theme.text }]}>Admin Notes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.drawerMenuItem} onPress={() => navigateFromProfile('/(admin)/message')}>
                    <Ionicons name="mail-outline" size={26} color={theme.text} style={styles.drawerMenuIcon} />
                    <Text style={[styles.drawerMenuText, { color: theme.text }]}>Messages</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }} />
                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <TouchableOpacity 
                  style={styles.logoutBtn} 
                  onPress={handleSignOut}
                >
                  <Ionicons name="log-out-outline" size={26} color="#DC2626" style={styles.drawerMenuIcon} />
                  <Text style={[styles.drawerMenuText, { color: '#DC2626' }]}>Sign Out</Text>
                </TouchableOpacity>

              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>

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
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  
  scrollContentDark: { paddingBottom: 100 },
  scrollContentLight: { paddingBottom: 100 },
  
  greetingHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginTop: 16, marginBottom: 12,
  },
  greetingTextContainer: { flex: 1, paddingRight: 12 },
  greetingTitle: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 15, marginTop: 4 },
  
  dropdownTrigger: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  dropdownTriggerDark: { borderWidth: 1, borderColor: '#2F3336' },
  dropdownTriggerLight: { backgroundColor: '#FFFFFF', shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  dropdownTriggerText: { fontSize: 13, fontWeight: '700' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' },
  dropdownMenu: { position: 'absolute', top: 140, right: 20, width: 140, borderRadius: 12, padding: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8 },
  
  cardsWrapper: { paddingVertical: 16 },
  flatListContent: { paddingHorizontal: 20 },
  financeCard: { width: CARD_WIDTH, borderRadius: 24, padding: 24, marginRight: CARD_SPACING, height: 180, justifyContent: 'space-between' },
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

  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row' },
  sideDrawer: { width: SCREEN_WIDTH * 0.75, height: '100%', borderTopRightRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 2, height: 0 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5 },
  drawerSafeArea: { flex: 1 },
  drawerContent: { flex: 1, padding: 24, paddingTop: Platform.OS === 'android' ? 24 : 12 },
  
  drawerHeader: { flexDirection: 'column', alignItems: 'flex-start', marginBottom: 16 },
  largeAvatarPlaceholder: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginBottom: 12, overflow: 'hidden' },
  drawerUserInfo: { justifyContent: 'center' },
  drawerName: { fontSize: 20, fontWeight: '800', marginBottom: 2 },
  drawerRole: { fontSize: 14, fontWeight: '500' },

  drawerMenuList: { marginTop: 12 },
  drawerMenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  drawerMenuIcon: { marginRight: 20 },
  drawerMenuText: { fontSize: 18, fontWeight: '700', flex: 1 },

  divider: { height: 1, marginVertical: 8 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingBottom: Platform.OS === 'ios' ? 0 : 16 },
});