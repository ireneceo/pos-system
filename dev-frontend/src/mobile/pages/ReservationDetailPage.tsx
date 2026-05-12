import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { mobileFetch, getMobileToken } from '../utils/mobileApi';
import ReservationShare from '../components/common/ReservationShare';
import MobileLayout from '../components/common/MobileLayout';

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

// 진행 단계 — 'Arrived' 가 종착점. 그 이후는 주문 영역 책임.
// (cancelled/no_show 는 별도 terminal card)
const STEPS: Array<{ key: Reservation['status']; label: string }> = [
  { key: 'pending',   label: 'Submitted' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'arrived',   label: 'Arrived' }
];

const STATUS_HINT: Record<Reservation['status'], string> = {
  pending:   'Your reservation has been submitted. Waiting for the restaurant to confirm.',
  confirmed: 'Your table is confirmed. See you on the day!',
  arrived:   'Welcome — enjoy your meal.',
  seated:    'Enjoy your meal!',
  completed: 'Thank you for visiting. We hope to see you again.',
  cancelled: 'This reservation was cancelled.',
  no_show:   'You were marked as no-show. Please contact the restaurant if this is a mistake.'
};

export default function ReservationDetailPage() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const [r, setR] = useState<Reservation | null>(null);
  const [rest, setRest] = useState<RestaurantPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const justCreated = search.get('new') === '1';

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
      if (json.success) setR({ ...r, status: 'cancelled' });
      else setError(json.message);
    } finally { setCancelling(false); }
  };

  if (loading) {
    return (
      <MobileLayout title="Reservation" showBack onBack={() => navigate(`/mobile/${slug}/reservations`)} currentPage="reserve">
        <Empty>Loading…</Empty>
      </MobileLayout>
    );
  }
  if (error || !r) {
    return (
      <MobileLayout title="Reservation" showBack onBack={() => navigate(`/mobile/${slug}/reservations`)} currentPage="reserve">
        <Empty>{error || 'Reservation not found'}</Empty>
      </MobileLayout>
    );
  }

  const dt = new Date(r.reserved_at);
  const tz = rest?.timeZone || 'Asia/Kuala_Lumpur';
  const canCancel = r.status === 'pending' || r.status === 'confirmed';
  const addressLine = rest ? [rest.address, rest.city].filter(Boolean).join(', ') : null;
  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/mobile/${slug}/reservations/${r.id}` : '';

  const isTerminal = r.status === 'cancelled' || r.status === 'no_show';
  const currentIdx = STEPS.findIndex(s => s.key === r.status);

  return (
    <MobileLayout title="Reservation" showBack onBack={() => navigate(`/mobile/${slug}/reservations`)} currentPage="reserve">
      <Body>
        {/* Hero — completion 느낌. justCreated 이면 ✓ 강조 메시지 */}
        <Hero>
          {justCreated && (
            <SuccessBadge>
              <SuccessIcon>✓</SuccessIcon>
              Reservation submitted
            </SuccessBadge>
          )}
          <RefLabel>Reservation Reference</RefLabel>
          <RefNumber>#{r.id}</RefNumber>
          <DateLine>
            {dt.toLocaleString('en', { timeZone: tz, weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}
          </DateLine>
          <TimeLine>
            {dt.toLocaleString('en', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true })}
          </TimeLine>
          <PartyLine>
            {r.party_size} guest{r.party_size > 1 ? 's' : ''}
            {r.table_number ? ` · Table ${r.table_number}` : ''}
          </PartyLine>
        </Hero>

        {/* 상태 stepper — 정상 흐름 (cancelled/no_show 는 별도 카드) */}
        {!isTerminal && (
          <Card>
            <CardTitle>Status</CardTitle>
            <Stepper>
              {STEPS.map((step, idx) => {
                const completed = idx < currentIdx;
                const active = idx === currentIdx;
                return (
                  <Step key={step.key}>
                    <StepDot completed={completed} active={active}>
                      {completed ? '✓' : idx + 1}
                    </StepDot>
                    <StepLabel completed={completed} active={active}>
                      {step.label}
                    </StepLabel>
                    {idx < STEPS.length - 1 && <StepConnector completed={completed} />}
                  </Step>
                );
              })}
            </Stepper>
            <StatusHint>{STATUS_HINT[r.status]}</StatusHint>
          </Card>
        )}

        {isTerminal && (
          <TerminalCard status={r.status}>
            <TerminalTitle>{r.status === 'cancelled' ? 'Cancelled' : 'No-show'}</TerminalTitle>
            <StatusHint>{STATUS_HINT[r.status]}</StatusHint>
          </TerminalCard>
        )}

        {/* Restaurant info */}
        <Card>
          <CardTitle>Restaurant</CardTitle>
          <DetailRow>
            <RowKey>Name</RowKey>
            <RowVal>{rest?.name || '—'}</RowVal>
          </DetailRow>
          {addressLine && (
            <DetailRow>
              <RowKey>Address</RowKey>
              <RowVal>
                <ExternalLink href={`https://maps.google.com/?q=${encodeURIComponent(addressLine)}`} target="_blank" rel="noopener">
                  {addressLine}
                </ExternalLink>
              </RowVal>
            </DetailRow>
          )}
          {rest?.phone && (
            <DetailRow>
              <RowKey>Phone</RowKey>
              <RowVal>
                <ExternalLink href={`tel:${rest.phone}`}>{rest.phone}</ExternalLink>
              </RowVal>
            </DetailRow>
          )}
        </Card>

        {/* Guest info */}
        <Card>
          <CardTitle>Your details</CardTitle>
          <DetailRow><RowKey>Name</RowKey><RowVal>{r.guest_name}</RowVal></DetailRow>
          <DetailRow><RowKey>Phone</RowKey><RowVal>{r.guest_phone}</RowVal></DetailRow>
          {r.guest_email && <DetailRow><RowKey>Email</RowKey><RowVal>{r.guest_email}</RowVal></DetailRow>}
          {r.notes && <DetailRow><RowKey>Notes</RowKey><RowVal>{r.notes}</RowVal></DetailRow>}
        </Card>

        {/* Share / Add to Calendar */}
        {rest && !isTerminal && (
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
    </MobileLayout>
  );
}

