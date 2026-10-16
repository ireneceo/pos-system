# 직원 출퇴근·휴가 관리 — Fable 설계 (2026-10-16)

> 작성: Fable (리더) · 요청: Irene 2026-10-16 · 상태: **설계 — Irene 결정 3건 대기(§0)**. 코드 변경 0.
> 범위: 매장(Restaurant) 직원(role=Staff)만. 급여는 다음 단계(§9 에 «급여 때 쓸 자리» 만 남김).
> 규모: 새 표 6개 + 새 라우트 파일 + 새 화면 3개 = **대규모**. 구현은 이 문서를 설계로 삼아 Opus 가 하고, 끝난 뒤 Fable `gate` 검증 1회(새 시스템 + 보안 경계 + 운영 DB 마이그).

## Irene 원문 (그대로)
«스탭들 출퇴근 관리 좀 하자. 휴일하고, 휴일신청하고 승인하는 거랑, 출퇴근 찍는 거. 일단 급여는 빼고. 나중에 급여처리 할까 하는데 나라마다 달라서 어떻게 할지 모르겠네. 급여는 다음 테스트로 넘기자. 그리고 출퇴근 되는 건 같은 와이파이로 연결된 경우만 되게 하는 설정도 있게 해줘. 위치를 체크하는 좋은 방법이라. 검토하고 말해줘. 레스토랑에 추가한 스탭들만 정리되면 되는데. 다른 역할들까지는 필요없어. 매니저 같은 경우 없어도 되고 일단 레스토라에서만.»

---

## 0. Irene 가 정할 것 (3건) — 나머지는 Fable 이 정했고 §1~§8 에 반영

| # | 정할 것 | 선택지 | 각 결과 | Fable 권고 |
|---|---|---|---|---|
| Q1 | **매장 공용 태블릿(POS)에서 PIN 으로 찍기** 를 1차에 넣나 | A 넣는다 / B 개인 폰 로그인만 | A: 주방 직원처럼 폰을 안 꺼내는 사람도 카운터 태블릿에서 4자리 PIN 으로 찍음(기존 캐셔 PIN 재사용, 화면 1개 추가). B: 모든 직원이 자기 계정으로 로그인해 찍음 — 화면은 줄지만 폰 없는 직원은 못 찍음 | **A**. 식당 현장 표준(Toast·Square 도 PIN 타임클락). 추가 비용은 화면 1개·API 는 같은 것 |
| Q2 | **휴가 잔여일(연차 몇 일 남았나)** 추적을 1차에 넣나 | A 넣는다(직원별 연간 일수 입력 → 잔여 자동) / B 신청·승인만 | A: 승인 화면에 «잔여 12일 → 승인하면 10일» 이 보임, 직원도 자기 잔여 봄. B: 종이 수첩처럼 승인만 — 몇 일 썼는지는 목록 세어야 함 | **A(가벼운 형태)**. 일수를 안 적은 직원·종류는 «추적 안 함» 으로 비워 둘 수 있게 — 넣는 쪽 비용이 작고(표 1개), 없으면 승인 판단을 할 근거가 없음 |
| Q3 | **요금제 모듈 취급** | A 모든 매장 요금제에 포함(지금은 무료) / B 상위 요금제만 | A: 전 매장 바로 씀. 모듈 키(`staff_attendance`)는 만들어 두니 나중에 B 로 바꾸는 건 요금제 표만 고치면 됨. B: Basic 매장은 메뉴가 안 보임 | **A**. 첫 출시는 많이 쓰게 해 피드백을 받고, 유료 분리는 급여까지 붙은 뒤 |

Fable 이 정한 것(묻지 않음): 관리자 = **Restaurant Admin(+System Admin)** 만 — 지금 직원 관리 화면과 같은 범위(Owner·브랜드·푸드코트 제외, Irene «레스토랑에서만») · 네트워크 제한 기본값 **꺼짐**(매장이 네트워크를 등록한 뒤 켠다) · 근무표(로스터)·교대 배정·급여는 **비범위**.

