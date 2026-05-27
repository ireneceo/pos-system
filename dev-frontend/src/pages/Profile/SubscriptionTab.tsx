import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton } from '../../components/UI/Modal';
import { formatCurrency } from '../../utils/currency';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatDate as formatDateTz } from '../../utils/timezone';
// ============================================================
// Types
// ============================================================
interface PlanLimit {
  orders: number;
  menu_items: number;
  staff: number;
  restaurants: number;
  managers: number;
}

interface ProrationEstimate {
  credit: number;
  charge: number;
  net_amount: number;
  remaining_days: number;
  cycle_days: number;
}

interface AvailablePlan {
  id: number;
  name: string;
  display_name: string;
  description: string;
  monthly_price: number;
  annual_price: number;
  currency_prices: Record<string, { monthly: number; annual: number }>;
  features: string[];
  included_modules: string[];
  limits: PlanLimit;
  sort_order: number;
  is_current: boolean;
  change_type: 'upgrade' | 'downgrade' | null;
  proration_estimate: ProrationEstimate | null;
}

interface CurrentPlan {
  plan_type: string;
  plan_amount: number;
  billing_cycle: string;
  currency: string;
  status: string;
  subscription_start: string | null;
  subscription_end: string | null;
  next_billing_date: string | null;
  can_change: boolean;
  change_blocked_reason: string | null;
  discount_type: string | null;
  discount_value: number | null;
}

interface PendingChange {
  plan_type: string;
  plan_amount: number;
  billing_cycle: string;
  change_type: string;
  effective_date: string;
}

interface CurrentUsage {
  staff_count: number;
  menu_item_count: number;
  order_count: number;
}

interface MyPlanResponse {
  success: boolean;
  current: CurrentPlan;
  pending_change: PendingChange | null;
  current_usage: CurrentUsage | null;
  available_plans: AvailablePlan[];
}

// ============================================================
// Styled Components
// ============================================================
const SubscriptionCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  padding: 32px;
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const PlanTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`;

const PlanPrice = styled.div`
  font-size: 16px;
  color: #4B5563;
`;

const DiscountNote = styled.span`
  font-size: 13px;
  color: #059669;
  font-style: italic;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F9FAFB;
  border-radius: 8px;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #4B5563;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: ${p => {
    switch (p.status) {
      case 'active': return '#ECFDF5';
      case 'trial': return '#EFF6FF';
      case 'overdue': return '#FEF3C7';
      case 'suspended': return '#FEE2E2';
      default: return '#F1F4F8';
    }
  }};
  color: ${p => {
    switch (p.status) {
      case 'active': return '#059669';
      case 'trial': return '#2563EB';
      case 'overdue': return '#D97706';
      case 'suspended': return '#DC2626';
      default: return '#4B5563';
    }
  }};
`;

const PendingBox = styled.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const PendingTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PendingDetail = styled.div`
  font-size: 13px;
  color: #78350F;
  line-height: 1.5;
`;

const BlockedBox = styled.div<{ variant?: 'warning' | 'info' }>`
  background: ${p => p.variant === 'warning' ? '#FEF3C7' : '#EFF6FF'};
  border: 1px solid ${p => p.variant === 'warning' ? '#FDE68A' : '#BFDBFE'};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  font-size: 13px;
  color: ${p => p.variant === 'warning' ? '#92400E' : '#1E40AF'};
  line-height: 1.5;
`;

// ── Usage display ──
const UsageSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #C7CED6;
`;

const UsageSectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const UsageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UsageCard = styled.div<{ percent: number }>`
  background: #F1F4F8;
  border: 1px solid ${p => p.percent >= 100 ? '#FCA5A5' : p.percent >= 80 ? '#FDE68A' : '#C7CED6'};
  border-radius: 8px;
  padding: 16px;
`;

const UsageLabel = styled.div`
  font-size: 12px;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const UsageValue = styled.div<{ percent: number }>`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.percent >= 100 ? '#DC2626' : p.percent >= 80 ? '#D97706' : '#0A2540'};
  margin-bottom: 8px;
`;

const UsageBar = styled.div`
  width: 100%;
  height: 8px;
  background: #C7CED6;
  border-radius: 4px;
  overflow: hidden;
