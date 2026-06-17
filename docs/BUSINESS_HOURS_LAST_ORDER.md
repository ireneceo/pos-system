# 운영시간(요일별) + 라스트오더 게이트 설계

> 작성 2026-06-17. 출발점: 운영시간이 요일마다 다른데 현재는 단일 open/close 1쌍뿐, 라스트오더 개념 없음, 모바일 주문이 시간으로 전혀 안 막힘(수동 pause만). thefire03 등 실매장 요구.

## 1. 요구사항 (확정)

- 운영시간을 **요일별**로 다르게 설정 (월~일 각각 open/close, 휴무일 포함).
- **라스트오더 시각**을 요일별로 명시 → 라스트오더 지나면 **모바일 고객 주문 차단**.
- 차단 범위 = **모바일 고객 주문만**. POS(직원) 주문은 항상 가능(마감 직전 손님 수용 등).
- 마감/영업시간 외 모바일 화면 = **메뉴는 보이되 주문 버튼 비활성 + 안내 메시지**.

### 확정된 비즈니스 결정 (2026-06-17, Irene)
1. 라스트오더 = 요일별 명시 시각 (오프셋 자동 아님).
2. 차단 = 모바일 고객 주문만 (POS 무영향).
3. 마감 시 = 메뉴 노출 + 주문버튼 비활성 + 안내.

## 2. 현재 상태 (실측)

| 항목 | 현재 | 비고 |
|------|------|------|
| `operation_settings.openingTime`/`closingTime` | 단일 1쌍 | 예약 슬롯/표시용. 요일 구분 없음 |
| `operation_settings.hours` (요일맵) | `"10:00 - 22:00"` 문자열 | 표시 전용, 구조화 안 됨, 게이트 미사용 |
| `/store/:slug` `isOpen` | `restaurant.status === 'active'` | **시간 기반 아님** |
| `breakTimes[]` | start/end 배열 | 휴게(점심/저녁 분리)용, 표시 위주 |
| `mobile_settings.pause_ordering` | 수동 토글 | 임시 중단. 자동 시간게이트 아님 |
| `utils/availabilitySchedule.js` | `localParts(now,tz)` / `isWithinSchedule` | **재사용 토대** — 매장 타임존 날짜/시각/요일 판정 |

결론: 시간 기반 주문 차단 + 라스트오더는 **신규 구축**. 단, 평가 로직은 `availabilitySchedule` 패턴 위에 올림(헬퍼 분리, 카테고리 스케줄과 일관).

## 3. 데이터 모델 — `operation_settings.businessHours` (신규, JSON, 기존 컬럼 내)

```jsonc
operation_settings.businessHours = {
  enabled: false,              // master. false = 레거시(시간 게이트 없음 = 현행 동작). 하위호환 안전
  days: {
    mon: { closed: false, open: "11:00", lastOrder: "21:30", close: "22:00" },
    tue: { closed: false, open: "11:00", lastOrder: "21:30", close: "22:00" },
    wed: { closed: true },     // 휴무일 — 종일 차단
    thu: { ... }, fri: { ... }, sat: { ... }, sun: { ... }
  }
}
```

규칙:
- `closed:true` → 휴무일, 종일 모바일 주문 차단.
- `lastOrder` 생략 가능 → 생략 시 `close` 를 라스트오더로 간주(별도 마감 없음).
- **자정 넘김(overnight)**: `close <= open` 이면 마감이 다음날(예: 18:00–02:00). `isWithinSchedule` 의 overnight 로직과 동일 규칙. 자정 이후엔 전일(prev day) 윈도우 스필오버도 검사.
- **하위호환**: `businessHours` 없음 또는 `enabled:false` → 게이트 미적용(전 매장 동작 무변화). 관리자가 처음 켤 때 기존 `openingTime`/`closingTime` 으로 7일 시드(편의).
- **DB 마이그 불필요** — 기존 `operation_settings`(JSON) 안의 키. `settingsGuard` 화이트리스트에 `businessHours` 추가 필수(anti-wipe).

## 4. 게이트 평가 — `utils/businessHours.js` (신규)

`getOrderingState(operationSettings, now) → { enabled, canOrder, status, today, message_key, nextOpen }`

