# 매장 기기용 «Cloudflare 안 거치는 별도 주소» 설계 (2026-11-17)

작성: [Claude Code] Opus · 백그라운드 작업방 75a4942d · 종류: 설계 정리(구현·운영 변경 0)
앞선 판단: `.claude/fable-design-20261029-store-direct-path.md` (Fable · 선택지 B «매장 전용 둘째 주소» = 지금 아님)
Irene 맡긴 일(상황판 카드에서 넘겨받음): 매장 8 안드로이드 태블릿용 별도 하위 주소 — ① DNS·인증서·nginx·허용 주소 ② 로그인 유지·프린터 설정 ③ 서버 IP 이전 위험·되돌리기 ④ 보안. 설계와 Irene 결정할 것만.

---

## 0. 결론 한 줄

**지금은 만들 필요가 없다.** `purplehere.com`·`www` 는 2026-10-29 부터 Cloudflare «DNS only»(회색 구름)라 **매장 8 태블릿을 포함한 모든 기기가 이미 운영서버(87.106.78.146)에 직접 닿고 있다.**
별도 주소는 **Cloudflare 를 purplehere.com 에 다시 켜기로 할 때** 비로소 의미가 생긴다. 그때 아래 §2~§6 대로 만들면 된다.

### 지금 상태 실측 (2026-11-17)
| 항목 | 값 | 확인 방법 |
|---|---|---|
| purplehere.com · www | 87.106.78.146 (Cloudflare 아님) | `dig @1.1.1.1` |
| 응답 서버 | `server: nginx/1.24.0 (Ubuntu)` · cf- 머리글 없음 | `curl -sI https://purplehere.com/api/health` |
| 운영 인증서 | Let's Encrypt · 이름 `purplehere.com`, `www.purplehere.com` 둘뿐 · 2026-11-08 ~ 2027-02-06 | `openssl s_client` |
| direct.purplehere.com | DNS 는 이미 와일드카드(`*`)로 87.106.78.146 에 닿음 · **인증서 밖이라 https 오류**(curl exit 60) | `dig` · `curl` |
| dev.purplehere.com | Cloudflare 경유(의도대로) | `dig` |
| Cloudflare 말레이시아 지점 | JHB partial_outage · KUL under_maintenance (11-17 08:3x~08:5x UTC) → «다시 켜기» 기준(둘 다 operational 24시간) **미충족** | cloudflarestatus components API |
| 매장 8 실제 접속 | 10-29 전환 뒤 TM 실주소(202.185.135.47)로만 접속 — Cloudflare 주소 0 | 10-30 운영 읽기(작업기록) |

→ 10-29 Fable 문서에 «확인 못 한 것»으로 남았던 «매장 8 태블릿이 왜 실주소로 직접 닿나»는 **DNS only 전환 때문**으로 설명된다.

---

## 1. 언제 만들어야 하나 (트리거)

다음이 **둘 다** 맞을 때만:
1. Cloudflare 를 purplehere.com 에 **다시 켜기로** 한다(작업기록 «나중에 — Cloudflare 다시 켜기» 기준 충족).
2. 그런데도 매장 기기만은 Cloudflare 를 피해야 할 이유가 있다 — 예: 다시 켠 뒤 2 영업일 안에 매장 오프라인 재전송이 또 생김 · 특정 건물이 Cloudflare 경로만 막음.

이유가 없으면 기본은 «전부 다시 Cloudflare» 이고 이 설계는 쓰지 않는다.

---

## 2. 무엇을 바꾸나 — ① 주소·인증서·서버·허용 주소

주소 이름 예: `direct.purplehere.com` (10-29 Fable 문서는 `pos.purplehere.com` 예시 — 이름은 아무거나, 아래는 `direct` 로 씀).

