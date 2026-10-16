# 직원 출퇴근·휴가·휴일 — Fable 완료 검증(gate) 판정 (2026-10-16)

> 판정: Fable(리더) · 대상: 설계 `.claude/fable-design-20261016-staff-attendance.md`(Irene «권고대로» = Q1·Q2·Q3 A) 의 구현 · 개발서버만(운영 배포·운영 DB 쓰기 0).
> 게이트 종류: 신규 시스템 + 보안 경계(라우터 마운트·settingsGuard·kioskDevice) + 운영 DB 마이그(새 표 6+1·kiosk_devices 칸 1) = 공용 기준 `gate`.
> 앞선 Fable 세션이 한 일(DB 스키마·마이그 재실행·health 독립 실행·실호출 48/48·메일 렌더·print-guard bless·임시 파일·시험 네트워크 3줄 삭제)은 다시 하지 않고 **결과만 재확인**했다.

## 판정: **PASS** (개발서버 완료 · 운영 반영은 다음 배포 때)

## 근거 — 검증 규율 4조항

### ① diff 범위 대조 — 설계 §5 밖 변경 0
- 변경·신규 파일 전부를 설계 §5 표에 대조했다. 설계에 있는 것: 모델 7 + index.js · KioskDevice 칸 · kioskDevice 미들웨어(try/catch, ip 없으면 건너뜀, 실패해도 next) · utils 3(+attendanceEmail 1 = §4-4 메일 템플릿 자리) · routes/attendance.js(953줄, server.js 에 **정확한 경로** `/api/restaurants/:restaurantId/attendance` 로 마운트, 다른 /api/restaurants 라우터보다 앞) · notification-settings `staff_leave` · 메일 4언어 · 마이그 1 + 레지스트리 deploy · data/holidays MY-2026·2027 · health-check 5건 · 프론트 Attendance/ 14파일(최대 255줄, 800줄 제한 안) · App 라우트 3 + lazy · MainLayout **메뉴 줄만**(import 1 + 항목 3 + 섹션 visible 1 — `_printPollFn`·인쇄 블록 무접촉, diff 로 확인) · ProtectedRoute 모듈 잠금 3 · AuthContext time-clock=access_pos · i18n ns + attendance.json 4언어 · glossary · common.json nav 키.
- 설계에 없지만 설계 취지 안: `headless-page-sweep.js` 에 새 화면 7경로 추가(안전망 **확장**, 축소 아님) · `settingsGuard` 허용 키 `'attendance'`(아래 이탈 ②의 짝).
- 이 작업이 아닌 미커밋(다른 방, 이미 Fable PASS): `routes/product-ingredients.js` · `ProductIngredientsTab.tsx` · `locales/*/brand.json` · health-check 의 «바꾸고 삭제 2차» 블록 · `tsconfig.verify.tsbuildinfo`(타입 검사 부산물). 이 판정 범위 밖 — 섞지 않음.
- 🔒 인쇄 보호 8파일: `check-print-guard.js` **8/8 변경 없음**(기준 2026-10-16T12:57 bless — MainLayout 메뉴 줄 변경 하나만 반영됐음을 manifest diff 로 확인: 바뀐 지문은 MainLayout 1개뿐). KDS 무접촉.

