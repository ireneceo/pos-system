/**
 * 직원 로그인 화면(/pos) 앞 관문 — 등록된 키오스크 기기는 로그인 화면 대신 그 매장 키오스크로 연다.
 * (Fable 판정 .claude/fable-verdict-20261007-kiosk-payment-split.md D2 «앱 시작»)
 *
 * 안드로이드 앱은 시작 주소가 /pos 로 고정이다. 키오스크로 등록한 태블릿은 앱을 켜면 바로 손님 주문 화면이 된다.
 * 직원 로그인이 남아 있으면(등록 직후 로그아웃 실패 등) 가로채지 않는다 — 직원 화면을 손님 화면으로 덮지 않게.
 * 매장이 등록을 해제하면(httpClient 가 401 KIOSK_REVOKED 를 받아 /pos?kiosk_revoked=1 로 보냄) 안내 한 줄을 보인다.
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { hasKioskToken, kioskHomePath } from '../../utils/kioskDevice';

const KioskEntryGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation('settings');
  const location = useLocation();
  const home = hasKioskToken() && !getAuthToken() ? kioskHomePath() : null;
  if (home) return <Navigate to={home} replace />;
  const revoked = new URLSearchParams(location.search).get('kiosk_revoked') === '1';
  return (
    <>
      {revoked && (
        <div role="status" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '12px 16px', background: '#FEF3C7', color: '#92400E', fontSize: 14, textAlign: 'center' }}>
          {t('settingsPage.kioskDevices.revokedNotice')}
        </div>
      )}
      {children}
    </>
  );
};

export default KioskEntryGate;
