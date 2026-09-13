import React, { useState, useCallback } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, RefreshControl, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';

export default function SharedMessages() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const [refreshing, setRefreshing] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const theme = {
    bg: isDarkMode ? '#020617' : '#F8FAFC',
    text: isDarkMode ? '#F8FAFC' : '#0F172A',
    textMuted: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#1E293B' : '#E2E8F0',
    cardBg: isDarkMode ? '#0F172A' : '#FFFFFF',
  };

  const { data: messages = [], isLoading, refetch } = useQuery({
    queryKey: ['system-messages'],
    queryFn: async () => {
      const response = await apiClient.get('/messages');
      return response.data?.data || [];
    }
  });

  const dismissMutation = useMutation({
    mutationFn: async (id: string) => {
      setDismissedIds(prev => [...prev, id]);
      if (!id.startsWith('proof_')) {
        return apiClient.patch(`/messages/${id}/dismiss`);
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-messages'] });
    },
    onError: (err: any, id: string) => {
      setDismissedIds(prev => prev.filter(item => item !== id));
      Alert.alert('Error', err.response?.data?.message || 'Failed to dismiss message.');
    }
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const activeMessages = messages.filter((msg: any) => !msg.isRead && !dismissedIds.includes(msg.id));

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.bg, paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} translucent />
      
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Messages & Alerts</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.text} />}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#177CA5" style={{ marginTop: 40 }} />
        ) : activeMessages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={48} color={theme.textMuted} />
            <Text style={[styles.emptyText, { color: theme.text }]}>No New Notifications</Text>
            <Text style={[styles.emptySubText, { color: theme.textMuted }]}>You're completely caught up on system updates.</Text>
          </View>
        ) : (
          activeMessages.map((msg: any) => {
            const isError = msg.type === 'ERROR';
            const isSuccess = msg.type === 'SUCCESS';
            const accentColor = isError ? '#DC2626' : (isSuccess ? '#059669' : '#D97706');
            const bgTint = isDarkMode 
              ? (isError ? 'rgba(220, 38, 38, 0.15)' : 'rgba(148, 163, 184, 0.1)') 
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
                  },
                  !isDarkMode && styles.lightShadow
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.title, { color: theme.text }]}>{msg.title}</Text>
                  <Text style={[styles.date, { color: theme.textMuted }]}>
                    {new Date(msg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
                
                <Text style={[styles.body, { color: theme.textMuted }]}>{msg.body}</Text>
                
                <TouchableOpacity 
                  onPress={() => dismissMutation.mutate(msg.id)} 
                  style={[styles.deleteBtn, { backgroundColor: bgTint }]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.deleteText, { color: isError ? '#DC2626' : theme.text }]}>
                    Dismiss
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 }, header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1 }, backBtn: { marginRight: 16 }, headerTitle: { fontSize: 22, fontWeight: '800' }, list: { padding: 20, gap: 16, paddingBottom: 100 }, emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100 }, emptyText: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 4 }, emptySubText: { fontSize: 14, textAlign: 'center' }, card: { padding: 20, borderRadius: 16 }, lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3 }, cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }, title: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 12 }, date: { fontSize: 12, fontWeight: '500', marginTop: 2 }, body: { fontSize: 14, lineHeight: 22, marginBottom: 16 }, deleteBtn: { alignSelf: 'flex-end', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 }, deleteText: { fontWeight: '700', fontSize: 13 }
});