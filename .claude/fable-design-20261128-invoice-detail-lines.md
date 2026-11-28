# 청구서 «내용만 있는 줄»(세부 줄) — 설계 · 판정 [Claude Code · Fable]

2026-11-28 · 대상: 수동 청구서(invoices / invoice_items) · 코드 변경 없음(설계만)
Irene 에게 물을 것: **없음** (되돌리기 어려운 선택이 없어 아래로 정함)

## 0. 판정 요약

1. **운영서버 멘트의 기준(«단가 없고 금액 0인 줄»)은 쓰지 않는다.** 개발 DB 실측(읽기): invoice_items 291줄 중 unit_price NULL 이 150줄(자동 생성 줄은 원래 단가를 안 채움), 그중 «단가 NULL + 금액 0» 인 **진짜 금액 줄이 6줄**(구독 0원 5 · 매출 연동 0원 1 · 하드웨어 0원 줄도 2개 별도). 그 기준이면 «RM 0.00» 이 맞는 줄까지 빈칸이 된다. → **줄 종류 표식**으로 가른다.
2. 표식 = `invoice_items.item_type = 'line_detail'` (STRING(50) 자유 코드 — **DB 구조 변경·ENUM 변경 없음**).
3. 모양 = 금액 줄 **바로 아래** 들여쓴 줄 «- 내용», 수량·단가·금액 칸은 빈칸(0.00 안 찍음). 앞의 «Service: » 는 붙이지 않는다. 소속은 **순서**(바로 위 금액 줄 밑)로 정한다 — 부모 칸 없음.
4. 이번 범위: ①표식+표시(전 역할 화면·인쇄·PDF·메일) ②저장 함정 막기 ③브랜드 작성/수정에 «세부 내용» 칸 ④운영 830 청구서 15줄 표식 전환(배포 때 자동).
5. 이번에 안 하는 것: 금액 줄 여러 개를 화면에서 만드는 줄 편집기(별도 «대» 기능) · 시스템 관리자/푸드코트 작성 화면의 «세부 내용» 칸(표시는 이번에 됨) · 공급업체 거래 청구서(발주 유래, 다른 계통) · 죽은 파일 `components/Invoice/InvoiceDetailModal.tsx`.
6. 돈 경로(`PUT /api/invoices/:id` · `utils/invoiceCalculation.js`)를 건드리므로 **끝난 뒤 Fable 검증 1회(gate)** 대상. 보호 파일(인쇄 8개·KDS) 접촉 0이어야 한다.

## 1. 규칙 (단일 정의)

- **세부 줄** ⇔ `item_type === 'line_detail'`. 그 밖의 판별(금액 0·단가 NULL)은 어디에도 쓰지 않는다.
- 세부 줄 불변식: `unit_price NULL · fixed_amount NULL · calculated_amount 0 · tax_amount 0 · total_amount 0 · quantity 기본 1`. 합계에 기여 0.
- 표시: 설명 = `- ` + DB 원문(카테고리 접두 없음) / 수량 = quantity 가 1 이 아닐 때만 숫자(+단위), 1 이면 빈칸 / 단가·금액 = 항상 빈칸.
- 순서: 줄은 항상 `invoice_items.id ASC`. 세부 줄은 바로 앞 금액 줄에 속한다. (맨 앞에 세부 줄이 와도 그대로 그린다.)
- `line_detail` 은 예약 코드 — 청구서 카테고리 코드로 못 만든다.

## 2. 백엔드

### 2-1. `routes/invoices-helpers.js`
- 추가·export: `const DETAIL_ITEM_TYPE = 'line_detail'; const isDetailItem = (it) => (it?.item_type || it?.itemType) === DETAIL_ITEM_TYPE;`

