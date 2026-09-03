import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/**
 * 긴 본문을 목록에서 몇 줄만 보여주고, 넘치면 눌러서 펼친다.
 *
 * 왜 만들었나 (운영 문의 SUPP-2026-9449-255, with MIN Cafe):
 *   "시스템 문의 남길때 리스트에는 적정 텍스트길이로 잘라서 보여줘.
 *    상세 다보고 싶으면 클릭해서 보겠지. 리스트에는 엔터도 안쳐져서 어차피 가독성도 떨어지는데"
 *
 * 문의 목록은 역할별로 7벌 복제돼 있다. 같은 코드를 7번 넣으면 그 부채를 굳히는 것이라
 * 셀 하나로 만들어 7곳이 이것만 쓰게 한다.
 *
 * - 자르기는 CSS line-clamp — 글자 수로 자르면 언어마다 줄 수가 달라진다.
 * - "더 보기" 는 **실제로 넘칠 때만** 뜬다(짧은 본문에 죽은 버튼을 두지 않는다).
 * - 펼침/접힘은 이 컴포넌트 안에서만 산다. 행 클릭 등 바깥 동작과 겹치지 않게 이벤트를 멈춘다.
 */
const Body = styled.div<{ $lines: number; $open: boolean }>`
  white-space: pre-wrap;
  word-break: break-word;
  ${({ $open, $lines }) => $open ? '' : `
    display: -webkit-box;
    -webkit-line-clamp: ${$lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

const Toggle = styled.button`
  margin-top: 4px;
  padding: 0;
  border: 0;
  background: none;
  color: #635BFF;
  font-size: 12px;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

interface Props {
  text?: string | null;
  /** 접었을 때 보여줄 줄 수 (기본 2줄) */
  lines?: number;
  moreLabel: string;
  lessLabel: string;
  className?: string;
}

const ClampText: React.FC<Props> = ({ text, lines = 2, moreLabel, lessLabel, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 접힌 상태의 실제 높이로만 판정한다 — 펼친 뒤에는 항상 넘치지 않으므로 다시 재지 않는다.
    if (!open) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [text, lines, open]);

  if (!text) return null;

  return (
    <div className={className}>
      <Body ref={ref} $lines={lines} $open={open}>{text}</Body>
      {(overflows || open) && (
        <Toggle
          type="button"
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(v => !v); }}
        >
          {open ? lessLabel : moreLabel}
        </Toggle>
      )}
    </div>
  );
};

export default ClampText;
