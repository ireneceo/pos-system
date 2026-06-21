import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePaymentStatus } from '../../contexts/PaymentStatusContext';
import { formatCurrency, getRestrictedFeatures } from '../../utils/paymentStatus';

// Warning Banner (1-3 days overdue)
const WarningBanner = styled.div`
  background: linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%);
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: between;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
`;

const WarningContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const WarningIcon = styled.div`
  font-size: 24px;
  color: #D97706;
`;

const WarningText = styled.div`
  color: #92400E;
`;

const WarningTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const WarningMessage = styled.div`
  font-size: 14px;
  line-height: 1.4;
`;

const WarningActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const WarningButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: #D97706;
    color: white;
    
    &:hover {
      background: #B45309;
    }
  ` : `
    background: transparent;
    color: #92400E;
    border: 1px solid #D97706;
    
    &:hover {
      background: rgba(217, 119, 6, 0.1);
    }
  `}
`;

// Modal Base
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  margin: auto 0;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: auto 0;
`;

const ModalHeader = styled.div<{ type: 'partial' | 'blocked' }>`
  padding: 24px 24px 16px 24px;
  background: ${props => props.type === 'blocked' ? 
    'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)' : 
    'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
  };
  border-bottom: 1px solid ${props => props.type === 'blocked' ? '#FCA5A5' : '#F59E0B'};
  text-align: center;
`;

const ModalIcon = styled.div<{ type: 'partial' | 'blocked' }>`
  font-size: 48px;
  margin-bottom: 12px;
  color: ${props => props.type === 'blocked' ? '#DC2626' : '#D97706'};
`;

const ModalTitle = styled.h2<{ type: 'partial' | 'blocked' }>`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.type === 'blocked' ? '#991B1B' : '#92400E'};
  margin: 0 0 8px 0;
`;

const ModalSubtitle = styled.p<{ type: 'partial' | 'blocked' }>`
  font-size: 16px;
  color: ${props => props.type === 'blocked' ? '#B91C1C' : '#A16207'};
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const AmountSection = styled.div`
  background: #F1F4F8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

const AmountLabel = styled.div`
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 4px;
`;

const AmountValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #DC2626;
`;

const RestrictedFeatures = styled.div`
  margin-bottom: 20px;
`;

const RestrictedTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`;

const FeatureList = styled.ul`
  margin: 0;
  padding-left: 20px;
  list-style-type: none;
  
  li {
    position: relative;
    font-size: 14px;
    color: #4B5563;
    margin-bottom: 8px;
    padding-left: 8px;
    
    &::before {
      content: '•';
      position: absolute;
      left: -16px;
      top: 0;
    }
  }
`;

const InvoiceList = styled.div`
  background: #FEF2F2;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const InvoiceListTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #991B1B;
  margin: 0 0 12px 0;
`;

const InvoiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #FCA5A5;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InvoiceInfo = styled.div`
  font-size: 14px;
  color: #7F1D1D;
`;

const InvoiceAmount = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #991B1B;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
`;

const ActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: #EF4444;
    color: white;
    
    &:hover {
      background: #B91C1C;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
    }
  ` : `
    background: transparent;
    color: #4B5563;
    border: 1px solid #C7CED6;
    
    &:hover {
      background: #F1F4F8;
      color: #0A2540;
      border-color: #64748B;
    }
  `}
`;

