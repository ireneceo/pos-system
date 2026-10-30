import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from '../UI';
import { QRCodeSVG } from 'qrcode.react';
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
    installGuideOpen, closeInstallGuide, platform, safariMajor, iosBrowser, isIPad, iosVersion,
    canInstall, promptInstall, desktopAppUrl, androidAppUrl,
  } = usePwaInstall();
  const [copied, setCopied] = useState(false);

  if (!installGuideOpen) return null;

  const copyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // 앱 안 브라우저는 clipboard API 가 막혀 있기도 하다 — 옛 방식으로 한 번 더.
      const ta = document.createElement('textarea');
      ta.value = url; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch { /* 복사 못 해도 안내 문구는 그대로 */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
  };

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
      // 2026-10-30 Irene «아이폰인데 제대로 다운이 안돼» — 예전 안내는 «아래쪽 공유 버튼» 하나였다.
      // iOS 26 사파리는 공유가 ••• 안에 있고, 크롬은 주소창 오른쪽, 카톡·인스타 안 브라우저는 홈 화면 추가가 아예 없다.
      // 크롬·엣지·파이어폭스의 «홈 화면에 추가» 는 iOS 16.4 부터 — 그 전이면 사파리로 보낸다.
      const needSafari = iosBrowser === 'kakao' || iosBrowser === 'inapp'
        || (iosBrowser !== 'safari' && iosVersion !== null && iosVersion < 17);
      if (needSafari) {
        return (
          <>
            <p style={{ fontSize: 14, color: '#0A2540', lineHeight: 1.6, margin: '0 0 12px' }}>
              {iosBrowser === 'kakao' || iosBrowser === 'inapp'
                ? t('common:pwa.guide.ios.inApp', "This page is open inside another app, which can't add it to your Home Screen. Open it in Safari first.")
                : t('common:pwa.guide.ios.oldBrowser', 'On this iOS version only Safari can add it to your Home Screen. Open it in Safari first.')}
            </p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <Step n={1}>{iosBrowser === 'kakao'
                ? t('common:pwa.guide.ios.kakaoOpen', 'Tap "Open in Safari" below.')
                : t('common:pwa.guide.ios.copyOpen', 'Tap "Copy link" below, open Safari, and paste it into the address bar.')}</Step>
              <Step n={2}>{t('common:pwa.guide.ios.thenFollow', 'In Safari, open this install guide again (How to install) and follow the steps.')}</Step>
            </ol>
          </>
        );
      }
      const shareStep = (() => {
        if (iosBrowser === 'chrome') return t('common:pwa.guide.ios.shareChrome', 'Tap the Share button (square with an arrow) at the right end of the address bar.');
        if (iosBrowser === 'edge' || iosBrowser === 'firefox') return t('common:pwa.guide.ios.shareMenu', 'Open the browser menu (☰ or •••) at the bottom, then tap Share.');
        if (isIPad) return t('common:pwa.guide.ios.shareIPad', 'Tap the Share button (square with an arrow) at the top right, next to the address bar.');
        if (safariMajor !== null && safariMajor >= 26) return t('common:pwa.guide.ios.share26', 'Tap ••• at the bottom right, next to the address bar, then tap Share.');
        return t('common:pwa.guide.ios.shareSafari', 'Tap the Share button (square with an arrow) at the bottom of the screen. If the bar is hidden, scroll up a little.');
      })();
      return (
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <Step n={1}>{shareStep}</Step>
          <Step n={2}>{t('common:pwa.guide.ios.addScroll', 'Scroll down the list and choose "Add to Home Screen". (Not there? Tap "View More" or "Edit Actions" at the bottom of the list.)')}</Step>
          <Step n={3}>{t('common:pwa.guide.ios.addConfirm', 'If you see "Open as Web App", leave it on, then tap Add at the top right.')}</Step>
          <Step n={4}>{t('common:pwa.guide.ios.open', 'Open it from the Home Screen — it runs in its own window.')}</Step>
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
    if (platform === 'ios' && iosBrowser === 'kakao') {
      // 카카오톡 안 브라우저 → 기기 기본 브라우저(사파리)로 같은 주소를 연다.
      return <ModalButton as="a" href={`kakaotalk://web/openExternal?url=${encodeURIComponent(window.location.href)}`} variant="primary">
        {t('common:pwa.guide.ios.openSafari', 'Open in Safari')}
      </ModalButton>;
    }
    if (platform === 'ios' && (iosBrowser === 'inapp' || (iosBrowser !== 'safari' && iosVersion !== null && iosVersion < 17))) {
      return <ModalButton variant="primary" onClick={copyLink}>
        {copied ? t('common:pwa.guide.ios.copied', 'Link copied') : t('common:pwa.guide.ios.copyLink', 'Copy link')}
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
      onClose={() => { setCopied(false); closeInstallGuide(); }}
      title={t('common:pwa.guide.title', 'Install the app') as string}
      size="small"
      footer={<>
        <ModalButton variant="secondary" onClick={() => { setCopied(false); closeInstallGuide(); }}>
          {t('common:button.close', 'Close')}
        </ModalButton>
        {primary}
      </>}
    >
      {body}
      {/* 2026-10-11 Irene «웹에서 쓰다가 앱 사용하고 싶을 때 주소 치고 안들어가고 바로 접속하게» —
          컴퓨터에서 연 안내에만, 안드로이드 기기로 찍으면 같은 APK 가 바로 받아진다. */}
      {(platform === 'windows' || platform === 'mac') && (
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 16, paddingTop: 16, borderTop: '1px solid #E3E8EE' }}>
          <QRCodeSVG value={`${window.location.origin}${androidAppUrl}`} size={104} level="M" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: '#425466', lineHeight: 1.5 }}>
            {t('common:pwa.guide.qrAndroid', 'Installing on an Android tablet or phone? Scan this with its camera to download the app — no need to type the address.')}
          </span>
        </div>
      )}
    </Modal>
  );
};

export default InstallGuideModal;
