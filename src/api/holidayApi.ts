import apiClient from './apiClient';

export const holidayApi = {
  getUpcomingHolidays: () => apiClient('/holidays/upcoming'),
  createHoliday: (data: any) => apiClient('/holidays', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  uploadHolidays: (data: any) => apiClient('/holidays/upload', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};
