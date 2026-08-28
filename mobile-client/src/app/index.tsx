import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { apiClient } from '../api/client';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [roleTab, setRoleTab] = useState<'ADMIN' | 'SALES_REP'>('SALES_REP');
  const [authMode, setAuthMode] = useState<'BIOMETRIC' | 'PIN'>('BIOMETRIC');
  const [pin, setPin] = useState('');

  const loginMutation = useMutation({
    mutationFn: async (payload: { pin?: string; isBiometric?: boolean }) => {
      const response = await apiClient.post('/auth/login', {
        password: payload.pin,
        role: roleTab,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      await setAuth(data.token, data.user.role);
      if (data.user.role === 'ADMIN') {
        router.replace('/(admin)/dashboard');
      } else {
        router.replace('/(rep)/pos');
      }
    },
    onError: (error: any) => {
      Alert.alert(
        'Authentication Failed',
        error?.response?.data?.message || 'Invalid credentials or network issue'
      );
    },
  });

  const handleBiometricAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Biometrics Unavailable', 'Please sign in using your Security PIN.');
        setAuthMode('PIN');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with FaceID or Fingerprint',
        fallbackLabel: 'Use PIN',
      });

    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Biometric scan failed');
    }
  };

  const handlePinSubmit = () => {
  // Temporarily bypass the backend API for UI testing
  router.replace('/(admin)/dashboard');
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        
        {/* Top Branding Section */}
        <View style={styles.header}>
          <View style={styles.logoSquircle}>
            <Feather name="box" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>ibnTaju Store</Text>
          <Text style={styles.subtitle}>Distribution Portal</Text>
        </View>

        {/* Floating White Card */}
        <View style={styles.card}>
          
          {/* Segmented Pill Selector */}
          <View style={styles.segmentedContainer}>
            <TouchableOpacity
              style={[styles.segmentTab, roleTab === 'ADMIN' && styles.segmentTabActive]}
              onPress={() => setRoleTab('ADMIN')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.segmentText,
                  roleTab === 'ADMIN' ? styles.segmentTextActive : styles.segmentTextInactive,
                ]}
              >
                Admin
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.segmentTab, roleTab === 'SALES_REP' && styles.segmentTabActive]}
              onPress={() => setRoleTab('SALES_REP')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.segmentText,
                  roleTab === 'SALES_REP' ? styles.segmentTextActive : styles.segmentTextInactive,
                ]}
              >
                Sales Rep
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mode Switch: Biometrics vs PIN */}
          {authMode === 'BIOMETRIC' ? (
            <View style={styles.biometricSection}>
              <View style={styles.biometricOuterRing}>
                <TouchableOpacity
                  style={styles.biometricInnerBubble}
                  onPress={handleBiometricAuth}
                  activeOpacity={0.8}
                >
                  <Ionicons name="finger-print" size={54} color="#1D61F2" />
                </TouchableOpacity>
              </View>

              <Text style={styles.biometricTitle}>Instant Biometric Unlock</Text>
              <Text style={styles.biometricSubtitle}>
                Tap scanner or glance to sign in{'\n'}with TouchID / FaceID
              </Text>
            </View>
          ) : (
            <View style={styles.pinSection}>
              <Text style={styles.pinTitle}>Enter Security PIN</Text>

              <TextInput
                style={styles.input}
                placeholder="PIN"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                keyboardType="numeric"
                maxLength={6}
                value={pin}
                onChangeText={setPin}
                autoFocus
              />

              <TouchableOpacity
                style={styles.signInButton}
                onPress={handlePinSubmit}
                disabled={loginMutation.isPending}
                activeOpacity={0.8}
              >
                {loginMutation.isPending ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.signInButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Bottom Toggle Outlined Button (Inside Card) */}
          <TouchableOpacity
            style={styles.outlineToggleBtn}
            onPress={() => setAuthMode(authMode === 'BIOMETRIC' ? 'PIN' : 'BIOMETRIC')}
            activeOpacity={0.7}
          >
            {authMode === 'BIOMETRIC' ? (
              <>
                <Ionicons name="keypad" size={20} color="#1D61F2" />
                <Text style={styles.outlineToggleText}>Use Security PIN</Text>
              </>
            ) : (
              <>
                <Ionicons name="finger-print-outline" size={20} color="#1D61F2" />
                <Text style={styles.outlineToggleText}>Use Biometrics</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Forgot PIN Link (Outside Card) */}
        <TouchableOpacity 
          style={styles.forgotPinContainer}
          onPress={() => Alert.alert('Reset PIN', 'Contact your system administrator.')}
        >
          <Text style={styles.forgotPinText}>Forgot PIN? PIN Reset</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3FC', // Soft blueish background from the design
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoSquircle: {
    width: 68,
    height: 68,
    backgroundColor: '#1D61F2',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#1D61F2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 10,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 999,
    padding: 6,
    marginBottom: 32,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentTabActive: {
    backgroundColor: '#1D61F2',
    shadowColor: '#1D61F2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  segmentTextInactive: {
    color: '#64748B',
  },
  biometricSection: {
    alignItems: 'center',
  },
  biometricOuterRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EBF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  biometricInnerBubble: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#DFEAFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  biometricTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  biometricSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  pinSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pinTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 20,
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#1D61F2',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1D61F2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineToggleBtn: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outlineToggleText: {
    color: '#1D61F2',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
  },
  forgotPinContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  forgotPinText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});