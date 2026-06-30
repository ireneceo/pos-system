/**
 * POS 운영 페이지(POS Terminal / Floor Plan / KDS) 전용 "보기 색상" 토글.
 *
 * Irene 결정(2026-06-02): 밝게(light) / 고대비(contrast, 기본) / 어둡게(dark) 3-모드.
 * - 기기(매장 단말)별 기억 (localStorage 'pos_display_theme').
 * - 이 3페이지에만 적용 — 컨테이너에 data-pos-theme 속성을 걸고 CSS 변수로 색을 흘린다.
 *   (관리자 등 나머지 화면은 이 변수를 안 쓰므로 전혀 영향 없음.)
 * - styled-components 의 색을 var(--pos-*, fallback) 로 참조 → 속성만 바꾸면 즉시 전환.
 *
 * 새 색을 추가할 땐 세 팔레트 모두에 같은 키를 넣을 것.
 */
import { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';

export type PosThemeMode = 'light' | 'contrast' | 'dark';
export const POS_THEME_MODES: PosThemeMode[] = ['light', 'contrast', 'dark'];
const STORAGE_KEY = 'pos_display_theme';

export function getPosTheme(): PosThemeMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'contrast' || v === 'dark') return v;
  } catch { /* ignore */ }
  return 'contrast'; // 기본 = 고대비
}

export function setPosTheme(mode: PosThemeMode): void {
  try { localStorage.setItem(STORAGE_KEY, mode); } catch { /* ignore */ }
}

export const POS_THEME_LABELS: Record<PosThemeMode, string> = {
  light: 'Light',
  contrast: 'High Contrast',
  dark: 'Dark',
};

/**
 * 세 팔레트. 키는 의미(semantic) 기준.
 *  app-bg     : 페이지 전체 배경
 *  menu-bg    : 좌측 메뉴 영역 배경 (흰 카드가 떠 보이게)
 *  surface    : 카드/패널/헤더 등 기본 면 (흰색 계열)
 *  surface-2  : 스크롤 밴드 등 보조 면
 *  text       : 본문/제목 텍스트
 *  text-muted : 보조 텍스트
 *  border     : 테두리/구분선
 *  brand      : 브랜드 강조 (버튼/선택)
 *  brand-tint : 선택 상태 연한 배경
 *  brand-text : 선택 상태 글씨
 */
