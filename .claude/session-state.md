# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-22 (v3.38 + hotfix #1 운영 배포 완료)
**버전:** **v3.38** 운영 (hotfix #1 동일 날짜 누적 배포)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **v3.38 운영 배포** (Split bill + Order History + Auto-merge 선택 + 통계 row 별 정확 분배 + 성능 -52%)
- **v3.38 hotfix #1 운영 배포** (같은 날 누적):
  - Customer Display force placement 4-timer (Chromium PWA 좌표 무시 우회 강화)
  - Floor Plan Customer Display 버튼 추가 (POS Terminal 과 동일 흐름)
  - 사이드바 "Customer Display" → "Pickup Display" 라벨 분리
  - Customer Display 멤버십 키패드 토글 위치 정정 (Printer → Membership 탭)
  - ToggleSwitch + AutoSaveField wrap (자동저장 인디케이터 일관화)
  - 테이블 풀라벨 통일 (`utils/tableLabel.ts` — "Zone / A1" 형식, hyphen 제거)
- **DB 마이그레이션 idempotent 운영 적용**: orders.payment_status `partial` ENUM + amount_paid 컬럼 + order_payments + order_actions 신규 테이블
- **운영 데이터 보존 검증**: orders 10,676 건 100% 보존, payment_status 분포 일치, smoke 10/10

### 다음 확정 작업
- **모바일 카트 / account 페이지 우측 상단 "🍽️ Dine-In" 표시 제거** (Irene 요청 2026-05-22)
  - URL: `/mobile/{slug}/cart`, `/mobile/{slug}/account`
  - 메뉴 페이지 외 카트/계정 페이지엔 order type 표시 불필요

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- React Query 도입 (Priority A, `docs/PERFORMANCE_OPTIMIZATION_PLAN.md`)
- Backend composite endpoints (Priority B)
- 응답 size 최적화 (Priority C)
- cache-bust 정리 (Priority D)
- 서버 캐싱 (Priority E)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
