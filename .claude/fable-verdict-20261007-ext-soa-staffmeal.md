# Fable 판정 원문 (2026-10-07) — 10-04 잔여 3건: 외부 공급업체 월별 정산서(SOA) · 발주 «직원식» 구분 · 승인 메일 문구

> 팀원은 Ⅰ 을 **가공 없이** Irene 에게 전달하고, Ⅱ 를 구현 지시로 쓴다.
> 이 사안의 Fable 호출: 이번(설계 1회) + 구현 뒤 게이트 1회(A·B 를 같이 내면 1회, 따로 내면 각 1회). 구현 중 세부 질문은 팀원이 정하고 결과에 붙인다.
> 입력: `.claude/fable-input-20261007-ext-soa-staffmeal.md` (팀원 실측). 내가 코드로 보탠 사실은 각 절 «실측 보탬» 에 적었다.

---

## Ⅰ. Irene 에게 올리는 보고문

### 0. 한 줄 결론 (셋)
- **A 외부 공급업체 월별 정산서** — 됩니다. 새 표 없이, 지금 브랜드 월결제가 쓰는 길을 그대로 씁니다. 외부 업체 수정 창에 «청구 방식: 건별 / 월별 정산서» 한 칸을 켜면, 매달 정한 날에 그 업체의 그달 청구서가 **정산서 한 장**으로 묶여 뜹니다. 공급업체가 보낸 SOA(파일·번호·총액)를 그 정산서에 붙이면 **우리 합계와의 차이(±)** 가 보이고, «이 총액으로 확정» 한 번·«결제함» 한 번으로 그달 주문·청구서가 전부 결제됨으로 정리됩니다.
- **B 발주 «직원식» 구분** — 됩니다. 발주 품목마다 손으로 표시하는 게 아니라, **재료 분류(카테고리)에 «직원식» 표시**를 하나 두고 그 분류의 재료가 발주에 실리면 자동으로 «직원식» 배지와 «직원식 RM X · 일반 RM Y» 합계가 붙습니다. 재고는 **직원식 전용 재료만 따로 줄**(지금 with MIN 이 이미 하는 방식)로 두고, 손님 것과 섞어 쓰는 재료는 나누지 않습니다. 직원식 전용 재료의 «사용 기록»(재고를 줄이는 입력)은 2단계로 둡니다.
- **C 승인 메일 문구** — 팀원 수정 **적합·통과**. 외부 업체엔 «보냈습니다» 대신 «아직 보내지 않았습니다 — WhatsApp·PDF·이메일로 보내 주세요». 코드 판정은 화면과 같은 단일 소스를 씁니다.

### 1. 왜 Fable 이 보는 사안인가
- A: 돈(결제 기록·금고 출금·발주 결제 상태)에 닿고, «정산서를 누가 만드나 / 건별 결제를 막나 / 차액을 어디에 적나» 길이 갈립니다.
- B: 운영 매장 10 의 재료 분류를 바꾸고(되돌리기 가능하지만 운영 데이터), «표시를 어디에 두나(발주 줄 / 재료 / 분류)»·«재고를 나누나» 길이 갈립니다.
- C: 판단 개입 없는 문구 분기 — 팀원이 먼저 한 것이 맞고, 여기서는 **검토만** 했습니다.

### 2. A — 외부 공급업체 월별 정산서(SOA)

**Irene 원문 (10-04)**: 「외부공급업체 중에 1달 기준으로 SOA 보내는 곳이 있어. 이것도 정리한 후 SOA 결제 인보이스 뜨게 하고 최종 받은 SOA랑 대조해서 결제정리할 수 있게 해줄 수 있어?」

| Irene 말씀 | 뜻 | 판정 |
|---|---|---|
| 「1달 기준으로 SOA 보내는 곳이 있어」 | 그 업체는 건별이 아니라 **월별**로 낸다 | ✅ 외부 업체마다 «청구 방식» 을 둔다(건별 / 월별 정산서 + 발행일 + 결제 마감일) |
| 「SOA 결제 인보이스 뜨게 하고」 | 그달 청구서를 묶은 **정산서 한 장**이 청구서 화면에 떠야 한다 | ✅ 매달 발행일에 자동으로 뜬다(브랜드 정산서와 같은 보라 배지) + «지금 만들기» 버튼 |
| 「최종 받은 SOA랑 대조해서」 | 공급업체가 보낸 SOA 가 원본, 우리 것은 추정 — **차이를 보고 맞춘다** | ✅ 정산서에 공급업체 SOA 파일·번호·총액 붙임 → 차이 ± 표시 → «이 총액으로 확정»(차액 한 줄). 건별 차이는 그 청구서의 «총액 수정»(10-07 에 만든 것)으로 — 정산서 총액이 따라간다 |
| 「결제정리할 수 있게」 | 돈은 밖에서 냈고 여기선 **체크만** — 한 번에 | ✅ 정산서 «결제함» 한 번 → 묶인 청구서·발주 전부 결제됨, 현금이면 금고 출금 기록 |

