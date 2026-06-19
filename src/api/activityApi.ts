// src/api/activityApi.ts
import apiClient from './apiClient';

export const activityApi = {
  // GET /api/activities
  getActivities: () => apiClient('/activities'),
  
  // POST /api/activities/:id/comment
  addComment: (id: string, text: string) => apiClient(`/activities/${id}/comment`, { 
    method: 'POST', 
    body: JSON.stringify({ text }) 
  }),
  
  // POST /api/activities/:id/react
  reactToActivity: (id: string, type: string = 'like') => apiClient(`/activities/${id}/react`, { 
    method: 'POST', 
    body: JSON.stringify({ type }) 
  }),
};