- `status ∈ open | before_open | after_last_order | after_close | closed_today | disabled`
- `enabled:false` → `{ enabled:false, canOrder:true }` (게이트 없음, 현행).
- 매장 타임존은 `operationSettings.timeZone` → `localParts(now, tz)` 로 요일/시각 산출(서버시계 금지).
- 오늘 요일 config 로: 휴무 → closed_today / `time < open` → before_open / `time >= lastOrder` → after_last_order / `time >= close` → after_close / 그 외 open.
- `canOrder = (status === 'open')`.
- overnight: 오늘 윈도우 + 전일 overnight 스필오버 둘 다 검사.
- `localParts` 재사용으로 카테고리 스케줄과 타임존 처리 1:1 일치.

## 5. 백엔드 연동

| 위치 | 변경 |
|------|------|
| `routes/mobile-public.js` `/store/:slug` | 응답에 `ordering: { enabled, canOrder, status, today:{open,lastOrder,close,closed}, message }` 추가. `isOpen` 은 하위호환 유지하되 `canOrder` 가 주문 게이트 단일 소스 |
| `routes/mobile-public.js` `/menu/:slug` | 메뉴는 그대로 반환(메뉴 노출 결정). 게이트 데이터는 `/store` 가 소스 |
| `routes/mobile-orders.js` (주문 생성 POST) | **서버측 강제** — `getOrderingState` 로 `canOrder=false` 면 `400 { code:'ORDERING_CLOSED', message }`. 3계층 마지막(우회 불가). POS/내부 주문 경로(orders-crud)는 **무접촉**(직원 주문 안 막음) |
| `utils/settingsGuard.js` | `OPERATION_KEYS` 에 `businessHours` 추가 |

> 🔒 인쇄/주문 처리 코드(orders-crud kitchen/print) 무접촉. 모바일 고객 생성 경로(mobile-orders)에만 게이트.

## 6. 프론트엔드

### 설정 — 운영(Operation) 탭
- 마스터 토글 `businessHours.enabled` ("운영시간으로 모바일 주문 자동 관리").
- 요일 7행 표: `[요일] [휴무 토글] [오픈] [라스트오더] [마감]`. 시간 입력은 기존 `openingTime` 입력 컴포넌트 재사용(시각 입력 — `<input type=date>` 아님, DateField 무관). AutoSave 패턴 일관.
- 기존 `breakTimes`(휴게) 유지 — 점심/저녁 분리 표현.
- 첫 enable 시 기존 openingTime/closingTime 7일 시드.

### 모바일
- `MobileOrderContext` 가 `/store` 의 `ordering` 소비.
- `canOrder=false` → 장바구니 담기/주문/결제 버튼 **비활성** + 상단 배너(`status` 별 메시지: "오늘 휴무" / "오전 11:00 오픈" / "주문 마감(라스트오더 21:30 종료)"). 메뉴 브라우징은 가능(결정대로).
- `pauseOrdering`(수동) 과 OR 결합 — 둘 중 하나라도 막으면 차단.

### i18n
- 모바일 마감/라스트오더/휴무 메시지 + 설정 라벨 → en/ko/zh/ms 4언어. glossary 용어 우선 등록.

## 7. 검증 계획

- **단위/실API**: businessHours 세팅 후 `now` 주입해 `getOrderingState` 경계 검증(오픈전/영업중/라스트오더직후/마감후/휴무/overnight). `/store` `ordering` 정합.
- **서버 게이트**: 라스트오더 후 모바일 주문 POST → `400 ORDERING_CLOSED`. POS 경로 동일 시각 정상 생성(무영향) 확인.
- **하위호환**: `enabled:false`(미설정) 매장 → `canOrder:true`(현행) 회귀 0.
- **UI mount**: Settings 운영탭 + 모바일 메뉴(마감상태) 크래시 0.
- health-check 전체 + print-guard 8/8(주문/인쇄 무변경) + build TS 0 + settingsGuard round-trip(저장→GET 키 보존).

## 8. 범위 밖(후속 후보)
- 공휴일/특정일자 오버라이드(이벤트 휴무) — `availabilitySchedule` 의 start_date/end_date 패턴으로 확장 가능. 이번 범위 제외(요일 단위까지).
- "마감 X분 전 자동 라스트오더" 오프셋 모드 — 이번엔 요일별 명시만.
