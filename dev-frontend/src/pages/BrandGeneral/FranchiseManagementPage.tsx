import React from 'react';
import { useTranslation } from 'react-i18next';
import ContractManagementPage from '../../components/Contract/ContractManagementPage';

const FranchiseManagementPage: React.FC = () => {
  const { t } = useTranslation('contract');
  return <ContractManagementPage entityType="brand" pageTitle={t('franchiseManagement', 'Franchise Management')} />;
};

export default FranchiseManagementPage;
