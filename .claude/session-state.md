## 현재 작업 상태
**마지막 업데이트:** 2026-09-24 14:20 UTC · **운영 v3.101 (SW `5.56-soa-period-20260924`, 12:21 배포)** · **개발 SW `5.57-invoice-alias-total-only-20260924` 미배포**
**작업 상태:** 완료 — /개발완료 처리(2026-09-24). 오늘 운영 배포 1회(v3.101) + 인보이스 대조는 개발 완료·미배포.

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 · 2026-09-24) [Claude Code]
**운영 배포됨 (v3.101 · SW 5.56):**
- ✅ **판매자 주문 품목 수정(amend)** — 출고 전만 · **총액 못 올림**(구매자 승인액이 상한) · 이유 선택 · 변경내역 자동 안내 · 상품 이름 검색
- ✅ **판매자가 구매처 대신 주문 넣기** — 오너 승인 켜진 매장은 승인 대기부터(우회 없음)
- ✅ **자격(모자) 부여 화면** — 🔴 전환 기능은 이미 있었는데 **부여할 화면이 없어 잠들어 있었다**. Irene 의 GIT↔with MIN 로그아웃 왕복이 끝남
- ✅ **월 정산서 정합** — 「January 2000」·미래 발행일·기간「-」 해결(뜻이 다른 값을 한 자리에 겹쳐 쓴 것이 원인) · 기간 고르기 · 잔여분 포함 · 「N일 안에」 · 취소 시 자식 풀기 · 번호 중복 수정
- ✅ 🔴 **공용 날짜 경계 함수가 하루 밀려 있었다** — 예약·금고·주문기록 등 13곳 공통. 테스트 8건 신설(옛 코드 4건 실패로 반증)

**개발 완료 · 미배포 (SW 5.57):**
- ✅ **인보이스 대조 이름 학습** — 저장과 매칭의 전제가 어긋나 있던 것 수정(정규화·양방향·퇴화 방지)
- ✅ **「총액대로만 저장」** — 줄 단가는 원가에 반영 안 함 · 청구서 차액 줄 · 배너
- ✅ **디스크 81% → 32%** — 배포 백업 보관 30일→7일, 운영 113개·112GB 정리

**증명:** 실호출 144건 · 고장주입 9종 반증 · verify-all 22/22 · mount sweep 크래시 0 · 🔒 인쇄 보호파일 8/8 무변경 · **Fable 게이트 통과**(마커 `f8cac9eecc63`)

### 다음 확정 작업
- **⑤ SEO** — Fable 설계 판정 받음(백엔드가 마케팅 주소 HTML 생성 + www·끝슬래시 301). **Irene 승인 필요 3건**: 운영 nginx A·B, 개발 nginx C
- **⑥ 공급업체 공유 2단계** — Fable 판정 받음(공유=복사본·상속 종료). **운영 DB 읽기 1회 필요**(「수치 없이 마이그를 짜지 않는다」)
- (Irene 「순서대로 다해」 지시의 남은 두 건. ①②③④ 는 이번 세션에 완료)

### 👉 Irene 님이 하실 일
1. **운영 DB 읽기 전용 SELECT 2건 허가** — ③운영 정산서 1건(RM 305.15) 결제 여부 · ⑥공유 공급업체 실사용 수치. 문장 초안 = 스크래치패드 `prod-select-draft.sql`. **쓰기 0건**
2. **발주 41 인보이스 실물 파일** — ④의 「가격도 안 맞고」가 오독인지 실제 차이인지 가르려면 필요(파서 품질은 별건)
3. **⑤ nginx 승인 3건** — 승인 주시면 SEO 착수
4. **운영 1월 백업 1개 삭제**(권한) — `! sudo rm -rf /var/www/backups/20260128_205647` (137MB, 급하지 않음)
5. **배포 시점 결정** — SW 5.57(인보이스 대조)은 개발에만 있음. 배포 전 운영 쿼리 1회 권장(Fable): 「대조시각 있음 AND 전 줄 단가 null」 발주 0건 확인
6. 이전 목록(SEO Description 입력 · 개발 noindex · Search Console 중복 2건 주소) 유효

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **720px 화면에서 「Purple POS for Windows」 홍보 팝업이 버튼을 가린다**(Fable 이 실브라우저 검증 중 관찰). 인보이스 대조 화면의 「총액대로만 저장」 첫 클릭이 막혔다 — 팝업 위치 문제
- ② 멀티 컨텍스트 후속 4건(오너=별도 계정 · 승인 토글 OFF · 옛 계정 유지 · Staff 위임 안 함) — Fable 권고 있음
- ③ SOA 컨펌 3건(잔여분 기본 true · 마감일 현행 · 운영 읽기)
- 인보이스 대조 화면 e2e 영구 spec(이번엔 Fable 이 1회 증명만)
- 이전 목록 유효(브랜드 상품 값 채우기 · 미사용 i18n 키 · 구매비용 리포트 · order_deduct 보완)


