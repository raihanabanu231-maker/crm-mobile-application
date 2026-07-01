import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Animated,
  Image,
  BackHandler,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Rect, Path, Line, Polyline, Ellipse, Polygon } from 'react-native-svg';
import { authApi } from '../api/authApi';
import { activityApi } from '../api/activityApi';
import { attendanceApi } from '../api/attendanceApi';
import { leaveApi } from '../api/leaveApi';
import { holidayApi } from '../api/holidayApi';
import { wishesApi } from '../api/wishesApi';
import apiClient from '../api/apiClient';
import { sendLocalNotification } from '../utils/notifications';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
const COLORS = {
  bg: '#F5F7F9',
  white: '#FFFFFF',
  primary: '#39A3DD', // Vibrant Blue
  primaryLight: '#D1E8FF',
  primaryBlue: '#39A3DD',
  blueLight: '#D1E8FF',
  green: '#10B981',
  greenBg: '#D1FAE5',
  orange: '#F59E0B',
  orangeBg: '#FEF3C7',
  red: '#EF4444',
  text: '#1A1F2E',
  textSub: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  absent: '#EF4444',
  badge: '#39A3DD',
  checkIn: '#10B981',
  weekend: '#F59E0B',
  timerBg: '#FFFFFF',
  darkBg: '#F5F7F9',
  darkCard: '#FFFFFF',
  darkCardText: '#1A1F2E',
  darkCardSub: '#6B7280',
};

const scheduleData = [
  {
    date: '30',
    day: 'MON',
    type: 'General',
    time: '09:30 AM to 06:30 PM',
    status: 'Absent',
    hours: null,
  },
  {
    date: '31',
    day: 'TUE',
    type: 'General',
    time: '09:30 AM to 06:30 PM',
    status: 'Absent',
    hours: '00:01',
  },
  {
    date: '01',
    day: 'WED',
    type: 'General',
    time: '09:30 AM to 06:30 PM',
    status: 'Present',
    hours: '08:45',
  },
  {
    date: '02',
    day: 'THU',
    type: 'General',
    time: '09:30 AM to 06:30 PM',
    status: 'Present',
    hours: '09:02',
  },
];

const LEAVE_DATA = [
  {
    title: 'Casual Leave',
    balance: '12',
    booked: '0',
    color: '#4A90E2', // Blue
    bgColor: '#EAF4FF',
    icon: (color: string) => (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="4" />
        <Path d="M2 18h20M4 22h16" />
      </Svg>
    )
  },
  {
    title: 'Earned Leave',
    balance: '21',
    booked: '0',
    color: '#7CB342', // Green
    bgColor: '#F1F8E9',
    icon: (color: string) => (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="8" />
        <Path d="M12 8v4l2 2" />
      </Svg>
    )
  },
  {
    title: 'Leave Without Pay',
    balance: null,
    booked: '0',
    color: '#E57373', // Red
    bgColor: '#FFEBEE',
    icon: (color: string) => (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        <Circle cx="12" cy="12" r="5" />
      </Svg>
    )
  },
  {
    title: 'Paternity Leave',
    balance: '0',
    booked: '0',
    color: '#FF8A65', // Orange
    bgColor: '#FBE9E7',
    icon: (color: string) => (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M7 10v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10" />
        <Path d="M7 10h10" />
        <Path d="M9 10V6h6v4" />
        <Path d="M10 6V4a2 2 0 0 1 4 0v2" />
      </Svg>
    )
  },
  {
    title: 'Sabbatical Leave',
    balance: '0',
    booked: '0',
    color: '#FDD835', // Yellow
    bgColor: '#FFFDE7',
    icon: (color: string) => (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="10" />
        <Polyline points="12 6 12 12 16 14" />
      </Svg>
    )
  },
  {
    title: 'Sick Leave',
    balance: '10',
    booked: '2',
    color: '#AB47BC', // Purple
    bgColor: '#F3E5F5',
    icon: (color: string) => (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M4 4v7a8 8 0 0 0 16 0V4" />
        <Path d="M12 19V21" />
        <Path d="M10 21H14" />
      </Svg>
    )
  }
];

