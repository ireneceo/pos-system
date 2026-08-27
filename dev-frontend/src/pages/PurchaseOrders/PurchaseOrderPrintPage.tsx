/**
 * Purchase Order Print Page — Sprint 6 (2026-04-27).
 *
 * Renders a printable A4-friendly view of a PO.
 * Triggers window.print() automatically once data loads.
 * No PDF dependency — relies on browser print + @media print CSS.
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { formatQuantity } from '../../utils/unitConversion';

interface POItem {
  id: number;
  ingredient_id: number;
  description: string | null;
  quantity_ordered: number | string;
  quantity_received: number | string;
  unit: string | null;
  unit_price: number | string;
  line_total: number | string;
  ingredient?: { id: number; name: string; unit: string };
  /**
   * 공급업체 자기 판매품목 정체성(백엔드 utils/sellerProductIdentity 가 붙여준다).
   * 매핑이 없는 라인·브랜드/푸드코트 판매자는 null → 내부명으로 폴백한다.
   */
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
  ingredient_name?: string | null;
}
interface PODetail {
  id: number;
  po_number: string;
  status: string;
  entity_type: string;
  entity_id: number;
  seller_type: string;
  seller_entity_id: number | null;
  seller_name?: string | null;
  subtotal: number | string;
  total_amount: number | string;
  tax_amount: number | string;
  currency: string;
  expected_delivery_date: string | null;
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
  submitted_at: string | null;
  items: POItem[];
  buyer?: { name?: string; email?: string };
  tracking_info?: any;
}

const PrintRoot = styled.div`
  background: white;
  color: #0A2540;
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  @media print {
    padding: 16px;
    max-width: 100%;
    margin: 0;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #0A2540;
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

const Heading = styled.h1`
  font-size: 26px;
  margin: 0;
  letter-spacing: 1px;
  color: #0A2540;
`;

const Subhead = styled.div`
  font-size: 13px;
  color: #4B5563;
  margin-top: 4px;
