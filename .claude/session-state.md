# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-22 (윈도우 데스크탑앱 테스트 수정 4건 — **운영 배포 완료**)
**버전:** **v3.69** (운영 — 2026-07-16 배포, 이번 배포는 버그수정으로 버전 유지 중 — Irene 결정 대기) · 데스크탑앱 **0.1.9** · 안드로이드앱 **0.2.0**
**작업 상태:** **완료 — 루아 윈도우 데스크탑앱(0.1.9) 테스트 수정 3건 운영 배포 + 1건 결정 항목.** Backup 20260722_121601 · Smoke 9/9 · 마이그 47/47 · 스키마 동일(153테이블). verify-all --full 14/14 · 이슈4 API E2E 11/11 · print-guard 8/8 무접촉 · Fable 게이트 비대상.

### 진행 중인 작업
- **인쇄 백로그 신선도 경계 — 배포 대기(Irene 승인 + 매장 종이확인 1회 필요)** · Fable **CONDITIONAL GO**
  - 원인: 서버는 주문 생성 시 프린터 설정과 무관하게 `needs_print=1` 을 찍는데, 지우는 주체는 자동인쇄 폴러뿐 → **자동인쇄를 안 켠 매장은 무한 누적**. 운영 실측(2026-07-23): K-DINE IPC 1,616 · The Fire 86 · with MIN 65 · Seoul Garden 7. 창은 oldest-20 이라 옛 행이 20칸 점유 시 신규 주문이 창 밖으로 밀림(=2026-06-22 사고 재발).
  - **운영 조치 완료**: 24h 지난 2,035건 플래그 해제(rid8 1879→37, rid5 87→1, rid10 100→6, rid13 13→0). 오늘 주문 무접촉. 롤백 스냅샷 = 양 서버 `/var/www/backups/print-backlog-cleanup/backlog-snapshot-20260723.json`. needs_bill 잔량 전 매장 0건.
  - **dev 코드(미배포·미bless)**: `orders-crud.js` pending-print **branch 1 에만** 24h 신선도 경계(🔒 branch 2 `pending_reprint` 는 무필터 유지 = 취소표 분실 방지) · `print-diagnostics.js` fleet stuck 카운트 정합 · health-check 계약 테스트 신설(25h 제외 / 재발행 포함 / 신선 포함).
  - 검증: 계약 3조건 통과 + **경계 임시 제거 시 정확히 그 1건만 실패 → 원복 sha256 동일** · 플레이키 3/3 · verify-all 139/140(유일 실패=보호파일 지문, 의도) · 인쇄 라우트 가드 34루트 통과.
  - **남은 조건**: ①Irene 승인 + 매장 실프린터 종이확인 1회(신규 주문 1장 / 하루 지난 주문 취소 → 취소표 출력) → `--bless` → `/배포` ②rid8 autoPrint 활성화는 폴러 켜진 상태에서.

