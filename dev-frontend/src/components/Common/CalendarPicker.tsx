import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

// Types
interface CalendarPickerProps {
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  onRangeSelect: (start: string, end: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

// Helpers
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const formatDate = (d: Date): string => {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const parseDate = (s: string): Date | null => {
  if (!s) return null;
  // Accept both 'YYYY-MM-DD' and ISO '2026-06-06T00:00:00.000Z'.
  const datePart = String(s).slice(0, 10);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isBetween = (date: Date, start: Date, end: Date): boolean => {
  const t = date.getTime();
  return t > start.getTime() && t < end.getTime();
};

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number): number =>
  new Date(year, month, 1).getDay();

// A calendar month label is an abstract (year, month) — NOT a timestamp. Formatting it via
// toLocaleDateString with a timeZone shifted it by a month: `new Date(year, month)` is that
// month's 1st at 00:00 in the BROWSER's zone, and converting that instant to a restaurant zone
// that is BEHIND the browser (e.g. browser KST, restaurant MYT) rolls it back to the last day of
// the previous month → June rendered as "May", July as "June", so the user clicked the wrong grid.
// Label the month directly from its index — no Date, no zone. (Irene 2026-07-05)
//   ⚠ 2026-09-05: 같은 결함이 `DateField.tsx` 에 그대로 남아 있었다 — 7/5 수정이 달력 부품
//     **둘 중 하나에만** 들어갔고, 발주 배송 모달이 쓰는 쪽이 빠져 있었다(Irene 신고).
//     그래서 라벨 함수를 여기서 **export 해 공유**한다. 복사로 고치면 세 번째가 생긴다.
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
export const getMonthLabel = (year: number, month: number): string => `${MONTH_NAMES[month]} ${year}`;

// Component
const CalendarPicker: React.FC<CalendarPickerProps> = ({
  startDate,
  endDate,
  onRangeSelect,
  onClose,
  isOpen
}) => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [step, setStep] = useState<'start' | 'end'>('start');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync external dates
  useEffect(() => {
    if (startDate) setRangeStart(parseDate(startDate));
    if (endDate) setRangeEnd(parseDate(endDate));
  }, [startDate, endDate]);

  // Reset step when opened
  useEffect(() => {
    if (isOpen) setStep('start');
  }, [isOpen]);

  // 2026-06-05 (Irene 버그): 열 때마다 오늘(현재 월)로 돌아가던 문제 → 선택된 시작일의 월로 위치.
  // 커스텀 5월 범위를 골라도 다시 열면 6월(오늘)이 떠서 "자꾸 6월" 처럼 보이던 원인.
  useEffect(() => {
    if (!isOpen) return;
    const anchor = parseDate(startDate || '') || parseDate(endDate || '') || new Date();
    setViewMonth(anchor.getMonth());
    setViewYear(anchor.getFullYear());
  }, [isOpen, startDate, endDate]);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handlePrevMonth = useCallback(() => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  }, [viewMonth]);

  const handleNextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  }, [viewMonth]);

  const handleDayClick = (date: Date) => {
    if (step === 'start') {
      setRangeStart(date);
      setRangeEnd(null);
      setStep('end');
    } else {
      let start = rangeStart!;
      let end = date;
      if (end < start) [start, end] = [end, start];
      setRangeStart(start);
      setRangeEnd(end);
      setStep('start');
      onRangeSelect(formatDate(start), formatDate(end));
      setTimeout(onClose, 200);
    }
  };

  const getDayState = (date: Date) => {
    const isStart = rangeStart && isSameDay(date, rangeStart);
    const isEnd = rangeEnd && isSameDay(date, rangeEnd);
    const effectiveEnd = step === 'end' && hoverDate ? hoverDate : rangeEnd;
    let isInRange = false;
    if (rangeStart && effectiveEnd) {
      const [s, e] = rangeStart <= effectiveEnd ? [rangeStart, effectiveEnd] : [effectiveEnd, rangeStart];
      isInRange = isBetween(date, s, e);
    }
    const isHoverEnd = step === 'end' && hoverDate && isSameDay(date, hoverDate);
    return { isStart, isEnd, isInRange, isHoverEnd };
  };

  const renderMonth = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));

    return (
      <MonthContainer>
        <MonthLabel>{getMonthLabel(year, month)}</MonthLabel>
        <WeekdayRow>
          {WEEKDAYS.map(w => <Weekday key={w}>{w}</Weekday>)}
        </WeekdayRow>
        <DaysGrid>
          {days.map((date, i) => {
            if (!date) return <EmptyCell key={`e-${i}`} />;
            const { isStart, isEnd, isInRange, isHoverEnd } = getDayState(date);
            const isToday = isSameDay(date, today);
            return (
              <DayCell
                key={date.getTime()}
                $isStart={!!isStart}
                $isEnd={!!isEnd}
                $isInRange={isInRange}
                $isHoverEnd={!!isHoverEnd}
                $isToday={isToday}
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => setHoverDate(date)}
                onMouseLeave={() => setHoverDate(null)}
              >
                {date.getDate()}
              </DayCell>
            );
          })}
        </DaysGrid>
      </MonthContainer>
    );
  };

  // Second month
  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const handlePreset = (preset: string) => {
    const now = new Date();
    let start: Date;
    let end: Date = now;

    switch (preset) {
      case 'this_week': {
        start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        break;
      }
      case 'last_week': {
        const thisWeekStart = new Date(now);
        thisWeekStart.setDate(now.getDate() - now.getDay());
        start = new Date(thisWeekStart);
        start.setDate(thisWeekStart.getDate() - 7);        // previous Sunday
        end = new Date(thisWeekStart);
        end.setDate(thisWeekStart.getDate() - 1);          // previous Saturday
        break;
      }
      case 'this_month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last_month':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0); // last day of previous month
        break;
      case 'this_year':
        start = new Date(now.getFullYear(), 0, 1);
        break;
      case 'last_year':
        start = new Date(now.getFullYear() - 1, 0, 1);
        end = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        return;
    }

    setRangeStart(start);
    setRangeEnd(end);
    setStep('start');
    onRangeSelect(formatDate(start), formatDate(end));
    setTimeout(onClose, 150);
  };

  if (!isOpen) return null;

  return (
    <Wrapper ref={wrapperRef}>
      <PickerLayout>
        <PresetSidebar>
          <PresetButton onClick={() => handlePreset('this_week')}>This Week</PresetButton>
          <PresetButton onClick={() => handlePreset('last_week')}>Last Week</PresetButton>
          <PresetButton onClick={() => handlePreset('this_month')}>This Month</PresetButton>
          <PresetButton onClick={() => handlePreset('last_month')}>Last Month</PresetButton>
          <PresetButton onClick={() => handlePreset('this_year')}>This Year</PresetButton>
          <PresetButton onClick={() => handlePreset('last_year')}>Last Year</PresetButton>
        </PresetSidebar>
        <CalendarSection>
          <CalendarHeader>
            <NavButton onClick={handlePrevMonth} aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </NavButton>
            <NavButton onClick={handleNextMonth} aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </NavButton>
          </CalendarHeader>
          <CalendarBody>
            {renderMonth(viewYear, viewMonth)}
            <SecondMonth>
              {renderMonth(nextYear, nextMonth)}
            </SecondMonth>
          </CalendarBody>
        </CalendarSection>
      </PickerLayout>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 1000;
  background: #FFFFFF;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  padding: 20px 24px;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    padding: 20px 16px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.2s ease-out;

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  }
`;

const PickerLayout = styled.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PresetSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #C7CED6;
  min-width: 120px;

  @media (max-width: 768px) {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid #C7CED6;
    padding-right: 0;
    margin-right: 0;
    padding-bottom: 12px;
    margin-bottom: 16px;
    min-width: 0;
    gap: 4px;
  }
`;

