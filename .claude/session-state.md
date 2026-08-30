## 현재 작업 상태
**마지막 업데이트:** 2026-08-30 #4 (`/개발완료` · 운영 배포 5회차)
**버전:** v3.80 (2026-08-28 배포). **8/30 배포 5회는 전부 버전 미상승 — Irene 지시**
**작업 상태:** 완료. **개발 잔여 없음.** BG 단위주문 C+D 운영 반영 완료(스모크 10/10 · 마이그 62/62).

> ### 🔔 돌아오면 여기부터
> 1. **BG 단위주문 C+D 는 dev 완료·미배포.** 커밋 `cfad56a8`. 다음 `/배포` 묶음.
>    **+ S3 stuck_tickets 수정(커밋 `5268a36a`)** — 수동 인쇄 매장 헛경고 제거. dev 대기.
> 2. **운영 카테고리 — Irene 확인 1건**: 새 카테고리 이름을 `Uncategorized` 로 만들었다(기존이 전부 영문이라 통일).
>    한글 "미분류"를 원하면 **화면에서 이름만 바꾸면 된다**(6개 스코프: 매장 8·10·13, 브랜드 1·2, BG owner 23).
>    **미분류 잔여 121건 = Irene 이 화면에서 고르는 영역**(2차 보강으로 202→121, 운영 적용 완료).
>    `Mix Coral`·`K-Yukgaejang` 처럼 기계가 알 수 없는 것들 — ⛔ 추측으로 채우지 말 것.
> 3. **사람만 아는 값 회신 대기** — 환산 4건(계란 tray→kg / Test Oil L→kg / Soy Sauce L→g / Black Pepper kg↔g)
>    + 6품목(소고기 5개=몇 kg / 양파 1개=몇 g / 고운소금 `12pkts(450g)/1bundle` 의미 / 닭다리(NSK)·오징어링·깐새우 1팩=몇 kg)
>    + 카테고리 자동분류가 못 정한 202건(현재 `Uncategorized`). ⛔ 기계가 추측 금지.
> 4. ✅ **완료 — Fable 지시 운영 검증(BG 프로브 계정)**. 결과가 심각했다:
>    운영 `is_test=1` BG 3개 중 **`K-DINE Brand`(브랜드 `with MIN`)·`thefire`(브랜드 `The Fire`) 둘 다
>    `is_demo=0` = 실브랜드**였다. 지금은 id 가 낮은 빈 계정(`brand_general`, brand_id NULL)이 뽑혀
>    무사했을 뿐 — 그 계정이 사라지면 프로브가 **실브랜드 카탈로그에 상품을 만들었다 지운다**.
>    → 판정을 `is_test=1 AND (brand_id IS NULL OR brands.is_demo=1)` 로 교체(dev 완료, 미배포).
>    운영 반증: 새 기준이 두 실브랜드 계정을 **막고** 빈 시험 계정만 통과.
>    ⚠ **두 계정의 `is_test=1` 표시 자체는 안 건드렸다** — 알림 수신 등 다른 관문에 영향이 갈 수 있어
>    별도 판단이 필요하다([[reference_notification_six_gates]]).
> 5. **인쇄 표시 반복 = 진단 결함이었고 수정됨(2026-08-30, Irene 지적)**
>    `needs_print` 는 주문 생성 시 **설정과 무관하게** 켜지고(`orders-crud.js:1371`·`mobile-orders.js:339,458`),
>    끄는 것은 **폴러가 인쇄를 집어갈 때뿐**(`orders-crud.js:3083,3112,3259`).
>    → autoPrint 꺼진 매장은 아무도 안 꺼서 무한 적체(운영 2,098건, 세 매장 전부 꺼짐).
>    진단 S4 는 `master_off` 를 구분하는데 **S3 `stuck_tickets` 만 몰라** 수동 운영 매장에 영구 경고를 냈다.
>    수정: `stuckIsReal = autoOn && stuckCount > 0` + 꺼짐이면 `evidence.suppressed='master_off'`.
>    ⛔ **2,098건 정리는 하지 않는다**(Fable 불요 판정) — 백로그 컷오프가 옛 주문 폭주를 막는 설계라 무해.
>    ⛔ **"autoPrint 꺼짐이면 needs_print 를 안 켠다" 방향은 기각됨** — 주문 생성 경로에 설정 읽기를
>    심는 것이고, 나중에 켰을 때 티켓 유실 표면을 만든다.

### 진행 중인 작업
- 없음. **개발 잔여 없음**(Irene 지시: "개발 남기지 말고 다 한 다음").

### 완료된 작업 (이번 세션)
1. **레시피 저장경로 근본수정 + 파괴방어 영구 안전망** (커밋 `63e037be`, Fable 게이트 PASS)
   - 메뉴(RA)·프로덕트(BG) 폼의 "직접 재료 입력" 저장이 ①기존 재료를 **먼저 전부 지우고** ②새로 넣는데,
     트랜잭션이 없고 catch 가 오류를 삼켰다. ②가 실패하면 **지운 것만 남아** 재료가 통째로 증발하고
     화면엔 "저장됨"으로 보였다. **실측 반증: 방어 제거 시 재료 2건 → 0건 소실 + status 200.**
   - `routes/menu.js`(POST·PUT) + `routes/brand-products.js`(POST·PUT) **4곳** 트랜잭션 + rollback + **400 반환**.
   - `product_recipe_ingredients` 에 **UNIQUE(recipe_id, ingredient_id) 신설** — 형제 `recipe_ingredients` 엔
     있던 불변식이 brand 축에만 없어 같은 재료 2행 → BG BOM 이중 → 입고 재고·원가 이중 계산이었다.
     마이그 멱등 · 행수 자가검증 · **중복 발견 시 지우지 않고 목록 출력 후 실패**. 착수 전 중복 dev 0 / 운영 0(73행).
   - `health-check --category=inventory` 에 파괴방어 4케이스. **inventory 12/12 · 건너뜀 0 · 잔재 0(연속 2회)**.
   - **이식 반증**: 방어 제거 → **정확히 새 4건만 실패, 기존 8건 무영향**. 원복 → 12/12.
2. **Wave A(직접 연결 컬럼 4개) 철회** — 기존 레시피 경로가 멀쩡해 같은 것을 두 벌 만들 이유가 없었다.
   DB 컬럼 DROP · 마이그 파일 삭제 · registry 60 복귀 · 모델/association/차감분기 원복. 유지분은 `source` 라벨뿐.
3. **v3.80 운영 배포 (4회차)** — 스모크 10/10 · 게이트 9개 우회 0 · mount sweep 크래시 0(656s) ·
   **마이그 62/62**(레시피 유니크 + 브랜드 단위주문 신설 2개 포함) · 헬스 uptime 3s ·
   백업 `/var/www/backups/20260830_220904`. 나간 것: 발주 모바일 · 알림 수신자 · 발주 메일 ·
   단위주문 UI · **레시피 저장 파괴 수정** · 브랜드 order_mode 컬럼(500 지뢰 제거).
4. **BG 단위주문 C+D 완결** (커밋 `cfad56a8`, Fable PASS 마커 `06b04f072597`)
   - 직렬화 3곳(`restaurants-ingredients.js:146` · `ingredients.js:138·624`)이 브랜드 상품의
     `unit`/`base_quantity`/`order_mode` 를 **읽고도 버리던** 것 수정.
   - 🔴 실결함: `routes/brand-products.js` 가 **`order_mode` 를 아예 안 받았다** — 폼에서 '무게로 주문'을
     골라도 조용히 `pack` 저장. POST/PUT + `ORDER_MODES` 검증 + 모델 필드로 수정.
   - BG 폼 주문방식 라디오 + 4언어. 기본 `pack` = 현행 동작.
   - **왕복 E2E 6/6**: BG kg 상품 → 매장 재고(g) 환산 1000 → **2.5kg 발주(RM75, 소수 무손실)** →
     입고 → **재고 +2500g**. 잔재 0. `verify-all --full` **16/16**.
   - 📌 설계 전제 정정: 3단계는 "게이트 제거만"이 아니었다 — **제거할 게이트가 없었고**
     구매 UI 는 처음부터 `seller.order_mode` 만 본다(`docs/PURCHASE_ORDER_SYSTEM.md` 각주).
