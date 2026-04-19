## 현재 작업 상태
**마지막 업데이트:** 2026-04-19 UTC
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-19)

**오전 — v3.14 (이전 세션 누적) 운영 배포 (smoke 10/10 pass)**

**오후 — Sidebar 실시간 뱃지 + Contract UX 대개편 + P0/P1 필수 필드**
1. Sidebar 실시간 뱃지 갱신 — 전역 소켓 핸들러에 fetchBadgeCounts() 추가
2. Contract 리스트 카드 UX — 금액/잔여기간/위치 표시. 공용 헬퍼 `utils/contractBillable.ts`
3. Contract 리스트 파이프라인 레이아웃 정렬 — 좌우 full 정렬, gap 8px
4. Contract Detail Tab → Smart Accordion — `FormAccordion`+`FormAccordionSection` 신규 컴포넌트
5. Accordion 디자인 정리 — 외곽 박스 제거, 선 구분만, auto-expand 제거
6. Notes & Comments 제목/구분선 중복 제거 — `CommentSection.titleText` prop + `$embedded` 스타일
7. Documents 필수 제거 (외부 DMS 사용 반영)
8. P0 #1 Foodcourt `unit_id` 필수 (Setup 진입 시)
9. P0 #2 Applicant 식별 OR 조건 (company_name OR contact_person)
10. P0 #3 `contract_tasks.is_required` 필드 — DB 컬럼 + 모델 + 라우트 + UI 토글
11. P1 필드 하이라이트 visual — DetailContainer CSS inject, fieldShellClass 헬퍼, 필수 5곳 적용
12. i18n 4개국어 13키 추가 (en/ko/zh/ms)
13. UI_DESIGN_GUIDE 4.4 개정 + 14장 Accordion 패턴 신설
14. 설계 문서 `docs/CONTRACT_DETAIL_UX.md` 실제 구현 기준 최신화

### DB 변경 (dev 적용, 운영 배포 대기)
- `contract_tasks.is_required TINYINT(1) NOT NULL DEFAULT 1` ADD

### 검증 결과
- state-hydration-check 0 warnings
- 빌드 exit 0 (여러 차례), 신규 타입에러 0
- API E2E 23 pass / 0 fail
- health-check 40/40
- `npm run i18n:verify` Errors 0

### 다음 할 일

**운영 배포 (Irene `/배포`):**
- 이번 세션 전체 변경 (P0+P1+UX 대개편)
- DB: `contract_tasks.is_required` 컬럼 ADD

**P2 — Contract 비즈니스 기능 (다음 세션):**
- 만료 임박 알림 이메일 (renewal_alert_months 기반 D-30/60/90)
- Contract → Invoice 자동 청구 연동 (월별 로열티/임대료/관리비)
- `entity_plans.charge_type='one_time'` 확장 — 일회성 가맹비 플랜 등록
- financial_terms ↔ plan 금액 불일치 경고 (상세 페이지)

**P3 — 로드맵 다음 주요:**
- Foodcourt Branch 모델 설계 (`docs/FOODCOURT_BRANCH_MODEL.md`)
- Foodcourt Floor Plan 시스템
- Brand Franchise Map
- Floor Plan → Contract.location_description 자동 동기화

**결정 완료 (개발 안 함):**
- 고객 회원가입 이메일 인증 — 레스토랑 고객은 전화번호 기반이라 불필요
- 주문 확인/영수증 메일 — 이미 WhatsApp/Telegram/텍스트 공유 + PNG 다운로드로 완성

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
