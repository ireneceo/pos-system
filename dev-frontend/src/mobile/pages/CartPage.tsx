import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 140px; /* Space for checkout button + bottom nav */
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
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  min-width: 20px;
  text-align: center;
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
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    cartItems,
    cartTotal,
    updateCartItem,
    removeFromCart,
    currency
  } = useMobileOrder();
  const { operationSettings } = useStore();

  const subtotal = cartTotal;
  // SC takeaway 제외 옵션 (default true) — PaymentPage / POSTerminal 과 일관.
  const orderType = (typeof window !== 'undefined' ? localStorage.getItem('orderType') : null) || 'dine-in';
  const scExcludeTakeaway = (operationSettings as any).serviceChargeExcludeTakeaway ?? true;
  const scApplies = operationSettings.serviceChargeEnabled && !(orderType === 'takeaway' && scExcludeTakeaway);
  const serviceCharge = scApplies ? subtotal * (operationSettings.serviceChargeRate / 100) : 0;
  const tax = operationSettings.taxEnabled ? subtotal * (operationSettings.taxRate / 100) : 0;
  const total = subtotal + serviceCharge + tax;
  
  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(cartItemId);
    } else {
      updateCartItem(cartItemId, newQuantity);
    }
  };
  
  const handleCheckout = () => {
    navigate(`/mobile/${slug}/payment`);
  };

  const handleBrowseMenu = () => {
    navigate(`/mobile/${slug}/menu`);
  };
  
  if (cartItems.length === 0) {
    return (
      <MobileLayout title="Cart" currentPage="cart">
        <EmptyCart>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items to get started</p>
          <BrowseButton onClick={handleBrowseMenu}>
            Browse Menu
          </BrowseButton>
        </EmptyCart>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout title="Cart" currentPage="cart" cartItemCount={cartItems.length}>
      <CartContainer>
        {cartItems.map(item => (
          <CartItem key={item.id}>
            <ItemHeader>
              <ItemName>{item.menuItem.code ? `${item.menuItem.code} ` : ''}{item.menuItem.name}</ItemName>
              <RemoveButton onClick={() => removeFromCart(item.id)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </RemoveButton>
            </ItemHeader>
            
            {item.selectedOptions.length > 0 && (
              <ItemOptions>
                {item.selectedOptions.join(', ')}
              </ItemOptions>
            )}

            {Array.isArray((item as any).setComponents) && (item as any).setComponents.length > 0 && (
              <ItemOptions>
                {(item as any).setComponents.map((c: any, ci: number) => (
                  <div key={ci}>· {c?.name}{Array.isArray(c?.options) && c.options.length ? ` (${c.options.join(', ')})` : ''}</div>
                ))}
              </ItemOptions>
            )}

            {item.specialInstructions && (
              <SpecialInstructions>
                Note: {item.specialInstructions}
              </SpecialInstructions>
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
                <QuantityButton 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </QuantityButton>
              </QuantityControl>
              <ItemPrice>{formatCurrency(item.totalPrice, currency)}</ItemPrice>
            </ItemFooter>
          </CartItem>
        ))}
        
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
      </CartContainer>
      
      <CheckoutButton onClick={handleCheckout}>
        Proceed to Checkout
      </CheckoutButton>
    </MobileLayout>
  );
};

export default CartPage;