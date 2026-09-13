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
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
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

  const loginMutation = useMutation({
    mutationFn: async (payload: { username: string; pin?: string }) => {
      const response = await apiClient.post('/auth/login', {
        username: payload.username.trim().toLowerCase(),
        password: payload.pin,
      });
      return { data: response.data, rawPin: payload.pin, username: payload.username.trim().toLowerCase() };
    },
    onSuccess: async ({ data: responsePayload, rawPin, username: savedUser }) => {
      const user = responsePayload.data.user;
      const token = responsePayload.token;

      if (rawPin) {
        await SecureStore.setItemAsync('bio_username', savedUser);
        await SecureStore.setItemAsync('bio_pin', rawPin);
      }

      const frontendRole = user.role === 'SALES_REP' ? 'REP' : user.role;
      
      if (user.requiresPasswordChange) {
        await setAuth(token, frontendRole, user.fullName, user.profilePic);
        router.replace('/(auth)/force-reset' as any);
        return;
      }

      await setAuth(token, frontendRole, user.fullName, user.profilePic);
      
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
        Alert.alert('Biometrics Unavailable', 'Please sign in using your PIN credentials first.');
        setAuthMode('PIN');
        return;
      }

      const savedUsername = await SecureStore.getItemAsync('bio_username');
      const savedPin = await SecureStore.getItemAsync('bio_pin');

      if (!savedUsername || !savedPin) {
        Alert.alert('No Biometric Profile', 'Please sign in with your username and PIN once using the PIN tab to enable biometrics.');
        setAuthMode('PIN');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with FaceID or Fingerprint',
        fallbackLabel: 'Use PIN',
      });

      if (result.success) {
        loginMutation.mutate({ username: savedUsername, pin: savedPin });
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Biometric scan failed');
    }
  };

  const handlePinSubmit = () => {
    if (!username.trim() || !pin.trim()) {
      Alert.alert('Missing Fields', 'Please enter both your Username and PIN.');
      return;
    }
    loginMutation.mutate({ username, pin });
  };

  const handleForgotPin = () => {
    if (!username.trim()) {
      Alert.alert("Missing Username", "Enter your username first so we know who is requesting the reset.");
      return;
    }
    router.push({ pathname: '/(auth)/waiting-room', params: { username } } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.header}>
          <View style={styles.logoShadowWrapper}>
            {/* FIXED ASSET PATH */}
            <Image 
              source={require('../../assets/icon.png')} 
              style={styles.logoImage} 
            />
          </View>
          <Text style={styles.title}>TajStore</Text>
          <Text style={styles.subtitle}>Distribution Portal</Text>
        </View>

        <View style={styles.card}>
          
          {authMode === 'BIOMETRIC' ? (
            <View style={styles.biometricSection}>
              <View style={styles.biometricOuterRing}>
                <TouchableOpacity style={styles.biometricInnerBubble} onPress={handleBiometricAuth} activeOpacity={0.8}>
                  <Ionicons name="finger-print" size={54} color="#1679A3" />
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
                <Ionicons name="keypad" size={20} color="#1679A3" />
                <Text style={styles.outlineToggleText}>Use Security PIN</Text>
              </>
            ) : (
              <>
                <Ionicons name="finger-print-outline" size={20} color="#1679A3" />
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
  
  logoShadowWrapper: {
    marginBottom: 16,
    shadowColor: '#1679A3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  logoImage: {
    width: 72,
    height: 72,
    borderRadius: 22,
  },

  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, fontWeight: '500', color: '#64748B', marginTop: 4 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 24, shadowColor: '#64748B', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 10 },
  
  biometricSection: { alignItems: 'center', marginBottom: 16 },
  biometricOuterRing: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#E1F0F6', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  biometricInnerBubble: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#BDE0EF', alignItems: 'center', justifyContent: 'center' },
  biometricSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  
  pinSection: { marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 8, marginLeft: 4 },
  standardInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16, fontSize: 16, fontWeight: '600', color: '#0F172A' },
  pinInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16, fontSize: 24, fontWeight: '700', color: '#0F172A', textAlign: 'center', letterSpacing: 12 },
  
  signInButton: { width: '100%', backgroundColor: '#1679A3', borderRadius: 16, paddingVertical: 18, alignItems: 'center', justifyContent: 'center', marginTop: 8, shadowColor: '#1679A3', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  signInButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  
  outlineToggleBtn: { borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 16, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  outlineToggleText: { color: '#1679A3', fontSize: 15, fontWeight: '700', marginLeft: 10 },
  
  forgotPinContainer: { marginTop: 32, alignItems: 'center' },
  forgotPinText: { color: '#64748B', fontSize: 14, fontWeight: '700' },
});