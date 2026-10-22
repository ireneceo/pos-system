# Fable 설계 — 알림(메일·앱) «누구로서 받는지 · 무엇을 해야 하는지» (2026-10-22 · 작업방 1f5a0efb)

요청서: `.claude/fable-request-20261022-notification-addressee.md` · 작성: Fable(리더) · 구현: Opus(팀원)
실측 기준: 개발 코드 2026-10-22 + 개발 DB(읽기) — 운영 조회 없음.

> Irene 원문: «멀티로그인을 사용하면서 알림이 문제가 되고 있어. 이메일이든 앱이든 오는 알림 멘트가 브랜드제너럴인 내게 보내는 건지, 레스토랑관리자인 내게 보내는 건지, 브랜드오너에게 보내는 건지 모르겠고, 무슨 할일을 해야 한다는게 명확하지가 않아. 전체적으로 검토해서 더 확실하게 인지되게 제목, 미리보이는 멘트, 그리고 안에 상세내용을 정돈해 줄 수 있어?»

---

## 0. 한 줄 결론

**모든 알림은 «수신 자격(addressee)» 하나를 달고 나간다** — «K-DINE Bangsar · 매장» / «K-DINE · 브랜드» / «오너 · K-DINE Bangsar» / «ABC Sdn Bhd · 공급업체». 이 자격이 ① 제목 맨 앞 꼬리표 ② 미리보기 줄 ③ 본문 머리의 «받는 분» 띠 ④ 버튼 주소(그 자격 화면으로, 필요하면 모자 전환) ⑤ 바닥글 «이 메일을 받는 이유» 다섯 곳에 **같은 값**으로 찍힌다. 그리고 본문 둘째 블록은 항상 **«해야 할 일» 한 줄**(행동 필요 / 알림만 / 결과)이다.

자격은 수신자의 계정 역할이 아니라 **그 발송 건의 자리**다(판매자 메일은 판매자 자리, 오너 승인 메일은 오너 자리). 이미 머리글 브랜딩에 쓰는 `_brandingEntity` 와 같은 원리를 «받는 자격» 으로 확장한 것이다 — 새 테이블·새 카테고리·새 발송 시점 없음.

---

## 1. 문제 정의 (팀원 실측 + Fable 추가 확인)

| # | 사실 | 근거 |
|---|---|---|
| 1 | 제목·본문 어디에도 «당신이 어떤 자격으로 받는지» 가 없다. 머리글 브랜딩은 «누구 이름으로 보내는가» 이지 «누구로서 받는가» 가 아니다 | `notificationService.js:103-147 resolveReceiverBranding` |
| 2 | 미리보기(preheader) 없음 → 메일 목록엔 머리글 이름 + h2 가 보인다 | `emailTemplates.js:40-107 emailLayout` |
| 3 | «해야 할 일» 표시가 메일마다 다르다(상태줄·hint·버튼·맨 문단) | `notificationTemplates.js` 전체 · `seller-orders.js` 7종 · 독촉 3종 |
| 4 | 버튼 주소 다수가 없는 화면(`/pos/seller-orders`·`/pos/invoices`·`/pos/notices`·`/pos/supply/contracts`·`/supplier/contracts`·`/pos/seller/orders`·`/pos/purchase-invoices`·`/pos/brand/general/invoices`·`/pos/foodcourt/general/invoices`·`/pos/restaurant/invoices`(레거시 리다이렉트)) | App.tsx `path=` 대조 — §4 표 |
| 5 | 버튼이 모자를 바꾸지 않는다. 다른 모자로 들어와 있으면 `ProtectedRoute requiredRole` 이 역할 대시보드로 튕긴다 | `ProtectedRoute.tsx:318~` |
| 6 | 수신자 해석이 모자(user_contexts·오너 모자)를 안 본다 — 네이티브 역할 + `brands.owner_id` + `restaurant_managers(ownership ∧ role='Restaurant Owner')` 만 | `notificationService.js:355-470` |
| 7 | 앱 푸시 3종 제목에 매장 이름 없음(«New Order»). 예약 푸시 url `/pos/reservations` 는 없는 화면(실제 `/restaurant/:rid/reservations`) | `orderNotificationService.js:53` · `reservationNotificationService.js:68·92` · App.tsx:1249 |
| 8 | 개발 DB: `user_contexts` **0행**, 네이티브 오너가 아닌데 소유행 가진 사람 0명, 복수 브랜드 소유 BG 2명(user 6·22). 즉 개발에는 «한 계정 여러 모자» 사례가 없다 — 시험은 시드로 만들어야 한다 | dev DB 2026-10-22 |
| 9 | 연체 메일은 `restaurants.admin_id` 단일 컬럼으로 수신자를 잡는다(2026-08-31 에 다른 5곳을 고칠 때 빠진 자리) | `invoiceOverdueScheduler.js:62-71` |

