import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DatePeriodFilter, { PeriodType, DateRange, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { useStore } from '../../contexts/StoreContext';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';
import { renderIframeToPdf } from '../../utils/invoicePdf';
import PurchaseOrderDetailPage from './PurchaseOrderDetailPage';
import AlertDialog from '../../components/Common/AlertDialog';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import { formatQuantity } from '../../utils/unitConversion';

// LiveOrders 와 동일한 FilterToolbar 패턴
const FilterToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  & > div:first-child > div { margin-bottom: 0 !important; }

  @media (max-width: 768px) { gap: 8px; }
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 220px;
  height: 38px;

  @media (max-width: 768px) {
    width: 100%;
    order: 10;
  }
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 32px 0 36px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; }
  &::placeholder { color: #6B7280; }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7280;
  pointer-events: none;
  display: inline-flex;
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #C7CED6;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  color: #4B5563;
  padding: 0;
  line-height: 1;
  &:hover { background: #6B7280; }
`;

const StatusFilter = styled.select`
  height: 38px;
  padding: 0 30px 0 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M3 5l3 3 3-3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  &:focus { outline: none; border-color: #635BFF; }
`;

const SupplierFilterWrap = styled.div`
  width: 220px;
  @media (max-width: 768px) { width: 100%; order: 9; }
`;

// Icon 전용 round button (Print/Download)
const IconBtn = styled.button`
  width: 32px;
  height: 32px;
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
  svg { width: 16px; height: 16px; }
`;

// ── Right slide-in panel for PO detail ─────────────────────────────
const PanelOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(10, 37, 64, 0.4);
  z-index: 1100;
  opacity: ${p => p.$open ? 1 : 0};
  pointer-events: ${p => p.$open ? 'auto' : 'none'};
  transition: opacity 0.2s ease;
`;

const PanelWrap = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 720px;
  max-width: 100vw;
  background: white;
  box-shadow: -8px 0 24px rgba(10, 37, 64, 0.15);
  z-index: 1101;
  transform: translateX(${p => p.$open ? '0' : '100%'});
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) { width: 100vw; }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #C7CED6;
  flex-shrink: 0;
  gap: 12px;

  h2 { margin: 0; font-size: 18px; font-weight: 700; color: #0A2540; }
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #F9FAFB;
`;

const PanelClose = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 22px;
  color: #4B5563;
  cursor: pointer;
  border-radius: 6px;
  &:hover { background: #F1F5F9; color: #0A2540; }
`;

const PanelTopBar = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NakedClose = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 26px;
  line-height: 1;
  color: #4B5563;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover { color: #0A2540; }
`;

const InfoCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 16px;

  h3 { margin: 0 0 12px; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.4px; }
  dl { margin: 0; display: grid; grid-template-columns: 110px 1fr; row-gap: 8px; column-gap: 12px; font-size: 13px; }
  dt { color: #4B5563; font-weight: 500; }
  dd { margin: 0; color: #0A2540; font-weight: 500; }
`;

const ItemTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #F1F5F9; }
  th { font-weight: 600; color: #475569; background: #F1F4F8; font-size: 12px; }
  td.num { text-align: right; }
  th.num { text-align: right; }
`;

type POStatus = 'draft' | 'pending_approval' | 'submitted' | 'confirmed' | 'shipped' | 'partial_received' | 'received' | 'cancelled';

interface POListRow {
  id: number;
  po_number: string;
  seller_type: string;
  seller_name?: string | null;
  status: POStatus;
  item_count?: number;
  total_quantity?: number;
  total_amount?: number | string | null;
  currency?: string;
  expected_delivery_date?: string | null;
  created_at?: string | null;
  is_external?: boolean;
  external_invoice_url?: string | null;
  external_invoice_filename?: string | null;
  trade_invoice_id?: number | null;
}

interface SuggestionItem {
  ingredient_id: number;
  ingredient_name: string;
  current_stock: number | string;
  par_level?: number | string | null;
  suggested_quantity: number | string;
  preferred_seller_id?: number | null;
  preferred_seller_type?: string | null;
  preferred_seller_name?: string | null;
}

interface SuggestionGroup {
  seller_id: number | null;
  seller_type: string | null;
  seller_name: string | null;
  items: SuggestionItem[];
}

const Subtitle = styled.div`
  color: #4B5563;
  font-size: 14px;
  margin-top: 4px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SuggestionBadge = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #FCD34D;
  background: #FFFBEB;
  color: #92400E;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;

  &:hover {
    background: #FEF3C7;
    border-color: #F59E0B;
  }
`;

const SuggestionPanel = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

const SuggestionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;

  h3 {
    margin: 0 0 4px;
    font-size: 16px;
    color: #0A2540;
  }
  p {
    margin: 0;
    font-size: 13px;
    color: #4B5563;
  }
`;

const SuggestionGroupBox = styled.div`
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;

  &:last-child { margin-bottom: 0; }
`;

const SuggestionGroupHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  strong { color: #0A2540; font-size: 14px; }
  span { color: #4B5563; font-size: 12px; }
`;

const SuggestionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #1F2937;

  li {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px dashed #F1F4F8;
  }
  li:last-child { border-bottom: none; }
`;

const StatusVariantMap: Record<POStatus, 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'info',
  pending_approval: 'warning',
  submitted: 'warning',
  confirmed: 'warning',
  shipped: 'info',
  partial_received: 'warning',
  received: 'success',
  cancelled: 'error'
};

function isPendingStatus(s: POStatus): boolean {
  return s === 'pending_approval' || s === 'submitted' || s === 'confirmed';
}

const PurchaseOrdersPage: React.FC = () => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const navigate = useNavigate();
  const { operationSettings } = useStore();
  const tz = operationSettings?.timeZone;

  const [rows, setRows] = useState<POListRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string | number | null>(null);
  const [search, setSearch] = useState('');

  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [dateRange, setDateRange] = useState<DateRange>(() => calculatePeriodDateRange('month', tz));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);

  // Detail side panel — DetailPage 컴포넌트가 자체 fetch
  const [selectedPoId, setSelectedPoId] = useState<number | null>(null);

  const [suggestions, setSuggestions] = useState<SuggestionGroup[]>([]);
  const [suggestionsCount, setSuggestionsCount] = useState(0);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [alertDlg, setAlertDlg] = useState<{ title: string; message: string } | null>(null);
  const [confirmDlg, setConfirmDlg] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (dateRange?.start) params.set('from', dateRange.start);
      if (dateRange?.end) params.set('to', dateRange.end);
      params.set('limit', '100');

      const url = `/api/purchase-orders${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      setRows(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Failed to fetch purchase orders:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dateRange]);

  const openDetailPanel = useCallback((poId: number) => {
    setSelectedPoId(poId);
  }, []);

  const closeDetailPanel = useCallback(() => {
    setSelectedPoId(null);
  }, []);

  // ESC closes
  useEffect(() => {
    if (!selectedPoId) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDetailPanel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedPoId, closeDetailPanel]);

  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period, tz));
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setDateRange({ start, end });
  };

  const fetchSuggestions = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-orders/suggestions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSuggestions([]);
        setSuggestionsCount(0);
        return;
      }
      // Backend may return either flat items[] or grouped[] — normalize to groups.
      const payload = data.data || {};
      let groups: SuggestionGroup[] = [];
      if (Array.isArray(payload.groups)) {
        groups = payload.groups;
      } else if (Array.isArray(payload.items)) {
        const map = new Map<string, SuggestionGroup>();
        for (const it of payload.items as SuggestionItem[]) {
          const key = `${it.preferred_seller_type || ''}:${it.preferred_seller_id ?? 'none'}`;
          if (!map.has(key)) {
            map.set(key, {
              seller_id: it.preferred_seller_id ?? null,
              seller_type: it.preferred_seller_type ?? null,
              seller_name: it.preferred_seller_name ?? null,
              items: []
            });
          }
          map.get(key)!.items.push(it);
        }
        groups = Array.from(map.values());
      } else if (Array.isArray(payload)) {
        groups = payload;
      }
      const total = groups.reduce((sum, g) => sum + g.items.length, 0);
      setSuggestions(groups);
      setSuggestionsCount(total);
    } catch (err) {
      console.error('Failed to fetch PO suggestions:', err);
      setSuggestions([]);
      setSuggestionsCount(0);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const supplierOptions = useMemo(() => {
    const map = new Map<string, { value: string; label: string }>();
    for (const r of rows) {
      if (r.seller_name) {
        const key = r.seller_name;
        if (!map.has(key)) map.set(key, { value: key, label: key });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [rows]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter(r => {
      if (supplierFilter && r.seller_name !== supplierFilter) return false;
      if (term && !(
        (r.seller_name || '').toLowerCase().includes(term) ||
        (r.po_number || '').toLowerCase().includes(term)
      )) return false;
      return true;
    });
  }, [rows, search, supplierFilter]);

  const stats = useMemo(() => {
    let draft = 0, pending = 0, shipped = 0, received = 0;
    for (const r of rows) {
      if (r.status === 'draft') draft++;
      else if (isPendingStatus(r.status)) pending++;
      else if (r.status === 'shipped') shipped++;
      else if (r.status === 'received' || r.status === 'partial_received') received++;
    }
    return { draft, pending, shipped, received };
  }, [rows]);

  const formatMoney = (amount: number | string | null | undefined, currency?: string) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return `${currency || 'MYR'} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleMarkReceived = (row: POListRow) => {
    setConfirmDlg({
      title: t('list.action.markReceivedTitle', 'Mark as Received') as string,
      message: t('list.action.markReceivedConfirm', { po: row.po_number, defaultValue: 'Mark "{{po}}" as received?' }) as string,
      onConfirm: async () => {
        try {
          const token = getAuthToken();
          const res = await fetch(`/api/purchase-orders/${row.id}/mark-received`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (!res.ok || !data.success) {
            setAlertDlg({ title: t('common:error', 'Error') as string, message: data.message || 'Failed to mark received' });
            return;
          }
          fetchList();
        } catch (e) { console.error(e); }
      }
    });
  };

  const handlePrintOrder = (row: POListRow) => {
    const token = getAuthToken();
    // /pdf endpoint serves HTML w/ window.print; opening with token in URL not ideal, so post-load print via new tab fetch
    const w = window.open('', '_blank');
    if (!w) return;
    fetch(`/api/purchase-orders/${row.id}/pdf`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.text())
      .then(html => { w.document.write(html); w.document.close(); })
      .catch(() => w.close());
  };

  const handleDownloadOrderPdf = async (row: POListRow) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${row.id}/pdf`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) { setAlertDlg({ title: t('common:error', 'Error') as string, message: 'Failed to load order' }); return; }
      // window.print 자동호출 스크립트 제거 (다운로드 시에는 인쇄 X)
      const html = (await res.text()).replace(/<script[\s\S]*?window\.print[\s\S]*?<\/script>/gi, '');

      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;height:1123px;border:0;';
      document.body.appendChild(iframe);
      try {
        const doc = iframe.contentDocument!;
        doc.open(); doc.write(html); doc.close();
        // 렌더 안정화
        await new Promise(r => setTimeout(r, 400));
        await renderIframeToPdf(iframe, `${row.po_number || 'order'}.pdf`);
      } finally {
        iframe.remove();
      }
    } catch (e) {
      console.error('download order pdf failed:', e);
      setAlertDlg({ title: t('common:error', 'Error') as string, message: 'Failed to download' });
    }
  };

  const handleViewInvoice = (row: POListRow) => {
    if (row.external_invoice_url) {
      window.open(row.external_invoice_url, '_blank');
    } else if (row.trade_invoice_id) {
      window.open(`/invoices/${row.trade_invoice_id}`, '_blank');
    }
  };

  const handleDownloadInvoice = (row: POListRow) => {
    if (row.external_invoice_url) {
      const a = document.createElement('a');
      a.href = row.external_invoice_url;
      a.download = row.external_invoice_filename || `invoice-${row.po_number}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
    } else if (row.trade_invoice_id) {
      window.location.href = `/api/invoices/${row.trade_invoice_id}/pdf`;
    }
  };

  const handleUploadInvoice = async (row: POListRow, file: File) => {
    try {
      const token = getAuthToken();
      const fd = new FormData();
      fd.append('files', file);
      const up = await fetch('/api/upload/files', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: fd });
      const upData = await up.json();
      if (!up.ok || !upData.success || !upData.data?.[0]) {
        setAlertDlg({ title: t('common:error', 'Error') as string, message: upData.message || 'Upload failed' });
        return;
      }
      const f = upData.data[0];
      const res = await fetch(`/api/purchase-orders/${row.id}/upload-invoice`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: f.url, filename: f.originalName })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setAlertDlg({ title: t('common:error', 'Error') as string, message: data.message || 'Failed to attach invoice' });
        return;
      }
      fetchList();
    } catch (e) { console.error(e); setAlertDlg({ title: t('common:error', 'Error') as string, message: 'Network error' }); }
  };

  const handleCreatePOFromSuggestion = (group: SuggestionGroup) => {
    const params = new URLSearchParams();
    if (group.seller_id != null) params.set('sellerId', String(group.seller_id));
    if (group.seller_type) params.set('sellerType', group.seller_type);
    const itemPayload = group.items.map(i => ({
      ingredient_id: i.ingredient_id,
      quantity: Number(i.suggested_quantity)
    }));
    params.set('items', encodeURIComponent(JSON.stringify(itemPayload)));
    navigate(`/pos/purchase-orders/new?${params.toString()}`);
  };

  return (
    <Container>
      <Header>
        <Title>{t('list.title')}</Title>
        {suggestionsCount > 0 && (
          <SuggestionBadge
            type="button"
            onClick={() => setSuggestionsOpen(o => !o)}
          >
            ▲ {t('list.suggestions.badge', { n: suggestionsCount })}
          </SuggestionBadge>
        )}
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#4B5563">
            <StatValue>{stats.draft}</StatValue>
            <StatLabel>{t('list.stats.draft')}</StatLabel>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{stats.pending}</StatValue>
            <StatLabel>{t('list.stats.pending')}</StatLabel>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{stats.shipped}</StatValue>
            <StatLabel>{t('list.stats.shipped')}</StatLabel>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{stats.received}</StatValue>
            <StatLabel>{t('list.stats.received')}</StatLabel>
          </StatCard>
        </StatsGrid>

        {suggestionsOpen && suggestions.length > 0 && (
          <SuggestionPanel>
            <SuggestionHead>
              <div>
                <h3>{t('list.suggestions.title')}</h3>
                <p>{t('list.suggestions.subtitle')}</p>
              </div>
              <ThemedButton
                size="small"
                variant="outline"
                onClick={() => setSuggestionsOpen(false)}
              >
                {t('common.close')}
              </ThemedButton>
            </SuggestionHead>
            {suggestions.map((g, idx) => (
              <SuggestionGroupBox key={`${g.seller_type || 'none'}-${g.seller_id ?? idx}`}>
                <SuggestionGroupHead>
                  <strong>{g.seller_name || t('list.suggestions.noPreferred')}</strong>
                  {g.seller_id != null && (
                    <ThemedButton
                      size="small"
                      variant="primary"
                      onClick={() => handleCreatePOFromSuggestion(g)}
                    >
                      {t('list.suggestions.createPO')}
                    </ThemedButton>
                  )}
                </SuggestionGroupHead>
                <SuggestionList>
                  {g.items.map((item) => (
                    <li key={item.ingredient_id}>
                      <span>{item.ingredient_name}</span>
                      <span>
                        {t('list.suggestions.currentStock')}: {Number(item.current_stock).toFixed(2)} ·{' '}
                        {t('list.suggestions.suggested')}: <strong>{formatQuantity(item.suggested_quantity)}</strong>
                      </span>
                    </li>
                  ))}
                </SuggestionList>
              </SuggestionGroupBox>
            ))}
          </SuggestionPanel>
        )}

        <FilterToolbar>
          <div>
            <DatePeriodFilter
              activePeriod={activePeriod}
              dateRange={dateRange}
              isCustomDateRange={isCustomDateRange}
              onPeriodChange={handlePeriodChange}
              onCalendarRangeSelect={handleCalendarRangeSelect}
              includeToday
            />
          </div>
          <SearchInputContainer>
            <SearchIcon>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </SearchIcon>
            <StyledSearchInput
              type="text"
              placeholder={t('list.filter.searchSeller', 'Search PO or supplier...') as string}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <ClearSearchButton type="button" onClick={() => setSearch('')} title="Clear search">×</ClearSearchButton>
            )}
          </SearchInputContainer>
          <SupplierFilterWrap>
            <SearchableSelect
              options={supplierOptions}
              value={supplierFilter}
              onChange={(v) => setSupplierFilter(v)}
              placeholder={t('list.filter.supplier', 'All suppliers') as string}
              allowClear
              noOptionsMessage={t('list.filter.noSupplier', 'No matching supplier') as string}
            />
          </SupplierFilterWrap>
          <StatusFilter value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">{t('list.filter.allStatuses')}</option>
            <option value="draft">{t('status.draft')}</option>
            <option value="submitted">{t('status.submitted')}</option>
            <option value="confirmed">{t('status.confirmed')}</option>
            <option value="shipped">{t('status.shipped')}</option>
            <option value="partial_received">{t('status.partial_received')}</option>
            <option value="received">{t('status.received')}</option>
            <option value="cancelled">{t('status.cancelled')}</option>
          </StatusFilter>
        </FilterToolbar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('list.table.poNumber')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('list.table.seller')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('list.table.items')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('list.table.totalQty', 'Qty')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('list.table.total')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('list.table.status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('list.table.expected')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('list.table.createdAt')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('list.table.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading && filteredRows.length === 0 ? (
                <tr><td colSpan={9}><DataTableEmpty>{t('list.loading')}</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <DataTableEmpty>
                      <div style={{ marginBottom: 12, fontSize: 16, fontWeight: 600, color: '#1F2937' }}>
                        {t('list.empty.title')}
                      </div>
                      <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 16 }}>
                        {t('list.empty.hint')}
                      </div>
                      <ThemedButton
                        size="small"
                        variant="primary"
                        onClick={() => navigate('/pos/purchase-orders/new')}
                      >
                        {t('list.empty.cta')}
                      </ThemedButton>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => {
                  const hasInvoice = !!(row.external_invoice_url || row.trade_invoice_id);
                  // 승인 대기(pending_approval) 발주는 아직 판매자에게 나가지도 않았다 → 수령 불가(서버도 400)
                  const canMarkReceived = row.status !== 'received' && row.status !== 'cancelled' && row.status !== 'draft' && row.status !== 'pending_approval';
                  const canUploadInvoice = row.is_external && !row.external_invoice_url && row.status !== 'draft' && row.status !== 'cancelled';
                  return (
                  <DataTableRow key={row.id}>
                    <DataTableCell data-label={t('list.table.poNumber') as string}>
                      <button
                        type="button"
                        onClick={() => openDetailPanel(row.id)}
                        style={{
                          background: 'none', border: 'none', padding: 0,
                          font: 'inherit', color: '#635BFF', fontWeight: 700,
                          cursor: 'pointer', textAlign: 'left'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                      >
                        {row.po_number}
                      </button>
                      {row.is_external && (
                        <span style={{
                          marginLeft: 8, fontSize: 10, padding: '2px 6px',
                          background: '#FEF3C7', color: '#92400E', borderRadius: 999, fontWeight: 700
                        }}>{t('list.externalBadge', 'EXT')}</span>
                      )}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.seller') as string}>
                      {row.seller_name || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.items') as string} align="center">
                      {row.item_count ?? 0}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.totalQty', 'Qty') as string} align="center">
                      {row.total_quantity != null ? Number(row.total_quantity).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.total') as string} align="right">
                      {formatMoney(row.total_amount, row.currency)}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.status') as string} align="center">
                      <DataTableStatus variant={StatusVariantMap[row.status] || 'info'}>
                        {t(`status.${row.status}`)}
                      </DataTableStatus>
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.expected') as string}>
                      {formatDate(row.expected_delivery_date) || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.createdAt') as string}>
                      {formatDate(row.created_at) || '-'}
                    </DataTableCell>
                    <DataTableCell data-label="" align="right" mobileFullWidth>
                      <DataTableActions>
                        <ThemedButton
                          size="small"
                          variant="outline"
                          onClick={() => openDetailPanel(row.id)}
                          title={t('list.view') as string}
                        >
                          {t('list.view')}
                        </ThemedButton>
                        <IconBtn
                          type="button"
                          onClick={() => handlePrintOrder(row)}
                          title={t('list.action.printOrder', 'Print order') as string}
                          aria-label={t('list.action.printOrder', 'Print order') as string}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </IconBtn>
                        <IconBtn
                          type="button"
                          onClick={() => handleDownloadOrderPdf(row)}
                          title={t('list.action.downloadOrder', 'Download order PDF') as string}
                          aria-label={t('list.action.downloadOrder', 'Download order PDF') as string}
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </IconBtn>
                        {/* 2026-08-31 Irene: "여기에 전체 리시브만 있는데 뭐 하나 안왔으면 어떻게 해?"
                            부분 입고는 원래 지원된다(상세 화면에서 품목별 수량·부족 사유 입력, status partial_received).
                            그런데 목록에는 전량 처리 버튼 하나뿐이라 **그 길이 있다는 걸 알 수 없었다.**
                            → ①버튼 이름을 "전량 입고"로 바꿔 전부 왔을 때만 쓰는 것임을 드러내고
                              ②옆에 "부분 입고"를 두어 상세(품목별 처리)로 보낸다. */}
                        {canMarkReceived && (
                          <>
                            <ThemedButton
                              size="small"
                              variant="primary"
                              onClick={() => handleMarkReceived(row)}
                              title={t('list.action.markReceivedAllTitle', 'All items arrived — mark the whole order received') as string}
                            >
                              {t('list.action.markReceivedAll', 'Receive all')}
                            </ThemedButton>
                            <ThemedButton
                              size="small"
                              variant="outline"
                              onClick={() => navigate(`/pos/purchase-orders/${row.id}`)}
                              title={t('list.action.receivePartialTitle', 'Some items missing — enter received quantity per item') as string}
                            >
                              {t('list.action.receivePartial', 'Partial')}
                            </ThemedButton>
                          </>
                        )}
                        {canUploadInvoice && (
                          <label style={{ display: 'inline-block' }}>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png,.webp"
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleUploadInvoice(row, f);
                                e.target.value = '';
                              }}
                            />
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                              padding: '6px 12px', fontSize: 12, fontWeight: 600,
                              border: '1px solid #635BFF', color: '#635BFF',
                              background: '#EEF2FF', borderRadius: 6, cursor: 'pointer'
                            }}>
                              {t('list.action.uploadInvoice', 'Upload Inv.')}
                            </span>
                          </label>
                        )}
                        {hasInvoice && (
                          <>
                            <ThemedButton
                              size="small"
                              variant="outline"
                              onClick={() => handleViewInvoice(row)}
                              title={t('list.action.viewInvoice', 'View invoice') as string}
                            >
                              {t('list.action.viewInvoice', 'Invoice')}
                            </ThemedButton>
                            <IconBtn
                              type="button"
                              onClick={() => handleDownloadInvoice(row)}
                              title={t('list.action.downloadInvoice', 'Download invoice') as string}
                              aria-label={t('list.action.downloadInvoice', 'Download invoice') as string}
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </IconBtn>
                          </>
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

      <PanelOverlay $open={!!selectedPoId} onClick={closeDetailPanel} />
      <PanelWrap $open={!!selectedPoId} aria-hidden={!selectedPoId}>
        <PanelTopBar>
          {selectedPoId && (
            <>
              <IconBtn
                type="button"
                onClick={() => handlePrintOrder({ id: selectedPoId, po_number: `order-${selectedPoId}` } as POListRow)}
                title={t('list.action.printOrder', 'Print order') as string}
                aria-label="Print"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconBtn>
              <IconBtn
                type="button"
                onClick={() => handleDownloadOrderPdf({ id: selectedPoId, po_number: `order-${selectedPoId}` } as POListRow)}
                title={t('list.action.downloadOrder', 'Download order PDF') as string}
                aria-label="Download"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconBtn>
            </>
          )}
          <NakedClose type="button" onClick={closeDetailPanel} aria-label="Close" title="Close (Esc)">×</NakedClose>
        </PanelTopBar>
        <PanelBody>
          {selectedPoId && (
            <PurchaseOrderDetailPage
              embeddedId={selectedPoId}
              embedded
              onClose={closeDetailPanel}
            />
          )}
        </PanelBody>
      </PanelWrap>
      <AlertDialog
        isOpen={!!alertDlg}
        onClose={() => setAlertDlg(null)}
        title={alertDlg?.title || ''}
        message={alertDlg?.message || ''}
      />
      <ConfirmDialog
        isOpen={!!confirmDlg}
        onClose={() => setConfirmDlg(null)}
        onConfirm={() => { const c = confirmDlg; setConfirmDlg(null); c?.onConfirm(); }}
        title={confirmDlg?.title || ''}
        message={confirmDlg?.message || ''}
      />
    </Container>
  );
};

export default PurchaseOrdersPage;
