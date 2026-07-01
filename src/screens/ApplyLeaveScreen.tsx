import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line, Circle, Polyline, Rect } from 'react-native-svg';

const COLORS = {
  bg: '#F5F7F9', // Light Gray
  white: '#FFFFFF',
  primary: '#E85874', // Primary Pink
  primaryBg: '#FDD7E0', // Light Pink
  primaryBlue: '#39A3DD', // Primary Blue
  blueLight: '#D4EAF7', // Light Blue
  red: '#C4455D', // Dark Pink
  text: '#38474F', // Dark Gray
  textSub: '#8A9BA5', // Medium Gray
  textMuted: '#8A9BA5', // Medium Gray
  border: '#E5E7EB',
  inputBg: '#FFFFFF', // using white for inputs over light gray bg
};

import { leaveApi } from '../api/leaveApi';
import { authApi } from '../api/authApi';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ApplyLeaveScreenProps {
  leaveData: any;
  onBack: () => void;
  onSubmit: () => void;
}

export const ApplyLeaveScreen: React.FC<ApplyLeaveScreenProps> = ({
  leaveData,
  onBack,
  onSubmit,
}) => {
  const [teamEmail, setTeamEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).replace(/ /g, '-');
  };

  const formatDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'short' });
  };

  const totalDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authApi.getMe();
        if (userData && userData.data) {
          setUser(userData.data);
        }
      } catch (err) {
        console.warn('Failed to fetch user in apply leave', err);
      }
    };
    fetchUser();
  }, []);

  const getApiLeaveType = (uiTitle: string) => {
    // Strict mapping to backend Enums
    const map: Record<string, string> = {
      'Casual Leave': 'Casual',
      'Sick Leave': 'Sick',
      'Earned Leave': 'Earned',
      'Leave Without Pay': 'LWP',
      'Paternity Leave': 'Paternity',
      'Maternity Leave': 'Maternity',
      'Sabbatical Leave': 'Sabbatical',
      'Compensatory Off': 'CompOff'
    };
    if (map[uiTitle]) return map[uiTitle];
    // Fallback
    return uiTitle.endsWith(' Leave') ? uiTitle.replace(' Leave', '') : uiTitle;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const rawLeaveType = leaveData?.title || 'Casual Leave';
      const apiLeaveType = getApiLeaveType(rawLeaveType);

      const payload = {
        leaveType: apiLeaveType,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalDays: totalDays,
        teamEmail,
        reason,
        status: 'pending'
      };

      const res = await leaveApi.applyForLeave(payload);
      Alert.alert("Success", "Leave applied successfully!");
      onSubmit(); // Call the parent callback to navigate back
    } catch (error: any) {
      console.warn("Failed to apply for leave", error);
      Alert.alert("Error", error.message || "Failed to submit leave application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply Leave</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Horizontal Balance Carousel */}
        <View style={styles.carouselWrap}>
          <Text style={styles.carouselTitle}>Your Leave Balances</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
            <View style={[styles.balanceCard, { backgroundColor: '#FDD7E0' }]}>
              <Text style={styles.balanceCardTitle}>Casual Leave</Text>
              <Text style={styles.balanceCardValue}>12.0</Text>
              <Text style={styles.balanceCardSub}>Days Available</Text>
            </View>
            <View style={[styles.balanceCard, { backgroundColor: '#D4EAF7' }]}>
              <Text style={[styles.balanceCardTitle, { color: COLORS.primaryBlue }]}>Sick Leave</Text>
              <Text style={[styles.balanceCardValue, { color: COLORS.primaryBlue }]}>5.0</Text>
              <Text style={[styles.balanceCardSub, { color: COLORS.primaryBlue }]}>Days Available</Text>
            </View>
            <View style={[styles.balanceCard, { backgroundColor: '#F59FB5' }]}>
              <Text style={[styles.balanceCardTitle, { color: '#FFF' }]}>Earned Leave</Text>
              <Text style={[styles.balanceCardValue, { color: '#FFF' }]}>8.0</Text>
              <Text style={[styles.balanceCardSub, { color: '#FFF' }]}>Days Available</Text>
            </View>
          </ScrollView>
        </View>

        {/* Floating Action Form */}
        <View style={styles.floatingForm}>
          {/* Employee ID */}
          <View style={styles.section}>
            <Text style={styles.label}>Employee ID</Text>
            <Text style={styles.valueText}>
              {user ? `${user.employeeId || 'ID_N/A'} ${user.firstName || ''} ${user.lastName || ''}` : 'Loading...'}
            </Text>
          </View>

          {/* Leave Type */}
          <View style={styles.section}>
            <Text style={styles.labelRequired}>Leave type <Text style={styles.requiredAsterisk}>*</Text></Text>
            <TouchableOpacity style={styles.rowSelector} activeOpacity={0.7}>
              <Text style={styles.valueText}>{leaveData?.title || 'Casual Leave'}</Text>
              <ChevronRightIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.dateRow}>
            {/* From Date */}
            <View style={styles.halfSection}>
              <Text style={styles.labelRequired}>From <Text style={styles.requiredAsterisk}>*</Text></Text>
              <TouchableOpacity style={styles.rowSelector} activeOpacity={0.7} onPress={() => setShowStartPicker(true)}>
                <Text style={styles.valueText}>{formatDate(startDate)}</Text>
                <CalendarIcon />
              </TouchableOpacity>
            </View>

            {/* To Date */}
            <View style={styles.halfSection}>
              <Text style={styles.labelRequired}>To <Text style={styles.requiredAsterisk}>*</Text></Text>
              <TouchableOpacity style={styles.rowSelector} activeOpacity={0.7} onPress={() => setShowEndPicker(true)}>
                <Text style={styles.valueText}>{formatDate(endDate)}</Text>
                <CalendarIcon />
              </TouchableOpacity>
            </View>
          </View>

          {/* Day of Week */}
          <View style={styles.section}>
            <Text style={styles.dayText}><Text style={styles.dayTextBold}>{formatDate(startDate).replace('-', ' ')},</Text> {formatDayOfWeek(startDate)}</Text>
            <TouchableOpacity style={styles.chipSelected} activeOpacity={0.8}>
              <Text style={styles.chipSelectedText}>Full Day</Text>
            </TouchableOpacity>
          </View>

          {/* Total */}
          <View style={styles.section}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.valueText}>{totalDays}.0 Day(s)</Text>
          </View>

          {/* Leave (Inputs) */}
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionHeading}>Details</Text>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>Team Email ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter value..."
                placeholderTextColor={COLORS.textMuted}
                value={teamEmail}
                onChangeText={setTeamEmail}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>Reason for leave</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter value..."
                placeholderTextColor={COLORS.textMuted}
                value={reason}
                onChangeText={setReason}
              />
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onBack} activeOpacity={0.8}>
          <Text style={styles.btnCancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSubmit]} onPress={handleSubmit} disabled={isSubmitting} activeOpacity={0.8}>
          {isSubmitting ? (
            <Text style={styles.btnSubmitText}>Submitting...</Text>
          ) : (
            <Text style={styles.btnSubmitText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(Platform.OS === 'ios');
            if (selectedDate) {
              setStartDate(selectedDate);
              if (selectedDate > endDate) {
                setEndDate(selectedDate);
              }
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          minimumDate={startDate}
          onChange={(event, selectedDate) => {
            setShowEndPicker(Platform.OS === 'ios');
            if (selectedDate) {
              setEndDate(selectedDate);
            }
          }}
        />
      )}

    </SafeAreaView>
  );
};

