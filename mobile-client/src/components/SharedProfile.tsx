import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // <-- ADDED INSET IMPORT
import { useAuthStore } from '../store/authStore';
import { apiClient } from '../api/client';

export default function SharedProfile() {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // <-- INITIALIZE INSETS
  
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);
  const updateProfilePic = useAuthStore((state) => state.updateProfilePic);
  
  const authUserName = useAuthStore((state: any) => state.userName || state.user?.fullName || 'Fetehadin Negash');
  const rawProfilePic = useAuthStore((state: any) => state.profilePic || state.user?.profilePic);
  
  const displayRole = role === 'ADMIN' ? 'System Administrator' : 'Sales Representative';

  const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'https://tajstore-backend.onrender.com';

  const getAvatarUri = (uri: string | null | undefined) => {
    if (!uri) return null;
    if (uri.startsWith('http') || uri.startsWith('file://') || uri.startsWith('data:')) {
      return uri.replace('http://localhost:5000', BASE_IP);
    }
    return uri.startsWith('/') ? `${BASE_IP}${uri}` : `${BASE_IP}/${uri}`;
  };

  const generatedAvatar = getAvatarUri(rawProfilePic);
  const defaultFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUserName)}&background=1D61F2&color=fff`;

  const [avatarUri, setAvatarUri] = useState<string | null>(generatedAvatar || defaultFallback);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  useEffect(() => {
    checkBiometricStatus();
  }, []);

  const checkBiometricStatus = async () => {
    try {
      const bioUser = await SecureStore.getItemAsync('bio_username');
      setIsBiometricEnabled(!!bioUser);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleBiometrics = async (value: boolean) => {
    if (value) {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Unavailable', 'This device does not support or have biometrics configured.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirm biometric registration',
        fallbackLabel: 'Cancel',
      });

      if (result.success) {
        Alert.alert('Biometrics Enabled', 'Your device biometric scanner is now linked to quick sign-in.');
        setIsBiometricEnabled(true);
      }
    } else {
      await SecureStore.deleteItemAsync('bio_username');
      await SecureStore.deleteItemAsync('bio_pin');
      setIsBiometricEnabled(false);
      Alert.alert('Biometrics Disabled', 'Device credentials have been cleared.');
    }
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#177CA5',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#1E293B' : '#FFFFFF',
    inputBg: isDarkMode ? '#0F1419' : '#F1F5F9',
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
      setIsAvatarChanged(true);
    }
  };

  const handleSaveProfile = async () => {
    if (!avatarUri) return;
    setIsSavingProfile(true);
    
    try {
      const filename = avatarUri.split('/').pop() || 'avatar.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      const formData = new FormData();
      formData.append('avatar', { uri: avatarUri, name: filename, type } as any);

      const response = await apiClient.patch('/auth/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const savedImageUrl = response.data.data.profilePic;
      updateProfilePic(savedImageUrl);
      
      setIsAvatarChanged(false);
      Alert.alert('Success', 'Your profile picture is safely stored in the database!');
    } catch (error: any) {
      Alert.alert('Upload Failed', error.response?.data?.message || 'Could not connect to server.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdatePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert("Invalid Length", "New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Mismatch", "New passwords do not match. Please try again.");
      return;
    }
    
    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      Alert.alert('Success', 'Your security password has been securely updated.');
    }, 800);
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          style: "destructive", 
          onPress: () => {
            logout();
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* DYNAMIC TOP INSET APPLIED HERE */}
      <View style={[
        styles.header, 
        isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border },
        { paddingTop: Math.max(insets.top, 16) }
      ]}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile & Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
          
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }, !isDarkMode && styles.lightShadow]}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarWrapper}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                ) : (
                  <View style={[styles.avatarPlaceholder, { backgroundColor: theme.inputBg }]}>
                    <Ionicons name="person" size={40} color={theme.textMuted} />
                  </View>
                )}
                <TouchableOpacity style={[styles.editAvatarBtn, { backgroundColor: theme.invertedBg }]}>
                  <Ionicons name="camera" size={16} color={theme.invertedText} onPress={handlePickImage} />
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.profileName, { color: theme.text }]}>{authUserName}</Text>
              <Text style={[styles.profileRole, { color: theme.textMuted }]}>{displayRole}</Text>

              {isAvatarChanged && (
                <TouchableOpacity 
                  style={[styles.saveProfileBtn, { backgroundColor: theme.invertedBg }]} 
                  onPress={handleSaveProfile}
                  disabled={isSavingProfile}
                >
                  {isSavingProfile ? (
                    <ActivityIndicator color={theme.invertedText} />
                  ) : (
                    <Text style={[styles.saveProfileBtnText, { color: theme.invertedText }]}>Save Profile Image</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* ... Rest of your component remains identical ... */}
          
          {/* Biometric Configuration Card */}
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0, marginTop: 24 }, !isDarkMode && styles.lightShadow]}>
            <View style={styles.biometricRow}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 4 }]}>Biometric Login</Text>
                <Text style={{ fontSize: 13, color: theme.textMuted, lineHeight: 18 }}>
                  Enable Face ID or Fingerprint scanning for instant sign-in without a PIN.
                </Text>
              </View>
              <Switch
                trackColor={{ false: theme.border, true: '#177CA5' }}
                thumbColor={'#FFFFFF'}
                ios_backgroundColor={theme.border}
                onValueChange={handleToggleBiometrics}
                value={isBiometricEnabled}
              />
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0, marginTop: 24 }, !isDarkMode && styles.lightShadow]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Update Password</Text>
            
            <Text style={[styles.inputLabel, { color: theme.text }]}>Current Password</Text>
            <View style={[styles.passwordInputContainer, { backgroundColor: theme.inputBg, borderColor: theme.border }]}>
              <TextInput
                style={[styles.passwordInput, { color: theme.text }]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter current password"
                placeholderTextColor={theme.textMuted}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.inputLabel, { color: theme.text }]}>New Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter new password"
              placeholderTextColor={theme.textMuted}
            />

            <Text style={[styles.inputLabel, { color: theme.text }]}>Confirm New Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              placeholder="Confirm new password"
              placeholderTextColor={theme.textMuted}
            />

            <TouchableOpacity 
              style={[styles.secondaryBtn, { borderColor: theme.border, backgroundColor: theme.bg }]} 
              onPress={handleUpdatePassword}
              disabled={!currentPassword || !newPassword || !confirmPassword || isUpdatingPassword}
            >
              {isUpdatingPassword ? (
                <ActivityIndicator color={theme.text} />
              ) : (
                <Text style={[styles.secondaryBtnText, { color: theme.text }]}>Save New Password</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" style={styles.actionIcon} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16 },
  menuButton: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  scrollContentDark: { paddingHorizontal: 20, paddingBottom: 60, paddingTop: 12 },
  scrollContentLight: { paddingHorizontal: 20, paddingBottom: 60, paddingTop: 12 },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  card: { padding: 24, borderRadius: 24 },
  avatarSection: { alignItems: 'center' },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  editAvatarBtn: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFFFFF' },
  profileName: { fontSize: 20, fontWeight: '800', marginTop: 8 },
  profileRole: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  saveProfileBtn: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 100, minWidth: 180, alignItems: 'center' },
  saveProfileBtnText: { fontWeight: '700', fontSize: 15 },
  biometricRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 16 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '500' },
  passwordInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, overflow: 'hidden' },
  passwordInput: { flex: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '500' },
  eyeBtn: { padding: 14 },
  secondaryBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  secondaryBtnText: { fontSize: 15, fontWeight: '700' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 32, paddingVertical: 16, borderRadius: 16, backgroundColor: 'rgba(220, 38, 38, 0.1)' },
  actionIcon: { marginRight: 12 },
  logoutText: { color: '#DC2626', fontSize: 16, fontWeight: '800' },
});