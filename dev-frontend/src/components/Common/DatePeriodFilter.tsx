import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarPicker from './CalendarPicker';
import { useTranslation } from 'react-i18next';

// Types
export type PeriodType = 'today' | 'yesterday' | 'week' | 'month' | 'year' | 'all';

export interface DateRange {
  start: string;
  end: string;
}

export interface DatePeriodFilterProps {
  activePeriod: PeriodType;
  dateRange: DateRange;
  isCustomDateRange: boolean;
  onPeriodChange: (period: PeriodType) => void;
  onCalendarRangeSelect: (start: string, end: string) => void;
  includeToday?: boolean;
  children?: React.ReactNode;
}

// Helper: format Date to YYYY-MM-DD
const formatDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper: get current date in a specific timezone as YYYY-MM-DD
const getDateInTimezone = (tz?: string): Date => {
  if (!tz) return new Date();
  try {
    // Get the current date string in the target timezone
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const dateStr = formatter.format(new Date()); // "YYYY-MM-DD" in en-CA locale
    const [year, month, day] = dateStr.split('-').map(Number);
    // Create a local Date object representing that calendar date
    return new Date(year, month - 1, day);
  } catch {
    return new Date();
  }
};

// Helper: calculate date range for a period
// timezone: restaurant timezone (e.g., 'Asia/Kuala_Lumpur') - ensures "today" matches restaurant's local date
export const calculatePeriodDateRange = (period: PeriodType, timezone?: string): DateRange => {
  const now = getDateInTimezone(timezone);
  let start = new Date(now);
  const end = new Date(now);

  switch (period) {
    case 'today':
      break;
    case 'yesterday':
      start.setDate(now.getDate() - 1);
      end.setDate(now.getDate() - 1);
      break;
    case 'week':
      start.setDate(now.getDate() - 6);
      break;
    case 'month':
      start.setDate(now.getDate() - 29);
      break;
    case 'year':
      start.setDate(now.getDate() - 364);
      break;
    case 'all':
      start = new Date(2020, 0, 1);
      break;
  }

  return { start: formatDate(start), end: formatDate(end) };
};

// Component
const DatePeriodFilter: React.FC<DatePeriodFilterProps> = ({
  activePeriod,
  dateRange,
  isCustomDateRange,
  onPeriodChange,
  onCalendarRangeSelect,
  includeToday = false,
  children
}) => {
  const { t } = useTranslation('common');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCalendarSelect = (start: string, end: string) => {
    onCalendarRangeSelect(start, end);
    setShowDatePicker(false);
  };

  const periods: PeriodType[] = includeToday
    ? ['today', 'yesterday', 'week', 'month', 'year', 'all']
    : ['week', 'month', 'year', 'all'];

  const periodLabels: Record<PeriodType, string> = {
    today: 'Today',
    yesterday: 'Yesterday',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    all: 'All'
  };

  return (
    <FilterControls>
      <FilterRow>
        {periods.map(period => (
          <DateButton
            key={period}
            active={activePeriod === period && !isCustomDateRange}
            onClick={() => onPeriodChange(period)}
          >
            {periodLabels[period]}
          </DateButton>
        ))}

        <DateRangePickerWrapper>
          <DateRangeTrigger
            active={isCustomDateRange}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {dateRange.start && dateRange.end
              ? `${dateRange.start} ~ ${dateRange.end}`
              : 'Custom Range'
            }
          </DateRangeTrigger>
          <CalendarPicker
            isOpen={showDatePicker}
            startDate={dateRange.start}
            endDate={dateRange.end}
            onRangeSelect={handleCalendarSelect}
            onClose={() => setShowDatePicker(false)}
          />
        </DateRangePickerWrapper>

        {children}
      </FilterRow>
    </FilterControls>
  );
};

// Styled Components
const FilterControls = styled.div`
  margin-bottom: 24px;
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
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#5A51E6' : '#F8FAFC'};
    border-color: ${props => props.active ? '#5A51E6' : '#CBD5E1'};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

const DateRangePickerWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DateRangeTrigger = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${props => props.active ? '#F0EEFF' : '#FFFFFF'};
  color: ${props => props.active ? '#635BFF' : '#374151'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    gap: 6px;
  }
`;

export default DatePeriodFilter;
