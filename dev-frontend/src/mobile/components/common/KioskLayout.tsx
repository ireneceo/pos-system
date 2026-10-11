/**
 * 키오스크 전용 틀 — 매장 태블릿 셀프 주문 화면의 껍데기.
 *
 * 2026-10-10 Irene 「키오스크 레이아웃 불필요한 공백 없이 내용이 크게 크게 나오게 풀버전으로 만들어줘.
 *   좌우 여백 왜 남겨? … 모바일때매 못 바꾸면 같이 가지마. 완전 목적이 다르잖아.」
 * 설계: backups/fable-pending/fable-verdict-20261010-kiosk-fullscreen.md (P1~P4 · D1 · D2)
 *
 * - 흐름은 한 벌, 틀은 두 벌: 페이지·장바구니·결제 계산·주문 생성은 모바일오더 그대로.
 *   MobileLayout 이 키오스크면 이 틀로 넘긴다(페이지 코드는 MobileLayout 을 그대로 쓴다).
 * - 폭 전체(좌우 24px), 브랜드 띠·가운데 상자·아래 Home/Menu/Cart 바 없음. 위 바 하나.
 * - 치수는 이 파일의 KIOSK_TOKENS 한 곳에서 정한다. 페이지 styled 는 `var(--mo-xxx, <폰 값>)` 로 읽고,
 *   폰에는 변수가 없으니 폰 화면은 그대로다.
 * - 화면 아래 고정(fixed) 바를 쓰지 않는다 — 담기·결제·장바구니 버튼은 본문 안 KioskActionBar(sticky).
 */
import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMobileOrder } from '../../contexts/MobileOrderContext';
import { setupMobileInputHandlers } from '../../utils/mobileInputFix';
import { getActiveTable, clearActiveTable } from '../../utils/tableSession';
import { watchKioskIdle, KIOSK_PAYMENT_IDLE_MS, isPaymentInFlight } from '../../utils/kioskMode';
import { Button } from '../../../components/UI/Button';

