import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePwaInstall } from '../../contexts/PwaInstallContext';

/**
 * PWA Install Banner
 * - Android/Chromium: uses beforeinstallprompt event → "Install" CTA.
 * - iOS Safari: shows step-by-step guide (Share → Add to Home Screen).
 * - Hidden when already running standalone or dismissed within 7 days (localStorage).
 *
 * Improvement over PlanQ: localStorage-based 7-day dismiss instead of sessionStorage,
 * so users who dismissed do not see it on every new tab.
 */
const PwaInstallBanner: React.FC = () => {
  const { t } = useTranslation();
  const { canInstall, isIOS, iosVersion, promptInstall, dismissBanner, shouldShowBanner } = usePwaInstall();

  if (!shouldShowBanner) return null;

  const handleInstall = async () => {
    if (canInstall) {
      const outcome = await promptInstall();
      if (outcome === 'accepted') dismissBanner(365);
    }
  };

  const handleDismiss = () => dismissBanner(7);

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
      border: '1px solid #E6EBF1',
      padding: 16
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <img src="/logo192.png" alt="" width={40} height={40} style={{ borderRadius: 8 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#0A2540', marginBottom: 4 }}>
            {t('common:pwa.installBanner.title')}
          </div>
          <div style={{ fontSize: 13, color: '#6B7C93', lineHeight: 1.5 }}>
            {isIOS
              ? (oldIos
                  ? t('common:pwa.installBanner.iosOldGuide')
                  : t('common:pwa.installBanner.iosGuide'))
              : t('common:pwa.installBanner.androidDesktopGuide')}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {canInstall && !isIOS && (
              <button
                type="button"
                onClick={handleInstall}
                style={{
                  background: '#635BFF',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {t('common:pwa.installBanner.installButton')}
              </button>
            )}
            <button
              type="button"
              onClick={handleDismiss}
              style={{
                background: 'transparent',
                color: '#6B7C93',
                border: '1px solid #E6EBF1',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              {t('common:pwa.installBanner.dismissButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallBanner;
