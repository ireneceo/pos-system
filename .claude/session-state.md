## 현재 작업 상태
**마지막 업데이트:** 2026-04-11 (Phase C-6 + External QR + hydration 검증 자동화 완료)
**현재 버전:** v3.12 (내부 수정만 이번 세션 — 버전 미증가)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-11)

#### 1. Phase C-6 파일럿 — InventoryManager 분할
- `components/Inventory/InventoryManager.tsx` 3141줄 → 26개 파일 (types/styles/utils + 11 hooks + 3 sections + 9 modals + 슬림 main 340줄)
- 공개 API 불변 (`<InventoryManager mode restaurantId />`) — 2개 consumer 무수정
- 패턴 원칙 (C-6 나머지에 재사용):
  1. Hook = state+로직+API capsule. setter는 useInventoryData에서 받아 optimistic update
  2. Mode 분기는 hook 내부에서만. Section/Modal은 mode 무지
  3. Add+Edit 유사 모달은 mode prop으로 통합
  4. 단방향 data flow

#### 2. Inventory UX 정리
- 대시보드 카드 5 → 4 (Expiring Soon 제거)
- 9 모달 모두 표준 `Modal footer={...}` prop 전환 (sticky footer)
- 테이블 반응형 정렬 fix — `display: contents` 때문에 `nth-child` 못 미치는 문제, 클래스 셀렉터(`.col-min`, `.col-cost`, `.col-supplier`, `.col-last`)로 교체. 1280px 미만에서 5컬럼 + Actions 폭 160px→260px
- 버튼 `+` prefix 제거

#### 3. StatsGrid 15 페이지 표준화
- 모두 `4 → ≤1024 2 → ≤768 2` 통일. 이전 12개는 `auto-fit minmax(200px, 1fr)`로 모바일 1열 무너짐
- 영향: Admin 4 + OperationInquiry 5 + Manager 5 + Owner 1

#### 4. Repo hygiene (3건 untrack)
- `public/static/` (4 파일), `nginx-build/` (138 파일), `dev-frontend-build/` (495 파일)
- `.gitignore` 갱신. 매 빌드마다 발생하던 거대 diff + 옛 main.js 해시 복사로 인한 ChunkLoadError 해결

#### 5. 운영 배포 (2026-04-11 06:03)
- Phase C-3/C-4/C-5/C-6 + StatsGrid 15 + repo hygiene (public/static, nginx-build) + 이모지 치환 일괄
- `main.b6c3e39d.js` 운영 배포
- 9단계 검증 PASS: 39/39 health-check + 모든 SPA 라우트 200
- 운영 smoke: 9/10 (1 false-fail: payment-settings 응답 형식 차이, 기능 정상)
- 백업: `/var/www/backups/20260411_060326`

#### 6. inventory adjust route 버그 수정 (dev only)
- `POST /inventory/adjust`가 `quantity` (incremental)만 받아 인라인 편집 작동 안 함 — long-standing 버그
- `new_quantity` (absolute) 수용 추가, `new_quantity=0` 정상 처리
- 4 시나리오 검증 완료

#### 7. External QR 기능 (dev only)
- Settings Operations 탭에 새 카드 — 파트너 가게/호텔/사무실 등 외부용 커스텀 이름 QR
- SVG/PNG/Print/삭제. 저장: `table_settings.externalQRs: string[]`
- 주문은 기존 `table_number` 컬럼에 이름 그대로 기록 (내부 테이블과 동일 경로)
- 백엔드 변경 0, DB 마이그레이션 0
- 카드 좌우 풀폭 (`gridColumn: 1 / -1`), QR은 가로 wrap
- 모바일 OrderTypePage `Table` prefix 제거 — 내부/외부 둘 다 값 그대로 표시

#### 8. Hydration 검증 자동화 (dev only)
- External QR 버그(legacy localStorage hydration시 `undefined.length` crash)가 9단계 검증을 통과한 뒤 발생 — 근본 원인은 새 state field의 legacy 데이터 방어 미검사
- 신규: `dev-frontend/scripts/state-hydration-check.js` 정적 분석
- 검증: `npm run check:hydration`, 자체 테스트 시 버그 commit에서 6 warnings 정확 검출
- `/검증` 스킬에 **0단계** 추가 (build 전 실행, warning 1건이라도 있으면 차단)
- State Hydration 안전 패턴 가이드 4항목 문서화

### 운영 배포 대기분 (다음 `/배포` 시)
- `8480a158` inventory adjust route 버그 수정
- `30bf17f0` External QR 카드 최초 추가
- `9b7543c2` External QR hydration 수정 + 검증 스크립트
- `4e5ae091` External QR 풀폭 + Table prefix 제거
- `f720579c` CHANGELOG 업데이트

### 다음 할 일
- **Phase C-6 나머지** (별도 세션): 확립된 패턴으로 4개 컴포넌트 분할
  - `pages/LiveOrders/LiveOrdersPage.tsx` 4458줄
  - `pages/BrandGeneral/BrandInvoicesPage.tsx` 4566줄
  - `pages/Admin/InvoicesPage.tsx` 4205줄
  - `mobile/pages/PaymentPage.tsx` 2597줄
  - 참조 패턴: `components/Inventory/`
- **브라우저 수동 확인**: Inventory 4탭 + 9 모달 + External QR 생성/스캔 흐름
- **발견된 별도 이슈 후속**:
  - payment-settings 응답 형식 비표준 (flat → `{success, data}`)
  - DB sync "Too many keys" 경고 (10 models)
  - `entity_plan_charges` 테이블 운영 미동기화

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
