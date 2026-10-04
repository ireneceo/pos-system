# Fable 판정 — 오너가 매장 대신 발주 (2026-10-04)

Irene 원문: 「레스토랑 오너 메뉴에 퍼체스오더가 있는데 클릭이 안돼. 오너가 직접 레스토랑 대신해서 발주 가능한거야? 오너가 발주하면 해당 레스토랑 히스토리로 들어가는 거 아니야?」

## 0. 실측 사실 (팀원 보고 + Fable 직접 확인)
- 오너 사이드바 «Purchase Order»(`/pos/purchase-orders`)는 **2026-05-11 사이드바 리디자인 때부터** 있던 항목(MainLayout.tsx 🔒). 9-24 판정 뒤 9-25 에 App.tsx `OwnerToPoHistory` 가 오너를 Order History 로 돌려 «눌러도 안 열림» 이 됐다. 메뉴를 못 고친 이유 = 🔒 보호파일.
- 서버 `middleware/buyerScope.js`: 오너의 매장 전환(`?entity_type=restaurant&entity_id=N`, ownership 확인)은 **GET /api/purchase-orders\* 만** 허용, 쓰기 403. 다매장 오너(restaurant_id 없음)는 외부공급업체·발주 목록만.
- **그런데** `resolveBuyerFromUser`: `restaurant_id` 가 박힌 단일매장 오너는 전환 쿼리 없이 부르면 그 매장 실체로 떨어져 **쓰기까지 통과**한다. 즉 «오너는 안 만든다» 는 서버에서 절반만 강제돼 있다(다매장만 막힘). 지금은 프론트 리다이렉트가 유일한 문.
- 승인 게이트 `utils/poOwnerApproval.applySubmitGate` 단일 소스(submit/bulk/외부전송 3경로 공유): 매장 발주 → 오너 연결 + `requirePoOwnerApproval !== false` 면 `pending_approval`.
- 발주 주인 칸 `purchase_orders.entity_type/entity_id` 는 항상 매장(9-24 §H-3). 오너 실체 발주 행은 존재하지 않는다.
- 9-24 «오너=슈퍼바이저» 판정 중 «오너는 발주를 만들지 않는다(§2-A)» 는 Irene 원문(「오너는 슈퍼바이저 같은 거지 … 자기 가게들이니까」)에서 Fable 이 **추론**한 조항이다. Irene 이 «안 만든다» 고 말한 기록은 없다.

## 1. 판정
**바꾼다 — 단, §2-A 한 조항만.** 오너는 소유 매장 하나를 골라 **그 매장 자격으로** 발주를 만들고 제출할 수 있다. 발주 주인은 그대로 매장이므로 **그 매장의 Order History 에 들어간다**(Irene 예상 그대로). 오너가 직접 만든 발주는 **오너 승인 단계를 거치지 않고** 바로 제출된다(승인자가 작성자).

근거:
1. Irene 의 오너 모델은 «내 가게들의 슈퍼바이저, 내 돈». 자기 돈으로 자기 매장 물건을 못 시키는 건 인위적 제한이고, 지금 Irene 이 그 기대를 직접 말했다.
2. 데이터 모델은 이미 맞다 — 발주 주인 = 매장. **새 실체·새 목록·새 경로 0**(TRADE_STRUCTURE 규칙 충족). 오너는 «매장으로 행동» 할 뿐이다.
3. 서버가 단일매장 오너에게는 이미 쓰기를 열어 두고 있다 → «안 만든다» 는 사실상 반쪽 규칙. 한쪽으로 통일해야 하고, Irene 의 말이 방향을 정했다.
4. 🔒 MainLayout 무접촉 — 메뉴는 그대로 두고 **동작만 살리면** 된다. bless 불필요.

9-24 의 나머지(발주 주인=매장 · 오너 공급업체=상속 · 오너 목록=소유 매장 전체 한 표 · 매장 전환은 서버가 ownership 확인)는 **그대로**.

