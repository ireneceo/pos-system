# Fable 설계 판단 — 매장이 Cloudflare 를 거치지 않고 운영서버에 닿는 길 (2026-10-29)

작성: Fable(리더) · 요청: Opus(구현) · 종류: `decision`(되돌리기 어려운 선택지 B·C 가 포함돼 Fable 판단 대상)
Irene 원문(순서대로): «지금 자꾸 오프라인으로 시스템이 뜨는데 왜이래?» «다른 매장도» «와이파이만 문제야?» «클라우드플레어 … 그거 와이파이 적용되는 경로 아니야? 핸드폰 문제 없어서» «우리가 클라우드플레어를 쓴 이유는 자꾸 블럭되서였어 … 화이트리스트 하는 걸 누가 해?» «한 건물만 문제였는데 다른 곳도 그럴까봐 클라우드플레어 말고는 다른 방법이 없나?» «지금 당장 문제가 있다고 이걸 해결해야지 클라우드플레어 빼버려?» «이상 없어지면 다시 연결하면 안돼? 바로 접속하게 해주고?»

## 0. 결론 한 줄
**지금은 Cloudflare 를 끄는 것(선택지 A)으로 Irene 의 요청이 그대로 충족된다 — 매장 기기는 아무것도 다시 하지 않고 5분 안에 직접 접속하고, 나아지면 같은 자리에서 다시 켠다.** 매장 전용 둘째 주소(B)·자동 전환(C)은 지금 만들지 않는다. 둘 다 «나중에 다시 켜고 싶다» 는 요청과 정반대로, 기기마다 손이 가고 되돌릴 때 또 손이 간다.

## 1. 원인 판정 (이번 오프라인)
| 사실 | 출처 | 해석 |
|---|---|---|
| 오프라인 판정 = 8초 간격 `/api/health`, 6초 타임아웃, 연속 3회 실패(≈24초) | `dev-frontend/src/contexts/OfflineContext.tsx` | 순간 끊김은 안 뜸. 24초 넘게 서버에 못 닿아야 뜬다 |
| 운영서버 재시작 0 · 부하 0 · 직접 접속 200(0.03초) | Opus 실측 | 서버 자체는 멀쩡 |
| activity_logs 요청 주소: 10-15~10-28 매장 8·10 하루 1~2개(172.69.85.150 고정) → 10-29 매장 8 = 5개 · 매장 10 = 10개 Cloudflare 주소 | 운영 DB 읽기 | 매장→Cloudflare 구간이 다른 지점으로 계속 돌려지는 중 = 경로가 흔들림 |
| Cloudflare 지점 상태(2026-10-29 재확인, components API): **JHB major_outage · KUL degraded_performance — 둘 다 10-26 15:30 UTC 부터 그대로** · SIN·KCH operational · 사고 공지 없음 | cloudflarestatus.com/api/v2/components.json | 말레이시아 지점 두 곳이 사흘째 비정상 |
| 핸드폰 데이터는 정상, 매장 와이파이만 문제 | Irene | 통신사(경로)에 따라 닿는 Cloudflare 지점이 다름 — 와이파이 쪽 경로가 비정상 지점으로 감 |
| processed_ops 오프라인 재전송: 매장 10 10-28 13:06, 10-29 03:41/04:49/05:29 UTC | 운영 DB 읽기 | 오프라인→복구→재전송이 설계대로 동작했음(주문 유실 없음) |

**판정: 우리 코드·서버 결함 아님. 매장 와이파이 → Cloudflare 말레이시아 지점 구간의 장애.** Cloudflare 를 거치지 않으면 이 구간이 경로에서 빠진다.
확인 못 한 것 1건: 매장 8 안드로이드 태블릿 1대가 202.185.x(TM 실주소)로 서버에 직접 닿은 기록. 앱 설정(`mobile-app/capacitor.config.ts` APP_URL=purplehere.com/pos)으로는 설명이 안 된다 — 이 사실 위에 무엇도 세우지 않는다(추정 금지).

## 2. 선택지와 결과

