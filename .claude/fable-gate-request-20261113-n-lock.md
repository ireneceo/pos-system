# Fable 재판정 요청 — «N 잠금» 정정 (판정서 fable-verdict-20261113-setup-device-n-lock.md §3·§4)

- 고치기 전/후 «이 파일 뺀 나머지 diff» 해시: 전 3e99af32d6c9… · 후 3e99af32d6c9… (같음) · 미추적 목록 해시(판정서·새 테스트 제외) 전/후 dc1681c053f8… 같음
- 바뀐 것: dev-frontend/src/pages/Settings/PrinterDeviceScope.tsx(아래 diff) · 설계 문서 §2-3 N 줄 정정 · 새 jest dev-frontend/src/pages/Settings/PrinterDeviceScope.test.tsx(훅 단위 5건)

```diff
diff --git a/dev-frontend/src/pages/Settings/PrinterDeviceScope.tsx b/dev-frontend/src/pages/Settings/PrinterDeviceScope.tsx
index f4fe75ae3..62661ed9f 100644
--- a/dev-frontend/src/pages/Settings/PrinterDeviceScope.tsx
+++ b/dev-frontend/src/pages/Settings/PrinterDeviceScope.tsx
@@ -4,7 +4,8 @@
  * 설계: .claude/fable-design-20261110-printer-settings-device-scope.md (Fable)
  * Irene «레스토랑 프린터 설정을 한 디바이스에서 다른 곳에서 안하게. 하려면 확인을 하고 바꾸게 조심스럽게 잘 분리해줘야 해»
  *
- * - 상태 N(아직 없음) · M(이 기기) · O(다른 기기). 열림 = 관리자 && (M || O 에서 확인한 이번 방문).
+ * - 상태 N(아직 없음) · M(이 기기) · O(다른 기기). 열림 = 관리자 && (N || M || O 에서 확인한 이번 방문).
+ *   N 은 관리자에게 바로 연다(2026-11-13 Fable 정정 .claude/fable-verdict-20261113-setup-device-n-lock.md — 6.18 에서 기존 매장 관리자가 전부 잠김). 자동 지정은 없음 · 지정은 버튼으로만.
  * - «이번 방문 확인함» 은 화면 상태뿐 — 새로 고침하면 다시 잠긴다.
  * - 기기 번호 = 인쇄 자가진단의 getDeviceId() (새로 만들지 않음). 인쇄 경로(🔒 billPrint 등)는 이 파일을 읽지 않는다.
  * - 서버 판정 = dev-backend/utils/printerSetupDevice.js (화면은 실수 방지, 경계는 서버).
@@ -71,7 +72,7 @@ export function usePrinterDeviceScope(opts: { canEdit: boolean; tag: SetupDevice
   const hasId = !!device.id && device.id !== 'dev-ephemeral';
   const [unlocked, setUnlocked] = useState(false);
   const state: ScopeState = !tag || !tag.id ? 'N' : (hasId && tag.id === device.id ? 'M' : 'O');
-  const editable = canEdit && !loading && !error && (state === 'M' || (state === 'O' && unlocked));
+  const editable = canEdit && !loading && !error && (state === 'N' || state === 'M' || (state === 'O' && unlocked));
   return { device, hasId, state, unlocked, setUnlocked, editable };
 }
 
```

## 검증 숫자
- 실브라우저(최종 번들 · 데모 38 · 원본 MD5 복원 일치):
  - V1 관리자·N: 잠긴 칸 0 · 지정 버튼 보임 · 인쇄 형식 auto→text 저장 → DB printFormat=text · setupDevice 안 생김 · 새로고침 뒤 값 text · 화면 오류 0
  - V2 직원·N: 잠긴 칸 21(어제와 같음) · 비상 모드 «켜기» 누를 수 있음
  - V3 관리자·O: 처음 21 잠김 → «이 기기에서 바꾸기…» 확인 뒤 0 → 새로고침 21
  - V4 관리자·M: 잠긴 칸 0 · 상태 줄 «이 기기가 프린터 설정 기기» 보임
  - V5 관리자·N·불러오기 실패(GET /api/restaurants/38 차단 1회 확인): 잠긴 칸 16 · 열린 select 1(이 기기 종류 고르기 · 기기 안 값) · 저장 요청에 printer_settings 0건 · «불러오지 못했습니다» 문구
- 고장 주입: 훅 jest 5/5 → 옛 줄로 되돌리면 «N · 관리자 → 열림» 1건 실패 → 원복(cmp 동일) 5/5. 원복이 파일 시각을 바꿔 빌드 1회 더 함(시각 조작 안 함).
- 기계: print-guard 8/8 · health-check print 14/14 · verify-all --full 23/24(실패 = 배포 준비 기록·SW 버전 — 배포 준비 몫) · check-sensitive-diff = ③⑤ 대상(인쇄 지킴이분 포함).
