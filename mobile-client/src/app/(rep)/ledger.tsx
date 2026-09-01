import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  Platform,
  StatusBar,
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const MOCK_HISTORY = [
  { id: '1', type: 'CHECKOUT', date: 'Oct 15, 2026', amount: 45000, desc: 'Field Stock Checkout' },
  { id: '2', type: 'PAYMENT', date: 'Oct 12, 2026', amount: -20000, desc: 'CBE Bank Transfer (Approved)' },
  { id: '3', type: 'CHECKOUT', date: 'Oct 10, 2026', amount: 12500, desc: 'Market Restock' },
];

// Simulating the backend's knowledge of what this Rep currently holds
const MOCK_ACTIVE_INVENTORY = [
  { id: 'item_1', name: 'Premium Sugar (50kg)', qtyCheckedOut: 10 },
  { id: 'item_2', name: 'Refined Cooking Oil (5L)', qtyCheckedOut: 5 },
];

export default function RepLedgerScreen() {
  const router = useRouter();
  const isDarkMode = useAuthStore((state) => state.isDarkMode);

  // Upload Form State
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [uploadAmount, setUploadAmount] = useState('');
  const [uploadNotes, setUploadNotes] = useState('');

  // Refund/Return State
  const [isRefundModalVisible, setIsRefundModalVisible] = useState(false);
  const [refundItem, setRefundItem] = useState('');
  const [refundQty, setRefundQty] = useState('');
  const [refundReason, setRefundReason] = useState(''); // New Reason State

  const CURRENT_DEBT = 45200;
  const CREDIT_LIMIT = 150000;
  const debtPercentage = Math.min((CURRENT_DEBT / CREDIT_LIMIT) * 100, 100);

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    cardBg: isDarkMode ? '#1E293B' : '#FFFFFF',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    primary: '#177CA5',
  };

  const handleUpload = () => {
    if (!uploadAmount) {
      Alert.alert('Error', 'Enter a payment amount.');
      return;
    }
    Alert.alert('Success', `Receipt for ETB ${uploadAmount} submitted to admin for approval.`);
    setIsUploadFormOpen(false);
    setUploadAmount('');
    setUploadNotes('');
  };

  const handleRefundSubmit = () => {
    // 1. Basic Field Validation
    if (!refundItem.trim() || !refundQty.trim() || !refundReason.trim()) {
      Alert.alert('Missing Fields', 'Please enter the item name, quantity, and reason for return.');
      return;
    }

    const requestedQty = parseInt(refundQty, 10);
    if (isNaN(requestedQty) || requestedQty <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid numeric quantity greater than 0.');
      return;
    }

    // 2. Mock Backend Validation Logic
    // In production, the backend receives the payload and runs this exact check against the database
    const sanitizedSearchTerm = refundItem.trim().toLowerCase();
    
    const holdingItem = MOCK_ACTIVE_INVENTORY.find(
      (item) => item.name.toLowerCase() === sanitizedSearchTerm
    );

    if (!holdingItem) {
      Alert.alert(
        'Item Not Found', 
        `System records show you have not checked out "${refundItem}". Please verify the item name.`
      );
      return;
    }

    if (requestedQty > holdingItem.qtyCheckedOut) {
      Alert.alert(
        'Invalid Quantity', 
        `You only have ${holdingItem.qtyCheckedOut} units of "${holdingItem.name}" registered to your account. You cannot return ${requestedQty}.`
      );
      return;
    }

    // 3. Success (Passes all checks)
    Alert.alert(
      'Return Request Submitted', 
      `Your request to return ${requestedQty}x ${holdingItem.name} for the reason: "${refundReason}" has been forwarded. Your debt will be adjusted once the warehouse confirms receipt.`
    );
    
    // Clean up
    setIsRefundModalVisible(false);
    setRefundItem('');
    setRefundQty('');
    setRefundReason('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header with Back Navigation */}
      <View style={[styles.header, { borderBottomColor: theme.border, borderBottomWidth: isDarkMode ? StyleSheet.hairlineWidth : 1 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Ledger</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Debt Overview Card */}
        <View style={[styles.debtCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }, !isDarkMode && styles.lightShadow]}>
          <View style={styles.debtHeaderRow}>
            <Text style={[styles.debtTitle, { color: theme.textMuted }]}>OUTSTANDING DEBT</Text>
            <Ionicons name="wallet-outline" size={20} color={theme.textMuted} />
          </View>
          <Text style={[styles.debtAmount, { color: theme.text }]}>ETB {CURRENT_DEBT.toLocaleString()}</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${debtPercentage}%`, backgroundColor: debtPercentage > 85 ? '#DC2626' : theme.primary }]} />
          </View>
          <Text style={[styles.limitText, { color: theme.textMuted }]}>Credit Limit: ETB {CREDIT_LIMIT.toLocaleString()}</Text>
        </View>

        {/* Action Group: Upload Payment & Return Stock */}
        <View style={styles.actionGroupContainer}>
          
          {/* Elegant Upload Receipt Accordion */}
          <View style={[styles.actionCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }, !isDarkMode && styles.lightShadow]}>
            <TouchableOpacity 
              style={styles.actionTrigger}
              onPress={() => setIsUploadFormOpen(!isUploadFormOpen)}
              activeOpacity={0.7}
            >
              <View style={styles.actionHeaderLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#0F1419' : '#EFF6FF' }]}>
                  <Ionicons name="receipt-outline" size={20} color="#1D61F2" />
                </View>
                <Text style={[styles.actionTitle, { color: theme.text }]}>Upload Payment Receipt</Text>
              </View>
              <Ionicons name={isUploadFormOpen ? "chevron-up" : "chevron-down"} size={20} color={theme.textMuted} />
            </TouchableOpacity>

            {isUploadFormOpen && (
              <View style={[styles.actionBody, { borderTopColor: theme.border }]}>
                <Text style={[styles.label, { color: theme.text }]}>Amount Deposited (ETB)</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} 
                  placeholder="0.00" 
                  placeholderTextColor={theme.textMuted} 
                  keyboardType="numeric" 
                  value={uploadAmount} 
                  onChangeText={setUploadAmount} 
                />

                <Text style={[styles.label, { color: theme.text }]}>Additional Info (Bank, TX Ref)</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, height: 80 }]} 
                  placeholder="e.g. Paid via CBE Birr" 
                  placeholderTextColor={theme.textMuted} 
                  multiline 
                  value={uploadNotes} 
                  onChangeText={setUploadNotes} 
                />

                <TouchableOpacity style={[styles.uploadImageBtn, { borderColor: theme.border, backgroundColor: theme.inputBg }]}>
                  <Ionicons name="camera" size={24} color={theme.primary} />
                  <Text style={[styles.uploadImageText, { color: theme.primary }]}>Attach Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg }]} onPress={handleUpload}>
                  <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Submit to Admin</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Return Stock Button (Opens Bottom Sheet) */}
          <View style={[styles.actionCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }, !isDarkMode && styles.lightShadow]}>
            <TouchableOpacity 
              style={styles.actionTrigger}
              onPress={() => setIsRefundModalVisible(true)}
              activeOpacity={0.7}
            >
              <View style={styles.actionHeaderLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF1F2' }]}>
                  <Ionicons name="return-down-back" size={20} color="#E11D48" />
                </View>
                <Text style={[styles.actionTitle, { color: theme.text }]}>Return Stock</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
            </TouchableOpacity>
          </View>
          
        </View>

        {/* Elegant History Ledger */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Transaction History</Text>
        <View style={styles.historyContainer}>
          {MOCK_HISTORY.map((tx) => {
            const isPayment = tx.type === 'PAYMENT';
            return (
              <View key={tx.id} style={[styles.txCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }, !isDarkMode && styles.lightShadow]}>
                
                <View style={[styles.txIconBox, { backgroundColor: isPayment ? 'rgba(5, 150, 105, 0.1)' : 'rgba(29, 97, 242, 0.1)' }]}>
                  <Ionicons name={isPayment ? "arrow-up" : "cart"} size={20} color={isPayment ? '#059669' : '#1D61F2'} />
                </View>

                <View style={styles.txDetails}>
                  <Text style={[styles.txDesc, { color: theme.text }]} numberOfLines={1}>{tx.desc}</Text>
                  <Text style={[styles.txDate, { color: theme.textMuted }]}>{tx.date}</Text>
                </View>

                <Text style={[styles.txAmount, { color: isPayment ? '#059669' : theme.text }]}>
                  {isPayment ? '-' : '+'}ETB {Math.abs(tx.amount).toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>

      </ScrollView>

      {/* --- REFUND STOCK BOTTOM SHEET --- */}
      <Modal visible={isRefundModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Return Stock</Text>
              <TouchableOpacity onPress={() => setIsRefundModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.sheetScroll} showsVerticalScrollIndicator={false}>
              
              <Text style={[styles.label, { color: theme.text }]}>Item Name (Type exactly to test)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                placeholder="e.g. Premium Sugar (50kg)"
                placeholderTextColor={theme.textMuted}
                value={refundItem}
                onChangeText={setRefundItem}
              />

              <Text style={[styles.label, { color: theme.text }]}>Quantity to Return</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                placeholder="e.g. 5"
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={refundQty}
                onChangeText={setRefundQty}
              />

              {/* New Reason Field */}
              <Text style={[styles.label, { color: theme.text }]}>Reason for Return</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, height: 80 }]}
                placeholder="e.g. Damaged packaging, expired, unable to sell..."
                placeholderTextColor={theme.textMuted}
                multiline
                value={refundReason}
                onChangeText={setRefundReason}
              />

              <Text style={styles.helperText}>
                Returning stock requires Admin approval. Your debt will be credited once the warehouse confirms receipt.
              </Text>

              <TouchableOpacity 
                style={[styles.submitBtn, { backgroundColor: theme.invertedBg, marginTop: 12 }]} 
                onPress={handleRefundSubmit}
              >
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Submit Return Request</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, marginTop: Platform.OS === 'ios' ? 0 : 20 },
  backBtn: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 16 },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  
  // Debt Card
  debtCard: { padding: 24, borderRadius: 24, marginBottom: 20 },
  debtHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  debtTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  debtAmount: { fontSize: 32, fontWeight: '900', letterSpacing: -1, marginBottom: 16 },
  progressContainer: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginBottom: 12, overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: 3 },
  limitText: { fontSize: 13, fontWeight: '600' },

  // Action Cards (Upload & Return)
  actionGroupContainer: { marginBottom: 32, gap: 12 },
  actionCard: { borderRadius: 24, overflow: 'hidden' },
  actionTrigger: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  actionHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  actionTitle: { fontSize: 16, fontWeight: '700' },
  
  actionBody: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 16, borderTopWidth: 1 },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '600', marginBottom: 16 },
  uploadImageBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderWidth: 1, borderStyle: 'dashed', borderRadius: 12, marginBottom: 20 },
  uploadImageText: { fontWeight: '700', marginLeft: 8, fontSize: 15 },
  submitBtn: { paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '800' },

  // Bottom Sheet Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  sheetTitle: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  sheetScroll: { paddingBottom: 40 },
  helperText: { fontSize: 13, color: '#64748B', lineHeight: 18, marginTop: 4, marginBottom: 16 },

  // History List
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16, letterSpacing: -0.5 },
  historyContainer: { gap: 12 },
  txCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20 },
  txIconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  txDetails: { flex: 1, paddingRight: 12 },
  txDesc: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  txDate: { fontSize: 13 },
  txAmount: { fontSize: 16, fontWeight: '800' },
});