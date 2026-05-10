import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import LandingHeader from '../../components/Landing/LandingHeader';
import LandingFooter from '../../components/Landing/LandingFooter';
import { usePwaInstall } from '../../contexts/PwaInstallContext';

const InstallPage: React.FC = () => {
  const { t } = useTranslation();
  const { canInstall, isStandalone, isIOS, iosVersion, promptInstall } = usePwaInstall();

  const platform = useMemo(() => {
    if (typeof navigator === 'undefined') return 'desktop';
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return 'android';
    if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
    if (/Mac OS X/i.test(ua)) return 'macos';
    if (/Windows/i.test(ua)) return 'windows';
    return 'desktop';
  }, []);

  const oldIos = isIOS && iosVersion !== null && iosVersion < 16;
  const noPushIos = isIOS && iosVersion !== null && iosVersion < 16; // strict: 16.4+ for push, banner already handles it

  return (
    <>
      <LandingHeader />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#0A2540', marginBottom: 16 }}>
          {t('landing:installPage.title')}
        </h1>
        <p style={{ fontSize: 18, color: '#6B7C93', lineHeight: 1.7, marginBottom: 32 }}>
          {t('landing:installPage.subtitle')}
        </p>

        {isStandalone && (
          <div style={{
            background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 12,
            padding: 20, color: '#065F46', marginBottom: 32, fontSize: 15
          }}>
            {t('landing:installPage.alreadyInstalled')}
          </div>
        )}

        {/* Quick install button */}
        {canInstall && !isStandalone && (
          <div style={{ marginBottom: 32 }}>
            <button
              type="button"
              onClick={() => promptInstall()}
              style={{
                background: '#635BFF', color: '#fff', border: 'none',
                padding: '14px 24px', borderRadius: 10, fontSize: 16, fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {t('landing:installPage.installNow')}
            </button>
          </div>
        )}

        {/* Per-platform guides */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#0A2540', marginBottom: 12 }}>
            {t(`landing:installPage.${platform}.heading`)}
          </h2>
          <ol style={{ fontSize: 15, color: '#0A2540', lineHeight: 1.8, paddingLeft: 22 }}>
            <li>{t(`landing:installPage.${platform}.step1`)}</li>
            <li>{t(`landing:installPage.${platform}.step2`)}</li>
            <li>{t(`landing:installPage.${platform}.step3`)}</li>
          </ol>
        </section>

        {noPushIos && (
          <div style={{
            background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 12,
            padding: 16, color: '#92400E', marginBottom: 32, fontSize: 14, lineHeight: 1.6
          }}>
            {t('landing:installPage.iosOldPushWarning')}
          </div>
        )}

        {/* Feature highlights */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 40 }}>
          {(['feature1', 'feature2', 'feature3'] as const).map(key => (
            <div key={key} style={{
              background: '#fff', border: '1px solid #E6EBF1', borderRadius: 12, padding: 20
            }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#0A2540', marginBottom: 8 }}>
                {t(`landing:installPage.features.${key}.title`)}
              </div>
              <div style={{ fontSize: 14, color: '#6B7C93', lineHeight: 1.6 }}>
                {t(`landing:installPage.features.${key}.desc`)}
              </div>
            </div>
          ))}
        </section>
      </main>
      <LandingFooter />
    </>
  );
};

export default InstallPage;
