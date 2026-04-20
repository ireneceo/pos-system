import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, ActionSection, Content, Button,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableEmpty,
  ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton, ModalBody, ModalFooter
} from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';

interface Branch {
  id: number;
  foodcourt_id: number;
  name: string;
  code: string;
  is_primary: boolean;
  status: 'active' | 'inactive';
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  units?: Array<{ id: number; unit_number: string; status: string }>;
}

const FoodcourtBranchesPage: React.FC = () => {
  const { t } = useTranslation('foodcourt');
  const { user } = useAuth();
  const fcId = user?.foodcourt_id;

  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [form, setForm] = useState<Partial<Branch>>({});

  const fetchBranches = useCallback(async () => {
    if (!fcId) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/foodcourts/${fcId}/branches`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const data = await res.json();
      if (data.success) setBranches(Array.isArray(data.data) ? data.data : []);
      setError(null);
    } catch (e) { setError('Failed to load branches'); }
    finally { setLoading(false); }
  }, [fcId]);

  useEffect(() => { fetchBranches(); }, [fetchBranches]);

  const openNew = () => { setEditing(null); setForm({ status: 'active', country: 'MY' }); setShowForm(true); };
  const openEdit = (b: Branch) => { setEditing(b); setForm({ ...b }); setShowForm(true); };

  const save = async () => {
    if (!fcId) return;
    if (!form.name?.trim() || !form.code?.trim()) {
      setError(t('branches.nameCodeRequired', 'Name and Code are required') as string);
      return;
    }
    try {
      const url = editing
        ? `/api/foodcourt-branches/${editing.id}`
        : `/api/foodcourts/${fcId}/branches`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!data.success) { setError(data.message || 'Save failed'); return; }
      setShowForm(false);
      setError(null);
      await fetchBranches();
    } catch (e) { setError('Save failed'); }
  };

  return (
    <Container>
      <Header>
        <Title>{t('branches.title', 'Branches')}</Title>
        <ActionSection>
          <Button variant="primary" onClick={openNew}>+ {t('branches.addBranch', 'Add Branch')}</Button>
        </ActionSection>
      </Header>

      <Content>
        {error && <div style={{ color: '#DC2626', fontSize: 14, marginBottom: 16 }}>{error}</div>}
        {loading ? (
          <DataTableEmpty>{t('common.loading', 'Loading...')}</DataTableEmpty>
        ) : branches.length === 0 ? (
          <DataTableEmpty>{t('branches.empty', 'No branches yet')}</DataTableEmpty>
        ) : (
          <DataTableContainer>
            <DataTable>
              <DataTableHead>
                <DataTableHeaderCell>{t('branches.code', 'Code')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('branches.name', 'Name')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('branches.city', 'City')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('branches.phone', 'Phone')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('branches.units', 'Units')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('branches.status', 'Status')}</DataTableHeaderCell>
                <DataTableHeaderCell></DataTableHeaderCell>
              </DataTableHead>
              <tbody>
                {branches.map(b => (
                  <DataTableRow key={b.id}>
                    <DataTableCell>
                      <code style={{ background: '#F3F4F6', padding: '2px 8px', borderRadius: 4, fontSize: 13, fontWeight: 600 }}>{b.code}</code>
                      {b.is_primary && <PrimaryBadge>{t('branches.primary', 'Primary')}</PrimaryBadge>}
                    </DataTableCell>
                    <DataTableCell>{b.name}</DataTableCell>
                    <DataTableCell>{b.city || '—'}</DataTableCell>
                    <DataTableCell>{b.phone || '—'}</DataTableCell>
                    <DataTableCell>{b.units?.length ?? 0}</DataTableCell>
                    <DataTableCell>
                      <StatusBadge active={b.status === 'active'}>{b.status}</StatusBadge>
                    </DataTableCell>
                    <DataTableCell>
                      <Button variant="secondary" onClick={() => openEdit(b)} style={{ padding: '6px 12px', fontSize: 13 }}>
                        {t('branches.edit', 'Edit')}
                      </Button>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          </DataTableContainer>
        )}
      </Content>

      {showForm && (
        <ModalOverlay onClick={() => setShowForm(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editing ? t('branches.editBranch', 'Edit Branch') : t('branches.newBranch', 'New Branch')}</ModalTitle>
              <CloseButton onClick={() => setShowForm(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
          <FormGrid>
            <Field>
              <Label>{t('branches.name', 'Name')} *</Label>
              <Input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Sunway Pyramid" />
            </Field>
            <Field>
              <Label>{t('branches.code', 'Code')} *</Label>
              <Input value={form.code || ''} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="SUNWAY" disabled={editing?.is_primary} />
              <Hint>{t('branches.codeHint', 'Prefix for unit full code. Example: SUNWAY-A01')}</Hint>
            </Field>
            <Field>
              <Label>{t('branches.status', 'Status')}</Label>
              <Select value={form.status || 'active'} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </Field>
            <Field style={{ gridColumn: '1 / -1' }}>
              <Label>{t('branches.address', 'Address')}</Label>
              <Input value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} />
            </Field>
            <Field>
              <Label>{t('branches.city', 'City')}</Label>
              <Input value={form.city || ''} onChange={e => setForm({ ...form, city: e.target.value })} />
            </Field>
            <Field>
              <Label>{t('branches.state', 'State')}</Label>
              <Input value={form.state || ''} onChange={e => setForm({ ...form, state: e.target.value })} />
            </Field>
            <Field>
              <Label>{t('branches.postalCode', 'Postal Code')}</Label>
              <Input value={form.postal_code || ''} onChange={e => setForm({ ...form, postal_code: e.target.value })} />
            </Field>
            <Field>
              <Label>{t('branches.country', 'Country')}</Label>
              <Input value={form.country || ''} onChange={e => setForm({ ...form, country: e.target.value })} />
            </Field>
            <Field>
              <Label>{t('branches.phone', 'Phone')}</Label>
              <Input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field>
              <Label>{t('branches.email', 'Email')}</Label>
              <Input type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field>
              <Label>{t('branches.latitude', 'Latitude')}</Label>
              <Input type="number" step="any" value={form.latitude ?? ''} onChange={e => setForm({ ...form, latitude: e.target.value === '' ? null : parseFloat(e.target.value) })} placeholder="e.g., 3.0725" />
            </Field>
            <Field>
              <Label>{t('branches.longitude', 'Longitude')}</Label>
              <Input type="number" step="any" value={form.longitude ?? ''} onChange={e => setForm({ ...form, longitude: e.target.value === '' ? null : parseFloat(e.target.value) })} placeholder="e.g., 101.6066" />
            </Field>
          </FormGrid>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setShowForm(false)}>{t('common.cancel', 'Cancel')}</Button>
              <Button variant="primary" onClick={save}>{t('common.save', 'Save')}</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

const PrimaryBadge = styled.span`
  margin-left: 8px;
  padding: 2px 8px;
  background: #EEF2FF;
  color: #4338CA;
  font-size: 11px;
  font-weight: 600;
  border-radius: 10px;
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  background: ${p => p.active ? '#D1FAE5' : '#F3F4F6'};
  color: ${p => p.active ? '#065F46' : '#6B7280'};
  text-transform: capitalize;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

const Hint = styled.div`
  font-size: 11px;
  color: #9CA3AF;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  &:disabled { background: #F9FAFB; cursor: not-allowed; }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
`;

export default FoodcourtBranchesPage;