### 2-2. `routes/invoices-list.js` — 줄 매핑 5곳(436 · 569 · 733 · 1102 · 1223 근처)
각 매핑 결과에 아래를 더한다(기존 키·값은 그대로 — unitPrice/total 은 지금처럼 숫자 0, 타입 안 바꿈):
- `isDetail: isDetailItem(item)`
- `rawDescription: item.description || ''` (접두 안 붙은 DB 원문)
- 세부 줄이면 `description` = DB 원문 그대로(«Service: » 조립 건너뜀), `itemType: 'line_detail'`.
- 569 매핑(`itemType` 키 없음)에도 `itemType: item.item_type || null` 추가.
- 5개 조회의 InvoiceItem include 에 **줄 순서 고정**: 최상위 `order` 끝에 `[{ model: InvoiceItem, as: 'items' }, 'id', 'ASC']` (include 가 `separate: true` 면 include 안 `order: [['id','ASC']]`). 215–225 목록 조회도 같이. 넣은 뒤 SQL 이 깨지지 않는지 실호출로 확인(limit+subQuery 조합이면 보고).
- 222 줄 include `attributes` 는 그대로(item_type 이미 있음).

### 2-3. `utils/invoiceCalculation.js` `normalizeItem`
- 맨 앞에: `if ((item.item_type) === 'line_detail') return { ...item, unit_price: null, fixed_amount: null, calculated_amount: 0, tax_amount: 0, total_amount: 0 };`
- 그 외 줄은 한 글자도 안 바뀐다. (세부 줄에 돈이 실려 들어와도 0 — 불변식을 한 곳에서 강제.)

### 2-4. `routes/invoices-crud.js`
**(a) 카테고리 예약** — `POST /categories`(46~) · `PUT /categories/:categoryId`(102~): code 가 `line_detail` 이면 400 `{ success:false, error:{ message, code:'VALIDATION_ERROR', fieldErrors:{ code:'Reserved code' } } }`.

**(b) `PUT /:id`(296~) 줄 처리 — 428–449 블록 교체 규칙**
본문에서 `details`(string[] | undefined) · `replaceItems`(boolean) 추가로 읽는다.
1. 기존 줄을 `id ASC` 로 전부 읽는다 → `prevAmount`(세부 아님) · `prevDetail`(세부).
2. `details` 가 왔는데 `prevAmount.length > 1` 이고 `replaceItems !== true` → 400 «이 청구서는 금액 줄이 여러 개라 세부 내용을 여기서 못 바꿉니다».
3. **되돌아온 줄 무시:** `prevAmount.length > 1 && replaceItems !== true` 이면 `items` 를 **안 온 것으로 취급**(기존 else 가지 = 기존 줄로 재계산). → 금액 줄 여러 개 청구서(830 포함)는 «수정» 저장으로 줄이 바뀌지 않는다.
4. 그 외(`prevAmount.length <= 1` 또는 `replaceItems === true`)에 `items` 가 오면:
   - 들어온 줄 매핑은 지금 식 그대로 두되 두 가지만: `description: item.rawDescription ?? item.description ?? ''`(접두 중복 방지) · `item_type` 이 `line_detail` 인 줄은 `unit_price: null, calculated_amount: 0, total_amount: 0`.
   - `replaceItems !== true` 일 때: 들어온 줄 중 세부 줄은 버리고(되돌아온 것), 세부 줄은 **`details` 가 왔으면 그것, 안 왔으면 `prevDetail` 그대로**(description·quantity·unit 보존)를 금액 줄 **뒤에** 붙여 한 번에 다시 만든다(지금처럼 전부 지우고 bulkCreate — 순서가 id 로 보장됨).
   - `replaceItems === true`: 들어온 줄을 순서대로 그대로 쓴다(세부 포함). API 로 여러 금액 줄을 다루는 길.
5. `items` 없이 `details` 만 오면(금액 줄 ≤1): 기존 세부 줄만 지우고 새 세부 줄을 만든다(금액 줄 무접촉).
6. `details` 정리(공용 함수 1개): 줄마다 trim · 빈 줄 제거 · 맨 앞 `- `/`– `/`• ` 제거 · 255자 초과 줄이 있거나 30줄 초과면 400(fieldErrors.details).
- 권한 판정·할인·세금·수정 이력 코드는 손대지 않는다.

**(c) 메일 `POST /:id/send-email`(963–968)** — 넘기는 줄에 `is_detail: isDetailItem(item)` 추가, 줄 순서 `id ASC` 보장(조회 include 에 order).

