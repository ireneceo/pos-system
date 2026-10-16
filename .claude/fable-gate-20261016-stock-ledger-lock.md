# Fable 게이트 판정 — 재고 장부 동시 쓰기 잠금 (stockLedger.record FOR UPDATE)

- 날짜: 2026-10-16 · 판정: Fable(리더) · 구현: Opus(팀원) · 설계: `.claude/fable-design-20261016-stock-ledger-lock.md` §6 기준
- 운영 접근 0 · 코드 수정 0(판정만) · 시험 쓰기는 데모 매장 38 스크래치만(끝에 전부 삭제 확인)

---

## 0. 판정 한 줄

**✅ PASS (2회차 · 재게이트 뒤) — 1회차에서 잡은 결함 1(데드락 재시도 미동작)이 §4 지시대로 고쳐졐고, 영구 시험 ⑥ 이 반증(고치기 전 실패)과 통과를 함께 보였다. 마커 찍음. 운영 반영: 다음 배포 때.**

### 2회차 재게이트 (같은 날 · §4 범위만)
| 볼 것 | 결과 |
|---|---|
| 4-1 diff | ✅ `deductOnce` catch: `if (!transaction.finished) await transaction.rollback();` + 주석 1줄 · 다음 줄 `if (isDeadlock(error)) throw error;` 그대로. 그 외 추가 변경 0 |
| 4-2 health-check ⑥ | ✅ 시나리오 그대로(재료 A·B 100 · Product.create category=매장 첫 categories.name · T1 30줄 INSERT→B FOR UPDATE · 서비스 시작→700ms→T1 A FOR UPDATE→700ms→rollback). 통과 조건이 엄격: T1 A 잠금 성공(=서비스가 피해자) · success true · deductions 2 · **retries === 1** · 장부 2줄 각 −1→99 · 현재고 99·99 · 사슬 0. 뒷정리 transactions/batches/stock_alerts → products → ingredients LIKE 'ZZ-HC-LEDGER-DL-%' · finally T1 rollback |
| 4-3 반증(Opus) | ✅ 고치기 전 ⑥ 실패 — `{"t1LockA":true,"success":false,"error":"Transaction cannot be rolled back…","deductions":0,"retries":0,"rows":[]}` · inventory 1실패/74 (1회차 내 실측과 같은 모양) |
| 통과(Opus) | 74/74 · print-guard 8/8 · 스크래치 0 |
| **내 재실행** | pm2 restart 뒤 `health-check --category=inventory` **74/74**(③④⑤⑥ 통과) · print-guard **8/8 변경 없음** · 스크래치 재료 0·상품 0(ZZ-HC-LEDGER-%·ZZ-FABLE-% 전수) · 🔒 orders-crud·purchase-orders-workflow·models·config·프론트 diff **0** · `git diff --stat` 8파일(1회차와 같은 집합 — inventoryDeductionService·health-check 줄 수만 늘어남) |
| 마커 | `fable-gate.js pass` — 지문은 이 판정문을 쓴 뒤 찍음 |

1회차 판정(아래 원문 유지 — 기록):

**❌ 불통과(조건부) — 핵심 고침(잠금·정적 UPDATE·풀 고갈)은 설계대로이고 실측으로 증명됐다. 그러나 설계 §2-6/§3 C-5 «데드락 재시도» 가 실제 데드락에서 한 번도 동작하지 않는다(내가 실제 MySQL 데드락을 일으켜 확인). 아래 §4 지시 1건을 고치고 좁은 범위로 재게이트한다. 마커는 찍지 않았다.**

왜 막는가: 잠금을 넣기 전엔 이 경로에서 데드락이 날 수 없었다. 잠금을 넣으면 두 주문이 같은 재료들을 다른 순서로 잠글 때 데드락이 생기고, 설계는 그걸 재시도로 흡수하기로 했다. 재시도가 죽어 있으면 **운영에서 두 주문이 겹칠 때 한쪽 주문의 재고 차감이 조용히 빠진다**(주문은 완료되고 로그만 남음) — 이 변경이 새로 만드는 회귀라 돈·재고 게이트에서 넘길 수 없다.

---

## 1. §6-① diff 범위 대조

