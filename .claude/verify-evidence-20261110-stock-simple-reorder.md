# 자체 검증 기록 — 재고 «발주 기준» 한 숫자 (2026-11-10 · [Claude Code] Opus)
설계: `.claude/fable-design-20261110-stock-simple-reorder.md`

## 1. 식 (jest tests/reorder-math.test.js) — 20/20
- 기존 «10×2+15=35» → 15 (의도된 변경) · 제안 75 → 55
- C 사례 2 → 4.5 (사용량 0 · 채울 여유 = 기준×0.5)
- 새 4건 (a) min5·하루10·리드2: 재고6 soon / 재고5 order_now (b) min10·사용량0·재고2 → 13, 15 → ok (c) 자동 24 그대로 · level_source auto (d) 둘 다 0 → no_basis/none

## 2. 전후 대조 (매장 38 · 브랜드 10 `/purchase-orders/suggestions`, 변경 전 스냅샷 대비)
summary 변화 0 (r38 out4 order_now0 soon0 ok11 no_basis16 · b10 out5 soon2 no_basis14) · no_basis_ids 동일
수량만 바뀐 줄 7건 — 전부 min>0 · 사용량 0 (설계 기대):
| 곳 | id | 이름 | min | 하루 | 단계 | 제안(취급단위) |
|---|---|---|---|---|---|---|
| r38 | 49052 | Check SP Link ra 97849 | 3 | 0 | out→out | 3→4.5 |
| r38 | 49053 | Check SP Link ra2 27088 | 3 | 0 | out→out | 3→4.5 |
| r38 | 49054 | Check SP Link ra 62048 | 3 | 0 | out→out | 3→4.5 |
| b10 | 13 | Green Tea Powder | 2 | 0 | out→out | 2→3 |
| b10 | 13324 | Check SP Link bg 40490 | 3 | 0 | out→out | 3→4.5 |
| b10 | 13325 | Check SP Link bg 31490 | 3 | 0 | out→out | 3→4.5 |
| b10 | 13326 | Check SP Link bg2 27088 | 3 | 0 | out→out | 3→4.5 |
단계가 바뀐 줄 0 (데모 데이터에 min>0 · 사용량>0 품목이 없음 — 그 경우는 health-check 새 검사가 품목을 만들어 증명). 설계 밖 변화 0.
auto_levels: r38 {} · b10 {7: 6, 8: 4.8, 10672: 1440}

## 3. 불변식 health-check 1건 추가 «발주 기준 한 숫자 — 매장 38»
- 기준5·하루10: 재고6 → soon(발주점 5) · 재고5 → order_now · 자동 품목 auto_levels 24 · 정한 품목은 auto_levels 에 없음
- 목록 전 줄: min>0 이면 «가용 ≤ 0 또는 가용+오는 중 ≤ min» ⇔ out/order_now
  · 설계 §5-3 문구는 «가용+오는 중 ≤ min ⇔ out/order_now» 였으나 실측 반례(id 46: 가용 0 · 오는 중 13 · min 5 → out)가 있어 classify 첫 갈래(가용 ≤ 0 → out, 11-03 설계 그대로)를 넣어 고쳤다.
- 고장주입: compute 의 발주점을 옛 식(사용량×리드+min)으로 되돌림 → pm2 restart → jest 3 실패 · 이 검사 실패(재고6 order_now · rp 25) → 원복 → 20/20 · 통과
- C5 기대값 8 → 13 (의도된 변경)
- health-check 전체 476/476

## 4. 실브라우저 (dev.purplehere.com · 매장 38 RA · 브랜드 BG · Playwright · mem-slot) 19/19
재고 6/5/0 → Running low/Order now/Out of stock · 발주 기준 칸 5.00 kg · 상태 필터 5개 · 띠 «지금 발주» 1 = 걸린 행 1 · 설정 창 보이는 칸 2(접힘) · 미리보기 · 저장 직후 배지 갱신(기준 3 → Running low) · 저장 = min_stock 만(리드 2·여유 20 그대로 — 예전엔 1·20 덮어씀) · 대시보드 옛 블록 0 · ko/zh/ms 키 노출 0 · 폰 390px 넘침 0 · 브랜드 띠·설명·칸 · console.error 0
확인용 품목: 매장 38 «Check Reorder Flour»(id 49579, 기준 5 · 재고 6 · 하루 10 수동) — 남겨 둠

## 5. 가드
print-guard 8/8 변경 없음 · design-guard 신규 0 · 타입 기준 신규 0(382/436) · i18n:verify 오류 0 · eslint 바뀐 파일 경고 0 · 빌드 1회 성공

## 6. verify-all --full (1회) — 22/24
- ✓ mount sweep 8역할 크래시 0 (779s) · 타입 기준 · i18n · print-guard · design · 인스펙션 · 계약 테스트 등
- ✗ 배포 준비: 릴리즈 기록 파일·SW 버전 — 배포 준비 단계 몫(작업방에서 안 함, 지난 방들과 같음)
- ✗ health-check (verify-all 안에서): 실패 줄은 출고 뒤 수량 정정 C1~C10 · AC6 · P1~P8 · P3 · Q6 (발주 제안 공식과 무관한 출고·수령 검사). 바로 뒤 단독 재실행 476/476 통과(이 작업 중 단독 실행 2회 모두 476/476). 원인 확인 못 함 — 같은 시각 다른 실행과의 데이터 겹침으로 추정(확인 불가).
