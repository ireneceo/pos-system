/**
 * InvoiceReconcilePage — 발주 ↔ 인보이스 원가 대조
 * 설계: docs/PURCHASE_ORDER_SYSTEM.md 끝 절 (§1 입력 3층 · §2 저장 · §3 전파)
 *
 * 현장의 기본형은 **종이를 찍은 사진**이다(운영 실측: 올라온 인보이스 2장 모두 이미지 PDF).
 * 그래서 이 화면의 주 경로는 자동 판독이 아니라 —
 *   왼쪽에 사진, 오른쪽에 발주 라인 기본값. **다른 줄만 사람이 고친다.**
 * 글자로 받은 인보이스(왓츠앱·메일)는 붙여넣기 칸에 넣으면 매칭기가 채워준다.
 *
 * ⛔ 매칭 결과는 제안일 뿐이다. 사람이 저장을 눌러야 서버로 간다(설계 §1).
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Content } from '../../components/UI';
import { Button } from '../../components/UI/Button';
import { ThemedInput } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatDateTime } from '../../utils/dateFormat';
import { useStore } from '../../contexts/StoreContext';
import AlertDialog from '../../components/Common/AlertDialog';
import {
  parseInvoiceText, matchInvoiceToPo, MatchResult, MatchReason, PoLine
} from '../../utils/invoiceMatcher';

interface ReconcileItem extends PoLine {
  quantity_received: string | number;
  line_total: string | number;
  invoiced_unit_price: string | number | null;
  invoiced_quantity: string | number | null;
  ingredient_seller_product_id: number | null;
  seller_product_id: number | null;
}

interface ReconcilePo {
  id: number; po_number: string; status: string; currency?: string | null;
  total_amount: string | number;
  seller_is_external: boolean; seller_name: string | null;
  external_invoice_url: string | null; external_invoice_filename: string | null;
  external_invoice_uploaded_at: string | null;
  invoice_number: string | null; invoice_date: string | null;
  invoice_total: string | number | null; invoice_tax: string | number | null;
  invoice_delivery: string | number | null; invoice_discount: string | number | null;
  invoice_reconciled_at: string | null;
}

/** 라인마다 사람이 확정할 값 — 기본은 발주 라인 값이다(§1 "다른 줄만 고침"). */
interface LineDraft {
  invoiced_unit_price: string;
  invoiced_quantity: string;
  apply_to_seller_price: boolean;
  /** 과거 발주에도 이 가격을 소급할지 — **기본 꺼짐**(설계 §4). 결제·수령된 발주는 대상이 아니다. */
  retro_apply: boolean;
}

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 5fr) minmax(380px, 7fr);
  gap: 20px;
  align-items: start;
  /* 태블릿 세로(769~1024)에서 두 칸을 유지하면 오른쪽 표가 눌려 못 읽는다 → 위아래로 쌓는다.
     이 구간 규칙이 없던 것이 «반응형이 엉망»의 원인이었다(2026-09-08 Irene). */
  @media (max-width: 1200px) { grid-template-columns: 1fr; }
`;

const Panel = styled.div`
  background: #FFFFFF;
  border: 1px solid #E3E8EF;
  border-radius: 10px;
  padding: 16px;
`;

const PanelTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const Viewer = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 560px;
  border: 1px solid #E3E8EF;
  border-radius: 8px;
  overflow: hidden;
  background: #F8FAFC;
  iframe, img { width: 100%; height: 100%; border: 0; object-fit: contain; }
  @media (max-width: 1024px) { height: 360px; }
`;

const PasteArea = styled.textarea`
  width: 100%;
  box-sizing: border-box; /* 없으면 padding+border 만큼 패널 밖으로 나간다(실측 +25px) */
  min-height: 120px;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: #FFFFFF;
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
`;

