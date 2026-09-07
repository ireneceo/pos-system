## 현재 작업 상태
**마지막 업데이트:** 2026-09-07 09:30 UTC
**버전:** **v3.85 운영 배포 완료** (SW `4.86-brand-revenue-dedupe-20260907`)
**작업 상태:** 완료 — 배포분은 운영 반영, 이후 작업은 dev 완료·**미배포**

---

## 완료된 작업 (이번 세션)

### ① v3.85 운영 배포 완료 — 브랜드 매출 리포트
- **`/pos/brand/general/reports` = 브랜드 자기 매출**(신규 `BrandRevenueReportPage.tsx`). 진실원장 = 브랜드 발행 인보이스. 세 묶음(프로덕트 개별판매 `trade` / 구독판매 `brand_plan` / 수수료) × 청구·수금·미수. **`soa` 는 이중집계라 제외**
- **매장 판매 분석 6탭 → `/pos/brand/general/performance/stores`** (BrandReportsPage 내부 로직 무변경). 옛 경로 링크 5곳 재지정
- 브랜드 성과 화면 **오늘/어제** 필터(매장 타임존 기준)
- 신규 `routes/brand-revenue.js`(범위는 `requireBrandScope` 만 신뢰) · 허용목록 마이그(덧붙이기만) · i18n 4언어
- **인쇄 가드 bless** — 사이드바는 MainLayout 에만 있는데 가드가 파일 전체를 해시한다. `_printPollFn` 블록 sha256 동일 증명 후 갱신(Fable 승인)
- 배포: 스모크 10/10 · 마이그 정상 · 릴리즈 콘텐츠(블로그 `release-v3.85` + 공지 9명) 등록

### ② 거래청구서 원장 (dev 완료 · **미배포**)
Irene 확인: "청구서는 월간처리해도 다 나가? 결제버튼만 마지막에 SOA로 가는 거고?" → **둘 다 맞음**(코드 확인).
- **수령으로 끝나는 경로 3개 중 `/receive` 만 발행**하고 있었다 → `issueTradeInvoiceAfterCommit` 헬퍼 하나로 셋 다
- **발주 결제 ↔ 청구서 결제 양방향 거울**(`invoices-payment.js` 에 PurchaseOrder 참조가 0건이었다)
- `receive-and-pay` 는 **paid 청구서** 발행 · SOA 자식 조회에 `status notIn ['paid','cancelled']`
- `paid_amount` 는 **청구서 자기 total**(finalize 가 품목합으로 재계산하므로)
- 수령일 **매장 타임존**(UTC 라 아침 8시 전 수령이 전날로 찍혔다)
- 신규 `scripts/backfill-trade-invoices.js`(품목합 검산·금액 대조 내장, 레지스트리 미등록)
- 검증: 세 경로 실호출 · health-check **225/225**(신규 4건) · **고장주입 6/6 반증** · verify-all 17/17 · 누수 지문 전후 0

### ③ 서버 관리 (dev 완료 · **미배포**)
주간 보안 리포트 메일의 조치 3건 중 **둘이 틀렸다**:
- "[긴급] 보안 업데이트" → **헛경보**. `unattended-upgrades` 가 자동 적용 중이고 실제 대기 **0건**
- "디스크 73% → journalctl 정리" → 저널은 **364MB**. 진짜 원인은 **배포 백업 210개 = 134G**
  → `deploy-to-production.sh` 에 **30일 보관 + 최신 10개 보존** 추가. 다음 배포에서 **126개·61GB 회수**
- "서버 리부트" → **맞다**. 운영 7주 6일 가동, 커널 134 실행/139 설치. **매장 1~2분 중단이라 Irene 이 시간 결정**
- 리포트 생성기 수정본 `scripts/ops/fix-weekly-report.sh` (운영 1회 실행용, 미적용)

---

## 진행 중인 작업
- 없음

## 다음 확정 작업 — Fable **반려** 5건 수정 후 재제출 (그 다음 `/배포`)

Fable 판정(2026-09-07): 백업 보관 정책·리포트 패치 **둘 다 방향은 맞으나 반려**. 아래를 고쳐 **한 번에** 재제출하면
이 사안과 직전 거래청구서 원장 사안의 **마커를 함께** 찍겠다고 함.

