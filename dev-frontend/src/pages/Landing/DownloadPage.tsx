/**
 * Download — 계산대 앱 받기 (2026-10-04 Irene 「랜딩페이지에 다운로드 메뉴를 추가해」).
 * 파일은 배포가 /desktop 에 올려 둔 것을 그대로 가리킨다 — 안드로이드 PurplePOS.apk(최신 별칭) ·
 * Windows PurplePOS-Setup.exe(최신 별칭, PwaInstallContext 와 같은 주소). 버전 숫자를 여기 박지 않는다.
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
import { Button } from '../../components/UI/Button';

const Wrap = styled.div`max-width: 960px; margin: 0 auto; padding: 48px 16px 72px;`;
const H1 = styled.h1`font-size: 34px; color: #0A2540; margin: 0 0 10px; @media (max-width: 600px) { font-size: 27px; }`;
const Lead = styled.p`font-size: 17px; color: #6B7C93; margin: 0 0 32px; max-width: 64ch;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; @media (max-width: 720px) { grid-template-columns: 1fr; }`;
const Card = styled.section`border: 1px solid #E3E8EE; border-radius: 12px; padding: 24px; background: #fff; display: grid; gap: 12px; align-content: start;`;
const Glyph = styled.div`font-size: 26px; color: #635BFF; line-height: 1;`;
const H2 = styled.h2`font-size: 20px; color: #0A2540; margin: 0;`;
const P = styled.p`font-size: 15px; color: #425466; margin: 0; line-height: 1.6;`;
const Small = styled.p`font-size: 13px; color: #6B7C93; margin: 0;`;

const DownloadPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const go = (href: string) => { window.location.href = href; };
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
          </Card>
          <Card>
            <Glyph aria-hidden="true">▭</Glyph>
            <H2>{t('download.windows.title', 'Windows PC')}</H2>
            <P>{t('download.windows.desc', 'For counter PCs. Prints to your USB and network printers directly from the POS.')}</P>
            <div><Button variant="primary" onClick={() => go('/desktop/PurplePOS-Setup.exe')}>{t('download.windows.button', 'Download for Windows')}</Button></div>
            <Small>{t('download.windows.note', 'If Windows shows a warning the first time, choose "More info" → "Run anyway".')}</Small>
          </Card>
        </Grid>
      </Wrap>
    </LandingLayout>
  );
};

export default DownloadPage;
