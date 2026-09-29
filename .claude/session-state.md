---
## 현재 작업 상태
**마지막 업데이트:** 2026-09-29 (/개발완료 — Irene 「저장하고 /개발완료하자. 다시 할게. 다음 섹션에」)
**버전:** 운영 **v3.103** · SW 운영 **5.65-reconcile-total-first-20260925** / 개발 **5.66-sales-order-share-20260929**(빌드 1회 완료·미배포)
**작업 상태:** 🟡 진행 중 — 코드 묶음 거의 완료(F2 반영·verify-all --full·Fable 게이트 전) + Irene 컨펌 대기 2건 + Fable 판정 1건 대기

### 진행 중인 작업
- 🟡 **[Claude Code] 코드 묶음 (09-27 지시 13건 + 09-29 Sales Orders 3건) — 개발서버, 미배포**
  - 판정 원문: `.claude/fable-verdict-20260927.md` Ⅱ · `-20260928.md` Ⅱ · **`-20260929.md` Ⅱ(F2)·Ⅳ(팀원 지시)**
  - ✅ 통과: Sales Orders 3건(Buyer 세로 · 상세 WhatsApp 그룹 공유 · 판매자 카테고리 묶음, 실브라우저 6/6) · R1 8/8 · R2 5/5 · R3 타입 기준선 436 게이트 · R4 배포 자동원복/롤백 v3(`scripts/deploy-layout.sh`, 재현 25/25) · R5 · R6 · R7(+마이그 `migrate-add-seller-delivery-policy.js` — Fable 수용) · R8(SOA 메일 실발송 확인 불가) · F1 · F3 · F4 · F5(푸드코트 포함). 고장주입 기록은 DEVELOPMENT_PLAN 09-29 절.
  - 🔴 **다음 할 일(판정 Ⅱ)**: F2 — `dev-frontend/public/sw.js` activate 의 `clients.matchAll → w.navigate(w.url)` 루프 제거(clients.claim 유지, index.tsx 현 구현 유지, SW bump 불필요) → build:dev 1회 → verify-all --full 1회 → F2 실측(새 프로필 문서 1회 · 교체 후 +1회, 제거 전 2회·2회와 나란히) → check-sensitive-diff(★ FABLE 게이트 대상 ②③) → 배포 기록 `releases/2026-09-29-*.json` → Fable 게이트 → Irene /배포
  - 배포 뒤: 운영 브랜드 1·2 delivery_policy «Petaling Jaya, Selangor» · 0원 청구서 93·88·69·61 Irene Confirm
  - ⚠ 배포 전까지 SA 화면에서 with MIN Cafe 매장 정보 저장 금지(R1 미배포)
- 🟡 **[Claude Code] K-DINE IPC SOA** — 판정 `.claude/fable-verdict-20260929-soa.md`
  - 1차(전달 완료): 브랜드(GIT) 계정 → Restaurants → K-DINE IPC «청구» → 월 명세서 «이번달(오늘까지)» → RM 5,705.90 · 7장 · 마감 10/15. 입고 전 2건(PO-R8-20260927-002 219.20 · PO-R8-20260929-004 1,089.80) 청구서 없음. 운영 «오늘까지» 수정 반영 확인(soaScheduler.js:532). 발행은 Irene 이 직접(권고). **발행 여부 미확인.**
  - 추가 판정(Irene 「배송 안되었어도 청구」「배송전 단계 주문 포함 설정」) = 파일 하단 «추가 판정» 절 — **Irene 에게 아직 전달 안 함(다음 섹션 첫 일)**. 요지: 설정 자리 = 청구서 발행 시점 `brand_billing_terms.invoice_trigger`(on_received 기본 / on_confirmed), 청구서 붙은 발주 amend 400 가드, 소급 없음, 다음 배포. Irene 컨펌 4건(권고 A·A·A·A). 컨펌 후 절단면 1~6 구현(되묻기 없음).
  - Irene 「하지마」(대상 미확인) → 이후 운영 확인·작업 중단함.
