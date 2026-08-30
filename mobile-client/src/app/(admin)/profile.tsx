import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  
  // Dynamic Role & Theme Data
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const role = useAuthStore((state) => state.role);
  const authUserName = useAuthStore((state) => (state as any).userName || 'Fetehadin Negash');
  
  const displayRole = role === 'ADMIN' ? 'System Administrator' : 'Sales Representative';

  // Profile States
  const [avatarUri, setAvatarUri] = useState<string | null>(`https://ui-avatars.com/api/?name=${encodeURIComponent(authUserName)}&background=1D61F2&color=fff`);

  
  // Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  };

  const handleUpdateProfile = () => {
    console.log("Updating Profile:", { avatarUri });
    // Push to Zustand store / API
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Updating Password securely...");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile & Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
          
          {/* Avatar Upload Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
                
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: theme.inputBg }]}>
                  <Ionicons name="person" size={40} color={theme.textMuted} />
                </View>
              )}
              <TouchableOpacity style={[styles.editAvatarBtn, { backgroundColor: theme.invertedBg }]} onPress={handlePickImage}>
                <Ionicons name="camera" size={16} color={theme.invertedText} />
              </TouchableOpacity>
            </View>

          </View>

          {/* Personal Details Form */}
          <View style={styles.section}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: theme.invertedBg }]} onPress={handleUpdateProfile}>
              <Text style={[styles.primaryBtnText, { color: theme.invertedText }]}>Save Changes</Text>
            </TouchableOpacity>
          </View>

          {/* Security & Password Form */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Security</Text>
            
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
              style={[styles.secondaryBtn, { borderColor: theme.border }]} 
              onPress={handleUpdatePassword}
              disabled={!currentPassword || !newPassword || !confirmPassword}
            >
              <Text style={[styles.secondaryBtnText, { color: theme.text }]}>Update Password</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  menuButton: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  
  scrollContentDark: { paddingBottom: 60 },
  scrollContentLight: { paddingBottom: 60 },
  
  avatarSection: { alignItems: 'center', marginTop: 24, marginBottom: 32 },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  editAvatarBtn: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFFFFF' },
  profileRole: { fontSize: 14, fontWeight: '600' },

  section: { paddingHorizontal: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 16 },
  
  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '500' },
  
  passwordInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, overflow: 'hidden' },
  passwordInput: { flex: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '500' },
  eyeBtn: { padding: 14 },

  primaryBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { fontSize: 15, fontWeight: '700' },
  
  secondaryBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  secondaryBtnText: { fontSize: 15, fontWeight: '700' },

  
});