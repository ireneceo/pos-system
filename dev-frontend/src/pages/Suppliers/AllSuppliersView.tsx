/**
 * AllSuppliersView — 단일 list 통합 view.
 *
 * sources prop 으로 표시 source 제한 가능:
 *   - 'own'             자기 등록 supplier (suppliers, owner=restaurant/brand/foodcourt)
 *   - 'brand_shared'    Restaurant 가맹점 → brand 가 공유한 supplier (connectedBrands 매핑)
 *   - 'brand_parent'    Restaurant 의 부모 brand entity 자체 (가맹본부)
 *   - 'foodcourt_parent' Restaurant 의 부모 foodcourt entity (푸드코트 본부)
 *   - 'contract'        active SupplierContract 의 supplier_company (자동 정보)
 *
 * Edit/View 는 공통 SupplierFormModal / SupplierViewModal 컴포넌트 사용 — 모든 필드(code, address, bank, notes 등) 포함.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { Building2, Store, FileText, Share2, User, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';
import SupplierFormModal from '../../components/Suppliers/SupplierFormModal';
import SupplierViewModal from '../../components/Suppliers/SupplierViewModal';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormRow as UIFormRow } from '../../components/UI/Modal';

export type SourceKey = 'own' | 'brand_shared' | 'contract' | 'brand_parent' | 'foodcourt_parent' | 'external';
interface Row {
  key: string;
  id: number;
  name: string;
  source: SourceKey;
  contact?: string | null;
  email?: string | null;
  phone?: string | null;
  raw?: any; // 원본 객체 (View/Edit 모달에서 모든 필드 표시)
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;
const Card = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s;
  &:hover {
    border-color: #635BFF;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
`;
const SourceTag = styled.div<{ $source: SourceKey }>`
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 10px; border-radius: 999px;
  font-size: 10px; font-weight: 700;
  width: fit-content; margin-bottom: 4px;
  letter-spacing: 0.3px;
  background: ${p => {
    switch (p.$source) {
      case 'brand_parent': return '#EDE9FE';
      case 'foodcourt_parent': return '#FCE7F3';
      case 'contract': return '#DCFCE7';
      case 'brand_shared': return '#FEF3C7';
      case 'own': return '#EEF2FF';
      case 'external': return '#CCFBF1';
    }
  }};
  color: ${p => {
    switch (p.$source) {
      case 'brand_parent': return '#6D28D9';
      case 'foodcourt_parent': return '#9D174D';
      case 'contract': return '#166534';
      case 'brand_shared': return '#92400E';
      case 'own': return '#3730A3';
      case 'external': return '#0F766E';
    }
  }};
  svg { width: 11px; height: 11px; }
`;
const Name = styled.h3`
  font-size: 16px; font-weight: 600; color: #0A2540;
  margin: 0 0 4px;
  overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; word-break: break-word;
`;
const Meta = styled.div`
  font-size: 13px; color: #4B5563;
  display: flex; align-items: center; gap: 6px;
`;
const MetaLabel = styled.span`
  font-size: 11px; color: #6B7280; min-width: 50px;
`;
const CardActions = styled.div`
  display: flex; gap: 8px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #C7CED6;
`;
const ActionButton = styled.button<{ variant?: 'danger' | 'primary' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${p => p.variant === 'danger' ? '#FEE2E2' : '#C7CED6'};
  background: ${p => p.variant === 'danger' ? '#FEF2F2' : p.variant === 'primary' ? '#635BFF' : 'white'};
  color: ${p => p.variant === 'danger' ? '#DC2626' : p.variant === 'primary' ? 'white' : '#374151'};
  &:hover {
    background: ${p => p.variant === 'danger' ? '#FEE2E2' : p.variant === 'primary' ? '#5048E5' : '#F9FAFB'};
    border-color: ${p => p.variant === 'danger' ? '#FECACA' : p.variant === 'primary' ? '#5048E5' : '#6B7280'};
  }
`;

function iconOf(source: SourceKey) {
  switch (source) {
    case 'brand_parent': return <Building2 />;
    case 'foodcourt_parent': return <Store />;
    case 'contract': return <FileText />;
    case 'brand_shared': return <Share2 />;
    case 'own': return <User />;
    case 'external': return <Truck />;
  }
}
function labelOf(source: SourceKey, t: any): string {
  switch (source) {
    case 'brand_parent': return t('supplier:source.brandParent', 'BRAND HQ');
    case 'foodcourt_parent': return t('supplier:source.foodcourtParent', 'FOODCOURT');
    case 'contract': return t('supplier:source.contract', 'CONTRACTED');
    case 'brand_shared': return t('supplier:source.brandShared', 'BRAND SHARED');
    case 'own': return t('supplier:source.own', 'OWN');
    case 'external': return t('supplier:source.external', 'EXTERNAL');
  }
}
function sourceNoteOf(source: SourceKey, t: any): string {
  switch (source) {
    case 'own': return t('supplier:viewNote.own', 'You can edit or delete this supplier from the Direct tab.');
    case 'brand_shared': return t('supplier:viewNote.brandShared', 'Shared by your parent Brand. Read-only.');
    case 'contract': return t('supplier:viewNote.contract', 'Linked via active supplier contract. Manage in the Contracts tab.');
    case 'brand_parent': return t('supplier:viewNote.brandParent', 'Your parent Brand HQ — read-only.');
    case 'foodcourt_parent': return t('supplier:viewNote.foodcourtParent', 'Your parent Foodcourt HQ — read-only.');
    case 'external': return t('supplier:viewNote.external', 'An external supplier you registered. Open it to manage its products (catalog).');
  }
}

interface Props {
  /** 표시할 source 목록 — 미지정 시 5개 모두. */
  sources?: SourceKey[];
}

