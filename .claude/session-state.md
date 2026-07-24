# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-24 (**운영 배포 3회 완료, 버전 v3.70 유지** — ①인쇄 신선도 근본수정+이월렛 서브타입/몰 매출보고 ②카드·이월렛 서브타입 설정 통일. 둘 다 Fable GO + 운영 실검증)
**버전:** **v3.70** (운영 — 2026-07-24. 2회차 배포는 **버전 미상승 = Irene 결정**, 릴리즈 노트·블로그·공지 생략) · 데스크탑앱 0.1.9 · 안드로이드앱 0.2.0
**작업 상태:** **운영 배포 3회 완료** — 1차(13:26 Backup 131217, 검증44/44) + 2차(16:33 Backup 163333, 검증15/15) + 3차(19:38 Backup 193808, 모바일 이월렛 갭, 검증9/9) — 모두 v3.70. 남은 것 = 실프린터 종이 1회 확인(Irene) + rid=16 모바일 이월렛 QR 업로드 후 재오픈(현재 POS만)

### 진행 중인 작업
- 없음

### ✅ 운영 배포 완료: 카드·이월렛 서브타입 설정 통일 (2026-07-24, Backup 20260724_163333, 버전 미상승)
> Irene "이월렛도 필수인지 아닌지 표시하고, 카드도 이월렛처럼 항목 선택하게 해야 하는 거 아니냐. 왜 다르게 해?" → **지적 두 가지 다 맞음.**

- **원인(이력)**: 카드종류는 2026-05-31 "기록 강제"가 목적이라 종류 5개 하드코딩+필수토글, 이월렛은 2026-07-23 "몰 tng 분리"가 목적이라 취급목록 선택+필수토글 없음 → 설계가 아니라 각자 자란 결과
- **통일 규칙(카드=이월렛 동일)**: `acceptedTypes[]`(취급 종류) + `requireType`(필수 여부). **0개=카드는 기본목록/이월렛은 UI없음 · 1개=자동태깅(캐셔 무입력) · 2개↑=선택**, `requireType`이면 `*`+결제차단
- 단일 소스 `constants/index.ts`: `CARD_TYPE_OPTIONS`·`EWALLET_TYPE_OPTIONS`·`resolvePaymentSubtype()` (설정화면·결제화면이 같은 목록을 본다)
- **하위호환**: 카드 `acceptedTypes` 미설정=기존 5종 / 구 키 `requireCardType` 폴백+동시기록(구 번들 SW캐시 대비) / 이월렛 `requireType` 기본 **true**(도입 전 "2개↑=무조건 필수" 유지)
- **검증**: 운영 전 매장 판정 대조 **44/44 동일(차이 0)** = 배포 즉시 동작 변화 0 실증 · dev 실API 19/19(설정 왕복·폴백·결제 기록) · **실브라우저 결제모달 12/12**(2종노출/미지정숨김/필수*/1종 자동태깅/미지정 5종/이월렛 Optional) · verify-all --full **14/14**(🔒 인쇄 보호파일 8/8 무접촉, 마운트 8역할 크래시0)
- **DB 마이그레이션 없음**(payment_settings JSON 내부). 수정: `constants/index.ts` · `PaymentModal.tsx` · `SettingsPage.tsx` · `models/Restaurant.js`(기본값) · locales 4언어
- **운영 배포**: 안전게이트 fail-closed 통과 · Backup `20260724_163333` · 마이그 49/49 · Smoke 9/9 · 스키마 153테이블 · 스냅샷 1787파일
- **배포 후 운영 검증 15/15**: ★전 매장 판정 대조 **44/44 동일(차이 0)** = 실고객 매장 동작 변화 0 재확인 · 데모 rid=13 설정 왕복(카드 취급종류/이월렛 필수여부/구 키 동시기록) · 카드 1종 자동태깅 · 결제 card_type·ewallet_type 기록 · 원복+테스트주문 완전삭제(잔여 0) · 신규 청크 서빙 200
- ★ **Fable 검증 게이트 완료 → VERDICT: GO** (2026-07-24, 최종본 델타 재확인까지 GO 유지). 치명·중대 코드 결함 0
  - Fable 독립 실증: **운영 21개 매장 전 조합 대조 → 구/신 판정 100% 동일**(존재 조합 5가지: card 서브키 전무 17 / requireCardType만 4 / ewallet acceptedTypes 없음 20 / ['grabpay','duitnow'] 1 / payment_settings NULL 7) = "배포 즉시 동작 변화 0" 재확인
  - Fable 자체 실호출 8/8 + 자체 실브라우저 **21/21**(필수 미선택 차단→선택 후 활성 양방향, requireType 미설정=구 동작 필수 유지 포함) · verify-all 13/13 · 마이그 불필요 확인(payment_settings=MEDIUMTEXT JSON, getter는 rawValue 없을 때만 기본값) · 롤백 안전(구 코드는 신 키 무시)
  - 백엔드 routes/services 에서 `acceptedTypes/requireType` 읽는 곳 **0건**(몰 매출보고는 ewallet_type 컬럼 기준이라 무영향)
  - Fable 지적 조치: ①`aria-pressed` 추가(카드·이월렛 칩) → 재빌드·실브라우저 확인 ②dev rid=38 테스트 잔재 원복 완료
  - Fable 잔여 지적 [경] **SW 캐시 스큐(과도기)**: 구 번들 설정화면은 `requireCardType`만 쓰므로, 신 번들이 먼저 저장한 매장에서 구 번들 기기가 토글을 바꾸면 stale `requireType`이 우선할 수 있음. **더 엄격한 쪽(필수)으로만 기울고 돈 영향 없음**, SW 갱신 시 자연 해소 → 현행 유지 판단
  - Fable [중] "구현자 스크립트 재현 불가"는 **scratchpad 사본이 수정 전 버전**이라 생긴 것(실행본은 `/var/www/dev-frontend`에서 언랩 수정 후 12/12 통과 뒤 삭제). Fable이 언랩 고쳐 21/21로 독립 재검증 → 결론 동일
