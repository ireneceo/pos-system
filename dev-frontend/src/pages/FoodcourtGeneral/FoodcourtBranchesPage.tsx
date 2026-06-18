import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, ActionSection, Content, Button,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableEmpty,
  Modal as CommonModal,
  FormRow, FormGroup, FormLabel, FormInput, FormSelect
} from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { AddressFields } from '../../components/Form';
import type { Address } from '../../utils/formatAddress';
import { getAuthToken } from '../../utils/auth';
import EmptyState from '../../components/Common/EmptyState';

interface Branch {
  id: number;
  foodcourt_id: number;
  name: string;
  code: string;
  is_primary: boolean;
  status: 'active' | 'inactive';
  address?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  units?: Array<{ id: number; unit_number: string; status: string }>;
  unit_config?: {
    enabled?: boolean;
    zones?: Array<{ prefix: string; count: number; padding: number }>;
  } | null;
}

interface SyncPreview {
  to_create: string[];
  to_delete_ok: string[];
  blocked_by_contract: Array<{ id: number; unit_number: string }>;
  total_after: number;
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
  const [syncPreview, setSyncPreview] = useState<SyncPreview | null>(null);

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

  const openNew = () => { setEditing(null); setForm({ status: 'active', country: 'MY' }); setSyncPreview(null); setShowForm(true); };
  const openEdit = (b: Branch) => { setEditing(b); setForm({ ...b }); setSyncPreview(null); setShowForm(true); };

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
          <Button variant="primary" onClick={openNew}>{t('branches.addBranch', 'Add Branch')}</Button>
        </ActionSection>
      </Header>

