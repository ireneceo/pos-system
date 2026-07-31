# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-07-31 10:30, idle 2675s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: CASH_MANAGEMENT_SHIFT_CLOSE.md
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-07-27 #2 (소켓 강제 전환 + 윈도우앱 인쇄 6건 수리 + AI 카메라 서빙 운영 활성화·배포)
**버전:** **v3.71** (운영 — 2026-07-26) · 데스크탑앱 0.1.9 · 안드로이드앱 0.2.0
**작업 상태:** 완료. **운영 배포됨** (Backup 20260727_184955 · Smoke 9/9). 윈도우앱 0.1.10 빌드는 진행 중·미게시

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


### 완료된 작업 (2026-07-27 #2 — AI 카메라 서빙 + 윈도우앱 인쇄 결함 수리)

**⑨ 윈도우앱 인쇄 결함 6건 수리 (Fable 포렌식 → 수정 → Fable 게이트)**
- Fable 포렌식으로 with MIN 좌초 원인 규명: **회귀가 아니라 채택 실패**. 8일간 5개 빌드(0.1.0→0.1.8)를
  거치며 빌이 제대로 나온 적이 한 번도 없었고, 진짜 수리(0.1.9 래스터)는 **이탈 다음 날** 도착 → 미검증.
- 수정 6건: D1 부분전송 후 GDI 전량 재인쇄(중복) / D2 타임아웃 미취소 + 예산부족(20s < winspool 15s)
  / D3 스풀러 수신을 성공으로 오인 / D4 프린터명 완전일치 / D5 진단 유실 / D6 8000px 무음 절단
- **Fable 게이트 CONDITIONAL GO** → 내 수정이 만든 신규 결함 2건 적발·수정:
  **C1** 상태 프로브가 같은 15s 안에서 돌아 이미 인쇄된 티켓을 TIMEOUT 으로 보고(→폴러 재인쇄=중복)
  **C2** 슬라이스 캡처의 스크롤바 인쇄 + 마지막 이음매 한 줄 중복(수학적으로 확정)
- D3 은 설계 변경: 사전 차단 = CLAUDE.md "printer-availability 게이트 재도입 금지" 위반 →
  **막지 않고 사후 경고만**(스풀된 작업은 용지 채우면 인쇄되므로 실패 처리 시 오히려 중복)
- MAX_SLICE_DIP=8000 = 0.1.9 클램프 지점과 동일 → **기존에 잘 나오던 티켓은 단일 촬영 경로 유지**(회귀 0)
- 순수 로직을 `budget.js`·`psResult.js` 로 분리(6건 전부 테스트가 닿지 않는 코드에 있었던 게 근본)
- 회귀 **66/66** · verify-all **14/14** · 🔒 인쇄 보호파일 **8/8 무접촉** · 버전 0.1.10

**⑩ AI 카메라 서빙 — 운영에서 못 쓰던 것 수리 (v3.72 배포)**
- Irene "Menu Photos 뭐야? 카메라로 찍으면 아이템 열어줘야지. Items 안에 있어야 하는 거 아니야?"
- **화면 통합**: 존 필터 바의 Menu Photos·Serve Cam 칩 2개 제거 → **Floor Plan > Items 안** 툴바로 이동.
  카메라를 주 버튼(보라)으로, 문구 `Serve Cam` → **"Find by photo"**. 촬영→인식→서빙 흐름은 원래 맞게
  구현돼 있었고 **진입점만 서빙 화면 밖에 있던 것**이 문제였다.
- **Vertex(진짜 AI) 실배선**: 껍데기(호출 시 에러)를 실제 동작 코드로 — 서비스계정 인증·REST predict·
  512px 정규화·L2 정규화. 자격증명 없으면 local-color 자동 폴백(기능 안 죽음). `google-auth-library` 추가.
- **콜드스타트 제거**: 레퍼런스 임베딩 시드가 "첫 recognize 가 refs=0 을 보면 그때" 시작이라
  **처음 쓰는 사람은 반드시 인식 실패**를 봤다(운영 recognition_logs 0행의 이유). 카메라 화면 열 때
  `POST /prepare` 로 미리 시작(멱등). dev 실측: 0장 → 1.5초 만에 임베딩 생성.
- 🔴 **운영 403 발견**: 기능·화면이 다 배포돼 있었는데 **운영 Enterprise 요금제에 `ai_serving` 이 없어서**
  매장이 쓰면 MODULE_NOT_INCLUDED. dev 에만 있고 운영엔 반영된 적 없었다(내가 dev 만 보고 "열려 있다"고
  한 것을 실측으로 정정). → 멱등 마이그 `migrate-ai-serving-enterprise.js` + 레지스트리 등록(deploy).
- **운영 검증**: 403→200 · with MIN **220건**/K-DINE **76건** 임베딩 생성 · 유료 Basic 매장은 **403 유지**
  (rid13 200 은 데모매장=기존 의도 동작) · 인식 API 왕복 200(후보 산출 확인)
- **가격·티어 실측 정정**: Enterprise 실판매가는 이미 **RM179**(`plan_prices`, `plan_templates` 의 99 는
  미사용 옛 필드). `ai_serving` 도 Enterprise 전용 — 바꿀 게 없었다.

