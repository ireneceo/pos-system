import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mobileFetch, getMobileToken } from '../utils/mobileApi';
import DateField from '../../components/Common/DateField';

interface Slot {
  time: string;
  label: string;
  can_book: boolean;
  status: 'open' | 'few_left' | 'full';
}

interface Restaurant {
  id: number;
  name: string;
  slug: string;
}

export default function ReservationPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState(today);
  const [partySize, setPartySize] = useState(2);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const res = await mobileFetch(`/api/mobile/store/${slug}`, { skipAuth: true });
      const json = await res.json();
      if (json?.success && json.data) {
        setRestaurant({ id: Number(json.data.id), name: json.data.name, slug: json.data.slug });
      }
    })().catch(() => {});
  }, [slug]);

  useEffect(() => {
    if (step !== 2 || !restaurant) return;
    setLoading(true); setError(null);
    mobileFetch(`/api/reservations/availability/${restaurant.id}?date=${date}&party=${partySize}`, { skipAuth: true })
      .then(r => r.json())
      .then(j => {
        if (j.success) setSlots(j.data.slots || []);
        else setError(j.message || 'Could not load availability');
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false));
  }, [step, restaurant, date, partySize]);

  const submit = async () => {
    if (!restaurant || !selectedSlot) return;
    if (!guestName || !guestPhone) { setError('Name and phone required'); return; }
    if (!getMobileToken()) { navigate(`/mobile/${slug}/login?next=reservation`); return; }
    setLoading(true); setError(null);
    try {
      const res = await mobileFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify({
          restaurant_id: restaurant.id,
          reserved_at: selectedSlot,
          party_size: partySize,
          guest_name: guestName,
          guest_phone: guestPhone,
          guest_email: guestEmail || undefined,
          notes: notes || undefined
        })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      navigate(`/mobile/${slug}/reservations/${json.data.id}`);
    } catch (e: any) {
      setError(e.message || 'Failed');
    } finally { setLoading(false); }
  };

  if (!restaurant) return <Container><Empty>Loading…</Empty></Container>;

  return (
    <Container>
      <Header>
        <BackBtn onClick={() => step === 1 ? navigate(-1) : setStep((step - 1) as 1 | 2)}>‹</BackBtn>
        <Title>Reserve a Table</Title>
        <Subtitle>{restaurant.name}</Subtitle>
        <Steps>
          <StepDot active={step >= 1}>1</StepDot>
          <Bar />
          <StepDot active={step >= 2}>2</StepDot>
          <Bar />
          <StepDot active={step >= 3}>3</StepDot>
        </Steps>
      </Header>

      {step === 1 && (
        <Body>
          <Section>
            <Label>When?</Label>
            <DateField value={date} onChange={setDate} />
          </Section>
          <Section>
            <Label>How many guests?</Label>
            <PartyRow>
              {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                <PartyBtn key={n} active={partySize === n} onClick={() => setPartySize(n)}>{n}</PartyBtn>
              ))}
            </PartyRow>
          </Section>
          <PrimaryBtn onClick={() => setStep(2)}>Next: Pick a Time</PrimaryBtn>
        </Body>
      )}

      {step === 2 && (
        <Body>
          <Section>
            <Label>Available times — {date}, {partySize} guests</Label>
            {loading ? <Empty>Loading slots…</Empty> :
             error ? <ErrorMsg>{error}</ErrorMsg> :
             slots.length === 0 ? <Empty>No times available on this date.</Empty> : (
              <SlotGrid>
                {slots.map(s => (
                  <SlotBtn key={s.time}
                    disabled={!s.can_book}
                    active={selectedSlot === s.time}
                    onClick={() => setSelectedSlot(s.time)}>
                    {s.label}
                    {s.status === 'few_left' && <Few>few left</Few>}
                  </SlotBtn>
                ))}
              </SlotGrid>
            )}
          </Section>
          <PrimaryBtn disabled={!selectedSlot} onClick={() => setStep(3)}>Next: Your Details</PrimaryBtn>
        </Body>
      )}

      {step === 3 && (
        <Body>
          <Section>
            <Label>Name *</Label>
            <Input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Full name" />
          </Section>
          <Section>
            <Label>Phone *</Label>
            <Input type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} placeholder="+60..." />
          </Section>
          <Section>
            <Label>Email (for confirmation)</Label>
            <Input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="optional" />
          </Section>
          <Section>
            <Label>Notes (allergies, occasion, etc.)</Label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
          </Section>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <PrimaryBtn disabled={loading} onClick={submit}>{loading ? 'Submitting…' : 'Submit Reservation'}</PrimaryBtn>
        </Body>
      )}
    </Container>
  );
}

