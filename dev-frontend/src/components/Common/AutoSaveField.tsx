import React, { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

type FieldType = 'input' | 'select' | 'toggle' | 'image' | 'list';
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface AutoSaveHandle {
  triggerSave: () => void;
}

interface AutoSaveFieldProps {
  children: React.ReactNode;
  onSave: () => Promise<void>;
  type?: FieldType;
  debounceMs?: number;
  style?: React.CSSProperties;
}

/* ── animations ── */
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

/* ── wrapper ── */
const Wrapper = styled.div<{ $type?: string }>`
  position: relative;
  ${props => (props.$type === 'input' || props.$type === 'select' || props.$type === 'image') ? 'width: 100%;' : ''}
`;

/* ── badge positions ── */
const badgeBase = css<{ $fading: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${props => props.$fading ? css`${fadeOut} 0.3s ease forwards` : css`${fadeIn} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`;

const InputBadge = styled.div<{ $fading: boolean }>`
  ${badgeBase}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`;

const SelectBadge = styled.div<{ $fading: boolean }>`
  ${badgeBase}
  position: absolute;
  right: -6px;
  top: -6px;
`;

const ToggleBadge = styled.div<{ $fading: boolean }>`
  ${badgeBase}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`;

const ImageBadge = styled.div<{ $fading: boolean }>`
  ${badgeBase}
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const ListBadge = styled.div<{ $fading: boolean }>`
  ${badgeBase}
  position: absolute;
  right: -8px;
  top: -8px;
`;

/* ── icons ── */
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

/* ── component ── */
const AutoSaveField = forwardRef<AutoSaveHandle, AutoSaveFieldProps>(({
  children,
  onSave,
  type = 'input',
  debounceMs = 2000,
  style,
}, ref) => {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [fading, setFading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const fadeRef = useRef<NodeJS.Timeout | null>(null);
  const resetRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);
  const saveRef = useRef(onSave);
  saveRef.current = onSave;

  const clearTimers = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (fadeRef.current) clearTimeout(fadeRef.current);
    if (resetRef.current) clearTimeout(resetRef.current);
  }, []);

  // input: 2s debounce (typing), toggle/select/list/image: 300ms (instant action)
  const effectiveDebounce = debounceMs !== 2000 ? debounceMs
    : (type === 'toggle' || type === 'select' || type === 'list' || type === 'image') ? 300 : debounceMs;

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
          resetRef.current = setTimeout(() => { if (mountedRef.current) { setStatus('idle'); setFading(false); } }, 300);
        }, 2000);
      } catch {
        if (!mountedRef.current) return;
        setStatus('error');
        fadeRef.current = setTimeout(() => {
          if (!mountedRef.current) return;
          setFading(true);
          resetRef.current = setTimeout(() => { if (mountedRef.current) { setStatus('idle'); setFading(false); } }, 300);
        }, 4000);
      }
    }, effectiveDebounce);
  }, [effectiveDebounce, clearTimers]);

  useImperativeHandle(ref, () => ({ triggerSave }), [triggerSave]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; clearTimers(); };
  }, [clearTimers]);

  // Auto-intercept onChange of children — recurse into wrappers (label, div, etc.)
  // so `<AutoSaveField><label><input onChange={...}/></label></AutoSaveField>`
  // also auto-saves. Previously only direct-child onChange was hooked, which
  // silently dropped saves on every label-wrapped toggle (cash drawer / copies
  // / workstation autoPrint), so the cashier toggled them but they never
  // persisted — autoprint conditions stayed false and nothing fired.
  const enhance = (node: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(node)) return node;
    const props: any = node.props || {};
    const orig = props.onChange;
    if (typeof orig === 'function') {
      return React.cloneElement(node as React.ReactElement<any>, {
        onChange: (...args: any[]) => { orig(...args); triggerSave(); },
      });
    }
    if (props.children) {
      return React.cloneElement(node as React.ReactElement<any>, {
        children: React.Children.map(props.children, enhance),
      });
    }
    return node;
  };
  const enhancedChildren = React.Children.map(children, enhance);

  const icon = status === 'saving'
    ? <Spinner />
    : status === 'saved'
      ? <SavedPill>✓</SavedPill>
      : status === 'error'
        ? <ErrorPill>!</ErrorPill>
        : null;

  const Badge = type === 'select' ? SelectBadge
    : type === 'toggle' ? ToggleBadge
    : type === 'image' ? ImageBadge
    : type === 'list' ? ListBadge
    : InputBadge;

  return (
    <Wrapper $type={type} style={style}>
      {enhancedChildren}
      {status !== 'idle' && <Badge $fading={fading}>{icon}</Badge>}
    </Wrapper>
  );
});

AutoSaveField.displayName = 'AutoSaveField';
export default AutoSaveField;
