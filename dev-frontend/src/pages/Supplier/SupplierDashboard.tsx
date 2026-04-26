import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DashboardStatsGrid, DashboardStatCard, DashboardStatLabel, DashboardStatValue } from '../../components/UI';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/timezone';
import { getAuthToken } from '../../utils/auth';

interface SubscriptionInfo {
  plan_name: string | null;
  status: string | null;
  trial_end_date: string | null;
  days_until_trial_end: number | null;
}

interface DashboardData {
  products_total: number;
  products_active: number;
  low_stock_count: number;
  inventory_value: number;
  subscription: SubscriptionInfo;
}

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7C93;
`;

const SubscriptionBadge = styled.span<{ variant: 'trial' | 'active' | 'expiring' | 'expired' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  ${({ variant }) => {
    switch (variant) {
      case 'trial': return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;';
      case 'active': return 'background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;';
      case 'expiring': return 'background: #FFF7ED; color: #9A3412; border: 1px solid #FDBA74;';
      case 'expired': return 'background: #FEF2F2; color: #991B1B; border: 1px solid #FECACA;';
      default: return 'background: #F3F4F6; color: #374151; border: 1px solid #E5E7EB;';
    }
  }}
`;

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 56px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SubscriptionCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
  }
`;

const SubscriptionRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
`;

const SubscriptionItem = styled.div`
  .label {
    font-size: 12px;
    font-weight: 600;
    color: #6B7C93;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 6px;
  }
  .value {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
  }
`;

const LoadingSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkeletonCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  height: 96px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ErrorBanner = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
`;

const SupplierDashboard: React.FC = () => {
  const { t } = useTranslation('supplier');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const res = await fetch('/api/supplier/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load dashboard');
      }
      setData(json.data);
    } catch (e: any) {
      console.error('[SupplierDashboard] fetch error:', e);
      setError(e.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const subscriptionVariant = (): 'trial' | 'active' | 'expiring' | 'expired' | 'neutral' => {
    if (!data?.subscription) return 'neutral';
    const { status, days_until_trial_end } = data.subscription;
    if (status === 'trial') {
      if (days_until_trial_end !== null && days_until_trial_end <= 0) return 'expired';
      return 'trial';
    }
    if (status === 'expired' || status === 'suspended' || status === 'cancelled') return 'expired';
    if (status === 'overdue') return 'expiring';
    if (status === 'active') return 'active';
    return 'neutral';
  };

  const formatTrialDate = (iso: string | null): string => {
    if (!iso) return '-';
    try {
      return formatDate(iso) || '-';
    } catch {
      return '-';
    }
  };

  return (
    <Container>
      <Header>
        <Title>{t('dashboard.title')}</Title>
        {data?.subscription?.status && (
          <Subtitle>
            {data.subscription.plan_name && <span>{data.subscription.plan_name}</span>}
            <SubscriptionBadge variant={subscriptionVariant()} onClick={() => navigate('/pos/profile?tab=subscription')} style={{ cursor: 'pointer' }}>
              {data.subscription.status === 'trial' && data.subscription.days_until_trial_end !== null
                ? `${t('dashboard.trial')} - ${t('dashboard.daysLeft', { n: Math.max(0, data.subscription.days_until_trial_end) })}`
                : data.subscription.status}
            </SubscriptionBadge>
          </Subtitle>
        )}
      </Header>

      <Content>
        {error && <ErrorBanner>{error}</ErrorBanner>}

        {loading ? (
          <LoadingSkeleton>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </LoadingSkeleton>
        ) : data ? (
          <>
            <DashboardStatsGrid>
              <DashboardStatCard color="#2563EB">
                <DashboardStatLabel>{t('dashboard.totalProducts')}</DashboardStatLabel>
                <DashboardStatValue>{data.products_total.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color="#059669">
                <DashboardStatLabel>{t('dashboard.activeProducts')}</DashboardStatLabel>
                <DashboardStatValue>{data.products_active.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color={data.low_stock_count > 0 ? '#EF4444' : '#10B981'}>
                <DashboardStatLabel>{t('dashboard.lowStockAlert')}</DashboardStatLabel>
                <DashboardStatValue>{data.low_stock_count.toLocaleString()}</DashboardStatValue>
              </DashboardStatCard>
              <DashboardStatCard color="#7C3AED">
                <DashboardStatLabel>{t('dashboard.inventoryValue')}</DashboardStatLabel>
                <DashboardStatValue>{formatCurrency(data.inventory_value, 'MYR')}</DashboardStatValue>
              </DashboardStatCard>
            </DashboardStatsGrid>

            <SubscriptionCard>
              <h3>{t('dashboard.subscription')}</h3>
              <SubscriptionRow>
                <SubscriptionItem>
                  <div className="label">Plan</div>
                  <div className="value">{data.subscription?.plan_name || '-'}</div>
                </SubscriptionItem>
                <SubscriptionItem>
                  <div className="label">Status</div>
                  <div className="value">
                    <SubscriptionBadge variant={subscriptionVariant()}>
                      {data.subscription?.status || '-'}
                    </SubscriptionBadge>
                  </div>
                </SubscriptionItem>
                {data.subscription?.status === 'trial' && (
                  <>
                    <SubscriptionItem>
                      <div className="label">Trial Ends</div>
                      <div className="value">{formatTrialDate(data.subscription.trial_end_date)}</div>
                    </SubscriptionItem>
                    <SubscriptionItem>
                      <div className="label">Days Left</div>
                      <div className="value">
                        {data.subscription.days_until_trial_end !== null
                          ? Math.max(0, data.subscription.days_until_trial_end)
                          : '-'}
                      </div>
                    </SubscriptionItem>
                  </>
                )}
              </SubscriptionRow>
            </SubscriptionCard>

            {data.low_stock_count === 0 && (
              <div style={{ marginTop: 16, padding: 16, background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 8, color: '#065F46', fontSize: 14 }}>
                {t('dashboard.noLowStock')}
              </div>
            )}
          </>
        ) : null}
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
