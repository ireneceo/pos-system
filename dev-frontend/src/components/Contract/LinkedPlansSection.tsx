// Phase 1 Contract ↔ Plan integration UI.
// Replaces the old "Recurring Subscriptions" section with:
//   1. List of attached (open) ContractPlans with unlink action
//   2. "Create plan from contract" wizard button (calls /create-plan-from-contract)
//   3. Billing Preview — shows computed next-invoice line items and subtotal
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { getAuthToken } from '../../utils/auth';
import { getCurrencySymbol } from '../../utils/currency';

interface LinkedPlansSectionProps {
  contractId: number;
  plans: any[];
  currency: string;
  entityType: 'brand' | 'foodcourt';
  canManage: boolean;
  onChanged: () => void;
  t: (key: string, defaultValue?: string) => string;
  financialTerms?: Record<string, any> | null; // For mismatch detection (Phase 2-B)
}

// Phase 2-B — detect whether a linked plan's numbers match the contract's financial_terms.
// Returns null if no mismatch / no data; returns a short reason string if a mismatch is detected.
// Read-only informational signal — never mutates either side.
function detectMismatch(
  entityPlan: any,
  priceRow: any,
  financialTerms: Record<string, any> | null | undefined,
  entityType: 'brand' | 'foodcourt'
): string | null {
  if (!entityPlan || !financialTerms) return null;
  const ft = financialTerms;
  const plan = entityPlan;
  const tolerance = 0.01; // allow floating-point noise

  if (plan.charge_type === 'fixed') {
    const planPrice = Number(priceRow?.monthly_price);
    if (isNaN(planPrice)) return null;
    if (entityType === 'foodcourt' && ft.base_rent != null) {
      const diff = Math.abs(Number(ft.base_rent) - planPrice);
      if (diff > tolerance) return `Contract base_rent ${ft.base_rent} ≠ Plan ${planPrice}`;
    } else if (entityType === 'brand' && ft.franchise_fee != null) {
      // Only compare if royalty is absent (franchise_fee acting as recurring)
      if (ft.royalty_value == null || Number(ft.royalty_value) === 0) {
        const diff = Math.abs(Number(ft.franchise_fee) - planPrice);
        if (diff > tolerance) return `Contract franchise_fee ${ft.franchise_fee} ≠ Plan ${planPrice}`;
      }
    }
  } else if (plan.charge_type === 'percentage') {
    const planPct = Number(plan.percentage_value);
    if (isNaN(planPct)) return null;
    if (entityType === 'foodcourt' && ft.revenue_share_percent != null) {
      const diff = Math.abs(Number(ft.revenue_share_percent) - planPct);
      if (diff > tolerance) return `Contract revenue_share_percent ${ft.revenue_share_percent}% ≠ Plan ${planPct}%`;
    } else if (entityType === 'brand' && ft.royalty_value != null) {
      const diff = Math.abs(Number(ft.royalty_value) - planPct);
      if (diff > tolerance) return `Contract royalty ${ft.royalty_value}% ≠ Plan ${planPct}%`;
    }
  } else if (plan.charge_type === 'combined') {
    const planFixed = Number(priceRow?.monthly_price);
    const planPct = Number(plan.percentage_value);
    if (entityType === 'foodcourt') {
      if (ft.base_rent != null && !isNaN(planFixed)) {
        const diff = Math.abs(Number(ft.base_rent) - planFixed);
        if (diff > tolerance) return `Contract base_rent ${ft.base_rent} ≠ Plan floor ${planFixed}`;
      }
      if (ft.revenue_share_percent != null && !isNaN(planPct)) {
        const diff = Math.abs(Number(ft.revenue_share_percent) - planPct);
        if (diff > tolerance) return `Contract revenue_share_percent ${ft.revenue_share_percent}% ≠ Plan ${planPct}%`;
      }
    }
  }
  return null;
}

const Section = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
`;
const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
const Empty = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-align: center;
  padding: 20px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #EEF2F6;
  gap: 12px;
  &:last-child { border-bottom: none; }
`;
const PlanName = styled.div`
  font-weight: 600;
  color: #0A2540;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;
const PlanMeta = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 2px;
`;
const MismatchBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  background: #FFFBEB;
  color: #92400E;
  border: 1px solid #F59E0B;
  white-space: nowrap;
  cursor: help;
`;
const MismatchDetail = styled.div`
  font-size: 11px;
  color: #B45309;
  margin-top: 4px;
  line-height: 1.4;
  padding-left: 0;