### A. Cloudflare 프록시 끄기(DNS only) — purplehere.com · www 두 줄, 지금 · 나아지면 다시 켬
- **무엇을:** Cloudflare DNS 화면에서 두 레코드의 구름을 회색(DNS only)으로. 코드·서버·인증서 변경 0.
- **매장 기기가 할 일: 없음.** 주소가 같으니 localStorage(로그인 토큰·`offline_main_pos` 메인 POS 지정·키오스크 기기 토큰·printerSettings)·PWA 설치·QZ Tray 신뢰·IndexedDB 오프라인 큐 전부 그대로. 레코드 TTL 300초라 **5분 안에** 모든 기기(윈도우 크롬·리눅스 PC·안드로이드 앱)가 운영서버로 바로 간다.
- **되돌리기:** 같은 화면에서 구름을 다시 주황으로. 똑같이 5분. 기기 작업 0.
- **같이 좋아지는 것:** 요청 횟수 제한(`server.js` apiLimiter)이 매장 실제 주소 기준이 된다(`trust proxy 1` + nginx `X-Forwarded-For` 이라 req.ip = 손님 주소). 출퇴근 «매장 네트워크» 판정(`utils/clientIp.js`)도 직접 연결 분기로 정상.
- **잃는 것(보안·운영):** ① Cloudflare DDoS·봇 가림막 — 남는 것은 nginx + helmet + express-rate-limit(15분 5000/IP · PIN 50) ② 운영 IP 노출 — 이미 직접 접속되는 상태였고 저장소 문서에도 있음(새로 노출되는 것 아님) ③ 정적 파일 엣지 캐시 — 운영서버가 직접 서빙(4코어 부하 0.07, 현재 규모 문제 없음) ④ Cloudflare 쪽 규칙(리다이렉트·페이지 규칙·WAF 사용자 규칙)이 있었다면 그 동안 적용 안 됨 — nginx 가 http→https 301·마케팅 경로 www→apex 301 을 이미 자체 처리하므로 알려진 공백은 없음. **켜기 전 Irene 가 Cloudflare «Rules» 화면에 규칙이 있는지 한 번 보면 된다**(있으면 그 내용을 Opus 에게 알려 줄 것, 없으면 끝).
- **영향 없음:** 메일(MX·SPF 는 DNS 레코드, 프록시와 무관) · Let's Encrypt 갱신(certbot nginx 방식 HTTP-01, 직접 접속에서 그대로) · SEO(같은 주소·같은 HTTPS) · dev.purplehere.com(그대로 프록시 유지 — §4 의 카나리로 쓴다).
- **Fable 권고: 지금 이것.** Irene 의 «빼버려? 이상 없어지면 다시 연결» 과 정확히 같은 동작이고, 매장이 손댈 것이 없다.

### B. 매장 전용 둘째 주소(예: pos.purplehere.com, DNS only) — 마케팅은 Cloudflare 유지
- **무엇을:** DNS A 레코드(Irene) + 운영 인증서 확장(`certbot --expand`, Irene 터미널·운영 접속) + nginx `server_name` 추가(운영 쓰기) + `server.js` allowedOrigins·`services/socketService.js` cors.origin·`desktop-pos/src/config.js` 허용 목록·`mobile-app` APP_URL 재빌드·App Links assetlinks(코드 변경·배포) + **기기마다** 새 주소로 재로그인·메인 POS 재지정·키오스크 기기 재등록·PWA 재설치. 프린터 설정은 서버에서 로그인 때 다시 받으므로 재설정 불필요(`StoreContext.tsx:308-313`), QZ Tray 신뢰는 인증서 기준이라 재승인 불필요(`billPrint.js:285-338`).
- **위험:** ① 옛 주소 IndexedDB 에 남은 미전송 오프라인 작업은 새 주소에서 안 보인다 — 옮기는 순간 재전송 안 된 주문이 있으면 그대로 묻힘 ② 안드로이드 APK 는 주소가 구워져 있어 재배포·재설치 ③ «나아지면 다시» 가 없다 — 되돌리려면 같은 기기 작업을 또 한다 ④ 결국 영업 화면 전체가 영구히 Cloudflare 밖 = A 를 영구로 한 것과 보안상 같다(마케팅만 가림막 유지).
- **Fable 권고: 지금 아님.** 임시 조치로는 비용이 가장 크고 되돌리기가 가장 어렵다. «매장 쪽을 영구히 직접 접속으로 두기로 결정» 했을 때만 의미가 있는데, 그 결정은 예전 «블럭» 의 정체(§5)를 알기 전엔 내릴 수 없다.

