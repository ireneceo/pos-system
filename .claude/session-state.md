## 현재 작업 상태
**마지막 업데이트:** 2026-03-02
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **Floor Plan 매장 운영 허브 대규모 리팩토링** (Phase 1~9 전체 완료)
  - DB guest_count 컬럼 + table-status API 확장
  - types.ts / TableNode guestCount 표시
  - OrderContext guest_count 매핑
  - FloorPlanStatsBar (하단 범례+통계)
  - TableDetailPanel (우측 상세 패널: 주문조회/상태변경/결제)
  - FloorPlanPage 2단 레이아웃 (캔버스 + 디테일패널 + 결제모달)
  - OrderOverlay (POS Terminal 동일 스타일 메뉴+카트+주문)
  - POS Terminal guest_count UI
  - FloorPlanCanvas auto-fit viewBox + 균일 스케일링 (비율 유지)
  - Live Orders guest_count 실시간 표시 (4곳)
  - 소켓 emit plain object 변환 (guest_count 실시간 전달)
  - table-status API 결제완료 주문 필터링

### 다음 할 일
- Floor Plan 실제 사용 테스트 (테이블 클릭 → 상세패널 → 주문/결제/상태변경 플로우)
- 서비스 오픈 준비 로드맵 계속 진행

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
