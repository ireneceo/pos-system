import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal } from '../UI';
import { isSetSelectionValid } from '../../utils/setMenu';
import { getAuthToken } from '../../utils/auth';

// POS 세트 주문 모달 — v2 세트(set_groups)를 POS 에서 주문. 터치 전용.
// 가격은 상위(POSTerminal)의 기존 계산(base + selectedOptions)에 태우기 위해
// upcharge/구성품옵션을 priced selectedOptions 로 변환해 반환한다 → POS 가격식 무수정.

export interface POSSetResult {
  setComponents: any[];
  selectedOptions: { name: string; price: number }[];
  optionsDisplay: string[];
  setLevelOptions: string[];   // 세트 자체 옵션(A) — 선택된 옵션 이름
}

interface Props {
  isOpen: boolean;
  product: { id: any; name: string; price: number } | null;
  restaurantId: string | number;
  formatCurrency: (v: number) => string;
  onClose: () => void;
  onConfirm: (qty: number, result: POSSetResult) => void;
}

const Body = styled.div`max-height: 60vh; overflow-y: auto; padding: 4px 2px;`;
const Footer = styled.div`display: flex; gap: 10px; align-items: center; margin-top: 12px;`;
const Stepper = styled.div`display: inline-flex; align-items: center; gap: 6px;`;
const StepBtn = styled.button`
  width: 44px; height: 44px; border: 1px solid #E6EBF1; border-radius: 8px; background: #FFF;
  font-size: 20px; cursor: pointer; &:disabled { opacity: 0.5; }
`;
const QtyVal = styled.span`min-width: 28px; text-align: center; font-weight: 600;`;
const AddBtn = styled.button`
  flex: 1; height: 48px; border: none; border-radius: 10px; background: #635BFF; color: #FFF;
  font-size: 15px; font-weight: 600; cursor: pointer;
  &:disabled { background: #C7CED6; cursor: not-allowed; }
`;
const Loading = styled.div`padding: 30px; text-align: center; color: #6B7C93;`;

// 구성품(B) 슬롯 렌더 — POS 자체 스타일(옵션팝업과 동일 톤). MobileSetOrder 의존 제거.
const GroupSection = styled.div`margin-bottom: 16px;`;
const GroupHead = styled.div`display: flex; align-items: center; gap: 8px; margin-bottom: 8px;`;
const GroupLabel = styled.div`font-size: 14px; font-weight: 700; color: #0A2540;`;
const ChooseHint = styled.span`
  font-size: 11px; font-weight: 600; color: #635BFF;
  background: #F0EFFF; border-radius: 999px; padding: 2px 10px;
`;
const FixedRow = styled.div`
  min-height: 40px; padding: 8px 14px; margin-bottom: 6px;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  border: 1px solid #E6EBF1; border-radius: 8px; background: #F7F9FC; color: #0A2540; font-size: 13px;
`;
const PickRow = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const PickBtn = styled.button<{ $sel: boolean; $disabled?: boolean }>`
  min-height: 40px; padding: 0 14px; border-radius: 8px; font-size: 13px; cursor: pointer;
  border: 1px solid ${p => (p.$sel ? '#635BFF' : '#E6EBF1')};
  background: ${p => (p.$sel ? '#F0EFFF' : '#FFF')};
  color: ${p => (p.$sel ? '#635BFF' : '#0A2540')};
  font-weight: ${p => (p.$sel ? 600 : 400)};
  opacity: ${p => (p.$disabled ? 0.5 : 1)};
`;
const InhWrap = styled.div`margin: 6px 0 4px 12px; padding-left: 12px; border-left: 2px solid #EEF1F6;`;
const InhTitle = styled.div`font-size: 12px; font-weight: 600; color: #6B7C93; margin-bottom: 6px;`;
const SoldTag = styled.span`font-size: 11px; font-weight: 600; color: #FF6B6B;`;

