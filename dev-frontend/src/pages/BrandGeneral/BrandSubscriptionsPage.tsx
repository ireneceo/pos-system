import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { getAuthToken } from '../../utils/auth';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription,
  Table,
  TableHeader as CommonTableHeader,
  TableRow as CommonTableRow,
  MobileLabel,
  MobileValue,
  MobileGrid,
  ActionButtons,
  ActionButton as CommonActionButton,
  IconButton as CommonIconButton
, Modal as CommonModal } from '../../components/UI';

// ============================================
// Interfaces
// ============================================

interface BrandSubscription {
  restaurant_id: number;
  restaurant_name: string;
  restaurant_email: string;
  restaurant_status: string;
  restaurant_currency?: string;
  plan: {
    id: number;
    name: string;
    subscription_fee: string;
    revenue_percentage: string;
    rent_type: string;
    rent_fixed?: string;
    rent_percentage?: string;
    billing_cycle: string;
    auto_generate: boolean;
    activation_date: string;
    discount_type?: string;
    discount_value?: number;
    discount_reason?: string;
  } | null;
  latest_invoice: {
    id: number;
    invoice_number: string;
    total_amount: string;
    status: string;
    billing_period_start: string;
    billing_period_end: string;
    due_date: string;
  } | null;
  current_month: {
    revenue: number;
    order_count: number;
    estimated_charges: {
      items: any[];
      subtotal: number;
      taxAmount: number;
      totalAmount: number;
    } | null;
  };
}

interface EntityPlan {
  id: number;
  name: string;
  subscription_fee: string;
  revenue_percentage: string;
  rent_type: string;
  billing_cycle: string;
  is_active: boolean;
}

// ============================================
// Styled Components
// ============================================

const SubscriptionTableHeader = styled(CommonTableHeader)`
  @media (max-width: 1400px) {
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }
`;

const SubscriptionTableRow = styled(CommonTableRow)`
  @media (max-width: 1400px) {
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }
`;

const RestaurantInfo = styled.div``;

const RestaurantName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const RestaurantMeta = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'trial': return '#FEF3C7';
      case 'overdue': return '#FEF9C3';
      case 'paid': return '#ECFDF5';
      case 'pending_payment': return '#FEF3C7';
      case 'expired': return '#FEE2E2';
      case 'suspended': return '#FEF2F2';
      case 'cancelled': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'trial': return '#D97706';
      case 'overdue': return '#CA8A04';
      case 'paid': return '#059669';
      case 'pending_payment': return '#D97706';
      case 'expired': return '#DC2626';
      case 'suspended': return '#DC2626';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`;


const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const FormInput = styled.input`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }
`;

const FormSelect = styled.select`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.div`
  font-size: 14px;
  color: #9CA3AF;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`;

// ============================================
// Component
// ============================================

