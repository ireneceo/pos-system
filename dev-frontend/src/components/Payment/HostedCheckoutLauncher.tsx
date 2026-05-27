import React, { useState } from 'react';
import styled from 'styled-components';
import { getAuthToken } from '../../utils/auth';

interface Invoice {
  id: number;
  invoice_number?: string;
  total_amount: number;
  currency?: string;
  brand_id?: number | null;
  foodcourt_id?: number | null;
  supplier_id?: number | null;
  restaurant_id?: number | null;
}

interface Props {
  invoice: Invoice;
  gateway: 'stripe' | 'paypal';
}

const Box = styled.div`
  padding: 20px;
  background: #F4F6F9;
  border-radius: 8px;
  border: 1px solid #C7CED6;
`;

const Title = styled.h4`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const Description = styled.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: #4B5563;
  line-height: 1.5;
`;

const Button = styled.button<{ $brand: 'stripe' | 'paypal' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  background: ${p => p.$brand === 'stripe' ? '#635BFF' : '#003087'};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover:not(:disabled) { opacity: 0.92; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:focus { outline: none; box-shadow: 0 0 0 3px rgba(99,91,255,0.18); }
`;

const ErrorMsg = styled.div`
  padding: 10px 12px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 6px;
  color: #B91C1C;
  font-size: 13px;
  margin-top: 12px;
`;

const Note = styled.div`
  margin-top: 12px;
  font-size: 12px;
  color: #4B5563;
  line-height: 1.5;
`;

/**
 * Determines which issuer this invoice is for, based on FK columns.
 */
function deriveIssuer(invoice: Invoice): { type: 'system' | 'brand' | 'foodcourt' | 'supplier'; id: number | null } {
  if (invoice.brand_id) return { type: 'brand', id: invoice.brand_id };
  if (invoice.foodcourt_id) return { type: 'foodcourt', id: invoice.foodcourt_id };
  if (invoice.supplier_id) return { type: 'supplier', id: invoice.supplier_id };
  return { type: 'system', id: null };
}

export default function HostedCheckoutLauncher({ invoice, gateway }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const issuer = deriveIssuer(invoice);

  const start = async () => {
    setBusy(true);
    setError(null);
    try {
      const success_url = `${window.location.origin}${window.location.pathname}?paid=1&invoice=${invoice.id}`;
      const cancel_url = `${window.location.origin}${window.location.pathname}?cancelled=1&invoice=${invoice.id}`;
      const token = getAuthToken();
      const res = await fetch('/api/payments/checkout/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          gateway,
          mode: 'payment',
          issuer_type: issuer.type,
          issuer_id: issuer.id,
          payer_type: 'restaurant',
          payer_id: invoice.restaurant_id,
          invoice_id: invoice.id,
          success_url,
          cancel_url
        })
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json?.error?.message || 'Failed to start payment');
      }
      const url = json.data?.url;
      if (!url) throw new Error('No checkout URL returned');
      window.location.href = url;
    } catch (e: any) {
      setError(e.message || 'Failed to start payment');
      setBusy(false);
    }
  };

  const brandName = gateway === 'stripe' ? 'Stripe' : 'PayPal';

  return (
    <Box>
      <Title>Pay with {brandName}</Title>
      <Description>
        You will be redirected to {brandName}'s secure payment page.
        Card details never touch PurpleHere.
      </Description>
      <Button type="button" $brand={gateway} onClick={start} disabled={busy}>
        {busy ? 'Redirecting...' : `Continue to ${brandName}`}
      </Button>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Note>
        After successful payment, the invoice status updates automatically.
        You can close this dialog — the page will refresh on return.
      </Note>
    </Box>
  );
}
