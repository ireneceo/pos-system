import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { applyLoginAndReload } from '../../utils/demoAccountSwitch';

/**
 * 개발서버 전용 — 상황판 «시험 계정으로 열기» 도착 화면 (규격 ~/dev-server/kit/DEV-LOGIN.md).
 * 상황판이 #code=… 를 붙여 보낸다 → 주소창에서 바로 지우고 → 서버가 검증 → 데모 계정 토큰 저장 →
 * 서버 응답의 next(주소창 값 아님)로 이동. 운영 호스트에서는 아무것도 하지 않고 첫 화면으로 보낸다.
 */

const IS_DEV_HOST = typeof window !== 'undefined'
  && /^(localhost|127\.0\.0\.1|dev\.)/.test(window.location.hostname);

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  background: var(--pos-bg, #F6F9FC);
`;

const Message = styled.p<{ $error?: boolean }>`
  margin: 0;
  max-width: 480px;
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
  color: ${p => (p.$error ? '#EF4444' : 'var(--pos-text, #0A2540)')};

  a { color: #635BFF; }
`;

const DevLoginPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!IS_DEV_HOST) return;
    const code = new URLSearchParams(window.location.hash.slice(1)).get('code');
    window.history.replaceState(null, '', window.location.pathname);
    if (!code) { setError('invalid_code'); return; }
    (async () => {
      try {
        const res = await fetch('/api/auth/dev-login', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        const body = await res.json().catch(() => null);
        if (!res.ok || !body?.success || !body.data) {
          setError(body?.error || String(res.status));
          return;
        }
        applyLoginAndReload(body.data, body.data.dev_login?.next);
      } catch (e: any) {
        setError(e?.message || 'network');
      }
    })();
  }, []);

  if (!IS_DEV_HOST) return <Navigate to="/" replace />;

  return (
    <Page>
      {error ? (
        <Message $error>
          {t('devLogin.failed', { reason: error })} <a href="/pos">{t('devLogin.normalLogin')}</a>
        </Message>
      ) : (
        <Message>{t('devLogin.signingIn')}</Message>
      )}
    </Page>
  );
};

export default DevLoginPage;
