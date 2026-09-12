/**
 * 주문용 상품 링크 — 보기 전용 공개 화면
 * 설계: docs/BUYER_FREE_TIER_DESIGN.md §5-6 (Irene 2026-09-12)
 *
 * 판매자(공급업체·브랜드)가 자기 링크를 아무에게나 보낼 수 있고, 받은 사람은
 * **로그인 없이 상품과 가격만** 본다. 주문은 무료 가입 뒤 발주 화면에서 한다.
 * ⛔ 이 화면에 장바구니·주문 버튼을 만들지 않는다 — «보여주기» 가 이 화면의 전부다.
 */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface ShopProduct {
  id: number;
  name: string;
  sku: string | null;
  unit: string | null;
  base_quantity: number;
  package_unit: string | null;
  unit_price: number;
  image_url: string | null;
  category_name: string | null;
}

interface ShopSeller {
  seller_type: 'supplier' | 'brand';
  name: string;
  logo_url: string | null;
  description: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  sales_access: 'contract_required' | 'open';
}

const Page = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
  padding: 0 0 64px;
`;

const Hero = styled.div`
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 32px 16px;
`;

const HeroInner = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Logo = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: white;
`;

const SellerName = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #111827;
`;

const SellerMeta = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: #6B7280;
`;

const CtaBar = styled.div`
  max-width: 1040px;
  margin: 16px auto 0;
  padding: 14px 16px;
  background: #EEF2FF;
  border: 1px solid #C7D2FE;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const CtaText = styled.span`
  font-size: 14px;
  color: #3730A3;
  line-height: 1.5;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  padding: 10px 18px;
  background: #635BFF;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;

  &:hover { background: #4F46E5; }
`;

const Wrap = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 24px 16px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 14px;
`;

const Thumb = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  max-width: 100%;
  object-fit: cover;
  border-radius: 8px;
  background: #F3F4F6;
  margin-bottom: 10px;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
`;

const Spec = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #6B7280;
`;

const Price = styled.div`
  margin-top: 8px;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const Notice = styled.div`
  padding: 48px 16px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`;

const ShopCatalogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('landing');
  const [seller, setSeller] = useState<ShopSeller | null>(null);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/public/shop/${encodeURIComponent(slug || '')}`);
        if (res.status === 404) { if (!cancelled) setNotFound(true); return; }
        const json = await res.json();
        if (cancelled) return;
        if (json?.success) {
          setSeller(json.data.seller);
          setProducts(json.data.products || []);
        } else {
          setNotFound(true);
        }
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) return <Page><Notice>{t('shop.loading', 'Loading...')}</Notice></Page>;
  if (notFound || !seller) return <Page><Notice>{t('shop.notFound', 'This link is no longer available.')}</Notice></Page>;

  const place = [seller.city, seller.state].filter(Boolean).join(', ');

  return (
    <Page>
      <Hero>
        <HeroInner>
          {seller.logo_url && <Logo src={seller.logo_url} alt="" />}
          <div>
            <SellerName>{seller.name}</SellerName>
            {(seller.description || place) && (
              <SellerMeta>{seller.description || place}</SellerMeta>
            )}
          </div>
        </HeroInner>
        <CtaBar>
          <CtaText>
            {seller.sales_access === 'open'
              ? t('shop.ctaOpen', 'Sign up free and you can order right away.')
              : t('shop.ctaContract', 'Sign up free, then request an account with this seller to order.')}
          </CtaText>
          <CtaButton to="/signup">{t('shop.ctaButton', 'Sign up free to order')}</CtaButton>
        </CtaBar>
      </Hero>

      <Wrap>
        {products.length === 0 ? (
          <Notice>{t('shop.empty', 'No products are listed yet.')}</Notice>
        ) : (
          <Grid>
            {products.map(p => (
              <Card key={`${seller.seller_type}-${p.id}`}>
                {p.image_url && <Thumb src={p.image_url} alt="" />}
                <ProductName>{p.name}</ProductName>
                <Spec>
                  {[
                    p.category_name,
                    p.package_unit && p.base_quantity
                      ? `${p.base_quantity} ${p.unit || ''}/${p.package_unit}`
                      : p.unit || null
                  ].filter(Boolean).join(' · ')}
                </Spec>
                <Price>{p.unit_price.toFixed(2)}</Price>
              </Card>
            ))}
          </Grid>
        )}
      </Wrap>
    </Page>
  );
};

export default ShopCatalogPage;
