# Sprint 5+6 테스트 가이드 (다음 세션 / Irene 직접 운영)

> 작성: 2026-04-27
> 환경: https://dev.purplehere.com
> 주의: 강력 새로고침(Ctrl+Shift+R) 한 번 해주시면 최신 빌드 적용

## 데모 계정 (모두 비밀번호 `Demo@2024`)

| 역할 | 이메일 | 용도 |
|------|--------|------|
| Restaurant Admin | demo-restaurant@purplehere.com | 발주 (buyer) |
| Supplier Admin | demo-supplier@purplehere.com | 판매자 Live Orders |
| Brand General | demo-brand@purplehere.com | BG 측 Live Orders |
| Foodcourt General | demo-foodcourt@purplehere.com | FG 측 Live Orders |
| System Admin | (비번 알려주시면 Carrier 카탈로그) | Admin Carriers |

## 시나리오 1 — Restaurant 발주 (단일)

1. demo-restaurant 로그인
2. 사이드바 → **Inventory** → tab=list
3. 행에서 **Order** 버튼 (매핑 있는 ingredient 만 활성)
4. OrderModal → 권장 seller 자동 선택 + 수량 → **Send Order**
5. 모달 안 "Order sent ✓" 확인 (alert/toast 없음)

→ PO 자동 submit. 다음 시나리오에서 supplier 측에서 도착 확인.

## 시나리오 2 — Restaurant 발주 (다중 선택 / Cart)

1. Inventory list 의 매핑 있는 행들 **체크박스** 다중 선택
2. 하단 sticky bar 등장 → "**Order Selected →**" 클릭
3. BulkOrderModal — seller 별 자동 그룹 + 수량 조정
4. **Send N Orders** → seller 별 PO 다발 자동 생성

## 시나리오 3 — Supplier Live Orders (실시간 + 사운드)

**다른 브라우저 탭**에서 demo-supplier 로그인:

1. 사이드바 → **Live Orders** (Dashboard 직후)
   - 옆 NavIcon `▤` pulse 애니메이션 (점 추가 X — Restaurant 패턴)
2. 페이지 구조 (Restaurant LiveOrders 와 동일):
   - 헤더 우측 **AudioToggleButton** (40×40 + speaker SVG)
   - **FilterToolbar**: DatePeriodFilter (오늘/어제/주/월/년/전체/캘린더) + Search
   - **StatusTabs**: submitted / confirmed / shipped / received / cancelled (count badge)
   - **StatisticsBar**: 표 위 작은 inline 통계
   - **DataTable**: PO# / Buyer / Items / Delivery / Status / Time / Amount / Actions
3. 시나리오 1/2 의 발주가 실시간 표 상단에 **하늘색 background highlight + NEW 빨간 점 + 'NEW' 배지** 로 등장
4. 사운드 (chime) 자동 재생 (toggle ON 시)
5. **DatePeriodFilter "오늘"** 클릭 — 오늘 PO 만 표시
6. **Search** "PO-R38" 검색 — 발주처 매칭

## 시나리오 4 — Supplier Confirm/Ship/Deliver

행 클릭 → Detail Modal:

1. **Confirm** 버튼 → status='confirmed'
2. 카드 갱신 후 **Mark Shipped** 누르면 ship Modal
3. Carrier select → **Lalamove** + Tracking number `LA-TEST-001`
4. **Mark Shipped** → tracking_url 자동 생성 (Lalamove 템플릿)
5. Detail 다시 열기 → **DeliveryTimeline** (5단계 progress) 표시
6. 행 우측 **✎ Edit tracking** → carrier 변경 (Lalamove → Pos Laju) → tracking_url 자동 재계산
7. **Mark Delivered** → status='delivered'

## 시나리오 5 — Restaurant Receive

demo-restaurant 탭으로 돌아가서:

1. 사이드바 → Purchase Orders → 해당 PO 클릭
2. Detail page → **DeliveryTimeline** 5단계 표시
3. **Receive** → 수량 입력 → 확인
4. 자동: status='received' + Trade Invoice 자동 발행 + Restaurant Ingredient 재고 +qty + RestaurantIngredientCost 가중평균 갱신

## 시나리오 6 — Returns / Credit Note

1. (시나리오 5 received 직후) PO Detail → **🔁 Request Return** 버튼
2. Returns Modal → 반품 수량 입력 + 사유
3. demo-supplier 탭 → Live Orders → 해당 행 클릭 → drawer 안 **Return Requests** 섹션
4. **Approve** → Credit Note Invoice 자동 발행 (`CN-{PO}-R{id}`) + 양쪽 stock 자동 reversal

## 시나리오 7 — PO Print

1. PO Detail → **🖨 Print** 버튼
2. 새 탭 자동 열림 + window.print() 자동 트리거 (브라우저 인쇄 다이얼로그)
3. A4 친화 레이아웃 (헤더 + 발주처/판매자 박스 + items 표 + 합계 + 메모 + 추적정보)

## 시나리오 8 — System Admin Carriers (선택)

1. System Admin 로그인 → 사이드바 → **Carriers**
2. 시드 5건 (Lalamove / Grab Express / J&T / Ninja Van / Pos Laju) 보임
3. **+ Add Carrier** — 신규 등록 (code/name/tracking_url_template)
4. **Edit/Deactivate** 가능

## Brand General / Foodcourt General 도 동일

demo-brand 또는 demo-foodcourt 로그인 → **Live Orders** 메뉴 동일 위치 (Dashboard 직후) + 동일 UI 패턴 (DataTable + Restaurant LiveOrders 와 일치).

차이점: BG/FG 가 buyer 일 때는 brand_id / foodcourt_id 와 매칭되는 supplier 발주만 가능.

---

## 문제 보고 시 알려주세요

- 어느 페이지 (URL)
- 어느 역할 계정
- 어떤 동작 (클릭/입력)
- 콘솔 에러 (F12 → Console 탭) 메시지

## 미해결 / 후속 작업 (배포 전 필요 X)

- `/api/orders?limit=100 → 403` 콘솔 경고 (Supplier 화면에서) — 별도 컴포넌트가 호출. 페이지 동작 영향 없음. 다음 세션에서 정리.
- Supplier Dashboard Phase 2 (Quick Actions / Setup Status / Top Customers PieChart / Receivables Aging) — 별도 트랙. v3.20 으로.
- Schedule-based auto reorder (cron PAR 도달 시 자동 PO) — Post-MVP.

---

## 배포 준비 (운영 v3.19)

운영 마이그레이션 순서:

```bash
node scripts/sprint1-supply-chain-migration.js
# Sequelize sync (16 신규 테이블)
node scripts/seed-supplier-modules-and-plans.js
node scripts/seed-buyer-supplier-modules.js
node scripts/seed-purchase-orders-module.js
node scripts/sprint4-migration.js
node scripts/sprint5-migration.js   # Carrier 테이블 + 5 시드
node scripts/sprint6-migration.js   # PO status enum + Invoice status enum + purchase_order_returns
pm2 restart production-backend
# Frontend rebuild + deploy-to-production.sh
```

`/배포` 명령어로 Irene 가 결정하시면 자동 적용됩니다.
