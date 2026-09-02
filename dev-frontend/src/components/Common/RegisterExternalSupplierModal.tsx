/**
 * RegisterExternalSupplierModal — "이 재고를 솔루션 미가입 외부공급업체의 상품으로 등록"
 *
 * 2026-09-02(P3-③) 로 **공유 컴포넌트로 추출**했다. 그 전에는 RA 재료 화면(IngredientsTab)
 * 안에만 있어서 **BG 재고 화면에는 이 입구가 아예 없었다** — BG 는 외부공급업체에서 사는 물건을
 * 화면에서 등록할 방법이 없었다. 같은 코드를 한 벌 더 복사하면 곧 갈라지므로 부품으로 뺀다.
 *
 * 하는 일(2단계, 화면에서는 한 동작):
 *   ① POST /api/external-suppliers/:id/products   — 그 업체의 판매 상품을 만든다
 *   ② POST <from-catalog>                         — 우리 쪽 재고에 공급처로 연결한다
 * 연결 대상(targetKind)에 따라 ②의 엔드포인트와 키가 갈린다 — 이 부품 한 곳에서만 갈린다.
 *
 * ⚠ 외부공급업체 **자체**의 등록은 여기서 하지 않는다(2026-06-22 Irene 확정).
 *   업체 등록은 Suppliers(공급업체 디렉토리)에서 하고 여기서는 고르기만 한다.
 */
import React, { useEffect, useState } from 'react';
import { Modal, ModalButton, FormGroup, FormLabel, FormInput, FormRow } from '../UI/Modal';
import SearchableSelect from './SearchableSelect';
import { getAuthToken } from '../../utils/auth';
import { parseMinOrderQty } from '../../utils/unitConversion';

export type ExternalSupplierTargetKind = 'ingredient' | 'product_ingredient' | 'product' | 'brand_product';

interface Props {
  /** 연결할 우리 쪽 재고 — id 는 targetKind 가 가리키는 테이블의 id 다. */
  target: { id: number; name: string; unit?: string | null } | null;
  targetKind?: ExternalSupplierTargetKind;
  /** '/api/restaurants/5' | '/api/brands/1' — ingredient·product 대상일 때 쓰인다. */
  buyerApiBase: string;
  /** BG 가 primary 아닌 자기 브랜드로 작업할 때의 buyer 스코프 ('?entity_type=brand&entity_id=2'). */
  buyerScopeQS?: string;
  onClose: () => void;
  /** 성공 후 — 부모가 목록을 다시 읽는다. */
  onRegistered: () => void;
}

