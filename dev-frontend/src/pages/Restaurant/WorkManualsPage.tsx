import React from 'react';
import { useParams } from 'react-router-dom';
import WorkManualsPage from '../../components/Common/WorkManualsPage';
import { useTranslation } from 'react-i18next';

const RestaurantWorkManualsPage: React.FC = () => {
  const { t } = useTranslation('restaurant');
  const { restaurantId } = useParams<{ restaurantId: string }>();
  return <WorkManualsPage pageTitle={t('workManuals.title', 'Work Manuals')} translationNs="restaurant" restaurantId={restaurantId} />;
};

export default RestaurantWorkManualsPage;
