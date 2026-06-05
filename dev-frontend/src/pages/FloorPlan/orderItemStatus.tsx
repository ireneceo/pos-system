import styled from 'styled-components';

/**
 * 주문 아이템 단계(상태) pill — TableDetailPanel(우측 상세)과 ItemListView(서빙 리스트)가
 * 동일하게 재사용하는 단일 컴포넌트 (2026-06-03). 서버가 어디서 보든 같은 버튼·동작.
 * docs/SERVING_VIEW_DESIGN.md §8.
 */
export type ItemDisplayStatus = 'queued' | 'cooking' | 'ready' | 'served';

// 아이템 단계색 단일 소스(테마 인식). 대기=노랑 / 조리중=파랑 / 준비됨=초록 / 서빙됨=진초록.
// 라이트=기존 파스텔(변경 금지), 고대비·다크=채도 높은 진한 칠 + 흰 글자(테이블맵과 동일 철학).
type ItemToken = { bg: string; text: string; border: string; dot: string };
const ITEM_TOKENS: Record<'light' | 'contrast' | 'dark', Record<ItemDisplayStatus, ItemToken>> = {
  // 우측 패널 등 작은 pill = 기존 파스텔 그대로(변경 금지).
  light: {
    queued:   { bg: '#FFF7ED', text: '#D97706', border: '#FBBF24', dot: '#FBBF24' },
    cooking:  { bg: '#EFF6FF', text: '#2563EB', border: '#60A5FA', dot: '#60A5FA' },
    ready:    { bg: '#ECFDF5', text: '#059669', border: '#34D399', dot: '#34D399' },
    served:   { bg: '#059669', text: '#FFFFFF', border: '#047857', dot: '#FFFFFF' },
  },
  contrast: {
    queued:   { bg: '#D97706', text: '#FFFFFF', border: '#92400E', dot: '#FFFFFF' },
    cooking:  { bg: '#2563EB', text: '#FFFFFF', border: '#1E40AF', dot: '#FFFFFF' },
    ready:    { bg: '#16A34A', text: '#FFFFFF', border: '#14532D', dot: '#FFFFFF' },
    served:   { bg: '#047857', text: '#FFFFFF', border: '#064E3B', dot: '#FFFFFF' },
  },
  dark: {
    queued:   { bg: '#B45309', text: '#FFFFFF', border: '#FBBF24', dot: '#FBBF24' },
    cooking:  { bg: '#1D4ED8', text: '#FFFFFF', border: '#60A5FA', dot: '#60A5FA' },
    ready:    { bg: '#15803D', text: '#FFFFFF', border: '#4ADE80', dot: '#4ADE80' },
    served:   { bg: '#065F46', text: '#FFFFFF', border: '#34D399', dot: '#FFFFFF' },
  },
};
// 백워드 호환(기존 import 처). 라이트 토큰.
export const STATUS_TOKEN = ITEM_TOKENS.light;

// 솔리드(꽉 찬) 팔레트 — 아이템 리스트 좌측 큰 버튼($lg) + 카드 보더용. 액션버튼색 기준:
// 대기=amber / 조리=purple / 준비=green / 서빙=gray. 솔리드 채움 + 흰 글자.
export const ITEM_SOLID: Record<ItemDisplayStatus, ItemToken> = {
  queued:   { bg: '#F59E0B', text: '#FFFFFF', border: '#D97706', dot: '#FFFFFF' },
  cooking:  { bg: '#635BFF', text: '#FFFFFF', border: '#4F46E5', dot: '#FFFFFF' },
  ready:    { bg: '#10B981', text: '#FFFFFF', border: '#059669', dot: '#FFFFFF' },
  served:   { bg: '#6B7280', text: '#FFFFFF', border: '#4B5563', dot: '#FFFFFF' },
};
export function getItemStageColors(status: ItemDisplayStatus): ItemToken {
  return ITEM_TOKENS.light[status];
}

export const toDisplayStatus = (itemStatus?: string): ItemDisplayStatus => {
  switch (itemStatus) {
    case 'served':
    case 'completed':
      return 'served';
    case 'ready':
      return 'ready';
    case 'preparing':
      return 'cooking';
    case 'pending':
    default:
      return 'queued';
  }
};

export const ItemStatusPill = styled.button<{ $status: ItemDisplayStatus; $clickable: boolean; $lg?: boolean; $theme?: 'light' | 'contrast' | 'dark' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${p => p.$lg ? '7px' : '5px'};
  /* $lg = 서빙 리스트용 큰 터치 버튼(좌측, 높게). 기본 = 상세 패널용 작은 pill. */
  padding: ${p => p.$lg ? '0 16px' : '4px 9px 4px 7px'};
  border-radius: ${p => p.$lg ? '10px' : '999px'};
  font-size: ${p => p.$lg ? '14px' : '10px'};
  font-weight: ${p => p.$lg ? 800 : 700};
  letter-spacing: 0.3px;
  text-transform: uppercase;
  border: 1px solid ${p => (p.$lg ? ITEM_SOLID : ITEM_TOKENS.light)[p.$status].border};
  background: ${p => (p.$lg ? ITEM_SOLID : ITEM_TOKENS.light)[p.$status].bg};
  color: ${p => (p.$lg ? ITEM_SOLID : ITEM_TOKENS.light)[p.$status].text};
  cursor: ${p => p.$clickable ? 'pointer' : 'default'};
  transition: filter 0.15s, transform 0.1s, box-shadow 0.15s;
  white-space: ${p => p.$lg ? 'normal' : 'nowrap'};
  text-align: center;
  flex-shrink: 0;
  min-height: ${p => p.$lg ? '100%' : '24px'};
  /* $lg = 부모(고정폭 셀)를 꽉 채움 → 라벨 길이 달라도 폭 동일 → 뒤 내용 좌측정렬 일치. */
  ${p => p.$lg && 'width: 100%; align-self: stretch;'}
  user-select: none;
  appearance: none;
  font-family: inherit;
  line-height: 1.1;

  &::before {
    content: '';
    width: ${p => p.$lg ? '9px' : '6px'};
    height: ${p => p.$lg ? '9px' : '6px'};
    border-radius: 50%;
    background: ${p => (p.$lg ? ITEM_SOLID : ITEM_TOKENS.light)[p.$status].dot};
    flex-shrink: 0;
  }

  &:hover {
    ${p => p.$clickable && `
      filter: brightness(0.96);
      box-shadow: 0 0 0 3px ${(p.$lg ? ITEM_SOLID : ITEM_TOKENS.light)[p.$status].border}55;
    `}
  }
  &:active {
    ${p => p.$clickable && `transform: scale(0.97);`}
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${p => (p.$lg ? ITEM_SOLID : ITEM_TOKENS.light)[p.$status].border}aa;
  }
  &:disabled { cursor: default; }

  @media (max-width: 480px) {
    padding: 3px 7px 3px 6px;
    font-size: 9px;
    gap: 4px;
    min-height: 22px;
  }
`;
