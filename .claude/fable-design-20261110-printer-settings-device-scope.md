# Fable 설계 — 프린터 설정: 매장 공용은 그대로, «프린터 설정 기기» 한 대에서만 바뀌게 (2026-11-10)

> 작성: Fable(리더). 구현: Opus(팀원) — 이 문서 그대로. 설계와 다른 판단이 필요해지면 **즉시 중단**하고 사실만 들고 돌아온다.
>
> Irene 원문 (2026-11-10): «레스토랑 프린터 살정ㄴ 설정을 한 디바이스에서 다른 곳에서 안하게. 하려면 확인을 하고 바꾸게 조심스럽게 잘 분리해줘야 해. 디바이스별로 관리를 할지 기본 프린터 설정은 한곳에서만 하는게 맞다면. 안드로이드앱 윈도우앱 다 사용자가 알기쉽게 문제안생기게 해야지.»

---

## 0. 한 줄 결론

**매장 프린터 설정은 지금처럼 매장에 한 벌만 둔다(기기별로 쪼개지 않는다). 대신 매장마다 «프린터 설정 기기» 한 대를 정하고, 그 기기에서만 바로 바뀐다. 다른 기기에서는 보기만 되고, 바꾸려면 확인 창을 거친다.** 잠금은 세 겹 — 화면(칸 비활성) · 저장 요청(잠긴 기기는 프린터 설정을 아예 안 실어 보냄) · 서버(다른 기기의 확인 없는 저장은 무시). 🔒 인쇄 보호 파일 8개는 한 줄도 안 건드린다. DB 구조 변경(마이그) 없음. 배포만으로는 어느 매장 설정도 바뀌지 않는다.

Irene 에게 물을 되돌리기 어려운 선택은 **없다**(§10).

---

## 1. «기기별로 할까, 한곳에서 할까» 에 대한 답

| | 어디에 두나 | 이유 |
|---|---|---|
| 자리(POS)마다 어느 프린터 이름 · 주방/스테이션마다 어느 프린터 이름 · 자동 인쇄 · 장수 · 인쇄 내용 · 영수증 꾸밈 | **매장 공용 한 벌**(지금 그대로 `restaurants.printer_settings`) | 주방 티켓은 한 기기(POS1 폴러)가 찍는다. 설정이 기기마다 다르면 «누구 것이 진짜인가» 가 생긴다. 기기별 저장으로 바꾸려면 인쇄 경로(`billPrint.js` 등 🔒)가 읽는 곳을 바꿔야 한다 — 하지 않는다. |
| 이 기기가 어느 자리인지(«Use on this device») · 이 기기에 프린터가 어떻게 연결됐는지(안드로이드 앱 등록부 · Windows 프린터 · QZ Tray) · 안내 화면 고르기 | **기기별**(지금 그대로 — 브라우저/앱 저장) | 이미 그렇게 돼 있다. 바꾸지 않는다. |
| **새로:** 누가 매장 공용 설정을 바꿀 수 있나 | **«프린터 설정 기기» 한 대** (매장 설정 안 꼬리표 `setupDevice`) | 프린터 이름은 «그 이름을 등록한 기기» 에서만 뜻이 있다. 다른 기기에서 «이 기기에서 찾은 프린터» 로 고르면 인쇄 기기가 모르는 이름이 들어간다(매장 28 실례). |

실측으로 찾은, 지금 «다른 곳에서 바뀌는» 길 4가지 — 이번 설계가 모두 막는다:
1. **다른 기기에서 드롭다운 하나** → 즉시 매장 전체 반영(자동저장 54칸).
2. **다른 기기에서 프린터와 무관한 저장**(결제 토글 등) → `handleSave` 가 그 기기가 «예전에 불러온» 프린터 설정을 통째로 다시 보냄 → 그 사이 설정 기기에서 바꾼 것이 되돌아감(옛 화면 덮어쓰기).
3. **비상 모드 스위치 · 자리 추가/삭제** → `PUT /api/restaurants/:id` 로 프린터 설정 통째 전송. **이 길에는 «관리자만» 문이 없다**(`restaurants-crud.js:1835` — `store.js` 의 자물쇠③은 이 길에 없음). 직원 계정의 비상 스위치가 옛 설정을 통째로 실어 보낸다.
4. **기기 종류 섞임** — 안드로이드 앱에서 고른 이름(qztray·«Counter»)이 브라우저+RawBT 기기와 한 설정을 나눠 씀.

