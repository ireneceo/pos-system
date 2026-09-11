## 현재 작업 상태
**마지막 업데이트:** 2026-09-11 (16:29 UTC 운영 배포 #3 이후 /저장)
**버전:** 변경 없음 (오늘 배포 3회 모두 버전 미상승 — 올릴지 Irene 결정 대기, 아래 «하실 일» 6번)
**운영:** 번들 `main.a3373f8b.js` · SW `5.10-reconcile-honest-read-20260911` · 백업 `/var/www/backups/20260911_162405` · 배포 16:24~16:29 UTC · 스모크 10/10 · 마이그 87/87 · 배포 후 오류 로그 0
**작업 상태:** 완료 — 진행 중 작업 없음. 다음 확정 작업 없음(지시 대기).

---

## 👉 Irene 님이 하실 일 (Claude 가 대신 못 하는 것만 — 급한 순서)

> Claude 는 이 목록을 `/개발시작` 때 **그대로 안내**한다. 하나 끝내면 Claude 에게 «N번 했어»라고만 말하면 된다.

### 1번. 오늘 배포 두 건 운영 화면에서 눌러보기 — 약 10분
**SW 5.09 (발주 «용량 · 포장단위 × 수량»)**
1. 외부 공급업체 상품(예: 김치)에 «포장당 용량 10 · kg · 기준단위(포장) BOX» 저장 → 발주 담기 → Staging 에 «10 kg/BOX · × 3 BOX»
2. 같은 발주 WhatsApp/PDF 에 «(10 kg/BOX) 3 BOX»
3. 공급업체·브랜드 상품 폼에 «기준단위(포장)» 칸이 보이고 저장됨
4. 배포 전에 담은 발주는 예전 표시 그대로(용량 문구 없음)

**SW 5.10 (대조 정직 읽기 + 재고 환산)**
5. 운영 발주 32 대조 화면(purchase-orders/32/reconcile)이 노랑 «자동으로 읽지 못했습니다» · 고르기 목록 없음. 인쇄 인보이스(발주 33 TaiYang)는 초록 그대로
6. 재고 화면 → 재료 카드 → «Register on external supplier» 창에 «재고 환산» 칸 · «10 · kg · BOX» 적으면 «1 BOX = 10 kg» 자동
7. 그 상품으로 발주 3 BOX → 입고 → 재고 +30 kg
- **끝나면 Claude 에게**: «배포 확인했어» (이상하면 번호만)

### 2번. 운영 발주 32 손 수정 — 대조 화면에서 3줄 (손글씨라 자동으로 안 채워짐)
- Fable 이 원본을 눈으로 읽은 값: Chicken Chop L 단가 21.50 → **22.50** · Minced Chicken 단가 17.00 → **17.50** · Halal chicken 수량 2.00 → **2.2 kg**, 단가 12.30 → **13.00** · 머리 번호 **257506** · 날짜 **2026-09-08** · 합계 **RM 121.30**
- **끝나면**: «발주 32 고쳤어»

### 3번. 발주 22 의 인보이스 첨부 — 말로 한마디
- 같은 Guan Kee 인보이스 No 257506(9/8, 121.30)이 **발주 22(8/31)와 발주 32(9/8) 두 곳**에 첨부돼 있다 → 한 인보이스를 두 번 결제할 위험.
- Irene 「인보이스 최근 거 말한거야」 — Claude 는 «No 257506 은 최근 발주 32 것» 인지 «배포는 최근 인보이스 수정 건» 인지 확신하지 못해 **운영 쓰기 보류**.
- 앞의 뜻이면 **«22 첨부 지워»** → Claude 가 운영 발주 22 의 `external_invoice_url/filename/uploaded_at` 3칸만 비움(되돌리기용 값: scratchpad `po22-attachment-backup.json` — 새 세션이면 아래 값 사용).
  - 발주 22 현재값: url `/uploads/attachments/2026-09/1789042465092_670192920b968a37_WhatsApp_Image_2026-09-08_at_12_07_32.jpeg` · filename `WhatsApp Image 2026-09-08 at 12.07.32.jpeg` · uploaded_at `2026-09-10T12:14:25Z` · 미결제 · 대조 전

### 4번. 운영 «piece» 대기 발주 2건 — 담기 화면에서 줄 지우고 다시 담기 (Fable 권고: 운영 DB 안 고침)
- with MIN Cafe(매장 10) · PO-R10-20260909-001(LSH 연유 1줄) · PO-R10-20260911-001(New Seoul Mart 10줄 중 9줄) — 배포 전에 담겨 단위가 piece 로 저장됨.
- 김치는 먼저 상품에 «10 · kg · BOX» 저장 후 다시 담기(1번 확인과 한 번에 끝남). Claude 가 운영 DB 로 고치길 원하면 «고쳐»(김치 제외 9줄).

### 5번. 발주 33 의 단위 확인 — 말로 «맞아/아니야»만
- kg 로 바꿀 것 7개: 방울토마토 · 당근 · 홍청양 · 무 · 대파 · 양파 · 미니적양파 / 새송이 → **팩** · 순두부 → **개** · 팽이 → 그대로
- **끝나면**: «발주 33 단위 그대로 고쳐» (다르면 어느 품목이 무슨 단위인지만)

### 6번. 결정만
- **버전 번호 올릴지**: 오늘 배포 3회, 버전 그대로. 올리면 릴리즈 노트·공지를 만든다. «올려» / «그대로».
- **나라별 날짜 형식 설정을 만들지**: «만들어» / «필요 없어».

### 7번. (급하지 않음 · 안전장치) 운영 DB «읽기만 되는» 계정 — 약 5분
- 운영 조회는 이미 배포 경로(ssh → 운영 백엔드 계정)로 **SELECT 만** 해서 된다. 그 계정은 쓰기 권한이 있어 약속에 기댄다 → 읽기 전용 계정은 **DB 가 실수를 막는 울타리**(Fable 2026-09-11).
- `/var/www/docs/PROD_READONLY_DB_SETUP.md` 순서대로. **끝나면**: «운영 DB 읽기 전용 계정 만들었어»
- 그전까지 규칙: 배포 경로 · SELECT 한 문장씩 · 보고에 «ssh·운영 백엔드 계정으로 읽음» · 쓰기는 Irene 명시 지시가 있을 때만.

### 8번. 운영서버 nginx 설정 폴더의 백업 파일 치우기 — 급하지 않음, 1분
- `ssh irene@87.106.78.146` 후: `sudo mkdir -p /etc/nginx/backups && sudo mv /etc/nginx/sites-enabled/purplehere.com.bak /etc/nginx/backups/ && sudo nginx -t && sudo systemctl reload nginx`
- 성공: `syntax is ok` · `test is successful`. **끝나면**: «nginx 백업 치웠어»

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-09-11 오후, 운영 배포 2회: SW 5.09 · 5.10)
1. **발주 줄 «용량 · 포장단위 × 수량»** — SW 5.09 · 14:19 UTC
   - 원인(Fable): `resolveOrderUnit` 이 supplier 상품을 매장 메뉴 표에서 찾아 'piece' · 판매 상품에 포장단위 칸 없음 · 확정 발주 줄 8표면에 용량 없음 · 외부 공급업체 등록창에 용량 칸 없음
   - 마이그 `scripts/migrate-seller-package-unit.js`(registry deploy): 판매 상품 3표 `package_unit` · 발주 줄 `base_quantity`/`base_unit` 스냅샷 · 규칙 단일소스 서버 `utils/poLineSpec.js` / 화면 `unitConversion.ts`
   - 운영 이행: supplier 184/352 · brand 121/155 · foodcourt 0/0
