import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';

// #11c 모바일 크로스셀 — 담은 직후 "함께 주문하면 좋아요" 바텀시트.
// 설계: docs/MOBILE_ADDON_CROSS_SELL.md §5.3. 결과 없으면 부모가 안 띄움(데드엔드 없음).

export interface RecItem {
  id: number;
  name: string;
  price: number | string;
  image?: string | null;
  emoji?: string | null;
  is_set_menu?: boolean;
  description?: string | null;
}

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideUp = keyframes`from { transform: translateY(100%); } to { transform: translateY(0); }`;

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 9998;
  background: rgba(0, 0, 0, 0.45);
  display: flex; align-items: flex-end; justify-content: center;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Sheet = styled.div`
  background: #fff;
  width: 100%; max-width: 480px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.16);
  animation: ${slideUp} 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  padding-bottom: max(16px, env(safe-area-inset-bottom));
  overflow: hidden;
`;

const Handle = styled.div`
  width: 40px; height: 4px; border-radius: 2px;
  background: #E2E8F0; margin: 10px auto 4px;
`;

const Header = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 20px 12px;
`;

const Heading = styled.div`
  display: flex; flex-direction: column; gap: 2px;
`;
const Title = styled.h3`
  margin: 0; font-size: 17px; font-weight: 700; color: #0F172A;
  display: flex; align-items: center;
`;
const Check = styled.span`
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 50%;
  background: #10B981; color: #fff; font-size: 12px; font-weight: 700;
  margin-right: 8px; flex-shrink: 0;
`;
const Subtitle = styled.span`
  font-size: 13px; color: #64748B;
`;

const CloseBtn = styled.button`
  background: #F1F5F9; border: none; border-radius: 50%;
  width: 32px; height: 32px; cursor: pointer; color: #475569;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  &:active { background: #E2E8F0; }
`;

const Cards = styled.div`
  display: flex; gap: 12px; overflow-x: auto; padding: 4px 20px 16px;
  scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
`;

const Card = styled.button<{ $added?: boolean }>`
  flex: 0 0 132px; scroll-snap-align: start;
  display: flex; flex-direction: column; text-align: left;
  background: #fff; border: 1px solid ${p => (p.$added ? '#10B981' : '#E2E8F0')}; border-radius: 14px;
  overflow: hidden; cursor: ${p => (p.$added ? 'default' : 'pointer')}; padding: 0;
  transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;
  &:active { transform: ${p => (p.$added ? 'none' : 'scale(0.97)')}; box-shadow: ${p => (p.$added ? 'none' : '0 4px 14px rgba(99, 91, 255, 0.14)')}; }
`;

const Thumb = styled.div<{ $img?: string | null }>`
  width: 100%; height: 96px;
  display: flex; align-items: center; justify-content: center;
  background: ${p => (p.$img ? `#F1F5F9 url(${p.$img}) center/cover no-repeat` : 'linear-gradient(135deg, #EEF2FF, #F8FAFC)')};
`;
const ThumbEmoji = styled.span`
  font-size: 44px; line-height: 1;
`;

const CardBody = styled.div`
  padding: 10px 10px 12px; display: flex; flex-direction: column; gap: 6px; flex: 1;
`;
const Name = styled.span`
  font-size: 13px; font-weight: 600; color: #1E293B; line-height: 1.3;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
`;
const PriceRow = styled.div`
  display: flex; align-items: center; justify-content: space-between; margin-top: auto;
`;
const Price = styled.span`
  font-size: 13px; font-weight: 700; color: #635BFF;
`;
const AddPill = styled.span<{ $added?: boolean }>`
  width: 26px; height: 26px; border-radius: 50%;
  background: ${p => (p.$added ? '#10B981' : '#635BFF')}; color: #fff; font-size: ${p => (p.$added ? '14px' : '18px')}; line-height: 1;
  display: flex; align-items: center; justify-content: center;
`;

const Footer = styled.div`
  display: flex; gap: 12px; padding: 8px 20px 4px;
`;
const FootBtn = styled.button<{ $primary?: boolean }>`
  flex: 1; min-height: 50px; border-radius: 12px; border: none; cursor: pointer;
  font-size: 15px; font-weight: 700;
  ${p => p.$primary
    ? 'background: #635BFF; color: #fff; &:active { opacity: 0.9; }'
    : 'background: #F1F5F9; color: #334155; &:active { background: #E2E8F0; }'}
`;

interface Props {
  isOpen: boolean;
  items: RecItem[];
  currency: string;
  cartCount: number;
  addedIds?: number[];   // 이미 장바구니에 담긴 추천 상품 id — 카드에 ✓ 표시
  onClose: () => void;
  onAdd: (item: RecItem) => void;
  onGoToCart: () => void;
}

const fmtPrice = (currency: string, v: number | string) => {
  const n = typeof v === 'number' ? v : parseFloat(v) || 0;
  return `${currency} ${n.toFixed(2)}`;
};

const RecommendationSheet: React.FC<Props> = ({ isOpen, items, currency, cartCount, addedIds = [], onClose, onAdd, onGoToCart }) => {
  const { t } = useTranslation(['menu', 'common']);
  if (!isOpen || !items.length) return null;
  const added = new Set(addedIds);
  return (
    <Overlay onClick={onClose}>
      <Sheet onClick={e => e.stopPropagation()} role="dialog" aria-label={t('itemDetail.recommend.added', 'Added to cart') as string}>
        <Handle />
        <Header>
          <Heading>
            <Title><Check aria-hidden="true">✓</Check>{t('itemDetail.recommend.added', 'Added to cart')}</Title>
            <Subtitle>{t('itemDetail.recommend.title', 'You might also like')}</Subtitle>
          </Heading>
          <CloseBtn type="button" onClick={onClose} aria-label={t('common:close', 'Close') as string}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </CloseBtn>
        </Header>
        <Cards>
          {items.map(it => {
            const isAdded = added.has(it.id);
            return (
            <Card key={it.id} type="button" $added={isAdded}
              onClick={() => { if (!isAdded) onAdd(it); }}
              aria-label={`${isAdded ? t('itemDetail.recommend.added', 'Added to cart') : t('itemDetail.addToCart', 'Add to Cart')}: ${it.name}`}>
              <Thumb $img={it.image || null}>
                {/* 메뉴와 동일: 이미지 없으면 이모지, 그것도 없으면 기본 식기 글리프 (빈 카드 방지) */}
                {!it.image ? <ThumbEmoji>{it.emoji || '\u{1F37D}'}</ThumbEmoji> : null}
              </Thumb>
              <CardBody>
                <Name>{it.name}</Name>
                <PriceRow>
                  <Price>{fmtPrice(currency, it.price)}</Price>
                  <AddPill $added={isAdded} aria-hidden="true">{isAdded ? '✓' : '+'}</AddPill>
                </PriceRow>
              </CardBody>
            </Card>
          );})}
        </Cards>
        <Footer>
          <FootBtn type="button" onClick={onClose}>{t('itemDetail.recommend.noThanks', 'No thanks')}</FootBtn>
          <FootBtn type="button" $primary onClick={onGoToCart}>
            {t('itemDetail.recommend.viewCart', 'View cart')}{cartCount > 0 ? ` (${cartCount})` : ''}
          </FootBtn>
        </Footer>
      </Sheet>
    </Overlay>
  );
};

export default RecommendationSheet;
