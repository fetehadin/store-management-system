import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Modal, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../api/client';

const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'https://tajstore-backend.onrender.com';

const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http')) return url;
  return `${BASE_IP}${url}`;
};

export default function ApprovalsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const isAdmin = role === 'ADMIN' || role === null; 

  const [activeTab, setActiveTab] = useState<'PAYMENTS' | 'RETURNS'>('PAYMENTS');
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: receipts = [], isLoading: isLoadingPayments, refetch: refetchPayments } = useQuery({
    queryKey: ['pending-payments'],
    queryFn: async () => {
      const response = await apiClient.get('/payments/pending');
      return response.data?.data || [];
    },
    enabled: isAdmin,
  });

  const { data: returns = [], isLoading: isLoadingReturns, refetch: refetchReturns } = useQuery({
    queryKey: ['pending-returns'],
    queryFn: async () => {
      const response = await apiClient.get('/returns/pending');
      return response.data?.data || [];
    },
    enabled: isAdmin,
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchPayments(), refetchReturns()]);
    setRefreshing(false);
  }, [refetchPayments, refetchReturns]);

  const approvePaymentMutation = useMutation({
    mutationFn: async (id: string) => apiClient.patch(`/payments/${id}/approve`, { adminRemark: 'Approved via Admin App' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-payments'] });
      Alert.alert('Success', 'Payment approved and ledger updated.');
    },
    onError: (error: any) => Alert.alert('Error', error.response?.data?.message || 'Failed to approve.'),
  });

  const rejectPaymentMutation = useMutation({
    mutationFn: async ({ id, remark }: { id: string, remark: string }) => apiClient.patch(`/payments/${id}/reject`, { adminRemark: remark }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-payments'] });
      setIsRejectModalVisible(false);
      setRejectReason('');
    },
    onError: (error: any) => Alert.alert('Error', error.response?.data?.message || 'Failed to reject.'),
  });

  const processReturnMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => apiClient.post(`/returns/${id}/approve`, { destination: 'WAREHOUSE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-returns'] });
      Alert.alert('Success', 'Return processed and added back to warehouse stock.');
    },
    onError: (error: any) => Alert.alert('Error', error.response?.data?.message || 'Failed to process return.'),
  });

  const handleApprove = (id: string) => {
    Alert.alert("Confirm Approval", "Are you sure you want to approve this receipt and deduct the rep's debt?", [
      { text: "Cancel", style: "cancel" },
      { text: "Approve", style: "default", onPress: () => approvePaymentMutation.mutate(id) }
    ]);
  };

  const openRejectModal = (id: string) => { 
    setActiveReceiptId(id); 
    setIsRejectModalVisible(true); 
  };

  const handleConfirmReject = () => {
    if (!activeReceiptId) return;
    rejectPaymentMutation.mutate({ id: activeReceiptId, remark: rejectReason });
  };

  const handleProcessReturn = (id: string) => {
    Alert.alert("Confirm Action", `Accept this return, deduct ETB value from rep's debt, and add items back to stock?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm", style: "default", onPress: () => processReturnMutation.mutate({ id }) }
    ]);
  };

  const openImageViewer = (imageUrl: string) => { 
    setSelectedImage(resolveImageUrl(imageUrl)); 
    setIsImageViewerVisible(true); 
  };

  const theme = {
    bg: isDarkMode ? '#020617' : '#F8FAFC',
    text: isDarkMode ? '#F8FAFC' : '#0F172A',
    textMuted: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#1E293B' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#0F172A' : '#FFFFFF',
    docBg: isDarkMode ? '#1E293B' : '#F1F5F9',
    inputBg: isDarkMode ? '#0F172A' : '#F1F5F9',
    iconBg: isDarkMode ? '#1E293B' : '#EFF6FF',
  };

  if (!isAdmin) {
    return (
      <View style={[styles.unauthorizedContainer, { backgroundColor: theme.bg, paddingTop: insets.top }]}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={[styles.unauthorizedTitle, { color: theme.text }]}>Access Restricted</Text>
      </View>
    );
  }

  const isProcessingAny = approvePaymentMutation.isPending || rejectPaymentMutation.isPending || processReturnMutation.isPending;

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.bg, paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} translucent />

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

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.text} />}>
        
        {/* PAYMENTS TAB */}
        {activeTab === 'PAYMENTS' && (
          <View style={styles.feedContainer}>
            {isLoadingPayments ? <ActivityIndicator size="large" color="#177CA5" style={{ marginTop: 60 }} />
            : receipts.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-done-circle-outline" size={48} color={theme.textMuted} />
                <Text style={[styles.emptyStateTitle, { color: theme.text }]}>All Caught Up</Text>
                <Text style={[styles.emptyStateSub, { color: theme.textMuted }]}>There are no pending receipts to verify.</Text>
              </View>
            ) : (
              receipts.map((item: any) => (
                <View key={item.id} style={[styles.approvalCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
                  <View style={styles.leftAccentBar} />
                  <View style={styles.cardMainContent}>
                    <View style={styles.cardHeaderRow}>
                      <View style={styles.repMetaRow}>
                        <View style={[styles.bankIconBox, { backgroundColor: theme.iconBg }]}><Ionicons name="business-outline" size={20} color="#177CA5" /></View>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.repName, { color: theme.text }]} numberOfLines={1}>{item.senderName || item.user?.fullName || 'Unknown Sender'}</Text>
                          <Text style={[styles.bankDetails, { color: theme.textMuted }]}>Bank: {item.bankName}</Text>
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
                        <View style={[styles.docThumbnail, { backgroundColor: theme.inputBg }]}><Ionicons name="document-text-outline" size={24} color={theme.textMuted} /></View>
                      )}
                      <View style={styles.docInfo}>
                        <Text style={[styles.docName, { color: theme.text }]} numberOfLines={1}>Attached Receipt</Text>
                      </View>
                    </View>

                    {item.reasonRemark && <Text style={{ color: theme.textMuted, fontSize: 13, marginBottom: 16, fontStyle: 'italic' }}>" {item.reasonRemark} "</Text>}

                    <View style={styles.actionRow}>
                      <TouchableOpacity style={[styles.approveBtn, isProcessingAny && { opacity: 0.5 }]} onPress={() => handleApprove(item.id)} disabled={isProcessingAny}>
                        <Ionicons name="finger-print" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.approveBtnText}>Approve & Clear</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.rejectBtn, { borderColor: isDarkMode ? 'rgba(220,38,38,0.3)' : '#FECACA', backgroundColor: isDarkMode ? 'rgba(220,38,38,0.1)' : '#FEF2F2' }, isProcessingAny && { opacity: 0.5 }]} onPress={() => openRejectModal(item.id)} disabled={isProcessingAny}>
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

        {/* RETURNS TAB */}
        {activeTab === 'RETURNS' && (
          <View style={styles.feedContainer}>
            {isLoadingReturns ? <ActivityIndicator size="large" color="#E11D48" style={{ marginTop: 60 }} />
            : returns.length === 0 ? (
               <View style={styles.emptyState}>
                 <Ionicons name="cube-outline" size={48} color={theme.textMuted} />
                 <Text style={[styles.emptyStateTitle, { color: theme.text }]}>No Returns</Text>
                 <Text style={[styles.emptyStateSub, { color: theme.textMuted }]}>There are no pending stock returns.</Text>
               </View>
            ) : (
              returns.map((ret: any) => (
                <View key={ret.id} style={[styles.approvalCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
                  <View style={[styles.leftAccentBar, { backgroundColor: '#E11D48' }]} />
                  <View style={styles.cardMainContent}>
                    <View style={styles.cardHeaderRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.repName, { color: theme.text }]}>{ret.user?.fullName || 'Unknown Rep'}</Text>
                        <Text style={{ color: theme.textMuted, fontSize: 12 }}>Requests Stock Return</Text>
                      </View>
                      <Text style={[styles.amountText, { color: theme.text }]}>ETB {Number(ret.totalValue || 0).toLocaleString()}</Text>
                    </View>

                    <View style={[styles.docPreviewBox, { backgroundColor: theme.docBg, flexDirection: 'column', alignItems: 'flex-start' }]}>
                      <Text style={{ fontSize: 13, fontWeight: '700', color: theme.text, marginBottom: 6 }}>Returned Items:</Text>
                      {ret.items?.map((i: any, idx: number) => (
                        <Text key={idx} style={{ fontSize: 13, color: theme.textMuted, marginBottom: 2 }}>
                          • {i.quantity}x {i.product?.name || 'Item'}
                        </Text>
                      ))}
                    </View>

                    <Text style={{ color: theme.textMuted, fontSize: 13, marginBottom: 16, fontStyle: 'italic' }}>
                      Reason: "{ret.reason || 'N/A'}"
                    </Text>

                    <View style={{ gap: 8 }}>
                      <TouchableOpacity style={[styles.approveReturnBtn, { backgroundColor: '#059669' }, isProcessingAny && { opacity: 0.5 }]} disabled={isProcessingAny} onPress={() => handleProcessReturn(ret.id)}>
                        <Ionicons name="cube-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
                        <Text style={styles.approveBtnText}>Accept & Return to Stock</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

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
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: '#DC2626' }]} onPress={handleConfirmReject} disabled={!rejectReason.trim() || rejectPaymentMutation.isPending}>
              <Text style={[styles.submitBtnText, { color: '#FFFFFF' }, (!rejectReason.trim() || rejectPaymentMutation.isPending) && { opacity: 0.7 }]}>{rejectPaymentMutation.isPending ? 'Processing...' : 'Confirm Rejection'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal visible={isImageViewerVisible} animationType="fade" transparent>
        <View style={styles.viewerOverlay}>
          <TouchableOpacity style={styles.viewerCloseBtn} onPress={() => setIsImageViewerVisible(false)}><Ionicons name="close-circle" size={40} color="#FFFFFF" /></TouchableOpacity>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }, headerLeft: { flexDirection: 'row', alignItems: 'center' }, menuButton: { marginRight: 12 }, headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16 }, tab: { flex: 1, paddingVertical: 12, alignItems: 'center' }, tabText: { fontSize: 14, fontWeight: '700' },
  scrollContentDark: { paddingBottom: 24, paddingTop: 16 }, scrollContentLight: { paddingBottom: 130, paddingTop: 16 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }, emptyStateTitle: { fontSize: 20, fontWeight: '800', marginTop: 16, marginBottom: 8 }, emptyStateSub: { fontSize: 14, textAlign: 'center' },
  feedContainer: { paddingHorizontal: 20 }, approvalCard: { borderRadius: 20, padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' }, lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 }, leftAccentBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, backgroundColor: '#177CA5' }, cardMainContent: { paddingLeft: 6 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }, repMetaRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }, bankIconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, repName: { fontSize: 16, fontWeight: '800', marginBottom: 2 }, bankDetails: { fontSize: 12, fontWeight: '500' }, amountText: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5 }, timestampText: { fontSize: 11, marginTop: 4, fontWeight: '500' },
  docPreviewBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 16 }, docThumbnail: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }, docThumbnailImage: { width: 40, height: 40, borderRadius: 8, marginRight: 12 }, docInfo: { flex: 1 }, docName: { fontSize: 13, fontWeight: '700', marginBottom: 2 }, viewDocLink: { fontSize: 12, fontWeight: '700', color: '#1D61F2' },
  actionRow: { flexDirection: 'row', gap: 12 }, approveBtn: { flex: 1.2, flexDirection: 'row', backgroundColor: '#064E3B', paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }, approveReturnBtn: { flexDirection: 'row', paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, approveBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 }, rejectBtn: { flex: 1, flexDirection: 'row', borderWidth: 1, paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }, rejectBtnText: { color: '#DC2626', fontWeight: '700', fontSize: 14 },
  unauthorizedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }, unauthorizedTitle: { fontSize: 24, fontWeight: '800', marginTop: 16, marginBottom: 8 }, unauthorizedSubtitle: { fontSize: 15, textAlign: 'center', marginBottom: 24 }, backButton: { backgroundColor: '#1D61F2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 100 }, backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }, bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 }, sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, sheetTitle: { fontSize: 20, fontWeight: '800' }, closeBtn: { padding: 4 }, inputLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8 }, textArea: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '500', minHeight: 100, textAlignVertical: 'top' }, helperText: { fontSize: 13, marginTop: 12, lineHeight: 18 }, submitBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }, submitBtnText: { fontSize: 16, fontWeight: '700' },
  viewerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' }, viewerCloseBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10 }, fullScreenImage: { width: '95%', height: '80%' }
});