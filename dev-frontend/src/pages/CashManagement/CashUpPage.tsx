import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useStore } from '../../contexts/StoreContext';
import PageHeader from '../../components/Common/PageHeader';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import CashLedger from '../../components/CashManagement/CashLedger';

// 시재관리 (좌측 사이드바) = 현금 입출금 회계 리스트 — 라이브오더와 동일 구조(PageHeader + DatePeriodFilter + DataTable).
// 운영(개시·캐시인/아웃·드로어)은 라이브오더/플로어플랜의 Today's Cash Drawer.

const Content = styled.div`padding: 20px 24px; @media (max-width: 768px) { padding: 12px; }`;
const FilterToolbar = styled.div`
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;
`;
const SearchInput = styled.input`
  height: 40px; padding: 0 14px; border: 1px solid #E6EBF1; border-radius: 8px; font-size: 14px; color: #0A2540; min-width: 200px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const CashUpPage: React.FC = () => {
  const { t } = useTranslation();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const store = useStore();
  const tz = store?.operationSettings?.timeZone;

  const [activePeriod, setActivePeriod] = useState<PeriodType>('today');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('today', tz));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [search, setSearch] = useState('');

  const handlePeriodChange = (p: PeriodType) => { setActivePeriod(p); setIsCustomDateRange(false); setDateRange(calculatePeriodDateRange(p, tz)); };
  const handleCalendarRangeSelect = (start: string, end: string) => { setIsCustomDateRange(true); setActivePeriod('custom'); setDateRange({ start, end }); };

  return (
    <div>
      <PageHeader
        title={t('cash:cashMgmtTitle', { defaultValue: 'Cash Management' })}
        settingsHref={restaurantId ? `/restaurant/${restaurantId}/settings?tab=operations` : undefined}
        settingsLabel={t('cash:settings', { defaultValue: 'Settings' })}
      />
      <Content>
        <FilterToolbar>
          <DatePeriodFilter
            activePeriod={activePeriod} dateRange={dateRange} isCustomDateRange={isCustomDateRange}
            onPeriodChange={handlePeriodChange} onCalendarRangeSelect={handleCalendarRangeSelect} includeToday
          />
          <SearchInput type="text" placeholder={t('cash:searchPlaceholder', { defaultValue: 'Search reason / staff…' })} value={search} onChange={e => setSearch(e.target.value)} />
        </FilterToolbar>
        <CashLedger restaurantId={restaurantId} dateRange={dateRange} search={search} />
      </Content>
    </div>
  );
};

export default CashUpPage;
