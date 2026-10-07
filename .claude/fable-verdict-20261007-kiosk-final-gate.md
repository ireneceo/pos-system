# Fable 최종 게이트 판정 — 키오스크(결제 분리 + 설정 › Kiosk 스위치) · 영수증 드래그·PDF · K-Bulgogi 도장 (2026-10-07)

> Irene 원문(상황판, 2026-10-07): 「다 확인했어. 최종 검증은 fable이 해」
> 앞선 판정: 설계 `.claude/fable-verdict-20261007-kiosk-payment-split.md` · 게이트 `…-kiosk-payment-split-gate.md`(§7 PASS · §7-3 도장 조건) · 설정 진입 설계 `…-kiosk-settings-entry.md`(§5 게이트 기준) · K-Bulgogi 게이트 `…-kbulgogi-gate.md`(PASS, 마커 보류).
> 이 판정: 운영 접근 0 · 운영 DB 쓰기 0. 개발서버 실호출·health-check 재실행(자기 정리) · 저장소 변경은 §4 에 적은 셋뿐(🔒 bless 2파일 · SW 버전 1줄 · 이 판정문).

---

## 0. 한 줄 결론

**PASS — 🔒 bless 실행 · 통과 마커 발행.** 작업 트리의 세 사안(키오스크 · 영수증 · K-Bulgogi) 모두 판정 범위 안이고, 코드로 더 고칠 것 없음.
남은 것은 **배포 절차(§6)** 와 **2단계 실기(GHL 파일럿 날, 앱 기기 + 실단말기)** 뿐.

Irene 이 «다 확인했어» 로 답한 두 가지의 해석(그대로 적는다):
- ① 실프린터(키오스크 주문 1건 → 주방 티켓 1장 · 계산원 칸 «Kiosk» · 중복 0) — **확인됨** → bless 조건 충족.
- ② 모바일오더 사용/안 함 스위치 — 별도 답 없음 → **Fable 권고 «아니오» 그대로**(코드 0). 다르게 원하시면 한 줄만.

---

## 1. 키오스크 — 내가 직접 확인한 것

### 1-1. §7 이후 바뀐 파일 = 설정 진입 설계 §4 목록 그대로 (mtime 실측)

§7 게이트(14:35) 이후 수정된 파일: `SettingsPage.tsx` · `KioskDevicesCard.tsx` · `mobile-public.js` · `OrderTypePage.tsx` · 🔒 `MainLayout.tsx` · `middleware/kioskDevice.js` · `routes/kiosk-devices.js` · `health-check.js` · locales `common/menu/settings`(4언어) · `docs/KIOSK_MODE.md` · `docs/ORDER_FLOW_MATRIX.md` · `DEVELOPMENT_PLAN.md` · `session-state.md`.
§7 에서 PASS 한 파일(orders-crud · useAutoPrintPoller · paymentMethodGuard · settingsGuard · PaymentPage · httpClient · App.tsx · 단말기 라우트 등)은 **전부 14:13 이전** — §7 이후 무접촉.

### 1-2. 🔒 보호파일 3개 diff (bless 범위 확정)

| 파일 | hunk | 판정 |
|---|---|---|
| `routes/orders-crud.js` | 243 · 287 · 331-334 · 559-565 · 582 · 629 · 645-647 | §7 §1-1 표와 **동일**. pending-print / printed / print-claim / kitchen_items 무접촉 |
| `hooks/useAutoPrintPoller.ts` | 176 (`cashierName` 'Kiosk') | §7 과 동일 |
| `components/Layout/MainLayout.tsx` | 24(lucide `Tablet` import) · 1241(알림 kiosk) · 1390(cashierName 'Kiosk') · 1573(`AdminCategory.kiosk?`) · 2013-2015(상단 «Kiosk» 열기 항목) · 2099-2100(설정 섹션 `?tab=kiosk` — D1) · 2686-2691(열기 클릭 분기) | 승인 2줄 + D1 1줄 + **팀원 재량 4곳**. 전부 사이드바 메뉴·클릭 분기이고 `_printPollFn`·인쇄 발행 블록 밖. **재량 4곳 수용** — Irene 원문 「좌측메뉴에 키오스크 링크 모바일오더처럼」 의 직역이고, 꺼짐이면 설정 › Kiosk 로 보내는 분기는 «켤 곳이 없다» 를 막는다 |