`;

const KvBox = styled.div`
  text-align: right;
  font-size: 13px;
  color: #4B5563;
  & strong { color: #0A2540; display: block; font-size: 14px; }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const InfoBox = styled.div`
  border: 1px solid #C7CED6;
  padding: 12px 16px;
  border-radius: 8px;
  & .lbl { font-size: 11px; color: #4B5563; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  & .val { font-size: 14px; color: #0A2540; margin-top: 4px; }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  font-size: 13px;
  th, td { padding: 10px 12px; border-bottom: 1px solid #C7CED6; text-align: left; }
  th { background: #F9FAFB; font-weight: 600; color: #4B5563; font-size: 11px; text-transform: uppercase; letter-spacing: 0.4px; }
  td.num, th.num { text-align: right; font-feature-settings: 'tnum'; }
`;

const Totals = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
  & > div {
    width: 280px;
  }
  & .row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; }
  & .row.total { border-top: 2px solid #0A2540; padding-top: 8px; margin-top: 8px; font-size: 16px; font-weight: 700; }
`;

const NoPrint = styled.div`
  @media print { display: none; }
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const PrintBtn = styled.button`
  padding: 8px 18px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;

const SecBtn = styled.button`
  padding: 8px 18px;
  background: white;
  color: #0A2540;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const formatMoney = (v: number | string | null | undefined, ccy = 'MYR') => {
  if (v == null || v === '') return `${ccy} 0.00`;
  const n = Number(v);
  if (!Number.isFinite(n)) return `${ccy} 0.00`;
  return `${ccy} ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

interface PrintPageProps {
  /**
   * 공급업체 전용 경로(`/pos/supplier/orders/:id/print`)에서 켠다.
   * 판매자 모드를 **경로로 강제**한다 — 쿼리 파라미터에만 맡기면 `?as=seller` 가 빠진 접근이
   * 구매자 엔드포인트를 때려 403 화면이 된다. (2026-08-27)
   */
  forceSellerView?: boolean;
}

const PurchaseOrderPrintPage: React.FC<PrintPageProps> = ({ forceSellerView = false }) => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  // ?as=seller — BG/FG 수신함에서 print 할 때 seller endpoint 사용.
  // 공급업체는 전용 경로가 forceSellerView 로 강제한다(쿼리 없이도 판매자 모드).
  const isSellerView = forceSellerView || searchParams.get('as') === 'seller';
  const { t } = useTranslation('purchaseOrders');
  const [data, setData] = useState<PODetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = getAuthToken();
        const url = isSellerView ? `/api/seller-orders/${id}` : `/api/purchase-orders/${id}`;
        const r = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const d = await r.json();
        if (cancelled) return;
        if (!r.ok || !d.success) {
          setError(d?.message || 'Failed to load purchase order');
          return;
        }
        setData(d.data);
      } catch (err) {
        if (!cancelled) setError('Network error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id, isSellerView]);

  // Auto-trigger print once data loaded (small delay so DOM is painted)
  useEffect(() => {
    if (!data) return;
    const timer = setTimeout(() => {
      try { window.print(); } catch { /* ignore */ }
    }, 400);
    return () => clearTimeout(timer);
  }, [data]);

  if (loading) {
    return <PrintRoot>{t('print.loading', 'Loading…')}</PrintRoot>;
  }
  if (error || !data) {
    return <PrintRoot>{error || t('print.notFound', 'Not found')}</PrintRoot>;
  }

  const ccy = data.currency || 'MYR';
  const items = Array.isArray(data.items) ? data.items : [];

  return (
    <PrintRoot>
      <NoPrint>
        <PrintBtn onClick={() => window.print()}>{t('print.printButton', 'Print')}</PrintBtn>
        <SecBtn onClick={() => window.history.back()}>{t('print.back', 'Back')}</SecBtn>
      </NoPrint>

      <HeaderRow>
        <div>
          <Heading>{t('print.title', 'PURCHASE ORDER')}</Heading>
          <Subhead>{data.po_number}</Subhead>
        </div>
        <KvBox>
          <strong>{data.status.toUpperCase()}</strong>
          <div>{t('print.issued', 'Issued')}: {data.created_at?.slice(0, 10)}</div>
          {data.submitted_at && <div>{t('print.submitted', 'Submitted')}: {data.submitted_at.slice(0, 10)}</div>}
        </KvBox>
      </HeaderRow>

      <TwoCol>
        <InfoBox>
          <div className="lbl">{t('print.buyer', 'Buyer')}</div>
          <div className="val">{data.buyer?.name || `${data.entity_type} #${data.entity_id}`}</div>
          {data.delivery_address && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#4B5563' }}>
              {data.delivery_address}
            </div>
          )}
        </InfoBox>
        <InfoBox>
          <div className="lbl">{t('print.seller', 'Seller')}</div>
          <div className="val">
            {data.seller_name
              || (data.seller_type === 'system_admin' ? 'POS Catalog' : '')
              || `${data.seller_type}${data.seller_entity_id ? ' #' + data.seller_entity_id : ''}`}
          </div>
          {data.expected_delivery_date && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#4B5563' }}>
              {t('print.expectedDelivery', 'Expected delivery')}: {data.expected_delivery_date}
            </div>
          )}
        </InfoBox>
      </TwoCol>

      <Table>
        <thead>
          <tr>
            <th>{t('print.item', 'Item')}</th>
            <th>{t('print.sku', 'SKU')}</th>
            <th className="num">{t('print.qty', 'Qty')}</th>
            <th>{t('print.unit', 'Unit')}</th>
            <th className="num">{t('print.unitPrice', 'Unit Price')}</th>
            <th className="num">{t('print.lineTotal', 'Line Total')}</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', color: '#6B7280' }}>—</td></tr>
          ) : items.map(it => {
            const lt = it.line_total != null
              ? Number(it.line_total)
              : Number(it.quantity_ordered) * Number(it.unit_price);
            // 이 문서는 **공급업체가 받는 문서**다 → 공급업체 자기 판매품목명·SKU 가 주(主),
            // 구매자 내부명은 대조용 참고(부). 매핑이 없는 옛 발주·브랜드 판매자는 내부명만 나온다.
            // (설계: docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md ③-4)
            const internalName = it.ingredient_name || it.ingredient?.name || it.description || `#${it.ingredient_id}`;
            const mainName = it.seller_product_name || internalName;
            const showRef = !!it.seller_product_name && it.seller_product_name !== internalName;
            return (
              <tr key={it.id}>
                <td>
                  {mainName}
                  {showRef && (
                    <div style={{ fontSize: 11, color: '#6B7280' }}>
                      {t('print.buyerRef', 'Buyer ref')}: {internalName}
                    </div>
                  )}
                </td>
                <td>{it.seller_product_sku || '—'}</td>
                <td className="num">{formatQuantity(it.quantity_ordered)}</td>
                <td>{it.unit || it.ingredient?.unit || ''}</td>
                <td className="num">{formatMoney(it.unit_price, ccy)}</td>
                <td className="num">{formatMoney(lt, ccy)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Totals>
        <div>
          <div className="row">
            <span>{t('print.subtotal', 'Subtotal')}</span>
            <span>{formatMoney(data.subtotal, ccy)}</span>
          </div>
          <div className="row">
            <span>{t('print.tax', 'Tax')}</span>
            <span>{formatMoney(data.tax_amount, ccy)}</span>
          </div>
          <div className="row total">
            <span>{t('print.total', 'Total')}</span>
            <span>{formatMoney(data.total_amount, ccy)}</span>
          </div>
        </div>
      </Totals>

      {data.notes && (
        <InfoBox>
          <div className="lbl">{t('print.notes', 'Notes')}</div>
          <div className="val" style={{ whiteSpace: 'pre-wrap' }}>{data.notes}</div>
        </InfoBox>
      )}

      {data.tracking_info?.carrier_name && (
        <div style={{ marginTop: 16, padding: 12, background: '#F9FAFB', borderRadius: 8, fontSize: 12, color: '#4B5563' }}>
          <strong style={{ color: '#0A2540' }}>{t('print.tracking', 'Tracking')}: </strong>
          {data.tracking_info.carrier_name}
          {data.tracking_info.tracking_number && ` · ${data.tracking_info.tracking_number}`}
          {data.tracking_info.estimated_arrival && ` · ETA ${data.tracking_info.estimated_arrival}`}
        </div>
      )}

      <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid #C7CED6', textAlign: 'center', fontSize: 11, color: '#6B7280' }}>
        {t('print.generated', 'Generated')} {new Date().toISOString().slice(0, 16).replace('T', ' ')}
      </div>
    </PrintRoot>
  );
};

export default PurchaseOrderPrintPage;
