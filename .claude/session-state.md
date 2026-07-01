# Purple POS — 개발 세션 상태

## 현재 작업 상태

**마지막 업데이트:** 2026-07-01 #2
**버전:** 운영=**v3.66 / SW 4.54** (2026-07-01 배포, Backup 20260701_201256, Smoke 9/9)
**작업 상태:** 완료 (설계 세션 — 코드 무수정)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 데스크탑앱 설계, 2026-07-01 #2)
- **데스크탑앱(Electron, QZ 대체) 사전 전체점검** — git clean·print-guard 8/8·health 107/107 정상. 병렬 조사 3건: QZ 접점 전수(송신=`sendHTMLViaQZTray`/`sendViaQZTray` 2함수+printTableQR raster, billPrint 93% 재사용) / 브라우저 의존성(origin 의존 다수 → 로컬 번들 불가) / 환경(Win7 실기기 존재, CORS·nginx 이슈 없음).
- **설계 확정** — 단일 진실 = `docs/DESKTOP_APP_DESIGN.md`. D1 원격 URL 로드 / D2 QZ 투명대체(`__NATIVE_PRINT` feature-detect, 설정 마이그 0) / D3 인쇄 구조(폴러 단일경로) 불변—전송만 / D4 Win10/11 전용·Win7=웹+QZ 공존 / D5 Electron+NSIS. billPrint 절단면 8지점 명세(§5), 브릿지 API 계약(§4), P0~P4 플랜(§7).
- **역할 분담 확정 (Irene)** — 개발=Opus(노트북, §11 킥오프 프롬프트), 점검=Fable(서버). **P2(billPrint 절단면)는 Fable 게이트(§7-1 체크리스트) 통과 전 P3 진행 금지.**
- **Irene 결정 반영** — 코드사이닝=나중에(파일럿 미서명, "고객 셀프 설치" 단계에 재검토) / **파일럿=thefire POS1**(P4 전 Win10/11 확인 필수) / Win7 교체 시기 미정.
- **CLAUDE.md "Fable 검증 게이트" 신설** — 중요·복잡 개발은 Fable 검증 1회 표준. 대상 기준 5개(🔒보호영역/돈·주문 무결성/운영 DB마이그/신규시스템·아키텍처/보안경계) + 검증내용 4개 + 남발금지. 타 서버 공유용 정리본 Irene에게 전달됨.
- 메모리 `project_desktop_app_electron.md` 신규.

### 다음 확정 작업
- **데스크탑앱 개발 착수 = Opus (Irene 노트북)** — 킥오프: `docs/DESKTOP_APP_DESIGN.md` §11 프롬프트 붙여넣기. P0 스캐폴드부터, 위치=리포 `desktop-pos/`.
- **Fable(이 서버 세션) 몫**: Opus가 P2 완료 커밋하면 §7-1 체크리스트로 게이트 점검 (diff 8절단면 대조 + print-guard + 브라우저 경로 불변 + health print 회귀). P1/P3는 후속 점검.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 오더노트 주방티켓 **실프린터 눈확인** (v3.66 배포됨, 매장 첫 티켓에서 메모 확인 — 이상 시 알림).
- 오프라인 주문 편집 액션 배선 (비핵심, 백엔드 opId가드 준비됨).
- IOI Mall 매출 API 운영 전환 (몰이 운영 URL/자격증명 줄 때 environment=production).
- KDS All 탭에서도 개별 음소거 반영할지 (현재 All=마스터 전용).
- 데스크탑앱 P5: Android(Capacitor) 검토 / Win7 기기 하드웨어 교체 계획.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