`check-print-guard` 재실행: 정확히 이 3개만 잡힘(변경·전용 1 · 변경·공유 2).

### 1-3. 설정 진입 D1~D7 대조 (코드 읽기)

| 설계 | 구현 | 판정 |
|---|---|---|
| D1 사이드바 Kiosk 한 줄 | `MainLayout.tsx:2100` — 스위치 무관 항상 표시, `hasMenuPermission('settings')` | 그대로 |
| D2 `kiosk` 탭 — 스위치 카드 / 기기 카드(`enabled` prop) / URL·QR 카드(켜짐만) · 모바일 탭에서 키오스크 카드 제거 · `mobileSettings.kiosk_enabled` 타입·초기값·로더 | `SettingsPage.tsx:384·1003·1394-1395·1655-1657·2739·5990-6060` · 모바일 탭 `:5192` 삭제 · `KioskDevicesCard.tsx` prop `enabled`(꺼짐 = 입력·등록 버튼 disabled + 힌트, 목록·해제 유지) | 그대로. 스위치 저장은 기존 `mobile_settings` 통째 저장 경로(`guardShallowSettings` 얕은 병합 — 다른 키 보존) |
| D3 결제수단 Kiosk 열 = 켜짐일 때만, 저장값 보존 | `:2869` 조건 `mobileSettings.kiosk_enabled && !KIOSK_HIDDEN_METHODS.includes(key)` · `handlePaymentToggle`·`splitKioskFromMobile` 무변경 | 그대로 |
| D4 서버 관문 한 곳 `isKioskEnabled` · 주문 409 · 등록 409 · `/me` kiosk_enabled | `middleware/kioskDevice.js` — 매장 일치 **직후·카드 확인 전** 409 `KIOSK_DISABLED` · `routes/kiosk-devices.js` 등록 409 · `/me` 에 `kiosk_enabled` · 목록·PATCH·해제는 꺼짐에도 됨 | 그대로. `isKioskEnabled` 10케이스 단위 확인(객체·JSON 문자열·null·`'true'` 문자열·숫자 1 → 기대값 전부 일치, 불일치 0) |
| D5 공개 응답 `kioskEnabled` + 등록 기기 꺼짐 안내(직원 링크 없음) | `mobile-public.js:148` · `OrderTypePage.tsx:720-736`(`hasKioskToken() && kioskEnabled === false` → pause 상자 **앞**, 장식 이모지 없음, 링크 없음) | 그대로 |
| D6 i18n | `nav.kiosk` · `kioskTab.*` 7키 · `kiosk.off.*` 2키 — 4언어 · `npm run i18n:verify` **Errors 0**(내 재실행) | 그대로 |
| D7 문서 | `docs/KIOSK_MODE.md` §1 사용 여부 원칙 · §2 화면 줄 · §3 열 표시 · §6 검사 / `ORDER_FLOW_MATRIX.md` 키오스크 줄 409 | 그대로 |
| D8 범위 밖 | 모바일오더 스위치 · 요금제 모듈 · 🔒 orders-crud 추가 변경 — **없음** | 지킴 |

### 1-4. 기계 증거 (내가 재실행한 것)

