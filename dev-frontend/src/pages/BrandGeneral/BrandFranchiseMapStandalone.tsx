import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI';
import BrandFranchiseMapPage from './BrandFranchiseMapPage';
import { getAuthToken } from '../../utils/auth';

interface Brand {
  id: number;
  name: string;
  code?: string;
  restaurants?: Array<{ id: number }>;
}

const BrandSelect = styled.select`
  padding: 6px 10px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  margin-bottom: 16px;
`;

// Sentinel value for the "All Brands" option in the dropdown.
const ALL_BRANDS = 'all';

const BrandFranchiseMapStandalone: React.FC = () => {
  const { t } = useTranslation('contract');
  const [brands, setBrands] = useState<Brand[]>([]);
  // `null` = not yet initialized. After brands load, defaults to 'all'.
  const [selection, setSelection] = useState<number | typeof ALL_BRANDS | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = getAuthToken();
        const res = await fetch('/api/brands', { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        const list: Brand[] = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        // Sort: brands with most restaurants first
        const sorted = [...list].sort((a, b) => (b.restaurants?.length || 0) - (a.restaurants?.length || 0));
        setBrands(sorted);
        if (sorted.length > 0) setSelection(prev => prev ?? ALL_BRANDS);
      } catch {
        setBrands([]);
      }
    })();
  }, []);

  const totalRestaurants = brands.reduce((sum, b) => sum + (b.restaurants?.length || 0), 0);
  const brandIds = brands.map(b => b.id);

  return (
    <Container>
      <Header>
        <Title>{t('franchiseMap', 'Franchise Map')}</Title>
      </Header>
      <Content>
        {brands.length > 0 && (
          <BrandSelect
            value={selection ?? ''}
            onChange={(e) => {
              const v = e.target.value;
              setSelection(v === ALL_BRANDS ? ALL_BRANDS : Number(v));
            }}
          >
            <option value={ALL_BRANDS}>
              {t('map.allBrands', 'All Brands')} · {totalRestaurants} {totalRestaurants === 1 ? 'restaurant' : 'restaurants'}
            </option>
            {brands.map(b => {
              const cnt = b.restaurants?.length || 0;
              return (
                <option key={b.id} value={b.id}>
                  {b.name}{b.code ? ` (${b.code})` : ''} · {cnt} {cnt === 1 ? 'restaurant' : 'restaurants'}
                </option>
              );
            })}
          </BrandSelect>
        )}
        {selection === ALL_BRANDS
          ? <BrandFranchiseMapPage brandId={brandIds} />
          : typeof selection === 'number'
            ? <BrandFranchiseMapPage brandId={selection} />
            : <div style={{ padding: 24, color: '#4B5563' }}>{t('map.noBrand', 'No brand available.')}</div>}
      </Content>
    </Container>
  );
};

export default BrandFranchiseMapStandalone;
