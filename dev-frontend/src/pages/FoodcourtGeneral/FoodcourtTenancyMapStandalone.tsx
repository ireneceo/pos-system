import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI';
import FoodcourtTenancyMapPage from './FoodcourtTenancyMapPage';

const FoodcourtTenancyMapStandalone: React.FC = () => {
  const { t } = useTranslation('contract');
  return (
    <Container>
      <Header>
        <Title>{t('branchMap', 'Branch Map')}</Title>
      </Header>
      <Content>
        <FoodcourtTenancyMapPage />
      </Content>
    </Container>
  );
};

export default FoodcourtTenancyMapStandalone;
