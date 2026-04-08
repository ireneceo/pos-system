import React from 'react';
import { useTranslation } from 'react-i18next';
import ContractManagementPage from '../../components/Contract/ContractManagementPage';

const TenancyManagementPage: React.FC = () => {
  const { t } = useTranslation('contract');
  return <ContractManagementPage entityType="foodcourt" pageTitle={t('tenancyManagement', 'Tenancy Management')} />;
};

export default TenancyManagementPage;