function MessageIcon({ color = '#38474F' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const TeamSpaceView = ({ todayWishes, onWishPress }: { todayWishes?: any[], onWishPress: (w: any) => void }) => {
  const birthdays = todayWishes?.filter(w => w.type?.toLowerCase() === 'birthday') || [];
  const anniversaries = todayWishes?.filter(w => w.type?.toLowerCase() !== 'birthday') || [];

  return (
    <View style={{ gap: 16 }}>
      <View style={{ backgroundColor: '#FFEED9', borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 48, height: 48, backgroundColor: '#000', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
          <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold' }}>I</Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#1A1F2E', marginBottom: 4 }}>IT</Text>
          <Text style={{ fontSize: 13, color: '#4B5563' }}>Team Strength : <Text style={{ fontWeight: '700' }}>1</Text></Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#FFF', borderRadius: 16, padding: 20, minHeight: 140 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#1A1F2E', marginBottom: 24 }}>Anniversaries</Text>
        {anniversaries.length > 0 ? (
          anniversaries.map((a, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                  <Text style={{ color: '#39A3DD', fontWeight: 'bold' }}>{a.name?.charAt(0) || 'A'}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#1A1F2E' }}>{a.name}</Text>
                  <Text style={{ fontSize: 13, color: '#6B7280' }}>{a.designation || 'Colleague'}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => onWishPress(a)} style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#39A3DD' }}>Wish</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={{ fontSize: 14, color: '#8A9BA5', textAlign: 'center', marginTop: 10 }}>No Anniversaries today!</Text>
        )}
      </View>

      <View style={{ backgroundColor: '#FFF', borderRadius: 16, padding: 20, minHeight: 140 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#1A1F2E', marginBottom: 24 }}>Birthday buddies</Text>
        {birthdays.length > 0 ? (
          birthdays.map((b, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                  <Text style={{ color: '#39A3DD', fontWeight: 'bold' }}>{b.name?.charAt(0) || 'B'}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#1A1F2E' }}>{b.name}</Text>
                  <Text style={{ fontSize: 13, color: '#6B7280' }}>{b.designation || 'Colleague'}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => onWishPress(b)} style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#39A3DD' }}>Wish</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={{ fontSize: 14, color: '#8A9BA5', textAlign: 'center', marginTop: 10 }}>No Birthdays today!</Text>
        )}
      </View>
    </View>
  )
};

const MOCK_DEPARTMENT_EMPLOYEES = [
  { id: '1', name: 'Amarnath', role: 'React Native Developer', status: 'online', email: 'amarnath@example.com' },
  { id: '2', name: 'Abhishek', role: 'Backend Developer', status: 'offline', email: 'abhishek@example.com' },
];

const ApprovalsView = ({ pendingRegularizations, loading, onApprove }: { pendingRegularizations: any[], loading: boolean, onApprove: (id: string) => void }) => {
  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
  };

  return (
    <View style={{ gap: 12 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#39A3DD" style={{ marginTop: 40 }} />
      ) : pendingRegularizations?.length === 0 ? (
        <View style={{ alignItems: 'center', padding: 40 }}>
          <Svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}>
            <Circle cx="12" cy="12" r="10" /><Line x1="12" y1="8" x2="12" y2="12" /><Line x1="12" y1="16" x2="12.01" y2="16" />
          </Svg>
          <Text style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 16, fontWeight: '600' }}>No pending regularization requests.</Text>
        </View>
      ) : (
        pendingRegularizations?.map((req, index) => {
          const reg = req.regularization;
          // Displaying user object depending on backend populate logic. Provide fallback text.
          const empName = req.user?.firstName ? `${req.user.firstName} ${req.user.lastName || ''}` : (req.user?.name || 'Employee');
          const empRole = req.user?.designation || 'Staff';

          return (
            <View key={req._id || index} style={{ backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                    <Text style={{ color: '#39A3DD', fontWeight: '800', fontSize: 16 }}>{empName.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#1A1F2E' }}>{empName}</Text>
                    <Text style={{ fontSize: 13, color: '#6B7280' }}>{empRole}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#F59E0B' }}>Pending</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#F3F4F6' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Date</Text>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#39A3DD' }}>{req.date}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Requested In</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1A1F2E' }}>{formatTime(reg?.requestedCheckIn)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Requested Out</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1A1F2E' }}>{formatTime(reg?.requestedCheckOut)}</Text>
                </View>
              </View>

              <View style={{ backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8, marginBottom: 16 }}>
                <Text style={{ fontSize: 13, color: '#4B5563', fontStyle: 'italic' }}>Reason: "{reg?.reason}"</Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity onPress={() => onApprove(req._id || req.id)} style={{ flex: 1, backgroundColor: '#10B981', paddingVertical: 12, borderRadius: 100, alignItems: 'center' }}>
                  <Text style={{ color: '#FFF', fontWeight: '800', fontSize: 14 }}>Approve Request</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
};

const DepartmentView = ({ onSelectEmployee }: { onSelectEmployee: (emp: any) => void }) => (
  <View style={{ gap: 12 }}>
    {MOCK_DEPARTMENT_EMPLOYEES.map(emp => (
      <TouchableOpacity
        key={emp.id}
        activeOpacity={0.7}
        onPress={() => onSelectEmployee(emp)}
        style={{ backgroundColor: '#FFF', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center' }}
      >
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginRight: 16, position: 'relative' }}>
          <Text style={{ color: '#39A3DD', fontWeight: 'bold', fontSize: 16 }}>{emp.name.charAt(0)}</Text>
          <View style={{
            position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6,
            backgroundColor: emp.status === 'online' ? '#10B981' : '#9CA3AF',
            borderWidth: 2, borderColor: '#FFF'
          }} />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1A1F2E', marginBottom: 2 }}>{emp.name}</Text>
          <Text style={{ fontSize: 13, color: '#6B7280' }}>{emp.role}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const EmployeeProfileModal = ({ visible, employee, onClose }: { visible: boolean, employee: any, onClose: () => void }) => {
  const [activeProfileTab, setActiveProfileTab] = useState('My Profile');
  const profileTabs = ['My Profile', 'Department', 'Related Data'];

  return (
    <Modal visible={visible} transparent={false} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 }}>
          <TouchableOpacity onPress={onClose} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1F2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><Line x1="18" y1="6" x2="6" y2="18" /><Line x1="6" y1="6" x2="18" y2="18" /></Svg>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#1A1F2E' }}>{employee?.name}</Text>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><Polyline points="16 6 12 2 8 6" /><Line x1="12" y1="2" x2="12" y2="15" /></Svg>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingHorizontal: 16 }}>
          {profileTabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveProfileTab(tab)}
              style={{ marginRight: 24, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: activeProfileTab === tab ? '#E85874' : 'transparent' }}
            >
              <Text style={{ fontSize: 14, fontWeight: '500', color: activeProfileTab === tab ? '#E85874' : '#6B7280' }}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
          {activeProfileTab === 'My Profile' && (
            <View>
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Location</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1F2E' }}>Bangalore</Text>
              </View>

              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Time Zone</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1F2E' }}>India Standard Time (GMT+05:30)</Text>
              </View>

              <View style={{ marginBottom: 32 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#1A1F2E', marginBottom: 16 }}>Tags</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                  {/* Tag illustration mock */}
                  <View style={{ position: 'relative', width: 64, height: 64 }}>
                    <Svg width="60" height="60" viewBox="0 0 24 24" fill="#FFCF96" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: [{ rotate: '-45deg' }] }}>
                      <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <Line x1="7" y1="7" x2="7.01" y2="7" />
                    </Svg>
                    <View style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: 14, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' }}>
                      <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: -2 }}>+</Text>
                    </View>
                  </View>
                </View>
              </View>

              <Text style={{ fontSize: 20, fontWeight: '700', color: '#1A1F2E', marginBottom: 24 }}>Basic information</Text>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Employee ID</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1F2E' }}>ATPL053</Text>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Nick name</Text>
                <Text style={{ fontSize: 15, fontWeight: '500', color: '#1A1F2E' }}>-</Text>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>First Name</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1F2E' }}>{employee?.name ? employee.name.split(' ')[0] : 'Abishek'}</Text>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Email address</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#10B981', textDecorationLine: 'underline' }}>{employee?.email}</Text>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Last Name</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1F2E' }}>{employee?.name ? employee.name.split(' ').slice(1).join(' ') || '-' : 'Sivaraj'}</Text>
              </View>

              <View style={{ marginBottom: 40 }}>
                <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Photo</Text>
                <View style={{ width: 80, height: 80, backgroundColor: '#E0E7FF', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#39A3DD', fontWeight: 'bold', fontSize: 24 }}>{employee?.name?.charAt(0)}</Text>
                </View>
              </View>

            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

interface HomeScreenProps {
  initialNav?: string;
  onLogout: () => void;
  onSettingsPress?: () => void;
  onApplyLeave?: (leaveData: any) => void;
  onMessagePress?: () => void;
  onDailyCallReportPress?: () => void;
}

const getHolidayIcon = (holidayName: string, color: string) => {
  const name = (holidayName || '').toLowerCase();

  if (name.includes('independen') || name.includes('republic') || name.includes('rebublic')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <Line x1="4" y1="22" x2="4" y2="15" />
      </Svg>
    );
  }
  if (name.includes('deepavali') || name.includes('diwali') || name.includes('pongal')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="5" />
        <Line x1="12" y1="1" x2="12" y2="3" />
        <Line x1="12" y1="21" x2="12" y2="23" />
        <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <Line x1="1" y1="12" x2="3" y2="12" />
        <Line x1="21" y1="12" x2="23" y2="12" />
        <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </Svg>
    );
  }
  if (name.includes('christmas')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M8 19h8" />
        <Path d="M12 22v-3" />
        <Path d="M12 15l-4 4h8l-4-4" />
        <Path d="M12 8l-6 7h12l-6-7" />
        <Path d="M12 2L4 12h16L12 2z" />
      </Svg>
    );
  }
  if (name.includes('ayutha') || name.includes('vijaya') || name.includes('pooja') || name.includes('ganesh')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 22c4.97-1.33 8-5.33 8-10s-3.03-8.67-8-10c-4.97 1.33-8 5.33-8 10s3.03 8.67 8 10z" />
        <Path d="M12 22c2-1.33 4-5.33 4-10S14 3.33 12 2" />
        <Path d="M12 22c-2-1.33-4-5.33-4-10S10 3.33 12 2" />
      </Svg>
    );
  }
  if (name.includes('gandhi')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="6" cy="15" r="4" />
        <Circle cx="18" cy="15" r="4" />
        <Path d="M14 15a2 2 0 0 0-4 0" />
        <Path d="M2.5 13L5 7c.7-1.3 1.4-2 3-2" />
        <Path d="M21.5 13L19 7c-.7-1.3-1.5-2-3-2" />
      </Svg>
    );
  }
  if (name.includes('ramzan') || name.includes('moharam') || name.includes('bakrid') || name.includes('eid')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </Svg>
    );
  }
  if (name.includes('new year')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </Svg>
    );
  }
  if (name.includes('uzhavar') || name.includes('farmer')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 0 8.48A11.83 11.83 0 0 1 11 20" />
        <Line x1="11" y1="20" x2="15" y2="15" />
      </Svg>
    );
  }
  if (name.includes('may day') || name.includes('labor')) {
    return (
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M15 14l-8 8" />
        <Path d="M14.5 13.5L18 10c1.5-1.5 3.5-1 4.5 0s1.5 3 0 4.5l-3.5 3.5" />
        <Path d="M10 18l-1.5 1.5" />
        <Path d="M6 14l-1.5 1.5" />
      </Svg>
    );
  }
  // Fallback to text initial
  return <Text style={{ fontSize: 16, fontWeight: 'bold', color }}>{holidayName ? holidayName.charAt(0) : 'H'}</Text>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ initialNav, onLogout, onApplyLeave, onSettingsPress, onMessagePress, onDailyCallReportPress }) => {
  const insets = useSafeAreaInsets();
  // Animation for Bottom Tab Bar
  const lastScrollY = useRef(0);
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const isScrollingDown = currentScrollY > lastScrollY.current;

    // Only trigger animation if scrolled past a small threshold
    if (isScrollingDown && currentScrollY > 50) {
      Animated.timing(tabBarTranslateY, {
        toValue: 100, // Move down by 100 to hide
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (!isScrollingDown || currentScrollY <= 50) {
      Animated.timing(tabBarTranslateY, {
        toValue: 0, // Move back up to show
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = currentScrollY;
  };

  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8, // subtle float
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const [activeTab, setActiveTab] = useState('My Space');
  const [activeNav, setActiveNav] = useState(initialNav || 'Activities');
  const [activeTeamNav, setActiveTeamNav] = useState('Team Space');
  const [bottomTab, setBottomTab] = useState('Home');
  const [checkedIn, setCheckedIn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  useEffect(() => {
    const backAction = () => {
      if (activeNav !== 'Activities' && activeTab === 'My Space') {
        setActiveNav('Activities');
        return true;
      } else if (activeTab === 'Team' && activeTeamNav !== 'Team Space') {
        setActiveTeamNav('Team Space');
        return true;
      } else if (activeTab !== 'My Space') {
        setActiveTab('My Space');
        setActiveNav('Activities');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [activeTab, activeNav, activeTeamNav]);

  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);

  // Dynamic User State
  const [user, setUser] = useState<any>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState<any>({});
  const [savingProfile, setSavingProfile] = useState(false);

  // Session Logs State
  const [sessionLogs, setSessionLogs] = useState<any[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const [todayRecordId, setTodayRecordId] = useState('');
  const [todayRecordDate, setTodayRecordDate] = useState('');
  const [pendingRegularization, setPendingRegularization] = useState<any>(null);

  // Regularization State
  const [regularizeModalVisible, setRegularizeModalVisible] = useState(false);
  const [regularizeCheckIn, setRegularizeCheckIn] = useState('');
  const [regularizeCheckOut, setRegularizeCheckOut] = useState('');
  const [regularizeReason, setRegularizeReason] = useState('');

  // Drawer State
  const [isSideDrawerVisible, setSideDrawerVisible] = useState(false);
  const [myRegModalVisible, setMyRegModalVisible] = useState(false);
  const [teamRegModalVisible, setTeamRegModalVisible] = useState(false);
  const [myRegFilter, setMyRegFilter] = useState('Pending');

  // Team Approvals State
  const [pendingTeamRegularizations, setPendingTeamRegularizations] = useState<any[]>([]);
  const [loadingApprovals, setLoadingApprovals] = useState(false);
  const [hasNotifiedAdmin, setHasNotifiedAdmin] = useState(false);
  const [isProcessingCheckIn, setIsProcessingCheckIn] = useState(false);

  const addFileToProfile = (file: { uri: string, type: string, name: string }) => {
    const currentFiles = editProfileData.certificationsFiles || [];
    setEditProfileData({
      ...editProfileData,
      certificationsFiles: [...currentFiles, file]
    });
  };

  const handlePickCertificationImage = () => {
    Alert.alert(
      "Upload Certification",
      "Choose the type of file to upload",
      [
        {
          text: "Image (Gallery)",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              quality: 0.8,
            });
            if (!result.canceled) {
              addFileToProfile({ uri: result.assets[0].uri, type: 'image', name: result.assets[0].fileName || 'image.jpg' });
            }
          }
        },
        {
          text: "Document (PDF)",
          onPress: async () => {
            let result = await DocumentPicker.getDocumentAsync({
              type: ['application/pdf'],
              copyToCacheDirectory: true,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
              addFileToProfile({ uri: result.assets[0].uri, type: 'document', name: result.assets[0].name });
            }
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  // Time Formatting Helpers
  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
  };

  const calculateHours = (checkIn: string, checkOut: string) => {
    if (!checkIn) return '0:00';
    const start = new Date(checkIn).getTime();
    const end = checkOut ? new Date(checkOut).getTime() : new Date().getTime();
    const diffMins = Math.floor((end - start) / 60000);
    const h = Math.floor(diffMins / 60);
    const m = diffMins % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  // Feeds State
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loadingFeeds, setLoadingFeeds] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const fetchFeeds = async () => {
    try {
      setLoadingFeeds(true);
      const res = await activityApi.getActivities();
      // Adjust depending on whether backend returns array directly or { data: [...] }
      setFeeds(res.data || res || []);
    } catch (err) {
      console.warn("Failed to fetch feeds", err);
    } finally {
      setLoadingFeeds(false);
    }
  };

  // Wishes State
  const [todayWishes, setTodayWishes] = useState<any[]>([]);
  const [pendingWishes, setPendingWishes] = useState<any[]>([]);
  const [loadingPendingWishes, setLoadingPendingWishes] = useState(false);

  const [wishModalVisible, setWishModalVisible] = useState(false);
  const [selectedWishTarget, setSelectedWishTarget] = useState<any>(null);
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);

  const fetchTodayWishes = async () => {
    try {
      const res = await wishesApi.getCelebrations();
      console.log("Response from getCelebrations:", JSON.stringify(res));

      let data = [];
      if (Array.isArray(res)) data = res;
      else if (Array.isArray(res?.data)) data = res.data;
      else if (Array.isArray(res?.data?.data)) data = res.data.data;
      else if (res?.data && typeof res.data === 'object') {
        const possibleArray = Object.values(res.data).find(val => Array.isArray(val));
        if (possibleArray) data = possibleArray as any[];
      }

      // Filter to only include those whose actualDate is today
      const todayString = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const todayData = data.filter((c: any) => {
        if (!c.actualDate) return false;
        return c.actualDate.startsWith(todayString);
      });

      setTodayWishes(todayData);
    } catch (err) {
      console.warn("Failed to fetch celebrations", err);
    }
  };


  const handleReviewWish = async (wish: any, status: 'approved' | 'rejected') => {
    try {
      // Stub for API call since reviewWish isn't currently in wishesApi
      setPendingWishes(prev => prev.filter(w => w._id !== wish._id && w.id !== wish.id));
      Alert.alert('Success', `Wish ${status} successfully`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update wish status');
    }
  };

  const submitWish = async () => {
    if (!wishMessage.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }
    try {
      setIsSubmittingWish(true);
      await wishesApi.createWish({
        toUserId: selectedWishTarget?._id || selectedWishTarget?.id,
        message: wishMessage,
      });
      Alert.alert('Success', 'Your wish has been successfully sent!');
      setWishModalVisible(false);
      setWishMessage('');
    } catch (err) {
      Alert.alert('Error', 'Failed to send wish');
    } finally {
      setIsSubmittingWish(false);
    }
  };

  useEffect(() => {
    fetchTodayWishes();
  }, []);



  // Upcoming Leaves State
  const [upcomingLeaves, setUpcomingLeaves] = useState<any[]>([]);
  const [loadingUpcomingLeaves, setLoadingUpcomingLeaves] = useState(false);

  const fetchUpcomingLeaves = async () => {
    try {
      setLoadingUpcomingLeaves(true);

      const res = await holidayApi.getUpcomingHolidays().catch((e) => {
        console.warn('Upcoming holidays endpoint failed', e);
        return { data: [] };
      });

      let data = [];
      if (Array.isArray(res)) data = res;
      else if (res?.data && Array.isArray(res.data)) data = res.data;
      else if (res?.holidays && Array.isArray(res.holidays)) data = res.holidays;

      // If the backend has no holidays, let's use some nice mock data so the screen isn't empty!
      if (data.length === 0) {
        data = [
          {
            _id: 'h1',
            leaveType: 'Independence Day',
            startDate: new Date(new Date().getFullYear(), 7, 15).toISOString(),
            status: 'holiday'
          },
          {
            _id: 'h2',
            leaveType: 'Diwali',
            startDate: new Date(new Date().getFullYear(), 9, 31).toISOString(),
            status: 'holiday'
          },
          {
            _id: 'h3',
            leaveType: 'Christmas',
            startDate: new Date(new Date().getFullYear(), 11, 25).toISOString(),
            status: 'holiday'
          }
        ];
      } else {
        // Map common holiday fields to what the UI expects
        data = data.map((holiday: any) => ({
          ...holiday,
          leaveType: holiday.name || holiday.title || holiday.holidayName || holiday.leaveType || 'Holiday',
          startDate: holiday.date || holiday.startDate,
          status: 'holiday'
        }));
      }

      setUpcomingLeaves(data);
    } catch (err) {
      console.warn("Failed to fetch holidays", err);
      setUpcomingLeaves([]);
    } finally {
      setLoadingUpcomingLeaves(false);
    }
  };

  // Leave Balances State
  const [leaveBalances, setLeaveBalances] = useState<any[]>(LEAVE_DATA);
  const [loadingLeaveBalances, setLoadingLeaveBalances] = useState(false);

  const fetchLeaveBalances = async () => {
    try {
      setLoadingLeaveBalances(true);
      const res = await leaveApi.getMyLeaves();
      console.log('--- GET /api/leaves/my RESPONSE ---');
      console.log(JSON.stringify(res, null, 2));

      // We will parse 'res' later once we see what it looks like!
      // For now, we just keep using the LEAVE_DATA constants.
    } catch (err) {
      console.warn("Failed to fetch leave balances", err);
    } finally {
      setLoadingLeaveBalances(false);
    }
  };

  useEffect(() => {
    if (activeNav === 'Feeds') {
      fetchFeeds();
    } else if (activeNav === 'Activities') {
      fetchUpcomingLeaves();
    } else if (activeNav === 'Leave') {
      fetchLeaveBalances();
    }
  }, [activeNav]);

  const handleReact = async (id: string) => {
    try {
      await activityApi.reactToActivity(id, 'like');
      fetchFeeds();
    } catch (err) {
      Alert.alert("Error", "Could not like this post.");
    }
  };

  const handleComment = async (id: string) => {
    const text = commentInputs[id];
    if (!text || !text.trim()) return;
    try {
      await activityApi.addComment(id, text);
      setCommentInputs({ ...commentInputs, [id]: '' });
      fetchFeeds();
    } catch (err) {
      Alert.alert("Error", "Could not post comment.");
    }
  };

  // Fetch real user data when the Home screen opens
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authApi.getMe();
        if (userData && userData.data) {
          setUser(userData.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data on home screen", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      await authApi.updateProfile(editProfileData);
      Alert.alert("Success", "Profile updated successfully!");
      setIsEditingProfile(false);
      // Re-fetch user data
      const userData = await authApi.getMe();
      if (userData && userData.data) {
        setUser(userData.data);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Fetch attendance status
  const fetchAttendance = async () => {
    try {
      const res = await attendanceApi.getMyAttendance();
      const data = res.data || res;

      if (Array.isArray(data) && data.length > 0) {
        const todayRecord = data[0];

        // 🔧 ADD ALL THIS:
        console.log('\n╔════════════════════════════════════╗');
        console.log('║  DEBUG: Attendance Record Fetched    ║');
        console.log('╚════════════════════════════════════╝');
        console.log('Full Record:', JSON.stringify(todayRecord, null, 2));
        console.log('_id:', todayRecord._id);
        console.log('id:', todayRecord.id);
        console.log('_id empty?:', !todayRecord._id);
        console.log('Record keys:', Object.keys(todayRecord));

        // Determine which ID field to use
        const attendanceId = todayRecord._id || todayRecord.id;
        if (!attendanceId) {
          console.error('❌ NO ID FOUND IN RECORD!');
          console.log('Available fields:', Object.keys(todayRecord));
        } else {
          console.log('✅ Using Attendance ID:', attendanceId);
        }
        console.log('╚════════════════════════════════════╝\n');

        // SET IT
        setAttendanceHistory(data);
        setTodayRecordId(attendanceId || '');
        setTodayRecordDate(todayRecord.date || new Date().toISOString());
        setPendingRegularization(todayRecord.regularization || null);

        let previousSeconds = 0;
        if (todayRecord.totalHours) {
          if (typeof todayRecord.totalHours === 'number') {
            previousSeconds = Math.floor(todayRecord.totalHours * 3600);
          } else if (typeof todayRecord.totalHours === 'string') {
            if (todayRecord.totalHours.includes(':')) {
               const parts = todayRecord.totalHours.split(':');
               previousSeconds = (parseInt(parts[0]) || 0) * 3600 + (parseInt(parts[1]) || 0) * 60;
            } else {
               previousSeconds = Math.floor((parseFloat(todayRecord.totalHours) || 0) * 3600);
            }
          }
          if (isNaN(previousSeconds)) previousSeconds = 0;
        }

        if (todayRecord.sessions && todayRecord.sessions.length > 0) {
          setSessionLogs(todayRecord.sessions);
          // Find if ANY session in the array is currently active (missing a checkout time)
          const isSessionClosed = (s: any) => s.checkOut || s.checkout || s.checkOutTime || s.endTime;
          const activeSession = todayRecord.sessions.find((s: any) => !isSessionClosed(s));
          const targetSession = activeSession || todayRecord.sessions[todayRecord.sessions.length - 1];

          let hasCheckedOut = !activeSession;

          const checkInRaw = targetSession.checkIn || targetSession.checkin || targetSession.startTime || targetSession.checkInTime;
          let currentSessionSeconds = 0;
          if (checkInRaw) {
            const checkInDate = new Date(checkInRaw);
            if (!isNaN(checkInDate.getTime())) {
              currentSessionSeconds = Math.floor((new Date().getTime() - checkInDate.getTime()) / 1000);
            }
          }

          // BUGFIX: The Windows backend sometimes marks the day as 'Present' but fails to save the checkout 
          // timestamp inside the session object. If a session has no checkout time but is over 24 hours old, 
          // it is mathematically impossible for it to be an active shift. Force it to be checked out locally.
          if (!hasCheckedOut && currentSessionSeconds > 86400) {
            hasCheckedOut = true;
          }

          if (!hasCheckedOut) {
            // Currently checked in!
            setCheckedIn(true);
            if (currentSessionSeconds > 0) {
              setSeconds(previousSeconds + currentSessionSeconds);
            } else {
              setSeconds(previousSeconds);
            }
          } else {
            // Not currently checked in
            setCheckedIn(false);
            setSeconds(previousSeconds);
          }
        } else {
          setCheckedIn(false);
          setSeconds(previousSeconds);
        }
      }
    } catch (error) {
      console.warn("Failed to fetch attendance status", error);
    }
  };

  const fetchTeamRegularizations = async () => {
    if (!user || (user.role !== 'Admin' && user.role !== 'Master')) return;
    setLoadingApprovals(true);
    try {
      const res = await attendanceApi.getPendingRegularizations();
      const data = res.data || res;
      if (Array.isArray(data)) {
        setPendingTeamRegularizations(data);
        if (data.length > 0 && !hasNotifiedAdmin) {
          sendLocalNotification(
            "Pending Approvals",
            `You have ${data.length} regularization requests waiting for your approval.`
          );
          setHasNotifiedAdmin(true);
        }
      }
    } catch (error) {
      console.warn("Failed to fetch pending team regularizations", error);
    } finally {
      setLoadingApprovals(false);
    }
  };

  const handleApproveRegularization = async (id: string) => {
    try {
      await attendanceApi.approveRegularization(id);
      Alert.alert('Success', 'Regularization request approved.');
      setPendingTeamRegularizations(prev => prev.filter(r => (r._id || r.id) !== id));

      // Notify employee locally (simulating backend push)
      sendLocalNotification(
        "Request Approved",
        "Your regularization request has been approved by your manager."
      );
    } catch (error) {
      console.error('Failed to approve regularization', error);
      Alert.alert('Error', 'Failed to approve request.');
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    if (activeTab === 'Team' && activeTeamNav === 'Approvals') {
      fetchTeamRegularizations();
    }
  }, [activeTab, activeTeamNav, user]);

  const handleCheckInToggle = async () => {
    if (isProcessingCheckIn) return;
    setIsProcessingCheckIn(true);
    try {
      if (checkedIn) {
        // ── CHECKOUT: optionally send last known location ──
        try {
          // Try to get location for checkout too (backend now accepts it)
          let checkOutLocation: { lat: number; lng: number; address?: string } | undefined;
          try {
            const locPerms = await Location.getForegroundPermissionsAsync();
            if (locPerms.status === 'granted') {
              let loc = await Location.getLastKnownPositionAsync();
              if (!loc) {
                loc = await Promise.race([
                  Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
                  new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
                ]);
              }
              if (loc) {
                const geocode = await Location.reverseGeocodeAsync({
                  latitude: loc.coords.latitude,
                  longitude: loc.coords.longitude,
                });
                const g = geocode[0];
                const address = g
                  ? [g.name, g.street, g.district, g.city, g.region].filter(Boolean).join(', ')
                  : undefined;
                checkOutLocation = { lat: loc.coords.latitude, lng: loc.coords.longitude, address };
              }
            }
          } catch (_) { /* location optional on checkout */ }

          await attendanceApi.checkOut(checkOutLocation);
        } catch (e: any) {
          console.log('Standard check-out failed, trying alternatives...', e.message);
          try { await apiClient('/attendance/check-out', { method: 'PUT' }); } catch (e2) {
            try { await apiClient('/attendance/checkout', { method: 'POST' }); } catch (e3) {
              await apiClient('/attendance/checkout', { method: 'PUT' });
            }
          }
        }
        setCheckedIn(false);
        setTimeout(fetchAttendance, 1500);
      } else {
        // ── CHECK-IN: require location ──

        // 1. Check if location services are enabled
        const serviceEnabled = await Location.hasServicesEnabledAsync();
        if (!serviceEnabled) {
          Alert.alert(
            '📍 Location is Off',
            'Your device GPS/Location is turned OFF.\n\nPlease enable Location Services to check in.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: '⚙️ Enable Location',
                onPress: () => {
                  if (Platform.OS === 'android') {
                    Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS').catch(() =>
                      Linking.openSettings()
                    );
                  } else {
                    Linking.openURL('App-Prefs:Privacy&path=LOCATION').catch(() =>
                      Linking.openSettings()
                    );
                  }
                },
              },
            ]
          );
          return;
        }

        // 2. Request permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            '📍 Permission Denied',
            'Location permission is required to check in. Please allow location access in your device settings.',
            [{ text: 'OK' }]
          );
          return;
        }

        // 3. Get coordinates (with 10-second timeout to avoid freeze)
        let loc: any = null;
        try {
          loc = await Promise.race([
            Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
            new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Timeout getting location')), 10000))
          ]);
        } catch (locErr) {
          // If it times out, try last known
          try {
            loc = await Location.getLastKnownPositionAsync();
          } catch (e) {}
        }

        if (!loc) {
          Alert.alert("GPS Warning", "Could not get your exact location. Checking in without GPS coordinates.");
        }

        let address: string | undefined;
        if (loc) {
          try {
            const geocode = await Location.reverseGeocodeAsync({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            });
            const g = geocode[0];
            if (g) {
              address = [g.name, g.street, g.district, g.city, g.region, g.country]
                .filter(Boolean)
                .join(', ');
            }
          } catch (_) { /* address is optional — check-in will still work */ }
        }

        // 5. Check in with { lat, lng, address } format (or empty if GPS failed)
        const locationPayload = loc ? {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
          address,
        } : undefined;

        const res = await attendanceApi.checkIn(locationPayload);
        Alert.alert("Debug API Response", JSON.stringify(res));
        
        setCheckedIn(true);
        // Do not immediately fetch attendance to prevent UI bouncing if server is slow
        setTimeout(fetchAttendance, 2000);
      }
    } catch (err: any) {
      const errorMsg = err.message || '';
      console.log('Check-in/out error details:', errorMsg);

      if (errorMsg.toLowerCase().includes('active session')) {
        Alert.alert('Synced!', 'You were already checked in on the server! We updated your button to say Check-Out.');
        setCheckedIn(true);
        setTimeout(fetchAttendance, 2000);
      } else if (errorMsg.toLowerCase().includes('maximum')) {
        Alert.alert('Shift Limit Reached', 'You have reached the maximum number of check-ins allowed for today (5 sessions).');
        setCheckedIn(false);
      } else {
        Alert.alert('Check-In Failed', errorMsg || 'Could not update attendance status on the server.');
        setCheckedIn(false);
      }
    } finally {
      setIsProcessingCheckIn(false);
    }
  };

  const parseTimeToDate = (timeStr: string, baseDateStr: string) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM|am|pm)?/i);
    const d = baseDateStr ? new Date(baseDateStr) : new Date();
    if (!match) return d.toISOString(); // fallback

    let hours = parseInt(match[1]);
    const mins = parseInt(match[2]);
    const ampm = match[3] ? match[3].toLowerCase() : null;

    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;

    // Auto-fix: if they type "6:30" (no AM/PM) and it's less than 9, they probably mean PM for Check-Out.
    if (!ampm && hours > 0 && hours <= 9) {
      hours += 12;
    }

    d.setHours(hours, mins, 0, 0);
    return d.toISOString();
  };

  const handleRegularizeSubmit = async () => {
    let targetId = todayRecordId;
    let targetDate = todayRecordDate || new Date().toISOString().split('T')[0];

    try {
      if (!targetId) {
        // Automatically check in to create an attendance record if none exists
        const checkInRes = await attendanceApi.checkIn().catch(() => null);
        const newRecord = checkInRes?.data || checkInRes;
        targetId = newRecord?._id || newRecord?.id;

        if (!targetId) {
          Alert.alert("Error", "Could not create attendance record to regularize. Please try checking in first.");
          return;
        }
      }

      const parsedIn = parseTimeToDate(regularizeCheckIn, targetDate);
      const parsedOut = parseTimeToDate(regularizeCheckOut, targetDate);

      const payload = {
        checkIn: parsedIn,
        checkOut: parsedOut,
        requestedCheckIn: parsedIn,
        requestedCheckOut: parsedOut,
        reason: regularizeReason
      };

      await attendanceApi.regularize(targetId, payload);

      // Fetch attendance again to update local state immediately
      await fetchAttendance();

      Alert.alert(
        "Success",
        `Regularization request submitted and saved to database for the record!\nIt is now Pending Approval.`
      );

      setRegularizeModalVisible(false);
      setRegularizeCheckIn('');
      setRegularizeCheckOut('');
      setRegularizeReason('');
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not submit request.");
    }
  };

  useEffect(() => {
    let interval: any;
    if (checkedIn) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [checkedIn]);

  const formatTimer = (s: number) => {
    if (isNaN(s)) s = 0;
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return [h, m, sec];
  };

  const [h, m, sec] = formatTimer(seconds);

  // Debugging user role
  console.log("Current user role for tabs:", user?.role);

  // Show tabs only for Admin and Master roles
  const tabs = (user?.role === 'Admin' || user?.role === 'Master')
    ? ['My Space', 'Team', 'Organization']
    : [];
  const mySpaceNavItems = ['Activities', 'Dashboard', 'Feeds', 'Profile'];
  const teamNavItems = ['Team Space', 'Department', 'Approvals'];

  const currentNavItems = activeTab === 'My Space' ? mySpaceNavItems : teamNavItems;

  const bottomItems = [
    { label: 'Home', icon: HomeIcon },
    { label: 'Leave', icon: LeaveIcon },
    { label: 'Add', icon: AddIcon, special: true },
    { label: 'Message', icon: MessageIcon },

    { label: 'More', icon: MoreIcon },
  ];

  const handleAvatarPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    }
  };

  const isDashboard = activeNav === 'Dashboard';

  return (
    <SafeAreaView style={[styles.phone, isDashboard && { backgroundColor: COLORS.darkBg }]}>
      <StatusBar
        barStyle={isDashboard ? 'light-content' : 'dark-content'}
        backgroundColor={isDashboard ? COLORS.darkBg : COLORS.bg}
      />

      {/* New Top Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24, backgroundColor: '#FFF' }}>
        {/* Left: Burger + Greeting */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setSideDrawerVisible(true)} style={{ marginRight: 16 }}>
            <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1F2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <Line x1="3" y1="12" x2="21" y2="12" />
              <Line x1="3" y1="6" x2="21" y2="6" />
              <Line x1="3" y1="18" x2="21" y2="18" />
            </Svg>
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 2 }}>
              {new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening'},
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1A1F2E' }}>{user ? user.firstName : 'Loading...'}</Text>
          </View>
        </View>

        {/* Right: Search + Bell + Clock (Regularization) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>

          <TouchableOpacity
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
            onPress={() => { if (!checkedIn) { Alert.alert("Check-In Required", "Please check-in first.", [{ text: "Cancel", style: "cancel" }, { text: "Check-In", onPress: handleCheckInToggle }]); return; } }}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><Path d="M13.73 21a2 2 0 0 1-3.46 0" /></Svg>
            <View style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              if (!checkedIn) { Alert.alert("Check-In Required", "Please check-in first.", [{ text: "Cancel", style: "cancel" }, { text: "Check-In", onPress: handleCheckInToggle }]); return; }
              setRegularizeModalVisible(true);
            }}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Circle cx="12" cy="12" r="10" /><Polyline points="12 6 12 12 16 14" /></Svg>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#FEE2E2', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              Alert.alert("Logout", "Are you sure you want to sign out?", [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: onLogout }
              ]);
            }}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <Polyline points="16 17 21 12 16 7" />
              <Line x1="21" y1="12" x2="9" y2="12" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* Blue Hero Card */}
      <View style={{ marginHorizontal: 16, backgroundColor: '#39A3DD', borderRadius: 24, padding: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
        {/* Abstract background shapes */}
        <View style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.15)' }} />
        <View style={{ position: 'absolute', bottom: -30, left: 30, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        <Text style={{ flex: 1, fontSize: 23, fontWeight: '700', color: '#FFF', lineHeight: 32, marginRight: 16 }}>Stay productive{"\n"}and make today count!</Text>

        {/* ATPL Logo Illustration */}
        <View style={{ 
          width: 110, height: 110, borderRadius: 55, backgroundColor: '#FFF',
          justifyContent: 'center', alignItems: 'center',
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3
        }}>
          <Image 
            source={require('../../assets/archery_logo.png')} 
            style={{ width: 75, height: 75, resizeMode: 'contain' }} 
          />
        </View>
      </View>

      {/* Top Tier Tabs (My Space, Team, Organization) */}
      {tabs.length > 0 ? (
        <View style={{ flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 12, padding: 4, marginHorizontal: 16, marginTop: 10, marginBottom: 15 }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={{
                flex: 1,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                backgroundColor: activeTab === tab ? '#FFFFFF' : 'transparent',
                shadowColor: activeTab === tab ? '#000' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: activeTab === tab ? 0.05 : 0,
                shadowRadius: 4,
                elevation: activeTab === tab ? 2 : 0,
              }}
              onPress={() => {
                if (!checkedIn && tab !== 'My Space') {
                  Alert.alert("Check-In Required", "Please check-in first to access this feature.", [{ text: "Cancel", style: "cancel" }, { text: "Check-In", onPress: handleCheckInToggle }]);
                  return;
                }
                setActiveTab(tab);
                if (tab === 'My Space') setActiveNav('Activities');
                if (tab === 'Team') setActiveTeamNav('Team Space');
              }}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: activeTab === tab ? '700' : '500',
                color: activeTab === tab ? '#1A1F2E' : '#6B7280'
              }}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      {/* Secondary Navigation Grid */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 10 }}>
        {currentNavItems.map((n) => {
          const isActive = activeTab === 'My Space' ? activeNav === n : activeTeamNav === n;
          const setter = activeTab === 'My Space' ? setActiveNav : setActiveTeamNav;

          // Map icons based on text name
          let IconSvg = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><Circle cx="12" cy="12" r="10" /></Svg>;
          if (n === 'Activities') IconSvg = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><Rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><Line x1="8" y1="11" x2="16" y2="11" /><Line x1="8" y1="15" x2="16" y2="15" /></Svg>;
          if (n === 'Dashboard') IconSvg = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39A3DD" strokeWidth="2"><Rect x="3" y="3" width="7" height="7" rx="1" /><Rect x="14" y="3" width="7" height="7" rx="1" /><Rect x="14" y="14" width="7" height="7" rx="1" /><Rect x="3" y="14" width="7" height="7" rx="1" /></Svg>;
          if (n === 'Feeds') IconSvg = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><Line x1="9" y1="9" x2="15" y2="9" /><Line x1="9" y1="13" x2="13" y2="13" /></Svg>;
          if (n === 'Profile') IconSvg = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><Circle cx="12" cy="7" r="4" /></Svg>;

          const displayName = n;

          return (
            <TouchableOpacity
              key={n}
              style={{
                width: '23%',
                aspectRatio: 1,
                backgroundColor: '#FFF',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isActive ? 0.1 : 0.03,
                shadowRadius: 8,
                elevation: isActive ? 4 : 2,
                borderWidth: isActive ? 1 : 0,
                borderColor: '#39A3DD'
              }}
              onPress={() => {
                if (!checkedIn && n !== 'Activities') {
                  Alert.alert("Check-In Required", "Please check-in first to access this feature.", [{ text: "Cancel", style: "cancel" }, { text: "Check-In", onPress: handleCheckInToggle }]);
                  return;
                }
                setter(n);
              }}
            >
              <View style={{ marginBottom: 8 }}>{IconSvg}</View>
              <Text style={{ fontSize: 11, fontWeight: isActive ? '700' : '500', color: isActive ? '#39A3DD' : '#1A1F2E', textAlign: 'center' }} numberOfLines={1}>
                {displayName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Scrollable Content */}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={[styles.scrollContent, isDashboard && { backgroundColor: COLORS.darkBg }]}
        contentContainerStyle={[styles.scrollContainer, isDashboard && { paddingHorizontal: 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── ACTIVITIES TAB (BENTO BOX) ── */}
        {activeTab === 'My Space' && activeNav === 'Activities' && (
          <View>
            {/* ── MY REGULARIZATIONS (HORIZONTAL) REMOVED ── */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, paddingHorizontal: 16 }}>

              {/* Check-in Timer Card */}
              <View style={{ width: '48%', backgroundColor: '#FFF', borderRadius: 20, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#F3F4F6' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#39A3DD' }}>Check-in Timer</Text>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1E8FF' }} />
                </View>

                {/* Analog clock SVG */}
                <View style={{ alignItems: 'center', marginVertical: 12 }}>
                  <Svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <Circle cx="50" cy="50" r="45" fill="#FAFAFA" />
                    {/* Progress track */}
                    <Path d="M50 5 a45 45 0 1 1 -1 0" stroke="#F3F4F6" strokeWidth="6" strokeLinecap="round" />
                    {/* Progress indicator */}
                    <Path d="M50 5 a45 45 0 0 1 45 45" stroke="#39A3DD" strokeWidth="6" strokeLinecap="round" />
                    {/* Clock hands */}
                    <Line x1="50" y1="50" x2="50" y2="30" stroke="#39A3DD" strokeWidth="3" strokeLinecap="round" />
                    <Line x1="50" y1="50" x2="65" y2="65" stroke="#39A3DD" strokeWidth="3" strokeLinecap="round" />
                    <Circle cx="50" cy="50" r="4" fill="#39A3DD" />
                  </Svg>
                </View>

                <Text style={{ fontSize: 24, fontWeight: '800', color: '#39A3DD', textAlign: 'center', marginBottom: 16 }}>
                  {h}:{m}:{sec}
                </Text>

                <TouchableOpacity
                  style={{ backgroundColor: checkedIn ? '#EF4444' : '#39A3DD', borderRadius: 100, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                  activeOpacity={0.8}
                  onPress={handleCheckInToggle}
                  disabled={isProcessingCheckIn}
                >
                  {isProcessingCheckIn ? (
                    <ActivityIndicator size="small" color="#FFF" style={{ marginRight: 8 }} />
                  ) : null}
                  <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>
                    {isProcessingCheckIn ? 'Processing...' : checkedIn ? 'Check-Out' : 'Check-In'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Apply Leave Card */}
              <View style={{ width: '48%', backgroundColor: '#FFF', borderRadius: 20, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#F3F4F6' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1A1F2E', marginBottom: 12 }}>Apply Leave</Text>

                {/* Calendar SVG */}
                <View style={{ alignItems: 'center', marginVertical: 12, position: 'relative' }}>
                  <Svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#39A3DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="#F3F4F6" stroke="none" />
                    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <Line x1="16" y1="2" x2="16" y2="6" stroke="#1A1F2E" />
                    <Line x1="8" y1="2" x2="8" y2="6" stroke="#1A1F2E" />
                    <Line x1="3" y1="10" x2="21" y2="10" />
                  </Svg>
                  {/* Checkmark badge */}
                  <View style={{ position: 'absolute', bottom: -5, right: 10 }}>
                    <Svg width="22" height="22" viewBox="0 0 24 24" fill="#39A3DD" stroke="#FFF" strokeWidth="2">
                      <Circle cx="12" cy="12" r="10" />
                      <Polyline points="8 12 11 15 16 9" />
                    </Svg>
                  </View>
                </View>

                <Text style={{ fontSize: 11, color: '#6B7280', lineHeight: 16, marginBottom: 16, marginTop: 4 }}>Request time off hassle-free</Text>

                <TouchableOpacity
                  style={{ backgroundColor: '#39A3DD', borderRadius: 100, paddingVertical: 12, alignItems: 'center' }}
                  activeOpacity={0.8}
                  onPress={() => setActiveNav('Leave')}
                >
                  <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>Apply Now</Text>
                </TouchableOpacity>
              </View>

            </View>


            {/* ── UPCOMING HOLIDAYS ── */}
            <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#1A1F2E' }}>Upcoming Holidays</Text>
                <TouchableOpacity onPress={() => { if (!checkedIn) Alert.alert("Check-In Required", "Please check-in first.", [{ text: "Cancel", style: "cancel" }, { text: "Check-In", onPress: handleCheckInToggle }]); }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#39A3DD' }}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={{ paddingLeft: 8 }}>
                {loadingUpcomingLeaves ? (
                  <ActivityIndicator size="small" color="#39A3DD" style={{ marginVertical: 20 }} />
                ) : upcomingLeaves.length === 0 ? (
                  <>
                    {/* Mock holidays since list is empty to match screenshot */}
                    <View style={{ flexDirection: 'row', marginBottom: 20, position: 'relative' }}>
                      {/* Timeline line */}
                      <View style={{ position: 'absolute', left: 5, top: 20, bottom: -20, width: 2, backgroundColor: '#E5E7EB' }} />

                      {/* Timeline Dot */}
                      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#39A3DD', borderWidth: 3, borderColor: '#D1E8FF', marginRight: 16, marginTop: 16, zIndex: 1 }} />

                      {/* Card Content */}
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6' }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FEE2E2', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                          {/* Mosque SVG Mock */}
                          <Svg width="24" height="24" viewBox="0 0 24 24" fill="#EF4444">
                            <Path d="M12 2a3 3 0 0 0-3 3v1H6v4h2v8H6v2h12v-2h-2v-8h2V6h-3V5a3 3 0 0 0-3-3z" />
                          </Svg>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1F2E', marginBottom: 2 }}>Moharam</Text>
                          <Text style={{ fontSize: 13, color: '#6B7280' }}>25/6/2026</Text>
                        </View>
                        <View style={{ backgroundColor: '#F3E8FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
                          <Text style={{ fontSize: 12, fontWeight: '700', color: '#9333EA' }}>Holiday</Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 10, position: 'relative' }}>
                      {/* Timeline Dot */}
                      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#39A3DD', borderWidth: 3, borderColor: '#D1E8FF', marginRight: 16, marginTop: 16, zIndex: 1 }} />

                      {/* Card Content */}
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6' }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#D1FAE5', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                          {/* Flag SVG Mock */}
                          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </Svg>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1F2E', marginBottom: 2 }}>Independence Day</Text>
                          <Text style={{ fontSize: 13, color: '#6B7280' }}>14/8/2026</Text>
                        </View>
                        <View style={{ backgroundColor: '#F3E8FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
                          <Text style={{ fontSize: 12, fontWeight: '700', color: '#9333EA' }}>Holiday</Text>
                        </View>
                      </View>
                    </View>
                  </>
                ) : (
                  upcomingLeaves.map((leave, index) => (
                    <View key={leave._id || index} style={{ flexDirection: 'row', marginBottom: index === upcomingLeaves.length - 1 ? 10 : 20, position: 'relative' }}>
                      {/* Timeline line */}
                      {index !== upcomingLeaves.length - 1 && (
                        <View style={{ position: 'absolute', left: 5, top: 20, bottom: -20, width: 2, backgroundColor: '#E5E7EB' }} />
                      )}

                      {/* Timeline Dot */}
                      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#39A3DD', borderWidth: 3, borderColor: '#D1E8FF', marginRight: 16, marginTop: 16, zIndex: 1 }} />

                      {/* Card Content */}
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6' }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0F2FE', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                          {getHolidayIcon(leave.leaveType || 'Holiday', '#0284C7')}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1F2E', marginBottom: 2 }}>{leave.leaveType || 'Leave'}</Text>
                          <Text style={{ fontSize: 13, color: '#6B7280' }}>
                            {leave.startDate ? new Date(leave.startDate).toLocaleDateString() : ''}
                          </Text>
                        </View>
                        <View style={{ backgroundColor: '#D1E8FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
                          <Text style={{ fontSize: 12, fontWeight: '700', color: '#39A3DD', textTransform: 'capitalize' }}>
                            {leave.status || 'Holiday'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>

          </View>
        )}

        {/* ── DASHBOARD TAB ── */}
        {activeTab === 'My Space' && activeNav === 'Dashboard' && (
          <>
            {/* Birthday Card */}
            <View style={dashStyles.darkCard}>
              <Text style={dashStyles.darkCardTitle}>Birthday</Text>
              {todayWishes?.filter(w => w.type?.toLowerCase() === 'birthday').length > 0 ? (
                todayWishes.filter(w => w.type?.toLowerCase() === 'birthday').map((b, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <BirthdayIcon />
                    <View style={{ marginLeft: 12 }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#FFF' }}>{b.name}</Text>
                      <Text style={{ fontSize: 13, color: '#9CA3AF' }}>{b.designation || 'Colleague'}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={dashStyles.emptyWrap}>
                  <BirthdayIcon />
                  <Text style={dashStyles.darkCardEmpty}>No Birthdays today!</Text>
                </View>
              )}
            </View>

            {/* New Hires Card */}
            <View style={dashStyles.darkCard}>
              <Text style={dashStyles.darkCardTitle}>New Hires</Text>
              <View style={dashStyles.emptyWrap}>
                <NewHireIcon />
                <Text style={dashStyles.darkCardEmpty}>No New Joinees in past 15 days!</Text>
              </View>
            </View>

            {/* Favorites Card */}
            <View style={dashStyles.darkCard}>
              <Text style={dashStyles.darkCardTitle}>Favorites</Text>
              <View style={dashStyles.emptyWrap}>
                <StarIcon />
                <Text style={dashStyles.darkCardEmpty}>No favorites added yet!</Text>
              </View>
            </View>

            {/* Work Anniversary Card */}
            <View style={dashStyles.darkCard}>
              <Text style={dashStyles.darkCardTitle}>Work Anniversary</Text>
              {todayWishes?.filter(w => w.type?.toLowerCase() !== 'birthday').length > 0 ? (
                todayWishes.filter(w => w.type?.toLowerCase() !== 'birthday').map((a, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <AnniversaryIcon />
                    <View style={{ marginLeft: 12 }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#FFF' }}>{a.name}</Text>
                      <Text style={{ fontSize: 13, color: '#9CA3AF' }}>{a.designation || 'Colleague'}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={dashStyles.emptyWrap}>
                  <AnniversaryIcon />
                  <Text style={dashStyles.darkCardEmpty}>No anniversaries today!</Text>
                </View>
              )}
            </View>

            {/* Announcements Card */}
            <View style={dashStyles.darkCard}>
              <Text style={dashStyles.darkCardTitle}>Announcements</Text>
              <View style={dashStyles.emptyWrap}>
                <AnnouncementIcon />
                <Text style={dashStyles.darkCardEmpty}>No announcements right now!</Text>
              </View>
            </View>
          </>
        )}

        {/* ── FEEDS TAB ── */}
        {activeTab === 'My Space' && activeNav === 'Feeds' && (
          <View style={{ gap: 16 }}>
            {loadingFeeds ? (
              <Text style={{ textAlign: 'center', marginTop: 20, color: COLORS.textSub }}>Loading feeds...</Text>
            ) : feeds.length === 0 ? (
              <View style={styles.card}>
                <View style={{ alignItems: 'center', paddingVertical: 24 }}>
                  <Text style={[styles.scheduleTitle, { fontSize: 18 }]}>No Feeds Yet</Text>
                  <Text style={[styles.scheduleRange, { marginTop: 6 }]}>Check back later 📰</Text>
                </View>
              </View>
            ) : (
              feeds.map((feed, idx) => (
                <View key={feed._id || idx} style={styles.card}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <View style={[profStyles.avatarCircle, { width: 40, height: 40, marginRight: 12 }]}>
                      <Text style={{ fontSize: 18 }}>👤</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: '700', color: COLORS.text, fontSize: 16 }}>
                        {feed.authorName || 'Anonymous'}
                      </Text>
                      <Text style={{ fontSize: 12, color: COLORS.textSub }}>
                        {feed.createdAt ? new Date(feed.createdAt).toLocaleString() : 'Just now'}
                      </Text>
                    </View>
                  </View>

                  <Text style={{ fontSize: 15, color: COLORS.text, lineHeight: 22, marginBottom: 16 }}>
                    {feed.content || feed.message || 'New activity posted.'}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12, marginBottom: 12 }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center', marginRight: 24 }}
                      onPress={() => handleReact(feed._id)}
                    >
                      <Text style={{ fontSize: 18, marginRight: 6 }}>{feed.likes?.length > 0 ? '❤️' : '🤍'}</Text>
                      <Text style={{ color: COLORS.textSub, fontWeight: '600' }}>{feed.likes?.length || 0} Likes</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, marginRight: 6 }}>💬</Text>
                      <Text style={{ color: COLORS.textSub, fontWeight: '600' }}>{feed.comments?.length || 0} Comments</Text>
                    </View>
                  </View>

                  {feed.comments && feed.comments.length > 0 && (
                    <View style={{ backgroundColor: COLORS.bg, padding: 12, borderRadius: 8, marginBottom: 12 }}>
                      {feed.comments.slice(0, 3).map((c: any, cidx: number) => (
                        <Text key={cidx} style={{ fontSize: 13, color: COLORS.text, marginBottom: 4 }}>
                          <Text style={{ fontWeight: '700' }}>{c.authorName || 'User'}: </Text>
                          {c.text}
                        </Text>
                      ))}
                      {feed.comments.length > 3 && (
                        <Text style={{ fontSize: 12, color: COLORS.primaryBlue, marginTop: 4 }}>View all comments...</Text>
                      )}
                    </View>
                  )}

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={{ flex: 1, backgroundColor: COLORS.bg, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 }}
                      placeholder="Write a comment..."
                      value={commentInputs[feed._id] || ''}
                      onChangeText={(text) => setCommentInputs({ ...commentInputs, [feed._id]: text })}
                    />
                    <TouchableOpacity
                      style={{ marginLeft: 12, backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 }}
                      onPress={() => handleComment(feed._id)}
                    >
                      <Text style={{ color: COLORS.white, fontWeight: '600', fontSize: 14 }}>Post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === 'My Space' && activeNav === 'Profile' && (
          <View style={profStyles.profileContainer}>
            {/* PROFILE CARD */}
            <View style={profStyles.profileCard}>
              <View style={profStyles.profileAvatarArea}>
                <View style={profStyles.avatarWrap}>
                  <View style={profStyles.avatarCircle}>
                    <Text style={profStyles.avatarEmoji}>👤</Text>
                  </View>
                </View>
                <Text style={profStyles.profileGreeting}>Good Evening, {user ? user.firstName : '...'}</Text>
                <Text style={profStyles.profileName}>{user ? `${user.firstName} ${user.lastName}` : '...'}</Text>
                <View style={profStyles.profileRoleTag}>
                  <Text style={profStyles.profileRoleTagText}>{user ? (user.designation || 'EMPLOYEE').toUpperCase() : '...'}</Text>
                </View>

                <TouchableOpacity
                  style={{ marginTop: 16, backgroundColor: isEditingProfile ? '#10B981' : '#39A3DD', paddingVertical: 8, paddingHorizontal: 24, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    if (isEditingProfile) {
                      handleSaveProfile();
                    } else {
                      setEditProfileData(user || {});
                      setIsEditingProfile(true);
                    }
                  }}
                >
                  {savingProfile ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 14 }}>
                      {isEditingProfile ? '💾 Save Profile' : '✏️ Edit Profile'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={profStyles.businessDayBtn} activeOpacity={0.7}>
                <Text style={profStyles.businessDayBtnText}>BUSINESS DAY</Text>
              </TouchableOpacity>
              <View style={profStyles.reporteesSection}>
                <Text style={profStyles.reporteesLabel}>Reportees</Text>
                <View style={profStyles.reporteeRow}>
                  <View style={profStyles.reporteeAvatar}>
                    <Text style={profStyles.reporteeAvatarText}>T1</Text>
                  </View>
                  <View>
                    <Text style={profStyles.reporteeName}>Team Member 1</Text>
                    <Text style={profStyles.reporteeDesig}>Designation</Text>
                  </View>
                </View>
                <View style={profStyles.reporteeRow}>
                  <View style={[profStyles.reporteeAvatar, { backgroundColor: '#0ea5e9' }]}>
                    <Text style={profStyles.reporteeAvatarText}>T2</Text>
                  </View>
                  <View>
                    <Text style={profStyles.reporteeName}>Team Member 2</Text>
                    <Text style={profStyles.reporteeDesig}>Designation</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* DETAILS PANEL */}
            <View style={profStyles.detailsPanel}>

              {/* INFO CARDS */}
              <View style={profStyles.infoCardsContainer}>
                <View style={profStyles.infoCard}>
                  <View style={profStyles.infoCardIcon}><Text>📍</Text></View>
                  <View style={profStyles.infoCardContent}>
                    <Text style={profStyles.infoCardLabel}>Location</Text>
                    <Text style={profStyles.infoCardValue}>Tambaram</Text>
                  </View>
                </View>
                <View style={profStyles.infoCard}>
                  <View style={profStyles.infoCardIcon}><Text>🏢</Text></View>
                  <View style={profStyles.infoCardContent}>
                    <Text style={profStyles.infoCardLabel}>Department</Text>
                    <Text style={profStyles.infoCardValue}>Management</Text>
                  </View>
                </View>
                <View style={profStyles.infoCard}>
                  <View style={profStyles.infoCardIcon}><Text>🕘</Text></View>
                  <View style={profStyles.infoCardContent}>
                    <Text style={profStyles.infoCardLabel}>Shift</Text>
                    <Text style={profStyles.infoCardValue}>General (09:30 AM – 06:00 PM)</Text>
                  </View>
                </View>
                <View style={profStyles.infoCard}>
                  <View style={profStyles.infoCardIcon}><Text>🌐</Text></View>
                  <View style={profStyles.infoCardContent}>
                    <Text style={profStyles.infoCardLabel}>Time Zone</Text>
                    <Text style={profStyles.infoCardValue}>IST</Text>
                  </View>
                </View>
                <View style={profStyles.infoCard}>
                  <View style={profStyles.infoCardIcon}><Text>🪑</Text></View>
                  <View style={profStyles.infoCardContent}>
                    <Text style={profStyles.infoCardLabel}>Seating</Text>
                    <Text style={profStyles.infoCardValue}>Chennai</Text>
                  </View>
                </View>
                <View style={profStyles.infoCard}>
                  <View style={profStyles.infoCardIcon}><Text>✉️</Text></View>
                  <View style={profStyles.infoCardContent}>
                    <Text style={profStyles.infoCardLabel}>Email</Text>
                    <Text style={profStyles.infoCardValue} numberOfLines={1}>{user ? user.email : '...'}</Text>
                  </View>
                </View>
              </View>

              {/* ABOUT ME */}
              <View style={profStyles.sectionCard}>
                <View style={profStyles.sectionTitleWrap}>
                  <Text style={profStyles.sectionTitleText}>About Me</Text>
                </View>
                <View style={profStyles.sectionBody}>
                  <TextInput
                    style={profStyles.aboutInput}
                    placeholder="Write a short introduction about yourself"
                    placeholderTextColor={COLORS.textMuted}
                    multiline
                    value={isEditingProfile ? (editProfileData.aboutMe || '') : (user?.aboutMe || '')}
                    onChangeText={(val) => setEditProfileData({ ...editProfileData, aboutMe: val })}
                    editable={isEditingProfile}
                  />
                </View>
              </View>

              {/* BASIC INFORMATION */}
              <View style={profStyles.sectionCard}>
                <View style={profStyles.sectionTitleWrap}>
                  <Text style={profStyles.sectionTitleText}>Basic Information</Text>
                </View>
                <View style={profStyles.sectionBody}>
                  <View style={profStyles.fieldsGrid}>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Employee ID</Text>
                      <Text style={profStyles.fieldValueEmpty}>-</Text>
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Nick Name</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.nickName || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, nickName: val })} />
                      ) : (
                        <Text style={user?.nickName ? profStyles.fieldValue : profStyles.fieldValueEmpty}>{user?.nickName || '-'}</Text>
                      )}
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>First Name</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.firstName || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, firstName: val })} />
                      ) : (
                        <Text style={profStyles.fieldValue}>{user ? user.firstName : '...'}</Text>
                      )}
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Email Address</Text>
                      <Text style={profStyles.fieldValue} numberOfLines={1}>{user ? user.email : '...'}</Text>
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Last Name</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.lastName || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, lastName: val })} />
                      ) : (
                        <Text style={profStyles.fieldValue}>{user ? user.lastName : '...'}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>

              {/* WORK INFORMATION */}
              <View style={profStyles.sectionCard}>
                <View style={profStyles.sectionTitleWrap}>
                  <Text style={profStyles.sectionTitleText}>Work Information</Text>
                </View>
                <View style={profStyles.sectionBody}>
                  <View style={profStyles.fieldsGrid}>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Department</Text>
                      <Text style={profStyles.fieldValueEmpty}>-</Text>
                    </View>

                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Location</Text>
                      <Text style={profStyles.fieldValueEmpty}>-</Text>
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Designation</Text>
                      <Text style={profStyles.fieldValue}>Master</Text>
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Employee Status</Text>
                      <View style={[profStyles.badgeContainer, profStyles.badgeActive]}>
                        <View style={profStyles.badgeActiveDot} />
                        <Text style={profStyles.badgeActiveText}>Active</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* PERSONAL DETAILS */}
              <View style={profStyles.sectionCard}>
                <View style={profStyles.sectionTitleWrap}>
                  <Text style={profStyles.sectionTitleText}>Personal Details</Text>
                </View>
                <View style={profStyles.sectionBody}>
                  <View style={profStyles.fieldsGrid}>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Date of Birth</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.dob || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, dob: val })} placeholder="YYYY-MM-DD" />
                      ) : (
                        <Text style={user?.dob ? profStyles.fieldValue : profStyles.fieldValueEmpty}>{user?.dob || '-'}</Text>
                      )}
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Age</Text>
                      <Text style={profStyles.fieldValueEmpty}>-</Text>
                    </View>
                    <View style={profStyles.fieldWrapFull}>
                      <Text style={profStyles.fieldLabel}>Expertise (Ask Me About)</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.expertise || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, expertise: val })} />
                      ) : (
                        <Text style={user?.expertise ? profStyles.fieldValue : profStyles.fieldValueEmpty}>{user?.expertise || '-'}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>

              {/* IDENTITY INFORMATION */}
              <View style={profStyles.sectionCard}>
                <View style={profStyles.sectionTitleWrap}>
                  <Text style={profStyles.sectionTitleText}>Identity Information</Text>
                </View>
                <View style={profStyles.sectionBody}>
                  <View style={profStyles.fieldsGrid}>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>UAN</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.uan || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, uan: val })} />
                      ) : (
                        <Text style={user?.uan ? profStyles.fieldValue : profStyles.fieldValueEmpty}>{user?.uan || '-'}</Text>
                      )}
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>PAN</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.pan || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, pan: val })} />
                      ) : (
                        <Text style={user?.pan ? profStyles.fieldValue : profStyles.fieldValueEmpty}>{user?.pan || '-'}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>

              {/* CONTACT DETAILS */}
              <View style={profStyles.sectionCard}>
                <View style={profStyles.sectionTitleWrap}>
                  <Text style={profStyles.sectionTitleText}>Contact Details</Text>
                </View>
                <View style={profStyles.sectionBody}>
                  <View style={profStyles.fieldsGrid}>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Work Phone</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.workPhoneNumber || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, workPhoneNumber: val })} keyboardType="phone-pad" />
                      ) : (
                        <Text style={user?.workPhoneNumber ? profStyles.fieldValue : profStyles.fieldValueEmpty}>{user?.workPhoneNumber || '-'}</Text>
                      )}
                    </View>
                    <View style={profStyles.fieldWrap}>
                      <Text style={profStyles.fieldLabel}>Seating Location</Text>
                      <Text style={profStyles.fieldValue}>Chennai</Text>
                    </View>
                    <View style={profStyles.fieldWrapFull}>
                      <Text style={profStyles.fieldLabel}>Present Address</Text>
                      {isEditingProfile ? (
                        <TextInput style={[profStyles.fieldValue, { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 0 }]} value={editProfileData.address || ''} onChangeText={(val) => setEditProfileData({ ...editProfileData, address: val })} />
                      ) : (
                        <Text style={user?.address ? profStyles.fieldValue : profStyles.fieldValueEmpty}>{user?.address || '-'}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>

              {/* CERTIFICATIONS */}
              <View style={profStyles.sectionCard}>
                <View style={[profStyles.sectionTitleWrap, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                  <Text style={profStyles.sectionTitleText}>Certifications</Text>
                  {isEditingProfile && (
                    <TouchableOpacity onPress={handlePickCertificationImage} style={{ padding: 6, backgroundColor: '#39A3DD', borderRadius: 20 }}>
                      <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round">
                        <Line x1="12" y1="5" x2="12" y2="19" />
                        <Line x1="5" y1="12" x2="19" y2="12" />
                      </Svg>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={profStyles.sectionBody}>
                  {isEditingProfile ? (
                    <TextInput
                      style={profStyles.aboutInput}
                      placeholder="List your certifications (e.g., AWS Certified, PMP)"
                      placeholderTextColor={COLORS.textMuted}
                      multiline
                      value={editProfileData.certifications || ''}
                      onChangeText={(val) => setEditProfileData({ ...editProfileData, certifications: val })}
                    />
                  ) : (
                    <Text style={user?.certifications ? profStyles.fieldValue : profStyles.fieldValueEmpty}>
                      {user?.certifications || 'No certifications added yet.'}
                    </Text>
                  )}
                  {/* Display uploaded files */}
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                    {(isEditingProfile ? (editProfileData.certificationsFiles || []) : (user?.certificationsFiles || [])).map((file: any, idx: number) => (
                      <View key={idx} style={{ marginRight: 12, position: 'relative', marginTop: 8 }}>
                        {file.type === 'image' ? (
                          <Image source={{ uri: file.uri }} style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: '#E5E7EB' }} />
                        ) : (
                          <View style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FECACA' }}>
                            <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <Polyline points="14 2 14 8 20 8" />
                              <Line x1="16" y1="13" x2="8" y2="13" />
                              <Line x1="16" y1="17" x2="8" y2="17" />
                              <Polyline points="10 9 9 9 8 9" />
                            </Svg>
                            <Text style={{ fontSize: 10, color: '#EF4444', marginTop: 8, fontWeight: '700', maxWidth: 70 }} numberOfLines={1}>{file.name || 'PDF'}</Text>
                          </View>
                        )}
                        {isEditingProfile && (
                          <TouchableOpacity
                            style={{ position: 'absolute', top: -8, right: -8, backgroundColor: '#EF4444', borderRadius: 12, padding: 4, elevation: 4, zIndex: 10 }}
                            onPress={() => {
                              const newFiles = [...editProfileData.certificationsFiles];
                              newFiles.splice(idx, 1);
                              setEditProfileData({ ...editProfileData, certificationsFiles: newFiles });
                            }}
                          >
                            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round">
                              <Line x1="18" y1="6" x2="6" y2="18" />
                              <Line x1="6" y1="6" x2="18" y2="18" />
                            </Svg>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>

            </View>
          </View>
        )}

        {/* ── LEAVE TAB ── */}
        {activeTab === 'My Space' && activeNav === 'Leave' && (
          <View style={leaveStyles.container}>
            {leaveBalances.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={leaveStyles.card}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedLeave(item);
                  setLeaveModalVisible(true);
                }}
              >
                <View style={[leaveStyles.iconWrap, { backgroundColor: item.bgColor }]}>
                  {item.icon(item.color)}
                </View>
                <View style={leaveStyles.content}>
                  <Text style={leaveStyles.title}>{item.title}</Text>
                  {item.balance !== null && (
                    <Text style={leaveStyles.statLine}>
                      Balance : <Text style={leaveStyles.statGreen}>{item.balance}</Text>
                    </Text>
                  )}
                  <Text style={leaveStyles.statLine}>
                    Booked : <Text style={leaveStyles.statRed}>{item.booked}</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── TEAM VIEWS ── */}
        {activeTab === 'Team' && activeTeamNav === 'Team Space' && (
          <TeamSpaceView
            todayWishes={todayWishes}
            onWishPress={(w) => {
              setSelectedWishTarget(w);
              setWishMessage('');
              setWishModalVisible(true);
            }}
          />
        )}



        {activeTab === 'Team' && activeTeamNav === 'Department' && (
          <DepartmentView onSelectEmployee={(emp) => {
            setSelectedEmployee(emp);
            setEmployeeModalVisible(true);
          }} />
        )}

      </ScrollView>

      {/* Employee Profile Modal */}
      <EmployeeProfileModal
        visible={employeeModalVisible}
        employee={selectedEmployee}
        onClose={() => setEmployeeModalVisible(false)}
      />

      {/* Rebuilt Bottom Navigation */}
      <Animated.View style={{ transform: [{ translateY: tabBarTranslateY }], position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', paddingBottom: Math.max(insets.bottom + 10, 30), paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 10 }}>

        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => setBottomTab('Home')}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={bottomTab === 'Home' ? '#39A3DD' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="3" y="3" width="7" height="7" rx="1.5" />
            <Rect x="14" y="3" width="7" height="7" rx="1.5" />
            <Rect x="14" y="14" width="7" height="7" rx="1.5" />
            <Rect x="3" y="14" width="7" height="7" rx="1.5" />
          </Svg>
          <Text style={{ fontSize: 10, marginTop: 4, fontWeight: '600', color: bottomTab === 'Home' ? '#39A3DD' : '#9CA3AF' }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => {
          if (!checkedIn) { Alert.alert("Access Denied", "Please check-in first."); return; }
          setBottomTab('Directory');
        }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={bottomTab === 'Directory' ? '#39A3DD' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <Circle cx="9" cy="7" r="4" />
            <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </Svg>
          <Text style={{ fontSize: 10, marginTop: 4, fontWeight: '600', color: bottomTab === 'Directory' ? '#39A3DD' : '#9CA3AF' }}>Directory</Text>
        </TouchableOpacity>

        {/* Floating Center Button - Daily Call Report */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ position: 'absolute', top: -35, width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', padding: 6, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 8 }}>
            <TouchableOpacity 
              onPress={() => {
                if (!checkedIn) { Alert.alert("Access Denied", "Please check-in first."); return; }
                if (onDailyCallReportPress) onDailyCallReportPress();
              }}
              style={{ width: '100%', height: '100%', borderRadius: 24, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 }}>
              {/* Phone + notepad icon representing Daily Call Report */}
              <Svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91A16 16 0 0 0 15.09 16.09l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.92z" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => {
          if (!checkedIn) { Alert.alert("Access Denied", "Please check-in first."); return; }
          setBottomTab('Payslip');
        }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={bottomTab === 'Payslip' ? '#39A3DD' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <Polyline points="14 2 14 8 20 8" />
            <Line x1="16" y1="13" x2="8" y2="13" />
            <Line x1="16" y1="17" x2="8" y2="17" />
            <Polyline points="10 9 9 9 8 9" />
          </Svg>
          <Text style={{ fontSize: 10, marginTop: 4, fontWeight: '600', color: bottomTab === 'Payslip' ? '#39A3DD' : '#9CA3AF' }}>Payslip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => {
          if (!checkedIn) { Alert.alert("Access Denied", "Please check-in first."); return; }
          setBottomTab('Menu');
          if (onSettingsPress) onSettingsPress();
        }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={bottomTab === 'Menu' ? '#39A3DD' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="8" y1="6" x2="21" y2="6" />
            <Line x1="8" y1="12" x2="21" y2="12" />
            <Line x1="8" y1="18" x2="21" y2="18" />
            <Circle cx="4" cy="6" r="1.5" fill={bottomTab === 'Menu' ? '#39A3DD' : '#9CA3AF'} stroke="none" />
            <Circle cx="4" cy="12" r="1.5" fill={bottomTab === 'Menu' ? '#39A3DD' : '#9CA3AF'} stroke="none" />
            <Circle cx="4" cy="18" r="1.5" fill={bottomTab === 'Menu' ? '#39A3DD' : '#9CA3AF'} stroke="none" />
          </Svg>
          <Text style={{ fontSize: 10, marginTop: 4, fontWeight: '600', color: bottomTab === 'Menu' ? '#39A3DD' : '#9CA3AF' }}>Menu</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── SIDE DRAWER MENU ── */}
      <Modal visible={isSideDrawerVisible} transparent animationType="fade">
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* Transparent Dark Overlay */}
          <TouchableOpacity
            style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={() => setSideDrawerVisible(false)}
          />

          {/* White Drawer Panel */}
          <View style={{ width: '75%', height: '100%', backgroundColor: '#FFF', padding: 24, paddingTop: insets.top + 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
              <View style={[profStyles.avatarCircle, { width: 50, height: 50, marginRight: 16 }]}>
                <Text style={{ fontSize: 24 }}>👤</Text>
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '800', color: '#1A1F2E' }}>{user ? user.firstName : 'User'}</Text>
                <Text style={{ fontSize: 13, color: '#6B7280' }}>{user ? user.designation : 'Employee'}</Text>
              </View>
            </View>

            {/* ── MY REGULARIZATIONS MENU ITEM ── */}
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }} onPress={() => { setSideDrawerVisible(false); setMyRegModalVisible(true); }}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Circle cx="12" cy="12" r="10" /><Polyline points="12 6 12 12 16 14" />
              </Svg>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginLeft: 16 }}>My Regularizations</Text>
            </TouchableOpacity>

            {/* ── TEAM APPROVALS MENU ITEM (ONLY ADMIN/MASTER) ── */}
            {(user?.role === 'Admin' || user?.role === 'Master') && (
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }} onPress={() => { setSideDrawerVisible(false); setTeamRegModalVisible(true); fetchTeamRegularizations(); }}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><Circle cx="9" cy="7" r="4" /><Polyline points="23 11 17 17 14 14" />
                </Svg>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginLeft: 16 }}>Team Approvals</Text>
              </TouchableOpacity>
            )}

            <View style={{ height: 1, backgroundColor: '#E5E7EB', marginBottom: 24 }} />

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }} onPress={() => { setSideDrawerVisible(false); }}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><Circle cx="12" cy="7" r="4" />
              </Svg>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginLeft: 16 }}>My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }} onPress={() => { setSideDrawerVisible(false); if (onSettingsPress) onSettingsPress(); }}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Circle cx="12" cy="12" r="3" /><Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </Svg>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginLeft: 16 }}>Settings</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }} />

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }} onPress={() => { setSideDrawerVisible(false); if (onLogout) onLogout(); }}>
              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><Polyline points="16 17 21 12 16 7" /><Line x1="21" y1="12" x2="9" y2="12" />
              </Svg>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#EF4444', marginLeft: 16 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── MY REGULARIZATIONS HISTORY MODAL ── */}
      <Modal visible={myRegModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#F5F7F9', marginTop: insets.top }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 2 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#1A1F2E' }}>My Regularizations</Text>
            <TouchableOpacity onPress={() => setMyRegModalVisible(false)} style={{ padding: 4 }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <Line x1="18" y1="6" x2="6" y2="18" /><Line x1="6" y1="6" x2="18" y2="18" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Toggle Tabs */}
          <View style={{ flexDirection: 'row', padding: 16, gap: 12, backgroundColor: '#FFF' }}>
            <TouchableOpacity
              style={{ flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 100, backgroundColor: myRegFilter === 'Pending' ? '#39A3DD' : '#F3F4F6' }}
              onPress={() => setMyRegFilter('Pending')}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: myRegFilter === 'Pending' ? '#FFF' : '#6B7280' }}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 100, backgroundColor: myRegFilter === 'Approved' ? '#10B981' : '#F3F4F6' }}
              onPress={() => setMyRegFilter('Approved')}
            >
              <Text style={{ fontSize: 14, fontWeight: '700', color: myRegFilter === 'Approved' ? '#FFF' : '#6B7280' }}>Completed</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable List */}
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {attendanceHistory
              .filter(r => r.regularization && r.regularization.status && r.regularization.status !== 'none')
              .filter(r => myRegFilter === 'Pending' ? r.regularization.status === 'pending' : (r.regularization.status === 'approved' || r.regularization.status === 'rejected'))
              .map((record, index) => {
                const reg = record.regularization;
                const isApproved = reg.status === 'approved';
                const isRejected = reg.status === 'rejected';

                let badgeColor = '#F59E0B'; let badgeBg = '#FEF3C7'; let statusText = 'Pending';
                if (isApproved) { badgeColor = '#10B981'; badgeBg = '#D1FAE5'; statusText = 'Approved'; }
                else if (isRejected) { badgeColor = '#EF4444'; badgeBg = '#FEE2E2'; statusText = 'Rejected'; }

                return (
                  <View key={record._id || index} style={{ backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <View>
                        <Text style={{ fontSize: 15, fontWeight: '800', color: '#1A1F2E' }}>Date: {record.date}</Text>
                        <Text style={{ fontSize: 13, color: '#4B5563', marginTop: 4 }}>Requested In: <Text style={{ fontWeight: '600' }}>{formatTime(reg.requestedCheckIn)}</Text></Text>
                        <Text style={{ fontSize: 13, color: '#4B5563', marginTop: 2 }}>Requested Out: <Text style={{ fontWeight: '600' }}>{formatTime(reg.requestedCheckOut)}</Text></Text>
                      </View>
                      <View style={{ backgroundColor: badgeBg, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
                        <Text style={{ fontSize: 12, fontWeight: '800', color: badgeColor }}>{statusText}</Text>
                      </View>
                    </View>
                    <View style={{ backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#F3F4F6' }}>
                      <Text style={{ fontSize: 13, color: '#6B7280', fontStyle: 'italic' }}>"{reg.reason}"</Text>
                    </View>
                  </View>
                );
              })}

            {attendanceHistory.filter(r => r.regularization && r.regularization.status && r.regularization.status !== 'none')
              .filter(r => myRegFilter === 'Pending' ? r.regularization.status === 'pending' : (r.regularization.status === 'approved' || r.regularization.status === 'rejected')).length === 0 && (
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <Svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}>
                    <Circle cx="12" cy="12" r="10" /><Line x1="12" y1="8" x2="12" y2="12" /><Line x1="12" y1="16" x2="12.01" y2="16" />
                  </Svg>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#9CA3AF' }}>No {myRegFilter.toLowerCase()} requests</Text>
                </View>
              )}
          </ScrollView>
        </View>
      </Modal>

      {/* ── TEAM APPROVALS MODAL ── */}
      <Modal visible={teamRegModalVisible} animationType="slide" onRequestClose={() => setTeamRegModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
            <TouchableOpacity onPress={() => setTeamRegModalVisible(false)} style={{ padding: 8, marginRight: 8 }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Line x1="19" y1="12" x2="5" y2="12" /><Polyline points="12 19 5 12 12 5" />
              </Svg>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1A1F2E' }}>Team Approvals</Text>
          </View>

          {/* Scrollable List */}
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <ApprovalsView
              pendingRegularizations={pendingTeamRegularizations}
              loading={loadingApprovals}
              onApprove={(id: string) => handleApproveRegularization(id)}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Regularization Modal */}
      <Modal visible={regularizeModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '90%', backgroundColor: COLORS.white, borderRadius: 16, padding: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 8 }}>Attendance Regularization</Text>
            <Text style={{ fontSize: 13, color: COLORS.textSub, marginBottom: 24 }}>Correct your missing clock-in/out times for the selected day.</Text>

            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, color: COLORS.textSub, marginBottom: 4 }}>Check In</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, fontSize: 14 }}
                  placeholder="11:43 AM"
                  value={regularizeCheckIn}
                  onChangeText={setRegularizeCheckIn}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, color: COLORS.textSub, marginBottom: 4 }}>Check Out</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, fontSize: 14 }}
                  placeholder="03:21 PM"
                  value={regularizeCheckOut}
                  onChangeText={setRegularizeCheckOut}
                />
              </View>
            </View>

            <View style={{ marginBottom: 24 }}>
              <TextInput
                style={{ borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, fontSize: 14, height: 80, textAlignVertical: 'top' }}
                placeholder="Reason for Regularization"
                multiline
                value={regularizeReason}
                onChangeText={setRegularizeReason}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity onPress={() => setRegularizeModalVisible(false)} style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
                <Text style={{ color: COLORS.red, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRegularizeSubmit} style={{ backgroundColor: COLORS.red, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 }}>
                <Text style={{ color: COLORS.white, fontWeight: '600' }}>Request Approval</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Leave Details Modal */}
      <Modal
        visible={leaveModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLeaveModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setLeaveModalVisible(false)}>
          <View style={leaveStyles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={leaveStyles.modalContent}>
                {selectedLeave && (
                  <>
                    <View style={leaveStyles.modalHeader}>
                      <Text style={leaveStyles.modalTitle}>{selectedLeave.title}</Text>
                    </View>

                    <View style={leaveStyles.modalBody}>
                      {selectedLeave.balance !== null && (
                        <View style={leaveStyles.modalRow}>
                          <Text style={leaveStyles.modalLabel}>Balance</Text>
                          <Text style={leaveStyles.modalValue}>{selectedLeave.balance}</Text>
                        </View>
                      )}

                      <View style={leaveStyles.modalRow}>
                        <Text style={leaveStyles.modalLabel}>Booked</Text>
                        <Text style={leaveStyles.modalValue}>{selectedLeave.booked}</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={leaveStyles.applyButton}
                      activeOpacity={0.8}
                      onPress={() => {
                        setLeaveModalVisible(false);
                        if (onApplyLeave) {
                          onApplyLeave(selectedLeave);
                        }
                      }}
                    >
                      <Text style={leaveStyles.applyButtonText}>Apply Leave</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal visible={wishModalVisible} transparent={true} animationType="fade" onRequestClose={() => setWishModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#1A1F2E' }}>
                Wish {selectedWishTarget?.name}
              </Text>
              <TouchableOpacity onPress={() => setWishModalVisible(false)}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="18" y1="6" x2="6" y2="18" /><Line x1="6" y1="6" x2="18" y2="18" /></Svg>
              </TouchableOpacity>
            </View>
            <TextInput
              style={{ backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, fontSize: 15, color: '#1A1F2E', minHeight: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 20 }}
              placeholder="Type your lovely message here..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={wishMessage}
              onChangeText={setWishMessage}
            />
            <TouchableOpacity
              style={{ backgroundColor: '#39A3DD', borderRadius: 12, paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
              onPress={submitWish}
              disabled={isSubmittingWish}
            >
              {isSubmittingWish ? (
                <ActivityIndicator color="#FFF" style={{ marginRight: 8 }} />
              ) : null}
              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
                {isSubmittingWish ? 'Sending...' : 'Send Wish'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

// ── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon({ color = COLORS.text }: { color?: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PeopleIcon({ color = COLORS.text }: { color?: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" />
      <Path d="M2 21c0-4 3.1-7 7-7s7 3 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M22 21c0-3-1.8-5.5-4-6.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function BellIcon({ color = COLORS.text }: { color?: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 6 12 12 16 14" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function AvatarIcon() {
  return (
    <Svg width="44" height="44" viewBox="0 0 44 44">
      <Circle cx="22" cy="22" r="22" fill="#E0E7FF" />
      <Circle cx="22" cy="17" r="7" fill="#6366F1" />
      <Ellipse cx="22" cy="36" rx="12" ry="8" fill="#6366F1" />
    </Svg>
  );
}

function BirthdayIcon() {
  return (
    <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <Path d="M20 10c0-4.4-3.6-8-8-8S4 5.6 4 10v10h16V10z" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="4" y1="15" x2="20" y2="15" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M8 10v1M12 8v3M16 10v1" stroke="#F76707" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

function NewHireIcon() {
  return (
    <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <Circle cx="10" cy="8" r="4" stroke="#8A8A8E" strokeWidth="1.5" />
      <Path d="M3 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="18" y1="10" x2="22" y2="10" stroke="#3B5BDB" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="20" y1="8" x2="20" y2="12" stroke="#3B5BDB" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

function StarIcon() {
  return (
    <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke="#8A8A8E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function AnniversaryIcon() {
  return (
    <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="4" width="18" height="18" rx="2" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="16" y1="2" x2="16" y2="6" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M12 14l1 2h2l-1.5 1.5.5 2L12 18.5 10 19.5l.5-2L9 16h2l1-2z" fill="#F76707" />
    </Svg>
  );
}

function AnnouncementIcon() {
  return (
    <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <Path d="M22 4L12 14.01l-3-3" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22 4L9 17l-4-4 1.5-1.5" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 17l-2 5 5-2" stroke="#8A8A8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
      <Path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
      <Rect x="9" y="14" width="6" height="7" rx="1" fill="white" />
    </Svg>
  );
}

function LeaveIcon({ color }: { color: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="17" y1="14" x2="21" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="19" y1="12" x2="19" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function AddIcon({ color }: { color: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}



function MoreIcon({ color }: { color: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="4" y1="18" x2="20" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  phone: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: COLORS.bg,
  },
  headerDark: {
    backgroundColor: COLORS.darkBg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#C7D2FE',
    marginRight: 12,
  },
  heroHeader: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 20,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapHero: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.white,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  heroIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtnHero: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  heroGreetingWrap: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  nameText: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
  },
  heroNavTabs: {
    flexDirection: 'row',
    gap: 12,
  },
  heroNavTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  heroNavTabActive: {
    backgroundColor: COLORS.white,
  },
  heroNavTabText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  heroNavTabTextActive: {
    color: COLORS.primary,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContainer: {
    paddingBottom: 24,
    gap: 14,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 14,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  scheduleRange: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  bentoGrid: {
    gap: 16,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  bentoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  bentoTimerCard: {
    flex: 2,
    backgroundColor: COLORS.primaryBlue,
    justifyContent: 'space-between',
    minHeight: 160,
  },
  bentoActionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  bentoWideCard: {
    width: '100%',
    minHeight: 120,
  },
  bentoTitleWhite: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  bentoTimerText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 16,
  },
  bentoCheckInBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  bentoCheckInBtnText: {
    color: COLORS.primaryBlue,
    fontWeight: '800',
    fontSize: 16,
  },
  bentoActionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bentoActionText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  bentoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bentoTitle: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 18,
  },
  bentoScheduleWrap: {
    backgroundColor: COLORS.bg,
    padding: 16,
    borderRadius: 16,
  },
  bentoScheduleTime: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  bentoScheduleStatus: {
    color: COLORS.textSub,
    fontSize: 13,
  },
  floatingNavContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  floatingNavBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
    gap: 12,
  },
  floatingNavItem: {
    padding: 4,
  },
  floatingNavSpecial: {
    marginTop: -30,
  },
  floatingIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingIconWrapActive: {
    backgroundColor: COLORS.blueLight,
  },
  floatingSpecialWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
});

// ── Dashboard Dark Styles ────────────────────────────────────────────────────

const dashStyles = StyleSheet.create({
  darkCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  darkCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  darkCardEmpty: {
    fontSize: 14,
    color: '#8A8A8E',
    textAlign: 'center',
  },
});

const profStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  profileAvatarArea: {
    backgroundColor: '#f2f5fa',
    paddingTop: 28,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    backgroundColor: COLORS.white,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  avatarEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: COLORS.red,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEditText: {
    color: COLORS.white,
    fontSize: 10,
  },
  profileGreeting: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.text,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 2,
    color: COLORS.text,
  },
  profileRoleTag: {
    marginTop: 8,
    backgroundColor: '#fff0f2',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  profileRoleTagText: {
    color: COLORS.red,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  businessDayBtn: {
    marginVertical: 12,
    marginHorizontal: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  businessDayBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSub,
    letterSpacing: 0.3,
  },
  reporteesSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  reporteesLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.textMuted,
    marginBottom: 10,
  },
  reporteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reporteeAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  reporteeAvatarText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '600',
  },
  reporteeName: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
  },
  reporteeDesig: {
    fontSize: 11,
    color: COLORS.textSub,
  },
  detailsPanel: {
    flex: 1,
  },
  infoCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  infoCardIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#f2f5fa',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.textMuted,
    marginBottom: 3,
  },
  infoCardValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 16,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
  },
  sectionTitleWrap: {
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitleText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: COLORS.red,
  },
  sectionBody: {
    padding: 16,
    paddingHorizontal: 20,
  },
  aboutInput: {
    minHeight: 64,
    fontSize: 13,
    color: COLORS.textSub,
    textAlignVertical: 'top',
  },
  fieldsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fieldWrap: {
    width: '48%',
    marginBottom: 16,
  },
  fieldWrapFull: {
    width: '100%',
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.textMuted,
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
  },
  fieldValueEmpty: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeActive: {
    backgroundColor: '#ecfdf5',
  },
  badgeActiveText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  badgeActiveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  badgeAdmin: {
    backgroundColor: '#eff6ff',
  },
  badgeAdminText: {
    color: '#2563eb',
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    textAlign: 'center',
    paddingVertical: 12,
    color: COLORS.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
  }
});

const leaveStyles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 6,
  },
  statLine: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
    marginBottom: 3,
  },
  statGreen: {
    color: '#059669',
    fontWeight: '700',
  },
  statRed: {
    color: '#DC2626',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 32,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1F2E',
  },
  modalBody: {
    marginBottom: 32,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  modalLabel: {
    fontSize: 16,
    color: '#1A1F2E',
    fontWeight: '400',
  },
  modalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
  },
  applyButton: {
    backgroundColor: '#39A3DD',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});