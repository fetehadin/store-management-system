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

  const [authMode, setAuthMode] = useState<'BIOMETRIC' | 'PIN'>('PIN');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  // 1. TRUE INTEGRATION MUTATION
  const loginMutation = useMutation({
    mutationFn: async (payload: { username: string; pin?: string }) => {
      // This sends the actual POST request to your backend
      const response = await apiClient.post('/auth/login', {
        username: payload.username.trim().toLowerCase(), // Sanitize input
        password: payload.pin,
      });
      // response.data is the entire JSON payload from the Express controller
      return response.data;
    },
    onSuccess: async (responsePayload) => {
      // FIX: Extract the nested user object from the backend response structure
      const user = responsePayload.data.user;
      const token = responsePayload.token;

      // 1. Map the backend Express role to your frontend Zustand type
      const frontendRole = user.role === 'SALES_REP' ? 'REP' : user.role;
      
      // 2. Check for forced temporary PIN trap
      if (user.requiresPasswordChange) {
        await setAuth(token, frontendRole, user.fullName);
        router.replace('/(auth)/force-reset' as any);
        return;
      }

      // 3. Save to Secure Store and Zustand using the mapped role
      await setAuth(token, frontendRole, user.fullName);
      
      // 4. Dynamic routing using the mapped role
      if (frontendRole === 'ADMIN') {
        router.replace('/(admin)/dashboard' as any);
      } else if (frontendRole === 'REP') {
        router.replace('/(rep)/home' as any);
      } else {
        Alert.alert('Access Denied', 'Unrecognized user role assigned to this account.');
      }
    },
    onError: (error: any) => {
      Alert.alert(
        'Authentication Failed',
        error?.response?.data?.message || 'Invalid credentials. Please check your Username and PIN.'
      );
    },
  });

  const handleBiometricAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Biometrics Unavailable', 'Please sign in using your credentials.');
        setAuthMode('PIN');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with FaceID or Fingerprint',
        fallbackLabel: 'Use PIN',
      });

      if (result.success) {
        Alert.alert('Biometrics Scanned', 'Biometric token exchange needs backend integration.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Biometric scan failed');
    }
  };

  // 2. CLEAN SUBMIT HANDLER
  const handlePinSubmit = () => {
    if (!username.trim() || !pin.trim()) {
      Alert.alert('Missing Fields', 'Please enter both your Username and PIN.');
      return;
    }

    // Fire the backend request
    loginMutation.mutate({ username, pin });
  };

  const handleForgotPin = () => {
    if (!username.trim()) {
      Alert.alert("Missing Username", "Enter your username first so we know who is requesting the reset.");
      return;
    }
    
    // Push the user to the live waiting room
    router.push({ pathname: '/(auth)/waiting-room', params: { username } } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.header}>
          <View style={styles.logoSquircle}>
            <Feather name="box" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>ibnTaju Store</Text>
          <Text style={styles.subtitle}>Distribution Portal</Text>
        </View>

        <View style={styles.card}>
          
          {authMode === 'BIOMETRIC' ? (
            <View style={styles.biometricSection}>
              <View style={styles.biometricOuterRing}>
                <TouchableOpacity style={styles.biometricInnerBubble} onPress={handleBiometricAuth} activeOpacity={0.8}>
                  <Ionicons name="finger-print" size={54} color="#1D61F2" />
                </TouchableOpacity>
              </View>
              <Text style={styles.biometricSubtitle}>Tap scanner to sign in{'\n'}with TouchID / FaceID</Text>
            </View>
          ) : (
            <View style={styles.pinSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.standardInput}
                  placeholder="e.g. admin or abebe.k"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>PIN</Text>
                <TextInput
                  style={styles.pinInput}
                  placeholder="••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  keyboardType="numeric"
                  maxLength={6}
                  value={pin}
                  onChangeText={setPin}
                />
              </View>

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

        <TouchableOpacity style={styles.forgotPinContainer} onPress={handleForgotPin}>
          <Text style={styles.forgotPinText}>Forgot PIN? Request Reset</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF3FC' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 40 },
  header: { alignItems: 'center', marginBottom: 32 },
  logoSquircle: { width: 68, height: 68, backgroundColor: '#177CA5', borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: '#177CA5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 8 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, fontWeight: '500', color: '#64748B', marginTop: 4 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 24, shadowColor: '#64748B', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 10 },
  
  biometricSection: { alignItems: 'center', marginBottom: 16 },
  biometricOuterRing: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#EBF2FF', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  biometricInnerBubble: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#DFEAFF', alignItems: 'center', justifyContent: 'center' },
  biometricSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  
  pinSection: { marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 8, marginLeft: 4 },
  standardInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16, fontSize: 16, fontWeight: '600', color: '#0F172A' },
  pinInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16, fontSize: 24, fontWeight: '700', color: '#0F172A', textAlign: 'center', letterSpacing: 12 },
  
  signInButton: { width: '100%', backgroundColor: '#177CA5', borderRadius: 16, paddingVertical: 18, alignItems: 'center', justifyContent: 'center', marginTop: 8, shadowColor: '#177CA5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  signInButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  
  outlineToggleBtn: { borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 16, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  outlineToggleText: { color: '#177CA5', fontSize: 15, fontWeight: '700', marginLeft: 10 },
  
  forgotPinContainer: { marginTop: 32, alignItems: 'center' },
  forgotPinText: { color: '#64748B', fontSize: 14, fontWeight: '700' },
});