`;

const UsageBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${p => Math.min(p.percent, 100)}%;
  background: ${p => p.percent >= 100 ? '#DC2626' : p.percent >= 80 ? '#F59E0B' : '#10B981'};
  transition: width 0.3s;
`;

const UsageHint = styled.div<{ percent: number }>`
  font-size: 11px;
  color: ${p => p.percent >= 100 ? '#DC2626' : p.percent >= 80 ? '#D97706' : '#4B5563'};
  margin-top: 6px;
  font-weight: ${p => p.percent >= 80 ? 600 : 400};
`;

const UsageWarningBanner = styled.div<{ level: 'warning' | 'critical' }>`
  background: ${p => p.level === 'critical' ? '#FEE2E2' : '#FEF3C7'};
  border: 1px solid ${p => p.level === 'critical' ? '#FCA5A5' : '#FDE68A'};
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  font-size: 13px;
  color: ${p => p.level === 'critical' ? '#991B1B' : '#92400E'};
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const ChangePlanButton = styled.button`
  padding: 10px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: #5046E5; }
  &:disabled { background: #6B7280; cursor: not-allowed; }
`;

const CancelButton = styled.button`
  padding: 6px 14px;
  background: white;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;

  &:hover { background: #FEE2E2; }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  &:hover { color: #5046E5; }
`;

// Plan Selection Modal styles
const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const PlanCard = styled.div<{ isCurrent?: boolean; isSelected?: boolean }>`
  border: 2px solid ${p => p.isCurrent ? '#635BFF' : p.isSelected ? '#10B981' : '#C7CED6'};
  border-radius: 12px;
  padding: 20px;
  position: relative;
  cursor: ${p => p.isCurrent ? 'default' : 'pointer'};
  background: ${p => p.isCurrent ? '#F8F7FF' : 'white'};
  transition: border-color 0.15s;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${p => p.isCurrent ? '#635BFF' : '#635BFF'};
  }
`;

const CurrentBadge = styled.div`
  position: absolute;
  top: -10px;
  right: 16px;
  background: #635BFF;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
`;

const PlanCardName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`;

const PlanCardPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #4B5563;
  }
`;

const PlanCardFeature = styled.div`
  font-size: 13px;
  color: #4B5563;
  padding: 3px 0;
`;

const CardSpacer = styled.div`
  flex: 1;
  min-height: 12px;
`;

const ChangeLabel = styled.div<{ type: string }>`
  font-size: 12px;
  font-weight: 500;
  color: ${p => p.type === 'upgrade' ? '#059669' : '#D97706'};
  padding-top: 12px;
  border-top: 1px solid #F1F4F8;
`;

const ProrationAmount = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`;

const BillingToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const ToggleOption = styled.button<{ active: boolean; disabled?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${p => p.active ? '#635BFF' : '#C7CED6'};
  background: ${p => p.active ? '#F8F7FF' : 'white'};
  color: ${p => p.disabled ? '#6B7280' : p.active ? '#635BFF' : '#4B5563'};
  font-size: 14px;
  font-weight: 500;
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${p => p.disabled ? 0.5 : 1};
`;

// Confirmation modal styles
const SummaryBox = styled.div`
  background: #F9FAFB;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
`;

const SummaryRow = styled.div<{ bold?: boolean; highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: ${p => p.bold ? '15px' : '14px'};
  font-weight: ${p => p.bold ? '600' : '400'};
  color: ${p => p.highlight ? '#059669' : '#1F2937'};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px dashed #6B7280;
  margin: 8px 0;
`;

const CheckItem = styled.div`
  font-size: 13px;
  color: #059669;
  padding: 3px 0;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  svg { flex-shrink: 0; margin-top: 2px; }
`;

const WarningItem = styled.div`
  font-size: 13px;
  color: #D97706;
  padding: 3px 0;
`;

const LimitChange = styled.div`
  font-size: 13px;
  color: #4B5563;
  padding: 3px 0;
  display: flex;
  justify-content: space-between;
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #4B5563;
  font-size: 14px;
`;

// ============================================================
// Helpers
// ============================================================
function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  return formatDateTz(dateStr, null);
}

function formatLimit(value: number): string {
  return value === -1 ? 'Unlimited' : String(value);
}

