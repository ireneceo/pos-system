import React from 'react';
import styled from 'styled-components';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { isKioskMode } from '../utils/kioskMode';
import { useMobileOrder } from '../contexts/MobileOrderContext';
// 장바구니 줄·합계·빈 상태는 키오스크 옆 패널과 **같은 것**을 쓴다 — 두 벌로 그리면 금액이 갈라진다.
import { CartLines, CartSummary, CartEmpty, useCartTotals } from '../components/CartContents';
import { useKioskSplit } from '../components/KioskCartAside';
import { KioskActionBar, kioskBarButtonStyle } from '../components/common/KioskLayout';
import { Button } from '../../components/UI/Button';
import { formatCurrency } from '../../utils/currency';

const CheckoutButton = styled.button`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    left: 50%;
    /* right:auto + width:100% 를 같이 줘야 max-width 가 적용된다.
       right:0 만 남으면 화면 절반, right:auto 만 주면 내용 크기로 오그라든다. */
    right: auto;
    width: 100%;
    transform: translateX(-50%);
    border-radius: 12px;
    bottom: 80px;
  }

  &:active {
    background: #635BFF;
  }

  &:disabled {
    background: #6B7280;
    cursor: not-allowed;
  }
`;

const CartPage: React.FC = () => {
  const kiosk = isKioskMode();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { cartItems, currency } = useMobileOrder();
  const { total } = useCartTotals();
  // 키오스크 넓은 화면은 장바구니가 늘 오른쪽에 있다 — 따로 된 장바구니 화면 대신 메뉴로(2026-10-07 Irene)
  const splitView = useKioskSplit();

  const handleCheckout = () => navigate(`/mobile/${slug}/payment`);
  const handleBrowseMenu = () => navigate(`/mobile/${slug}/menu`);

  if (splitView) return <Navigate to={`/mobile/${slug}/menu`} replace />;

  if (cartItems.length === 0) {
    return (
      <MobileLayout title="Cart" currentPage="cart">
        <CartEmpty onBrowse={handleBrowseMenu} />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Cart" currentPage="cart" cartItemCount={cartItems.length}>
      <CartLines />
      <CartSummary />

      {kiosk ? (
        // 키오스크(세로): 고정 바 대신 본문 안 sticky 바 — 가림 0 (Fable 20261010 kiosk-fullscreen D6)
        <KioskActionBar>
          <Button variant="primary" size="large" style={{ ...kioskBarButtonStyle, justifyContent: 'space-between', padding: '0 24px' }} onClick={handleCheckout}>
            <span>Proceed to Checkout</span>
            <span>{formatCurrency(total, currency)}</span>
          </Button>
        </KioskActionBar>
      ) : (
        <CheckoutButton onClick={handleCheckout}>
          Proceed to Checkout
        </CheckoutButton>
      )}
    </MobileLayout>
  );
};

export default CartPage;
