import React from 'react';
import WorkManualsPage from '../../components/Common/WorkManualsPage';
import { useTranslation } from 'react-i18next';

const AdminWorkManualsPage: React.FC = () => {
  const { t } = useTranslation('admin');
  return <WorkManualsPage pageTitle={t('workManuals.title', 'Work Manuals')} translationNs="admin" />;
};

export default AdminWorkManualsPage;
