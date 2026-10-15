/**
 * ExternalSupplierProductFields — 구매자가 등록하는 «외부 공급업체 상품» 칸 묶음 (2026-10-15 Fable 설계 D1)
 *   설계: /var/www/.claude/fable-design-20261015-supplier-catalog.md · 단위 기준 docs/TRADE_STRUCTURE.md §2-2
 *   Irene: «공급업체에서 프로덕트 넣으려는데 SKU도 안나오고 수량/단위/팩킹단위가 제대로 … 안나와.»
 *
 * 쓰는 곳 셋 — 같은 칸·같은 문구여야 한다:
 *   SupplierProfilePage 상품 창 · RegisterExternalSupplierModal(재고에서 «외부 공급업체에서 사기») · 공급업체 «All Products» 탭
 * 판매자(Supplier Admin) 폼 SupplierProductsTab 과 같은 다섯 칸·같은 미리보기 문장(useSellerSpecCopy)을 쓴다.
 * 칸만 그린다(제어 컴포넌트) — 저장·검증·주소는 부르는 쪽 몫. 서버 POST/PUT /api/external-suppliers/:id/products.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormGroup, FormLabel, FormInput, FormRow, FormSelect } from '../UI/Modal';
import { SellerSpecSummary, useSellerSpecCopy } from './SellerProductSpecGuide';
import { parseMinOrderQty, qtyStepForUnit, PACKAGE_UNIT_SUGGESTIONS, CONTENT_UNIT_OPTIONS, withCurrentUnit, type OrderMode } from '../../utils/unitConversion';

export interface ExtProductForm {
  sku: string;
  name: string;
  order_mode: OrderMode;
  unit: string;            // Usage Unit — 내용물(kg·g·L·ml·piece)
  base_quantity: string;   // Base Qty — 포장 1개에 든 내용물 양
  package_unit: string;    // Package Unit — 수량에 붙는 포장 이름(box·carton…) · 자유 입력
  unit_price: string;      // Price / Package — 포장 1개 값(무게 주문이면 단위당)
  min_order_quantity: string;
  lead_time_days: string;
}

/** 새 상품 기본값 — 판매자 폼(SupplierProductsTab)과 같다 */
export const EMPTY_EXT_PRODUCT: ExtProductForm = {
  sku: '', name: '', order_mode: 'pack', unit: '', base_quantity: '1', package_unit: '',
  unit_price: '', min_order_quantity: '1', lead_time_days: '0',
};

const numStr = (v: unknown, fallback = ''): string => {
  if (v === null || v === undefined || v === '') return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? String(n) : fallback;
};

/** 저장된 상품 → 폼 (수정 창을 열 때). 리드타임·최소수량을 비워 열면 저장 때 기본값으로 덮인다 — 그대로 옮긴다. */
export function extProductFormFrom(p: {
  sku?: string | null; name?: string | null; order_mode?: string | null; unit?: string | null;
  base_quantity?: number | string | null; package_unit?: string | null; unit_price?: number | string | null;
  min_order_quantity?: number | string | null; lead_time_days?: number | string | null;
}): ExtProductForm {
  return {
    sku: p.sku || '',
    name: p.name || '',
    order_mode: p.order_mode === 'measure' ? 'measure' : 'pack',
    unit: p.unit || '',
    base_quantity: numStr(p.base_quantity, '1'),
    package_unit: p.package_unit || '',
    // 가격은 소수 둘째 자리까지 보인다(DB 는 2자리 칸) — «2.5» 가 «2.50» 으로
    unit_price: p.unit_price === null || p.unit_price === undefined || p.unit_price === '' ? '' : Number(p.unit_price).toFixed(2),
    min_order_quantity: numStr(p.min_order_quantity, '1'),
    lead_time_days: numStr(p.lead_time_days, '0'),
  };
}

/** 폼 → 서버 본문. SKU 를 비우면 보내지 않는다(새 상품은 서버가 자동 번호 · 수정은 그대로). */
export function extProductPayload(f: ExtProductForm) {
  const measure = f.order_mode === 'measure';
  return {
    name: f.name.trim(),
    ...(f.sku.trim() ? { sku: f.sku.trim() } : {}),
    order_mode: f.order_mode,
    unit: f.unit,
    base_quantity: measure ? 1 : (parseFloat(f.base_quantity) > 0 ? parseFloat(f.base_quantity) : 1),
    package_unit: measure ? '' : f.package_unit.trim(),   // 빈 값은 서버가 null 로 저장
    unit_price: parseFloat(f.unit_price),
    min_order_quantity: parseMinOrderQty(f.min_order_quantity),
    lead_time_days: f.lead_time_days !== '' && parseInt(f.lead_time_days, 10) >= 0 ? parseInt(f.lead_time_days, 10) : 0,
  };
}

/** 저장 전 검사 — 문구 키를 돌려준다(없으면 null) */
export function extProductError(f: ExtProductForm, t: (k: string, o?: any) => string): string | null {
  if (!f.name.trim()) return t('extProduct.nameRequired', { defaultValue: 'Product name is required.' });
  if (!f.unit) return t('extProduct.unitRequired', { defaultValue: 'Choose the usage unit.' });
  if (f.unit_price === '' || !(parseFloat(f.unit_price) >= 0)) return t('extProduct.priceRequired', { defaultValue: 'Enter a valid price.' });
  return null;
}

