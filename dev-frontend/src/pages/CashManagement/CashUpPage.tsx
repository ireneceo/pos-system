import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useStore } from '../../contexts/StoreContext';
import PageHeader from '../../components/Common/PageHeader';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import CashLedger from '../../components/CashManagement/CashLedger';

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
        <CashLedger restaurantId={restaurantId} dateRange={dateRange} search={search} />
      </Content>
    </div>
  );
};

export default CashUpPage;
