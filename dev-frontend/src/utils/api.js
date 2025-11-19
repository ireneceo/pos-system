import { API_URL } from '../config/environment';

/**
 * API 헬퍼 함수들
 */

// 기본 fetch 래퍼
export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  const defaultOptions = {
    credentials: 'include', // 쿠키를 포함하여 요청 (httpOnly 쿠키 사용)
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // localStorage 제거 - 쿠키 기반 인증 사용

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
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

export default {
  fetchAPI,
  getAPI,
  postAPI,
  putAPI,
  deleteAPI,
  patchAPI,
  API_URL,
};