### 2-5. `utils/emailTemplates.js`
- 383–391(HTML): `item.is_detail` 이면 `<td colspan="2" style="padding:4px 20px 4px 36px;border-bottom:1px solid #F3F4F6;"><span style="color:#6B7280;font-size:13px;">- ${item.description}</span></td>` 한 칸만, 금액 칸 없음. 아니면 지금 그대로.
- 479(텍스트): 세부 줄이면 `  - ${item.description}` (금액 없음).
- `restaurants-subscription.js:504` 의 다른 템플릿은 무접촉.

### 2-6. 운영 830 청구서 — 마이그 1개 (배포 때 자동, 방이 운영에 직접 쓰지 않음)
- `scripts/migrate-invoice-detail-lines-br13261128001.js` (멱등 · 끝에 반드시 `process.exit`) + `migrations.registry.json` 에 `deploy` 로 등록.
- 한 문장만: `UPDATE invoice_items ii JOIN invoices i ON i.id = ii.invoice_id SET ii.item_type='line_detail', ii.unit_price=NULL, ii.fixed_amount=NULL WHERE i.invoice_number='INV-BR13261128001' AND ii.item_type='service' AND ii.calculated_amount=0 AND (ii.unit_price IS NULL OR ii.unit_price=0)`
- 바뀐 줄 수를 로그로(기대 15, 두 번째부터 0). 개발 DB 에는 그 번호가 없어 0건 = 정상. 되돌리기 = 같은 조건 반대로(`line_detail`→`service`).
- 배포 전 운영 **읽기** 1회로 대조해 보고에 적는다: 그 청구서의 조건 일치 줄 수(15) · `invoice_categories.code='line_detail'` 0건 · `invoice_items.item_type='line_detail'` 0건 · 설명이 «Service: » 로 시작하는 줄 0건(이미 «수정» 저장돼 접두가 붙었는지).
- **운영 반영 전 주의(보고에 그대로):** 지금 운영 코드에서 830 을 «수정 → 저장» 하면 세부 줄 단가가 0 으로 바뀌고 설명 앞에 «Service: » 가 한 번 더 붙을 수 있다(코드로 확인, 실호출 미확인). 반영 전에는 수정 저장을 하지 않는 게 안전.
- 수량이 5/3/4/5 인 세부 줄 4개는 새 규칙에서 수량 칸에 그 숫자가 보인다(나머지는 빈칸).

## 3. 프론트

### 3-1. 새 공용 `dev-frontend/src/utils/invoiceLines.ts` (규칙을 한 곳에)
```ts
export const isDetailLine = (item: any): boolean =>
  !!item && (item.isDetail === true || item.itemType === 'line_detail' || item.item_type === 'line_detail');
// 화면·인쇄 공용 — 칸에 찍을 글자. 세부 줄은 단가·금액 '' / 수량은 1 이 아닐 때만.
export function invoiceLineCells(item: any, money: (n: number) => string, qtyText?: (item: any) => string) {
  const detail = isDetailLine(item);
  const qty = qtyText ? qtyText(item) : String(item.quantity ?? '');
  if (!detail) return { detail, description: item.description, qty, unitPrice: money(item.unitPrice ?? item.unit_price ?? 0), amount: money(item.total ?? item.total_amount ?? 0) };
  return { detail, description: `- ${item.rawDescription ?? item.description ?? ''}`, qty: Number(item.quantity ?? 1) === 1 ? '' : qty, unitPrice: '', amount: '' };
}
export const DETAIL_CELL_STYLE = { paddingLeft: 28, color: '#6B7280', fontSize: 13 } as const;   // 화면
export const DETAIL_CELL_CSS = 'padding-left:28px;color:#6B7280;font-size:13px;';                // 인쇄 HTML
```
- 각 자리의 수량 표기(단위 붙이는 식 등)는 지금 식을 `qtyText` 로 넘겨 그대로 유지. 금액 줄의 출력은 지금과 글자 하나 달라지면 안 된다.
- 세부 줄 행은 위아래 여백을 줄인다(화면 `padding: 4px 8px` + 위 DETAIL_CELL_STYLE, 금액 줄과의 사이 경계선은 유지).
- 단위 테스트 `utils/invoiceLines.test.ts`: 금액 줄(0원 구독 줄 포함 → «RM 0.00» 그대로) / 세부 줄(빈칸·하이픈) / 수량 5 세부 줄 / itemType 없는 옛 응답.

