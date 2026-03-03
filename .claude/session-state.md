## 현재 작업 상태
**마지막 업데이트:** 2026-03-03
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- ESLint 빌드 경고 265개 → 0개 전량 제거
- Floor Plan TableDetailPanel +Order/Revert 버튼 아이콘만 표시
- 쿠폰 타겟팅 기능 (target_type, target_customer_ids, target_loyalty_tiers)
- Admin/Brand/Foodcourt PlansPage 통화 필터 버그 수정 (USD 기본값→동적, API 응답 키 수정)
- Pricing 페이지 하얀 에러 해결 (features JSON 문자열→배열 파싱)
- PlanPrice 모델 복합 유니크 키 인덱스 추가
- FAQ/Blog DB 마이그레이션 (개발→운영, content_categories 10건 + contents 25건)
- 운영서버 배포 2회 (Smoke test 6/6 passed)

### 다음 할 일
- 운영서버 plan_prices 데이터 정리 (개발서버와 동기화)
- 운영서버 plan_templates 데이터 정리 (Brand/Foodcourt 플랜 추가)
- DEVELOPMENT_PLAN.md 로드맵 기반 다음 작업 진행

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
