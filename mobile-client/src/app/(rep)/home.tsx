import React, { useState } from 'react';
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
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

const TIME_FILTERS = ['Today', 'Yesterday', 'This Week', 'Total'];

const REP_MODULES = [
  { id: 'Stock', title: 'Stock & Checkout', sub: 'Manage field inventory', icon: 'cube-outline', lightBg: '#EBF2FF', lightColor: '#1D61F2', route: '/(rep)/stock' },
  { id: 'Ledger', title: 'My Ledger', sub: 'View transaction history', icon: 'wallet-outline', lightBg: '#E6F9F2', lightColor: '#059669', route: '/(rep)/ledger' },
  { id: 'Notes', title: 'My Notes', sub: 'Daily field diary', icon: 'journal-outline', lightBg: '#FEF2F2', lightColor: '#DC2626', route: '/(rep)/notes' },
];

export default function RepDashboard() {
  const router = useRouter();
  
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const toggleTheme = useAuthStore((state) => state.toggleTheme);
  const userName = useAuthStore((state) => (state as any).userName || 'Sales Rep');

  // Filter State
  const [activeFilter, setActiveFilter] = useState('Today');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Upload Form Accordion State
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [uploadAmount, setUploadAmount] = useState('');
  const [uploadNotes, setUploadNotes] = useState('');

  // Financials
  const CURRENT_DEBT = 45200;
  const CREDIT_LIMIT = 150000;
  const debtPercentage = Math.min((CURRENT_DEBT / CREDIT_LIMIT) * 100, 100);

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F1419',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : 'transparent',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  const handleUploadSubmit = () => {
    if (!uploadAmount) {
      Alert.alert("Missing Details", "Please enter the deposit amount.");
      return;
    }
    Alert.alert("Success", `Receipt for ETB ${uploadAmount} submitted for Admin approval.`);
    setIsUploadFormOpen(false);
    setUploadAmount('');
    setUploadNotes('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Global Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(rep)/profile')}>
          <Ionicons name="person-circle" size={32} color={theme.textMuted} />
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(rep)/messages')}>
            <Ionicons name="notifications-outline" size={22} color={theme.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { marginLeft: 8 }]} onPress={toggleTheme}>
            <Ionicons name={isDarkMode ? "sunny-outline" : "moon-outline"} size={22} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}> */}
        
        {/* Greeting & Dropdown Filter */}
        <View style={styles.greetingHeaderRow}>
          <View style={styles.greetingTextContainer}>
            {/* <Text style={[styles.greetingTitle, { color: theme.text }]}>Hello, {userName}</Text> */}
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

        {/* Hero Debt Card & Upload Accordion */}
        <View style={styles.cardsWrapper}>
          <View style={[styles.financeCard, { backgroundColor: theme.invertedBg }, !isDarkMode && styles.lightModePrimaryShadow]}>
            <View style={styles.cardHeader}>
              <View style={[styles.lightCardIconWrapperPrimary, isDarkMode && { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                <Ionicons name="wallet" size={28} color={theme.invertedText} />
              </View>
            </View>
            
            <View style={styles.cardBody}>
              <Text style={[styles.cardLabel, { color: theme.invertedText }]}>ACTIVE DEBT BALANCE</Text>
              <Text style={[styles.cardAmount, { color: theme.invertedText }]}>ETB {CURRENT_DEBT.toLocaleString()}</Text>
              
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${debtPercentage}%`, backgroundColor: debtPercentage > 85 ? '#DC2626' : (isDarkMode ? '#000' : '#FFFFFF') }]} />
              </View>
              <Text style={[styles.limitText, { color: theme.invertedText }]}>Credit Limit: ETB {CREDIT_LIMIT.toLocaleString()}</Text>
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

      {/* </ScrollView> */}
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

  divider: { height: 1, marginVertical: 16 },
  
  uploadTrigger: { flexDirection: 'row', alignItems: 'center' },
  uploadTriggerText: { fontSize: 15, fontWeight: '700' },
  
  uploadFormContainer: { marginTop: 16 },
  uploadInput: { paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12, fontSize: 15, fontWeight: '600', marginBottom: 12 },
  attachBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderWidth: 1, borderStyle: 'dashed', borderRadius: 12, marginBottom: 16 },
  attachText: { fontWeight: '700', marginLeft: 8 },
  submitBtn: { paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { color: '#FFF', fontSize: 15, fontWeight: '800' },

  sectionContainer: { paddingHorizontal: 20, marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16, letterSpacing: -0.5 },
  
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  lightListItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 12, shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  listIconWrapper: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTextContainer: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  listSubtitle: { fontSize: 14 },
});