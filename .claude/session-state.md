## 현재 작업 상태
**마지막 업데이트:** 2026-03-02
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **Floor Plan 매장 운영 허브 대규모 리팩토링** (Phase 1~9 전체 완료)
  - DB guest_count + table-status API 확장 + 결제완료 필터
  - FloorPlanCanvas auto-fit viewBox + 균일 스케일링 (비율 유지)
  - OrderOverlay (POS Terminal 동일 스타일)
  - TableDetailPanel + FloorPlanStatsBar + FloorPlanPage 2단 레이아웃
  - POS Terminal / Live Orders guest_count UI
- **소켓 emit plain object 변환** — 모든 order emit에서 .get({plain:true}) 적용 (8곳)
- **QR코드 결제 설정 버그 수정** — qr/qrPayment 키 불일치 (SettingsPage + QRPaymentPage)
- **운영서버 배포 완료** — 프론트/백엔드 + DB 스키마 동기화

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
