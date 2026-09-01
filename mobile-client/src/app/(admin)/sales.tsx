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
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const SALES_REPS_DATA = [
  { 
    id: '1', 
    name: 'Abebe Kebede', 
    status: 'Active', 
    creditUsed: 45000, 
    creditLimit: 100000, 
    avatar: 'https://ui-avatars.com/api/?name=Abebe+Kebede&background=F1F5F9&color=0F172A',
    isWarning: false,
    isExpanded: false,
    transactions: [
      { id: 't1', day: 'Today', amount: '15,000', type: 'Credit' },
      { id: 't2', day: 'Monday', amount: '20,000', type: 'Paid' },
      { id: 't3', day: 'Last Week', amount: '30,000', type: 'Credit' },
    ]
  },
  { 
    id: '2', 
    name: 'Dawit Tadesse', 
    status: 'LIMIT WARNING', 
    creditUsed: 95000, 
    creditLimit: 100000, 
    avatar: 'https://ui-avatars.com/api/?name=Dawit+Tadesse&background=F1F5F9&color=0F172A',
    isWarning: true,
    isExpanded: false,
    transactions: [
      { id: 't4', day: 'Yesterday', amount: '45,000', type: 'Credit' },
      { id: 't5', day: 'Monday', amount: '50,000', type: 'Credit' },
    ]
  },
  { 
    id: '3', 
    name: 'Sara Mohammed', 
    status: 'Active', 
    creditUsed: 12000, 
    creditLimit: 100000, 
    avatar: null,
    isWarning: false,
    isExpanded: false,
    transactions: [
      { id: 't6', day: 'Tuesday', amount: '12,000', type: 'Credit' },
      { id: 't7', day: 'Last Month', amount: '12,000', type: 'Paid' },
    ]
  },
];

