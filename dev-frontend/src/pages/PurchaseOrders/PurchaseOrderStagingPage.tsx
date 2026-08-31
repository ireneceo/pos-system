/**
 * PurchaseOrderStagingPage — 발주 대기 리스트 (Cart submit 후 1차 staging).
 *
 * Cart 제출 → status='draft' 로 모든 PO 생성 → 이 페이지 진입.
 * 외부 supplier (is_system_registered=false) PO 는 PDF 다운로드 / WhatsApp / 마킹 액션 노출.
 * 시스템 supplier 는 자동 발송 안내만 표시.
 *
 * 모든 처리 후 "전체 발주 확정" 버튼 → 시스템 PO submit (자동 알림) + 외부 PO mark-sent-external.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { sharePoViaWhatsApp, sharePoViaEmail } from '../../utils/poShare';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from '../../components/UI';
import { Button } from '../../components/UI/Button';
import { Modal } from '../../components/UI/Modal';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatQuantity } from '../../utils/unitConversion';
import { formatDateTime } from '../../utils/dateFormat';
import { useStore } from '../../contexts/StoreContext';
import { renderIframeToPdf } from '../../utils/invoicePdf';
import AlertDialog from '../../components/Common/AlertDialog';
import ConfirmModal from '../../components/ConfirmModal';

interface POItem {
  id: number; ingredient_id: number; quantity_ordered: string; unit_price: string; created_at?: string | null;
  // 수량을 따라다니는 단위(kg/g/L/piece…). 발주 라인에 이미 저장돼 있는데 이 화면만 안 쓰고 있었다.
  unit?: string | null;
  // 공급업체 자기 판매품목 정체성 — 목록 API 가 이미 내려준다(utils/sellerProductIdentity).
  // 내부 재고명과 실제로 다르다: 우리 `Cheddar Cheese` ↔ 공급업체 `Fresh Whole Milk`.
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
  product_name?: string | null;
  ingredient_name?: string | null;
}

/**
 * 품목 표시 기준 — 2026-08-31 Irene: "공급업체 상품명으로 표시 또는 우리 재고명으로 표시
 * 라는 표시방법 2가지 따로 있으면 안돼?"
 * 기본값은 `seller` — 이 화면에서 하는 일이 **공급업체에 발주를 보내는 것**이라,
 * 받는 쪽이 자기 창고에서 대조할 이름이 기본으로 보여야 한다.
 * 선택은 브라우저에 기억시킨다(사용자별 편의값 — 서버 상태가 아니다).
 */
type NameMode = 'seller' | 'internal';
const NAME_MODE_KEY = 'po.staging.nameMode';
function loadNameMode(): NameMode {
  try {
    const v = localStorage.getItem(NAME_MODE_KEY);
    return v === 'internal' ? 'internal' : 'seller';
  } catch { return 'seller'; }
}
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
  // 2026-08-30 Irene: "담은 날짜가 안 보인다" — 스키마에 이미 있던 값을 표시만 한다(신설 없음).
  created_at?: string | null;
  items?: POItem[];
}

const PageHeader = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 0;
    max-height: none;
  }
`;
const PageTitle = styled.h1` font-size: 24px; font-weight: 700; color: #0A2540; margin: 0; `;

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
/**
 * 합계·전체제출 바 — 2026-08-31 Irene: "이 내용은 푸터에 하단에 붙어서 계속 하단 따라다녀야지."
 *
 * `position: sticky; bottom: 0` 만으로는 부족했다. 스티키는 **자기 컨테이닝 블록 안에서만** 움직이는데,
 * 이 바는 `Container` 의 마지막 자식이라 컨테이너 끝(= 콘텐츠 끝)이 곧 정착점이 된다.
 * 그래서 목록이 짧으면 화면 중간에 떠 있고, 스크롤을 끝까지 내리기 전에는 하단에 붙지 않았다.
 * → `Container` 를 flex column 으로 만들고 `Content` 에 flex:1 을 줘서, 목록이 짧든 길든
 *   바가 항상 뷰포트 하단에 오도록 한다(짧을 때는 밀려서 바닥, 길 때는 스티키로 고정).
 * z-index 는 카드 위에 뜨게. 아이폰 홈바 대비 safe-area 패딩.
 */
