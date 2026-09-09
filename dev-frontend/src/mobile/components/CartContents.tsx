// 장바구니 «내용»의 단일 소스 — 페이지(/cart)와 키오스크 옆 패널이 같은 것을 쓴다.
//
// 왜 나눠 뒀나: 태블릿·키오스크는 메뉴와 장바구니가 **한 화면**에 있어야 한다(POS Terminal 방식).
// 그렇다고 장바구니를 두 벌로 그리면 줄 표시·수량 조작·**금액식**이 갈라진다.
// 특히 금액은 갈라지면 화면마다 다른 총액이 나오므로, 계산은 아래 `useCartTotals` 하나만 쓴다.
// (CLAUDE.md «기존 개념에 새 목록·경로를 만들지 않는다»)
import React from 'react';
import styled from 'styled-components';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';

// 장바구니 줄 목록. 페이지(전체화면)에서는 하단 버튼 자리를 비워야 하고,
// 키오스크 옆 패널에서는 그 여백이 필요 없다 → $inPanel 로 구분.
export const CartContainer = styled.div<{ $inPanel?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: ${p => (p.$inPanel ? '0' : '140px')}; /* 페이지에서만 체크아웃 버튼 + 하단 nav 자리 */
`;

const CartItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  padding: 4px;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ItemOptions = styled.div`
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 8px;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #C7CED6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    background: #F1F4F8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: #4B5563;
  }
`;

const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
  min-width: 32px;
  text-align: center;
  font-variant-numeric: tabular-nums;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`;

const SpecialInstructions = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 8px;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 24px;
  
  svg {
    width: 80px;
    height: 80px;
    color: #6B7280;
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #4B5563;
    margin: 0 0 8px 0;
  }
  
  p {
    font-size: 14px;
    color: #6B7280;
    margin: 0 0 24px 0;
  }
`;

const BrowseButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:active {
    background: #635BFF;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid #C7CED6;
    font-size: 16px;
    font-weight: 600;
  }
`;

/**
 * 장바구니 금액 — **단일 소스**. CartPage 에 인라인으로 있던 식을 그대로 옮긴 것이고
 * 계산 내용은 바꾸지 않았다(소계 → 서비스차지 → 세금 → 합계).
 * SC 는 takeaway 제외 옵션(기본 true)을 따른다 — PaymentPage / POSTerminal 과 같은 규칙.
 */
export function useCartTotals() {
  const { cartTotal } = useMobileOrder();
  const { operationSettings } = useStore();

  const subtotal = cartTotal;
  const orderType = (typeof window !== 'undefined' ? localStorage.getItem('orderType') : null) || 'dine-in';
  const scExcludeTakeaway = (operationSettings as any).serviceChargeExcludeTakeaway ?? true;
  const scApplies = operationSettings.serviceChargeEnabled && !(orderType === 'takeaway' && scExcludeTakeaway);
  const serviceCharge = scApplies ? subtotal * (operationSettings.serviceChargeRate / 100) : 0;
  const tax = operationSettings.taxEnabled ? subtotal * (operationSettings.taxRate / 100) : 0;
  const total = subtotal + serviceCharge + tax;

  return { subtotal, serviceCharge, tax, total, operationSettings };
}

/** 장바구니 줄 목록 + 수량 조작. 페이지와 패널이 같은 마크업을 쓴다. */
export const CartLines: React.FC<{ inPanel?: boolean }> = ({ inPanel }) => {
  const { cartItems, updateCartItem, removeFromCart, currency } = useMobileOrder();

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity === 0) removeFromCart(cartItemId);
    else updateCartItem(cartItemId, newQuantity);
  };

  return (
    <CartContainer $inPanel={inPanel}>
      {cartItems.map(item => (
        <CartItem key={item.id}>
          <ItemHeader>
            <ItemName>{item.menuItem.code ? `${item.menuItem.code} ` : ''}{item.menuItem.name}</ItemName>
            <RemoveButton onClick={() => removeFromCart(item.id)} aria-label="Remove">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </RemoveButton>
          </ItemHeader>

          {item.selectedOptions.length > 0 && (
            <ItemOptions>{item.selectedOptions.join(', ')}</ItemOptions>
          )}

          {Array.isArray((item as any).setComponents) && (item as any).setComponents.length > 0 && (
            <ItemOptions>
              {(item as any).setComponents.map((c: any, ci: number) => (
                <div key={ci}>· {c?.name}{Array.isArray(c?.options) && c.options.length ? ` (${c.options.join(', ')})` : ''}</div>
              ))}
            </ItemOptions>
          )}

          {item.specialInstructions && (
            <SpecialInstructions>Note: {item.specialInstructions}</SpecialInstructions>
          )}

          <ItemFooter>
            <QuantityControl>
              <QuantityButton
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </QuantityButton>
              <QuantityValue>{item.quantity}</QuantityValue>
              <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </QuantityButton>
            </QuantityControl>
            <ItemPrice>{formatCurrency(item.totalPrice, currency)}</ItemPrice>
          </ItemFooter>
        </CartItem>
      ))}
    </CartContainer>
  );
};

/** 소계·서비스차지·세금·합계. 금액은 useCartTotals 하나에서만 온다. */
export const CartSummary: React.FC = () => {
  const { currency } = useMobileOrder();
  const { subtotal, serviceCharge, tax, total, operationSettings } = useCartTotals();

  return (
    <OrderSummary>
      <SummaryRow>
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal, currency)}</span>
      </SummaryRow>
      {operationSettings.serviceChargeEnabled && serviceCharge > 0 && (
        <SummaryRow>
          <span>Service Charge ({operationSettings.serviceChargeRate}%)</span>
          <span>{formatCurrency(serviceCharge, currency)}</span>
        </SummaryRow>
      )}
      {operationSettings.taxEnabled && tax > 0 && (
        <SummaryRow>
          <span>Tax ({operationSettings.taxRate}%)</span>
          <span>{formatCurrency(tax, currency)}</span>
        </SummaryRow>
      )}
      <SummaryRow>
        <span>Total</span>
        <span>{formatCurrency(total, currency)}</span>
      </SummaryRow>
    </OrderSummary>
  );
};

/** 빈 장바구니 안내. onBrowse 를 주면 «메뉴 보기» 버튼이 붙는다. */
export const CartEmpty: React.FC<{ onBrowse?: () => void }> = ({ onBrowse }) => (
  <EmptyCart>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <h3>Your cart is empty</h3>
    <p>Add some delicious items to get started</p>
    {onBrowse && <BrowseButton onClick={onBrowse}>Browse Menu</BrowseButton>}
  </EmptyCart>
);
