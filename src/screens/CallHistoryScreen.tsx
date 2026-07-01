import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  ActivityIndicator, StyleSheet, FlatList, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline, Path } from 'react-native-svg';
import apiClient from '../api/apiClient';

const C = {
  primary: '#E85874',
  blue: '#39A3DD',
  bg: '#F9FAFB',
  white: '#FFFFFF',
  text: '#1E293B',
  textSub: '#64748B',
  border: '#E2E8F0',
  green: '#10B981',
};

interface Props {
  onBack: () => void;
  onAddCall: () => void;
  onEditCall: (id: string) => void;
}

export const CallHistoryScreen: React.FC<Props> = ({ onBack, onAddCall, onEditCall }) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await apiClient('/daily-call-reports', { method: 'GET' });
      const data = res.data?.data || res.data || [];
      // Sort by date descending
      data.sort((a: any, b: any) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime());
      setReports(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load call history');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const d = item.date ? new Date(item.date).toLocaleDateString('en-IN') : 'N/A';
    return (
      <TouchableOpacity style={s.card} onPress={() => onEditCall(item._id || item.id)}>
        <View style={s.cardHeader}>
          <Text style={s.customerName}>{item.customer || 'Unknown Customer'}</Text>
          <View style={[s.badge, item.closedPending === 'Closed' ? s.badgeClosed : s.badgePending]}>
            <Text style={[s.badgeText, item.closedPending === 'Closed' ? s.badgeTextClosed : s.badgeTextPending]}>
              {item.closedPending || 'Pending'}
            </Text>
          </View>
        </View>
        <View style={s.cardBody}>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Date:</Text>
            <Text style={s.infoValue}>{d}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Nature:</Text>
            <Text style={s.infoValue}>{item.workNature || 'N/A'}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Person:</Text>
            <Text style={s.infoValue}>{item.personAligned || 'N/A'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.header}>
        <View style={s.headerLeft}>
          <TouchableOpacity onPress={onBack} style={s.backBtn}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke={C.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Polyline points="15 18 9 12 15 6" />
            </Svg>
          </TouchableOpacity>
          <View>
            <Text style={s.headerTitle}>Call History</Text>
            <Text style={s.headerSub}>Manage your daily calls</Text>
          </View>
        </View>
        <TouchableOpacity style={s.addBtn} onPress={onAddCall}>
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 5v14M5 12h14" />
          </Svg>
          <Text style={s.addBtnText}>Add Call</Text>
        </TouchableOpacity>
      </View>

      <View style={s.content}>
        {loading ? (
          <ActivityIndicator size="large" color={C.blue} style={{ marginTop: 40 }} />
        ) : reports.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyStateText}>No call reports found</Text>
          </View>
        ) : (
          <FlatList
            data={reports}
            keyExtractor={(item, index) => item._id || item.id || index.toString()}
            renderItem={renderItem}
            contentContainerStyle={s.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { padding: 8, marginLeft: -8, marginRight: 8 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: C.text },
  headerSub: { fontSize: 12, color: C.textSub, marginTop: 2 },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.blue,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, gap: 6
  },
  addBtnText: { color: C.white, fontSize: 14, fontWeight: '600' },
  content: { flex: 1 },
  listContent: { padding: 16, gap: 12 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyStateText: { fontSize: 15, color: C.textSub },
  card: {
    backgroundColor: C.white, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: C.border, elevation: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  customerName: { fontSize: 16, fontWeight: '700', color: C.text, flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgePending: { backgroundColor: '#FEF3C7' },
  badgeClosed: { backgroundColor: '#D1FAE5' },
  badgeText: { fontSize: 11, fontWeight: '700' },
  badgeTextPending: { color: '#D97706' },
  badgeTextClosed: { color: '#059669' },
  cardBody: { gap: 6 },
  infoRow: { flexDirection: 'row' },
  infoLabel: { width: 60, fontSize: 13, color: C.textSub },
  infoValue: { flex: 1, fontSize: 13, color: C.text, fontWeight: '500' },
});
