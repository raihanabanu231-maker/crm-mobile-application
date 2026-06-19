import apiClient from './apiClient';

export const wishesApi = {
  createWish: (data: any) => apiClient('/wishes', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getPendingWishes: () => apiClient('/wishes/pending'),
  getCelebrations: () => apiClient('/auth/celebrations'),
};
