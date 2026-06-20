# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-20 (재검증 — 실라우트 통합검증 + 버그 1건 수정)
**버전:** v3.59 운영 배포됨 (2026-06-19, Backup 20260619_065629). (버전은 /배포 시에만 갱신)
**작업 상태:** 완료. 미배포 묶음(6/19~6/20) 전수 재검증 완료 — **Irene 수동 테스트 + 배포 지시 대기**.

### 🐛 재검증 중 발견·수정 (2026-06-20) — PIN 로그인 차단 버그
- **증상:** 신규 P1-4 직원 PIN 로그인이 **익명 상태에서 항상 401** → PIN 로그인 자체가 동작 불가.
- **원인:** `routes/staff.js` 의 `router.use(authenticateToken)` 가 1차 로그인용 `/verify-pin` 까지 막음 (authenticateToken 은 Authorization 헤더만 읽고 쿠키 폴백 없음 → 토큰 없는 로그인은 무조건 401). server.js 주석은 "verify-pin = unauthenticated primary login" 으로 의도 명시 → router-level 가드가 누락 검토.
- **수정:** `/verify-pin`(로그인) 라우트만 `router.use(authenticateToken)` **위로** 이동해 공개화. `verify-pin-permission`(할인/취소 승인, req.user 의존)·`GET /staff`(직원목록 PIN 노출)는 **인증 유지**. pinLimiter 가 브루트포스 방어.
- **영구 가드:** health-check 에 3건 추가(101→**104/104**): ①익명 verify-pin 공개(누락PIN→400) ②익명 /staff→401 ③익명 verify-pin-permission→401.
- **재검증 결과:** 신규 4기능 실라우트 통합검증 **33/33**(데모38, 전량 원복) · health **104/104** · print-guard **8/8** · build 0 · hydration 0 · timezone 0 · mount(cash-up·reservations·/pos·/login) 0크래시.
- **커밋:** `910b23be` (staff.js + health-check.js). dev 백엔드 재시작 완료 → dev.purplehere.com 반영. 배포 시 묶음에 포함. **미배포.**

### 🧪 다음 세션 최우선 — Irene 내일 dev 수동 테스트 (이후 `/배포`)
**진입 시 `docs/TEST_CHECKLIST_2026-06-20.md` 부터 안내.** 장소=dev.purplehere.com, 평소 매장관리자 계정 로그인. 권장 순서:

1. **직원 PIN 로그인** ← 이번에 고친 부분, **여기부터**. 로그인 화면 "직원 PIN" 전환 → 온스크린 숫자패드로 PIN 입력 → 로그인됨. (자동검증 통과: 유효PIN→토큰 / 틀린PIN→차단 / 누락→안내)
2. **현금관리 Cash-up** (사이드바 Cash Up → /cash-up): 교대시작(개시현금 자동제시) → 카운트(예상금액 안 보임=블라인드) → 차이공개("RM2 부족"+신호등) → 마감(마감현금 다음교대 이월) + 인출/입금 팝업.
3. **취소사유 설정** (설정): 끔/선택/필수 전환 → 필수일 때 사유 없이 취소 막힘.
4. **예약↔플로어 + 루프**: 예약에 테이블 배정 → 같은시간 같은테이블 이중예약 차단 → 플로어 "예약됨" 배지 → Arrived(도착) 시 POS 자동열림 → 주문생성=예약 seated → 결제완료=예약 completed.
5. **주문 전과정 회귀** (생명선): 생성/단계진행/결제/추가주문/테이블이동/삭제.

⚠️ **실프린터·실드로어 항목은 dev 불가 → 배포 후 매장에서만**: Z-Report 종이 출력 / 캐시드로어 개방 / 주방티켓(1장+추가분) / 매장 실 PIN 로그인. dev 에선 버튼 동작(에러없음)까지만 확인.
- 자동검증은 끝났으니(33/33 실라우트 + health 104/104 + mount 0크래시) **사람 눈 확인이 필요한 화면 흐름 위주**로 보면 됨.

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, 2026-06-20)
- **30년차 감사 하드닝** — Cash: 취소주문 결제 제외(횡령누명 버그), requirePosCounter 권한게이트, 대조 무결성(non-open거부/1교대1대조/movement잠금/대조없는close거부), 진짜 블라인드 카운트. 예약: 이중예약 409·픽스처 거부·유령배지 억제·스케줄러 자동완료·체크인가드.
- **예약-주문 루프 완성** — Order.reservation_id 백엔드 테이블기반 자동링크(POSTerminal 무수정) + arrived→seated(주문생성) + 결제완료 시 seated→completed.
- **UI 통일** — Cash 인출/입금 커스텀 오버레이→표준 Modal, `+` prefix 제거, 예약 floor_lead(플로어 리드타임) 설정 컨트롤.
- **데모 위생 정리** — 과거 테스트 잔재(주문↔결제↔예약 FK연쇄) 전량 삭제(테스트주문 0·고아결제 0·활성예약 0).
- **Irene 테스트 체크리스트 작성** — `docs/TEST_CHECKLIST_2026-06-20.md`.
- 검증: 주문루트 30/30 · 예약루프 10/10 · 하드닝 13/13 · Cash Phase2 18/18 · health 101/101 · 인쇄계약 8/8 · build0 · hydration0 · timezone0 · i18n0 · print-guard 8/8(orders-crud print-neutral re-bless) · mount 변경 critical 전수 0크래시.

### 다음 확정 작업
- **배포 (Irene 내일 테스트 후 지시 시)**: 미배포 묶음 전체(6/19 PIN로그인[+차단버그 수정]·PayPal·취소사유 + Cash-up Phase1·2 + 하드닝 + P2-6 예약↔플로어 + 예약-주문 루프) `/배포`. 마이그 **5종**(currency·qz·cash-management·reservation-fpti·cash-phase2, deploy 9a-2 등록됨 — PIN 픽스는 코드만이라 신규 마이그 없음). **SW_VERSION bump 필요**(프론트 변경). 배포 후 운영검증 + 실프린터 확인(Z-Report·드로어·주방티켓·유효 PIN).

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 동시 open 교대 DB 유니크 가드(TOCTOU), 통화별 variance 임계값, PaymentMethodSetting 등록 UI.
- 운영 피드백 잔여: 특정일/기간 운영시간 오버라이드(라마단), 마감 차단 주문시도 로깅, FG-6 쿠폰 실구현, nginx www→apex 301.
- 구독역할 무료화 전략(Owner/FG/Supplier/BG 통합 대시보드 무료+매장단위 과금) — Irene 4역할 동시 검토 예정.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
