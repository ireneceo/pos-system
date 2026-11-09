# Fable 판정 — 꺼진 메뉴(is_active=false) POS 주문 화면 숨김 (gate · 2026-11-09)

**판정: PASS** (개발서버 기준 · 운영 반영은 다음 배포 때)

## 범위 대조 (diff 직접 확인)
- 바뀐 파일 2개뿐: `dev-frontend/src/contexts/MenuContext.tsx` (+2) · `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` (+8 −2). 설계(BRAND_MENU_SYSTEM §14.2 «POS/모바일 노출 = brand_scope_active AND is_active») 밖 변경 0.
- POSTerminalPage 훅 3곳: 1340(카테고리 탭 숨김 조건) · 1920(`!item.isInactive` → `slice()`) · 1929–1931(`is_active !== false` 필터). `isInactive` 는 코드 어디서도 채워지지 않던 칸 — 제거가 맞음(grep 0건).
- 🔒 인쇄 블록(2540–2625 · 2855–2930, `printOrderKitchenNow` 2611/2920) 무접촉. 인쇄·주방 스테이션 조회가 쓰는 `menuItems.find`(2079 · 2133 · 2487 · 2734)는 **걸러지지 않은 컨텍스트 원본**을 그대로 읽음 → 장바구니에 이미 든 품목·세트 구성품·kitchen_station_id 해석은 영향 없음. 인쇄 동작 변경 0.
- MenuContext: 전체 로드(224)·카테고리별 로드(449) 두 변환 모두 `is_active` 매핑. 단건 수정 경로(640–)는 `...updatedItem` 스프레드라 관리 화면의 활성 토글(`MenuManagementPage.tsx:1348` 이 `is_active` 를 넣음)이 그대로 보존됨 — 같은 세션에서 토글 뒤 POS 로 가도 일관.
- 백엔드 무변경: `/api/menu` 는 이미 `is_active` 를 내려줌(`routes/menu.js:356`). 모바일은 이미 서버에서 `is_active: true` 로 거름(`mobile-public.js:265·477·661·752`) → 이번 변경으로 POS·모바일 기준이 같아짐.

## 실측 증거 (팀원 자료를 직접 열어 확인)
- 빌드 산출물에 변경이 실제로 들어감: `main.ac837d79.js` 에 `set_only:!0===e.set_only,is_active:!1!==e.is_active` 2곳 · POS 청크 `1764.9c948f96.chunk.js` 에 `filter(e=>!e.set_only),e=e.filter(e=>!1!==e.is_active)`. 번들 00:17:40 → POS 스크린샷 00:17:57/00:18:25 (새 번들로 찍힘, Playwright 새 컨텍스트라 캐시 없음).
- 스크린샷 대조: `pos-꺼짐.png` = 검색 «0 items» · ZzOffCat 탭 없음 / `pos-켜짐.png` = «1 items» · ZzOffCat 탭 나타남. 반증(켜면 보임) 성립.
- 시험 스크립트(`browser-check.js`)는 데모 매장 38·브랜드 17 임시 메뉴만 쓰고 finally 에서 정리(남은 행 0) — 실매장 무접촉.
- 게이트: health-check 단독 474/475(실패 1 = print-guard 뿐) · health pos 69/69 · mount sweep 통과 · design-guard 신규 0. verify-all 때 health 1회 실패는 dev MySQL 연결 천장(알려진 현상)이고 재실행으로 가려짐 — 통과로 봄.
- check-sensitive-diff: 이 일은 ①보호영역 1건(POSTerminalPage)만 해당. ②돈 4건·③마이그 2건은 다른 방(인보이스·구독) 변경 — 이 판정 범위 밖.

## 판단 2건
1. **print-guard `--bless` 는 해도 된다 (실프린터 종이 확인 없이).** 근거: 인쇄 경로의 바이트가 하나도 안 바뀌었고(위 범위 대조), 가드는 «실수 접촉» 감지용 파일 지문이며, Irene 가 «권고대로 진행» 으로 승인함. 종이 확인은 인쇄 동작이 바뀔 때의 의무이지 표시 필터 변경엔 해당 없음. 빌드·sweep 이 끝난 지금 상태에서 bless 할 것(그 뒤 이 파일을 또 고치면 다시 뜸).
2. **fable-gate `pass` 마커는 내가 찍지 않는다.** 마커 지문은 워킹트리 전체(`git diff HEAD` + 미추적)라, 지금 찍으면 다른 방의 돈·마이그 변경(invoices-crud/list · invoiceScheduler · subscriptionInvoiceService · migrate-company-logo · migrate-subscription-item-type-repair)까지 «Fable 통과» 로 보이게 된다 — 그 변경은 내가 보지 않았다. 이 일의 2개 파일을 **먼저 따로 커밋**하면 이 일 몫은 마커 없이도 끝난다(지문은 미커밋분만 봄). 다른 방 변경은 그 방의 판정에서 찍는다.

## 남는 것 (막는 것 아님)
- 운영에 꺼진 메뉴(brand_scope_active=1·is_active=0)가 6매장 21개 — 배포 뒤 그 매장 POS 에서 사라진다. 매장이 «품절 대신 끔» 으로 써 왔다면 POS 직원이 당황할 수 있으니 **릴리즈 노트에 한 줄**(«꺼진 메뉴는 이제 POS 에도 안 보임 · 다시 팔려면 메뉴 관리에서 켜기»). 운영 판매 여부는 읽기 권한이 없어 확인 못 함 — 추측하지 않음.
- 마이그 0 · SW 올릴지는 /개발완료 때 다른 프론트 변경과 함께 1회.
