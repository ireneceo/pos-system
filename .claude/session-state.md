# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-25 (**매장 크로스테넌트 과다노출 수정 — dev 완료·미배포, Fable VERDICT GO**)
**버전:** **v3.70** (운영 — 2026-07-24) · 데스크탑앱 0.1.9 · 안드로이드앱 0.2.0
**작업 상태:** 완료 (dev 검증 전부 통과 · 운영 미배포 — `/배포` 지시 대기)

### 진행 중인 작업
- 없음

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
- **매장 크로스테넌트 수정 운영 배포** — dev 검증 완료·Fable GO. Irene `/배포` 지시 시 진행
- **소켓 인증 강제 전환(`SOCKET_AUTH_ENFORCE=true`)** — Irene "소켓 켜" 지시 시 비피크에 env 플립 + `pm2 restart --update-env`(**코드 무배포**, 롤백 30초) + 직후 카운터 재확인

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **Phase 2 — 게이트웨이 비밀키 응답 마스킹**: `guardPaymentSettings` nested `config` 보존 + SettingsPage write-only 마스크가 **같이** 가야 함(하나만 하면 저장 시 비밀키 silent wipe). 별도 Fable 게이트 대상
- **접근판정 4중화 통합**: resolver 1개 + 투영 2개. **순서 엄수** = shadow 1주 → 목록+게이트 → `userCanAccessRestaurant` 도메인별(소켓 최후) → `checkRestaurantAccess` 103라우트 최후. [[reference_restaurant_access_four_gates]]
- **Fable 발견 프론트 기존 결함 2건**: `SettingsPage.tsx:5291` 빈 객체 PUT 로 `reservation_settings` wipe(설정 wipe 계열) · `mobile/OrderTypePage.tsx:396,471`·`PaymentPage.tsx:1393` 하드코딩 `'1'` 폴백 → **손님이 다른 매장에 붙음**
- **`/checkout-display` emit 4곳 `restaurantId` 미검증**: 인증 계정이 타 매장 고객화면에 위조 장바구니 표시·강제 초기화, `customer-checkin` 은 타 매장 진행 중 판매에 회원을 붙여 **로열티 적립**까지 닿음
- **health-check 소켓 케이스 7건 추가**(Fable 제안 목록) · `check-route-guard.js` 를 프리픽스 마운트 라우터까지 스캔 확장(baseline 판단 필요)
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
