import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import styled, { keyframes, css } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStaff } from '../../contexts/StaffContext';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { usePaymentStatus } from '../../contexts/PaymentStatusContext';
import { BrandThemeProvider } from '../../contexts/BrandThemeContext';
import { PaymentStatusModals } from '../PaymentStatus/PaymentStatusModals';
import { AccessBlocked } from '../PaymentStatus/AccessBlocked';
import LanguageSelector from '../Common/LanguageSelector';
import InboxBell from '../Inbox/InboxBell';
import PlanBadge from './PlanBadge';
import { useTranslation } from 'react-i18next';
import { useRoleDisplayName } from '../../utils/roleDisplay';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';

import { getAuthToken } from '../../utils/auth';
import { LayoutDashboard, Users, Truck, Briefcase, MessageSquare, CreditCard, Settings as SettingsIcon, ChevronsLeft, ChevronsRight, LogOut, Activity, Store, Package, ShoppingCart, FileText, Monitor, LayoutGrid, ChefHat, Tv, Smartphone, TrendingUp, Download, Building2, MapPin, Gift, Bell } from 'lucide-react';
import { usePwaInstall } from '../../contexts/PwaInstallContext';

// System Admin 2-tier sidebar widths
const SIDEBAR_ADMIN_EXPANDED = 180;
const SIDEBAR_ADMIN_COLLAPSED = 64;
const SECONDARY_PANEL_W = 180;
// On 10-12" POS monitors (≤1280px wide, e.g. 1280×800) the 2nd tier panel auto-collapses
// into a hover popover (Stripe/Notion pattern). 13" (1366px) and above keep both tiers expanded —
// content width (1006px+ on 1366) is sufficient.
const SECONDARY_AUTOCOLLAPSE_BREAKPOINT = 1280;

const LayoutContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
`;

const Sidebar = styled.div<{ isOpen?: boolean; isCollapsed?: boolean; $isSystemAdmin?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => {
    if (props.isCollapsed) return props.$isSystemAdmin ? `${SIDEBAR_ADMIN_COLLAPSED}px` : '0px';
    return `${SIDEBAR_ADMIN_EXPANDED}px`;
  }};
  height: 100vh;
  background: #EEF0F4;
  border-right: ${props => (props.isCollapsed && !props.$isSystemAdmin) ? 'none' : '1px solid #E6EBF1'};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow-x: hidden;

  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s, width 0.3s ease;
  }
`;

const SidebarHeader = styled.div<{ isCollapsed?: boolean; $isSystemAdmin?: boolean }>`
  padding: ${props => props.isCollapsed ? '16px 8px' : '14px 14px'};
  border-bottom: none;
  flex-shrink: 0;
  height: ${p => p.$isSystemAdmin ? '80px' : '56px'};
  min-height: ${p => p.$isSystemAdmin ? '80px' : 'auto'};
  max-height: ${p => p.$isSystemAdmin ? '80px' : 'none'};
  box-sizing: ${p => p.$isSystemAdmin ? 'border-box' : 'content-box'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.isCollapsed ? 'center' : 'space-between'};
  gap: 10px;
`;

const SidebarToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SidebarOpenButton = styled.button<{ isCollapsed?: boolean; $isSystemAdmin?: boolean }>`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  display: ${props => (props.isCollapsed && !props.$isSystemAdmin) ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    background: #F0F4FF;
    color: #635BFF;
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  max-width: 100px;
  max-height: 40px;
  object-fit: contain;
  display: block;
`;

const SidebarNav = styled.nav`
  padding: 8px 0 24px 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 8px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
    transition: background 0.2s;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
  
  /* 모바일에서 스무스 스크롤 */
  -webkit-overflow-scrolling: touch;
  
  /* 스크롤 페이드 효과 */
  mask-image: linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 10px), transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10px, black calc(100% - 10px), transparent 100%);
  
  @media (max-width: 768px) {
    padding-bottom: 30px;
    mask-image: none;
    -webkit-mask-image: none;
  }
`;

const NavSection = styled.div`
  margin-bottom: 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NavTitle = styled.div`
  color: #8898AA;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 16px;
  margin-bottom: 6px;
  margin-top: 20px;
`;

const NavItem = styled(Link)<{ active?: boolean; hasPending?: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #6B7C93;
  text-decoration: none;
  transition: all 0.15s;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  min-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #F0F4FF;
    color: #635BFF;
  }

  ${props => props.active && `
    background: #F0F4FF;
    color: #635BFF;
    border-right: 2px solid #635BFF;
  `}

  ${props => props.hasPending && `
    &::after {
      content: '';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #FF6B6B;
      border-radius: 50%;
      animation: blink 1s infinite;
    }
  `}

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const NavIcon = styled.span<{ hasPending?: boolean }>`
  margin-right: 10px;
  font-size: 13px;
  width: 16px;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  flex-shrink: 0;

  ${props => props.hasPending && `
    animation: pulse 1s infinite;
  `}

  @keyframes pulse {
    0%, 50% { transform: scale(1); }
    25% { transform: scale(1.15); }
  }
`;


// Disabled menu item for undeveloped features
const DisabledNavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #B0BEC5;
  font-size: 13px;
  font-weight: 500;
  min-height: 28px;
  white-space: nowrap;
  cursor: not-allowed;
  user-select: none;
`;

const DisabledNavIcon = styled.span`
  margin-right: 10px;
  font-size: 13px;
  width: 16px;
  text-align: center;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #B0BEC5;
  flex-shrink: 0;
`;