- 🟡 **[Claude Code] K-DINE IPC(매장 8) 재료·메뉴 구조 — Irene 반박 → Fable 구조 재검토 대기**
  - 1차 판정 `.claude/fable-verdict-20260929.md` Ⅲ 전달 → Irene 원문: 「1. 메뉴 기준을 매장 기준으로 유지한다는게 뭐야? 이게 지금 구조에 구멍이 있는 거잖아. 브랜드 메뉴 관리가 안되는 형국 아니야? 이걸 해결해야지. 2. 순두부는 안써. 없어졌어. K-Yukagejang & Sundubu Sauce가 맞아. 그런데 이게 문제가 아니잖아. 왜 3-4개가 있냐고 그리고 레스토랑에서 재공아이템 관리를 왜 못해? 브랜드메뉴에 연결된 재고가 뭔데? 왜 여러 개가 나오냐고. 1번 문제강 같이 이어지는 거 아니야? 3. 이건 공급업체 무조건 매장에서 알어서 관리하기로 했잖아. 브랜드가 연결한 건 가져올 필요가 없지. 4. 이건 무슨 말인지 모르겠어. 이것들 다 신중하게 제대로 지금 구조 파악 정확히 하고 검토 해. 확실한 해결방안 가져와. 위에 이미 해결방안이 있다면 내가 지금 남긴 걸 다시 크로스체크 해봐.」
  - ✅ 결과 수신 **`.claude/fable-verdict-20260929-structure.md`**(/개발완료 직후 도착) — **§5 보고문을 Irene 에게 원문 그대로 전달할 것(아직 미전달, 다음 섹션 첫 일)**. 요지: 오전 판정 중 3건 철회(D1 매장 기준 유지 · origin 가드 · 브랜드 원가 ÷1000 — 34.90 은 1000g 기준가로 맞음, 진짜 결함은 매장 원가층 1000배 작게 읽힘 E). Irene 컨펌 4 + 보고 1(§4·§5). 팀원 지시 §6.
  - ⛔ 판정 전: 브랜드 계정 «내려보내기/저장»·매장 «브랜드 업데이트 받기» 금지 · 운영 데이터 무접촉(운영 /tmp/kd.js 는 이미 없음).

### 완료된 작업 (이번 세션 2026-09-29) [Claude Code]
- 위 코드 묶음 구현·검증(빌드 1회 · 실호출·고장주입·실브라우저)
- K-DINE IPC 운영 읽기 조사(재료 301·짝 38 · 메뉴 104/110 · 재전송 위험) · SOA 운영 현황 조사
- 문서: DEVELOPMENT_PLAN 09-29 절 · CHANGELOG Unreleased 09-29 · DEPLOYMENT.md 롤백 v3 · docs/SUPPLIER_CONTRACT_SYSTEM.md · 메모리 2건(deploy-layout 단일 소스 · sw 새로고침 두 번)
- ⚠ 테스트 사고: dev 청구서 462 원복 실패 → 461 대조로 원복 완료

### 다음 확정 작업
- 위 «진행 중인 작업» 이어서 (Irene 「다시 할게. 다음 섹션에」) — 순서: SOA 추가 판정 보고문 전달 · 구조 재검토 §5 보고문 전달 → F2 → 검증·게이트

### 👉 Irene 님이 하실 일
1. K-DINE IPC 정산서 발행(위 경로) — 원하시면
2. gitconsulting 로그인 → «with MIN Cafe» 오너 카드 확인 · Payment Settings 300/10 확인
3. AI: 이번 배포 뒤 /기능설계

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- 판정상 안 함: 브랜드·푸드코트 모자/기존 아이디 연결(d) · shared_with_stores 드롭(i)
- 받은 발주 알림 일부(buyerReceivedEmail) 무브랜딩 · 인보이스 결제 알림 머리글이 수신자 users.brand_id 기준
- Sales Orders 검색이 불러온 첫 페이지 안에서만 찾음 — 기존 동작
- Owner·Manager 청구서 화면 0원 Confirm 재조회 미확인
- 인스펙션 ING-UNI-001/002 가 브랜드↔매장 짝을 원리상 못 잡음(Fable 지적)

### 주요 변경사항
- 운영 쓰기 0 (읽기만) · dev DB: brands/foodcourts.delivery_policy 드롭→마이그 재추가, 청구서 462 테스트 후 원복

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
