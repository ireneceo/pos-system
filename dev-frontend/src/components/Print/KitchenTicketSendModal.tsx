import React from 'react';
import { Modal as CommonModal } from '../UI';
import { Button } from '../UI/Button';   // 표준 버튼 컴포넌트 (variant 토큰)

/**
 * 주방 발송 알림 모달 — 이동/취소 공통 (확정 스펙 v2, 2026-06-02 Irene).
 * 취소·이동은 주방이 무조건 알아야 하므로 "보낼지 말지" 묻지 않고 항상 발송한 뒤,
 * 이 모달은 "무엇을 어느 station 으로 보냈는지" 를 알리는 알림형이다.
 * 푸터: [재발송] (run = 같은 티켓 다시 발송) / [닫기].
 */
export interface TicketPreviewStation {
  stationName: string;
  items: { name: string; quantity: number }[];
}
export interface KitchenTicketSendPrompt {
  ticketType: string;            // 예: 'TABLE CHANGED', 'TABLE CHANGED + MERGED', 'ITEM CANCELLED', 'ORDER CANCELLED'
  description?: string;          // 보조 설명 (예: '해당 주방에 발송됨')
  stations: TicketPreviewStation[];
  run: () => void;               // 발송/재발송 시 같은 티켓 발행.
  // 2026-06-04 (Irene): autoPrint 설정 반영. true = 자동발행 ON 이라 호출부가 이미 발송함
  //   → 버튼 [Resend Order Ticket]. false = 자동발행 OFF 라 아직 미발송 → 버튼 [Send Order Ticket].
  autoSent?: boolean;
}

interface Props {
  prompt: KitchenTicketSendPrompt | null;
  onClose: () => void;
  t?: (k: string, o?: any) => string;
}

const KitchenTicketSendModal: React.FC<Props> = ({ prompt, onClose, t }) => {
  if (!prompt) return null;
  const tr = (k: string, dv: string) => (t ? t(k, { defaultValue: dv }) : dv);
  const stations = prompt.stations && prompt.stations.length ? prompt.stations : [{ stationName: 'Kitchen', items: [] }];
  // 2026-06-04 (Irene): autoPrint OFF(미발송) → [Send Order Ticket] / ON(이미 발송) → [Resend Order Ticket].
  const sent = prompt.autoSent !== false;
  return (
    <CommonModal
      isOpen={true}
      onClose={onClose}
      title={sent ? tr('orders:ticketSend.sentTitle', 'Sent to kitchen') : tr('orders:ticketSend.sendTitle', 'Send to kitchen')}
      footer={<>
        <Button variant="secondary" onClick={() => { prompt.run(); }}>{sent ? tr('orders:ticketSend.resend', 'Resend Order Ticket') : tr('orders:ticketSend.send', 'Send Order Ticket')}</Button>
        <Button variant="primary" onClick={onClose}>{tr('orders:ticketSend.close', 'Close')}</Button>
      </>}>
      <div style={{ padding: '2px 2px 4px', fontSize: 14, color: '#0A2540', lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{prompt.ticketType}</div>
        {prompt.description && <div style={{ fontSize: 13, color: '#6B7C93', marginBottom: 10 }}>{prompt.description}</div>}
        <div style={{ fontSize: 13, color: '#6B7C93', marginBottom: 6 }}>{sent ? tr('orders:ticketSend.sentList', 'Sent the following:') : tr('orders:ticketSend.sendList', 'Will send the following:')}</div>
        {stations.map((s, i) => (
          <div key={i} style={{ border: '1px solid #E6EBF1', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#635BFF', letterSpacing: 0.3 }}>[ {String(s.stationName).toUpperCase()} ]</div>
            {(s.items || []).map((it, j) => (
              <div key={j} style={{ fontSize: 14, color: '#0A2540', fontWeight: 600 }}>{it.quantity} × {it.name}</div>
            ))}
            {(!s.items || !s.items.length) && <div style={{ fontSize: 13, color: '#6B7C93' }}>—</div>}
          </div>
        ))}
      </div>
    </CommonModal>
  );
};

export default KitchenTicketSendModal;

/**
 * 미리보기용 station 버킷팅 (표시 전용 — 인쇄 라우팅은 billPrint 가 함).
 * items 를 kitchen_station_id → station 이름으로 묶는다. station 미설정이면 단일 'Kitchen'.
 */
export function previewStationBuckets(
  items: any[],
  printSettings: any
): TicketPreviewStation[] {
  const sp = (printSettings && printSettings.kitchenStationPrinters) || {};
  const stationIds = Object.keys(sp);
  const list = Array.isArray(items) ? items : [];
  const norm = list.map(it => ({ name: it.name || (it.menuItem && it.menuItem.name) || 'Item', quantity: it.quantity || 1, sid: it.kitchen_station_id != null ? String(it.kitchen_station_id) : null, stationName: it.stationName }));
  if (stationIds.length === 0) {
    const single = (printSettings && printSettings.kitchenPrinter && printSettings.kitchenPrinter.stationName) || 'Kitchen';
    return [{ stationName: single, items: norm.map(({ name, quantity }) => ({ name, quantity })) }];
  }
  const buckets: Record<string, { name: string; quantity: number }[]> = {};
  norm.forEach(it => {
    const stName = (it.sid && sp[it.sid] && sp[it.sid].stationName) || it.stationName || (sp[stationIds[0]] && sp[stationIds[0]].stationName) || 'Kitchen';
    (buckets[stName] = buckets[stName] || []).push({ name: it.name, quantity: it.quantity });
  });
  return Object.entries(buckets).map(([stationName, items]) => ({ stationName, items }));
}
