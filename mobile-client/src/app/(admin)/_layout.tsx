import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { Platform, StyleSheet } from 'react-native';

export default function AdminLayout() {
  const isDarkMode = useAuthStore((state) => state.isDarkMode);

  const activeColor = isDarkMode ? '#FFFFFF' : '#1D61F2';
  const inactiveColor = isDarkMode ? '#71767B' : '#64748B';
  const bgColor = isDarkMode ? '#000000' : '#FFFFFF';
  const borderColor = isDarkMode ? '#2F3336' : '#E2E8F0';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { 
            backgroundColor: bgColor, 
            borderTopColor: borderColor,
            paddingBottom: Platform.OS === 'ios' ? 24 : 12,
          }
        ],
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {/* Active Bottom Tabs */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: 'Sales',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stock"
        options={{
          title: 'Stock',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cube' : 'cube-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="suppliers"
        options={{
          title: 'Suppliers',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="approvals"
        options={{
          title: 'Approvals',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* Hidden Screens (Accessed via Drawer only) */}
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="notes" options={{ href: null }} />
      <Tabs.Screen name="messages" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingTop: 12,
    elevation: 0,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
});