### 3-2. 그리는 자리 — `invoiceLineCells` 로 교체 (이번 범위 전부)
| 역할 | 화면 | 인쇄(PDF 동일 HTML) |
|---|---|---|
| 브랜드 | `pages/BrandGeneral/invoices/BrandInvoiceViewModal.tsx` 263–270 | `pages/BrandGeneral/BrandInvoicesPage.tsx` 964–965 |
| 매장(RA) | `pages/Restaurant/InvoicesPage.tsx` 1689–1700 | 같은 파일 1065–1075 |
| 오너 | `pages/Owner/OwnerInvoicesPage.tsx` 1352–1362 | 같은 파일 881–890 |
| 푸드코트 | `pages/FoodcourtGeneral/invoices/FoodcourtInvoiceViewModal.tsx` 196–205 | `pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` 808–809 |
| 시스템 관리자 | `pages/Admin/invoices/InvoiceViewModal.tsx` 190–199 | `pages/Admin/InvoicesPage.tsx` 830–832 |
| 매니저 | `pages/Manager/InvoicesPage.tsx` 1010~ (줄 목록) | 그 파일에 인쇄가 있으면 같이 |
- 각 역할의 줄 타입(`invoices/types.ts` 등)에 `isDetail?: boolean; rawDescription?: string; itemType?: string | null` 추가.
- 무접촉: `pages/Supplier/*`, `BrandTradeInvoicesPage.tsx`, `components/Invoice/InvoiceDetailModal.tsx`, 인쇄 보호 파일 8개.
- 수정 창의 첫 줄 설명 채움(`BrandInvoicesPage.tsx` 1219 `invoice.items?.[0]?.description` 류)은 그대로.

### 3-3. 입력 — 브랜드만 (작성 · 수정)
- **작성** `BrandInvoiceCreateModal.tsx` + `BrandInvoicesPage.tsx` 1051(초기값) · 1328(items): 설명 칸 바로 아래 여러 줄 입력칸 1개.
  - 라벨 «Details (optional)» · 도움말 «One per line. Shown under the item, without an amount.» (brand 네임스페이스 4개 언어 키 추가, `npm run i18n:verify`).
  - 상태 `detailLines: ''`. 저장 때 줄마다 trim·빈 줄 제거·앞 하이픈 제거 → `items` 뒤에 `{ item_type:'line_detail', description, quantity:1, calculation_method:'fixed', calculated_amount:0, tax_rate:0, tax_amount:0, total_amount:0 }` 를 순서대로 push. 255자 초과 줄·30줄 초과는 칸 아래 오류 문구로 막는다(저장 안 보냄).
  - 공용 폼 컴포넌트(기존 FormGroup/FormLabel/textarea 계열)만 쓴다 — 새 styled 금지.
- **수정** `BrandInvoiceEditModal.tsx` + `BrandInvoicesPage.tsx` 1214–1223 · 1257–1270:
  - 금액 줄(세부 아님) 수 ≤ 1: 같은 입력칸을 보이고 기존 세부 줄 `rawDescription` 을 줄바꿈으로 채움. 저장 본문에 `details: string[]` 추가(`items` 는 지금처럼 그대로 보냄).
  - 금액 줄 수 > 1: 입력칸 숨김 + 금액 칸 `disabled` + 한 줄 안내 «This invoice has several priced lines. Amount and lines can't be changed here.» · `details` 안 보냄.
- 시스템 관리자·푸드코트 작성/수정 화면은 이번에 안 바꾼다(백엔드 2-4 (b)-3 이 그쪽 «수정» 저장도 같이 지킨다).

## 4. 검증 (구현 뒤 — 결과를 Fable 판정에 넘김)

순서: 코드 전부 확정(프론트 고장주입 포함) → `npm run build:dev` 1회 → `verify-all --full` 1회. 중간 확인은 빌드 없는 것으로.

