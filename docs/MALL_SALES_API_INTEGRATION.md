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
| `noofpax` | 인원수 | 우리 `guest_count` |
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
| noofpax | Σ guest_count |
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

## 4. 담당자 확인 필요 (구현 전)
1. **gto/gst/servicecharge 정의** — gto는 세금·서비스차지 포함 총액인지 net인지. gst는 SST 시대에 0인지. gstregistered Y/N.
2. **batchid 패턴/의미** — 러닝번호? 매장·일자별? 허용 형식.
3. **결제 버킷 매핑** — tng=Touch'n Go만인지 전 이월렛인지, voucher 정의, othersamount 범위.
4. **전송 주기/시점** — 매시 푸시 vs 매일 마감 후 24레코드 1회. 재전송/정정 가능 여부.
5. **타임존** — date/hour = 매장 로컬(MYT) 확인.
6. **환불/취소/할인 반영** — net 처리 / 음수 허용?
7. **운영 전환** — staging 검증 후 운영 URL·자격증명·go-live 절차.

---

## 5. 상태
- 기술 연동(인증+24레코드 전송) **staging 실증 완료**(2026-06-29). 우리 데이터로 전 필드 생성 가능 확인.
- 미구현: 저장 모델 + 설정 UI + 집계/스케줄러(=§3). 담당자 확인(§4) 후 구현 권장.
