# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-26 (**소켓 emit 봉인 + 로열티 크로스테넌트 + 라우트가드 표면 확장 — dev 완료·미배포**)
**버전:** **v3.70** (운영 — 2026-07-24) · 데스크탑앱 0.1.9 · 안드로이드앱 0.2.0
**작업 상태:** 완료 (dev 검증 전부 통과 · 운영 미배포 — `/배포` 지시 대기). ★Fable 게이트 대상(기준 ②⑤)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-26, 백로그 보완·정리)

Irene "다른 작업 할게 없어? 보완하고 관리하고 수정해야 할 거 다 제대로 해" → 백로그를 추측 없이 전부 실측해 처리.

**① 소켓 emit 방향 크로스테넌트 봉인** (`services/socketService.js`)
- 근본: `socket.to(room)` 은 **가입 여부와 무관하게** 아무 룸에나 쏜다 → join 검증만으론 안 막힘.
  타 매장 고객화면에 위조 카트 표시·강제 초기화·**진행 중 판매에 회원 붙여 로열티 적립**·카트캐시 오염(재접속 재생) 가능.
- `canEmitToRestaurant` 신설(join 과 동일 기준 + 소켓별 판정 메모) → `/checkout-display` 5핸들러 + `/orders` join.
- **추가 발견**: `/kitchen`·`/display` 는 클라이언트 0건(웹·데스크탑앱·안드로이드앱 전수 grep)인 죽은 네임스페이스인데
  `io.of(ns).emit()` = **전 테넌트 브로드캐스트 릴레이**(가짜 주문 주입) → 룸 스코프로 통일(동작 변화 0).
- ⚠️ **`SOCKET_AUTH_ENFORCE=true` 전에 이게 배포돼 있어야 한다** — 안 그러면 emit 경로만 열린 채 남는다.

**② 로열티(멤버십) 크로스테넌트 — 실측 결함** (`routes/membership.js`)
- `customerSelfOrAdmin` 의 **admin 경로가 authenticateToken 만** → rid38 RA 토큰으로 **rid5 손님 이름·전화·이메일·포인트 이력 200 실증**(PDPA급).
- 포인트 쓰기 5개(`earn/use/refund/adjust/welcome`)가 `restaurant_id` 를 **body 로 받고 무검증** → 타 매장 손님 포인트 조작(고장주입 시 실제 200+적립 발생, dev 데이터 원복).
  호출부 0건인 죽은 라우트(실적립은 `services/pointService.js`) — 7/25 `table-status` 와 동일 패턴, 삭제 대신 게이트.
- 익명 `GET /settings/:rid` 가 **임의 매장에 설정 행을 생성**하던 무인증 쓰기도 차단(존재 매장만).

**③ 모바일 하드코딩 매장1 폴백 제거** (`mobile/OrderTypePage.tsx`·`PaymentPage.tsx`)
- `storeData || { id: '1', … }` → 매장 로드 실패 시 `sessionStorage.restaurantId='1'` 로 **손님 세션이 1번 매장에 묶였다**.
  매핑 단일소스 `mapStoreData`(id `^\d+$` 아니면 null) + 주문 시작 시 재확정, 실패면 진행 중단.
- PaymentPage `|| '1'` 제거(그 지점은 위 게이트로 이미 죽은 폴백 — 정직히 hygiene 수정).

**④ check-route-guard 표면 확장 + 전수 라이브 실측** (7/25 이 남긴 "미검사 표면")
- 패스 B 신설(프리픽스 마운트 라우터) + 판정 정밀화(SA 인라인·소유엔티티·self 스코프·spread 미들웨어·로컬 미들웨어 1단계 추적).
- 드러난 50건을 **무관한 RA·BG·FG 3신원 × GET/POST/PUT/DELETE 전수 호출**: 무관한 신원엔 **전부 401/403(실제 유출 0)**,
  200 은 전부 정당한 권한(BG=브랜드 소유주 / FG=oversight 배정). baseline 40 등록(측정 근거 주석 포함).
- 🔎 **구조적 취약점 발견(보고)**: `/api/restaurants/:rid/*` 보호의 실체가 **inventory-core 배럴 가드 + server.js 마운트 순서**다.
  순서를 바꾸면 조용히 열린다 → 마운트 순서 변경은 보안 변경으로 취급(문서화).