export default function RegisterExternalSupplierModal({
  target, targetKind = 'ingredient', buyerApiBase, buyerScopeQS = '', onClose, onRegistered,
}: Props) {
  const [suppliers, setSuppliers] = useState<Array<{ id: number; name: string }>>([]);
  const [form, setForm] = useState({ supplier_id: null as number | null, product_name: '', sku: '', unit_price: '', min_order_quantity: '' });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!target) return;
    // 판매품목명 기본값 = 우리 쪽 재고명(편의 프리필, 잠그지 않는다)
    setForm({ supplier_id: null, product_name: target.name || '', sku: '', unit_price: '', min_order_quantity: '' });
    setError(null);
    const token = getAuthToken();
    fetch(`/api/external-suppliers${buyerScopeQS}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(j => setSuppliers(Array.isArray(j?.data) ? j.data : []))
      .catch(() => setSuppliers([]));
  }, [target?.id, buyerScopeQS]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!target) return null;

  const save = async () => {
    setError(null);
    if (!form.supplier_id) { setError('Select an external supplier.'); return; }
    if (!form.unit_price || parseFloat(form.unit_price) < 0) { setError('Enter a valid price.'); return; }
    const productName = form.product_name.trim() || target.name;
    setSaving(true);
    try {
      const token = getAuthToken();
      const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
      const cr = await fetch(`/api/external-suppliers/${form.supplier_id}/products${buyerScopeQS}`, {
        method: 'POST', headers,
        body: JSON.stringify({
          name: productName,
          sku: form.sku.trim() || undefined,
          unit: target.unit || 'kg',
          unit_price: parseFloat(form.unit_price),
          min_order_quantity: parseMinOrderQty(form.min_order_quantity),
        }),
      });
      const cj = await cr.json().catch(() => null);
      if (!cr.ok || !cj?.success) { setError(cj?.message || 'Failed to create product.'); setSaving(false); return; }

      // ② 우리 쪽 재고에 연결 — 대상 종류에 따라 엔드포인트·키가 다르다.
      const linkUrl = (targetKind === 'product_ingredient' || targetKind === 'brand_product')
        ? '/api/product-ingredients/from-catalog'
        : `${buyerApiBase}/ingredients/from-catalog`;
      const targetBodyKey =
        targetKind === 'product' ? 'existing_product_id'
        : targetKind === 'brand_product' ? 'existing_brand_product_id'
        : targetKind === 'product_ingredient' ? 'existing_product_ingredient_id'
        : 'existing_ingredient_id';
      const mr = await fetch(linkUrl, {
        method: 'POST', headers,
        body: JSON.stringify({
          supplier_product_id: cj.data.id,
          [targetBodyKey]: target.id,
          unit_conversion: 1,
          unit_price: parseFloat(form.unit_price),
        }),
      });
      const mj = await mr.json().catch(() => null);
      if (!mr.ok || !mj?.success) { setError(mj?.message || 'Created product, but failed to link it.'); setSaving(false); return; }
      onRegistered();
      onClose();
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Buy from an external supplier"
      size="small"
      footer={<>
        <ModalButton variant="secondary" onClick={onClose}>Cancel</ModalButton>
        <ModalButton variant="primary" disabled={saving} onClick={save}>{saving ? '…' : 'Save'}</ModalButton>
      </>}
    >
      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13 }}>
          {error}
        </div>
      )}
      <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 12 }}>
        Record that you buy <strong style={{ color: '#0A2540' }}>{target.name}</strong> from a supplier that isn't on the platform, at a set price. You can reuse the same supplier for many items.
      </div>
      <FormGroup>
        <FormLabel>Supplier *</FormLabel>
        {suppliers.length > 0 ? (
          <SearchableSelect
            options={suppliers.map(s => ({ value: s.id, label: s.name }))}
            value={form.supplier_id}
            onChange={(v) => setForm({ ...form, supplier_id: v == null ? null : Number(v) })}
            placeholder="Select an external supplier"
            noOptionsMessage="No external suppliers found"
          />
        ) : (
          <div style={{ fontSize: 13, color: '#6B7280', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 12px' }}>
            No external suppliers registered yet. Add one in the <strong style={{ color: '#0A2540' }}>Suppliers</strong> menu first, then come back to register this item as their product.
          </div>
        )}
      </FormGroup>
      <FormRow>
        <FormGroup>
          <FormLabel>Product name *</FormLabel>
          <FormInput type="text" value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} placeholder={target.name} />
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>The supplier's own name for this product. Defaults to your item name — edit if theirs differs.</div>
        </FormGroup>
        <FormGroup>
          <FormLabel>SKU</FormLabel>
          <FormInput type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="Optional — supplier's product code" />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup>
          <FormLabel>Unit price *</FormLabel>
          <FormInput type="number" step="0.01" min="0" value={form.unit_price} onChange={(e) => setForm({ ...form, unit_price: e.target.value })} placeholder={`0.00 /${target.unit || 'unit'}`} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Min. order qty</FormLabel>
          <FormInput type="number" min="1" value={form.min_order_quantity} onChange={(e) => setForm({ ...form, min_order_quantity: e.target.value })} placeholder="1" />
        </FormGroup>
      </FormRow>
    </Modal>
  );
}
