## 현재 작업 상태
**마지막 업데이트:** 2026-04-19 UTC
**작업 상태:** 완료 (v3.15 운영 배포 완료)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-19)

**v3.14 누적 배포 (오전)** — 이전 세션 미배포 변경 + 첫 Accordion/Pipeline 카드 변경분

**v3.15 배포 (저녁 20:44 UTC)** — 대규모 변경

주요 기능:
1. Sidebar 실시간 뱃지 갱신
2. Contract 리스트 카드 UX (금액/잔여기간/Foodcourt 위치), 레이아웃 정렬
3. Contract Detail Tab → Smart Accordion 전환 (FormAccordion 신규)
4. 필드 하이라이트 + RequiredBanner + ReadyBanner + 버튼 정책 전환
5. Notes & Comments 제목/구분선 중복 제거
6. Documents 필수 차단 제거 (외부 DMS 대응)
7. P0 3건: Foodcourt unit_id 필수 / Applicant OR / contract_tasks.is_required
8. P1 UX 마무리: 하이라이트 visual, 인라인 에러, i18n 4개국어 13키
9. P2 #1 Contract 만료 알림 (스케줄러 + 이메일 + ExpiryBanner + ?action=renew)
10. P2 #2 Contract↔Invoice 연결 (contract_id + Billing 섹션 + One-time Invoice prefill)
11. P3 Foodcourt Branch 시스템 (다지점 지원 + 마이그레이션)
12. Unit full code 표시 (BRANCH-UNIT 형식)
13. Phase A Foodcourt Manager 지점 할당 + Phase B Brand Manager 브랜드 할당
14. Restaurant ↔ Branch 연결 (restaurants.branch_id)
15. 사이드바 정리 (obsolete placeholder 제거, Branches 메뉴 Management 첫번째로)
16. FoodcourtStaffPage 버튼 사이즈 통일

보안 수정 2건:
- Brand 권한 `brand.owner_id === user.id` 기반 개편 (다중 브랜드 소유자 지원, 6 라우트)
- Invoice PUT IDOR null-safe 비교 (cross-entity 편집 차단)

스코프 버그 수정 2건:
- Foodcourt General `/api/restaurants` 필터 누락 + `optionalAuth` 필드 누락
- `/api/restaurants/manager/:managerId` Foodcourt General 경로 분기 추가

### DB 변경 (운영 sync 완료)
- `contract_tasks.is_required`
- `contracts.last_expiry_notification_day`
- `invoices.contract_id`
- `foodcourt_branches` (신규 테이블)
- `foodcourt_units.branch_id`
- `users.branch_id`
- `restaurants.branch_id`

### 검증 결과
- state-hydration-check 0 warnings (여러 차례)
- 빌드 exit 0 (다수 재빌드), 타입에러 0
- E2E **82+ pass / 0 fail** (user flow 50, security 16, regression 16)
- health-check 40/40 (dev + 운영 smoke 10/10)
- `npm run i18n:verify` Errors 0

### 운영 배포 (v3.15)
- 2026-04-19 20:44 UTC — 자동 배포 smoke 10/10 pass
- Backup: `/var/www/backups/20260419_204244`
- Frontend bundle: `main.e5f1c173.js`
- 릴리즈 블로그: `https://purplehere.com/blog/release-v3.15`
- System Admin 공지 42번 (운영 DB 자동 sync)
- Git commit `9e2427d2` origin/main 푸시 완료

### 다음 할 일

**운영 모니터링 (v3.15 실사용 확인):**
- Contract 만료 알림 스케줄러 실제 이메일 발송 동작 (Brand/Foodcourt SMTP 설정된 경우)
- Foodcourt General 이 실제 운영 데이터로 Branch 관리 확인
- Restaurant 스코프 실제 화면 확인

**후속 개발 (우선순위 순):**
- **Manager 지점별/브랜드별 실제 접근 enforcement** (Phase A (a) 결정대로 저장만 완료. 실제 필터링 적용은 후속 — users.branch_id/brand_id 기반으로 Contract/Unit/Invoice 접근 제한)
- **Floor Plan 시스템** — Branch 평면도 업로드 + 유닛 좌표 매핑
- **Brand Franchise Map** — 지역별 매장 지도
- **Contract.location_description → Floor Plan 좌표 자동 동기화**
- Terminated/Expired 계약 리스트 필터 + 비활성 Restaurant 섹션

**결정 완료 (개발 안 함):**
- 고객 회원가입 이메일 인증 (전화번호 기반이라 불필요)
- 주문 확인/영수증 메일 (이미 WhatsApp/Telegram + PNG로 완성)
- P2 #3 entity_plans.one_time (일회성은 Invoice 직접 발행이 정책)
- P2 #4 financial_terms ↔ plan 자동 경고 (의도된 차이 많음)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
