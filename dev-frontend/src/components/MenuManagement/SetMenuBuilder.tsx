import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Trash2, Search, X } from 'lucide-react';
import { SetGroup } from '../../utils/setMenu';

// 세트메뉴 v2 빌더 — "구성 슬롯" 리스트 (SET_MENU_REDESIGN.md §10-A).
// 슬롯: 이름 + 타입(고정/선택) + 검색형 상품 멀티선택 + choice면 min/max + 상품별 upcharge.
// 표준 디자인 토큰 사용. 상품 선택은 검색+탭 리스트(관리자 화면). 타입/min/max 는 네이티브 select(터치 OK).

export interface BuilderMenuItem {
  id: string;
  name: string;
  price: number;
  code?: string;
  emoji?: string;
  image?: string;
  is_set_menu?: boolean;
  category?: string;
  optionGroups?: string[];
}

export interface BuilderOptionGroup {
  id: string;
  name: string;
  required?: boolean;
  multiple?: boolean;
}

interface Props {
  value: SetGroup[];
  onChange: (groups: SetGroup[]) => void;
  menuItems: BuilderMenuItem[];
  formatCurrency: (v: number) => string;
  // 옵션그룹 정의(id→이름) — 각 구성품이 등록 시점에 상속하는 옵션을 보여주기 위함
  optionGroups?: BuilderOptionGroup[];
}

const Wrap = styled.div`display: flex; flex-direction: column; gap: 16px;`;

const SlotCard = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 16px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SlotHead = styled.div`display: flex; align-items: center; gap: 8px;`;

const SlotNameInput = styled.input`
  flex: 1;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const TypeToggle = styled.div`display: inline-flex; border: 1px solid #E6EBF1; border-radius: 8px; overflow: hidden;`;
const TypeBtn = styled.button<{ $active: boolean }>`
  height: 44px;
  min-width: 64px;
  padding: 0 14px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: ${p => p.$active ? '#635BFF' : '#FFFFFF'};
  color: ${p => p.$active ? '#FFFFFF' : '#6B7C93'};
  transition: background 0.15s;
`;

const IconBtn = styled.button`
  width: 44px; height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid #E6EBF1; border-radius: 8px; background: #FFFFFF;
  color: #FF6B6B; cursor: pointer;
  &:hover { background: #FFF5F5; }
`;

const ChosenList = styled.div`display: flex; flex-direction: column; gap: 8px;`;
const ChosenRow = styled.div`
  display: flex; flex-direction: column; gap: 6px;
  padding: 10px 12px; border: 1px solid #E6EBF1; border-radius: 8px; background: #F7F9FC;
`;
const ChosenTop = styled.div`display: flex; align-items: center; gap: 10px;`;
const ChosenName = styled.div`flex: 1; font-size: 14px; color: #0A2540; font-weight: 500;`;
const SmallLabel = styled.span`font-size: 12px; color: #6B7C93;`;

const Stepper = styled.div`display: inline-flex; align-items: center; gap: 4px;`;
const StepBtn = styled.button`
  width: 36px; height: 36px; border: 1px solid #E6EBF1; border-radius: 8px;
  background: #FFFFFF; color: #0A2540; font-size: 18px; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
const StepVal = styled.span`min-width: 28px; text-align: center; font-size: 14px; font-weight: 600; color: #0A2540;`;

