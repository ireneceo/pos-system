import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mobileFetch, getMobileToken } from '../utils/mobileApi';

interface Reservation {
  id: number;
  restaurant_id: number;
  guest_name: string;
  reserved_at: string;
  party_size: number;
  status: 'pending' | 'confirmed' | 'arrived' | 'seated' | 'completed' | 'cancelled' | 'no_show';
  table_number: string | null;
}

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: 'Pending',   color: '#B97D00', bg: '#FFF7E6' },
  confirmed: { label: 'Confirmed', color: '#2E7D32', bg: '#E8F5E9' },
  arrived:   { label: 'Arrived',   color: '#1565C0', bg: '#E3F2FD' },
  seated:    { label: 'Seated',    color: '#4527A0', bg: '#EDE7F6' },
  completed: { label: 'Completed', color: '#37474F', bg: '#ECEFF1' },
  cancelled: { label: 'Cancelled', color: '#C62828', bg: '#FFEBEE' },
  no_show:   { label: 'No-show',   color: '#AD1457', bg: '#FCE4EC' }
};

export default function ReservationsListPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [list, setList] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [tz, setTz] = useState<string>('Asia/Kuala_Lumpur');

  useEffect(() => {
    if (!getMobileToken()) { navigate(`/mobile/${slug}/login?next=reservations`); return; }
    Promise.all([
      mobileFetch('/api/reservations/me').then(r => r.json()),
      slug ? mobileFetch(`/api/mobile/store/${slug}`, { skipAuth: true }).then(r => r.json()).catch(() => null) : null
    ])
      .then(([list, store]) => {
        if (list?.success) setList(list.data || []);
        if (store?.data?.timeZone) setTz(store.data.timeZone);
      })
      .finally(() => setLoading(false));
  }, [navigate, slug]);

  return (
    <Container>
      <Header>
        <BackBtn onClick={() => navigate(-1)}>‹</BackBtn>
        <Title>My Reservations</Title>
      </Header>
      <Body>
        {loading ? <Empty>Loading…</Empty> :
         list.length === 0 ? (
          <Empty>
            <EmptyTitle>No reservations yet</EmptyTitle>
            <EmptyHint>Book a table to see your reservations here.</EmptyHint>
            <BookBtn onClick={() => navigate(`/mobile/${slug}/reservation`)}>Book a Table</BookBtn>
          </Empty>
         ) : (
          <List>
            {list.map(r => {
              const s = STATUS_LABEL[r.status];
              const dt = new Date(r.reserved_at);
              return (
                <Card key={r.id} onClick={() => navigate(`/mobile/${slug}/reservations/${r.id}`)}>
                  <Row>
                    <DateCol>
                      <Month>{dt.toLocaleString('en', { timeZone: tz, month: 'short' })}</Month>
                      <Day>{dt.toLocaleString('en', { timeZone: tz, day: 'numeric' })}</Day>
                    </DateCol>
                    <Info>
                      <strong>{dt.toLocaleString('en', { timeZone: tz, hour: '2-digit', minute: '2-digit' })} · {r.party_size} guest{r.party_size > 1 ? 's' : ''}</strong>
                      <Hint>Ref #{r.id}{r.table_number ? ` · Table ${r.table_number}` : ''}</Hint>
                    </Info>
                    <StatusBadge style={{ background: s.bg, color: s.color }}>{s.label}</StatusBadge>
                  </Row>
                </Card>
              );
            })}
          </List>
         )}
      </Body>
    </Container>
  );
}

const Container = styled.div`min-height:100vh;background:#FAFBFC;`;
const Header = styled.header`background:white;padding:14px 16px;border-bottom:1px solid #E6EBF1;display:flex;align-items:center;gap:12px;position:sticky;top:0;`;
const BackBtn = styled.button`background:none;border:none;font-size:24px;color:#6B7C93;cursor:pointer;padding:0;`;
const Title = styled.h1`font-size:17px;font-weight:600;color:#0A2540;margin:0;`;
const Body = styled.main`padding:20px 16px;`;
const Empty = styled.div`text-align:center;padding:60px 24px;color:#6B7C93;`;
const EmptyTitle = styled.div`font-size:16px;font-weight:600;color:#0A2540;margin-bottom:6px;`;
const EmptyHint = styled.div`font-size:14px;color:#6B7C93;margin-bottom:24px;`;
const BookBtn = styled.button`padding:12px 24px;background:#635BFF;color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;`;
const List = styled.div`display:flex;flex-direction:column;gap:10px;`;
const Card = styled.div`background:white;border:1px solid #E6EBF1;border-radius:12px;padding:14px 16px;cursor:pointer;&:active{background:#FAFBFC;}`;
const Row = styled.div`display:flex;align-items:center;gap:14px;`;
const DateCol = styled.div`width:48px;text-align:center;flex-shrink:0;`;
const Month = styled.div`font-size:11px;font-weight:600;color:#635BFF;text-transform:uppercase;letter-spacing:0.06em;`;
const Day = styled.div`font-size:22px;font-weight:700;color:#0A2540;line-height:1;margin-top:2px;`;
const Info = styled.div`flex:1;min-width:0;`;
const Hint = styled.div`color:#6B7C93;font-size:12px;margin-top:2px;`;
const StatusBadge = styled.span`padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;`;
