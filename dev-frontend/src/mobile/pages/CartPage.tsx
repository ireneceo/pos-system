import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { isKioskMode } from '../utils/kioskMode';
import { useMobileOrder } from '../contexts/MobileOrderContext';
// 장바구니 줄·합계·빈 상태는 키오스크 옆 패널과 **같은 것**을 쓴다 — 두 벌로 그리면 금액이 갈라진다.
import { CartLines, CartSummary, CartEmpty } from '../components/CartContents';

const CheckoutButton = styled.button<{ $kiosk?: boolean }>`
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
    /* 키오스크는 콘텐츠 폭이 넓어 600px 바만 남으면 화면과 따로 논다 — 같이 넓힌다. */
    max-width: ${p => (p.$kiosk ? '1056px' : '600px')};
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
  const { cartItems } = useMobileOrder();

  const handleCheckout = () => navigate(`/mobile/${slug}/payment`);
  const handleBrowseMenu = () => navigate(`/mobile/${slug}/menu`);

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

      <CheckoutButton $kiosk={kiosk} onClick={handleCheckout}>
        Proceed to Checkout
      </CheckoutButton>
    </MobileLayout>
  );
};

export default CartPage;
