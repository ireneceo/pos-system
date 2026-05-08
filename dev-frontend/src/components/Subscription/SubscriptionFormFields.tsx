// SubscriptionFormFields — unified subscription form for 4 callers:
//   RestaurantsPage / SubscriptionsPage / ManagersPage / (RestaurantsPage Edit).
// Renders 9-field layout (Currency / Plan / Trial / Activate / BillingCycle /
// PaymentModel / Period / Auto-renew / Discount / Summary) with consistent
// auto-recalculation: changing currency/plan/billing_cycle recalculates the
// amount; changing start_date or billing_cycle recalculates the end_date.
//
// Billing cycle defaults to '' (empty) so the user must explicitly choose —
// the Summary box stays hidden until a cycle is selected. This avoids the
// "phantom RM 49 default" issue Irene reported.
//
// Discount is supported for ALL user types (Restaurant + Brand/FG/Owner/Supplier
// — the User model now has the same 3 discount columns as Restaurant).

import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormGroup, FormLabel, FormSelect, FormInput } from '../UI';
import DateRangeField from '../Common/DateRangeField';
import { formatCurrency, getPlanPrice, formatPlanPrice } from '../../utils/currency';

export type UserType = 'restaurant' | 'brand' | 'foodcourt' | 'owner' | 'supplier';
export type DiscountType = 'none' | 'percentage' | 'fixed';
export type BillingCycle = '' | 'monthly' | 'annual';
export type PaymentModel = 'restaurant' | 'brand_manager' | 'foodcourt_manager';

export interface SubscriptionValues {
  currency: string;
  plan_type: string;
  plan_amount: string;        // displayed as text, parsed when sent to backend
  billing_cycle: BillingCycle;
  payment_model: PaymentModel;
  subscription_start: string; // YYYY-MM-DD
  subscription_end: string;   // YYYY-MM-DD (auto-calculated)
  auto_renew: boolean;
  treat_as_trial: boolean;    // when start > today, status -> trial
  activate_now: boolean;      // generate subscription invoice immediately
  discount_type: DiscountType;
  discount_value: number;
  discount_reason: string;
}

export const emptySubscriptionValues = (): SubscriptionValues => ({
  currency: 'MYR',
  plan_type: '',
  plan_amount: '0',
  billing_cycle: '',          // empty by default (Irene 요구)
  payment_model: 'restaurant',
  subscription_start: new Date().toISOString().split('T')[0],
  subscription_end: '',
  auto_renew: true,
  treat_as_trial: false,
  activate_now: true,
  discount_type: 'none',
  discount_value: 0,
  discount_reason: ''
});

interface PlanTemplate {
  id: number;
  display_name: string;
  code?: string;
  plan_target: string;
  monthly_price?: number;
  annual_price?: number;
  prices?: Array<{ currency: string; billing_cycle: string; amount: number }>;
  [key: string]: any;
}

export interface SubscriptionFormFieldsProps {
  userType: UserType;
  mode: 'add' | 'edit';
  values: SubscriptionValues;
  onChange: (patch: Partial<SubscriptionValues>) => void;
  availablePlans: PlanTemplate[];
  planCurrencies: string[];
  options?: {
    hidePaymentModel?: boolean;
    hideTrial?: boolean;
    hideActivateNow?: boolean;
    hideDiscount?: boolean;
    readOnlyEndDate?: boolean;
  };
}

// userType → which plan_target values to show in the Plan dropdown
const PLAN_FILTER: Record<UserType, string[]> = {
  restaurant: ['restaurant', 'all'],
  brand: ['brand', 'all'],
  foodcourt: ['foodcourt', 'all'],
  owner: ['owner', 'restaurant', 'all'],
  supplier: ['supplier', 'all']
};

// Default Payment Model per userType (Irene: BG/FG/Owner pay themselves; Restaurant defaults to its own admin)
const DEFAULT_PAYMENT_MODEL: Record<UserType, PaymentModel> = {
  restaurant: 'restaurant',
  brand: 'brand_manager',
  foodcourt: 'foodcourt_manager',
  owner: 'restaurant',
  supplier: 'restaurant'
};

