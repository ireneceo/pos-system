# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-15 (BG 월청구 정상화 + 명세서 수동생성 운영 배포)
**버전:** v3.57 (이후 backstage 배포: 태블릿패치/소켓PhaseB/BG월청구 — 전부 버전 미상승). 직전 v3.56(6/13), v3.55(6/12).
**작업 상태:** 전부 운영 배포·검증 완료. 운영 헬스 ok·에러 0.

---

## ⚡ 빠른 재개 (새 세션에서 이것만 붙여넣기)
```
session-state.md 읽고 이어서 개발해.
```

---

### 진행 중인 작업
- 없음 (소켓 Phase B 모니터 모드 운영 배포 완료 — 아래 "다음 확정 작업"에 강제 전환 단계 대기)

### 완료된 작업 (2026-06-15 후반) — BG 발주→인보이스→월청구 정상화 (운영 배포, v3.57 backstage)
- **레스토랑→BG 발주→거래인보이스→월 SOA 시스템은 ~95% 기구축 상태였으나 핵심 버그로 월청구가 깨져 있었음.** 런타임 e2e로 발견: `soaScheduler.issueSoaForPair` 의 Invoice.create 가 `issued_by`(NOT NULL) 누락 → 월 SOA 생성이 매번 실패(supplier/brand/foodcourt 전부). 발행자 owner_id 로 resolve해 수정. **운영엔 monthly_soa 매장 0이라 잠복(라이브 피해 없던) 버그.**
- **월 명세서 수동 생성 추가**: `soaScheduler.generateSoaNow` + `POST /api/{brand|foodcourt}/soa/:rid/generate`(소유권검증·멱등) + BillingTermsModal "지금 명세서 생성" 버튼(monthly_soa 저장 매장에). 매월 1일 자동발행 안 기다리고 즉시.
- **검증**: dev e2e 14/14(발주→confirm→ship→receive→거래인보이스 자동발행→월SOA errors:0→RA수신) + 수동생성 9/9 + health 101/101 + print-guard 8/8 + build 0. **운영 검증**: 수동생성→SOA(issued_by채워짐)→링크→멱등 + 보안차단, 데모 rid13 원복(오염0, monthly_soa 0 원상). [[project_bg_fg_as_seller]] [[reference_bg_fg_trade_billing]]
- **참고(미해결 아님)**: PO 진입은 IngredientSellerProduct 매핑 필요하나 카탈로그 발주 UI(`/ingredients/from-catalog`)가 재료+매핑 자동생성 → UI상 "바로 사용" 가능 확인.

### 완료된 작업 (2026-06-15) — v3.57 브랜드메뉴 적용범위
- **브랜드메뉴 레스토랑 적용범위(Scope) 전체 구현 + v3.57 운영 배포.** 연결(opt-in) 방식. 백엔드: 마이그(products.brand_scope_active + brand_menus.scope_mode + brand_menu_restaurants, 운영 선적용 additive) + BrandMenuRestaurant 모델 + brandMenuSyncService(resolveScopeTargetIds/applyScopeToBrandMenu(refreshMode=membership|sync)/setBrandMenuScope/syncAllScopedMenusToNewRestaurant, sync 시 brand_scope_active 복원) + brand-menus 라우트(create scope 시드+reconcile / PUT scope-aware / GET·PUT /:id/scope / push 범위제약 OUT_OF_SCOPE / distribution+settings default_scope) + 노출게이트 menu.js+mobile-public.js(brand_scope_active) + 신규매장 훅 restaurants-crud. 프론트: BrandMenusPage ScopePickerModal+카드 Scope버튼/배지+설정탭 default_scope. 노출=brand_scope_active(BG범위) AND is_active(RA활성).
- **검증**: 실API scope 19/19 + 주문 생명주기(주방/서빙 단계) 21/21 + order-totals 11/11 + health 101/101 + print 8/8 + print-guard 🔒 8/8 + build 0 + mount 21/21 + 실브라우저 클릭-스루 PASS + hydration/타임존/i18n 0. 운영 검증: scope 쿼리 OK + 758/758 노출(하위호환) + 에러 0.
- **검증도구 수정**: headless-page-sweep 빈렌더(root 0) EMPTY_RENDER 감지 추가(기존 빈바디 false-OK) + BG_ROUTES stale 13개 실제 경로 교정(brand-menus=`/pos/brand-menus`). [[reference_headless_page_sweep]]
- **버전 정정**: 세션 시작 시 v3.55로 오인(stale) → 실제 v3.56(6/13 배포)이라 오늘은 v3.57.
- **배포 후 운영 주문 프로세스 전수 검증** (Irene 요청) — 운영 데모(rid13)에서 주방/서빙 단계·티켓·void/cancel·PIN게이트·+Round·is_deleted 18/18 통과. 마커기반+설정/PIN 원복+테스트주문 7건 정리.
- **(운영 데이터) The Fire 주문내역 삭제** (Irene 요청) — thefire01(rid16) 지난주 6/8~ 16건 + thefire02(rid24) 14건 전부 + thefire03(rid25) 2건 전부 = 32건 hard delete(+order_actions 216). rid16 이전 128건 유지·24/25 빈 내역. 백업 `/var/www/backups/thefire-orders-delete-backup-20260615.json`(+children). [[project_thefire_order_deletion_0615]]
- **태블릿 StatusTabs 패치 운영 배포 + 주문루트 재검증** (Irene 지시) — LiveOrders 상태탭 태블릿 wrap 수정 운영 배포(Backup 20260615_084256, 안전게이트 8/8·101/101). 운영 라이브 측정 1024 넘침 0/2줄, 운영 주문 생명주기(주방/서빙·티켓·void/cancel·PIN·메뉴) 16/16. 버전 미상승 UI 패치(릴리즈노트 생략).

