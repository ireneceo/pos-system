## 현재 작업 상태
**마지막 업데이트:** 2026-02-25
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- Reports 타임존 적용 마무리 (ReportsPage dueDate에 siteTimezone 적용)
- 사이트 타임존 설정 (Admin > Site Settings, CompanySettings.timezone)
- Dashboard 통화 필터 개선 (supported_currencies만 표시, All 제거, 인보이스 건수 기준 기본 통화)
- Reports 기간 필터 개선 (All 추가, 백엔드 period=all 지원)
- Server Health 모니터 최적화 (info 로깅 제거, securityUpdates 오탐 수정)
- SystemLogsPage Auto-scroll 구현 (useRef + useEffect)
- 시스템 로그 대응 가이드 (logActionGuides.ts + UI 패널)
- Dashboard 시스템 알림 (alerts-summary API + AlertsPanel)
- 이메일 자동 알림 (systemLogger error/critical → 이메일, 1시간 중복 방지)
- 운영서버 배포 완료 (스모크 테스트 6/6 통과)

### 다음 할 일
- Phase C: 셀프 회원가입, 세금계산서

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