const Container = styled.div`min-height:100vh;background:#FAFBFC;padding-bottom:24px;`;
const Header = styled.header`background:white;padding:16px 20px;border-bottom:1px solid #E6EBF1;position:sticky;top:0;z-index:10;`;
const BackBtn = styled.button`background:none;border:none;font-size:24px;color:#6B7C93;cursor:pointer;position:absolute;top:12px;left:12px;`;
const Title = styled.h1`font-size:18px;font-weight:600;color:#0A2540;margin:0;text-align:center;`;
const Subtitle = styled.div`font-size:13px;color:#6B7C93;margin-top:2px;text-align:center;`;
const Steps = styled.div`display:flex;align-items:center;justify-content:center;margin-top:14px;gap:6px;`;
const StepDot = styled.div<{ active: boolean }>`
  width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:600;
  background:${p => p.active ? '#635BFF' : '#E6EBF1'};color:${p => p.active ? 'white' : '#6B7C93'};
`;
const Bar = styled.div`width:32px;height:2px;background:#E6EBF1;`;
const Body = styled.main`padding:20px;`;
const Section = styled.section`margin-bottom:20px;`;
const Label = styled.label`display:block;font-size:13px;font-weight:500;color:#6B7C93;margin-bottom:8px;`;
const PartyRow = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:8px;`;
const PartyBtn = styled.button<{ active?: boolean }>`
  padding:14px 0;border-radius:8px;border:1px solid ${p => p.active ? '#635BFF' : '#E6EBF1'};
  background:${p => p.active ? '#635BFF' : 'white'};color:${p => p.active ? 'white' : '#0A2540'};
  font-size:15px;font-weight:600;cursor:pointer;
`;
const SlotGrid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:8px;`;
const SlotBtn = styled.button<{ active?: boolean }>`
  position:relative;padding:14px 8px;border-radius:8px;
  border:1px solid ${p => p.active ? '#635BFF' : '#E6EBF1'};
  background:${p => p.active ? '#635BFF' : 'white'};color:${p => p.active ? 'white' : '#0A2540'};
  font-size:14px;font-weight:600;cursor:pointer;
  &:disabled{opacity:0.3;cursor:not-allowed;text-decoration:line-through;}
`;
const Few = styled.div`font-size:10px;opacity:0.8;margin-top:2px;font-weight:400;`;
const Input = styled.input`width:100%;padding:14px 12px;border:1px solid #E6EBF1;border-radius:8px;font-size:16px;color:#0A2540;`;
const Textarea = styled.textarea`width:100%;padding:14px 12px;border:1px solid #E6EBF1;border-radius:8px;font-size:15px;color:#0A2540;resize:vertical;font-family:inherit;`;
const PrimaryBtn = styled.button`width:100%;padding:16px;background:#635BFF;color:white;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;&:disabled{opacity:0.5;cursor:not-allowed;}&:hover:not(:disabled){background:#5A51E6;}`;
const Empty = styled.div`text-align:center;padding:40px 20px;color:#6B7C93;font-size:14px;`;
const ErrorMsg = styled.div`background:#FFEBEE;color:#C62828;padding:12px;border-radius:6px;font-size:13px;margin-bottom:14px;`;