2. **인보이스 대조 정직 읽기** — SW 5.10 · 16:29 UTC
   - 운영 발주 32 = Guan Kee **손글씨** 양식지 → 무료 OCR 원리적 불가. `InvoiceReconcilePage` `readResult` 세 상태 · `invoiceMatcher.parseInvoiceLine` 상식 검사
   - Fable 게이트 1차 불합격(짝 0 이면 목록 숨김 → 이름만 안 겹치는 인쇄 인보이스도 «못 읽음») → 세 상태로 보정
3. **외부 공급업체 등록 창 «재고 환산» 칸** — SW 5.10 · `RegisterExternalSupplierModal` `unit_conversion: 1` 고정 제거 · `defaultLinkConversion` · 입고 증명 재고 36→66 · 원가 18→12
4. **외부 공급업체 상품 API NaN 무응답 → 404** — SW 5.10 · `routes/supplier-directory.js` `loadOwnedExternalSupplier`
5. **운영 조회·조사**(ssh·운영 백엔드 계정 SELECT + 첨부 scp, 사본 삭제): piece draft 10줄 2건(제출 0) · 인보이스 첨부 5장 중 손글씨 2(같은 종이) → **손글씨 유료 OCR 안 붙임**(Fable)
- 검증 합계: API 실호출(포장단위 12/12 · 재고환산 10/10 · NaN 3/3) · jest 28/28 · 고장주입 A·B·C·D·E2·F 성립(E 는 이중 방어로 불성립 → E2 로 재증명) · verify-all --full 19/19(5.09) · 18/19 ×3(5.10, deploy-ready 만) · 실브라우저 대조 3경우 · Fable 게이트 PASS(마커 f463eda63a99 → a9a5db37d76c)
- 첫 배포 시도 실패: 같은 서버 PlanQ `tsc -b`(3.8GB)와 겹쳐 메모리 게이트 차단 → 운영 무변경 확인 → 끝난 뒤 재시도 성공
- 문서: `docs/TRADE_STRUCTURE.md` §2-2 · `docs/PURCHASE_ORDER_SYSTEM.md` 1352행 뒤 스냅샷 메모 · §2-⑤ 재고 환산 · §8-2 손글씨 한계 · `CHANGELOG.md` #2·#3 · `DEVELOPMENT_PLAN.md` · 배포 기록 `dev-backend/releases/archive/2026-09-11-po-pack-unit.json` · `…-reconcile-honest-read-and-stock-conversion.json`
- 메모리: `reference_fable_gate_fingerprint_scope`(미추적 배포 기록 JSON 도 지문) · `reference_invoice_ocr_browser` 함정 5(손글씨) · `feedback_fable_budget_minimal`(Irene 「fable 좀 그만 써」→「중요하고 복잡한 거에는 불러야지」) · MEMORY.md 요약 2줄