const SubmitBar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 5;
  background: white;
  border-top: 1px solid #C7CED6;
  padding: 16px 32px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4px 16px rgba(15, 23, 42, 0.08);

  @media (max-width: 768px) {
    padding: 12px 16px;
    padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  }
`;

/**
 * 품목명 표시방법 전환 (공급업체 상품명 ↔ 우리 재고명).
 * ⚠ 버튼은 **공용 `components/UI/Button`** 을 쓴다 — 페이지 안에서 버튼 스타일 컴포넌트를
 *   새로 만드는 것은 CLAUDE.md "🎨 디자인 단일 기준" 위반이고 design-guard 가 잡는다.
 *   여기서는 두 버튼을 한 덩어리로 묶는 래퍼(div)만 만든다.
 */
const NameModeToggle = styled.div`
  display: inline-flex;
  gap: 6px;
`;
const Empty = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: #4B5563;
  font-size: 14px;
`;

const PdfActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
`;

// 발주서 문서 미리보기 — A4 비율. 서버가 주는 인쇄용 HTML 을 그대로 띄운다.
const PdfFrame = styled.iframe`
  width: 100%;
  height: 60vh;
  min-height: 420px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: white;
`;

const PurchaseOrderStagingPage: React.FC = () => {
  const { t } = useTranslation('purchaseOrders');
  const navigate = useNavigate();
  // 날짜 표시는 브라우저 로컬이 아니라 **매장 타임존** 기준(프로젝트 절대 규칙).
  const { operationSettings } = useStore();
  const storeTimeZone = operationSettings?.timeZone || 'Asia/Kuala_Lumpur';
  const [pos, setPos] = useState<POStaging[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertDlg, setAlertDlg] = useState<{ title: string; message: string } | null>(null);
  const [discardTarget, setDiscardTarget] = useState<POStaging | null>(null);
  const [discarding, setDiscarding] = useState(false);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  // PDF 미리보기 — 열자마자 인쇄창이 뜨지 않고 문서를 먼저 보여준다(2026-07-12 Irene).
  const [pdfPreview, setPdfPreview] = useState<{ po: POStaging; html: string } | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);
  const pdfFrameRef = useRef<HTMLIFrameElement | null>(null);
  // 오너 승인이 필요한 매장이면 **승인 전에 공급업체로 보내면 안 된다**.
  // (서버는 이미 pending_approval 로 막지만, 화면이 WhatsApp/Email 발송을 권하면 통제가 무의미해진다.)
  const [needsOwnerApproval, setNeedsOwnerApproval] = useState(false);
  const [nameMode, setNameMode] = useState<NameMode>(loadNameMode);

  const changeNameMode = (m: NameMode) => {
    setNameMode(m);
    try { localStorage.setItem(NAME_MODE_KEY, m); } catch { /* 사생활 모드 등 — 저장 실패해도 화면은 동작 */ }
  };

  /**
   * 한 줄에 보일 품목명.
   * `seller` 모드라도 공급업체 판매품목 매핑이 없는 라인(외부 판매자·옛 발주)은 내부명으로 폴백한다 —
   * 빈칸이 되면 무엇을 주문했는지조차 안 보인다.
   */
  const itemLabel = (it: POItem): string => {
    const internal = it.product_name || it.ingredient_name || `Item #${it.ingredient_id}`;
    if (nameMode === 'internal') return internal;
    return it.seller_product_name || internal;
  };

  const { user } = useAuth();
  useEffect(() => {
    const rid = (user as any)?.restaurant_id || (user as any)?.restaurantId;
    if (!rid) return;
    (async () => {
      try {
        const res = await fetch(`/api/restaurants/${rid}`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
        const j = await res.json();
        const data = j?.data || j;
        const hasOwner = Array.isArray(data?.managers) && data.managers.some((m: any) => m.role === 'Restaurant Owner');
        const setting = data?.operation_settings?.requirePoOwnerApproval;
        setNeedsOwnerApproval(!!hasOwner && setting !== false);
      } catch { /* 조회 실패 시 기존 동작 유지 */ }
    })();
  }, [user]);

  const fetchDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      // 2026-06-22 (Irene "같은 공급업체는 합쳐라"): 열 때마다 같은 공급업체 draft 를 한 PO 로 통합한 뒤 조회.
      try { await fetch('/api/purchase-orders/consolidate-drafts', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }); } catch { /* non-fatal */ }
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

  // draft PO 폐기 — staging 에 쌓인 발송 전 draft 를 개별 제거(완전 삭제). 카트와 달리 staging 은
  // 누적 검토 영역이라 빼는 수단이 필요. DELETE /purchase-orders/:id (draft 전용, 서버 가드).
  const doDiscard = async () => {
    if (!discardTarget) return;
    setDiscarding(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${discardTarget.id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
      });
      const j = await res.json().catch(() => null);
      if (res.ok && j?.success) {
        setPos(prev => prev.filter(p => p.id !== discardTarget.id));
        setDiscardTarget(null);
      } else {
        setAlertDlg({ title: t('common:error', 'Error') as string, message: j?.message || (t('staging.discardFailed', 'Failed to discard PO') as string) });
      }
    } catch {
      setAlertDlg({ title: t('common:error', 'Error') as string, message: t('staging.discardFailed', 'Failed to discard PO') as string });
    } finally { setDiscarding(false); }
  };

  const externalPOs = useMemo(() => pos.filter(p => p.seller && !p.seller.is_system_registered), [pos]);
  const systemPOs = useMemo(() => pos.filter(p => !p.seller || p.seller.is_system_registered), [pos]);
  const grandTotal = useMemo(() => pos.reduce((s, p) => s + (parseFloat(p.total_amount) || 0), 0), [pos]);

  // 발주서 미리보기 — 서버 HTML 을 그대로 쓰되 auto-print 스크립트는 제거한다.
  // (예전엔 새 탭을 열자마자 브라우저 인쇄창이 떴다. 문서를 먼저 보고 다운로드/인쇄를 고르게 한다.)
  const openPdfPreview = async (po: POStaging) => {
    setPdfBusy(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${po.id}/pdf`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        setAlertDlg({ title: t('common:error', 'Error') as string, message: t('staging.pdfFailed', 'Failed to load the purchase order document') as string });
        return;
      }
      const html = (await res.text()).replace(/<script[\s\S]*?window\.print[\s\S]*?<\/script>/gi, '');
      setPdfPreview({ po, html });
    } catch {
      setAlertDlg({ title: t('common:error', 'Error') as string, message: t('staging.pdfFailed', 'Failed to load the purchase order document') as string });
    } finally {
      setPdfBusy(false);
    }
  };

  // 실제 PDF 파일로 저장 (인쇄창의 'PDF로 저장'이 아니라 파일 다운로드) — 상세 페이지와 동일 유틸
  const downloadPdfFile = async () => {
    const frame = pdfFrameRef.current;
    if (!frame || !pdfPreview) return;
    setPdfBusy(true);
    try {
      await renderIframeToPdf(frame, `${pdfPreview.po.po_number || `PO-${pdfPreview.po.id}`}.pdf`);
    } catch (e) {
      console.error('download PO pdf failed:', e);
      setAlertDlg({ title: t('common:error', 'Error') as string, message: t('staging.pdfDownloadFailed', 'Failed to download PDF') as string });
    } finally {
      setPdfBusy(false);
    }
  };

  const printPdfPreview = () => {
    const win = pdfFrameRef.current?.contentWindow;
    if (!win) return;
    win.focus();
    win.print();
  };

  // 공유 메시지 빌더는 utils/poShare 단일 소스 — 발주 상세도 같은 함수를 쓴다(문구 갈라짐 방지)
  const shareViaWhatsApp = (po: POStaging) => sharePoViaWhatsApp(po as any, formatQuantity);

  const shareViaEmail = (po: POStaging) => {
    const sent = sharePoViaEmail(po as any, formatQuantity);
    if (!sent) {
      setAlertDlg({
        title: t('staging.noEmailTitle', 'No Email') as string,
        message: t('staging.noEmail', 'No email address is registered for this seller.') as string
      });
    }
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

  // 업체별 개별 제출 (2026-07-12 Irene): PO 는 업체별로 따로 발행·인보이스도 따로다.
  // 따라서 카드마다 자기 발주만 완료할 수 있어야 한다. 엔드포인트는 submitAll 과 동일
  // (시스템 = /submit 자동발송, 외부 = /mark-sent-external 수동발송 표시).
  const submitOne = async (po: POStaging) => {
    const isExternal = !!(po.seller && !po.seller.is_system_registered);
    setSubmittingId(po.id);
    setError(null);
    try {
      const token = getAuthToken();
      const url = isExternal
        ? `/api/purchase-orders/${po.id}/mark-sent-external`
        : `/api/purchase-orders/${po.id}/submit`;
      const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setAlertDlg({
          title: t('common:error', 'Error') as string,
          message: j?.message || (t('staging.submitFailed', 'Failed to submit this purchase order') as string)
        });
        return;
      }
      // 제출된 카드만 사라진다. 남은 draft 가 없으면 발주 내역으로 이동.
      const remaining = pos.filter(p => p.id !== po.id);
      if (remaining.length === 0) { navigate('/pos/purchase-orders/history'); return; }
      fetchDrafts();
    } catch (e: any) {
      setAlertDlg({ title: t('common:error', 'Error') as string, message: e?.message || 'Network error' });
    } finally {
      setSubmittingId(null);
    }
  };

  // 아이템별 삭제 (draft). 마지막 품목이면 서버가 PO 도 함께 삭제 → 목록 갱신.
  const removeItem = async (poId: number, itemId: number) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${poId}/items/${itemId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const j = await res.json().catch(() => null);
      if (res.ok && j?.success) { fetchDrafts(); }
      else setAlertDlg({ title: t('common:error', 'Error') as string, message: j?.message || (t('staging.removeItemFailed', 'Failed to remove item') as string) });
    } catch {
      setAlertDlg({ title: t('common:error', 'Error') as string, message: t('staging.removeItemFailed', 'Failed to remove item') as string });
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
            {po.created_at ? ` · ${t('staging.addedAt', 'Added')}: ${formatDateTime(po.created_at, storeTimeZone)}` : ''}
            {po.expected_delivery_date ? ` · ${t('staging.expected', 'Expected')}: ${po.expected_delivery_date}` : ''}
          </POMeta>
        </POSellerBox>
        <POAmount>{po.currency || 'MYR'} {parseFloat(po.total_amount || '0').toFixed(2)}</POAmount>
      </POHead>

      {(po.items || []).length > 0 && (
        <ItemsBlock>
          {(po.items || []).map(it => (
            <div key={it.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span>· {itemLabel(it)} × {formatQuantity(it.quantity_ordered)}{it.unit ? ` ${it.unit}` : ''} @ {parseFloat(it.unit_price).toFixed(2)}</span>
              <button type="button" onClick={() => removeItem(po.id, it.id)} title={t('staging.removeItem', 'Remove item') as string}
                style={{ border: 'none', background: 'transparent', color: '#9CA3AF', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>
          ))}
        </ItemsBlock>
      )}

      {isExternal ? (
        <>
          <InfoLine>
            {needsOwnerApproval
              ? t('staging.externalHintApproval', 'This purchase order needs Owner approval before it can be sent to the supplier. Sharing is enabled once approved.')
              : t('staging.externalHint', 'Send this PO to the supplier via PDF / WhatsApp / email. The system will not auto-send.')}
          </InfoLine>
          <Actions>
            <ThemedButton variant="outline" size="small" onClick={() => openPdfPreview(po)}>
              {t('staging.downloadPdf', 'PDF')}
            </ThemedButton>
            {/* 승인 필요 매장에서는 승인 전 발송을 화면이 권하지 않는다 — 승인 후 상세 페이지에서 발송한다 */}
            <ThemedButton
              variant="outline"
              size="small"
              onClick={() => shareViaWhatsApp(po)}
              disabled={needsOwnerApproval}
              title={needsOwnerApproval ? (t('staging.sendAfterApproval', 'Available after Owner approval') as string) : undefined}
            >
              {t('staging.whatsapp', 'WhatsApp')}
            </ThemedButton>
            <ThemedButton
              variant="outline"
              size="small"
              onClick={() => shareViaEmail(po)}
              disabled={needsOwnerApproval}
              title={needsOwnerApproval ? (t('staging.sendAfterApproval', 'Available after Owner approval') as string) : undefined}
            >
              {t('staging.email', 'Email')}
            </ThemedButton>
            <Button variant="primary" size="small" onClick={() => submitOne(po)} disabled={submittingId === po.id}>
              {submittingId === po.id
                ? t('staging.submitting', 'Submitting…')
                : needsOwnerApproval
                  ? t('staging.submitForApproval', 'Submit for approval')
                  : t('staging.markSent', 'Mark as Sent')}
            </Button>
            <Button variant="danger-outline" size="small" onClick={() => setDiscardTarget(po)}>
              {t('staging.discard', 'Discard')}
            </Button>
          </Actions>
        </>
      ) : (
        <>
          <InfoLine>
            {t('staging.systemHint', 'This PO will be auto-sent to the supplier upon final submit.')}
          </InfoLine>
          <Actions>
            <Button variant="primary" size="small" onClick={() => submitOne(po)} disabled={submittingId === po.id}>
              {submittingId === po.id
                ? t('staging.submitting', 'Submitting…')
                : t('staging.submitOne', 'Submit')}
            </Button>
            <Button variant="danger-outline" size="small" onClick={() => setDiscardTarget(po)}>
              {t('staging.discard', 'Discard')}
            </Button>
          </Actions>
        </>
      )}
    </POCard>
  );

  return (
    // flex column + Content flex:1 — 목록이 짧아도 SubmitBar 가 하단에 붙어 있게 (위 SubmitBar 주석 참조)
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <PageHeader>
        <div>
          <PageTitle>{t('staging.title', 'Pending Purchase Orders')}</PageTitle>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* 표시방법 2가지 — 공급업체 상품명 / 우리 재고명 (2026-08-31 Irene) */}
          <NameModeToggle role="group" aria-label={t('staging.nameMode.label', 'Item name display') as string}>
            <Button
              type="button"
              size="small"
              variant={nameMode === 'seller' ? 'primary' : 'secondary'}
              onClick={() => changeNameMode('seller')}
            >
              {t('staging.nameMode.seller', 'Supplier product name')}
            </Button>
            <Button
              type="button"
              size="small"
              variant={nameMode === 'internal' ? 'primary' : 'secondary'}
              onClick={() => changeNameMode('internal')}
            >
              {t('staging.nameMode.internal', 'Our stock name')}
            </Button>
          </NameModeToggle>
          <ThemedButton variant="ghost" onClick={() => navigate('/pos/purchase-orders')}>
            {t('staging.back', '← Back to Cart')}
          </ThemedButton>
        </div>
      </PageHeader>

      <Content style={{ flex: 1, paddingBottom: 80 }}>
        {loading && pos.length === 0 ? (
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

      <ConfirmModal
        isOpen={!!discardTarget}
        title={t('staging.discardConfirm.title', 'Discard this PO?') as string}
        message={t('staging.discardConfirm.desc', 'This draft PO will be permanently removed. It has not been sent to the supplier.') as string}
        onConfirm={doDiscard}
        onCancel={() => !discarding && setDiscardTarget(null)}
        confirmText={(discarding ? t('staging.discarding', 'Discarding…') : t('staging.discard', 'Discard')) as string}
        cancelText={t('common:cancel', 'Cancel') as string}
        type="danger"
      />

      {/* 발주서 미리보기 — 문서를 먼저 보여주고, 다운로드/인쇄는 위·아래 양쪽에서 고른다 */}
      <Modal
        isOpen={!!pdfPreview}
        onClose={() => setPdfPreview(null)}
        title={`${t('staging.pdfPreview', 'Purchase Order')} · ${pdfPreview?.po.po_number || ''}`}
        maxWidth="900px"
        headerActions={
          <PdfActions>
            <Button variant="primary" size="small" onClick={downloadPdfFile} disabled={pdfBusy}>
              {t('staging.pdfDownload', 'Download PDF')}
            </Button>
            <Button variant="secondary" size="small" onClick={printPdfPreview} disabled={pdfBusy}>
              {t('staging.pdfPrint', 'Print')}
            </Button>
          </PdfActions>
        }
        footer={
          <PdfActions>
            <Button variant="primary" onClick={downloadPdfFile} disabled={pdfBusy}>
              {t('staging.pdfDownload', 'Download PDF')}
            </Button>
            <Button variant="secondary" onClick={printPdfPreview} disabled={pdfBusy}>
              {t('staging.pdfPrint', 'Print')}
            </Button>
          </PdfActions>
        }
      >
        <PdfFrame
          ref={pdfFrameRef}
          title={pdfPreview?.po.po_number || 'purchase-order'}
          srcDoc={pdfPreview?.html || ''}
        />
      </Modal>
    </Container>
  );
};

export default PurchaseOrderStagingPage;