---

## 1. 기능 정의

### 1-1. 세 덩어리
1. **출퇴근 찍기** — 직원이 «출근»·«퇴근» 을 누르면 시각·방법·네트워크 검사 결과가 기록된다. 하루 여러 번 가능(점심 끊고 저녁 다시 = 기록 2줄). 열린 출근(퇴근 안 찍음)은 직원당 **하나만**.
2. **휴가 신청·승인** — 직원이 종류·기간(반차 가능)·사유로 신청 → 관리자가 승인/반려. 승인된 휴가는 달력에 보이고 잔여일(Q2)에서 빠진다.
3. **휴일 달력** — ① 매장 휴일(공휴일·매장 휴무일) ② 직원별 주간 쉬는 요일(예: 월). 휴가 일수 계산과 «오늘 나와야 하는 사람» 판단의 기준.

### 1-2. «같은 와이파이» 검사 — 검토 결과 (Irene «검토하고 말해줘»)
- **웹 화면은 와이파이 이름(SSID)을 읽을 수 없다.** 브라우저가 보안상 막는다. 네이티브 안드로이드 앱은 읽을 수 있지만 실사용 0 이라 기준으로 삼지 않는다.
- **대신 «같은 인터넷 회선인가»** 를 본다 = 매장 라우터가 밖으로 나가는 공인 주소(서버가 보는 손님 주소)가 등록된 것과 같은가. 매장 와이파이에 붙은 폰은 전부 같은 공인 주소로 나오고, 집·모바일데이터는 다른 주소다. **실제로는 «같은 와이파이» 와 거의 같은 뜻**이고, 위조는 사실상 불가능(서버가 직접 본 주소라 손님이 꾸밀 수 없다).
- 한계 3개(그대로 안내): ① 매장 회선 주소가 바뀔 수 있다(라우터 재부팅·통신사 교체) → **자동 복구 장치**를 둔다(아래) ② 같은 건물 다른 가게가 같은 회선을 쓰면 통과(드묾) ③ 모바일데이터로는 못 찍는다(의도한 바).
- **자동 복구(설정 떠넘기지 않기 — 메모리 [[feedback_auto_over_manual_setup]])**: 주소가 바뀌어 직원이 막히면 화면에 «매장 네트워크가 아닙니다 — 관리자 확인» 이 뜨고, **관리자가 그 자리에서 자기 PIN 을 넣으면** 출근이 기록되고 **지금 주소가 매장 네트워크로 자동 등록**된다(관리자가 매장에 있음을 확인한 셈). 등록 키오스크 태블릿이 있는 매장은 그 기기가 서버에 닿을 때마다 보이는 주소를 **자동으로 따라간다**(키오스크는 늘 매장 안에 있으므로).
- **서버가 손님 실제 주소를 보려면 손볼 것 1개(백엔드 안에서 해결)**: 지금은 Cloudflare 를 거쳐 와서 `req.ip` 가 Cloudflare 쪽 주소다. `utils/clientIp.js` 하나를 만들어 — nginx 가 넘긴 연결 주소가 Cloudflare 대역이면 `CF-Connecting-IP` 헤더를, 아니면 연결 주소를 쓴다(Cloudflare 대역 표는 코드에 상수 + 주석에 출처). **nginx·운영 서버 설정 변경 없음**, Irene 할 일 없음. 구현 때 개발서버에서 «내 폰 주소가 맞게 찍히나» 1회 확인.

### 1-3. 찍는 방법 2가지 (Q1=A 기준)
| 방법 | 누가·어디서 | 식별 | 네트워크 검사 |
|---|---|---|---|
| **내 출퇴근(폰)** | 직원이 자기 계정으로 로그인한 폰/PC, 메뉴 «My Attendance» | 로그인 토큰 | 설정이 켜져 있으면 함 |
| **타임클락(공용 태블릿)** | 매장 POS 태블릿의 «Time Clock» 전체화면 — 로그인된 세션(관리자 또는 access_pos 직원) 위에서 | **4자리 PIN**(기존 `users.pin_code`, 매장 안 유일) → 그 직원으로 기록 | 똑같이 함(태블릿은 매장 안이라 늘 통과; 설정이 꺼진 매장도 그대로 동작) |