const Row = styled.div`
  display: grid;
  /* 마지막 칸을 auto 로 두면 «Apply to open orders too» 한 줄이 그대로 폭이 돼
     금액 칸을 밀어붙여 «95.00» 이 «95.0» 으로 잘렸다. 상한을 두어 라벨이 줄바꿈하게 하고,
     금액·수량 칸에는 숫자가 다 보이는 최소 폭을 준다. */
  grid-template-columns: 1.4fr 0.8fr minmax(96px, 1fr) minmax(88px, 1fr) minmax(120px, 150px);
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #EEF2F6;
  &:last-child { border-bottom: 0; }

  /* 표가 아니라 **카드**로 접는 조건이 둘이다 — 기준은 «화면 폭»이 아니라 «이 표가 쓸 수 있는 폭».
       ① ≤900px : 화면 자체가 좁다.
       ② 1201~1500px : 화면은 넓지만 위 Split 이 2단이라 표가 오른쪽 7/12 만 쓴다.
          1366(가장 흔한 노트북)에서 표에 남는 폭이 ~504px 뿐이라 5칸을 우겨넣으면
          «ORDERED PRICE»·«INVOICED PRICE» 머리글이 서로 붙어 읽을 수 없었다.
     ≤1200 은 Split 이 1단이라 표가 전체 폭을 쓰므로 표 그대로 둔다.
     (인보이스 미리보기를 옆에 두고 대조하는 것이 이 화면의 목적이라, 2단 자체는 유지한다.) */
  @media (max-width: 900px), (min-width: 1201px) and (max-width: 1500px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 8px;
    padding: 12px 0;
    > *:first-child { grid-column: 1 / -1; }
    > *[data-label]::before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #6B7280;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-bottom: 2px;
    }
  }
`;

const HeadRow = styled(Row)`
  /* 카드형으로 접히면 머리글이 의미가 없다 — 각 칸이 자기 라벨을 갖는다.
     조건은 Row 의 카드 전환과 반드시 같아야 한다(어긋나면 머리글만 남아 어긋난 표가 된다). */
  @media (max-width: 900px), (min-width: 1201px) and (max-width: 1500px) { display: none; }
  padding-bottom: 6px;
  border-bottom: 1px solid #D8DEE6;
  font-size: 11px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const Cell = styled.div`
  min-width: 0;
  font-size: 13px;
  color: #0A2540;

  /* 🔴 겹침의 원인 — 공용 ThemedInput 에는 width 가 없어 고유 폭(~150px)을 유지한다.
     칸(Cell)은 min-width:0 이라 줄어드는데 입력칸은 안 줄어드니, 줄어든 칸 밖으로 삐져나와
     **옆 칸(원가 반영 체크박스)을 덮었다.** 칸 폭에 맞추고 padding·border 를 폭 안에 넣는다.
     체크박스는 제외한다(고정 크기라 늘리면 안 된다). */
  input:not([type='checkbox']):not([type='radio']) {
    width: 100%;
    box-sizing: border-box;
    padding-left: 8px;
    padding-right: 8px;
  }

  /* 숫자칸의 위아래 화살표(스피너)를 없앤다.
     화살표가 폭을 ~15px 먹어서 노트북 폭(1366)에서 «38.00» 이 «38.0» 으로 잘렸다.
     POS 는 터치·숫자입력이 전제라 화살표를 쓸 일이 없다(메모리 touchscreen_no_keyboard). */
  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 체크박스 라벨은 줄바꿈을 허용한다 — 한 줄로 버티면 그 폭이 칸 폭이 돼 옆 칸을 밀어낸다. */
  label {
    white-space: normal;
    align-items: flex-start;
  }
`;

const Muted = styled.div`
  font-size: 11px;
  color: #6B7280;
  margin-top: 2px;
`;

/** 상태 표식은 기하 글리프로 — RA 표준(이모지·lucide 아님). */
const StateTag = styled.span<{ tone: 'ok' | 'warn' | 'none' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${(p) => (p.tone === 'ok' ? '#047857' : p.tone === 'warn' ? '#B45309' : '#6B7280')};
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #4B5563;
`;

