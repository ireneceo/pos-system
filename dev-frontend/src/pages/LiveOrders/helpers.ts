import React from 'react';
import { getTimeElapsed } from '../../utils/timezone';
import { getAuthToken } from '../../utils/auth';

// Helper function to format pickup time as range (e.g., "9:00 - 9:30 AM")
export const formatPickupTimeRange = (dateString: string): string => {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000); // Add 30 minutes

  const formatTime = (d: Date) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    const displayMin = minutes.toString().padStart(2, '0');
    return { time: `${displayHour}:${displayMin}`, period };
  };

  const start = formatTime(date);
  const end = formatTime(endDate);

  // If periods are the same, show period only at the end
  if (start.period === end.period) {
    return `${start.time} - ${end.time} ${end.period}`;
  }
  return `${start.time} ${start.period} - ${end.time} ${end.period}`;
};

// Helper: payment_proof 호환 — { current, history } 구조 또는 기존 단일 객체 모두 지원
export const getProofCurrent = (proof: any): any => {
  if (!proof) return null;
  if (proof.hasOwnProperty('current')) return proof.current;
  return proof; // 기존 단일 객체
};
export const getProofHistory = (proof: any): any[] => {
  if (!proof) return [];
  if (proof.hasOwnProperty('history')) return proof.history || [];
  return [];
};

// Helper function to get fetch options with auth token
export const getFetchOptions = (options: RequestInit = {}): RequestInit => {
  const token = getAuthToken();
  return {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  };
};

// Time Ago Display Component - 실시간 업데이트용 (글로벌 유틸리티 사용)
export const TimeAgoDisplay: React.FC<{ dateString: string }> = ({ dateString }) => {
  const [display, setDisplay] = React.useState('calculating...');

  React.useEffect(() => {
    const updateDisplay = () => {
      setDisplay(getTimeElapsed(dateString));
    };

    updateDisplay(); // 즉시 계산

    // 10초마다 업데이트
    const timer = setInterval(updateDisplay, 10000);

    return () => clearInterval(timer);
  }, [dateString]);

  return React.createElement('span', { style: { fontSize: '12px' } }, display);
};