// ============================================================
// Component
// ============================================================
const SubscriptionTab: React.FC = () => {
  const { t } = useTranslation('settings');
  const { user: authUser } = useAuth();
  const [data, setData] = useState<MyPlanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getInvoicesPath = () => {
    const role = authUser?.role;
    const restId = (authUser as any)?.restaurantId || (authUser as any)?.restaurant_id;
    if (role === 'Restaurant Admin' && restId) return `/restaurant/${restId}/invoices`;
    if (role === 'Brand General') return '/pos/brand/invoices';
    if (role === 'Foodcourt General') return '/pos/foodcourt/invoices';
    if (role === 'Restaurant Owner') return '/pos/owner/invoices';
    return '/pos/profile';
  };

  const getSupportPath = () => {
    const role = authUser?.role;
    const restId = (authUser as any)?.restaurantId || (authUser as any)?.restaurant_id;
    if (role === 'Restaurant Admin' && restId) return `/restaurant/${restId}/support`;
    if (role === 'Brand General') return '/pos/brand/general/system-inquiry';
    if (role === 'Foodcourt General') return '/pos/foodcourt/general/system-inquiry';
    if (role === 'Restaurant Owner') return '/pos/owner/system-inquiry';
    return '/pos/profile';
  };

  // Modal states
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<AvailablePlan | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<string>('monthly');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showAnnualBlock, setShowAnnualBlock] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [changeResult, setChangeResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [exceededLimits, setExceededLimits] = useState<string[]>([]);

  const token = getAuthToken();

  const fetchMyPlan = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/subscriptions/my-plan', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setData(json);
        setSelectedCycle(json.current.billing_cycle || 'monthly');
      } else {
        setError(json.message || 'Failed to load subscription data');
      }
    } catch {
      setError('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMyPlan();
  }, [fetchMyPlan]);

  // ── Change Plan ──
  const handleSelectPlan = (plan: AvailablePlan) => {
    if (plan.is_current && selectedCycle === data?.current.billing_cycle) return;
    setSelectedPlan(plan);
    setFormError(null);
    setExceededLimits([]);

    const currentCycle = data?.current.billing_cycle;

    // Annual → Monthly blocked
    if (currentCycle === 'annual' && selectedCycle === 'monthly') {
      setShowAnnualBlock(true);
      setShowPlanModal(false);
      return;
    }

    setShowConfirmModal(true);
    setShowPlanModal(false);
  };

  const handleConfirmChange = async () => {
    if (!selectedPlan || !data) return;
    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch('/api/subscriptions/change-plan', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_plan_id: selectedPlan.id, new_billing_cycle: selectedCycle })
      });
      const json = await res.json();

      if (json.success) {
        setChangeResult(json);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        fetchMyPlan();
      } else {
        if (json.exceeded) {
          setExceededLimits(json.exceeded);
        }
        setFormError(json.message || 'Failed to change plan');
      }
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelPending = async () => {
    try {
      setSubmitting(true);
      const res = await fetch('/api/subscriptions/change-plan', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setShowCancelConfirm(false);
        fetchMyPlan();
      }
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ──
  if (loading) return <LoadingSpinner>{t('settings:subscriptionTab.loadingSubscriptionData')}</LoadingSpinner>;
  if (error || !data) return <BlockedBox variant="warning">{error || 'Failed to load subscription data.'}</BlockedBox>;

  const { current, pending_change, available_plans, current_usage } = data;

  // Get effective price for selected plan in selected cycle
  const getEffectivePrice = (plan: AvailablePlan, cycle: string): number => {
    const cp = plan.currency_prices[current.currency];
    if (cp) return cycle === 'annual' ? cp.annual : cp.monthly;
    return cycle === 'annual' ? plan.annual_price : plan.monthly_price;
  };

  // Determine change type by sort_order (plan tier, not affected by price/cycle)
  const getChangeType = (plan: AvailablePlan, cycle: string): 'upgrade' | 'downgrade' | 'cycle_change' | null => {
    if (plan.is_current && cycle === current.billing_cycle) return null;
    if (plan.is_current && cycle !== current.billing_cycle) return 'cycle_change';
    const currentSortOrder = available_plans.find(p => p.is_current)?.sort_order ?? 0;
    return (plan.sort_order ?? 0) > currentSortOrder ? 'upgrade' : 'downgrade';
  };

  return (
    <>
      <SubscriptionCard>
        <PlanHeader>
          <div>
            <PlanTitle>{current.plan_type}</PlanTitle>
            <PlanPrice>
              {formatCurrency(current.plan_amount, current.currency)} / {current.billing_cycle === 'annual' ? 'year' : 'month'}
              {current.discount_type && current.discount_type !== 'none' && current.discount_value && (
                <> <DiscountNote>(discount applied by administrator)</DiscountNote></>
              )}
            </PlanPrice>
          </div>
          {current.can_change && (
            <ChangePlanButton onClick={() => { setShowPlanModal(true); setFormError(null); }}>
              Change Plan
            </ChangePlanButton>
          )}
        </PlanHeader>

        <InfoGrid>
          <InfoItem>
            <InfoLabel>{t('settings:subscriptionTab.status')}</InfoLabel>
            <StatusBadge status={current.status}>
              {current.status === 'active' ? '● Active' : current.status === 'trial' ? '● Trial' : current.status.charAt(0).toUpperCase() + current.status.slice(1)}
            </StatusBadge>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{t('settings:subscriptionTab.billingCycle')}</InfoLabel>
            <InfoValue>{current.billing_cycle === 'annual' ? 'Annual' : 'Monthly'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{t('settings:subscriptionTab.currentPeriod')}</InfoLabel>
            <InfoValue>{formatDate(current.subscription_start)} – {formatDate(current.subscription_end)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>{t('settings:subscriptionTab.nextBilling')}</InfoLabel>
            <InfoValue>{formatDate(current.next_billing_date)}</InfoValue>
          </InfoItem>
        </InfoGrid>

        {/* Current Usage + Limit Warnings */}
        {current_usage && (() => {
          // Find the current plan in available_plans to get its limits
          const currentPlanInfo = available_plans?.find(p => p.display_name === current.plan_type);
          const limits = currentPlanInfo?.limits || { staff: -1, menu_items: -1, orders: -1 };

          const staffPercent = limits.staff > 0 ? Math.round((current_usage.staff_count / limits.staff) * 100) : 0;
          const menuPercent = limits.menu_items > 0 ? Math.round((current_usage.menu_item_count / limits.menu_items) * 100) : 0;
          const orderPercent = limits.orders > 0 ? Math.round((current_usage.order_count / limits.orders) * 100) : 0;

          const nearLimit: string[] = [];
          const atLimit: string[] = [];
          if (staffPercent >= 100) atLimit.push(`Staff (${current_usage.staff_count}/${limits.staff})`);
          else if (staffPercent >= 80) nearLimit.push(`Staff (${current_usage.staff_count}/${limits.staff})`);
          if (menuPercent >= 100) atLimit.push(`Menu items (${current_usage.menu_item_count}/${limits.menu_items})`);
          else if (menuPercent >= 80) nearLimit.push(`Menu items (${current_usage.menu_item_count}/${limits.menu_items})`);
          if (orderPercent >= 100) atLimit.push(`Orders this month (${current_usage.order_count}/${limits.orders})`);
          else if (orderPercent >= 80) nearLimit.push(`Orders this month (${current_usage.order_count}/${limits.orders})`);

          const fmtValue = (count: number, limit: number) => limit > 0 ? `${count} / ${limit}` : `${count}`;
          const unlimited = (limit: number) => limit <= 0;

          return (
            <UsageSection>
              <UsageSectionTitle>Plan Usage</UsageSectionTitle>
              <UsageGrid>
                <UsageCard percent={staffPercent}>
                  <UsageLabel>Staff Members</UsageLabel>
                  <UsageValue percent={staffPercent}>{fmtValue(current_usage.staff_count, limits.staff)}</UsageValue>
                  {!unlimited(limits.staff) && (
                    <>
                      <UsageBar><UsageBarFill percent={staffPercent} /></UsageBar>
                      <UsageHint percent={staffPercent}>
                        {staffPercent >= 100 ? 'Limit reached — upgrade to add more' : staffPercent >= 80 ? `${staffPercent}% used` : `${staffPercent}% used`}
                      </UsageHint>
                    </>
                  )}
                  {unlimited(limits.staff) && <UsageHint percent={0}>Unlimited</UsageHint>}
                </UsageCard>

                <UsageCard percent={menuPercent}>
                  <UsageLabel>Menu Items</UsageLabel>
                  <UsageValue percent={menuPercent}>{fmtValue(current_usage.menu_item_count, limits.menu_items)}</UsageValue>
                  {!unlimited(limits.menu_items) && (
                    <>
                      <UsageBar><UsageBarFill percent={menuPercent} /></UsageBar>
                      <UsageHint percent={menuPercent}>
                        {menuPercent >= 100 ? 'Limit reached — upgrade to add more' : `${menuPercent}% used`}
                      </UsageHint>
                    </>
                  )}
                  {unlimited(limits.menu_items) && <UsageHint percent={0}>Unlimited</UsageHint>}
                </UsageCard>

                <UsageCard percent={orderPercent}>
                  <UsageLabel>Orders (this month)</UsageLabel>
                  <UsageValue percent={orderPercent}>{fmtValue(current_usage.order_count, limits.orders)}</UsageValue>
                  {!unlimited(limits.orders) && (
                    <>
                      <UsageBar><UsageBarFill percent={orderPercent} /></UsageBar>
                      <UsageHint percent={orderPercent}>
                        {orderPercent >= 100 ? 'Limit reached — upgrade required' : `${orderPercent}% used`}
                      </UsageHint>
                    </>
                  )}
                  {unlimited(limits.orders) && <UsageHint percent={0}>Unlimited</UsageHint>}
                </UsageCard>
              </UsageGrid>

              {atLimit.length > 0 && (
                <UsageWarningBanner level="critical">
                  <span>🚫</span>
                  <div>
                    <strong>Limit reached:</strong> {atLimit.join(', ')}. Please upgrade your plan to continue adding items or accept new orders.
                  </div>
                </UsageWarningBanner>
              )}
              {atLimit.length === 0 && nearLimit.length > 0 && (
                <UsageWarningBanner level="warning">
                  <span>⚠️</span>
                  <div>
                    <strong>Approaching limit:</strong> {nearLimit.join(', ')}. Consider upgrading your plan to avoid disruptions.
                  </div>
                </UsageWarningBanner>
              )}
            </UsageSection>
          );
        })()}

        {/* Pending Change */}
        {pending_change && (
          <PendingBox>
            <PendingTitle>⏳ Scheduled Change</PendingTitle>
            <PendingDetail>
              <strong>New Plan:</strong> {pending_change.plan_type} ({formatCurrency(pending_change.plan_amount, current.currency)}/{pending_change.billing_cycle === 'annual' ? 'year' : 'month'})<br />
              <strong>Effective:</strong> {formatDate(pending_change.effective_date)} (next billing date)<br /><br />
              Your current features remain available until the change takes effect.
            </PendingDetail>
            <CancelButton onClick={() => setShowCancelConfirm(true)}>{t('settings:subscriptionTab.cancelChange')}</CancelButton>
          </PendingBox>
        )}

        {/* Blocked messages */}
        {!current.can_change && current.change_blocked_reason && (
          <BlockedBox variant={current.status === 'overdue' || current.status === 'suspended' ? 'warning' : 'info'}>
            {current.change_blocked_reason}
            {(current.status === 'overdue' || current.status === 'suspended') && (
              <div style={{ marginTop: '8px' }}>
                <LinkButton onClick={() => window.location.href = getInvoicesPath()}>
                  Go to Invoices →
                </LinkButton>
              </div>
            )}
          </BlockedBox>
        )}
      </SubscriptionCard>

      {/* ── Plan Selection Modal ── */}
      <Modal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        title="Change Your Plan"
        size="large"
        footer={
          <ModalButton variant="secondary" onClick={() => setShowPlanModal(false)}>{t('settings:subscriptionTab.close')}</ModalButton>
        }
      >
        <BillingToggle>
          <span style={{ fontSize: '14px', color: '#4B5563' }}>Billing:</span>
          <ToggleOption active={selectedCycle === 'monthly'} disabled={false} onClick={() => setSelectedCycle('monthly')}>
            Monthly
          </ToggleOption>
          <ToggleOption
            active={selectedCycle === 'annual'}
            disabled={current.billing_cycle === 'annual'}
            onClick={() => {
              if (current.billing_cycle === 'annual') return;
              setSelectedCycle('annual');
            }}
          >
            Annual
          </ToggleOption>
          {current.billing_cycle === 'annual' && (
            <span style={{ fontSize: '12px', color: '#6B7280' }}>{t('settings:subscriptionTab.monthlyNotAvailableForAnnualPlans')}</span>
          )}
        </BillingToggle>

        <PlansGrid>
          {available_plans.map(plan => {
            const price = getEffectivePrice(plan, selectedCycle);
            const changeType = getChangeType(plan, selectedCycle);
            const isCurrent = plan.is_current && selectedCycle === current.billing_cycle;

            return (
              <PlanCard
                key={plan.id}
                isCurrent={isCurrent}
                onClick={() => !isCurrent && handleSelectPlan(plan)}
              >
                {isCurrent && <CurrentBadge>{t('settings:subscriptionTab.current')}</CurrentBadge>}
                <PlanCardName>{plan.display_name}</PlanCardName>
                <PlanCardPrice>
                  {formatCurrency(price, current.currency)} <span>/ {selectedCycle === 'annual' ? 'year' : 'month'}</span>
                </PlanCardPrice>
                <div style={{ marginTop: '12px' }}>
                  <PlanCardFeature>{formatLimit(plan.limits.orders)} orders/month</PlanCardFeature>
                  <PlanCardFeature>{formatLimit(plan.limits.menu_items)} menu items</PlanCardFeature>
                  <PlanCardFeature>{formatLimit(plan.limits.staff)} staff</PlanCardFeature>
                </div>
                <CardSpacer />
                {!isCurrent && changeType && (
                  <ChangeLabel type={changeType}>
                    {changeType === 'upgrade' && (
                      <>↑ Upgrade {plan.proration_estimate && current.status !== 'trial' ? (
                        <ProrationAmount>{formatCurrency(plan.proration_estimate.net_amount, current.currency)} due now</ProrationAmount>
                      ) : null}</>
                    )}
                    {changeType === 'downgrade' && <>↓ Downgrade — from next billing</>}
                    {changeType === 'cycle_change' && <>Billing cycle change — from next billing</>}
                  </ChangeLabel>
                )}
              </PlanCard>
            );
          })}
        </PlansGrid>
      </Modal>

      {/* ── Upgrade Confirm Modal ── */}
      {selectedPlan && showConfirmModal && (getChangeType(selectedPlan, selectedCycle) === 'upgrade') && (
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title={current.status === 'trial' ? `Upgrade to ${selectedPlan.display_name}` : `Upgrade to ${selectedPlan.display_name}`}
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => { setShowConfirmModal(false); setShowPlanModal(true); }}>{t('settings:subscriptionTab.back')}</ModalButton>
              <ModalButton variant="primary" onClick={handleConfirmChange} disabled={submitting}>
                {submitting ? 'Processing...' : 'Confirm Upgrade'}
              </ModalButton>
            </>
          }
        >
          {current.status === 'trial' ? (
            <>
              <p style={{ color: '#4B5563', fontSize: '14px' }}>You're currently on a free trial ({current.plan_type}).</p>
              <SummaryBox>
                <CheckItem><Check size={14} />{selectedPlan.display_name} features available immediately</CheckItem>
                <CheckItem><Check size={14} />No charge during your trial period</CheckItem>
                <CheckItem><Check size={14} />First invoice ({formatCurrency(getEffectivePrice(selectedPlan, selectedCycle), current.currency)}/{selectedCycle === 'annual' ? 'year' : 'month'}) after trial ends on {formatDate(current.subscription_end)}</CheckItem>
              </SummaryBox>
            </>
          ) : (
            <>
              <SummaryBox>
                <SummaryRow>
                  <span>{t('settings:subscriptionTab.current')}</span>
                  <span>{current.plan_type} — {formatCurrency(current.plan_amount, current.currency)}/{current.billing_cycle === 'annual' ? 'yr' : 'mo'}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>{t('settings:subscriptionTab.new')}</span>
                  <span>{selectedPlan.display_name} — {formatCurrency(getEffectivePrice(selectedPlan, selectedCycle), current.currency)}/{selectedCycle === 'annual' ? 'yr' : 'mo'}</span>
                </SummaryRow>

                {selectedPlan.proration_estimate && (
                  <>
                    <Divider />
                    <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '4px' }}>
                      Prorated charge for remaining period ({selectedPlan.proration_estimate.remaining_days} days)
                    </div>
                    <SummaryRow>
                      <span>{t('settings:subscriptionTab.newPlanCost')}</span>
                      <span>{formatCurrency(selectedPlan.proration_estimate.charge, current.currency)}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>{t('settings:subscriptionTab.currentPlanCredit')}</span>
                      <span>-{formatCurrency(selectedPlan.proration_estimate.credit, current.currency)}</span>
                    </SummaryRow>
                    <Divider />
                    <SummaryRow bold>
                      <span>{t('settings:subscriptionTab.proratedAmount')}</span>
                      <span>{formatCurrency(selectedPlan.proration_estimate.net_amount, current.currency)}</span>
                    </SummaryRow>
                  </>
                )}
              </SummaryBox>
              <CheckItem><Check size={14} />New features available immediately</CheckItem>
              <CheckItem><Check size={14} />Invoice due by {formatDate(current.next_billing_date)} (next billing date)</CheckItem>
              <CheckItem><Check size={14} />Next regular billing: {formatDate(current.next_billing_date)} at {formatCurrency(getEffectivePrice(selectedPlan, selectedCycle), current.currency)}/{selectedCycle === 'annual' ? 'yr' : 'mo'}</CheckItem>
            </>
          )}
          {formError && (
            <div style={{ marginTop: '12px', padding: '10px 14px', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '6px', color: '#991B1B', fontSize: '13px' }}>
              {formError}
            </div>
          )}
        </Modal>
      )}

      {/* ── Downgrade / Cycle Change Confirm Modal ── */}
      {selectedPlan && showConfirmModal && (getChangeType(selectedPlan, selectedCycle) === 'downgrade' || getChangeType(selectedPlan, selectedCycle) === 'cycle_change') && (
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title={getChangeType(selectedPlan, selectedCycle) === 'cycle_change'
            ? `Change to ${selectedCycle === 'annual' ? 'Annual' : 'Monthly'} Billing`
            : `Downgrade to ${selectedPlan.display_name}`}
          footer={
            <>
              <ModalButton variant="secondary" onClick={() => { setShowConfirmModal(false); setShowPlanModal(true); }}>{t('settings:subscriptionTab.back')}</ModalButton>
              <ModalButton variant="primary" onClick={handleConfirmChange} disabled={submitting}>
                {submitting ? 'Processing...' : getChangeType(selectedPlan, selectedCycle) === 'cycle_change' ? 'Confirm Change' : 'Confirm Downgrade'}
              </ModalButton>
            </>
          }
        >
          <SummaryBox>
            <SummaryRow>
              <span>{t('settings:subscriptionTab.current')}</span>
              <span>{current.plan_type} — {formatCurrency(current.plan_amount, current.currency)}/{current.billing_cycle === 'annual' ? 'yr' : 'mo'}</span>
            </SummaryRow>
            <SummaryRow>
              <span>{t('settings:subscriptionTab.new')}</span>
              <span>{selectedPlan.display_name} — {formatCurrency(getEffectivePrice(selectedPlan, selectedCycle), current.currency)}/{selectedCycle === 'annual' ? 'yr' : 'mo'}</span>
            </SummaryRow>
          </SummaryBox>

          <WarningItem>⚠ Effective from {formatDate(current.next_billing_date)} (next billing date)</WarningItem>

          {getChangeType(selectedPlan, selectedCycle) === 'downgrade' && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '8px' }}>• Current features available until {formatDate(current.next_billing_date)}</div>
              <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '8px' }}>• After {formatDate(current.next_billing_date)}:</div>
              <div style={{ paddingLeft: '16px' }}>
                <LimitChange>
                  <span>{t('settings:subscriptionTab.orders')}</span>
                  <span>{formatLimit(data?.available_plans.find(p => p.is_current)?.limits.orders ?? -1)} → {formatLimit(selectedPlan.limits.orders)}/month</span>
                </LimitChange>
                <LimitChange>
                  <span>{t('settings:subscriptionTab.menuItems')}</span>
                  <span>{formatLimit(data?.available_plans.find(p => p.is_current)?.limits.menu_items ?? -1)} → {formatLimit(selectedPlan.limits.menu_items)}</span>
                </LimitChange>
                <LimitChange>
                  <span>{t('settings:subscriptionTab.staff')}</span>
                  <span>{formatLimit(data?.available_plans.find(p => p.is_current)?.limits.staff ?? -1)} → {formatLimit(selectedPlan.limits.staff)}</span>
                </LimitChange>
              </div>
              <div style={{ fontSize: '13px', color: '#4B5563', marginTop: '8px' }}>• You can cancel this change anytime before {formatDate(current.next_billing_date)}</div>
            </div>
          )}

          {formError && (
            <div style={{ marginTop: '12px', padding: '10px 14px', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '6px', color: '#991B1B', fontSize: '13px' }}>
              {formError}
              {exceededLimits.length > 0 && (
                <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px' }}>
                  {exceededLimits.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </div>
          )}
        </Modal>
      )}

      {/* ── Cancel Pending Confirm ── */}
      <Modal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        title="Cancel Scheduled Change?"
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => setShowCancelConfirm(false)}>{t('settings:subscriptionTab.keepScheduledChange')}</ModalButton>
            <ModalButton variant="primary" onClick={handleCancelPending} disabled={submitting}>
              {submitting ? 'Cancelling...' : 'Cancel Change'}
            </ModalButton>
          </>
        }
      >
        <p style={{ fontSize: '14px', color: '#1F2937' }}>
          Your current plan ({current.plan_type}, {formatCurrency(current.plan_amount, current.currency)}/{current.billing_cycle === 'annual' ? 'year' : 'month'}) will continue without changes.
        </p>
      </Modal>

      {/* ── Annual → Monthly Blocked ── */}
      <Modal
        isOpen={showAnnualBlock}
        onClose={() => setShowAnnualBlock(false)}
        title="Annual to Monthly"
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => {
              setShowAnnualBlock(false);
              window.location.href = getSupportPath();
            }}>{t('settings:subscriptionTab.contactSupport')}</ModalButton>
            <ModalButton onClick={() => setShowAnnualBlock(false)}>{t('settings:subscriptionTab.close')}</ModalButton>
          </>
        }
      >
        <p style={{ fontSize: '14px', color: '#1F2937', lineHeight: '1.6' }}>
          Annual plans cannot be switched to monthly billing directly.
        </p>
        <p style={{ fontSize: '14px', color: '#1F2937', lineHeight: '1.6', marginTop: '12px' }}>
          To change to monthly billing:
        </p>
        <ol style={{ fontSize: '14px', color: '#1F2937', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>{t('settings:subscriptionTab.contactSupportToRequestAFullRefundForTheRemainingAnnualPeriod')}</li>
          <li>{t('settings:subscriptionTab.onceRefundedSubscribeToAMonthlyPlan')}</li>
        </ol>
      </Modal>

      {/* ── Upgrade Success Modal ── */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={changeResult?.change_type === 'upgrade' ? 'Plan Upgraded' : 'Change Scheduled'}
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => setShowSuccessModal(false)}>{t('settings:subscriptionTab.close')}</ModalButton>
            {changeResult?.proration_invoice && (
              <ModalButton variant="primary" onClick={() => {
                setShowSuccessModal(false);
                window.location.href = getInvoicesPath();
              }}>{t('settings:subscriptionTab.goToInvoices')}</ModalButton>
            )}
          </>
        }
      >
        {changeResult?.change_type === 'upgrade' ? (
          <>
            <CheckItem><Check size={14} />Plan upgraded to {changeResult.new_plan}</CheckItem>
            <CheckItem><Check size={14} />New features are now available</CheckItem>
            {changeResult.proration_invoice && (
              <div style={{ marginTop: '12px', padding: '12px 16px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', fontSize: '13px', color: '#1E40AF' }}>
                A prorated invoice of {formatCurrency(changeResult.proration_invoice.amount, data.current.currency)} has been created (due by {formatDate(changeResult.proration_invoice.due_date)}).
              </div>
            )}
          </>
        ) : (
          <>
            <CheckItem><Check size={14} />{changeResult?.message}</CheckItem>
            <div style={{ marginTop: '8px', fontSize: '13px', color: '#4B5563' }}>
              Your current features remain available until the change takes effect.
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default SubscriptionTab;
