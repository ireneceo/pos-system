## 현재 작업 상태
**마지막 업데이트:** 2026-03-25
**작업 상태:** 완료
**버전:** v3.6

### 진행 중인 작업
- 없음

### 완료된 작업 (v3.6)
- 이메일 인증 시스템 + MX 검증 + 바운스 처리
- 이메일 템플릿 개선 (Base64 로고, 줄바꿈, 수신거부)
- 회원가입 UX (PhoneInput, 버튼 비활성화, 인증 안내)
- CSV 주문 Import + unmatched 메뉴 매칭 + 히스토리 + Undo
- 고객 결제 확인 화면 (Checkout Display — 2영역 레이아웃)
- System Settings 페이지 (3탭: Preferences/Email/Import)
- Coming Soon 처리 (Subscriptions, Foodcourts)
- 인보이스 플랜명 수정 + 대시보드 구독 배지
- 트라이얼 인보이스 안내
- Inquiry 탭 통일 (Active/Closed)
- Floor Plan/Live Orders → Checkout Display 연동
- 전화번호 국가코드 매칭
- 사운드 아이콘 교체 (speaker-on/off)
- Live Orders CSV 다운로드 개선 (카테고리/옵션)
- 운영서버 배포 v3.6

### 다음 할 일
- Foodcourt General / Owner 데모 계정 Phase 2
- Kitchen Station 시스템 Phase 3~5
- 운영서버 base64 이미지 → 파일 URL 마이그레이션

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
