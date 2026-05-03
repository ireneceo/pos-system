import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuthToken } from '../../utils/auth';

async function authedFetch(path: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) {
    throw new Error(json?.error?.message || `Request failed (${res.status})`);
  }
  return json.data;
}

interface Subscription {
  id: number;
  gateway: 'stripe' | 'paypal';
  status: 'incomplete' | 'active' | 'past_due' | 'canceled' | 'paused' | 'trialing';
  plan_id: number | null;
  gateway_subscription_id: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  issuer_type: string;
  issuer_id: number | null;
}

interface Props {
  payerType: 'restaurant' | 'brand' | 'foodcourt';
  payerId: number;
  /** Optional: hide if no active subscriptions */
  hideWhenEmpty?: boolean;
}

const Card = styled.div`
  background: #fff;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #F0F4F8;
`;

const HeaderTitle = styled.h3`
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;
const HeaderSub = styled.p`
  margin: 0;
  font-size: 13px;
  color: #6B7C93;
`;

const StatusBadge = styled.span<{ $status: Subscription['status'] }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${p => ({
    active: '#DCFCE7', trialing: '#DBEAFE', past_due: '#FEF3C7',
    canceled: '#F3F4F6', paused: '#F3F4F6', incomplete: '#FEE2E2'
  } as any)[p.$status]};
  color: ${p => ({
    active: '#15803D', trialing: '#1E40AF', past_due: '#92400E',
    canceled: '#6B7280', paused: '#6B7280', incomplete: '#B91C1C'
  } as any)[p.$status]};
`;

const InfoGrid = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 8px 24px;
  margin: 0;
  font-size: 13px;
`;
const Label = styled.dt`
  color: #6B7C93;
  font-weight: 500;
`;
const Value = styled.dd`
  margin: 0;
  color: #0A2540;
  font-weight: 500;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F0F4F8;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid;
  ${p => p.$variant === 'danger' ? `
    background: #fff; color: #B91C1C; border-color: #FECACA;
    &:hover:not(:disabled) { background: #FEF2F2; }
  ` : p.$variant === 'secondary' ? `
    background: #fff; color: #0A2540; border-color: #E6EBF1;
    &:hover:not(:disabled) { background: #F6F9FC; }
  ` : `
    background: #635BFF; color: #fff; border-color: #635BFF;
    &:hover:not(:disabled) { opacity: 0.92; }
  `}
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:focus { outline: none; box-shadow: 0 0 0 3px rgba(99,91,255,0.18); }
`;

const Empty = styled.div`
  padding: 24px;
  background: #F6F9FC;
  border-radius: 8px;
  text-align: center;
  color: #6B7C93;
  font-size: 14px;
`;

const ErrorMsg = styled.div`
  padding: 10px 12px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 6px;
  color: #B91C1C;
  font-size: 13px;
  margin-bottom: 12px;
`;

function fmtDate(s: string | null) {
  if (!s) return '—';
  try { return new Date(s).toLocaleDateString(); } catch { return s; }
}

export default function SubscriptionPanel({ payerType, payerId, hideWhenEmpty }: Props) {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const fetchSubs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authedFetch(
        `/api/payments/subscriptions?payer_type=${encodeURIComponent(payerType)}&payer_id=${payerId}`
      );
      setSubs(data?.subscriptions || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubs(); /* eslint-disable-next-line */ }, [payerType, payerId]);

  const openPortal = async (sub: Subscription) => {
    if (sub.gateway !== 'stripe') {
      // PayPal — redirect to user's PayPal subscription detail page
      window.open('https://www.paypal.com/myaccount/autopay/', '_blank', 'noopener');
      return;
    }
    setBusyId(sub.id);
    try {
      const data = await authedFetch('/api/payments/portal/start', {
        method: 'POST',
        body: JSON.stringify({
          issuer_type: sub.issuer_type,
          issuer_id: sub.issuer_id,
          payer_type: payerType,
          payer_id: payerId,
          return_url: window.location.href
        })
      });
      if (data?.url) window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || 'Failed to open portal');
      setBusyId(null);
    }
  };

  const cancel = async (sub: Subscription) => {
    if (!window.confirm('Cancel this subscription at the end of the current billing period?')) return;
    setBusyId(sub.id);
    try {
      await authedFetch(`/api/payments/subscriptions/${sub.id}/cancel`, {
        method: 'POST',
        body: JSON.stringify({ at_period_end: true })
      });
      await fetchSubs();
    } catch (e: any) {
      setError(e.message || 'Failed to cancel');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return <Empty>Loading subscriptions…</Empty>;
  }

  if (subs.length === 0) {
    if (hideWhenEmpty) return null;
    return <Empty>No active subscriptions.</Empty>;
  }

  return (
    <div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {subs.map(sub => (
        <Card key={sub.id}>
          <CardHeader>
            <div>
              <HeaderTitle>
                {sub.gateway === 'stripe' ? 'Stripe' : 'PayPal'} subscription
              </HeaderTitle>
              <HeaderSub>
                {sub.gateway_subscription_id.startsWith('pending_')
                  ? 'Awaiting activation'
                  : sub.gateway_subscription_id}
              </HeaderSub>
            </div>
            <StatusBadge $status={sub.status}>{sub.status.replace('_', ' ')}</StatusBadge>
          </CardHeader>

          <InfoGrid>
            <Label>Current period</Label>
            <Value>{fmtDate(sub.current_period_start)} — {fmtDate(sub.current_period_end)}</Value>
            {sub.cancel_at_period_end && (
              <>
                <Label>Cancellation</Label>
                <Value>Will cancel on {fmtDate(sub.current_period_end)}</Value>
              </>
            )}
            {sub.canceled_at && (
              <>
                <Label>Canceled</Label>
                <Value>{fmtDate(sub.canceled_at)}</Value>
              </>
            )}
          </InfoGrid>

          <Actions>
            <Button
              type="button"
              $variant="primary"
              onClick={() => openPortal(sub)}
              disabled={busyId === sub.id || sub.status === 'canceled'}
            >
              {busyId === sub.id ? 'Opening…' : 'Manage payment method'}
            </Button>
            {sub.status !== 'canceled' && !sub.cancel_at_period_end && (
              <Button
                type="button"
                $variant="danger"
                onClick={() => cancel(sub)}
                disabled={busyId === sub.id}
              >
                Cancel subscription
              </Button>
            )}
          </Actions>
        </Card>
      ))}
    </div>
  );
}