### 완료된 작업 (이번 세션 — 2026-07-22, 운영 배포)
- **루아 윈도우 데스크탑앱 테스트 수정 4건** — 4병렬 조사로 각 근본원인 실측 후 처리:
  - **#2 Floor Plan 예약 테이블 레이아웃 깨짐 (✅ 배포)**: 고정 70×70 원에 `"Reserved 05:30 pm"` 긴 문자열이 줄바꿈→4번째줄→overflow(nowrap/말줄임 없음, Win·mac 동일). 수정: 노드 안엔 시간만(`reservedTimeLabel` 신설, orderStage/types) + SeatsLabel/StatusInfo `nowrap+ellipsis+max-width:92%`. 상세패널 배지는 풀문구 유지. `TableNode.tsx`·`orderStage.ts`·`FloorPlan/types.ts`.
  - **#3 프린터 실패배너 재등장+상단nav 가림 (✅ 배포)**: (a)Dismiss가 기억 안 함+5초 폴러 재발화 (b)`position:fixed top:0` 전체폭 오버레이가 nav 덮음. 수정: 실패 key(scope+order)별 Dismiss 쿨다운(10분) 억제+동일오류 리렌더 방지 + **하단 중앙 토스트 재배치**. **인쇄 파이프라인 무접촉**(배너=display-only, 8보호파일 아님·dispatch부 무수정). `AutoPrintFailureBanner.tsx`만.
  - **#4 예약 상태 미동기화(Seated 안 됨) (✅ 배포)**: FloorPlan "Check in (New Order)"가 예약 전환 안 함 + 백엔드는 `arrived`만 seat(confirmed 제외=워크인 오링크 방지 **의도적 안전장치**). 수정: 체크인 시 프론트가 `confirmed→arrived` PATCH(Reservations "Arrived" 경로와 동일)→**백엔드 기존 흐름이 주문생성 시 arrived→seated+order.reservation_id 링크**(주문생성=Fable 영역 **무접촉**) + Reservations focus/visibility 재조회. `TableDetailPanel.tsx`·`FloorPlanPage.tsx`·`ReservationsTimelinePage.tsx`. **E2E 11/11 실증**. 단일진실 [[reference_reservation_checkin_two_paths]].
  - **#1 exe 다운로드 SmartScreen 경고 (⏸ Irene 결정)**: 코드 문제 아님 — **미서명 설치파일**(무평판)이 근본. 유일 해법=코드서명 인증서 구매(Azure Trusted Signing 연~$120 추천 / EV=즉시평판). **코드 무변경.** 파일럿은 "추가정보→실행"으로 사용. 사면 서명 배선 구현.
  - **검증**: verify-all --full **14/14**(print-guard 8/8·design 신규0·IDOR·타임존·health-check 회귀·i18n·인쇄 라우트 가드 + 실브라우저 mount 8역할 크래시0) · 이슈4 API E2E 11/11 · sensitive-diff Fable 비대상.
  - **미확인(남은 것)**: #2·#3 실 윈도우앱 눈 확인 1회(원 안 텍스트 렌더 / 하단 토스트가 POS 하단 결제버튼과 겹치는지) — 헤드리스는 크래시0만 증명. #1 인증서 구매 결정.

### 이월렛 서브타입 캡처 (IOI Mall tng 구분) — dev 완료·미배포, Fable CONDITIONAL GO 조건 충족
- **목적**: POS 이월렛이 단일 'ewallet'라 몰 tng 필드 못 채움 → 서브타입 캡처(카드 card_type 대칭, 전용 컬럼 ewallet_type).
- **정석 UX(Irene 지시 반영)**: 설정에서 취급 이월렛 지정(payment_settings.ewallet.acceptedTypes 배열). **1개=주문 시 자동 태깅(캐셔 선택 불필요), 2개↑=캐셔 선택(필수), 0개=캡처 안 함(기존 동작).** requireEwalletType 토글 폐기(acceptedTypes 로 대체).
- **모든 POS 경로 배선(Irene 지적+Fable 조건)**: POSTerminal(신규주문 OrderContext) + FloorPlan(다인인·테이크웨이 PATCH+오프라인op) + LiveOrders(PATCH+오프라인op) + split(orders-payment). card_type 흐르는 전 경로 패리티. 백엔드 PATCH는 order.update(req.body) 통째저장이라 무변경.
- **몰 매핑**: addToBucket 이 ewallet_type='tng'→몰 tng, 나머지(grabpay/boost 등)→othersamount(몰에 필드 없음).
- **🔴 TDZ 크래시 잡음**: auto-tag useEffect 가 acceptedEwallets(뒤 선언) 참조 → "Cannot access before initialization" POS Terminal 크래시. 빌드·TS 통과했으나 실브라우저 mount 에서 발견 → 선언을 useEffect 앞으로 이동. (실UI 검증 고집의 성과.)
- **실브라우저 UI/UX 3시나리오 실증**: 설정 다중선택 렌더·클릭저장 OK / POS 결제 0개(UI없음·확인가능)·1개(자동"Touch 'n Go"·확인가능)·2개(버튼2+경고+확인비활성). POS Terminal mount 크래시0.
- **기존 이월렛 → grabpay 백필(Irene 지시)**: dev 241건 적용. 운영은 컬럼 배포 후 `migrate-backfill-ewallet-grabpay.js`(manual 등록) 1회.
- 검증: 계약테스트 14/14(tng/grabpay/미지정/split) · 마이그 레지스트리 드리프트0 · i18n 통과 · print-guard 보호파일 2건(POSTerminalPage 이월렛 plumbing[인쇄 무변경]·orders-crud 별건).
- 파일: `PaymentModal.tsx`·`SettingsPage.tsx`·`FloorPlanPage.tsx`·`LiveOrdersPage.tsx`·`OrderContext.tsx`·🔒`POSTerminalPage.tsx`(1줄)·`services/mallSalesService.js`·`routes/orders-payment.js`·`models/{Order,OrderPayment}.js`·`scripts/migrate-add-ewallet-type.js`·`migrate-backfill-ewallet-grabpay.js`·`tests/mall-sales.test.js`·locales 4언어
- **배포 전**: Fable 2차 재검증(설계 변경분 acceptedTypes) **진행 중 → 결과는 다음 세션에서 확인·반영**·실프린터 확인은 불요(인쇄 무변경)·orders-crud 별건과 함께 나감 인지.
- **/검증 완료(2026-07-23)**: verify-all --full 실브라우저 mount sweep 8역할+POS **크래시0(662.8s)** · state-hydration 0 · 인쇄 라우트가드 34/34 · health 139/140(유일실패=print-guard 의도) · 실API 왕복 5/5 · 계약 14/14 · check-sensitive-diff=★Fable대상(①②③).

