/**
 * Download — 계산대 앱 받기 (2026-10-04 Irene 「랜딩페이지에 다운로드 메뉴를 추가해」).
 * 파일은 배포가 /desktop 에 올려 둔 것을 그대로 가리킨다 — 안드로이드 PurplePOS.apk(최신 별칭) ·
 * Windows PurplePOS-Setup.exe(최신 별칭, PwaInstallContext 와 같은 주소). 버전 숫자를 여기 박지 않는다.
 * 2026-10-15 Irene «아이폰 다른 데스크탑에서 pwa로 다운로드 하는것도 안내해야지» — 아래 «웹 앱» 칸.
 * 설치 정책(InstallGuideModal 과 같음): 윈도우=데스크탑 앱 / 안드로이드=APK / iPhone·iPad·Mac·그 밖=PWA.
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
import { Button } from '../../components/UI/Button';
import { QRCodeSVG } from 'qrcode.react';
import { usePwaInstall } from '../../contexts/PwaInstallContext';

const Wrap = styled.div`max-width: 960px; margin: 0 auto; padding: 48px 16px 72px;`;
const H1 = styled.h1`font-size: 34px; color: #0A2540; margin: 0 0 10px; @media (max-width: 600px) { font-size: 27px; }`;
const Lead = styled.p`font-size: 17px; color: #6B7C93; margin: 0 0 32px; max-width: 64ch;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; @media (max-width: 720px) { grid-template-columns: 1fr; }`;
const Card = styled.section`border: 1px solid #E3E8EE; border-radius: 12px; padding: 24px; background: #fff; display: grid; gap: 12px; align-content: start;`;
const Glyph = styled.div`font-size: 26px; color: #635BFF; line-height: 1;`;
const H2 = styled.h2`font-size: 20px; color: #0A2540; margin: 0;`;
const P = styled.p`font-size: 15px; color: #425466; margin: 0; line-height: 1.6;`;
const Small = styled.p`font-size: 13px; color: #6B7C93; margin: 0;`;
// 컴퓨터로 보는 사람만(마우스 + 넓은 화면) — 태블릿·휴대폰에선 그 자리에서 받으면 되니 숨긴다.
const QrRow = styled.div`
  display: none; align-items: center; gap: 14px; padding-top: 12px; border-top: 1px solid #E3E8EE;
  @media (hover: hover) and (pointer: fine) and (min-width: 721px) { display: flex; }
`;

// 웹 앱 칸은 한 줄 전체 — 안에서 «iPhone·iPad» / «Mac·그 밖의 컴퓨터» 두 갈래.
// 아이폰·아이패드·맥으로 연 사람에겐 이 칸이 답이라 맨 위로(안드로이드·윈도우 칸은 그 기기에서 못 쓴다).
const WideCard = styled(Card)<{ $first: boolean }>`grid-column: 1 / -1; order: ${p => (p.$first ? -1 : 0)};`;
const WebGrid = styled.div`display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; @media (max-width: 720px) { grid-template-columns: 1fr; }`;
const H3 = styled.h3`font-size: 16px; color: #0A2540; margin: 0 0 8px;`;
const Steps = styled.ol`margin: 0; padding-left: 20px; display: grid; gap: 6px; font-size: 15px; color: #425466; line-height: 1.6;`;
const Addr = styled.a`color: #635BFF; font-weight: 600; overflow-wrap: anywhere;`;

// 홈 화면에 추가할 때 열려 있던 주소가 아이콘이 된다(iOS 사파리) — 그래서 이 안내 페이지가 아니라 로그인 화면을 열게 한다.
const WEB_APP_PATH = '/pos';

const DownloadPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const go = (href: string) => { window.location.href = href; };
  const { platform, canInstall, promptInstall, isStandalone } = usePwaInstall();
  const webAppUrl = `${window.location.origin}${WEB_APP_PATH}`;
  const webAppLabel = `${window.location.host}${WEB_APP_PATH}`;
  // 크롬·엣지가 «설치» 를 허락한 Mac·그 밖의 컴퓨터만 바로 설치 버튼(윈도우·안드로이드의 canInstall 은 앱 파일 받기라 제외).
  const canPromptWebApp = canInstall && !isStandalone && (platform === 'mac' || platform === 'other');
  return (
    <LandingLayout>
      <SEOHead
        title={t('download.seoTitle', 'Download the PurpleHere POS app')}
        description={t('download.subtitle', 'Install the counter app on your Android tablet or Windows PC. It connects your printers and card terminal.')}
      />
      <Wrap>
        <H1>{t('download.title', 'Download the PurpleHere POS app')}</H1>
        <Lead>{t('download.subtitle', 'Install the counter app on your Android tablet or Windows PC. It connects your printers and card terminal.')}</Lead>
        <Grid>
          <Card>
            <Glyph aria-hidden="true">▯</Glyph>
            <H2>{t('download.android.title', 'Android tablet')}</H2>
            <P>{t('download.android.desc', 'For counter tablets. Prints to network and Bluetooth printers and connects to the card terminal on the same Wi-Fi.')}</P>
            <div><Button variant="primary" onClick={() => go('/desktop/PurplePOS.apk')}>{t('download.android.button', 'Download for Android')}</Button></div>
            <Small>{t('download.android.note', 'Open the file on the tablet and allow installation from this source once. Installing over an older version keeps your login and settings.')}</Small>
            {/* 2026-10-11 Irene «데스크탑이면 모바일로 찍을 수 있는 QR도» — 주소 그대로 APK 를 가리킨다(위 버튼과 같은 파일). */}
            <QrRow>
              <QRCodeSVG value={`${window.location.origin}/desktop/PurplePOS.apk`} size={104} level="M" includeMargin={false} style={{ flexShrink: 0 }} />
              <Small>{t('download.android.qr', "On a computer? Scan this with your tablet's camera to download it there — no need to type the address.")}</Small>
            </QrRow>
          </Card>
          <Card>
            <Glyph aria-hidden="true">▭</Glyph>
            <H2>{t('download.windows.title', 'Windows PC')}</H2>
            <P>{t('download.windows.desc', 'For counter PCs. Prints to your USB and network printers directly from the POS.')}</P>
            <div><Button variant="primary" onClick={() => go('/desktop/PurplePOS-Setup.exe')}>{t('download.windows.button', 'Download for Windows')}</Button></div>
            <Small>{t('download.windows.note', 'If Windows shows a warning the first time, choose "More info" → "Run anyway".')}</Small>
          </Card>
          <WideCard $first={platform === 'ios' || platform === 'mac'}>
            <Glyph aria-hidden="true">◯</Glyph>
            <H2>{t('download.web.title', 'iPhone, iPad, Mac and other computers — web app')}</H2>
            <P>{t('download.web.desc', 'No file to download. Add PurpleHere from the browser and it opens from its own icon, in its own window, like an app.')}</P>
            <WebGrid>
              <div>
                <H3>{t('download.web.ios.title', 'iPhone · iPad (Safari)')}</H3>
                <Steps>
                  <li>{t('download.web.ios.open', 'Open this address in Safari:')} <Addr href={WEB_APP_PATH}>{webAppLabel}</Addr></li>
                  <li>{t('download.web.ios.share', 'Tap the Share button (square with an arrow).')}</li>
                  <li>{t('download.web.ios.add', 'Choose "Add to Home Screen", then tap Add.')}</li>
                  <li>{t('download.web.ios.launch', 'Open PurpleHere from the new icon on your Home Screen.')}</li>
                </Steps>
              </div>
              <div>
                <H3>{t('download.web.desktop.title', 'Mac · other computers')}</H3>
                <Steps>
                  <li>{t('download.web.desktop.open', 'Open this address in Chrome or Edge:')} <Addr href={WEB_APP_PATH}>{webAppLabel}</Addr></li>
                  <li>{t('download.web.desktop.install', 'Click the install icon at the right end of the address bar (or menu › "Install PurpleHere…"), then Install.')}</li>
                  <li>{t('download.web.desktop.safari', 'Safari on Mac (version 17 or later): File › Add to Dock.')}</li>
                </Steps>
                {canPromptWebApp && (
                  <div style={{ marginTop: 12 }}>
                    <Button variant="primary" onClick={() => { promptInstall(); }}>{t('download.web.installNow', 'Install now')}</Button>
                  </div>
                )}
              </div>
            </WebGrid>
            <Small>{t('download.web.note', 'Uses the same login as everywhere else. Printing to kitchen and receipt printers runs from the Android or Windows counter app.')}</Small>
            {/* 컴퓨터로 보는 사람이 아이폰·아이패드로 옮겨 갈 때 — 찍으면 사파리로 로그인 화면이 열리고 그대로 «홈 화면에 추가». */}
            <QrRow>
              <QRCodeSVG value={webAppUrl} size={104} level="M" includeMargin={false} style={{ flexShrink: 0 }} />
              <Small>{t('download.web.qr', 'On a computer? Scan this with your iPhone or iPad camera to open it in Safari, then follow the steps above.')}</Small>
            </QrRow>
          </WideCard>
        </Grid>
      </Wrap>
    </LandingLayout>
  );
};

export default DownloadPage;
