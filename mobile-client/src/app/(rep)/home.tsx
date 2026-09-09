import React, { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Image,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';

const TIME_FILTERS = ['Today', 'Yesterday', 'This Week', 'Total'];

const REP_MODULES = [
  { id: 'Stock', title: 'Stock & Checkout', sub: 'Manage field inventory', icon: 'cube-outline', lightBg: '#EBF2FF', lightColor: '#1D61F2', route: '/(rep)/stock' },
  { id: 'Ledger', title: 'My Ledger', sub: 'View transaction history', icon: 'wallet-outline', lightBg: '#E6F9F2', lightColor: '#059669', route: '/(rep)/ledger' },
  { id: 'Notes', title: 'My Notes', sub: 'Daily field diary', icon: 'journal-outline', lightBg: '#FEF2F2', lightColor: '#DC2626', route: '/(rep)/note' },
];

// Wired to your .env file with your specific local network IP fallback
const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'http://10.54.178.101:5000';

export default function RepDashboard() {
  const router = useRouter();
  
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);
  
  // Safely check both root state and nested user object for username and profile pic
  const userName = useAuthStore((state: any) => state.userName || state.user?.fullName || 'Sales Rep');
  const rawProfilePic = useAuthStore((state: any) => state.profilePic || state.user?.profilePic);
  
  // Bulletproof URI parser to prevent broken paths or double-ip stacking
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
  
  // Zustand store values (acts as initial cache)
  const creditBalance = useAuthStore((state) => state.creditBalance) || 0;
  const creditLimit = useAuthStore((state) => state.creditLimit) || 0;
  
  const [activeFilter, setActiveFilter] = useState('Today');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // 1. LIVE DATA SYNC: Fetch the latest financial profile from the backend
  const { refetch } = useQuery({
    queryKey: ['rep-profile-financials'],
    queryFn: async () => {
      const response = await apiClient.get('/auth/me'); 
      const user = response.data.data;
      
      // Update the global store so the rest of the app instantly knows the new debt
      useAuthStore.setState({
        creditBalance: Number(user.creditBalance),
        creditLimit: Number(user.creditLimit)
      });
      
      return user;
    },
    enabled: true, 
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Dynamic Debt Calculation
  const debtPercentage = creditLimit > 0 
    ? Math.min((creditBalance / creditLimit) * 100, 100) 
    : 0;

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F1419',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : 'transparent',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Global Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(rep)/profile')}>
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
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(rep)/message')}>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.text} />
        }
      >
        
        {/* Greeting & Dropdown Filter */}
        <View style={styles.greetingHeaderRow}>
          <View style={styles.greetingTextContainer}>
            <Text style={[styles.greetingTitle, { color: theme.text }]}>Hello, {userName.split(' ')[0]}</Text>
            <Text style={[styles.greetingSubtitle, { color: theme.textMuted }]}>Field Operations Dashboard</Text>
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
                    onPress={() => { setActiveFilter(filter); setIsDropdownOpen(false); }}
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

        {/* Hero Debt Card */}
        <View style={styles.cardsWrapper}>
          <View style={[styles.financeCard, { backgroundColor: theme.invertedBg }, !isDarkMode && styles.lightModePrimaryShadow]}>
            <View style={styles.cardHeader}>
              <View style={[styles.lightCardIconWrapperPrimary, isDarkMode && { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                <Ionicons name="wallet" size={28} color={theme.invertedText} />
              </View>
            </View>
            
            <View style={styles.cardBody}>
              <Text style={[styles.cardLabel, { color: theme.invertedText }]}>ACTIVE DEBT BALANCE</Text>
              <Text style={[styles.cardAmount, { color: theme.invertedText }]}>ETB {creditBalance.toLocaleString()}</Text>
              
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${debtPercentage}%`, backgroundColor: debtPercentage > 85 ? '#DC2626' : (isDarkMode ? '#000' : '#FFFFFF') }]} />
              </View>
              <Text style={[styles.limitText, { color: theme.invertedText }]}>Credit Limit: ETB {creditLimit.toLocaleString()}</Text>
            </View>

          </View>
        </View>

        {/* Core Modules Directory */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Core Modules</Text>
          
          {REP_MODULES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.listItem, isDarkMode ? { borderBottomWidth: 1, borderBottomColor: theme.border } : styles.lightListItem]}
              onPress={() => router.push(item.route as any)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 },
  iconButton: { padding: 4, position: 'relative' },
  notificationBadge: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: '#DC2626', borderWidth: 1, borderColor: '#FFFFFF' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  
  scrollContentDark: { paddingBottom: 100 },
  scrollContentLight: { paddingBottom: 100 },
  
  greetingHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 12 },
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
  
  cardsWrapper: { paddingHorizontal: 20, paddingVertical: 12 },
  financeCard: { borderRadius: 24, padding: 24 },
  lightModePrimaryShadow: { shadowColor: '#177CA5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 10 },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  lightCardIconWrapperPrimary: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  
  cardBody: { marginBottom: 16 },
  cardLabel: { fontSize: 13, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 },
  cardAmount: { fontSize: 36, fontWeight: '900', letterSpacing: -1.5 },
  
  progressContainer: { height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3, marginTop: 16, marginBottom: 8, overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: 3 },
  limitText: { fontSize: 12, fontWeight: '600', opacity: 0.8 },

  sectionContainer: { paddingHorizontal: 20, marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16, letterSpacing: -0.5 },
  
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  lightListItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  listIconWrapper: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTextContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  listSubtitle: { fontSize: 14 },
});