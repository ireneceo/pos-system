# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-24 (**v3.70 운영 배포 완료** — Fable 전수검증 + 🔒 인쇄 신선도 근본수정 + 이월렛 서브타입/몰 매출보고. 운영 실업무검증 44/44)
**버전:** **v3.70** (운영 — 2026-07-24 배포. 버전은 /배포 시에만 갱신) · 데스크탑앱 0.1.9 · 안드로이드앱 0.2.0
**작업 상태:** **운영 배포 완료 (2026-07-24 13:26 UTC)** — Backup 20260724_131217 · Smoke 9/9 · 마이그 49/49 · 스키마 153테이블 · 운영 실업무검증 **44/44 PASS**. 남은 것 = 실프린터 종이 1회 확인(Irene) + rid=16 acceptedTypes 지정

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-24)
- **Fable 5트랙 배포 전 전수 회귀검증** (운영 델타 25파일 기준): 주문코어 **GO** / 결제·인쇄·DB마이그·전역 CONDITIONAL GO → **델타가 만든 신규 회귀 0건**. `acceptedTypes` 0개 = 기존 동작 100% 동일 실증, 대시보드/캐시업은 ewallet_type 미참조(합계 불변), 프린터설정 wipe 자물쇠 3개 실쓰기 생존 증명, mount 8역할 크래시0(664s), 7역할 유저흐름 통과
- **🔒 인쇄 신선도 경계 근본수정** (Irene "철저히 고쳐. 제대로 고쳐"): 판정 기준을 주문 `createdAt` → **`COALESCE(print_needed_at, createdAt)`**. 신규 컬럼 `orders.print_needed_at`("인쇄 필요가 발생한 시각"). 스탬프 7곳 / **⛔ 무스탬프 5곳**(재시도 경로 — 찍으면 누적 방어 붕괴). 기존 행 NULL=폴백이라 **배포 즉시 동작 변화 0**, 백필 안 하는 게 설계
- **반증 실증**: 동일 행에서 구 판정식 창 제외(=버그) / 신 판정식 포함 / 실 API 포함 + kitchen_items=새 품목만
- **회귀테스트 2건 신설** (health-check print 140→142): 25h 주문 +Round 창 포함(실 API 경유) · 재시도 경로 무스탬프+부활 없음
- **Fable 적대 검증 GO**: 스탬프 전수 7/7(DB 트리거 0개까지 폐쇄 증명) · 무스탬프 6엔드포인트 실호출 전부 NULL · **인쇄고장 매장 3사이클 시뮬 → 부활 0** · 생성 SQL 육안 · 오프라인 재생 3방향 · 취소표 계약 유지 · EXPLAIN 신/구 동일
- **grabpay 백필 미실행 확정** (Irene 위임 → Fable 판정): NULL≡grabpay 로 출력 무변화 · 몰 7일창 소급없음 · 97.3%가 몰 무관 매장(K-DINE 12,556) 오태깅 · 재실행 footgun → registry+스크립트 "⛔ 운영 실행 금지" 명기, dev 원복(241+2 → NULL)
- 문서: `docs/PRINT_RULES_MATRIX.md` 🔒 pending-print 창 신선도 규칙 신설 · 메모리 [[reference_pending_print_window]] 갱신

### 다음 확정 작업
- 없음 — 지시 대기 (배포는 아래 조건 충족 + Irene /배포)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **IOI Mall 가동**: 배포 후 rid=16 acceptedTypes 지정 → 몰 운영 자격증명 수령 시 production 전환·enabled=true · 임대인 회신(인증 검증완료+샘플+운영 machine ID 요청)
- **`GET /api/restaurants` 과다노출**(Fable 트랙5 발견, 델타 무관 기존 동작): Staff 토큰에도 전 매장 33곳 + 관리자 email/phone 반환 — 별도 이슈로 검토
- 이월렛 비차단 후속: PaymentModal isOpen 리셋(주문간 잔존, 구 card_type 동일 패턴) · split 오프라인 op card_type/ewallet_type 미포함(기존 갭) · 모바일 이월렛 서브타입
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
