import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  Modal as CommonModal, ModalButton,
  FormGroup as UIFormGroup, FormLabel, FormTextArea, FormInput
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
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
  my_contract?: {
    id?: number | null;
    status: 'none' | 'requested' | 'active' | 'rejected' | 'terminated';
  };
}

const Subtitle = styled.div`
  color: #6B7280;
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
  border: 1px solid #E6EBF1;
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
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  color: #6B7280;
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
  color: #6B7280;
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
      default: return '#F3F4F6';
    }
  }};
  color: ${(p) => {
    switch (p.variant) {
      case 'success': return '#166534';
      case 'warning': return '#92400E';
      case 'danger': return '#991B1B';
      default: return '#374151';
    }
  }};
`;

const Section = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
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
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const InfoValue = styled.span`
  color: #0A2540;
  word-break: break-word;
`;

const Description = styled.p`
  font-size: 14px;
  color: #374151;
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
  border: 1px solid #E6EBF1;
  border-radius: 10px;
  background: #FAFBFC;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProductImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 24px;
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
  color: #6B7280;
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
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  color: #374151;
  margin-bottom: 14px;
`;

const EmptyBox = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7280;
  font-size: 14px;
`;

function initialsOf(name: string): string {
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
      setProfile(data.data || null);
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
          </FilterBar>

          {filteredProducts.length === 0 ? (
            <EmptyBox>{t('profile.noProducts')}</EmptyBox>
          ) : (
            <ProductGrid>
              {filteredProducts.map(p => (
                <ProductCard key={p.id}>
                  <ProductImage>
                    {p.image_url ? <img src={p.image_url} alt={p.name} /> : '📦'}
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
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>
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
    </Container>
  );
};

export default SupplierProfilePage;
