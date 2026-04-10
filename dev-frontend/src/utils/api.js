import { API_URL } from '../config/environment';
import { getAuthToken } from './auth';

/**
 * API 헬퍼 함수들
 */

// 기본 fetch 래퍼
export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  // localStorage에서 토큰 가져오기
  const token = getAuthToken();

  const defaultOptions = {
    credentials: 'include', // 쿠키를 포함하여 요청 (httpOnly 쿠키 사용)
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || error.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// GET 요청
export function getAPI(endpoint) {
  return fetchAPI(endpoint, { method: 'GET' });
}

// POST 요청
export function postAPI(endpoint, data) {
  return fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT 요청
export function putAPI(endpoint, data) {
  return fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE 요청
export function deleteAPI(endpoint) {
  return fetchAPI(endpoint, { method: 'DELETE' });
}

// PATCH 요청
export function patchAPI(endpoint, data) {
  return fetchAPI(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

const apiHelper = {
  fetchAPI,
  getAPI,
  postAPI,
  putAPI,
  deleteAPI,
  patchAPI,
  API_URL,
};

export default apiHelper;