# 입점몰 매출보고 API 연동 (Mall Sales Reporting)

> 입점 쇼핑몰이 입점 매장에 요구하는 **시간별 매출 보고** API 연동. 첫 사례 = **thefire01 @ IOI Mall Damansara** (Tangent/Synthesis "POS SalesHourly" v2.5, Malaysia).
> 2026-06-29 작성. API 문서 PDF는 이미지 기반이라 텍스트 추출 불가 → **staging API 직접 호출로 계약 전체 역해독·전송 성공 확인**.

---

## 1. 역해독한 API 계약 (staging 실호출 검증 완료)

**Provider:** Tangent / Synthesis (`synthesis.bz`). Staging base: `https://staging.synthesis.bz/posmy/v1/api`

### 1-1. 인증 — OAuth2 Resource Owner Password grant
```
POST /token
Content-Type: application/x-www-form-urlencoded
Body: grant_type=password & username=<UserID> & password=<Password>
→ 200 { "access_token": "...", "token_type":"bearer", "expires_in":2999, ".issued":..., ".expires":... }
```
- 토큰 ~50분 유효(2999초). `MachineID`는 토큰에 불필요(매출 레코드의 `machineid` 로 식별).
- 헤더: 이후 호출 `Authorization: Bearer <access_token>`.

### 1-2. 매출 전송
```
POST /SalesHourly   (Bearer)
Content-Type: application/json
{
  "sales": [
    { "sale": { …18필드… } },   // 하루 24개(hour "00"~"23") 전부 필수
    …
  ]
}
→ 200 { "status":"success", "message":"total sales records received: 24. total sales records created in Tangent :24 ." }
```

**`sale` 객체 — 18개 필수 필드 (전부 문자열 값):**
| 필드 | 의미 | 비고 |
|---|---|---|
| `machineid` | 단말/매장 식별 | staging=50100025 |
| `batchid` | 배치 번호 | 패턴 제약 있음. `"1"` 통과 / `"20260629-14"` 거부(대시 불가). **운영 패턴 담당자 확인 필요** |
| `date` | 영업일 | **`YYYYMMDD`** (예 `20260629`). `YYYY-MM-DD`·`DD/MM/YYYY` 거부 |
| `hour` | 시각대 | `"00"~"23"`, **하루 24개 레코드 전부 필수** ("Every day should have 24 Records") |
| `receiptcount` | 영수증 수 | |
| `gto` | 총매출(Gross Turnover) | 총액 정의(세금·서비스차지 포함?) **담당자 확인** |
| `gst` | GST | MY는 2018 GST폐지→SST. **0 또는 SST? 담당자 확인** |
| `discount` | 할인 | |
| `servicecharge` | 서비스차지 | |
| `noofpax` | 인원수 | **테이블 좌석수 산출**(buildSeatMap/seatsForOrder, guest_count 아님 — 2026-06-29 수동입력 제거 결정). dine-in 착석분만·테이크아웃=0. rid=16 실측 6/30: 영수증31→noofpax120 |
| `cash` | 현금 결제액 | |
| `tng` | Touch'n Go(이월렛) | |
| `visa` / `mastercard` / `amex` | 카드 스킴별 | 우리 `card_type`(visa/master/amex)와 1:1 |
| `voucher` | 바우처 결제 | 정의 **담당자 확인** |
| `othersamount` | 기타 | catch-all(분류 못한 카드/이월렛 등) |
| `gstregistered` | GST 등록 여부 | **enum "Y"/"N"** ("0" 거부). 비GST 매장이면 "N" 추정 |

**검증 규칙(실측):** ① top-level은 `sales`만 허용(MachineID 등 추가속성 금지) ② 빈 sales=거부 ③ 하루 24레코드 강제 ④ 모든 값 string ⑤ date=YYYYMMDD ⑥ gstregistered=Y/N.

