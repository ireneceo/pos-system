import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// 공유 "품목 서빙" 칩 — Floor Plan 우측 패널과 Live Orders 상세가 동일하게 사용.
// 상태 표시(대기/조리중/준비완료/서빙완료) 겸 액션 버튼. 활성 주문이면 단계 무관하게
// 클릭→서빙완료(주방 ready 체크를 건너뜀). 누르면 토글(서빙 취소 = ready 로 복귀).
// KDS 표시전용 매장은 품목이 'pending' 에 머무르므로 단계 무관 클릭이 필수.

export type ItemDisplayStatus = 'queued' | 'cooking' | 'ready' | 'served';

// 단계색 = 전 화면 단일 소스(orderItemStatus)와 동일하게 정렬. 기존엔 조리중이 황색으로
// 갈라져 있어 LiveOrders 상세만 다르게 보였음(2026-06-05 통일). 대기=노랑/조리중=파랑/준비=초록.
// 단일 팔레트(Irene 확정 2026-06-05): 대기=amber/조리=purple/준비=green/서빙=gray.
const STATUS_TOKEN: Record<ItemDisplayStatus, { bg: string; text: string; border: string; dot: string }> = {
  queued:  { bg: '#FEF3C7', text: '#B45309', border: '#F59E0B', dot: '#F59E0B' },
  cooking: { bg: '#EDEBFF', text: '#4F46E5', border: '#635BFF', dot: '#635BFF' },
  ready:   { bg: '#D1FAE5', text: '#047857', border: '#10B981', dot: '#10B981' },
  served:  { bg: '#6B7280', text: '#FFFFFF', border: '#4B5563', dot: '#FFFFFF' },
};

/** raw order_item.status → 표시 토큰. 'completed' 는 레거시 데이터 = served 동일 처리. */
export function toItemDisplayStatus(itemStatus?: string): ItemDisplayStatus {
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
}

const Chip = styled.button<{ $status: ItemDisplayStatus; $clickable: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px 4px 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  border: 1px solid ${p => STATUS_TOKEN[p.$status].border};
  background: ${p => STATUS_TOKEN[p.$status].bg};
  color: ${p => STATUS_TOKEN[p.$status].text};
  cursor: ${p => (p.$clickable ? 'pointer' : 'default')};
  transition: filter 0.15s, transform 0.1s, box-shadow 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 24px;
  user-select: none;
  appearance: none;
  font-family: inherit;
  line-height: 1;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${p => STATUS_TOKEN[p.$status].dot};
    flex-shrink: 0;
  }

  &:hover {
    ${p => p.$clickable && `
      filter: brightness(0.96);
      box-shadow: 0 0 0 3px ${STATUS_TOKEN[p.$status].border}55;
    `}
  }
  &:active {
    ${p => p.$clickable && 'transform: scale(0.97);'}
  }
  &:disabled {
    opacity: 0.6;
  }
`;

interface ItemServeChipProps {
  /** raw order_item.status (pending/preparing/ready/served/completed) */
  status?: string;
  /** 활성 주문이어서 홀 직원이 토글 가능한지 */
  clickable: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}

const ItemServeChip: React.FC<ItemServeChipProps> = ({ status, clickable, disabled, onToggle }) => {
  const { t } = useTranslation('common');
  const ds = toItemDisplayStatus(status);
  const isServed = ds === 'served';
  const label = t(`itemServe.${ds}`);
  const title = clickable
    ? (isServed ? t('itemServe.tapToUndo') : t('itemServe.tapToServe'))
    : '';

  return (
    <Chip
      type="button"
      $status={ds}
      $clickable={clickable}
      onClick={() => clickable && onToggle && onToggle()}
      disabled={disabled || !clickable}
      aria-disabled={!clickable}
      aria-pressed={isServed}
      title={title}
    >
      {isServed ? '✓ ' : null}
      {label}
      {clickable && !isServed ? ` · ${t('itemServe.serveHint')}` : ''}
    </Chip>
  );
};

export default ItemServeChip;