      <Content>
        {error && <div style={{ color: '#DC2626', fontSize: 14, marginBottom: 16 }}>{error}</div>}
        {loading && branches.length === 0 ? (
          <DataTableEmpty>{t('common.loading', 'Loading...')}</DataTableEmpty>
        ) : branches.length === 0 ? (
          <EmptyState
            title={t('branches.emptyTitle', 'Add your first branch')}
            description={t('branches.emptyDesc', 'A branch is a physical food court location. You need at least one branch before you can lay out the floor plan or place tenant restaurants.')}
            primaryAction={{ label: t('branches.addBranch', 'Add Branch'), onClick: openNew }}
            steps={[
              { label: t('branches.step1', 'Register at least one branch (location).') },
              { label: t('branches.step2', 'Set up the floor plan & units for each branch.') },
              { label: t('branches.step3', 'Place tenant restaurants onto the units.') }
            ]}
          />
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
                      <code style={{ background: '#F1F4F8', padding: '2px 8px', borderRadius: 4, fontSize: 13, fontWeight: 600 }}>{b.code}</code>
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
        <CommonModal
          isOpen={showForm}
          onClose={() => { setShowForm(false); setSyncPreview(null); }}
          title={editing ? t('branches.editBranch', 'Edit Branch') : t('branches.newBranch', 'New Branch')}
          size="large"
          footer={
            <>
              <Button variant="secondary" onClick={() => { setShowForm(false); setSyncPreview(null); }}>{t('common.cancel', 'Cancel')}</Button>
              {editing && form.unit_config?.enabled && syncPreview && syncPreview.blocked_by_contract.length === 0 && (syncPreview.to_create.length + syncPreview.to_delete_ok.length > 0) && (
                <Button variant="primary" onClick={async () => {
                  if (!editing) return;
                  try {
                    const res = await fetch(`/api/foodcourt-branches/${editing.id}/sync-units`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
                      body: JSON.stringify({ unit_config: form.unit_config, confirm: true })
                    });
                    const d = await res.json();
                    if (d.success) {
                      setSyncPreview(null);
                      await fetchBranches();
                      setShowForm(false);
                    } else setError(d.message);
                  } catch { setError('Apply failed'); }
                }}>{t('branches.applyUnits', 'Apply Units & Save')}</Button>
              )}
              <Button variant="primary" onClick={save}>{t('common.save', 'Save')}</Button>
            </>
          }
        >
          <FormRow>
            <FormGroup>
              <FormLabel>{t('branches.name', 'Name')} *</FormLabel>
              <FormInput value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Sunway Pyramid" />
            </FormGroup>
            <FormGroup>
              <FormLabel>{t('branches.code', 'Code')} *</FormLabel>
              <FormInput value={form.code || ''} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="SUNWAY" disabled={editing?.is_primary} />
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>{t('branches.codeHint', 'Prefix for unit full code. Example: SUNWAY-A01')}</div>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <FormLabel>{t('branches.status', 'Status')}</FormLabel>
            <FormSelect value={form.status || 'active'} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FormSelect>
          </FormGroup>

          <AddressFields
            value={{
              address: form.address || '',
              address_line_2: (form as any).address_line_2 || '',
              city: form.city || '',
              state: form.state || '',
              postal_code: form.postal_code || '',
              country: form.country || 'MY',
              latitude: form.latitude ?? null,
              longitude: form.longitude ?? null
            }}
            onChange={(a: Address) => setForm({
              ...form,
              address: a.address || '',
              address_line_2: a.address_line_2 || '',
              city: a.city || '',
              state: a.state || '',
              postal_code: a.postal_code || '',
              country: (a.country || form.country || 'MY').toUpperCase(),
              latitude: a.latitude as any,
              longitude: a.longitude as any
            } as any)}
            showLatLng
            defaultCountry={form.country || 'MY'}
            required={['address']}
          />

          <FormRow>
            <FormGroup>
              <FormLabel>{t('branches.phone', 'Phone')}</FormLabel>
              <FormInput value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <FormLabel>{t('branches.email', 'Email')}</FormLabel>
              <FormInput type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
            </FormGroup>
          </FormRow>

          {(() => {
            // Local preview generator matching backend (free-list + range support)
            const expandZone = (z: any): string[] => {
              const prefix = String(z.prefix || '');
              const out: string[] = [];
              if (z.numbers != null && String(z.numbers).trim()) {
                const tokens = String(z.numbers).split(/[,\n]/).map(s => s.trim()).filter(Boolean);
                for (const token of tokens) {
                  const m = token.match(/^(.*?)(\d+)(.*?)\s*-\s*(.*?)(\d+)(.*?)$/);
                  if (m && m[1] === m[4] && m[3] === m[6]) {
                    const start = parseInt(m[2], 10);
                    const end = parseInt(m[5], 10);
                    const pad = m[2].length;
                    if (end >= start && end - start <= 999) {
                      for (let i = start; i <= end; i++) out.push(prefix + m[1] + String(i).padStart(pad, '0') + m[3]);
                      continue;
                    }
                  }
                  out.push(prefix + token);
                }
                return out;
              }
              // backward compat
              const template = String(z.template || z.prefix || '');
              const count = parseInt(z.count, 10) || 0;
              const padding = parseInt(z.padding, 10) || 2;
              const startN = parseInt(z.start, 10) || 1;
              const hasP = template.includes('{n}');
              for (let i = 0; i < count; i++) {
                const n = String(startN + i).padStart(padding, '0');
                out.push(hasP ? template.replace(/\{n\}/g, n) : `${template}${n}`);
              }
              return out;
            };
            const previewNums: string[] = [];
            (form.unit_config?.zones || []).forEach((z: any) => {
              previewNums.push(...expandZone(z));
            });
            return (
              <UnitNumberingSection>
                <SectionHeader>
                  <SectionHeaderText>
                    <SectionTitle>
                      {t('branches.unitNumbering', 'Unit Numbering')}
                    </SectionTitle>
                    <SectionHint>
                      {t('branches.unitNumberingHint', 'Pre-define stall units for this branch. Automatically used by Floor Plan and Contract management.')}
                    </SectionHint>
                  </SectionHeaderText>
                  <SwitchLabel>
                    <input
                      type="checkbox"
                      checked={!!form.unit_config?.enabled}
                      onChange={(e) => setForm({ ...form, unit_config: { ...(form.unit_config || {}), enabled: e.target.checked, zones: form.unit_config?.zones || [{ prefix: 'A', count: 10, padding: 2 }] } })}
                    />
                    <SwitchTrack $on={!!form.unit_config?.enabled} />
                    {form.unit_config?.enabled ? t('branches.enabled', 'Enabled') : t('branches.disabled', 'Disabled')}
                  </SwitchLabel>
                </SectionHeader>

                {form.unit_config?.enabled && (
                  <>
                    <ZoneGrid>
                      {(form.unit_config?.zones || []).map((z: any, idx) => {
                        const hasPrefix = typeof z.prefix === 'string' && z.prefix !== undefined;
                        return (
                          <ZoneCard key={idx}>
                            <ZoneRow1>
                              <div>
                                <PrefixToggleRow>
                                  <SwitchLabel>
                                    <input
                                      type="checkbox"
                                      checked={hasPrefix}
                                      onChange={(e) => {
                                        const zones = [...(form.unit_config?.zones || [])];
                                        zones[idx] = { ...z, prefix: e.target.checked ? (z.prefix || '') : undefined };
                                        setForm({ ...form, unit_config: { ...form.unit_config, zones } });
                                      }}
                                    />
                                    <SwitchTrack $on={hasPrefix} />
                                    <span>{t('branches.usePrefix', 'Use Prefix')}</span>
                                  </SwitchLabel>
                                </PrefixToggleRow>
                                {hasPrefix && (
                                  <FormInput
                                    value={z.prefix || ''}
                                    onChange={(e) => {
                                      const zones = [...(form.unit_config?.zones || [])];
                                      zones[idx] = { ...z, prefix: e.target.value };
                                      setForm({ ...form, unit_config: { ...form.unit_config, zones } });
                                    }}
                                    placeholder={t('branches.prefixPlaceholder', 'e.g., P-2-   ·   F2-   ·   (prepended to each number)') as string}
                                    style={{ marginTop: 6 }}
                                  />
                                )}
                              </div>
                              <RemoveZoneBtn
                                type="button"
                                title={t('common.remove', 'Remove')}
                                onClick={() => {
                                  const zones = (form.unit_config?.zones || []).filter((_, i) => i !== idx);
                                  setForm({ ...form, unit_config: { ...form.unit_config, zones } });
                                }}
                              >×</RemoveZoneBtn>
                            </ZoneRow1>
                            <div style={{ marginTop: 10 }}>
                              <FieldLabel>{t('branches.unitNumbers', 'Unit Numbers')}</FieldLabel>
                              <NumberTextarea
                                rows={3}
                                value={z.numbers || ''}
                                onChange={(e) => {
                                  const zones = [...(form.unit_config?.zones || [])];
                                  zones[idx] = { ...z, numbers: e.target.value };
                                  setForm({ ...form, unit_config: { ...form.unit_config, zones } });
                                }}
                                placeholder={t('branches.numbersPlaceholder',
                                  'Type freely. Comma or new line to separate.\nRanges: 01-20, A01-A10, 05A-08A\nExamples: A01, A02, A05-A08, Kiosk-1, B3'
                                ) as string}
                              />
                              <Hint style={{ marginTop: 4 }}>
                                {t('branches.numbersHint', 'Free-form. Separate by comma or newline. Ranges supported: 01-20 · A01-A10 · 05A-08A')}
                              </Hint>
                            </div>
                          </ZoneCard>
                        );
                      })}
                    </ZoneGrid>
                    <AddZoneBtn
                      type="button"
                      onClick={() => setForm({ ...form, unit_config: { ...form.unit_config, zones: [...(form.unit_config?.zones || []), { numbers: '' }] } })}
                    >+ {t('branches.addZone', 'Add Zone')}</AddZoneBtn>

                    <PreviewCard>
                      <PreviewHead>
                        <PreviewTitle>{t('branches.preview', 'Preview')}</PreviewTitle>
                        {previewNums.length > 0 && (
                          <TotalBadge>
                            {previewNums.length} {t('branches.units', 'units')}
                          </TotalBadge>
                        )}
                      </PreviewHead>
                      {previewNums.length === 0 ? (
                        <EmptyHint>{t('branches.noUnits', 'No units configured yet. Add a zone above.')}</EmptyHint>
                      ) : (
                        <UnitChipRow>
                          {previewNums.slice(0, 80).map(n => <UnitTag key={n}>{n}</UnitTag>)}
                          {previewNums.length > 80 && <UnitTag style={{ color: '#6B7280' }}>+{previewNums.length - 80} more</UnitTag>}
                        </UnitChipRow>
                      )}
                    </PreviewCard>

                    {previewNums.length > 0 && (
                      <Button
                        variant="secondary"
                        style={{ marginTop: 12, width: '100%' }}
                        onClick={async () => {
                          if (!editing) return;
                          try {
                            const res = await fetch(`/api/foodcourt-branches/${editing.id}/sync-units`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
                              body: JSON.stringify({ unit_config: form.unit_config, confirm: false })
                            });
                            const d = await res.json();
                            if (d.success) setSyncPreview(d.data);
                            else setError(d.message);
                          } catch { setError('Preview failed'); }
                        }}
                      >{t('branches.compareWithCurrent', 'Compare with Current Database')}</Button>
                    )}

                    {syncPreview && (
                      <DiffCard>
                        {syncPreview.to_create.length === 0 && syncPreview.to_delete_ok.length === 0 && syncPreview.blocked_by_contract.length === 0 ? (
                          <DiffRow $kind="sync">
                            <DiffIcon>✓</DiffIcon>
                            <DiffContent>
                              <DiffLabel>{t('branches.inSync', 'Already in sync')}</DiffLabel>
                            </DiffContent>
                          </DiffRow>
                        ) : (
                          <>
                            {syncPreview.to_create.length > 0 && (
                              <DiffRow $kind="create">
                                <DiffIcon>+</DiffIcon>
                                <DiffContent>
                                  <DiffLabel>{t('branches.toCreate', 'Will be created')} ({syncPreview.to_create.length})</DiffLabel>
                                  <DiffItems>{syncPreview.to_create.slice(0, 20).join(', ')}{syncPreview.to_create.length > 20 ? `, +${syncPreview.to_create.length - 20} more` : ''}</DiffItems>
                                </DiffContent>
                              </DiffRow>
                            )}
                            {syncPreview.to_delete_ok.length > 0 && (
                              <DiffRow $kind="delete">
                                <DiffIcon>−</DiffIcon>
                                <DiffContent>
                                  <DiffLabel>{t('branches.toDelete', 'Will be removed (no contract)')} ({syncPreview.to_delete_ok.length})</DiffLabel>
                                  <DiffItems>{syncPreview.to_delete_ok.join(', ')}</DiffItems>
                                </DiffContent>
                              </DiffRow>
                            )}
                            {syncPreview.blocked_by_contract.length > 0 && (
                              <DiffRow $kind="block">
                                <DiffIcon>!</DiffIcon>
                                <DiffContent>
                                  <DiffLabel>{t('branches.blockedByContract', 'Cannot remove — has active contract')} ({syncPreview.blocked_by_contract.length})</DiffLabel>
                                  <DiffItems>{syncPreview.blocked_by_contract.map(b => b.unit_number).join(', ')}</DiffItems>
                                </DiffContent>
                              </DiffRow>
                            )}
                          </>
                        )}
                      </DiffCard>
                    )}
                  </>
                )}
              </UnitNumberingSection>
            );
          })()}
        </CommonModal>
      )}
    </Container>
  );
};