---

## 2. 모델

### 2-1. 기기 번호 — 이미 있는 것을 쓴다
`utils/printDiagnostics.ts getDeviceId()` (localStorage `print_device_id`, 인쇄 자가진단이 쓰는 번호). 새 번호를 만들지 않는다. 값이 `dev-ephemeral`(저장 불가 브라우저)이면 «기기 번호 없음» 으로 본다 — 설정 기기가 될 수 없고, 매번 확인 창으로만 바꿀 수 있다.
- 브라우저와 PWA 는 같은 번호(같은 저장소) · 안드로이드 앱 · Windows 앱은 각자 번호 — 프린터 이름 체계가 앱마다 다르므로 이게 맞다.
- 앱을 다시 깔거나 브라우저 데이터를 지우면 번호가 바뀐다 → 그 기기는 «다른 기기» 가 되고, 확인 창의 체크 칸으로 다시 설정 기기가 된다(§4-3).

### 2-2. 꼬리표 — `printer_settings.setupDevice`
```
setupDevice: {
  id: string,          // print_device_id
  kind: 'android-app'|'windows-app'|'pc-browser'|'android-browser'|'ipad-browser',  // detectSetupDevice().device
  name: string,        // 사람이 알아볼 이름(40자) — 기본 «{기기 종류} · {자리 이름}», 정할 때 고칠 수 있음
  at: ISO, byId: number, byName: string,          // 서버가 채움
  otherEdit?: { kind, name, at, byName }           // 설정 기기가 아닌 곳에서 확인하고 바꾼 마지막 기록(서버가 채움)
}
```
- **인쇄 경로는 이 칸을 읽지 않는다.** `StoreContext`·`SettingsPage` 가 localStorage `printerSettings` 로 옮길 때 칸을 하나씩 골라 담으므로 `billPrint.js` 까지 가지도 않는다(검증 V5 에서 grep 0 으로 증명).
- **이 칸은 전용 길(§3-2 ①)로만 써진다.** 설정 저장에 실려 온 `setupDevice` 는 서버가 무시하고 DB 값을 유지한다(옛 번들·옛 화면이 꼬리표를 지우거나 바꾸지 못함).
- 모델 게터(`Restaurant.printer_settings.get`)는 저장된 칸을 그대로 펼쳐 돌려주므로 읽기 쪽 변경 없음.

### 2-3. 기기 상태 3가지 (관리자·시스템 관리자 기준. 직원은 지금처럼 보기 전용)
| 상태 | 조건 | §2·§3 |
|---|---|---|
| **N — 아직 없음** | `setupDevice` 없음 | 잠김. «이 기기를 프린터 설정 기기로 정하기» |
| **M — 이 기기** | `setupDevice.id === 내 번호` | 열림(지금과 같음) |
| **O — 다른 기기** | 그 밖 | 잠김. «이 기기에서 바꾸기…» → 확인 → 이 방문 동안만 열림 |

`printerEditable = canEditPrinterSettings && !loading && !error && (상태 M || 이번 방문 확인함)`.
«이번 방문 확인함» 은 화면 상태(React state)뿐 — 새로 고침·다른 화면 다녀오면 다시 잠긴다. 저장소에 남기지 않는다.

**기존 매장도 N 에서 시작한다**(배포 뒤 처음 프린터 탭을 연 관리자가 한 번 정한다). 열어 둔 채로 두고 «정하면 그때부터 보호» 로 하지 않는 이유: 그러면 대부분 매장이 영영 보호 밖에 남고, 위 2번(옛 화면 덮어쓰기)이 계속된다. 정하기는 버튼 한 번 + 창 한 번이다.

---

## 3. 서버

### 3-1. 새 공용 함수 — `dev-backend/utils/printerSetupDevice.js` (판정은 여기 하나)
```
resolvePrinterWrite({ role, device, existingPs }) → 'full' | 'emergency'
```
`device` = 요청 본문 `printer_device` `{ id, kind, name, confirm? }` (없을 수 있음).