### IOI Mall 매출 연동 (The Fire=rid16) — 버그2건 수정·인증 실증 완료, machine ID 대기
- **기능은 완전 개발돼 있었음**(mallSalesService/scheduler/routes/preview), 단 config 0건=미가동. 임차인 "샘플 먼저" 요청 → Tangent 공식 스펙 대조.
- **인증 실증**: 우리 fetchToken(POST+form-urlencoded)으로 staging.synthesis.bz bearer 토큰 획득 ✅. GET/POST 모호성 실측 해소(POST·GET+body 200, GET+query 400 → POST 유지 정답, OAuth2 RFC상 POST 필수).
- **버그1(tender SST 포함→gto 불일치)**: tender를 SST 전으로 환산(분모=paySum, overpay/사후정정도 tender합==gto 보장). `accrueOrderTenders` 순수함수 추출.
- **버그2(HTTP 200 status:error를 성공기록)**: postSalesHourly가 status!=='success'면 throw(fail-closed: 부재·비JSON 200도 실패). staging 실서버가 "Machine ID 없음" status:error 반환→우리 검증이 정확히 실패로 잡음 실증.
- **Fable CONDITIONAL GO → 조건 충족**: fail-closed 강화 + 계약테스트 `tests/mall-sales.test.js` **10/10**(tender==gto·overpay·status:error·부재·비JSON). 강권고3(paySum 분모) 반영.
- 🔴 **대상 매장 = rid=16**(The Fire @ IOI Mall Damansara, branch명 붙은 실매장. suspended·6/30후 주문없음이나 **재오픈 불요** — Irene 확정). rid=5는 is_test=1 테스트매장 = IOI 아님(오전 오인 정정). rid=16 데이터 양호(card_type 분리·SST). 5/31 실매출 24레코드 staging 전송 `status:success` 실증.
- **몰 자격증명 = staging = 여기 있음(안 기다림)**: User ID/Machine ID `50100025` / PW `DCStest1234`. 이걸로 인증·전송 다 됨. "운영 자격증명 별도 발송"은 몰 스펙 §8이 명시한 몰 절차(내가 만든 요구 아님).
- **세팅 완료(2026-07-23)**: 운영 `restaurant_sales_integrations` id=1 저장(rid=16, staging, enabled=**false**, gst=Y, machine=50100025). 시스템 경유 test-connection(fetchToken) 성공. ENCRYPTION_KEY 회전 마이그 `migrate-encryption-key-rotation.js`(멱등·단위검증·registry manual) 준비 — go-live 직전 실행.
- **go-live 3단계(순서강제)**: ①수정 백엔드 배포(print-guard가 orders-crud 신선도경계건으로 fail-closed → 실프린터 확인+bless 후 함께) ②ENCRYPTION_KEY 강화(.env키+회전마이그+restart, 배포 restart 와 묶으면 중단0) ③운영 자격증명 수령→config를 production 전환→test/send-now→enabled=true→SchedulerRun 관측.
- 파일: `dev-backend/services/mallSalesService.js` · `tests/mall-sales.test.js`(신규) · `scripts/migrate-encryption-key-rotation.js`(신규) · `docs/MALL_SALES_API_INTEGRATION.md`

