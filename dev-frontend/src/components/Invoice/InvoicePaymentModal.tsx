import React, { useState } from 'react';
import styled from 'styled-components';
import { Invoice, PaymentSettings, PaymentSubmitData, CURRENCY_CONFIG } from './types';
import { formatDate as formatDateTz } from '../../utils/timezone';
import InvoiceStatusBadge from './InvoiceStatusBadge';
import StripePaymentForm from './StripePaymentForm';
import PayPalPaymentForm from './PayPalPaymentForm';

interface Props {
  isOpen: boolean;
  invoice: Invoice | null;
  onClose: () => void;
  onSubmit: (paymentData: PaymentSubmitData) => Promise<void>;
  paymentSettings?: PaymentSettings;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  margin: auto 0;
`;

const Header = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #374151;
  }
`;

const Content = styled.div`
  padding: 24px;
`;

const InvoiceSummary = styled.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 12px;
    border-top: 1px solid #E5E7EB;
    font-weight: 600;
  }
`;

const Label = styled.span`
  color: #6B7280;
  font-size: 14px;
`;

const Value = styled.span`
  color: #0A2540;
  font-size: 14px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
`;

const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethodCard = styled.button<{ selected: boolean; disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 2px solid ${props => props.selected ? '#635BFF' : '#E5E7EB'};
  border-radius: 8px;
  background: ${props => props.selected ? '#F5F3FF' : 'white'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${props => props.selected ? '#635BFF' : '#D1D5DB'};
  }
`;

const MethodIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const MethodName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const MethodDesc = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const BankDetails = styled.div`
  background: #F3F4F6;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;

  p {
    margin: 4px 0;
    font-size: 14px;
    color: #374151;
  }

  strong {
    color: #0A2540;
  }
`;

const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: #5A51E6;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #E5E7EB;

    &:hover {
      background: #F9FAFB;
    }
  `}
`;

const RejectionWarning = styled.div`
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  color: #DC2626;
  font-size: 14px;
`;

