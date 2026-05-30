import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// 모바일 세트 주문 UI (SET_MENU_REDESIGN.md §10-B). 터치 전용.
// fixed 슬롯=자동 포함(읽기전용), choice 슬롯=라디오/체크 피커. 포함된 구성품마다 상속옵션 인라인.
// 컨트롤드 — 선택 상태는 부모(ItemDetailPage)가 보유.

export interface ResolvedOption { id: number | string; name: string; price: number; }
export interface ResolvedOptionGroup { id: number | string; name: string; required: boolean; multiple: boolean; options: ResolvedOption[]; }
export interface ResolvedSetItem {
  product_id: number; name: string; price: number; qty?: number; upcharge?: number; soldOut?: boolean;
  optionGroups?: ResolvedOptionGroup[];
}
export interface ResolvedSetGroup {
  id: string; label: string; type: 'fixed' | 'choice'; min?: number; max?: number; items: ResolvedSetItem[];
}

interface Props {
  groups: ResolvedSetGroup[];
  selections: Record<string, number[]>;                       // groupId -> chosen product_ids
  onToggleComponent: (groupId: string, productId: number, type: 'fixed' | 'choice', max: number) => void;
  componentOptions: Record<string, string[]>;                 // `${groupId}:${pid}` -> optionIds
  onToggleOption: (groupId: string, productId: number, optionId: string, multiple: boolean, required: boolean) => void;
  formatCurrency: (v: number) => string;
}

const Section = styled.div`margin-bottom: 20px;`;
const GroupHead = styled.div`display: flex; align-items: center; gap: 8px; margin-bottom: 10px;`;
const GroupLabel = styled.div`font-size: 16px; font-weight: 600; color: #1F2937;`;
const ChooseHint = styled.span`
  font-size: 12px; font-weight: 600; color: #635BFF;
  background: #F0EFFF; border-radius: 999px; padding: 2px 10px;
`;
const SoldOutTag = styled.span`font-size: 11px; font-weight: 600; color: #FF6B6B;`;

const PickBtn = styled.button<{ $selected: boolean; $disabled?: boolean }>`
  width: 100%; min-height: 52px; padding: 12px 16px; margin-bottom: 8px;
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  border: 2px solid ${p => (p.$selected ? '#635BFF' : '#E6EBF1')};
  border-radius: 12px; background: ${p => (p.$selected ? '#F0EFFF' : '#FFFFFF')};
  color: #1F2937; font-size: 15px; text-align: left; cursor: pointer;
  opacity: ${p => (p.$disabled ? 0.5 : 1)};
`;
const FixedRow = styled.div`
  width: 100%; min-height: 48px; padding: 10px 16px; margin-bottom: 8px;
  display: flex; align-items: center; justify-content: space-between;
  border: 1px solid #E6EBF1; border-radius: 12px; background: #F7F9FC; color: #1F2937; font-size: 15px;
`;
const UpTag = styled.span`font-size: 13px; color: #4B5563;`;

const OptWrap = styled.div`margin: 6px 0 14px 12px; padding-left: 12px; border-left: 2px solid #EEF1F6;`;
const OptTitle = styled.div`font-size: 13px; font-weight: 600; color: #4B5563; margin-bottom: 6px;`;
const ReqBadge = styled.span`font-size: 10px; color: #FF6B6B; margin-left: 6px;`;
const OptBtn = styled.button<{ $selected: boolean }>`
  min-height: 40px; padding: 8px 14px; margin: 0 6px 6px 0;
  border: 2px solid ${p => (p.$selected ? '#635BFF' : '#E6EBF1')};
  border-radius: 10px; background: ${p => (p.$selected ? '#F0EFFF' : '#FFFFFF')};
  color: #1F2937; font-size: 14px; cursor: pointer;
`;
const OptRow = styled.div`display: flex; flex-wrap: wrap;`;

const MobileSetOrder: React.FC<Props> = ({ groups, selections, onToggleComponent, componentOptions, onToggleOption, formatCurrency }) => {
  const { t } = useTranslation();

  const renderInheritedOptions = (groupId: string, it: ResolvedSetItem) => {
    const ogs = it.optionGroups || [];
    if (ogs.length === 0) return null;
    const key = `${groupId}:${it.product_id}`;
    const sel = componentOptions[key] || [];
    return (
      <OptWrap>
        {ogs.map(og => (
          <div key={og.id} style={{ marginBottom: 8 }}>
            <OptTitle>
              {og.name}
              {og.required && <ReqBadge>{t('menu:setOrder.required', { defaultValue: 'Required' })}</ReqBadge>}
            </OptTitle>
            <OptRow>
              {og.options.map(o => (
                <OptBtn
                  key={o.id}
                  type="button"
                  $selected={sel.includes(String(o.id))}
                  onClick={() => onToggleOption(groupId, it.product_id, String(o.id), og.multiple, og.required)}
                >
                  {o.name}{o.price > 0 ? ` +${formatCurrency(o.price)}` : ''}
                </OptBtn>
              ))}
            </OptRow>
          </div>
        ))}
      </OptWrap>
    );
  };

  return (
    <div>
      {groups.map(g => {
        const min = g.min == null ? 1 : g.min;
        const max = g.max == null ? 1 : g.max;
        const chosen = selections[g.id] || [];
        return (
          <Section key={g.id}>
            <GroupHead>
              <GroupLabel>{g.label}</GroupLabel>
              {g.type === 'choice' && (
                <ChooseHint>
                  {min === max
                    ? t('menu:setOrder.chooseN', { count: max, defaultValue: `Choose ${max}` })
                    : t('menu:setOrder.chooseRange', { min, max, defaultValue: `Choose ${min}-${max}` })}
                </ChooseHint>
              )}
            </GroupHead>

            {g.type === 'fixed'
              ? g.items.map(it => (
                  <div key={it.product_id}>
                    <FixedRow>
                      <span>{it.name}{it.qty && it.qty > 1 ? ` ×${it.qty}` : ''}</span>
                      {it.soldOut && <SoldOutTag>{t('menu:setOrder.soldOut', { defaultValue: 'SOLD OUT' })}</SoldOutTag>}
                    </FixedRow>
                    {!it.soldOut && renderInheritedOptions(g.id, it)}
                  </div>
                ))
              : g.items.map(it => {
                  const selected = chosen.includes(it.product_id);
                  return (
                    <div key={it.product_id}>
                      <PickBtn
                        type="button"
                        $selected={selected}
                        $disabled={it.soldOut}
                        disabled={it.soldOut}
                        onClick={() => onToggleComponent(g.id, it.product_id, 'choice', max)}
                      >
                        <span>{it.name}</span>
                        <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          {it.upcharge && it.upcharge > 0 ? <UpTag>+{formatCurrency(it.upcharge)}</UpTag> : null}
                          {it.soldOut && <SoldOutTag>{t('menu:setOrder.soldOut', { defaultValue: 'SOLD OUT' })}</SoldOutTag>}
                          {selected && <span style={{ color: '#635BFF', fontWeight: 700 }}>✓</span>}
                        </span>
                      </PickBtn>
                      {selected && renderInheritedOptions(g.id, it)}
                    </div>
                  );
                })}
          </Section>
        );
      })}
    </div>
  );
};

export default MobileSetOrder;
