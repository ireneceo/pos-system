import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getCurrencySymbol } from '../../utils/currency';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { useSiteTimezone } from '../../hooks/useSiteTimezone';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';

interface WalletRow {
  currency: string;
  balance: number;
  total_earned: number;
  total_withdrawn: number;
  total_credited: number;
}

interface WalletTx {
  id: number;
  created_at: string;
  type: 'commission' | 'credit_used' | 'payout' | 'adjustment';
  amount: number;
  balance_after: number;
  currency: string;
  description?: string;
}

interface PayoutRow {
  id: number;
  amount: number;
  currency: string;
  status: 'requested' | 'approved' | 'paid' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
  paid_at: string | null;
  reject_reason: string | null;
}

interface Profile {
  bank_name?: string | null;
  bank_account_number?: string | null;
  bank_account_holder?: string | null;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const Block = styled.section`
  background: white;
  border: 1px solid #C7CED6;
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

const WalletCard = styled.div`
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 24px;
  background: #F9FAFB;
  margin-bottom: 12px;
`;

const Currency = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const Balance = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #0A2540;
  letter-spacing: -0.6px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  font-size: 13px;
  color: #4B5563;

  strong {
    display: block;
    color: #0A2540;
    font-weight: 600;
    font-size: 14px;
    margin-top: 2px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 18px;
`;

const Btn = styled.button`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  &:hover { background: #F5F7FA; border-color: #C9CFD9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const Primary = styled(Btn)`
  background: #635BFF;
  border-color: #635BFF;
  color: white;
  &:hover:not(:disabled) { background: #5A51E6; border-color: #5A51E6; }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  background: ${p => (p.$active ? '#635BFF' : 'white')};
  color: ${p => (p.$active ? 'white' : '#4B5563')};
  border: 1px solid ${p => (p.$active ? '#635BFF' : '#C7CED6')};
  border-radius: 16px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
`;

const Empty = styled.div`
  padding: 36px 20px;
  text-align: center;
  color: #4B5563;
  font-size: 14px;
  background: #F9FAFB;
  border: 1px dashed #C7CED6;
  border-radius: 8px;
`;

const TypeBadge = styled.span<{ $type: WalletTx['type'] }>`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 16px;
  background: ${p => ({
    commission: '#ECFDF5',
    credit_used: '#EFF6FF',
    payout: '#F5F7FA',
    adjustment: '#FFF7ED'
  })[p.$type]};
  color: ${p => ({
    commission: '#059669',
    credit_used: '#2563EB',
    payout: '#4B5563',
    adjustment: '#C2410C'
  })[p.$type]};
`;

const StatusBadge = styled.span<{ $s: PayoutRow['status'] }>`
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
  })[p.$s]};
  color: ${p => ({
    requested: '#A16207',
    approved: '#1D4ED8',
    paid: '#059669',
    rejected: '#B91C1C'
  })[p.$s]};
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
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    padding: 22px 20px;
  }
`;

const DialogTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 18px;
`;

const FormRow = styled.div`
  margin-bottom: 14px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
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
  border: 1px solid #C7CED6;
  border-radius: 8px;
  outline: none;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const ErrorBox = styled.div`
  font-size: 13px;
  color: #DC2626;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 14px;
