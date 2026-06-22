import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import ConfirmModal from '../../components/ConfirmModal';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';
import { formatAddress, AppLocale } from '../../utils/formatAddress';
import { formatCurrency } from '../../utils/currency';

interface ProductRow {
  id: number;
  name: string;
  sku?: string | null;
  unit?: string | null;
  unit_price: number;
  min_order_quantity?: number | null;
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
  currency?: string | null;
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

  const locale = (i18n.language?.split('-')[0] as AppLocale) || 'en';

  const [profile, setProfile] = useState<SupplierProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

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
      const res = await fetch(`/api/supplier-directory/${supplierId}`, {
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
        product_categories: cats,
        category_names: cats.map((c: ProductCategory) => c.name).filter(Boolean),
        my_contract: d.my_contract || { status: 'none' }
      };
      setProfile(flattened);
    } catch (err) {
      console.error('Failed to fetch supplier profile:', err);
      setLoadError(t('profile.loadFailed') as string);
    } finally {
      setLoading(false);
    }
  }, [supplierId, t]);

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
    if (user.role === 'Restaurant Admin' || user.role === 'Restaurant Owner' || user.role === 'Staff') {
      return { type: 'restaurant', name: '' };
    }
    return { type: '', name: '' };
  }, [user]);

  // 내 entity id (소유 외부공급업체 판별용). RA=restaurantId / BG=brand_id / FG=foodcourt_id
  const myEntityId = useMemo<number | null>(() => {
    if (!user) return null;
    if (user.role === 'Brand General' || user.role === 'Brand Manager') return (user as any).brand_id ?? null;
    if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') return (user as any).foodcourt_id ?? null;
    return user.restaurantId ? Number(user.restaurantId) : null;
  }, [user]);

  // "내가 등록한 외부공급업체" 일 때만 상품 등록/수정/삭제 UI 노출. 플랫폼 가입 공급업체 카탈로그는 못 건드림.
  const isOwnedExternal = !!profile && profile.is_system_registered === false
    && profile.registered_by_entity_type === buyerEntity.type
    && myEntityId != null && Number(profile.registered_by_entity_id) === Number(myEntityId);

  const EMPTY_PRODUCT = { name: '', unit: 'kg', unit_price: '', min_order_quantity: '', lead_time_days: '' };
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);
  const [productForm, setProductForm] = useState<{ name: string; unit: string; unit_price: string; min_order_quantity: string; lead_time_days: string }>(EMPTY_PRODUCT);
  const [savingProduct, setSavingProduct] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<ProductRow | null>(null);

  const openAddProduct = () => { setEditingProduct(null); setProductForm(EMPTY_PRODUCT); setProductError(null); setShowProductModal(true); };
  const openEditProduct = (p: ProductRow) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name || '', unit: p.unit || 'kg', unit_price: String(p.unit_price ?? ''),
      min_order_quantity: p.min_order_quantity != null ? String(p.min_order_quantity) : '',
      lead_time_days: ''
    });
    setProductError(null); setShowProductModal(true);
  };

  const saveProduct = async () => {
    if (!profile) return;
    setProductError(null);
    if (!productForm.name.trim()) { setProductError(t('extProduct.nameRequired', { defaultValue: 'Product name is required.' }) as string); return; }
    if (!productForm.unit_price || parseFloat(productForm.unit_price) < 0) { setProductError(t('extProduct.priceRequired', { defaultValue: 'Enter a valid price.' }) as string); return; }
    setSavingProduct(true);
    const payload = {
      name: productForm.name.trim(), unit: productForm.unit,
      unit_price: parseFloat(productForm.unit_price),
      min_order_quantity: productForm.min_order_quantity ? parseInt(productForm.min_order_quantity, 10) : 1,
      lead_time_days: productForm.lead_time_days ? parseInt(productForm.lead_time_days, 10) : 0
    };
    try {
      const token = getAuthToken();
      const url = editingProduct
        ? `/api/external-suppliers/${profile.id}/products/${editingProduct.id}`
        : `/api/external-suppliers/${profile.id}/products`;
      const res = await fetch(url, {
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

  const doDeleteProduct = async () => {
    if (!profile || !deletingProduct) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/external-suppliers/${profile.id}/products/${deletingProduct.id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) { setDeletingProduct(null); fetchProfile(); }
    } catch { /* noop */ }
  };

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestSubmitting || !profile) return;
    setRequestError(null);
    setRequestSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/supplier-contracts', {
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
                    {p.unit && ` /${p.unit}`}
                  </ProductPrice>
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

      {/* 외부공급업체 상품 등록/수정 */}
      {showProductModal && (
        <CommonModal
          isOpen
          onClose={() => setShowProductModal(false)}
          title={editingProduct ? t('extProduct.editTitle', { defaultValue: 'Edit Product' }) as string : t('extProduct.addTitle', { defaultValue: 'Add Product' }) as string}
          size="small"
          footer={<>
            <ModalButton variant="secondary" onClick={() => setShowProductModal(false)}>{t('common:button.cancel', { defaultValue: 'Cancel' })}</ModalButton>
            <ModalButton variant="primary" disabled={savingProduct} onClick={saveProduct}>{savingProduct ? '…' : t('common:button.save', { defaultValue: 'Save' })}</ModalButton>
          </>}
        >
          {productError && <ErrorBox style={{ marginTop: 0, marginBottom: 12 }}>{productError}</ErrorBox>}
          <UIFormGroup>
            <FormLabel>{t('extProduct.name', { defaultValue: 'Product name' })} *</FormLabel>
            <FormInput type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} placeholder={t('extProduct.namePlaceholder', { defaultValue: 'e.g. Chicken Breast' }) as string} />
          </UIFormGroup>
          <div style={{ display: 'flex', gap: 12 }}>
            <UIFormGroup style={{ flex: 1 }}>
              <FormLabel>{t('extProduct.unitPrice', { defaultValue: 'Unit price' })} *</FormLabel>
              <FormInput type="number" step="0.01" min="0" value={productForm.unit_price} onChange={(e) => setProductForm({ ...productForm, unit_price: e.target.value })} placeholder="0.00" />
            </UIFormGroup>
            <UIFormGroup style={{ flex: 1 }}>
              <FormLabel>{t('extProduct.unit', { defaultValue: 'Unit' })}</FormLabel>
              <FormSelect value={productForm.unit} onChange={(e) => setProductForm({ ...productForm, unit: e.target.value })}>
                {['kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'].map(u => <option key={u} value={u}>{u}</option>)}
              </FormSelect>
            </UIFormGroup>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <UIFormGroup style={{ flex: 1 }}>
              <FormLabel>{t('extProduct.moq', { defaultValue: 'Min. order qty' })}</FormLabel>
              <FormInput type="number" min="1" value={productForm.min_order_quantity} onChange={(e) => setProductForm({ ...productForm, min_order_quantity: e.target.value })} placeholder="1" />
            </UIFormGroup>
            <UIFormGroup style={{ flex: 1 }}>
              <FormLabel>{t('extProduct.leadTime', { defaultValue: 'Lead time (days)' })}</FormLabel>
              <FormInput type="number" min="0" value={productForm.lead_time_days} onChange={(e) => setProductForm({ ...productForm, lead_time_days: e.target.value })} placeholder="0" />
            </UIFormGroup>
          </div>
        </CommonModal>
      )}

      {deletingProduct && (
        <ConfirmModal
          isOpen
          title={t('extProduct.deleteTitle', { defaultValue: 'Delete product' }) as string}
          message={t('extProduct.deleteConfirm', { defaultValue: `Delete "${deletingProduct.name}"? This cannot be undone.`, name: deletingProduct.name }) as string}
          confirmText={t('common:button.delete', { defaultValue: 'Delete' }) as string}
          type="danger"
          onConfirm={doDeleteProduct}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </Container>
  );
};

export default SupplierProfilePage;
