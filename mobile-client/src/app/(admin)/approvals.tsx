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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const INITIAL_RECEIPTS = [
  {
    id: '1',
    senderName: 'Abebe Kebede',
    bank: 'Commercial Bank of Ethiopia',
    amount: '15,000.00',
    timestamp: 'Today, 10:42 AM',
    documentName: 'receipt_scan_001.jpg',
  },
  {
    id: '2',
    senderName: 'Tigist Alemu',
    bank: 'Bank of Abyssinia',
    amount: '42,500.00',
    timestamp: 'Yesterday, 09:15 AM',
    documentName: 'transfer_slip_boa.pdf',
  },
];

export default function ApprovalsScreen() {
  const router = useRouter();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const isAdmin = role === 'ADMIN' || role === null;

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.unauthorizedContainer}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={styles.unauthorizedTitle}>Access Restricted</Text>
        <Text style={styles.unauthorizedSubtitle}>This portal is exclusively for system administrators.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(rep)/pos')}>
          <Text style={styles.backButtonText}>Return to POS</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const [activeNav, setActiveNav] = useState('Approvals');
  const [receipts, setReceipts] = useState(INITIAL_RECEIPTS);
  
  // Rejection Modal State
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (id: string) => {
    // In production: API call to credit the rep's account here
    setReceipts(prev => prev.filter(r => r.id !== id));
  };

  const openRejectModal = (id: string) => {
    setActiveReceiptId(id);
    setIsRejectModalVisible(true);
  };

  const handleConfirmReject = () => {
    // In production: API call to send rejection notification & note to rep
    console.log(`Rejected ${activeReceiptId} for reason: ${rejectReason}`);
    setReceipts(prev => prev.filter(r => r.id !== activeReceiptId));
    setIsRejectModalVisible(false);
    setRejectReason('');
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
    docBg: isDarkMode ? '#1E293B' : '#F1F5F9',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => router.replace('/(admin)/dashboard')}>
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Receipt Approvals</Text>
        </View>
        <View style={styles.headerRight}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=Admin&background=1D61F2&color=fff' }} style={styles.avatar} />
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        {/* Verification Cards Feed */}
        <View style={styles.feedContainer}>
          {receipts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-done-circle-outline" size={48} color={theme.textMuted} />
              <Text style={[styles.emptyStateTitle, { color: theme.text }]}>All Caught Up</Text>
              <Text style={[styles.emptyStateSub, { color: theme.textMuted }]}>There are no pending receipts to verify.</Text>
            </View>
          ) : (
            receipts.map((item) => (
              <View 
                key={item.id} 
                style={[
                  styles.approvalCard, 
                  { backgroundColor: theme.cardBg },
                  isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow
                ]}
              >
                <View style={styles.leftAccentBar} />

                <View style={styles.cardMainContent}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.repMetaRow}>
                      <View style={[styles.bankIconBox, isDarkMode && { backgroundColor: '#1E293B' }]}>
                        <Ionicons name="business-outline" size={20} color="#177CA5" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.repName, { color: theme.text }]} numberOfLines={1}>{item.senderName}</Text>
                        <Text style={[styles.bankDetails, { color: theme.textMuted }]} numberOfLines={1}>{item.bank}</Text>
                      </View>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={[styles.amountText, { color: theme.text }]}>ETB {item.amount}</Text>
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
                    <TouchableOpacity style={styles.approveBtn} onPress={() => handleApprove(item.id)}>
                      <Ionicons name="finger-print" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.approveBtnText}>Approve & Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.rejectBtn, isDarkMode && { borderColor: theme.border }]} onPress={() => openRejectModal(item.id)}>
                      <Ionicons name="close" size={18} color="#DC2626" style={{ marginRight: 4 }} />
                      <Text style={styles.rejectBtnText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Reject Reason Modal */}
      <Modal visible={isRejectModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Reject Receipt</Text>
              <TouchableOpacity onPress={() => setIsRejectModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.inputLabel, { color: theme.text }]}>Reason for Rejection</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
              placeholder="e.g. The uploaded image is blurry and illegible..."
              placeholderTextColor={theme.textMuted}
              multiline
              numberOfLines={4}
              value={rejectReason}
              onChangeText={setRejectReason}
              autoFocus
            />
            
            <Text style={[styles.helperText, { color: theme.textMuted }]}>
              This note will be sent directly to the agent to help them correct and re-submit the payment.
            </Text>

            <TouchableOpacity 
              style={[styles.submitBtn, { backgroundColor: '#DC2626' }]} 
              onPress={handleConfirmReject}
              disabled={!rejectReason.trim()}
            >
              <Text style={[styles.submitBtnText, { color: '#FFFFFF' }, !rejectReason.trim() && { opacity: 0.7 }]}>
                Confirm Rejection
              </Text>
            </TouchableOpacity>
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
  
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyStateTitle: { fontSize: 20, fontWeight: '800', marginTop: 16, marginBottom: 8 },
  emptyStateSub: { fontSize: 14, textAlign: 'center' },

  feedContainer: { paddingHorizontal: 20 },
  approvalCard: { borderRadius: 20, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  leftAccentBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, backgroundColor: '#177CA5' },
  cardMainContent: { paddingLeft: 6 },

  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  repMetaRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 },
  bankIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  repName: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
  bankDetails: { fontSize: 12, fontWeight: '500' },

  amountText: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5 },
  timestampText: { fontSize: 11, marginTop: 4, fontWeight: '500' },

  docPreviewBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 20 },
  docThumbnail: { width: 40, height: 40, backgroundColor: '#FFFFFF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  docInfo: { flex: 1 },
  docName: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  viewDocLink: { fontSize: 12, fontWeight: '700', color: '#1D61F2' },

  actionRow: { flexDirection: 'row', gap: 12 },
  approveBtn: { flex: 1.2, flexDirection: 'row', backgroundColor: '#064E3B', paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  approveBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  rejectBtn: { flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#FECACA', backgroundColor: '#FEF2F2', paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  rejectBtnText: { color: '#DC2626', fontWeight: '700', fontSize: 14 },

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

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  
  inputLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  textArea: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '500', minHeight: 100, textAlignVertical: 'top' },
  helperText: { fontSize: 13, marginTop: 12, lineHeight: 18 },
  
  submitBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '700' },
});