3축: A 돈·주문(오너가 승인 없이 공급업체로 내보냄 — 승인자 본인이라 우회 아님) · B 코드만, 마이그 0, 운영 DB 쓰기 0 · C 갈림(유지 vs 변경) → Fable 1회. 게이트 판정 1회 더(보안 경계 buyerScope).

## 2. 설계 절단면 (이것만. 벗어나면 중단)
**원칙: «오너가 매장 N 으로 행동» = 그 요청에서 매장 N 의 RA 와 같은 구매자 실체.** 서버가 요청마다 ownership 을 확인한다. 오너 전용 실체·칸·상태를 새로 만들지 않는다.

### 2-1 서버 `middleware/buyerScope.js`
- 오너 전환(`?entity_type=restaurant&entity_id=N`, ownership 확인)에서 `isPoRead` GET 한정을 푼다 → **발주 작성 흐름이 실제로 부르는 라우트**에 한해 모든 메서드 허용. 어떤 라우트인지는 팀원이 New PO·Staging·Detail 화면의 실제 호출을 **실측**해 목록으로 보고에 적는다. 그 목록 밖(외부공급업체 등록·수정·삭제, 재고, 재료 연결 쓰기, 수령)은 **그대로 403**.
  - 공급업체 추가는 오너 자기 실체(상속 경로)로 한다 — 매장으로 행동하며 매장 전용 업체를 넣는 길은 열지 않는다(열면 새 경로).
  - 수령·원가대조는 매장 몫(물건은 매장에 있다). 이번에 열지 않는다.
- 단일매장 오너(restaurant_id 있음)는 기존 `resolveBuyerFromUser` 경로 그대로(이미 그 매장). 다매장 오너는 전환 없이 쓰기 → 403 유지(매장을 골라야 한다).

### 2-2 승인 게이트 `utils/poOwnerApproval.applySubmitGate`
- 제출 주체가 **그 매장의 ownership 오너**면 `needsApproval=false` → `submitted`. tracking 이벤트에 «오너 제출(승인 생략)» 기록. 단일 소스 유지(3경로가 같이 바뀐다), 호출부는 actor(user) 만 넘긴다.
- 매장(RA/Staff)이 제출하면 **지금과 동일** `pending_approval`. 이 둘을 같은 테스트에서 함께 증명.

### 2-3 프론트
- `App.tsx` `OwnerToPoHistory` 삭제(+ 주석 2곳 갱신).
- `NewPurchaseOrderPage` / `PurchaseOrderStagingPage`: 오너면 **매장 선택이 먼저**(다매장: 소유 매장 중 하나 필수 선택, «전체» 없음 · 단일매장: 자동). 기존 `utils/ownerPoScope.ts` 와 PO 목록의 매장 선택 패턴을 **재사용**, 새 컴포넌트 금지. 선택 뒤 모든 호출에 전환 쿼리.
- `PurchaseOrderDetailPage` `ownerView`: 오너가 만든 **초안의 수정·제출·삭제**는 보이게, 수령·대조 버튼은 계속 숨김.
- 🔒 `MainLayout.tsx` **무접촉**(메뉴 그대로 동작). check-print-guard 0 이어야 한다.

### 2-4 문서
- `docs/PURCHASE_ORDER_SYSTEM.md` 해당 절 + `docs/RESTAURANT_OWNER_PLAN.md:155` + `docs/SUPPLIER_CONTRACT_SYSTEM.md §H-3` 의 «오너는 발주를 만들지 않는다(403)» 를 이 판정으로 갱신(날짜·근거 한 줄). 기록은 배포 뒤(게이트 지문).

