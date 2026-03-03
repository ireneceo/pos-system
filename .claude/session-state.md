## 현재 작업 상태
**마지막 업데이트:** 2026-03-03
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- deleteOldImages 유틸리티 함수 생성 (imageProcessor.js)
- 10개 라우트에 이미지 재업로드 시 이전 파일 자동 삭제 적용
  - menu.js, brands.js, foodcourts.js, restaurants.js, admin-settings.js
  - siteSettings.js, ingredients.js, recipes.js, general-stock.js, inventory-routes.js
- site-settings API 최적화 (231KB → 22KB, og_image_url 제외)
- Nginx 정적 파일 캐싱 (이미지/폰트 7일 캐시)
- Contact 페이지 하드코딩 초기값 제거
- 운영서버 배포 완료 (스모크 테스트 6/6)

### 다음 할 일
- DEVELOPMENT_PLAN.md Phase A/B/C 로드맵 잔여 작업
- entity_plan_charges 테이블 운영서버 마이그레이션 (스키마 차이 존재)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