PIN 화면은 토큰을 새로 발급하지 않는다(기존 `/api/staff/verify-pin` 과 다른 점) — 찍기만 하고 끝. 1분 안에 같은 PIN 으로 두 번 눌러도 1건.

### 1-4. 관리자가 하는 일
- 지금 누가 출근 중인가(실시간) · 기간별 기록·근무시간 합계 · **기록 고치기**(시각 수정, 사유 필수, 원래 값 보존) · 수동 추가(찍는 걸 잊은 날)
- 퇴근 안 찍고 16시간(설정) 지난 기록은 «미퇴근» 표시 → 관리자가 닫는다(자동으로 닫지 않는다 — 잘못된 시간을 만들어 내지 않기 위해)
- 휴가 승인/반려(메모) · 승인 뒤 시작 전 취소 가능 · 휴가 종류·직원별 연간 일수(Q2) · 매장 휴일 · 직원 쉬는 요일 · 네트워크 제한 설정

### 1-5. 비범위(다음)
근무표/교대 배정 · 급여(§9) · 지각/초과근무 판정 규칙 · 지문/얼굴 인식 · 사진 찍기 · GPS(폰 위치는 위조 쉬워 Irene 와이파이 방식이 더 낫다) · Owner/브랜드/푸드코트 화면 · 네이티브 앱 SSID 읽기.

---

## 2. 데이터 구조 (새 표 6개 + 설정 JSON 1칸)

모든 시각은 UTC 로 저장, **표시·하루 경계는 매장 타임존**(`utils/dateTimeHelper.getRestaurantTimezone` · `getDateBounds`). `work_date` 는 출근 시각을 매장 타임존으로 본 날짜(집계 키).

### 2-1. `attendance_records` — 출퇴근 1회 = 1줄
| 칸 | 형 | 뜻 |
|---|---|---|
| id, restaurant_id, user_id | INT | user 는 role=Staff 또는 Restaurant Admin(관리자도 찍을 수 있게) |
| work_date | DATE | 매장 타임존 기준 출근 날짜 |
| clock_in_at | DATETIME | |
| clock_out_at | DATETIME NULL | NULL = 열림 |
| **open_user_id** | INT NULL **UNIQUE** | 열려 있는 동안 = user_id, 닫히면 NULL → «직원당 열린 출근 1개» 를 DB 가 보장 |
| clock_in_method / clock_out_method | ENUM('self','pos_pin','admin') | 폰 / 태블릿 PIN / 관리자 수동 |
| clock_in_ip / clock_out_ip | VARCHAR(45) | 서버가 본 손님 주소 |
| clock_in_network / clock_out_network | ENUM('ok','off','override') | 검사 통과 / 제한 꺼짐 / 관리자 PIN 으로 통과 |
| override_by | INT NULL | 관리자 PIN 으로 통과시킨 관리자 |
| status | ENUM('open','closed','corrected') | |
| original_clock_in_at / original_clock_out_at | DATETIME NULL | 고치기 전 값(최초 1회만 채움) |
| corrected_by, corrected_at, correction_reason | | 고친 기록 |
| note | VARCHAR(255) | |
| created_at, updated_at | | |
인덱스: (restaurant_id, work_date) · (user_id, clock_in_at) · UNIQUE(open_user_id)

### 2-2. `staff_work_profiles` — 직원 근무 기본(users 표에 칸 안 늘림)
user_id PK · restaurant_id · `rest_days` JSON(요일 배열, 예 `[1]`=월) · `joined_at` DATE NULL · created/updated.
→ 급여 때 시급·급여 종류 칸이 **여기** 붙는다(§9). 없는 직원은 «쉬는 요일 없음».

