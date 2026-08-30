import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

// Initial Mock Data (Keyed by Date string)
const INITIAL_NOTES = {
  '2026-08-30': 'Meeting with Addis Sugar Factory went well. Need to follow up on the missing 50kg bags from last week.',
  '2026-08-28': 'Market is slowing down slightly this week. Oil prices from suppliers are expected to rise next month, need to stock up now.',
  '2026-08-25': 'Enrolled a new supplier for confectionery. Initial batch looks good but check expiration dates closely on the chocolate boxes.',
};

export default function NotesScreen() {
  const router = useRouter();
  const isDarkMode = useAuthStore((state) => state.isDarkMode);

  const [notesLedger, setNotesLedger] = useState<Record<string, string>>(INITIAL_NOTES);
  
  // Editor State
  const [activeDateKey, setActiveDateKey] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Convert ledger object to sorted array (Newest to Oldest)
  const sortedNotes = Object.entries(notesLedger)
    .filter(([_, text]) => text.trim().length > 0) // Hide completely empty notes from the list
    .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
    .map(([date, text]) => ({ date, text }));

  const getTodayKey = () => new Date().toISOString().split('T')[0];

  const openNote = (dateKey: string) => {
    // If opening a new note and it doesn't exist yet, initialize it
    if (!notesLedger[dateKey]) {
      setNotesLedger(prev => ({ ...prev, [dateKey]: '' }));
    }
    setActiveDateKey(dateKey);
    setIsEditorOpen(true);
  };

  const handleTextChange = (text: string) => {
    if (activeDateKey) {
      setNotesLedger((prev) => ({
        ...prev,
        [activeDateKey]: text,
      }));
    }
  };

  const deleteCurrentNote = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this diary entry? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            setNotesLedger((prev) => {
              const updated = { ...prev };
              if (activeDateKey) delete updated[activeDateKey];
              return updated;
            });
            setIsEditorOpen(false);
            setActiveDateKey(null);
          } 
        }
      ]
    );
  };

  // Format date nicely (e.g., "Mon, Aug 30")
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    if (dateString === getTodayKey()) return 'Today';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#F8FAFC',
    text: isDarkMode ? '#E7E9EA' : '#0F172A',
    textMuted: isDarkMode ? '#71767B' : '#64748B',
    border: isDarkMode ? '#2F3336' : '#E2E8F0',
    cardBg: isDarkMode ? '#1E293B' : '#FFFFFF',
    inputBg: isDarkMode ? '#0F1419' : '#FAFAFA',
    invertedBg: isDarkMode ? '#E7E9EA' : '#1D61F2',
    invertedText: isDarkMode ? '#000000' : '#FFFFFF',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.bg} />

      {/* Main List Header */}
      <View style={[styles.header, isDarkMode && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>My Notes</Text>
        </View>
        <TouchableOpacity style={styles.writeBtn} onPress={() => openNote(getTodayKey())}>
          <Ionicons name="create-outline" size={24} color={theme.invertedBg} />
        </TouchableOpacity>
      </View>

      {/* Notes Feed */}
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {sortedNotes.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="journal-outline" size={48} color={theme.textMuted} />
            <Text style={[styles.emptyStateTitle, { color: theme.text }]}>No Notes Yet</Text>
            <Text style={[styles.emptyStateSub, { color: theme.textMuted }]}>Tap the edit icon to start today's diary.</Text>
          </View>
        ) : (
          sortedNotes.map((note) => (
            <TouchableOpacity 
              key={note.date} 
              style={[styles.noteCard, { backgroundColor: theme.cardBg, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }, !isDarkMode && styles.lightShadow]}
              onPress={() => openNote(note.date)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardDate, { color: theme.text }]}>{formatDate(note.date)}</Text>
                <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
              </View>
              <Text style={[styles.cardPreview, { color: theme.textMuted }]} numberOfLines={2}>
                {note.text}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Editor Modal */}
      <Modal visible={isEditorOpen} animationType="slide" presentationStyle="pageSheet">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.safeArea, { backgroundColor: theme.bg }]}>
          
          <View style={[styles.editorHeader, { borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={() => setIsEditorOpen(false)} style={styles.closeEditorBtn}>
              <Ionicons name="chevron-down" size={24} color={theme.text} />
              <Text style={[styles.closeEditorText, { color: theme.text }]}>Save & Close</Text>
            </TouchableOpacity>
            
            {activeDateKey && (
              <TouchableOpacity onPress={deleteCurrentNote}>
                <Ionicons name="trash-outline" size={22} color="#DC2626" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.editorCanvas}>
            <Text style={[styles.editorDateTitle, { color: theme.text }]}>
              {activeDateKey ? formatDate(activeDateKey) : ''}
            </Text>
            
            <TextInput
              style={[styles.textArea, { color: theme.text }]}
              placeholder="Start writing your thoughts for this day..."
              placeholderTextColor={theme.textMuted}
              multiline
              textAlignVertical="top"
              autoFocus
              value={activeDateKey ? notesLedger[activeDateKey] : ''}
              onChangeText={handleTextChange}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menuButton: { padding: 4, marginLeft: -4, marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  writeBtn: { padding: 8, backgroundColor: 'rgba(29, 97, 242, 0.1)', borderRadius: 12 },

  listContainer: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 12 },
  
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyStateTitle: { fontSize: 20, fontWeight: '800', marginTop: 16, marginBottom: 8 },
  emptyStateSub: { fontSize: 14 },

  noteCard: { padding: 20, borderRadius: 16, marginBottom: 16 },
  lightShadow: { shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardDate: { fontSize: 16, fontWeight: '700' },
  cardPreview: { fontSize: 14, lineHeight: 22 },

  editorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth },
  closeEditorBtn: { flexDirection: 'row', alignItems: 'center' },
  closeEditorText: { fontSize: 16, fontWeight: '600', marginLeft: 4 },
  
  editorCanvas: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  editorDateTitle: { fontSize: 24, fontWeight: '800', marginBottom: 16 },
  textArea: { flex: 1, fontSize: 17, lineHeight: 28, fontWeight: '500' },
});