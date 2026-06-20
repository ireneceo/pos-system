import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../UI/Modal';
import CashDrawerOps from './CashDrawerOps';

// 오늘의 캐시드로워 모달 — 라이브오더/플로어플랜 상단 메뉴에서 호출. 운영(개시·입출금·드로어)만.
// 회계 리스트(과거 전체)는 사이드바 '시재관리' 페이지.

interface Props { restaurantId?: string; isOpen: boolean; onClose: () => void; }

const CashDrawerModal: React.FC<Props> = ({ restaurantId, isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('cash:todayCashDrawer', { defaultValue: "Today's Cash Drawer" })} size="medium">
      <CashDrawerOps restaurantId={restaurantId} compact />
    </Modal>
  );
};

export default CashDrawerModal;
