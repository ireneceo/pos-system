import React from 'react';
import WorkManualsPage from '../../components/Common/WorkManualsPage';
import { useTranslation } from 'react-i18next';

const FoodcourtWorkManualsPage: React.FC = () => {
  const { t } = useTranslation('foodcourt');
  return <WorkManualsPage pageTitle={t('workManuals.title', 'Work Manuals')} translationNs="foodcourt" />;
};

export default FoodcourtWorkManualsPage;
