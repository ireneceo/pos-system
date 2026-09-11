## 현재 작업 상태
**마지막 업데이트:** 2026-09-11
**버전:** 변경 없음 (이번 배포에서 버전 미상승 — 버전은 /배포 시 Irene 확인으로만)
**운영:** 번들 `main.6c4d69c1.js` · SW `5.08-payment-single-hand-recipe-cost-20260911` · 백업 `/var/www/backups/20260911_080634` · 배포 08:06~08:11 UTC
**작업 상태:** 완료 (운영 배포 + 운영 검증 + /개발완료)

---

## 👉 Irene 님이 하실 일 (Claude 가 대신 못 하는 것만 — 급한 순서)

> Claude 는 이 목록을 `/개발시작` 때 **그대로 안내**한다. 하나 끝내면 Claude 에게 «N번 했어»라고만 말하면 된다.

### 1번. 운영 DB «읽기만 되는» 계정 만들기 — 약 5분, 한 번만
- **왜**: 지금 Claude 가 운영 데이터를 못 봐서, 배포 후 «운영 데이터에 문제 없는지»를 숫자로 확인 못 하고 «확인 불가»로 보고하고 있다. 이 계정은 **읽기만** 되고 수정·삭제는 DB 가 막는다.
- **어떻게**: 안내서 **`/var/www/docs/PROD_READONLY_DB_SETUP.md`** 를 열어 순서대로 붙여넣기. 명령마다 «무엇이 나오면 성공»이 적혀 있다.
  - 1단계: 운영서버 접속 → 세 줄 붙여넣기 → 확인 두 줄(숫자가 나오고, 두 번째는 `UPDATE command denied` 가 나오면 성공)
  - 2단계: 내 컴퓨터 Claude 설정 파일에 몇 줄 추가(어려우면 건너뛰고 «2단계에서 막혔어»라고 말하기)
- **끝나면 Claude 에게**: «운영 DB 읽기 전용 계정 만들었어»
- **그다음 Claude 가 할 일**: 읽기·쓰기 거부 증명 → 9/11 배포에서 «확인 불가»였던 운영 데이터 3건 확인
  (매장에서 꺼진 채 남은 공급업체 계약 수 · 인보이스는 결제됨인데 발주는 미결제 건수 · 매장 재료에 남은 원가 행)
- Fable 권고: **실행하세요.**

### 2번. 발주 33 의 단위 확인 — 말로 «맞아/아니야»만
- **왜**: 인보이스와 맞춰 보니 발주 33 의 품목 단위가 «전부 kg»이 아니었다. 운영 데이터라 확인 없이 못 고친다.
- **Claude 가 고칠 내용**
  - kg 로 바꿀 것 7개: 방울토마토 · 당근 · 홍청양 · 무 · 대파 · 양파 · 미니적양파
  - 새송이 → **팩** · 순두부 → **개** · 팽이 → 이미 맞음(그대로)
- **끝나면 Claude 에게**: «발주 33 단위 그대로 고쳐» (다르면 어느 품목이 무슨 단위인지만)

### 3번. 운영서버 웹서버 설정 폴더의 백업 파일 1개 치우기 — 급하지 않음, 1분
- **왜**: 운영서버 `/etc/nginx/sites-enabled/` 안에 옛 백업 `purplehere.com.bak`(2026-01-31)이 들어 있다. 이 폴더의 파일은 전부 «실제 설정»으로 읽혀서, 언젠가 설정이 꼬일 수 있다. (2026-09-11 확인 — 개발서버에는 없음)
- **어떻게**: 터미널에서 운영서버 접속(`ssh irene@87.106.78.146`) 후 한 줄 붙여넣기 — `sudo` 비밀번호가 필요해서 Claude 가 못 한다.
  ```bash
  sudo mkdir -p /etc/nginx/backups && sudo mv /etc/nginx/sites-enabled/purplehere.com.bak /etc/nginx/backups/ && sudo nginx -t && sudo systemctl reload nginx
  ```
  - 하는 일: 백업 보관 폴더를 만들고 → 백업 파일을 그리로 옮기고 → 설정 검사 → 웹서버에 새로 읽히기
  - 성공: `syntax is ok` · `test is successful` 가 나오고 오류 없이 끝남. 오류가 나면 **그대로 복사해 Claude 에게** 붙여 주기(사이트는 검사 실패 시 새로 읽히지 않으니 멈추지 않는다)
- **끝나면 Claude 에게**: «nginx 백업 치웠어»