`;

function formatMoney(amount: number, currency: string) {
  if (currency === 'KRW' || currency === 'JPY' || currency === 'VND') {
    return `${getCurrencySymbol(currency)} ${Math.round(amount).toLocaleString()}`;
  }
  return `${getCurrencySymbol(currency)} ${amount.toFixed(2)}`;
}

function formatDateTime(iso: string | null, tz: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-MY', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: tz
  });
}

const ReferralWalletPage: React.FC = () => {
  const { t } = useTranslation('referrals');
  const tz = useSiteTimezone();
  const TYPE_FILTERS: Array<{ key: string; label: string }> = useMemo(() => [
    { key: 'all', label: t('wallet.filter.all', 'All') },
    { key: 'commission', label: t('wallet.filter.commissions', 'Commissions') },
    { key: 'payout', label: t('wallet.filter.payouts', 'Payouts') }
  ], [t]);
  const [wallets, setWallets] = useState<WalletRow[] | null>(null);
  const [transactions, setTransactions] = useState<WalletTx[] | null>(null);
  const [payouts, setPayouts] = useState<PayoutRow[] | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Payout modal state
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [payoutWallet, setPayoutWallet] = useState<WalletRow | null>(null);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutBank, setPayoutBank] = useState({ bank_name: '', bank_account_number: '', bank_account_holder: '' });
  const [payoutErr, setPayoutErr] = useState<string | null>(null);
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      const headers = { Authorization: `Bearer ${token}` };
      const [w, txr, p, pr] = await Promise.all([
        fetch('/api/referrals/wallet', { headers }),
        fetch('/api/referrals/wallet/transactions', { headers }),
        fetch('/api/referrals/payouts', { headers }),
        fetch('/api/referrals/profile', { headers })
      ]);
      if (!w.ok) throw new Error(t('common.failedToLoad', 'Failed to load'));
      const wj = await w.json();
      const tj = txr.ok ? await txr.json() : { data: { transactions: [] } };
      const pj = p.ok ? await p.json() : { data: { payouts: [] } };
      const prj = pr.ok ? await pr.json() : { data: {} };
      setWallets(Array.isArray(wj?.data) ? wj.data : []);
      setTransactions(Array.isArray(tj?.data?.transactions) ? tj.data.transactions : []);
      setPayouts(Array.isArray(pj?.data?.payouts) ? pj.data.payouts : []);
      setProfile(prj?.data || {});
    } catch (e) {
      setError(e instanceof Error ? e.message : t('common.failedToLoad', 'Failed to load'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const openPayout = (w: WalletRow) => {
    setPayoutWallet(w);
    setPayoutAmount(String(w.balance));
    setPayoutBank({
      bank_name: profile?.bank_name || '',
      bank_account_number: profile?.bank_account_number || '',
      bank_account_holder: profile?.bank_account_holder || ''
    });
    setPayoutErr(null);
    setPayoutOpen(true);
  };

  const submitPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutWallet) return;
    setPayoutErr(null);
    const amt = parseFloat(payoutAmount);
    if (!(amt > 0) || amt > payoutWallet.balance) {
      setPayoutErr(t('wallet.payoutDialog.error.amount', 'Enter a valid amount up to your available balance.'));
      return;
    }
    if (!payoutBank.bank_name || !payoutBank.bank_account_number || !payoutBank.bank_account_holder) {
      setPayoutErr(t('wallet.payoutDialog.error.bank', 'Bank information is required.'));
      return;
    }
    setPayoutSubmitting(true);
    try {
      const res = await fetch('/api/referrals/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({
          currency: payoutWallet.currency,
          amount: amt,
          ...payoutBank
        })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPayoutErr(body?.message || t('wallet.payoutDialog.error.failed', 'Payout request failed.'));
        return;
      }
      setPayoutOpen(false);
      reload();
    } catch (e) {
      setPayoutErr(e instanceof Error ? e.message : t('wallet.payoutDialog.error.failed', 'Payout request failed.'));
    } finally {
      setPayoutSubmitting(false);
    }
  };

  const filteredTx = useMemo(() => {
    if (!transactions) return [];
    if (filter === 'all') return transactions;
    return transactions.filter(tx => tx.type === filter);
  }, [transactions, filter]);

  return (
    <>
      <Header><PageTitle>{t('wallet.title', 'My wallet')}</PageTitle></Header>

      <Block>
        <BlockTitle>{t('wallet.balance.title', 'Available balance')}</BlockTitle>
        {loading && !wallets && <Empty>{t('common.loading', 'Loading…')}</Empty>}
        {error && <ErrorBox>{error}</ErrorBox>}
        {wallets && wallets.length === 0 && (
          <Empty>{t('wallet.balance.empty', "You haven't earned any commission yet. Refer your first business to start.")}</Empty>
        )}
        {(wallets || []).map(w => (
          <WalletCard key={w.currency}>
            <Currency>{getCurrencySymbol(w.currency)}</Currency>
            <Balance>{formatMoney(w.balance, w.currency)}</Balance>
            <StatsRow>
              <StatItem>{t('wallet.stats.totalEarned', 'Total earned')}<strong>{formatMoney(w.total_earned, w.currency)}</strong></StatItem>
              <StatItem>{t('wallet.stats.totalWithdrawn', 'Total withdrawn')}<strong>{formatMoney(w.total_withdrawn, w.currency)}</strong></StatItem>
            </StatsRow>
            <Actions>
              <Primary onClick={() => openPayout(w)} disabled={w.balance <= 0}>
                {t('wallet.requestPayout', 'Request payout')}
              </Primary>
            </Actions>
          </WalletCard>
        ))}
      </Block>

      <Block>
        <BlockTitle>{t('wallet.tx.title', 'Transaction history')}</BlockTitle>
        <FilterBar>
          {TYPE_FILTERS.map(f => (
            <FilterChip key={f.key} $active={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </FilterChip>
          ))}
        </FilterBar>
        {filteredTx.length === 0 ? (
          <DataTableEmpty>{t('wallet.tx.empty', 'No transactions to show.')}</DataTableEmpty>
        ) : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('wallet.tx.col.date', 'Date')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('wallet.tx.col.type', 'Type')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('wallet.tx.col.description', 'Description')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('wallet.tx.col.amount', 'Amount')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('wallet.tx.col.balance', 'Balance')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {filteredTx.map(tx => (
                <DataTableRow key={tx.id}>
                  <DataTableCell data-label={t('wallet.tx.col.date', 'Date')}>{formatDateTime(tx.created_at, tz)}</DataTableCell>
                  <DataTableCell data-label={t('wallet.tx.col.type', 'Type')}><TypeBadge $type={tx.type}>{tx.type.replace('_', ' ')}</TypeBadge></DataTableCell>
                  <DataTableCell data-label={t('wallet.tx.col.description', 'Description')}>{tx.description || '—'}</DataTableCell>
                  <DataTableCell data-label={t('wallet.tx.col.amount', 'Amount')} style={{ color: tx.amount >= 0 ? '#059669' : '#DC2626' }}>
                    {tx.amount >= 0 ? '+ ' : '- '}{formatMoney(Math.abs(tx.amount), tx.currency)}
                  </DataTableCell>
                  <DataTableCell data-label={t('wallet.tx.col.balance', 'Balance')}>{formatMoney(tx.balance_after, tx.currency)}</DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </Block>

      <Block>
        <BlockTitle>{t('wallet.payouts.title', 'Payout history')}</BlockTitle>
        {(payouts || []).length === 0 ? (
          <DataTableEmpty>{t('wallet.payouts.empty', 'No payouts yet.')}</DataTableEmpty>
        ) : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('wallet.payouts.col.requested', 'Requested')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('wallet.payouts.col.amount', 'Amount')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('wallet.payouts.col.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('wallet.payouts.col.completed', 'Completed')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('wallet.payouts.col.note', 'Note')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {(payouts || []).map(p => (
                <DataTableRow key={p.id}>
                  <DataTableCell data-label={t('wallet.payouts.col.requested', 'Requested')}>{formatDateTime(p.created_at, tz)}</DataTableCell>
                  <DataTableCell data-label={t('wallet.payouts.col.amount', 'Amount')}>{formatMoney(p.amount, p.currency)}</DataTableCell>
                  <DataTableCell data-label={t('wallet.payouts.col.status', 'Status')}><StatusBadge $s={p.status}>{p.status}</StatusBadge></DataTableCell>
                  <DataTableCell data-label={t('wallet.payouts.col.completed', 'Completed')}>{formatDateTime(p.paid_at, tz)}</DataTableCell>
                  <DataTableCell data-label={t('wallet.payouts.col.note', 'Note')}>{p.reject_reason || '—'}</DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </Block>

      {payoutOpen && payoutWallet && (
        <Backdrop onClick={() => !payoutSubmitting && setPayoutOpen(false)}>
          <Dialog onClick={e => e.stopPropagation()}>
            <DialogTitle>{t('wallet.payoutDialog.title', 'Request payout')}</DialogTitle>
            {payoutErr && <ErrorBox>{payoutErr}</ErrorBox>}
            <form onSubmit={submitPayout} noValidate>
              <FormRow>
                <Label>{t('wallet.payoutDialog.availableBalance', 'Available balance')}</Label>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#0A2540' }}>
                  {formatMoney(payoutWallet.balance, payoutWallet.currency)}
                </div>
              </FormRow>
              <FormRow>
                <Label htmlFor="po-amount">{t('wallet.payoutDialog.amount', 'Payout amount ({{currency}})', { currency: getCurrencySymbol(payoutWallet.currency) })}</Label>
                <Input
                  id="po-amount"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  max={payoutWallet.balance}
                  value={payoutAmount}
                  onChange={e => setPayoutAmount(e.target.value)}
                  required
                />
              </FormRow>
              <FormRow>
                <Label htmlFor="po-bank">{t('wallet.payoutDialog.bankName', 'Bank name')}</Label>
                <Input id="po-bank" type="text" value={payoutBank.bank_name}
                       onChange={e => setPayoutBank(b => ({ ...b, bank_name: e.target.value }))} required />
              </FormRow>
              <FormRow>
                <Label htmlFor="po-acc">{t('wallet.payoutDialog.accountNumber', 'Account number')}</Label>
                <Input id="po-acc" type="text" value={payoutBank.bank_account_number}
                       onChange={e => setPayoutBank(b => ({ ...b, bank_account_number: e.target.value }))} required />
              </FormRow>
              <FormRow>
                <Label htmlFor="po-holder">{t('wallet.payoutDialog.accountHolder', 'Account holder')}</Label>
                <Input id="po-holder" type="text" value={payoutBank.bank_account_holder}
                       onChange={e => setPayoutBank(b => ({ ...b, bank_account_holder: e.target.value }))} required />
              </FormRow>
              <Actions style={{ justifyContent: 'flex-end' }}>
                <Btn type="button" onClick={() => setPayoutOpen(false)} disabled={payoutSubmitting}>{t('wallet.payoutDialog.cancel', 'Cancel')}</Btn>
                <Primary type="submit" disabled={payoutSubmitting}>
                  {payoutSubmitting ? t('wallet.payoutDialog.submitting', 'Submitting…') : t('wallet.payoutDialog.submit', 'Request payout')}
                </Primary>
              </Actions>
            </form>
          </Dialog>
        </Backdrop>
      )}
    </>
  );
};

export default ReferralWalletPage;