/* ── Unit Numbering section — refined UI/UX ── */
const UnitNumberingSection = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: #F9FAFB;
  border: 1px solid #C7CED6;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;
const SectionHeader = styled.div`
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 16px; margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
const SectionHeaderText = styled.div`flex: 1;`;
const SectionTitle = styled.div`
  font-size: 14px; font-weight: 600; color: #0A2540; margin-bottom: 4px;
  display: flex; align-items: center; gap: 8px;
`;
const SectionHint = styled.div`font-size: 12px; color: #4B5563; line-height: 1.5;`;

const SwitchLabel = styled.label`
  display: inline-flex; align-items: center; gap: 10px;
  cursor: pointer; user-select: none;
  font-size: 13px; color: #1F2937; font-weight: 500;
  input { display: none; }
`;
const SwitchTrack = styled.span<{ $on: boolean }>`
  width: 36px; height: 20px; border-radius: 10px; position: relative;
  background: ${p => p.$on ? '#635BFF' : '#6B7280'};
  transition: background 0.15s;
  &::after {
    content: '';
    position: absolute; top: 2px; left: ${p => p.$on ? '18px' : '2px'};
    width: 16px; height: 16px; border-radius: 50%; background: white;
    transition: left 0.15s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

const ZoneGrid = styled.div`
  display: flex; flex-direction: column; gap: 10px;
