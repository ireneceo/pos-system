import React from 'react';
import { Modal as CommonModal } from '../UI';
import { Button } from '../UI/Button';   // 표준 버튼 컴포넌트 (variant 토큰)

/**
 * 수동발행(자동발행 OFF) 공용 확인 모달 — 이동/취소 공통.
 * 합의 설계(Irene): 자동발행이 아니면, "어떤 오더티켓을 어느 주방 station 에 보내는지"
 * 미리 보여주고 [보내기]/[안 보내기] 선택. station 이 여러 개면 어디로 가는지가 중요하므로
 * station 별로 나눠서 표기한다.
 */
export interface TicketPreviewStation {
  stationName: string;
  items: { name: string; quantity: number }[];
}
export interface KitchenTicketSendPrompt {
  ticketType: string;            // 예: 'TABLE CHANGED', 'TABLE CHANGED + MERGED', 'ITEM CANCELLED', 'ORDER CANCELLED'
  description?: string;          // 보조 설명 (예: '이전 티켓 버리고 이걸로')
  stations: TicketPreviewStation[];
  run: () => void;               // [보내기] 시 실제 발행
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
  return (
    <CommonModal
      isOpen={true}
      onClose={onClose}
      title={tr('orders:ticketSend.title', 'Send order ticket to kitchen?')}
      footer={<>
        <Button variant="secondary" onClick={onClose}>{tr('orders:ticketSend.dont', "Don't send")}</Button>
        <Button variant="primary" onClick={() => { const p = prompt; onClose(); p.run(); }}>{tr('orders:ticketSend.send', 'Send ticket')}</Button>
      </>}>
      <div style={{ padding: '2px 2px 4px', fontSize: 14, color: '#0A2540', lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{prompt.ticketType}</div>
        {prompt.description && <div style={{ fontSize: 13, color: '#6B7C93', marginBottom: 10 }}>{prompt.description}</div>}
        <div style={{ fontSize: 13, color: '#6B7C93', marginBottom: 6 }}>{tr('orders:ticketSend.willSend', 'The following will print:')}</div>
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
