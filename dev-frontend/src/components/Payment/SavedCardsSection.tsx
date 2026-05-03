// SavedCardsSection — saved cards list + auto-charge toggle + add card 버튼.
// Restaurant/Brand/Foodcourt billing/invoice 페이지에 import 해서 사용.
//
// API 의존:
//   GET /api/payments/saved-cards
//   POST /api/payments/setup-intent (SaveCardModal 내부)
//   POST /api/payments/save-payment-method (SaveCardModal 내부)
//   DELETE /api/payments/saved-cards/:pm_id
//   PATCH /api/payments/auto-charge

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import SaveCardModal from './SaveCardModal';
import { getAuthHeaders } from '../../utils/auth';

interface Card {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

interface Props {
  entityType: 'restaurant' | 'brand' | 'foodcourt';
  entityId: number | string;
  publishableKey?: string;
}

const Section = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const Description = styled.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 0 0 16px;
  line-height: 1.6;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Brand = styled.span`
  background: #F1F0FF;
  color: #635BFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
`;

const Last4 = styled.span`
  color: #0A2540;
  font-weight: 500;
`;

const Exp = styled.span`
  color: #6B7C93;
  font-size: 12px;
`;

const DefaultBadge = styled.span`
  background: #ECFDF5;
  color: #047857;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  color: #DC2626;
  font-size: 12px;
  cursor: pointer;
  font-weight: 500;
  &:hover { text-decoration: underline; }
`;

const AddBtn = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #5A51E6; }
`;

const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #FAFBFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  margin-top: 12px;
  cursor: pointer;
  font-size: 14px;
  color: #0A2540;

  input { transform: scale(1.1); }
`;

const Empty = styled.div`
  text-align: center;
  padding: 28px 16px;
  color: #6B7C93;
  font-size: 13px;
  background: #FAFBFC;
  border: 1px dashed #E6EBF1;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const SavedCardsSection: React.FC<Props> = ({ entityType, entityId, publishableKey }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [autoChargeEnabled, setAutoChargeEnabled] = useState(false);
  const [defaultPm, setDefaultPm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(publishableKey || null);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/payments/saved-cards?entity_type=${entityType}&entity_id=${entityId}`, {
        headers: getAuthHeaders()
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error?.message || 'Failed to load saved cards');
      setCards(j.data.cards || []);
      setAutoChargeEnabled(!!j.data.auto_charge_enabled);
      setDefaultPm(j.data.default_payment_method || null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  // Publishable key 가 props 로 안 오면 PaymentSettings 에서 fetch (System Admin 의 키)
  useEffect(() => {
    if (loadedKey) return;
    (async () => {
      try {
        const r = await fetch('/api/admin/settings', { headers: getAuthHeaders() });
        const j = await r.json();
        const pk = j?.payment_settings?.stripe?.publishableKey
          || j?.data?.payment_settings?.stripe?.publishableKey;
        if (pk) setLoadedKey(pk);
      } catch { /* ignore */ }
    })();
  }, [loadedKey]);

  useEffect(() => { fetchCards(); }, [fetchCards]);

  const handleDelete = async (pmId: string) => {
    if (!window.confirm('Remove this card? Auto-charge will be disabled if this is your default card.')) return;
    try {
      const r = await fetch(`/api/payments/saved-cards/${pmId}?entity_type=${entityType}&entity_id=${entityId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!r.ok) {
        const j = await r.json();
        throw new Error(j?.error?.message || 'Failed to remove card');
      }
      await fetchCards();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleToggleAutoCharge = async () => {
    const newEnabled = !autoChargeEnabled;
    try {
      const r = await fetch('/api/payments/auto-charge', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ entity_type: entityType, entity_id: entityId, enabled: newEnabled })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error?.message || 'Failed to toggle auto-charge');
      setAutoChargeEnabled(newEnabled);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Section>
      <Header>
        <Title>Saved cards & auto-charge</Title>
        {cards.length > 0 && loadedKey && (
          <AddBtn type="button" onClick={() => setShowModal(true)}>+ Add another card</AddBtn>
        )}
      </Header>
      <Description>
        Save a card to enable monthly auto-charge for your subscription. Card details are stored securely with Stripe — PurpleHere never sees or stores card numbers.
      </Description>

      {loading ? (
        <Empty>Loading…</Empty>
      ) : cards.length === 0 ? (
        <>
          <Empty>
            <div style={{ fontSize: 14, color: '#0A2540', marginBottom: 4 }}>No card saved yet</div>
            <div style={{ marginBottom: 14 }}>Add a card so future invoices charge automatically on the billing date.</div>
            {loadedKey && <AddBtn type="button" onClick={() => setShowModal(true)}>+ Save a card</AddBtn>}
            {!loadedKey && <div style={{ fontSize: 12, color: '#9CA3AF' }}>Stripe is not configured — contact admin.</div>}
          </Empty>
        </>
      ) : (
        <>
          {cards.map(c => (
            <CardRow key={c.id}>
              <CardInfo>
                <Brand>{c.brand}</Brand>
                <Last4>•••• {c.last4}</Last4>
                <Exp>{String(c.exp_month).padStart(2, '0')}/{String(c.exp_year).slice(-2)}</Exp>
                {c.is_default && <DefaultBadge>Default</DefaultBadge>}
              </CardInfo>
              <DeleteBtn type="button" onClick={() => handleDelete(c.id)}>Remove</DeleteBtn>
            </CardRow>
          ))}

          <ToggleRow>
            <input type="checkbox" checked={autoChargeEnabled} onChange={handleToggleAutoCharge} disabled={!defaultPm} />
            <span>
              <strong>Charge subscription invoices automatically</strong> using my default card.
              <div style={{ fontSize: 12, color: '#6B7C93', marginTop: 2 }}>
                {autoChargeEnabled
                  ? 'On — invoices will be charged on the billing date. You can cancel anytime here.'
                  : 'Off — you will receive an email reminder to pay each invoice manually.'}
              </div>
            </span>
          </ToggleRow>
        </>
      )}

      {error && (
        <div style={{ marginTop: 10, padding: '8px 12px', background: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', borderRadius: 6, fontSize: 13 }}>
          {error}
        </div>
      )}

      {loadedKey && (
        <SaveCardModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSaved={() => { fetchCards(); }}
          entityType={entityType}
          entityId={entityId}
          publishableKey={loadedKey}
        />
      )}
    </Section>
  );
};

export default SavedCardsSection;
