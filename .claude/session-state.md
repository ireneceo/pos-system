# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-27 (소켓 인증 강제 전환 + 운영 점검 + 네이티브앱 Fable 검증)
**버전:** **v3.71** (운영 — 2026-07-26) · 데스크탑앱 0.1.9 · 안드로이드앱 0.2.0
**작업 상태:** 완료. **dev↔운영 완전 동기 — 미배포 코드 0건**(체크섬 실측: 백엔드 0 / 프론트 0, main 번들 해시 동일)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-27)

**① 소켓 인증 강제 전환 — 운영 적용 (코드 배포 없음)**
- 운영 `.env` 에 `SOCKET_AUTH_ENFORCE=true` + `pm2 restart production-backend --update-env`.
  4개 네임스페이스(`/orders`·`/checkout-display`·`/kitchen`·`/display`)가 무토큰·위조 연결을 거부하고
  join·emit 을 인증 신원으로 검증 → v3.71 emit 봉인과 **양방향 결합 완성**.
- 전환 시각 2026-07-27 14:31 UTC(현지 22:31 — 마지막 주문 1h55m 전·미종료 주문 0건 = 비피크).

**② 전환 전 실측 (선행조건 증명, 추측 0)**
- 운영 모니터 카운터 20시간·291 핸드셰이크 → `withoutToken 0 / invalidToken 0 / crossRestaurant 0`
- 프론트 소켓 클라이언트 **11개 전부** 토큰 전송 · 손님(모바일) 소켓 사용 **0건**
- 판정에 필요한 claim = `id`·`role`·`restaurant_id`(브랜드/푸드코트는 owner_id 조회). 실제 로그인 토큰이 전부 보유
- 운영 계정: **Staff 12/12 restaurant_id 보유**. RA 19명 중 NULL 2명은 매장 0인 **미사용 테스트 계정** → 영향 실사용자 0

**③ dev 강제 모드 리허설**
- 라이브 실사격 **12/12** — 무토큰·위조 4NS 거부 / 타 매장 위조카트·강제초기화·회원붙이기(로열티) 드랍 /
  타 매장 join 거부로 카트캐시 재생 없음 / **자기 매장 카트 전달 정상(회귀 0)**
- 역할 커버리지 **9/9**(RA·BG·FG·Owner·SA·BM·FCM 자기 관할 매장 join 성사)
- `health-check` **156/156**(강제 모드 상태) · `tests/socket-auth.test.js` **15/15**

**④ 운영 전환 후 검증**
- 공개 엔드포인트 프로브 **5/5** — 무토큰 4NS + 위조 서명 전부 거부
- 실기기 재접속 `withToken 7` 수용 · `crossRestaurant 0` · 소켓 인증 오류 로그 0
- 카운터의 `withoutToken 4 / invalidToken 1` 은 **전부 검증 프로브**(origin `unknown`) — 실기기 거부 0

**⑤ 🔎 pm2 stale env 함정 발견**
- dev 에서 `.env` 에 flag 를 넣었는데 **안 켜졌다** — pm2 프로세스 env 의 낡은 `false` 를 **dotenv 가 덮지 않음**.
  에러가 안 나서 "켠 줄 알았는데 안 켜진" 무증상 상태가 생긴다.
- dev 를 `pm2 delete` + ecosystem 재기동해 `.env` 단일 소스 복구(재검증 12/12 유지).
- **규칙: env 플립은 설정이 아니라 동작으로 증명한다.** 메모리 [[reference_pm2_stale_env_dotenv]] 신설.

**⑥ 운영 전수 점검 (Irene "운영문제 없는지 확인해")**
- pm2 130MB·CPU 0.3% / `api/health` 200 / `purplehere.com` 200 / 디스크 36% / 메모리 여유
- 스케줄러 7종 전부 success(예약·구독·인보이스·몰매출·통계)
- **인쇄 생명선 정상** — 자동인쇄 ON 5개 매장(13·16·18·24·25) 미인쇄 **0**. rid 8·5 누적은 자동인쇄 OFF 매장의 정상 누적
- 금액 무결성 24h — 음수 0 / null 0 / 과다수납 0 / 고아주문 0
- 기존 항목 2건(오늘 변경과 무관): `ai-serving.js:36` rate-limit IPv6 keyGenerator 경고(부팅 1회) ·
  완료 주문의 `amount_paid` 가 2월부터 사실상 전부 0(POS 결제가 원장·amount_paid 미기록 — 매출 집계는 폴백이라 영향 없음)

**⑦ 기록 정정 — 미배포 코드 0건**
- "마감 기대금액 수정 = dev 완료·**미배포**" 는 **오기**. `routes/cash-management.js` 가 운영과 md5 동일 = 이미 배포됨
  (배포가 working tree 전체 rsync 라 v3.71 에 실려 나감 [[reference_selective_deploy_isolation]]).
- 전체 체크섬 대조: **백엔드 차이 0건 / 프론트 차이 0건**(main 번들 해시 동일) → 지금 `/배포` 는 의미 없음.
- 교훈: "미배포" 는 기억이 아니라 **체크섬으로 확인**한다.