### ② 가드·안전망
- 라우트 가드는 **파일 안**: 전 경로 `authenticateToken + checkRestaurantAccess + requireRestaurantModule('staff_attendance')`, 관리 API 는 + `requireRole('Restaurant Admin','System Admin')`, 직원 본인 API 는 `requireOwnStaff`(같은 매장 Staff/RA 만) 또는 `req.user.id` 강제(balance·requests 에서 남의 user_id → 403). 공개 라우트 추가 0. 전역 `router.use` 가드 0(메모리 [[reference_router_use_leaks_to_api_root]] 준수).
- PIN 4자리 대입 방지: `pinLimiter`(사용자·매장 키, 1분 20회, PIN 없는 요청은 건너뜀).
- 주소 판정 `utils/clientIp.js`: 소켓 상대가 루프백일 때만 `X-Real-IP`(없으면 XFF **마지막** 칸) · Cloudflare 대역일 때만 `CF-Connecting-IP` 신뢰. **개발 nginx 는 `proxy_set_header X-Real-IP $remote_addr` 로 덮어쓴다**(/etc/nginx/sites-enabled/dev.purplehere.com:53·68 실측) → 손님이 꾸민 X-Real-IP 는 도달하지 못함. 고장주입(XFF 첫 칸 신뢰로 바꾸면 위조 통과 → 원복) 결과 그대로 인정.
- 열린 출근 1건 보장은 **DB UNIQUE(open_user_id)** 가 최종 방어(코드의 사전 조회는 멱등 응답용) — 고장주입(UNIQUE 제거 → 동시 3번에 3줄) 반증 1회 인정. 퇴근은 `FOR UPDATE` 행 잠금 트랜잭션.
- `check-sensitive-diff`: ③ 스키마 10건 · ⑤ 보안 경계 3건 · 안전망 3건(health-check·sweep·sensitive-diff 자체) → 게이트 대상 판정이 맞고, 안전망 변경 3건은 모두 **검사 추가**(축소 0).

### ③ 실호출·회귀 (앞 세션 실행 · 결과 재확인)
- API 실호출 48/48(설계 §6 시나리오 1~9) · 고장주입 2건 잡힘 후 원복 48/48 · 키오스크 자동 따라가기 확인.
- health-check security **89/89** · pos **55/55**(새 5건 포함) — `/tmp/fable-hc.log` 재확인. verify-all --full 21/24(실패 3 = print-guard·health 보호파일 → MainLayout 지문, **지금은 bless 돼 8/8** / deploy-ready = 배포 기록 파일 없음 → 이번 작업 아님, /배포 방 몫).
- 실브라우저: mount sweep 714초 크래시 0(새 7경로 포함) · 클릭 흐름 12/13(실패 1 = 직원 사이드바 2단 패널이 접혀 «My Attendance» 를 자동 클릭이 못 찾음 — 메뉴는 «Team & Marketing» 안에 있고 코드상 `visible` 조건이 맞다. 결함 아니라 시험 스크립트의 패널 펼치기 누락으로 판정).
- 화면 검사: 타임존 없는 `toLocale*` 0 · 로컬 `styled.button/table` 0 · design-guard 신규 0 · i18n 오류 0 · tsc 431건(기준 439, 새 파일 0).
- 개발 DB 실측(지금): 모듈 `staff_attendance`(id 162, restaurant, 0원, ui_routes 3) 등록 · plan_templates restaurant·brand·foodcourt·owner 전부 포함(supplier 제외) = Q3 A · `attendance_networks` 데모 38 시험 3줄 **삭제 확인(0줄)** · 시험 계정 2559·2560·2561 `is_test=1`, 메일은 없음/@example.com · 데모 38 설정 기본값(network_restriction false).

### ④ 배포 안전성
- 마이그 `migrate-create-staff-attendance.js`: `CREATE TABLE IF NOT EXISTS` 6 · kiosk_devices 칸은 SHOW COLUMNS 뒤 ADD · 모듈 findOrCreate + 요금제 `included_modules` 에 없을 때만 추가 · 끝에 포함 검증 후 `process.exit` · 레지스트리 `deploy` 등록 → 재실행 멱등(앞 세션 재실행 확인). 기존 표 ENUM 변경 0(expand-only 규칙 해당 없음).
- 롤백 = 코드만 되돌리면 됨(새 표·칸은 남아도 무해). SW 버전은 **아직 안 올림** — 배포 묶음 때 1회(규칙대로).