`;
const ZoneCard = styled.div`
  padding: 14px 16px; background: white; border: 1px solid #C7CED6; border-radius: 8px;
  transition: border-color 0.15s;
  &:hover { border-color: #D1D9E0; }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;
const ZoneRow1 = styled.div`
  display: grid; grid-template-columns: 1fr 40px; gap: 12px; align-items: end;
`;
const ZoneRow2 = styled.div`
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;
const PrefixToggleRow = styled.div`margin-bottom: 2px;`;
const NumberTextarea = styled.textarea`
  width: 100%; box-sizing: border-box;
  padding: 10px 12px; border: 1px solid #C7CED6; border-radius: 6px;
  font-size: 13px; font-family: 'SF Mono', Menlo, Consolas, monospace; font-variant-numeric: tabular-nums;
  line-height: 1.5; resize: vertical;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
  &::placeholder { color: #6B7280; white-space: pre-line; }
`;
const FieldLabel = styled.div`
  font-size: 10px; font-weight: 600; color: #4B5563;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
`;
const RemoveZoneBtn = styled.button`
  width: 28px; height: 28px; border-radius: 50%;
  background: #F1F4F8; border: none; cursor: pointer;
  color: #6B7280; font-size: 16px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
  align-self: end; margin-bottom: 2px;
  &:hover { background: #FEE2E2; color: #DC2626; }
`;
const AddZoneBtn = styled.button`
  margin-top: 10px; padding: 10px 14px;
  background: white; border: 1px dashed #D1D9E0; border-radius: 8px;
  font-size: 13px; font-weight: 500; color: #4B5563; cursor: pointer;
  width: 100%; text-align: center;
  transition: all 0.15s;
  &:hover { border-color: #635BFF; color: #635BFF; background: rgba(99, 91, 255, 0.02); }
`;

const PreviewCard = styled.div`
  margin-top: 16px; background: white;
  border: 1px solid #C7CED6; border-radius: 10px; overflow: hidden;
`;
const PreviewHead = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-bottom: 1px solid #C7CED6;
  flex-wrap: wrap; gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
const PreviewTitle = styled.div`
  font-size: 11px; font-weight: 600; color: #4B5563;
  text-transform: uppercase; letter-spacing: 0.5px;
`;
const TotalBadge = styled.span`
  font-size: 12px; color: #0A2540; font-weight: 600;
  background: #F1F4F8; padding: 3px 10px; border-radius: 10px;
`;
const UnitChipRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 6px; padding: 14px 16px;
  max-height: 140px; overflow-y: auto;
`;
const UnitTag = styled.span`
  background: #F1F4F8; border: 1px solid #C7CED6; border-radius: 6px;
  padding: 4px 10px; font-size: 12px; font-weight: 600; color: #0A2540;
  font-variant-numeric: tabular-nums;
`;
const EmptyHint = styled.div`
  padding: 24px 16px; color: #6B7280; font-size: 13px;
  font-style: italic; text-align: center;
`;

const DiffCard = styled.div`
  margin-top: 14px; display: flex; flex-direction: column; gap: 8px;
`;
const DiffRow = styled.div<{ $kind: 'create' | 'delete' | 'block' | 'sync' }>`
  display: flex; gap: 10px; padding: 12px 14px; border-radius: 8px;
  font-size: 13px; line-height: 1.5;
  ${p => {
    if (p.$kind === 'create') return `background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46;`;
    if (p.$kind === 'delete') return `background: #FEF3C7; border: 1px solid #FCD34D; color: #92400E;`;
    if (p.$kind === 'block')  return `background: #FEE2E2; border: 1px solid #FCA5A5; color: #991B1B;`;
    return `background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46;`;
  }}
`;
const DiffIcon = styled.span`
  flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px;
  background: rgba(255, 255, 255, 0.7);
`;
const DiffContent = styled.div`flex: 1;`;
const DiffLabel = styled.div`font-weight: 600; margin-bottom: 2px;`;
const DiffItems = styled.div`color: inherit; opacity: 0.85; font-variant-numeric: tabular-nums;`;

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
  background: ${p => p.active ? '#D1FAE5' : '#F1F4F8'};
  color: ${p => p.active ? '#065F46' : '#4B5563'};
  text-transform: capitalize;
`;

const Hint = styled.div`
  font-size: 11px;
  color: #6B7280;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  min-width: 0;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1); }
  &:disabled { background: #F9FAFB; cursor: not-allowed; }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  min-width: 0;
`;

export default FoodcourtBranchesPage;
