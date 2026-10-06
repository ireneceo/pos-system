## 현재 작업 상태
**마지막 업데이트:** 2026-10-06 UTC (/저장 — 키오스크 결제 질문 조사·Fable 작업 등록, 코드 변경 0)
**버전:** **v3.108** · 운영 SW **5.86-soa-status-invoices-20261005** (마지막 #5 · 백업 20261005_184839 · 스모크 10/10) · 안드로이드 앱 0.3.4
**작업 상태:** ✅ 지시 대기 (Fable 한도 소진 — 다음 확정 1·2번은 Fable 필요)

### 진행 중인 작업
- 없음

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
- Git: HEAD = 2026-10-06 /개발완료 커밋(코드 변경 0 — 문서·기록만). 영수증 작업은 저장소 밖 보관
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