- 별건 발견(미조치): `formatPaymentDisplay`가 이월렛 서브타입 미반영(카드만 "Card(Visa)") — 빌 인쇄 내용 포함이라 별도 승인 필요

### ✅ 운영 배포 완료: 모바일 이월렛 서브타입 갭 수정 (2026-07-24, 3차 Backup 20260724_193808)
> Irene "포스터미널·플로어플랜·모바일오더에서 주문 들어올 때 다 제대로 적용돼?" → 실측 결과 **모바일만 미적용**.

- **실측 근거**: 운영 90일 rid=16(몰 보고 대상) 이월렛 **모바일 64건 / POS 10건 = 86%가 모바일**인데 `dev-frontend/src/mobile` 전체에서 `card_type/ewallet_type` 참조 **0건** → TNG 지정해도 몰 보고에 POS분 10건만 잡히던 상태
- **POS·Floor Plan·Live Orders 는 이미 정상**(공용 PaymentModal 공유, 오프라인 전액결제 op에도 서브타입 포함) — 실측 확인
- **수정 1**: `mobile/pages/PaymentPage.tsx` — 공용 `resolvePaymentSubtype` 사용(POS와 동일 단일 소스). 1개=자동태깅(손님 입력 0)/2개↑=손님 선택 UI/미지정=묻지 않음, `requireType&&needsChoice` 면 제출 차단, payload에 `ewallet_type`(QR·계좌이체 페이지로 그대로 전달)
- **수정 2**: `PaymentModal.tsx` 오프라인 **분할결제** op에 `card_type/ewallet_type` 추가(온라인 분할·오프라인 전액은 이미 있었고 여기만 누락 — 재생 시 `{...op.payload}` 로 복구 확인)
- **수정 3**: `locales/{en,ko,zh,ms}/common.json` `ewalletTypeQuestion`
- 🔒 **`orders-crud.js` 무접촉** — 모바일이 `/api/orders`(보호파일)로 생성하지만 백엔드 대신 프론트가 값을 채워 보내는 방식 선택
- 🔴 **실브라우저가 잡은 내 결함**: bare `useEffect` 사용 → 이 파일은 `useState`만 import하고 훅을 `React.*`로 쓰는 관례 → **빌드·TS 통과했으나 모바일 결제화면 진입 즉시 `ReferenceError` 백지**(배포됐으면 매장 모바일 주문 결제 전면 차단). `React.useEffect`로 수정·재빌드·재검증. v3.37 TDZ와 같은 계열 = 정적검사로 못 잡음
- **검증**: dev 실호출 **13/13**(1개 자동태깅 저장/2개 손님선택 저장/미지정 NULL/몰 집계가 `orders.ewallet_type` 읽음) · 모바일 실브라우저 **9/9**(3시나리오 크래시0) · verify-all --full **14/14**(마운트 8역할 크래시0 663.8s, 🔒인쇄 보호파일 8/8 무접촉)
- ★ **Fable 게이트 GO** (모바일 갭 델타 독립 재검증 18/18): ewallet_type 생존체인 끝까지 실호출(생성·분할·오프라인재생·retry)·bare훅 전수스윕 재발0·미지정 매장 흐름 완전동일·🔒 orders-crud 무접촉. 지적 조치: 디버그 잔재 2파일 삭제, "선언밖 변경 nav.rentManagement"는 오탐(기존 평면키에 쉼표만)
- **운영 배포(3차)**: Backup `20260724_193808` · 마이그 49/49 · Smoke 9/9 · 신 모바일 청크 서빙 200
- **rid=16 tng 설정 + 검증 12/12**: `acceptedTypes=['tng']` 저장(POS 자동태깅 실효) · 데모매장 동일설정 end-to-end(모바일 ewallet 주문→ewallet_type=tng→몰집계 읽음)·잔여0. **모바일 보류**: qrImage EMPTY로 손님 결제불가 → `availableIn=['pos']` 되돌림

