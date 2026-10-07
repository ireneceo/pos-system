/**
 * 키오스크 «오른쪽 장바구니» — 메뉴·상품 상세·결제의 모든 화면에 같은 자리로 붙는다.
 *
 * 2026-10-07 Irene 「우측 장바구니 있는 상태 그대로 상세페이지 들어가야지. 결제하는 모든 과정에서도
 *   우측에 장바구니 없어지면 안되는 거 아니야?」 — 종전에는 메뉴 화면에만 있었다.
 *
 * - 넓은 키오스크 화면(가로 1024px 이상)에서만 나란히 놓는다. 좁으면 종전대로 하단 바/장바구니 화면.
 * - 줄·합계는 /cart 와 같은 부품(CartContents)이다 — 두 벌로 그리면 금액이 갈라진다.
 * - readOnly: 주문 내용이 이미 결제로 넘어간 화면(QR·온라인 결제)에서는 고칠 수 없게 보여만 준다.
 * - 결제 화면들에서는 줄만 보이고 합계는 왼쪽 주문 요약 하나만 둔다(showSummary — 아래 Props 설명).
 * - 화면 아래 고정 버튼(담기·결제)은 kioskSplitBarCss 로 왼쪽 칸 폭에 맞춰 오른쪽 장바구니를 가리지 않게 한다.
 */
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isKioskMode } from '../utils/kioskMode';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { formatCurrency } from '../../utils/currency';
import { CartLines, CartSummary, useCartTotals } from './CartContents';
import { Button } from '../../components/UI/Button';

/** MobileLayout 키오스크 콘텐츠 폭(KIOSK_MAX)·좌우 여백과 같은 값 — 고정 버튼을 왼쪽 칸에 맞출 때 쓴다 */
const KIOSK_MAX_PX = 1120;
const KIOSK_PAD_PX = 32;
const ASIDE_PX = 340;
const GAP_PX = 24;

/** 넓은 키오스크 화면인가(나란히 놓기). 창 크기가 바뀌면 다시 본다. */
export function useKioskSplit(): boolean {
  const kiosk = isKioskMode();
  const [isWide, setIsWide] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  React.useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return kiosk && isWide;
}

export const KioskSplit = styled.div<{ $split?: boolean }>`
  ${p => p.$split && `
    display: grid;
    grid-template-columns: minmax(0, 1fr) ${ASIDE_PX}px;
    gap: ${GAP_PX}px;
    align-items: start;
  `}
`;

export const KioskMain = styled.div`
  min-width: 0;
`;

/** 나란히 놓을 때 화면 아래 고정 버튼을 왼쪽 칸 폭에 맞춘다(오른쪽 장바구니를 가리지 않게). */
export const kioskSplitBarCss = `
  @media (min-width: 1024px) {
    left: calc((100vw - min(100vw, ${KIOSK_MAX_PX}px)) / 2 + ${KIOSK_PAD_PX}px);
    right: auto;
    transform: none;
    width: calc(min(100vw, ${KIOSK_MAX_PX}px) - ${KIOSK_PAD_PX * 2}px - ${ASIDE_PX + GAP_PX}px);
    max-width: none;
  }
`;

const Aside = styled.aside`
  position: sticky;
  top: 16px;
  background: #FFFFFF;
  border: 1px solid #E5E8EC;
  border-radius: 14px;
  padding: 18px 16px;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.06);
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QtyPill = styled.span`
  min-width: 26px;
  height: 26px;
  padding: 0 8px;
  border-radius: 13px;
  background: #635BFF;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Empty = styled.p`
  margin: 0;
  padding: 24px 0;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`;

// 결제하기 — 공용 Button 을 손님 손가락 크기로(디자인 기준: 로컬 버튼 신규 금지)
const checkoutStyle: React.CSSProperties = {
  width: '100%', minHeight: 60, borderRadius: 12, fontSize: 17, fontWeight: 700,
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px',
};

interface Props {
  /** «결제하기» 버튼을 보인다(메뉴·상세). 결제 화면 자체에서는 끈다. */
  showCheckout?: boolean;
  /** 소계·세금·합계를 보인다. 기본 = showCheckout — 결제 화면은 왼쪽 주문 요약이 쿠폰·포인트·포장비·배달비·반올림까지
   *  넣은 합계를 이미 보이므로, 그것을 모르는 이 식(useCartTotals)의 «합계» 를 옆에 또 두면 한 화면에 다른 두 합계가 생긴다
   *  (Fable 재확인 2026-10-07). */
  showSummary?: boolean;
  /** 고칠 수 없게 보여만 준다(주문 내용이 이미 결제로 넘어간 화면). */
  readOnly?: boolean;
  /** 담은 수 뱃지 튀는 효과 등 — 메뉴 화면이 자기 뱃지를 넘길 때 */
  qtyBadge?: React.ReactNode;
}

export const KioskCartAside: React.FC<Props> = ({ showCheckout = true, showSummary = showCheckout, readOnly = false, qtyBadge }) => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { cartItems, currency } = useMobileOrder();
  const { total } = useCartTotals();
  const qty = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <Aside aria-label={t('menu:cartBar.viewCart', 'View cart')}>
      <Title>
        <span>{t('menu:cartBar.viewCart', 'View cart')}</span>
        {qty > 0 && (qtyBadge || <QtyPill>{qty}</QtyPill>)}
      </Title>
      {cartItems.length === 0 ? (
        <Empty>{t('menu:kiosk.cartEmpty', 'Tap a menu item to add it here.')}</Empty>
      ) : (
        <>
          <CartLines inPanel readOnly={readOnly} />
          {showSummary && <CartSummary />}
        </>
      )}
      {showCheckout && (
        <Button
          variant="primary"
          size="large"
          style={checkoutStyle}
          disabled={cartItems.length === 0}
          onClick={() => navigate(`/mobile/${slug}/payment`)}
        >
          <span>{t('menu:kiosk.checkout', 'Checkout')}</span>
          <span>{formatCurrency(total, currency)}</span>
        </Button>
      )}
    </Aside>
  );
};

export default KioskCartAside;
