import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

/**
 * Apply Referral Credit modal — pulls partner's wallet balance, lets them
 * apply a portion (or all) of it to an outstanding invoice. Caller is
 * responsible for refreshing the invoice list on success.
 *
 * Currency match is enforced server-side (and again here defensively): you
 * can only spend a wallet in the same currency as the invoice.
 */

interface InvoiceLite {
  id: number;
  invoice_number?: string | null;
  total_amount: number | string;
  paid_amount?: number | string | null;
  currency?: string | null;
  status?: string | null;
}

interface WalletRow {
  currency: string;
  balance: number;
  total_earned: number;
  total_withdrawn: number;
  total_credited: number;
}

interface Props {
  invoice: InvoiceLite;
  onClose: () => void;
  onApplied: (result: { applied: number; remaining: number; fully_paid: boolean }) => void;
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 37, 64, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 6px;
`;

const Sub = styled.p`
  font-size: 13px;
  color: #4B5563;
  margin: 0 0 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 0;
  border-bottom: 1px solid #F1F4F8;
  font-size: 14px;

  &:last-of-type { border-bottom: none; }
`;

const RowLabel = styled.span`
  color: #4B5563;
`;

const RowValue = styled.span<{ $emphasis?: boolean }>`
  color: #0A2540;
  font-weight: ${p => (p.$emphasis ? 600 : 500)};
`;

const Field = styled.div`
  margin: 16px 0;
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
  height: 44px;
  padding: 0 14px;
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  outline: none;
  &:focus { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const Hint = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 6px;
`;

const Preview = styled.div`
  margin-top: 18px;
  padding: 14px 16px;
  background: #F1F0FF;
  border-radius: 8px;
  font-size: 13px;
  color: #0A2540;
  line-height: 1.6;

  strong {
    color: #635BFF;
    font-weight: 600;
  }
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

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Btn = styled.button`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 14px;
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

const Empty = styled.div`
  padding: 24px 20px;
  text-align: center;
  color: #4B5563;
  font-size: 14px;
  background: #F9FAFB;
  border: 1px dashed #C7CED6;
  border-radius: 8px;
`;

function fmtMoney(amount: number, currency: string) {
  if (currency === 'KRW' || currency === 'JPY' || currency === 'VND') {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
  return `${currency} ${amount.toFixed(2)}`;
}

const ApplyCreditModal: React.FC<Props> = ({ invoice, onClose, onApplied }) => {
  const { t } = useTranslation('referrals');
  const currency = (invoice.currency || 'MYR').toUpperCase();
  const total = parseFloat(String(invoice.total_amount)) || 0;
  const already = parseFloat(String(invoice.paid_amount || 0)) || 0;
  const remaining = Math.max(0, total - already);

  const [wallet, setWallet] = useState<WalletRow | null | 'none'>(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/referrals/wallet', {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    })
      .then(r => (r.ok ? r.json() : null))
      .then(b => {
        const list = (b?.data || []) as WalletRow[];
        const match = list.find(w => w.currency === currency);
        if (match && match.balance > 0) {
          setWallet(match);
          // Default amount = whichever is smaller (remaining vs balance)
          const initial = Math.min(remaining, match.balance);
          setAmount(initial.toFixed(currency === 'KRW' || currency === 'JPY' || currency === 'VND' ? 0 : 2));
        } else {
          setWallet('none');
        }
      })
      .catch(() => setWallet('none'));
  }, [currency, remaining]);

  const apply = parseFloat(amount) || 0;
  const preview = useMemo(() => {
    if (wallet === null || wallet === 'none') return null;
    const max = Math.min(remaining, wallet.balance);
    const valid = apply > 0 && apply <= max;
    return {
      max,
      valid,
      newInvoiceRemaining: Math.max(0, remaining - apply),
      newWalletBalance: Math.max(0, wallet.balance - apply)
    };
  }, [wallet, apply, remaining]);

  const submit = async () => {
    if (!preview?.valid) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/referrals/wallet/apply-credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ invoice_id: invoice.id, amount: apply })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body?.message || t('applyCredit.error.failed', 'Apply credit failed.'));
        return;
      }
      onApplied({
        applied: body.data?.applied ?? apply,
        remaining: body.data?.remaining ?? preview.newInvoiceRemaining,
        fully_paid: !!body.data?.fully_paid
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : t('applyCredit.error.failed', 'Apply credit failed.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Backdrop onClick={() => !submitting && onClose()}>
      <Dialog onClick={e => e.stopPropagation()}>
        <Title>{t('applyCredit.title', 'Apply referral credit')}</Title>
        <Sub>{t('applyCredit.subtitle', 'Use your wallet balance to pay this invoice.')}</Sub>

        {error && <ErrorBox>{error}</ErrorBox>}

        <Row>
          <RowLabel>{t('applyCredit.row.invoice', 'Invoice')}</RowLabel>
          <RowValue>{invoice.invoice_number || `#${invoice.id}`}</RowValue>
        </Row>
        <Row>
          <RowLabel>{t('applyCredit.row.total', 'Total')}</RowLabel>
          <RowValue>{fmtMoney(total, currency)}</RowValue>
        </Row>
        <Row>
          <RowLabel>{t('applyCredit.row.alreadyPaid', 'Already paid')}</RowLabel>
          <RowValue>{fmtMoney(already, currency)}</RowValue>
        </Row>
        <Row>
          <RowLabel>{t('applyCredit.row.remaining', 'Remaining')}</RowLabel>
          <RowValue $emphasis>{fmtMoney(remaining, currency)}</RowValue>
        </Row>

        {wallet === null && <Empty>{t('applyCredit.loadingWallet', 'Loading wallet…')}</Empty>}
        {wallet === 'none' && (
          <Empty>
            {t('applyCredit.noBalance', "You don't have any {{currency}} balance to apply.", { currency })}
            <br />
            <span style={{ fontSize: 12 }}>{t('applyCredit.noBalanceHint', 'Earn commissions by referring new POS users.')}</span>
          </Empty>
        )}

        {wallet && wallet !== 'none' && (
          <>
            <Row>
              <RowLabel>{t('applyCredit.row.walletBalance', 'Wallet balance')}</RowLabel>
              <RowValue $emphasis>{fmtMoney(wallet.balance, currency)}</RowValue>
            </Row>

            <Field>
              <Label htmlFor="ac-amount">{t('applyCredit.amountLabel', 'Amount to apply')}</Label>
              <Input
                id="ac-amount"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                max={preview?.max || 0}
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <Hint>{t('applyCredit.maxHint', 'Maximum: {{value}}', { value: preview ? fmtMoney(preview.max, currency) : '' })}</Hint>
            </Field>

            {preview?.valid && (
              <Preview>
                {t('applyCredit.preview.afterApplying', 'After applying')} <strong>{fmtMoney(apply, currency)}</strong>:
                <br />
                {t('applyCredit.preview.invoiceRemaining', 'Invoice remaining:')} <strong>{fmtMoney(preview.newInvoiceRemaining, currency)}</strong>
                {preview.newInvoiceRemaining === 0 && ' ' + t('applyCredit.preview.fullyPaid', '(fully paid)')}
                <br />
                {t('applyCredit.preview.walletRemaining', 'Wallet remaining:')} <strong>{fmtMoney(preview.newWalletBalance, currency)}</strong>
              </Preview>
            )}
          </>
        )}

        <Actions>
          <Btn type="button" onClick={onClose} disabled={submitting}>{t('applyCredit.cancel', 'Cancel')}</Btn>
          <Primary
            type="button"
            onClick={submit}
            disabled={submitting || !preview?.valid || wallet === null || wallet === 'none'}
          >
            {submitting ? t('applyCredit.submitting', 'Applying…') : t('applyCredit.submit', 'Apply credit')}
          </Primary>
        </Actions>
      </Dialog>
    </Backdrop>
  );
};

export default ApplyCreditModal;
