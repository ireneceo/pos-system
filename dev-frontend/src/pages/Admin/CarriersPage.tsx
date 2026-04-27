import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableEmpty,
  Modal, ModalButton, FormGroup, FormLabel, FormInput
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';

interface Carrier {
  id: number;
  code: string;
  name: string;
  tracking_url_template: string | null;
  logo_url: string | null;
  country: string | null;
  is_active: boolean;
  sort_order: number;
}

const Subtitle = styled.div`
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const StatusBadge = styled.span<{ active: boolean }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: ${p => p.active ? '#ECFDF5' : '#F3F4F6'};
  color: ${p => p.active ? '#065F46' : '#6B7280'};
  border: 1px solid ${p => p.active ? '#10B981' : '#E6EBF1'};
`;

const CarriersPage: React.FC = () => {
  const { t } = useTranslation(['admin', 'common']);
  const [items, setItems] = useState<Carrier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Carrier | null>(null);
  const [form, setForm] = useState({ code: '', name: '', tracking_url_template: '', logo_url: '', country: 'MY', sort_order: '0', is_active: true });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`
  }), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/carriers', { headers });
      const data = await res.json();
      if (res.ok && data.success) setItems(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Failed to load carriers:', err);
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm({ code: '', name: '', tracking_url_template: '', logo_url: '', country: 'MY', sort_order: '0', is_active: true });
    setError(null);
    setShowModal(true);
  };

  const openEdit = (c: Carrier) => {
    setEditing(c);
    setForm({
      code: c.code,
      name: c.name,
      tracking_url_template: c.tracking_url_template || '',
      logo_url: c.logo_url || '',
      country: c.country || 'MY',
      sort_order: String(c.sort_order ?? 0),
      is_active: c.is_active
    });
    setError(null);
    setShowModal(true);
  };

  const close = () => { setShowModal(false); setEditing(null); setError(null); };

  const submit = async () => {
    if (!form.code.trim() || !form.name.trim()) {
      setError(t('admin:carriers.errors.required', 'Code and Name are required'));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const body = {
        code: form.code.trim(),
        name: form.name.trim(),
        tracking_url_template: form.tracking_url_template.trim() || null,
        logo_url: form.logo_url.trim() || null,
        country: form.country.trim() || null,
        sort_order: parseInt(form.sort_order, 10) || 0,
        is_active: !!form.is_active
      };
      const url = editing ? `/api/admin/carriers/${editing.id}` : '/api/admin/carriers';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || 'Failed to save');
        return;
      }
      close();
      await load();
    } catch (err) {
      console.error(err);
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const onSoftDelete = async (c: Carrier) => {
    if (!c.is_active) return; // already inactive
    if (!window.confirm(t('admin:carriers.confirmDelete', { name: c.name, defaultValue: `Deactivate ${c.name}?` }) as string)) return;
    try {
      const res = await fetch(`/api/admin/carriers/${c.id}`, { method: 'DELETE', headers });
      const data = await res.json();
      if (res.ok && data.success) await load();
    } catch (err) { console.error(err); }
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('admin:carriers.title', 'Carriers')}</Title>
          <Subtitle>{t('admin:carriers.subtitle', 'Delivery carriers used by sellers when shipping purchase orders')}</Subtitle>
        </div>
        <ThemedButton variant="primary" onClick={openAdd}>
          + {t('admin:carriers.add', 'Add Carrier')}
        </ThemedButton>
      </Header>

      <Content>
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('admin:carriers.fields.name', 'Name')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('admin:carriers.fields.code', 'Code')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('admin:carriers.fields.template', 'Tracking URL Template')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('admin:carriers.fields.country', 'Country')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('admin:carriers.fields.sortOrder', 'Sort')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('admin:carriers.fields.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('common:actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}><DataTableEmpty>Loading…</DataTableEmpty></td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={7}><DataTableEmpty>{t('admin:carriers.empty', 'No carriers yet')}</DataTableEmpty></td></tr>
              ) : items.map(c => (
                <DataTableRow key={c.id}>
                  <DataTableCell data-label="Name">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {c.logo_url && (
                        <img src={c.logo_url} alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }} />
                      )}
                      <strong style={{ color: '#0A2540' }}>{c.name}</strong>
                    </div>
                  </DataTableCell>
                  <DataTableCell data-label="Code">
                    <code style={{ fontSize: 12, background: '#F3F4F6', padding: '2px 6px', borderRadius: 4, color: '#0A2540' }}>{c.code}</code>
                  </DataTableCell>
                  <DataTableCell data-label="Template">
                    {c.tracking_url_template ? (
                      <span style={{ fontSize: 12, color: '#6B7280', fontFamily: 'monospace' }}>{c.tracking_url_template}</span>
                    ) : (
                      <span style={{ color: '#9CA3AF', fontSize: 12 }}>—</span>
                    )}
                  </DataTableCell>
                  <DataTableCell data-label="Country" align="center">
                    {c.country || '—'}
                  </DataTableCell>
                  <DataTableCell data-label="Sort" align="center">{c.sort_order ?? 0}</DataTableCell>
                  <DataTableCell data-label="Status" align="center">
                    <StatusBadge active={c.is_active}>{c.is_active ? 'Active' : 'Inactive'}</StatusBadge>
                  </DataTableCell>
                  <DataTableCell align="right">
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <ThemedButton size="small" variant="outline" onClick={() => openEdit(c)}>
                        {t('common:edit', 'Edit')}
                      </ThemedButton>
                      {c.is_active && (
                        <ThemedButton size="small" variant="danger-outline" onClick={() => onSoftDelete(c)}>
                          {t('common:deactivate', 'Deactivate')}
                        </ThemedButton>
                      )}
                    </div>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      <Modal
        isOpen={showModal}
        onClose={close}
        title={editing
          ? t('admin:carriers.editTitle', { name: editing.name, defaultValue: `Edit ${editing.name}` }) as string
          : t('admin:carriers.addTitle', 'Add Carrier') as string}
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={close} disabled={submitting}>
              {t('common:cancel', 'Cancel')}
            </ModalButton>
            <ModalButton variant="primary" onClick={submit} disabled={submitting}>
              {submitting ? t('common:saving', 'Saving…') : t('common:save', 'Save')}
            </ModalButton>
          </>
        }
      >
        {error && (
          <div style={{ marginBottom: 12, padding: 10, background: '#FEF2F2', border: '1px solid #DC2626', borderRadius: 8, fontSize: 13, color: '#991B1B' }}>
            {error}
          </div>
        )}
        <FormGroup>
          <FormLabel>{t('admin:carriers.fields.code', 'Code')} * <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400 }}>({t('admin:carriers.codeHint', 'a-z, 0-9, _')})</span></FormLabel>
          <FormInput value={form.code} onChange={(e) => setForm(f => ({ ...f, code: e.target.value }))} placeholder="lalamove" disabled={!!editing} />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('admin:carriers.fields.name', 'Name')} *</FormLabel>
          <FormInput value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Lalamove" />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('admin:carriers.fields.template', 'Tracking URL Template')}</FormLabel>
          <FormInput
            value={form.tracking_url_template}
            onChange={(e) => setForm(f => ({ ...f, tracking_url_template: e.target.value }))}
            placeholder="https://example.com/track/{tracking_number}"
          />
          <div style={{ marginTop: 4, fontSize: 11, color: '#6B7280' }}>
            {t('admin:carriers.templateHint', 'Use {tracking_number} as the placeholder.')}
          </div>
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('admin:carriers.fields.logoUrl', 'Logo URL')}</FormLabel>
          <FormInput value={form.logo_url} onChange={(e) => setForm(f => ({ ...f, logo_url: e.target.value }))} placeholder="https://..." />
        </FormGroup>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormGroup>
            <FormLabel>{t('admin:carriers.fields.country', 'Country')}</FormLabel>
            <FormInput value={form.country} onChange={(e) => setForm(f => ({ ...f, country: e.target.value.toUpperCase().slice(0, 2) }))} placeholder="MY" maxLength={2} />
          </FormGroup>
          <FormGroup>
            <FormLabel>{t('admin:carriers.fields.sortOrder', 'Sort Order')}</FormLabel>
            <FormInput type="number" value={form.sort_order} onChange={(e) => setForm(f => ({ ...f, sort_order: e.target.value }))} />
          </FormGroup>
        </div>
        <FormGroup>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
              style={{ width: 18, height: 18, accentColor: '#635BFF' }}
            />
            <span style={{ fontSize: 13, color: '#0A2540' }}>{t('admin:carriers.fields.active', 'Active')}</span>
          </label>
        </FormGroup>
      </Modal>
    </Container>
  );
};

export default CarriersPage;