| 파일 | 설계 절 | 판정 |
|---|---|---|
| services/stockLedger.js | A | ✅ 그대로(lockTarget·lockAndReadStock·record 교체·applyNewStock 정적 UPDATE+row.set raw·헤더 규칙·export) |
| utils/brandStockAccess.js | B | ✅ 그대로(findOrCreate → 잠금 findOne/create·매장 경로 정적 UPDATE). applySettings 무접촉 |
| services/inventoryDeductionService.js | C | ✅ 1~4 그대로. 5(재시도)는 **코드는 설계 모양이나 실제로 동작 안 함 → §3 결함 1** |
| routes/inventory-core.js | D | ✅ 13·514·842행 세 곳만 |
| routes/inventory-extra.js | E | ✅ 544행만 |
| scripts/health-check.js | G | ✅ ③④⑤ 3건(③ 은 재료를 raw INSERT 로 만들어 장부 2줄로 검사 — 설계 «3줄» 과 등가) |
| scripts/check-sensitive-diff.js | H | ✅ money 패턴 1줄 |
| utils/stockAlerts.js | **설계 밖** | ✅ 수용 — §2-7 «트랜잭션 안에서 트랜잭션 없는 쿼리 0» 의 같은 결함(알림 읽기 2개가 둘째 연결 요구). 쓰기는 이미 transaction 을 받고 있었고 읽기만 더한 것. 호출부 6곳 전부 transaction 을 넘긴다 |
| 🔒 orders-crud.js · purchase-orders-workflow.js · models/ · config/ · dev-frontend | §2-8 | ✅ `git diff` 0 · print-guard 8/8 변경 없음 |

설계와 다른 판단 4건(모두 수용):
1. `OptionIngredient.findAll` 에 transaction — §2-7 같은 모양. 수용.
2. health-check ④⑤ 20초 기한 — 결함이 «정지» 가 아니라 «실패» 로 보이게 하는 것. 수용.
3. 바깥 재시도 루프가 3회 뒤 throw 가 아니라 `{ success:false }` 반환 — 🔒 orders-crud 1850행은 `deductionResult.success` 만 보고 던지는 걸 기대하지 않는다. 설계보다 맞다. 수용.
4. health-check ③ 장부 2줄 기준 — 등가. 수용.

`check-sensitive-diff` 내 실행: ② 돈·주문 무결성 3건(inventoryDeductionService·stockLedger·brandStockAccess) + 안전망 2건 → «FABLE 게이트 대상». H 반증 성립.

## 2. §6-②~⑤ — Opus 숫자와 내 재실행

| 항목 | Opus 보고 | 내 재실행/확인 |
|---|---|---|
| V1 잠금 계약 ③(매장·브랜드 오버레이) | 3/3 통과 · 반증(currentStockOf 복귀) 3/3 실패 | health-check `--category=inventory` **73/73 (27초)** — ③④⑤ 포함 |
| V2 동시 12건 ④ | 3/3 통과 · 반증 3/3 실패(끊김 10~11 · 최종 97~99) | 같은 실행에 포함 ✅ |
| V3 풀 20 ⑤ | 통과 · 반증(transaction 제거) 20초 기한 실패 재현 | 같은 실행에 포함 ✅ |
| V4 ① 재시도 루프 | **확인 불가**(deductOnce 미수출) | **내가 실제 데드락으로 실행 → 결함 발견(§3)** |
| V4 ② 데드락 코드 | `e.original.code === 'ER_LOCK_DEADLOCK'` 확정 | 내 실행에서도 서비스가 피해자(1213) |
| V5 격리수준 | READ COMMITTED 실측 | 설계는 둘 다 안전 — 기록만 |
| V6 verify-all | 22/23(실패 1 = 배포 기록 파일 없음 · 다른 방들과 같은 기존 실패) | print-guard 8/8 · 인스펙션 **LEDGER-002·003·004 ✅**(LEDGER-001 ⚠ 목록·차단 안 함 = 기존) · 신규 실패 0 |
| V7 기존 시험 | 통과 | 73/73 에 포함 |
| ③ 정적 UPDATE | — | ✅ applyNewStock `Model.update({where:{id}})`+`row.set(raw)` · applyStock 매장 경로 `Ingredient.update` · 브랜드 경로는 방금 잠금 읽기한 신선 인스턴스라 `row.update` 안전 |
| ④ 오버레이 잠금 읽기 | — | ✅ lockAndReadStock `lock: transaction.LOCK.UPDATE` · applyStock findOne 도 잠금 |
| ⑤ 배포 안전성 | — | ✅ 마이그 0 · 모델 0 · 프론트 0(SW bump 불필요) · 롤백 = 코드만 |

