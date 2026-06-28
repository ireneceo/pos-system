import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useStore } from '../../contexts/StoreContext';
import PageHeader from '../../components/Common/PageHeader';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { formatCurrency } from '../../utils/currency';
import CashLedger from '../../components/CashManagement/CashLedger';
import CashDrawerModal from '../../components/CashManagement/CashDrawerModal';
import { C, round2, Ledger } from '../../components/CashManagement/cashUi';
import SettlementMenu from '../../components/Settlement/SettlementMenu';

// 시재관리(Cash Management) = 현금 입출금 회계 리스트 — 라이브오더 동일 구조(PageHeader + FilterToolbar + DataTable).
// 운영(개시·캐시인/아웃·드로어)은 라이브오더/플로어플랜의 Today's Cash Drawer.
// FilterToolbar/Search 는 라이브오더 styles 와 동일 스타일을 로컬 복제(공용 컴포넌트 아님).

const Content = styled.div`padding: 20px 24px; @media (max-width: 768px) { padding: 12px; }`;
const FilterToolbar = styled.div`
  display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;
  & > div:first-child > div { margin-bottom: 0 !important; }
`;
const SearchInputContainer = styled.div`position: relative; width: 220px; height: 38px; @media (max-width: 768px) { width: 100%; order: 10; }`;
const SearchIcon = styled.span`position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 13px; color: #6B7280;`;
const SearchInput = styled.input`
  width: 100%; height: 38px; padding: 0 32px 0 36px; border: 1px solid #C7CED6; border-radius: 6px; font-size: 14px; color: #1F2937; box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &::placeholder { color: #6B7280; }
`;
const ClearSearchButton = styled.button`
  position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: #C7CED6; border: none; border-radius: 50%;
  width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; color: #4B5563; padding: 0; line-height: 1;
  &:hover { background: #6B7280; }
`;
const HeaderBtn = styled.button`
  display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #F4F6F9; color: #0A2540;
  border: 1px solid #C7CED6; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; flex-shrink: 0;
  &:hover { background: #E6EBF1; }
`;

