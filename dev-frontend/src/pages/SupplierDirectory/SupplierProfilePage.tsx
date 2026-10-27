import React, { useState, useEffect, useCallback, useMemo } from 'react';
import OrderScheduleEditor from '../../components/Common/OrderScheduleEditor';
import type { OrderSchedule, OrderRule } from '../../utils/orderCutoff';
import { sellerSpecText, sellerOrderUnitOf } from '../../utils/unitConversion';
import ExternalSupplierProductFields, { EMPTY_EXT_PRODUCT, extProductFormFrom, extProductPayload, extProductError, type ExtProductForm } from '../../components/Common/ExternalSupplierProductFields';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormTextArea, FormInput, FormSelect
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DeleteSupplierProductFlow from '../Suppliers/DeleteSupplierProductFlow';
import { useAuth } from '../../contexts/AuthContext';
import { ownerSupplierActingRid, withOwnerSupplierScope } from '../../utils/ownerPoScope';
import { getAuthToken } from '../../utils/auth';
import { formatAddress, AppLocale } from '../../utils/formatAddress';
import { formatCurrency } from '../../utils/currency';
import DeliveryTermsText from '../../components/Common/DeliveryTermsText';

interface ProductRow {
  id: number;
  name: string;
  sku?: string | null;
  unit?: string | null;
  base_quantity?: number | string | null;   // 취급 기준숫자(용량) — «10 kg/BOX» 의 10
  package_unit?: string | null;             // 기준단위(포장) — «10 kg/BOX» 의 BOX
  order_mode?: string | null;               // 무게 주문(measure)이면 kg 자체가 수량 단위
  unit_price: number;
  min_order_quantity?: number | null;
  lead_time_days?: number | null;
  category_id?: number | null;
  category_name?: string | null;
  image_url?: string | null;
  currency?: string | null;
}

interface ProductCategory {
  id: number;
  name: string;
  emoji?: string | null;
}

interface SupplierProfile {
  id: number;
  name: string;
  company_name?: string | null;
  description?: string | null;
  public_description?: string | null;
  logo_url?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  category_names?: string[] | null;
  products?: ProductRow[];
  product_categories?: ProductCategory[];
  products_meta?: { total: number; shown: number; truncated: boolean } | null;
  currency?: string | null;
  min_order_amount?: number | string | null;
  delivery_fee?: number | string | null;
  order_schedule?: OrderSchedule | null;
  is_system_registered?: boolean;
  registered_by_entity_type?: string | null;
  registered_by_entity_id?: number | null;
  my_contract?: {
    id?: number | null;
    status: 'none' | 'requested' | 'active' | 'rejected' | 'terminated';
  };
}

const Subtitle = styled.div`
  color: #4B5563;
  font-size: 14px;
  margin-top: 4px;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 12px;
  &:hover { text-decoration: underline; }
`;

const HeroCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeroLogo = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 12px;
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  color: #4B5563;
  flex-shrink: 0;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const HeroBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const HeroName = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
`;

const HeroSub = styled.div`
  font-size: 14px;
  color: #4B5563;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 12px;
  background: #EEF2FF;
  color: #3730A3;
  padding: 3px 10px;
  border-radius: 999px;
`;

const HeroAction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;

  @media (max-width: 640px) {
    align-items: stretch;
  }
`;

const Badge = styled.span<{ variant?: 'success' | 'warning' | 'neutral' | 'danger' }>`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${(p) => {
    switch (p.variant) {
      case 'success': return '#DCFCE7';
      case 'warning': return '#FEF3C7';
      case 'danger': return '#FEE2E2';
      default: return '#F1F4F8';
    }
  }};
  color: ${(p) => {
    switch (p.variant) {
      case 'success': return '#166534';
      case 'warning': return '#92400E';
      case 'danger': return '#991B1B';
      default: return '#1F2937';
    }
  }};
`;

const Section = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 14px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const InfoValue = styled.span`
  color: #0A2540;
  word-break: break-word;
`;

const Description = styled.p`
  font-size: 14px;
  color: #1F2937;
  line-height: 1.6;
  margin: 0 0 14px;
  white-space: pre-wrap;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
`;

const ProductCard = styled.div`
  border: 1px solid #C7CED6;
  border-radius: 10px;
  background: #F9FAFB;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProductImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  overflow: hidden;
  margin-bottom: 4px;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  line-height: 1.3;
`;

const ProductMeta = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
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

