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
