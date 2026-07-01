// src/api/attendanceApi.ts
import apiClient from './apiClient';

export interface LocationPayload {
  lat: number;
  lng: number;
  address?: string;
}

export const attendanceApi = {
  // POST /api/attendance/check-in
  // Body: { location: { lat, lng, address } }
  checkIn: (location?: LocationPayload) =>
    apiClient('/attendance/check-in', {
      method: 'POST',
      body: location ? JSON.stringify({ location }) : undefined,
    }),

  // POST /api/attendance/check-out
  // Body: { location: { lat, lng, address } }
  checkOut: (location?: LocationPayload) =>
    apiClient('/attendance/check-out', {
      method: 'POST',
      body: location ? JSON.stringify({ location }) : undefined,
    }),

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

