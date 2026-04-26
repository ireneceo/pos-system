import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  TabContainer, Tab,
  Modal, FormGroup, FormLabel, FormInput, FormTextArea, ModalButton
} from '../../components/UI';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

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

type POStatus = 'submitted' | 'confirmed' | 'shipped' | 'received' | 'cancelled';

type TabKey = 'submitted' | 'confirmed' | 'shipped' | 'received' | 'cancelled';

interface IncomingOrderRow {
  id: number;
  po_number: string;
  buyer_name?: string | null;
  buyer_entity_type?: string | null;
  buyer_entity_id?: number | null;
  status: POStatus | string;
  item_count?: number;
  total_amount?: number | string | null;
  currency?: string;
  created_at?: string | null;
  expected_delivery_date?: string | null;
  tracking_info?: { carrier?: string; tracking_number?: string; est_arrival?: string; notes?: string } | null;
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
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const TabCount = styled.span`
  display: inline-block;
  margin-left: 6px;
  padding: 2px 8px;
  background: #E6EBF1;
  color: #6B7280;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

const StatusVariantMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  submitted: 'warning',
  confirmed: 'warning',
  shipped: 'info',
  received: 'success',
  partial_received: 'warning',
  cancelled: 'error',
  draft: 'info'
};

const TAB_KEYS: TabKey[] = ['submitted', 'confirmed', 'shipped', 'received', 'cancelled'];

function asNumber(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

const IncomingOrdersView: React.FC<IncomingOrdersViewProps> = ({ sellerScope, i18nNamespace }) => {
  // Use 'supplier' namespace for shared keys — Brand/Foodcourt pages still
  // re-use the supplier orders namespace so we don't duplicate strings.
  const { t } = useTranslation([i18nNamespace, 'supplier', 'common']);

  const [activeTab, setActiveTab] = useState<TabKey>('submitted');
  const [rows, setRows] = useState<IncomingOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState<SellerOrderStats>({});
  const [counts, setCounts] = useState<Record<TabKey, number>>({
    submitted: 0, confirmed: 0, shipped: 0, received: 0, cancelled: 0
  });

  // Modal state
  const [confirmModalRow, setConfirmModalRow] = useState<IncomingOrderRow | null>(null);
  const [shipModalRow, setShipModalRow] = useState<IncomingOrderRow | null>(null);
  const [rejectModalRow, setRejectModalRow] = useState<IncomingOrderRow | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Ship form
  const [carrier, setCarrier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estArrival, setEstArrival] = useState('');
  const [shipNotes, setShipNotes] = useState('');

  // Reject form
  const [rejectReason, setRejectReason] = useState('');

  const fetchList = useCallback(async (status: TabKey) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      params.set('status', status);
      const res = await fetch(`/api/seller-orders?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setRows([]);
        return;
      }
      setRows(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Failed to fetch incoming orders:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

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
        setCounts({
          submitted: payload.counts.submitted ?? 0,
          confirmed: payload.counts.confirmed ?? 0,
          shipped: payload.counts.shipped ?? 0,
          received: payload.counts.received ?? 0,
          cancelled: payload.counts.cancelled ?? 0
        });
      }
    } catch (err) {
      console.error('Failed to fetch seller order stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchList(activeTab);
  }, [activeTab, fetchList]);

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
    setCarrier(row.tracking_info?.carrier || '');
    setTrackingNumber(row.tracking_info?.tracking_number || '');
    setEstArrival(row.tracking_info?.est_arrival || '');
    setShipNotes(row.tracking_info?.notes || '');
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
      const res = await fetch(`/api/seller-orders/${shipModalRow.id}/ship`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tracking_info: {
            carrier: carrier.trim(),
            tracking_number: trackingNumber.trim() || null,
            est_arrival: estArrival || null,
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
          <Title>{tNs('orders.title', 'Incoming Orders')}</Title>
          <Subtitle>{tNs('orders.subtitle', '')}</Subtitle>
        </div>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#F59E0B">
            <StatValue>{stats.pending ?? 0}</StatValue>
            <StatLabel>{tNs('orders.stats.pending', 'Pending Review')}</StatLabel>
          </StatCard>
          <StatCard color="#635BFF">
            <StatValue>{stats.confirmed ?? 0}</StatValue>
            <StatLabel>{tNs('orders.stats.confirmed', 'Confirmed')}</StatLabel>
          </StatCard>
          <StatCard color="#06B6D4">
            <StatValue>{stats.shipped ?? 0}</StatValue>
            <StatLabel>{tNs('orders.stats.shipped', 'Shipped')}</StatLabel>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{stats.received_this_month ?? 0}</StatValue>
            <StatLabel>{tNs('orders.stats.received', 'Received This Month')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <TabContainer>
          {TAB_KEYS.map(tab => (
            <Tab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tNs(`orders.tabs.${tab}`, tab)}
              {(counts[tab] ?? 0) > 0 && <TabCount>{counts[tab]}</TabCount>}
            </Tab>
          ))}
        </TabContainer>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder={tNs('tradeInvoicesPage.filter.searchBuyer', 'Search buyer or PO #')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{tNs('orders.table.poNumber', 'PO #')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{tNs('orders.table.buyer', 'Buyer')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{tNs('orders.table.items', 'Items')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{tNs('orders.table.total', 'Total')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{tNs('orders.table.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{tNs('orders.table.createdAt', 'Created')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{tNs('orders.table.actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}><DataTableEmpty>...</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <DataTableEmpty>
                      <div style={{ color: '#6B7280' }}>{tNs('orders.empty', 'No incoming orders in this status.')}</div>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => (
                  <DataTableRow key={row.id}>
                    <DataTableCell><strong>{row.po_number}</strong></DataTableCell>
                    <DataTableCell>{row.buyer_name || '-'}</DataTableCell>
                    <DataTableCell align="center">{row.item_count ?? 0}</DataTableCell>
                    <DataTableCell align="right">{formatMoney(row.total_amount, row.currency)}</DataTableCell>
                    <DataTableCell align="center">
                      <DataTableStatus variant={StatusVariantMap[row.status] || 'info'}>
                        {tNs(`status.${row.status}`, row.status)}
                      </DataTableStatus>
                    </DataTableCell>
                    <DataTableCell>{formatDate(row.created_at) || '-'}</DataTableCell>
                    <DataTableCell align="right" mobileFullWidth>
                      <DataTableActions>
                        {row.status === 'submitted' && (
                          <>
                            <ThemedButton
                              size="small"
                              variant="primary"
                              onClick={() => { setConfirmModalRow(row); setErrorMessage(null); }}
                            >
                              {tNs('orders.actions.confirm', 'Confirm')}
                            </ThemedButton>
                            <ThemedButton
                              size="small"
                              variant="outline"
                              onClick={() => { setRejectModalRow(row); setRejectReason(''); setErrorMessage(null); }}
                            >
                              {tNs('orders.actions.reject', 'Reject')}
                            </ThemedButton>
                          </>
                        )}
                        {row.status === 'confirmed' && (
                          <ThemedButton
                            size="small"
                            variant="primary"
                            onClick={() => openShipModal(row)}
                          >
                            {tNs('orders.actions.ship', 'Mark Shipped')}
                          </ThemedButton>
                        )}
                      </DataTableActions>
                    </DataTableCell>
                  </DataTableRow>
                ))
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
        <p style={{ margin: 0, color: '#374151' }}>
          {tNs('orders.confirm.message', 'Confirm this purchase order?')}
        </p>
        {confirmModalRow && (
          <div style={{ marginTop: 12, padding: 12, background: '#F8FAFC', borderRadius: 8, fontSize: 13, color: '#6B7280' }}>
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
          <FormInput
            type="text"
            placeholder={tNs('orders.ship.carrierPlaceholder', '')}
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

      {/* sellerScope is preserved as a prop so the backend can later branch
          if it ever needs to disambiguate seller_type from a hint. */}
      <input type="hidden" data-seller-scope={sellerScope} />
    </Container>
  );
};

export default IncomingOrdersView;
