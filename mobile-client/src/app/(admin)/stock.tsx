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
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../store/authStore';

const CATEGORIES = ['chocolate', 'perfume', 'pijama'];

const INVENTORY = [
  { id: '1', name: 'Sunflower Cooking Oil (1L)', price: '370.00', stock: 450, status: 'healthy', icon: 'water-outline' },
  { id: '2', name: 'Wheat Flour (5kg)', price: '850.00', stock: 12, status: 'low', icon: 'bag-outline' },
  { id: '3', name: 'Premium Dark Chocolate', skeleton: true, icon: 'grid-outline' },
];

export default function StockScreen() {
  const router = useRouter();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const isAdmin = true; // TEMPORARY BYPASS

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Stock');

  // Modal & Form State
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [formCategory, setFormCategory] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    invertedBg: isDarkMode ? '#E7E9EA' : '#1D61F2',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
    cardBg: isDarkMode ? '#000000' : '#FFFFFF',
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
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const finalCategory = isCreatingCategory ? newCategoryName : formCategory;
    console.log({ productName, quantity, photoUri, finalCategory });
    // Reset and close
    setProductName('');
    setQuantity('');
    setPhotoUri(null);
    setFormCategory('');
    setNewCategoryName('');
    setIsCreatingCategory(false);
    setIsAddModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=Admin&background=0F1419&color=fff' }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? theme.text : '#1D61F2' }]}>ibnTaju DMS</Text>
        
        <View style={styles.headerRight}>
          {isAdmin && (
            <TouchableOpacity 
              style={[styles.addProductBtn, { backgroundColor: theme.invertedBg }]} 
              onPress={() => setIsAddModalVisible(true)}
            >
              <Ionicons name="add" size={18} color={theme.invertedText} style={styles.btnIcon} />
              <Text style={[styles.addProductText, { color: theme.invertedText }]}>Add Product</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        <View style={styles.pageTitleContainer}>
          <Text style={[styles.pageTitle, { color: theme.text }]}>Store Inventory</Text>
        </View>

        {/* Existing Inventory Display Logic (Unchanged) */}
        <View style={styles.categoriesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {['All', ...CATEGORIES].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity 
                  key={cat}
                  style={[
                    styles.categoryPill, 
                    { backgroundColor: isDarkMode ? (isActive ? theme.invertedBg : theme.bg) : (isActive ? '#EEF2FF' : '#FFFFFF') },
                    { borderColor: isDarkMode ? (isActive ? theme.invertedBg : theme.border) : (isActive ? '#C7D2FE' : '#E2E8F0') },
                    isDarkMode && !isActive && { borderWidth: 1 }
                  ]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text style={[styles.categoryText, { color: isActive ? (isDarkMode ? theme.invertedText : '#1D61F2') : theme.textMuted }]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.productList}>
          {INVENTORY.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.productCard, 
                { backgroundColor: theme.cardBg },
                isDarkMode ? { borderWidth: 1, borderColor: theme.border } : styles.lightShadow
              ]}
            >
              <View style={styles.productTopRow}>
                <View style={[styles.productImagePlaceholder, isDarkMode && { backgroundColor: '#1E293B' }]}>
                  <Ionicons name={item.icon as any} size={28} color={theme.textMuted} />
                </View>
                
                <View style={styles.productInfo}>
                  <Text style={[styles.productName, { color: theme.text }]}>{item.name}</Text>
                  {!item.skeleton && (
                    <View style={[
                      styles.statusIndicator, 
                      item.status === 'healthy' 
                        ? { backgroundColor: isDarkMode ? '#064E3B' : '#ECFDF5', borderColor: isDarkMode ? '#059669' : '#A7F3D0' } 
                        : { backgroundColor: isDarkMode ? '#7F1D1D' : '#FEF2F2', borderColor: isDarkMode ? '#DC2626' : '#FECACA' }
                    ]} />
                  )}
                </View>
              </View>

              <View style={styles.productBottomRow}>
                <View style={styles.metricColumn}>
                  {item.skeleton ? (
                    <View style={[styles.skeletonBarLeft, isDarkMode && { backgroundColor: theme.border }]} />
                  ) : (
                    <>
                      <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Price</Text>
                      <Text style={[styles.metricValue, { color: theme.text }]}>
                        ETB <Text style={styles.metricValueBold}>{item.price}</Text>
                      </Text>
                    </>
                  )}
                </View>
                <View style={[styles.metricColumn, { alignItems: 'flex-end' }]}>
                  {item.skeleton ? (
                    <View style={[styles.skeletonBarRight, isDarkMode && { backgroundColor: theme.border }]} />
                  ) : (
                    <>
                      <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Stock</Text>
                      <Text style={[styles.metricValueBold, item.status === 'healthy' ? { color: '#059669' } : { color: '#DC2626' }]}>
                        {item.stock} Units
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Adaptive Bottom Navigation */}
      <View style={isDarkMode ? [styles.darkBottomNav, { backgroundColor: theme.bg, borderTopColor: theme.border }] : styles.lightBottomNavContainer}>
        <View style={isDarkMode ? { flexDirection: 'row', width: '100%', justifyContent: 'space-around' } : styles.lightBottomNav}>
          {[
            { id: 'Home', icon: 'grid' },
            { id: 'Sales', icon: 'bar-chart' },
            { id: 'Stock', icon: 'cube' },
            { id: 'Suppliers', icon: 'people' },
            { id: 'Approvals', icon: 'checkmark-circle' },
          ].map((tab) => {
            const isActive = activeNav === tab.id;
            return (
              <TouchableOpacity 
                key={tab.id}
                style={isDarkMode ? styles.darkNavItem : (isActive ? styles.lightNavItemActive : styles.lightNavItem)}
                onPress={() => {
                  setActiveNav(tab.id);
                  if (tab.id === 'Home') router.replace('/(admin)/dashboard');
                }}
              >
                <Ionicons 
                  name={isActive ? tab.icon as any : `${tab.icon}-outline` as any} 
                  size={24} 
                  color={isDarkMode ? (isActive ? theme.text : theme.textMuted) : (isActive ? '#FFFFFF' : '#64748B')} 
                />
                <Text style={[
                  isDarkMode ? styles.darkNavText : styles.lightNavText, 
                  { color: isDarkMode ? (isActive ? theme.text : theme.textMuted) : (isActive ? '#FFFFFF' : '#64748B') },
                  isActive && { fontWeight: '700' }
                ]}>
                  {tab.id}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Add Product Bottom Sheet Modal */}
      <Modal visible={isAddModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>New Product</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>
              
              {/* Photo Picker */}
              <TouchableOpacity 
                style={[styles.photoPicker, { backgroundColor: theme.inputBg, borderColor: theme.border }]} 
                onPress={handlePickImage}
              >
                {photoUri ? (
                  <Image source={{ uri: photoUri }} style={styles.previewImage} />
                ) : (
                  <>
                    <Ionicons name="camera-outline" size={32} color={theme.textMuted} />
                    <Text style={[styles.photoPickerText, { color: theme.textMuted }]}>Upload Photo</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Inputs */}
              <Text style={[styles.inputLabel, { color: theme.text }]}>Product Name</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                placeholder="e.g. Premium Arabica Coffee"
                placeholderTextColor={theme.textMuted}
                value={productName}
                onChangeText={setProductName}
              />

              <Text style={[styles.inputLabel, { color: theme.text }]}>Initial Quantity</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                placeholder="0"
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />

              {/* Category Selector */}
              <Text style={[styles.inputLabel, { color: theme.text }]}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.formCategoryScroll}>
                {CATEGORIES.map(cat => (
                  <TouchableOpacity 
                    key={cat}
                    style={[
                      styles.formCategoryPill, 
                      { borderColor: theme.border },
                      formCategory === cat && !isCreatingCategory ? { backgroundColor: theme.invertedBg, borderColor: theme.invertedBg } : { backgroundColor: theme.inputBg }
                    ]}
                    onPress={() => { setFormCategory(cat); setIsCreatingCategory(false); }}
                  >
                    <Text style={{ color: formCategory === cat && !isCreatingCategory ? theme.invertedText : theme.text, fontWeight: '600' }}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
                
                {/* Custom Category Pill */}
                <TouchableOpacity 
                  style={[
                    styles.formCategoryPill, 
                    { borderStyle: 'dashed', borderColor: theme.textMuted },
                    isCreatingCategory ? { backgroundColor: theme.invertedBg, borderColor: theme.invertedBg } : { backgroundColor: 'transparent' }
                  ]}
                  onPress={() => { setIsCreatingCategory(true); setFormCategory(''); }}
                >
                  <Text style={{ color: isCreatingCategory ? theme.invertedText : theme.textMuted, fontWeight: '600' }}>
                    + Custom
                  </Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Hidden Input for Custom Category */}
              {isCreatingCategory && (
                <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, marginTop: 12 }]}
                  placeholder="Enter new category name..."
                  placeholderTextColor={theme.textMuted}
                  value={newCategoryName}
                  onChangeText={setNewCategoryName}
                  autoFocus
                />
              )}

              {/* Submit Button */}
              <TouchableOpacity 
                style={[styles.submitBtn, { backgroundColor: theme.invertedBg }]} 
                onPress={handleSubmit}
              >
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Save Product</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  iconButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  addProductBtn: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 100, alignItems: 'center', marginRight: 12 },
  btnIcon: { marginRight: 4 },
  addProductText: { fontWeight: '700', fontSize: 13 },
  
  scrollContentDark: { paddingBottom: 24 },
  scrollContentLight: { paddingBottom: 130 },
  
  pageTitleContainer: { paddingHorizontal: 20, marginTop: 16, marginBottom: 20 },
  pageTitle: { fontSize: 32, fontWeight: '900', letterSpacing: -1 },
  
  categoriesWrapper: { marginBottom: 24 },
  categoriesScroll: { paddingHorizontal: 20, alignItems: 'center' },
  categoryPill: { borderWidth: 1, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 100, marginRight: 12 },
  categoryText: { fontSize: 14, fontWeight: '600' },
  
  productList: { paddingHorizontal: 20 },
  productCard: { borderRadius: 24, padding: 20, marginBottom: 16 },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  
  productTopRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24 },
  productImagePlaceholder: { width: 64, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  productInfo: { flex: 1, paddingTop: 4 },
  productName: { fontSize: 20, fontWeight: '700', marginBottom: 8, lineHeight: 26 },
  statusIndicator: { width: 24, height: 16, borderRadius: 6, borderWidth: 1 },
  
  productBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  metricColumn: { justifyContent: 'center' },
  metricLabel: { fontSize: 12, marginBottom: 4, fontWeight: '500' },
  metricValue: { fontSize: 16, fontWeight: '700' },
  metricValueBold: { fontSize: 16, fontWeight: '800' },
  
  skeletonBarLeft: { width: 120, height: 18, borderRadius: 4, marginTop: 8 },
  skeletonBarRight: { width: 80, height: 18, borderRadius: 4, marginTop: 8 },

  darkBottomNav: { borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: 24, paddingTop: 12, flexDirection: 'row', alignItems: 'center' },
  darkNavItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  darkNavText: { fontSize: 10, fontWeight: '500', marginTop: 4 },
  
  lightBottomNavContainer: { position: 'absolute', bottom: 24, left: 20, right: 20 },
  lightBottomNav: { flexDirection: 'row', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 8, justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 15 },
  lightNavItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 8 },
  lightNavItemActive: { alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 100 },
  lightNavText: { fontSize: 10, fontWeight: '600', marginTop: 4 },

  /* Modal Styles */
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  sheetTitle: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  sheetScroll: { paddingBottom: 40 },
  
  photoPicker: { height: 120, borderRadius: 16, borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', marginBottom: 20, overflow: 'hidden' },
  photoPickerText: { marginTop: 8, fontWeight: '600', fontSize: 14 },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  
  inputLabel: { fontSize: 14, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, fontWeight: '500' },
  
  formCategoryScroll: { flexDirection: 'row', marginBottom: 8 },
  formCategoryPill: { borderWidth: 1, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, marginRight: 12 },
  
  submitBtn: { marginTop: 32, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '700' },
});