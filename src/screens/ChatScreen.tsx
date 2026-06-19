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
