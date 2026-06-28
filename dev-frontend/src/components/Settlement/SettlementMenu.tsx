import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DailySettlementPrint from '../../pages/Reports/DailySettlementPrint';
import StaffMealSettlementPrint from '../../pages/Reports/StaffMealSettlementPrint';

// 2026-06-28 (Irene): 통합 '마감 ▾' 드롭다운 — Daily / Final / Staff Meal Settlement.
// Reports + Cash Management 헤더 양쪽에 같은 메뉴를 둔다(어디서든 마감 가능).
// - Daily Settlement : 매출 일일정산(기존, 시재 무관)
// - Final Settlement : end-of-day 최종 마감(매출 기준 — 시재 안 쓰는 매장도 사용 가능)
// - Staff Meal       : 직원식 일별 정산서(품목별 직원이름)
// 각 옵션은 자체 모달을 띄움(인쇄는 billPrint.printSettlementReport 재사용).

type OpenModal = null | 'daily' | 'final' | 'staffMeal';

interface SettlementMenuProps {
  // 호스트 헤더 톤에 맞추기 위한 작은 변형(선택). 기본은 Reports 헤더 버튼 톤.
  variant?: 'light' | 'plain';
}

const SettlementMenu: React.FC<SettlementMenuProps> = ({ variant = 'light' }) => {
  const { t } = useTranslation('reports');
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<OpenModal>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const choose = (m: OpenModal) => { setModal(m); setOpen(false); };

  const items: Array<{ key: Exclude<OpenModal, null>; label: string; desc: string }> = [
    { key: 'daily', label: t('settlementMenu.daily', 'Daily Settlement'), desc: t('settlementMenu.dailyDesc', 'Sales summary for the day') },
    { key: 'final', label: t('settlementMenu.final', 'Final Settlement'), desc: t('settlementMenu.finalDesc', 'End-of-day final close') },
    { key: 'staffMeal', label: t('settlementMenu.staffMeal', 'Staff Meal Settlement'), desc: t('settlementMenu.staffMealDesc', 'Staff meals for the day') },
  ];

  const btnBg = variant === 'plain' ? '#FFFFFF' : '#F4F6F9';

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 16px', background: btnBg, color: '#0A2540',
          border: '1px solid #C7CED6', borderRadius: '6px', cursor: 'pointer',
          fontSize: '14px', fontWeight: 600
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
          <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {t('settlementMenu.settlement', 'Settlement')}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '14px' }}>
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 50,
            minWidth: '240px', background: '#FFFFFF', border: '1px solid #E6EBF1',
            borderRadius: '8px', boxShadow: '0 8px 24px rgba(10,37,64,0.12)', padding: '6px',
          }}
        >
          {items.map(it => (
            <button
              key={it.key}
              type="button"
              onClick={() => choose(it.key)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 12px', background: 'transparent', border: 'none',
                borderRadius: '6px', cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#F4F6F9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540' }}>{it.label}</div>
              <div style={{ fontSize: '12px', color: '#6B7C93', marginTop: '2px' }}>{it.desc}</div>
            </button>
          ))}
        </div>
      )}

      <DailySettlementPrint isOpen={modal === 'daily'} onClose={() => setModal(null)} mode="daily" />
      <DailySettlementPrint isOpen={modal === 'final'} onClose={() => setModal(null)} mode="final" />
      <StaffMealSettlementPrint isOpen={modal === 'staffMeal'} onClose={() => setModal(null)} />
    </div>
  );
};

export default SettlementMenu;
