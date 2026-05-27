import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import AddressFields, { AddressFieldsProps } from './AddressFields';
import { Address } from '../../utils/formatAddress';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface AutoSaveAddressFieldsProps extends Omit<AddressFieldsProps, 'onChange'> {
  value: Address;
  onChange: (value: Address) => void;
  onSave: () => Promise<void>;
  debounceMs?: number;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  position: relative;
`;

const Badge = styled.div<{ $fading: boolean }>`
  position: absolute;
  right: -8px;
  top: -8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${p => p.$fading ? css`${fadeOut} 0.3s ease forwards` : css`${fadeIn} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`;

const SavedPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 13px;
  font-weight: 700;
`;

const Spinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #C7CED6;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const ErrorPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
`;

const AutoSaveAddressFields: React.FC<AutoSaveAddressFieldsProps> = ({
  value,
  onChange,
  onSave,
  debounceMs = 600,
  ...rest
}) => {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [fading, setFading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  const saveRef = useRef(onSave);
  saveRef.current = onSave;

  const clearTimers = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (fadeRef.current) clearTimeout(fadeRef.current);
    if (resetRef.current) clearTimeout(resetRef.current);
  }, []);

  const triggerSave = useCallback(() => {
    clearTimers();
    setFading(false);
    setStatus('saving');
    debounceRef.current = setTimeout(async () => {
      if (!mountedRef.current) return;
      try {
        await saveRef.current();
        if (!mountedRef.current) return;
        setStatus('saved');
        fadeRef.current = setTimeout(() => {
          if (!mountedRef.current) return;
          setFading(true);
          resetRef.current = setTimeout(() => {
            if (mountedRef.current) { setStatus('idle'); setFading(false); }
          }, 300);
        }, 2000);
      } catch {
        if (!mountedRef.current) return;
        setStatus('error');
        fadeRef.current = setTimeout(() => {
          if (!mountedRef.current) return;
          setFading(true);
          resetRef.current = setTimeout(() => {
            if (mountedRef.current) { setStatus('idle'); setFading(false); }
          }, 300);
        }, 4000);
      }
    }, debounceMs);
  }, [debounceMs, clearTimers]);

  const handleChange = useCallback((next: Address) => {
    onChange(next);
    triggerSave();
  }, [onChange, triggerSave]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; clearTimers(); };
  }, [clearTimers]);

  const icon = status === 'saving'
    ? <Spinner />
    : status === 'saved'
      ? <SavedPill>✓</SavedPill>
      : status === 'error'
        ? <ErrorPill>!</ErrorPill>
        : null;

  return (
    <Wrapper>
      <AddressFields {...rest} value={value} onChange={handleChange} />
      {status !== 'idle' && <Badge $fading={fading}>{icon}</Badge>}
    </Wrapper>
  );
};

export default AutoSaveAddressFields;
