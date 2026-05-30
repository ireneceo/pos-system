# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-30 13:45
**작업 상태:** 테이블번호 필수 기능 **DEV 구현+검증 완료**. 다음 세션 = Irene 가 dev 에서 직접 테스트 → 이상없으면 bless + 운영배포.

## ⚡ 빠른 재개
```
session-state.md 읽고 이어서 개발해.
```

---

## ✅ 다음 세션 우선 — 테이블번호 필수 기능 Irene 직접 테스트 (DEV)

**왜:** 픽업 안 받는 매장에 대표/공용 QR 로 들어온 손님이 테이블 없이 dine_in 주문 → "픽업 N" 으로 표시되던 문제. 매장별 설정 ON 시 테이블 강제 입력하게 만듦. **DEV 구현+검증 끝, 운영 미배포.**

**테스트 절차 (dev, 데모매장 사용 — The Fire(16) 은 dev 에 없음):**
1. 설정 위치: **설정 → "Tables & QR" 탭** (`/restaurant/{id}/settings?tab=tablesQr`). 토글 2개:
   - ① **테이블 번호 활성화**(Enable Table Numbers) — 게이트, 먼저 ON
   - ② **테이블 번호 필수**(Table Number Required) — 이걸 ON 해야 작동. ①꺼지면 ②비활성.
2. 데모매장 `demo-korean-bbq`(id 38, Floor Plan 테이블 T001~T003) 에서 ①②  ON.
3. 모바일 **대표/공용 링크**(테이블 QR 아님)로 진입: `https://dev.purplehere.com/mobile/demo-korean-bbq` → **Dine In** → **테이블 선택 모달**(T001~T003 칩) 떠야 정상.
4. 비교: 테이블 QR(`?table=T001&order_type=dine-in`)로 들어가면 모달 없이 바로 메뉴 (이미 테이블 보유).
5. takeaway 전용 QR(`?order_type=takeaway`) → 테이블 안 물음(면제). 테이블 QR 로 들어온 takeaway 는 그 테이블에 표시(유지).

**테스트 OK 후 배포 순서 (둘 다 필요):**
- ① **bless**: `cd /var/www/dev-backend && node scripts/check-print-guard.js --bless` (orders-crud.js TABLE_REQUIRED 가드 지문 — 인쇄 무관, print계약 7/7 통과. **Irene 승인 후에만**. 안 하면 deploy-to-production.sh fail-closed 로 배포 막힘)
- ② 배포 후 **The Fire(16) 설정에서 ①② 토글 ON** (배포만으론 자동적용 X, 기본 OFF)