1. 🔴 **`deploy-to-production.sh` — "최신 10개 보호"가 전혀 작동하지 않는다.**
   `KEEP` 이 줄바꿈 구분인데 `case " $KEEP " in *" $d "*)` 는 공백 양옆을 요구해 **아무것도 매치되지 않는다.**
   Fable 시뮬레이션(31~60일 전 30개, 배포 뜸한 시나리오): 현재 코드 **30개 전부 삭제**(기대 20).
   오늘 운영 126개 삭제는 나이 검사로만 판정돼 결과가 같지만, **문서에 적힌 안전장치가 거짓**인 상태다.
   수정: `KEEP=" $(echo "$LIST" | head -N | tr '\n' ' ') "` → `case "$KEEP" in *" $d "*)`
2. 🔴 **`ops/fix-weekly-report.sh` 마지막 미리보기 줄이 실제 메일을 한 통 더 보낸다** — 운영 `weekly-report.sh` 에
   `--dry-run` 이 없어 인자를 무시하고 끝까지 돌며 옛 로그도 지운다. **→ 이번 세션에서 제거 완료**
3. 🟠 대상 파일이 **root 소유**라 `ssh "bash …"` 로는 `cp` 에서 죽는다 → **`sudo bash`** 로. **→ 사용법·root 검사 추가 완료**
4. 🟡 디스크 "가장 큰 곳"이 `/var`(139G) 로 나와 **정보가 없다** → `du -xsh /var/*/* /opt/* /home/*` 로 **3줄**. (미수정)
5. 🟡 마지막 자동적용 시각은 로그 mtime 이 아니라 **`/var/lib/apt/periodic/unattended-upgrades-stamp`**
   (로그 폴더가 root:adm 750 이라 root 아니면 항상 99일 → 매주 거짓 [긴급]). (미수정)

재제출 시 첨부: 결함1 3시나리오 시뮬레이션 출력(20 / 22 / continue) · `verify-all` · `check-sensitive-diff`.

**Fable 통과한 것**: 정규식으로 배포 백업 형식만 한정 · `cd` 실패 시 exit 0 · 날짜 파싱 실패 continue ·
배포 비차단 · 삽입 위치 · 30일/최소10개 정책(하루 3배포 상한 90GB → 디스크 ≈54%) · 비배포 폴더 12개 무접촉.

## 🔴 운영 DB·서버 쓰기 대기 (전부 세션 정책으로 차단 — Irene 이 직접 실행)
백업 있음: `db_predeploy_20260907_074114.sql.gz` (11MB)

```
# 1) 거래청구서 백필 14건 (운영 dry-run 확인 완료: 전부 헤더=품목합, 건너뜀 0, 합계 4,020.57)
! ssh irene@87.106.78.146 "cd /var/www/production-backend && node scripts/backfill-trade-invoices.js"
! ssh irene@87.106.78.146 "cd /var/www/production-backend && node scripts/backfill-trade-invoices.js --apply"

# 2) 중복 정리 (미리보기 대조 완료: 매핑 36 삭제 · 재료 7쌍 병합 · 1쌍 정지 · 코드 16 재번호)
! ssh irene@87.106.78.146 "cd /var/www/production-backend && node scripts/migrate-dedupe-2026-09.js --rehearse"
! ssh irene@87.106.78.146 "cd /var/www/production-backend && node scripts/migrate-dedupe-2026-09.js --apply"

# 3) 상품 숨김 10개 (#372 는 AI 참조사진이 써서 제외)
! ssh irene@87.106.78.146 "cd /var/www/production-backend && node scripts/migrate-dedupe-2026-09.js --deactivate 95,96,97,102,352,92,337,442,445,440 --apply"
! ssh irene@87.106.78.146 "cd /var/www/production-backend && node scripts/inspection/run.js"

# 4) 주간 리포트 생성기 수정 (배포 후)
! ssh irene@87.106.78.146 "bash /var/www/production-backend/scripts/ops/fix-weekly-report.sh"
```