1. **범위 대조**: `git diff --stat` 이 위 파일 목록 안. `check-print-guard.js` 변경 0. `check-sensitive-diff.js` 결과 첨부.
2. **시험 데이터**(데모 브랜드, 매장 38, 메모에 `[확인용]`, 화면에 보이는 이름은 영어): `POST /api/invoices` 로 금액 줄 2 + 그 밑 세부 줄 3(하나는 quantity 5) 청구서 1건 / 브랜드 작성 화면으로 금액 1 + 세부 2 청구서 1건.
3. **실호출**:
   - 목록 5개 경로 응답에서 세부 줄 `isDetail:true` · 설명에 접두 없음 · 줄 순서 = 넣은 순서. 합계 = 금액 줄 합.
   - 금액 줄 여러 개 청구서에 브랜드 «수정» 저장(실제 화면 본문 그대로) → DB 줄 수·description·unit_price(NULL 유지)·item_type 전부 저장 전과 동일(전후 덤프 비교).
   - 금액 1 + 세부 2 청구서 «수정»: 세부 내용 바꿔 저장 → 세부 줄만 바뀜, 금액 줄 설명에 접두 중복 없음, 합계 그대로. `details: []` → 세부 줄 0. 256자 줄 → 400.
   - 금액 줄 1개짜리 기존 청구서 «수정» 저장 전후 덤프 — **이번 변경 전 코드와 결과가 같은지**(금액 칸을 바꿨을 때 실제로 반영되는지도 같이 실측해 사실만 보고 — 반영 안 되면 기존 동작이고 별건).
   - 0원 구독 줄이 있는 기존 청구서: 화면·인쇄에 «RM 0.00» 그대로.
   - 카테고리 코드 `line_detail` 만들기 → 400.
   - 메일: 개발 메일 가드 안에서 `send-email` 본문(HTML·텍스트) 캡처 — 세부 줄에 금액 없음.
   - 마이그: 개발에서 2회 실행 → 0건·정상 종료. 조건문은 시험 청구서 번호로 바꾼 사본으로 1회 증명(15줄 모양 재현: service·NULL·0) 후 사본 삭제.
4. **실브라우저**: 6개 역할 화면 + 인쇄 HTML 에서 세부 줄 = 들여쓰기·하이픈·빈칸, 금액 줄 = 변경 전과 같은 글자. PDF 1건 생성해 눈으로(브랜드). 폰 폭에서 표 넘침 없음.
5. **고장주입(깨뜨려서 확인)**: ① `normalizeItem` 의 세부 가드 제거 → 세부 줄에 금액 실어 보낸 시험이 실패해야 함 ② PUT 의 «되돌아온 줄 무시» 제거 → 3번의 전후 덤프 비교가 실패해야 함 ③ `isDetailLine` 을 `false` 고정 → `invoiceLines.test.ts` 실패. 셋 다 원복.
6. `health-check` 에 2건 추가(invoice 범주): «금액 줄 여러 개 청구서는 줄을 되돌려 보내도 안 바뀜» · «세부 줄은 합계 0 기여».
7. 확인 못 한 것은 «확인 못 함» 으로 적는다(특히 운영 830 의 실제 화면은 배포 뒤에만 확인 가능).

## 5. 중단 조건
- 줄 순서 order 추가로 목록 조회가 깨지거나 건수가 달라질 때 · 금액 줄 1개 청구서의 «수정» 결과가 변경 전과 달라질 때 · 보호 파일 지문이 뜰 때 · 위에 없는 파일을 고쳐야 할 때 → 멈추고 사실을 Fable 에 넘긴다.

## 6. 보고에 넣을 것
- 운영 반영: 다음 배포 때(마이그 1개 포함 — 830 청구서 15줄 표식 전환).
- 다음 할 일 후보: 금액 줄 여러 개를 화면에서 만드는 줄 편집기 · 시스템 관리자/푸드코트 작성 화면 «세부 내용» 칸.
- 확인할 곳: `https://dev.purplehere.com/…(브랜드 청구서 화면)` — `[확인용]` 청구서 상세·인쇄에서 세부 줄 모양 `[as=brand store=38]` / 매장 쪽 `[as=restaurant store=38]`.
