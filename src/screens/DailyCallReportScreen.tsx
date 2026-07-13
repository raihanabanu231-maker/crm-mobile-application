import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView, View, Text, TextInput,
  TouchableOpacity, ActivityIndicator, StyleSheet,
  Modal, Alert, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polyline, Path, Circle, Rect, Line } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import apiClient from '../api/apiClient';

const C = {
  primary: '#E85874', blue: '#39A3DD', bg: '#F9FAFB', white: '#FFFFFF',
  text: '#1E293B', textSub: '#64748B', border: '#E2E8F0',
  red: '#EF4444', green: '#10B981', slate50: '#F8FAFC', slate100: '#F1F5F9',
  orange: '#F59E0B'
};

const PICKUP_NATURES = ['Material collection', 'Self pickup', 'Rental pickup'];
const DELIVERY_NATURES = ['Material Delivery'];
const HARDWARE_NATURES = ['Service', 'Installation', 'Hardware Enquiry'];
const SOFTWARE_NATURES = ['Software Enquiry'];
const RESOLUTION_NATURES = ['Select', 'Service', 'Installation', 'Cold call visit', 'Meeting ', 'Demo', 'Others', 'Hardware Enquiry'];

const today = () => new Date().toISOString().split('T')[0];

const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <Text style={s.label}>{text}{required ? <Text style={{ color: C.red }}> *</Text> : null}</Text>
);

const Field = ({ children }: { children: React.ReactNode }) => (
  <View style={s.fieldWrap}>{children}</View>
);

