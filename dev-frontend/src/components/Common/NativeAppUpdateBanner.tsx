/**
 * 안드로이드 계산대 앱 «새 버전» 안내 카드 (Fable 설계 .claude/fable-design-20261004-android-update.md §4-3)
 * 앱 안 + 로그인 + 손님 화면 아님 일 때만. 강제 모달 아님 — «나중에» 는 그 버전·24시간.
 * 자리·모양은 PwaInstallBanner 와 같다(둘이 동시에 뜰 일은 없다 — 그쪽은 앱 안에서 안 뜬다).
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../UI/Button';
import { useNativeAppUpdate } from '../../hooks/useNativeAppUpdate';

const NativeAppUpdateBanner: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { inApp, feed, current, status, error, install, dismiss, dismissed } = useNativeAppUpdate();

  const isCustomerDisplayRoute = /\/(checkout-display|display)(\/|\?|$)/.test(location.pathname);
  if (!inApp || !isAuthenticated || isCustomerDisplayRoute || !feed) return null;
  if (!['available', 'installing', 'handoff', 'permission', 'error'].includes(status)) return null;
  if (dismissed && status === 'available') return null;

  const host = window.location.host;
  const body = status === 'handoff'
    ? t('common:nativeUpdate.handoff', "The browser opens and the download starts. When it finishes, tap 'Open' → 'Install'. The first time, turn on 'Allow from this source' for Chrome.")
    : status === 'permission'
      ? t('common:nativeUpdate.permission', "Turn on 'Allow from this source' for PurplePOS, then tap Update again.")
      : status === 'error'
        ? t('common:nativeUpdate.error', 'Could not verify the file ({{error}}). Try again later or download it from {{host}}/download.', { error, host })
        : status === 'installing'
          ? t('common:nativeUpdate.installing', 'Downloading…')
          : t('common:nativeUpdate.body', 'Now {{current}} → {{version}}. Your login and settings stay as they are.', { current: current.versionName || '?', version: feed.versionName });

  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, maxWidth: 360, zIndex: 900, background: '#fff', borderRadius: 12,
      boxShadow: '0 10px 30px rgba(10,37,64,0.15)', border: '1px solid #C7CED6', padding: 16,
    }} data-testid="native-update-banner">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
        <button
          type="button" onClick={dismiss}
          title={t('common:nativeUpdate.later', 'Later') as string} aria-label={t('common:nativeUpdate.later', 'Later') as string}
          style={{
            position: 'absolute', top: -4, right: -4, width: 28, height: 28, borderRadius: 6, border: '1px solid #C7CED6',
            background: 'white', color: '#4B5563', fontSize: 18, lineHeight: 1, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >×</button>
        <img src="/logo192.png" alt="" width={40} height={40} style={{ borderRadius: 8 }} />
        <div style={{ flex: 1, minWidth: 0, paddingRight: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#0A2540', marginBottom: 4 }}>
            {t('common:nativeUpdate.title', 'New Purple POS version {{version}}', { version: feed.versionName })}
          </div>
          <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5 }}>{body}</div>
          {status === 'handoff' && (
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>
              {t('common:nativeUpdate.handoffFallback', "If the browser doesn't open, go to {{host}}/download in Chrome on this tablet.", { host })}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Button variant="primary" size="small" disabled={status === 'installing'} onClick={install}>
              {status === 'handoff' || status === 'error' || status === 'permission'
                ? t('common:nativeUpdate.retry', 'Try again')
                : t('common:nativeUpdate.update', 'Update')}
            </Button>
            <Button variant="secondary" size="small" onClick={dismiss}>{t('common:nativeUpdate.later', 'Later')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NativeAppUpdateBanner;

/**
 * 설정 › 프린터 › Android 카드 첫 줄 — 배너를 닫아도 업데이트로 가는 상시 길 (설계 §4-4).
 * 피드를 못 읽으면 줄 자체를 생략(에러 표시 금지 — 피드가 없는 dev 상태도 정상).
 */
export const NativeAppVersionRow: React.FC = () => {
  const { t } = useTranslation();
  const { inApp, feed, current, status, install } = useNativeAppUpdate();
  if (!inApp || !feed) return null;
  const available = status === 'available' || status === 'handoff' || status === 'permission' || status === 'error' || status === 'installing';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 13, color: '#4B5563', marginBottom: 12 }} data-testid="native-version-row">
      <span>
        {t('common:nativeUpdate.row', 'App version {{current}} · latest {{latest}}', { current: current.versionName || '?', latest: feed.versionName })}
      </span>
      {available ? (
        <Button variant="primary" size="small" disabled={status === 'installing'} onClick={install}>
          {t('common:nativeUpdate.update', 'Update')}
        </Button>
      ) : (
        <span style={{ color: '#059669', fontWeight: 600 }}>✓ {t('common:nativeUpdate.upToDate', 'Up to date')}</span>
      )}
    </div>
  );
};
