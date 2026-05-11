import React, { useState } from 'react';
import styled from 'styled-components';

interface ReservationData {
  id: number;
  guest_name: string;
  guest_phone: string;
  reserved_at: string;
  party_size: number;
  status: string;
  table_number?: string | null;
}

interface Props {
  reservation: ReservationData;
  restaurantName: string;
  restaurantPhone?: string | null;
  restaurantAddress?: string | null;
  restaurantTimeZone?: string;
  publicUrl?: string;
}

const ReservationShare: React.FC<Props> = ({
  reservation, restaurantName, restaurantPhone, restaurantAddress, restaurantTimeZone, publicUrl
}) => {
  const [showCopied, setShowCopied] = useState(false);
  const supportsShare = typeof navigator !== 'undefined' && !!navigator.share;
  const tz = restaurantTimeZone || 'Asia/Kuala_Lumpur';

  const dt = new Date(reservation.reserved_at);
  const dateStr = dt.toLocaleString('en', { timeZone: tz, weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
  const timeStr = dt.toLocaleString('en', { timeZone: tz, hour: '2-digit', minute: '2-digit' });

  const buildText = (): string => {
    let t = `Reservation Confirmation\n`;
    t += `${restaurantName}\n`;
    if (restaurantAddress) t += `${restaurantAddress}\n`;
    if (restaurantPhone) t += `Tel: ${restaurantPhone}\n`;
    t += `\n`;
    t += `Reference: #${reservation.id}\n`;
    t += `Date: ${dateStr}\n`;
    t += `Time: ${timeStr}\n`;
    t += `Party: ${reservation.party_size} guest${reservation.party_size > 1 ? 's' : ''}\n`;
    if (reservation.table_number) t += `Table: ${reservation.table_number}\n`;
    t += `Name: ${reservation.guest_name}\n`;
    t += `Status: ${reservation.status}\n`;
    if (publicUrl) t += `\nManage: ${publicUrl}\n`;
    return t;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(buildText())}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?text=${encodeURIComponent(buildText())}`, '_blank');
  };

  const handleShare = async () => {
    const text = buildText();
    if (supportsShare) {
      try { await navigator.share({ text }); } catch { /* cancelled */ }
    } else {
      try { await navigator.clipboard.writeText(text); }
      catch {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const handleAddToCalendar = () => {
    const start = dt;
    const end = new Date(dt.getTime() + 90 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//PurpleHere//Reservation//EN',
      'BEGIN:VEVENT',
      `UID:reservation-${reservation.id}@purplehere`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:Reservation at ${restaurantName}`,
      `DESCRIPTION:${reservation.party_size} guests · Ref #${reservation.id}`,
      restaurantAddress ? `LOCATION:${restaurantAddress}` : '',
      'END:VEVENT', 'END:VCALENDAR'
    ].filter(Boolean).join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reservation-${reservation.id}.ics`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  };

  return (
    <Container>
      <Label>Share &amp; Save</Label>
      <ButtonRow>
        <Btn onClick={handleWhatsApp}><WhatsAppIcon /> WhatsApp</Btn>
        <Btn onClick={handleTelegram}><TelegramIcon /> Telegram</Btn>
        <Btn onClick={handleShare}>{supportsShare ? <ShareIcon /> : <CopyIcon />} {supportsShare ? 'Share' : 'Copy'}</Btn>
      </ButtonRow>
      <ButtonRow>
        <CalendarBtn onClick={handleAddToCalendar}><CalendarIcon /> Add to Calendar</CalendarBtn>
      </ButtonRow>
      <Toast visible={showCopied}>Copied to clipboard</Toast>
    </Container>
  );
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="#0088cc" width="18" height="18">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const Container = styled.div`margin-top:16px;padding-top:16px;border-top:1px solid #E5E7EB;`;
const Label = styled.div`font-size:12px;color:#9CA3AF;margin-bottom:10px;text-align:center;`;
const ButtonRow = styled.div`display:flex;justify-content:center;gap:10px;margin-bottom:10px;&:last-child{margin-bottom:0;}`;
const Btn = styled.button`display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;border:1px solid #E5E7EB;background:white;font-size:13px;font-weight:500;color:#374151;cursor:pointer;&:active{transform:scale(0.96);background:#F9FAFB;}`;
const CalendarBtn = styled(Btn)`flex:1;max-width:280px;justify-content:center;border-color:#635BFF;color:#635BFF;font-weight:600;`;
const Toast = styled.div<{ visible: boolean }>`position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1F2937;color:white;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:500;opacity:${p => p.visible ? 1 : 0};transition:opacity 0.3s;pointer-events:none;z-index:1000;`;

export default ReservationShare;
