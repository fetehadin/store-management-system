import React, { useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Modal, SafeAreaView, Image } from 'react-native';

export default function RepLayout() {
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  // Dynamically pull the exact user details saved during login
  const userName = useAuthStore((state) => (state as any).userName || 'Sales Rep');
  const profilePic = useAuthStore((state) => (state as any).profilePic);
  const userRole = useAuthStore((state) => (state as any).role || 'REP');
  
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeColor = isDarkMode ? '#FFFFFF' : '#1D61F2';
  const inactiveColor = isDarkMode ? '#71767B' : '#64748B';
  const bgColor = isDarkMode ? '#000000' : '#FFFFFF';
  const borderColor = isDarkMode ? '#2F3336' : '#E2E8F0';

  const navigateFromDrawer = (route: string) => {
    setIsDrawerOpen(false);
    router.push(route as any);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            { backgroundColor: bgColor, borderTopColor: borderColor, paddingBottom: Platform.OS === 'ios' ? 24 : 12 }
          ],
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen 
          name="home" 
          options={{ title: 'Home', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />) }} 
        />
        <Tabs.Screen 
          name="stock" 
          options={{ title: 'Stock View', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'cube' : 'cube-outline'} size={24} color={color} />) }} 
        />
        <Tabs.Screen 
          name="ledger" 
          options={{ title: 'Ledger', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'wallet' : 'wallet-outline'} size={24} color={color} />) }} 
        />
        
        <Tabs.Screen 
          name="note" 
          options={{ title: 'My Notes', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={color} />) }} 
        />

        <Tabs.Screen 
          name="message" 
          options={{ title: 'Messages', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'mail' : 'mail-outline'} size={24} color={color} />) }} 
        />

        {/* SECURELY HIDDEN FROM BOTTOM BAR */}
        <Tabs.Screen name="profile" options={{ href: null }} />
        <Tabs.Screen name="messages" options={{ href: null }} />
        <Tabs.Screen name="notes" options={{ href: null }} />
        <Tabs.Screen name="pos" options={{ href: null }} />
      </Tabs>

      {/* Left Side Drawer (X App Style) */}
      <Modal visible={isDrawerOpen} animationType="fade" transparent>
        <View style={styles.drawerOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setIsDrawerOpen(false)} />
          <View style={[styles.sideDrawer, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }]}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.drawerContent}>
                <View style={styles.drawerHeader}>
                  {/* DYNAMIC AVATAR: Show real picture if they have one, else fallback to icon */}
                  {profilePic ? (
                    <Image source={{ uri: profilePic }} style={styles.avatarImage} />
                  ) : (
                    <View style={styles.avatarIconPlaceholder}>
                      <Ionicons name="person" size={24} color="#64748B" />
                    </View>
                  )}
                  
                  <Text style={[styles.drawerName, { color: isDarkMode ? '#FFF' : '#000' }]}>{userName}</Text>
                  <Text style={styles.drawerRole}>{userRole === 'REP' || userRole === 'SALES_REP' ? 'Field Sales Rep' : 'Staff'}</Text>
                </View>
                
                <View style={styles.divider} />
                
                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('/(rep)/profile')}>
                  <Ionicons name="person-outline" size={24} color={isDarkMode ? '#FFF' : '#000'} style={styles.drawerIcon} />
                  <Text style={[styles.drawerItemText, { color: isDarkMode ? '#FFF' : '#000' }]}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('/(rep)/message')}>
                  <Ionicons name="mail-outline" size={24} color={isDarkMode ? '#FFF' : '#000'} style={styles.drawerIcon} />
                  <Text style={[styles.drawerItemText, { color: isDarkMode ? '#FFF' : '#000' }]}>Messages</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }} />
                <View style={styles.divider} />
                <TouchableOpacity style={styles.drawerItem} onPress={() => logout()}>
                  <Ionicons name="log-out-outline" size={24} color="#DC2626" style={styles.drawerIcon} />
                  <Text style={[styles.drawerItemText, { color: '#DC2626' }]}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>

      {/* Global Hidden Button for trigger from Headers */}
      <View style={{ display: 'none' }}>
        <TouchableOpacity testID="drawer-trigger" onPress={() => setIsDrawerOpen(true)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, height: Platform.OS === 'ios' ? 85 : 65, paddingTop: 12 },
  tabLabel: { fontSize: 10, fontWeight: '600', marginTop: 4 },
  drawerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row' },
  sideDrawer: { width: '75%', height: '100%', borderTopRightRadius: 24, borderBottomRightRadius: 24, padding: 24 },
  drawerContent: { flex: 1, paddingTop: 16 },
  drawerHeader: { marginBottom: 16 },
  avatarImage: { width: 48, height: 48, borderRadius: 24, marginBottom: 12 },
  avatarIconPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  drawerName: { fontSize: 20, fontWeight: '800' },
  drawerRole: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 16 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  drawerIcon: { marginRight: 16 },
  drawerItemText: { fontSize: 16, fontWeight: '700' }
});