5. **운영 카테고리 정리** (커밋 `98fc930e`, Fable 사전승인 실행)
   - **아이템 중복은 없었다** — brand_products 이름·SKU 중복 0, with MIN 재고 이름 중복 0.
     BG 프로덕트 145 중 92건이 with MIN 재고와 동명이나 이건 "파는 상품 ↔ 사는 재고"의 정상 대응.
   - 병합 9쌍(41건 이동) · 빈 옛 카테고리 5 삭제(0건인 것만) · 자동 채움 277 · 나머지 202 는 `Uncategorized` 신설 6개에 수용.
   - 소유자가 다른 동명 카테고리(매장/브랜드 각 1벌, 13쌍)는 **구조상 정상이라 무접촉**.
   - 즉시검증: 같은 소유자 중복 0 · 옛 이름 잔존 0 · 고아 0 · **카테고리 없는 행 0**.
   - 백업 `/var/www/backups/data-migrations/category-cleanup-20260830.before.json`(48KB) + 완료 마커.

### 🟣 dev 완결 · 운영 미반영 (다음 `/배포` 묶음 — Fable 권고)
> **다음 `/배포` 1회 = D 완결판 + 알림 수정 2건 + 발주 메일 묶음 0~5 + SW_VERSION bump.**
> 묶음이 커졌고 **staging 화면 프론트 변경이 포함**돼 SW bump 필요성이 더 강해졌다(Fable).
> Fable 합산 게이트 **PASS · 마커 `ed69def88ad9`**(발주 메일 포함 최종). 이전 마커 `dd5a648ceee1`(D+알림)은 이것으로 대체.

1. **D. fetchDedupe abort 참조계수 근본수정** — `utils/fetchDedupe.ts` 재작성 + `httpClient.ts` 연결
   - 근본: 공유 fetch 에 **리더의 signal 이 그대로 실려** 있었다. 리더가 abort 하면 팔로워 전원이 AbortError,
     반대로 팔로워 signal 은 어디에도 안 붙어 abort 가 무시됐다.
   - 조치: 실네트워크 fetch 는 `controller.signal` 로 나가고, **구독자 참조계수가 0 일 때만** abort.
     signal 없는 구독자는 **영구 구독**(공유 fetch 를 죽이지 못함). 캐시 히트도 `aborted` 면 AbortError.
   - ⚠ `null`/`undefined` 판정 주의는 아래 알림 건과 동일 계열 — 여기선 `signal?.aborted` 만 본다.
   - **고장 재현 반증 확보**: 수정 전 S1 `{A:Abort, B:Abort}` / S3(B 는 signal 조차 없음) `{B:Abort}` / S4 `200`(abort 무시).
     수정 후 S1 `{A:Abort, B:ok200}` · S2 둘 다 Abort · S3 `{B:ok200}` · S4 `AbortError` · S5 네트워크 **1회**(dedupe 무회귀).
   - 검증: build EXIT 0(파이프 없이) · **번들 내용 확인**(새 문자열 존재 + `trackInflight` 소거) · verify-all **--full 16/16**(mount sweep 8역할 656.9s) · print-guard 8/8.
   - **401 자동 로그아웃 · `notifyContextFallback` 무접촉.**

