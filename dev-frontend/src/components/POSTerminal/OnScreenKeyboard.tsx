import React, { useState } from 'react';

/**
 * 온스크린 키보드 (터치 POS 전용).
 * 매장 POS 는 물리 키보드가 없고 OS 터치키보드도 안 뜨는 기기가 많아(키오스크 등),
 * 화면에 직접 키보드를 띄운다. POS 테마(--pos-*) 토큰을 써서 밝게/고대비/어둡게 모두 가독.
 *
 * 키 이벤트(콜백) 방식 — 실제 텍스트 입력칸(textarea/input)은 호출부가 소유하고,
 * 이 키보드는 "어떤 키를 눌렀다"만 알린다. 그래서 직접 타이핑(물리 키보드·커서)과
 * 온스크린 키보드를 동시에 쓸 수 있고, 호출부가 커서 위치에 삽입할 수 있다.
 */

const ROWS_LOWER = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];
const ROWS_UPPER = ROWS_LOWER.map((r, i) => i === 0 ? r : r.map(k => k.toUpperCase()));

interface Props {
  onKey: (ch: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onEnter?: () => void;
}

const keyStyle: React.CSSProperties = {
  minWidth: 40, height: 48, flex: '1 1 0',
  fontSize: 18, fontWeight: 600, cursor: 'pointer',
  background: 'var(--pos-control, #FFFFFF)',
  color: 'var(--pos-text, #0A2540)',
  border: '1px solid var(--pos-border, #C7CED6)',
  borderRadius: 8, userSelect: 'none',
};

const OnScreenKeyboard: React.FC<Props> = ({ onKey, onBackspace, onSpace, onEnter }) => {
  const [shift, setShift] = useState(false);
  const rows = shift ? ROWS_UPPER : ROWS_LOWER;

  const press = (k: string) => {
    onKey(k);
    if (shift) setShift(false); // 한 글자 입력 후 shift 해제(표준 동작)
  };

  const specialStyle: React.CSSProperties = {
    ...keyStyle,
    background: 'var(--pos-surface-2, #EDF1F5)',
    fontSize: 15,
  };

  // 키 누름 시 textarea 포커스가 풀리지 않도록 onMouseDown 에서 preventDefault.
  const noBlur = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }} onMouseDown={noBlur}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {ri === 3 && (
            <button type="button" onClick={() => setShift(s => !s)}
              style={{ ...specialStyle, flex: '1.4 1 0', background: shift ? 'var(--pos-brand-tint, #EDE9FE)' : 'var(--pos-surface-2, #EDF1F5)', color: shift ? 'var(--pos-brand-text, #635BFF)' : 'var(--pos-text, #0A2540)' }}>
              ⇧
            </button>
          )}
          {row.map(k => (
            <button key={k} type="button" onClick={() => press(k)} style={keyStyle}>{k}</button>
          ))}
          {ri === 3 && (
            <button type="button" onClick={onBackspace} style={{ ...specialStyle, flex: '1.4 1 0' }}>⌫</button>
          )}
        </div>
      ))}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        <button type="button" onClick={onBackspace} style={{ ...specialStyle, flex: '1 1 0' }}>⌫</button>
        <button type="button" onClick={onSpace} style={{ ...keyStyle, flex: '5 1 0' }}>space</button>
        {onEnter && (
          <button type="button" onClick={onEnter}
            style={{ ...specialStyle, flex: '1.4 1 0', background: 'var(--pos-brand, #635BFF)', color: '#FFFFFF', border: 'none' }}>
            ↵
          </button>
        )}
      </div>
    </div>
  );
};

export default OnScreenKeyboard;
