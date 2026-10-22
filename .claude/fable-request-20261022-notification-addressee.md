# Fable 설계 요청 — 알림(메일·앱) 제목·미리보기·본문: «누구로서 받는지» · «무엇을 해야 하는지» (2026-10-22 · 작업방 1f5a0efb)
결과 파일: .claude/fable-design-20261022-notification-addressee.md (Fable 이 씀)

## Irene 원문
«멀티로그인을 사용하면서 알림이 문제가 되고 있어. 이메일이든 앱이든 오는 알림 멘트가 브랜드제너럴인 내게 보내는 건지, 레스토랑관리자인 내게 보내는 건지, 브랜드오너에게 보내는 건지 모르겠고, 무슨 할일을 해야 한다는게 명확하지가 않아. 전체적으로 검토해서 더 확실하게 인지되게 제목, 미리보이는 멘트, 그리고 안에 상세내용을 정돈해 줄 수 있어?»

## 읽을 것
- 발송 관문: dev-backend/utils/notificationService.js (sendNotification · 수신자 해석 getBrandManagerIds / getFoodcourtManagerIds / getRestaurantOwnerIds / getRestaurantAdminAndOwnerIds / getRestaurantAdminIds / getSupplierAdminIds · resolveReceiverBranding · mailOptions 팩토리 `(user)=>` · _brandingEntity)
- 메일 틀: dev-backend/utils/emailTemplates.js emailLayout(40~107) · utils/notificationTemplates.js (wrapTemplate · withRenderMeta · 템플릿 전부) · 문구 dev-backend/locales/{en,ko,zh,ms}/email.json (po.* · contextRequest.* · contextInvite.* · attendance.* · notice · comment 등만 4언어, 나머지는 영어 하드코딩)
- 발주 알림 묶음: dev-backend/services/poNotifications.js · routes/seller-orders.js(131 fireBuyerNotification · 554~1504 판매자→구매자 메일 7종, 영어 하드코딩 HTML)
- 청구: services/invoiceScheduler.js:1205 · services/invoiceOverdueScheduler.js:60 · routes/invoices-payment.js:690 · services/soaScheduler.js:270 · routes/brand-soa.js:195 · routes/foodcourt-soa.js:170 · routes/supplier.js:1000(독촉 3종 같은 맨 HTML)
- 기타 발송처: routes/supplier-directory.js:553·625 · routes/supplier.js:1355·1408·1462(계약) · routes/notices.js:506 · routes/comments.js:206~242 · routes/support-tickets.js · routes/operationTickets.js · routes/attendance.js:737·745 · routes/context-requests.js:116~271 · services/subscriptionScheduler.js:994~1162(체험·계약 만료) · services/referralService.js · routes/referrals.js · routes/qz-tray.js:560 · routes/public.js · services/base64ImageSweep.js
- 앱(푸시·앱 안 토스트): services/pushService.js(sendPushToUser → emitInApp `user:{id}`) · 호출은 3곳뿐 — services/orderNotificationService.js:53(«New Order», body «#번호 · Table 3 · 25.00», 매장 이름 없음) · services/reservationNotificationService.js:68·92(«New Reservation» / «Reservation {status}», 매장 이름 없음) · routes/push.js:173(시험). 수신 = sendPushToRestaurant = users.restaurant_id 일치 RA·Staff 만. 화면 dev-frontend/src/components/Common/NotificationToaster.tsx
- 멀티 로그인(모자): docs/MULTI_CONTEXT_LOGIN_DESIGN.md · dev-backend/services/userContexts.js(listContexts 209~: 기본 카드 + RA/Staff 모자(restaurant) + Brand Manager 모자(brand) + 오너 모자(restaurant_managers ownership, 네이티브 역할이 Owner 아닌 사람)) · POST /api/auth/switch-context(routes/auth.js:689) · 선택 화면 /pos/select-context
- 예전 매트릭스(낡음, 2026-04-04): docs/EMAIL_NOTIFICATION_MATRIX.md

## 팀원 실측 (개발 코드 · 2026-10-22)
1. **메일 머리에 «받는 자격» 이 없다.** 제목 예: «New PO PO-R8-…-001 from K-DINE Bangsar» · «Order Confirmed: PO-…» · «Invoice INV-… - RM 120.00 Due …» · «Approval needed: PO …» · «[Reminder] Unpaid invoices from K-DINE». 받는 사람이 판매자(브랜드)로서인지, 구매자 매장 관리자로서인지, 오너로서인지 제목·본문 어디에도 안 쓴다. 머리글(로고 자리)은 수신자 기준 브랜딩(resolveReceiverBranding) — 브랜드/매장 이름이 보이지만 «당신의 자격» 은 아님.
2. **미리보기 줄(preheader) 없음.** emailLayout 에 숨김 미리보기 문구가 없어, 메일 목록 미리보기에는 머리글 이름(로고 없으면 브랜드 이름 텍스트) + 제목 h2 가 그대로 보인다.
3. **해야 할 일 표시가 메일마다 제각각.** 발주 판매자 메일은 상태줄 «Awaiting confirmation» + hint, 승인 메일은 «Review & Approve» 버튼, 청구서 생성 메일은 «View Invoice», 판매자→구매자 메일 7종(seller-orders.js)은 맨 HTML 문단, 독촉 3종은 <p> 3줄(틀 없음·4언어 없음).
4. **메일 버튼 주소 다수가 없는 화면(App.tsx `path="*"` → NotFoundPage).** 실제 Route 목록(App.tsx path= 226개)과 대조:
   - `/pos/seller-orders` (poNotifications 판매자 메일 5종 + seller-orders.js 중 일부) → 없음. 실제 판매자 화면 = 공급업체 `/pos/supplier/orders` · 브랜드 `/pos/brand/general/incoming-orders` · 푸드코트 `/pos/foodcourt/general/incoming-orders`
   - `/pos/invoices` (청구서 생성·연체·결제확인 4곳) → 없음. 실제 = RA `/restaurant/:rid/invoices` · 오너 `/pos/owner/invoices` · 브랜드 `/pos/brand/invoices` · 푸드코트 `/pos/foodcourt/invoices` · 매니저 `/pos/manager/invoices` · SA `/pos/admin/invoices`
   - `/pos/notices` · `/pos/supply/contracts`(6곳) · `/supplier/contracts` · `/pos/seller/orders`(2) · `/pos/brand/general/invoices` · `/pos/foodcourt/general/invoices` · `/pos/purchase-invoices` → 없음. `/pos/restaurant/invoices` 는 LegacyRestaurantRedirect.
   - 있는 것: `/pos/purchase-orders/history`·`/:id` · `/pos/owner/po-approvals` · `/restaurant/:rid/invoices|staff|attendance|my-attendance` · `/pos/select-context` · `/pos/dashboard`
   (브라우저 실측은 아직 — 라우트 표 대조만. 확인 못 함.)
5. **버튼이 모자를 바꾸지 않는다.** 여러 모자를 가진 사람이 지금 RA 모자로 들어와 있으면 판매자·오너 화면 주소는 ProtectedRoute(requiredRole) 에 막힌다. 주소로 모자를 고르는 장치 없음(switch-context 는 화면 안 버튼만).
6. **수신자 해석이 모자를 안 본다(사실만).** 위 해석 함수들은 users 스칼라(role·restaurant_id·brand_id) + brands.owner_id + restaurant_managers(ownership, 단 role='Restaurant Owner' 조건) 만 본다. user_contexts 의 RA/Staff 모자 · Brand Manager 모자 · 네이티브 역할이 Owner 아닌 사람의 오너 모자는 수신자에 안 들어간다. 즉 «한 계정 여러 모자» 사람이 받는 메일은 네이티브 역할 몫 + brands.owner_id 몫뿐. (운영 실계정 조회는 이 방 허락 거부로 못 함 — Irene 계정이 어떤 조합인지 확인 못 함.)
7. **언어**: 발주·모자·출퇴근·공지·댓글은 수신자 preferred_language 4언어. 청구서·정산서·독촉·판매자→구매자 7종·계약·체험·추천은 영어 고정.
8. 앱 알림(푸시·토스트)은 주문·예약 3종뿐이고 제목에 매장 이름이 없다(«New Order»). 여러 매장 관리자는 어느 매장 주문인지 모른다.
9. 카테고리 = routes/notification-settings.js NOTIFICATION_CATEGORIES(개인 켜고 끄기 키). 문구만 바꾸면 카테고리 키·수신자·발송 시점은 그대로.

## 제약
- 운영 쓰기·배포 없음 · 외부 발송 없음(시험은 is_test/@example.com 계정이라 실제로 안 나감 — 렌더 결과를 파일로 떠서 확인)
- 🔒 인쇄 보호파일 8개·KDS 무접촉(이번 범위 파일들은 보호파일 아님 — orders-crud.js 는 알림 호출 없음)
- 이 방 외 다른 방 미커밋 없음(git clean)

## 바라는 결과
설계(모든 알림에 공통으로 적용할 제목·미리보기·본문 규칙 + 버튼 주소 규칙 + 이번에 할 범위/나중 범위) + Irene 컨펌이 필요한 항목(선택지·결과·Fable 권고) + 팀원이 바로 구현할 수 있는 단위