const InfoBox = styled.div`
  padding: 12px 16px;
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 13px;
  color: #1F2937;
  margin-bottom: 14px;
`;

const EmptyBox = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #4B5563;
  font-size: 14px;
`;

function initialsOf(name: string | null | undefined): string {
  if (!name) return '?';
  return name.split(/\s+/).slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('') || '?';
}

const SupplierProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation(['supplierDirectory', 'common']);
  const { supplierId } = useParams<{ supplierId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  // 오너가 공급업체 화면에서 소유 매장을 골랐으면 이 프로필도 그 매장 자격으로 연다(2026-10-22 §3-E — 범위는 탭 저장값을 이어받는다)
  const actingRid = ownerSupplierActingRid(user?.role);
  const scopeRole = user?.role;
  const S = useCallback((url: string) => withOwnerSupplierScope(url, scopeRole), [scopeRole]);

  const locale = (i18n.language?.split('-')[0] as AppLocale) || 'en';

  const [profile, setProfile] = useState<SupplierProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // 외부 업체 «청구 방식» — 건별 / 월별 정산서 (2026-10-07 Fable 판정 ⑩, 그 구매자 계약 기준)
  const [billing, setBilling] = useState<{ invoice_cycle: 'immediate' | 'monthly_soa'; soa_issue_day: number | null; payment_due_day: number | null } | null>(null);
  const [billingOpen, setBillingOpen] = useState(false);
  const [billingForm, setBillingForm] = useState<{ invoice_cycle: 'immediate' | 'monthly_soa'; soa_issue_day: string; payment_due_day: string }>({ invoice_cycle: 'immediate', soa_issue_day: '1', payment_due_day: '15' });
  const [billingSaving, setBillingSaving] = useState(false);
  const [billingError, setBillingError] = useState<string | null>(null);

  // 외부 업체 «배송 조건» — 무료배송 기준 · 그 미만 고정 배송비 (2026-10-19 Irene «외부공급업체 등록 시에도 적용되어야»)
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [deliveryForm, setDeliveryForm] = useState<{ min_order_amount: string; delivery_fee: string }>({ min_order_amount: '', delivery_fee: '' });
  const [deliverySaving, setDeliverySaving] = useState(false);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);

  const [requestOpen, setRequestOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!supplierId) return;
    setLoading(true);
    setLoadError(null);
    try {
      const token = getAuthToken();
      const res = await fetch(S(`/api/supplier-directory/${supplierId}`), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoadError(data?.message || t('profile.loadFailed'));
        setProfile(null);
        return;
      }
      // Backend 응답 shape: { data: { supplier, products, categories, my_contract } }
      // → SupplierProfile interface(평탄)로 변환
      const d = data.data;
      if (!d?.supplier) {
        setLoadError(t('profile.loadFailed') as string);
        setProfile(null);
        return;
      }
      const cats: ProductCategory[] = Array.isArray(d.categories) ? d.categories : [];
      const flattened: SupplierProfile = {
        ...d.supplier,
        products: Array.isArray(d.products) ? d.products : [],
        products_meta: d.products_meta || null,
        product_categories: cats,
        category_names: cats.map((c: ProductCategory) => c.name).filter(Boolean),
        my_contract: d.my_contract || { status: 'none' }
      };
      setProfile(flattened);
      setBilling(d.billing || null);
    } catch (err) {
      console.error('Failed to fetch supplier profile:', err);
      setLoadError(t('profile.loadFailed') as string);
    } finally {
      setLoading(false);
    }
  }, [supplierId, t, S]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const filteredProducts = useMemo(() => {
    if (!profile?.products) return [];
    const term = productSearch.trim().toLowerCase();
    return profile.products.filter(p => {
      if (productCategoryFilter !== 'all' && String(p.category_id ?? '') !== productCategoryFilter) {
        return false;
      }
      if (term) {
        const hay = `${p.name || ''} ${p.sku || ''}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [profile, productSearch, productCategoryFilter]);

  const myStatus = profile?.my_contract?.status || 'none';
  const canRequest = myStatus === 'none' || myStatus === 'rejected' || myStatus === 'terminated';

  const buyerEntity = useMemo(() => {
    if (!user) return { type: '', name: '' };
    if (user.role === 'Brand General' || user.role === 'Brand Manager') {
      return { type: 'brand', name: '' };
    }
    if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') {
      return { type: 'foodcourt', name: '' };
    }
    // 소속 매장 없는 오너 = 오너 자기 이름으로 업체를 등록·관리(소유 매장들이 같이 씀, 2026-09-24 §H-3)
    if (user.role === 'Restaurant Owner' && !user.restaurantId && !actingRid) {
      return { type: 'owner', name: '' };
    }
    if (user.role === 'Restaurant Admin' || user.role === 'Restaurant Owner' || user.role === 'Staff') {
      return { type: 'restaurant', name: '' };
    }
    return { type: '', name: '' };
  }, [user, actingRid]);

  // 내 entity id (소유 외부공급업체 판별용). RA=restaurantId / BG=brand_id / FG=foodcourt_id
  const myEntityId = useMemo<number | null>(() => {
    if (!user) return null;
    if (user.role === 'Brand General' || user.role === 'Brand Manager') return (user as any).brand_id ?? null;
    if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') return (user as any).foodcourt_id ?? null;
    if (user.role === 'Restaurant Owner' && actingRid) return actingRid;
    if (user.role === 'Restaurant Owner' && !user.restaurantId) return user.id != null ? Number(user.id) : null;
    return user.restaurantId ? Number(user.restaurantId) : null;
  }, [user, actingRid]);

  // "내가 등록한 외부공급업체" 일 때만 상품 등록/수정/삭제 UI 노출. 플랫폼 가입 공급업체 카탈로그는 못 건드림.
  const isOwnedExternal = !!profile && profile.is_system_registered === false
    && profile.registered_by_entity_type === buyerEntity.type
    && myEntityId != null && Number(profile.registered_by_entity_id) === Number(myEntityId);

  // 2026-10-15 Fable D1: 칸은 공용 부품 ExternalSupplierProductFields(SKU·주문방식·다섯 칸) — 재고에서 여는 창·All Products 탭과 같다.
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);
  const [productForm, setProductForm] = useState<ExtProductForm>(EMPTY_EXT_PRODUCT);
  const [savingProduct, setSavingProduct] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<ProductRow | null>(null);

  const openBilling = () => {
    setBillingError(null);
    setBillingForm({
      invoice_cycle: billing?.invoice_cycle === 'monthly_soa' ? 'monthly_soa' : 'immediate',
      soa_issue_day: String(billing?.soa_issue_day || 1),
      payment_due_day: String(billing?.payment_due_day || 15),
    });
    setBillingOpen(true);
  };
  const numOrNull = (v: unknown) => (v === null || v === undefined || v === '' ? null : Number(v));
  const openDelivery = () => {
    setDeliveryError(null);
    setDeliveryForm({
      min_order_amount: profile?.min_order_amount != null ? String(Number(profile.min_order_amount)) : '',
      delivery_fee: profile?.delivery_fee != null ? String(Number(profile.delivery_fee)) : '',
    });
    setDeliveryOpen(true);
  };
  const saveDelivery = async () => {
    if (!profile) return;
    setDeliverySaving(true); setDeliveryError(null);
    try {
      const res = await fetch(S(`/api/external-suppliers/${profile.id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({
          min_order_amount: deliveryForm.min_order_amount === '' ? null : deliveryForm.min_order_amount,
          delivery_fee: deliveryForm.delivery_fee === '' ? null : deliveryForm.delivery_fee,
        }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setDeliveryError(j?.message || (t('billing.saveFailed', { defaultValue: 'Could not save. Please try again.' }) as string)); return; }
      setProfile(p => p ? { ...p, min_order_amount: j.data?.min_order_amount ?? null, delivery_fee: j.data?.delivery_fee ?? null } : p);
      setDeliveryOpen(false);
    } catch {
      setDeliveryError(t('billing.saveFailed', { defaultValue: 'Could not save. Please try again.' }) as string);
    } finally { setDeliverySaving(false); }
  };
  // 발주 마감·배송일 (2026-10-27 Fable) — 외부 업체는 등록한 쪽이 적는다(바로 저장 · 검사·시간대는 서버)
  const saveOrderSchedule = async (schedule: { rules: OrderRule[] } | null): Promise<OrderSchedule | null> => {
    if (!profile) return null;
    const res = await fetch(S(`/api/external-suppliers/${profile.id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
      body: JSON.stringify({ order_schedule: schedule }),
    });
    const j = await res.json().catch(() => null);
    if (!res.ok || !j?.success) throw new Error(j?.message || 'Failed to save');
    const saved = (j.data?.order_schedule ?? null) as OrderSchedule | null;
    setProfile(p => p ? { ...p, order_schedule: saved } : p);
    return saved;
  };
  const saveBilling = async () => {
    if (!profile) return;
    const day = (v: string) => { const n = parseInt(v, 10); return Number.isInteger(n) && n >= 1 && n <= 28 ? n : NaN; };
    const monthly = billingForm.invoice_cycle === 'monthly_soa';
    if (monthly && (Number.isNaN(day(billingForm.soa_issue_day)) || Number.isNaN(day(billingForm.payment_due_day)))) {
      setBillingError(t('billing.dayRange', { defaultValue: 'Days must be between 1 and 28.' }) as string);
      return;
    }
    setBillingSaving(true); setBillingError(null);
    try {
      const res = await fetch(S(`/api/external-suppliers/${profile.id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ billing: monthly
          ? { invoice_cycle: 'monthly_soa', soa_issue_day: day(billingForm.soa_issue_day), payment_due_day: day(billingForm.payment_due_day) }
          : { invoice_cycle: 'immediate' } }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setBillingError(j?.message || (t('billing.saveFailed', { defaultValue: 'Could not save. Please try again.' }) as string)); return; }
      setBilling(j.data?.billing || null);
      setBillingOpen(false);
    } catch {
      setBillingError(t('billing.saveFailed', { defaultValue: 'Could not save. Please try again.' }) as string);
    } finally { setBillingSaving(false); }
  };

  const openAddProduct = () => { setEditingProduct(null); setProductForm(EMPTY_EXT_PRODUCT); setProductError(null); setShowProductModal(true); };
  // 수정 창은 저장된 값 그대로 연다 — 전엔 리드타임을 빈 칸으로 열어 저장하면 0 으로 덮였다(2026-10-15)
  const openEditProduct = (p: ProductRow) => {
    setEditingProduct(p);
    setProductForm(extProductFormFrom(p));
    setProductError(null); setShowProductModal(true);
  };

  const saveProduct = async () => {
    if (!profile) return;
    setProductError(null);
    const invalid = extProductError(productForm, t as any);
    if (invalid) { setProductError(invalid); return; }
    setSavingProduct(true);
    const payload = extProductPayload(productForm);
    try {
      const token = getAuthToken();
      const url = editingProduct
        ? `/api/external-suppliers/${profile.id}/products/${editingProduct.id}`
        : `/api/external-suppliers/${profile.id}/products`;
      const res = await fetch(S(url), {
        method: editingProduct ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) { setShowProductModal(false); fetchProfile(); }
      else setProductError(data?.message || (t('extProduct.saveFailed', { defaultValue: 'Failed to save product.' }) as string));
    } catch { setProductError(t('extProduct.saveFailed', { defaultValue: 'Failed to save product.' }) as string); }
    finally { setSavingProduct(false); }
  };

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestSubmitting || !profile) return;
    setRequestError(null);
    setRequestSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch(S('/api/supplier-contracts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          supplier_company_id: profile.id,
          message: requestMessage.trim() || null
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        const code = data?.code;
        if (code === 'CONTRACT_ALREADY_ACTIVE') {
          setRequestError(t('request.alreadyActive') as string);
        } else if (code === 'CONTRACT_REQUEST_PENDING') {
          setRequestError(t('request.alreadyPending') as string);
        } else {
          setRequestError(data?.message || (t('request.submitFailed') as string));
        }
        return;
      }
      setRequestOpen(false);
      setRequestMessage('');
      await fetchProfile();
    } catch (err) {
      console.error('submit request error:', err);
      setRequestError(t('request.submitFailed') as string);
    } finally {
      setRequestSubmitting(false);
    }
  };

  const renderActionArea = () => {
    if (!profile) return null;
    // 외부업체(솔루션 미가입) — 계약이라는 개념이 없다. 등록 시 만들어지는 auto-contract 는
    // 발주를 열어주기 위한 내부 장치일 뿐이라 "Contract Active" 로 보이면 안 된다. (Irene 2026-07-12)
    if (profile.is_system_registered === false) {
      return <Badge variant="neutral">{t('profile.externalSupplier', 'External supplier')}</Badge>;
    }
    if (myStatus === 'active') {
      const id = profile.my_contract?.id;
      return (
        <>
          <Badge variant="success">{t('profile.contractActive')}</Badge>
          {id && (
            <ThemedButton
              size="small"
              variant="outline"
              onClick={() => navigate(`/pos/suppliers/contracts/${id}`)}
            >
              {t('profile.viewContract')}
            </ThemedButton>
          )}
        </>
      );
    }
    if (myStatus === 'requested') {
      return <Badge variant="warning">{t('profile.pendingReview')}</Badge>;
    }
    if (canRequest) {
      const label = myStatus === 'rejected' || myStatus === 'terminated'
        ? t('profile.requestAgain')
        : t('profile.requestContract');
      return (
        <ThemedButton
          variant="primary"
          onClick={() => { setRequestMessage(''); setRequestError(null); setRequestOpen(true); }}
        >
          {label}
        </ThemedButton>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Container>
        <Content>
          <BackLink onClick={() => navigate('/pos/suppliers/directory')}>← {t('profile.back')}</BackLink>
          <InfoBox>{t('directory.loading')}</InfoBox>
        </Content>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
        <Content>
          <BackLink onClick={() => navigate('/pos/suppliers/directory')}>← {t('profile.back')}</BackLink>
          <ErrorBox>{loadError || t('profile.loadFailed')}</ErrorBox>
        </Content>
      </Container>
    );
  }

  const cityState = [profile.city, profile.state].filter(Boolean).join(', ');
  const addressString = formatAddress({
    address: profile.address,
    address_line_2: profile.address_line_2,
    city: profile.city,
    state: profile.state,
    postal_code: profile.postal_code,
    country: profile.country
  }, 'full', locale);

  return (
    <Container>
      <Header>
        <div>
          <BackLink onClick={() => navigate('/pos/suppliers/directory')}>← {t('profile.back')}</BackLink>
          <Title>{profile.name}</Title>
          {profile.company_name && profile.company_name !== profile.name && (
            <Subtitle>{profile.company_name}</Subtitle>
          )}
        </div>
      </Header>

      <Content>
        <HeroCard>
          <HeroLogo>
            {profile.logo_url ? <img src={profile.logo_url} alt={profile.name} /> : initialsOf(profile.name)}
          </HeroLogo>
          <HeroBody>
            <HeroName>{profile.name}</HeroName>
            {cityState && <HeroSub>{cityState}</HeroSub>}
            {Array.isArray(profile.category_names) && profile.category_names.length > 0 && (
              <TagRow>
                {profile.category_names.map((c, i) => <Tag key={i}>{c}</Tag>)}
              </TagRow>
            )}
          </HeroBody>
          <HeroAction>
            {renderActionArea()}
          </HeroAction>
        </HeroCard>

        <Section>
          <SectionTitle>{t('profile.about')}</SectionTitle>
          {(profile.public_description || profile.description) && (
            <Description>{profile.public_description || profile.description}</Description>
          )}
          <InfoGrid>
            {profile.email && (
              <InfoItem>
                <InfoLabel>{t('profile.contact')}</InfoLabel>
                <InfoValue>{profile.email}</InfoValue>
              </InfoItem>
            )}
            {profile.phone && (
              <InfoItem>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>{profile.phone}</InfoValue>
              </InfoItem>
            )}
            {profile.website && (
              <InfoItem>
                <InfoLabel>Website</InfoLabel>
                <InfoValue>
                  <a href={profile.website} target="_blank" rel="noreferrer noopener" style={{ color: '#635BFF' }}>
                    {profile.website}
                  </a>
                </InfoValue>
              </InfoItem>
            )}
            {addressString && (
              <InfoItem>
                <InfoLabel>{t('profile.address')}</InfoLabel>
                <InfoValue>{addressString}</InfoValue>
              </InfoItem>
            )}
          </InfoGrid>
        </Section>

        {isOwnedExternal && buyerEntity.type !== 'owner' && (
          <Section>
            <SectionTitle>{t('billing.title', { defaultValue: 'Billing' })}</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 14, color: '#0A2540', flex: 1, minWidth: 220 }}>
                {billing?.invoice_cycle === 'monthly_soa'
                  ? t('billing.monthlyLine', { defaultValue: 'Monthly statement — issued on day {{issue}} of each month, due on day {{due}}', issue: billing.soa_issue_day, due: billing.payment_due_day })
                  : t('billing.immediateLine', { defaultValue: 'Per invoice — each delivery invoice is marked paid on its own' })}
              </div>
              <ThemedButton variant="secondary" onClick={openBilling}>{t('common:button.edit', { defaultValue: 'Edit' })}</ThemedButton>
            </div>
            {billing?.invoice_cycle === 'monthly_soa' && (
              <div style={{ fontSize: 12, color: '#4B5563', marginTop: 8 }}>
                {t('billing.monthlyHint', { defaultValue: "This supplier's invoices are bundled into one statement each month. Mark the statement paid once — single invoices can't be paid one by one." })}
              </div>
            )}
          </Section>
        )}

        {isOwnedExternal && (
          <Section>
            <SectionTitle>{t('delivery.title', { defaultValue: 'Delivery' })}</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 14, color: '#0A2540', flex: 1, minWidth: 220 }}>
                <DeliveryTermsText terms={{ min_order_amount: numOrNull(profile.min_order_amount), delivery_fee: numOrNull(profile.delivery_fee), currency: profile.currency || undefined }} />
              </div>
              <ThemedButton variant="secondary" onClick={openDelivery}>{t('common:button.edit', { defaultValue: 'Edit' })}</ThemedButton>
            </div>
            <OrderScheduleEditor value={profile.order_schedule || null} onCommit={saveOrderSchedule} />
          </Section>
        )}

        {!isOwnedExternal && profile.order_schedule && (
          <Section>
            <OrderScheduleEditor value={profile.order_schedule} readOnly />
          </Section>
        )}

        <Section>
          <SectionTitle>{t('profile.catalog')}</SectionTitle>
          {isOwnedExternal && (
            <InfoBox>{t('extProduct.hint', { defaultValue: "This is an external supplier you registered. Add the products you buy from them — they'll be orderable from your stock items." })}</InfoBox>
          )}
          <FilterBar>
            <SearchInput
              type="text"
              placeholder={t('profile.searchProducts') as string}
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            {Array.isArray(profile.product_categories) && profile.product_categories.length > 0 && (
              <FilterSelect
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
              >
                <option value="all">{t('directory.allCategories')}</option>
                {profile.product_categories.map(c => (
                  <option key={c.id} value={String(c.id)}>
                    {c.emoji ? `${c.emoji} ` : ''}{c.name}
                  </option>
                ))}
              </FilterSelect>
            )}
            {isOwnedExternal && (
              <ThemedButton variant="primary" onClick={openAddProduct} style={{ marginLeft: 'auto' }}>
                {t('extProduct.add', { defaultValue: 'Add Product' })}
              </ThemedButton>
            )}
          </FilterBar>

          {profile.products_meta?.truncated && (
            <InfoBox>{t('profile.truncated', { defaultValue: 'Showing {{shown}} of {{total}} products — search to narrow down.', shown: profile.products_meta.shown, total: profile.products_meta.total })}</InfoBox>
          )}
          {filteredProducts.length === 0 ? (
            <EmptyBox>
              {t('profile.noProducts')}
              {isOwnedExternal && (
                <div style={{ marginTop: 12 }}>
                  <ThemedButton variant="primary" onClick={openAddProduct}>{t('extProduct.add', { defaultValue: 'Add Product' })}</ThemedButton>
                </div>
              )}
            </EmptyBox>
          ) : (
            <ProductGrid>
              {filteredProducts.map(p => (
                <ProductCard key={p.id}>
                  <ProductImage>
                    {p.image_url ? <img src={p.image_url} alt={p.name} /> : <span style={{ fontSize: 11, color: '#6B7280', letterSpacing: 0.4, textTransform: 'uppercase' }}>{t('profile.noImage', 'No image')}</span>}
                  </ProductImage>
                  <ProductName>{p.name}</ProductName>
                  {p.sku && <ProductMeta>SKU: {p.sku}</ProductMeta>}
                  <ProductPrice>
                    {formatCurrency(Number(p.unit_price) || 0, p.currency || profile.currency || 'MYR')}
                    {p.unit && ` /${sellerOrderUnitOf({ seller_unit: p.unit, base_quantity: p.base_quantity, seller_package_unit: p.package_unit, order_mode: p.order_mode })}`}
                  </ProductPrice>
                  {/* 규격 한 줄 «10 kg/BOX» (2026-09-11 Irene 「1kg/pack 이런식으로」) */}
                  {sellerSpecText({ seller_unit: p.unit, base_quantity: p.base_quantity, seller_package_unit: p.package_unit, order_mode: p.order_mode }) && (
                    <ProductMeta>{sellerSpecText({ seller_unit: p.unit, base_quantity: p.base_quantity, seller_package_unit: p.package_unit, order_mode: p.order_mode })}</ProductMeta>
                  )}
                  {p.min_order_quantity != null && Number(p.min_order_quantity) > 0 && (
                    <ProductMeta>{t('profile.moq', { n: Number(p.min_order_quantity) })}</ProductMeta>
                  )}
                  {isOwnedExternal && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 8 }}>
                      <ThemedButton size="small" variant="outline" onClick={() => openEditProduct(p)} style={{ flex: 1 }}>{t('common:button.edit', { defaultValue: 'Edit' })}</ThemedButton>
                      <ThemedButton size="small" variant="outline" onClick={() => setDeletingProduct(p)} style={{ flex: 1 }}>{t('common:button.delete', { defaultValue: 'Delete' })}</ThemedButton>
                    </div>
                  )}
                </ProductCard>
              ))}
            </ProductGrid>
          )}
        </Section>
      </Content>

      <CommonModal
        isOpen={requestOpen}
        onClose={() => !requestSubmitting && setRequestOpen(false)}
        title={t('request.modalTitle') as string}
        footer={
          <>
            <ModalButton type="button" onClick={() => setRequestOpen(false)} disabled={requestSubmitting}>
              {t('common.cancel')}
            </ModalButton>
            <ModalButton
              type="submit"
              form="request-contract-form"
              variant="primary"
              disabled={requestSubmitting}
            >
              {requestSubmitting ? t('common.submitting') : t('request.submit')}
            </ModalButton>
          </>
        }
      >
        <form id="request-contract-form" onSubmit={submitRequest}>
          <UIFormGroup>
            <FormLabel>{t('request.supplierLabel')}</FormLabel>
            <FormInput type="text" value={profile.name} disabled />
          </UIFormGroup>
          <UIFormGroup>
            <FormLabel>{t('request.messageLabel')}</FormLabel>
            <FormTextArea
              rows={4}
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder={t('request.messagePlaceholder') as string}
              maxLength={1000}
            />
          </UIFormGroup>
          {buyerEntity.type && (
            <InfoBox>
              <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 4 }}>
                {t('request.yourCompany')}
              </div>
              <div>
                <strong>{t(`request.entityType.${buyerEntity.type}`)}</strong>
              </div>
            </InfoBox>
          )}
          {requestError && <ErrorBox>{requestError}</ErrorBox>}
        </form>
      </CommonModal>

      {/* 외부 업체 «청구 방식» (2026-10-07 ⑩) */}
      {billingOpen && (
        <CommonModal
          isOpen
          onClose={() => setBillingOpen(false)}
          title={t('billing.editTitle', { defaultValue: 'Billing method' }) as string}
          size="small"
          footer={<>
            <ModalButton variant="secondary" onClick={() => setBillingOpen(false)}>{t('common:button.cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="primary" disabled={billingSaving} onClick={saveBilling}>{billingSaving ? '…' : t('common:button.save', { defaultValue: 'Save' })}</ModalButton>
          </>}
        >
          {billingError && <ErrorBox style={{ marginTop: 0, marginBottom: 12 }}>{billingError}</ErrorBox>}
          <UIFormGroup>
            <FormLabel>{t('billing.cycle', { defaultValue: 'How this supplier bills you' })}</FormLabel>
            <FormSelect value={billingForm.invoice_cycle} onChange={(e) => setBillingForm({ ...billingForm, invoice_cycle: e.target.value as 'immediate' | 'monthly_soa' })}>
              <option value="immediate">{t('billing.immediate', { defaultValue: 'Per invoice' })}</option>
              <option value="monthly_soa">{t('billing.monthly', { defaultValue: 'Monthly statement (SOA)' })}</option>
            </FormSelect>
          </UIFormGroup>
          {billingForm.invoice_cycle === 'monthly_soa' && (
            <div style={{ display: 'flex', gap: 12 }}>
              <UIFormGroup style={{ flex: 1 }}>
                <FormLabel>{t('billing.issueDay', { defaultValue: 'Statement day (each month)' })}</FormLabel>
                <FormInput type="number" min="1" max="28" value={billingForm.soa_issue_day} onChange={(e) => setBillingForm({ ...billingForm, soa_issue_day: e.target.value })} />
              </UIFormGroup>
              <UIFormGroup style={{ flex: 1 }}>
                <FormLabel>{t('billing.dueDay', { defaultValue: 'Payment due day (each month)' })}</FormLabel>
                <FormInput type="number" min="1" max="28" value={billingForm.payment_due_day} onChange={(e) => setBillingForm({ ...billingForm, payment_due_day: e.target.value })} />
              </UIFormGroup>
            </div>
          )}
          <InfoBox>
            {billingForm.invoice_cycle === 'monthly_soa'
              ? t('billing.monthlyExplain', { defaultValue: 'On the statement day, all unpaid invoices from this supplier are bundled into one statement. Attach the SOA the supplier sends, check the difference, then mark the statement paid once.' })
              : t('billing.immediateExplain', { defaultValue: 'Each delivery invoice is marked paid on its own.' })}
          </InfoBox>
        </CommonModal>
      )}

      {/* 외부 업체 «배송 조건» (2026-10-19) — 발주 총액 계산(computeTotalsWithDelivery)이 이 두 칸을 그대로 읽는다 */}
      {deliveryOpen && (
        <CommonModal
          isOpen
          onClose={() => setDeliveryOpen(false)}
          title={t('delivery.editTitle', { defaultValue: 'Delivery terms' }) as string}
          size="small"
          footer={<>
            <ModalButton variant="secondary" onClick={() => setDeliveryOpen(false)}>{t('common:button.cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="primary" disabled={deliverySaving} onClick={saveDelivery}>{deliverySaving ? '…' : t('common:button.save', { defaultValue: 'Save' })}</ModalButton>
          </>}
        >
          {deliveryError && <ErrorBox style={{ marginTop: 0, marginBottom: 12 }}>{deliveryError}</ErrorBox>}
          <div style={{ display: 'flex', gap: 12 }}>
            <UIFormGroup style={{ flex: 1 }}>
              <FormLabel>{t('externalSupplier.freeDeliveryAbove', { defaultValue: 'Free delivery at or above this amount' })}</FormLabel>
              <FormInput type="number" min="0" step="0.01" value={deliveryForm.min_order_amount} onChange={(e) => setDeliveryForm({ ...deliveryForm, min_order_amount: e.target.value })} placeholder="300" />
            </UIFormGroup>
            <UIFormGroup style={{ flex: 1 }}>
              <FormLabel>{t('externalSupplier.deliveryFee', { defaultValue: 'Delivery fee below that (fixed)' })}</FormLabel>
              <FormInput type="number" min="0" step="0.01" value={deliveryForm.delivery_fee} onChange={(e) => setDeliveryForm({ ...deliveryForm, delivery_fee: e.target.value })} placeholder="15" />
            </UIFormGroup>
          </div>
          <InfoBox>
            <DeliveryTermsText terms={{ min_order_amount: numOrNull(deliveryForm.min_order_amount), delivery_fee: numOrNull(deliveryForm.delivery_fee), currency: profile?.currency || undefined }} />
          </InfoBox>
        </CommonModal>
      )}

      {/* 외부공급업체 상품 등록/수정 */}
      {showProductModal && (
        <CommonModal
          isOpen
          onClose={() => setShowProductModal(false)}
          title={editingProduct ? t('extProduct.editTitle', { defaultValue: 'Edit Product' }) as string : t('extProduct.addTitle', { defaultValue: 'Add Product' }) as string}
          size="medium"
          footer={<>
            <ModalButton variant="secondary" onClick={() => setShowProductModal(false)}>{t('common:button.cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="primary" disabled={savingProduct} onClick={saveProduct}>{savingProduct ? '…' : t('common:button.save', { defaultValue: 'Save' })}</ModalButton>
          </>}
        >
          {productError && <ErrorBox style={{ marginTop: 0, marginBottom: 12 }}>{productError}</ErrorBox>}
          <ExternalSupplierProductFields value={productForm} onChange={setProductForm} idPrefix="profile-ext-product" />
        </CommonModal>
      )}

      {deletingProduct && profile && (
        // 연결된 재고아이템이 있으면 «다른 상품으로 바꾸고 삭제» 로 잇는다 — 전체 상품 탭과 같은 흐름 (2026-10-23 Fable D5).
        //   그전 doDeleteProduct 는 실패를 조용히 버렸고, 서버는 연결 검사 없이 지웠다.
        <DeleteSupplierProductFlow
          supplierId={profile.id}
          product={{ id: deletingProduct.id, name: deletingProduct.name }}
          scopeUrl={S}
          onClose={() => setDeletingProduct(null)}
          onDeleted={() => fetchProfile()}
        />
      )}
    </Container>
  );
};

export default SupplierProfilePage;
