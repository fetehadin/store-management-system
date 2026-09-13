import React, { useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { StyleSheet, View, Text, TouchableOpacity, Modal, SafeAreaView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AdminLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State and Dynamic Profile Data
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const userName = useAuthStore((state) => (state as any).userName || 'Admin User');
  const profilePic = useAuthStore((state) => (state as any).profilePic);
  const userRole = useAuthStore((state) => (state as any).role || 'ADMIN');
  const logout = useAuthStore((state) => state.logout);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Theme Variables
  const activeColor = isDarkMode ? '#FFFFFF' : '#1D61F2';
  const inactiveColor = isDarkMode ? '#71767B' : '#64748B';
  const bgColor = isDarkMode ? '#000000' : '#FFFFFF';
  const borderColor = isDarkMode ? '#2F3336' : '#E2E8F0';

  const navigateFromDrawer = (route: string) => {
    setIsDrawerOpen(false);
    router.push(route as any);
  };

  // Dynamically calculate height based on the device's bottom safe area (gesture bar)
  const TAB_BAR_HEIGHT = 65 + Math.max(insets.bottom, 0);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            { 
              backgroundColor: bgColor, 
              borderTopColor: borderColor, 
              paddingBottom: Math.max(insets.bottom, 12), // Safely pad bottom gesture area
              height: TAB_BAR_HEIGHT // Dynamically expand height to prevent squishing
            }
          ],
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen name="dashboard" options={{ title: 'Home', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'grid' : 'grid-outline'} size={24} color={color} />) }} />
        <Tabs.Screen name="sales" options={{ title: 'Sales', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={24} color={color} />) }} />
        <Tabs.Screen name="stock" options={{ title: 'Stock', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'cube' : 'cube-outline'} size={24} color={color} />) }} />
        <Tabs.Screen name="suppliers" options={{ title: 'Suppliers', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />) }} />
        <Tabs.Screen name="approvals" options={{ title: 'Approvals', tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} size={24} color={color} />) }} />

        {/* EXPLICITLY HIDE SIDEBAR SCREENS FROM THE BOTTOM TAB BAR */}
        <Tabs.Screen name="profile" options={{ href: null }} />
        <Tabs.Screen name="note" options={{ href: null }} />
        <Tabs.Screen name="message" options={{ href: null }} />
      </Tabs>

      {/* Left Side Drawer (Admin Controls) */}
      <Modal visible={isDrawerOpen} animationType="fade" transparent>
        <View style={styles.drawerOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setIsDrawerOpen(false)} />
          <View style={[styles.sideDrawer, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }]}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.drawerContent}>
                
                {/* Dynamic Header */}
                <View style={styles.drawerHeader}>
                  {profilePic ? (
                    <Image source={{ uri: profilePic }} style={styles.avatarImage} />
                  ) : (
                    <View style={styles.avatarIconPlaceholder}>
                      <Ionicons name="shield-checkmark" size={24} color="#64748B" />
                    </View>
                  )}
                  <Text style={[styles.drawerName, { color: isDarkMode ? '#FFF' : '#000' }]}>{userName}</Text>
                  <Text style={styles.drawerRole}>{userRole === 'SUPER_ADMIN' ? 'System Administrator' : 'Operations Admin'}</Text>
                </View>
                
                <View style={styles.divider} />
                
                {/* Drawer Links */}
                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('/(admin)/profile')}>
                  <Ionicons name="person-outline" size={24} color={isDarkMode ? '#FFF' : '#000'} style={styles.drawerIcon} />
                  <Text style={[styles.drawerItemText, { color: isDarkMode ? '#FFF' : '#000' }]}>Profile & Security</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('/(admin)/message')}>
                  <Ionicons name="mail-outline" size={24} color={isDarkMode ? '#FFF' : '#000'} style={styles.drawerIcon} />
                  <Text style={[styles.drawerItemText, { color: isDarkMode ? '#FFF' : '#000' }]}>System Messages</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('/(admin)/note')}>
                  <Ionicons name="document-text-outline" size={24} color={isDarkMode ? '#FFF' : '#000'} style={styles.drawerIcon} />
                  <Text style={[styles.drawerItemText, { color: isDarkMode ? '#FFF' : '#000' }]}>Admin Notes</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }} />
                <View style={styles.divider} />
                
                {/* Secure Sign Out */}
                <TouchableOpacity style={styles.drawerItem} onPress={() => { setIsDrawerOpen(false); logout(); }}>
                  <Ionicons name="log-out-outline" size={24} color="#DC2626" style={styles.drawerIcon} />
                  <Text style={[styles.drawerItemText, { color: '#DC2626' }]}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </Modal>

      {/* Global Hidden Button for trigger from Admin Headers */}
      <View style={{ display: 'none' }}>
        <TouchableOpacity testID="drawer-trigger" onPress={() => setIsDrawerOpen(true)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, paddingTop: 12, elevation: 0 },
  tabLabel: { fontSize: 10, fontWeight: '600', marginTop: 4 },
  
  // Drawer Styles
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