**실측이 정한 것 (팀원 실측 + 내가 보탠 것)**
- 정산서 자동 발행기(`soaScheduler`)는 **외부 업체 계약도 이미 탑니다**(가입 여부를 안 봄). 막혀 있던 건 두 곳뿐 — ①외부 업체 계약에 «청구 방식» 을 적을 **화면·칸이 없음**(계약 조건은 공급업체 쪽 화면에서만 적게 돼 있음) ②«월결제인가» 판정 함수(`utils/payViaSoa`)가 **외부면 무조건 아니오**. 그래서 새 구조가 아니라 **문 두 개를 여는 일**입니다.
- 내가 보탠 결함 2개: ③외부 정산서가 떠도 «결제함» 버튼 부품(`ExternalInvoicePayAction`)이 **연결 발주가 없으면 버튼을 안 그립니다**(정산서는 발주가 없음) → 정산서 가지를 추가해야 합니다. ④«결제함» 서버 길(`mark-paid-external`)은 발주 없는 청구서를 **그 한 장만** 결제됨으로 적고 묶인 청구서·발주엔 손대지 않습니다 → 정산서면 자식까지 함께 적어야 합니다.
- 정산서 총액은 **만들 때 고정**됩니다(설계 원문 «생성 시점 lock»). 묶인 뒤 청구서 하나의 총액을 고치면 정산서가 옛 숫자로 남습니다 → **미결제 정산서는 자식을 따라가게** 바꿉니다(결제된 정산서는 안 건드림).
- 운영: 외부 업체 24곳, 외부 발행 청구서 결제완료 38 · 미결제 9 · 정산서 0. **어느 업체가 월별인지는 데이터에 없습니다** — Irene 만 압니다. 배포 뒤 Irene 이 업체 수정 창에서 켜는 것이 유일한 길입니다.

**결정 — 갈림마다**
1. **«월별» 표시는 어디에** → 그 업체와 매장 사이 **계약 조건(기존 칸)** 에. 새 표·새 칸 0. 외부 업체는 사는 매장이 하나뿐이라 «업체 = 계약» 이고, 자동 발행기·월결제 판정이 **이미 그 칸을 읽습니다**. 업체 수정 창에 «청구 방식(건별 / 월별 정산서)» · 월별이면 «정산서 발행일(매월 N일, 기본 1일)» · «결제 마감일(매월 N일, 기본 15일)» 세 칸.
2. **정산서를 누가 만드나** → **시스템이 자동**(발행일마다) **+ «지금 만들기»**(공급업체 SOA 가 먼저 와서 바로 맞추고 싶을 때). 공급업체가 보낸 SOA 를 «올려서 그걸로 정산서를 만드는» 길은 **안 만듭니다** — 우리 정산서는 우리 주문 기록의 합이어야 대조가 성립합니다(둘을 같은 걸로 만들면 비교할 게 없어짐).
3. **대조 = 두 겹.** ①건별: 정산서 상세의 청구서 표에서 줄마다 «총액 수정»(§8-7 부품 그대로) → 정산서 합계가 따라감. ②정산서 단위: 그래도 남는 차이(옛 잔액·할인·누락)는 «공급업체 SOA 총액으로 확정» → 정산서에 «공급업체 명세 차액» 한 줄, 낼 금액 = 공급업체 SOA 총액. 수정 이력은 청구서와 같은 칸·같은 모양(누가·언제·얼마→얼마).
4. **결제 = 정산서에서 «결제함» 한 번.** 묶인 청구서 전부 결제됨 + 그 발주 전부 결제됨(발주 결제와 같은 함수 — 이중 결제 409·금고 출금·결제일 입력 전부 재사용). 현금이면 발주마다 한 줄씩 금고 출금(지금 발주 결제와 같은 모양), 정산서 차액이 있으면 차액 한 줄 더. 이체·카드면 금고 무접촉.
5. **월별 업체는 건별 «결제함» 을 막습니다**(화면 숨김 + 서버 400) — 브랜드 월결제와 **같은 규칙**(「월 결제 설정한 고객은 … SOA에만 토탈 결제」). 받으면서 지불도 같이 막힙니다. 예외를 두면 건별로 낸 것이 정산서에서 빠져 «SOA 는 냈는데 발주 미결제» 가 다시 생깁니다. 월별이 아닌 외부 업체는 **지금과 똑같습니다**.
6. **과거 소급 없음.** 켜는 날 이후 첫 발행일부터. 단, 켜기 전의 **아직 안 낸** 청구서는 첫 정산서에 같이 실립니다(이미 낸 것은 안 실림 — 정산서는 «아직 안 낸 것의 묶음»). 운영 미결제 9장이 여기 해당합니다.
7. **마감일** — 월별 외부 업체의 건별 청구서 마감일은 **비운 채 그대로**(09-10 판정 유지), 마감일은 정산서에만 붙습니다.
8. **가입 공급업체·브랜드·푸드코트는 0 변경.** 그쪽은 판매자가 조건을 정하고 판매자가 정산서를 냅니다 — 구매자가 만드는 «지금 만들기» 는 **외부 업체에만** 엽니다.