| 역할 | DB 꼬리표 | 요청의 기기 | 결과 |
|---|---|---|---|
| 관리자·SA 아님 | — | — | `emergency` (지금 `store.js` 자물쇠③ 그대로) |
| 관리자·SA | 없음 | 무엇이든 | `full` (지금과 같음 — 옛 번들·N 상태) |
| 관리자·SA | 있음 | 없음(옛 번들) | `full` + 경고 로그 `[printer-scope] no device info` (아래 «알고 두는 한계») |
| 관리자·SA | 있음 | id 같음 | `full` |
| 관리자·SA | 있음 | id 다름 + `confirm === true` | `full` + `otherEdit` 기록(프린터 설정이 실제로 달라졌을 때만 — 꼬리표 뺀 JSON 비교) |
| 관리자·SA | 있음 | id 다름, confirm 없음 | `emergency` + 응답에 `printerSettingsSkipped: 'other_device'` |

같은 파일에:
- `mergeEmergencyOnly(existingPs, incomingPs)` — `store.js:223-242` 의 지금 로직을 **그대로 옮긴 것**(emergencyMode/emergencyEnabledAt 만 반영, 나머지 보존).
- `keepSetupDevice(valueToSave, existingPs)` — 저장 직전 `setupDevice` 를 DB 값으로 되돌림(없으면 지움).
- `seedMissingStations(existingPs, stations)` — 없는 스테이션 칸만 기본값 `{ name:'', autoPrint:true, address:'', method:'qztray', stationName }` 으로 더함. 있는 칸은 건드리지 않음. 더한 수를 돌려줌.

**두 라우트가 같은 함수를 쓴다** — `routes/store.js PUT /settings`(지금 인라인 분기를 함수 호출로) 와 `routes/restaurants-crud.js PUT /:id`(지금은 문이 없음 → 같은 판정 추가). 순서: `resolvePrinterWrite` → `emergency` 면 `mergeEmergencyOnly`, `full` 이면 기존 `guardPrinterSettings` → `keepSetupDevice`.
`confirm` 은 화면이 보낸 표시일 뿐이다 — 보안 장치가 아니라 실수 방지 장치다(관리자는 원래 권한이 있다). 권한 경계는 역할 판정이 그대로 맡는다.

### 3-2. 좁은 쓰기 길 3개 — `routes/store.js` (접근 판정은 같은 파일 `PUT /settings` 와 같은 방식: `authenticateToken` + `userCanAccessRestaurant`)
통째 저장에 얹지 않고 «그것만 쓰는» 길을 둔다. 셋 다 DB 의 원본 JSON 을 읽어 **해당 칸만** 바꿔 저장한다.

| | 길 | 누가 | 하는 일 |
|---|---|---|---|
| ① | `POST /api/store/printer-setup-device` `{ restaurantId, device:{id,kind,name} }` | 관리자·SA | `setupDevice` 를 이 기기로(at/byId/byName 은 서버가). id 가 `dev-ephemeral`·빈 값이면 400. 다른 칸 무변경. |
| ② | `POST /api/store/printer-station-seed` `{ restaurantId }` | 관리자·SA | 그 매장 `KitchenStation` 행을 서버가 읽어 `seedMissingStations`. 더한 게 0 이면 **쓰지 않는다**. 기기 잠금과 무관(더하기만 하므로). |
| ③ | `POST /api/store/printer-emergency` `{ restaurantId, on:boolean }` | 매장 접근 가능한 모든 역할(지금처럼 직원 포함) | emergencyMode/emergencyEnabledAt 만. 기기 잠금과 무관. |

응답은 표준 형식 `{ success, data: { printer_settings } }`(바뀐 뒤 값 — 화면이 그대로 다시 채운다).

