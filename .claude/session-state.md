## 현재 작업 상태
**마지막 업데이트:** 2026-03-09
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. RecipesTab.tsx 공통 Modal 마이그레이션 완료 (22/22 페이지 완료)
2. 데모 데이터 시스템 Phase 1 구축 완료:
   - User 모델 `is_demo` 컬럼 추가
   - 전용 데모 브랜드(K-Taste Group) + 2개 레스토랑 생성
   - 시드 스크립트 `seed-demo-data.js` (멱등, 전체 리셋)
   - 리셋 스케줄러 `demoResetScheduler.js` (매일 자정, 사이트 타임존)
   - 데모 계정 보호 미들웨어 (비밀번호/프로필 변경 차단)
   - DemoPage.tsx 리다이렉트 동적화 + 안내 문구 업데이트
3. 운영서버 배포 완료 (Smoke 6/6 통과)

### 다음 할 일
- 운영서버에서 `node seed-demo-data.js` 1회 실행 (데모 데이터 시딩)
- DEVELOPMENT_PLAN.md 로드맵 기준 다음 작업 진행

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