**Irene 이 보게 되는 화면**
- 공급업체 디렉터리 → 외부 업체 수정 창: «청구 방식» 선택 + 월별이면 발행일·마감일. 저장하면 끝.
- 매장 청구서 화면: 발행일에 «SOA-63-2026-10-…» 보라 배지 정산서 한 장. 그달 건별 청구서들은 «Pay via SOA» 로만 보이고 버튼 없음. 정산서 상세: 묶인 청구서 표(줄마다 «총액 수정») · «공급업체 SOA 붙이기»(파일·번호·날짜·총액) · «우리 합계 RM X → 공급업체 SOA RM Y = ±Z» · «이 총액으로 확정» · «결제함»(결제수단·결제일·메모) · 수정 이력. 「정산서 지금 만들기」 버튼(월별 외부 업체 고르기).
- 오너·브랜드·푸드코트 청구서 화면도 같은 규칙(건별 버튼 숨김·정산서 «결제함»).

### 3. B — 발주 «직원식» 구분 + 재고

**Irene 원문 (10-04)**: 「발주할 때 스탭밀인 것도 항목에 표시할 수 있어? 스탭주문인지 실 비용인지 모르는데. 스탭밀은 재고관리도 따로 해야 하잖아. 안그래? 이거 재고아이템도 스탭밀을 따로 연결해야 할까?」

**실측이 정한 것**
- with MIN(매장 10)은 **이미 «직원식 전용 재료 줄» 12개**로 운영 중입니다(이름에 «(직원식)/Staff»). 전부 레시피 사용 0 — 즉 손님 메뉴에 안 들어가는 **직원용 식재료**(달·커민·카레가루·직원용 쌀·닭 등)입니다. 그중 «Staff Meal» 분류에 든 건 4개, 8개는 다른 분류(야채·육류 등)에 흩어져 있어 **보고서로 못 묶습니다**.
- 발주 줄엔 «용도» 칸이 없고, 구매 비용 보고서엔 분류 축이 없습니다. 재고는 매장×재료 한 줄, 창고·위치 개념 없음.
- POS 의 «스탭밀 결제»(매장 5·13·16·25 사용) 는 이미 매출에서 빠지고 레시피대로 재고를 깎습니다 — **그쪽은 손댈 게 없습니다**.
- «재고추적 끄기» 는 09-01 에 폐기된 스위치입니다(끄면 차감·입고가 건너뛰어 사고) — 직원식 재료를 «안 세는 재료» 로 만드는 길은 **못 씁니다**.

**Irene 질문 2개에 답**
- ①「발주할 때 표시할 수 있어?」 → **예, 자동으로.** 발주 줄마다 손으로 고르는 게 아니라 **재료 분류에 «직원식» 표시** 를 두고, 그 분류 재료가 발주에 실리면 «직원식» 배지 + 발주 머리에 «직원식 RM X · 일반 RM Y» 가 붙습니다. 담기 화면·발주 목록·상세·수령 창·발주서 전부.
- ②「재고아이템도 따로 연결해야 할까?」 → **지금처럼 «직원식 전용 재료는 따로 줄» 이면 충분합니다. 새 연결은 안 만듭니다.** 손님 것과 섞어 쓰는 재료(쌀·계란)는 나누지 않습니다 — 그 구매는 «실 비용» 이고, 직원이 먹은 만큼은 POS 스탭밀 주문이 레시피로 깎습니다(이미 됨). 직원식 전용 재료는 분류만 «Staff Meal» 로 모으면 재고도 비용도 따로 보입니다.

**결정 — 갈림마다**
1. **표시 축 = 재료 분류(카테고리)의 «직원식(비용)» 표시 1칸.** 발주 줄 칸은 **기각**(매번 손, 수령하면 같은 재료 줄로 들어가 재고와 안 맞음, 발주에만 있는 새 개념). 재료 1건마다 표시도 **기각**(분류가 이미 그 역할 — 분류 하나 체크로 재료 전부 따라옴). 같은 매장에 «직원식» 분류가 여러 개여도 됩니다.
2. **재고 = 따로 줄은 «직원식 전용» 만.** 재고추적 끄기 ✗. 전용 재료는 사 오면 재고가 쌓이고 깎는 길이 없으니, **«직원식 사용» 입력**(폐기 입력과 같은 창, 거래 종류 «직원식») 을 **2단계**로 둡니다. 1단계에서는 재고 실사로 맞추는 지금 방식 그대로.
3. **비용 보고** — 구매 비용 보고서에 «직원식 / 일반» 나눔(요약 2칸 + 월별 열). 발주 목록·상세 머리에 «직원식 포함 RM X».
4. **POS 스탭밀 주문·일일 스탭밀 정산 = 0 변경.**
5. **운영 데이터 정리 1회(배포 뒤·Irene 승인 뒤)** — 매장 10 의 직원식 재료 중 «Staff Meal» 밖의 8개를 그 분류로 옮김(드라이런 → 목록 보여 드림 → apply, undo 있음). 코드로 «이름에 직원식이 들어가면 직원식» 으로 **자동 판정하지 않습니다** — 이름은 표시용이지 분류가 아닙니다.

**Irene 이 보게 되는 화면**
- 재료 → 카테고리 탭: 분류마다 «직원식(비용) 분류» 체크 하나. «Staff Meal» 은 배포 때 자동으로 켜 둠(이름이 Staff Meal/직원식/스탭밀인 매장 소유 분류).
- 발주 담기·목록·상세·수령·발주서: 줄에 «직원식» 회색 배지, 머리에 «직원식 RM X · 일반 RM Y».
- 구매 비용 보고서: 맨 위 «직원식 비용 / 일반 구매» 두 칸, 월별 표에 «직원식» 열.

