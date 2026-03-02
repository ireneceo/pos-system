## 현재 작업 상태
**마지막 업데이트:** 2026-03-02
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- 통화별 Additional Charges 데이터 구조 변경 (flat array → per-currency object)
- Admin/Brand/Foodcourt Payment Settings UI를 통화 탭 안으로 이동
- Admin/Brand/Foodcourt InvoicesPage에 통화별 charges 자동 적용
- 백엔드 자동 인보이스(구독/Entity Plan)에 Payment Settings charges 적용 (6% 하드코딩 제거)
- Foodcourt 결제설정 저장 시 additionalCharges 누락 버그 수정
- RM→MYR 통화 코드 정규화 (normalizeCurrencyCode)
- 운영서버 배포 완료 (2026-03-02)

### 다음 할 일
- DEVELOPMENT_PLAN.md 로드맵 기반 다음 작업 진행

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
