import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const COLORS = {
  bg: '#F5F7F9', // Light Gray
  card: '#FFFFFF',
  text: '#38474F', // Dark Gray
  textSub: '#8A9BA5', // Medium Gray
};

interface PolicyScreenProps {
  type: 'privacy' | 'terms' | 'preferences';
  onBack: () => void;
}

export const PolicyScreen: React.FC<PolicyScreenProps> = ({ type, onBack }) => {
  let title = '';
  let content = '';

  switch (type) {
    case 'privacy':
      title = 'Privacy Policy';
      content = 'Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our application.\n\nWe only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.\n\nWe don\'t share any personally identifying information publicly or with third-parties, except when required to by law.\n\nOur app may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.';
      break;
    case 'terms':
      title = 'Terms of Service';
      content = 'By accessing our app, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.\n\nIf you do not agree with any of these terms, you are prohibited from using or accessing this app. The materials contained in this app are protected by applicable copyright and trademark law.\n\nWe may revise these terms of service for its app at any time without notice. By using this app you are agreeing to be bound by the then current version of these terms of service.';
      break;
    case 'preferences':
      title = 'Privacy Preferences';
      content = 'Manage how your data is used and shared.\n\n- Essential Data: Required for the app to function properly. Cannot be disabled.\n- Analytics: Help us improve the app by sharing anonymous usage data.\n- Personalization: Allow us to tailor content to your interests.\n\nYou can update these preferences at any time in the settings menu.';
      break;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.7}>
          <ArrowLeftIcon color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.bodyText}>{content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Icons ---
function ArrowLeftIcon({ color = '#38474F' }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M20 12H4M4 12L10 6M4 12L10 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.bg,
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  bodyText: {
    fontSize: 16,
    color: COLORS.textSub,
    lineHeight: 24,
    backgroundColor: COLORS.card,
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
});
