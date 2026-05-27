// ============================================================================
// Design Token System — 프로젝트의 유일한 디자인 값 소스
// 모든 색상, 간격, 폰트 등은 반드시 이 파일에서 import하여 사용
// 하드코딩 금지: #635BFF → theme.colors.primary
// ============================================================================

export const theme = {
  colors: {
    // Brand
    primary: '#635BFF',
    primaryHover: '#5A51E6',
    primaryLight: 'rgba(99, 91, 255, 0.1)',
    primaryShadow: 'rgba(99, 91, 255, 0.3)',

    secondary: '#0A2540',
    secondaryLight: '#F1F4F8',

    // Backgrounds — 2026-05-26: slightly darker shop-floor pass for visual separation
    background: '#F9FAFB',     // was #F9FAFB
    backgroundAlt: '#F4F6F9',  // was #F4F6F9
    surface: '#FFFFFF',
    surfaceHover: '#F1F4F8',   // was #F1F4F8
    surfaceMuted: '#F1F4F8',   // was #F1F4F8

    // Text
    // 2026-05-26: shop-floor legibility pass — bumped greys one step darker after
    // on-site feedback that the lighter palette washed out under shop lighting.
    text: {
      primary: '#0A2540',
      secondary: '#374151',  // was #4B5563
      light: '#4B5563',      // was #8898AA
      muted: '#374151',      // was #4B5563
      dark: '#1F2937',       // was #1F2937
      placeholder: '#4B5563', // was #6B7280
    },

    // Status
    status: {
      success: '#28C76F',
      successAlt: '#059669',
      successAlt2: '#10B981',
      successLight: '#ECFDF5',
      successDark: '#15803D',
      warning: '#FF9F43',
      warningAlt: '#D97706',
      warningLight: '#FFF7ED',
      warningLightAlt: '#FEF3C7',
      error: '#EA5455',
      errorLight: '#FEF2F2',
      errorLightAlt: '#FEE2E2',
      info: '#00CFE8',
    },

    // Danger
    danger: '#DC2626',
    dangerHover: '#B91C1C',
    dangerLight: '#FEF2F2',
    dangerBorder: '#FCA5A5',
    dangerShadow: 'rgba(220, 38, 38, 0.3)',

    // Borders — 2026-05-26: one notch darker so cards/buttons stay legible under shop lighting
    border: '#C7CED6',       // was #C7CED6
    borderLight: '#6B7280',  // was #C7CED6
    borderHover: '#6B7280',  // was #64748B

    // Disabled
    disabled: {
      background: '#F1F4F8',
      text: '#6B7280',
      primaryBg: '#A5A0FF',
      dangerBg: '#FCA5A5',
    },
  },

  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    primaryHover: '0 4px 12px rgba(99, 91, 255, 0.3)',
    dangerHover: '0 4px 12px rgba(220, 38, 38, 0.3)',
  },

  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  // 컴포넌트별 토큰
  components: {
    button: {
      paddingSm: '8px 14px',
      paddingMd: '12px 20px',
      paddingLg: '16px 28px',
      iconSizeSm: '14px',
      iconSizeMd: '16px',
      iconSizeLg: '18px',
    },
    modal: {
      overlayBg: 'rgba(0, 0, 0, 0.5)',
      widthSm: '400px',
      widthMd: '600px',
      widthLg: '800px',
      headerPadding: '24px',
      bodyPadding: '24px',
      footerPadding: '20px 24px',
    },
  },
};

export type Theme = typeof theme;
