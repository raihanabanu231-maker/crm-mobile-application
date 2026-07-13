import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  ActivityIndicator, StyleSheet, FlatList, Alert, Modal, ScrollView, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline, Path, Circle, Rect, Line } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '../api/apiClient';
import { authApi } from '../api/authApi';

const C = {
  primary: '#E85874', blue: '#39A3DD', bg: '#F9FAFB', white: '#FFFFFF',
  text: '#1E293B', textSub: '#64748B', border: '#E2E8F0', green: '#10B981',
  red: '#EF4444', slate50: '#F8FAFC', orange: '#F59E0B'
};

interface Props {
  onBack: () => void;
  onAddCall: () => void;
  onEditCall: (id: string) => void;
}

export const CallHistoryScreen: React.FC<Props> = ({ onBack, onAddCall, onEditCall }) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [currentTab, setCurrentTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Reassign Modal
  const [reassignOpen, setReassignOpen] = useState(false);
  const [reassignReportId, setReassignReportId] = useState<string | null>(null);
  const [reassignUserId, setReassignUserId] = useState('');
  const [reassigning, setReassigning] = useState(false);

  // Status Update Modal
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusReportId, setStatusReportId] = useState<string | null>(null);
  const [statusValue, setStatusValue] = useState('');
  const [statusFollowUpDate, setStatusFollowUpDate] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [statusAssignedToId, setStatusAssignedToId] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resReports, resUsers, resMe] = await Promise.all([
        apiClient('/daily-call-reports', { method: 'GET' }),
        authApi.getUsers().catch(() => ({ data: [] })),
        authApi.getMe().catch(() => ({ data: null }))
      ]);

      const data = resReports.data?.data || resReports.data || [];
      data.sort((a: any, b: any) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime());
      setReports(data);

      setUsers(resUsers.data?.data || resUsers.data || resUsers || []);
      setCurrentUser(resMe.data || resMe);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load call history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Report', 'Are you sure you want to delete this report?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          try {
            await apiClient(`/daily-call-reports/${id}`, { method: 'DELETE' });
            Alert.alert('Success', 'Report deleted successfully');
            loadData();
          } catch (err) {
            Alert.alert('Error', 'Failed to delete report');
          }
        }
      }
    ]);
  };

  const handleReassign = async () => {
    if (!reassignUserId) {
      Alert.alert('Error', 'Please select a user');
      return;
    }
    setReassigning(true);
    try {
      const selectedUser = users.find(u => (u._id || u.id) === reassignUserId);
      const name = selectedUser ? `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim() : '';

      const payload = new FormData();
      payload.append('taskAssignedToId', reassignUserId);
      payload.append('taskAssignedTo', name);
      payload.append('personAligned', name);

      await apiClient(`/daily-call-reports/${reassignReportId}`, { method: 'PUT', body: payload });
      Alert.alert('Success', 'Task reassigned successfully');
      setReassignOpen(false);
      setReassignUserId('');
      loadData();
    } catch (err) {
      Alert.alert('Error', 'Failed to reassign task');
    }
    setReassigning(false);
  };

  const handleUpdateStatus = async () => {
    if (!statusValue) {
      Alert.alert('Error', 'Please select a status');
      return;
    }
    if (!statusNotes) {
      Alert.alert('Error', 'Customer remarks are required');
      return;
    }
    setUpdatingStatus(true);
    try {
      const payload = new FormData();
      payload.append('closedPending', statusValue);
      payload.append('status', statusValue);
      if (statusFollowUpDate) payload.append('followUpDate', statusFollowUpDate);
      if (statusRemarks) payload.append('remarks', statusRemarks);
      if (statusAssignedToId) {
        payload.append('taskAssignedToId', statusAssignedToId);
        const selectedUser = users.find(u => (u._id || u.id) === statusAssignedToId);
        if (selectedUser) {
          const name = `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim() || selectedUser.name || '';
          payload.append('taskAssignedTo', name);
          payload.append('personAligned', name);
        }
      }

      await apiClient(`/daily-call-reports/${statusReportId}`, { method: 'PUT', body: payload });

      if (statusFollowUpDate || statusRemarks || statusNotes) {
        await apiClient('/followups', {
          method: 'POST',
          body: JSON.stringify({
            dailyCallReport: statusReportId,
            notes: statusNotes || 'Status updated',
            remarks: statusRemarks || '',
            nextFollowUpDate: statusFollowUpDate || undefined,
            followUpType: 'General'
          })
        });
      }

      Alert.alert('Success', 'Status updated successfully');
      setStatusOpen(false);
      setStatusValue('');
      setStatusFollowUpDate('');
      setStatusNotes('');
      setStatusRemarks('');
      setStatusAssignedToId('');
      loadData();
    } catch (err) {
      Alert.alert('Error', 'Failed to update status');
    }
    setUpdatingStatus(false);
  };

  // Filter Reports
  const filteredReports = reports.filter(r => {
    // Search Filter
    const searchMatch = (
      (r.callId && r.callId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.customer && r.customer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.personAligned && r.personAligned.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.taskDescription && r.taskDescription.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    if (!searchMatch) return false;

    // Tab Filter
    const userId = currentUser?._id || currentUser?.id;
    const assignedId = r.taskAssignedToId || (r.taskAssignedTo && users.find(u => `${u.firstName} ${u.lastName}`.trim() === r.taskAssignedTo)?._id);
    const createdId = r.createdBy;

    if (currentTab === 'All') return true;
    if (currentTab === 'My Tasks') return assignedId === userId;
    if (currentTab === 'Assigned by Me') return createdId === userId;
    if (currentTab === 'Overdue') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isOverdue = r.followUpDate && new Date(r.followUpDate).getTime() < today.getTime();
      const notClosed = r.closedPending !== 'Closed' && r.closedPending !== 'Completed' && r.closedPending !== 'closed';
      return isOverdue && notClosed;
    }
    return true;
  });

  const renderItem = ({ item }: { item: any }) => {
    const d = item.date ? new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

    // Priority Colors
    const pColors: any = { Urgent: '#EF4444', High: '#F59E0B', Medium: '#39A3DD', Low: '#10B981' };
    const pColor = pColors[item.priority] || pColors.Medium;

    // Status Colors
    const sColors: any = { Closed: '#10B981', Completed: '#10B981', Pending: '#EF4444', Ongoing: '#F59E0B', Cancelled: '#64748B' };
    const sColor = sColors[item.closedPending || item.status] || sColors.Pending;

    const isOverdue = item.followUpDate && new Date(item.followUpDate).getTime() < new Date().setHours(0, 0, 0, 0) && item.closedPending !== 'Closed';

    return (
      <View style={s.card}>
        <View style={s.cardHeader}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={s.customerName} numberOfLines={1}>{item.customer || 'Unknown Customer'}</Text>
            <Text style={s.callId}>{item.callId || 'No ID'}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 4 }}>
            <View style={[s.badge, { backgroundColor: `${sColor}18` }]}>
              <Text style={[s.badgeText, { color: sColor }]}>{item.closedPending || item.status || 'Pending'}</Text>
            </View>
            {item.priority && (
              <View style={[s.badge, { backgroundColor: `${pColor}18`, paddingHorizontal: 6 }]}>
                <Text style={[s.badgeText, { color: pColor, fontSize: 10 }]}>{item.priority}</Text>
              </View>
            )}
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
          {item.followUpDate && (
            <View style={s.infoRow}>
              <Text style={s.infoLabel}>Follow-up:</Text>
              <Text style={[s.infoValue, isOverdue && { color: C.red, fontWeight: '700' }]}>
                {new Date(item.followUpDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                {isOverdue && ' ⚠️'}
              </Text>
            </View>
          )}
        </View>

        <View style={s.cardFooter}>
          <TouchableOpacity
            style={s.actionBtn}
            onPress={() => {
              setStatusReportId(item._id || item.id);
              setStatusValue(item.closedPending || 'Ongoing');
              setStatusFollowUpDate(item.followUpDate ? item.followUpDate.split('T')[0] : '');
              setStatusNotes(item.taskDescription || item.problemStatement || '');
              setStatusRemarks(item.remarks || '');
              setStatusAssignedToId(item.taskAssignedToId || '');
              setStatusOpen(true);
            }}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M9 11l3 3L22 4" />
              <Path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={s.actionBtn} onPress={() => {
            setReassignReportId(item._id || item.id);
            setReassignUserId(item.taskAssignedToId || '');
            setReassignOpen(true);
          }}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M17 1l4 4-4 4" />
              <Path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <Path d="M7 23l-4-4 4-4" />
              <Path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={s.actionBtn} onPress={() => onEditCall(item._id || item.id)}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M12 20h9" />
              <Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={s.actionBtn} onPress={() => handleDelete(item._id || item.id)}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M3 6h18" />
              <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.header}>
        <View style={s.headerLeft}>
          <TouchableOpacity onPress={onBack} style={s.backBtn}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <Text style={s.addBtnText}>New</Text>
        </TouchableOpacity>
      </View>

      <View style={s.toolbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabsContainer}>
          {['All', 'My Tasks', 'Assigned by Me', 'Overdue'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setCurrentTab(tab)}
              style={[s.tabItem, currentTab === tab && s.tabItemActive]}
            >
              <Text style={[s.tabText, currentTab === tab && s.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={s.searchContainer}>
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textSub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 12 }}>
            <Circle cx="11" cy="11" r="8" />
            <Line x1="21" y1="21" x2="16.65" y2="16.65" />
          </Svg>
          <TextInput
            style={s.searchInput}
            placeholder="Search by customer, description..."
            placeholderTextColor={C.textSub}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={s.content}>
        {loading ? (
          <ActivityIndicator size="large" color={C.blue} style={{ marginTop: 40 }} />
        ) : filteredReports.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyStateText}>No call reports found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredReports}
            keyExtractor={(item, index) => item._id || item.id || index.toString()}
            renderItem={renderItem}
            contentContainerStyle={s.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* REASSIGN MODAL */}
      <Modal visible={reassignOpen} transparent animationType="fade">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>Reassign Task</Text>
              <TouchableOpacity onPress={() => setReassignOpen(false)} style={s.closeBtn}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textSub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="18" y1="6" x2="6" y2="18" /><Line x1="6" y1="6" x2="18" y2="18" /></Svg>
              </TouchableOpacity>
            </View>
            <View style={s.modalBody}>
              <Text style={s.modalLabel}>Assign To</Text>
              <View style={s.pickerContainer}>
                {users.map(u => (
                  <TouchableOpacity
                    key={u._id || u.id}
                    onPress={() => setReassignUserId(u._id || u.id)}
                    style={[s.pickerItem, reassignUserId === (u._id || u.id) && s.pickerItemActive]}
                  >
                    <Text style={[s.pickerItemText, reassignUserId === (u._id || u.id) && s.pickerItemTextActive]}>
                      {`${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={s.modalFooter}>
              <TouchableOpacity onPress={() => setReassignOpen(false)} style={s.modalBtnCancel}>
                <Text style={s.modalBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReassign} disabled={reassigning} style={s.modalBtnSubmit}>
                <Text style={s.modalBtnSubmitText}>{reassigning ? 'Saving...' : 'Reassign'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* STATUS UPDATE MODAL */}
      <Modal visible={statusOpen} transparent animationType="fade">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>Update Status</Text>
              <TouchableOpacity onPress={() => setStatusOpen(false)} style={s.closeBtn}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textSub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="18" y1="6" x2="6" y2="18" /><Line x1="6" y1="6" x2="18" y2="18" /></Svg>
              </TouchableOpacity>
            </View>
            <ScrollView style={s.modalBody}>
              <Text style={s.modalLabel}>Status *</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {['Pending', 'Ongoing', 'Closed', 'Completed', 'Cancelled'].map(st => (
                  <TouchableOpacity
                    key={st} onPress={() => setStatusValue(st)}
                    style={[s.statusChip, statusValue === st && s.statusChipActive]}
                  >
                    <Text style={[s.statusChipText, statusValue === st && s.statusChipTextActive]}>{st}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={s.modalLabel}>Customer Remarks *</Text>
              <TextInput
                style={[s.modalInput, { height: 64, textAlignVertical: 'top' }]}
                multiline placeholder="What was discussed..." placeholderTextColor={C.textSub}
                value={statusNotes} onChangeText={setStatusNotes}
              />

              <Text style={s.modalLabel}>Internal Remarks</Text>
              <TextInput
                style={[s.modalInput, { height: 64, textAlignVertical: 'top' }]}
                multiline placeholder="Internal notes (not shared)..." placeholderTextColor={C.textSub}
                value={statusRemarks} onChangeText={setStatusRemarks}
              />

              <Text style={s.modalLabel}>Next Follow-up</Text>
              <TouchableOpacity style={s.modalInput} onPress={() => setShowDatePicker(true)}>
                <Text style={{ color: statusFollowUpDate ? C.text : C.textSub }}>
                  {statusFollowUpDate ? new Date(statusFollowUpDate).toLocaleDateString() : 'Select Date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={statusFollowUpDate ? new Date(statusFollowUpDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(_: any, date?: Date) => {
                    if (Platform.OS === 'android') setShowDatePicker(false);
                    if (date) setStatusFollowUpDate(date.toISOString().split('T')[0]);
                  }}
                />
              )}
            </ScrollView>
            <View style={s.modalFooter}>
              <TouchableOpacity onPress={() => setStatusOpen(false)} style={s.modalBtnCancel}>
                <Text style={s.modalBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateStatus} disabled={updatingStatus} style={[s.modalBtnSubmit, { backgroundColor: C.blue }]}>
                <Text style={s.modalBtnSubmitText}>{updatingStatus ? 'Updating...' : 'Update Status'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

  toolbar: { backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border },
  tabsContainer: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  tabItem: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: C.bg },
  tabItemActive: { backgroundColor: C.slate50, borderWidth: 1, borderColor: C.blue },
  tabText: { fontSize: 13, fontWeight: '500', color: C.textSub },
  tabTextActive: { color: C.blue, fontWeight: '700' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 12, backgroundColor: C.bg, borderRadius: 8, borderWidth: 1, borderColor: C.border },
  searchInput: { flex: 1, paddingVertical: 8, paddingHorizontal: 12, fontSize: 14, color: C.text },

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
  customerName: { fontSize: 16, fontWeight: '700', color: C.text },
  callId: { fontSize: 12, color: C.textSub, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  cardBody: { gap: 6, marginBottom: 12 },
  infoRow: { flexDirection: 'row' },
  infoLabel: { width: 70, fontSize: 13, color: C.textSub },
  infoValue: { flex: 1, fontSize: 13, color: C.text, fontWeight: '500' },
  cardFooter: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
  actionBtn: { padding: 8, backgroundColor: C.slate50, borderRadius: 8, borderWidth: 1, borderColor: C.border },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: C.white, borderRadius: 16, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  modalTitle: { fontSize: 16, fontWeight: '700', color: C.text },
  closeBtn: { padding: 4 },
  modalBody: { padding: 16 },
  modalLabel: { fontSize: 13, fontWeight: '600', color: C.textSub, marginBottom: 8 },
  pickerContainer: { gap: 8, flexWrap: 'wrap', flexDirection: 'row' },
  pickerItem: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: C.border, backgroundColor: C.bg },
  pickerItemActive: { borderColor: C.blue, backgroundColor: C.slate50 },
  pickerItemText: { fontSize: 14, color: C.text },
  pickerItemTextActive: { color: C.blue, fontWeight: '600' },
  modalInput: { borderWidth: 1, borderColor: C.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: C.text, backgroundColor: C.bg, marginBottom: 16 },
  statusChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border },
  statusChipActive: { borderColor: C.blue, backgroundColor: C.slate50 },
  statusChipText: { fontSize: 13, color: C.textSub },
  statusChipTextActive: { color: C.blue, fontWeight: '600' },
  modalFooter: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: C.border, gap: 12 },
  modalBtnCancel: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: C.bg, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  modalBtnCancelText: { fontSize: 14, fontWeight: '600', color: C.textSub },
  modalBtnSubmit: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: C.primary, alignItems: 'center' },
  modalBtnSubmitText: { fontSize: 14, fontWeight: '600', color: C.white },
});