### 3-3. 알고 두는 한계 (지금 고치지 않는다)
- **옛 번들(기기 정보를 안 보내는 화면)의 저장은 꼬리표가 있어도 지금처럼 통과한다.** 막으면 옛 화면을 띄워 둔 관리자의 정상 변경이 «성공» 응답과 함께 조용히 버려진다 — 영업 중 그쪽이 더 위험하다. 옛 번들은 새로 고침 한 번이면 사라지고, 꼬리표 자체는 3-1 `keepSetupDevice` 가 지킨다. 로그 `[printer-scope] no device info` 가 운영에서 0 으로 떨어진 뒤 막는 것은 별건.

---

## 4. 화면 — 설정 › 프린터

새 파일 **`dev-frontend/src/pages/Settings/PrinterDeviceScope.tsx`** 에 상태 줄 · 창 2개 · 훅을 둔다(SettingsPage 는 8878줄 — 본문을 늘리지 않는다). 공용 `Modal` · `Button` 사용, 새 styled.button 금지, 장식 이모지 금지(글리프 `●` 만).

### 4-1. 잠금 범위
| 잠그는 것(매장 공용을 쓰는 칸 전부) | 잠그지 않는 것 |
|---|---|
| §2 자리 카드(이름·사용·방식·프린터·자동 인쇄·통합 티켓) · 자리 추가/삭제 · 주방 프린터 · 스테이션 프린터(방식·주소·자동·장수) | §1 «이 기기 연결» 전부(QZ 연결·프린터 찾기·안드로이드 앱 등록부·안내 고르기) |
| §3 인쇄 내용 · 인쇄 형식 · 영수증 꾸밈 | «Use on this device»(이 기기가 어느 자리인지) |
| | **Test 인쇄 버튼 전부**(매장 설정을 쓰지 않는다 — POS2 기기가 자기 영수증 프린터를 시험해야 한다) |
| | §4 비상 모드 · 자동 인쇄 미리보기 · 자가진단 |

- **기준은 결과다:** 잠긴 상태에서 §2·§3 안의 `input/select/textarea/button` 중 활성인 것은 위 «잠그지 않는 것» 뿐이어야 한다(V3 에서 실브라우저로 센다). 수단은 팀원 재량 — 권고는 프린터 탭 안 `AutoSaveField` 54개를 «잠김이면 자식을 비활성으로 감싸는» 얇은 래퍼 하나로 바꾸고, AutoSaveField 밖 버튼(자리 추가/삭제 등)만 `disabled` 를 따로 다는 것. **열린 상태의 배치는 변경 전과 픽셀 동일**(래퍼가 flex 자식 구조를 바꾸면 안 된다).
- 비활성 칸은 **값이 읽혀야 한다** — 전체를 흐리게 덮지 않는다.

### 4-2. 저장 요청 — 한 군데 규칙
`printerEditable` 이 아니면 **어떤 저장도 `printer_settings` 를 싣지 않는다.**
- `handleSave`: 지금 자물쇠① 조건 `(printerSettingsLoading || printerSettingsError)` 에 `|| !printerEditable` 을 더한다(같은 자리 · 같은 방식). 싣는 경우 본문에 `printer_device: { id, kind, name, confirm }` 을 같이 보낸다(`confirm` = 상태 O 에서 확인하고 연 방문이면 true).
- 자리 추가 · 자리 삭제(`PUT /api/restaurants/:id` 2곳): 버튼이 잠기고, 열렸을 때는 `printer_device` 를 같이 보낸다.
- 비상 스위치: **항상 길 ③** 으로(통째 전송 없앰).
- 스테이션 칸 채우기(`SettingsPage.tsx:1789-1821`): **항상 길 ②** 로(60ms 뒤 `handleSave` 통째 저장 없앰). 조건(불러온 뒤 · 빠진 스테이션이 있을 때 · 한 번)은 그대로. 응답 값으로 화면 상태를 채운다.
- 응답에 `printerSettingsSkipped` 가 오면: 프린터 설정을 다시 불러오고, 잠그고, 상태 줄에 «프린터 설정은 저장되지 않았습니다 — 프린터 설정 기기가 바뀌었습니다» 한 줄.
- 불러올 때 `dbSettings.setupDevice` 는 `printerSettings` 상태에 넣지 않고 **따로** 둔다(저장 본문에 섞이지 않게).

