import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';
import DeliveryTimeline from '../../components/Inventory/DeliveryTimeline';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  Modal
} from '../../components/UI';
import { SearchInput } from '../../components/Common/FilterComponents';
import { FormGrid3 } from '../../components/UI/FormGrid';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';
import { useTabParam } from '../../hooks/useTabParam';

// Layout / Form / ModalButton primitives are inlined here on purpose.
// Importing them across chunks from `components/UI` triggered a TDZ runtime
// crash ("Cannot access 'X' before initialization") when this lazy page loaded
// before its UI shared chunk had finished evaluating. See memory:
// reference_live_orders_pattern.md.
const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
`;
const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
  @media (max-width: 768px) { font-size: 20px; }
`;
const Content = styled.div`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px 16px; }
`;
const FormGroup = styled.div`margin-bottom: 20px;`;
const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;
`;
const FormInput = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &:disabled { background: #F9FAFB; color: #4B5563; cursor: not-allowed; }
  &::placeholder { color: #6B7280; }
`;
const FormSelect = styled.select`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &:disabled { background: #F9FAFB; color: #4B5563; cursor: not-allowed; }
`;
const FormTextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.15s;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &::placeholder { color: #6B7280; }
`;
const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${p => p.variant === 'primary' || p.variant === 'danger' ? 'none' : '1px solid #C7CED6'};
  background: ${p => p.variant === 'primary' ? '#635BFF' : p.variant === 'danger' ? '#EF4444' : 'white'};
  color: ${p => p.variant === 'primary' || p.variant === 'danger' ? 'white' : '#4B5563'};
  &:hover:not(:disabled) {
    background: ${p => p.variant === 'primary' ? '#5A51E6' : p.variant === 'danger' ? '#B91C1C' : '#F1F4F8'};
    transform: translateY(-1px);
  }
  &:disabled {
    background: ${p => p.variant === 'primary' ? '#A5A0FF' : p.variant === 'danger' ? '#FCA5A5' : '#F1F4F8'};
    color: ${p => (p.variant === 'primary' || p.variant === 'danger') ? 'rgba(255,255,255,0.7)' : '#6B7280'};
    cursor: not-allowed;
    transform: none;
  }
`;

/**
 * Shared seller-side Incoming Orders view used by:
 *  - Supplier Admin (`/pos/supplier/orders`)
 *  - Brand General (`/pos/brand/general/incoming-orders`)
 *  - Foodcourt General (`/pos/foodcourt/general/incoming-orders`)
 *
 * All three roles act as the SELLER receiving a PurchaseOrder from a buyer
 * (Restaurant / Brand / Foodcourt). The backend resolves seller scope from
 * the JWT, so the same `/api/seller-orders` endpoint serves all three —
 * we pass `sellerScope` only as a UI hint (currently unused server-side).
 */

type POStatus = 'submitted' | 'confirmed' | 'shipped' | 'delivered' | 'received' | 'cancelled';

type TabKey = 'all' | 'submitted' | 'confirmed' | 'shipped' | 'received' | 'cancelled';

interface IncomingOrderItem {
  id: number;
  ingredient_id: number;
  description?: string | null;
  quantity_ordered: number | string;
  unit?: string | null;
  unit_price?: number | string | null;
  ingredient?: { id: number; name: string; unit: string } | null;
  // Supplier's own sale-product identity — shown to the seller so they recognise
  // their product/code (buyer's internal name is only a reference). P0-3.
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
}

interface IncomingOrderRow {
  id: number;
  po_number: string;
  buyer_name?: string | null;
  buyer_entity_type?: string | null;
  buyer_entity_id?: number | null;
  buyer?: { id?: number; type?: string; name?: string; email?: string } | null;
  status: POStatus | string;
  item_count?: number;
  items?: IncomingOrderItem[];
  total_amount?: number | string | null;
  currency?: string;
  created_at?: string | null;
  expected_delivery_date?: string | null;
  delivery_address?: string | null;
  tracking_info?: any;
}

interface SellerOrderStats {
  pending?: number;
  confirmed?: number;
  shipped?: number;
  received_this_month?: number;
}

interface IncomingOrdersViewProps {
  sellerScope: 'supplier' | 'brand' | 'foodcourt';
  i18nNamespace: 'supplier' | 'brand' | 'foodcourt';
}

const Subtitle = styled.div`
  color: #4B5563;
  font-size: 14px;
  margin-top: 4px;
`;

// Sprint 6: Inline copies of Restaurant LiveOrders styled components
// (avoids cross-chunk circular dep that caused TDZ runtime crash).
const AudioToggleButton = styled.button<{ enabled: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: ${props => props.enabled ? '#635BFF' : '#C7CED6'};
  img { width: 22px; height: 22px; filter: ${props => props.enabled ? 'invert(1)' : 'opacity(0.4)'}; }
  &:hover { opacity: 0.85; }
`;

const FilterToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  & > div:first-child > div { margin-bottom: 0 !important; }
  @media (max-width: 768px) { gap: 8px; }
`;

const RLStatusTabs = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid #C7CED6;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { height: 3px; }
  &::-webkit-scrollbar-track { background: #F1F4F8; }
  &::-webkit-scrollbar-thumb { background: #64748B; border-radius: 3px; }
  &::-webkit-scrollbar-thumb:hover { background: #64748B; }
`;

const RLStatusTab = styled.button<{ active?: boolean }>`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#635BFF' : '#4B5563'};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover { color: #635BFF; }
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? '#635BFF' : 'transparent'};
    transition: all 0.15s;
  }
`;

const RLTabBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`;

const StatisticsBar = styled.div`
  background: #F1F4F8;
  border-radius: 8px;
  border: 1px solid #C7CED6;
  padding: 12px 20px;
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  color: #4B5563;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  @media (max-width: 768px) { gap: 10px; padding: 10px 14px; font-size: 11px; }
`;

const StatItem = styled.span`
  white-space: nowrap;
  strong { color: #0A2540; font-weight: 600; margin-left: 4px; }
`;

const NewDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #DC2626;
  margin-right: 6px;
  animation: redBlink 1.2s infinite;
  @keyframes redBlink {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
`;

const NewBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #DC2626;
  color: white;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const BuyerType = styled.span`
  font-size: 9px;
  padding: 2px 6px;
  background: #F1F4F8;
  color: #4B5563;
  border-radius: 999px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const InfoLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #4B5563;
  margin-top: 6px;
  & .icon { font-size: 13px; flex-shrink: 0; line-height: 1; }
  & .text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
`;

const CarrierChip = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: #EEF2FF;
  border: 1px solid #635BFF;
  border-radius: 999px;
  color: #4338CA;
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  &:hover { background: #DDD6FE; }
`;

const TimeAgoText = styled.div`
  font-size: 11px;
  color: #6B7280;
`;

function timeAgo(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso); if (isNaN(d.getTime())) return '';
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// 단계별 색상 — Restaurant LiveOrders / Reservation 패턴과 일치.
// 대기(주황) → 진행(파랑) → 완료(녹색) / 취소(빨강).
const StatusVariantMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  submitted: 'warning',      // 대기 — seller 가 confirm 해야
  confirmed: 'info',         // seller 수락 — 진행 시작
  shipped: 'info',           // 배송 중 — 진행
  delivered: 'info',         // 도착 — buyer 가 received 마크 대기
  received: 'success',       // 완료
  partial_received: 'warning',
  cancelled: 'error',
  draft: 'info'
};

const TAB_KEYS: TabKey[] = ['all', 'submitted', 'confirmed', 'shipped', 'received', 'cancelled'];

function asNumber(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// Sprint 5: simple notification sound (Web Audio API — no asset load)
function playSellerChime() {
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);       // A5
    osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.12); // E6
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
    setTimeout(() => { try { ctx.close(); } catch {} }, 600);
  } catch (e) {
    // ignore — audio context not available
  }
}

const IncomingOrdersView: React.FC<IncomingOrdersViewProps> = ({ sellerScope, i18nNamespace }) => {
  const { user } = useAuth();
  // Use 'supplier' namespace for shared keys — Brand/Foodcourt pages still
  // re-use the supplier orders namespace so we don't duplicate strings.
  const { t } = useTranslation([i18nNamespace, 'supplier', 'common']);

  // URL ?tab=<key> 동기화 — 다른 페이지(Suppliers / Trade Invoices 등)와 동일 패턴
  const [activeTab, setActiveTab] = useTabParam<TabKey>('all');
  const [rows, setRows] = useState<IncomingOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState<SellerOrderStats>({});
  const [counts, setCounts] = useState<Record<TabKey, number>>({
    all: 0, submitted: 0, confirmed: 0, shipped: 0, received: 0, cancelled: 0
  });

  // Modal state
  const [confirmModalRow, setConfirmModalRow] = useState<IncomingOrderRow | null>(null);
  const [shipModalRow, setShipModalRow] = useState<IncomingOrderRow | null>(null);
  const [rejectModalRow, setRejectModalRow] = useState<IncomingOrderRow | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Ship form
  const [carrier, setCarrier] = useState('');
  const [carrierCode, setCarrierCode] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estArrival, setEstArrival] = useState('');
  const [shipNotes, setShipNotes] = useState('');

  // Sprint 5: carriers catalog
  const [carriers, setCarriers] = useState<Array<{ id: number; code: string; name: string; tracking_url_template: string | null }>>([]);
  useEffect(() => {
    (async () => {
      try {
        const token = getAuthToken();
        const res = await fetch('/api/carriers', { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        if (res.ok && data.success) setCarriers(Array.isArray(data.data) ? data.data : []);
      } catch (e) { /* ignore */ }
    })();
  }, []);

  // Reject form
  const [rejectReason, setRejectReason] = useState('');

  // Sprint 5: detail drawer (PO items + DeliveryTimeline)
  const [detailRow, setDetailRow] = useState<IncomingOrderRow | null>(null);
  const [detailFull, setDetailFull] = useState<any | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [detailReturns, setDetailReturns] = useState<any[]>([]);

  // Sprint 6: must be declared BEFORE fetchList — useCallback deps array
  // reads `dateRange` at definition time. Declaring later → TDZ at component
  // first render ("Cannot access X before initialization").
  const [newPoIds, setNewPoIds] = useState<Set<number>>(new Set());
  // 기본 기간 = 'all'. 입고 발주(B2B)는 며칠씩 대기하는 저빈도 주문이라 '오늘'로 좁히면
  // 탭 카운트(/stats=전체)는 7건인데 목록(created_at=오늘)은 0건이 되어 "숫자만 뜨고 내역 안 나옴".
  // 카운트가 전체 기준이므로 목록 기본도 전체로 맞춰 일치시킨다. (사용자는 필터로 좁힐 수 있음)
  const [activePeriod, setActivePeriod] = useState<PeriodType>('all');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('all', 'Asia/Kuala_Lumpur'));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('seller_sound_enabled') !== 'false');

  const openDetail = async (row: IncomingOrderRow) => {
    setDetailRow(row);
    setDetailFull(null);
    setDetailLoading(true);
    setDetailReturns([]);
    try {
      const token = getAuthToken();
      const [poRes, retRes] = await Promise.all([
        fetch(`/api/seller-orders/${row.id}`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`/api/seller-orders/${row.id}/returns`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      const poData = await poRes.json();
      const retData = await retRes.json();
      if (poRes.ok && poData.success) setDetailFull(poData.data);
      if (retRes.ok && retData.success) setDetailReturns(Array.isArray(retData.data) ? retData.data : []);
    } catch (err) {
      console.error('Failed to load PO detail:', err);
    } finally {
      setDetailLoading(false);
    }
  };
  const closeDetail = () => { setDetailRow(null); setDetailFull(null); setDetailReturns([]); };

  const reloadReturns = async () => {
    if (!detailRow) return;
    try {
      const token = getAuthToken();
      const r = await fetch(`/api/seller-orders/${detailRow.id}/returns`, { headers: { 'Authorization': `Bearer ${token}` } });
      const d = await r.json();
      if (r.ok && d.success) setDetailReturns(Array.isArray(d.data) ? d.data : []);
    } catch { /* ignore */ }
  };

  const approveReturn = async (rid: number) => {
    if (!detailRow) return;
    if (!window.confirm(tNs('orders.returns.approveConfirm', 'Approve this return? Credit Note will be issued automatically.') as string)) return;
    const token = getAuthToken();
    const r = await fetch(`/api/seller-orders/${detailRow.id}/returns/${rid}/approve`, {
      method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: '{}'
    });
    if (r.ok) { reloadReturns(); refreshAll(); }
  };
  const rejectReturn = async (rid: number) => {
    if (!detailRow) return;
    const reason = window.prompt(tNs('orders.returns.rejectReason', 'Rejection reason:') as string);
    if (!reason || !reason.trim()) return;
    const token = getAuthToken();
    const r = await fetch(`/api/seller-orders/${detailRow.id}/returns/${rid}/reject`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: reason.trim() })
    });
    if (r.ok) reloadReturns();
  };

  const fetchList = useCallback(async (status: TabKey) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      // 'all' 탭: status param 안 보내고 cancelled 만 클라이언트에서 제외
      if (status !== 'all') params.set('status', status);
      // Sprint 6: date range filter — calendar date(YYYY-MM-DD) 를 day-start / day-end 로 확장.
      // calculatePeriodDateRange 가 같은 day 면 start===end 인 calendar date 만 반환하므로,
      // new Date().toISOString() 그대로 쓰면 from===to=00:00 0초 윈도우라 모든 PO 가 제외됨.
      if (dateRange?.start) {
        const d = new Date(dateRange.start);
        d.setHours(0, 0, 0, 0);
        params.set('from', d.toISOString());
      }
      if (dateRange?.end) {
        const d = new Date(dateRange.end);
        d.setHours(23, 59, 59, 999);
        params.set('to', d.toISOString());
      }
      const res = await fetch(`/api/seller-orders?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      // Sprint 6: normalize buyer object → buyer_name + item_count
      const list = Array.isArray(data.data) ? data.data : [];
      let normalized = list.map((p: any) => ({
        ...p,
        buyer_name: p.buyer?.name || p.buyer_name || null,
        buyer_entity_type: p.buyer?.type || p.entity_type || null,
        buyer_entity_id: p.buyer?.id || p.entity_id || null,
        item_count: Array.isArray(p.items) ? p.items.length : (p.item_count ?? 0)
      }));
      // 'all' 탭은 cancelled 제외
      if (status === 'all') normalized = normalized.filter((p: any) => p.status !== 'cancelled');
      setRows(normalized);
    } catch (err) {
      console.error('Failed to fetch incoming orders:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  const fetchStats = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/seller-orders/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) return;
      const payload = data.data || {};
      setStats({
        pending: payload.pending ?? payload.submitted ?? 0,
        confirmed: payload.confirmed ?? 0,
        shipped: payload.shipped ?? 0,
        received_this_month: payload.received_this_month ?? payload.received ?? 0
      });
      if (payload.counts) {
        const c = {
          submitted: payload.counts.submitted ?? 0,
          confirmed: payload.counts.confirmed ?? 0,
          shipped: payload.counts.shipped ?? 0,
          received: payload.counts.received ?? 0,
          cancelled: payload.counts.cancelled ?? 0
        };
        setCounts({ ...c, all: c.submitted + c.confirmed + c.shipped + c.received });
      }
    } catch (err) {
      console.error('Failed to fetch seller order stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchList(activeTab);
  }, [activeTab, fetchList]);

  // (newPoIds / activePeriod / dateRange / isCustomDateRange / soundEnabled
  // declarations were moved above fetchList to satisfy TDZ ordering — see comment there.)

  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
    localStorage.setItem('seller_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  const fetchListRef = useRef(fetchList);
  const fetchStatsRef = useRef(fetchStats);
  useEffect(() => { fetchListRef.current = fetchList; fetchStatsRef.current = fetchStats; }, [fetchList, fetchStats]);
  const activeTabRef = useRef(activeTab);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  // Resolve seller_id from user (sellerScope already known via prop)
  const sellerId = useMemo<number | null>(() => {
    if (!user) return null;
    if (sellerScope === 'supplier') {
      // Supplier Admin: user has supplier_company_id
      const sid = (user as any).supplier_company_id ?? (user as any).supplierCompanyId;
      return sid ? parseInt(String(sid), 10) : null;
    }
    if (sellerScope === 'brand') {
      const bid = (user as any).brand_id ?? (user as any).brandId;
      return bid ? parseInt(String(bid), 10) : null;
    }
    if (sellerScope === 'foodcourt') {
      const fid = (user as any).foodcourt_id ?? (user as any).foodcourtId;
      return fid ? parseInt(String(fid), 10) : null;
    }
    return null;
  }, [user, sellerScope]);

  useEffect(() => {
    if (!user || sellerId == null) return;
    const sock: Socket = io('/orders', { transports: ['websocket', 'polling'], withCredentials: true, auth: { token: getAuthToken() } });
    sock.on('connect', () => {
      sock.emit('join-seller', { seller_type: sellerScope, seller_id: sellerId });
    });
    const refresh = () => {
      fetchListRef.current(activeTabRef.current);
      fetchStatsRef.current();
    };
    sock.on('seller-order-created', (payload: any) => {
      if (soundEnabledRef.current) playSellerChime();
      if (payload?.id) {
        setNewPoIds(prev => {
          const next = new Set(prev);
          next.add(payload.id);
          return next;
        });
        // Decay highlight after 12s
        setTimeout(() => {
          setNewPoIds(prev => {
            const next = new Set(prev);
            next.delete(payload.id);
            return next;
          });
        }, 12000);
      }
      refresh();
      window.dispatchEvent(new Event('refreshBadgeCounts'));
    });
    sock.on('seller-order-updated', () => {
      refresh();
      window.dispatchEvent(new Event('refreshBadgeCounts'));
    });
    return () => { sock.disconnect(); };
  }, [user, sellerId, sellerScope]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      (r.buyer_name || '').toLowerCase().includes(term) ||
      (r.po_number || '').toLowerCase().includes(term)
    );
  }, [rows, search]);

  // Period statistics — selected period에서 받은 모든 주문(현재 status 탭에 한정 X)을
  // 대상으로 매출/객단가/최대/활성 거래처/응답속도를 계산. Restaurant LiveOrders
  // 의 패턴과 같이, "탭 라벨 = 상태별 카운트", "통계 바 = 사업 KPI" 로 역할 분리.
  const periodStats = useMemo(() => {
    if (rows.length === 0) {
      return { totalRevenue: 0, avgOrder: 0, maxOrder: 0, activeBuyers: 0, avgConfirmHrs: null as number | null };
    }
    let total = 0;
    let max = 0;
    const buyers = new Set<string>();
    let confirmCount = 0;
    let confirmHrsSum = 0;
    rows.forEach(r => {
      const amt = Number(r.total_amount || 0);
      if (Number.isFinite(amt) && amt > 0) {
        total += amt;
        if (amt > max) max = amt;
      }
      const bk = `${r.buyer_entity_type || ''}#${r.buyer_entity_id || ''}`;
      if (r.buyer_entity_id) buyers.add(bk);
      // confirm responsiveness — submitted_at → confirmed_at
      const sub = (r as any).submitted_at;
      const conf = (r as any).confirmed_at;
      if (sub && conf) {
        const ms = new Date(conf).getTime() - new Date(sub).getTime();
        if (Number.isFinite(ms) && ms >= 0) {
          confirmHrsSum += ms / (1000 * 3600);
          confirmCount++;
        }
      }
    });
    const avgOrder = total / rows.length;
    const avgConfirmHrs = confirmCount > 0 ? confirmHrsSum / confirmCount : null;
    return {
      totalRevenue: total,
      avgOrder,
      maxOrder: max,
      activeBuyers: buyers.size,
      avgConfirmHrs
    };
  }, [rows]);

  const formatMoney = (amount: number | string | null | undefined, currency?: string) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return `${currency || 'MYR'} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const tNs = (key: string, fallback?: string) => {
    // try namespace-scoped first then fall back to supplier namespace
    const local = t(`${i18nNamespace}:${key}`, { defaultValue: '' }) as string;
    if (local) return local;
    return t(`supplier:${key}`, { defaultValue: fallback ?? key }) as string;
  };

  const refreshAll = () => {
    fetchList(activeTab);
    fetchStats();
  };

  const handleConfirm = async () => {
    if (!confirmModalRow) return;
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/seller-orders/${confirmModalRow.id}/confirm`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'Failed to confirm order');
        return;
      }
      setConfirmModalRow(null);
      refreshAll();
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const openShipModal = (row: IncomingOrderRow) => {
    setShipModalRow(row);
    const ti: any = row.tracking_info || {};
    setCarrier(ti.carrier_name || ti.carrier || '');
    setCarrierCode(ti.carrier_code || '');
    setTrackingNumber(ti.tracking_number || '');
    setEstArrival(ti.estimated_arrival || ti.est_arrival || '');
    setShipNotes(ti.notes || '');
    setErrorMessage(null);
  };

  const handleShip = async () => {
    if (!shipModalRow) return;
    if (!carrier.trim()) {
      setErrorMessage(tNs('orders.ship.carrier') + ' *');
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const token = getAuthToken();
      // Sprint 6: if PO already shipped/delivered, use PUT /tracking to amend without state change.
      const isAmend = shipModalRow.status === 'shipped' || shipModalRow.status === 'delivered';
      const url = isAmend
        ? `/api/seller-orders/${shipModalRow.id}/tracking`
        : `/api/seller-orders/${shipModalRow.id}/ship`;
      const method = isAmend ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tracking_info: {
            carrier_code: carrierCode || undefined,
            carrier_name: carrier.trim(),
            tracking_number: trackingNumber.trim() || null,
            estimated_arrival: estArrival || null,
            notes: shipNotes.trim() || null
          }
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'Failed to mark shipped');
        return;
      }
      setShipModalRow(null);
      refreshAll();
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectModalRow) return;
    if (!rejectReason.trim()) {
      setErrorMessage(tNs('orders.reject.reason') + ' *');
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/seller-orders/${rejectModalRow.id}/reject`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectReason.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'Failed to reject order');
        return;
      }
      setRejectModalRow(null);
      setRejectReason('');
      refreshAll();
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{tNs('orders.title', 'Live Orders')}</Title>
        </div>
        <AudioToggleButton
          enabled={soundEnabled}
          onClick={() => {
            setSoundEnabled(prev => {
              const next = !prev;
              localStorage.setItem('seller_sound_enabled', String(next));
              return next;
            });
          }}
          title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
        >
          <img src={soundEnabled ? '/speaker-on.svg' : '/speaker-off.svg'} alt={soundEnabled ? 'Sound ON' : 'Sound OFF'} />
        </AudioToggleButton>
      </Header>

      <Content>
        <FilterToolbar>
          <div>
            <DatePeriodFilter
              activePeriod={activePeriod}
              dateRange={dateRange}
              isCustomDateRange={isCustomDateRange}
              onPeriodChange={(period) => {
                setActivePeriod(period);
                setIsCustomDateRange(false);
                setDateRange(calculatePeriodDateRange(period, 'Asia/Kuala_Lumpur'));
              }}
              onCalendarRangeSelect={(start, end) => {
                setActivePeriod('all');
                setIsCustomDateRange(true);
                setDateRange({ start, end });
              }}
              includeToday
            />
          </div>
          <SearchInput
            type="text"
            placeholder={tNs('orders.search.placeholder', 'Search buyer or PO #')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterToolbar>

        <RLStatusTabs>
          {TAB_KEYS.map(tab => (
            <RLStatusTab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tNs(`orders.tabs.${tab}`, tab.charAt(0).toUpperCase() + tab.slice(1))}
              <RLTabBadge>{counts[tab] ?? 0}</RLTabBadge>
            </RLStatusTab>
          ))}
        </RLStatusTabs>

        {/* StatisticsBar: 사업 KPI (탭 카운트와 중복 X). 기간 필터에 따라 자동 갱신. */}
        <StatisticsBar>
          <StatItem>{tNs('orders.stats.totalRevenue', 'Total Revenue')}<strong>{formatMoney(periodStats.totalRevenue)}</strong></StatItem>
          <StatItem>{tNs('orders.stats.avgOrder', 'Avg Order')}<strong>{formatMoney(periodStats.avgOrder)}</strong></StatItem>
          <StatItem>{tNs('orders.stats.maxOrder', 'Largest Order')}<strong>{formatMoney(periodStats.maxOrder)}</strong></StatItem>
          <StatItem>{tNs('orders.stats.activeBuyers', 'Active Buyers')}<strong>{periodStats.activeBuyers}</strong></StatItem>
          <StatItem>{tNs('orders.stats.avgConfirmTime', 'Avg Confirm Time')}<strong>{periodStats.avgConfirmHrs == null ? '—' : `${periodStats.avgConfirmHrs.toFixed(1)}h`}</strong></StatItem>
        </StatisticsBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{tNs('orders.table.poNumber', 'PO #')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{tNs('orders.table.buyer', 'Buyer')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{tNs('orders.table.items', 'Items')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{tNs('orders.table.delivery', 'Delivery')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{tNs('orders.table.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{tNs('orders.table.time', 'Time')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{tNs('orders.table.amount', 'Amount')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{tNs('orders.table.actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8}><DataTableEmpty>{tNs('orders.loading', 'Loading…')}</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <DataTableEmpty>
                      {tNs('orders.empty', 'No orders found in this status.')}
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => {
                  const isNew = newPoIds.has(row.id);
                  const items = row.items || [];
                  const ti: any = row.tracking_info || {};
                  return (
                    <DataTableRow
                      key={row.id}
                      onClick={() => openDetail(row)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: isNew ? '#EEF2FF' : undefined
                      }}
                    >
                      <DataTableCell data-label="PO #">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {isNew && <NewDot />}
                          <strong>{row.po_number}</strong>
                          {isNew && <NewBadge>NEW</NewBadge>}
                        </div>
                      </DataTableCell>
                      <DataTableCell data-label={tNs('orders.table.buyer', 'Buyer') as string}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <BuyerType>{row.buyer_entity_type || 'buyer'}</BuyerType>
                          <strong style={{ color: '#0A2540' }}>{row.buyer_name || '—'}</strong>
                        </div>
                      </DataTableCell>
                      <DataTableCell data-label={tNs('orders.table.items', 'Items') as string}>
                        <div style={{ fontSize: 13, color: '#0A2540', fontWeight: 600 }}>{items.length} {tNs('orders.table.itemsUnit', 'items')}</div>
                        {items.length > 0 && (
                          <div style={{ fontSize: 11, color: '#4B5563', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                            {items.slice(0, 2).map(it => (it.seller_product_name || it.ingredient?.name || it.description || `#${it.ingredient_id}`)).join(', ')}
                            {items.length > 2 && ` +${items.length - 2}`}
                          </div>
                        )}
                      </DataTableCell>
                      <DataTableCell data-label={tNs('orders.table.delivery', 'Delivery') as string}>
                        {row.delivery_address && (
                          <InfoLine>
                            <span className="text" style={{ maxWidth: 160 }}>{row.delivery_address}</span>
                          </InfoLine>
                        )}
                        {(ti.carrier_name || ti.carrier_code) ? (
                          ti.tracking_url ? (
                            <CarrierChip
                              href={ti.tracking_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {ti.carrier_name || ti.carrier_code}
                              {ti.tracking_number ? ` · ${ti.tracking_number}` : ''}
                            </CarrierChip>
                          ) : (
                            <span style={{ fontSize: 11, color: '#1F2937', fontWeight: 600 }}>
                              {ti.carrier_name || ti.carrier_code}
                              {ti.tracking_number ? ` · ${ti.tracking_number}` : ''}
                            </span>
                          )
                        ) : !row.delivery_address ? (
                          <span style={{ color: '#6B7280', fontSize: 12 }}>—</span>
                        ) : null}
                      </DataTableCell>
                      <DataTableCell data-label={tNs('orders.table.status', 'Status') as string} align="center">
                        <DataTableStatus variant={StatusVariantMap[row.status] || 'info'}>
                          {tNs(`status.${row.status}`, row.status)}
                        </DataTableStatus>
                      </DataTableCell>
                      <DataTableCell data-label={tNs('orders.table.time', 'Time') as string}>
                        <TimeAgoText>{timeAgo(row.created_at)}</TimeAgoText>
                      </DataTableCell>
                      <DataTableCell data-label={tNs('orders.table.amount', 'Amount') as string} align="right">
                        <strong>{formatMoney(row.total_amount, row.currency)}</strong>
                      </DataTableCell>
                      <DataTableCell align="right" mobileFullWidth onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <DataTableActions>
                          <ThemedButton size="small" variant="outline" onClick={() => openDetail(row)}>
                            {tNs('orders.actions.view', 'View')}
                          </ThemedButton>
                          <ThemedButton size="small" variant="outline" onClick={() => window.open(`/pos/purchase-orders/${row.id}/print?as=seller`, '_blank')}>
                            {tNs('orders.actions.print', 'Print')}
                          </ThemedButton>
                          {row.status === 'submitted' && (
                            <>
                              <ThemedButton size="small" variant="primary" onClick={() => { setConfirmModalRow(row); setErrorMessage(null); }}>
                                {tNs('orders.actions.confirm', 'Confirm')}
                              </ThemedButton>
                              <ThemedButton size="small" variant="outline" onClick={() => { setRejectModalRow(row); setRejectReason(''); setErrorMessage(null); }}>
                                {tNs('orders.actions.reject', 'Reject')}
                              </ThemedButton>
                            </>
                          )}
                          {row.status === 'confirmed' && (
                            <ThemedButton size="small" variant="primary" onClick={() => openShipModal(row)}>
                              {tNs('orders.actions.ship', 'Ship')}
                            </ThemedButton>
                          )}
                          {row.status === 'shipped' && (
                            <ThemedButton
                              size="small"
                              variant="primary"
                              onClick={async () => {
                                const token = getAuthToken();
                                const r = await fetch(`/api/seller-orders/${row.id}/deliver`, {
                                  method: 'POST',
                                  headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                  body: JSON.stringify({})
                                });
                                if (r.ok) refreshAll();
                              }}
                            >
                              {tNs('orders.actions.deliver', 'Delivered')}
                            </ThemedButton>
                          )}
                          {(row.status === 'shipped' || row.status === 'delivered') && (
                            <ThemedButton
                              size="small"
                              variant="outline"
                              onClick={() => openShipModal(row)}
                              title={tNs('orders.actions.editTracking', 'Edit tracking') as string}
                            >
                              ✎
                            </ThemedButton>
                          )}
                        </DataTableActions>
                      </DataTableCell>
                    </DataTableRow>
                  );
                })
              )}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      {/* Confirm Modal */}
      <Modal
        isOpen={!!confirmModalRow}
        onClose={() => setConfirmModalRow(null)}
        title={tNs('orders.confirm.title', 'Confirm Order')}
        size="small"
        footer={
          <>
            <ModalButton onClick={() => setConfirmModalRow(null)} disabled={submitting}>
              {tNs('orders.confirm.cancel', 'Cancel')}
            </ModalButton>
            <ModalButton variant="primary" onClick={handleConfirm} disabled={submitting}>
              {tNs('orders.confirm.submit', 'Confirm Order')}
            </ModalButton>
          </>
        }
      >
        <p style={{ margin: 0, color: '#1F2937' }}>
          {tNs('orders.confirm.message', 'Confirm this purchase order?')}
        </p>
        {confirmModalRow && (
          <div style={{ marginTop: 12, padding: 12, background: '#F1F4F8', borderRadius: 8, fontSize: 13, color: '#4B5563' }}>
            <div><strong>{tNs('orders.table.poNumber', 'PO #')}:</strong> {confirmModalRow.po_number}</div>
            <div><strong>{tNs('orders.table.buyer', 'Buyer')}:</strong> {confirmModalRow.buyer_name || '-'}</div>
            <div><strong>{tNs('orders.table.total', 'Total')}:</strong> {formatMoney(confirmModalRow.total_amount, confirmModalRow.currency)}</div>
          </div>
        )}
        {errorMessage && (
          <div style={{ marginTop: 12, color: '#DC2626', fontSize: 13 }}>{errorMessage}</div>
        )}
      </Modal>

      {/* Ship Modal */}
      <Modal
        isOpen={!!shipModalRow}
        onClose={() => setShipModalRow(null)}
        title={tNs('orders.ship.title', 'Mark As Shipped')}
        size="medium"
        footer={
          <>
            <ModalButton onClick={() => setShipModalRow(null)} disabled={submitting}>
              {tNs('orders.ship.cancel', 'Cancel')}
            </ModalButton>
            <ModalButton variant="primary" onClick={handleShip} disabled={submitting}>
              {tNs('orders.ship.submit', 'Mark Shipped')}
            </ModalButton>
          </>
        }
      >
        <FormGroup>
          <FormLabel>{tNs('orders.ship.carrier', 'Carrier')} *</FormLabel>
          {carriers.length > 0 && (
            <FormSelect
              value={carrierCode}
              onChange={(e) => {
                const code = e.target.value;
                setCarrierCode(code);
                const match = carriers.find(c => c.code === code);
                if (match) setCarrier(match.name);
              }}
              style={{ marginBottom: 8 }}
            >
              <option value="">{tNs('orders.ship.carrierSelect', '— Select carrier or type custom name —')}</option>
              {carriers.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </FormSelect>
          )}
          <FormInput
            type="text"
            placeholder={tNs('orders.ship.carrierPlaceholder', 'Custom carrier name (optional)')}
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{tNs('orders.ship.trackingNumber', 'Tracking Number')}</FormLabel>
          <FormInput
            type="text"
            placeholder={tNs('orders.ship.trackingPlaceholder', '')}
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{tNs('orders.ship.estArrival', 'Estimated Arrival')}</FormLabel>
          <DateField value={estArrival} onChange={setEstArrival} />
        </FormGroup>
        <FormGroup>
          <FormLabel>{tNs('orders.ship.notes', 'Notes')}</FormLabel>
          <FormTextArea
            rows={3}
            value={shipNotes}
            onChange={(e) => setShipNotes(e.target.value)}
          />
        </FormGroup>
        {errorMessage && (
          <div style={{ color: '#DC2626', fontSize: 13 }}>{errorMessage}</div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={!!rejectModalRow}
        onClose={() => setRejectModalRow(null)}
        title={tNs('orders.reject.title', 'Reject Order')}
        size="small"
        footer={
          <>
            <ModalButton onClick={() => setRejectModalRow(null)} disabled={submitting}>
              {tNs('orders.reject.cancel', 'Cancel')}
            </ModalButton>
            <ModalButton variant="danger" onClick={handleReject} disabled={submitting}>
              {tNs('orders.reject.submit', 'Reject Order')}
            </ModalButton>
          </>
        }
      >
        <FormGroup>
          <FormLabel>{tNs('orders.reject.reason', 'Reason')} *</FormLabel>
          <FormTextArea
            rows={4}
            placeholder={tNs('orders.reject.reasonPlaceholder', '')}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </FormGroup>
        {errorMessage && (
          <div style={{ color: '#DC2626', fontSize: 13 }}>{errorMessage}</div>
        )}
      </Modal>

      {/* Sprint 5: Detail drawer — items + DeliveryTimeline */}
      <Modal
        isOpen={!!detailRow}
        onClose={closeDetail}
        title={detailRow ? `${detailRow.po_number}` : ''}
        size="large"
        footer={
          <>
            <ModalButton variant="secondary" onClick={closeDetail}>
              {tNs('orders.detail.close', 'Close')}
            </ModalButton>
            {detailRow?.status === 'submitted' && (
              <>
                <ModalButton
                  onClick={() => { setConfirmModalRow(detailRow); closeDetail(); setErrorMessage(null); }}
                >
                  {tNs('orders.actions.confirm', 'Confirm')}
                </ModalButton>
              </>
            )}
            {detailRow?.status === 'confirmed' && (
              <ModalButton onClick={() => { openShipModal(detailRow); closeDetail(); }}>
                {tNs('orders.actions.ship', 'Mark Shipped')}
              </ModalButton>
            )}
            {detailRow?.status === 'shipped' && (
              <ModalButton
                onClick={async () => {
                  const token = getAuthToken();
                  const r = await fetch(`/api/seller-orders/${detailRow.id}/deliver`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                  });
                  if (r.ok) { closeDetail(); refreshAll(); }
                }}
              >
                {tNs('orders.actions.deliver', 'Mark Delivered')}
              </ModalButton>
            )}
          </>
        }
      >
        {detailLoading ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#4B5563' }}>
            {tNs('orders.detail.loading', 'Loading…')}
          </div>
        ) : !detailFull ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#4B5563' }}>
            {tNs('orders.detail.notFound', 'Not found')}
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {/* Header summary */}
            <FormGrid3>
              <div style={{ padding: 12, background: '#F9FAFB', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' }}>
                  {tNs('orders.detail.buyer', 'Buyer')}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', marginTop: 2 }}>
                  {detailFull.buyer?.name || '—'}
                </div>
                <div style={{ fontSize: 11, color: '#6B7280' }}>
                  {detailFull.buyer?.type || ''}
                </div>
              </div>
              <div style={{ padding: 12, background: '#F9FAFB', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' }}>
                  {tNs('orders.detail.status', 'Status')}
                </div>
                <DataTableStatus variant={StatusVariantMap[detailFull.status] || 'info'}>
                  {tNs(`status.${detailFull.status}`, detailFull.status)}
                </DataTableStatus>
              </div>
              <div style={{ padding: 12, background: '#F9FAFB', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' }}>
                  {tNs('orders.detail.total', 'Total')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540', marginTop: 2 }}>
                  {formatMoney(detailFull.total_amount, detailFull.currency)}
                </div>
              </div>
            </FormGrid3>

            {/* Items */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', marginBottom: 8 }}>
                {tNs('orders.detail.items', 'Items')}
              </div>
              <div style={{ border: '1px solid #C7CED6', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  padding: '8px 12px', background: '#F9FAFB',
                  fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase'
                }}>
                  <div>{tNs('orders.detail.ingredient', 'Ingredient')}</div>
                  <div style={{ textAlign: 'right' }}>{tNs('orders.detail.qty', 'Qty')}</div>
                  <div style={{ textAlign: 'right' }}>{tNs('orders.detail.unitPrice', 'Unit Price')}</div>
                  <div style={{ textAlign: 'right' }}>{tNs('orders.detail.lineTotal', 'Total')}</div>
                </div>
                {(detailFull.items || []).map((it: any) => (
                  <div key={it.id} style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    padding: '10px 12px', borderTop: '1px solid #F1F4F8',
                    fontSize: 13, color: '#0A2540', alignItems: 'center'
                  }}>
                    <div>
                      <strong>{it.seller_product_name || it.ingredient?.name || it.description || `#${it.ingredient_id}`}</strong>
                      {(it.seller_product_sku || it.seller_product_name) && (
                        <div style={{ fontSize: 11, color: '#6B7280' }}>
                          {it.seller_product_sku ? `SKU: ${it.seller_product_sku}` : ''}
                          {it.seller_product_name && (it.ingredient?.name || it.description) ? `${it.seller_product_sku ? ' · ' : ''}Buyer ref: ${it.ingredient?.name || it.description}` : ''}
                        </div>
                      )}
                      <div style={{ fontSize: 11, color: '#4B5563' }}>
                        {tNs('orders.detail.received', 'Received')}: {Number(it.quantity_received) || 0}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {Number(it.quantity_ordered).toFixed(2)} {it.unit || ''}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {formatMoney(it.unit_price, detailFull.currency)}
                    </div>
                    <div style={{ textAlign: 'right', fontWeight: 600 }}>
                      {formatMoney(it.line_total, detailFull.currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DeliveryTimeline */}
            {detailFull.tracking_info && (
              <DeliveryTimeline
                events={detailFull.tracking_info?.events}
                carrier_name={detailFull.tracking_info?.carrier_name}
                carrier_code={detailFull.tracking_info?.carrier_code}
                tracking_number={detailFull.tracking_info?.tracking_number}
                tracking_url={detailFull.tracking_info?.tracking_url}
                estimated_arrival={detailFull.tracking_info?.estimated_arrival}
              />
            )}

            {/* Sprint 6: Returns */}
            {detailReturns.length > 0 && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', marginBottom: 8 }}>
                  {tNs('orders.returns.title', 'Return Requests')}
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {detailReturns.map((r: any) => (
                    <div key={r.id} style={{
                      padding: 12, border: '1px solid #C7CED6', borderRadius: 8,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540' }}>
                          #{r.id} · qty {r.quantity} {r.unit || ''}
                        </div>
                        <div style={{ fontSize: 11, color: '#4B5563', marginTop: 2 }}>
                          {r.reason || '—'}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                          background: r.status === 'approved' ? '#ECFDF5' : r.status === 'rejected' ? '#FEF2F2' : '#FEF3C7',
                          color: r.status === 'approved' ? '#065F46' : r.status === 'rejected' ? '#991B1B' : '#92400E'
                        }}>{r.status}</span>
                        {r.status === 'requested' && (
                          <>
                            <ThemedButton size="small" variant="primary" onClick={() => approveReturn(r.id)}>
                              {tNs('orders.returns.approve', 'Approve')}
                            </ThemedButton>
                            <ThemedButton size="small" variant="danger-outline" onClick={() => rejectReturn(r.id)}>
                              {tNs('orders.returns.reject', 'Reject')}
                            </ThemedButton>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* sellerScope is preserved as a prop so the backend can later branch
          if it ever needs to disambiguate seller_type from a hint. */}
      <input type="hidden" data-seller-scope={sellerScope} />
    </Container>
  );
};

export default IncomingOrdersView;
