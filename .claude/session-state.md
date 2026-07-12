# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-07-12 19:15, idle 2023s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: ingredients.js,inventory-core.js inventory-extra.js,po-returns.js recipes.js,health-check.js inventoryDeductionService.js,test-brand-stock.js inventory.json,inventory.json inventory.json,inventory.json
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-07-12
**버전:** v3.68 (운영). 오늘 배포 3회는 **버전 미상승**(기능 수정·인프라).
**작업 상태:** 완료 — verify-all **13/13** (mount sweep 8역할 포함). 운영 배포 3회 완료 + **프랜차이즈 맵 좌표분은 dev 미배포**.

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-07-12)

#### 발주 신원 해석 — 운영 배포 (Backup 20260712_073501 / 085448 / 092939)
> Irene "with MIN 카페에서 gitconsulting 브랜드 프로덕트 발주하면 공급업체 이름이 안 뜬다" 한 건에서 근본 6개.
- **🔴 브랜드 발주의 공급업체 이름이 `—`** — 목록 API 가 판매자를 `seller_type='supplier'` 일 때만 조회(brand/foodcourt 는 채우는 코드 자체가 없음). 운영 with MIN 발주 **6건 중 5건이 brand** = 사실상 전부. 라우트마다 **5벌 중복**(목록/상세/제안/승인/PDF)이 뿌리 → **`utils/sellerNames.js` 단일 해석기**로 통일.
- **🔴 발주서 PDF 의 구매자가 항상 공란** — 존재하지 않는 컬럼 `po.buyer_entity_type` 을 읽어 조건이 늘 거짓(실제 `entity_type`). **공급업체가 받는 문서에 주문자·배송지가 없었다.** 브랜드 발주는 판매자도 공란(같은 supplier-only 패턴).
- **수신처 = 회사명 (브랜드명)** (Irene 지적) — 발주를 받는 건 브랜드가 아니라 그 브랜드를 운영하는 회사 → 운영 확인 **"GIT Consulting (with MIN)"**. 회사명 없으면 브랜드명 폴백.
- **PDF 버튼 = 인쇄창 자동실행 → 미리보기** — 문서를 먼저 보여주고 **Download/Print 를 모달 위·아래**(공용 Modal headerActions+footer). Download 는 진짜 .pdf(상세 페이지의 `renderIframeToPdf` 재사용).
- **업체별 개별 제출** (Irene 지적) — 발주·인보이스가 업체별로 따로인데 UI 는 `Submit All` 뿐. 백엔드는 **이미 PO 단위 제출 지원**(시스템=`/submit` 자동발송, 외부=`/mark-sent-external` 수동발송) → 카드마다 버튼(**Submit** / **Mark as Sent**). 카드 하나 제출 → 그 카드만 사라짐.
- **Discard = 공용 danger-outline**(#FEF2F2 파스텔 + #EF4444 라인 — 없는 `ghost` variant 라 회색으로 떨어지고 있었다) · **수량 `× 1.00` → `× 1`**(공용 `formatQuantity`).
- 회귀 박제: health-check `pos` "브랜드 발주도 이름이 내려온다" — supplier 전용으로 되돌리면 **정확히 이 1건만 실패**(19/20) 실증.

#### 🔴🔴 배포 파이프라인 치명 결함 2개 — 규명·수정
1. **마이그레이션이 43개 중 1개만 실행되고 있었다** — `while read` 루프의 **`ssh` 가 stdin(목록 나머지)을 삼킴**. 2026-07-11 임대료 배포의 "마이그 실행 안 됨"의 진짜 원인(7/10 `for`→`while read` 개편 때 유입, **배포 3회 영향**). → `ssh -n` + `scp < /dev/null` + **실행수 대조 fail-closed**. **이번 배포 로그 `43/43 실행 완료` 로 실증**(이전 배포 1/43).
2. **배포는 스키마를 아예 만들지 않는다** — `sync-database.js` 를 **`--alter` 없이** 호출(안전모드). 주석은 "sync 가 적용한다"고 **거짓** → AI 인식 테이블 2개가 운영에 없는 채 방치. → 멱등 마이그(`migrate-ai-recognition-tables.js`) + 레지스트리 등록 + **운영 손대기 전 fail-closed 게이트**(등록된 마이그가 커버하면 통과 — 무조건 차단은 정상 배포도 막는다는 Fable 지적 반영). **dev 151 == 운영 151 일치.**
   - 추가 수정: bash 산술 버그(`grep -c || echo 0` → `0\n0`) · 마이그가 exit 1 로 죽어도 warn 통과하던 판정 → 종료코드 fail-closed.
   - 단일 진실 = 메모리 [[reference_deploy_migration_ssh_stdin]], `DEPLOYMENT.md` 정정 완료.

#### 운영 실검증 (배포 후, 테스트 매장 한정)
주문생성 · **단계이동**(pending→preparing→ready→served) · **결제**(현금 완납 completed) · **인쇄 계약 5/5**(동시 claim 5개 중 **1개만 승리** · printed 후 재인쇄 0 · **+Round 새 품목만**). 검증 주문 전량 삭제·인쇄큐 제거, **POS 가 집어간 것 0건 = 종이 안 나감**.

#### 프랜차이즈 맵 좌표 (dev 검증완료 · **미배포**)
> Irene "브랜드 제너럴 프랜차이즈 맵에 지도가 안 나와". 지도(react-leaflet)는 정상 — **찍을 좌표가 없었다**(운영 22개 중 좌표 **2개**).
- **좌표 백필** `scripts/backfill-restaurant-coords.js`(멱등, 좌표 없는 행만) — 지오코딩이 **생성 시 / 주소 수정 시**에만 돌아 그 전 매장은 영영 null 이었다.
- **🔴 지오코딩이 실패를 삼키던 것** — HTTP 429(rate limit)·5xx 를 "주소 못 찾음"과 똑같이 조용히 null 처리 + 재시도 0 → **연속 지오코딩 시 전멸**(단건은 성공). 매장 생성 시에도 같은 구멍 → **재시도(백오프) + 실패 로깅**. 상세주소가 지도에 없으면 도시/주 단위 **근사 좌표** 폴백(로그에 "근사" 표기).
- **주소 중복 표기 제거** — `address` 컬럼에 이미 도시·주가 있는데 `city`/`state` 를 또 붙여 "…Petaling Jaya, Selangor, Petaling Jaya, Selangor". 공용 `formatAddress` 에서 **콤마 토큰 단위**로 중복만 제거(도로명 `Jalan Kuala Lumpur` 오탐 없음 실증).

### 다음 확정 작업
- **프랜차이즈 맵 좌표분 `/배포`** (Irene 지시 시) → 배포 후 **운영 20개 매장 좌표 백필 실행**(`node scripts/backfill-restaurant-coords.js`) → 지도 표시 확인.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **with MIN 매장 인쇄 1회 테스트** (물리, 사람 필요) — **Fable 판정: backlog 21건은 자가 해소되어 첫 인쇄를 막지 않는다.** 단 ①**KDS 화면에선 dismiss 가 안 돈다 → 테스트는 POS/설정 화면에서** ②과거 autoPrint ON 상태로 꺼진 기기가 있으면 21장 폭주 가능 → **방문 직전** `POST /api/autoprint-diagnostic/clear-stuck-print-flags/10 {"minutesOld":60}` 로 정리하면 리스크 0 (Irene 지시 시 실행).
- **`pending-print` 24시간 신선도 경계** (Fable 정석 설계, 미실행) — 오래된 주문은 어떤 컷오프로도 자동인쇄 대상이 아니므로 정의를 서버 쿼리로 이관(클라이언트 sweep 의존 제거). `orders-crud.js` = **인쇄 보호파일** → Irene 승인 + `--bless` + 실프린터 확인 필수. **매장 종이 확인이 끝난 뒤 별도 배포**(방문에 변수 섞지 말 것).
- PO **목록 페이지**(`PurchaseOrdersPage.tsx:586`)의 PDF 버튼은 아직 자동 인쇄창 — staging 과 UX 통일 필요(Fable 지적).
- 빌(bill) 경로엔 백로그 컷오프가 없다 — needs_bill 누적 매장이 빌 autoPrint 켜면 옛 영수증 폭주 가능(현재 with MIN·K-DINE 모두 needs_bill=0 이라 무해).
- K-DINE IPC 인쇄 대기 **1035건** — 자동인쇄 미사용으로 보임. 켜면 4~5분 공백(윈도우 20건씩 dismiss).
- timezone(242)·design(310) baseline 부채 점진 소거 · E2E 시나리오 확장

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
