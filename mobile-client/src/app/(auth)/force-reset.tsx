import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { apiClient } from '../../api/client';
import { useAuthStore } from '../../store/authStore';

export default function ForceResetScreen() {
  const router = useRouter();
  
  // We need the token to authorize this specific request
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdatePin = async () => {
    if (newPin.length < 6) {
      Alert.alert('Invalid PIN', 'Your new Security PIN must be exactly 6 digits.');
      return;
    }
    if (newPin !== confirmPin) {
      Alert.alert('PIN Mismatch', 'The PINs you entered do not match. Please try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Send the new PIN to your backend
      // Because the user is technically authenticated with a temp token, we can pass it in the header
      await apiClient.post(
        '/auth/update-pin', 
        { newPin }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Success', 'Your Security PIN has been updated.', [
        {
          text: 'Go to Dashboard',
          onPress: () => {
            if (role === 'ADMIN') {
              router.replace('/(admin)/dashboard');
            } else {
              router.replace('/(rep)/home');
            }
          }
        }
      ]);
    } catch (error: any) {
      Alert.alert(
        'Update Failed', 
        error?.response?.data?.message || 'Failed to update PIN. Please check your connection.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed" size={48} color="#177CA5" />
        </View>
        
        <Text style={styles.title}>Update Security PIN</Text>
        <Text style={styles.subtitle}>
          You are using a temporary access code. You must set a new, permanent 6-digit Security PIN to access your dashboard.
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>New 6-Digit PIN</Text>
          <TextInput
            style={styles.pinInput}
            placeholder="••••••"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            keyboardType="numeric"
            maxLength={6}
            value={newPin}
            onChangeText={setNewPin}
            autoFocus
          />

          <Text style={styles.inputLabel}>Confirm New PIN</Text>
          <TextInput
            style={[styles.pinInput, { marginBottom: 32 }]}
            placeholder="••••••"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            keyboardType="numeric"
            maxLength={6}
            value={confirmPin}
            onChangeText={setConfirmPin}
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleUpdatePin}
            disabled={isSubmitting || newPin.length !== 6 || confirmPin.length !== 6}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitBtnText}>Save & Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3FC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#DFEAFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 10,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
    marginLeft: 4,
  },
  pinInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: 12,
    marginBottom: 20,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#177CA5',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#177CA5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});