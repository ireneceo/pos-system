/**
 * DateField — 폼 입력용 단일 날짜 선택 컴포넌트
 *
 * CalendarPicker의 스타일/UX를 재사용하여 일관된 날짜 입력 경험 제공.
 * 브라우저 네이티브 <input type="date" /> 대체용.
 *
 * Usage:
 *   <DateField value={form.signing_date} onChange={(v) => updateField('signing_date', v)} />
 *   <DateField value={dueDate} onChange={setDueDate} disabled placeholder="Select date" />
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { getRestaurantTimezone } from '../../utils/timezone';
import { getMonthLabel } from './CalendarPicker';

interface DateFieldProps {
  value?: string | null; // YYYY-MM-DD
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  min?: string; // YYYY-MM-DD — minimum selectable date
  max?: string; // YYYY-MM-DD — maximum selectable date
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  // 2026-06-28 (Irene): 모달(overflow 잘림 + footer 가림) 안에서 쓸 때 캘린더를 body 로 portal
  // → footer 뒤로 깔리거나 잘리지 않음. 기본 false(기존 동작 그대로, 다른 사용처 무영향).
  dropdownPortal?: boolean;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const formatDate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Accept both plain 'YYYY-MM-DD' and ISO '2026-06-06T00:00:00.000Z'.
// Legacy DB rows store dates as DATETIME / TIMESTAMP, so the API returns ISO strings;
// we must normalize before date-part extraction or we parse '06T00:00:00.000Z' as NaN.
const parseDate = (s: string | null | undefined): Date | null => {
  if (!s) return null;
  // Take only the date portion before any 'T' / space / timezone marker.
  const datePart = String(s).slice(0, 10);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || !mo || !d) return null;
  return new Date(y, mo - 1, d);
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number): number =>
  new Date(year, month, 1).getDay();

// 달력의 월 라벨은 **(연, 월) 라벨이지 시각이 아니다.** `new Date(year, month)` 는 그 달 1일
// 00:00 **브라우저 존** 이고, 그것을 브라우저보다 뒤에 있는 매장 존으로 변환하면 전달 말일로
// 굴러떨어진다 — 브라우저 KST(UTC+9) · 매장 MYT(UTC+8) 에서 9월이 "August" 로 그려져
// 사용자가 엉뚱한 칸을 누른다(Irene 2026-09-05 신고 · 실측 재현).
//   ⚠ 같은 결함을 CalendarPicker 는 2026-07-05 에 고쳤는데 **이 파일이 빠져 있었다.**
//     그래서 이번엔 복사하지 않고 **CalendarPicker 의 함수를 그대로 가져다 쓴다** — 단일 소스.

const formatDisplayDate = (s: string | null | undefined): string => {
  const datePart = String(s || '').slice(0, 10);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);
  if (!match) return '';
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  // DATEONLY fields are pure calendar dates with no time-of-day — formatting them through
  // a browser-local Date and then reinterpreting in restaurant timezone can shift by a day
  // when browser is east of restaurant. Anchor to UTC + format in UTC so the calendar date
  // always displays as stored. (DATETIME fields — order times, invoice issued_at — still use
  // getRestaurantTimezone() per CLAUDE.md timezone rule.)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC'
  });
};

const DateField: React.FC<DateFieldProps> = ({
  value,
  onChange,
  disabled,
  placeholder = 'Select date',
  min,
  max,
  className,
  id,
  name,
  required,
  dropdownPortal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const initial = parseDate(value || '') || today;
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [portalCoords, setPortalCoords] = useState<{ top: number; left: number } | null>(null);

  // portal 모드: 입력칸 위치 기준으로 캘린더 fixed 좌표 계산(열 때 + 스크롤/리사이즈 시 갱신).
  useEffect(() => {
    if (!dropdownPortal || !isOpen) return;
    const compute = () => {
      const r = wrapperRef.current?.getBoundingClientRect();
      if (r) setPortalCoords({ top: r.bottom + 6, left: r.left });
    };
    compute();
    window.addEventListener('scroll', compute, true);
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute, true);
      window.removeEventListener('resize', compute);
    };
  }, [dropdownPortal, isOpen]);

  const selected = parseDate(value || '');
  const minDate = parseDate(min || '');
  const maxDate = parseDate(max || '');

  // Sync view when value changes externally
  useEffect(() => {
    const d = parseDate(value || '');
    if (d) {
      setViewMonth(d.getMonth());
      setViewYear(d.getFullYear());
    }
  }, [value]);

  // Outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      const inWrapper = wrapperRef.current && wrapperRef.current.contains(t);
      const inPanel = panelRef.current && panelRef.current.contains(t); // portal 캘린더 클릭은 바깥 아님
      if (!inWrapper && !inPanel) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

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
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const renderMonth = () => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(viewYear, viewMonth, d));

    return (
      <MonthContainer>
        <MonthLabel>{getMonthLabel(viewYear, viewMonth)}</MonthLabel>
        <WeekdayRow>
          {WEEKDAYS.map(w => <Weekday key={w}>{w}</Weekday>)}
        </WeekdayRow>
        <DaysGrid>
          {days.map((date, i) => {
            if (!date) return <EmptyCell key={`e-${i}`} />;
            const isSelected = selected && isSameDay(date, selected);
            const isToday = isSameDay(date, today);
            const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);
            return (
              <DayCell
                key={date.getTime()}
                $isSelected={!!isSelected}
                $isToday={isToday}
                $isDisabled={!!isDisabled}
                onClick={() => !isDisabled && handleDayClick(date)}
              >
                {date.getDate()}
              </DayCell>
            );
          })}
        </DaysGrid>
      </MonthContainer>
    );
  };

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <InputDisplay
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        $hasValue={!!value}
        disabled={disabled}
        id={id}
        aria-label={name}
      >
        <CalendarIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </CalendarIcon>
        <DisplayText $hasValue={!!value}>
          {value ? formatDisplayDate(value) : placeholder}
        </DisplayText>
        {value && !disabled && !required && (
          <ClearButton onClick={handleClear} aria-label="Clear">×</ClearButton>
        )}
      </InputDisplay>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value || ''} />
      {isOpen && (() => {
        const panel = (
          <PickerPanel
            ref={panelRef}
            style={dropdownPortal && portalCoords
              ? { position: 'fixed', top: portalCoords.top, left: portalCoords.left, zIndex: 3000 }
              : undefined}
          >
            <CalendarHeader>
              <NavButton onClick={handlePrevMonth} type="button" aria-label="Previous month">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </NavButton>
              <NavButton onClick={handleNextMonth} type="button" aria-label="Next month">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </NavButton>
            </CalendarHeader>
            <CalendarBody>{renderMonth()}</CalendarBody>
            <Footer>
              <TodayButton type="button" onClick={() => handleDayClick(new Date())}>Today</TodayButton>
            </Footer>
          </PickerPanel>
        );
        // 모달 안에서는 body 로 portal → overflow 잘림/footer 가림 회피.
        return dropdownPortal ? ReactDOM.createPortal(panel, document.body) : panel;
      })()}
    </Wrapper>
  );
};

export default DateField;

// --- Styled Components (CalendarPicker와 동일 팔레트) ---

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const InputDisplay = styled.button<{ $hasValue: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: #FFFFFF;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  color: ${p => p.$hasValue ? '#0A2540' : '#6B7280'};
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  text-align: left;
  font-family: inherit;

  &:hover:not(:disabled) {
    border-color: #635BFF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F1F4F8;
    color: #6B7280;
    cursor: not-allowed;
  }
`;

const CalendarIcon = styled.span`
  color: #4B5563;
  display: inline-flex;
  flex-shrink: 0;
`;

const DisplayText = styled.span<{ $hasValue: boolean }>`
  flex: 1;
  color: ${p => p.$hasValue ? '#0A2540' : '#6B7280'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClearButton = styled.span`
  color: #6B7280;
  font-size: 18px;
  line-height: 1;
  padding: 0 4px;

  &:hover {
    color: #4B5563;
  }
`;

const PickerPanel = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 1000;
  background: #FFFFFF;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  padding: 16px;
  animation: fadeIn 0.15s ease-out;
  min-width: 280px;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const NavButton = styled.button`
  background: transparent;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #425466;
  transition: all 0.15s;

  &:hover {
    background: #F4F6F9;
    border-color: #635BFF;
    color: #635BFF;
  }
`;

const CalendarBody = styled.div``;

const MonthContainer = styled.div``;

const MonthLabel = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 4px;
`;

const Weekday = styled.div`
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #8898AA;
  padding: 4px 0;
  text-transform: uppercase;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const EmptyCell = styled.div`
  aspect-ratio: 1;
`;

const DayCell = styled.div<{
  $isSelected: boolean;
  $isToday: boolean;
  $isDisabled: boolean;
}>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: ${p => p.$isDisabled ? 'not-allowed' : 'pointer'};
  border-radius: 6px;
  transition: all 0.15s;
  color: ${p => {
    if (p.$isDisabled) return '#6B7280';
    if (p.$isSelected) return '#FFFFFF';
    if (p.$isToday) return '#635BFF';
    return '#0A2540';
  }};
  background: ${p => p.$isSelected ? '#635BFF' : 'transparent'};
  font-weight: ${p => (p.$isSelected || p.$isToday) ? 600 : 400};
  opacity: ${p => p.$isDisabled ? 0.5 : 1};

  &:hover {
    background: ${p => {
      if (p.$isDisabled) return 'transparent';
      if (p.$isSelected) return '#635BFF';
      return '#F4F6F9';
    }};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #C7CED6;
`;

const TodayButton = styled.button`
  background: transparent;
  border: 1px solid #635BFF;
  color: #635BFF;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #635BFF;
    color: #FFFFFF;
  }
`;