의미 동일성: 옛 `currentStockOf`(restaurantId 있으면 stockFor: 브랜드→오버레이 또는 0, 아니면 마스터) 와 새 `lockAndReadStock` 은 같은 답을 돌려준다(차이는 «잠근 뒤 신선한 값» 뿐). record 에 넘기는 행은 seller-orders·po-returns·brand-stock-takes 모두 `findByPk(..., { lock })` 전체 속성 인스턴스 — attributes 좁힌 인스턴스를 넘기는 호출부 없음.

## 3. 결함 1 — 데드락 재시도가 동작하지 않는다 (차단)

**실행(코드 변경 0 · 임시 스크립트 · 삭제함):** 데모 38 에 스크래치 재료 A·B(각 100) + 다이렉트 연결 상품 PA→A·PB→B. T1 = 스크래치 30줄 INSERT(무게) 뒤 B `FOR UPDATE`. 서비스 `deductInventoryForOrder(38, [PA, PB])` 시작 → A 잠그고 B 대기. 0.7초 뒤 T1 이 A `FOR UPDATE` → MySQL 데드락, **무게 작은 서비스가 피해자**(T1 은 A 를 받음 = `t1Deadlock:false`). 0.7초 뒤 T1 rollback.

**기대:** 서비스 로그 `[INVENTORY] deadlock, retry 1/3` 1회 → 재시도 성공 → `success:true` · 장부 2줄(A −1→99 · B −1→99).
**실제:** `success:false` · deductions 0 · 장부 0줄 · 재시도 로그 0 · 오류 = `Transaction cannot be rolled back because it has been finished with state: rollback`. 스크래치 정리 0 남음.

**원인(소스로 확정):** Sequelize 6.37.7 `lib/dialects/mysql/query.js` 64~70행 — errno 1213 이면 **Sequelize 가 스스로 `transaction.rollback()` 을 부르고 `finished='rollback'`** 으로 둔 뒤 오류를 던진다. 그 다음 `deductOnce` 의 catch 첫 줄 `await transaction.rollback()` 이 `lib/transaction.js` 58행에서 «cannot be rolled back…» 을 **새로 던져** 데드락 오류를 덮는다 → `isDeadlock(error)` 줄에 닿지 못하고 → 바깥 루프는 일반 오류로 보고 `{ success:false }` 반환. 설계 §3 C-5 의 가짜 deductOnce 시험(V4 ①)이 바로 이걸 잡으라고 둔 것이었다 — «확인 불가» 로 남긴 자리에 결함이 있었다.

관찰(바꾸지 않음): `config/database.js retry.match` 의 `/ER_LOCK_DEADLOCK/`·`/ER_LOCK_WAIT_TIMEOUT/` 은 오류 message(«Deadlock found when trying to get lock…»)에 그 문자열이 없어 **실제로 매치되지 않는 죽은 항목**이다. 매치됐더라도 `sequelize.js` 293행 `checkTransaction()` 이 finished 트랜잭션의 재시도를 막는다. 쿼리 단위 재시도에 기댈 수 없음 — 서비스 재시도가 유일한 길이므로 더더욱 살아 있어야 한다.

## 4. 지시 (Opus — 이것만 · 다른 파일 무접촉)

**4-1. `services/inventoryDeductionService.js` deductOnce catch 1줄:**
```js
} catch (error) {
  // Sequelize mysql 은 데드락(1213)이면 스스로 rollback 하고 finished='rollback' 으로 둔다 — 그 뒤 rollback() 을
  //   다시 부르면 «cannot be rolled back» 이 데드락 오류를 덮어 재시도가 죽는다(2026-10-16 Fable 게이트 실측).
  if (!transaction.finished) await transaction.rollback();
  if (isDeadlock(error)) throw error;
  ...(이하 그대로)
```

