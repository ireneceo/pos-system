# 인쇄 가시성 & 진단 (Print Visibility & Diagnostics)

> 목적: 매장 직원이 "솔루션 문제"로 오해하던 인쇄 누락을, **누가 봐도 보이게(미인쇄 표시) + 왜 그런지(이유) + 바로 처리(수동 인쇄)** 하게 만든다. 동시에 이유를 누적 기록해 **환경/인터넷 문제를 데이터로 추적·해결**한다.
> 설계일: 2026-06-26. Irene 아이디어 + 3개 방향 확정(누적로그+진단화면 / 가짜초록 잡기 / 플로어플랜은 표시만).
>
> **핵심 성격(2026-06-26 Irene 정정)**: 이건 "돌아가는 인쇄를 고치는" 작업이 **아니다**. **KDS(주방스테이션)는 지금 인쇄 주체가 아니다**(표시 전용 — 생명선 인쇄는 카운터 POS 폴러). 따라서 KDS/플로어플랜의 미인쇄 **표시·사유·팝업**은 전부 **순수 신규 추가**라 불안 요소가 없다. 생명선(카운터 폴러 자동인쇄 동작)은 한 줄도 안 바뀐다. 생명선 파일(billPrint·useAutoPrintPoller)에 닿는 부분도 "인쇄를 바꾸는 게 아니라 지켜보고 기록"만 추가(라우팅/타이밍/방식 무변경). print-guard 지문은 바뀌므로 bless + 폴백·수동인쇄 라우팅만 실프린터 1회 확인.

---

## 1. 검증 결과 (실측 기반, 2026-06-26)

| 질문 | 결과 | 근거 |
|------|------|------|
| "인쇄 안 됨"을 신뢰성 있게 아는가 | ✅ 가능 | `needs_print=true` + `printed_at` 없음 = 미인쇄. 서버가 이미 상태 보유 |
| "왜 안 됐는지" 이유 | ✅ 가능(신규 기록 필요) | 사유 분기는 `useAutoPrintPoller.ts`에 이미 존재. 단 저장 안 됨(일회성 이벤트) |
| 스테이션별 수동 인쇄 + 실패 팝업 | ✅ 가능 | 인쇄 버튼·취소팝업 인프라 존재. 단 버튼이 스테이션 라우팅을 안 함(아래 §5) |
| 가짜 초록(폴백 인쇄) 감지 | ✅ 가능 | `qz.printers.find()`로 사용가능 목록 대조 → 의도 프린터 미도달 감지(billPrint:587/607/657) |

### 미인쇄 사유 카탈로그 (직원 표시 문구)
| reason_code | 발생 위치 | 직원에게 | 판정 |
|-------------|-----------|----------|------|
| `master_off` | poller: `_kitchenAuto` false | 자동인쇄 꺼짐 — 켜거나 수동 인쇄 | 클라 로그 |
| `no_device` | needs_print=true·claim 없음·age>60s | 인쇄 담당 POS가 꺼져있음/오프라인 | **서버 추론** |
| `qz_error` | poller: print-rearm 경로(QZ false) | 프린터 응답 없음 — 연결/용지 확인 | 클라 로그 |
| `dead_claim` | claim 있는데 stale(>10s) | 다른 기기가 잡았다 실패 — 재시도 중 | **서버 추론** |
| `backlog` | poller: backlog cutoff | 자동인쇄 켜기 전 주문 — 수동 인쇄 | 클라 로그 |
| `printer_unreachable_fallback` | billPrint: 의도 프린터 미도달→기본 폴백 | ⚠ BAR 대신 다른 프린터로 나감 | 클라 로그(가짜초록) |

이유 소스는 2가지:
- **클라 로그**: 인쇄 전담 기기가 실제 시도하다 사유 분기를 탄 경우(qz_error/fallback/master_off/backlog) → POST `/print-events`
- **서버 추론**: 아무 기기도 안 잡은 경우(no_device)·죽은 claim(dead_claim)은 표시 시점에 age/claim 으로 계산(클라가 없으니 로그 불가)

---

## 2. 데이터 모델 — 신규 `print_events`

```
print_events
  id              BIGINT PK
  restaurant_id   INT  (idx)
  order_id        INT  (idx, nullable)
  order_number    VARCHAR
  station_id      INT  nullable
  station_name    VARCHAR nullable
  outcome         ENUM('success','failed','skipped','fallback')
  reason_code     VARCHAR  (위 카탈로그)
  reason_detail   TEXT     (예: intended "BAR" → actual "POS-80C")
  intended_printer VARCHAR nullable
  actual_printer   VARCHAR nullable
  workstation_id  VARCHAR nullable
  created_at      DATETIME (idx: restaurant_id+created_at)
```
- 로그 테이블(누적). 주문의 **현재** 미인쇄 여부는 orders.needs_print/printed_at 에서 파생(이 테이블은 이력/진단용).
- 보존: 30일 후 정리(cron, 진단 목적상 충분). 마이그 = 전용 멱등 스크립트 + 배포목록 등록 + process.exit().

---

## 3. 백엔드 엔드포인트

- `POST /api/print-events` — 인쇄 이벤트 1건 기록(auth + restaurant scope). 클라 로그용.
- `GET /api/orders/restaurant/:id/print-status` — **미인쇄 주문 + 사유** 반환. needs_print=true·printed_at 없음 전체(20건 윈도우 아님) + 각 주문에 서버추론 사유(no_device/dead_claim) 또는 최근 print_events 사유 머지. KDS·플로어플랜 배지/팝업이 이걸 폴링.
- `GET /api/print-events/restaurant/:id?from&to` — 진단 화면용 집계(사유별 카운트·타임라인·스테이션별).