const Body = styled.div`display:flex;flex-direction:column;gap:14px;`;

// Hero — completion 강조 카드
const Hero = styled.div`
  background:linear-gradient(135deg, #635BFF 0%, #5A51E6 100%);
  color:white;padding:24px 20px;border-radius:12px;text-align:center;
`;
const SuccessBadge = styled.div`
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(255,255,255,0.2);padding:6px 12px;border-radius:16px;
  font-size:13px;font-weight:600;margin-bottom:16px;
`;
const SuccessIcon = styled.span`
  display:inline-flex;align-items:center;justify-content:center;
  width:18px;height:18px;border-radius:50%;background:white;color:#635BFF;font-size:11px;font-weight:700;
`;
const RefLabel = styled.div`font-size:12px;opacity:0.85;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;`;
const RefNumber = styled.div`font-size:28px;font-weight:700;margin:4px 0 12px;letter-spacing:-0.5px;`;
const DateLine = styled.div`font-size:16px;font-weight:600;opacity:0.95;`;
const TimeLine = styled.div`font-size:32px;font-weight:700;margin:4px 0 8px;letter-spacing:-0.5px;`;
const PartyLine = styled.div`font-size:14px;opacity:0.9;`;

// Card pattern (OrderTrackingPage 와 동일 톤)
const Card = styled.div`
  background:white;border:1px solid #E5E7EB;border-radius:12px;
  padding:18px 20px;
`;
const CardTitle = styled.h3`
  font-size:13px;font-weight:600;color:#6B7280;
  text-transform:uppercase;letter-spacing:0.05em;
  margin:0 0 14px 0;
`;

// Stepper
const Stepper = styled.div`display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;position:relative;`;
const Step = styled.div`flex:1;display:flex;flex-direction:column;align-items:center;position:relative;min-width:0;`;
const StepDot = styled.div<{ completed?: boolean; active?: boolean }>`
  width:32px;height:32px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:600;
  background:${p => p.completed ? '#635BFF' : p.active ? '#635BFF' : '#E5E7EB'};
  color:${p => p.completed || p.active ? 'white' : '#9CA3AF'};
  box-shadow:${p => p.active ? '0 0 0 4px rgba(99,91,255,0.15)' : 'none'};
  z-index:1;transition:all 0.15s;
`;
const StepLabel = styled.div<{ completed?: boolean; active?: boolean }>`
  margin-top:6px;font-size:11px;font-weight:${p => p.active ? 600 : 500};
  color:${p => p.completed ? '#374151' : p.active ? '#635BFF' : '#9CA3AF'};
  text-align:center;line-height:1.2;
`;
const StepConnector = styled.div<{ completed?: boolean }>`
  position:absolute;top:16px;left:50%;right:-50%;height:2px;
  background:${p => p.completed ? '#635BFF' : '#E5E7EB'};
  z-index:0;
`;
const StatusHint = styled.div`font-size:13px;color:#6B7280;line-height:1.5;`;

// Terminal (cancelled / no_show)
const TerminalCard = styled.div<{ status: string }>`
  background:${p => p.status === 'cancelled' ? '#FEE2E2' : '#FCE4EC'};
  border:1px solid ${p => p.status === 'cancelled' ? '#FCA5A5' : '#F8BBD0'};
  color:${p => p.status === 'cancelled' ? '#991B1B' : '#AD1457'};
  padding:16px 20px;border-radius:12px;
`;
const TerminalTitle = styled.div`font-size:15px;font-weight:600;margin-bottom:4px;`;

// Detail rows
const DetailRow = styled.div`
  display:flex;justify-content:space-between;align-items:flex-start;gap:12px;
  padding:10px 0;border-bottom:1px solid #F0F4F8;font-size:14px;
  &:last-child{border-bottom:none;padding-bottom:0;}
  &:first-child{padding-top:0;}
`;
const RowKey = styled.span`color:#6B7280;flex-shrink:0;`;
const RowVal = styled.span`color:#0A2540;font-weight:500;text-align:right;word-break:break-word;`;
const ExternalLink = styled.a`color:#635BFF;text-decoration:none;font-weight:500;&:hover{text-decoration:underline;}`;

const Empty = styled.div`text-align:center;padding:60px 24px;color:#6B7C93;font-size:14px;`;

const CancelBtn = styled.button`
  width:100%;padding:14px;border:1px solid #FCA5A5;background:white;color:#DC2626;
  border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;
  &:hover:not(:disabled){background:#FEF2F2;}
  &:disabled{opacity:0.5;cursor:not-allowed;}
`;
