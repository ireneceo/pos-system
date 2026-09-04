import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reportIssue } from '../../utils/reportIssue';

/**
 * 크래시 화면의 "이 오류 보내기" — 누르면 문의가 **바로 접수**된다.
 *
 * Irene 2026-09-03: "오류 있는 거 바로 바로 넣기 편하면 좋겠는데."
 * 이 컴포넌트는 크래시한 트리 **밖**(ErrorBoundary fallback)에서 그려지므로
 * 컨텍스트·i18n·공용 UI 에 기대지 않는다 — 그것들이 이미 깨졌을 수 있다.
 * 그래서 문구가 하드코딩이고 스타일이 인라인이다(이 파일에 한해 표준 예외).
 */
const CrashReportBox: React.FC<{ error: Error | null; componentStack: string | null }> = ({ error, componentStack }) => {
  const [note, setNote] = useState('');
  // 크래시 화면도 사용자 언어로 나와야 한다 — 영어 선택인데 한글이 나오던 것(2026-09-04 Irene 신고).
  const { t } = useTranslation('common');

  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'dup' | 'noauth' | 'failed'>('idle');
  const [ticket, setTicket] = useState<string | number | null>(null);

  const send = async () => {
    setState('sending');
    const r = await reportIssue({ error, componentStack, note: note.trim() || undefined });
    if (r.ok) { setTicket(r.id); setState('sent'); return; }
    setState(r.reason === 'no-token' ? 'noauth' : r.reason === 'duplicate' ? 'dup' : 'failed');
  };

  if (state === 'sent') {
    return <p style={{ color: '#166534', fontSize: 13, marginTop: 18 }}>
      {t('crashReport.sent', 'Received (#{{ticket}}). We will follow up.', { ticket: String(ticket) })}
    </p>;
  }
  if (state === 'dup') {
    return <p style={{ color: '#4B5563', fontSize: 13, marginTop: 18 }}>{t('crashReport.dup', 'This error was already reported.')}</p>;
  }
  if (state === 'noauth') {
    return <p style={{ color: '#4B5563', fontSize: 13, marginTop: 18 }}>{t('crashReport.noauth', 'Please sign in and use the Support menu.')}</p>;
  }

  return (
    <div style={{ marginTop: 22, textAlign: 'left' }}>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t('crashReport.placeholder', 'What were you doing? (optional)')}
        style={{
          width: '100%', boxSizing: 'border-box', padding: '9px 12px', fontSize: 13,
          border: '1px solid #C7CED6', borderRadius: 8, background: '#fff', color: '#0A2540',
        }}
      />
      <button
        onClick={send}
        disabled={state === 'sending'}
        style={{
          marginTop: 10, width: '100%', padding: '10px 16px', fontSize: 14, fontWeight: 600,
          background: '#fff', color: '#0A2540', border: '1px solid #C7CED6', borderRadius: 8,
          cursor: state === 'sending' ? 'default' : 'pointer',
        }}
      >
        {state === 'sending' ? t('crashReport.sending', 'Sending…') : t('crashReport.send', 'Send this error')}
      </button>
      {state === 'failed' && (
        <p style={{ color: '#B91C1C', fontSize: 12, marginTop: 8 }}>
          {t('crashReport.failed', "Couldn't send. Please report it from the Support menu.")}
        </p>
      )}
      <p style={{ color: '#6B7280', fontSize: 11, marginTop: 8, lineHeight: 1.5 }}>
        {t('crashReport.note', 'The error, screen, account and app version are sent together.')}
      </p>
    </div>
  );
};

export default CrashReportBox;
