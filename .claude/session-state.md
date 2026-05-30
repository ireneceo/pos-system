# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-30 12:00
**작업 상태:** 중단 (Irene 이동) — 매장 The Fire(16) 라이브 대응 중. 아래 1·2 다음 세션 이어서.

## ⚡ 빠른 재개
```
session-state.md 읽고 이어서 개발해.
```

---

## 🔖 지금 중단 지점 (2026-05-30 오전 라이브 대응)

**이번에 운영에 실제 반영 (DONE, live):**
- 🟢 **통닭 세트 모바일 노출 fix**: 운영 products 453(옛날통닭 세트 71.80) + 607(한국녹차 for SET 6.00) `is_active=false → true` (restaurant 16). 실제 모바일 API(`/api/mobile/menu/the-fire-korean-restaurant`)로 453 노출 확인. **코드 변경 아님, 운영 DB 데이터만.**
  - 근본원인: 브랜드 푸시 상품은 `brandMenuSyncService.js:228`에서 **항상 `is_active:false`로 도착**(매장이 켜야 함). 매장 미활성 + 2026-05-29 모바일 `is_active=true` 필터 추가 조합 → 사라짐. 매장이 끈 게 아님.
- 18개 품절(soldOut) 항목 = **Irene 직접 품절 처리한 것 = 정상.** 건드리지 말 것.

**바로 다음 (다음 세션 우선순위):**
1. 🟠 **[설계완료/구현 대기] 테이블 없는 모바일 주문 차단 — 매장별 설정 토글.** ("획업025" 정체 = order #12337/260530-025, 실제 dine_in·mobile·**table_number=null**·Guest·counter. 테이블 QR 아닌 **공용 슬러그 메뉴 링크**로 주문 → 테이블 없어 "픽업 N"(수령번호 라벨)로 표시 + 주방 티켓만 인쇄됨. "픽업"은 주문종류 아니라 수령번호.) Irene 결정: **무조건 차단 X, 매장별 설정 ON 시 차단** ("가게마다 다르다"). 설계:
   - 설정 키: `operation_settings.orderTypes.requireTable` (bool, default false). dine_in + 테이블없음일 때만 차단(포장/픽업 영향 X).
   - **백엔드 가드**: `routes/mobile-orders.js` ~line 150 (otGuard 다음)에 `if (requireTable && actualOrderType==='dine_in' && !actualTableNumber) return 400 {code:'TABLE_REQUIRED'}`.
   - **모바일 통과**: `routes/mobile-public.js:343-348` 응답에 `mobile_settings.mobileOrderRequireTable = operation_settings.orderTypes?.requireTable ?? false` 추가.
   - **설정 UI**: `pages/Settings/SettingsPage.tsx:4681` (delivery 토글 다음) AutoSaveField 토글 추가 + ref(`mobileOrderRequireTableRef` ~line637) + i18n 4언어 `settings:settingsPage.mobileOrderRequireTable(+Hint)`.
   - **모바일 체크아웃**: `mobile/pages/PaymentPage.tsx` `handlePayment()` ~line1216, dine-in인데 `selectedTable` 없으면 차단 + "테이블 QR 스캔" 안내 + 400 TABLE_REQUIRED 처리. 테이블은 `sessionStorage.getItem('tableNumber')`(QR) → selectedTable.
   - **저장 API**: `routes/store.js` PUT /store/settings 가 operation_settings JSON 통째 저장(line177) → 마이그 불필요.
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
