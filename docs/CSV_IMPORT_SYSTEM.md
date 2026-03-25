# CSV 주문 Import 시스템

> **최종 업데이트**: 2026-03-25
> **목적**: 기존 POS 시스템의 주문 내역을 CSV로 가져와서 매출 리포트에 반영
> **위치**: System Settings > Import Data 탭 (Restaurant Admin 전용)

---

## 개요

- 카테고리/메뉴/옵션은 **메뉴 관리 페이지에서 직접 등록** (CSV 아님)
- **주문 내역만** CSV로 업로드
- 업로드 시 메뉴 이름 자동 매칭 → 매칭 안 되면 수동 매칭 UI 제공
- 금액은 CSV 원본 그대로 (재계산 안 함)

## 지원 형식

| 형식 | 설명 | 필수 컬럼 |
|------|------|-----------|
| **Summary** | 1행=1주문 | date, total_amount |
| **Detail** | 1행=1아이템 | date, item_name, quantity, unit_price |

자동 감지: item_name + quantity 컬럼이 있으면 detail, 없으면 summary

## 자동 매핑

CSV 컬럼명을 정규화(소문자, 공백/언더스코어 제거)해서 매칭:
- "Transaction Date" → date
- "Grand Total" → total_amount
- "Pay Method" → payment_method

## Unmatched 메뉴 매칭

Detail 형식에서 메뉴 이름이 DB와 다르면 unmatched로 표시.
Import 후 매칭 UI에서 드롭다운으로 수동 매칭 가능.
매칭하면 order_items의 product_id가 업데이트됨.

## Import History + Undo

- `import_history` 테이블에 batch 기록
- 각 batch의 imported_ids 저장
- Undo 시 해당 batch의 주문 일괄 삭제

## API

```
POST /api/import/preview — CSV 파싱 + 자동 매핑
POST /api/import/execute-orders — 주문 임포트
POST /api/import/apply-matching — unmatched 메뉴 매칭 적용
GET /api/import/history — 히스토리 조회
GET /api/import/stats — 현재 데이터 건수
DELETE /api/import/undo/:batchId — batch 삭제 (undo)
```

## 파일

- `routes/import.js` — API
- `models/ImportHistory.js` — 히스토리 모델
- `components/Settings/ImportDataTab.tsx` — 프론트 UI
