/**
 * 이메일 인증 안내 + 재발송 — **단일 소스**.
 *
 * 왜 뽑았나 (2026-09-15 Irene 「다른 곳에 있는 거 찾아서 똑같이 해」):
 *   같은 안내가 알림 설정 화면에만 있고 Profile 에는 아예 없었다. 그런데 이메일을 실제로
 *   바꾸는 자리는 Profile 이다 — 거기서 주소를 바꾸면 서버가 `email_verified=false` 로
 *   내리고 인증메일을 보내는데(`routes/users.js:815, 900~902`), 화면엔 아무 표시가 없어
 *   **자기 알림이 꺼진 걸 모른 채** 지내게 된다.
 *   두 화면에 같은 마크업을 복붙하면 한쪽만 고쳐지는 게 시간문제라 컴포넌트 하나로 둔다.
 *
 * 문구 키는 `notifications:notificationSettingsPage.*` 를 **그대로 쓴다** — 이미 4개 언어에
 * 다 들어 있고, 키를 옮기면 번역 4벌을 다시 깔아야 한다(내용은 같은 문장).
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  /** 표시 대상 주소. 없으면 아무것도 그리지 않는다. */
  email?: string | null;
  /** 이미 인증됐으면 그리지 않는다. `undefined`(모름)일 때도 그리지 않는다. */
  emailVerified?: boolean;
  /** 데모·테스트 계정은 제외(합성 주소라 인증할 수 없다). */
  isDemo?: boolean;
  isTest?: boolean;
  style?: React.CSSProperties;
}

const EmailVerificationNotice: React.FC<Props> = ({ email, emailVerified, isDemo, isTest, style }) => {
  const { t } = useTranslation(['notifications']);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<'idle' | 'sent' | 'error'>('idle');

  if (emailVerified !== false) return null;
  if (isDemo || isTest) return null;
  if (!email) return null;

  const handleResend = async () => {
    if (sending) return;
    setSending(true);
    setResult('idle');
    try {
      const r = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setResult(r.ok ? 'sent' : 'error');
    } catch (e) {
      setResult('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{
      margin: '0 0 16px', padding: '14px 16px', background: '#FEF3C7',
      border: '1px solid #F59E0B', borderRadius: 8, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
      ...style
    }}>
      <div style={{ fontSize: 14, color: '#92400E', fontWeight: 600 }}>
        {result === 'sent'
          ? t('notifications:notificationSettingsPage.verifySent', { defaultValue: 'Verification email sent. Check your inbox.' })
          : result === 'error'
            ? t('notifications:notificationSettingsPage.verifySendFailed', { defaultValue: 'Could not send the verification email. Please try again.' })
            : t('notifications:notificationSettingsPage.verifyEmailNotice', { defaultValue: 'Your email is not verified — verify it to receive email notifications.' })}
      </div>
      {result !== 'sent' && (
        <button type="button" onClick={handleResend} disabled={sending}
          style={{
            padding: '8px 14px', background: '#635BFF', color: '#fff', border: 'none',
            borderRadius: 6, fontWeight: 600, fontSize: 13,
            cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.6 : 1
          }}>
          {sending
            ? t('notifications:notificationSettingsPage.sending', { defaultValue: 'Sending…' })
            : t('notifications:notificationSettingsPage.resendVerification', { defaultValue: 'Resend verification' })}
        </button>
      )}
    </div>
  );
};

export default EmailVerificationNotice;
