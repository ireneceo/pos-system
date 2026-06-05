# 주문 알림음 체계 (Order Notification Sounds)

> 작성 2026-06-05 · Irene 지시. 화면별 주문 알림음을 체계적으로 분리/구조화.

## 1. 문제 (현재)
- `sound_enabled` localStorage 키를 **Live Orders 와 KDS 가 공유** → 한 기기에서 한쪽 끄면 양쪽 다 꺼짐.
- **Floor Plan 은 새 주문 도착 알림음이 아예 없음** (서빙 직원이 Floor Plan/Off-table 만 보면 새 주문·픽업·배달 도착을 소리로 못 받음).
- 소리 **종류** 설정이 **주방 스테이션만** 있고(Settings 의 `alert_sound`), Live Orders/Floor Plan 은 없음(bell 고정).

## 2. 설계 (분리 + 단일 소스)

### 2.1 종류·on/off = Settings (매장 단위, operation_settings.orderSounds)
```ts
orderSounds: {
  liveOrders: { enabled: boolean; type: SoundPreset };  // 새 주문 반복 알림
  floorPlan:  { enabled: boolean; type: SoundPreset };  // 새 주문 도착 + ready 알림(서빙)
}
// 기본: 둘 다 { enabled: true, type: 'bell' }
// 주방 스테이션은 기존 per-station alert_sound 유지(스테이션 섹션에서 설정).
```
- SoundPreset = bell|beep|triple|urgent|melody|deep (utils/notificationSound).
- settingsGuard.js OPERATION_SETTINGS_ALLOWED_KEYS 에 `orderSounds` 추가(저장 보장).

### 2.2 기기별 음소거 = 화면별 분리된 localStorage 키 (공유 제거)
| 화면 | mute 키 |
|---|---|
| Live Orders | `sound_mute_liveorders` |
| KDS | `sound_mute_kds` |
| Floor Plan | `sound_mute_floorplan` |
- 각 화면 우측 스피커 아이콘 = 그 화면의 mute 키만 토글(이제 안 겹침).
- 효과적 재생 = `orderSounds[screen].enabled !== false && localStorage[muteKey] !== '1'`.

### 2.3 화면별 동작
- **Live Orders**: 새 주문 → `startRepeatingSound(orderSounds.liveOrders.type)`. mute=`sound_mute_liveorders`.
- **KDS**: 새 스테이션 품목 → `startRepeatingSound(station.alert_sound)`(종류=스테이션). mute=`sound_mute_kds`(분리).
- **Floor Plan(신규)**: `order-created` 소켓에서 새 주문이 off-table(또는 전체)이면 `orderSounds.floorPlan.type` 재생. ready 알림(ItemListView)도 같은 floorPlan 설정 사용. mute=`sound_mute_floorplan`.

### 2.4 Settings UI (Operations 탭, 신규 "주문 알림음" 섹션)
- Live Orders: 토글 + 종류 select(6종) + 미리듣기(▶)
- Floor Plan(서빙): 토글 + 종류 + 미리듣기
- 안내: "주방 알림음은 주방 스테이션 섹션에서 스테이션별로 설정"

## 3. 구현 순서
1. StoreContext.OperationSettings + defaults: `orderSounds`
2. Settings: OperationSettings 타입 + defaults + UI 섹션 + AutoSave
3. settingsGuard.js: `orderSounds` 화이트리스트
4. LiveOrders: 종류=설정, mute 키 분리
5. KDS(🔒 표시/사운드만, 인쇄 무접촉): mute 키 분리(`sound_mute_kds`)
6. Floor Plan: 새 주문 알림음 추가 + mute 키 + 스피커 토글
7. i18n 4언어 + 빌드 + mount + print-guard(KDS 인쇄 무변경 확인)

## 4. 가드
- KDS 변경 = 사운드 키만(인쇄 핸들러 무접촉). print-guard + 실화면 확인.
- 운영 데이터 무관(설정 JSON). 기존 무설정 매장 = 기본값(둘 다 on/bell).
