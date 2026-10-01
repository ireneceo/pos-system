---
## 현재 작업 상태
**마지막 업데이트:** 2026-10-01 (v3.106 배포 · 결제 뒤 발주 금액 정정)
**버전:** 운영 **v3.106** · SW 운영·개발 **5.68-paid-po-total-fix-20260930** (v3.106 배포 2026-10-01 18:29 UTC · 백업 20261001_182217 · 스모크 10/10)
**작업 상태:** 🟡 A안 미배포 · 🔵 GHL 설계

### 진행 중인 작업
- 🟡 **[Claude Code] A안 — dev 완료 · 운영 미배포 (SW 5.69-seller-unlinked-service-20261001)** — Fable 설계 `.claude/fable-design-20261001-a-plan.md`, Irene 컨펌 Q1~Q4 권고대로(「응. 진행해줘」)
  - S1 `utils/orderFulfillment.serviceLineIdsOf` · S2 `services/purchaseOrderReceive` 서비스 줄 수령 재고 무접촉 · S3 `routes/seller-orders.js linkUnlinkedBrandItems`(주문 추가·품목 수정 공용) + amendable-products 미연결 포함 · S4 IncomingOrdersView 수정 모달 −id · S5 health-check inventory «A안 … (P1~P7)» · S6 TRADE_STRUCTURE §2-4·§4 + PURCHASE_ORDER_SYSTEM + 메모리 · S7 SW 5.69
  - 검증: health 274/274 · 고장주입 2건(서비스 skip 제거→재고 10 ✗ / 소유검사 제거→P3 ✗) 원복 48/48 · verify-all --full 23/24 → deploy-ready(기록 in_progress 빈 배열) 수정 후 단독 1/1 · mount sweep 크래시 0 · print-guard 8/8 · check-sensitive-diff 비대상
  - 👉 Irene `/배포` 대기. 배포 뒤 매장8 PO 87 수령 → 재료 1253 재고 0 확인(P10)
- 🔵 **[Claude Code] 카드머신 GHL 자동연동** — Irene 제공 규격서(NTT DATA POS/ECR v2.9.26, 기밀 — 저장소 반입 금지, 사본 scratchpad 만)·LAN 연결 그림·인증 테스트 시트. Fable 설계 요청 중 → `.claude/fable-design-20261001-ghl-ecr.md`

### 완료된 작업 (2026-10-01) [Claude Code]
- **v3.106 운영 배포** — 결제 뒤 발주 금액 정정. Fable 게이트 PASS(`.claude/fable-verdict-20261001-paid-po.md`, 운영 사본 diff 설계 밖 0 · 고장주입 3갈래 · 운영 읽기 매장10 PO 12·26·52 시프트 1개). 배포 전 build:dev + verify-all 23/23. 운영 코드 반영 grep 확인 · health ok · 공지 v3.106(수신자 9)
  - 👉 Irene 실사용 확인 대기: 매장10 PO 12·26·52 중 1건 대조 «이 총액으로 확정» → 현금관리 차액 줄
  - Fable 비차단 후속 3: ① 대조 결과에 paid_adjustment 표시(시프트 0/2+면 드로어 조용히 미반영) ② reversePayment 순출금 가장자리(재결제 후 취소) ③ reimbursePersonalPayment 가 total_amount 로 갚음(기존 결함)

### 완료된 작업 (이번 세션 2026-09-30) [Claude Code]
- **v3.105 운영 배포**(05:25 UTC · 백업 20260930_051815 · 스모크 10/10): 현금 내역 삭제 이유 필수+활동기록 · 발주 결제 현금 줄 «발주에서 금액 수정» 버튼 · 🔴 메뉴 이미지 소실 결함 수정(03-03 e91b385a4 부터 — 이미지 안 바꾸고 저장해도 파일 삭제, 브랜드 메뉴 참조 파일 삭제) · 403 사유 message
  - 운영 확인(데모 매장 13, 원복): 같은 이미지 저장 → 파일 유지 · 삭제 이유 없음 400/있음 200+기록
  - 릴리즈 블로그 release-v3.105 · 공지(수신자 9) 운영 동기화
- 운영 데이터(Irene 「지금 없는 것만 조치하는 거면 해」): 브랜드2 브랜드 메뉴 이미지 68건 중 이름 정확히 같은 55건 복구 — 매장8 상품 사진 사본 `/uploads/brand-menus/brandmenu_*` · 파일 동일 55/55 · 서빙 200 55/55 · 이전 값 백업 운영 `/var/www/backups/brand2-brand-menus-image-pre-1790746920917.json`
- 앞 건 «Issued Invoices 다브랜드»는 운영 반영 확인(백업 20260929_174721)
- Garbage Bag(PRD-163) 위드민 검색 안 됨 → Irene 자가 확인 「재고아이템이랑 연결 안해서」(메모리 추가)

### 다음 확정 작업
1. **A안 (Irene 결정 2026-09-30 「A로 해. 서비스 상품도 주문 넣을 수 있게」)** — 브랜드가 배포한 상품은 매장 연결 없이 주문·검색에 바로 뜨게, 서비스 상품 포함. 구조 변경 → **Fable 설계 판정부터**(한도 소진으로 미수신). 그 전까지 새 상품은 매장 재고아이템 연결로 처리([[reference_seller_add_order_needs_buyer_link]])

### 👉 Irene 님 결정 대기 / 할 일
- K-DINE 재료·메뉴 구조 컨펌 4건(D1′ 브랜드 원본 잠금 A vs Irene 원래 요청 역동기화 · D1″ · D3′ · D2′) + E — `.claude/fable-verdict-20260929-structure.md` §4·§5
- 매장 재업로드 필요(파일 복구 불가): 매장8 «Fried Chicken (6 pcs)» · 매장10 9건(Original/Strawberry Makgeolli Glass · Yakgwa · Set C · Gochujang/Crispy Drumsticks · Cheese Dakgalbi · Bulgogi · ochujang Drumsticks 2pcs)
- 브랜드2 브랜드 메뉴 이미지 미조치 13건(이름 다름·연결 없음): 254·272·273·274·279·280·281·283·290·321·329·333·346 — 브랜드에서 직접 올려야 함
- 배포 후 확인: 브랜드 1·2 Payment Settings «배송 가능 지역» · 0원 청구서 93·88·69·61 Confirm

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- 가입 판매자(GIT 등) 발주의 결제 뒤 금액 정정 경로 — 판매자 청구서가 원본이라 구매자 단독 정정 불가(Fable 판단)
- deleteOldImages 를 쓰는 다른 라우트(recipes·ingredients·admin-settings)도 «같은 주소 저장=삭제» 패턴 여부 점검
- 판매자 «완료»(서비스 전용) 청구서 즉시 미발행 · BG Stock Items catalogLink 판매자 비결정 · 받은 발주 알림 무브랜딩 · Sales Orders 검색 첫 페이지만 · 인스펙션 ING-UNI 한계

### 주요 변경사항
- 운영 쓰기(Irene 지시): brand_menus 55행 image_url(백업 JSON 있음) · 운영 데모 매장 13 검증 쓰기 원복 완료
- dev DB: 테스트 데이터 원복(잔여 0)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
