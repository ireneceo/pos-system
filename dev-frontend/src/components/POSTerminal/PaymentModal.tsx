import React, { useState, useEffect } from 'react';
import { Modal, ModalButton as Button, FormLabel as Label } from '../UI/Modal';
import {
  Section,
  RadioGroup,
  RadioButton,
  TotalSection,
  TotalLabel,
  TotalPrice
} from '../Common/Modal';
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
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const PointsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const PointsTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`;

const PointsTier = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const PointsBalance = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
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
    accent-color: #635BFF;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #1F2937;
  }
`;

const PointsSlider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #E5E7EB;
  accent-color: #635BFF;
  cursor: pointer;
`;

const PointsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: #EFF6FF;
  border-radius: 8px;
`;

const PointsUsing = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`;

const PointsConversion = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const PointsDiscount = styled.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`;

// Helper function to get fetch options with auth token
const getFetchOptionsForModal = (options: RequestInit = {}): RequestInit => {
  const token = localStorage.getItem('auth_token');
  return {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  };
};

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
  onConfirmPayment: (paymentMethod: string, amountReceived?: number, change?: number, pointsUsed?: number, pointDiscount?: number, cardType?: string) => void;
  paymentMethods?: any;
  taxRate?: number;
  serviceChargeRate?: number;
  taxEnabled?: boolean;
  serviceChargeEnabled?: boolean;
  cashierName?: string;       // Current cashier name to display
  // Points props - can use customerId/restaurantId OR direct values
  customerId?: number;        // If provided, modal will fetch data internally
  restaurantId?: number;      // Required if customerId is provided
  customerPoints?: number;    // Direct value (used by POS Terminal)
  customerTier?: string;      // Direct value (used by POS Terminal)
  membershipSettings?: any;   // Direct value or will be fetched if restaurantId provided
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
  cashierName,
  customerId,
  restaurantId,
  customerPoints: propCustomerPoints = 0,
  customerTier: propCustomerTier = 'Bronze',
  membershipSettings: propMembershipSettings,
  onPointsChange
}) => {
  const { operationSettings } = useStore();

  // Internal state for fetched data (when customerId/restaurantId are provided)
  const [fetchedPoints, setFetchedPoints] = useState<number>(0);
  const [fetchedTier, setFetchedTier] = useState<string>('Bronze');
  const [fetchedMembershipSettings, setFetchedMembershipSettings] = useState<any>(null);
  const [isLoadingPoints, setIsLoadingPoints] = useState(false);

  // Use fetched values if customerId is provided, otherwise use props
  const customerPoints = customerId ? fetchedPoints : propCustomerPoints;
  const customerTier = customerId ? fetchedTier : propCustomerTier;
  const membershipSettings = customerId && !propMembershipSettings ? fetchedMembershipSettings : propMembershipSettings;

  // Fetch membership settings and customer points when modal opens with customerId
  useEffect(() => {
    if (!isOpen || !customerId || !restaurantId) {
      return;
    }

    const fetchData = async () => {
      setIsLoadingPoints(true);
      try {
        // Fetch membership settings if not provided
        if (!propMembershipSettings) {
          const settingsResponse = await fetch(
            `/api/membership/settings/${restaurantId}`,
            getFetchOptionsForModal()
          );
          const settingsResult = await settingsResponse.json();
          if (settingsResult.success && settingsResult.data) {
            setFetchedMembershipSettings(settingsResult.data);
          }
        }

        // Fetch customer points
        const pointsResponse = await fetch(
          `/api/membership/customer/${restaurantId}/${customerId}`,
          getFetchOptionsForModal()
        );
        const pointsResult = await pointsResponse.json();
        if (pointsResult.success && pointsResult.data) {
          setFetchedPoints(pointsResult.data.points || 0);
          setFetchedTier(pointsResult.data.loyalty_tier || 'Bronze');
        }
      } catch (error) {
        console.error('PaymentModal: Failed to fetch membership data:', error);
      } finally {
        setIsLoadingPoints(false);
      }
    };

    fetchData();
  }, [isOpen, customerId, restaurantId, propMembershipSettings]);

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
      // Reset fetched data for next open
      setFetchedPoints(0);
      setFetchedTier('Bronze');
      setFetchedMembershipSettings(null);
    }
  }, [isOpen]);

  // Adjusted total after point discount
  const total = originalTotal - pointDiscount;

  // Get available payment methods for POS
  const getAvailablePaymentMethods = () => {
    if (!paymentMethods) {
      return [];
    }

    // Use saved order if available, otherwise iterate all keys
    const savedOrder = paymentMethods._order;
    const allKeys = Object.keys(paymentMethods).filter(k => k !== '_order');
    const methodOrder = savedOrder && Array.isArray(savedOrder)
      ? savedOrder.filter((k: string) => k !== '_order')
      : allKeys;

    // Add any keys not in saved order (e.g. newly added payment methods)
    const missingKeys = allKeys.filter(k => !methodOrder.includes(k));
    const fullOrder = [...methodOrder, ...missingKeys];

    const methods: any[] = [];

    fullOrder.forEach((key: string) => {
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

  // Update selected payment method when paymentMethods load/change
  useEffect(() => {
    if (availableMethods.length > 0 && !availableMethods.find(m => m.key === paymentMethod)) {
      setPaymentMethod(availableMethods[0].key);
    }
  }, [paymentMethods]); // eslint-disable-line react-hooks/exhaustive-deps
  const [cashAmount, setCashAmount] = useState('');
  const [cardType, setCardType] = useState<string>('');

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
    } else if (paymentMethod === 'card') {
      onConfirmPayment(paymentMethod, undefined, undefined, pointsToUse, pointDiscount, cardType);
    } else if (paymentMethod === 'staffMeal') {
      onConfirmPayment(paymentMethod, undefined, undefined, 0, 0);
    } else {
      onConfirmPayment(paymentMethod, undefined, undefined, pointsToUse, pointDiscount);
    }
  };

  const canConfirm = () => {
    if (!paymentMethods || availableMethods.length === 0) return false;
    if (paymentMethod === 'cash') {
      const amount = parseFloat(cashAmount) || 0;
      return amount >= total;
    }
    if (paymentMethod === 'card') {
      return true;
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
        {cashierName && (
          <SummaryRow>
            <SummaryLabel>Cashier</SummaryLabel>
            <SummaryValue>{cashierName}</SummaryValue>
          </SummaryRow>
        )}
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

      {/* Points Section - Show loading state or points info */}
      {isLoadingPoints && customerId && (
        <PointsSection>
          <PointsHeader>
            <div>
              <PointsTitle>Loading Points...</PointsTitle>
              <PointsTier>Please wait</PointsTier>
            </div>
          </PointsHeader>
        </PointsSection>
      )}
      {!isLoadingPoints && membershipSettings?.is_active && customerPoints > 0 && (
        <PointsSection>
          {/* Points Info Header */}
          <PointsHeader>
            <div>
              <PointsTitle>Available Points</PointsTitle>
              <PointsTier>{customerTier} Member</PointsTier>
            </div>
            <PointsBalance>{customerPoints.toLocaleString()} pts</PointsBalance>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
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
                    <div>
                      <PointsUsing>Using: {pointsToUse.toLocaleString()} pts</PointsUsing>
                      <PointsConversion>({membershipSettings?.points_to_currency || 100} pts = {formatCurrency(1, operationSettings.currency)})</PointsConversion>
                    </div>
                    <PointsDiscount>
                      -{formatCurrency(pointDiscount, operationSettings.currency)}
                    </PointsDiscount>
                  </PointsInfo>
                </>
              )}
            </>
          ) : (
            <div style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', padding: '12px' }}>
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
                    You will earn approximately <strong>{earnedPoints.toLocaleString()}</strong> pts
                    {' '}({formatCurrency(pointValue, operationSettings.currency)} value) from this order
                    {customerTier !== 'Bronze' && ` (${customerTier} ${bonusRate}x bonus)`}
                  </>
                );
              })()}
            </div>
          )}
        </PointsSection>
      )}

      {/* Points earning preview - only show for logged-in customers with 0 points (not for guests) */}
      {!isLoadingPoints && membershipSettings?.is_active && customerId && customerPoints === 0 && membershipSettings?.points_per_currency && (
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
        {!paymentMethods ? (
          <div style={{ color: '#6B7C93', fontSize: '14px', padding: '12px 0' }}>
            Loading payment methods...
          </div>
        ) : availableMethods.length === 0 ? (
          <div style={{ color: '#E25950', fontSize: '14px', padding: '12px 0' }}>
            No payment methods enabled for POS. Please configure in Settings → Payment.
          </div>
        ) : (
        <RadioGroup>
          {availableMethods.map(method => (
            <RadioButton
              key={method.key}
              selected={paymentMethod === method.key}
              onClick={() => { setPaymentMethod(method.key); setCardType(''); }}
            >
              <div>{method.label}</div>
            </RadioButton>
          ))}
        </RadioGroup>
        )}
      </Section>

      {paymentMethod === 'card' && (
        <InputSection>
          <Label>Card Type (Optional)</Label>
          <QuickAmountGrid>
            {['visa', 'master', 'amex', 'other'].map(type => (
              <QuickAmountBtn
                key={type}
                selected={cardType === type}
                onClick={() => setCardType(cardType === type ? '' : type)}
              >
                {type === 'visa' ? 'Visa' : type === 'master' ? 'Master' : type === 'amex' ? 'Amex' : 'Other'}
              </QuickAmountBtn>
            ))}
          </QuickAmountGrid>
        </InputSection>
      )}

      {paymentMethod === 'staffMeal' && (
        <div style={{
          background: '#FFF7ED',
          border: '1px solid #FDBA74',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '13px',
          color: '#9A3412',
          lineHeight: '1.5'
        }}>
          Staff meal is recorded at full price but excluded from revenue reports.
        </div>
      )}

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