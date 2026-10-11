import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { KioskCartAside, KioskSplit, KioskMain, useKioskSplit } from '../components/KioskCartAside';
import { KioskActionBar } from '../components/common/KioskLayout';
import { isKioskMode, isMenuBoardMode, withMenuBoardQuery } from '../utils/kioskMode';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { useMenu } from '../../contexts/MenuContext';
import api from '../services/api';
import { formatCurrency } from '../../utils/currency';
import MobileSetOrder from '../components/MobileSetOrder';
import { isSetSelectionValid } from '../../utils/setMenu';
import RecommendationSheet, { RecItem } from '../components/RecommendationSheet';

const ItemHeader = styled.div`
  background: white;
  margin: 0 0 16px 0;
  padding-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

/* 키오스크: 사진은 16:9·최대 42vh, 사진 없으면 160px 상자(Fable D5) — 토큰, 폰은 250px 그대로 */
const ItemImage = styled.div<{ hasImage?: boolean }>`
  width: 100%;
  height: ${props => props.hasImage ? 'var(--mo-detail-img-h, 250px)' : 'var(--mo-detail-noimg-h, 250px)'};
  ${props => props.hasImage ? 'aspect-ratio: var(--mo-detail-img-ratio, auto); max-height: var(--mo-detail-img-max, none);' : ''}
  background: #F1F4F8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.hasImage ? '0' : 'var(--mo-detail-emoji, 120px)'};
  margin-bottom: 16px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  padding: 0 var(--mo-detail-pad, 16px);
`;

const ItemName = styled.h1`
  font-size: var(--mo-detail-name, 24px);
  font-weight: var(--mo-detail-name-weight, 600);
  color: #1F2937;
  margin: 0 0 8px 0;
