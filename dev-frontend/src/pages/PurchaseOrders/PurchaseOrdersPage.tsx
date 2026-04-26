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
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

type POStatus = 'draft' | 'submitted' | 'confirmed' | 'shipped' | 'partial_received' | 'received' | 'cancelled';

interface POListRow {
  id: number;
  po_number: string;
  seller_type: string;
  seller_name?: string | null;
  status: POStatus;
  item_count?: number;
  total_amount?: number | string | null;
  currency?: string;
  expected_delivery_date?: string | null;
  created_at?: string | null;
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
  color: #6B7280;
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
  border: 1px solid #E6EBF1;
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
    color: #6B7280;
  }
`;

const SuggestionGroupBox = styled.div`
  border: 1px solid #E6EBF1;
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
  span { color: #6B7280; font-size: 12px; }
`;

const SuggestionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #374151;

  li {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px dashed #F3F4F6;
  }
  li:last-child { border-bottom: none; }
`;

const StatusVariantMap: Record<POStatus, 'success' | 'warning' | 'error' | 'info'> = {
  draft: 'info',
  submitted: 'warning',
  confirmed: 'warning',
  shipped: 'info',
  partial_received: 'warning',
  received: 'success',
  cancelled: 'error'
};

function isPendingStatus(s: POStatus): boolean {
  return s === 'submitted' || s === 'confirmed';
}

const PurchaseOrdersPage: React.FC = () => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const navigate = useNavigate();

  const [rows, setRows] = useState<POListRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const [suggestions, setSuggestions] = useState<SuggestionGroup[]>([]);
  const [suggestionsCount, setSuggestionsCount] = useState(0);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (fromDate) params.set('from', fromDate);
      if (toDate) params.set('to', toDate);

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
  }, [statusFilter, fromDate, toDate]);

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

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      (r.seller_name || '').toLowerCase().includes(term) ||
      (r.po_number || '').toLowerCase().includes(term)
    );
  }, [rows, search]);

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
        <div>
          <Title>{t('list.title')}</Title>
          <Subtitle>{t('list.subtitle')}</Subtitle>
        </div>
        <HeaderActions>
          {suggestionsCount > 0 && (
            <SuggestionBadge
              type="button"
              onClick={() => setSuggestionsOpen(o => !o)}
            >
              ▲ {t('list.suggestions.badge', { n: suggestionsCount })}
            </SuggestionBadge>
          )}
          <ThemedButton
            variant="primary"
            onClick={() => navigate('/pos/purchase-orders/new')}
          >
            {t('list.newOrder')}
          </ThemedButton>
        </HeaderActions>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#6B7280">
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
                        {t('list.suggestions.suggested')}: <strong>{Number(item.suggested_quantity).toFixed(2)}</strong>
                      </span>
                    </li>
                  ))}
                </SuggestionList>
              </SuggestionGroupBox>
            ))}
          </SuggestionPanel>
        )}

        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('list.filter.searchSeller') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t('list.filter.allStatuses')}</option>
            <option value="draft">{t('status.draft')}</option>
            <option value="submitted">{t('status.submitted')}</option>
            <option value="confirmed">{t('status.confirmed')}</option>
            <option value="shipped">{t('status.shipped')}</option>
            <option value="partial_received">{t('status.partial_received')}</option>
            <option value="received">{t('status.received')}</option>
            <option value="cancelled">{t('status.cancelled')}</option>
          </FilterSelect>
          <div style={{ minWidth: 150 }}>
            <DateField value={fromDate} onChange={setFromDate} placeholder={t('list.filter.from') as string} />
          </div>
          <div style={{ minWidth: 150 }}>
            <DateField value={toDate} onChange={setToDate} placeholder={t('list.filter.to') as string} />
          </div>
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('list.table.poNumber')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('list.table.seller')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('list.table.items')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('list.table.total')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('list.table.status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('list.table.expected')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('list.table.createdAt')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('list.table.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8}><DataTableEmpty>{t('list.loading')}</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <DataTableEmpty>
                      <div style={{ marginBottom: 12, fontSize: 16, fontWeight: 600, color: '#374151' }}>
                        {t('list.empty.title')}
                      </div>
                      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
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
                filteredRows.map(row => (
                  <DataTableRow key={row.id}>
                    <DataTableCell data-label={t('list.table.poNumber') as string}>
                      <strong>{row.po_number}</strong>
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.seller') as string}>
                      {row.seller_name || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.items') as string} align="center">
                      {row.item_count ?? 0}
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
                          onClick={() => navigate(`/pos/purchase-orders/${row.id}`)}
                        >
                          {t('list.view')}
                        </ThemedButton>
                      </DataTableActions>
                    </DataTableCell>
                  </DataTableRow>
                ))
              )}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>
    </Container>
  );
};

export default PurchaseOrdersPage;
