## 현재 작업 상태
**마지막 업데이트:** 2026-03-25
**작업 상태:** 완료
**버전:** v3.5

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-03-24~25)
1. QZ Tray 네트워크 프린터 연동
2. 보안 패치 5건 + CLAUDE.md 보안/코딩 가이드
3. FoodcourtReportsPage + OwnerReportsPage 통화 수정
4. Manager Restaurants 실데이터 연동
5. Inquiry 탭 통일 6개 페이지 (Active/Closed + Close 버튼)
6. 미사용 파일 4개 삭제 + app.js 정리
7. /복원 명령어 + 긴급 대응 체계
8. 이메일 템플릿 개선 (로고 Base64, 줄바꿈, 수신거부)
9. 이메일 인증 시스템 (인증 링크, 로그인 차단, 재발송)
10. MX 레코드 검증 + 바운스 처리
11. 회원가입 UX (버튼 비활성화, PhoneInput, 인증 안내)
12. 인보이스 플랜명 수정 (Brand/FC/Owner payer plan_type)
13. 대시보드 구독 배지 (Brand/FC/Owner)
14. 트라이얼 인보이스 안내
15. 이메일 URL 환경 분리 (dev/prod)
16. 운영서버 배포 v3.5

### 다음 할 일
- CSV 데이터 마이그레이션 (카테고리→메뉴→옵션→주문 4단계)
- Coming Soon 페이지 처리 (미구현 9개 페이지)
- 전역 주문 알림 소리

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