| # | 무엇 | 누가 | 내용 | 비고 |
|---|---|---|---|---|
| 2-1 | DNS | Irene (Cloudflare 화면) | A `direct` → 87.106.78.146 · **DNS only(회색)** · TTL 300 | 지금은 와일드카드 `*` 가 이미 같은 곳으로 보냄. 그래도 **명시 줄을 따로 만든다** — 와일드카드를 나중에 Proxied 로 바꾸거나 지우면 같이 끌려가지 않게 |
| 2-2 | 인증서 | Irene 운영 터미널(sudo) | `sudo certbot --nginx --expand -d purplehere.com -d www.purplehere.com -d direct.purplehere.com` | 지금 인증서에 이름 하나 더하기. HTTP-01 방식이라 DNS only 여야 발급됨(2-1 먼저). 자동 갱신은 기존 certbot 타이머가 같이 함 |
| 2-3 | nginx | Irene 운영 터미널(sudo) — 2-2 가 `server_name` 을 자동으로 고쳐 주는지 확인 | 운영 server 블록 `server_name purplehere.com www.purplehere.com direct.purplehere.com;` · `/`·`/api`·`/socket.io` 프록시는 같은 블록 공유 | **www→apex 301 규칙이 direct 를 끌고 가지 않게** — direct 는 301 없이 그대로 서빙(301 되면 결국 Cloudflare 주소로 감). 운영 nginx 파일은 이 서버에 없어 줄 번호 미확인 |
| 2-4 | 백엔드 허용 주소(CORS) | 코드(Opus) | `dev-backend/server.js:256` allowedOrigins 에 `https://direct.purplehere.com` · `services/socketService.js:206` socket.io cors.origin 에 같은 값 | 같은 주소 안에서 부르는 API 는 원래 CORS 대상이 아니지만 소켓·일부 브라우저는 Origin 을 보냄 → 둘 다 넣는다. 운영 반영은 배포로 |
| 2-5 | 보안 머리글(CSP) | 바꿀 것 없음 | `middleware/security.js:161` connect-src `'self' … wss:` — 'self' 가 direct 를 덮음 | |
| 2-6 | 쿠키 | 바꿀 것 없음 | 로그인은 localStorage Bearer 토큰(`httpClient.ts`) · 쿠키 Domain 지정 0(grep) → 주소별로 따로 | |
| 2-7 | 외부 로그인(OAuth)·Supabase | 해당 없음 | PurpleHere 는 Supabase 를 쓰지 않음(grep 0) · Google 등 OAuth 로그인 없음 · OAuth 는 PayPal 서버→서버 토큰(`paypalCheckoutService.js`)·IOI 매출 전송뿐 — 브라우저 주소와 무관 | |
| 2-8 | 결제 돌아오는 주소 | 확인 필요(구현 때) | Stripe/PayPal 결제 뒤 돌아오는 주소가 `FRONTEND_URL` 고정이면 direct 에서 결제한 손님이 purplehere.com 으로 돌아감 — POS 결제는 대부분 단말·현금이라 영향 작음. 구현 때 결제 경로 하나씩 실측 | 돈 경로라 바꾸면 Fable 게이트 |
| 2-9 | 메일 속 링크 | 바꿀 것 없음 | 비밀번호 재설정·청구서 링크는 `FRONTEND_URL`(운영=purplehere.com) — 메일은 원래 주소로 가는 게 맞음 | |
| 2-10 | 안드로이드 앱 | 코드+새 APK | `mobile-app/capacitor.config.ts` APP_URL 은 **빌드 때 굳음**(런타임 교체 금지 — 바꾸면 NativePrint 다리가 조용히 죽음, 같은 파일 주석). → `PURPLE_APP_URL=https://direct.purplehere.com/pos` 로 **별도 APK** 빌드·설치. 앱 링크(assetlinks)·플레이 콘솔 등록본과도 갈림 | 매장 8 은 네이티브 앱(0.3.4 기록) 사용 → 이 줄이 이 일의 가장 큰 비용 |
| 2-11 | 윈도우 앱 | 코드 | `desktop-pos/src/config.js:40` 허용 목록에 direct 추가 + 주소 고르는 설정 | 매장 10 은 크롬이라 지금은 불필요 |
| 2-12 | 검색 노출 | nginx | direct 는 `X-Robots-Tag: noindex` 또는 robots 막기 — 같은 화면이 두 주소로 색인되지 않게 | SEO 규칙: 서버 설정 변경은 보고 후 승인 |