**4-2. `scripts/health-check.js` 장부 ⑥ 영구 케이스 1건 추가(카테고리 inventory · 데모만 · 뒷정리 포함) — 위 §3 실행을 그대로 옮긴다:**
- 스크래치: 재료 A·B(ledgerScratch 와 같은 INSERT, 100) · 상품 PA·PB = `M.Product.create({ restaurant_id, name:'ZZ-HC-LEDGER-DL-…', price:1, category:<매장 38 의 categories.name 첫 줄 — FK>, ingredient_id })`.
- T1 = `sequelize.transaction()`: 재료 INSERT 30줄(이름 `ZZ-HC-LEDGER-DL-W…`, current_stock 0, T1 안 → rollback 으로 사라짐) → `SELECT id FROM ingredients WHERE id=B FOR UPDATE`.
- `console.warn` 을 가로채 `[INVENTORY] deadlock, retry` 줄을 센다. `p = deductInventoryForOrder(demoRestId, [{product_id:PA,quantity:1},{product_id:PB,quantity:1}], 'ZZ-HC-LEDGER-DL-ORDER')` 시작(await 없이) → 700ms → T1 에서 A `FOR UPDATE`(성공해야 함 = 서비스가 피해자) → 700ms → `t1.rollback()` → `r = await p`.
- 통과: `r.success === true` · deductions 2 · 장부 A·B 각 1줄(−1 → 99) · 사슬 0 · 재시도 로그 **정확히 1회** · T1 의 A 잠금이 데드락 없이 성공. 뒷정리: inventory_transactions·inventory_batches·stock_alerts(ingredient_id A,B) → products PA·PB → `ingredients WHERE name LIKE 'ZZ-HC-LEDGER-DL-%'`. finally 에서 T1 이 살아 있으면 rollback.
- `demoRaToken/demoRestId` 없으면 기존 관례대로 건너뜀 + true.

**4-3. 반증 1회(필수):** 4-1 의 `if (!transaction.finished)` 를 빼고(= 지금 상태) ⑥ 을 돌려 **실패**하는지 확인 → 원복(cmp) → `pm2 restart dev-backend` → `health-check --category=inventory` 1회 통과 숫자.

**4-4. 보고에 적을 숫자:** ⑥ 통과 1회 + 반증 실패 1회 · inventory 카테고리 N/N · print-guard 8/8 · `git diff --stat` 이 위 두 파일에 더해진 변경만인지.

재게이트 범위(Fable 2회차 — 이 사안 2회 소진이지만 **결함 수정 재검증은 같은 게이트의 연속**으로 본다): 4-1 diff 1줄 대조 · ⑥ 통과/반증 숫자 · inventory 카테고리 · print-guard · 마커.

## 5. 별건 (이 게이트 밖 · 배포 비차단 · 상황판/작업기록에 한 줄)

**서버 연결 풀이 20 이 아니라 5 다(개발·운영 공통 · 2026-09-17 커밋 1e43a29fd 부터 · 운영 배포 커밋 9fcf73eb6 에 포함).** `config/database.js` 4행 `IS_LONG_RUNNING_SERVER` 가 `process.argv[1]` 로 server.js 를 판별하는데, pm2 fork 모드에선 `argv[1]` 이 `/usr/lib/node_modules/pm2/lib/ProcessContainerFork.js` 다(내가 pm2 프로브 프로세스로 실측 뒤 삭제). 즉 그 커밋이 의도한 «서버만 20» 은 한 번도 적용된 적이 없다. 이번 변경과 무관(원인 아님 · 설계가 안 바꾸기로 함)이고, 풀 5 로도 ⑤ 20건 동시가 통과한다. 고칠 땐 **운영 MySQL `max_connections`·`Max_used_connections` 실측 먼저**(09-17 커밋 주석: 개발은 천장 50 · Max_used 51 로 배포가 막혔던 적 있음) → 판별을 `process.env.pm_exec_path` 또는 `require.main.filename` 으로 바꾸는 것은 설정 변경이라 별도 작업·별도 확인. Irene 결정 필요 없음(권고: 다음 정기 점검 때 측정 → 결정).

## 6. 잔재·안전

- 내 시험 스크래치(`ZZ-FABLE-DL-%`) 재료 0 · 상품 0 남음(스크립트 finally 에서 확인·출력). 임시 스크립트 삭제. pm2 프로브 삭제(목록 0).
- Opus 보고의 재료 46 «마지막 장부 stock_after 69 vs 현재고 100» — 이번 시험 전부터의 차이. LEDGER-001(장부 합=현재고) 목록형 경고의 한 줄일 뿐 차단 아님 · 이 변경과 무관. 정리는 데모 자정 초기화/장부 대조 절차의 몫.