const Note = styled.div`
  padding: 10px 12px;
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 12px;
  color: #0A2540;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const num = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const InvoiceReconcilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const { getStoreInfo } = useStore() as any;
  const timeZone = getStoreInfo?.()?.timeZone;

  const [po, setPo] = useState<ReconcilePo | null>(null);
  const [items, setItems] = useState<ReconcileItem[]>([]);
  const [drafts, setDrafts] = useState<Record<number, LineDraft>>({});
  const [header, setHeader] = useState({ number: '', date: '', total: '', tax: '', delivery: '', discount: '' });
  const [pasted, setPasted] = useState('');

  // 업로드 파일은 nginx 가 «1년 immutable» 로 캐시한다(location ^~ /uploads).
  // 그래서 서버가 헤더 정책을 고쳐도(예: /uploads 를 SAMEORIGIN 으로) 이미 캐시된 브라우저·CDN 은
  // **옛 헤더(X-Frame-Options: DENY)를 계속 재사용**해 미리보기가 «refused to connect» 로 막힌다.
  // 2026-09-09 운영에서 실제로 그랬다 — 파일도 코드도 정상인데 캐시된 응답만 옛것이었다.
  // 업로드 시각을 붙여 «한 번도 캐시된 적 없는 URL» 로 만들면 손님 브라우저 캐시를 비우지 않아도 풀린다.
  const invoiceSrc = React.useMemo(() => {
    const u = po?.external_invoice_url;
    if (!u) return null;
    const v = po?.external_invoice_uploaded_at || po?.invoice_reconciled_at || '1';
    return `${u}${u.includes('?') ? '&' : '?'}v=${encodeURIComponent(String(v))}`;
  }, [po?.external_invoice_url, po?.external_invoice_uploaded_at, po?.invoice_reconciled_at]);
  const [matches, setMatches] = useState<Record<number, MatchResult>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/purchase-orders/${id}/reconcile`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      const body = await res.json();
      if (!res.ok || !body.success) throw new Error(body.message || t('reconcile.loadFailed', '불러오지 못했습니다'));
      const p: ReconcilePo = body.data.purchase_order;
      const its: ReconcileItem[] = body.data.items;
      setPo(p);
      setItems(its);
      setHeader({
        number: p.invoice_number || '',
        date: p.invoice_date ? String(p.invoice_date).slice(0, 10) : '',
        total: p.invoice_total != null ? String(p.invoice_total) : '',
        tax: p.invoice_tax != null ? String(p.invoice_tax) : '',
        delivery: p.invoice_delivery != null ? String(p.invoice_delivery) : '',
        discount: p.invoice_discount != null ? String(p.invoice_discount) : ''
      });
      // 기본값 = 발주 라인 값. 이미 대조된 라인은 그 값을 그대로 이어받는다.
      const d: Record<number, LineDraft> = {};
      for (const it of its) {
        d[it.id] = {
          invoiced_unit_price: String(it.invoiced_unit_price ?? it.unit_price ?? ''),
          invoiced_quantity: String(it.invoiced_quantity ?? it.quantity_ordered ?? ''),
          apply_to_seller_price: false,
          retro_apply: false
        };
      }
      setDrafts(d);
    } catch (e: any) {
      setAlert({ title: t('reconcile.loadFailed', '불러오지 못했습니다'), message: e?.message || t('reconcile.unknownError', '알 수 없는 오류') });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  /** 붙여넣은 글자를 매칭기에 태운다. 결과는 제안일 뿐 — 저장은 사람이 누른다. */
  const runMatch = useCallback(() => {
    const parsed = parseInvoiceText(pasted);
    const results = matchInvoiceToPo(items, parsed);
    const map: Record<number, MatchResult> = {};
    const next = { ...drafts };
    for (const r of results) {
      map[r.poLineId] = r;
      if (r.parsed) {
        next[r.poLineId] = {
          ...next[r.poLineId],
          invoiced_unit_price: r.parsed.unitPrice != null ? String(r.parsed.unitPrice) : next[r.poLineId].invoiced_unit_price,
          invoiced_quantity: r.parsed.quantity != null ? String(r.parsed.quantity) : next[r.poLineId].invoiced_quantity
        };
      }
    }
    setMatches(map);
    setDrafts(next);
  }, [pasted, items, drafts]);

  /** 매칭기가 준 사유 코드를 사람 말로. 유틸은 hook 을 못 쓰므로 여기서 옮긴다. */
  const reasonText = (r: MatchReason): string => {
    switch (r) {
      case 'no_candidate': return t('reconcile.reason.noCandidate', '이름이 비슷한 줄을 못 찾았습니다 — 발주 값으로 두고 직접 고치세요');
      case 'no_lines': return t('reconcile.reason.noLines', '읽어들인 줄이 없습니다');
      case 'ok': return t('reconcile.reason.ok', '이름과 금액이 맞습니다 — 확인만 해주세요');
      case 'amount_mismatch': return t('reconcile.reason.amountMismatch', '금액이 수량×단가와 맞지 않습니다');
      case 'name_unsure': return t('reconcile.reason.nameUnsure', '이름이 확실하지 않습니다');
      default: return '';
    }
  };

  const diffOf = (it: ReconcileItem): number => {
    const d = drafts[it.id];
    if (!d) return 0;
    const ordered = num(it.unit_price);
    const invoiced = num(d.invoiced_unit_price);
    if (!(ordered > 0)) return 0;
    return Math.round(((invoiced - ordered) / ordered) * 1000) / 10;
  };

  const changedCount = useMemo(
    () => items.filter((it) => Math.abs(diffOf(it)) >= 0.05).length,
    [items, drafts] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/purchase-orders/${id}/reconcile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({
          invoice: {
            number: header.number || null,
            date: header.date || null,
            total: header.total === '' ? null : header.total,
            tax: header.tax === '' ? null : header.tax,
            delivery: header.delivery === '' ? null : header.delivery,
            discount: header.discount === '' ? null : header.discount
          },
          lines: items.map((it) => ({
            item_id: it.id,
            invoiced_unit_price: drafts[it.id]?.invoiced_unit_price,
            invoiced_quantity: drafts[it.id]?.invoiced_quantity,
            apply_to_seller_price: !!drafts[it.id]?.apply_to_seller_price,
            retro_apply: !!drafts[it.id]?.retro_apply
          }))
        })
      });
      const body = await res.json();
      if (!res.ok || !body.success) throw new Error(body.message || t('reconcile.saveFailed', '저장하지 못했습니다'));

      // 전파가 왜 안 움직였는지까지 사람에게 보여준다 — 조용히 0 만 주면 결함처럼 보인다.
      const moved = (body.data.propagated || []).reduce((a: number, p: any) => a + (p.moved || 0), 0);
      const skipped = (body.data.propagated || [])
        .flatMap((p: any) => (p.targets || []).filter((t: any) => !t.changed).map((t: any) => t.reason));
      const failed = body.data.propagation_failed || [];
      const parts = [t('reconcile.result.lines', '청구값 {{n}}줄을 저장했습니다.', { n: body.data.lines_saved })];
      if (body.data.propagated?.length) parts.push(t('reconcile.result.moved', '원가 {{n}}건이 새 가격을 따라갔습니다.', { n: moved }));
      if (skipped.length) parts.push(t('reconcile.result.skipped', '따라가지 않은 것: {{list}}', { list: [...new Set(skipped)].join(' · ') }));
      if (failed.length) parts.push(t('reconcile.result.failed', '전파 실패 {{n}}건 — 대조 기록은 저장됐습니다.', { n: failed.length }));
      const retroApplied = (body.data.retro || []).reduce((a: number, r: any) => a + (r.applied || 0), 0);
      if (retroApplied) parts.push(t('reconcile.result.retro', '과거 발주 {{n}}줄에도 이 가격을 반영했습니다(결제·수령분 제외).', { n: retroApplied }));
      setAlert({ title: t('reconcile.saved', '대조를 저장했습니다'), message: parts.join('\n') });
      await load();
    } catch (e: any) {
      setAlert({ title: t('reconcile.saveFailed', '저장하지 못했습니다'), message: e?.message || t('reconcile.unknownError', '알 수 없는 오류') });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Container><Content><Panel>{t('reconcile.loading', '불러오는 중…')}</Panel></Content></Container>;
  }
  if (!po) {
    return <Container><Content><Panel>{t('reconcile.notFound', '발주를 찾을 수 없습니다.')}</Panel></Content></Container>;
  }

  const currency = po.currency || 'MYR';

  return (
    <Container>
      <Content>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0A2540' }}>
              {t('reconcile.title', '인보이스 대조')} · {po.po_number}
            </h1>
            <Muted>
              {po.seller_name || t('reconcile.supplier', '공급업체')}
              {po.seller_is_external ? ` · ${t('reconcile.externalOriginal', '외부 공급업체 — 업로드된 인보이스가 원본입니다')}` : ''}
              {po.invoice_reconciled_at
                ? ` · ${t('reconcile.lastReconciled', '마지막 대조')} ${formatDateTime(po.invoice_reconciled_at, timeZone)}`
                : ` · ${t('reconcile.neverReconciled', '아직 대조하지 않았습니다')}`}
            </Muted>
          </div>
          <Button variant="secondary" onClick={() => navigate(`/pos/purchase-orders/${po.id}`)}>{t('reconcile.backToPo', '발주로 돌아가기')}</Button>
        </div>

        <Note>
          {t('reconcile.help.prefilled', '발주에 적힌 값이 이미 채워져 있습니다.')}{' '}
          <strong>{t('reconcile.help.editDiff', '공급업체 인보이스와 다른 줄만 고치세요.')}</strong>{' '}
          {t('reconcile.help.poUnchanged', '저장해도 발주 금액은 바뀌지 않습니다 — 예상(발주)과 실제(청구)를 나란히 남기는 것이 이 화면의 목적입니다.')}
          {po.seller_is_external && ` ${t('reconcile.help.externalPay', '외부 공급업체는 우리 솔루션에서 결제할 수 없고, 실제로 지불한 뒤 청구서에서 «결제함»으로 표시합니다.')}`}
        </Note>

        <Split>
          <Panel>
            <PanelTitle>{t('reconcile.invoicePanel2', '인보이스 내용 넣기')}</PanelTitle>
            {/* 사진·PDF 는 글자를 읽어주지 못한다(설계 §0). 그래서 **직접 입력 칸을 맨 위**에 둔다 —
                미리보기가 안 열리는 브라우저에서도 일이 막히지 않게 (2026-09-08 Irene:
                "이미지 자동으로 못 불러오면 텍스트를 넣게 해달라고 했잖아"). */}
            <PasteArea
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
              placeholder={t('reconcile.pastePlaceholder', '왓츠앱·메일로 받은 내역을 그대로 붙여넣으세요.\n예) Australian Beef Rib   5   43.00   215.00')}
            />
            <Actions style={{ justifyContent: 'flex-start' }}>
              <Button onClick={runMatch} disabled={!pasted.trim()}>{t('reconcile.runMatch', '줄 맞춰보기')}</Button>
              {po.external_invoice_url && (
                <Button variant="secondary" onClick={() => window.open(invoiceSrc!, '_blank')}>
                  {t('reconcile.openInNewTab', '새 창에서 크게 보기')}
                </Button>
              )}
            </Actions>
            <Muted style={{ marginBottom: 16 }}>
              {t('reconcile.matchIsSuggestion', '맞춰본 결과는 제안일 뿐입니다. 오른쪽 값을 확인하고 저장을 눌러야 반영됩니다.')}
            </Muted>

            {po.external_invoice_url ? (
              <>
                <Viewer>
                  {/\.(png|jpe?g|gif|webp)$/i.test(po.external_invoice_url)
                    ? <img src={invoiceSrc!} alt={po.external_invoice_filename || t('reconcile.invoice', '인보이스')} />
                    : (
                      // `<object>` 는 브라우저가 조용히 폴백으로 떨어지는 일이 잦다(2026-09-08 실측:
                      // 헤더는 SAMEORIGIN 인데 화면엔 폴백 문구만 떴다). iframe 이 PDF 를 더 확실히 그린다.
                      <iframe
                        src={invoiceSrc!}
                        title={po.external_invoice_filename || t('reconcile.invoice', '인보이스')}
                      />
                    )}
                </Viewer>
                <Muted>
                  {po.external_invoice_filename || t('reconcile.uploadedInvoice', '업로드된 인보이스')}
                  {po.external_invoice_uploaded_at ? ` · ${formatDateTime(po.external_invoice_uploaded_at, timeZone)}` : ''}
                  {' · '}
                  {t('reconcile.previewHint', '안 보이면 «새 창에서 크게 보기»로 열어 보면서 오른쪽에 입력하세요.')}
                </Muted>
              </>
            ) : (
              <Muted>{t('reconcile.noFile', '업로드된 인보이스 파일이 없습니다. 위 칸에 붙여넣거나 오른쪽에서 직접 입력하세요.')}</Muted>
            )}
          </Panel>

          <Panel>
            <PanelTitle>{t('reconcile.headerPanel', '인보이스 정보')}</PanelTitle>
            <FieldGrid>
              <Field>{t('reconcile.field.number', '인보이스 번호')}
                <ThemedInput value={header.number} onChange={(e) => setHeader({ ...header, number: e.target.value })} placeholder="INV-0001" />
              </Field>
              <Field>{t('reconcile.field.date', '인보이스 일자')}
                <ThemedInput type="date" value={header.date} onChange={(e) => setHeader({ ...header, date: e.target.value })} />
              </Field>
              <Field>{t('reconcile.field.total', '총액')} ({currency})
                <ThemedInput type="number" step="0.01" value={header.total} onChange={(e) => setHeader({ ...header, total: e.target.value })} />
              </Field>
              <Field>{t('reconcile.field.tax', '세금')}
                <ThemedInput type="number" step="0.01" value={header.tax} onChange={(e) => setHeader({ ...header, tax: e.target.value })} />
              </Field>
              <Field>{t('reconcile.field.delivery', '배송비')}
                <ThemedInput type="number" step="0.01" value={header.delivery} onChange={(e) => setHeader({ ...header, delivery: e.target.value })} />
              </Field>
              <Field>{t('reconcile.field.discount', '할인')}
                <ThemedInput type="number" step="0.01" value={header.discount} onChange={(e) => setHeader({ ...header, discount: e.target.value })} />
              </Field>
            </FieldGrid>
            <Muted style={{ marginTop: -8, marginBottom: 16 }}>
              {t('reconcile.taxNotInUnitPrice', '세금·배송·할인은 품목 단가에 섞지 않습니다. 따로 기록해 두어야 원가가 부풀지 않습니다.')}
            </Muted>

            <PanelTitle>{t('reconcile.itemsPanel', '품목')}</PanelTitle>
            <HeadRow>
              <Cell>{t('reconcile.itemsPanel', '품목')}</Cell>
              <Cell>{t('reconcile.col.ordered', '발주 단가')}</Cell>
              <Cell>{t('reconcile.col.invoiced', '청구 단가')}</Cell>
              <Cell>{t('reconcile.col.invoicedQty', '청구 수량')}</Cell>
              <Cell>{t('reconcile.col.apply', '원가 반영')}</Cell>
            </HeadRow>
            {items.map((it) => {
              const d = drafts[it.id];
              const m = matches[it.id];
              const diff = diffOf(it);
              return (
                <Row key={it.id}>
                  <Cell>
                    <div style={{ fontWeight: 600 }}>{it.seller_product_name || it.description || `#${it.id}`}</div>
                    <Muted>
                      {t('reconcile.orderedQty', '발주')} {String(it.quantity_ordered)} {it.unit || ''}
                      {m && (
                        <> · <StateTag tone={m.state === 'matched' ? 'ok' : m.state === 'needs_check' ? 'warn' : 'none'}>
                          {m.state === 'matched' ? `● ${t('reconcile.state.matched', '맞음')}`
                            : m.state === 'needs_check' ? `◐ ${t('reconcile.state.needsCheck', '확인 필요')}`
                            : `○ ${t('reconcile.state.unmatched', '미매칭')}`}
                        </StateTag> {reasonText(m.reason)}</>
                      )}
                    </Muted>
                  </Cell>
                  <Cell data-label={t('reconcile.col.ordered', '발주 단가')}>{num(it.unit_price).toFixed(2)}</Cell>
                  <Cell data-label={t('reconcile.col.invoiced', '청구 단가')}>
                    <ThemedInput
                      type="number" step="0.0001" value={d?.invoiced_unit_price ?? ''}
                      onChange={(e) => setDrafts({ ...drafts, [it.id]: { ...d, invoiced_unit_price: e.target.value } })}
                    />
                    {Math.abs(diff) >= 0.05 && (
                      <Muted style={{ color: diff > 0 ? '#B45309' : '#047857' }}>
                        {diff > 0 ? '▲' : '▼'} {Math.abs(diff)}% {diff > 0 ? t('reconcile.pricier', '비쌈') : t('reconcile.cheaper', '쌈')}
                      </Muted>
                    )}
                  </Cell>
                  <Cell data-label={t('reconcile.col.invoicedQty', '청구 수량')}>
                    <ThemedInput
                      type="number" step="0.001" value={d?.invoiced_quantity ?? ''}
                      onChange={(e) => setDrafts({ ...drafts, [it.id]: { ...d, invoiced_quantity: e.target.value } })}
                    />
                  </Cell>
                  <Cell data-label={t('reconcile.col.apply', '원가 반영')}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#4B5563' }}>
                      <input
                        type="checkbox"
                        checked={!!d?.apply_to_seller_price}
                        disabled={!it.seller_product_id}
                        onChange={(e) => setDrafts({ ...drafts, [it.id]: { ...d, apply_to_seller_price: e.target.checked } })}
                      />
                      {it.seller_product_id ? t('reconcile.applyYes', '이 가격으로') : t('reconcile.applyNone', '연결 없음')}
                    </label>
                    {/* 과거 발주 소급 (설계 §4) — 기본 꺼짐. 결제·수령이 끝난 발주는 대상이 아니다
                        (이미 결제·마감·정산에 쓰인 금액을 나중에 바꾸면 원장이 깨진다). */}
                    {it.ingredient_seller_product_id && (
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280', marginTop: 4 }}>
                        <input
                          type="checkbox"
                          checked={!!d?.retro_apply}
                          onChange={(e) => setDrafts({ ...drafts, [it.id]: { ...d, retro_apply: e.target.checked } })}
                        />
                        {t('reconcile.retroApply', '아직 안 받은 발주에도')}
                      </label>
                    )}
                  </Cell>
                </Row>
              );
            })}

            <Actions>
              <Muted style={{ marginRight: 'auto', alignSelf: 'center' }}>
                {t('reconcile.changedLines', '발주와 다른 줄 {{n}}개', { n: changedCount })}
              </Muted>
              <Button variant="secondary" onClick={() => navigate(`/pos/purchase-orders/${po.id}`)}>{t('reconcile.cancel', '취소')}</Button>
              <Button onClick={save} disabled={saving}>{saving ? t('reconcile.saving', '저장 중…') : t('reconcile.save', '대조 저장')}</Button>
            </Actions>
          </Panel>
        </Split>

        {alert && (
          <AlertDialog
            isOpen
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
      </Content>
    </Container>
  );
};

export default InvoiceReconcilePage;
