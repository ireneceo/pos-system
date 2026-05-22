import { useCallback, useEffect, useRef, useState } from 'react';

export interface KdsStaffSession {
  id: number;
  name: string;
  role: string;
  loggedInAt: number;
}

const STORAGE_KEY = 'kds_staff_session';
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'touchstart', 'click'];

function readSession(): KdsStaffSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as KdsStaffSession;
    if (!parsed || typeof parsed.id !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useKdsStaff() {
  const [staff, setStaff] = useState<KdsStaffSession | null>(() => readSession());
  const lastActivityRef = useRef<number>(Date.now());

  const login = useCallback((s: KdsStaffSession) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    lastActivityRef.current = Date.now();
    setStaff(s);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setStaff(null);
  }, []);

  // Idle timeout — auto-logout after IDLE_TIMEOUT_MS of no activity
  useEffect(() => {
    if (!staff) return;
    const bump = () => { lastActivityRef.current = Date.now(); };
    ACTIVITY_EVENTS.forEach(e => window.addEventListener(e, bump, { passive: true }));
    const interval = window.setInterval(() => {
      if (Date.now() - lastActivityRef.current >= IDLE_TIMEOUT_MS) {
        logout();
      }
    }, 30 * 1000);
    return () => {
      ACTIVITY_EVENTS.forEach(e => window.removeEventListener(e, bump));
      window.clearInterval(interval);
    };
  }, [staff, logout]);

  return { staff, login, logout };
}
