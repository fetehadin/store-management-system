import React, { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';

const REP_MODULES = [
  { id: 'Stock', title: 'Stock & Checkout', sub: 'Manage field inventory', icon: 'cube-outline', lightBg: '#EBF2FF', lightColor: '#1D61F2', route: '/(rep)/stock' },
  { id: 'Ledger', title: 'My Ledger', sub: 'View transaction history', icon: 'wallet-outline', lightBg: '#E6F9F2', lightColor: '#059669', route: '/(rep)/ledger' },
  { id: 'Notes', title: 'My Notes', sub: 'Daily field diary', icon: 'journal-outline', lightBg: '#FEF2F2', lightColor: '#DC2626', route: '/(rep)/note' },
];

const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'http://10.54.178.101:5000';

export default function RepDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);
  
  const userName = useAuthStore((state: any) => state.userName || state.user?.fullName || 'Sales Rep');
  const rawProfilePic = useAuthStore((state: any) => state.profilePic || state.user?.profilePic);
  
  const getAvatarUri = (uri: string | null | undefined) => {
    if (!uri) return null;
    if (uri.startsWith('data:') || uri.startsWith('file://')) return uri;
    if (uri.startsWith('http')) return uri.replace(/^https?:\/\/[^\/]+/, BASE_IP);
    return uri.startsWith('/') ? `${BASE_IP}${uri}` : `${BASE_IP}/${uri}`;
  };

  const avatarUri = getAvatarUri(rawProfilePic);
  
  const creditBalance = useAuthStore((state) => state.creditBalance) || 0;
  const creditLimit = useAuthStore((state) => state.creditLimit) || 0;
  
  const [refreshing, setRefreshing] = useState(false);

  const { refetch } = useQuery({
    queryKey: ['rep-profile-financials'],
    queryFn: async () => {
      const response = await apiClient.get('/auth/me'); 
      const user = response.data.data;
      
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

  const debtPercentage = creditLimit > 0 
    ? Math.min((creditBalance / creditLimit) * 100, 100) 
    : 0;

  // UPGRADED THEME: Classic Dark Slate Palette
  const theme = {
    bg: isDarkMode ? '#020617' : '#F8FAFC',
    cardBg: isDarkMode ? '#0F172A' : '#FFFFFF',
    cardActive: isDarkMode ? '#1E293B' : '#177CA5',
    text: isDarkMode ? '#F8FAFC' : '#0F1419',
    textMuted: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#1E293B' : '#E2E8F0',
    iconBg: isDarkMode ? '#1E293B' : '#EBF2FF',
    invertedText: '#FFFFFF',
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.bg, paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} translucent />

      {/* Global Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(rep)/profile' as any)}>
            {avatarUri ? (
              <Image 
                source={{ uri: avatarUri }} 
                style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: theme.iconBg }} 
              />
            ) : (
              <Ionicons name="person-circle" size={34} color={theme.textMuted} />
            )}
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(rep)/message' as any)}>
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
            <Text style={[styles.greetingSubtitle, { color: theme.textMuted }]}>Field Operations Dashboard</Text>
          </View>
        </View>

        {/* Hero Debt Card */}
        <View style={styles.cardsWrapper}>
          <View style={[
            styles.financeCard, 
            { backgroundColor: theme.cardActive }, 
            isDarkMode && { borderWidth: 1, borderColor: '#334155' },
            !isDarkMode && styles.lightModePrimaryShadow
          ]}>
            <View style={styles.cardHeader}>
              <View style={[
                !isDarkMode && styles.lightCardIconWrapperPrimary,
                isDarkMode && { padding: 10, borderRadius: 14, backgroundColor: '#334155' }
              ]}>
                <Ionicons name="wallet" size={28} color={theme.invertedText} />
              </View>
            </View>
            
            <View style={styles.cardBody}>
              <Text style={[styles.cardLabel, { color: isDarkMode ? '#94A3B8' : theme.invertedText }]}>ACTIVE DEBT BALANCE</Text>
              <Text style={[styles.cardAmount, { color: theme.invertedText }]}>ETB {creditBalance.toLocaleString()}</Text>
              
              <View style={[styles.progressContainer, isDarkMode && { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View style={[styles.progressBar, { width: `${debtPercentage}%`, backgroundColor: debtPercentage > 85 ? '#DC2626' : (isDarkMode ? '#F8FAFC' : '#FFFFFF') }]} />
              </View>
              <Text style={[styles.limitText, { color: isDarkMode ? '#94A3B8' : theme.invertedText }]}>Credit Limit: ETB {creditLimit.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Core Modules Directory */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text, paddingHorizontal: isDarkMode ? 4 : 0 }]}>Core Modules</Text>
          
          <View style={[isDarkMode && { backgroundColor: theme.cardBg, borderRadius: 24, paddingVertical: 8, borderWidth: 1, borderColor: theme.border }]}>
            {REP_MODULES.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.listItem, 
                  isDarkMode ? { paddingHorizontal: 20 } : styles.lightListItem,
                  isDarkMode && index !== REP_MODULES.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border }
                ]}
                onPress={() => router.push(item.route as any)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  iconButton: { padding: 4, position: 'relative' },
  notificationBadge: { position: 'absolute', top: 6, right: 6, width: 9, height: 9, borderRadius: 4.5, backgroundColor: '#DC2626', borderWidth: 1.5, borderColor: '#FFFFFF' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  
  scrollContentDark: { paddingBottom: 100 },
  scrollContentLight: { paddingBottom: 100 },
  
  greetingHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 16, marginBottom: 16 },
  greetingTextContainer: { flex: 1, paddingRight: 12 },
  greetingTitle: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 15, marginTop: 4 },
  
  cardsWrapper: { paddingHorizontal: 20, paddingVertical: 16 },
  financeCard: { borderRadius: 28, padding: 24 },
  lightModePrimaryShadow: { shadowColor: '#177CA5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 10 },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  lightCardIconWrapperPrimary: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  
  cardBody: { marginBottom: 10 },
  cardLabel: { fontSize: 12, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1.2 },
  cardAmount: { fontSize: 36, fontWeight: '900', letterSpacing: -1 },
  
  progressContainer: { height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3, marginTop: 16, marginBottom: 8, overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: 3 },
  limitText: { fontSize: 12, fontWeight: '600' },

  sectionContainer: { paddingHorizontal: 20, marginBottom: 32, marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16, letterSpacing: -0.5 },
  
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18 },
  lightListItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 20, marginBottom: 12, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  listIconWrapper: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTextContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  listSubtitle: { fontSize: 13 },
});