## 현재 작업 상태
**마지막 업데이트:** 2026-08-30
**버전:** v3.80 (2026-08-28 배포). **8/30 배포 3회는 버전 미상승 — Irene 지시**
**작업 상태:** 완료 (C/D/A′ 는 dev 완료·미배포 — `/배포` 지시 대기)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **발주 "받았다" 대칭화** (운영 배포) — 목록엔 있고 상세엔 없던 입고 버튼. **운영 발주 전건이 submitted** 라 사실상 아무도 입고를 못 하던 상태였다
- **재고 입고 ↔ 발주 동기화 — RA**(운영 배포) **/ BG**(dev) — 같은 물건을 양쪽에서 처리하면 재고가 두 번 더해지던 구멍
- **발주 상세 모바일 4건** (운영 배포) — 번역 코드 노출·타임라인 2중·버튼 정렬/높이·품목 카드 5줄→3줄
- **🎯 `pending_approval` ENUM 3세션 미스터리 종결** (운영 배포 + 생존 증명) — 원인 = `sprint6` 의 ENUM 목록 하드코딩
- **신규 발주 화면 모바일 붕괴 수정** (dev) — 장바구니 50vh 고정 → 하단 접이식 시트
- **운영 전수검사 계측기 재작성** — 측정 25/25 · **측정 불가 0**
- **운영 정리 스크립트 작성·Fable 검토 통과** (`cleanup-ugs-duplicate-products.js`) — 운영 /tmp 배치·sha256 일치, 실행 대기
- 문서: `CLAUDE.md`(expand-only) · `SCHEMA-MIGRATION-GUIDE.md` · `PURCHASE_ORDER_SYSTEM.md` · CHANGELOG · 메모리 2건

### 다음 확정 작업
- **B. 판매 주문(B2B) 매출·원가 리포트** — Fable 설계 완료. **착수 조건 = Irene 의 정리 `--apply` 증명 4종 접수 후**
- **미배포분 3건(C·D·A′) 운영 반영** — `/배포` 지시가 있을 때만

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **fetchDedupe signal 설계** — 참조계수 방식(모든 호출자가 abort 했을 때만 실요청 abort), 호출부 6곳.
  ⚠ **페이지 파기 중의 `Failed to fetch` 는 브라우저 고유 동작이라 완전 제거 불가** — 0 으로 만들려고 헛수사하지 말 것
- 브랜드 재고 이원화 구조 — 공급업체 링크는 `product_ingredient_id` 축, 브랜드 링크는 `ingredient_id` 축이라 재료 id 만으로 원가에 못 닿는다 ([[project_brand_stock_two_lists_split]])
- 공급업체 없는 재고 12건 연결 (Irene 이 매입처를 알려주면 진행) / 판매가 0인 프로덕트 채우기
- 발주 메일 다국어 / 계정 없는 사람에게 발주 알림 / 구매자 확인메일 품목표 / draft 담은 날짜 표시
- 판매자 라인 단위 품절 처리 (⛔ `discrepancy_*` 재사용 금지)
- 알림 수신자 조회가 `is_active` 미필터 / `getBrandManagerIds` 다중 브랜드 누락 가능
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

**D. site-settings 콘솔 노이즈 — ⚠ 부분 해결 (완료 아님)**
- `AbortController` + `signal.aborted` 판별(⛔ 메시지 문자열 매칭 금지 — 같은 문자열이 진짜 장애에서도 난다).
- **잔존**: `utils/fetchDedupe.ts` 가 동일 GET 을 요청 1개로 합쳐, 호출부 6곳 중 다른 곳이 먼저 쏘면 signal 이 안 붙는다
  (실측: 요청 결말 200 인데 `hasSignal: false`). 백로그는 위 "후속 후보" 참조.

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

## 📌 스키마 함정 (다음 세션 대비)

1. `purchase_order_items` 에 `seller_product_id` **없다**. `ingredient_seller_product_id`(링크 id)를 문다 —
   발주 라인은 상품이 아니라 **연결**을 참조한다.
2. **`brand_product_brands` 는 소유 표가 아니라 배포 공유 표**(운영 전체 61행, brand_id=1 은 28행).
   **브랜드 상품의 소유·판매 범위 판정은 `ingredient_seller_products` 링크 기준으로 해야 한다.**
   이걸로 조인했다가 가격 목록이 `0건` 으로 나왔고, 앞선 실측과 모순돼 계측기를 의심해 잡았다.
3. `ProductIngredient` 에 **`brand_id` 없다** — 소유는 `owner_user_id`.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
