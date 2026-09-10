import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, Alert, Platform, StatusBar, Image, ActivityIndicator, Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../api/client';

export default function RepLedgerScreen() {
  const router = useRouter();
  const isDarkMode = useAuthStore((state) => state.isDarkMode);

  // Payment Upload State
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [uploadAmount, setUploadAmount] = useState('');
  const [bankName, setBankName] = useState(''); 
  const [uploadNotes, setUploadNotes] = useState(''); 
  const [receiptUri, setReceiptUri] = useState<string | null>(null); 
  const [isUploading, setIsUploading] = useState(false);

  // Return Stock State
  const [isRefundModalVisible, setIsRefundModalVisible] = useState(false);
  const [returnCart, setReturnCart] = useState<Record<string, number>>({});
  const [returnReason, setReturnReason] = useState('');
  const [isReturning, setIsReturning] = useState(false);

  // TRUE REP INVENTORY STATE
  const [repInventory, setRepInventory] = useState<any[]>([]);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);

  // Live Balances
  const creditBalance = useAuthStore((state) => state.creditBalance) || 0;
  const creditLimit = useAuthStore((state) => state.creditLimit) || 0;
  const debtPercentage = creditLimit > 0 ? Math.min((creditBalance / creditLimit) * 100, 100) : 0;

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

  // 1. LIVE DEBT SYNC: Refresh the user's financial profile on mount
  useQuery({
    queryKey: ['rep-profile-financials-ledger'],
    queryFn: async () => {
      const response = await apiClient.get('/auth/me'); 
      const user = response.data.data;
      useAuthStore.setState({
        creditBalance: Number(user.creditBalance),
        creditLimit: Number(user.creditLimit)
      });
      return user;
    },
  });

  // 2. DYNAMIC BANKS: Fetch admin-configured banks (with safe fallbacks)
  const { data: banks = ['CBE', 'Awash Bank', 'Dashen Bank', 'Telebirr', 'Abyssinia'] } = useQuery({
    queryKey: ['active-banks'],
    queryFn: async () => {
      // Assuming you will build a /payments/banks endpoint for admins to manage
      const response = await apiClient.get('/payments/banks');
      return response.data?.data?.length > 0 ? response.data.data : ['CBE', 'Awash Bank', 'Dashen Bank', 'Telebirr', 'Abyssinia'];
    },
    initialData: ['CBE', 'Awash Bank', 'Dashen Bank', 'Telebirr', 'Abyssinia']
  });

  // 3. FETCH REP'S ISSUED STOCK (Fixed Network Issue)
  const fetchMyInventory = async () => {
    setIsLoadingInventory(true);
    try {
      const response = await apiClient.get('/inventory/my-stock');
      setRepInventory(response.data?.data || []);
    } catch (error) {
      console.error("Fetch inventory error:", error);
    } finally {
      setIsLoadingInventory(false);
    }
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
    let result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      quality: 0.3, 
      base64: true 
    });
    if (!result.canceled && result.assets) {
      setReceiptUri(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleUpload = async () => {
    if (!uploadAmount || !receiptUri || !bankName.trim()) {
      Alert.alert('Error', 'Please enter an amount, select a bank, and attach a screenshot.');
      return;
    }
    setIsUploading(true);
    try {
      // TxRef removed for V1
      const payload = { 
        amount: Number(uploadAmount), 
        bankName: bankName.trim(), 
        receipeImageUrl: receiptUri, 
        reasonRemark: uploadNotes 
      };
      
      await apiClient.post('/payments', payload);
      
      Alert.alert('Success', 'Payment proof submitted to admin for review.');
      setIsUploadFormOpen(false); 
      setUploadAmount(''); 
      setUploadNotes(''); 
      setBankName(''); 
      setReceiptUri(null);
      
    } catch (error: any) { 
      const errorMsg = error.response?.data?.message || 'Network request failed.';
      Alert.alert('Submission Failed', errorMsg); 
    } finally { 
      setIsUploading(false); 
    }
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
    if (!returnReason.trim()) {
      Alert.alert("Reason Required", "Please specify why you are returning these items.");
      return;
    }
    setIsReturning(true);
    try {
      const payload = {
        items: Object.entries(returnCart).map(([id, qty]) => ({ itemId: id, quantity: qty })),
        totalValue: returnTotal,
        reason: returnReason.trim()
      };
      
      await apiClient.post('/returns', payload);
      
      Alert.alert("Success", "Return request sent to Admin. Your debt will decrease once approved.");
      setIsRefundModalVisible(false);
      
    } catch (error: any) { 
      const errorMsg = error.response?.data?.message || 'Network request failed.';
      Alert.alert('Error', errorMsg); 
    } finally { 
      setIsReturning(false); 
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      <View style={[styles.header, { borderBottomColor: theme.border, borderBottomWidth: isDarkMode ? StyleSheet.hairlineWidth : 1 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Ledger</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.debtCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
          <View style={styles.debtHeaderRow}>
            <Text style={[styles.debtTitle, { color: theme.textMuted }]}>OUTSTANDING DEBT</Text>
            <Ionicons name="wallet-outline" size={20} color={theme.textMuted} />
          </View>
          <Text style={[styles.debtAmount, { color: theme.text }]}>ETB {creditBalance.toLocaleString()}</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${debtPercentage}%`, backgroundColor: debtPercentage > 85 ? '#DC2626' : theme.primary }]} />
          </View>
          <Text style={[styles.limitText, { color: theme.textMuted }]}>Credit Limit: ETB {creditLimit.toLocaleString()}</Text>
        </View>

        <View style={styles.actionGroupContainer}>
          {/* Payment Proof Accordion */}
          <View style={[styles.actionCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <TouchableOpacity style={styles.actionTrigger} onPress={() => setIsUploadFormOpen(!isUploadFormOpen)}>
              <View style={styles.actionHeaderLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#0F1419' : '#EFF6FF' }]}>
                  <Ionicons name="receipt-outline" size={20} color="#1D61F2" />
                </View>
                <Text style={[styles.actionTitle, { color: theme.text }]}>Submit Payment Proof</Text>
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
                
                <Text style={[styles.label, { color: theme.text }]}>Select Bank / Platform</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bankChipsContainer}>
                  {banks.map((bank: string) => (
                    <TouchableOpacity 
                      key={bank}
                      style={[
                        styles.bankChip, 
                        { 
                          backgroundColor: bankName === bank ? theme.invertedBg : theme.inputBg,
                          borderColor: bankName === bank ? theme.invertedBg : theme.border
                        }
                      ]}
                      onPress={() => setBankName(bank)}
                    >
                      <Text style={{ 
                        color: bankName === bank ? theme.invertedText : theme.text, 
                        fontWeight: '600' 
                      }}>
                        {bank}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                
                <Text style={[styles.label, { color: theme.text, marginTop: 4 }]}>Transaction Screenshot (Required)</Text>
                <TouchableOpacity 
                  style={[styles.uploadImageBtn, { borderColor: theme.border, backgroundColor: theme.inputBg, overflow: 'hidden', padding: receiptUri ? 0 : 16 }]} 
                  onPress={pickImage}
                >
                  {receiptUri ? (
                    <Image source={{ uri: receiptUri }} style={{ width: '100%', height: 120, borderRadius: 12 }} resizeMode="cover" />
                  ) : (
                    <>
                      <Ionicons name="camera" size={24} color={theme.primary} />
                      <Text style={[styles.uploadImageText, { color: theme.primary }]}>Attach Photo</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.submitBtn, { backgroundColor: theme.invertedBg }, isUploading && { opacity: 0.7 }]} 
                  onPress={handleUpload} 
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <ActivityIndicator color={theme.invertedText} />
                  ) : (
                    <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Submit to Admin</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Return Stock Trigger */}
          <View style={[styles.actionCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <TouchableOpacity style={styles.actionTrigger} onPress={() => setIsRefundModalVisible(true)}>
              <View style={styles.actionHeaderLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF1F2' }]}>
                  <Ionicons name="return-down-back" size={20} color="#E11D48" />
                </View>
                <Text style={[styles.actionTitle, { color: theme.text }]}>Request Stock Return</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.textMuted} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Return Stock Modal */}
      <Modal visible={isRefundModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Return Checked-Out Stock</Text>
              <TouchableOpacity onPress={() => setIsRefundModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.returnList} showsVerticalScrollIndicator={false}>
              {isLoadingInventory ? (
                <ActivityIndicator color={theme.primary} style={{ marginTop: 20 }} />
              ) : repInventory.length === 0 ? (
                <Text style={{ color: theme.textMuted, textAlign: 'center', marginTop: 20, fontStyle: 'italic' }}>
                  You currently have no checked-out items to return.
                </Text>
              ) : (
                repInventory.map(item => {
                  const currentQty = returnCart[item.id] || 0;
                  const itemName = item.name || item.inventory?.name || 'Unknown Item';
                  const itemPrice = item.sellingPrice || item.inventory?.sellingPrice || 0;
                  const qtyHeld = item.qtyHeld || item.quantity || 0;
                  
                  return (
                    <View key={item.id} style={[styles.returnItemRow, { borderBottomColor: theme.border }]}>
                      <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={[styles.returnItemName, { color: theme.text }]} numberOfLines={1}>{itemName}</Text>
                        <Text style={[styles.returnItemPrice, { color: theme.textMuted }]}>Held: {qtyHeld} | Value: ETB {itemPrice}</Text>
                      </View>
                      <View style={[styles.stepper, { backgroundColor: theme.inputBg }]}>
                        <TouchableOpacity style={[styles.stepBtn, { borderColor: theme.border }]} onPress={() => updateReturnDelta(item.id, -1, qtyHeld)} disabled={currentQty === 0}>
                          <Ionicons name="remove" size={16} color={currentQty === 0 ? theme.textMuted : theme.text} />
                        </TouchableOpacity>
                        <Text style={[styles.stepQtyText, { color: theme.text }]}>{currentQty}</Text>
                        <TouchableOpacity style={[styles.stepBtn, { borderColor: theme.border }]} onPress={() => updateReturnDelta(item.id, 1, qtyHeld)} disabled={currentQty >= qtyHeld}>
                          <Ionicons name="add" size={16} color={currentQty >= qtyHeld ? theme.textMuted : theme.text} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              )}
            </ScrollView>

            {returnTotal > 0 && (
              <View style={{ marginTop: 16 }}>
                <Text style={[styles.label, { color: theme.text }]}>Reason for Return</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, height: 80, marginBottom: 0 }]} 
                  placeholder="e.g. Items expired, damaged packaging, or unsold..." 
                  placeholderTextColor={theme.textMuted} 
                  multiline 
                  value={returnReason} 
                  onChangeText={setReturnReason} 
                />
              </View>
            )}

            <TouchableOpacity 
              style={[styles.submitBtn, { backgroundColor: returnTotal > 0 ? '#E11D48' : (isDarkMode ? '#2F3336' : '#E2E8F0'), marginTop: 16 }]} 
              onPress={handleReturnStock}
              disabled={returnTotal === 0 || isReturning}
            >
              {isReturning ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={[styles.submitBtnText, { color: returnTotal > 0 ? '#FFFFFF' : theme.textMuted }]}>
                  Submit Return (ETB {returnTotal.toLocaleString()})
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
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
  debtCard: { padding: 24, borderRadius: 24, marginBottom: 20 }, 
  debtHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, 
  debtTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5 }, 
  debtAmount: { fontSize: 32, fontWeight: '900', letterSpacing: -1, marginBottom: 16 }, 
  progressContainer: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginBottom: 12, overflow: 'hidden' }, 
  progressBar: { height: '100%', borderRadius: 3 }, 
  limitText: { fontSize: 13, fontWeight: '600' }, 
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
  uploadImageBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderWidth: 1, borderStyle: 'dashed', borderRadius: 12, marginBottom: 20 }, 
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
  stepQtyText: { width: 32, textAlign: 'center', fontSize: 15, fontWeight: '700' }
});