import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MainLayout from './MainLayout';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';
import { usePlayApp } from '../../utils/playApp';
import PlayUnavailable from '../Common/PlayUnavailable';

const NO_PLAN_ROLES = ['Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner'];

const PosLayout: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // 안드로이드 앱(Play) 안 «구독 없음» 선점 (2026-11-18 · 설계 /var/www/.claude/fable-design-20261118-play-billing-hide.md §5).
  //   MainLayout(🔒 인쇄 보호파일)의 구독 없음 화면은 «청구서 확인해 활성화 · View Invoices» 로 결제를 이끈다.
  //   그 파일을 못 고치므로 앱일 때만 같은 조건으로 여기서 먼저 가로채 빈 안내를 보인다.
  //   웹(playApp=false)은 훅에 null 을 넘겨 요청·화면 모두 지금 그대로.
  const playApp = usePlayApp();
  const watch = playApp && !!user?.role && NO_PLAN_ROLES.includes(user.role);
  const { hasActiveSubscription, loading: routesLoading } = useAllowedRoutes(
    watch && user ? {
      role: user.role,
      brandId: (user.role === 'Brand General' || user.role === 'Brand Manager') ? Number(user.brand_id) : null,
      foodcourtId: (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') ? Number(user.foodcourt_id) : null,
    } : null
  );
  // 훅은 감시를 켠 뒤 첫 그림에서 아직 «불러오는 중» 을 못 올린다 — 실제 불러오기를 한 번 본 뒤에만 판정(잘못된 깜빡임 방지).
  const sawLoading = useRef(false);
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!watch) { sawLoading.current = false; setSettled(false); return; }
    if (routesLoading) { sawLoading.current = true; return; }
    if (sawLoading.current) { setSettled(true); return; }
    const t = window.setTimeout(() => setSettled(true), 1500); // 불러올 주소가 없는 계정(소속 없음)
    return () => window.clearTimeout(t);
  }, [watch, routesLoading]);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#4B5563' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    // 가려던 주소를 들고 간다 — 로그인 뒤 그 화면으로 돌아오게(ProtectedRoute 와 같은 방식, 검사는 LoginPage 의 isValidPath).
    // 없으면 링크로 들어온 사람이 로그인 뒤 늘 대시보드에 떨어진다(2026-10-27 출퇴근 설정 링크 «메뉴 자체가 없어»).
    return <Navigate to="/pos" state={{ from: location }} replace />;
  }

  if (watch && settled && !routesLoading) {
    // MainLayout 의 조건과 같게: 엔티티 구독 없음 && 사용자 자신의 구독도 없음
    const userHasOwnPlan = user?.subscriptionStatus === 'active' || user?.subscriptionStatus === 'trial';
    if (!hasActiveSubscription && !userHasOwnPlan) return <PlayUnavailable variant="noPlan" />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PosLayout;
