import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatAddressLines, AppLocale } from '../../utils/formatAddress';
import { printSettlementReport } from '../../utils/billPrint';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from '../../components/UI/Modal';
import { FormLabel as Label } from '../../components/UI/Modal';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';

// 2026-06-28 (Irene): Staff Meal Settlement — 하루치(일별 배치) 직원식 정산서.
// Daily Settlement 처럼 하루 마감분을 모아 출력. 영수증 포맷은 Irene 제공 샘플
// (NON SALES / Table No: S.M. / 품목별 직원명 / Staff Meal 합계) 기준.
// 인쇄는 billPrint.printSettlementReport 재사용 (QZ HTML pixel = 한글 정상, 인쇄엔진 무변경).

interface StaffMealItem {
  name: string;
  quantity: number;
  price: number;
  staff_names: string[];
  options: any;
  special_instructions: string | null;
}
interface StaffMealOrder {
  id: number;
  order_number: string;
  order_date: string;
  order_type: string;
  table_number: string | null;
  total_amount: number;
  subtotal: number;
  items: StaffMealItem[];
}
interface StaffMealSettlementData {
  date: string;
  timeZone: string;
  orders: StaffMealOrder[];
  orderCount: number;
  itemCount: number;
  grandTotal: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const getToday = (tz: string): string => {
  try { return new Date().toLocaleDateString('en-CA', { timeZone: tz }); }
  catch { return new Date().toISOString().slice(0, 10); }
};
const formatDateDisplay = (dateStr: string): string => {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
};

// 옵션 배열을 사람이 읽는 문자열 목록으로 (다양한 형태 방어).
const optionLabels = (options: any): string[] => {
  if (!options) return [];
  const out: string[] = [];
  const push = (v: any) => { const s = (v ?? '').toString().trim(); if (s) out.push(s); };
  if (Array.isArray(options)) {
    options.forEach((o: any) => {
      if (typeof o === 'string') push(o);
      else if (o && typeof o === 'object') push(o.name || o.label || o.value || o.option_name);
    });
  } else if (typeof options === 'object') {
    Object.values(options).forEach((v: any) => {
      if (Array.isArray(v)) v.forEach(push); else push(v);
    });
  }
  return out;
};

const orderTypeLabel = (t: string): string => {
  switch ((t || '').toLowerCase()) {
    case 'dine-in':
    case 'dine_in': return 'Dine In';
    case 'takeaway': return 'Retail/Takeaway';
    case 'pickup': return 'Pickup';
    case 'delivery': return 'Delivery';
    default: return t || 'Order';
  }
};

const StaffMealSettlementPrint: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation('reports');
  const { user } = useAuth();
  const { storeSettings, operationSettings } = useStore();
  const timeZone = operationSettings.timeZone || 'Asia/Kuala_Lumpur';
  const currency = operationSettings.currency || 'MYR';

