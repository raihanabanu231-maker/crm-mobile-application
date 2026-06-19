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