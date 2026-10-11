/**
 * 키오스크 «오른쪽 장바구니» — 메뉴·상품 상세·결제의 모든 화면에 같은 자리로 붙는다.
 *
 * 2026-10-07 Irene 「우측 장바구니 있는 상태 그대로 상세페이지 들어가야지. 결제하는 모든 과정에서도
 *   우측에 장바구니 없어지면 안되는 거 아니야?」 — 종전에는 메뉴 화면에만 있었다.
 *
 * - 넓은 가로 키오스크(1024px 이상 · 폭 > 높이)에서만 나란히 놓는다. 세로·좁으면 아래 장바구니 바/장바구니 화면.
 * - 줄·합계는 /cart 와 같은 부품(CartContents)이다 — 두 벌로 그리면 금액이 갈라진다.
 * - readOnly: 주문 내용이 이미 결제로 넘어간 화면(QR·온라인 결제)에서는 고칠 수 없게 보여만 준다.
 * - 결제 화면들에서는 줄만 보이고 합계는 왼쪽 주문 요약 하나만 둔다(showSummary — 아래 Props 설명).
 * - 화면 아래 버튼(담기·결제)은 본문 칸 안 KioskActionBar(sticky)라 오른쪽 장바구니를 가리지 않는다(2026-10-10).
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

/** 넓은 **가로** 키오스크 화면인가(나란히 놓기). 창 크기·방향이 바뀌면 다시 본다.
 *  세로(1080×1920 등)는 폭이 넓어도 한 칸 — 오른쪽 340px 칸이 길게 비어 보이던 것(Irene 10-10 «세로일 수도 있는데», Fable 20261010 D4). */
const isWideLandscape = () => window.innerWidth >= 1024 && window.innerWidth > window.innerHeight;
export function useKioskSplit(): boolean {
  const kiosk = isKioskMode();
  const [isWide, setIsWide] = React.useState(
    typeof window !== 'undefined' ? isWideLandscape() : false
  );
  React.useEffect(() => {
    const onResize = () => setIsWide(isWideLandscape());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return kiosk && isWide;
}

/** 가로 키오스크: 2칸(본문 | 장바구니) 또는 3칸(카테고리 세로열 | 메뉴 | 장바구니 — 메뉴 화면만, $rail).
 *  폭은 KioskLayout 토큰(--mo-aside-w · --mo-rail-w) — 1120 상자 계산은 2026-10-10 에 없앴다(Fable D9). */
export const KioskSplit = styled.div<{ $split?: boolean; $rail?: boolean }>`
  /* 키오스크 한 칸: 세로 flex 로 화면 높이를 채워 KioskActionBar 가 화면 아래로 간다(폰은 토큰 없음 = block) */
  display: var(--mo-main-display, block);
  flex-direction: column;
  flex: 1 0 auto;
  ${p => p.$split && `
    display: grid;
    grid-template-columns: ${p.$rail ? 'var(--mo-rail-w) ' : ''}minmax(0, 1fr) var(--mo-aside-w);
    gap: 20px;
    align-items: start;
    flex: 1 0 auto;
  `}
`;

/** 본문 칸 — 키오스크에선 세로 flex 라 KioskActionBar(sticky)가 내용이 짧으면 칸 맨 아래로 간다.
 *  폰은 토큰이 없어 block 그대로(폰 화면 0 변경). */
export const KioskMain = styled.div`
  min-width: 0;
  display: var(--mo-main-display, block);
  flex-direction: column;
  flex: 1 0 auto;
  align-self: stretch;
`;

const Aside = styled.aside<{ $withFooter?: boolean }>`
  /* 위 바(72) 바로 아래에 붙는다. 키오스크엔 아래 바가 없어 높이는 화면 − 위 바 − 본문 여백(Fable D4) */
  position: sticky;
  top: calc(var(--mo-top-h, 0px) + 24px);
  background: #FFFFFF;
  border: 1px solid #E5E8EC;
  border-radius: 16px;
  padding: 20px 18px;
  box-shadow: 0 2px 10px rgba(16, 24, 40, 0.06);
  max-height: var(--mo-panel-max-h, calc(100vh - 220px));
  box-sizing: border-box;
  overflow: hidden;
  ${p => p.$withFooter && `padding: 18px 16px;`}
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** 패널 가운데 — 줄·합계·결제수단이 여기서만 스크롤한다. 화면 높이가 낮아도(1280×720 등) 아래 버튼은 늘 보인다
 *  (2026-10-11 Irene 실태블릿 «버튼이 아래랑 겹친다» — 종전엔 줄 목록만 줄어들다 결제 버튼이 패널 밖으로 잘렸다). */
const PanelScroll = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** 결제 화면 패널의 줄 목록 — 높이 상한(화면의 30%) 안에서 따로 스크롤. 낮은 화면에서도 합계·결제수단이 먼저 보이게 */
const LinesBox = styled.div`
  flex: 0 0 auto;
  max-height: 24vh;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

/** 패널 맨 아래 — 결제하기/결제 버튼 자리(스크롤 밖) */
const PanelAction = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QtyPill = styled.span`
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border-radius: 16px;
  background: #635BFF;
  color: #FFFFFF;
  font-size: 16px;
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
  font-size: 17px;
`;

// 결제하기 — 공용 Button 을 손님 손가락 크기로(디자인 기준: 로컬 버튼 신규 금지)
const checkoutStyle: React.CSSProperties = {
  width: '100%', minHeight: 64, borderRadius: 14, fontSize: 19, fontWeight: 700,
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0,
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
  /** 결제 화면: 줄 목록 아래 칸(합계·결제수단). 있으면 합계·«결제하기» 는 그리지 않는다 —
   *  합계는 쿠폰·포인트까지 아는 결제 화면 쪽 식 하나만(Fable 20261010 D3). 줄 목록과 함께 패널 안에서 스크롤한다. */
  footer?: React.ReactNode;
  /** 결제 화면: 패널 맨 아래 늘 보이는 칸(안내 한 줄 + 결제 버튼) — 스크롤 밖 */
  action?: React.ReactNode;
}

export const KioskCartAside: React.FC<Props> = ({ showCheckout: showCheckoutProp = true, showSummary: showSummaryProp, readOnly = false, qtyBadge, footer, action }) => {
  const showCheckout = footer ? false : showCheckoutProp;
  const showSummary = footer ? false : (showSummaryProp ?? showCheckout);
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { cartItems, currency } = useMobileOrder();
  const { total } = useCartTotals();
  const qty = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <Aside aria-label={t('menu:cartBar.viewCart', 'View cart')} $withFooter={!!footer}>
      <Title>
        <span>{t('menu:cartBar.viewCart', 'View cart')}</span>
        {qty > 0 && (qtyBadge || <QtyPill>{qty}</QtyPill>)}
      </Title>
      <PanelScroll>
        {cartItems.length === 0
          ? <Empty>{t('menu:kiosk.cartEmpty', 'Tap a menu item to add it here.')}</Empty>
          : footer
            ? <LinesBox><CartLines inPanel compact readOnly={readOnly} /></LinesBox>
            : <CartLines inPanel readOnly={readOnly} />}
        {footer ? footer : (cartItems.length > 0 && showSummary && <CartSummary />)}
      </PanelScroll>
      {(action || showCheckout) && (
        <PanelAction>
          {action}
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
        </PanelAction>
      )}
    </Aside>
  );
};

export default KioskCartAside;
