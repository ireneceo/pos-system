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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  parseInvoiceText, parseInvoiceHeader, matchInvoiceToPo, shouldAutoFill, MatchResult, MatchReason, PoLine
} from '../../utils/invoiceMatcher';
import { readInvoiceText } from '../../utils/invoiceOcr';
import DateField from '../../components/Common/DateField';

interface ReconcileItem extends PoLine {
  quantity_received: string | number;
  line_total: string | number;
  invoiced_unit_price: string | number | null;
  invoiced_quantity: string | number | null;
  ingredient_seller_product_id: number | null;
  seller_product_id: number | null;
  /** 그 판매자가 자기 인보이스에 찍는 이름 — 매칭기가 최우선으로 본다 */
  seller_invoice_name?: string | null;
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
  /**
   * 이 줄이 **인보이스에서 어떤 이름으로 불렸는지.** 저장하면 서버가 그 판매자 상품에 기록하고,
   * 다음 인보이스부터 그 이름으로 자동 매칭한다(`supplier_products.invoice_name`).
   * 우리 이름과 안 겹치는 경우가 실측 19줄 중 6줄이었다(Yellow Onion ↔ BAWANG HOLLAND).
   */
  invoice_line_name?: string;
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

/**
 * 업로드 파일 주소에 버전을 붙인다 — **낡은 캐시를 피하기 위해서다.**
 *
 * 2026-09-09 까지 nginx 가 `/uploads` 응답을 «1년간 안 바뀜(immutable)» 으로 못박고 있었다.
 * `immutable` 은 브라우저에 «재검증하지 말라» 는 지시라, 그 시절 응답을 한 번이라도 받은
 * 브라우저는 **새로고침으로도 안 풀린다**(2026-09-10 에 서버는 고쳤지만 이미 캐시된 것은 그대로).
 * 그때 응답에는 `X-Frame-Options: DENY` 가 실려 있어 PDF 가 iframe 에서 통째로 막힌다.
 *
 * 주소 뒤에 업로드 시각을 붙이면 **캐시 열쇠가 달라져** 오염된 항목을 건너뛰고 새로 받아온다.
 * 파일은 업로드 시각이 바뀌지 않는 한 같은 주소라 캐시 이득도 그대로다.
 */
const fileSrc = (url: string, uploadedAt?: string | null): string => {
  const v = uploadedAt ? Date.parse(uploadedAt) : 0;
  if (!Number.isFinite(v) || v <= 0) return url;
  return url + (url.includes('?') ? '&' : '?') + 'v=' + v;
};

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
  const [matches, setMatches] = useState<Record<number, MatchResult>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);
  // 자동 읽기 (2026-09-10 Fable D1·D2) — 올려 둔 인보이스를 브라우저에서 읽어 오른쪽을 채운다.
  const [ocr, setOcr] = useState<{ running: boolean; progress: number; error: string | null; done: boolean }>(
    { running: false, progress: 0, error: null, done: false });
  const [ocrLines, setOcrLines] = useState<string[]>([]);   // 못 찾은 줄에 사람이 골라 붙이도록
  const ocrCancelled = useRef(false);
  const ocrStartedFor = useRef<number | null>(null);

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
        // DB 는 단가 4자리·수량 3자리로 저장한다(DECIMAL(12,4)/(12,3)). 그대로 쓰면 저장 후
        // 다시 들어왔을 때 «18.0000» 처럼 보인다(2026-09-10 Irene 지적). **발주 쪽 자릿수에 맞춘다.**
        const fit = (v: unknown, ref: unknown) => {
          const n = Number(v);
          if (v === null || v === undefined || v === '' || !Number.isFinite(n)) return '';
          const refStr = String(ref ?? '');
          const dot = refStr.indexOf('.');
          const dec = Math.max(2, dot < 0 ? 0 : refStr.length - dot - 1);
          return n.toFixed(dec);
        };
        d[it.id] = {
          invoiced_unit_price: fit(it.invoiced_unit_price ?? it.unit_price, it.unit_price),
          invoiced_quantity: fit(it.invoiced_quantity ?? it.quantity_ordered, it.quantity_ordered),
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

  /** 발주 쪽 값이 몇 자리로 적혀 있는지 — 표시 형식을 그쪽에 맞추기 위해 본다. */
  const decimalsOf = (v: string | number | null | undefined, min = 2): number => {
    const str = String(v ?? '');
    const dot = str.indexOf('.');
    return Math.max(min, dot < 0 ? 0 : str.length - dot - 1);
  };

  /**
   * 읽어낸(또는 붙여넣은) 글자를 매칭기에 태우고 **오른쪽 칸을 채운다.**
   *
   * 안전 한계 (2026-09-10 Fable D2):
   *   matched      → 값 채움
   *   needs_check  → 값 채움 (화면에서 노랑)
   *   unmatched    → **비워 둔다.** 발주 값이 그대로 남고, 사람이 옆 목록에서 골라 붙인다.
   * 어느 경우에도 **자동 저장은 하지 않는다.**
   */
  const applyText = useCallback((text: string) => {
    const parsed = parseInvoiceText(text);
    const results = matchInvoiceToPo(items, parsed);
    const map: Record<number, MatchResult> = {};
    setDrafts((prev) => {
      const next = { ...prev };
      for (const r of results) {
        map[r.poLineId] = r;
        if (r.state === 'unmatched' || !r.parsed) continue;   // 못 찾은 줄은 손대지 않는다

        // 돈 칸의 마지막 문 — 규칙은 `utils/invoiceMatcher.ts` 의 `shouldAutoFill` 하나뿐이다.
        // 화면에서 다시 판단하지 않는다(순수 함수라 계약 테스트로 지켜진다).
        const poLine = items.find((it) => it.id === r.poLineId);
        if (poLine && !shouldAutoFill(r, poLine)) {
          map[r.poLineId] = { ...r, parsed: null, state: 'unmatched', reason: 'no_candidate' };
          continue;
        }
        // 자릿수를 **발주 쪽과 맞춘다** — 왼쪽이 «7.00» 인데 오른쪽이 «7» 이면 같은 값인데도
        // 다르게 보인다(2026-09-10 Irene 지적). 값은 그대로고 보이는 형식만 맞춘다.
        next[r.poLineId] = {
          ...next[r.poLineId],
          invoiced_unit_price: r.parsed.unitPrice != null
            ? r.parsed.unitPrice.toFixed(decimalsOf(poLine?.unit_price, 2))
            : next[r.poLineId]?.invoiced_unit_price,
          invoiced_quantity: r.parsed.quantity != null
            ? r.parsed.quantity.toFixed(decimalsOf(poLine?.quantity_ordered, 2))
            : next[r.poLineId]?.invoiced_quantity,
          invoice_line_name: r.parsed.name,   // 저장 시 이름 사전에 기록된다
        };
      }
      return next;
    });
    setMatches(map);
    setOcrLines(parsed.map((p) => p.raw));

    // 머리 칸(번호·일자·총액)도 채운다 — 사람 눈에 바로 보이는 칸이라 안전하다.
    // 사람이 이미 적어 둔 값은 덮지 않는다.
    const h = parseInvoiceHeader(text);
    setHeader((prev) => ({
      ...prev,
      number: prev.number || h.number || '',
      date: prev.date || h.date || '',
      total: prev.total || (h.total != null ? h.total.toFixed(2) : ''),
    }));
    return results;
  }, [items]);

  /** 붙여넣은 글자를 매칭기에 태운다. 결과는 제안일 뿐 — 저장은 사람이 누른다. */
  const runMatch = useCallback(() => { applyText(pasted); }, [pasted, applyText]);

  /**
   * 올려 둔 인보이스를 **자동으로 읽는다.** 화면이 열릴 때 «업로드 있음 + 미대조» 면 1회.
   * 실패하면 조용히 붙여넣기 경로로 떨어진다 — 업로드·대조 자체를 막지 않는다(Fable D1).
   */
  const runOcr = useCallback(async () => {
    if (!po?.external_invoice_url) return;
    ocrCancelled.current = false;
    setOcr({ running: true, progress: 0, error: null, done: false });
    try {
      const text = await readInvoiceText(
        fileSrc(po.external_invoice_url, po.external_invoice_uploaded_at),
        (pr) => { if (!ocrCancelled.current) setOcr((o) => ({ ...o, progress: pr.progress })); },
      );
      if (ocrCancelled.current) { setOcr({ running: false, progress: 0, error: null, done: false }); return; }
      applyText(text);
      setOcr({ running: false, progress: 1, error: null, done: true });
    } catch (e: any) {
      if (ocrCancelled.current) { setOcr({ running: false, progress: 0, error: null, done: false }); return; }
      setOcr({ running: false, progress: 0, error: e?.message || 'ocr_failed', done: false });
    }
  }, [po, applyText]);

  // 자동 1회 — 이미 대조를 마친 발주는 사람이 확정한 값이 있으므로 건드리지 않는다.
  useEffect(() => {
    if (!po || !items.length) return;
    if (!po.external_invoice_url || po.invoice_reconciled_at) return;
    if (ocrStartedFor.current === po.id) return;
    ocrStartedFor.current = po.id;
    runOcr();
  }, [po, items, runOcr]);

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

  /** 줄의 «발주 금액»(수량×단가). 청구 쪽은 입력값 기준. */
  const orderedLineTotal = (it: ReconcileItem): number => num(it.quantity_ordered) * num(it.unit_price);
  const invoicedLineTotal = (it: ReconcileItem): number => {
    const d = drafts[it.id];
    if (!d) return orderedLineTotal(it);
    const qty = d.invoiced_quantity === '' || d.invoiced_quantity == null
      ? num(it.quantity_ordered) : num(d.invoiced_quantity);
    const price = d.invoiced_unit_price === '' || d.invoiced_unit_price == null
      ? num(it.unit_price) : num(d.invoiced_unit_price);
    return qty * price;
  };

  /**
   * 줄 차이(%) — **줄 금액 기준**이다.
   * 2026-09-10 이전에는 단가만 비교해서, 단가가 같고 **수량이 다른** 줄
   * («3개 시켰는데 2개 왔다»)이 «다른 줄» 로 안 잡혔다. 현장에서 가장 흔한 차이가 그것이다.
   */
  const diffOf = (it: ReconcileItem): number => {
    const ordered = orderedLineTotal(it);
    const invoiced = invoicedLineTotal(it);
    if (!(ordered > 0)) return 0;
    return Math.round(((invoiced - ordered) / ordered) * 1000) / 10;
  };

  /** 발주 총액 · 입력한 줄들의 합 · 인보이스에 적힌 총액 — 셋을 나란히 본다. */
  const totals = useMemo(() => {
    const orderedSum = items.reduce((s, it) => s + orderedLineTotal(it), 0);
    const invoicedSum = items.reduce((s, it) => s + invoicedLineTotal(it), 0);
    const headerTotal = header.total === '' ? null : num(header.total);
    return {
      ordered: Math.round(orderedSum * 100) / 100,
      lines: Math.round(invoicedSum * 100) / 100,
      header: headerTotal == null ? null : Math.round(headerTotal * 100) / 100,
    };
  }, [items, drafts, header.total]); // eslint-disable-line react-hooks/exhaustive-deps

  /** 이미 어떤 발주 줄이 가져간 인보이스 줄 — 다른 줄의 선택 목록에서는 뺀다. */
  const usedRawLines = useMemo(
    () => new Set(Object.values(matches).map((m) => m?.parsed?.raw).filter(Boolean) as string[]),
    [matches]);

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
            retro_apply: !!drafts[it.id]?.retro_apply,
            invoice_line_name: drafts[it.id]?.invoice_line_name
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

            {/* 자동 읽기 상태 (2026-09-10) — 올려 둔 인보이스를 브라우저에서 읽는다.
                서버로 보내지 않고, 실패해도 아래 붙여넣기로 그대로 진행할 수 있다. */}
            {po.external_invoice_url && (
              <div style={{
                background: ocr.error ? '#FFFBEB' : ocr.done ? '#ECFDF5' : '#F8FAFC',
                border: `1px solid ${ocr.error ? '#FCD34D' : ocr.done ? '#A7F3D0' : '#E2E8F0'}`,
                borderRadius: 8, padding: '10px 12px', marginBottom: 12, fontSize: 12.5, lineHeight: 1.7,
              }}>
                {ocr.running && (
                  <>
                    <div style={{ fontWeight: 700, color: '#0A2540' }}>
                      {t('reconcile.ocr.reading', '올려 둔 인보이스를 읽는 중입니다…')} {Math.round(ocr.progress * 100)}%
                    </div>
                    <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3, margin: '6px 0' }}>
                      <div style={{ height: 6, width: `${Math.round(ocr.progress * 100)}%`, background: '#635BFF', borderRadius: 3 }} />
                    </div>
                    <Button variant="secondary" onClick={() => { ocrCancelled.current = true; }}>
                      {t('reconcile.ocr.cancel', '그만 읽기')}
                    </Button>
                  </>
                )}
                {!ocr.running && ocr.done && (
                  <>
                    <strong style={{ color: '#047857' }}>{t('reconcile.ocr.done', '인보이스를 읽어 오른쪽을 채웠습니다.')}</strong>{' '}
                    {t('reconcile.ocr.checkHint', '초록은 확실한 줄, 노랑은 확인이 필요한 줄입니다. 비어 있는 줄은 아래 목록에서 골라 붙이세요.')}
                    <div style={{ marginTop: 6 }}>
                      <Button variant="secondary" onClick={runOcr}>{t('reconcile.ocr.again', '다시 읽기')}</Button>
                    </div>
                  </>
                )}
                {!ocr.running && !ocr.done && (
                  <>
                    {ocr.error
                      ? t('reconcile.ocr.failed', '자동으로 읽지 못했습니다 — 아래에 붙여넣거나 오른쪽에 직접 입력하세요.')
                      : t('reconcile.ocr.idle', '올려 둔 인보이스를 읽어 오른쪽을 채울 수 있습니다.')}
                    <div style={{ marginTop: 6 }}>
                      <Button variant="secondary" onClick={runOcr}>{t('reconcile.ocr.start', '인보이스 읽기')}</Button>
                    </div>
                  </>
                )}
              </div>
            )}
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
                <Button variant="secondary" onClick={() => window.open(fileSrc(po.external_invoice_url!, po.external_invoice_uploaded_at), '_blank')}>
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
                    ? <img src={fileSrc(po.external_invoice_url, po.external_invoice_uploaded_at)} alt={po.external_invoice_filename || t('reconcile.invoice', '인보이스')} />
                    : (
                      // `<object>` 는 브라우저가 조용히 폴백으로 떨어지는 일이 잦다(2026-09-08 실측:
                      // 헤더는 SAMEORIGIN 인데 화면엔 폴백 문구만 떴다). iframe 이 PDF 를 더 확실히 그린다.
                      <iframe
                        src={fileSrc(po.external_invoice_url, po.external_invoice_uploaded_at)}
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
                {/* 브라우저 기본 날짜칸은 **브라우저 언어대로** mm/dd/yyyy 로 보인다(2026-09-10 Irene 지적).
                    말레이시아는 dd/mm 이라 헷갈린다. 프로젝트 표준 DateField 는 «Sep 08, 2026» 처럼
                    월을 글자로 보여 줘서 순서 오해가 생기지 않는다. */}
                <DateField value={header.date} onChange={(v) => setHeader({ ...header, date: v || '' })} />
              </Field>
              <Field>{t('reconcile.field.total', '총액')} ({currency})
                <ThemedInput type="number" step="0.01" value={header.total} onChange={(e) => setHeader({ ...header, total: e.target.value })} />
                {/* 총액 비교 (2026-09-10 Irene: «총 금액이 올린거랑 우리 발주 가격이랑 다른데 총비용 비교는 없어»).
                    셋을 나란히 본다 — 발주 총액 / 입력한 줄들의 합 / 인보이스에 적힌 총액.
                    줄 합과 적힌 총액이 다르면 세금·배송비이거나 옮겨 적다 틀린 것이다. */}
                <Muted style={{ display: 'block', marginTop: 6, lineHeight: 1.8 }}>
                  {t('reconcile.total.ordered', '발주 총액')}: <strong>{currency} {totals.ordered.toFixed(2)}</strong>
                  {totals.header != null && Math.abs(totals.header - totals.ordered) >= 0.005 && (
                    <span style={{ color: totals.header > totals.ordered ? '#B45309' : '#047857', fontWeight: 700 }}>
                      {' · '}
                      {totals.header > totals.ordered ? '▲' : '▼'} {currency} {Math.abs(totals.header - totals.ordered).toFixed(2)}
                      {' '}
                      {totals.header > totals.ordered
                        ? t('reconcile.total.morePaid', '더 청구됨')
                        : t('reconcile.total.lessPaid', '덜 청구됨')}
                    </span>
                  )}
                  {totals.header != null && Math.abs(totals.header - totals.ordered) < 0.005 && (
                    <span style={{ color: '#047857' }}>{' · '}{t('reconcile.total.same', '발주와 같음')}</span>
                  )}
                  <br />
                  {t('reconcile.total.lineSum', '입력한 줄들의 합')}: <strong>{currency} {totals.lines.toFixed(2)}</strong>
                  {totals.header != null && Math.abs(totals.lines - totals.header) >= 0.005 && (
                    <span style={{ color: '#B45309' }}>
                      {' · '}
                      {t('reconcile.total.lineMismatch', '적어 넣은 총액과 {{d}} 차이 — 세금·배송비이거나 옮겨 적다 틀린 것입니다', {
                        d: `${currency} ${Math.abs(totals.lines - totals.header).toFixed(2)}`,
                      })}
                    </span>
                  )}
                </Muted>
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
                    {/* 3단 색 (2026-09-10 Fable D2): 초록=확실 · 노랑=확인 필요 · 색없음=사람이 채울 자리 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ThemedInput
                      type="number" step="0.0001" value={d?.invoiced_unit_price ?? ''}
                      style={m?.state === 'matched' ? { borderColor: '#10B981', background: '#ECFDF5' }
                        : m?.state === 'needs_check' ? { borderColor: '#F59E0B', background: '#FFFBEB' }
                        : undefined}
                      onChange={(e) => setDrafts({ ...drafts, [it.id]: { ...d, invoiced_unit_price: e.target.value } })}
                    />
                      {it.unit && (
                        <span style={{ fontSize: 12.5, color: '#4B5563', whiteSpace: 'nowrap' }}>/{it.unit}</span>
                      )}
                    </div>
                    {/* 인보이스 줄 고르기 (2026-09-10 Irene 지적 2건):
                        ① 한 번 고르면 다시 못 고쳤다 → **언제나 보이게** 하고 고른 줄을 값으로 표시한다.
                        ② 이미 다른 줄이 가져간 인보이스 줄이 목록에 남아 있었다 → 뺀다(내가 고른 것은 남긴다). */}
                    {ocrLines.length > 0 && (
                      <select
                        style={{ marginTop: 6, width: '100%', fontSize: 12, padding: '4px 6px',
                                 border: '1px solid #E3E8EF', borderRadius: 6,
                                 background: m?.state === 'unmatched' ? '#FFFBEB' : '#FFFFFF' }}
                        value={m?.parsed?.raw ?? ''}
                        onChange={(e) => {
                          const raw = e.target.value;
                          if (!raw) {
                            // 선택 해제 — 발주 값으로 되돌리고 못 찾은 상태로 둔다
                            setDrafts({ ...drafts, [it.id]: {
                              ...d,
                              invoiced_unit_price: String(num(it.unit_price).toFixed(decimalsOf(it.unit_price, 2))),
                              invoiced_quantity: String(it.quantity_ordered ?? ''),
                              invoice_line_name: undefined,
                            } });
                            setMatches({ ...matches, [it.id]: {
                              poLineId: it.id, parsed: null, state: 'unmatched', score: 0, reason: 'no_candidate' } });
                            return;
                          }
                          const one = parseInvoiceText(raw)[0];
                          if (!one) return;
                          setDrafts({ ...drafts, [it.id]: {
                            ...d,
                            invoiced_unit_price: one.unitPrice != null
                              ? one.unitPrice.toFixed(decimalsOf(it.unit_price, 2)) : (d?.invoiced_unit_price ?? ''),
                            invoiced_quantity: one.quantity != null
                              ? one.quantity.toFixed(decimalsOf(it.quantity_ordered, 2)) : (d?.invoiced_quantity ?? ''),
                            invoice_line_name: one.name,
                          } });
                          setMatches({ ...matches, [it.id]: {
                            poLineId: it.id, parsed: one, state: 'needs_check', score: 0, reason: 'name_unsure' } });
                        }}
                      >
                        <option value="">{t('reconcile.pickLine', '인보이스에서 이 줄 고르기…')}</option>
                        {ocrLines
                          .filter((raw) => raw === m?.parsed?.raw || !usedRawLines.has(raw))
                          .map((raw, i) => (
                            <option key={i} value={raw}>{raw.slice(0, 60)}</option>
                          ))}
                      </select>
                    )}
                    {d?.invoice_line_name && (
                      <Muted style={{ display: 'block', marginTop: 4, color: '#047857' }}>
                        {t('reconcile.willRemember', '저장하면 «{{name}}» 을 이 상품의 인보이스 이름으로 기억합니다', {
                          name: String(d.invoice_line_name).slice(0, 40),
                        })}
                      </Muted>
                    )}
                    {Math.abs(diff) >= 0.05 && (
                      <Muted style={{ color: diff > 0 ? '#B45309' : '#047857' }}>
                        {diff > 0 ? '▲' : '▼'} {Math.abs(diff)}% {diff > 0 ? t('reconcile.pricier', '비쌈') : t('reconcile.cheaper', '쌈')}
                      </Muted>
                    )}
                  </Cell>
                  <Cell data-label={t('reconcile.col.invoicedQty', '청구 수량')}>
                    {/* 단위를 숫자 옆에 붙인다 (2026-09-10 Irene: «입력란 옆에 단위가 명확해야»).
                        인보이스 단위는 우리 것과 다를 수 있어 매칭이 안 되므로, **발주한 단위**를 보여 준다.
                        예: 발주가 kg 이면 여기 적는 수량도 kg 기준이라는 뜻이다. */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ThemedInput
                      type="number" step="0.001" value={d?.invoiced_quantity ?? ''}
                      onChange={(e) => setDrafts({ ...drafts, [it.id]: { ...d, invoiced_quantity: e.target.value } })}
                    />
                      {it.unit && (
                        <span style={{ fontSize: 12.5, color: '#4B5563', whiteSpace: 'nowrap', fontWeight: 600 }}>
                          {it.unit}
                        </span>
                      )}
                    </div>
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
                {Math.abs(totals.lines - totals.ordered) >= 0.005 && (
                  <span style={{ color: totals.lines > totals.ordered ? '#B45309' : '#047857', fontWeight: 700 }}>
                    {' · '}
                    {totals.lines > totals.ordered ? '▲' : '▼'} {currency} {Math.abs(totals.lines - totals.ordered).toFixed(2)}
                  </span>
                )}
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
