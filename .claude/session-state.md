# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-26 (**v3.71 운영 배포 완료**)
**버전:** **v3.71** (운영 — 2026-07-26) · 데스크탑앱 0.1.9 · 안드로이드앱 0.2.0
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-26)

**① 소켓 emit 크로스테넌트 봉인** (`services/socketService.js`)
- 근본: `socket.to(room)` 은 **가입 여부와 무관하게** 아무 룸에나 쏜다 → join 검증만으론 안 막혔다.
  타 매장 고객화면에 위조 카트 표시·강제 초기화·**진행 중 판매에 회원 붙여 로열티 적립**·카트캐시 오염(재접속 재생) 가능.
- `canEmitToRestaurant` 신설(join 과 동일 기준 + 소켓별 판정 메모) → `/checkout-display` 5핸들러 + `/orders` join.
- `/kitchen`·`/display` 는 **클라이언트 0건 죽은 네임스페이스인데 네임스페이스 전체 브로드캐스트 릴레이**(가짜 주문 주입) → 룸 스코프 통일(동작 변화 0).

**② 로열티(멤버십) 크로스테넌트 — 실측 결함** (`routes/membership.js`)
- `customerSelfOrAdmin` admin 경로가 `authenticateToken` 만 → **rid38 RA 토큰으로 rid5 손님 이름·전화·이메일·포인트 이력 200 실증**(PDPA급).
- 포인트 쓰기 5개(`earn/use/refund/adjust/welcome`)가 body `restaurant_id` 무검증 → 타 매장 손님 포인트 조작(고장주입에서 실제 200+적립 발생, dev 원복).
- 익명 `GET /settings/:rid` 가 임의 매장에 설정 행 생성(무인증 쓰기)도 차단.

**③ 모바일 매장 오배정 제거** (`mobile/OrderTypePage.tsx`·`PaymentPage.tsx`)
- `storeData || { id:'1' }` 폴백이 손님 세션·장바구니·주문을 **1번 매장**에 묶었다 → 매핑 단일소스 `mapStoreData`(id `^\d+$` 아니면 null) + 주문 시작 시 재확정, 실패면 진행 중단.

**④ route-guard 표면 확장 + 전수 라이브 실측**
- 패스 B 신설(프리픽스 마운트 라우터) + 판정 정밀화(SA 인라인·소유엔티티·self 스코프·spread·로컬 미들웨어 1단계 추적).
- 드러난 50건을 **무관한 RA·BG·FG 3신원 × GET/POST/PUT/DELETE 전수 호출** → 무관한 신원엔 **전부 401/403(실제 유출 0)**, 200 은 전부 정당 권한. baseline 40 등록.
- 🔎 보호 실체가 **inventory-core 배럴 가드 + server.js 마운트 순서** 임을 발견 → 마운트 순서 변경은 보안 변경으로 취급(문서화).

**⑤ 안전망 확충**
- `tests/socket-auth.test.js` **15건**(강제·모니터 두 모드) → verify-all 신규 게이트 `contract-tests`(금액공식·설정wipe·소켓경계).
- health-check security **42→49**. 고장주입 검출: 소켓 2/3(3번째는 룸을 판정값으로 고정해 악용 불가=이중화)·멤버십 2/2·스캐너 1/1.

**⑥ Fable 지적 1건 = 결함 아님으로 종결** — `SettingsPage.tsx:5291` reservation_settings wipe 는 백엔드 `guardShallowSettings` 가 보존. 실 HTTP 왕복 증명 + 계약 박제.

**⑦ 배포 전 점검 (Irene "주문관리 제대로 되어 있어?")**
- 주문 생애주기 **12/12**(생성→주방큐→동시claim 1/5→printed→+Round 새품목만→단계4→금액정합→결제→익명401→크로스테넌트403, 테스트주문 완전삭제)
- 소켓 실사격 **8/8**(실서버 모니터 모드) · 역할 회귀 **0**(7역할×4경로 28호출 200)
- 운영 실측: 7일 415주문 · 금액 불일치 4건은 전부 테스트매장 배포 스모크 주문 · 음수/고아/과다수납 0 · **자동인쇄 ON 5개 매장 미인쇄 0**(미인쇄 266건은 자동인쇄 끈 매장 3곳의 정상 누적)

**⑧ v3.71 운영 배포** — Backup `20260726_154741` · 안전게이트 9/9 · mount sweep 크래시0 · 마이그 49/49 · Smoke 9/9 · 스키마 153테이블 동일 · 스냅샷 1788파일.
운영 실검증: 코드 반영 확인 + **타 매장 손님조회 3경로 403 / 자기 매장 200**. 릴리즈 블로그 `/blog/release-v3.71`(200) + 공지 id=103.

### 다음 확정 작업
- **소켓 인증 강제 전환(`SOCKET_AUTH_ENFORCE=true`)** — Irene "소켓 켜" 지시 시 비피크에 env 플립 + `pm2 restart --update-env`(**코드 무배포**, 롤백 30초) + 직후 카운터 재확인.
  ✅ 선행조건 충족 — emit 봉인이 v3.71 로 운영 반영됨(운영 코드 확인). 이제 켜면 join·emit 양방향이 함께 막힌다.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 🔴 **마감(Cash-up) 기대금액 0 잠복 결함** (2026-07-26 운영 실측) — `computeExpected` 는 `order_payments` 합산인데 운영 결제는 `PATCH orders` 로만 기록(7일 408건 중 **0행**). 마감을 닫는 순간 기대현금·기대카드가 0 → 센 현금 전액이 "초과". **아직 사고 없음**(shift 3건 전부 미마감, 마감기록 0건). 돈 무결성 = Fable 게이트 대상. [[reference_cashup_expected_zero_gap]]
- **Phase 2 — 게이트웨이 비밀키 응답 마스킹**: `guardPaymentSettings` nested `config` 보존 + SettingsPage write-only 마스크가 **같이** 가야 함(하나만 하면 저장 시 비밀키 silent wipe)
- **접근판정 4중화 통합**: resolver 1개 + 투영 2개. 순서 엄수 = shadow 1주 → 목록+게이트 → `userCanAccessRestaurant` 도메인별(소켓 최후) → `checkRestaurantAccess` 103라우트 최후. **선행조건 추가**: `/api/restaurants/:rid/*` 우산(마운트 순서 의존)을 명시 게이트로 바꾸는 것과 함께 가야 함. [[reference_restaurant_access_four_gates]]
- **Fable 발견 프론트 기존 결함 1건**: `mobile/OrderTypePage.tsx`·`PaymentPage.tsx` 폴백은 이번에 처리됨 / 남은 것 = 다른 하드코딩 경로 점검
- **health-check 소켓 케이스 추가분**(Fable 제안 잔여) · `/checkout-display` 강제 모드 전환 후 운영 카운터 재관측
- **rid=16 모바일 이월렛 QR 업로드 후 재오픈** — 코드·설정 완료, `qrImage` EMPTY 라 `availableIn=['pos']` 로 되돌려 둠
- 실프린터 종이 1회 확인(인쇄 신선도 잔여) · 윈도우앱 눈 확인 1회 · exe 코드서명 인증서(Irene 결정)
- IOI Mall 가동(운영 자격증명 수령 시) · `formatPaymentDisplay` 이월렛 서브타입 미반영(인쇄물) · 운영시간+라스트오더 · AI 음식인식 B2 · POS 헤더 접기
- ENCRYPTION_KEY 강화(go-live 직전) · 개발서버 sudoers `visudo -c`

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