**⑪ v3.72 운영 배포** — Backup `20260727_184955` · Smoke **9/9** · 안전게이트 통과 · 스냅샷 1791파일
· verify-all **--full 15/15**(mount sweep 8역할 664초 크래시0) · 소켓 인증 강제 배포 후에도 유지 확인


### 🙋 Irene 이 해야 할 일 (다음 세션 안내용 — 내가 못 하는 것만)

**1. 윈도우앱 실프린터 종이 확인 1회 — 우선순위 높음**
- 다운로드: https://purplehere.com/desktop/PurplePOS-Setup.exe (0.1.10, 자동 게시 완료)
- 확인할 것 딱 2장: **빌 1장** + **긴 주방티켓 1장**(품목 많은 주문). 앱 안 진단창의 "전체 인쇄 테스트" 로도 가능
- 볼 것: ①글자·한글 정상 ②우측에 회색 띠(스크롤바) 없음 ③같은 줄 두 번 인쇄 없음 ④종이 1장으로 잘림(중간에 안 끊김)
- **왜 필요한가**: 오늘 고친 8건은 전부 "바이트를 보내는 규칙"이라 서버에서는 논리검증까지만 됐다.
  서버에 프린터가 없다. 이 확인 없이 매장에 주면 with MIN 좌초 사이클(배포→미검증→매장 재실패)의 6번째가 된다.
- 매장 말고 **아무 실프린터**면 된다. 이상 있으면 사진 한 장 주시면 원인 잡는다.

**2. Vertex 자격증명 (진짜 AI 켜기) — 코드는 이미 완료, 키만 없음**
- Google Cloud 콘솔에서: 프로젝트 생성 → Vertex AI API 사용 설정 → 서비스 계정 생성
  (역할 **Vertex AI User** 하나면 충분) → **JSON 키** 다운로드
- 나에게 줄 것: **프로젝트 ID** + **JSON 키 파일**
- 내가 할 일: `/opt/secrets/vertex-sa.json` 배치 + env 2줄(`VERTEX_PROJECT_ID`, `GOOGLE_APPLICATION_CREDENTIALS`)
  + `AI_VISION_PROVIDER=vertex` → 재시작이면 끝. 기존 임베딩 재생성도 자동
- **비용**: 촬영 1회당 과금, 안 쓰면 0원(상시 리소스 없음). 매장당 월 US$1~7 추정, Enterprise 가격에 흡수
- **급하지 않다**: 지금 색 비교 방식으로도 인식이 돈다. 매장에서 몇 번 촬영해 정확도를 본 뒤 결정해도 된다

**3. with MIN 에 물어볼 것 (앱 재도전 시)**
- "앱에서 계속 났던 문제가 정확히 뭐였나요?" — 빌 백지 외에 포기를 굳힌 사건이 있었는지
- "앱이 아직 PC에 설치돼 있나요?" — 남아 있으면 켜는 것만으로 0.1.10 자동업데이트가 붙는다

**4. 결정 대기 (급하지 않음)**
- exe 코드서명 인증서 구매 여부 — 미서명이라 설치 시 SmartScreen 경고. 신규 매장 설치의 최대 마찰
- 안드로이드앱은 **테스트 매장이 아예 없다** → 실기기 검증 7종은 "개발 부채"가 아니라 **테스트할 곳이 생겨야** 진행

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **소켓 전환 마무리 1건** — 매장 영업시간대(현지 낮) 카운터 재관측. 실사용 트래픽에서 거부 0 이면 전환 종료.
  거부가 보이면 롤백: 운영 `.env` 의 `SOCKET_AUTH_ENFORCE` 줄 제거 + `pm2 restart production-backend --update-env`(30초).
  백업 `/var/www/backups/env-before-socket-enforce-20260727` · `.env` 는 배포 rsync 제외라 배포해도 유지
- **윈도우앱 0.1.10 실프린터 종이 확인 1회** — 인쇄 결함 6+2건 수정분. 서버에 프린터가 없어 논리검증까지만 됨.
  Fable 이 실프린터로만 확인 가능한 항목 명시: 1m 넘는 긴 티켓 이음매·드라이버 상태보고·이름변경 복구.
  **매장에 다시 주기 전에 아무 실프린터로 1장** — 이 확인 없이 배포하면 with MIN 좌초 사이클의 6번째가 된다
- **AI 서빙 실제 인식률 확인** — 운영에 임베딩 생성 완료(with MIN 220건). 색 비교 방식으로 실제 음식이
  얼마나 맞는지 매장에서 몇 번 촬영해 보고, 부족하면 Vertex 전환(자격증명 필요)
- **Vertex 자격증명 대기** — GCP 프로젝트 ID + 서비스계정 JSON(역할 Vertex AI User).
  받으면 `/opt/secrets/vertex-sa.json` + env 2줄(`VERTEX_PROJECT_ID`,`GOOGLE_APPLICATION_CREDENTIALS`)로 켜짐.
  코드는 이미 실배선 완료 — 안 쓰면 과금 0(호출당 과금·상시 리소스 없음)
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