**⑧ 네이티브앱 완성도 Fable 적대검증 (Irene "다 완료야? 완벽해? fable")**
- 판정: **둘 다 "완벽" 아님.** 코드·빌드·호스팅·피드·CTA 는 완료가 맞으나 —
- 🔴 **핵심 발견: 네이티브앱 실사용 매장 0개.** 운영 `print_device_status` 17행 전부 브라우저
  (`web-rawbt 8 / web 5 / web-qz 4`), `windows-app`·`android-app` **0행**. `detectPlatform()` 이 앱 안이면
  `__NATIVE_PRINT` 로 반드시 앱 라벨을 찍으므로 **측정 착오 아님**(내가 독립 재확인). 파일럿 with MIN(rid=10)조차
  현재 `web/browser`. `[print-trace] CLIENT` 는 7/1 이후 0건 → 7/15 "내일 빌 1장 확인" 이 **미확인 상태로 앱이 꺼짐**.
- 미완(위험도순): ①실사용 0(왜 껐는지 확인 필요) ②안드로이드 **V4 폴러 자동인쇄 미통과**(claim 되는데 0바이트=
  설계문서 "미해결 모순", 자동 주방인쇄가 앱의 존재 이유) ③안드로이드 실기기 검증 0회(BT SPP·종이·드로어·한글폰트 등 7종)
  ④exe 코드서명 인증서(Irene 결정) ⑤안드로이드 업데이트 피드 미구현(사이드로드 구버전 고착) ⑥실프린터 종이 확인 2건
- **소켓 강제 전환의 앱 영향 = 없음** — 두 앱 다 원격 웹번들만 로드, 네이티브 측 자체 socket.io **0건**
- 문서↔실제 불일치 2건을 설계 문서에 박아둠(`DESKTOP_APP_DESIGN.md`·`mobile-app/docs/ANDROID_APP_DESIGN.md` 상단 🔴 섹션)

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **소켓 전환 마무리 1건** — 매장 영업시간대(현지 낮) 카운터 재관측. 실사용 트래픽에서 거부 0 이면 전환 종료.
  거부가 보이면 롤백: 운영 `.env` 의 `SOCKET_AUTH_ENFORCE` 줄 제거 + `pm2 restart production-backend --update-env`(30초).
  백업 `/var/www/backups/env-before-socket-enforce-20260727` · `.env` 는 배포 rsync 제외라 배포해도 유지
- **네이티브앱 1순위: with MIN(rid=10)이 왜 앱을 껐는지 확인** — 불편해서 브라우저 회귀인지, 그냥 안 켠 것인지.
  이 답이 데스크탑앱의 진짜 완료 여부와 나머지 우선순위를 결정. 그다음 0.1.9 graphic 빌 종이 1장 + 자동업데이트 실작동 확인
- **안드로이드 V4 폴러 자동인쇄 모순 해결 → 실기기 방문 1회에 M3 7종과 묶어서 검증**(매장 왕복 1회 원칙)
- exe 코드서명 인증서 구매 여부 — **Irene 결정**
- 안드로이드 `latest.json` 피드 + `check-mobile-feed.js` + 인앱 업데이트 넛지(사이드로드 구버전 고착 방지)
- **결제 원장 일원화(별건)** — 결제 완료 시 OrderPayment 행을 남기면 결제 '시각'까지 정확해지고 교대 경계 문제도 사라짐.
  `amount_paid` 가 2월 이후 전부 0인 것도 같은 뿌리. 🔒 `orders-crud.js` 접촉이라 Irene 승인 + 실프린터 확인 필요
  [[reference_cashup_expected_zero_gap]]
- 마감 기대금액 — 이미 운영 반영됨. 매장이 마감을 쓰기 시작하면 **첫 마감 시 기대금액 실값 확인 1회** 권장(현재 교대 3건 전부 open)
- `ai-serving.js:36` rate-limit IPv6 keyGenerator 경고(기존 항목, AI 서빙 한정)
- **Phase 2 — 게이트웨이 비밀키 응답 마스킹**: `guardPaymentSettings` nested `config` 보존 + SettingsPage write-only 마스크가
  **같이** 가야 함(하나만 하면 저장 시 비밀키 silent wipe)
- **접근판정 4중화 통합**: resolver 1개 + 투영 2개. 순서 엄수 = shadow 1주 → 목록+게이트 →
  `userCanAccessRestaurant` 도메인별(소켓 최후) → `checkRestaurantAccess` 103라우트 최후.
  선행조건 = `/api/restaurants/:rid/*` 우산(마운트 순서 의존)을 명시 게이트로 전환 [[reference_restaurant_access_four_gates]]
- **rid=16 모바일 이월렛 QR 업로드 후 재오픈** — 코드·설정 완료, `qrImage` EMPTY 라 `availableIn=['pos']` 로 되돌려 둠
- IOI Mall 가동(운영 자격증명 수령 시) · `formatPaymentDisplay` 이월렛 서브타입 미반영(인쇄물) ·
  운영시간+라스트오더 · AI 음식인식 B2 · POS 헤더 접기
- ENCRYPTION_KEY 강화(go-live 직전) · 개발서버 sudoers `visudo -c`

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
