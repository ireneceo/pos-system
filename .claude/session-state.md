## 현재 작업 상태
**마지막 업데이트:** 2026-01-31
**작업 상태:** 완료

### 완료된 작업
- Phase A-1: Reports 페이지 CSV 다운로드 버그 수정 및 체계화
- Phase A-2: Invoice 페이지 PDF 다운로드 버그 수정

### Phase A-2 구현 내용

**문제:** PDF 렌더링 타이밍 불안정 (150ms setTimeout이 불충분)

**해결:** 폰트/이미지 로딩 완료 후 캡처하도록 수정

**수정된 파일 (4개):**
- `dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx`
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx`
- `dev-frontend/src/pages/Restaurant/InvoicesPage.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx`

**변경 내용:**
```typescript
// 기존: 고정 대기 (불안정)
await new Promise(resolve => setTimeout(resolve, 150));

// 변경: 폰트/이미지 로딩 완료 대기 (안정적)
await new Promise<void>(async (resolve) => {
  // 1. 폰트 로딩 대기
  if (iframeDoc.fonts?.ready) await iframeDoc.fonts.ready;
  // 2. 이미지 로딩 대기
  const images = iframeDoc.querySelectorAll('img');
  await Promise.all(Array.from(images).map(...));
  // 3. 레이아웃 안정화
  setTimeout(resolve, 100);
});
```

### 현재 로드맵

**Phase A: 오픈 필수**
| 순서 | 작업 | 상태 |
|:----:|------|:----:|
| 1 | CSV 다운로드 버그 수정 (Reports) | ✅ 완료 |
| 2 | PDF 다운로드 버그 수정 (Invoice) | ✅ 완료 |
| 3 | Pricing 페이지 | ⬜ 진행예정 |
| 4 | Contact 페이지 | ⬜ |
| 5 | 랜딩페이지 SEO 최적화 | ⬜ |

**Phase B: 오픈 직후** - FAQ, 데모 콘텐츠, 이메일 템플릿

**Phase C: 고객 피드백 후** - 셀프 회원가입, Stripe/PayPal, 세금계산서

### 다음 할 일
1. Phase A-3: Pricing 페이지

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
