import React from 'react';
import WorkManualsPage from '../../components/Common/WorkManualsPage';
import { useTranslation } from 'react-i18next';

const BrandWorkManualsPage: React.FC = () => {
  const { t } = useTranslation('brand');
  return <WorkManualsPage pageTitle={t('workManuals.title', 'Work Manuals')} translationNs="brand" />;
};

export default BrandWorkManualsPage;