**staging 자격증명:** UserID/Password/MachineID = 이메일 참조(운영 자격증명은 DB 암호화 저장, git 비커밋).

---

## 2. 우리 데이터 → 몰 필드 매핑 (전 필드 생성 가능 확인)

| 몰 필드 | 우리 소스 |
|---|---|
| receiptcount | 그 시각대 주문(영수증) 수 |
| gto | Σ order total(총액) — 정의 확정 후 |
| gst | Σ tax (SST 정책 확정 후) |
| discount | Σ discount(+coupon/policy) |
| servicecharge | Σ service_charge |
| noofpax | Σ 착석 테이블 좌석수(그 시간대) — guest_count 아님(2026-06-29 결정) |
| cash | Σ payment_method=cash |
| tng | Σ payment_method=ewallet(Touch'n Go) |
| visa/mastercard/amex | Σ card_type=visa/master/amex (이미 존재) |
| voucher | 쿠폰/바우처 결제 |
| othersamount | 나머지(card_type=other, 기타 수단) |
- 시각대 기준 = **매장 타임존(MYT)** 의 주문시각 hour. 데이터 품질 주의: `guest_count` 미입력 시 0.

---

## 3. 저장 구조 (제안) — 입점 + 연동 정보

신규 테이블 **`restaurant_sales_integrations`** (레스토랑당 0~N, 보통 1):
- `restaurant_id` (FK)
- `provider` ('tangent_synthesis' 등 — 몰 API 종류)
- `mall_name` ('IOI Mall Damansara'), `mall_operator` ('IOI')
- `environment` ('staging'|'production')
- `token_url`, `sales_url` (또는 base_url)
- `user_id`, `password_enc`(암호화), `machine_id`
- `cadence` ('daily'|'hourly'), `enabled`
- `last_run_at`, `last_status`, `last_error`, `batch_seq`(배치 러닝번호)
- timestamps
> 자격증명은 **암호화 저장**(평문/ git 금지). 향후 여러 몰 공유 메타는 `malls` 참조테이블로 정규화 가능(현재는 레스토랑당 설정으로 충분).

**UI:** System Admin(또는 레스토랑 관리자) 설정 → "Mall Sales Reporting" 섹션(활성화·자격증명·환경·주기). settingsGuard 패턴.

**전송 스케줄러:** 매일 마감 후(또는 매시) 토큰 발급 → 24레코드 집계·POST → `SchedulerRun` 기록(관리자 모니터링) → 실패 재시도. batchid 멱등.

---

## 4. 담당자 확인 결과 (2026-06-29 Irene 문서 검토)

### ✅ 확정 (문서에 답 있음 — 구현 반영)
- **gto = Net Sales after Discount, before SST.** F&B는 **Service Charge 포함**. **VOID·REFUND 차감 후**(순매출). 즉 `gto = (subtotal − discount + service_charge − void − refund)`, **세금(SST) 제외**.
- **gst = GST/SST amount** → 말레이시아 현재 = **SST 금액**을 넣음(0 아님).
- **gstregistered = "Y"/"N"** — GST or SST 등록 여부.
- **batchid = Z report closing number** (마감 번호). **Numeric, 최대 12자리.**
- **tng = Touch 'n Go 전용**(전 이월렛 아님).
- **visa/mastercard/amex = 스킴별 분리** (우리 card_type 그대로 OK).
- **전송 = 매일 업로드, 하루 24 hour record. 최근 7일 함께 업로드 가능. 이미 있으면 update / 없으면 create**(upsert, batchid/일자 기준 멱등).
- **REFUND/VOID = gto 에서 차감한 순매출 전송**(이미 위 gto 정의에 포함).
- **타임존 = 매장 로컬(MYT, Asia/Kuala_Lumpur)** — 말레이시아 매장이니 자명. 우리 시스템은 모든 날짜/시간을 매장 설정 타임존으로 처리(CLAUDE.md 타임존 규칙) → **질문 불필요, 확정.**
- **전송 방식 = 매일 마감 후 24 hour record 업로드 + 최근 7일 재전송(upsert)** — 문서 명시(하루 24레코드·매일·7일·update/create)대로 확정. hourly push 불필요. (데드라인 시각은 비블로킹 — 마감 후 자동전송이라 명시 안 와도 무방.)

### ✅ 우리가 결정/검증으로 해소 (질문 불필요)
- **batchid** = 우리 **일일 마감(Z-report)/settlement 번호** (숫자 ≤12, 매장별). 문서 "Z report closing number" + **staging 실측: 같은 날짜 다른 batchid 재전송도 200 수락**(그쪽 upsert) → 안전.
- **음수 허용** — **staging 실측: gto `-50.00` 전송 200 수락.** 실제 순매출 그대로 전송(floor 불필요).
- **othersamount** = 나머지 결제수단 catch-all (필드명·버킷 구조상 자명).
- **voucher** = 우리에 voucher/기프트카드 tender 존재 시 매핑, 없으면 0 (기본값; 몰이 staging 데이터 검토 시 다르면 조정).
- **전송 데드라인** = 마감 후 자동전송 + 최근 7일 재전송(비블로킹).

### ⚠️ 외부 의존(그들이 제공해야 — 우리가 못 만듦)
- **운영 URL · 자격증명 · go-live 절차** — 문서 "production URL will be sent separately" → **수령 대기**(유일한 블로커).

> 결론: 막는 질문 없음. staging 으로 전체 구현·검증 → 몰이 staging 데이터 확인 → 운영 자격증명 받아 전환.

### 구현 영향(중요)
- 집계 시 **gto 는 SST(세금) 제외 + service charge 포함 + void/refund 차감**. 세금은 별도 `gst` 필드. (우리 order: gto≈Σ(subtotal−discount+service_charge) − 취소/환불, tax 제외 / gst=Σ tax.)
- batchid 는 **일일 마감(Z report) 번호** 로 채움(우리 settlement/마감 번호 매핑).

---

## 5. 상태 (2026-07-23 갱신)
- 기술 연동(인증+24레코드 전송) **staging 실증 완료**(2026-06-29, 2026-07-23 재확인).
- **구현 완료** — 저장 모델·집계·페이로드·스케줄러·API 전부 존재(§6). §3의 "미구현"은 해소됨.
- **미가동** — `restaurant_sales_integrations` config 0건. 운영 URL·자격증명·machine ID 수령 후 켠다(유일 블로커).

---

## 6. 구현 현황 + 2026-07-23 스펙 대조 수정 (The Fire @ IOI Mall Damansara)

> 임차인(입점 매장) = **The Fire Korean Restaurant @ IOI Mall Damansara = 운영 rid=16** (branch_name 'IOI Mall Damansara', 현재 suspended·6/30 이후 주문 없음이나 **매장 재오픈 불요** — 연동은 주문 데이터만 집계하지 매장 상태와 무관, Irene 2026-07-23 확정). 임대인/몰 운영사 = **IOI Mall**(Tangent/DCS Synthesis). "인증되냐"고 묻는 쪽 = IOI Mall.
> ⚠ **주의: rid=5(The Fire, slug kdine-korean)는 is_test=1 테스트 매장 — IOI Mall 매장 아님.** 운영에 "The Fire Korean Restaurant" 4개(rid 16=IOI Damansara / 24=Publika / 25=ÆON Maluri / 5=테스트). **연동 대상은 rid=16 하나뿐.** 초기(07-23 오전) rid=5로 샘플 뽑은 건 오인 — 정정됨.

### 구현된 코드
| 구성 | 파일 |
|---|---|
| 모델 | `models/RestaurantSalesIntegration.js` (machine_id·URL·password_enc(AES-256)·gst_registered·enabled·last_status) |
| 집계·페이로드·전송 | `services/mallSalesService.js` (aggregateDay 24시간 · buildSalesPayload · fetchToken · postSalesHourly · sendForRestaurant) |
| 스케줄러 | `services/mallSalesScheduler.js` (매일 18:00 UTC=02:00 MYT, enabled 연동만 순회, 최근 7일 upsert) |
| API | `routes/sales-integrations.js` (CRUD · `/:id/test` 토큰테스트 · `/:id/send-now` · `/:id/preview` 전송 안 하고 미리보기) |

### 인증 — "IOI Mall에서 인증되냐"의 답 = **된다** (staging 완전 실증)
- 우리 `fetchToken`(POST + form-urlencoded, OAuth2 password grant)으로 `staging.synthesis.bz` bearer 토큰 획득 성공(HTTP 200). 2026-06-29·07-23 확인.
- GET/POST 모호성(스펙 §8) 실측 해소: **POST·GET+body 둘 다 200, GET+query만 400** → POST 유지가 정답(OAuth2 RFC 6749 §3.2도 POST 필수). 코드 변경 불필요.
- **2026-07-23 몰이 준 staging 자격증명으로 end-to-end 성공**: User ID `50100025` / Password `DCStest1234` / Machine ID `50100025`. (staging 전용, 운영값 아님. 자격증명은 DB `password_enc` AES-256, git 비커밋.)
  - 토큰 발급 ✅ → 0값 24레코드 전송 ✅ `{"status":"success",...created in Tangent :24}` → **rid=16 실매출 24레코드**(2026-05-31, 45영수증 RM4,475.90, 카드스킴 분리 visa 907.94·master 316.03, 수정된 tender합=gto 정합) 전송 ✅ `status:success`.
  - 즉 인증·형식·금액(SST전 tender=gto)·24레코드 규칙 전부 몰 실서버가 수락 확인. rid=16은 **card_type 기록이 있어 visa/master 분리됨**(rid=5는 전부 othersamount였던 것과 대조 — 대상 매장 데이터 품질 양호). 남은 건 **운영 URL·자격증명·운영 machine ID**뿐.

### 2026-07-23 스펙 대조로 발견·수정한 버그 2건 (Fable 게이트 CONDITIONAL GO → 조건 충족)
1. **tender 금액이 SST 포함** → 스펙 §4는 tender(cash/tng/visa/…/othersamount)를 gto와 같은 "SST 전" 기준으로 규정 → **tender 합계 = gto** 여야 함. 수정 전 The Fire 7/12 샘플: gto 264.57인데 othersamount 279.00(=+SST). 수정: `accrueOrderTenders` 순수함수로 SST 전 환산(분모=실결제합 paySum → overpay·사후정정도 정합 보장).
2. **HTTP 200 + `{"status":"error"}`를 성공으로 기록** → 스펙 §5·요건12: 검증 실패도 HTTP 200으로 온다. 수정 전 `postSalesHourly`는 HTTP 상태만 봐 거절을 "성공" 로깅. 수정: status가 정확히 'success'가 아니면(에러·부재·비JSON 200 포함) throw(fail-closed). **staging 실서버가 실제 거절 반환 → 우리 검증이 정확히 잡음 실증.**
- 회귀 박제: `tests/mall-sales.test.js` **10/10** (tender==gto·overpay·status:error·status부재·비JSON).

### IOI Mall에 회신할 내용 (임대인/몰 운영사에게)
1. **인증 검증 완료** — staging에서 토큰 발급·전송 파이프라인 정상 동작 확인. 24레코드/일 형식 준수.
2. **필요한 것(몰이 제공)**: The Fire 매장의 **운영 machine ID(8자리) + 운영 token/SalesHourly URL + 계정 자격증명**. 이것만 받으면 켠다.
3. **§4에서 이미 확정된 사항 재확인 불필요**: gto=할인후·SST전·서비스차지 포함·void/refund 차감 / gst=SST 금액 / batchid=숫자≤12(우리는 영업일 YYYYMMDD, 같은 날 재전송 upsert) / tng=Touch'n Go 전용 / 매일 최근7일 재전송.
4. **The Fire 데이터 품질 (2026-07-23 Fable 실측 정정)**: ①**noofpax = OK** — 테이블 좌석수로 자동 산출(rid=16 6/30 noofpax=120). guest_count 아님. ②**카드스킴 = OK** — rid=16은 `requireCardType=ON`이라 visa/master/amex 실제 분리(6월 visa35·master14). cash는 매장설정에서 비활성. ③**~~유일 갭 = 이월렛 세분~~ → 2026-07-24 해소**: 이월렛 서브타입(`ewallet_type`) 캡처 개발·운영 배포 완료(POS·모바일·오프라인 전 경로). 매장이 설정>결제수단에서 취급 이월렛 지정(1개=자동태깅·2개↑=선택), 집계가 `orders.ewallet_type='tng'`를 tng 버킷에 매핑. **rid=16 `acceptedTypes=['tng']` 설정 완료 → POS 이월렛은 tng 자동 태깅 실효.** ⚠ **모바일 TNG는 아직 0건**: rid=16 이월렛 `qrImage`가 비어(EMPTY) 모바일 결제 불가 → `availableIn=['pos']`로 되돌려 둠. **매장 TnG 수취 QR 업로드 시** `availableIn`에 `'mobile'` 추가하면 모바일 TNG도 자동 태깅(6월 모바일 이월렛 36건 RM2,971 규모). ④예약금(reservation_deposit) 이중계상 여부.

### 세팅 완료 (2026-07-23)
- **운영 config 저장 완료**: `restaurant_sales_integrations` id=1, rid=16, provider=tangent_synthesis, mall_name='IOI Mall Damansara', environment=**staging**, user_id/machine_id=50100025, gst_registered=**Y**(The Fire SST 6% 실측), cadence=daily, send_window_days=7, **enabled=false**(자동전송 OFF — 스케줄러 순회 제외, 라이브 리스크 0). 비번=암호화(현재 기본키, staging 비민감).
- **시스템 경유 인증 검증**: 저장된 암호화 비번으로 `fetchToken` 토큰 발급 성공(test-connection 경로 실증).
- **ENCRYPTION_KEY 회전 준비**: `scripts/migrate-encryption-key-rotation.js`(멱등, 단위검증 완료) + 레지스트리 manual 등록. AES 암호화 영향 컬럼은 `notification_settings.smtp_password`·`restaurant_sales_integrations.password_enc` 둘뿐(bcrypt 해시 무관). go-live 직전 실행.

### 남은 것 (go-live 3단계 — 순서 강제)
1. **운영 백엔드 배포** (현재 운영은 7/23 수정 전 코드 = tender SST포함·status fail-open). `mallSalesService.js` 수정본 배포 필요. ⚠ 같은 워킹트리에 인쇄 신선도경계(🔒 orders-crud.js) 변경이 있어 print-guard fail-closed → 그 건 **매장 실프린터 확인+bless** 후 함께 배포.
2. **ENCRYPTION_KEY 강화**(운영 실자격증명 저장 전): 강한키 생성 → 운영 `.env` 기록 → `migrate-encryption-key-rotation.js` 1회 → **즉시 pm2 restart production-backend**(새벽 권장 — 재암호화~restart 사이 수초 SMTP 발송 실패 가능). 배포가 어차피 prod 를 restart 하므로 **배포와 묶으면 추가 중단 0**.
3. **운영 자격증명 수령 시**(몰): config 를 UI 또는 스크립트로 environment=production + 운영 token_url/sales_url + 운영 machine_id/user_id/password 갱신 → pm2 restart(토큰캐시) → test-connection → send-now 1일 → 몰 수신 확인 → **enabled=true** → 다음날 02:00 MYT SchedulerRun(`mall_sales_daily`)·`last_status=success` 관측 2~3일.
