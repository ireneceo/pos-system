import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  Modal as CommonModal, ModalButton, FormGroup, FormInput, FormLabel, FormSelect, FormRow,
  DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty
} from '../../components/UI';
import PageHeader from '../../components/Common/PageHeader';
import DateRangeField from '../../components/Common/DateRangeField';
import ConfirmModal from '../../components/ConfirmModal';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/currency';
import { getAuthToken } from '../../utils/auth';

// 다매장 쿠폰 발행(Foodcourt General / Brand General) — "전 매장 / 선택 매장" 타게팅.
// 백엔드 /api/coupon-groups 가 대상 매장마다 쿠폰을 1행씩 materialize 하고 scope_group_id 로 묶어 관리.
// 결제/검증 로직은 무변경(매장당 쿠폰 그대로). 단일매장 쿠폰은 매장 관리자의 /restaurant/:id/coupons.

const Content = styled.div`padding: 20px 24px; @media (max-width: 768px) { padding: 12px; }`;
const PrimaryBtn = styled.button`
  display: inline-flex; align-items: center; gap: 8px; padding: 9px 18px; background: #635BFF; color: #fff;
  border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;
  &:disabled { background: #C7CED6; cursor: not-allowed; }
  &:not(:disabled):hover { background: #5A51E6; }
`;
const ScopeChoice = styled.div`display: flex; gap: 10px; margin: 6px 0 4px;`;
const ScopeOption = styled.button<{ active?: boolean }>`
  flex: 1; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; text-align: left;
  border: 1px solid ${p => p.active ? '#635BFF' : '#E6EBF1'}; background: ${p => p.active ? '#F0F2FF' : '#fff'};
  color: ${p => p.active ? '#635BFF' : '#0A2540'};
  span { display: block; font-size: 12px; font-weight: 500; color: #6B7C93; margin-top: 2px; }
`;
const RestaurantGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px;
  max-height: 200px; overflow-y: auto; border: 1px solid #E6EBF1; border-radius: 8px; padding: 10px; margin-top: 8px;
`;
const CheckRow = styled.label`
  display: flex; align-items: center; gap: 8px; font-size: 13px; color: #0A2540; cursor: pointer;
  input { width: 16px; height: 16px; cursor: pointer; }
`;
const Pill = styled.span<{ on?: boolean }>`
  display: inline-block; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 10px;
  background: ${p => p.on ? '#ECFDF5' : '#F1F4F8'}; color: ${p => p.on ? '#10B981' : '#6B7C93'};
`;
const BrandSelect = styled.select`
  height: 38px; padding: 0 12px; border: 1px solid #C7CED6; border-radius: 8px; font-size: 14px; color: #0A2540; background: #fff;
