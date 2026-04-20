import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContractManagementPage from '../../components/Contract/ContractManagementPage';
import FoodcourtTenancyMapPage from './FoodcourtTenancyMapPage';
import { TabContainer, Tab } from '../../components/UI/Tabs';
import { Container, Header, Title, Content } from '../../components/UI';

const TenancyManagementPage: React.FC = () => {
  const { t } = useTranslation('contract');
  const [searchParams, setSearchParams] = useSearchParams();
  const view = (searchParams.get('tenancyView') || 'contracts') as 'contracts' | 'map';

  const setView = (v: 'contracts' | 'map') => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set('tenancyView', v);
      return p;
    }, { replace: true });
  };

  if (view === 'map') {
    return (
      <Container>
        <Header>
          <Title>{t('tenancyManagement', 'Tenancy Management')}</Title>
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
          <FoodcourtTenancyMapPage />
        </Content>
      </Container>
    );
  }

  return (
    <ContractManagementPage
      entityType="foodcourt"
      pageTitle={t('tenancyManagement', 'Tenancy Management')}
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
  );
};

export default TenancyManagementPage;
