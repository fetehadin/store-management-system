import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { apiClient } from '../../api/client';

export default function WaitingRoomScreen() {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const [status, setStatus] = useState('Pending Admin Approval...');

  useEffect(() => {
    // Check backend every 5 seconds to see if Admin clicked "Approve"
    const interval = setInterval(async () => {
      try {
        const response = await apiClient.get(`/auth/reset-status/${username}`);
        
        if (response.data.status === 'APPROVED') {
          clearInterval(interval);
          // Admin approved! Send them directly to create a new PIN.
          // We pass a temporary reset token provided by the backend.
          router.replace({ 
            pathname: '/(auth)/force-reset', 
            params: { resetToken: response.data.resetToken } 
          });
        } else if (response.data.status === 'DENIED') {
          clearInterval(interval);
          setStatus('Request Denied by Admin.');
        }
      } catch (error) {
        console.log("Polling error", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [username]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="time-outline" size={64} color="#177CA5" style={{ marginBottom: 24 }} />
        <Text style={styles.title}>Reset Requested</Text>
        <Text style={styles.subtitle}>
          Please wait while the system administrator verifies your identity and approves this request.
        </Text>
        
        {status.includes('Pending') ? (
          <ActivityIndicator size="large" color="#1D61F2" style={{ marginVertical: 20 }} />
        ) : (
          <Ionicons name="close-circle" size={48} color="#DC2626" style={{ marginVertical: 20 }} />
        )}
        
        <Text style={styles.statusText}>{status}</Text>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Cancel Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF3FC' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  subtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  statusText: { fontSize: 16, fontWeight: '700', color: '#177CA5', marginBottom: 40 },
  cancelBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 100, backgroundColor: '#E2E8F0' },
  cancelBtnText: { color: '#64748B', fontWeight: '700' }
});