export default function SalesRepsScreen() {
  const router = useRouter();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const isAdmin = role === 'ADMIN' || role === null;

  const [reps, setReps] = useState(SALES_REPS_DATA);

  // Secure Enrollment States
  const [isEnrollModalVisible, setIsEnrollModalVisible] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentUsername, setNewAgentUsername] = useState('');
  const [newAgentLimit, setNewAgentLimit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleExpand = (id: string) => {
    setReps(prev => prev.map(rep => rep.id === id ? { ...rep, isExpanded: !rep.isExpanded } : rep));
  };

  const handleRemoveAgent = (id: string, name: string) => {
    Alert.alert(
      "Remove Agent",
      `Are you absolutely sure you want to remove ${name} from the network? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive", 
          onPress: () => setReps(prev => prev.filter(r => r.id !== id)) 
        }
      ]
    );
  };

  const handleEnrollSubmit = async () => {
    if (!newAgentName || !newAgentUsername || !newAgentLimit) {
      Alert.alert('Missing Fields', 'Please fill out all required fields to enroll the agent.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock Backend Call: apiClient.post('/admin/enroll', { name, username, limit })
      setTimeout(() => {
        Alert.alert(
          'Agent Enrolled', 
          `Account created for ${newAgentName}. The system has securely generated their temporary PIN and flagged the account for a forced reset upon their first login.`
        );
        
        // Reset form and close
        setNewAgentName('');
        setNewAgentUsername('');
        setNewAgentLimit('');
        setIsEnrollModalVisible(false);
        setIsSubmitting(false);
      }, 800);
    } catch (error) {
      Alert.alert('Enrollment Failed', 'Could not communicate with the server.');
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.unauthorizedContainer}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={styles.unauthorizedTitle}>Access Restricted</Text>
        <Text style={styles.unauthorizedSubtitle}>This portal is exclusively for system administrators.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(rep)/pos')}>
          <Text style={styles.backButtonText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
    subCardBg: isDarkMode ? '#1E293B' : '#F8FAFC',
    divider: isDarkMode ? '#2F3336' : '#E2E8F0',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => router.replace('/(admin)/dashboard')}
          >
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Agent Network</Text>
        </View>
        <View style={styles.headerRight}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=Admin&background=1D61F2&color=fff' }} style={styles.avatar} />
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        <View style={styles.summaryContainer}>
          <View style={[
            styles.unifiedSummaryCard, 
            { backgroundColor: theme.cardBg }, 
            isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow
          ]}>
            <View style={styles.summaryHalf}>
              <View style={styles.summaryIconRow}>
                <Ionicons name="people" size={16} color="#059669" />
                <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>ACTIVE</Text>
              </View>
              <Text style={[styles.summaryValue, { color: theme.text }]}>{reps.length} <Text style={styles.summaryValueSmall}>Reps</Text></Text>
            </View>
            
            <View style={[styles.summaryDivider, { backgroundColor: theme.divider }]} />
            
            <View style={styles.summaryHalf}>
              <View style={styles.summaryIconRow}>
                <Ionicons name="wallet" size={16} color="#DC2626" />
                <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>OUTSTANDING</Text>
              </View>
              <Text style={[styles.summaryValue, { color: theme.text }]}><Text style={styles.summaryValueSmall}>ETB </Text>240.5k</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.mainActionBtn, { backgroundColor: theme.invertedBg }]} 
            onPress={() => setIsEnrollModalVisible(true)}
          >
            <Ionicons name="add" size={20} color={theme.invertedText} style={styles.btnIcon} />
            <Text style={[styles.mainActionText, { color: theme.invertedText }]}>Enroll Agent</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {reps.map((rep) => (
            <View 
              key={rep.id} 
              style={[
                styles.repCard, 
                { backgroundColor: theme.cardBg },
                isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow,
                rep.isWarning && !isDarkMode && { borderLeftWidth: 4, borderLeftColor: '#DC2626' },
                rep.isWarning && isDarkMode && { borderColor: '#DC2626' }
              ]}
            >
              <TouchableOpacity style={styles.repTopRow} onPress={() => toggleExpand(rep.id)} activeOpacity={0.7}>
                <View style={[styles.repAvatarPlaceholder, isDarkMode && { backgroundColor: '#1E293B' }]}>
                  {rep.avatar ? (
                    <Image source={{ uri: rep.avatar }} style={styles.repAvatar} />
                  ) : (
                    <Ionicons name="person-outline" size={24} color={theme.textMuted} />
                  )}
                  {rep.isWarning && <View style={styles.warningIndicatorAvatar} />}
                </View>
                
                <View style={styles.repInfo}>
                  <Text style={[styles.repName, { color: theme.text }]}>{rep.name}</Text>
                  <View style={styles.statusRow}>
                    <Text style={[styles.debtLabel, { color: theme.textMuted }]}>Debt: </Text>
                    <Text style={[styles.debtAmount, rep.isWarning ? { color: '#DC2626' } : { color: theme.text }]}>
                      ETB {rep.creditUsed.toLocaleString()}
                    </Text>
                  </View>
                </View>
                
                <Ionicons name={rep.isExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textMuted} />
              </TouchableOpacity>

              {rep.isExpanded && (
                <View style={[styles.ledgerContainer, { borderTopColor: theme.border }]}>
                  <View style={styles.ledgerHeaderRow}>
                    <Text style={[styles.ledgerTitle, { color: theme.textMuted }]}>RECENT LEDGER</Text>
                    <Text style={[styles.limitText, { color: theme.textMuted }]}>Limit: ETB {rep.creditLimit.toLocaleString()}</Text>
                  </View>
                  
                  {rep.transactions.map((tx) => (
                    <View key={tx.id} style={[styles.txItem, { backgroundColor: theme.subCardBg, borderColor: theme.border }]}>
                      <View style={styles.txLeft}>
                        <Ionicons 
                          name={tx.type === 'Paid' ? "checkmark-circle" : "arrow-down-circle"} 
                          size={18} 
                          color={tx.type === 'Paid' ? '#059669' : '#DC2626'} 
                          style={{ marginRight: 8 }}
                        />
                        <Text style={[styles.txDay, { color: theme.text }]}>{tx.day}</Text>
                      </View>
                      <View style={styles.txRight}>
                        <Text style={[styles.txAmount, tx.type === 'Paid' ? { color: '#059669' } : { color: theme.text }]}>
                          {tx.type === 'Paid' ? '-' : '+'} ETB {tx.amount}
                        </Text>
                      </View>
                    </View>
                  ))}

                  <TouchableOpacity 
                    style={[styles.removeAgentBtn, { backgroundColor: isDarkMode ? '#3F1D1D' : '#FEF2F2' }]} 
                    onPress={() => handleRemoveAgent(rep.id, rep.name)}
                  >
                    <Ionicons name="trash-outline" size={16} color={isDarkMode ? '#F87171' : '#DC2626'} />
                    <Text style={[styles.removeAgentText, { color: isDarkMode ? '#F87171' : '#DC2626' }]}>Remove Agent</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Upgraded Secure Enrollment Bottom Sheet */}
      <Modal visible={isEnrollModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Secure Agent Enrollment</Text>
              <TouchableOpacity onPress={() => setIsEnrollModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>
              
              <Text style={[styles.inputLabel, { color: theme.text }]}>Agent Full Name</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                placeholder="e.g. Abebe Kebede"
                placeholderTextColor={theme.textMuted}
                value={newAgentName}
                onChangeText={setNewAgentName}
              />

              <Text style={[styles.inputLabel, { color: theme.text }]}>System Username / Phone Number</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                placeholder="e.g. abebe.k or 0911..."
                placeholderTextColor={theme.textMuted}
                autoCapitalize="none"
                value={newAgentUsername}
                onChangeText={setNewAgentUsername}
              />

              <Text style={[styles.inputLabel, { color: theme.text }]}>Approved Credit Limit (ETB)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, marginBottom: 8 }]}
                placeholder="e.g. 100000"
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={newAgentLimit}
                onChangeText={setNewAgentLimit}
              />

              <Text style={[styles.helperText, { color: theme.textMuted }]}>
                The system will automatically generate a temporary 6-digit access code for this user. They will be forced to change it upon their first login.
              </Text>

              <TouchableOpacity 
                style={[styles.submitBtn, { backgroundColor: theme.invertedBg, opacity: isSubmitting ? 0.7 : 1 }]} 
                onPress={handleEnrollSubmit}
                disabled={isSubmitting}
              >
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>
                  {isSubmitting ? 'Enrolling...' : 'Submit & Generate Code'}
                </Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menuButton: { marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  
  scrollContentDark: { paddingBottom: 24, paddingTop: 16 },
  scrollContentLight: { paddingBottom: 130, paddingTop: 16 },

  summaryContainer: { paddingHorizontal: 20, marginBottom: 24 },
  unifiedSummaryCard: { flexDirection: 'row', borderRadius: 20, padding: 20, alignItems: 'center' },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  
  summaryHalf: { flex: 1, justifyContent: 'center' },
  summaryDivider: { width: 1, height: '80%', marginHorizontal: 16 },
  summaryIconRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  summaryLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5, marginLeft: 6 },
  summaryValue: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  summaryValueSmall: { fontSize: 14, fontWeight: '600' },

  actionContainer: { paddingHorizontal: 20, marginBottom: 24 },
  mainActionBtn: { flexDirection: 'row', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnIcon: { marginRight: 8 },
  mainActionText: { fontWeight: '700', fontSize: 15 },

  listContainer: { paddingHorizontal: 20 },
  repCard: { borderRadius: 20, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16, marginBottom: 16, overflow: 'hidden' },
  
  repTopRow: { flexDirection: 'row', alignItems: 'center' },
  repAvatarPlaceholder: { width: 50, height: 50, backgroundColor: '#F1F5F9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16, overflow: 'hidden', position: 'relative' },
  repAvatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  warningIndicatorAvatar: { position: 'absolute', top: 0, right: 0, width: 12, height: 12, backgroundColor: '#DC2626', borderRadius: 6, borderWidth: 2, borderColor: '#FFFFFF' },
  
  repInfo: { flex: 1, justifyContent: 'center' },
  repName: { fontSize: 17, fontWeight: '700', marginBottom: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  debtLabel: { fontSize: 13, fontWeight: '500' },
  debtAmount: { fontSize: 13, fontWeight: '700' },

  ledgerContainer: { marginTop: 16, paddingTop: 16, borderTopWidth: 1 },
  ledgerHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  ledgerTitle: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  limitText: { fontSize: 11, fontWeight: '600' },
  
  txItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  txLeft: { flexDirection: 'row', alignItems: 'center' },
  txDay: { fontSize: 14, fontWeight: '600' },
  txRight: { alignItems: 'flex-end' },
  txAmount: { fontSize: 14, fontWeight: '700' },

  removeAgentBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, marginTop: 12 },
  removeAgentText: { fontSize: 14, fontWeight: '700', marginLeft: 6 },

  unauthorizedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#F8FAFC' },
  unauthorizedTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 16, marginBottom: 8 },
  unauthorizedSubtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 24 },
  backButton: { backgroundColor: '#1D61F2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 100 },
  backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  sheetTitle: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  sheetScroll: { paddingBottom: 40 },
  
  inputLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, fontWeight: '500' },
  
  helperText: { fontSize: 13, marginTop: 12, lineHeight: 18 },
  submitBtn: { marginTop: 32, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '700' },
});