### 완료된 작업 (이전 세션 2026-06-13 저녁)
- **The Fire 공지 누락 수정** (운영 데이터) — trial 실고객이 `is_test=true` 오분류로 공지·청구 제외 → User 8 + Restaurant 3 `is_test=false`. 코드 0. "trial/test 분리"는 오진(trial=기존 status). 백업 `/tmp/thefire-istest-backup.json`.
- **v3.56 릴리즈 공지/블로그 발송** — 공지#56(운영) 8명(The Fire 4/4) + 블로그 release-v3.56. 공통/역할별 + 언어별 UI라벨 교정.
- **소켓 인증 하드닝 Phase A** — 운영 배포·검증(Backup 20260613_155548, Smoke 9/9). 11소켓/9파일 `auth:{token}`(동작 무변경). 인쇄 무관. print-guard bless. 설계 docs/SOCKET_AUTH_HARDENING.md.
- **Cloudflare sw.js 퍼지**(Irene) — 매장이 v3.46(5/30)에 묶여있던 것 해소, 최신 3.63 전달(BYPASS, 재발 X).
- **태블릿 레이아웃 점검** (코드 변경 0, 점검만) — 9"/10"(1024×600·768·1280×800) Playwright 실로그인 측정. **확인: LiveOrders 상태 탭 줄이 1024 폭에서 208px 넘침 → "Completed" 잘림 + 좌우 흔들림(overflow-x:auto, 사이드바 열림 시 콘텐츠 ~780px). 1280은 정상.** KDS/FloorPlan/아이템뷰는 데모가 오늘자 active 주문 0이라 재현 불가 → 다음 세션 A.

### 다음 확정 작업 (Irene 지시)
1. ~~[A] 태블릿 레이아웃 오버플로우 전수 점검+수정~~ → **✅ 운영 배포 완료 (2026-06-15, v3.57 후속 패치·버전 미상승, Backup 20260615_084256)**. 실측 결과 **실제 넘침 1곳**: LiveOrders `StatusTabs`(8탭 1024폭 208px→가로스크롤+끝탭잘림). 수정 `styles.ts` overflow-x:auto→flex-wrap:wrap(gap 8x24, ≤1100px 8x16) → 태블릿 2줄 전부노출/데스크톱 1줄. 영향=LiveOrders+ReservationsTimeline 2곳(IncomingOrders는 자체 RLStatusTabs라 무관). KDS/FloorPlan/아이템뷰는 깨끗. **운영 라이브 측정 넘침 0 + 주문루트 16/16 + 헬스 ok 확인.**
2. **[소켓 Phase B 강제 전환] — 모니터 모드 운영 배포 완료(2026-06-15, Backup 20260615_133815). 남은 1스텝 = ENFORCE 켜기.** 구현(socketService.js 4네임스페이스 makeSocketAuth + join 신원검증) 배포됨, 현재 모니터(동작 무변경, 토큰 채택률 로깅). **전환 방법**: 운영 로그 `[socket-auth][monitor] no-token 핸드셰이크` 가 실매장 트래픽에서 거의 0인지 며칠 관찰 → 0이면 운영 `SOCKET_AUTH_ENFORCE=true` env + `pm2 restart production-backend --update-env` → **구멍 차단**(코드 재배포 불필요). 관찰 중 특정 매장이 계속 no-token이면 그 기기 강력새로고침(옛 번들). 검증: 모니터 2/2+강제 5/5. [[project_socket_auth_hardening]]

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **Irene 실프린터 확인**: v3.56 취소표 / v3.55 통합티켓 스테이션 범위 / 닭갈비라면 KQ1 (인쇄 무변경, 형식 확인)
- **Irene 직접**: BG 브랜드메뉴 이미지 17건 재업로드 / (선택) Cloudflare API 토큰 주면 배포 시 sw.js 자동퍼지
- 디자인 규칙 위반 발견(점검 중): FloorPlan "+ Takeaway Walk-in" 버튼의 `+` prefix → 메모리 [[feedback_no_plus_prefix]] 위반, 수정 후보
- ~~브랜드메뉴 레스토랑 적용범위~~ → **v3.57 구현·배포 완료(2026-06-15)**
- 첫 유료 멀티지점 하드닝 잔여 wave — docs/OPERATIONAL_READINESS_AUDIT §8
- headless-page-sweep RA/roles 경로도 stale 가능성(빈렌더 감지 ON 됨) — 별도 점검 후보

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
