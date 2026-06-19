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
