import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
  Image, StatusBar, Modal, TextInput, KeyboardAvoidingView, Platform,
  Alert, ActivityIndicator, RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../api/client';

const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'http://localhost:5000';
const resolveImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http')) return url;
  return `${BASE_IP}${url}`;
};

export default function SalesRepsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN' || role === null;

  // Local UI State
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [isEnrollModalVisible, setIsEnrollModalVisible] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentUsername, setNewAgentUsername] = useState('');
  const [newAgentLimit, setNewAgentLimit] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // 1. LIVE FETCH: Get all Sales Reps with strict cache bypassing and visible error handling
  const { data: reps = [], isLoading, refetch } = useQuery({
    queryKey: ['sales-reps'],
    queryFn: async () => {
      try {
        const response = await apiClient.get('/admin/reps');
        return response.data?.data || [];
      } catch (error: any) {
        console.error("Fetch Reps Error:", error.response?.data || error.message);
        Alert.alert("Fetch Failed", error.response?.data?.message || "Could not load agents from database.");
        throw error;
      }
    },
    enabled: isAdmin,
    staleTime: 0, // Force fresh data every time the screen mounts
    refetchOnMount: true,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // 2. LIVE MUTATION: Enroll new agent
  const enrollMutation = useMutation({
    mutationFn: async (payload: any) => apiClient.post('/admin/reps', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-reps'] });
      Alert.alert(
        'Agent Enrolled', 
        `Account created for ${newAgentName}. The system has securely generated their temporary access and flagged the account for a forced reset.`
      );
      setNewAgentName('');
      setNewAgentUsername('');
      setNewAgentLimit('');
      setIsEnrollModalVisible(false);
    },
    onError: (error: any) => {
      Alert.alert('Enrollment Failed', error.response?.data?.message || 'Could not communicate with the server.');
    }
  });

  // 3. LIVE MUTATION: Remove agent
  const removeMutation = useMutation({
    mutationFn: async (id: string) => apiClient.delete(`/admin/reps/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-reps'] });
    },
    onError: (error: any) => {
      Alert.alert('Removal Failed', error.response?.data?.message || 'Failed to remove agent.');
    }
  });

  // Derived Summary Data
  const totalOutstanding = reps.reduce((sum: number, rep: any) => sum + Number(rep.creditBalance || 0), 0);
  const activeRepsCount = reps.length;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
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
          onPress: () => removeMutation.mutate(id) 
        }
      ]
    );
  };

  const handleEnrollSubmit = () => {
    if (!newAgentName || !newAgentUsername || !newAgentLimit) {
      Alert.alert('Missing Fields', 'Please fill out all required fields to enroll the agent.');
      return;
    }
    enrollMutation.mutate({
      fullName: newAgentName,
      username: newAgentUsername,
      creditLimit: Number(newAgentLimit)
    });
  };

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.unauthorizedContainer}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={styles.unauthorizedTitle}>Access Restricted</Text>
        <Text style={styles.unauthorizedSubtitle}>This portal is exclusively for system administrators.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(rep)/home')}>
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
          <TouchableOpacity style={styles.menuButton} onPress={() => router.replace('/(admin)/dashboard')}>
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Agent Network</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.text} />}
      >
        <View style={styles.summaryContainer}>
          <View style={[styles.unifiedSummaryCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow]}>
            <View style={styles.summaryHalf}>
              <View style={styles.summaryIconRow}>
                <Ionicons name="people" size={16} color="#059669" />
                <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>ACTIVE</Text>
              </View>
              <Text style={[styles.summaryValue, { color: theme.text }]}>{activeRepsCount} <Text style={styles.summaryValueSmall}>Reps</Text></Text>
            </View>
            
            <View style={[styles.summaryDivider, { backgroundColor: theme.divider }]} />
            
            <View style={styles.summaryHalf}>
              <View style={styles.summaryIconRow}>
                <Ionicons name="wallet" size={16} color="#DC2626" />
                <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>OUTSTANDING</Text>
              </View>
              <Text style={[styles.summaryValue, { color: theme.text }]}><Text style={styles.summaryValueSmall}>ETB </Text>{(totalOutstanding / 1000).toFixed(1)}k</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.mainActionBtn, { backgroundColor: theme.invertedBg }]} onPress={() => setIsEnrollModalVisible(true)}>
            <Ionicons name="add" size={20} color={theme.invertedText} style={styles.btnIcon} />
            <Text style={[styles.mainActionText, { color: theme.invertedText }]}>Enroll Agent</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#177CA5" style={{ marginTop: 40 }} />
          ) : reps.length === 0 ? (
            <Text style={{ textAlign: 'center', color: theme.textMuted, marginTop: 40 }}>No agents enrolled yet.</Text>
          ) : (
            reps.map((rep: any) => {
              const isExpanded = expandedIds.includes(rep.id);
              const creditUsed = Number(rep.creditBalance || 0);
              const creditLimit = Number(rep.creditLimit || 0);
              const isWarning = creditLimit > 0 && (creditUsed / creditLimit) >= 0.85;

              return (
                <View key={rep.id} style={[styles.repCard, { backgroundColor: theme.cardBg }, isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow, isWarning && !isDarkMode && { borderLeftWidth: 4, borderLeftColor: '#DC2626' }, isWarning && isDarkMode && { borderColor: '#DC2626' }]}>
                  <TouchableOpacity style={styles.repTopRow} onPress={() => toggleExpand(rep.id)} activeOpacity={0.7}>
                    <View style={[styles.repAvatarPlaceholder, isDarkMode && { backgroundColor: '#1E293B' }]}>
                      {rep.profilePic ? (
                        <Image source={{ uri: resolveImageUrl(rep.profilePic) }} style={styles.repAvatar} />
                      ) : (
                        <Ionicons name="person-outline" size={24} color={theme.textMuted} />
                      )}
                      {isWarning && <View style={styles.warningIndicatorAvatar} />}
                    </View>
                    
                    <View style={styles.repInfo}>
                      <Text style={[styles.repName, { color: theme.text }]}>{rep.fullName}</Text>
                      <View style={styles.statusRow}>
                        <Text style={[styles.debtLabel, { color: theme.textMuted }]}>Debt: </Text>
                        <Text style={[styles.debtAmount, isWarning ? { color: '#DC2626' } : { color: theme.text }]}>
                          ETB {creditUsed.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    
                    <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.textMuted} />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={[styles.ledgerContainer, { borderTopColor: theme.border }]}>
                      <View style={styles.ledgerHeaderRow}>
                        <Text style={[styles.ledgerTitle, { color: theme.textMuted }]}>RECENT LEDGER</Text>
                        <Text style={[styles.limitText, { color: theme.textMuted }]}>Limit: ETB {creditLimit.toLocaleString()}</Text>
                      </View>
                      
                      {rep.transactions && rep.transactions.length > 0 ? (
                        rep.transactions.map((tx: any, idx: number) => (
                          <View key={idx} style={[styles.txItem, { backgroundColor: theme.subCardBg, borderColor: theme.border }]}>
                            <View style={styles.txLeft}>
                              <Ionicons 
                                name={tx.type === 'PAYMENT' ? "checkmark-circle" : "arrow-down-circle"} 
                                size={18} 
                                color={tx.type === 'PAYMENT' ? '#059669' : '#DC2626'} 
                                style={{ marginRight: 8 }}
                              />
                              <Text style={[styles.txDay, { color: theme.text }]}>{new Date(tx.date || tx.createdAt).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.txRight}>
                              <Text style={[styles.txAmount, tx.type === 'PAYMENT' ? { color: '#059669' } : { color: theme.text }]}>
                                {tx.type === 'PAYMENT' ? '-' : '+'} ETB {Number(tx.amount).toLocaleString()}
                              </Text>
                            </View>
                          </View>
                        ))
                      ) : (
                        <Text style={{ fontSize: 13, color: theme.textMuted, marginVertical: 8, fontStyle: 'italic' }}>No recent transactions.</Text>
                      )}

                      <TouchableOpacity 
                        style={[styles.removeAgentBtn, { backgroundColor: isDarkMode ? '#3F1D1D' : '#FEF2F2' }, removeMutation.isPending && { opacity: 0.5 }]} 
                        onPress={() => handleRemoveAgent(rep.id, rep.fullName)}
                        disabled={removeMutation.isPending}
                      >
                        <Ionicons name="trash-outline" size={16} color={isDarkMode ? '#F87171' : '#DC2626'} />
                        <Text style={[styles.removeAgentText, { color: isDarkMode ? '#F87171' : '#DC2626' }]}>Remove Agent</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })
          )}
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
                The system will automatically generate a temporary access code for this user. They will be forced to change it upon their first login.
              </Text>

              <TouchableOpacity 
                style={[styles.submitBtn, { backgroundColor: theme.invertedBg, opacity: enrollMutation.isPending ? 0.7 : 1 }]} 
                onPress={handleEnrollSubmit}
                disabled={enrollMutation.isPending}
              >
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>
                  {enrollMutation.isPending ? 'Enrolling...' : 'Submit & Generate Code'}
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