### 4. C — 승인 메일 문구 (팀원 수정 검토 결과)
- **적합.** 판정은 화면(`justApprovedExternal`)과 같은 단일 소스 `isExternalSeller` 를 쓰고, 외부일 때만 키를 갈아 끼우며(`*External`), 가입 판매자·브랜드 문구는 0 변경. 4언어 키 추가만, 기존 키 삭제·수정 없음. 발송 가로채기 24/24 · 고장주입(판정 끄면 8건 실패) · health-check 306/306 · print-guard 8/8 — 검증 모양이 맞습니다.
- 다듬을 것 없음. 다음 배포 묶음에 그대로 실어도 됩니다.

### 5. 게이트 마커 (사실)
- 작업트리의 민감 변경은 **앞 방(결제 설정 = 계정 하나)** 것뿐이고 그건 이미 커밋돼 있어 2회차 PASS 뒤 내용이 안 바뀌었습니다. 마커가 죽은 이유는 C 문구 수정(비대상)과 문서·판정 파일이 지문에 더해져서입니다. **C 를 검토한 이 판정으로 마커를 다시 찍습니다**(note 에 사유). ⚠ 작업기록(session-state.md) 외 파일을 하나라도 바꾸면 다시 죽습니다 — 문서 반영(TRADE_STRUCTURE 등)은 A·B 구현 착수 때 코드와 같이 하고 그 게이트에서 다시 받습니다.

