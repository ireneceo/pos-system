import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getAuthToken } from '../../utils/auth';

// 삭제/취소 승인 PIN 모달 — 손실방지(anti-theft) 게이트. 터치 numpad.
// 할인 PIN(DiscountPinModal)과 동일하게 verify-pin-permission 으로 권한만 확인 —
// 세션/로그인 계정은 바뀌지 않는다. permission='void_authorize'.
// onApproved 는 승인자명(by) + 입력 PIN(pin) 을 돌려준다 — 호출 측이 실제 삭제/취소
// API body 에 void_pin 을 실어 백엔드 재검증(설계 §4.4)을 통과시킨다.
// 설계: docs/VOID_PIN_GATE_DESIGN.md §4.3

interface Props {
  show: boolean;
  restaurantId: string | number;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  onApproved: (by: string | null, pin: string) => void;
}

const Overlay = styled.div<{ show: boolean }>`
  position: fixed; inset: 0; background: rgba(10, 37, 64, 0.55);
  display: ${p => (p.show ? 'flex' : 'none')}; align-items: center; justify-content: center; z-index: 11000;
`;
const Box = styled.div`
  background: #fff; border-radius: 16px; padding: 24px; width: 320px; max-width: 90vw; text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;
const Title = styled.div`font-size: 18px; font-weight: 700; color: #0A2540;`;
const Subtitle = styled.div`font-size: 13px; color: #6B7C93; margin: 4px 0 16px;`;
const Dots = styled.div`display: flex; justify-content: center; gap: 12px; margin-bottom: 8px;`;
const Dot = styled.div<{ filled: boolean; error: boolean }>`
  width: 14px; height: 14px; border-radius: 50%;
  background: ${p => (p.error ? '#FF6B6B' : p.filled ? '#635BFF' : '#E6EBF1')};
`;
const Err = styled.div`min-height: 18px; font-size: 12px; color: #FF6B6B; margin-bottom: 8px;`;
const Pad = styled.div`display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;`;
const Key = styled.button<{ $action?: boolean }>`
  height: 56px; border: 1px solid #E6EBF1; border-radius: 12px; font-size: 20px; font-weight: 600;
  background: ${p => (p.$action ? '#F7F9FC' : '#fff')}; color: #0A2540; cursor: pointer;
  &:active { background: #F0EFFF; }
`;

const VoidPinModal: React.FC<Props> = ({ show, restaurantId, title, subtitle, onClose, onApproved }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (show) { setPin(''); setError(''); } }, [show]);

  const verify = useCallback(async (full: string) => {
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/staff/verify-pin-permission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ pin_code: full, permission: 'void_authorize', restaurant_id: restaurantId })
      });
      const j = await res.json();
      if (j?.data?.authorized) { onApproved(j.data.by || null, full); }
      else { setError('Not authorized'); setPin(''); }
    } catch { setError('Connection error'); setPin(''); }
    finally { setBusy(false); }
  }, [restaurantId, onApproved]);

  const press = useCallback((k: string) => {
    if (busy) return;
    if (k === 'backspace') { setPin(p => p.slice(0, -1)); setError(''); return; }
    setPin(prev => {
      if (prev.length >= 4) return prev;
      const next = prev + k;
      if (next.length === 4) verify(next);
      return next;
    });
    setError('');
  }, [busy, verify]);

  useEffect(() => {
    if (!show) return;
    const h = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') press(e.key);
      else if (e.key === 'Backspace') press('backspace');
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [show, press, onClose]);

  if (!show) return null;
  return (
    <Overlay show={show} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Title>{title || 'Void Approval'}</Title>
        <Subtitle>{subtitle || 'Enter authorized 4-digit PIN'}</Subtitle>
        <Dots>{[0, 1, 2, 3].map(i => <Dot key={i} filled={pin.length > i} error={!!error} />)}</Dots>
        <Err>{error}</Err>
        <Pad>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(k => <Key key={k} type="button" onClick={() => press(k)}>{k}</Key>)}
          <Key type="button" $action onClick={() => press('backspace')}>⌫</Key>
          <Key type="button" onClick={() => press('0')}>0</Key>
          <Key type="button" $action onClick={onClose}>✕</Key>
        </Pad>
      </Box>
    </Overlay>
  );
};

export default VoidPinModal;
