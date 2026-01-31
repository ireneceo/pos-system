## 현재 작업 상태
**마지막 업데이트:** 2026-01-31
**작업 상태:** Phase A-3+ 개발 진행 중

### 완료된 작업
- Phase A-1: Reports 페이지 CSV 다운로드 버그 수정 및 체계화
- Phase A-2: Invoice 페이지 PDF 다운로드 버그 수정
- Phase A-3+: 최종 기획 문서 작성 완료

### Phase A-3+ 기획 문서

**파일 위치:** `/var/www/.claude/PLANNING-Phase-A3.md`

**포함 내용:**
1. Task 1: Addon Module 5개 비활성화
2. Task 2: 랜딩 페이지 (Pricing, Contact, Demo)
3. Task 3: 7일 무료 체험 시스템 (System Admin 전용 옵션)
4. Task 4: 미결제 서비스 차단 API 구현
5. Task 5: BrandGeneral/FoodcourtGeneral 구독 플랜 분리 (Phase B)

### 현재 로드맵

**Phase A: 오픈 필수**
| 순서 | 작업 | 상태 |
|:----:|------|:----:|
| 1 | Addon Module 5개 비활성화 | 🔄 진행중 |
| 2 | Pricing 페이지 | ⬜ 대기 |
| 3 | Contact 페이지 + API | ⬜ 대기 |
| 4 | Demo 페이지 + 데모 계정 | ⬜ 대기 |
| 5 | 트라이얼 시스템 | ⬜ 대기 |
| 6 | 미결제 서비스 차단 API | ⬜ 대기 |

**Phase B: 오픈 직후**
- BrandGeneral/FoodcourtGeneral 구독 플랜 분리
- 데모 데이터 자동 리셋 cron job

**Phase C: 고객 피드백 후**
- 결제 연동 (Stripe/PayPal)
- 자동 갱신 시스템
- 세금계산서 발행

### 핵심 결정 사항
- 트라이얼 옵션: System Admin만 사용 가능
- Brand/Foodcourt General이 추가하는 레스토랑: 트라이얼 없음 (이미 구독 중)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