| 항목 | 결과 |
|---|---|
| `health-check --category=kiosk` | **4/4**(등록·해제·401 / 사용 스위치 — 꺼짐 주문 409·등록 409·`/me` 200+false·공개 응답·폰 주문 무영향·다시 켠 뒤 201 / 출처·채널 / 카드 기록) · 잔재 0 |
| `health-check --category=terminal` | **11/11**(Void 정식 포함 — 팀원 수정 뒤 통과) |
| `health-check --category=print` | 10/11 — 실패 1 = 🔒 보호파일 지문(bless 전, 예상) → §4 bless 뒤 재실행 |
| `health-check --category=payment` | **6/6**(영수증 PDF·이미지·html 400 포함) |
| 화면 jest | `paymentChannel.test.ts` 4 + `ReceiptUploadField.test.tsx` 3 = **7/7** |
| i18n | Errors 0 |
| 번들 신선도 | `verify-all --only bundle-fresh` ✓. 서빙 번들 `main.18301e8f.js`(15:23) |
| mount sweep | 팀원 `verify3.log`: sweep ✓ **697초 실행**(캐시 아님). `.sweep-cache.json` 지문 `e9710628…` 을 `servedBundleFingerprint()` 와 같은 식(index.html + main.*.js sha256)으로 **내가 다시 계산 → 동일**. 15:19 sweep 뒤 15:23 재빌드는 locales 문구만 바뀌어 index.html·JS 가 같다 → sweep 이 본 번들 = 지금 서빙 번들 |
| 실브라우저 클릭 흐름 | 팀원 `kiosk-e2e.js` 17/17(`e2e2.log`) — 스크립트 check 줄을 대조: 메뉴 2곳 · 모바일 탭 카드 0 · 꺼짐=칸 0·등록 막힘 · 스위치 저장 · 켜짐=칸 · 등록→토큰·직원 로그인 삭제 · `/pos`→키오스크 · 카드 승인 기록(source kiosk·completed·pending·원장 1) · 카운터 · 미등록 카드 숨김 · 꺼짐 안내 · 해제→401→`/pos?kiosk_revoked=1` · 페이지 오류 0 · 정리 원복 일치. **수용** |
| 고장주입 2(설정 진입 §5-1) | 팀원 보고(주문 관문·등록 관문 제거 → 각각 실패, 원복 4/4, pm2 restart 뒤). health-check 2번 케이스의 단정문(`ord.status !== 409 \|\| code !== 'KIOSK_DISABLED'` · `reg.status !== 409`)이 그 분기에 정확히 걸린다 — 코드 대조로 **수용**(§7 과 같은 기준) |
| `check-sensitive-diff` | ①②③⑤ 대상(사안 성격 그대로) |

### 1-5. health-check 팀원 수정 2건 — 판정
- **kiosk 카테고리 `kioskSwitch`**: 데모 매장 `mobile_settings` 원본을 `os.tmpdir()` 파일로 먼저 저장 → 켬 → `restore` 가 원본 문자열 그대로 UPDATE + 파일 삭제. 10-07 결제설정 소실 교훈대로. 수용.
- **단말기 Void 정식**: «PIN 필요 확인 뒤 원래 설정으로 되돌리기» → «`requireVoidPin:false` 로 명시» 로 바꿈. `finally` 가 검사 전에 읽은 `opsRow.operation_settings` 로 원복하므로 매장 설정은 보존된다. 검사가 데모 매장의 현재 설정(사람이 켜 둘 수 있음)에 기대지 않게 된 것 — **강화**로 수용. 데모 38 `requireVoidPin:true` 는 Irene 직접 조작(activity_logs)으로 보고 그대로 둠(팀원 판단 수용).

---

## 2. 영수증 드래그·PDF — 이 자리에서 게이트 (§7-3 조건 ②)

작업방 20dc6966 기록: «health-check payment 6/6 · 화면 jest 3/3 · 고장주입 백엔드 1·화면 1 둘 다 잡힘 → 빌드·verify --full·Fable 게이트 남음». 빌드·sweep 은 503af8e9 방의 빌드·`verify-all --full` 에 포함됐다(청구서 화면 6개가 8역할 sweep 대상). 게이트는 여기서 한다.

