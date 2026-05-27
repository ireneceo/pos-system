import React, { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';

/**
 * In-app notification toaster.
 * - Connects to /notifications socket.io namespace with JWT auth.
 * - Listens to category-mapped events (order:new, kitchen:alert, etc.).
 * - Plays a sound on each event with 200ms debounce (prevents ping spam — PlanQ improvement).
 * - Shows up to 3 stacked toast cards in the top-right corner.
 *
 * Sound strategy: Web Audio API chime (G5 + D6) generated on first user gesture; falls back to mp3
 * if the file is bundled. iOS silent-mode applies regardless — this is OS behavior.
 */

interface ToastItem {
  id: string;
  title: string;
  body?: string;
  category: string;
  url?: string;
  createdAt: number;
}

const PING_DEBOUNCE_MS = 200;

let audioCtx: AudioContext | null = null;
let audioUnlocked = false;
function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    audioCtx = new Ctx();
    audioCtx?.resume?.().catch(() => {});
    audioUnlocked = true;
  } catch {}
}

function playChime() {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const note = (freq: number, start: number, duration: number) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.18, now + start + 0.02);
      gain.gain.linearRampToValueAtTime(0, now + start + duration);
      osc.connect(gain).connect(audioCtx!.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.05);
    };
    note(783.99, 0, 0.18);   // G5
    note(1174.66, 0.10, 0.22); // D6
  } catch {}
}

const NotificationToaster: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const lastPingRef = useRef(0);
  const socketRef = useRef<Socket | null>(null);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const pushToast = useCallback((item: ToastItem) => {
    setToasts(prev => [item, ...prev].slice(0, 3));
    const now = Date.now();
    if (now - lastPingRef.current > PING_DEBOUNCE_MS) {
      lastPingRef.current = now;
      playChime();
    }
    // Auto-dismiss after 8s for non-critical
    const isCritical = item.category === 'order_new' || item.category === 'kitchen_alert';
    if (!isCritical) setTimeout(() => removeToast(item.id), 8000);
  }, [removeToast]);

  useEffect(() => {
    const onGesture = () => {
      unlockAudio();
      window.removeEventListener('click', onGesture);
      window.removeEventListener('keydown', onGesture);
      window.removeEventListener('touchstart', onGesture);
    };
    window.addEventListener('click', onGesture, { passive: true });
    window.addEventListener('keydown', onGesture);
    window.addEventListener('touchstart', onGesture, { passive: true });
    return () => {
      window.removeEventListener('click', onGesture);
      window.removeEventListener('keydown', onGesture);
      window.removeEventListener('touchstart', onGesture);
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const token = getAuthToken();
    if (!token) return;

    const sock = io('/notifications', {
      transports: ['websocket', 'polling'],
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000
    });
    socketRef.current = sock;

    sock.on('connect', () => {
      // Auto-join user-scoped rooms based on role/identity
      sock.emit('join', {
        user_id: user.id,
        role: user.role,
        restaurant_id: user.restaurant_id,
        brand_id: user.brand_id,
        foodcourt_id: user.foodcourt_id,
        supplier_company_id: (user as any).supplier_company_id
      });
    });

    sock.on('notification', (data: any) => {
      pushToast({
        id: `${data.category}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: data.title,
        body: data.body,
        category: data.category,
        url: data.url,
        createdAt: Date.now()
      });
    });

    sock.on('connect_error', (err) => {
      // Auth failed → JWT likely expired. Stop reconnecting.
      if (String(err.message).toLowerCase().includes('auth')) {
        sock.io.opts.reconnection = false;
      }
    });

    return () => {
      sock.disconnect();
      socketRef.current = null;
    };
  }, [user, pushToast]);

  // Reconcile push permission state on focus
  useEffect(() => {
    const onFocus = () => {
      import('../../services/push').then(({ reconcilePermissionState }) => {
        reconcilePermissionState().catch(() => {});
      });
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 16,
      right: 16,
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      maxWidth: 380
    }}>
      {toasts.map(item => (
        <div
          key={item.id}
          style={{
            background: '#fff',
            border: '1px solid #C7CED6',
            borderLeft: '4px solid #635BFF',
            borderRadius: 10,
            boxShadow: '0 6px 20px rgba(10,37,64,0.10)',
            padding: '12px 14px',
            cursor: item.url ? 'pointer' : 'default'
          }}
          onClick={() => {
            if (item.url) window.location.href = item.url;
            removeToast(item.id);
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', marginBottom: 2 }}>
                {item.title}
              </div>
              {item.body && (
                <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.45 }}>
                  {item.body}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label={t('common:close')}
              onClick={(e) => { e.stopPropagation(); removeToast(item.id); }}
              style={{
                background: 'transparent', border: 'none', color: '#4B5563',
                cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0
              }}
            >×</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationToaster;
