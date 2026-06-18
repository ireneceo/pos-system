import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { useAuth } from '../../contexts/AuthContext';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';

interface InventorySummary {
  total_products: number;
  low_stock_count: number;
  out_of_stock_count: number;
  total_stock_value: number;
}

interface InventoryRow {
  id: number;
  name: string;
  sku: string | null;
  unit: string | null;
  unit_price: number;
  current_stock: number;
  low_stock_threshold: number;
  stock_status: 'normal' | 'low_stock' | 'out_of_stock';
  stock_value: number;
  category_id: number | null;
  category: { id: number; name: string; emoji?: string | null } | null;
  is_active: boolean;
  lead_time_days: number;
}

interface CategoryOption {
  id: number;
  name: string;
  emoji?: string | null;
}

const ToggleLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #1F2937;
  cursor: pointer;
  white-space: nowrap;
  padding: 0 8px;
`;

const HelpText = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 4px;
`;

const ErrorBox = styled.div`
  margin-top: 12px;
  padding: 10px 14px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
`;

const FoodcourtInventoryPage: React.FC = () => {
  const { t } = useTranslation(['foodcourt', 'supplier', 'common']);
  const { user } = useAuth();
  const foodcourtId = user?.foodcourt_id || null;

  const [summary, setSummary] = useState<InventorySummary>({
    total_products: 0,
    low_stock_count: 0,
    out_of_stock_count: 0,
    total_stock_value: 0
  });
  const [rows, setRows] = useState<InventoryRow[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [search, setSearch] = useState('');

  const [adjustOpen, setAdjustOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<InventoryRow | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [adjustForm, setAdjustForm] = useState({
    quantity_delta: '',
    reason: 'correction',
    notes: ''
  });
  const [receiveForm, setReceiveForm] = useState({
    quantity: '',
    batch_no: '',
    expiry_date: '',
    unit_cost: '',
    notes: ''
  });

  const fetchSummary = useCallback(async () => {
    if (!foodcourtId) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourts/${foodcourtId}/inventory/summary`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSummary(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    }
  }, [foodcourtId]);

  const fetchRows = useCallback(async () => {
    if (!foodcourtId) return;
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.set('category_id', categoryFilter);
      if (lowStockOnly) params.set('low_stock', 'true');
      if (search.trim()) params.set('search', search.trim());

      const url = `/api/foodcourts/${foodcourtId}/inventory${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRows(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
    }
  }, [foodcourtId, categoryFilter, lowStockOnly, search]);

  const fetchCategories = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch('/api/foodcourt-product-categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCategories((data.data || []).map((c: any) => ({
          id: c.id,
          name: c.name,
          emoji: c.emoji || null
        })));
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchSummary(), fetchRows(), fetchCategories()]);
      setLoading(false);
    };
    load();
  }, [fetchSummary, fetchRows, fetchCategories]);

  const openAdjust = (row: InventoryRow) => {
    setActiveRow(row);
    setAdjustForm({ quantity_delta: '', reason: 'correction', notes: '' });
    setFormError(null);
    setAdjustOpen(true);
  };

  const openReceive = (row: InventoryRow) => {
    setActiveRow(row);
    setReceiveForm({ quantity: '', batch_no: '', expiry_date: '', unit_cost: '', notes: '' });
    setFormError(null);
    setReceiveOpen(true);
  };

  const closeModals = () => {
    setAdjustOpen(false);
    setReceiveOpen(false);
    setActiveRow(null);
    setFormError(null);
  };

  const submitAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRow || submitting || !foodcourtId) return;
    setFormError(null);

    const delta = parseFloat(adjustForm.quantity_delta);
    if (Number.isNaN(delta) || delta === 0) {
      setFormError(t('common:invalidValue', 'Enter a non-zero number'));
      return;
    }
    if (!adjustForm.reason) {
      setFormError(t('common:required', 'Reason is required'));
      return;
    }

    setSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/foodcourts/${foodcourtId}/inventory/adjust`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: activeRow.id,
          quantity_delta: delta,
          reason: adjustForm.reason,
          notes: adjustForm.notes.trim() || null
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.message || 'Failed to adjust stock');
        return;
      }
      closeModals();
      await Promise.all([fetchSummary(), fetchRows()]);
    } catch (err) {
      console.error('adjust error:', err);
      setFormError('Failed to adjust stock');
    } finally {
      setSubmitting(false);
    }
  };

  const submitReceive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRow || submitting || !foodcourtId) return;
    setFormError(null);

    const qty = parseFloat(receiveForm.quantity);
    if (Number.isNaN(qty) || qty <= 0) {
      setFormError(t('common:invalidValue', 'Quantity must be > 0'));
      return;
    }

    setSubmitting(true);
    try {
      const token = getAuthToken();
      const body: any = {
        product_id: activeRow.id,
        quantity: qty
      };
      if (receiveForm.batch_no.trim()) body.batch_no = receiveForm.batch_no.trim();
      if (receiveForm.expiry_date) body.expiry_date = receiveForm.expiry_date;
      if (receiveForm.unit_cost) {
        const uc = parseFloat(receiveForm.unit_cost);
        if (!Number.isNaN(uc) && uc >= 0) body.unit_cost = uc;
      }
      if (receiveForm.notes.trim()) body.notes = receiveForm.notes.trim();

      const res = await fetch(`/api/foodcourts/${foodcourtId}/inventory/receive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.message || 'Failed to receive stock');
        return;
      }
      closeModals();
      await Promise.all([fetchSummary(), fetchRows()]);
    } catch (err) {
      console.error('receive error:', err);
      setFormError('Failed to receive stock');
    } finally {
      setSubmitting(false);
    }
  };

  const fmtMoney = (n: number) => `RM ${(Number(n) || 0).toFixed(2)}`;

  if (!foodcourtId) {
    return (
      <Container>
        <Header>
          <Title>{t('supplier:inventory.title', 'Inventory Management')}</Title>
        </Header>
        <Content>
          <DataTableContainer>
            <DataTableEmpty>
              {t('common:noFoodcourtAssigned', 'No foodcourt is assigned to your account.')}
            </DataTableEmpty>
          </DataTableContainer>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{t('supplier:inventory.title', 'Inventory Management')}</Title>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#635BFF">
            <StatValue>{summary.total_products}</StatValue>
            <StatLabel>{t('supplier:inventory.summary.totalProducts', 'Products')}</StatLabel>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{summary.low_stock_count}</StatValue>
            <StatLabel>{t('supplier:inventory.summary.lowStock', 'Low Stock')}</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{summary.out_of_stock_count}</StatValue>
            <StatLabel>{t('supplier:inventory.summary.outOfStock', 'Out of Stock')}</StatLabel>
          </StatCard>
          <StatCard color="#059669">
            <StatValue>{fmtMoney(summary.total_stock_value)}</StatValue>
            <StatLabel>{t('supplier:inventory.summary.value', 'Total Value')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('common:search', 'Search') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">{t('common:allCategories', 'All Categories')}</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.emoji ? `${cat.emoji} ` : ''}{cat.name}
              </option>
            ))}
          </FilterSelect>
          <ToggleLabel>
            <input
              type="checkbox"
              checked={lowStockOnly}
              onChange={(e) => setLowStockOnly(e.target.checked)}
            />
            {t('supplier:inventory.summary.lowStock', 'Low Stock')}
          </ToggleLabel>
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('common:name', 'Name')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">SKU</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('common:unit', 'Unit')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('common:category', 'Category')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('common:stock', 'Stock')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('supplier:inventory.modals.delta', 'Threshold')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('common:price', 'Unit Price')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('common:status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('common:actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <DataTableEmpty>{t('common:loading', 'Loading...')}</DataTableEmpty>
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <DataTableEmpty>
                      {t('supplier:inventory.emptyHint', 'No products yet. Create products in the Products page first.')}
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                rows.map(row => (
                  <DataTableRow key={row.id}>
                    <DataTableCell data-label={t('common:name', 'Name') as string}>{row.name}</DataTableCell>
                    <DataTableCell data-label="SKU">{row.sku || '-'}</DataTableCell>
                    <DataTableCell data-label={t('common:unit', 'Unit') as string} align="center">{row.unit || '-'}</DataTableCell>
                    <DataTableCell data-label={t('common:category', 'Category') as string}>
                      {row.category ? `${row.category.emoji ? row.category.emoji + ' ' : ''}${row.category.name}` : '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('common:stock', 'Stock') as string} align="right">
                      {Number(row.current_stock).toFixed(2)}
                    </DataTableCell>
                    <DataTableCell data-label={t('supplier:inventory.modals.delta', 'Threshold') as string} align="right">
                      {Number(row.low_stock_threshold).toFixed(2)}
                    </DataTableCell>
                    <DataTableCell data-label={t('common:price', 'Unit Price') as string} align="right">
                      {fmtMoney(row.unit_price)}
                    </DataTableCell>
                    <DataTableCell data-label={t('common:status', 'Status') as string} align="center">
                      {row.stock_status === 'out_of_stock' ? (
                        <DataTableStatus variant="error">
                          {t('supplier:inventory.outOfStockBadge', 'OUT')}
                        </DataTableStatus>
                      ) : row.stock_status === 'low_stock' ? (
                        <DataTableStatus variant="warning">
                          {t('supplier:inventory.lowStockBadge', 'LOW')}
                        </DataTableStatus>
                      ) : (
                        <DataTableStatus variant="success">OK</DataTableStatus>
                      )}
                    </DataTableCell>
                    <DataTableCell data-label="" align="right" mobileFullWidth>
                      <DataTableActions>
                        <ThemedButton size="small" variant="outline" onClick={() => openAdjust(row)}>
                          {t('supplier:inventory.actions.adjust', 'Adjust')}
                        </ThemedButton>
                        <ThemedButton size="small" onClick={() => openReceive(row)}>
                          {t('supplier:inventory.actions.receive', 'Receive')}
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

      {/* Adjust modal */}
      <CommonModal
        isOpen={adjustOpen}
        onClose={closeModals}
        title={`${t('supplier:inventory.modals.adjustTitle', 'Adjust Stock Quantity')}${activeRow ? ` — ${activeRow.name}` : ''}`}
        footer={
          <>
            <ModalButton type="button" onClick={closeModals} disabled={submitting}>
              {t('common:cancel', 'Cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="fc-adjust-form"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? t('common:saving', 'Saving...') : t('common:save', 'Save')}
            </ModalButton>
          </>
        }
      >
        <form id="fc-adjust-form" onSubmit={submitAdjust}>
          {activeRow && (
            <UIFormGroup>
              <FormLabel>{t('common:currentStock', 'Current Stock')}</FormLabel>
              <FormInput
                type="text"
                value={`${Number(activeRow.current_stock).toFixed(2)} ${activeRow.unit || ''}`}
                disabled
              />
            </UIFormGroup>
          )}
          <UIFormGroup>
            <FormLabel>{t('supplier:inventory.modals.delta', 'Quantity Change (+/-)')} *</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              value={adjustForm.quantity_delta}
              onChange={(e) => setAdjustForm({ ...adjustForm, quantity_delta: e.target.value })}
              placeholder="e.g. -2 or 5"
              required
            />
            <HelpText>
              {t('supplier:inventory.deltaHint', 'Use negative values to deduct stock.')}
            </HelpText>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('supplier:inventory.modals.reason', 'Reason')} *</FormLabel>
            <FormSelect
              value={adjustForm.reason}
              onChange={(e) => setAdjustForm({ ...adjustForm, reason: e.target.value })}
              required
            >
              <option value="lost">{t('supplier:inventory.reason.lost', 'Lost')}</option>
              <option value="damaged">{t('supplier:inventory.reason.damaged', 'Damaged')}</option>
              <option value="correction">{t('supplier:inventory.reason.correction', 'Correction')}</option>
              <option value="other">{t('supplier:inventory.reason.other', 'Other')}</option>
            </FormSelect>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('supplier:inventory.modals.notes', 'Notes')}</FormLabel>
            <FormTextArea
              value={adjustForm.notes}
              onChange={(e) => setAdjustForm({ ...adjustForm, notes: e.target.value })}
              rows={2}
            />
          </UIFormGroup>
          {formError && <ErrorBox>{formError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* Receive modal */}
      <CommonModal
        isOpen={receiveOpen}
        onClose={closeModals}
        title={`${t('supplier:inventory.modals.receiveTitle', 'Receive Stock')}${activeRow ? ` — ${activeRow.name}` : ''}`}
        footer={
          <>
            <ModalButton type="button" onClick={closeModals} disabled={submitting}>
              {t('common:cancel', 'Cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="fc-receive-form"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? t('common:saving', 'Saving...') : t('common:save', 'Save')}
            </ModalButton>
          </>
        }
      >
        <form id="fc-receive-form" onSubmit={submitReceive}>
          {activeRow && (
            <UIFormGroup>
              <FormLabel>{t('common:currentStock', 'Current Stock')}</FormLabel>
              <FormInput
                type="text"
                value={`${Number(activeRow.current_stock).toFixed(2)} ${activeRow.unit || ''}`}
                disabled
              />
            </UIFormGroup>
          )}
          <UIFormGroup>
            <FormLabel>{t('supplier:inventory.modals.quantity', 'Quantity Received')} *</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0.01"
              value={receiveForm.quantity}
              onChange={(e) => setReceiveForm({ ...receiveForm, quantity: e.target.value })}
              required
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('supplier:inventory.modals.batchNo', 'Batch Number (optional)')}</FormLabel>
            <FormInput
              type="text"
              value={receiveForm.batch_no}
              onChange={(e) => setReceiveForm({ ...receiveForm, batch_no: e.target.value })}
            />
            <HelpText>
              {t('supplier:inventory.batchHint', 'Sprint 3 — auto-tracked when PO ships')}
            </HelpText>
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('supplier:inventory.modals.expiryDate', 'Expiry Date (optional)')}</FormLabel>
            <DateField
              value={receiveForm.expiry_date}
              onChange={(v) => setReceiveForm({ ...receiveForm, expiry_date: v || '' })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('supplier:inventory.modals.unitCost', 'Unit Cost (optional)')}</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              value={receiveForm.unit_cost}
              onChange={(e) => setReceiveForm({ ...receiveForm, unit_cost: e.target.value })}
            />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('supplier:inventory.modals.notes', 'Notes')}</FormLabel>
            <FormTextArea
              value={receiveForm.notes}
              onChange={(e) => setReceiveForm({ ...receiveForm, notes: e.target.value })}
              rows={2}
            />
          </UIFormGroup>
          {formError && <ErrorBox>{formError}</ErrorBox>}
        </form>
      </CommonModal>
    </Container>
  );
};

export default FoodcourtInventoryPage;
