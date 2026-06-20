# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-20 (/개발완료)
**버전:** v3.59 운영 배포됨 (2026-06-19, Backup 20260619_065629). (버전은 /배포 시에만 갱신)
**작업 상태:** 완료. 미배포 묶음(6/19~6/20) 전수 검증 완료 — **Irene 수동 테스트 + 배포 지시 대기**.

### 🧪 다음 세션 최우선 — Irene 수동 테스트
- **`docs/TEST_CHECKLIST_2026-06-20.md`** — 6/19~6/20 미배포 묶음을 Irene가 dev(dev.purplehere.com)에서 직접 테스트할 항목 정리. 다음 세션 진입 시 이 파일부터 안내.
  - 직원 PIN 로그인 / 현금관리 Cash-up(+인출입금) / 취소사유 설정 / 예약↔플로어+체크인+예약-주문 루프 / 주문 전과정 회귀.
  - ⚠️ 실프린터 항목(Z-Report 종이·캐시드로어·주방티켓) + 유효 PIN 실로그인 = **배포 후** 매장 실프린터에서 최종 확인.

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
- **배포 (Irene 지시 시)**: 미배포 묶음 전체(6/19 PIN·PayPal·취소사유 + Cash-up Phase1·2 + 하드닝 + P2-6 예약↔플로어 + 예약-주문 루프) `/배포`. 마이그 **5종**(currency·qz·cash-management·reservation-fpti·cash-phase2, deploy 9a-2 등록됨). **SW_VERSION bump 필요**(프론트 변경). 배포 후 운영검증 + 실프린터 확인(Z-Report·드로어·주방티켓·유효 PIN).

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
