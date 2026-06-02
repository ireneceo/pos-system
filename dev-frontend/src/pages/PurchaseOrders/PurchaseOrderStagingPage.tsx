/**
 * PurchaseOrderStagingPage — 발주 대기 리스트 (Cart submit 후 1차 staging).
 *
 * Cart 제출 → status='draft' 로 모든 PO 생성 → 이 페이지 진입.
 * 외부 supplier (is_system_registered=false) PO 는 PDF 다운로드 / WhatsApp / 마킹 액션 노출.
 * 시스템 supplier 는 자동 발송 안내만 표시.
 *
 * 모든 처리 후 "전체 발주 확정" 버튼 → 시스템 PO submit (자동 알림) + 외부 PO mark-sent-external.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import AlertDialog from '../../components/Common/AlertDialog';

interface POItem { id: number; ingredient_id: number; quantity_ordered: string; unit_price: string; }
interface POSeller { id: number; name: string; phone?: string | null; email?: string | null; is_system_registered: boolean; }
interface POStaging {
  id: number;
  po_number: string;
  seller_type: string;
  seller_entity_id: number | null;
  seller?: POSeller | null;
  status: string;
  total_amount: string;
  currency: string;
  expected_delivery_date?: string | null;
  delivery_address?: string | null;
  items?: POItem[];
}

const PageHeader = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PageTitle = styled.h1` font-size: 24px; font-weight: 700; color: #0A2540; margin: 0; `;
const PageSub = styled.div` font-size: 13px; color: #4B5563; margin-top: 4px; `;

const POList = styled.div` display: flex; flex-direction: column; gap: 16px; max-width: 920px; margin: 0 auto; padding: 24px 0; `;

const POCard = styled.div<{ $external: boolean }>`
  background: white;
  border: 1px solid ${p => p.$external ? '#FBCFE8' : '#C7CED6'};
  border-radius: 12px;
  padding: 18px 22px;
  border-left: 4px solid ${p => p.$external ? '#DB2777' : '#635BFF'};
`;
const POHead = styled.div` display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px; `;
const POSellerBox = styled.div``;
const POSellerName = styled.div` font-size: 16px; font-weight: 600; color: #0A2540; `;
const POMeta = styled.div` font-size: 12px; color: #4B5563; margin-top: 3px; `;
const POBadge = styled.span<{ $external: boolean }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  background: ${p => p.$external ? '#FCE7F3' : '#EEF2FF'};
  color: ${p => p.$external ? '#9D174D' : '#635BFF'};
  margin-left: 8px;
`;
const POAmount = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
`;
const ItemsBlock = styled.div`
  font-size: 13px;
  color: #475569;
  padding: 10px 12px;
  background: #F1F4F8;
  border-radius: 8px;
  margin-bottom: 12px;
  line-height: 1.6;
`;
const Actions = styled.div` display: flex; gap: 8px; flex-wrap: wrap; `;
const InfoLine = styled.div`
  font-size: 12px;
  color: #635BFF;
  background: #EEF2FF;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
`;
const SubmitBar = styled.div`
  position: sticky;
  bottom: 0;
  background: white;
  border-top: 1px solid #C7CED6;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4px 16px rgba(15, 23, 42, 0.04);
`;
const Empty = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: #4B5563;
  font-size: 14px;
`;

const PurchaseOrderStagingPage: React.FC = () => {
  const { t } = useTranslation('purchaseOrders');
  const navigate = useNavigate();
  const [pos, setPos] = useState<POStaging[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertDlg, setAlertDlg] = useState<{ title: string; message: string } | null>(null);

  const fetchDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-orders?status=draft', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const j = await res.json();
      if (res.ok && j.success) {
        setPos(Array.isArray(j.data) ? j.data : []);
      } else {
        setPos([]);
      }
    } catch { setPos([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchDrafts(); }, [fetchDrafts]);

  const externalPOs = useMemo(() => pos.filter(p => p.seller && !p.seller.is_system_registered), [pos]);
  const systemPOs = useMemo(() => pos.filter(p => !p.seller || p.seller.is_system_registered), [pos]);
  const grandTotal = useMemo(() => pos.reduce((s, p) => s + (parseFloat(p.total_amount) || 0), 0), [pos]);

  const downloadPDF = (po: POStaging) => {
    const token = getAuthToken();
    // PDF endpoint 는 HTML auto-print — 새 탭에서 열기 (token URL param 으로 전달은 불가; 동일 origin cookie 또는 GET 직접 fetch)
    fetch(`/api/purchase-orders/${po.id}/pdf`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.text())
      .then(html => {
        const w = window.open('', '_blank');
        if (w) { w.document.write(html); w.document.close(); }
      });
  };

  const shareViaWhatsApp = (po: POStaging) => {
    if (!po.seller?.phone) {
      setAlertDlg({ title: t('staging.noPhoneTitle', 'No Phone Number') as string, message: t('staging.noPhone', '공급업체 전화번호가 등록되지 않았습니다.') as string });
      return;
    }
    const phone = po.seller.phone.replace(/\D/g, '');
    const text = encodeURIComponent(
      `[Purchase Order ${po.po_number || '#' + po.id}]\n\n` +
      `Items: ${(po.items || []).length}\n` +
      `Total: ${po.currency || 'MYR'} ${parseFloat(po.total_amount || '0').toFixed(2)}\n` +
      `${po.expected_delivery_date ? 'Expected: ' + po.expected_delivery_date + '\n' : ''}` +
      `\n발주서 PDF 가 별도로 전달됩니다.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const shareViaEmail = (po: POStaging) => {
    if (!po.seller?.email) {
      setAlertDlg({ title: t('staging.noEmailTitle', 'No Email') as string, message: t('staging.noEmail', '공급업체 이메일이 등록되지 않았습니다.') as string });
      return;
    }
    const subject = encodeURIComponent(`Purchase Order ${po.po_number || '#' + po.id}`);
    const body = encodeURIComponent(
      `Dear ${po.seller.name},\n\nWe would like to place a purchase order:\n\n` +
      `PO #: ${po.po_number || po.id}\n` +
      `Total: ${po.currency || 'MYR'} ${parseFloat(po.total_amount || '0').toFixed(2)}\n` +
      `Items: ${(po.items || []).length}\n` +
      `${po.expected_delivery_date ? 'Expected: ' + po.expected_delivery_date + '\n' : ''}` +
      `${po.delivery_address ? 'Delivery to: ' + po.delivery_address + '\n' : ''}` +
      `\nFull PO attached. Please confirm receipt.\n\nThank you.`
    );
    window.location.href = `mailto:${po.seller.email}?subject=${subject}&body=${body}`;
  };

  const submitAll = async () => {
    if (pos.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const token = getAuthToken();
      // 시스템 PO: /submit (자동 알림). 외부 PO: /mark-sent-external (수동 가정).
      const tasks = pos.map(po => {
        const url = po.seller && !po.seller.is_system_registered
          ? `/api/purchase-orders/${po.id}/mark-sent-external`
          : `/api/purchase-orders/${po.id}/submit`;
        return fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
          .then(r => r.ok ? null : `PO #${po.id} failed (${r.status})`);
      });
      const results = await Promise.all(tasks);
      const errors = results.filter(Boolean) as string[];
      if (errors.length) setError(errors.join(' / '));
      navigate('/pos/purchase-orders/history');
    } catch (e: any) {
      setError(e?.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const renderPO = (po: POStaging, isExternal: boolean) => (
    <POCard key={po.id} $external={isExternal}>
      <POHead>
        <POSellerBox>
          <POSellerName>
            {po.seller?.name || '—'}
            <POBadge $external={isExternal}>
              {isExternal ? t('staging.externalBadge', 'External — manual send') : t('staging.systemBadge', 'Auto-send on submit')}
            </POBadge>
          </POSellerName>
          <POMeta>
            {po.po_number || `#${po.id}`}
            {po.expected_delivery_date ? ` · ${t('staging.expected', 'Expected')}: ${po.expected_delivery_date}` : ''}
          </POMeta>
        </POSellerBox>
        <POAmount>{po.currency || 'MYR'} {parseFloat(po.total_amount || '0').toFixed(2)}</POAmount>
      </POHead>

      {(po.items || []).length > 0 && (
        <ItemsBlock>
          {(po.items || []).slice(0, 5).map(it => (
            <div key={it.id}>· Item #{it.ingredient_id} × {parseFloat(it.quantity_ordered).toFixed(2)} @ {parseFloat(it.unit_price).toFixed(2)}</div>
          ))}
          {(po.items || []).length > 5 && (
            <div style={{ color: '#6B7280' }}>+ {(po.items || []).length - 5} more</div>
          )}
        </ItemsBlock>
      )}

      {isExternal ? (
        <>
          <InfoLine>
            {t('staging.externalHint', 'Send this PO to the supplier via PDF / WhatsApp / email. The system will not auto-send.')}
          </InfoLine>
          <Actions>
            <ThemedButton variant="primary" size="small" onClick={() => downloadPDF(po)}>
              {t('staging.downloadPdf', 'PDF')}
            </ThemedButton>
            <ThemedButton variant="outline" size="small" onClick={() => shareViaWhatsApp(po)}>
              {t('staging.whatsapp', 'WhatsApp')}
            </ThemedButton>
            <ThemedButton variant="outline" size="small" onClick={() => shareViaEmail(po)}>
              {t('staging.email', 'Email')}
            </ThemedButton>
          </Actions>
        </>
      ) : (
        <InfoLine>
          {t('staging.systemHint', 'This PO will be auto-sent to the supplier upon final submit.')}
        </InfoLine>
      )}
    </POCard>
  );

  return (
    <Container>
      <PageHeader>
        <div>
          <PageTitle>{t('staging.title', 'Pending Purchase Orders')}</PageTitle>
          <PageSub>{t('staging.subtitle', 'Review each PO. External suppliers must be sent manually before final submit.')}</PageSub>
        </div>
        <ThemedButton variant="ghost" onClick={() => navigate('/pos/purchase-orders')}>
          {t('staging.back', '← Back to Cart')}
        </ThemedButton>
      </PageHeader>

      <Content style={{ paddingBottom: 80 }}>
        {loading ? (
          <Empty>{t('common:loading', 'Loading…')}</Empty>
        ) : pos.length === 0 ? (
          <Empty>
            <strong>{t('staging.empty.title', 'No pending POs')}</strong>
            <div style={{ marginTop: 8, fontSize: 12 }}>
              {t('staging.empty.desc', 'Submit a cart from /pos/purchase-orders to create draft POs.')}
            </div>
          </Empty>
        ) : (
          <POList>
            {externalPOs.length > 0 && (
              <>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#9D174D', textTransform: 'uppercase', letterSpacing: 0.5, padding: '0 4px' }}>
                  {t('staging.externalSection', 'External Suppliers — Manual Send')} ({externalPOs.length})
                </div>
                {externalPOs.map(p => renderPO(p, true))}
              </>
            )}
            {systemPOs.length > 0 && (
              <>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#635BFF', textTransform: 'uppercase', letterSpacing: 0.5, padding: '0 4px', marginTop: externalPOs.length > 0 ? 16 : 0 }}>
                  {t('staging.systemSection', 'System Suppliers — Auto Send')} ({systemPOs.length})
                </div>
                {systemPOs.map(p => renderPO(p, false))}
              </>
            )}
          </POList>
        )}
      </Content>

      {pos.length > 0 && (
        <SubmitBar>
          <div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>
              {t('staging.summary', { count: pos.length, defaultValue: '{{count}} POs' })}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0A2540', marginTop: 2 }}>
              RM {grandTotal.toFixed(2)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {error && <div style={{ fontSize: 12, color: '#991B1B' }}>{error}</div>}
            <ThemedButton variant="primary" onClick={submitAll} disabled={submitting}>
              {submitting
                ? t('staging.submitting', 'Submitting…')
                : t('staging.submitAll', 'Submit All')}
            </ThemedButton>
          </div>
        </SubmitBar>
      )}
      <AlertDialog
        isOpen={!!alertDlg}
        onClose={() => setAlertDlg(null)}
        title={alertDlg?.title || ''}
        message={alertDlg?.message || ''}
      />
    </Container>
  );
};

export default PurchaseOrderStagingPage;
