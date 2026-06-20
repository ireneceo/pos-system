import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { Modal } from '../UI';
import FinalSettlementPanel from '../../pages/Reports/FinalSettlementPanel';

// 최종 마감 모달 — Daily Settlement(확정 전 예상 인쇄)와 별개 기능. 라이브오더/플로어플랜 상단 버튼에서 호출.
// 전수단 실제 입력 → 예상 대조 → 차이 → 확정(close) → 최종 Z-Report 빌프린트.

interface Props { isOpen: boolean; onClose: () => void; }

const FinalSettlementModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const store = useStore();
  const tz = store?.operationSettings?.timeZone || 'Asia/Kuala_Lumpur';
  const today = (() => { try { return new Date().toLocaleDateString('en-CA', { timeZone: tz }); } catch { return new Date().toISOString().slice(0, 10); } })();
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('cash:finalSettlement', { defaultValue: 'Final Settlement' })} size="medium">
      <FinalSettlementPanel selectedDate={today} today={today} />
    </Modal>
  );
};

export default FinalSettlementModal;
