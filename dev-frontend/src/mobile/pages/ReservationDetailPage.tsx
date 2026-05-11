import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mobileFetch, getMobileToken } from '../utils/mobileApi';
import ReservationShare from '../components/common/ReservationShare';

interface Reservation {
  id: number;
  restaurant_id: number;
  guest_name: string;
  guest_phone: string;
  guest_email: string | null;
  reserved_at: string;
  party_size: number;
  status: 'pending' | 'confirmed' | 'arrived' | 'seated' | 'completed' | 'cancelled' | 'no_show';
  table_number: string | null;
  notes: string | null;
}

interface RestaurantPublic {
  name: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  timeZone?: string;
}

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string; hint: string }> = {
  pending:   { label: 'Pending approval', color: '#B97D00', bg: '#FFF7E6', hint: 'Waiting for the restaurant to confirm.' },
  confirmed: { label: 'Confirmed',        color: '#2E7D32', bg: '#E8F5E9', hint: 'Your table is ready. See you soon!' },
  arrived:   { label: 'Arrived',          color: '#1565C0', bg: '#E3F2FD', hint: 'Welcome — staff are seating you.' },
  seated:    { label: 'Seated',           color: '#4527A0', bg: '#EDE7F6', hint: 'Enjoy your meal!' },
  completed: { label: 'Completed',        color: '#37474F', bg: '#ECEFF1', hint: 'Thank you for visiting.' },
  cancelled: { label: 'Cancelled',        color: '#C62828', bg: '#FFEBEE', hint: 'This reservation was cancelled.' },
  no_show:   { label: 'No-show',          color: '#AD1457', bg: '#FCE4EC', hint: 'You were marked as no-show.' }
};

export default function ReservationDetailPage() {
  const navigate = useNavigate();
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const [r, setR] = useState<Reservation | null>(null);
  const [rest, setRest] = useState<RestaurantPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getMobileToken()) { navigate(`/mobile/${slug}/login?next=reservations/${id}`); return; }
    let active = true;
    (async () => {
      try {
        const res = await mobileFetch(`/api/reservations/me/${id}`);
        const json = await res.json();
        if (!active) return;
        if (!json.success) { setError(json.message); return; }
        setR(json.data);

        if (slug) {
          const r2 = await mobileFetch(`/api/mobile/store/${slug}`, { skipAuth: true });
          const j2 = await r2.json();
          if (active && j2?.data) setRest({
            name: j2.data.name,
            phone: j2.data.phone,
            address: j2.data.address,
            city: j2.data.city || null,
            timeZone: j2.data.timeZone || 'Asia/Kuala_Lumpur'
          });
        }
      } finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [id, slug, navigate]);

  const cancel = async () => {
    if (!r || cancelling) return;
    if (!window.confirm('Cancel this reservation?')) return;
    setCancelling(true);
    try {
      const res = await mobileFetch(`/api/reservations/me/${r.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setR({ ...r, status: 'cancelled' });
      } else setError(json.message);
    } finally { setCancelling(false); }
  };

  if (loading) return <Container><Empty>Loading…</Empty></Container>;
  if (error || !r) return <Container><Empty>{error || 'Reservation not found'}</Empty></Container>;

  const s = STATUS_LABEL[r.status];
  const dt = new Date(r.reserved_at);
  const tz = rest?.timeZone || 'Asia/Kuala_Lumpur';
  const canCancel = r.status === 'pending' || r.status === 'confirmed';
  const addressLine = rest ? [rest.address, rest.city].filter(Boolean).join(', ') : null;
  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/mobile/${slug}/reservations/${r.id}` : '';

  return (
    <Container>
      <Header>
        <BackBtn onClick={() => navigate(`/mobile/${slug}/reservations`)}>‹</BackBtn>
        <Title>Reservation</Title>
      </Header>

      <Body>
        <StatusCard style={{ background: s.bg, color: s.color }}>
          <StatusLabel>{s.label}</StatusLabel>
          <StatusHint>{s.hint}</StatusHint>
        </StatusCard>

        <Card>
          <Big>{dt.toLocaleString('en', { timeZone: tz, weekday: 'short', month: 'short', day: '2-digit' })}</Big>
          <Bigger>{dt.toLocaleString('en', { timeZone: tz, hour: '2-digit', minute: '2-digit' })}</Bigger>
          <Hint>{r.party_size} guest{r.party_size > 1 ? 's' : ''} · Ref #{r.id}</Hint>
        </Card>

        <Card>
          <Row><K>Restaurant</K><V>{rest?.name || '—'}</V></Row>
          {addressLine && <Row><K>Address</K><V>{addressLine}</V></Row>}
          {rest?.phone && <Row><K>Phone</K><V>{rest.phone}</V></Row>}
          {r.table_number && <Row><K>Table</K><V>{r.table_number}</V></Row>}
          <Row><K>Name</K><V>{r.guest_name}</V></Row>
          <Row><K>Phone</K><V>{r.guest_phone}</V></Row>
          {r.notes && <Row><K>Notes</K><V>{r.notes}</V></Row>}
        </Card>

        {rest && (
          <Card>
            <ReservationShare
              reservation={r}
              restaurantName={rest.name}
              restaurantPhone={rest.phone}
              restaurantAddress={addressLine}
              restaurantTimeZone={tz}
              publicUrl={publicUrl}
            />
          </Card>
        )}

        {canCancel && (
          <CancelBtn onClick={cancel} disabled={cancelling}>
            {cancelling ? 'Cancelling…' : 'Cancel Reservation'}
          </CancelBtn>
        )}
      </Body>
    </Container>
  );
}

const Container = styled.div`min-height:100vh;background:#FAFBFC;padding-bottom:32px;`;
const Header = styled.header`background:white;padding:14px 16px;border-bottom:1px solid #E6EBF1;display:flex;align-items:center;gap:12px;position:sticky;top:0;`;
const BackBtn = styled.button`background:none;border:none;font-size:24px;color:#6B7C93;cursor:pointer;padding:0;`;
const Title = styled.h1`font-size:17px;font-weight:600;color:#0A2540;margin:0;`;
const Body = styled.main`padding:16px;display:flex;flex-direction:column;gap:14px;`;
const StatusCard = styled.div`padding:16px 20px;border-radius:12px;`;
const StatusLabel = styled.div`font-size:15px;font-weight:600;`;
const StatusHint = styled.div`font-size:13px;margin-top:4px;opacity:0.85;`;
const Card = styled.div`background:white;border:1px solid #E6EBF1;border-radius:12px;padding:18px 20px;`;
const Big = styled.div`font-size:14px;color:#6B7C93;font-weight:500;margin-bottom:4px;`;
const Bigger = styled.div`font-size:28px;font-weight:700;color:#0A2540;line-height:1;margin-bottom:6px;`;
const Hint = styled.div`color:#6B7C93;font-size:13px;`;
const Row = styled.div`display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #F0F4F8;font-size:14px;&:last-child{border-bottom:none;}`;
const K = styled.span`color:#6B7C93;`;
const V = styled.span`color:#0A2540;font-weight:500;text-align:right;`;
const Empty = styled.div`text-align:center;padding:60px 24px;color:#6B7C93;font-size:14px;`;
const CancelBtn = styled.button`width:100%;padding:14px;border:1px solid #FFCDD2;background:white;color:#C62828;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;&:disabled{opacity:0.5;}`;
