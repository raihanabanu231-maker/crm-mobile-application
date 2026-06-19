import AsyncStorage from '@react-native-async-storage/async-storage';

// You can swap this to the production URL later
// const BASE_URL = 'http://localhost:5000/api'; 
// const BASE_URL = 'http://10.0.2.2:5000/api'; // Use this if you are testing on an Android Emulator
//const BASE_URL = 'http://192.168.1.8:5000/api'; // Testing on physical phone
const BASE_URL = 'https://atpl-enquiry-application.onrender.com/api';

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem('userToken');
  
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  const responseData = await response.json();
  console.log('API Response data:', endpoint, responseData);
  return responseData;
};

export default apiClient;
