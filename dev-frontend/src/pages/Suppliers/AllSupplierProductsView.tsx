/**
 * AllSupplierProductsView — 공급업체 «All Products» 탭 (2026-10-15 Fable 설계 D5)
 *   설계: /var/www/.claude/fable-design-20261015-supplier-catalog.md
 *   Irene: «공급업체 보기 페이지에 공급업체 전체상품보기 만들어서 리스트 다 보고 검색하고 필터별로 보고 하게 해줘.
 *          그래서 전체상품 확인하고 여기서 추가도 하고 공급업체마다 각각 안들어가도 되게. 그리고 여기서 우리 아이템에 추가도 하고.»
 *
 * 데이터 = 발주 화면 카탈로그와 **같은 서버 목록** `GET /api/supplier-catalog`(새 목록·새 표 없음).
 * 할 수 있는 일:
 *   - 검색·업체·분류(서버) + 공급 종류·연결 상태·포장단위(화면)
 *   - Add Product — 내가 등록한 외부 업체에 상품 추가(POST /api/external-suppliers/:id/products, 공용 칸 ExternalSupplierProductFields)
 *   - Edit — 내가 등록한 외부 업체 상품만(PUT)
 *   - Add to my items — 새 재고아이템으로(서버가 판매 상품 다섯 칸을 복사 — catalogLink.stockFieldsFromSellerProduct)
 *                        또는 기존 아이템에 연결(같은 물건 두 줄 방지). 주소·키는 NewPurchaseOrderPage.ensureIngredientAndAddToCart 와 같다.
 * 장바구니·발주는 발주 화면 몫이라 여기엔 없다.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { withOwnerSupplierScope } from '../../utils/ownerPoScope';
import { getAuthToken } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';
import { formatQuantity, sellerOrderUnitOf, sellerSpecLabel, defaultLinkConversion } from '../../utils/unitConversion';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import {
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
} from '../../components/UI/DataTable';
import { Modal, ModalButton, FormGroup, FormLabel, FormInput } from '../../components/UI/Modal';
import { Button } from '../../components/UI/Button';
import SearchableSelect from '../../components/Common/SearchableSelect';
import DeleteSupplierProductFlow from './DeleteSupplierProductFlow';
import ExternalSupplierProductFields, { EMPTY_EXT_PRODUCT, extProductFormFrom, extProductPayload, extProductError, type ExtProductForm } from '../../components/Common/ExternalSupplierProductFields';

type SellerType = 'supplier' | 'brand' | 'foodcourt';
interface CatalogRow {
  id: number; name: string; sku?: string | null; unit?: string | null;
  base_quantity?: number | null; package_unit?: string | null; order_mode?: string | null;
  unit_price: number; min_order_quantity?: number | null;
  category_id?: number | null; category_name?: string | null;
  supplier: { id: number; name: string; seller_type?: SellerType } | null;
  already_mapped?: boolean;
}
interface MyItem { id: number; name: string; unit: string | null; sellers: Array<{ seller_type: string; seller_product_id: number }> }
type Buyer = { kind: 'restaurants' | 'brands' | 'foodcourts'; id: number } | null;

const ERR_BOX: React.CSSProperties = { background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13 };
const INFO_BOX: React.CSSProperties = { background: '#F1F4F8', border: '1px solid #C7CED6', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#1F2937' };

const sellerTypeOf = (r: CatalogRow): SellerType => (r.supplier?.seller_type || 'supplier') as SellerType;
const keyOf = (type: string, id: number) => `${type}:${id}`;
const specOf = (r: CatalogRow) => ({ seller_unit: r.unit, base_quantity: r.base_quantity ?? 1, seller_package_unit: r.package_unit, order_mode: r.order_mode });

/** 새 재고아이템 미리보기 — 서버 catalogLink.stockFieldsFromSellerProduct 와 같은 모양(저장은 서버가 정한다) */
const newItemPreview = (r: CatalogRow): string => {
  const measure = r.order_mode === 'measure';
  const base = measure ? 1 : (Number(r.base_quantity) > 0 ? Number(r.base_quantity) : 1);
  const pkg = measure ? (r.package_unit || '') : (r.package_unit || (base !== 1 ? 'pack' : ''));
  return [r.unit || '', `${formatQuantity(base)}`, pkg].filter(Boolean).join(' · ');
};