2. **알림 수신자 결함 2건** — `utils/notificationService.js` 1파일
   - **브랜드 소유자 누락**: `getBrandManagerIds` 가 `users.brand_id` 단일 컬럼만 봐서, 브랜드를 여러 개 가진
     소유자가 첫 브랜드에서만 잡혔다. **실호출 실증** — brand 2 소유자 누락, brand 4·17·33 은 **수신자 0명**.
     조치: `OR u.id IN (SELECT owner_id FROM brands WHERE id=:brandId ...)` 소유 레그 추가(**role 무조건** — brand 33 소유자는 `brand_id=null`), `DISTINCT`.
     수정 후: 1 `[2,6,8,11]`(집합 불변·중복0) / 2 `[3,6]` / 4 `[6]` / 10 `[22]`(불변) / 17 `[22]` / 33 `[148]` — **기대값 전건 일치**.
   - **`is_active` 미필터**: 수신자 해석 함수 5개 전부 필터 없음. 다만 호출부 21곳이 **전부 `sendNotification` 하나로 수렴**하므로
     그 단일 관문(#1 직후·`email_verified` 앞)에만 `1-a0` 추가. ⛔ 쿼리에 심으면 자체 배열 호출부가 샌다.
     🔴 **`null`/`undefined` 는 활성 취급**(`=== false || === 0`) — 6/16 신설 컬럼이라 null 을 비활성으로 읽으면 구계정 알림이 통째로 침묵한다.
     고장주입 왕복 증명: user 23(데모매장) `is_active=0` → `Skip: ... inactive` / 원복 → 다음 관문 `is_test` 로 진행 / DB 원복 확인.
   - 검증: verify-all **15/15**(health-check 전체 포함) · print-guard 8/8 · sensitive-diff 비대상.

3. **발주 메일 묶음 0~5** — `Fable PASS(ed69def88ad9)`
   - **0. 발송 함수 단일화** — `purchase-orders-crud.js` 에 `fireSellerSubmittedNotification` 이 **한 벌 더** 있었다(동작 동일).
     한쪽만 고치면 경로별로 메일이 갈리는 구조 → 로컬 정의 49줄 삭제, `services/poNotifications.js` 단일 소스로. 고아 import 4개 제거.
   - **1. 4언어화** — `locales/*/email.json` 에 `po` 네임스페이스(각 106키 동수). 템플릿을 `(args, lang)` 로 전환 + `getEmailText`.
     🔴 **구조 장애를 팩토리로 풀었다**: 메일 본문이 수신자를 알기 전에 만들어져 수신자별 언어가 불가능했다.
     → `sendNotification` 이 `mailOptions` 로 **`(user) => mailOptions` 팩토리도** 받는다(관문 전부 통과 후·SMTP 앞에서 해석).
     팩토리 throw/빈값 → **그 수신자만** skip. `sendNotificationBatch` 는 몸통이 map 이라 무수정.
     **기존 21개 호출부는 객체를 넘겨 기존 경로 그대로** — 후방 호환 **바이트 동일 5/5** 로 증명.
   - **2. 구매자 확인메일 신설** — 그전까지 발주 넣은 사람은 **아무 메일도 못 받았다**(판매자·오너만 받음).
     `poBuyerConfirmEmail`(4언어·품목표) + `fireBuyerConfirmNotification` + 카테고리 `po_buyer_confirm` 등록.
     제출 3경로(workflow·approval·crud)에 판매자 통지와 같은 자리로 연결. 판매자명은 `utils/sellerNames` 경유.
   - **3. 승인결과 메일 품목표** — 같은 가족 중 여기만 `items` 를 안 받고 있었다.
   - **4. 외부 공급업체 발송** — `POST /purchase-orders/:id/send-external-email`(명시 액션, 자동 아님, 언어 'en' 고정).
     `sendPlatformEmail` 경유(placeholder·바운스 가드 그대로). **가드에 막히면 `{sent:false, reason}` 로 정직 응답** — "보냈다" 거짓말 안 함.
     검증 5케이스: 익명 401 / 남의 PO 404 / 계정 있는 업체 400 / 외부+이메일 → `dev-environment` 차단 / 이메일 없음 400.
     ⛔ dev 는 `sendPlatformEmail` 이 SMTP 를 원천 skip 해 **실발송 물리적 불가**.
   - **5. draft 담은 날짜** — 스키마 신설 0(`created_at` 이 이미 응답에 있음). `PurchaseOrderStagingPage` 헤더에 표시,
     **매장 타임존**(`operationSettings.timeZone` + `formatDateTime`) 준수. i18n `staging.addedAt` 4언어.
   - 검증: verify-all **--full 16/16**(mount sweep 8역할 660s 크래시 0) · i18n Errors 0 · 번들 반영 확인(lazy chunk) ·
     후방호환 5/5 · 고장주입 3종(throw·null·배치격리) · check-sensitive-diff 비대상.

4. **SW_VERSION bump** — 아직 안 됨(`4.63-po-list-meta-20260824`). 위 🟣 배포 결과 섹션 참조.

**⚠ 이번 사이클 계측 실수(전부 자진 보고·재측정):**
- 검증 중 **실제 메일 1통 발송**(자사 도메인의 없는 사서함). Fable 판정 = 경미·종결. 이후 알림 검증은 **SMTP 경계 스텁이 표준**.
- 고장주입 1차가 `is_test` 관문 선발화로 **무효** → 관문 통과 임시 사용자로 재설계.
- `poEmailItems` 실패는 **계측기 고장**(`models/index.js` 미로드 → association 없음). 결함 아님.
- 표본 선정 오류(PO 194 는 상세조회부터 404) → 접근 가능한 PO 75 로 교체.
- **`SupplierCompany` 는 `paranoid: true`** — raw SQL 로 재서 삭제 행이 섞였다.
  정정: 공급업체 **16곳(외부 6, 이메일 보유 1 = sc60 `order@bevdist.demo`)**. 앞서 보고한 "20곳/외부 10" 은 오측.

**손대지 않은 것(실측 근거):**
- **foodcourt 소유 레그** — `foodcourts.owner_id` 는 있으나 누락 표본 **0건**, 다중 소유자 **0명**. 실증 안 돼서 미변경(brand 와 동일 구조라 잠재 가능성은 남음).
- `getSupplierAdminIds` OR 두 번째 가지 — 테스트 staff 1명 생성해 `[208,444]` 로 **실증**, 삭제 후 잔재 0·목록 복귀 확인. **이상 없음, 코드 무변경.**

### 📌 Git 상태 (2026-08-30 14:43 UTC 세션 저장 시점)
- 브랜치 `deploy-isolation` / 최근 커밋 `c0677eb1 feat(po): 발주 입고 대칭화 + 재고↔발주 동기화 + ENUM 소거 근본수정`
- **미커밋 변경 21건** (아래 🟣 dev 완결분 전부. ⛔ **배포 격리 전 stash 필수** — 과거 `git checkout` 으로 미커밋 9파일 소실 전례)
```
.claude/deploy-manifest.json · .claude/session-state.md · docs/PURCHASE_ORDER_SYSTEM.md
dev-backend/locales/{en,ko,ms,zh}/email.json
dev-backend/routes/{notification-settings,purchase-orders-approval,purchase-orders-crud,purchase-orders-workflow}.js
dev-backend/services/poNotifications.js
dev-backend/utils/{notificationService,notificationTemplates}.js
dev-frontend/public/locales/{en,ko,ms,zh}/purchaseOrders.json
dev-frontend/src/pages/PurchaseOrders/PurchaseOrderStagingPage.tsx
dev-frontend/src/utils/{fetchDedupe,httpClient}.ts
```
- 미추적 파일 **0건**(임시 계측 스크립트 전부 삭제 확인)

### 완료된 작업 (이번 세션)
- **발주 "받았다" 대칭화** (운영 배포) — 목록엔 있고 상세엔 없던 입고 버튼. **운영 발주 전건이 submitted** 라 사실상 아무도 입고를 못 하던 상태였다
- **재고 입고 ↔ 발주 동기화 — RA**(운영 배포) **/ BG**(dev) — 같은 물건을 양쪽에서 처리하면 재고가 두 번 더해지던 구멍
- **발주 상세 모바일 4건** (운영 배포) — 번역 코드 노출·타임라인 2중·버튼 정렬/높이·품목 카드 5줄→3줄
- **🎯 `pending_approval` ENUM 3세션 미스터리 종결** (운영 배포 + 생존 증명) — 원인 = `sprint6` 의 ENUM 목록 하드코딩
- **신규 발주 화면 모바일 붕괴 수정** (dev) — 장바구니 50vh 고정 → 하단 접이식 시트
- **운영 전수검사 계측기 재작성** — 측정 25/25 · **측정 불가 0**
- **운영 정리 스크립트 작성·Fable 검토 통과** (`cleanup-ugs-duplicate-products.js`) — 운영 /tmp 배치·sha256 일치, 실행 대기
- 문서: `CLAUDE.md`(expand-only) · `SCHEMA-MIGRATION-GUIDE.md` · `PURCHASE_ORDER_SYSTEM.md` · CHANGELOG · 메모리 2건
- **[2차] 운영 배포 1회** (13:02 UTC) — C·D·A′ 반영. 게이트 9/9 · 마이그 58/58 · **ENUM 값 소실 0** · 스모크 10/10
- **[2차] D. fetchDedupe abort 참조계수 근본수정** (dev 완결) — 고장 재현 후 5/5 통과
- **[2차] 알림 수신자 결함 2건** (dev 완결) — 브랜드 3곳이 **수신자 0명**이던 것 + `is_active` 미필터
- **[2차] 발주 메일 묶음 0~5** (dev 완결) — 함수 단일화·4언어·구매자 확인메일 신설·승인결과 품목표·외부발송 액션·담은 날짜
- **[2차] 마감 기대금액 갭 = 결함 부존재로 종결** — 착수 전 실측으로 헛작업 차단, 기록·메모리 정정
- **[2차] 단위주문 설계 문서 작성** — `docs/PURCHASE_ORDER_SYSTEM.md` 말미(컨펌 4건 게이트 명문화)

### 다음 확정 작업
- **BG 단위주문 물결 C 재개 → D** (위 "진행 중인 작업" 참조). Fable 지시: C 완료 시 게이트 판정 요청.
- **`/배포`** — Irene 지시 시. 위 🔔 1번 묶음.

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- **환산비 4건 + 사람만 아는 값 6건** — Irene 회신 필요. ⛔ 자동 백필 금지.
- **서버 min_order 강제** — 착수 전 결정 3건 선행(경고 vs 차단 / 적용 시점 / 기존 26건 영향 실측).
- **B. 판매 주문(B2B) 매출·원가 리포트** — Fable 설계 완료. 착수 조건 = 정리 `--apply` 증명 접수 후.
- **directIngredients 4곳 공용함수 통합** — 이제 4곳이 같은 형태로 수렴해 통합 시점에 유리(Fable 백로그).
- **`supplier_products` 351건 카테고리** — `supplier_categories` 테이블이 **0행**. 정리가 아니라 신규 구축이라
  이번 범위 밖으로 뺐다(Fable 판정).
- **`l`/`L` varchar 정규화(11건)** · **BG 레시피 59건 `brand_id=null`** · **track_stock 레거시 은퇴**.
- **FG(푸드코트) 단위주문** — BG 와 같은 형태로 열 수 있다. 브랜드 축이 끝났으니 다음 후보.
- **`supplier_products` 351건 카테고리 체계** — `supplier_categories` 0행. 신규 구축이라 이번 범위 밖(Fable).

---

## 🟣 2026-08-30 배포 결과 + SW bump 미실시 (Irene 판단 대기)

**배포 성공** (13:02:30 UTC, 종료코드 0, Fable 판정 = 성공):
게이트 9/9 우회 없음 · 인스펙션 25/27(신규 위반 0, baseline 2) · mount sweep 통과 ·
마이그 58/58 · **ENUM 값 소실 0**(dev·prod 12값 전부 존재, `in_transit` 나열 순서만 다름 — 8/30 사고 방지장치 작동 확인) ·
스모크 10/10 · health uptime 3s · 백업 `/var/www/backups/20260830_124742` · 스냅샷 1842파일.

**⚠ SW 버전 bump 안 됨 — 미해결.** `SW_VERSION = '4.63-po-list-meta-20260824'`.
실측: `curl https://purplehere.com/sw.js` 와 dev 양쪽 **동일한 8/24 자 버전**.
→ PWA 를 캐시한 매장 기기에 **C(발주 모바일 수정)가 도달하지 않을 수 있다.** "고쳤는데 그대로예요" 재보고 조건.
**Fable 권고: SW_VERSION bump 후 프론트만 재배포(저위험).** ⛔ Irene `/배포` 지시 없이는 실행 금지.

---

## 🟣 단위 주문(kg/g) 점검 — Fable 판정 완료, Irene 컨펌 3건 대기

**Irene 질문:** 이름에 "1kg" 안 박고 kg/g 로 주문 가능한가 / 수량 주문이 어려운 품목 / 옵션으로 가격을 넣어야 하나 /
갯수·단위가 오락가락 / 같은 재고에 공급업체 여러 개 연결 시 오더 방향.

**⛔ 컨펌 4건 (4번은 2026-08-30 Irene 질문 "일단 레스토랑관리자에서 하고 나서 볼까?" 에 대한 Fable 답):**
1. 팩 규격 여러 개 = **판매상품 여러 개 등록**(옵션으로 규격 흉내내기 비권고)
2. **`order_mode='measure'` 신설** (kg/g 직접 입력, 가격은 단위당)
3. **다중 공급업체 현 구조 유지 + 3곳 보완**
4. **"RA 먼저" — 찬성. 단 역할이 아니라 층으로 3단계**:
   ①전 역할 공용 기반(`min_order` DECIMAL·`order_mode` 신설 **기본 pack=현행**·conv 버그·불일치 감지 → **화면 변화 0**)
   ②구매 UI 는 `buyerEntity.type === 'restaurants'` 게이트로 **RA 에만** + 공급업체 상품 등록에 규격·주문방식 입력
   ③RA 에서 익은 뒤 **게이트 제거만** 으로 BG/FG 확장
   ⚠ 순수 역할 절단은 **기각** — 판매자 데이터(order_mode·base_quantity·min_order)는 역할별로 못 가른다. 이중화하면 재고 환산이 깨진다.

**"완벽하게 할 수 있어?" 에 대한 Fable 답:** "완벽"을 약속하지 않고 근거를 든다 — 규격·소수주문 **사용 이력 0**(옮길 데이터 없음) /
스키마 80% 이미 존재 / 모든 변경이 **기본값=현재동작 추가형** / 최대 위험지점(입고 환산)은 검증된 공식 그대로.
약속하는 것은 **단계마다 반증(고장주입) 포함 검증 통과 후 다음 진행**.

**Fable 판정 요지:** 구조는 이미 80% 준비됨(소수 수량 DECIMAL·링크 환산비·판매상품 단위). 문제는 UX 미사용 + 정수 제약 2곳 + measure 모드 부재.
1. **팩 규격 여러 개 = 판매상품 여러 개로 등록** (옵션으로 규격 흉내내기는 **비권고** — 옵션은 unit_conversion 을 못 물어 재고가 깨진다)
2. **`order_mode='measure'` 신설** — kg/g 직접 입력(소수), 가격은 단위당. 업계 catch-weight 방식
3. **다중 공급업체 현 구조 유지**(재료 1행 + 판매자 배열 + 제출 시 판매자별 PO 분리) + 3곳 보완:
   `NewPurchaseOrderPage.tsx:1854` 최소주문 `Math.max` **버그** → 선택된 판매자 기준 /
   `min_order_quantity` INTEGER→DECIMAL(2곳) / 업체 간 **단위당 가격(unit_price ÷ base_quantity)** 비교 표시
4. **지뢰 정식 포함**: `restaurants-ingredients.js:381` 생성 흐름이 `unit_conversion` 을 **1 로 고정**(body 무시)
   → ①생성이 환산비를 받게 수정 ②불일치+conv=1 링크를 **감지·표시만** 하는 멱등 점검(⛔ 자동 백필 금지 — tray→kg 은 기계가 못 추측)
5. `SupplierOptionModal.tsx:268` `Math.max(1, parseInt(...))` 정수 강제도 이 설계에 **묶어서** 처리(지금 따로 고치지 말 것)

**dev 실측 (운영 미확인 — classifier 로 운영 DB 조회 차단):**
| 항목 | 값 |
|---|---|
| 활성 링크 | 58건 (conv=1: 53 / ≠1: 5) |
| **단위 불일치인데 conv=1** | **4건** — Black Pepper(g↔kg) · Egg(kg↔tray) · Test Oil(kg↔L) · Soy Sauce(g↔L) ← **1kg 입고가 1g 으로 기록되는 조건** |
| `supplier_products.base_quantity <> 1` | **0건 / 38행** — 규격 필드 **사용 이력 0** |
| PO 라인 소수 수량 | **0건 / 127행** (스키마는 DECIMAL 인데 쓰인 적 없음) |
| min_order_quantity > 1 | supplier_products 15 · ingredient_seller_products 11 |
| 공급업체 옵션 실사용 | 그룹 5 · 옵션 15 · 상품연결 6 |
| 다중 판매자 재료 | 1개=36종 / 2개=2종 / 3개=1종 / **5개=1종** |
| 이름에 규격 박은 흔적 | 2건 (`Premium Coffee Beans 1kg`, `Tiger Beer 338ml`) |
| 프론트 소수 준비 | `utils/unitConversion.ts:62` `qtyStepForUnit()` 이 연속단위에 **0.01 스텝** 이미 적용 |
| 잔여 정수 강제 | **`SupplierOptionModal.tsx:268` 1곳뿐** |

→ **신설 부담 없음**(기존 데이터 마이그 불필요)이 Fable 판정.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- ~~fetchDedupe signal 설계~~ → **2026-08-30 완료**(위 🟣 D 항목)
  ⚠ 남는 사실: **페이지 파기 중의 `Failed to fetch` 는 브라우저 고유 동작이라 완전 제거 불가** — 0 으로 만들려고 헛수사하지 말 것
- **notice 메일 `lang` 하드코딩** — 템플릿은 4언어를 타는데 호출부(`routes/notices.js:496`)가 `'en'` 고정.
  PO 와 **같은 팩토리 방식으로 풀린다**(이번 범위 밖, Fable 무접촉 지시)
- **payment_method='counter' 가 `other` 로 분류**(dev 4건) — 현금·카드 어느 쪽도 아닌 항목으로 마감 화면에 뜬다.
  4건짜리 관측이라 단독 사이클 안 씀 — **마감 대사 UX 검토 시 텐더 매핑과 함께 판정**(Fable)
- 브랜드 재고 이원화 구조 — 공급업체 링크는 `product_ingredient_id` 축, 브랜드 링크는 `ingredient_id` 축이라 재료 id 만으로 원가에 못 닿는다 ([[project_brand_stock_two_lists_split]])
- 공급업체 없는 재고 12건 연결 (Irene 이 매입처를 알려주면 진행) / 판매가 0인 프로덕트 채우기
- 발주 메일 다국어 / 계정 없는 사람에게 발주 알림 / 구매자 확인메일 품목표 / draft 담은 날짜 표시
- 판매자 라인 단위 품절 처리 (⛔ `discrepancy_*` 재사용 금지)
- ~~알림 수신자 `is_active` 미필터 / `getBrandManagerIds` 다중 브랜드 누락~~ → **2026-08-30 수정 완료**(위 🟣)
- **foodcourt 소유 레그 잠재** — `getFoodcourtManagerIds` 도 `foodcourt_id` 단일 컬럼. brand 와 동일 형태지만 dev 표본 0 이라 미수정
- **`getSupplierAdminIds` staff 레그** — 2026-08-30 테스트 계정으로 실증 마감(이상 없음)
- 작업 3(공급업체 소비자 커머스) 재개 — 커밋 `f87cd631`, 운영엔 스키마만 배포됨

---

## 🟠 Irene 이 실행할 3단계 (준비 완료, 실행 대기)

1. **PO-10 취소** — 화면에서 `PO-R10-20260827-001` → Cancel (submitted 라 버튼 있음)
2. **정리 적용** — `ssh irene@87.106.78.146 "cd /var/www/production-backend && node /tmp/cleanup-ugs-duplicate-products.js --apply 2>&1 | tee /tmp/ugs_cleanup.log"` (⛔ `--hard` 금지)
3. **재담기** — ○ 비닐봉투 12"×15"(2개, 7.50) · 800ML 원형용기(3개, 45.90)
   / ✗ 사각 플라스틱통·소스통은 **판매가 정비 후에만** (옛 판매가가 0.00 / 역마진 6.50 vs 원가 8.00)

~~ENUM 수동 실행~~ — **2026-08-30 배포로 해소됨**(생존 증명 완료).
2번 실행 후 **Opus 가 읽기 증명 4종 + 중복 활성링크 0 재확인** → Fable. 이것이 이 사이클 마지막 미결 판정 항목.

가격 채울 25종 = `docs/archive/2026-08-28-stock-ledger/price_fix_list_2026-08-30.json`
⚠ 원가 열은 **미기재(구조 사유, Fable 판정)** — 임시 다리를 놓지 않는다. 화면의 "원가 미설정" 배지로 골라낼 수 있다.

**🔑 권한 실측:** 운영 SSH **읽기는 통과, 쓰기는 차단**된다(`Blocked by classifier`). 명령 형태와 무관하다.
`.claude/settings.local.json` 에 `Bash(ssh:*)` 는 이미 있다 — 권한 목록 문제가 아니다. ⛔ 우회 시도 금지, 운영 쓰기는 Irene 이 직접.

---

## 🎯 `pending_approval` ENUM — 3세션 미스터리 종결 (2026-08-30)

**원인: `sprint6-migration.js` 의 ENUM 목록 하드코딩.** 마이그·레지스트리·배포 루프는 **전부 정상이었다.**
```
[07:50:21] migrate-po-status-pending-approval.js [OK]  ← 값 추가 + 자기검증 통과 (진짜 성공)
[07:50:50] sprint6-migration.js [OK]                   ← 9개 하드코딩으로 통째 교체 → 소거
[07:50:51] sprint7-migration.js [OK]                   ← in_transit·delivery_failed 만 재추가
```
레지스트리 실행 순서가 **파일명 정렬**이라 sprint6 이 항상 뒤. 배포마다 넣었다 30초 뒤 지워졌다.
배포 후 운영 ENUM 이 정확히 "sprint6 9개 + sprint7 2개"와 일치해 기전이 재현으로 증명됐다.
`sprint7` 도 같은 하드코딩(가드 덕에 발현만 안 함) — 함께 제거.

**배제한 후보(전부 실측):** 레지스트리 누락 / 운영 파일 옛버전(sha256 일치) / 잘못된 DB / 권한부족(ALL PRIVILEGES) /
SKIP 분기 / sync-database(마이그보다 먼저 + `--alter` 없음) / 배포 루프 건너뜀(58/58 실행 기록).

**재발 방지 3층:** ①`scripts/lib/enumExpand.js`(expand-only 공용, 소실 시 throw) + sprint6·7 의 4지점 교체
②배포 게이트 `scripts/check-enum-parity.js` — **ENUM 값 소실만 차단**(다른 타입 차이는 WARN), 0건 검사 시 `exit 2`(고장)
③`CLAUDE.md` DB 체크리스트 + `docs/SCHEMA-MIGRATION-GUIDE.md` 에 사고 경위와 함께 기록

**증명:** 배포 후 운영 COLUMN_TYPE 12값 전부 존재 / 마이그 재실행 SKIP(멱등) / 게이트 로그 "ENUM 값 소실 0" /
운영 전수검사 측정 25/25. **같은 실행 순서에서 값이 보존된 것**이 수정의 실효 증명.

---

## 🔴 확정 구멍 (dev 수정 완료·미배포) — BG 재고아이템 이중 가산

**RA 에서 막은 것과 같은 구멍이 브랜드 경로에 있었다.** 브랜드 입고(`POST /product-ingredients/:id/adjust-stock`)와
PO 수령(`product_ingredient_id` 분기)이 **같은 `ProductIngredient.current_stock`** 을 각각 올린다.
- **고장주입 실증**: 발주 6개 대기 상태에서 ①재고화면 입고 6 → 46 ②발주에서 받음 6 → 52. **물건 6개인데 재고 +12.**
- 조치: `GET /product-ingredients/:id/open-po-lines`(조회 전용, RA 와 대칭) + 기존 모달 선택 UI 를 brand 분기에 연결
- ⚠ **실측으로 고친 것**: `ProductIngredient` 에 **`brand_id` 가 없다** — 소유는 `owner_user_id`(BG 사용자).
  행에서 브랜드를 못 읽어 `assertBGOwnsRow` 통과 후 요청자의 BG 스코프로 판정한다.
- 검증: 실호출 11/11(자기것 200 / 남의것 404 / 익명 401 / 재고 +6 한 번만 / 수령완료 라인 제거 / 일반입고 불변)

**후속 3경로는 "적용 불가"로 닫혔다 (Fable 승인, 실측):**
`supplier-inventory`=공급업체는 판매자(구매자 화이트리스트 밖) / `general-stock`=PO 라인에 참조 컬럼 없음 /
`foodcourt-inventory`=`FoodcourtProduct` 를 올려 PO 라인과 다른 객체.

---

## 🟢 2026-08-30 운영 배포분 (3회, 버전 미상승)

**① 발주 "받았다" 대칭화** — `RECEIVABLE_STATUSES` 모듈 상수 신설, mark-received·receive 두 라우트가 같은 집합을 본다.
프론트 상세도 같은 집합. **draft·pending_approval 차단 유지**(승인 우회 방지, 2026-07-13 판정 불변).
검증 28/28 + 고장주입 반증(옛 게이트로 되돌리자 12건 실패).

**② 재고 입고 ↔ 발주 동기화 (RA)** — `GET /restaurants/:id/inventory/open-po-lines` 신설(조회 전용) +
입고 모달 선택지 [발주 입고로 처리 / 일반 입고]. 고르면 PO `/receive` 로 태운다 — **재고 가산 로직 복제 안 함**
(입고 단일 소스 = PO 수령 경로). ⛔ 자동 매칭 안 함. 검증 10/10 + IDOR 고장주입 반증.

**③ 모바일 상세 4건** — i18n 원시 키(`detail.timeline.in_transit`·`delivered`) 4개 언어 추가 ·
배송 추적 접이식 · 헤더 액션 폭 100%+좌측정렬, 아이콘버튼 36→**42px**(옆 ThemedButton 실측 높이) · 품목 카드 5줄→3줄.

**④ ENUM 근본수정 + 게이트 승격** (위 🎯 참조)

**health-check 가드 강화(Fable 승인):** `발주 승인: 게이트가 3경로...` 가 소스에서 `RECEIVABLE = [` 를 **문자열 grep**
하고 있어 개명만으로 실패했다(동작 회귀 아님). 실제 불변식(화이트리스트에 pending_approval·draft 없음 +
두 라우트가 같은 집합) 검사로 교체 + 고장주입 반증.

**운영 전수검사(읽기 전용):** 측정 **25/25 통과 · 측정 불가 0**. health 200 / 5역할 각자 스코프 / 익명 401 ×3 /
IDOR 403 차단 / `open-po-lines` 200·400·401 / ENUM 존재.

---

## 🟡 2026-08-30 미배포 (dev 완료 — `/배포` 지시 대기)

**C. 신규 발주 화면 모바일 붕괴 수정** (Fable 판정 #12, 마커 7b9a5211fd43)
- 근본: `NewPurchaseOrderPage.tsx` 의 `Layout` 이 ≤1024px 에서 `grid-template-rows: 1fr 50vh` 로
  **장바구니에 화면 절반을 고정 배분**. 담기 전 카트는 정보가 0인데 그 공간을 먹고 상품 목록이 눌렸다.
  실측: 360×740 에서 카드 영역 **55px** — 카드 최소 높이 180px 이라 **한 장도 못 들어감**.
- 조치: `1fr 50vh` → `1fr`. 좁은 화면 카트를 `position: fixed` **하단 시트**로. 접힘 = 바 1줄(수량 배지 + 합계,
  **이 갱신이 담기 피드백**), 펼침 = 내용 기반 + `max-height: 60vh`. 전부 미디어쿼리 안 · 페이지 로컬 → **데스크탑 무접촉**.
- 검증: 접힘 **53px**(이전 370~512px) · 펼침 24~33vh · 담기→`Cart15.20▴` 즉시 갱신 → 제출 도달 ·
  1280 은 `position:relative` 720px 사이드바 + 시트바 `display:none` 유지. verify-all 15/15 + mount sweep 8역할 크래시 0.

**D. site-settings 콘솔 노이즈 — 부분 상태로 운영 반영됨 · 근본수정 진행 중**
- `AbortController` + `signal.aborted` 판별(⛔ 메시지 문자열 매칭 금지 — 같은 문자열이 진짜 장애에서도 난다).
- **잔존**: `utils/fetchDedupe.ts` 가 동일 GET 을 요청 1개로 합쳐, 호출부 6곳 중 다른 곳이 먼저 쏘면 signal 이 안 붙는다
  (실측: 요청 결말 200 인데 `hasSignal: false`). 백로그는 위 "후속 후보" 참조.

**E. 레시피 저장경로 수리 + 파괴방어 영구 안전망** (Fable 게이트 PASS, 마커 7867b988bbd1)
- **근본**: 메뉴(RA)·프로덕트(BG) 폼의 "직접 재료 입력" 저장이 ①기존 재료를 **먼저 전부 지우고** ②새로 넣는데,
  트랜잭션이 없고 catch 가 오류를 삼켰다. ②가 중간에 실패하면 **지운 것만 남아** 쌓아둔 재료가 통째로 증발하고
  화면에는 "저장됨"으로 보였다. 실측 반증: 방어 제거 시 **재료 2건 → 0건 소실 + status 200**.
- **조치**: `routes/menu.js`(POST·PUT) + `routes/brand-products.js`(POST·PUT) **4곳** 단일 트랜잭션 + rollback + **400 반환**.
  공용함수 통합은 백로그(4곳이 같은 형태로 수렴해 있어 통합 시점에 유리).
- **부수 실결함 수정**: `product_recipe_ingredients` 에 **UNIQUE(recipe_id, ingredient_id) 없었다**
  (형제 `recipe_ingredients` 에는 있음). 같은 재료 2행 → BG BOM 이중 → **입고 재고·원가 이중 계산**.
  `scripts/migrate-product-recipe-ingredient-unique.js`(신규, registry `deploy` 61번째) — 멱등 · 행수 자가검증 ·
  **중복 발견 시 지우지 않고 목록 출력 후 exit 1**. 착수 전 실측 중복 dev 0 / 운영 0(73행).
- **영구 안전망**: `health-check --category=inventory` 에 4케이스(menu PUT 파괴방어 / menu POST 고아0 /
  brand PUT 파괴방어 / brand POST 고아0). 실패 주입은 **같은 재료 2번 = 유니크 위반**(SQL 모드 무관 —
  ENUM 위반은 비STRICT 환경에서 조용히 통과한다). 토큰은 `setup()` 단일 발급(`demoRestId/demoRaToken/demoBgUserId/demoBgToken`),
  쓰기 대상은 매장 `is_demo`(브랜드 축은 매장이 없어 `is_test` BG). **inventory 12/12 · 건너뜀 0 · 잔재 0(연속 2회)**.
- **이식 반증**: 방어 제거 → **정확히 새 4건만 실패, 기존 8건 무영향**. 원복 → 12/12.
- ⛔ **빈 레시피 126건 = Irene 관리 영역, 시스템 무접촉.** 목록화·삭제·수정 금지.
- 🔎 **다음 배포의 운영 검증 필수 1건 (Fable 지시)**: brand 프로브가 운영에서 집는 BG 계정이 **진짜 시험 계정인지**
  (실브랜드 데이터 소유 여부) 1회 확인하고 기록. `is_test` 는 실사용자에 잘못 붙은 전례가 있다
  ([[reference_notification_six_gates]]). 아니면 픽스처 기준을 조인다.

**A′. BG 재고 이중 가산 차단** (위 🔴 참조)

---

## 🔬 계측 규율 — 오늘 여러 번 당한 것 (다음 세션 필독)

**1. 종료코드를 봐야 하는 명령에는 파이프를 붙이지 않는다.**
`npm run build:dev 2>&1 | tail -8` → 파이프라인 종료코드는 **마지막 명령(`tail`)의 것**이라 빌드가 exit 1 로 죽어도 0 이 보고된다.
오늘 이걸로 **빌드가 메모리 게이트에 막혀 시작조차 안 했는데 완료로 읽고 옛 번들을 검증**했다.
2026-08-27 세션에도 같은 기록이 있는데 **같은 자리에서 두 번째**다.
→ 파일로 리다이렉트해 따로 읽거나 `EXIT=$?` 를 인쇄해 그 값을 읽는다.
고장주입 실측(원본 무접촉 사본 + 항상 실패하는 가짜 게이트): 파이프 없음 `EXIT=1` / 파이프 `EXIT=0` / `PIPESTATUS=1,0`.
⚠ **`deploy-dev.sh` 도 `deploy-to-production.sh` 도 정상이다** — 배포는 `> /tmp/build.log 2>&1 || { error ... }` 로
리다이렉트+`||` 라 종료코드가 그대로 전파된다. "배포가 옛 번들을 올릴 수 있다"는 앞선 경보는 **오보로 철회**했다.

**2. 빌드 반영은 종료코드가 아니라 번들 내용으로 확인한다.**
`grep -l "<새 심볼>" dev-frontend-build/static/js/*.js` + **옛 코드가 사라졌는지**까지. lazy 페이지는 `main.js` 가
아니라 별도 chunk 에 들어간다 — `main.*.js` 만 grep 하면 0 이 나와 또 헛다리를 짚는다.

**3. 계측 앵커(선택자·문구)는 측정 전에 실데이터로 1회 확정한다.**
오늘 선택자가 3회 연속 무의미한 0 을 냈다: i18n 실제 문구가 `Cart` 인데 코드의 폴백 `Planned Order` 로 찾음 /
상품 카드가 아니라 목록 컨테이너를 잡음. **0건이 나오면 통과가 아니라 계측기 고장을 먼저 의심한다.**
표본도 마찬가지 — "담기가 재현 안 된다"의 실체는 화면의 카드가 전부 **공급업체 미연결이라 원래 안 담기는 것**이었다.
DB 에서 활성 판매자 링크가 있는 품목(Onion, ingredient 16)을 찾아 검색으로 특정하니 재현됐다.

**4-1. 고장주입은 "주입 전 상태"가 판정을 가릴 수 있다.**
menu 파괴방어 시험이 **수리 전 코드에서도 통과**했다. 재료 1건을 지우고 1건을 넣어 **숫자가 우연히 같았던 것**.
주입 전 2건 · 주입은 나쁜 재료 1건으로 바꾸니 2 → 0 소실이 드러났다.
같은 맹점으로 **아침에 "고장주입 3/3 통과"로 보고한 것은 PUT 파괴 축을 아예 안 본 통과였다**(소급 정정함).
→ 고장주입은 **방어를 제거해 실제로 실패하는지**까지 봐야 통과다. 반증 없는 통과는 통과가 아니다.

**4-1b. 왕복 검증의 기대값은 반드시 "현재값과 다른 값" 이어야 한다. (오늘 세 번 당함 — 규칙으로 승격)**
`pack` 인 걸 `pack` 으로 바꾸고 "반영됨" 판정 / 재료 1건을 지우고 1건 넣어 "보존됨" 판정 /
공급업체 판매자가 아예 없는 표본을 "정상" 으로 셈. 셋 다 **변화를 재지 않은 통과**였다.
→ 주입 전 상태를 결과와 다르게 만들어 놓고 잰다. 변화를 안 잰 통과는 통과가 아니다.

**4-2. 실패 주입 벡터는 환경 의존이면 안 된다.**
`unit` ENUM 위반은 `STRICT_TRANS_TABLES` 가 꺼진 환경에서 **조용히 잘려 들어가** 시험이 거짓 통과한다.
DB 제약(유니크/FK) 위반처럼 **모드와 무관하게 확정 실패**하는 벡터를 쓴다.
⚠ "없는 `ingredient_id` 로 FK 실패" 는 **안 통한다** — 두 라우트 다 `findByPk` 후 `if (!ingredient) continue` 로 건너뛴다.

**4-3. 조용한 삼킴은 남의 코드만의 병이 아니다.**
그 결함을 고치는 작업에서 내가 만든 정리 함수가 **문장 전체를 하나의 try** 로 감쌌고, 그 안에서 컬럼명을
`brand_product_id` 로 잘못 썼다(실제 `product_id`). 오류가 catch 에 걸려 **뒤 문장이 통째로 안 돌아**
`brand_products` 가 매 실행 2건씩 조용히 쌓였다. 처음엔 "동시 실행 탓"으로 오귀인했다가 연속 실행에서
계속 쌓이는 걸 보고 뒤집었다.
→ **규약: 정리 함수는 문장별 try + 실패 시 가시 경고.** 그리고 정리 범위는 접두어 전체가 아니라
**그 케이스가 만든 이름만** (겹쳐 돌면 서로의 진행 중 데이터를 지워 없던 실패를 만든다).

**4. 작업 디렉토리도 계측 변수다.** mount sweep 이 `dev-frontend` 에서 실행돼 `MODULE_NOT_FOUND` 로 죽었다.
파이프 없이 종료코드를 읽는 습관으로 바꿔서 잡혔다.

---

## 🧭 역할별 스코프 지도 (검사기 작성 시 함정)

**전 역할이 `restaurant_id` 를 갖는다고 가정하면 검사가 통째로 무의미해진다** (실제로 그래서 5건이 "측정 불가"였다).

| 역할 | 스코프 |
|---|---|
| Restaurant Admin · Staff | `users.restaurant_id` |
| Brand General · Manager | `users.brand_id` |
| Foodcourt General · Manager | `users.foodcourt_id` |
| **Restaurant Owner** | **어느 컬럼도 없음** — `restaurant_managers(relationship_type='ownership')` 경유 |
| System Admin | 전역 |

경로 예: `/owner/restaurants`·`/owner/dashboard`·`/owner/restaurants/:id/stats` / `/brands/:id/inventory` /
`/foodcourts/:id/inventory` / `/admin-analytics/system-stats` / `/dashboard/restaurant/:id/stats` /
`/notification-settings/preferences`(전 역할 공통).
⚠ 역할별 표본은 `ORDER BY (스코프컬럼 IS NULL), id` 로 **스코프가 채워진 사용자를 우선** 뽑는다 —
그냥 `LIMIT 1` 이면 스코프 빈 사용자가 걸려 아무것도 못 잰다.

---

## 🟢 2026-08-30 운영 배포 2회 + VINA conv 물결 반영 (버전 유지 — Irene "아니")

**배포 ①** 16:19 `/var/www/backups/20260830_160422` — 단위주문 1·2단계 + 기존 4묶음(fetchDedupe·알림·발주메일·SW bump).
게이트 9/9 · 마이그 59/59 · ENUM 소실 0 · 스모크 10/10. `order_mode` 신설(운영 351건 전부 pack) · min_order DECIMAL 확폭.
⚠ 1차 시도는 **메모리 게이트가 차단**(PlanQ tsc 3.9GB 점유) — 남의 빌드를 죽이지 않고 대기 후 재시도. 1차엔 운영 반영 0.

**배포 ②** 18:56 `/var/www/backups/20260830_184223` — 장바구니 단위 접미 전 상품 확대 · 가격 의미 문구 · 규격 힌트 · 프론트 절삭 4곳.
게이트 9/9 · 마이그 59/59 · ENUM 소실 0 · 스모크 10/10. **운영 번들에 `Choose a unit below`·`content unit` 도달 확인**(배포 전 0 → 후 1).

**🔴 Irene "장바구니에 단위가 안 나온다" 의 원인 = 미배포였다.** 코드·캐시 문제가 아니었다.
운영 8185 청크에 신규 문자열이 0건이던 것으로 확정. Fable 가설이 맞았고, 내 1차 판단(캐시 의심)은 틀렸다.
→ **교훈: "dev 번들에 있다"는 운영 화면 문제의 답이 아니다. 환경부터 가른다.**

**VINA conv 물결 반영 완료** (운영):
```
③ 승인 18 = 확인표 대상 18 → 쓸 것 17 · 쓰기불요 1(#843)
④ 백업 /tmp/vina/backup-conv-2026-08-30T18-36-19-001Z.json
✓ 17행 반영 · ⑥ 즉시검증 일치 17/0
R-SC-007: 26건 → 9건 (17건 해소)
```
남은 9 = 표에 답 없는 4(#898·#846·#858·#997) + #843(값 이미 일치, **baseline judged-ok 등재 미완**) + brand 4.
확인표 승인은 Irene 위임("fable이 판단하고 해")에 따라 **Fable 이 대행**.

**⛔ 남은 것 — spec 물결 174건**: `apply.js --wave=spec --apply --expect=174` 가 **classifier 에 차단**됨(우회 안 함).
Irene 이 한 줄 실행해야 한다:
```
ssh irene@87.106.78.146 "cd /var/www/production-backend && node /tmp/vina/apply.js --wave=spec --apply --expect=174"
```
이게 되어야 규격 148건이 채워져 장바구니 `1 × 2kg` 표시가 실제로 보이고 **500g 주문이 열린다**
(현재 운영 `base_quantity` 전부 1이라 접미가 `piece` 만 뜬다).

---

## 🟢 2026-08-30 VINA 데이터 물결 3회 — 전부 운영 반영 완료

Irene 이 준 VINA 단가표(324행)를 운영에 반영한 전체 기록. **백업 3개 전부 `/var/www/backups/data-migrations/` 에 보존.**

| 물결 | 내용 | 결과 | 백업 |
|---|---|---|---|
| 1. conv | 환산비 17행 | 즉시검증 17/17 | `backup-conv-2026-08-30T18-36-19-001Z.json` |
| 2. spec | 규격·단위·주문방식·가격 174행 | 배포 마이그로 실행, 174행 | `vina-spec-backup-2026-08-30T19-26-42-963Z.json` |
| 3. 재고단위 | 재고 unit 교정 63재료/66링크 | 즉시검증 63/63 | `stockunit-wave3-backup-2026-08-30T19-49-38-486Z.json` |
| +1건 | #96 Aust Midfield Brisket (Irene 확인) | kg/measure/40.2 | `vina-96-backup-...json` |

결과: `order_mode='measure'` **76건** · 규격>1 **79건** · **500g 주문 가능**.
`양배추/시금치/연어 → 재고 kg ↔ 판매자 kg ↔ conv 1 ↔ measure` 실측 확인 = **1.5kg 주문이 재고 1.5kg**.

### 🔴 이 사이클에서 배운 것 (되풀이하지 말 것)
1. **`unit` 의미론을 바꾸면 검사기 불변식과 링크 환산 전제가 함께 바뀐다.** spec 물결이 판매자 unit 을
   "판매 단위 → 내용물 단위" 로 바꿨는데, 그 2차 영향을 **사전에 계산하지 않았다**(Fable 설계 누락 + Opus 기대값 미계산).
   확인표에도 영향 예고가 없었다. → 데이터 의미론 변경은 **그것을 읽는 모든 검사·계산의 전제를 같이 점검**해야 한다.
2. **잘린 카운터를 읽었다.** 옛 R-SC-007 이 `LIMIT 50` 이라 "9건→55건" 으로 보고했는데 무제한 기준 실제는 168건이었다.
   "늘었다"는 서사 자체가 계측 착시였다. → [[규율 3조: 판정 기계부터 의심하라]] 의 새 표본.
3. **🔴 질량↔부피를 같은 차원으로 계산하고 있었다.** `UNIT_FACTOR = {g:1, kg:1000, ml:1, l:1000}` 이 kg 와 L 을
   둘 다 1000 으로 담아 `1kg = 1L` 로 통과시켰다. **Test Oil(kg↔L conv=1)이 조용히 정상 판정**되고 있었다.
   → `DIM` 표로 차원 분리. 밀도를 알아야 하는 값은 기계가 정하지 않는다.
4. **baseline 키에 링크 id 가 들어가면 환경 간 이식이 안 된다.** dev·운영 id 가 달라 운영에선 baseline 이 애초에 안 맞았다.
   배포 게이트는 dev 에서 도므로 실무상 문제는 없으나, 운영 인스펙션을 볼 때 이 사실을 알고 봐야 한다.
5. **손 전사 금지.** 채팅으로 받은 표를 내가 옮기다 **140/324행만 담아 절반을 유실**했다(Irene 이 지적해 발견).
   원문 무편집 보존 + 파서 코드가 정본. 원본 파일 요청은 계속 유효.

### 남은 사람 확인 목록 (Irene 회신 대기 — 급하지 않음)
```
소고기 호주양지  재고 "5개" = 몇 kg? (또는 "0으로 시작")
양파 (Indus)     1개 = 몇 g?
고운소금 (LSH)   "12pkts(450g)/1bundle" 의 뜻 — 1팩 450g?  ← 답하면 양파까지 연쇄 해소
닭다리 (NSK)     1팩 = 몇 kg?
오징어링(Seafood) 1팩 = 몇 kg?
깐새우 (Seafood)  1팩 = 몇 kg?
```
확인표: https://claude.ai/code/artifact/148083f3-b9e4-4797-9876-d729b2182872

### dev 대기 (다음 `/배포`)
목록 가격 단위 표시 · "단위 확인 필요" 뱃지 · R-SC-007 모드인지형+차원분리 개정 · baseline 재등재.
⚠ **검사기 개정과 baseline 은 반드시 같이 나간다** — 따로 나가면 그 배포의 게이트가 자기 실패를 만든다.

---

## 🟠 VINA 단가표 반영 — Fable PASS · **Irene 확인표 승인 대기** (2026-08-30)

Irene 이 채팅으로 준 공급업체 단가표(VINA)를 운영 `supplier_products` 350건과 대조해 반영하는 작업.
**현재 상태: 코드·확인표 완성 · Fable 최종 PASS · 운영 쓰기 0 · Irene 승인 대기.**

### 산출물 (`scratchpad/vina/`, 운영 사본 `/tmp/vina/`)
- `source.raw.txt` — **정본. sha256 `d50b7f58f8133560…` · 324행 · 이후 수정 금지.**
  ⚠ Irene 이 채팅으로 줘서 **내가 재현해 기록**했다. 1차에 140행만 담아 절반을 유실했고 Irene 지적으로 발견·보완.
  → **원본 엑셀 파일을 받으면 기계 diff 로 전사 검증할 것**(요청은 전달됨, 미수신).
- `parse.js` — 열 8개 안 맞거나 복합 규격(`12pkts(450g)/1bundle`)이면 **추정 금지·큐로**. 273 해석 / 50 큐.
- `reconcile.js` — **읽기 전용.** 매칭 = 업체명(소문자+영숫자만) + 상품명(trim·소문자·공백축약) **완전일치**. 퍼지 금지.
- `derive-conv.js` — 환산비 유도. 질량↔질량·부피↔부피·개수 동의어만. 차원 교차는 유도 금지.
- `apply.js` — **기본 드라이런.** `--wave=conv|spec` · `--apply` 는 `--expect=N` 필수 · `--exclude=id,id` ·
  `VINA_BASE` env 로 dev/운영 전환(**사본 스크립트 금지**).
- 확인표 artifact: https://claude.ai/code/artifact/148083f3-b9e4-4797-9876-d729b2182872
- dev 시험 백업 덤프 2개 보존: `scratchpad/vina/backup-conv-2026-08-30T18-16-*.json`

### 대조 결과
반영 후보 174(SPEC 148 · B 23 · A 3) · 이미 일치 56 · 반영 제외 20(risky 19 + C 1) ·
미매칭 23 · 기계 못읽음 50 · 환산비 유도 17(+질문 5).

### 🔴 이 작업에서 걸러낸 것 (되돌리지 말 것)
1. **단위 어휘는 DB 가 정본** — 표는 `pkt/pcs/btl`, DB 는 `pack/piece/bottle`. 표 어휘로 접었더니
   내용 같은데 문자열만 바꾸는 변경이 **56건** 나왔다. 동의어 등가면 `unit` 무변경.
2. **쌍둥이 이름 탐색은 큐까지 훑어야 한다** — `Hotteok`(파싱 성공) vs `Hotteok HOIHOI`(파싱 실패로 큐)라
   `rows` 만 보면 쌍을 못 본다. 실제로 `Hotteok 2.4→15.9` 가 규칙을 통과했었다.
3. **가격 3층(A/B/C)** — 기준 불변 ±20% 이내=A / 단위·규격·모드 동반=B / 기준 불변인데 초과=C(제외).
   B 는 **산술이 맞을 때만** 자동 해설(`Sprite 1.58×12≈19` 통과 / `코카콜라 36.5 vs 21÷12` 20배 어긋나 C 강등).
4. **no-op 행 분리** — `#843` 은 확정값=현재값(1). 써도 R-SC-007 이 계속 잡는다
   (검사가 "확정된 1"과 "기본값 1"을 구별 못 함) → **conv 반영 후 baseline `judged-ok` 등재 필요.**

### 반증(고장주입) 6회
분류기(+50% 합성행→C) · 낙관적 가드(기대 위조 3건 스킵) · 건수 상한(`--expect=99` 중단) ·
`--exclude` · dev 쓰기 왕복 3/3 · **트랜잭션 롤백**(2번째 행 throw → 이미 쓴 1번째도 원값 복귀).

### 실행 순서 (승인 후)
`--wave=conv --apply --expect=17` → 즉시검증 → **R-SC-007 재실행**(기대: 잔여 = 질문 5건, #843 baseline 등재 후 신규 0)
→ **reconcile 재실행에서 반영 행이 "이미 일치"로 이동했는지**(파이프라인 자기일관 증명) → 동일 절차로 spec 물결(174건).

---

## 📌 계측 규율 (실제로 밟은 것만)

- **장시간 sweep 실행 중 빌드 금지** — 겹치면 메모리 게이트 조건이다(2026-08-30 실제: 가용 2.3GB 강하,
  빌드 힙 2560MB). 순서화하거나 **sweep 종료를 확인한 뒤** 빌드할 것. 겹쳤다면 sweep 을 죽이고
  빌드 완료 후 **단독 재실행**한다(구 번들 대상 sweep 은 어차피 무효).
- `pgrep -f "verify-all.js"` 는 **대기 루프 자신을 매칭한다**. 실제 프로세스 확인은
  `ps -eo cmd | grep "[n]ode scripts/verify-all"` 형태로.

---

## 📌 스키마 함정 (다음 세션 대비)

1. `purchase_order_items` 에 `seller_product_id` **없다**. `ingredient_seller_product_id`(링크 id)를 문다 —
   발주 라인은 상품이 아니라 **연결**을 참조한다.
2. **`brand_product_brands` 는 소유 표가 아니라 배포 공유 표**(운영 전체 61행, brand_id=1 은 28행).
   **브랜드 상품의 소유·판매 범위 판정은 `ingredient_seller_products` 링크 기준으로 해야 한다.**
   이걸로 조인했다가 가격 목록이 `0건` 으로 나왔고, 앞선 실측과 모순돼 계측기를 의심해 잡았다.
3. `ProductIngredient` 에 **`brand_id` 없다** — 소유는 `owner_user_id`.
4. 🔴 **`ingredient_seller_products.seller_product_id` 는 다형(polymorphic) 참조다.**
   `seller_type='supplier'` 면 `supplier_products`, `'brand'` 면 `brand_products` 를 가리킨다.
   **타입 필터 없이 한쪽 테이블에 조인하면 ID 충돌로 가짜 행이 붙는다.**
   2026-08-30 실제 오측: 단위 불일치 링크를 재다가 brand 링크 2건(id 51·52)이 같은 id 의
   supplier 상품과 엉겨 "4건 → 6건으로 늘었다"는 **없는 사실**을 보고했다. 정확히 조인하니 4건 불변이었고,
   51·52 는 piece↔pcs 동의어라 애초에 결함도 아니었다.
   → 이 표를 조인할 때는 **항상 `seller_type` 으로 다리를 나눠라.** 감지 검사는
   `scripts/inspection/suites/supply-chain.js` R-SC-007 이 그 형태로 박제해 뒀다.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```


---

## ✅ 마감 기대금액 0 갭 — **결함 부존재로 종료** (2026-08-30 실측 재확인, Fable 판정)

**낡은 기록이 오늘 착수 근거가 될 뻔했다.** 세션기록·메모리에 `마감 기대금액 0 갭(미수정)` 으로 남아 있던 항목은
**2026-07-31 결제 원장 일원화로 이미 근본수정된 상태**였다. 착수 전 실측에서 전제가 무너져 구현 없이 종료.

**현재 구조 = 2레그** (`routes/cash-management.js:67` `computeExpected`)
- ① 결제 원장(`OrderPayment`) — `paid_at` 기준, `staffMeal`·취소·삭제 주문 제외
- ② **원장 없는 결제완료 주문 폴백** — `Order` 를 `payment_status='completed'`(⚠ `status` 아님) 로 걸러 `order_date` 합산,
  `id NOT IN (SELECT DISTINCT order_id FROM order_payments)` 로 **이중 계상 차단**

**쓰기는 4경로 일원화됨** (`utils/orderPaymentLedger.js` `recordOrderPayment`, 멱등·비치명):
`orders-crud.js:1109`(POS PATCH·지배 경로) · `orders-payment.js:209`(PayPal) · `:288`(Stripe) · `:437`(분할 직접 create).
⛔ **백필 안 함이 설계** — 옛 주문은 결제 시각이 없어 `paid_at` 을 채우면 날조. 쓰기 시작 + 자연 이관.

**2026-08-30 실측(dev):** 원장 26행/22주문 · 결제완료 836건 · 폴백 커버 **817건** · 분할결제 실존(2결제 1주문, 4결제 1주문) ·
닫힌 마감 1건(reconciled). 최근 결제완료 4건(7/31, rid 5)은 **전부 원장 보유** = 쓰기 실동작 증거.
`computeExpected` 실호출: rid 5 → `{cash:0, card:{}, other:{counter:114, ewallet:230.3}}` — **0 아님**.
rid 38 의 0 은 **정상**(원인 확정 2건): ①결제완료 272건의 `order_date` 최대가 2026-06-02 인데 교대는 06-20 18:54 개시 → 창 안 매출 0
②창 안에 있는 원장 12행은 **전부 `is_deleted=1`** 주문이라 `excludedOrders` 가 정확히 제외.

**미확인:** 운영 DB 조회 classifier 차단으로 **운영에서 원장이 실제로 쌓이는지 못 쟀다.**
폴백 레그 덕에 원장이 안 쌓여도 기대금액은 주문 행으로 계산된다(설계상 안전) → Irene 에게 지금 요청하지 않고,
**다음 배포 후 `/운영검증` 에 "원장 적재 여부 읽기 확인" 1항목을 얹는 것으로 갈음**한다(Fable).
