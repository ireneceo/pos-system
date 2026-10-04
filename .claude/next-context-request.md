# 다음 작업 — 선택 화면 «역할 추가 요청» (2026-10-04 보류, Irene 「fable이 설계한대로 저장만 하고 다음에 구현하자」)

## Irene 최종 의도 (원문 순서)
- 「이미 멀티 로그인 중에 추가신청 할 수 있어야 하는데 왜 없어? /pos/select-context … 맨 아래 … 리스트 아래에.」
- 「원래 그냥 신청해서 트라이얼 기간 들어가는데 왜 신청이 들어간다는 거야?」 → 「랜딩페이지에서 처음 신청하는 프로세스랑 같아야 하는 거 아니야? 다만 더 심플한거고」
- **정정**: 「그러네. 추가할 때 역할을 추가하는 거지 구독을 추가하는게 아니네. 스탭으로 추가되는 것도 하는 거잖아. 내가 헷갈렸어」 · 「멀티로그인에 내 역할별도 다 로그인되게 하는 거잖아. 그치?」
- 결론: **기존 사업에 역할을 붙여 달라는 요청 → 승인 → 선택 화면 카드**. 새 사업·구독 생성(v2) 아님. **직원(Staff) 역할 포함**이 v1 대비 추가 요구.

## 설계 출발점
- Fable v1(요청 → SA 승인, 표 `user_context_requests`, `grantContext` 단일 쓰기 경로, 선택 화면 맨 아래 «+ 자격 추가 요청», 스위처·퀵액션 SA 외 상시 표시, Staff Management 상단 패널) — 이 세션 기록의 v1 본문 기준.
  `.claude/fable-design-20261004-context-request.md` 는 지금 **v2(사업 추가) 로 덮어써진 상태 = 폐기안**. 다음 설계 때 Fable 이 v1 을 다시 쓰되 아래를 정한다:
  - Staff 역할 요청 — 승인 주체(그 매장 RA 인가 SA 인가), Staff permissions 기본값, `user_contexts` 의 Staff 조합 허용 여부(현재 GRANTABLE 에 없음).
- 보존 코드: `.claude/next-context-request-grantContext.patch` — `routes/users.js POST /:id/contexts` 본문을 `services/userContexts.grantContext` 로 추출(+GRANTABLE_COMBINATIONS·isGrantableCombination·isOwnerGrantCombination·loadGrantEntity·alreadyHoldsContext·nativeHoldConflict). dev 에서 user-contexts-switch 38/38 통과 확인된 상태. `git apply` 로 되살린다.
- 폐기·삭제됨: v1 요청 표·라우트·메일·UC-005/006·테스트 31건(구현 팀원이 v2 전환 때 지움, 백업 없음 — 설계 v1 그대로 다시 구현), v2 addBusiness·브랜드/푸드코트 소유 카드(테스트 8건 깨뜨림 → 되돌림).
