import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Switch,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import { authApi } from '../api/authApi';

const COLORS = {
  bg: '#F5F7F9', // Light Gray
  card: '#FFFFFF',
  text: '#38474F', // Dark Gray
  textSub: '#8A9BA5', // Medium Gray
  border: '#E5E7EB',
  red: '#E85874', // Primary Pink
  primary: '#39A3DD', // Primary Blue
  primaryPink: '#E85874',
  primaryBlue: '#39A3DD',
  white: '#FFFFFF',
  updateBg: '#FFFBEB', // Light Blue
  updateText: '#39A3DD', // Primary Blue
};

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onViewProfile: () => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'preferences') => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onLogout, onViewProfile, onOpenPolicy }) => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTheme, setSelectedTheme] = useState('System Default');

  const languages = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Tamil'];
  const themes = ['System Default', 'Light Mode', 'Dark Mode'];

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authApi.getMe();
        if (userData && userData.data) {
          setUser(userData.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data in settings", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={onLogout} activeOpacity={0.7}>
          <PowerIcon color={COLORS.red} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Profile Banner */}
        <View style={styles.heroProfileBanner}>
          <View style={styles.avatarWrapHero}>
            {/* Using a placeholder SVG or color block for avatar since we don't have the image file */}
            <View style={styles.avatarPlaceholderHero} />
          </View>
          <Text style={styles.heroProfileName}>{user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Loading...'}</Text>
          <Text style={styles.heroProfileEmail}>{user ? user.email : ''}</Text>
          <TouchableOpacity style={styles.viewProfileBtnHero} activeOpacity={0.8} onPress={onViewProfile}>
            <Text style={styles.viewProfileTextHero}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Grid */}
        <View style={styles.settingsGrid}>


          {/* Theme */}
          <TouchableOpacity style={styles.gridSquare} activeOpacity={0.7} onPress={() => setThemeModalVisible(true)}>
            <View style={[styles.gridIconWrap, { backgroundColor: '#D4EAF7' }]}>
               <Text style={{ color: COLORS.primaryBlue, fontWeight: 'bold', fontSize: 20 }}>D</Text>
            </View>
            <Text style={styles.gridTitle}>Theme</Text>
            <Text style={styles.gridSubText}>{selectedTheme}</Text>
          </TouchableOpacity>

          {/* Language */}
          <TouchableOpacity style={styles.gridSquare} activeOpacity={0.7} onPress={() => setLanguageModalVisible(true)}>
            <View style={[styles.gridIconWrap, { backgroundColor: '#F59FB5' }]}>
               <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 20 }}>A</Text>
            </View>
            <Text style={styles.gridTitle}>Language</Text>
            <Text style={styles.gridSubText}>{selectedLanguage}</Text>
          </TouchableOpacity>

          {/* Location */}
          <View style={styles.gridSquare}>
            <View style={[styles.gridIconWrap, { backgroundColor: '#FDD7E0' }]}>
              <LocationIcon color={COLORS.primaryPink} />
            </View>
            <Text style={styles.gridTitle}>Location</Text>
            <Switch
              style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#E5E7EB', true: COLORS.primaryPink }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          {/* Privacy */}
          <TouchableOpacity style={styles.gridSquare} activeOpacity={0.7} onPress={() => onOpenPolicy('privacy')}>
            <View style={[styles.gridIconWrap, { backgroundColor: '#D4EAF7' }]}>
              <LockIcon color={COLORS.primaryBlue} />
            </View>
            <Text style={styles.gridTitle}>Privacy</Text>
            <Text style={styles.gridSubText}>Policy & Prefs</Text>
          </TouchableOpacity>

          {/* Terms */}
          <TouchableOpacity style={styles.gridSquare} activeOpacity={0.7} onPress={() => onOpenPolicy('terms')}>
            <View style={[styles.gridIconWrap, { backgroundColor: '#F59FB5' }]}>
              <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 20 }}>§</Text>
            </View>
            <Text style={styles.gridTitle}>Terms</Text>
            <Text style={styles.gridSubText}>Of Service</Text>
          </TouchableOpacity>

          {/* Test Alarm Sound */}
          <TouchableOpacity 
            style={[styles.gridSquare, styles.gridFullWidth, { backgroundColor: '#FFFBEB' }]} 
            activeOpacity={0.7} 
            onPress={async () => {
               const { sendLocalNotification } = require('../utils/notifications');
               await sendLocalNotification('Test Alarm ⏰', 'This is what your 9:30 AM / 6:30 PM buzzer will sound like!');
            }}
          >
            <View style={styles.gridHeaderRow}>
               <View style={[styles.gridIconWrap, { backgroundColor: '#F59E0B' }]}>
                 <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18 }}>🔔</Text>
               </View>
               <Text style={styles.gridTitle}>Test Alarm Sound</Text>
            </View>
            <Text style={styles.gridSubText} numberOfLines={1}>Tap here to trigger a test buzzer notification</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Update Available Banner Removed as requested */}

      {/* Language Modal */}
      <Modal visible={languageModalVisible} transparent animationType="fade" onRequestClose={() => setLanguageModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setLanguageModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Language</Text>
                {languages.map((lang, idx) => (
                  <TouchableOpacity 
                    key={idx} 
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedLanguage(lang);
                      setLanguageModalVisible(false);
                    }}
                  >
                    <Text style={[styles.modalItemText, selectedLanguage === lang && styles.modalItemTextSelected]}>
                      {lang}
                    </Text>
                    {selectedLanguage === lang && <CheckIcon color={COLORS.primary} />}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Theme Modal */}
      <Modal visible={themeModalVisible} transparent animationType="fade" onRequestClose={() => setThemeModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setThemeModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Theme</Text>
                {themes.map((theme, idx) => (
                  <TouchableOpacity 
                    key={idx} 
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedTheme(theme);
                      setThemeModalVisible(false);
                    }}
                  >
                    <Text style={[styles.modalItemText, selectedTheme === theme && styles.modalItemTextSelected]}>
                      {theme}
                    </Text>
                    {selectedTheme === theme && <CheckIcon color={COLORS.primary} />}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

// --- Icons ---

function ArrowLeftIcon({ color = '#38474F' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M20 12H4M4 12L10 6M4 12L10 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PowerIcon({ color = '#E85874' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M18.36 6.64a9 9 0 1 1-12.73 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="12" y1="2" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronRightIcon({ color = '#8A9BA5' }: { color?: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronDownIcon({ color = '#8A9BA5' }: { color?: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function OrgIcon({ color }: { color: string }) {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="2" />
      <Path d="M9 22v-4h6v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

function LocationIcon({ color }: { color: string }) {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" />
    </Svg>
  );
}

function LockIcon({ color }: { color: string }) {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="2" />
      <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}


// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.bg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 80, // Space for banner
  },
  heroProfileBanner: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 32,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  avatarWrapHero: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#F5F7F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderHero: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  heroProfileName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  heroProfileEmail: {
    fontSize: 14,
    color: COLORS.textSub,
    marginBottom: 20,
  },
  viewProfileBtnHero: {
    backgroundColor: COLORS.primaryPink,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  viewProfileTextHero: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  settingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 24,
  },
  gridSquare: {
    backgroundColor: COLORS.white,
    width: '47%',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    minHeight: 150,
  },
  gridFullWidth: {
    width: '100%',
    minHeight: 100,
  },
  gridIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  gridHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  gridSubText: {
    fontSize: 13,
    color: COLORS.textSub,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrap: {
    marginRight: 16,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.bg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.textSub,
  },
  viewProfileBtn: {
    backgroundColor: COLORS.bg,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewProfileText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 13,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 15,
    color: COLORS.text,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  updateBanner: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: COLORS.updateBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  updateText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '500',
  },
  updateBtnText: {
    color: COLORS.updateText,
    fontSize: 14,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    width: '100%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalItemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  modalItemTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
