/**
 * 계산대 앱 버전 배지(왼쪽 위 «app v…»). 앱 브릿지는 «페이지가 다 열린 뒤» 끼워 넣어지는데(MainActivity onPageLoaded),
 * App 은 그 뒤 다시 그려지지 않아 배지가 영영 안 떴다(2026-10-04 Irene 「앱에서 버전 안보여. 안드로이드앱이야」).
 * 처음 15초 동안 다시 확인하고, 버전 숫자는 비동기로 채워지므로 숫자가 들어올 때까지 읽는다.
 */
import React, { useEffect, useState } from 'react';

const read = (): string | null => {
  const p = (window as any).__NATIVE_PRINT;
  if (!p) return null;
  return String(p.version || '?');
};

const NativeVersionBadge: React.FC = () => {
  const [ver, setVer] = useState<string | null>(() => read());
  useEffect(() => {
    if (ver && ver !== '?') return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const v = read();
      if (v !== ver) setVer(v);
      if ((v && v !== '?') || tries >= 30) window.clearInterval(timer);   // 0.5초 × 30 = 15초
    }, 500);
    return () => window.clearInterval(timer);
  }, [ver]);
  if (!ver) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 2147483647, fontSize: '10px', lineHeight: '14px', padding: '1px 6px', background: 'rgba(99,91,255,0.92)', color: '#fff', borderBottomRightRadius: '6px', fontWeight: 700, letterSpacing: '0.3px', pointerEvents: 'none', fontFamily: 'monospace' }}>
      app v{ver}
    </div>
  );
};

export default NativeVersionBadge;
