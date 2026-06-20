import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CashDrawerOps from '../../components/CashManagement/CashDrawerOps';
import CashLedger from '../../components/CashManagement/CashLedger';
import { C } from '../../components/CashManagement/cashUi';

// 시재관리 (좌측 사이드바) — 오늘의 캐시드로워(운영) + 현금 입출금 회계 리스트(기간필터·과거 전체).
// 오늘의 캐시드로워는 라이브오더/플로어플랜 상단 메뉴(CashDrawerModal)에서도 동일 제공.

const CashUpPage: React.FC = () => {
  const { t } = useTranslation();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 4 }}>{t('cash:cashMgmtTitle', { defaultValue: 'Cash Management' })}</h1>
      <CashDrawerOps restaurantId={restaurantId} onChange={() => setRefresh(x => x + 1)} />
      <CashLedger restaurantId={restaurantId} refreshKey={refresh} />
    </div>
  );
};

export default CashUpPage;
