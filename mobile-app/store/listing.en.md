# Google Play 스토어 등록정보 — 영어(en-US) 초안

> 설계: /var/www/.claude/fable-design-20261012-play-store.md D9 · Play Console › Grow users › Store presence › Main store listing 에 그대로 붙여 넣는다.
> 글자 수 제한: 앱 이름 30 · 짧은 설명 80 · 긴 설명 4000.

## App name (30)
Purple POS

## Short description (80)
Restaurant POS for tablets: orders, table plan, kitchen and receipt printing.

## Full description (4000)
Purple POS turns an Android tablet into the counter terminal for your PurpleHere restaurant account.

Sign in with the account your restaurant already uses on purplehere.com and the tablet becomes a full point of sale:

• Take orders at the counter or table — dine-in, takeaway and delivery
• Floor plan with live table status
• Mobile QR orders from guests arrive on the same screen
• Kitchen tickets and receipts print straight to your Bluetooth or network (LAN/Wi-Fi) thermal printer — no extra print app needed
• Korean, Chinese, Malay and English text prints correctly on thermal printers
• Card terminal connection for supported terminals
• Live orders, kitchen display, cash-up and end-of-day reports
• Menu, stock and staff are managed from the same account in any browser

Built for always-on counter tablets: the screen stays awake so new orders and kitchen tickets are never missed.

Purple POS requires a PurpleHere restaurant account. New restaurants can create an account at https://purplehere.com.

## Category
Business

## Contact details
- Email: help@gitconsulting.group   ← 개인정보처리방침의 연락처와 같은 주소. 바꿀 거면 방침도 같이
- Website: https://purplehere.com
- Phone: (비움)

## Release notes — 0.4.0 (code 8) · 내부 테스트·프로덕션 공통
First Google Play release. Updated for Android 16, with Bluetooth and network printer support.

## 그래픽 (각자 칸 — 섞으면 거부)
- App icon 512×512 PNG: store/icon-512.png
- Feature graphic 1024×500: store/feature-1024x500.png
- 스크린샷: store/screenshots/ (데모 매장 38, `node mobile-app/scripts/store-capture.js`) — 화면 3개(테이블 배치·실시간 주문·주방) × phone 1080×1920 · tab7 1920×1200 · tab10 2560×1600. 폰 칸에 phone-*, 7인치 칸에 tab7-*, 10인치 칸에 tab10-*
- 빠진 화면: POS 계산 화면(데모 메뉴에 «[확인용]» 시험 메뉴·아이콘 글꼴 깨짐) · 대시보드(«Subscription expired» 표시). 데모 매장 메뉴를 정리한 뒤 다시 찍으면 추가 가능
