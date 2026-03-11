## 현재 작업 상태
**마지막 업데이트:** 2026-03-11
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. 인보이스 할인(discount) 버그 수정 - JS falsy 버그 (0 || fallback) 전체 수정
2. 인보이스 수정 시 additional_charges 저장 안되는 버그 수정 (백엔드 PUT + 프론트엔드 5개 역할)
3. 중복 PUT /:invoiceId 엔드포인트 제거 (dead code)
4. Brand/Foodcourt 인보이스 HTML 템플릿 + 상세보기 모달 - 하드코딩 "Tax (6%)" → 동적 additionalCharges 렌더링
5. Owner/Restaurant 인보이스 페이지 - discount/charges 필드 매핑 누락 수정
6. Owner 백엔드 (routes/owner.js) - GET 인보이스 응답에 discount 필드 추가
7. InvoiceScheduler - InvoiceItem total_amount + entity plan charges falsy 체크 수정
8. Trial→Invoice 갭 해소 - 회원가입 시 첫 인보이스 즉시 생성 (dueDate = trial 종료일)
9. 배포 스크립트 강화 - rsync 검증, 파일 크기 비교, JS hash 확인, PM2 uptime, smoke test
10. CLAUDE.md 검증 워크플로우 - 실제 API 테스트 필수화
11. SignupPage 배너 높이 통일 (min-height 160px) + ScrollToTop 개선 (scrollRestoration=manual)
12. /개발완료 스크립트 보강 - Docs 문서 검토/업데이트 단계 + 체크리스트 11항목
13. 누락 인보이스 DB 수정 (INV-260310001, INV-260310002 additional_charges 추가)

### 다음 할 일
- Irene 확인 후 운영서버 배포
- Phase C 잔여: Stripe/PayPal 연동 (해외 고객 요청 시), 세금계산서, AI 마케팅 인사이트

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