### 4-3. 상태 줄 — 지금 회색 «관리자만 바꿀 수 있습니다» 줄 자리(탭 맨 위), 같은 모양(한 줄 + 오른쪽 버튼)
직원: 지금 문구 그대로. 관리자·SA:

**N — 아직 없음** (배경 `#F3F4F6`)
> 프린터 설정은 한 기기에서만 바꿉니다. 아직 그 기기를 정하지 않았습니다 — 프린터가 연결된 기기(주방 티켓을 찍는 기기)에서 정하세요. 　**[이 기기를 프린터 설정 기기로 정하기]**

창(`Modal`) «이 기기를 프린터 설정 기기로»:
- `이 기기: {기기 종류} · 자리 {자리 이름}`
- 이름 칸(기본 «{기기 종류} · {자리 이름}», 40자) — «다른 기기에서 이 이름으로 보입니다»
- 글 3줄: «앞으로 프린터 설정은 이 기기에서만 바로 바뀝니다.» · «다른 기기에서는 확인 창을 거쳐야 바꿀 수 있습니다.» · «프린터 이름은 이 기기에 등록된 이름을 씁니다.»
- 조건부 한 줄(주황 글자, 상자 없음):
  - 자리가 2개 이상이고 이 기기 자리의 «결제 후 자동 인쇄» 가 꺼져 있으면: «이 기기는 주방 티켓을 찍는 자리({자동 인쇄 켜진 자리 이름})가 아닙니다. 보통은 그 기기에서 정합니다.»
  - 기기 종류가 `android-browser`·`ipad-browser` 면: «보통은 인쇄하는 PC 나 앱 기기를 설정 기기로 둡니다.»
  - 기기 번호 없음이면: 버튼 비활성 + «이 브라우저는 기기를 기억할 수 없어 설정 기기가 될 수 없습니다(사생활 보호 창).»
- [취소] [정하기] → 길 ① → 다시 불러오기 → 상태 M.

**M — 이 기기** (배경 `#F3F4F6`)
> ● 이 기기가 프린터 설정 기기입니다 — «{name}»
- `otherEdit.at` 이 이 기기가 마지막으로 본 값(localStorage `printer_other_edit_seen`)보다 새로우면 아래 한 줄(주황 글자): «다른 기기에서 프린터 설정을 바꿨습니다 — {날짜·시각(매장 시간대)} · {kind 이름} «{name}» · {byName}» **[확인]** (누르면 본 값 저장).

**O — 다른 기기** (배경 `#FFFBEB` · 글 `#92400E`)
> 프린터 설정 기기: «{name}» ({기기 종류}). 이 기기에서는 보기만 됩니다 — 인쇄 시험 · «이 기기에서 사용» · 비상 모드는 여기서도 됩니다. 　**[이 기기에서 바꾸기…]**

같은 줄을 §2 · §3 제목 바로 아래에도 한 줄로 되풀이한다(탭이 길어 맨 위 줄이 안 보인다 — 버튼 포함, 상태 N 도 같음).

창(`Modal`) «다른 기기에서 관리하는 프린터 설정입니다»:
- `프린터 설정 기기: «{name}» ({기기 종류}) · {지정 날짜} {byName}`
- 글: «여기서 바꾸면 바꾸는 즉시 매장 전체에 적용되고, 인쇄하는 기기의 주방 티켓·영수증이 달라집니다.» · «프린터 이름은 실제로 인쇄하는 기기에 등록된 이름이어야 합니다. 이 기기에서 찾은 이름이 그 기기에는 없을 수 있습니다.»
- 기기 종류가 설정 기기와 다르면 한 줄 더(주황): «이 기기({내 종류})는 설정 기기({그 종류})와 종류가 다릅니다. 연결 방식 칸을 바꾸면 그 기기의 인쇄가 멈출 수 있습니다.»
- 체크 칸(기본 꺼짐): «앞으로 이 기기를 프린터 설정 기기로 사용 — 기기를 바꿨거나 앱을 다시 설치했을 때만» (기기 번호 없음이면 숨김)
- [취소] [확인하고 이 기기에서 바꾸기](primary — 삭제가 아니므로 빨강 아님)
- 확인 → (체크했으면 길 ① 먼저) → **프린터 설정을 서버에서 다시 불러온 뒤** 연다(그 사이 이 화면에 남아 있던 옛 값·잠긴 동안 바뀐 화면 값이 실려 가지 않게). 불러오기 실패면 열지 않는다.
- 열린 동안 상태 줄: «이 기기에서 바꾸는 중 — 바꾸는 즉시 매장 전체에 적용됩니다.» **[다시 잠그기]**