---

## 3. ② 주소가 바뀌면 기기에서 무엇이 사라지나 · 재설정 순서

브라우저·앱 저장소는 **주소별로 따로**다. direct 로 처음 열면 빈 기기처럼 시작한다.

| 사라지는 것 (기기 저장) | 영향 | 다시 하는 법 |
|---|---|---|
| 로그인 토큰 `auth_token` | 로그아웃 상태 | 다시 로그인 |
| **이 기기의 워크스테이션 `workstation_id`** | 🔒 주방 자동 인쇄 주인(POS1)이 이 기기였다면 **주방 티켓이 아무 데서도 안 나옴** | 설정 → 프린터 → «이 기기» 워크스테이션 다시 고르기. **이게 최우선** |
| 오프라인 메인 POS 지정 `offline_main_pos` | 오프라인 때 모든 기기 잠김 | 잠금 화면 «이 기기를 메인 POS로» 1번 |
| 키오스크 기기 토큰 | 키오스크면 재등록 | 키오스크 등록 다시 |
| 오프라인 대기 작업(IndexedDB) | **옛 주소에 남은 안 보낸 주문은 새 주소에서 안 보임** | 옮기기 전 옛 주소에서 온라인 상태로 대기 0건 확인 |
| PWA 설치 아이콘 | 옛 주소 아이콘 | 새 주소로 다시 설치(브라우저 기기만) |
| `kitchenAutoPrintEnabledAt` | 새 주소에서 «지금»부터 셈 → 옛 주문이 우르르 인쇄되지 않음(안전한 쪽) | 없음 |

| 남는 것 | 이유 |
|---|---|
| 프린터 설정 내용(어느 프린터·자동 인쇄·주방별) | 서버에 저장 · 로그인 때 `StoreContext.tsx:308` 이 다시 내려받음 |
| 안드로이드 앱에 등록한 프린터 | 앱 자체 저장(`PrinterRegistry.kt` SharedPreferences) — 주소와 무관. 단 **새 APK 를 «업데이트»로 깔 때만**(지우고 깔면 사라짐) |
| QZ Tray 신뢰(윈도우) | 인증서 기준 — 재승인 불필요(10-29 Fable 문서 근거) |

**재설정 순서 (매장 영업 외 시간 · 기기 1대씩):**
1. 옛 주소에서 온라인 확인 · 오프라인 대기 0건 확인
2. (태블릿) direct 주소 APK 를 «업데이트»로 설치 / (브라우저) direct 주소 열기
3. 로그인 → 같은 매장 선택
4. 설정 → 프린터 → 이 기기 워크스테이션 다시 고르기(자동 인쇄 주인이었으면 반드시)
5. 오프라인 메인 POS 지정(카운터 기기 1대)
6. 시험 주문 1건 → 주방 티켓 1장 · 영수증 1장 (Irene/매장 눈 확인 1회)

---

## 4. ③ 운영서버 IP 를 옮길 때의 위험 · 되돌리기

| 경로 | 서버 이사 때 | 되돌리기 |
|---|---|---|
| hosts 2줄(매장 10 PC 가 아직 쓰면) | **그 PC 만 접속 불가** — 옛 IP 로 계속 감 | 그 PC 의 hosts 2줄 삭제(Irene 매장 원격/방문). 지금은 DNS only 라 hosts 가 필요 없으니 **지금 지워도 됨** |
| direct 주소(DNS only) | DNS A 한 줄만 새 IP 로(TTL 300 → 5분) · 새 서버에 인증서·nginx server_name·allowedOrigins 같이 옮겨야 함 | 이사 체크리스트에 «direct 줄·인증서 이름 3개» 한 줄 추가 |
| Cloudflare Proxied 주소 | Cloudflare 원점 IP 만 바꾸면 됨(기기 무관) | — |