/** 키오스크 치수 — 페이지 styled 의 `var(--mo-xxx, 폰 값)` 이 읽는다 (Fable D2 표). */
export const KIOSK_TOKENS: Record<string, string> = {
  '--mo-font': '18px',
  '--mo-gutter': '24px',
  '--mo-tap': '56px',
  '--mo-card-img-h': 'auto',
  '--mo-card-img-ratio': '4 / 3',
  '--mo-item-name': '18px',
  '--mo-item-desc': '15px',
  '--mo-item-price': '20px',
  '--mo-card-pad': '14px',
  '--mo-grid-gap': '16px',
  '--mo-grid-cols': 'repeat(auto-fill, minmax(210px, 1fr))',
  '--mo-cat-font': '17px',
  '--mo-search-h': '52px',
  '--mo-search-font': '18px',
  '--mo-search-pad-l': '20px',
  '--mo-search-radius': '12px',
  '--mo-card-emoji': '64px',
  '--mo-badge-font': '13px',
  '--mo-item-desc-sm': '14px',
  '--mo-qty-pill': '32px',
  '--mo-qty-pill-font': '17px',
  '--mo-detail-name': '30px',
  '--mo-detail-desc': '17px',
  '--mo-detail-img-h': 'auto',
  '--mo-detail-img-max': '42vh',
  '--mo-detail-img-ratio': '16 / 9',
  '--mo-opt-title': '20px',
  '--mo-detail-noimg-h': '160px',
  '--mo-detail-emoji': '72px',
  '--mo-detail-pad': '20px',
  '--mo-detail-name-weight': '700',
  '--mo-detail-meta': '16px',
  '--mo-detail-last-mb': '16px',
  '--mo-textarea-h': '96px',
  '--mo-badge-sm': '14px',
  '--mo-opt-gap': '12px',
  '--mo-opt-radius': '12px',
  '--mo-opt-sel-border': '2px',
  '--mo-opt-price': '15px',
  '--mo-opt-price-sm': '14px',
  '--mo-check': '24px',
  '--mo-qty-icon': '22px',
  '--mo-opt-font': '17px',
  '--mo-opt-cols': 'repeat(auto-fill, minmax(200px, 1fr))',
  '--mo-qty-btn': '56px',
  '--mo-qty-font': '24px',
  '--mo-input-font': '18px',
  '--mo-input-h': '56px',
  '--mo-section-title': '20px',
  '--mo-section-pad': '20px',
  '--mo-cart-name': '18px',
  '--mo-cart-meta': '15px',
  '--mo-cart-qty-btn': '44px',
  '--mo-cart-qty-font': '20px',
  '--mo-cart-price': '18px',
  '--mo-cart-meta-sm': '14px',
  '--mo-cart-page-pad': '0px',
  '--mo-summary-row-sm': '17px',
  '--mo-summary-total-sm': '22px',
  '--mo-summary-row': '17px',
  '--mo-summary-total': '24px',
  '--mo-method-h': '64px',
  '--mo-method-font': '18px',
  '--mo-method-pad': '14px 18px',
  '--mo-method-weight': '600',
  '--mo-pay-pad-b': '0px',
  '--mo-choice-h': '88px',
  '--mo-choice-title': '18px',
  '--mo-choice-sub': '14px',
  '--mo-opt-radius-sm': '12px',
  '--mo-note-font': '16px',
  '--mo-note-h': '96px',
  '--mo-label-font': '16px',
  '--mo-qr-pad': '0px',
  '--mo-qr-max': 'none',
  '--mo-qr-box': 'border-box',
  '--mo-qr-display': 'grid',
  '--mo-qr-cols': 'repeat(auto-fit, minmax(max(340px, calc(50% - 10px)), 1fr))',
  '--mo-qr-span': 'span 2',
  '--mo-qr-size': 'min(44vh, calc(100% - 42px), 440px)',
  '--mo-qr-h': 'auto',
  '--mo-qr-text': '17px',
  '--mo-online-max': '760px',
  '--mo-pickup-label': '20px',
  '--mo-pickup-num': '96px',
  '--mo-track-max': '640px',
  '--mo-aside-w': 'clamp(340px, 24vw, 440px)',
  '--mo-rail-w': 'clamp(150px, 12vw, 220px)',
  '--mo-bar-h': '72px',
  '--mo-bar-font': '20px',
  '--mo-top-h': '72px',
  '--mo-main-display': 'flex',
  /** 본문 위·아래 여백 합(24+24) + 위 바 — sticky 패널·세로열 높이 계산용 */
  '--mo-panel-max-h': 'calc(100dvh - 72px - 48px)',
};

const Root = styled.div`
  position: fixed;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
  background: #F4F6F8;
  display: flex;
  flex-direction: column;
  font-size: var(--mo-font);
  padding-top: env(safe-area-inset-top);
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  flex: 0 0 auto;
  min-height: var(--mo-top-h);
  box-sizing: border-box;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E8EC;
`;

const TitleBlock = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 14px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #6B7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContextChip = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  background: #F5F3FF;
  color: #635BFF;
  border: 1px solid #DDD6FE;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  .divider { width: 1px; height: 16px; background: #C7BCFB; }
`;

/** 본문 — 폭 전체, 좌우 24px. 세로 flex 라 KioskActionBar 가 내용이 짧으면 화면 아래로 내려간다. */
const Body = styled.main`
  flex: 1 0 auto;
  box-sizing: border-box;
  width: 100%;
  padding: 24px var(--mo-gutter) 24px;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const topButtonStyle: React.CSSProperties = {
  minHeight: 56, padding: '0 20px', fontSize: 18, fontWeight: 700, borderRadius: 12, flexShrink: 0,
};

/**
 * 화면 아래 버튼 자리(담기·결제·장바구니). 본문 칸 안에 붙는 sticky — 고정(fixed) 바가 아니라
 * 다른 요소를 가리지 않는다. 내용이 짧으면 margin-top:auto 로 칸 맨 아래.
 */
