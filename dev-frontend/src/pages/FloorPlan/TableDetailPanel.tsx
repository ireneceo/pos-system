import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FloorTable, TableStatusInfo, ORDER_STATUS_COLORS, getOrderStatusColors } from './types';
import { ItemStatusPill, toDisplayStatus } from './orderItemStatus';
import MenuThumb from './MenuThumb';
import { ProductPhotoInfo } from './productImageMap';
import { getPosTheme } from '../../styles/posDisplayTheme';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
import { formatPaymentDisplay } from '../../constants';
import { useStore } from '../../contexts/StoreContext';
import { formatDateTime } from '../../utils/timezone';
import { computePrepFromElapsed, PrepTimerChip } from '../../utils/prepTimer';
import { printBillViaRawBT, printKitchenTicketViaRawBT, printTableQR, printCancellationTicket, printCancellationTicketsByStation, getPrinterSettings, tagTicketWithStations, generateHTMLKitchenTicket, generateKitchenTicketContent, printSettlementReport, getActiveBillPrinter, getActiveWorkstationId } from '../../utils/billPrint';
import { previewStationBuckets, KitchenTicketSendPrompt } from '../../components/Print/KitchenTicketSendModal';
import OptionModal from '../../components/POSTerminal/OptionModal';
import VoidPinModal from '../../components/POSTerminal/VoidPinModal';
import { Modal, ModalButton } from '../../components/UI';
import OrderActionHistory from '../LiveOrders/OrderActionHistory';
import TableMoveTrail from '../LiveOrders/TableMoveTrail';
import { useTranslation } from 'react-i18next';
import { getTableLabel } from '../../utils/tableLabel';

import { getAuthToken } from '../../utils/auth';
// 오프라인 편집 배선 (§15-5 ⑨⑩⑪⑫⑯) — 온라인 경로는 그대로, 메인POS 오프라인일 때만 로컬 op 기록.
import { useOffline } from '../../contexts/OfflineContext';
import { isOfflineMainPos } from '../../utils/offlineMainPos';
// 타임아웃 있는 fetch(기존 유틸 재사용) — 무한대기로 버튼이 영구 잠기는 것 방지. 신규 유틸 만들지 않음.
import { fetchWithTimeout } from '../../utils/offlineOrderQueue';
// Helper: payment_proof 호환 — { current, history } 구조 또는 기존 단일 객체 모두 지원
const getProofCurrent = (proof: any): any => {
  if (!proof) return null;
  if (proof.hasOwnProperty('current')) return proof.current;
  return proof;
};
const getProofHistory = (proof: any): any[] => {
  if (!proof) return [];
  if (proof.hasOwnProperty('history')) return proof.history || [];
  return [];
};

interface TableDetailPanelProps {
  // null → takeaway mode (no table). String → dine-in mode for that table.
  // Dine-in specifics (table label, seats, QR, "Leaved", Available empty-state) are hidden when null.
  tableNumber: string | null;
  statusInfo: TableStatusInfo | undefined;
  // 예약↔플로어플랜 (P2-6) — 활성 주문 없는 테이블에 임박 예약이 있을 때만 전달됨.
  reservationInfo?: TableStatusInfo | undefined;
  tableInfo: FloorTable | undefined;
  currency: string;
  timezone?: string;
  restaurantId: number;
  // Track A: 품목 → 상품 사진 조회(표시 전용, 없으면 썸네일 미표시). 설계 §A-4.5.
  productLookup?: (productId?: number | null, name?: string) => ProductPhotoInfo | null;
  onClose: () => void;
  onNewOrder: (opts?: { takeaway?: boolean; mergeOrderId?: number; guests?: number; checkInReservationId?: number }) => void;
  onStatusChange: (orderId: number, newStatus: string) => Promise<void>;
  onPayment: () => void;
  onNavigateToPOS: () => void;
  onOrderUpdated: () => void;
  onClearTable: (orderId: number) => Promise<void>;
  onClearAllCompleted?: () => Promise<void>;
  // Table move/transfer — opens the destination picker (managed by FloorPlanPage,
  // which knows the full table list + occupancy). Passes the order being moved.
  onMoveTable?: (orderId: number, sourceTableNumber: string | null) => void;
  // Multi-order support
  orders?: TableStatusInfo[];
  selectedOrderIndex?: number;
  onOrderIndexChange?: (index: number) => void;
  // 탭 표시 여부 — 주문 여러 개거나 빈 테이블이라도 오늘 완료 이력이 있으면 true.
  showOrderTabs?: boolean;
  // 빈 테이블(활성 주문 없음) — true 면 탭에 "+ New Order"(빈 테이블 복귀) 칩 표시.
  tableFree?: boolean;
  // QR mode
  qrMode?: 'static' | 'session';
  // Floor plan v2 — zone/group 풀라벨 매핑용
  floorPlan?: any;
  // 확정 스펙 v2 (2026-06-02): 취소/아이템삭제 후 "주방에 발송됨" 알림 팝업.
  // FloorPlanPage 가 KitchenTicketSendModal 을 렌더하므로 prompt 를 위로 올린다.
  onKitchenTicketSent?: (prompt: KitchenTicketSendPrompt) => void;
  // 카운터(POS) 운영 권한. false(서빙 전용 직원) → 주문/품목추가/테이블이동 등 카운터 액션 숨김. docs/SERVING_VIEW_DESIGN.md
  canOperatePOS?: boolean;
  // 결제 권한(access_payment). false(서버/홀 역할) → 결제 버튼 숨김 + Full티켓 버튼 노출. (2026-06-24)
  canTakePayment?: boolean;
  // 취소/void 권한(access_void). false(서버/홀 역할) → 주문취소·품목삭제 버튼 숨김. (2026-06-24)
  canVoid?: boolean;
  // 2026-06-28 (FloorPlan): 큰 팝업으로 보기. expanded=true 면 패널을 화면 중앙 큰
  // 모달(body portal)로 렌더 — 좁은 측면패널 대신 크게 보기(Irene). onToggleExpand 로 토글.
  expanded?: boolean;
  onToggleExpand?: () => void;
}

// ─── Styled Components ───

const Panel = styled.div<{ $expanded?: boolean }>`
  width: ${p => (p.$expanded ? 'min(900px, 94vw)' : '380px')};
  min-width: ${p => (p.$expanded ? '0' : '380px')};
  max-width: ${p => (p.$expanded ? '94vw' : 'none')};
  height: ${p => (p.$expanded ? 'min(90vh, 920px)' : 'auto')};
  background: var(--pos-surface, white);
  /* 기본 글자색을 테마 토큰으로 — color 미지정 인라인 텍스트(상품명 등)가
     다크에서 검정으로 남아 안 보이던 문제 방지. 명시색은 각자 우선. */
  color: var(--pos-text, #0A2540);
  border-left: ${p => (p.$expanded ? 'none' : '1px solid var(--pos-border, #C7CED6)')};
  ${p => (p.$expanded ? 'border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.32);' : '')}
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    ${p => (p.$expanded ? '' : 'position: absolute; inset: 0; z-index: 20;')}
  }
`;