### Irene 실행 대기 (운영 sudo 비밀번호 필요 — 한 세션에 묶어서)
1. **earlyoom 설치** — `ssh -t irene@87.106.78.146 'sudo bash /tmp/prod-memory-protection.sh'` (파일 업로드 완료)
   > ⚠ 문서에 있던 옛 명령(`'sudo bash -s' < 파일`)은 **TTY를 못 잡아 실행 불가**였고, 그게 7/14 이후 미적용의 실제 이유. 두 문서 모두 정정 완료.
2. **sudoers 위생 정리** — `scripts/prod-sudoers-cleanup.sh` (Fable PASS). 삭제=chown/kill/lsof NOPASSWD(사용처 0·chown은 사실상 비번없는 root) / 유지=nginx 3종+캐시 rm(배포 하중)+`(ALL:ALL) ALL`. fail-closed(백업→visudo -cf 통과시에만 반영→nginx 생존 검증), 멱등.
   - 미결: `dev-backend/restart-dev.sh`(kill/lsof NOPASSWD의 출처, 참조 사실상 0이나 **`dev-backend/README.md:112`에 사용법으로 남아 있음** → 지우려면 README 동반 수정). 배포 rsync `--delete` 라 **소스를 지워야 운영본이 영구 제거**됨.
3. **개발서버 sudoers 정리 — 거의 완료(Irene 확인 1줄만 남음)** · Fable PASS · (c)근본원인제거
   - **B**: `package.json` 평문 비번 패턴(`.env`에서 SUDO_PASSWORD 읽어 `sudo -S`) 死코드 제거
   - **1**: `deploy-dev.sh`·`restart-dev.sh`·`build-low-memory.sh`·`npm-install-safe.sh` 탈sudo(실제 sudo 호출 = deploy-dev fix_ownership 폴백 1개만)
   - **2**: `dev-frontend-build` root→irene 소유 전환(lua ACL 보존, root파일 814→0). nginx(www-data)는 other 읽기만 필요 → 서빙 무영향
   - **3 검증**: build:dev 70초 성공 + 방금 빌드한 번들이 실제 서빙(main.69a4f01e.js) + restart-dev.sh sudo없이 정상(헬스ok)
   - **4**: 진짜 출처는 드롭인 `/etc/sudoers.d/irene`(`NOPASSWD:ALL`)였음 → **제거 완료**. irene은 `sudo` 그룹이라 비번 sudo 전권 유지. `sudo -n true` 차단 확인(=NOPASSWD 제거 실증). 백업 `/root/sudoers.d-irene-backup-20260723_130535`
   - **⚠ 남은 것(Irene 1회)**: 본인 터미널에서 `sudo visudo -c` 실행 → "parsed OK" 나오면 (a)sudoers 문법 정상 (b)비번 인증 정상 동시 확인 = lockout 아님 최종 확정. (제가 비번이 없어 이 확인만 못 함.)
   - 미결: 개발서버 `restart-dev.sh`(dev원본) README.md:112 참조는 여전히 유효 문서 — 지우려면 동반수정(운영본과 별개, 지금은 둘 다 탈sudo 라 위험 없음)

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **#1 코드서명 인증서** — 매장 확대 시 Azure Trusted Signing(연~$120) 하나 구매 → 서명 배선 구현하면 다운로드 경고 제거.
- **#2·#3 실 윈도우앱 눈 확인** — 다음 매장/앱 접속 시: 예약 테이블 원 안 글자 깔끔한지, 하단 프린터 토스트가 POS 결제버튼과 안 겹치는지 1회 확인.
- 인쇄 자가진단 D8 실프린터 종이 확인 · 안드로이드 실 태블릿 폴러 자동인쇄 확인 · 운영 메모리 보호막(earlyoom, Irene sudo 1줄) · 프랜차이즈 맵 좌표 백필(dev완료·미배포) · 소켓 인증 하드닝 · 매출 대조 마감(미구현)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