`;
const IconBtn = styled.button`
  width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; padding: 0;
  border: 1px solid #E6EBF1; background: #fff; border-radius: 6px; color: #6B7C93; cursor: pointer;
  &:hover { background: #F4F6F9; color: #0A2540; }
`;
const ErrorBox = styled.div`background: #FFF1F1; border: 1px solid #FF6B6B; color: #B42318; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; font-size: 14px;`;

interface OwnedBrand { id: number; name: string; }
interface Restaurant { id: number; name: string; }
interface CouponGroup {
  scope_group_id: string;
  scope_mode: 'all' | 'selected';
  code: string; name?: string; description?: string;
  type: 'percentage' | 'fixed'; value: number;
  min_order?: number; max_discount?: number | null; usage_limit?: number | null;
  valid_from?: string | null; valid_until?: string | null; is_active: boolean;
  restaurant_ids: number[]; restaurant_names: string[]; restaurant_count: number; usage_count_total: number;
}

const emptyForm = {
  code: '', name: '', description: '',
  type: 'percentage' as 'percentage' | 'fixed', value: '', min_order: '', max_discount: '', usage_limit: '',
  valid_from: '', valid_until: '', is_active: true,
  scope_mode: 'all' as 'all' | 'selected', restaurant_ids: [] as number[]
};

const ManagerPromotionsPage: React.FC = () => {
  const { user } = useAuth();
  const isBrand = user?.role === 'Brand General' || user?.role === 'Brand Manager';

  const [brands, setBrands] = useState<OwnedBrand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(() => {
    const saved = localStorage.getItem('bg.selectedBrandId');
    return saved ? Number(saved) : null;
  });
  const ownerType = isBrand ? 'brand' : 'foodcourt';
  const ownerId = isBrand ? selectedBrandId : (user?.foodcourt_id ?? null);

  const [groups, setGroups] = useState<CouponGroup[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CouponGroup | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [delTarget, setDelTarget] = useState<CouponGroup | null>(null);

  const authHeaders = () => { const t = getAuthToken(); return { 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}) }; };
  const fc = (n: number) => formatCurrency(Number(n) || 0, 'MYR');

  // BG: 소유 브랜드 목록 로드 + 선택 브랜드 결정(다른 BG 페이지와 같은 localStorage 키 공유)
  useEffect(() => {
    if (!isBrand) return;
    (async () => {
      try {
        const r = await fetch('/api/brands', { headers: authHeaders() });
        const j = await r.json().catch(() => null);
        const list: OwnedBrand[] = (Array.isArray(j?.data) ? j.data : Array.isArray(j) ? j : []).map((b: any) => ({ id: b.id, name: b.name }));
        setBrands(list);
        if (list.length > 0) {
          setSelectedBrandId(prev => {
            const valid = prev != null && list.some(b => b.id === prev) ? prev : list[0].id;
            localStorage.setItem('bg.selectedBrandId', String(valid));
            return valid;
          });
        }
      } catch { /* noop */ }
    })();
  }, [isBrand]);

  const fetchGroups = useCallback(async () => {
    if (!ownerId) { setLoading(false); return; }
    setLoading(true);
    try {
      const r = await fetch(`/api/coupon-groups?ownerType=${ownerType}&ownerId=${ownerId}`, { headers: authHeaders() });
      const j = await r.json().catch(() => null);
      setGroups(Array.isArray(j?.data) ? j.data : []);
      setRestaurants(Array.isArray(j?.restaurants) ? j.restaurants : []);
    } catch { setGroups([]); }
    finally { setLoading(false); }
  }, [ownerType, ownerId]);

  useEffect(() => { fetchGroups(); }, [fetchGroups]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFormError(null); setShowModal(true); };
  const openEdit = (g: CouponGroup) => {
    setEditing(g);
    setForm({
      code: g.code, name: g.name || '', description: g.description || '',
      type: g.type, value: String(g.value ?? ''), min_order: g.min_order ? String(g.min_order) : '',
      max_discount: g.max_discount != null ? String(g.max_discount) : '', usage_limit: g.usage_limit != null ? String(g.usage_limit) : '',
      valid_from: g.valid_from || '', valid_until: g.valid_until || '', is_active: g.is_active,
      scope_mode: g.scope_mode, restaurant_ids: [...g.restaurant_ids]
    });
    setFormError(null); setShowModal(true);
  };

  const toggleRestaurant = (id: number) => setForm(f => ({
    ...f, restaurant_ids: f.restaurant_ids.includes(id) ? f.restaurant_ids.filter(x => x !== id) : [...f.restaurant_ids, id]
  }));

  const save = async () => {
    setFormError(null);
    if (!form.code.trim()) { setFormError('Coupon code is required.'); return; }
    if (!form.value || parseFloat(form.value) <= 0) { setFormError('Discount value must be greater than 0.'); return; }
    if (form.scope_mode === 'selected' && form.restaurant_ids.length === 0) { setFormError('Select at least one restaurant.'); return; }
    setSaving(true);
    const payload: any = {
      ownerType, ownerId, scope_mode: form.scope_mode,
      restaurant_ids: form.scope_mode === 'selected' ? form.restaurant_ids : [],
      code: form.code.trim().toUpperCase(), name: form.name || null, description: form.description || null,
      type: form.type, value: parseFloat(form.value),
      min_order: form.min_order ? parseFloat(form.min_order) : 0,
      max_discount: form.max_discount ? parseFloat(form.max_discount) : null,
      usage_limit: form.usage_limit ? parseInt(form.usage_limit, 10) : null,
      valid_from: form.valid_from || null, valid_until: form.valid_until || null, is_active: form.is_active
    };
    try {
      const url = editing ? `/api/coupon-groups/${editing.scope_group_id}` : '/api/coupon-groups';
      const r = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: authHeaders(), body: JSON.stringify(payload) });
      const j = await r.json().catch(() => null);
      if (r.ok && j?.success) { setShowModal(false); fetchGroups(); }
      else setFormError(j?.message || 'Failed to save coupon.');
    } catch { setFormError('An error occurred. Please try again.'); }
    finally { setSaving(false); }
  };

  const doDelete = async () => {
    if (!delTarget) return;
    try {
      const r = await fetch(`/api/coupon-groups/${delTarget.scope_group_id}`, { method: 'DELETE', headers: authHeaders() });
      if (r.ok) { setDelTarget(null); fetchGroups(); }
    } catch { /* noop */ }
  };

  const scopeLabel = (g: CouponGroup) => g.scope_mode === 'all'
    ? `All restaurants (${g.restaurant_count})`
    : `${g.restaurant_count} selected`;

  return (
    <div>
      <PageHeader title="Coupons">
        {isBrand && brands.length > 1 && (
          <BrandSelect value={selectedBrandId ?? ''} onChange={e => { const id = parseInt(e.target.value, 10); setSelectedBrandId(id); localStorage.setItem('bg.selectedBrandId', String(id)); }}>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </BrandSelect>
        )}
        <PrimaryBtn type="button" onClick={openCreate} disabled={!ownerId}>Add Coupon</PrimaryBtn>
      </PageHeader>

      <Content>
        {!ownerId ? (
          <DataTableEmpty>No brand or foodcourt is linked to your account yet.</DataTableEmpty>
        ) : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>Code</DataTableHeaderCell>
                <DataTableHeaderCell>Name</DataTableHeaderCell>
                <DataTableHeaderCell>Discount</DataTableHeaderCell>
                <DataTableHeaderCell>Applies to</DataTableHeaderCell>
                <DataTableHeaderCell>Status</DataTableHeaderCell>
                <DataTableHeaderCell align="right">Used</DataTableHeaderCell>
                <DataTableHeaderCell align="center" width="100px">Actions</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}><DataTableEmpty>Loading…</DataTableEmpty></td></tr>
              ) : groups.length === 0 ? (
                <tr><td colSpan={7}><DataTableEmpty>No coupons yet. Click "Add Coupon" to create one for your restaurants.</DataTableEmpty></td></tr>
              ) : groups.map(g => (
                <DataTableRow key={g.scope_group_id}>
                  <DataTableCell data-label="Code"><strong>{g.code}</strong></DataTableCell>
                  <DataTableCell data-label="Name">{g.name || '—'}</DataTableCell>
                  <DataTableCell data-label="Discount">{g.type === 'percentage' ? `${g.value}%` : fc(g.value)}</DataTableCell>
                  <DataTableCell data-label="Applies to" title={g.restaurant_names.join(', ')}>{scopeLabel(g)}</DataTableCell>
                  <DataTableCell data-label="Status"><Pill on={g.is_active}>{g.is_active ? 'Active' : 'Inactive'}</Pill></DataTableCell>
                  <DataTableCell data-label="Used" align="right">{g.usage_count_total}</DataTableCell>
                  <DataTableCell data-label="Actions" align="center">
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      <IconBtn type="button" title="Edit" onClick={() => openEdit(g)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
                      </IconBtn>
                      <IconBtn type="button" title="Delete" onClick={() => setDelTarget(g)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </IconBtn>
                    </div>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </Content>

      {showModal && (
        <CommonModal isOpen onClose={() => setShowModal(false)} title={editing ? 'Edit Coupon' : 'Add Coupon'} size="medium"
          footer={<>
            <ModalButton onClick={() => setShowModal(false)}>Cancel</ModalButton>
            <ModalButton variant="primary" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save'}</ModalButton>
          </>}>
          {formError && <ErrorBox>{formError}</ErrorBox>}

          <FormRow>
            <FormGroup>
              <FormLabel>Code *</FormLabel>
              <FormInput value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="SUMMER10" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Summer promo" />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Discount type *</FormLabel>
              <FormSelect value={form.type} onChange={e => setForm({ ...form, type: e.target.value as 'percentage' | 'fixed' })}>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed amount (MYR)</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Value *</FormLabel>
              <FormInput type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} placeholder={form.type === 'percentage' ? '10' : '5.00'} />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Min. order</FormLabel>
              <FormInput type="number" value={form.min_order} onChange={e => setForm({ ...form, min_order: e.target.value })} placeholder="0" />
            </FormGroup>
            <FormGroup>
              <FormLabel>{form.type === 'percentage' ? 'Max. discount' : 'Max. discount (n/a)'}</FormLabel>
              <FormInput type="number" value={form.max_discount} onChange={e => setForm({ ...form, max_discount: e.target.value })} placeholder="No cap" disabled={form.type !== 'percentage'} />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Usage limit</FormLabel>
              <FormInput type="number" value={form.usage_limit} onChange={e => setForm({ ...form, usage_limit: e.target.value })} placeholder="Unlimited" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Status</FormLabel>
              <FormSelect value={form.is_active ? '1' : '0'} onChange={e => setForm({ ...form, is_active: e.target.value === '1' })}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </FormSelect>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <FormLabel>Validity period</FormLabel>
            <DateRangeField
              startDate={form.valid_from} endDate={form.valid_until}
              onChange={(start: string, end: string) => setForm({ ...form, valid_from: start, valid_until: end })}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Apply to *</FormLabel>
            <ScopeChoice>
              <ScopeOption type="button" active={form.scope_mode === 'all'} onClick={() => setForm({ ...form, scope_mode: 'all' })}>
                All restaurants<span>{restaurants.length} {isBrand ? 'in this brand' : 'in this foodcourt'}</span>
              </ScopeOption>
              <ScopeOption type="button" active={form.scope_mode === 'selected'} onClick={() => setForm({ ...form, scope_mode: 'selected' })}>
                Selected restaurants<span>Pick specific ones</span>
              </ScopeOption>
            </ScopeChoice>
            {form.scope_mode === 'selected' && (
              <RestaurantGrid>
                {restaurants.length === 0 ? <span style={{ fontSize: 13, color: '#6B7C93' }}>No restaurants found.</span> :
                  restaurants.map(r => (
                    <CheckRow key={r.id}>
                      <input type="checkbox" checked={form.restaurant_ids.includes(r.id)} onChange={() => toggleRestaurant(r.id)} />
                      {r.name}
                    </CheckRow>
                  ))}
              </RestaurantGrid>
            )}
          </FormGroup>
        </CommonModal>
      )}

      {delTarget && (
        <ConfirmModal
          isOpen
          title="Delete coupon"
          message={`Delete coupon "${delTarget.code}" from ${delTarget.restaurant_count} restaurant(s)? This cannot be undone.`}
          confirmText="Delete"
          type="danger"
          onConfirm={doDelete}
          onCancel={() => setDelTarget(null)}
        />
      )}
    </div>
  );
};

export default ManagerPromotionsPage;
