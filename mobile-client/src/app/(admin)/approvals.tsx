import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, StatusBar, Modal, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const BASE_URL = 'http://172.30.75.101:5000/api/v1';


const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http')) return url;
  return `${BASE_IP}${url}`;
};

export default function ApprovalsScreen() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => (state as any).token); 
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const isAdmin = role === 'ADMIN' || role === null;

  // Tab State
  const [activeTab, setActiveTab] = useState<'PAYMENTS' | 'RETURNS'>('PAYMENTS');

  // Data States
  const [receipts, setReceipts] = useState<any[]>([]);
  const [pendingReturns, setPendingReturns] = useState<any[]>([
    // Mock data until backend route is live
    { id: 'ret_1', repName: 'Fetehadin Negash', reason: 'Items packaging damaged during transit.', totalValue: 1900, items: [{ name: 'Cooking Oil 5L', qty: 2 }] }
  ]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Modals State
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchPendingData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_IP}/api/v1/payments/pending`, { headers: { Authorization: `Bearer ${token}` } });
      const json = await response.json();
      if (response.ok) setReceipts(json.data || []);
      
      // TODO: Fetch pending returns when backend is ready
      // const retRes = await fetch(`${BASE_IP}/api/v1/returns/pending`, { headers: { Authorization: `Bearer ${token}` } });
      // const retJson = await retRes.json();
      // if (retRes.ok) setPendingReturns(retJson.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchPendingData();
  }, [isAdmin]);

  // Payment Handlers
  const handleApprove = async (id: string) => {
    Alert.alert("Confirm Approval", "Are you sure you want to approve this receipt and deduct the rep's debt?", [
      { text: "Cancel", style: "cancel" },
      { text: "Approve", style: "default", onPress: async () => {
          setIsProcessing(true);
          try {
            const res = await fetch(`${BASE_IP}/api/v1/payments/${id}/approve`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ adminRemark: 'Approved via Admin App' })
            });
            if (res.ok) {
              setReceipts(prev => prev.filter(r => r.id !== id));
              Alert.alert('Success', 'Payment approved and ledger updated.');
            } else {
              const err = await res.json();
              Alert.alert('Error', err.message || 'Failed to approve.');
            }
          } catch (error) { Alert.alert('Error', 'Network request failed.'); } finally { setIsProcessing(false); }
        }
      }
    ]);
  };

  const openRejectModal = (id: string) => { setActiveReceiptId(id); setIsRejectModalVisible(true); };

  const handleConfirmReject = async () => {
    if (!activeReceiptId) return;
    setIsProcessing(true);
    try {
      const res = await fetch(`${BASE_IP}/api/v1/payments/${activeReceiptId}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ adminRemark: rejectReason }) 
      });
      if (res.ok) {
        setReceipts(prev => prev.filter(r => r.id !== activeReceiptId));
        setIsRejectModalVisible(false);
        setRejectReason('');
      } else {
        const err = await res.json();
        Alert.alert('Error', err.message || 'Failed to reject.');
      }
    } catch (error) { Alert.alert('Error', 'Network request failed.'); } finally { setIsProcessing(false); }
  };

  const openImageViewer = (imageUrl: string) => { setSelectedImage(resolveImageUrl(imageUrl)); setIsImageViewerVisible(true); };

  // Return Handlers
  const handleProcessReturn = async (id: string, destination: 'WAREHOUSE' | 'SUPPLIER') => {
    Alert.alert("Confirm Action", `Direct items to ${destination === 'WAREHOUSE' ? 'Warehouse Stock' : 'Supplier Return'} and deduct ETB value from rep's debt?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm", onPress: async () => {
          setIsProcessing(true);
          try {
            // TODO: Wire to backend router when ready
            // await fetch(`${BASE_IP}/api/v1/returns/${id}/approve`, { method: 'POST', body: JSON.stringify({ destination }) });
            setPendingReturns(prev => prev.filter(r => r.id !== id));
            Alert.alert('Success', 'Return processed and rep debt updated.');
          } catch (error) { Alert.alert('Error', 'Failed to process return.'); } finally { setIsProcessing(false); }
      }}
    ]);
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC', text: isDarkMode ? '#E7E9EA' : '#0F172A', textMuted: isDarkMode ? '#71767B' : '#64748B', border: isDarkMode ? '#2F3336' : '#E2E8F0', invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5', invertedText: isDarkMode ? '#000000' : '#FFFFFF', cardBg: isDarkMode ? '#000000' : '#FFFFFF', docBg: isDarkMode ? '#1E293B' : '#F1F5F9', inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.unauthorizedContainer}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={styles.unauthorizedTitle}>Access Restricted</Text>
        <Text style={styles.unauthorizedSubtitle}>This portal is exclusively for system administrators.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(rep)/pos')}><Text style={styles.backButtonText}>Return to POS</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => router.replace('/(admin)/dashboard')}><Ionicons name="arrow-back-outline" size={26} color={theme.text} /></TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Approvals Desk</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'PAYMENTS' && { borderBottomColor: theme.invertedBg, borderBottomWidth: 2 }]} onPress={() => setActiveTab('PAYMENTS')}>
          <Text style={[styles.tabText, { color: activeTab === 'PAYMENTS' ? theme.text : theme.textMuted }]}>Financial Receipts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'RETURNS' && { borderBottomColor: theme.invertedBg, borderBottomWidth: 2 }]} onPress={() => setActiveTab('RETURNS')}>
          <Text style={[styles.tabText, { color: activeTab === 'RETURNS' ? theme.text : theme.textMuted }]}>Stock Returns</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        {activeTab === 'PAYMENTS' && (
          <View style={styles.feedContainer}>
            {isLoading ? <ActivityIndicator size="large" color="#177CA5" style={{ marginTop: 60 }} />
            : receipts.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-done-circle-outline" size={48} color={theme.textMuted} />
                <Text style={[styles.emptyStateTitle, { color: theme.text }]}>All Caught Up</Text>
                <Text style={[styles.emptyStateSub, { color: theme.textMuted }]}>There are no pending receipts to verify.</Text>
              </View>
            ) : (
              receipts.map((item) => (
                <View key={item.id} style={[styles.approvalCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
                  <View style={styles.leftAccentBar} />
                  <View style={styles.cardMainContent}>
                    <View style={styles.cardHeaderRow}>
                      <View style={styles.repMetaRow}>
                        <View style={[styles.bankIconBox, isDarkMode && { backgroundColor: '#1E293B' }]}><Ionicons name="business-outline" size={20} color="#177CA5" /></View>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.repName, { color: theme.text }]} numberOfLines={1}>{item.senderName || item.user?.fullName || 'Unknown Sender'}</Text>
                          <Text style={[styles.bankDetails, { color: theme.textMuted }]} numberOfLines={1}>Ref: {item.transactionRedId}</Text>
                          <Text style={[styles.bankDetails, { color: theme.text }]}>Bank: {item.bankName}</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[styles.amountText, { color: theme.text }]}>ETB {parseFloat(item.amount).toLocaleString()}</Text>
                        <Text style={[styles.timestampText, { color: theme.textMuted }]}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                      </View>
                    </View>

                    <View style={[styles.docPreviewBox, { backgroundColor: theme.docBg }]}>
                      {item.receipeImageUrl ? (
                        <TouchableOpacity onPress={() => openImageViewer(item.receipeImageUrl)}>
                          <Image source={{ uri: resolveImageUrl(item.receipeImageUrl) }} style={styles.docThumbnailImage} />
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.docThumbnail}><Ionicons name="document-text-outline" size={24} color="#64748B" /></View>
                      )}
                      <View style={styles.docInfo}>
                        <Text style={[styles.docName, { color: theme.text }]} numberOfLines={1}>Attached Receipt</Text>
                        {item.receipeImageUrl && (
                          <TouchableOpacity onPress={() => openImageViewer(item.receipeImageUrl)}><Text style={styles.viewDocLink}>View Document</Text></TouchableOpacity>
                        )}
                      </View>
                    </View>

                    {item.reasonRemark && <Text style={{ color: theme.textMuted, fontSize: 13, marginBottom: 16, fontStyle: 'italic' }}>" {item.reasonRemark} "</Text>}

                    <View style={styles.actionRow}>
                      <TouchableOpacity style={[styles.approveBtn, isProcessing && { opacity: 0.5 }]} onPress={() => handleApprove(item.id)} disabled={isProcessing}>
                        <Ionicons name="finger-print" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.approveBtnText}>Approve & Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.rejectBtn, isDarkMode && { borderColor: theme.border }, isProcessing && { opacity: 0.5 }]} onPress={() => openRejectModal(item.id)} disabled={isProcessing}>
                        <Ionicons name="close" size={18} color="#DC2626" style={{ marginRight: 4 }} />
                        <Text style={styles.rejectBtnText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {activeTab === 'RETURNS' && (
          <View style={styles.feedContainer}>
            {pendingReturns.length === 0 ? (
               <View style={styles.emptyState}>
                 <Ionicons name="cube-outline" size={48} color={theme.textMuted} />
                 <Text style={[styles.emptyStateTitle, { color: theme.text }]}>No Returns</Text>
                 <Text style={[styles.emptyStateSub, { color: theme.textMuted }]}>There are no pending stock returns.</Text>
               </View>
            ) : (
              pendingReturns.map(ret => (
                <View key={ret.id} style={[styles.approvalCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
                  <View style={[styles.leftAccentBar, { backgroundColor: '#E11D48' }]} />
                  <View style={styles.cardMainContent}>
                    <View style={styles.cardHeaderRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.repName, { color: theme.text }]}>{ret.repName}</Text>
                        <Text style={{ color: theme.textMuted, fontSize: 12 }}>Requests Stock Return</Text>
                      </View>
                      <Text style={[styles.amountText, { color: theme.text }]}>ETB {ret.totalValue.toLocaleString()}</Text>
                    </View>

                    <View style={[styles.docPreviewBox, { backgroundColor: theme.docBg, flexDirection: 'column', alignItems: 'flex-start' }]}>
                      <Text style={{ fontSize: 13, fontWeight: '700', color: theme.text, marginBottom: 6 }}>Returned Items:</Text>
                      {ret.items.map((i: any, idx: number) => (
                        <Text key={idx} style={{ fontSize: 13, color: theme.textMuted }}>• {i.qty}x {i.name}</Text>
                      ))}
                    </View>

                    <Text style={{ color: theme.textMuted, fontSize: 13, marginBottom: 16, fontStyle: 'italic' }}>
                      Reason: "{ret.reason}"
                    </Text>

                    <View style={{ gap: 8 }}>
                      <TouchableOpacity style={[styles.approveReturnBtn, { backgroundColor: '#059669' }]} onPress={() => handleProcessReturn(ret.id, 'WAREHOUSE')}>
                        <Ionicons name="cube-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
                        <Text style={styles.approveBtnText}>Accept & Return to Stock</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.approveReturnBtn, { backgroundColor: '#D97706' }]} onPress={() => handleProcessReturn(ret.id, 'SUPPLIER')}>
                        <Ionicons name="swap-horizontal-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
                        <Text style={styles.approveBtnText}>Accept & Route to Supplier</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Reject Modal */}
      <Modal visible={isRejectModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Reject Receipt</Text>
              <TouchableOpacity onPress={() => setIsRejectModalVisible(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color={theme.textMuted} /></TouchableOpacity>
            </View>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Reason for Rejection</Text>
            <TextInput style={[styles.textArea, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="e.g. The uploaded image is blurry and illegible..." placeholderTextColor={theme.textMuted} multiline numberOfLines={4} value={rejectReason} onChangeText={setRejectReason} autoFocus />
            <Text style={[styles.helperText, { color: theme.textMuted }]}>This note will be sent directly to the agent to help them correct and re-submit the payment.</Text>
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#DC2626' }]} onPress={handleConfirmReject} disabled={!rejectReason.trim() || isProcessing}>
              <Text style={[styles.submitBtnText, { color: '#FFFFFF' }, (!rejectReason.trim() || isProcessing) && { opacity: 0.7 }]}>{isProcessing ? 'Processing...' : 'Confirm Rejection'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Image Viewer Modal */}
      <Modal visible={isImageViewerVisible} animationType="fade" transparent>
        <View style={styles.viewerOverlay}>
          <TouchableOpacity style={styles.viewerCloseBtn} onPress={() => setIsImageViewerVisible(false)}><Ionicons name="close-circle" size={40} color="#FFFFFF" /></TouchableOpacity>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />}
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }, headerLeft: { flexDirection: 'row', alignItems: 'center' }, menuButton: { marginRight: 12 }, headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16 }, tab: { flex: 1, paddingVertical: 12, alignItems: 'center' }, tabText: { fontSize: 14, fontWeight: '700' },
  scrollContentDark: { paddingBottom: 24, paddingTop: 16 }, scrollContentLight: { paddingBottom: 130, paddingTop: 16 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }, emptyStateTitle: { fontSize: 20, fontWeight: '800', marginTop: 16, marginBottom: 8 }, emptyStateSub: { fontSize: 14, textAlign: 'center' },
  feedContainer: { paddingHorizontal: 20 }, approvalCard: { borderRadius: 20, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' }, lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 }, leftAccentBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, backgroundColor: '#177CA5' }, cardMainContent: { paddingLeft: 6 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }, repMetaRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }, bankIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 }, repName: { fontSize: 16, fontWeight: '800', marginBottom: 2 }, bankDetails: { fontSize: 12, fontWeight: '500' }, amountText: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5 }, timestampText: { fontSize: 11, marginTop: 4, fontWeight: '500' },
  docPreviewBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 16 }, docThumbnail: { width: 40, height: 40, backgroundColor: '#FFFFFF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, docThumbnailImage: { width: 40, height: 40, borderRadius: 8, marginRight: 12, backgroundColor: '#E2E8F0' }, docInfo: { flex: 1 }, docName: { fontSize: 13, fontWeight: '700', marginBottom: 2 }, viewDocLink: { fontSize: 12, fontWeight: '700', color: '#1D61F2' },
  actionRow: { flexDirection: 'row', gap: 12 }, approveBtn: { flex: 1.2, flexDirection: 'row', backgroundColor: '#064E3B', paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }, approveReturnBtn: { flexDirection: 'row', paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, approveBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 }, rejectBtn: { flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#FECACA', backgroundColor: '#FEF2F2', paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }, rejectBtnText: { color: '#DC2626', fontWeight: '700', fontSize: 14 },
  unauthorizedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#F8FAFC' }, unauthorizedTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 16, marginBottom: 8 }, unauthorizedSubtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 24 }, backButton: { backgroundColor: '#1D61F2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 100 }, backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }, bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 }, sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, sheetTitle: { fontSize: 20, fontWeight: '800' }, closeBtn: { padding: 4 }, inputLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8 }, textArea: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '500', minHeight: 100, textAlignVertical: 'top' }, helperText: { fontSize: 13, marginTop: 12, lineHeight: 18 }, submitBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }, submitBtnText: { fontSize: 16, fontWeight: '700' },
  viewerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' }, viewerCloseBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10 }, fullScreenImage: { width: '95%', height: '80%' }
});