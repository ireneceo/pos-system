import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableEmpty, DataTableStatus,
  Modal as CommonModal, ModalButton,
  FormGroup, FormLabel, FormTextArea, FormInput
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';
import DeliveryTimeline from '../../components/Inventory/DeliveryTimeline';
import { renderIframeToPdf } from '../../utils/invoicePdf';
import { useAuth } from '../../contexts/AuthContext';
import AlertDialog from '../../components/Common/AlertDialog';

// Icon-only buttons (matches PurchaseOrdersPage pattern)
const HeaderIconBtn = styled.button`
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #C7CED6;
  background: white;
  color: #475569;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  transition: all 0.15s;
  &:hover { background: #F1F4F8; border-color: #635BFF; color: #635BFF; }
  svg { width: 18px; height: 18px; }
`;

// Embedded mode 컴팩트 타이틀 (panel body 최상단)
const EmbeddedTitle = styled.div`
  padding: 18px 140px 14px 24px;  /* right reserves space for floating top-right icons */
  border-bottom: 1px solid #C7CED6;
  background: white;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  box-sizing: border-box;

  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #0A2540;
    white-space: nowrap;
  }
`;

// Embedded mode 하단 액션 footer (Modal 패턴 — sticky bottom)
const EmbeddedFooter = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #C7CED6;
  padding: 16px 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  z-index: 1;
`;

type POStatus = 'draft' | 'pending_approval' | 'submitted' | 'confirmed' | 'shipped' | 'in_transit' | 'delivered' | 'partial_received' | 'received' | 'cancelled' | 'closed' | 'delivery_failed';

// Sprint 7: discrepancy reasons
type DiscrepancyReason = null | 'short' | 'damaged' | 'wrong_item' | 'pending';

interface POItem {
  id: number;
  ingredient_id: number;
  ingredient_name: string;
  ingredient_unit?: string;
  seller_product_id?: number | null;
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
  quantity_ordered: number | string;
  quantity_received: number | string;
  unit_price: number | string;
  line_total?: number | string;
}

interface PODetail {
  id: number;
  po_number: string;
  status: POStatus;
  seller_type: string;
  seller_id: number;
  seller_name?: string;
  contract_id?: number | null;
  expected_delivery_date?: string | null;
  actual_delivery_date?: string | null;
  delivery_address?: string | null;
  notes?: string | null;
  subtotal?: number | string;
  tax_amount?: number | string;
  total_amount?: number | string;
  currency?: string;
  created_at?: string | null;
  submitted_at?: string | null;
  confirmed_at?: string | null;
  shipped_at?: string | null;
  received_at?: string | null;
  cancelled_at?: string | null;
  cancellation_reason?: string | null;
  rejected_reason?: string | null;
  rejected_at?: string | null;
  approval_required?: boolean;
  tracking_number?: string | null;
  items: POItem[];
}

// Sprint 7: split — 한 line이 여러 운명으로 나뉠 수 있음
interface ReceiveSplit {
  uid: string;                // local-only id for React key
  quantity: number;
  reason: DiscrepancyReason;
  batch_no: string;
  expiry_date: string;
  unit_cost: number;
  discrepancy_note: string;
}

interface ReceiveLine {
  item_id: number;
  ingredient_name: string;
  ordered: number;
  alreadyReceived: number;
  remaining: number;
  unit?: string;
  defaultUnitCost: number;
  splits: ReceiveSplit[];
}

const Subtitle = styled.div`
  color: #4B5563;
  font-size: 14px;
  margin-top: 4px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Section = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
    color: #0A2540;
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
`;

const TimelineItem = styled.div<{ active?: boolean; done?: boolean; cancelled?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
  padding-left: 4px;

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
    background: ${(p) => p.cancelled ? '#EF4444' : p.active ? '#635BFF' : p.done ? '#10B981' : '#C7CED6'};
    box-shadow: ${(p) => p.active ? '0 0 0 4px rgba(99, 91, 255, 0.15)' : 'none'};
  }
`;

const TimelineContent = styled.div`
  flex: 1;

  strong {
    color: #0A2540;
    font-size: 14px;
  }
  div.meta {
    color: #4B5563;
    font-size: 12px;
    margin-top: 2px;
  }
`;

const KvGrid = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 8px 16px;
  font-size: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const KvKey = styled.div`
  color: #4B5563;
  font-size: 13px;
`;

const KvValue = styled.div`
  color: #0A2540;
  word-break: break-word;
`;

const ErrorBox = styled.div`
  padding: 10px 14px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
  margin-top: 12px;
`;

const ReceiveRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 80px 80px 100px 110px 100px 110px;
  gap: 8px;
  padding: 10px 0;
  align-items: center;
  border-bottom: 1px solid #F1F4F8;
  font-size: 13px;

  &.header {
    font-size: 11px;
    font-weight: 600;
    color: #4B5563;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    border-bottom: 1px dashed #C7CED6;
    padding: 12px 0;
  }
