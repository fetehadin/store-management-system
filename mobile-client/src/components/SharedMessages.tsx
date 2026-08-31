import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/authStore';

const ADMIN_MESSAGES = [
  { id: '1', title: 'Credit Limit Exceeded', body: 'Abebe Kebede has exceeded the ETB 150,000 debit limit. New checkouts blocked.', date: '10:42 AM' },
  { id: '2', title: 'New Receipt Uploaded', body: 'Tigist Alemu uploaded a new receipt for ETB 42,500. Please verify in Approvals.', date: '08:15 AM' },
  { id: '3', title: 'Low Stock Warning', body: 'Wheat Flour (5kg) is running critically low. Only 12 units remain.', date: 'Yesterday' }
];

const REP_MESSAGES = [
  { id: '1', title: 'Receipt Approved', body: 'Your receipt for ETB 20,000 has been verified. Your debt ledger has been updated.', date: '09:30 AM' },
  { id: '2', title: 'Receipt Rejected', body: 'The receipt image for ETB 15,000 was blurry. Reason: Unreadable transaction ID. Please re-upload.', date: 'Yesterday' },
  { id: '3', title: 'Credit Limit Warning', body: 'You are at 90% of your ETB 150,000 checkout limit. Submit payments soon to avoid checkout blocks.', date: 'Monday' }
];

export default function SharedMessages() {
  const router = useRouter();
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const role = useAuthStore((state) => state.role);
  
  const [messages, setMessages] = useState(role === 'ADMIN' ? ADMIN_MESSAGES : REP_MESSAGES);

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    cardBg: isDarkMode ? '#1E293B' : '#FFFFFF',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />
      
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Messages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {messages.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>No new messages.</Text>
        ) : (
          messages.map(msg => (
            <View key={msg.id} style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.title, { color: theme.text }]}>{msg.title}</Text>
                <Text style={[styles.date, { color: theme.textMuted }]}>{msg.date}</Text>
              </View>
              
              <Text style={[styles.body, { color: theme.textMuted }]}>{msg.body}</Text>
              
              <TouchableOpacity 
                onPress={() => setMessages(prev => prev.filter(m => m.id !== msg.id))} 
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          ))
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
  list: { padding: 20, gap: 16 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 15, fontWeight: '500' },
  card: { padding: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 12 },
  date: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  body: { fontSize: 14, lineHeight: 22, marginBottom: 16 },
  deleteBtn: { alignSelf: 'flex-end', paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: 8 },
  deleteText: { color: '#DC2626', fontWeight: '700', fontSize: 13 }
});