interface Opt { label: string; value: string }
const SelectField = ({ label, value, options, onSelect, required }: {
  label: string; value: string; options: Opt[];
  onSelect: (v: string) => void; required?: boolean;
}) => {
  const [vis, setVis] = useState(false);
  const display = options.find(o => o.value === value)?.label || value;
  return (
    <Field>
      <Label text={label} required={required} />
      <TouchableOpacity style={s.input} onPress={() => setVis(true)}>
        <Text style={{ color: value ? C.text : C.textSub, fontSize: 14 }}>{display || `Select ${label}`}</Text>
      </TouchableOpacity>
      <Modal visible={vis} transparent animationType="slide">
        <TouchableOpacity style={s.overlay} onPress={() => setVis(false)}>
          <View style={s.sheet}>
            <Text style={s.sheetTitle}>{label}</Text>
            <ScrollView>
              {options.map(opt => (
                <TouchableOpacity key={opt.value} style={s.sheetRow}
                  onPress={() => { onSelect(opt.value); setVis(false); }}>
                  <Text style={[s.sheetRowText, opt.value === value && { color: C.primary, fontWeight: '700' }]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </Field>
  );
};

const TextRow = ({ label, value, onChange, placeholder, required, keyboardType, multiline }: any) => (
  <Field>
    <Label text={label} required={required} />
    <TextInput
      style={[s.input, multiline && { height: 72, textAlignVertical: 'top', paddingTop: 10 }]}
      value={value} onChangeText={onChange}
      placeholder={placeholder || ''} placeholderTextColor={C.textSub}
      keyboardType={keyboardType || 'default'} multiline={multiline}
    />
  </Field>
);

const TimePickerField = ({ label, value, onChange, required }: any) => {
  const [show, setShow] = useState(false);
  const [pickerDate, setPickerDate] = useState<Date>(() => {
    if (value) {
      const [h, m] = value.split(':').map(Number);
      const d = new Date(); d.setHours(h || 0, m || 0, 0, 0); return d;
    }
    return new Date();
  });

  const handleChange = (_: any, selected?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (selected) {
      setPickerDate(selected);
      const h = selected.getHours().toString().padStart(2, '0');
      const m = selected.getMinutes().toString().padStart(2, '0');
      onChange(`${h}:${m}`);
    }
  };

  const displayTime = () => {
    if (!value) return 'Tap to set time';
    const [h, m] = value.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <Field>
      <Label text={label} required={required} />
      <TouchableOpacity style={[s.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]} onPress={() => setShow(true)} activeOpacity={0.7}>
        <Text style={{ fontSize: 14, color: value ? C.text : C.textSub, flex: 1 }}>{displayTime()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker value={pickerDate} mode="time" is24Hour={false} display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={handleChange} />
      )}
    </Field>
  );
};

const DatePickerField = ({ label, value, onChange, required }: any) => {
  const [show, setShow] = useState(false);
  const toDate = (s: string) => { const d = s ? new Date(s) : new Date(); return isNaN(d.getTime()) ? new Date() : d; };
  const [pickerDate, setPickerDate] = useState<Date>(() => toDate(value));

  const handleChange = (_: any, selected?: Date) => {
    if (Platform.OS === 'android') setShow(false);
    if (selected) {
      setPickerDate(selected);
      const y = selected.getFullYear();
      const m = (selected.getMonth() + 1).toString().padStart(2, '0');
      const d = selected.getDate().toString().padStart(2, '0');
      onChange(`${y}-${m}-${d}`);
    }
  };

  const displayDate = () => {
    if (!value) return 'Tap to pick date';
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <Field>
      <Label text={label} required={required} />
      <TouchableOpacity style={[s.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]} onPress={() => setShow(true)} activeOpacity={0.7}>
        <Text style={{ fontSize: 14, color: value ? C.text : C.textSub, flex: 1 }}>{displayDate()}</Text>
      </TouchableOpacity>
      {show && Platform.OS === 'android' && (
        <DateTimePicker value={pickerDate} mode="date" display="calendar" onChange={handleChange} />
      )}
    </Field>
  );
};

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={s.card}>
    <Text style={s.sectionTitle}>{title}</Text>
    {children}
  </View>
);

interface Props { onBack: () => void; reportId?: string }

export const DailyCallReportScreen: React.FC<Props> = ({ onBack, reportId }) => {
  const isEditing = Boolean(reportId);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [followUps, setFollowUps] = useState<any[]>([]);

  // Files state
  const [softwareDocFile, setSoftwareDocFile] = useState<any>(null);
  const [softwareImageFile, setSoftwareImageFile] = useState<any>(null);
  const [deliveryCopyFile, setDeliveryCopyFile] = useState<any>(null);

  // Customer search
  const [custInput, setCustInput] = useState('');
  const [custResults, setCustResults] = useState<any[]>([]);
  const [searchingCust, setSearchingCust] = useState(false);
  const searchTimer = useRef<any>(null);

  const [form, setForm] = useState({
    date: today(), workNature: 'Select', directOnline: 'Direct', customerType: 'New',
    customer: '', customerEmail: '', customerMobile: '', customerDesignation: '',
    taskDescription: '', product: '', serialNumber: '', brand: '', specification: '',
    inTime: '', outTime: '', problemStatement: '', status: '', closedPending: 'Pending',
    docNumber: '', docDate: '', applicationName: '', vehicleNumber: '', location: '', km: '', amount: '',
    taskAssignedTo: '', taskAssignedToId: '', personAligned: '', remarks: '', reportPath: '', oem: '',
    followUpDate: '', reminder: '', otherWorkNature: '', priority: 'Medium',
  });

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const wn = form.workNature;
  const isPickup = PICKUP_NATURES.includes(wn);
  const isDelivery = DELIVERY_NATURES.includes(wn);
  const isHardware = HARDWARE_NATURES.includes(wn);
  const isSoftware = SOFTWARE_NATURES.includes(wn);
  const showRes = RESOLUTION_NATURES.includes(wn);

  // Follow Up Modal
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpStatus, setFollowUpStatus] = useState('');
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [followUpRemarks, setFollowUpRemarks] = useState('');
  const [followUpAssignedTo, setFollowUpAssignedTo] = useState('');
  const [followUpNextDate, setFollowUpNextDate] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showFUDp, setShowFUDp] = useState(false);

  useEffect(() => {
    loadUsers();
    if (isEditing) {
      loadReport();
      loadFollowUps();
    }
  }, [reportId]);

  const loadUsers = async () => {
    try {
      const res = await apiClient('/auth/users', { method: 'GET' });
      setUsers(res.data?.data || res.data || []);
    } catch { /* silent */ }
  };

  const loadFollowUps = async () => {
    try {
      const res = await apiClient(`/followups/daily-call-report/${reportId}`);
      setFollowUps(res.data?.data || res.data || []);
    } catch { /* silent */ }
  };

  const loadReport = async () => {
    try {
      const res = await apiClient('/daily-call-reports', { method: 'GET' });
      const report = (res.data?.data || res.data || []).find((r: any) => r._id === reportId);
      if (report) {
        setForm({
          date: report.date?.split('T')[0] || today(),
          workNature: report.workNature || 'Select', directOnline: report.directOnline || 'Direct',
          customerType: report.customerType || 'New', customer: report.customer || '',
          customerEmail: report.customerEmail || '', customerMobile: report.customerMobile || '',
          customerDesignation: report.customerDesignation || '', taskDescription: report.taskDescription || '',
          product: report.product || '', serialNumber: report.serialNumber || '',
          brand: report.brand || '', specification: report.specification || '',
          inTime: report.inTime || '', outTime: report.outTime || '',
          problemStatement: report.problemStatement || '', status: report.status || '',
          closedPending: report.closedPending || 'Pending', docNumber: report.docNumber || '',
          docDate: report.docDate?.split('T')[0] || '', applicationName: report.applicationName || '',
          vehicleNumber: report.vehicleNumber || '', location: report.location || '',
          km: report.km || '', amount: report.amount || '',
          taskAssignedTo: report.taskAssignedTo || '', taskAssignedToId: report.taskAssignedToId || '',
          personAligned: report.personAligned || '', remarks: report.remarks || '',
          reportPath: report.reportPath || '', oem: report.oem || '',
          followUpDate: report.followUpDate?.split('T')[0] || '', reminder: report.reminder || '',
          otherWorkNature: report.otherWorkNature || '', priority: report.priority || 'Medium',
        });
        if (report.customerType === 'Existing') setCustInput(report.customerEmail || '');
      } else {
        Alert.alert('Error', 'Report not found');
        onBack();
      }
    } catch (err: any) {
      Alert.alert('Error', 'Failed to load report');
    }
    setLoading(false);
  };

  const handleCustSearch = (val: string) => {
    setCustInput(val); set('customerEmail', val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (val.length < 2) { setCustResults([]); return; }
    searchTimer.current = setTimeout(async () => {
      setSearchingCust(true);
      try {
        const res = await apiClient(`/customers?search=${encodeURIComponent(val)}&limit=8`, { method: 'GET' });
        setCustResults(res.data?.data || res.data || []);
      } catch { setCustResults([]); }
      setSearchingCust(false);
    }, 400);
  };

  const selectCustomer = (c: any) => {
    setForm(prev => ({
      ...prev, customer: c.displayName || `${c.firstName} ${c.lastName}`.trim(),
      customerEmail: c.email || '', customerMobile: c.mobile || c.phone || '',
      customerDesignation: c.designation || '',
    }));
    setCustInput(c.email || ''); setCustResults([]);
  };

  const clearCustomer = () => {
    setForm(prev => ({ ...prev, customer: '', customerEmail: '', customerMobile: '', customerDesignation: '' }));
    setCustInput(''); setCustResults([]);
  };

  // Upload Handlers
  const pickDocument = async (setter: any) => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      if (!res.canceled && res.assets && res.assets.length > 0) {
        setter(res.assets[0]);
      }
    } catch (err) { Alert.alert('Error', 'Failed to pick document'); }
  };
  const pickImage = async (setter: any) => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
      if (!res.canceled && res.assets && res.assets.length > 0) {
        setter(res.assets[0]);
      }
    } catch (err) { Alert.alert('Error', 'Failed to pick image'); }
  };

  const handleSubmit = async () => {
    if (form.workNature === 'Select') return Alert.alert('Validation', 'Work nature is required');
    if (!form.customer.trim()) return Alert.alert('Validation', 'Customer name is required');
    setSubmitting(true);
    try {
      const endpoint = isEditing ? `/daily-call-reports/${reportId}` : '/daily-call-reports';
      const method = isEditing ? 'PUT' : 'POST';

      const payload = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') payload.append(key, val as string);
      });

      const appendFile = (field: string, fileObj: any) => {
        if (fileObj) {
          payload.append(field, {
            uri: fileObj.uri,
            type: fileObj.mimeType || 'application/octet-stream',
            name: fileObj.name || fileObj.fileName || `upload_${Date.now()}`
          } as any);
        }
      };

      if (deliveryCopyFile) appendFile('deliveryCopyFile', deliveryCopyFile);
      if (softwareDocFile) appendFile('softwareDocFile', softwareDocFile);
      if (softwareImageFile) appendFile('softwareImageFile', softwareImageFile);

      await apiClient(endpoint, { method, body: payload });
      Alert.alert('Success', `Report ${isEditing ? 'updated' : 'created'} successfully`);
      onBack();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Error saving report');
    }
    setSubmitting(false);
  };

  const handleUpdateStatus = async () => {
    if (!followUpStatus || !followUpNotes) return Alert.alert('Validation', 'Status and Customer Remarks are required');
    setUpdatingStatus(true);
    try {
      const payload = new FormData();
      payload.append('closedPending', followUpStatus);
      payload.append('status', followUpStatus);
      if (followUpAssignedTo) {
        payload.append('taskAssignedToId', followUpAssignedTo);
        const u = users.find(x => (x._id || x.id) === followUpAssignedTo);
        if (u) {
          const name = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name || '';
          payload.append('taskAssignedTo', name);
          payload.append('personAligned', name);
        }
      }

      await apiClient(`/daily-call-reports/${reportId}`, { method: 'PUT', body: payload });
      
      if (followUpNextDate || followUpNotes || followUpRemarks) {
        await apiClient('/followups', {
          method: 'POST',
          body: JSON.stringify({
            dailyCallReport: reportId,
            notes: followUpNotes || 'Status updated',
            remarks: followUpRemarks || '',
            nextFollowUpDate: followUpNextDate || undefined,
            followUpType: 'General'
          })
        });
      }

      Alert.alert('Success', 'Status updated successfully');
      setShowFollowUpModal(false);
      setFollowUpStatus(''); setFollowUpNotes(''); setFollowUpRemarks('');
      setFollowUpAssignedTo(''); setFollowUpNextDate('');
      loadReport(); loadFollowUps();
    } catch (err) {
      Alert.alert('Error', 'Failed to update status');
    }
    setUpdatingStatus(false);
  };

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bg }}><ActivityIndicator size="large" color={C.primary} /></View>
  );

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Polyline points="15 18 9 12 15 6" /></Svg>
        </TouchableOpacity>
        <View><Text style={s.headerTitle}>Daily Call Report</Text><Text style={s.headerSub}>Capture call details and track resolutions</Text></View>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        {/* ── SECTION 1: Call Details ── */}
        <Card title="Call Details">
          <DatePickerField label="Date" value={form.date} onChange={(v: string) => set('date', v)} required />
          <SelectField label="Work Nature" value={form.workNature} required
            options={[
              { label: 'Select', value: 'Select' }, { label: 'Service', value: 'Service' },
              { label: 'Installation', value: 'Installation' }, { label: 'Software Enquiry', value: 'Software Enquiry' },
              { label: 'Hardware Enquiry', value: 'Hardware Enquiry' }, { label: 'Material Delivery', value: 'Material Delivery' },
              { label: 'Material Collection', value: 'Material collection' }, { label: 'Self Pickup', value: 'Self pickup' },
              { label: 'Rental Pickup', value: 'Rental pickup' }, { label: 'Demo', value: 'Demo' },
              { label: 'Cold Call Visit', value: 'Cold call visit' }, { label: 'Meeting', value: 'Meeting ' },
              { label: 'Others', value: 'Others' }
            ]}
            onSelect={v => set('workNature', v)} />
          {form.workNature === 'Others' && (
            <TextRow label="Specify Work Nature" value={form.otherWorkNature} onChange={(v: string) => set('otherWorkNature', v)} required />
          )}
          <SelectField label="Mode" value={form.directOnline} options={[{ label: 'Direct', value: 'Direct' }, { label: 'Online', value: 'Online' }]} onSelect={v => set('directOnline', v)} required />
          <SelectField label="Customer Type" value={form.customerType} options={[{ label: 'New Customer', value: 'New' }, { label: 'Existing Customer', value: 'Existing' }]} onSelect={v => { set('customerType', v); clearCustomer(); }} />
          <SelectField label="Task assigned to" value={form.taskAssignedToId}
            options={[{ label: '— Select Person —', value: '' }, ...users.map(u => ({
              label: `${u.firstName} ${u.lastName}`.trim() + (u.designation ? ` (${u.designation})` : ''),
              value: u._id || u.id
            }))]}
            onSelect={v => {
              const u = users.find(x => (x._id || x.id) === v);
              setForm(prev => ({ ...prev, taskAssignedToId: v, taskAssignedTo: u ? `${u.firstName} ${u.lastName}`.trim() : '' }));
            }} />
          <SelectField label="Priority" value={form.priority} options={[{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }, { label: 'Urgent', value: 'Urgent' }]} onSelect={v => set('priority', v)} />
        </Card>

        {/* ── SECTION 2: Customer Details ── */}
        <Card title="Customer Details">
          {form.customerType === 'Existing' ? (
            <View>
              <Field>
                <Label text="Search by Email" required />
                <View style={{ position: 'relative' }}>
                  <TextInput style={s.input} value={custInput} onChangeText={handleCustSearch} placeholder="Type customer email..." placeholderTextColor={C.textSub} autoCapitalize="none" keyboardType="email-address" />
                  {searchingCust && <ActivityIndicator size="small" color={C.blue} style={{ position: 'absolute', right: 12, top: 12 }} />}
                </View>
                {custResults.length > 0 && (
                  <View style={s.dropdown}>
                    {custResults.map((c: any) => (
                      <TouchableOpacity key={c._id} style={s.dropRow} onPress={() => selectCustomer(c)}>
                        <Text style={s.dropName}>{c.displayName || `${c.firstName} ${c.lastName}`.trim()}</Text>
                        <Text style={s.dropSub}>{c.email} · {c.mobile || c.phone}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </Field>
              {form.customer ? (
                <View style={s.custInfoBox}>
                  <View style={s.custNameRow}>
                    <Text style={s.custNameLabel}>Customer</Text>
                    <Text style={s.custNameValue}>{form.customer}</Text>
                    <TouchableOpacity onPress={clearCustomer} style={s.clearBtn}><Text style={{ color: C.primary, fontSize: 12, fontWeight: '700' }}>Clear</Text></TouchableOpacity>
                  </View>
                  <TextRow label="Mobile Number" value={form.customerMobile} onChange={(v: string) => set('customerMobile', v)} keyboardType="phone-pad" />
                  <TextRow label="Designation" value={form.customerDesignation} onChange={(v: string) => set('customerDesignation', v)} />
                </View>
              ) : null}
            </View>
          ) : (
            <View>
              <TextRow label="Customer Name" value={form.customer} onChange={(v: string) => set('customer', v)} required />
              <TextRow label="Email ID" value={form.customerEmail} onChange={(v: string) => set('customerEmail', v)} keyboardType="email-address" />
              <TextRow label="Mobile Number" value={form.customerMobile} onChange={(v: string) => set('customerMobile', v)} keyboardType="phone-pad" />
              <TextRow label="Designation" value={form.customerDesignation} onChange={(v: string) => set('customerDesignation', v)} />
            </View>
          )}
          <TextRow label="Task Description" value={form.taskDescription} onChange={(v: string) => set('taskDescription', v)} multiline />
        </Card>

        {/* ── Hardware Details ── */}
        {isHardware && (
          <Card title={wn === 'Hardware Enquiry' ? 'Hardware Details' : 'Product Details'}>
            <TextRow label="Product / Model" value={form.product} onChange={(v: string) => set('product', v)} />
            <TextRow label="Serial Number" value={form.serialNumber} onChange={(v: string) => set('serialNumber', v)} />
            <TextRow label="Brand" value={form.brand} onChange={(v: string) => set('brand', v)} />
            <TextRow label="Specification" value={form.specification} onChange={(v: string) => set('specification', v)} />
          </Card>
        )}

        {/* ── Software Details ── */}
        {isSoftware && (
          <Card title="Software Details">
            <TextRow label="Application Name" value={form.applicationName} onChange={(v: string) => set('applicationName', v)} />
            <Field>
              <Label text="Document Upload" />
              <TouchableOpacity style={s.uploadBtn} onPress={() => pickDocument(setSoftwareDocFile)}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><Polyline points="17 8 12 3 7 8" /><Line x1="12" y1="3" x2="12" y2="15" /></Svg>
                <Text style={s.uploadBtnText} numberOfLines={1}>{softwareDocFile ? softwareDocFile.name : 'Upload document (PDF, DOC)...'}</Text>
              </TouchableOpacity>
            </Field>
            <Field>
              <Label text="Image Upload" />
              <TouchableOpacity style={s.uploadBtn} onPress={() => pickImage(setSoftwareImageFile)}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><Circle cx="8.5" cy="8.5" r="1.5" /><Polyline points="21 15 16 10 5 21" /></Svg>
                <Text style={s.uploadBtnText} numberOfLines={1}>{softwareImageFile ? softwareImageFile.fileName || softwareImageFile.name || 'Image Selected' : 'Upload image...'}</Text>
              </TouchableOpacity>
            </Field>
          </Card>
        )}

        {/* ── Delivery Details ── */}
        {isDelivery && (
          <Card title="Delivery Details">
            <TextRow label="Doc Number" value={form.docNumber} onChange={(v: string) => set('docNumber', v)} />
            <DatePickerField label="Doc Date" value={form.docDate} onChange={(v: string) => set('docDate', v)} />
            <TimePickerField label="In Time" value={form.inTime} onChange={(v: string) => set('inTime', v)} />
            <TimePickerField label="Out Time" value={form.outTime} onChange={(v: string) => set('outTime', v)} />
            <Field>
              <Label text="Delivery Copy Attachment" />
              <TouchableOpacity style={s.uploadBtn} onPress={() => pickDocument(setDeliveryCopyFile)}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><Polyline points="17 8 12 3 7 8" /><Line x1="12" y1="3" x2="12" y2="15" /></Svg>
                <Text style={s.uploadBtnText} numberOfLines={1}>{deliveryCopyFile ? deliveryCopyFile.name : 'Upload delivery copy...'}</Text>
              </TouchableOpacity>
            </Field>
          </Card>
        )}

        {/* ── Logistics / Pickup ── */}
        {isPickup && (
          <Card title="Logistics Details">
            <TextRow label="Vehicle Number" value={form.vehicleNumber} onChange={(v: string) => set('vehicleNumber', v)} />
            <TextRow label="Location" value={form.location} onChange={(v: string) => set('location', v)} />
            <TextRow label="Distance (KM)" value={form.km} onChange={(v: string) => set('km', v)} keyboardType="numeric" />
            <TextRow label="Amount (₹)" value={form.amount} onChange={(v: string) => set('amount', v)} keyboardType="numeric" />
            <TimePickerField label="In Time" value={form.inTime} onChange={(v: string) => set('inTime', v)} />
            <TimePickerField label="Out Time" value={form.outTime} onChange={(v: string) => set('outTime', v)} />
          </Card>
        )}

        {/* ── Resolution ── */}
        {showRes && (
          <Card title="Resolution">
            <TextRow label="Problem Statement" value={form.problemStatement} onChange={(v: string) => set('problemStatement', v)} multiline />
            <TextRow label="Current Status" value={form.status} onChange={(v: string) => set('status', v)} />
            <SelectField label="Outcome" value={form.closedPending} required
              options={[{ label: 'Closed', value: 'Closed' }, { label: 'Pending', value: 'Pending' }, { label: 'In progress', value: 'In progress' }]}
              onSelect={v => set('closedPending', v)} />
            {isHardware && (
              <>
                <TimePickerField label="In Time" value={form.inTime} onChange={(v: string) => set('inTime', v)} />
                <TimePickerField label="Out Time" value={form.outTime} onChange={(v: string) => set('outTime', v)} />
              </>
            )}
          </Card>
        )}

        {/* ── Tracking & Additional Info ── */}
        <Card title="Tracking & Additional Info">
          <SelectField label="OEM" value={form.oem}
            options={[{ label: '— Select OEM —', value: '' }, { label: 'ATPL', value: 'ATPL' }, { label: 'Infyiot', value: 'Infyiot' }, { label: 'Embsys', value: 'Embsys' }, { label: 'Honeywell', value: 'Honeywell' }, { label: 'TSC', value: 'TSC' }, { label: 'Zebra', value: 'Zebra' }]}
            onSelect={v => set('oem', v)} />
          <DatePickerField label="Follow-up Date" value={form.followUpDate} onChange={(v: string) => set('followUpDate', v)} />
          <TextRow label="Reminder Notes" value={form.reminder} onChange={(v: string) => set('reminder', v)} />
          <TextRow label="Remarks" value={form.remarks} onChange={(v: string) => set('remarks', v)} />
          <TextRow label="Report Path / Link" value={form.reportPath} onChange={(v: string) => set('reportPath', v)} />
        </Card>

        {isEditing && (
          <Card title="Follow-up History">
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12 }}>
              <TouchableOpacity onPress={() => setShowFollowUpModal(true)} style={s.addUpdateBtn}>
                <Text style={s.addUpdateBtnText}>+ Add Update</Text>
              </TouchableOpacity>
            </View>
            {followUps.length === 0 ? (
              <View style={s.emptyFU}><Text style={s.emptyFUText}>No follow-ups recorded yet</Text></View>
            ) : (
              followUps.map(fu => (
                <View key={fu._id} style={s.fuCard}>
                   <View style={s.fuHeader}>
                     <View style={s.fuTypeBadge}><Text style={s.fuTypeText}>{fu.followUpType || 'General'}</Text></View>
                     <Text style={s.fuDate}>{new Date(fu.followUpDate).toLocaleDateString()}</Text>
                   </View>
                   <Text style={s.fuNotes}>{fu.notes}</Text>
                   {fu.remarks && <Text style={s.fuRemarks}>Internal: {fu.remarks}</Text>}
                   {fu.nextFollowUpDate && (
                     <Text style={s.fuNextDate}>Next: {new Date(fu.nextFollowUpDate).toLocaleDateString()}</Text>
                   )}
                </View>
              ))
            )}
          </Card>
        )}

        {/* ── Actions ── */}
        <View style={s.actions}>
          <TouchableOpacity style={s.cancelBtn} onPress={onBack}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
          <TouchableOpacity style={s.submitBtn} onPress={handleSubmit} disabled={submitting}>
            {submitting ? <ActivityIndicator color={C.white} /> : <Text style={s.submitText}>{isEditing ? 'Update Report' : 'Submit Report'}</Text>}
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* STATUS UPDATE MODAL FOR FOLLOW UPS */}
      <Modal visible={showFollowUpModal} transparent animationType="fade">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
             <View style={s.modalHeader}>
                <Text style={s.modalTitle}>Update Status</Text>
                <TouchableOpacity onPress={() => setShowFollowUpModal(false)} style={s.closeBtn}>
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textSub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="18" y1="6" x2="6" y2="18" /><Line x1="6" y1="6" x2="18" y2="18" /></Svg>
                </TouchableOpacity>
             </View>
             <ScrollView style={s.modalBody}>
                <Text style={s.modalLabel}>Status *</Text>
                <View style={s.statusChips}>
                  {['Pending', 'Ongoing', 'Closed', 'Completed', 'Cancelled'].map(st => (
                    <TouchableOpacity key={st} onPress={() => setFollowUpStatus(st)} style={[s.statusChip, followUpStatus === st && s.statusChipActive]}>
                      <Text style={[s.statusChipText, followUpStatus === st && s.statusChipTextActive]}>{st}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={s.modalLabel}>Customer Remarks *</Text>
                <TextInput style={[s.modalInput, { height: 64, textAlignVertical: 'top' }]} multiline placeholder="What was discussed..." value={followUpNotes} onChangeText={setFollowUpNotes} />
                <Text style={s.modalLabel}>Internal Remarks</Text>
                <TextInput style={[s.modalInput, { height: 64, textAlignVertical: 'top' }]} multiline placeholder="Internal notes (not shared)..." value={followUpRemarks} onChangeText={setFollowUpRemarks} />
                <Text style={s.modalLabel}>Reassign Task To</Text>
                <SelectField label="Reassign Task" value={followUpAssignedTo}
                  options={[{ label: 'Keep current assignment', value: '' }, ...users.map(u => ({ label: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.name, value: u._id || u.id }))]}
                  onSelect={setFollowUpAssignedTo} />
                <Text style={s.modalLabel}>Next Follow-up</Text>
                <TouchableOpacity style={s.modalInput} onPress={() => setShowFUDp(true)}>
                  <Text style={{ color: followUpNextDate ? C.text : C.textSub }}>{followUpNextDate ? new Date(followUpNextDate).toLocaleDateString() : 'Select Date'}</Text>
                </TouchableOpacity>
                {showFUDp && (
                  <DateTimePicker value={followUpNextDate ? new Date(followUpNextDate) : new Date()} mode="date" display="default"
                    onChange={(_: any, date?: Date) => {
                      if (Platform.OS === 'android') setShowFUDp(false);
                      if (date) setFollowUpNextDate(date.toISOString().split('T')[0]);
                    }}
                  />
                )}
             </ScrollView>
             <View style={s.modalFooter}>
               <TouchableOpacity onPress={() => setShowFollowUpModal(false)} style={s.modalBtnCancel}><Text style={s.modalBtnCancelText}>Cancel</Text></TouchableOpacity>
               <TouchableOpacity onPress={handleUpdateStatus} disabled={updatingStatus} style={[s.modalBtnSubmit, { backgroundColor: C.primary }]}>
                 <Text style={s.modalBtnSubmitText}>{updatingStatus ? 'Updating...' : 'Update & Save'}</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border },
  backBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: C.text },
  headerSub: { fontSize: 12, color: C.textSub, marginTop: 2 },
  scroll: { padding: 16 },
  card: { backgroundColor: C.white, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: C.border },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: C.primary, marginBottom: 12 },
  fieldWrap: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: C.textSub, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: C.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: Platform.OS === 'ios' ? 11 : 9, fontSize: 14, color: C.text, backgroundColor: C.white },
  uploadBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: C.border, borderStyle: 'dashed', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: C.slate50 },
  uploadBtnText: { fontSize: 14, color: C.textSub, flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: C.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%', paddingBottom: 24 },
  sheetTitle: { fontSize: 15, fontWeight: '700', color: C.text, paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  sheetRow: { paddingVertical: 14, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: C.border },
  sheetRowText: { fontSize: 15, color: C.text },
  dropdown: { marginTop: 4, borderWidth: 1, borderColor: C.border, borderRadius: 10, backgroundColor: C.white, overflow: 'hidden' },
  dropRow: { paddingVertical: 10, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  dropName: { fontSize: 14, fontWeight: '600', color: C.text },
  dropSub: { fontSize: 12, color: C.textSub, marginTop: 2 },
  custInfoBox: { marginTop: 12, backgroundColor: C.slate50, borderRadius: 10, borderWidth: 1, borderColor: C.border, padding: 12 },
  custNameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  custNameLabel: { fontSize: 13, color: C.textSub, fontWeight: '600', marginRight: 8 },
  custNameValue: { flex: 1, fontSize: 14, fontWeight: '700', color: C.text },
  clearBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: C.primary },
  
  // Follow ups
  addUpdateBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: C.slate100, borderRadius: 8, borderWidth: 1, borderColor: C.border },
  addUpdateBtnText: { fontSize: 13, fontWeight: '700', color: C.text },
  emptyFU: { padding: 20, alignItems: 'center', borderWidth: 1, borderColor: C.border, borderStyle: 'dashed', borderRadius: 8 },
  emptyFUText: { fontSize: 14, color: C.textSub },
  fuCard: { backgroundColor: C.slate50, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: C.border, marginBottom: 10 },
  fuHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  fuTypeBadge: { backgroundColor: C.white, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: C.border },
  fuTypeText: { fontSize: 11, fontWeight: '700', color: C.textSub },
  fuDate: { fontSize: 11, fontWeight: '700', color: C.textSub },
  fuNotes: { fontSize: 14, color: C.text, fontWeight: '500' },
  fuRemarks: { fontSize: 12, color: C.textSub, marginTop: 6, backgroundColor: C.white, padding: 6, borderRadius: 4, borderWidth: 1, borderColor: C.border },
  fuNextDate: { fontSize: 11, fontWeight: '700', color: C.blue, marginTop: 8, backgroundColor: `${C.blue}18`, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },

  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 4 },
  cancelBtn: { paddingVertical: 11, paddingHorizontal: 24, borderRadius: 8, backgroundColor: C.slate50, borderWidth: 1, borderColor: C.border },
  cancelText: { fontSize: 14, fontWeight: '700', color: C.textSub },
  submitBtn: { paddingVertical: 11, paddingHorizontal: 28, borderRadius: 8, backgroundColor: C.primary, minWidth: 130, alignItems: 'center' },
  submitText: { fontSize: 14, fontWeight: '700', color: C.white },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: C.white, borderRadius: 16, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  modalTitle: { fontSize: 16, fontWeight: '700', color: C.text },
  closeBtn: { padding: 4 },
  modalBody: { padding: 16 },
  modalLabel: { fontSize: 13, fontWeight: '600', color: C.textSub, marginBottom: 8 },
  statusChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  statusChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border },
  statusChipActive: { borderColor: C.blue, backgroundColor: C.slate50 },
  statusChipText: { fontSize: 13, color: C.textSub },
  statusChipTextActive: { color: C.blue, fontWeight: '600' },
  modalInput: { borderWidth: 1, borderColor: C.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: C.text, backgroundColor: C.bg, marginBottom: 16 },
  modalFooter: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: C.border, gap: 12 },
  modalBtnCancel: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: C.bg, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  modalBtnCancelText: { fontSize: 14, fontWeight: '600', color: C.textSub },
  modalBtnSubmit: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: C.primary, alignItems: 'center' },
  modalBtnSubmitText: { fontSize: 14, fontWeight: '600', color: C.white },
});
