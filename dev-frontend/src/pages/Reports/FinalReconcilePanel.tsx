/**
 * FinalReconcilePanel — 파이널(최종) 마감 = 매출 "대조" 마감.
 *
 * 2026-06-30 (Irene): 데일리(매출 요약 인쇄)와 다름. 파이널 = 실제 받은 돈(카드기/QR 총액 등) vs
 * 시스템 기록 매출을 결제수단별로 "대조"해 오차를 잡는 것. 근본 이유 = POS가 카드기/QR과 미연동이라
 * 결제를 수동 기록 → 실제 단말 총액과 가끔 다름(오류). 시재(현금 드로어)와 무관, 날짜 기준.
 *  - 데이터: 기존 reports-summary(결제수단별 매출). 인쇄: 기존 billPrint.printSettlementReport 재사용.
 *  - 시재/시프트 불필요(현금 안 받는 매장도 사용).
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { getPaymentMethodLabel } from '../../constants';
import { printSettlementReport } from '../../utils/billPrint';
import { useTranslation } from 'react-i18next';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';

interface Props { isOpen: boolean; onClose: () => void; }
interface PMRow { method: string; revenue: number; orders: number; }
interface TypeRow { type?: string; source?: string; revenue: number; orders: number; }
interface Settle {
  grossSales: number; totalDiscount: number; totalCouponDiscount: number; totalPointDiscount: number;
  totalTakeawayCharge: number; totalDeliveryFee: number; totalServiceCharge: number; totalTax: number;
  netSales: number; cancelledOrders: number; cancelledAmount: number; outstandingOrders: number; outstandingAmount: number;
  voidedItems?: number; voidedAmount?: number; voidedBilledItems?: number; voidedBilledAmount?: number;
}

// 데일리와 동일 라벨 (오늘 정보 표시용)
const ORDER_TYPE_LABELS: Record<string, string> = {
  dine_in: 'Dine In', 'dine-in': 'Dine In', takeaway: 'Takeaway', pickup: 'Pickup', delivery: 'Delivery',
};
const SOURCE_LABELS: Record<string, string> = { pos: 'POS', mobile: 'Mobile Order' };

const getToday = (tz: string): string => {
  try { return new Date().toLocaleDateString('en-CA', { timeZone: tz }); } // YYYY-MM-DD
  catch { return new Date().toISOString().slice(0, 10); }
};

const FinalReconcilePanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation('reports');
  const { user } = useAuth();
  const { storeSettings, operationSettings, paymentSettings } = useStore();
  const timeZone = operationSettings.timeZone || 'Asia/Kuala_Lumpur';
  const currency = operationSettings.currency;

  const [selectedDate, setSelectedDate] = useState<string>(getToday(timeZone));
  const [pmSales, setPmSales] = useState<PMRow[]>([]);
  const [actuals, setActuals] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  // 오늘 필요한 정보(데일리에서 가져옴) — 같은 reports-summary 응답에서.
  const [settle, setSettle] = useState<Settle | null>(null);
  const [summary, setSummary] = useState<{ totalOrders: number; averageOrderValue: number } | null>(null);
  const [orderTypes, setOrderTypes] = useState<TypeRow[]>([]);
  const [sources, setSources] = useState<TypeRow[]>([]);

  const fetchData = useCallback(async (date: string) => {
    if (!user?.restaurantId) return;
    const token = getAuthToken();
    if (!token) return;
    setLoading(true);
    try {
      const r = await fetch(
        `/api/dashboard/restaurant/${user.restaurantId}/reports-summary?startDate=${date}&endDate=${date}`,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      if (r.ok) {
        const j = await r.json();
        if (j.success && j.data) {
          const pm: PMRow[] = (j.data.paymentMethodSales || [])
            .filter((p: PMRow) => p.orders > 0 && p.method !== 'staffMeal')
            .sort((a: PMRow, b: PMRow) => b.revenue - a.revenue);
          setPmSales(pm);
          setActuals({});
          setNotes('');
          // 오늘 정보(요약·주문유형·소스) — 데일리와 동일 소스.
          setSettle(j.data.settlement || null);
          setSummary(j.data.summary || null);
          setOrderTypes((j.data.orderTypeSales || []).filter((o: TypeRow) => o.orders > 0).sort((a: TypeRow, b: TypeRow) => b.revenue - a.revenue));
          setSources((j.data.sourceSales || []).filter((s: TypeRow) => s.orders > 0).sort((a: TypeRow, b: TypeRow) => b.revenue - a.revenue));
        }
      }
    } catch (e) { console.error('[FinalReconcile] fetch error:', e); }
    finally { setLoading(false); }
  }, [user?.restaurantId]);

  useEffect(() => { if (isOpen) fetchData(selectedDate); }, [isOpen, selectedDate, fetchData]);

  const fc = (v: number) => formatCurrency(v, currency);
  const num = (s: string) => parseFloat(s) || 0;

  // 화면용 요약 행 (오늘 정보)
  const sumRow = (label: React.ReactNode, value: string, opts: { strong?: boolean; count?: number; danger?: boolean } = {}) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '2px 0', fontSize: opts.strong ? 15 : 13, fontWeight: opts.strong ? 800 : 600, color: opts.danger ? '#B45309' : '#0A2540' }}>
      <span>{label}{opts.count != null && <span style={{ color: '#6B7C93', fontWeight: 600 }}> ×{opts.count}</span>}</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );

  const systemTotal = useMemo(() => pmSales.reduce((s, p) => s + p.revenue, 0), [pmSales]);
  const actualTotal = useMemo(() => pmSales.reduce((s, p) => s + num(actuals[p.method] || ''), 0), [pmSales, actuals]);
  const varianceTotal = actualTotal - systemTotal;
  const anyActual = useMemo(() => pmSales.some(p => (actuals[p.method] || '').trim() !== ''), [pmSales, actuals]);

  const buildHTML = (): string => {
    const ps = paymentSettings || undefined;
    const ts = new Date().toLocaleString('en-GB', { timeZone, day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    const cell = (txt: string, align = 'right') => `<td style="padding:3px 4px;text-align:${align};font-variant-numeric:tabular-nums;white-space:nowrap">${txt}</td>`;
    let rows = '';
    pmSales.forEach(p => {
      const sys = p.revenue;
      const act = num(actuals[p.method] || '');
      const va = act - sys;
      const vaTxt = (actuals[p.method] || '').trim() === '' ? '-' : (va === 0 ? '0.00' : (va > 0 ? '+' : '') + fc(va));
      rows += `<tr>${cell(getPaymentMethodLabel(p.method, ps), 'left')}${cell(fc(sys))}${cell((actuals[p.method] || '').trim() === '' ? '-' : fc(act))}${cell(vaTxt)}</tr>`;
    });
    const vaTotTxt = !anyActual ? '-' : (varianceTotal === 0 ? '0.00' : (varianceTotal > 0 ? '+' : '') + fc(varianceTotal));
    const head = `<tr style="border-bottom:1px solid #000;font-weight:700"><td style="padding:3px 4px;text-align:left">${t('finalReconcile.method', 'Method')}</td><td style="padding:3px 4px;text-align:right">${t('finalReconcile.system', 'System')}</td><td style="padding:3px 4px;text-align:right">${t('finalReconcile.actual', 'Actual')}</td><td style="padding:3px 4px;text-align:right">${t('finalReconcile.variance', 'Variance')}</td></tr>`;
    const tot = `<tr style="border-top:2px solid #000;font-weight:700"><td style="padding:6px 4px;text-align:left">${t('finalReconcile.total', 'TOTAL')}</td>${cell(fc(systemTotal))}${cell(!anyActual ? '-' : fc(actualTotal))}${cell(vaTotTxt)}</tr>`;

    let html = '';
    html += `<div style="text-align:center;padding-bottom:12px;margin-bottom:12px;border-bottom:2px solid #000"><div style="font-size:18px;font-weight:900;letter-spacing:1px">${storeSettings.name || ''}</div></div>`;
    html += `<div style="text-align:center;font-size:16px;font-weight:900;letter-spacing:2px;margin:12px 0;padding:8px 0;border-top:1px dashed #666;border-bottom:1px dashed #666">${t('finalReconcile.title', 'FINAL SETTLEMENT')}</div>`;
    html += `<div style="text-align:center;font-size:11px;color:#333;margin:-6px 0 8px">${t('finalReconcile.subtitle', 'Sales reconciliation (system vs actual)')}</div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600;padding:2px 0"><span>${t('finalReconcile.date', 'Date')}:</span><span>${selectedDate}</span></div>`;
    html += `<div style="display:flex;justify-content:space-between;font-size:14px;font-weight:600;padding:2px 0"><span>${t('finalReconcile.printed', 'Printed')}:</span><span>${ts}</span></div>`;
    html += `<div style="border-bottom:3px double #000;margin:8px 0"></div>`;

    // ── 오늘 필요한 정보 (데일리 핵심) ──
    const sRow = (label: string, value: string, o: { total?: boolean; count?: number | string } = {}) =>
      `<div style="display:flex;justify-content:space-between;align-items:baseline;font-size:${o.total ? '15px' : '13px'};font-weight:${o.total ? 800 : 600};padding:2px 0;${o.total ? 'border-top:1px solid #000;margin-top:4px;padding-top:5px' : ''}"><span style="flex:1;padding-right:8px">${label}${o.count != null ? ` <span style="color:#555;font-weight:600">x${o.count}</span>` : ''}</span><span style="font-variant-numeric:tabular-nums;white-space:nowrap">${value}</span></div>`;
    const sTitle = (txt: string) => `<div style="font-weight:800;font-size:12px;margin:8px 0 3px;letter-spacing:1px">${txt}</div>`;
    if (settle) {
      html += sTitle(t('finalReconcile.salesSummary', 'SALES SUMMARY'));
      html += sRow(t('finalReconcile.grossSales', 'Gross Sales'), fc(settle.grossSales));
      if (settle.totalDiscount > 0) html += sRow(`(-) ${t('finalReconcile.discount', 'Discount')}`, fc(settle.totalDiscount));
      if (settle.totalServiceCharge > 0) html += sRow(`(+) ${t('finalReconcile.serviceCharge', 'Service Charge')}`, fc(settle.totalServiceCharge));
      if (settle.totalTax > 0) html += sRow(`(+) ${t('finalReconcile.tax', 'Tax')}`, fc(settle.totalTax));
      html += sRow(t('finalReconcile.netSales', 'NET SALES'), fc(settle.netSales), { total: true });
      html += sRow(t('finalReconcile.totalOrders', 'Total Orders'), String(summary?.totalOrders || 0));
      html += sRow(t('finalReconcile.avgOrder', 'Avg Order Value'), fc(summary?.averageOrderValue || 0));
      if (settle.cancelledOrders > 0) html += sRow(t('finalReconcile.cancelled', 'Cancelled'), fc(settle.cancelledAmount), { count: settle.cancelledOrders });
      if (settle.outstandingOrders > 0) html += sRow(t('finalReconcile.openOrders', 'Open Orders'), fc(settle.outstandingAmount), { count: settle.outstandingOrders });
      if ((settle.voidedItems || 0) > 0) html += sRow(t('finalReconcile.voidedItems', 'Voided Items'), fc(settle.voidedAmount || 0), { count: settle.voidedItems });
      if ((settle.voidedBilledItems || 0) > 0) html += sRow(`└ ${t('finalReconcile.voidedAfterPay2', 'after payment')}`, fc(settle.voidedBilledAmount || 0), { count: settle.voidedBilledItems });
    }
    if (orderTypes.length > 0) {
      html += sTitle(t('finalReconcile.orderType', 'ORDER TYPE'));
      orderTypes.forEach(o => { html += sRow(ORDER_TYPE_LABELS[o.type || ''] || o.type || '', fc(o.revenue), { count: o.orders }); });
    }
    if (sources.length > 0) {
      html += sTitle(t('finalReconcile.orderSource', 'ORDER SOURCE'));
      sources.forEach(s => { html += sRow(SOURCE_LABELS[s.source || ''] || s.source || '', fc(s.revenue), { count: s.orders }); });
    }
    html += `<div style="border-bottom:3px double #000;margin:8px 0"></div>`;

    html += `<div style="font-weight:800;font-size:12px;margin:4px 0 4px;letter-spacing:1px">${t('finalReconcile.reconcileTitle', 'PAYMENT RECONCILIATION')}</div>`;
    html += `<table style="width:100%;border-collapse:collapse;font-size:13px">${head}${rows}${tot}</table>`;
    if (notes.trim()) {
      html += `<div style="border-bottom:1px dashed #666;margin:8px 0"></div>`;
      html += `<div style="font-size:12px;font-weight:700;margin-bottom:2px">${t('finalReconcile.notes', 'Notes')}</div>`;
      html += `<div style="font-size:12px;white-space:pre-wrap">${notes.replace(/</g, '&lt;')}</div>`;
    }
    html += `<div style="text-align:center;font-size:11px;color:#333;margin-top:14px;padding-top:8px;border-top:1px dashed #666">${t('finalReconcile.footer', 'Final settlement — reconciled')}</div>`;
    return html;
  };

  // 인쇄 = fire-and-forget(QZ 미연결 시 멈춤 방지). 모달은 안 닫음 — 인쇄 안 돼도 다운로드로 확인 가능.
  const handlePrint = () => {
    const html = buildHTML();
    if (!html) return;
    try { printSettlementReport(html, null); } catch (e) { console.error('[FinalReconcile] print error:', e); }
  };

  // PDF 다운로드 — 프린터 없어도 마감 리포트를 파일로(Daily 와 동일 방식). 80mm 영수증 폭.
  const handleDownload = async () => {
    const html = buildHTML();
    if (!html) return;
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '302px';
      container.style.background = 'white';
      container.innerHTML = html.replace(/<html>|<\/html>|<head>.*?<\/head>|<body>|<\/body>|<!DOCTYPE[^>]*>/gs, '');
      document.body.appendChild(container);
      const canvas = await html2canvas(container, { scale: 2, width: 302, windowWidth: 302, backgroundColor: '#ffffff' });
      document.body.removeChild(container);
      const imgWidth = 80;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [imgWidth, imgHeight] });
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`final-settlement-${selectedDate}.pdf`);
    } catch (error) { console.error('[FinalReconcile] PDF download error:', error); }
  };

  if (!isOpen) return null;

  const overlay: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(10,37,64,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 };
  const modal: React.CSSProperties = { background: '#fff', borderRadius: 12, width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' };
  const head: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #E6EBF1' };
  const inputStyle: React.CSSProperties = { width: 120, padding: '8px 10px', border: '1px solid #C7CED6', borderRadius: 8, textAlign: 'right', fontSize: 15, background: '#fff' };

  return ReactDOM.createPortal(
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>
        <div style={head}>
          <h2 style={{ margin: 0, fontSize: 18, color: '#0A2540' }}>{t('finalReconcile.title', 'Final Settlement')}</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 22, cursor: 'pointer', color: '#6B7C93' }}>✕</button>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <div style={{ marginBottom: 12 }}>
            <DateField value={selectedDate} onChange={(v: string) => setSelectedDate(v)} />
          </div>
          <p style={{ fontSize: 13, color: '#6B7C93', margin: '0 0 12px' }}>{t('finalReconcile.help', 'Enter the actual amount received (card machine / QR totals) and compare with the system record.')}</p>

          {/* 오늘 필요한 정보 (데일리 핵심) — 순매출·주문유형·소스·취소·미결 */}
          {!loading && settle && (summary?.totalOrders || 0) > 0 && (
            <div style={{ border: '1px solid #E6EBF1', borderRadius: 8, padding: '10px 12px', marginBottom: 14, background: '#F8FAFC' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#6B7C93', letterSpacing: 1, marginBottom: 6 }}>{t('finalReconcile.todaySummary', 'TODAY — SALES SUMMARY')}</div>
              {sumRow(t('finalReconcile.netSales', 'Net Sales'), fc(settle.netSales), { strong: true })}
              {sumRow(t('finalReconcile.grossSales', 'Gross Sales'), fc(settle.grossSales))}
              {sumRow(t('finalReconcile.totalOrders', 'Total Orders'), String(summary?.totalOrders || 0))}
              {sumRow(t('finalReconcile.avgOrder', 'Avg Order Value'), fc(summary?.averageOrderValue || 0))}
              {settle.cancelledOrders > 0 && sumRow(t('finalReconcile.cancelled', 'Cancelled'), fc(settle.cancelledAmount), { count: settle.cancelledOrders, danger: true })}
              {settle.outstandingOrders > 0 && sumRow(t('finalReconcile.openOrders', 'Open Orders'), fc(settle.outstandingAmount), { count: settle.outstandingOrders, danger: true })}
              {(settle.voidedItems || 0) > 0 && sumRow(t('finalReconcile.voidedItems', 'Voided Items'), fc(settle.voidedAmount || 0), { count: settle.voidedItems, danger: true })}
              {(settle.voidedBilledItems || 0) > 0 && sumRow(<span style={{ paddingLeft: 12 }}>{t('finalReconcile.voidedAfterPay', '└ after payment')}</span>, fc(settle.voidedBilledAmount || 0), { count: settle.voidedBilledItems, danger: true })}
              {orderTypes.length > 0 && (
                <>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#8898AA', letterSpacing: 0.5, margin: '8px 0 2px' }}>{t('finalReconcile.orderType', 'Order Type')}</div>
                  {orderTypes.map(o => <React.Fragment key={o.type}>{sumRow(ORDER_TYPE_LABELS[o.type || ''] || o.type, fc(o.revenue), { count: o.orders })}</React.Fragment>)}
                </>
              )}
              {sources.length > 0 && (
                <>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#8898AA', letterSpacing: 0.5, margin: '8px 0 2px' }}>{t('finalReconcile.orderSource', 'Order Source')}</div>
                  {sources.map(s => <React.Fragment key={s.source}>{sumRow(SOURCE_LABELS[s.source || ''] || s.source, fc(s.revenue), { count: s.orders })}</React.Fragment>)}
                </>
              )}
            </div>
          )}

          {loading ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#6B7C93' }}>…</div>
          ) : pmSales.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#6B7C93' }}>{t('finalReconcile.noSales', 'No sales for this date.')}</div>
          ) : (
            <>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#6B7C93', letterSpacing: 1, marginBottom: 4 }}>{t('finalReconcile.reconcileTitle', 'PAYMENT RECONCILIATION')}</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ textAlign: 'right', color: '#6B7C93', fontSize: 12 }}>
                  <th style={{ textAlign: 'left', padding: '4px 6px' }}>{t('finalReconcile.method', 'Method')}</th>
                  <th style={{ padding: '4px 6px' }}>{t('finalReconcile.system', 'System')}</th>
                  <th style={{ padding: '4px 6px' }}>{t('finalReconcile.actual', 'Actual')}</th>
                  <th style={{ padding: '4px 6px' }}>{t('finalReconcile.variance', 'Variance')}</th>
                </tr>
              </thead>
              <tbody>
                {pmSales.map(p => {
                  const entered = (actuals[p.method] || '').trim() !== '';
                  const va = num(actuals[p.method] || '') - p.revenue;
                  return (
                    <tr key={p.method} style={{ borderTop: '1px solid #F1F4F8' }}>
                      <td style={{ padding: '8px 6px', color: '#0A2540', fontWeight: 600 }}>{getPaymentMethodLabel(p.method, paymentSettings || undefined)}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fc(p.revenue)}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'right' }}>
                        <input type="number" inputMode="decimal" value={actuals[p.method] || ''} placeholder="0.00"
                          onChange={e => setActuals(prev => ({ ...prev, [p.method]: e.target.value }))}
                          style={inputStyle} />
                      </td>
                      <td style={{ padding: '8px 6px', textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: !entered ? '#C7CED6' : va === 0 ? '#10B981' : '#EF4444' }}>
                        {!entered ? '-' : va === 0 ? '0.00' : (va > 0 ? '+' : '') + fc(va)}
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: '2px solid #0A2540', fontWeight: 700 }}>
                  <td style={{ padding: '10px 6px', color: '#0A2540' }}>{t('finalReconcile.total', 'TOTAL')}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fc(systemTotal)}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{anyActual ? fc(actualTotal) : '-'}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: !anyActual ? '#C7CED6' : varianceTotal === 0 ? '#10B981' : '#EF4444' }}>
                    {!anyActual ? '-' : varianceTotal === 0 ? '0.00' : (varianceTotal > 0 ? '+' : '') + fc(varianceTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
            </>
          )}

          <div style={{ marginTop: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#6B7C93', display: 'block', marginBottom: 4 }}>{t('finalReconcile.notesLabel', 'Notes (reason for variance)')}</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #C7CED6', borderRadius: 8, fontSize: 14, background: '#fff', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '12px 20px', borderTop: '1px solid #E6EBF1' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', border: '1px solid #C7CED6', borderRadius: 8, background: '#fff', color: '#0A2540', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>{t('finalReconcile.close', 'Close')}</button>
          <button onClick={handleDownload} disabled={pmSales.length === 0} style={{ flex: 1, padding: '12px', border: '1px solid #635BFF', borderRadius: 8, background: '#fff', color: '#635BFF', fontWeight: 700, fontSize: 15, cursor: pmSales.length === 0 ? 'default' : 'pointer', opacity: pmSales.length === 0 ? 0.5 : 1 }}>{t('finalReconcile.download', 'Download PDF')}</button>
          <button onClick={handlePrint} disabled={pmSales.length === 0} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: 8, background: pmSales.length === 0 ? '#C7CED6' : '#635BFF', color: '#fff', fontWeight: 700, fontSize: 15, cursor: pmSales.length === 0 ? 'default' : 'pointer' }}>{t('finalReconcile.print', 'Print')}</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FinalReconcilePanel;