export const KioskActionBar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 50;
  margin-top: auto;
  padding: 16px 0 calc(16px + env(safe-area-inset-bottom));
  background: linear-gradient(rgba(244, 246, 248, 0), #F4F6F8 28%);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/** KioskActionBar 안 큰 버튼 스타일 — 공용 Button 에 얹는다(로컬 버튼 신규 금지). */
export const kioskBarButtonStyle: React.CSSProperties = {
  width: '100%', minHeight: 72, borderRadius: 14, fontSize: 20, fontWeight: 700,
};

/** 키오스크 한 칸 화면(세로·좁은 가로)에서 본문을 세로 flex 로 — 액션 바를 맨 아래로 보낼 때 */
export const KioskColumn = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export interface KioskLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

const KioskLayout: React.FC<KioskLayoutProps> = ({ children, title, subtitle, showBack = false, onBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentStore, orderType, clearCart } = useMobileOrder();

  useEffect(() => {
    const cleanup = setupMobileInputHandlers();
    return cleanup;
  }, []);

  // 키오스크 유휴 리셋 — MobileLayout 에서 옮긴 것(값·조건 변경 0).
  // 손님이 담다 말고 자리를 뜨면 다음 손님이 그 장바구니를 물려받는다 → 조작이 끊기면 비우고 처음 화면으로.
  // ⚠ 주문 추적 화면은 그대로 둔다(이미 낸 주문을 보는 중). 결제 화면은 길게(5분), 결제 요청이 나간 뒤엔 연기.
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/order/')) return;
    const isPayment = path.includes('/payment');
    const slug = currentStore?.slug || sessionStorage.getItem('restaurantSlug');
    if (!slug) return;
    return watchKioskIdle(() => {
      // `false` = 연기(타이머 다시 걸림). 그냥 return 하면 다시는 울리지 않는다.
      if (isPayment && isPaymentInFlight()) return false;
      clearCart();
      clearActiveTable();
      navigate(`/mobile/${slug}?kiosk=1&picker=1`);
    }, isPayment ? KIOSK_PAYMENT_IDLE_MS : undefined);
  }, [currentStore?.slug, clearCart, navigate, location.pathname]);

  const slug = currentStore?.slug || sessionStorage.getItem('restaurantSlug') || 'default';
  const tableNumber = getActiveTable();

  // «처음으로» = 폰의 하단 Home 과 같은 동작: 주문방식 고르기 화면(테이블 유지). 장바구니는 지우지 않는다 —
  // 주문방식을 바꾸면 OrderTypePage 의 «Change Order Type?» 확인이 처리한다.
  const startOver = () => {
    const qs = tableNumber ? `?table=${encodeURIComponent(tableNumber)}&picker=1` : '?picker=1';
    navigate(`/mobile/${slug}${qs}`);
  };

  const orderTypeLabel = orderType === 'dine-in' ? 'Dine-in'
    : orderType === 'takeaway' ? 'Takeaway'
    : orderType === 'pickup' ? 'Pickup'
    : orderType === 'delivery' ? 'Delivery'
    : orderType;

  return (
    <Root style={KIOSK_TOKENS as React.CSSProperties} data-kiosk-layout="1">
      <TopBar>
        {showBack && onBack ? (
          <Button variant="secondary" size="large" style={topButtonStyle} onClick={onBack}>
            ‹ {t('menu:kiosk.back', 'Back')}
          </Button>
        ) : (
          <Button variant="secondary" size="large" style={topButtonStyle} onClick={startOver}>
            ↺ {t('menu:kiosk.startOver', 'Start over')}
          </Button>
        )}
        <TitleBlock>
          {title && <Title>{title}</Title>}
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleBlock>
        {(tableNumber || orderType) && (
          <ContextChip>
            {tableNumber && <span>{t('menu:kiosk.table', { number: tableNumber, defaultValue: 'Table {{number}}' })}</span>}
            {tableNumber && orderType && <span className="divider" />}
            {orderType && <span>{orderTypeLabel}</span>}
          </ContextChip>
        )}
      </TopBar>
      <Body>{children}</Body>
    </Root>
  );
};

export default KioskLayout;
