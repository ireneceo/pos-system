import React from 'react';
import styled from 'styled-components';

// Types
export type PeriodType = 'today' | 'week' | 'month' | 'year' | 'all';

export interface DateRange {
  start: string;
  end: string;
}

export interface DateRangeFilterProps {
  activePeriod: PeriodType;
  dateRange: DateRange;
  isCustomDateRange: boolean;
  onPeriodChange: (period: PeriodType) => void;
  onDateRangeChange: (field: 'start' | 'end', value: string) => void;
  onDownload?: () => void;
  showDownload?: boolean;
  timezone?: string;
}

// Styled Components
const FilterControls = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const DateButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active ? '#635BFF' : '#FFFFFF'};
  color: ${props => props.active ? '#FFFFFF' : '#6B7C93'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#5046e5' : '#F6F9FC'};
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

const DateRangeInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
    width: 120px;
  }
`;

const CustomDateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;

  span {
    color: #6B7C93;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 8px;
  }
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #0A2540;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #1a3550;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 8px;
    width: 100%;
    justify-content: center;
  }
`;

// Helper function to calculate date range based on period
export const calculateDateRange = (
  period: PeriodType,
  timezone: string = 'Asia/Kuala_Lumpur'
): DateRange => {
  const getDateInTz = (daysOffset: number = 0): string => {
    try {
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formatter.format(date);
    } catch {
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
  };

  const todayInTz = getDateInTz(0);
  let startDate: string;

  switch (period) {
    case 'today':
      startDate = todayInTz;
      break;
    case 'week':
      startDate = getDateInTz(-6); // 7 days including today
      break;
    case 'month':
      startDate = getDateInTz(-29); // 30 days including today
      break;
    case 'year':
      // From Jan 1 of current year
      const year = todayInTz.split('-')[0];
      startDate = `${year}-01-01`;
      break;
    case 'all':
      startDate = '2020-01-01'; // Far past date
      break;
    default:
      startDate = todayInTz;
  }

  return { start: startDate, end: todayInTz };
};

// Helper function to get period label
export const getPeriodLabel = (
  period: PeriodType,
  isCustom: boolean,
  start: string,
  end: string
): string => {
  if (isCustom) {
    return `${start} to ${end}`;
  }
  switch (period) {
    case 'today': return 'Today';
    case 'week': return 'This Week';
    case 'month': return 'This Month';
    case 'year': return 'This Year';
    case 'all': return 'All Time';
    default: return period;
  }
};

// Main Component
const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  activePeriod,
  dateRange,
  isCustomDateRange,
  onPeriodChange,
  onDateRangeChange,
  onDownload,
  showDownload = false
}) => {
  return (
    <FilterControls>
      <FilterRow>
        <DateButton
          active={activePeriod === 'today' && !isCustomDateRange}
          onClick={() => onPeriodChange('today')}
        >
          Today
        </DateButton>
        <DateButton
          active={activePeriod === 'week' && !isCustomDateRange}
          onClick={() => onPeriodChange('week')}
        >
          Week
        </DateButton>
        <DateButton
          active={activePeriod === 'month' && !isCustomDateRange}
          onClick={() => onPeriodChange('month')}
        >
          Month
        </DateButton>
        <DateButton
          active={activePeriod === 'year' && !isCustomDateRange}
          onClick={() => onPeriodChange('year')}
        >
          Year
        </DateButton>
        <DateButton
          active={activePeriod === 'all' && !isCustomDateRange}
          onClick={() => onPeriodChange('all')}
        >
          All
        </DateButton>

        <CustomDateRange>
          <DateRangeInput
            type="date"
            value={dateRange.start}
            onChange={(e) => onDateRangeChange('start', e.target.value)}
          />
          <span>to</span>
          <DateRangeInput
            type="date"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange('end', e.target.value)}
          />
        </CustomDateRange>

        {showDownload && onDownload && (
          <DownloadButton onClick={onDownload}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download
          </DownloadButton>
        )}
      </FilterRow>
    </FilterControls>
  );
};

export default DateRangeFilter;
