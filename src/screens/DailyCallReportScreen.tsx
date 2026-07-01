import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView, ScrollView, View, Text, TextInput,
  TouchableOpacity, ActivityIndicator, StyleSheet,
  Modal, Alert, Platform,
} from 'react-native';
import Svg, { Polyline, Path, Circle, Rect } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '../api/apiClient';

// ─── Colours ───────────────────────────────────────────────────────────────
const C = {
  primary: '#E85874',
  blue: '#39A3DD',
  bg: '#F9FAFB',
  white: '#FFFFFF',
  text: '#1E293B',
  textSub: '#64748B',
  border: '#E2E8F0',
  red: '#EF4444',
  green: '#10B981',
  slate50: '#F8FAFC',
};

// ─── Work nature groups ────────────────────────────────────────────────────
const PICKUP_NATURES = ['Material collection', 'Self pickup', 'Rental pickup'];
const DELIVERY_NATURES = ['Material Delivery'];
const HARDWARE_NATURES = ['Service', 'Installation', 'Hardware Enquiry'];
const SOFTWARE_NATURES = ['Software Enquiry'];
const RESOLUTION_NATURES = ['Service', 'Installation', 'Cold call visit', 'Meeting ', 'Demo', 'Others', 'Hardware Enquiry'];

// ─── Tiny helpers ──────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split('T')[0];

const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <Text style={s.label}>
    {text}{required ? <Text style={{ color: C.red }}> *</Text> : null}
  </Text>
);

const Field = ({ children }: { children: React.ReactNode }) => (
  <View style={s.fieldWrap}>{children}</View>
);

// ─── SelectField (modal picker) ────────────────────────────────────────────
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

// ─── TextRow ───────────────────────────────────────────────────────────────
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

