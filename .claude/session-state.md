## 현재 작업 상태
**마지막 업데이트:** 2026-10-07 UTC — /개발완료 (운영 최신 SW **5.88-invoice-total-fix-20261007**, 2026-10-07 실측 · 아래 버전 줄은 /배포 때만 갱신)
**버전:** **v3.108** · 운영 SW **5.86-soa-status-invoices-20261005** (마지막 #5 · 백업 20261005_184839 · 스모크 10/10) · 안드로이드 앱 0.3.4
**작업 상태:** ✅ 지시 대기 (Fable 한도 소진 — 다음 확정 1·2번은 Fable 필요)

### 완료 (2026-10-07 오후) [Claude Code]
- **운영 배포 SW 5.88** 인보이스 총액 수정+수정 이력 (백업 20261007_112732 · 스모크 10/10 · mount 크래시 0 · Fable 게이트 PASS 마커 유효 상태로 배포). 버전 v3.109 는 아직 안 올림(5.87·5.88 묶어 올릴 예정 — Irene 결정 대기)
- `/개발시작` 0-B단계 추가: 운영 들어온 업무 읽기 `dev-backend/scripts/prod-inbox.js`(읽기 전용) → 건마다 «이미 해결/조치 필요/결정 필요», 답장·운영 쓰기는 Irene 지시 때만. 2026-10-07 11:34Z 실측: 열린 시스템 문의 3건 — SUPP-2026-6842-103·SUPP-2026-1886-062(/pos/purchase-orders «Cannot access 'mn' before initialization», 9/17) · SUPP-2026-2401-270(/pos/recipes React #31, 9/10). 후속 글 0 · 랜딩 문의 0
- 아침 점검 cron 00:00 UTC(08:00 MYT) `~/dev-server/morning-check.sh` — PurpleHere·PlanQ 에 «/개발시작» 방. 첫 실행 2026-10-07 11:38Z(방 e6a3d881)
- 개발서버 상황판(~/dev-server/board, PM2 dev-board, 127.0.0.1:8800): 대화창·확인 완료→완료 목록(state.json)·개발완료 버튼(+git 기록)·대기열·방 줄 실행/중지/삭제 — 설명서 ~/dev-server/README.md

### 진행 중인 작업
- 없음

### 완료된 작업 (2026-10-07) [Claude Code] — 운영 배포 SW 5.87-owner-invoices-brand-staff-20261007 (백업 20261007_075641 · 스모크 10/10 · mount sweep 크래시 0 · 1차 시도는 메모리 게이트로 빌드 전 중단, 운영 무변경)
- 오너 청구서 «Invoices to Pay» 탭이 매장 선택을 무시하던 결함: `routes/owner.js` GET /invoices/to-pay 가 restaurant_id(내 소유 매장일 때만) 로 좁힘. 실호출: 오너 289(매장 2·3) 매장3 선택 → 수정 전 1건(매장2 것) / 수정 후 0건, 익명 401
- 오너 청구서 화면에 매장이 올린 공급업체 인보이스 «올린 인보이스 보기»(목록 줄 + 상세 창 버튼) — 서버는 이미 보내고 있었고 화면만 안 그렸음. 운영 with MIN Cafe 48건 중 22건 해당
- 브랜드 사이드바 «매니저»(본사 직원) 프랜차이즈 → 설정(회사 정보 아래). MainLayout 메뉴 목록만, 인쇄 블록 무접촉 → Irene «배포해» 로 print-guard --bless. check-sensitive-diff ① 표시(보호파일) — 판단 갈림 없어 Fable 미호출
- 검증: build:dev · verify-all --full 23/24 통과(실패 1 = deploy-ready 배포 기록 파일 없음, 배포 시 작성) · print-guard 8/8 · 민감 diff 비대상

### 완료 · 운영 배포 SW 5.88 (2026-10-07) — 인보이스 총액 수정 + 수정 이력 [Claude Code · 백그라운드 작업방]
- 설계 §3 1~11 전부 구현: 백엔드 6파일(이전 세션) + 프론트 공용 `SupplierInvoiceTotalFix`·`InvoiceModificationHistory` · RA/오너 청구서 상세 버튼·이력 · i18n 4언어 · docs PURCHASE_ORDER_SYSTEM §8-7 + OWNER_PLAN·SUPPLIER_CONTRACT 1줄
- 검증: health-check `invoice-total-fix` T1~T4 4/4 · 고장주입 3/3(pm2 재시작) · print-guard 8/8 · design-guard 신규 0 · i18n 0 · 타입(반증 프로브) 새 파일 0 · build:dev 1회 · verify-all --full 24/24(deploy-ready 기록 수정 후) · 실브라우저 클릭 8/8
- SW 5.88-invoice-total-fix-20261007 · 배포 기록 `dev-backend/releases/2026-10-07-invoice-total-fix.json` · CHANGELOG [Unreleased] · DEVELOPMENT_PLAN
- 실측 메모: 청구서 목록의 «외부 공급업체» 판정은 서버가 60초 기억(invoices-list.js EXTERNAL_ISSUER_TTL_MS) — 테스트에서 가입 전환 직후 버튼이 남았던 원인, 실사용 영향 없음
- **Fable 게이트 PASS**(지문 5504b0d5bdc6 · 마커 유효 · 판정 `.claude/fable-verdict-20261007-invoice-total-fix-gate.md`). 남는 위험(배포 무관): 동시 수정 시 이력 한 줄 덮임 가능 · 오너 화면 이력 시각=기본 타임존 · T2 남의 매장 검사는 데모 매장 2개 이상일 때만
- Fable 후속 처리: 10-05 부터 남아 있던 `.claude/.fable-gate-skip` 삭제 → 정지 훅 복구(다음 확정 1번의 «skip 정리» 해당)
- 배포 뒤 바뀐 것: `scripts/prod-inbox.js`(읽기 전용 도구) 하나뿐(deploy-manifest 실측) → 통과 마커는 이 파일·기록 때문에 지금 «무효» 표시, 배포된 코드는 판정받은 그대로
- 남은 일: **v3.109 버전 올림·릴리즈 공지** — 5.87·5.88 묶음, Irene 결정 대기

### (이전) 답 기다림 (2026-10-07) — 인보이스 총액 수정 + 수정 이력
- Fable 판정 수령(2026-10-07, 설계 D1~D7 · 구현 §3 11항목 · 검증 T1~T4+고장주입 3종) — 원문은 이 대화에서 Irene 에게 그대로 전달함
- **Irene 확인 대기 4항목**(Fable 권고): ①고칠 수 있는 청구서=외부 공급업체 건만(권고 이대로) ②오너는 총액만·줄 단가 대조는 RA 만(이대로) ③결제 완료 건도 허용(유지) ④사유 메모 선택(선택)
- 답이 오면: Fable §3 순서대로 구현(buyerScope OWNER_ACTING_ROUTES reconcile 추가·cost-reconciliation OWNER_TOTAL_ONLY·reconcileInvoiceSync 이력 push·attach reconcile_invoiced_lines·SupplierInvoiceTotalFix/InvoiceModificationHistory 공용 컴포넌트·RA/오너 화면·i18n·docs §8-7) → health-check T1~T4 + 고장주입 → 빌드 1회 → verify-all --full → Fable 게이트 판정(2회차) → Irene /배포
- 버전: v3.109 는 이 기능 배포 때 오늘 SW 5.87 배포분과 묶어 올림(CHANGELOG Unreleased 에 기록됨)

### 이전 기록: Fable 판정 대기 (2026-10-07 Irene 원문, 10-07 Fable 한도 429 → 이후 판정 수령)
- 「토탈금액 안맞으면 수정하는 것도 인보이스에서 가능해야지. 레스토랑관리자도, 오너도.」「그리고 수정한 사람 이름이랑 시간 남겨서 히스토리 볼 수 있어야 하고」
- 실측: RA 는 청구서 상세 «인보이스와 대조하기»(cost-reconciliation POST, 총액만 대조 → 'Supplier invoice difference' 줄) 로 가능 · 오너는 buyerScope 10-04 Fable 판정으로 원가대조·결제 403 · PUT /api/invoices/:id 오너 불가 · 수정 이력 범위 미확인

### 완료된 작업 (2026-10-06) [Claude Code]
- 키오스크 결제 질문 조사(코드 변경 0): 키오스크=모바일 표시 모드라 결제수단 동일, 단말기는 POS 결제창에만, FloorPlan·LiveOrders·POSTerminal 같은 PaymentModal. Fable 판단 요청 → 한도 429 실패 → Irene 요청으로 Opus 의견 제시(Fable 판단 아님 명시) → 다음 확정 2번으로 등록

### 완료된 작업 (2026-10-05 저녁 · #4·#5) [Claude Code]
- **#4 v3.108 · SW 5.86** (백업 20261005_153730 · 스모크 10/10 · Fable 게이트: 1차 FAIL(하드웨어 청구서 이름) → 수정·재통과 기준 실측 → 도장은 Fable 한도 초과로 미수령, **Irene 이 skip 파일 직접 생성**)
  - 정산서↔묶인 청구서 상태 단일 규칙 `services/soaChildSync`(submit·confirm·reject·PATCH status) + 복구 `scripts/migrate-soa-child-status-sync.js`(deploy) + 인스펙션 `invoice-soa` I-SOA-001 — 운영 배포 때 #162 자식 4건 맞춤, 불일치 0
  - 정산서 손님 이름: SOA 생성 시 restaurant_id 채움 + `payerIdIsStore`(invoices-helpers, hardware 제외) 술어로 이름 계산 — 운영 확인 with MIN Cafe / K-DINE IPC Branch
  - 브랜드 정산서 상세·PDF 묶인 청구서 표 · 레스토랑 청구서(Mark paid 즉시 갱신·To pay 탭 먼저·올린 인보이스 보기) · 매출 Year 그래프 연-월 순서
  - 브랜드 매출 보고서 재구성: 브랜드·매장 체크 칩(직영 빼기, localStorage 기억) · 탭 요약/카테고리/상품/매장/청구·수금 · `GET /api/brand/sales-report`(주문 시점, 범위 밖 브랜드 403) — 운영 R8 9월 Sauce 4,492.80 · Meat 1,789.70
  - 릴리즈: CHANGELOG v3.108(10-02~10-05 배포 15회 묶음) · 블로그 release-v3.108 · 공지 v3.108
- **운영 데이터(Irene 지시):** with MIN Cafe 9월 미묶음 4건 → SOA-BRD1-R10-M20261005155254(#199, RM 345.60) 발행 → paid(브랜드 PATCH 경로, 자식·발주 paid, 불일치 0, 메일 help@k-dine.com 1통). #162 는 Irene 이 22:46 Confirm → paid
- **#5** (백업 20261005_184839 · 스모크 10/10 · skip 파일 그대로) — 정산서 자동 발행 «이어서 내기»(수동 정산서 있는 주기도 남은 미묶음만 발행, soaScheduler planAutoCycle `afterManual`) · health-check 임시 계정 `@example.com`(반송 메일 원인 — dev 가 zzhcobhmuv…@outlook.com 으로 실제 발송) · `migrate-merge-product-mirrors` 재고 남은 쌍은 건너뛰고 목록(첫 시도 18:33 이 K-Bulgogi 로 중단·자동 원복)

### 다음 확정 작업 (Irene 지시)
1. **Fable 소급 판정** — v3.108(#4)·#5 둘 다 Fable 도장 없이 배포(Irene skip). 한도 풀리면 판정·기록. 이후 `.claude/.fable-gate-skip` 정리
2. **키오스크 결제 분리 — Fable 설계 판단 대기** (Irene 2026-10-06 「지금 모바일오더랑 키오스크를 분리해야 맞지」「fable 에게 다음 작업으로 남겨두자」. 10-06 Fable 한도로 미수령) [Claude Code]
   - 실측: 키오스크 = 모바일오더 표시 모드(`mobile/utils/kioskMode.ts`, `?kiosk=1` sessionStorage) → 결제수단 목록 동일(`mobile/pages/PaymentPage.tsx:861` `availableIn.includes('mobile')`). 설정 채널은 pos·mobile 2개뿐. 카드단말기는 POS `PaymentModal`+`utils/nativeEcr.ts`(앱 브릿지 `__NATIVE_ECR`)에만, mobile/ 호출 0건. 기기 등록(페어링) 모델 없음
   - Irene 추가 원문(10-06): 「포스터미널처럼 고객이 키오스크로 주문해야 해. 그리고 플로우플랜에서도 결제 문제없는 거지? 어차피 포스로 가는 거니까.」 → 실측: FloorPlan·LiveOrders·POSTerminal 모두 같은 `components/POSTerminal/PaymentModal.tsx`(단말기 조건 = card + 설정 card.terminal + 앱 브릿지 + 온라인) → 키오스크 «카운터 결제» 주문은 FloorPlan 에서 단말기 결제 가능(현재도)
   - Irene 질문 3개: ①키오스크에서 카드단말기 결제 ②키오스크·모바일 결제수단 따로 설정 ③손님 폰에는 키오스크를 안 열어주고 모바일 결제만 — 어떻게 구분하나
   - Opus 의견(Fable 판단 아님, 참고): 주문 흐름은 하나로 두고 결제만 분리 · 설정에 «키오스크» 채널 추가(기존 매장은 모바일 값 복사로 무변화) · 판정은 URL 아닌 **등록된 기기 토큰**(키오스크 태블릿=앱+매장 등록, 서버가 토큰 없으면 모바일 수단만·단말기 결제 거절) · 단말기 처리는 기존 `services/terminalPayments.js` 공유
3. **K-Bulgogi 1kg 정리** — Irene 「재고 없이 주문 후 만드는 제품으로 두는게 맞아」「나중에 해결해야 해」. 현 상태: ing#23(PI 거울·레시피 4줄·K-DINE IPC 기록재고 8,590 g, 17 kg 입고 − 8,410 g 판매차감) / ing#89(BP 거울, 10-05 02:05 MYT 브랜드 상품 30 수정으로 살아남). 합치기 마이그는 이 쌍을 건너뜀
4. **영수증 드래그·PDF** — 구현 완료·미빌드, 저장소 밖 `/home/irene/wip-receipt-upload-20261005/`(receipt.patch + new/ 4파일). 되살리기: `cd /var/www && git apply /home/irene/wip-receipt-upload-20261005/receipt.patch && cp -r /home/irene/wip-receipt-upload-20261005/new/* .` → 빌드·verify --full·Fable 게이트
5. **발행자 청구서 «To Confirm» 탭 + 업무 버튼 색 규칙**(돈 업무=초록·위험=빨강·보기=테두리) — 브랜드·푸드코트·시스템관리자 청구서 화면
6. **결제 설정 = 계정(회사) 하나** — 설정 화면이 첫 브랜드 칸에만 저장 → 같은 주인 모든 브랜드가 그 값(돈 경로 — Fable 1회)
7. **판매자 배송 지역별 설정** — 설계부터
8. (10-04 잔여) 외부 공급업체 월별 SOA 대조 · 발주 스탭밀 구분 · 승인 메일 문구(외부 공급업체에 «보냈습니다» 거짓)

### 👉 Irene 님 확인·결정 대기
- 운영 SOA 3건(#162·#188·#2xx) restaurant_id NULL 보정 — Fable 권고 채움, 이름 표시는 이미 정상이라 급하지 않음(승인 시 실행)
- 상품 카테고리 정리: «Alcohol» 에 IKEA LED String Light · Sawah Mas (Staff Meal) · Kimchi 1kg — 보고서에 그대로 나옴
- 단말기(5.85) BUSY 자동 대기 실기 확인 · 판매자 «배송 준비 목록» 1회 · 역할 추가 요청 실제 1건 · 상품 16(K-Yukgaejang Beef) 45g/pack 수정 건
- GHL: UAT 근무시간 · 직불(D007)·DuitNow QR

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- 하드웨어 청구서가 payer_type 'restaurant' 에 사람 번호를 넣는 생성 쪽 불일치(routes/hardware-quotes.js:234) — 데이터 보정 동반, 별도 판정
- 푸드코트·시스템관리자 정산서 상세에도 묶인 청구서 표(이번엔 브랜드만)
- 브랜드 보고서 범위 검사 고장주입 반증 미실시(403 실측만) · Mark paid 수정 전 코드 실패 반증 미실시
- invoice soaChildSync childRuleFor 의 'pending'·'sent'·'rejected' 는 ENUM 에 없는 죽은 값(Fable 지적 — 해 없음)
- K-Jjajang Sauce 1kg(ing#95) 비활성 재료를 레시피 3줄이 가리킴(운영, 합치기 마이그 목록)
- Fable 조건(5.84): jest context-requests ⑨ 와 user-contexts-switch rid 18 공유 · BUSY 외 4xx 대기 · declined H400 행 · base64 영수증 소급 · po-qty-step TOKEN_FILE · Windows 설치본 재빌드 · /docs SEO nginx

### 주요 변경사항
- Git: 2026-10-07 /개발완료 커밋(5.87·5.88 코드 + 기록). 영수증 작업은 저장소 밖 보관
- 운영 데이터 처리(10-05): brands#2 payment_settings · SOA#188 자식 10건 paid(오전) · SOA#199 발행·paid(저녁)

### 완료된 작업 (2026-10-05 오전 · #1~#3) [Claude Code]
- **#1 SW 5.83 오너 대리 발주** (백업 20261005_052507 · Fable PASS · 커밋 760c8c886) — 오너가 소유 매장을 골라 그 매장 자격으로 발주·제출·취소, 오너 제출=승인 생략. buyerScope OWNER_ACTING_ROUTES · applySubmitGate actor · 화면 매장 선택 먼저
- **#2 SW 5.84** (백업 20261005_072313 · 마이그 2 · Fable PASS 조건 4 · 커밋 fea0a4e92) — 역할 추가 요청(Staff 포함, user_context_requests·user_contexts.permissions) · 발주 최소주문 강제(MOQ 1=미설정) · 판매 상품 연결 환산에 팩 용량 · 판매 상품 등록 화면 설명·미리보기·재고단위 칸 제거 · 단말기 거절 뒤 Confirm 잠김·BUSY 제목
- **#3 SW 5.85** (백업 20261005_093553 · 스모크 10/10 · Fable PASS 재도장 2회 `.claude/fable-verdict-20261005-terminal-busy-gate.md`) — 단말기 BUSY 자동 대기(3초 간격 최대 60초, «단말기에서 DONE 을 눌러 대기 화면으로 → 자동 시작», Stop waiting) · 판매자 받은 주문 «배송 준비 목록 (가격 없음)» WhatsApp 버튼. 운영 확인: sw 5.85 · ko 문구 2종 서빙 · online
- 카드 단말기 GHL UAT: 10-05 운영 첫 승인(VISA 346631·254719, GrabPay QR 1건 → 이월렛 grabpay 기록). 10-04 B0 = 일요일(UAT 근무시간 외). 승인 직후 다음 결제 BUSY = 단말기 DONE 대기 화면 → 5.85 로 대응
- 운영 데이터 직접 수정 2건(Irene 긴급 지시): ① brands#2(K-DINE).payment_settings ← brands#1 값(비어 있을 때만, 되돌리기 = #2 칸 NULL) ② SOA-BRD2-R8-M20260929173419(#188) 하위 청구서 10건 payment_submitted→paid(paid_at·confirmed_at = SOA paid_at, confirmed_by 23). 연결 발주 10건은 이미 paid


---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
