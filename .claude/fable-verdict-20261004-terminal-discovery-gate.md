# Fable 게이트 판정 — 카드 단말기 자동 찾기 결함 수정 + 앱 0.3.2 (2026-10-04, 배포 #6 대상)

**판정: PASS (배포 가능).** 조건·대기 사항은 §5. Irene 가 태블릿에서 할 일은 §6.

- 대상: SW `5.77-terminal-discovery-icon-20261004` · 안드로이드 앱 0.3.2 (versionCode 5) · 운영은 현재 SW 5.76 · 앱 0.3.1 (배포 #5, 백업 20261004_100858)
- Irene 원문: 「자동잡힌 IP가 뒤에가 120으로 나와. 왜 다르게 나와?」 「단말기에도 같은 와이파이 … 112로 단말기에 제대로 표시되고 있어」 「나는 제대로 잡자는게 아니라 자동잡히는 문제를 해결하라는 거야」 · 앱 썸네일 이상 · 주소 직접 입력 마지막 글자 안 들어감
- 지문(판정 시점): fable-gate `d6bbff827b87` · 워킹트리 26건 · check-sensitive-diff 비대상(안전망 자체 1건 = health-check 케이스 추가, 근거 §2-3)

## 1. 원인 판정 — 「왜 .120 이 잡혔나」

**확정.** 자동 찾기(앱 `NativeEcrPlugin.discover`)는 «포트 33898 이 열려 있고 Echo 모양으로 답하는 기기»를 단말기로 봤다. 그런데 우리가 보내는 Echo *요청* 프레임(`02000C010B01C3…03`)도 그 모양 검사(`^02[0-9A-F]{10}C3…03$`)를 통과한다. 와이파이의 .120 기기는 **받은 바이트를 그대로 돌려주는 기기**였고, 되돌아온 것이 «우리 요청 그대로»라 단말기로 오인·저장됐다. 서버 쪽도 같은 구멍이었다 — 되돌림 프레임은 CRC 가 맞고 상태 바이트가 00 이라 `applyResponse` 가 **approved** 로 해석했다.

- 내 재현(고장주입): 서버 되돌림 검사를 `if (false && …)` 로 끄고 pm2 재시작 → health-check «Echo 되돌림 거부» **실패(되돌림 200)** = 운영에서 .120 이 잡힌 바로 그 경로. cp 원복 cmp 동일 → 재시작 → 7/7.
- **돈 영향(중요):** 같은 이유로 .120 에 Sale 을 보냈다면 되돌림 프레임의 금액·송장도 요청과 같아 **돈을 받지 않은 카드결제가 승인으로 기록**될 수 있었다(상태 바이트 00 = ackIndicator). 이번 서버 검사(`FRAME_REFLECTED` 422)가 그 구멍을 막는다. 운영에는 아직 Sale 기록 0 → 피해 0.
- 진짜 단말기를 거부할 위험은 **없다**: 규격 §9.1 테스트 벡터 Echo 요청 `02000C010B01C3100000AF1103` vs 응답 `02000B010C01C30000003B5003` — 응답은 Source/Dest 가 뒤집히고(0B01↔0C01) 상태 바이트가 달라 **바이트 동일이 될 수 없다**. 되돌림 검사는 «요청과 완전히 같을 때만» 거부한다.
- **.112 를 왜 못 찾았는지는 미확정**(이 판정의 유일한 미지수). 후보: ① 연결 대기 0.4초 초과(이번에 1.5초로) ② 단말기 ECR 포트가 안 열림(ECR 모드/포트/전송방식) ③ 다른 대역. 이번 묶음의 «검색 기록»이 배포 뒤 첫 자동 찾기에서 이를 가른다(§6).

## 2. diff 범위 대조 — 설계 외 변경 0

| 파일 | 변경 | 판정 |
|---|---|---|
| `mobile-app/…/NativeEcrPlugin.kt` discover | 연결 대기 400→1500ms · `resp == probe` 되돌림 거부 · `probed[]` 반환(host/ok/reflected/responseHex≤200·error) | 절단면 일치. /24 = 253호스트·64스레드 → 연결 단계 최대 약 6초(/22 면 약 24초) + 열린 기기당 교환 3초. 허용 |
| `build.gradle` | versionCode 4→5 · 0.3.2 | ✓ |
| 런처 아이콘 mipmap 15장 + `ic_launcher_background` #5454E8 | `app-icon.svg` 로 재생성(0.2.0~0.3.1 은 Capacitor 기본 아이콘) | ✓ 내가 PNG 실측: 192px 레거시 아이콘 = 보라 바탕 로고 · adaptive foreground 432px 투명(모서리 alpha 0) 로고 폭 32% — **배포 차단 아님**, 다만 적응형 런처에서 로고가 작게 보일 수 있음(§5-②) |
| `services/terminalPayments.js` | `applyResponse` 되돌림 → 422 FRAME_REFLECTED(파싱 전) · `summarizeDiscovery`(사설망 필터·절단) | ✓ 돈 경계 핵심. 기존 흐름 무변경 |
| `routes/terminal-payments.js` | `POST /discovery-report` — `router.use(authenticateToken, requirePaymentAccess)` 아래 · `restaurantFrom` 접근판정 · activity_logs 기록 전용 | ✓ 익명 401 · 타매장 403 내가 실호출 |
| `scripts/health-check.js` | terminal 케이스 1건 추가(7/7) | 안전망 변경 근거 = 새 돈 경계를 게이트에 고정. 비공허 증명 §3 |
| `nativeEcr.ts` / `terminalSale.ts` / `CardTerminalSettings.tsx` | `ecrDiscoverAndReport`(기록은 fire-and-forget, 찾기 결과 무영향) · 주소 칸 `inputMode text` + autocomplete off | ✓ 옛 `ecrDiscover` 는 남아 있으나 호출 0 (무해) |
| `sw.js` | 5.77 | ✓ |
| 🔒 인쇄 보호파일 | **무접촉** — print-guard 8/8 내가 재실행 | ✓ |
| DB 마이그 | 없음 (activity_logs 기존 표, entity_type 은 STRING) | ✓ |

## 3. 검증 — 내가 직접 돌린 것

1. `health-check --category=terminal` **7/7** (수정본) — 되돌림 422 + 진짜 Echo approved 포함.
2. **고장주입(반증)**: 되돌림 검사 제거 → 해당 케이스 **✗ «되돌림 200»** · 원복 cmp 동일 · 7/7. 가드는 공허하지 않다.
3. `/discovery-report` 실호출: 매장 38 RA 토큰 → 200, `8.8.8.8`·`1.1.1.1` 걸러짐, 사설망만 기록 · activity_logs 1행 생성(«scanned 253 · found 192.168.68.112 · answered 2») → 테스트 행 삭제(잔재 0) · 타매장 RA → **403** · 익명 → **401**.
4. 번들: 서빙 중 `main.e2806126.js` 에 `discovery-report` · `inputMode:"text",autoComplete:"off"` 포함 · sw.js 5.77 · **mount sweep 캐시 지문 = 서빙 번들 지문 일치**(35cc8c08…, 10:55) → 팀원의 verify-all --full 24/24 가 이 번들에서 돈 것 확인.
5. APK: `PurplePOS-0.3.2.apk` = `PurplePOS.apk` sha256 97bb1983… = 피드 `android-latest.json` 일치 · `check-desktop-feed` 통과 · dex 에 `reflected`/`probed` 문자열 존재 · 서명 b55813cf… 동일(덮어 설치).
6. print-guard 8/8 · check-sensitive-diff 비대상 · fable-gate 지문 d6bbff827b87.

팀원 보고만으로 받아들인 것(내가 재실행 안 함): verify-all --full 24/24 자체 · e2e native-app-update 5/5 · APK 빌드 로그. 번들 지문 일치(4)로 sweep 은 간접 확인됨.

## 4. 판단이 갈렸던 지점 — 내 결정

- **되돌림을 앱·서버 양쪽에서 거부**: 맞다. 앱만 고치면 옛 앱(0.3.1)·데스크탑이 여전히 승인 구멍. 서버가 최종 방어선이어야 한다.
- **검색 기록을 판정에 안 쓰고 기록 전용**: 맞다. 기록이 실패해도 찾기는 돈다. 단, `probed` 에는 **포트가 열린 기기만** 실린다 — .112 가 목록에 아예 없으면 «태블릿에서 .112:33898 이 안 열림(①~③)» 이라는 뜻이고, 그때는 주소 칸에 .112 직접 입력 → 연결 테스트의 오류코드(CONNECT_REFUSED/TIMEOUT)로 다음을 가른다.
- **주소 칸 마지막 글자**: `inputMode decimal→text` 는 타당한 1차 수정(안드로이드 숫자 키보드·자동완성 간섭). 부모 `handlePaymentSettingChange` 는 동기 setState 라 되감기 경합은 없다. 기기 확인 전까지 «확정»이 아니라 «추정 수정»으로 둔다.
- **Windows 데스크탑 discover 같은 구멍**: 서버 검사가 막으므로 지금 안 고쳐도 승인 오류는 없다. 미빌드·미사용 — 다음 데스크탑 빌드 때 함께(remaining 에 기록됨, 유지).

## 5. 조건·후속 (배포 차단 아님)

① **이 배포는 0.3.2 «앱 안 업데이트(A 경로)» 첫 실측**이다. 카드 → 설치 화면까지 안 가면 그게 다음 사안(선행 판정 조건 그대로).
② adaptive 아이콘 foreground 로고 폭 32%(안전영역 61% 대비 작음). Irene 가 «작다» 하면 다음 APK 때 1.6배 확대 — 지금 재빌드로 배포를 늦추지 않는다.
③ 운영 매장 13 에 저장된 주소는 아직 `.120`. 배포 뒤 자동 찾기가 .112 를 찾으면 덮어쓴다. 못 찾으면 .120 이 남지만, Sale 은 이제 되돌림 422 → comm_error → 복구/수동 경로라 **잘못된 승인은 안 생긴다**.
④ 다음 묶음(사이드바 프로필 카드 여백·도움말 «새로고침») 은 별도 — 이 마커는 이 지문에만 유효.

## 6. Irene 가 태블릿에서 할 일 (배포 뒤, 순서대로)

1. 앱을 완전히 닫았다 다시 연다 → 왼쪽 아래/설정의 **«새 버전 0.3.2» 카드 → 업데이트** → 앱 안에서 설치 화면이 뜨면 설치. (여기까지가 A 경로 첫 실측 — 안 뜨면 그 화면을 알려주면 된다.)
2. 홈 화면 아이콘이 **보라 바탕 PurpleHere 로고**인지 본다.
3. 설정 › 결제 › Card → **자동 찾기**. 결과 세 갈래:
   - **.112 를 찾음** → 끝. 그대로 RM 1.00 테스트로.
   - **못 찾음** → 그대로 두면 된다(우리가 활동 기록에서 .112 가 포트에 안 열렸는지 본다). 추가로 주소 칸에 `192.168.68.112` 를 끝까지 입력해 연결 테스트 1회 — 이번엔 마지막 글자가 들어가는지도 같이 확인.
   - **.120 이 또 나옴** → 앱이 0.3.2 로 안 바뀐 것(설정 › 앱 버전 숫자 확인).

마커: `fable-gate.js pass` (지문 d6bbff827b87 기준).
