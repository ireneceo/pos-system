/**
 * «태블릿 + 프린터 + 카드단말기면 끝» 띠 — 랜딩 기능 페이지(매장 탭)·다운로드 페이지가 함께 쓴다.
 * 설계: .claude/fable-design-20261109-ghl-terminal-promo.md §4 (2026-11-09 Irene «태블릿+프린터+카드단말기 이렇게만 있으면 끝»).
 * 행동은 하나 — 카드단말기 신청은 문의 페이지(종류 card_terminal)로. 랜딩 전용(앱 화면엔 쓰지 않음).
 */
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';

const Box = styled.section`
  border: 1px solid #E3E8EE; border-radius: 12px; padding: 24px; background: #fff;
  display: grid; gap: 16px; text-align: left;
`;
const Title = styled.h2`font-size: 20px; color: #0A2540; margin: 0;`;
const Lead = styled.p`font-size: 15px; color: #425466; margin: 0; line-height: 1.6;`;
const Cols = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;
  @media (max-width: 720px) { grid-template-columns: 1fr; gap: 14px; }
`;
const Item = styled.div`display: grid; gap: 6px; align-content: start;`;
const Glyph = styled.div`font-size: 26px; color: #635BFF; line-height: 1;`;
const ItemTitle = styled.h3`font-size: 15px; color: #0A2540; margin: 0;`;
const ItemDesc = styled.p`font-size: 13px; color: #6B7C93; margin: 0; line-height: 1.55;`;
const Actions = styled.div`display: flex; align-items: center; gap: 16px; flex-wrap: wrap;`;
const TextLink = styled(Link)`color: #635BFF; font-weight: 600; font-size: 14px; text-decoration: none; &:hover { text-decoration: underline; }`;

interface Props {
  /** 다운로드 페이지에서는 «계산대 앱 받기» 링크를 숨긴다(이미 그 페이지). */
  hideDownload?: boolean;
  className?: string;
}

const CounterSetupStrip: React.FC<Props> = ({ hideDownload, className }) => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const items: Array<{ glyph: string; key: 'tablet' | 'printer' | 'terminal' }> = [
    { glyph: '▭', key: 'tablet' },
    { glyph: '≡', key: 'printer' },
    { glyph: '▦', key: 'terminal' },
  ];
  return (
    <Box className={className} data-testid="counter-setup-strip">
      <div style={{ display: 'grid', gap: '8px' }}>
        <Title>{t('counterSetup.title')}</Title>
        <Lead>{t('counterSetup.lead')}</Lead>
      </div>
      <Cols>
        {items.map((it) => (
          <Item key={it.key}>
            <Glyph aria-hidden="true">{it.glyph}</Glyph>
            <ItemTitle>{t(`counterSetup.${it.key}.title`)}</ItemTitle>
            <ItemDesc>{t(`counterSetup.${it.key}.desc`)}</ItemDesc>
          </Item>
        ))}
      </Cols>
      <Actions>
        <Button variant="primary" onClick={() => navigate('/contact?type=card_terminal', { state: { inquiry_type: 'card_terminal' } })}>
          {t('counterSetup.request')}
        </Button>
        {!hideDownload && <TextLink to="/download">{t('counterSetup.download')} &rarr;</TextLink>}
      </Actions>
    </Box>
  );
};

export default CounterSetupStrip;
