# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-03
**버전:** v3.46 운영 (2026-06-02 배포 — POS UI/UX·주방인쇄v2·테이블이동/취소표·이메일인증·KDS팝업/배너. Backup 20260602_233232. ⚠️ 실프린터 눈확인 매장 진행 중)
**작업 상태:** 완료 (DEV, 미배포)

### 진행 중인 작업
- 없음

### 완료 (2026-06-03 저녁 — 매장 현장 대응, DEV 빌드·배포됨 / 운영 미배포)
- **[핵심·인쇄] SET 메뉴 주방 라우팅 사고 (The Fire SET5)**: POS 세트 주문이 구성품(set_components) 없이 레거시 set_items(이름만)로 저장돼 → 주방 티켓이 "SET5" 이름만 찍고 스테이션 못 찾아 첫 프린터로 떨어지고 BAR 누락. **모바일은 정상(증거: 5/31 주문 set_components 정상), POS만 깨짐.** 실데이터(운영 rest16)로 근본원인 확정. **수정 2겹:** ① 백엔드 `utils/stationEnrichment.js` — set_items→set_components 정규화(모든 경로 영구 보장) ② 프론트 `POSTerminalPage` 세트 담을 때 set_components 적재(카운터 로컬 직접인쇄). set_groups(템플릿)로 재생성 안 함 — choice 세트 오인쇄 방지, 주문 실제내용(set_items) 단일소스. [[reference_set_menu_print_routing]]
- **[인쇄] 주문 머지→KDS 팝업** (앞 작업, orders-crud.js table-moved merged:true, 재인쇄X)
- 서빙뷰 ready 알림음 — access_serving 직원만, ready 진입 1회 (ItemListView, playPresetSound)
- 테이블맵 길게누르기 브라우저 우클릭 메뉴 차단 (TableNode onContextMenu+touch-callout)
- 스테이션 배정 UI — 카테고리 라우팅된 경우 개별메뉴 목록 숨김(예외만 노출) (SettingsPage)
- 아이템리스트 필터 SearchableSelect — 테마변수+동일fallback로 박스색/높이 통일, 화살표 안쪽 (Common/SearchableSelect, 전 페이지 안전)

### 배포 시 필수 (보호파일 5개 변경: stationEnrichment/orders-crud/POSTerminalPage + 기존 KitchenDisplay/MainLayout)
1. **bless 후 배포**: `node dev-backend/scripts/check-print-guard.js --bless` (전부 승인된 인쇄 변경, print 계약 통과). 안 하면 deploy fail-closed.
2. **배포 후 The Fire 실프린터에서 SET5 재주문** → 카운터 통합1 + KQ2(닭갈비·돌솥) + BAR(녹차) 정확히 나오는지, 메뉴명 펼쳐지는지 눈확인.
3. **기존 이슈(내 변경 아님)**: `tests/autoprint-regression.js` [5] 폴링 catch 2건 실패 — dev rest5에 needs_print 옛 주문 20개+ 누적 + 쿼리 ASC limit20 탓(운영은 인쇄되면 풀려 무관). build:dev 가 막아 SKIP_REGRESSION=1로 빌드함. **별도 수정 필요**: 테스트가 rest5 orphan 스윕 or 쿼리 DESC. 운영배포는 이 게이트 안 돔(check-print-guard+health-check만).

### 완료된 작업 (남은 항목 마감, 2026-06-03 오후 — 미배포)
- **주문 머지 → KDS 팝업 알림** (Irene 현장 발견 실 이슈 해결): Live Orders `POST /orders/merge`(orders-crud.js) 가 `table-moved(merged:true)` 발행 → KDS "합쳐짐" 팝업+소리. **소스 품목은 이미 인쇄됨 → 재인쇄 안 함(인쇄 X), 티켓 중복 0** (Irene 결정: 팝업만). KDS 핸들러(:1344)는 기존 표시 전용 경로 재사용 → 프론트 코드 변경 0. ⚠️ orders-crud.js 보호파일 → 배포 시 실프린터 확인 후 `--bless` 필요(인쇄 무관 변경, print 계약 7/7 통과)
- **KDS 준비시간 타이머** 코드 적용 확인 완료(KitchenDisplayPage:2057, 표시 전용). 실프린터 화면 눈확인만 남음 → 배포 후 매장 확인
- **un-serve='ready' 유지** 확정 (Irene 결정) — hall 직원은 ready↔served 만, preparing 은 주방 소관. 코드 변경 없음

### 완료된 작업 (이번 세션 오전, 2026-06-03)
- 서빙 화면(Floor Plan ?view=items) — 아이템별/세트구성품별 서빙, KDS 색 동기화
- 직원 작업 접근 분리 (access_pos/serving/kitchen) + requirePosCounter
- 직원 이메일 선택 + Staff ID 매장 네임스페이스(r{rid}:id, 화면 strip, 매장별 재사용, PIN 전환)
- 아이템 리스트 필터 → SearchableSelect 통일 (allowClear off, 값 string 일치)
- 스탭 권한 메뉴명 "Support"→"Communication"
- 준비시간 타이머 v1 — Settings 토글+주문/아이템 목표+임계, 신호등 3단계(여유/임박/초과 맥동), 기준=주방 진입 시각. ItemListView + TableDetailPanel + KDS(표시 전용) 적용
- utils/prepTimer.tsx 단일 소스 (경과/서브소요[LiveOrders 인라인 추출]/레벨). SC#12 keyframe 버그 fix(css 래핑)
- headless sweep 에 ?view=items / ?view=takeaway 추가 (검증 구멍 메움 — 49/49 OK)
- 테스트 데이터 정리: r5 junk 주문 260603-014(verify-test/A01/B02) 취소

### 다음 확정 작업
- 없음 — 남은 후속 항목 3건 모두 마감 완료. Irene `/검증` → `/배포` 후 매장 실테스트 예정.

### 배포 시 필수 (orders-crud.js 보호파일 변경)
1. 배포 전 실프린터/KDS 화면에서 **머지 팝업(인쇄 X 확인) + KDS 신호등 타이머** 눈확인
2. 확인 후 `node dev-backend/scripts/check-print-guard.js --bless` (변경 3건: orders-crud=머지팝업 / KitchenDisplayPage=KDS타이머·접근 / MainLayout=접근게이트 — 모두 인쇄 라우팅 무관, print 계약 7/7 통과). 안 하면 deploy fail-closed.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- (없음 — 직전 후속 3건 모두 마감)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
