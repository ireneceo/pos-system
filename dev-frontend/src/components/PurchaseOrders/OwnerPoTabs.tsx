import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TabContainer, Tab } from '../UI/Tabs';
import { getAuthToken } from '../../utils/auth';

/**
 * 오너 발주 «승인 전 / 승인 완료» 탭 띠 (2026-10-22 Fable 설계 owner-po-approval-revoke §1-4).
 * 새 표를 만들지 않는다 — 승인 화면(PO Approvals)과 발주내역(Order History) 두 화면 위에 같은 띠를 얹어
 * 경로 이동으로 오간다. «승인 완료» = 발주내역 화면 그대로(?approved=1 → «승인 완료만» 켜진 채).
 */
interface OwnerPoTabsProps {
  active: 'pending' | 'approved';
  /** 부모가 이미 아는 승인 대기 수(승인 화면). 없으면 /api/badge-counts 의 poApprovals 를 읽는다. */
  pendingCount?: number;
  /** 바뀌면 배지 수를 다시 읽는다(승인취소 뒤 등). */
  refreshKey?: number;
}

const OwnerPoTabs: React.FC<OwnerPoTabsProps> = ({ active, pendingCount, refreshKey }) => {
  const { t } = useTranslation('purchaseOrders');
  const navigate = useNavigate();
  const [badge, setBadge] = useState<number | null>(null);

  useEffect(() => {
    if (pendingCount != null) return;
    let alive = true;
    fetch('/api/badge-counts', { headers: { Authorization: `Bearer ${getAuthToken()}` } })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (alive && d && d.success) setBadge(Number(d.data?.poApprovals) || 0); })
      .catch(() => { /* 배지 없이 탭만 */ });
    return () => { alive = false; };
  }, [pendingCount, refreshKey]);

  const n = pendingCount != null ? pendingCount : badge;
  return (
    <TabContainer>
      <Tab type="button" active={active === 'pending'} onClick={() => navigate('/pos/owner/po-approvals')}>
        {t('ownerApprovals.tabPending')}{n != null && n > 0 ? ` (${n})` : ''}
      </Tab>
      <Tab type="button" active={active === 'approved'} onClick={() => navigate('/pos/purchase-orders/history?approved=1')}>
        {t('ownerApprovals.tabApproved')}
      </Tab>
    </TabContainer>
  );
};

export default OwnerPoTabs;
