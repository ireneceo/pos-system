# Purple POS — 개발 세션 상태

## 현재 작업 상태 — 2026-06-30 #1 (오프라인 모드 등 운영 배포 완료 + thefire01 주문정리)
**마지막 업데이트:** 2026-06-30 #1
**버전:** v3.65 운영 배포 (SW **4.46-offline-mode-20260630**)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- v3.65 운영 배포(SW 4.46): 오프라인 모드 1~6단계+degrade · IOI Mall 매출 API · POS 헤더 반응형/한글화 · 모달·팝업·TableDetailPanel 테마 · 카테고리 인라인펼침 · 모바일 QR 테이블 리셋 등 누적 dev분 일괄
- 신규 마이그 `20260629_create_processed_ops.js` 작성·배포목록 등록(오프라인 멱등 가드) + sales_integrations 등록
- thefire01(rid16) 인쇄테스트 주문 38건 소프트삭제(전체백업 보관)

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- 오프라인 주문 '편집' 액션 배선(add/cancel/move/pay/stage on offline order — 백엔드 opId가드 준비완료, 패널 읽기전용)
- IOI Mall 운영 URL/자격증명 수령 후 environment=production 전환 + go-live ([[project_ioi_mall_sales_api]])
- POS 메뉴 개선 백로그 13건(`docs/POS_MENU_IMPROVEMENT_BACKLOG.md`)

---

### ✅ (상세) 운영 배포 완료 — SW **4.46-offline-mode-20260630** (2026-06-30 ~01:10 UTC / 09:10 KL)
> 직전 배포 02:52 KL(4.45) 이후 누적분 일괄 배포. 스모크 9/9, 백엔드 헬스 정상, 백업 `/var/www/backups/20260630_010745`.
- **올라간 것:** 오프라인 모드(1~6단계: OfflineContext/배너·SW network-first·IndexedDB op로그·로컬기록·SyncEngine·로컬 주방인쇄·degrade 메인POS잠금) + IOI Mall 매출 API + POS 헤더 반응형/한글화 + 모달·팝업·TableDetailPanel 테마(`--pos-*`) + 카테고리 인라인펼침 + 모바일 QR 테이블 리셋 + 옵션 솔드아웃 + 현금관리 PIN 등 누적 dev분.
- **신규 마이그 3종 운영 적용:** `20260628_add_option_sold_out` / `20260629_create_sales_integrations`(IOI) / **`20260629_create_processed_ops`(오프라인 멱등 가드 — 신규 작성, sync-database가 --alter 없이 테이블 생성 안 해서 전용 마이그 필요했음)**. 운영 테이블 생성 확인.
- **인쇄 안전:** dev의 하이브리드/빌/폴러 인쇄 코드 = 4.45 잠긴 버전과 **동일(무변경)** — print-guard가 hybridKitchenPrint/billPrint/useAutoPrintPoller 무변경 확인. 유일 인쇄 delta=MainLayout `_printPollFn` capped 하트비트(이미 배포된 useAutoPrintPoller 하트비트 미러). bless 후 배포.
- **배포 메커니즘 메모:** deploy 스크립트 스키마 diff·최종 확인은 `read -p` 대화형 → 백그라운드 stdin이 ssh에 먹혀 멈춤. **`--auto` 플래그로 프롬프트 통과**해야 완주.

### ✅ thefire01(rid16) 최근 2-3일 주문 정리 (2026-06-30, Irene 지시)
> 인쇄 라이브테스트 주문 38건 소프트삭제(앱 표준 DELETE = is_deleted=true, 자식 보존). 활성 236→198. 전체백업 `/var/www/backups/thefire01-orders-backup-20260630.json`. 되돌리기=백업 id에 is_deleted=false.

---

## (이전) 작업 상태 — 2026-06-29 #5 (IOI Mall API + POS 헤더, dev 검증·미배포 → 위에서 배포됨)

### ✅ IOI Mall 매출 API 연동 — 구현 완료(dev, 검증, 미배포) — [[project_ioi_mall_sales_api]]
> 계약·결정 전부 확정된 상태에서 구현. 운영 자격증명만 외부 대기(staging 동작 확인).
- **백엔드 신규:** `models/RestaurantSalesIntegration.js`(restaurant_sales_integrations 테이블, password AES암호화) + `models/index.js`(require/assoc/export) + `scripts/20260629_create_sales_integrations.js`(멱등 마이그, **배포 목록 등록 필요**, dev 실행완료) + `services/mallSalesService.js`(시간별 집계 24레코드+토큰캐시+전송) + `services/mallSalesScheduler.js`(매일 18:00 UTC=02:00 MYT, 최근7일 upsert, SchedulerRun) + `routes/sales-integrations.js`(CRUD+test+send-now+preview, RA/SysAdmin, password 마스킹) + server.js(라우터+스케줄러).
- **집계 규칙:** gto=total_amount−tax(할인후·SST전·SC포함, cancelled/voided 제외) / gst=Σtax / discount=Σ(discount+coupon+policy+point) / 결제버킷=OrderPayment 우선·없으면 주문레벨(cash/tng=TnG전용/visa/master/amex/voucher/othersamount catch-all) / noofpax=Σ테이블 좌석수(floor_plan tables.seats) / batchid=YYYYMMDD. 매장 tz(MYT) 시간버킷.
- **프론트 신규:** `pages/Settings/MallSalesIntegrationSettings.tsx`(자체 폼, 공용 Button, 토글=styled.div) + SettingsPage 탭 'salesReporting' + MainLayout 사이드바 1줄(`?tab=salesReporting`) + i18n(common nav.salesReporting + settings mallSales 28키 ×4언어).
- **검증:** API 실동작 **23/23 PASS**(CRUD·익명401·Staff403·타매장403·password 암호화/마스킹/미전송보존·preview 24레코드 전필드 string·실데이터 집계 rid38 2026-06-02 **219건 gto 11109.06**·연결테스트가 staging 실엔드포인트 도달 invalid_grant). build green·i18n0·design신규0·health106/107(=의도 print-guard).
- **잔여:** 운영 URL/자격증명 수령 후 environment=production 전환. 배포 시 마이그 스크립트 배포목록 등록.

### ✅ POS 터미널 상단 헤더 — 반응형 + 한글화 (dev, 측정검증, 미배포) — Irene 직접 지시
> "버튼 반응형 정돈 안 됨" + "한글 어디가고 영어" = 같은 헤더. POSTerminalPage 보호파일 **인쇄 라인 0-diff 증명**.
- **#1 한글화:** ← Dashboard/Customer Display/Open Drawer/POS Terminal 이 **하드코딩 영어**였음 → i18n 키(pos.json terminal.* 7키 ×4언어). 한글 서빙 확인(대시보드/고객 화면/금전함 열기/POS 단말).
- **#2 반응형:** Playwright 실측 → **1024·1180에서 119px(액션 2줄)** 문제. 수정=DateTime min-width:200 제거+날짜 숨김(≤1280 시각만)·Customer Display 아이콘만(≤1280, 147→54px)·HeaderInfo gap 8·StaffInfo 컴팩트. **재측정: 전 폭(1024~1536) 80px 한 줄, overflow 0.**
- print-guard: POSTerminalPage 지문 변경(레이아웃만, print/QZ/RawBT/claim 0-diff). MainLayout 1줄(nav, _printPollFn 무변경). **bless 안 함**, 실프린터 배치 때 일괄.

