## 현재 작업 상태
**마지막 업데이트:** 2026-04-03
**작업 상태:** 완료
**버전:** v3.7

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- Kitchen Display 기본 탭 Order 고정
- Kitchen Station URL 파라미터 (?station=1 순서 기반)
- Item View 아이템 묶기 제한 (time_limit/max_count) — 기존 로직 미수정 후처리
- Kitchen Display Merge 설정 UI (Item 탭 좌측 표시 + Settings 바로가기)
- Settings Kitchen Stations 탭 Item Merge Settings 카드
- Restaurant 모델 kitchen_item_merge JSON 필드
- 테스트 계정 비밀번호 보호 (demoProtection에 is_test 추가 + 리셋 API 차단)
- 테스트 계정 비밀번호 복원 + owner 계정 생성
- 시재/발주 통합 기획서 작성 (docs/PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md)
- CLAUDE.md 빌드 규칙 추가 (백그라운드 필수, 캐시 삭제 금지)
- 빌드 스크립트 개선 (GENERATE_SOURCEMAP=false, 빌드 시간 표시)

### 다음 할 일
- 시재/발주 시스템 구현 Phase A (시재 관리) — docs/PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md 참조
- 또는 데모 데이터 Phase 2 (Foodcourt/Owner 데모 계정)

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