| 항목 | 내가 확인한 것 | 판정 |
|---|---|---|
| 서버 `utils/receiptFile.js`(신규) | data URL → 파일. PDF 는 `%PDF-` 머리 확인 · 5MB(디코드 전후 둘 다) · `/uploads/receipts/<prefix>-<ts>-<16hex>.pdf`. 이미지는 `saveImageToFile(subdir 'receipts', 2000px)`. **SVG 거절**(같은 출처 서빙이라 XSS) · html/text 거절 · `/uploads/` 경로는 `..` 거절 · http(s) 그대로 · 빈값 null | 정석. `express.json limit 10mb` 라 5MB base64(≈6.7MB) 통과 |
| `routes/invoices-payment.js` | `submit-payment` 에서 `normalizeReceiptUrl` 1회, `ReceiptError` → 400(상태 불변), 그 밖 throw. 금액·상태 전이·SOA cascade 코드 **무접촉**(`check-sensitive-diff` ② 표시는 파일 이름 때문) | 돈 무관 |
| 화면 | `ReceiptUploadField`(클릭·드래그 · 종류→크기 순 검증 · PDF 표시·열기) · `ReceiptPreview`(이미지/PDF, 옛 base64 행도 처리, data URL 은 Blob 으로 새 탭) · 청구서 화면 6곳이 로컬 업로더를 공용 컴포넌트로 교체(Brand 의 캔버스 리사이즈 1024px 제거 → 서버 2000px 로 통일) · 공용 `Button` 사용 | 디자인 규칙 안 |
| 증거 | health-check payment **6/6**(내 재실행: html 400 · PNG 파일 URL·GET 200 · PDF 파일 URL·GET 200 · 정리) · jest 3/3(내 재실행) · sweep 포함 · 고장주입 2 = 팀원 보고 수용 | PASS |
| 배포 안전 | 마이그 0 · `/var/www/uploads/receipts` 는 첫 저장 때 `mkdir -p` · 배포 rsync 는 `uploads` 제외(기존 규칙) · 롤백 = 이전 번들(옛 코드는 `/uploads/…` URL 을 그대로 `<img>` 로 그림 — PDF 는 깨진 그림이지만 데이터 손실 없음) | OK |

**영수증 — PASS.** 기록만(§3 N2).

---

## 3. 기록만 (지금 안 고침)

- **N1.** 상단 «Kiosk» 열기 항목: `/api/restaurants/:id` 조회가 실패하면(`r.ok` false) 기존 fallback `/mobile/restaurant-<id>` 로 가서 `?kiosk=1` 없이 모바일 주문 화면이 열린다. 네트워크 실패 때만. 다음 MainLayout 정식 변경 때 fallback 에 `cat.kiosk ? '?kiosk=1' : ''` 한 줄.
- **N2.** 영수증 파일은 `/uploads/receipts/*` 로 **로그인 없이** 서빙된다(다른 `/uploads` 와 같은 규칙, 이름에 8바이트 난수+시각 → 추측 불가). 이전엔 base64 가 청구서 API(인증) 안에 있었다. 은행 영수증을 **인증 뒤에만** 보이게 하려면 별도 설계(서명 URL 또는 인증 라우트) — Irene 이 원할 때.
- **N3.** `order_actions.source` ENUM 에 `kiosk` 없음(지난 N1 그대로) — 다음 orders 정식 변경 때 `expandEnum`.
- **N4.** `?tab=kiosk` 는 URL 로 직접 열린다(`useTabParam` 화이트리스트 없음 — 기존 설계 그대로).
- **N5.** 데모 38 결제설정 원본은 복구 불가(지난 N5). 지금은 기본값 · kiosk 값 0 · 기기 0 · kiosk 주문 0(팀원 보고, health-check 잔재 감시 0).
- **N6.** 마커는 «배포 기록 JSON(`dev-backend/releases/<날짜>.json`, 미추적)» 이 생기는 순간 지문이 바뀌어 **무효로 표시**된다(지문이 미추적 파일 내용까지 해시 — 설계상). 코드는 그대로이니 **`.fable-gate-skip` 쓰지 말 것** — 정지 훅은 같은 지문에서 1회만 막는다(`.fable-gate-nag`). 기록 JSON 의 `fable_note` 에 이 판정문 경로를 적으면 추적된다.
- **N7.** 2단계 실기(앱 기기 + 실단말기)는 GHL 파일럿 날: 승인→paid·pending·티켓 1장 / 거절→outstanding·FloorPlan 처리 / 승인 직후 앱 강제 종료→FloorPlan 카드→`ALREADY_APPROVED` 재청구 0 / 해제 뒤 401.