### 다음 확정 작업
- 없음 — 지시 대기 (Irene: 「저장하고 다음 섹션 찾을래」)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **인보이스 번호 중복 첨부 경고** (Fable «후속 후보, 착수 안 함») — 같은 인보이스 번호/파일이 다른 발주에 이미 붙어 있으면 경고. 사례: 운영 발주 22·32 에 Guan Kee No 257506.
- **입고 배치 원가가 포장 단가로 남음** (관찰, 무접촉) — `services/purchaseOrderReceive.js` `receiveIntoIngredient` 가 `inventory_batches.initial_quantity` = 수량×환산(30 kg) · `unit_cost` = 발주 단가(48, BOX 당). 매장 가중평균 원가는 맞음. Fable: 백엔드에서 읽는 곳 없음 — 표시·보고서 사용처 확인 후 정리.
- 외부 공급업체 등록 창: 오류 문구가 값을 고친 뒤에도 다음 저장까지 남음 · 재고 단위 소문자 «l» 은 자동 계산 대신 손입력 요구 (Fable 비차단 관찰).
- 푸드코트 상품 폼·라우트에 포장단위 입력 없음(모델·DB 칸만).
- 옛 `dev-frontend/src/utils/poShare.test.ts` 는 8/31 이전 문구 형식 기대 — 낡은 테스트(게이트 미포함).
- **다매장 오너·BG 두 번째 브랜드 발주 스코프**: `buyerScope` primary 엔티티 한계 → 발주 라우터 403/404. Fable 「착수 금지, 기록만」.
- 0원 청구서 Confirm 은 서버가 Staff 를 막지 않지만 화면에선 가려짐 — 필요하면 그 조건만 플래그 해제(Fable).
- `owner.js` `isExternalIssuer` 행마다 1쿼리 → 배치 조회 정리(결함 아님).
- safety-guard 화이트리스트 부분문자열 매칭 — 인지.
- `/restaurant/:id/suppliers`(옛 SuppliersPage) 403 1건 관찰 — RA 사이드바는 `/pos/suppliers`.
- PlanQ `tsc -b`(4~5GB)와 겹치면 빌드·verify-all 이 막히거나 강제 종료 — 기다렸다가 재시도(우회 금지). 오늘 배포 1회가 여기 걸림.
- 기존 대기(09-10 이전): 메뉴판 프로브 headless-page-sweep 시나리오화 · P1 공급업체·재고 소유 경계 · P2 직접구입 · P3 발주 품목 찾기/추가.

### Git 상태 (저장 시점)
- 브랜치 `deploy-isolation` · 이 저장과 함께 오늘 오후 변경 전부를 커밋한다(직전 커밋 `94e15349e` 09-11 08:45).
- ⚠ 미커밋 상태에서 `git checkout`/`reset --hard` 금지(메모리 feedback_stash_before_deploy_isolation — 영구 소실 2회)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