### ✅ #3 FloorPlan·POS 팝업/모달 테마 (dev, 검증, 미배포) — Irene 지시
> 증상: 고대비/다크일 때 팝업이 테마 안 따라가 "따로 놀아", 다크 흐릿. **근본=`--pos-*` 변수가 `[data-pos-theme]` 컨테이너에만 → body-portal 모달은 범위 밖**(표준 Modal=body portal+하드코딩 white). [[reference_pos_display_theme]] "모달 미완" 해소.
- **수정:** ①신규 `usePosThemeOnBody(mode)` 훅(posDisplayTheme.ts) — POSTerminal/FloorPlan 마운트 동안 `document.body`에도 data-pos-theme 부여(언마운트 복원) → body-portal 모달이 `--pos-*` 상속 ②표준 `UI/Modal.tsx`+`ConfirmModal.tsx` 하드코딩색(white/#C7CED6/#0A2540/#4B5563/입력 bg·color)→`var(--pos-*, 기존색)`. **비-POS 페이지=body 속성 없음→fallback=기존색→무영향**(backward-compat).
- **결정(Irene "다크도 고대비?" 답):** 팝업이 테마 따라감. **고대비=흰면+검정글씨+굵은테두리(또렷)**, **다크=또렷한 다크면(#1F2A40)+밝은글씨(#EAF0F8)+테두리(가독성)**. 라이트=기존 그대로.
- **검증:** body-portal 요소 var 해석 실측 — light(white/#0A2540/#C7CED6=기존) / contrast(white/**검정**/**강한테두리**) / dark(**#1F2A40/밝은글씨**). POS·FloorPlan 다크 마운트 crash0·err0. print-guard=POSTerminalPage(훅 1줄, print 0-diff)·MainLayout만(의도). design신규0.
- **제품모달도 테마 완료(Irene 추가지시):** `Common/Modal.tsx`(옵션 라디오/체크박스/수량/합계/제품정보)·`POSTerminal/POSSetModal.tsx`(세트선택, AddBtn 흰글씨 유지)·`OptionModal.tsx`(옵션가 muted)·FloorPlan `TableDetailPanel` ConfirmOverlay 전부 `var(--pos-*)` 변환. **검증(컨테이너 스코프 실측):** contrast=흰bg/검정글씨/강한테두리·선택=강한보라 / dark=#2C3A56 elevated/밝은글씨·선택=밝은보라. 이 4파일은 비보호. design신규0·build green.
- **TableDetailPanel 사이드패널도 테마 완료(Irene 추가지시):** 루트 Panel 은 이미 themed(prior)였고, 잔여 **인라인 스타일 구조색**(color/background/border #0A2540·#4B5563·#6B7280·#6B7C93·#635BFF·#fff·#F9FAFB·#F1F4F8·#F6F8FB·#C7CED6·#E6EBF1)을 `var(--pos-*)` 변환. **의미색(빨강/초록/앰버/파랑 상태배지)·흰글씨(컬러버튼 위)는 보존**(text-on-tint 위험조합 0 사전확인). 검증: FloorPlan dark/contrast mount err0 + 패널 var세트 실측(dark=#1F2A40/밝은글씨, contrast=흰/검정/강한테두리). 비보호 파일. build green·design신규0.

### ✅ POS 카테고리 펼침 상태 기억 (dev, 미배포) — Irene 지시
> "펼침 해놨으면 재진입·선택 후에도 직접 바꾸기 전까지 유지." catExpanded 를 localStorage `pos_cat_expanded`(기기별)로 영속 — useState 초기값=storage 읽기, `toggleCatExpanded`(▾/▴)가 저장, **카테고리 선택 시 auto-collapse 제거**(setCatExpanded(false) 2곳 삭제). POSTerminalPage 보호파일, print 0-diff 증명. 검증: localStorage 영속(ls="1") + 번들 포함 확인. (POS 실렌더는 헤드리스 auth-race 로 미캡처, 코드·영속 검증으로 충분.)

### IOI Mall 보고(담당자) — "다했다" 아님, 운영 자격증명 요청
> 발송문 = `docs/IOI_MALL_API_inquiry.txt`(준비됨): staging 연동 완료+가정(batchid/결제버킷/gto/주기) 공유 + **운영 URL·자격증명·go-live 절차 요청**. 받으면 environment=production 전환+배포.

### 🚀 배포 대기 묶음 (이번 세션 #5, 전부 dev·미배포)
> IOI Mall API + POS 헤더 + 모달 테마. **프론트 변경=레이아웃/테마/i18n(인쇄 무관)**. 보호파일 POSTerminalPage(헤더+테마훅, print 0-diff)·MainLayout(nav 1줄) — **bless 안 함, 실프린터 배치 때 일괄**(인쇄 변경 아니므로 독립 배포도 가능). 백엔드 마이그 `20260629_create_sales_integrations.js` 배포목록 등록 필요. SW bump 필요.

---

## (이전) 작업 상태 — 2026-06-29 #3
**마지막 업데이트:** 2026-06-29 #3 (thefire01 라이브 인쇄 종일 대응 — **자동인쇄 전부 해결·운영 배포 완료**)
**버전:** SW **4.45 운영 배포**(통합티켓 통합수정 완료). Irene 확인 "자동인쇄 해결됐어".

### ✅ 자동인쇄 종결 (2026-06-29 #3) — 통합수정 완료, 모든 매장 적용
> 신규/추가/이동/취소/머지/아이템취소 **전부 통합 1장 + 스테이션 회차별**, 중복·누락·늦음 0. **매장 분기 없음**(주문데이터/설정 기준)=모든 매장 동일. 실프린터 확인됨 → print-guard **--bless 완료**.
- **단일 진실 문서:** `docs/PRINT_RULES_MATRIX.md §8.8`(통합티켓 4규칙). **히스토리·진단절차:** `docs/PRINT_DEBUG_HISTORY_2026-06-29.md`. 메모리 [[reference_consolidated_ticket_unified_2026_06_29]].
- **최종 수정(SW4.40→4.45):** ①세 폴러경로 하트비트(재무장 중복0) ②통합 회차당 1장(bi===0만) ③**통합 early-stamp 제거→발송직전 ATOMIC claim**(orphan 근본수정) ④추가주문 통합내용=kitchenItemsRaw(추가품목 전체).
**마지막 업데이트:** 2026-06-29 #3 (thefire01 라이브 인쇄 종일 대응 — **자동인쇄 전부 해결·운영 배포 완료**)
**버전:** SW **4.45 운영 배포**(통합티켓 통합수정 완료). Irene 확인 "자동인쇄 해결됐어".

### ✅ 자동인쇄 종결 (2026-06-29 #3) — 통합수정 완료, 모든 매장 적용
> 신규/추가/이동/취소/머지/아이템취소 **전부 통합 1장 + 스테이션 회차별**, 중복·누락·늦음 0. **매장 분기 없음**(주문데이터/설정 기준)=모든 매장 동일. 실프린터 확인됨 → print-guard **--bless 완료**.
- **단일 진실 문서:** `docs/PRINT_RULES_MATRIX.md §8.8`(통합티켓 4규칙). **히스토리·진단절차:** `docs/PRINT_DEBUG_HISTORY_2026-06-29.md`. 메모리 [[reference_consolidated_ticket_unified_2026_06_29]].
- **최종 수정(SW4.40→4.45):** ①세 폴러경로 하트비트(재무장 중복0) ②통합 회차당 1장(bi===0만) ③**통합 early-stamp 제거→발송직전 ATOMIC claim**(orphan 근본수정) ④추가주문 통합내용=kitchenItemsRaw(추가품목 전체).
- **잔여(선택):** 진단 print-trace 로그(orders-crud/consolidated-print/billPrint)는 **다음 인쇄진단 도구로 보존 권장**(제거하려면 별도). 
- **다음 섹션 대기:** (a) 모바일 QR 테이블 리셋 [[project_mobile_qr_table_reset]] — 진행 예정. (b) ✅ **POS 카테고리 네비게이션 = "포스 메뉴 탭" 정체였음** — 아래 완료.

### ✅ POS 카테고리 재구성 — 인라인 완전펼침(2차 정정, Irene) (2026-06-29 #4, dev 검증·미배포)
> 1차(페이지번호+▦팝업 오버레이) → Irene "팝업 아니라 제대로 완전 펼쳐지는 기능 / 페이지번호 없애, 이상해". **2차 정정**: 페이지번호·팝업 전부 제거. 기본=한 줄(스와이프+‹ ›), `▾` 토글=그 자리에서 전체를 여러 줄 wrap 으로 **인라인 완전 펼침**(메뉴 밀어냄, `▴`로 접음), 카테고리 선택 시 자동 접힘. createPortal/CatSheet/페이지번호 styled 전부 삭제. CategoryTabs `$expanded` prop. 검증 Playwright **8/8**(페이지번호0·인라인토글·팝업아님(dialog0)·1→2줄 펼침·접기·게스트제거·메모패딩). i18n collapseCategories 4언어.

### ✅ POS 메모 박스 여백 + 게스트 셀렉터 제거 (2026-06-29 #4, dev 검증·미배포, Irene)
- **메모 여백**: 주문메모 박스가 ScrollableOrderContent(좌우패딩0)에서 패널 끝에 들러붙던 것 → `padding:0 16px`(OrderSummary/DiscountSection 정렬) + 상하 마진. 아이템 Add note 버튼도 상하 마진 추가. (검증 paddingLeft=16px)
- **게스트수 수동 셀렉터 제거**: "우리 솔루션에 불필요, API 때문에 안 만든다"(Irene). 예약 체크인 자동 prefill·payload guest_count 경로는 유지(자동만). **IOI Mall noofpax = 전송 시점에 테이블 좌석수로 산출**(POS에 plumbing 안 만듦) → [[project_ioi_mall_sales_api]] 구현 시 반영.

### (1차, 정정됨 ↓) POS 카테고리 네비게이션 재구성 (2026-06-29 #4)
> 6/28 dev 에 들어간 페이지네이션(한 줄 + ‹ › + 평문 "2/3")을 세계 수준으로 재구성. Irene 추가요청 = **카테고리 풀로 보기 + 페이지번호 클릭**. ("(b) 포스 메뉴 탭 — 기록 없음" 으로 빠졌던 그 항목 = 이것.)
- **파일:** `POSTerminalPage.tsx`(보호파일, **레이아웃/카테고리 UI만 — 인쇄 라인 0-diff 증명**) + `public/locales/{en,ko,zh,ms}/pos.json`(terminal.allCategories 1키).
- **구현 3가지:** ①이산 페이지네이션(칩 offsetLeft 측정→칩 잘림0, scrollLeft 추정 폐기) ②클릭 가능 페이지번호 `① ②`(active 브랜드 틴트, 탭→스냅 스크롤; 마지막페이지 maxScroll 클램프 대응=최근접 시작점 판정) ③`▦ 전체` 오버레이(createPortal body, 카테고리 바 아래 드롭다운, wrap 그리드, 선택/바깥클릭 닫힘 — 메뉴 안 가림. 예전 inline 펼치기 가림 문제 해결).
- **검증:** Playwright 실브라우저 **6/6**(POS mount crash0·err0 / 페이지번호 클릭 active / ▦ 오버레이 open·select·click-outside close, 스크린샷 확인) · build green 신규경고0 · 인쇄코드 0줄(diff print/QZ/RawBT/claim 0) · design-guard 신규0 · i18n 4언어.
- **별건 수정:** build:dev 인쇄 회귀 3건 실패 = 무관한 **rid5 테스트 데이터 오염**(E2E 잔재 카테고리 8개 station26 매핑→"Uncategorized→null" 불변식 깸) 정리 → 회귀 44/44 복원(dev DB, 운영무관).
- **print-guard:** POSTerminalPage 지문 변경 떠있음(의도, 레이아웃만) — **bless 안 함**, 실프린터 확인 배치 때 일괄(6/28 미검증 핫픽스 묶임 주의).
- **잔여:** 실프린터 확인 불요(인쇄 무관 UI). 운영 배포는 /배포 + 기존 대기분(인쇄 4.45 등)과 함께 SW bump.

### ✅ 모바일 QR 테이블 리셋 (2026-06-29 #4, dev 검증·미배포) — [[project_mobile_qr_table_reset]]
- 신규 `mobile/utils/tableSession.ts`: `getActiveTable`(sessionStorage.qrScanTable → localStorage.tableNumber) / `setActiveTable`(둘 다 기록) / `clearActiveTable`. **per-tab 스캔 권위**(다른 탭이 못 덮음) + 영속 폴백(탭 eviction 복구, 기존 [[reference_mobile_order_session_storage]] 보존).
- OrderTypePage QR effect: `?table=`이 캐시와 다르면 `clearCart()` + 새 값 고정(**스캔=절대 리셋**). 3개 write 사이트 + Payment/Menu/MobileLayout read 를 helper 로 일관.
- 검증 Playwright **6/6**(스캔 핀·mount clean·차등스캔 카트리셋·재핀·크로스탭 clobber 방어 T2·동일테이블 false-reset 없음) + hydration0·신규경고0·보호파일 무접촉·design0.

### ✅ POS 전체주문 메모 = 아이템 메모처럼 팝업+온스크린 키보드 (2026-06-29 #4, dev 검증·미배포) — Irene 지시
- **질문 답(검증완료): 아이템 메모(special_instructions)+전체주문 메모(notes) 둘 다 오더티켓에 들어감.** billPrint RawBT: 아이템마다 굵게 `** <메모>`(2139), 주문메모 `** SPECIAL NOTES **` 블록(2164). HTML pixel 경로도 동일(special 1587 / notesHtml 1699·2474). **API 왕복 PASS**(item special_instructions + order notes persist, demo rid38 order 6299 생성→조회→삭제).
- 구현: 기존 아이템 메모 모달(UIModal+textarea+OnScreenKeyboard+saveMemoModal)을 **order mode 겸용**으로 일반화(`memoModalOrder`). 인라인 입력 폐지→버튼/저장값 탭 시 동일 팝업, order chips=프리셋+이전리마크. 미사용 `showRemarkBox`/`remarkFocused` 정리. notes payload(2572/2821) 무변경.
- POSTerminalPage 보호파일 — **인쇄 라인 0-diff 증명**(diff에 print/QZ/billPrint 키워드 0). 검증 Playwright **5/5**(아이템담기→Add order note→팝업 textarea+제목+키보드26키→저장 표시→탭 재오픈 prefill) + mount clean·hydration0·신규경고0·design0·i18n Errors0·health106/107(=의도 print-guard).
- **print-guard:** POSTerminalPage 누적 변경(카테고리 nav + 메모 팝업, 둘 다 레이아웃·인쇄0줄) — **bless 안 함**, 실프린터 확인 배치 때 일괄(6/28 미검증 핫픽스 묶임 주의).

### (종결됨 ↓ 이전 #3 전반 기록 — 참고용)
**(과거)**

### ▶▶ thefire01 인쇄 라이브 대응 (2026-06-29 #3) — 종일 세션, 요청·상태 전부 ↓
> 매장 thefire01(rid16) 라이브 인쇄 종일 디버그. Irene 매장에서 직접 테스트하며 진행. **인쇄=생명선, 추측 금지.** 핵심 메모리 [[reference_print_heartbeat_dup_fix]] [[reference_v364_no_clean_commit]].

**Irene 요청사항 + 상태 (이 섹션 = 다음 세션 최우선 핸드오프):**
1. **주방 인쇄 중복(BAR 2장·KQ +1)** → 근본=느린인쇄 vs 10초 재무장. **capped 하트비트(4초갱신,cap)+원자성 행잠금 스탬프** → **운영 배포완료(SW4.37)**. POS1·노트북·모바일 정상 1장 확인. (cap은 90초로 늘림=dev)
2. **통합티켓 "POS1 먼저"(다이렉트 빨리)** → 시도했으나 **재발행(이동/취소) 통합 깨짐 → 되돌림(6/27 단일 sendUnifiedTickets 유지)**. POS1-먼저는 **금지**(메모리에 박음). 통합 순서는 스테이션 먼저→통합 그대로.
3. **통합티켓 = 전체주문 한 장 + 상황별 취소줄** (이동/머지/아이템취소/주문취소 — 안내·스테이션 라운드별 **무변경**, 품목만 전체) → **dev 구현·검증완료(SW4.38), 미배포.** billPrint sendUnifiedTickets `fullOrderItems` + 하이브리드/폴러가 재발행시만 구성(이동/머지=줄없음, 주문취소=전체줄, 아이템취소=취소품목만 줄, type별 _voided). **실프린터 종이 확인 필요.**
4. **추가주문 신규처럼 빠르게/안정** → 하트비트 cap 40→**90초**(느린인쇄 끝까지 커버, 재시도폭주0). QZ keepalive 코드 정상 → **느림 상당부분 BAR 프린터 flaky 하드웨어**(첫라운드 BAR 5초 vs 추가 BAR 32초). dev, 미배포.
5. **옛 미인쇄 큐 정리** → 운영 DB **적용완료**(6/25 11건 needs_print=false, oldest-20 윈도우 막힘 해소).
6. **자동 업데이트 안 됨(기기가 새 코드 안 받음)** → 서버 nginx no-cache·Cloudflare BYPASS·index.tsx 60초 reg.update+controllerchange reload **다 정상**인데 기기가 옛 번들 오래 붙듦. **결국 적용됨**(heartbeat 로그로 확인). 캐시 지우라 금지(Irene: 판매 못함). **후속 후보=포커스시 즉시 update**. + 진단용 [print-trace] heartbeat 로그 orders-crud에 임시 추가(운영 배포됨, 나중 제거).
7. **모바일 테이블번호 A-4→A22** → 원인=**다중 탭 공유 localStorage('tableNumber') 덮어쓰기**(OrderTypePage). **미수정**(별도, sessionStorage는 탭종료 휘발이라 안됨→QR URL 기준 고정 필요). 메모리 [[reference_mobile_order_session_storage]].
8. **KDS 미인쇄 개별표시 복원 + 재인쇄/자동트리거** → Irene "**중요하지 않아, 인쇄 먼저**" → **보류**. (팝업은 현재가 좋음 유지. 개별 주문/아이템뷰 미인쇄 배지만 빠짐.)

**배포 상태:** 운영=SW4.37(1·5 + 6진단로그). **dev 미배포=SW4.38(3·4)** — /검증 통과(hydration0·timezone0·build green·health106/107=의도가드·mount전페이지클린). **인쇄 내용변경이라 실프린터 확인 후 print-guard --bless.**
**배포완료(15:53):** SW4.38 운영 라이브(통합 전체주문+취소줄, 하트비트90초). 라이브 사이트 serving 확인(Cloudflare BYPASS, fullOrderItems 번들).

### ★★★ 2026-06-29 #3 후반 진행 — 인쇄 라이브 (mobile 해결, 마지막 구멍=MainLayout 하트비트)
- **상태(Irene 확인):** 신규·취소·POS1 이동 정상 / **모바일 신규+추가 해결됨** / SW 4.39 운영(통합 fullOrderItems + 하트비트90초 + 진단 print-debug 로그).
- **★ 남은 마지막 구멍 = 신규주문 간헐 2장 중복:** 인쇄 폴러가 **2개**(`useAutoPrintPoller`(풀스크린) + `MainLayout._printPollFn`(앱셸, MainLayout.tsx:1224, print-claim 1368/printKitchenTicketViaRawBT 1375)). 하트비트를 **앞 1개에만** 넣고 **MainLayout 폴러엔 안 넣음** → 그 폴러가 인쇄 시 하트비트0 → 느린BAR중 재무장→2장(order 14806 실증: claim~16:27:10, heartbeat0, re-arm 16:27:20, BAR 16:27:21+16:27:24 중복). **수정=MainLayout._printPollFn 의 `if(_claimed)` 블록에 useAutoPrintPoller 와 동일 capped 하트비트(setInterval 4s, cap 90s, print-heartbeat) 추가.** Irene 승인 대기.
- **Irene 하이브리드 규칙(확정):** 프린터 연결된 POS(POS1 등) = 다이렉트로 자기 프린터에 **1번씩** / 다른 기기 = 클라우드(POS1 폴러 경유). 중복=ONCE 위반, 통합누락=POS1 다이렉트가 통합도 찍어야.
- **진단 로그(임시, 운영 4.39):** orders-crud `/print-debug` 엔드포인트 + billPrint sendUnifiedTickets 통합발송 ok/printer 보고 + heartbeat affected 로그. **다 제거 대상**(원인 다 잡은 뒤). CLIENT 로그로 "통합=POS-80C ok=true items=N" 확인됨(통합 발송 자체는 성공).
- print-guard 변경누적(billPrint/poller/orders-crud/KitchenDisplay) — 실프린터 확인 후 일괄 --bless.

### (참고, 일부 해소됨) +Round 초기 진단
> **제 4.38 변경과 무관함 검증완료**: add-items(orders-crud 455-467)는 needs_print+consolidated_printed_at=null만 set, **pending_reprint 없음** → fullOrderItems(재발행 전용) 안 걸림. +Round 통합은 종전 "추가분만" 로직 그대로. 즉 아래는 **별개/기존 문제**.
- **POS1 +Round → 통합오더티켓 안나옴**: 서버는 consolidated claim 함(예 order 14803 A-8, grp1=Kiwi 추가, consolidated_printed_at=15:55:16 set, BAR station-printed 15:55:16)인데 **종이 미전달**(claim만, 물리인쇄 실패 추정 = 통합 claim-without-paper / 또는 다중창 옛코드).
- **모바일 +Round → 아무 오더티켓도 안나옴**: POS1 폴러가 모바일 추가분을 인쇄 안 함(픽업/처리 문제 추정).
- **추정 원인 후보**: ①통합 claim 성공인데 QZ 물리인쇄 실패(POS-80C 미도달) ②POS1 다중 창 중 일부 옛코드 폴러 ③모바일 +Round 가 pending-print/폴러 경로에서 빠짐. **추측 금지 — print-trace + consolidated-print claim 로그 + 실기기 버전(heartbeat 로그)로 실측 후 고칠 것.**
- **주의: 신규주문은 잘 됨(POS1/노트북/모바일 1장 정상). +Round만 문제. 신규 안 깨게 +Round 경로만.**

**그 다음:** Table A-2 통합 전체주문/취소줄 실프린터 확인→bless / 7(모바일 테이블번호) / 6(자동update 포커스시 즉시 보강) / 진단 heartbeat 로그 제거.

### (이전) 진행 중인 작업
- 오프라인 모드(POS1 허브) 1~6단계 + degrade dev완료·미배포. 별건 KDS per-item 되돌리기/프린트 미확정. (인쇄 라이브대응에 묻힘 — 위 섹션 우선)

### 진행 중인 작업
- 없음 (오프라인 degrade까지 dev 완료·검증·미배포). **Irene 이동 중 — 매장에서 직접 배포 예정.**

### ▶ 다음 확정 작업 (A) — IOI Mall 매출 API 연동 **구현** (계약·결정 확정, 다음 섹션 착수)
- **맥락**: thefire01 @ IOI Mall Damansara 입점. 몰 POS지원(Tangent/Synthesis)이 시간별 매출 전송 요청. 메모리 [[project_ioi_mall_sales_api]] / 계약·결정 `docs/MALL_SALES_API_INTEGRATION.md` / 발송문 `docs/IOI_MALL_API_inquiry.txt`.
- ✅ **계약 전체 역해독 + staging 전송 성공**(PDF 이미지라 실호출 해독). OAuth2 password grant → POST /SalesHourly `{sales:[{sale:{18필드 전부 string}}×24]}`, date=YYYYMMDD·hour"00~23" 24개 필수·gstregistered Y/N. **HTTP200 "24 created".** 우리 데이터 전필드 생성 가능(card_type=visa/master/amex 1:1, guest_count=noofpax).
- ✅ **모든 매핑/규칙 결정·검증 완료(질문 블로커 없음)**: gto=할인후·SST전·서비스차지포함·void/refund차감 순매출 / gst=SST금액 / batchid=일일 마감(Z-report)번호(숫자≤12) / 음수허용(staging 실측 수락) / othersamount=catch-all / voucher=기본0 / 타임존=매장 MYT / 매일 24레코드 upsert+최근7일 재전송. **유일 외부의존=운영 URL/자격증명(별도 발송 대기).**
- ⬜ **구현(다음 섹션, `/기능설계`)**: 신규 `restaurant_sales_integrations` 모델(restaurant_id·provider·mall_name·environment·token/sales url·user_id·password_enc[암호화]·machine_id·cadence·enabled·last_run/status·batch_seq) + 설정 UI(settingsGuard) + **시간별 집계**(gto=Σ(subtotal−discount+service_charge)−void/refund, 세금제외 / gst=Σtax / 결제버킷 / receiptcount / noofpax=Σguest_count) + **전송 스케줄러**([[reference_scheduler_run]] 패턴·매일 마감후+7일 재전송·토큰캐시·재시도). provider 필드로 타 입점몰 재사용. staging 자격증명으로 검증→몰 확인→운영 전환.

### ▶ 다음 확정 작업 (B) — 오프라인 7단계(데모 전사이클) + 6단계 실프린터 확인
- 설계서: **`docs/OFFLINE_MODE_DESIGN.md`** / 메모리 [[project_offline_mode]] (진행상황·결정·재사용맵 전부 있음).
- ✅ 1단계 OfflineContext(/api/health 핑·히스테리시스)+OfflineBanner+App 전역래핑 — 검증완료(배너 실동작 헤드리스 실증).
- ✅ 2단계 sw.js network-first+오프라인 cache-fallback(셸·메뉴캐시, SW_VERSION 4.35) — 검증완료(오프라인 재로드 셸 렌더 실증).
- ✅ **3단계 완료(dev, 미배포)**: IndexedDB LocalStore + append-only op 로그. 신규 `utils/offlineDb.ts`(저수준 IDB 래퍼: 스토어 offline_orders/offline_ops/offline_meta, 트랜잭션·genId·deleteOfflineDb) + `utils/offlineStore.ts`(LocalOrder/OfflineOp 타입 + 원자적 seq발급·createLocalOrderWithOp·appendOp·getUnsyncedOps·markOpSynced·patchOrder·markOrderSynced·pendingOpCount·absorbLegacyQueue). OrderContext에 `initOfflineStore()` 워밍 1줄(데이터 계층만; legacy 흡수/재생은 5단계까지 미호출=유실창 방지). dev 호스트네임 게이트 `window.__offlineStore` seam(운영 apex/www 미노출). **검증: Playwright 실브라우저 IndexedDB 31/31 PASS**(원자적 생성·단조 seq·op순서·markSynced제외·서버매핑·legacy흡수 one-time·**리로드 영속성=정전 재부팅**). build green(신규경고0)·print-guard 8/8(보호파일 무접촉)·health 107/107·POS mount crash0.
- ✅ **4단계 핵심 완료(dev)**: operation-recording 레이어 + create 배선. `utils/offlineOps.ts`(recordOfflineCreate·recordOfflineOp·listOfflineOrders·**printOfflineKitchenTicket**). create=OrderContext 오프라인 catch(보호 POSTerminalPage 무접촉). **18/18 PASS.**
  - ✅ 화면 반영(가시화): **OfflineBanner 에 로컬 보관 주문 건수**("오프라인 — 주문 N건 로컬 보관…", unsyncedOrderCount 폴링, 복구 시 "N건 전송 중…"). 어디서나 보임. i18n offlineBannerHeld/offlineReconnectingHeld 4언어.
  - ✅ **서버 opId 멱등 가드(§8) 완성**: 신규 모델 `ProcessedOp`(processed_ops 테이블, ProcessedOp.sync()로 생성·--alter 안 씀) + `utils/opIdGuard.js`(alreadyProcessed/recordProcessed). **비멱등 op만 가드**: add_items(orders-crud)·pay(orders-payment) — 진입부 early-return + 성공 시 기록. set_stage/move_table/cancel_order(DELETE)/cancel_item(전체배열 set)은 **본질 멱등이라 가드 불요**. **핵심 안전: op_id 는 SyncEngine 재생만 보냄 → 온라인 일반요청엔 없어 동작 100% 동일.** **API 실증: 같은 op_id 재전송→1회만 적용(add_items count·payment count 멱등), op_id 없는 온라인→정상.** SYNC_NONCREATE_ENABLED=true 활성화.
  - ✅ **화면 반영 완료(읽기전용)**: 신규 `components/Offline/OfflineOrdersPanel.tsx` — 미동기화 오프라인 주문을 LiveOrders 상단 **격리 패널**(자체 렌더·DbOrder 매핑 없음 → 라이브목록 크래시 위험 0)로 표시(OFF-번호·테이블·품목수·합계·held/sending). 동기화되면 자동 사라짐. i18n 5키. **실증 2/2(LiveOrders mount crash0 + 패널 렌더).** + 부수 발견·수정: LiveOrders 통계 `total_amount.toString()` null 미가드(잠재버그) → `parseFloat()||0` 방어(오프라인 동기화/이상데이터 크래시 방지).
  - ✅ **degrade(메인POS 전용 + 보조기기 전체잠금) 완료(dev, 2026-06-29 — Irene 직접 지시·확정)**: 인쇄 라우팅 0줄 변경(기존 검증된 emergencyMode 재사용), 보호파일 8개 전부 무접촉.
    - **메인POS 지정** = 기기(브라우저)단위 localStorage(신규 `utils/offlineMainPos.ts`: isOfflineMainPos/setOfflineMainPos/useOfflineMainPos). 설정 ▸ 프린터에 "오프라인 메인 POS(이 기기)" 토글 카드(emergencyMode 카드 위, 평이한 말). 1대만 켬.
    - **보조기기 전체잠금** = 신규 `components/Offline/OfflineLockOverlay.tsx`(App 전역 마운트). 오프라인 AND 비메인이면 전체화면 잠금 안내("주문은 메인 POS에서"). **안전 탈출구**: "이 기기를 메인 POS로" 버튼(미지정 매장 lockout 방지 — 카운터에서 즉시 승격→해제→허브). (버그수정: 오버레이 onClickCapture stopPropagation 이 내부버튼 클릭 막던 것 제거.)
    - **메인POS 안내** = OfflineBanner 메인POS 변형("이 기기가 모든 주문·인쇄 처리, 다른기기 잠김, 주방프린터 실패 시 비상모드 켜기"). = "프린트 메인으로 모두 쏘기" 안내 + 이머전시 버튼 연결(Irene 지시).
    - **OrderContext 게이트**: 오프라인 create 로컬기록·로컬인쇄는 isOfflineMainPos()에서만(보조기기 고아데이터·중복인쇄 방지).
    - i18n 4언어(common offlineBannerMain/MainHeld/offlineLock* 7키 + settings printer.offlineMainPos.* 9키). **검증 8/8**(Playwright: settings/pos/live-orders mount crash0 + 보조오프라인=잠금 + 자가승격=해제 + 메인오프라인=무잠금+배너안내 + 설정카드 렌더·토글). build green(신규경고0)·print-guard 제작업 신규0(기존 2건=KDS/orders-crud 무관)·design신규0·i18n 0.
  - ⬜ 4단계 잔여(비핵심·다음): **오프라인 주문 '편집' 액션 배선** — add/cancel/move/pay/stage 핸들러가 오프라인 주문(localId)에 recordOfflineOp 분기(백엔드 opId 가드 준비완료, 패널은 현재 읽기전용) / FloorPlan 반영. **핵심(신규 접수→로컬인쇄→동기화) 무영향.**
- ✅ **5단계 SyncEngine 완료(dev)**: 신규 `utils/offlineSync.ts` — 복구 시 op로그 seq순 재생. create=idempotency_key(서버 기존 멱등), serverId/번호 매핑, 단일락, 401→재로그인 이벤트, 4xx 스킵·5xx/네트워크 STOP(순서보존). 비-create 전송은 서버 opId가드 전까지 게이트(SYNC_NONCREATE_ENABLED=false, 현재 비-create op 미기록이라 무해). OrderContext init + OfflineContext 복구 트리거. absorbLegacyQueue 흡수. **실증 6/6: 오프라인 생성→runSync→서버 1건+매핑, 재기록·재동기화해도 중복0(무손실·무중복).**
- 🔶 **6단계 로컬 주방인쇄 코드완료(dev, 실프린터 확인 필요)**: ①프론트 `printOfflineKitchenTicket`(클라 QZ/RawBT 직접, 서버無, 스테이션맵·printerSettings·pos_store_info_cache[StoreContext 신규 캐시] 사용) — OrderContext 오프라인 catch에서 주문받은 기기가 즉시 인쇄→printedLocally. ②SyncEngine create가 printedLocally면 `printed_offline:true` 전달. ③**백엔드 orders-crud create가 printed_offline 수용→needs_print=false+item printed_at 스탬프**(폴러 재인쇄0, 보호파일=의도변경). **실증 5/5(printed_offline→서버 needs_print=false+printed_at). ⚠ 실제 종이출력은 매장 프린터 확인 필요(headless 불가).**
- ⬜ **7단계**: 데모 전사이클(오프라인 시뮬→접수→로컬인쇄→복구동기화) + 운영검증.
- 검증 누적: build green(신규경고0)·hydration0·design신규0·i18n0·health106/107(=의도 print-guard)·KDS/POS mount crash0. print-guard 2건(KitchenDisplayPage·orders-crud=의도, 보호블록 무접촉) — **실프린터 확인 후 일괄 bless**.
- **배포 정책**: 6단계 실프린터 확인 + (선택)4단계 잔여까지 본 뒤 한 번에 배포(반쪽 금지).

### [진행·dev 2026-06-29] KDS 주문뷰 per-item 되돌리기 + 프린트 미확정 표시 (보호파일, Irene 직접 지시·반복 iteration)
- **A. 주문뷰 per-item 되돌리기**(확정: 아이템 최저 min-stage 파생): `revertItemStage`/`revertSetItemStage` 추가 — 진행된 아이템마다 ↺, 그 아이템만 한 단계↓ + `deriveOrderStatusLocal`로 주문 min 강등(allowItemRevert:true). 멀티품목 주문뷰에서 일괄만 되던 것 해소. **API 실증: both→preparing=preparing / revert one→pending(min)**.
- **B. 프린트 미확정 표시**(확정: needs_print 기반, DB 무변경): KitchenOrder에 needsPrint/createdAtMs + item.printed_at 노출. `hasPrintProblem`(needs_print+grace 30s 롤업)·`itemNotPrinted`(item.printed_at 미스탬프=정밀). 주문뷰 빨강 배지+Reprint, 아이템 ● 마크, **헤더 "미인쇄 N" 칩(양뷰 공통=아이템뷰도 보임)**, 아이템뷰 Ready 카드 배지. **강력 팝업**(NoticeCard $kind=order-cancel 빨강, 한 건씩 큐 "N more", Reprint+OK, 버튼 여백 수정). 재인쇄=printOrderTicket(printPerItem 자동분할)+스테이션 stamp(/station-printed) 또는 /printed. **실증 6/6**(생성·needs_print·min-stage·칩·팝업+Reprint).
- **설계 의견(Irene 질문 답)**: 인쇄 데이터가 2층(주문 needs_print + 아이템 printed_at)이라 표시도 2층. per-item ●=printPerItem 모드 정밀신호, 주문배지=롤업. 아이템뷰 pending/preparing은 메뉴그룹이라 주문배지 모호 → 헤더 칩으로 해결.
- **라우팅 검증(Irene 요청)**: 코드 정상(item.kitchen_station_id→kitchenStationPrinters[id]→프린터, 미매핑=첫스테이션 병합, 스테이션별 재시도). **단 rid5 "Test3"=프린터 미설정**(method=browser·name/addr 빈값)·autoPrint OFF·30개중 7개만 스테이션매핑·station26 매핑0 → 실프린터로 안 감. 실라우팅 테스트는 kitchenStationPrinters 설정+아이템 매핑된 매장 필요.
- 검증: build green(신규경고0)·print-guard=KDS 1건(의도, order-created/items-added 핸들러 무접촉)·hydration0·design신규0·i18n0·KDS mount(order/item) crash0. **bless 안 함**(실프린터 확인 후). i18n 키 추가(kitchen 6키×4언어).
- ⚠ **실프린터 확인 필요**(재인쇄=인쇄 동작). 매장 종이확인 후 일괄 bless.

### (이전) 진행 중인 작업 (2026-06-28 — v3.64로 운영 배포 완료분)
- **[배포완료]** 현장 레이아웃 묶음

### 진행 중인 작업 (2026-06-28, dev 미배포 — /검증 통과분)
- **[완료·dev] 현장 레이아웃 묶음**
  - FloorPlan: ▴접기화살표 제거→풀스크린 토글(헤더+통계바 숨김, 존바 나가기) / 테이블맵 여백 제거(가장자리까지) / 테이블 상세 "크게 보기" 팝업(측면패널↔중앙모달, body portal)
  - POS Terminal(보호파일, 레이아웃만·인쇄코드 0줄): 풀스크린 헤더접기 / 카테고리칩 컴팩트(48→44·padding·font) / **카테고리 페이지네이션**(한 줄+‹ ›+n/total, 펼치기 폐지) / 고객검색+테이블넘버 한 행(TopControlsRow)
  - PWA 모바일 상단바: "Solving Real F&B Problems - Purple here" 한 줄 통합 (확인필요: 다른 화면 의미였는지)
  - 검증: build·state-hydration0·timezone신규0·design신규0·i18n0·mount(FloorPlan/POS/KDS/Mobile crash0). print-guard: 내 변경 POSTerminalPage 1건(레이아웃만, 인쇄라인0 diff증명) — **--bless 안 함**(블랭킷이라 6/27 미검증 핫픽스까지 bless될까봐. 실프린터 확인 후 일괄 bless).
- **[완료·dev] KDS 보완 4건 (보호영역, 설계확정 후 구현·검증)** — KitchenDisplayPage 인쇄 라인 diff 0(증명), forward 승급 무변경(보호규칙 유지)
  - ①되돌리기 = **아이템 단위 + 주문 min-stage 파생**: 전 revert 경로(주문뷰 단일/ bulk, 아이템뷰 group, 아이템뷰 ready)를 setStationItemsStage(force)/deriveOrderStatusLocal 로 통일. All탭이 order.status만 내리고 item은 그대로던 "모순" 제거. 백엔드 deriveOrderStatusFromItems(orders-crud 1491·이미존재) 미러. **stage 시나리오 API 5/5**(forward 승급 + 한 품목 되돌리면 주문 min으로).
  - ②아이템뷰 Preparing 잔존 버그: renderItemViewPreparing 두 필터를 주문상태 게이트→쿠킹범위+아이템상태 기준으로(되돌려도 다른 preparing 품목 안 사라짐).
  - ③사운드 탭 기준: 폴링 신규주문 사운드(875)가 아이템 없이 호출돼 All 기준이던 버그→아이템 넘겨 스테이션 필터. table-moved stale audioEnabled→ref. (취소/이동/void 안내음은 이미 탭 게이트됨.)
  - ④취소주문: KDS 상단 "취소 N"(빨강 배지)→ 오늘 취소목록 팝업(표시 전용, 타임존 준수, i18n 4개).
  - 검증: build·KDS mount(order/item) crash0·state-hydration0·design신규0·i18n0. **잔여=#3 스테이션별 사운드 설정 UI(Settings, 데이터모델 alert_sound 이미 있음)**.
- **[완료·dev] 1-2 브랜드메뉴 드래그 재정렬 버그** (안전·비보호): 백엔드 reorder/bulk `sort_order: i`→`i+1`(1-based). 0-based면 1번 위치 메뉴가 sort_order 0 → sortItems('custom')이 "미설정=맨뒤"로 보내 재정렬이 깨졌음(증명: 드래그 A,B,C → 0-based=B,C,A / 1-based=A,B,C). + 프론트 persistBrandOrder r.ok 확인·setError 표면화(silent catch 제거). 파일: routes/brand-menus.js, BrandGeneral/BrandMenusPage.tsx. 데이터 마이그 불필요(다음 재정렬 시 정상화). dev 빌드/가드 통과.
- **#3 스테이션별 사운드 설정 UI = 기존에 이미 존재**(SettingsPage 7964~ alert_sound 셀렉트+미리듣기+저장). 신규작업 없었음.
- **[완료·dev] 1-4 브랜드 잠금메뉴 이미지 저장 버그** (안전·비보호): 편집모달이 name/price/category만 잠금 disabled, image 잠금은 UI 미반영→편집되는 듯하나 저장 안 됨. 수정=locks.image 시 ImageUploadDropzone 대신 읽기전용 미리보기+안내. 신규모달 무영향. menu.json 3키×4언어. 파일: MenuManagement/MenuManagementPage.tsx. 옵션잠금은 1-3(매장 자체옵션 추가 허용) 때문에 의도적으로 안 막음.
- **[완료·dev] 1-3 옵션잠금 메뉴에 매장 옵션 추가 허용(superset)** (안전·비보호): ①menu.js update가드 optionGroups 잠금=전면차단→superset(브랜드 미러 OptionGroup.brand_menu_option_group_id≠null 모두 유지 시 허용, 제거 400) ②brandMenuSyncService 잠금 시 매장옵션 wipe→항상 merge(매장 자체옵션 보존). 통합테스트 3/3(추가200·브랜드제거400·name허용), fixture 잔여0. 비브랜드 무회귀200·health106/107. 파일: routes/menu.js(+Op import), services/brandMenuSyncService.js.
- **[완료·dev] 2-1 옵션 솔드아웃** (DB+백엔드+RA+POS+모바일, 비보호): ①DB `options.sold_out`(멱등 마이그 `scripts/20260628_add_option_sold_out.js` — **배포 목록 등록 필요**, sync--alter 금지) ②백엔드 `PUT /menu/option/:id/toggle-soldout`(직원 허용·소켓 `option-soldout`·익명401·IDOR) + optionGroups.js/mobile-public.js 응답에 sold_out ③RA OptionManagementPage 옵션별 토글 ④POS OptionModal 롱프레스(600ms) 토글 + 품절 선택불가/회색 ⑤모바일 ItemDetailPage 품절 선택불가. 검증: 토글 API 200/401/재조회 sold_out, mount(POS/RA/모바일) crash0, build·hydration0·design0·i18n0(4언어), print-guard 불변(비보호). 세트 구성품 UI 표시는 추후(Irene 확정). 참고: mobile-public.js는 routes/mobile.js 경유 `/api/mobile` 라이브.
- **[진행·dev] 3-1 현금관리 PIN** (권한·설정, 비보호):
  - ✅ 백엔드 완성·검증(6/6): `utils/cashPinGuard.js`(voidPinGuard 미러, 결제권한 PIN), cash-management 쓰기 라우트를 `requirePosCounter`→`cashWriteGate`(①결제권한 access_payment로 좁힘 ②설정 ON 시 enforceCashPin). settingsGuard 화이트리스트 `requirePinForCashMgmt`. 게이트테스트: round-trip·PIN없음400·무권한403·결제권한PIN(0430)통과·익명401·OFF통과, 설정 원복. 마운트=`/api/cash`.
  - ✅ 설정 UI 토글(Irene 필수 "핀 설정 꼭 있어야") SettingsPage 추가, **기본 OFF=안전**(OFF면 기존+access_payment만 좁힘). mount clean.
  - ✅ **PIN 진입 UX 완료**: CashPinModal(VoidPinModal 미러, verify-pin-permission access_payment) + 3개 컴포넌트(CashDrawerOps·CashLedger·FinalSettlementPanel)에 withCashPin 게이트 + cash_pin 동봉(첫 쓰기 전 PIN 1회→세션 보유, CASH_PIN_* 오류 시 재요청). design-guard numpad bless. 게이트API 6/6 재검증·cash-up/settings mount0·hydration0·i18n0·build green. **3-1 완성** — 토글 ON 시 정상 동작.
- **[완료·dev] 4-1 POS 아이템별 메모** (POS 보호파일, 인쇄 라인 diff 0): 장바구니 각 품목에 "Add note"→표준 input(터치=OS 온스크린 키보드, 물리키보드 매장도 그대로 — 별도 키보드 컴포넌트 불요). special_instructions 를 OrderItemType + 양쪽 주문 페이로드(handleAddOrder/handleConfirmPayment)에 연결 → 주방티켓/빌 출력은 billPrint가 기존 처리. 주문단위 메모 잘림은 #11(6/26)에서 이미 스크롤영역 재배치. mount0·hydration0·design0·build green. (남은 4-1 항목 없음.)
- **[완료·dev] 머지(R8) 2건** (Irene 원래 "다음 확정 작업"): ①orders-crud 머지 재발행 printedItems 에 served/completed 제외(clean-move 1252 패턴 일치) — API검증(머지 시 served 제외·ready 포함). ②FloorPlanPage 머지 티켓 tableNumber "출발 + 목적지"(sourceTableNumber 사용), 헤더 ** TABLE CHANGED + MERGED ** 유지. 일반 이동은 목적지만. guards hydration0/design0, FloorPlan SPA mount 정상(test-critical ❌는 콜드딥링크 인증레이스 아티팩트). **⚠ 인쇄 라우팅 → 실프린터 종이 확인 후 배포.**
- **[코드리뷰·보완 2026-06-28] 서브에이전트 전체 diff 리뷰 → 실보완 3건 수정**: M1 옵션 솔드아웃이 로컬상태만→MenuContext.applyOptionSoldOut 추가(토글/소켓 option-soldout 반영, 재오픈·타기기 일관) / M2 POS i18n 6키(terminal.prev/next/fullscreen/exitFullscreen·itemNote·addItemNote) 4언어 추가 / M3 zreport-printed 인쇄마커라 PIN게이트 제외(requirePaymentAccess, 수동 재인쇄 400 해소). cash-management 미사용 requirePosCounter import 정리. 잔여 L1~L4=경미/설계상(set메뉴 revert 프론트백 일치 등). 재검증 전부 green.
- **[완료·dev] 3-2 할인 RM 표시** (자잘): POS 주문요약이 할인/쿠폰/정책 라인을 맨숫자로 표시하던 갭 → 전 요약 라인(Subtotal·Takeaway·Discount·Coupon·Policy·ServiceCharge·Tax)에 통화(currency) 일관 추가. 결제팝업은 원래 RM 표시됨. POSTerminalPage 인쇄라인 diff 0·mount✓·hydration0·design0.
- **[관찰·기존] FloorPlan 콜드 딥링크 redirect-to-/** = 인증 부트스트랩 레이스(대시보드도 동일, 콜드 goto 시 auth 해소 전 가드가 / 로). 워밍/인앱 네비에선 정상 렌더(title=1 확정). 내 변경(라우팅/인증 무접촉) 무관·기존 동작. test-critical "✓ Floor Plan"=크래시0 의미(렌더 보장 아님). 필요 시 별도 개선 후보(딥링크 auth 레이스).
- **[검증] 운영검증 read-only 통과**: 운영 health·역할 스모크·익명401·**운영 백엔드 KDS 되돌리기 min-stage 파생 정상**(is_test 매장5 생성→검증→삭제). 실고객매장 무변경. dashboard "실패"=테스트경로 오타(실경로 200).
- **공통:** 전부 dev만, **운영 미배포**. print-guard 5건(POSTerminalPage·KitchenDisplayPage=의도된 레이아웃/KDS, 인쇄라인 diff0 / billPrint·poller·orders-crud=6/27 미검증 핫픽스). 블랭킷 bless라 **실프린터 확인 때 일괄 bless** — 임의 bless 금지.

### (이전) 다음 확정 작업 — 위 "남은 모든 개발"에 흡수됨
- 머지(R8) served제외 + "Table1+Table2" 표시, 자동발행/KDS 검토 등은 백로그(POS_MENU_IMPROVEMENT_BACKLOG / THEFIRE_REMAINING_WORK_PLAN)와 함께 순차 진행.

### 완료된 작업 (이번 세션 — thefire02 라이브 인쇄 긴급대응, 운영 배포)
- **QZ keepalive** (SW 4.33): QZ 웹소켓이 idle(20분) 끊김 → 첫 인쇄가 재연결로 ~16초 멈추던 근본 해결. 20초마다 getVersion ping + idle중 백그라운드 선재연결. (billPrint.js connectQZTray)
- **발송 순서 = 주방 스테이션 먼저 → 통합** (SW 4.34): 통합 2장(POS1=CASHIER + KQ POS=MASTER, 전체오더라 길다)이 QZ 한줄큐에서 BAR 앞을 막던 것. printKitchenTicketViaRawBT가 스테이션 라우팅 await 후 sendUnifiedTickets. MASTER는 설정상 Main POS 뒤라 맨 끝.
- **통합티켓 "정확히 1번" 가드**: 하이브리드+폴러 중복("POS1 통합 2장") → consolidated-print/:id/claim atomic 가드.
- **아이템취소 = 그 회차(order_group) 오더티켓 기준**: 취소품목이 원래 찍힌 회차 품목만 + 줄긋기(전체합본 아님). API+DB 실검증 완료(회차1취소→회차1만 / 회차0→회차0만, served 제외).
- **안정 검증루트**: backend `PATCH /:id/station-printed` + `[print-trace]` 운영로그(타이밍 직접 진단).
- 인쇄 발송 단일기준 정리 + 디테일 코드감사(세트구성품옵션·특별요청·부분취소·미배정폴백·served제외 — 대부분 구현 확인).

> ⚠️ 이번 세션은 종일 추측·되돌리기 반복으로 Irene 신뢰 손상. 교훈: **인쇄는 추측 금지, print-trace 로그로 실측 후 한 번에. "검증하라"면 바꾸지 말고 검증·보고 먼저.**

### 다음 확정 작업
> Irene 이번 세션 명시 지시 — 다음 섹션에서 진행:

1. **머지(R8) 2개 수정 — Irene "고칠거냐?"에 다음 섹션에서 결정/구현:**
   - ① 점유 테이블로 이동(=머지 R8) 재발행에서 **served 제외**. 현재 `orders-crud.js:1223` `printedItems = myItems.filter(printed_at||printed)` 에 served 필터 없음 → 다른 액션(clean이동 1252·취소 1605·아이템취소 _vNotServed)과 불일치. 서브된 품목이 머지 시 주방 재발행됨(Irene "서브해서 한참 지난 걸 뜬금없이 보내면 안돼"). 1줄 수정.
   - ② 머지 티켓 테이블 줄 = **"Table1 + Table2"** (소스+목적지). 현재 `FloorPlanPage.tsx:1564` `destTable` 하나만. 헤더 `** TABLE CHANGED + MERGED **`(1557-1559)는 유지. Irene: "테이블번호 + 테이블번호2 표시하고 위에 합쳐졌다 안내".
   - (라이브오더 `/merge` 두주문 병합은 별도 티켓 추가 **안 함** — Irene "그대로 할거야". R8=테이블이동과 동일 개념으로 본다.)
2. **프린트 자동발행(autoPrint) 기준 검토 + KDS(주방디스플레이) 안내·표시 검토**: 자동발행 ON/OFF·백로그컷오프 기준이 코드와 일치하는지, KDS 취소/이동/머지 팝업이 탭(현재 station)기준으로 제대로 뜨고 표시되는지 검토. (PRINT_RULES_MATRIX §9 대조)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 실프린터 눈 확인: 옵션 있는 세트구성품 옵션 렌더 + 4.34 발송순서/keepalive/아이템취소 회차 종이확인 → 확인 후 `cd dev-backend && node scripts/check-print-guard.js --bless` (보호파일 8개 지문 갱신, 현재 의도변경으로 1건 떠있음).
- brandMenuSyncService.js 세트 전파 영구수정 — 아직 /배포 대기(2026-06-27 #2 세션).
- POS 메뉴 개선 백로그 13건 (`docs/POS_MENU_IMPROVEMENT_BACKLOG.md`).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
