# 자동인쇄 디버깅 히스토리 + 진단 절차 (2026-06-29, thefire01 라이브 대응)

> 하루 종일 thefire01(rid16) 라이브에서 자동인쇄(특히 통합티켓)를 잡은 과정 기록.
> **목적 = 다음에 인쇄문제 만나면 "우회/추측" 없이 이 절차대로 측정→근본수정.**
> 확정 규칙은 `PRINT_RULES_MATRIX.md §8.8`. 이 문서는 **과정·실수·진단법**.

---

## 1. 최종 해결 (배포된 통합수정 — 모든 매장 적용, 매장 분기 없음)

| 버전 | 수정 | 파일 |
|------|------|------|
| 4.40 | MainLayout 폴러에도 하트비트(재무장 중복 방지) | MainLayout.tsx |
| 4.42 | 통합 = 회차당 1번(bi===0만 발행, 나머지 skip) | hybridKitchenPrint.ts |
| 4.44 | **통합 early-stamp 제거** → claim은 발송 직전 ATOMIC만(orphan 근본수정) | hybridKitchenPrint.ts, billPrint.js |
| 4.45 | 추가주문 통합 내용 = 추가품목 전체(kitchenItemsRaw) 합본 1장 | hybridKitchenPrint.ts |

순효과: 신규/추가/이동/취소/머지/아이템취소 **모두 통합 1장 + 스테이션 회차별**, 중복·누락·늦음 0.

---

## 2. 증상 → 근본원인 (시간순)

1. **BAR/KQ 스테이션 중복(2~3장).** 근본 = BAR 첫 인쇄 ~15초가 느려 stale 재무장(10초)이 인쇄 도중 터짐 → 폴러가 같은 걸 또 찍음. 해결 = 인쇄 루프 동안 **하트비트**(4초마다 print_claimed_at 갱신, cap 90초)로 재무장 보류. **세 경로 모두(하이브리드/useAutoPrintPoller/MainLayout 폴러)** 적용해야 함 — 하나라도 빠지면 그 경로가 폭주.
2. **신규 통합은 다이렉트로 나오는데 추가 통합 안 나옴.** 근본 = 통합 claim 레이스. 처음엔 early-stamp(미리 선점)로 하이브리드가 이기게 했더니 → **orphan**(claim만 되고 발송 끊김). 최종 = **early-stamp 제거, 발송 직전 claim**.
3. **테이블이동 통합 N장(회차 수만큼).** 근본 = 통합을 배치(회차)마다 발행. 해결 = `bi===0` 만 발행.
4. **2·3·4번째 추가주문 통합 내용 부족.** 근본 = bi===0 배치가 가장 옛 회차만 → 통합 내용을 `kitchenItemsRaw`(이번에 안 찍힌 전체)로 고정.

---

## 3. 내가 한 잘못된 우회 (다음에 반복 금지)

- ❌ **통합 early-stamp/preStamped** — 빨라 보였지만 orphan 유발(claimed=true·발송 없음). claim은 발송과 한 몸이어야.
- ❌ **stale 재무장 창을 source='pos' 별로 45초로 늘림** — 이동·취소·머지가 **재무장 경유로 인쇄 단말에 전달**되는 구조라 45초씩 지연/누락 → 즉시 되돌림. 창은 10초 유지, 폭주는 하트비트로만.
- ❌ **"QZ 문제"로 떠넘김** — 코드 회귀였음. 1~2주 전 잘 되던 게 깨졌으면 환경 아닌 코드.
- ❌ **추측 배포 반복** — 측정 없이 고치고 롤백. → 아래 진단 절차로 **먼저 측정**.

---

## 4. 🔧 진단 절차 (다음에 인쇄문제 = 이대로. 우회·추측 금지)