// ─── TimePickerField ───────────────────────────────────────────────────────
const TimePickerField = ({ label, value, onChange, required }: {
  label: string; value: string;
  onChange: (val: string) => void; required?: boolean;
}) => {
  const [show, setShow] = useState(false);
  const [pickerDate, setPickerDate] = useState<Date>(() => {
    if (value) {
      const [h, m] = value.split(':').map(Number);
      const d = new Date();
      d.setHours(h || 0, m || 0, 0, 0);
      return d;
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

  // Format for display: 09:30 AM
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
      <TouchableOpacity
        style={[s.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
        onPress={() => setShow(true)}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 14, color: value ? C.text : C.textSub, flex: 1 }}>
          {displayTime()}
        </Text>
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={value ? C.blue : C.textSub} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="12" r="10" />
          <Path d="M12 6v6l4 2" />
        </Svg>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={pickerDate}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}

      {/* iOS needs a Done button to dismiss */}
      {show && Platform.OS === 'ios' && (
        <Modal transparent animationType="slide" visible={show}>
          <View style={tpStyles.iosOverlay}>
            <View style={tpStyles.iosSheet}>
              <View style={tpStyles.iosHeader}>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={tpStyles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={tpStyles.iosTitle}>{label}</Text>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={tpStyles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={pickerDate}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={handleChange}
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
      )}
    </Field>
  );
};

const tpStyles = StyleSheet.create({
  iosOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  iosSheet: {
    backgroundColor: '#FFF', borderTopLeftRadius: 20,
    borderTopRightRadius: 20, paddingBottom: 32,
  },
  iosHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#E2E8F0',
  },
  iosTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  doneText: { fontSize: 15, fontWeight: '700', color: '#39A3DD' },
  cancelText: { fontSize: 15, color: '#64748B' },
});

// ─── DatePickerField ────────────────────────────────────────────────────
const DatePickerField = ({ label, value, onChange, required }: {
  label: string; value: string;
  onChange: (val: string) => void; required?: boolean;
}) => {
  const [show, setShow] = useState(false);
  const toDate = (s: string) => {
    const d = s ? new Date(s) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
  };
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
      <TouchableOpacity
        style={[s.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
        onPress={() => setShow(true)}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 14, color: value ? C.text : C.textSub, flex: 1 }}>
          {displayDate()}
        </Text>
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke={value ? C.blue : C.textSub} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <Path d="M16 2v4M8 2v4M3 10h18" />
        </Svg>
      </TouchableOpacity>

      {show && Platform.OS === 'android' && (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display="calendar"
          onChange={handleChange}
        />
      )}
      {show && Platform.OS === 'ios' && (
        <Modal transparent animationType="slide" visible={show}>
          <View style={tpStyles.iosOverlay}>
            <View style={tpStyles.iosSheet}>
              <View style={tpStyles.iosHeader}>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={tpStyles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={tpStyles.iosTitle}>{label}</Text>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={tpStyles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={pickerDate}
                mode="date"
                display="spinner"
                onChange={handleChange}
                style={{ height: 200 }}
              />
            </View>
          </View>
        </Modal>
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

// ─── Main Screen ──────────────────────────────────────────────────────────
interface Props { onBack: () => void; reportId?: string }

export const DailyCallReportScreen: React.FC<Props> = ({ onBack, reportId }) => {
  const isEditing = Boolean(reportId);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  // customer search
  const [custInput, setCustInput] = useState('');
  const [custResults, setCustResults] = useState<any[]>([]);
  const [searchingCust, setSearchingCust] = useState(false);
  const searchTimer = useRef<any>(null);

  const [form, setForm] = useState({
    date: today(), workNature: 'Service', directOnline: 'Direct', customerType: 'New',
    customer: '', customerEmail: '', customerMobile: '', customerDesignation: '',
    product: '', serialNumber: '', brand: '', specification: '',
    inTime: '', outTime: '', problemStatement: '', status: '', closedPending: 'Pending',
    docNumber: '', docDate: '', applicationName: '',
    vehicleNumber: '', location: '', km: '', amount: '',
    personAligned: '', remarks: '', reportPath: '', oem: '',
    followUpDate: '', reminder: '', otherWorkNature: '',
  });

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const wn = form.workNature;
  const isPickup = PICKUP_NATURES.includes(wn);
  const isDelivery = DELIVERY_NATURES.includes(wn);
  const isHardware = HARDWARE_NATURES.includes(wn);
  const isSoftware = SOFTWARE_NATURES.includes(wn);
  const showRes = RESOLUTION_NATURES.includes(wn);

  useEffect(() => {
    loadUsers();
    if (isEditing) loadReport();
  }, [reportId]);

  const loadUsers = async () => {
    try {
      const res = await apiClient('/auth/users', { method: 'GET' });
      setUsers(res.data?.data || res.data || []);
    } catch { /* silent */ }
  };

  const loadReport = async () => {
    try {
      const res = await apiClient('/daily-call-reports', { method: 'GET' });
      const report = (res.data?.data || res.data || []).find((r: any) => r._id === reportId);
      if (report) {
        setForm({
          date: report.date?.split('T')[0] || today(),
          workNature: report.workNature || 'Service',
          directOnline: report.directOnline || 'Direct',
          customerType: report.customerType || 'New',
          customer: report.customer || '',
          customerEmail: report.customerEmail || '',
          customerMobile: report.customerMobile || '',
          customerDesignation: report.customerDesignation || '',
          product: report.product || '', serialNumber: report.serialNumber || '',
          brand: report.brand || '', specification: report.specification || '',
          inTime: report.inTime || '', outTime: report.outTime || '',
          problemStatement: report.problemStatement || '', status: report.status || '',
          closedPending: report.closedPending || 'Pending',
          docNumber: report.docNumber || '', docDate: report.docDate?.split('T')[0] || '',
          applicationName: report.applicationName || '',
          vehicleNumber: report.vehicleNumber || '', location: report.location || '',
          km: report.km || '', amount: report.amount || '',
          personAligned: report.personAligned || '', remarks: report.remarks || '',
          reportPath: report.reportPath || '', oem: report.oem || '',
          followUpDate: report.followUpDate?.split('T')[0] || '',
          reminder: report.reminder || '', otherWorkNature: report.otherWorkNature || '',
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

  // customer search debounce
  const handleCustSearch = (val: string) => {
    setCustInput(val);
    set('customerEmail', val);
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
      ...prev,
      customer: c.displayName || `${c.firstName} ${c.lastName}`.trim(),
      customerEmail: c.email || '', customerMobile: c.mobile || c.phone || '',
      customerDesignation: c.designation || '',
    }));
    setCustInput(c.email || '');
    setCustResults([]);
  };

  const clearCustomer = () => {
    setForm(prev => ({ ...prev, customer: '', customerEmail: '', customerMobile: '', customerDesignation: '' }));
    setCustInput(''); setCustResults([]);
  };

  const handleSubmit = async () => {
    if (!form.customer.trim()) { Alert.alert('Validation', 'Customer name is required'); return; }
    setSubmitting(true);
    try {
      const endpoint = isEditing ? `/daily-call-reports/${reportId}` : '/daily-call-reports';
      const method = isEditing ? 'PUT' : 'POST';

      // Build multipart/form-data payload (matches web version)
      const payload = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          payload.append(key, val as string);
        }
      });

      await apiClient(endpoint, { method, body: payload });
      Alert.alert('Success', `Report ${isEditing ? 'updated' : 'created'} successfully`);
      onBack();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Error saving report');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bg }}>
        <ActivityIndicator size="large" color={C.primary} />
      </View>
    );
  }

  const workNatureOpts: Opt[] = [
    { label: 'Service', value: 'Service' },
    { label: 'Installation', value: 'Installation' },
    { label: 'Software Enquiry', value: 'Software Enquiry' },
    { label: 'Cold Call Visit', value: 'Cold call visit' },
    { label: 'Meeting', value: 'Meeting ' },
    { label: 'Hardware Enquiry', value: 'Hardware Enquiry' },
    { label: 'Material Delivery', value: 'Material Delivery' },
    { label: 'Material Collection', value: 'Material collection' },
    { label: 'Self Pickup', value: 'Self pickup' },
    { label: 'Rental Pickup', value: 'Rental pickup' },
    { label: 'Demo', value: 'Demo' },
    { label: 'Others', value: 'Others' },
  ];

  return (
    <SafeAreaView style={s.safeArea}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={C.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="15 18 9 12 15 6" />
          </Svg>
        </TouchableOpacity>
        <View>
          <Text style={s.headerTitle}>Daily Call Report</Text>
          <Text style={s.headerSub}>Capture call details and track resolutions</Text>
        </View>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

        {/* ── SECTION 1: Call Details ── */}
        <Card title="Call Details">
          <DatePickerField label="Date" value={form.date}
            onChange={(v: string) => set('date', v)} required />
          <SelectField label="Work Nature" value={form.workNature}
            options={workNatureOpts} onSelect={v => set('workNature', v)} required />
          {form.workNature === 'Others' && (
            <TextRow label="Specify Work Nature" value={form.otherWorkNature}
              onChange={(v: string) => set('otherWorkNature', v)} placeholder="Enter work nature" required />
          )}
          <SelectField label="Mode" value={form.directOnline}
            options={[{ label: 'Direct', value: 'Direct' }, { label: 'Online', value: 'Online' }]}
            onSelect={v => set('directOnline', v)} required />
          <SelectField label="Customer Type" value={form.customerType}
            options={[{ label: 'New Customer', value: 'New' }, { label: 'Existing Customer', value: 'Existing' }]}
            onSelect={v => { set('customerType', v); clearCustomer(); }} />
          <SelectField label="Person Aligned" value={form.personAligned}
            options={[{ label: '— Select Person —', value: '' }, ...users.map(u => ({
              label: `${u.firstName} ${u.lastName}`.trim() + (u.designation ? ` (${u.designation})` : ''),
              value: `${u.firstName} ${u.lastName}`.trim(),
            }))]}
            onSelect={v => set('personAligned', v)} />
        </Card>

        {/* ── SECTION 2: Customer Details ── */}
        <Card title="Customer Details">
          {form.customerType === 'Existing' ? (
            <View>
              <Field>
                <Label text="Search by Email" required />
                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={s.input}
                    value={custInput}
                    onChangeText={handleCustSearch}
                    placeholder="Type customer email to search..."
                    placeholderTextColor={C.textSub}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {searchingCust && (
                    <ActivityIndicator size="small" color={C.blue}
                      style={{ position: 'absolute', right: 12, top: 12 }} />
                  )}
                </View>
                {custResults.length > 0 && (
                  <View style={s.dropdown}>
                    {custResults.map((c: any) => (
                      <TouchableOpacity key={c._id} style={s.dropRow} onPress={() => selectCustomer(c)}>
                        <Text style={s.dropName}>
                          {c.displayName || `${c.firstName} ${c.lastName}`.trim()}
                        </Text>
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
                    <TouchableOpacity onPress={clearCustomer} style={s.clearBtn}>
                      <Text style={{ color: C.primary, fontSize: 12, fontWeight: '700' }}>Clear</Text>
                    </TouchableOpacity>
                  </View>
                  <TextRow label="Mobile Number" value={form.customerMobile}
                    onChange={(v: string) => set('customerMobile', v)} placeholder="Mobile number" keyboardType="phone-pad" />
                  <TextRow label="Designation" value={form.customerDesignation}
                    onChange={(v: string) => set('customerDesignation', v)} placeholder="Designation" />
                </View>
              ) : null}
            </View>
          ) : (
            <View>
              <TextRow label="Customer Name" value={form.customer}
                onChange={(v: string) => set('customer', v)} placeholder="Enter customer name" required />
              <TextRow label="Mobile Number" value={form.customerMobile}
                onChange={(v: string) => set('customerMobile', v)} placeholder="Enter mobile number" keyboardType="phone-pad" />
              <TextRow label="Designation" value={form.customerDesignation}
                onChange={(v: string) => set('customerDesignation', v)} placeholder="Enter designation" />
            </View>
          )}
        </Card>

        {/* ── Hardware Details ── */}
        {isHardware && (
          <Card title={wn === 'Hardware Enquiry' ? 'Hardware Details' : 'Product Details'}>
            <TextRow label="Product / Model" value={form.product}
              onChange={(v: string) => set('product', v)} placeholder="Enter product model" />
            <TextRow label="Serial Number" value={form.serialNumber}
              onChange={(v: string) => set('serialNumber', v)} placeholder="Enter serial number" />
            <TextRow label="Brand" value={form.brand}
              onChange={(v: string) => set('brand', v)} placeholder="Enter brand" />
            <TextRow label="Specification" value={form.specification}
              onChange={(v: string) => set('specification', v)} placeholder="e.g. RAM, CPU" />
          </Card>
        )}

        {/* ── Software Details ── */}
        {isSoftware && (
          <Card title="Software Details">
            <TextRow label="Application Name" value={form.applicationName}
              onChange={(v: string) => set('applicationName', v)} placeholder="Enter application name" />
          </Card>
        )}

        {/* ── Delivery Details ── */}
        {isDelivery && (
          <Card title="Delivery Details">
            <TextRow label="Doc Number" value={form.docNumber}
              onChange={(v: string) => set('docNumber', v)} placeholder="Document number" />
            <DatePickerField label="Doc Date" value={form.docDate}
              onChange={(v: string) => set('docDate', v)} />
            <TimePickerField label="In Time" value={form.inTime}
              onChange={(v: string) => set('inTime', v)} />
            <TimePickerField label="Out Time" value={form.outTime}
              onChange={(v: string) => set('outTime', v)} />
          </Card>
        )}

        {/* ── Logistics / Pickup ── */}
        {isPickup && (
          <Card title="Logistics Details">
            <TextRow label="Vehicle Number" value={form.vehicleNumber}
              onChange={(v: string) => set('vehicleNumber', v)} placeholder="e.g. TN01AB1234" />
            <TextRow label="Location" value={form.location}
              onChange={(v: string) => set('location', v)} placeholder="Pickup/drop location" />
            <TextRow label="Distance (KM)" value={form.km}
              onChange={(v: string) => set('km', v)} placeholder="0" keyboardType="numeric" />
            <TextRow label="Amount (₹)" value={form.amount}
              onChange={(v: string) => set('amount', v)} placeholder="0.00" keyboardType="numeric" />
            <TimePickerField label="In Time" value={form.inTime}
              onChange={(v: string) => set('inTime', v)} />
            <TimePickerField label="Out Time" value={form.outTime}
              onChange={(v: string) => set('outTime', v)} />
          </Card>
        )}

        {/* ── Resolution ── */}
        {showRes && (
          <Card title="Resolution">
            <TextRow label="Problem Statement" value={form.problemStatement}
              onChange={(v: string) => set('problemStatement', v)} placeholder="Briefly describe the problem" multiline />
            <TextRow label="Current Status" value={form.status}
              onChange={(v: string) => set('status', v)} placeholder="Enter current status" />
            <SelectField label="Outcome" value={form.closedPending}
              options={[
                { label: 'Closed', value: 'Closed' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Processing', value: 'Processing' },
              ]}
              onSelect={v => set('closedPending', v)} required />
            {isHardware && (
              <>
                <TimePickerField label="In Time" value={form.inTime}
                  onChange={(v: string) => set('inTime', v)} />
                <TimePickerField label="Out Time" value={form.outTime}
                  onChange={(v: string) => set('outTime', v)} />
              </>
            )}
          </Card>
        )}

        {/* ── Tracking & Additional Info ── */}
        <Card title="Tracking & Additional Info">
          <SelectField label="OEM" value={form.oem}
            options={[
              { label: '— Select OEM —', value: '' },
              { label: 'Atpl', value: 'Atpl' },
              { label: 'Infyot', value: 'Infyot' },
              { label: 'Embsys', value: 'Embsys' },
              { label: 'Bartender', value: 'Bartender' },
            ]}
            onSelect={v => set('oem', v)} />
          <DatePickerField label="Follow-up Date" value={form.followUpDate}
            onChange={(v: string) => set('followUpDate', v)} />
          <TextRow label="Reminder Notes" value={form.reminder}
            onChange={(v: string) => set('reminder', v)} placeholder="Reminder details..." />
          <TextRow label="Remarks" value={form.remarks}
            onChange={(v: string) => set('remarks', v)} placeholder="Any additional remarks" />
          <TextRow label="Report Path / Link" value={form.reportPath}
            onChange={(v: string) => set('reportPath', v)} placeholder="Enter a URL or path (optional)" />
        </Card>

        {/* ── Actions ── */}
        <View style={s.actions}>
          <TouchableOpacity style={s.cancelBtn} onPress={onBack}>
            <Text style={s.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.submitBtn} onPress={handleSubmit} disabled={submitting}>
            {submitting
              ? <ActivityIndicator color={C.white} />
              : <Text style={s.submitText}>{isEditing ? 'Update Report' : 'Submit Report'}</Text>
            }
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  backBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: C.text },
  headerSub: { fontSize: 12, color: C.textSub, marginTop: 2 },
  scroll: { padding: 16 },
  card: {
    backgroundColor: C.white, borderRadius: 16, padding: 16,
    marginBottom: 16, borderWidth: 1, borderColor: C.border,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: C.primary, marginBottom: 12 },
  fieldWrap: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: C.textSub, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: C.border, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: Platform.OS === 'ios' ? 11 : 9,
    fontSize: 14, color: C.text, backgroundColor: C.white,
  },
  // Modal picker
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: C.white, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    maxHeight: '60%', paddingBottom: 24,
  },
  sheetTitle: {
    fontSize: 15, fontWeight: '700', color: C.text,
    paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  sheetRow: { paddingVertical: 14, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: C.border },
  sheetRowText: { fontSize: 15, color: C.text },
  // Customer search dropdown
  dropdown: {
    marginTop: 4, borderWidth: 1, borderColor: C.border,
    borderRadius: 10, backgroundColor: C.white, overflow: 'hidden',
  },
  dropRow: { paddingVertical: 10, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  dropName: { fontSize: 14, fontWeight: '600', color: C.text },
  dropSub: { fontSize: 12, color: C.textSub, marginTop: 2 },
  // Customer info box
  custInfoBox: {
    marginTop: 12, backgroundColor: C.slate50, borderRadius: 10,
    borderWidth: 1, borderColor: C.border, padding: 12,
  },
  custNameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  custNameLabel: { fontSize: 13, color: C.textSub, fontWeight: '600', marginRight: 8 },
  custNameValue: { flex: 1, fontSize: 14, fontWeight: '700', color: C.text },
  clearBtn: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6,
    borderWidth: 1, borderColor: C.primary,
  },
  // Actions
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 4 },
  cancelBtn: {
    paddingVertical: 11, paddingHorizontal: 24, borderRadius: 8,
    backgroundColor: C.slate50, borderWidth: 1, borderColor: C.border,
  },
  cancelText: { fontSize: 14, fontWeight: '700', color: C.textSub },
  submitBtn: {
    paddingVertical: 11, paddingHorizontal: 28, borderRadius: 8,
    backgroundColor: C.primary, minWidth: 130, alignItems: 'center',
  },
  submitText: { fontSize: 14, fontWeight: '700', color: C.white },
});
