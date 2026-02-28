import React from 'react';
import { useParams } from 'react-router-dom';
import InventoryManager from '../../components/Inventory/InventoryManager';

/**
 * InventoryPage - 레스토랑 재고관리 페이지
 *
 * InventoryManager 통합 컴포넌트를 mode='restaurant'로 사용
 * - 재료(Ingredient) 기반 재고 관리
 * - 주문 연동으로 자동 재고 차감 (deductInventoryForOrder)
 * - 수동 재고 조정 (입고/폐기/실사/조정)
 * - 재주문 제안 및 알림
 */
const InventoryPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();

  return (
    <>
      <InventoryManager mode="restaurant" restaurantId={restaurantId ? Number(restaurantId) : undefined} />
    </>
  );
};

export default InventoryPage;
