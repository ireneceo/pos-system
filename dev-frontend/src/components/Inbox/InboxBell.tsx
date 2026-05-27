import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { fetchUnreadCount } from './inboxApi';
import InboxDrawer from './InboxDrawer';

interface Props {
  /** Polling interval in ms. Default 30s. */
  pollMs?: number;
  /** Show full label "Inbox" beside the bell (desktop only). */
  showLabel?: boolean;
}

const POLL_MS_DEFAULT = 30000;

const InboxBell: React.FC<Props> = ({ pollMs = POLL_MS_DEFAULT, showLabel = false }) => {
  const { t } = useTranslation('common');
  const [count, setCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [open, setOpen] = useState(false);
  const lastCountRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = async () => {
    const c = await fetchUnreadCount();
    setCount(c.total);
    if (c.total > lastCountRef.current && lastCountRef.current >= 0) {
      // New item(s) since last poll → subtle shake
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    lastCountRef.current = c.total;
  };

  useEffect(() => {
    refresh();
    intervalRef.current = setInterval(refresh, pollMs);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollMs]);

  const display = count > 99 ? '99+' : String(count);
  const ariaLabel = count > 0
    ? t('inbox.bell.aria.unread', '{{count}} unread notifications', { count })
    : t('inbox.bell.aria.empty', 'No unread notifications');

  return (
    <>
      <BellButton
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-live="polite"
        onClick={() => setOpen(true)}
      >
        <BellIcon $shake={shake} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </BellIcon>
        {count > 0 && <Badge>{display}</Badge>}
        {showLabel && <Label>{t('inbox.bell.label', 'Inbox')}</Label>}
      </BellButton>
      <InboxDrawer
        open={open}
        onClose={() => setOpen(false)}
        onItemRead={refresh}
      />
    </>
  );
};

export default InboxBell;

// ─── Styled ──────────────────────────────────────────────────

const shakeKf = keyframes`
  0%, 100% { transform: rotate(0); }
  20% { transform: rotate(-12deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-8deg); }
  80% { transform: rotate(6deg); }
`;

const popKf = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
`;

const BellButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #374151;
  transition: background 0.15s, color 0.15s;

  &:hover { background: #F1F4F8; color: #0A2540; }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99,91,255,0.18);
  }
`;

const BellIcon = styled.span<{ $shake: boolean }>`
  display: inline-flex;
  transform-origin: 50% 4px;
  ${p => p.$shake && css`animation: ${shakeKf} 0.6s ease-in-out;`}
`;

const Badge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #DC2626;
  color: white;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  border: 2px solid white;
  box-sizing: content-box;
  animation: ${popKf} 0.25s ease;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 500;

  @media (max-width: 768px) { display: none; }
`;
