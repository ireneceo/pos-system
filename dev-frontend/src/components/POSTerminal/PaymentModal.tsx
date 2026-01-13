import React, { useState, useEffect } from 'react';
import { Modal, ModalButton as Button, FormLabel as Label } from '../UI/Modal';
import {
  Section,
  RadioGroup,
  RadioButton,
  TotalSection,
  TotalLabel,
  TotalPrice
} from '../common/Modal';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';

const OrderSummary = styled.div`
  background: linear-gradient(to bottom, #F8FAFC, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  color: #6B7280;
`;

const SummaryValue = styled.span`
  font-weight: 500;
  color: #1F2937;
`;

const InputSection = styled.div`
  margin-bottom: 20px;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  text-align: center;
  color: #1F2937;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
    font-weight: 400;
  }
`;

const QuickAmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
`;

const QuickAmountBtn = styled.button<{ selected?: boolean }>`
  padding: 10px;
  border: 1px solid ${props => props.selected ? '#635BFF' : '#E5E7EB'};
  background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#374151'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: ${props => props.selected ? '#635BFF' : '#D1D5DB'};
    background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : '#F9FAFB'};
  }
`;

const ChangeDisplay = styled.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`;

const ChangeLabel = styled.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`;

const ChangeAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`;

const DiscountRow = styled(SummaryRow)`
  color: #10B981;
`;

const PointsSection = styled.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const PointsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const PointsTitle = styled.div`
  font-weight: 600;
  color: #0369A1;
  font-size: 14px;
`;

const PointsBalance = styled.div`
  font-weight: 700;
  color: #0EA5E9;
  font-size: 16px;
`;

const PointsToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 12px;

  input {
    width: 18px;
    height: 18px;
    accent-color: #0EA5E9;
  }

  span {
    font-size: 14px;
    color: #1F2937;
  }
`;

const PointsSlider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E0E7FF;
  accent-color: #0EA5E9;
  cursor: pointer;
`;

const PointsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: white;
  border-radius: 6px;
`;

const PointsUsing = styled.div`
  font-size: 14px;
  color: #1F2937;

  strong {
    color: #0EA5E9;
  }