  const [selectedDate, setSelectedDate] = useState<string>(getToday(timeZone));
  const [data, setData] = useState<StaffMealSettlementData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (date: string) => {
    if (!user?.restaurantId) return;
    const token = getAuthToken();
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/dashboard/restaurant/${user.restaurantId}/staff-meal-settlement?date=${date}`,
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      if (res.ok) {
        const j = await res.json();
        if (j.success) setData(j.data);
      }
    } catch { /* 비치명 */ }
    finally { setLoading(false); }
  }, [user?.restaurantId]);

  useEffect(() => {
    if (isOpen) fetchData(selectedDate);
  }, [isOpen, selectedDate, fetchData]);

  const generateHTML = useCallback((): string => {
    if (!data) return '';
    const fc = (v: number) => formatCurrency(v, currency);
    const ts = new Date().toLocaleString('en-GB', { timeZone, day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

    // Store header
    let storeHeader = `<div style="font-size:18px;font-weight:900;letter-spacing:1px;margin-bottom:4px">${storeSettings.name || ''}</div>`;
    const infoLines: string[] = [
      ...formatAddressLines({
        address: storeSettings.address,
        city: storeSettings.city,
        state: storeSettings.state,
        postal_code: storeSettings.postalCode,
        country: storeSettings.country
      }, (i18n.language as AppLocale) || 'en')
    ];
    if (storeSettings.phone) infoLines.push(`Tel: ${storeSettings.phone}`);
    const regParts: string[] = [];
    if (storeSettings.businessRegistration) regParts.push(`Reg No: ${storeSettings.businessRegistration}`);
    if (storeSettings.gstRegNo) regParts.push(`Tax No: ${storeSettings.gstRegNo}`);
    if (regParts.length > 0) infoLines.push(regParts.join(' | '));
    storeHeader += `<div style="font-size:11px;line-height:1.4">${infoLines.join('<br>')}</div>`;

    const itemRow = (label: string, value: string) =>
      `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:2px 0;font-size:13px;font-weight:600"><span style="flex:1;padding-right:8px">${label}</span><span style="text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums">${value}</span></div>`;

    let html = '';
    html += `<div style="text-align:center;padding-bottom:12px;margin-bottom:10px;border-bottom:2px solid #000">${storeHeader}</div>`;
    html += `<div style="text-align:center;font-size:13px;font-weight:900;letter-spacing:2px;margin:6px 0">NON SALES</div>`;
    html += `<div style="text-align:center;font-size:15px;font-weight:900;letter-spacing:2px;margin:8px 0;padding:6px 0;border-top:1px dashed #666;border-bottom:1px dashed #666">${t('reports:staffMealSettlement.title', 'STAFF MEAL SETTLEMENT')}</div>`;
    html += itemRow('Table No:', 'S.M.');
    html += itemRow('Date:', formatDateDisplay(data.date));
    html += itemRow('Printed:', ts);
    html += `<div style="border-bottom:3px double #000;margin:8px 0"></div>`;

    if (data.orders.length === 0) {
      html += `<div style="text-align:center;font-size:13px;padding:16px 0">${t('reports:staffMealSettlement.noStaffMeals', 'No staff meals on this day.')}</div>`;
    } else {
      data.orders.forEach((o) => {
        html += `<div style="font-weight:700;font-size:12px;margin:8px 0 2px">*** ${orderTypeLabel(o.order_type)} ***</div>`;
        html += `<div style="font-size:10px;color:#333;margin-bottom:4px">Order: ${o.order_number || o.id}</div>`;
        o.items.forEach((it) => {
          html += `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:1px 0;font-size:13px;font-weight:600"><span style="flex:1;padding-right:8px">${it.quantity} × ${it.name}</span><span style="text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums">${fc(it.price * it.quantity)}</span></div>`;
          // 수량만큼 직원 이름(같은 메뉴 2개=2명). 각 줄에 한 명씩.
          (it.staff_names || []).map(n => (n || '').trim()).filter(Boolean).forEach(nm => {
            html += `<div style="font-size:12px;padding-left:14px;color:#000">${nm}*</div>`;
          });
          optionLabels(it.options).forEach(op => {
            html += `<div style="font-size:11px;padding-left:14px;color:#333">- ${op}</div>`;
          });
          if (it.special_instructions) html += `<div style="font-size:11px;padding-left:14px;color:#333">- ${it.special_instructions}</div>`;
        });
      });
      html += `<div style="border-bottom:1px dashed #666;margin:8px 0"></div>`;
      html += itemRow('Total Items', String(data.itemCount));
      html += itemRow('Staff Meal Orders', String(data.orderCount));
      html += `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:8px 0 4px;border-top:2px solid #000;margin-top:8px;font-weight:700;font-size:16px"><span>Staff Meal Total</span><span style="font-variant-numeric:tabular-nums">${fc(data.grandTotal)}</span></div>`;
    }

    html += `<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px dashed #666;font-size:11px;line-height:1.6"><div>--- End of Staff Meal Settlement ---</div><div>${storeSettings.name || ''}</div><div>${ts}</div></div>`;

    return `<!DOCTYPE html>
    <html><head><meta charset="UTF-8"><title>Staff Meal Settlement - ${formatDateDisplay(data.date)}</title>
    <style>
      @page { size: 80mm auto; margin: 0; }
      @media print { body { margin: 0; padding: 0; } .no-print { display: none; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
      body { font-family: 'Noto Sans KR', 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; font-size: 12px; font-weight: 600; line-height: 1.3; color: #000; width: 80mm; max-width: 80mm; margin: 0 auto; padding: 5mm; box-sizing: border-box; }
    </style></head><body>${html}</body></html>`;
  }, [data, currency, storeSettings, timeZone, i18n.language, t]);

  const handlePrint = () => {
    const html = generateHTML();
    if (!html) return;
    printSettlementReport(html, null);
  };

  const footer = (
    <>
      <ModalButton variant="secondary" onClick={onClose}>{t('reports:staffMealSettlement.close', 'Close')}</ModalButton>
      <ModalButton variant="primary" onClick={handlePrint} disabled={loading || !data || data.orderCount === 0}>
        {t('reports:staffMealSettlement.print', 'Print')}
      </ModalButton>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('reports:staffMealSettlement.title', 'Staff Meal Settlement')} size="medium" footer={footer}>
      <div style={{ marginBottom: '16px', maxWidth: '240px' }}>
        <Label>{t('reports:staffMealSettlement.date', 'Date')}</Label>
        <DateField value={selectedDate} onChange={(v: string) => setSelectedDate(v)} dropdownPortal />
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '32px', color: '#6B7C93' }}>{t('common:loading', 'Loading...')}</div>
      ) : data && data.orderCount > 0 ? (
        <div
          style={{
            border: '1px solid #E6EBF1', borderRadius: '8px', padding: '12px',
            maxHeight: '420px', overflowY: 'auto', background: '#FFFFFF'
          }}
          dangerouslySetInnerHTML={{ __html: generateHTML().replace(/<!DOCTYPE[^>]*>|<html>|<\/html>|<head>[\s\S]*?<\/head>|<body>|<\/body>/g, '') }}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '32px', color: '#6B7C93' }}>
          {t('reports:staffMealSettlement.noStaffMeals', 'No staff meals on this day.')}
        </div>
      )}
    </Modal>
  );
};

export default StaffMealSettlementPrint;
