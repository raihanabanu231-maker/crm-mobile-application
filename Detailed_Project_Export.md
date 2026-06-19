# Project Export

## 1. Project Overview
This is an Enterprise HR and Attendance Management Application built with React Native and Expo. It includes attendance tracking, leave management, team approvals, company feeds, and organization directory.

## 2. Packages and Dependencies
```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "2.2.0",
    "@react-native-community/datetimepicker": "8.4.4",
    "@react-native/new-app-screen": "0.81.5",
    "babel-preset-expo": "~54.0.10",
    "expo": "^54.0.35",
    "expo-device": "~8.0.10",
    "expo-document-picker": "~14.0.8",
    "expo-image-picker": "~17.0.11",
    "expo-notifications": "~0.32.17",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-svg": "15.12.1",
    "socket.io-client": "^4.6.1"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.3",
    "@babel/runtime": "^7.25.0",
    "@react-native-community/cli": "20.1.0",
    "@react-native-community/cli-platform-android": "20.1.0",
    "@react-native-community/cli-platform-ios": "20.1.0",
    "@react-native/babel-preset": "0.81.5",
    "@react-native/eslint-config": "0.81.5",
    "@react-native/metro-config": "0.81.5",
    "@react-native/typescript-config": "0.81.5",
    "@types/jest": "^29.5.13",
    "@types/react": "~19.1.10",
    "@types/react-test-renderer": "~19.1.0",
    "eslint": "^8.19.0",
    "jest": "^29.6.3",
    "prettier": "2.8.8",
    "react-test-renderer": "19.1.0",
    "typescript": "~5.9.2"
  }
}
```

## 3. Complete Folder Structure
```text
├── android
│   ├── app
│   │   ├── build.gradle
│   │   ├── debug.keystore
│   │   ├── proguard-rules.pro
│   │   └── src
│   │       └── main
│   │           ├── AndroidManifest.xml
│   │           ├── java
│   │           │   └── com
│   │           │       └── enquiryapplication
│   │           │           ├── MainActivity.kt
│   │           │           └── MainApplication.kt
│   │           └── res
│   │               ├── drawable
│   │               │   └── rn_edit_text_material.xml
│   │               ├── mipmap-hdpi
│   │               │   ├── ic_launcher.png
│   │               │   └── ic_launcher_round.png
│   │               ├── mipmap-mdpi
│   │               │   ├── ic_launcher.png
│   │               │   └── ic_launcher_round.png
│   │               ├── mipmap-xhdpi
│   │               │   ├── ic_launcher.png
│   │               │   └── ic_launcher_round.png
│   │               ├── mipmap-xxhdpi
│   │               │   ├── ic_launcher.png
│   │               │   └── ic_launcher_round.png
│   │               ├── mipmap-xxxhdpi
│   │               │   ├── ic_launcher.png
│   │               │   └── ic_launcher_round.png
│   │               └── values
│   │                   ├── strings.xml
│   │                   └── styles.xml
│   ├── build.gradle
│   ├── gradle
│   │   └── wrapper
│   │       ├── gradle-wrapper.jar
│   │       └── gradle-wrapper.properties
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   └── settings.gradle
├── app.json
├── App.tsx
├── babel.config.js
├── Detailed_Project_Export.md
├── exportProject.js
├── Gemfile
├── index.js
├── ios
│   ├── EnquiryApplication
│   │   ├── AppDelegate.swift
│   │   ├── Images.xcassets
│   │   │   ├── AppIcon.appiconset
│   │   │   │   └── Contents.json
│   │   │   └── Contents.json
│   │   ├── Info.plist
│   │   ├── LaunchScreen.storyboard
│   │   └── PrivacyInfo.xcprivacy
│   ├── EnquiryApplication.xcodeproj
│   │   ├── project.pbxproj
│   │   └── xcshareddata
│   │       └── xcschemes
│   │           └── EnquiryApplication.xcscheme
│   └── Podfile
├── jest.config.js
├── metro.config.js
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── api
│   │   ├── activityApi.ts
│   │   ├── apiClient.ts
│   │   ├── attendanceApi.ts
│   │   ├── authApi.ts
│   │   ├── holidayApi.ts
│   │   ├── leaveApi.ts
│   │   └── wishesApi.ts
│   ├── components
│   ├── screens
│   │   ├── ApplyLeaveScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── MessageListScreen.tsx
│   │   ├── PolicyScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── VideoCallScreen.tsx
│   ├── theme
│   └── utils
│       └── notifications.ts
├── tsconfig.json
└── __tests__
    └── App.test.tsx
```

## 4. All Features Explained
- **Attendance Management:** Check-in/out with a live timer, regularization for missed punches.
- **Leave Management:** View leave balances, upcoming company holidays, and apply for leave.
- **Team Approvals:** Managers can approve/reject regularization requests and view team hierarchy.
- **Internal Feeds:** View announcements, birthdays, and work anniversaries.
- **Organization Directory:** Search and filter all employees.
- **Real-time Notifications:** Local push notifications for check-ins, check-outs, and manager approvals.

## 5. All APIs and Services
### activityApi.ts
```typescript
// src/api/activityApi.ts
import apiClient from './apiClient';

export const activityApi = {
  // GET /api/activities
  getActivities: () => apiClient('/activities'),
  
  // POST /api/activities/:id/comment
  addComment: (id: string, text: string) => apiClient(`/activities/${id}/comment`, { 
    method: 'POST', 
    body: JSON.stringify({ text }) 
  }),
  
  // POST /api/activities/:id/react
  reactToActivity: (id: string, type: string = 'like') => apiClient(`/activities/${id}/react`, { 
    method: 'POST', 
    body: JSON.stringify({ type }) 
  }),
};

```