### C. 같은 주소에서 자동 전환 — 화면은 purplehere.com, API·소켓만 Cloudflare 가 안 될 때 직접 주소로
- **되는 근거:** 인증이 쿠키가 아니라 localStorage Bearer 토큰(`httpClient.ts:105`)이라 교차 주소 API 가 기술적으로 가능.
- **안 되는 이유:** ① 처음 화면·번들·sw.js 는 여전히 Cloudflare 를 거친다 — 지점이 죽으면 새로 여는 기기는 못 연다(이미 열린 탭만 살아남음) ② `httpClient` 인터셉터·`OfflineContext`·소켓 연결·CSP connect-src·CORS credentials 를 전부 건드리고, 🔒 보호파일(useAutoPrintPoller·MainLayout `_printPollFn`)이 쓰는 `/api` 경로의 **밑바닥이 바뀐다** — 파일은 안 건드려도 인쇄 폴러의 네트워크 경로가 달라지는 변경이라 인쇄 게이트 대상 ③ «Cloudflare 가 안 되는가» 를 기기가 스스로 판정해야 하는데 지금 오프라인 판정 자체가 그 판정이라 두 판정이 겹치면 플래핑.
- **Fable 권고: 지금 아님. 조건부 보류** — 이번 일이 끝나고 **90일 안에 같은 종류(Cloudflare 지점 장애로 매장 오프라인)가 한 번 더** 생기면 그때 별도 설계(`design`)로 올린다. 그 전엔 만들지 않는다.

### D. Cloudflare 유료 기능(Load Balancer·Argo)으로 경로 바꾸기
- **Fable 권고: 아님.** 비용이 들고, 매장 와이파이→Cloudflare 첫 구간(지점까지) 문제는 어떤 유료 기능도 못 피한다.

## 3. 결정 (A)
1. Irene: Cloudflare DNS 에서 `purplehere.com`·`www.purplehere.com` 두 줄 DNS only(이미 상황판 할 일로 올라감). 켜기 전 «Rules» 화면에 규칙이 있는지 한 번 봄.
2. Opus: 전환 뒤 운영 읽기로 확인 — ① `curl -sI https://purplehere.com/ | grep -i server`(`cloudflare` 가 사라지면 적용) ② activity_logs 의 매장 8·10 요청 주소가 TM/통신사 실주소로 바뀌는지 ③ processed_ops 오프라인 재전송이 그 뒤 새로 생기지 않는지(2 영업일). 운영 쓰기 0.
3. 매장: 할 일 없음. 단, 이미 잠긴 기기는 오프라인 잠금 화면에서 저절로 풀린다(`/api/health` 성공 → `goOnline`).
4. hosts 파일 할 일(매장 10 PC)은 **다시 올리지 않는다** — A 가 모든 기기를 덮고, hosts 는 서버 이사 때 그 PC 만 못 들어가는 지뢰다.

## 4. Cloudflare 를 다시 켜는 기준 (Fable 결정)
다음 **셋이 모두** 맞을 때, **영업 외 시간**(말레이시아 기준 매장 마감 뒤 또는 오전 10시 전)에 켠다. 점심·저녁 피크에 켜지 않는다.
1. **지점 상태:** `https://www.cloudflarestatus.com/api/v2/components.json` 에서 KUL·JHB 가 **둘 다 `operational` 이고 24시간 넘게 유지**(Opus 가 명령 한 줄로 확인: 아래).
   ```bash
   curl -s https://www.cloudflarestatus.com/api/v2/components.json | python3 -c "import sys,json;[print(c['name'],c['status'],c['updated_at']) for c in json.load(sys.stdin)['components'] if 'Malaysia' in c['name']]"
   ```
