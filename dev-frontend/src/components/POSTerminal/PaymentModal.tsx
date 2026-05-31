import React, { useState, useEffect } from 'react';
import { Modal, ModalButton as Button, FormLabel as Label } from '../UI/Modal';
import {
  Section,
  RadioGroup,
  RadioButton,
  TotalSection,
  TotalLabel,
  TotalPrice
} from '../Common/Modal';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';

import { getAuthToken } from '../../utils/auth';
const OrderSummary = styled.div`
  background: linear-gradient(to bottom, #F1F4F8, #F1F5F9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  color: #4B5563;
`;

const SummaryValue = styled.span`
  font-weight: 500;
  color: #1F2937;
`;

const InputSection = styled.div`
  margin-bottom: 20px;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #C7CED6;
  border-radius: 8px;
  text-align: center;
  color: #1F2937;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #6B7280;
    font-weight: 400;
  }
`;

const QuickAmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
`;

const QuickAmountBtn = styled.button<{ selected?: boolean }>`
  padding: 10px;
  border: 1px solid ${props => props.selected ? '#635BFF' : '#C7CED6'};
  background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#1F2937'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: ${props => props.selected ? '#635BFF' : '#6B7280'};
    background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : '#F9FAFB'};
  }
`;

const ChangeDisplay = styled.div`
  background: #F0FDF4;
  border: 1px solid #86EFAC;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-top: 16px;
`;

const ChangeLabel = styled.div`
  font-size: 14px;
  color: #059669;
  margin-bottom: 4px;
`;

const ChangeAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #047857;
`;

const DiscountRow = styled(SummaryRow)`
  color: #10B981;
`;

const PointsSection = styled.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const PointsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const PointsTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`;

const PointsTier = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const PointsBalance = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`;

const PointsToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 12px;

  input {
    width: 18px;
    height: 18px;
    accent-color: #635BFF;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #1F2937;
  }
`;

const PointsSlider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #C7CED6;
  accent-color: #635BFF;
  cursor: pointer;
`;

const PointsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding: 12px;
  background: #EFF6FF;
  border-radius: 8px;
`;

const PointsUsing = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`;

const PointsConversion = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const PointsDiscount = styled.div`
  font-weight: 700;
  color: #059669;
  font-size: 16px;
`;