### 완료된 작업 (이번 세션 — 2026-07-24)
- **Fable 5트랙 배포 전 전수 회귀검증** (운영 델타 25파일 기준): 주문코어 **GO** / 결제·인쇄·DB마이그·전역 CONDITIONAL GO → **델타가 만든 신규 회귀 0건**. `acceptedTypes` 0개 = 기존 동작 100% 동일 실증, 대시보드/캐시업은 ewallet_type 미참조(합계 불변), 프린터설정 wipe 자물쇠 3개 실쓰기 생존 증명, mount 8역할 크래시0(664s), 7역할 유저흐름 통과
- **🔒 인쇄 신선도 경계 근본수정** (Irene "철저히 고쳐. 제대로 고쳐"): 판정 기준을 주문 `createdAt` → **`COALESCE(print_needed_at, createdAt)`**. 신규 컬럼 `orders.print_needed_at`("인쇄 필요가 발생한 시각"). 스탬프 7곳 / **⛔ 무스탬프 5곳**(재시도 경로 — 찍으면 누적 방어 붕괴). 기존 행 NULL=폴백이라 **배포 즉시 동작 변화 0**, 백필 안 하는 게 설계
- **반증 실증**: 동일 행에서 구 판정식 창 제외(=버그) / 신 판정식 포함 / 실 API 포함 + kitchen_items=새 품목만
- **회귀테스트 2건 신설** (health-check print 140→142): 25h 주문 +Round 창 포함(실 API 경유) · 재시도 경로 무스탬프+부활 없음
- **Fable 적대 검증 GO**: 스탬프 전수 7/7(DB 트리거 0개까지 폐쇄 증명) · 무스탬프 6엔드포인트 실호출 전부 NULL · **인쇄고장 매장 3사이클 시뮬 → 부활 0** · 생성 SQL 육안 · 오프라인 재생 3방향 · 취소표 계약 유지 · EXPLAIN 신/구 동일
- **grabpay 백필 미실행 확정** (Irene 위임 → Fable 판정): NULL≡grabpay 로 출력 무변화 · 몰 7일창 소급없음 · 97.3%가 몰 무관 매장(K-DINE 12,556) 오태깅 · 재실행 footgun → registry+스크립트 "⛔ 운영 실행 금지" 명기, dev 원복(241+2 → NULL)
- 문서: `docs/PRINT_RULES_MATRIX.md` 🔒 pending-print 창 신선도 규칙 신설 · 메모리 [[reference_pending_print_window]] 갱신