---

## 4. 내가 실행한 것 (순서 그대로)

1. 이 판정문 작성(미추적 파일 = 지문에 포함되므로 **마커보다 먼저**).
2. `dev-frontend/public/sw.js` `SW_VERSION` `5.88-invoice-total-fix-20261007` → **`5.89-kiosk-receipt-20261007`** 1줄. 이유: 프론트 변경이 전부 끝났고(코드 수정 0), SW 버전은 «맨 마지막» 규칙이며 **마커 뒤에 올리면 마커가 죽는다** — 마커가 배포될 코드 그대로를 덮게 순서를 바꿨다. 기계적 변경(판단 없음). sw.js 는 index.html·main.js 에 안 들어가므로 재빌드 뒤 번들 지문이 같아 sweep 은 재사용된다(지문이 바뀌면 `--full`).
3. 🔒 bless: `node scripts/check-print-guard.js --bless` → `print-guard.manifest.json` 갱신 + `print-guard.bless-log.md` 에 항목 추가(§4-1).
4. 재확인: `check-print-guard` 8/8 · `health-check --category=print` 11/11 (§4-2 에 결과).
5. `node dev-backend/scripts/fable-gate.js pass --note "…"` → `status` 유효 (§4-3).

### 4-1. bless 근거(bless-log 에 같은 내용)
- Irene 실프린터 확인(2026-10-07 「다 확인했어」) — 키오스크 주문 → 주방 티켓 1장 · 계산원 칸 «Kiosk» · 중복 0.
- 3파일 diff = §1-2 표. 인쇄 발행·폴러 판정·`_printPollFn`·pending-print/printed/print-claim/kitchen_items 무접촉.
- `health-check --category=print` 10/10(지문 제외) · 인쇄 라우트 가드 ✓(verify3.log) · 동시 print-claim N→1 ✓.

### 4-2. bless 뒤 재확인 (실행 결과)
- `check-print-guard.js --bless` → 기준 등록 완료(8개, blessed_at 2026-10-07T15:46:07Z) · 재실행 **«변경 없음 — 생명선 안전 (8/8)»**.
- `health-check --category=print` → **11/11**(보호파일 무결성 포함).
- 저장소 변경 추가분: `print-guard.manifest.json`(8줄) · `print-guard.bless-log.md`(항목 1개) · `sw.js`(1줄) · 이 판정문 — 그 밖 0.

### 4-3. 마커
- 이 판정문을 마지막으로 저장한 뒤 `node dev-backend/scripts/fable-gate.js pass --note "키오스크 결제 분리+설정›Kiosk PASS · 영수증 드래그·PDF PASS · K-Bulgogi PASS(kbulgogi-gate) · 🔒 bless 완료 · SW 5.89 · 판정 .claude/fable-verdict-20261007-kiosk-final-gate.md"` 실행 → `status` 가 «유효» 인 것을 확인하고 보고한다.
- 이 파일을 포함해 **session-state.md 외 어떤 파일도** 마커 뒤에 고치면 마커가 무효가 된다(N6). 배포 기록 JSON 은 예외 없이 무효화하므로 N6 대로 다룬다.

---

## 5. Irene 에게

