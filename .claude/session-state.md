## 현재 작업 상태
**마지막 업데이트:** 2026-03-24
**작업 상태:** 완료
**버전:** v3.5

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. QZ Tray 네트워크 프린터 연동 (Station별 IP, Setup Guide 모달)
2. 보안 패치 5건 (users/orders/restaurants 접근제어, XSS sanitize)
3. FoodcourtReportsPage 생성 (Brand와 동일 6탭)
4. OwnerReportsPage 통화 버그 수정
5. Manager Restaurants 실데이터 연동 (todaySales/staffCount)
6. Inquiry 탭 통일 6개 페이지 (Active/Closed + Close 버튼)
7. 미사용 파일 4개 삭제 + app.js 정리
8. Brand General 사이드바에 Coupons 추가
9. CLAUDE.md 보안/코딩/문서 가이드 추가
10. /복원 명령어 + 긴급 대응 체계
11. 프로젝트 아키텍처 안정성 분석
12. 역할 문서 Staff → Restaurant Staff
13. 운영서버 배포 v3.5 (Smoke 9/10)

### 다음 할 일
- 이메일 시스템 강화 (템플릿 개선 + 인증 + MX 검증 + 바운스)
- CSV 데이터 마이그레이션 (카테고리→메뉴→옵션→주문 4단계)
- Coming Soon 페이지 처리 (미구현 9개 페이지)
- 전역 주문 알림 소리

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
