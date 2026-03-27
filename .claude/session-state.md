## 현재 작업 상태
**마지막 업데이트:** 2026-03-27
**작업 상태:** 완료
**버전:** v3.7

### 진행 중인 작업
- 없음

### 완료된 작업 (v3.7)
- Profile > Profile 탭: Save UX 통일 (saving state, 에러 처리, formData 재동기화)
- Profile > Performance 탭 삭제
- Profile > Schedule 탭 반응형 수정 (3단계 breakpoint)
- Profile > Subscription 탭 에러 메시지 개선
- Operation Inquiry 필터 중복 라벨 수정 (7개 페이지)
- Change History: 주문 생성/상태 변경 로그 추가
- Customers: 멤버십 비활성 시에도 통계 업데이트 (total_orders/total_spent/loyalty_tier)
- ManagersPage: 삭제 확인 모달 역할별 영향 안내
- Checkout Display: 레스토랑 국가 기반 전화번호 자동 국가코드 (E.164 저장)
- 쿠폰-고객 통합: 고객 목록에 쿠폰 요약 + 상세 모달 쿠폰 섹션 + 모바일 My Coupons
- per_user_limit 실제 검증 (orders 테이블 기반)
- 빌드 메모리 400MB → 1024MB 증설
- 배포 스크립트 --skip-build 옵션 추가
- CLAUDE.md 빌드 명령어 통일 (npm run build:dev)
- /개발시작 스킬에 CLAUDE.md Read 단계 추가
- 운영서버 배포 v3.7

### 다음 할 일
- DEVELOPMENT_PLAN.md 기반 다음 기능

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
