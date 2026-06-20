import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CashLedger from '../../components/CashManagement/CashLedger';
import { C } from '../../components/CashManagement/cashUi';

// 시재관리 (좌측 사이드바) = 현금 입출금 회계 리스트 전용 (통장식). 헤더 + 탭(오늘/과거/전체/기간).
// 오늘의 현금 운영(개시·캐시인/아웃·드로어)은 Today's Cash Drawer(라이브오더/플로어플랜).

const CashUpPage: React.FC = () => {
  const { t } = useTranslation();
  const { restaurantId } = useParams<{ restaurantId: string }>();

  return (
    <div>
      {/* 페이지 헤더 (다른 관리 화면과 동일 형태) */}
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: C.text, margin: 0 }}>{t('cash:cashMgmtTitle', { defaultValue: 'Cash Management' })}</h1>
        <p style={{ fontSize: 13, color: C.subtle, margin: '4px 0 0', lineHeight: 1.5 }}>
          {t('cash:cashMgmtSubtitle', { defaultValue: "Cash in/out accounting history. Manage today's cash drawer from Today's Cash Drawer (Live Orders / Floor Plan)." })}
        </p>
      </div>
      <div style={{ padding: 24, maxWidth: 920, margin: '0 auto' }}>
        <CashLedger restaurantId={restaurantId} />
      </div>
    </div>
  );
};

export default CashUpPage;
