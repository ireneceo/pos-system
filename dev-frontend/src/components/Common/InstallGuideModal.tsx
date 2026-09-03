import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from '../UI';
import { usePwaInstall } from '../../contexts/PwaInstallContext';

/**
 * 앱 설치 안내 — **플랫폼별 단 하나의 안내 화면**.
 *
 * Irene 확정 정책(2026-09-03): 윈도우=데스크탑 앱 / 안드로이드=APK / iPad·Mac=PWA.
 *
 * 왜 만들었나(2026-09-03 Irene 보고):
 *  - 사이드바 "Install App" 이 iOS 에서 `alert()` 만 띄웠고, 아이패드에서 그 alert 가
 *    안 떠 "눌러도 아무 반응 없음" 이 됐다. `alert` 는 이 프로젝트 표준 밖이기도 하다.
 *  - 안드로이드는 APK 를 받아도 "알 수 없는 앱 설치 허용" 절차 안내가 없어 거기서 멈췄다.
 *  - 배너와 사이드바 버튼이 서로 다른 안내를 갖고 있었다 → 이 모달 하나를 둘이 공유한다.
 */
const InstallGuideModal: React.FC = () => {
  const { t } = useTranslation(['common']);
  const {
    installGuideOpen, closeInstallGuide, platform, safariMajor,
    canInstall, promptInstall, desktopAppUrl, androidAppUrl,
  } = usePwaInstall();

  if (!installGuideOpen) return null;

  const Step: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
    <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
      <span style={{
        flexShrink: 0, width: 22, height: 22, borderRadius: 11, background: '#F4F6F9',
        color: '#0A2540', fontSize: 12, fontWeight: 600, display: 'flex',
        alignItems: 'center', justifyContent: 'center', border: '1px solid #C7CED6',
      }}>{n}</span>
      <span style={{ fontSize: 14, color: '#0A2540', lineHeight: 1.5 }}>{children}</span>
    </li>
  );

  const body = (() => {
    if (platform === 'windows') {
      return (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <Step n={1}>{t('common:pwa.guide.windows.download', 'Download the Windows app installer below.')}</Step>
          <Step n={2}>{t('common:pwa.guide.windows.run', 'Run the downloaded file. If Windows shows a warning, choose "More info" then "Run anyway".')}</Step>
          <Step n={3}>{t('common:pwa.guide.windows.signIn', 'Sign in with the same account. Printers are set up inside the app.')}</Step>
        </ol>
      );
    }
    if (platform === 'android') {
      return (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <Step n={1}>{t('common:pwa.guide.android.download', 'Tap Download below to get the app file (.apk).')}</Step>
          <Step n={2}>{t('common:pwa.guide.android.open', 'Open it from the download notification, or from the Files app.')}</Step>
          <Step n={3}>{t('common:pwa.guide.android.allow', 'If Android asks to "allow installing unknown apps", turn it on for your browser, then go back.')}</Step>
          <Step n={4}>{t('common:pwa.guide.android.install', 'Tap Install, then open the app and sign in.')}</Step>
        </ol>
      );
    }
    if (platform === 'ios') {
      return (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <Step n={1}>{t('common:pwa.guide.ios.share', 'Tap the Share button in the browser toolbar.')}</Step>
          <Step n={2}>{t('common:pwa.guide.ios.add', 'Choose "Add to Home Screen".')}</Step>
          <Step n={3}>{t('common:pwa.guide.ios.open', 'Open it from the Home Screen — it runs in its own window.')}</Step>
        </ol>
      );
    }
    if (platform === 'mac') {
      // 크롬·엣지는 바로 설치가 되고, 사파리는 17+(macOS 14 Sonoma)부터 `파일 › Dock에 추가`.
      // macOS 버전은 UA 가 10_15_7 로 고정돼 못 읽으므로 **사파리 버전**으로 가른다.
      if (canInstall) {
        return <p style={{ fontSize: 14, color: '#0A2540', lineHeight: 1.6, margin: 0 }}>
          {t('common:pwa.guide.mac.chrome', 'Click Install below to add it as an app.')}
        </p>;
      }
      if (safariMajor !== null && safariMajor >= 17) {
        return (
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Step n={1}>{t('common:pwa.guide.mac.safariMenu', 'In Safari, choose File › Add to Dock.')}</Step>
            <Step n={2}>{t('common:pwa.guide.mac.safariName', 'Type a name and click Add.')}</Step>
            <Step n={3}>{t('common:pwa.guide.mac.safariOpen', 'Open it from the Dock — it runs in its own window.')}</Step>
          </ol>
        );
      }
      return <p style={{ fontSize: 14, color: '#0A2540', lineHeight: 1.6, margin: 0 }}>
        {t('common:pwa.guide.mac.useChrome', 'Open this site in Chrome or Edge to install it as an app. (Safari 17 or later can also add it from File › Add to Dock.)')}
      </p>;
    }
    return null;
  })();

  const primary = (() => {
    if (platform === 'windows') {
      return <ModalButton as="a" href={desktopAppUrl} variant="primary" onClick={closeInstallGuide}>
        {t('common:pwa.guide.downloadWindows', 'Download for Windows')}
      </ModalButton>;
    }
    if (platform === 'android') {
      return <ModalButton as="a" href={androidAppUrl} variant="primary" onClick={closeInstallGuide}>
        {t('common:pwa.guide.downloadAndroid', 'Download app')}
      </ModalButton>;
    }
    if (canInstall) {
      return <ModalButton variant="primary" onClick={async () => { await promptInstall(); closeInstallGuide(); }}>
        {t('common:pwa.guide.install', 'Install')}
      </ModalButton>;
    }
    return null;   // iOS·구형 Mac 사파리는 우리가 눌러 줄 수 있는 버튼이 없다(브라우저 제약)
  })();

  return (
    <Modal
      isOpen={installGuideOpen}
      onClose={closeInstallGuide}
      title={t('common:pwa.guide.title', 'Install the app') as string}
      size="small"
      footer={<>
        <ModalButton variant="secondary" onClick={closeInstallGuide}>
          {t('common:button.close', 'Close')}
        </ModalButton>
        {primary}
      </>}
    >
      {body}
    </Modal>
  );
};

export default InstallGuideModal;
