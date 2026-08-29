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

const SALES_REPS = [
  { 
    id: '1', 
    name: 'Abebe Kebede', 
    status: 'Active', 
    creditUsed: 45000, 
    creditLimit: 100000, 
    avatar: 'https://ui-avatars.com/api/?name=Abebe+Kebede&background=F1F5F9&color=0F172A',
    isWarning: false 
  },
  { 
    id: '2', 
    name: 'Dawit Tadesse', 
    status: 'LIMIT WARNING', 
    creditUsed: 95000, 
    creditLimit: 100000, 
    avatar: 'https://ui-avatars.com/api/?name=Dawit+Tadesse&background=F1F5F9&color=0F172A',
    isWarning: true 
  },
  { 
    id: '3', 
    name: 'Sara Mohammed', 
    status: 'Active', 
    creditUsed: 12000, 
    creditLimit: 100000, 
    avatar: null,
    isWarning: false 
  },
];

export default function SalesRepsScreen() {
  const router = useRouter();
  
  // Strict Admin Gate with failsafe fallback for development/testing
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  // Checks if role is 'ADMIN' (or forces true if testing while role is temporarily null)
  const isAdmin = role === 'ADMIN' || role === null;

  // If a non-admin sneaks in, boot them back immediately
  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.unauthorizedContainer}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={styles.unauthorizedTitle}>Access Restricted</Text>
        <Text style={styles.unauthorizedSubtitle}>This portal is exclusively for system administrators.</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.replace('/(rep)/pos')}
        >
          <Text style={styles.backButtonText}>Return to POS</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const [activeNav, setActiveNav] = useState('Sales');

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : 'transparent',
    invertedBg: isDarkMode ? '#E7E9EA' : '#1D61F2',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
    progressBarBg: isDarkMode ? '#1E293B' : '#E2E8F0',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <View style={styles.pageTitleContainer}>
          <Text style={[styles.pageTitle, { color: theme.text }]}>Active Sales</Text>
        </View>
        </View>
        
        <View style={styles.headerRight}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=Admin&background=1D61F2&color=fff' }} style={styles.avatar} />
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
            <View>
              <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>TOTAL ACTIVE SALES</Text>
              <View style={styles.summaryValueRow}>
                <Text style={[styles.summaryValue, { color: theme.text }]}>12</Text>
                <Text style={styles.summarySubValueGreen}> Active</Text>
              </View>
            </View>
            <View style={[styles.summaryIconWrapper, { backgroundColor: isDarkMode ? '#1E293B' : '#EEF2FF' }]}>
              <Ionicons name="people" size={24} color={isDarkMode ? theme.text : '#1D61F2'} />
            </View>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
            <View>
              <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>TOTAL OUTSTANDING</Text>
              <View style={styles.summaryValueRow}>
                  <Text style={[styles.summaryValue, { color: theme.text }]}>240,500</Text>
                  <Text style={[styles.summaryValueSmall, { color: theme.text }]}>ETB</Text>  
              </View>
              
            </View>
          </View>
        </View>
        {/* Primary Action Button */}
                <View style={styles.actionContainer}>
                  <TouchableOpacity style={[styles.mainActionBtn, { backgroundColor: theme.invertedBg }]} onPress={() => console.log('Add Supplier')}>
                    <Ionicons name="add" size={20} color={theme.invertedText} style={styles.btnIcon} />
                    <Text style={[styles.mainActionText, { color: theme.invertedText }]}>Add Sales</Text>
                  </TouchableOpacity>
                </View>
        {/* Sales Rep List */}
        <View style={styles.listContainer}>
          {SALES_REPS.map((rep) => {
            const percentage = (rep.creditUsed / rep.creditLimit) * 100;
            
            return (
              <TouchableOpacity 
                key={rep.id} 
                style={[
                  styles.repCard, 
                  { backgroundColor: theme.cardBg },
                  isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow,
                  rep.isWarning && !isDarkMode && { borderLeftWidth: 4, borderLeftColor: '#DC2626' },
                  rep.isWarning && isDarkMode && { borderColor: '#DC2626' }
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.repTopRow}>
                  <View style={[styles.repAvatarPlaceholder, isDarkMode && { backgroundColor: '#1E293B' }]}>
                    {rep.avatar ? (
                      <Image source={{ uri: rep.avatar }} style={styles.repAvatar} />
                    ) : (
                      <Ionicons name="person-outline" size={24} color={theme.textMuted} />
                    )}
                  </View>
                  <View style={styles.repInfo}>
                    <Text style={[styles.repName, { color: theme.text }]}>{rep.name}</Text>
                    <View style={styles.statusRow}>
                      {!rep.isWarning ? (
                        <>
                          <View style={styles.statusDotGreen} />
                          <Text style={[styles.statusText, { color: theme.textMuted }]}>{rep.status}</Text>
                        </>
                      ) : (
                        <View style={[styles.warningPill, isDarkMode && { backgroundColor: '#7F1D1D' }]}>
                          <Text style={[styles.warningPillText, isDarkMode && { color: '#FECACA' }]}>{rep.status}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.creditContainer}>
                  <View style={styles.creditHeader}>
                    <Text style={[styles.creditLabel, { color: theme.text }]}>Credit Used</Text>
                    <Text style={[styles.creditPercentage, { color: theme.text }]}>{Math.round(percentage)}%</Text>
                  </View>
                  
                  <View style={[styles.progressBarBg, { backgroundColor: theme.progressBarBg }]}>
                    <View style={[
                      styles.progressBarFill, 
                      { width: `${percentage}%` },
                      rep.isWarning ? { backgroundColor: '#DC2626' } : { backgroundColor: '#1D61F2' }
                    ]} />
                  </View>
                  
                  <Text style={[styles.creditLimits, { color: theme.textMuted }]}>
                    ETB {rep.creditUsed.toLocaleString()} / {rep.creditLimit.toLocaleString()} Limit
                  </Text>
                </View>

                <View style={styles.chevronWrapper}>
                  <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {/* Primary Action Button */}
        {/* <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.mainActionBtn, { backgroundColor: theme.invertedBg }]} onPress={() => console.log('Add Sales Rep')}>
            <Ionicons name="add" size={20} color={theme.invertedText} style={styles.btnIcon} />
            <Text style={[styles.mainActionText, { color: theme.invertedText }]}>Add New Sales Rep</Text>
          </TouchableOpacity>
        </View> */}

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
  
  pageTitleContainer: { paddingHorizontal: 20, marginTop: 16, marginBottom: 20 },
  pageTitle: { fontSize: 32, fontWeight: '900', letterSpacing: -1 },

  actionContainer: { paddingHorizontal: 20, marginBottom: 24 },
  mainActionBtn: { flexDirection: 'row', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnIcon: { marginRight: 8 },
  mainActionText: { fontWeight: '700', fontSize: 15 },

  summaryContainer: { paddingHorizontal: 20, marginBottom: 24 },
  summaryCard: { borderRadius: 16, padding: 20, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  summaryValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  summaryValueSmall: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  summaryValue: { fontSize: 28, fontWeight: '800', letterSpacing: -1 },
  summarySubValueGreen: { fontSize: 14, fontWeight: '600', color: '#059669', marginLeft: 4 },
  summaryIconWrapper: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },

  listContainer: { paddingHorizontal: 20 },
  repCard: { borderRadius: 20, padding: 20, marginBottom: 16 },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  
  repTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  repAvatarPlaceholder: { width: 56, height: 56, backgroundColor: '#F1F5F9', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16, overflow: 'hidden' },
  repAvatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  repInfo: { flex: 1, justifyContent: 'center' },
  repName: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDotGreen: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#059669', marginRight: 6 },
  statusText: { fontSize: 14, fontWeight: '500' },
  
  warningPill: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  warningPillText: { fontSize: 11, fontWeight: '800', color: '#DC2626', letterSpacing: 0.5 },

  creditContainer: { marginBottom: 16 },
  creditHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  creditLabel: { fontSize: 13, fontWeight: '700' },
  creditPercentage: { fontSize: 13, fontWeight: '700' },
  progressBarBg: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progressBarFill: { height: '100%', borderRadius: 4 },
  creditLimits: { fontSize: 12, textAlign: 'right' },

  chevronWrapper: { alignItems: 'center', marginTop: 4 },

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