// Helper function to get fetch options with auth token
const getFetchOptionsForModal = (options: RequestInit = {}): RequestInit => {
  const token = getAuthToken();
  return {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  };
};

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  subtotal: number;
  tax: number;
  serviceCharge?: number;
  takeawayCharge?: number;
  discountAmount?: number;
  couponDiscount?: number;
  onConfirmPayment: (paymentMethod: string, amountReceived?: number, change?: number, pointsUsed?: number, pointDiscount?: number, cardType?: string) => void;
  paymentMethods?: any;
  taxRate?: number;
  serviceChargeRate?: number;
  taxEnabled?: boolean;
  serviceChargeEnabled?: boolean;
  cashierName?: string;       // Current cashier name to display
  // Points props - can use customerId/restaurantId OR direct values
  customerId?: number;        // If provided, modal will fetch data internally
  restaurantId?: number;      // Required if customerId is provided
  customerPoints?: number;    // Direct value (used by POS Terminal)
  customerTier?: string;      // Direct value (used by POS Terminal)
  membershipSettings?: any;   // Direct value or will be fetched if restaurantId provided
  // POS Terminal 모드: 회원이 선택됐는지 표시 (자체 fetch는 트리거 안 함)
  // 이 값이 truthy면 포인트 섹션을 항상 표시 (0 pts여도 안내 보임)
  selectedCustomerId?: number;
  onPointsChange?: (pointsUsed: number, discount: number) => void;
  // Split bill — 한 주문 아이템 나눠서 결제 (Phase 2).
  orderId?: number;                         // 부분 결제 endpoint 호출용
  orderItems?: Array<{ name: string; quantity: number; price: number; menuItem?: any }>;
  existingAmountPaid?: number;              // 이미 누적 결제된 금액 (남은 결제 자동 계산용)
  // 모든 비례 분할 대상 변수 (split bill 정확한 금액 계산용).
  // originalTotal 안에 이미 적용되어 있어 splitTotal 합산은 정확하지만, breakdown UI 노출을 위해 전달.
  discountPolicyAmount?: number;            // 할인 정책 (별개)
  pointDiscount?: number;                   // 포인트 결제
  onPartialPaymentComplete?: (payment: any, remaining: number) => void;  // 부분 결제 1회 완료 콜백
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  total: originalTotal,
  subtotal,
  tax,
  serviceCharge = 0,
  takeawayCharge = 0,
  discountAmount = 0,
  couponDiscount = 0,
  onConfirmPayment,
  paymentMethods,
  taxRate = 6,
  serviceChargeRate = 10,
  taxEnabled = true,
  serviceChargeEnabled = false,
  cashierName,
  customerId,
  restaurantId,
  customerPoints: propCustomerPoints = 0,
  customerTier: propCustomerTier = 'Bronze',
  membershipSettings: propMembershipSettings,
  selectedCustomerId,
  onPointsChange,
  orderId,
  orderItems = [],
  existingAmountPaid = 0,
  discountPolicyAmount = 0,
  pointDiscount: pointDiscountProp = 0,
  onPartialPaymentComplete
}) => {
  const { operationSettings } = useStore();

  // Internal state for fetched data (when customerId/restaurantId are provided)
  const [fetchedPoints, setFetchedPoints] = useState<number>(0);
  const [fetchedTier, setFetchedTier] = useState<string>('Bronze');
  const [fetchedMembershipSettings, setFetchedMembershipSettings] = useState<any>(null);
  const [isLoadingPoints, setIsLoadingPoints] = useState(false);

  // Use fetched values if customerId is provided, otherwise use props
  const customerPoints = customerId ? fetchedPoints : propCustomerPoints;
  const customerTier = customerId ? fetchedTier : propCustomerTier;
  const membershipSettings = customerId && !propMembershipSettings ? fetchedMembershipSettings : propMembershipSettings;

  // Fetch membership settings and customer points when modal opens with customerId
  useEffect(() => {
    if (!isOpen || !customerId || !restaurantId) {
      return;
    }

    const fetchData = async () => {
      setIsLoadingPoints(true);
      try {
        // Fetch membership settings if not provided
        if (!propMembershipSettings) {
          const settingsResponse = await fetch(
            `/api/membership/settings/${restaurantId}`,
            getFetchOptionsForModal()
          );
          const settingsResult = await settingsResponse.json();
          if (settingsResult.success && settingsResult.data) {
            setFetchedMembershipSettings(settingsResult.data);
          }
        }

        // Fetch customer points
        const pointsResponse = await fetch(
          `/api/membership/customer/${restaurantId}/${customerId}`,
          getFetchOptionsForModal()
        );
        const pointsResult = await pointsResponse.json();
        if (pointsResult.success && pointsResult.data) {
          setFetchedPoints(pointsResult.data.points || 0);
          setFetchedTier(pointsResult.data.loyalty_tier || 'Bronze');
        }
      } catch (error) {
        console.error('PaymentModal: Failed to fetch membership data:', error);
      } finally {
        setIsLoadingPoints(false);
      }
    };

    fetchData();
  }, [isOpen, customerId, restaurantId, propMembershipSettings]);

  // Points state
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [pointDiscount, setPointDiscount] = useState(0);

  // Calculate max points that can be used
  const maxPointsForOrder = React.useMemo(() => {
    if (!membershipSettings || !membershipSettings.is_active || customerPoints <= 0) return 0;

    const minPointsToUse = membershipSettings.min_points_to_use || 100;
    const maxPercentage = parseFloat(membershipSettings.max_points_per_order_percent) || 50;
    const pointsToCurrency = parseFloat(membershipSettings.points_to_currency) || 100;

    // Max discount based on percentage
    const maxDiscountByPercent = (subtotal - discountAmount - couponDiscount) * (maxPercentage / 100);
    // Convert to points
    const maxPointsByPercent = Math.floor(maxDiscountByPercent * pointsToCurrency);

    // Can't use more points than available
    const maxUsable = Math.min(customerPoints, maxPointsByPercent);

    // Must meet minimum threshold
    if (customerPoints < minPointsToUse) return 0;

    return maxUsable;
  }, [membershipSettings, customerPoints, subtotal, discountAmount, couponDiscount]);

  // Calculate point discount when pointsToUse changes
  useEffect(() => {
    if (membershipSettings && pointsToUse > 0) {
      const pointsToCurrency = parseFloat(membershipSettings.points_to_currency) || 100;
      const discount = pointsToUse / pointsToCurrency;
      setPointDiscount(discount);
      onPointsChange?.(pointsToUse, discount);
    } else {
      setPointDiscount(0);
      onPointsChange?.(0, 0);
    }
  }, [pointsToUse, membershipSettings, onPointsChange]);

  // Reset points when modal closes
  useEffect(() => {
    if (!isOpen) {
      setUsePoints(false);
      setPointsToUse(0);
      setPointDiscount(0);
      // Reset fetched data for next open
      setFetchedPoints(0);
      setFetchedTier('Bronze');
      setFetchedMembershipSettings(null);
      // Reset discount-at-payment state
      setDiscountInput('');
      setDiscountMode('amount');
      setLiveTotalOverride(null);
    }
  }, [isOpen]);

  // 2026-05-31 (Irene). Payment-time discount state — MUST be declared before
  // `total` below (which reads liveTotalOverride). Declaring it after `total`
  // caused a TDZ crash that broke the whole payment modal in production.
  // Applies via the server-side apply-discount endpoint which recomputes with
  // computeOrderTotals (single source of truth); the returned total overrides
  // the displayed/charged total so it's always correct.
  const [discountInput, setDiscountInput] = useState('');
  const [discountMode, setDiscountMode] = useState<'amount' | 'percent'>('amount');
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const [liveTotalOverride, setLiveTotalOverride] = useState<number | null>(null);

  // Adjusted total after point discount
  // total = full payment 모드일 때 결제할 금액 (point discount 적용)
  // splitMode 면 선택 아이템 합계가 결제 amount
  const total = liveTotalOverride != null ? liveTotalOverride : originalTotal - pointDiscount;

  // Apply a manual discount (amount or %) to this existing order at payment time.
  const handleApplyPaymentDiscount = async () => {
    if (!orderId || applyingDiscount) return;
    const raw = parseFloat(discountInput);
    if (isNaN(raw) || raw < 0) return;
    const d = discountMode === 'percent' ? (subtotal * raw) / 100 : raw;
    setApplyingDiscount(true);
    try {
      const tk = getAuthToken();
      const res = await fetch(`/api/orders/${orderId}/apply-discount`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(tk ? { Authorization: `Bearer ${tk}` } : {}) },
        body: JSON.stringify({ discount: Math.round(d * 100) / 100 })
      });
      const j = await res.json();
      if (j.success && j.totals) setLiveTotalOverride(Number(j.totals.total));
    } catch (e) {
      console.error('apply payment discount failed', e);
    }
    setApplyingDiscount(false);
  };

  // Get available payment methods for POS
  const getAvailablePaymentMethods = () => {
    if (!paymentMethods) {
      return [];
    }

    // Use saved order if available, otherwise iterate all keys
    const savedOrder = paymentMethods._order;
    const allKeys = Object.keys(paymentMethods).filter(k => k !== '_order');
    const methodOrder = savedOrder && Array.isArray(savedOrder)
      ? savedOrder.filter((k: string) => k !== '_order')
      : allKeys;

    // Add any keys not in saved order (e.g. newly added payment methods)
    const missingKeys = allKeys.filter(k => !methodOrder.includes(k));
    const fullOrder = [...methodOrder, ...missingKeys];

    const methods: any[] = [];

    fullOrder.forEach((key: string) => {
      const method = paymentMethods[key];
      if (method && method.enabled && method.availableIn && method.availableIn.includes('pos')) {
        methods.push({
          key,
          label: method.label
        });
      }
    });

    return methods;
  };

  const availableMethods = getAvailablePaymentMethods();
  const [paymentMethod, setPaymentMethod] = useState<string>(availableMethods[0]?.key || 'cash');

  // Update selected payment method when paymentMethods load/change
  useEffect(() => {
    if (availableMethods.length > 0 && !availableMethods.find(m => m.key === paymentMethod)) {
      setPaymentMethod(availableMethods[0].key);
    }
  }, [paymentMethods]); // eslint-disable-line react-hooks/exhaustive-deps
  const [cashAmount, setCashAmount] = useState('');
  const [cardType, setCardType] = useState<string>('');
  // Discount-at-payment (incl. deferred payment from Live Orders / Floor Plan).

  // ─── Split bill state ───
  const splitEligible = !!(orderId && orderItems.length > 0);
  // 이미 결제 진행 중인 주문이면 Split mode 기본 ON — cashier 가 토글 안 켜도 즉시 paid items 가시.
  const [splitMode, setSplitMode] = useState(() => splitEligible && existingAmountPaid > 0);
  // 체크된 아이템 인덱스 (orderItems 기준)
  const [splitSelected, setSplitSelected] = useState<Set<number>>(new Set());
  const [splitSubmitting, setSplitSubmitting] = useState(false);
  const [splitError, setSplitError] = useState<string | null>(null);
  // 부분 결제 후 모달 안 닫음 → 누적 결제 표시
  const [localPaidExtra, setLocalPaidExtra] = useState(0);
  // 이미 결제된 아이템 인덱스 (paid_items 의 idx 기반)
  const [paidItemIndices, setPaidItemIndices] = useState<Set<number>>(new Set());
  // 부분 결제 history — 각 receipt 의 method + amount (cashier 즉시 확인용)
  const [paidReceipts, setPaidReceipts] = useState<Array<{ receipt_number: string; payment_method: string; card_type?: string; amount: number }>>([]);
  // amount_paid 누적 (DB 값) — overpaid 가능
  const totalReceived = existingAmountPaid + localPaidExtra;
  // 표시용 — PAID items 정확 비례 기반. 옛 결제 amount 가 비례 안 맞는 경우 (cashier 가 정확
  // 비례 외 임의 amount 입력) 안 PAID items 합과 표시 remaining 일치 보장.
  const paidSubtotalFromItems = orderItems.reduce((sum, item, idx) => {
    if (!paidItemIndices.has(idx)) return sum;
    return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
  }, 0);
  const paidPortion = subtotal > 0 ? paidSubtotalFromItems * (originalTotal / subtotal) : 0;
  // 표시: PAID items 비례 (옛 cashier 가 더 받은 부분 무시) vs 실제 received (db amount_paid)
  // 둘 다 노출해서 매장 cashier 가 차이 인지.
  const totalPaidAlready = paidPortion > 0 ? paidPortion : totalReceived;
  const remainingAmount = Math.max(0, originalTotal - totalPaidAlready);
  // 옛 결제가 비례 보다 더 받았는지 (overpaid 표시용)
  const overpaidAmount = Math.max(0, totalReceived - paidPortion);

  // 이미 결제된 아이템 + receipts fetch (split UI 표시용)
  // idx 매칭 (신규 결제 형식) + id/name 매칭 (옛 결제 형식 fallback) 둘 다 처리.
  useEffect(() => {
    if (!isOpen || !orderId) return;
    (async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/payments`);
        const json = await res.json();
        const paid = new Set<number>();
        const receipts: Array<any> = [];
        const allPaidItems: any[] = [];
        // 2026-05-27: pre-mark every idx-tagged paidItem as "accounted for" so the
        // legacy fallback below cannot re-match the same paid item against a
        // *different* orderItem of identical name/price/quantity. The previous
        // version did NOT pre-mark, so two identical items (e.g. two Milo Bingsu)
        // — only one of which was paid — both ended up flagged paid in the UI.
        // Cashier saw "all paid", clicked Done, but order.amount_paid was short by
        // one item → payment_status stayed 'partial' and the order never closed.
        (json?.data || []).forEach((p: any) => {
          if (Array.isArray(p.items_paid)) {
            p.items_paid.forEach((it: any) => {
              if (typeof it?.idx === 'number') {
                paid.add(it.idx);
                it._matchedKey = `${it.id || it.name}_${it.idx}`;
              }
              allPaidItems.push(it);
            });
          }
          receipts.push({
            receipt_number: p.receipt_number,
            payment_method: p.payment_method,
            card_type: p.card_type,
            amount: Number(p.amount) || 0
          });
        });
        // Fallback for legacy receipts (no idx). Skip any paidItem already
        // accounted for via idx — fixes the duplicate-name bug above.
        const usedItemIds = new Set<string>();
        allPaidItems.forEach((p: any) => { if (p._matchedKey) usedItemIds.add(p._matchedKey); });
        orderItems.forEach((item, idx) => {
          if (paid.has(idx)) return;
          for (const paidItem of allPaidItems) {
            if (paidItem._matchedKey && usedItemIds.has(paidItem._matchedKey)) continue;
            const sameId = paidItem.id && item.id && String(paidItem.id) === String(item.id);
            const sameNamePrice = !sameId
              && paidItem.name === item.name
              && Number(paidItem.price) === Number(item.price)
              && Number(paidItem.quantity || 1) === Number(item.quantity || 1);
            if (sameId || sameNamePrice) {
              paid.add(idx);
              const key = `${paidItem.id || paidItem.name}_${idx}`;
              paidItem._matchedKey = key;
              usedItemIds.add(key);
              break;
            }
          }
        });
        setPaidItemIndices(paid);
        setPaidReceipts(receipts);
      } catch { /* ignore */ }
    })();
  }, [isOpen, orderId, localPaidExtra, orderItems]);

  // Split 선택 — 비례 계산. 단순 item price 합이 아니라 tax/service/discount/coupon/takeaway 비례 적용.
  const splitSubtotal = orderItems.reduce((sum, item, idx) => {
    if (!splitSelected.has(idx)) return sum;
    return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
  }, 0);
  const ratio = subtotal > 0 ? splitSubtotal / subtotal : 0;
  const splitDiscount = (Number(discountAmount) || 0) * ratio;
  const splitCoupon = (Number(couponDiscount) || 0) * ratio;
  const splitDiscountPolicy = (Number(discountPolicyAmount) || 0) * ratio;
  const splitPointDiscount = (Number(pointDiscountProp) || 0) * ratio;
  const splitTax = (Number(tax) || 0) * ratio;
  const splitService = (Number(serviceCharge) || 0) * ratio;
  const splitTakeaway = (Number(takeawayCharge) || 0) * ratio;
  // 핵심 항등식: splitTotal === splitSubtotal × (originalTotal / subtotal)
  // → 모든 변수 (tax/service/discount/coupon/policy/point/takeaway) 자동 비례.
  // splitTotal = originalTotal × ratio 와 동일.
  const splitTotal = Math.max(0,
    splitSubtotal - splitDiscount - splitCoupon - splitDiscountPolicy - splitPointDiscount
    + splitTax + splitService + splitTakeaway
  );

  useEffect(() => {
    if (!isOpen) {
      setSplitMode(false);
      setSplitSelected(new Set());
      setSplitError(null);
      setLocalPaidExtra(0);
      setPaidItemIndices(new Set());
      setPaidReceipts([]);
    } else if (splitEligible && existingAmountPaid > 0) {
      // 진입 시 이미 결제된 상태면 자동 Split mode
      setSplitMode(true);
    }
  }, [isOpen, splitEligible, existingAmountPaid]);

  const quickAmounts = [50, 100, 150, 200];
  
  // paymentMethod 초기화 (availableMethods가 변경되면)
  useEffect(() => {
    if (availableMethods.length > 0) {
      if (!paymentMethod || !availableMethods.find(m => m.key === paymentMethod)) {
        setPaymentMethod(availableMethods[0].key);
      }
    }
  }, [availableMethods, paymentMethod]);
  
  const handleCashAmountChange = (value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setCashAmount(cleanValue);
  };
  
  const calculateChange = () => {
    const amount = parseFloat(cashAmount) || 0;
    return Math.max(0, amount - total);
  };
  
  // Split bill — 선택 아이템만 부분 결제 (POST /api/orders/:id/payments)
  // splitTotal 을 그대로 보냄 (정확한 비례 결제). backend 가 amount_paid 를 order.total
  // 로 cap. order_payments row 의 amount 는 실제 받은 그대로 (통계/회계 정확).
  const handleSplitConfirm = async () => {
    if (!orderId || splitSelected.size === 0) return;
    const amount = splitTotal;
    if (paymentMethod === 'cash') {
      const received = parseFloat(cashAmount) || 0;
      if (received < amount) {
        setSplitError(`Received amount must be at least ${amount.toFixed(2)}`);
        return;
      }
    }
    setSplitSubmitting(true);
    setSplitError(null);
    try {
      // idx 포함 — 다음 split 결제 시 paid items 추적 + disabled UI 용
      const itemsPaid = orderItems
        .map((item, idx) => splitSelected.has(idx) ? { idx, ...item } : null)
        .filter(Boolean);
      const body: any = {
        amount,
        payment_method: paymentMethod,
        items_paid: itemsPaid,
        cashier_name: cashierName
      };
      if (paymentMethod === 'cash') {
        body.amount_received = parseFloat(cashAmount) || amount;
        body.change_amount = Math.max(0, body.amount_received - amount);
      }
      if (paymentMethod === 'card' && cardType) body.card_type = cardType;

      const res = await fetch(`/api/orders/${orderId}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setSplitError(json.message || 'Payment failed');
        return;
      }
      const payment = json.data.payment;
      const orderInfo = json.data.order;
      const newRemaining = Number(orderInfo.remaining);
      setLocalPaidExtra(prev => prev + amount);
      setSplitSelected(new Set());
      setCashAmount('');
      onPartialPaymentComplete && onPartialPaymentComplete(payment, newRemaining);
      // 완전 결제면 모달 닫기
      if (newRemaining <= 0.005) onClose();
    } catch (e: any) {
      setSplitError(e?.message || 'Network error');
    } finally {
      setSplitSubmitting(false);
    }
  };

  const handleConfirm = () => {
    if (splitMode) {
      handleSplitConfirm();
      return;
    }
    if (paymentMethod === 'cash') {
      const amount = parseFloat(cashAmount) || 0;
      if (amount >= total) {
        onConfirmPayment(paymentMethod, amount, calculateChange(), pointsToUse, pointDiscount);
      }
    } else if (paymentMethod === 'card') {
      onConfirmPayment(paymentMethod, undefined, undefined, pointsToUse, pointDiscount, cardType);
    } else if (paymentMethod === 'staffMeal') {
      onConfirmPayment(paymentMethod, undefined, undefined, 0, 0);
    } else {
      onConfirmPayment(paymentMethod, undefined, undefined, pointsToUse, pointDiscount);
    }
  };

  // 카드 결제 시 카드종류 선택 필수 여부 (매장 Payment 설정).
  const requireCardType = !!(paymentMethods && paymentMethods.card && paymentMethods.card.requireCardType);

  const canConfirm = () => {
    if (!paymentMethods || availableMethods.length === 0) return false;
    if (splitMode) {
      if (splitSelected.size === 0 || splitTotal <= 0) return false;
      if (paymentMethod === 'cash') {
        const amount = parseFloat(cashAmount) || 0;
        return amount >= splitTotal;
      }
      if (paymentMethod === 'card') {
        return !requireCardType || !!cardType;
      }
      return true;
    }
    if (paymentMethod === 'cash') {
      const amount = parseFloat(cashAmount) || 0;
      return amount >= total;
    }
    if (paymentMethod === 'card') {
      // 매장 설정(payment_settings.card.requireCardType)이 켜져 있으면 카드종류 선택 필수.
      return !requireCardType || !!cardType;
    }
    return true;
  };

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm} disabled={!canConfirm()}>
        Confirm Payment
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment"
      footer={footer}
    >
      {/* Split bill toggle + UI (Phase 2) */}
      {splitEligible && (
        <div style={{
          padding: '12px 16px',
          background: splitMode ? '#F0F4FF' : '#F1F4F8',
          border: `1px solid ${splitMode ? '#DDD9FF' : '#C7CED6'}`,
          borderRadius: 8,
          marginBottom: 16
        }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540' }}>
                Split bill (pay by items)
              </div>
              <div style={{ fontSize: 11, color: '#4B5563', marginTop: 2 }}>
                Select items to pay this round. Remaining items can be paid separately.
                {totalPaidAlready > 0 && (
                  <>
                    <span style={{ color: '#3B30D9', fontWeight: 600 }}>
                      {' · Paid: '}{formatCurrency(totalPaidAlready, operationSettings.currency)}
                    </span>
                    <span style={{ color: remainingAmount > 0.005 ? '#F59E0B' : '#059669', fontWeight: 600 }}>
                      {' · Remaining: '}{formatCurrency(remainingAmount, operationSettings.currency)}
                    </span>
                  </>
                )}
              </div>
            </div>
            <input
              type="checkbox"
              role="switch"
              checked={splitMode}
              onChange={(e) => { setSplitMode(e.target.checked); setSplitSelected(new Set()); setCashAmount(''); setSplitError(null); }}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </label>

          {splitMode && paidReceipts.length > 0 && (
            <div style={{
              marginTop: 12, padding: '8px 10px',
              background: 'white',
              border: '1px solid #C7CED6', borderRadius: 6,
              fontSize: 11
            }}>
              <div style={{ fontWeight: 600, color: '#0A2540', marginBottom: 4 }}>
                Already paid ({paidReceipts.length} receipt{paidReceipts.length > 1 ? 's' : ''})
              </div>
              {paidReceipts.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', padding: '2px 0' }}>
                  <span>
                    <span style={{ color: '#3B30D9', fontWeight: 600 }}>{r.receipt_number}</span>
                    {' · '}{r.payment_method}{r.card_type ? ` (${r.card_type})` : ''}
                  </span>
                  <span style={{ color: '#0A2540', fontWeight: 600 }}>
                    {formatCurrency(r.amount, operationSettings.currency)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {splitMode && (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {orderItems.map((item, idx) => {
                const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
                const alreadyPaid = paidItemIndices.has(idx);
                const checked = alreadyPaid || splitSelected.has(idx);
                return (
                  <label
                    key={idx}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '8px 10px',
                      background: alreadyPaid ? '#C7CED6' : (checked ? 'white' : 'transparent'),
                      border: `1px solid ${alreadyPaid ? '#6B7280' : (checked ? '#635BFF' : '#C7CED6')}`,
                      borderRadius: 6,
                      cursor: alreadyPaid ? 'not-allowed' : 'pointer',
                      opacity: alreadyPaid ? 0.6 : 1
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={alreadyPaid}
                        onChange={(e) => {
                          if (alreadyPaid) return;
                          const next = new Set(splitSelected);
                          if (e.target.checked) next.add(idx); else next.delete(idx);
                          setSplitSelected(next);
                        }}
                        style={{ width: 16, height: 16, cursor: alreadyPaid ? 'not-allowed' : 'pointer' }}
                      />
                      <div style={{ fontSize: 13, color: '#0A2540', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: alreadyPaid ? 'line-through' : 'none' }}>
                        {item.name} × {item.quantity}
                      </div>
                      {alreadyPaid && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: '#059669',
                          background: '#D1FAE5', padding: '2px 6px', borderRadius: 4,
                          letterSpacing: 0.3
                        }}>
                          PAID
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: alreadyPaid ? '#4B5563' : '#0A2540', whiteSpace: 'nowrap', textDecoration: alreadyPaid ? 'line-through' : 'none' }}>
                      {formatCurrency(itemTotal, operationSettings.currency)}
                    </div>
                  </label>
                );
              })}

              {/* Breakdown — 비례 적용 결과 명시 (cashier 가 손님에게 정확한 금액 안내) */}
              {splitSelected.size > 0 && (
                <div style={{
                  marginTop: 8, padding: '10px 12px',
                  background: 'white',
                  border: '1px solid #C7CED6',
                  borderRadius: 6,
                  fontSize: 12
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', marginBottom: 4 }}>
                    <span>Items subtotal</span>
                    <span>{formatCurrency(splitSubtotal, operationSettings.currency)}</span>
                  </div>
                  {splitDiscount > 0.005 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', marginBottom: 4 }}>
                      <span>Discount (proportional)</span>
                      <span>−{formatCurrency(splitDiscount, operationSettings.currency)}</span>
                    </div>
                  )}
                  {splitCoupon > 0.005 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', marginBottom: 4 }}>
                      <span>Coupon (proportional)</span>
                      <span>−{formatCurrency(splitCoupon, operationSettings.currency)}</span>
                    </div>
                  )}
                  {splitDiscountPolicy > 0.005 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', marginBottom: 4 }}>
                      <span>Discount policy (proportional)</span>
                      <span>−{formatCurrency(splitDiscountPolicy, operationSettings.currency)}</span>
                    </div>
                  )}
                  {splitPointDiscount > 0.005 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', marginBottom: 4 }}>
                      <span>Points (proportional)</span>
                      <span>−{formatCurrency(splitPointDiscount, operationSettings.currency)}</span>
                    </div>
                  )}
                  {splitTakeaway > 0.005 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', marginBottom: 4 }}>
                      <span>Takeaway charge</span>
                      <span>+{formatCurrency(splitTakeaway, operationSettings.currency)}</span>
                    </div>
                  )}
                  {splitService > 0.005 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', marginBottom: 4 }}>
                      <span>Service ({serviceChargeRate}%)</span>
                      <span>+{formatCurrency(splitService, operationSettings.currency)}</span>
                    </div>
                  )}
                  {splitTax > 0.005 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563', marginBottom: 4 }}>
                      <span>Tax ({taxRate}%)</span>
                      <span>+{formatCurrency(splitTax, operationSettings.currency)}</span>
                    </div>
                  )}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginTop: 6, paddingTop: 8, borderTop: '1px solid #C7CED6'
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0A2540' }}>This payment</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: splitTotal - remainingAmount > 0.01 ? '#DC2626' : '#3B30D9' }}>
                      {formatCurrency(splitTotal, operationSettings.currency)}
                    </span>
                  </div>
                </div>
              )}

              {splitError && (
                <div style={{
                  marginTop: 4, padding: '6px 8px',
                  background: '#FEE2E2', color: '#B91C1C',
                  fontSize: 12, borderRadius: 6
                }}>
                  {splitError}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <OrderSummary>
        {cashierName && (
          <SummaryRow>
            <SummaryLabel>Cashier</SummaryLabel>
            <SummaryValue>{cashierName}</SummaryValue>
          </SummaryRow>
        )}
        <SummaryRow>
          <SummaryLabel>Subtotal</SummaryLabel>
          <SummaryValue>{formatCurrency(subtotal, operationSettings.currency)}</SummaryValue>
        </SummaryRow>
        {takeawayCharge > 0 && (
          <SummaryRow>
            <SummaryLabel>Takeaway Charge</SummaryLabel>
            <SummaryValue>{formatCurrency(takeawayCharge, operationSettings.currency)}</SummaryValue>
          </SummaryRow>
        )}
        {discountAmount > 0 && (
          <DiscountRow>
            <SummaryLabel>Discount</SummaryLabel>
            <SummaryValue>{formatCurrency(-discountAmount, operationSettings.currency)}</SummaryValue>
          </DiscountRow>
        )}
        {couponDiscount > 0 && (
          <DiscountRow>
            <SummaryLabel>Coupon Discount</SummaryLabel>
            <SummaryValue>{formatCurrency(-couponDiscount, operationSettings.currency)}</SummaryValue>
          </DiscountRow>
        )}
        {pointDiscount > 0 && (
          <DiscountRow>
            <SummaryLabel>Points Discount ({pointsToUse.toLocaleString()} pts)</SummaryLabel>
            <SummaryValue>{formatCurrency(-pointDiscount, operationSettings.currency)}</SummaryValue>
          </DiscountRow>
        )}
        {serviceCharge > 0 && (
          <SummaryRow>
            <SummaryLabel>Service Charge ({serviceChargeRate}%)</SummaryLabel>
            <SummaryValue>{formatCurrency(serviceCharge, operationSettings.currency)}</SummaryValue>
          </SummaryRow>
        )}
        {tax > 0 && (
          <SummaryRow>
            <SummaryLabel>Tax ({taxRate}%)</SummaryLabel>
            <SummaryValue>{formatCurrency(tax, operationSettings.currency)}</SummaryValue>
          </SummaryRow>
        )}
      </OrderSummary>

      {/* Discount at payment (2026-05-31 Irene) — for an existing order (incl. deferred
          payment from Live Orders / Floor Plan). Server recomputes via computeOrderTotals. */}
      {orderId && !splitMode && (
        <InputSection>
          <Label>Discount</Label>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', border: '1px solid #C7CED6', borderRadius: 8, overflow: 'hidden' }}>
              {(['amount', 'percent'] as const).map(m => (
                <button key={m} type="button" onClick={() => setDiscountMode(m)}
                  style={{ padding: '0 12px', border: 0, cursor: 'pointer', fontWeight: 600, fontSize: 14,
                    background: discountMode === m ? '#635BFF' : '#fff', color: discountMode === m ? '#fff' : '#0A2540' }}>
                  {m === 'amount' ? (operationSettings.currency === 'MYR' ? 'RM' : operationSettings.currency) : '%'}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)} placeholder="0"
              style={{ flex: 1, minWidth: 0, padding: '10px 12px', border: '1px solid #C7CED6', borderRadius: 8, fontSize: 16 }} />
            <button type="button" onClick={handleApplyPaymentDiscount} disabled={applyingDiscount || !discountInput.trim()}
              style={{ padding: '10px 16px', background: '#635BFF', color: '#fff', border: 0, borderRadius: 8, fontWeight: 600, cursor: 'pointer', opacity: (applyingDiscount || !discountInput.trim()) ? 0.5 : 1 }}>
              {applyingDiscount ? '...' : 'Apply'}
            </button>
          </div>
          {liveTotalOverride != null && (
            <div style={{ fontSize: 12, color: '#059669', fontWeight: 600, marginTop: 6 }}>
              Discount applied — new total {formatCurrency(liveTotalOverride, operationSettings.currency)}
            </div>
          )}
        </InputSection>
      )}

      <TotalSection>
        <TotalLabel>{splitEligible && totalPaidAlready > 0 ? 'Order Total' : 'Total Amount'}</TotalLabel>
        <TotalPrice>{formatCurrency(total, operationSettings.currency)}</TotalPrice>
      </TotalSection>

      {/* Partial 결제 진행 중 — Paid + Remaining 명확 표시 (Total Amount 와 시각 분리) */}
      {splitEligible && totalPaidAlready > 0 && (
        <div style={{
          marginTop: 8, marginBottom: 20, padding: '10px 14px',
          background: '#FEF3C7', border: '1px solid #FDE68A',
          borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 4
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#92400E' }}>
            <span>Already paid (proportional)</span>
            <span style={{ fontWeight: 600 }}>{formatCurrency(totalPaidAlready, operationSettings.currency)}</span>
          </div>
          {overpaidAmount > 0.01 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#92400E', fontStyle: 'italic' }}>
              <span>Received over proportional</span>
              <span>+{formatCurrency(overpaidAmount, operationSettings.currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700, color: '#92400E' }}>
            <span>Remaining to pay</span>
            <span>{formatCurrency(remainingAmount, operationSettings.currency)}</span>
          </div>
        </div>
      )}

      {/* Points Section - Show loading state or points info */}
      {isLoadingPoints && customerId && (
        <PointsSection>
          <PointsHeader>
            <div>
              <PointsTitle>Loading Points...</PointsTitle>
              <PointsTier>Please wait</PointsTier>
            </div>
          </PointsHeader>
        </PointsSection>
      )}
      {!isLoadingPoints && membershipSettings?.is_active && (customerPoints > 0 || selectedCustomerId || customerId) && (
        <PointsSection>
          {/* Points Info Header */}
          <PointsHeader>
            <div>
              <PointsTitle>Available Points</PointsTitle>
              <PointsTier>{customerTier} Member</PointsTier>
            </div>
            <PointsBalance>{customerPoints.toLocaleString()} pts</PointsBalance>
          </PointsHeader>

          {maxPointsForOrder > 0 ? (
            <>
              <PointsToggle>
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => {
                    setUsePoints(e.target.checked);
                    if (!e.target.checked) {
                      setPointsToUse(0);
                    } else {
                      setPointsToUse(maxPointsForOrder);
                    }
                  }}
                />
                <span>Use points for this order</span>
              </PointsToggle>

              {usePoints && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4B5563', marginBottom: '8px' }}>
                    <span>{membershipSettings?.min_points_to_use || 100} pts</span>
                    <span>{maxPointsForOrder.toLocaleString()} pts (max)</span>
                  </div>
                  <PointsSlider
                    type="range"
                    min={membershipSettings?.min_points_to_use || 100}
                    max={maxPointsForOrder}
                    value={pointsToUse}
                    onChange={(e) => setPointsToUse(Number(e.target.value))}
                  />
                  <PointsInfo>
                    <div>
                      <PointsUsing>Using: {pointsToUse.toLocaleString()} pts</PointsUsing>
                      <PointsConversion>({membershipSettings?.points_to_currency || 100} pts = {formatCurrency(1, operationSettings.currency)})</PointsConversion>
                    </div>
                    <PointsDiscount>
                      -{formatCurrency(pointDiscount, operationSettings.currency)}
                    </PointsDiscount>
                  </PointsInfo>
                </>
              )}
            </>
          ) : (
            <div style={{ fontSize: '13px', color: '#4B5563', textAlign: 'center', padding: '12px' }}>
              Minimum {membershipSettings?.min_points_to_use || 100} points required to use
            </div>
          )}

          {/* Points earning preview */}
          {membershipSettings?.points_per_currency && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: '#FEF3C7',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#92400E'
            }}>
              {(() => {
                const bonusRate = customerTier === 'VIP' ? parseFloat(membershipSettings.vip_bonus_rate) :
                  customerTier === 'Gold' ? parseFloat(membershipSettings.gold_bonus_rate) :
                  customerTier === 'Silver' ? parseFloat(membershipSettings.silver_bonus_rate) :
                  parseFloat(membershipSettings.bronze_bonus_rate);
                const orderAmount = subtotal - discountAmount - couponDiscount - pointDiscount;
                const earnedPoints = Math.floor(orderAmount * parseFloat(membershipSettings.points_per_currency) * bonusRate);
                const pointValue = earnedPoints / parseFloat(membershipSettings.points_to_currency);
                return (
                  <>
                    You will earn approximately <strong>{earnedPoints.toLocaleString()}</strong> pts
                    {' '}({formatCurrency(pointValue, operationSettings.currency)} value) from this order
                    {customerTier !== 'Bronze' && ` (${customerTier} ${bonusRate}x bonus)`}
                  </>
                );
              })()}
            </div>
          )}
        </PointsSection>
      )}

      {/* Points earning preview - only show for logged-in customers with 0 points (not for guests) */}
      {!isLoadingPoints && membershipSettings?.is_active && (customerId || selectedCustomerId) && customerPoints === 0 && membershipSettings?.points_per_currency && (
        <div style={{
          marginBottom: '16px',
          padding: '12px',
          background: '#F0FDF4',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#166534',
          border: '1px solid #BBF7D0'
        }}>
          {(() => {
            const orderAmount = subtotal - discountAmount - couponDiscount;
            const earnedPoints = Math.floor(orderAmount * parseFloat(membershipSettings.points_per_currency));
            const pointValue = earnedPoints / parseFloat(membershipSettings.points_to_currency);
            return (
              <>
                Members earn: <strong>{earnedPoints.toLocaleString()}</strong> pts
                {' '}({formatCurrency(pointValue, operationSettings.currency)} value)
              </>
            );
          })()}
        </div>
      )}

      <Section>
        <Label>Payment Method</Label>
        {!paymentMethods ? (
          <div style={{ color: '#4B5563', fontSize: '14px', padding: '12px 0' }}>
            Loading payment methods...
          </div>
        ) : availableMethods.length === 0 ? (
          <div style={{ color: '#E25950', fontSize: '14px', padding: '12px 0' }}>
            No payment methods enabled for POS. Please configure in Settings → Payment.
          </div>
        ) : (
        <RadioGroup>
          {availableMethods.map(method => (
            <RadioButton
              key={method.key}
              selected={paymentMethod === method.key}
              onClick={() => { setPaymentMethod(method.key); setCardType(''); }}
            >
              <div>{method.label}</div>
            </RadioButton>
          ))}
        </RadioGroup>
        )}
      </Section>

      {paymentMethod === 'card' && (
        <InputSection>
          <Label>{requireCardType ? 'Card Type *' : 'Card Type (Optional)'}</Label>
          {/* Card types on a SINGLE row (2026-05-31 Irene) — was a wrapping grid. */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['visa', 'master', 'amex', 'debit', 'other'].map(type => (
              <QuickAmountBtn
                key={type}
                selected={cardType === type}
                onClick={() => setCardType(cardType === type ? '' : type)}
                style={{ flex: 1, minWidth: 0, padding: '10px 2px' }}
              >
                {type === 'visa' ? 'Visa' : type === 'master' ? 'Master' : type === 'amex' ? 'Amex' : type === 'debit' ? 'Debit' : 'Other'}
              </QuickAmountBtn>
            ))}
          </div>
          {requireCardType && !cardType && (
            <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 500, color: '#FF6B6B' }}>
              Please select a card type to continue.
            </div>
          )}
        </InputSection>
      )}

      {paymentMethod === 'staffMeal' && (
        <div style={{
          background: '#FFF7ED',
          border: '1px solid #FDBA74',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '13px',
          color: '#9A3412',
          lineHeight: '1.5'
        }}>
          Staff meal is recorded at full price but excluded from revenue reports.
        </div>
      )}

      {paymentMethod === 'cash' && (
        <InputSection>
          <Label>Cash Amount</Label>
          <AmountInput
            type="text"
            placeholder="Enter amount received"
            value={cashAmount}
            onChange={(e) => handleCashAmountChange(e.target.value)}
            autoFocus
          />
          <QuickAmountGrid>
            {quickAmounts.map(amount => (
              <QuickAmountBtn
                key={amount}
                selected={cashAmount === amount.toString()}
                onClick={() => setCashAmount(amount.toString())}
              >
                {formatCurrency(amount, operationSettings.currency)}
              </QuickAmountBtn>
            ))}
          </QuickAmountGrid>

          {parseFloat(cashAmount) >= total && (
            <ChangeDisplay>
              <ChangeLabel>Change</ChangeLabel>
              <ChangeAmount>{formatCurrency(calculateChange(), operationSettings.currency)}</ChangeAmount>
            </ChangeDisplay>
          )}
        </InputSection>
      )}
    </Modal>
  );
};

export default PaymentModal;