const DEFAULT_SOURCES: SourceKey[] = ['own', 'brand_shared', 'contract', 'brand_parent', 'foodcourt_parent'];

export default function AllSuppliersView({ sources = DEFAULT_SOURCES }: Props) {
  const { t } = useTranslation(['supplier', 'suppliers', 'common']);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | SourceKey>('all');
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  const enabled = useMemo(() => new Set(sources), [sources]);
  const [viewing, setViewing] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState<Row | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [adding, setAdding] = useState(false);
  // 2026-06-22 (Irene): Direct 탭 외부공급업체 등록 (Find 에서 이동). 등록 후 프로필로 이동해 상품 등록.
  const [extReg, setExtReg] = useState<{ name: string; contact_person: string; phone: string; email: string } | null>(null);
  const [extRegSaving, setExtRegSaving] = useState(false);
  const [extRegError, setExtRegError] = useState<string | null>(null);
  const [bridging, setBridging] = useState<number | null>(null);

  const role = user?.role;
  const restaurantId = (user as any)?.restaurantId || (user as any)?.restaurant_id;
  const brandId = (user as any)?.brandId || (user as any)?.brand_id;
  const foodcourtId = (user as any)?.foodcourtId || (user as any)?.foodcourt_id;

  const ownEndpoint = (id: number): string | null => {
    // Staff 도 fetchAll 에서 own 공급업체를 보므로(아래 199행 분기) Edit/Delete endpoint 가 있어야 한다.
    // 누락 시 url=null → 행 액션(수정/삭제)이 조용히 무반응(no-op). 백엔드 checkRestaurantAccess 는 Staff 허용.
    if ((role === 'Restaurant Admin' || role === 'Restaurant Owner' || role === 'Staff') && restaurantId) {
      return `/api/restaurants/${restaurantId}/suppliers/${id}`;
    }
    if (role === 'Brand General' || role === 'Brand Manager') {
      return `/api/suppliers/${id}`;
    }
    // 2026-06-16 FG-5: Foodcourt 분기 누락으로 FG 공급업체 수정/삭제 endpoint 가 null 이던 것.
    if ((role === 'Foodcourt General' || role === 'Foodcourt Manager') && foodcourtId) {
      return `/api/foodcourts/${foodcourtId}/suppliers/${id}`;
    }
    return null;
  };

  const fetchAll = useCallback(async () => {
    if (!user) return;
    const token = getAuthToken();
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    setLoading(true);
    try {
      const list: Row[] = [];

      if ((role === 'Restaurant Admin' || role === 'Restaurant Owner' || role === 'Staff') && restaurantId) {
        const own = await fetch(`/api/restaurants/${restaurantId}/all-suppliers`, auth).then(r => r.json()).catch(() => ({}));
        (own.data?.own_suppliers || []).forEach((s: any) => {
          if (!enabled.has('own')) return;
          list.push({ key: `s-${s.id}`, id: s.id, name: s.name, source: 'own', contact: s.contact_name, email: s.email, phone: s.phone, raw: s });
        });
        (own.data?.brand_suppliers || []).forEach((s: any) => {
          if (!enabled.has('brand_shared')) return;
          list.push({ key: `bs-${s.id}`, id: s.id, name: s.name, source: 'brand_shared', contact: s.contact_name, email: s.email, phone: s.phone, raw: s });
        });
      } else if ((role === 'Brand General' || role === 'Brand Manager') && brandId) {
        if (enabled.has('own')) {
          const own = await fetch(`/api/brands/${brandId}/suppliers`, auth).then(r => r.json()).catch(() => ({}));
          (own.data || []).forEach((s: any) => list.push({
            key: `s-${s.id}`, id: s.id, name: s.name, source: 'own', contact: s.contact_name, email: s.email, phone: s.phone, raw: s,
          }));
        }
      } else if ((role === 'Foodcourt General' || role === 'Foodcourt Manager') && foodcourtId) {
        if (enabled.has('own')) {
          const own = await fetch(`/api/foodcourts/${foodcourtId}/suppliers`, auth).then(r => r.json()).catch(() => ({}));
          (own.data || []).forEach((s: any) => list.push({
            key: `s-${s.id}`, id: s.id, name: s.name, source: 'own', contact: s.contact_name, email: s.email, phone: s.phone, raw: s,
          }));
        }
      }

      if (enabled.has('contract')) {
        const contracts = await fetch(`/api/supplier-contracts?status=active`, auth).then(r => r.json()).catch(() => ({}));
        (contracts.data || []).forEach((c: any) => {
          const sc = c.supplierCompany;
          if (!sc) return;
          list.push({ key: `c-${c.id}`, id: c.id, name: sc.name, source: 'contract', email: sc.email, phone: sc.phone, raw: sc });
        });
      }

      // 2026-06-22 (Irene): 내가 등록한 외부공급업체(supplier_companies) — Direct 탭에 노출.
      // id = supplier_company id → 카드 클릭 시 프로필(/pos/suppliers/directory/:id)에서 상품(Catalog) 등록.
      if (enabled.has('external')) {
        const ext = await fetch(`/api/external-suppliers`, auth).then(r => r.json()).catch(() => ({}));
        (ext.data || []).forEach((s: any) => {
          list.push({ key: `x-${s.id}`, id: s.id, name: s.name, source: 'external', email: s.email, phone: s.phone, raw: { ...s, product_count: s.product_count } });
        });
      }

      if ((role === 'Restaurant Admin' || role === 'Restaurant Owner' || role === 'Staff') && restaurantId) {
        if (enabled.has('brand_parent') || enabled.has('foodcourt_parent')) {
          const rest = await fetch(`/api/restaurants/${restaurantId}`, auth).then(r => r.json()).catch(() => ({}));
          const restData = rest?.data || rest;
          if (enabled.has('brand_parent') && restData?.brand_id) {
            const brData = restData.brand;
            if (brData?.id) list.push({ key: `b-${brData.id}`, id: brData.id, name: brData.name, source: 'brand_parent', email: brData.email, phone: brData.phone, raw: brData });
            else list.push({ key: `b-${restData.brand_id}`, id: restData.brand_id, name: `Brand #${restData.brand_id}`, source: 'brand_parent' });
          }
          if (enabled.has('foodcourt_parent') && restData?.foodcourt_id) {
            const fcData = restData.foodcourt;
            if (fcData?.id) list.push({ key: `f-${fcData.id}`, id: fcData.id, name: fcData.name, source: 'foodcourt_parent', email: fcData.email, phone: fcData.phone, raw: fcData });
            else list.push({ key: `f-${restData.foodcourt_id}`, id: restData.foodcourt_id, name: `Foodcourt #${restData.foodcourt_id}`, source: 'foodcourt_parent' });
          }
        }
      }

      setRows(list);
    } finally {
      setLoading(false);
    }
  }, [user, enabled, role, restaurantId, brandId, foodcourtId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // OWN(레거시) 공급업체 → 상품등록 진입: 외부공급업체 체계로 브리지(find-or-create) 후 프로필로 이동.
  const openOwnProducts = async (r: Row) => {
    setBridging(r.id);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/external-suppliers/from-legacy/${r.id}`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      const j = await res.json().catch(() => null);
      if (res.ok && j?.success && j.data?.supplier_company_id) {
        navigate(`/pos/suppliers/directory/${j.data.supplier_company_id}`);
      } else {
        setInfoModal({ open: true, title: t('common:error', 'Error') as string, message: j?.message || (t('supplier:external.failed', 'Failed to open products.') as string) });
      }
    } catch {
      setInfoModal({ open: true, title: t('common:error', 'Error') as string, message: t('supplier:external.failed', 'Failed to open products.') as string });
    } finally { setBridging(null); }
  };

  const submitExtReg = async () => {
    if (!extReg) return;
    const name = extReg.name.trim();
    if (!name) { setExtRegError(t('supplier:external.nameRequired', 'Supplier name is required.') as string); return; }
    setExtRegSaving(true); setExtRegError(null);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/external-suppliers', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, contact_person: extReg.contact_person || undefined, phone: extReg.phone || undefined, email: extReg.email || undefined })
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setExtRegError(j?.message || (t('supplier:external.failed', 'Failed to register supplier.') as string)); setExtRegSaving(false); return; }
      const newId = j.data?.supplier?.id;
      setExtReg(null); setExtRegSaving(false);
      // 등록 직후 그 업체 프로필로 이동 → Catalog 에서 상품 등록 (한 흐름).
      if (newId) navigate(`/pos/suppliers/directory/${newId}`);
      else fetchAll();
    } catch { setExtRegError(t('supplier:external.failed', 'Failed to register supplier.') as string); setExtRegSaving(false); }
  };

  const handleDelete = async (r: Row) => {
    const url = ownEndpoint(r.id);
    if (!url) { setDeleting(null); return; }
    const token = getAuthToken();
    try {
      const res = await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).then(x => x.json());
      if (res.success) {
        setRows(prev => prev.filter(x => x.key !== r.key));
        setDeleting(null);
      } else {
        setInfoModal({ open: true, title: t('suppliers:deleteFailedTitle', 'Delete Failed'), message: res.message || res.error || t('suppliers:deleteFailedMessage', 'Failed to delete. Please try again.') });
      }
    } catch (e) {
      setInfoModal({ open: true, title: t('suppliers:deleteFailedTitle', 'Delete Failed'), message: t('suppliers:deleteFailedMessage', 'Failed to delete. Please try again.') });
    }
  };

  const handleOpenContract = () => {
    navigate('/pos/suppliers?tab=contracts');
  };

  const q = search.trim().toLowerCase();
  const filtered = rows.filter(r => {
    if (sourceFilter !== 'all' && r.source !== sourceFilter) return false;
    if (!q) return true;
    return r.name.toLowerCase().includes(q) || (r.email || '').toLowerCase().includes(q) || (r.phone || '').toLowerCase().includes(q);
  });
  const sourceCounts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    rows.forEach(r => { c[r.source] = (c[r.source] || 0) + 1; });
    return c;
  }, [rows]);

  return (
    <div>
      <FilterBar>
        <SearchInput
          type="text"
          placeholder={t('supplier:directory.search', 'Search suppliers...') as string}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {sources.length > 1 && (
          <FilterSelect value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as any)}>
            <option value="all">{t('supplier:filter.allSources', 'All sources')} ({sourceCounts.all || 0})</option>
            {sources.map(s => (
              <option key={s} value={s}>{labelOf(s, t)} ({sourceCounts[s] || 0})</option>
            ))}
          </FilterSelect>
        )}
        {enabled.has('own') && (
          <div style={{ marginLeft: 'auto' }}>
            <ThemedButton variant="primary" onClick={() => setAdding(true)}>
              {t('supplier:directory.addSupplier', 'Add Supplier')}
            </ThemedButton>
          </div>
        )}
      </FilterBar>
      {loading && filtered.length === 0 ? (
        <EmptyState><div style={{ fontSize: 14, color: '#4B5563' }}>Loading...</div></EmptyState>
      ) : filtered.length === 0 ? (
        <EmptyState>
          <div style={{ fontSize: 14, color: '#0A2540', fontWeight: 600, marginBottom: 4 }}>
            {t('supplier:emptyAll.title', 'No suppliers yet')}
          </div>
          <div style={{ fontSize: 13, color: '#4B5563' }}>
            {t('supplier:emptyAll.desc', 'Suppliers will appear here automatically when you add your own, connect to a brand/foodcourt, or have an active supplier contract.')}
          </div>
        </EmptyState>
      ) : (
        <Grid>
          {filtered.map(r => (
            <Card key={r.key}>
              <SourceTag $source={r.source}>{iconOf(r.source)}{labelOf(r.source, t)}</SourceTag>
              <Name>{r.name}</Name>
              {r.contact && <Meta><MetaLabel>{t('supplier:card.contact', 'Contact')}</MetaLabel>{r.contact}</Meta>}
              {r.email && <Meta><MetaLabel>{t('supplier:card.email', 'Email')}</MetaLabel>{r.email}</Meta>}
              {r.phone && <Meta><MetaLabel>{t('supplier:card.phone', 'Phone')}</MetaLabel>{r.phone}</Meta>}
              <CardActions>
                <ActionButton onClick={() => setViewing(r)}>{t('common:view', 'View')}</ActionButton>
                {r.source === 'own' && (
                  <>
                    <ActionButton variant="primary" disabled={bridging === r.id} onClick={() => openOwnProducts(r)}>
                      {bridging === r.id ? '…' : t('supplier:card.manageProducts', 'Products')}
                    </ActionButton>
                    <ActionButton onClick={() => setEditing(r)}>{t('common:edit', 'Edit')}</ActionButton>
                    <ActionButton variant="danger" onClick={() => setDeleting(r)}>{t('common:delete', 'Delete')}</ActionButton>
                  </>
                )}
                {r.source === 'contract' && (
                  <ActionButton variant="primary" onClick={handleOpenContract}>{t('supplier:card.openContract', 'Open Contract')}</ActionButton>
                )}
                {r.source === 'external' && (
                  <ActionButton variant="primary" onClick={() => navigate(`/pos/suppliers/directory/${r.id}`)}>
                    {t('supplier:card.manageProducts', 'Products')}{r.raw?.product_count ? ` (${r.raw.product_count})` : ''}
                  </ActionButton>
                )}
              </CardActions>
            </Card>
          ))}
        </Grid>
      )}

      <SupplierViewModal
        isOpen={!!viewing}
        onClose={() => setViewing(null)}
        supplier={viewing?.raw || (viewing ? { name: viewing.name, email: viewing.email, phone: viewing.phone, contact_name: viewing.contact } : null)}
        sourceNote={viewing ? sourceNoteOf(viewing.source, t) : undefined}
      />

      <ConfirmModal
        isOpen={!!deleting}
        title={t('supplier:deleteConfirm.title', 'Delete Supplier?') as string}
        message={t('supplier:deleteConfirm.desc', 'Are you sure you want to delete {{name}}? This action cannot be undone.', { name: deleting?.name }) as string}
        onConfirm={() => deleting && handleDelete(deleting)}
        onCancel={() => setDeleting(null)}
        confirmText={t('common:delete', 'Delete') as string}
        cancelText={t('common:cancel', 'Cancel') as string}
        type="danger"
      />

      <SupplierFormModal
        isOpen={adding || !!editing}
        onClose={() => { setAdding(false); setEditing(null); }}
        onSaved={() => { setAdding(false); setEditing(null); fetchAll(); }}
        supplier={editing?.raw || null}
      />

      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText={t('common:ok', 'OK')}
        type="info"
        singleButton
      />

      {extReg && (
        <Modal
          isOpen={!!extReg}
          onClose={() => setExtReg(null)}
          title={t('supplier:external.register', 'Register External Supplier') as string}
          size="small"
          footer={<>
            <ModalButton variant="secondary" onClick={() => setExtReg(null)} disabled={extRegSaving}>{t('common:cancel', 'Cancel')}</ModalButton>
            <ModalButton variant="primary" onClick={submitExtReg} disabled={extRegSaving}>{extRegSaving ? '…' : t('supplier:external.submit', 'Register & Add Products')}</ModalButton>
          </>}
        >
          {extRegError && <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13 }}>{extRegError}</div>}
          <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 12 }}>
            {t('supplier:external.hint', "Register a supplier that isn't on the platform. After saving, you'll add the products you buy from them so this ingredient can be ordered.")}
          </div>
          <UIFormGroup>
            <FormLabel>{t('supplier:external.name', 'Supplier name')} *</FormLabel>
            <FormInput type="text" value={extReg.name} onChange={(e) => setExtReg({ ...extReg, name: e.target.value })} placeholder={t('supplier:external.namePlaceholder', "e.g. Lim's Butcher") as string} />
          </UIFormGroup>
          <UIFormRow>
            <UIFormGroup>
              <FormLabel>{t('supplier:external.contact', 'Contact person')}</FormLabel>
              <FormInput type="text" value={extReg.contact_person} onChange={(e) => setExtReg({ ...extReg, contact_person: e.target.value })} />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>{t('supplier:external.phone', 'Phone')}</FormLabel>
              <FormInput type="text" value={extReg.phone} onChange={(e) => setExtReg({ ...extReg, phone: e.target.value })} />
            </UIFormGroup>
          </UIFormRow>
          <UIFormGroup>
            <FormLabel>{t('supplier:external.email', 'Email')}</FormLabel>
            <FormInput type="email" value={extReg.email} onChange={(e) => setExtReg({ ...extReg, email: e.target.value })} />
          </UIFormGroup>
        </Modal>
      )}
    </div>
  );
}