- **코드는 끝났습니다.** 🔒 bless 와 통과 마커를 제가 찍었습니다. 하실 일은 **`/배포` 지시** 하나입니다(절차는 §6 — 팀원이 수행).
- 모바일오더 사용/안 함 스위치는 **만들지 않았습니다**(권고 «아니오» — «주문 일시정지» 가 그 역할). 원하시면 한 줄만 주세요.
- 참고로 남긴 것 둘(결정 불필요): ① 영수증 파일이 다른 업로드처럼 링크를 아는 사람에겐 로그인 없이 열립니다(이름은 추측 불가) — 은행 영수증을 로그인 뒤에만 보이게 하려면 따로 설계합니다(§3 N2). ② 키오스크 카드단말기 실기 검증은 GHL 파일럿 날 한 번에(§3 N7).

---

## 6. 배포 순서 (팀원용 · 판단 없음)

1. `cd /var/www/dev-frontend && npm run build:dev`(백그라운드) — SW 5.89 반영. 빌드 뒤 `cd ../dev-backend && node scripts/verify-all.js --only bundle-fresh,print-guard` ✓. 번들 지문(`servedBundleFingerprint`)이 `.sweep-cache.json` 과 다르면 `verify-all --full`(예상: 같음).
2. 배포 기록 JSON(`dev-backend/releases/`) — `verification.sw_version = 5.89-kiosk-receipt-20261007` · `fable_note` 에 이 판정문 경로. 이 파일이 생기면 마커가 «무효» 로 보이는 것은 N6 — skip 파일 금지, 훅은 1회만 막는다.
3. `/배포` 는 Irene 지시 뒤에만. 마이그: `migrate-create-kiosk-devices.js`(deploy, 멱등) 1개. K-Bulgogi 운영 적용은 이미 끝남(`manual`).
4. 배포 뒤: 운영 `sw.js` 로 5.89 실측 · 스모크 · 데모 매장에서 설정 › Kiosk 화면 1회 열기.

---

## 재확인 (장바구니 상시 표시) — 2026-10-07 저녁 · Fable

Irene 원문: 「키오스크 UI가 너무 이상해. 우측 장바구니 있는 상태 그대로 상세페이지 들어가야지. 결제하는 모든 과정에서도 우측에 장바구니 없어지면 안되는 거 아니야?」 → 팀원이 재량으로 화면을 고쳤고(서버·🔒 무접촉), 위 마커(3832931bca4f)가 지문 불일치로 죽었다. 이 절은 그 변경의 게이트다.

### 대조 (diff 전체를 읽음)
| 변경 | 판정 |
|---|---|
| `mobile/components/KioskCartAside.tsx`(신규) — MenuPage 안에 있던 오른쪽 장바구니를 공용으로. `useKioskSplit`(키오스크 ∧ 가로≥1024) · `KioskSplit/KioskMain` · `kioskSplitBarCss`(아래 고정 버튼을 왼쪽 칸 폭에) · 결제하기는 공용 `Button`, `/payment` 직행 | 그대로. 줄·합계는 `/cart` 와 같은 `CartContents` — 두 벌 아님 |
| `CartContents.tsx` `CartLines readOnly` — 수량·삭제 숨기고 «× n» | 그대로 |
| `MenuPage.tsx` — 인라인 aside·스타일 6개 제거 → 공용. 뱃지는 `qtyBadge` 로 넘김 | 그대로(동작 같음, 결제하기만 `/cart`→`/payment`) |
| `ItemDetailPage` · `QRPaymentPage` · `OnlinePaymentPage` — `KioskSplit` 감싸기 + aside(결제 화면 둘은 `readOnly` · 결제하기 없음) + 고정 버튼 `$split` | 그대로. QR·온라인은 주문 내용이 이미 넘어간 뒤라 보기 전용이 맞다 |
| `PaymentPage` — aside 수량 수정 가능(`isProcessing ∨ kioskPay` 면 readOnly) · 뒤로가기 split 이면 `/menu` · `PayHint/PayButton $split`. **결제·주문 로직(`handlePayment`·`runKioskCardPayment`·주문 본문) 무접촉** — diff 로 확인 | 그대로 |
| `CartPage` — split 이면 `/menu` 로 `Navigate` | 그대로(장바구니가 늘 오른쪽이니 따로 된 화면은 뜻이 없다) |
| 서버 0줄 · 🔒 보호파일 0줄(print-guard 8/8) · `OrderTypePage/MobileApp/kioskMode` diff 는 앞선 게이트(D2·D5) 범위 그대로 | — |

