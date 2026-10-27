import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MainLayout from './MainLayout';

const PosLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#4B5563' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    // 가려던 주소를 들고 간다 — 로그인 뒤 그 화면으로 돌아오게(ProtectedRoute 와 같은 방식, 검사는 LoginPage 의 isValidPath).
    // 없으면 링크로 들어온 사람이 로그인 뒤 늘 대시보드에 떨어진다(2026-10-27 출퇴근 설정 링크 «메뉴 자체가 없어»).
    return <Navigate to="/pos" state={{ from: location }} replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PosLayout;
