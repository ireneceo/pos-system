# Fable gate 요청 — 매장 알림 분리 (2026-11-13 · 작업방 6e35280f)

설계: `.claude/fable-design-20261113-notification-store-scope.md` (N1~N6 · V1~V8)

## 바뀐 파일 (이 작업분만 — 같은 작업공간의 다른 미커밋: StaffPage·staff.json(작업방 d8b17ee6) · GTM 보류 4파일 · playwright.config · deploy-manifest/releases 는 남의 것)
- N1 `dev-backend/services/userContexts.js` — `listRestaurantPeopleIds(rid)`(소속 ∪ RA·Staff 모자, is_active=1, UNION 중복 0) · `listUserRestaurantIds(uid)` · `countRestaurantSeats` 와 WHERE 상수 공유
- N2 `dev-backend/services/pushService.js` — `sendPushToRestaurant` 가 N1 + push_enabled · `sendPushToUser(uid, payload, {storeScope})` 화면 카드 룸 `user:{id}@restaurant:{rid}` · `push_store_off` 면 OS 푸시만 건너뜀(로그 store_off). storeScope 없으면 종전 `user:{id}`
- N3 `dev-backend/services/socketService.js` — /notifications join 에 `user:{userId}@restaurant:{auth.restaurant_id}` 룸 1줄
- N4 `models/User.js` push_store_off JSON NULL · `models/PushLog.js` ENUM +store_off · `scripts/migrate-push-store-off.js`(멱등 · information_schema · expandEnum) + registry deploy 등록 · `routes/push.js` GET preferences `stores` / PUT `store_off`(배열 아니면 400 · 내 매장 번호만 남김)
- N5 `dev-frontend/src/components/Settings/PushPreferencesCard.tsx` «Stores»(2개 이상만) · `services/push.ts` 타입 · `public/locales/{en,ko,zh,ms}/notifications.json` pushStores.*
- N6 `dev-backend/routes/notification-settings.js` GET preferences 항목 = 원래 역할 ∪ user_contexts 역할
- 상시 검사: `scripts/health-check.js` defineStoreScopedNotificationTests (pos 1 · security 1)
- 🔒 보호 파일·orders-crud.js 무접촉

## 자체 검증 숫자
- 실호출 시험(데모 38 RA user 23 에 39 RA 모자 잠깐 → 원복): 14/14 — 39 주문 받는 사람 [23](모자) · 38 주문 [23,428,2001,2559,2560,2561] 중복 0 · A@38 화면 카드 38만 / A@39 화면 카드 39만 / 모자 없는 B 38만 · Stores A=38,39 B=38 · store_off [39,1,5]→[39] · 문자열 400 · 39 끈 뒤 A 로그 store_off + 39 화면 카드 옴 · 시험 발송(사람 단위)은 두 화면 다 옴. 시험 주문 남은 수 0.
- 고장 주입: N3 룸 줄 제거 → 4건 실패 · N1 모자 UNION 제거 → 4건 실패 · health-check 새 2건도 N3 제거 시 2/2 실패 → 원복 뒤 14/14 · 2/2
- 마이그 2회 실행: 1회 added / 2회 skip·(none)
- N6: user 2001(Brand Manager + 38 Staff 모자) 항목 26개에 order_new·staff_leave 포함
- 실브라우저(빌드 1회 뒤) /restaurant/38/notification-settings: A 1366·390 목록 2개 · 39 끄기 → DB [39] · 새로고침 뒤 꺼짐 유지 / B 목록 0 · 가로 넘침 0 · 콘솔 오류 0
- print-guard 8/8 · design-guard 신규 0 · migration-registry 통과 · check-sensitive-diff = ③ DB 스키마 (게이트 대상)
- verify-all --full: 23/24 — 실패 1 = deploy-ready(배포 준비 기록·SW 버전 — 배포 준비 몫, 이전 작업들과 같음). health-check 전체 · 인쇄 라우트 · 타입 기준선 · i18n · mount sweep 8역할 통과

## 확인 불가
- 실제 기기 OS 알림 표시 — 개발 DB 살아 있는 구독 0. push_logs 판정까지만 증명.
- V3(새로고침 없이 모자 전환 직후 카드 전환) 실브라우저 미실시 — 코드: AuthContext.tsx:992 전환 뒤 새 토큰 저장 + setUser(새 객체) → NotificationToaster useEffect([user]) 가 끊고 getAuthToken() 새 토큰으로 다시 붙음(읽기로만 확인). 실호출 시험은 토큰별 소켓 2개로 증명.
- V7 예약 알림 2종 — 같은 sendPushToRestaurant 를 지나서 따로 실호출 안 함.
- 운영 매장 28·IPC 실제 수신자 — 운영 DB 읽기 안 함.