## 설계 이탈 3건 — 전부 **수용**
1. **IPv6 는 /64 로 비교** — 수용. IPv6 는 같은 와이파이라도 폰마다 뒤 64비트가 다르고 수시로 바뀌므로 주소 그대로 비교하면 설계 의도(«같은 회선») 가 깨진다. /64 는 회선 1개의 표준 단위이고 모바일 통신사는 기기마다 다른 /64 를 주므로 모바일데이터가 통과하는 일은 없다. 검사·등록이 같은 `networkKey` 를 쓴다(검사와 수정 같은 조건 규칙 준수). 저장 형식 `xxxx:xxxx:xxxx:xxxx::/64` 는 VARCHAR(45) 안.
2. **설정 저장 = guard 대신 행 잠금 읽기 → `attendance` 칸만 교체 → 통째 저장 + settingsGuard 허용 키 `'attendance'` 추가** — 수용. 설계가 guard 를 요구한 이유(부분 저장이 다른 칸을 지우는 사고 방지)를 **더 엄격하게** 만족한다: 다른 칸은 손대지 않고 원문 그대로, JSON 파싱 실패 시 덮어쓰기 거부, `FOR UPDATE` 로 동시 저장 경합 차단. guard 의 RA 게이트는 라우트의 `requireRole(RA·SA)` 로 동등. 허용 키 추가는 **필수 짝**이다 — 없으면 일반 설정 화면 저장 round-trip 이 `attendance` 를 조용히 지워 네트워크 제한이 꺼진다.
3. **«앱 알림» = Today/Leave 탭 대기 배지 + 메일** — 수용. 코드베이스에 앱 안 알림함(수신함 표)이 없다(모델은 StockAlert 뿐). `sendNotificationBatch(ids,'staff_leave',…)` 는 메일 경로이고 발송 가드(6관문)가 메일 없는 직원은 건너뛴다. 설계 §4-4 «in-app» 은 존재하지 않는 장치였으므로 배지가 올바른 대체.

## 비차단 지시 (배포를 막지 않음 — 기록·다음 일)
- **Opus**: `followKioskAddress` 가 루프백·사설 주소도 등록한다(개발 DB 데모 매장 1 에 `kiosk_auto 127.0.0.1` 1줄 — health-check 키오스크 시험의 부산물). 운영에선 키오스크가 루프백으로 올 수 없어 무해하나, 다음 손볼 때 루프백·사설 대역은 건너뛰거나 health-check 키오스크 시험 뒷정리에서 지운다. 지금 변경 금지(지문 유지).
- **Opus**: 직원 2단 사이드바 클릭 흐름 1건은 시험 스크립트가 패널을 펼치지 않은 것 — 다음 클릭 시험 때 펼치기 1줄 추가. 코드 변경 아님.
- **/배포·운영검증 방**: 설계 §7 그대로 — 운영 배포 뒤 RA 가 «지금 네트워크 등록» 을 눌렀을 때 주소가 Cloudflare 대역이 아닌지 1회 본다(대역이면 운영 nginx 가 CF 헤더를 안 넘긴 것 — 그때 `proxy_pass_request_headers` 확인). 운영 nginx 는 이 판정에서 **확인 못 함**(개발 nginx 만 실측).
- **Irene 할 일(배포 뒤 · 실기기 · check:true)**: 매장 와이파이 폰 → 출근 ok / 모바일데이터 폰 → «매장 네트워크가 아닙니다» / 관리자 PIN → 통과 + 네트워크 자동 등록. 메일 실수신 1회.
- **확인 못 한 것(기록)**: 모듈 없는 매장 403(데모는 모듈 검사 건너뜀 · Q3=A 라 전 요금제 포함이므로 실제로는 닿지 않는 경로 — 요금제 B 로 바꿀 때 1회 확인) · 메일 실수신 · 실기기 네트워크 전환.
- deploy-ready 실패(배포 기록 파일 없음)는 이 작업 아님 — 배포 묶음 때 /배포 방이 만든다. SW 버전도 그때 1회.

## 마커
`node dev-backend/scripts/fable-gate.js pass --note "…"` 1회 — 이 파일 저장 **뒤** 실행(지문에 이 파일이 들어가야 하므로). 이후 코드·문서 한 줄이라도 바뀌면 마커가 무효가 되는 것이 정상(session-state.md 만 예외).
