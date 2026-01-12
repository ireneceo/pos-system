import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import InventoryManager from '../../components/Inventory/InventoryManager';

/**
 * BrandInventoryPage - 브랜드 재고관리 페이지
 *
 * InventoryManager 통합 컴포넌트를 mode='brand'로 사용
 * - ProductIngredient(track_stock=true) 기반 재고 관리
 * - 수동 재고 조정 (입고/폐기/조정)
 * - 향후 Purchase Order 연동 시 자동 차감 추가 예정
 */
const BrandInventoryPage: React.FC = () => {
  return (
    <MainLayout>
      <InventoryManager mode="brand" />
    </MainLayout>
  );
};

export default BrandInventoryPage;