const PresetButton = styled.button`
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  color: #1F2937;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s;
  white-space: nowrap;

  &:hover {
    background: #F1F4F8;
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 8px 10px;
    background: #F4F6F9;
    border-radius: 8px;
  }
`;

const CalendarSection = styled.div``;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #4B5563;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F8;
  }
`;

const CalendarBody = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const SecondMonth = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MonthContainer = styled.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MonthLabel = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`;

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`;

const Weekday = styled.div`
  text-align: center;
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const EmptyCell = styled.div`
  aspect-ratio: 1;
  min-width: 36px;
`;

const DayCell = styled.div<{
  $isStart: boolean;
  $isEnd: boolean;
  $isInRange: boolean;
  $isHoverEnd: boolean;
  $isToday: boolean;
}>`
  aspect-ratio: 1;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.12s, color 0.12s;
  position: relative;
  user-select: none;

  color: ${p => (p.$isStart || p.$isEnd) ? '#FFFFFF' : p.$isInRange ? '#635BFF' : '#1F2937'};
  background: ${p => (p.$isStart || p.$isEnd) ? '#635BFF' : p.$isInRange ? '#F0EEFF' : 'transparent'};
  font-weight: ${p => (p.$isStart || p.$isEnd || p.$isToday) ? 700 : 400};

  ${p => p.$isToday && !p.$isStart && !p.$isEnd && `
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #635BFF;
    }
  `}

  ${p => p.$isHoverEnd && !p.$isStart && !p.$isEnd && `
    background: #E8E5FF;
    color: #635BFF;
  `}

  &:hover {
    ${p => !p.$isStart && !p.$isEnd && `
      background: ${p.$isInRange ? '#E8E5FF' : '#F1F4F8'};
    `}
  }
`;

export default CalendarPicker;
