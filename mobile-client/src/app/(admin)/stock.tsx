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

const CATEGORIES = ['Cooking Oil', 'Flour & Baking', 'Confectionery', 'Beverages'];

const DEMO_INVENTORY = [
  { 
    id: '1', 
    name: 'Sunflower Cooking Oil (1L)', 
    category: 'Cooking Oil',
    costPrice: 320.00,
    sellingPrice: 370.00, 
    stock: 450, 
    icon: 'water-outline' 
  },
  { 
    id: '2', 
    name: 'Wheat Flour (5kg)', 
    category: 'Flour & Baking',
    costPrice: 700.00,
    sellingPrice: 850.00, 
    stock: 12, 
    icon: 'bag-outline' 
  },
  { 
    id: '3', 
    name: 'Premium Dark Chocolate', 
    category: 'Confectionery',
    costPrice: 150.00,
    sellingPrice: 200.00, 
    stock: 85, 
    icon: 'grid-outline' 
  },
];

export default function StockScreen() {
  const router = useRouter();
  
  const role = useAuthStore((state) => state.role);
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  
  const isAdmin = role === 'ADMIN' || role === null;

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.unauthorizedContainer}>
        <StatusBar barStyle="dark-content" />
        <Ionicons name="lock-closed-outline" size={64} color="#DC2626" />
        <Text style={styles.unauthorizedTitle}>Access Restricted</Text>
        <Text style={styles.unauthorizedSubtitle}>This portal is exclusively for system administrators. Sales reps must use the POS interface.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(rep)/pos')}>
          <Text style={styles.backButtonText}>Return to POS</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Stock');

  // Form States
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [formCategory, setFormCategory] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const filteredInventory = activeCategory === 'All' 
    ? DEMO_INVENTORY 
    : DEMO_INVENTORY.filter(item => item.category === activeCategory);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const handleSubmit = () => {
    const finalCategory = isCreatingCategory ? newCategoryName : formCategory;
    console.log({ productName, costPrice, sellingPrice, quantity, photoUri, finalCategory });
    setProductName('');
    setCostPrice('');
    setSellingPrice('');
    setQuantity('');
    setPhotoUri(null);
    setFormCategory('');
    setNewCategoryName('');
    setIsCreatingCategory(false);
    setIsAddModalVisible(false);
  };

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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => router.replace('/(admin)/dashboard')}
          >
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Store Inventory</Text>
        </View>
        <TouchableOpacity 
          style={[styles.headerAddBtn, { backgroundColor: theme.invertedBg }]} 
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={18} color={theme.invertedText} />
          <Text style={[styles.headerAddText, { color: theme.invertedText }]}>New Item</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={isDarkMode ? styles.scrollContentDark : styles.scrollContentLight} showsVerticalScrollIndicator={false}>
        
        {/* Category Filters */}
        <View style={styles.categoriesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {['All', ...CATEGORIES].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity 
                  key={cat}
                  style={[
                    styles.categoryPill, 
                    { backgroundColor: isActive ? theme.invertedBg : (isDarkMode ? theme.bg : '#FFFFFF') },
                    { borderColor: isActive ? theme.invertedBg : theme.border },
                  ]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text style={[styles.categoryText, { color: isActive ? theme.invertedText : theme.textMuted }]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Product Cards */}
        <View style={styles.productList}>
          {filteredInventory.map((item) => {
            const isLowStock = item.stock < 20;
            return (
              <View 
                key={item.id} 
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
                    <View style={styles.titleRow}>
                      <Text style={[styles.productName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
                    </View>
                    <View style={[styles.categoryTag, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }]}>
                      <Text style={[styles.categoryTagText, { color: theme.textMuted }]}>{item.category}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.productBottomRow}>
                  <View style={styles.metricColumn}>
                    <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Cost</Text>
                    <Text style={[styles.metricValue, { color: theme.textMuted }]}>ETB {item.costPrice.toFixed(2)}</Text>
                  </View>
                  
                  <View style={styles.metricColumn}>
                    <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Selling</Text>
                    <Text style={[styles.metricValue, { color: theme.text }]}>ETB <Text style={styles.metricValueBold}>{item.sellingPrice.toFixed(2)}</Text></Text>
                  </View>

                  <View style={[styles.metricColumn, { alignItems: 'flex-end' }]}>
                    <Text style={[styles.metricLabel, { color: theme.textMuted }]}>Stock</Text>
                    <Text style={[styles.metricValueBold, { color: isLowStock ? '#DC2626' : '#059669' }]}>
                      {item.stock} Units
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
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
                  if (tab.id === 'Sales') router.replace('/(admin)/sales');
                  if (tab.id === 'Stock') router.replace('/(admin)/stock');
                  if (tab.id === 'Suppliers') router.replace('/(admin)/suppliers');
                  if (tab.id === 'Approvals') router.replace('/(admin)/approvals');
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

      {/* Add Product Modal */}
      <Modal visible={isAddModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.bottomSheet, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}>
            
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Add to Inventory</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>
              
              <TouchableOpacity style={[styles.photoPicker, { backgroundColor: theme.inputBg, borderColor: theme.border }]} onPress={handlePickImage}>
                {photoUri ? (
                  <Image source={{ uri: photoUri }} style={styles.previewImage} />
                ) : (
                  <>
                    <Ionicons name="image-outline" size={32} color={theme.textMuted} />
                    <Text style={[styles.photoPickerText, { color: theme.textMuted }]}>Upload Product Image</Text>
                  </>
                )}
              </TouchableOpacity>

              <Text style={[styles.inputLabel, { color: theme.text }]}>Product Name</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                placeholder="e.g. Premium Arabica Coffee"
                placeholderTextColor={theme.textMuted}
                value={productName}
                onChangeText={setProductName}
              />

              <View style={styles.rowInputs}>
                <View style={styles.halfInput}>
                  <Text style={[styles.inputLabel, { color: theme.text }]}>Cost Price (ETB)</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                    placeholder="0.00"
                    placeholderTextColor={theme.textMuted}
                    keyboardType="numeric"
                    value={costPrice}
                    onChangeText={setCostPrice}
                  />
                </View>
                <View style={styles.halfInput}>
                  <Text style={[styles.inputLabel, { color: theme.text }]}>Selling Price (ETB)</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                    placeholder="0.00"
                    placeholderTextColor={theme.textMuted}
                    keyboardType="numeric"
                    value={sellingPrice}
                    onChangeText={setSellingPrice}
                  />
                </View>
              </View>

              <Text style={[styles.inputLabel, { color: theme.text }]}>Initial Stock Units</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]}
                placeholder="e.g. 50"
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />

              <Text style={[styles.inputLabel, { color: theme.text }]}>Category Tag</Text>
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
                    <Text style={{ color: formCategory === cat && !isCreatingCategory ? theme.invertedText : theme.text, fontWeight: '600', fontSize: 13 }}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity 
                  style={[
                    styles.formCategoryPill, 
                    { borderStyle: 'dashed', borderColor: theme.textMuted },
                    isCreatingCategory ? { backgroundColor: theme.invertedBg, borderColor: theme.invertedBg } : { backgroundColor: 'transparent' }
                  ]}
                  onPress={() => { setIsCreatingCategory(true); setFormCategory(''); }}
                >
                  <Text style={{ color: isCreatingCategory ? theme.invertedText : theme.textMuted, fontWeight: '600', fontSize: 13 }}>+ Custom</Text>
                </TouchableOpacity>
              </ScrollView>

              {isCreatingCategory && (
                <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border, marginTop: 12 }]}
                  placeholder="Enter new category..."
                  placeholderTextColor={theme.textMuted}
                  value={newCategoryName}
                  onChangeText={setNewCategoryName}
                  autoFocus
                />
              )}

              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: theme.invertedBg }]} onPress={handleSubmit}>
                <Text style={[styles.submitBtnText, { color: theme.invertedText }]}>Save to Inventory</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  menuButton: { marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  
  headerAddBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100 },
  headerAddText: { fontWeight: '700', fontSize: 13, marginLeft: 4 },
  
  scrollContentDark: { paddingBottom: 24, paddingTop: 12 },
  scrollContentLight: { paddingBottom: 130, paddingTop: 12 },
  
  categoriesWrapper: { marginBottom: 20 },
  categoriesScroll: { paddingHorizontal: 20, alignItems: 'center' },
  categoryPill: { borderWidth: 1, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 100, marginRight: 10 },
  categoryText: { fontSize: 13, fontWeight: '700' },
  
  productList: { paddingHorizontal: 20 },
  productCard: { borderRadius: 20, padding: 20, marginBottom: 16 },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  
  productTopRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  productImagePlaceholder: { width: 60, height: 60, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16, backgroundColor: '#F1F5F9' },
  productInfo: { flex: 1, paddingTop: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  productName: { fontSize: 18, fontWeight: '800', flex: 1, paddingRight: 8 },
  categoryTag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  categoryTagText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  
  productBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E2E8F0', paddingTop: 16 },
  metricColumn: { justifyContent: 'center' },
  metricLabel: { fontSize: 11, marginBottom: 4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  metricValue: { fontSize: 15, fontWeight: '600' },
  metricValueBold: { fontSize: 16, fontWeight: '800' },

  unauthorizedContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#F8FAFC' },
  unauthorizedTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 16, marginBottom: 8 },
  unauthorizedSubtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 24 },
  backButton: { backgroundColor: '#1D61F2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 100 },
  backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  darkBottomNav: { borderTopWidth: StyleSheet.hairlineWidth, paddingBottom: 24, paddingTop: 12, flexDirection: 'row', alignItems: 'center' },
  darkNavItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  darkNavText: { fontSize: 10, fontWeight: '500', marginTop: 4 },
  
  lightBottomNavContainer: { position: 'absolute', bottom: 24, left: 20, right: 20 },
  lightBottomNav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 8, justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 15 },
  lightNavItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 8 },
  lightNavItemActive: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#1D61F2', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 100 },
  lightNavText: { fontSize: 10, fontWeight: '600', marginTop: 4 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  bottomSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  sheetTitle: { fontSize: 20, fontWeight: '800' },
  closeBtn: { padding: 4 },
  sheetScroll: { paddingBottom: 40 },
  
  photoPicker: { height: 100, borderRadius: 16, borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', marginBottom: 20, overflow: 'hidden' },
  photoPickerText: { marginTop: 8, fontWeight: '600', fontSize: 13 },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  
  rowInputs: { flexDirection: 'row', gap: 12 },
  halfInput: { flex: 1 },

  inputLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 16, letterSpacing: 0.5 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontWeight: '600' },
  
  formCategoryScroll: { flexDirection: 'row', marginBottom: 4 },
  formCategoryPill: { borderWidth: 1, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, marginRight: 10 },
  
  submitBtn: { marginTop: 32, paddingVertical: 16, borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: '700' },
});