<!-- 이전 기록 -->
### 👉 이전 배포분(v3.101) Irene 확인 목록
1. **PO-R8-20260924-001 짜장소스 교체** — 운영 GIT Consulting 받은 주문 → 그 주문 → 「품목 수정」 → 짜장 줄에서 `K-Jjajang Sauce_2nd` 선택 → 저장. 이 기능의 첫 실사용. (⚠ Ctrl+Shift+R 먼저)
   - 상태가 **주문 접수됨·확인됨**이어야 버튼이 보인다. 배송 시작 뒤면 안 보인다.
   - 금액이 원래보다 커지면 저장이 잠긴다 — 그때는 종전대로 거부 후 재발주.
2. ~~버전 올릴지 답~~ → **v3.100 으로 올림**(2026-09-24). 릴리즈 노트·블로그·공지 등록됨.

> ⚠ 운영 DB 읽기가 auto mode 분류기 `[Production Reads]` 로 막혀(2회 거부) 그 주문의 상태·품목을 **내가 확인하지 못했다**. 그래서 Irene 이 화면에서 직접 하시는 것이 가장 빠르다.


### 진행 중인 작업
- ⏸ **월 청구(SOA) 점검 — Fable 판정 대기** (2026-09-21 · Fable 한도 429 · Irene 「fable 한도 풀리면 할게」). 코드 무변경.
  - Irene 원문(09-21): 「지금 with min에 이상한 알림메일이 오고 2000년도라고 표시되어서 왔어. … 자동발행은 안되고 인보이스 합치는 기간이 월이면 1-31일 같은 달 게 다 합쳐져야 하고 지난 달게 발행되어야 하는데 이상해. 인보이스 발행일, 인보이스 발행하는 기간- 지난달 1-31일 이런 식으로 선택하게? 입력하게? 하고 결제마감일 7일 또는 7일동안 결제해도 된다고 알리거나 이런 식으로 되어야지.」 운영 SOA `SOA-BRD1-R10-M202609202104` RM 305.15 · Issued Oct 1 · Due Oct 15 · Period「-」 · 메일「January 2000」.
  - 실측(팀원): ①`soaScheduler.generateSoaNow` rangeStart=2000-01-01 이 메일 month 라벨로 → 「January 2000」 ②referenceDate=dueRef(오늘>dueDay 면 다음달 1일) → issued_at 미래 ③SOA 가 billing_period_start/end 미기입 → Period「-」 ④버튼은 실제 동작(9/20 21:04 UTC 생성·발송), 결과문구가 모달 하단·목록 재조회 없음 ⑤monthly_soa 면 Net 30 무시(`purchaseOrderService.computeDueDate`) — 화면엔 보임 ⑥cron 은 «지난달 createdAt» 만 → 이전 달 미결은 영구 누락, 달 경계 UTC ⑦개발 cron 매월 1일 동작 확인(9/1 SOA-BRD1-2026-08-R5), 운영은 DB 읽기 거부로 확인 불가.
  - 재개: 위 사실+Irene 원문을 Fable 에 그대로 전달해 설계 판정 1회(발행일·기간·마감일 칸 / 운영 잘못된 SOA 1건 정리 / Generate now 범위).