### 6. Irene 컨펌 요청 (각각 Fable 권고 첨부 — «그대로» 면 한마디로 충분)
1. **A 모양** — 외부 업체 계약 조건에 «월별 정산서» 켜기 → 자동 정산서(+지금 만들기) → 공급업체 SOA 붙여 차이 확정 → «결제함» 한 번. **권고: 이대로.** 새 표 0, 브랜드 월결제와 같은 길.
2. **A-5 월별 업체는 건별 «결제함» 막기** — **권고: 막는다**(브랜드와 같은 규칙). 대안 «허용» 은 건별로 낸 것이 정산서에서 빠져 «냈는데 미결제» 가 재발하는 길이라 권하지 않습니다.
3. **어느 외부 업체가 월별인지는 배포 뒤 Irene 이 업체 수정 창에서 켭니다** — 코드·데이터로는 못 정합니다. **권고: 그렇게.** 운영 발주 많은 순 참고: TaiYangFresh(#63) · Guan Kee Poultry(#67) · Lee's Fandbee Frozen(#60) · LSH(#73) · Valley Fresh Salad(#44). (같은 이름 두 줄 — TaiYangFresh #63/#45, LSH #73/#48, New Seoul Mart #76/#28 — 은 매장별 등록이라 각각 켜야 합니다.)
4. **B 표시 축 = 재료 분류의 «직원식» 표시** (발주 줄 칸 아님) — **권고: 이대로.**
5. **B 매장 10 재료 8개 → «Staff Meal» 분류 이동**(배포 뒤·목록 보고 승인·undo 있음) — **권고: 예.**
6. **B 2단계 «직원식 사용» 입력을 지금 같이 할지** — **권고: 1단계만 먼저.** 1단계 뒤 with MIN 이 직원식 재료 재고를 «세고 싶다» 하시면 그때 작은 묶음(거래 종류 1개 + 입력 창 1개)으로.
7. **순서** — **권고: A 먼저(돈·결제 정리) → B.** 서로 독립이라 따로 배포 가능. 둘 다 Irene `/배포` 때만.

---

## Ⅱ. 팀원 실행 지시 (구현 범위 · 순서 고정 · 이 범위 밖 0줄)

### A. 외부 공급업체 월별 정산서

**A0. 문서 먼저** — `docs/TRADE_STRUCTURE.md` 접수 목록 뒤에 «⑩ 외부 공급업체 월별 정산서(2026-10-07 Fable)» 절: 조건은 계약 `payment_terms`(기존 칸, 구매자가 적음) · 정산서는 시스템 자동+구매자 수동 · 대조 두 겹(건별 §8-7 / 정산서 차액 줄) · 결제는 정산서 «결제함» 한 번 · 월별이면 건별 결제 차단. `docs/INVOICE_SYSTEM.md` §11 뒤 «11-2 외부 공급업체 정산서» 요약 + `docs/PURCHASE_ORDER_SYSTEM.md` §5 아래 한 줄 참조.

**A1. 조건 저장 (새 칸 0)** — `routes/supplier-directory.js`
- `POST /external-suppliers` · `PUT /external-suppliers/:id` 가 `billing: { invoice_cycle, soa_issue_day, payment_due_day }` 를 받는다. `invoice_cycle` 은 **이미 선언된** `VALID_INVOICE_CYCLES`(:122, 지금 미사용) 로 검사. `soa_issue_day`·`payment_due_day` 1~28 정수, 없으면 각각 1·15. 저장처 = **그 구매자의 active `SupplierContract.payment_terms`** 에 merge(`{ invoice_cycle, soa_issue_day, payment_due_day, set_by:'buyer' }` — `terms`(NET_x) 키는 외부에 **쓰지 않는다**: 09-10 판정 «합의 없는 NET 은 지어낸 값»). `immediate` 로 바꾸면 `invoice_cycle:'immediate'` 로 덮는다(키 삭제 아님 — 이력 추적).
- GET(외부 업체 목록·상세·카탈로그 응답)에 `billing`(그 구매자 계약의 payment_terms 요약) 동봉. 계약이 없으면 null.
- 오너가 등록한 업체(`registered_by_entity_type='owner'`) 는 소유 매장 계약이 여럿일 수 있다 — PUT 이 닿는 계약 범위를 DELETE(:1137~) 와 **같은 where** 로 잡는다. 오너 계약 구조는 [[reference_owner_supplier_inheritance]] 로 실측 뒤 결정해 결과에 붙인다.

**A2. 월결제 판정 단일 소스** — `utils/payViaSoa.js monthlySoaTermsFor`
- L24-25 의 `if (!sc || !sc.is_system_registered) return null;` → `if (!sc) return null;` 로. 머리 주석(«외부는 SOA 도 게이트웨이도 없고») 을 «외부도 계약 조건이 monthly_soa 면 정산서로만 낸다(2026-10-07)» 로 고친다.
- 따라오는 효과(코드 추가 없이 확인만): 목록 `pay_via_soa`/`payViaSoa` 가 외부 월별 자식에 true · `recordPayment` 가 발주 Pay·receive-and-pay 에 `PAY_VIA_SOA` 400 · 결제 라우트 `blockPayViaSoa`.
- **추가 1곳**: `routes/invoices-payment.js mark-paid-external` — 외부 판정 뒤에 `if (invoice.invoice_category !== 'soa' && await blockPayViaSoa(invoice, res)) return;` (정산서 자신은 통과). 메시지는 기존 `pay_via_soa` 그대로.
- `services/purchaseOrderService.js isExternalSupplierWithoutTerms`(:172 근처) — 조건이 `payment_terms` 유무면 월별을 켠 순간 자식 청구서에 마감일이 붙는다. **외부 + monthly_soa → due_date null 유지**로 보강(정산서 마감일이 기준). 실측 뒤 고친다.
- 수령 창(`ReceivePayModal`)·발주 상세 Pay: 브랜드 월결제 때 지불 칸을 숨기는 조건이 이미 있으면 재사용(`pay_via_soa` 신호), 없으면 서버 400 메시지가 사람 말로 보이는지만 확인.

**A3. 정산서 발행**
- 자동: `services/soaScheduler.js processMonthlySoa` 공급업체 가지 — **무변경**(외부도 이미 탄다). 확인만: `computePayerForBuyer`·`issuedBy`(외부 업체 `owner_id` 없으면 폴백 1 — 그대로 둔다, NOT NULL 채움용) · `issueMissingTradeInvoices` 는 brand/foodcourt 만 — 외부는 수령 때 청구서가 나므로 **필요 없다**(수령 전 발주는 청구 대상 아님).
- 메일: `utils/notificationTemplates.js monthlySoaEmail` 에 `isExternal` 인자 → 제목·본문 한 줄 «이 명세는 주문 기록으로 자동 작성됐습니다. 공급업체가 보낸 SOA 와 대조하세요»(4언어 키 추가, 기존 키 무변경). 호출부(`issueSoaForPair`)가 `issuerType==='supplier'` 면 `isExternalIssuer` 로 판정.
- 수동: `generateSoaNow` 에 `issuerType:'supplier'` 가지 — **외부(is_system_registered=0)만**, 계약은 `(supplier_company_id, entity_type, entity_id, active)` 로 찾고 `payment_terms.invoice_cycle==='monthly_soa'` 아니면 `bad_terms`. 기간·발행일·번호 규칙은 브랜드 가지와 같게(번호 `SOA-${supplierId}-R${restaurantId}-M${stamp}`). 라우트 `POST /api/purchase-invoices/soa/external/:supplierCompanyId/issue`(buyerScope · body `{period_start?, period_end?}`) — 가입 공급업체면 403 `NOT_EXTERNAL`.

**A4. 결제 한 번** — `routes/invoices-payment.js mark-paid-external` 정산서 가지 (`invoice.invoice_category==='soa'` && 외부 발행자)
- 한 트랜잭션: ①자식 = `parent_soa_invoice_id = soa.id` 전부(이미 paid 인 자식은 건너뛰고 응답 `skipped` 에 적음) ②자식마다 연결 발주(`trade_invoice_id`) 있으면 `recordPayment(po, {method, userId, reason:'SOA <번호>', paidAt}, t)` — 기존 가드(ALREADY_PAID 409·금고 출금·payable 금액) 그대로. **`recordPayment` 의 `PAY_VIA_SOA` 검사는 «정산서 결제 중» 임을 알려 건너뛰게** 옵션 하나(`{ viaSoa: true }`) 추가 — 그 옵션은 이 가지만 넘긴다. ③정산서 차액(= 정산서 총액 − Σ자식 총액, 즉 «Supplier statement difference» 줄)이 0 이 아니고 현금이면 `CashMovement{type:'out', amount:|diff| 부호 따라 in/out, source:'purchase_order', purchase_order_id:null, reason:'SOA <번호> — supplier statement difference'}` 한 줄(열린 시프트 없으면 `drawerSkipped`). ④`syncSoaChildren(soa,'paid',{transaction, actorId})` ⑤정산서 `status:'paid', paid_amount:total_amount, paid_at, payment_method, payment_provider:'external', payment_notes, confirmed_by/at`. 커밋 뒤 `handleInvoicePaid(soa.id)`(발주 거울 멱등).
- 정산서가 이미 paid → 409 `ALREADY_PAID`. 응답: `{ success, data: soa, paid_children, paid_purchase_orders, cash_movement_ids, drawerSkipped, skipped }`.

**A5. 대조** — 새 라우트 `POST /api/invoices/:id/soa-reconcile` (`authenticateToken` + `checkPaymentPermission`)
- 대상: `invoice_category='soa'` · 외부 발행자 · status ∉ paid/cancelled. 아니면 400(`NOT_SOA` / `NOT_EXTERNAL` / `SOA_LOCKED`).
- body `{ document: { url('/uploads/' 시작 필수 — `upload-invoice` 와 같은 검사), filename, number, date, total }, note }`.
- 저장: `invoices` 에 **새 칸 1개** `external_document JSON NULL`(`{url, filename, number, date, total, uploaded_at, uploaded_by}`) — `sync-database` 로 추가, ENUM 없음, 마이그 스크립트 불필요. 거래 청구서는 이 칸을 **쓰지 않는다**(그쪽 원본은 발주 `external_invoice_*`).
- `total` 이 있으면: 차액 = `total − (Σ자식 total_amount + 기존 charges 중 차액 줄 제외)` → `additional_charges` 의 `{name:'Supplier statement difference', amount}` 줄을 **교체**(없으면 추가, 0 이면 제거) → `finalizeInvoice(soa.id)` → 총액이 바뀌었으면 `modification_history` 한 줄(`source:'soa_reconcile'`, 사유 «Supplier SOA <번호> · total only · 메모», 이름 `req.user.full_name`) + `is_modified`. `total` 없으면 파일·번호·날짜만 저장.
- **자식 → 정산서 따라가기**: `services/reconcileInvoiceSync.js` ⑥ 뒤에 — 자식 `parent_soa_invoice_id` 가 있고 그 정산서가 soa·미결제·미취소면 `subtotal = Σ children.total_amount`, 차액 줄 유지, `finalizeInvoice(parent)`, 이력 한 줄(`source:'soa_child_sync'`, «child <번호> total from→to»). 결제된 정산서면 무접촉 + 응답 `soa_locked:true`(화면 안내 «정산서는 이미 결제돼 따라가지 않습니다»).
- 정산서 취소(기존 PATCH status cancelled) 때 `external_document` 는 **지우지 않는다**(기록).

**A6. 화면** (코드 전부 확정 → `i18n:verify` → SW bump → `build:dev` 1회 → `verify-all --full` 1회)
- `SupplierDirectoryPage.tsx` 외부 업체 추가·수정 창(:342~, :505~): «청구 방식» `SelectComponents`(건별 청구 / 월별 정산서) · 월별일 때만 «정산서 발행일(매월)» «결제 마감일(매월)» 숫자 1~28. 목록 카드에 «월별 정산서 · 매월 N일» 한 줄.
- `components/Invoices/ExternalInvoicePayAction.tsx`: `invoice.invoiceCategory==='soa'` 가지 — 발주 없이 동작(지금은 «No linked purchase order» 로 끝남). 창: 정산서 번호·기간·«묶인 주문 N건»·낼 금액 = 정산서 총액·결제수단·결제일·메모 → 같은 `mark-paid-external`. 응답의 `drawerSkipped`·`skipped` 를 사람 말로.
- `pages/Restaurant/InvoicesPage.tsx` 정산서 상세 창(외부 발행일 때만): ⓐ묶인 청구서 표 줄마다 `SupplierInvoiceTotalFix`(`canFixSupplierInvoiceTotal` 그대로 — 자식은 trade+발주+외부라 이미 통과) ⓑ«공급업체 SOA 붙이기» — `/api/upload/files` 재사용 + 번호·날짜(`DateField`)·총액 ⓒ갭 줄 «우리 합계 → 공급업체 SOA = ±» (`utils/reconcileGap` 재사용, 색 규칙 동일) ⓓ«이 총액으로 확정» → `soa-reconcile` ⓔ`InvoiceModificationHistory` ⓕ붙인 파일 «보기». 결제된 정산서는 ⓑⓒⓓ 숨김·ⓕ만.
- «정산서 지금 만들기»: 매장 Invoices 화면 상단(기존 정산서 묶음 영역 옆) 버튼 → 월별 외부 업체 목록(A1 GET 의 `billing.invoice_cycle==='monthly_soa'`) 고르고 기간(기본 지난달) → A3 라우트. 위치·문구는 팀원 재량(결과에 첨부).
- `Owner/OwnerInvoicesPage.tsx`(:1042·:1181) · `BrandGeneral/BrandInvoicesPage.tsx`(:1374) · `FoodcourtGeneral/FoodcourtInvoicesPage.tsx`(:1401): 건별 Pay/«결제함» 조건에 `!parentSoaInvoiceId && !payViaSoa` 추가 + RA 와 같은 «Pay via SOA» 11px 한 줄. 오너 정산서 행·상세의 «결제함» 은 위 부품 가지로 저절로 동작. 목록 API 가 세 화면에 `pay_via_soa` 를 내려주는지 실측(`invoices-list.js` `payViaSoaMemo`) — 안 내려주면 같은 메모 함수로 붙인다.

**A7. 검증 (팀원 실행 · 게이트 2회차에 원문 첨부)**
- health-check `external-soa` 계약 6건(데모 38 + 외부 업체 1곳 심기, orphan sweep 멱등): ①PUT billing monthly → GET 반영 ②월별 자식 `mark-paid-external` 400 `pay_via_soa` · 발주 Pay 400 `PAY_VIA_SOA` ③`generateSoaNow`(supplier·외부) → 정산서 1장 · 자식 `parent_soa_invoice_id` · 가입 공급업체 403 ④`soa-reconcile` total → 차액 줄·총액=공급업체 총액·이력 1줄 · 같은 값 재저장 이력 0 ⑤자식 §8-7 총액 수정 → 정산서 총액 따라감 · 결제된 정산서는 `soa_locked` ⑥정산서 `mark-paid-external`(cash) → 자식 전부 paid · 발주 전부 paid · 금고 출금 N줄(+차액 1줄) · 두 번째 409.
- 고장주입 3: A2 조건 되돌리면 ②가 실패 / A5 자식→정산서 동기화 빼면 ⑤ 실패 / A4 syncSoaChildren 빼면 ⑥ 실패.
- 회귀: 기존 health-check 전부 · `invoice-soa` 인스펙션 I-SOA-001 0 · print-guard 8/8 · 브랜드 월결제 시나리오 무변경 증명(기존 soa 계약 테스트 재실행).

**A8. 배포 뒤 운영 일 (Irene `/배포` + 지시 뒤에만)** — 코드 없음. Irene 이 업체 수정 창에서 월별 업체를 켠다. 팀원은 다음 발행일 뒤 `SchedulerRun monthly_soa` 결과(처리/성공/건너뜀)만 보고.

### B. 발주 «직원식» 구분

**B0. 문서 먼저** — `docs/TRADE_STRUCTURE.md` «⑪ 직원식 재료(2026-10-07 Fable)» 절: 표시 축 = `ingredient_categories.is_staff_meal` 1칸(매장 소유 분류만) · 발주 줄·보고서는 파생(칸 없음) · 재고는 전용 재료만 따로 줄 · 사용 기록은 2단계 · POS 스탭밀 0 변경. §2-4 «상품 종류» 와 혼동 금지 한 줄.

**B1. 그릇 — 칸 1개 + 마이그 1개**
- `models/IngredientCategory.js` `is_staff_meal: { type: BOOLEAN, allowNull:false, defaultValue:false, comment:'직원식(비용) 분류 — 이 분류 재료의 발주는 직원식 비용으로 집계. 매장 소유 분류만 뜻 있음' }`. `sync-database` 로 추가.
- `scripts/migrate-staff-meal-category-flag.js`(registry `deploy`, 멱등): `owner_type='restaurant' AND is_staff_meal=0 AND LOWER(REPLACE(name,' ','')) IN ('staffmeal','staffmeals','직원식','스탭밀','스텝밀')` → 1. 출력: 바뀐 행 id·매장·이름. 두 번째 실행 0건.
- `routes/ingredient-categories.js` 매장 POST(:364)·PUT(:420) 에 `is_staff_meal` 수용(boolean 강제), 매장 GET 응답(`own_categories`)에 포함. 브랜드 라우트는 무변경(쓰기 403 유지). 재료 목록 API 가 분류를 같이 내려주면 `is_staff_meal` 도 붙인다(실측).

**B2. 발주 줄 파생 (칸 0)** — `routes/purchase-orders-crud.js`
- 목록 includeItems(:312)·상세(:566) 의 `Ingredient` include 에 `ingredient_category_id` + nested `IngredientCategory(attributes ['id','name','is_staff_meal'])` → 줄 `is_staff_meal`(재료 줄만, product/brand_product/product_ingredient 줄은 false) · 헤더 `staff_meal_total`·`regular_total`(줄 line_total 합, 응답 계산). 수령 창이 쓰는 라우트가 따로면 같은 include. 성능: 목록은 includeItems 때만.

**B3. 보고서** — `routes/purchase-cost-report.js`: 쿼리에 `LEFT JOIN ingredients i ON i.id=poi.ingredient_id LEFT JOIN ingredient_categories ic ON ic.id=i.ingredient_category_id` → 품목 행에 `is_staff_meal`, 응답에 `by_purpose: { staff_meal:{spend,lines}, regular:{spend,lines} }`, 월별 행에 `staff_meal_spend`. **기존 키·집계 불변**(단위 테스트가 있으면 그대로 통과해야 함).

**B4. 화면** (프론트 코드 확정 → 빌드 1회 · sweep 1회 — A 와 같은 묶음이면 빌드도 같이 1회)
- 재료 → 카테고리 탭(`RecipeManagement/IngredientCategoriesTab.tsx`): 추가·수정 폼에 «직원식(비용) 분류» 체크 1개, 목록에 «직원식» 회색 글리프 배지. 브랜드 사용자 읽기 전용 그대로.
- 발주 담기(`NewPurchaseOrderPage.tsx` My Stock Items 탭·담긴 줄)·발주 목록 상세·`PurchaseOrderDetailPage.tsx`(:1360 품목표)·수령 창·발주서 PDF/공유 메시지: 줄에 «직원식» 배지(텍스트 글리프, 이모지 금지), 머리에 «직원식 RM X · 일반 RM Y»(둘 다 0 이면 숨김).
- 구매 비용 보고서 화면: 요약 `StatCard` 2개(직원식 비용 / 일반 구매) + 월별 표 «직원식» 열.
- i18n: `glossary.json` 에 «Staff meal (cost)» 먼저, 4언어 키 동시. 화면 단어는 «직원식» 하나(«스탭밀» 은 POS 결제수단 라벨에만 남김 — 그쪽 무변경).

**B5. 운영 데이터 정리 (배포 뒤 · Irene 승인 뒤 · 코드는 지금)** — `scripts/migrate-staff-meal-ingredients-20261007.js`(registry `manual`, 사유: 매장 10 일회성): 기본 드라이런 — 매장 10 재료 중 이름이 «직원식/Staff/staff meal» 을 담고 `is_staff_meal=1` 분류 밖인 것을 «id · 이름 · 지금 분류 → Staff Meal(#23)» 표로 출력 · `--apply` 로 이동 · `--undo <스냅샷>` 복원 · 적용 전 JSON 스냅샷. **레시피·재고·발주 줄 무접촉**(분류 FK 만). 운영 실행은 Irene 이 표를 보고 «적용» 한 뒤.

**B6. 2단계 (이번 0줄 · 기록만)** — `InventoryTransaction.transaction_type` 에 `'staff_meal'` (`lib/enumExpand` 로 expand-only) + `POST /restaurants/:id/inventory/staff-meal-use`(`inventory-core.js` waste 라우트 :548 와 같은 형태 · 수량·메모) + 재고 화면 «직원식 사용» 버튼 + 거래 내역 라벨. Irene 「세고 싶다」 뒤 별도 묶음.

**B7. 검증** — health-check `staff-meal` 계약 4건(데모 38): ①분류 PUT `is_staff_meal` → GET ②그 분류 재료로 발주 생성 → 목록·상세 줄 `is_staff_meal:true`·`staff_meal_total` 일치 · 다른 분류 줄 false ③보고서 `by_purpose` 합 = 전체 spend ④마이그 2회 실행 멱등(이름 변형 3종 심고 1회차 N건·2회차 0건). 고장주입 2: B2 include 빼면 ② 실패 / B3 JOIN 빼면 ③ 실패. 실브라우저: 카테고리 체크 저장·새로고침 유지, 발주 상세 배지 1회.

### C. 메일 문구 — 추가 작업 없음
- 통과. 다음 배포 묶음에 포함. 메모리 갱신은 배포 뒤.

### 하지 말 것 (A·B 공통)
- 🔒 인쇄 보호파일 8개·KDS 무접촉. `utils/orderTotals.js`·`computeDeliveryFee`·`inventoryDeductionService` 무접촉.
- 새 표 0 · 발주 줄 «용도» 칸 0 · 재료 1건 «직원식» 칸 0 · 공급업체 SOA 파일로 정산서를 «생성» 하는 길 0 · 가입 공급업체 정산서를 구매자가 만드는 길 0 · `track_stock` 재사용 0 · 이름으로 직원식 자동 판정 0.
- 운영 쓰기·배포는 Irene 지시 뒤에만. B5 스크립트 `--apply` 는 Irene 승인 뒤에만.

### 게이트 2회차에서 볼 것 (미리 정함)
1. diff 가 Ⅱ 범위 밖 0건 · `check-sensitive-diff` 가 `invoices-payment`·`purchaseOrderPayment`·`payViaSoa`·마이그를 찍는 것(찍혀야 정상).
2. A7·B7 계약·고장주입 결과 원문(응답 JSON 포함) · pm2 재시작 여부.
3. 브랜드 월결제 회귀 0 증명(기존 soa 테스트 재실행 결과) · I-SOA-001 0 · 기존 health-check 전부.
4. `verify-all --full` 1회 통과 · i18n 4언어 · 실브라우저(외부 업체 수정 창 · 정산서 상세 «결제함»·«붙이기» · 발주 상세 배지).
5. 운영 회귀 0 논증: 외부 계약에 `payment_terms` 가 전부 비어 있으므로(운영 실측 21/21) 배포 직후 동작 변화 0 — 테스트 1건으로 박아 둘 것(조건 없는 외부 청구서 → `pay_via_soa:false` · «결제함» 그대로).

---

## Ⅲ. Irene 컨펌
위 Ⅰ-6 의 1~7. «그대로» 면 팀원은 A0 부터 시작한다(A 먼저, B 는 A 게이트 뒤 또는 같은 묶음 — 팀원이 규모 보고 정해 결과에 붙임).