// 세트 자체 옵션(A) 섹션 — 구성품과 별개로 세트 전체에 적용되는 옵션
const SetOptSection = styled.div`
  margin-top: 14px; padding-top: 12px; border-top: 1px dashed #E6EBF1;
`;
const SetOptHead = styled.div`font-size: 13px; font-weight: 700; color: #0A2540; margin-bottom: 8px;`;
const SetOptGroup = styled.div`margin-bottom: 12px;`;
const SetOptLabel = styled.div`font-size: 12px; color: #6B7C93; margin-bottom: 6px;`;
const SetOptRow = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const SetOptBtn = styled.button<{ $sel: boolean }>`
  min-height: 40px; padding: 0 14px; border-radius: 8px; cursor: pointer; font-size: 13px;
  border: 1px solid ${p => p.$sel ? '#635BFF' : '#E6EBF1'};
  background: ${p => p.$sel ? '#F0EFFF' : '#FFF'};
  color: ${p => p.$sel ? '#635BFF' : '#0A2540'};
  font-weight: ${p => p.$sel ? 600 : 400};
`;

const POSSetModal: React.FC<Props> = ({ isOpen, product, restaurantId, formatCurrency, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [resolved, setResolved] = useState<any[]>([]);
  const [setOptionGroups, setSetOptionGroups] = useState<any[]>([]);  // 세트 자체 옵션(A)
  const [setLevelSel, setSetLevelSel] = useState<string[]>([]);       // 선택된 A 옵션 id
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState<Record<string, number[]>>({});
  const [opts, setOpts] = useState<Record<string, string[]>>({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!isOpen || !product) return;
    setQty(1); setOpts({}); setSetLevelSel([]);
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/menu/product/${product.id}?restaurantId=${restaurantId}`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` }
        });
        const j = await res.json();
        const groups = (j.data && j.data.set_groups_resolved) || [];
        setResolved(groups);
        setSetOptionGroups((j.data && j.data.set_option_groups) || []);
        const init: Record<string, number[]> = {};
        groups.forEach((g: any) => { init[g.id] = g.type === 'fixed' ? (g.items || []).map((it: any) => Number(it.product_id)) : []; });
        setSel(init);
      } catch { setResolved([]); setSetOptionGroups([]); }
      finally { setLoading(false); }
    })();
    // ⚠ product 는 부모에서 인라인 객체로 넘어와 매 렌더 새 참조 → product 전체를 deps 에 넣으면
    // POS poller 가 부모를 리렌더할 때마다 이 effect 가 재실행돼 선택(구성품/옵션)이 초기화된다
    // ("옵션 누르면 다시 닫힘"). product.id 로만 고정해 같은 세트면 재fetch/리셋 안 함.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, product?.id, restaurantId]);

  // 세트 자체 옵션(A) 토글 — 단일/다중 + 필수 처리
  const toggleSetLevelOption = (optionId: string, groupId: string, multiple: boolean, required: boolean) => {
    setSetLevelSel(prev => {
      if (multiple) return prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId];
      const og = setOptionGroups.find((g: any) => String(g.id) === String(groupId));
      const ids = (og?.options || []).map((o: any) => String(o.id));
      const isSel = prev.includes(optionId);
      if (isSel && !required) return prev.filter(id => !ids.includes(id));
      return [...prev.filter(id => !ids.includes(id)), optionId];
    });
  };

  const included = useMemo(() => {
    const out: { group: any; it: any }[] = [];
    resolved.forEach((g: any) => {
      const picks = g.type === 'fixed' ? (g.items || []) : (g.items || []).filter((it: any) => (sel[g.id] || []).includes(Number(it.product_id)));
      picks.forEach((it: any) => out.push({ group: g, it }));
    });
    return out;
  }, [resolved, sel]);

  const toggleComponent = (groupId: string, productId: number, _type: 'fixed' | 'choice', max: number) => {
    setSel(prev => {
      const cur = prev[groupId] || [];
      const has = cur.includes(productId);
      let next: number[];
      if (has) next = cur.filter(id => id !== productId);
      else if (max <= 1) next = [productId];
      else next = cur.length >= max ? cur : [...cur, productId];
      return { ...prev, [groupId]: next };
    });
  };

  const toggleOption = (groupId: string, productId: number, optionId: string, multiple: boolean, required: boolean) => {
    const k = `${groupId}:${productId}`;
    setOpts(prev => {
      const cur = prev[k] || [];
      if (multiple) return { ...prev, [k]: cur.includes(optionId) ? cur.filter(id => id !== optionId) : [...cur, optionId] };
      const grp = resolved.find((g: any) => g.id === groupId);
      const it = grp?.items?.find((x: any) => Number(x.product_id) === productId);
      const og = (it?.optionGroups || []).find((o: any) => o.options.some((opt: any) => String(opt.id) === optionId));
      const ids = (og?.options || []).map((o: any) => String(o.id));
      const isSel = cur.includes(optionId);
      if (isSel && !required) return { ...prev, [k]: cur.filter(id => !ids.includes(id)) };
      return { ...prev, [k]: [...cur.filter(id => !ids.includes(id)), optionId] };
    });
  };

  const valid = (() => {
    if (resolved.length === 0) return false;
    if (included.some(({ it }) => it.soldOut)) return false;
    const requiredOk = (c: any) => {
      const grp = resolved.find((g: any) => g.id === c.group_id);
      const it = grp?.items?.find((x: any) => Number(x.product_id) === Number(c.product_id));
      const s = opts[`${c.group_id}:${c.product_id}`] || [];
      return (it?.optionGroups || []).filter((og: any) => og.required).every((og: any) => og.options.some((o: any) => s.includes(String(o.id))));
    };
    const selected = included.map(({ group, it }) => ({ group_id: group.id, product_id: Number(it.product_id) }));
    if (!isSetSelectionValid(resolved as any, selected as any, requiredOk as any)) return false;
    // 세트 자체 옵션(A) 의 필수 그룹도 충족돼야 함
    const setLevelOk = setOptionGroups.filter((g: any) => g.required)
      .every((g: any) => (g.options || []).some((o: any) => setLevelSel.includes(String(o.id))));
    return setLevelOk;
  })();

  const buildResult = (): POSSetResult => {
    const setComponents: any[] = [];
    const selectedOptions: { name: string; price: number }[] = [];
    const optionsDisplay: string[] = [];
    included.forEach(({ group, it }) => {
      const s = opts[`${group.id}:${it.product_id}`] || [];
      const chosenOpts = (it.optionGroups || []).flatMap((og: any) => og.options).filter((o: any) => s.includes(String(o.id)));
      const optNames = chosenOpts.map((o: any) => o.name);
      setComponents.push({ group_id: group.id, group_label: group.label, product_id: Number(it.product_id), name: it.name, qty: it.qty || 1, upcharge: Number(it.upcharge) || 0, options: optNames });
      // upcharge → priced selectedOption (POS 가격식이 합산)
      if (Number(it.upcharge) > 0) selectedOptions.push({ name: it.name, price: Number(it.upcharge) });
      chosenOpts.forEach((o: any) => { if (Number(o.price) > 0) selectedOptions.push({ name: o.name, price: Number(o.price) }); });
      optionsDisplay.push(`${it.name}${optNames.length ? ` (${optNames.join(', ')})` : ''}`);
    });
    // 세트 자체 옵션(A) — 이름 수집 + 가격은 selectedOptions 로 합산
    const setLevelOptions: string[] = [];
    setOptionGroups.forEach((g: any) => {
      (g.options || []).forEach((o: any) => {
        if (setLevelSel.includes(String(o.id))) {
          setLevelOptions.push(o.name);
          if (Number(o.price) > 0) selectedOptions.push({ name: o.name, price: Number(o.price) });
        }
      });
    });
    return { setComponents, selectedOptions, optionsDisplay, setLevelOptions };
  };

  const unitTotal = (() => {
    let t2 = product?.price || 0;
    buildResult().selectedOptions.forEach(o => { t2 += o.price; });
    return t2;
  })();

  if (!isOpen || !product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name} size="medium">
      {loading ? (
        <Loading>{t('common:loading', { defaultValue: 'Loading…' })}</Loading>
      ) : (
        <>
          <Body>
            {resolved.map((g: any) => {
              const min = g.min == null ? 1 : g.min;
              const max = g.max == null ? 1 : g.max;
              const chosen = sel[g.id] || [];
              const renderInherited = (it: any) => {
                const ogs = it.optionGroups || [];
                if (!ogs.length) return null;
                const k = `${g.id}:${it.product_id}`;
                const s = opts[k] || [];
                return (
                  <InhWrap>
                    {ogs.map((og: any) => (
                      <div key={og.id} style={{ marginBottom: 8 }}>
                        <InhTitle>{og.name}{og.required ? ' *' : ''}</InhTitle>
                        <PickRow>
                          {(og.options || []).map((o: any) => (
                            <PickBtn
                              key={o.id}
                              type="button"
                              $sel={s.includes(String(o.id))}
                              onClick={() => toggleOption(g.id, Number(it.product_id), String(o.id), !!og.multiple, !!og.required)}
                            >
                              {o.name}{Number(o.price) > 0 ? ` +${formatCurrency(Number(o.price))}` : ''}
                            </PickBtn>
                          ))}
                        </PickRow>
                      </div>
                    ))}
                  </InhWrap>
                );
              };
              return (
                <GroupSection key={g.id}>
                  <GroupHead>
                    <GroupLabel>{g.label || t('menu:setOrder.choose', { defaultValue: 'Choose' })}</GroupLabel>
                    {g.type === 'choice' && (
                      <ChooseHint>{min === max ? `Choose ${max}` : `Choose ${min}-${max}`}</ChooseHint>
                    )}
                  </GroupHead>
                  {g.type === 'fixed'
                    ? (g.items || []).map((it: any) => (
                        <div key={it.product_id}>
                          <FixedRow>
                            <span>{it.name}{it.qty && it.qty > 1 ? ` ×${it.qty}` : ''}</span>
                            {it.soldOut && <SoldTag>{t('menu:setOrder.soldOut', { defaultValue: 'SOLD OUT' })}</SoldTag>}
                          </FixedRow>
                          {!it.soldOut && renderInherited(it)}
                        </div>
                      ))
                    : (
                      <>
                        <PickRow>
                          {(g.items || []).map((it: any) => {
                            const selected = chosen.includes(Number(it.product_id));
                            return (
                              <PickBtn
                                key={it.product_id}
                                type="button"
                                $sel={selected}
                                $disabled={it.soldOut}
                                disabled={it.soldOut}
                                onClick={() => toggleComponent(g.id, Number(it.product_id), 'choice', max)}
                              >
                                {it.name}
                                {Number(it.upcharge) > 0 ? ` +${formatCurrency(Number(it.upcharge))}` : ''}
                                {selected ? ' ✓' : ''}
                              </PickBtn>
                            );
                          })}
                        </PickRow>
                        {(g.items || []).filter((it: any) => chosen.includes(Number(it.product_id))).map((it: any) => (
                          <div key={`inh-${it.product_id}`}>{renderInherited(it)}</div>
                        ))}
                      </>
                    )}
                </GroupSection>
              );
            })}
            {setOptionGroups.length > 0 && (
              <SetOptSection>
                <SetOptHead>{t('menu:setOrder.setOptionsTitle', { defaultValue: 'Set options' })}</SetOptHead>
                {setOptionGroups.map((g: any) => (
                  <SetOptGroup key={g.id}>
                    <SetOptLabel>{g.name}{g.required ? ' *' : ''}{g.multiple ? ` · ${t('menu:setOrder.multi', { defaultValue: 'choose multiple' })}` : ''}</SetOptLabel>
                    <SetOptRow>
                      {(g.options || []).map((o: any) => (
                        <SetOptBtn
                          key={o.id}
                          type="button"
                          $sel={setLevelSel.includes(String(o.id))}
                          onClick={() => toggleSetLevelOption(String(o.id), String(g.id), !!g.multiple, !!g.required)}
                        >
                          {o.name}{Number(o.price) > 0 ? ` +${formatCurrency(Number(o.price))}` : ''}
                        </SetOptBtn>
                      ))}
                    </SetOptRow>
                  </SetOptGroup>
                ))}
              </SetOptSection>
            )}
          </Body>
          <Footer>
            <Stepper>
              <StepBtn type="button" disabled={qty <= 1} onClick={() => setQty(q => Math.max(1, q - 1))}>−</StepBtn>
              <QtyVal>{qty}</QtyVal>
              <StepBtn type="button" onClick={() => setQty(q => q + 1)}>+</StepBtn>
            </Stepper>
            <AddBtn type="button" disabled={!valid} onClick={() => onConfirm(qty, buildResult())}>
              {t('menu:setBuilder.addToOrder', { defaultValue: 'Add' })} · {formatCurrency(unitTotal * qty)}
            </AddBtn>
          </Footer>
        </>
      )}
    </Modal>
  );
};

export default POSSetModal;
