## 현재 작업 상태
**마지막 업데이트:** 2026-03-25
**작업 상태:** 완료
**버전:** v3.5

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-03-25)
1. CSV 주문 Import 시스템 (업로드 + 자동매핑 + unmatched 매칭 + 히스토리 + Undo)
2. System Settings 페이지 (Notification Settings → 3탭: Preferences/Email/Import)
3. Coming Soon 처리 (Subscriptions, Foodcourts 사이드바 회색)
4. 사운드 아이콘 교체 (speaker-on/off.svg)
5. 고객 결제 확인 화면 (CheckoutDisplayPage — POS 카트 실시간 + 전화번호 입력)
6. Live Orders CSV 다운로드 개선 (Item Details 카테고리/옵션 포함)

### 다음 할 일
- 고객 결제 확인 화면 실사용 테스트 (POS + 태블릿 동시 테스트)
- POS Terminal에 "Customer Screen" 버튼 추가 (checkout-display URL 열기)
- 운영서버 배포
- Foodcourt General/Owner 데모 계정 Phase 2
- Kitchen Station 시스템 Phase 3~5
- 운영서버 base64 이미지 → 파일 URL 마이그레이션

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
