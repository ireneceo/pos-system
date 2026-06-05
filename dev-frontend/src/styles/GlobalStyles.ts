import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  /* Disabled state — must look obviously inactive (washed-out, not just "another grey").
     One global rule so every button/input across the app reads the same. */
  button:disabled,
  button[disabled],
  [aria-disabled='true'] {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Input background — every text/number/email/date input, textarea, and select uses a
     WHITE fill (Irene 2026-06-05: 회색 채움 폐기, 모든 입력란 흰 배경). 입력란임은 테두리로
     구분. 안내(placeholder/기본 선택값)는 회색 글자, 입력/선택 시 검정 글자(컴포넌트별 처리). */
  input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file']):not([type='image']):not([type='hidden']),
  textarea,
  select {
    font-family: inherit;
    outline: none;
    background-color: #FFFFFF;
  }

  input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file']):not([type='image']):not([type='hidden']):focus,
  textarea:focus,
  select:focus {
    background-color: #FFFFFF;
  }

  input:disabled, textarea:disabled, select:disabled {
    background-color: #F4F6F9;     /* very light grey so it doesn't compete with active fields */
    color: #C7CED6;                /* washed-out text — clearly "not editable" */
    border-color: #E9EDF2;
    cursor: not-allowed;
    opacity: 1;                    /* override the global button-disabled opacity:0.4 — inputs are clear enough */
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.text.secondary};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.text.primary};
  }

  /* Animations */
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes blink {
    0%, 50%, 100% {
      opacity: 1;
    }
    25%, 75% {
      opacity: 0.5;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* Utility Classes */
  .pulse {
    animation: pulse 2s infinite;
  }

  .blink {
    animation: blink 2s infinite;
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
`;