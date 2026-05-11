import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Header as StdHeader, Title as StdTitle } from '../../components/UI/PageComponents';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useRoleDisplayName } from '../../utils/roleDisplay';
import { getAuthToken } from '../../utils/auth';
import { useSiteTimezone } from '../../hooks/useSiteTimezone';

type Tab = 'overview' | 'partners' | 'payouts' | 'settings';

interface OverviewData {
  partners: { total: number; active_partners: number; new_this_month: number };
  referrals: { total: number; new_this_month: number };
  commissions: { total: Record<string, number>; this_month: Record<string, number> };
  payouts: { total_paid: Record<string, number>; pending_count: number };
  clicks: { total: number; this_month: number };
  conversion_funnel: { clicks: number; signups: number; paid: number };
  monthly_signups: Array<{ ym: string; partners: number; referred: number }>;
  monthly_commissions: Array<Record<string, number | string>>;
  commission_currencies: string[];
  top_partners: Array<{ id: number; name: string; code: string; total_earned: number; active_referrals: number }>;
}

interface PartnerRow {
  id: number;
  name: string;
  email: string;
  role: string;
  referral_code: string;
  joined_at: string;
  referral_count: number;
  total_earned: Record<string, number>;
}

interface PayoutRow {
  id: number;
  created_at: string;
  amount: number;
  currency: string;
  status: 'requested' | 'approved' | 'paid' | 'rejected';
  bank: { bank_name: string; account_number: string; account_holder: string };
  partner: { id?: number; name?: string; email?: string; referral_code?: string };
  paid_at: string | null;
  reject_reason: string | null;
  transaction_reference: string | null;
}

interface Settings {
  commission_rate: number;
  first_month_discount: number;
  min_payout_amounts: Record<string, number>;
  program_active: boolean;
}

interface PartnerDetail {
  partner: {
    id: number; name: string; email: string; phone: string | null;
    role: string; referral_code: string; joined_at: string;
    bank: { bank_name: string | null; account_number: string | null; account_holder: string | null };
  };
  referrals: Array<{ id: number; name: string; role: string; signed_up_at: string; subscription_status: string | null }>;
  wallets: Array<{ currency: string; balance: number; total_earned: number; total_withdrawn: number; total_credited: number }>;
  commissions: Array<{ id: number; created_at: string; currency: string; amount: number; rate: number; invoice_id: number; status: string }>;
  payouts: Array<{ id: number; created_at: string; amount: number; currency: string; status: string; paid_at: string | null; reject_reason: string | null }>;
}

const Page = styled.div`
  padding: 24px;
  background: #FAFBFC;
  min-height: calc(100vh - 64px);

  @media (max-width: 640px) { padding: 16px; }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 24px;
  overflow-x: auto;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  padding: 12px 18px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${p => (p.$active ? '#635BFF' : 'transparent')};
  font-size: 14px;
  font-weight: ${p => (p.$active ? 600 : 500)};
  color: ${p => (p.$active ? '#635BFF' : '#6B7C93')};
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;

  &:hover { color: #0A2540; }
`;

const Card = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin: 0 0 14px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 760px) { grid-template-columns: repeat(2, 1fr); }
`;

const Stat = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 18px 20px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-top: 6px;
  letter-spacing: -0.4px;
`;

const StatDelta = styled.div`
  font-size: 12px;
  color: #059669;
  margin-top: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Th = styled.th`
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 10px 8px;
  border-bottom: 1px solid #E6EBF1;
`;

const Td = styled.td`
  padding: 12px 8px;
  border-bottom: 1px solid #F1F4F8;
  color: #0A2540;
  vertical-align: middle;
`;

const Empty = styled.div`
  padding: 36px 20px;
  text-align: center;
  color: #6B7C93;
  font-size: 14px;
  background: #FAFBFC;
  border: 1px dashed #E6EBF1;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  height: 38px;
  padding: 0 14px;
  font-size: 14px;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  outline: none;
  width: 280px;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  @media (max-width: 600px) { width: 100%; }