### 내가 고친 것 2줄 (팀원 변경에서 빠진 것 · 같은 빌드에 넣음)
1. **한 화면에 다른 두 «합계»** — 결제 화면 왼쪽 주문 요약은 쿠폰·포인트·포장비·배달비·반올림을 넣은 식(`PaymentPage:852-875`)이고, 오른쪽 aside 의 `CartSummary` 는 그것을 모르는 식(`useCartTotals` = 소계·SC·세금만). 쿠폰 하나만 넣어도 왼쪽 RM 12.00 · 오른쪽 RM 13.67 이 나란히 선다. → `KioskCartAside` 에 `showSummary`(기본 = `showCheckout`) 를 두어 **결제 화면 셋(결제·QR·온라인)에서는 줄만 보이고 합계는 왼쪽 하나**. 메뉴·상세는 종전대로 합계+결제하기(거기선 그 식이 유일한 합계).
2. `PaymentPage:3106` 카드 안내 바(`kiosk.pay.cardHint`)에 `$split` 누락 → 추가. (aside 는 `max-height: calc(100vh-220px)` 라 실제 겹침은 없었다 — 일관성.)

### 증거 (내가 실행)
- 빌드 1회(build7.log · 경고 목록 이전 빌드와 차이 0) → **`verify-all --full` 24/24**(verify5.log · mount sweep 686초 크래시 0 · 번들 신선도 ✓ · 타입 신규 0 · 디자인·TDZ·타임존·i18n ✓ · health-check 전체 ✓ · 인쇄 라우트 가드 ✓).
- 실브라우저 클릭 흐름 **20/20**(e2e4.log · 데모 38) — aside 위치 메뉴=상세=결제 left 828·width 340 · 고정 버튼 겹침 0 · `/cart→/menu` · 카드 주문 source kiosk·완납·원장 1줄 · 카운터 주문 · 미등록 기기 카드 숨김 · 꺼짐 안내 · 해제 → `/pos?kiosk_revoked=1` · **페이지 오류 0**(팀원 실행 때의 «Failed to fetch» 1건은 재실행에서 안 남 — 검사가 페이지를 급히 옮긴 경쟁이었다는 팀원 설명과 일치).
- 화면 캡처 `shots/3-payment.png`: 결제 화면 오른쪽에 줄만, 합계는 왼쪽 하나. `2b-detail.png`: 상세에 합계+Checkout.
- 데모 38 잔재: kiosk 주문 0 · 기기 0 · 결제·모바일 설정 «원복 일치». **`mobile_settings.kiosk_enabled` 는 내 재실행 전부터 `false`**(`ms38-original.json`) — 팀원 보고의 «true 그대로» 와 다르다. Irene 이 확인하려면 설정 › Kiosk 에서 켜야 한다.

### 판정
**PASS.** Irene 요청대로 메뉴→상세→결제(카드·QR·온라인) 전 과정에 오른쪽 장바구니가 같은 자리에 있고, 돈·주문 로직과 서버는 무접촉. 배포 기록 JSON 에 줄 추가는 **안 한다**(기록은 «무엇을 했나» 7칸이고 이 변경은 키오스크 화면 항목 안의 모양 — 대신 `completed` 첫 항목이 이미 키오스크 화면을 덮는다; 줄을 더하면 마커가 또 죽는다). SW 5.89 는 아직 운영에 안 나갔으니 재상승 없음.
마커: 이 절 저장 뒤 `fable-gate pass` 재실행(지문 aa33ab1d552b 기준). 이후 session-state.md 외 파일 수정 금지(N6).