const CashUpPage: React.FC = () => {
  const { t } = useTranslation();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const store = useStore();
  // 매장 타임존 — 미로딩 시 KL 폴백(CashDrawerOps 와 동일). 없으면 브라우저 로컬로 "today" 가
  // 매장 자정 경계와 어긋나 당일 내역이 누락됨(예: KL 새벽이 UTC 전날) → 반드시 매장 tz 기준.
  const tz = store?.operationSettings?.timeZone || 'Asia/Kuala_Lumpur';

  const currency = store?.operationSettings?.currency || 'MYR';
  const fc = (n: number) => formatCurrency(Number(n) || 0, currency);

  const [activePeriod, setActivePeriod] = useState<PeriodType>('today');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('today', tz));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [search, setSearch] = useState('');
  const [showCashDrawer, setShowCashDrawer] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // 현재 드로어 잔액 — Today's Cash Drawer 팝업과 '동일한' 두 엔드포인트(/shift/current + /shift/{id}/expected)로
  // 계산해 두 화면 숫자가 정확히 일치하도록(개시현금 + 입금 − 출금 = 현재 드로어). '현재 드로어'는 지금 열린
  // 교대에만 의미가 있어 활성 기간이 '오늘'이고 열린 교대가 있을 때만 노출. 과거 기간은 회계 순액(CashLedger) 유지.
  const [drawer, setDrawer] = useState<{ opening: number; paidIn: number; paidOut: number; onHand: number } | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!restaurantId || activePeriod !== 'today') { if (alive) setDrawer(null); return; }
      try {
        const cur = await fetch(`/api/cash/restaurant/${restaurantId}/shift/current`, { credentials: 'include' }).then(r => r.json()).catch(() => null);
        const shift = cur?.data;
        if (!shift) { if (alive) setDrawer(null); return; }
        const ex = await fetch(`/api/cash/restaurant/${restaurantId}/shift/${shift.id}/expected`, { credentials: 'include' }).then(r => r.json()).catch(() => null);
        const mv = ex?.data?.movements || { paidIn: 0, paidOut: 0, net: 0 };
        const opening = Number(ex?.data?.opening_float ?? shift.opening_float ?? 0);
        if (alive) setDrawer({ opening: round2(opening), paidIn: round2(mv.paidIn), paidOut: round2(mv.paidOut), onHand: round2(opening + Number(mv.net || 0)) });
      } catch { if (alive) setDrawer(null); }
    })();
    return () => { alive = false; };
  }, [restaurantId, activePeriod, reloadKey]);

  const liveDrawer = activePeriod === 'today' && !!drawer;

  // tz 가 store 에서 뒤늦게 로딩되면(첫 렌더 시 undefined → KL 폴백) 현재 기간을 매장 tz 기준으로 재계산.
  // 커스텀 날짜 선택 중에는 건드리지 않음.
  useEffect(() => {
    if (!isCustomDateRange) setDateRange(calculatePeriodDateRange(activePeriod, tz));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tz]);

  const handlePeriodChange = (p: PeriodType) => { setActivePeriod(p); setIsCustomDateRange(false); setDateRange(calculatePeriodDateRange(p, tz)); };
  const handleCalendarRangeSelect = (start: string, end: string) => { setIsCustomDateRange(true); setActivePeriod('custom'); setDateRange({ start, end }); };

  return (
    <div>
      <PageHeader title={t('cash:cashMgmtTitle', { defaultValue: 'Cash Management' })}>
        <HeaderBtn type="button" onClick={() => setShowCashDrawer(true)} title="Today's Cash Drawer">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
            <path d="M2 8h20M2 8l2-4h16l2 4M2 8v10a2 2 0 002 2h16a2 2 0 002-2V8M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('cash:todayCashDrawer', { defaultValue: "Today's Cash Drawer" })}
        </HeaderBtn>
        <SettlementMenu />
      </PageHeader>
      <Content>
        <FilterToolbar>
          <div>
            <DatePeriodFilter
              activePeriod={activePeriod} dateRange={dateRange} isCustomDateRange={isCustomDateRange}
              onPeriodChange={handlePeriodChange} onCalendarRangeSelect={handleCalendarRangeSelect} includeToday
            />
          </div>
          <SearchInputContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput type="text" placeholder={t('cash:searchPlaceholder', { defaultValue: 'Search reason / staff…' })} value={search} onChange={e => setSearch(e.target.value)} />
            {search && <ClearSearchButton onClick={() => setSearch('')} title="Clear">×</ClearSearchButton>}
          </SearchInputContainer>
        </FilterToolbar>

        {/* 현재 드로어 잔액 — Today's Cash Drawer 팝업과 동일한 4숫자(개시현금 + 입금 − 출금 = 현재 드로어). */}
        {liveDrawer && drawer && (
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 18px', marginBottom: 20, maxWidth: 420 }}>
            <Ledger label={t('cash:openingCash', { defaultValue: 'Opening cash' })} value={fc(drawer.opening)} />
            <Ledger label={t('cash:paidIn', { defaultValue: 'Cash in' })} value={`+ ${fc(drawer.paidIn)}`} color={C.match} />
            <Ledger label={t('cash:paidOut', { defaultValue: 'Cash out' })} value={`− ${fc(drawer.paidOut)}`} color={C.bad} />
            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 10 }}>
              <Ledger label={t('cash:cashOnHand', { defaultValue: 'Cash on hand' })} value={fc(drawer.onHand)} bold />
            </div>
          </div>
        )}

        <CashLedger restaurantId={restaurantId} dateRange={dateRange} search={search} reloadKey={reloadKey} hideSummary={liveDrawer} />
      </Content>
      <CashDrawerModal restaurantId={restaurantId} isOpen={showCashDrawer} onClose={() => { setShowCashDrawer(false); setReloadKey(k => k + 1); }} />
    </div>
  );
};

export default CashUpPage;
