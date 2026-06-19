// src/api/authApi.ts
import apiClient from './apiClient';

export const authApi = {
  // GET /api/auth/system-status
  getSystemStatus: () => apiClient('/auth/system-status'),

  // POST /api/auth/register
  register: (data: any) => apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // POST /api/auth/login
  login: (data: any) => apiClient('/auth/login', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  
  // GET /api/auth/invite/:token
  getInviteByToken: (token: string) => apiClient(`/auth/invite/${token}`),

  // POST /api/auth/signup/:token
  signupWithToken: (token: string, data: any) => apiClient(`/auth/signup/${token}`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/me
  getMe: () => apiClient('/auth/me'),

  // GET /api/auth/celebrations
  getCelebrations: () => apiClient('/auth/celebrations'),

  // PUT /api/auth/profile
  updateProfile: (data: any) => apiClient('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/users
  getUsers: () => apiClient('/auth/users'),

  // PUT /api/auth/users/:id
  updateUser: (id: string, data: any) => apiClient(`/auth/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // DELETE /api/auth/users/:id
  deleteUser: (id: string) => apiClient(`/auth/users/${id}`, {
    method: 'DELETE',
  }),

  // POST /api/auth/invite
  createInvite: (data: any) => apiClient('/auth/invite', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // GET /api/auth/invites
  getInvites: () => apiClient('/auth/invites'),
};
