# 주문 알림 소리 시스템

> **작성일:** 2026-03-23
> **상태:** 설계 완료, 전역 알림 구현 예정
> **관련 파일:** notificationSound.ts, MainLayout.tsx, LiveOrdersPage.tsx, KitchenDisplayPage.tsx, AuthContext.tsx

---

## 1. 개요

새 주문/아이템 추가 시 알림 소리로 즉시 인지할 수 있도록 하는 시스템.
Web Audio API 기반 화음 프리셋 6종을 사용하며, 처리될 때까지 반복 재생한다.

---

## 2. 소리 프리셋 (6종)

| 프리셋 | 설명 | 용도 |
|--------|------|------|
| `bell` | C Major 화음 ding-dong | 기본 (Live Orders, 전역) |
| `beep` | 전자음 더블 비프 | - |
| `triple` | 스타카토 트리플 핑 | - |
| `urgent` | 사이렌 교대음 | 긴급 |
| `melody` | 도어벨 멜로디 Do-Mi-Sol-Do | - |
| `deep` | 깊은 공 (저음 럼블) | - |

Kitchen Station별로 다른 프리셋 지정 가능 (Settings > Kitchen Stations > alert_sound).

---

## 3. 알림 매트릭스

### 3-1. 트리거 (소리가 나는 조건)

| WebSocket 이벤트 | 설명 | 소리 | 반복 |
|-----------------|------|------|------|
| `order-created` | 새 주문 접수 | O | 3초 간격 |
| `order-items-added` | 기존 주문에 아이템 추가 (merge) | O | 3초 간격 |

### 3-2. 중지 조건 (소리가 멈추는 조건)

| 조건 | 설명 |
|------|------|
| 주문 상태 변경 | Pending → Preparing 등 누군가 처리 시 |
| Sound 토글 OFF | 즉시 중지 + localStorage 저장 |
| 로그아웃 | AuthContext에서 stopRepeatingSound() 호출 |
| 페이지 언마운트 | Socket disconnect → 더 이상 이벤트 수신 안 함 |

### 3-3. 페이지별 동작

| 페이지 | 소리 소스 | 프리셋 | Sound 토글 | 비고 |
|--------|----------|--------|-----------|------|
| **전역 (MainLayout)** | WebSocket `/orders` | bell | O (헤더) | Restaurant Admin, Staff만. restaurantId 필수 |
| **Live Orders** | 자체 Socket (페이지 내) | bell | O (페이지 내) | 전역과 중복 방지 필요 |
| **Kitchen Display** | 자체 Socket (페이지 내) | Station별 프리셋 | O (페이지 내) | Station 필터에 맞는 아이템만 |
| **Dashboard** | 전역에서 처리 | - | - | 자체 소리 없음 |
| **POS Terminal** | 전역에서 처리 | - | - | 자체 소리 없음 |
| **Settings, Menu 등** | 전역에서 처리 | - | - | 자체 소리 없음 |

### 3-4. 역할별 동작

| 역할 | 소리 | 이유 |
|------|------|------|
| Restaurant Admin | O | 레스토랑 주문 관리 |
| Staff | O | POS 캐셔, 주방 직원 |
| System Admin | X | restaurantId 없음 |
| Brand General | X | 직접 주문 처리 안 함 |
| Foodcourt General | X | 직접 주문 처리 안 함 |
| Restaurant Owner | X | 재무/통계 전용, 주문 처리 안 함 |

---

## 4. 중복 방지

전역(MainLayout)과 페이지(LiveOrders, KitchenDisplay) 모두 소리를 재생하면 겹친다.
`notificationSound.ts`의 `startRepeatingSound()`가 호출되면 기존 interval을 먼저 clear하므로,
같은 모듈의 단일 interval만 존재한다. 따라서:

- 전역에서 소리 시작 → Live Orders 진입 → Live Orders가 자체 소리 시작 → 전역 interval 자동 대체
- Live Orders 퇴장 → 전역이 다시 소리 관리

**규칙**: `startRepeatingSound()` 호출 시 항상 `stopRepeatingSound()` 선행 호출됨 (함수 내부).
모듈 레벨 단일 interval이므로 물리적으로 중복 불가.

---

## 5. Sound 토글 저장

| 저장 위치 | 키 | 기본값 |
|----------|-----|--------|
| localStorage | `sound_enabled` | `true` |

전역(MainLayout), Live Orders, Kitchen Display 모두 같은 키를 참조.
한 곳에서 OFF하면 다른 곳에서도 OFF.

---

## 6. 기술 구현

### 6-1. 파일 구조

```
src/utils/notificationSound.ts    — 프리셋 + 반복 재생 관리 (모듈 싱글톤)
src/components/Layout/MainLayout.tsx — 전역 WebSocket + Sound 토글 (예정)
src/pages/LiveOrders/              — 자체 Socket + Sound 토글
src/pages/KitchenDisplay/          — 자체 Socket + Station별 프리셋 + Sound 토글
src/contexts/AuthContext.tsx        — 로그아웃 시 stopRepeatingSound()
```

### 6-2. 반복 재생 흐름

```
order-created 수신
  → startRepeatingSound('bell', 3000)
    → 즉시 1회 재생
    → 3초 후 재생
    → 3초 후 재생
    → ...
  → 주문 상태 변경 or Sound OFF
    → stopRepeatingSound()
    → clearInterval
```

### 6-3. 자동 프린트와의 관계

소리와 프린트는 독립적:
- 소리: Web Audio API (브라우저)
- 프린트: RawBT intent 또는 브라우저 인쇄
- Kitchen Display에서 `order-created` 수신 시 소리 + 프린트 둘 다 실행 (각각 독립)
