import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { getPaymentMethodLabel } from '../../constants';
import { printSettlementReport } from '../../utils/billPrint';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
// ─── Types ───────────────────────────────────────────────────────

interface DailySettlementPrintProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SettlementFinancials {
  grossSales: number;
  totalDiscount: number;
  totalCouponDiscount: number;
  totalPointDiscount: number;
  totalTakeawayCharge: number;
  totalDeliveryFee: number;
  totalServiceCharge: number;
  totalTax: number;
  netSales: number;
  cancelledOrders: number;
  cancelledAmount: number;
  outstandingOrders: number;
  outstandingAmount: number;
}

interface SettlementData {
  summary: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
  };
  settlement: SettlementFinancials;
  paymentMethodSales: Array<{ method: string; revenue: number; orders: number }>;
  cardTypeSales: Array<{ type: string; revenue: number; orders: number }>;
  orderTypeSales: Array<{ type: string; revenue: number; orders: number }>;
  sourceSales: Array<{ source: string; revenue: number; orders: number }>;
  categorySales: Array<{ category: string; revenue: number; quantity: number }>;
  menuSales: Array<{ name: string; category: string; revenue: number; quantity: number }>;
  staffMeal: { revenue: number; orders: number };
}

// ─── Label Maps ─────────────────────────────────────────────────

const ORDER_TYPE_LABELS: Record<string, string> = {
  dine_in: 'Dine In',
  'dine-in': 'Dine In',
  takeaway: 'Takeaway',
  pickup: 'Pickup',
  delivery: 'Delivery',
};

const SOURCE_LABELS: Record<string, string> = {
  pos: 'POS',
  mobile: 'Mobile Order',
};

const CARD_TYPE_LABELS: Record<string, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  master: 'Mastercard',
  amex: 'Amex',
  other: 'Other',
  unspecified: 'Unspecified',
};

// ─── Screen UI Styles ────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;

  @media print {
    position: static;
    background: none;
    padding: 0;
    overflow: visible;
  }
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 520px;
  width: 100%;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  @media print {
    max-width: none;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6B7C93;
  font-size: 20px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`;

const QuickDateBtn = styled.button<{ active?: boolean }>`
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7C93'};

  &:hover {
    border-color: #635BFF;
    color: ${props => props.active ? 'white' : '#635BFF'};
  }
`;

const DateInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  margin-left: auto;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;

  @media print {
    overflow: visible;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;
  flex-shrink: 0;

  @media print {
    display: none;
  }
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${props => props.primary ? '#635BFF' : '#E6EBF1'};
  background: ${props => props.primary ? '#635BFF' : 'white'};
  color: ${props => props.primary ? 'white' : '#0A2540'};

  &:hover {
    background: ${props => props.primary ? '#5A51E6' : '#F6F9FC'};
  }
`;

// ─── Print Receipt Styles (80mm thermal) ─────────────────────────

const Receipt = styled.div`
  padding: 24px;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #1F2937;
  max-height: 70vh;
  overflow-y: auto;

  @media print {
    max-height: none;
    overflow: visible;
    padding: 5mm;
    width: 80mm;
    max-width: 80mm;
    font-size: 11px;
  }
`;

const ReceiptHeader = styled.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`;

const ReceiptStoreName = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`;

const ReceiptStoreInfo = styled.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`;

const ReceiptTitle = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 12px 0;
  padding: 8px 0;
  border-top: 1px dashed #9CA3AF;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 13px;
  }
`;

const ReceiptSection = styled.div`
  margin-bottom: 12px;
`;

const ReceiptSectionTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`;

const ReceiptRow = styled.div<{ bold?: boolean; total?: boolean; indent?: boolean; negative?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.total ? '8px 0 4px 0' : '2px 0'};
  font-weight: ${props => (props.bold || props.total) ? 700 : 400};
  font-size: ${props => props.total ? '14px' : '12px'};
  border-top: ${props => props.total ? '2px solid #1F2937' : 'none'};
  margin-top: ${props => props.total ? '8px' : '0'};
  padding-left: ${props => props.indent ? '16px' : '0'};
  font-weight: ${props => props.negative ? 700 : undefined};
  color: inherit;

  @media print {
    font-size: ${props => props.total ? '13px' : '11px'};
    padding-left: ${props => props.indent ? '12px' : '0'};
  }
`;

const ReceiptRowLabel = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`;

const ReceiptRowValue = styled.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

const ReceiptRowCount = styled.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`;

const ReceiptDivider = styled.div<{ style_type?: 'dashed' | 'solid' | 'double' }>`
  border-bottom: ${props =>
    props.style_type === 'double' ? '3px double #1F2937' :
    props.style_type === 'solid' ? '1px solid #9CA3AF' :
    '1px dashed #9CA3AF'};
  margin: 8px 0;
`;

const ReceiptFooter = styled.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #9CA3AF;
  font-size: 11px;
  color: #6B7280;
  line-height: 1.6;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`;

const NoDataContainer = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`;

// ─── Helpers ─────────────────────────────────────────────────────

const getToday = (tz: string): string => {
  return new Date().toLocaleDateString('en-CA', { timeZone: tz });
};

const getYesterday = (tz: string): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString('en-CA', { timeZone: tz });
};

