import { useCallback } from 'react';
import { getAuthToken } from '../../../utils/auth';

export type AuthFetch = (url: string, options?: RequestInit) => Promise<any>;

export function useAuthFetch(): AuthFetch {
  return useCallback(async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });
    return response.json();
  }, []);
}
