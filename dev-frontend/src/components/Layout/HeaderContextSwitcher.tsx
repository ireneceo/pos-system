import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../UI';

/**
 * 헤더 컨텍스트 스위처 — "지금 어느 매장/역할인가 + 바꾸기".
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §6.2 (2단 진입점).
 *
 * **왜 헤더인가**: 대시보드 퀵액션 카드만으로는 **스크롤해야 보여서 사용자가 못 찾았다**
 * (2026-08-20 Irene 실사용 실측 — "다른 역할로 어떻게 다시 이동해?"). 어느 화면에 있든 항상
 * 보이는 자리는 헤더뿐이고, "지금 내가 어느 매장에 있는지"가 늘 보이는 것은 **모자를 쓴 채
 * 엉뚱한 매장을 조작하는 실수를 막는 안전장치**이기도 하다.
 *
 * ⚠ 이 파일은 MainLayout(🔒 인쇄 보호파일)에 **부품으로 끼워지기만** 한다. 보호파일에 들어가는
 *   변경은 import 1줄 + 배치 1줄뿐이며, 로직은 전부 여기에 둔다.
 *
 * 고를 것이 1개 이하면 **아무것도 렌더하지 않는다** — 부여받은 모자가 없는 사용자(현재 대다수)
 * 에게는 헤더가 지금과 완전히 동일하다.
 */

// 로컬 버튼 스타일 신규 금지(디자인 단일 기준) → 공용 Button 을 확장한다.
// ⚠ 공용 기본형은 보라 배경 + 흰 글자다. 크롬(헤더/사이드바)용으로 쓰려면 평상시뿐 아니라
//    hover/focus/active 에서도 배경·글자색을 **명시적으로** 고정해야 한다(안 하면 글자가 묻힌다 —
//    픽커에서 실제로 그 사고가 났다).
const chromeReset = `
  background: transparent;
  color: inherit;
  box-shadow: none;
  transform: none;
`;

const Chip = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  min-height: 36px;
  max-width: 220px;
  padding: 0 12px;
  border: 1px solid var(--pos-border, #E3E8EE);
  border-radius: 8px;
  background: var(--pos-surface, #FFFFFF);
  color: var(--pos-text, #0A2540);
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover:not(:disabled), &:active:not(:disabled) {
    background: var(--pos-surface, #FFFFFF);
    color: var(--pos-text, #0A2540);
    border-color: #635BFF;
    box-shadow: none;
    transform: none;
  }

  &:focus-visible {
    outline: 2px solid #635BFF;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    max-width: 140px;
  }
`;

// 접힘 사이드바용 — 아이콘만, 정사각 44px(터치 타깃).
const RailButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 8px;
  ${chromeReset}
  cursor: pointer;

  &:hover:not(:disabled), &:active:not(:disabled) {
    background: rgba(99, 91, 255, 0.08);
    color: inherit;
    box-shadow: none;
    transform: none;
  }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
`;

// 펼침 사이드바용 — 전체 너비 한 줄.
const SidebarButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  border: none;
  border-radius: 8px;
  ${chromeReset}
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  text-align: left;
  cursor: pointer;

  &:hover:not(:disabled), &:active:not(:disabled) {
    background: rgba(99, 91, 255, 0.08);
    color: inherit;
    box-shadow: none;
    transform: none;
  }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
`;

const Glyph = styled.span`
  flex-shrink: 0;
  font-size: 14px;
  line-height: 1;
  color: #635BFF;
`;

const Label = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Caret = styled.span`
  flex-shrink: 0;
  font-size: 10px;
  color: var(--pos-text-muted, #425466);
`;

/**
 * variant — 이 레이아웃은 컨트롤이 화면 크기별로 다른 자리에 산다(실측):
 *   'mobile'   : MobileHeader (모바일에서만 표시)
 *   'rail'     : 사이드바 접힘 상태 (아이콘만) — 데스크탑
 *   'sidebar'  : 사이드바 펼침 상태 (이름까지) — 데스크탑
 * 기존 LanguageSelector 가 같은 방식으로 세 벌 대응하는 검증된 패턴을 그대로 따른다.
 */
type SwitcherVariant = 'mobile' | 'rail' | 'sidebar';

const HeaderContextSwitcher: React.FC<{ variant?: SwitcherVariant }> = ({ variant = 'mobile' }) => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { user, contexts } = useAuth();

  // 고를 것이 하나뿐이면 렌더하지 않는다(= 기존 화면과 동일).
  if (!contexts || contexts.length < 2) return null;

  // 지금 있는 곳: 매장 자격이면 그 매장, 아니면 본래 정체 카드의 이름.
  const current =
    contexts.find(
      (c) => c.kind === 'granted' && String(c.entity_id) === String(user?.restaurant_id ?? user?.restaurantId ?? '')
    ) || contexts.find((c) => c.kind === 'default');

  const label = current?.label || t('context.select.title');
  const go = () => navigate('/pos/select-context');

  // 접힘 사이드바 — 아이콘만(이름은 tooltip). 44px 터치 타깃 확보.
  if (variant === 'rail') {
    return (
      <RailButton type="button" onClick={go} title={label} aria-label={t('context.switcher.tooltip')}>
        <Glyph aria-hidden="true">◐</Glyph>
      </RailButton>
    );
  }

  // 펼침 사이드바 — 전체 너비, 이름 표시.
  if (variant === 'sidebar') {
    return (
      <SidebarButton type="button" onClick={go} title={label} aria-label={t('context.switcher.tooltip')}>
        <Glyph aria-hidden="true">◐</Glyph>
        <Label>{label}</Label>
        <Caret aria-hidden="true">▾</Caret>
      </SidebarButton>
    );
  }

  return (
    <Chip type="button" onClick={go} title={label} aria-label={t('context.switcher.tooltip')}>
      <Glyph aria-hidden="true">◐</Glyph>
      <Label>{label}</Label>
      <Caret aria-hidden="true">▾</Caret>
    </Chip>
  );
};

export default HeaderContextSwitcher;