### 2-3. `leave_types` — 매장별 휴가 종류
id · restaurant_id · code VARCHAR(30) · name VARCHAR(60) · is_paid BOOL · default_days DECIMAL(5,1) NULL(연간 기본 일수, NULL=추적 안 함) · requires_approval BOOL 기본 true · color CHAR(7) · is_active · sort_order. UNIQUE(restaurant_id, code).
매장이 처음 열 때 **말레이시아 기본 4종** 자동 생성: Annual(8일·유급) · Sick(14일·유급) · Unpaid(추적 안 함) · Emergency(추적 안 함). (고용법 1955 최소 기준 — 관리자가 바꿀 수 있음.)

### 2-4. `leave_entitlements` — 직원별 연간 일수 (Q2=A)
id · restaurant_id · user_id · leave_type_id · year SMALLINT · days DECIMAL(5,1). UNIQUE(user_id, leave_type_id, year).
잔여 = days − 그 해 승인된 신청 일수 합(저장하지 않고 계산). 행이 없으면 종류의 default_days, 그것도 NULL 이면 «추적 안 함».

### 2-5. `leave_requests`
id · restaurant_id · user_id · leave_type_id · start_date · end_date · half_day ENUM(NULL,'am','pm')(하루짜리일 때만) · days DECIMAL(5,1)(제출 시 계산해 저장) · reason VARCHAR(500) · status ENUM('pending','approved','rejected','cancelled') · decided_by · decided_at · decision_note VARCHAR(500) · cancelled_by · cancelled_at · created/updated.
인덱스 (restaurant_id, status, start_date) · (user_id, start_date).
**일수 계산**(한 함수 `utils/leaveDays.js`): 기간의 날짜 중 매장 휴일(2-6)과 그 직원 쉬는 요일(2-2)을 뺀 수, 반차면 0.5. 겹치는 기간에 pending/approved 가 있으면 400.

### 2-6. `store_holidays` — 매장 휴일
id · restaurant_id · date DATE · name VARCHAR(100) · kind ENUM('public','store_closed') · created_by. UNIQUE(restaurant_id, date, kind).
«국가 공휴일 가져오기» 는 저장소의 정적 표 `dev-backend/data/holidays/MY-<연도>.json`(전국 공휴일만, 주 공휴일은 수동)에서 넣는다(멱등).

### 2-7. 설정 — `restaurants.operation_settings.attendance` (새 표 없음)
```json
{ "network_restriction": false, "allow_self_clock": true, "allow_pos_pin_clock": true,
  "open_session_flag_hours": 16, "pin_override_registers_network": true }
```
저장은 **전용 라우트가 읽어서 합친 뒤 통째로 저장**한다(부분 저장이 다른 칸을 지우는 사고 — 메모리 [[reference_partial_save_overwrites_unsent]] — 와 `guardOperationSettings` 를 지난다).

### 2-8. `attendance_networks` — 등록된 매장 네트워크(여러 개 가능)
id · restaurant_id · label VARCHAR(60) · ip VARCHAR(45) · source ENUM('manual','pin_override','kiosk_auto') · registered_by · last_matched_at · is_active · created/updated. UNIQUE(restaurant_id, ip).
+ `kiosk_devices.last_seen_ip VARCHAR(45) NULL` 칸 1개 추가(기존 `authenticateKioskDevice` 가 last_seen_at 갱신하는 자리에서 같이 적음, 60초 간격 그대로) → `kiosk_auto` 행을 거기서 따라간다.

마이그: `scripts/migrate-create-staff-attendance.js` 1개(표 6개 CREATE IF NOT EXISTS + kiosk_devices 칸 + 모듈 등록) · 멱등 · `migrations.registry.json` `deploy` 에 등록. ENUM 은 새 표라 하드코딩 아님(기존 표 ENUM 변경 0).

---

## 3. API (`routes/attendance.js` 새 파일, `/api/restaurants/:restaurantId/attendance/...`)

