import React, { useState } from 'react';
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
      접수되었습니다 (#{String(ticket)}). 확인 후 연락드리겠습니다.
    </p>;
  }
  if (state === 'dup') {
    return <p style={{ color: '#4B5563', fontSize: 13, marginTop: 18 }}>이 오류는 이미 접수했습니다.</p>;
  }
  if (state === 'noauth') {
    return <p style={{ color: '#4B5563', fontSize: 13, marginTop: 18 }}>로그인 후 문의 메뉴에서 보내 주세요.</p>;
  }

  return (
    <div style={{ marginTop: 22, textAlign: 'left' }}>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="무엇을 하던 중이었나요? (선택)"
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
        {state === 'sending' ? '보내는 중…' : '이 오류 보내기'}
      </button>
      {state === 'failed' && (
        <p style={{ color: '#B91C1C', fontSize: 12, marginTop: 8 }}>
          보내지 못했습니다. 문의 메뉴에서 직접 남겨 주세요.
        </p>
      )}
      <p style={{ color: '#6B7280', fontSize: 11, marginTop: 8, lineHeight: 1.5 }}>
        오류 내용·화면·계정·앱 버전이 함께 전송됩니다.
      </p>
    </div>
  );
};

export default CrashReportBox;
