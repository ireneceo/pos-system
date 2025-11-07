import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import DashboardContent from './DashboardContent';

const DashboardPage: React.FC = () => {
  return (
    <MainLayout>
      <DashboardContent />
    </MainLayout>
  );
};

export default DashboardPage;