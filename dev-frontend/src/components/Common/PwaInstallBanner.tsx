import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { usePwaInstall } from '../../contexts/PwaInstallContext';

/**
 * PWA Install Banner
 * - Android/Chromium: uses beforeinstallprompt event → "Install" CTA.
 * - iOS Safari: shows step-by-step guide (Share → Add to Home Screen).
 * - Hidden when already running standalone or dismissed within 3 days (localStorage).
 * - Sidebar footer always has an "Install App" link → permanent re-entry path.
 */
const PwaInstallBanner: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { canInstall, isIOS, iosVersion, promptInstall, dismissBanner, shouldShowBanner } = usePwaInstall();

  // POS 시스템 안에서만 노출 (랜딩 / 블로그 / 공개 페이지 제외).
  // 랜딩 사용자에겐 /install 페이지가 안내 역할이고, 가입 후 첫 진입 시 배너로 알림.
  const isPosRoute = location.pathname.startsWith('/pos');
  if (!isPosRoute) return null;
  if (!shouldShowBanner) return null;

  const handleInstall = async () => {
    if (canInstall) {
      const outcome = await promptInstall();
      if (outcome === 'accepted') dismissBanner(365);
    }
  };

  const handleDismiss = () => dismissBanner();

  const oldIos = isIOS && iosVersion !== null && iosVersion < 16;

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      maxWidth: 360,
      zIndex: 9000,
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 10px 30px rgba(10,37,64,0.15)',
      border: '1px solid #C7CED6',
      padding: 16
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
        <button
          type="button"
          onClick={handleDismiss}
          title={t('common:pwa.installBanner.dismissButton')}
          aria-label={t('common:pwa.installBanner.dismissButton')}
          style={{
            position: 'absolute', top: -4, right: -4, width: 28, height: 28,
            borderRadius: 6, border: '1px solid #C7CED6', background: 'white', color: '#4B5563',
            fontSize: 18, lineHeight: 1, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
          }}
        >×</button>
        <img src="/logo192.png" alt="" width={40} height={40} style={{ borderRadius: 8 }} />
        <div style={{ flex: 1, minWidth: 0, paddingRight: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#0A2540', marginBottom: 4 }}>
            {t('common:pwa.installBanner.title')}
          </div>
          <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5 }}>
            {isIOS
              ? (oldIos
                  ? t('common:pwa.installBanner.iosOldGuide')
                  : t('common:pwa.installBanner.iosGuide'))
              : t('common:pwa.installBanner.androidDesktopGuide')}
          </div>

          {canInstall && !isIOS && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button
                type="button"
                onClick={handleInstall}
                style={{
                  background: '#635BFF',
                  color: '#fff',
                  border: '1px solid #635BFF',
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                {t('common:pwa.installBanner.installButton')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PwaInstallBanner;
