import React from 'react';
import { useTranslation } from 'react-i18next';

// 시재관리 공유 디자인 토큰 + 프리젠테이션 (CashDrawerOps / CashLedger / CashUpPage 공용).
// 인라인 스타일만 — cross-chunk styled-component TDZ 회피.
export const C = {
  primary: '#635BFF', text: '#0A2540', subtle: '#6B7C93', border: '#E6EBF1',
  match: '#10B981', warnAmt: '#F59E0B', bad: '#FF6B6B', bg: '#F7F8FB'
};

export const num = (s: string) => Math.round((parseFloat(s) || 0) * 100) / 100;
export const round2 = (n: number) => Math.round((Number(n) || 0) * 100) / 100;

const padBtn: React.CSSProperties = { height: 56, borderRadius: 12, border: `1px solid ${C.border}`, background: '#fff', color: C.text, fontSize: 22, fontWeight: 600, cursor: 'pointer' };

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>{children}</div>
);
export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>{children}</div>
);
export const Hint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ fontSize: 13, color: C.subtle, lineHeight: 1.5, margin: '0 0 16px' }}>{children}</p>
);
export const Amount: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 32, fontWeight: 700, color: C.text, textAlign: 'center', padding: '12px 0 16px' }}>{children}</div>
);
export const Ledger: React.FC<{ label: string; value: string; color?: string; bold?: boolean }> = ({ label, value, color, bold }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3px 0' }}>
    <span style={{ fontSize: 14, color: bold ? C.text : C.subtle, fontWeight: bold ? 700 : 500 }}>{label}</span>
    <span style={{ fontSize: bold ? 17 : 14, fontWeight: bold ? 700 : 600, color: color || C.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
  </div>
);
export const Primary: React.FC<{ children: React.ReactNode; disabled?: boolean; onClick: () => void }> = ({ children, disabled, onClick }) => (
  <button type="button" disabled={disabled} onClick={onClick}
    style={{ width: '100%', height: 56, marginTop: 14, borderRadius: 12, border: 'none', background: disabled ? '#C7CED6' : C.primary, color: '#fff', fontSize: 16, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer' }}>{children}</button>
);
export const Chip: React.FC<{ children: React.ReactNode; onClick: () => void; active?: boolean }> = ({ children, onClick, active }) => (
  <button type="button" onClick={onClick}
    style={{ flex: 1, minWidth: 84, height: 40, borderRadius: 10, border: `1px solid ${active ? C.primary : C.border}`, background: active ? '#F0F2FF' : '#fff', color: active ? C.primary : C.text, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>{children}</button>
);

export const Pad: React.FC<{ onPress: (d: string) => void; onBack: () => void }> = ({ onPress, onBack }) => {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxWidth: 320, margin: '0 auto' }}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(d => (
        <button key={d} type="button" onClick={() => onPress(d)} style={padBtn}>{d}</button>
      ))}
      <button type="button" onClick={onBack} style={{ ...padBtn, color: C.subtle, fontSize: 22 }} aria-label={t('cash:delete', { defaultValue: 'Delete' })}>←</button>
    </div>
  );
};
