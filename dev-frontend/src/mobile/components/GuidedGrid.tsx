import { useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * 키오스크 «한 화면에 하나씩»(안내형) 칸 나누기 — 카테고리·하위·메뉴·옵션 화면이 같이 쓴다.
 * 고를 게 적으면 화면을 꽉 채우는 큰 칸, 많으면 칸을 줄여 여러 줄(2026-10-11 Irene «크게 크게 갯수대로 … 카테고리도 메뉴도 옵션도 다»).
 *
 * 가로: 1~3개 = 한 줄에 그 개수 · 4개 = 2×2 · 5~6개 = 3열 · 7개 이상 = 4열
 * 세로: 1~2개 = 위아래로 크게 한 열 · 3~6개 = 2열 · 7개 이상 = 3열
 * 칸 높이 = 남은 화면 높이 ÷ 줄 수(최대 3줄 기준, 그보다 많으면 아래로 넘김), 140~460px.
 */
/** 화면이 가로인가 — 훅은 화면 맨 위에서 부른다(조건부 return 아래에서 부르면 안 됨) */
export function useLandscape(): boolean {
  const [landscape, setLandscape] = useState(() => (typeof window === 'undefined' ? true : window.innerWidth > window.innerHeight));
  useEffect(() => {
    const onResize = () => setLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return landscape;
}

export function guidedGrid(count: number, landscape: boolean) {
  const n = Math.max(1, count);
  const cols = landscape
    ? (n <= 3 ? n : n === 4 ? 2 : n <= 6 ? 3 : 4)
    : (n <= 2 ? 1 : n <= 6 ? 2 : 3);
  const rows = Math.ceil(n / cols);
  // 칸이 클수록 글자도 크게
  const scale: 'xl' | 'lg' | 'md' = n <= 2 ? 'xl' : n <= 6 ? 'lg' : 'md';
  return { cols, rows, scale };
}

/** $reserve = 칸 밖에서 쓰는 높이(위 바·스위치·제목·아래 바) — 남은 높이를 줄 수로 나눈다 */
export const GuidedGrid = styled.div<{ $cols: number; $rows: number; $reserve?: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols}, minmax(0, 1fr));
  grid-auto-rows: clamp(140px, calc((100dvh - ${p => p.$reserve ?? 330}px) / ${p => Math.min(p.$rows, 3)}), 460px);
  gap: 16px;
  margin-bottom: 24px;
`;

export const GUIDED_FONT: Record<'xl' | 'lg' | 'md', { name: string; meta: string; icon: string }> = {
  xl: { name: '40px', meta: '22px', icon: '72px' },
  lg: { name: '30px', meta: '19px', icon: '56px' },
  md: { name: '22px', meta: '16px', icon: '44px' },
};