function calcEndDate(startStr: string, cycle: BillingCycle): string {
  if (!startStr || !cycle) return '';
  const [y, m, d] = startStr.slice(0, 10).split('-').map(Number);
  const endD = new Date(y, m - 1, d);
  if (cycle === 'annual') endD.setFullYear(endD.getFullYear() + 1);
  else endD.setMonth(endD.getMonth() + 1);
  endD.setDate(endD.getDate() - 1);
  return `${endD.getFullYear()}-${String(endD.getMonth() + 1).padStart(2, '0')}-${String(endD.getDate()).padStart(2, '0')}`;
}

function priceFor(plan: PlanTemplate | undefined, currency: string, cycle: BillingCycle): number {
  if (!plan || !cycle) return 0;
  return Number(getPlanPrice(plan as any, currency, cycle === 'annual' ? 'annual' : 'monthly')) || 0;
}

function applyDiscount(base: number, dt: DiscountType, dv: number): number {
  if (dt === 'percentage') return Math.max(0, base * (1 - dv / 100));
  if (dt === 'fixed') return Math.max(0, base - dv);
  return base;
}

const SubscriptionFormFields: React.FC<SubscriptionFormFieldsProps> = ({
  userType, mode, values, onChange, availablePlans, planCurrencies, options = {}
}) => {
  const { t } = useTranslation('subscription');

  // Filter plans by userType
  const filteredPlans = useMemo(
    () => availablePlans.filter(p => PLAN_FILTER[userType].includes(p.plan_target)),
    [availablePlans, userType]
  );

  // Selected plan (if any)
  const selectedPlan = useMemo(
    () => filteredPlans.find(p => p.display_name === values.plan_type),
    [filteredPlans, values.plan_type]
  );

  // Auto-recalc plan_amount when currency / plan / billing_cycle change
  useEffect(() => {
    if (!selectedPlan || !values.billing_cycle) return;
    const next = priceFor(selectedPlan, values.currency, values.billing_cycle).toFixed(2);
    if (next !== values.plan_amount) onChange({ plan_amount: next });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.currency, values.plan_type, values.billing_cycle]);

  // Auto-recalc subscription_end
  useEffect(() => {
    const next = calcEndDate(values.subscription_start, values.billing_cycle);
    if (next !== values.subscription_end) onChange({ subscription_end: next });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.subscription_start, values.billing_cycle]);

  // Default payment_model for userType (when adding new)
  useEffect(() => {
    if (mode === 'add' && !values.payment_model) {
      onChange({ payment_model: DEFAULT_PAYMENT_MODEL[userType] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const baseAmount = parseFloat(values.plan_amount) || 0;
  const finalAmount = applyDiscount(baseAmount, values.discount_type, Number(values.discount_value) || 0);
  const showSummary = !!values.billing_cycle && !!values.plan_type;

  return (
    <FormGrid>
      {/* 1. Currency */}
      <FormGroup>
        <FormLabel>{t('currency', 'Currency')} *</FormLabel>
        <FormSelect
          value={values.currency}
          onChange={(e) => onChange({ currency: e.target.value })}
        >
          {planCurrencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </FormSelect>
      </FormGroup>

      {/* 2. Plan Type */}
      <FormGroup>
        <FormLabel>{t('planType', 'Plan Type')} *</FormLabel>
        <FormSelect
          value={values.plan_type}
          onChange={(e) => onChange({ plan_type: e.target.value })}
        >
          <option value="">{t('selectPlan', 'Select a plan')}</option>
          {filteredPlans.map(plan => (
            <option key={plan.id} value={plan.display_name}>
              {plan.display_name} ({formatPlanPrice(plan as any, values.currency)}/month)
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      {/* 3. Treat as trial */}
      {!options.hideTrial && (
        <FormGroup style={{ gridColumn: '1 / -1' }}>
          <CardLabel $active={values.treat_as_trial}>
            <input
              type="checkbox"
              checked={values.treat_as_trial}
              onChange={(e) => onChange({ treat_as_trial: e.target.checked })}
            />
            <div>
              <CardTitle>{t('trial.title', 'Treat as trial until subscription starts')}</CardTitle>
              <CardDesc>{t('trial.desc', 'If Subscription Start Date is in the future, the account is in trial until then. Trial length = days until subscription start.')}</CardDesc>
            </div>
          </CardLabel>
        </FormGroup>
      )}

      {/* Section header */}
      <SectionHeader>
        <h3>{t('settingsHeader', 'Subscription Settings')}</h3>
      </SectionHeader>

      {/* 4. Activate now */}
      {!options.hideActivateNow && (
        <FormGroup style={{ gridColumn: '1 / -1' }}>
          <CardLabel $active={values.activate_now} $variant={values.activate_now ? 'success' : 'warning'}>
            <input
              type="checkbox"
              checked={values.activate_now}
              onChange={(e) => onChange({ activate_now: e.target.checked })}
            />
            <div>
              <CardTitle>{t('activateNow.title', 'Activate subscription now')}</CardTitle>
              <CardDesc>
                {values.activate_now
                  ? t('activateNow.descOn', 'A subscription invoice will be generated immediately for the plan below.')
                  : t('activateNow.descOff', 'No invoice will be generated. Use for hardware-only or placeholder accounts.')}
              </CardDesc>
            </div>
          </CardLabel>
        </FormGroup>
      )}

      {/* 5. Billing Cycle (no default — user must pick) */}
      <FormGroup>
        <FormLabel>{t('billingCycle', 'Billing Cycle')} *</FormLabel>
        <FormSelect
          value={values.billing_cycle}
          onChange={(e) => onChange({ billing_cycle: e.target.value as BillingCycle })}
        >
          <option value="">{t('selectCycle', 'Select cycle')}</option>
          <option value="monthly">{t('monthly', 'Monthly')}</option>
          <option value="annual">{t('annual', 'Annual')}</option>
        </FormSelect>
      </FormGroup>

      {/* 6. Payment Model */}
      {!options.hidePaymentModel && (
        <FormGroup>
          <FormLabel>{t('paymentModel', 'Payment Model')} *</FormLabel>
          <FormSelect
            value={values.payment_model}
            onChange={(e) => onChange({ payment_model: e.target.value as PaymentModel })}
          >
            <option value="restaurant">{t('paymentModelOptions.restaurant', 'Restaurant Admin')}</option>
            <option value="brand_manager">{t('paymentModelOptions.brand', 'Brand Manager')}</option>
            <option value="foodcourt_manager">{t('paymentModelOptions.foodcourt', 'Foodcourt Manager')}</option>
          </FormSelect>
        </FormGroup>
      )}

      {/* 7. Subscription Period */}
      <FormGroup style={{ gridColumn: 'span 2' }}>
        <FormLabel>{t('period', 'Subscription Period')} * <em>{t('endAuto', '(end auto-calculated)')}</em></FormLabel>
        <DateRangeField
          startDate={values.subscription_start}
          endDate={values.subscription_end}
          onChange={(start, _end) => {
            onChange({
              subscription_start: start,
              subscription_end: calcEndDate(start, values.billing_cycle)
            });
          }}
        />
      </FormGroup>

      {/* 8. Auto-renew */}
      <FormGroup style={{ gridColumn: '1 / -1' }}>
        <InlineLabel>
          <input
            type="checkbox"
            checked={values.auto_renew}
            onChange={(e) => onChange({ auto_renew: e.target.checked })}
          />
          <span>{t('autoRenew', 'Auto-renew subscription')}</span>
        </InlineLabel>
      </FormGroup>

      {/* 9. Discount */}
      {!options.hideDiscount && (
        <>
          <SectionHeader>
            <h3>{t('discountHeader', 'Subscription Discount')}</h3>
          </SectionHeader>
          <FormGroup>
            <FormLabel>{t('discount.type', 'Discount Type')}</FormLabel>
            <FormSelect
              value={values.discount_type}
              onChange={(e) => {
                const dt = e.target.value as DiscountType;
                const patch: Partial<SubscriptionValues> = { discount_type: dt };
                if (dt === 'none') { patch.discount_value = 0; patch.discount_reason = ''; }
                onChange(patch);
              }}
            >
              <option value="none">{t('discount.none', 'No discount')}</option>
              <option value="percentage">{t('discount.percentage', 'Percentage (%)')}</option>
              <option value="fixed">{t('discount.fixed', 'Fixed amount')}</option>
            </FormSelect>
          </FormGroup>

          {values.discount_type !== 'none' && (
            <>
              <FormGroup>
                <FormLabel>
                  {values.discount_type === 'percentage'
                    ? t('discount.valuePct', 'Discount %')
                    : t('discount.valueFixed', 'Discount amount')}
                </FormLabel>
                <FormInput
                  type="number"
                  min={0}
                  max={values.discount_type === 'percentage' ? 100 : undefined}
                  step={0.01}
                  value={values.discount_value || 0}
                  onChange={(e) => onChange({ discount_value: parseFloat(e.target.value) || 0 })}
                />
              </FormGroup>
              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel>{t('discount.reason', 'Reason (optional)')}</FormLabel>
                <FormInput
                  type="text"
                  placeholder={t('discount.reasonPlaceholder', 'e.g. Early bird, partner deal')}
                  value={values.discount_reason || ''}
                  onChange={(e) => onChange({ discount_reason: e.target.value })}
                />
              </FormGroup>
            </>
          )}
        </>
      )}

      {/* Summary (hidden until billing_cycle is picked) */}
      {showSummary && (
        <SummaryBox>
          <SummaryLabel>{t('summary', 'Summary')}</SummaryLabel>
          <SummaryMain>
            {values.plan_type} — {formatCurrency(baseAmount, values.currency || 'MYR')} ({values.billing_cycle})
          </SummaryMain>
          {values.discount_type !== 'none' && Number(values.discount_value) > 0 && (
            <SummaryRow>
              <span>{t('summary.discount', 'Discount')}:</span>
              <span style={{ color: '#DC2626' }}>
                {values.discount_type === 'percentage'
                  ? `−${values.discount_value}%`
                  : `−${formatCurrency(Number(values.discount_value), values.currency)}`}
              </span>
            </SummaryRow>
          )}
          {values.discount_type !== 'none' && Number(values.discount_value) > 0 && (
            <SummaryRow>
              <span>{t('summary.final', 'Final')}:</span>
              <strong>{formatCurrency(finalAmount, values.currency || 'MYR')}</strong>
            </SummaryRow>
          )}
          {!options.hidePaymentModel && (
            <SummarySub>
              {t('summary.paidBy', 'Paid by')}: {
                values.payment_model === 'brand_manager' ? t('paymentModelOptions.brand', 'Brand Manager') :
                values.payment_model === 'foodcourt_manager' ? t('paymentModelOptions.foodcourt', 'Foodcourt Manager') :
                t('paymentModelOptions.restaurant', 'Restaurant Admin')
              }
            </SummarySub>
          )}
        </SummaryBox>
      )}
    </FormGrid>
  );
};

export default SubscriptionFormFields;

// ─── Styled ───────────────────────────────────────────────────

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionHeader = styled.div`
  grid-column: 1 / -1;
  margin-top: 20px;
  margin-bottom: 6px;
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    border-bottom: 2px solid #635BFF;
    padding-bottom: 8px;
  }
`;

const CardLabel = styled.label<{ $active?: boolean; $variant?: 'success' | 'warning' }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  border: 2px solid ${p => {
    if (p.$variant === 'success') return p.$active ? '#10B981' : '#E5E7EB';
    if (p.$variant === 'warning') return p.$active ? '#10B981' : '#F59E0B';
    return p.$active ? '#635BFF' : '#E5E7EB';
  }};
  background: ${p => {
    if (p.$variant === 'success') return p.$active ? '#ECFDF5' : '#F9FAFB';
    if (p.$variant === 'warning') return p.$active ? '#ECFDF5' : '#FEF3C7';
    return p.$active ? '#F0EFFF' : '#F9FAFB';
  }};
  cursor: pointer;
  transition: all 0.2s;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #635BFF;
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const CardTitle = styled.div`
  font-weight: 600;
  color: #0A2540;
  font-size: 14px;
`;

const CardDesc = styled.div`
  font-size: 12.5px;
  color: #6B7280;
  margin-top: 2px;
  line-height: 1.5;
`;

const InlineLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  input { width: 16px; height: 16px; accent-color: #635BFF; }
`;

const SummaryBox = styled.div`
  grid-column: 1 / -1;
  padding: 16px 18px;
  background: #F3F4F6;
  border-radius: 8px;
  margin-top: 10px;
`;

const SummaryLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 6px;
`;

const SummaryMain = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #4B5563;
  margin-top: 4px;
`;

const SummarySub = styled.div`
  font-size: 12.5px;
  color: #6B7280;
  margin-top: 6px;
`;