2. **카나리:** `dev.purplehere.com` 은 프록시를 유지한다. 켜기 전날 매장 와이파이에 있는 기기(매장 10 윈도우 PC 아무거나)에서 `https://dev.purplehere.com/api/health` 를 열어 바로 뜨는지 1회 — Irene 가 매장에 한 줄 부탁하거나, 다음 매장 방문 때. 이걸 못 하면 1·3 만으로 켜되 켠 뒤 2 영업일을 더 지켜본다.
3. **켠 뒤 감시(Opus, 운영 읽기만):** 2 영업일 동안 processed_ops 오프라인 재전송 0건 · activity_logs 매장 요청 주소 분산이 10-28 이전 수준(하루 1~2개)으로 돌아옴. **재전송이 다시 생기면 그 자리에서 다시 DNS only**(되돌리기 5분)하고 §2-C 조건부 보류 카운트 1.

## 5. 예전 «블럭» 과 화이트리스트 — Irene 질문에 대한 답
- 건물 와이파이가 막는 방식은 두 갈래: **이름(도메인) 분류**(FortiGuard·Zscaler·Symantec·Cisco Talos 같은 보안업체 카테고리) 또는 **IP 평판**. Cloudflare 는 IP 평판 쪽만 가려 주고, 이름으로 막는 곳에는 효과가 없다. 예전 블럭이 어느 쪽이었는지 기록이 없어 **A 를 영구로 할지는 결정하지 않는다**(§4 대로 다시 켠다).
- **화이트리스트는 우리가 못 한다** — 건물 네트워크 관리자(또는 그 건물 ISP) 만 할 수 있다. 우리는 ① 보안업체 4곳에 «비즈니스 소프트웨어» 분류 신청(이미 Irene 할 일 todomvtb7e07) ② 손님에게 줄 «허용 목록» 한 장을 제공한다. 운영서버 IP 는 스팸·차단 목록 4곳 깨끗 · Google 안전 브라우징 위험 없음(Opus 실측).
- **손님 건물 IT 에 줄 허용 목록(그대로 복사해 쓰는 문구):**
  ```
  PurpleHere POS 허용 요청 — 아래를 허용해 주세요.
  도메인: purplehere.com, www.purplehere.com, *.purplehere.com
  서버 주소(직접 연결 시): 87.106.78.146
  포트/프로토콜: TCP 443(HTTPS, WebSocket 포함), TCP 80(HTTPS 로 자동 이동)
  결제·부가: api.stripe.com, ipapi.co (HTTPS 443)
  기기 내부: localhost:8181·8182 (QZ Tray 인쇄, 기기 안에서만 — 방화벽 무관)
  카테고리: Business / SaaS POS (성인·도박·악성 아님)
  ```
  (Cloudflare 를 켠 상태에선 IP 가 Cloudflare 대역이라 **IP 가 아니라 이름으로** 허용해 달라고 요청한다.)
- 어느 건물에서 다시 막히면 **막힌 화면 사진 1장**(차단 문구·업체 이름)을 받는 것이 첫 일이다 — 그래야 신청처가 정해진다.

## 6. 덤 — 요청 횟수 제한 키(apiLimiter)
- 지금: req.ip 기준이라 Cloudflare 를 켜면 매장들이 Cloudflare 주소 하나로 한도를 나눠 쓴다(실측 163/5000, 미발생). DNS only 동안은 자연히 실주소 기준.
- **Fable 권고:** `keyGenerator: (req) => clientIp(req)` 로 바꾸는 것은 맞는 수정이고 작다. **급하지 않으니 이번 일과 묶지 말고 다음 평소 작업 묶음에서** — 보안 경계(§0 ⑤)라 끝나면 Fable 게이트 1회. Irene 이 «하는거야 어쩌라도» 라고 했으니 진행해도 된다고 본다(Fable 권고: 진행).

## 7. Opus 가 할 것 / 하지 않을 것
- 할 것: §3-2 확인(운영 읽기만) · §4-1 명령으로 지점 상태 확인해 켤 때가 되면 보고 · §5 허용 목록 문구를 Irene 보고에 그대로 붙임.
- 하지 않을 것: 코드 변경 · DNS 변경 · 운영 쓰기 · hosts 할 일 재등록 · B/C 착수.
- 검증: 코드 변경 0 이라 verify-all 불필요. Fable 게이트 마커 없음(변경 없음).
