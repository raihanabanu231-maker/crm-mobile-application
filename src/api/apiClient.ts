import AsyncStorage from '@react-native-async-storage/async-storage';

// Production URL
// const BASE_URL = 'http://localhost:5000/api'; 
// const BASE_URL = 'http://10.0.2.2:5000/api'; // Android Emulator
// const BASE_URL = 'http://192.168.1.8:5000/api'; // Physical phone (local)
const BASE_URL = 'https://perfectflow360.atplgroup.org/api'; // Production server
// const BASE_URL = 'https://atpl-enquiry-application.onrender.com/api'; // Old Render

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem('userToken');

  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  // Note: Do NOT set Content-Type for FormData — React Native sets it
  // automatically with the correct multipart boundary
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Server error: ${response.status} ${response.statusText}`
      );
    }

    const responseData = await response.json();
    console.log('API Response:', endpoint, responseData);
    return responseData;
  } catch (error: any) {
    // Network error (no connection, server down, etc.)
    if (error.message === 'Network request failed') {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

export default apiClient;
