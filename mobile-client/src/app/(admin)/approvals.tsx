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

const PENDING_RECEIPTS = [
  {
    id: '1',
    repName: 'Abebe Kebede',
    bank: 'CBE_BANK',
    // ref: '#TXN-8832',
    amount: '15,000.00',
    timestamp: 'Today, 10:42 AM',
    documentName: 'Receipt_Scan_TXN8832.jpg',
  },
  {
    id: '2',
    repName: 'Tigist Alemu',
    bank: 'BOA_BANK',
    // ref: '#TXN-8835',
    amount: '42,500.00',
    timestamp: 'Today, 09:15 AM',
    documentName: 'Receipt_Scan_TXN8835.jpg',
  },
];

export default function ApprovalsScreen() {
  const router = useRouter();
  
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const [activeNav, setActiveNav] = useState('Approvals');

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : 'transparent',
    invertedBg: isDarkMode ? '#E7E9EA' : '#1D61F2',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
    docBg: isDarkMode ? '#1E293B' : '#F1F5F9',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <View style={styles.titleRow}>
          <View>
            <Text style={[styles.pageTitle, { color: theme.text }]}>Receipt Approvals </Text>
          </View>
        </View>
        </View>
        
        <View style={styles.headerRight}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=Admin&background=1D61F2&color=fff' }} style={styles.avatar} />
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        {/* Title & Badge Row */}
        

        {/* Verification Cards Feed */}
        <View style={styles.feedContainer}>
          {PENDING_RECEIPTS.map((item) => (
            <View 
              key={item.id} 
              style={[
                styles.approvalCard, 
                { backgroundColor: theme.cardBg },
                isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow
              ]}
            >
              {/* Left Accent Border for Light Mode */}
              <View style={styles.leftAccentBar} />

              <View style={styles.cardMainContent}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.repMetaRow}>
                    <View style={[styles.bankIconBox, isDarkMode && { backgroundColor: '#1E293B' }]}>
                      <Ionicons name="business-outline" size={20} color="#1D61F2" />
                    </View>
                    <View>
                      <Text style={[styles.repName, { color: theme.text }]}>{item.repName}</Text>
                      <Text style={[styles.bankDetails, { color: theme.textMuted }]}>
                        {item.bank}
                      </Text>
                    </View>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.etbLabel}>ETB</Text>
                    <Text style={[styles.amountText, { color: theme.text }]}>{item.amount}</Text>
                    <Text style={[styles.timestampText, { color: theme.textMuted }]}>{item.timestamp}</Text>
                  </View>
                </View>

                {/* Document Preview Box */}
                <View style={[styles.docPreviewBox, { backgroundColor: theme.docBg }]}>
                  <View style={styles.docThumbnail}>
                    <Ionicons name="document-text-outline" size={24} color="#64748B" />
                  </View>
                  <View style={styles.docInfo}>
                    <Text style={[styles.docName, { color: theme.text }]} numberOfLines={1}>{item.documentName}</Text>
                    <TouchableOpacity onPress={() => console.log('View Document')}>
                      <Text style={styles.viewDocLink}>View Document</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.approveBtn} onPress={() => console.log('Approve & Settle')}>
                    <Ionicons name="finger-print" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.approveBtnText}>Approve & Settle</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.rejectBtn, isDarkMode && { borderColor: theme.border }]}>
                    <Ionicons name="close" size={18} color="#DC2626" style={{ marginRight: 4 }} />
                    <Text style={styles.rejectBtnText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  
  titleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 16, marginBottom: 24 },
  pageTitle: { fontSize: 32, fontWeight: '900', lineHeight: 36, letterSpacing: -1 },
  badgeContainer: { marginLeft: 16 },
  badge: { backgroundColor: '#1D61F2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
  badgeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },

  feedContainer: { paddingHorizontal: 20 },
  approvalCard: { borderRadius: 24, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  leftAccentBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, backgroundColor: '#1D61F2' },
  cardMainContent: { paddingLeft: 8 },

  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  repMetaRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 },
  bankIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  repName: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  bankDetails: { fontSize: 13, fontWeight: '500' },

  etbLabel: { fontSize: 12, fontWeight: '700', color: '#1D61F2', textAlign: 'right' },
  amountText: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
  timestampText: { fontSize: 12, marginTop: 2 },

  docPreviewBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, marginBottom: 20 },
  docThumbnail: { width: 40, height: 40, backgroundColor: '#FFFFFF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  docInfo: { flex: 1 },
  docName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  viewDocLink: { fontSize: 13, fontWeight: '700', color: '#1D61F2' },

  actionRow: { flexDirection: 'row', gap: 12 },
  approveBtn: { flex: 1.2, flexDirection: 'row', backgroundColor: '#064E3B', paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  approveBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  rejectBtn: { flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#FECACA', backgroundColor: '#FEF2F2', paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  rejectBtnText: { color: '#DC2626', fontWeight: '700', fontSize: 14 },

  darkBottomNav: { borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: 24, paddingTop: 12, flexDirection: 'row', alignItems: 'center' },
  darkNavItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  darkNavText: { fontSize: 10, fontWeight: '500', marginTop: 4 },
  
  lightBottomNavContainer: { position: 'absolute', bottom: 24, left: 20, right: 20 },
  lightBottomNav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 8, justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 15 },
  lightNavItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 8 },
  lightNavItemActive: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#1D61F2', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 100 },
  lightNavText: { fontSize: 10, fontWeight: '600', marginTop: 4 },
});
