// SaveCardModal — Stripe Elements 로 카드 등록 + auto-charge consent.
//
// 흐름:
//   1. POST /api/payments/setup-intent → client_secret + customer_id 받음
//   2. Stripe CardElement 입력 + consent 체크
//   3. stripe.confirmCardSetup(client_secret) — 카드 토큰화 (PCI: 카드 번호는 Stripe 로 직접 전송, PurpleHere 서버 거치지 않음)
//   4. POST /api/payments/save-payment-method { payment_method_id, consent: true }
//   5. 모달 닫기 + 부모에서 saved-cards 재조회

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Modal, ModalButton } from '../UI/Modal';
import { getAuthHeaders } from '../../utils/auth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (card: { brand: string; last4: string }) => void;
  entityType: 'restaurant' | 'brand' | 'foodcourt';
  entityId: number | string;
  publishableKey: string;
}

const ConsentBox = styled.label`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px 14px;
  background: #F1F0FF;
  border: 1px solid #D4D0FF;
  border-radius: 8px;
  margin-top: 14px;
  font-size: 13px;
  color: #4B5563;
  line-height: 1.6;
  cursor: pointer;

  input { margin-top: 3px; flex-shrink: 0; }
`;

const StripeBranding = styled.div`
  text-align: right;
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 8px;
`;

const ErrorBox = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  border-radius: 6px;
  font-size: 13px;
`;

const CardInputWrap = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 14px;
  background: white;
  margin-top: 6px;
  &:focus-within { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`;

const Field = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 4px;
`;

interface FormProps {
  entityType: Props['entityType'];
  entityId: Props['entityId'];
  onSaved: Props['onSaved'];
  onClose: () => void;
}

const CardForm: React.FC<FormProps> = ({ entityType, entityId, onSaved, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupClientSecret, setSetupClientSecret] = useState<string | null>(null);

  // SetupIntent 가져오기 (모달 열릴 때 1회)
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/payments/setup-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ entity_type: entityType, entity_id: entityId })
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j?.error?.message || 'Failed to start card setup');
        setSetupClientSecret(j.data.client_secret);
      } catch (e: any) {
        setError(e.message || 'Failed to start card setup');
      }
    })();
  }, [entityType, entityId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!stripe || !elements || !setupClientSecret) return;
    if (!consent) {
      setError('Please confirm the auto-charge authorization checkbox below.');
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) { setError('Card input not ready'); return; }

    setSubmitting(true);
    try {
      const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(setupClientSecret, {
        payment_method: { card }
      });
      if (stripeError) {
        setError(stripeError.message || 'Card setup failed');
        setSubmitting(false);
        return;
      }
      const pm = setupIntent?.payment_method as string;
      if (!pm) { setError('No payment method returned'); setSubmitting(false); return; }

      const r = await fetch('/api/payments/save-payment-method', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ entity_type: entityType, entity_id: entityId, payment_method_id: pm, set_default: true, consent: true })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error?.message || 'Failed to save card');
      onSaved({ brand: j.data.brand, last4: j.data.last4 });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Card setup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="save-card-form">
      <Field>
        <Label>Card details</Label>
        <CardInputWrap>
          <CardElement options={{ style: { base: { fontSize: '15px', color: '#0A2540', '::placeholder': { color: '#9CA3AF' } } } }} />
        </CardInputWrap>
      </Field>

      <ConsentBox>
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
        <span>
          <strong>I authorize PurpleHere to charge this card monthly</strong> for my subscription, on the billing date.
          I can cancel auto-charge anytime in this page. Card details are stored securely with Stripe (PCI compliant); PurpleHere does not see or store card numbers.
        </span>
      </ConsentBox>

      <StripeBranding>Powered by Stripe — PCI DSS Level 1</StripeBranding>

      {error && <ErrorBox>{error}</ErrorBox>}
    </form>
  );
};

const SaveCardModal: React.FC<Props> = ({ isOpen, onClose, onSaved, entityType, entityId, publishableKey }) => {
  const [stripeInstance, setStripeInstance] = useState<Stripe | null>(null);

  useEffect(() => {
    if (publishableKey && !stripeInstance) {
      loadStripe(publishableKey).then(setStripeInstance);
    }
  }, [publishableKey, stripeInstance]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save a card for auto-charge"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose}>Cancel</ModalButton>
          <ModalButton variant="primary" form="save-card-form" type="submit">Save card</ModalButton>
        </>
      }
    >
      {stripeInstance ? (
        <Elements stripe={stripeInstance}>
          <CardForm entityType={entityType} entityId={entityId} onSaved={onSaved} onClose={onClose} />
        </Elements>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#6B7C93' }}>Loading secure payment form…</div>
      )}
    </Modal>
  );
};

export default SaveCardModal;
