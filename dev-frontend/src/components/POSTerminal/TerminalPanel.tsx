/**
 * 결제 창 안의 카드단말기 상태 칸 (2026-10-01 GHL ECR · .claude/fable-design-20261001-ghl-ecr.md §3-3).
 * 진행 중 안내 · 거절 사유 · 결과 미확인 시 «단말기 영수증 보고 수동 기록»(사유 필수).
 * 결제 대기 중 취소는 단말기의 Cancel 키(규격에 POS 쪽 C1 형식이 없다). 승인 뒤 취소(Void)는 아래 두 버튼 —
 * 이중 승인 «이 결제 취소» · 결과 미확인 «이 시도를 단말기에서 취소(안전)» (Fable 설계 2026-10-04 §3-3 A-2·A-3).
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ModalButton as Button, FormTextArea } from '../UI/Modal';
import type { TerminalPhase } from '../../utils/terminalSale';

interface Props {
  busy: TerminalPhase | null;
  ready: boolean;
  reason: 'no-bridge' | 'offline' | null;
  issue: { kind: 'declined' | 'unknown' | 'error' | 'choose' | 'voided'; message: string; txnId?: number; hosts?: string[]; retry?: boolean } | null;
  note: string;
  onNote: (v: string) => void;
  onManual: () => void;
  onRetry: () => void;
  onPickTerminal: (host: string) => void;
  /** 이 거래를 단말기에서 취소(Void) — 이중 승인(error+txnId)·결과 미확인(unknown+txnId)에서만 보인다 */
  onVoid: () => void;
  /** 수동 기록 때 캐셔가 영수증을 보고 고르는 수단 — 카드/이월렛 + 종류(매장 규칙대로 필수 여부) */
  manualTender: { method: '' | 'card' | 'ewallet'; sub: string };
  onManualTender: (v: { method: '' | 'card' | 'ewallet'; sub: string }) => void;
  cardOptions: string[];
  ewalletOptions: string[];
  cardLabels: Record<string, string>;
  ewalletLabels: Record<string, string>;
  subRequired: boolean;
}

const box: React.CSSProperties = { fontSize: '13px', lineHeight: 1.5, color: '#425466' };

const chip = (on: boolean): React.CSSProperties => ({
  padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600,
  border: on ? '1px solid #635BFF' : '1px solid #C7CED6', background: on ? '#635BFF' : '#FFFFFF', color: on ? '#FFFFFF' : '#425466',
});

const TerminalPanel: React.FC<Props> = ({
  busy, ready, reason, issue, note, onNote, onManual, onRetry, onPickTerminal, onVoid,
  manualTender, onManualTender, cardOptions, ewalletOptions, cardLabels, ewalletLabels, subRequired,
}) => {
  const { t } = useTranslation('pos');
  // 'reason:<키>' 는 번역, 'reason:code:<코드>' 는 단말기 코드 안내, 그 외(서버·단말기 문구)는 그대로
  const reasonText = (m: string) => {
    if (m.startsWith('reason:code:')) return t('cardTerminal.reason.code', { code: m.slice(12) });
    if (m.startsWith('reason:')) return t(`cardTerminal.reason.${m.slice(7)}`);
    return m;
  };

  if (busy) {
    const text = busy === 'voiding' ? t('cardTerminal.void.progress')
      : busy === 'recovering' ? t('cardTerminal.recovering')
      : busy === 'checking' ? t('cardTerminal.checking')
      : busy === 'starting' ? t('cardTerminal.starting')
      : t('cardTerminal.waiting');
    return (
      <div style={box} role="status" aria-live="polite">
        <strong style={{ color: '#0A2540' }}>{text}</strong>
        {busy !== 'voiding' && <div style={{ marginTop: 4 }}>{t('cardTerminal.cancelOnTerminal')}</div>}
      </div>
    );
  }

  if (issue && issue.kind === 'voided') {
    return (
      <div style={box} role="status">
        <strong style={{ color: '#059669' }}>{t('cardTerminal.void.doneTitle')}</strong>
        <div style={{ marginTop: 4 }}>{reasonText(issue.message)}</div>
        {issue.retry && (
          <div style={{ marginTop: 8 }}>
            <Button variant="secondary" onClick={onRetry}>{t('cardTerminal.retry')}</Button>
          </div>
        )}
      </div>
    );
  }

  if (issue && issue.kind === 'choose') {
    // 같은 와이파이에서 GHL 단말기가 여러 대 응답 — 아무 기기에나 보내지 않고 캐셔가 고른다
    return (
      <div style={box} role="alert">
        <strong style={{ color: '#0A2540' }}>{t('cardTerminal.chooseTitle')}</strong>
        <div style={{ marginTop: 4 }}>{t('cardTerminal.chooseHint')}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {(issue.hosts || []).map((h) => (
            <Button key={h} variant="secondary" onClick={() => onPickTerminal(h)}>{h}</Button>
          ))}
        </div>
      </div>
    );
  }

  if (issue) {
    return (
      <div style={box} role="alert">
        <strong style={{ color: '#DC2626' }}>
          {issue.kind === 'declined' ? t('cardTerminal.declined') : issue.kind === 'unknown' ? t('cardTerminal.unknown') : t('cardTerminal.error')}
        </strong>
        <div style={{ marginTop: 4 }}>{reasonText(issue.message)}</div>
        {issue.kind === 'unknown' && issue.txnId ? (
          <div style={{ marginTop: 10 }}>
            <div style={{ marginBottom: 6 }}>{t('cardTerminal.manualHint')}</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }} role="group" aria-label={t('cardTerminal.manualTender')}>
              {(['card', 'ewallet'] as const).map((m) => (
                <button key={m} type="button" aria-pressed={manualTender.method === m} style={chip(manualTender.method === m)}
                  onClick={() => onManualTender({ method: m, sub: '' })}>
                  {m === 'card' ? t('cardTerminal.manualCard') : t('cardTerminal.manualEwallet')}
                </button>
              ))}
            </div>
            {manualTender.method && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                {(manualTender.method === 'card' ? cardOptions : ewalletOptions).map((k) => (
                  <button key={k} type="button" aria-pressed={manualTender.sub === k} style={chip(manualTender.sub === k)}
                    onClick={() => onManualTender({ ...manualTender, sub: manualTender.sub === k ? '' : k })}>
                    {(manualTender.method === 'card' ? cardLabels : ewalletLabels)[k] || k}
                  </button>
                ))}
              </div>
            )}
            <FormTextArea
              value={note}
              onChange={(e) => onNote(e.target.value)}
              placeholder={t('cardTerminal.manualPlaceholder')}
              rows={2}
              maxLength={300}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={onRetry}>{t('cardTerminal.retry')}</Button>
              <Button variant="secondary" onClick={onVoid}>{t('cardTerminal.void.safeCancel')}</Button>
              <Button variant="primary" onClick={onManual}
                disabled={note.trim().length < 3 || !manualTender.method || (subRequired && !manualTender.sub)}>{t('cardTerminal.recordManually')}</Button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={onRetry}>{t('cardTerminal.retry')}</Button>
            {issue.kind === 'error' && issue.txnId ? (
              <Button variant="secondary" onClick={onVoid}>{t('cardTerminal.void.cancelThis')}</Button>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  if (ready) return <div style={box}>{t('cardTerminal.ready')}</div>;
  return <div style={box}>{reason === 'offline' ? t('cardTerminal.offline') : t('cardTerminal.noBridge')}</div>;
};

export default TerminalPanel;