const formatDateDisplay = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
};

// ─── Component ───────────────────────────────────────────────────

const DailySettlementPrint: React.FC<DailySettlementPrintProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation('reports');
  const { user } = useAuth();
  const { storeSettings, operationSettings, paymentSettings } = useStore();
  const timeZone = operationSettings.timeZone || 'Asia/Kuala_Lumpur';
  const currency = operationSettings.currency;

  const [selectedDate, setSelectedDate] = useState<string>(getToday(timeZone));
  const [data, setData] = useState<SettlementData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (date: string) => {
    if (!user?.restaurantId) return;

    const token = getAuthToken();
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/dashboard/restaurant/${user.restaurantId}/reports-summary?startDate=${date}&endDate=${date}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching settlement data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.restaurantId]);

  useEffect(() => {
    if (isOpen) {
      fetchData(selectedDate);
    }
  }, [isOpen, selectedDate, fetchData]);

  const generateSettlementHTML = useCallback(() => {
    if (!data || !data.settlement) return '';

    const st = data.settlement;
    const orders = data.summary?.totalOrders || 0;
    const aov = data.summary?.averageOrderValue || 0;
    const fc = (v: number) => formatCurrency(v, currency);
    const ps = paymentSettings || undefined;

    const pmSales = (data.paymentMethodSales || []).filter(p => p.orders > 0 && p.method !== 'staffMeal').sort((a, b) => b.revenue - a.revenue);
    const ctSales = (data.cardTypeSales || []).filter(c => c.orders > 0).sort((a, b) => b.revenue - a.revenue);
    const otSales = (data.orderTypeSales || []).filter(o => o.orders > 0).sort((a, b) => b.revenue - a.revenue);
    const srcSales = (data.sourceSales || []).filter(x => x.orders > 0).sort((a, b) => b.revenue - a.revenue);
    const catSales = (data.categorySales || []).filter(c => c.revenue > 0).sort((a, b) => b.revenue - a.revenue);
    const topItems = (data.menuSales || []).filter(m => m.quantity > 0).sort((a, b) => b.quantity - a.quantity).slice(0, 10);
    const sm = data.staffMeal || { revenue: 0, orders: 0 };
    const pmTotal = pmSales.reduce((sum, p) => sum + p.revenue, 0);
    const ts = new Date().toLocaleString('en-GB', { timeZone, day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

    // Helper: row with label + value
    const row = (label: string, value: string, opts?: { bold?: boolean; total?: boolean; indent?: boolean; negative?: boolean; count?: string }) => {
      const style = [
        'display:flex', 'justify-content:space-between', 'align-items:baseline',
        `padding:${opts?.total ? '8px 0 4px 0' : '2px 0'}`,
        `font-weight:${(opts?.bold || opts?.total) ? 700 : 600}`,
        `font-size:${opts?.total ? '16px' : '14px'}`,
        opts?.total ? 'border-top:2px solid #000; margin-top:8px' : '',
        opts?.indent ? 'padding-left:16px' : '',
        opts?.negative ? 'font-weight:700' : '',
      ].filter(Boolean).join(';');
      const countHtml = opts?.count ? `<span style="text-align:right;white-space:nowrap;min-width:36px;margin:0 4px">${opts.count}</span>` : '';
      return `<div style="${style}"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:8px">${label}</span>${countHtml}<span style="text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums">${value}</span></div>`;
    };
    const divider = (type: 'dashed' | 'solid' | 'double' = 'dashed') => {
      const border = type === 'double' ? '3px double #000' : type === 'solid' ? '1px solid #666' : '1px dashed #666';
      return `<div style="border-bottom:${border};margin:8px 0"></div>`;
    };
    const sectionTitle = (title: string) => `<div style="font-weight:700;font-size:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px dashed #666">${title}</div>`;

    // Build store header
    let storeHeader = `<div style="font-size:18px;font-weight:900;letter-spacing:1px;margin-bottom:4px">${storeSettings.name}</div>`;
    const infoLines: string[] = [];
    if (storeSettings.address) infoLines.push(storeSettings.address);
    if (storeSettings.city || storeSettings.state) infoLines.push([storeSettings.city, storeSettings.state, storeSettings.postalCode].filter(Boolean).join(', '));
    if (storeSettings.phone) infoLines.push(`Tel: ${storeSettings.phone}`);
    const regParts: string[] = [];
    if (storeSettings.businessRegistration) regParts.push(`Reg No: ${storeSettings.businessRegistration}`);
    if (storeSettings.gstRegNo) regParts.push(`Tax No: ${storeSettings.gstRegNo}`);
    if (regParts.length > 0) infoLines.push(regParts.join(' | '));
    storeHeader += `<div style="font-size:11px;line-height:1.4">${infoLines.join('<br>')}</div>`;

    // Build sections
    let html = '';

    // Store header
    html += `<div style="text-align:center;padding-bottom:12px;margin-bottom:12px;border-bottom:2px solid #000">${storeHeader}</div>`;

    // Title
    html += `<div style="text-align:center;font-size:16px;font-weight:900;letter-spacing:2px;margin:12px 0;padding:8px 0;border-top:1px dashed #666;border-bottom:1px dashed #666">{t('reports:dailySettlementPrint.dailySettlement')}</div>`;

    // Date / Printed
    html += row('Date:', formatDateDisplay(selectedDate));
    html += row('Printed:', ts);
    html += divider('double');

    // 1. SALES SUMMARY
    html += sectionTitle('SALES SUMMARY');
    html += row('Gross Sales', fc(st.grossSales));
    if (st.totalDiscount > 0) html += row('(-) Discount', fc(st.totalDiscount));
    if (st.totalCouponDiscount > 0) html += row('(-) Coupon Discount', fc(st.totalCouponDiscount));
    if (st.totalPointDiscount > 0) html += row('(-) Point Discount', fc(st.totalPointDiscount));
    if (st.totalTakeawayCharge > 0) html += row('(+) Takeaway Charge', fc(st.totalTakeawayCharge));
    if (st.totalDeliveryFee > 0) html += row('(+) Delivery Fee', fc(st.totalDeliveryFee));
    if (st.totalServiceCharge > 0) html += row('(+) Service Charge', fc(st.totalServiceCharge));
    if (st.totalTax > 0) html += row('(+) Tax', fc(st.totalTax));
    html += row('NET SALES', fc(st.netSales), { total: true });
    html += divider('dashed');
    html += row('Total Orders', String(orders));
    html += row('Avg Order Value', fc(aov));
    if (st.cancelledOrders > 0) {
      html += divider('dashed');
      html += row('Cancelled Orders', fc(st.cancelledAmount), { negative: true, count: String(st.cancelledOrders) });
    }
    if (st.outstandingOrders > 0) {
      html += row('Outstanding Orders', fc(st.outstandingAmount), { negative: true, count: String(st.outstandingOrders) });
    }
    html += divider('double');

    // 2. PAYMENT SETTLEMENT
    if (pmSales.length > 0) {
      html += sectionTitle('PAYMENT SETTLEMENT');
      pmSales.forEach(p => {
        html += row(getPaymentMethodLabel(p.method, ps), fc(p.revenue), { count: `x${p.orders}` });
        if (p.method === 'card' && ctSales.length > 0) {
          ctSales.forEach((c, i) => {
            const prefix = i < ctSales.length - 1 ? '├' : '└';
            html += row(`${prefix} ${CARD_TYPE_LABELS[c.type] || c.type}`, fc(c.revenue), { indent: true, count: `x${c.orders}` });
          });
        }
      });
      html += row('TOTAL COLLECTED', fc(pmTotal), { total: true });
      html += divider();
    }

    // 3. ORDER SOURCE
    if (srcSales.length > 0) {
      html += sectionTitle('ORDER SOURCE');
      srcSales.forEach(src => {
        html += row(SOURCE_LABELS[src.source] || src.source, fc(src.revenue), { count: `x${src.orders}` });
      });
      html += divider();
    }

    // 4. ORDER TYPE
    if (otSales.length > 0) {
      html += sectionTitle('ORDER TYPE');
      otSales.forEach(o => {
        html += row(ORDER_TYPE_LABELS[o.type] || o.type, fc(o.revenue), { count: `x${o.orders}` });
      });
      html += divider();
    }

    // 5. PRODUCT SUMMARY
    if (catSales.length > 0) {
      html += sectionTitle('SALES BY CATEGORY');
      catSales.forEach(c => {
        html += row(c.category, fc(c.revenue), { count: `${c.quantity}qty` });
      });
      const totalQty = catSales.reduce((sum, c) => sum + c.quantity, 0);
      const totalRev = catSales.reduce((sum, c) => sum + c.revenue, 0);
      html += row('Total', fc(totalRev), { bold: true, count: `${totalQty}qty` });
    }

    if (topItems.length > 0) {
      html += divider('dashed');
      html += sectionTitle('TOP SELLING ITEMS');
      topItems.forEach(m => {
        html += row(m.name, fc(m.revenue), { count: `x${m.quantity}` });
      });
    }

    // 6. STAFF MEALS
    if (sm.orders > 0) {
      html += divider();
      html += sectionTitle('STAFF MEALS (NON-REVENUE)');
      html += row('Staff Meal Orders', String(sm.orders));
      html += row('Staff Meal Value', fc(sm.revenue));
    }

    // Footer
    html += `<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px dashed #666;font-size:11px;line-height:1.6">
      <div>--- End of Daily Settlement ---</div>
      <div>${storeSettings.name}</div>
    </div>`;

    return `<!DOCTYPE html>
    <html><head><meta charset="UTF-8"><title>Daily Settlement - ${formatDateDisplay(selectedDate)}</title>
    <style>
      @page { size: 80mm auto; margin: 0; }
      @media print { body { margin: 0; padding: 0; } .no-print { display: none; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
      body { font-family: 'Lucida Console', 'Courier New', monospace; font-size: 14px; font-weight: 600; color: #000; width: 80mm; max-width: 80mm; margin: 0 auto; padding: 5mm; box-sizing: border-box; -webkit-font-smoothing: none; letter-spacing: 0.3px; }
    </style></head><body>${html}</body></html>`;
  }, [data, selectedDate, currency, storeSettings, paymentSettings, timeZone]);

  const handlePrint = () => {
    const htmlContent = generateSettlementHTML();
    if (!htmlContent) return;
    printSettlementReport(htmlContent, null);
  };

  const handleDownloadPDF = async () => {
    const htmlContent = generateSettlementHTML();
    if (!htmlContent) return;

    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');

      // Create off-screen container with receipt width (80mm ≈ 302px)
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '302px';
      container.style.background = 'white';
      container.innerHTML = htmlContent.replace(/<html>|<\/html>|<head>.*?<\/head>|<body>|<\/body>|<!DOCTYPE[^>]*>/gs, '');
      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 2,
        width: 302,
        windowWidth: 302,
        backgroundColor: '#ffffff'
      });

      document.body.removeChild(container);

      // Create PDF with receipt dimensions (80mm width, dynamic height)
      const imgWidth = 80; // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [imgWidth, imgHeight] });
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`settlement-${selectedDate}.pdf`);
    } catch (error) {
      console.error('PDF download error:', error);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  if (!isOpen) return null;

  const today = getToday(timeZone);
  const yesterday = getYesterday(timeZone);

  // ─── Derived Data ──────────────────────────────────────────────
  const s = data?.settlement;
  const totalOrders = data?.summary?.totalOrders || 0;
  const avgOrderValue = data?.summary?.averageOrderValue || 0;

  // Payment methods (excluding staffMeal which has its own section)
  const paymentMethods = (data?.paymentMethodSales || [])
    .filter(p => p.orders > 0 && p.method !== 'staffMeal')
    .sort((a, b) => b.revenue - a.revenue);

  // Card types as sub-category of card
  const cardTypes = (data?.cardTypeSales || [])
    .filter(c => c.orders > 0)
    .sort((a, b) => b.revenue - a.revenue);

  // Order types
  const orderTypes = (data?.orderTypeSales || [])
    .filter(o => o.orders > 0)
    .sort((a, b) => b.revenue - a.revenue);

  // Order source
  const sourceSales = (data?.sourceSales || [])
    .filter(s => s.orders > 0)
    .sort((a, b) => b.revenue - a.revenue);

  // Category sales
  const categories = (data?.categorySales || [])
    .filter(c => c.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue);

  // Top menu items (top 10)
  const topMenuItems = (data?.menuSales || [])
    .filter(m => m.quantity > 0)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  // Staff meal
  const staffMeal = data?.staffMeal || { revenue: 0, orders: 0 };

  // Payment total (for verification)
  const paymentTotal = paymentMethods.reduce((sum, p) => sum + p.revenue, 0);

  // Timestamp
  const printTimestamp = new Date().toLocaleString('en-GB', {
    timeZone,
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  return ReactDOM.createPortal(
    <Overlay onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* Screen-only header */}
        <ModalHeader className="no-print">
          <ModalTitle>{t('reports:dailySettlementPrint.dailySettlementReport')}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
        {/* Date selector */}
        <DateSelector className="no-print">
          <QuickDateBtn
            active={selectedDate === today}
            onClick={() => handleDateChange(today)}
          >
            Today
          </QuickDateBtn>
          <QuickDateBtn
            active={selectedDate === yesterday}
            onClick={() => handleDateChange(yesterday)}
          >
            Yesterday
          </QuickDateBtn>
          <DateInput
            type="date"
            value={selectedDate}
            max={today}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </DateSelector>

        {/* Receipt content */}
        {loading ? (
          <LoadingContainer>{t('reports:dailySettlementPrint.loadingSettlementData')}</LoadingContainer>
        ) : !data || totalOrders === 0 ? (
          <NoDataContainer>
            No sales data for {formatDateDisplay(selectedDate)}
          </NoDataContainer>
        ) : (
          <Receipt>
            {/* ─── Store Header ─── */}
            <ReceiptHeader>
              <ReceiptStoreName>{storeSettings.name}</ReceiptStoreName>
              <ReceiptStoreInfo>
                {storeSettings.address && <div>{storeSettings.address}</div>}
                {(storeSettings.city || storeSettings.state) && (
                  <div>{[storeSettings.city, storeSettings.state, storeSettings.postalCode].filter(Boolean).join(', ')}</div>
                )}
                {storeSettings.phone && <div>Tel: {storeSettings.phone}</div>}
                {(storeSettings.businessRegistration || storeSettings.gstRegNo) && (
                  <div>
                    {storeSettings.businessRegistration && <>Reg No: {storeSettings.businessRegistration}</>}
                    {storeSettings.businessRegistration && storeSettings.gstRegNo && ' | '}
                    {storeSettings.gstRegNo && <>Tax No: {storeSettings.gstRegNo}</>}
                  </div>
                )}
              </ReceiptStoreInfo>
            </ReceiptHeader>

            {/* ─── Report Title ─── */}
            <ReceiptTitle>{t('reports:dailySettlementPrint.dailySettlement')}</ReceiptTitle>

            <ReceiptSection>
              <ReceiptRow>
                <ReceiptRowLabel>Date:</ReceiptRowLabel>
                <ReceiptRowValue>{formatDateDisplay(selectedDate)}</ReceiptRowValue>
              </ReceiptRow>
              <ReceiptRow>
                <ReceiptRowLabel>Printed:</ReceiptRowLabel>
                <ReceiptRowValue>{printTimestamp}</ReceiptRowValue>
              </ReceiptRow>
            </ReceiptSection>

            <ReceiptDivider style_type="double" />

            {/* ══════════════════════════════════════════════════
                1. SALES SUMMARY
            ══════════════════════════════════════════════════ */}
            <ReceiptSection>
              <ReceiptSectionTitle>{t('reports:dailySettlementPrint.salesSummary')}</ReceiptSectionTitle>

              <ReceiptRow>
                <ReceiptRowLabel>{t('reports:dailySettlementPrint.grossSales')}</ReceiptRowLabel>
                <ReceiptRowValue>{formatCurrency(s?.grossSales || 0, currency)}</ReceiptRowValue>
              </ReceiptRow>

              {(s?.totalDiscount || 0) > 0 && (
                <ReceiptRow>
                  <ReceiptRowLabel>(-) Discount</ReceiptRowLabel>
                  <ReceiptRowValue>{formatCurrency(s!.totalDiscount, currency)}</ReceiptRowValue>
                </ReceiptRow>
              )}

              {(s?.totalCouponDiscount || 0) > 0 && (
                <ReceiptRow>
                  <ReceiptRowLabel>(-) Coupon Discount</ReceiptRowLabel>
                  <ReceiptRowValue>{formatCurrency(s!.totalCouponDiscount, currency)}</ReceiptRowValue>
                </ReceiptRow>
              )}

              {(s?.totalPointDiscount || 0) > 0 && (
                <ReceiptRow>
                  <ReceiptRowLabel>(-) Point Discount</ReceiptRowLabel>
                  <ReceiptRowValue>{formatCurrency(s!.totalPointDiscount, currency)}</ReceiptRowValue>
                </ReceiptRow>
              )}

              {(s?.totalTakeawayCharge || 0) > 0 && (
                <ReceiptRow>
                  <ReceiptRowLabel>(+) Takeaway Charge</ReceiptRowLabel>
                  <ReceiptRowValue>{formatCurrency(s!.totalTakeawayCharge, currency)}</ReceiptRowValue>
                </ReceiptRow>
              )}

              {(s?.totalDeliveryFee || 0) > 0 && (
                <ReceiptRow>
                  <ReceiptRowLabel>(+) Delivery Fee</ReceiptRowLabel>
                  <ReceiptRowValue>{formatCurrency(s!.totalDeliveryFee, currency)}</ReceiptRowValue>
                </ReceiptRow>
              )}

              {(s?.totalServiceCharge || 0) > 0 && (
                <ReceiptRow>
                  <ReceiptRowLabel>(+) Service Charge</ReceiptRowLabel>
                  <ReceiptRowValue>{formatCurrency(s!.totalServiceCharge, currency)}</ReceiptRowValue>
                </ReceiptRow>
              )}

              {(s?.totalTax || 0) > 0 && (
                <ReceiptRow>
                  <ReceiptRowLabel>(+) Tax</ReceiptRowLabel>
                  <ReceiptRowValue>{formatCurrency(s!.totalTax, currency)}</ReceiptRowValue>
                </ReceiptRow>
              )}

              <ReceiptRow total>
                <ReceiptRowLabel>{t('reports:dailySettlementPrint.netSales')}</ReceiptRowLabel>
                <ReceiptRowValue>{formatCurrency(s?.netSales || 0, currency)}</ReceiptRowValue>
              </ReceiptRow>

              <ReceiptDivider style_type="dashed" />

              <ReceiptRow>
                <ReceiptRowLabel>{t('reports:dailySettlementPrint.totalOrders')}</ReceiptRowLabel>
                <ReceiptRowValue>{totalOrders}</ReceiptRowValue>
              </ReceiptRow>
              <ReceiptRow>
                <ReceiptRowLabel>{t('reports:dailySettlementPrint.avgOrderValue')}</ReceiptRowLabel>
                <ReceiptRowValue>{formatCurrency(avgOrderValue, currency)}</ReceiptRowValue>
              </ReceiptRow>

              {(s?.cancelledOrders || 0) > 0 && (
                <>
                  <ReceiptDivider style_type="dashed" />
                  <ReceiptRow negative>
                    <ReceiptRowLabel>{t('reports:dailySettlementPrint.cancelledOrders')}</ReceiptRowLabel>
                    <ReceiptRowCount>{s!.cancelledOrders}</ReceiptRowCount>
                    <ReceiptRowValue>{formatCurrency(s!.cancelledAmount, currency)}</ReceiptRowValue>
                  </ReceiptRow>
                </>
              )}

              {(s?.outstandingOrders || 0) > 0 && (
                <ReceiptRow negative>
                  <ReceiptRowLabel>{t('reports:dailySettlementPrint.outstandingOrders')}</ReceiptRowLabel>
                  <ReceiptRowCount>{s!.outstandingOrders}</ReceiptRowCount>
                  <ReceiptRowValue>{formatCurrency(s!.outstandingAmount, currency)}</ReceiptRowValue>
                </ReceiptRow>
              )}
            </ReceiptSection>

            <ReceiptDivider style_type="double" />

            {/* ══════════════════════════════════════════════════
                2. PAYMENT SETTLEMENT
            ══════════════════════════════════════════════════ */}
            {paymentMethods.length > 0 && (
              <ReceiptSection>
                <ReceiptSectionTitle>{t('reports:dailySettlementPrint.paymentSettlement')}</ReceiptSectionTitle>
                {paymentMethods.map((p) => (
                  <React.Fragment key={p.method}>
                    <ReceiptRow>
                      <ReceiptRowLabel>{getPaymentMethodLabel(p.method, paymentSettings || undefined)}</ReceiptRowLabel>
                      <ReceiptRowCount>x{p.orders}</ReceiptRowCount>
                      <ReceiptRowValue>{formatCurrency(p.revenue, currency)}</ReceiptRowValue>
                    </ReceiptRow>
                    {/* Card sub-categories */}
                    {p.method === 'card' && cardTypes.length > 0 && cardTypes.map((c, i) => (
                      <ReceiptRow key={c.type} indent>
                        <ReceiptRowLabel>{i < cardTypes.length - 1 ? '├' : '└'} {CARD_TYPE_LABELS[c.type] || c.type}</ReceiptRowLabel>
                        <ReceiptRowCount>x{c.orders}</ReceiptRowCount>
                        <ReceiptRowValue>{formatCurrency(c.revenue, currency)}</ReceiptRowValue>
                      </ReceiptRow>
                    ))}
                  </React.Fragment>
                ))}
                <ReceiptRow total>
                  <ReceiptRowLabel>{t('reports:dailySettlementPrint.totalCollected')}</ReceiptRowLabel>
                  <ReceiptRowValue>{formatCurrency(paymentTotal, currency)}</ReceiptRowValue>
                </ReceiptRow>
              </ReceiptSection>
            )}

            <ReceiptDivider />

            {/* ══════════════════════════════════════════════════
                3. ORDER SOURCE
            ══════════════════════════════════════════════════ */}
            {sourceSales.length > 0 && (
              <ReceiptSection>
                <ReceiptSectionTitle>{t('reports:dailySettlementPrint.orderSource')}</ReceiptSectionTitle>
                {sourceSales.map((src) => (
                  <ReceiptRow key={src.source}>
                    <ReceiptRowLabel>{SOURCE_LABELS[src.source] || src.source}</ReceiptRowLabel>
                    <ReceiptRowCount>x{src.orders}</ReceiptRowCount>
                    <ReceiptRowValue>{formatCurrency(src.revenue, currency)}</ReceiptRowValue>
                  </ReceiptRow>
                ))}
              </ReceiptSection>
            )}

            <ReceiptDivider />

            {/* ══════════════════════════════════════════════════
                4. ORDER TYPE
            ══════════════════════════════════════════════════ */}
            {orderTypes.length > 0 && (
              <ReceiptSection>
                <ReceiptSectionTitle>{t('reports:dailySettlementPrint.orderType')}</ReceiptSectionTitle>
                {orderTypes.map((o) => (
                  <ReceiptRow key={o.type}>
                    <ReceiptRowLabel>{ORDER_TYPE_LABELS[o.type] || o.type}</ReceiptRowLabel>
                    <ReceiptRowCount>x{o.orders}</ReceiptRowCount>
                    <ReceiptRowValue>{formatCurrency(o.revenue, currency)}</ReceiptRowValue>
                  </ReceiptRow>
                ))}
              </ReceiptSection>
            )}

            <ReceiptDivider />

            {/* ══════════════════════════════════════════════════
                5. PRODUCT SUMMARY
            ══════════════════════════════════════════════════ */}
            {categories.length > 0 && (
              <ReceiptSection>
                <ReceiptSectionTitle>{t('reports:dailySettlementPrint.salesByCategory')}</ReceiptSectionTitle>
                {categories.map((c) => (
                  <ReceiptRow key={c.category}>
                    <ReceiptRowLabel>{c.category}</ReceiptRowLabel>
                    <ReceiptRowCount>{c.quantity}qty</ReceiptRowCount>
                    <ReceiptRowValue>{formatCurrency(c.revenue, currency)}</ReceiptRowValue>
                  </ReceiptRow>
                ))}
                <ReceiptRow bold>
                  <ReceiptRowLabel>{t('reports:dailySettlementPrint.total')}</ReceiptRowLabel>
                  <ReceiptRowCount>{categories.reduce((sum, c) => sum + c.quantity, 0)}qty</ReceiptRowCount>
                  <ReceiptRowValue>{formatCurrency(categories.reduce((sum, c) => sum + c.revenue, 0), currency)}</ReceiptRowValue>
                </ReceiptRow>
              </ReceiptSection>
            )}

            {topMenuItems.length > 0 && (
              <>
                <ReceiptDivider style_type="dashed" />
                <ReceiptSection>
                  <ReceiptSectionTitle>{t('reports:dailySettlementPrint.topSellingItems')}</ReceiptSectionTitle>
                  {topMenuItems.map((m, i) => (
                    <ReceiptRow key={`${m.name}-${i}`}>
                      <ReceiptRowLabel>{m.name}</ReceiptRowLabel>
                      <ReceiptRowCount>x{m.quantity}</ReceiptRowCount>
                      <ReceiptRowValue>{formatCurrency(m.revenue, currency)}</ReceiptRowValue>
                    </ReceiptRow>
                  ))}
                </ReceiptSection>
              </>
            )}

            {/* ══════════════════════════════════════════════════
                6. STAFF MEALS
            ══════════════════════════════════════════════════ */}
            {staffMeal.orders > 0 && (
              <>
                <ReceiptDivider />
                <ReceiptSection>
                  <ReceiptSectionTitle>{t('reports:dailySettlementPrint.staffMealsNonrevenue')}</ReceiptSectionTitle>
                  <ReceiptRow>
                    <ReceiptRowLabel>{t('reports:dailySettlementPrint.staffMealOrders')}</ReceiptRowLabel>
                    <ReceiptRowValue>{staffMeal.orders}</ReceiptRowValue>
                  </ReceiptRow>
                  <ReceiptRow>
                    <ReceiptRowLabel>{t('reports:dailySettlementPrint.staffMealValue')}</ReceiptRowLabel>
                    <ReceiptRowValue>{formatCurrency(staffMeal.revenue, currency)}</ReceiptRowValue>
                  </ReceiptRow>
                </ReceiptSection>
              </>
            )}

            {/* ─── Footer ─── */}
            <ReceiptFooter>
              <div>--- End of Daily Settlement ---</div>
              <div>{storeSettings.name}</div>
            </ReceiptFooter>
          </Receipt>
        )}

        </ModalBody>

        {/* Action buttons */}
        {!loading && data && totalOrders > 0 && (
          <ActionBar className="no-print">
            <ActionButton onClick={onClose}>{t('reports:dailySettlementPrint.close')}</ActionButton>
            <ActionButton onClick={handleDownloadPDF}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              PDF Download
            </ActionButton>
            <ActionButton primary onClick={handlePrint}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Print
            </ActionButton>
          </ActionBar>
        )}
      </ModalContainer>

    </Overlay>,
    document.body
  );
};

export default DailySettlementPrint;
