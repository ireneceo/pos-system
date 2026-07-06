# Brand General + Restaurant Owner 전수감사 (2026-07-03)

> ⚠️ **상태 정정 (2026-07-06 실측)**: 이 문서의 "후속/잔여" 표기 다수가 **낡음(stale)**. 실측 결과 이미 완료·배포됨: **#9 매니저매출·#31 전화입력·인벤토리 클러스터 #5/6/23/35/36·보안 5건(#7/11/12/16/33)** = 전부 v3.67에 배포됨. **진짜 잔여는 2건뿐**: **#8 매니저 리포트 가짜매출(Math.random)** + **#24 매니저 구독 변경/취소 미배선("Coming Soon")** = 유료출시 필수. 선택: #38 고객분석 스텁·Owner Operations Math.random. 다음 세션 작업목록은 `.claude/session-state.md` "🎯 다음 확정 작업" 참조.

Fable 감사(실브라우저+증거) → 적대적 검증 → Opus 수정. 데모: BG=`demo_brand_general`(user22, brand10&17), Owner=`demo_multi_owner`(user289).

## 결과: 40건 (HIGH 16 / MED 17 / LOW 7)

### ✅ 이번 세션 수정 완료 (실 API/실브라우저 검증)

| # | 심각도 | 영역 | 수정 | 검증 |
|---|:---:|------|------|:---:|
| 11 | H | activity-logs IDOR | `/user/:id` self/admin/supervisor 게이트 | ✓ 403/200 |
| 12 | H | invoice 상태 PATCH 권한없음 | payer/issuer/admin 게이트 | ✓ 403/200 |
| 16 | H | notification SMTP 소유권없음 | userCanAccessEntity 게이트(GET/POST/test) | ✓ 403/200 |
| 7 | H | BG 구독 매장목록/POST 스코프누락 | 소유 브랜드/푸드코트로 제한+self | ✓ scoped |
| 13 | H | owner 댓글 POST 500 | author_name→email 폴백 | ✓ 200 |
| 14 | H | owner 업무매뉴얼 POST 500 | author_name→email 폴백 | ✓ 200 |
| 3 | H | 브랜드상품 삭제 500(FK) | 배포링크(BrandProductBrand/Restaurant) 선삭제 | ✓ |
| 4 | H | 브랜드메뉴 옵션그룹 삭제 500 | 자식옵션 선삭제 | ✓ 200/0 |
| 20 | M | 브랜드상품 옵션그룹 삭제 500 | 자식옵션 선삭제 | ✓ |
| 2 | H | 브랜드 주소 city/state/postal 저장안됨 | PUT 전체 주소필드 저장 | ✓ round-trip |
| 1 | H | 브랜드코드 중복→React#31 크래시 | setError 메시지문자열 추출 | ✓ build |
| 22 | M | 저장에러 오브젝트→#31 (상품탭들) | 공용 getErrorMessage 유틸 | ✓ build |
| 17 | M | 브랜드삭제 실패 피드백없음 | deleteError 표시+응답표준화 | ✓ |
| 18 | M | Export 버튼 死 | CSV 내보내기 onClick | ✓ |
| 10 | H | Performance 매출 50건 캡 | orders fetch `limit=0` | ✓ |
| 19 | M | Performance completed만 집계 | completed+served(맵과 일치) | ✓ |
| 26 | M | Performance 성장률 항상+100% | 이전기간까지 fetch | ✓ |
| 27 | M | Performance Export 死 | CSV onClick | ✓ |
| 29 | M | Reports Operations Math.random | 실주문 파생 operationsStats | ✓ |
| 37 | L | Reports Best Seller "Unknown" | item.menuItem.name 폴백 | ✓ |
| 28 | M | Reports 필터검색 타이핑불가(리마운트) | `<FilterComponent/>`→`{FilterComponent()}` | ✓ |
| 30 | M | Owner Reports 필터 리마운트 | 동일 | ✓ |
| 25 | M | Manager Invoices 월필터 2024고정 | invoices에서 동적 생성 | ✓ |
| 34 | L | 계약 파이프라인 ISO원문 노출 | substring(0,7) | ✓ |
| 15 | H | Owner 알림토글 첫클릭 no-op+타항목 wipe | loadPreferences가 preferencesRef 동기화 | ✓ |
| 33 | M | Owner 이메일설정 bogus restaurant/{uid} | admin/{uid} self-entity + 백엔드 self 허용 | ✓ 200/403 |
| 39 | L | Owner 매장 무변경저장 null→'' | 주소필드 `||null` 정규화 | ✓ |

### 🔶 후속(기능규모 — 실엔드포인트/청구흐름/공용컴포넌트 필요)

| # | 심각도 | 영역 | 필요 작업 |
|---|:---:|------|------|
| 8 | H | Manager Reports **100% mock** | 실 /api/restaurants + /api/orders 집계로 재작성 |
| 9 | H | Manager Sales **하드코딩 0** | 실 orders fetch+집계로 재작성 |
| 5 | H | 브랜드재고 설정 404 | 브랜드모드 엔드포인트(현재 /restaurants/undefined) |
| 6 | H | 브랜드재고 발주 404 | 브랜드모드 seller-sources 엔드포인트 |
| 36 | L | 브랜드재고 History 미기록 | product ingredient 트랜잭션 기록 백엔드 |
| 23 | M | 브랜드재고 잘못된 route nav | 브랜드모드 경로 수정(#5·6·36과 묶음) |
| 35 | L | 브랜드재고 Dismiss no-op | 브랜드모드 alert resolve |
| 38 | L | Reports Customer Insights 죽은 스텁 | 고객분석 엔드포인트+UI |
| 24 | M | Manager 구독 변경/취소 미저장 | 청구흐름(pending_plan_type) 정식 배선 — Fable게이트(돈) |
| 31 | M | Owner 전화 PhoneInput 오파싱 | 공용 PhoneInput 수정(광범위 영향, 신중) |
| 40 | H(→M) | PO승인큐 Seller '-' | ✅ 백엔드 seller_name enrich 완료(프론트 표시 확인 대기) |
| 32 | M | Owner History 당일 누락 | ✅ end_date inclusive 완료 |
| 21 | M | 브랜드상품 복사 배포누락 | ✅ 배포링크+distribution_mode 복사 완료 |

> 40번/32번/21번은 백엔드 완료(위 표에 재기입). 후속 표의 나머지 10건이 실제 잔여.

## 보안 참고 (배포 시 Fable 게이트)
보안 5건(#7,11,12,16 + #33 self-entity)은 CLAUDE.md 보안경계 → 배포 전 Fable 점검 권장. 운영 배포는 Irene /배포 지시만.