`;
const ActionBtn = styled.button<{ $variant?: 'primary' | 'danger' | 'ghost' }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s;
  ${p => p.$variant === 'primary' ? `
    background: #635BFF; color: white; border-color: #635BFF;
    &:hover { background: #5A51E6; border-color: #5A51E6; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  ` : p.$variant === 'danger' ? `
    background: white; color: #DC2626; border-color: #FECACA;
    &:hover { background: #FEE2E2; }
  ` : `
    background: #F1F4F8; color: #374151; border-color: #C7CED6;
    &:hover { background: #F1F4F8; }
  `}
`;
const PreviewBox = styled.div`
  margin-top: 16px;
  padding: 14px 16px;
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 6px;
`;
const PreviewTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 10px;
`;
const PreviewLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 13px;
  color: #374151;
  b { color: #0A2540; }
`;
const PreviewTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 0;
  margin-top: 6px;
  border-top: 1px solid #C7CED6;
  font-size: 14px;
  font-weight: 700;
  color: #0A2540;
  b { color: #635BFF; }
`;
const WarningBanner = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  background: #FFFBEB;
  border: 1px solid #F59E0B;
  border-radius: 6px;
  font-size: 12px;
  color: #92400E;
  line-height: 1.5;
`;

interface LinkedPlansSectionPropsExt extends LinkedPlansSectionProps {
  entityId?: number; // Needed to fetch available plans for the picker
}

const LinkedPlansSection: React.FC<LinkedPlansSectionPropsExt> = ({
  contractId, plans, currency, entityType, canManage, onChanged, t, financialTerms, entityId
}) => {
  const symbol = getCurrencySymbol(currency || 'MYR');
  const [preview, setPreview] = useState<any>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [availablePlans, setAvailablePlans] = useState<any[] | null>(null);
  const [pickerSearch, setPickerSearch] = useState('');
  const [linking, setLinking] = useState(false);
  const [pickerError, setPickerError] = useState<string | null>(null);

  const openPlans = (plans || []).filter(p => !p.end_at);
  const linkedPlanIds = new Set(openPlans.map((p: any) => p.entity_plan_id));

  const loadPreview = useCallback(async () => {
    setLoadingPreview(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/contracts/${contractId}/billing-preview`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) setPreview(json.data);
    } finally {
      setLoadingPreview(false);
    }
  }, [contractId]);

  useEffect(() => { loadPreview(); }, [loadPreview, plans]);

  const handleUnlink = async (planLinkId: number) => {
    if (!canManage) return;
    if (!window.confirm(t('detail.unlinkConfirm', 'Unlink this plan from the contract? The plan itself will remain (shared resource).') || '')) return;
    const token = getAuthToken();
    const res = await fetch(`/api/contracts/${contractId}/plans/${planLinkId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) onChanged();
  };

  const openPicker = async () => {
    setShowPicker(true);
    setPickerError(null);
    if (availablePlans !== null || !entityId) return;
    try {
      const token = getAuthToken();
      const url = entityType === 'brand' ? `/api/brands/${entityId}/plans` : `/api/foodcourts/${entityId}/plans`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setAvailablePlans(json.data.filter((p: any) => p.is_active !== false));
      } else {
        setPickerError(json.message || 'Failed to load plans');
        setAvailablePlans([]);
      }
    } catch {
      setPickerError('Network error');
      setAvailablePlans([]);
    }
  };

  const handleLinkExisting = async (entityPlanId: number) => {
    if (!canManage) return;
    setLinking(true);
    setPickerError(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/contracts/${contractId}/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ entity_plan_id: entityPlanId })
      });
      const json = await res.json();
      if (json.success) {
        setShowPicker(false);
        onChanged();
      } else {
        setPickerError(json.message || 'Failed to link plan');
      }
    } catch {
      setPickerError('Network error');
    } finally {
      setLinking(false);
    }
  };

  const plansPageUrl = `/pos/${entityType === 'brand' ? 'brand' : 'foodcourt'}/plans`;
  const filteredAvailable = (availablePlans || []).filter(p => {
    if (linkedPlanIds.has(p.id)) return false;
    if (!pickerSearch) return true;
    const q = pickerSearch.toLowerCase();
    return String(p.name || '').toLowerCase().includes(q) || String(p.description || '').toLowerCase().includes(q);
  });

  return (
    <Section>
      <SectionTitle>
        <span>{t('detail.linkedPlans', 'Linked Plans')}</span>
        {canManage && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <ActionBtn
              $variant="ghost"
              onClick={() => { window.open(plansPageUrl, '_blank'); }}
              type="button"
              title={t('detail.viewAllPlansHint', 'Open the Plans page in a new tab to create or manage plans') as string}
            >
              {t('detail.viewAllPlans', 'View all plans')}
            </ActionBtn>
            <ActionBtn
              $variant="primary"
              onClick={openPicker}
              type="button"
            >
              {t('detail.linkExistingPlan', 'Link existing plan')}
            </ActionBtn>
          </div>
        )}
      </SectionTitle>

      {openPlans.length === 0 ? (
        <Empty>
          {t('detail.noLinkedPlans', 'No plans linked to this contract yet.')}
          {canManage && (
            <div style={{ marginTop: 8, fontSize: 12 }}>
              {t('detail.noLinkedPlansHint', 'Use "Link existing plan" to pick one from your brand/foodcourt catalog.')}
            </div>
          )}
        </Empty>
      ) : (
        <div>
          {openPlans.map((p: any) => {
            const ep = p.entityPlan || {};
            const planCurrency = ep.currency || currency || 'MYR';
            const planSymbol = getCurrencySymbol(planCurrency);
            const priceRow = (ep.prices || []).find((r: any) => r.currency === planCurrency) || (ep.prices || [])[0];
            const fixedAmt = priceRow?.monthly_price != null ? Number(priceRow.monthly_price) : null;
            const pctRate = ep.percentage_value || 0;
            const price = ep.charge_type === 'percentage'
              ? `${pctRate}% of ${ep.revenue_base || 'previous_month'}`
              : ep.charge_type === 'combined'
                ? `${planSymbol} ${fixedAmt != null ? fixedAmt.toLocaleString('en-MY') : '—'}/mo min · ${pctRate}% of revenue (whichever is higher)`
                : (fixedAmt != null ? `${planSymbol} ${fixedAmt.toLocaleString('en-MY')}/mo` : '—');
            const mismatch = detectMismatch(ep, priceRow, financialTerms, entityType);
            return (
              <Row key={p.id}>
                <div style={{ flex: 1 }}>
                  <PlanName>
                    {ep.name || 'Plan'}
                    {mismatch && (
                      <MismatchBadge title={mismatch}>
                        {t('detail.planMismatch', 'Contract/Plan mismatch')}
                      </MismatchBadge>
                    )}
                  </PlanName>
                  <PlanMeta>
                    {price}
                    {ep.billing_day && ` · ${t('detail.billingDay', 'Billing day')} ${ep.billing_day}`}
                    {ep.auto_generate === false && ` · ${t('detail.autoGenerateOff', 'auto-generate OFF')}`}
                  </PlanMeta>
                  {mismatch && (
                    <MismatchDetail>{mismatch}</MismatchDetail>
                  )}
                </div>
                {canManage && (
                  <ActionBtn $variant="danger" onClick={() => handleUnlink(p.id)} type="button">
                    {t('detail.unlink', 'Unlink')}
                  </ActionBtn>
                )}
              </Row>
            );
          })}
        </div>
      )}

      {/* Link existing plan picker modal */}
      {showPicker && (
        <div
          onClick={() => !linking && setShowPicker(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(10,37,64,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: 12, padding: 24,
              width: '90%', maxWidth: 600, maxHeight: '80vh', overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540' }}>
                {t('detail.linkExistingPlanTitle', 'Link an existing plan')}
              </div>
              <button
                onClick={() => !linking && setShowPicker(false)}
                style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#4B5563' }}
                type="button"
              >×</button>
            </div>

            <input
              type="text"
              value={pickerSearch}
              onChange={e => setPickerSearch(e.target.value)}
              placeholder={t('detail.searchPlans', 'Search plans by name...') as string}
              style={{
                width: '100%', padding: '10px 12px', marginBottom: 12,
                border: '1px solid #C7CED6', borderRadius: 6, fontSize: 14, boxSizing: 'border-box'
              }}
            />

            {pickerError && (
              <div style={{ padding: '8px 12px', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 6, color: '#991B1B', fontSize: 13, marginBottom: 12 }}>
                {pickerError}
              </div>
            )}

            {availablePlans === null ? (
              <div style={{ textAlign: 'center', padding: 24, color: '#4B5563', fontSize: 13 }}>
                {t('detail.loading', 'Loading…')}
              </div>
            ) : filteredAvailable.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 24, color: '#6B7280', fontSize: 13 }}>
                {pickerSearch ? (
                  t('detail.noPlansMatch', 'No plans match your search.')
                ) : (
                  <>
                    {t('detail.noAvailablePlans', 'No plans available. Create a plan from this contract, or manage plans separately.')}
                    <div style={{ marginTop: 10 }}>
                      <a
                        href={plansPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#635BFF', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}
                      >
                        {t('detail.openPlansPage', 'Open Plans page ↗')}
                      </a>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                {filteredAvailable.map((p: any) => {
                  const priceRow = (p.prices || []).find((r: any) => r.currency === currency) || (p.prices || [])[0];
                  const fixedAmt = priceRow?.monthly_price != null ? Number(priceRow.monthly_price) : null;
                  const pctRate = p.percentage_value || 0;
                  const planSym = getCurrencySymbol(priceRow?.currency || p.currency || currency);
                  const priceLabel = p.charge_type === 'percentage'
                    ? `${pctRate}% of ${p.revenue_base || 'previous_month'}`
                    : p.charge_type === 'combined'
                      ? `${planSym} ${fixedAmt != null ? fixedAmt.toLocaleString('en-MY') : '—'}/mo min · ${pctRate}% of revenue`
                      : (fixedAmt != null ? `${planSym} ${fixedAmt.toLocaleString('en-MY')}/mo` : '—');
                  return (
                    <div
                      key={p.id}
                      style={{
                        padding: '12px 14px', border: '1px solid #C7CED6', borderRadius: 8,
                        marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        gap: 12, background: 'white'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: '#0A2540', fontSize: 14, marginBottom: 4 }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: 12, color: '#4B5563' }}>{priceLabel}</div>
                        {p.description && (
                          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {p.description}
                          </div>
                        )}
                      </div>
                      <ActionBtn
                        $variant="primary"
                        onClick={() => handleLinkExisting(p.id)}
                        disabled={linking}
                        type="button"
                      >
                        {linking ? t('detail.linking', 'Linking…') : t('detail.link', 'Link')}
                      </ActionBtn>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ marginTop: 12, fontSize: 12, color: '#6B7280', textAlign: 'center' }}>
              {t('detail.linkReplacesPrior', 'Linking a plan closes any prior open plan link on this contract.')}
            </div>
          </div>
        </div>
      )}

      {/* Billing preview */}
      {preview && preview.has_plan && (
        <PreviewBox>
          <PreviewTitle>
            {t('detail.billingPreview', 'Next invoice (estimated)')}
          </PreviewTitle>
          {preview.financial_redacted ? (
            <div style={{ fontSize: 12, color: '#6B7280', fontStyle: 'italic' }}>
              {t('detail.financialRedacted', 'Amounts hidden for your role')}
            </div>
          ) : (
            <>
              {preview.line_items?.map((li: any, idx: number) => {
                const liSym = getCurrencySymbol(li.currency || currency);
                let detail = '';
                if (li.method === 'percentage') {
                  detail = ` (${li.rate}% × ${liSym} ${Number(li.base || 0).toLocaleString('en-MY')})`;
                } else if (li.method === 'combined') {
                  const pctAmt = Number(li.base || 0) * Number(li.rate || 0) / 100;
                  detail = ` (max of ${liSym} ${Number(li.minimum || 0).toLocaleString('en-MY')} min · ${li.rate}% × ${liSym} ${Number(li.base || 0).toLocaleString('en-MY')} = ${liSym} ${pctAmt.toLocaleString('en-MY', { maximumFractionDigits: 2 })})`;
                }
                return (
                  <PreviewLine key={idx}>
                    <span>{li.plan_name}{detail}</span>
                    <b>{liSym} {Number(li.amount || 0).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
                  </PreviewLine>
                );
              })}
              <PreviewTotal>
                <span>{t('detail.estimatedSubtotal', 'Estimated subtotal')}</span>
                <b>{symbol} {Number(preview.subtotal || 0).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
              </PreviewTotal>
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 8 }}>
                {t('detail.previewDisclaimer', 'Estimate based on linked plan(s) and last 30-day revenue. Actual invoice may include tax and additional charges set by payment settings.')}
              </div>
            </>
          )}
        </PreviewBox>
      )}
    </Section>
  );
};

export default LinkedPlansSection;
