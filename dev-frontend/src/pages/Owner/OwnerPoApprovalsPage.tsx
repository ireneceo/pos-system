import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton, ModalBody, ModalFooter,
  FormGroup, FormLabel
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import AlertDialog from '../../components/Common/AlertDialog';
import { Modal } from '../../components/UI/Modal';
import { Button } from '../../components/UI/Button';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';
import { formatQuantity } from '../../utils/unitConversion';
import { renderIframeToPdf } from '../../utils/invoicePdf';
import { sharePoViaWhatsApp, sharePoViaEmail } from '../../utils/poShare';
import { setOwnerPoRestaurantId } from '../../utils/ownerPoScope';

interface PendingPO {
  id: number;
  po_number: string;
  restaurant_name: string | null;
  seller_name?: string | null;
  seller_type?: string;
  item_count?: number;
  items?: Array<{ id: number }>;
  total_amount: number | string;
  currency?: string;
  created_at: string;
  /** 발주 주인 매장 — 상세·PDF 를 그 매장 전환(?entity_type=restaurant&entity_id=)으로 연다 */
  entity_id: number;
  /** 외부(앱 미사용) 공급업체 — 서버 목록·상세와 같은 해석기(utils/sellerNames.isExternalSeller) */
  is_external?: boolean;
}

/**
 * 오너 승인 화면 = «승인 뒤 보내기»까지 끝나는 화면 (2026-10-04 Fable 판정 owner-po-on-behalf §5).
 *  - 가입 공급업체: 승인 = 공급업체 앱으로 전달(서버 통지).
 *  - 외부 공급업체: 시스템이 보내지 않는다 → 승인 뒤 이 화면(또는 상세)에서 WhatsApp·PDF·이메일로 보낸다.
 *  - 승인 전에는 WhatsApp·Email 잠금(승인 안 된 발주를 공급업체에 보내지 않는다). PDF 보기는 검토용으로 열림.
 *  - 방금 승인한 행은 화면 상태로만 남는다(새 DB 칸 0) — 떠나면 사라지고 이후는 상세 화면에서 보낸다.
 */
const scopedUrl = (url: string, row: PendingPO) =>
  `${url}${url.includes('?') ? '&' : '?'}entity_type=restaurant&entity_id=${row.entity_id}`;

// 발주서 문서 미리보기 — 발주 확정(Staging) 화면과 같은 틀(A4 비율, 서버 인쇄용 HTML 그대로)
const PdfFrame = styled.iframe`
  width: 100%;
  height: 60vh;
  min-height: 420px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: white;
`;

const PdfActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
`;

const ReasonTextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  color: #1F2937;
  background: #FFFFFF;
  box-sizing: border-box;
  resize: vertical;
  &:focus { outline: none; border-color: #635BFF; }
  &::placeholder { color: #9CA3AF; }
`;

