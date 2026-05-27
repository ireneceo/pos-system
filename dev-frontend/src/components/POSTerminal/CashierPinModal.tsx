import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { getAuthToken } from '../../utils/auth';
interface PinVerifyResult {
  data: { id: number; name: string; role: string; department: string };
  token: string;
  user: {
    id: number | string;
    email: string;
    role: string;
    username: string;
    name: string;
    restaurant_id?: number | null;
    manager_id?: number | null;
    brand_id?: number | null;
    foodcourt_id?: number | null;
    permissions?: string[];
  };
}

interface CashierPinModalProps {
  show: boolean;
  onClose: () => void;
  onVerified: (result: PinVerifyResult) => void;
  onLogout?: () => void;
  currentCashierName?: string;
}

const Overlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin: 0 0 4px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: #4B5563;
  text-align: center;
  margin: 0 0 24px;
`;

const PinDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const PinDot = styled.div<{ filled: boolean; error?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${props => props.error ? '#DC2626' : props.filled ? '#635BFF' : '#C7CED6'};
  background: ${props => props.error ? '#DC2626' : props.filled ? '#635BFF' : 'transparent'};
  transition: all 0.15s;
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`;

const KeyBtn = styled.button<{ variant?: 'action' }>`
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  font-size: ${props => props.variant === 'action' ? '14px' : '22px'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.variant === 'action' ? '#F1F4F8' : 'white'};
  color: ${props => props.variant === 'action' ? '#4B5563' : '#0A2540'};

  &:hover {
    background: ${props => props.variant === 'action' ? '#F0F4FF' : '#F1F4F8'};
    border-color: #635BFF;
  }

  &:active {
    transform: scale(0.96);
    background: #F0F4FF;
  }
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  min-height: 20px;
`;

const LogoutBtn = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEF2F2;
    border-color: #DC2626;
  }
`;

const CurrentCashier = styled.div`
  text-align: center;
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 20px;
`;

const CashierPinModal: React.FC<CashierPinModalProps> = ({ show, onClose, onVerified, onLogout, currentCashierName }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (show) {
      setPin('');
      setError('');
    }
  }, [show]);

  const verifyPin = useCallback(async (fullPin: string) => {
    setIsVerifying(true);
    setError('');
    try {
      const token = getAuthToken();
      const response = await fetch('/api/staff/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pin_code: fullPin })
      });

      const data = await response.json();
      if (data.success && data.token && data.user) {
        onVerified({ data: data.data, token: data.token, user: data.user });
      } else if (data.success) {
        // fallback (should not happen with updated backend)
        onVerified({ data: data.data, token: '', user: data.data });
      } else {
        setError('Invalid PIN. Please try again.');
        setPin('');
      }
    } catch {
      setError('Connection error. Please try again.');
      setPin('');
    } finally {
      setIsVerifying(false);
    }
  }, [onVerified]);

  const handleKeyPress = useCallback((key: string) => {
    if (isVerifying) return;

    if (key === 'backspace') {
      setPin(prev => prev.slice(0, -1));
      setError('');
      return;
    }

    if (pin.length >= 4) return;

    const newPin = pin + key;
    setPin(newPin);
    setError('');

    if (newPin.length === 4) {
      verifyPin(newPin);
    }
  }, [pin, isVerifying, verifyPin]);

  // Keyboard support
  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleKeyPress('backspace');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, handleKeyPress, onClose]);

  if (!show) return null;

  return (
    <Overlay show={show} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Switch Cashier</Title>
        <Subtitle>Enter 4-digit PIN to switch</Subtitle>

        {currentCashierName && (
          <CurrentCashier>
            Current: {currentCashierName}
          </CurrentCashier>
        )}

        <PinDisplay>
          {[0, 1, 2, 3].map(i => (
            <PinDot key={i} filled={pin.length > i} error={!!error} />
          ))}
        </PinDisplay>

        <ErrorMsg>{error}</ErrorMsg>

        <Keypad>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(key => (
            <KeyBtn key={key} onClick={() => handleKeyPress(key)}>{key}</KeyBtn>
          ))}
          <KeyBtn variant="action" onClick={() => handleKeyPress('backspace')}>⌫</KeyBtn>
          <KeyBtn onClick={() => handleKeyPress('0')}>0</KeyBtn>
          <KeyBtn variant="action" onClick={onClose}>Close</KeyBtn>
        </Keypad>

        {onLogout && (
          <LogoutBtn onClick={onLogout}>
            Logout
          </LogoutBtn>
        )}
      </ModalBox>
    </Overlay>
  );
};

export default CashierPinModal;
