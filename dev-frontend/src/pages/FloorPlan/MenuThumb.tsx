import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/**
 * MenuThumb — 공유 메뉴 썸네일 (Track A, 표시 전용).
 * src 있으면 이미지(lazy, cover). 없거나 로드 실패 시 → 이름 첫 글자 이니셜 플레이스홀더.
 * 이모지·아이콘 글리프 금지(디자인 가드). posDisplayTheme CSS 변수만 사용(라이트/고대비/다크 자동).
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §A-4.3.
 */

const Box = styled.div<{ $size: number; $radius: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  border-radius: ${p => p.$radius}px;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--pos-surface-2, #EDF1F5);
  border: 1px solid var(--pos-border, #C7CED6);
  display: flex;
  align-items: center;
  justify-content: center;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

const Initial = styled.span<{ $size: number }>`
  font-size: ${p => Math.max(11, Math.round(p.$size * 0.42))}px;
  font-weight: 700;
  color: var(--pos-text-muted, #6B7C93);
  text-transform: uppercase;
  line-height: 1;
  user-select: none;
`;

interface MenuThumbProps {
  src?: string | null;
  name: string;
  size: number;
  radius?: number;
  className?: string;
}

const MenuThumb: React.FC<MenuThumbProps> = ({ src, name, size, radius = 6, className }) => {
  const [failed, setFailed] = useState(false);
  // src 변경 시 실패 상태 리셋(같은 컴포넌트 재사용 케이스).
  useEffect(() => { setFailed(false); }, [src]);
  const showImg = !!src && !failed;
  const initial = (name || '').trim().charAt(0) || '?';
  return (
    <Box $size={size} $radius={radius} className={className} aria-hidden="true">
      {showImg ? (
        <img src={src as string} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <Initial $size={size}>{initial}</Initial>
      )}
    </Box>
  );
};

export default MenuThumb;
