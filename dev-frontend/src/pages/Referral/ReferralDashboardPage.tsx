import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { useSiteTimezone } from '../../hooks/useSiteTimezone';

interface WalletRow {
  currency: string;
  balance: number;
  total_earned: number;
  total_withdrawn: number;
  total_credited: number;
}

interface RecentCommission {
  id: number;
  created_at: string;
  amount: number;
  currency: string;
  invoice_number?: string;
  referred_name?: string;
}

interface DashboardData {
  referral_code: string;
  wallets: WalletRow[];
  stats: {
    commissions_total: Record<string, number>;
    commissions_mtd: Record<string, number>;
    clicks_total: number;
    clicks_mtd: number;
    signups_total: number;
    signups_mtd: number;
  };
  recent_commissions: RecentCommission[];
}

interface ReferralRow {
  id: number;
  name: string;
  business_name: string | null;
  status: 'Active' | 'Inactive';
  signed_up_at: string;
  commissions: Record<string, number>;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 8px;
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const Subtle = styled.span`
  font-size: 13px;
  color: #6B7C93;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const BalanceCard = styled.div`
  background: linear-gradient(120deg, #635BFF 0%, #8775FF 100%);
  color: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BalanceLabel = styled.div`
  font-size: 12px;
  opacity: 0.85;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

const BalanceValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const BalanceSub = styled.div`
  font-size: 13px;
  opacity: 0.85;
`;

const MtdCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 18px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

const StatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin-top: 6px;
  letter-spacing: -0.3px;
`;

const StatDelta = styled.div`
  font-size: 12px;
  color: #059669;
  margin-top: 4px;
`;

const Block = styled.section`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
`;

const BlockTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 14px;
`;

const CodeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #FAFBFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  margin-bottom: 10px;
  gap: 12px;
  flex-wrap: wrap;
`;

const CodeText = styled.div`
  font-family: 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
  letter-spacing: 0.5px;
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
  transition: background 0.15s, border-color 0.15s;

  &:hover { background: #F5F7FA; border-color: #C9CFD9; }
`;

const PrimaryBtn = styled(Btn)`
  background: #635BFF;
  border-color: #635BFF;
  color: white;
  &:hover { background: #5A51E6; border-color: #5A51E6; }
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
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 10px 8px;
  border-bottom: 1px solid #E6EBF1;
`;

const Td = styled.td`
  padding: 12px 8px;
  border-bottom: 1px solid #F1F4F8;
  color: #0A2540;
  vertical-align: middle;
`;

const Pill = styled.span<{ $active?: boolean }>`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 16px;
  background: ${p => (p.$active ? '#ECFDF5' : '#F5F7FA')};
  color: ${p => (p.$active ? '#059669' : '#6B7C93')};
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

const Skeleton = styled.div`
  height: 16px;
  background: linear-gradient(90deg, #F1F4F8 0%, #E6EBF1 50%, #F1F4F8 100%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 4px;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

function formatMoney(amount: number, currency: string) {
  if (currency === 'KRW' || currency === 'JPY' || currency === 'VND') {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
  return `${currency} ${amount.toFixed(2)}`;
}

function formatDate(iso: string, tz: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-MY', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: tz
  });
}

function getShareUrl(code: string) {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/signup?ref=${code}`;
}

const ReferralDashboardPage: React.FC = () => {
  const { t } = useTranslation('referrals');
  const tz = useSiteTimezone();
  const [data, setData] = useState<DashboardData | null>(null);
  const [referrals, setReferrals] = useState<ReferralRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      const headers = { Authorization: `Bearer ${token}` };
      const [dashRes, refRes] = await Promise.all([
        fetch('/api/referrals/dashboard', { headers }),
        fetch('/api/referrals/referrals', { headers })
      ]);
      if (!dashRes.ok) throw new Error(t('common.failedToLoad', 'Failed to load'));
      const dash = await dashRes.json();
      const refs = refRes.ok ? await refRes.json() : { data: { referrals: [] } };
      setData(dash.data || null);
      setReferrals(Array.isArray(refs?.data?.referrals) ? refs.data.referrals : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : t('common.failedToLoad', 'Failed to load'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const copy = async (kind: 'code' | 'link', text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1500);
    } catch { /* ignore */ }
  };

  const share = async () => {
    if (!data) return;
    const url = getShareUrl(data.referral_code);
    const text = t('dashboard.share.text', 'Join Purple POS with my code {{code}} and get 20% off your first month.', { code: data.referral_code });
    if (typeof navigator !== 'undefined' && (navigator as { share?: (data: { title?: string; text?: string; url?: string }) => Promise<void> }).share) {
      try {
        await (navigator as { share: (data: { title?: string; text?: string; url?: string }) => Promise<void> })
          .share({ title: t('dashboard.share.title', 'Purple POS'), text, url });
        return;
      } catch { /* user cancelled or unsupported */ }
    }
    copy('link', url);
  };

  if (loading && !data) {
    return (
      <>
        <Header><PageTitle>{t('dashboard.title', 'Dashboard')}</PageTitle></Header>
        <StatGrid>
          {[0, 1, 2, 3].map(i => (
            <StatCard key={i}><Skeleton /><div style={{ height: 12 }} /><Skeleton style={{ width: '60%' }} /></StatCard>
          ))}
        </StatGrid>
        <Block><Skeleton style={{ height: 24, width: '40%' }} /></Block>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header><PageTitle>{t('dashboard.title', 'Dashboard')}</PageTitle></Header>
        <Block>
          <Empty>{error} — <Btn onClick={load}>{t('common.retry', 'Retry')}</Btn></Empty>
        </Block>
      </>
    );
  }

  if (!data) return null;

  const wallet0 = data.wallets[0];
  const mtdEntries = Object.entries(data.stats.commissions_mtd || {});
  const totalEntries = Object.entries(data.stats.commissions_total || {});

  return (
    <>
      <Header>
        <PageTitle>{t('dashboard.title', 'Dashboard')}</PageTitle>
        <Subtle>{t('dashboard.welcomeBack', 'Welcome back!')}</Subtle>
      </Header>

      <TopGrid>
        <BalanceCard>
          <BalanceLabel>{t('dashboard.balance.available', 'Available balance')}</BalanceLabel>
          {data.wallets.length === 0 && (
            <>
              <BalanceValue>—</BalanceValue>
              <BalanceSub>{t('dashboard.balance.startEarning', 'Start earning by sharing your code below.')}</BalanceSub>
            </>
          )}
          {data.wallets.map(w => (
            <div key={w.currency} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <BalanceValue>{formatMoney(w.balance, w.currency)}</BalanceValue>
              <BalanceSub>{t('dashboard.balance.totalEarned', 'Total earned: {{value}}', { value: formatMoney(w.total_earned, w.currency) })}</BalanceSub>
            </div>
          ))}
        </BalanceCard>
        <MtdCard>
          <StatLabel>{t('dashboard.mtd.thisMonth', 'This month')}</StatLabel>
          {mtdEntries.length === 0 && <StatValue style={{ fontSize: 18 }}>{t('dashboard.mtd.noCommissions', 'No commissions yet')}</StatValue>}
          {mtdEntries.map(([cur, amt]) => (
            <StatValue key={cur} style={{ fontSize: 22 }}>+ {formatMoney(amt as number, cur)}</StatValue>
          ))}
          <Subtle>{t('dashboard.mtd.totalToDate', 'Total to date: {{value}}', { value: totalEntries.length === 0 ? '—' : totalEntries.map(([c, a]) => formatMoney(a as number, c)).join(' · ') })}</Subtle>
        </MtdCard>
      </TopGrid>

      <StatGrid>
        <StatCard>
          <StatLabel>{t('dashboard.kpi.clicks', 'Clicks')}</StatLabel>
          <StatValue>{data.stats.clicks_total}</StatValue>
          <StatDelta>{t('dashboard.kpi.thisMonthDelta', '+{{count}} this month', { count: data.stats.clicks_mtd })}</StatDelta>
        </StatCard>
        <StatCard>
          <StatLabel>{t('dashboard.kpi.signups', 'Sign-ups')}</StatLabel>
          <StatValue>{data.stats.signups_total}</StatValue>
          <StatDelta>{t('dashboard.kpi.thisMonthDelta', '+{{count}} this month', { count: data.stats.signups_mtd })}</StatDelta>
        </StatCard>
        <StatCard>
          <StatLabel>{t('dashboard.kpi.active', 'Active')}</StatLabel>
          <StatValue>{(referrals || []).filter(r => r.status === 'Active').length}</StatValue>
          <StatDelta>{t('dashboard.kpi.activeOf', 'of {{total}} total', { total: (referrals || []).length })}</StatDelta>
        </StatCard>
        <StatCard>
          <StatLabel>{t('dashboard.kpi.totalEarned', 'Total earned')}</StatLabel>
          <StatValue style={{ fontSize: 18 }}>
            {totalEntries.length === 0 ? '—' : totalEntries.map(([c, a]) => formatMoney(a as number, c)).join(', ')}
          </StatValue>
        </StatCard>
      </StatGrid>

      <Block>
        <BlockTitle>{t('dashboard.code.title', 'My referral code')}</BlockTitle>
        <CodeRow>
          <CodeText>{data.referral_code}</CodeText>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn onClick={() => copy('code', data.referral_code)}>
              {copied === 'code' ? t('common.copied', 'Copied!') : t('dashboard.code.copyCode', 'Copy code')}
            </Btn>
          </div>
        </CodeRow>
        <CodeRow>
          <span style={{ fontSize: 14, color: '#0A2540' }}>{getShareUrl(data.referral_code)}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn onClick={() => copy('link', getShareUrl(data.referral_code))}>
              {copied === 'link' ? t('common.copied', 'Copied!') : t('dashboard.code.copyLink', 'Copy link')}
            </Btn>
            <PrimaryBtn onClick={share}>{t('dashboard.code.share', 'Share')}</PrimaryBtn>
          </div>
        </CodeRow>
      </Block>

      <Block>
        <BlockTitle>{t('dashboard.referrals.title', 'My referrals')}</BlockTitle>
        {(referrals || []).length === 0 ? (
          <Empty>
            {t('dashboard.referrals.empty', 'No referrals yet — share your code to start earning.')}
          </Empty>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>{t('dashboard.referrals.col.business', 'Business')}</Th>
                <Th>{t('dashboard.referrals.col.status', 'Status')}</Th>
                <Th>{t('dashboard.referrals.col.signedUp', 'Signed up')}</Th>
                <Th>{t('dashboard.referrals.col.commission', 'Commission')}</Th>
              </tr>
            </thead>
            <tbody>
              {(referrals || []).map(r => (
                <tr key={r.id}>
                  <Td>{r.business_name || r.name}</Td>
                  <Td><Pill $active={r.status === 'Active'}>{r.status}</Pill></Td>
                  <Td>{formatDate(r.signed_up_at, tz)}</Td>
                  <Td>
                    {Object.keys(r.commissions || {}).length === 0
                      ? <Subtle>—</Subtle>
                      : Object.entries(r.commissions).map(([c, a]) => formatMoney(a, c)).join(', ')}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Block>

      <Block>
        <BlockTitle>{t('dashboard.recent.title', 'Recent commissions')}</BlockTitle>
        {data.recent_commissions.length === 0 ? (
          <Empty>{t('dashboard.recent.empty', 'No commission yet. Refer your first business to get started.')}</Empty>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>{t('dashboard.recent.col.date', 'Date')}</Th>
                  <Th>{t('dashboard.recent.col.from', 'From')}</Th>
                  <Th>{t('dashboard.recent.col.invoice', 'Invoice')}</Th>
                  <Th>{t('dashboard.recent.col.amount', 'Amount')}</Th>
                </tr>
              </thead>
              <tbody>
                {data.recent_commissions.map(c => (
                  <tr key={c.id}>
                    <Td>{formatDate(c.created_at, tz)}</Td>
                    <Td>{c.referred_name || '—'}</Td>
                    <Td><Subtle>{c.invoice_number || '—'}</Subtle></Td>
                    <Td>+ {formatMoney(c.amount, c.currency)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <Link to="/referral/wallet" style={{ color: '#635BFF', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
                {t('dashboard.viewAllInWallet', 'View all in wallet →')}
              </Link>
            </div>
          </>
        )}
      </Block>
    </>
  );
};

export default ReferralDashboardPage;
