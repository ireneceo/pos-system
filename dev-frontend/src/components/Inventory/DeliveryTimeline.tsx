import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export interface TrackingEvent {
  at: string;          // ISO timestamp
  status: string;      // 'submitted' | 'confirmed' | 'shipped' | 'partial_received' | 'received' | 'cancelled'
  note?: string;
}

export interface DeliveryTimelineProps {
  events?: TrackingEvent[] | null;
  carrier_name?: string | null;
  carrier_code?: string | null;
  tracking_number?: string | null;
  tracking_url?: string | null;
  estimated_arrival?: string | null;
  compact?: boolean;
  timeZone?: string;   // restaurant/seller timezone — defaults to 'Asia/Kuala_Lumpur' (CLAUDE.md timezone policy)
}

const Wrap = styled.div<{ compact?: boolean }>`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: ${p => p.compact ? '16px' : '20px 24px'};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-weight: 600;
  color: #0A2540;
  font-size: 15px;
`;

const CarrierBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #EEF2FF;
  border: 1px solid #635BFF;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #4338CA;
`;

const TrackLink = styled.a`
  font-size: 12px;
  color: #635BFF;
  text-decoration: none;
  font-weight: 600;
  &:hover { text-decoration: underline; }
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Step = styled.div<{ done?: boolean; active?: boolean; cancelled?: boolean }>`
  position: relative;
  text-align: center;
  padding-top: 28px;

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${p => p.cancelled ? '#DC2626' : p.done ? '#10B981' : p.active ? '#635BFF' : '#C7CED6'};
    border: 2px solid white;
    box-shadow: 0 0 0 2px ${p => p.cancelled ? '#DC2626' : p.done ? '#10B981' : p.active ? '#635BFF' : '#C7CED6'};
    z-index: 1;
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 14px;
    left: 50%;
    width: 100%;
    height: 2px;
    background: ${p => p.done ? '#10B981' : '#C7CED6'};
    z-index: 0;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding-top: 0;
    padding-left: 28px;
    text-align: left;
    &::before { top: 4px; left: 0; transform: none; }
    &::after { display: none; }
  }
`;

const StepLabel = styled.div<{ active?: boolean; done?: boolean; cancelled?: boolean }>`
  font-size: 12px;
  font-weight: ${p => p.active || p.done ? 600 : 500};
  color: ${p => p.cancelled ? '#DC2626' : p.done ? '#0A2540' : p.active ? '#635BFF' : '#6B7280'};
`;

const StepTime = styled.div`
  font-size: 11px;
  color: #4B5563;
  margin-top: 4px;
`;

const NotesList = styled.ul`
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  border-top: 1px dashed #C7CED6;
  padding-top: 12px;

  li {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #4B5563;
    padding: 4px 0;
  }
  li time {
    color: #6B7280;
    flex-shrink: 0;
    width: 130px;
    font-feature-settings: 'tnum';
  }
`;

const STEP_ORDER = ['submitted', 'confirmed', 'shipped', 'delivered', 'received'];

function fmtTime(iso: string, timeZone: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
      timeZone
    });
  } catch { return iso; }
}

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({
  events,
  carrier_name,
  carrier_code,
  tracking_number,
  tracking_url,
  estimated_arrival,
  compact,
  timeZone
}) => {
  const { t } = useTranslation('common');
  const tz = timeZone || 'Asia/Kuala_Lumpur';
  const STEP_LABEL: Record<string, string> = {
    submitted: t('delivery.steps.submitted', 'Submitted'),
    confirmed: t('delivery.steps.confirmed', 'Confirmed'),
    shipped: t('delivery.steps.shipped', 'Shipped'),
    delivered: t('delivery.steps.delivered', 'Delivered'),
    received: t('delivery.steps.received', 'Received')
  };
  const safeEvents = Array.isArray(events) ? events : [];
  const cancelled = safeEvents.some(e => e.status === 'cancelled');
  const reachedStatuses = new Set(safeEvents.map(e => e.status));
  const lastReachedIndex = STEP_ORDER.reduce((max, s, i) => reachedStatuses.has(s) ? i : (s === 'in_transit' && reachedStatuses.has('shipped') ? Math.max(max, i - 1) : max), -1);

  const stepStateOf = (i: number) => {
    if (cancelled && i > 0) return { done: false, active: false, cancelled: false };
    if (i < lastReachedIndex) return { done: true, active: false, cancelled: false };
    if (i === lastReachedIndex) return { done: false, active: true, cancelled: false };
    return { done: false, active: false, cancelled: false };
  };

  const stepTimeFor = (status: string) => {
    const evt = [...safeEvents].reverse().find(e => e.status === status);
    return evt ? fmtTime(evt.at, tz) : '';
  };

  return (
    <Wrap compact={compact}>
      <HeaderRow>
        <Title>{t('delivery.title', 'Delivery Timeline')}</Title>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {(carrier_name || carrier_code) && (
            <CarrierBadge>
              <span>📦</span>
              {carrier_name || carrier_code}
              {tracking_number ? ` · ${tracking_number}` : ''}
            </CarrierBadge>
          )}
          {tracking_url && (
            <TrackLink href={tracking_url} target="_blank" rel="noopener noreferrer">{t('delivery.track', 'Track →')}</TrackLink>
          )}
        </div>
      </HeaderRow>

      {cancelled ? (
        <div style={{ padding: 16, background: '#FEF2F2', border: '1px solid #DC2626', borderRadius: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#991B1B' }}>{t('delivery.cancelled', 'Order cancelled')}</div>
          <div style={{ fontSize: 12, color: '#7F1D1D', marginTop: 4 }}>
            {(safeEvents.find(e => e.status === 'cancelled')?.note) || ''}
          </div>
        </div>
      ) : (
        <Steps>
          {STEP_ORDER.map((status, i) => {
            const state = stepStateOf(i);
            return (
              <Step key={status} done={state.done} active={state.active}>
                <StepLabel done={state.done} active={state.active}>{STEP_LABEL[status]}</StepLabel>
                <StepTime>{stepTimeFor(status)}</StepTime>
              </Step>
            );
          })}
        </Steps>
      )}

      {estimated_arrival && (
        <div style={{ marginTop: 14, fontSize: 12, color: '#4B5563', textAlign: 'center' }}>
          {t('delivery.estimatedArrival', 'Estimated arrival:')} <strong style={{ color: '#0A2540' }}>{estimated_arrival}</strong>
        </div>
      )}

      {!compact && safeEvents.length > 0 && (
        <NotesList>
          {safeEvents.slice().reverse().map((e, idx) => (
            <li key={idx}>
              <time>{fmtTime(e.at, tz)}</time>
              <span>{e.note || STEP_LABEL[e.status] || e.status}</span>
            </li>
          ))}
        </NotesList>
      )}
    </Wrap>
  );
};

export default DeliveryTimeline;
