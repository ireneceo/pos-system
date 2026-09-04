
## 2026-09-04 — MainLayout.tsx bless (인쇄 동작 변경 아님)

**변경 내용**: 사이드바 nav 항목 1줄 삭제(`Shared Ingredients` — 재료 목록 통합으로 없앤 화면)
  + 같은 화면을 두 이름으로 부르던 라벨 통일(`nav.ingredients` → `nav.stockItems`, 주석 3줄).
**왜 이 파일인가**: 그 nav 항목은 `AuthContext` 허용 목록이 아니라 `MainLayout` 배열에 있고,
  허용은 `'/pos/brand/general/*'` **와일드카드**라 목록에서 뺄 수 없다(빼면 BG 다른 화면이 같이 막힘).
**승인**: Irene 명시 지시 — "쉐어드 재로 지워. 이거 없던 메뉴야. 당장 지워."(2026-09-04)
**인쇄 무접촉 증명** (종이 확인 대체 — 인쇄 동작 변경이 아니므로 기계 증명, Fable 판정):
  - 파일 내 인쇄 심볼(`_printPollFn` 등) 14곳 그대로
  - `health-check --category=print` → **11/11 통과**
  - `verify-all --only print-routes`(자동인쇄 전 루트 실제 실행) → **통과**
  - `verify-all --only print-field-contract` → **통과**
  - `check-print-guard` → 재등록 후 **8/8 변경 없음**
