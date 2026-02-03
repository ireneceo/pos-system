## 현재 작업 상태
**마지막 업데이트:** 2026-02-03
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- Support Ticket customerId 필터링 구현
- Brand/Foodcourt General이 본인 티켓만 보도록 API 및 프론트엔드 수정
- Backend GET /api/support-tickets에 customerId 파라미터 추가
- SystemInquiryPage API 호출 방식 수정 (userId → customerId)
- curl 및 DB 조회로 필터링 동작 검증 완료

### 다음 할 일
- Phase A-1: CSV 다운로드 버그 수정 (Reports 페이지)
- Phase A-2: PDF 다운로드 버그 수정 (Invoice 페이지)
- Phase A-3: Pricing 페이지 구현
- Phase A-4: Contact 페이지 구현

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