## 3. 증명 (팀원 실행, 결과만 Fable 로)
1. API: 다매장 오너 토큰 → `POST /api/purchase-orders?entity_type=restaurant&entity_id=N`(소유) 201, 행 `entity_type=restaurant, entity_id=N` · 비소유 N → 403 · 전환 없이 POST → 403 · 제출 → `submitted`(pending_approval 아님) + tracking 오너 기록 · 같은 매장 RA 토큰 Order History 에 보임 · RA 가 제출한 발주는 여전히 `pending_approval`.
2. 고장주입 2건(각각 pm2 restart 뒤): (a) ownership 확인 제거 → 비소유 매장이 201 되어 테스트 ✗ 인지 (b) 게이트의 오너 분기 제거 → 오너 발주가 pending_approval 로 떨어져 ✗ 인지. 원복 후 재통과.
3. health-check security 에 영구 케이스 2건 추가(비소유 403 · 오너 제출=승인 생략/매장 제출=대기).
4. `check-sensitive-diff` → 보안 경계라 Fable 게이트 대상이 맞다. `check-print-guard` 0.
5. 프론트: 코드 전부 확정 → 빌드 1회 → `verify-all --full` 1회. 클릭 흐름 1회: 오너 로그인 → Purchase Order → 매장 선택 → 품목 → 제출 → 그 매장 Order History 에 보임 → 그 매장 RA 로그인에서도 보임.
6. 데모 매장(dev id=38 계열)만 사용. 운영 DB 쓰기 0.

## 5. 추가 사안 ② — 오너 승인 화면(/pos/owner/po-approvals) 버튼·문구
Irene 원문: 「주문이 여기로 들어오면 POs 화면에 나오는 버튼들 있어야지. 오너가 발주를 할텐데. 아니면 승인만 하더라도 오너가 할 수도 있잖아. 왓츠앱 pdf 등 발주에 필요한 내용들 필요해. 그리고 승인 누르면 … 공급처로 전송된다는 건 내부 이 솔루션 업체만 아니야? 외부업체에 전송된다는게 뭐야?」

### 5-0 실측
- `OwnerPoApprovalsPage.tsx`: 행 = 번호·매장·공급업체·품목수·금액·상태·날짜 + **승인·반려만.** 상세 링크·PDF·WhatsApp·Email 없음.
- 승인 확인 문구(`purchaseOrders.json ownerApprovals.approveConfirm`) «공급처로 전송됩니다» 는 공급업체 종류를 안 가린다.
- 서버 `POST /:id/approve`: 외부·가입 구분 없이 `status='submitted'` + 판매자 통지. **가입 공급업체**는 그 통지가 곧 전달이라 문구가 참. **외부 공급업체(계정 없음)** 는 시스템이 안 보낸다 — 승인 뒤 매장이 **상세 화면**에서 WhatsApp/Email/PDF 로 직접 보낸다(`PurchaseOrderDetailPage` `detail.is_external && submitted…` 블록, 단 `!ownerView` 안이라 **오너에게는 숨겨짐**). Staging 문구 «승인 후 발송 버튼이 열립니다» 도 반쯤 틀림 — 승인되면 staging(draft 만 조회)에서 사라지고 상세로 가야 한다.
- 오너의 PDF(`GET /:id/pdf`)·상세 조회는 매장 전환 GET 으로 **지금도 허용**(buyerScope). WhatsApp·Email 공유는 클라이언트(`utils/poShare`)라 서버 변경 0.
- **Irene 의 의심이 맞다**: 외부 공급업체 발주에 «공급처로 전송됩니다» 는 거짓.

### 5-1 판정
오너 승인 화면은 **«승인 뒤 보내기»까지 끝나는 화면**이 된다. 서버 경계 변경 0 — 프론트 + 읽기 전용 응답 칸 추가만. 사안 ①(대리 발주) 답과 **무관하게 진행 가능**.