`;

/* ── 키오스크 «한 화면에 하나씩»(안내형) 상세 — Fable kiosk-two-modes §2 S4~S6. 키오스크 전용 ── */
const GPath = styled.div`font-size: 16px; color: #4B5563; margin: 4px 0 6px;`;
const GTitle = styled.h2`font-size: 28px; font-weight: 700; color: #0A2540; margin: 0 0 6px;`;
const GSub = styled.div`font-size: 16px; color: #4B5563; margin-bottom: 20px;`;
const GGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`;
const GOption = styled.button<{ $on: boolean }>`
  min-height: 112px;
  border-radius: 16px;
  border: 2px solid ${p => (p.$on ? '#635BFF' : '#E5E8EC')};
  background: ${p => (p.$on ? '#F0EFFF' : '#FFFFFF')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;
const GOptionName = styled.span`font-size: 21px; font-weight: 700; color: #0A2540; line-height: 1.25;`;
const GOptionPrice = styled.span`font-size: 16px; color: #4B5563;`;
const GSummary = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E8EC;
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 20px;
`;
const GSummaryLine = styled.div`font-size: 17px; color: #374151; padding: 4px 0;`;
const GTotal = styled.div`font-size: 36px; font-weight: 800; color: #635BFF; margin: 8px 0 0;`;
const GBigButton = styled.button<{ $primary?: boolean }>`
  min-height: 72px;
  border-radius: 16px;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid ${p => (p.$primary ? '#635BFF' : '#C7CED6')};
  background: ${p => (p.$primary ? '#635BFF' : '#FFFFFF')};
  color: ${p => (p.$primary ? '#FFFFFF' : '#0A2540')};
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

/* 한 줄 소개 + 추천 마크 (docs/MENU_CATEGORY_TWO_LEVEL.md ②) — 값이 없으면 아무것도 안 그린다 */
const ItemPitchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: -2px 0 10px 0;
`;

const ItemTagline = styled.span`
  font-size: var(--mo-detail-desc, 14px);
  font-weight: 600;
  color: #374151;
  line-height: 1.4;
`;

const RecommendedMark = styled.span`
  background: #635BFF;
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.3px;
`;

const ItemDescription = styled.p`
  font-size: var(--mo-detail-desc, 14px);
  color: #4B5563;
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--mo-detail-meta, 14px);
  color: #4B5563;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SetMenuSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: var(--mo-section-pad, 16px);
  font-size: var(--mo-opt-font, inherit);
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SetMenuTitle = styled.h3`
  font-size: var(--mo-opt-title, 16px);
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SetMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SetMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
  font-size: var(--mo-opt-font, 14px);
  color: #374151;
`;

const OptionSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: var(--mo-section-pad, 16px);
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const OptionTitle = styled.h3`
  font-size: var(--mo-opt-title, 16px);
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RequiredBadge = styled.span`
  font-size: var(--mo-badge-sm, 12px);
  color: #EF4444;
  font-weight: 500;
  background: #FEE2E2;
  padding: 2px 8px;
  border-radius: 4px;
`;

const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: var(--mo-opt-cols, repeat(auto-fit, minmax(100px, 1fr)));
  gap: var(--mo-opt-gap, 8px);
`;

const RadioButton = styled.button<{ selected?: boolean }>`
  padding: 12px 16px;
  min-height: var(--mo-tap, 44px);
  border-radius: var(--mo-opt-radius, 8px);
  border: ${props => props.selected ? 'var(--mo-opt-sel-border, 1px)' : '1px'} solid ${props => props.selected ? '#635BFF' : '#C7CED6'};
  background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#1F2937'};
  font-size: var(--mo-opt-font, 14px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:active {
    transform: scale(0.98);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  min-height: var(--mo-tap, 44px);
  box-sizing: border-box;
  border: 1px solid #C7CED6;
  border-radius: var(--mo-opt-radius, 8px);
  cursor: pointer;
  transition: all 0.15s;

  &:active {
    background: #F9FAFB;
  }
`;

const CheckboxInput = styled.input`
  width: var(--mo-check, 18px);
  height: var(--mo-check, 18px);
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`;

const CheckboxText = styled.span`
  font-size: var(--mo-opt-font, 14px);
  color: #1F2937;
  margin-left: 10px;
  flex: 1;
`;

const CheckboxPrice = styled.span`
  font-size: var(--mo-opt-price, 12px);
  color: #4B5563;
`;

const QuantitySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: var(--mo-section-pad, 16px);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const QuantityButton = styled.button`
  width: var(--mo-qty-btn, 36px);
  height: var(--mo-qty-btn, 36px);
  border-radius: 50%;
  border: 1px solid #C7CED6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    background: #F1F4F8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: var(--mo-qty-icon, 16px);
    height: var(--mo-qty-icon, 16px);
    color: #4B5563;
  }
`;

const QuantityValue = styled.span`
  font-size: var(--mo-qty-font, 18px);
  font-weight: 600;
  color: #1F2937;
  min-width: 30px;
  text-align: center;
`;

const SpecialInstructions = styled.div`
  background: white;
  border-radius: 12px;
  padding: var(--mo-section-pad, 16px);
  margin-bottom: var(--mo-detail-last-mb, 80px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const InstructionsInput = styled.textarea`
  width: 100%;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  padding: 12px;
  font-size: var(--mo-input-font, 16px); /* iOS zoom 방지 */
  resize: none;
  font-family: inherit;
  box-sizing: border-box;
  min-height: var(--mo-textarea-h, 80px);
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

/* $inBar: 키오스크 — 고정 바가 아니라 본문 칸 안 KioskActionBar(sticky). 가로에선 본문 칸 폭에 저절로 맞는다(Fable D5). */
const AddToCartButton = styled.button<{ $inBar?: boolean }>`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    left: 50%;
    /* right:auto + width:100% 를 같이 줘야 max-width 가 적용된다. */
    right: auto;
    width: 100%;
    transform: translateX(-50%);
    border-radius: 12px;
    bottom: 80px;
  }

  &:active {
    background: #635BFF;
  }

  &:disabled {
    background: #6B7280;
    cursor: not-allowed;
  }
  ${p => p.$inBar && `
    &&& {
      position: static;
      transform: none;
      width: 100%;
      max-width: none;
      min-height: var(--mo-bar-h, 72px);
      border-radius: 14px;
      font-size: var(--mo-bar-font, 20px);
      font-weight: 700;
      box-shadow: 0 8px 24px rgba(99, 91, 255, 0.28);
    }
  `}
`;

const PriceDisplay = styled.span`
  font-size: var(--mo-bar-font, 18px);
`;

const ItemDetailPage: React.FC = () => {
  const kiosk = isKioskMode();
  const splitView = useKioskSplit();
  // 보여주기 전용 메뉴판 — **옵션은 보여 주되 고를 수 없고, 담기도 없다**(2026-09-10 Irene).
  const menuBoard = isMenuBoardMode();
  const { t } = useTranslation(['menu', 'common']);
  // 키오스크 «한 화면에 하나씩»: 메뉴(안내형)에서 들어오면 ?flow=guided. 단계는 ?gs= (번호 | confirm | done) — 뒤로가기 = 한 단계
  const location = useLocation();
  const guided = kiosk && !menuBoard && new URLSearchParams(location.search).get('flow') === 'guided';
  const gsRaw = new URLSearchParams(location.search).get('gs') || '0';
  const { slug, itemId } = useParams<{ slug: string; itemId: string }>();
  const navigate = useNavigate();
  const { addToCart, currency, cartItems } = useMobileOrder();
  // #11c 크로스셀 — 담은 직후 추천 바텀시트
  const [recItems, setRecItems] = useState<RecItem[]>([]);
  const [showRecSheet, setShowRecSheet] = useState(false);
  const { getItemById, optionGroups } = useMenu();
  
  const [item, setItem] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // #1: 담은 직후 상세에 머물며 보여줄 "담음" 피드백 (리스트로 자동 복귀 안 함)
  const [justAdded, setJustAdded] = useState(false);
  // 사진을 못 불러오면(주소 깨짐) 깨진 그림 대신: 키오스크는 사진 칸을 안 그리고, 폰은 아이콘 칸으로(2026-10-11 Irene)
  const [imgFailed, setImgFailed] = useState(false);
  useEffect(() => { setImgFailed(false); }, [itemId]);
  // 세트 선택 상태: groupId -> 선택 product_ids / `${groupId}:${pid}` -> 선택 optionIds
  const [setSel, setSetSel] = useState<Record<string, number[]>>({});
  const [setOpts, setSetOpts] = useState<Record<string, string[]>>({});
  
  useEffect(() => {
    if (!itemId) return;

    const foundItem = getItemById(itemId);
    // 세트는 구성품/상속옵션 resolve 가 필요해 항상 API 상세를 받는다(context 엔 resolved 없음).
    if (foundItem && !foundItem.is_set_menu) {
      setItem(foundItem);
      setIsLoading(false);
    } else {
      // Fetch from API (set resolve 포함, 또는 context 에 없을 때)
      loadItemDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);
  
  const loadItemDetails = async () => {
    if (!itemId) return;

    try {
      // Fetch item details from API
      const response = await api.getItemDetails(itemId);

      // API returns { success: true, data: {...} }
      if (response && response.success && response.data) {
        const itemData = response.data;

        // Transform API data to match component format
        const transformedItem = {
          id: itemData.id,
          name: itemData.name,
          price: parseFloat(itemData.price),
          emoji: itemData.emoji,
          image: itemData.image,
          description: itemData.description || '',
          tagline: itemData.tagline || null,
          is_featured: itemData.is_featured === true,
          preparationTime: itemData.preparationTime || 15,
          calories: itemData.calories || 0,
          isAvailable: itemData.isAvailable !== false,
          optionGroups: itemData.optionGroups || [],
          // 세트 v2 — resolve 된 구성품/상속옵션/품절 (mobile /menu/item/:id 가 첨부)
          is_set_menu: itemData.is_set_menu || false,
          set_groups: itemData.set_groups || null,
          set_groups_resolved: itemData.set_groups_resolved || [],
          set_available: itemData.set_available !== false
        };

        setItem(transformedItem);
      } else {
        console.error('Item not found');
        navigate(-1); // Go back if item not found
      }
    } catch (error) {
      console.error('Error loading item details:', error);
      navigate(-1); // Go back on error
    } finally {
      setIsLoading(false);
    }
  };
  
  // ─── 세트 v2 ───
  const setGroupsResolved: any[] = Array.isArray(item?.set_groups_resolved) ? item.set_groups_resolved : [];
  const isSet = !!item?.is_set_menu && setGroupsResolved.length > 0;

  // 세트 로드 시 선택 초기화: fixed=구성품 자동 포함, choice=빈 선택
  useEffect(() => {
    if (!isSet) return;
    const init: Record<string, number[]> = {};
    setGroupsResolved.forEach((g: any) => {
      init[g.id] = g.type === 'fixed' ? (g.items || []).map((it: any) => Number(it.product_id)) : [];
    });
    setSetSel(init);
    setSetOpts({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id, isSet]);

  // 포함된 구성품 목록 (fixed 전부 + choice 선택분)
  const includedSetComponents = () => {
    const out: { group: any; it: any }[] = [];
    setGroupsResolved.forEach((g: any) => {
      const picks = g.type === 'fixed'
        ? (g.items || [])
        : (g.items || []).filter((it: any) => (setSel[g.id] || []).includes(Number(it.product_id)));
      picks.forEach((it: any) => out.push({ group: g, it }));
    });
    return out;
  };

  const handleToggleSetComponent = (groupId: string, productId: number, _type: 'fixed' | 'choice', max: number) => {
    setSetSel(prev => {
      const cur = prev[groupId] || [];
      const has = cur.includes(productId);
      let next: number[];
      if (has) next = cur.filter(id => id !== productId);
      else if (max <= 1) next = [productId];                 // 라디오
      else next = cur.length >= max ? cur : [...cur, productId]; // 체크(최대 max)
      return { ...prev, [groupId]: next };
    });
    // 선택 해제 시 해당 구성품 옵션도 제거
    setSetOpts(prev => {
      const k = `${groupId}:${productId}`;
      if (prev[k] && !(setSel[groupId] || []).includes(productId)) return prev;
      const { [k]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const handleToggleSetOption = (groupId: string, productId: number, optionId: string, multiple: boolean, required: boolean) => {
    const k = `${groupId}:${productId}`;
    setSetOpts(prev => {
      const cur = prev[k] || [];
      if (multiple) {
        return { ...prev, [k]: cur.includes(optionId) ? cur.filter(id => id !== optionId) : [...cur, optionId] };
      }
      // 단일선택: 같은 그룹 옵션 교체. 그룹 옵션 id 집합 필요 → resolved 에서 찾기
      const grp = setGroupsResolved.find((g: any) => g.id === groupId);
      const item2 = grp?.items?.find((it: any) => Number(it.product_id) === productId);
      const og = (item2?.optionGroups || []).find((o: any) => o.options.some((opt: any) => String(opt.id) === optionId));
      const groupOptIds = (og?.options || []).map((o: any) => String(o.id));
      const isSel = cur.includes(optionId);
      if (isSel && !required) return { ...prev, [k]: cur.filter(id => !groupOptIds.includes(id)) };
      return { ...prev, [k]: [...cur.filter(id => !groupOptIds.includes(id)), optionId] };
    });
  };

  // 세트 유효성: choice min~max 충족 + 포함 구성품의 required 옵션 충족
  const isSetValid = (): boolean => {
    if (!isSet) return true;
    const requiredOk = (c: { group_id: string; product_id: number }) => {
      const grp = setGroupsResolved.find((g: any) => g.id === c.group_id);
      const it = grp?.items?.find((x: any) => Number(x.product_id) === Number(c.product_id));
      const sel = setOpts[`${c.group_id}:${c.product_id}`] || [];
      return (it?.optionGroups || []).filter((og: any) => og.required)
        .every((og: any) => og.options.some((o: any) => sel.includes(String(o.id))));
    };
    const selected = includedSetComponents().map(({ group, it }) => ({ group_id: group.id, product_id: Number(it.product_id) }));
    // soldOut 포함 구성품이 있으면 막기
    if (includedSetComponents().some(({ it }) => it.soldOut)) return false;
    return isSetSelectionValid(setGroupsResolved as any, selected as any, requiredOk as any);
  };

  // 세트 합계 = 세트 기본가 + 포함 구성품 upcharge + 선택 옵션 가격
  const setTotal = (): number => {
    let total = item?.price || 0;
    includedSetComponents().forEach(({ group, it }) => {
      total += Number(it.upcharge) || 0;
      const sel = setOpts[`${group.id}:${it.product_id}`] || [];
      (it.optionGroups || []).forEach((og: any) => og.options.forEach((o: any) => {
        if (sel.includes(String(o.id))) total += Number(o.price) || 0;
      }));
    });
    // 세트 자체 옵션(A) 가격도 합산 (selectedOptions = A 선택)
    availableOptionGroups.forEach((og: any) => (og.options || []).forEach((o: any) => {
      if (selectedOptions.includes(String(o.id))) total += Number(o.price) || 0;
    }));
    return total * quantity;
  };

  // Get available option groups for this item - 메뉴에서 설정한 순서대로 정렬
  // Support both formats: array of IDs or array of objects
  const availableOptionGroups = item?.optionGroups
    ? (Array.isArray(item.optionGroups) && item.optionGroups.length > 0 && typeof item.optionGroups[0] === 'object'
        ? item.optionGroups  // Already full objects from API
        : item.optionGroups
            .map((groupId: string) => optionGroups.find((group: any) => group.id === groupId))
            .filter((group: any): group is NonNullable<typeof group> => group !== undefined))  // IDs to filter with order preserved
    : [];

  const handleOptionToggle = (optionId: string, groupId: string, multiple: boolean, required: boolean) => {
    if (multiple) {
      // 다중 선택 - 토글
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      // 단일 선택
      const group = availableOptionGroups.find((g: any) => g.id === groupId);
      if (group) {
        const groupOptionIds = group.options.map((o: any) => o.id);
        const isCurrentlySelected = selectedOptions.includes(optionId);

        if (isCurrentlySelected && !required) {
          // 이미 선택된 옵션을 다시 클릭 & 필수가 아님 -> 선택 해제
          setSelectedOptions(prev => prev.filter((id: string) => !groupOptionIds.includes(id)));
        } else {
          // 다른 옵션 클릭 또는 필수 옵션 -> 해당 그룹에서 이 옵션만 선택
          setSelectedOptions(prev => [
            ...prev.filter((id: string) => !groupOptionIds.includes(id)),
            optionId
          ]);
        }
      }
    }
  };
  
  const calculateTotal = () => {
    if (!item) return 0;
    if (isSet) return setTotal();   // 세트는 기본가+upcharge+옵션

    let total = item.price * quantity;

    // Add option prices
    selectedOptions.forEach(optionId => {
      const option = availableOptionGroups
        ?.flatMap((g: any) => g.options)
        ?.find((o: any) => o.id === optionId);
      if (option) {
        total += option.price * quantity;
      }
    });

    return total;
  };

  const isValid = () => {
    if (isSet) return isSetValid() && item?.set_available !== false;
    if (!availableOptionGroups.length) return true;

    // Check if all required options are selected
    return availableOptionGroups
      .filter((group: any) => group.required)
      .every((group: any) =>
        selectedOptions.some(optionId =>
          group.options.some((option: any) => option.id === optionId)
        )
      );
  };

  const addingRef = useRef(false);
  const handleAddToCart = () => {
    if (!item || !isValid()) return;
    // Debounce: block a rapid double-tap / re-fire from enqueuing the same item
    // twice (root cause of duplicate kitchen lines). A deliberate re-add after the
    // short window still works (and merges to qty+1 in the cart).
    if (addingRef.current) return;
    addingRef.current = true;
    setTimeout(() => { addingRef.current = false; }, 600);

    // 세트: 구성품 분해(set_components) + 옵션 이름을 카트에 적재
    let setComponents: any[] | undefined;
    if (isSet) {
      setComponents = includedSetComponents().map(({ group, it }) => {
        const sel = setOpts[`${group.id}:${it.product_id}`] || [];
        const optionNames = (it.optionGroups || [])
          .flatMap((og: any) => og.options)
          .filter((o: any) => sel.includes(String(o.id)))
          .map((o: any) => o.name);
        return {
          group_id: group.id,
          group_label: group.label,
          product_id: Number(it.product_id),
          name: it.name,
          qty: it.qty || 1,
          upcharge: Number(it.upcharge) || 0,
          options: optionNames,
        };
      });
    }

    // Create a copy of item with actual option groups instead of IDs
    const itemWithOptions = {
      ...item,
      optionGroups: availableOptionGroups,
      ...(setComponents ? { set_components: setComponents, _setUnitPrice: setTotal() / quantity } : {})
    };

    addToCart(itemWithOptions, quantity, selectedOptions, instructions);
    // 안내형: 담은 뒤 «더 담기 / 결제하기» 화면(S6) — 추천 시트·자동 복귀 대신
    if (guided) { goGuidedStep('done'); return; }
    // 담은 직후: "✓ 담음" 짧게 보여준 뒤 메뉴 리스트로 자동 복귀(추천 있으면 시트 먼저).
    // 막다른 상세페이지에 머물지 않게 해 더블오더(같은 상품 반복 담기)를 막는다.
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
    // 담은 직후 추천 조회. 추천 있으면 바텀시트, 없으면(애드온 OFF/추천 0) 메뉴 리스트로 자동 복귀.
    if (slug && item?.id) fetchAndOpenRecommendations(Number(item.id));
    else returnToListAfterAdd();
  };

  // 담은 뒤 메뉴 리스트로 자동 복귀 — 막다른 상세페이지를 제거해 더블오더를 막는다.
  // 짧은 "✓ 담음" 확인 후 뒤로가기 → 직전 탭(?cat=)/스크롤이 브라우저 히스토리로 정확히 복원(#2).
  const returnToListAfterAdd = () => {
    setTimeout(() => navigate(-1), 550);
  };

  // 담은 상품에 대한 추천 — 그 상품의 추천을 "항상 동일하게" 보여준다. 자기 자신만 제외.
  // (장바구니 필터로 빼지 않음 → 재진입해도 그대로 뜨고, 이미 담은 건 카드에 ✓ 로 표시.)
  const fetchAndOpenRecommendations = async (productId: number) => {
    let opened = false;
    try {
      const res = await fetch(`/api/mobile/${slug}/products/${productId}/recommendations`);
      if (res.ok) {
        const json = await res.json();
        const list: RecItem[] = Array.isArray(json?.data) ? json.data : [];
        const filtered = list.filter(r => r.id !== productId);
        if (filtered.length) { setRecItems(filtered); setShowRecSheet(true); opened = true; }
      }
    } catch { /* 추천 실패는 무시 — 주문 흐름 영향 없음 */ }
    if (!opened) returnToListAfterAdd();   // 추천 없음 → 리스트로 복귀(데드엔드 제거)
  };

  // 추천 카드 탭 = 담기. 세트/옵션은 정확한 구성을 위해 상세로 이동(블라인드 담기 방지).
  // 카드는 사라지지 않고 ✓ 로 바뀐다(시트 비어 메뉴로 튀던 버그 제거). 이동은 명시적 닫기/장바구니로만.
  const handleAddRecommended = (rec: RecItem) => {
    if (rec.is_set_menu) {
      setShowRecSheet(false);
      navigate(withMenuBoardQuery(`/mobile/${slug}/item/${rec.id}`));
      return;
    }
    const recMenuItem: any = { id: rec.id, name: rec.name, price: typeof rec.price === 'number' ? rec.price : parseFloat(String(rec.price)) || 0, image: rec.image || undefined, emoji: rec.emoji || undefined, is_set_menu: false };
    addToCart(recMenuItem, 1, []);   // 동일구성 자동 머지(qty+1) — 카드의 ✓ 는 cartItems 에서 파생
  };

  // ── 안내형 단계 ── (같은 선택 상태·같은 계산을 쓰고, 화면만 묶음 하나씩)
  function goGuidedStep(step: string, replace = false) {
    const u = new URLSearchParams(window.location.search);
    if (step === '0') u.delete('gs'); else u.set('gs', step);
    navigate({ pathname: location.pathname, search: `?${u.toString()}` }, { replace });
  }
  // 새로고침 등으로 중간 단계에 바로 들어오면(고른 것이 없으니) 첫 단계로
  useEffect(() => {
    if (guided && gsRaw !== '0') goGuidedStep('0', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 필수 단일인데 고를 수 있는 게 하나뿐이면 미리 고른다(그 단계는 건너뜀 — 확인 화면 요약엔 보임)
  useEffect(() => {
    if (!guided || !item) return;
    const auto: string[] = [];
    availableOptionGroups.forEach((g: any) => {
      const open = (g.options || []).filter((o: any) => !o.sold_out);
      if (g.required && !g.multiple && open.length === 1) auto.push(open[0].id);
    });
    if (auto.length) setSelectedOptions(prev => Array.from(new Set([...prev, ...auto])));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guided, item?.id]);
  
  if (isLoading) {
    return (
      <MobileLayout title="Loading..." showBack onBack={() => navigate(-1)}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          Loading item details...
        </div>
      </MobileLayout>
    );
  }
  
  if (!item) {
    return (
      <MobileLayout title="Item Not Found" showBack onBack={() => navigate(-1)}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          This item could not be found.
        </div>
      </MobileLayout>
    );
  }
  
  if (guided) {
    type GOpt = { id: string; name: string; price: number; soldOut: boolean };
    type GStep = { key: string; title: string; sub?: string; multiple: boolean; min: number; max: number; options: GOpt[];
      isSel: (id: string) => boolean; toggle: (id: string) => void; clear: () => void; count: () => number };
    const steps: GStep[] = [];
    if (isSet) {
      setGroupsResolved.forEach((g: any) => {
        if (g.type === 'choice') {
          const min = g.min == null ? 1 : Number(g.min);
          const max = g.max == null ? 1 : Number(g.max);
          steps.push({
            key: `sc:${g.id}`, title: g.label || t('menu:guided.chooseOne', 'Choose'), multiple: max > 1, min, max,
            sub: max > 1 ? t('menu:guided.pickUpTo', { n: max, defaultValue: 'Pick up to {{n}}' }) : undefined,
            options: (g.items || []).map((it: any) => ({ id: String(it.product_id), name: it.name, price: Number(it.upcharge) || 0, soldOut: !!it.soldOut })),
            isSel: (id) => (setSel[g.id] || []).includes(Number(id)),
            toggle: (id) => handleToggleSetComponent(g.id, Number(id), 'choice', max),
            clear: () => (setSel[g.id] || []).forEach(pid => handleToggleSetComponent(g.id, pid, 'choice', max)),
            count: () => (setSel[g.id] || []).length,
          });
        }
        const picks = g.type === 'fixed' ? (g.items || []) : (g.items || []).filter((it: any) => (setSel[g.id] || []).includes(Number(it.product_id)));
        picks.forEach((it: any) => (it.optionGroups || []).forEach((og: any) => {
          const k = `${g.id}:${it.product_id}`;
          const ids = (og.options || []).map((o: any) => String(o.id));
          steps.push({
            key: `so:${k}:${og.id}`, title: `${it.name} — ${og.name}`, multiple: !!og.multiple, min: og.required ? 1 : 0, max: og.multiple ? 99 : 1,
            options: (og.options || []).map((o: any) => ({ id: String(o.id), name: o.name, price: Number(o.price) || 0, soldOut: !!o.sold_out })),
            isSel: (id) => (setOpts[k] || []).includes(id),
            toggle: (id) => handleToggleSetOption(g.id, Number(it.product_id), id, !!og.multiple, !!og.required),
            clear: () => (setOpts[k] || []).filter(x => ids.includes(x)).forEach(x => handleToggleSetOption(g.id, Number(it.product_id), x, true, false)),
            count: () => (setOpts[k] || []).filter(x => ids.includes(x)).length,
          });
        }));
      });
    }
    availableOptionGroups.forEach((g: any) => {
      const open = (g.options || []).filter((o: any) => !o.sold_out);
      if (g.required && !g.multiple && open.length === 1) return; // 미리 골라 둔 단계(위 효과) — 건너뜀
      const ids = (g.options || []).map((o: any) => String(o.id));
      steps.push({
        key: `o:${g.id}`, title: g.name, multiple: !!g.multiple, min: g.required ? 1 : 0, max: g.multiple ? 99 : 1,
        options: (g.options || []).map((o: any) => ({ id: String(o.id), name: o.name, price: Number(o.price) || 0, soldOut: !!o.sold_out })),
        isSel: (id) => selectedOptions.some(x => String(x) === id),
        toggle: (id) => {
          const raw = (g.options || []).find((o: any) => String(o.id) === id)?.id ?? id;
          handleOptionToggle(raw, g.id, !!g.multiple, !!g.required);
        },
        clear: () => setSelectedOptions(prev => prev.filter(x => !ids.includes(String(x)))),
        count: () => selectedOptions.filter(x => ids.includes(String(x))).length,
      });
    });

    const stepNo = gsRaw === 'confirm' || gsRaw === 'done' ? -1 : Math.max(0, parseInt(gsRaw, 10) || 0);
    const atConfirm = gsRaw === 'confirm' || (stepNo >= steps.length && gsRaw !== 'done');
    const next = (i: number) => goGuidedStep(i + 1 < steps.length ? String(i + 1) : 'confirm');
    const priceText = (v: number) => (v > 0 ? `+${formatCurrency(v, currency)}` : '');

    let body: React.ReactNode;
    let bar: React.ReactNode = null;
    if (gsRaw === 'done') {
      body = (
        <div style={{ textAlign: 'center', padding: '48px 0 24px' }}>
          <GTitle>✓ {t('itemDetail.addedToCart', 'Added to Cart')}</GTitle>
          <GSub>{item.name} × {quantity}</GSub>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, maxWidth: 720, margin: '24px auto 0' }}>
            <GBigButton type="button" onClick={() => navigate(`/mobile/${slug}/menu`)}>{t('menu:guided.addMore', 'Add more')}</GBigButton>
            <GBigButton type="button" $primary onClick={() => navigate(`/mobile/${slug}/payment`)}>{t('menu:guided.checkout', 'Checkout')}</GBigButton>
          </div>
        </div>
      );
    } else if (atConfirm) {
      const lines: string[] = [];
      if (isSet) includedSetComponents().forEach(({ group, it }) => {
        const sel = setOpts[`${group.id}:${it.product_id}`] || [];
        const names = (it.optionGroups || []).flatMap((og: any) => og.options).filter((o: any) => sel.includes(String(o.id))).map((o: any) => o.name);
        lines.push(`${it.name}${names.length ? ` (${names.join(', ')})` : ''}`);
      });
      availableOptionGroups.forEach((g: any) => (g.options || []).forEach((o: any) => {
        if (selectedOptions.includes(o.id)) lines.push(`${g.name}: ${o.name}`);
      }));
      body = (
        <>
          <GPath>{item.name}</GPath>
          <GTitle>{t('menu:guided.confirmTitle', 'Check your choice')}</GTitle>
          <GSub>{t('menu:guided.confirmHint', 'Set the quantity and add to your order.')}</GSub>
          <GSummary>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              {item.image && !imgFailed && (
                <img src={item.image} alt={item.name} onError={() => setImgFailed(true)} style={{ width: 160, height: 120, objectFit: 'cover', borderRadius: 12 }} />
              )}
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#0A2540' }}>{item.name}</div>
                {item.tagline && <div style={{ fontSize: 16, color: '#4B5563', marginTop: 4 }}>{item.tagline}</div>}
                {lines.map((l, i) => <GSummaryLine key={i}>· {l}</GSummaryLine>)}
              </div>
            </div>
          </GSummary>
          <QuantitySection>
            <div style={{ fontSize: 'var(--mo-opt-title, 16px)', fontWeight: 600, color: '#1F2937' }}>{t('itemDetail.quantity', 'Quantity')}</div>
            <QuantityControl>
              <QuantityButton onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} aria-label="-">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </QuantityButton>
              <QuantityValue>{quantity}</QuantityValue>
              <QuantityButton onClick={() => setQuantity(quantity + 1)} aria-label="+">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </QuantityButton>
            </QuantityControl>
          </QuantitySection>
          <details style={{ margin: '8px 0 16px' }}>
            <summary style={{ fontSize: 16, color: '#4B5563', cursor: 'pointer' }}>{t('itemDetail.specialInstructions', 'Special Instructions')}</summary>
            <InstructionsInput rows={2} placeholder={t('itemDetail.specialPlaceholder', 'Any special requests? (optional)')}
              value={instructions} onChange={(e) => setInstructions(e.target.value)} style={{ marginTop: 8 }} />
          </details>
          <div style={{ fontSize: 16, color: '#4B5563' }}>{t('menu:guided.total', 'Total')}</div>
          <GTotal>{formatCurrency(calculateTotal(), currency)}</GTotal>
        </>
      );
      bar = (
        <KioskActionBar>
          <GBigButton type="button" $primary style={{ width: '100%' }} disabled={!isValid()} onClick={handleAddToCart}>
            {t('itemDetail.addToCart', 'Add to Cart')} · {formatCurrency(calculateTotal(), currency)}
          </GBigButton>
        </KioskActionBar>
      );
    } else {
      const st = steps[stepNo];
      const optional = st.min === 0;
      const choose = (o: GOpt) => {
        if (o.soldOut) return;
        if (st.multiple) { st.toggle(o.id); return; }
        if (!st.isSel(o.id)) st.toggle(o.id);   // 단일: 고르고 바로 다음(이미 고른 걸 다시 눌러도 다음)
        setTimeout(() => next(stepNo), 160);
      };
      body = (
        <>
          <GPath>{item.name} · {t('menu:guided.stepOf', { n: stepNo + 1, total: steps.length, defaultValue: 'Step {{n}} of {{total}}' })}</GPath>
          <GTitle>{st.title}</GTitle>
          <GSub>{st.sub || (st.multiple
            ? t('menu:guided.pickAny', 'Pick any, then tap Next')
            : optional ? t('menu:guided.pickOptional', 'Optional — pick one or tap None') : t('menu:guided.pickOne', 'Pick one'))}</GSub>
          <GGrid>
            {optional && !st.multiple && (
              <GOption type="button" $on={st.count() === 0} onClick={() => { st.clear(); setTimeout(() => next(stepNo), 160); }}>
                <GOptionName>{t('menu:guided.none', 'None')}</GOptionName>
              </GOption>
            )}
            {st.options.map(o => (
              <GOption key={o.id} type="button" $on={st.isSel(o.id)} disabled={o.soldOut} onClick={() => choose(o)}>
                <GOptionName>{o.name}</GOptionName>
                <GOptionPrice>{o.soldOut ? t('itemDetail.soldOut', { defaultValue: 'Sold out' }) : priceText(o.price)}</GOptionPrice>
              </GOption>
            ))}
          </GGrid>
        </>
      );
      if (st.multiple) {
        bar = (
          <KioskActionBar>
            <GBigButton type="button" $primary style={{ width: '100%' }} disabled={st.count() < st.min} onClick={() => next(stepNo)}>
              {st.count() === 0 && optional ? t('menu:guided.skip', 'Skip') : t('menu:guided.next', 'Next')}
            </GBigButton>
          </KioskActionBar>
        );
      }
    }
    return (
      <MobileLayout title={item.code ? `${item.code} ${item.name}` : item.name} showBack={gsRaw !== 'done'} onBack={() => navigate(-1)}>
        {body}
        {bar}
      </MobileLayout>
    );
  }

  const renderAddButton = (inBar: boolean) => (
    <AddToCartButton $inBar={inBar}
        onClick={handleAddToCart}
        disabled={!isValid()}
        style={justAdded ? { background: '#10B981' } : undefined}
      >
        {justAdded ? (
          <span>✓ {t('itemDetail.addedToCart', 'Added to Cart')}</span>
        ) : (
          <>
            <span>{t('itemDetail.addToCart', 'Add to Cart')}</span>
            <PriceDisplay>{formatCurrency(calculateTotal(), currency)}</PriceDisplay>
          </>
        )}
      </AddToCartButton>
  );

  return (
    <MobileLayout title={item.code ? `${item.code} ${item.name}` : item.name} showBack onBack={() => navigate(-1)}>
      {/* 키오스크 넓은 화면: 오른쪽 장바구니를 메뉴 화면과 같은 자리에 그대로 둔다(2026-10-07 Irene) */}
      <KioskSplit $split={splitView}>
      <KioskMain>
      <ItemHeader style={kiosk && !(item.image && !imgFailed) ? { paddingTop: 20 } : undefined}>
        {/* 키오스크 상세: 사진이 없으면 사진 칸을 그리지 않는다 — 빈 회색 상자가 «깨진 것» 처럼 보였다(2026-10-11 Irene «사진 없으면 아무것도 안나오면 되는 거지?») */}
        {(!kiosk || (item.image && !imgFailed)) && (
        <ItemImage hasImage={!!item.image && !imgFailed}>
          {item.image && !imgFailed ? (
            <img src={item.image} alt={item.name} onError={() => setImgFailed(true)} />
          ) : (
            item.emoji
          )}
        </ItemImage>
        )}
        <ItemInfo>
          <ItemName>{item.code ? `${item.code} ` : ''}{item.name}</ItemName>
          {(item.is_featured || item.tagline) && (
            <ItemPitchRow>
              {item.is_featured && <RecommendedMark>{t('menu:recommended', 'Recommended')}</RecommendedMark>}
              {item.tagline && <ItemTagline>{item.tagline}</ItemTagline>}
            </ItemPitchRow>
          )}
          <ItemDescription>{item.description}</ItemDescription>
          <ItemDetails>
            {item.calories && (
              <DetailItem>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 2 11 2C11 6.41828 14.5817 10 19 10V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item.calories} cal
              </DetailItem>
            )}
          </ItemDetails>
        </ItemInfo>
      </ItemHeader>

      {/* 세트 v2 — fixed 자동 + choice 피커 + 구성품별 상속옵션 */}
      {isSet && (
        <SetMenuSection>
          <MobileSetOrder
            groups={setGroupsResolved as any}
            selections={setSel}
            onToggleComponent={handleToggleSetComponent}
            componentOptions={setOpts}
            onToggleOption={handleToggleSetOption}
            formatCurrency={(v: number) => formatCurrency(v, currency)}
          />
        </SetMenuSection>
      )}

      {/* 레거시 세트(set_items, resolve 없음) 폴백 표시 */}
      {!isSet && item.is_set_menu && item.set_items && item.set_items.length > 0 && (
        <SetMenuSection>
          <SetMenuTitle>{t('itemDetail.setIncludes', 'This set includes:')}</SetMenuTitle>
          <SetMenuItems>
            {item.set_items.map((setItem: any, index: number) => (
              <SetMenuItem key={index}>• {setItem.name} x{setItem.quantity}</SetMenuItem>
            ))}
          </SetMenuItems>
        </SetMenuSection>
      )}

      {availableOptionGroups?.map((group: any) => (
        <OptionSection key={group.id}>
          <OptionTitle>
            {group.name}
            {group.required && <RequiredBadge>{t('itemDetail.required', 'Required')}</RequiredBadge>}
          </OptionTitle>

          {!group.multiple ? (
            <RadioGroup>
              {group.options.map((option: any) => {
                const so = !!option.sold_out; // 2026-06-28 (2-1) 품절 옵션 — 손님 선택 불가
                return (
                <RadioButton
                  key={option.id}
                  selected={selectedOptions.includes(option.id)}
                  onClick={() => { if (so) return; handleOptionToggle(option.id, group.id, group.multiple, group.required); }}
                  style={so ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                >
                  <div style={so ? { textDecoration: 'line-through' } : undefined}>{option.name}</div>
                  {so ? (
                    <div style={{ fontSize: 'var(--mo-opt-price-sm, 11px)', fontWeight: 700, color: '#DC2626', marginTop: '2px' }}>{t('itemDetail.soldOut', { defaultValue: 'Sold out' })}</div>
                  ) : option.price > 0 && (
                    <div style={{ fontSize: 'var(--mo-opt-price, 12px)', color: '#4B5563', marginTop: '2px' }}>
                      +{formatCurrency(option.price, currency)}
                    </div>
                  )}
                </RadioButton>
                );
              })}
            </RadioGroup>
          ) : (
            <CheckboxGroup>
              {group.options.map((option: any) => {
                const so = !!option.sold_out; // 2026-06-28 (2-1) 품절 옵션 — 손님 선택 불가
                return (
                <CheckboxLabel key={option.id} style={so ? { opacity: 0.6 } : undefined}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckboxInput
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      disabled={so}
                      disabled={menuBoard}
                      onChange={() => { if (menuBoard || so) return; handleOptionToggle(option.id, group.id, group.multiple, group.required); }}
                    />
                    <CheckboxText style={so ? { textDecoration: 'line-through' } : undefined}>{option.name}</CheckboxText>
                  </div>
                  {so ? (
                    <CheckboxPrice style={{ color: '#DC2626', fontWeight: 700 }}>{t('itemDetail.soldOut', { defaultValue: 'Sold out' })}</CheckboxPrice>
                  ) : option.price > 0 && (
                    <CheckboxPrice>+{formatCurrency(option.price, currency)}</CheckboxPrice>
                  )}
                </CheckboxLabel>
                );
              })}
            </CheckboxGroup>
          )}
        </OptionSection>
      ))}
      
      <QuantitySection>
        <div style={{ fontSize: 'var(--mo-opt-title, 16px)', fontWeight: 600, color: '#1F2937' }}>
          {t('itemDetail.quantity', 'Quantity')}
        </div>
        <QuantityControl>
          <QuantityButton 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </QuantityButton>
          <QuantityValue>{quantity}</QuantityValue>
          <QuantityButton onClick={() => setQuantity(quantity + 1)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </QuantityButton>
        </QuantityControl>
      </QuantitySection>
      
      <SpecialInstructions>
        <div style={{ fontSize: 'var(--mo-opt-title, 16px)', fontWeight: 600, color: '#1F2937', marginBottom: '8px' }}>
          {t('itemDetail.specialInstructions', 'Special Instructions')}
        </div>
        <InstructionsInput
          rows={3}
          placeholder={t('itemDetail.specialPlaceholder', 'Any special requests? (optional)')}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </SpecialInstructions>
      {!menuBoard && kiosk && <KioskActionBar>{renderAddButton(true)}</KioskActionBar>}
      </KioskMain>
      {!menuBoard && splitView && <KioskCartAside />}
      </KioskSplit>

      {/* 폰: 화면 아래 고정 바 — 키오스크는 위 KioskMain 안 KioskActionBar */}
      {!menuBoard && !kiosk && renderAddButton(false)}

      {/* #11c 크로스셀 — 담은 직후 추천 바텀시트 */}
      <RecommendationSheet
        isOpen={showRecSheet}
        items={recItems}
        currency={currency}
        cartCount={(cartItems || []).reduce((s: number, ci: any) => s + (ci.quantity || 0), 0)}
        addedIds={(cartItems || []).map((ci: any) => ci.menuItem?.id).filter(Boolean)}
        onClose={() => { setShowRecSheet(false); navigate(-1); }}
        onAdd={handleAddRecommended}
        onGoToCart={() => { setShowRecSheet(false); navigate(`/mobile/${slug}/cart`); }}
      />
    </MobileLayout>
  );
};

export default ItemDetailPage;