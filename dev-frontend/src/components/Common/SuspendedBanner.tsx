import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

// Banner shown on the invoice page when the account is suspended due to overdue
// invoices. ProtectedRoute pins suspended users here; this banner explains why
// and tells them what to do.
const Banner = styled.div`
  background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%);
  border: 1px solid #FED7AA;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const IconWrap = styled.div`
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #F97316;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
`;

const Body = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #9A3412;
  margin-bottom: 4px;
`;

const Sub = styled.div`
  font-size: 13px;
  color: #7C2D12;
  line-height: 1.55;
`;

const SuspendedBanner: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;
  const isExempt =
    user.role === 'System Admin' ||
    user.isDemo || user.isTest ||
    user.restaurantIsDemo || user.restaurantIsTest;
  const isSuspended =
    user.subscriptionStatus === 'suspended' ||
    user.restaurantStatus === 'suspended';
  if (!isSuspended || isExempt) return null;

  return (
    <Banner role="alert">
      <IconWrap>!</IconWrap>
      <Body>
        <Title>Account on hold — overdue invoice</Title>
        <Sub>
          Service is paused because of an unpaid invoice. Pay any overdue invoice
          below to restore full access. The account reactivates automatically
          once payment is confirmed.
        </Sub>
      </Body>
    </Banner>
  );
};

export default SuspendedBanner;