## 사람 몫 (Irene 이 결정·화면에서 하실 일)
- **운영서버 리부트 — Irene 승인 완료** ("밤 12시면 언제든 해", 2026-09-07). **실행만 남음.**
  🔴 **함정: 운영서버 시계가 UTC 다.** 말레이시아 자정 = 서버 **16:00**.
  서버에서 `00:00` 으로 예약하면 **말레이시아 아침 8시(영업시간)** 에 리부트된다.
  `sudo` 가 비번을 요구해 이 세션에서는 예약할 수 없다 — Irene 이 직접:
  ```
  ! ssh -t irene@87.106.78.146 "sudo shutdown -r 16:00 '커널 업데이트 적용 (말레이시아 자정)'"
  # 취소: sudo shutdown -c
  # 즉시(영업 종료 후 직접 확인하며): sudo reboot
  ```
  리부트 뒤 확인: `pm2 status` · `curl -s -o /dev/null -w '%{http_code}' https://purplehere.com/api/health`
  (커널 `6.8.0-134` → `139`, `libc6` 포함. 가동 7주 6일)
- **배포 후 확인**: 사이드바 리포트가 브랜드 매출 화면인지 · 성과 밑에 판매 분석 6개 · 매장 목록에서 매장 클릭 시 판매 분석으로 가는지
- **공급업체 계약 청구주기** — 운영 38건 전부 `invoice_cycle` NULL 이라 공급업체는 즉시 청구로 떨어지고 SOA 미대상. 월정산으로 받으실 거면 계약에 넣어야 함
- 오염값 4건(참깨·조갯살 환산 250,000) · 단가 0 매핑 93건 · 원가 0 재료 105건 — 목록은 `docs/DATA_CLEANUP_2026-09.md`
- 레시피 입력 687건 · Brand Manager 소속 지정(활성 4명 전원 `is_test=1`, 3명 `brand_id` NULL)

## 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- `hcLeakFingerprint()` 가 dead code — 매 실행 자동 증명이 되려면 마지막 테스트로 전후 지문 비교를 박아야 함 (Fable 지시로 다음 묶음)
- `trade_invoice_created` 알림 키가 설정 목록에만 있고 **발사처 0건**
- PO#127 DEVSEED unpaid↔paid 불일치 1건 · refund 후 SOA 부모 paid 유지(드문 경우)
- A8 "매핑 단가>0 인데 원가 0" 28건 — 원가 전파 갭 원인 조사
- 기간 경계가 UTC(`brand-soa.js` 와 동일 방식) — MYT 하루 경계가 8시간 어긋남. 고칠 땐 둘을 같이
- BM 접근 모델 나머지 · 가격변동 알림 · 카탈로그 서버 검색 · `orders-crud.js` 그림자 라우트 1종

---

## 이번 세션에 내가 저지른 것 (감추지 않고 기록)
- **`ING_REFS` 에 남의 테이블 2개** — 이름만 `ingredient_id` 이고 실제 FK 는 재고아이템. 그대로 돌렸으면 브랜드 프로덕트레시피 4줄을 덮어썼고 가드가 전부 통과했다. Fable 적발. **목록의 근거는 컬럼 이름이 아니라 FK 실측.**
- **헛통과 3회** — ①돈 경계 검사 기준을 자기 API 응답으로 잡아 방어를 없애도 통과 ②`paid_amount` 검사가 픽스처 품목합=헤더라 구분 못 함 ③"시험 잔재 0"을 새 4건만 재고 기존 테스트 누수를 안 셌다(고아 300장).
- **"옛 경로 링크 0건" 오보** — 실제 5곳. Fable 적발.
- **상품 중복 136건 오보** — 매장을 이름으로 묶어 The Fire 3지점이 겹친 착시. 실제 10건.
- **`set_items` 를 JSON 컬럼인데 문자열 비교** — 11개 전부 "세트 있음"으로 오독. 실제는 전부 비어 있음.
- **백업 정리 첫 로직 결함** — 이름순 정렬이 비-배포 폴더를 "최신"으로 잡아 진짜 최신이 보호를 잃을 뻔. 시뮬레이션에서 잡음.
- **완료 가드를 절대값으로** — 운영에 이미 있던 고아 48줄(그마저 허수)로 배포가 통째 롤백될 뻔.
- 대기 스크립트가 잘못된 PID 를 잡아 **"검증 끝남"을 두 번 오보**.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