const InvoicePaymentModal: React.FC<Props> = ({
  isOpen,
  invoice,
  onClose,
  onSubmit,
  paymentSettings
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('bank_transfer');
  const [receiptUrl, setReceiptUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!invoice) return null;

  const currencyConfig = CURRENCY_CONFIG[invoice.currency] || CURRENCY_CONFIG.MYR;
  const formatAmount = (amount: number) => `${currencyConfig.symbol} ${amount.toFixed(currencyConfig.decimals)}`;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit({
        invoiceId: invoice.id,
        paymentMethod,
        receiptUrl: receiptUrl || undefined,
        notes: notes || undefined
      });
      // Reset form
      setPaymentMethod('bank_transfer');
      setReceiptUrl('');
      setNotes('');
      onClose();
    } catch (error) {
      console.error('Payment submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const bankTransferEnabled = paymentSettings?.bankTransfer?.enabled !== false;
  const stripeEnabled = paymentSettings?.stripe?.enabled === true;
  const paypalEnabled = paymentSettings?.paypal?.enabled === true;
  const qrEnabled = paymentSettings?.qrPayment?.enabled === true;

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header>
          <Title>Submit Payment</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>

        <Content>
          {invoice.rejectionReason && (
            <RejectionWarning>
              Previous payment was rejected: {invoice.rejectionReason}
            </RejectionWarning>
          )}

          <InvoiceSummary>
            <SummaryRow>
              <Label>Invoice Number</Label>
              <Value>{invoice.invoiceNumber}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Status</Label>
              <InvoiceStatusBadge status={invoice.status} size="small" />
            </SummaryRow>
            <SummaryRow>
              <Label>Due Date</Label>
              <Value>{formatDateTz(invoice.dueDate, null)}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Subtotal</Label>
              <Value>{formatAmount(invoice.amount)}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Tax</Label>
              <Value>{formatAmount(invoice.tax)}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Total Amount</Label>
              <Value style={{ fontSize: '16px', fontWeight: 700 }}>{formatAmount(invoice.total)}</Value>
            </SummaryRow>
          </InvoiceSummary>

          <Section>
            <SectionTitle>Select Payment Method</SectionTitle>
            <PaymentMethodGrid>
              <PaymentMethodCard
                selected={paymentMethod === 'bank_transfer'}
                onClick={() => setPaymentMethod('bank_transfer')}
                disabled={!bankTransferEnabled}
              >
                <MethodIcon>🏦</MethodIcon>
                <MethodName>Bank Transfer</MethodName>
                <MethodDesc>Manual bank transfer</MethodDesc>
              </PaymentMethodCard>

              <PaymentMethodCard
                selected={paymentMethod === 'stripe'}
                onClick={() => setPaymentMethod('stripe')}
                disabled={!stripeEnabled}
              >
                <MethodIcon>💳</MethodIcon>
                <MethodName>Credit Card</MethodName>
                <MethodDesc>{stripeEnabled ? 'Via Stripe' : 'Coming soon'}</MethodDesc>
              </PaymentMethodCard>

              <PaymentMethodCard
                selected={paymentMethod === 'paypal'}
                onClick={() => setPaymentMethod('paypal')}
                disabled={!paypalEnabled}
              >
                <MethodIcon>🅿️</MethodIcon>
                <MethodName>PayPal</MethodName>
                <MethodDesc>{paypalEnabled ? 'Pay with PayPal' : 'Coming soon'}</MethodDesc>
              </PaymentMethodCard>

              <PaymentMethodCard
                selected={paymentMethod === 'qr_payment'}
                onClick={() => setPaymentMethod('qr_payment')}
                disabled={!qrEnabled}
              >
                <MethodIcon>📱</MethodIcon>
                <MethodName>QR Payment</MethodName>
                <MethodDesc>{qrEnabled ? 'Scan to pay' : 'Coming soon'}</MethodDesc>
              </PaymentMethodCard>
            </PaymentMethodGrid>
          </Section>

          {paymentMethod === 'stripe' && stripeEnabled && invoice && (
            <Section>
              <SectionTitle>Card Payment</SectionTitle>
              <StripePaymentForm
                invoiceId={invoice.id}
                onSuccess={() => {
                  setPaymentMethod('bank_transfer');
                  setReceiptUrl('');
                  setNotes('');
                  onClose();
                }}
                onError={(error) => {
                  console.error('Stripe payment error:', error);
                }}
              />
            </Section>
          )}

          {paymentMethod === 'paypal' && paypalEnabled && invoice && (
            <Section>
              <SectionTitle>PayPal Payment</SectionTitle>
              <PayPalPaymentForm
                invoiceId={invoice.id}
                onSuccess={() => {
                  setPaymentMethod('bank_transfer');
                  setReceiptUrl('');
                  setNotes('');
                  onClose();
                }}
                onError={(error) => {
                  console.error('PayPal payment error:', error);
                }}
              />
            </Section>
          )}

          {paymentMethod === 'bank_transfer' && paymentSettings?.bankTransfer && (
            <BankDetails>
              <p><strong>Bank Name:</strong> {paymentSettings.bankTransfer.bankName || 'N/A'}</p>
              <p><strong>Account Number:</strong> {paymentSettings.bankTransfer.accountNumber || 'N/A'}</p>
              <p><strong>Account Name:</strong> {paymentSettings.bankTransfer.accountName || 'N/A'}</p>
              {paymentSettings.bankTransfer.swiftCode && (
                <p><strong>SWIFT Code:</strong> {paymentSettings.bankTransfer.swiftCode}</p>
              )}
            </BankDetails>
          )}

          {paymentMethod !== 'stripe' && paymentMethod !== 'paypal' && (
            <Section>
              <FormGroup>
                <FormLabel>Receipt URL (optional)</FormLabel>
                <FormInput
                  type="url"
                  placeholder="https://example.com/receipt.pdf"
                  value={receiptUrl}
                  onChange={e => setReceiptUrl(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Notes (optional)</FormLabel>
                <FormTextarea
                  placeholder="Add any payment notes or reference numbers..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </FormGroup>
            </Section>
          )}
        </Content>

        <Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {paymentMethod !== 'stripe' && paymentMethod !== 'paypal' && (
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Payment'}
            </Button>
          )}
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default InvoicePaymentModal;