**⑤ 영구 안전망 강화**
- `tests/socket-auth.test.js` **15건**(강제·모니터 두 모드) 신설 → verify-all 신규 게이트 `contract-tests`(금액공식·설정wipe·소켓경계) 로 배포 게이트에 편입.
- health-check security **42→49**(멤버십 PII 3경로·포인트 쓰기 5경로·익명 설정행 생성·소켓 관측 401/403/카운터·설정 부분PUT 보존).
- 고장주입 검출: 소켓 2/3(3번째는 룸을 판정값으로 고정해 애초에 악용 불가 — 이중화) · 멤버십 2/2 · 스캐너 1/1.

**⑥ Fable 지적 1건은 결함 아님으로 종결** — `SettingsPage.tsx:5291` reservation_settings wipe:
백엔드 `guardShallowSettings` 가 missing key 를 보존한다. **실 HTTP 왕복으로 증명**하고 그 계약을 health-check 에 박제.

**검증**: verify-all **--full 15/15**(mount sweep 8역할 658s 크래시 0) · health-check **156/156** · 계약테스트 40/40 ·
🔒 인쇄 보호파일 **8/8 무접촉** · 빌드 경고 0 · 모바일 실브라우저 흐름(order-type→메뉴→품목→카트) mount ok ·
DB 마이그레이션 없음 · 신규 의존성 `socket.io-client`(**devDependency** — 운영은 `npm install --production` 이라 미설치).

### 완료된 작업 (이번 세션 — 2026-07-25)

**매장 크로스테넌트 과다노출 수정 (결함 9개) — dev 완료·미배포, ★Fable 게이트 대상(기준 ⑤) → VERDICT GO**

- **고친 것**: `GET /restaurants/:id`(88컬럼·게이트웨이 비밀키) · `slug/:slug`(**완전 익명** 80컬럼) · `PATCH /:id/status`(**임의 테넌트 영업정지**) · `PUT /store/settings`(쓰기 비대칭) · `manager/:managerId` ×2(자기검사 0) · `table-status`(**타 매장 손님 이름·전화·주문·payment_proof**, 호출부 0건 죽은 라우트) · `categories`·`allowed-routes` · **목록 스코핑**(Supplier·Staff·RA·Owner·스코프 미배정 FG/FM 이 전 매장 수신)
- **목록 실측**: Supplier 33→0 · RA 33→1 · Staff 33→1 · Owner 33→3 · 미배정 FM 33→0 · **SA 33·FG 2·BG 3 불변**
- 🔴 **Fable 이 잡은 블로커**: `parseInt('3.8e1')===3` vs MySQL `'3.8e1'→38` → 게이트가 검사한 매장과 핸들러가 반환한 매장이 다름. **같은 split 이 `checkRestaurantAccess`(103라우트)에도 있어 앱 전역이 뚫려 있었음**(구현자 독립 재현) → 세 곳 `^\d+$` + param 고정으로 차단
- 🔴 **구현자가 스스로 찾은 회귀**: 상세 게이트가 목록보다 엄격 → **Foodcourt Manager 는 목록엔 뜨는데 상세 403**(매니저 콘솔 사망). dev 에선 branch_id 우연 불일치로 가려져 있었음. `userCanAccessRestaurant` 는 **의도적 무수정**(소켓 room 인증 등 11파일 공유)
- **설계**: `/:id` 응답 **미축소**(Settings 프린터탭·🔒POSTerminal·LiveOrders 1차 소스 — 축소 시 프린터설정 wipe 사고 재현) · `checkRestaurantAccess` 는 오답(BG/FG 소유 폴백 없음)
- **검증**: verify-all **13/13** · health-check **147/147**(security **42/42**, 신규 7건) · **고장주입 6/6 검출** · Fable 독립: **A/B 664호출 diff 0** · **우회 25개 인코딩 차단** · **list⊆detail 78유저 196쌍 위반 0** · 실브라우저 8역할 크래시 0 · 🔒 인쇄 **8/8 무접촉**+print 11/11 · 마이그·프론트 무변경
- **문서**: `docs/ROLES_AND_PERMISSIONS.md`(게이트 선택 규칙 신설) · `docs/AGENT_ONBOARDING.md`(함정 4건 추가) · 메모리 [[reference_restaurant_access_four_gates]] [[reference_id_normalization_bypass]]