### apiClient.ts
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// You can swap this to the production URL later
// const BASE_URL = 'http://localhost:5000/api'; 
// const BASE_URL = 'http://10.0.2.2:5000/api'; // Use this if you are testing on an Android Emulator
//const BASE_URL = 'http://192.168.1.8:5000/api'; // Testing on physical phone
const BASE_URL = 'https://atpl-enquiry-application.onrender.com/api';

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem('userToken');
  
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  const responseData = await response.json();
  console.log('API Response data:', endpoint, responseData);
  return responseData;
};

export default apiClient;

```

### attendanceApi.ts
```typescript
// src/api/attendanceApi.ts
import apiClient from './apiClient';

export const attendanceApi = {
  checkIn: () => apiClient('/attendance/check-in', { method: 'POST' }),
  checkOut: () => apiClient('/attendance/check-out', { method: 'POST' }),
  getMyAttendance: () => apiClient(`/attendance/my?t=${Date.now()}`),
  regularize: (id: string, data: any) => apiClient(`/attendance/regularize/${id}`, { 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getTeamStatus: () => apiClient('/attendance/team-status'),
  getOrgReport: () => apiClient('/attendance/organization-report'),
  getPendingRegularizations: () => apiClient('/attendance/pending-regularizations'),
  approveRegularization: (id: string) => apiClient(`/attendance/approve-regularization/${id}`, { method: 'PUT' }),
};

```

### authApi.ts
```typescript
// src/api/authApi.ts
import apiClient from './apiClient';

export const authApi = {
  // GET /api/auth/system-status
  getSystemStatus: () => apiClient('/auth/system-status'),

  // POST /api/auth/register
  register: (data: any) => apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // POST /api/auth/login
  login: (data: any) => apiClient('/auth/login', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  
  // GET /api/auth/invite/:token
  getInviteByToken: (token: string) => apiClient(`/auth/invite/${token}`),

  // POST /api/auth/signup/:token
  signupWithToken: (token: string, data: any) => apiClient(`/auth/signup/${token}`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/me
  getMe: () => apiClient('/auth/me'),

  // GET /api/auth/celebrations
  getCelebrations: () => apiClient('/auth/celebrations'),

  // PUT /api/auth/profile
  updateProfile: (data: any) => apiClient('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/users
  getUsers: () => apiClient('/auth/users'),

  // PUT /api/auth/users/:id
  updateUser: (id: string, data: any) => apiClient(`/auth/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // DELETE /api/auth/users/:id
  deleteUser: (id: string) => apiClient(`/auth/users/${id}`, {
    method: 'DELETE',
  }),

  // POST /api/auth/invite
  createInvite: (data: any) => apiClient('/auth/invite', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/invites
  getInvites: () => apiClient('/auth/invites'),
};

```

### holidayApi.ts
```typescript
import apiClient from './apiClient';

export const holidayApi = {
  getUpcomingHolidays: () => apiClient('/holidays/upcoming'),
  createHoliday: (data: any) => apiClient('/holidays', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  uploadHolidays: (data: any) => apiClient('/holidays/upload', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

```

### leaveApi.ts
```typescript
import apiClient from './apiClient';

export const leaveApi = {
  applyForLeave: (data: any) => apiClient('/leaves', { 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getMyLeaves: () => apiClient('/leaves/my'),
  getUpcomingLeaves: () => apiClient('/leaves/upcoming'),
  getPendingLeaves: () => apiClient('/leaves/pending'),
  reviewLeave: (id: string, data: any) => apiClient(`/leaves/${id}/review`, { 
    method: 'PUT',
    body: JSON.stringify(data)
  }),
};

```

### wishesApi.ts
```typescript
import apiClient from './apiClient';

export const wishesApi = {
  createWish: (data: any) => apiClient('/wishes', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getPendingWishes: () => apiClient('/wishes/pending'),
  getCelebrations: () => apiClient('/auth/celebrations'),
};

```

## 6. Navigation and Screen Flow
- **Auth Stack:** Login Screen -> Main App
- **Main Stack (HomeScreen):** Contains Top Tabs (My Space, Team, Org), Secondary Tabs (Activities, Dashboard, Feeds, Profile), and Bottom Nav (Home, Directory, Payslip, Menu).
- **Side Drawer:** Hamburger menu with options for My Regularizations, Team Approvals, Profile, Settings, Logout.

## 7. Every File With Its Full Code
### App.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ApplyLeaveScreen } from './src/screens/ApplyLeaveScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { PolicyScreen } from './src/screens/PolicyScreen';
import { MessageListScreen } from './src/screens/MessageListScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { VideoCallScreen } from './src/screens/VideoCallScreen';
import { setupNotifications, scheduleDailyAlarms } from './src/utils/notifications';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'LOGIN' | 'HOME' | 'APPLY_LEAVE' | 'SETTINGS' | 'POLICY' | 'MESSAGE_LIST' | 'CHAT' | 'VIDEO_CALL'>('LOGIN');
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [selectedChatContact, setSelectedChatContact] = useState<any>(null);
  const [initialHomeNav, setInitialHomeNav] = useState('Activities');
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'preferences'>('privacy');

  useEffect(() => {
    async function initNotifications() {
      const hasPermission = await setupNotifications();
      if (hasPermission) {
        await scheduleDailyAlarms();
      }
    }
    initNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const actionIdentifier = response.actionIdentifier;
      if (actionIdentifier === 'CHECK_IN_ACTION') {
        Alert.alert("Checked In", "You successfully checked in for the day!");
      } else if (actionIdentifier === 'CHECK_OUT_ACTION') {
        Alert.alert("Checked Out", "You successfully checked out. Have a good evening!");
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      {currentScreen === 'LOGIN' && (
        <LoginScreen onLoginSuccess={() => setCurrentScreen('HOME')} />
      )}
      {currentScreen === 'HOME' && (
        <HomeScreen 
          initialNav={initialHomeNav}
          onLogout={() => setCurrentScreen('LOGIN')} 
          onSettingsPress={() => setCurrentScreen('SETTINGS')}
          onApplyLeave={(leaveData) => {
            setSelectedLeave(leaveData);
            setCurrentScreen('APPLY_LEAVE');
          }}
          onMessagePress={() => setCurrentScreen('MESSAGE_LIST')}
        />
      )}
      {currentScreen === 'APPLY_LEAVE' && (
        <ApplyLeaveScreen 
          leaveData={selectedLeave} 
          onBack={() => setCurrentScreen('HOME')}
          onSubmit={() => {
            // handle submit logic here, e.g. show success, then go home
            setCurrentScreen('HOME');
          }}
        />
      )}
      {currentScreen === 'SETTINGS' && (
        <SettingsScreen 
          onBack={() => setCurrentScreen('HOME')}
          onLogout={() => setCurrentScreen('LOGIN')}
          onViewProfile={() => {
            setInitialHomeNav('Profile');
            setCurrentScreen('HOME');
          }}
          onOpenPolicy={(type) => {
            setPolicyType(type);
            setCurrentScreen('POLICY');
          }}
        />
      )}
      {currentScreen === 'POLICY' && (
        <PolicyScreen 
          type={policyType}
          onBack={() => setCurrentScreen('SETTINGS')}
        />
      )}
      {currentScreen === 'MESSAGE_LIST' && (
        <MessageListScreen 
          onBack={() => setCurrentScreen('HOME')}
          onSelectChat={(contact) => {
            setSelectedChatContact(contact);
            setCurrentScreen('CHAT');
          }}
        />
      )}
      {currentScreen === 'CHAT' && (
        <ChatScreen 
          contact={selectedChatContact}
          onBack={() => setCurrentScreen('MESSAGE_LIST')}
          onVideoCall={() => setCurrentScreen('VIDEO_CALL')}
        />
      )}
      {currentScreen === 'VIDEO_CALL' && (
        <VideoCallScreen 
          contact={selectedChatContact}
          onEndCall={() => setCurrentScreen('CHAT')}
        />
      )}
    </SafeAreaProvider>
  );
}

export default App;

```

### src\api\activityApi.ts
```ts
// src/api/activityApi.ts
import apiClient from './apiClient';

export const activityApi = {
  // GET /api/activities
  getActivities: () => apiClient('/activities'),
  
  // POST /api/activities/:id/comment
  addComment: (id: string, text: string) => apiClient(`/activities/${id}/comment`, { 
    method: 'POST', 
    body: JSON.stringify({ text }) 
  }),
  
  // POST /api/activities/:id/react
  reactToActivity: (id: string, type: string = 'like') => apiClient(`/activities/${id}/react`, { 
    method: 'POST', 
    body: JSON.stringify({ type }) 
  }),
};

```

### src\api\apiClient.ts
```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// You can swap this to the production URL later
// const BASE_URL = 'http://localhost:5000/api'; 
// const BASE_URL = 'http://10.0.2.2:5000/api'; // Use this if you are testing on an Android Emulator
//const BASE_URL = 'http://192.168.1.8:5000/api'; // Testing on physical phone
const BASE_URL = 'https://atpl-enquiry-application.onrender.com/api';

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem('userToken');
  
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  const responseData = await response.json();
  console.log('API Response data:', endpoint, responseData);
  return responseData;
};

export default apiClient;

```

### src\api\attendanceApi.ts
```ts
// src/api/attendanceApi.ts
import apiClient from './apiClient';

export const attendanceApi = {
  checkIn: () => apiClient('/attendance/check-in', { method: 'POST' }),
  checkOut: () => apiClient('/attendance/check-out', { method: 'POST' }),
  getMyAttendance: () => apiClient(`/attendance/my?t=${Date.now()}`),
  regularize: (id: string, data: any) => apiClient(`/attendance/regularize/${id}`, { 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getTeamStatus: () => apiClient('/attendance/team-status'),
  getOrgReport: () => apiClient('/attendance/organization-report'),
  getPendingRegularizations: () => apiClient('/attendance/pending-regularizations'),
  approveRegularization: (id: string) => apiClient(`/attendance/approve-regularization/${id}`, { method: 'PUT' }),
};

```

### src\api\authApi.ts
```ts
// src/api/authApi.ts
import apiClient from './apiClient';

export const authApi = {
  // GET /api/auth/system-status
  getSystemStatus: () => apiClient('/auth/system-status'),

  // POST /api/auth/register
  register: (data: any) => apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // POST /api/auth/login
  login: (data: any) => apiClient('/auth/login', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  
  // GET /api/auth/invite/:token
  getInviteByToken: (token: string) => apiClient(`/auth/invite/${token}`),

  // POST /api/auth/signup/:token
  signupWithToken: (token: string, data: any) => apiClient(`/auth/signup/${token}`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/me
  getMe: () => apiClient('/auth/me'),

  // GET /api/auth/celebrations
  getCelebrations: () => apiClient('/auth/celebrations'),

  // PUT /api/auth/profile
  updateProfile: (data: any) => apiClient('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/users
  getUsers: () => apiClient('/auth/users'),

  // PUT /api/auth/users/:id
  updateUser: (id: string, data: any) => apiClient(`/auth/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // DELETE /api/auth/users/:id
  deleteUser: (id: string) => apiClient(`/auth/users/${id}`, {
    method: 'DELETE',
  }),

  // POST /api/auth/invite
  createInvite: (data: any) => apiClient('/auth/invite', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/invites
  getInvites: () => apiClient('/auth/invites'),
};

```

### src\api\holidayApi.ts
```ts
import apiClient from './apiClient';

export const holidayApi = {
  getUpcomingHolidays: () => apiClient('/holidays/upcoming'),
  createHoliday: (data: any) => apiClient('/holidays', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  uploadHolidays: (data: any) => apiClient('/holidays/upload', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

```

### src\api\leaveApi.ts
```ts
import apiClient from './apiClient';

export const leaveApi = {
  applyForLeave: (data: any) => apiClient('/leaves', { 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getMyLeaves: () => apiClient('/leaves/my'),
  getUpcomingLeaves: () => apiClient('/leaves/upcoming'),
  getPendingLeaves: () => apiClient('/leaves/pending'),
  reviewLeave: (id: string, data: any) => apiClient(`/leaves/${id}/review`, { 
    method: 'PUT',
    body: JSON.stringify(data)
  }),
};

```

### src\api\wishesApi.ts
```ts
import apiClient from './apiClient';

export const wishesApi = {
  createWish: (data: any) => apiClient('/wishes', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getPendingWishes: () => apiClient('/wishes/pending'),
  getCelebrations: () => apiClient('/auth/celebrations'),
};

```

### src\screens\ApplyLeaveScreen.tsx
```tsx
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

      // Hits POST /api/leaves
      const res = await leaveApi.applyForLeave(payload);

      Alert.alert("Debug API Response", JSON.stringify(res, null, 2));
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

```

### src\screens\ChatScreen.tsx
```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Polyline, Line, Rect, Polygon } from 'react-native-svg';

const COLORS = {
  bg: '#F5F7F9',
  white: '#FFFFFF',
  primary: '#E85874',
  primaryLight: '#FDD7E0',
  primaryBlue: '#39A3DD',
  text: '#38474F',
  textSub: '#8A9BA5',
  border: '#E5E7EB',
  chatBubbleOther: '#FFFFFF',
  chatBubbleMe: '#39A3DD',
};

// --- Mock Data ---
const INITIAL_MESSAGES = [
  { id: '1', text: 'Hey there! How is the new project coming along?', sender: 'other', time: '10:30 AM' },
  { id: '2', text: 'Its going great! I will share the documents with you shortly.', sender: 'me', time: '10:32 AM' },
  { id: '3', text: 'Perfect, looking forward to it.', sender: 'other', time: '10:33 AM' },
];

// --- Icons ---
function ArrowLeftIcon({ color = '#38474F' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M20 12H4M4 12L10 6M4 12L10 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PhoneIcon({ color = '#38474F' }: { color?: string }) {
  return (
    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function VideoCallIcon({ color = '#38474F' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M23 7l-7 5 7 5V7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SendIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Line x1="22" y1="2" x2="11" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Polygon points="22 2 15 22 11 13 2 9 22 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Fixed SendIcon using standard SVG elements
function PaperPlaneIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PaperclipIcon({ color = '#8A9BA5' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ImageIcon({ color = '#38474F' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" />
      <Circle cx="8.5" cy="8.5" r="1.5" stroke={color} strokeWidth="2" />
      <Polyline points="21 15 16 10 5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DocumentIcon({ color = '#38474F' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface ChatScreenProps {
  contact: any;
  onBack: () => void;
  onVideoCall?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ contact, onBack, onVideoCall }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [attachModalVisible, setAttachModalVisible] = useState(false);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        
        <View style={styles.headerProfile}>
          <View style={[styles.avatar, { backgroundColor: contact?.avatar || COLORS.primaryLight }]}>
            <Text style={[styles.avatarText, { color: contact?.color || COLORS.primary }]}>{contact?.initial || '?'}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{contact?.name || 'Contact'}</Text>
            <Text style={styles.headerStatus}>{contact?.status === 'online' ? 'Online' : 'Offline'}</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.callBtn}>
            <PhoneIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.callBtn} onPress={onVideoCall}>
            <VideoCallIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <KeyboardAvoidingView 
        style={styles.chatArea} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(msg => {
            const isMe = msg.sender === 'me';
            return (
              <View key={msg.id} style={[styles.messageRow, isMe ? styles.messageRowMe : styles.messageRowOther]}>
                {!isMe && (
                  <View style={[styles.chatAvatar, { backgroundColor: contact?.avatar || COLORS.primaryLight }]}>
                    <Text style={[styles.chatAvatarText, { color: contact?.color || COLORS.primary }]}>{contact?.initial || '?'}</Text>
                  </View>
                )}
                <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                  <Text style={[styles.messageText, isMe ? styles.messageTextMe : styles.messageTextOther]}>{msg.text}</Text>
                  <Text style={[styles.timeText, isMe ? styles.timeTextMe : styles.timeTextOther]}>{msg.time}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachBtn} onPress={() => setAttachModalVisible(true)}>
            <PaperclipIcon />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.textSub}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendBtn, inputText.trim().length > 0 ? styles.sendBtnActive : styles.sendBtnInactive]}
            onPress={sendMessage}
            disabled={inputText.trim().length === 0}
          >
            <PaperPlaneIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Attachment Modal */}
      <Modal visible={attachModalVisible} transparent animationType="fade" onRequestClose={() => setAttachModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setAttachModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.attachMenu}>
                <TouchableOpacity style={styles.attachItem} onPress={() => setAttachModalVisible(false)}>
                  <View style={[styles.attachIconWrap, { backgroundColor: '#F3E5F5' }]}>
                    <ImageIcon color="#AB47BC" />
                  </View>
                  <Text style={styles.attachText}>Photo / Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.attachItem} onPress={() => setAttachModalVisible(false)}>
                  <View style={[styles.attachIconWrap, { backgroundColor: '#EAF4FF' }]}>
                    <DocumentIcon color="#4A90E2" />
                  </View>
                  <Text style={styles.attachText}>Document</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.bg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerInfo: {
    marginLeft: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  callBtn: {
    padding: 8,
    marginLeft: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  chatAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  chatAvatarText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bubble: {
    maxWidth: '75%',
    padding: 14,
    borderRadius: 20,
  },
  bubbleMe: {
    backgroundColor: COLORS.chatBubbleMe,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: COLORS.chatBubbleOther,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  messageTextMe: {
    color: COLORS.white,
  },
  messageTextOther: {
    color: COLORS.text,
  },
  timeText: {
    fontSize: 11,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  timeTextMe: {
    color: 'rgba(255,255,255,0.7)',
  },
  timeTextOther: {
    color: COLORS.textSub,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  attachBtn: {
    padding: 12,
    marginRight: 4,
    marginBottom: 2,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    color: COLORS.text,
    maxHeight: 100,
    minHeight: 45,
  },
  sendBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginBottom: 0,
  },
  sendBtnActive: {
    backgroundColor: COLORS.primaryBlue,
  },
  sendBtnInactive: {
    backgroundColor: COLORS.textSub,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  attachMenu: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attachItem: {
    alignItems: 'center',
  },
  attachIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  attachText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});

```

### src\screens\HomeScreen.tsx
```tsx
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

export const HomeScreen: React.FC<HomeScreenProps> = ({ initialNav, onLogout, onApplyLeave, onSettingsPress, onMessagePress }) => {
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

  const [activeTab, setActiveTab] = useState('My Space');
  const [activeNav, setActiveNav] = useState(initialNav || 'Activities');
  const [activeTeamNav, setActiveTeamNav] = useState('Team Space');
  const [bottomTab, setBottomTab] = useState('Home');
  const [checkedIn, setCheckedIn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

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
          previousSeconds = Math.floor(todayRecord.totalHours * 3600);
        }

        if (todayRecord.sessions && todayRecord.sessions.length > 0) {
          setSessionLogs(todayRecord.sessions);
          const lastSession = todayRecord.sessions[todayRecord.sessions.length - 1];

          // Check multiple possible property names from the backend
          let hasCheckedOut = lastSession.checkOut || lastSession.checkout || lastSession.checkOutTime || lastSession.endTime;

          const checkInDate = new Date(lastSession.checkIn || lastSession.checkin || lastSession.startTime);
          const currentSessionSeconds = Math.floor((new Date().getTime() - checkInDate.getTime()) / 1000);

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
    try {
      if (checkedIn) {
        // Try the default POST /check-out first
        try {
          await attendanceApi.checkOut();
        } catch (e: any) {
          console.log("Standard POST /check-out failed, trying alternatives...", e.message);
          // Fallback 1: Try PUT /check-out
          try {
            await apiClient('/attendance/check-out', { method: 'PUT' });
          } catch (e2) {
            // Fallback 2: Try POST /checkout (no hyphen)
            try {
              await apiClient('/attendance/checkout', { method: 'POST' });
            } catch (e3) {
              // Fallback 3: Try PUT /checkout (no hyphen)
              await apiClient('/attendance/checkout', { method: 'PUT' });
            }
          }
        }
        setCheckedIn(false);
        fetchAttendance(); // Re-sync exact time from server
      } else {
        await attendanceApi.checkIn();
        setCheckedIn(true);
        fetchAttendance(); // Re-sync exact time from server
      }
    } catch (err: any) {
      const errorMsg = err.message || "";
      console.log("Check-in/out error details:", errorMsg);

      // If the backend yells at us that we are already checked in, flip the button automatically!
      if (errorMsg.toLowerCase().includes("active session") || errorMsg.toLowerCase().includes("already")) {
        Alert.alert("Synced!", "You were already checked in on the server! We updated your button to say Check-Out.");
        setCheckedIn(true);
        fetchAttendance();
      } else {
        // Detect if this is a stuck session (like the 47 hour one)
        if (seconds > 86400) { // More than 24 hours
          Alert.alert(
            "Session Stuck",
            `Your check-in is from over 24 hours ago. The server might not allow a normal checkout.\n\nPlease use the Regularize button (the green circle icon at the top) to fix this missed punch.\n\nServer Error: ${errorMsg}`
          );
        } else {
          Alert.alert("Error", `Could not update attendance status.\nDetails: ${errorMsg}`);
        }
      }
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
            <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 2 }}>Good Morning,</Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1A1F2E' }}>{user ? user.firstName : 'Loading...'}</Text>
          </View>
        </View>

        {/* Right: Search + Bell + Clock (Regularization) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => { if (!checkedIn) { Alert.alert("Check-In Required", "Please check-in first.", [{ text: "Cancel", style: "cancel" }, { text: "Check-In", onPress: handleCheckInToggle }]); return; } }}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Circle cx="11" cy="11" r="8" /><Line x1="21" y1="21" x2="16.65" y2="16.65" /></Svg>
          </TouchableOpacity>
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
        </View>
      </View>

      {/* Blue Hero Card */}
      <View style={{ marginHorizontal: 16, backgroundColor: '#39A3DD', borderRadius: 24, padding: 24, paddingRight: 100, position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
        {/* Abstract background shapes */}
        <View style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.15)' }} />
        <View style={{ position: 'absolute', bottom: -30, left: 30, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', lineHeight: 34 }}>Stay productive and{"\n"}make today count!</Text>

        {/* Target Illustration */}
        <View style={{ position: 'absolute', right: 20, top: '50%', marginTop: -40 }}>
          <Svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            {/* Dart shadow */}
            <Line x1="88" y1="18" x2="55" y2="51" stroke="rgba(0,0,0,0.2)" strokeWidth="6" strokeLinecap="round" />
            <Circle cx="50" cy="50" r="38" fill="#FFF" />
            <Circle cx="50" cy="50" r="28" fill="#39A3DD" />
            <Circle cx="50" cy="50" r="18" fill="#FFF" />
            <Circle cx="50" cy="50" r="8" fill="#39A3DD" />
            {/* Dart stick */}
            <Line x1="85" y1="15" x2="52" y2="48" stroke="#1A1F2E" strokeWidth="4" strokeLinecap="round" />
            {/* Dart tail */}
            <Polyline points="85,25 85,15 75,15" fill="#EF4444" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <Polyline points="80,20 90,10 80,10" fill="#EF4444" stroke="#EF4444" strokeWidth="2" />
          </Svg>
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
                  style={{ backgroundColor: checkedIn ? '#EF4444' : '#39A3DD', borderRadius: 100, paddingVertical: 12, alignItems: 'center' }}
                  activeOpacity={0.8}
                  onPress={handleCheckInToggle}
                >
                  <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>
                    {checkedIn ? 'Check-Out' : 'Check-In'}
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


            {/* ── COMPANY HOLIDAYS ── */}
            <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#1A1F2E' }}>Company Holidays</Text>
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
                      <Text style={profStyles.fieldLabel}>Zoho Role</Text>
                      <View style={[profStyles.badgeContainer, profStyles.badgeAdmin]}>
                        <Text style={profStyles.badgeAdminText}>Admin</Text>
                      </View>
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

        {/* Floating Center Button */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ position: 'absolute', top: -35, width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', padding: 6, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 8 }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', borderRadius: 24, backgroundColor: '#39A3DD', justifyContent: 'center', alignItems: 'center', shadowColor: '#39A3DD', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 }}>
              <Svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <Line x1="12" y1="5" x2="12" y2="19" />
                <Line x1="5" y1="12" x2="19" y2="12" />
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
```

### src\screens\LoginScreen.tsx
```tsx
import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

// ==========================================
// 1. Theme Configuration
// ==========================================
const theme = {
  colors: {
    background: '#F5F7F9',   // Light Gray
    surface: '#FFFFFF',      // White
    surfaceLight: '#FDD7E0', // Light Pink for disabled state
    primary: '#E85874',      // Primary Pink
    text: '#38474F',         // Dark Gray
    textMuted: '#8A9BA5',    // Medium Gray
    textSecondary: '#8A9BA5', // Medium Gray
    border: '#E5E7EB',
    borderFocus: '#39A3DD',   // Primary Blue
    error: '#C4455D',        // Dark Pink
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    md: 12,
    lg: 16,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
  },
};

// ==========================================
// 2. Custom InputField Component
// ==========================================
interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  isPassword = false,
  secureTextEntry,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.label}>{label}</Text>
      <View
        style={[
          inputStyles.inputContainer,
          isFocused && inputStyles.inputFocused,
          error ? inputStyles.inputError : null,
        ]}
      >
        <TextInput
          style={inputStyles.input}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={inputStyles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <Text style={inputStyles.iconText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={inputStyles.errorText}>{error}</Text> : null}
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    height: 52,
    paddingHorizontal: theme.spacing.md,
  },
  inputFocused: {
    borderColor: theme.colors.borderFocus,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    padding: 0,
  },
  iconContainer: {
    paddingHorizontal: theme.spacing.xs,
    justifyContent: 'center',
  },
  iconText: {
    color: theme.colors.borderFocus,
    fontSize: theme.typography.sizes.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    marginTop: theme.spacing.xs,
    fontWeight: '500',
  },
});

// ==========================================
// 3. Custom Button Component
// ==========================================
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const isButtonDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        isButtonDisabled && buttonStyles.disabledButton,
        style,
      ]}
      activeOpacity={0.8}
      disabled={isButtonDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={[buttonStyles.text, { color: '#FFF' }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: 52,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: theme.spacing.sm,
  },
  disabledButton: {
    backgroundColor: theme.colors.surfaceLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

// ==========================================
// 4. Main LoginScreen Component
// ==========================================
interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Mail ID is required');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid Mail ID');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      
      // Save the token to phone storage
      if (response.token || response.accessToken || response.data?.token) {
        const actualToken = response.token || response.accessToken || response.data?.token;
        await AsyncStorage.setItem('userToken', actualToken);
        
        // Fetch the user data behind the scenes
        const userData = await authApi.getMe();
        
        // Here you would typically save `userData` to Redux, Context, or Zustand
        // For now, we will just silently go to the Home screen!
      } else {
        console.warn("No token found in response", response);
      }
      
      setIsLoading(false);
      onLoginSuccess();
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Login Failed', error.message || 'Check your credentials and try again.');
    }
  };

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <KeyboardAvoidingView
        style={screenStyles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={screenStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={screenStyles.headerContainer}>
            <View style={screenStyles.logoBadge}>
              <Text style={screenStyles.logoText}>EQ</Text>
            </View>
            <Text style={screenStyles.appName}>Enquirely</Text>
            <Text style={screenStyles.subtitle}>
              The premium enquiry management workspace
            </Text>
          </View>

          {/* Form Card */}
          <View style={screenStyles.card}>
            <Text style={screenStyles.cardTitle}>Welcome Back</Text>
            <Text style={screenStyles.cardSubtitle}>
              Enter your credentials to access your dashboard
            </Text>

            <InputField
              label="Mail ID"
              placeholder="name@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              error={emailError}
            />

            <InputField
              label="Password"
              placeholder="••••••••"
              isPassword={true}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              error={passwordError}
            />

            <TouchableOpacity
              style={screenStyles.forgotPasswordContainer}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Reset Password', 'A reset link has been sent.')}
            >
              <Text style={screenStyles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              loading={isLoading}
              onPress={handleLogin}
              style={screenStyles.submitButton}
            />
          </View>

          {/* Footer */}
          <View style={screenStyles.footerContainer}>
            <Text style={screenStyles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Alert.alert('Register', 'Sign up functionality coming soon!')}
            >
              <Text style={screenStyles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: {
    color: '#FFF',
    fontSize: theme.typography.sizes.xl,
    fontWeight: '800',
  },
  appName: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xxl,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xl,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.md,
  },
  forgotPasswordText: {
    color: theme.colors.borderFocus,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: theme.spacing.xs,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
  },
  signUpLink: {
    color: theme.colors.borderFocus,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '700',
  },
});

```

### src\screens\MessageListScreen.tsx
```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const COLORS = {
  bg: '#F5F7F9',
  white: '#FFFFFF',
  primary: '#E85874',
  primaryBlue: '#39A3DD',
  text: '#38474F',
  textSub: '#8A9BA5',
  border: '#E5E7EB',
};

// --- Mock Data ---
const CONTACTS = [
  { id: '1', name: 'Alex Johnson', role: 'Designer', avatar: '#FDD7E0', color: '#E85874', initial: 'A', status: 'online' },
  { id: '2', name: 'Maria Garcia', role: 'Developer', avatar: '#D4EAF7', color: '#39A3DD', initial: 'M', status: 'offline' },
  { id: '3', name: 'James Smith', role: 'Project Manager', avatar: '#F1F8E9', color: '#7CB342', initial: 'J', status: 'online' },
  { id: '4', name: 'Design Team Group', role: 'Group • 4 members', avatar: '#F3E5F5', color: '#AB47BC', initial: 'D', status: 'group' },
  { id: '5', name: 'Michael Brown', role: 'HR', avatar: '#FFFDE7', color: '#FDD835', initial: 'M', status: 'online' },
];

// --- Icons ---
function ArrowLeftIcon({ color = '#38474F' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M20 12H4M4 12L10 6M4 12L10 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SearchIcon({ color = '#8A9BA5' }: { color?: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2.5" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

function GroupAddIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="8.5" cy="7" r="4" stroke={color} strokeWidth="2" />
      <Line x1="20" y1="8" x2="20" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="23" y1="11" x2="17" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

interface MessageListScreenProps {
  onBack: () => void;
  onSelectChat: (contact: any) => void;
}

export const MessageListScreen: React.FC<MessageListScreenProps> = ({ onBack, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = CONTACTS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search colleagues or groups..."
            placeholderTextColor={COLORS.textSub}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Contact List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {filteredContacts.map(contact => (
          <TouchableOpacity 
            key={contact.id} 
            style={styles.contactCard}
            activeOpacity={0.7}
            onPress={() => onSelectChat(contact)}
          >
            <View style={[styles.avatar, { backgroundColor: contact.avatar }]}>
              <Text style={[styles.avatarText, { color: contact.color }]}>{contact.initial}</Text>
              {contact.status !== 'group' && (
                <View style={[styles.statusDot, { backgroundColor: contact.status === 'online' ? '#4CAF50' : '#BDBDBD' }]} />
              )}
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactRole}>{contact.role}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {filteredContacts.length === 0 && (
          <Text style={styles.emptyText}>No colleagues found.</Text>
        )}
      </ScrollView>

      {/* Floating Action Button for Groups */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <GroupAddIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: COLORS.text,
    height: '100%',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  contactInfo: {
    marginLeft: 16,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  contactRole: {
    fontSize: 13,
    color: COLORS.textSub,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSub,
    marginTop: 40,
    fontSize: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: COLORS.primaryBlue,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primaryBlue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  }
});

```

### src\screens\PolicyScreen.tsx
```tsx
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

```

### src\screens\SettingsScreen.tsx
```tsx
import React, { useState } from 'react';
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
          <Text style={styles.heroProfileName}>Abishek Sivaraj</Text>
          <Text style={styles.heroProfileEmail}>abishek.sivaraj@atplgroup.com</Text>
          <TouchableOpacity style={styles.viewProfileBtnHero} activeOpacity={0.8} onPress={onViewProfile}>
            <Text style={styles.viewProfileTextHero}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Grid */}
        <View style={styles.settingsGrid}>
          {/* Organization */}
          <TouchableOpacity style={[styles.gridSquare, styles.gridFullWidth]} activeOpacity={0.7}>
            <View style={styles.gridHeaderRow}>
               <View style={[styles.gridIconWrap, { backgroundColor: '#FDD7E0' }]}>
                 <OrgIcon color={COLORS.primaryPink} />
               </View>
               <Text style={styles.gridTitle}>Organization</Text>
            </View>
            <Text style={styles.gridSubText} numberOfLines={1}>Archery Technocrats Private Limited</Text>
          </TouchableOpacity>

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
        </View>

      </ScrollView>

      {/* Update Available Banner */}
      <View style={styles.updateBanner}>
        <Text style={styles.updateText}>Update Available</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.updateBtnText}>UPDATE</Text>
        </TouchableOpacity>
      </View>

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

```

### src\screens\VideoCallScreen.tsx
```tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';
import io from 'socket.io-client';

const COLORS = {
  bg: '#1A1F2E',
  white: '#FFFFFF',
  primary: '#E85874',
  primaryBlue: '#39A3DD',
  textSub: '#8A9BA5',
  glass: 'rgba(255, 255, 255, 0.15)',
  red: '#E85874',
};

// --- Icons ---
function MicIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="12" y1="19" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="8" y1="23" x2="16" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MicOffIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="12" y1="19" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="8" y1="23" x2="16" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function VideoIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M23 7l-7 5 7 5V7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function VideoOffIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PhoneOffIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.32A19.79 19.79 0 0 1 2 4.11 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="23" y1="1" x2="1" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SwitchCameraIcon({ color = '#FFF' }: { color?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Polyline points="20 9 20 14 15 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="4 15 4 10 9 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20 14A8.1 8.1 0 0 1 4 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 10a8.1 8.1 0 0 1 16 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface VideoCallScreenProps {
  contact: any;
  onEndCall: () => void;
}

export const VideoCallScreen: React.FC<VideoCallScreenProps> = ({ contact, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [socketStatus, setSocketStatus] = useState('Connecting...');

  // Setup Socket.io
  useEffect(() => {
    // Replace with your actual signaling server URL when backend is ready
    const SERVER_URL = 'http://localhost:3000';
    const socket = io(SERVER_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 3,
    });

    socket.on('connect', () => {
      setSocketStatus('Connected (Signaling Active)');
      // Emit signaling events here, e.g.:
      // socket.emit('call-user', { userToCall: contact.id, signalData: ..., from: socket.id });
    });

    socket.on('connect_error', () => {
      setSocketStatus('Server Not Found (Mock Mode)');
    });

    socket.on('disconnect', () => {
      setSocketStatus('Disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [contact]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      
      {/* Remote Video Placeholder */}
      <View style={styles.remoteVideoArea}>
        <View style={[styles.largeAvatar, { backgroundColor: contact?.avatar || COLORS.primary }]}>
          <Text style={[styles.largeAvatarText, { color: contact?.color || COLORS.white }]}>
            {contact?.initial || '?'}
          </Text>
        </View>
        <Text style={styles.remoteName}>{contact?.name || 'Contact'}</Text>
        <Text style={styles.socketStatus}>{socketStatus}</Text>
        <Text style={styles.disclaimerText}>
          (Real video rendering requires react-native-webrtc outside Expo Go)
        </Text>
      </View>

      {/* Local Video Placeholder (Picture in Picture) */}
      <View style={styles.localVideoArea}>
        {isVideoOff ? (
          <View style={styles.localVideoPlaceholder}>
            <Text style={styles.localInitial}>You</Text>
          </View>
        ) : (
          <View style={styles.localVideoActive}>
            <Text style={styles.localInitial}>Camera Active</Text>
          </View>
        )}
      </View>

      {/* Call Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.controlBtn, isMuted && styles.controlBtnActive]} 
          onPress={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOffIcon color={COLORS.textSub} /> : <MicIcon />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlBtn, isVideoOff && styles.controlBtnActive]} 
          onPress={() => setIsVideoOff(!isVideoOff)}
        >
          {isVideoOff ? <VideoOffIcon color={COLORS.textSub} /> : <VideoIcon />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtn}>
          <SwitchCameraIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallBtn} onPress={onEndCall}>
          <PhoneOffIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  remoteVideoArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeAvatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  largeAvatarText: {
    fontSize: 64,
    fontWeight: '800',
  },
  remoteName: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 12,
  },
  socketStatus: {
    fontSize: 14,
    color: COLORS.primaryBlue,
    fontWeight: '600',
    marginBottom: 12,
  },
  disclaimerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  localVideoArea: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 100,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  localVideoPlaceholder: {
    flex: 1,
    backgroundColor: '#38474F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  localVideoActive: {
    flex: 1,
    backgroundColor: '#2b3142',
    alignItems: 'center',
    justifyContent: 'center',
  },
  localInitial: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.glass,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnActive: {
    backgroundColor: COLORS.white,
  },
  endCallBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});

```

### src\utils\notifications.ts
```ts
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Set up the notification handler so it shows the notification when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Requests permission for notifications and returns true if granted.
 */
export async function setupNotifications(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#E85874',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log('Failed to get notification permissions!');
    return false;
  }

  // Set up interactive notification categories (Action Buttons)
  await Notifications.setNotificationCategoryAsync('CHECK_IN_CATEGORY', [
    {
      identifier: 'CHECK_IN_ACTION',
      buttonTitle: 'Check-In Now ✅',
      options: {
        opensAppToForeground: true,
      },
    },
  ]);

  await Notifications.setNotificationCategoryAsync('CHECK_OUT_CATEGORY', [
    {
      identifier: 'CHECK_OUT_ACTION',
      buttonTitle: 'Check-Out Now 🚪',
      options: {
        opensAppToForeground: true,
      },
    },
  ]);

  return true;
}

/**
 * Cancels all previous notifications and schedules the daily Check-in (9:25 AM) and Check-out (6:30 PM) alarms.
 */
export async function scheduleDailyAlarms() {
  // First, clear all previously scheduled notifications to avoid duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule Check-in Alarm at 9:25 AM
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check-in Reminder ⏰",
      body: "Don't forget to check in for the day!",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
      categoryIdentifier: 'CHECK_IN_CATEGORY',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 9,
      minute: 25,
    },
  });

  // Schedule Check-out Alarm at 6:30 PM (18:30)
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check-out Reminder 🌙",
      body: "Remember to check out before you leave!",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
      categoryIdentifier: 'CHECK_OUT_CATEGORY',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 25,
    },
  });

  console.log("Scheduled daily check-in (9:25 AM) and check-out (6:30 PM) alarms.");
}

/**
 * Triggers an immediate local push notification (useful for in-app alerts).
 */
export async function sendLocalNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: null,
  });
}

```