- 이사 실수 1순위: 새 서버 certbot 을 `purplehere.com www` 만으로 받아 **direct 인증서가 빠짐** → 태블릿만 https 오류. 이사 뒤 `openssl s_client -servername direct.purplehere.com` 1회로 확인.
- direct 를 접을 때: 기기를 purplehere.com 으로 되돌리는 §3 재설정을 **한 번 더** 해야 함(Fable 10-29 «되돌릴 때 또 손이 간다»). DNS 줄은 기기 다 옮긴 뒤에 지움.

---

## 5. ④ 보안 — 무엇이 노출되나

- direct 는 purplehere.com 과 **같은 서버·같은 화면 전체**다. 관리자 화면·로그인·API 가 모두 열린다. 화면을 POS 만으로 좁히려면 nginx 에서 경로를 막아야 하는데, POS 화면이 쓰는 API 가 관리 API 와 같은 `/api` 아래라 **경로 막기로는 안전하게 못 나눈다**(권한은 이미 로그인·역할·매장 접근 검사가 지킴 — 주소와 무관).
- 새로 노출되는 것: **없음**. 운영 IP 는 지금 DNS only 로 이미 공개 상태이고, 같은 서버의 이름 하나 더일 뿐.
- 잃는 것(direct 를 쓰는 기기만): Cloudflare DDoS·봇 가림막. 남는 방어 = nginx + helmet + 요청 횟수 제한(이제 실주소 기준 · `utils/clientIp` · 3dc0ac5e5).
- 더 좁히고 싶으면(선택): nginx 에서 direct 만 **매장 실주소 허용 목록**(매장 8 TM 202.185.135.x)으로 제한. 단 매장 회선 주소가 바뀌면 그 매장이 막힘 → 권하지 않음(Opus 의견).
- 검색 노출 막기 2-12.

---

## 6. 만들 때 순서 (구현 지시가 오면)

1. Fable 설계 1회 — 공개 주소·보안 경계·🔒 인쇄 주인 재지정이 걸려 `design` 대상(이 문서를 넘김)
2. 코드(개발): 2-4 허용 주소 · 2-11 · 2-8 실측 · health-check 에 direct Origin 케이스 → 개발 검증 → 다음 배포
3. Irene: 2-1 DNS → 2-2·2-3 운영 터미널(명령은 그때 상황판 act 로)
4. Opus: 운영 읽기 확인(인증서 이름 3개 · `curl -sI https://direct.purplehere.com/api/health` 200 · socket.io 200 · 301 없음)
5. 태블릿 APK(direct 판) 빌드 → §3 재설정 → 시험 주문 1회

---

## 7. Irene 이 정할 것

**지금 정할 것: 없음** (이미 직접 접속 중).

**Cloudflare 를 purplehere.com 에 다시 켜기로 할 때 정할 것** — 셋 중 하나:
- (가) 전부 다시 Cloudflare — 기기 작업 0 · 이 설계 안 씀. Cloudflare 말레이시아 지점이 또 나빠지면 그때 다시 DNS only(5분).
- (나) purplehere.com 은 계속 DNS only 로 두고 Cloudflare 는 안 켬 — 기기 작업 0 · 가림막 없음(지금 상태 그대로).
- (다) 이 설계(direct) — 매장 기기만 Cloudflare 밖. 기기마다 §3 재설정 + 태블릿 새 APK · 되돌릴 때 또 재설정.

Opus 의견: (나) 또는 (가). (다)는 «다시 켠 뒤 매장만 또 끊김»이 실제로 생겼을 때만. 10-29 Fable 권고(B 지금 아님)와 같은 방향 — 그때 고를 땐 Fable 판단을 다시 받는다.