### 4-4. 기기 종류별로 보이는 것
| 기기 | 다른 점 |
|---|---|
| **안드로이드 앱** | 종류 이름 «Android 앱». §2 프린터 고르기는 앱 등록부 이름(지금 그대로). 잠겨도 §1 앱 등록부·«자동 인쇄 준비» 는 그대로 쓴다. |
| **Windows 앱** | «Windows 앱». §2 는 Windows 프린터 이름(지금 그대로). |
| **PC 브라우저(+PWA)** | «PC · 웹브라우저». QZ Tray 연결·프린터 찾기는 잠금 밖. |
| **안드로이드 브라우저 · iPad** | 정하기 창에 «보통은 인쇄하는 PC 나 앱 기기를…» 한 줄. 막지는 않는다. |
기기 종류 이름은 11-08 에 만든 `printer.setupGuide` 의 기기 이름 키를 그대로 쓴다(새로 짓지 않음).

### 4-5. 번역
`settings:printer.deviceScope.*` — en → ko → zh → ms 4개 전부. 화면 영어 원문은 «Printer setup device» · «Set this device as the printer setup device» · «Change on this device…» · «Confirm and change on this device» · «Lock again». `npm run i18n:verify` 통과.

---

## 5. 바꿀 파일

| 파일 | 내용 |
|---|---|
| `dev-backend/utils/printerSetupDevice.js` | **새로** — §3-1 |
| `dev-backend/routes/store.js` | `PUT /settings` 인라인 분기 → 공용 함수 · 길 ①②③ 추가 |
| `dev-backend/routes/restaurants-crud.js` | `PUT /:id` 의 `printer_settings` 한 블록(1835~)에 같은 판정 |
| `dev-backend/tests/printer-setup-device.test.js` | **새로** — §3-1 표 전 행 + 보존 + 채우기 |
| `dev-backend/scripts/health-check.js` | security 에 3건(V2 h · 길 ① 직원 403 · 길 ① 익명 401) |
| `dev-frontend/src/pages/Settings/PrinterDeviceScope.tsx` | **새로** — 상태 줄 · 창 2개 · 훅(`usePrinterDeviceScope`) |
| `dev-frontend/src/pages/Settings/SettingsPage.tsx` | 불러오기에서 꼬리표 따로 · `handleSave` 조건 1줄 + `printer_device` · 직접 저장 3곳 · 채우기 효과 · 프린터 탭 잠금 래퍼 · 상태 줄 자리 |
| `dev-frontend/public/locales/{en,ko,zh,ms}/settings.json` | §4-5 |
| `dev-frontend/scripts/check-printer-settings-roundtrip.js` | `setupDevice` 를 «설정 값이 아닌 꼬리표» 로 따로 비교 |
| `docs/PRINT_DEVICE_SETUP_STANDARD.md` §7-c · `docs/WORKSTATION_DESIGN.md` 끝에 한 문단 | 구조 기록 |

**건드리지 않는다:** 🔒 8개(`billPrint.js` · `useAutoPrintPoller.ts` · `MainLayout.tsx` · `KitchenDisplayPage.tsx` · `POSTerminalPage.tsx` · `orders-crud.js` · `stationEnrichment` · `orderTotals`) · `utils/settingsGuard.js`(판정은 새 파일에서, 가드는 그대로 부른다) · `models/Restaurant.js` · `StoreContext.tsx` · `AndroidPrinterSetup.tsx` · `PrinterSetupGuide.tsx` · `printDiagnostics.ts`(읽어 쓰기만) · DB 구조.

---

## 6. 배포 안전 — «배포해도 기존 매장 설정이 안 바뀐다»

