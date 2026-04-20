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
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  margin-bottom: 16px;
`;

const BrandFranchiseMapStandalone: React.FC = () => {
  const { t } = useTranslation('contract');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = getAuthToken();
        const res = await fetch('/api/brands', { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        const list: Brand[] = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        // Sort: brands with most restaurants first (so default-select is meaningful)
        const sorted = [...list].sort((a, b) => (b.restaurants?.length || 0) - (a.restaurants?.length || 0));
        setBrands(sorted);
        if (sorted.length > 0) setSelectedBrandId(prev => prev ?? sorted[0].id);
      } catch {
        setBrands([]);
      }
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{t('franchiseMap', 'Franchise Map')}</Title>
      </Header>
      <Content>
        {brands.length > 0 && (
          <BrandSelect
            value={selectedBrandId || ''}
            onChange={(e) => setSelectedBrandId(Number(e.target.value))}
          >
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
        {selectedBrandId
          ? <BrandFranchiseMapPage brandId={selectedBrandId} />
          : <div style={{ padding: 24, color: '#6B7280' }}>{t('map.noBrand', 'No brand available.')}</div>}
      </Content>
    </Container>
  );
};

export default BrandFranchiseMapStandalone;
