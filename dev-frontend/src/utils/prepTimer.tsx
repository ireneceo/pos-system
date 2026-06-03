import React from 'react';
import styled, { keyframes, css } from 'styled-components';

/**
 * 준비시간 추적 단일 소스 (2026-06-03). KDS·Floor Plan 아이템리스트·테이블 패널·Live Orders 가
 * 동일 규칙으로 "얼마 남았는지 / 얼마나 늦었는지"를 표시한다. docs/PREP_TIME_TRACKING.md
 *
 * 이중·삼중 코드 금지: 분 계산·소요시간·신호등 레벨이 전부 이 파일 한 곳에서만 정의된다.
 *  - getMinutesElapsed : 경과 분 (relative)
 *  - getServedDurationMin : 서브까지 걸린 분 (Live Orders 인라인에서 추출)
 *  - computePrep : 신호등 레벨 판정 (목표/임계 기반)
 *  - PrepTimerChip : 위 결과를 그리는 칩 (overdue 만 맥동)
 */
export type PrepLevel = 'on_time' | 'due_soon' | 'overdue';

export interface PrepResult {
  level: PrepLevel;
  elapsedMin: number;
  remainingMin: number; // 목표 - 경과 (음수 가능)
  overdueMin: number;   // max(0, 경과 - 목표)
  pct: number;          // 경과/목표 * 100
}

const toMs = (d: Date | string | number | null | undefined): number | null => {
  if (d === null || d === undefined) return null;
  const t = new Date(d).getTime();
  return isNaN(t) ? null : t;
};

/** 경과 분 (소수 버림). 잘못된 입력이면 0. */
export const getMinutesElapsed = (start: Date | string | number | null | undefined, now: number = Date.now()): number => {
  const ms = toMs(start);
  if (ms === null) return 0;
  return Math.max(0, Math.floor((now - ms) / 60000));
};

/** 주문 시작(주방 진입/생성) → 서브까지 걸린 분 (반올림). Live Orders 인라인 계산 대체. */
export const getServedDurationMin = (start: Date | string | number | null | undefined, served: Date | string | number | null | undefined): number | null => {
  const s = toMs(start);
  const e = toMs(served);
  if (s === null || e === null) return null;
  return Math.max(0, Math.round((e - s) / 60000));
};

/**
 * 신호등 레벨 판정. targetMin 이 0/미지정이면 null(타이머 표시 안 함).
 * thresholdPct(기본 80) 미만 = on_time, 그 이상~100% = due_soon, 초과 = overdue.
 */
/** 이미 경과 분을 알고 있을 때(예: statusInfo.elapsedMinutes) — 레벨 판정 단일 소스. */
export const computePrepFromElapsed = (
  elapsedMin: number,
  targetMin: number,
  thresholdPct: number = 80
): PrepResult | null => {
  if (!targetMin || targetMin <= 0) return null;
  const e = Math.max(0, Math.floor(elapsedMin || 0));
  const pct = (e / targetMin) * 100;
  const level: PrepLevel = pct > 100 ? 'overdue' : pct >= thresholdPct ? 'due_soon' : 'on_time';
  return { level, elapsedMin: e, remainingMin: targetMin - e, overdueMin: Math.max(0, e - targetMin), pct };
};

export const computePrep = (
  start: Date | string | number | null | undefined,
  targetMin: number,
  thresholdPct: number = 80,
  now: number = Date.now()
): PrepResult | null => {
  const ms = toMs(start);
  if (ms === null) return null;
  return computePrepFromElapsed(Math.floor((now - ms) / 60000), targetMin, thresholdPct);
};

// 색 = 신호등. on_time 회색(정적) / due_soon 황색(정적) / overdue 적색(맥동).
export const PREP_TOKEN: Record<PrepLevel, { color: string; bg: string; border: string; pulse: boolean }> = {
  on_time:  { color: '#6B7C93', bg: 'transparent',          border: 'transparent', pulse: false },
  due_soon: { color: '#B45309', bg: '#FEF3C7',              border: '#F59E0B',     pulse: false },
  overdue:  { color: '#FFFFFF', bg: '#EF4444',              border: '#DC2626',     pulse: true  },
};

// 초과만 천천히(1.2s) 호흡 맥동 — 정적 요소들 사이에서 시선을 끌되 공격적이지 않게.
const breathe = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.55); }
  50%      { box-shadow: 0 0 0 5px rgba(239, 68, 68, 0); }
`;

const Chip = styled.span<{ $level: PrepLevel }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: ${p => PREP_TOKEN[p.$level].color};
  background: ${p => PREP_TOKEN[p.$level].bg};
  border: 1px solid ${p => PREP_TOKEN[p.$level].border};
  ${p => p.$level === 'overdue' && css`animation: ${breathe} 1.2s ease-in-out infinite;`}
  &::before {
    content: '';
    width: 6px; height: 6px; border-radius: 50%;
    background: ${p => p.$level === 'overdue' ? '#FFFFFF' : p.$level === 'due_soon' ? '#F59E0B' : '#9CA3AF'};
    flex-shrink: 0;
  }
`;

/**
 * 신호등 타이머 칩. prep=null 이면 아무것도 안 그림(타이머 미적용).
 * on_time = "Xm left" / due_soon = "Xm left" / overdue = "+Xm".
 */
export const PrepTimerChip: React.FC<{ prep: PrepResult | null; className?: string }> = ({ prep, className }) => {
  if (!prep) return null;
  const label = prep.level === 'overdue'
    ? `+${prep.overdueMin}m`
    : `${Math.max(0, prep.remainingMin)}m left`;
  return <Chip $level={prep.level} className={className} role="timer" aria-label={prep.level === 'overdue' ? `Overdue by ${prep.overdueMin} minutes` : `${Math.max(0, prep.remainingMin)} minutes left`}>{label}</Chip>;
};