`;

const Filter = styled.select`
  height: 38px;
  padding: 0 12px;
  font-size: 14px;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  outline: none;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const Btn = styled.button`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  cursor: pointer;
  &:hover:not(:disabled) { background: #F5F7FA; border-color: #C9CFD9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const Primary = styled(Btn)`
  background: #635BFF;
  border-color: #635BFF;
  color: white;
  &:hover:not(:disabled) { background: #5A51E6; border-color: #5A51E6; }
`;

const Danger = styled(Btn)`
  border-color: #FECACA;
  color: #B91C1C;
  &:hover:not(:disabled) { background: #FEF2F2; border-color: #FECACA; }
`;

const StatusBadge = styled.span<{ $s: string }>`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 16px;
  background: ${p => ({
    requested: '#FEF3C7',
    approved: '#DBEAFE',
    paid: '#ECFDF5',
    rejected: '#FEE2E2'
  } as Record<string, string>)[p.$s] || '#F5F7FA'};
  color: ${p => ({
    requested: '#A16207',
    approved: '#1D4ED8',
    paid: '#059669',
    rejected: '#B91C1C'
  } as Record<string, string>)[p.$s] || '#6B7C93'};
`;

const Toolbar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

// Modal
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 37, 64, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;

const Dialog = styled.div`
  background: white;
  border-radius: 12px;
  padding: 28px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
`;

const DialogTitle = styled.h2`
  font-size: 18px; font-weight: 600; color: #0A2540; margin: 0 0 18px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  outline: none;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  font-size: 14px;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  outline: none;
  font-family: inherit;
  resize: vertical;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F1F4F8;
  &:last-child { border-bottom: none; }
`;

const ToggleLabel = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`;

const Hint = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`;

const Switch = styled.button<{ $on: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  background: ${p => (p.$on ? '#635BFF' : '#CBD5E1')};
  cursor: pointer;
  transition: background 0.15s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${p => (p.$on ? '22px' : '2px')};
    width: 20px; height: 20px;
    background: white;
    border-radius: 50%;
    transition: left 0.15s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`;

function fmtMoney(amount: number, currency: string) {
  if (currency === 'KRW' || currency === 'JPY' || currency === 'VND') {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
  return `${currency} ${amount.toFixed(2)}`;
}

const ReferralManagementPage: React.FC = () => {
  const { t } = useTranslation('referrals');
  const displayRole = useRoleDisplayName();
  const tz = useSiteTimezone();
  const [tab, setTab] = useState<Tab>('overview');

  const fmtDate = useCallback((iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-MY', {
      year: 'numeric', month: 'short', day: 'numeric', timeZone: tz
    });
  }, [tz]);
  const fmtDateTime = useCallback((iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-MY', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: tz
    });
  }, [tz]);

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' }),
    []
  );

  // Overview
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loadingOv, setLoadingOv] = useState(false);

  // Partners
  const [partners, setPartners] = useState<PartnerRow[] | null>(null);
  const [partnerSearch, setPartnerSearch] = useState('');
  const [partnerDetail, setPartnerDetail] = useState<PartnerDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Payouts
  const [payouts, setPayouts] = useState<PayoutRow[] | null>(null);
  const [payoutFilter, setPayoutFilter] = useState<string>('');
  const [actionTarget, setActionTarget] = useState<{ payout: PayoutRow; action: 'mark_paid' | 'reject' } | null>(null);
  const [actionRef, setActionRef] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [actionSubmitting, setActionSubmitting] = useState(false);

  // Settings
  const [settings, setSettings] = useState<Settings | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  const loadOverview = useCallback(async () => {
    setLoadingOv(true);
    try {
      const r = await fetch('/api/referrals/admin/overview', { headers });
      if (r.ok) {
        const b = await r.json();
        setOverview(b.data);
      }
    } finally { setLoadingOv(false); }
  }, [headers]);

  const openPartnerDetail = useCallback(async (id: number) => {
    setLoadingDetail(true);
    setPartnerDetail({} as PartnerDetail); // open modal in loading state
    try {
      const r = await fetch(`/api/referrals/admin/partners/${id}`, { headers });
      if (r.ok) {
        const b = await r.json();
        setPartnerDetail(b.data);
      } else {
        setPartnerDetail(null);
      }
    } finally { setLoadingDetail(false); }
  }, [headers]);

  const loadPartners = useCallback(async (search = '') => {
    const q = search ? `?search=${encodeURIComponent(search)}` : '';
    const r = await fetch(`/api/referrals/admin/partners${q}`, { headers });
    if (r.ok) {
      const b = await r.json();
      setPartners(b.data?.partners || []);
    }
  }, [headers]);

  const loadPayouts = useCallback(async (status = '') => {
    const q = status ? `?status=${status}` : '';
    const r = await fetch(`/api/referrals/admin/payouts${q}`, { headers });
    if (r.ok) {
      const b = await r.json();
      setPayouts(b.data?.payouts || []);
    }
  }, [headers]);

  const loadSettings = useCallback(async () => {
    const r = await fetch('/api/referrals/admin/settings', { headers });
    if (r.ok) {
      const b = await r.json();
      setSettings(b.data);
    }
  }, [headers]);

  useEffect(() => {
    if (tab === 'overview' && !overview) loadOverview();
    if (tab === 'partners' && partners === null) loadPartners();
    if (tab === 'payouts' && payouts === null) loadPayouts();
    if (tab === 'settings' && settings === null) loadSettings();
  }, [tab, overview, partners, payouts, settings, loadOverview, loadPartners, loadPayouts, loadSettings]);

  // Partner search debounce
  useEffect(() => {
    if (tab !== 'partners') return;
    const h = setTimeout(() => loadPartners(partnerSearch), 350);
    return () => clearTimeout(h);
  }, [partnerSearch, tab, loadPartners]);

  // Payout actions
  const onApprove = async (p: PayoutRow) => {
    await fetch(`/api/referrals/admin/payouts/${p.id}`, {
      method: 'PUT', headers,
      body: JSON.stringify({ action: 'approve' })
    });
    loadPayouts(payoutFilter);
  };

  const submitAction = async () => {
    if (!actionTarget) return;
    setActionSubmitting(true);
    try {
      const body: Record<string, string> = { action: actionTarget.action };
      if (actionTarget.action === 'mark_paid') body.transaction_reference = actionRef;
      if (actionTarget.action === 'reject') body.reason = actionReason;
      const r = await fetch(`/api/referrals/admin/payouts/${actionTarget.payout.id}`, {
        method: 'PUT', headers, body: JSON.stringify(body)
      });
      if (r.ok) {
        setActionTarget(null);
        setActionRef('');
        setActionReason('');
        loadPayouts(payoutFilter);
      }
    } finally { setActionSubmitting(false); }
  };

  const saveSetting = async (patch: Partial<Settings>) => {
    setSavingSettings(true);
    try {
      const r = await fetch('/api/referrals/admin/settings', {
        method: 'PUT', headers, body: JSON.stringify(patch)
      });
      if (r.ok) {
        const b = await r.json();
        setSettings(b.data);
      }
    } finally { setSavingSettings(false); }
  };

  return (
    <>
      <StdHeader><StdTitle>{t('admin.title', 'Referral Program')}</StdTitle></StdHeader>
      <Page>
      <Tabs>
        <TabBtn type="button" $active={tab === 'overview'} onClick={() => setTab('overview')}>{t('admin.tabs.overview', 'Overview')}</TabBtn>
        <TabBtn type="button" $active={tab === 'partners'} onClick={() => setTab('partners')}>{t('admin.tabs.partners', 'Partners')}</TabBtn>
        <TabBtn type="button" $active={tab === 'payouts'} onClick={() => setTab('payouts')}>{t('admin.tabs.payouts', 'Payouts')}</TabBtn>
        <TabBtn type="button" $active={tab === 'settings'} onClick={() => setTab('settings')}>{t('admin.tabs.settings', 'Settings')}</TabBtn>
      </Tabs>

      {tab === 'overview' && (
        <>
          {loadingOv && <Empty>{t('common.loading', 'Loading…')}</Empty>}
          {overview && (
            <>
              <StatGrid>
                <Stat>
                  <StatLabel>{t('admin.overview.kpi.partners', 'Partners')}</StatLabel>
                  <StatValue>{overview.partners.total}</StatValue>
                  <StatDelta>{t('admin.overview.kpi.thisMonthDelta', '+{{count}} this month', { count: overview.partners.new_this_month })}</StatDelta>
                </Stat>
                <Stat>
                  <StatLabel>{t('admin.overview.kpi.activeReferrals', 'Active referral users')}</StatLabel>
                  <StatValue>{overview.referrals.total}</StatValue>
                  <StatDelta>{t('admin.overview.kpi.thisMonthDelta', '+{{count}} this month', { count: overview.referrals.new_this_month })}</StatDelta>
                </Stat>
                <Stat>
                  <StatLabel>{t('admin.overview.kpi.pendingPayouts', 'Pending payouts')}</StatLabel>
                  <StatValue>{overview.payouts.pending_count}</StatValue>
                </Stat>
                <Stat>
                  <StatLabel>{t('admin.overview.kpi.clicks', 'Clicks')}</StatLabel>
                  <StatValue>{overview.clicks.total}</StatValue>
                  <StatDelta>{t('admin.overview.kpi.thisMonthDelta', '+{{count}} this month', { count: overview.clicks.this_month })}</StatDelta>
                </Stat>
              </StatGrid>

              <Card>
                <CardTitle>{t('admin.overview.commissions.title', 'Commissions credited')}</CardTitle>
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                  <div>
                    <StatLabel>{t('admin.overview.commissions.totalToDate', 'Total to date')}</StatLabel>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#0A2540', marginTop: 4 }}>
                      {Object.keys(overview.commissions.total).length === 0
                        ? '—'
                        : Object.entries(overview.commissions.total).map(([c, a]) => fmtMoney(a, c)).join(' · ')}
                    </div>
                  </div>
                  <div>
                    <StatLabel>{t('admin.overview.commissions.thisMonth', 'This month')}</StatLabel>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#059669', marginTop: 4 }}>
                      {Object.keys(overview.commissions.this_month).length === 0
                        ? '—'
                        : Object.entries(overview.commissions.this_month).map(([c, a]) => '+ ' + fmtMoney(a, c)).join(' · ')}
                    </div>
                  </div>
                  <div>
                    <StatLabel>{t('admin.overview.commissions.totalPaidOut', 'Total paid out')}</StatLabel>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#0A2540', marginTop: 4 }}>
                      {Object.keys(overview.payouts.total_paid).length === 0
                        ? '—'
                        : Object.entries(overview.payouts.total_paid).map(([c, a]) => fmtMoney(a, c)).join(' · ')}
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <CardTitle>{t('admin.overview.funnel.title', 'Conversion funnel')}</CardTitle>
                {(() => {
                  const f = overview.conversion_funnel || { clicks: 0, signups: 0, paid: 0 };
                  const max = Math.max(f.clicks, 1);
                  const sRate = f.clicks > 0 ? (f.signups / f.clicks) * 100 : 0;
                  const pRate = f.signups > 0 ? (f.paid / f.signups) * 100 : 0;
                  const Step = ({ label, value, width, sub }: { label: string; value: number; width: number; sub?: string }) => (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                        <span style={{ color: '#0A2540', fontWeight: 500 }}>{label}</span>
                        <span style={{ color: '#6B7C93' }}>{value.toLocaleString()}{sub ? ` · ${sub}` : ''}</span>
                      </div>
                      <div style={{ height: 24, background: '#F0F4FF', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{
                          width: `${width}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #635BFF, #8775FF)',
                          transition: 'width 0.4s ease'
                        }} />
                      </div>
                    </div>
                  );
                  return (
                    <>
                      <Step label={t('admin.overview.funnel.linkClicks', 'Link clicks')} value={f.clicks} width={100} />
                      <Step label={t('admin.overview.funnel.signups', 'Signups (with referral code)')} value={f.signups} width={(f.signups / max) * 100} sub={`${sRate.toFixed(1)}%`} />
                      <Step label={t('admin.overview.funnel.paid', 'Paid (commission credited)')} value={f.paid} width={(f.paid / max) * 100} sub={t('admin.overview.funnel.percentOfSignups', '{{value}}% of signups', { value: pRate.toFixed(1) })} />
                    </>
                  );
                })()}
              </Card>

              <Card>
                <CardTitle>{t('admin.overview.signups.title', 'Monthly signups (last 12 months)')}</CardTitle>
                {(overview.monthly_signups || []).every(r => !r.partners && !r.referred) ? (
                  <Empty>{t('admin.overview.signups.empty', 'No signup activity yet.')}</Empty>
                ) : (
                  <div style={{ width: '100%', height: 240 }}>
                    <ResponsiveContainer>
                      <LineChart data={overview.monthly_signups} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
                        <CartesianGrid stroke="#E6EBF1" strokeDasharray="3 3" />
                        <XAxis dataKey="ym" tick={{ fontSize: 11, fill: '#6B7C93' }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6B7C93' }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Line type="monotone" dataKey="referred" name={t('admin.overview.signups.referred', 'Referred signups')} stroke="#635BFF" strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="partners" name={t('admin.overview.signups.newPartners', 'New partners')} stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>

              <Card>
                <CardTitle>{t('admin.overview.commissionsChart.title', 'Monthly commissions credited (last 12 months)')}</CardTitle>
                {(overview.commission_currencies || []).length === 0 ? (
                  <Empty>{t('admin.overview.commissionsChart.empty', 'No commissions credited yet.')}</Empty>
                ) : (
                  <div style={{ width: '100%', height: 240 }}>
                    <ResponsiveContainer>
                      <LineChart data={overview.monthly_commissions} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
                        <CartesianGrid stroke="#E6EBF1" strokeDasharray="3 3" />
                        <XAxis dataKey="ym" tick={{ fontSize: 11, fill: '#6B7C93' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#6B7C93' }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        {overview.commission_currencies.map((c, i) => {
                          const palette = ['#635BFF', '#059669', '#F59E0B', '#EF4444', '#0EA5E9', '#8B5CF6'];
                          return (
                            <Line
                              key={c}
                              type="monotone"
                              dataKey={c}
                              name={c}
                              stroke={palette[i % palette.length]}
                              strokeWidth={2}
                              dot={{ r: 3 }}
                            />
                          );
                        })}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>

              <Card>
                <CardTitle>{t('admin.overview.topPartners.title', 'Top partners')}</CardTitle>
                {overview.top_partners.length === 0 ? (
                  <Empty>{t('admin.overview.topPartners.empty', 'No partners have earned yet.')}</Empty>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <Th>{t('admin.overview.topPartners.col.name', 'Name')}</Th>
                        <Th>{t('admin.overview.topPartners.col.code', 'Code')}</Th>
                        <Th>{t('admin.overview.topPartners.col.activeReferrals', 'Active referrals')}</Th>
                        <Th>{t('admin.overview.topPartners.col.totalEarned', 'Total earned')}</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {overview.top_partners.map(p => (
                        <tr key={p.id}>
                          <Td>{p.name}</Td>
                          <Td><code style={{ color: '#635BFF', fontWeight: 600 }}>{p.code}</code></Td>
                          <Td>{p.active_referrals}</Td>
                          <Td>{fmtMoney(p.total_earned, 'MYR')}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card>
            </>
          )}
        </>
      )}

      {tab === 'partners' && (
        <>
          <Toolbar>
            <SearchInput
              type="text"
              placeholder={t('admin.partners.searchPlaceholder', 'Search by name, email, code…')}
              value={partnerSearch}
              onChange={e => setPartnerSearch(e.target.value)}
            />
          </Toolbar>
          <Card>
            {!partners ? (
              <Empty>{t('common.loading', 'Loading…')}</Empty>
            ) : partners.length === 0 ? (
              <Empty>{t('admin.partners.empty', 'No partners match your search.')}</Empty>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>{t('admin.partners.col.name', 'Name')}</Th>
                    <Th>{t('admin.partners.col.code', 'Code')}</Th>
                    <Th>{t('admin.partners.col.role', 'Role')}</Th>
                    <Th>{t('admin.partners.col.referrals', 'Referrals')}</Th>
                    <Th>{t('admin.partners.col.earned', 'Earned')}</Th>
                    <Th>{t('admin.partners.col.joined', 'Joined')}</Th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map(p => (
                    <tr
                      key={p.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => openPartnerDetail(p.id)}
                    >
                      <Td>
                        <div style={{ fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: '#6B7C93' }}>{p.email}</div>
                      </Td>
                      <Td><code style={{ color: '#635BFF', fontWeight: 600 }}>{p.referral_code}</code></Td>
                      <Td>{displayRole(p.role)}</Td>
                      <Td>{p.referral_count}</Td>
                      <Td>
                        {Object.keys(p.total_earned).length === 0
                          ? <span style={{ color: '#6B7C93' }}>—</span>
                          : Object.entries(p.total_earned).map(([c, a]) => fmtMoney(a, c)).join(', ')}
                      </Td>
                      <Td>{fmtDate(p.joined_at)}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </>
      )}

      {tab === 'payouts' && (
        <>
          <Toolbar>
            <Filter value={payoutFilter} onChange={e => { setPayoutFilter(e.target.value); loadPayouts(e.target.value); }}>
              <option value="">{t('admin.payouts.filter.all', 'All statuses')}</option>
              <option value="requested">{t('admin.payouts.filter.requested', 'Requested')}</option>
              <option value="approved">{t('admin.payouts.filter.approved', 'Approved')}</option>
              <option value="paid">{t('admin.payouts.filter.paid', 'Paid')}</option>
              <option value="rejected">{t('admin.payouts.filter.rejected', 'Rejected')}</option>
            </Filter>
          </Toolbar>
          <Card>
            {!payouts ? (
              <Empty>{t('common.loading', 'Loading…')}</Empty>
            ) : payouts.length === 0 ? (
              <Empty>{t('admin.payouts.empty', 'No payout requests in this view.')}</Empty>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>{t('admin.payouts.col.requested', 'Requested')}</Th>
                    <Th>{t('admin.payouts.col.partner', 'Partner')}</Th>
                    <Th>{t('admin.payouts.col.amount', 'Amount')}</Th>
                    <Th>{t('admin.payouts.col.status', 'Status')}</Th>
                    <Th>{t('admin.payouts.col.bank', 'Bank')}</Th>
                    <Th>{t('admin.payouts.col.actions', 'Actions')}</Th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map(p => (
                    <tr key={p.id}>
                      <Td>{fmtDateTime(p.created_at)}</Td>
                      <Td>
                        <div style={{ fontWeight: 500 }}>{p.partner.name}</div>
                        <div style={{ fontSize: 12, color: '#6B7C93' }}>{p.partner.email}</div>
                      </Td>
                      <Td style={{ fontWeight: 600 }}>{fmtMoney(p.amount, p.currency)}</Td>
                      <Td><StatusBadge $s={p.status}>{p.status}</StatusBadge></Td>
                      <Td style={{ fontSize: 13 }}>
                        <div>{p.bank.bank_name}</div>
                        <div style={{ color: '#6B7C93' }}>{p.bank.account_number}</div>
                        <div style={{ color: '#6B7C93' }}>{p.bank.account_holder}</div>
                      </Td>
                      <Td>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {p.status === 'requested' && (
                            <>
                              <Primary type="button" onClick={() => onApprove(p)}>{t('admin.payouts.action.approve', 'Approve')}</Primary>
                              <Btn type="button" onClick={() => setActionTarget({ payout: p, action: 'mark_paid' })}>{t('admin.payouts.action.markPaid', 'Mark as paid')}</Btn>
                              <Danger type="button" onClick={() => setActionTarget({ payout: p, action: 'reject' })}>{t('admin.payouts.action.reject', 'Reject')}</Danger>
                            </>
                          )}
                          {p.status === 'approved' && (
                            <>
                              <Primary type="button" onClick={() => setActionTarget({ payout: p, action: 'mark_paid' })}>{t('admin.payouts.action.markPaid', 'Mark as paid')}</Primary>
                              <Danger type="button" onClick={() => setActionTarget({ payout: p, action: 'reject' })}>{t('admin.payouts.action.reject', 'Reject')}</Danger>
                            </>
                          )}
                          {p.status === 'paid' && p.transaction_reference && (
                            <span style={{ fontSize: 12, color: '#6B7C93' }}>{t('admin.payouts.refLabel', 'Ref: {{value}}', { value: p.transaction_reference })}</span>
                          )}
                          {p.status === 'rejected' && p.reject_reason && (
                            <span style={{ fontSize: 12, color: '#B91C1C' }}>{p.reject_reason}</span>
                          )}
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </>
      )}

      {tab === 'settings' && settings && (
        <>
          <Card>
            <CardTitle>{t('admin.settings.program.title', 'Program')}</CardTitle>
            <ToggleRow>
              <div>
                <ToggleLabel>{t('admin.settings.program.active', 'Program active')}</ToggleLabel>
                <Hint>{t('admin.settings.program.activeHint', 'When off, no new commissions or first-month discounts will be applied.')}</Hint>
              </div>
              <Switch
                type="button"
                role="switch"
                aria-checked={settings.program_active}
                $on={settings.program_active}
                onClick={() => saveSetting({ program_active: !settings.program_active })}
                disabled={savingSettings}
              />
            </ToggleRow>
          </Card>

          <Card>
            <CardTitle>{t('admin.settings.rates.title', 'Rates')}</CardTitle>
            <ToggleRow>
              <div style={{ flex: 1 }}>
                <ToggleLabel>{t('admin.settings.rates.commission', 'Commission rate (%)')}</ToggleLabel>
                <Hint>{t('admin.settings.rates.commissionHint', 'Applied recurring on every paid POS subscription invoice.')}</Hint>
              </div>
              <Input
                type="number"
                min="0" max="100" step="0.5"
                value={settings.commission_rate}
                onChange={e => setSettings(s => s ? { ...s, commission_rate: parseFloat(e.target.value) || 0 } : s)}
                onBlur={e => saveSetting({ commission_rate: parseFloat(e.target.value) || 0 })}
                style={{ width: 120 }}
              />
            </ToggleRow>
            <ToggleRow>
              <div style={{ flex: 1 }}>
                <ToggleLabel>{t('admin.settings.rates.firstMonth', 'First-month discount (%)')}</ToggleLabel>
                <Hint>{t('admin.settings.rates.firstMonthHint', "One-time discount on the referred user's first POS subscription invoice.")}</Hint>
              </div>
              <Input
                type="number"
                min="0" max="100" step="0.5"
                value={settings.first_month_discount}
                onChange={e => setSettings(s => s ? { ...s, first_month_discount: parseFloat(e.target.value) || 0 } : s)}
                onBlur={e => saveSetting({ first_month_discount: parseFloat(e.target.value) || 0 })}
                style={{ width: 120 }}
              />
            </ToggleRow>
          </Card>

          <Card>
            <CardTitle>{t('admin.settings.minPayout.title', 'Minimum payout per currency')}</CardTitle>
            <Hint style={{ marginBottom: 16 }}>{t('admin.settings.minPayout.hint', 'Below this amount, partners cannot request a payout.')}</Hint>
            {Object.entries(settings.min_payout_amounts).map(([cur, amt]) => (
              <ToggleRow key={cur}>
                <ToggleLabel>{cur}</ToggleLabel>
                <Input
                  type="number"
                  min="0" step="1"
                  value={amt}
                  onChange={e => setSettings(s => s ? {
                    ...s,
                    min_payout_amounts: { ...s.min_payout_amounts, [cur]: parseFloat(e.target.value) || 0 }
                  } : s)}
                  onBlur={e => saveSetting({
                    min_payout_amounts: { ...settings.min_payout_amounts, [cur]: parseFloat(e.target.value) || 0 }
                  })}
                  style={{ width: 140 }}
                />
              </ToggleRow>
            ))}
          </Card>
        </>
      )}

      {actionTarget && (
        <Backdrop onClick={() => !actionSubmitting && setActionTarget(null)}>
          <Dialog onClick={e => e.stopPropagation()}>
            <DialogTitle>
              {actionTarget.action === 'mark_paid'
                ? t('admin.payouts.dialog.markPaidTitle', 'Mark payout as paid')
                : t('admin.payouts.dialog.rejectTitle', 'Reject payout')}
            </DialogTitle>
            <div style={{ marginBottom: 14, fontSize: 14, color: '#0A2540' }}>
              <div><strong>{actionTarget.payout.partner.name}</strong></div>
              <div>{fmtMoney(actionTarget.payout.amount, actionTarget.payout.currency)}</div>
            </div>
            {actionTarget.action === 'mark_paid' && (
              <div style={{ marginBottom: 14 }}>
                <Label>{t('admin.payouts.dialog.transactionRef', 'Transaction reference (optional)')}</Label>
                <Input
                  type="text"
                  value={actionRef}
                  onChange={e => setActionRef(e.target.value)}
                  placeholder={t('admin.payouts.dialog.transactionRefPlaceholder', 'Bank transfer reference')}
                />
              </div>
            )}
            {actionTarget.action === 'reject' && (
              <div style={{ marginBottom: 14 }}>
                <Label>{t('admin.payouts.dialog.reason', 'Reason *')}</Label>
                <Textarea
                  value={actionReason}
                  onChange={e => setActionReason(e.target.value)}
                  placeholder={t('admin.payouts.dialog.reasonPlaceholder', 'Tell the partner why their request was rejected. Their wallet balance will be refunded.')}
                />
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Btn type="button" onClick={() => setActionTarget(null)} disabled={actionSubmitting}>{t('admin.payouts.dialog.cancel', 'Cancel')}</Btn>
              {actionTarget.action === 'mark_paid' ? (
                <Primary type="button" onClick={submitAction} disabled={actionSubmitting}>
                  {actionSubmitting ? t('admin.payouts.dialog.submitting', 'Submitting…') : t('admin.payouts.dialog.confirmPaid', 'Confirm paid')}
                </Primary>
              ) : (
                <Danger type="button" onClick={submitAction} disabled={actionSubmitting || !actionReason.trim()}>
                  {actionSubmitting ? t('admin.payouts.dialog.submitting', 'Submitting…') : t('admin.payouts.dialog.rejectRefund', 'Reject + refund')}
                </Danger>
              )}
            </div>
          </Dialog>
        </Backdrop>
      )}

      {partnerDetail !== null && (
        <Backdrop onClick={() => setPartnerDetail(null)}>
          <Dialog
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: 720, maxHeight: '85vh', overflowY: 'auto' }}
          >
            {loadingDetail || !partnerDetail.partner ? (
              <Empty>{t('common.loading', 'Loading…')}</Empty>
            ) : (
              <>
                <DialogTitle>{partnerDetail.partner.name}</DialogTitle>
                <div style={{ fontSize: 13, color: '#6B7C93', marginTop: -10, marginBottom: 16 }}>
                  <code style={{ color: '#635BFF', fontWeight: 600 }}>{partnerDetail.partner.referral_code}</code>
                  {' · '}{partnerDetail.partner.email}
                  {partnerDetail.partner.phone ? ` · ${partnerDetail.partner.phone}` : ''}
                  {' · '}{partnerDetail.partner.role}
                  {' · '}{t('admin.partners.detail.joined', 'Joined')} {fmtDate(partnerDetail.partner.joined_at)}
                </div>

                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', margin: '20px 0 12px', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                  {t('admin.partners.detail.referrals', 'Referred users')} ({partnerDetail.referrals.length})
                </h3>
                {partnerDetail.referrals.length === 0 ? (
                  <Empty>{t('admin.partners.detail.referralsEmpty', 'No referred users yet.')}</Empty>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <Th>{t('admin.partners.col.name', 'Name')}</Th>
                        <Th>{t('admin.partners.col.role', 'Role')}</Th>
                        <Th>{t('admin.partners.detail.signedUp', 'Signed up')}</Th>
                        <Th>{t('admin.partners.detail.subStatus', 'Subscription')}</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerDetail.referrals.map(r => (
                        <tr key={r.id}>
                          <Td>{r.name}</Td>
                          <Td>{displayRole(r.role)}</Td>
                          <Td>{fmtDate(r.signed_up_at)}</Td>
                          <Td>{r.subscription_status || '—'}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', margin: '24px 0 12px', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                  {t('admin.partners.detail.wallets', 'Wallets')}
                </h3>
                {partnerDetail.wallets.length === 0 ? (
                  <Empty>{t('admin.partners.detail.walletsEmpty', 'No wallet activity.')}</Empty>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <Th>{t('admin.partners.detail.currency', 'Currency')}</Th>
                        <Th>{t('admin.partners.detail.balance', 'Balance')}</Th>
                        <Th>{t('wallet.stats.totalEarned', 'Total earned')}</Th>
                        <Th>{t('wallet.stats.totalWithdrawn', 'Total withdrawn')}</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerDetail.wallets.map(w => (
                        <tr key={w.currency}>
                          <Td>{w.currency}</Td>
                          <Td>{fmtMoney(w.balance, w.currency)}</Td>
                          <Td>{fmtMoney(w.total_earned, w.currency)}</Td>
                          <Td>{fmtMoney(w.total_withdrawn, w.currency)}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', margin: '24px 0 12px', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                  {t('admin.partners.detail.recentCommissions', 'Recent commissions')}
                  {' '}({partnerDetail.commissions.length})
                </h3>
                {partnerDetail.commissions.length === 0 ? (
                  <Empty>{t('admin.partners.detail.commissionsEmpty', 'No commissions yet.')}</Empty>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <Th>{t('wallet.tx.col.date', 'Date')}</Th>
                        <Th>{t('admin.partners.detail.invoice', 'Invoice')}</Th>
                        <Th>{t('wallet.tx.col.amount', 'Amount')}</Th>
                        <Th>{t('admin.partners.col.status', 'Status')}</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerDetail.commissions.slice(0, 20).map(c => (
                        <tr key={c.id}>
                          <Td>{fmtDate(c.created_at)}</Td>
                          <Td>#{c.invoice_id}</Td>
                          <Td>{fmtMoney(c.amount, c.currency)}</Td>
                          <Td>{c.status}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', margin: '24px 0 12px', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                  {t('admin.partners.detail.recentPayouts', 'Recent payouts')}
                  {' '}({partnerDetail.payouts.length})
                </h3>
                {partnerDetail.payouts.length === 0 ? (
                  <Empty>{t('admin.partners.detail.payoutsEmpty', 'No payouts yet.')}</Empty>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <Th>{t('wallet.tx.col.date', 'Date')}</Th>
                        <Th>{t('wallet.tx.col.amount', 'Amount')}</Th>
                        <Th>{t('admin.partners.col.status', 'Status')}</Th>
                        <Th>{t('admin.partners.detail.completedAt', 'Completed')}</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerDetail.payouts.slice(0, 20).map(p => (
                        <tr key={p.id}>
                          <Td>{fmtDate(p.created_at)}</Td>
                          <Td>{fmtMoney(p.amount, p.currency)}</Td>
                          <Td>{p.status}</Td>
                          <Td>{p.paid_at ? fmtDate(p.paid_at) : '—'}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                  <Btn type="button" onClick={() => setPartnerDetail(null)}>
                    {t('admin.partners.detail.close', 'Close')}
                  </Btn>
                </div>
              </>
            )}
          </Dialog>
        </Backdrop>
      )}
    </Page>
    </>
  );
};

export default ReferralManagementPage;
