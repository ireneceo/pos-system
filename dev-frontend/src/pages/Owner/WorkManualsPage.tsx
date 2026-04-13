import React from 'react';
import WorkManualsPage from '../../components/Common/WorkManualsPage';
import { useTranslation } from 'react-i18next';

const OwnerWorkManualsPage: React.FC = () => {
  const { t } = useTranslation('owner');
  return <WorkManualsPage pageTitle={t('workManuals.title', 'Work Manuals')} translationNs="owner" isOwner={true} />;
};

export default OwnerWorkManualsPage;