const MainContent = styled.div<{ isCollapsed?: boolean; $sidebarW?: number; $extraLeft?: number }>`
  margin-left: ${props => {
    if (props.isCollapsed && !props.$sidebarW) return '0px';
    const sw = props.$sidebarW || SIDEBAR_ADMIN_EXPANDED;
    const extra = props.$extraLeft || 0;
    return `${sw + extra}px`;
  }};
  min-height: 100vh;
  background: #FAFBFC;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// ========== System Admin 2-tier sidebar ==========
const blinkKf = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const RailItem = styled(Link)<{ $active?: boolean; $collapsed?: boolean; $hasPending?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${p => p.$collapsed ? '0' : '8px'};
  padding: ${p => p.$collapsed ? '8px 0' : '6px 10px'};
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};
  color: #6B7C93;
  text-decoration: none;
  font-size: 13px;
  font-weight: 450;
  min-height: 36px;
  position: relative;
  border-left: 3px solid transparent;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  overflow: hidden;

  svg { width: 16px; height: 16px; flex-shrink: 0; }

  &:hover {
    background: ${p => p.$active ? '#FFFFFF' : 'transparent'};
    color: #635BFF;
    svg { color: #635BFF; }
  }

  ${p => p.$active && `
    background: #FFFFFF;
    color: #635BFF;
    border-left-color: #635BFF;
    font-weight: 600;
    svg { color: #635BFF; }
  `}

  ${p => p.$hasPending && p.$collapsed && css`
    &::after {
      content: '';
      position: absolute;
      top: 6px;
      right: 10px;
      width: 8px;
      height: 8px;
      background: #FF6B6B;
      border-radius: 50%;
      animation: ${blinkKf} 1s infinite;
    }
  `}
  ${p => p.$hasPending && !p.$collapsed && css`
    &::after {
      content: '';
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #FF6B6B;
      border-radius: 50%;
      animation: ${blinkKf} 1s infinite;
    }
  `}
`;

const RailButton = styled.button<{ $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${p => p.$collapsed ? '0' : '8px'};
  padding: ${p => p.$collapsed ? '8px 0' : '6px 10px'};
  justify-content: ${p => p.$collapsed ? 'center' : 'flex-start'};
  color: #6B7C93;
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 450;
  min-height: 36px;
  position: relative;
  border-left: 3px solid transparent;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  width: 100%;

  svg { width: 16px; height: 16px; flex-shrink: 0; }

  &:hover {
    background: transparent;
    color: #635BFF;
    svg { color: #635BFF; }
  }
`;

const RailLabel = styled.span<{ $collapsed?: boolean }>`
  ${p => p.$collapsed && `display: none;`}
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SecondaryPanel = styled.aside<{ $sidebarW: number }>`
  position: fixed;
  top: 0;
  left: ${p => p.$sidebarW}px;
  width: ${SECONDARY_PANEL_W}px;
  height: 100vh;
  background: #FFFFFF;
  border-right: 1px solid #E6EBF1;
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease;
  @media (max-width: 768px) { display: none; }
`;

const SecondaryHeader = styled.div`
  background: #FFFFFF;
  padding: 16px;
  border-bottom: 1px solid #E6EBF1;
  flex-shrink: 0;
  box-sizing: border-box;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  line-height: 1;
`;

const CollapseSecondaryBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
  &:hover { background: #F4F5F8; color: #0A2540; }
  svg { width: 16px; height: 16px; }
`;

const SecondaryPopover = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${p => p.$top}px;
  left: ${p => p.$left}px;
  width: ${SECONDARY_PANEL_W}px;
  max-height: calc(100vh - 16px);
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 1100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 768px) { display: none; }
`;

const SecondaryPopoverHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #E6EBF1;
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  flex-shrink: 0;
`;

const SecondaryPopoverNav = styled.nav`
  padding: 6px 0;
  overflow-y: auto;
`;

const ExpandSecondaryBtn = styled.button<{ $sidebarW: number }>`
  position: fixed;
  top: 24px;
  left: ${p => p.$sidebarW - 14}px;
  z-index: 1200;
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: all 0.15s;
  &:hover { color: #635BFF; border-color: #635BFF; }
  svg { width: 14px; height: 14px; }
  @media (max-width: 768px) { display: none; }
`;

const SecondaryNav = styled.nav`
  padding: 8px 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
`;

const SecondaryNavItem = styled(Link)<{ $active?: boolean; $hasPending?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: #6B7C93;
  text-decoration: none;
  font-size: 13px;
  font-weight: 450;
  min-height: 32px;
  border-left: 3px solid transparent;
  transition: background 0.15s, color 0.15s;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${p => p.$active ? '#F0F4FF' : 'transparent'};
    color: #635BFF;
  }

  ${p => p.$active && `
    background: #F0F4FF;
    color: #635BFF;
    border-left-color: #635BFF;
    font-weight: 600;
  `}

  ${p => p.$hasPending && css`
    &::after {
      content: '';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #FF6B6B;
      border-radius: 50%;
      animation: ${blinkKf} 1s infinite;
    }
  `}
`;

// 모바일 (≤768px) 햄버거 메뉴 모드 — RailItem 아래로 펼쳐지는 2뎁스 accordion 패널.
// 데스크탑 (>768px) 에서는 숨김 (SecondaryPanel/Popover 사용).
const MobileSubmenu = styled.div`
  display: none;
  background: #FFFFFF;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
  padding: 4px 0;

  @media (max-width: 768px) {
    display: block;
  }

  ${SecondaryNavItem} {
    padding-left: 32px;
    font-size: 13px;
  }
`;

const MobileHeader = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  z-index: 999;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  display: none;
  align-items: center;
  justify-content: center;
  color: #0A2540;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: #F6F9FC;
    border-radius: 4px;
  }
`;

const MobileTitle = styled.div`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

// PlanBadge 는 모바일에서 폭을 차지해 다른 액션 아이콘을 밀어내므로 hide.
// 플랜 정보는 사이드바 PlanBadge 와 Plans/Subscriptions 메뉴에서 확인 가능.
const PlanBadgeWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  @media (max-width: 480px) {
    padding: 4px;
    gap: 0;
  }

  &:hover {
    background: #F1F5F9;
  }
`;

const StaffAvatar = styled.div<{ role: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 11px;
  color: white;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#DC2626';
      case 'Foodcourt General': return '#EA580C';
      case 'Brand General': return '#DC2626';
      case 'Foodcourt Manager': return '#F59E0B';
      case 'Brand Manager': return '#EF4444';
      case 'Restaurant Owner': return '#7C3AED';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const StaffInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StaffName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #1F2937;
  line-height: 1;
`;

const StaffRole = styled.div`
  font-size: 10px;
  color: #6B7280;
  text-transform: capitalize;
  line-height: 1;
`;

const MobileContent = styled.div`
  @media (max-width: 768px) {
    padding-top: 56px;
  }
`;

const Overlay = styled.div<{ isOpen?: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const SidebarFooter = styled.div<{ $collapsed?: boolean }>`
  margin-top: auto;
  ${p => p.$collapsed && `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 8px 0 12px;
  `}
`;

const LanguageSelectorWrapper = styled.div`
  border-top: 1px solid #E6EBF1;
`;

const UserInfo = styled.div`
  padding: 16px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`;

// ───── Collapsed (64px rail) footer components ─────
const FooterRailButton = styled.button<{ $accent?: boolean }>`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: ${p => p.$accent ? 'none' : '1px solid #E6EBF1'};
  background: ${p => p.$accent ? 'linear-gradient(120deg, #635BFF, #8775FF)' : '#FFFFFF'};
  color: ${p => p.$accent ? '#FFFFFF' : '#6B7C93'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  flex-shrink: 0;
  box-shadow: ${p => p.$accent ? '0 2px 6px rgba(99,91,255,0.25)' : 'none'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${p => p.$accent ? 'rgba(99,91,255,0.32)' : 'rgba(99,91,255,0.15)'};
    color: ${p => p.$accent ? '#FFFFFF' : '#635BFF'};
    border-color: ${p => p.$accent ? 'transparent' : '#C7D2FE'};
    background: ${p => p.$accent ? 'linear-gradient(120deg, #5A51E6, #7D6BFF)' : '#F0F4FF'};
  }
`;

const FooterRailDot = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #10B981;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  box-sizing: content-box;
`;

const FooterRailAvatar = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  padding: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease, transform 0.15s ease;
  margin-top: 4px;

  &:hover {
    border-color: #C7D2FE;
    transform: translateY(-1px);
  }

  > div {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
`;

const FooterRailLang = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #E6EBF1;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99,91,255,0.15);
    border-color: #C7D2FE;
  }

  /* Fill wrapper with the inner LanguageSelector icon-variant button */
  > div, > div > button {
    width: 100%;
    height: 100%;
  }
  > div > button {
    font-size: 22px;
    line-height: 1;
    border-radius: 10px;
  }
`;


const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #F0F4FF;
  }
`;

const UserAvatar = styled.div<{ role: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
  background: ${props => {
    switch(props.role) {
      case 'System Admin': return '#DC2626';
      case 'Foodcourt General': return '#EA580C';
      case 'Brand General': return '#DC2626';
      case 'Foodcourt Manager': return '#F59E0B';
      case 'Brand Manager': return '#EF4444';
      case 'Restaurant Owner': return '#7C3AED';
      case 'Restaurant Admin': return '#059669';
      case 'Staff': return '#D97706';
      default: return '#6B7280';
    }
  }};
`;

const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-size: 11px;
  color: #6B7280;
  font-weight: 500;
`;

const UserEmail = styled.div`
  font-size: 10px;
  color: #8898AA;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [brandLogo, setBrandLogo] = useState<string>('');
  const sidebarNavRef = React.useRef<HTMLDivElement>(null);
  const { logout, currentStaff, isLoggedIn } = useStaff();
  const { user, logout: authLogout } = useAuth();
  const { operationSettings } = useStore();
  const { t } = useTranslation();
  // Mobile order alerts: accumulate pending notifications until staff acks
  const [mobileAlertOrders, setMobileAlertOrders] = useState<Array<{ id: number | string; orderNumber?: string; tableNumber?: string | null; customerName?: string; total?: number; createdAt?: string }>>([]);
  const mobileAlertOrdersRef = useRef(mobileAlertOrders);
  useEffect(() => { mobileAlertOrdersRef.current = mobileAlertOrders; }, [mobileAlertOrders]);
  const operationSettingsRef = useRef(operationSettings);
  useEffect(() => { operationSettingsRef.current = operationSettings; }, [operationSettings]);
  const { canInstall, isStandalone, isIOS, promptInstall } = usePwaInstall();
  const showInstallButton = !isStandalone && (canInstall || isIOS);

  // Fullscreen pages (POS Terminal / Floor Plan / Kitchen / Customer Display / Mobile Order)
  // are sidebar entries marked openInNewTab. In a PWA standalone window,
  // window.open(_, '_blank') pops out to the external browser by spec — which
  // breaks the desktop-app experience. Branch: standalone → same-window navigate,
  // browser → keep new tab (multi-monitor workflow).
  const openSecondaryWindow = (path: string) => {
    if (isStandalone) {
      navigate(path);
    } else {
      window.open(path, '_blank');
    }
  };
  const displayRole = useRoleDisplayName();
  const { paymentStatus, canAccess } = usePaymentStatus();
  // Get restaurantId from URL or user context
  const urlRestaurantId = location.pathname.match(/\/restaurant\/(\d+)/)?.[1];
  const restaurantId = urlRestaurantId || user?.restaurantId || user?.restaurant_id?.toString() || '1';

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'System Admin': return '/pos/admin/dashboard';
      case 'Brand General': case 'Brand Manager': return '/pos/brand/general/dashboard';
      case 'Foodcourt General': case 'Foodcourt Manager': return '/pos/foodcourt/general/dashboard';
      case 'Supplier Admin': return '/pos/supplier/dashboard';
      case 'Restaurant Owner': return '/pos/owner/dashboard';
      case 'Restaurant Admin': case 'Staff': return `/restaurant/${restaurantId}/dashboard`;
      default: return '/pos/dashboard';
    }
  };


  // Get allowed routes based on subscription plan (all roles)
  const { isRouteAllowed, hasActiveSubscription, hasModule, loading: routesLoading, planType } = useAllowedRoutes(
    user?.role ? {
      role: user.role,
      restaurantId: (user.role === 'Restaurant Admin' || user.role === 'Staff') ? Number(restaurantId) : null,
      brandId: (user.role === 'Brand General' || user.role === 'Brand Manager') ? Number(user.brand_id) : null,
      foodcourtId: (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') ? Number(user.foodcourt_id) : null,
      supplierCompanyId: (user.role === 'Supplier Admin' || user.role === 'Supplier Staff') ? Number((user as any).supplier_company_id) : null,
    } : null
  );

  // Badge counts for sidebar notifications (includes pendingOrders)
  const [badgeCounts, setBadgeCounts] = useState({
    systemInquiry: 0,
    operationInquiry: 0,
    notices: 0,
    invoices: 0,
    pendingOrders: 0,
    livePoCount: 0,  // Sprint 6: incoming PO submissions for sellers
    unreadComments: { notices: 0, systemInquiry: 0, operationInquiry: 0 }
  });

  const fetchBadgeCounts = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const res = await fetch('/api/badge-counts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) setBadgeCounts(prev => ({ ...prev, ...data.data }));
      }
    } catch (e) { /* silent */ }
  }, []);

  // Referral wallet summary for the sidebar "Refer & Earn" link.
  // We pick the wallet with the largest balance to surface a single number;
  // multi-currency partners can drill into /referral/wallet for the full view.
  // null = not loaded yet, [] = loaded but empty (→ "Start earning!").
  const [referralBalance, setReferralBalance] = useState<{ currency: string; balance: number } | null | 'empty'>(null);
  const fetchReferralBalance = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const res = await fetch('/api/referrals/wallet', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return;
      const json = await res.json();
      if (!json?.success || !Array.isArray(json.data) || json.data.length === 0) {
        setReferralBalance('empty');
        return;
      }
      const top = [...json.data].sort((a, b) => Number(b.balance || 0) - Number(a.balance || 0))[0];
      const bal = Number(top?.balance || 0);
      if (!(bal > 0)) {
        setReferralBalance('empty');
        return;
      }
      setReferralBalance({ currency: String(top.currency || 'MYR'), balance: bal });
    } catch (e) { /* silent — sidebar must never crash */ }
  }, []);

  // 15초 polling (통합)
  useEffect(() => {
    if (user) {
      fetchBadgeCounts();
      const interval = setInterval(fetchBadgeCounts, 15000);
      return () => clearInterval(interval);
    }
  }, [user, fetchBadgeCounts]);

  // Referral balance — slower cadence (60s) since wallet only changes on
  // commission credit / payout / credit-applied events, all infrequent.
  useEffect(() => {
    if (!user) return;
    fetchReferralBalance();
    const interval = setInterval(fetchReferralBalance, 60000);
    return () => clearInterval(interval);
  }, [user, fetchReferralBalance]);

  // CustomEvent 리스너: 상태 변경 시 즉시 뱃지 갱신
  useEffect(() => {
    const handler = () => fetchBadgeCounts();
    window.addEventListener('refreshBadgeCounts', handler);
    return () => window.removeEventListener('refreshBadgeCounts', handler);
  }, [fetchBadgeCounts]);

  // ─── 전역 주문 알림 소리 (Restaurant Admin, Staff만) ───
  // 토글 UI 는 Notification Settings → Live Order Alert 로 이전됨.
  // 여기서는 socket 리스너가 매 알림마다 localStorage('sound_enabled') 를 읽어
  // 즉시 반영하므로 별도 React state 가 필요 없다.
  const globalSocketRef = useRef<Socket | null>(null);
  const locationRef = useRef(location);
  useEffect(() => { locationRef.current = location; }, [location]);

  // 전역 WebSocket 연결 (Restaurant Admin, Staff만)
  const userRestaurantId = user?.restaurantId || user?.restaurant_id;
  const isOrderRole = user?.role === 'Restaurant Admin' || user?.role === 'Staff';

  useEffect(() => {
    if (!userRestaurantId || !isOrderRole) return;

    const socket = io('/orders', { transports: ['websocket', 'polling'] });
    globalSocketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join-restaurant', userRestaurantId);
    });

    const playIfNotOnSoundPage = (preset: 'bell' | 'beep' | 'triple' | 'urgent' | 'melody' | 'deep' = 'bell') => {
      const path = locationRef.current.pathname;
      // Live Orders, Kitchen Display는 자체 소리 관리
      if (path.includes('/live-orders') || path.includes('/kitchen')) return;
      const enabled = localStorage.getItem('sound_enabled') !== 'false';
      if (!enabled) return;
      import('../../utils/notificationSound').then(({ startRepeatingSound }) => {
        startRepeatingSound(preset, 3000);
      });
    };

    socket.on('order-created', (payload: any) => {
      fetchBadgeCounts();
      const isMobile = payload?.source === 'mobile';
      if (isMobile) {
        const cfg = operationSettingsRef.current?.mobileOrderAlerts;
        setMobileAlertOrders(prev => {
          if (prev.some(a => String(a.id) === String(payload.id))) return prev;
          return [...prev, {
            id: payload.id,
            orderNumber: payload.order_number,
            tableNumber: payload.table_number,
            customerName: payload.customer_name,
            total: Number(payload.total_amount || 0),
            createdAt: payload.order_date
          }];
        });
        if (cfg?.soundEnabled !== false) {
          playIfNotOnSoundPage((cfg?.soundType as any) || 'bell');
        }
      } else {
        playIfNotOnSoundPage('bell');
      }
    });
    socket.on('order-items-added', () => { playIfNotOnSoundPage('bell'); fetchBadgeCounts(); });

    // 주문 상태 변경 시 소리 중지 + mobile alert 자동 정리
    socket.on('order-updated', (payload: any) => {
      import('../../utils/notificationSound').then(({ stopRepeatingSound }) => stopRepeatingSound());
      if (payload?.id) {
        setMobileAlertOrders(prev => prev.filter(a => String(a.id) !== String(payload.id)));
      }
      fetchBadgeCounts();
    });

    return () => {
      socket.disconnect();
      globalSocketRef.current = null;
    };
  }, [userRestaurantId, isOrderRole, fetchBadgeCounts]);

  // ─── 전역 PO realtime (Seller roles: Brand General, Foodcourt General, Supplier) ───
  // 라이브 PO가 도착하면 사이드바 NavIcon hasPending pulse가 즉시 켜져야 한다.
  // 기존에는 IncomingOrdersView에 들어가야만 socket 리스너가 동작했고,
  // 다른 페이지(Dashboard 등)에 있을 땐 다음 15s polling까지 갱신되지 않아서
  // 새 PO 알림이 늦게 올라왔다. 이 useEffect로 page-agnostic하게 listen 한다.
  const sellerScope = useMemo(() => {
    if (!user) return null;
    if (user.role === 'Brand General' || user.role === 'Brand Manager') {
      const id = (user as any).brand_id ?? (user as any).brandId;
      return id ? { type: 'brand' as const, id: parseInt(String(id), 10) } : null;
    }
    if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') {
      const id = (user as any).foodcourt_id ?? (user as any).foodcourtId;
      return id ? { type: 'foodcourt' as const, id: parseInt(String(id), 10) } : null;
    }
    if (user.role === 'Supplier Admin' || user.role === 'Supplier Staff') {
      const id = (user as any).supplier_company_id ?? (user as any).supplierCompanyId;
      return id ? { type: 'supplier' as const, id: parseInt(String(id), 10) } : null;
    }
    return null;
  }, [user]);

  useEffect(() => {
    if (!sellerScope) return;
    const sock = io('/orders', { transports: ['websocket', 'polling'] });
    sock.on('connect', () => {
      sock.emit('join-seller', { seller_type: sellerScope.type, seller_id: sellerScope.id });
    });
    const refresh = () => fetchBadgeCounts();
    sock.on('seller-order-created', refresh);
    sock.on('seller-order-updated', refresh);
    return () => { sock.disconnect(); };
  }, [sellerScope, fetchBadgeCounts]);

  const handleLogout = () => {
    logout();
    authLogout();
    navigate('/pos');
  };

  const isActive = (path: string) => location.pathname === path;

  // Staff 메뉴 권한 체크: Restaurant Admin은 항상 true, Staff는 permissions 확인
  const hasMenuPermission = (permissionKey: string): boolean => {
    if (user?.role === 'Restaurant Admin') return true;
    if (user?.role !== 'Staff') return false;
    return user?.permissions?.includes(permissionKey) || false;
  };

  // Brand Manager / Foodcourt Manager 권한 체크
  const hasManagerPermission = (permissionKey: string): boolean => {
    if (user?.role === 'Brand General' || user?.role === 'Foodcourt General') return true;
    if (user?.role !== 'Brand Manager' && user?.role !== 'Foodcourt Manager') return false;
    return user?.permissions?.includes(permissionKey) || false;
  };

  // ========== 2-tier sidebar (role-aware) ==========
  const isSystemAdmin = user?.role === 'System Admin';
  const isBrand = user?.role === 'Brand General' || user?.role === 'Brand Manager';
  const isFoodcourt = user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager';
  const isOwner = user?.role === 'Restaurant Owner';
  const isSupplier = user?.role === 'Supplier Admin' || user?.role === 'Supplier Staff';
  const isRestaurantUser = user?.role === 'Restaurant Admin' || user?.role === 'Staff';
  const useTwoTier = isSystemAdmin || isBrand || isFoodcourt || isOwner || isSupplier || isRestaurantUser;

  type AdminSubItem = { path: string; label: string; hasPending?: boolean; visible?: boolean; openInNewTab?: boolean; matchTabs?: string[] };
  type AdminCategory = { id: string; label: string; icon: React.ReactNode; path?: string; items?: AdminSubItem[]; hasPending?: boolean; visible?: boolean; openInNewTab?: boolean; mobileOrder?: boolean };

  const adminCategories: AdminCategory[] = useMemo(() => !isSystemAdmin ? [] : [
    {
      id: 'dashboard',
      label: t('nav.dashboard'),
      icon: <LayoutDashboard />,
      path: '/pos/admin/dashboard'
    },
    {
      id: 'management',
      label: t('nav.section.management'),
      icon: <Users />,
      items: [
        { path: '/pos/admin/managers', label: t('nav.managers') },
        { path: '/pos/admin/restaurants', label: t('nav.restaurants') },
        { path: '/pos/admin/staff', label: t('nav.staff') }
      ]
    },
    {
      id: 'suppliers',
      label: t('nav.section.suppliers', 'Suppliers'),
      icon: <Truck />,
      items: [
        { path: '/pos/admin/supplier-companies', label: t('nav.supplierCompanies', 'Supplier Companies') },
        { path: '/pos/admin/supplier-invitations', label: t('nav.supplierInvitations', 'Supplier Invitations') },
        { path: '/pos/admin/carriers', label: t('nav.carriers', 'Carriers') },
        { path: '/pos/admin/carrier-webhooks', label: t('nav.carrierWebhooks', 'Carrier Webhooks') }
      ]
    },
    {
      id: 'operations',
      label: t('nav.section.operations'),
      icon: <Briefcase />,
      items: [
        { path: '/pos/admin/invoices', label: t('nav.invoices'), hasPending: badgeCounts.invoices > 0 },
        { path: '/pos/admin/subscriptions', label: t('nav.subscriptions') },
        { path: '/pos/admin/system-products', label: t('nav.systemProducts') },
        { path: '/pos/admin/report', label: t('nav.report') },
        { path: '/pos/admin/scheduler-monitor', label: t('nav.schedulerMonitor', 'Scheduler Monitor') }
      ]
    },
    {
      id: 'communication',
      label: t('nav.section.communication'),
      icon: <MessageSquare />,
      items: [
        { path: '/pos/admin/notices', label: t('nav.notices'), hasPending: badgeCounts.notices > 0 || (badgeCounts.unreadComments?.notices || 0) > 0 },
        { path: '/pos/admin/work-manuals', label: t('nav.workManuals') },
        { path: '/pos/admin/support', label: t('nav.inquiryManagement'), hasPending: badgeCounts.systemInquiry > 0 || (badgeCounts.unreadComments?.systemInquiry || 0) > 0 },
        { path: '/pos/admin/contact-inquiries', label: t('nav.contactInquiries') },
        { path: '/pos/admin/hardware-quotes', label: t('nav.hardwareQuotes') },
        { path: '/pos/admin/content', label: t('nav.content', 'Content') }
      ]
    },
    {
      id: 'plans',
      label: t('nav.section.plansPayments'),
      icon: <CreditCard />,
      items: [
        { path: '/pos/admin/plans', label: t('nav.subscriptionPlans') },
        { path: '/pos/admin/payment-settings', label: t('nav.paymentSettings') },
        { path: '/pos/admin/referrals', label: t('nav.referrals', 'Referrals') }
      ]
    },
    {
      id: 'settings',
      label: t('nav.section.settings', 'Settings'),
      icon: <SettingsIcon />,
      items: [
        { path: '/pos/admin/settings', label: t('nav.companyInfo', 'Company Info') },
        { path: '/pos/admin/site-settings', label: t('nav.siteSettings', 'Site Settings') },
        { path: '/pos/admin/notification-settings', label: t('nav.notifications', 'Notifications') },
        { path: '/pos/admin/system-config', label: t('nav.systemConfig', 'System Config') },
        { path: '/pos/admin/logs', label: t('nav.systemLogs', 'System Logs') },
        { path: '/pos/admin/history', label: t('nav.changeHistory', 'Change History') }
      ]
    }
  ], [isSystemAdmin, t, badgeCounts]);

  // Brand General/Manager categories
  const brandCategories: AdminCategory[] = useMemo(() => {
    if (!isBrand) return [];
    const items: AdminCategory[] = [
      {
        id: 'dashboard', label: t('nav.dashboard'), icon: <LayoutDashboard />,
        path: '/pos/brand/general/dashboard',
        visible: hasManagerPermission('dashboard') && isRouteAllowed('/pos/brand/general/dashboard')
      },
      {
        id: 'live-orders', label: t('nav.salesOrders', 'Sales Orders'), icon: <Activity />,
        path: '/pos/brand/general/incoming-orders',
        hasPending: badgeCounts.livePoCount > 0,
        visible: true
      },
      {
        id: 'franchise-map', label: t('nav.franchiseMap', 'Franchise Map'), icon: <MapPin />,
        path: '/pos/brand/franchise-map',
        visible: isRouteAllowed('/pos/brand/franchise-map')
      },
      {
        id: 'brands', label: t('nav.section.brands', 'Brands'), icon: <Building2 />,
        items: [
          { path: '/pos/brand/general/management', label: t('nav.allBrands', 'All Brands'), visible: isRouteAllowed('/pos/brand/general/management') },
          { path: '/pos/brand-menus', label: t('nav.brandMenus', 'Brand Menus'), visible: isRouteAllowed('/pos/brand-menus') },
          { path: '/pos/recipes', label: t('nav.brandRecipes'), visible: isRouteAllowed('/pos/recipes') }
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('products') && (
          isRouteAllowed('/pos/brand/general/management') ||
          isRouteAllowed('/pos/brand-menus') ||
          isRouteAllowed('/pos/recipes')
        )
      },
      {
        id: 'franchise', label: t('nav.section.franchise', 'Franchise'), icon: <Store />,
        items: [
          { path: '/pos/brand/franchise', label: t('nav.franchise'), visible: isRouteAllowed('/pos/brand/franchise') },
          { path: '/pos/manager/restaurants', label: t('nav.restaurants'), visible: isRouteAllowed('/pos/manager/restaurants') },
          { path: '/pos/manager/admins', label: t('nav.restaurantAdmins'), visible: isRouteAllowed('/pos/manager/staff') },
          { path: '/pos/brand/manager', label: t('nav.managers'), visible: user?.role === 'Brand General' && isRouteAllowed('/pos/brand/manager') }
        ].filter(i => i.visible !== false),
        visible: isRouteAllowed('/pos/brand/franchise') ||
                 (hasManagerPermission('management') && (
                   isRouteAllowed('/pos/manager/restaurants') ||
                   isRouteAllowed('/pos/manager/staff') ||
                   isRouteAllowed('/pos/brand/manager')
                 ))
      },
      {
        id: 'products', label: t('nav.section.productsInventory'), icon: <Package />,
        items: [
          { path: '/pos/brand-products', label: t('nav.products'), visible: isRouteAllowed('/pos/brand-products') },
          { path: '/pos/brand-product-recipes', label: t('nav.productRecipes'), visible: isRouteAllowed('/pos/brand-product-recipes') },
          { path: '/pos/brand-ingredients', label: t('nav.ingredients'), visible: isRouteAllowed('/pos/brand-ingredients') },
          { path: '/pos/suppliers', label: t('nav.suppliers'), visible: isRouteAllowed('/pos/suppliers') },
          { path: '/pos/brand-inventory', label: t('nav.inventory'), visible: isRouteAllowed('/pos/brand-inventory') }
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('products') && (
          isRouteAllowed('/pos/brand-products') ||
          isRouteAllowed('/pos/brand-product-recipes') ||
          isRouteAllowed('/pos/brand-ingredients') ||
          isRouteAllowed('/pos/brand-inventory')
        )
      },
      {
        id: 'operations', label: t('nav.section.operations'), icon: <Briefcase />,
        items: [
          { path: '/pos/brand/invoices', label: t('nav.invoices'), hasPending: badgeCounts.invoices > 0, visible: isRouteAllowed('/pos/brand/invoices') },
          { path: '/pos/brand/trade-invoices', label: t('nav.tradeInvoices', 'Trade Invoices'), visible: isRouteAllowed('/pos/brand/trade-invoices') },
          { path: '/pos/brand/general/performance', label: t('nav.performance'), visible: isRouteAllowed('/pos/brand/general/performance') },
          { path: '/pos/manager/coupons', label: t('nav.coupons'), visible: isRouteAllowed('/pos/manager/coupons') },
          { path: '/pos/purchase-orders', label: t('nav.purchaseOrder', 'Purchase Order'), visible: hasManagerPermission('products') && isRouteAllowed('/pos/purchase-orders') },
          { path: '/pos/purchase-orders/history', label: t('nav.orderHistory', 'Order History'), visible: hasManagerPermission('products') && isRouteAllowed('/pos/purchase-orders') },
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('operations') || hasManagerPermission('products')
      },
      {
        id: 'reports', label: t('nav.reports', 'Reports'), icon: <TrendingUp />,
        items: [
          { path: '/pos/brand/general/reports?tab=ranking', label: t('brand:brandReportsPage.salesRanking', 'Sales Ranking'), visible: true },
          { path: '/pos/brand/general/reports?tab=sales', label: t('brand:brandReportsPage.salesReport', 'Sales Report'), visible: true },
          { path: '/pos/brand/general/reports?tab=details', label: t('brand:brandReportsPage.salesDetails', 'Sales Details'), visible: true },
          { path: '/pos/brand/general/reports?tab=menu', label: t('brand:brandReportsPage.menuAnalysis', 'Menu Analysis'), visible: true },
          { path: '/pos/brand/general/reports?tab=customers', label: t('brand:brandReportsPage.customerInsights', 'Customer Insights'), visible: true },
          { path: '/pos/brand/general/reports?tab=operations', label: t('brand:brandReportsPage.operations', 'Operations'), visible: true }
        ].filter(i => i.visible !== false),
        visible: isRouteAllowed('/pos/brand/general/reports')
      },
      {
        id: 'communication', label: t('nav.section.communication'), icon: <MessageSquare />,
        items: [
          { path: '/pos/brand/general/notices', label: t('nav.notices'), hasPending: badgeCounts.notices > 0 || (badgeCounts.unreadComments?.notices || 0) > 0, visible: isRouteAllowed('/pos/brand/general/notices') },
          { path: '/pos/brand/general/work-manuals', label: t('nav.workManuals'), visible: isRouteAllowed('/pos/brand/general/work-manuals') },
          { path: '/pos/brand/general/system-inquiry', label: t('nav.systemInquiry'), hasPending: badgeCounts.systemInquiry > 0 || (badgeCounts.unreadComments?.systemInquiry || 0) > 0, visible: isRouteAllowed('/pos/brand/general/system-inquiry') },
          { path: '/pos/brand/general/operation-inquiry', label: t('nav.inquiryManagement'), hasPending: badgeCounts.operationInquiry > 0 || (badgeCounts.unreadComments?.operationInquiry || 0) > 0, visible: isRouteAllowed('/pos/brand/general/operation-inquiry') }
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('communication') && (
          isRouteAllowed('/pos/brand/general/notices') ||
          isRouteAllowed('/pos/brand/general/work-manuals') ||
          isRouteAllowed('/pos/brand/general/system-inquiry') ||
          isRouteAllowed('/pos/brand/general/operation-inquiry')
        )
      },
      {
        id: 'plans', label: t('nav.section.plansPayments'), icon: <CreditCard />,
        items: [
          { path: '/pos/brand/plans', label: t('nav.brandPlans'), visible: isRouteAllowed('/pos/brand/plans') },
          { path: '/pos/brand/general/subscriptions', label: t('nav.brandSubscriptions'), visible: isRouteAllowed('/pos/brand/general/subscriptions') },
          { path: '/pos/brand/payment-settings', label: t('nav.paymentSettings'), visible: isRouteAllowed('/pos/brand/payment-settings') }
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('plans_payments') && (
          isRouteAllowed('/pos/brand/plans') ||
          isRouteAllowed('/pos/brand/general/subscriptions') ||
          isRouteAllowed('/pos/brand/payment-settings')
        )
      },
      {
        id: 'settings', label: t('nav.section.settings', 'Settings'), icon: <SettingsIcon />,
        items: [
          { path: '/pos/profile', label: t('nav.myProfile', 'My Profile'), visible: true },
          { path: '/pos/brand/company-info', label: t('nav.companyInfo', 'Company Info'), visible: true },
          { path: '/pos/manager/notification-settings', label: t('nav.notifications', 'Notifications'), visible: true },
          { path: '/pos/brand/history', label: t('nav.changeHistory', 'Change History'), visible: isRouteAllowed('/pos/brand/history') }
        ].filter(i => i.visible !== false),
        visible: true
      }
    ];
    return items.filter(c => c.visible !== false).map(c => ({
      ...c,
      items: c.items?.filter(i => i.visible !== false)
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrand, user?.role, t, badgeCounts, isRouteAllowed, routesLoading]);

  // Foodcourt categories
  const foodcourtCategories: AdminCategory[] = useMemo(() => {
    if (!isFoodcourt) return [];
    const items: AdminCategory[] = [
      { id: 'dashboard', label: t('nav.dashboard'), icon: <LayoutDashboard />, path: '/pos/foodcourt/general/dashboard', visible: hasManagerPermission('dashboard') && isRouteAllowed('/pos/foodcourt/general/dashboard') },
      { id: 'live-orders', label: t('nav.salesOrders', 'Sales Orders'), icon: <Activity />, path: '/pos/foodcourt/general/incoming-orders', hasPending: badgeCounts.livePoCount > 0, visible: true },
      { id: 'branch-map', label: t('nav.branchMap', 'Branch Map'), icon: <MapPin />, path: '/pos/foodcourt/tenancy-map', visible: isRouteAllowed('/pos/foodcourt/tenancy-map') },
      // Floor Plan — 풀화면 새 창
      { id: 'floor-plan', label: t('nav.floorPlan', 'Floor Plan'), icon: <LayoutGrid />, path: '/pos/foodcourt/floor-plan', openInNewTab: true, visible: isRouteAllowed('/pos/foodcourt/floor-plan') },
      {
        id: 'tenancy', label: t('nav.section.tenancy', 'Tenancy'), icon: <Store />,
        items: [
          { path: '/pos/foodcourt/tenancy', label: t('nav.tenancy'), visible: isRouteAllowed('/pos/foodcourt/tenancy') }
        ].filter(i => i.visible !== false),
        visible: isRouteAllowed('/pos/foodcourt/tenancy')
      },
      {
        id: 'management', label: t('nav.section.management'), icon: <Users />,
        items: [
          { path: '/pos/foodcourt/branches', label: t('nav.branches', 'Branches'), visible: user?.role === 'Foodcourt General' && isRouteAllowed('/pos/foodcourt/branches') },
          { path: '/pos/manager/restaurants', label: t('nav.restaurants'), visible: isRouteAllowed('/pos/manager/restaurants') },
          { path: '/pos/manager/admins', label: t('nav.restaurantAdmins'), visible: isRouteAllowed('/pos/manager/staff') },
          { path: '/pos/foodcourt/manager', label: t('nav.managers'), visible: user?.role === 'Foodcourt General' && isRouteAllowed('/pos/foodcourt/manager') },
          { path: '/pos/foodcourt/general/products', label: t('nav.products'), visible: isRouteAllowed('/pos/foodcourt/general/products') },
          { path: '/pos/foodcourt/general/inventory', label: t('nav.inventory'), visible: isRouteAllowed('/pos/foodcourt/general/inventory') },
          { path: '/pos/suppliers', label: t('nav.suppliers'), visible: isRouteAllowed('/pos/suppliers') }
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('management')
      },
      {
        id: 'operations', label: t('nav.section.operations'), icon: <Briefcase />,
        items: [
          { path: '/pos/foodcourt/invoices', label: t('nav.invoices'), hasPending: badgeCounts.invoices > 0, visible: isRouteAllowed('/pos/foodcourt/invoices') },
          { path: '/pos/foodcourt/trade-invoices', label: t('nav.tradeInvoices', 'Trade Invoices'), visible: isRouteAllowed('/pos/foodcourt/trade-invoices') },
          { path: '/pos/manager/coupons', label: t('nav.coupons'), visible: isRouteAllowed('/pos/manager/coupons') },
          { path: '/pos/purchase-orders', label: t('nav.purchaseOrder', 'Purchase Order'), visible: hasManagerPermission('management') && isRouteAllowed('/pos/purchase-orders') },
          { path: '/pos/purchase-orders/history', label: t('nav.orderHistory', 'Order History'), visible: hasManagerPermission('management') && isRouteAllowed('/pos/purchase-orders') },
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('operations') || hasManagerPermission('management')
      },
      {
        id: 'reports', label: t('nav.reports', 'Reports'), icon: <TrendingUp />,
        items: [
          { path: '/pos/foodcourt/general/reports?tab=ranking', label: t('foodcourt:foodcourtReportsPage.salesRanking', 'Sales Ranking'), visible: true },
          { path: '/pos/foodcourt/general/reports?tab=sales', label: t('foodcourt:foodcourtReportsPage.salesReport', 'Sales Report'), visible: true },
          { path: '/pos/foodcourt/general/reports?tab=details', label: t('foodcourt:foodcourtReportsPage.salesDetails', 'Sales Details'), visible: true },
          { path: '/pos/foodcourt/general/reports?tab=menu', label: t('foodcourt:foodcourtReportsPage.menuAnalysis', 'Menu Analysis'), visible: true },
          { path: '/pos/foodcourt/general/reports?tab=customers', label: t('foodcourt:foodcourtReportsPage.customerInsights', 'Customer Insights'), visible: true },
          { path: '/pos/foodcourt/general/reports?tab=operations', label: t('foodcourt:foodcourtReportsPage.operations', 'Operations'), visible: true }
        ].filter(i => i.visible !== false),
        visible: isRouteAllowed('/pos/foodcourt/general/reports')
      },
      {
        id: 'communication', label: t('nav.section.communication'), icon: <MessageSquare />,
        items: [
          { path: '/pos/foodcourt/general/notices', label: t('nav.notices'), hasPending: badgeCounts.notices > 0 || (badgeCounts.unreadComments?.notices || 0) > 0, visible: isRouteAllowed('/pos/foodcourt/general/notices') },
          { path: '/pos/foodcourt/general/work-manuals', label: t('nav.workManuals'), visible: isRouteAllowed('/pos/foodcourt/general/work-manuals') },
          { path: '/pos/foodcourt/general/system-inquiry', label: t('nav.systemInquiry'), hasPending: badgeCounts.systemInquiry > 0 || (badgeCounts.unreadComments?.systemInquiry || 0) > 0, visible: isRouteAllowed('/pos/foodcourt/general/system-inquiry') },
          { path: '/pos/foodcourt/general/operation-inquiry', label: t('nav.inquiryManagement'), hasPending: badgeCounts.operationInquiry > 0 || (badgeCounts.unreadComments?.operationInquiry || 0) > 0, visible: isRouteAllowed('/pos/foodcourt/general/operation-inquiry') }
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('communication')
      },
      {
        id: 'plans', label: t('nav.section.plansPayments'), icon: <CreditCard />,
        items: [
          { path: '/pos/foodcourt/plans', label: t('nav.foodcourtPlans'), visible: isRouteAllowed('/pos/foodcourt/plans') },
          { path: '/pos/foodcourt/general/subscriptions', label: t('nav.foodcourtSubscriptions'), visible: isRouteAllowed('/pos/foodcourt/general/subscriptions') },
          { path: '/pos/foodcourt/payment-settings', label: t('nav.paymentSettings'), visible: isRouteAllowed('/pos/foodcourt/payment-settings') }
        ].filter(i => i.visible !== false),
        visible: hasManagerPermission('plans_payments')
      },
      {
        id: 'settings', label: t('nav.section.settings', 'Settings'), icon: <SettingsIcon />,
        items: [
          { path: '/pos/profile', label: t('nav.myProfile', 'My Profile'), visible: true },
          { path: '/pos/foodcourt/company-info', label: t('nav.companyInfo', 'Company Info'), visible: true },
          { path: '/pos/manager/notification-settings', label: t('nav.notifications', 'Notifications'), visible: true },
          { path: '/pos/foodcourt/history', label: t('nav.changeHistory', 'Change History'), visible: isRouteAllowed('/pos/foodcourt/history') }
        ].filter(i => i.visible !== false),
        visible: true
      }
    ];
    return items.filter(c => c.visible !== false && (!c.items || c.items.length > 0 || c.path)).map(c => ({ ...c, items: c.items?.filter(i => i.visible !== false) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFoodcourt, user?.role, t, badgeCounts, isRouteAllowed, routesLoading]);

  // Restaurant Owner categories
  const ownerCategories: AdminCategory[] = useMemo(() => {
    if (!isOwner) return [];
    const items: AdminCategory[] = [
      { id: 'dashboard', label: t('nav.dashboard'), icon: <LayoutDashboard />, path: '/pos/owner/dashboard', visible: isRouteAllowed('/pos/owner/dashboard') },
      { id: 'restaurants', label: t('nav.restaurants'), icon: <Store />, path: '/pos/owner/restaurants', visible: isRouteAllowed('/pos/owner/restaurants') },
      {
        id: 'operations', label: t('nav.section.operations'), icon: <Briefcase />,
        items: [
          { path: '/pos/owner/invoices', label: t('nav.invoices'), hasPending: badgeCounts.invoices > 0, visible: isRouteAllowed('/pos/owner/invoices') },
          { path: '/pos/owner/performance', label: t('nav.performance'), visible: isRouteAllowed('/pos/owner/performance') },
          { path: '/pos/purchase-orders', label: t('nav.purchaseOrder', 'Purchase Order'), visible: isRouteAllowed('/pos/purchase-orders') },
          { path: '/pos/purchase-orders/history', label: t('nav.orderHistory', 'Order History'), visible: isRouteAllowed('/pos/purchase-orders') },
        ].filter(i => i.visible !== false),
        visible: isRouteAllowed('/pos/owner/invoices') || isRouteAllowed('/pos/owner/performance') || isRouteAllowed('/pos/purchase-orders')
      },
      {
        id: 'reports', label: t('nav.reports', 'Reports'), icon: <TrendingUp />,
        items: [
          { path: '/pos/owner/reports?tab=ranking', label: t('owner:ownerReportsPage.salesRanking', 'Sales Ranking'), visible: true },
          { path: '/pos/owner/reports?tab=sales', label: t('owner:ownerReportsPage.salesReport', 'Sales Report'), visible: true },
          { path: '/pos/owner/reports?tab=details', label: t('owner:ownerReportsPage.salesDetails', 'Sales Details'), visible: true },
          { path: '/pos/owner/reports?tab=menu', label: t('owner:ownerReportsPage.menuAnalysis', 'Menu Analysis'), visible: true },
          { path: '/pos/owner/reports?tab=customers', label: t('owner:ownerReportsPage.customerInsights', 'Customer Insights'), visible: true },
          { path: '/pos/owner/reports?tab=operations', label: t('owner:ownerReportsPage.operations', 'Operations'), visible: true }
        ].filter(i => i.visible !== false),
        visible: isRouteAllowed('/pos/owner/reports')
      },
      {
        id: 'communication', label: t('nav.section.communication'), icon: <MessageSquare />,
        items: [
          { path: '/pos/owner/notices', label: t('nav.notices'), hasPending: badgeCounts.notices > 0 || (badgeCounts.unreadComments?.notices || 0) > 0, visible: isRouteAllowed('/pos/owner/notices') },
          { path: '/pos/owner/work-manuals', label: t('nav.workManuals'), visible: isRouteAllowed('/pos/owner/work-manuals') },
          { path: '/pos/owner/system-inquiry', label: t('nav.systemInquiry'), hasPending: badgeCounts.systemInquiry > 0 || (badgeCounts.unreadComments?.systemInquiry || 0) > 0, visible: isRouteAllowed('/pos/owner/system-inquiry') },
          { path: '/pos/owner/operation-inquiry', label: t('nav.operationInquiry'), hasPending: badgeCounts.operationInquiry > 0 || (badgeCounts.unreadComments?.operationInquiry || 0) > 0, visible: isRouteAllowed('/pos/owner/operation-inquiry') }
        ].filter(i => i.visible !== false),
        visible: isRouteAllowed('/pos/owner/notices') || isRouteAllowed('/pos/owner/work-manuals') || isRouteAllowed('/pos/owner/system-inquiry') || isRouteAllowed('/pos/owner/operation-inquiry')
      },
      {
        id: 'settings', label: t('nav.section.settings', 'Settings'), icon: <SettingsIcon />,
        items: [
          { path: '/pos/profile', label: t('nav.myProfile', 'My Profile'), visible: true },
          { path: '/pos/owner/history', label: t('nav.changeHistory', 'Change History'), visible: isRouteAllowed('/pos/owner/history') }
        ].filter(i => i.visible !== false),
        visible: true
      }
    ];
    return items.filter(c => c.visible !== false).map(c => ({ ...c, items: c.items?.filter(i => i.visible !== false) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner, t, badgeCounts, isRouteAllowed, routesLoading]);

  // Supplier Admin categories
  const supplierCategories: AdminCategory[] = useMemo(() => {
    if (!isSupplier) return [];
    const items: AdminCategory[] = [
      { id: 'dashboard', label: t('nav.dashboard'), icon: <LayoutDashboard />, path: '/pos/supplier/dashboard', visible: true },
      { id: 'live-orders', label: t('nav.salesOrders', 'Sales Orders'), icon: <Activity />, path: '/pos/supplier/orders', hasPending: badgeCounts.livePoCount > 0, visible: true },
      {
        id: 'operations', label: t('nav.section.operations'), icon: <Briefcase />,
        items: [
          { path: '/pos/supplier/products', label: t('nav.products'), visible: isRouteAllowed('/pos/supplier/products') },
          { path: '/pos/supplier/inventory', label: t('nav.inventory'), visible: isRouteAllowed('/pos/supplier/inventory') },
          { path: '/pos/supplier/customers', label: t('nav.customers', 'Customers'), visible: true },
          { path: '/pos/supplier/staff', label: t('nav.staff', 'Staff'), visible: hasModule('supplier_admin_staff') },
          { path: '/pos/supplier/contracts', label: t('nav.contracts', 'Contracts'), visible: true }
        ].filter(i => i.visible !== false),
        visible: true
      },
      {
        id: 'plans', label: t('nav.section.plansPayments'), icon: <CreditCard />,
        items: [
          { path: '/pos/supplier/trade-invoices', label: t('nav.tradeInvoices', 'Trade Invoices'), visible: true },
          { path: '/pos/supplier/invoices', label: t('nav.invoices'), hasPending: badgeCounts.invoices > 0, visible: true }
        ].filter(i => i.visible !== false),
        visible: true
      },
      {
        id: 'communication', label: t('nav.section.communication'), icon: <MessageSquare />,
        items: [
          { path: '/pos/supplier/notices', label: t('nav.notices'), hasPending: badgeCounts.notices > 0 || (badgeCounts.unreadComments?.notices || 0) > 0, visible: true },
          { path: '/pos/supplier/system-inquiry', label: t('nav.systemInquiry'), hasPending: badgeCounts.systemInquiry > 0 || (badgeCounts.unreadComments?.systemInquiry || 0) > 0, visible: true }
        ].filter(i => i.visible !== false),
        visible: true
      },
      {
        id: 'settings', label: t('nav.section.settings', 'Settings'), icon: <SettingsIcon />,
        items: [
          { path: '/pos/profile', label: t('nav.myProfile', 'My Profile'), visible: true },
          { path: '/pos/supplier/company-info', label: t('nav.companyInfo', 'Company Info'), visible: isRouteAllowed('/pos/supplier/company-info') },
          { path: '/pos/supplier/payment-settings', label: t('nav.paymentSettings'), visible: isRouteAllowed('/pos/supplier/payment-settings') },
          { path: '/pos/supplier/invoice-settings', label: t('nav.invoiceSettings', 'Invoice Settings'), visible: isRouteAllowed('/pos/supplier/invoice-settings') }
        ].filter(i => i.visible !== false),
        visible: true
      }
    ];
    return items.filter(c => c.visible !== false).map(c => ({ ...c, items: c.items?.filter(i => i.visible !== false) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupplier, t, badgeCounts, isRouteAllowed, hasModule, routesLoading]);

  // Restaurant Admin/Staff categories
  const restaurantCategories: AdminCategory[] = useMemo(() => {
    if (!isRestaurantUser || !restaurantId) return [];
    const rid = restaurantId;
    const items: AdminCategory[] = [
      { id: 'dashboard', label: t('nav.dashboard'), icon: <LayoutDashboard />, path: `/restaurant/${rid}/dashboard`, visible: true },
      { id: 'live-orders', label: t('nav.liveOrders'), icon: <Activity />, path: `/restaurant/${rid}/live-orders`, hasPending: badgeCounts.pendingOrders > 0, visible: true },
      // Reservations is a base feature — sidebar always visible for RA/Staff.
      // Mobile customer-facing visibility is controlled by reservation_settings.enabled.
      { id: 'reservations', label: t('nav.reservations', 'Reservations'), icon: <FileText />, path: `/restaurant/${rid}/reservations`, visible: true },
      // System Access — 각각 1뎁스 단독, 새 창으로 열림 (좌측 메뉴 없는 풀화면)
      { id: 'pos-terminal', label: t('nav.posTerminal', 'POS Terminal'), icon: <Monitor />, path: `/restaurant/${rid}/pos-terminal`, openInNewTab: true, visible: isRouteAllowed(`/restaurant/${rid}/pos-terminal`) },
      { id: 'floor-plan', label: t('nav.floorPlan', 'Floor Plan'), icon: <LayoutGrid />, path: `/restaurant/${rid}/floor-plan`, openInNewTab: true, visible: isRouteAllowed(`/restaurant/${rid}/floor-plan`) },
      { id: 'kitchen', label: t('nav.kitchenDisplay', 'Kitchen Display'), icon: <ChefHat />, path: `/restaurant/${rid}/kitchen`, openInNewTab: true, visible: isRouteAllowed(`/restaurant/${rid}/kitchen`) },
      { id: 'pickup-display', label: t('nav.pickupDisplay', 'Pickup Display'), icon: <Tv />, path: `/restaurant/${rid}/display`, openInNewTab: true, visible: isRouteAllowed(`/restaurant/${rid}/display`) },
      { id: 'mobile-order', label: t('nav.mobileOrder', 'Mobile Order'), icon: <Smartphone />, path: '/mobile', openInNewTab: true, mobileOrder: true, visible: isRouteAllowed('/mobile/:slug/menu') },
      {
        id: 'products', label: t('nav.section.products'), icon: <Package />,
        items: [
          { path: `/restaurant/${rid}/menu`, label: t('nav.menu'), visible: isRouteAllowed(`/restaurant/${rid}/menu`) },
          { path: `/restaurant/${rid}/categories`, label: t('nav.categories'), visible: isRouteAllowed(`/restaurant/${rid}/categories`) },
          { path: `/restaurant/${rid}/options`, label: t('nav.options'), visible: isRouteAllowed(`/restaurant/${rid}/options`) },
          { path: `/restaurant/${rid}/recipe-management`, label: t('nav.recipes'), visible: isRouteAllowed(`/restaurant/${rid}/recipe-management`) },
          // Brand Menu Updates — Brand 산하 매장만, 항상 노출 (pending 시 빨간 점). 보조 도구라 섹션 맨 아래.
          { path: `/restaurant/${rid}/brand-menu-updates`, label: t('nav.brandMenuUpdates', 'Brand Menu Updates'),
            hasPending: (badgeCounts as any).brandMenuPending > 0,
            visible: isRouteAllowed(`/restaurant/${rid}/brand-menu-updates`) }
        ].filter(i => i.visible !== false),
        visible: hasMenuPermission('menu_management')
      },
      {
        id: 'operations', label: t('nav.section.operations'), icon: <Briefcase />,
        items: [
          { path: `/restaurant/${rid}/invoices`, label: t('nav.invoices'), hasPending: badgeCounts.invoices > 0, visible: hasMenuPermission('support') && isRouteAllowed(`/restaurant/${rid}/invoices`) },
          { path: '/pos/purchase-orders', label: t('nav.purchaseOrder', 'Purchase Order'), visible: hasMenuPermission('inventory') && isRouteAllowed('/pos/purchase-orders') },
          { path: '/pos/purchase-orders/history', label: t('nav.orderHistory', 'Order History'), visible: hasMenuPermission('inventory') && isRouteAllowed('/pos/purchase-orders') },
          { path: `/restaurant/${rid}/ingredients`, label: t('nav.stockItems', 'Stock Items'), visible: hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${rid}/ingredients`) },
          { path: `/restaurant/${rid}/inventory`, label: t('nav.inventory'), visible: hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${rid}/inventory`) },
          { path: '/pos/suppliers', label: t('nav.suppliers'), visible: hasMenuPermission('inventory') && isRouteAllowed('/pos/suppliers') }
        ].filter(i => i.visible !== false),
        visible: hasMenuPermission('support') || hasMenuPermission('reports') || hasMenuPermission('inventory')
      },
      {
        id: 'reports', label: t('nav.reports', 'Reports'), icon: <TrendingUp />,
        items: [
          { path: `/restaurant/${rid}/reports?tab=sales`, label: t('reports:reportsPage.salesReport', 'Sales Report'), visible: true },
          { path: `/restaurant/${rid}/reports?tab=details`, label: t('reports:reportsPage.salesDetails', 'Sales Details'), visible: true },
          { path: `/restaurant/${rid}/reports?tab=payment`, label: t('reports:reportsPage.paymentAnalysis', 'Payment Analysis'), visible: true },
          { path: `/restaurant/${rid}/reports?tab=menu`, label: t('reports:reportsPage.menuAnalysis', 'Menu Analysis'), visible: true },
          { path: `/restaurant/${rid}/reports?tab=customers`, label: t('reports:reportsPage.customerInsights', 'Customer Insights'), visible: true },
          { path: `/restaurant/${rid}/reports?tab=operations`, label: t('reports:reportsPage.operations', 'Operations'), visible: true }
        ].filter(i => i.visible !== false),
        visible: isRouteAllowed(`/restaurant/${rid}/reports`)
      },
      {
        id: 'team-marketing', label: t('nav.section.teamMarketing'), icon: <Users />,
        items: [
          { path: `/restaurant/${rid}/staff`, label: t('nav.staff'), visible: user?.role === 'Restaurant Admin' && isRouteAllowed(`/restaurant/${rid}/staff`) },
          { path: `/restaurant/${rid}/customers`, label: t('nav.customers'), visible: hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${rid}/customers`) },
          { path: `/restaurant/${rid}/coupons`, label: t('nav.coupons'), visible: hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${rid}/coupons`) }
        ].filter(i => i.visible !== false),
        visible: user?.role === 'Restaurant Admin' || hasMenuPermission('marketing')
      },
      {
        id: 'communication', label: t('nav.section.communication'), icon: <MessageSquare />,
        items: [
          { path: `/restaurant/${rid}/notices`, label: t('nav.notices'), hasPending: badgeCounts.notices > 0 || (badgeCounts.unreadComments?.notices || 0) > 0, visible: isRouteAllowed(`/restaurant/${rid}/notices`) },
          { path: `/restaurant/${rid}/work-manuals`, label: t('nav.workManuals'), visible: isRouteAllowed(`/restaurant/${rid}/work-manuals`) },
          { path: `/restaurant/${rid}/support`, label: t('nav.systemInquiry'), hasPending: (badgeCounts.unreadComments?.systemInquiry || 0) > 0, visible: isRouteAllowed(`/restaurant/${rid}/support`) },
          { path: `/restaurant/${rid}/operation-inquiry`, label: t('nav.operationInquiry'), hasPending: (badgeCounts.unreadComments?.operationInquiry || 0) > 0, visible: isRouteAllowed(`/restaurant/${rid}/operation-inquiry`) }
        ].filter(i => i.visible !== false),
        visible: hasMenuPermission('support')
      },
      {
        id: 'settings', label: t('nav.section.settings', 'Settings'), icon: <SettingsIcon />,
        items: [
          { path: `/restaurant/${rid}/profile`, label: t('nav.myProfile', 'My Profile'), visible: true },
          { path: `/restaurant/${rid}/company-information`, label: t('nav.companyInfo'), visible: hasMenuPermission('settings') },
          // Core Store Settings (Store Info / Operations / Managers) — single landing with 3 tabs.
          // Use explicit ?tab=store so the active-state matcher disambiguates from siblings below;
          // matchTabs keeps the entry highlighted while the user switches between the 3 internal tabs.
          { path: `/restaurant/${rid}/settings?tab=store`, label: t('nav.storeSettings'), matchTabs: ['operations', 'managers'], visible: hasMenuPermission('settings') },
          // 2-depth siblings that previously lived as tabs inside Store Settings
          { path: `/restaurant/${rid}/settings?tab=tablesQr`, label: t('nav.tablesQr', 'Tables & QR'), visible: hasMenuPermission('settings') },
          { path: `/restaurant/${rid}/settings?tab=payment`, label: t('nav.paymentMethods', 'Payment Methods'), visible: hasMenuPermission('settings') },
          { path: `/restaurant/${rid}/settings?tab=printer`, label: t('nav.printer', 'Printer'), visible: hasMenuPermission('settings') },
          { path: `/restaurant/${rid}/settings?tab=kitchenStations`, label: t('nav.kitchenStations', 'Kitchen Stations'), visible: hasMenuPermission('settings') },
          { path: `/restaurant/${rid}/settings?tab=mobileOrder`, label: t('nav.mobileOrder', 'Mobile Order'), visible: hasMenuPermission('settings') },
          { path: `/restaurant/${rid}/settings?tab=reservation`, label: t('nav.reservation', 'Reservation'), visible: hasMenuPermission('settings') },
          { path: `/restaurant/${rid}/settings?tab=membership`, label: t('nav.membership', 'Membership'), visible: hasMenuPermission('settings') },
          { path: `/restaurant/${rid}/notification-settings`, label: t('nav.systemSettings'), visible: hasMenuPermission('settings') },
          { path: `/restaurant/${rid}/history`, label: t('nav.changeHistory'), visible: hasMenuPermission('reports') && isRouteAllowed(`/restaurant/${rid}/history`) }
        ].filter(i => i.visible !== false),
        visible: true
      }
    ];
    return items.filter(c => c.visible !== false).map(c => ({ ...c, items: c.items?.filter(i => i.visible !== false) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRestaurantUser, restaurantId, user?.role, t, badgeCounts, isRouteAllowed, hasMenuPermission, hasModule, routesLoading]);

  // 통합 categories — 사용자 역할에 따라 선택
  const currentCategories: AdminCategory[] = isSystemAdmin ? adminCategories
    : isBrand ? brandCategories
    : isFoodcourt ? foodcourtCategories
    : isOwner ? ownerCategories
    : isSupplier ? supplierCategories
    : isRestaurantUser ? restaurantCategories
    : [];

  // 각 카테고리의 items 중 하나라도 hasPending 이면 카테고리에 propagate
  const adminCategoriesWithPending = useMemo(() =>
    currentCategories.map(cat => ({
      ...cat,
      hasPending: cat.items?.some(it => it.hasPending) || cat.hasPending || false
    })),
    [currentCategories]
  );

  // 쿼리스트링 포함 path 매칭 (Reports 의 ?tab=xxx 같은 경우)
  const matchPathBase = (itemPath: string) => {
    const [base] = itemPath.split('?');
    return location.pathname.startsWith(base);
  };
  // 사이드바 item 의 활성 매칭. AdminSubItem (matchTabs 포함) 또는 plain path string 둘 다 허용.
  // matchTabs: 같은 pathname 을 공유하는 내부 탭(예: Store Settings 의 store/operations/managers)
  // 사이에서 사이드바 item 이 어느 탭값들을 자기 영역으로 가질지 명시.
  const matchPathFull = (itemOrPath: AdminSubItem | string) => {
    const item: AdminSubItem = typeof itemOrPath === 'string'
      ? { path: itemOrPath, label: '' }
      : itemOrPath;
    const [base, qs] = item.path.split('?');
    if (location.pathname !== base) return false;
    if (!qs) return true;
    const actual = new URLSearchParams(location.search);
    const expected = new URLSearchParams(qs);
    let standardMatch = true;
    for (const [k, v] of expected) {
      if (actual.get(k) !== v) { standardMatch = false; break; }
    }
    if (standardMatch) return true;
    if (item.matchTabs && item.matchTabs.length > 0) {
      const actualTab = actual.get('tab');
      if (actualTab && item.matchTabs.includes(actualTab)) return true;
    }
    return false;
  };

  const activeAdminCategory = useMemo(() => {
    if (!useTwoTier) return null;
    for (const cat of adminCategoriesWithPending) {
      if (cat.path && matchPathBase(cat.path)) return cat;
      if (cat.items?.some(it => matchPathBase(it.path))) return cat;
    }
    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useTwoTier, location.pathname, adminCategoriesWithPending]);

  const showSecondaryPanel = !!(useTwoTier && activeAdminCategory?.items);
  const adminSidebarW = isSidebarCollapsed ? SIDEBAR_ADMIN_COLLAPSED : SIDEBAR_ADMIN_EXPANDED;

  // ===== 2뎁스 collapse + hover popover =====
  const LS_SECONDARY_COLLAPSED = 'pos.admin.secondaryCollapsed';
  const [isSecondaryCollapsed, setIsSecondaryCollapsed] = useState<boolean>(() => {
    // Small POS monitors (10-13", ≤1366px): always start collapsed regardless of saved preference.
    // User can still toggle expand within session (localStorage updated by toggle); the override
    // applies on each fresh mount/reload so the small-screen default matches the design intent.
    if (typeof window !== 'undefined' && window.innerWidth <= SECONDARY_AUTOCOLLAPSE_BREAKPOINT) {
      return true;
    }
    // Wider screens: honor saved preference, default expanded.
    try {
      const ls = localStorage.getItem(LS_SECONDARY_COLLAPSED);
      if (ls !== null) return ls === 'true';
    } catch {}
    return false;
  });
  const toggleSecondaryCollapse = useCallback(() => {
    setIsSecondaryCollapsed(v => {
      const next = !v;
      try { localStorage.setItem(LS_SECONDARY_COLLAPSED, String(next)); } catch {}
      return next;
    });
  }, []);
  // Sync 2nd tier collapse state with window width changes (live resize).
  // ≤1280px → collapsed; >1280px → expanded. User can override within session via toggle,
  // but the next resize crossing the threshold re-applies the design intent.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setIsSecondaryCollapsed(window.innerWidth <= SECONDARY_AUTOCOLLAPSE_BREAKPOINT);
      }, 120);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 모바일 (햄버거 메뉴) 에서 펼쳐진 1뎁스 카테고리 ID. null 이면 모두 접힘.
  // 현재 active 카테고리는 진입 시 자동으로 펼쳐둠 — 사용자가 현재 위치 컨텍스트를 바로 봄.
  const [mobileExpandedCatId, setMobileExpandedCatId] = useState<string | null>(null);
  useEffect(() => {
    if (activeAdminCategory?.id && activeAdminCategory.items) {
      setMobileExpandedCatId(activeAdminCategory.id);
    }
  }, [activeAdminCategory?.id, activeAdminCategory?.items]);

  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const [hoveredCatTop, setHoveredCatTop] = useState<number>(80);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearHoverTimer = () => { if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; } };
  const handleRailEnter = (catId: string, e: React.MouseEvent<HTMLElement>) => {
    if (!isSecondaryCollapsed) return;
    clearHoverTimer();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoveredCatTop(Math.max(8, rect.top));
    setHoveredCatId(catId);
  };
  const handleRailLeave = () => {
    if (!isSecondaryCollapsed) return;
    clearHoverTimer();
    hoverTimerRef.current = setTimeout(() => setHoveredCatId(null), 180);
  };
  const handlePopoverEnter = () => { clearHoverTimer(); };
  const handlePopoverLeave = () => {
    clearHoverTimer();
    hoverTimerRef.current = setTimeout(() => setHoveredCatId(null), 120);
  };
  const hoveredCategory = hoveredCatId ? adminCategoriesWithPending.find(c => c.id === hoveredCatId) : null;
  const showPopover = useTwoTier && isSecondaryCollapsed && !!hoveredCategory?.items;

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return '?';

    const words = name.trim().split(' ').filter(word => word.length > 0);

    if (words.length === 0) return '?';

    // If single word, take first 2 characters
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    // If multiple words, take first character of each word (max 2)
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    // Only close sidebar on mobile (when it's in overlay mode)
    // Desktop sidebar stays open and maintains scroll position
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 페이지 접근 권한 체크

  // Brand logo: 고정 파일 경로 사용 (API 호출 불필요)
  useEffect(() => {
    setBrandLogo('/uploads/logos/brand-logo.png');

    // 관리자가 로고 변경 시 cache-bust로 즉시 반영
    const handleBrandLogoUpdate = () => {
      setBrandLogo(`/uploads/logos/brand-logo.png?v=${Date.now()}`);
    };

    window.addEventListener('brandLogoUpdated', handleBrandLogoUpdate);
    return () => {
      window.removeEventListener('brandLogoUpdated', handleBrandLogoUpdate);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;

    // 인보이스 페이지는 항상 접근 가능
    if (currentPath.includes('/invoices') || currentPath.includes('/profile') || currentPath.includes('/settings')) {
      return;
    }

    // 시스템 관리자는 제외
    if (user?.role === 'System Admin') {
      return;
    }

    // 접근 불가능한 페이지인 경우 리다이렉트
    if (!canAccess(currentPath)) {
      if (paymentStatus.restrictionLevel !== 'blocked') {
        // 부분 제한시에는 대시보드로 리다이렉트
        navigate('/pos/dashboard');
      }
    }
  }, [location.pathname, paymentStatus.restrictionLevel, canAccess, navigate, user]);

  // Inactive 레스토랑 체크 (Restaurant Admin과 Staff만)
  if ((user?.role === 'Restaurant Admin' || user?.role === 'Staff') && user?.restaurantStatus === 'inactive') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#F8FAFC',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '48px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#0A2540',
            marginBottom: '16px'
          }}>Restaurant Inactive</h2>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            {user.restaurantName ? `"${user.restaurantName}"` : 'Your restaurant'} is currently inactive.
            All features have been temporarily disabled.
          </p>
          <p style={{
            fontSize: '14px',
            color: '#8898AA',
            marginBottom: '32px'
          }}>
            Please contact your system administrator to reactivate your account.
          </p>
          <button type="button"
            onClick={handleLogout}
            style={{
              background: '#635BFF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#5A51E6'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#635BFF'}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // 완전 차단된 경우 AccessBlocked 컴포넌트 표시
  if (paymentStatus.restrictionLevel === 'blocked' && user?.role !== 'System Admin') {
    return <AccessBlocked />;
  }

  // 구독 플랜이 없는 Brand/Foodcourt/Owner는 안내 화면 표시
  // 단, 인보이스/프로필 페이지는 접근 허용 (결제/정보 확인 필요)
  const subscriptionExemptPaths = ['/pos/brand/invoices', '/pos/foodcourt/invoices', '/pos/owner/invoices', '/pos/profile', '/invoices'];
  const isExemptPath = subscriptionExemptPaths.some(p => location.pathname.startsWith(p));
  // user 자체에 구독이 있으면 (entity 미연결이어도) 통과시킨다.
  // 예: Foodcourt General + foodcourt_id NULL 상태에서 system admin 이 user 에 plan 부여한 경우.
  const userHasOwnPlan = user?.subscriptionStatus === 'active' || user?.subscriptionStatus === 'trial';
  const needsSubscription = !routesLoading && !hasActiveSubscription && !userHasOwnPlan && !isExemptPath &&
    (user?.role === 'Brand General' || user?.role === 'Brand Manager' ||
     user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager' ||
     user?.role === 'Restaurant Owner');

  const getInvoicePath = () => {
    if (user?.role === 'Brand General' || user?.role === 'Brand Manager') return '/pos/brand/invoices';
    if (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') return '/pos/foodcourt/invoices';
    if (user?.role === 'Restaurant Owner') return '/pos/owner/invoices';
    if ((user?.role === 'Restaurant Admin' || user?.role === 'Staff') && user?.restaurantId) return `/restaurant/${user.restaurantId}/invoices`;
    return '/pos/dashboard';
  };

  if (needsSubscription) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#F8FAFC',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#9888;</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1A1A2E', marginBottom: '12px' }}>
            No Active Subscription
          </h2>
          <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
            Your account does not have an active subscription plan. Please contact your system administrator or check your invoices to activate your subscription.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button type="button"
              onClick={() => navigate(getInvoicePath())}
              style={{
                padding: '12px 24px',
                background: '#635BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              View Invoices
            </button>
            <button type="button"
              onClick={() => { authLogout(); navigate('/pos'); }}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#374151',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrandThemeProvider>
      <LayoutContainer>
        {/* Payment Status Modals */}
        <PaymentStatusModals />

        {/* Mobile Order Alert Banner — sticky top, persists until staff acknowledges */}
        {mobileAlertOrders.length > 0 && (operationSettings?.mobileOrderAlerts?.bannerEnabled !== false) && (
          <div
            role="alert"
            aria-live="polite"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              background: 'linear-gradient(135deg, #635BFF 0%, #4F46E5 100%)',
              color: 'white',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(99, 91, 255, 0.25)',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <Bell size={18} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {mobileAlertOrders.length === 1
                ? t('common:mobileOrderAlerts.oneNewOrder', '1 new mobile order') + (mobileAlertOrders[0].tableNumber ? ` · ${t('common:mobileOrderAlerts.table', 'Table')} ${mobileAlertOrders[0].tableNumber}` : '') + (mobileAlertOrders[0].orderNumber ? ` · #${mobileAlertOrders[0].orderNumber}` : '')
                : t('common:mobileOrderAlerts.multipleNewOrders', '{{count}} new mobile orders', { count: mobileAlertOrders.length })}
            </span>
            <button type="button"
              type="button"
              onClick={() => {
                const path = `/restaurant/${restaurantId || user?.restaurantId}/live-orders`;
                setMobileAlertOrders([]);
                import('../../utils/notificationSound').then(({ stopRepeatingSound }) => stopRepeatingSound());
                navigate(path);
              }}
              style={{
                padding: '6px 14px',
                background: 'white',
                color: '#4F46E5',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {t('common:mobileOrderAlerts.view', 'View')}
            </button>
            <button type="button"
              type="button"
              title={t('common:mobileOrderAlerts.dismiss', 'Dismiss') as string}
              onClick={() => {
                setMobileAlertOrders([]);
                import('../../utils/notificationSound').then(({ stopRepeatingSound }) => stopRepeatingSound());
              }}
              style={{
                width: '28px',
                height: '28px',
                background: 'rgba(255,255,255,0.18)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>
        )}

        <MobileHeader>
        <HamburgerButton onClick={toggleSidebar}>
          ☰
        </HamburgerButton>
        <MobileTitle onClick={() => navigate(getDashboardPath())} style={{ cursor: 'pointer' }}>
          {brandLogo && (
            <img src={brandLogo} alt="Brand Logo" style={{ maxHeight: '32px', objectFit: 'contain' }} />
          )}
        </MobileTitle>
        <HeaderActions>
          {isLoggedIn && planType && <PlanBadgeWrapper><PlanBadge planType={planType} loading={routesLoading} /></PlanBadgeWrapper>}
          {isLoggedIn && <InboxBell />}
          <LanguageSelector variant="globe" />
          {isLoggedIn && currentStaff ? (
            <ProfileButton onClick={() => {
              if (user?.role === 'Restaurant Admin' || user?.role === 'Staff') {
                navigate(`/restaurant/${restaurantId}/profile`);
              } else {
                navigate('/pos/profile');
              }
            }}>
              <StaffAvatar role={currentStaff.role}>
                {getInitials(currentStaff.name)}
              </StaffAvatar>
              <StaffInfo>
                <StaffName>{currentStaff.name}</StaffName>
                <StaffRole>{displayRole(currentStaff.role)}</StaffRole>
              </StaffInfo>
            </ProfileButton>
          ) : (
            <ProfileButton onClick={() => {
              if (user?.role === 'Restaurant Admin' || user?.role === 'Staff') {
                navigate(`/restaurant/${restaurantId}/profile`);
              } else {
                navigate('/pos/profile');
              }
            }}>
              <StaffAvatar role="default">?</StaffAvatar>
            </ProfileButton>
          )}
        </HeaderActions>
      </MobileHeader>

      <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      
      <Sidebar isOpen={isSidebarOpen} isCollapsed={isSidebarCollapsed} $isSystemAdmin={useTwoTier}>
        <SidebarHeader isCollapsed={isSidebarCollapsed} $isSystemAdmin={useTwoTier}>
          {!isSidebarCollapsed && (
            <Logo onClick={() => navigate(getDashboardPath())} style={{ cursor: 'pointer' }}>
              {brandLogo && (
                <LogoImage src={brandLogo} alt="Brand Logo" />
              )}
            </Logo>
          )}
          <SidebarToggleButton onClick={toggleSidebarCollapse} title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
            {isSidebarCollapsed ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            )}
          </SidebarToggleButton>
        </SidebarHeader>

        <SidebarNav ref={sidebarNavRef}>
          <NavSection>
            {/* ========== SYSTEM ADMIN — 2-tier rail (1뎁스) ========== */}
            {useTwoTier && adminCategoriesWithPending.map(cat => (
              <React.Fragment key={cat.id}>
              <RailItem
                to={cat.path || cat.items?.[0]?.path || '#'}
                $active={activeAdminCategory?.id === cat.id}
                $collapsed={isSidebarCollapsed}
                $hasPending={cat.hasPending}
                onClick={(e) => {
                  if (cat.openInNewTab && cat.path) {
                    e.preventDefault();
                    closeSidebar();
                    if (cat.mobileOrder && user?.restaurantId) {
                      // Standalone PWA: navigate in-app (no new window needed).
                      // Browser mode: popup-blocker workaround — open blank window
                      // immediately then resolve URL via fetch and set location.
                      const fallbackUrl = `/mobile/restaurant-${user.restaurantId}`;
                      const newWin = isStandalone ? null : window.open('about:blank', '_blank');
                      (async () => {
                        try {
                          const token = getAuthToken();
                          const r = await fetch(`/api/restaurants/${user.restaurantId}`, {
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
                          });
                          let url = fallbackUrl;
                          if (r.ok) {
                            const result = await r.json();
                            const data = result.success ? result.data : result;
                            if (data.slug) url = `/mobile/${data.slug}`;
                          }
                          if (isStandalone) navigate(url);
                          else if (newWin) newWin.location.href = url;
                        } catch {
                          if (isStandalone) navigate(fallbackUrl);
                          else if (newWin) newWin.location.href = fallbackUrl;
                        }
                      })();
                      return;
                    }
                    openSecondaryWindow(cat.path);
                    return;
                  }
                  // 모바일 (≤768px) + sub items 있으면: 페이지 이동 대신 accordion 토글
                  if (cat.items && cat.items.length > 0 && typeof window !== 'undefined' && window.innerWidth <= 768) {
                    e.preventDefault();
                    setMobileExpandedCatId(prev => prev === cat.id ? null : cat.id);
                    return;
                  }
                  closeSidebar();
                }}
                onMouseEnter={(e) => handleRailEnter(cat.id, e)}
                onMouseLeave={handleRailLeave}
                title={cat.label}
                data-tour={cat.id === 'plans' ? 'sidebar-admin-plans' : undefined}
              >
                {cat.icon}
                <RailLabel $collapsed={isSidebarCollapsed}>{cat.label}</RailLabel>
              </RailItem>
              {cat.items && cat.items.length > 0 && mobileExpandedCatId === cat.id && (
                <MobileSubmenu>
                  {cat.items.map(item => (
                    <SecondaryNavItem
                      key={item.path}
                      to={item.path}
                      $active={matchPathFull(item)}
                      $hasPending={item.hasPending}
                      onClick={(e) => {
                        if (item.openInNewTab) {
                          e.preventDefault();
                          closeSidebar();
                          openSecondaryWindow(item.path);
                          return;
                        }
                        closeSidebar();
                      }}
                    >
                      {item.label}
                    </SecondaryNavItem>
                  ))}
                </MobileSubmenu>
              )}
              </React.Fragment>
            ))}

            {/* ========== BRAND GENERAL / BRAND MANAGER ========== */}
            {!isBrand && (user?.role === 'Brand General' || user?.role === 'Brand Manager') && (
              <>
                {hasManagerPermission('dashboard') && isRouteAllowed('/pos/brand/general/dashboard') && (
                  <NavItem to="/pos/brand/general/dashboard" active={isActive('/pos/brand/general/dashboard')} onClick={closeSidebar}>
                    <NavIcon>■</NavIcon>
                    {t("nav.dashboard")}
                  </NavItem>
                )}

                {/* Sprint 6: Live Orders right under Dashboard */}
                <NavItem to="/pos/brand/general/incoming-orders" active={isActive('/pos/brand/general/incoming-orders')} hasPending={badgeCounts.livePoCount > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.livePoCount > 0}>▤</NavIcon>
                  {t("nav.salesOrders", "Sales Orders")}

                </NavItem>

                {isRouteAllowed('/pos/brand/franchise-map') && (
                  <NavItem to="/pos/brand/franchise-map" active={isActive('/pos/brand/franchise-map')} onClick={closeSidebar}>
                    <NavIcon>◉</NavIcon>
                    {t("nav.franchiseMap", "Franchise Map")}
                  </NavItem>
                )}

                {isRouteAllowed('/pos/brand/franchise') && (
                  <NavItem to="/pos/brand/franchise" active={isActive('/pos/brand/franchise')} onClick={closeSidebar}>
                    <NavIcon>◇</NavIcon>
                    {t("nav.franchise")}
                  </NavItem>
                )}

                {hasManagerPermission('management') && (
                  isRouteAllowed('/pos/brand/general/management') ||
                  isRouteAllowed('/pos/manager/restaurants') ||
                  isRouteAllowed('/pos/manager/staff') ||
                  isRouteAllowed('/pos/brand/manager')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.management")}</NavTitle>
                    {isRouteAllowed('/pos/brand/general/management') && (
                      <NavItem data-tour="sidebar-bg-restaurants" to="/pos/brand/general/management" active={isActive('/pos/brand/general/management')} onClick={closeSidebar}>
                        <NavIcon>▬</NavIcon>
                        {t("nav.brands")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/restaurants') && (
                      <NavItem to="/pos/manager/restaurants" active={isActive('/pos/manager/restaurants')} onClick={closeSidebar}>
                        <NavIcon>◐</NavIcon>
                        {t("nav.restaurants")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/staff') && (
                      <NavItem to="/pos/manager/admins" active={isActive('/pos/manager/admins')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.restaurantAdmins")}
                      </NavItem>
                    )}
                    {user?.role === 'Brand General' && isRouteAllowed('/pos/brand/manager') && (
                      <NavItem to="/pos/brand/manager" active={isActive('/pos/brand/manager')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.managers")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('products') && (
                  isRouteAllowed('/pos/brand-products') ||
                  isRouteAllowed('/pos/recipes') ||
                  isRouteAllowed('/pos/brand-product-recipes') ||
                  isRouteAllowed('/pos/brand-ingredients') ||
                  isRouteAllowed('/pos/brand-inventory')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.productsInventory")}</NavTitle>
                    {isRouteAllowed('/pos/brand-products') && (
                      <NavItem data-tour="sidebar-bg-products" to="/pos/brand-products" active={isActive('/pos/brand-products')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.products")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/recipes') && (
                      <NavItem to="/pos/recipes" active={isActive('/pos/recipes')} onClick={closeSidebar}>
                        <NavIcon>◈</NavIcon>
                        {t("nav.brandRecipes")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand-product-recipes') && (
                      <NavItem to="/pos/brand-product-recipes" active={isActive('/pos/brand-product-recipes')} onClick={closeSidebar}>
                        <NavIcon>⊕</NavIcon>
                        {t("nav.productRecipes")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand-ingredients') && (
                      <NavItem data-tour="sidebar-bg-ingredients" to="/pos/brand-ingredients" active={isActive('/pos/brand-ingredients')} onClick={closeSidebar}>
                        <NavIcon>▤</NavIcon>
                        {t("nav.ingredients")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/suppliers') && (
                      <NavItem to="/pos/suppliers" active={isActive('/pos/suppliers')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.suppliers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand-inventory') && (
                      <NavItem to="/pos/brand-inventory" active={isActive('/pos/brand-inventory')} onClick={closeSidebar}>
                        <NavIcon>▦</NavIcon>
                        {t("nav.inventory")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('products') && (
                  isRouteAllowed('/pos/suppliers/directory') ||
                  isRouteAllowed('/pos/suppliers/contracts') ||
                  isRouteAllowed('/pos/purchase-orders') ||
                  isRouteAllowed('/pos/purchase-invoices')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.order", "Order")}</NavTitle>
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders" active={location.pathname === '/pos/purchase-orders'} onClick={closeSidebar}>
                        <NavIcon>▤</NavIcon>
                        {t("nav.newPurchaseOrder", "Purchase Order")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders/history" active={isActive('/pos/purchase-orders/history')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.purchaseOrderHistory", "Order History")}
                      </NavItem>
                    )}
                    {(isRouteAllowed('/pos/suppliers/contracts') || isRouteAllowed('/pos/suppliers/directory')) && (
                      <NavItem to="/pos/suppliers" active={isActive('/pos/suppliers/contracts') || isActive('/pos/suppliers/directory')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.suppliers", "Suppliers")}
                      </NavItem>
                    )}
                    {/* Live Orders moved to top — under Dashboard (Sprint 6) */}
                  </>
                )}

                {hasManagerPermission('operations') && (
                  isRouteAllowed('/pos/brand/invoices') ||
                  isRouteAllowed('/pos/brand/general/reports') ||
                  isRouteAllowed('/pos/brand/general/performance') ||
                  isRouteAllowed('/pos/manager/coupons')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.operations")}</NavTitle>
                    {isRouteAllowed('/pos/brand/invoices') && (
                      <NavItem to="/pos/brand/invoices" active={isActive('/pos/brand/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                        {t("nav.invoices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/trade-invoices') && (
                      <NavItem to="/pos/brand/trade-invoices" active={isActive('/pos/brand/trade-invoices')} onClick={closeSidebar}>
                        <NavIcon>◧</NavIcon>
                        {t("nav.tradeInvoices", "Trade Invoices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/reports') && (
                      <NavItem to="/pos/brand/general/reports" active={isActive('/pos/brand/general/reports')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.reports")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/performance') && (
                      <NavItem to="/pos/brand/general/performance" active={isActive('/pos/brand/general/performance')} onClick={closeSidebar}>
                        <NavIcon>▲</NavIcon>
                        {t("nav.performance")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/coupons') && (
                      <NavItem to="/pos/manager/coupons" active={isActive('/pos/manager/coupons')} onClick={closeSidebar}>
                        <NavIcon>%</NavIcon>
                        {t("nav.coupons")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('communication') && (
                  isRouteAllowed('/pos/brand/general/notices') ||
                  isRouteAllowed('/pos/brand/general/work-manuals') ||
                  isRouteAllowed('/pos/brand/general/system-inquiry') ||
                  isRouteAllowed('/pos/brand/general/operation-inquiry')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.communication")}</NavTitle>
                    {isRouteAllowed('/pos/brand/general/notices') && (
                      <NavItem to="/pos/brand/general/notices" active={isActive('/pos/brand/general/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                        {t("nav.notices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/work-manuals') && (
                      <NavItem to="/pos/brand/general/work-manuals" active={isActive('/pos/brand/general/work-manuals')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.workManuals")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/system-inquiry') && (
                      <NavItem to="/pos/brand/general/system-inquiry" active={isActive('/pos/brand/general/system-inquiry')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>?</NavIcon>
                        {t("nav.systemInquiry")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/operation-inquiry') && (
                      <NavItem to="/pos/brand/general/operation-inquiry" active={isActive('/pos/brand/general/operation-inquiry')} hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0}>◎</NavIcon>
                        {t("nav.inquiryManagement")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('plans_payments') && (
                  isRouteAllowed('/pos/brand/plans') ||
                  isRouteAllowed('/pos/brand/general/subscriptions') ||
                  isRouteAllowed('/pos/brand/payment-settings')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.plansPayments")}</NavTitle>
                    {isRouteAllowed('/pos/brand/plans') && (
                      <NavItem to="/pos/brand/plans" active={isActive('/pos/brand/plans')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.brandPlans")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/general/subscriptions') && (
                      <NavItem to="/pos/brand/general/subscriptions" active={isActive('/pos/brand/general/subscriptions')} onClick={closeSidebar}>
                        <NavIcon>◈</NavIcon>
                        {t("nav.brandSubscriptions")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/brand/payment-settings') && (
                      <NavItem to="/pos/brand/payment-settings" active={isActive('/pos/brand/payment-settings')} onClick={closeSidebar}>
                        <NavIcon>$</NavIcon>
                        {t("nav.paymentSettings")}
                      </NavItem>
                    )}
                  </>
                )}
              </>
            )}

            {/* ========== FOODCOURT GENERAL / FOODCOURT MANAGER (1뎁스 RailItem 으로 이동) ========== */}
            {!isFoodcourt && (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') && (
              <>
                {hasManagerPermission('dashboard') && isRouteAllowed('/pos/foodcourt/general/dashboard') && (
                  <NavItem to="/pos/foodcourt/general/dashboard" active={isActive('/pos/foodcourt/general/dashboard')} onClick={closeSidebar}>
                    <NavIcon>■</NavIcon>
                    {t("nav.dashboard")}
                  </NavItem>
                )}

                {/* Sprint 6: Live Orders right under Dashboard */}
                <NavItem to="/pos/foodcourt/general/incoming-orders" active={isActive('/pos/foodcourt/general/incoming-orders')} hasPending={badgeCounts.livePoCount > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.livePoCount > 0}>▤</NavIcon>
                  {t("nav.salesOrders", "Sales Orders")}

                </NavItem>

                {isRouteAllowed('/pos/foodcourt/tenancy-map') && (
                  <NavItem to="/pos/foodcourt/tenancy-map" active={isActive('/pos/foodcourt/tenancy-map')} onClick={closeSidebar}>
                    <NavIcon>◉</NavIcon>
                    {t("nav.branchMap", "Branch Map")}
                  </NavItem>
                )}
                {isRouteAllowed('/pos/foodcourt/floor-plan') && (
                  <NavItem
                    data-tour="sidebar-floor-plan"
                    to="/pos/foodcourt/floor-plan"
                    active={isActive('/pos/foodcourt/floor-plan')}
                    onClick={(e) => {
                      e.preventDefault();
                      closeSidebar();
                      openSecondaryWindow('/pos/foodcourt/floor-plan');
                    }}
                  >
                    <NavIcon>▦</NavIcon>
                    {t("nav.floorPlan", "Floor Plan")}
                  </NavItem>
                )}

                {isRouteAllowed('/pos/foodcourt/tenancy') && (
                  <NavItem data-tour="sidebar-tenancy" to="/pos/foodcourt/tenancy" active={isActive('/pos/foodcourt/tenancy')} onClick={closeSidebar}>
                    <NavIcon>◇</NavIcon>
                    {t("nav.tenancy")}
                  </NavItem>
                )}

                {hasManagerPermission('management') && (
                  isRouteAllowed('/pos/foodcourt/general/management') ||
                  isRouteAllowed('/pos/manager/restaurants') ||
                  isRouteAllowed('/pos/manager/staff') ||
                  isRouteAllowed('/pos/foodcourt/manager') ||
                  isRouteAllowed('/pos/foodcourt/general/products') ||
                  isRouteAllowed('/pos/foodcourt/general/inventory') ||
                  user?.role === 'Foodcourt General'
                ) && (
                  <>
                    <NavTitle>{t("nav.section.management")}</NavTitle>
                    {user?.role === 'Foodcourt General' && isRouteAllowed('/pos/foodcourt/branches') && (
                      <NavItem data-tour="sidebar-branches" to="/pos/foodcourt/branches" active={isActive('/pos/foodcourt/branches')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.branches", "Branches")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/restaurants') && (
                      <NavItem to="/pos/manager/restaurants" active={isActive('/pos/manager/restaurants')} onClick={closeSidebar}>
                        <NavIcon>◐</NavIcon>
                        {t("nav.restaurants")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/staff') && (
                      <NavItem to="/pos/manager/admins" active={isActive('/pos/manager/admins')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.restaurantAdmins")}
                      </NavItem>
                    )}
                    {user?.role === 'Foodcourt General' && isRouteAllowed('/pos/foodcourt/manager') && (
                      <NavItem to="/pos/foodcourt/manager" active={isActive('/pos/foodcourt/manager')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.managers")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/products') && (
                      <NavItem to="/pos/foodcourt/general/products" active={isActive('/pos/foodcourt/general/products')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.products")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/inventory') && (
                      <NavItem to="/pos/foodcourt/general/inventory" active={isActive('/pos/foodcourt/general/inventory')} onClick={closeSidebar}>
                        <NavIcon>▦</NavIcon>
                        {t("nav.inventory")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('management') && (
                  isRouteAllowed('/pos/suppliers/directory') ||
                  isRouteAllowed('/pos/suppliers/contracts') ||
                  isRouteAllowed('/pos/purchase-orders') ||
                  isRouteAllowed('/pos/purchase-invoices')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.order", "Order")}</NavTitle>
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders" active={location.pathname === '/pos/purchase-orders'} onClick={closeSidebar}>
                        <NavIcon>▤</NavIcon>
                        {t("nav.newPurchaseOrder", "Purchase Order")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders/history" active={isActive('/pos/purchase-orders/history')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.purchaseOrderHistory", "Order History")}
                      </NavItem>
                    )}
                    {(isRouteAllowed('/pos/suppliers/contracts') || isRouteAllowed('/pos/suppliers/directory')) && (
                      <NavItem to="/pos/suppliers" active={isActive('/pos/suppliers/contracts') || isActive('/pos/suppliers/directory')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.suppliers", "Suppliers")}
                      </NavItem>
                    )}
                    {/* Live Orders moved to top — under Dashboard (Sprint 6) */}
                  </>
                )}

                {hasManagerPermission('operations') && (
                  isRouteAllowed('/pos/foodcourt/invoices') ||
                  isRouteAllowed('/pos/foodcourt/general/reports') ||
                  isRouteAllowed('/pos/manager/coupons')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.operations")}</NavTitle>
                    {isRouteAllowed('/pos/foodcourt/invoices') && (
                      <NavItem to="/pos/foodcourt/invoices" active={isActive('/pos/foodcourt/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                        {t("nav.invoices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/trade-invoices') && (
                      <NavItem to="/pos/foodcourt/trade-invoices" active={isActive('/pos/foodcourt/trade-invoices')} onClick={closeSidebar}>
                        <NavIcon>◧</NavIcon>
                        {t("nav.tradeInvoices", "Trade Invoices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/reports') && (
                      <NavItem to="/pos/foodcourt/general/reports" active={isActive('/pos/foodcourt/general/reports')} onClick={closeSidebar}>
                        <NavIcon>◉</NavIcon>
                        {t("nav.reports")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/manager/coupons') && (
                      <NavItem to="/pos/manager/coupons" active={isActive('/pos/manager/coupons')} onClick={closeSidebar}>
                        <NavIcon>%</NavIcon>
                        {t("nav.coupons")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('communication') && (
                  isRouteAllowed('/pos/foodcourt/general/notices') ||
                  isRouteAllowed('/pos/foodcourt/general/work-manuals') ||
                  isRouteAllowed('/pos/foodcourt/general/system-inquiry') ||
                  isRouteAllowed('/pos/foodcourt/general/operation-inquiry')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.communication")}</NavTitle>
                    {isRouteAllowed('/pos/foodcourt/general/notices') && (
                      <NavItem to="/pos/foodcourt/general/notices" active={isActive('/pos/foodcourt/general/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                        {t("nav.notices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/work-manuals') && (
                      <NavItem to="/pos/foodcourt/general/work-manuals" active={isActive('/pos/foodcourt/general/work-manuals')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.workManuals")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/system-inquiry') && (
                      <NavItem to="/pos/foodcourt/general/system-inquiry" active={isActive('/pos/foodcourt/general/system-inquiry')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>?</NavIcon>
                        {t("nav.systemInquiry")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/operation-inquiry') && (
                      <NavItem to="/pos/foodcourt/general/operation-inquiry" active={isActive('/pos/foodcourt/general/operation-inquiry')} hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0}>◎</NavIcon>
                        {t("nav.inquiryManagement")}
                      </NavItem>
                    )}
                  </>
                )}

                {hasManagerPermission('plans_payments') && (
                  isRouteAllowed('/pos/foodcourt/plans') ||
                  isRouteAllowed('/pos/foodcourt/general/subscriptions') ||
                  isRouteAllowed('/pos/foodcourt/payment-settings')
                ) && (
                  <>
                    <NavTitle>{t("nav.section.plansPayments")}</NavTitle>
                    {isRouteAllowed('/pos/foodcourt/plans') && (
                      <NavItem to="/pos/foodcourt/plans" active={isActive('/pos/foodcourt/plans')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.foodcourtPlans")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/general/subscriptions') && (
                      <NavItem to="/pos/foodcourt/general/subscriptions" active={isActive('/pos/foodcourt/general/subscriptions')} onClick={closeSidebar}>
                        <NavIcon>◈</NavIcon>
                        {t("nav.foodcourtSubscriptions")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/foodcourt/payment-settings') && (
                      <NavItem to="/pos/foodcourt/payment-settings" active={isActive('/pos/foodcourt/payment-settings')} onClick={closeSidebar}>
                        <NavIcon>$</NavIcon>
                        {t("nav.paymentSettings")}
                      </NavItem>
                    )}
                  </>
                )}
              </>
            )}

            {/* ========== RESTAURANT OWNER (1뎁스 RailItem 으로 이동) ========== */}
            {!isOwner && user?.role === 'Restaurant Owner' && (
              <>
                {isRouteAllowed('/pos/owner/dashboard') && (
                  <NavItem to="/pos/owner/dashboard" active={isActive('/pos/owner/dashboard')} onClick={closeSidebar}>
                    <NavIcon>■</NavIcon>
                    {t("nav.dashboard")}
                  </NavItem>
                )}

                {isRouteAllowed('/pos/owner/restaurants') && (
                  <NavItem data-tour="sidebar-owner-restaurants" to="/pos/owner/restaurants" active={isActive('/pos/owner/restaurants')} onClick={closeSidebar}>
                    <NavIcon>◐</NavIcon>
                    {t("nav.restaurants")}
                  </NavItem>
                )}

                {(isRouteAllowed('/pos/suppliers/directory') || isRouteAllowed('/pos/suppliers/contracts') || isRouteAllowed('/pos/purchase-orders') || isRouteAllowed('/pos/purchase-invoices')) && (
                  <>
                    <NavTitle>{t("nav.section.order", "Order")}</NavTitle>
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders" active={location.pathname === '/pos/purchase-orders'} onClick={closeSidebar}>
                        <NavIcon>▤</NavIcon>
                        {t("nav.newPurchaseOrder", "Purchase Order")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/purchase-orders') && (
                      <NavItem to="/pos/purchase-orders/history" active={isActive('/pos/purchase-orders/history')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.purchaseOrderHistory", "Order History")}
                      </NavItem>
                    )}
                    {(isRouteAllowed('/pos/suppliers/contracts') || isRouteAllowed('/pos/suppliers/directory')) && (
                      <NavItem to="/pos/suppliers" active={isActive('/pos/suppliers/contracts') || isActive('/pos/suppliers/directory')} onClick={closeSidebar}>
                        <NavIcon>◇</NavIcon>
                        {t("nav.suppliers", "Suppliers")}
                      </NavItem>
                    )}
                  </>
                )}

                {(isRouteAllowed('/pos/owner/invoices') || isRouteAllowed('/pos/owner/performance') || isRouteAllowed('/pos/owner/reports')) && (
                  <>
                    <NavTitle>{t("nav.section.operations")}</NavTitle>
                    {isRouteAllowed('/pos/owner/invoices') && (
                      <NavItem to="/pos/owner/invoices" active={isActive('/pos/owner/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                        {t("nav.invoices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/performance') && (
                      <NavItem to="/pos/owner/performance" active={isActive('/pos/owner/performance')} onClick={closeSidebar}>
                        <NavIcon>◈</NavIcon>
                        {t("nav.performance")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/reports') && (
                      <NavItem to="/pos/owner/reports" active={isActive('/pos/owner/reports')} onClick={closeSidebar}>
                        <NavIcon>☰</NavIcon>
                        {t("nav.reports")}
                      </NavItem>
                    )}
                  </>
                )}

                {(isRouteAllowed('/pos/owner/notices') || isRouteAllowed('/pos/owner/work-manuals') || isRouteAllowed('/pos/owner/system-inquiry') || isRouteAllowed('/pos/owner/operation-inquiry')) && (
                  <>
                    <NavTitle>{t("nav.section.communication")}</NavTitle>
                    {isRouteAllowed('/pos/owner/notices') && (
                      <NavItem to="/pos/owner/notices" active={isActive('/pos/owner/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                        {t("nav.notices")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/work-manuals') && (
                      <NavItem to="/pos/owner/work-manuals" active={isActive('/pos/owner/work-manuals')} onClick={closeSidebar}>
                        <NavIcon>◆</NavIcon>
                        {t("nav.workManuals")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/system-inquiry') && (
                      <NavItem to="/pos/owner/system-inquiry" active={isActive('/pos/owner/system-inquiry')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>◇</NavIcon>
                        {t("nav.systemInquiry")}
                      </NavItem>
                    )}
                    {isRouteAllowed('/pos/owner/operation-inquiry') && (
                      <NavItem to="/pos/owner/operation-inquiry" active={isActive('/pos/owner/operation-inquiry')} hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0} onClick={closeSidebar}>
                        <NavIcon hasPending={badgeCounts.operationInquiry > 0 || badgeCounts.unreadComments?.operationInquiry > 0}>◆</NavIcon>
                        {t("nav.operationInquiry")}
                      </NavItem>
                    )}
                  </>
                )}
              </>
            )}

            {/* ========== SUPPLIER ADMIN (1뎁스 RailItem 으로 이동) ========== */}
            {!isSupplier && user?.role === 'Supplier Admin' && (
              <>
                <NavItem to="/pos/supplier/dashboard" active={isActive('/pos/supplier/dashboard')} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  {t("nav.dashboard")}
                </NavItem>
                {/* Sprint 6: Live Orders right under Dashboard for visibility */}
                <NavItem data-tour="sidebar-supplier-orders" to="/pos/supplier/orders" active={isActive('/pos/supplier/orders')} hasPending={badgeCounts.livePoCount > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.livePoCount > 0}>▤</NavIcon>
                  {t("nav.salesOrders", "Sales Orders")}

                </NavItem>

                <NavTitle>{t("nav.section.operations")}</NavTitle>
                {isRouteAllowed('/pos/supplier/products') && (
                  <NavItem data-tour="sidebar-supplier-products" to="/pos/supplier/products" active={isActive('/pos/supplier/products')} onClick={closeSidebar}>
                    <NavIcon>◇</NavIcon>
                    {t("nav.products")}
                  </NavItem>
                )}
                {isRouteAllowed('/pos/supplier/inventory') && (
                  <NavItem to="/pos/supplier/inventory" active={isActive('/pos/supplier/inventory')} onClick={closeSidebar}>
                    <NavIcon>▦</NavIcon>
                    {t("nav.inventory")}
                  </NavItem>
                )}
                <NavItem data-tour="sidebar-supplier-customers" to="/pos/supplier/customers" active={isActive('/pos/supplier/customers')} onClick={closeSidebar}>
                  <NavIcon>◯</NavIcon>
                  {t("nav.customers", "Customers")}
                </NavItem>
                {hasModule('supplier_admin_staff') && (
                  <NavItem to="/pos/supplier/staff" active={isActive('/pos/supplier/staff')} onClick={closeSidebar}>
                    <NavIcon>◉</NavIcon>
                    {t("nav.staff", "Staff")}
                  </NavItem>
                )}
                <NavItem to="/pos/supplier/contracts" active={isActive('/pos/supplier/contracts')} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  {t("nav.contracts", "Contracts")}
                </NavItem>

                <NavTitle>{t("nav.section.plansPayments")}</NavTitle>
                <NavItem to="/pos/supplier/trade-invoices" active={isActive('/pos/supplier/trade-invoices')} onClick={closeSidebar}>
                  <NavIcon>▦</NavIcon>
                  {t("nav.tradeInvoices", "Trade Invoices")}
                </NavItem>
                <NavItem to="/pos/supplier/invoices" active={isActive('/pos/supplier/invoices')} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                  {t("nav.invoices")}
                </NavItem>

                <NavTitle>{t("nav.section.communication")}</NavTitle>
                <NavItem to="/pos/supplier/notices" active={isActive('/pos/supplier/notices')} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                  {t("nav.notices")}
                </NavItem>
                <NavItem to="/pos/supplier/system-inquiry" active={isActive('/pos/supplier/system-inquiry')} hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.systemInquiry > 0 || badgeCounts.unreadComments?.systemInquiry > 0}>?</NavIcon>
                  {t("nav.systemInquiry")}
                </NavItem>
              </>
            )}

            {/* ========== RESTAURANT ADMIN & STAFF (1뎁스 RailItem 으로 이동) ========== */}
            {!isRestaurantUser && (user?.role === 'Restaurant Admin' || user?.role === 'Staff') && (
              <>
                <NavItem to={`/restaurant/${restaurantId}/dashboard`} active={isActive(`/restaurant/${restaurantId}/dashboard`)} onClick={closeSidebar}>
                  <NavIcon>■</NavIcon>
                  {t("nav.dashboard")}
                </NavItem>
                <NavItem to={`/restaurant/${restaurantId}/live-orders`} active={isActive(`/restaurant/${restaurantId}/live-orders`)} hasPending={badgeCounts.pendingOrders > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.pendingOrders > 0}>◉</NavIcon>
                  {t("nav.liveOrders")}
                </NavItem>
                <NavItem to={`/restaurant/${restaurantId}/reservations`} active={isActive(`/restaurant/${restaurantId}/reservations`)} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.reservations", "Reservations")}
                </NavItem>
              </>
            )}
          </NavSection>
          
          {/* System Access - Only for Restaurant Admin & Staff (1뎁스 RailItem 으로 이동) */}
          {!isRestaurantUser && (user?.role === 'Restaurant Admin' || user?.role === 'Staff') && (
            isRouteAllowed(`/restaurant/${restaurantId}/pos-terminal`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/floor-plan`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/kitchen`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/display`) ||
            isRouteAllowed(`/mobile/:slug/menu`)
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.systemAccess")}</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/pos-terminal`) && (
                <NavItem
                  to={`/restaurant/${restaurantId}/pos-terminal`}
                  active={isActive(`/restaurant/${restaurantId}/pos-terminal`)}
                  onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                    openSecondaryWindow(`/restaurant/${restaurantId}/pos-terminal`);
                  }}
                >
                  <NavIcon>▦</NavIcon>
                  {t("nav.posTerminal")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/floor-plan`) && (
                <NavItem
                  to={`/restaurant/${restaurantId}/floor-plan`}
                  active={isActive(`/restaurant/${restaurantId}/floor-plan`)}
                  onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                    openSecondaryWindow(`/restaurant/${restaurantId}/floor-plan`);
                  }}
                >
                  <NavIcon>&#x25A6;</NavIcon>
                  {t("nav.floorPlan")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/kitchen`) && (
                <NavItem
                  to={`/restaurant/${restaurantId}/kitchen`}
                  active={isActive(`/restaurant/${restaurantId}/kitchen`)}
                  onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                    openSecondaryWindow(`/restaurant/${restaurantId}/kitchen`);
                  }}
                >
                  <NavIcon>◐</NavIcon>
                  {t("nav.kitchenDisplay")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/display`) && (
                <NavItem
                  to={`/restaurant/${restaurantId}/display`}
                  active={isActive(`/restaurant/${restaurantId}/display`)}
                  onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                    openSecondaryWindow(`/restaurant/${restaurantId}/display`);
                  }}
                >
                  <NavIcon>□</NavIcon>
                  {t("nav.customerDisplay")}
                </NavItem>
              )}
              {isRouteAllowed(`/mobile/:slug/menu`) && (
                <NavItem
                  to="/mobile"
                  active={isActive('/mobile')}
                  onClick={async (e) => {
                  e.preventDefault();
                  closeSidebar();

                  // Check if user has restaurantId
                  if (!user?.restaurantId) {
                    console.error('No restaurant ID found for user');
                    alert('Unable to open mobile order - no restaurant associated with your account');
                    return;
                  }

                  // Fetch restaurant slug
                  const restaurantId = user.restaurantId;
                  console.log('Fetching restaurant:', restaurantId);

                  try {
                    const token = getAuthToken();
                    const response = await fetch(`/api/restaurants/${restaurantId}`, {
                      credentials: 'include',
                      headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                      }
                    });
                    console.log('Response status:', response.status);

                    if (response.ok) {
                      const result = await response.json();
                      console.log('Restaurant result:', result);
                      const data = result.success ? result.data : result;
                      const slug = data.slug || `restaurant-${restaurantId}`;
                      console.log('Using slug:', slug);
                      openSecondaryWindow(`/mobile/${slug}`);
                    } else {
                      console.error('Failed to fetch restaurant, status:', response.status);
                      // Fallback to default slug format
                      openSecondaryWindow(`/mobile/restaurant-${restaurantId}`);
                    }
                  } catch (error) {
                    console.error('Error fetching restaurant slug:', error);
                    // Fallback to default slug format
                    openSecondaryWindow(`/mobile/restaurant-${restaurantId}`);
                  }
                }}
              >
                <NavIcon>◯</NavIcon>
                {t("nav.mobileOrder")}
              </NavItem>
              )}
            </NavSection>
          )}
          
          {/* Restaurant Admin & Staff - Operations (1뎁스 RailItem 으로 이동) */}
          {!isRestaurantUser && (hasMenuPermission('support') || hasMenuPermission('reports') || hasMenuPermission('inventory')) && (
            (hasMenuPermission('support') && isRouteAllowed(`/restaurant/${restaurantId}/invoices`)) ||
            (hasMenuPermission('reports') && isRouteAllowed(`/restaurant/${restaurantId}/reports`)) ||
            (hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/inventory`)) ||
            (hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/suppliers`))
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.operations")}</NavTitle>
              {hasMenuPermission('support') && isRouteAllowed(`/restaurant/${restaurantId}/invoices`) && (
                <NavItem to={`/restaurant/${restaurantId}/invoices`} active={isActive(`/restaurant/${restaurantId}/invoices`)} hasPending={badgeCounts.invoices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.invoices > 0}>▦</NavIcon>
                  {t("nav.invoices")}
                </NavItem>
              )}
              {hasMenuPermission('reports') && isRouteAllowed(`/restaurant/${restaurantId}/reports`) && (
                <NavItem to={`/restaurant/${restaurantId}/reports`} active={isActive(`/restaurant/${restaurantId}/reports`)} onClick={closeSidebar}>
                  <NavIcon>☰</NavIcon>
                  {t("nav.reports")}
                </NavItem>
              )}
              {hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/ingredients`) && (
                <NavItem to={`/restaurant/${restaurantId}/ingredients`} active={isActive(`/restaurant/${restaurantId}/ingredients`)} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  {t("nav.stockItems", "Stock Items")}
                </NavItem>
              )}
              {hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/inventory`) && (
                <NavItem to={`/restaurant/${restaurantId}/inventory`} active={isActive(`/restaurant/${restaurantId}/inventory`)} onClick={closeSidebar}>
                  <NavIcon>◫</NavIcon>
                  {t("nav.inventory")}
                </NavItem>
              )}
              {hasMenuPermission('inventory') && isRouteAllowed(`/restaurant/${restaurantId}/suppliers`) && (
                <NavItem to={`/restaurant/${restaurantId}/suppliers`} active={isActive(`/restaurant/${restaurantId}/suppliers`)} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  {t("nav.suppliers")}
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin & Staff - Suppliers Directory + Contracts (1뎁스 RailItem 으로 이동) */}
          {!isRestaurantUser && (user?.role === 'Restaurant Admin' || user?.role === 'Staff') && hasMenuPermission('inventory') && (
            isRouteAllowed('/pos/suppliers/directory') ||
            isRouteAllowed('/pos/suppliers/contracts') ||
            isRouteAllowed('/pos/purchase-orders') ||
            isRouteAllowed('/pos/purchase-invoices')
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.order", "Order")}</NavTitle>
              {isRouteAllowed('/pos/purchase-orders') && (
                <NavItem to="/pos/purchase-orders" active={location.pathname === '/pos/purchase-orders'} onClick={closeSidebar}>
                  <NavIcon>▤</NavIcon>
                  {t("nav.newPurchaseOrder", "Purchase Order")}
                </NavItem>
              )}
              {isRouteAllowed('/pos/purchase-orders') && (
                <NavItem to="/pos/purchase-orders/history" active={isActive('/pos/purchase-orders/history')} onClick={closeSidebar}>
                  <NavIcon>☰</NavIcon>
                  {t("nav.purchaseOrderHistory", "Order History")}
                </NavItem>
              )}
              {(isRouteAllowed('/pos/suppliers/contracts') || isRouteAllowed('/pos/suppliers/directory')) && (
                <NavItem to="/pos/suppliers" active={isActive('/pos/suppliers/contracts') || isActive('/pos/suppliers/directory')} onClick={closeSidebar}>
                  <NavIcon>◇</NavIcon>
                  {t("nav.suppliers", "Suppliers")}
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin & Staff - Communication (1뎁스 RailItem 으로 이동) */}
          {!isRestaurantUser && hasMenuPermission('support') && (
            isRouteAllowed(`/restaurant/${restaurantId}/notices`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/work-manuals`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/support`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/operation-inquiry`)
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.communication")}</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/notices`) && (
                <NavItem to={`/restaurant/${restaurantId}/notices`} active={isActive(`/restaurant/${restaurantId}/notices`)} hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.notices > 0 || badgeCounts.unreadComments?.notices > 0}>◈</NavIcon>
                  {t("nav.notices")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/work-manuals`) && (
                <NavItem to={`/restaurant/${restaurantId}/work-manuals`} active={isActive(`/restaurant/${restaurantId}/work-manuals`)} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  {t("nav.workManuals")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/support`) && (
                <NavItem to={`/restaurant/${restaurantId}/support`} active={isActive(`/restaurant/${restaurantId}/support`)} hasPending={badgeCounts.unreadComments?.systemInquiry > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.unreadComments?.systemInquiry > 0}>◎</NavIcon>
                  {t("nav.systemInquiry")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/operation-inquiry`) && (
                <NavItem to={`/restaurant/${restaurantId}/operation-inquiry`} active={isActive(`/restaurant/${restaurantId}/operation-inquiry`)} hasPending={badgeCounts.unreadComments?.operationInquiry > 0} onClick={closeSidebar}>
                  <NavIcon hasPending={badgeCounts.unreadComments?.operationInquiry > 0}>▲</NavIcon>
                  {t("nav.operationInquiry")}
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin & Staff (with permission) - Products (1뎁스 RailItem 으로 이동) */}
          {!isRestaurantUser && hasMenuPermission('menu_management') && (
            isRouteAllowed(`/restaurant/${restaurantId}/menu`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/categories`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/options`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/recipe-management`) ||
            isRouteAllowed(`/restaurant/${restaurantId}/ingredients`)
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.products")}</NavTitle>
              {isRouteAllowed(`/restaurant/${restaurantId}/menu`) && (
                <NavItem data-tour="sidebar-ra-menu" to={`/restaurant/${restaurantId}/menu`} active={isActive(`/restaurant/${restaurantId}/menu`)} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  {t("nav.menu")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/categories`) && (
                <NavItem data-tour="sidebar-ra-categories" to={`/restaurant/${restaurantId}/categories`} active={isActive(`/restaurant/${restaurantId}/categories`)} onClick={closeSidebar}>
                  <NavIcon>◈</NavIcon>
                  {t("nav.categories")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/options`) && (
                <NavItem to={`/restaurant/${restaurantId}/options`} active={isActive(`/restaurant/${restaurantId}/options`)} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  {t("nav.options")}
                </NavItem>
              )}
              {isRouteAllowed(`/restaurant/${restaurantId}/recipe-management`) && (
                <NavItem to={`/restaurant/${restaurantId}/recipe-management`} active={isActive(`/restaurant/${restaurantId}/recipe-management`)} onClick={closeSidebar}>
                  <NavIcon>◘</NavIcon>
                  {t("nav.recipes")}
                </NavItem>
              )}
            </NavSection>
          )}

          {/* Restaurant Admin & Staff - Team & Marketing (1뎁스 RailItem 으로 이동) */}
          {!isRestaurantUser && (user?.role === 'Restaurant Admin' || hasMenuPermission('marketing')) && (
            (user?.role === 'Restaurant Admin' && isRouteAllowed(`/restaurant/${restaurantId}/staff`)) ||
            (hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${restaurantId}/customers`)) ||
            (hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${restaurantId}/coupons`))
          ) && (
            <NavSection>
              <NavTitle>{t("nav.section.teamMarketing")}</NavTitle>
              {user?.role === 'Restaurant Admin' && isRouteAllowed(`/restaurant/${restaurantId}/staff`) && (
                <NavItem to={`/restaurant/${restaurantId}/staff`} active={isActive(`/restaurant/${restaurantId}/staff`)} onClick={closeSidebar}>
                  <NavIcon>◆</NavIcon>
                  {t("nav.staff")}
                </NavItem>
              )}
              {hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${restaurantId}/customers`) && (
                <NavItem to={`/restaurant/${restaurantId}/customers`} active={isActive(`/restaurant/${restaurantId}/customers`)} onClick={closeSidebar}>
                  <NavIcon>◯</NavIcon>
                  {t("nav.customers")}
                </NavItem>
              )}
              {hasMenuPermission('marketing') && isRouteAllowed(`/restaurant/${restaurantId}/coupons`) && (
                <NavItem to={`/restaurant/${restaurantId}/coupons`} active={isActive(`/restaurant/${restaurantId}/coupons`)} onClick={closeSidebar}>
                  <NavIcon>%</NavIcon>
                  {t("nav.coupons")}
                </NavItem>
              )}
            </NavSection>
          )}
          
          {/* Settings Section - Role-based */}
          <NavSection>
            {!useTwoTier && <NavTitle>{t("nav.section.settings")}</NavTitle>}

            {/* Profile for all users (2단 사이드바 역할은 1뎁스 Settings 카테고리로 이동) */}
            {!useTwoTier && ((user?.role === 'Restaurant Admin' || user?.role === 'Staff') ? (
              <NavItem to={`/restaurant/${restaurantId}/profile`} active={isActive(`/restaurant/${restaurantId}/profile`)} onClick={closeSidebar}>
                <NavIcon>◯</NavIcon>
                {t("nav.myProfile")}
              </NavItem>
            ) : (
              <NavItem to="/pos/profile" active={isActive('/pos/profile')} onClick={closeSidebar}>
                <NavIcon>◯</NavIcon>
                {t("nav.myProfile")}
              </NavItem>
            ))}

            {/* System Admin Settings — 1뎁스 Settings 카테고리로 이동 (RailItem) */}

            {/* Brand General Settings — Brand 도 1뎁스 Settings 카테고리로 이동 */}
            {!isBrand && (user?.role === 'Brand General' || user?.role === 'Brand Manager') && (
              <>
                <NavItem data-tour="sidebar-bg-company-info" to="/pos/brand/company-info" active={isActive('/pos/brand/company-info')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.companyInfo")}
                </NavItem>
                <NavItem to="/pos/manager/notification-settings" active={isActive('/pos/manager/notification-settings')} onClick={closeSidebar}>
                  <NavIcon>✉</NavIcon>
                  {t("nav.notifications")}
                </NavItem>
              </>
            )}

            {/* Foodcourt General Settings (1뎁스 Settings 카테고리로 이동) */}
            {!isFoodcourt && (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') && (
              <>
                <NavItem data-tour="sidebar-company-info" to="/pos/foodcourt/company-info" active={isActive('/pos/foodcourt/company-info')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.companyInfo")}
                </NavItem>
                <NavItem to="/pos/manager/notification-settings" active={isActive('/pos/manager/notification-settings')} onClick={closeSidebar}>
                  <NavIcon>✉</NavIcon>
                  {t("nav.notifications")}
                </NavItem>
              </>
            )}

            {/* Supplier Admin Settings (1뎁스 Settings 카테고리로 이동) */}
            {!isSupplier && user?.role === 'Supplier Admin' && (
              <>
                <NavItem data-tour="sidebar-supplier-company-info" to="/pos/supplier/company-info" active={isActive('/pos/supplier/company-info')} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.companyInfo")}
                </NavItem>
                <NavItem to="/pos/supplier/payment-settings" active={isActive('/pos/supplier/payment-settings')} onClick={closeSidebar}>
                  <NavIcon>$</NavIcon>
                  {t("nav.paymentSettings")}
                </NavItem>
                <NavItem to="/pos/supplier/invoice-settings" active={isActive('/pos/supplier/invoice-settings')} onClick={closeSidebar}>
                  <NavIcon>≡</NavIcon>
                  {t("nav.invoiceSettings", "Invoice Settings")}
                </NavItem>
              </>
            )}

            {/* Restaurant Admin & Staff (with permission) Settings (1뎁스 Settings 카테고리로 이동) */}
            {!isRestaurantUser && hasMenuPermission('settings') && (
              <>
                <NavItem data-tour="sidebar-ra-company-info" to={`/restaurant/${restaurantId}/company-information`} active={isActive(`/restaurant/${restaurantId}/company-information`)} onClick={closeSidebar}>
                  <NavIcon>◐</NavIcon>
                  {t("nav.companyInfo")}
                </NavItem>
                <NavItem data-tour="sidebar-ra-settings" to={`/restaurant/${restaurantId}/settings`} active={isActive(`/restaurant/${restaurantId}/settings`)} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  {t("nav.storeSettings")}
                </NavItem>
                <NavItem to={`/restaurant/${restaurantId}/notification-settings`} active={isActive(`/restaurant/${restaurantId}/notification-settings`)} onClick={closeSidebar}>
                  <NavIcon>⚙</NavIcon>
                  {t("nav.systemSettings")}
                </NavItem>
              </>
            )}

            {/* Restaurant Admin & Staff - Change History (1뎁스 Settings 카테고리로 이동) */}
            {!isRestaurantUser && hasMenuPermission('reports') && (user?.role === 'Restaurant Admin' || user?.role === 'Staff') && isRouteAllowed(`/restaurant/${restaurantId}/history`) && (
              <NavItem to={`/restaurant/${restaurantId}/history`} active={isActive(`/restaurant/${restaurantId}/history`)} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* System Admin - Change History (1뎁스 Settings 카테고리로 이동) */}

            {/* Brand General/Manager - Change History (Brand 1뎁스 Settings 로 이동) */}
            {!isBrand && (user?.role === 'Brand General' || user?.role === 'Brand Manager') && isRouteAllowed('/pos/brand/history') && (
              <NavItem to="/pos/brand/history" active={isActive('/pos/brand/history')} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* Foodcourt General/Manager - Change History (1뎁스 Settings 카테고리로 이동) */}
            {!isFoodcourt && (user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager') && isRouteAllowed('/pos/foodcourt/history') && (
              <NavItem to="/pos/foodcourt/history" active={isActive('/pos/foodcourt/history')} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* Restaurant Owner - Change History (1뎁스 Settings 카테고리로 이동) */}
            {!isOwner && user?.role === 'Restaurant Owner' && isRouteAllowed('/pos/owner/history') && (
              <NavItem to="/pos/owner/history" active={isActive('/pos/owner/history')} onClick={closeSidebar}>
                <NavIcon>≡</NavIcon>
                {t("nav.changeHistory")}
              </NavItem>
            )}

            {/* Logout — 2단 사이드바 (System Admin/Brand) 는 RailButton, 그 외는 기존 NavItem */}
            {useTwoTier ? (
              <RailButton
                $collapsed={isSidebarCollapsed}
                onClick={handleLogout}
                title={t("nav.logout")}
              >
                <LogOut />
                <RailLabel $collapsed={isSidebarCollapsed}>{t("nav.logout")}</RailLabel>
              </RailButton>
            ) : (
              <NavItem to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                <NavIcon>↩</NavIcon>
                {t("nav.logout")}
              </NavItem>
            )}
          </NavSection>
        </SidebarNav>

        <SidebarFooter $collapsed={isSidebarCollapsed}>
          {isSidebarCollapsed ? (
            <>
              {/* Refer & Earn — icon rail */}
              <FooterRailButton
                as="a"
                href="/referral/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                $accent
                title={t('nav.referralProgram', 'Refer & Earn') || ''}
                onClick={() => closeSidebar?.()}
              >
                <Gift size={18} strokeWidth={2} />
                {referralBalance && referralBalance !== 'empty' && <FooterRailDot />}
              </FooterRailButton>

              {/* Install App — icon rail */}
              {showInstallButton && (
                <FooterRailButton
                  type="button"
                  onClick={async () => {
                    if (canInstall) {
                      await promptInstall();
                    } else if (isIOS) {
                      alert(t('common:pwa.installBanner.iosGuide', 'On iPhone/iPad: tap the Share button in Safari, then "Add to Home Screen".'));
                    }
                    closeSidebar?.();
                  }}
                  title={t('nav.installApp', 'Install App') || ''}
                >
                  <Download size={18} strokeWidth={2} />
                </FooterRailButton>
              )}

              {/* Language — flag only */}
              <FooterRailLang>
                <LanguageSelector variant="icon" />
              </FooterRailLang>

              {/* User avatar */}
              {user && (
                <FooterRailAvatar
                  type="button"
                  onClick={() => {
                    if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
                      navigate(`/restaurant/${restaurantId}/profile`);
                    } else {
                      navigate('/pos/profile');
                    }
                  }}
                  title={`${user.full_name || user.name || 'User'} • ${user.email}`}
                >
                  <UserAvatar role={user.role}>
                    {getInitials(user.full_name || user.name || user.email)}
                  </UserAvatar>
                </FooterRailAvatar>
              )}
            </>
          ) : (
            <>
              {/* Referral program link — visible to every role (Phase 3).
                  Opens in a new tab so the user's POS context is preserved. */}
              <a
                href="/referral/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  margin: '0 8px 12px',
                  borderRadius: 8,
                  background: 'linear-gradient(120deg, #635BFF, #8775FF)',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                  boxShadow: '0 2px 8px rgba(99,91,255,0.25)'
                }}
                title={t('nav.referralProgram', 'Refer & earn — open referral dashboard') || ''}
                onClick={() => closeSidebar?.()}
              >
                <Gift size={16} strokeWidth={2} />
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t('nav.referralProgram', 'Refer & Earn')}</span>
                {referralBalance && referralBalance !== 'empty' && (
                  <span style={{ fontSize: 11, opacity: 0.85, whiteSpace: 'nowrap' }}>
                    {(() => {
                      const sym = referralBalance.currency === 'MYR' ? 'RM'
                                : referralBalance.currency === 'USD' ? '$'
                                : referralBalance.currency === 'KRW' ? '₩'
                                : referralBalance.currency === 'SGD' ? 'S$'
                                : referralBalance.currency === 'JPY' ? '¥'
                                : referralBalance.currency === 'VND' ? '₫'
                                : referralBalance.currency + ' ';
                      const decimals = ['KRW', 'JPY', 'VND'].includes(referralBalance.currency) ? 0 : 2;
                      return `${sym}${referralBalance.balance.toFixed(decimals)}`;
                    })()}
                  </span>
                )}
              </a>
              {/* Install App — visible on desktop (Chrome/Edge canInstall) + mobile (iOS shows guide).
                  Hidden when already running standalone (already installed). Triggers PWA prompt
                  directly — no separate /install landing page. */}
              {showInstallButton && (
                <button type="button"
                  type="button"
                  onClick={async () => {
                    if (canInstall) {
                      await promptInstall();
                    } else if (isIOS) {
                      alert(t('common:pwa.installBanner.iosGuide', 'On iPhone/iPad: tap the Share button in Safari, then "Add to Home Screen".'));
                    }
                    closeSidebar?.();
                  }}
                  title={t('nav.installApp', 'Install App') || ''}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 16px',
                    margin: '0 8px 12px',
                    borderRadius: 8,
                    background: '#F6F9FC',
                    color: '#0A2540',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                    border: '1px solid #E6EBF1',
                    width: 'calc(100% - 16px)',
                    textAlign: 'left'
                  }}
                >
                  <Download size={16} strokeWidth={1.75} />
                  <span style={{ flex: 1 }}>{t('nav.installApp', 'Install App')}</span>
                </button>
              )}
              <LanguageSelectorWrapper>
                <LanguageSelector variant="sidebar" />
              </LanguageSelectorWrapper>
              {/* User Information */}
              {user && (
                <UserInfo>
                <UserCard onClick={() => {
                  if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
                    navigate(`/restaurant/${restaurantId}/profile`);
                  } else {
                    navigate('/pos/profile');
                  }
                }}>
                  <UserAvatar role={user.role}>
                    {getInitials(user.full_name || user.name || user.email)}
                  </UserAvatar>
                  <UserDetails>
                    <UserName>{user.full_name || user.name || 'User'}</UserName>
                    <UserRole>{displayRole(user.role)}</UserRole>
                    <UserEmail>{user.email}</UserEmail>
                  </UserDetails>
                </UserCard>
              </UserInfo>
              )}
            </>
          )}
        </SidebarFooter>
      </Sidebar>

      {/* Sidebar Open Button (shown when sidebar is collapsed; hidden for System Admin since rail stays visible) */}
      <SidebarOpenButton
        isCollapsed={isSidebarCollapsed}
        $isSystemAdmin={useTwoTier}
        onClick={toggleSidebarCollapse}
        title="Open Sidebar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </SidebarOpenButton>

      {/* System Admin 2-tier secondary panel (expanded mode) */}
      {showSecondaryPanel && activeAdminCategory?.items && !isSecondaryCollapsed && (
        <SecondaryPanel $sidebarW={adminSidebarW}>
          <SecondaryHeader>
            {activeAdminCategory.label}
            <CollapseSecondaryBtn onClick={toggleSecondaryCollapse} title="Collapse panel">
              <ChevronsLeft />
            </CollapseSecondaryBtn>
          </SecondaryHeader>
          <SecondaryNav>
            {activeAdminCategory.items.map(item => (
              <SecondaryNavItem
                key={item.path}
                to={item.path}
                $active={matchPathFull(item)}
                $hasPending={item.hasPending}
                onClick={(e) => {
                  if (item.openInNewTab) {
                    e.preventDefault();
                    closeSidebar();
                    window.open(item.path, '_blank');
                    return;
                  }
                  closeSidebar();
                }}
              >
                {item.label}
              </SecondaryNavItem>
            ))}
          </SecondaryNav>
        </SecondaryPanel>
      )}

      {/* Hover popover (collapsed mode) */}
      {showPopover && hoveredCategory?.items && (
        <SecondaryPopover
          $top={hoveredCatTop}
          $left={adminSidebarW + 4}
          onMouseEnter={handlePopoverEnter}
          onMouseLeave={handlePopoverLeave}
        >
          <SecondaryPopoverHeader>{hoveredCategory.label}</SecondaryPopoverHeader>
          <SecondaryPopoverNav>
            {hoveredCategory.items.map(item => (
              <SecondaryNavItem
                key={item.path}
                to={item.path}
                $active={matchPathFull(item)}
                $hasPending={item.hasPending}
                onClick={(e) => {
                  if (item.openInNewTab) {
                    e.preventDefault();
                    setHoveredCatId(null);
                    closeSidebar();
                    window.open(item.path, '_blank');
                    return;
                  }
                  setHoveredCatId(null);
                  closeSidebar();
                }}
              >
                {item.label}
              </SecondaryNavItem>
            ))}
          </SecondaryPopoverNav>
        </SecondaryPopover>
      )}

      {/* Expand 2뎁스 button (collapsed mode) */}
      {useTwoTier && isSecondaryCollapsed && (
        <ExpandSecondaryBtn $sidebarW={adminSidebarW} onClick={toggleSecondaryCollapse} title="Expand panel">
          <ChevronsRight />
        </ExpandSecondaryBtn>
      )}

      <MainContent
        isCollapsed={isSidebarCollapsed}
        $sidebarW={useTwoTier ? adminSidebarW : undefined}
        $extraLeft={(showSecondaryPanel && !isSecondaryCollapsed) ? SECONDARY_PANEL_W : 0}
      >
        <MobileContent>
          {children}
        </MobileContent>
      </MainContent>

      </LayoutContainer>

      {/* Global print styles for MainLayout */}
      <style>{`
        @media print {
          /* Hide EVERYTHING except print content */
          body > *:not(#bill-print-content):not([data-print-bill]) {
            display: none !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </BrandThemeProvider>
  );
};

export default MainLayout;