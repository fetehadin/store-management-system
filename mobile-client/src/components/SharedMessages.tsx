import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';

export default function SharedMessages() {
  const router = useRouter();
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  // Track dismissed messages locally so they don't reappear during the session
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    cardBg: isDarkMode ? '#1E293B' : '#FFFFFF',
  };

  // LIVE FETCH: Automatically routes based on the logged-in user's token
  const { data: messages = [], isLoading, refetch } = useQuery({
    queryKey: ['system-messages'],
    queryFn: async () => {
      const response = await apiClient.get('/payments/messages');
      return response.data?.data || [];
    }
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Hide messages the user has swiped away
  const visibleMessages = messages.filter((msg: any) => !dismissedIds.includes(msg.id));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />
      
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Messages</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.text} />}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#177CA5" style={{ marginTop: 40 }} />
        ) : visibleMessages.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>No new messages.</Text>
        ) : (
          visibleMessages.map((msg: any) => {
            // Dynamic styling based on message severity from backend
            const isError = msg.type === 'ERROR';
            const isSuccess = msg.type === 'SUCCESS';
            const accentColor = isError ? '#DC2626' : (isSuccess ? '#059669' : '#D97706');
            const bgTint = isDarkMode 
              ? (isError ? 'rgba(220, 38, 38, 0.1)' : 'rgba(100, 116, 139, 0.1)') 
              : (isError ? '#FEF2F2' : 'rgba(100, 116, 139, 0.1)');

            return (
              <View 
                key={msg.id} 
                style={[
                  styles.card, 
                  { 
                    backgroundColor: theme.cardBg, 
                    borderColor: theme.border, 
                    borderWidth: isDarkMode ? 1 : 0,
                    borderLeftWidth: 4,
                    borderLeftColor: accentColor 
                  }
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.title, { color: theme.text }]}>{msg.title}</Text>
                  <Text style={[styles.date, { color: theme.textMuted }]}>
                    {new Date(msg.date).toLocaleDateString()}
                  </Text>
                </View>
                
                <Text style={[styles.body, { color: theme.textMuted }]}>{msg.body}</Text>
                
                <TouchableOpacity 
                  onPress={() => setDismissedIds(prev => [...prev, msg.id])} 
                  style={[styles.deleteBtn, { backgroundColor: bgTint }]}
                >
                  <Text style={[styles.deleteText, { color: isError ? '#DC2626' : theme.textMuted }]}>
                    Dismiss
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1 },
  backBtn: { marginRight: 16 },
  headerTitle: { fontSize: 22, fontWeight: '800' },
  list: { padding: 20, gap: 16, paddingBottom: 100 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 15, fontWeight: '500' },
  card: { padding: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 12 },
  date: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  body: { fontSize: 14, lineHeight: 22, marginBottom: 16 },
  deleteBtn: { alignSelf: 'flex-end', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  deleteText: { fontWeight: '700', fontSize: 13 }
});