### 다음 확정 작업
- **rid=16(The Fire @ IOI Mall) 모바일 이월렛 QR 업로드 후 재오픈** — 배포된 모바일 이월렛 서브타입 코드는 완성됐고 rid=16 `acceptedTypes=['tng']`도 설정됨(POS 이월렛은 이미 자동 태깅 실효). **모바일은 보류**: ewallet `qrImage`가 비어(EMPTY) 손님이 스캔할 QR이 없어 결제 불가('Loading...'만 표시) → 안전을 위해 `availableIn`을 `['pos']`로 되돌려 둠. **매장 TNG QR 이미지 확보 시**: 설정>결제수단에 업로드(또는 이미지 받아 직접 반영) + `availableIn`에 `'mobile'` 추가 한 줄 → 모바일 TNG도 몰 보고에 자동 태깅. 참고: rid=16 6월 모바일 이월렛 36건 RM2,971(적지 않음, 6/30 이후 중단 = QR 부재 추정)
- 없음(그 외) — 지시 대기 (배포는 아래 조건 충족 + Irene /배포)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **IOI Mall 가동**: rid=16 `acceptedTypes=['tng']` 지정 완료(POS 태깅 실효) → 몰 운영 자격증명 수령 시 production 전환·enabled=true · 임대인 회신(인증 검증완료+샘플+운영 machine ID 요청). ⏸ 모바일 TNG는 rid=16 QR 업로드 후 재오픈(위 다음 확정 작업)
- **`GET /api/restaurants` 과다노출**(Fable 발견, 이번 델타 무관 기존 동작): Supplier·Staff 토큰에도 `payment_settings`(게이트웨이 비밀키 필드)·`printer_settings`·전 매장 목록 반환 — 운영 실노출값=with MIN 은행계좌+프린터설정(비밀키 현재 미설정). 별도 이슈로 검토
- `formatPaymentDisplay` 이월렛 서브타입 미반영(카드만 "Card(Visa)") — 빌 인쇄 내용 포함이라 인쇄 별건 승인 필요 / `DailySettlementPrint.tsx` 카드 라벨맵 중복(단일소스 미적용, 인쇄물)
- 이월렛 비차단 후속(기존): PaymentModal isOpen 리셋(주문간 잔존) · `table_number` 10자 초과 시 raw DB에러 노출(사용자 메시지로 교체)
- 프론트 백로그 컷오프도 `print_needed_at ?? createdAt` 로 정렬(🔒 폴러 보호파일 — 별건 승인 필요)
- ENCRYPTION_KEY 강화(go-live 직전, 재실행 금지) · 개발서버 sudoers Irene visudo -c · 인쇄 자가진단 D8 실프린터 · 안드로이드 실기기 폴러 · 소켓 인증 하드닝 · 매출 대조 마감 · exe 코드서명 인증서(Irene 결정)

---

## 🔵 배포 전 필수 순서 (Fable 조건)

1. ✅ **Irene 인쇄 변경 명시 승인 완료 (2026-07-24)** — ①pending-print 24h 신선도 경계(7/23) ②신선도 기준 교정 print_needed_at(7/24). 티켓 포맷·발송방식·라우팅 무변경 + 계약테스트 4건 박제. 승인 전 diff 실측 확인: orders-crud +49/-4(스탬프 5블록 + 창 판정 COALESCE), POSTerminalPage 3줄(ewallet 결제 plumbing, 인쇄 블록 무접촉)
2. ✅ **print-guard bless 완료** — `print-guard.manifest.json` blessed_at 2026-07-24T13:06:36Z (8파일). 이후 verify-all **13/13 전 게이트 통과**(health-check 회귀·인쇄 라우트가드·마이그 레지스트리 미분류 0 포함)
3. ✅ **운영 배포 완료 (2026-07-24)** — 안전게이트 9/9 · Backup `20260724_131217` · post-build mount sweep · 마이그 49/49(`migrate-add-ewallet-type`·`migrate-print-needed-at` 포함) · Smoke 9/9 · 스냅샷 1787파일
4. ✅ **운영 컬럼 확인** — `orders.print_needed_at`(datetime NULL) · `orders.ewallet_type`·`order_payments.ewallet_type`(varchar20 NULL)
5. ✅ **운영 실업무 검증 44/44 PASS** (데모매장 rid=13, is_demo=1 — 실고객 매장 무접촉, 생성데이터 FK 완전삭제·잔여 0)
   - 주문생성→주방인쇄(/printed)→큐 소멸(정확히 1번)→+Round 재등장, kitchen_items 새 품목만
   - ★핵심: 25h 열린 테이블 +Round 가 큐에 포함(배포 전이면 무음유실) / 구 데이터(스탬프 NULL)는 7/23 동작 그대로 제외
   - ★재시도 경로(claim·re-arm) 무스탬프 실증 = 인쇄고장 매장 옛 행 부활 0
   - 단계이동 4단계 · 테이블이동(pending_reprint=move) · void(=void) · 주문취소(=cancel) + **오래된 주문 취소표 경계 면제 유지**(2026-06-24 계약)
   - 결제: POS 즉시결제→`orders.ewallet_type=tng` / 후불정산→`order_payments.ewallet_type=grabpay` / 카드 대칭 확인 / 현금 금액정합
6. ⏳ **Irene 실프린터 종이 1회 확인** — 신규 주문 오더티켓 1장(코드로 종이는 못 봄)
7. ⏳ rid=16 `payment_settings.ewallet.acceptedTypes` 지정(몰 tng 분리)
- ⛔ **grabpay 백필은 실행하지 않는다**(미실행 확정) · ⛔ **encryption-key-rotation 도 이번 배포에서 실행 안 함**(go-live 직전 1회 전용, 재실행 시 자격증명 파괴 위험)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