export const PaymentStatusModals: React.FC = () => {
  const { 
    paymentStatus, 
    showWarning, 
    showPartialRestriction, 
    showBlockedModal, 
    dismissWarning, 
    dismissPartialRestriction 
  } = usePaymentStatus();
  
  const navigate = useNavigate();

  const goToInvoices = () => {
    navigate('/invoices');
  };

  // Warning Banner (1-3 days overdue)
  if (showWarning && paymentStatus.restrictionLevel === 'warning') {
    return (
      <WarningBanner>
        <WarningContent>
          <WarningIcon>!</WarningIcon>
          <WarningText>
            <WarningTitle>Payment Reminder</WarningTitle>
            <WarningMessage>
              You have {formatCurrency(paymentStatus.overdueAmount)} in overdue invoices. 
              Some features may be restricted in {paymentStatus.nextRestrictionDate ? 
                Math.ceil((new Date(paymentStatus.nextRestrictionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
                : 1} days if not paid.
            </WarningMessage>
          </WarningText>
        </WarningContent>
        <WarningActions>
          <WarningButton variant="primary" onClick={goToInvoices}>
            Pay Now
          </WarningButton>
          <WarningButton onClick={dismissWarning}>
            Dismiss
          </WarningButton>
        </WarningActions>
      </WarningBanner>
    );
  }

  // Partial Restriction Modal (4-7 days overdue)
  if (showPartialRestriction && paymentStatus.restrictionLevel === 'partial') {
    const restrictedFeatures = getRestrictedFeatures('partial');
    
    return (
      <Modal>
        <ModalContent>
          <ModalHeader type="partial">
            <ModalIcon type="partial">×</ModalIcon>
            <ModalTitle type="partial">Service Restrictions Active</ModalTitle>
            <ModalSubtitle type="partial">
              Payment overdue for {paymentStatus.overdueDays} days
            </ModalSubtitle>
          </ModalHeader>
          
          <ModalBody>
            <AmountSection>
              <AmountLabel>Outstanding Amount</AmountLabel>
              <AmountValue>{formatCurrency(paymentStatus.overdueAmount)}</AmountValue>
            </AmountSection>
            
            <RestrictedFeatures>
              <RestrictedTitle>Restricted Features:</RestrictedTitle>
              <FeatureList>
                {restrictedFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </FeatureList>
            </RestrictedFeatures>
            
            <InvoiceList>
              <InvoiceListTitle>Overdue Invoices:</InvoiceListTitle>
              {paymentStatus.overdueInvoices.map(invoice => (
                <InvoiceItem key={invoice.id}>
                  <InvoiceInfo>
                    {invoice.invoiceNumber} (Due: {invoice.dueDate})
                  </InvoiceInfo>
                  <InvoiceAmount>{formatCurrency(invoice.amount)}</InvoiceAmount>
                </InvoiceItem>
              ))}
            </InvoiceList>
            
            <div style={{color: '#DC2626', fontSize: '14px', textAlign: 'center', marginBottom: '16px'}}>
              ⏰ Complete access will be blocked in {paymentStatus.nextRestrictionDate ? 
                Math.ceil((new Date(paymentStatus.nextRestrictionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
                : 1} days
            </div>
            
            <ModalActions>
              <ActionButton variant="primary" onClick={goToInvoices}>
                Pay Outstanding Invoices
              </ActionButton>
              <ActionButton variant="secondary" onClick={dismissPartialRestriction}>
                Continue with Restrictions
              </ActionButton>
            </ModalActions>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  // Full Block Modal (8+ days overdue)
  if (showBlockedModal && paymentStatus.restrictionLevel === 'blocked') {
    const restrictedFeatures = getRestrictedFeatures('blocked');
    
    return (
      <Modal>
        <ModalContent>
          <ModalHeader type="blocked">
            <ModalIcon type="blocked">-</ModalIcon>
            <ModalTitle type="blocked">Access Blocked</ModalTitle>
            <ModalSubtitle type="blocked">
              Account suspended due to overdue payment
            </ModalSubtitle>
          </ModalHeader>
          
          <ModalBody>
            <AmountSection>
              <AmountLabel>Outstanding Amount</AmountLabel>
              <AmountValue>{formatCurrency(paymentStatus.overdueAmount)}</AmountValue>
            </AmountSection>
            
            <div style={{background: '#FEE2E2', padding: '16px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center'}}>
              <div style={{fontSize: '16px', fontWeight: '600', color: '#991B1B', marginBottom: '8px'}}>
                Service Suspended
              </div>
              <div style={{fontSize: '14px', color: '#B91C1C'}}>
                Your account has been suspended due to payment overdue for {paymentStatus.overdueDays} days.
                All business operations are currently unavailable.
              </div>
            </div>
            
            <RestrictedFeatures>
              <RestrictedTitle>Blocked Features:</RestrictedTitle>
              <FeatureList>
                {restrictedFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </FeatureList>
            </RestrictedFeatures>
            
            <InvoiceList>
              <InvoiceListTitle>Overdue Invoices:</InvoiceListTitle>
              {paymentStatus.overdueInvoices.map(invoice => (
                <InvoiceItem key={invoice.id}>
                  <InvoiceInfo>
                    {invoice.invoiceNumber} (Due: {invoice.dueDate})
                  </InvoiceInfo>
                  <InvoiceAmount>{formatCurrency(invoice.amount)}</InvoiceAmount>
                </InvoiceItem>
              ))}
            </InvoiceList>
            
            <ModalActions>
              <ActionButton variant="primary" onClick={goToInvoices}>
                Pay Now to Restore Access
              </ActionButton>
            </ModalActions>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return null;
};