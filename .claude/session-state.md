## 현재 작업 상태
**마지막 업데이트:** 2026-03-03
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- ESLint 빌드 경고 265개 → 0개 전량 제거 (unused var 106개 + exhaustive-deps 44개)
- Floor Plan TableDetailPanel +Order/Revert 버튼 아이콘만 표시 (텍스트 겹침 해결)
- 쿠폰 타겟팅 기능 (target_type, target_customer_ids, target_loyalty_tiers)
- 운영서버 배포 완료 (Smoke test 6/6 passed)

### 다음 할 일
- TypeScript 타입 경고 정리 (선택사항, 기존부터 존재하던 TS 타입 에러들)
- DEVELOPMENT_PLAN.md 로드맵 기반 다음 작업 진행

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
