import apiClient from './apiClient';

export const leaveApi = {
  applyForLeave: (data: any) => apiClient('/leaves', { 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getMyLeaves: () => apiClient('/leaves/my'),
  getUpcomingLeaves: () => apiClient('/leaves/upcoming'),
  getPendingLeaves: () => apiClient('/leaves/pending'),
  reviewLeave: (id: string, data: any) => apiClient(`/leaves/${id}/review`, { 
    method: 'PUT',
    body: JSON.stringify(data)
  }),
};