- 마이그 0 · 새 칸은 관리자가 «정하기» 를 눌렀을 때만 생긴다.
- 꼬리표 없는 매장에 대한 서버 동작은 지금과 같다(§3-1 표 2행).
- 새 화면은 꼬리표 없는 매장에서 프린터 설정을 **지금보다 덜** 쓴다: 아무 저장에나 프린터 설정을 실어 보내던 것이 «설정 기기 또는 확인한 방문» 으로 줄고, 스테이션 채우기는 빠진 칸만 더한다. (부수 효과: `reference_settings_save_fills_defaults` 의 «아무 저장 1회에 영수증 1장→2장» 은 설정 기기가 아닌 곳에서는 더 이상 일어나지 않는다. 설정 기기에서의 동작은 그대로 — 이번에 고치지 않는다.)
- 운영 반영은 다음 배포 때. 이 일에서 운영 쓰기·배포 없음.

---

## 7. 검증 — 이것이 다 증명돼야 끝

데모 매장 38 만. 설정을 바꾸는 검사는 **원본 바이트를 먼저 떠 두고 끝에 복원**한다.

**V1 단위(jest)** — §3-1 표 6행 전부 · `keepSetupDevice`(없는 본문 → 보존 / 다른 값 실어 옴 → DB 값) · `seedMissingStations`(빠진 것만 · 있는 칸 바이트 동일 · 두 번째 호출 0) · `mergeEmergencyOnly` 가 옮기기 전과 같은 결과. 기존 `tests/settings-guard.test.js` 그대로 통과.

**V2 실호출(HTTP)**
- a. 꼬리표 없음 + 기기 정보 없는 저장 → 변경 전과 같은 결과(기존 라운드트립 검사 통과)
- b. 길 ① → `setupDevice` 만 생기고 나머지 칸 바이트 동일
- c. 다른 기기 번호 · confirm 없음 · 프린터 설정 통째(값 바꿔서) → DB 프린터 설정 무변경 + 응답 `printerSettingsSkipped`
- d. 다른 기기 번호 · confirm → 반영 · `otherEdit` 기록 · `setupDevice.id` 그대로
- e. 다른 기기에서 길 ① → id 바뀜
- f. 길 ③ — 직원 계정 · 다른 기기 관리자 각각 → emergency 두 칸만 바뀜
- g. 길 ② — 스테이션 칸 하나를 지운 모양에서 → 그 칸만 생김 · 두 번째 호출은 쓰기 0
- h. **직원 계정이 `PUT /api/restaurants/:id` 로 프린터 설정 통째** → emergency 외 무변경(변경 전에는 통째로 들어가는지도 한 번 실측해 기록 — §1 의 3번 사실 확인)
- i. 꼬리표 있는 매장에 `setupDevice` 없는 통째 저장(옛 번들 흉내) → 꼬리표 보존
- j. 관리자 흐름 회귀: 설정 기기에서 자리 추가 · 삭제 · 칸 변경 → 저장 → 다시 불러오기 일치

**V3 실브라우저(Playwright · 브라우저 컨텍스트 2개 = 기기 2대)**
- N: §2·§3 활성 칸 = «잠그지 않는 것» 목록뿐(개수로 센다) · 프린터 탭 열기만 → 쓰기 0
- A 가 정함 → A 는 M(전부 활성 · 변경 전 스크린샷과 배치 동일) · B 는 O(잠김)
- B 가 결제 탭에서 토글 → 나간 요청 본문에 `printer_settings` **없음**(요청 가로채 확인)
- B 확인 창 → 다시 불러옴 → 칸 하나 바꿈 → 저장됨 → B 새로 고침 → 다시 잠김 → A 에 «다른 기기에서 바꿨습니다» 줄
- 잠긴 B 에서 Test 인쇄 버튼 · «Use on this device» · 비상 스위치 동작
- 기기 6종 흉내(11-08 검사 방식: 안드로이드 앱 · Windows 앱 · PC · PWA · 안드로이드 브라우저 · iPad) × 상태 3가지 — 크래시 0 · console.error 0 · 상태 줄 글자
- 4개 언어 × 창 2개 스크린샷(넘침·잘림 없음) · 폰 폭 1장

