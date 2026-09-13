import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, Alert, Platform, StatusBar, Image, ActivityIndicator, Modal
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../api/client';

export default function RepLedgerScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const isDarkMode = useAuthStore((state) => state.isDarkMode);

  // Actions State
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [uploadAmount, setUploadAmount] = useState('');
  const [bankName, setBankName] = useState(''); 
  const [uploadNotes, setUploadNotes] = useState(''); 
  const [receiptUri, setReceiptUri] = useState<string | null>(null); 
  const [isUploading, setIsUploading] = useState(false);
  
  const [isRefundModalVisible, setIsRefundModalVisible] = useState(false);
  const [returnCart, setReturnCart] = useState<Record<string, number>>({});
  const [returnReason, setReturnReason] = useState('');
  const [isReturning, setIsReturning] = useState(false);
  
  const [repInventory, setRepInventory] = useState<any[]>([]);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);

  // Live Balances
  const creditBalance = useAuthStore((state) => state.creditBalance) || 0;
  const creditLimit = useAuthStore((state) => state.creditLimit) || 0;
  const debtPercentage = creditLimit > 0 ? Math.min((creditBalance / creditLimit) * 100, 100) : 0;

  // UPGRADED THEME: Classic Dark Slate Palette
  const theme = {
    bg: isDarkMode ? '#020617' : '#F8FAFC',
    cardBg: isDarkMode ? '#0F172A' : '#FFFFFF',
    text: isDarkMode ? '#F8FAFC' : '#0F172A',
    textMuted: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#1E293B' : '#E2E8F0',
    rowBg: isDarkMode ? '#0F172A' : '#F8FAFC',
    inputBg: isDarkMode ? '#0F172A' : '#F1F5F9',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    primary: '#177CA5',
  };

  // 1. Fetch Live Debt
  useQuery({
    queryKey: ['rep-profile-financials-ledger'],
    queryFn: async () => {
      const response = await apiClient.get('/auth/me'); 
      const user = response.data.data;
      useAuthStore.setState({ creditBalance: Number(user.creditBalance), creditLimit: Number(user.creditLimit) });
      return user;
    },
  });

  // 2. Fetch True Immutable Ledger History (Matches Admin View)
  const { data: ledgerEntries = [], isLoading: isLoadingLedger } = useQuery({
    queryKey: ['rep-ledger-history'],
    queryFn: async () => {
      // Fetching page 1, 20 items to populate the recent view
      const response = await apiClient.get('/ledger', { params: { page: 1, limit: 20 } });
      return response.data?.data?.entries || [];
    }
  });

  // 3. Fetch Banks
  const { data: banks = ['CBE', 'Awash Bank', 'Dashen Bank', 'Telebirr', 'Abyssinia'] } = useQuery({
    queryKey: ['active-banks'],
    queryFn: async () => {
      const response = await apiClient.get('/payments/banks');
      return response.data?.data?.length > 0 ? response.data.data : ['CBE', 'Awash Bank', 'Dashen Bank', 'Telebirr', 'Abyssinia'];
    },
    initialData: ['CBE', 'Awash Bank', 'Dashen Bank', 'Telebirr', 'Abyssinia']
  });

  const fetchMyInventory = async () => {
    setIsLoadingInventory(true);
    try {
      const response = await apiClient.get('/inventory/my-stock');
      setRepInventory(response.data?.data || []);
    } catch (error) { console.error(error); } 
    finally { setIsLoadingInventory(false); }
  };

  useEffect(() => {
    if (isRefundModalVisible) fetchMyInventory();
    else { setReturnCart({}); setReturnReason(''); }
  }, [isRefundModalVisible]);

  const returnTotal = Object.entries(returnCart).reduce((total, [id, qty]) => {
    const item = repInventory.find(s => s.id === id);
    return total + (item ? item.sellingPrice * qty : 0);
  }, 0);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.3, base64: true });
    if (!result.canceled && result.assets) setReceiptUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
  };

  const handleUpload = async () => {
    if (!uploadAmount || !receiptUri || !bankName.trim()) return Alert.alert('Error', 'Please enter an amount, select a bank, and attach a screenshot.');
    setIsUploading(true);
    try {
      await apiClient.post('/payments', { amount: Number(uploadAmount), bankName: bankName.trim(), receipeImageUrl: receiptUri, reasonRemark: uploadNotes });
      Alert.alert('Success', 'Payment proof submitted to admin for review. It will appear on your ledger once approved.');
      setIsUploadFormOpen(false); setUploadAmount(''); setUploadNotes(''); setBankName(''); setReceiptUri(null);
    } catch (error: any) { Alert.alert('Submission Failed', error.response?.data?.message || 'Network request failed.'); } 
    finally { setIsUploading(false); }
  };

  const updateReturnDelta = (id: string, delta: number, maxHeld: number) => {
    setReturnCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(current + delta, maxHeld));
      const updated = { ...prev };
      if (next === 0) delete updated[id]; else updated[id] = next;
      return updated;
    });
  };

  const handleReturnStock = async () => {
    if (!returnReason.trim()) return Alert.alert("Reason Required", "Please specify why you are returning these items.");
    setIsReturning(true);
    try {
      await apiClient.post('/returns', { items: Object.entries(returnCart).map(([id, qty]) => ({ itemId: id, quantity: qty })), totalValue: returnTotal, reason: returnReason.trim() });
      Alert.alert("Success", "Return request sent to Admin.");
      setIsRefundModalVisible(false);
    } catch (error: any) { Alert.alert('Error', error.response?.data?.message || 'Network request failed.'); } 
    finally { setIsReturning(false); }
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.bg, paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} translucent />

      <View style={[styles.header, { borderBottomColor: theme.border, borderBottomWidth: isDarkMode ? StyleSheet.hairlineWidth : 1 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><Ionicons name="arrow-back" size={26} color={theme.text} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Ledger</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* DEBT CARD */}
        <View style={[styles.debtCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={styles.debtHeaderRow}>
            <Text style={[styles.debtTitle, { color: theme.textMuted }]}>OUTSTANDING DEBT</Text>
            <Ionicons name="wallet-outline" size={20} color={theme.textMuted} />
          </View>
          <Text style={[styles.debtAmount, { color: theme.text }]}>ETB {creditBalance.toLocaleString()}</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${debtPercentage}%`, backgroundColor: debtPercentage > 85 ? '#DC2626' : theme.primary }]} />
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionGroupContainer}>
          <View style={[styles.actionCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: 1 }]}>
            <TouchableOpacity style={styles.actionTrigger} onPress={() => setIsUploadFormOpen(!isUploadFormOpen)}>
              <View style={styles.actionHeaderLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF' }]}><Ionicons name="receipt-outline" size={20} color={isDarkMode ? theme.text : "#1D61F2"} /></View>
                <Text style={[styles.actionTitle, { color: theme.text }]}>Submit Payment Proof</Text>
              </View>
              <Ionicons name={isUploadFormOpen ? "chevron-up" : "chevron-down"} size={20} color={theme.textMuted} />
            </TouchableOpacity>

            {isUploadFormOpen && (
              <View style={[styles.actionBody, { borderTopColor: theme.border }]}>
                <Text style={[styles.label, { color: theme.text }]}>Amount Deposited (ETB)</Text>
                <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="0.00" placeholderTextColor={theme.textMuted} keyboardType="numeric" value={uploadAmount} onChangeText={setUploadAmount} />
                <Text style={[styles.label, { color: theme.text }]}>Select Bank / Platform</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bankChipsContainer}>
                  {banks.map((bank: string) => (
                    <TouchableOpacity key={bank} style={[styles.bankChip, { backgroundColor: bankName === bank ? theme.invertedBg : theme.inputBg, borderColor: bankName === bank ? theme.invertedBg : theme.border }]} onPress={() => setBankName(bank)}>
                      <Text style={{ color: bankName === bank ? theme.invertedText : theme.text, fontWeight: '600' }}>{bank}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Text style={[styles.label, { color: theme.text, marginTop: 4 }]}>Transaction Screenshot (Required)</Text>
                <TouchableOpacity style={[styles.uploadImageBtn, { borderColor: theme.border, backgroundColor: theme.inputBg, padding: receiptUri ? 0 : 16 }]} onPress={pickImage}>
                  {receiptUri ? <Image source={{ uri: receiptUri }} style={{ width: '100%', height: 120, borderRadius: 12 }} resizeMode="cover" /> : <><Ionicons name="camera" size={24} color={theme.textMuted} /><Text style={[styles.uploadImageText, { color: theme.textMuted }]}>Attach Photo</Text></>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg }, isUploading && { opacity: 0.7 }]} onPress={handleUpload} disabled={isUploading}>
                  {isUploading ? <ActivityIndicator color={theme.invertedText} /> : <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Submit to Admin</Text>}
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={[styles.actionCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: 1 }]}>
            <TouchableOpacity style={styles.actionTrigger} onPress={() => setIsRefundModalVisible(true)}>
              <View style={styles.actionHeaderLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#1E293B' : '#FFF1F2' }]}><Ionicons name="return-down-back" size={20} color="#E11D48" /></View>
                <Text style={[styles.actionTitle, { color: theme.text }]}>Request Stock Return</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- MINIMALIST RECENT LEDGER --- */}
        <View style={styles.historySection}>
          <View style={styles.historyHeaderRow}>
            <Text style={[styles.historyTitle, { color: theme.text }]}>RECENT LEDGER</Text>
            <Text style={[styles.limitTextSmall, { color: theme.text }]}>Limit: ETB {creditLimit.toLocaleString()}</Text>
          </View>
          
          <View style={styles.ledgerListContainer}>
            {isLoadingLedger ? (
              <ActivityIndicator color={theme.primary} style={{ marginTop: 20 }} />
            ) : ledgerEntries.length === 0 ? (
              <Text style={{ color: theme.textMuted, textAlign: 'center', marginTop: 16 }}>No ledger entries found.</Text>
            ) : (
              ledgerEntries.map((entry: any) => {
                // If the Sales Rep is the "fromEntity", they paid money or returned stock (Debt Decreased)
                const isPayment = entry.fromEntity === 'SALES_REP'; 
                const iconName = isPayment ? "checkmark-circle" : "arrow-down-circle";
                const sign = isPayment ? "-" : "+";
                
                // Format date to MM/DD/YYYY
                const dateObj = new Date(entry.transactionDate);
                const dateStr = `${String(dateObj.getMonth() + 1).padStart(2, '0')}/${String(dateObj.getDate()).padStart(2, '0')}/${dateObj.getFullYear()}`;

                return (
                  <View key={entry.id} style={[styles.ledgerRow, { backgroundColor: theme.rowBg, borderColor: theme.border }]}>
                    <View style={styles.ledgerLeft}>
                      <Ionicons name={iconName} size={24} color={isPayment ? '#059669' : '#DC2626'} />
                      <Text style={[styles.ledgerDate, { color: theme.text }]}>{dateStr}</Text>
                    </View>
                    <Text style={[styles.ledgerAmount, { color: theme.text }]}>
                      {sign} ETB {Number(entry.amount).toLocaleString()}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        </View>

      </ScrollView>

      {/* RETURN MODAL */}
      <Modal visible={isRefundModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: 1 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Return Checked-Out Stock</Text>
              <TouchableOpacity onPress={() => setIsRefundModalVisible(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color={theme.textMuted} /></TouchableOpacity>
            </View>
            <ScrollView style={styles.returnList} showsVerticalScrollIndicator={false}>
              {isLoadingInventory ? <ActivityIndicator color={theme.invertedBg} style={{ marginTop: 20 }} /> : repInventory.length === 0 ? <Text style={{ color: theme.textMuted, textAlign: 'center', marginTop: 20, fontStyle: 'italic' }}>You currently have no checked-out items to return.</Text> : repInventory.map(item => {
                  const currentQty = returnCart[item.id] || 0;
                  const itemName = item.name || item.inventory?.name || 'Unknown Item';
                  const itemPrice = item.sellingPrice || item.inventory?.sellingPrice || 0;
                  const qtyHeld = item.qtyHeld || item.quantity || 0;
                  return (
                    <View key={item.id} style={[styles.returnItemRow, { borderBottomColor: theme.border }]}>
                      <View style={{ flex: 1, paddingRight: 10 }}><Text style={[styles.returnItemName, { color: theme.text }]} numberOfLines={1}>{itemName}</Text><Text style={[styles.returnItemPrice, { color: theme.textMuted }]}>Held: {qtyHeld} | Value: ETB {itemPrice}</Text></View>
                      <View style={[styles.stepper, { backgroundColor: theme.inputBg }]}>
                        <TouchableOpacity style={[styles.stepBtn, { borderColor: theme.border }]} onPress={() => updateReturnDelta(item.id, -1, qtyHeld)} disabled={currentQty === 0}><Ionicons name="remove" size={16} color={currentQty === 0 ? theme.textMuted : theme.text} /></TouchableOpacity>
                        <Text style={[styles.stepQtyText, { color: theme.text }]}>{currentQty}</Text>
                        <TouchableOpacity style={[styles.stepBtn, { borderColor: theme.border }]} onPress={() => updateReturnDelta(item.id, 1, qtyHeld)} disabled={currentQty >= qtyHeld}><Ionicons name="add" size={16} color={currentQty >= qtyHeld ? theme.textMuted : theme.text} /></TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
            {returnTotal > 0 && (
              <View style={{ marginTop: 16 }}><Text style={[styles.label, { color: theme.text }]}>Reason for Return</Text><TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, height: 80, marginBottom: 0 }]} placeholder="e.g. Items expired, damaged packaging..." placeholderTextColor={theme.textMuted} multiline value={returnReason} onChangeText={setReturnReason} /></View>
            )}
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: returnTotal > 0 ? '#E11D48' : (isDarkMode ? '#1E293B' : '#E2E8F0'), marginTop: 16 }]} onPress={handleReturnStock} disabled={returnTotal === 0 || isReturning}>
              {isReturning ? <ActivityIndicator color="#FFFFFF" /> : <Text style={[styles.submitBtnText, { color: returnTotal > 0 ? '#FFFFFF' : theme.textMuted }]}>Submit Return (ETB {returnTotal.toLocaleString()})</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 }, 
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }, 
  backBtn: { padding: 4, marginLeft: -4 }, 
  headerTitle: { fontSize: 18, fontWeight: '800' }, 
  scrollContent: { paddingHorizontal: 20, paddingBottom: 60, paddingTop: 16 }, 
  debtCard: { padding: 24, borderRadius: 24, marginBottom: 20 }, 
  debtHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, 
  debtTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5 }, 
  debtAmount: { fontSize: 32, fontWeight: '900', letterSpacing: -1, marginBottom: 16 }, 
  progressContainer: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }, 
  progressBar: { height: '100%', borderRadius: 3 }, 
  actionGroupContainer: { marginBottom: 32, gap: 12 }, 
  actionCard: { borderRadius: 24, overflow: 'hidden' }, 
  actionTrigger: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }, 
  actionHeaderLeft: { flexDirection: 'row', alignItems: 'center' }, 
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 }, 
  actionTitle: { fontSize: 16, fontWeight: '700' }, 
  actionBody: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 16, borderTopWidth: 1 }, 
  label: { fontSize: 13, fontWeight: '700', marginBottom: 8 }, 
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '600', marginBottom: 16 }, 
  bankChipsContainer: { flexDirection: 'row', marginBottom: 16 },
  bankChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, marginRight: 8 },
  uploadImageBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderWidth: 1, borderStyle: 'dashed', borderRadius: 12, marginBottom: 20, overflow: 'hidden' }, 
  uploadImageText: { fontWeight: '700', marginLeft: 8, fontSize: 15 }, 
  submitBtn: { paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }, 
  submitBtnText: { fontSize: 16, fontWeight: '800' }, 
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }, 
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' }, 
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, 
  sheetTitle: { fontSize: 20, fontWeight: '800' }, 
  closeBtn: { padding: 4 }, 
  returnList: { maxHeight: 250, marginBottom: 10 }, 
  returnItemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth }, 
  returnItemName: { fontSize: 15, fontWeight: '700', marginBottom: 4 }, 
  returnItemPrice: { fontSize: 13, fontWeight: '600' }, 
  stepper: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, padding: 4 }, 
  stepBtn: { width: 32, height: 32, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }, 
  stepQtyText: { width: 32, textAlign: 'center', fontSize: 15, fontWeight: '700' },
  historySection: { marginTop: 10, paddingBottom: 20 },
  historyHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  historyTitle: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  limitTextSmall: { fontSize: 13, fontWeight: '700' },
  ledgerListContainer: { gap: 10 },
  ledgerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 18, borderRadius: 16, borderWidth: 1 },
  ledgerLeft: { flexDirection: 'row', alignItems: 'center' },
  ledgerDate: { fontSize: 15, fontWeight: '700', marginLeft: 12 },
  ledgerAmount: { fontSize: 15, fontWeight: '700' }
});