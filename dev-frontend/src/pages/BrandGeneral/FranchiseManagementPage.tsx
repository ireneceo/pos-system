import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ContractManagementPage from '../../components/Contract/ContractManagementPage';
import BrandFranchiseMapPage from './BrandFranchiseMapPage';
import { TabContainer, Tab } from '../../components/UI/Tabs';
import { Container, Header, Title, Content } from '../../components/UI';
import { getAuthToken } from '../../utils/auth';

interface Brand {
  id: number;
  name: string;
  code?: string;
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

const FranchiseManagementPage: React.FC = () => {
  const { t } = useTranslation('contract');
  const [searchParams, setSearchParams] = useSearchParams();
  const view = (searchParams.get('franchiseView') || 'contracts') as 'contracts' | 'map';

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  useEffect(() => {
    if (view !== 'map') return;
    (async () => {
      try {
        const token = getAuthToken();
        const res = await fetch('/api/brands', { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        const list: Brand[] = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        setBrands(list);
        if (list.length > 0 && !selectedBrandId) setSelectedBrandId(list[0].id);
      } catch {
        setBrands([]);
      }
    })();
  }, [view, selectedBrandId]);

  const setView = (v: 'contracts' | 'map') => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set('franchiseView', v);
      return p;
    }, { replace: true });
  };

  if (view === 'map') {
    return (
      <Container>
        <Header>
          <Title>{t('franchiseManagement', 'Franchise Management')}</Title>
        </Header>
        <Content>
          <TabContainer>
            <Tab active={false} onClick={() => setView('contracts')}>
              {t('franchiseTabs.contracts', 'Contracts')}
            </Tab>
            <Tab active={true} onClick={() => setView('map')}>
              {t('franchiseTabs.map', 'Map')}
            </Tab>
          </TabContainer>
          {brands.length > 1 && (
            <BrandSelect
              value={selectedBrandId || ''}
              onChange={(e) => setSelectedBrandId(Number(e.target.value))}
            >
              {brands.map(b => (
                <option key={b.id} value={b.id}>{b.name}{b.code ? ` (${b.code})` : ''}</option>
              ))}
            </BrandSelect>
          )}
          {selectedBrandId
            ? <BrandFranchiseMapPage brandId={selectedBrandId} />
            : <div style={{ padding: 24, color: '#6B7280' }}>{t('map.noBrand', 'No brand available.')}</div>}
        </Content>
      </Container>
    );
  }

  return (
    <>
      <ContractManagementPage
        entityType="brand"
        pageTitle={t('franchiseManagement', 'Franchise Management')}
        extraTabs={
          <TabContainer>
            <Tab active={true} onClick={() => setView('contracts')}>
              {t('franchiseTabs.contracts', 'Contracts')}
            </Tab>
            <Tab active={false} onClick={() => setView('map')}>
              {t('franchiseTabs.map', 'Map')}
            </Tab>
          </TabContainer>
        }
      />
    </>
  );
};

export default FranchiseManagementPage;