`;

const PointsDiscount = styled.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  subtotal: number;
  tax: number;
  serviceCharge?: number;
  takeawayCharge?: number;
  discountAmount?: number;
  couponDiscount?: number;
  onConfirmPayment: (paymentMethod: string, amountReceived?: number, change?: number, pointsUsed?: number, pointDiscount?: number) => void;
  paymentMethods?: any;
  taxRate?: number;
  serviceChargeRate?: number;
  taxEnabled?: boolean;
  serviceChargeEnabled?: boolean;
  // Points props
  customerPoints?: number;
  customerTier?: string;
  membershipSettings?: any;
  onPointsChange?: (pointsUsed: number, discount: number) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  total: originalTotal,
  subtotal,
  tax,
  serviceCharge = 0,
  takeawayCharge = 0,
  discountAmount = 0,
  couponDiscount = 0,
  onConfirmPayment,
  paymentMethods,
  taxRate = 6,
  serviceChargeRate = 10,
  taxEnabled = true,
  serviceChargeEnabled = false,
  customerPoints = 0,
  customerTier = 'Bronze',
  membershipSettings,
  onPointsChange
}) => {
  const { operationSettings } = useStore();

  // Points state
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [pointDiscount, setPointDiscount] = useState(0);

  // Calculate max points that can be used
  const maxPointsForOrder = React.useMemo(() => {
    if (!membershipSettings || !membershipSettings.is_active || customerPoints <= 0) return 0;

    const minPointsToUse = membershipSettings.min_points_to_use || 100;
    const maxPercentage = parseFloat(membershipSettings.max_points_per_order_percent) || 50;
    const pointsToCurrency = parseFloat(membershipSettings.points_to_currency) || 100;

    // Max discount based on percentage
    const maxDiscountByPercent = (subtotal - discountAmount - couponDiscount) * (maxPercentage / 100);
    // Convert to points
    const maxPointsByPercent = Math.floor(maxDiscountByPercent * pointsToCurrency);

    // Can't use more points than available
    const maxUsable = Math.min(customerPoints, maxPointsByPercent);

    // Must meet minimum threshold
    if (customerPoints < minPointsToUse) return 0;

    return maxUsable;
  }, [membershipSettings, customerPoints, subtotal, discountAmount, couponDiscount]);

  // Calculate point discount when pointsToUse changes
  useEffect(() => {
    if (membershipSettings && pointsToUse > 0) {
      const pointsToCurrency = parseFloat(membershipSettings.points_to_currency) || 100;
      const discount = pointsToUse / pointsToCurrency;
      setPointDiscount(discount);
      onPointsChange?.(pointsToUse, discount);
    } else {
      setPointDiscount(0);
      onPointsChange?.(0, 0);
    }
  }, [pointsToUse, membershipSettings, onPointsChange]);

  // Reset points when modal closes
  useEffect(() => {
    if (!isOpen) {
      setUsePoints(false);
      setPointsToUse(0);
      setPointDiscount(0);
    }
  }, [isOpen]);

  // Adjusted total after point discount
  const total = originalTotal - pointDiscount;

  // Get available payment methods for POS
  const getAvailablePaymentMethods = () => {
    if (!paymentMethods) {
      // Default fallback
      return [
        { key: 'cash', label: 'Cash' },
        { key: 'card', label: 'Card' },
        { key: 'ewallet', label: 'E-Wallet' },
        { key: 'bankTransfer', label: 'Bank Transfer' }
      ];
    }

    // Use saved order if available, otherwise default order
    const savedOrder = paymentMethods._order;
    const defaultOrder = ['cash', 'card', 'ewallet', 'bankTransfer'];
    const methodOrder = savedOrder && Array.isArray(savedOrder)
      ? savedOrder.filter((k: string) => k !== '_order')
      : defaultOrder;

    const methods: any[] = [];

    methodOrder.forEach((key: string) => {
      const method = paymentMethods[key];
      if (method && method.enabled && method.availableIn && method.availableIn.includes('pos')) {
        methods.push({
          key,
          label: method.label
        });
      }
    });

    return methods;
  };

  const availableMethods = getAvailablePaymentMethods();
  const [paymentMethod, setPaymentMethod] = useState<string>(availableMethods[0]?.key || 'cash');
  const [cashAmount, setCashAmount] = useState('');
  
  const quickAmounts = [50, 100, 150, 200];
  
  // paymentMethod 초기화 (availableMethods가 변경되면)
  useEffect(() => {
    if (availableMethods.length > 0) {
      if (!paymentMethod || !availableMethods.find(m => m.key === paymentMethod)) {
        setPaymentMethod(availableMethods[0].key);
      }
    }
  }, [availableMethods, paymentMethod]);
  
  const handleCashAmountChange = (value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setCashAmount(cleanValue);
  };
  
  const calculateChange = () => {
    const amount = parseFloat(cashAmount) || 0;
    return Math.max(0, amount - total);
  };
  
  const handleConfirm = () => {
    if (paymentMethod === 'cash') {
      const amount = parseFloat(cashAmount) || 0;
      if (amount >= total) {
        onConfirmPayment(paymentMethod, amount, calculateChange(), pointsToUse, pointDiscount);
      }
    } else {
      onConfirmPayment(paymentMethod, undefined, undefined, pointsToUse, pointDiscount);
    }
  };
  
  const canConfirm = () => {
    if (paymentMethod === 'cash') {
      const amount = parseFloat(cashAmount) || 0;
      return amount >= total;
    }
    return true;
  };

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm} disabled={!canConfirm()}>
        Confirm Payment
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment"
      footer={footer}
    >
      <OrderSummary>
        <SummaryRow>
          <SummaryLabel>Subtotal</SummaryLabel>
          <SummaryValue>{formatCurrency(subtotal, operationSettings.currency)}</SummaryValue>
        </SummaryRow>
        {takeawayCharge > 0 && (
          <SummaryRow>
            <SummaryLabel>Takeaway Charge</SummaryLabel>
            <SummaryValue>{formatCurrency(takeawayCharge, operationSettings.currency)}</SummaryValue>
          </SummaryRow>
        )}
        {discountAmount > 0 && (
          <DiscountRow>
            <SummaryLabel>Discount</SummaryLabel>
            <SummaryValue>{formatCurrency(-discountAmount, operationSettings.currency)}</SummaryValue>
          </DiscountRow>
        )}
        {couponDiscount > 0 && (
          <DiscountRow>
            <SummaryLabel>Coupon Discount</SummaryLabel>
            <SummaryValue>{formatCurrency(-couponDiscount, operationSettings.currency)}</SummaryValue>
          </DiscountRow>
        )}
        {pointDiscount > 0 && (
          <DiscountRow>
            <SummaryLabel>Points Discount ({pointsToUse.toLocaleString()} pts)</SummaryLabel>
            <SummaryValue>{formatCurrency(-pointDiscount, operationSettings.currency)}</SummaryValue>
          </DiscountRow>
        )}
        {serviceChargeEnabled && serviceCharge > 0 && (
          <SummaryRow>
            <SummaryLabel>Service Charge ({serviceChargeRate}%)</SummaryLabel>
            <SummaryValue>{formatCurrency(serviceCharge, operationSettings.currency)}</SummaryValue>
          </SummaryRow>
        )}
        {taxEnabled && tax > 0 && (
          <SummaryRow>
            <SummaryLabel>Tax ({taxRate}%)</SummaryLabel>
            <SummaryValue>{formatCurrency(tax, operationSettings.currency)}</SummaryValue>
          </SummaryRow>
        )}
      </OrderSummary>

      <TotalSection>
        <TotalLabel>Total Amount</TotalLabel>
        <TotalPrice>{formatCurrency(total, operationSettings.currency)}</TotalPrice>
      </TotalSection>

      {/* Points Section - Only show if customer has points and membership is active */}
      {membershipSettings?.is_active && customerPoints > 0 && (
        <PointsSection>
          <PointsHeader>
            <PointsTitle>Use Points ({customerTier})</PointsTitle>
            <PointsBalance>{customerPoints.toLocaleString()} pts available</PointsBalance>
          </PointsHeader>

          {maxPointsForOrder > 0 ? (
            <>
              <PointsToggle>
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => {
                    setUsePoints(e.target.checked);
                    if (!e.target.checked) {
                      setPointsToUse(0);
                    } else {
                      setPointsToUse(maxPointsForOrder);
                    }
                  }}
                />
                <span>Use points for this order</span>
              </PointsToggle>

              {usePoints && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                    <span>{membershipSettings?.min_points_to_use || 100} pts</span>
                    <span>{maxPointsForOrder.toLocaleString()} pts (max)</span>
                  </div>
                  <PointsSlider
                    type="range"
                    min={membershipSettings?.min_points_to_use || 100}
                    max={maxPointsForOrder}
                    value={pointsToUse}
                    onChange={(e) => setPointsToUse(Number(e.target.value))}
                  />
                  <PointsInfo>
                    <PointsUsing>
                      Using: <strong>{pointsToUse.toLocaleString()} pts</strong>
                    </PointsUsing>
                    <PointsDiscount>
                      -{formatCurrency(pointDiscount, operationSettings.currency)}
                    </PointsDiscount>
                  </PointsInfo>
                </>
              )}
            </>
          ) : (
            <div style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center' }}>
              Minimum {membershipSettings?.min_points_to_use || 100} points required to use
            </div>
          )}

          {/* Points earning preview */}
          {membershipSettings?.points_per_currency && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: '#FEF3C7',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#92400E'
            }}>
              {(() => {
                const bonusRate = customerTier === 'VIP' ? parseFloat(membershipSettings.vip_bonus_rate) :
                  customerTier === 'Gold' ? parseFloat(membershipSettings.gold_bonus_rate) :
                  customerTier === 'Silver' ? parseFloat(membershipSettings.silver_bonus_rate) :
                  parseFloat(membershipSettings.bronze_bonus_rate);
                const orderAmount = subtotal - discountAmount - couponDiscount - pointDiscount;
                const earnedPoints = Math.floor(orderAmount * parseFloat(membershipSettings.points_per_currency) * bonusRate);
                const pointValue = earnedPoints / parseFloat(membershipSettings.points_to_currency);
                return (
                  <>
                    Will earn: <strong>{earnedPoints.toLocaleString()}</strong> pts
                    {' '}({formatCurrency(pointValue, operationSettings.currency)} value)
                    {customerTier !== 'Bronze' && ` (${customerTier} ${bonusRate}x)`}
                  </>
                );
              })()}
            </div>
          )}
        </PointsSection>
      )}

      {/* Points earning preview for non-member customers */}
      {membershipSettings?.is_active && customerPoints === 0 && membershipSettings?.points_per_currency && (
        <div style={{
          marginBottom: '16px',
          padding: '12px',
          background: '#F0FDF4',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#166534',
          border: '1px solid #BBF7D0'
        }}>
          {(() => {
            const orderAmount = subtotal - discountAmount - couponDiscount;
            const earnedPoints = Math.floor(orderAmount * parseFloat(membershipSettings.points_per_currency));
            const pointValue = earnedPoints / parseFloat(membershipSettings.points_to_currency);
            return (
              <>
                Members earn: <strong>{earnedPoints.toLocaleString()}</strong> pts
                {' '}({formatCurrency(pointValue, operationSettings.currency)} value)
              </>
            );
          })()}
        </div>
      )}

      <Section>
        <Label>Payment Method</Label>
        <RadioGroup>
          {availableMethods.map(method => (
            <RadioButton
              key={method.key}
              selected={paymentMethod === method.key}
              onClick={() => setPaymentMethod(method.key)}
            >
              <div>{method.label}</div>
            </RadioButton>
          ))}
        </RadioGroup>
      </Section>

      {paymentMethod === 'cash' && (
        <InputSection>
          <Label>Cash Amount</Label>
          <AmountInput
            type="text"
            placeholder="Enter amount received"
            value={cashAmount}
            onChange={(e) => handleCashAmountChange(e.target.value)}
            autoFocus
          />
          <QuickAmountGrid>
            {quickAmounts.map(amount => (
              <QuickAmountBtn
                key={amount}
                selected={cashAmount === amount.toString()}
                onClick={() => setCashAmount(amount.toString())}
              >
                {formatCurrency(amount, operationSettings.currency)}
              </QuickAmountBtn>
            ))}
          </QuickAmountGrid>

          {parseFloat(cashAmount) >= total && (
            <ChangeDisplay>
              <ChangeLabel>Change</ChangeLabel>
              <ChangeAmount>{formatCurrency(calculateChange(), operationSettings.currency)}</ChangeAmount>
            </ChangeDisplay>
          )}
        </InputSection>
      )}
    </Modal>
  );
};

export default PaymentModal;