const OwnerPoApprovalsPage: React.FC = () => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const navigate = useNavigate();
  const [rows, setRows] = useState<PendingPO[]>([]);
  // 방금 승인한 발주 — id → 공유용 상세(판매자 연락처·품목명). 상세를 미리 받아 두어야
  // WhatsApp 클릭이 동기 호출이 되어 팝업 차단에 안 걸린다.
  const [approved, setApproved] = useState<Record<number, any | null>>({});
  const [pdfPreview, setPdfPreview] = useState<{ row: PendingPO; html: string } | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);
  const pdfFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);

  const [approveTarget, setApproveTarget] = useState<PendingPO | null>(null);
  const [rejectTarget, setRejectTarget] = useState<PendingPO | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-orders/pending-approval', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      setRows(res.ok && json.success && Array.isArray(json.data) ? json.data : []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const formatMoney = (amount: number | string | null | undefined, currency?: string) => {
    if (amount == null) return '-';
    const n = Number(amount);
    if (!Number.isFinite(n)) return '-';
    return formatCurrency(n, currency || 'MYR');
  };

  const itemCount = (r: PendingPO) => r.item_count ?? (Array.isArray(r.items) ? r.items.length : 0);

  const doApprove = async () => {
    if (!approveTarget) return;
    const target = approveTarget;
    setApproveTarget(null);
    setBusyId(target.id);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${target.id}/approve`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('approve failed');
      // 행을 지우지 않고 «방금 승인» 띠로 남긴다(목록 재조회 안 함 — 재조회하면 승인된 행이 빠진다)
      setApproved(prev => ({ ...prev, [target.id]: null }));
      try {
        const dres = await fetch(scopedUrl(`/api/purchase-orders/${target.id}`, target), {
          headers: { Authorization: `Bearer ${token}` }
        });
        const djson = await dres.json();
        if (dres.ok && djson.success && djson.data) {
          setApproved(prev => ({ ...prev, [target.id]: djson.data }));
        }
      } catch { /* 공유 상세를 못 받아도 승인은 끝났다 — 상세 화면에서 보낼 수 있다 */ }
    } catch {
      setAlert({ title: t('ownerApprovals.approve'), message: t('ownerApprovals.actionFailed') });
    } finally {
      setBusyId(null);
    }
  };

  const openDetail = (row: PendingPO) => {
    setOwnerPoRestaurantId(Number(row.entity_id));
    navigate(`/pos/purchase-orders/${row.id}`);
  };

  const openPdfPreview = async (row: PendingPO) => {
    setPdfBusy(true);
    try {
      const token = getAuthToken();
      const res = await fetch(scopedUrl(`/api/purchase-orders/${row.id}/pdf`, row), {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        setAlert({ title: t('common:error.title', 'Error') as string, message: t('staging.pdfFailed') as string });
        return;
      }
      const html = (await res.text()).replace(/<script[\s\S]*?window\.print[\s\S]*?<\/script>/gi, '');
      setPdfPreview({ row, html });
    } catch {
      setAlert({ title: t('common:error.title', 'Error') as string, message: t('staging.pdfFailed') as string });
    } finally {
      setPdfBusy(false);
    }
  };

  const downloadPdfFile = async () => {
    const frame = pdfFrameRef.current;
    if (!frame || !pdfPreview) return;
    setPdfBusy(true);
    try {
      await renderIframeToPdf(frame, `${pdfPreview.row.po_number || `PO-${pdfPreview.row.id}`}.pdf`);
    } catch {
      setAlert({ title: t('common:error.title', 'Error') as string, message: t('staging.pdfDownloadFailed') as string });
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

  const shareEmail = (row: PendingPO) => {
    const d = approved[row.id];
    if (!d) return;
    if (!sharePoViaEmail(d, formatQuantity)) {
      setAlert({ title: t('staging.noEmailTitle') as string, message: t('staging.noEmail') as string });
    }
  };

  const doReject = async () => {
    if (!rejectTarget) return;
    const reason = rejectReason.trim();
    if (!reason) return;
    const target = rejectTarget;
    setBusyId(target.id);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/purchase-orders/${target.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reason })
      });
      if (!res.ok) throw new Error('reject failed');
      setRejectTarget(null);
      setRejectReason('');
      await load();
    } catch {
      setAlert({ title: t('ownerApprovals.reject'), message: t('ownerApprovals.actionFailed') });
    } finally {
      setBusyId(null);
    }
  };

  const pendingCount = useMemo(() => rows.filter(r => !(r.id in approved)).length, [rows, approved]);

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('ownerApprovals.title')}</Title>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
            {t('ownerApprovals.subtitle')}
          </div>
        </div>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard>
            <StatValue>{pendingCount}</StatValue>
            <StatLabel>{t('ownerApprovals.pending')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>{t('ownerApprovals.table.poNumber')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('ownerApprovals.table.restaurant')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('ownerApprovals.table.seller')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('ownerApprovals.table.items')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('ownerApprovals.table.total')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('list.table.status')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('ownerApprovals.table.createdAt')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('ownerApprovals.table.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading && rows.length === 0 ? (
                <tr><td colSpan={8}><DataTableEmpty>{t('ownerApprovals.loading')}</DataTableEmpty></td></tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <DataTableEmpty>
                      <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600, color: '#1F2937' }}>
                        {t('ownerApprovals.empty.title')}
                      </div>
                      <div style={{ fontSize: 13, color: '#4B5563' }}>
                        {t('ownerApprovals.empty.hint')}
                      </div>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                rows.map(row => {
                  const isApproved = row.id in approved;
                  const shareDetail = approved[row.id];
                  // 승인 전에는 보내기 잠금 · 승인 직후엔 공유 상세를 받은 뒤 열린다
                  const shareDisabled = !isApproved || !shareDetail;
                  const shareTitle = !isApproved ? (t('ownerApprovals.sendAfterApprove') as string) : undefined;
                  return (
                  <React.Fragment key={row.id}>
                  <DataTableRow>
                    <DataTableCell data-label={t('ownerApprovals.table.poNumber') as string}>
                      <span style={{ fontWeight: 700, color: '#1F2937' }}>{row.po_number}</span>
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.restaurant') as string}>
                      {row.restaurant_name || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.seller') as string}>
                      {row.seller_name || '-'}
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.items') as string} align="center">
                      {itemCount(row)}
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.total') as string} align="right">
                      {formatMoney(row.total_amount, row.currency)}
                    </DataTableCell>
                    <DataTableCell data-label={t('list.table.status') as string} align="center">
                      {isApproved
                        ? <DataTableStatus variant="success">{t('ownerApprovals.approvedBadge')}</DataTableStatus>
                        : <DataTableStatus variant="warning">{t('status.pending_approval')}</DataTableStatus>}
                    </DataTableCell>
                    <DataTableCell data-label={t('ownerApprovals.table.createdAt') as string}>
                      {formatDate(row.created_at) || '-'}
                    </DataTableCell>
                    <DataTableCell data-label="" align="right" mobileFullWidth>
                      {/* 순서 고정: 상세 · PDF · (외부만) WhatsApp · Email · 승인 · 반려 — RA 발주 화면과 같은 공용 버튼 */}
                      <DataTableActions>
                        <ThemedButton size="small" variant="outline" onClick={() => openDetail(row)}>
                          {t('ownerApprovals.details')}
                        </ThemedButton>
                        <ThemedButton size="small" variant="outline" disabled={pdfBusy} onClick={() => openPdfPreview(row)}>
                          {t('ownerApprovals.pdf')}
                        </ThemedButton>
                        {row.is_external && (
                          <>
                            <ThemedButton
                              size="small"
                              variant="outline"
                              disabled={shareDisabled}
                              title={shareTitle}
                              onClick={() => { if (shareDetail) sharePoViaWhatsApp(shareDetail, formatQuantity); }}
                            >
                              {t('ownerApprovals.whatsapp')}
                            </ThemedButton>
                            <ThemedButton
                              size="small"
                              variant="outline"
                              disabled={shareDisabled}
                              title={shareTitle}
                              onClick={() => shareEmail(row)}
                            >
                              {t('ownerApprovals.email')}
                            </ThemedButton>
                          </>
                        )}
                        {!isApproved && (
                          <>
                            <ThemedButton
                              size="small"
                              variant="primary"
                              disabled={busyId === row.id}
                              onClick={() => setApproveTarget(row)}
                            >
                              {t('ownerApprovals.approve')}
                            </ThemedButton>
                            <ThemedButton
                              size="small"
                              variant="outline"
                              disabled={busyId === row.id}
                              onClick={() => { setRejectTarget(row); setRejectReason(''); }}
                            >
                              {t('ownerApprovals.reject')}
                            </ThemedButton>
                          </>
                        )}
                      </DataTableActions>
                    </DataTableCell>
                  </DataTableRow>
                  {/* «방금 승인 — 보내기» 띠: 같은 자리에 남아 무엇을 해야 하는지 알려 준다(화면 상태만) */}
                  {isApproved && (
                    <tr>
                      <td colSpan={8} style={{ padding: '8px 16px', background: '#ECFDF5', borderBottom: '1px solid #A7F3D0', fontSize: 13, color: '#065F46' }}>
                        {row.is_external ? t('ownerApprovals.justApprovedExternal') : t('ownerApprovals.justApprovedSystem')}
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                  );
                })
              )}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      {/* 승인 확인 */}
      <ConfirmDialog
        isOpen={!!approveTarget}
        onClose={() => setApproveTarget(null)}
        onConfirm={doApprove}
        title={t('ownerApprovals.approveTitle')}
        message={(approveTarget?.is_external
          ? t('ownerApprovals.approveConfirmExternal', { po: approveTarget?.po_number || '' })
          : t('ownerApprovals.approveConfirm', { po: approveTarget?.po_number || '' })) as string}
        confirmText={t('ownerApprovals.approve') as string}
        variant="info"
      />

      {/* 반려 사유 입력 */}
      {rejectTarget && (
        <ModalOverlay onClick={() => { if (busyId === null) { setRejectTarget(null); setRejectReason(''); } }}>
          <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
            <ModalHeader>
              <ModalTitle>{t('ownerApprovals.rejectTitle')}</ModalTitle>
              <CloseButton onClick={() => { setRejectTarget(null); setRejectReason(''); }}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>
                {rejectTarget.po_number} · {rejectTarget.restaurant_name || ''}
              </div>
              <FormGroup>
                <FormLabel>{t('ownerApprovals.rejectReasonLabel')} *</FormLabel>
                <ReasonTextarea
                  value={rejectReason}
                  autoFocus
                  placeholder={t('ownerApprovals.rejectReasonPlaceholder') as string}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <ThemedButton variant="outline" onClick={() => { setRejectTarget(null); setRejectReason(''); }}>
                {t('common.cancel')}
              </ThemedButton>
              <ThemedButton
                variant="danger"
                disabled={!rejectReason.trim() || busyId === rejectTarget.id}
                onClick={doReject}
              >
                {t('ownerApprovals.rejectSubmit')}
              </ThemedButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 발주서 미리보기 — 승인 전 검토용으로도 연다 */}
      <Modal
        isOpen={!!pdfPreview}
        onClose={() => setPdfPreview(null)}
        title={`${t('staging.pdfPreview')} · ${pdfPreview?.row.po_number || ''}`}
        maxWidth="900px"
        footer={
          <PdfActions>
            <Button variant="primary" onClick={downloadPdfFile} disabled={pdfBusy}>
              {t('staging.pdfDownload')}
            </Button>
            <Button variant="secondary" onClick={printPdfPreview} disabled={pdfBusy}>
              {t('staging.pdfPrint')}
            </Button>
          </PdfActions>
        }
      >
        <PdfFrame
          ref={pdfFrameRef}
          title={pdfPreview?.row.po_number || 'purchase-order'}
          srcDoc={pdfPreview?.html || ''}
        />
      </Modal>

      <AlertDialog
        isOpen={!!alert}
        onClose={() => setAlert(null)}
        title={alert?.title || ''}
        message={alert?.message || ''}
      />
    </Container>
  );
};

export default OwnerPoApprovalsPage;
