## 현재 작업 상태
**마지막 업데이트:** 2026-02-03
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- Contact Form에 "Start Free Trial (7 days free)" 옵션 추가
- Free Trial 선택 시 Preferred Username 필드 표시
- Backend에 inquiry_type, preferred_username 필드 저장 지원
- Pricing 페이지: 통화 가격 없을 시 "Contact Us" 표시
- Plans 관리 페이지: 통화 가격 없을 시 "Price Not Set" 표시
- addon-modules 메뉴 및 라우트 삭제
- deploy-dev.sh 수정: nginx 배포 폴더로 자동 복사
- Support Ticket 필터링 (customerId) 기능 추가

### 다음 할 일
- 운영서버 배포 (필요 시)
- 추가 기능 요청 대기

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