1. **문구를 공급업체 종류로 가른다** (4개 언어):
   - 가입 공급업체: «"{{po}}" 발주를 승인할까요? 승인하면 공급업체 앱으로 주문이 전달됩니다.»
   - 외부 공급업체: «"{{po}}" 발주를 승인할까요? 이 공급업체는 앱을 쓰지 않아 자동으로 보내지 않습니다 — 승인 뒤 WhatsApp·PDF·이메일로 보내 주세요.»
   - 판정 칸 `is_external` 을 `GET /purchase-orders/pending-approval` 응답에 넣는다(목록·상세가 쓰는 같은 해석기 재사용 — 새 판정 로직 금지). `restaurant_id`(=entity_id) 도 전환 쿼리용으로 그대로 내려준다(이미 `entity_id` 로 있음 — 프론트가 그걸 쓴다).
2. **행 버튼** (RA 발주 화면과 같은 공용 ThemedButton small, 순서 고정): `상세`(오너 전환 링크, 기존 ownerPoScope) · `PDF`(미리보기 — staging 의 `openPdfPreview` 패턴 재사용, 전환 쿼리 포함) · 외부만 `WhatsApp` · `Email` · `승인` · `반려`.
   - **승인 전에는 WhatsApp·Email 비활성**(툴팁 «승인 후») — staging 과 같은 규칙: 승인 안 된 발주를 공급업체에 보내지 않는다. PDF 보기는 승인 전에도 됨(검토용).
   - **승인 직후** 그 행은 사라지지 않고 **«방금 승인 — 보내기»** 띠로 같은 자리에 남아 WhatsApp·Email·PDF·상세가 활성(화면 상태만, 새 DB 칸 0). 화면을 떠나면 사라지고, 이후는 상세 화면에서 보낸다.
3. **상세 화면 `ownerView`**: 외부 공급업체 발주의 WhatsApp·Email·PDF 블록을 오너에게도 보이게(`!ownerView` 밖으로). 수령·결제·대조는 계속 숨김.
4. Staging 문구 `externalHintApproval` → «오너 승인을 받아야 보낼 수 있습니다. 승인되면 발주 상세 화면(또는 오너 승인 화면)에서 WhatsApp·PDF·이메일로 보냅니다.»
5. 팀원 **사실 확인 1건**: 외부 공급업체 발주 승인 때 `fireSellerSubmittedNotification`·`seller-order-created` 가 실제로 무해(no-op)인지. 무해면 무접촉, 무언가 보내면 **보고만**(이 사안에서 고치지 않음).

증명: 데모 매장 외부·가입 발주 각 1건 pending_approval → 승인 화면에서 문구가 갈리는지 · PDF 열림 · 승인 뒤 띠에서 WhatsApp 링크(wa.me) 생성 · 비소유 매장 PO id 로 PDF → 403/404 · 상세 ownerView 에서 외부 발주 보내기 버튼 보임. `check-sensitive-diff` 결과대로(경계 변경 없으면 비대상).

## 6. 추가 사안 ③ — Order History 에서 오너 «삭제»
Irene 원문: 「주문내역에서 삭제도 못하고 오너가 주문하고 나면 삭제도 해야 하는데」

### 6-0 실측
- 발주는 **삭제가 아니라 취소**다: `DELETE /:id` 는 초안 폐기(staging), 보낸 뒤는 `POST /:id/cancel`(draft·submitted·pending_approval 만, 그 뒤는 반품 흐름). 취소돼도 행은 `cancelled` 로 남는다 — 돈·공급업체 기록이라 지우지 않는다(RA 도 못 지운다).
- RA 의 Order History 목록에도 취소 버튼은 없다 — RA 는 **상세 화면**의 «취소» 를 쓴다. 오너 상세는 `ownerView` 라 그 버튼이 숨겨져 있고, 서버도 오너 전환 POST 를 403.

