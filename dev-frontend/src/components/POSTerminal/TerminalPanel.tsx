/**
 * 결제 창 안의 카드단말기 상태 칸 (2026-10-01 GHL ECR · .claude/fable-design-20261001-ghl-ecr.md §3-3).
 * 진행 중 안내 · 거절 사유 · 결과 미확인 시 «단말기 영수증 보고 수동 기록»(사유 필수).
 * POS 측에서 단말기 거래를 취소하는 명령은 1단계에 없다 — 취소는 단말기에서 하라고 안내만 한다.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ModalButton as Button, FormTextArea } from '../UI/Modal';
import type { TerminalPhase } from '../../utils/terminalSale';

interface Props {
  busy: TerminalPhase | null;
  ready: boolean;
  reason: 'no-bridge' | 'offline' | null;
  issue: { kind: 'declined' | 'unknown' | 'error'; message: string; txnId?: number } | null;
  note: string;
  onNote: (v: string) => void;
  onManual: () => void;
  onRetry: () => void;
}

const box: React.CSSProperties = { fontSize: '13px', lineHeight: 1.5, color: '#425466' };

const TerminalPanel: React.FC<Props> = ({ busy, ready, reason, issue, note, onNote, onManual, onRetry }) => {
  const { t } = useTranslation('pos');
  // 'reason:<키>' 는 번역, 'reason:code:<코드>' 는 단말기 코드 안내, 그 외(서버·단말기 문구)는 그대로
  const reasonText = (m: string) => {
    if (m.startsWith('reason:code:')) return t('cardTerminal.reason.code', { code: m.slice(12) });
    if (m.startsWith('reason:')) return t(`cardTerminal.reason.${m.slice(7)}`);
    return m;
  };

  if (busy) {
    const text = busy === 'recovering' ? t('cardTerminal.recovering')
      : busy === 'checking' ? t('cardTerminal.checking')
      : busy === 'starting' ? t('cardTerminal.starting')
      : t('cardTerminal.waiting');
    return (
      <div style={box} role="status" aria-live="polite">
        <strong style={{ color: '#0A2540' }}>{text}</strong>
        <div style={{ marginTop: 4 }}>{t('cardTerminal.cancelOnTerminal')}</div>
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
            <FormTextArea
              value={note}
              onChange={(e) => onNote(e.target.value)}
              placeholder={t('cardTerminal.manualPlaceholder')}
              rows={2}
              maxLength={300}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={onRetry}>{t('cardTerminal.retry')}</Button>
              <Button variant="primary" onClick={onManual} disabled={note.trim().length < 3}>{t('cardTerminal.recordManually')}</Button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 8 }}>
            <Button variant="secondary" onClick={onRetry}>{t('cardTerminal.retry')}</Button>
          </div>
        )}
      </div>
    );
  }

  if (ready) return <div style={box}>{t('cardTerminal.ready')}</div>;
  return <div style={box}>{reason === 'offline' ? t('cardTerminal.offline') : t('cardTerminal.noBridge')}</div>;
};

export default TerminalPanel;