**운영 실측으로 종결한 항목 (SSH 읽기 전용 — `irene@87.106.78.146`)**
- **결제 비밀키 로테이션 불필요 확정** — 운영 22매장 중 결제설정 14, online 활성 2(둘 다 데모/테스트), **stripeSecretKey·paypalClientSecret 길이 전부 0**
- **소켓 강제 전환 가능 확정** — 운영 카운터 `withToken 287 / withoutToken 0 / invalidToken 0 / crossRestaurant 0`(관측 2026-07-24 19:52~). 옛 번들 기기 0건. 운영 `JWT_EXPIRES_IN=7d`
- 소켓 트랙 Fable 판정 CONDITIONAL GO → 조건(dev 실사격 + 운영 카운터) **둘 다 충족**

### 다음 확정 작업
- **매장 크로스테넌트 수정(7/25) + 이번 7/26 보완분 운영 배포** — dev 검증 완료. 7/25분은 Fable GO,
  **7/26분은 Fable 게이트 대상(기준 ②⑤) — 미검증**. Irene `/배포` 지시 시 진행(마이그 없음, 롤백=revert+pm2 restart)
- **소켓 인증 강제 전환(`SOCKET_AUTH_ENFORCE=true`)** — Irene "소켓 켜" 지시 시 비피크에 env 플립 + `pm2 restart --update-env`(**코드 무배포**, 롤백 30초) + 직후 카운터 재확인
  ⚠️ **순서 주의**: 위 7/26 emit 봉인이 **배포된 뒤에** 켜야 한다(안 그러면 emit 경로만 열린 채 강제됨)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **Phase 2 — 게이트웨이 비밀키 응답 마스킹**: `guardPaymentSettings` nested `config` 보존 + SettingsPage write-only 마스크가 **같이** 가야 함(하나만 하면 저장 시 비밀키 silent wipe). 별도 Fable 게이트 대상
- **접근판정 4중화 통합**: resolver 1개 + 투영 2개. **순서 엄수** = shadow 1주 → 목록+게이트 → `userCanAccessRestaurant` 도메인별(소켓 최후) → `checkRestaurantAccess` 103라우트 최후. [[reference_restaurant_access_four_gates]]
- **Fable 발견 프론트 기존 결함 2건**: `SettingsPage.tsx:5291` 빈 객체 PUT 로 `reservation_settings` wipe(설정 wipe 계열) · `mobile/OrderTypePage.tsx:396,471`·`PaymentPage.tsx:1393` 하드코딩 `'1'` 폴백 → **손님이 다른 매장에 붙음**
- ~~`/checkout-display` emit 4곳 `restaurantId` 미검증~~ → **2026-07-26 완료**(위 ①)
- ~~health-check 소켓 케이스 추가 · `check-route-guard.js` 프리픽스 마운트 확장~~ → **2026-07-26 완료**(위 ④⑤)
- **접근판정 통합의 선행조건이 하나 늘었다**: `/api/restaurants/:rid/*` 가 마운트 순서에 의존해 보호되고 있으므로,
  라우터 마운트 정리·통합 작업은 그 우산을 명시적 게이트로 바꾸는 것과 **함께** 가야 한다(따로 하면 조용히 열림)
- **rid=16 모바일 이월렛 QR 업로드 후 재오픈** — 코드·설정 완료, `qrImage` EMPTY 라 `availableIn=['pos']` 로 되돌려 둠. 매장 TNG QR 확보 시 `'mobile'` 추가 한 줄
- 실프린터 종이 1회 확인(인쇄 신선도 수정 잔여) · 윈도우앱 눈 확인 1회(Floor Plan 헤더·프린터 토스트) · exe 코드서명 인증서(Irene 결정)
- IOI Mall 가동(운영 자격증명 수령 시 production 전환) · `formatPaymentDisplay` 이월렛 서브타입 미반영(인쇄물 — 별도 승인) · 매출 대조 마감 · 운영시간+라스트오더 · AI 음식인식 B2 · POS 헤더 접기
- ENCRYPTION_KEY 강화(go-live 직전, 재실행 금지) · 개발서버 sudoers `visudo -c`

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