`;

// Sprint 7: Receive line container with splits
const ReceiveLineCard = styled.div`
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 12px;
  background: #FCFCFD;

  .line-head {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 12px;
    .name { font-weight: 600; color: #0A2540; font-size: 14px; }
    .stat { font-size: 12px; color: #4B5563; }
  }

  .splits-stack { display: flex; flex-direction: column; gap: 8px; }

  .add-split {
    margin-top: 10px;
    background: none;
    border: 1px dashed #635BFF;
    color: #635BFF;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: background 0.15s;
    &:hover { background: rgba(99,91,255,0.06); }
  }

  .summary {
    margin-top: 10px;
    font-size: 12px;
    color: #4B5563;
    .ok { color: #15803D; font-weight: 600; }
    .warn { color: #DC2626; font-weight: 600; }
  }
`;

const SplitRow = styled.div<{ $reason: DiscrepancyReason }>`
  display: grid;
  grid-template-columns: 200px 90px 1fr auto;
  gap: 8px;
  align-items: start;
  padding: 10px;
  border-radius: 10px;
  background: ${p => {
    if (p.$reason === 'damaged' || p.$reason === 'wrong_item') return '#FEF3F2';
    if (p.$reason === 'short' || p.$reason === 'pending') return '#FFFBEB';
    return '#F0EFFF';
  }};
  border: 1px solid ${p => {
    if (p.$reason === 'damaged' || p.$reason === 'wrong_item') return '#FECACA';
    if (p.$reason === 'short' || p.$reason === 'pending') return '#FDE68A';
    return '#E0DEFF';
  }};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Segmented = styled.div`
  display: inline-flex;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  overflow: hidden;
  font-size: 12px;
  width: 200px;

  button {
    padding: 7px 8px;
    background: none;
    border: none;
    cursor: pointer;
    color: #4B5563;
    font-weight: 600;
    flex: 1;
    transition: all 0.15s;
    border-right: 1px solid #C7CED6;
    &:last-child { border-right: none; }
    &.active { background: #635BFF; color: white; }
    &:hover:not(.active) { background: #F1F4F8; }
  }
`;

const SmallInput = styled.input`
  width: 100%;
  padding: 7px 10px;
  border: 1px solid #6B7280;
  border-radius: 6px;
  font-size: 13px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const RemoveSplitBtn = styled.button`
  background: none; border: none; cursor: pointer;
  color: #6B7280; font-size: 18px; padding: 4px 8px;
  &:hover { color: #DC2626; }
`;

const AutoReturnHint = styled.div`
  margin-top: 6px;
  padding: 6px 10px;
  background: rgba(220, 38, 38, 0.08);
  color: #991B1B;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
`;

const TotalsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  max-width: 320px;
  margin-left: auto;
  margin-top: 12px;

  > div {
    display: flex;
    justify-content: space-between;
    color: #1F2937;
  }
  > div.total {
    border-top: 1px solid #C7CED6;
    padding-top: 8px;
    margin-top: 4px;
    font-weight: 700;
    color: #0A2540;
    font-size: 16px;
  }
`;

const StatusVariantMap: Record<POStatus, 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'info',
  pending_approval: 'warning',
  closed: 'success',
  delivery_failed: 'error',
  in_transit: 'warning',
  submitted: 'warning',
  confirmed: 'warning',
  shipped: 'info',
  delivered: 'info',
  partial_received: 'warning',
  received: 'success',
  cancelled: 'error'
};

const STAGES: POStatus[] = ['draft', 'submitted', 'confirmed', 'shipped', 'in_transit', 'delivered', 'received'];

interface PurchaseOrderDetailPageProps {
  embeddedId?: number;        // 패널 내부 렌더용 (없으면 URL 파라미터 사용)
  embedded?: boolean;         // true 면 Container/Header 스킵 — 패널이 자체 헤더 제공
  onClose?: () => void;       // 패널 모드에서 닫기/액션 후 콜백
}

const PurchaseOrderDetailPage: React.FC<PurchaseOrderDetailPageProps> = ({ embeddedId, embedded, onClose }) => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const navigate = useNavigate();
  const { id: routeId } = useParams<{ id: string }>();
  const id = embeddedId ?? Number(routeId);
  const { user } = useAuth();
  const invoiceListPath = (() => {
    if (user?.role === 'Restaurant Admin' || user?.role === 'Staff') return user?.restaurant_id ? `/restaurant/${user.restaurant_id}/invoices` : '/pos/owner/invoices';
    if (user?.role === 'Brand General' || user?.role === 'Brand Manager') return '/pos/brand/invoices';
    if (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') return '/pos/foodcourt/invoices';
    if (user?.role === 'Restaurant Owner') return '/pos/owner/invoices';
    return '/pos/admin/invoices';
  })();

  const [detail, setDetail] = useState<PODetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [receiveOpen, setReceiveOpen] = useState(false);
  const [receiveLines, setReceiveLines] = useState<ReceiveLine[]>([]);
  const [receiveError, setReceiveError] = useState<string | null>(null);
  const [receiveSubmitting, setReceiveSubmitting] = useState(false);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancelSubmitting, setCancelSubmitting] = useState(false);

  const [shippedOpen, setShippedOpen] = useState(false);
  const [trackingNo, setTrackingNo] = useState('');
  const [alertDlg, setAlertDlg] = useState<{ title: string; message: string } | null>(null);
  const [shippedError, setShippedError] = useState<string | null>(null);
  const [shippedSubmitting, setShippedSubmitting] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  // Sprint 6: Returns
  const [showReturnsModal, setShowReturnsModal] = useState(false);
  const [returnLines, setReturnLines] = useState<Array<{ purchase_order_item_id: number; quantity: string; reason: string }>>([]);
  const [returnSubmitting, setReturnSubmitting] = useState(false);
  const [returnError, setReturnError] = useState<string | null>(null);
  const [existingReturns, setExistingReturns] = useState<any[]>([]);

  const loadReturns = useCallback(async () => {
    if (!Number.isFinite(id)) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${id}/returns`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) setExistingReturns(Array.isArray(data.data) ? data.data : []);
    } catch (err) { /* ignore */ }
  }, [id]);

  useEffect(() => { loadReturns(); }, [loadReturns]);

  useEffect(() => {
    if (showReturnsModal && detail) {
      // Initialize lines from received items
      const lines = detail.items
        .filter(it => parseFloat(String(it.quantity_received)) > 0)
        .map(it => ({
          purchase_order_item_id: it.id,
          quantity: '',
          reason: ''
        }));
      setReturnLines(lines);
      setReturnError(null);
    }
  }, [showReturnsModal, detail]);

  const submitReturns = useCallback(async () => {
    if (!detail) return;
    const items = returnLines
      .filter(l => parseFloat(l.quantity) > 0)
      .map(l => ({
        purchase_order_item_id: l.purchase_order_item_id,
        quantity: parseFloat(l.quantity),
        reason: l.reason || undefined
      }));
    if (items.length === 0) {
      setReturnError(t('detail.returns.noItems', 'Enter at least one return quantity') as string);
      return;
    }
    setReturnSubmitting(true);
    setReturnError(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/returns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setReturnError(data?.message || (t('detail.returns.failed', 'Failed to submit return') as string));
        return;
      }
      setShowReturnsModal(false);
      loadReturns();
    } catch (err) {
      setReturnError(t('detail.returns.networkError', 'Network error') as string);
    } finally {
      setReturnSubmitting(false);
    }
  }, [detail, returnLines, t, loadReturns]);

  const fetchDetail = useCallback(async () => {
    if (!Number.isFinite(id)) return;
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || (t('detail.loadFailed') as string));
        setDetail(null);
        return;
      }
      setDetail(data.data || null);
    } catch (err) {
      console.error('Failed to fetch PO detail:', err);
      setError(t('detail.loadFailed') as string);
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => { fetchDetail(); }, [fetchDetail]);

  const formatMoney = (amount: number | string | null | undefined) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return `${detail?.currency || 'MYR'} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const subtotal = useMemo(() => {
    if (!detail) return 0;
    if (detail.subtotal != null) return Number(detail.subtotal);
    return detail.items.reduce((sum, it) => sum + Number(it.quantity_ordered) * Number(it.unit_price), 0);
  }, [detail]);
  const tax = useMemo(() => detail?.tax_amount != null ? Number(detail.tax_amount) : 0, [detail]);
  const total = useMemo(() => detail?.total_amount != null ? Number(detail.total_amount) : (subtotal + tax), [detail, subtotal, tax]);

  // Submit (draft → submitted)
  const handleSubmit = async () => {
    if (!detail || submitting) return;
    setSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/submit`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || (t('new.errors.submitFailed') as string));
        return;
      }
      await fetchDetail();
    } catch (err) {
      console.error('Failed to submit PO:', err);
      setError(t('new.errors.submitFailed') as string);
    } finally {
      setSubmitting(false);
    }
  };

  // Mark Shipped
  const openShipped = () => {
    setShippedError(null);
    setTrackingNo('');
    setShippedOpen(true);
  };
  const handleMarkShipped = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail || shippedSubmitting) return;
    setShippedError(null);
    setShippedSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/mark-shipped`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tracking_number: trackingNo.trim() || null })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setShippedError(data?.message || (t('markShipped.submitFailed') as string));
        return;
      }
      setShippedOpen(false);
      await fetchDetail();
    } catch (err) {
      console.error('Failed to mark shipped:', err);
      setShippedError(t('markShipped.submitFailed') as string);
    } finally {
      setShippedSubmitting(false);
    }
  };

  // Sprint 7: Receive — splits-based UI
  const newSplitId = () => `split-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const openReceive = () => {
    if (!detail) return;
    setReceiveError(null);
    setReceiveLines(detail.items.map(it => {
      const ordered = Number(it.quantity_ordered);
      const already = Number(it.quantity_received);
      const defaultUnitCost = Number(it.unit_price) || 0;
      return {
        item_id: it.id,
        ingredient_name: it.ingredient_name,
        ordered,
        alreadyReceived: already,
        remaining: Math.max(0, ordered - already),
        unit: it.ingredient_unit,
        defaultUnitCost,
        splits: [{
          uid: newSplitId(),
          quantity: 0,
          reason: null,
          batch_no: '',
          expiry_date: '',
          unit_cost: defaultUnitCost,
          discrepancy_note: ''
        }]
      };
    }));
    setReceiveOpen(true);
  };

  const updateSplit = (itemId: number, splitUid: string, patch: Partial<ReceiveSplit>) => {
    setReceiveLines(prev => prev.map(l =>
      l.item_id === itemId
        ? { ...l, splits: l.splits.map(s => s.uid === splitUid ? { ...s, ...patch } : s) }
        : l
    ));
  };

  const addSplit = (itemId: number, reason: DiscrepancyReason = 'damaged') => {
    setReceiveLines(prev => prev.map(l =>
      l.item_id === itemId
        ? {
          ...l,
          splits: [...l.splits, {
            uid: newSplitId(),
            quantity: 0,
            reason,
            batch_no: '',
            expiry_date: '',
            unit_cost: l.defaultUnitCost,
            discrepancy_note: ''
          }]
        }
        : l
    ));
  };

  const removeSplit = (itemId: number, splitUid: string) => {
    setReceiveLines(prev => prev.map(l =>
      l.item_id === itemId
        ? { ...l, splits: l.splits.filter(s => s.uid !== splitUid) }
        : l
    ));
  };

  const handleReceive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail || receiveSubmitting) return;
    setReceiveError(null);

    // Sprint 7: filter lines that have at least one non-zero split
    const itemsToSend = receiveLines
      .map(l => ({
        item_id: l.item_id,
        line: l,
        validSplits: l.splits.filter(s => Number(s.quantity) > 0)
      }))
      .filter(x => x.validSplits.length > 0);

    if (itemsToSend.length === 0) {
      setReceiveError(t('receive.noChanges') as string);
      return;
    }

    // Per-line validation: Σ split.quantity ≤ remaining
    for (const x of itemsToSend) {
      const total = x.validSplits.reduce((s, sp) => s + Number(sp.quantity), 0);
      if (total > x.line.remaining + 0.001) {
        setReceiveError(t('receive.exceedsRemaining') as string);
        return;
      }
    }

    setReceiveSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/receive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: itemsToSend.map(x => ({
            item_id: x.item_id,
            splits: x.validSplits.map(s => ({
              quantity: Number(s.quantity),
              reason: s.reason || null,
              unit_cost: s.reason === null ? Number(s.unit_cost) : undefined,
              batch_no: s.reason === null ? (s.batch_no.trim() || null) : undefined,
              expiry_date: s.reason === null ? (s.expiry_date || null) : undefined,
              discrepancy_note: s.reason !== null ? (s.discrepancy_note.trim() || null) : undefined
            }))
          }))
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setReceiveError(data?.message || (t('receive.submitFailed') as string));
        return;
      }
      setReceiveOpen(false);
      await fetchDetail();
    } catch (err) {
      console.error('Failed to receive PO:', err);
      setReceiveError(t('receive.submitFailed') as string);
    } finally {
      setReceiveSubmitting(false);
    }
  };

  // Cancel
  const openCancel = () => {
    setCancelReason('');
    setCancelError(null);
    setCancelOpen(true);
  };

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail || cancelSubmitting) return;
    if (!cancelReason.trim()) {
      setCancelError(t('cancel.reasonRequired') as string);
      return;
    }
    setCancelError(null);
    setCancelSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: cancelReason.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setCancelError(data?.message || (t('cancel.submitFailed') as string));
        return;
      }
      setCancelOpen(false);
      await fetchDetail();
    } catch (err) {
      console.error('Failed to cancel PO:', err);
      setCancelError(t('cancel.submitFailed') as string);
    } finally {
      setCancelSubmitting(false);
    }
  };

  const renderTimeline = () => {
    if (!detail) return null;
    const status = detail.status;
    const stageIndex = STAGES.indexOf(status === 'partial_received' ? 'in_transit' : status);
    const isCancelled = status === 'cancelled';

    const stageMeta: Record<POStatus, string | null | undefined> = {
      draft: detail.created_at,
      submitted: detail.submitted_at,
      confirmed: detail.confirmed_at,
      shipped: detail.shipped_at,
      delivered: detail.shipped_at,
      partial_received: detail.shipped_at,
      received: detail.received_at,
      cancelled: detail.cancelled_at
    };

    return (
      <Timeline>
        {STAGES.map((stage, idx) => {
          const active = !isCancelled && (stage === status || (stage === 'shipped' && status === 'partial_received') || (stage === 'delivered' && status === 'partial_received'));
          const done = !isCancelled && idx < stageIndex;
          return (
            <TimelineItem key={stage} active={active} done={done}>
              <TimelineContent>
                <strong>{t(`detail.timeline.${stage}`)}</strong>
                {stageMeta[stage] && (
                  <div className="meta">{formatDate(stageMeta[stage]!)}</div>
                )}
              </TimelineContent>
            </TimelineItem>
          );
        })}
        {isCancelled && (
          <TimelineItem cancelled>
            <TimelineContent>
              <strong>{t('detail.timeline.cancelled')}</strong>
              {detail.cancelled_at && <div className="meta">{formatDate(detail.cancelled_at)}</div>}
              {detail.cancellation_reason && <div className="meta">{detail.cancellation_reason}</div>}
            </TimelineContent>
          </TimelineItem>
        )}
      </Timeline>
    );
  };

  const handlePrintOrder = async () => {
    if (!detail) return;
    const token = getAuthToken();
    const w = window.open('', '_blank');
    if (!w) return;
    try {
      const res = await fetch(`/api/purchase-orders/${detail.id}/pdf`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const html = await res.text();
      w.document.write(html);
      w.document.close();
    } catch { w.close(); }
  };

  const handleDownloadOrderPdf = async () => {
    if (!detail) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${detail.id}/pdf`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) { setAlertDlg({ title: t('common:error', 'Error') as string, message: 'Failed to load order' }); return; }
      const html = (await res.text()).replace(/<script[\s\S]*?window\.print[\s\S]*?<\/script>/gi, '');
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;height:1123px;border:0;';
      document.body.appendChild(iframe);
      try {
        const doc = iframe.contentDocument!;
        doc.open(); doc.write(html); doc.close();
        await new Promise(r => setTimeout(r, 400));
        await renderIframeToPdf(iframe, `${detail.po_number || 'order'}.pdf`);
      } finally {
        iframe.remove();
      }
    } catch (e) {
      console.error('download order pdf failed:', e);
      setAlertDlg({ title: t('common:error', 'Error') as string, message: 'Failed to download' });
    }
  };

  const renderActions = () => {
    if (!detail) return null;
    const s = detail.status;
    return (
      <HeaderActions>
        {s === 'draft' && (
          <>
            <ThemedButton
              variant="primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? t('common.submitting') : t('detail.actions.submit')}
            </ThemedButton>
            <ThemedButton variant="danger-outline" onClick={openCancel}>
              {t('detail.actions.cancel')}
            </ThemedButton>
          </>
        )}
        {s === 'confirmed' && (
          <>
            <ThemedButton variant="primary" onClick={openShipped}>
              {t('detail.actions.markShipped')}
            </ThemedButton>
            <ThemedButton variant="danger-outline" onClick={openCancel}>
              {t('detail.actions.cancel')}
            </ThemedButton>
          </>
        )}
        {(s === 'shipped' || s === 'delivered' || s === 'partial_received') && (
          <ThemedButton variant="primary" onClick={openReceive}>
            {t('detail.actions.receive')}
          </ThemedButton>
        )}
        {(s === 'submitted') && (
          <ThemedButton variant="danger-outline" onClick={openCancel}>
            {t('detail.actions.cancel')}
          </ThemedButton>
        )}
        {(s === 'received' || s === 'partial_received' || s === 'delivered') && (
          <ThemedButton
            variant="outline"
            onClick={() => setShowReturnsModal(true)}
            title={t('detail.actions.returns', 'Request Return') as string}
          >
            {t('detail.actions.returns', 'Request Return')}
          </ThemedButton>
        )}
        {!embedded && (
          <>
            <HeaderIconBtn
              type="button"
              onClick={handlePrintOrder}
              title={t('detail.actions.print', 'Print') as string}
              aria-label={t('detail.actions.print', 'Print') as string}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </HeaderIconBtn>
            <HeaderIconBtn
              type="button"
              onClick={handleDownloadOrderPdf}
              title={t('detail.actions.download', 'Download PDF') as string}
              aria-label={t('detail.actions.download', 'Download PDF') as string}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </HeaderIconBtn>
          </>
        )}
      </HeaderActions>
    );
  };

  const Outer: any = embedded ? React.Fragment : Container;
  return (
    <Outer>
      {embedded ? (
        detail && (
          <EmbeddedTitle>
            <h1>{detail.po_number}</h1>
            <DataTableStatus variant={StatusVariantMap[detail.status] || 'info'}>
              {t(`status.${detail.status}`)}
            </DataTableStatus>
            {detail.seller_name && (
              <span style={{ marginLeft: 8, color: '#4B5563', fontSize: 13 }}>· {detail.seller_name}</span>
            )}
          </EmbeddedTitle>
        )
      ) : (
        <Header>
          <div>
            <Title>
              {detail ? detail.po_number : (loading ? '...' : '')}
              {detail && (
                <span style={{ marginLeft: 12 }}>
                  <DataTableStatus variant={StatusVariantMap[detail.status] || 'info'}>
                    {t(`status.${detail.status}`)}
                  </DataTableStatus>
                </span>
              )}
            </Title>
            <Subtitle>{detail?.seller_name || ''}</Subtitle>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <ThemedButton variant="outline" onClick={() => navigate('/pos/purchase-orders/new')}>
              {t('detail.orderMore', '+ Order More')}
            </ThemedButton>
            {renderActions()}
          </div>
        </Header>
      )}

      <Content>
        {error && <ErrorBox>{error}</ErrorBox>}

        {loading && !detail ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#4B5563' }}>
            {t('list.loading')}
          </div>
        ) : !detail ? null : (
          <>
            {detail.status === 'pending_approval' && (
              <div style={{
                background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8,
                padding: '12px 16px', marginBottom: 16, color: '#92400E', fontSize: 14
              }}>
                {t('detail.awaitingApproval', 'This purchase order is awaiting Owner approval before it is sent to the supplier.')}
              </div>
            )}
            {detail.status === 'draft' && detail.rejected_reason && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8,
                padding: '12px 16px', marginBottom: 16, color: '#991B1B', fontSize: 14
              }}>
                <strong>{t('detail.rejectedByOwner', 'Rejected by Owner')}:</strong> {detail.rejected_reason}
              </div>
            )}

            <Section>
              <h3>{t('detail.timeline.title')}</h3>
              {renderTimeline()}
            </Section>

            {(detail as any).tracking_info && (
              <Section>
                <DeliveryTimeline
                  events={(detail as any).tracking_info?.events}
                  carrier_name={(detail as any).tracking_info?.carrier_name}
                  carrier_code={(detail as any).tracking_info?.carrier_code}
                  tracking_number={(detail as any).tracking_info?.tracking_number}
                  tracking_url={(detail as any).tracking_info?.tracking_url}
                  estimated_arrival={(detail as any).tracking_info?.estimated_arrival}
                />
              </Section>
            )}

            <Section>
              <h3>{t('detail.section.items')}</h3>
              <DataTableContainer>
                <DataTable>
                  <DataTableHead>
                    <tr>
                      <DataTableHeaderCell align="left">{t('detail.items.ingredient')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('detail.items.qtyOrdered')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('detail.items.qtyReceived')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('detail.items.unitPrice')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('detail.items.lineTotal')}</DataTableHeaderCell>
                    </tr>
                  </DataTableHead>
                  <tbody>
                    {detail.items.length === 0 ? (
                      <tr><td colSpan={5}><DataTableEmpty>—</DataTableEmpty></td></tr>
                    ) : (
                      detail.items.map(it => {
                        const lineTotal = it.line_total != null
                          ? Number(it.line_total)
                          : Number(it.quantity_ordered) * Number(it.unit_price);
                        return (
                          <DataTableRow key={it.id}>
                            <DataTableCell data-label={t('detail.items.ingredient') as string}>
                              <strong>{it.ingredient_name}</strong>
                              {(it.seller_product_name || it.seller_product_sku) && (
                                <div style={{ fontSize: 12, color: '#6B7280' }}>
                                  {it.seller_product_name || ''}
                                  {it.seller_product_sku ? `${it.seller_product_name ? ' · ' : ''}SKU: ${it.seller_product_sku}` : ''}
                                </div>
                              )}
                            </DataTableCell>
                            <DataTableCell data-label={t('detail.items.qtyOrdered') as string} align="right">
                              {Number(it.quantity_ordered).toFixed(2)} {it.ingredient_unit || ''}
                            </DataTableCell>
                            <DataTableCell data-label={t('detail.items.qtyReceived') as string} align="right">
                              {Number(it.quantity_received).toFixed(2)} {it.ingredient_unit || ''}
                            </DataTableCell>
                            <DataTableCell data-label={t('detail.items.unitPrice') as string} align="right">
                              {formatMoney(it.unit_price)}
                            </DataTableCell>
                            <DataTableCell data-label={t('detail.items.lineTotal') as string} align="right">
                              {formatMoney(lineTotal)}
                            </DataTableCell>
                          </DataTableRow>
                        );
                      })
                    )}
                  </tbody>
                </DataTable>
              </DataTableContainer>

              <TotalsBox>
                <div>
                  <span>{t('detail.items.subtotal')}</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div>
                  <span>{t('detail.items.tax')}</span>
                  <span>{formatMoney(tax)}</span>
                </div>
                <div className="total">
                  <span>{t('detail.items.total')}</span>
                  <span>{formatMoney(total)}</span>
                </div>
              </TotalsBox>
            </Section>

            {(((detail as any).external_invoice_url) || ((detail as any).trade_invoice_id)) && (
              <Section>
                <h3>{t('detail.section.invoice', 'Invoice')}</h3>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', background: '#F1F4F8', border: '1px solid #C7CED6',
                  borderRadius: 8
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>
                    </svg>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {(detail as any).external_invoice_url
                          ? ((detail as any).external_invoice_filename || t('detail.invoice.uploadedFile', 'Uploaded invoice'))
                          : `${t('detail.invoice.tradeNo', 'Trade Invoice')} #${(detail as any).trade_invoice_id}`}
                      </div>
                      <div style={{ fontSize: 11, color: '#4B5563', marginTop: 2 }}>
                        {(detail as any).external_invoice_url
                          ? t('detail.invoice.externalLabel', 'Uploaded by buyer (external supplier)')
                          : t('detail.invoice.systemLabel', 'Auto-issued by system')}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <ThemedButton
                      size="small"
                      variant="outline"
                      onClick={() => {
                        const url = (detail as any).external_invoice_url;
                        if (url) {
                          window.open(url, '_blank');
                        } else if ((detail as any).trade_invoice_id) {
                          navigate(`${invoiceListPath}?id=${(detail as any).trade_invoice_id}`);
                        }
                      }}
                    >
                      {t('detail.invoice.view', 'View')}
                    </ThemedButton>
                    <ThemedButton
                      size="small"
                      variant="outline"
                      onClick={() => {
                        const url = (detail as any).external_invoice_url;
                        if (url) {
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = (detail as any).external_invoice_filename || `invoice-${detail.po_number}.pdf`;
                          document.body.appendChild(a); a.click(); a.remove();
                        } else if ((detail as any).trade_invoice_id) {
                          window.open(`/api/invoices/${(detail as any).trade_invoice_id}/pdf`, '_blank');
                        }
                      }}
                    >
                      {t('detail.invoice.download', 'Download')}
                    </ThemedButton>
                  </div>
                </div>
              </Section>
            )}

            <Section>
              <h3>{t('detail.section.delivery')}</h3>
              <KvGrid>
                <KvKey>{t('detail.delivery.expected')}</KvKey>
                <KvValue>{formatDate(detail.expected_delivery_date) || '-'}</KvValue>
                <KvKey>{t('detail.delivery.actual')}</KvKey>
                <KvValue>{formatDate(detail.actual_delivery_date) || '-'}</KvValue>
                <KvKey>{t('detail.delivery.address')}</KvKey>
                <KvValue>{detail.delivery_address || '-'}</KvValue>
              </KvGrid>
            </Section>

            <Section>
              <h3>{t('detail.section.notes')}</h3>
              <div style={{ fontSize: 14, color: '#1F2937', whiteSpace: 'pre-wrap' }}>
                {detail.notes || t('detail.noNotes')}
              </div>
            </Section>
          </>
        )}
      </Content>

      {embedded && detail && (
        <EmbeddedFooter>
          <ThemedButton variant="outline" onClick={() => navigate('/pos/purchase-orders/new')}>
            {t('detail.orderMore', '+ Order More')}
          </ThemedButton>
          {renderActions()}
        </EmbeddedFooter>
      )}

      {/* Receive Modal */}
      <CommonModal
        zIndex={embedded ? 1200 : undefined}
        isOpen={receiveOpen}
        onClose={() => !receiveSubmitting && setReceiveOpen(false)}
        title={t('receive.modalTitle') as string}
        size="large"
        footer={
          <>
            <ModalButton type="button" onClick={() => setReceiveOpen(false)} disabled={receiveSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="po-receive-form"
              variant="primary"
              disabled={receiveSubmitting}
            >
              {receiveSubmitting ? t('receive.submitting') : t('receive.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="po-receive-form" onSubmit={handleReceive}>
          <p style={{ margin: '0 0 16px', color: '#4B5563', fontSize: 13 }}>{t('receive.subtitle')}</p>

          {receiveLines.map(line => {
            const totalSplit = line.splits.reduce((s, sp) => s + Number(sp.quantity || 0), 0);
            const overshoot = totalSplit > line.remaining + 0.001;
            const okQty = line.splits.filter(s => s.reason === null).reduce((s, sp) => s + Number(sp.quantity || 0), 0);
            const damagedQty = line.splits.filter(s => s.reason === 'damaged' || s.reason === 'wrong_item').reduce((s, sp) => s + Number(sp.quantity || 0), 0);
            const issueQty = line.splits.filter(s => s.reason === 'short' || s.reason === 'pending').reduce((s, sp) => s + Number(sp.quantity || 0), 0);

            return (
              <ReceiveLineCard key={line.item_id}>
                <div className="line-head">
                  <div className="name">
                    {line.ingredient_name}
                    {line.unit && <span style={{ fontWeight: 400, color: '#6B7280', marginLeft: 6 }}>· {line.unit}</span>}
                  </div>
                  <div className="stat">
                    {t('receive.ordered')}: {line.ordered} · {t('receive.alreadyReceived')}: {line.alreadyReceived} · {t('receive.remaining', 'remaining')}: <strong style={{ color: overshoot ? '#DC2626' : '#0A2540' }}>{(line.remaining - totalSplit).toFixed(2)}</strong>
                  </div>
                </div>

                <div className="splits-stack">
                  {line.splits.map((sp, idx) => (
                    <SplitRow key={sp.uid} $reason={sp.reason}>
                      <div>
                        <Segmented role="radiogroup">
                          <button type="button" className={sp.reason === null ? 'active' : ''} onClick={() => updateSplit(line.item_id, sp.uid, { reason: null })}>{t('receive.normal', 'OK')}</button>
                          <button type="button" className={sp.reason === 'short' ? 'active' : ''} onClick={() => updateSplit(line.item_id, sp.uid, { reason: 'short' })}>{t('receive.short', 'Short')}</button>
                          <button type="button" className={sp.reason === 'damaged' ? 'active' : ''} onClick={() => updateSplit(line.item_id, sp.uid, { reason: 'damaged' })}>{t('receive.damaged', 'Damaged')}</button>
                          <button type="button" className={sp.reason === 'wrong_item' ? 'active' : ''} onClick={() => updateSplit(line.item_id, sp.uid, { reason: 'wrong_item' })}>{t('receive.wrongItem', 'Wrong')}</button>
                          <button type="button" className={sp.reason === 'pending' ? 'active' : ''} onClick={() => updateSplit(line.item_id, sp.uid, { reason: 'pending' })}>{t('receive.pending', 'Pend')}</button>
                        </Segmented>
                      </div>

                      <div>
                        <SmallInput
                          type="number" step="0.01" min="0" inputMode="decimal"
                          placeholder="qty"
                          value={sp.quantity || ''}
                          onChange={(e) => updateSplit(line.item_id, sp.uid, { quantity: Number(e.target.value) })}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {sp.reason === null && (
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            <SmallInput type="text" placeholder={t('receive.batchNo') as string} value={sp.batch_no} onChange={(e) => updateSplit(line.item_id, sp.uid, { batch_no: e.target.value })} style={{ flex: 1, minWidth: 100 }} />
                            <DateField value={sp.expiry_date} onChange={(v) => updateSplit(line.item_id, sp.uid, { expiry_date: v })} />
                            <SmallInput type="number" step="0.01" placeholder={t('receive.unitCost') as string} value={sp.unit_cost} onChange={(e) => updateSplit(line.item_id, sp.uid, { unit_cost: Number(e.target.value) })} style={{ width: 90 }} />
                          </div>
                        )}
                        {sp.reason !== null && (
                          <SmallInput
                            type="text"
                            placeholder={t('receive.discrepancyNote', 'Note (optional)') as string}
                            value={sp.discrepancy_note}
                            onChange={(e) => updateSplit(line.item_id, sp.uid, { discrepancy_note: e.target.value })}
                          />
                        )}
                        {(sp.reason === 'damaged' || sp.reason === 'wrong_item') && Number(sp.quantity) > 0 && (
                          <AutoReturnHint>
                            ✦ {t('receive.autoReturnHint', `Auto-return will be created for ${Number(sp.quantity)} ${line.unit || ''}`)
                              .replace('{qty}', String(Number(sp.quantity)))
                              .replace('{unit}', line.unit || '')}
                          </AutoReturnHint>
                        )}
                      </div>

                      <div>
                        {line.splits.length > 1 && (
                          <RemoveSplitBtn type="button" onClick={() => removeSplit(line.item_id, sp.uid)} title={t('receive.removeSplit', 'Remove') as string}>×</RemoveSplitBtn>
                        )}
                      </div>
                    </SplitRow>
                  ))}
                </div>

                <button type="button" className="add-split" onClick={() => addSplit(line.item_id, 'damaged')}>
                  ⊕ {t('receive.reportIssue', 'Report issue with this line')}
                </button>

                <div className="summary">
                  <span className={overshoot ? 'warn' : 'ok'}>
                    {okQty > 0 && `${okQty} OK`}
                    {damagedQty > 0 && ` · ${damagedQty} damaged/wrong`}
                    {issueQty > 0 && ` · ${issueQty} short/pending`}
                    {totalSplit === 0 && t('receive.noChanges', 'No quantity entered')}
                    {overshoot && ` · ${t('receive.exceedsRemaining', 'exceeds remaining')}`}
                  </span>
                </div>
              </ReceiveLineCard>
            );
          })}

          {receiveError && <ErrorBox>{receiveError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* Cancel Modal */}
      <CommonModal
        zIndex={embedded ? 1200 : undefined}
        isOpen={cancelOpen}
        onClose={() => !cancelSubmitting && setCancelOpen(false)}
        title={t('cancel.modalTitle') as string}
        footer={
          <>
            <ModalButton type="button" onClick={() => setCancelOpen(false)} disabled={cancelSubmitting}>
              {t('common.close')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="po-cancel-form"
              variant="danger"
              disabled={cancelSubmitting}
            >
              {cancelSubmitting ? t('common.submitting') : t('cancel.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="po-cancel-form" onSubmit={handleCancel}>
          <div style={{
            padding: 12,
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: 8,
            color: '#991B1B',
            fontSize: 13,
            marginBottom: 16
          }}>
            {t('cancel.warning')}
          </div>
          <FormGroup>
            <FormLabel>{t('cancel.reasonLabel')} *</FormLabel>
            <FormTextArea
              rows={4}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder={t('cancel.reasonPlaceholder') as string}
              maxLength={500}
              required
            />
          </FormGroup>
          {cancelError && <ErrorBox>{cancelError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* Mark Shipped Modal */}
      <CommonModal
        zIndex={embedded ? 1200 : undefined}
        isOpen={shippedOpen}
        onClose={() => !shippedSubmitting && setShippedOpen(false)}
        title={t('markShipped.modalTitle') as string}
        footer={
          <>
            <ModalButton type="button" onClick={() => setShippedOpen(false)} disabled={shippedSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="po-shipped-form"
              variant="primary"
              disabled={shippedSubmitting}
            >
              {shippedSubmitting ? t('common.submitting') : t('markShipped.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="po-shipped-form" onSubmit={handleMarkShipped}>
          <p style={{ margin: '0 0 16px', color: '#4B5563', fontSize: 13 }}>{t('markShipped.hint')}</p>
          <FormGroup>
            <FormLabel>{t('markShipped.trackingLabel')}</FormLabel>
            <FormInput
              type="text"
              value={trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
              placeholder={t('markShipped.trackingPlaceholder') as string}
            />
          </FormGroup>
          {shippedError && <ErrorBox>{shippedError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* Sprint 6 — Returns Modal */}
      <CommonModal
        zIndex={embedded ? 1200 : undefined}
        isOpen={showReturnsModal}
        onClose={() => !returnSubmitting && setShowReturnsModal(false)}
        title={t('detail.returns.title', 'Request Return') as string}
        size="medium"
        footer={
          <>
            <ModalButton type="button" onClick={() => setShowReturnsModal(false)} disabled={returnSubmitting}>
              {t('common.close', 'Close')}
            </ModalButton>
            <ModalButton type="button" variant="primary" onClick={submitReturns} disabled={returnSubmitting}>
              {returnSubmitting ? t('common.submitting', 'Submitting…') : t('detail.returns.submit', 'Submit Return')}
            </ModalButton>
          </>
        }
      >
        <div style={{ padding: 12, background: '#FFFBEB', border: '1px solid #F59E0B', borderRadius: 8, fontSize: 13, color: '#78350F', marginBottom: 16 }}>
          {t('detail.returns.hint', 'Specify return quantity per line. Returns require seller approval.')}
        </div>

        {existingReturns.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 6 }}>
              {t('detail.returns.existing', 'Existing returns')}
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              {existingReturns.map(r => (
                <div key={r.id} style={{ padding: 8, border: '1px solid #C7CED6', borderRadius: 6, fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <span>#{r.id} · qty {r.quantity} {r.unit || ''} · {r.reason || '—'}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                    background: r.status === 'approved' ? '#ECFDF5' : r.status === 'rejected' ? '#FEF2F2' : '#FEF3C7',
                    color: r.status === 'approved' ? '#065F46' : r.status === 'rejected' ? '#991B1B' : '#92400E'
                  }}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: 12 }}>
          {returnLines.length === 0 ? (
            <div style={{ padding: 16, textAlign: 'center', color: '#4B5563', fontSize: 13 }}>
              {t('detail.returns.noReceived', 'No received items to return') as string}
            </div>
          ) : returnLines.map((line, idx) => {
            const item = detail?.items.find(it => it.id === line.purchase_order_item_id);
            const maxQty = item ? parseFloat(String(item.quantity_received)) : 0;
            return (
              <div key={line.purchase_order_item_id} style={{ padding: 12, border: '1px solid #C7CED6', borderRadius: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', marginBottom: 8 }}>
                  {item?.ingredient_name || `Item #${line.purchase_order_item_id}`}
                </div>
                <div style={{ fontSize: 11, color: '#4B5563', marginBottom: 8 }}>
                  {t('detail.returns.received', 'Received')}: {maxQty} {item?.ingredient_unit || ''}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8 }}>
                  <FormInput
                    type="number"
                    min="0"
                    max={maxQty}
                    step="0.01"
                    placeholder={`Max ${maxQty}`}
                    value={line.quantity}
                    onChange={(e) => setReturnLines(arr => arr.map((l, i) => i === idx ? { ...l, quantity: e.target.value } : l))}
                  />
                  <FormInput
                    type="text"
                    placeholder={t('detail.returns.reasonPlaceholder', 'Reason (optional)') as string}
                    value={line.reason}
                    onChange={(e) => setReturnLines(arr => arr.map((l, i) => i === idx ? { ...l, reason: e.target.value } : l))}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {returnError && <ErrorBox style={{ marginTop: 12 }}>{returnError}</ErrorBox>}
      </CommonModal>
      <AlertDialog
        isOpen={!!alertDlg}
        onClose={() => setAlertDlg(null)}
        title={alertDlg?.title || ''}
        message={alertDlg?.message || ''}
      />
    </Outer>
  );
};

export default PurchaseOrderDetailPage;
