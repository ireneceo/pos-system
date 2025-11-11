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
  onConfirmPayment: (paymentMethod: string, amountReceived?: number, change?: number) => void;
  paymentMethods?: any;
  taxRate?: number;
  serviceChargeRate?: number;
  taxEnabled?: boolean;
  serviceChargeEnabled?: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  total,
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
  serviceChargeEnabled = false
}) => {
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

    // Fixed order: Cash first, then others
    const methodOrder = ['cash', 'card', 'ewallet', 'bankTransfer'];
    const methods: any[] = [];

    methodOrder.forEach(key => {
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
        onConfirmPayment(paymentMethod, amount, calculateChange());
      }
    } else {
      onConfirmPayment(paymentMethod);
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
          <SummaryValue>RM {subtotal.toFixed(2)}</SummaryValue>
        </SummaryRow>
        {takeawayCharge > 0 && (
          <SummaryRow>
            <SummaryLabel>Takeaway Charge</SummaryLabel>
            <SummaryValue>RM {takeawayCharge.toFixed(2)}</SummaryValue>
          </SummaryRow>
        )}
        {discountAmount > 0 && (
          <DiscountRow>
            <SummaryLabel>Discount</SummaryLabel>
            <SummaryValue>-RM {discountAmount.toFixed(2)}</SummaryValue>
          </DiscountRow>
        )}
        {couponDiscount > 0 && (
          <DiscountRow>
            <SummaryLabel>Coupon Discount</SummaryLabel>
            <SummaryValue>-RM {couponDiscount.toFixed(2)}</SummaryValue>
          </DiscountRow>
        )}
        {serviceChargeEnabled && serviceCharge > 0 && (
          <SummaryRow>
            <SummaryLabel>Service Charge ({serviceChargeRate}%)</SummaryLabel>
            <SummaryValue>RM {serviceCharge.toFixed(2)}</SummaryValue>
          </SummaryRow>
        )}
        {taxEnabled && tax > 0 && (
          <SummaryRow>
            <SummaryLabel>Tax ({taxRate}%)</SummaryLabel>
            <SummaryValue>RM {tax.toFixed(2)}</SummaryValue>
          </SummaryRow>
        )}
      </OrderSummary>

      <TotalSection>
        <TotalLabel>Total Amount</TotalLabel>
        <TotalPrice>RM {total.toFixed(2)}</TotalPrice>
      </TotalSection>

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
                RM {amount}
              </QuickAmountBtn>
            ))}
          </QuickAmountGrid>
          
          {parseFloat(cashAmount) >= total && (
            <ChangeDisplay>
              <ChangeLabel>Change</ChangeLabel>
              <ChangeAmount>RM {calculateChange().toFixed(2)}</ChangeAmount>
            </ChangeDisplay>
          )}
        </InputSection>
      )}
    </Modal>
  );
};

export default PaymentModal;