**구현 파일 (참조):** mobile-public.js(store 응답 tableNumberRequired+floorTables) / orders-crud.js🔒(POST `/` 가드) / mobile-orders.js(가드+table_settings attr) / OrderTypePage.tsx(테이블 picker 모달, #635BFF) / PaymentPage.tsx(테이블목록=Floor Plan, Free Seating 제거, 결제차단, operation→table_settings 소스수정) / common.json 4언어(selectYourTable 등). 설정은 **기존 table_settings.tableNumberRequired 토글 재사용**(신규 X).
**검증:** API 7/7 + 회귀 3/3(OFF매장 무영향) + print 7/7 + i18n 0 + state-hydration 0 + 실브라우저 mount 5/5(신번들 main.1b8e01d1.js).

---

## 🔖 지금 중단 지점 (2026-05-30 오전 라이브 대응)

**이번에 운영에 실제 반영 (DONE, live):**
- 🟢 **통닭 세트 모바일 노출 fix**: 운영 products 453(옛날통닭 세트 71.80) + 607(한국녹차 for SET 6.00) `is_active=false → true` (restaurant 16). 실제 모바일 API(`/api/mobile/menu/the-fire-korean-restaurant`)로 453 노출 확인. **코드 변경 아님, 운영 DB 데이터만.**
  - 근본원인: 브랜드 푸시 상품은 `brandMenuSyncService.js:228`에서 **항상 `is_active:false`로 도착**(매장이 켜야 함). 매장 미활성 + 2026-05-29 모바일 `is_active=true` 필터 추가 조합 → 사라짐. 매장이 끈 게 아님.
- 18개 품절(soldOut) 항목 = **Irene 직접 품절 처리한 것 = 정상.** 건드리지 말 것.

**바로 다음 (다음 세션 우선순위):**
1. ✅ **[DEV 구현완료 / 실매장 검증 대기] 테이블 없는 모바일 주문 차단 — 기존 `table_settings.tableNumberRequired` 토글 연결** (2026-05-30).
   - **근본원인 확정**: "픽업 N" = 테이블 QR 아닌 **대표/공용 슬러그 링크**로 진입 → dine_in·table_number=null. PaymentPage 기본값 "Free Seating" + 백엔드 무검증 통과 조합.
   - **설정**: 새로 안 만듦 — 이미 존재하던 `restaurant.table_settings.tableNumberRequired`(enableTableNumbers 게이트, 헬프텍스트 "Make table number selection mandatory for dine-in orders")를 enforcement에 **연결만**. SettingsPage 토글 그대로.
   - **입력방식**(Irene 결정): 자유타이핑 X → **Floor Plan 테이블 목록에서 선택**(`floor_plan.tables[].label`). 오타→orphan 테이블→Floor Plan 미표시 재발 방지.
   - **구현 파일**: `mobile-public.js`(store 응답에 `tableNumberRequired`+`floorTables` 노출) / `orders-crud.js`🔒(POST `/` mobile+dine_in+무테이블→400 TABLE_REQUIRED) / `mobile-orders.js`(같은 가드 + table_settings attr) / `OrderTypePage.tsx`(dine-in 선택 시 테이블 picker 모달) / `PaymentPage.tsx`(테이블목록=Floor Plan, Free Seating 제거, 미선택 결제차단) / common.json 4언어.
   - **검증**: API 7/7 (400 차단/테이블有 통과/takeaway·POS 면제/2경로) + print계약 7/7 + i18n Errors 0 + 실브라우저 mount(picker 등장·T001 chip·console 0).
   - **⚠️ orders-crud.js🔒 지문 변경** = TABLE_REQUIRED 가드(인쇄 무관, print계약 7/7 통과). **Irene 확인 후 `check-print-guard.js --bless` 필요**. 미배포.
   - **takeaway 정책 확정**: 테이블QR로 들어온 takeaway는 table_number 유지(해당 Floor Plan 테이블에 표시) = 기존 의도(mobile-orders.js:123). 가드는 dine_in만 강제, takeaway 면제.
2. 🔴 **[critical, 미진단확정] 주방 단계 멋대로 바뀜 — Irene "단계 완전 픽스, 절대 마음대로 바뀌면 안 됨".**
   - ① **해물부침개 서빙해도 다시 생김**(서브하면 다시 만들어짐, 기다리는 주문이 같이 표시). ② **잡채 1개 눌렀는데 3개 들어가고, 취소했더니 다시 3개.** "너무 불안정."
   - 가설(미검증, Explore 분석): (a) 모바일 주문 제출 **멱등키 없음** → 네트워크 재시도가 주문/품목 중복 생성. (b) 자동머지(`mergeItemsIntoOrder` orders-crud.js:272 / mobile-orders.js auto-merge)가 **dedup 없이 append** → 같은 품목 중복행. (c) `/orders` 소켓 네임스페이스 **replay 캐시 없음**(checkout-display만 있음) → 재접속 시 KDS 상태 꼬임. (d) 서빙 시 item.status='completed' 되는데 printed_at 없으면 kitchen_items 필터에 다시 잡힘.
   - **다음 세션 먼저 할 일**: 실제 해물부침개/잡채 주문(restaurant 16) order_items 운영 직접 조회(앞서 #12337 깐 방식)로 **DB행 중복인지 렌더 중복인지** 확정 후 수정. 🔒 KDS/billPrint/orders-crud print 부분 보호 — 단계/머지 로직만 신중히.

**맥락 유지:**
- 운영 DB 직접조회 방법: dev-backend에 읽기전용 node script 작성 → `scp` → `ssh irene@87.106.78.146 'cd /var/www/production-backend && node xxx.js; rm xxx.js'`. Order 금액컬럼 = `total_amount`(not total). 픽업타입 주문 0건(order_type=pickup 없음).
- 인쇄 exactly-once 백엔드 계약은 **멀쩡**(health-check print 통과).
- 새 세트는 `is_set_menu=false`로 저장되니 **set_components 존재로 판정**.

**이전 미완(여전히 유효):**
- 세트/옵션 표시 전수 감사(set_components 렌더 전 구간). 애프터밀=옵션으로 처리, after_meal 플래그 제거 대상.
- Steam Rice(593) 썸네일 404 — 이미지 1개 누락, 주문 무관.

---

## 📦 이번 세션 작업 요약 (운영 라이브)
- 모바일 첫화면 빈리스트 fix(featured ON+0개 레이스), 인기메뉴 이름매칭, 카테고리 id|name 매칭, 연회색 대비, 담기 머무름, 카트배지 전페이지
- 세트: 모바일주문+POS주문(모달 리셋 fix=product?.id deps), 옵션표시(OptionModal 느슨매칭), set_components 영수증/주방/분배(stationEnrichment 구성품 station + billPrint bucket), 주방티켓 세트명 작게/구성품 크게, KDS set_components 매핑
- 운영 DB: 세트 8+1 활성화, category 정규화, 22 메뉴 활성화, 세트 재번역(602김밥/601화요일 복구)
- 인쇄: 스테이션 헤더 박스, SW 3.46, mapItem set_components(근본원인)
- 재발방지: **check-print-field-contract.js** 배포게이트 3/3 (set_components 누락 차단)

**커밋:** ef38cb63 (set 구성품 주방/KDS 표시 + POS모달 리셋 + 재번역) / d1ecd848 (세트 인쇄 전구간 + 가드)

---

## 🔑 환경 / 운영
- 운영: irene@87.106.78.146, /var/www/production-backend(3002), /var/www/production-frontend. 매장 The Fire=16, slug=the-fire-korean-restaurant.
- dev DB는 The Fire(16) 없음 → 세트 검증은 운영 직접(읽기) 또는 SSH.
- 운영 최신: 번들 main.ec5b7f86.js, Backup 20260530_101903.

## 📂 주의
- 🔒 인쇄 코드 변경은 Irene 승인+실프린터 확인 후 bless. 이번 세션 다수 bless됨.
- 매장 기기 새 코드 = SW 3.46 자동갱신(새로고침 1회).
