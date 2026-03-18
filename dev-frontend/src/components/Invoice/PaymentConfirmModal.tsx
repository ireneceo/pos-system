import React, { useState } from 'react';
import styled from 'styled-components';
import { Invoice, CURRENCY_CONFIG } from './types';
import InvoiceStatusBadge from './InvoiceStatusBadge';

interface Props {
  isOpen: boolean;
  invoice: Invoice | null;
  onClose: () => void;
  onConfirm: (notes?: string) => Promise<void>;
  onReject: (reason: string) => Promise<void>;
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

const PaymentInfo = styled.div`
  background: #DBEAFE;
  border: 1px solid #93C5FD;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const PaymentInfoTitle = styled.div`
  font-weight: 600;
  color: #1E40AF;
  margin-bottom: 12px;
  font-size: 14px;
`;

const PaymentDetail = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  color: #1E3A8A;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
  }
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

const RejectWarning = styled.div`
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  color: #DC2626;
  font-size: 13px;
`;

const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'primary' ? `
    background: #10B981;
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: #047857;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  ` : props.variant === 'danger' ? `
    background: #FEF2F2;
    color: #EF4444;
    border: 1px solid #EF4444;

    &:hover:not(:disabled) {
      background: #FEE2E2;
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

const PaymentConfirmModal: React.FC<Props> = ({
  isOpen,
  invoice,
  onClose,
  onConfirm,
  onReject
}) => {
  const [activeTab, setActiveTab] = useState<'confirm' | 'reject'>('confirm');
  const [notes, setNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!invoice) return null;

  const currencyConfig = CURRENCY_CONFIG[invoice.currency] || CURRENCY_CONFIG.MYR;
  const formatAmount = (amount: number) => `${currencyConfig.symbol} ${amount.toFixed(currencyConfig.decimals)}`;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(notes || undefined);
      setNotes('');
      onClose();
    } catch (error) {
      console.error('Confirm error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setLoading(true);
    try {
      await onReject(rejectReason);
      setRejectReason('');
      onClose();
    } catch (error) {
      console.error('Reject error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header>
          <Title>Review Payment</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>

        <Content>
          <InvoiceSummary>
            <SummaryRow>
              <Label>Invoice Number</Label>
              <Value>{invoice.invoiceNumber}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Payer</Label>
              <Value>{invoice.payerName || invoice.restaurantName || 'N/A'}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Amount</Label>
              <Value style={{ fontWeight: 600 }}>{formatAmount(invoice.total)}</Value>
            </SummaryRow>
            <SummaryRow>
              <Label>Status</Label>
              <InvoiceStatusBadge status={invoice.status} size="small" />
            </SummaryRow>
          </InvoiceSummary>

          {invoice.paymentSubmittedAt && (
            <PaymentInfo>
              <PaymentInfoTitle>Payment Submission Details</PaymentInfoTitle>
              <PaymentDetail>
                <strong>Submitted:</strong> {new Date(invoice.paymentSubmittedAt).toLocaleString()}
              </PaymentDetail>
              {invoice.paymentMethod && (
                <PaymentDetail>
                  <strong>Method:</strong> {invoice.paymentMethod.replace('_', ' ').toUpperCase()}
                </PaymentDetail>
              )}
              {invoice.receiptUrl && (
                <PaymentDetail>
                  <strong>Receipt:</strong>{' '}
                  <a href={invoice.receiptUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB' }}>
                    View Receipt
                  </a>
                </PaymentDetail>
              )}
            </PaymentInfo>
          )}

          <TabContainer>
            <Tab active={activeTab === 'confirm'} onClick={() => setActiveTab('confirm')}>
              Confirm Payment
            </Tab>
            <Tab active={activeTab === 'reject'} onClick={() => setActiveTab('reject')}>
              Reject Payment
            </Tab>
          </TabContainer>

          {activeTab === 'confirm' ? (
            <>
              <FormGroup>
                <FormLabel>Confirmation Notes (optional)</FormLabel>
                <FormTextarea
                  placeholder="Add any notes about this payment confirmation..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </FormGroup>
            </>
          ) : (
            <>
              <RejectWarning>
                Rejecting a payment will return the invoice to &quot;Pending Payment&quot; status.
                The payer will need to submit payment again.
              </RejectWarning>
              <FormGroup>
                <FormLabel>Rejection Reason *</FormLabel>
                <FormTextarea
                  placeholder="Please provide a reason for rejecting this payment..."
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  required
                />
              </FormGroup>
            </>
          )}
        </Content>

        <Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {activeTab === 'confirm' ? (
            <Button variant="primary" onClick={handleConfirm} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Payment'}
            </Button>
          ) : (
            <Button variant="danger" onClick={handleReject} disabled={loading || !rejectReason.trim()}>
              {loading ? 'Processing...' : 'Reject Payment'}
            </Button>
          )}
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default PaymentConfirmModal;
