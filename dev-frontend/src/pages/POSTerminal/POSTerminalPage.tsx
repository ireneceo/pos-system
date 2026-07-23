import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
import { io, Socket } from 'socket.io-client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import OptionModal from '../../components/POSTerminal/OptionModal';
import POSSetModal from '../../components/POSTerminal/POSSetModal';
import OrderCompleteModal from '../../components/POSTerminal/OrderCompleteModal';
import CashierPinModal from '../../components/POSTerminal/CashierPinModal';
import DiscountPinModal from '../../components/POSTerminal/DiscountPinModal';
import OnScreenKeyboard from '../../components/POSTerminal/OnScreenKeyboard';
import { Modal as UIModal, ModalButton as UIModalButton } from '../../components/UI/Modal';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import AlertDialog from '../../components/Common/AlertDialog';
import NumberInputModal from '../../components/Common/NumberInputModal';
import { useOrders } from '../../contexts/OrderContext';
import { useStore } from '../../contexts/StoreContext';
import { useAutoPrintPoller } from '../../hooks/useAutoPrintPoller';
import { useMenu } from '../../contexts/MenuContext';
import { useCustomer } from '../../contexts/CustomerContext';
import { useStaff } from '../../contexts/StaffContext';
import { printBillViaRawBT, getPrinterSettings, getActiveBillPrinter } from '../../utils/billPrint';
import { useAuth } from '../../contexts/AuthContext';
import CustomerModal from '../../components/Customer/CustomerModal';
// StaffLoginModal removed - authentication handled by ProtectedRoute
import { normalizeCustomerName } from '../../utils/orderUtils';
import { getCurrencySymbol, formatCurrency } from '../../utils/currency';
import { PosDisplayThemeStyle, getPosTheme, setPosTheme, POS_THEME_MODES, PosThemeMode, usePosThemeOnBody } from '../../styles/posDisplayTheme';
import { formatDateTime, formatTime } from '../../utils/timezone';
import { useRestaurantId } from '../../hooks/useRestaurantId';
import { openCustomerDisplay, tryAutoReopen, isAutoOpenEnabled } from '../../utils/customerDisplay';
import OverflowMenu, { OverflowMenuItem } from '../../components/UI/OverflowMenu';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
const POSContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--pos-app-bg, var(--pos-surface-2, #F9FAFB));
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: var(--pos-surface, #FFFFFF);
  padding: 16px 32px;
  border-bottom: 1px solid var(--pos-border, #C7CED6);
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* 2026-06-28 (Irene): 10인치 태블릿(≤1280)에서 헤더 내용(직원·Customer Display·테마토글 등)이
     가로로 넘쳐 "레이아웃 나가던" 문제 — 고정 80px·nowrap 해제하고 줄바꿈 허용(넘치면 2줄). */
  @media (max-width: 1280px) {
    height: auto;
    max-height: none;
    flex-wrap: wrap;
    gap: 8px 12px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoImage = styled.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--pos-text, #0A2540);
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 1280px) {
    gap: 8px;
  }
`;

/* POS Terminal right-side buttons that collapse into kebab on narrow screens. */
const HeaderDesktopActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 1280px) {
    display: none;
  }
`;

const HeaderCompactActions = styled.div`
  display: none;

  @media (max-width: 1280px) {
    display: inline-flex;
  }
`;

// 상단 헤더 액션 버튼 통일 — 흰 버튼 + 테두리 + hover (Dashboard/Customer Display/Open Drawer).
const HeaderActionBtn = styled.button`
  height: 38px;
  box-sizing: border-box;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--pos-surface, #FFFFFF);
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--pos-text, #1F2937);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    border-color: var(--pos-brand, #635BFF);
    background: var(--pos-surface-2, #F4F6F9);
  }
`;

const StaffInfo = styled.div<{ clickable?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  padding: ${props => props.clickable ? '8px 12px' : '0'};
  border-radius: ${props => props.clickable ? '8px' : '0'};
  transition: all 0.2s;
  color: var(--pos-text-muted, #4B5563);
  white-space: nowrap;

  &:hover {
    background: ${props => props.clickable ? 'var(--pos-surface-2, #F4F6F9)' : 'transparent'};
    color: ${props => props.clickable ? 'var(--pos-text, #0A2540)' : 'var(--pos-text-muted, #4B5563)'};
  }

  /* 10인치 태블릿: 직원명만 두고 ▼ 만 — 한 줄 유지 */
  @media (max-width: 1280px) { padding: ${props => props.clickable ? '6px 8px' : '0'}; gap: 6px; }
`;

/* 좁은 화면(≤1280)에서 버튼 텍스트 라벨을 숨겨 아이콘만 남긴다 — 헤더 한 줄 유지. */
const BtnLabel = styled.span`
  @media (max-width: 1280px) { display: none; }
`;

const DateTime = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--pos-text-muted, #4B5563);
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
  display: inline-flex;
  align-items: baseline;
  gap: 6px;

  /* 10인치 태블릿: 날짜는 숨기고 시각만 — 폭 절약해 한 줄 유지 */
  @media (max-width: 1280px) {
    font-size: 13px;
    .pos-date { display: none; }
  }

  @media (max-width: 768px) {
    text-align: left;
    font-size: 13px;
  }
`;

const MainLayout = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const MenuSection = styled.div`
  flex: 1;
  /* 메뉴 리스트 배경 — 흰 메뉴 카드가 또렷이 떠 보이도록 진한 회색 (가독성) */
  background: var(--pos-menu-bg, #E4E9EF);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SearchSection = styled.div`
  background: var(--pos-surface, #FFFFFF);
  padding: 16px 24px;
  border-bottom: 1px solid var(--pos-border, #C7CED6);
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Segmented toggle (KDS Order/Item 토글과 동일 스타일 — 시스템 통일).
const ViewToggle = styled.div`
  display: flex;
  background: var(--pos-surface-2, #F1F4F8);
  border-radius: 6px;
  padding: 2px;
`;

const ViewToggleBtn = styled.button<{ active: boolean }>`
  padding: 5px 14px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.active ? 'var(--pos-surface, #FFFFFF)' : 'transparent'};
  color: ${props => props.active ? 'var(--pos-text, #0A2540)' : 'var(--pos-text-muted, #4B5563)'};
  box-shadow: ${props => props.active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'};
  flex-shrink: 0;
  white-space: nowrap;
`;

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 7px 16px 7px 40px;
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;
  /* 검색 입력란은 다크에서도 밝은 필드 + 진한 글자로 (입력 글자 가독성 — Irene 2026-06-02) */
  background: #FFFFFF;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: var(--pos-brand, #635BFF);
    box-shadow: 0 0 0 3px var(--pos-brand-tint, rgba(99,91,255,0.1));
  }

  &::placeholder {
    color: #8898AA;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: var(--pos-text-muted, #8898AA);
  font-size: 16px;
  pointer-events: none;
`;

const ClearSearchBtn = styled.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: var(--pos-surface-2, #F4F6F9);
  border-radius: 50%;
  color: var(--pos-text-muted, #4B5563);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: var(--pos-border, #C7CED6);
    color: var(--pos-text, #0A2540);
  }
`;

const NoResultsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--pos-text-muted, #4B5563);
  text-align: center;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .message {
    font-size: 14px;
    opacity: 0.8;
  }
`;

// 카테고리 바 — 칩 줄. 펼치기 화살표는 우측 전용 컬럼이 아니라 칩 줄 안의 작은 칩(맨 끝 인라인).
const CategoryBar = styled.div`
  background: var(--pos-surface, #FFFFFF);
  border-bottom: 1px solid var(--pos-border, #C7CED6);
`;
// 2026-06-28 (5-3): 카테고리는 한 줄 유지(nowrap) + ‹ › 페이지 이동. 스크롤바는 숨기고
// 터치 스와이프는 허용. 펼치기(여러 줄 wrap) 방식 폐지 — 메뉴 영역을 안 가리도록.
const CategoryTabs = styled.div<{ $expanded?: boolean }>`
  position: relative; /* 자식 offsetLeft 기준 = ‹ › 스냅 측정용 */
  display: flex;
  flex-wrap: ${props => props.$expanded ? 'wrap' : 'nowrap'};
  align-items: center;
  align-content: flex-start;
  flex: 1;
  min-width: 0;
  gap: 6px;
  /* 펼침: 그 자리에서 여러 줄로 완전히 펼침(메뉴를 밀어냄 — 토글로 다시 접음). 너무 많으면 자체 스크롤. */
  overflow-x: ${props => props.$expanded ? 'visible' : 'auto'};
  ${props => props.$expanded ? 'max-height: 42vh; overflow-y: auto; padding: 2px 0;' : ''}
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar { height: 0; width: 0; }
`;
// 2026-06-28 (5-3): 카테고리 페이저 — 칩 줄을 감싸 좌우 ‹ › + 페이지 표시.
const CategoryPager = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
`;
const CategoryPageBtn = styled.button`
  width: 36px;
  min-height: 44px;
  flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  border: none;
  background: transparent;
  color: var(--pos-border-strong, #6B7280); cursor: pointer; transition: all 0.15s;
  font-size: 22px; line-height: 1;
  border-radius: 8px;
  &:hover:not(:disabled) { background: #F5F6F8; color: var(--pos-brand, #635BFF); }
  &:disabled { opacity: 0.3; cursor: default; }
`;
// 2026-06-29: 카테고리 펼침/접힘 토글 버튼(▾/▴) — 그 자리에서 전체를 여러 줄로 펼침(팝업 아님).
const CategoryAllBtn = styled.button`
  flex-shrink: 0;
  width: 44px;
  min-height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--pos-border-strong, #B9C2CC);
  background: var(--pos-control, #FFFFFF);
  color: var(--pos-text, #1F2937);
  border-radius: 8px;
  font-size: 16px; line-height: 1;
  cursor: pointer; transition: all 0.15s;
  &:hover { border-color: var(--pos-brand, #635BFF); color: var(--pos-brand-text, #635BFF); background: var(--pos-brand-ghost, #F5F3FF); }
`;

// 카테고리 = 중요한 선택 → 상품 옵션(RadioButton)과 동일 디자인. 선택 = 브랜드 테두리+틴트+글씨, 기본 = 흰 박스+또렷 테두리.
// 2026-06-28 (5-2): 컴팩트 — min-height 48→44(터치 최소), padding 0 16→0 12, font 15→14.
const CategoryTab = styled.button<{ active: boolean }>`
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid ${props => props.active ? 'var(--pos-brand, #635BFF)' : 'var(--pos-border-strong, #B9C2CC)'};
  background: ${props => props.active ? 'var(--pos-brand-tint, rgba(99,91,255,0.1))' : 'var(--pos-control, #FFFFFF)'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  color: ${props => props.active ? 'var(--pos-brand-text, #635BFF)' : 'var(--pos-text, #1F2937)'};

  &:hover {
    border-color: var(--pos-brand, #635BFF);
    background: ${props => props.active ? 'var(--pos-brand-tint, rgba(99,91,255,0.1))' : 'var(--pos-brand-ghost, #F5F3FF)'};
    color: var(--pos-brand-text, #635BFF);
  }
`;

const MenuGrid = styled.div`
  flex: 1;
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-auto-rows: max-content;
  gap: 10px;
  overflow-y: auto;
  align-content: start;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--pos-surface-2, #F4F6F9);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`;

const MenuItem = styled.div<{ soldOut?: boolean }>`
  background: var(--pos-surface, #FFFFFF);
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  /* height:100% 제거 — grid auto-rows 가 stretch 시키지 않도록.
     같은 row 카드 옵션 일치는 grid default align-self:stretch 로 자연 처리.
     단일 카드 카테고리에서 카드가 grid container 까지 stretch 되는 부작용 차단. */

  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${props => props.soldOut && `
    opacity: 0.5;
    cursor: not-allowed;
    
    &::after {
      content: 'SOLD OUT';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #FF6B6B;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
  `}
`;

const MenuImage = styled.div<{ hasImage?: boolean }>`
  width: 100%;
  height: 80px;
  background: var(--pos-surface-2, #F4F6F9);
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.hasImage ? '0' : '36px'};
  color: #C7D2FE;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MenuName = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
  margin-bottom: 4px;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const MenuPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--pos-brand, #635BFF);
`;

const SetBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
  z-index: 1;
`;

const SetItemsPreview = styled.div`
  font-size: 10px;
  color: var(--pos-text-muted, #4B5563);
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`;

const MenuItemActions = styled.div`
  display: flex;
  margin-top: auto;   /* 카드 하단 정렬 — 제목 1줄/2줄 관계 없이 옵션 버튼 같은 위치 */
  padding-top: 12px;
  width: 100%;
`;

const OptionButton = styled.button`
  flex: 1;
  /* 운영서버 원래 옵션버튼 형태: 은은한 면(라이트=그라데이션/다크=평면) + 회색 테두리 + 보라 글자. */
  background: var(--pos-option-bg, linear-gradient(135deg, #F1F4F8 0%, #F0F4FF 100%));
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--pos-brand-text, #635BFF);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: var(--pos-brand, #635BFF);
    color: var(--pos-brand-text, #635BFF);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;


const OrderSection = styled.div`
  width: 400px;
  /* 패널 = 흰색. 상단(유형/고객/테이블)·하단(페이저/버튼) 고정 흰색,
     가운데 스크롤(품목/요약/할인)만 회색 밴드로 분리 — Irene 2026-06-02. */
  background: var(--pos-surface, #FFFFFF);
  border-left: 1px solid var(--pos-border, #C7CED6);
  display: flex;
  flex-direction: column;
`;

// 2026-06-28 (5-4): 고객검색 + 테이블넘버 + 게스트를 한 행에 묶음(좁으면 wrap). 세로공간 절약.
const TopControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  flex-wrap: wrap;
`;

// (Pager Number 섹션에서 재사용 — 5-4 후에도 유지)
const TableNumberSection = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TableNumberLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--pos-text-muted, #4B5563);
`;

const TableNumberSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 6px;
  font-size: 14px;
  width: 160px;
  background: var(--pos-surface, #FFFFFF);
  color: var(--pos-text, #0A2540);
  cursor: pointer;

  & option {
    background: var(--pos-surface, #FFFFFF);
    color: var(--pos-text, #0A2540);
  }

  &:focus {
    outline: none;
    border-color: var(--pos-brand, #635BFF);
  }
`;

const ScrollableOrderContent = styled.div`
  flex: 1;
  overflow-y: auto;
  /* 움직이는(스크롤) 가운데 영역 = 회색 밴드로 분리. 위/아래 고정 흰색과 구분. */
  background: var(--pos-surface-2, #EDF1F5);
  border-top: 1px solid var(--pos-border, #C7CED6);
  border-bottom: 1px solid var(--pos-border, #C7CED6);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--pos-surface-2, #F4F6F9);
  }

  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 2px;
  }
`;

const OrderItems = styled.div`
  padding: 12px 16px;
`;

const OrderItemsHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--pos-text-muted, #374151);
  margin-bottom: 8px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--pos-surface-2, #F4F6F9);
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--pos-text, #0A2540);
  margin-bottom: 4px;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ItemOptions = styled.div`
  font-size: 12px;
  color: var(--pos-text-muted, #4B5563);
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityBtn = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid var(--pos-border-strong, #B9C2CC);
  background: var(--pos-surface, #FFFFFF);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
  color: var(--pos-text-muted, #374151);
  transition: all 0.15s;

  &:hover {
    border-color: var(--pos-brand, #635BFF);
    color: var(--pos-brand, #635BFF);
  }

  &:active {
    background: var(--pos-brand-tint, #F0F4FF);
  }
`;

const Quantity = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
  min-width: 32px;
  text-align: center;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--pos-text, #0A2540);
  min-width: 52px;
  text-align: right;
`;

// 삭제 = 박스/배경 없이 아이콘만(공간 절약). 회색 → hover 시 빨강.
const DeleteBtn = styled.button`
  width: 28px;
  height: 40px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 1;
  color: var(--pos-text-muted, #9CA3AF);
  transition: color 0.15s;

  &:hover {
    color: #FF6B6B;
  }
`;

const OrderSummary = styled.div`
  padding: 14px 16px;
  border-top: 1px solid var(--pos-border, #C7CED6);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  color: var(--pos-text-muted, #4B5563);
`;

const SummaryValue = styled.span`
  font-weight: 500;
  color: var(--pos-text, #0A2540);
`;

const TotalRow = styled(SummaryRow)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid var(--pos-surface-2, #F4F6F9);
  
  ${SummaryLabel} {
    color: var(--pos-text, #0A2540);
  }
  
  ${SummaryValue} {
    color: var(--pos-brand, #635BFF);
  }
`;

const OrderActions = styled.div`
  padding: 12px 16px 16px;
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  min-height: 72px;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  
  ${props => {
    switch(props.variant) {
      case 'primary':
        return `
          background: var(--pos-brand, #635BFF);
          color: white;
          
          &:hover {
            background: #5243E0;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'danger':
        // Clear = 장바구니 비우기(파괴적 삭제/취소 아님) → 중립 회색.
        return `
          background: var(--pos-surface-2, #EAEEF3);
          color: var(--pos-text-muted, #374151);

          &:hover {
            background: var(--pos-border-strong, #DCE2EA);
          }
        `;
      default:
        // Pay Later — 솔리드 에메랄드. Pay Now(브랜드)와 동등한 강도(어느 쪽이 메인이든 매장 자유).
        return `
          background: var(--pos-positive, #10B981);
          color: #FFFFFF;

          &:hover {
            background: #0EA372;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }

          &:active {
            transform: translateY(0);
          }
        `;
    }
  }}
`;

const EmptyOrder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--pos-text-muted, #4B5563);
  padding: 40px;
  text-align: center;
  /* 빈 상태도 가운데 회색 영역 유지 (구조 일관) */
  background: var(--pos-surface-2, #EDF1F5);
  border-top: 1px solid var(--pos-border, #C7CED6);
  border-bottom: 1px solid var(--pos-border, #C7CED6);
`;


const EmptyText = styled.div`
  font-size: 14px;
`;

const DiscountSection = styled.div`
  padding: 12px 16px;
`;

const DiscountRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DiscountInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  /* 입력란은 다크에서도 밝은 필드 + 진한 글자 (입력 가독성 통일 — Irene) */
  background: #FFFFFF;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: var(--pos-brand, #635BFF);
  }

  &::placeholder {
    color: #8898AA;
  }
`;

const DiscountButton = styled.button`
  padding: 10px 16px;
  background: var(--pos-brand, #635BFF);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  
  &:hover {
    background: #5243E0;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuickDiscountButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const QuickDiscountBtn = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  background: ${props => props.active ? 'var(--pos-brand-tint, rgba(99,91,255,0.1))' : 'var(--pos-control, #FFFFFF)'};
  color: ${props => props.active ? 'var(--pos-brand, #635BFF)' : 'var(--pos-text, #1F2937)'};
  border: 1px solid ${props => props.active ? 'var(--pos-brand, #635BFF)' : 'var(--pos-border, #C7CED6)'};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${props => props.active ? 'var(--pos-brand, #635BFF)' : 'var(--pos-border-strong, #6B7280)'};
    background: ${props => props.active ? 'var(--pos-brand-tint, rgba(99,91,255,0.1))' : 'var(--pos-surface-2, #F9FAFB)'};
  }
`;

const AppliedCoupon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--pos-brand-tint, #F0F4FF);
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: var(--pos-brand, #635BFF);
`;

// 주문유형 = 중요한 선택 → 상품 옵션(RadioButton)과 동일 디자인 언어.
// 선택 = 브랜드 테두리 + 연한 브랜드 틴트 + 브랜드 글씨 / 기본 = 흰 박스 + 또렷한 테두리.
const OrderTypeToggle = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px 4px;
`;

const OrderTypeBtn = styled.button<{ active: boolean }>`
  flex: 1;
  min-height: 48px;
  background: ${props => props.active ? 'var(--pos-brand-tint, rgba(99,91,255,0.1))' : 'var(--pos-control, #FFFFFF)'};
  color: ${props => props.active ? 'var(--pos-brand-text, #635BFF)' : 'var(--pos-text, #1F2937)'};
  border: 1px solid ${props => props.active ? 'var(--pos-brand, #635BFF)' : 'var(--pos-border-strong, #B9C2CC)'};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;

  &:hover {
    border-color: var(--pos-brand, #635BFF);
    background: ${props => props.active ? 'var(--pos-brand-tint, rgba(99,91,255,0.1))' : 'var(--pos-brand-ghost, #F5F3FF)'};
    color: var(--pos-brand-text, #635BFF);
  }

  span {
    font-size: 18px;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;

  &:hover {
    color: #FF5252;
  }
`;

const CustomerSearchSection = styled.div`
  padding: 8px 16px;
`;

const CustomerSearchContainer = styled.div`
  position: relative;
`;

const CustomerSearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 8px;
  font-size: 14px;
  /* 입력란은 다크에서도 밝은 필드 + 진한 글자 (입력 가독성 통일 — Irene) */
  background: #FFFFFF;
  color: #1F2937;
  cursor: pointer;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--pos-brand, #635BFF);
    box-shadow: 0 0 0 3px var(--pos-brand-tint, rgba(99,91,255,0.1));
  }

  &:hover {
    border-color: var(--pos-border-strong, #6B7280);
  }

  &::placeholder {
    color: #8898AA;
  }
`;

const CustomerSearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--pos-text-muted, #8898AA);
  font-size: 14px;
  pointer-events: none;
`;

const CustomerSearchDropdown = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--pos-surface, #FFFFFF);
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${props => props.show ? 'block' : 'none'};
  margin-top: 4px;
`;

const CustomerSearchItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: var(--pos-surface-2, #F1F4F8);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CustomerItemName = styled.div`
  font-weight: 600;
  color: var(--pos-text, #0A2540);
  margin-bottom: 2px;
  font-size: 14px;
`;

const CustomerItemDetails = styled.div`
  font-size: 12px;
  color: var(--pos-text-muted, #4B5563);
`;

const SelectedCustomerDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--pos-brand-tint, #F0F4FF);
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  margin-top: 8px;
`;

const SelectedCustomerInfo = styled.div`
  flex: 1;
`;

const SelectedCustomerName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--pos-brand, #635BFF);
  margin-bottom: 2px;
`;

const SelectedCustomerMeta = styled.div`
  font-size: 12px;
  color: var(--pos-text-muted, #4B5563);
`;

// Pager Search Components (same style as Customer Search)
const PagerSearchContainer = styled.div`
  position: relative;
  width: 140px;
`;

const PagerSearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 6px;
  font-size: 14px;
  /* 입력란은 다크에서도 밝은 필드 + 진한 글자 (입력 가독성 통일 — Irene) */
  background: #FFFFFF;
  color: #1F2937;
  cursor: pointer;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--pos-brand, #635BFF);
    box-shadow: 0 0 0 3px var(--pos-brand-tint, rgba(99,91,255,0.1));
  }

  &:hover {
    border-color: var(--pos-border-strong, #6B7280);
  }

  &::placeholder {
    color: #8898AA;
  }
`;

const PagerSearchDropdown = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--pos-surface, #FFFFFF);
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${props => props.show ? 'block' : 'none'};
  margin-top: 4px;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F1F3F5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #A0AEC0;
  }
`;

const PagerSearchItem = styled.div`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;
  font-size: 14px;
  color: var(--pos-text, #0A2540);

  &:hover {
    background: var(--pos-surface-2, #F1F4F8);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ClearCustomerBtn = styled.button`
  background: none;
  border: none;
  color: var(--pos-brand, #635BFF);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    background: #E6F0FF;
  }
`;

interface MenuItemType {
  id: string;
  code?: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  soldOut?: boolean;
  image?: string;
  is_set_menu?: boolean;
  set_items?: Array<{
    menuItemId: number;
    name: string;
    quantity: number;
  }>;
  optionGroups?: string[];
}

interface SelectedOption {
  id: string;
  name: string;
  price: number;
}

interface OrderItemType {
  id: string;
  menuItem: MenuItemType;
  quantity: number;
  options?: string[];  // For display purposes (option names)
  selectedOptions?: SelectedOption[];  // For price calculation
  special_instructions?: string;  // 2026-06-28 (4-1) 품목별 메모 — 주방티켓/빌에 출력(billPrint)
}

const POSTerminalPage: React.FC = () => {
  const { t } = useTranslation('pos');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get('from') || '';
  const fromFloorPlan = fromParam === 'floor-plan' || fromParam === 'floor-plan-overlay';
  const isFloorPlanOverlay = fromParam === 'floor-plan-overlay';
  const initialTableFromUrl = searchParams.get('table');
  // 2026-05-27: tableId (Floor Plan v2 tables[].id) disambiguates same tableNumber across zones.
  // Bound to the order as floor_plan_table_id when creating dine-in orders from Floor Plan.
  const floorPlanTableIdFromUrl = searchParams.get('tableId');
  const { user, switchUser, logout: authLogout, canTakePayment } = useAuth();
  const restaurantId = useRestaurantId();
  const { addOrder } = useOrders();
  const { getTakeawayCharge, operationSettings, getStoreInfo } = useStore();
  const { categories: allCategories, menuItems, getItemsByCategory, loadMenuByCategory, isLoadingMenu, optionGroups: allOptionGroups, applyOptionSoldOut } = useMenu();

  // 2026-05-28 매장 critical: backend-driven auto-print polling. POSTerminal 은
  // MainLayout 안에 mount 안 되므로 (fullscreen route), 이 hook 으로 같은
  // polling 동작 보장.
  //
  // 2026-06-01 DUPLICATE-TICKET FIX: when POS runs as the Floor Plan iframe
  // OVERLAY, the PARENT FloorPlanPage ALSO mounts useAutoPrintPoller. Parent
  // window and iframe are separate JS realms, so the in-memory de-dupe
  // (window.__autoPrintInflight) is NOT shared — both pollers could fetch the
  // same needs_print order before either marked it printed → TWO physical
  // tickets ("가끔" = only when the two 5s poll phases overlap). The parent
  // already polls for this restaurant, so the overlay must NOT poll too. This
  // does NOT change the print METHOD/ROUTING — only suppresses the redundant
  // second poller. Standalone POS (not overlay) keeps polling as before.
  useAutoPrintPoller({ restaurantId: user?.restaurantId || (user as any)?.restaurant_id, enabled: !!(user?.restaurantId || (user as any)?.restaurant_id) && !isFloorPlanOverlay, getStoreInfo });

  // POS Terminal shows only active categories (customer-facing view)
  // 2026-06-12: 아이템이 전부 세트 구성 전용(set_only)인 카테고리는 탭째 숨김 —
  // 들어가도 주문 가능한 단품이 0개라 빈 탭만 보이기 때문. 아이템이 아예 없는
  // 카테고리는 기존처럼 표시(신규 카테고리 작성 흐름 유지).
  const categories = allCategories.filter(cat => {
    if (cat.isActive === false) return false;
    const catItems = menuItems.filter((i: any) => String(i.category) === String(cat.id));
    return catItems.length === 0 || catItems.some((i: any) => !i.set_only);
  });
  const {
    updateCustomerOrderStats,
    searchCustomers
  } = useCustomer();
  const { currentStaff, updateStaff } = useStaff();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // 카테고리 바 펼치기(전체 보기) — 토글로 열어두거나 닫음. 카테고리 선택해도 닫히지 않음(원할 때만 닫게).
  // 펼친 카테고리 탭은 닫기 전까지 유지 (새로고침/재진입에도). 기기별 저장.
  // 2026-06-28 (5-1): POS 풀스크린 — 주문 받을 때 상단 헤더를 숨겨 세로공간 확보. 기기별 기억.
  const [posFullscreen, setPosFullscreen] = useState<boolean>(() => {
    try { return localStorage.getItem('pos_fullscreen') === '1'; } catch { return false; }
  });
  const togglePosFullscreen = () => setPosFullscreen(v => {
    const nv = !v;
    try { localStorage.setItem('pos_fullscreen', nv ? '1' : '0'); } catch { /* ignore */ }
    return nv;
  });
  // 2026-06-29: 카테고리 = 기본 한 줄(스와이프 + ‹ › 스크롤). "펼침" 토글이면 그 자리에서 전체를
  // 여러 줄(wrap)로 완전히 펼침(팝업 아님). 페이지번호는 없앰(Irene).
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const catPageStartsRef = useRef<number[]>([0]); // 각 페이지 첫 칩의 scrollLeft (‹ › 스냅용)
  const [catPage, setCatPage] = useState<{ cur: number; total: number }>({ cur: 1, total: 1 });
  // 카테고리 펼침 상태는 기기별로 기억(localStorage) — 한 번 펼치면 재진입·카테고리 선택 후에도
  // 유지되고, 사용자가 ▾/▴ 로 직접 바꾸기 전까지 그대로. (Irene 2026-06-29)
  const [catExpanded, setCatExpanded] = useState<boolean>(() => {
    try { return localStorage.getItem('pos_cat_expanded') === '1'; } catch { return false; }
  });
  const toggleCatExpanded = useCallback(() => {
    setCatExpanded(v => {
      const next = !v;
      try { localStorage.setItem('pos_cat_expanded', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  }, []);
  const recomputeCatPage = useCallback(() => {
    const el = categoryTabsRef.current;
    if (!el) return;
    const vw = el.clientWidth || 1;
    const children = Array.from(el.children) as HTMLElement[];
    const starts: number[] = [];
    let pageStart = 0;
    children.forEach((child, i) => {
      const left = child.offsetLeft;
      const right = left + child.offsetWidth;
      if (i === 0) { pageStart = left; starts.push(left); return; }
      // 이 칩이 현재 페이지 뷰포트를 넘치면 → 이 칩을 새 페이지 시작으로(칩 잘림 방지).
      if (right - pageStart > vw + 1) { pageStart = left; starts.push(left); }
    });
    if (starts.length === 0) starts.push(0);
    catPageStartsRef.current = starts;
    const total = starts.length;
    // 현재 페이지 = 스크롤 위치에 가장 가까운 시작점. (마지막 페이지 start 가 maxScroll 을 넘어
    // 브라우저가 클램프해도 정확히 잡힘 — scrollLeft>=start 방식은 마지막 페이지를 못 잡았음.)
    const sl = el.scrollLeft;
    let cur = 1;
    let best = Infinity;
    for (let i = 0; i < starts.length; i++) {
      const d = Math.abs(sl - starts[i]);
      if (d <= best) { best = d; cur = i + 1; }
    }
    setCatPage(prev => (prev.cur === cur && prev.total === total) ? prev : { cur, total });
  }, []);
  const goCatPage = useCallback((page: number) => {
    const el = categoryTabsRef.current;
    if (!el) return;
    const starts = catPageStartsRef.current;
    const idx = Math.max(0, Math.min(starts.length - 1, page - 1));
    el.scrollTo({ left: starts[idx] || 0, behavior: 'smooth' });
  }, []);
  const scrollCatPage = (dir: -1 | 1) => goCatPage((catPage.cur || 1) + dir);
  // 오버플로/페이지 재계산 — 카테고리 변동/창 크기/풀스크린/펼침 토글(폭·줄바꿈 변동) 시. (rAF=칩 폭 측정 보장)
  useEffect(() => {
    const raf = requestAnimationFrame(() => recomputeCatPage());
    const onResize = () => recomputeCatPage();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [recomputeCatPage, categories.length, posFullscreen, catExpanded]);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [previousCategory, setPreviousCategory] = useState<string | null>(null); // 검색 전 카테고리 저장
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드 여부
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Auto-merge → 명시 선택 흐름: 결제 진행 시 같은 테이블에 진행 중 주문이 있으면
  // "기존 추가 / 별도 생성" 모달. POS default 는 별도 (백엔드 skipAutoMerge 자동).
  const [mergeableOrders, setMergeableOrders] = useState<any[]>([]);
  const [showMergeChoiceModal, setShowMergeChoiceModal] = useState(false);
  const [forceMergeOrderId, setForceMergeOrderId] = useState<number | null>(null);
  const [showOptionModal, setShowOptionModal] = useState(false);
  // 세트 v2(set_groups) 주문 모달
  const [showSetModal, setShowSetModal] = useState(false);
  const [setModalProduct, setSetModalProduct] = useState<any>(null);
  const [showOrderCompleteModal, setShowOrderCompleteModal] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<any>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string; discount: number} | null>(null);
  // Searchable coupon combobox (Takeaway pattern)
  const [availableCoupons, setAvailableCoupons] = useState<Array<{ id: number; code: string; name?: string; type?: string; value?: number | string; min_order?: number | string; valid_until?: string | null }>>([]);
  const [couponsLoaded, setCouponsLoaded] = useState(false);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  const [appliedDiscountPolicy, setAppliedDiscountPolicy] = useState<{name: string; discount: number; requiresApproval: boolean} | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showFeatureAlert, setShowFeatureAlert] = useState(false);
  const [showCouponError, setShowCouponError] = useState(false);
  // Initial order type is `dine-in` unless the URL says otherwise. Floor Plan's "+ Takeaway Walk-in"
  // pill navigates here with `?order_type=takeaway`, so we honor that on first mount.
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>(() => {
    const ot = searchParams.get('order_type');
    return ot === 'takeaway' ? 'takeaway' : 'dine-in';
  });
  const [tableNumber, setTableNumber] = useState('');
  const [guestCount, setGuestCount] = useState(0);
  const [availableTables, setAvailableTables] = useState<string[]>([]);

  // Floor Plan "Add Items" 진입 — URL mergeOrderId 가 있으면 기존 주문에 자동 머지(새 주문 생성 방지).
  useEffect(() => {
    const mid = searchParams.get('mergeOrderId');
    if (mid && /^\d+$/.test(mid)) setForceMergeOrderId(parseInt(mid, 10));
  }, [searchParams]);

  // 예약 체크인 (P2-6) — Floor Plan 에서 guests 쿼리로 진입하면 인원 prefill. 인쇄 무관.
  useEffect(() => {
    const g = searchParams.get('guests');
    if (g && /^\d+$/.test(g)) {
      const n = parseInt(g, 10);
      if (n > 0) setGuestCount(n);
    }
  }, [searchParams]);
  const [pagerNumber, setPagerNumber] = useState('');
  // 2026-06-26 (#11 리마크): 주문 전체 메모(알레르기·생일 등). 빠른선택 칩 + 자유입력.
  // 자동저장 = 작성 중 draft 를 매장별 localStorage 에 보존(탭 전환/새로고침에도 유지),
  // 주문 발행 시 비움. 품목별 메모(special_instructions)와 별개의 주문 단위 메모.
  const REMARK_DRAFT_KEY = `posOrderRemarkDraft_${restaurantId || 'x'}`;
  const [orderRemark, setOrderRemark] = useState<string>(() => {
    try { return localStorage.getItem(`posOrderRemarkDraft_${restaurantId || 'x'}`) || ''; } catch { return ''; }
  });
  useEffect(() => {
    try {
      if (orderRemark) localStorage.setItem(REMARK_DRAFT_KEY, orderRemark);
      else localStorage.removeItem(REMARK_DRAFT_KEY);
    } catch { /* ignore */ }
  }, [orderRemark, REMARK_DRAFT_KEY]);
  // #11 리마크 — 프리셋 + "이전에 쓴 리마크" 히스토리(매장별 localStorage). 칩 나열 대신
  // 입력란에 타이핑하면 프리셋+이전 리마크가 검색돼 선택(자동완성). 자유입력도 그대로 가능.
  const REMARK_PRESETS = useMemo(() => [
    t('pos:pOSTerminalPage.noteChips.noOnion', 'No onion'),
    t('pos:pOSTerminalPage.noteChips.lessSpicy', 'Less spicy'),
    t('pos:pOSTerminalPage.noteChips.noIce', 'No ice'),
    t('pos:pOSTerminalPage.noteChips.noRice', 'No rice'),
    t('pos:pOSTerminalPage.noteChips.allergy', 'Allergy'),
    t('pos:pOSTerminalPage.noteChips.birthday', 'Birthday'),
  ], [t]);
  const REMARK_HISTORY_KEY = `posOrderRemarkHistory_${restaurantId || 'x'}`;
  const [remarkHistory, setRemarkHistory] = useState<string[]>(() => {
    try { const a = JSON.parse(localStorage.getItem(`posOrderRemarkHistory_${restaurantId || 'x'}`) || '[]'); return Array.isArray(a) ? a : []; } catch { return []; }
  });
  // 2026-06-28 (4-1, Irene 재설계): 품목별 메모 = 버튼 → 팝업(온스크린 키보드). 작은 POS 가독 + 명시 저장.
  // 2026-06-29: 같은 팝업+키보드를 전체주문 메모(order mode)에도 재사용 (Irene 지시).
  const [memoModalItemId, setMemoModalItemId] = useState<string | null>(null);
  const [memoModalOrder, setMemoModalOrder] = useState<boolean>(false);
  const [memoDraft, setMemoDraft] = useState('');
  const setItemMemo = useCallback((id: string, text: string) => {
    setOrderItems(prev => prev.map(it => it.id === id ? { ...it, special_instructions: text } : it));
  }, []);
  const saveMemoModal = useCallback(() => {
    if (memoModalOrder) {
      // 전체주문 메모 — payload notes 로 발행, 오더티켓 "SPECIAL NOTES" 로 출력(billPrint).
      const v = memoDraft.trim();
      setOrderRemark(v);
    } else if (memoModalItemId) {
      setItemMemo(memoModalItemId, memoDraft.trim());
    }
    setMemoModalItemId(null);
    setMemoModalOrder(false);
    setMemoDraft('');
  }, [memoModalOrder, memoModalItemId, memoDraft, setItemMemo]);
  // 메모 textarea — 직접 타이핑(커서·물리키보드)과 온스크린 키보드를 함께 쓴다.
  // 온스크린 키는 "커서 위치"에 삽입(append 아님). 삽입 후 커서 복원.
  const memoTextareaRef = useRef<HTMLTextAreaElement>(null);
  const memoPendingCursor = useRef<number | null>(null);
  useEffect(() => {
    if (memoPendingCursor.current != null && memoTextareaRef.current) {
      const pos = memoPendingCursor.current;
      memoTextareaRef.current.focus();
      try { memoTextareaRef.current.setSelectionRange(pos, pos); } catch { /* noop */ }
      memoPendingCursor.current = null;
    }
  }, [memoDraft]);
  const memoInsert = (text: string) => {
    const el = memoTextareaRef.current;
    const s = el ? (el.selectionStart ?? memoDraft.length) : memoDraft.length;
    const e = el ? (el.selectionEnd ?? s) : memoDraft.length;
    memoPendingCursor.current = s + text.length;
    setMemoDraft(memoDraft.slice(0, s) + text + memoDraft.slice(e));
  };
  const memoBackspace = () => {
    const el = memoTextareaRef.current;
    const s = el ? (el.selectionStart ?? memoDraft.length) : memoDraft.length;
    const e = el ? (el.selectionEnd ?? s) : memoDraft.length;
    if (s === e) {
      if (s === 0) return;
      memoPendingCursor.current = s - 1;
      setMemoDraft(memoDraft.slice(0, s - 1) + memoDraft.slice(e));
    } else {
      memoPendingCursor.current = s;
      setMemoDraft(memoDraft.slice(0, s) + memoDraft.slice(e));
    }
  };
  // 발행된 리마크를 히스토리에 누적(중복 제거, 최신순, 최대 30). 콤마로 묶인 건 분해 저장.
  const pushRemarkHistory = useCallback((text: string) => {
    const parts = (text || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!parts.length) return;
    setRemarkHistory(prev => {
      const merged = [...parts, ...prev.filter(p => !parts.some(np => np.toLowerCase() === p.toLowerCase()))]
        .filter((v, i, a) => a.findIndex(x => x.toLowerCase() === v.toLowerCase()) === i)
        .slice(0, 30);
      try { localStorage.setItem(REMARK_HISTORY_KEY, JSON.stringify(merged)); } catch { /* ignore */ }
      return merged;
    });
  }, [REMARK_HISTORY_KEY]);
  const [pagerSearchQuery, setPagerSearchQuery] = useState('');
  const [showPagerDropdown, setShowPagerDropdown] = useState(false);
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  // Cashier quick switch (PIN → 실제 로그인 전환)
  const [showCashierPinModal, setShowCashierPinModal] = useState(false);
  // 할인 승인 PIN (#5) — 터치 numpad 모달 + 승인 후 적용할 보류 할인
  const [showDiscountPin, setShowDiscountPin] = useState(false);
  const [pendingDiscount, setPendingDiscount] = useState<{ name: string; value: number; kind?: 'fixed' | 'percent' } | null>(null);
  const [showCustomPercentModal, setShowCustomPercentModal] = useState(false);
  const [brandLogo, setBrandLogo] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [selectedCustomerForOrder, setSelectedCustomerForOrder] = useState<any>(null);
  const [apiSearchResults, setApiSearchResults] = useState<any[]>([]);
  const [isSearchingCustomers, setIsSearchingCustomers] = useState(false);
  const customerSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Currency and rounding settings
  const [currency, setCurrency] = useState<string>('RM');
  const [cashRounding, setCashRounding] = useState<number | null>(null);
  const [roundingApplyTo, setRoundingApplyTo] = useState<'cash_only' | 'all'>('cash_only');

  // Membership/Points state
  const [membershipSettings, setMembershipSettings] = useState<any>(null);
  const [customerPoints, setCustomerPoints] = useState(0);
  const [customerTier, setCustomerTier] = useState('Bronze');

  // Display mode: 'photo' (default — image card grid) vs 'simple' (text-only, denser grid)
  // Per-device toggle, saved to localStorage. Default per Irene 2026-05-22 = photo.
  const [displayMode, setDisplayMode] = useState<'photo' | 'simple'>(() => {
    try { return localStorage.getItem('pos_display_mode') === 'simple' ? 'simple' : 'photo'; }
    catch { return 'photo'; }
  });

  // 보기 색상 테마 (밝게/고대비/어둡게) — 기기별 저장. POS/FloorPlan/KDS 전용.
  const [posTheme, setPosThemeState] = useState<PosThemeMode>(getPosTheme);
  const selectPosTheme = (m: PosThemeMode) => { setPosThemeState(m); setPosTheme(m); };
  // body-portal 모달도 같은 테마를 따라가게 (고대비/다크 팝업 일관성).
  usePosThemeOnBody(posTheme);


  // Sort order applied to every category / mode / search result. Default = newest.
  type SortKey = 'newest' | 'name' | 'price_asc' | 'price_desc';
  const [sortBy, setSortBy] = useState<SortKey>(() => {
    try {
      const saved = localStorage.getItem('pos_sort_by') as SortKey | null;
      if (saved && ['newest', 'name', 'price_asc', 'price_desc'].includes(saved)) return saved;
    } catch { /* ignore */ }
    return 'newest';
  });
  const setSortByPersistent = (s: SortKey) => {
    setSortBy(s);
    try { localStorage.setItem('pos_sort_by', s); } catch { /* ignore */ }
  };
  const setDisplayModePersistent = (m: 'photo' | 'simple') => {
    setDisplayMode(m);
    try { localStorage.setItem('pos_display_mode', m); } catch { /* ignore */ }
    if (m === 'simple') {
      // Compact 모드 = 텍스트 only = 한꺼번에 다 보기 좋음. 자동 All 선택.
      if (!isSearchMode) {
        setSelectedCategory('all');
        loadMenuByCategory('all');
      }
    } else if (m === 'photo' && selectedCategory === 'all' && !isSearchMode && categories.length > 0) {
      // Image 모드 = 카테고리별 (사진 동시 로딩 비용). 'all' 이면 첫 카테고리로.
      const firstCategoryId = categories[0].id;
      setSelectedCategory(firstCategoryId);
      loadMenuByCategory(firstCategoryId);
    }
  };

  // Progressive rendering state
  const PROGRESSIVE_THRESHOLD = 50;
  const INITIAL_RENDER_COUNT = 40;
  const LOAD_MORE_COUNT = 30;
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Brand logo: 고정 파일 경로 사용
  useEffect(() => {
    setBrandLogo('/uploads/logos/brand-logo.png');

    const handleBrandLogoUpdate = () => {
      setBrandLogo(`/uploads/logos/brand-logo.png?v=${Date.now()}`);
    };

    window.addEventListener('brandLogoUpdated', handleBrandLogoUpdate);
    return () => {
      window.removeEventListener('brandLogoUpdated', handleBrandLogoUpdate);
    };
  }, []);

  // Customer Display auto-reopen (one-shot on next user gesture if pref enabled).
  // 2026-06-24 (Irene): 결제 권한(canTakePayment) 있는 직원만 자동오픈. 고객 디스플레이는 결제(고객에게
  // 주문/금액 보여주기)용이라, 주문만 하고 결제 안 하는 서버(홀) 역할에는 안 뜬다. POS 기능(주문)=access_pos
  // 와 별개 — 결제 권한 기준.
  useEffect(() => {
    if (!user?.restaurantId) return;
    if (!canTakePayment) return;
    return tryAutoReopen(user.restaurantId);
  }, [user?.restaurantId, canTakePayment]);

  // activeCashier 제거 - PIN 전환 시 AuthContext user가 직접 교체됨

  // 초기 카테고리 설정: displayMode 따라 분기.
  // Compact 모드는 항상 'all' (텍스트 only — 메뉴 다 보기 자연스러움).
  // Image 모드는 첫 카테고리 (사진 동시 로딩 비용 회피).
  useEffect(() => {
    if (categories.length === 0 || selectedCategory !== null) return;
    if (displayMode === 'simple') {
      setSelectedCategory('all');
      loadMenuByCategory('all');
    } else {
      const firstCategoryId = categories[0].id;
      setSelectedCategory(firstCategoryId);
      loadMenuByCategory(firstCategoryId);
    }
  }, [categories, selectedCategory, displayMode, loadMenuByCategory]);

  // Photo 모드는 "All" 카테고리 미지원 (이미지 동시 로드 비용). 만약 Simple→Photo 전환 시
  // 'all' 이 선택되어 있으면 첫 카테고리로 자동 폴백.
  useEffect(() => {
    if (displayMode === 'photo' && selectedCategory === 'all' && !isSearchMode && categories.length > 0) {
      const firstCategoryId = categories[0].id;
      setSelectedCategory(firstCategoryId);
      loadMenuByCategory(firstCategoryId);
    }
  }, [displayMode, selectedCategory, isSearchMode, categories, loadMenuByCategory]);

  // 카테고리 변경 시 해당 카테고리 메뉴 로딩
  const handleCategorySelect = (categoryId: string) => {
    if (isSearchMode) {
      // 검색 모드에서 탭 클릭하면 검색 모드 해제
      setIsSearchMode(false);
      setSearchQuery('');
    }
    setSelectedCategory(categoryId);
    loadMenuByCategory(categoryId);
  };

  // 검색어 입력 처리
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      // 검색 모드 진입: 현재 카테고리 저장 후 전체 검색
      if (!isSearchMode) {
        setPreviousCategory(selectedCategory);
        setIsSearchMode(true);
        setSelectedCategory(null); // 탭 선택 해제
        // 전체 메뉴 로딩 (검색용)
        loadMenuByCategory('all');
      }
    } else {
      // 검색어 지움: 이전 카테고리로 복귀
      if (isSearchMode) {
        setIsSearchMode(false);
        const restoreCategory = previousCategory || categories[0]?.id || null;
        setSelectedCategory(restoreCategory);
        setPreviousCategory(null);
      }
    }
  };

  // 검색 클리어 버튼
  const handleClearSearch = () => {
    setSearchQuery('');
    if (isSearchMode) {
      setIsSearchMode(false);
      const restoreCategory = previousCategory || categories[0]?.id || null;
      setSelectedCategory(restoreCategory);
      setPreviousCategory(null);
    }
  };

  // 선택된 카테고리가 삭제된 경우 처리
  // 단 'all' 은 가상 카테고리 (Compact 모드 전용) — 실제 카테고리 목록에 없어도 유효.
  useEffect(() => {
    if (categories.length > 0 && selectedCategory && selectedCategory !== 'all' && !isSearchMode && !categories.find(cat => cat.id === selectedCategory)) {
      setSelectedCategory(categories[0]?.id || null);
    }
  }, [categories, selectedCategory, isSearchMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load table settings from DB
    const loadTableSettings = async () => {
      if (user?.restaurantId) {
        try {
          const response = await fetch(`/api/restaurants/${user.restaurantId}`, {
            credentials: 'include'
          });
          if (response.ok) {
            const data = await response.json();
            const restaurant = data.data || data;
            // v3.39 hotfix #2: table identifiers come from the v2 floor_plan (each table's `label`
            // or `tableNumber`), NOT from the legacy `table_settings.tablePrefix + totalTables`
            // pool. Old pool was out-of-sync with Zones & Groups (prefix B/T/A 등) and produced
            // table dropdowns that didn't match the actual floor plan.
            const enableTableNumbers = restaurant.table_settings?.enableTableNumbers !== false;
            if (enableTableNumbers && restaurant.floor_plan?.tables) {
              const allTables = (restaurant.floor_plan.tables || [])
                .filter((t) => t && (t.tableType === undefined || t.tableType === 'table'))
                .map((t) => t.label || t.tableNumber)
                .filter(Boolean);
              setAvailableTables(allTables);
            } else if (enableTableNumbers && restaurant.table_settings) {
              // Fallback for restaurants that never set up Zones & Groups (no floor_plan.tables yet).
              const { totalTables, tablePrefix } = restaurant.table_settings;
              if (totalTables) {
                const tables = [];
                for (let i = 1; i <= totalTables; i++) {
                  tables.push(`${tablePrefix || ''}${String(i).padStart(3, '0')}`);
                }
                setAvailableTables(tables);
              }
            }
          }
        } catch (error) {
          console.error('Failed to load table settings:', error);
        }
      }
    };

    loadTableSettings();
  }, [user?.restaurantId]);

  // Set initial table from floor plan URL param.
  // v3.37 Floor Plan v2 (group prefixes O/I/P 등) 는 매장 옛 table_settings.tablePrefix
  // 로 생성된 availableTables 와 mismatch 가능. fromFloorPlan 일 때는 사용자가 직접 클릭한
  // 식별자를 신뢰하고 강제 setTableNumber 한다 — 그렇지 않으면 주문이 빈 table 로 생성되어
  // Floor Plan 에 attach 되지 않는 버그가 재현됨.
  // 2026-06-11 (Irene): URL 의 table 파라미터가 명시적 Takeaway 선택을 덮어쓰면 안 된다.
  // "+ Takeaway Walk-in" 진입은 order_type=takeaway 를 함께 넘기므로, 테이블이 붙어도
  // takeaway 를 유지한다(takeaway-with-table → Takeout 리스트에 정상 노출). 또한 dine-in
  // 강제를 최초 1회로 한정해, availableTables 비동기 로드가 사용자의 나중 Takeaway 토글을
  // 다시 dine-in 으로 되돌리던 레이스도 막는다.
  const tableOrderTypeInitRef = useRef(false);
  useEffect(() => {
    if (!initialTableFromUrl) return;
    if (fromFloorPlan || availableTables.length === 0 || availableTables.includes(initialTableFromUrl)) {
      setTableNumber(initialTableFromUrl);
      if (!tableOrderTypeInitRef.current) {
        tableOrderTypeInitRef.current = true;
        if (searchParams.get('order_type') !== 'takeaway') setOrderType('dine-in');
      }
    }
  }, [initialTableFromUrl, availableTables, fromFloorPlan]);

  // Load payment settings and currency settings from restaurant API
  useEffect(() => {
    const loadPaymentSettings = async () => {
      if (user?.restaurantId) {
        try {
          const response = await fetch(`/api/restaurants/${user.restaurantId}`);
          if (response.ok) {
            const data = await response.json();
            const restaurant = data.data || data;
            if (restaurant.payment_settings) {
              setPaymentMethods(restaurant.payment_settings);
            }
            // Load currency settings — store the SYMBOL (RM, ₩…) not the ISO code,
            // so all displays show the user's local convention (MYR→RM 무조건).
            setCurrency(getCurrencySymbol(restaurant.currency || 'MYR'));
            setCashRounding(restaurant.cash_rounding ? parseFloat(restaurant.cash_rounding) : null);
            setRoundingApplyTo(restaurant.rounding_apply_to || 'cash_only');
          }
        } catch (error) {
          console.error('Failed to load payment settings:', error);
        }
      }
    };

    loadPaymentSettings();
  }, [user?.restaurantId]);

  // Load membership settings
  useEffect(() => {
    const loadMembershipSettings = async () => {
      if (user?.restaurantId) {
        try {
          const token = getAuthToken();
          const response = await fetch(`/api/membership/settings/${user.restaurantId}`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              setMembershipSettings(data.data);
              console.log('✅ Membership settings loaded for POS:', data.data);
            }
          }
        } catch (error) {
          console.error('Failed to load membership settings:', error);
        }
      }
    };

    loadMembershipSettings();
  }, [user?.restaurantId]);

  // Load customer points when a customer is selected
  useEffect(() => {
    const loadCustomerPoints = async () => {
      if (user?.restaurantId && selectedCustomerForOrder?.id) {
        try {
          const token = getAuthToken();
          const response = await fetch(`/api/membership/customer/${user.restaurantId}/${selectedCustomerForOrder.id}`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              setCustomerPoints(data.data.points || 0);
              setCustomerTier(data.data.loyalty_tier || 'Bronze');
              console.log('✅ Customer points loaded:', data.data.points, 'Tier:', data.data.loyalty_tier);
            }
          }
        } catch (error) {
          console.error('Failed to load customer points:', error);
        }
      } else {
        // Reset points when no customer selected
        setCustomerPoints(0);
        setCustomerTier('Bronze');
      }
    };

    loadCustomerPoints();
  }, [user?.restaurantId, selectedCustomerForOrder?.id]);

  // Filter menu items based on category and search query
  const getFilteredItems = () => {
    let items: typeof menuItems = [];

    if (isSearchMode) {
      // 검색 모드: 전체 메뉴에서 검색
      const query = searchQuery.toLowerCase().trim();
      items = menuItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        (item.code && item.code.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    } else if (selectedCategory === 'all') {
      // All 탭: 모든 활성 카테고리 메뉴 합치기
      items = menuItems.filter(item => !item.isInactive);
    } else if (selectedCategory) {
      // 일반 모드: 선택된 카테고리 메뉴만 표시
      items = getItemsByCategory(selectedCategory);
    }

    // 세트 구성 전용 단품(set_only)은 단품 주문 불가 — POS 그리드에서 숨김 (2026-06-12).
    // 세트 구성으로는 POSSetModal(set_groups_resolved)이 product_id 로 직접 resolve 하므로 무관.
    items = items.filter((item: any) => !item.set_only);

    // 정렬 적용 — 모든 카테고리 / 검색 / All 결과에 일관 적용.
    // mutate 회피 위해 slice() 로 카피.
    const sorted = items.slice();
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'price_asc':
        sorted.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price_desc':
        sorted.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'newest':
      default: {
        // createdAt DESC (최신순). createdAt 없으면 id DESC fallback.
        sorted.sort((a, b) => {
          const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (tb !== ta) return tb - ta;
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        });
        break;
      }
    }
    return sorted;
  };
  
  const filteredMenuItems = getFilteredItems();

  // Progressive rendering - only activate for large lists (50+ items)
  const useProgressive = filteredMenuItems.length > PROGRESSIVE_THRESHOLD;

  // Reset visible count when category or search changes
  useEffect(() => {
    setVisibleCount(INITIAL_RENDER_COUNT);
  }, [selectedCategory, searchQuery]);

  // Intersection Observer for progressive loading - only when needed
  useEffect(() => {
    if (!useProgressive) return;

    const trigger = loadMoreTriggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + LOAD_MORE_COUNT);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [useProgressive, visibleCount, filteredMenuItems.length]);

  // 2026-06-04 (Irene): 세트면 무조건 선택 모달을 연다. 이전엔 메뉴 LIST 아이템에 set_groups 가
  // 실려야만(=Array.isArray) 모달을 띄웠는데, lazy 카테고리 로드/머지 dedup 등으로 그 한 필드가
  // 누락되면 isV2Set=false → 레거시 set_items 전체 확장(15개·옵션X·한국녹차 누락)으로 저장되는
  // 버그가 매장에서 반복됐다. POSSetModal 은 열릴 때 /api/menu/product/:id 의 set_groups_resolved
  // 를 직접 fetch·resolve 하므로(LIST 의존 X), is_set_menu 만으로 열어도 항상 정확히 캡처된다.
  // set_groups 가 진짜 없는 레거시 세트는 모달 내부에서 set_items 폴백으로 처리(깨짐 없음).
  const isV2Set = (mi: any) => !!mi?.is_set_menu;

  // 세트 v2 모달 확정 → 카트 적재 (가격은 priced selectedOptions 로 기존 POS 가격식에 합산)
  const handleConfirmSet = (quantity: number, result: { setComponents: any[]; selectedOptions: { name: string; price: number }[]; optionsDisplay: string[]; setLevelOptions: string[] }) => {
    if (!setModalProduct) return;
    setOrderItems([...orderItems, {
      id: `order-${Date.now()}`,
      menuItem: setModalProduct,
      quantity,
      // options = 세트 자체 옵션(A) 만. 구성품(B)은 set_components 로 분리 (인쇄/표시 단일소스).
      options: result.setLevelOptions.length > 0 ? result.setLevelOptions : undefined,
      selectedOptions: result.selectedOptions as any,
      set_components: result.setComponents
    } as any]);
    setShowSetModal(false);
    setSetModalProduct(null);
  };

  // ── POS 품절(sold-out) 토글 (#4) — 메뉴 타일 길게누르기 ──
  const [soldOutOverride, setSoldOutOverride] = useState<Record<string, boolean>>({});
  const lpTimer = useRef<any>(null);
  const lpFired = useRef(false);
  const effSoldOut = (item: any) => soldOutOverride[item.id] ?? item.soldOut;

  const handleToggleSoldOut = async (item: any) => {
    const cur = effSoldOut(item);
    const next = !cur;
    setSoldOutOverride(p => ({ ...p, [item.id]: next })); // 낙관적 즉시 반영
    try {
      const res = await fetch(`/api/menu/product/${item.id}/toggle-soldout?restaurantId=${restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ soldOut: next })
      });
      if (!res.ok) throw new Error('toggle failed');
    } catch {
      setSoldOutOverride(p => ({ ...p, [item.id]: cur })); // 실패 시 원복
    }
  };
  const startLongPress = (item: any) => {
    lpFired.current = false;
    lpTimer.current = setTimeout(() => { lpFired.current = true; handleToggleSoldOut(item); }, 600);
  };
  const cancelLongPress = () => { if (lpTimer.current) { clearTimeout(lpTimer.current); lpTimer.current = null; } };

  // 전 POS/모바일 실시간 반영 — 다른 기기가 토글하면 회색 처리
  useEffect(() => {
    if (!restaurantId) return;
    const s = io('/orders', { transports: ['websocket', 'polling'], auth: { token: getAuthToken() } });
    s.on('connect', () => s.emit('join-restaurant', restaurantId));
    s.on('product-soldout', (d: { id: number; soldOut: boolean }) => {
      setSoldOutOverride(p => ({ ...p, [String(d.id)]: d.soldOut }));
    });
    // 2026-06-28 (2-1 M1): 옵션 품절 실시간 — 타 기기 토글을 공유 optionGroups 에 반영.
    s.on('option-soldout', (d: { id: number; soldOut: boolean }) => {
      applyOptionSoldOut(String(d.id), d.soldOut);
    });
    return () => { s.disconnect(); };
  }, [restaurantId]);

  // 이 상품에 "필수" 옵션 그룹이 하나라도 있나? (OptionModal 의 해석 규칙과 동일 — id 느슨 매칭)
  const itemRequiresOptions = (menuItem: MenuItemType): boolean => {
    const groups = (menuItem as any).optionGroups;
    if (!Array.isArray(groups) || groups.length === 0) return false;
    const ids = groups.map((g: any) => String(g));
    return (allOptionGroups || []).some((g: any) => ids.includes(String(g.id)) && g.required);
  };

  const handleAddItemDirectly = (menuItem: MenuItemType) => {
    if (effSoldOut(menuItem)) return;
    // 세트 v2 → 선택 모달 (구성품 택1/옵션 선택 필요)
    if (isV2Set(menuItem)) { setSetModalProduct(menuItem); setShowSetModal(true); return; }
    // 필수 옵션이 있는 상품은 카드 어디를 눌러도 옵션 모달을 띄운다 (Irene 2026-06-10):
    // 옵션 미선택 상태로 주문이 들어가 혼란이 생기던 문제 방지. OptionModal 이 필수 미선택 시
    // 확인 버튼을 막으므로(line 116-118) 옵션 없이는 담을 수 없다. (필수옵션 없는 상품은 그대로 바로담기.)
    if (itemRequiresOptions(menuItem)) { setSelectedMenuItem(menuItem); setShowOptionModal(true); return; }

    // For set menus, convert set_items to options format (as strings)
    let setMenuOptions: string[] = [];
    if (menuItem.is_set_menu && menuItem.set_items && menuItem.set_items.length > 0) {
      setMenuOptions = menuItem.set_items.map(item => {
        const itemDetails = menuItems.find(m => parseInt(m.id) === item.menuItemId);
        const itemCode = itemDetails?.code;
        return `${itemCode ? `${itemCode} ` : ''}${item.name} x${item.quantity}`;
      });
    }

    // Add directly without options (use default options for items that have them)
    const existingItem = orderItems.find(item =>
      item.menuItem.id === menuItem.id && (!item.options || item.options.length === 0) && !menuItem.is_set_menu
    );

    if (existingItem && !menuItem.is_set_menu) {
      setOrderItems(orderItems.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // 2026-06-03: 세트는 구성품(set_components)을 반드시 실어, 카운터 직접인쇄(로컬 장바구니
      // 기준)에서도 구성품이 각자 주방으로 분배되게 한다. 이름만 있어도 billPrint 의
      // _bucketItemsByStation 가 menuStationMap 으로 라우팅한다. (백엔드 stationEnrichment 가
      // DB 저장분을 같은 규칙으로 한 번 더 보장 — 모든 경로 멱등. The Fire SET5 사고 방지.)
      const setComps = (menuItem.is_set_menu && Array.isArray(menuItem.set_items) && menuItem.set_items.length > 0)
        ? menuItem.set_items.map((si: any) => ({ name: si.name, qty: si.quantity || 1, product_id: si.menuItemId != null ? si.menuItemId : null, options: [] }))
        : undefined;
      setOrderItems([...orderItems, {
        id: `order-${Date.now()}`,
        menuItem,
        quantity: 1,
        options: setMenuOptions.length > 0 ? setMenuOptions : undefined,
        ...(setComps ? { set_components: setComps } : {})
      } as any]);
    }
  };

  const handleShowOptions = (menuItem: MenuItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (menuItem.soldOut) return;
    // 세트 v2 → 선택 모달
    if (isV2Set(menuItem)) { setSetModalProduct(menuItem); setShowSetModal(true); return; }

    setSelectedMenuItem(menuItem);
    setShowOptionModal(true);
  };

  const handleConfirmOptions = (quantity: number, selectedOptions: string[], selectedOptionsData: SelectedOption[]) => {
    if (!selectedMenuItem) return;

    // For set menus, add set items to options array (for display purposes)
    // Regular options (like spice level) are also included
    let finalOptions = [...selectedOptions];

    if (selectedMenuItem.is_set_menu && selectedMenuItem.set_items && selectedMenuItem.set_items.length > 0) {
      const setMenuOptions = selectedMenuItem.set_items.map(item => {
        const itemDetails = menuItems.find(m => parseInt(m.id) === item.menuItemId);
        const itemCode = itemDetails?.code;
        return `${itemCode ? `${itemCode} ` : ''}${item.name} x${item.quantity}`;
      });
      // Set items first, then regular options
      finalOptions = [...setMenuOptions, ...selectedOptions];
    }

    // Check if same item with same options exists
    const optionsKey = finalOptions.sort().join(',');
    const existingItem = orderItems.find(item =>
      item.menuItem.id === selectedMenuItem.id &&
      item.options?.sort().join(',') === optionsKey
    );

    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        id: `order-${Date.now()}`,
        menuItem: selectedMenuItem,
        quantity: quantity,
        options: finalOptions.length > 0 ? finalOptions : undefined,
        selectedOptions: selectedOptionsData
      }]);
    }

    setShowOptionModal(false);
    setSelectedMenuItem(null);
  };

  const handleQuantityChange = (orderId: string, change: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === orderId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleDeleteItem = (orderId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== orderId));
  };

  const handleClearOrder = () => {
    if (orderItems.length > 0) {
      setShowClearConfirm(true);
    }
  };

  const confirmClearOrder = () => {
    setOrderItems([]);
    setDiscount(0);
    setAppliedCoupon(null);
    setAppliedDiscountPolicy(null);
    setCouponCode('');
    setSelectedCustomerForOrder(null);
    setCustomerSearchQuery('');
    setPagerNumber('');
    setPagerSearchQuery('');
    setShowClearConfirm(false);
  };

  // Pager Search Handlers
  const handlePagerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPagerSearchQuery(value);

    // Also update pagerNumber directly when typing
    setPagerNumber(value);

    // Show dropdown if there's input
    if (value.trim()) {
      setShowPagerDropdown(true);
    } else {
      setShowPagerDropdown(false);
    }
  };

  const handleSelectPager = (pagerNum: number) => {
    setPagerNumber(pagerNum.toString());
    setPagerSearchQuery(pagerNum.toString());
    setShowPagerDropdown(false);
  };

  const getFilteredPagers = () => {
    const total = operationSettings.pagerSystem.totalPagers;
    const query = pagerSearchQuery.trim();

    if (!query) {
      // 입력이 없으면 전체 목록 표시
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // 입력값으로 시작하는 번호들 필터링
    return Array.from({ length: total }, (_, i) => i + 1)
      .filter(num => num.toString().startsWith(query));
  };

  const handleResetPOS = () => {
    // Reset all states to initial values
    setOrderItems([]);
    setDiscount(0);
    setAppliedCoupon(null);
    setAppliedDiscountPolicy(null);
    setCouponCode('');
    setSelectedCustomerForOrder(null);
    setCustomerSearchQuery('');
    setOrderType('dine-in');
    setTableNumber('');
    setGuestCount(0);
    setPagerNumber('');
    setPagerSearchQuery('');
    setSearchQuery('');
    setSelectedCategory('all');
    setShowClearConfirm(false);
    setShowPaymentModal(false);
    setShowOptionModal(false);
    setShowOrderCompleteModal(false);
    setCompletedOrderData(null);
    setSelectedMenuItem(null);
  };

  const handleApplyDiscount = (amount: number) => {
    // Toggle: if same discount is clicked again, reset to 0 (할인 해제는 PIN 불필요)
    if (discount === amount) {
      setDiscount(0);
      setAppliedDiscountPolicy(null);
      return;
    }
    // 매장 설정 'PIN 승인 필요' ON + 실제 할인(>0) 이면 PIN 모달로 승인 후 적용 (#5).
    // 금액 프리셋 버튼(RM5/10/15)도 커스텀 금액·% 할인과 동일하게 PIN 게이트를 탄다
    // (2026-06-26 Irene: 금액 선택 시 PIN 이 안 뜨던 누락 경로 수정). [[reference_discount_pin_gate]]
    if (amount > 0 && !!(operationSettings as any)?.requirePinForDiscount) {
      setPendingDiscount({ name: formatCurrency(amount, operationSettings.currency), value: amount, kind: 'fixed' });
      setShowDiscountPin(true);
      return;
    }
    setDiscount(amount);
  };

  const handleApplyCoupon = async (codeOverride?: string) => {
    const codeToApply = (codeOverride ?? couponCode).toUpperCase();
    if (!codeToApply) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/coupons/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          code: codeToApply,
          restaurant_id: user?.restaurantId,
          order_amount: subtotal,
          order_type: orderType,
          customer_id: selectedCustomerForOrder?.id || null
        })
      });

      if (!response.ok) {
        setShowCouponError(true);
        return;
      }

      const result = await response.json();

      if (result.valid && result.data) {
        setAppliedCoupon({ code: codeToApply, discount: result.data.discountAmount });
        setCouponCode('');
        setShowCouponDropdown(false);
      } else {
        setShowCouponError(true);
      }
    } catch (error) {
      console.error('Coupon validation error:', error);
      setShowCouponError(true);
    }
  };

  // Lazy-load active coupons for this restaurant on first focus.
  const fetchAvailableCoupons = async () => {
    if (couponsLoaded || !user?.restaurantId) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/coupons?restaurantId=${user.restaurantId}&active=true`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) return;
      const j = await res.json();
      const list = Array.isArray(j.data) ? j.data : [];
      // Only show coupons usable now (within validity, not exhausted).
      const now = Date.now();
      const usable = list.filter((c: any) => {
        if (c.valid_from && new Date(c.valid_from).getTime() > now) return false;
        if (c.valid_until && new Date(c.valid_until).getTime() < now) return false;
        if (c.usage_limit != null && Number(c.usage_count || 0) >= Number(c.usage_limit)) return false;
        return true;
      });
      setAvailableCoupons(usable);
      setCouponsLoaded(true);
    } catch (e) {
      console.error('Failed to load coupons:', e);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleApplyDiscountPolicy = async (policyName: string) => {
    // Toggle: if same policy is clicked again, reset discount
    if (appliedDiscountPolicy && appliedDiscountPolicy.name === policyName) {
      setAppliedDiscountPolicy(null);
      setDiscount(0);
      return;
    }

    // Get discount policies from promotion management system
    const discountPolicies: {[key: string]: {discount: string; requiresApproval: boolean; status: string}} = {
      '10%': { discount: '10%', requiresApproval: false, status: 'active' },  // 2026-06-25 (Irene): 10% 빠른 할인 추가
      'Staff': { discount: '20%', requiresApproval: false, status: 'active' },
      'VIP': { discount: '15%', requiresApproval: true, status: 'active' }
    };

    const policy = discountPolicies[policyName];
    if (policy && policy.status === 'active') {
      // Calculate discount amount
      const percentage = parseFloat(policy.discount.replace('%', ''));
      const discountValue = subtotal * (percentage / 100);

      // 할인 PIN 승인 (#5) — 정책이 승인 필요거나 매장 설정 'PIN 승인 필요' ON 시 터치 numpad PIN 모달로 서버 검증.
      // 하드코딩 MANAGER123 제거 → DiscountPinModal → POST /api/staff/verify-pin-permission (세션 전환 없음 + 감사로그).
      const needPin = policy.requiresApproval || !!(operationSettings as any)?.requirePinForDiscount;
      if (needPin) {
        // 보류 → 모달 승인 시 적용
        setPendingDiscount({ name: policyName, value: discountValue });
        setShowDiscountPin(true);
        return;
      } else {
        setAppliedDiscountPolicy({
          name: policyName,
          discount: discountValue,
          requiresApproval: false
        });
        setDiscount(0); // Clear fixed discount when applying percentage
      }
    }
  };

  const handleCustomAmountConfirm = (value: string) => {
    const amount = parseFloat(value);
    setShowCustomAmountModal(false);
    if (isNaN(amount) || amount < 0) return;
    // 매장 설정 'PIN 승인 필요' ON + 실제 할인(>0) 이면 PIN 모달로 승인 후 적용 (#5).
    if (amount > 0 && !!(operationSettings as any)?.requirePinForDiscount) {
      setPendingDiscount({ name: formatCurrency(amount, operationSettings.currency), value: amount, kind: 'fixed' });
      setShowDiscountPin(true);
      return;
    }
    setDiscount(amount);
    setAppliedDiscountPolicy(null); // Clear percentage discount when applying fixed amount
  };

  const handleCustomPercentConfirm = (value: string) => {
    const percentage = parseFloat(value);
    setShowCustomPercentModal(false);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) return;
    const discountValue = subtotal * (percentage / 100);
    // 매장 설정 'PIN 승인 필요' ON + 실제 할인(>0) 이면 PIN 모달로 승인 후 적용 (#5).
    if (percentage > 0 && !!(operationSettings as any)?.requirePinForDiscount) {
      setPendingDiscount({ name: `${percentage}%`, value: discountValue, kind: 'percent' });
      setShowDiscountPin(true);
      return;
    }
    setAppliedDiscountPolicy({
      name: `${percentage}%`,
      discount: discountValue,
      requiresApproval: false
    });
    setDiscount(0); // Clear fixed discount when applying custom percentage
  };

  const handleLogout = () => {
    authLogout();
  };

  const handleAddOrder = async () => {
    console.log('🔵 handleAddOrder called');
    if (orderItems.length === 0) return;

    // 중복 실행 방지
    if (isProcessingPayment) {
      console.warn('POS - Order already in progress, ignoring duplicate call');
      return;
    }

    console.log('🟢 Starting order creation, setting isProcessingPayment=true');
    setIsProcessingPayment(true);

    try {
      const now = new Date();

      // Backend will generate order number automatically
      const orderData = {
        date: now,
        items: orderItems,
        subtotal,
        discount: discountAmount,
        discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
        coupon: appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : null,
        takeawayCharge,
        serviceCharge,
        serviceChargeRate: effectiveServiceChargeRate,
        tax,
        taxRate: operationSettings.taxRate,
        total,
        paymentMethod: 'Pending',
        amountReceived: 0,
        change: 0
      };

      const newOrder = {
        id: `order-${Date.now()}`,
        // Backend will set orderNumber and pickupNumber
        orderNumber: '',
        pickupNumber: '',
      customer: {
        name: selectedCustomerForOrder ? selectedCustomerForOrder.name : normalizeCustomerName('Walk-in Customer'),
        phone: selectedCustomerForOrder ? selectedCustomerForOrder.phone : 'POS Terminal',
        email: selectedCustomerForOrder ? (selectedCustomerForOrder.email || '') : '',
        type: selectedCustomerForOrder ? 'member' : 'guest',
        customerId: selectedCustomerForOrder?.id,
        loyaltyTier: selectedCustomerForOrder?.loyaltyTier,
        points: selectedCustomerForOrder?.points
      },
      items: (() => {
        // 2026-05-28 매장 critical: print path 의 tagTicketWithStations 가
        // item.kitchen_station_id 우선 사용. cart item 에 이 필드를 frontend
        // 가 직접 채워 (MenuContext lookup) 로컬 localStorage map 의존성 제거.
        // backend enrich 와 동등하게 작동.
        const _catStationMap = new Map<string, number>();
        (categories as any[]).forEach((c: any) => { if (c.kitchen_station_id) _catStationMap.set(String(c.id), c.kitchen_station_id); });
        return orderItems.map(item => {
          let itemPrice = item.menuItem.price;
          if (item.selectedOptions && item.selectedOptions.length > 0) {
            const optionsTotal = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
            itemPrice += optionsTotal;
          }
          const fullMenuItem = (menuItems as any[]).find((m: any) => String(m.id) === String(item.menuItem.id));
          const ksid = fullMenuItem?.kitchen_station_id || _catStationMap.get(String(fullMenuItem?.category)) || null;
          return {
            id: item.id,
            menuItem: {
              id: item.menuItem.id,
              name: item.menuItem.code ? `${item.menuItem.code} ${item.menuItem.name}` : item.menuItem.name,
              price: itemPrice,
              emoji: item.menuItem.emoji,
              is_set_menu: item.menuItem.is_set_menu,
              set_items: item.menuItem.set_items
            },
            quantity: item.quantity,
            options: item.options,
            selectedOptions: item.selectedOptions || [],
            is_set_menu: item.menuItem.is_set_menu || false,
            set_items: item.menuItem.set_items || [],
            set_components: (item as any).set_components || undefined,
            kitchen_station_id: ksid,
            special_instructions: item.special_instructions || undefined // 4-1 품목별 메모(주방티켓/빌)
          };
        });
      })(),
      status: 'pending' as const,
      createdAt: formatTime(now, operationSettings),
      subtotal,
      tax,
      taxRate: operationSettings.taxRate,
      serviceCharge,
      serviceChargeRate: effectiveServiceChargeRate,
      discount: discountAmount,
      coupon: appliedCoupon ? { code: appliedCoupon.code, amount: appliedCoupon.discount } : undefined,
      discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
      takeawayCharge: takeawayCharge,
      total,
      paymentMethod: 'Pending',
      paymentStatus: 'pending' as const,
      orderType: orderType,
      orderSource: 'pos' as const,
      // 2026-05-27: takeaway with table pins to that table's open bill — same
      // routing as dine-in. Guest count stays dine-in-only (doesn't apply to takeaway).
      tableNumber: (orderType === 'dine-in' || orderType === 'takeaway') && tableNumber ? tableNumber : undefined,
      floorPlanTableId: (orderType === 'dine-in' || orderType === 'takeaway') && floorPlanTableIdFromUrl ? floorPlanTableIdFromUrl : undefined,
      guest_count: orderType === 'dine-in' && guestCount > 0 ? guestCount : null,
      pagerNumber: pagerNumber || undefined,
      cashier_id: user?.id ? Number(user.id) : null,
      cashier_name: user?.name || null,
      // 사용자가 "기존 주문에 추가" 선택했으면 명시 머지.
      forceMergeIntoOrderId: forceMergeOrderId || undefined,
      notes: orderRemark.trim() || undefined,  // #11 리마크
    };

      console.log('🟡 Calling addOrder with orderNumber:', newOrder.orderNumber);
      const savedOrder: any = await addOrder(newOrder, restaurantId ? Number(restaurantId) : undefined);
      console.log('🟢 addOrder completed, savedOrder:', savedOrder);

      // Show order complete modal with actual order number from backend
      // Backend returns snake_case (order_number), convert to camelCase
      setCompletedOrderData({
        ...orderData,
        orderNumber: savedOrder?.order_number || savedOrder?.orderNumber || newOrder.orderNumber,
        pickupNumber: savedOrder?.pickup_number || savedOrder?.pickupNumber || (savedOrder?.order_number ? savedOrder.order_number.split('-')[1] : newOrder.pickupNumber),
        pagerNumber: savedOrder?.pager_number || pagerNumber || undefined,
        tableNumber: savedOrder?.table_number || tableNumber || undefined,
        // Ensure takeawayCharge from backend is used if available
        // 2026-05-31 (Irene): coerce to Number. savedOrder.* are DB DECIMAL strings
        // ("116.00"); passing a string makes billPrint's subtotal.toFixed(2) throw
        // ("subtotal.toFixed is not a function") → empty/failed bill. Resolution
        // order unchanged — only parseFloat added. (No print-method change.)
        takeawayCharge: parseFloat(savedOrder?.takeaway_charge || savedOrder?.takeawayCharge || orderData.takeawayCharge || 0) || 0,
        subtotal: parseFloat(savedOrder?.subtotal || orderData.subtotal || 0) || 0,
        tax: parseFloat(savedOrder?.tax || orderData.tax || 0) || 0,
        serviceCharge: parseFloat(savedOrder?.service_charge || savedOrder?.serviceCharge || orderData.serviceCharge || 0) || 0,
        discount: parseFloat(savedOrder?.discount || orderData.discount || 0) || 0,
        discountPolicy: orderData.discountPolicy,
        coupon: orderData.coupon,
        pointsUsed: 0,
        pointDiscount: 0,
        total: parseFloat(savedOrder?.total || orderData.total || 0) || 0,
        cashierName: user?.name || null
      });
      setShowOrderCompleteModal(true);

      // Notify checkout display
      if (checkoutSocketRef.current) {
        checkoutSocketRef.current.emit('checkout-complete', {
          restaurantId: user?.restaurantId,
          orderNumber: completedOrderData?.orderNumber || '',
          total: savedOrder?.total || orderData.total || total,
          currency: operationSettings.currency || 'MYR'
        });
      }

      // Clear the order
      setOrderItems([]);
      setDiscount(0);
      setAppliedCoupon(null);
      setAppliedDiscountPolicy(null);
      setCouponCode('');
      if (orderRemark.trim()) pushRemarkHistory(orderRemark); // #11 발행된 리마크를 검색 히스토리에 저장
      setOrderRemark('');  // #11 리마크 발행 후 비움
      setTableNumber('');
      setGuestCount(0);
      setPagerNumber('');
      setPagerSearchQuery('');
      setSelectedCustomerForOrder(null);
      setCustomerSearchQuery('');

      // 2026-06-04 (Irene): SINGLE kitchen auto-print path. The POS no longer prints
      // the kitchen ticket directly from local cart data — that ran a SECOND printer
      // (alongside the auto-print poller) with a DIFFERENT data shape (cart raw vs
      // backend-enriched), producing duplicate tickets with divergent content + the
      // "SET5 only" set rendering. New orders now print through ONE path — the
      // auto-print poller (useAutoPrintPoller) — exactly like the table-move reissue:
      // backend-enriched items, station bucketing → counter + each station one ticket,
      // printed_at dedup. We just nudge the poller to run immediately so the ticket
      // still comes out fast instead of waiting for the next 5s poll. (KDS stays
      // display-only.) needs_print is set by the backend on creation.
      // 2026-06-25 (Irene 하이브리드): 이 POS가 "자기 주문"을 그 자리에서 즉시 로컬(QZ) 인쇄 —
      // 폴러 사이클/서버fetch 안 기다림. savedOrder=백엔드 enrich 응답(snake)이라 옛 "cart 직접인쇄"
      // divergence 중복 회피 + 동일 atomic claim 으로 폴러와 중복 0. 성공=완료(claim→폴러 skip).
      // 실패/게이트밖(이 기기가 인쇄주체 아님)이면 폴러 poke(fallback: 지정 POS가 처리).
      (async () => {
        try {
          const { printOrderKitchenNow } = await import('../../utils/hybridKitchenPrint');
          const _ok = await printOrderKitchenNow(savedOrder, getStoreInfo);
          if (_ok) return;
        } catch (_e) { /* fall through to poke */ }
        try { window.dispatchEvent(new CustomEvent('autoprint-poke')); localStorage.setItem('autoprint-poke', String(Date.now())); } catch {}
      })();

      console.log('POS - Order added without payment:', savedOrder?.orderNumber);
    } catch (error: any) {
      console.error('POS - Error adding order:', error);
      // #9 오프라인 큐 — 연결 끊김 시 주문은 로컬 큐에 저장됨. "다시 시도/재입력" 금지(재연결 시 자동 전송, 중복 0).
      if (error?.message === 'OFFLINE_QUEUED') {
        setInfoModal({ open: true, title: 'Saved offline', message: 'No connection — the order is saved and will be sent automatically when you are back online. Do NOT re-enter it.' });
      } else {
        setInfoModal({ open: true, title: 'Order Failed', message: 'Failed to create order. Please try again.' });
      }
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePayment = async () => {
    if (orderItems.length === 0) return;

    // 같은 테이블 + 결제전 주문 있으면 자동 머지 (Floor Plan 의 New Order 와 동일).
    // 2026-05-27 변경 — 매장 카페 실 운영 reality:
    //   - "결제전" 인 동안 = 손님이 자리에 앉아 추가 주문하는 흐름
    //   - 별도 주문 만드는 모달은 마찰만 생김 → 항상 머지 (payment_status='pending' 만)
    //   - 결제 완료 이후에 다시 주문 = 별도 주문 (자연스럽게 머지 후보 X)
    // order_type 도 무관 (takeaway/dine-in 같은 테이블이면 동일 손님으로 가정).
    if (tableNumber && user?.restaurantId) {
      try {
        const params = new URLSearchParams({
          restaurant_id: String(user.restaurantId),
          table_number: tableNumber
        });
        const res = await fetch(`/api/orders/mergeable?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          const list: any[] = (data && data.data) || [];
          if (list.length > 0) {
            // 가장 최근 결제전 주문에 자동 머지 — 모달 없이 즉시 진행.
            setForceMergeOrderId(list[0].id);
            setShowPaymentModal(true);
            return;
          }
        }
      } catch (e) {
        // Network 오류 시엔 기본 흐름 (별도 주문) 으로 진행 — 안전 fallback.
        console.warn('[POS] mergeable check failed, proceeding as separate order', e);
      }
    }
    setForceMergeOrderId(null);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async (method: string, amountReceived?: number, change?: number, pointsUsed?: number, pointDiscountAmount?: number, cardType?: string, staffNames?: string[][], ewalletType?: string) => {
    // 중복 실행 방지
    if (isProcessingPayment) {
      console.warn('POS - Payment already in progress, ignoring duplicate call');
      return;
    }

    setIsProcessingPayment(true);
    console.log('POS - Processing payment for method:', method, 'Points used:', pointsUsed);

    // Adjust total if points were used
    const adjustedTotal = pointDiscountAmount ? total - pointDiscountAmount : total;

    try {
      const now = new Date();

      // Backend will generate order number automatically
      const orderData = {
        date: now,
        items: orderItems,
        subtotal,
        discount: discountAmount,
        discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
        coupon: appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : null,
        takeawayCharge,
        serviceCharge,
        serviceChargeRate: effectiveServiceChargeRate,
        tax,
        taxRate: operationSettings.taxRate,
        total: adjustedTotal,
        pointsUsed: pointsUsed || 0,
        pointDiscount: pointDiscountAmount || 0,
        paymentMethod: method,
        cardType: method === 'card' ? (cardType || null) : null,
        ewalletType: method === 'ewallet' ? (ewalletType || null) : null,
        amountReceived: amountReceived || adjustedTotal,
        change: change || 0
      };

      // Add to OrderContext for LiveOrders
      const newOrder: any = {
        id: `order-${Date.now()}`,
        // Backend will set orderNumber and pickupNumber
        orderNumber: '',
        pickupNumber: '',
      customer: {
        name: selectedCustomerForOrder ? selectedCustomerForOrder.name : 'Walk-in Customer',
        phone: selectedCustomerForOrder ? selectedCustomerForOrder.phone : 'POS Terminal',
        email: selectedCustomerForOrder ? (selectedCustomerForOrder.email || '') : '',
        type: selectedCustomerForOrder ? 'member' : 'guest',
        customerId: selectedCustomerForOrder?.id,
        loyaltyTier: selectedCustomerForOrder?.loyaltyTier,
        points: selectedCustomerForOrder?.points
      },
      items: (() => {
        // 2026-05-28 매장 critical: print path 의 tagTicketWithStations 가
        // item.kitchen_station_id 우선 사용. cart item 에 이 필드를 frontend
        // 가 직접 채워 (MenuContext lookup) 로컬 localStorage map 의존성 제거.
        // backend enrich 와 동등하게 작동.
        const _catStationMap = new Map<string, number>();
        (categories as any[]).forEach((c: any) => { if (c.kitchen_station_id) _catStationMap.set(String(c.id), c.kitchen_station_id); });
        return orderItems.map((item, _payIdx) => {
          let itemPrice = item.menuItem.price;
          if (item.selectedOptions && item.selectedOptions.length > 0) {
            const optionsTotal = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
            itemPrice += optionsTotal;
          }
          const fullMenuItem = (menuItems as any[]).find((m: any) => String(m.id) === String(item.menuItem.id));
          const ksid = fullMenuItem?.kitchen_station_id || _catStationMap.get(String(fullMenuItem?.category)) || null;
          return {
            id: item.id,
            menuItem: {
              id: item.menuItem.id,
              name: item.menuItem.code ? `${item.menuItem.code} ${item.menuItem.name}` : item.menuItem.name,
              price: itemPrice,
              emoji: item.menuItem.emoji,
              is_set_menu: item.menuItem.is_set_menu,
              set_items: item.menuItem.set_items
            },
            quantity: item.quantity,
            options: item.options,
            selectedOptions: item.selectedOptions || [],
            is_set_menu: item.menuItem.is_set_menu || false,
            set_items: item.menuItem.set_items || [],
            set_components: (item as any).set_components || undefined,
            kitchen_station_id: ksid,
            special_instructions: item.special_instructions || undefined, // 4-1 품목별 메모(주방티켓/빌)
            staff_names: (staffNames && Array.isArray(staffNames[_payIdx]) && staffNames[_payIdx].some(Boolean)) ? staffNames[_payIdx] : undefined // 스탭밀 직원이름(수량만큼, 영수증/정산서)
          };
        });
      })(),
      status: 'pending' as const,
      createdAt: formatTime(now, operationSettings),
      subtotal,
      tax,
      taxRate: operationSettings.taxRate,
      serviceCharge,
      serviceChargeRate: effectiveServiceChargeRate,
      discount: discountAmount,
      coupon: appliedCoupon ? { code: appliedCoupon.code, amount: appliedCoupon.discount } : undefined,
      discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
      takeawayCharge: takeawayCharge,
      total: adjustedTotal,
      points_used: pointsUsed || null,
      point_discount: pointDiscountAmount || null,
      paymentMethod: method,
      card_type: method === 'card' ? (cardType || null) : null,
      ewallet_type: method === 'ewallet' ? (ewalletType || null) : null,
      paymentStatus: 'completed' as const,
      orderType: orderType,
      orderSource: 'pos' as const,
      // 2026-05-27: takeaway with table pins to that table's open bill — same
      // routing as dine-in. Guest count stays dine-in-only (doesn't apply to takeaway).
      tableNumber: (orderType === 'dine-in' || orderType === 'takeaway') && tableNumber ? tableNumber : undefined,
      floorPlanTableId: (orderType === 'dine-in' || orderType === 'takeaway') && floorPlanTableIdFromUrl ? floorPlanTableIdFromUrl : undefined,
      guest_count: orderType === 'dine-in' && guestCount > 0 ? guestCount : null,
      pagerNumber: pagerNumber || undefined,
      cashier_id: user?.id ? Number(user.id) : null,
      cashier_name: user?.name || null,
      forceMergeIntoOrderId: forceMergeOrderId || undefined,
      notes: orderRemark.trim() || undefined,  // #11 리마크
    };

      const savedOrder: any = await addOrder(newOrder, user?.restaurantId ? Number(user.restaurantId) : undefined);

      // Update customer stats if it's a member
      if (selectedCustomerForOrder) {
        updateCustomerOrderStats(selectedCustomerForOrder.id, total);
      }

      // Update staff performance if logged in
      if (currentStaff) {
        const updatedPerformance = {
          ...currentStaff.performance,
          ordersProcessed: currentStaff.performance.ordersProcessed + 1
        };

        updateStaff(currentStaff.id, {
          totalSales: currentStaff.totalSales + total,
          totalShifts: currentStaff.totalShifts, // Keep existing shifts
          performance: updatedPerformance
        });
      }

      // Show order complete modal with actual order number from backend
      // Backend returns snake_case (order_number), convert to camelCase
      setCompletedOrderData({
        ...orderData,
        orderNumber: savedOrder?.order_number || savedOrder?.orderNumber || '',
        pickupNumber: savedOrder?.pickup_number || savedOrder?.pickupNumber || (savedOrder?.order_number ? savedOrder.order_number.split('-')[1] : null),
        tableNumber: savedOrder?.table_number || tableNumber || undefined,
        pagerNumber: savedOrder?.pager_number || pagerNumber || undefined,
        // Ensure takeawayCharge from backend is used if available
        // 2026-05-31 (Irene): coerce to Number — savedOrder.* are DB DECIMAL strings.
        // See the matching note in the other completedOrderData builder above.
        takeawayCharge: parseFloat(savedOrder?.takeaway_charge || savedOrder?.takeawayCharge || orderData.takeawayCharge || 0) || 0,
        subtotal: parseFloat(savedOrder?.subtotal || orderData.subtotal || 0) || 0,
        tax: parseFloat(savedOrder?.tax || orderData.tax || 0) || 0,
        serviceCharge: parseFloat(savedOrder?.service_charge || savedOrder?.serviceCharge || orderData.serviceCharge || 0) || 0,
        discount: parseFloat(savedOrder?.discount || orderData.discount || 0) || 0,
        discountPolicy: orderData.discountPolicy,
        coupon: orderData.coupon,
        pointsUsed: orderData.pointsUsed || 0,
        pointDiscount: orderData.pointDiscount || 0,
        total: parseFloat(savedOrder?.total || orderData.total || 0) || 0,
        cashierName: user?.name || null
      });
      setShowOrderCompleteModal(true);
      setShowPaymentModal(false);

      // Notify checkout display
      if (checkoutSocketRef.current) {
        checkoutSocketRef.current.emit('checkout-complete', {
          restaurantId: user?.restaurantId,
          orderNumber: completedOrderData?.orderNumber || '',
          total: savedOrder?.total || orderData.total || total,
          currency: operationSettings.currency || 'MYR'
        });
      }

      // Auto-print bill + kitchen ticket
      const printSettings = getPrinterSettings();
      const printStoreInfo = getStoreInfo();
      const printData = {
        ...orderData,
        orderNumber: savedOrder?.order_number || savedOrder?.orderNumber || '',
        pickupNumber: savedOrder?.pickup_number || savedOrder?.pickupNumber || (savedOrder?.order_number ? savedOrder.order_number.split('-')[1] : null),
        tableNumber: savedOrder?.table_number || tableNumber || undefined,
        pagerNumber: savedOrder?.pager_number || pagerNumber || undefined,
        total: savedOrder?.total || orderData.total,
        cashierName: user?.name || null
      };

      // Workstation-aware: use the active workstation's bill printer toggle.
      // Falls back to legacy global billPrinter for restaurants that haven't migrated.
      const activeBill = getActiveBillPrinter();

      // 2026-05-29: 자동 진단 이메일 발송 중단 (매장 요청). auto-bill-skip /
      // auto-kitchen-skip 은 정상 설정(자동인쇄 OFF)에서도 결제마다 발사돼 관리자
      // 메일 스팸의 원인이었다. 프린터 문제는 Settings → Printer 의 수동 진단
      // 버튼으로 한 번만 보고한다. 자동 telemetry 는 no-op.
      const _telemetry = (_scope: string, _extra: any = {}) => {};

      if (activeBill?.enabled && activeBill?.autoPrint) {
        // F&B standard: counter copy + customer copy (default 2). User-configurable in Settings → Receipt.
        const copies = Math.max(1, Math.min(3, parseInt(
          (printSettings.receiptSettings && printSettings.receiptSettings.copiesAfterPayment) ||
          (printStoreInfo as any).copiesAfterPayment ||
          (JSON.parse(localStorage.getItem('receiptSettings') || '{}').copiesAfterPayment) || 1, 10) || 1));
        const autoOpenDrawer = (printSettings.receiptSettings && printSettings.receiptSettings.autoOpenDrawer) !== false &&
          (JSON.parse(localStorage.getItem('receiptSettings') || '{}').autoOpenDrawer !== false);
        (async () => {
          await new Promise(r => setTimeout(r, 300));
          const fails: any[] = [];
          for (let i = 0; i < copies; i++) {
            const isLast = i === copies - 1;
            // Bundle the drawer pulse INTO the final receipt's print job so the
            // raster printer doesn't spit out an orphan blank/garbage page.
            const dataForCopy = { ...printData, __drawerPulse: !!(autoOpenDrawer && isLast) };
            try {
              const ok = await printBillViaRawBT(dataForCopy, printStoreInfo);
              if (ok === false) fails.push({ copy: i + 1, reason: 'printBillViaRawBT returned false' });
            } catch (e: any) {
              console.error('Auto bill print failed (copy ' + (i + 1) + '):', e);
              fails.push({ copy: i + 1, error: String(e?.message || e) });
            }
            if (i < copies - 1) await new Promise(r => setTimeout(r, 600));
          }
          if (fails.length > 0) _telemetry('auto-bill-fail', { copies, fails });
        })();
      } else {
        // Toggle says off OR active workstation isn't pointing at an enabled bill printer.
        // Surface the reason so the shop knows whether to flip a toggle or bind the device.
        _telemetry('auto-bill-skip', {
          reason: !activeBill?.enabled ? 'activeBill not enabled' :
                  !activeBill?.autoPrint ? 'autoPrint toggle off' :
                  'unknown',
          workstationCount: (printSettings.workstations || []).length,
          hasLegacyGlobal: !!(printSettings.billPrinter && printSettings.billPrinter.enabled)
        });
      }

      // 2026-06-04 (Irene): SINGLE kitchen auto-print path — see handleAddOrder note.
      // The POS no longer prints the kitchen ticket directly here (cart data) — the
      // auto-print poller is the sole kitchen printer (backend-enriched, station
      // bucketing, printed_at dedup), identical to the table-move reissue path. A
      // +Round (payment for existing order) prints only the new rows via the poller's
      // kitchen_items filter. We nudge the poller to run immediately for prompt output.
      // 2026-06-25 (Irene 하이브리드): 결제처리 POS가 "이 주문"의 주방티켓을 즉시 로컬(QZ)
      // 인쇄(빌은 위에서 이미 직접인쇄). savedOrder=백엔드 enrich(snake) + atomic claim →
      // 폴러와 중복 0. 성공=완료. 실패/게이트밖이면 poke(폴러 fallback).
      (async () => {
        try {
          const { printOrderKitchenNow } = await import('../../utils/hybridKitchenPrint');
          const _ok = await printOrderKitchenNow(savedOrder, getStoreInfo);
          if (_ok) return;
        } catch (_e) { /* fall through to poke */ }
        try { window.dispatchEvent(new CustomEvent('autoprint-poke')); localStorage.setItem('autoprint-poke', String(Date.now())); } catch {}
      })();

      // Clear the order
      setOrderItems([]);
      setDiscount(0);
      setAppliedCoupon(null);
      setAppliedDiscountPolicy(null);
      setCouponCode('');
      if (orderRemark.trim()) pushRemarkHistory(orderRemark); // #11 발행된 리마크를 검색 히스토리에 저장
      setOrderRemark('');  // #11 리마크 발행 후 비움
      setTableNumber('');
      setGuestCount(0);
      setPagerNumber('');
      setPagerSearchQuery('');
      setSelectedCustomerForOrder(null);
      setCustomerSearchQuery('');

      console.log('POS - Payment processing completed:', savedOrder?.orderNumber);
    } catch (error: any) {
      console.error('POS - Error processing payment:', error);
      // #9 오프라인 큐 — 연결 끊김 시 주문은 저장됨. 재입력 금지(재연결 시 자동 전송, 중복 0).
      if (error?.message === 'OFFLINE_QUEUED') {
        setInfoModal({ open: true, title: 'Saved offline', message: 'No connection — the order is saved and will be sent automatically when you are back online. Do NOT re-enter it.' });
      } else {
        setInfoModal({ open: true, title: 'Payment Failed', message: 'Failed to process payment. Please try again.' });
      }
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((sum, item) => {
      let itemTotal = item.menuItem.price * item.quantity;
      // Add option prices
      if (item.selectedOptions && item.selectedOptions.length > 0) {
        const optionsTotal = item.selectedOptions.reduce((optSum, opt) => optSum + opt.price, 0);
        itemTotal += optionsTotal * item.quantity;
      }
      return sum + itemTotal;
    }, 0);

    // Calculate takeaway charges if applicable
    let takeawayCharge = 0;
    if (orderType === 'takeaway' && operationSettings.takeawayPricing.enabled) {
      if (operationSettings.takeawayPricing.pricingType === 'per-item') {
        // Same flat charge for every item
        const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
        takeawayCharge = totalQuantity * operationSettings.takeawayPricing.perItemCharge;
      } else {
        // per-category and per-item-individual both route through getTakeawayCharge,
        // which inspects the menu item (category for per-category, takeaway_charge for per-item-individual).
        orderItems.forEach(item => {
          const charge = getTakeawayCharge(item.menuItem as any);
          takeawayCharge += charge * item.quantity;
        });
      }
    }

    const subtotalWithTakeaway = subtotal + takeawayCharge;
    const discountAmount = discount;
    const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
    const policyDiscount = appliedDiscountPolicy ? appliedDiscountPolicy.discount : 0;
    const afterDiscount = Math.max(0, subtotalWithTakeaway - discountAmount - couponDiscount - policyDiscount);

    // Apply service charge and tax in parallel (both on afterDiscount amount).
    // SC 는 보통 매장 식사에만 부과 — Settings 의 "Exclude takeaway" 토글 (default true) 시 takeaway 면 0.
    const scExcludeTakeaway = operationSettings.serviceChargeExcludeTakeaway ?? true;
    const scApplies = operationSettings.serviceChargeEnabled && !(orderType === 'takeaway' && scExcludeTakeaway);
    const serviceCharge = scApplies
      ? afterDiscount * (operationSettings.serviceChargeRate / 100)
      : 0;

    const tax = operationSettings.taxEnabled
      ? afterDiscount * (operationSettings.taxRate / 100)
      : 0;

    const totalBeforeRounding = afterDiscount + serviceCharge + tax;

    // Apply rounding based on settings
    let total = totalBeforeRounding;
    if (roundingApplyTo === 'all' && cashRounding) {
      total = Math.round(totalBeforeRounding / cashRounding) * cashRounding;
    }

    // SC rate: scApplies=false 시 0 으로 일관 전송. backend 주문 수정 재계산 시 안전.
    const effectiveServiceChargeRate = scApplies ? operationSettings.serviceChargeRate : 0;

    return { subtotal, tax, total, discountAmount, couponDiscount, policyDiscount, takeawayCharge, serviceCharge, effectiveServiceChargeRate };
  };

  const { subtotal, tax, total, discountAmount, couponDiscount, policyDiscount, takeawayCharge, serviceCharge, effectiveServiceChargeRate } = calculateTotal();

  // Checkout Display: WebSocket connection for customer-facing screen
  const checkoutSocketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (!user?.restaurantId) return;
    const socket = io('/checkout-display', { transports: ['websocket', 'polling'], auth: { token: getAuthToken() } });
    checkoutSocketRef.current = socket;
    socket.on('connect', () => { socket.emit('join-restaurant', user.restaurantId); });
    // Receive customer phone from checkout display
    socket.on('customer-checkin', async (data: { phone: string }) => {
      if (data.phone && user?.restaurantId) {
        setCustomerSearchQuery(data.phone);
        // 자동 검색 + 1건이면 자동 선택
        try {
          const res = await fetch(`/api/customers/${user.restaurantId}?search=${encodeURIComponent(data.phone)}`);
          if (res.ok) {
            const result = await res.json();
            if (result.success && result.data && result.data.length > 0) {
              const item = result.data[0];
              const cust = {
                id: item.customer?.id || item.customer_id,
                name: item.customer?.name || 'Unknown',
                phone: item.customer?.phone || data.phone,
                email: item.customer?.email || '',
                type: item.customer?.type || 'member',
                points: item.points || 0,
                loyaltyTier: item.loyalty_tier || 'Bronze',
                totalOrders: item.total_orders || 0,
                totalSpent: item.total_spent || 0
              };
              setSelectedCustomerForOrder(cust);
              setCustomerSearchQuery('');
              setShowCustomerDropdown(false);
            }
          }
        } catch { /* silent */ }
      }
    });
    return () => { socket.disconnect(); };
  }, [user?.restaurantId]);

  // Emit cart updates to checkout display
  useEffect(() => {
    if (!checkoutSocketRef.current || !user?.restaurantId) return;
    // 2026-05-27: don't blank the Customer Display when the cart is empty —
    // that erased the Floor-Plan-pushed order snapshot the second the cashier
    // entered POS Terminal. Only emit once the cart actually has items. The
    // explicit cart-clear event still resets the display when needed.
    if (!orderItems.length) return;
    const items = orderItems.map(item => ({
      name: item.menuItem.name,
      quantity: item.quantity,
      price: item.menuItem.price + (item.selectedOptions?.reduce((s, o) => s + o.price, 0) || 0),
      options: item.selectedOptions?.map(o => o.name) || []
    }));
    checkoutSocketRef.current.emit('cart-update', {
      restaurantId: user.restaurantId,
      tableNumber: tableNumber || null,
      items,
      subtotal,
      tax,
      taxRate: operationSettings.taxEnabled ? operationSettings.taxRate : 0,
      serviceCharge,
      serviceChargeRate: effectiveServiceChargeRate,
      discount: discountAmount + couponDiscount + policyDiscount,
      total,
      currency: operationSettings.currency || 'MYR',
      source: 'pos-terminal',
      orderInfo: {
        orderType: orderType,
        sourceLabel: 'pos',
        paymentStatus: 'pending',
        cashierName: user?.name || null
      },
      customer: selectedCustomerForOrder ? {
        id: selectedCustomerForOrder.id,
        name: selectedCustomerForOrder.name,
        phone: selectedCustomerForOrder.phone,
        loyaltyTier: selectedCustomerForOrder.loyaltyTier || 'Bronze',
        points: typeof selectedCustomerForOrder.points === 'number' ? selectedCustomerForOrder.points : 0
      } : null
    });
  }, [orderItems, subtotal, tax, total, discountAmount, couponDiscount, policyDiscount, serviceCharge, user?.restaurantId, user?.name, operationSettings, tableNumber, orderType, selectedCustomerForOrder]);

  // 2026-05-27: Push selected member to Customer Display so the guest sees
  // their name / tier / points the moment the cashier picks them. Cleared
  // automatically when the cashier removes the selection or leaves POS.
  useEffect(() => {
    if (!checkoutSocketRef.current || !user?.restaurantId) return;
    if (selectedCustomerForOrder) {
      checkoutSocketRef.current.emit('pos-customer-update', {
        restaurantId: user.restaurantId,
        customer: {
          id: selectedCustomerForOrder.id,
          name: selectedCustomerForOrder.name,
          phone: selectedCustomerForOrder.phone,
          loyaltyTier: selectedCustomerForOrder.loyaltyTier || 'Bronze',
          points: typeof selectedCustomerForOrder.points === 'number' ? selectedCustomerForOrder.points : 0,
          totalOrders: selectedCustomerForOrder.totalOrders || 0
        }
      });
    } else {
      checkoutSocketRef.current.emit('pos-customer-update', {
        restaurantId: user.restaurantId,
        customer: null
      });
    }
  }, [selectedCustomerForOrder, user?.restaurantId]);

  // Cleanup on unmount — leaving POS Terminal clears the member view as well.
  useEffect(() => {
    return () => {
      if (checkoutSocketRef.current && user?.restaurantId) {
        checkoutSocketRef.current.emit('pos-customer-update', {
          restaurantId: user.restaurantId,
          customer: null
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.restaurantId]);

  const formatDateTimeLocal = (date: Date) => {
    const dateStr = formatDateTime(date, operationSettings, {
      month: 'short',
      day: '2-digit',
      year: undefined, // 년도 제외 — 운영 화면엔 불필요 (예: "03 Jun  02:48:38 am")
      hour: undefined,
      minute: undefined,
      second: undefined
    });
    const time = formatDateTime(date, operationSettings, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      year: undefined,
      month: undefined,
      day: undefined
    });
    return { dateStr, time };
  };

  // API-based customer search for real-time results
  const searchCustomersFromAPI = async (query: string) => {
    if (!query.trim() || !user?.restaurantId) {
      setApiSearchResults([]);
      return;
    }

    setIsSearchingCustomers(true);
    try {
      const response = await fetch(`/api/customers/${user.restaurantId}?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Transform API response to match expected format
          const transformedResults = data.data.map((item: any) => ({
            id: item.customer?.id || item.customer_id,
            name: item.customer?.name || 'Unknown',
            phone: item.customer?.phone || '',
            email: item.customer?.email || '',
            type: item.customer?.type || 'member',
            points: item.points || 0,
            loyaltyTier: item.loyalty_tier || 'Bronze',
            totalOrders: item.total_orders || 0,
            totalSpent: item.total_spent || 0
          }));
          setApiSearchResults(transformedResults.slice(0, 10));
        }
      }
    } catch (error) {
      console.error('Customer search error:', error);
    } finally {
      setIsSearchingCustomers(false);
    }
  };

  // Get customers - use API results if available, fallback to local search
  const getFilteredCustomers = () => {
    if (!customerSearchQuery.trim()) return [];

    // Prefer API results
    if (apiSearchResults.length > 0) {
      return apiSearchResults;
    }

    // Fallback to local search
    const results = searchCustomers(customerSearchQuery);
    return results.slice(0, 10);
  };

  const filteredCustomers = getFilteredCustomers();

  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomerForOrder(customer);
    setCustomerSearchQuery('');
    setShowCustomerDropdown(false);
    setApiSearchResults([]);
  };

  const handleClearCustomer = () => {
    setSelectedCustomerForOrder(null);
    setCustomerSearchQuery('');
    setApiSearchResults([]);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleCustomerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerSearchQuery(value);
    setShowCustomerDropdown(value.trim().length > 0);

    // Debounced API search
    if (customerSearchTimeoutRef.current) {
      clearTimeout(customerSearchTimeoutRef.current);
    }

    if (value.trim().length >= 2) {
      customerSearchTimeoutRef.current = setTimeout(() => {
        searchCustomersFromAPI(value);
      }, 300);
    } else {
      setApiSearchResults([]);
    }
  };

  return (
    <POSContainer data-pos-theme={posTheme}>
      <PosDisplayThemeStyle />
      {!posFullscreen && (
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Logo onClick={handleResetPOS}>
            {brandLogo ? (
              <>
                <LogoImage src={brandLogo} alt="Brand Logo" />
                <span style={{ color: 'var(--pos-text-muted, #4B5563)', fontSize: '14px', fontWeight: 500 }}>{t('pos:terminal.posTerminal', 'POS Terminal')}</span>
              </>
            ) : (
              <span style={{ color: 'var(--pos-text-muted, #4B5563)', fontSize: '14px', fontWeight: 500 }}>{t('pos:terminal.posTerminal', 'POS Terminal')}</span>
            )}
          </Logo>
          <HeaderActionBtn type="button"
            onClick={() => navigate(`/restaurant/${restaurantId}/dashboard`)}
            title={t('pos:terminal.dashboard', 'Dashboard')}
          >
            ← {t('pos:terminal.dashboard', 'Dashboard')}
          </HeaderActionBtn>
        </div>
        <HeaderInfo>
          <StaffInfo clickable={true} onClick={() => setShowCashierPinModal(true)} title="Logged in — click to switch user">
            {/* 로그인 표시 = 사용자 아이콘 + 이름 (역할 단정 "Cashier:" 라벨 제거 — 로그인 주체가 관리자/오너일 수 있음) */}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{user?.name || 'Staff'}</span>
            <span style={{ fontSize: '11px', color: 'var(--pos-text-muted, #8898AA)', marginLeft: '4px' }}>▼</span>
          </StaffInfo>
          {(() => { const dt = formatDateTimeLocal(currentDateTime); return (
            <DateTime><span className="pos-date">{dt.dateStr}</span><span>{dt.time}</span></DateTime>
          ); })()}
          {/* Customer Display — always visible. Cashiers re-open the secondary
              monitor view often, keep one-click access regardless of width. */}
          <HeaderActionBtn type="button"
            onClick={async () => {
              const result = await openCustomerDisplay(user?.restaurantId || '');
              if (result.title && result.message) {
                setInfoModal({ open: true, title: result.title, message: result.message });
              }
            }}
            title={isAutoOpenEnabled() ? t('pos:terminal.customerDisplayAuto', 'Customer Display (auto-open enabled)') : t('pos:terminal.customerDisplayTitle', 'Open Customer Display on secondary monitor')}
          >
            {isAutoOpenEnabled() && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--pos-brand, #635BFF)', display: 'inline-block' }} />}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
            </svg>
            <BtnLabel>{t('pos:terminal.customerDisplay', 'Customer Display')}</BtnLabel>
          </HeaderActionBtn>

          {/* Wide screens — full toolbar. Open Drawer manual button is here. */}
          <HeaderDesktopActions>
            <HeaderActionBtn type="button"
              onClick={async () => {
                try {
                  const { openCashDrawer } = await import('../../utils/billPrint');
                  const ok = await openCashDrawer();
                  if (!ok) {
                    setInfoModal({
                      open: true,
                      title: 'Drawer did not open',
                      message: 'Cash drawer pulse needs QZ Tray or RawBT (not Browser print mode).\nCheck Settings → Workstations → Method.'
                    });
                  }
                } catch (e: any) {
                  setInfoModal({ open: true, title: 'Drawer error', message: e?.message || 'Unknown error' });
                }
              }}
              title={t('pos:terminal.openDrawerTitle', 'Send open-drawer pulse to the bill printer')}
            >
              {t('pos:terminal.openDrawer', 'Open Drawer')}
            </HeaderActionBtn>
          </HeaderDesktopActions>

          {/* Narrow screens (≤1280px) — kebab menu collects secondary actions. */}
          <HeaderCompactActions>
            <OverflowMenu
              ariaLabel="More POS terminal actions"
              items={[
                {
                  id: 'open-drawer',
                  label: t('pos:terminal.openDrawer', 'Open Drawer'),
                  onClick: async () => {
                    try {
                      const { openCashDrawer } = await import('../../utils/billPrint');
                      const ok = await openCashDrawer();
                      if (!ok) {
                        setInfoModal({
                          open: true,
                          title: 'Drawer did not open',
                          message: 'Cash drawer pulse needs QZ Tray or RawBT (not Browser print mode).\nCheck Settings → Workstations → Method.'
                        });
                      }
                    } catch (e: any) {
                      setInfoModal({ open: true, title: 'Drawer error', message: e?.message || 'Unknown error' });
                    }
                  }
                }
              ] as OverflowMenuItem[]}
            />
          </HeaderCompactActions>

          {/* 보기 색상 토글 (밝게/고대비/어둡게) — Open Drawer 뒤. 항상 표시, 기기별 기억. */}
          <div role="group" aria-label="Display theme" style={{
            display: 'inline-flex', gap: 2, borderRadius: 8, padding: 3,
            background: 'var(--pos-surface-2, #EDF1F5)', border: '1px solid var(--pos-border, #C7CED6)'
          }}>
            {POS_THEME_MODES.map(m => {
              const label = t(`pos:terminal.theme${m.charAt(0).toUpperCase()}${m.slice(1)}`,
                { defaultValue: { light: 'Light', contrast: 'High Contrast', dark: 'Dark' }[m] });
              return (
              <button key={m} type="button"
                onClick={() => selectPosTheme(m)}
                aria-pressed={posTheme === m}
                title={label}
                style={{
                  minWidth: 40, height: 30, padding: '0 10px', fontSize: 12, fontWeight: 600,
                  border: 'none', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap',
                  background: posTheme === m ? 'var(--pos-brand, #635BFF)' : 'transparent',
                  color: posTheme === m ? '#FFFFFF' : 'var(--pos-text-muted, #4B5563)',
                }}
              >{label}</button>
              );
            })}
          </div>
        </HeaderInfo>
      </Header>
      )}

      <MainLayout>
        <MenuSection>
          <SearchSection>
            <SearchInputContainer style={{ maxWidth: 360 }}>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {searchQuery && (
                <ClearSearchBtn
                  onClick={handleClearSearch}
                  title="Clear search"
                >
                  ×
                </ClearSearchBtn>
              )}
            </SearchInputContainer>

            {/* Sort dropdown — applied to every category / mode / search result.
                Default = newest. localStorage persists per-device. */}
            <select
              aria-label={t('pos:terminal.sortLabel', 'Sort by')}
              value={sortBy}
              onChange={(e) => setSortByPersistent(e.target.value as SortKey)}
              style={{
                height: 36, padding: '0 28px 0 12px',
                border: '1px solid var(--pos-border, #C7CED6)',
                borderRadius: 6,
                background: 'var(--pos-surface, #FFFFFF)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--pos-text, #0A2540)',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\'%3E%3Cpath d=\'M3 4.5L6 7.5L9 4.5\' stroke=\'%236B7C93\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center'
              }}
            >
              <option value="newest">{t('pos:terminal.sortNewest', 'Newest')}</option>
              <option value="name">{t('pos:terminal.sortName', 'Name A–Z')}</option>
              <option value="price_asc">{t('pos:terminal.sortPriceAsc', 'Price ↑')}</option>
              <option value="price_desc">{t('pos:terminal.sortPriceDesc', 'Price ↓')}</option>
            </select>

            {/* View mode segmented toggle — Image (default, with photos)
                vs Compact (text-only, denser, surfaces the "All" tab). */}
            <div style={{ flex: 1 }} />
            <ViewToggle role="group" aria-label={t('pos:terminal.viewMode', 'View mode')}>
              <ViewToggleBtn
                type="button"
                active={displayMode === 'photo'}
                onClick={() => setDisplayModePersistent('photo')}
                title={t('pos:terminal.switchToPhoto', 'Switch to image mode')}
              >
                {t('pos:terminal.photoMode', 'Image')}
              </ViewToggleBtn>
              <ViewToggleBtn
                type="button"
                active={displayMode === 'simple'}
                onClick={() => setDisplayModePersistent('simple')}
                title={t('pos:terminal.switchToSimple', 'Switch to compact mode')}
              >
                {t('pos:terminal.simpleMode', 'Compact')}
              </ViewToggleBtn>
            </ViewToggle>
            {/* 2026-06-28 (5-1): 풀스크린 토글 — 상단 헤더 숨김/표시. SearchSection은 항상 보여 나가기도 여기서. */}
            <button
              type="button"
              onClick={togglePosFullscreen}
              title={posFullscreen ? t('pos:terminal.exitFullscreen', { defaultValue: 'Exit fullscreen' }) : t('pos:terminal.fullscreen', { defaultValue: 'Fullscreen' })}
              aria-label={posFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              style={{ width: 36, height: 36, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--pos-border, #C7CED6)', borderRadius: 6, background: 'var(--pos-surface, #fff)', color: 'var(--pos-text, #0A2540)', cursor: 'pointer' }}
            >
              {posFullscreen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 14h6v6m10-10h-6V4M14 10l7-7M3 21l7-7"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/></svg>
              )}
            </button>
          </SearchSection>

          <CategoryBar>
          <CategoryPager>
            {!catExpanded && catPage.total > 1 && (
              <CategoryPageBtn
                type="button"
                onClick={() => scrollCatPage(-1)}
                disabled={catPage.cur <= 1}
                title={t('pos:terminal.prevCategories', { defaultValue: 'Previous categories' })}
                aria-label="Previous categories"
              >‹</CategoryPageBtn>
            )}
            <CategoryTabs ref={categoryTabsRef} onScroll={recomputeCatPage} $expanded={catExpanded}>
              {/* "All" tab is only available in Simple mode — text rendering scales,
                  but loading every category's images at once is too slow for large menus. */}
              {displayMode === 'simple' && (
                <CategoryTab
                  active={selectedCategory === 'all' && !isSearchMode}
                  onClick={() => handleCategorySelect('all')}
                >
                  {t('pos:terminal.categoryAll', 'All')}
                </CategoryTab>
              )}
              {categories.map(category => (
                <CategoryTab
                  key={category.id}
                  active={selectedCategory === category.id && !isSearchMode}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.emoji} {category.name}
                </CategoryTab>
              ))}
            </CategoryTabs>
            {!catExpanded && catPage.total > 1 && (
              <CategoryPageBtn
                type="button"
                onClick={() => scrollCatPage(1)}
                disabled={catPage.cur >= catPage.total}
                title={t('pos:terminal.nextCategories', { defaultValue: 'More categories' })}
                aria-label="More categories"
              >›</CategoryPageBtn>
            )}
            {(catExpanded || catPage.total > 1) && (
              <CategoryAllBtn
                type="button"
                onClick={toggleCatExpanded}
                title={catExpanded
                  ? t('pos:terminal.collapseCategories', { defaultValue: 'Collapse' })
                  : t('pos:terminal.allCategories', { defaultValue: 'Show all categories' })}
                aria-label={catExpanded
                  ? t('pos:terminal.collapseCategories', { defaultValue: 'Collapse' })
                  : t('pos:terminal.allCategories', { defaultValue: 'Show all categories' })}
                aria-expanded={catExpanded}
              >{catExpanded ? '▴' : '▾'}</CategoryAllBtn>
            )}
          </CategoryPager>
          </CategoryBar>

          {isSearchMode && (
            <div style={{
              padding: '8px 16px',
              background: 'transparent',
              fontSize: '14px',
              color: 'var(--pos-text-muted, #4B5563)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span>Search results for "{searchQuery}" ({filteredMenuItems.length} items)</span>
            </div>
          )}

          <MenuGrid style={displayMode === 'simple'
            ? { gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }
            : undefined}>
            {filteredMenuItems.length > 0 ? (
              <>
                {(useProgressive ? filteredMenuItems.slice(0, visibleCount) : filteredMenuItems).map(item => {
                  // Check if item has option groups defined in menu data
                  const hasOptions = item.optionGroups && item.optionGroups.length > 0;

                  if (displayMode === 'simple') {
                    return (
                      <MenuItem
                        key={item.id}
                        soldOut={effSoldOut(item)}
                        onClick={() => { if (lpFired.current) { lpFired.current = false; return; } handleAddItemDirectly(item); }}
                        onPointerDown={() => startLongPress(item)}
                        onPointerUp={cancelLongPress}
                        onPointerLeave={cancelLongPress}
                        title="Long-press to toggle sold-out"
                        style={{ padding: '12px 16px', textAlign: 'left' }}
                      >
                        {item.is_set_menu && <SetBadge>{'SET'}</SetBadge>}
                        <MenuName style={{ marginBottom: 2 }}>{item.code ? `${item.code} ` : ''}{item.name}</MenuName>
                        <MenuPrice style={{ fontSize: 14 }}>{currency} {item.price.toFixed(2)}</MenuPrice>
                        {hasOptions && (
                          <MenuItemActions>
                            <OptionButton
                              onClick={(e) => handleShowOptions(item, e)}
                              disabled={item.soldOut}
                            >
                              {t('pos:terminal.options', 'Options')}
                            </OptionButton>
                          </MenuItemActions>
                        )}
                      </MenuItem>
                    );
                  }

                  return (
                    <MenuItem
                      key={item.id}
                      soldOut={effSoldOut(item)}
                      onClick={() => { if (lpFired.current) { lpFired.current = false; return; } handleAddItemDirectly(item); }}
                      onPointerDown={() => startLongPress(item)}
                      onPointerUp={cancelLongPress}
                      onPointerLeave={cancelLongPress}
                      title="Long-press to toggle sold-out"
                    >
                      {item.is_set_menu && <SetBadge>{'SET'}</SetBadge>}
                      <MenuImage hasImage={!!item.image}>
                        {item.image ? (
                          // onError: 파일 소실(dead ref) 시 깨진 아이콘 대신 숨김 (2026-06-12 thefire02 사고 가드)
                          <img src={item.image} alt={item.name} loading="lazy" decoding="async"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                        ) : (
                          item.emoji
                        )}
                      </MenuImage>
                      <MenuName>{item.code ? `${item.code} ` : ''}{item.name}</MenuName>
                      <MenuPrice>{currency} {item.price.toFixed(2)}</MenuPrice>
                      {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
                        <SetItemsPreview>
                          {item.set_items.map(si => `${si.name} x${si.quantity}`).join(', ')}
                        </SetItemsPreview>
                      )}
                      {hasOptions && (
                        <MenuItemActions>
                          <OptionButton
                            onClick={(e) => handleShowOptions(item, e)}
                            disabled={item.soldOut}
                          >
                            Options
                          </OptionButton>
                        </MenuItemActions>
                      )}
                    </MenuItem>
                  );
                })}
                {/* Progressive loading trigger - only show when using progressive rendering */}
                {useProgressive && visibleCount < filteredMenuItems.length && (
                  <div ref={loadMoreTriggerRef} style={{ gridColumn: '1 / -1', height: '20px' }} />
                )}
              </>
            ) : isLoadingMenu ? (
              <NoResultsMessage>
                <div className="icon">⏳</div>
                <div className="title">{'Loading...'}</div>
              </NoResultsMessage>
            ) : (
              <NoResultsMessage>
                <div className="icon">🔍</div>
                <div className="title">
                  {isSearchMode ? `No results for "${searchQuery}"` : 'No items in this category'}
                </div>
                <div className="message">
                  {isSearchMode ? 'Try searching with different keywords' : 'Select a different category to view items'}
                </div>
              </NoResultsMessage>
            )}
          </MenuGrid>
        </MenuSection>

        <OrderSection>
          <OrderTypeToggle>
            <OrderTypeBtn
              active={orderType === 'dine-in'}
              onClick={() => setOrderType('dine-in')}
            >
              Dine In
            </OrderTypeBtn>
            <OrderTypeBtn
              active={orderType === 'takeaway'}
              onClick={() => setOrderType('takeaway')}
            >
              Takeaway
            </OrderTypeBtn>
          </OrderTypeToggle>

          {/* 2026-06-28 (5-4): 고객 검색 + 테이블넘버를 한 행으로 — 우측 패널 세로공간 절약. */}
          <TopControlsRow>
          <CustomerSearchSection style={{ flex: 1, minWidth: 0, padding: 0 }}>
            {selectedCustomerForOrder ? (
              <SelectedCustomerDisplay>
                <SelectedCustomerInfo>
                  <SelectedCustomerName>{selectedCustomerForOrder.name}</SelectedCustomerName>
                  <SelectedCustomerMeta>
                    {selectedCustomerForOrder.phone && `${selectedCustomerForOrder.phone} • `}
                    {selectedCustomerForOrder.id}
                  </SelectedCustomerMeta>
                </SelectedCustomerInfo>
                <ClearCustomerBtn onClick={handleClearCustomer}>
                  Clear
                </ClearCustomerBtn>
              </SelectedCustomerDisplay>
            ) : (
              <CustomerSearchContainer>
                <CustomerSearchIcon>🔍</CustomerSearchIcon>
                <CustomerSearchInput
                  type="text"
                  placeholder="Walk-in Customer"
                  value={customerSearchQuery}
                  onChange={handleCustomerSearchChange}
                  onFocus={() => {
                    if (customerSearchQuery.trim()) {
                      setShowCustomerDropdown(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 200)}
                />
                <CustomerSearchDropdown show={showCustomerDropdown && filteredCustomers.length > 0}>
                  {filteredCustomers.map((customer: any) => (
                    <CustomerSearchItem
                      key={customer.id}
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <CustomerItemName>{customer.name}</CustomerItemName>
                      <CustomerItemDetails>
                        {customer.phone && `${customer.phone} • `}
                        {customer.id}
                      </CustomerItemDetails>
                    </CustomerSearchItem>
                  ))}
                </CustomerSearchDropdown>
                <CustomerSearchDropdown show={showCustomerDropdown && customerSearchQuery.trim().length > 0 && filteredCustomers.length === 0 && !isSearchingCustomers}>
                  <CustomerSearchItem style={{ cursor: 'default', color: 'var(--pos-text-muted, #4B5563)' }}>
                    No customers found
                  </CustomerSearchItem>
                </CustomerSearchDropdown>
                <CustomerSearchDropdown show={showCustomerDropdown && isSearchingCustomers}>
                  <CustomerSearchItem style={{ cursor: 'default', color: 'var(--pos-text-muted, #4B5563)' }}>
                    Searching...
                  </CustomerSearchItem>
                </CustomerSearchDropdown>
              </CustomerSearchContainer>
            )}
          </CustomerSearchSection>

          {/* Table input shown for BOTH dine-in AND takeaway (5-4: 검색창과 한 행).
              2026-05-27: takeaway can also pin to a table — the shop wants the
              order to land on that table's open bill.
              2026-06-29 (Irene): 수동 게스트수 셀렉터 제거 — 우리 솔루션에 불필요한 입력.
              인원수가 필요한 외부 연동(IOI Mall noofpax)은 전송 시점에 테이블 좌석수로 산출. */}
          {(orderType === 'dine-in' || orderType === 'takeaway') && availableTables.length > 0 && (
            <TableNumberSelect
              aria-label="Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              style={{ width: 150, flexShrink: 0 }}
            >
              <option value="">{orderType === 'takeaway' ? 'No table' : 'Free Seating'}</option>
              {availableTables.map(table => (
                <option key={table} value={table}>{`Table ${table}`}</option>
              ))}
            </TableNumberSelect>
          )}
          </TopControlsRow>

          {orderItems.length === 0 ? (
            <EmptyOrder>
              <EmptyText>{'No items in order'}</EmptyText>
              <EmptyText style={{ marginTop: '8px', fontSize: '12px' }}>
                Select menu items to start
              </EmptyText>
            </EmptyOrder>
          ) : (
            <ScrollableOrderContent>
              <OrderItems>
                <OrderItemsHeader>{orderItems.length} {orderItems.length === 1 ? 'item' : 'items'}</OrderItemsHeader>
                {orderItems.map(item => (
                  <OrderItem key={item.id}>
                    <ItemInfo>
                      <ItemName>{item.menuItem.code ? `${item.menuItem.code} ` : ''}{item.menuItem.name}</ItemName>
                      {Array.isArray((item as any).set_components) && (item as any).set_components.length > 0 && (
                        <ItemOptions style={{ fontWeight: 600 }}>
                          {(item as any).set_components.map((c: any, ci: number) => (
                            <div key={ci}>· {c?.name}{Array.isArray(c?.options) && c.options.length ? ` (${c.options.join(', ')})` : ''}</div>
                          ))}
                        </ItemOptions>
                      )}
                      {item.options && item.options.length > 0 && (() => {
                        // Separate set menu items and regular options
                        const setItems: string[] = [];
                        const regularOptions: string[] = [];

                        item.options.forEach(option => {
                          // Check if this is a set menu item (format: "item name xN")
                          if (/^.+\sx\d+$/.test(option)) {
                            setItems.push(option);
                          } else {
                            regularOptions.push(option);
                          }
                        });

                        return (
                          <>
                            {setItems.length > 0 && (
                              <ItemOptions style={{ fontWeight: 600 }}>
                                {setItems.join(', ')}
                              </ItemOptions>
                            )}
                            {regularOptions.length > 0 && (
                              <ItemOptions>
                                ⭐ {regularOptions.join(', ')}
                              </ItemOptions>
                            )}
                          </>
                        );
                      })()}
                      {/* 2026-06-28 (4-1, Irene 재설계): 품목별 메모 — 작은 POS에서 인라인은 어려워서
                          버튼 → 팝업(온스크린 키보드)으로. 메모 있으면 내용 표시(터치=수정), 없으면 "Add note". */}
                      <button
                        type="button"
                        onClick={() => { setMemoModalItemId(item.id); setMemoDraft(item.special_instructions || ''); }}
                        style={{
                          marginTop: 8, marginBottom: 4, minHeight: 36, width: '100%', maxWidth: 280, boxSizing: 'border-box',
                          padding: '8px 10px', textAlign: 'left', cursor: 'pointer', borderRadius: 6,
                          fontSize: 13, fontWeight: item.special_instructions ? 600 : 500,
                          background: item.special_instructions ? 'var(--pos-brand-tint, #EDE9FE)' : 'transparent',
                          border: item.special_instructions ? '1px solid var(--pos-border, #C7CED6)' : '1px dashed var(--pos-border, #C7CED6)',
                          color: item.special_instructions ? 'var(--pos-text, #0A2540)' : 'var(--pos-text-muted, #64748B)',
                        }}
                      >
                        {item.special_instructions
                          ? `✎ ${item.special_instructions}`
                          : t('pos:pOSTerminalPage.addItemNote', { defaultValue: 'Add note' })}
                      </button>
                    </ItemInfo>
                    <ItemControls>
                      <QuantityControl>
                        <QuantityBtn onClick={() => handleQuantityChange(item.id, -1)}>
                          -
                        </QuantityBtn>
                        <Quantity>{item.quantity}</Quantity>
                        <QuantityBtn onClick={() => handleQuantityChange(item.id, 1)}>
                          +
                        </QuantityBtn>
                      </QuantityControl>
                      <ItemPrice>
                        {(() => {
                          let itemTotal = item.menuItem.price * item.quantity;
                          if (item.selectedOptions && item.selectedOptions.length > 0) {
                            const optionsTotal = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
                            itemTotal += optionsTotal * item.quantity;
                          }
                          return itemTotal.toFixed(2);
                        })()}
                      </ItemPrice>
                      <DeleteBtn onClick={() => handleDeleteItem(item.id)}>
                        ×
                      </DeleteBtn>
                    </ItemControls>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderSummary>
                <SummaryRow>
                  <SummaryLabel>{'Subtotal'}</SummaryLabel>
                  <SummaryValue>{currency} {subtotal.toFixed(2)}</SummaryValue>
                </SummaryRow>
                {takeawayCharge > 0 && (
                  <SummaryRow>
                    <SummaryLabel>{'Takeaway Charge'}</SummaryLabel>
                    <SummaryValue>{currency} {takeawayCharge.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {discountAmount > 0 && (
                  <SummaryRow>
                    <SummaryLabel>{'Discount'}</SummaryLabel>
                    <SummaryValue style={{ color: 'var(--pos-positive, #10B981)' }}>-{currency} {discountAmount.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {appliedCoupon && (
                  <SummaryRow>
                    <SummaryLabel>Coupon ({appliedCoupon.code})</SummaryLabel>
                    <SummaryValue style={{ color: 'var(--pos-positive, #10B981)' }}>-{currency} {couponDiscount.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {appliedDiscountPolicy && (
                  <SummaryRow>
                    <SummaryLabel>Discount ({appliedDiscountPolicy.name})</SummaryLabel>
                    <SummaryValue style={{ color: 'var(--pos-positive, #10B981)' }}>-{currency} {policyDiscount.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {operationSettings.serviceChargeEnabled && serviceCharge > 0 && (
                  <SummaryRow>
                    <SummaryLabel>Service Charge ({operationSettings.serviceChargeRate}%)</SummaryLabel>
                    <SummaryValue>{currency} {serviceCharge.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {operationSettings.taxEnabled && tax > 0 && (
                  <SummaryRow>
                    <SummaryLabel>Tax ({operationSettings.taxRate}%)</SummaryLabel>
                    <SummaryValue>{currency} {tax.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                <TotalRow>
                  <SummaryLabel>{'Total'}</SummaryLabel>
                  <SummaryValue>{currency} {total.toFixed(2)}</SummaryValue>
                </TotalRow>
              </OrderSummary>

              {/* 2026-06-26 (#11 리마크): 주문 전체 메모. 빠른선택 칩 + 자유입력(자동저장).
                  품목별 메모와 별개. 터치 타겟 44px, 흰 입력 배경, POS 토큰. */}
              {/* 2026-06-29 (Irene): 전체주문 메모 = 아이템 메모와 동일하게 버튼 → 팝업+온스크린 키보드.
                  (인라인 입력 폐지) 저장된 메모는 표시 + 탭하면 같은 팝업으로 수정.
                  좌우 16px 패딩 = OrderSummary/DiscountSection 과 정렬(패널 끝에 안 들러붙게). */}
              <div style={{ padding: '0 16px', marginTop: 14, marginBottom: 4 }}>
                {!orderRemark ? (
                  <button
                    type="button"
                    onClick={() => { setMemoDraft(''); setMemoModalOrder(true); }}
                    style={{
                      width: '100%', minHeight: 44, padding: '0 14px', borderRadius: 10, cursor: 'pointer',
                      background: 'var(--pos-surface-2, #F8FAFC)', color: 'var(--pos-text-muted, #64748B)',
                      border: '1px dashed var(--pos-border, #E2E8F0)', fontSize: 14, fontWeight: 500,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {t('pos:pOSTerminalPage.addOrderNote', 'Add order note')}
                  </button>
                ) : (
                  <div style={{
                    border: '1px solid var(--pos-border, #E2E8F0)', borderRadius: 10,
                    padding: 12, background: 'var(--pos-surface, #fff)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--pos-text, #0F172A)' }}>
                        {t('pos:pOSTerminalPage.orderNote', 'Order note')}
                      </span>
                      <button
                        type="button"
                        onClick={() => setOrderRemark('')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--pos-text-muted, #64748B)', padding: 4 }}
                      >
                        {t('common:clear', 'Clear')}
                      </button>
                    </div>
                    {/* 저장된 메모 — 탭하면 동일 팝업(키보드)으로 수정 */}
                    <button
                      type="button"
                      onClick={() => { setMemoDraft(orderRemark); setMemoModalOrder(true); }}
                      style={{
                        width: '100%', minHeight: 48, padding: '12px 14px', textAlign: 'left', cursor: 'pointer',
                        borderRadius: 8, border: '1px solid var(--pos-border, #E2E8F0)',
                        background: '#fff', color: 'var(--pos-text, #0F172A)', fontSize: 14,
                        fontFamily: 'inherit', boxSizing: 'border-box', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                      }}
                    >
                      {orderRemark}
                    </button>
                  </div>
                )}
              </div>

              <DiscountSection>
                <DiscountRow>
                  {appliedCoupon ? (
                    <AppliedCoupon>
                      <span>Coupon: {appliedCoupon.code} (-{currency} {appliedCoupon.discount.toFixed(2)})</span>
                      <RemoveBtn onClick={handleRemoveCoupon}>×</RemoveBtn>
                    </AppliedCoupon>
                  ) : (() => {
                    const searchLower = couponCode.trim().toLowerCase();
                    const filteredCoupons = searchLower
                      ? availableCoupons.filter(c =>
                          (c.code && c.code.toLowerCase().includes(searchLower)) ||
                          (c.name && c.name.toLowerCase().includes(searchLower))
                        )
                      : availableCoupons;
                    const formatCouponLabel = (c: any) => {
                      const v = Number(c.value || 0);
                      if (c.type === 'percentage') return `${v}% off`;
                      return `${currency} ${v.toFixed(2)} off`;
                    };
                    return (
                      <div style={{ position: 'relative', flex: 1, display: 'flex', gap: '8px' }}>
                        <DiscountInput
                          type="text"
                          placeholder={t('pos:pOSTerminalPage.searchOrEnterCoupon', 'Search or enter coupon code') as string}
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          onFocus={() => { fetchAvailableCoupons(); setShowCouponDropdown(true); }}
                          onBlur={() => setTimeout(() => setShowCouponDropdown(false), 200)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleApplyCoupon(); if (e.key === 'Escape') { setCouponCode(''); setShowCouponDropdown(false); (e.target as HTMLInputElement).blur(); } }}
                          style={{ flex: 1 }}
                        />
                        <DiscountButton
                          onClick={() => handleApplyCoupon()}
                          disabled={!couponCode}
                        >
                          {t('pos:pOSTerminalPage.applyCoupon', 'Apply Coupon')}
                        </DiscountButton>
                        {showCouponDropdown && (
                          <div
                            onMouseDown={(e) => e.preventDefault()}
                            style={{
                              position: 'absolute',
                              top: 'calc(100% + 4px)',
                              left: 0,
                              right: 0,
                              maxHeight: '280px',
                              overflowY: 'auto',
                              background: 'var(--pos-surface, #FFFFFF)',
                              border: '1px solid var(--pos-border, #C7CED6)',
                              borderRadius: '8px',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                              zIndex: 100
                            }}
                          >
                            {availableCoupons.length === 0 ? (
                              <div style={{ padding: '14px', textAlign: 'center', color: 'var(--pos-border-strong, #6B7280)', fontSize: '13px' }}>
                                {couponsLoaded
                                  ? t('pos:pOSTerminalPage.noActiveCoupons', 'No active coupons. Enter a code manually if you have one.')
                                  : t('pos:pOSTerminalPage.loadingCoupons', 'Loading...')}
                              </div>
                            ) : filteredCoupons.length === 0 ? (
                              <div style={{ padding: '14px', textAlign: 'center', color: 'var(--pos-border-strong, #6B7280)', fontSize: '13px' }}>
                                {t('pos:pOSTerminalPage.noMatchingCoupons', 'No matching coupons.')}
                              </div>
                            ) : (
                              filteredCoupons.slice(0, 20).map((c: any) => {
                                const minOrder = Number(c.min_order || 0);
                                const eligible = minOrder === 0 || subtotal >= minOrder;
                                return (
                                  <div
                                    key={c.id}
                                    onClick={() => { if (eligible) handleApplyCoupon(c.code); }}
                                    style={{
                                      padding: '12px 16px',
                                      cursor: eligible ? 'pointer' : 'not-allowed',
                                      opacity: eligible ? 1 : 0.5,
                                      fontSize: '13px',
                                      color: 'var(--pos-text, #0A2540)',
                                      borderBottom: '1px solid var(--pos-surface-2, #F1F4F8)',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      gap: '12px',
                                      background: 'var(--pos-surface, #FFFFFF)',
                                      transition: 'background 0.1s'
                                    }}
                                    onMouseEnter={(e) => { if (eligible) e.currentTarget.style.background = 'var(--pos-brand-tint, #F5F3FF)'; }}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--pos-surface, #FFFFFF)'}
                                  >
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                                      <span style={{ fontWeight: 600, color: 'var(--pos-brand, #635BFF)', marginRight: '8px' }}>{c.code}</span>
                                      {c.name && <span style={{ color: 'var(--pos-text-muted, #4B5563)' }}>{c.name}</span>}
                                      {minOrder > 0 && !eligible && (
                                        <span style={{ marginLeft: '6px', fontSize: '11px', color: '#EF4444' }}>
                                          ({t('pos:pOSTerminalPage.minOrder', 'min')} {currency} {minOrder.toFixed(2)})
                                        </span>
                                      )}
                                    </span>
                                    <span style={{ color: 'var(--pos-brand, #635BFF)', fontWeight: 500, flexShrink: 0 }}>
                                      {formatCouponLabel(c)}
                                    </span>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </DiscountRow>

                <DiscountRow>
                  <QuickDiscountButtons>
                    <QuickDiscountBtn
                      active={discount === 5}
                      onClick={() => handleApplyDiscount(5)}
                    >
                      {currency} 5
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      active={discount === 10}
                      onClick={() => handleApplyDiscount(10)}
                    >
                      {currency} 10
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      active={discount === 15}
                      onClick={() => handleApplyDiscount(15)}
                    >
                      {currency} 15
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      onClick={() => setShowCustomAmountModal(true)}
                    >
                      Custom {currency}
                    </QuickDiscountBtn>
                  </QuickDiscountButtons>
                </DiscountRow>

                <DiscountRow>
                  <QuickDiscountButtons>
                    <QuickDiscountBtn
                      active={appliedDiscountPolicy?.name === '10%'}
                      onClick={() => handleApplyDiscountPolicy('10%')}
                    >
                      10%
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      active={appliedDiscountPolicy?.name === 'Staff'}
                      onClick={() => handleApplyDiscountPolicy('Staff')}
                    >
                      20%
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      active={appliedDiscountPolicy?.name === 'VIP'}
                      onClick={() => handleApplyDiscountPolicy('VIP')}
                    >
                      15%
                    </QuickDiscountBtn>
                    <QuickDiscountBtn onClick={() => setShowCustomPercentModal(true)}>
                      Custom %
                    </QuickDiscountBtn>
                  </QuickDiscountButtons>
                </DiscountRow>
              </DiscountSection>
            </ScrollableOrderContent>
          )}

          {operationSettings.pagerSystem.enabled && orderItems.length > 0 && (
            <TableNumberSection>
              <TableNumberLabel>Pager Number:</TableNumberLabel>
              <PagerSearchContainer>
                <PagerSearchInput
                  type="text"
                  value={pagerSearchQuery}
                  onChange={handlePagerSearchChange}
                  onFocus={() => {
                    if (pagerSearchQuery.trim() || !pagerNumber) {
                      setShowPagerDropdown(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowPagerDropdown(false), 200)}
                  placeholder={pagerNumber ? `#${pagerNumber}` : "Type or click..."}
                />
                <PagerSearchDropdown show={showPagerDropdown}>
                  {getFilteredPagers().length > 0 ? (
                    getFilteredPagers().map(num => (
                      <PagerSearchItem
                        key={num}
                        onClick={() => handleSelectPager(num)}
                      >
                        Pager #{num}
                      </PagerSearchItem>
                    ))
                  ) : (
                    <PagerSearchItem style={{ cursor: 'default', color: 'var(--pos-text-muted, #4B5563)' }}>
                      No matching pagers
                    </PagerSearchItem>
                  )}
                </PagerSearchDropdown>
              </PagerSearchContainer>
            </TableNumberSection>
          )}

          <OrderActions>
            <ActionBtn
              variant="danger"
              onClick={handleClearOrder}
              style={{ flex: '0 0 auto', minWidth: 72, padding: '14px 12px' }}
            >
              Clear
            </ActionBtn>
            {/* 서버(홀) 역할은 결제 권한이 없어 "Pay Now" 숨김 → "Pay Later"(주문만 전송)로 주문.
                이 때 Pay Later 를 primary 로 강조해 주 액션이 비지 않게. (2026-06-24 access_payment 분리) */}
            <ActionBtn variant={canTakePayment ? 'secondary' : 'primary'} onClick={handleAddOrder}>
              Pay Later
            </ActionBtn>
            {canTakePayment && (
              <ActionBtn variant="primary" onClick={handlePayment}>
                Pay Now
              </ActionBtn>
            )}
          </OrderActions>
        </OrderSection>
      </MainLayout>


      {/* 2026-06-28 (4-1, Irene): 품목별 메모 팝업 + 온스크린 키보드 (터치 POS). 명시 저장.
          2026-06-29 (Irene): 같은 팝업을 전체주문 메모(order mode)에도 재사용. */}
      {(memoModalItemId || memoModalOrder) && (() => {
        const isOrder = memoModalOrder;
        const memoItem = !isOrder ? orderItems.find(o => o.id === memoModalItemId) : null;
        const closeMemo = () => { setMemoModalItemId(null); setMemoModalOrder(false); setMemoDraft(''); };
        // order mode 빠른칩 = 프리셋 + 이전에 쓴 리마크(중복 제거, 최대 8). item mode = 자주 쓰는 품목 메모.
        const chips = isOrder
          ? [...REMARK_PRESETS, ...remarkHistory]
              .filter((v, i, a) => a.findIndex(x => x.toLowerCase() === v.toLowerCase()) === i)
              .slice(0, 8)
          : [
              t('pos:pOSTerminalPage.noteNoOnion', { defaultValue: 'No onion' }),
              t('pos:pOSTerminalPage.noteLessSpicy', { defaultValue: 'Less spicy' }),
              t('pos:pOSTerminalPage.noteExtraSpicy', { defaultValue: 'Extra spicy' }),
              t('pos:pOSTerminalPage.noteNoVeg', { defaultValue: 'No veg' }),
            ];
        return (
          <UIModal
            isOpen={true}
            onClose={closeMemo}
            title={isOrder
              ? t('pos:pOSTerminalPage.orderNote', { defaultValue: 'Order note' })
              : t('pos:pOSTerminalPage.itemNoteTitle', { defaultValue: 'Item note' })}
            size="large"
            footer={<>
              <UIModalButton variant="secondary" onClick={closeMemo}>{t('common:cancel', { defaultValue: 'Cancel' })}</UIModalButton>
              <UIModalButton variant="primary" onClick={saveMemoModal}>{t('common:save', { defaultValue: 'Save' })}</UIModalButton>
            </>}
          >
            {memoItem && (
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540', marginBottom: 10 }}>
                {memoItem.quantity} × {memoItem.menuItem?.name}
              </div>
            )}
            {/* 편집 가능한 textarea — 직접 타이핑(커서·물리키보드 OK) + 아래 온스크린 키보드 둘 다 */}
            <textarea
              ref={memoTextareaRef}
              value={memoDraft}
              onChange={(e) => setMemoDraft(e.target.value)}
              autoFocus
              rows={2}
              maxLength={500}
              placeholder={isOrder
                ? t('pos:pOSTerminalPage.orderNotePlaceholder', { defaultValue: 'Order note — e.g. allergy, birthday…' })
                : t('pos:pOSTerminalPage.itemNotePlaceholder', { defaultValue: 'Item note (e.g. no onion)' })}
              style={{
                width: '100%', boxSizing: 'border-box', minHeight: 56, padding: '12px 14px', marginBottom: 12,
                borderRadius: 8, border: '1px solid #C7CED6', background: '#FFFFFF', color: '#0A2540',
                fontSize: 16, lineHeight: 1.4, resize: 'vertical', fontFamily: 'inherit'
              }}
            />
            {/* 빠른 선택 — 자주 쓰는 메모(타이핑 줄이기). order mode = 프리셋+이전 리마크. */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {chips.map((chip, i) => (
                <button key={i} type="button"
                  onClick={() => setMemoDraft(d => d ? `${d}, ${chip}` : chip)}
                  style={{ padding: '8px 12px', fontSize: 13, fontWeight: 500, cursor: 'pointer', borderRadius: 16, border: '1px solid #C7CED6', background: '#F4F6F9', color: '#0A2540' }}>
                  {chip}
                </button>
              ))}
              {memoDraft && (
                <button type="button" onClick={() => setMemoDraft('')}
                  style={{ padding: '8px 12px', fontSize: 13, fontWeight: 500, cursor: 'pointer', borderRadius: 16, border: '1px solid #FCA5A5', background: '#FEE2E2', color: '#DC2626' }}>
                  {t('common:clear', { defaultValue: 'Clear' })}
                </button>
              )}
            </div>
            <OnScreenKeyboard onKey={memoInsert} onBackspace={memoBackspace} onSpace={() => memoInsert(' ')} onEnter={saveMemoModal} />
          </UIModal>
        );
      })()}

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        total={total}
        subtotal={subtotal}
        tax={tax}
        serviceCharge={serviceCharge}
        takeawayCharge={takeawayCharge}
        discountAmount={discountAmount}
        couponDiscount={couponDiscount}
        onConfirmPayment={handleConfirmPayment}
        paymentMethods={paymentMethods}
        taxRate={operationSettings.taxRate}
        serviceChargeRate={operationSettings.serviceChargeRate}
        taxEnabled={operationSettings.taxEnabled}
        serviceChargeEnabled={operationSettings.serviceChargeEnabled}
        cashierName={user?.name}
        customerPoints={customerPoints}
        customerTier={customerTier}
        membershipSettings={membershipSettings}
        selectedCustomerId={selectedCustomerForOrder?.id}
        restaurantId={restaurantId as any}
        orderItems={orderItems.map(it => ({ name: it.menuItem.name, quantity: it.quantity, price: it.menuItem.price }))}
      />
      
      {selectedMenuItem && (
        <OptionModal
          isOpen={showOptionModal}
          onClose={() => {
            setShowOptionModal(false);
            setSelectedMenuItem(null);
          }}
          menuItem={selectedMenuItem}
          onConfirm={handleConfirmOptions}
        />
      )}

      {showSetModal && setModalProduct && (
        <POSSetModal
          isOpen={showSetModal}
          product={{ id: setModalProduct.id, name: setModalProduct.name, price: setModalProduct.price }}
          restaurantId={restaurantId as any}
          formatCurrency={(v: number) => formatCurrency(v, operationSettings.currency)}
          onClose={() => { setShowSetModal(false); setSetModalProduct(null); }}
          onConfirm={handleConfirmSet}
        />
      )}
      
      {completedOrderData && (
        <OrderCompleteModal
          isOpen={showOrderCompleteModal}
          onClose={() => {
            handleResetPOS();
            // Floor Plan 오버레이에서 POS Terminal 은 iframe 안에서 돈다. iframe 이면 — `from`
            // 쿼리파라미터(내부 내비게이션 시 유실 가능)에 의존하지 말고 — window.parent 로 직접
            // 판정해 항상 부모에 닫힘 메시지를 보낸다. iframe 안에서 절대 navigate 하지 않는다:
            // 그러면 Floor Plan 이 오버레이 안에 중첩돼 "검정바 안 닫힘 / 2줄" 버그가 난다. (2026-06-24)
            if (window.parent !== window) {
              window.parent.postMessage({ type: 'pos-order-complete' }, '*');
            } else if (fromFloorPlan) {
              navigate(`/restaurant/${restaurantId}/floor-plan`);
            }
          }}
          orderData={completedOrderData}
          onPrintBill={() => {
            // Print is now handled inside OrderCompleteModal
            // No action needed here
          }}
        />
      )}
      
      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearOrder}
        title="Clear Order"
        message="Are you sure you want to clear all items from the order?"
        confirmText="Clear Order"
        cancelText="Cancel"
        variant="warning"
      />

      {showMergeChoiceModal && (
        <div
          onClick={() => setShowMergeChoiceModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 9200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 12, padding: 24,
              width: 480, maxWidth: 'calc(100vw - 32px)',
              maxHeight: '80vh', overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--pos-text, #0A2540)', marginBottom: 4 }}>
              {t('pos:mergeChoice.title', 'Existing order on this table')}
            </div>
            <div style={{ fontSize: 13, color: 'var(--pos-text-muted, #4B5563)', marginBottom: 16 }}>
              {t('pos:mergeChoice.subtitle', { defaultValue: 'Table {{table}} already has {{count}} pending order(s). Add to one, or create a separate order?', table: tableNumber, count: mergeableOrders.length })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {mergeableOrders.map((o) => (
                <button type="button"
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setForceMergeOrderId(Number(o.id));
                    setShowMergeChoiceModal(false);
                    setShowPaymentModal(true);
                  }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px',
                    border: '1px solid #DDD9FF',
                    background: 'var(--pos-brand-tint, #F0F4FF)',
                    borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#3B30D9' }}>
                      #{o.order_number || o.id} {o.customer_name ? '— ' + o.customer_name : ''}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--pos-text-muted, #4B5563)', marginTop: 2 }}>
                      {new Date(o.createdAt).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: false })}
                      {' · '}{currency} {Number(o.total_amount).toFixed(2)}
                    </div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#3B30D9' }}>
                    {t('pos:mergeChoice.addToThis', 'Add to this →')}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button"
                type="button"
                onClick={() => setShowMergeChoiceModal(false)}
                style={{
                  flex: 1, padding: '12px 16px', border: '1px solid var(--pos-border, #C7CED6)',
                  background: 'var(--pos-surface, #FFFFFF)', color: 'var(--pos-text-muted, #4B5563)', borderRadius: 8,
                  fontSize: 13, fontWeight: 500, cursor: 'pointer'
                }}
              >
                {t('pos:mergeChoice.cancel', 'Cancel')}
              </button>
              <button type="button"
                type="button"
                onClick={() => {
                  setForceMergeOrderId(null);
                  setShowMergeChoiceModal(false);
                  setShowPaymentModal(true);
                }}
                style={{
                  flex: 2, padding: '12px 16px', border: 'none',
                  background: 'var(--pos-brand, #635BFF)', color: 'white', borderRadius: 8,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer'
                }}
              >
                {t('pos:mergeChoice.separate', 'Create separate order')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <AlertDialog
        isOpen={showFeatureAlert}
        onClose={() => setShowFeatureAlert(false)}
        title="Coming Soon"
        message="This feature is coming soon"
        variant="info"
      />
      
      <AlertDialog
        isOpen={showCouponError}
        onClose={() => setShowCouponError(false)}
        title="Invalid Coupon"
        message="The coupon code you entered is not valid. Please check and try again."
        variant="error"
      />
      
      <NumberInputModal
        isOpen={showCustomAmountModal}
        onClose={() => setShowCustomAmountModal(false)}
        onConfirm={handleCustomAmountConfirm}
        title="Custom Discount Amount"
        label="Enter discount amount:"
        placeholder="25"
        min={0}
        suffix={` ${getCurrencySymbol(currency)}`}
        confirmText="Apply Discount"
        cancelText="Cancel"
      />
      
      <NumberInputModal
        isOpen={showCustomPercentModal}
        onClose={() => setShowCustomPercentModal(false)}
        onConfirm={handleCustomPercentConfirm}
        title="Custom Discount Percentage"
        label="Enter discount percentage:"
        placeholder="10"
        min={0}
        max={100}
        suffix="%"
        confirmText="Apply Discount"
        cancelText="Cancel"
      />

      <CustomerModal />
      
      <CashierPinModal
        show={showCashierPinModal}
        onClose={() => setShowCashierPinModal(false)}
        onVerified={(result) => {
          if (result.token && result.user) {
            switchUser(result.token, result.user);
          }
          setShowCashierPinModal(false);
        }}
        onLogout={handleLogout}
        currentCashierName={user?.name}
      />
      <DiscountPinModal
        show={showDiscountPin}
        restaurantId={restaurantId as any}
        title={pendingDiscount ? `${pendingDiscount.name} Discount` : 'Discount Approval'}
        onClose={() => { setShowDiscountPin(false); setPendingDiscount(null); }}
        onApproved={() => {
          if (pendingDiscount) {
            if (pendingDiscount.kind === 'fixed') {
              // 금액 할인 — 고정 금액 적용
              setDiscount(pendingDiscount.value);
              setAppliedDiscountPolicy(null);
            } else {
              // % 또는 정책 할인
              setAppliedDiscountPolicy({ name: pendingDiscount.name, discount: pendingDiscount.value, requiresApproval: true });
              setDiscount(0);
            }
          }
          setShowDiscountPin(false);
          setPendingDiscount(null);
        }}
      />
      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />
    </POSContainer>
  );
};

export default POSTerminalPage;