const BrandSubscriptionsPage: React.FC = () => {
  const { t } = useTranslation('brand');
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const currency = defaultCurrency || 'MYR';
  const token = getAuthToken();
  const brandId = user?.brand_id || null;

  const [subscriptions, setSubscriptions] = useState<BrandSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Brand plans for assign modal
  const [brandPlans, setBrandPlans] = useState<EntityPlan[]>([]);

  // Assign Plan Modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignTarget, setAssignTarget] = useState<BrandSubscription | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | ''>('');
  const [currencyWarning, setCurrencyWarning] = useState<string | null>(null);

  // View Modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingSub, setViewingSub] = useState<BrandSubscription | null>(null);

  // Discount Modal
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountTarget, setDiscountTarget] = useState<BrandSubscription | null>(null);
  const [discountForm, setDiscountForm] = useState({ discount_type: 'none' as string, discount_value: 0, discount_reason: '' });

  // Confirm Modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<BrandSubscription | null>(null);
  const [confirmAction, setConfirmAction] = useState<'unassign' | null>(null);

  // ============================================
  // Data Fetching
  // ============================================

  const fetchSubscriptions = useCallback(async () => {
    if (!brandId) return;
    setLoading(true);
    try {
      const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`/api/brands/${brandId}/subscriptions`, { headers });
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data.success ? data.data : (Array.isArray(data) ? data : []));
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  }, [brandId, token]);

  const fetchBrandPlans = useCallback(async () => {
    if (!brandId) return;
    try {
      const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`/api/brands/${brandId}/plans`, { headers });
      if (response.ok) {
        const data = await response.json();
        const plans = data.success ? data.data : (Array.isArray(data) ? data : []);
        setBrandPlans(plans.filter((p: EntityPlan) => p.is_active));
      }
    } catch (error) {
      console.error('Error fetching brand plans:', error);
    }
  }, [brandId, token]);

  useEffect(() => {
    fetchSubscriptions();
    fetchBrandPlans();
  }, [fetchSubscriptions, fetchBrandPlans]);

  // ============================================
  // Filters & Stats
  // ============================================

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.restaurant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sub.plan?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'assigned') return matchesSearch && sub.plan !== null;
    if (filterStatus === 'unassigned') return matchesSearch && sub.plan === null;
    if (filterStatus === 'active') return matchesSearch && sub.restaurant_status === 'active';
    if (filterStatus === 'overdue') return matchesSearch && sub.restaurant_status === 'overdue';
    return matchesSearch;
  });

  const totalRestaurants = subscriptions.length;
  const assignedCount = subscriptions.filter(s => s.plan !== null).length;
  const unassignedCount = subscriptions.filter(s => s.plan === null).length;
  const totalMonthlyCharges = subscriptions.reduce((sum, s) => {
    return sum + (s.current_month?.estimated_charges?.totalAmount || 0);
  }, 0);

  // ============================================
  // Actions
  // ============================================

  const handleAssignPlan = (sub: BrandSubscription) => {
    setAssignTarget(sub);
    setSelectedPlanId(sub.plan?.id || '');
    setShowAssignModal(true);
  };

  const handleSubmitAssign = async () => {
    if (!brandId || !assignTarget || !selectedPlanId) return;
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };

      const response = await fetch(`/api/brands/${brandId}/plans/${selectedPlanId}/restaurants`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ restaurant_ids: [assignTarget.restaurant_id] })
      });

      if (response.ok) {
        const result = await response.json();
        setShowAssignModal(false);
        setAssignTarget(null);
        setSelectedPlanId('');
        fetchSubscriptions();
        // Show currency warning if plan has no pricing for restaurant's currency
        if (result.currency_warnings && result.currency_warnings.length > 0) {
          setCurrencyWarning(result.currency_warnings[0].message);
        }
      } else {
        const error = await response.json();
        console.error('Failed to assign plan:', error);
      }
    } catch (error) {
      console.error('Error assigning plan:', error);
    }
  };

  const handleUnassignPlan = (sub: BrandSubscription) => {
    setConfirmTarget(sub);
    setConfirmAction('unassign');
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!brandId || !confirmTarget || !confirmAction) return;

    try {
      const headers: HeadersInit = {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };

      if (confirmAction === 'unassign' && confirmTarget.plan) {
        const response = await fetch(
          `/api/brands/${brandId}/plans/${confirmTarget.plan.id}/restaurants/${confirmTarget.restaurant_id}`,
          { method: 'DELETE', headers }
        );
        if (!response.ok) {
          const error = await response.json();
          console.error('Failed to unassign:', error);
        }
      }

      setShowConfirmModal(false);
      setConfirmTarget(null);
      setConfirmAction(null);
      fetchSubscriptions();
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  const handleViewDetails = (sub: BrandSubscription) => {
    setViewingSub(sub);
    setShowViewModal(true);
  };

  const handleOpenDiscount = (sub: BrandSubscription) => {
    setDiscountTarget(sub);
    setDiscountForm({
      discount_type: sub.plan?.discount_type || 'none',
      discount_value: sub.plan?.discount_value || 0,
      discount_reason: sub.plan?.discount_reason || ''
    });
    setShowDiscountModal(true);
  };

  const handleSaveDiscount = async () => {
    if (!discountTarget || !discountTarget.plan || !brandId) return;
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      const response = await fetch(`/api/brands/${brandId}/plans/${discountTarget.plan.id}/restaurants/${discountTarget.restaurant_id}/discount`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(discountForm)
      });
      if (response.ok) {
        setShowDiscountModal(false);
        setDiscountTarget(null);
        fetchSubscriptions();
      }
    } catch (error) {
      console.error('Failed to save discount:', error);
    }
  };

  // CSV Export
  const handleExportData = () => {
    const csvRows = [
      ['Restaurant', 'Email', 'Status', 'Plan', 'Subscription Fee', 'Revenue %', 'Billing Cycle', 'Latest Invoice', 'Invoice Status', 'Est. Monthly Charges'].join(',')
    ];
    subscriptions.forEach(sub => {
      csvRows.push([
        `"${sub.restaurant_name}"`,
        `"${sub.restaurant_email}"`,
        sub.restaurant_status,
        `"${sub.plan?.name || 'Not Assigned'}"`,
        sub.plan?.subscription_fee || '0',
        sub.plan?.revenue_percentage || '0',
        sub.plan?.billing_cycle || '-',
        sub.latest_invoice?.invoice_number || '-',
        sub.latest_invoice?.status || '-',
        sub.current_month?.estimated_charges?.totalAmount?.toString() || '0'
      ].join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // ============================================
  // Render
  // ============================================

  return (
    <>
      <Container>
        <Header>
          <Title>{t('brand:brandSubscriptionsPage.brandSubscriptions')}</Title>
          <ActionSection>
            <ThemedButton variant="outline" onClick={handleExportData}>{t('brand:brandSubscriptionsPage.export')}</ThemedButton>
          </ActionSection>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard color="#059669">
              <StatValue>{totalRestaurants}</StatValue>
              <StatLabel>{t('brand:brandSubscriptionsPage.totalRestaurants')}</StatLabel>
              <StatDescription>{t('brand:brandSubscriptionsPage.inYourBrand')}</StatDescription>
            </StatCard>
            <StatCard color="#2563EB">
              <StatValue>{assignedCount}</StatValue>
              <StatLabel>{t('brand:brandSubscriptionsPage.planAssigned')}</StatLabel>
              <StatDescription>{totalRestaurants > 0 ? Math.round((assignedCount/totalRestaurants)*100) : 0}% covered</StatDescription>
            </StatCard>
            <StatCard color="#7C3AED">
              <StatValue>{unassignedCount}</StatValue>
              <StatLabel>{t('brand:brandSubscriptionsPage.noPlan')}</StatLabel>
              <StatDescription>{t('brand:brandSubscriptionsPage.needPlanAssignment')}</StatDescription>
            </StatCard>
            <StatCard color="#D97706">
              <StatValue>{formatCurrency(totalMonthlyCharges, currency)}</StatValue>
              <StatLabel>{t('brand:brandSubscriptionsPage.estMonthlyCharges')}</StatLabel>
              <StatDescription>{t('brand:brandSubscriptionsPage.fromAllRestaurants')}</StatDescription>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <FilterSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">{t('brand:brandSubscriptionsPage.allRestaurants')}</option>
              <option value="assigned">{t('brand:brandSubscriptionsPage.planAssigned')}</option>
              <option value="unassigned">{t('brand:brandSubscriptionsPage.noPlan')}</option>
              <option value="active">{t('brand:brandSubscriptionsPage.active')}</option>
              <option value="overdue">{t('brand:brandSubscriptionsPage.overdue')}</option>
            </FilterSelect>
            <SearchInput
              placeholder="Search restaurants or plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterBar>

          {loading ? (
            <LoadingSpinner>{t('brand:brandSubscriptionsPage.loadingSubscriptionData')}</LoadingSpinner>
          ) : filteredSubscriptions.length === 0 ? (
            <EmptyState>
              <EmptyIcon>&#x1F4CB;</EmptyIcon>
              <EmptyTitle>{subscriptions.length === 0 ? 'No Restaurants' : 'No Results'}</EmptyTitle>
              <EmptyDescription>{subscriptions.length === 0 ? 'No restaurants are assigned to this brand yet.' : 'No restaurants match your search criteria.'}</EmptyDescription>
            </EmptyState>
          ) : (
            <>
            {currencyWarning && (
              <div style={{ padding: '12px 16px', background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#92400E' }}>{currencyWarning}</span>
                <button onClick={() => setCurrencyWarning(null)} style={{ background: 'none', border: 'none', color: '#92400E', cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}>×</button>
              </div>
            )}
            <Table>
              <SubscriptionTableHeader columns="2fr 1.5fr 1fr 1fr 1fr 1fr 180px">
                <span className="col-info">{t('brand:brandSubscriptionsPage.restaurant')}</span>
                <span>{t('brand:brandSubscriptionsPage.plan')}</span>
                <span>{t('brand:brandSubscriptionsPage.status')}</span>
                <span className="col-fee">{t('brand:brandSubscriptionsPage.estCharges')}</span>
                <span>{t('brand:brandSubscriptionsPage.latestInvoice')}</span>
                <span className="col-revenue">{t('brand:brandSubscriptionsPage.revenueMtd')}</span>
                <span className="col-action">{t('brand:brandSubscriptionsPage.actions')}</span>
              </SubscriptionTableHeader>

              {filteredSubscriptions.map(sub => (
                <SubscriptionTableRow columns="2fr 1.5fr 1fr 1fr 1fr 1fr 180px" key={sub.restaurant_id}>
                  <MobileGrid>
                    <MobileValue className="col-info">
                      <MobileLabel>{t('brand:brandSubscriptionsPage.restaurant')}</MobileLabel>
                      <RestaurantInfo>
                        <RestaurantName>{sub.restaurant_name} {sub.restaurant_currency && <span style={{ fontSize: '11px', fontWeight: 500, color: '#635BFF', background: '#F0EDFF', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle' }}>{sub.restaurant_currency}</span>}</RestaurantName>
                        <RestaurantMeta>{sub.restaurant_email}</RestaurantMeta>
                      </RestaurantInfo>
                    </MobileValue>

                    <MobileValue>
                      <MobileLabel>{t('brand:brandSubscriptionsPage.plan')}</MobileLabel>
                      {sub.plan ? (
                        <div>
                          <div style={{fontWeight: 600, color: '#0A2540', fontSize: '13px'}}>{sub.plan.name}</div>
                          <div style={{fontSize: '12px', color: '#6B7280'}}>
                            {sub.plan.discount_type && sub.plan.discount_type !== 'none' && (sub.plan.discount_value || 0) > 0 ? (
                              <>
                                <span style={{textDecoration: 'line-through', color: '#9CA3AF'}}>{formatCurrency(parseFloat(sub.plan.subscription_fee) || 0, currency)}</span>
                                {' '}
                                <span style={{color: '#15803D', fontWeight: 600}}>
                                  {formatCurrency(
                                    sub.plan.discount_type === 'percentage'
                                      ? (parseFloat(sub.plan.subscription_fee) || 0) * (1 - (sub.plan.discount_value || 0) / 100)
                                      : Math.max(0, (parseFloat(sub.plan.subscription_fee) || 0) - (sub.plan.discount_value || 0)),
                                    currency
                                  )}/mo
                                </span>
                              </>
                            ) : (
                              <>{formatCurrency(parseFloat(sub.plan.subscription_fee) || 0, currency)}/mo</>
                            )}
                            {parseFloat(sub.plan.revenue_percentage) > 0 && ` + ${sub.plan.revenue_percentage}%`}
                          </div>
                        </div>
                      ) : (
                        <span style={{
                          padding: '4px 10px', background: '#FEF3C7', color: '#92400E',
                          borderRadius: '6px', fontSize: '12px', fontWeight: 600
                        }}>
                          Not Assigned
                        </span>
                      )}
                    </MobileValue>

                    <MobileValue>
                      <MobileLabel>{t('brand:brandSubscriptionsPage.status')}</MobileLabel>
                      <StatusBadge status={sub.restaurant_status}>
                        {sub.restaurant_status.charAt(0).toUpperCase() + sub.restaurant_status.slice(1)}
                      </StatusBadge>
                    </MobileValue>

                    <MobileValue className="col-fee">
                      <MobileLabel>{t('brand:brandSubscriptionsPage.estCharges')}</MobileLabel>
                      {sub.current_month?.estimated_charges ? (
                        <span style={{fontWeight: 500, color: '#0A2540'}}>
                          {formatCurrency(sub.current_month.estimated_charges.totalAmount, currency)}
                        </span>
                      ) : (
                        <span style={{color: '#9CA3AF'}}>-</span>
                      )}
                    </MobileValue>

                    <MobileValue>
                      <MobileLabel>{t('brand:brandSubscriptionsPage.latestInvoice')}</MobileLabel>
                      {sub.latest_invoice ? (
                        <div>
                          <div style={{fontSize: '13px', fontWeight: 500, color: '#0A2540'}}>{sub.latest_invoice.invoice_number}</div>
                          <StatusBadge status={sub.latest_invoice.status}>
                            {sub.latest_invoice.status.replace('_', ' ')}
                          </StatusBadge>
                        </div>
                      ) : (
                        <span style={{color: '#9CA3AF'}}>{t('brand:brandSubscriptionsPage.noInvoice')}</span>
                      )}
                    </MobileValue>

                    <MobileValue className="col-revenue">
                      <MobileLabel>{t('brand:brandSubscriptionsPage.revenueMtd')}</MobileLabel>
                      <div>
                        <div style={{fontWeight: 500, color: '#0A2540'}}>
                          {formatCurrency(sub.current_month?.revenue || 0, currency)}
                        </div>
                        <div style={{fontSize: '12px', color: '#6B7280'}}>
                          {sub.current_month?.order_count || 0} orders
                        </div>
                      </div>
                    </MobileValue>
                  </MobileGrid>

                  <ActionButtons>
                    <CommonActionButton onClick={() => handleViewDetails(sub)}>{t('brand:brandSubscriptionsPage.view')}</CommonActionButton>
                    <CommonActionButton onClick={() => handleAssignPlan(sub)}>
                      {sub.plan ? 'Change' : 'Assign'}
                    </CommonActionButton>
                    {sub.plan && (
                      <CommonIconButton
                        onClick={() => handleUnassignPlan(sub)}
                        title="Remove plan assignment"
                      >
                        <IconSymbol>✕</IconSymbol>
                      </CommonIconButton>
                    )}
                  </ActionButtons>
                </SubscriptionTableRow>
              ))}
            </Table>
            </>
          )}

          {/* Assign Plan Modal */}
          {showAssignModal && assignTarget && (
                        <CommonModal isOpen={true} onClose={() => setShowAssignModal(false)} title={assignTarget.plan ? 'Change Plan' : 'Assign Plan'} footer={<><ThemedButton variant="cancel" onClick={() => setShowAssignModal(false)}>{t('brand:brandSubscriptionsPage.cancel')}</ThemedButton><ThemedButton variant="primary" onClick={handleSubmitAssign} disabled={!selectedPlanId || brandPlans.length === 0} > {assignTarget.plan ? 'Change Plan' : 'Assign Plan'} </ThemedButton></>}>

                  <FormGrid>
                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <FormLabel>{t('brand:brandSubscriptionsPage.restaurant')}</FormLabel>
                      <FormInput
                        type="text"
                        value={assignTarget.restaurant_name}
                        disabled
                      />
                    </FormGroup>

                    {assignTarget.plan && (
                      <FormGroup style={{gridColumn: '1 / -1'}}>
                        <FormLabel>{t('brand:brandSubscriptionsPage.currentPlan')}</FormLabel>
                        <div style={{
                          padding: '12px', background: '#F0F7FF', border: '1px solid #B3D9FF',
                          borderRadius: '8px', fontSize: '14px', color: '#0A2540'
                        }}>
                          {assignTarget.plan.name} — {formatCurrency(parseFloat(assignTarget.plan.subscription_fee) || 0, currency)}/mo
                          {parseFloat(assignTarget.plan.revenue_percentage) > 0 && ` + ${assignTarget.plan.revenue_percentage}% revenue`}
                        </div>
                      </FormGroup>
                    )}

                    <FormGroup style={{gridColumn: '1 / -1'}}>
                      <FormLabel>Select Plan *</FormLabel>
                      <FormSelect
                        value={selectedPlanId}
                        onChange={(e) => setSelectedPlanId(e.target.value ? parseInt(e.target.value) : '')}
                      >
                        <option value="">{t('brand:brandSubscriptionsPage.selectAPlan')}</option>
                        {brandPlans.map(plan => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name} — {formatCurrency(parseFloat(plan.subscription_fee) || 0, currency)}/mo
                            {parseFloat(plan.revenue_percentage) > 0 && ` + ${plan.revenue_percentage}%`}
                          </option>
                        ))}
                      </FormSelect>
                      {brandPlans.length === 0 && (
                        <div style={{marginTop: '8px', padding: '12px', background: '#FEF3C7', borderRadius: '8px', fontSize: '13px', color: '#92400E'}}>
                          No active plans found. Create a plan in the "Plans" page first.
                        </div>
                      )}
                    </FormGroup>

                    {selectedPlanId && (() => {
                      const plan = brandPlans.find(p => p.id === selectedPlanId);
                      if (!plan) return null;
                      return (
                        <div style={{
                          gridColumn: '1 / -1', padding: '16px', background: '#F3F4F6',
                          borderRadius: '8px', marginTop: '10px'
                        }}>
                          <div style={{fontSize: '14px', color: '#6B7280', marginBottom: '8px'}}><strong>Plan Summary:</strong></div>
                          <div style={{fontSize: '15px', fontWeight: 600, color: '#0A2540', marginBottom: '4px'}}>
                            {plan.name}
                          </div>
                          <div style={{fontSize: '13px', color: '#374151'}}>
                            Subscription Fee: {formatCurrency(parseFloat(plan.subscription_fee) || 0, currency)}/mo
                            {parseFloat(plan.revenue_percentage) > 0 && ` | Revenue Share: ${plan.revenue_percentage}%`}
                            {plan.rent_type !== 'none' && ` | Rent: ${plan.rent_type}`}
                            {` | Billing: ${plan.billing_cycle}`}
                          </div>
                        </div>
                      );
                    })()}
                  </FormGrid>
                
            </CommonModal>
          )}

          {/* View Details Modal */}
          {showViewModal && viewingSub && (
                        <CommonModal isOpen={true} onClose={() => setShowViewModal(false)} title="Subscription Details" footer={<><ThemedButton variant="primary" onClick={() => setShowViewModal(false)}>{t('brand:brandSubscriptionsPage.close')}</ThemedButton></>}>

                  <div style={{display: 'grid', gap: '20px'}}>
                    {/* Restaurant Info */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('brand:brandSubscriptionsPage.restaurant')}</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.name')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSub.restaurant_name}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.email')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSub.restaurant_email}</div>
                        </div>
                        <div>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.status')}</div>
                          <StatusBadge status={viewingSub.restaurant_status}>
                            {viewingSub.restaurant_status.charAt(0).toUpperCase() + viewingSub.restaurant_status.slice(1)}
                          </StatusBadge>
                        </div>
                      </div>
                    </div>

                    {/* Plan Info */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('brand:brandSubscriptionsPage.plan')}</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        {viewingSub.plan ? (
                          <>
                            <div style={{marginBottom: '12px'}}>
                              <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.planName')}</div>
                              <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSub.plan.name}</div>
                            </div>
                            <div style={{marginBottom: '12px'}}>
                              <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.subscriptionFee')}</div>
                              {viewingSub.plan.discount_type && viewingSub.plan.discount_type !== 'none' && (viewingSub.plan.discount_value || 0) > 0 ? (
                                <div>
                                  <span style={{textDecoration: 'line-through', color: '#9CA3AF', fontSize: '13px'}}>{formatCurrency(parseFloat(viewingSub.plan.subscription_fee) || 0, currency)}/mo</span>
                                  <div style={{fontSize: '16px', fontWeight: '600', color: '#15803D'}}>
                                    {formatCurrency(
                                      viewingSub.plan.discount_type === 'percentage'
                                        ? (parseFloat(viewingSub.plan.subscription_fee) || 0) * (1 - (viewingSub.plan.discount_value || 0) / 100)
                                        : Math.max(0, (parseFloat(viewingSub.plan.subscription_fee) || 0) - (viewingSub.plan.discount_value || 0)),
                                      currency
                                    )}/mo
                                    <span style={{fontSize: '12px', fontWeight: '500', marginLeft: '4px'}}>
                                      (-{viewingSub.plan.discount_type === 'percentage' ? `${viewingSub.plan.discount_value}%` : formatCurrency(viewingSub.plan.discount_value || 0, currency)})
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{formatCurrency(parseFloat(viewingSub.plan.subscription_fee) || 0, currency)}/mo</div>
                              )}
                            </div>
                            {parseFloat(viewingSub.plan.revenue_percentage) > 0 && (
                              <div style={{marginBottom: '12px'}}>
                                <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.revenueShare')}</div>
                                <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSub.plan.revenue_percentage}%</div>
                              </div>
                            )}
                            {viewingSub.plan.rent_type !== 'none' && (
                              <div style={{marginBottom: '12px'}}>
                                <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.rent')}</div>
                                <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>
                                  {viewingSub.plan.rent_type === 'fixed' ? formatCurrency(parseFloat(viewingSub.plan.rent_fixed || '0'), currency) :
                                   viewingSub.plan.rent_type === 'percentage' ? `${viewingSub.plan.rent_percentage}%` :
                                   `MAX(${formatCurrency(parseFloat(viewingSub.plan.rent_fixed || '0'), currency)}, ${viewingSub.plan.rent_percentage}%)`}
                                </div>
                              </div>
                            )}
                            <div style={{marginBottom: '12px'}}>
                              <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.billingCycle')}</div>
                              <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSub.plan.billing_cycle}</div>
                            </div>
                            <div style={{marginBottom: '12px'}}>
                              <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.activationDate')}</div>
                              <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{new Date(viewingSub.plan.activation_date).toLocaleDateString()}</div>
                            </div>
                            <div>
                              <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.discount')}</div>
                              {viewingSub.plan.discount_type && viewingSub.plan.discount_type !== 'none' && (viewingSub.plan.discount_value || 0) > 0 ? (
                                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                  <span style={{fontSize: '14px', fontWeight: '500', color: '#15803D'}}>
                                    {viewingSub.plan.discount_type === 'percentage'
                                      ? `${viewingSub.plan.discount_value}%`
                                      : `${formatCurrency(viewingSub.plan.discount_value || 0, currency)}`}
                                    {viewingSub.plan.discount_reason ? ` (${viewingSub.plan.discount_reason})` : ''}
                                  </span>
                                  <button onClick={() => handleOpenDiscount(viewingSub)} style={{background: 'none', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', color: '#6B7280', cursor: 'pointer'}}>{t('brand:brandSubscriptionsPage.edit')}</button>
                                </div>
                              ) : (
                                <button onClick={() => handleOpenDiscount(viewingSub)} style={{background: 'none', border: '1px solid #D1D5DB', borderRadius: '4px', padding: '4px 12px', fontSize: '12px', color: '#635BFF', cursor: 'pointer', fontWeight: '500'}}>{t('brand:brandSubscriptionsPage.setDiscount')}</button>
                              )}
                            </div>
                          </>
                        ) : (
                          <div style={{color: '#92400E', fontSize: '14px'}}>{t('brand:brandSubscriptionsPage.noPlanAssignedToThisRestaurant')}</div>
                        )}
                      </div>
                    </div>

                    {/* Current Month */}
                    <div>
                      <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('brand:brandSubscriptionsPage.currentMonth')}</div>
                      <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.revenue')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{formatCurrency(viewingSub.current_month?.revenue || 0, currency)}</div>
                        </div>
                        <div style={{marginBottom: '12px'}}>
                          <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.orders')}</div>
                          <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSub.current_month?.order_count || 0}</div>
                        </div>
                        {viewingSub.current_month?.estimated_charges && (
                          <>
                            <div style={{borderTop: '1px solid #E6EBF1', paddingTop: '12px', marginTop: '8px'}}>
                              <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontWeight: 600}}>{t('brand:brandSubscriptionsPage.estimatedChargesBreakdown')}</div>
                              {viewingSub.current_month.estimated_charges.items.map((item: any, index: number) => (
                                <div key={index} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px'}}>
                                  <span style={{color: '#374151'}}>{item.description}</span>
                                  <span style={{fontWeight: 500, color: '#0A2540'}}>{formatCurrency(item.total_amount, currency)}</span>
                                </div>
                              ))}
                              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E6EBF1', fontWeight: 600}}>
                                <span style={{color: '#0A2540'}}>{t('brand:brandSubscriptionsPage.total')}</span>
                                <span style={{color: '#0A2540'}}>{formatCurrency(viewingSub.current_month.estimated_charges.totalAmount, currency)}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Latest Invoice */}
                    {viewingSub.latest_invoice && (
                      <div>
                        <div style={{fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase'}}>{t('brand:brandSubscriptionsPage.latestInvoice')}</div>
                        <div style={{background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1'}}>
                          <div style={{marginBottom: '12px'}}>
                            <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.invoiceNumber')}</div>
                            <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{viewingSub.latest_invoice.invoice_number}</div>
                          </div>
                          <div style={{marginBottom: '12px'}}>
                            <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.amount')}</div>
                            <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{formatCurrency(parseFloat(viewingSub.latest_invoice.total_amount) || 0, currency)}</div>
                          </div>
                          <div style={{marginBottom: '12px'}}>
                            <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.status')}</div>
                            <StatusBadge status={viewingSub.latest_invoice.status}>
                              {viewingSub.latest_invoice.status.replace('_', ' ')}
                            </StatusBadge>
                          </div>
                          <div>
                            <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.dueDate')}</div>
                            <div style={{fontSize: '14px', fontWeight: '500', color: '#0A2540'}}>{new Date(viewingSub.latest_invoice.due_date).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                
            </CommonModal>
          )}

          {/* Confirm Action Modal */}
          {showConfirmModal && confirmTarget && (
                        <CommonModal isOpen={true} onClose={() => setShowConfirmModal(false)} title="Confirm Action" footer={<><ThemedButton variant="cancel" onClick={() => setShowConfirmModal(false)}>{t('brand:brandSubscriptionsPage.cancel')}</ThemedButton><ThemedButton variant="danger" onClick={handleConfirmAction}>{t('brand:brandSubscriptionsPage.removePlan')}</ThemedButton></>}>

                  <p>
                    {confirmAction === 'unassign' && `Are you sure you want to remove the plan "${confirmTarget.plan?.name}" from ${confirmTarget.restaurant_name}?`}
                  </p>
                
            </CommonModal>
          )}

          {/* Discount Modal */}
          {showDiscountModal && discountTarget && (
                        <CommonModal isOpen={true} onClose={() => setShowDiscountModal(false)} title={`Set Discount - ${discountTarget.restaurant_name}`} footer={<><ThemedButton variant="cancel" onClick={() => setShowDiscountModal(false)}>{t('brand:brandSubscriptionsPage.cancel')}</ThemedButton><ThemedButton variant="primary" onClick={handleSaveDiscount}>{t('brand:brandSubscriptionsPage.saveDiscount')}</ThemedButton></>}>

                  <div style={{display: 'grid', gap: '16px'}}>
                    <div>
                      <div style={{fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>{t('brand:brandSubscriptionsPage.discountType')}</div>
                      <FormSelect value={discountForm.discount_type} onChange={(e) => setDiscountForm({...discountForm, discount_type: e.target.value, discount_value: e.target.value === 'none' ? 0 : discountForm.discount_value})}>
                        <option value="none">{t('brand:brandSubscriptionsPage.none')}</option>
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount ({currency})</option>
                      </FormSelect>
                    </div>
                    {discountForm.discount_type !== 'none' && (
                      <div>
                        <div style={{fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                          {discountForm.discount_type === 'percentage' ? 'Discount Rate (%)' : `Discount Amount (${getCurrencySymbol(currency)})`}
                        </div>
                        <FormInput
                          type="number"
                          step={discountForm.discount_type === 'percentage' ? '1' : '0.01'}
                          min="0"
                          max={discountForm.discount_type === 'percentage' ? '100' : undefined}
                          value={discountForm.discount_value}
                          onChange={(e) => setDiscountForm({...discountForm, discount_value: parseFloat(e.target.value) || 0})}
                          placeholder={discountForm.discount_type === 'percentage' ? 'e.g. 10' : 'e.g. 50.00'}
                        />
                      </div>
                    )}
                    {discountForm.discount_type !== 'none' && (
                      <div>
                        <div style={{fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>{t('brand:brandSubscriptionsPage.reasonOptional')}</div>
                        <FormInput
                          type="text"
                          value={discountForm.discount_reason}
                          onChange={(e) => setDiscountForm({...discountForm, discount_reason: e.target.value})}
                          placeholder="e.g. Opening promotion"
                        />
                      </div>
                    )}
                    {discountForm.discount_type !== 'none' && discountForm.discount_value > 0 && discountTarget.plan && (
                      <div style={{background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px 16px'}}>
                        <div style={{fontSize: '12px', color: '#166534', fontWeight: '600', marginBottom: '4px'}}>{t('brand:brandSubscriptionsPage.preview')}</div>
                        <div style={{fontSize: '13px', color: '#15803D'}}>
                          {discountForm.discount_type === 'percentage'
                            ? `${discountForm.discount_value}% off all charges`
                            : `${formatCurrency(discountForm.discount_value, currency)} off total`}
                        </div>
                      </div>
                    )}
                  </div>
                
            </CommonModal>
          )}

        </Content>
      </Container>
    </>
  );
};

export default BrandSubscriptionsPage;
