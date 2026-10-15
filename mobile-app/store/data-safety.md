# Data safety 초안 — 코드 근거가 붙은 «사실 목록» (제출 답은 Irene 가 화면 문구를 읽고 최종)

> 설계 §8 · 앱은 원격 웹(https://purplehere.com/pos)을 띄우는 껍데기라, 웹앱이 모으는 것이 곧 앱이 모으는 것이다.
> 개인정보처리방침(https://purplehere.com/privacy)보다 넓게 선언하면 거부 — 어긋나면 방침 쪽을 고친다.

## 전체 질문
- Does your app collect or share any of the required user data types? → **Yes**
- Is all of the user data collected by your app encrypted in transit? → **Yes** (https 만, capacitor.config `cleartext:false`)
- Do you provide a way for users to request that their data is deleted? → **Yes** — URL `https://purplehere.com/account-deletion` (Q4 답 뒤 만듦)

## 수집 항목 (Collected · 공유 Shared 는 0 — 처리 위탁(호스팅·메일·분석)은 «공유» 아님)
| Play 분류 | 무엇 | 필수/선택 | 목적 | 근거 |
|---|---|---|---|---|
| Personal info › Name | 직원·관리자 이름 | 필수 | Account management, App functionality | 로그인 계정(users) |
| Personal info › Email address | 로그인 이메일 | 필수 | Account management | 로그인 |
| Personal info › Phone number | 계정·매장 연락처 | 선택 | App functionality | 계정·매장 설정 |
| Personal info › Address | 매장 주소 | 선택 | App functionality | 매장 설정(AddressFields) |
| Financial info › Purchase history | 매장 주문·결제 기록 | 필수 | App functionality | 주문·POS |
| Photos | 메뉴 사진 업로드 | 선택 | App functionality | 메뉴 이미지 업로드 |
| Messages › Other in-app messages | 앱 안 Inbox·문의 | 선택 | App functionality | pages/Inbox/InboxPage.tsx |
| App activity › App interactions | 화면 사용 통계 | 선택(쿠키 동의) | Analytics | public/index.html Google Analytics G-LTTLKH1J85 + Consent Mode |
| Device or other IDs | 인쇄 진단용 기기 ID(앱이 만든 무작위 값) | 필수 | App functionality(인쇄 상태 진단) | utils/printDiagnostics.ts `print_device_id` |

## 수집 안 함
위치 · 연락처 · 건강 · 파일·문서 · 캘린더 · 음성 · 웹 기록 · 크래시 로그(별도 SDK 없음). 카메라 권한 없음(매니페스트에 CAMERA 없음).

## Irene 가 화면에서 판단할 곳
- **Financial features 선언**: 앱 자체는 대출·지갑·송금이 아니다. 다만 매장이 손님 결제를 받는 POS(카드단말기 연결)다 — 목록에 «결제 처리/판매 시점» 류 항목이 있으면 그걸 고르고, 없으면 «제공 안 함». (설계 권고: 제공 안 함 — 화면 목록을 보고 최종)
- **Analytics**: 쿠키 동의를 거절하면 Google Analytics 가 꺼지므로 «선택(optional)».
- 방침에 «기기 ID»·«분석» 문장이 있는지 Opus 가 대조해 보고(아래).

## 방침 대조 결과
(2026-10-12 Opus 대조 — dev-frontend PrivacyPolicyPage + locales/en/landing.json)
- 분석: 방침에 «Analytics cookies — Help us understand how users interact» 있음 → App interactions(선택) 와 맞음
- 기기: 방침은 «Device information (browser type, operating system)» 만 — 인쇄 진단용 기기 ID 는 문장에 없음. Data safety 에 Device IDs 를 선언하면 방침이 더 좁다 → 방침 문장에 «a random device identifier used to diagnose printing» 을 더하는 것이 안전(Q4 웹 작업 때 같이, 4언어)
- 거래: «Transaction records and sales data» 있음 → Purchase history 와 맞음
- 사진(메뉴 이미지)·앱 안 메시지: 방침에 따로 문장 없음 → 같이 더할지 웹 작업 때 판단
- **보존 기간 충돌 주의**: 방침 «Account information: retained while your account is active and for 5 years after termination». 삭제 요청 페이지(/account-deletion)는 «무엇이 지워지고 무엇이 남는지»를 이 문장과 어긋나지 않게 써야 한다 — 지금 문장대로면 «삭제 요청해도 5년 보관»으로 읽힌다. 웹 작업 때 Fable 게이트에서 문구를 같이 본다

- (2026-10-15 Fable 게이트 조건 A 반영) 방침에 4줄 추가(4언어): 인쇄 진단용 무작위 기기 식별값 · 올린 사진(메뉴·상품 이미지) · 앱 안 메시지·문의 · «삭제 요청 시 30일 안 개인 프로필 삭제/익명화, 법 보존 기록만 위 기간» → 위 표의 Device IDs·Photos·Messages 와 방침이 맞음. /account-deletion 과 같은 /배포에 실린다
