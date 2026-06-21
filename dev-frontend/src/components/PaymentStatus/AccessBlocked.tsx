import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePaymentStatus } from '../../contexts/PaymentStatusContext';
import { formatCurrency } from '../../utils/paymentStatus';

const BlockedContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 50%, #FCA5A5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const BlockedCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 48px 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 2px solid #FCA5A5;
`;

const BlockedIcon = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const BlockedTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #991B1B;
  margin-bottom: 16px;
`;

const BlockedMessage = styled.p`
  font-size: 18px;
  color: #7F1D1D;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const AmountSection = styled.div`
  background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #FECACA;
`;

const AmountLabel = styled.div`
  font-size: 16px;
  color: #B91C1C;
  margin-bottom: 8px;
  font-weight: 500;
`;

const AmountValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #DC2626;
  margin-bottom: 8px;
`;

const OverdueInfo = styled.div`
  font-size: 14px;
  color: #991B1B;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const PayButton = styled.button`
  background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const HelpSection = styled.div`
  background: #F1F4F8;
  border-radius: 8px;
  padding: 20px;
  margin-top: 32px;
  text-align: left;
`;

const HelpTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
`;

const ContactInfo = styled.div`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
  
  strong {
    color: #0A2540;
    font-weight: 600;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  color: #4B5563;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F4F8;
    color: #0A2540;
    border-color: #64748B;
  }
`;

export const AccessBlocked: React.FC = () => {
  const { paymentStatus } = usePaymentStatus();
  const navigate = useNavigate();

  const goToInvoices = () => {
    navigate('/invoices');
  };

  const logout = () => {
    navigate('/pos');
  };

  return (
    <BlockedContainer>
      <BlockedCard>
        <BlockedIcon>-</BlockedIcon>

        <BlockedTitle>Access Suspended</BlockedTitle>
        
        <BlockedMessage>
          Your account has been temporarily suspended due to overdue payment.
          Please settle your outstanding invoices to restore full access to all services.
        </BlockedMessage>
        
        <AmountSection>
          <AmountLabel>Outstanding Amount</AmountLabel>
          <AmountValue>{formatCurrency(paymentStatus.overdueAmount)}</AmountValue>
          <OverdueInfo>
            Overdue for {paymentStatus.overdueDays} days
          </OverdueInfo>
        </AmountSection>
        
        <ActionSection>
          <PayButton onClick={goToInvoices}>
            View & Pay Invoices
          </PayButton>
          
          <LogoutButton onClick={logout}>
            Switch Account
          </LogoutButton>
        </ActionSection>
        
        <HelpSection>
          <HelpTitle>Need Help?</HelpTitle>
          <ContactInfo>
            <strong>Support Team:</strong><br />
            Email: billing@orderhere.com<br />
            Phone: +60 3-1234-5678<br />
            Hours: Mon-Fri 9AM-6PM (GMT+8)<br />
            <br />
            <strong>Payment Methods:</strong><br />
            • Online Banking Transfer<br />
            • Credit/Debit Card<br />
            • FPX Payment Gateway<br />
            • Cash Deposit (Selected Banks)
          </ContactInfo>
        </HelpSection>
      </BlockedCard>
    </BlockedContainer>
  );
};