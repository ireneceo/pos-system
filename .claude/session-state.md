## 현재 작업 상태
**마지막 업데이트:** 2026-03-03
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **Floor Plan Editor 장식 요소 추가** — Counter(H/V), Kitchen/Entrance 텍스트형
- **사이드바 아이콘 6개** — Round, Square, Rect(H/V), Counter(H/V)
- **Size 프리셋 (S/M/L)** — Properties 패널에서 원클릭 사이즈 변경
- **캔버스 풀 사이즈** — aspect-ratio 제거, 위아래 여백 없음
- **viewBox 대칭 패딩** — 좌우/상하 균등 여백
- **선택/삭제 버그 fix** — 드래그 후 선택 유지
- **사이드바 스크롤 독립** — 캔버스 위치 고정
- **시간 표시 제거** — 테이블 노드에서 경과 시간 제거
- **letter-spacing 제거** — 라벨 자간 정상화
- **정사각형 기본 seats 2**

### 다음 할 일
- Payment Settings 통화별 Additional Charges 설계 및 구현
- 운영서버 배포

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