**V4 고장 주입(반증 — 각각 한 번, 주입 → 실패 확인 → 원복)**
- 서버 기기 판정 제거 → V2 c 실패
- `keepSetupDevice` 제거 → V2 i 실패
- `handleSave` 의 `!printerEditable` 제거 → V3 «본문에 없음» 실패
- 프론트 주입은 빌드 전에 몰아서(빌드 1회 규칙). 서버 주입은 `pm2 restart dev-backend` 뒤 호출.

**V5 배포 안전**
- `check-printer-settings-roundtrip.js` 기존 56건 통과(모양 3가지 × 불러오기→저장→다시 불러오기) + 꼬리표 있는 모양 1가지 추가
- `grep -c "setupDevice\|printer_device"` 🔒 8개 파일 = 0 · `check-print-guard.js` 8/8 변경 0
- 꼬리표 없는 매장: 기기 6종으로 프린터 탭 열기만 → DB 바이트 동일

**V6 게이트** — `verify-all --full`(빌드 1회 뒤) · `check-sensitive-diff.js` · i18n · design-guard.
이 일은 설정 저장 서버 길과 역할 문(§3-1 — `restaurants-crud` 에 문 추가)을 건드리므로 **끝난 뒤 Fable 검증 1회 대상**이다. 위 V1~V6 숫자와 diff 를 들고 온다. «통과 = 완료» 선언은 그 판정 뒤.

**확인 못 하는 것(그대로 적는다):** 실제 안드로이드 앱·Windows 앱 기기에서의 눈 확인은 개발서버에서 못 한다 — 흉내(플래그 주입)로만. 종이 출력은 이번 변경과 무관(인쇄 경로 무변경)하므로 실프린터 확인 대상 아님.

---

## 8. 구현 순서

1. 서버: 공용 함수 + jest(V1) → 두 라우트 연결 + 길 ①②③ → V2 실호출 → 서버 고장 주입 2건
2. 화면: `PrinterDeviceScope.tsx` → SettingsPage 연결(불러오기 · 저장 조건 · 직접 저장 3곳 · 채우기 · 잠금 래퍼) → 번역 4개 → 프론트 고장 주입 1건 → **빌드 1회** → V3 · V5 · V6
3. 문서 2곳 · 작업기록 · 메모리 `project_printer_settings_wipe_locks` 에 «자물쇠④ 설정 기기» 한 줄
4. Fable 검증 1회

SW 버전은 올리지 않는다(배포 때).

---

## 9. 운영 반영 뒤 매장에서 일어나는 일 (보고용 — 일상어)

- 관리자가 프린터 탭을 열면 맨 위에 «프린터 설정 기기를 정하세요» 가 보이고, 정하기 전에는 칸이 잠겨 있다. **프린터가 연결된 기기(주방 티켓 찍는 기기)에서 한 번 누르면 끝.** 인쇄는 그 전에도 뒤에도 그대로 나온다.
- 그 뒤 다른 기기에서는 프린터 설정이 보기만 되고, 바꾸려면 확인 창을 거친다. 결제·운영 등 다른 설정을 다른 기기에서 저장해도 프린터 설정은 더 이상 딸려 가지 않는다.
- 매장 28(K-DINE Noodles)처럼 기기 종류가 섞인 곳은, 실제로 인쇄하는 기기(안드로이드 앱)에서 정한 뒤 그 기기에서 §2 를 맞추면 된다. 운영 데이터는 이 일에서 고치지 않는다.

---

## 10. Irene 에게 물을 것

**없음.** 이번 결정(매장 한 벌 유지 · 설정 기기 한 대 · 다른 기기는 확인 뒤 그 방문만 · 기존 매장도 한 번 정하기)은 모두 화면·꼬리표 수준이라 되돌릴 수 있다. Irene 가 «기본 프린터 설정은 한곳에서만 하는 게 맞다면» 이라고 맡긴 판단에 대한 Fable 의 답은 «맞다 — 한곳에서» 다.

보고에 한 줄로 알릴 것(질문 아님): «배포 뒤 모든 매장이 프린터 탭에서 설정 기기를 한 번 정해야 칸이 열립니다 — 인쇄에는 영향 없음.»