// 2026-06-28 (FloorPlan): "크게 보기" 팝업 백드롭 — Panel 을 body portal 로 중앙에 띄운다.
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const PanelHeader = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid var(--pos-border, #C7CED6);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`;

// 2026-06-25 (Irene 10인치): 제목 + 메타(seats·min) + 배지(상태·결제)를 한 줄로 묶어
// 헤더를 2줄(제목 / 메타+배지)로 압축. 이전엔 3줄(제목·메타·배지)이라 주문영역을 잡아먹었다.
const HeaderMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 8px;
  margin-top: 3px;
  font-size: 12px;
  color: var(--pos-text-muted, #4B5563);
  font-weight: 500;
`;

const TableTitle = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--pos-text, #0A2540);
    margin: 0;
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: var(--pos-text-muted, #4B5563);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: filter 0.12s ease, background 0.15s ease;

  @media (hover: hover) { &:hover { background: var(--pos-surface-2, #F1F4F8); } }
  &:active { filter: brightness(0.9); }
  &:focus { outline: none; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 1px; }
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`;

const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${p => p.$color};
  background: ${p => p.$bg};
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const Section = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid var(--pos-border, #C7CED6);
`;

const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: var(--pos-text-muted, #6B7280);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`;

const InfoItem = styled.div`
  font-size: 12px;
`;

const InfoLabel = styled.span`
  color: var(--pos-text-muted, #6B7280);
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: var(--pos-text, #0A2540);
  font-weight: 600;
  margin-left: 4px;
`;

const GroupHeader = styled.div<{ $isAdded?: boolean }>`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${p => p.$isAdded ? '#92400E' : 'var(--pos-text-muted, #4B5563)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemRow = styled.div<{ $completed?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid var(--pos-border, #F1F4F8);
  opacity: ${p => p.$completed ? 0.55 : 1};
  transition: opacity 0.2s;

  &:last-child { border-bottom: none; }

  @media (max-width: 480px) {
    column-gap: 6px;
    padding: 7px 0;
  }
`;

// 아이템 단계 pill — 공용 모듈 재사용(ItemListView 와 동일). orderItemStatus.tsx 단일 진실.
// (import 는 파일 상단에 추가됨)

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div<{ $completed?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
  text-decoration: ${p => p.$completed ? 'line-through' : 'none'};
  word-break: break-word;
  line-height: 1.35;

  @media (max-width: 480px) {
    font-size: 12.5px;
  }
`;

const ItemOptions = styled.div`
  font-size: 10px;
  color: var(--pos-text-muted, #4B5563);
  margin-top: 1px;
`;

const ItemPrice = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;

  @media (max-width: 480px) {
    font-size: 11.5px;
  }
`;

const ItemQty = styled.span`
  font-size: 11px;
  color: var(--pos-text-muted, #6B7280);
  font-weight: 500;
`;

const DeleteItemBtn = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: var(--pos-text-muted, #6B7280);
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: filter 0.12s ease, color 0.15s ease, background 0.15s ease;

  @media (hover: hover) {
    &:hover { color: #DC2626; background: #FEE2E2; }
  }
  &:active { filter: brightness(0.9); }
  &:focus { outline: none; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 1px; }
`;

const SummaryRow = styled.div<{ $bold?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: ${p => p.$bold ? '14px' : '12px'};
  color: ${p => p.$bold ? 'var(--pos-text, #0A2540)' : 'var(--pos-text-muted, #4B5563)'};
  font-weight: ${p => p.$bold ? '700' : '500'};
  padding: 2px 0;
`;

const NotesBox = styled.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  color: #92400E;
  margin-top: 6px;
`;

const ActionGroup = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-shrink: 0;
  border-top: 1px solid var(--pos-border, #C7CED6);
  /* 2026-06-25 (Irene 10인치 "버튼 부분 아래로 내릴 수 있게 / 높이값 안먹게"): 하단 버튼 영역이
     커져도 주문 리스트를 통째로 밀어내지 않게 높이 상한 + 자체 스크롤. 작은 화면(10")에서 버튼이
     많/길어도 이 블록만 스크롤되고 위 주문영역은 보존된다. */
  max-height: 52vh;
  overflow-y: auto;
`;

// 터치스크린 안정 피드백: hover 색변경은 마우스 기기에서만(@media hover) — 터치에서 탭 후 색이
// 들러붙던 문제 해결(특히 고대비에서 회색→어두운 border 로 굳던 현상). 누름 피드백은 :active 로만
// (손 떼면 즉시 복귀). 색을 안 바꾸고 "살짝 눌리는" 촉각감(scale+brightness)이라 올드 터치에서도 안정적.
const ActionBtn = styled.button<{ $variant: 'primary' | 'secondary' | 'success' | 'danger' | 'link' }>`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.08s ease, filter 0.12s ease, background 0.15s ease;
  border: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  ${p => {
    switch (p.$variant) {
      case 'primary':
        return `background: var(--pos-brand, #635BFF); color: white; @media (hover: hover) { &:hover { background: #5A51E6; } }`;
      case 'success':
        return `background: #10B981; color: white; border: 1px solid #10B981; @media (hover: hover) { &:hover { background: #059669; } }`;
      case 'secondary':
        return `background: var(--pos-surface-2, #F4F6F9); color: var(--pos-text-muted, #4B5563); border: 1px solid var(--pos-border, #C7CED6); @media (hover: hover) { &:hover { background: var(--pos-border, #C7CED6); } }`;
      case 'danger':
        return `background: var(--pos-surface, white); color: #DC2626; border: 1px solid #FCA5A5; @media (hover: hover) { &:hover { background: #FEF2F2; } }`;
      case 'link':
        return `background: none; color: var(--pos-text-muted, #4B5563); font-size: 13px; font-weight: 500; padding: 6px; @media (hover: hover) { &:hover { color: var(--pos-text, #1F2937); } }`;
    }
  }}

  /* 누르는 동안만 — 떼면 즉시 원상복귀(터치/마우스 공통, 색 안 굳음) */
  &:active { transform: scale(0.975); filter: brightness(0.94); }
  &:focus { outline: none; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 6px;
`;

// 서브 액션(Move Table/Cancel/Reprint QR/Expire QR/Leaved) — 2열 그리드 + 컴팩트.
// 주요 버튼(ActionBtn 17px)과 위계 구분: 작게, 두 개씩.
const SubActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;

  & > button {
    width: 100%;
    min-height: 0;
    padding: 11px 12px;
    font-size: 14px;
    font-weight: 600;
  }
  /* 버튼 개수가 홀수면 마지막 1개를 전체폭으로 — 빈 칸 없이(2열 정렬 유지). */
  & > button:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }
`;

const IconButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding-bottom: 4px;
`;

const IconButton = styled.button`
  flex: 1;
  padding: 10px 12px;
  background: var(--pos-surface-2, #F4F6F9);
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.08s ease, filter 0.12s ease, background 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: var(--pos-text-muted, #4B5563);
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  /* hover 색변경은 마우스에서만(터치 탭 후 색 굳음 방지). */
  @media (hover: hover) {
    &:hover { background: var(--pos-border, #C7CED6); transform: translateY(-1px); }
  }
  /* 누르는 동안만 — 떼면 즉시 복귀. 색 안 굳고 살짝 눌리는 촉각감. */
  &:active { transform: scale(0.97); filter: brightness(0.94); }
  &:focus { outline: none; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: var(--pos-text-muted, #4B5563);
  display: inline-block;
  line-height: 1;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--pos-text-muted, #6B7280);

  p {
    margin: 8px 0 0;
    font-size: 13px;
  }
`;

const RejectButton = styled(ModalButton)`
  && {
    background: #FEF2F2;
    border: 1px solid #EF4444;
    color: #EF4444;
  }
  &&:hover:not(:disabled) {
    background: #FEE2E2;
  }
`;

const ConfirmPayButton = styled(ModalButton)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
`;

// ─── Confirm Modal ───

const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmBox = styled.div`
  background: var(--pos-surface, white);
  color: var(--pos-text, #0A2540);
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

const ConfirmTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: var(--pos-text, #0A2540);
  margin-bottom: 8px;
`;

const ConfirmMessage = styled.div`
  font-size: 14px;
  color: var(--pos-text-muted, #4B5563);
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ConfirmBtn = styled.button<{ $danger?: boolean }>`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.08s ease, filter 0.12s ease, background 0.15s ease;
  border: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  ${p => p.$danger
    ? `background: #FEF2F2; color: #EF4444; border: 1px solid #EF4444; @media (hover: hover) { &:hover { background: #FEE2E2; } }`
    : `background: var(--pos-surface-2, #F1F4F8); color: var(--pos-text, #1F2937); @media (hover: hover) { &:hover { background: var(--pos-border, #C7CED6); } }`
  }
  &:active { transform: scale(0.97); filter: brightness(0.94); }
  &:focus { outline: none; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
`;

const QRStatusInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--pos-surface-2, #F9FAFB);
  color: var(--pos-text, #0A2540);
  border-radius: 8px;
  font-size: 13px;
  margin-top: 8px;
`;

// ─── Status helpers ───

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Ready',
  served: 'Served',
  awaiting_payment: 'Awaiting Payment',
  outstanding: 'Outstanding',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

const SOURCE_LABELS: Record<string, string> = {
  pos: 'POS Terminal',
  mobile: 'Mobile Order',
  kiosk: 'Kiosk'
};

const getNextStatus = (current: string, paymentStatus?: string): { status: string; label: string } | null => {
  switch (current) {
    case 'outstanding': return (paymentStatus === 'payment_verification_pending' || paymentStatus === 'rejected') ? null : { status: 'pending', label: 'Proceed Without Payment' };
    case 'pending': return { status: 'preparing', label: 'Start Cooking' };
    case 'preparing': return { status: 'ready', label: 'Mark Ready' };
    case 'ready': return { status: 'served', label: 'Served' };
    case 'served': return paymentStatus === 'completed'
      ? { status: 'completed', label: 'Complete Order' }
      : null;
    default: return null;
  }
};

const getPreviousStatus = (current: string): string | null => {
  const reverseFlow: Record<string, string | null> = {
    preparing: 'pending',
    ready: 'preparing',
    served: 'ready',
    completed: 'served',
    pending: null,
    cancelled: null
  };
  return reverseFlow[current] || null;
};

// ─── Component ───

const TableDetailPanel: React.FC<TableDetailPanelProps> = ({
  tableNumber,
  statusInfo,
  reservationInfo,
  tableInfo,
  currency,
  timezone,
  restaurantId,
  productLookup,
  onClose,
  onNewOrder,
  onStatusChange,
  onPayment,
  onNavigateToPOS,
  onOrderUpdated,
  onClearTable,
  onClearAllCompleted,
  onMoveTable,
  orders = [],
  selectedOrderIndex = 0,
  onOrderIndexChange,
  showOrderTabs,
  tableFree,
  qrMode = 'static',
  floorPlan,
  onKitchenTicketSent,
  canOperatePOS = true,
  canTakePayment = true,
  canVoid = true,
  expanded = false,
  onToggleExpand
}) => {
  const [loading, setLoading] = useState(false);
  // 우측 패널 접기 (#1): 테이블 작업(QR/프린트/Cancel/Leaved) 기본 접힘 → 주문내역 가독성 확보.
  const [showTableActions, setShowTableActions] = useState(false);
  // 주문 탭이 많을 때 접기/펼치기 — 기본은 최근 몇 개만, "+N" 누르면 전체.
  const [showAllOrderTabs, setShowAllOrderTabs] = useState(false);
  const { getStoreInfo, paymentSettings, operationSettings } = useStore();
  const { t } = useTranslation(['orders', 'floorplan']);
  const [showHistory, setShowHistory] = useState(false);

  // ─── QR Session state ───
  const [qrSession, setQrSession] = useState<{ token: string; qr_url: string; remaining_minutes: number; expires_at: string; created_at: string } | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);

  // ─── QR Session: fetch status ───
  const fetchQRStatus = useCallback(async () => {
    if (!restaurantId || !tableNumber) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/restaurants/${restaurantId}/tables/${tableNumber}/qr`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setQrSession(result.data);
        } else {
          setQrSession(null);
        }
      } else {
        setQrSession(null);
      }
    } catch {
      setQrSession(null);
    }
  }, [restaurantId, tableNumber]);

  useEffect(() => {
    fetchQRStatus();
  }, [fetchQRStatus]);

  // ─── QR live expiry ───
  // 백엔드는 expires_at(기본 3시간) 지나면 GET 에서 세션을 안 돌려주지만, 패널이 열린 채로
  // 시간이 흐르면 화면의 "Active QR" 발행정보가 그대로 남아있다(once-fetch 라 재확인 없음).
  // 매장 요구("시간 지나면 사라져야") → 30초마다 시각을 갱신해 만료된 QR 은 화면에서 자동으로 비운다.
  const [qrNowTs, setQrNowTs] = useState(() => Date.now());
  useEffect(() => {
    if (!qrSession) return;
    const id = setInterval(() => setQrNowTs(Date.now()), 30000);
    return () => clearInterval(id);
  }, [qrSession]);
  const activeQr = qrSession && new Date(qrSession.expires_at).getTime() > qrNowTs ? qrSession : null;
  const qrRemainingMin = activeQr
    ? Math.max(0, Math.floor((new Date(activeQr.expires_at).getTime() - qrNowTs) / 60000))
    : 0;

  // ─── Confirm modal state ───
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // 오프라인 편집 배선 — 서버 도달 판정(navigator.onLine 단독 금지). 메인POS 오프라인일 때만 로컬 op 기록.
  const { isOffline } = useOffline();
  // 오프라인 동작 안내(간단 notice — 기존 confirm 모달 재사용, 두 버튼 모두 닫기).
  const offlineNotice = (title: string, message: string) =>
    setConfirmModal({ title, message, onConfirm: () => setConfirmModal(null) });

  // 손실방지 PIN 게이트 — requireVoidPin 매장에서 삭제/취소 전 권한 PIN 확인.
  const [voidGate, setVoidGate] = useState<{ run: (pin: string) => void } | null>(null);
  const [cancelReasonOpen, setCancelReasonOpen] = useState(false);
  const [deleteItemTarget, setDeleteItemTarget] = useState<{ index: number; name: string; maxQty: number } | null>(null);
  // #2 부분수량 취소 — 취소 수량(기본 = 전량)
  const [cancelQty, setCancelQty] = useState(1);

  // ─── Add Items View state (like LiveOrders) ───
  const [showAddItemsView, setShowAddItemsView] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [addItemsCart, setAddItemsCart] = useState<any[]>([]);
  const [isAddingItems, setIsAddingItems] = useState(false);
  const [addItemsSearchQuery, setAddItemsSearchQuery] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedMenuItemForOption, setSelectedMenuItemForOption] = useState<any>(null);

  // ─── Add Items: fetch menu ───
  const fetchMenuForAddItems = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const token = getAuthToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const itemRes = await fetch(`/api/menu?restaurantId=${restaurantId}`, { headers });
      if (itemRes.ok) {
        const itemResult = await itemRes.json();
        const items = itemResult.data?.items || itemResult.items || [];
        const normalizedItems = items.map((i: any) => {
          let optionGroups = i.optionGroups;
          if (typeof optionGroups === 'string') {
            try { optionGroups = JSON.parse(optionGroups); } catch { optionGroups = []; }
          }
          return { ...i, category_id: i.category_id || i.categoryId, optionGroups: Array.isArray(optionGroups) ? optionGroups : [] };
        });
        // set_only = 세트 구성 전용 단품 — 추가주문에서도 단품 담기 불가 (2026-06-12)
        setMenuItems(normalizedItems.filter((i: any) => i.is_available !== false && !i.set_only));
      }
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (showAddItemsView) {
      fetchMenuForAddItems();
    } else {
      setAddItemsCart([]);
      setAddItemsSearchQuery('');
    }
  }, [showAddItemsView, fetchMenuForAddItems]);

  const handleAddToItemsCart = (item: any, quantity: number = 1, selectedOptions: any[] = []) => {
    const optionsKey = selectedOptions.map((o: any) => o.id || o.name).sort().join(',');
    setAddItemsCart(prev => {
      if (selectedOptions.length === 0) {
        const existing = prev.find(i => i.menuItemId === item.id && (!i.selectedOptions || i.selectedOptions.length === 0));
        if (existing) return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        const existing = prev.find(i => i.menuItemId === item.id && i.selectedOptions?.map((o: any) => o.id || o.name).sort().join(',') === optionsKey);
        if (existing) return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + quantity } : i);
      }
      const optionsTotalPrice = selectedOptions.reduce((sum: number, opt: any) => sum + (parseFloat(opt.price) || 0), 0);
      const unitPrice = parseFloat(item.price) + optionsTotalPrice;
      return [...prev, {
        cartId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        menuItemId: item.id, name: item.name, price: item.price, unitPrice,
        quantity, selectedOptions, is_set_menu: item.is_set_menu, set_items: item.set_items
      }];
    });
  };

  const handleRemoveFromItemsCart = (cartId: string) => {
    setAddItemsCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing && existing.quantity > 1) return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity - 1 } : i);
      return prev.filter(i => i.cartId !== cartId);
    });
  };

  const handleIncreaseCartItem = (cartId: string) => {
    setAddItemsCart(prev => prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const handleSubmitAddItems = async () => {
    if (!statusInfo?.orderId || addItemsCart.length === 0) return;
    try {
      setIsAddingItems(true);
      const token = getAuthToken();
      const mergeItems = addItemsCart.map(item => ({
        menu_item_id: item.menuItemId, menu_item_name: item.name, name: item.name,
        quantity: item.quantity, price: item.price, unitPrice: item.unitPrice || item.price,
        options: item.selectedOptions?.map((opt: any) => ({ name: opt.name, price: opt.price || 0 })) || [],
        is_set_menu: item.is_set_menu, set_items: item.set_items
      }));
      // §15-5 ⑨ 오프라인: 메인POS면 로컬 라운드 인쇄 → add_items op 기록(온라인 fetch 대체). 온라인 경로 무변경.
      if (isOffline && isOfflineMainPos()) {
        const { recordOfflineOp, printOfflineAddedItemsTicket } = await import('../../utils/offlineOps');
        const printed = await printOfflineAddedItemsTicket(
          { order_number: statusInfo.orderNumber, table_number: tableNumber }, mergeItems
        ).catch(() => false);
        await recordOfflineOp('add_items', { serverId: statusInfo.orderId as any }, { items: mergeItems, printed_offline: printed === true });
        setShowAddItemsView(false);
        setAddItemsCart([]);
        setAddItemsSearchQuery('');
        onOrderUpdated();
        offlineNotice('오프라인 저장됨', '추가 주문이 로컬에 저장되어 연결 시 자동 전송됩니다.');
        return;
      }
      const res = await fetch(`/api/orders/${statusInfo.orderId}/merge-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items: mergeItems, source: 'floor_plan' })
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to add items');
      }
      setShowAddItemsView(false);
      setAddItemsCart([]);
      setAddItemsSearchQuery('');
      onOrderUpdated();
    } catch (err: any) {
      console.error('Add items error:', err);
    } finally {
      setIsAddingItems(false);
    }
  };

  const isOccupied = statusInfo && statusInfo.status !== 'available';
  const orderStatus = statusInfo?.orderStatus || '';
  const paymentStatus = statusInfo?.paymentStatus || 'pending';
  const nextAction = getNextStatus(orderStatus, paymentStatus);
  const items = statusInfo?.orderItems || [];
  // 단계 dot (Queued/Cooking/Ready/Served) 는 활성 주문이면 항상 표시.
  // 체크박스 활성 여부는 row 단위에서 displayStatus 로 판정 (ready/served 만 클릭 가능).
  // cancelled / completed 는 표시 안 함.
  const showServedCheckbox = ['pending', 'preparing', 'ready', 'served'].includes(orderStatus);

  const statusColors = isOccupied && ORDER_STATUS_COLORS[orderStatus]
    ? getOrderStatusColors(orderStatus)
    : { bg: '#F1F4F8', text: '#6B7280', border: '#6B7280' };

  const paymentStatusColors = (() => {
    switch (paymentStatus) {
      case 'completed': case 'paid': return { color: '#059669', bg: '#ECFDF5' };
      case 'partial': return { color: '#3B30D9', bg: '#F0F4FF' };
      case 'failed': return { color: '#DC2626', bg: '#FEE2E2' };
      case 'rejected': return { color: '#DC2626', bg: '#FEE2E2' };
      case 'payment_verification_pending': return { color: '#D97706', bg: '#FEF3C7' };
      default: return { color: 'var(--pos-text-muted, #4B5563)', bg: '#F1F4F8' };
    }
  })();

  // Group items by order_group
  const groupedItems: Record<number, typeof items> = {};
  items.forEach((item, idx) => {
    const group = item.order_group || 0;
    if (!groupedItems[group]) groupedItems[group] = [];
    groupedItems[group].push({ ...item, _originalIndex: idx } as any);
  });
  const groupKeys = Object.keys(groupedItems).map(Number).sort((a, b) => a - b);

  const tzSettings = timezone ? { timeZone: timezone } : null;

  const formatDT = (dateStr?: string) => {
    if (!dateStr) return '-';
    return formatDateTime(dateStr, tzSettings, {
      month: '2-digit', day: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  // ─── Handlers ───

  // Floor Plan 의 hall 직원은 'ready → served' 만 토글한다.
  // 'pending'/'preparing' 은 주방(KDS) 이 관리하는 단계이므로 여기서 건드리지 않는다.
  // 모든 아이템이 served 가 되면 order.status='served' 로 자동 승급.
  const handleToggleItemServed = async (itemIndex: number, compIndex: number | null = null) => {
    if (loading || !statusInfo?.orderId) return;
    const target = items[itemIndex] as any;
    if (!target) return;
    if (!['pending', 'preparing', 'ready', 'served'].includes(orderStatus)) return; // guard
    // 토글 대상 현재 상태(아이템 또는 세트 구성품) — revert 여부 판정용
    const curStatus = compIndex == null
      ? target.status
      : ((target.set_components || target.set_items || [])[compIndex]?.status);
    setLoading(true);
    try {
      const updatedItems = items.map((item: any, idx) => {
        if (idx !== itemIndex) return item;
        if (compIndex == null) {
          return { ...item, status: item.status === 'served' ? 'ready' : 'served' };
        }
        // 세트 구성품 토글 — 구성품 status 변경 + 부모 세트 롤업(전부 served → 세트 served)
        const fk = Array.isArray(item.set_components) && item.set_components.length ? 'set_components' : 'set_items';
        const comps = (item[fk] || []).map((c: any, ci: number) =>
          ci === compIndex ? { ...c, status: c.status === 'served' ? 'ready' : 'served' } : c);
        const allComps = comps.every((c: any) => ['served', 'completed'].includes(String(c.status)));
        return { ...item, [fk]: comps, status: allComps ? 'served' : (item.status === 'served' ? 'ready' : item.status) };
      });

      const token = getAuthToken();
      const _allowRevert = curStatus === 'served';
      // §15-5 ⑩ 오프라인: cancel_item op(온라인과 동일 full-array body + base_updated_at). 온라인 경로 무변경.
      if (isOffline && isOfflineMainPos()) {
        const { recordOfflineOp } = await import('../../utils/offlineOps');
        await recordOfflineOp('cancel_item', { serverId: statusInfo.orderId as any }, {
          order_items: updatedItems, allowItemRevert: _allowRevert, base_updated_at: statusInfo.updatedAt || undefined
        });
        onOrderUpdated();
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/orders/${statusInfo.orderId}/items`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        // 2026-06-26 (item 5): send the version we last read so a stale serve toggle
        // can't clobber a concurrent qty/item edit (backend → 409 STALE_WRITE).
        body: JSON.stringify({ order_items: updatedItems, allowItemRevert: _allowRevert, base_updated_at: statusInfo.updatedAt || undefined })
      });

      if (res.ok) {
        // 주문 단계 롤업은 백엔드 단일 단계 모델이 처리 (2026-06-12, PATCH /items 가
        // 아이템 min 단계로 주문 단계를 같은 쓰기에서 파생 — 별도 /status 호출 제거).
        onOrderUpdated();
      } else {
        // 409 STALE_WRITE 포함: 서버 진실로 재동기화 (옛 캐시로 덮어쓰지 않음).
        onOrderUpdated();
      }
    } catch (_) { /* silently fail */ }
    setLoading(false);
  };

  // Map item.status → display token. 'completed' 는 레거시 데이터; served 와 같은 의미로 처리.
  // 실제 아이템 삭제 — 손실방지 게이트(handleDeleteItem) 통과 후 호출. voidPin 은 백엔드 재검증용.
  const performDeleteItem = async (itemIndex: number, itemName: string, voidPin?: string | null, reason?: string | null, cancelQty?: number) => {
    if (!statusInfo?.orderId) return;
    const wasInKitchen = !['awaiting_payment', 'pending'].includes(String(statusInfo.orderStatus || ''));
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/orders/${statusInfo.orderId}/items/${itemIndex}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ void_pin: voidPin || undefined, reason: reason || undefined, cancelQty: cancelQty || undefined })
      });
      const result = await res.json().catch(() => ({} as any));
      if (res.ok && result.success !== false) {
        onOrderUpdated();
        // 확정 스펙 v2 (2026-06-02): 주방에 간(printed) 아이템 삭제는 항상 취소표 발송
        // + 알림형 팝업. 미발행 아이템은 주방이 알 필요 없음 → skip.
        try {
          const removed = result.removedItem || {};
          // 2026-06-03: printed_at 기준(상태 무관). 자동발행 ON 매장은 pending 중 이미 인쇄됨.
          if (removed.was_printed || removed.printed_at) {
            const settings = getPrinterSettings();
            const sid = removed.kitchen_station_id;
            const sp = (sid != null && settings?.kitchenStationPrinters?.[String(sid)]) || null;
            const stPrinter = (sp && sp.name) || undefined;
            const stAddr = (sp && sp.address) || undefined;
            const sInfo = (typeof getStoreInfo === 'function') ? getStoreInfo() : {};
            const printData: any = {
              orderNumber: statusInfo.orderNumber, order_number: statusInfo.orderNumber,
              tableNumber: tableNumber || undefined,
              cancelTitle: '*** ITEM CANCELLED ***',
              cancelFooter: '>> DO NOT PREPARE <<',
              // station명 — 저장된 stationName 없으면 프린터 설정의 stationName 폴백 (주문취소/테이블이동과 동일).
              stationLabel: removed.stationName || (sp && sp.stationName) || undefined,
              items: [{ name: removed.name || itemName, quantity: removed.quantity || 1, kitchen_station_id: sid, stationName: removed.stationName || (sp && sp.stationName) || undefined }]
            };
            const doPrint = () => printCancellationTicket(printData, sInfo, 'Item voided', stPrinter, stAddr)
              .catch((e: any) => console.warn('FloorPlan item void print failed:', e && e.message));
            const _kp: any = (settings as any)?.kitchenPrinter;
            const _stV = Object.values((settings as any)?.kitchenStationPrinters || {}).some((s: any) => s?.autoPrint);
            const _autoOn = !!((_kp && _kp.enabled && _kp.autoPrint) || _stV);
            // 2026-06-24 (Irene): void 취소표 자동발행은 backend(needs_print + pending_reprint.data) → 인쇄
            // 전담 POS 폴러가 처리(누른 기기/계정 무관). 프론트 직접 발행 제거(중복 방지). autoPrint OFF 면
            // 폴러가 안 찍으므로 수동 [Send] 프롬프트만.
            if (!_autoOn) {
              onKitchenTicketSent && onKitchenTicketSent({
                run: doPrint, autoSent: false, ticketType: '*** ITEM CANCELLED ***',
                description: t('cancelledItem.pressSend', 'Cancelled item — press [Send] to dispatch to kitchen'),
                stations: previewStationBuckets(printData.items, settings)
              });
            } else if (result.data && result.data.pending_reprint) {
              // 2026-06-25 (Irene 하이브리드): 자동모드(=인쇄 전담 POS1)면 ITEM VOIDED 취소표를
              // 폴러 안 기다리고 즉시 로컬 인쇄. result.data.pending_reprint(표준 ** ITEM VOIDED **
              // noticeHeader + data.items=뺀 품목)를 그대로 재사용 → billPrint 무변경/새 디자인 0.
              // claim 으로 폴러와 중복 0. POS2 는 게이트로 false → POS1 폴러가 처리(크로스기기).
              (async () => {
                try {
                  const { printOrderKitchenNow } = await import('../../utils/hybridKitchenPrint');
                  const _ok = await printOrderKitchenNow(result.data, getStoreInfo);
                  if (_ok) return;
                } catch (_e) { /* fall through */ }
                try { window.dispatchEvent(new CustomEvent('autoprint-poke')); localStorage.setItem('autoprint-poke', String(Date.now())); } catch {}
              })();
            }
          }
        } catch (e: any) { console.warn('FloorPlan void-ticket step skipped:', e?.message); }
      }
    } catch (_) { /* silently fail */ }
  };

  const handleDeleteItem = (itemIndex: number, itemName: string, maxQty: number = 1) => {
    if (!statusInfo?.orderId) return;
    const mode = (operationSettings as any)?.requireCancelReason || 'required';
    if (mode === 'off') {
      // 사유 없이 삭제 — requireVoidPin 매장은 PIN 게이트, 아니면 단순 확인. (off 모드는 전량삭제)
      if ((operationSettings as any)?.requireVoidPin) {
        setVoidGate({ run: (pin: string) => performDeleteItem(itemIndex, itemName, pin, '') });
        return;
      }
      setConfirmModal({
        title: 'Delete Item',
        message: `Delete "${itemName}" from this order?`,
        onConfirm: () => { setConfirmModal(null); performDeleteItem(itemIndex, itemName, null, ''); }
      });
      return;
    }
    // optional / required: 사유 퀵픽 먼저 (아이템삭제도 사유 캡처 — Void & Cancel 로그).
    setCancelQty(Math.max(1, maxQty)); // 기본 = 전량
    setDeleteItemTarget({ index: itemIndex, name: itemName, maxQty: Math.max(1, maxQty) });
  };

  // 아이템 삭제 사유 선택 → requireVoidPin 매장은 PIN 게이트, 아니면 즉시 삭제. (#2 부분수량 cancelQty 전달)
  const beginDeleteItemWithReason = (reason: string) => {
    const tgt = deleteItemTarget;
    const qty = cancelQty;
    setDeleteItemTarget(null);
    if (!tgt) return;
    if ((operationSettings as any)?.requireVoidPin) {
      setVoidGate({ run: (pin: string) => performDeleteItem(tgt.index, tgt.name, pin, reason, qty) });
    } else {
      performDeleteItem(tgt.index, tgt.name, null, reason, qty);
    }
  };

  // 실제 주문 취소 — 손실방지 게이트(handleCancelOrder) 통과 후 호출. voidPin 은 백엔드 재검증용.
  const performCancelOrder = async (voidPin?: string | null, reason?: string | null) => {
    if (!statusInfo?.orderId) return;
    setLoading(true);
    try {
      // §15-5 ⑪ 오프라인: 상세 fetch(아래)가 오프라인 실패하므로 printed 판정은 캐시 주문(statusInfo.orderItems).
      // printed 품목 있으면 로컬 취소표 인쇄 → cancel_order op 기록. 온라인 경로 무변경.
      if (isOffline && isOfflineMainPos()) {
        const { recordOfflineOp, printOfflineNoticeTicket } = await import('../../utils/offlineOps');
        const cachedItems = (items || []).filter((it: any) => it && (it.printed_at || it.printed));
        let printed = false;
        if (cachedItems.length > 0) {
          printed = await printOfflineNoticeTicket(
            { order_number: statusInfo.orderNumber, table_number: tableNumber },
            { title: '** ORDER CANCELLED **', lines: reason ? [`Reason: ${reason}`] : [] },
            cachedItems
          ).catch(() => false);
        }
        await recordOfflineOp('cancel_order', { serverId: statusInfo.orderId as any }, {
          status: 'cancelled', reason: reason || undefined, void_pin: voidPin || undefined, printed_offline: printed === true
        });
        onOrderUpdated();
        offlineNotice('오프라인 저장됨', '주문 취소가 로컬에 저장되어 연결 시 자동 전송됩니다.');
        setLoading(false);
        return;
      }
      const token = getAuthToken();
      // 확정 스펙 v2 (2026-06-02): 취소표 station 라우팅을 위해 취소 전 주문 상세(발행된
      // 아이템의 kitchen_station_id/printed_at)를 가져온다. table-status 요약엔 없음.
      let fullItems: any[] = [];
      // 2026-06-03: 상태 무관 항상 주문 상세 조회 → printed_at 으로 발행 여부 판단.
      // (자동발행 ON 매장은 pending 중 이미 인쇄 → 상태 기준이면 취소표 누락)
      try {
        const r = await fetch(`/api/orders/${statusInfo.orderId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        const j = await r.json();
        const od = j.data || j;
        let oi = od.order_items;
        if (typeof oi === 'string') { try { oi = JSON.parse(oi); } catch { oi = []; } }
        fullItems = Array.isArray(oi) ? oi : [];
      } catch { /* fetch best-effort */ }
      const cancelRes = await fetch(`/api/orders/${statusInfo.orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'cancelled', void_pin: voidPin || undefined, reason: reason || undefined })
      });
      const cancelJson = await cancelRes.json().catch(() => ({} as any));
      // 게이트 거부(VOID_PIN_*) 등 취소 실패 시 취소표를 발행하지 않는다.
      if (!cancelRes.ok || cancelJson.success === false) {
        onOrderUpdated();
        setLoading(false);
        return;
      }
      onOrderUpdated();
      // 취소는 항상 발송(주방이 무조건 알아야) + 발송 후 알림형 팝업. 발행된 아이템만.
      try {
        const printedItems = fullItems.filter(it => it && (it.printed_at || it.printed));
        if (printedItems.length > 0) {
          const settings = getPrinterSettings();
          const sInfo = (typeof getStoreInfo === 'function') ? getStoreInfo() : {};
          const printData: any = {
            orderNumber: statusInfo.orderNumber, order_number: statusInfo.orderNumber,
            tableNumber: tableNumber || undefined,
            cancelTitle: '*** ORDER CANCELLED ***',
            cancelFooter: '>> DO NOT PREPARE - ALL CANCELLED <<',
            items: printedItems.map(it => ({
              quantity: it.quantity || 1,
              name: it.name || (it.menuItem && it.menuItem.name) || '',
              kitchen_station_id: it.kitchen_station_id ?? null,
              stationName: it.stationName || it.station_name,
              set_components: it.set_components
            }))
          };
          const doPrint = () => printCancellationTicketsByStation(printData, sInfo, 'Cancelled by staff')
            .catch((e: any) => console.warn('FloorPlan cancel print failed:', e && e.message));
          const _kpO: any = (settings as any)?.kitchenPrinter;
          const _stO = Object.values((settings as any)?.kitchenStationPrinters || {}).some((s: any) => s?.autoPrint);
          const _autoOnO = !!((_kpO && _kpO.enabled && _kpO.autoPrint) || _stO);
          // 2026-06-24 (Irene): 취소표 자동발행은 backend(needs_print + pending_reprint) → 인쇄 전담 POS
          // 폴러가 처리한다(누른 기기/계정 무관, 자동인쇄 계정차이 제거). 프론트 직접 발행 제거(중복 방지).
          // autoPrint(주방 master OR 스테이션) OFF 면 폴러가 안 찍으므로 수동 [Send] 프롬프트만.
          if (!_autoOnO) {
            onKitchenTicketSent && onKitchenTicketSent({
              run: doPrint, autoSent: false, ticketType: '*** ORDER CANCELLED ***',
              description: t('orderCancel.pressSend', 'Order {{orderNumber}} — press [Send] to dispatch to kitchen', { orderNumber: printData.orderNumber }),
              stations: previewStationBuckets(printData.items, settings)
            });
          } else if (cancelJson.data && cancelJson.data.pending_reprint) {
            // 2026-06-25 (Irene 하이브리드): 자동모드(=인쇄 전담 POS1)면 취소표를 폴러 안 기다리고
            // 즉시 로컬 인쇄. cancelJson.data.pending_reprint(표준 ** ORDER CANCELLED ** noticeHeader)
            // 재사용 → billPrint 무변경/새 디자인 0. claim 으로 폴러와 중복 0. POS2 는 게이트로 false.
            (async () => {
              try {
                const { printOrderKitchenNow } = await import('../../utils/hybridKitchenPrint');
                const _ok = await printOrderKitchenNow(cancelJson.data, getStoreInfo);
                if (_ok) return;
              } catch (_e) { /* fall through */ }
              try { window.dispatchEvent(new CustomEvent('autoprint-poke')); localStorage.setItem('autoprint-poke', String(Date.now())); } catch {}
            })();
          }
        }
      } catch (e: any) { console.warn('FloorPlan cancel-ticket step skipped:', e?.message); }
    } catch (_) { /* silently fail */ }
    setLoading(false);
  };

  const handleCancelOrder = () => {
    if (!statusInfo?.orderId) return;
    const mode = (operationSettings as any)?.requireCancelReason || 'required';
    if (mode === 'off') {
      // 사유 없이 취소 — requireVoidPin 매장은 PIN 게이트, 아니면 단순 확인.
      if ((operationSettings as any)?.requireVoidPin) {
        setVoidGate({ run: (pin: string) => performCancelOrder(pin, '') });
        return;
      }
      setConfirmModal({
        title: 'Cancel Order',
        message: 'Are you sure you want to cancel this order? This action cannot be undone.',
        onConfirm: () => { setConfirmModal(null); performCancelOrder(null, ''); }
      });
      return;
    }
    // optional / required: 사유 먼저 받는다(LiveOrders 와 동일 흐름). 이후 PIN 게이트.
    setCancelReasonOpen(true);
  };
  const beginCancelWithReason = (reason: string) => {
    setCancelReasonOpen(false);
    if ((operationSettings as any)?.requireVoidPin) {
      setVoidGate({ run: (pin: string) => performCancelOrder(pin, reason) });
    } else {
      performCancelOrder(null, reason);
    }
  };

  const handleRevertStatus = async () => {
    if (!statusInfo?.orderId || loading) return;
    // Special case: pending → outstanding (same as LiveOrders)
    const prevStatus = orderStatus === 'pending' ? 'outstanding' : getPreviousStatus(orderStatus);
    if (!prevStatus) return;
    setLoading(true);
    try {
      // §15-5 ⑫ 오프라인: set_stage op(updateData = { status }). 온라인 경로 무변경.
      if (isOffline && isOfflineMainPos()) {
        const { recordOfflineOp } = await import('../../utils/offlineOps');
        await recordOfflineOp('set_stage', { serverId: statusInfo.orderId as any }, { status: prevStatus });
        onOrderUpdated();
        setLoading(false);
        return;
      }
      const token = getAuthToken();
      await fetch(`/api/orders/${statusInfo.orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: prevStatus })
      });
      onOrderUpdated();
    } catch (_) { /* silently fail */ }
    setLoading(false);
  };

  // Payment verification modal state
  const [showPaymentProofModal, setShowPaymentProofModal] = useState<'verify' | 'view' | false>(false);
  // 결제 검증 실패 사유 — 모달 **안에** 표시(패널 배너는 모달 뒤라 안 보인다).
  const [payVerifyError, setPayVerifyError] = useState<string | null>(null);

  const handleConfirmPaymentClick = () => {
    setPayVerifyError(null);
    setShowPaymentProofModal('verify');
  };

  // 2026-08-19 (with MIN #260819-010): "confirm payment 버튼이 눌리지가 않아" 수리.
  // 근본 = 요청이 무응답이면 공용 Button 의 async 가드(중복결제 방지)가 promise settle 을 기다리며
  // 버튼을 **영구 비활성**으로 잠그고, 실패는 catch 무음이라 아무 표시도 없었다.
  // → ①fetchWithTimeout 으로 반드시 settle ②res.ok 확인 후 실패면 모달 유지 + 사유 표시
  //   ③결제는 됐는데 주방 전송(/status)만 실패한 경우를 구분. 결제 로직·인쇄 경로는 무변경.
  const PAY_VERIFY_TIMEOUT_MS = 15000;
  const payVerifyMsg = (error: any): string =>
    error?.name === 'AbortError'
      ? 'No response from the server. Check the connection and try again.'
      : (error?.message || 'Network error. Check the connection and try again.');

  const handleConfirmPayment = async () => {
    if (!statusInfo?.orderId) {
      setPayVerifyError('Order details could not be loaded. Refresh and try again.');
      return;
    }
    // §15-5 ⑯ 모바일 결제 증빙 검증은 서버 필요(비범위 §15-8) — 오프라인 비활성, op 미기록.
    if (isOffline && isOfflineMainPos()) {
      setPayVerifyError('Payment verification needs a connection. Please retry when back online.');
      return;
    }
    setPayVerifyError(null);
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetchWithTimeout(`/api/orders/${statusInfo.orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ payment_status: 'completed' })
      }, PAY_VERIFY_TIMEOUT_MS);
      const json = await res.json().catch(() => ({} as any));
      if (!res.ok || json?.success === false) {
        setPayVerifyError(json?.message || json?.error?.message || `Server rejected the request (${res.status}).`);
        setLoading(false);
        return;                                  // 모달 유지 → 같은 증빙으로 재시도 가능
      }
      // 결제 완료 후 outstanding이면 pending으로 변경 (주방에 전송) — LiveOrders와 동일
      if (orderStatus === 'outstanding') {
        const sres = await fetchWithTimeout(`/api/orders/${statusInfo.orderId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ status: 'pending' })
        }, PAY_VERIFY_TIMEOUT_MS).catch(() => null);
        if (!sres || !sres.ok) {
          // 결제는 기록됨 — 주방 전송만 실패. 조용히 넘기면 티켓이 안 나간다.
          setShowPaymentProofModal(false);
          onOrderUpdated();
          offlineNotice('Kitchen dispatch failed', 'Payment was confirmed, but the order was not sent to the kitchen. Move the stage manually.');
          setLoading(false);
          return;
        }
      }
      setShowPaymentProofModal(false);
      onOrderUpdated();
    } catch (error: any) {
      setPayVerifyError(payVerifyMsg(error));
      console.error('Error confirming payment:', error);
    }
    setLoading(false);
  };

  const handleRejectPayment = async () => {
    if (!statusInfo?.orderId) {
      setPayVerifyError('Order details could not be loaded. Refresh and try again.');
      return;
    }
    // §15-5 ⑯ 모바일 결제 증빙 거절도 서버 필요 — 오프라인 비활성, op 미기록.
    if (isOffline && isOfflineMainPos()) {
      setPayVerifyError('Payment verification needs a connection. Please retry when back online.');
      return;
    }
    setPayVerifyError(null);
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetchWithTimeout(`/api/orders/${statusInfo.orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ payment_status: 'rejected', status: 'outstanding' })
      }, PAY_VERIFY_TIMEOUT_MS);
      const json = await res.json().catch(() => ({} as any));
      if (!res.ok || json?.success === false) {
        setPayVerifyError(json?.message || json?.error?.message || `Server rejected the request (${res.status}).`);
        setLoading(false);
        return;
      }
      setShowPaymentProofModal(false);
      onOrderUpdated();
    } catch (error: any) {
      setPayVerifyError(payVerifyMsg(error));
      console.error('Error rejecting payment:', error);
    }
    setLoading(false);
  };

  const buildOrderDataForPrint = () => {
    if (!statusInfo) return null;
    return {
      orderNumber: statusInfo.orderNumber || '',
      pickupNumber: (statusInfo.orderNumber || '').split('-')[1] || '',
      tableNumber: tableNumber || null,
      pagerNumber: null,
      date: statusInfo.orderCreatedAt ? new Date(statusInfo.orderCreatedAt) : new Date(),
      items: items.map((item: any) => {
        let itemOptions = item.options || [];
        if (typeof itemOptions === 'string') {
          try { itemOptions = JSON.parse(itemOptions); } catch (_) { itemOptions = []; }
        }
        if (!Array.isArray(itemOptions)) itemOptions = [];
        return {
          menuItem: {
            name: item.name || 'Unknown Item',
            price: parseFloat(item.price || '0'),
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items || []
          },
          quantity: item.quantity || 1,
          options: itemOptions
        };
      }),
      subtotal: parseFloat(String(statusInfo.subtotal || 0)),
      discount: parseFloat(String(statusInfo.discount || 0)),
      coupon: statusInfo.couponCode ? {
        code: statusInfo.couponCode,
        discount: parseFloat(String(statusInfo.couponDiscount || 0))
      } : null,
      serviceCharge: parseFloat(String(statusInfo.serviceCharge || 0)),
      serviceChargeRate: parseFloat(String(statusInfo.serviceChargeRate || 10)),
      tax: parseFloat(String(statusInfo.tax || 0)),
      taxRate: parseFloat(String(statusInfo.taxRate || 6)),
      total: parseFloat(String(statusInfo.totalAmount || 0)),
      paymentMethod: statusInfo.paymentMethod || 'cash',
      amountReceived: 0,
      change: 0,
      cashierName: statusInfo.cashierName || null
    };
  };

  const buildKitchenDataForPrint = (printItems?: any[], groupLabel?: string) => {
    if (!statusInfo) return null;
    const itemsToPrint = printItems || items;
    return {
      orderNumber: statusInfo.orderNumber || '',
      pickupNumber: (statusInfo.orderNumber || '').split('-')[1] || '',
      date: statusInfo.orderCreatedAt ? new Date(statusInfo.orderCreatedAt) : new Date(),
      orderType: statusInfo.orderType || 'dine_in',
      orderSource: statusInfo.orderSource || 'pos',
      tableNumber: tableNumber || null,
      pagerNumber: null,
      customerName: statusInfo.customerName || 'Walk-in Customer',
      groupLabel: groupLabel,
      items: itemsToPrint.map((item: any) => {
        let itemOptions = item.options || [];
        if (typeof itemOptions === 'string') {
          try { itemOptions = JSON.parse(itemOptions); } catch (_) { itemOptions = []; }
        }
        if (!Array.isArray(itemOptions)) itemOptions = [];
        return {
          menuItem: {
            name: item.name || 'Unknown Item',
            price: parseFloat(item.price || '0'),
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items || []
          },
          quantity: item.quantity || 1,
          options: itemOptions,
          // 2026-06-04 (Irene): carry station + set components so the manual reprint
          // routes to EACH kitchen station and renders set components/options exactly
          // like the order-complete popup + auto-print (single content source).
          kitchen_station_id: item.kitchen_station_id ?? (item.menuItem && item.menuItem.kitchen_station_id) ?? null,
          stationName: item.stationName || item.station_name || undefined,
          set_components: item.set_components
        };
      }),
      notes: statusInfo.notes || '',
      takeawayCharge: 0
    };
  };

  const handlePrintBill = async () => {
    const orderData = buildOrderDataForPrint();
    if (!orderData || items.length === 0) return;
    await printBillViaRawBT(orderData, getStoreInfo(), undefined, true);
  };

  const handlePrintKitchenTicket = async () => {
    const orderData = buildKitchenDataForPrint();
    if (!orderData || items.length === 0) return;
    await printKitchenTicketViaRawBT(orderData, getStoreInfo(), undefined, true);
  };

  const handlePrintLatestGroupTicket = async () => {
    if (items.length === 0) return;
    const groups = items.map((item: any) => item.order_group || 0);
    const latestGroup = Math.max(...groups);
    if (latestGroup === 0) {
      handlePrintKitchenTicket();
      return;
    }
    const latestGroupItems = items.filter((item: any) => (item.order_group || 0) === latestGroup);
    const orderData = buildKitchenDataForPrint(latestGroupItems, `+Order ${latestGroup}`);
    if (!orderData) return;
    await printKitchenTicketViaRawBT(orderData, getStoreInfo(), undefined, true);
  };

  // 통합 오더티켓 수동 인쇄 (Irene 2026-06-23) — 전체 주문 한 장을 "누른 이 포스"의 빌 프린터로.
  // 🔒 billPrint 무수정: 자동발행(sendUnifiedTickets)과 동일한 통합티켓을 exported 빌더로 만들고,
  // printSettlementReport(이 디바이스 활성 빌 프린터로 보내는 범용 함수, bill 스코프)로 출력 →
  // 인쇄 방식/라우팅(생명선) 무접촉, 트리거만 추가. 토글 켠 포스가 아니라 누른 포스로 나간다.
  const handlePrintConsolidatedTicket = async () => {
    const orderData = buildKitchenDataForPrint();
    if (!orderData || items.length === 0) return;
    const settings = getPrinterSettings();
    const wsId = getActiveWorkstationId();
    const ws = (settings.workstations || []).find((w: any) => w && w.id === wsId);
    const label = String(ws?.name || getActiveBillPrinter()?.name || 'COUNTER').toUpperCase();
    const tagged = tagTicketWithStations(orderData, label, settings);
    const ticket = { ...tagged, groupLabel: label, printedAt: label, noStationBox: true, showItemStations: true };
    await printSettlementReport(generateHTMLKitchenTicket(ticket, getStoreInfo()), generateKitchenTicketContent(ticket, getStoreInfo()));
  };

  const handlePrintQR = async () => {
    if (qrLoading) return;
    setQrLoading(true);
    try {
      const token = getAuthToken();
      let qrData = activeQr; // 만료된 세션이면 재사용하지 않고 새로 발행

      if (!qrData) {
        // No active QR → create new one
        const res = await fetch(`/api/restaurants/${restaurantId}/tables/${tableNumber}/qr`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            qrData = result.data;
            setQrSession(result.data);
          }
        }
      }

      // Print existing or newly created QR
      if (qrData) {
        const storeInfo = getStoreInfo();
        const storeName = storeInfo?.name || 'Restaurant';
        const QRCode = (await import('qrcode')).default;
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, qrData.qr_url, { width: 200, margin: 2 });
        // Cashless = cash 결제수단이 명시적으로 비활성. QR 인쇄물에 손님이 보도록 표시.
        const cashless = !!(paymentSettings && paymentSettings.cash && paymentSettings.cash.enabled === false);
        const printed = await printTableQR(tableNumber, canvas, storeName, qrData.expires_at, timezone, cashless);
        if (!printed) {
          // 2026-05-29: 자동 진단 이메일 발송 제거 (매장 요청). 실패 시 화면 안내만
          // 표시하고, 필요하면 Settings → Printer 의 수동 진단 버튼으로 보고한다.
          setQrError('QR print failed via the configured printer method. Check Settings → Printer (QZ Tray / address / connection) — the QR may need a printer that supports raster images.');
        }
      }
    } catch (err) {
      console.error('Failed to print QR:', err);
      setQrError('Failed to print QR. Please try again.');
    }
    setQrLoading(false);
  };

  const handleExpireQR = async () => {
    if (qrLoading) return;
    setQrLoading(true);
    try {
      const token = getAuthToken();
      await fetch(`/api/restaurants/${restaurantId}/tables/${tableNumber}/qr`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setQrSession(null);
    } catch (err) {
      console.error('Failed to expire QR:', err);
    }
    setQrLoading(false);
  };

  const previousStatus = orderStatus === 'pending' ? 'outstanding' : getPreviousStatus(orderStatus);
  const hasAddedItems = items.some((item: any) => (item.order_group || 0) > 0);

  const rawProof = statusInfo?.paymentProof || (statusInfo as any)?.payment_proof || null;
  const paymentProof = getProofCurrent(rawProof);
  const proofHistory = getProofHistory(rawProof);

  const panelInner = (
    <Panel $expanded={!!expanded}>
      {qrError && (
        <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, margin: '8px 12px', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{qrError}</span>
          <button type="button" onClick={() => setQrError(null)} style={{ background: 'transparent', border: 0, color: '#DC2626', cursor: 'pointer', fontSize: 16 }} aria-label="Dismiss">×</button>
        </div>
      )}
      {/* Payment Proof Verification Modal */}
      <Modal
        isOpen={!!showPaymentProofModal}
        onClose={() => { setShowPaymentProofModal(false); setPayVerifyError(null); }}
        title={showPaymentProofModal === 'verify' ? 'Payment Verification' : 'Customer Submitted Proof'}
        size="small"
        footer={showPaymentProofModal === 'verify' ? (
          <>
            <RejectButton variant="secondary" onClick={handleRejectPayment} disabled={loading}>{'Reject'}</RejectButton>
            <ConfirmPayButton variant="primary" onClick={handleConfirmPayment} disabled={loading}>{'Confirm Payment'}</ConfirmPayButton>
          </>
        ) : undefined}
      >
        {payVerifyError && (
          <div data-testid="verify-error" style={{ marginBottom: '16px', padding: '10px 12px', background: '#FEF2F2', border: '1px solid #EF4444', borderRadius: '6px', color: '#B91C1C', fontSize: '13px' }}>
            {payVerifyError}
          </div>
        )}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: 'var(--pos-text-muted, #4B5563)', marginBottom: '6px' }}>Order: <strong style={{ color: 'var(--pos-text, #0A2540)' }}>#{statusInfo?.orderNumber}</strong></div>
          <div style={{ fontSize: '14px', color: 'var(--pos-text-muted, #4B5563)', marginBottom: '6px' }}>Amount: <strong style={{ color: 'var(--pos-text, #0A2540)' }}>{getCurrencySymbol(currency)} {statusInfo?.totalAmount?.toFixed(2)}</strong></div>
          <div style={{ fontSize: '14px', color: 'var(--pos-text-muted, #4B5563)' }}>Method: <strong style={{ color: 'var(--pos-text, #0A2540)' }}>{statusInfo?.paymentMethod}</strong></div>
        </div>

        <div style={{ borderTop: '1px solid var(--pos-border, #C7CED6)', paddingTop: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pos-text, #0A2540)', marginBottom: '12px' }}>{'Customer Submitted Proof'}</div>
          {paymentProof ? (
            <>
              {paymentProof.reference && (
                <div style={{ fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--pos-text-muted, #4B5563)' }}>Reference: </span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--pos-text, #0A2540)' }}>{paymentProof.reference}</span>
                </div>
              )}
              {paymentProof.file_name && (
                <div style={{ fontSize: '13px', marginBottom: '6px', color: 'var(--pos-text-muted, #4B5563)' }}>File: {paymentProof.file_name}</div>
              )}
              {paymentProof.uploaded_at && (
                <div style={{ fontSize: '12px', color: 'var(--pos-text-muted, #6B7280)', marginBottom: '6px' }}>
                  Submitted: {formatDateTime(paymentProof.uploaded_at, tzSettings)}
                </div>
              )}
              {paymentProof.image && (
                <img
                  src={paymentProof.image}
                  alt="Payment proof"
                  style={{ width: '100%', borderRadius: '6px', marginTop: '8px', cursor: 'pointer' }}
                  onClick={() => window.open(paymentProof.image, '_blank')}
                />
              )}
            </>
          ) : (
            <div style={{ fontSize: '13px', color: 'var(--pos-text-muted, #6B7280)' }}>
              {paymentStatus === 'rejected' ? 'Waiting for customer to resubmit.' : 'No payment proof submitted.'}
            </div>
          )}
        </div>

        {/* History Section */}
        {proofHistory.length > 0 && (
          <div style={{ borderTop: '1px solid var(--pos-border, #C7CED6)', paddingTop: '16px', marginTop: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pos-text-muted, #4B5563)', marginBottom: '10px' }}>
              Previous Attempts ({proofHistory.length})
            </div>
            {proofHistory.map((entry: any, idx: number) => (
              <div key={idx} style={{
                padding: '10px',
                background: 'var(--pos-surface-2, #F9FAFB)',
                borderRadius: '6px',
                marginBottom: idx < proofHistory.length - 1 ? '8px' : 0,
                border: '1px solid var(--pos-border, #C7CED6)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 600 }}>Rejected #{entry.reject_count || idx + 1}</span>
                  {entry.rejected_at && (
                    <span style={{ fontSize: '11px', color: 'var(--pos-text-muted, #6B7280)' }}>{formatDateTime(entry.rejected_at, tzSettings)}</span>
                  )}
                </div>
                {entry.reference && (
                  <div style={{ fontSize: '12px', color: 'var(--pos-text-muted, #4B5563)' }}>
                    Ref: <span style={{ fontFamily: 'monospace' }}>{entry.reference}</span>
                  </div>
                )}
                {entry.image && (
                  <img
                    src={entry.image}
                    alt={`Previous proof #${idx + 1}`}
                    style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: '4px', marginTop: '6px', cursor: 'pointer' }}
                    onClick={() => window.open(entry.image, '_blank')}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Modal>

      <PanelHeader>
        <TableTitle>
          {tableNumber ? (
            <h3>Table {getTableLabel(tableNumber, floorPlan).display}</h3>
          ) : (
            <h3>Takeaway · {statusInfo?.orderNumber || (statusInfo?.orderId ? `#${statusInfo.orderId}` : '')}</h3>
          )}
          {/* 2026-06-25 (Irene 10인치): 메타(seats·min) + 상태/결제 배지를 한 줄(wrap)로 → 헤더 2줄. */}
          <HeaderMetaRow>
            {tableNumber && statusInfo?.guestCount ? (
              <span>{statusInfo.guestCount} guests</span>
            ) : tableNumber && tableInfo ? (
              <span>{tableInfo.seats} seats</span>
            ) : null}
            {isOccupied && <span>{statusInfo!.elapsedMinutes}min</span>}
            {isOccupied ? (
              <>
                <StatusBadge $color={statusColors.text} $bg={statusColors.bg}>
                  {STATUS_LABELS[orderStatus] || statusInfo!.status}
                </StatusBadge>
                <StatusBadge $color={paymentStatusColors.color} $bg={paymentStatusColors.bg}>
                  {paymentStatus === 'completed' || paymentStatus === 'paid' ? 'Paid' :
                   paymentStatus === 'rejected' ? 'Rejected' :
                   paymentStatus === 'payment_verification_pending' ? 'Verifying' : 'Unpaid'}
                </StatusBadge>
                {operationSettings?.prepTimeTracking && ['pending', 'preparing', 'ready'].includes(orderStatus) && (() => {
                  // 주문단위 타이머 — 테이블 전체가 얼마나 기다렸나(목표=주문 준비시간). 단일 소스 prepTimer.
                  const prep = computePrepFromElapsed(statusInfo!.elapsedMinutes || 0, Number(operationSettings?.defaultPreparationTime) || 15, Number(operationSettings?.prepUrgentThreshold) || 80);
                  return prep ? <PrepTimerChip prep={prep} /> : null;
                })()}
              </>
            ) : (
              <StatusBadge $color={statusColors.text} $bg={statusColors.bg}>{'Available'}</StatusBadge>
            )}
          </HeaderMetaRow>
        </TableTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          {/* 2026-06-28 (FloorPlan): 큰 팝업 ↔ 측면패널 전환 */}
          {onToggleExpand && (
            <CloseBtn
              type="button"
              onClick={onToggleExpand}
              title={expanded ? 'Shrink to side panel' : 'Open as large popup'}
              aria-label={expanded ? 'Shrink panel' : 'Expand panel'}
            >
              {expanded ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 14h6v6m10-10h-6V4M14 10l7-7M3 21l7-7"/></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/></svg>
              )}
            </CloseBtn>
          )}
          <CloseBtn onClick={onClose}>&times;</CloseBtn>
        </div>
      </PanelHeader>

      {/* Multi-order tabs — 주문 여러 개거나, 빈 테이블이라도 오늘 완료 이력이 있으면 표시 */}
      {(showOrderTabs !== undefined ? showOrderTabs : orders.length > 1) && (
        <div style={{
          padding: '8px 20px',
          borderBottom: '1px solid var(--pos-border, #C7CED6)',
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
          background: 'var(--pos-surface-2, #F9FAFB)'
        }}>
          {/* 빈 테이블: 완료 탭을 본 뒤 다시 "빈 테이블/새주문"으로 돌아오는 탭. 기본 선택. */}
          {tableFree && (
            <button
              onClick={() => onOrderIndexChange?.(-1)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: selectedOrderIndex < 0 ? 600 : 400,
                border: selectedOrderIndex < 0 ? '1.5px solid var(--pos-brand, #635BFF)' : '1px solid var(--pos-border, #6B7280)',
                background: selectedOrderIndex < 0 ? 'var(--pos-brand-tint, #EDE9FE)' : 'var(--pos-surface, white)',
                color: selectedOrderIndex < 0 ? 'var(--pos-brand-text, #635BFF)' : 'var(--pos-text-muted, #4B5563)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              + New Order
            </button>
          )}
          {(showAllOrderTabs ? orders : orders.slice(0, 4)).map((order, idx) => (
            <button
              key={order.orderId || idx}
              onClick={() => onOrderIndexChange?.(idx)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: selectedOrderIndex === idx ? 600 : 400,
                border: selectedOrderIndex === idx ? '1.5px solid var(--pos-brand, #635BFF)' : '1px solid var(--pos-border, #6B7280)',
                background: selectedOrderIndex === idx ? 'var(--pos-brand-tint, #EDE9FE)' : 'var(--pos-surface, white)',
                color: selectedOrderIndex === idx ? 'var(--pos-brand-text, #635BFF)' : 'var(--pos-text-muted, #4B5563)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              #{order.orderNumber?.split('-')[1] || idx + 1}
              {order.paymentStatus === 'paid' || order.paymentStatus === 'completed'
                ? ' ✓'
                : ''}
            </button>
          ))}
          {orders.length > 4 && (
            <button
              onClick={() => setShowAllOrderTabs(v => !v)}
              style={{
                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                border: '1px solid var(--pos-border, #6B7280)', background: 'var(--pos-surface, white)', color: 'var(--pos-text-muted, #4B5563)',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              {showAllOrderTabs ? '− Less' : `+${orders.length - 4}`}
            </button>
          )}
        </div>
      )}

      {isOccupied ? (
        showAddItemsView ? (
          /* ─── Add Items View (like LiveOrders) ─── */
          <>
            <PanelBody style={{ padding: '16px 20px' }}>
              {/* Search Input */}
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={addItemsSearchQuery}
                  onChange={(e) => setAddItemsSearchQuery(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: '2px solid var(--pos-border, #C7CED6)', borderRadius: '8px',
                    background: 'var(--pos-surface, white)', color: 'var(--pos-text, #0A2540)',
                    fontSize: '14px', outline: 'none', transition: 'border-color 0.15s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--pos-brand, #635BFF)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--pos-border, #C7CED6)'; }}
                  autoFocus
                />
              </div>

              {/* Search Results */}
              {addItemsSearchQuery.length > 0 && (
                <div style={{ marginBottom: '16px', maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--pos-border, #C7CED6)', borderRadius: '8px' }}>
                  {menuItems
                    .filter((item: any) => {
                      if (!item || !item.name) return false;
                      const q = addItemsSearchQuery.toLowerCase();
                      return item.name.toLowerCase().includes(q) || (item.code && item.code.toLowerCase().includes(q));
                    })
                    .slice(0, 15)
                    .map((item: any) => {
                      const hasOptions = Array.isArray(item.optionGroups) && item.optionGroups.length > 0;
                      return (
                        <div key={item.id} style={{
                          padding: '10px 14px', display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center', borderBottom: '1px solid var(--pos-border, #F1F4F8)', cursor: 'pointer'
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--pos-surface-2, #F9FAFB)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }} onClick={() => {
                            handleAddToItemsCart(item, 1, []);
                            setAddItemsSearchQuery('');
                          }}>
                            <span style={{ fontWeight: 500, fontSize: '13px' }}>
                              {item.code ? `${item.code} ` : ''}{item.name}
                            </span>
                            {item.is_set_menu && (
                              <span style={{ marginLeft: '6px', fontSize: '10px', background: '#EDE9FE', color: '#7C3AED', padding: '1px 5px', borderRadius: '3px' }}>{'SET'}</span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                            <span style={{ color: 'var(--pos-brand, #635BFF)', fontWeight: 500, fontSize: '13px' }}>
                              {formatCurrency(parseFloat(item.price) || 0, currency)}
                            </span>
                            {hasOptions && (
                              <button onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMenuItemForOption(item);
                                setShowOptionModal(true);
                              }} style={{
                                padding: '3px 8px', fontSize: '11px', background: '#FEF3C7',
                                color: '#D97706', border: '1px solid #FCD34D', borderRadius: '4px',
                                cursor: 'pointer', fontWeight: 500
                              }}>{'Options'}</button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  {menuItems.filter((item: any) => {
                    const q = addItemsSearchQuery.toLowerCase();
                    return item.name?.toLowerCase().includes(q) || (item.code && item.code.toLowerCase().includes(q));
                  }).length === 0 && (
                    <div style={{ padding: '14px', textAlign: 'center', color: 'var(--pos-text-muted, #6B7280)', fontSize: '13px' }}>{'No items found'}</div>
                  )}
                </div>
              )}

              {/* Cart — Items to Add */}
              <div>
                <SectionTitle style={{ marginBottom: '10px' }}>
                  Items to Add ({addItemsCart.reduce((sum: number, item: any) => sum + item.quantity, 0)})
                </SectionTitle>
                {addItemsCart.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'var(--pos-text-muted, #6B7280)', background: 'var(--pos-surface-2, #F9FAFB)', borderRadius: '8px', fontSize: '13px' }}>
                    Search and select items to add
                  </div>
                ) : (
                  <div style={{ border: '1px solid var(--pos-border, #C7CED6)', borderRadius: '8px', overflow: 'hidden' }}>
                    {addItemsCart.map((item: any) => (
                      <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid var(--pos-border, #F1F4F8)' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 500, fontSize: '13px' }}>{item.name}</div>
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <div style={{ fontSize: '11px', color: 'var(--pos-text-muted, #4B5563)', marginTop: '1px' }}>
                              {item.selectedOptions.map((opt: any) => opt.name).join(', ')}
                            </div>
                          )}
                          <div style={{ color: 'var(--pos-text-muted, #4B5563)', fontSize: '12px' }}>
                            {formatCurrency(item.unitPrice || parseFloat(item.price), currency)} each
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <button onClick={() => handleRemoveFromItemsCart(item.cartId)}
                            style={{ width: '28px', height: '28px', border: '1px solid var(--pos-border, #C7CED6)', borderRadius: '6px', background: 'var(--pos-surface, white)', color: 'var(--pos-text, #0A2540)', cursor: 'pointer', fontSize: '16px', fontWeight: 500 }}>-</button>
                          <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600, fontSize: '14px' }}>{item.quantity}</span>
                          <button onClick={() => handleIncreaseCartItem(item.cartId)}
                            style={{ width: '28px', height: '28px', border: '1px solid var(--pos-border, #C7CED6)', borderRadius: '6px', background: 'var(--pos-surface, white)', color: 'var(--pos-text, #0A2540)', cursor: 'pointer', fontSize: '16px', fontWeight: 500 }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PanelBody>

            {/* Add Items Footer */}
            <ActionGroup>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>
                  Total: {formatCurrency(
                    addItemsCart.reduce((sum: number, item: any) => sum + ((item.unitPrice || parseFloat(item.price)) * item.quantity), 0),
                    currency
                  )}
                </span>
              </div>
              <ActionBtn
                $variant="primary"
                onClick={handleSubmitAddItems}
                disabled={addItemsCart.length === 0 || isAddingItems}
              >
                {isAddingItems ? 'Adding...' : 'Add to Order'}
              </ActionBtn>
              <ActionBtn $variant="secondary" onClick={() => {
                setShowAddItemsView(false);
                setAddItemsCart([]);
                setAddItemsSearchQuery('');
              }}>
                Cancel
              </ActionBtn>
            </ActionGroup>
          </>
        ) : (
          /* ─── Normal Order Detail View ─── */
          <>
            <PanelBody>
              {/* Customer & Order Info */}
              <Section>
                <SectionTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span>
                    Order {statusInfo!.orderNumber || ''}
                    {statusInfo!.customerName && statusInfo!.customerName !== 'Walk-in Customer'
                      ? ` — ${statusInfo!.customerName}`
                      : ''}
                  </span>
                  {statusInfo!.orderId && (
                    <button
                      type="button"
                      onClick={() => setShowHistory(true)}
                      style={{
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: 'var(--pos-text-muted, #4B5563)', fontSize: 11, padding: '2px 4px', fontWeight: 500
                      }}
                      title={t('history.viewLink', 'View history')}
                    >
                      {t('history.viewLink', 'View history')}
                    </button>
                  )}
                </SectionTitle>
                {statusInfo!.orderId && <TableMoveTrail orderId={statusInfo!.orderId} />}
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>{'Customer'}</InfoLabel>
                    {/* "Walk-in Customer" → "Walk-in" (항목이 Customer 라 중복 제거) */}
                    <InfoValue>{(!statusInfo!.customerName || statusInfo!.customerName === 'Walk-in Customer') ? 'Walk-in' : statusInfo!.customerName}</InfoValue>
                  </InfoItem>
                  {/* 실제 전화번호(숫자 포함)일 때만 — 없거나 source 값이 잘못 들어온 경우 숨김 */}
                  {statusInfo!.customerPhone && /\d/.test(String(statusInfo!.customerPhone)) && (
                    <InfoItem>
                      <InfoLabel>{'Phone'}</InfoLabel>
                      <InfoValue>{statusInfo!.customerPhone}</InfoValue>
                    </InfoItem>
                  )}
                  {/* Type 제거 — Floor Plan 은 모두 dine-in, takeaway 는 Takeout 리스트(별도). 품목별 takeaway 는 아래 줄에 표시. */}
                  <InfoItem>
                    <InfoLabel>{'Source'}</InfoLabel>
                    <InfoValue>{SOURCE_LABELS[statusInfo!.orderSource || 'pos'] || statusInfo!.orderSource}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>{'Time'}</InfoLabel>
                    <InfoValue style={{ whiteSpace: 'nowrap' }}>{formatDT(statusInfo!.orderCreatedAt)}</InfoValue>
                  </InfoItem>
                  {/* Payment 제거 — 결제상태(unpaid/pending)는 패널 상단 헤더 배지에 이미 표시(중복). */}
                  {paymentProof && (
                    <InfoItem>
                      <InfoLabel>{'Receipt'}</InfoLabel>
                      <InfoValue>
                        <span
                          onClick={() => setShowPaymentProofModal('view')}
                          style={{ color: 'var(--pos-brand, #635BFF)', cursor: 'pointer', fontWeight: 500 }}
                        >
                          View →
                        </span>
                      </InfoValue>
                    </InfoItem>
                  )}
                  {statusInfo!.cashierName && (
                    <InfoItem>
                      <InfoLabel>{'Cashier'}</InfoLabel>
                      <InfoValue>{statusInfo!.cashierName}</InfoValue>
                    </InfoItem>
                  )}
                </InfoGrid>
              </Section>

              {/* Order Items with Served Checkbox */}
              <Section>
                <SectionTitle>
                  {t('floorplan:tableDetailPanel.items', 'Items')} ({items.length})
                  {showServedCheckbox && items.length > 0 && ' — ' + t(
                    'floorplan:tableDetailPanel.itemStatus.servedCount',
                    { served: items.filter((i: any) => i.status === 'served' || i.status === 'completed').length, total: items.length }
                  )}
                </SectionTitle>

                {groupKeys.map(groupNum => {
                  const groupItems = groupedItems[groupNum];
                  const isAdded = groupNum > 0;
                  const firstItem = groupItems[0];

                  return (
                    <div key={groupNum}>
                      {(groupKeys.length > 1 || isAdded) && (
                        <GroupHeader $isAdded={isAdded}>
                          <span>{isAdded ? `+Added #${groupNum}` : 'Original Order'}</span>
                          {isAdded && firstItem?.added_at && (
                            <span style={{ fontSize: '9px', fontWeight: 400, color: 'var(--pos-text-muted, #6B7280)' }}>
                              {formatDT(firstItem.added_at)}
                            </span>
                          )}
                        </GroupHeader>
                      )}
                      {groupItems.map((item: any) => {
                        const originalIndex = item._originalIndex as number;
                        const displayStatus = toDisplayStatus(item.status);
                        const isServed = displayStatus === 'served';
                        // 활성 주문이면 단계 무관하게 홀 직원이 Served 토글 가능 (KDS 표시전용 매장 지원)
                        const clickable = showServedCheckbox;
                        const badgeLabel = t(`floorplan:tableDetailPanel.itemStatus.${displayStatus}`);
                        const badgeTitle = clickable
                          ? (isServed
                              ? t('floorplan:tableDetailPanel.itemStatus.unmarkServed')
                              : t('floorplan:tableDetailPanel.itemStatus.markServed'))
                          : t('floorplan:tableDetailPanel.itemStatus.waitingKitchen');
                        const optionsStr = Array.isArray(item.options)
                          ? item.options.map((o: any) => typeof o === 'string' ? o : o?.name || '').filter(Boolean).join(', ')
                          : '';

                        // 세트 → 구성품 각각 단계 pill(주방·서빙 리스트와 동일). 구성품별 토글 + 부모 롤업.
                        // 2026-07-01 (Irene, KDS↔플로어플랜 세트 단계 불일치): 구성(이름/옵션)은 set_components 를
                        // 쓰되, cooking 단계는 set_items[동일 index] 에서 폴백한다(KDS 가 단계를 set_items 에 쓰기 때문).
                        // set_components 엔 단계가 없어 그대로 읽으면 부모 status(대개 pending)로 보여 KDS 와 어긋났다.
                        // KDS processRawOrderItems(775) 와 동일 규칙으로 통일.
                        const _compsRaw = (Array.isArray(item.set_components) && item.set_components.length) ? item.set_components : null;
                        const _setItemsRaw = Array.isArray(item.set_items) ? item.set_items : [];
                        const setComps = _compsRaw
                          ? _compsRaw.map((c: any, ci: number) => ({ ...c, status: c.status ?? _setItemsRaw[ci]?.status }))
                          : ((item.is_set_menu && _setItemsRaw.length) ? _setItemsRaw : null);
                        if (setComps) {
                          const servedN = setComps.filter((c: any) => toDisplayStatus(String(c.status || item.status)) === 'served').length;
                          return (
                            <div key={originalIndex} style={{ marginBottom: 4 }}>
                              <ItemRow $completed={false}>
                                {productLookup && <span style={{ marginRight: 8, display: 'flex', flexShrink: 0 }}><MenuThumb src={productLookup(item.product_id, item.name)?.thumb} name={item.name} size={24} /></span>}
                                <ItemInfo>
                                  <ItemName $completed={false}>
                                    {item.name} <ItemQty>x{item.quantity}</ItemQty>
                                    <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 800, color: '#fff', background: 'var(--pos-brand, #635BFF)', borderRadius: 4, padding: '1px 6px' }}>
                                      {t('floorplan:itemList.setBadge', { defaultValue: 'SET' })} {servedN}/{setComps.length}
                                    </span>
                                  </ItemName>
                                </ItemInfo>
                                <ItemPrice>{formatCurrency(item.price * item.quantity, currency)}</ItemPrice>
                                {canVoid && paymentStatus !== 'completed' && items.length > 1 && (
                                  <DeleteItemBtn onClick={() => handleDeleteItem(originalIndex, item.name, Number(item.quantity) || 1)} title="Delete item">&times;</DeleteItemBtn>
                                )}
                              </ItemRow>
                              {setComps.map((c: any, ci: number) => {
                                const cds = toDisplayStatus(String(c.status || item.status));
                                const cServed = cds === 'served';
                                const copts = (Array.isArray(c.options) ? c.options : []).map((o: any) => typeof o === 'string' ? o : o?.name || '').filter(Boolean).join(', ');
                                return (
                                  <ItemRow key={ci} $completed={cServed && showServedCheckbox} style={{ paddingLeft: 14 }}>
                                    {showServedCheckbox && (
                                      <ItemStatusPill
                                        $theme={getPosTheme()}
                                        $status={cds} $clickable={clickable}
                                        onClick={() => clickable && handleToggleItemServed(originalIndex, ci)}
                                        disabled={loading || !clickable} aria-pressed={cServed}
                                        title={cServed ? t('floorplan:tableDetailPanel.itemStatus.unmarkServed') : t('floorplan:tableDetailPanel.itemStatus.markServed')}
                                      >
                                        {cServed ? '✓ ' : null}{t(`floorplan:tableDetailPanel.itemStatus.${cds}`)}
                                        {clickable && !cServed ? ` · ${t('common:itemServe.serveHint')}` : ''}
                                      </ItemStatusPill>
                                    )}
                                    {productLookup && <span style={{ marginRight: 8, display: 'flex', flexShrink: 0 }}><MenuThumb src={productLookup(c.product_id, c.name)?.thumb} name={c.name} size={24} /></span>}
                                    <ItemInfo>
                                      <ItemName $completed={cServed}>{c.name}{(c.qty || c.quantity) > 1 ? ` x${c.qty || c.quantity}` : ''}</ItemName>
                                      {copts && <ItemOptions>{copts}</ItemOptions>}
                                    </ItemInfo>
                                  </ItemRow>
                                );
                              })}
                            </div>
                          );
                        }

                        return (
                          <ItemRow key={originalIndex} $completed={isServed && showServedCheckbox}>
                            {showServedCheckbox && (
                              <ItemStatusPill
                                $theme={getPosTheme()}
                                $status={displayStatus}
                                $clickable={clickable}
                                onClick={() => clickable && handleToggleItemServed(originalIndex)}
                                disabled={loading || !clickable}
                                aria-disabled={!clickable}
                                aria-pressed={isServed}
                                title={badgeTitle}
                              >
                                {isServed ? '\u2713 ' : null}
                                {badgeLabel}
                                {clickable && !isServed ? ` \u00b7 ${t('common:itemServe.serveHint')}` : ''}
                              </ItemStatusPill>
                            )}
                            {productLookup && <span style={{ marginRight: 8, display: 'flex', flexShrink: 0 }}><MenuThumb src={productLookup(item.product_id, item.name)?.thumb} name={item.name} size={24} /></span>}
                            <ItemInfo>
                              <ItemName $completed={isServed}>
                                {item.name} <ItemQty>x{item.quantity}</ItemQty>
                                {/* #3 합본 빌 — 테이블 주문에 섞인 테이크웨이/픽업 품목을 줄에 표시(혼란 0). */}
                                {['takeaway', 'pickup', 'delivery'].includes(String(item.item_order_type || '')) && (
                                  <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: '#fff', background: '#F59E0B', padding: '1px 6px', borderRadius: 6, letterSpacing: 0.3, verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                    {t(`floorplan:itemTag.${item.item_order_type}`, { defaultValue: String(item.item_order_type).toUpperCase() })}
                                  </span>
                                )}
                              </ItemName>
                              {optionsStr && <ItemOptions>{optionsStr}</ItemOptions>}
                              {Array.isArray(item.set_components) && item.set_components.length > 0 && (
                                <ItemOptions style={{ paddingLeft: 8 }}>
                                  {item.set_components.map((c: any, ci: number) => (
                                    <div key={ci}>· {c.name}{Array.isArray(c.options) && c.options.length ? ` (${c.options.join(', ')})` : ''}</div>
                                  ))}
                                </ItemOptions>
                              )}
                            </ItemInfo>
                            <ItemPrice>
                              {formatCurrency(item.price * item.quantity, currency)}
                            </ItemPrice>
                            {canVoid && paymentStatus !== 'completed' && items.length > 1 && (
                              <DeleteItemBtn
                                onClick={() => handleDeleteItem(originalIndex, item.name, Number(item.quantity) || 1)}
                                title="Delete item"
                              >
                                &times;
                              </DeleteItemBtn>
                            )}
                          </ItemRow>
                        );
                      })}
                    </div>
                  );
                })}

                {items.length === 0 && (
                  <div style={{ fontSize: '13px', color: 'var(--pos-text-muted, #6B7280)' }}>{'No items'}</div>
                )}
              </Section>

              {/* Payment Summary */}
              <Section style={{ borderBottom: 'none' }}>
                <SectionTitle>{'Summary'}</SectionTitle>
                <SummaryRow>
                  <span>{'Subtotal'}</span>
                  <span>{formatCurrency(statusInfo!.subtotal || 0, currency)}</span>
                </SummaryRow>

                {(statusInfo!.takeawayCharge || 0) > 0 && (
                  <SummaryRow>
                    <span>{'Takeaway Charge'}</span>
                    <span>{formatCurrency(statusInfo!.takeawayCharge || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.discountPolicyAmount || 0) > 0 && (
                  <SummaryRow>
                    <span>Discount{statusInfo!.discountPolicyName ? ` (${statusInfo!.discountPolicyName})` : ''}</span>
                    <span>-{formatCurrency(statusInfo!.discountPolicyAmount || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.couponDiscount || 0) > 0 && (
                  <SummaryRow>
                    <span>Coupon{statusInfo!.couponCode ? ` (${statusInfo!.couponCode})` : ''}</span>
                    <span>-{formatCurrency(statusInfo!.couponDiscount || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.pointDiscount || 0) > 0 && (
                  <SummaryRow>
                    <span>Points{statusInfo!.pointsUsed ? ` (${statusInfo!.pointsUsed} pts)` : ''}</span>
                    <span>-{formatCurrency(statusInfo!.pointDiscount || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.discount || 0) > 0 && !statusInfo!.couponDiscount && !statusInfo!.discountPolicyAmount && !statusInfo!.pointDiscount && (
                  <SummaryRow>
                    <span>{'Discount'}</span>
                    <span>-{formatCurrency(statusInfo!.discount || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.serviceCharge || 0) > 0 && (
                  <SummaryRow>
                    <span>Svc Charge{statusInfo!.serviceChargeRate ? ` (${statusInfo!.serviceChargeRate}%)` : ''}</span>
                    <span>{formatCurrency(statusInfo!.serviceCharge || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.tax || 0) > 0 && (
                  <SummaryRow>
                    <span>Tax{statusInfo!.taxRate ? ` (${statusInfo!.taxRate}%)` : ''}</span>
                    <span>{formatCurrency(statusInfo!.tax || 0, currency)}</span>
                  </SummaryRow>
                )}

                <SummaryRow $bold style={{ marginTop: '4px', paddingTop: '6px', borderTop: '1px solid var(--pos-border, #C7CED6)' }}>
                  <span>{'Total'}</span>
                  <span>{formatCurrency(statusInfo!.totalAmount, currency)}</span>
                </SummaryRow>

                {statusInfo!.notes && (
                  <NotesBox>{statusInfo!.notes}</NotesBox>
                )}
              </Section>
            </PanelBody>

            {/* Actions */}
            <ActionGroup>
              {/* ── 항상 보임: 상태진행 + 결제확인 + Add Items/Payment (#1) ── */}
              {/* Status progression — completed/cancelled 제외. Served에서는 Complete Order 표시 */}
              {nextAction && statusInfo!.orderId && orderStatus !== 'completed' && orderStatus !== 'cancelled' && (
                <ActionBtn
                  $variant="primary"
                  onClick={() => onStatusChange(statusInfo!.orderId!, nextAction.status)}
                  disabled={loading}
                  style={
                    orderStatus === 'outstanding' ? { background: '#F59E0B', borderColor: '#F59E0B', color: 'white' } :
                    orderStatus === 'ready' ? { background: '#10B981', borderColor: '#10B981', color: 'white' } :
                    nextAction.status === 'completed' ? { background: '#6B7280', borderColor: 'var(--pos-border, #6B7280)', color: 'white' } :
                    undefined
                  }
                >
                  {nextAction.label}
                </ActionBtn>
              )}

              {/* Confirm Payment — 증빙 확인 모달 열기 (결제 권한 전용) */}
              {canTakePayment && paymentStatus === 'payment_verification_pending' && (
                <ActionBtn $variant="success" onClick={handleConfirmPaymentClick} disabled={loading}>
                  Confirm Payment
                </ActionBtn>
              )}

              <ActionRow>
                {/* Add Items (#7) — 인라인 검색카트(터치 부적합) 대신 New Order 와 동일하게 POSOverlay(풀 POS).
                    테이블에 핀되어 POS 자동머지가 기존 주문에 추가. */}
                {/* 2026-06-26 (Irene): 서브드 주문도 결제 전이면 추가 가능 — 'served' 제외. 결제완료(paymentStatus!=='pending')는 그대로 숨김. */}
                {paymentStatus === 'pending' && !['completed', 'cancelled'].includes(orderStatus) && (
                  <ActionBtn $variant="secondary" onClick={() => onNewOrder({ mergeOrderId: statusInfo!.orderId || undefined })}>
                    Add Items
                  </ActionBtn>
                )}
                {/* 2026-07-01 (Irene): 같은 테이블에 별도 새 주문. "Add Items"(현재 주문에 머지)와 구분 —
                    결제완료된 주문(스탭밀 등)이라 Add Items 가 숨어도 여기서 새 주문을 시작할 수 있다.
                    각각 독립 결제/티켓. 패널이 다중주문 탭으로 전부 보여줌(orders/selectedOrderIndex). */}
                {orderStatus !== 'cancelled' && (
                  <ActionBtn $variant="secondary" onClick={() => onNewOrder()}>
                    {t('floorplan:tableDetailPanel.newSeparateOrder', { defaultValue: 'New Order' })}
                  </ActionBtn>
                )}
                {/* Payment — LiveOrders와 동일: payment_status=pending (결제 권한 전용) */}
                {canTakePayment && paymentStatus === 'pending' && (
                  <ActionBtn
                    $variant={orderStatus === 'served' ? 'success' : 'secondary'}
                    onClick={onPayment}
                  >
                    Payment
                  </ActionBtn>
                )}
                {/* 결제 권한이 없는 직원(서버/홀·서빙 전용) — 결제버튼이 안 뜨는 자리에, 통합 오더티켓
                    인쇄 버튼을 크게 노출(Table Actions 접힘 속 작은 아이콘 대신 주 액션으로). (Irene 2026-06-23,
                    2026-06-24 서버 역할 포함 위해 !canOperatePOS → !canTakePayment) */}
                {!canTakePayment && items.length > 0 && orderStatus !== 'cancelled' && (
                  /* 2026-06-25 (Irene 10인치): 버튼명 짧게 "Print Full Order" + nowrap(2줄 방지). */
                  <ActionBtn $variant="secondary" onClick={handlePrintConsolidatedTicket} style={{ whiteSpace: 'nowrap' }}>
                    {t('floorplan:tableDetailPanel.printFullTicket', { defaultValue: 'Print Full Order' })}
                  </ActionBtn>
                )}
              </ActionRow>

              {/* ── 테이블 작업 — 접이식 (#1, 기본 접힘): 프린트/QR/Cancel/Leaved ── */}
              <ActionBtn $variant="link" type="button" onClick={() => setShowTableActions(v => !v)} style={{ marginTop: 2 }}>
                {t('floorplan:tableDetailPanel.tableActions', { defaultValue: 'Table Actions' })} {showTableActions ? '▴' : '▾'}
              </ActionBtn>
              {showTableActions && (
              <>
              {/* Print & Revert row */}
              <IconButtonGroup>
                <IconButton onClick={handlePrintBill} title="Print Bill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6,9 6,2 18,2 18,9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                  Bill
                </IconButton>
                <IconButton onClick={handlePrintKitchenTicket} title="Print Order Ticket">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  Ticket
                </IconButton>
                <IconButton onClick={handlePrintConsolidatedTicket} title="Print full order ticket to this POS">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="1"/>
                    <line x1="8" y1="8" x2="16" y2="8"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                    <line x1="8" y1="16" x2="13" y2="16"/>
                  </svg>
                  Full
                </IconButton>
                {hasAddedItems && (
                  <IconButton onClick={handlePrintLatestGroupTicket} title="+Order Ticket" style={{ background: '#FEF3C7', color: '#92400E' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 4v16m8-8H4"/>
                    </svg>
                  </IconButton>
                )}
                {previousStatus && (
                  <IconButton onClick={handleRevertStatus} title={`Revert to ${STATUS_LABELS[previousStatus] || previousStatus}`}>
                    <IconSymbol>↺</IconSymbol>
                  </IconButton>
                )}
                {/* Quick Complete — LiveOrders 동일: 결제 확정된 주문만 아이콘 버튼 */}
                {orderStatus !== 'completed' && orderStatus !== 'cancelled' && paymentStatus !== 'pending' && paymentStatus !== 'payment_verification_pending' && statusInfo!.orderId && (
                  <IconButton
                    onClick={() => onStatusChange(statusInfo!.orderId!, 'completed')}
                    title="Mark as Completed"
                  >
                    <IconSymbol>✓</IconSymbol>
                  </IconButton>
                )}
              </IconButtonGroup>
              {/* 서브 액션 — 2열 그리드(작게). Move Table/Cancel/Leaved/Reprint QR/Expire QR */}
              <SubActionGrid>
                {/* Move Table — dine-in 전용: 진행 중 주문을 다른 테이블로 이동 */}
                {tableNumber && onMoveTable && orderStatus !== 'cancelled' && orderStatus !== 'completed' && statusInfo!.orderId && (
                  <ActionBtn $variant="secondary" onClick={() => onMoveTable(statusInfo!.orderId!, tableNumber)} disabled={loading}>
                    {t('floorplan:tableDetailPanel.moveTable', { defaultValue: 'Move Table' })}
                  </ActionBtn>
                )}
                {/* Cancel Order (void 권한 전용) */}
                {canVoid && orderStatus !== 'cancelled' && orderStatus !== 'completed' && (
                  <ActionBtn $variant="danger" onClick={handleCancelOrder} disabled={loading}>
                    Cancel Order
                  </ActionBtn>
                )}
                {/* Leaved — completed 상태 테이블 비우기 */}
                {tableNumber && orderStatus === 'completed' && statusInfo!.orderId && (
                  <ActionBtn $variant="primary" onClick={() => onClearTable(statusInfo!.orderId!)} disabled={loading}>
                    Leaved
                  </ActionBtn>
                )}
                {/* QR session — Reprint / Expire */}
                {qrMode === 'session' && (
                  <ActionBtn $variant="secondary" onClick={handlePrintQR} disabled={qrLoading}>
                    {qrLoading ? 'Printing...' : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4, verticalAlign: 'middle'}}><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>{'Reprint QR'}</>}
                  </ActionBtn>
                )}
                {qrMode === 'session' && activeQr && (
                  <ActionBtn $variant="danger" onClick={handleExpireQR} disabled={qrLoading}>
                    Expire QR
                  </ActionBtn>
                )}
              </SubActionGrid>
              {qrMode === 'session' && activeQr && (
                <QRStatusInfo>
                  <div>
                    <span style={{ color: '#059669' }}>● Active QR ({qrRemainingMin}min left)</span>
                    <div style={{ fontSize: '11px', color: 'var(--pos-text-muted, #4B5563)', marginTop: '2px' }}>
                      Printed: {formatDateTime(activeQr.created_at, tzSettings, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', year: undefined })}
                      {' · '}Orders until {formatDateTime(activeQr.expires_at, tzSettings, { year: undefined, month: undefined, day: undefined, hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </QRStatusInfo>
              )}
              </>
              )}
              {/* 접이식 끝 (#1) · "Open in POS Terminal" 링크 제거 (#2) */}
            </ActionGroup>
          </>
        )
      ) : (
        <>
          {reservationInfo && (
            <div style={{
              margin: '12px 16px 0', padding: '12px 14px', borderRadius: 8,
              background: '#DBEAFE', border: '1px solid #2563EB'
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8', letterSpacing: 0.3 }}>
                {(reservationInfo.reservedLabel || 'Reserved').toUpperCase()}
              </div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: 'var(--pos-text, #0A2540)' }}>
                {reservationInfo.customerName || 'Guest'}
                {reservationInfo.guestCount ? ` · ${reservationInfo.guestCount} guests` : ''}
              </div>
              <div style={{ marginTop: 2, fontSize: 12, color: '#1D4ED8' }}>
                {'New Order will check this guest in.'}
              </div>
            </div>
          )}
          <EmptyState>
            <span style={{ fontSize: 40, opacity: 0.3 }}>&#x25CB;</span>
            <p>{reservationInfo ? 'Reserved — start order to check in' : 'This table is available'}</p>
          </EmptyState>
          <ActionGroup>
            <ActionBtn
              $variant="primary"
              onClick={() => onNewOrder({
                ...(reservationInfo?.guestCount ? { guests: Number(reservationInfo.guestCount) } : {}),
                // 이 테이블 예약을 명시적으로 체크인 → handleNewOrder 가 arrived 로 전환.
                // 백엔드가 주문 생성 시 arrived→seated 로 seat(기존 linkArrivedReservationToOrder).
                ...(reservationInfo?.reservationId ? { checkInReservationId: reservationInfo.reservationId } : {})
              })}
            >
              {reservationInfo ? 'Check in (New Order)' : 'New Order'}
            </ActionBtn>
            {qrMode === 'session' && (
            <>
            <ActionBtn $variant="secondary" onClick={handlePrintQR} disabled={qrLoading}>
              {qrLoading ? 'Printing...' : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4, verticalAlign: 'middle'}}><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>{'Print QR'}</>}
            </ActionBtn>
            {activeQr ? (
              <QRStatusInfo>
                <div>
                  <span style={{ color: '#059669' }}>● Active QR ({qrRemainingMin}min left)</span>
                  <div style={{ fontSize: '11px', color: 'var(--pos-text-muted, #4B5563)', marginTop: '2px' }}>
                    Printed: {activeQr.created_at ? formatDateTime(activeQr.created_at, tzSettings, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', year: undefined }) : 'just now'}
                    <br />Orders accepted until {formatDateTime(activeQr.expires_at, tzSettings, { year: undefined, month: undefined, day: undefined, hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <ActionBtn $variant="link" onClick={handleExpireQR} style={{ padding: '4px 8px', fontSize: '12px', width: 'auto' }}>
                  Expire
                </ActionBtn>
              </QRStatusInfo>
            ) : (
              <QRStatusInfo style={{ color: 'var(--pos-text-muted, #4B5563)', fontSize: '12px' }}>{'Print QR to generate a session-based ordering code for this table.'}</QRStatusInfo>
            )}
            </>
            )}
            {/* "Open in POS Terminal" 링크 제거 (#2) */}
          </ActionGroup>
        </>
      )}

      {/* OptionModal for Add Items (reused from POS Terminal) */}
      {selectedMenuItemForOption && (
        <OptionModal
          isOpen={showOptionModal}
          onClose={() => { setShowOptionModal(false); setSelectedMenuItemForOption(null); }}
          menuItem={{
            id: selectedMenuItemForOption.id,
            name: selectedMenuItemForOption.name,
            price: parseFloat(selectedMenuItemForOption.price) || 0,
            emoji: selectedMenuItemForOption.emoji || '',
            image: selectedMenuItemForOption.image,
            optionGroups: selectedMenuItemForOption.optionGroups
          }}
          onConfirm={(quantity: number, _selectedOptions: any, selectedOptionsData: any) => {
            handleAddToItemsCart(selectedMenuItemForOption, quantity, selectedOptionsData);
            setShowOptionModal(false);
            setSelectedMenuItemForOption(null);
            setAddItemsSearchQuery('');
          }}
        />
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <ConfirmOverlay onClick={() => setConfirmModal(null)}>
          <ConfirmBox onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>{confirmModal.title}</ConfirmTitle>
            <ConfirmMessage>{confirmModal.message}</ConfirmMessage>
            <ConfirmActions>
              <ConfirmBtn onClick={() => setConfirmModal(null)}>{'Cancel'}</ConfirmBtn>
              <ConfirmBtn $danger onClick={confirmModal.onConfirm}>{'Confirm'}</ConfirmBtn>
            </ConfirmActions>
          </ConfirmBox>
        </ConfirmOverlay>
      )}

      {/* Cancel Order — reason quick-pick (mirrors LiveOrders). Reason → void & cancel log. */}
      {cancelReasonOpen && (() => {
        const mode = (operationSettings as any)?.requireCancelReason || 'required';
        return (
        <Modal isOpen onClose={() => setCancelReasonOpen(false)} title={t('orders:orderCancel.title', { defaultValue: 'Cancel Order' })} size="small">
          <div style={{ padding: '2px' }}>
            <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--pos-text, #0A2540)', lineHeight: 1.5 }}>
              {t('orders:orderCancel.confirm', { defaultValue: 'Cancel this order? Choose a reason — it is saved to the void & cancel log. The order history is kept.' })}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[
                { key: 'soldOut', label: t('orders:voidItem.reasonSoldOut', { defaultValue: 'Sold out' }) },
                { key: 'customerChange', label: t('orders:voidItem.reasonCustomer', { defaultValue: 'Customer changed mind' }) },
                { key: 'orderMistake', label: t('orders:voidItem.reasonMistake', { defaultValue: 'Order mistake' }) },
                { key: 'other', label: t('orders:voidItem.reasonOther', { defaultValue: 'Other' }) }
              ].map(r => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => beginCancelWithReason(r.label)}
                  style={{ padding: '14px 8px', borderRadius: 8, border: '1px solid var(--pos-border, #E6EBF1)', background: 'var(--pos-surface, #fff)', color: 'var(--pos-text, #0A2540)', fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 52 }}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button
                type="button"
                onClick={() => setCancelReasonOpen(false)}
                style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid var(--pos-border, #E6EBF1)', background: 'var(--pos-surface, #fff)', color: 'var(--pos-text-muted, #6B7C93)', fontWeight: 600, cursor: 'pointer' }}
              >
                {t('orders:liveOrdersPage.noKeepOrder', { defaultValue: 'Keep order' })}
              </button>
              {mode === 'optional' && (
                <button
                  type="button"
                  onClick={() => { setCancelReasonOpen(false); beginCancelWithReason(''); }}
                  style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #FF6B6B', background: '#FF6B6B', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                >
                  {t('orders:orderCancel.skipReason', { defaultValue: 'Cancel without reason' })}
                </button>
              )}
            </div>
          </div>
        </Modal>
        );
      })()}

      {/* Delete Item — reason quick-pick (mode optional/required; 'off' uses a plain confirm). */}
      {deleteItemTarget && (() => {
        const mode = (operationSettings as any)?.requireCancelReason || 'required';
        return (
        <Modal isOpen onClose={() => setDeleteItemTarget(null)} title={t('orders:voidItem.title', { defaultValue: 'Remove Item' })} size="small">
          <div style={{ padding: '2px' }}>
            <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--pos-text, #0A2540)', lineHeight: 1.5 }}>
              {t('orders:voidItem.confirm', { defaultValue: 'Remove "{{name}}"? Choose a reason — it prints on the kitchen void ticket.', name: deleteItemTarget.name })}
            </p>
            {/* #2 부분수량 취소 — 줄 수량 2개 이상이면 "몇 개 취소" 스텝퍼(기본 전량) */}
            {(deleteItemTarget.maxQty || 1) > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 12px', marginBottom: 14, background: 'var(--pos-surface-2, #F6F8FB)', border: '1px solid var(--pos-border, #E6EBF1)', borderRadius: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--pos-text, #0A2540)' }}>{t('orders:voidItem.cancelHowMany', { defaultValue: 'Cancel quantity' })}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button type="button" aria-label="decrease" onClick={() => setCancelQty(q => Math.max(1, q - 1))} disabled={cancelQty <= 1}
                    style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid var(--pos-border, #E6EBF1)', background: 'var(--pos-surface, #fff)', color: 'var(--pos-text, #0A2540)', fontSize: 22, fontWeight: 700, cursor: cancelQty <= 1 ? 'not-allowed' : 'pointer', opacity: cancelQty <= 1 ? 0.5 : 1 }}>−</button>
                  <span style={{ minWidth: 56, textAlign: 'center', fontSize: 16, fontWeight: 700, color: 'var(--pos-text, #0A2540)' }}>{cancelQty} / {deleteItemTarget.maxQty}</span>
                  <button type="button" aria-label="increase" onClick={() => setCancelQty(q => Math.min(deleteItemTarget.maxQty || 1, q + 1))} disabled={cancelQty >= (deleteItemTarget.maxQty || 1)}
                    style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid var(--pos-border, #E6EBF1)', background: 'var(--pos-surface, #fff)', color: 'var(--pos-text, #0A2540)', fontSize: 22, fontWeight: 700, cursor: cancelQty >= (deleteItemTarget.maxQty || 1) ? 'not-allowed' : 'pointer', opacity: cancelQty >= (deleteItemTarget.maxQty || 1) ? 0.5 : 1 }}>+</button>
                </div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[
                { key: 'soldOut', label: t('orders:voidItem.reasonSoldOut', { defaultValue: 'Sold out' }) },
                { key: 'customerChange', label: t('orders:voidItem.reasonCustomer', { defaultValue: 'Customer changed mind' }) },
                { key: 'orderMistake', label: t('orders:voidItem.reasonMistake', { defaultValue: 'Order mistake' }) },
                { key: 'other', label: t('orders:voidItem.reasonOther', { defaultValue: 'Other' }) }
              ].map(r => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => beginDeleteItemWithReason(r.label)}
                  style={{ padding: '14px 8px', borderRadius: 8, border: '1px solid var(--pos-border, #E6EBF1)', background: 'var(--pos-surface, #fff)', color: 'var(--pos-text, #0A2540)', fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 52 }}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button
                type="button"
                onClick={() => setDeleteItemTarget(null)}
                style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid var(--pos-border, #E6EBF1)', background: 'var(--pos-surface, #fff)', color: 'var(--pos-text-muted, #6B7C93)', fontWeight: 600, cursor: 'pointer' }}
              >
                {t('common:cancel', { defaultValue: 'Cancel' })}
              </button>
              {mode === 'optional' && (
                <button
                  type="button"
                  onClick={() => beginDeleteItemWithReason('')}
                  style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #FF6B6B', background: '#FF6B6B', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                >
                  {t('orders:voidItem.skipReason', { defaultValue: 'Remove without reason' })}
                </button>
              )}
            </div>
          </div>
        </Modal>
        );
      })()}

      {/* 손실방지 PIN 게이트 — requireVoidPin 매장에서 삭제/취소 승인 (세션 무변경). */}
      {voidGate && (
        <VoidPinModal
          show={true}
          restaurantId={restaurantId}
          title={t('orders:voidPin.title', { defaultValue: 'Authorization required' })}
          subtitle={t('orders:voidPin.subtitle', { defaultValue: 'Enter a manager PIN to void or cancel' })}
          onClose={() => setVoidGate(null)}
          onApproved={(_by, pin) => { const g = voidGate; setVoidGate(null); g?.run(pin); }}
        />
      )}

      {showHistory && statusInfo?.orderId && (
        <div
          onClick={() => setShowHistory(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 9100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--pos-surface, #fff)', borderRadius: 12, padding: 24,
              width: 560, maxWidth: 'calc(100vw - 32px)',
              maxHeight: '80vh', overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--pos-text, #0A2540)' }}>
                {t('history.title', 'Order History')}
              </div>
              <button
                type="button"
                onClick={() => setShowHistory(false)}
                style={{
                  border: 'none', background: 'var(--pos-surface-2, #C7CED6)', color: 'var(--pos-text, #0A2540)',
                  borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer'
                }}
              >
                {t('history.close', 'Close')}
              </button>
            </div>
            <OrderActionHistory orderId={statusInfo.orderId} timeZone={timezone} />
          </div>
        </div>
      )}
    </Panel>
  );

  // 큰 팝업 모드 — body portal 로 중앙 모달. 백드롭 클릭 시 측면패널로 축소.
  if (expanded) {
    return createPortal(
      <ModalOverlay onClick={(e) => { if (e.target === e.currentTarget && onToggleExpand) onToggleExpand(); }}>
        {panelInner}
      </ModalOverlay>,
      document.body
    );
  }
  return panelInner;
};

export default TableDetailPanel;