- ⏸ **인보이스 대조(발주 41 운영) — Fable 판정 대기** (2026-09-21). 코드 무변경.
  - Irene 원문: 「인보이스 체크해서 인보이스 항목이랑 item 매칭하면 학습해서 다음에 알 수 없어? 아니면 따로 저장을 해둘 수 없어?」 「그리고 뜨는 이름이 인보이스랑 완전 안맞아. 엉망이야. 이건 어떻게 해결하지?」 「이미지를 완전 거지같이 읽어서 이상한 리스트가 떠...... 가격도 안맞고.. 토탈 금액 정정해서 넣으면 결제는 그걸로 할 수 있게라도 해줄 수 없는 거지?」
  - 실측: ①학습 기능 이미 있음 — 대조 저장 시 `supplier_products.invoice_name` 에 기록(`cost-reconciliation.js:247`), 매칭 1단계가 사전 우선(`invoiceMatcher.ts:262`) ②결함: 저장값이 OCR 줄 통째(파서 실측 `"2 XXXXX BAWANG HOLLAND k#7% (KG) ."`) + 매칭은 «사전 낱말 전부 포함» → 두 자리 줄번호·잡음 토큰이 남아 다음 인보이스에서 안 걸림 ③사전은 seller_type='supplier' 만(브랜드 판매자 미기록) ④총액만 정정 저장 불가 — `computeReconciledTotal` 과 적은 총액 차 > RM 1 이면 TOTAL_MISMATCH 400(09-11 Irene 승인 ③), 결제는 대조된 청구서 금액 ⑤운영 발주 41·사진은 DB 읽기 거부로 확인 불가.
  - 판정 필요: 사전 저장 정규화·다중 이름·브랜드 판매자 / 「총액만으로 결제」 시 원가 처리(무접촉·조정줄·비례배분) / 사진 판독 품질.

- ⏸ **SEO C1 사전 렌더링 — Fable 판정 대기** (근거 = Irene 제공 Search Console 2026-09-21): 색인 6 · 미색인 12 · 3개월 클릭 24. 미색인 이유: Discovered–not indexed 6 · Crawled–not indexed 1 · Duplicate without user-selected canonical 2 · Page with redirect 2 · Alternative page with proper canonical 1. Irene 「그런데 방문자가 없어」. 크롤러가 받는 HTML 이 전 주소 동일(홈=/pricing 바이트 동일, 본문 46자, canonical 없음). Duplicate 2건 주소는 Irene 확인 대기(www 면 H6 로 해결). H2 site_name 은 /pos/admin/site-settings → Site Name (DB 기본값 'OrderHere POS' 그대로).
  - 같이 판정: **M3 블로그 주소 끝 숫자**(주소 변경=되돌리기 어려움). H6 www→apex 는 판정 불필요(방법 하나) — Cloudflare/운영 nginx 적용 안내만.

- ⏸ **공급업체 2단계 — Fable 판정 대기**: Irene 원문 「공급업체는 브랜드제너럴에서 브랜드에 공유해주고 싶으면 해주고 대신 수정 등록 모두 독립적으로 각각 운영하는 거야」. **5.51 로 BG 새 업체 비공유(shared_with_stores=0)까지 완료**, 남은 것 = «매장에 공유» 버튼(복사본 → 이후 각자 독립) · 이미 공유(1) 중인 업체 정리 방침. 설계 원본 `docs/SUPPLIER_CONTRACT_SYSTEM.md §H`.
- ⚠ 운영 SSH 불안정(2026-09-22 10:27~12:24 — 연결 reset 반복). 배포 1회가 백엔드 복사 뒤 끊겨 Irene 승인(「해.」)으로 DB 칸 추가만 SSH 1회 선실행 → 재배포로 정상화. 반복되면 운영 호스팅 콘솔에서 fail2ban·부하 확인 필요.

### 👉 Irene 님이 하실 일
1. **SEO Description** 입력(운영 `/pos/admin/site-settings`, 칸 밖 클릭으로 저장) · 브랜드 표기 «Purple Here» vs «PurpleHere» 통일 답
2. **개발 사이트 noindex**: `! sudo cp /etc/nginx/sites-enabled/dev.purplehere.com /etc/nginx/dev.purplehere.com.bak-20260921 && sudo cp /var/www/docs/nginx-dev.purplehere.com.noindex.conf /etc/nginx/sites-enabled/dev.purplehere.com && sudo nginx -t && sudo systemctl reload nginx`
3. Search Console «Duplicate without user-selected canonical» 2건의 주소 알려주기 (www 면 H6 로 해결)
4. 운영 확인: with MIN·K-DINE 발주 카탈로그에 PRD-162·PRD-050 보이는지 · GIT Sales Orders 품목명 = 프로덕트명 · 발주 기록·받은 주문 정렬
5. 답 대기: 버전 v3.100 올릴지 · 「인보이스 교체(다시 올리기)」 버튼 추가할지

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