Irene 운영 계정이 «한 계정 + 모자» 인지 «계정 2개» 인지는 확인 못 함(운영 조회 불가). **둘 다 이 설계로 풀린다** — 자격 꼬리표는 계정 구조와 무관하게 그 발송의 자리를 적기 때문이다. 모자 보유자가 수신자에 안 들어가는 문제(#6)만 계정 구조에 따라 체감이 다르다(§7 R1).

---

## 2. 모델 — 수신 자격(addressee)

```js
// 한 발송(또는 수신자별 팩토리)이 붙이는 값. _brandingEntity 와 같은 방식(non-nodemailer 메타).
addressee = {
  kind: 'store' | 'store_staff' | 'owner' | 'brand' | 'brand_manager' | 'foodcourt' | 'foodcourt_manager'
      | 'supplier' | 'admin' | 'referral' | 'account',   // account = 자격 무관(비번·인증·초대 결과 등)
  entity_type: 'restaurant' | 'brand' | 'foodcourt' | 'supplier' | 'owner' | 'system' | null,
  entity_id: number | null,
  entity_name: string            // 표시 이름(매장명/브랜드명/회사명). owner 는 매장명.
}
```

- **자격 단어(4언어, `locales/*/email.json` `addressee.kind.*`)** — en: Store / Store staff / Owner / Brand / Brand manager / Food court / Food court manager / Supplier / Platform admin / Referral partner · ko: 매장 / 매장 직원 / 오너 / 브랜드 / 브랜드 담당자 / 푸드코트 / 푸드코트 담당자 / 공급업체 / 플랫폼 관리자 / 추천 파트너. (zh·ms 팀원이 같은 뜻으로.)
- **표기 형식(모든 곳 동일)** `{entity_name} · {kind word}` — 예 «K-DINE Bangsar · Store» · «K-DINE · Brand» · «K-DINE Bangsar · Owner» · «ABC Sdn Bhd · Supplier». 오너도 매장 이름이 앞(«어느 매장의 오너로서» 가 핵심 정보). `account` 는 꼬리표 생략.
- **자격은 발송처가 정한다.** `seller_type`/`entity_type`/restaurant id 를 이미 아는 자리이므로 추가 조회 없이 만들 수 있다. 수신자 목록이 두 자격 섞임(RA+오너)인 경우만 자격 포함 리졸버(§7 U2)를 쓴다.
- **한 사람에게 같은 건이 두 자격으로 가면 1통만**(dedupe) — 우선순위: 행동이 걸린 자격 > 수신자 네이티브 역할과 같은 자격 > 함수가 돌려준 순서. `sendNotificationBatch` 가 아니라 **자격 포함 리졸버가 목록을 만들 때** 거른다(발송 관문은 1 user = 1 call 그대로).

---

## 3. 공통 규칙 — 제목 · 미리보기 · 본문 · 버튼 · 언어

### 3-1. 제목(subject) 문법
```
[{entity_name} · {kind}] {할 일 또는 일어난 일}: {대상} · {핵심 숫자/상대}
```
- 꼬리표가 **맨 앞**(휴대폰 메일 목록은 앞 35~45자만 보인다 — 자격이 제일 먼저 갈려야 한다).
- 행동이 필요하면 **동사로 시작**(Confirm / Approve / Pay / Record dispatch / Review / Send). 알림만이면 **과거형 사실**(Order confirmed / Payment received / Approved).
- 대상 = 번호(PO-…, INV-…) 또는 제목. 핵심 = 금액 · 상대 이름 · 기한 중 1~2개. 60자 안쪽.
- 예: `[K-DINE · Brand] Confirm order: PO-R8-20261022-001 · Bangsar Store · RM 1,200.00`
  `[Bangsar Store · Owner] Approve purchase: PO-R8-…-001 · RM 1,200.00`
  `[Bangsar Store · Store] Order placed: PO-R8-…-001 · to K-DINE`
  `[Bangsar Store · Store] Pay invoice: INV-… · RM 120.00 · due 31 Oct`
- 긴급 접두어(OVERDUE 등)는 꼬리표 뒤 동사 자리에: `[… · Store] Pay now — overdue: INV-… · RM 120.00`.

### 3-2. 미리보기(preheader) 한 줄
`{해야 할 일 한 문장 또는 «No action needed.»} {핵심 사실 1~2개}` — 90자 안쪽. 템플릿이 `_preheader` 로 넘기고, 없으면 `_action` 문장 + 제목에서 자동 생성.
- 렌더: `emailLayout` body 첫 요소로 숨김 span(`display:none;max-height:0;overflow:hidden;mso-hide:all` + 뒤에 `&zwnj;&nbsp;` 패딩 40개) — 메일 목록이 머리글 이름 대신 이 줄을 보여 준다. 숨김 텍스트 뒤 패딩이 없으면 h2 가 이어 붙는다(팀원: Gmail 웹·iOS 메일 두 곳 캡처로 확인).

### 3-3. 본문 구조(모든 알림 동일 순서)
```
① 머리글(로고/브랜딩)                       — 기존 그대로(resolveReceiverBranding)
② 받는 분 띠  «To: {full_name} — as {entity_name} · {kind}»   — 새로 추가(회색 띠, 글리프 ◉)
③ 제목 h2                                   — 기존 title
④ 할 일 블록(action block)                   — 새로 추가, 3상태 중 하나
     ACTION   (노란 테두리 #F59E0B)  «What you need to do: Confirm or reject this order.» (+ by {기한})
     FYI      (회색)                  «No action needed. For your records.»
     RESULT   (초록 #10B981 / 빨강 #EF4444) «Approved — the order has been sent to the seller.»
⑤ 상세 표(infoTable) + 품목표              — 기존
⑥ 버튼 1개(동사 라벨) — 주소는 §4 규칙      — 기존 ctaButton, 주소만 바뀜
⑦ 바닥글 + «You're receiving this as {entity_name} · {kind}.»  — 한 줄 추가, 그 다음 기존 관리 링크
```
- ④ 는 템플릿이 `_action = { state: 'action'|'fyi'|'result', text, due? }` 로 넘긴다. 없으면 `fyi` 기본(«No action needed.») — 행동이 있는 메일에서 빠뜨리면 틀린 문구가 나가므로 §8 검사가 잡는다.
- 색은 디자인 기준의 danger `#EF4444`·성공 `#10B981`·경고 `#F59E0B` 그대로. 장식 이모지 금지(글리프 ◉ ▶ ✓ 만).
- 본문 안에 «당신» 표현은 자격 기준으로 쓴다 — «Your store Bangsar Store placed…» 가 아니라 «Bangsar Store placed…» 처럼 **엔티티 이름을 주어로**. 수신자가 어떤 계정이든 같은 문장이 맞도록.

### 3-4. 구현 자리(공통 틀 — 한 곳)
- `notificationTemplates.js wrapTemplate(title, body, lang, branding, meta)` 에 `meta = { addressee, action, preheader, recipientName }` 추가 → ②④⑦ 과 preheader 를 여기서 조립해 `emailLayout(content, branding, lang, { preheader, footerLine })` 로 넘긴다. `emailLayout` 은 4번째 인자(옵션)만 받고 기존 3인자 호출은 바이트 동일.
- `withRenderMeta(result, title, body, lang, extra)` — `extra = { addressee, action, preheader }` 를 같은 non-enumerable 로 보관.
- `notificationService.sendNotification` 4단계: 재렌더할 때 `mailOptions._addressee`(객체 또는 `(user)=>객체`) 와 `user.full_name` 을 `wrapTemplate` 에 넘긴다. **재렌더 조건 완화**: 지금은 `branding && _title && _body` 일 때만 재렌더하는데, 자격 띠는 브랜딩 없는 수신자(오너·SA·공급업체)에게도 필요하므로 `(_title && _body) && (branding || _addressee)` 로.
- 제목 꼬리표도 관문에서 붙인다: `subject = addresseeTag(addressee, lang) + ' ' + mailOptions.subject` — 템플릿 45곳이 각자 붙이지 않게 **한 곳**. 템플릿은 동사 문장만 책임진다. 꼬리표 없는 `account` 는 그대로.
- 맨 HTML 메일(`seller-orders.js` 7종·독촉 3종·qz-tray·public)은 **`wrapTemplate` + `withRenderMeta` 로 옮기는 것이 수정의 전부**(문구·수신자·시점 무변경) — 그래야 ②④⑦ 이 자동으로 붙는다.

### 3-5. 언어
- 공통 부품(②④⑦·꼬리표·preheader 접속어)은 4언어 키로 넣고 `_lang` 으로 고른다. i18n 템플릿은 수신자 언어로 온전히, 영어 고정 템플릿은 `_lang='en'` 이라 공통 부품도 영어 → **한 메일 안에 두 언어가 섞이지 않는다.**
- 영어 고정 템플릿(청구·정산·독촉·판매자→구매자 7종·계약·체험·추천)의 4언어화는 이번 범위 밖(§7 R3). 개발 DB 비영어 선호 사용자는 SA 2명뿐이라 이번에 밀어붙일 근거가 약하다.

---

## 4. 버튼 주소 규칙 + 진입 라우트 `/go`

### 4-1. 원칙
1. **버튼 주소는 자격이 정한다.** 같은 «청구서 보기» 라도 매장은 `/restaurant/:rid/invoices`, 오너는 `/pos/owner/invoices`, 브랜드는 `/pos/brand/trade-invoices`. 템플릿이 주소를 박지 않고 **`notificationLinks.js`(새 유틸, 백엔드) 한 곳**이 `(addressee, target, params)` → 경로를 돌려준다. 프론트 `utils/dashboardPath.ts` 의 역할→대시보드 규칙과 같은 성격의 «역할→화면 표» 를 백엔드에 두는 것.
2. **모든 버튼은 진입 라우트를 거친다**: `${BASE}/go?ctx={entity_type}:{entity_id}:{role}&to={encoded path}`. 직접 화면 주소를 박지 않는다(모자가 안 맞을 때 튕기는 #5 의 해법).
3. 없는 화면으로 보내지 않는다 — 표에 없는 target 은 유틸이 throw 하지 않고 역할 대시보드로 떨어뜨리되 `console.warn('[notificationLinks] unknown target')` 을 남긴다. §8 검사가 표의 모든 경로를 App.tsx `path=` 와 대조한다.

### 4-2. 자격 → 화면 표 (`notificationLinks.js` TARGETS)
| target | store(RA/Staff) | owner | brand(BG/BM) | foodcourt(FG/FM) | supplier | admin |
|---|---|---|---|---|---|---|
| `dashboard` | `/restaurant/:rid/dashboard` | `/pos/owner/dashboard` | `/pos/brand/general/dashboard`(BM `/pos/brand/dashboard`) | `/pos/foodcourt/general/dashboard`(FM `/pos/foodcourt/dashboard`) | `/pos/supplier/dashboard` | `/pos/admin/dashboard` |
| `po_detail` (내 발주) | `/pos/purchase-orders/:poId` | 같음 | 같음 | 같음 | — | 같음 |
| `po_history` | `/pos/purchase-orders/history` | 같음 | 같음 | 같음 | — | 같음 |
| `po_approvals` | — | `/pos/owner/po-approvals` | — | — | — | — |
| `seller_orders` (받은 주문) | — | — | `/pos/brand/general/incoming-orders` | `/pos/foodcourt/general/incoming-orders` | `/pos/supplier/orders` | — |
| `invoices` (내가 낼 청구서) | `/restaurant/:rid/invoices` | `/pos/owner/invoices` | `/pos/brand/invoices` | `/pos/foodcourt/invoices` | — | `/pos/admin/invoices` |
| `trade_invoices_buyer` | `/restaurant/:rid/invoices` | `/pos/owner/invoices` | `/pos/brand/trade-invoices` | `/pos/foodcourt/trade-invoices` | — | — |
| `trade_invoices_seller` (내가 발행) | — | — | `/pos/brand/trade-invoices` | `/pos/foodcourt/trade-invoices` | `/pos/supplier/trade-invoices` | — |
| `issued_invoices` (브랜드/푸드코트가 발행한 구독 청구) | — | — | `/pos/manager/invoices` | `/pos/manager/invoices` | — | `/pos/admin/invoices` |
| `contracts` | `/pos/suppliers/contracts`(리다이렉트 끝 확인) | — | `/pos/suppliers/contracts` | `/pos/suppliers/contracts` | `/pos/supplier/contracts` | — |
| `notices` | `/restaurant/:rid/notices` | `/pos/owner/notices` | `/pos/brand/general/notices` | `/pos/foodcourt/general/notices` | `/pos/supplier/notices` | `/pos/admin/notices` |
| `live_orders` | `/restaurant/:rid/live-orders` | — | — | — | — | — |
| `reservations` | `/restaurant/:rid/reservations` | — | — | — | — | — |
| `select_context` | `/pos/select-context` (전 자격 공통) | | | | | |

- «같음» = 라우트의 `requiredRole` 에 그 역할이 들어 있음을 App.tsx 로 확인한 것(§실측). `—` 는 그 자격의 메일에 그 target 이 안 쓰인다.
- **팀원 확인 2건(확인 못 함)**: ① `/pos/suppliers/contracts` 는 `<Navigate>` 로 시작한다 — 끝 주소와 역할 게이트를 열어서 확인. ② `issued_invoices` 가 `/pos/manager/invoices` 인지(브랜드가 매장에 발행한 구독 청구서 목록) 실브라우저로 확인. 둘 다 틀리면 표만 고친다.
- 댓글·문의·티켓(`/pos/dashboard` 로 가던 5곳)은 당장 대상 화면이 자격마다 달라 **`dashboard` target** 으로 보낸다(지금과 같은 결과·주소만 자격별로 정확히).

### 4-3. 진입 라우트 `/go` (프론트, 새 페이지 1개 — `pages/NotificationEntry/NotificationEntryPage.tsx`)
```
/go?ctx=brand:2:Brand%20General&to=%2Fpos%2Fbrand%2Fgeneral%2Fincoming-orders
```
1. `to` 검사: `/` 로 시작, `//`·`javascript:` 금지, 아니면 `/pos` (LoginPage 와 같은 규칙).
2. 비로그인 → `ProtectedRoute` 가 `/pos` 로 보내며 `state.from` 에 `/go?…` 가 남는다 → 로그인 뒤 LoginPage 가 `from` 으로 되돌린다(이미 있는 동작, `LoginPage.tsx:485-492`). 그때 선택 화면(`contexts.length>=2`)보다 `from` 이 먼저라 **/go 가 모자 판단을 이어받는다** — 순서 변경 없음.
3. 로그인 상태 → `refreshContexts()` 로 목록을 읽고 `ctx` 와 대조:
   - 현재 토큰이 이미 그 자격이면(`user.role` 일치 ∧ restaurant 는 `user.restaurantId==id` · brand 는 BG 또는 `user.brandId==id` · owner 는 role 일치 · supplier/admin 은 role 일치) → 바로 `navigate(to)`.
   - 목록에 맞는 카드가 있으면 → **한 번 확인**: «Open as K-DINE · Brand? Switching changes this browser's current workspace.» [Open] [Choose another]. [Open] → `switchContext(card)` → `navigate(to)`. (전환은 같은 브라우저 모든 탭이 따라온다 — `MULTI_CONTEXT_LOGIN_DESIGN.md §4.7`. 카운터 POS 탭이 조용히 바뀌는 사고를 막기 위해 자동 전환이 아니라 1탭 확인. 기기 고정 매장 확인(`ContextSelectPage onPick` 의 deviceRestaurant 규칙)도 같은 화면에서 재사용.)
   - 맞는 카드가 없으면 → `/pos/select-context` 로 보내며 `state.notice = { addresseeLabel }` → 선택 화면 위에 «This notification was sent to K-DINE Bangsar · Store. This account doesn't have that role.» 한 줄(기존 선택 화면에 배너 1개 추가).
4. 대조 규칙은 `utils/contextMatch.ts` 하나에 두고 `/go` 와 선택 화면 배너가 같이 쓴다(목록≠판정 갈라짐 방지 — 모자 설계 §5.3 불변식과 같은 이유).
5. `ctx` 의 role 은 `users.role` ENUM 문자열 그대로(«Restaurant Admin» 등). 오너는 `owner:{restaurant_id}:Restaurant Owner` — 카드 대조는 entity_type 'owner' + role 만 본다(오너 카드는 사람 단위).

### 4-4. 푸시 `url` 도 같은 규칙
`data.url` 은 `/go?…` 가 아니라 **직접 경로**(앱 안에서 이미 그 매장 토큰으로 열려 있고, 푸시 수신자 = `users.restaurant_id` 일치자라 모자 전환이 필요 없다). 단 경로는 `notificationLinks` 표에서 가져온다(예약 `/pos/reservations` → `/restaurant/:rid/reservations` 교정).

---

## 5. 알림 인벤토리 — 현재 → 설계 (이번 범위 = ✱ 표시)

자격/행동/target 만 적는다. 문구는 §3 문법으로 팀원이 쓰고 §8 ③ 렌더 파일로 확인한다. (수신자·카테고리·시점은 전부 그대로.)

### 5-1. 발주 — `services/poNotifications.js` (4언어 ✓)
| ✱ | 함수 | 자격 | 행동 블록 | 제목(새) | target |
|---|---|---|---|---|---|
| ✱ | fireSellerSubmittedNotification | seller(브랜드/푸드코트/공급업체) | ACTION «Confirm or reject this order.» | `[{seller} · Brand] Confirm order: {po} · {buyer} · {total}` | seller_orders |
| ✱ | fireBuyerReceivedNotification | seller | shipped? FYI : ACTION «Record dispatch so stock is deducted.» | `[… ] Record dispatch: {po} · received by {buyer}` / `[…] Receipt confirmed: {po} · {buyer}` | seller_orders |
| ✱ | fireOwnerApprovalPendingNotification | owner(매장) | ACTION «Approve or reject this purchase.» | `[{store} · Owner] Approve purchase: {po} · {total}` | po_approvals |
| ✱ | fireOwnerApprovalResultNotification | store(작성자) | RESULT 승인/반려/취소 (반려는 «Edit and resubmit if needed.») | `[{store} · Store] Approved: {po}` / `Rejected: {po}` / `Approval withdrawn: {po}` | po_detail |
| ✱ | fireBuyerConfirmNotification | store/brand/foodcourt(작성자) | isExternal ? ACTION «Send this PO to the supplier (WhatsApp/PDF/email).» : FYI | `[…] Order placed: {po} · to {seller}` / `[…] Send to supplier: {po} · {seller}` | po_detail |
| ✱ | fireSellerAmendedByBuyerNotification | seller | ACTION «Review the changes before confirming.» | `[…] Review changes: {po} · edited by {buyer}` | seller_orders |
| ✱ | fireSellerApprovalRevokedNotification | seller | ACTION «Do not fulfil until it is sent again.» | `[…] On hold: {po} · withdrawn for re-approval` | seller_orders |
|  | poExternalSendEmail · returnExternalSendEmail | 외부 공급업체(계정 없음, sendIssuerEmail) | — 자격 없음(account), preheader 만 | 그대로 | — |

### 5-2. 판매자 → 구매자 — `routes/seller-orders.js` 7종 (영어 고정 · 맨 HTML → wrapTemplate 이관)
| ✱ | 줄 | 자격 | 행동 | 제목(새) | target |
|---|---|---|---|---|---|
| ✱ | 555 Service completed | buyer(store/brand/foodcourt) | FYI | `[…] Service completed: {po} · {seller}` | po_detail |
| ✱ | 609 Order Confirmed | buyer | FYI «You'll get a dispatch update.» | `[…] Order confirmed: {po} · {seller}` | po_detail |
| ✱ | 937 Out for Delivery | buyer | ACTION «Confirm receipt when it arrives.» | `[…] Arriving: {po} · confirm receipt on delivery` | po_detail |
| ✱ | 1011 Rejected | buyer | RESULT(빨강) «Review the reason; reorder if needed.» | `[…] Rejected: {po} · {seller}` | po_detail |
| ✱ | 1076 Delivered | buyer | ACTION «Confirm receipt.»(미수령이면) / FYI | `[…] Delivered: {po} · confirm receipt` | po_detail |
| ✱ | 1284 Order Added | buyer | ACTION «Review added items.» | `[…] Items added: {po} · by {seller}` | po_detail |
| ✱ | 1504 Order Amended | buyer | ACTION «Review the changes.» | `[…] Order amended: {po} · by {seller}` | po_detail |
수신자: `getBuyerRecipientUserIds` 는 RA+오너 섞임 → §7 U2 의 자격 포함 리졸버로 교체(그 외 무변경).

### 5-3. 청구·정산 (영어 고정)
| ✱ | 자리 | 자격 | 행동 | 제목(새) | target |
|---|---|---|---|---|---|
| ✱ | invoiceCreatedEmail (invoiceScheduler:1205) | store / owner (RA+오너) | isTrial ? FYI «No payment during trial.» : ACTION «Pay by {due}.» | `[…] Pay invoice: {inv} · {amount} · due {date}` | invoices |
| ✱ | invoiceOverdueEmail (invoiceOverdueScheduler:60) | store / owner | ACTION(빨강) «Pay now to avoid suspension.» | `[…] Pay now — overdue: {inv} · {amount}` | invoices |
| ✱ | invoicePaidEmail (invoices-payment:690) | issuer = brand / foodcourt / admin | FYI | `[{issuer} · Brand] Payment received: {inv} · {amount} · {store}` | issued_invoices |
| ✱ | tradeInvoiceCreatedEmail | buyer | ACTION «Pay by {due}.» | `[…] Pay trade invoice: {inv} · {amount} · {seller}` | trade_invoices_buyer |
| ✱ | tradeInvoicePaidEmail | seller | FYI | `[…] Payment received: {inv} · {amount} · {buyer}` | trade_invoices_seller |
| ✱ | monthlySoaEmail (soaScheduler:270) | buyer | isExternal ? ACTION «Compare with the supplier's statement.» : ACTION «Pay by {due}.» | `[…] Pay statement: {seller} · {month} · {total}` | trade_invoices_buyer |
| ✱ | 독촉 3종 (brand-soa:195 · foodcourt-soa:170 · supplier:1000) | buyer | ACTION «Settle {n} unpaid invoices.» | `[…] Reminder — pay {n} invoices: {seller} · {total}` | trade_invoices_buyer |
**연체 수신자 #9 교정 포함**: `invoiceOverdueScheduler` 의 `restaurant.admin_id` → `getRestaurantAddressees(rid)` (다른 5곳과 같은 의미). 이것은 수신자 폭이 넓어지는 변경이라 §9 ②에 넣는다.

### 5-4. 계약·역할·근태·공지·댓글·문의
| ✱ | 자리 | 자격 | 행동 | target |
|---|---|---|---|---|
| ✱ | supplierContractRequested (supplier-directory:553·625) | supplier | ACTION «Approve or reject; set payment terms.» | contracts |
| ✱ | supplierContractApproved/Rejected/Terminated (supplier:1355·1408·1462) | buyer | approved: FYI «You can now order.» / rejected·terminated: RESULT | contracts |
| ✱ | contextRequestReceived / Result · contextInviteReceived / Result (4언어 ✓) | 승인자: store 또는 admin · 결과 수신자: account | received: ACTION «Approve or decline.» / result·invite: 기존 cta 유지 | select_context 또는 기존 approverLink |
| ✱ | attendance leaveRequested / leaveDecided (4언어 ✓) | store(관리자) / store_staff | ACTION «Approve or reject.» / RESULT | 기존 링크(있는 화면) 그대로 |
| ✱ | noticeReceived (4언어 ✓, `/pos/notices` ✗) | 수신자 역할별(notices.js 가 역할을 알므로 자격을 역할에서 파생) | FYI | notices |
| ✱ | comment/inquiry/ticket 5종 (`/pos/dashboard`) | 수신자 역할별 | inquiryReceived: ACTION «Reply.» / 나머지 FYI | dashboard |
| ✱ | trial_expiry (subscriptionScheduler:1155) | store / brand / foodcourt / owner | ACTION «Choose a plan and pay.» | invoices (payNowUrl 교정: `/pos/brand/general/invoices`·`/pos/foodcourt/general/invoices` ✗ → `/pos/brand/invoices`·`/pos/foodcourt/invoices`) |
|  | referral 7종 · qz-tray · public contact/quote · base64 sweep · system_health | referral / admin | FYI(기존) | 꼬리표·띠만(공통 틀 적용으로 자동), 문구 무변경 |

### 5-5. 앱 푸시·토스트 ✱ (`services/pushService.js` 호출 3곳)
| 자리 | 제목(새) | 본문 | url |
|---|---|---|---|
| orderNotificationService:53 | `New order · {restaurant.name}` | `#{number} · Table 3 · RM 25.00` (그대로) | `/restaurant/{rid}/live-orders` ✓ |
| reservationNotificationService:68 | `New reservation · {restaurant.name}` | 그대로 | `/restaurant/{rid}/reservations` (교정) |
| reservationNotificationService:92 | `Reservation {status} · {restaurant.name}` | 그대로 | `/restaurant/{rid}/reservations` (교정) |
- 매장 이름은 호출부가 이미 가진 `restaurant`(예약) 또는 `Restaurant.findByPk(order.restaurant_id, {attributes:['name']})` 1회(주문 — afterCommit 안이라 응답을 붙잡지 않는다).
- 푸시 payload 에 `entity: { type:'restaurant', id, name }` 을 함께 실어 토스트(`NotificationToaster.tsx`)가 제목 아래 작은 글씨로 매장 이름을 한 번 더 보여 준다(제목이 잘려도 보이게). 여러 매장 관리자(브랜드 모자 등)에게 «어느 매장» 이 보이는 유일한 장치.

---

## 6. «해야 할 일» 문장 사전 (4언어 키 `action.*`)
행동 문장은 템플릿마다 자유 작문하지 않고 **사전 키**로 쓴다(새 메일이 생겨도 같은 말투):
`confirm_or_reject_order` · `record_dispatch` · `approve_or_reject_purchase` · `send_po_to_supplier` · `review_changes` · `do_not_fulfil_on_hold` · `confirm_receipt` · `pay_by_due` · `pay_now_overdue` · `compare_statement` · `settle_unpaid` · `approve_or_reject_request` · `reply_inquiry` · `choose_plan_and_pay` · `no_action` · `for_your_records`.
결과 문장: `result.approved` · `result.rejected` · `result.withdrawn` · `result.terminated` (+ 각 메일이 붙이는 사유 행은 상세 표).

---

## 7. 구현 단위 (팀원이 바로 할 수 있는 크기 · 순서대로)

**이번 범위 (U1~U6, 모두 문구·주소·틀 — 수신자·카테고리·시점 무변경 · 외부 발송 없음)**

| 단위 | 내용 | 파일 | 검증 |
|---|---|---|---|
| **U1 공통 틀** | `wrapTemplate(meta)`·`withRenderMeta(extra)`·`emailLayout(opts)`(preheader·받는 분 띠·할 일 블록·바닥글 한 줄) · `sendNotification` 4단계(꼬리표 한 곳·재렌더 조건 완화·`_addressee` 팩토리 허용) · 4언어 키 `addressee.*`·`action.*`·`result.*`·`footer.receivingAs`·`preheader.*` | `utils/notificationTemplates.js` · `utils/emailTemplates.js` · `utils/notificationService.js` · `locales/{en,ko,zh,ms}/email.json` | 기존 3인자 호출 바이트 동일(스냅샷 1건) · 메타 없는 메일은 FYI 기본 |
| **U2 자격 포함 리졸버** | `getRestaurantAddressees(rid)` → `[{id, addressee}]` (RA=store · 오너=owner, 같은 사람 1회 — §2 우선순위) · `getSellerAddressees(seller_type, id)` · `getBuyerAddressees(entity_type, id)`. 기존 id 리졸버는 그대로 두고 이 함수들이 그것을 호출해 자격만 붙인다(수신자 집합 동일 — 단 연체 #9 는 U4 에서 교체) | `utils/notificationService.js` (+ `services/poNotifications.js` 의 `resolveBuyerName` 처럼 이름 조회) | 집합 동일성 테스트: 새 함수 id 집합 == 옛 함수 집합(매장 3곳·브랜드 2·푸드코트 1 표본) |
| **U3 링크 유틸 + /go** | 백엔드 `utils/notificationLinks.js`(§4-2 표 + `goLink(addressee, target, params)`) · 프론트 `/go` 라우트·`NotificationEntryPage`·`utils/contextMatch.ts`·선택 화면 배너 1줄 · i18n 4언어(`auth:go.*`) | 새 파일 2 + `App.tsx` 라우트 1 + `ContextSelectPage.tsx` 배너 | 라우트 대조 스크립트(§8 ②) · 실브라우저: 같은 자격 → 바로 이동 / 다른 모자 → 확인 → 전환 → 이동 / 자격 없음 → 선택 화면 배너 / 비로그인 → 로그인 → 복귀 |
| **U4 발주·청구·정산·독촉 적용** | §5-1·5-2·5-3 전부: 템플릿에 `_action`·`_preheader` 추가, 제목 §3-1 문법으로, 링크 `goLink`, 맨 HTML 10곳을 `wrapTemplate` 로 이관, 연체 수신자 #9 교정(§9 ② 승인 후) | `poNotifications.js` · `seller-orders.js` · `notificationTemplates.js` · `invoiceScheduler.js` · `invoiceOverdueScheduler.js` · `invoices-payment.js` · `soaScheduler.js` · `brand-soa.js` · `foodcourt-soa.js` · `supplier.js` | §8 ③ 렌더 파일 전수 + ④ 검사기 |
| **U5 나머지 메일 적용** | §5-4(계약·역할·근태·공지·댓글·문의·체험) 자격·행동·링크 | 해당 라우트·템플릿 | 같음 |
| **U6 푸시 3종** | 제목에 매장 이름 · 예약 url 교정 · payload `entity` · 토스트 부제 | `orderNotificationService.js` · `reservationNotificationService.js` · `NotificationToaster.tsx` | `routes/push.js:173` 시험 발송 + 토스트 캡처 |

빌드는 U3·U6 프론트 변경을 모두 끝낸 뒤 **1회**, `verify-all --full` 1회(공용 규칙).

**나중 범위 (별도 설계·승인 — 이번에 손대지 않는다)**
- **R1 모자 보유자 수신자 포함** — `user_contexts`(RA/Staff/BM 모자)와 네이티브 오너가 아닌 사람의 오너 모자를 수신자에 넣기(메일+푸시 `sendPushToRestaurant`). 수신 집합이 넓어지는 변경이라 §9 ③ 답 뒤에 설계. 개발 DB 0행이라 시드가 먼저.
- **R2 알림 설정 화면의 모자 반영** — `NOTIFICATION_CATEGORIES.roles` 가 네이티브 역할로만 거르므로 BG 에게 `invoice_created` 토글이 안 보인다. R1 과 한 묶음.
- **R3 영어 고정 템플릿 4언어화** (청구·정산·독촉·판매자→구매자·계약·체험·추천).
- **R4 판매자 받은 주문 상세 진입** — `seller_orders` 가 목록까지만 간다(상세 라우트 없음). `?po=` 하이라이트는 화면 설계가 필요.
- **R5 docs/EMAIL_NOTIFICATION_MATRIX.md 갱신** — 2026-04-04 판. 이번 구현이 끝나면 §5 표를 옮겨 적는다(배포 뒤, fable-gate 지문 규칙 때문에 기록은 나중에).

---

## 8. 검증 기준 (팀원이 돌리고 숫자로 남긴다 · «Fable 미검증(자체 검증)» 표기)
① **무회귀**: U1 뒤 메타 없는 기존 호출(예 referral 7종) 렌더 HTML 이 preheader/띠/바닥글 한 줄 외에 바이트 동일 — 적용 전후 diff 가 그 3곳뿐.
② **주소 전수 대조 스크립트**(`scripts/check-notification-links.js`, 게이트 밖·수동): `notificationLinks.js` 표의 모든 경로 패턴을 App.tsx `path=` 목록과 대조해 0건 미달. 템플릿·라우트 안에 `BASE_URL` 직접 결합이 남아 있으면 실패(= 버튼이 유틸을 안 거친 곳).
③ **렌더 전수 파일**: §5 의 ✱ 메일 전부를 시험 계정(is_test/@example.com, 실제 발송 안 됨)으로 돌려 HTML 을 `tmp/notification-render/*.html` 로 떠서 제목·preheader·띠·행동 블록·버튼 href 를 표로 뽑는다(최소 영어+한국어 각 1벌). 발송 로그 `[Notification] Sent` 0건 확인.
④ **행동 블록 누락 검사**: 템플릿 결과에 `_action` 이 없는데 제목이 동사로 시작하면 실패(문법 §3-1 과 ④ 가 어긋난 메일).
⑤ **/go 실브라우저 4경로**(U3 표) + 전환 시 다른 탭 팔로우가 기존대로 동작(`MULTI_CONTEXT_LOGIN_DESIGN.md §4.7`).
⑥ **고장주입 1회**: `contextMatch.ts` 에서 restaurant id 비교를 빼면 ⑤ 의 «다른 매장 모자» 경로가 확인 없이 통과하는지 → 검사가 실제로 실패하는 것을 본 뒤 원복.
⑦ `verify-all`(health-check·print-guard·design-guard·i18n) 통과. 🔒 보호파일 무접촉.

---

## 9. Irene 컨펌이 필요한 항목 (각각 선택지 · 결과 · Fable 권고)

① **제목 꼬리표 위치** — 자격을 제목 **맨 앞** `[K-DINE · Brand] Confirm order: PO-… · RM 1,200` (A) vs **맨 뒤** `Confirm order: PO-… · RM 1,200 — K-DINE (Brand)` (B).
   A: 휴대폰 목록에서 자격이 항상 보임, 대신 동사가 뒤로 밀려 긴 매장명이면 할 일이 잘릴 수 있음. B: 할 일이 먼저 보이고 자격은 잘릴 수 있음(지금 혼란의 원인이 자격).
   **Fable 권고: A.** 자격이 갈리지 않는 것이 지금 문제의 뿌리이고, 할 일은 미리보기 줄이 받쳐 준다.
   **제목 꼬리표를 맨 앞에 두는 A 로 갈까요?**

② **연체 메일 수신자 교정(#9)** — 지금은 `restaurants.admin_id` 한 명. 다른 5곳과 같은 «관리자 전원 + 오너» 로 맞추면 연체 메일을 받는 사람이 늘어난다(관리자 2명 매장·admin_id 비거나 남의 매장 관리자인 매장 3곳 — 2026-08-31 실측).
   **Fable 권고: 이번 U4 에 포함**(같은 뜻을 한 곳만 다르게 둘 이유가 없고, 연체는 가장 받아야 하는 메일).
   **연체 메일도 관리자 전원 + 오너에게 보내도록 바꿀까요?**

③ **모자 보유자 수신(R1)** — 한 계정에 부여된 모자(예: BG 계정의 매장 RA 모자·오너 모자)로도 그 매장/브랜드 알림을 받게 할지. 지금은 네이티브 역할 몫만 받는다.
   예: BG 계정이 매장 38 RA 모자를 쓰면 매장 38 청구서·발주 결과 메일이 **추가로** 온다. 메일 수가 늘고, 알림 설정 화면(R2)도 같이 바꿔야 한다.
   **Fable 권고: 다음 설계로 분리하되 «예» 로 방향 확정.** 모자를 쓴 사람이 그 자리 알림을 못 받는 것은 모자 기능의 반쪽이다. 단 이번 범위(문구·주소)와 섞으면 검증이 두 배라 따로.
   **Irene 운영 계정은 «한 계정 + 모자» 인가요, «계정 2개» 인가요? 그리고 모자로도 알림을 받는 방향(R1)으로 다음 설계를 잡을까요?**

④ **메일 버튼이 모자를 바꿀 때 확인 1탭** — 자격이 다르면 «K-DINE · Brand 로 열까요?» 확인 화면을 한 번 거치게 할지(A), 확인 없이 자동 전환(B).
   B 는 같은 브라우저의 카운터 POS 탭이 조용히 다른 매장으로 바뀔 수 있다(전환은 전 탭 팔로우).
   **Fable 권고: A.** 1탭 비용으로 현장 사고면을 닫는다. 이미 그 자격이면 확인 없이 바로 열린다.
   **모자 전환이 필요할 때만 확인 1탭을 두는 A 로 할까요?**

그 외(자격 단어·행동 문장·색·4언어 번역)는 Fable 설계값 그대로 팀원이 진행한다 — 되돌릴 수 있는 문구라 Irene 확인 없이 간다. ①~④ 답이 오기 전에도 **U1·U2·U3·U6 는 답과 무관**하니 먼저 끝낸다(①은 꼬리표 조립 한 줄, ②는 리졸버 한 줄, ④는 /go 분기 하나만 바뀐다).