가드 원칙: 전부 `authenticateToken` + `checkRestaurantAccess` + `requireModule('staff_attendance')`(Q3). 관리 API 는 추가로 `requireRole('Restaurant Admin','System Admin')`. 직원 본인 API 는 `req.user.id` 로만 자기 것(남의 user_id 못 넣음). 응답 형식 `{success,data}` 표준.

### 3-1. 찍기
- `POST /clock` body `{ action:'in'|'out', method:'self'|'pos_pin', pin_code?, admin_pin?, note? }`
  - `self`: 대상 = req.user. `pos_pin`: 대상 = 같은 매장 pin_code 일치 직원(없으면 401 `INVALID_PIN`; 세션 주인은 RA 또는 access_pos 보유자여야 403).
  - 네트워크: 설정 켜짐 → `clientIp(req)` 가 `attendance_networks`(active) 에 있으면 `ok`; 없으면 ① `admin_pin` 이 RA 의 pin_code 와 맞으면 `override` + (설정 pin_override_registers_network) 네트워크 자동 등록 ② 아니면 **409 `NETWORK_MISMATCH`**(본문에 «관리자 PIN 으로 확인» 안내만, 등록 주소는 안 보냄). 설정 꺼짐 → `off`.
  - `in`: 열린 기록 있으면 409 `ALREADY_CLOCKED_IN`. `out`: 열린 기록 없으면 404 `NO_OPEN_SESSION`. 60초 안 같은 action 재요청 = 같은 기록 반환(멱등).
  - UNIQUE(open_user_id) 충돌 = 409 로 번역(동시 두 번 눌러도 1건).
- `GET /me/today` · `GET /me?from&to` — 내 기록 · `GET /me/status` — 지금 열린 기록 유무(버튼 상태)

### 3-2. 관리(RA)
- `GET /live` — 지금 출근 중 목록 · `GET /records?from&to&user_id&status` · `GET /summary?month=YYYY-MM` — 직원별 근무시간 합·일수·미퇴근 수
- `PATCH /records/:id` `{clock_in_at?, clock_out_at?, reason}`(reason 필수, 최초 수정 때 original_* 채움, status=corrected) · `POST /records` 수동 추가(method='admin') · `DELETE /records/:id` 는 **없음**(지우지 않고 고친다)
- `GET|PUT /settings` · `GET /networks` · `POST /networks/register-current {label}`(지금 요청의 주소를 등록 — 관리자가 매장 와이파이에서 누른다) · `PATCH /networks/:id` · `DELETE /networks/:id`
- `GET|PUT /profiles/:userId` `{rest_days, joined_at}`

### 3-3. 휴가·휴일
- `GET /leave/types` · `POST|PATCH|DELETE /leave/types(/:id)`(RA; 사용 중인 종류 삭제는 is_active=false 로)
- `GET /leave/balance?user_id&year`(직원은 자기만) · `PUT /leave/entitlements` `{user_id, leave_type_id, year, days}`(RA, Q2)
- `POST /leave/requests`(직원·RA 대리 가능) → 일수 계산·겹침 검사·pending · 알림(§6)
- `GET /leave/requests?status&from&to&user_id`(직원은 자기만)
- `POST /leave/requests/:id/approve|reject {note}`(RA) · `POST /leave/requests/:id/cancel`(직원: pending 만 / RA: approved 도 시작 전까지)
- `GET /holidays?year` · `POST /holidays` · `DELETE /holidays/:id` · `POST /holidays/import-national {year}`(RA)
- `GET /calendar?month` — 휴일 + 승인 휴가 + 쉬는 요일을 한 번에(달력 화면용)

### 3-4. 모듈·가드
- `AddonModule` `staff_attendance`(target_user_type 'restaurant', ui_routes `['/restaurant/*/attendance','/restaurant/*/my-attendance','/restaurant/*/time-clock']`) — `seed-purchase-orders-module.js` 패턴으로 마이그 안에서 등록, Q3=A 면 매장 요금제 전부에 포함.
- health-check 추가: `security` 익명 401 · 다른 매장 IDOR 403 · 직원이 남의 user_id 로 조회 403 · 네트워크 불일치 409 · 중복 출근 409 · `pos` 카테고리에 clock in→out→summary 흐름(데모 38, 이름 `[확인용]`).

