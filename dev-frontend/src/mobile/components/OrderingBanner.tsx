import React from 'react';
import { useTranslation } from 'react-i18next';
import type { OrderingState } from '../contexts/MobileOrderContext';

// Shared "ordering unavailable" banner for the mobile customer flow.
// Single visual language for the business-hours/last-order closed state — used on
// OrderTypePage / CartPage / PaymentPage so the customer always sees the same message.
// Renders nothing when the gate is off or the store is open. No emoji (design rule).

const WEEKDAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface Props {
  ordering?: OrderingState | null;
  // When true the store accepts pickup pre-orders → guide the customer to schedule one.
  pickupAvailable?: boolean;
  style?: React.CSSProperties;
}

const OrderingBanner: React.FC<Props> = ({ ordering, pickupAvailable, style }) => {
  const { t } = useTranslation();
  if (!ordering || !ordering.enabled || ordering.canOrder) return null;

  const next = ordering.nextOpen;
  const dayName = next ? t(`orders:businessHours.weekday.${next.dow}`, WEEKDAYS_EN[next.dow]) : '';
  const nextOpenText = next
    ? (next.inDays === 0
      ? t('orders:businessHours.opensTodayAt', 'Opens today at {{time}}', { time: next.open })
      : t('orders:businessHours.opensAt', 'Opens {{day}} at {{time}}', { day: dayName, time: next.open }))
    : '';

  let title: string;
  switch (ordering.status) {
    case 'before_open': title = t('orders:businessHours.beforeOpen', 'Not open yet'); break;
    case 'after_last_order': title = t('orders:businessHours.afterLastOrder', 'Last order has passed'); break;
    case 'after_close': title = t('orders:businessHours.afterClose', 'Closed for today'); break;
    case 'closed_today': title = t('orders:businessHours.closedToday', 'Closed today'); break;
    default: title = t('orders:businessHours.closed', 'Currently closed');
  }

  const hint = pickupAvailable
    ? t('orders:businessHours.pickupHint', 'You can still pre-order for pickup at a later time.')
    : t('orders:businessHours.counterHint', 'Please order at the counter, or check back later.');

  return (
    <div style={{
      background: '#FFF8E1',
      border: '1px solid #FFE082',
      borderRadius: '12px',
      padding: '16px 18px',
      color: '#6B5B20',
      ...style
    }}>
      <div style={{ fontSize: '15px', fontWeight: 600, color: '#0A2540', marginBottom: '4px' }}>{title}</div>
      {nextOpenText && <div style={{ fontSize: '14px', marginBottom: '4px' }}>{nextOpenText}</div>}
      <div style={{ fontSize: '13px', lineHeight: 1.5 }}>{hint}</div>
    </div>
  );
};

export default OrderingBanner;