const UpchargeInput = styled.input`
  width: 84px; height: 36px; padding: 0 8px; text-align: right;
  border: 1px solid #E6EBF1; border-radius: 8px; font-size: 13px; color: #0A2540;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const ChoiceRange = styled.div`display: flex; align-items: center; gap: 8px; flex-wrap: wrap;`;
const RangeSelect = styled.select`
  height: 40px; padding: 0 10px; border: 1px solid #E6EBF1; border-radius: 8px;
  font-size: 13px; color: #0A2540; background: #FFFFFF;
  &:focus { outline: none; border-color: #635BFF; }
`;

const SearchBox = styled.div`position: relative;`;
const SearchInput = styled.input`
  width: 100%; height: 44px; padding: 0 12px 0 38px;
  border: 1px solid #E6EBF1; border-radius: 8px; font-size: 14px; color: #0A2540;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;
const SearchIcon = styled(Search)`position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9CA3AF;`;

// 진짜 드롭다운 — 검색어 있을 때만 SearchBox 위에 absolute 로 떠서 레이아웃을 밀지 않음.
// 선택하면 query 가 비워지며 닫힘.
const PickList = styled.div`
  position: absolute;
  top: calc(100% + 4px); left: 0; right: 0; z-index: 30;
  max-height: 240px; overflow-y: auto;
  background: #FFFFFF; border: 1px solid #E6EBF1; border-radius: 8px;
  box-shadow: 0 8px 24px rgba(10,37,64,0.12);
`;
const PickRow = styled.button<{ $selected: boolean }>`
  width: 100%; min-height: 48px; padding: 8px 12px;
  display: flex; align-items: center; gap: 10px; text-align: left;
  border: none; border-bottom: 1px solid #F0F3F7; cursor: pointer;
  background: ${p => p.$selected ? '#F0EFFF' : '#FFFFFF'};
  &:last-child { border-bottom: none; }
`;
const PickName = styled.div`flex: 1; font-size: 14px; color: #0A2540;`;
const PickPrice = styled.div`font-size: 12px; color: #6B7C93;`;

const AddSlotBtn = styled.button`
  height: 48px; border: 1px dashed #C7CED6; border-radius: 12px; background: #FFFFFF;
  color: #635BFF; font-size: 14px; font-weight: 600; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  &:hover { border-color: #635BFF; background: #FAFAFF; }
`;

const EmptyHint = styled.div`
  padding: 20px; text-align: center; color: #6B7C93; font-size: 13px;
  border: 1px dashed #E6EBF1; border-radius: 8px;
`;

// 등록 화면 상단 안내 — 세트가 어떻게 구성되는지 한눈에
const IntroHint = styled.div`
  padding: 12px 14px; border-radius: 10px; background: #F0EFFF;
  border: 1px solid #E0DEFF; color: #4B4B8F; font-size: 12.5px; line-height: 1.6;
`;

// Fixed / Choice 가 무슨 뜻인지 슬롯 안에서 친절하게 설명
const TypeExplain = styled.div`
  font-size: 12px; color: #6B7C93; line-height: 1.5;
  padding: 2px 2px 0;
`;

// 구성품이 상속하는 옵션 표시(읽기전용) — "주문 시 이 옵션이 함께 나옵니다"
const InheritRow = styled.div`
  display: flex; align-items: center; flex-wrap: wrap; gap: 6px;
  padding: 2px 0 0 2px;
`;
const InheritLabel = styled.span`font-size: 11.5px; color: #6B7C93;`;
const InheritChip = styled.span`
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; color: #4B4B8F; background: #F0EFFF;
  border: 1px solid #E0DEFF; border-radius: 999px; padding: 2px 9px;
`;
const InheritNone = styled.span`font-size: 11.5px; color: #9CA3AF; font-style: italic;`;

let slotSeq = 0;
const newSlotId = () => `slot-${Date.now()}-${slotSeq++}`;

const SetMenuBuilder: React.FC<Props> = ({ value, onChange, menuItems, formatCurrency, optionGroups = [] }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<Record<string, string>>({});

  const groups = Array.isArray(value) ? value : [];
  const sellable = useMemo(() => menuItems.filter(m => !m.is_set_menu), [menuItems]);
  const byId = useMemo(() => new Map(sellable.map(m => [m.id, m])), [sellable]);
  const ogById = useMemo(() => new Map(optionGroups.map(g => [String(g.id), g])), [optionGroups]);

  // 구성품(product)이 자기 자신에 달고 있어 주문 시 함께 상속되는 옵션그룹 이름들
  const inheritedOptions = (productId: number | string): BuilderOptionGroup[] => {
    const m = byId.get(String(productId));
    const ids = Array.isArray(m?.optionGroups) ? m!.optionGroups : [];
    return ids.map(id => ogById.get(String(id))).filter(Boolean) as BuilderOptionGroup[];
  };

  const update = (next: SetGroup[]) => onChange(next);
  const patchGroup = (gi: number, patch: Partial<SetGroup>) =>
    update(groups.map((g, i) => (i === gi ? { ...g, ...patch } : g)));

  const addSlot = () =>
    update([...groups, { id: newSlotId(), label: '', type: 'fixed', min: 1, max: 1, items: [] }]);

  const removeSlot = (gi: number) => update(groups.filter((_, i) => i !== gi));

  const toggleItem = (gi: number, productId: number) => {
    const g = groups[gi];
    const exists = (g.items || []).some(it => Number(it.product_id) === productId);
    const items = exists
      ? g.items.filter(it => Number(it.product_id) !== productId)
      : [...(g.items || []), { product_id: productId, qty: 1, upcharge: 0 }];
    // choice max 가 구성품수보다 크면 보정
    const patch: Partial<SetGroup> = { items };
    if (g.type === 'choice') patch.max = Math.min(g.max || 1, items.length || 1);
    patchGroup(gi, patch);
  };

  const setItemField = (gi: number, productId: number, field: 'qty' | 'upcharge', v: number) => {
    const g = groups[gi];
    patchGroup(gi, { items: g.items.map(it => Number(it.product_id) === productId ? { ...it, [field]: v } : it) });
  };

  return (
    <Wrap>
      <IntroHint>
        {t('menu:setBuilder.intro', { defaultValue: 'Build the set from slots. A Fixed slot is always included; a Choice slot lets the customer pick one or more (this OR that). Each product keeps its own options (e.g. spice level) — they appear automatically when ordering, shown below each item.' })}
      </IntroHint>

      {groups.length === 0 && (
        <EmptyHint>{t('menu:setBuilder.empty', { defaultValue: 'Add a slot to build this set (e.g. Main, Choose a soup).' })}</EmptyHint>
      )}

      {groups.map((g, gi) => {
        const q = (search[g.id] || '').toLowerCase();
        const chosenIds = new Set((g.items || []).map(it => Number(it.product_id)));
        const filtered = sellable.filter(m => {
          if (!q) return true;
          return m.name.toLowerCase().includes(q) || (m.code || '').toLowerCase().includes(q);
        });
        return (
          <SlotCard key={g.id}>
            <SlotHead>
              <SlotNameInput
                value={g.label}
                onChange={e => patchGroup(gi, { label: e.target.value })}
                placeholder={t('menu:setBuilder.slotName', { defaultValue: 'Slot name (e.g. Main, Choose a soup)' })}
              />
              <TypeToggle role="group">
                <TypeBtn type="button" $active={g.type === 'fixed'} onClick={() => patchGroup(gi, { type: 'fixed' })}>
                  {t('menu:setBuilder.fixed', { defaultValue: 'Fixed' })}
                </TypeBtn>
                <TypeBtn type="button" $active={g.type === 'choice'} onClick={() => patchGroup(gi, { type: 'choice', min: g.min || 1, max: g.max || 1 })}>
                  {t('menu:setBuilder.choice', { defaultValue: 'Choice' })}
                </TypeBtn>
              </TypeToggle>
              <IconBtn type="button" title={t('menu:setBuilder.removeSlot', { defaultValue: 'Remove slot' })} aria-label="remove slot" onClick={() => removeSlot(gi)}>
                <Trash2 size={18} />
              </IconBtn>
            </SlotHead>

            <TypeExplain>
              {g.type === 'fixed'
                ? t('menu:setBuilder.fixedHint', { defaultValue: 'Fixed — every product below is always included in the set.' })
                : t('menu:setBuilder.choiceHint', { defaultValue: 'Choice — the customer picks from the products below (this OR that). Set how many they choose.' })}
            </TypeExplain>

            {/* 검색창은 선택된 구성품 목록 '위'에 고정 — 추가할 때마다 아래로 밀리지 않게 */}
            <SearchBox>
              <SearchIcon size={16} />
              <SearchInput
                value={search[g.id] || ''}
                onChange={e => setSearch(s => ({ ...s, [g.id]: e.target.value }))}
                placeholder={t('menu:setBuilder.searchProducts', { defaultValue: 'Search products to add…' })}
              />
              {q && (
                <PickList>
                  {filtered.length === 0 ? (
                    <EmptyHint style={{ border: 'none' }}>{t('menu:setBuilder.noMatch', { defaultValue: 'No matching products' })}</EmptyHint>
                  ) : filtered.slice(0, 50).map(m => (
                    <PickRow
                      key={m.id}
                      type="button"
                      $selected={chosenIds.has(Number(m.id))}
                      onClick={() => { toggleItem(gi, Number(m.id)); setSearch(s => ({ ...s, [g.id]: '' })); }}
                    >
                      <PickName>{m.code ? `${m.code} ` : ''}{m.name}</PickName>
                      <PickPrice>{formatCurrency(m.price)}</PickPrice>
                      {chosenIds.has(Number(m.id)) && <span style={{ color: '#635BFF', fontWeight: 600 }}>✓</span>}
                    </PickRow>
                  ))}
                </PickList>
              )}
            </SearchBox>

            {g.type === 'choice' && (g.items || []).length > 0 && (
              <ChoiceRange>
                <SmallLabel>{t('menu:setBuilder.chooseRange', { defaultValue: 'Customer chooses' })}</SmallLabel>
                <SmallLabel>{t('menu:setBuilder.min', { defaultValue: 'min' })}</SmallLabel>
                <RangeSelect value={g.min == null ? 1 : g.min} onChange={e => patchGroup(gi, { min: Math.min(Number(e.target.value), g.max || 1) })}>
                  {Array.from({ length: g.items.length + 1 }, (_, i) => i).map(n => <option key={n} value={n}>{n}</option>)}
                </RangeSelect>
                <SmallLabel>{t('menu:setBuilder.max', { defaultValue: 'max' })}</SmallLabel>
                <RangeSelect value={g.max || 1} onChange={e => patchGroup(gi, { max: Math.max(Number(e.target.value), g.min || 1) })}>
                  {Array.from({ length: g.items.length }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                </RangeSelect>
              </ChoiceRange>
            )}

            {(g.items || []).length > 0 && (
              <ChosenList>
                {g.items.map(it => {
                  const m = byId.get(String(it.product_id));
                  const inherited = inheritedOptions(it.product_id);
                  return (
                    <ChosenRow key={it.product_id}>
                      <ChosenTop>
                        <ChosenName>{m ? `${m.code ? m.code + ' ' : ''}${m.name}` : `#${it.product_id}`}</ChosenName>
                        {g.type === 'fixed' ? (
                          <Stepper>
                            <StepBtn type="button" disabled={(it.qty || 1) <= 1} onClick={() => setItemField(gi, Number(it.product_id), 'qty', Math.max(1, (it.qty || 1) - 1))} aria-label="decrease">−</StepBtn>
                            <StepVal>{it.qty || 1}</StepVal>
                            <StepBtn type="button" onClick={() => setItemField(gi, Number(it.product_id), 'qty', (it.qty || 1) + 1)} aria-label="increase">+</StepBtn>
                          </Stepper>
                        ) : (
                          <>
                            <SmallLabel>{t('menu:setBuilder.upcharge', { defaultValue: 'Extra' })}</SmallLabel>
                            <UpchargeInput
                              type="text" inputMode="decimal"
                              value={it.upcharge ?? 0}
                              onChange={e => setItemField(gi, Number(it.product_id), 'upcharge', Math.max(0, parseFloat(e.target.value) || 0))}
                              aria-label="upcharge"
                            />
                          </>
                        )}
                        <IconBtn type="button" aria-label="remove item" onClick={() => toggleItem(gi, Number(it.product_id))} style={{ color: '#9CA3AF' }}>
                          <X size={16} />
                        </IconBtn>
                      </ChosenTop>
                      <InheritRow>
                        <InheritLabel>{t('menu:setBuilder.inheritsOptions', { defaultValue: 'Options when ordering:' })}</InheritLabel>
                        {inherited.length > 0 ? (
                          inherited.map(og => (
                            <InheritChip key={og.id}>
                              {og.name}{og.required ? ' *' : ''}
                            </InheritChip>
                          ))
                        ) : (
                          <InheritNone>{t('menu:setBuilder.inheritsNone', { defaultValue: 'none' })}</InheritNone>
                        )}
                      </InheritRow>
                    </ChosenRow>
                  );
                })}
              </ChosenList>
            )}
          </SlotCard>
        );
      })}

      <AddSlotBtn type="button" onClick={addSlot}>
        {t('menu:setBuilder.addSlot', { defaultValue: 'Add Slot' })}
      </AddSlotBtn>
    </Wrap>
  );
};

export default SetMenuBuilder;