// --- Icons ---

function ArrowLeftIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M20 12H4M4 12L10 6M4 12L10 18" stroke={COLORS.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronRightIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={COLORS.textSub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function InfoIcon() {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={COLORS.primaryBlue} strokeWidth="1.5" />
      <Path d="M12 16v-4" stroke={COLORS.primaryBlue} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M12 8h.01" stroke={COLORS.primaryBlue} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function CalendarIcon() {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={COLORS.textSub} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={COLORS.textSub} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={COLORS.textSub} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={COLORS.textSub} strokeWidth="1.5" strokeLinecap="round" />
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
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 40,
  },
  carouselWrap: {
    marginBottom: 20,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginLeft: 24,
    marginBottom: 12,
  },
  carouselContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  balanceCard: {
    width: 140,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  balanceCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  balanceCardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  balanceCardSub: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    opacity: 0.8,
  },
  floatingForm: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfSection: {
    flex: 1,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionSpacing: {
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  labelRequired: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  requiredAsterisk: {
    color: COLORS.red,
  },
  valueText: {
    fontSize: 15,
    color: COLORS.textSub,
  },
  rowSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  balanceBadgeWrap: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  balanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blueLight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginRight: 8,
  },
  dayText: {
    fontSize: 16,
    color: COLORS.textSub,
    marginBottom: 12,
  },
  dayTextBold: {
    fontWeight: '800',
    color: COLORS.text,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  chipSelectedText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16,
  },
  inputWrap: {
    marginBottom: 20,
  },
  input: {
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: COLORS.bg,
  },
  btn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  btnCancel: {
    backgroundColor: COLORS.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnCancelText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  btnSubmit: {
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  btnSubmitText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