export default function AllSupplierProductsView() {
  const { t } = useTranslation(['supplier', 'supplierDirectory', 'common']);
  const navigate = useNavigate();
  const { user } = useAuth();

  // 구매자 = 재고를 가진 쪽(발주 화면 buyerEntity 와 같은 판정). 소속 매장 없는 오너는 재고가 없어 «내 아이템에 추가» 를 숨긴다.
  const buyer: Buyer = useMemo(() => {
    const role = user?.role || '';
    const u: any = user || {};
    if (['Restaurant Admin', 'Staff', 'Restaurant Owner'].includes(role) && u.restaurantId) return { kind: 'restaurants', id: Number(u.restaurantId) };
    if (['Brand General', 'Brand Manager'].includes(role) && u.brand_id) return { kind: 'brands', id: Number(u.brand_id) };
    if (['Foodcourt General', 'Foodcourt Manager'].includes(role) && u.foodcourt_id) return { kind: 'foodcourts', id: Number(u.foodcourt_id) };
    return null;
  }, [user]);
  const buyerApiBase = buyer ? `/api/${buyer.kind}/${buyer.id}` : null;
  // 오너가 소유 매장을 골랐으면 그 매장 자격으로 카탈로그·업체 상품을 본다(2026-10-22 §3-E).
  //   «내 아이템에 추가»(재고아이템 연결)는 매장 관리자 몫이라 오너에겐 그대로 숨긴다(buyer 없음 — 서버도 막는다).
  const scopeRole = user?.role;
  const S = useCallback((url: string) => withOwnerSupplierScope(url, scopeRole), [scopeRole]);

  const [rows, setRows] = useState<CatalogRow[]>([]);
  const [meta, setMeta] = useState<{ total: number; shown: number; truncated: boolean } | null>(null);
  const [supplierOpts, setSupplierOpts] = useState<Array<{ id: number; name: string; seller_type: SellerType }>>([]);
  const [categoryOpts, setCategoryOpts] = useState<Array<{ id: number; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('all');   // `${seller_type}:${id}`
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'mine' | 'other'>('all');
  const [linkFilter, setLinkFilter] = useState<'all' | 'linked' | 'unlinked'>('all');
  const [pkgFilter, setPkgFilter] = useState('all');
  const [myExt, setMyExt] = useState<Array<{ id: number; name: string }>>([]);
  const [myItems, setMyItems] = useState<MyItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { const h = setTimeout(() => setDebounced(search.trim()), 300); return () => clearTimeout(h); }, [search]);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (debounced) qs.set('search', debounced);
      // 서버 supplier_id 는 공급업체만 거른다 — 브랜드·푸드코트 판매자는 화면에서 거른다
      if (supplierFilter.startsWith('supplier:')) qs.set('supplier_id', supplierFilter.split(':')[1]);
      if (categoryFilter !== 'all') qs.set('category_id', categoryFilter);
      const res = await fetch(S(`/api/supplier-catalog?${qs.toString()}`), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const j = await res.json().catch(() => null);
      if (res.ok && j?.success) {
        setRows(Array.isArray(j.data) ? j.data : []);
        setMeta(j.meta || null);
        // 업체·분류 후보는 거르지 않은 목록일 때만 갈아 끼운다(고른 업체 하나만 남지 않게)
        if (!debounced && supplierFilter === 'all' && categoryFilter === 'all') {
          setSupplierOpts(Array.isArray(j.filters?.suppliers) ? j.filters.suppliers : []);
          setCategoryOpts(Array.isArray(j.filters?.categories) ? j.filters.categories : []);
        }
      } else { setRows([]); setMeta(null); }
    } catch { setRows([]); } finally { setLoading(false); }
  }, [debounced, supplierFilter, categoryFilter, S]);
  useEffect(() => { fetchRows(); }, [fetchRows]);

  const fetchMyExt = useCallback(async () => {
    try {
      const res = await fetch(S('/api/external-suppliers'), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const j = await res.json().catch(() => null);
      // 등록자 본인 것만(오너에게서 받은 업체는 수정 못 한다 — scope 'owner')
      setMyExt(res.ok && Array.isArray(j?.data) ? j.data.filter((s: any) => s.scope !== 'owner').map((s: any) => ({ id: s.id, name: s.name })) : []);
    } catch { setMyExt([]); }
  }, [S]);
  useEffect(() => { fetchMyExt(); }, [fetchMyExt]);

  // 내 아이템(연결 표시 + «기존 아이템에 연결» 후보) — 발주 화면 fetchMine 과 같은 주소
  const fetchMyItems = useCallback(async () => {
    if (!buyer || !buyerApiBase) { setMyItems([]); return; }
    const h = { headers: { Authorization: `Bearer ${getAuthToken()}` } };
    const pick = (x: any, sellers: any[]): MyItem => ({ id: x.id, name: x.name, unit: x.unit ?? null,
      sellers: (sellers || []).map((s: any) => ({ seller_type: s.seller_type, seller_product_id: Number(s.seller_product_id) })) });
    try {
      if (buyer.kind === 'brands') {
        const j = await (await fetch('/api/product-ingredients?include=sellers', h)).json().catch(() => null);
        setMyItems(Array.isArray(j?.data) ? j.data.map((x: any) => pick(x, x.sellers)) : []);
        return;
      }
      const j = await (await fetch(`${buyerApiBase}/ingredients?include=sellers`, h)).json().catch(() => null);
      const own: MyItem[] = Array.isArray(j?.data) ? j.data.map((x: any) => pick(x, x.sellers)) : [];
      let shared: MyItem[] = [];
      if (buyer.kind === 'restaurants') {
        const b = await (await fetch(`/api/restaurants/${buyer.id}/brand-ingredients?include=sellers`, h)).json().catch(() => null);
        shared = Array.isArray(b?.data) ? b.data.map((x: any) => pick(x, x.sellerSources)) : [];
      }
      const seen = new Set<number>();
      setMyItems([...own, ...shared].filter(x => (seen.has(x.id) ? false : (seen.add(x.id), true))));
    } catch { setMyItems([]); }
  }, [buyer, buyerApiBase]);
  useEffect(() => { fetchMyItems(); }, [fetchMyItems]);

  const linkedKeys = useMemo(() => {
    const s = new Set<string>();
    for (const it of myItems) for (const x of it.sellers) s.add(keyOf(x.seller_type, x.seller_product_id));
    return s;
  }, [myItems]);
  const myExtIds = useMemo(() => new Set(myExt.map(s => s.id)), [myExt]);
  const isLinked = useCallback((r: CatalogRow) => !!r.already_mapped || linkedKeys.has(keyOf(sellerTypeOf(r), r.id)), [linkedKeys]);
  const isMine = useCallback((r: CatalogRow) => sellerTypeOf(r) === 'supplier' && !!r.supplier && myExtIds.has(r.supplier.id), [myExtIds]);

  const pkgOptions = useMemo(() => {
    const s = new Set<string>();
    rows.forEach(r => { const u = sellerOrderUnitOf(specOf(r), r.unit); if (u) s.add(u); });
    return Array.from(s).sort();
  }, [rows]);

  const visible = useMemo(() => rows.filter(r => {
    if (supplierFilter !== 'all' && !supplierFilter.startsWith('supplier:')) {
      if (keyOf(sellerTypeOf(r), r.supplier?.id || 0) !== supplierFilter) return false;
    }
    if (sourceFilter === 'mine' && !isMine(r)) return false;
    if (sourceFilter === 'other' && isMine(r)) return false;
    if (linkFilter === 'linked' && !isLinked(r)) return false;
    if (linkFilter === 'unlinked' && isLinked(r)) return false;
    if (pkgFilter !== 'all' && sellerOrderUnitOf(specOf(r), r.unit) !== pkgFilter) return false;
    return true;
  }), [rows, supplierFilter, sourceFilter, linkFilter, pkgFilter, isMine, isLinked]);

  // ── 상품 추가·수정 ─────────────────────────────────────────────
  const [deleting, setDeleting] = useState<CatalogRow | null>(null);
  const [productModal, setProductModal] = useState<{ mode: 'add' | 'edit'; supplierId: number | null; productId?: number } | null>(null);
  const [productForm, setProductForm] = useState<ExtProductForm>(EMPTY_EXT_PRODUCT);
  const [productError, setProductError] = useState<string | null>(null);
  const [productSaving, setProductSaving] = useState(false);

  const openAdd = () => {
    setProductForm(EMPTY_EXT_PRODUCT); setProductError(null);
    setProductModal({ mode: 'add', supplierId: myExt.length === 1 ? myExt[0].id : null });
  };
  const openEdit = async (r: CatalogRow) => {
    if (!r.supplier) return;
    setProductError(null);
    // 카탈로그 줄엔 리드타임이 없다 — 저장된 값 그대로 열려고 그 업체 상품을 다시 읽는다
    try {
      const res = await fetch(S(`/api/external-suppliers/${r.supplier.id}/products`), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const j = await res.json().catch(() => null);
      const full = Array.isArray(j?.data) ? j.data.find((p: any) => p.id === r.id) : null;
      setProductForm(extProductFormFrom(full || r));
    } catch { setProductForm(extProductFormFrom(r)); }
    setProductModal({ mode: 'edit', supplierId: r.supplier.id, productId: r.id });
  };
  const saveProduct = async () => {
    if (!productModal) return;
    if (!productModal.supplierId) { setProductError(t('supplierDirectory:extProduct.supplierRequired', { defaultValue: 'Select an external supplier.' }) as string); return; }
    const invalid = extProductError(productForm, (k: string, o?: any) => t(`supplierDirectory:${k}`, o) as string);
    if (invalid) { setProductError(invalid); return; }
    setProductSaving(true); setProductError(null);
    try {
      const url = productModal.mode === 'edit'
        ? S(`/api/external-suppliers/${productModal.supplierId}/products/${productModal.productId}`)
        : S(`/api/external-suppliers/${productModal.supplierId}/products`);
      const res = await fetch(url, {
        method: productModal.mode === 'edit' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify(extProductPayload(productForm)),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) {
        setProductError(j?.code === 'SKU_EXISTS'
          ? t('supplierDirectory:extProduct.skuExists', { defaultValue: 'This SKU is already used by another product of this supplier.' }) as string
          : (j?.message || t('supplierDirectory:extProduct.saveFailed', { defaultValue: 'Failed to save product.' }) as string));
        return;
      }
      setProductModal(null);
      setToast(t('allProducts.saved', { defaultValue: '"{{name}}" saved', name: productForm.name.trim() }) as string);
      fetchRows();
    } catch { setProductError(t('supplierDirectory:extProduct.saveFailed', { defaultValue: 'Failed to save product.' }) as string); }
    finally { setProductSaving(false); }
  };

  // ── 내 아이템에 추가 ───────────────────────────────────────────
  const [stockModal, setStockModal] = useState<{ row: CatalogRow } | null>(null);
  const [stockMode, setStockMode] = useState<'new' | 'link'>('new');
  const [stockName, setStockName] = useState('');
  const [linkTarget, setLinkTarget] = useState<number | null>(null);
  const [linkConv, setLinkConv] = useState<{ value: string; touched: boolean }>({ value: '', touched: false });
  const [stockError, setStockError] = useState<string | null>(null);
  const [stockSaving, setStockSaving] = useState(false);

  const openStock = (r: CatalogRow) => {
    setStockModal({ row: r }); setStockMode('new'); setStockName(r.name); setLinkTarget(null);
    setLinkConv({ value: '', touched: false }); setStockError(null);
  };
  const linkItem = myItems.find(i => i.id === linkTarget) || null;
  const autoConv = stockModal && linkItem
    ? defaultLinkConversion(stockModal.row.order_mode === 'measure' ? 1 : (stockModal.row.base_quantity ?? 1), stockModal.row.unit || '', linkItem.unit || '')
    : null;
  const convValue = linkConv.touched ? linkConv.value : (autoConv != null ? String(autoConv) : '');

  const saveStock = async () => {
    if (!stockModal || !buyer || !buyerApiBase) return;
    const r = stockModal.row;
    const st = sellerTypeOf(r);
    const body: any = st === 'brand' ? { brand_product_id: r.id } : st === 'foodcourt' ? { foodcourt_product_id: r.id } : { supplier_product_id: r.id };
    if (stockMode === 'link') {
      if (!linkTarget) { setStockError(t('allProducts.pickItem', { defaultValue: 'Choose one of your items.' }) as string); return; }
      const c = parseFloat(convValue);
      if (!(c > 0)) { setStockError(t('supplierDirectory:extProduct.conversionRequired', { defaultValue: 'Enter how many {{unit}} one {{pkg}} adds to stock.', unit: linkItem?.unit || '', pkg: sellerOrderUnitOf(specOf(r), r.unit) }) as string); return; }
      if (buyer.kind === 'brands') body.existing_product_ingredient_id = linkTarget; else body.existing_ingredient_id = linkTarget;
      body.unit_conversion = c;
    } else if (stockName.trim() && stockName.trim() !== r.name) {
      body.name = stockName.trim();
    }
    setStockSaving(true); setStockError(null);
    try {
      const url = buyer.kind === 'brands' ? '/api/product-ingredients/from-catalog' : `${buyerApiBase}/ingredients/from-catalog`;
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` }, body: JSON.stringify(body) });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setStockError(j?.message || (t('allProducts.addFailed', { defaultValue: 'Could not add to your items.' }) as string)); return; }
      const ing = j.data?.ingredient || j.data?.product;
      setStockModal(null);
      setToast(t('allProducts.added', { defaultValue: '"{{name}}" is now in your items', name: ing?.name || r.name }) as string);
      fetchMyItems(); fetchRows();
    } catch { setStockError(t('allProducts.addFailed', { defaultValue: 'Could not add to your items.' }) as string); }
    finally { setStockSaving(false); }
  };

  useEffect(() => { if (!toast) return; const h = setTimeout(() => setToast(null), 3500); return () => clearTimeout(h); }, [toast]);

  const COLS = 7;
  return (
    <div>
      <FilterBar>
        <SearchInput
          type="text"
          placeholder={t('allProducts.search', { defaultValue: 'Search name, SKU, supplier, category' }) as string}
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <FilterSelect value={supplierFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSupplierFilter(e.target.value)}>
          <option value="all">{t('allProducts.allSuppliers', { defaultValue: 'All suppliers' })}</option>
          {supplierOpts.map(s => <option key={keyOf(s.seller_type, s.id)} value={keyOf(s.seller_type, s.id)}>{s.name}</option>)}
        </FilterSelect>
        {categoryOpts.length > 0 && (
          <FilterSelect value={categoryFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}>
            <option value="all">{t('allProducts.allCategories', { defaultValue: 'All categories' })}</option>
            {categoryOpts.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
          </FilterSelect>
        )}
        <FilterSelect value={sourceFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSourceFilter(e.target.value as any)}>
          <option value="all">{t('allProducts.sourceAll', { defaultValue: 'All sources' })}</option>
          <option value="mine">{t('allProducts.sourceMine', { defaultValue: 'External suppliers I registered' })}</option>
          <option value="other">{t('allProducts.sourceOther', { defaultValue: 'Platform & brand sellers' })}</option>
        </FilterSelect>
        {buyer && (
          <FilterSelect value={linkFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLinkFilter(e.target.value as any)}>
            <option value="all">{t('allProducts.linkAll', { defaultValue: 'Linked or not' })}</option>
            <option value="linked">{t('allProducts.linked', { defaultValue: 'In my items' })}</option>
            <option value="unlinked">{t('allProducts.unlinked', { defaultValue: 'Not in my items' })}</option>
          </FilterSelect>
        )}
        {pkgOptions.length > 1 && (
          <FilterSelect value={pkgFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPkgFilter(e.target.value)}>
            <option value="all">{t('allProducts.allPackages', { defaultValue: 'All package units' })}</option>
            {pkgOptions.map(u => <option key={u} value={u}>{u}</option>)}
          </FilterSelect>
        )}
        <Button variant="primary" onClick={openAdd} style={{ marginLeft: 'auto' }}>
          {t('supplierDirectory:extProduct.add', { defaultValue: 'Add Product' })}
        </Button>
      </FilterBar>

      {toast && <div style={{ ...INFO_BOX, background: '#ECFDF5', borderColor: '#A7F3D0', color: '#065F46' }} role="status">{toast}</div>}
      {meta?.truncated && (
        <div style={INFO_BOX}>{t('allProducts.truncated', { defaultValue: 'Showing {{shown}} of {{total}} supplier products — search to narrow down.', shown: meta.shown, total: meta.total })}</div>
      )}
      <div style={{ fontSize: 13, color: '#4B5563', margin: '4px 0 10px' }}>
        {t('allProducts.count', { defaultValue: '{{n}} products', n: visible.length })}
      </div>

      <DataTableContainer>
        <DataTable>
          <DataTableHead>
            <tr>
              <DataTableHeaderCell>{t('allProducts.col.product', { defaultValue: 'Product' })}</DataTableHeaderCell>
              <DataTableHeaderCell>{t('allProducts.col.supplier', { defaultValue: 'Supplier' })}</DataTableHeaderCell>
              <DataTableHeaderCell>{t('allProducts.col.spec', { defaultValue: 'Spec' })}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('allProducts.col.price', { defaultValue: 'Price' })}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('allProducts.col.min', { defaultValue: 'Min. order' })}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('allProducts.col.myItems', { defaultValue: 'My items' })}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('allProducts.col.actions', { defaultValue: 'Actions' })}</DataTableHeaderCell>
            </tr>
          </DataTableHead>
          <tbody>
            {loading ? (
              <tr><td colSpan={COLS}><DataTableEmpty>{t('allProducts.loading', { defaultValue: 'Loading…' })}</DataTableEmpty></td></tr>
            ) : visible.length === 0 ? (
              <tr><td colSpan={COLS}><DataTableEmpty>{t('allProducts.empty', { defaultValue: 'No products match.' })}</DataTableEmpty></td></tr>
            ) : visible.map(r => {
              const st = sellerTypeOf(r);
              const linked = isLinked(r);
              const unit = sellerOrderUnitOf(specOf(r), r.unit);
              return (
                <DataTableRow key={keyOf(st, r.id)}>
                  <DataTableCell data-label={t('allProducts.col.product', { defaultValue: 'Product' }) as string}>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                    {r.sku && <div style={{ fontSize: 12, color: '#6B7280' }}>SKU: {r.sku}</div>}
                    {r.category_name && <div style={{ fontSize: 12, color: '#6B7280' }}>{r.category_name}</div>}
                  </DataTableCell>
                  <DataTableCell data-label={t('allProducts.col.supplier', { defaultValue: 'Supplier' }) as string}>
                    <div>{r.supplier?.name || '—'}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>
                      {isMine(r) ? t('allProducts.kindMine', { defaultValue: 'External (mine)' })
                        : st === 'brand' ? t('allProducts.kindBrand', { defaultValue: 'Brand' })
                        : st === 'foodcourt' ? t('allProducts.kindFoodcourt', { defaultValue: 'Foodcourt' })
                        : t('allProducts.kindSupplier', { defaultValue: 'Supplier' })}
                    </div>
                  </DataTableCell>
                  <DataTableCell data-label={t('allProducts.col.spec', { defaultValue: 'Spec' }) as string}>{sellerSpecLabel(specOf(r), r.unit) || '—'}</DataTableCell>
                  <DataTableCell align="right" data-label={t('allProducts.col.price', { defaultValue: 'Price' }) as string}>
                    {formatCurrency(Number(r.unit_price) || 0, 'MYR')}{unit ? ` / ${unit}` : ''}
                  </DataTableCell>
                  <DataTableCell align="center" data-label={t('allProducts.col.min', { defaultValue: 'Min. order' }) as string}>
                    {r.min_order_quantity != null && Number(r.min_order_quantity) > 1 ? `${formatQuantity(Number(r.min_order_quantity))} ${unit}` : '—'}
                  </DataTableCell>
                  <DataTableCell align="center" data-label={t('allProducts.col.myItems', { defaultValue: 'My items' }) as string}>
                    {buyer ? (linked
                      ? <DataTableStatus variant="success">{t('allProducts.linked', { defaultValue: 'In my items' })}</DataTableStatus>
                      : <DataTableStatus variant="default">{t('allProducts.notLinkedShort', { defaultValue: 'Not added' })}</DataTableStatus>) : '—'}
                  </DataTableCell>
                  <DataTableCell align="right" mobileFullWidth data-label="">
                    <DataTableActions>
                      {buyer && !linked && (
                        <Button size="small" variant="primary" onClick={() => openStock(r)}>{t('allProducts.addToItems', { defaultValue: 'Add to my items' })}</Button>
                      )}
                      {isMine(r) && (
                        <Button size="small" variant="outline" onClick={() => openEdit(r)}>{t('common:button.edit', { defaultValue: 'Edit' })}</Button>
                      )}
                      {/* 삭제 — 내가 등록한 외부 업체 상품만(Edit 과 같은 문). 연결이 있으면 «다른 상품으로 바꾸고 삭제» 창으로 잇는다 (2026-10-23 Fable D5) */}
                      {isMine(r) && (
                        <Button size="small" variant="danger-outline" onClick={() => setDeleting(r)}>{t('common:button.delete', { defaultValue: 'Delete' })}</Button>
                      )}
                      {st === 'supplier' && r.supplier && (
                        <Button size="small" variant="outline" onClick={() => navigate(`/pos/suppliers/directory/${r.supplier!.id}`)}>
                          {t('allProducts.openSupplier', { defaultValue: 'Supplier' })}
                        </Button>
                      )}
                    </DataTableActions>
                  </DataTableCell>
                </DataTableRow>
              );
            })}
          </tbody>
        </DataTable>
      </DataTableContainer>

      {productModal && (
        <Modal
          isOpen
          onClose={() => !productSaving && setProductModal(null)}
          title={productModal.mode === 'edit' ? t('supplierDirectory:extProduct.editTitle', { defaultValue: 'Edit Product' }) as string : t('supplierDirectory:extProduct.addTitle', { defaultValue: 'Add Product' }) as string}
          size="medium"
          footer={<>
            <ModalButton variant="secondary" onClick={() => setProductModal(null)} disabled={productSaving}>{t('common:button.cancel', { defaultValue: 'Cancel' })}</ModalButton>
            {(productModal.mode === 'edit' || myExt.length > 0) && (
              <ModalButton variant="primary" onClick={saveProduct} disabled={productSaving}>{productSaving ? '…' : t('common:button.save', { defaultValue: 'Save' })}</ModalButton>
            )}
          </>}
        >
          {productError && <div style={ERR_BOX}>{productError}</div>}
          {productModal.mode === 'add' && (
            <FormGroup>
              <FormLabel>{t('allProducts.externalSupplier', { defaultValue: 'External supplier' })} *</FormLabel>
              {myExt.length > 0 ? (
                <SearchableSelect
                  options={myExt.map(s => ({ value: s.id, label: s.name }))}
                  value={productModal.supplierId}
                  onChange={(v) => setProductModal({ ...productModal, supplierId: v == null ? null : Number(v) })}
                  placeholder={t('allProducts.pickSupplier', { defaultValue: 'Select an external supplier' }) as string}
                />
              ) : (
                <div style={INFO_BOX}>
                  {t('allProducts.noExternal', { defaultValue: 'You have not registered an external supplier yet. Add one in the All Suppliers tab first, then add its products here.' })}
                </div>
              )}
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>
                {t('allProducts.externalOnly', { defaultValue: 'Platform suppliers manage their own catalog — you can add products only to suppliers you registered.' })}
              </div>
            </FormGroup>
          )}
          {(productModal.mode === 'edit' || myExt.length > 0) && (
            <ExternalSupplierProductFields value={productForm} onChange={setProductForm} idPrefix="all-products-ext" />
          )}
        </Modal>
      )}

      {stockModal && (
        <Modal
          isOpen
          onClose={() => !stockSaving && setStockModal(null)}
          title={t('allProducts.addToItemsTitle', { defaultValue: 'Add to my items' }) as string}
          size="medium"
          footer={<>
            <ModalButton variant="secondary" onClick={() => setStockModal(null)} disabled={stockSaving}>{t('common:button.cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="primary" onClick={saveStock} disabled={stockSaving}>{stockSaving ? '…' : t('common:button.save', { defaultValue: 'Save' })}</ModalButton>
          </>}
        >
          {stockError && <div style={ERR_BOX}>{stockError}</div>}
          <div style={{ ...INFO_BOX, marginBottom: 14 }}>
            <div style={{ fontWeight: 600, color: '#0A2540' }}>{stockModal.row.name}</div>
            <div>{stockModal.row.supplier?.name} · {sellerSpecLabel(specOf(stockModal.row), stockModal.row.unit)} · {formatCurrency(Number(stockModal.row.unit_price) || 0, 'MYR')}</div>
          </div>
          <FormGroup>
            <FormLabel>{t('allProducts.howToAdd', { defaultValue: 'How do you want to add it?' })}</FormLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="radio" name="stock-mode" checked={stockMode === 'new'} onChange={() => setStockMode('new')} />
                <span>{t('allProducts.modeNew', { defaultValue: 'As a new item' })}</span>
              </label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="radio" name="stock-mode" checked={stockMode === 'link'} onChange={() => setStockMode('link')} disabled={myItems.length === 0} />
                <span>{t('allProducts.modeLink', { defaultValue: 'Link to an item I already have (same thing — avoid a second line)' })}</span>
              </label>
            </div>
          </FormGroup>
          {stockMode === 'new' ? (
            <>
              <FormGroup>
                <FormLabel>{t('allProducts.itemName', { defaultValue: 'Item name' })}</FormLabel>
                <FormInput type="text" value={stockName} maxLength={255} onChange={(e) => setStockName(e.target.value)} />
              </FormGroup>
              <div style={{ fontSize: 13, color: '#0A2540' }}>
                {t('allProducts.newPreview', { defaultValue: 'New item: {{spec}} · price {{price}} per package — same as the supplier product', spec: newItemPreview(stockModal.row), price: formatCurrency(Number(stockModal.row.unit_price) || 0, 'MYR') })}
              </div>
            </>
          ) : (
            <>
              <FormGroup>
                <FormLabel>{t('allProducts.myItem', { defaultValue: 'My item' })} *</FormLabel>
                <SearchableSelect
                  options={myItems.map(i => ({ value: i.id, label: i.name, subLabel: i.unit || undefined }))}
                  value={linkTarget}
                  onChange={(v) => { setLinkTarget(v == null ? null : Number(v)); setLinkConv({ value: '', touched: false }); }}
                  placeholder={t('allProducts.pickItem', { defaultValue: 'Choose one of your items.' }) as string}
                />
              </FormGroup>
              {linkItem && (
                <FormGroup>
                  <FormLabel>{t('supplierDirectory:extProduct.stockConversion', { defaultValue: 'Stock conversion' })} *</FormLabel>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#0A2540' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>1 {sellerOrderUnitOf(specOf(stockModal.row), stockModal.row.unit)} =</span>
                    <FormInput type="number" step="0.0001" min="0" inputMode="decimal" value={convValue}
                      onChange={(e) => setLinkConv({ value: e.target.value, touched: true })} style={{ maxWidth: 140 }} />
                    <span style={{ whiteSpace: 'nowrap' }}>{linkItem.unit || ''}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>
                    {t('supplierDirectory:extProduct.stockConversionHint', { defaultValue: 'How much of your stock unit is added when one package is received.' })}
                  </div>
                </FormGroup>
              )}
            </>
          )}
        </Modal>
      )}
      {deleting && deleting.supplier && (
        <DeleteSupplierProductFlow
          supplierId={deleting.supplier.id}
          product={{ id: deleting.id, name: deleting.name }}
          scopeUrl={S}
          onClose={() => setDeleting(null)}
          onDeleted={() => { fetchRows(); fetchMyItems(); }}
        />
      )}
    </div>
  );
}