### 6-1 판정
- «삭제» = **취소**로 답한다(기록 유지, RA 와 같음). 오너도 소유 매장 발주를 **취소**할 수 있어야 한다 — 자기가 만든 것뿐 아니라 매장이 만든 것도(슈퍼바이저). 조건은 서버 `cancel` 과 동일(draft·submitted·pending_approval).
- 위치는 **RA 와 같은 자리 = 상세 화면**(RA 가 디자인 기준). 목록 행에 새 삭제 버튼을 만들지 않는다(RA 에도 없음 → 두 화면이 갈라진다). 오너 목록 → 상세 → 취소.
- 서버: `POST /:id/cancel` 을 오너 매장 전환(ownership 확인)에서 허용 — **사안 ① 2-1 라우트 목록에 포함.** Irene 이 ①을 거절해도 이 한 라우트는 연다(§4 대안에 포함).
- 상세 `ownerView`: 취소 버튼을 오너에게도(기존 `openCancel`, 같은 조건). 취소 사유·통지는 기존 흐름 그대로.
- 증명: 오너 토큰 소유 매장 submitted 발주 cancel → 200·cancelled·tracking · 비소유 → 403 · received 상태 → 400 그대로 · 고장주입: ownership 확인 제거 → 비소유가 200 되어 ✗.

## 4. Irene 이 «아니, 오너는 안 시켜» 라고 하면 (대안)
MainLayout 오너 메뉴에서 «Purchase Order» 한 줄 제거(+bless) 하고 리다이렉트 유지. 그리고 단일매장 오너 쓰기 통과(§0 세 번째)도 막아 서버 규칙을 온전하게 한다. 이 길은 Fable 권고가 아니다. 이 경우에도 §5(승인 화면)·§6(취소, cancel 라우트 1개만 오너 전환 허용)은 그대로 진행한다.

## 8. 게이트 판정 (2회차 · 2026-10-04) — **PASS**
범위: ②③ + 같은 날 팀원 수정(발주 번역 89×4·DatePeriodFilter t() · 내역 Invoice 버튼 경로 · 청구 총액 표시 · 월결제 발주 Pay 차단 PAY_VIA_SOA · 설정 Operations 카드 정렬). ①은 다음 섹션(OwnerToPoHistory·applySubmitGate·작성 경로 diff 0 — Fable 직접 확인).
- diff 대조(Fable 직접): buyerScope 개방은 `POST ^/api/purchase-orders/\d+/cancel(\?|$)` 하나, ownership 확인 그대로, cancel 라우트 `checkPOOwnership` 이 전환 매장과 대조 · recordPayment 차단은 `utils/payViaSoa.payViaSoa` 단일 소스 · pending-approval `is_external` 은 `sellerNames.isExternalSeller` 재사용 · MainLayout·App.tsx·poOwnerApproval 무접촉 · 마이그 0 · SW 5.82 번들 = dev-frontend-build 실측 일치.
- 기계 게이트: health-check 290/290(Fable 재실행) · check-sensitive-diff ②⑤ 대상 · print-guard 8/8 · verify-all --full 24/24 · i18n 0 (팀원).
- 반증(Fable 직접): buyerScope `if (!owned) 403` 제거 → security 2건 실패 검출(오너 취소 + 상속 보기) → cp 원복 cmp 동일 → 69/69. recordPayment 차단 제거 → Pay 200 검출(팀원 보고).
- 확인 불가(명시): 오너 승인 화면·오너 상세 취소의 실브라우저 클릭(데모 오너 모자에 pending_approval 픽스처 없음, mount 는 통과). 배포 뒤 Irene 눈 확인 1회(help@ 오너 모자 → PO Approvals).
- 남김: 승인 메일 «공급업체에 보냈습니다» 외부 공급업체엔 거짓 — 다음 섹션. health-check 월결제 원복 결함(JSON 문자열) 수정은 안전망 자체 변경이나 근거 명확(테스트 간 오염 제거).

## 7. 순서
§5·§6 은 Irene 의 ① 답과 무관하게 **지금 착수 가능**. ①은 Irene 답 뒤. 셋을 한 묶음으로 코드 확정 → 빌드 1회 → verify-all --full 1회 → Fable 게이트 1회(buyerScope 변경 포함되면 대상).
