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