### 4-1. 운영 print-trace 로그 (상시 진단 도구 — 백엔드 console, 0 오버헤드)
운영 로그를 보면 각 패스가 정확히 뭘 했는지 측정된다:
```bash
ssh irene@87.106.78.146 "pm2 logs production-backend --lines 80 --nostream 2>/dev/null \
  | grep -iE 'heartbeat|stale-recovery|station-printed|consolidated-claim|CLIENT.*consolidated|Order ID|AUTO-MERGE|ADD-ITEMS' | tail -30"
```
각 로그 의미:
- `Order ID: N` = 주문 생성/머지.
- `heartbeat order=N affected=1` = 그 주문 인쇄 중(하이브리드/폴러 살아있음). **없으면** 그 경로가 옛 코드거나 안 도는 것.
- `stale-recovery re-armed=1` = 재무장 발동(느린 인쇄/끊김). **신규주문마다 뜨면** 하트비트가 안 듣는 것.
- `station-printed order=N station=S changed=true/false` = 스테이션 인쇄 확인. **changed=false 인데 또 뜨면** 이미 찍은 스테이션 재인쇄(중복).
- `consolidated-claim order=N claimed=true/false` = 통합 ATOMIC claim. **claimed=true 인데 뒤에 `CLIENT consolidated` 없으면 = orphan**(claim만·발송 없음).
- `CLIENT type=consolidated order=... ok=true items=K` = 통합 실제 발송됨(클라이언트 보고). items=K 로 내용 검증.

**정상 패턴 1주문:** `Order ID` → station-printed(각 스테이션 changed=true) → `consolidated-claim claimed=true` → `CLIENT consolidated`(1번). 재무장/2번째 claim/orphan 없음.

### 4-2. 기기 버전부터 확정 (라이브 진단의 함정)
동작이 들쭉날쭉하면 **기기 창마다 SW 버전이 섞인 것**. `heartbeat` 가 어떤 주문엔 뜨고 어떤 주문엔 안 뜨면 = 옛 코드 창 존재. 운영 sw.js 는 no-cache·BYPASS 라 닫았다 열면 최신 받음:
```bash
curl -s https://purplehere.com/sw.js | grep SW_VERSION   # 서버가 내보내는 최신
```
기기가 그 버전을 받았는지 = print-trace 에 그 버전의 동작(예: 하트비트)이 일관되게 뜨는지로 판정.

### 4-3. DB 상태 직접 확인 (raw SQL)
```bash
ssh irene@87.106.78.146 "cd /var/www/production-backend && node -e \"const {sequelize}=require('./config/database');(async()=>{const [r]=await sequelize.query('SELECT id,order_number,needs_print,print_claimed_at,consolidated_printed_at FROM orders WHERE id=N');console.log(JSON.stringify(r));process.exit(0)})()\""
```

### 4-4. 순서 (절대 준수)
1. **측정** (4-1~4-3) — 어느 경로가/언제/win·lose·orphan 인지 **확정**.
2. **기기 버전 확정** (4-2) — 코드 문제인지 버전 섞임인지 분리.
3. **근본수정** — 측정으로 확정된 원인만. 추측 변경·임시 우회 금지([[feedback_always_canonical_no_stopgap]]).
4. **백엔드 우선** — 서버만 고치면 기기 업데이트 안 기다리고 즉시 적용(가능하면).
5. **빌드+배포+실프린터 1회 확인** → `check-print-guard.js --bless`.

---

## 5. 임시 진단 코드 (상시 유지 = 다음 진단 도구)
아래는 오늘 넣은 진단 로그 — **유지**(0~저오버헤드, 다음 인쇄문제 때 4-1 로 바로 측정):
- `orders-crud.js` /print-heartbeat, /print-debug 엔드포인트 + stale-recovery·station-printed 로그.
- `consolidated-print.js` consolidated-claim 로그.
- `billPrint.js` sendUnifiedTickets `_rep`(CLIENT consolidated 보고).

부담되면 제거 가능하나, Irene "다음에 제대로 파악하게 조치" 요청에 따라 **진단 도구로 보존** 권장.