---

## 4. 화면 (3개 + 설정 카드)

디자인 기준 RA(공용 DataTable·Button·Modal·PageComponents·DateField, 기하 글리프, danger #EF4444). i18n 새 namespace `attendance.json` 4언어.

### 4-1. RA «Attendance» — `/restaurant/:id/attendance` (사이드바 Management, Staff 옆)
탭: **Today**(출근 중 카드 목록 + 오늘 휴가자 + 미퇴근 경고) · **Records**(기간·직원 필터 표: 날짜·직원·출근·퇴근·시간·방법·네트워크·고침 표시, 행 액션 «고치기» 모달=사유 필수) · **Leave**(대기 중 먼저, 승인/반려 버튼 + 잔여 표시, 전체 이력) · **Calendar**(월 달력: 휴일·승인 휴가·쉬는 요일; 날짜 클릭→휴일 추가) · **Settings**(①네트워크 제한 스위치 + 등록 네트워크 표 + «지금 연결된 네트워크 등록» 버튼 — 버튼 옆에 «이 기기가 매장 와이파이에 붙어 있을 때 누르세요» ②찍는 방법 허용 스위치 2개 ③휴가 종류 표 ④직원별 연간 일수(Q2) ⑤직원 쉬는 요일).
Summary(월별 직원 근무시간)는 Records 탭 상단 집계 줄 — 급여 전 단계라 CSV 내보내기 1개만.

### 4-2. 직원 «My Attendance» — `/restaurant/:id/my-attendance` (Staff 사이드바 항상 보임; `staffHomePath` 는 바꾸지 않음)
위: 큰 버튼 하나 «출근» ↔ «퇴근»(현재 상태로 전환, 누르면 시각·결과 토스트; 네트워크 불일치면 «매장 네트워크가 아닙니다 — 관리자에게 확인 요청» + 관리자 PIN 입력 칸). 아래: 오늘 기록 · 이번 달 기록 · 휴가(잔여 + 신청 버튼 → 모달: 종류·기간·반차·사유) · 내 신청 목록(대기 중 취소 가능).

### 4-3. «Time Clock» — `/restaurant/:id/time-clock` (POS 팔레트 전체화면, 터치 숫자패드)
PIN 4자리 → 직원 이름·현재 상태 확인 → «출근»/«퇴근» 한 번 → 3초 결과 → 초기화. 불일치면 관리자 PIN 칸. 진입: POS 사이드바 «Time Clock»(RA 또는 access_pos). `ProtectedRoute` requiredRole RA+Staff + access_pos 가드.

### 4-4. 알림
- 휴가 신청 → 그 매장 RA 들에게 in-app + 메일(`NOTIFICATION_CATEGORIES` 새 키 `staff_leave`, `sendNotification(recipientId,'staff_leave',…)`, 템플릿 `emailLayout`, URL 은 env 규칙). 승인/반려 → 신청 직원(이메일 없으면 in-app 만 — 발송 가드가 알아서 건너뜀).
- 미퇴근은 알림 안 보냄(Today 탭 경고만) — 1차는 조용히.

---

## 5. 코드 손댈 곳 (설계 밖 변경 0 원칙)

| 구분 | 파일 | 내용 |
|---|---|---|
| 새 모델 6 | `models/AttendanceRecord.js` `StaffWorkProfile.js` `LeaveType.js` `LeaveEntitlement.js` `LeaveRequest.js` `StoreHoliday.js` `AttendanceNetwork.js`(7개 파일, 표 6+1) | + `models/index.js` association·export |
| 모델 수정 1 | `models/KioskDevice.js` | `last_seen_ip` 칸 |
| 미들웨어 수정 1 | `middleware/kioskDevice.js` | last_seen 갱신 자리에서 ip 도 적고 `attendance_networks` kiosk_auto 행 갱신(try/catch, 실패해도 키오스크 흐름 무영향) |
| 새 유틸 3 | `utils/clientIp.js`(Cloudflare 판정) · `utils/leaveDays.js`(일수) · `utils/attendanceNetwork.js`(검사·등록 한 함수) | 검사와 등록이 같은 판정 함수를 쓴다(메모리 [[feedback_check_and_fix_same_sql]]) |
| 새 라우트 1 | `routes/attendance.js` | §3 전부, `server.js` 마운트(`/api/restaurants/:restaurantId/attendance`) — 기존 라우터 전역 가드 아래가 아니라 **자기 파일 안에서 가드**(메모리 [[reference_router_use_leaks_to_api_root]]) |
| 알림 | `routes/notification-settings.js` NOTIFICATION_CATEGORIES + 백엔드 `locales/` 4언어 템플릿 | |
| 마이그 1 | `scripts/migrate-create-staff-attendance.js` + `migrations.registry.json` deploy | + `data/holidays/MY-2026.json` `MY-2027.json` |
| health-check | `scripts/health-check.js` security/pos 케이스 | |
| 프론트 새 3 | `pages/Attendance/AttendancePage.tsx`(+ 탭 컴포넌트 분리, 800줄 넘지 않게) · `pages/Attendance/MyAttendancePage.tsx` · `pages/Attendance/TimeClockPage.tsx` | |
| 프론트 수정 | `App.tsx` 라우트 3 + lazy · `MainLayout.tsx` 사이드바 항목 3(**🔒 `_printPollFn` 블록 무접촉** — 메뉴 배열 줄만) · `components/Settings` 없음 · `locales/*/attendance.json` 4언어 · `nav.*` 키 | |
| 손대지 않음 | 🔒 인쇄 보호 8파일(MainLayout 은 메뉴 줄만 → 지문 변경은 뜨므로 Fable 게이트에서 diff 대조 후 `--bless`) · KDS · `routes/users.js`·`staff.js`(PIN 로직 재사용은 호출만) · `StaffPage.tsx`(링크 1개도 안 넣음 — 사이드바로 충분) | |

구현 순서(빌드 1회·sweep 1회 규칙): 백엔드(모델→마이그→유틸→라우트→health-check) 전부 → API 실호출 검증 → 프론트 3화면·i18n → `build:dev` 1회 → `verify-all --full` 1회 → Fable gate.

---

## 6. 검증 시나리오 (구현 뒤 Opus 가 실행, Fable 이 판정)

**API 실호출(데모 38, `[확인용]`):**
1. 직원 self 출근 201 → 같은 직원 다시 출근 409 → 퇴근 200 → `/me/today` 에 1줄, 시간 계산 맞음(매장 타임존 날짜).
2. 네트워크 제한 켬 + 네트워크 미등록 → 출근 409 NETWORK_MISMATCH → RA PIN 동봉 → 200 + `attendance_networks` 에 pin_override 행 생김 → 다음 직원 바로 200(ok).
3. **고장주입(의무)**: `clientIp` 가 X-Forwarded-For 만 믿게 바꾸면 위조 헤더로 통과하는지 → 바꾸기 전엔 막혀야 함(반증). Cloudflare 대역 밖 연결에서 `CF-Connecting-IP` 헤더를 꾸며 보내면 무시되는지.
4. 동시 출근 2요청(Promise.all) → 1건 201·1건 409, 기록 1줄(UNIQUE 증명 — UNIQUE 제거 시 2줄 생김 반증 1회).
5. 휴가: Annual 8일 설정 → 3일 신청(중간에 매장 휴일 1·쉬는 요일 1) → days=1 → 승인 → 잔여 7 → 겹치는 기간 재신청 400 → 반차 0.5.
6. 보안: 익명 401 · 다른 매장 RA 가 38 기록 403 · 직원이 `?user_id=남` 403(자기 것만 옴) · access_pos 없는 직원의 pos_pin 찍기 403 · PIN 틀림 401 · RA 아닌 직원이 approve 403 · 모듈 없는 매장 403 MODULE_NOT_INCLUDED(Q3=A 면 요금제에서 빼서 1회 확인 후 원복).
7. 기록 고치기: PATCH 사유 없이 400 → 사유 넣어 200 → original_* 보존 · status=corrected.
8. 키오스크 자동: 등록 키오스크 토큰으로 `/api/kiosk-devices/me` 호출 → `last_seen_ip` 채워지고 kiosk_auto 행 생김.
9. 알림: 신청 → RA 알림 1건(메일은 @example.com 테스트 계정 — 메모리 [[reference_healthcheck_temp_users_send_mail]]).

**기계 게이트:** `verify-all --full`(print-guard 는 MainLayout 메뉴 줄 변경만 뜨는지 diff 로 확인 후 bless) · `check-sensitive-diff`(보안 경계 ⑤ 해당 → Fable gate) · mount sweep 3화면 크래시 0 · 타임클락 PIN 흐름은 sweep 이 못 잡으니 Playwright 클릭 1회(메모리 [[reference_mount_sweep_misses_unreachable_screens]]) · i18n verify · health-check 전체.

**Irene 눈 확인(배포 뒤·실기기, `check:true`)**: 매장 와이파이 폰 → 출근 ok / 모바일데이터 폰 → 막힘 / 관리자 PIN → 통과+등록.

---

## 7. 배포 안전성
- 마이그는 새 표만(기존 표 변경 = kiosk_devices 칸 1개 추가) → 롤백 = 코드만 되돌리면 됨(표는 남아도 무해).
- 모듈 등록 마이그는 멱등(findOrCreate + 요금제 included_modules 에 없으면 추가).
- SW 버전은 프론트 변경 끝에 1회.
- 운영 nginx 는 미확인 — `clientIp` 가 백엔드 안에서 판정하므로 nginx 가 X-Real-IP 만 넘겨도 동작. 운영 배포 뒤 `/운영검증` 에서 RA 가 «지금 네트워크 등록» 눌렀을 때 주소가 Cloudflare 대역이 아닌지 1회 본다(대역이면 CF 헤더가 안 넘어온 것 → 그때 nginx 에 `proxy_pass_request_headers` 확인, 그 전엔 손대지 않음).

## 8. 요구사항 대조표
| Irene 원문 | 설계 |
|---|---|
| 출퇴근 찍는 거 | §1-1·1-3·2-1·3-1·4-2·4-3 |
| 휴일 | §1-1 ③ · 2-2(쉬는 요일) · 2-6(매장 휴일) · 4-1 Calendar |
| 휴일 신청·승인 | §2-3~2-5 · 3-3 · 4-1 Leave · 4-2 |
| 급여는 빼고, 나중에 | §9 자리만 · 금액 칸 0 |
| 같은 와이파이일 때만 되는 설정 | §1-2 · 2-7·2-8 · 3-1 네트워크 · 4-1 Settings |
| 레스토랑 직원만, 다른 역할·매니저 불필요 | 관리자 RA 만 · Owner/브랜드/푸드코트 제외(§0) |

## 9. 급여(다음 단계) 를 위해 지금 남겨 두는 것 — 구현하지 않음
- 근무시간은 기록에서 **계산**(저장 안 함) → 급여 때 규칙(반올림·휴게 공제·초과근무)을 뒤에 끼울 수 있다.
- `staff_work_profiles` 가 시급/월급·급여 종류·국가 규칙 키(예 `country:'MY'`)를 받을 자리. 나라별 차이(EPF·SOCSO 등 말레이시아 공제, 한국 4대보험)는 `payroll_rules/<국가>.js` 로 갈라 두면 된다 — 지금 결정할 것 없음.
- 휴가 `is_paid` 를 지금 둔 이유 = 급여 때 무급휴가 공제의 입력.
