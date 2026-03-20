## 현재 작업 상태
**마지막 업데이트:** 2026-03-20
**작업 상태:** 완료
**버전:** v3.4

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. ServerHealthMonitor 제거 (SSH 인증 실패 반복 → 불필요 기능 삭제)
2. 운영 DB server-health 로그 1146건 정리
3. 모바일 인기메뉴 카테고리 제외 설정 (popular_excluded_category_ids)
4. 모바일 카테고리 시간 제한 (category_schedules, 자정 넘김 지원)
5. Settings > Mobile Order 탭 UI 추가 (Popular Categories + Time Restrictions)
6. Settings 2열 레이아웃 정리 (빈 공간 제거)
7. 배포/개발완료 명령어 버전 관리 규칙 추가
8. 운영서버 배포 (Smoke 9/10)

### 다음 할 일
- 전역 주문 알림 소리 (MainLayout에서 WebSocket, 어느 페이지에서든 소리)
- 모바일 추천/인기메뉴 Irene 현장 확인
- 운영서버 base64 이미지 → 파일 URL 마이그레이션
- Foodcourt General / Owner 데모 계정 Phase 2
- Kitchen Station 시스템 Phase 3~5

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