const PALETTES: Record<PosThemeMode, Record<string, string>> = {
  // 현재(밝게) = 기존 색 그대로
  light: {
    'app-bg': '#F9FAFB',
    'menu-bg': '#E4E9EF',
    'surface': '#FFFFFF',
    'surface-2': '#EDF1F5',
    'text': '#0A2540',
    'text-muted': '#4B5563',
    'border': '#C7CED6',
    'border-strong': '#B9C2CC',
    'brand': '#635BFF',
    'brand-tint': 'rgba(99, 91, 255, 0.10)',
    'brand-ghost': 'rgba(99, 91, 255, 0.07)',
    'option-bg': 'linear-gradient(135deg, #F1F4F8 0%, #F0F4FF 100%)',
    'brand-text': '#635BFF',
    'control': '#FFFFFF',     // 선택 박스(카테고리/주문유형) 기본 면
    'positive': '#10B981',    // Pay Later 등 긍정 액션
    'positive-tint': 'rgba(16, 185, 129, 0.12)',   // 서빙 완료 행 등 긍정 연한 배경
    'table-empty-bg': '#F1F4F8',     // 빈 테이블 카드(보드) — 라이트는 현재 값 그대로 보존
    'table-empty-border': '#6B7280',
    'table-empty-text': '#374151',
  },
  // 고대비 = 회색 배경 위 흰 면이 확 뜨고, 글씨 검정, 테두리 굵고 진하게 (밝은 매장/글레어 대응)
  contrast: {
    'app-bg': '#E7ECF2',
    'menu-bg': '#94A4B8',
    'surface': '#FFFFFF',
    'surface-2': '#C2CDDA',
    'text': '#000000',
    'text-muted': '#17212F',
    'border': '#3E4A5A',
    'border-strong': '#16202C',
    'brand': '#332AB8',
    'brand-tint': 'rgba(51, 42, 184, 0.18)',
    'brand-ghost': 'rgba(51, 42, 184, 0.10)',
    'option-bg': 'linear-gradient(135deg, #DFE5EE 0%, #E3E0FA 100%)',
    'brand-text': '#1E1675',
    'control': '#FFFFFF',
    'positive': '#0A7D57',
    'positive-tint': 'rgba(10, 125, 87, 0.18)',
    'table-empty-bg': '#D4DCE6',     // 고대비 — 회색 위 빈 테이블이 또렷하게
    'table-empty-border': '#3E4A5A',
    'table-empty-text': '#16202C',
  },
  // 어둡게 = elevation 모델(배경<패널<선택박스로 점점 밝게 → 자연 분리). 순백 대신 92% 톤.
  dark: {
    'app-bg': '#0E1626',
    'menu-bg': '#141F35',
    'surface': '#1F2A40',
    'surface-2': '#17223A',
    'text': '#EAF0F8',
    'text-muted': '#9AA8BE',
    'border': '#38465E',
    'border-strong': '#5A6A86',
    'brand': '#8B82E8',
    // 2026-06-28 (Irene "다크 보기 어렵다"): 선택 tint 가 #ECEAFF(흰색)이라 다크에서 선택박스가
    // 번쩍이고, 그 위/standalone brand-text #635BFF(어두운 보라)는 다크 면에서 대비 2:1대로 안 보였다.
    // tint=다크 위 반투명 보라, brand-text=밝은 보라 로 짝 교체 → 선택/강조 텍스트 가독성 확보.
    'brand-tint': 'rgba(139, 128, 255, 0.22)',
    'brand-ghost': 'rgba(158, 149, 245, 0.16)',
    'option-bg': 'rgba(139, 128, 255, 0.10)',
    'brand-text': '#C7C2FF',
    'control': '#2C3A56',
    'positive': '#10B981',
    'positive-tint': 'rgba(16, 185, 129, 0.16)',
    'table-empty-bg': '#1B2640',     // 어둡게 — 빈 테이블은 바닥보다 한 단계 밝은 어두운 카드
    'table-empty-border': '#46566F',
    'table-empty-text': '#9AA8BE',
  },
};

function vars(mode: PosThemeMode): string {
  return Object.entries(PALETTES[mode])
    .map(([k, v]) => `--pos-${k}: ${v};`)
    .join(' ');
}

/**
 * data-pos-theme 속성이 걸린 컨테이너 하위에 --pos-* 변수를 정의.
 * 운영 3페이지의 최상위 컨테이너에 <PosDisplayThemeStyle /> 를 한 번 렌더하고,
 * 컨테이너에 data-pos-theme={mode} 를 건다.
 */
export const PosDisplayThemeStyle = createGlobalStyle`
  [data-pos-theme="light"]    { ${vars('light')} }
  [data-pos-theme="contrast"] { ${vars('contrast')} }
  [data-pos-theme="dark"]     { ${vars('dark')} }
`;

/**
 * 모달/팝업은 createPortal 로 document.body 에 렌더돼 컨테이너의 data-pos-theme
 * 스코프를 벗어난다(→ --pos-* 변수가 안 닿아 라이트 기본색으로 "따로 놀던" 버그).
 * 운영 페이지(POS Terminal / Floor Plan) 마운트 동안 body 에도 같은 테마 속성을 걸어
 * body-portal 모달이 --pos-* 를 상속하게 한다. 언마운트/모드변경 시 복원.
 * (관리자 등 비-POS 페이지는 body 속성이 없어 var(..., fallback) 의 fallback=기존색 → 무영향.)
 */
export function usePosThemeOnBody(mode: PosThemeMode): void {
  useEffect(() => {
    const prev = document.body.getAttribute('data-pos-theme');
    document.body.setAttribute('data-pos-theme', mode);
    return () => {
      if (prev !== null) document.body.setAttribute('data-pos-theme', prev);
      else document.body.removeAttribute('data-pos-theme');
    };
  }, [mode]);
}
