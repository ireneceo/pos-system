import { getAuthToken } from '../utils/auth';
// API Configuration - Environment variable is replaced at build time
// process.env.REACT_APP_API_URL will be replaced by webpack with actual value
export const getApiBaseUrl = (): string => {
  return process.env.REACT_APP_API_URL || '';
};

export const API_BASE_URL = getApiBaseUrl();

// API 호출 helper with JWT token
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  // API_BASE_URL이 비어있으면 endpoint를 그대로 사용 (상대 경로)
  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;

  // JWT 토큰 자동 추가
  const token = getAuthToken();
  const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    return { response, data: data.data || data };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_BASE_URL;