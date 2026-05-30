import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal } from '../UI';
import MobileSetOrder from '../../mobile/components/MobileSetOrder';
import { isSetSelectionValid } from '../../utils/setMenu';
import { getAuthToken } from '../../utils/auth';

// POS 세트 주문 모달 — v2 세트(set_groups)를 POS 에서 주문. 터치 전용.
// 가격은 상위(POSTerminal)의 기존 계산(base + selectedOptions)에 태우기 위해
// upcharge/구성품옵션을 priced selectedOptions 로 변환해 반환한다 → POS 가격식 무수정.

export interface POSSetResult {
  setComponents: any[];
  selectedOptions: { name: string; price: number }[];
  optionsDisplay: string[];
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

const POSSetModal: React.FC<Props> = ({ isOpen, product, restaurantId, formatCurrency, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [resolved, setResolved] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState<Record<string, number[]>>({});
  const [opts, setOpts] = useState<Record<string, string[]>>({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!isOpen || !product) return;
    setQty(1); setOpts({});
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/menu/product/${product.id}?restaurantId=${restaurantId}`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` }
        });
        const j = await res.json();
        const groups = (j.data && j.data.set_groups_resolved) || [];
        setResolved(groups);
        const init: Record<string, number[]> = {};
        groups.forEach((g: any) => { init[g.id] = g.type === 'fixed' ? (g.items || []).map((it: any) => Number(it.product_id)) : []; });
        setSel(init);
      } catch { setResolved([]); }
      finally { setLoading(false); }
    })();
  }, [isOpen, product, restaurantId]);

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
    return isSetSelectionValid(resolved as any, selected as any, requiredOk as any);
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
    return { setComponents, selectedOptions, optionsDisplay };
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
            <MobileSetOrder
              groups={resolved as any}
              selections={sel}
              onToggleComponent={toggleComponent}
              componentOptions={opts}
              onToggleOption={toggleOption}
              formatCurrency={formatCurrency}
            />
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