orders-crud 인쇄 핵심 블록(pending-print/printed/claim/rearm)은 **무변경**. print-status 는 별도 read-only 엔드포인트로 추가.

---

## 4. 표시 — KDS + 플로어플랜

### KDS (스테이션별) — **안됐을 때만 알림** (평소 조용)
- 평소엔 아무 표시 없음. **인쇄 실패/미인쇄일 때만** 카드에 표시(빨강 "미인쇄", 폴백이면 앰버 "⚠ 다른 프린터"). 클릭 → 사유.
- **실패 팝업(메인 UX)**: 취소팝업(`KitchenDisplayPage` ~1238 인프라) 미러. 현재 스테이션 스코프(`curStation`)에 미인쇄 주문 감지 시 1회 팝업(주문+스테이션 dedupe) → "이 주문 인쇄 안 됨 / [이유] / [지금 인쇄] [닫기]". 알림음은 기존 패턴.

### 플로어플랜 (표시만)
- 테이블/주문에 **미인쇄 점/배지** + 클릭 시 사유 모달. **인쇄 버튼 없음**(주방에서 처리 원칙). `print-status` 재사용.

---

## 5. KDS 스테이션별 수동 인쇄 (정확한 라우팅)

현재 `printOrderTicket`(KitchenDisplayPage:1514)은 품목의 `kitchen_station_id`를 안 싣고 generic `printKitchenTicketViaRawBT` 호출 → **스테이션 프린터로 라우팅 안 됨**("프린트설정에 맞게 안 들어옴"의 정체).

수정: 수동 인쇄 시 품목에 `kitchen_station_id` 보존 + `printKitchenTicketsByStation` 경로(설정 `kitchenStationPrinters` 로 버킷팅).
- **스테이션 탭에서 인쇄** → 그 스테이션 품목만 · 그 스테이션 프린터로.
- **All 탭에서 인쇄** → 전 품목을 각 스테이션 프린터로 **분배 발송**(모든 주방스테이션에 각자 것). 미매핑 품목은 첫 스테이션으로 흡수(기존 버킷팅 규칙).

**자동인쇄 아님(직원이 누름) → KDS 표시전용·2장중복 규칙과 무관. KDS는 원래 인쇄 주체가 아니므로 생명선(카운터 폴러)과 충돌 없음 = 신규 추가.**

---

## 6. 가짜 초록(폴백) 감지

`billPrint`의 QZ 인쇄 함수가 인쇄 직전 `qz.printers.find()` 목록에 **의도한 스테이션 프린터(name/address)** 가 있는지 대조 → 없으면 폴백 확정. 반환값(또는 이벤트)에 `{usedFallback, intended, actual}` 실어 poller 가 `outcome='fallback'`로 로그. 화면은 초록 대신 앰버.
- **인쇄 라우팅/타이밍 무변경** — 목록 대조 + 보고만 추가. 그래도 billPrint 보호파일이라 신중 + 실프린터 확인.

---

## 7. 진단 화면

- 위치: Settings > 프린터 탭 하단 "인쇄 진단" 패널(또는 Reports). RA 표준 컴포넌트(DataTable/StatCard).
- 내용: 최근 N일 사유별 카운트(예 "BAR 미도달 7회"), 스테이션별, 타임라인. → 환경/인터넷 문제 패턴 식별.

---

## 8. 보호파일 영향 & 검증

| 파일 | 변경 | 위험 |
|------|------|------|
| `billPrint.js` 🔒 | 폴백 감지 보고(목록 대조, 라우팅 무변경) | 중 — 실프린터 확인 |
| `useAutoPrintPoller.ts` 🔒 | 사유 분기에서 print-event 로그(인쇄 무변경) | 저 |
| `KitchenDisplayPage.tsx` 🔒 | 스테이션 라우팅 수동인쇄 + 미인쇄 팝업/배지 | 중 — print-guard bless |
| `orders-crud.js` 🔒 | print-status read 엔드포인트 추가(핵심블록 무변경) | 저 |
| 신규 `routes/print-events.js`·`models/PrintEvent.js` | 신규 | 저 |
| `FloorPlanPage`/`TableDetailPanel` | 배지+사유모달(표시만) | 저 |
| Settings/Reports 진단 패널 | 신규 | 저 |

검증: build + autoprint-regression + health-check(print) + print-guard bless + 실브라우저 mount(KDS/FloorPlan/Settings) + **실프린터 1회**(스테이션 수동인쇄 라우팅·폴백 앰버·미인쇄 팝업). 🔒 프로세스 규칙 §5대로 **관련 변경 묶어 실프린터 테스트 1회**.

---

## 9. 구현 순서(전체 1뭉치, Phase 보류 없음)

1. DB 모델 + 마이그 + `routes/print-events.js`(POST/GET) + print-status 엔드포인트
2. poller 사유 로그 배선(인쇄 무변경)
3. billPrint 폴백 감지 보고
4. KDS: print-status 폴링 + 미인쇄 배지/팝업 + 스테이션 라우팅 수동인쇄
5. 플로어플랜: 배지 + 사유모달(표시만)
6. 진단 화면
7. 검증 전부 + 실프린터 1회(Irene)