### 4번. 결정만 해 주시면 되는 것
- **나라별 날짜 형식 설정을 만들지**: 언어·시간대처럼 매장 설정에 «날짜 표기(예: 11/09/2026 vs 2026-09-11)»를 둘지. 지금은 없다. «만들어» / «필요 없어» 중 하나.

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **§8-3 결제 한 손**: 인보이스 «결제함»(`mark-paid-external`)과 발주 Pay 가 같은 `recordPayment` · 두 번째 결제 409 · 드로어 이중 출금 차단
- **§8-3 금액·날짜**: 대조 총액 차이 > RM 1 저장 차단 / 이내 «Rounding adjustment» · 거래 청구서 기간 = 발주일→수령일(마이그 멱등)
- **§8-4 매장 원가 칸**(D-1~D-5): `services/storeCost.js` 단일소스 · 구매자 주도 전파 자기 행만 · 매장 소유 재료는 재료 행이 원가 칸
- **레시피 CSV 순서·표기 · 레시피가 쓰는 재료/상품 삭제 409**
- **공지 «모두 읽음»** 전 역할(매장·오너·브랜드·푸드코트)
- **§G 공급업체 켜기/끄기**: 구매자 자기 계약 행 우선 · 브랜드가 넣어준 외부 공급업체도 매장에서만 끄기
- **§8-5 브랜드·푸드코트·오너 외부 인보이스 결제**: 공용 `ExternalInvoicePayAction` → 청구서 문 `mark-paid-external`(E-2′ — 발주 문은 다매장 오너 403 · 2번째 브랜드 404) · `attachPurchaseOrders` 4목록(오너 All 탭 포함)
- **백로그 3**: `parent_soa_invoice_id` · 인박스 공지 범위 단일소스 · 일괄 원가 PUT 소유 확인
- **Staff 결제 버튼 가림**(Irene 「Staff 결제 403 도 같이 고쳐. 문제 없게 하고 배포 해.」) — 서버 기준 그대로, 권한 변경 없음
- **운영 DB 읽기 전용 래퍼** `scripts/prod-query.js` + safety-guard ask 규칙 (계정은 Irene 실행 대기)
- 검증: health 247/247 · cash 16/16 · supplier 3/3 · inventory 37/37 · pos 52/52 · 고장주입 15건 · verify-all 표준 17/18(deploy-ready→해소) · mount sweep 672.4s 크래시 0 · 실브라우저 RA·BG·Owner·Staff·공급업체
- Fable 게이트 PASS 3회: `058d5f5d5cbd`(§8-3·§8-4·공지·D-5) → `12b82a2137cf`(§G·§8-5·백로그·DB 래퍼) → `5709cfad7b83`(Staff 가림·기록·CHANGELOG)
- 운영 배포: 마이그 86/86 · 헬스 · 스모크 10/10 · 배포 기록 적재
- 운영 검증: 번들·SW 5.08 서빙 · `/api/health` ok · 재시작 후 오류 로그 0 · 데모 계정 조회만(RA 목록 새 필드 14/14 · 공급업체 `is_active_for_me` 3/3 · RA/BG/FG `/invoices/to-pay` 200 + 연결 발주 필드 · Owner 두 목록 200(데모 오너 청구서 0건이라 필드 확인 불가) · BG 외부 공급업체 0건이라 켜짐 표시 확인 불가)
- 문서: `PURCHASE_ORDER_SYSTEM.md` §8-3·§8-4·§8-5(E-2′) · `SUPPLIER_CONTRACT_SYSTEM.md` §G · `TRADE_STRUCTURE.md` §2-3(Fable) / `INVOICE_SYSTEM.md` · `ROLES_AND_PERMISSIONS.md` · `RECIPE_MANAGEMENT_SYSTEM.md` · `INVENTORY_MANAGEMENT_SYSTEM.md` · `RESTAURANT_OWNER_PLAN.md`(개발완료)
- 메모리: `feedback_respond_in_korean`(신규) · `feedback_fault_injection_is_mandatory`(pm2 재시작 필수) · `reference_external_vs_registered_supplier`(청구서 문) · MEMORY.md 215→약 90줄 정리

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **운영검증 미완 3건(확인 불가)** → 위 «Irene 님이 하실 일 1번» 끝나면 `node dev-backend/scripts/prod-query.js` 로 확인(안내서 `docs/PROD_READONLY_DB_SETUP.md`).
- **다매장 오너·BG 두 번째 브랜드 발주 스코프**: `buyerScope` primary 엔티티 한계 → 발주 라우터 403/404(청구서 결제는 E-2′ 로 우회). 매장 접근판정 통합과 묶어 별도 설계 — Fable 「착수 금지, 기록만」.
- 0원 청구서 Confirm(`PATCH /invoices/:id/status`)은 서버가 Staff 를 막지 않지만 화면에선 Staff 에게 가려짐 — Staff 도 0원 확인이 필요하다고 하면 그 조건만 플래그 해제(Fable).
- `owner.js` `isExternalIssuer` 행마다 1쿼리 → 배치 조회 정리(결함 아님).
- safety-guard 화이트리스트가 부분문자열 매칭(`prod-query.js` 포함 복합 명령은 ask 건너뜀) — 인지.
- `/restaurant/:id/suppliers`(옛 SuppliersPage)에서 403 1건 관찰 — RA 사이드바는 `/pos/suppliers` 사용.
- 06:54 UTC dev 서버 pm2 전체 + mysqld 재시작 — 원인 확인 불가(다른 창 추정, sudo·로그 권한 없음).
- PlanQ `tsc -b`(4~5GB)와 겹치면 verify-all --full 백그라운드가 메모리 부족으로 강제 종료 — 표준 모드 + `--only mount` 분할 실행이 대안.
- 기존 대기(09-10 이전): 메뉴판 프로브 headless-page-sweep 시나리오화 · P1 공급업체·재고 소유 경계 · P2 직접구입 · P3 발주 품목 찾기/추가. (발주 33 단위 · nginx 백업 · 날짜 형식은 위 «Irene 님이 하실 일» 2~4번으로 옮김)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