interface Props {
  value: ExtProductForm;
  onChange: (next: ExtProductForm) => void;
  /** datalist id 가 화면에서 겹치지 않게 */
  idPrefix: string;
  /** 이름 칸 아래 도움말(재고에서 열 때 «우리 이름이 기본값») */
  nameHint?: string;
}

export default function ExternalSupplierProductFields({ value: f, onChange, idPrefix, nameHint }: Props) {
  const { t } = useTranslation('supplierDirectory');
  const set = (patch: Partial<ExtProductForm>) => onChange({ ...f, ...patch });
  const measure = f.order_mode === 'measure';
  const copy = useSellerSpecCopy({
    unit: f.unit, base_quantity: measure ? 1 : f.base_quantity, package_unit: measure ? '' : f.package_unit,
    order_mode: f.order_mode, unit_price: f.unit_price, min_order_quantity: f.min_order_quantity,
  });

  return (
    <>
      <SellerSpecSummary title={copy.summaryTitle} text={copy.summary} />
      <FormRow>
        <FormGroup>
          <FormLabel>{t('extProduct.name', { defaultValue: 'Product name' })} *</FormLabel>
          <FormInput type="text" value={f.name} maxLength={255} onChange={(e) => set({ name: e.target.value })}
            placeholder={t('extProduct.namePlaceholder', { defaultValue: 'e.g. Chicken Breast' }) as string} />
          {nameHint && <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>{nameHint}</div>}
        </FormGroup>
        <FormGroup>
          <FormLabel>SKU</FormLabel>
          <FormInput type="text" value={f.sku} maxLength={100} onChange={(e) => set({ sku: e.target.value })}
            placeholder={t('extProduct.skuPlaceholder', { defaultValue: "Supplier's product code (optional)" }) as string} />
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>
            {t('extProduct.skuHint', { defaultValue: 'Leave empty to number it automatically.' })}
          </div>
        </FormGroup>
      </FormRow>

      <FormGroup>
        <FormLabel>{t('extProduct.orderMode', { defaultValue: 'How do you order this?' })}</FormLabel>
        <FormSelect value={f.order_mode} onChange={(e) => set({ order_mode: e.target.value === 'measure' ? 'measure' : 'pack' })}>
          <option value="pack">{t('extProduct.orderModePack', { defaultValue: 'By count (pack / box / carton)' })}</option>
          <option value="measure">{t('extProduct.orderModeMeasure', { defaultValue: 'By weight or volume (kg, g, L, ml)' })}</option>
        </FormSelect>
      </FormGroup>

      {/* 다섯 칸(§2-2) — Base Qty · Usage Unit = 포장 1개에 든 것 · Package Unit = 수량에 붙는 이름. 재고아이템과 같은 이름이다. */}
      <FormRow>
        {!measure && (
          <FormGroup>
            <FormLabel>{t('extProduct.baseQty', { defaultValue: 'Base Qty' })}</FormLabel>
            <FormInput type="number" step="0.01" min="0.01" value={f.base_quantity} onChange={(e) => set({ base_quantity: e.target.value })} placeholder="1" />
          </FormGroup>
        )}
        <FormGroup>
          <FormLabel>{t('extProduct.usageUnit', { defaultValue: 'Usage Unit' })} *</FormLabel>
          <FormSelect value={f.unit} onChange={(e) => set({ unit: e.target.value })}>
            <option value="">{t('extProduct.selectUnit', { defaultValue: 'Select unit' })}</option>
            {/* 내용물 단위만 — 포장 이름은 Package Unit. 옛 상품의 값은 그대로 남긴다. */}
            {withCurrentUnit(CONTENT_UNIT_OPTIONS, f.unit).map((u) => <option key={u} value={u}>{u}</option>)}
          </FormSelect>
        </FormGroup>
        {!measure && (
          <FormGroup>
            <FormLabel>{t('extProduct.packageUnit', { defaultValue: 'Package Unit' })}</FormLabel>
            <FormInput type="text" list={`${idPrefix}-package-units`} maxLength={50} value={f.package_unit}
              onChange={(e) => set({ package_unit: e.target.value })}
              placeholder={t('extProduct.packageUnitPlaceholder', { defaultValue: 'e.g. box, pack, carton' }) as string} />
            <datalist id={`${idPrefix}-package-units`}>
              {PACKAGE_UNIT_SUGGESTIONS.map((u) => <option key={u} value={u} />)}
            </datalist>
          </FormGroup>
        )}
      </FormRow>
      {copy.specPreview && <div style={{ fontSize: 12, color: '#0A2540', fontWeight: 600, marginTop: -4, marginBottom: 12 }}>{copy.specPreview}</div>}

      <FormRow>
        <FormGroup>
          <FormLabel>{copy.priceLabel} *</FormLabel>
          <FormInput type="number" step="0.01" min="0" value={f.unit_price} onChange={(e) => set({ unit_price: e.target.value })} placeholder="0.00" />
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>{copy.priceMeaning}</div>
        </FormGroup>
        <FormGroup>
          <FormLabel>{copy.minLabel}</FormLabel>
          <FormInput type="number" min={measure ? '0.01' : '1'} step={measure ? qtyStepForUnit(f.unit) : 1}
            value={f.min_order_quantity} onChange={(e) => set({ min_order_quantity: e.target.value })} placeholder="1" />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('extProduct.leadTime', { defaultValue: 'Lead time (days)' })}</FormLabel>
          <FormInput type="number" min="0" value={f.lead_time_days} onChange={(e) => set({ lead_time_days: e.target.value })} placeholder="0" />
        </FormGroup>
      </FormRow>
    </>
  );
}
