/**
 * roleRouteDeny — 역할별 **명시 거부** 경로. 허용 목록보다 **우선**한다.
 *
 * 왜 따로 있나 (2026-09-06 Fable 게이트에서 잡힌 것):
 *   프론트 라우트 가드는 **세 겹**이고 서로 다른 목록을 본다.
 *     ① `requiredRole`            — App.tsx 의 <ProtectedRoute> 인자
 *     ② `ROLE_ROUTES/canAccessRoute` — AuthContext. **ProtectedRoute 만** 쓴다(진입 차단)
 *     ③ `isRouteAllowed`          — hooks/useAllowedRoutes. 플랜 기반 **서버 목록**.
 *                                    **사이드바 표시는 이것이 정한다.**
 *   ②만 고치면 **진입은 막히는데 메뉴는 그대로 보인다**(누르면 대시보드로 튕김).
 *   실제로 그렇게 해 놓고 "메뉴가 사라진다"고 보고했다가 게이트에서 잡혔다.
 *   → 거부 목록을 **한 파일**에 두고 ②③이 같이 읽는다. 복사하면 곧 갈라진다.
 *
 * ⛔ 추가형이다 — 목록에 없으면 아무것도 막지 않는다.
 * ⛔ "서버가 막는 것을 화면도 막는다"는 자리다. 서버를 넓히는 용도가 아니다(프론트 폭 ≤ 서버 폭).
 */
export const ROLE_ROUTE_DENY: Record<string, string[]> = {
  // 결제 설정 = 돈 경계. 서버 `brands-core.js` 의 payment-settings GET/PUT 이
  // Brand Manager 를 **일부러 403** 으로 막는다(Stripe/PayPal·은행계좌·구독금액).
  'Brand Manager': ['/pos/brand/payment-settings'],
};

/** 이 역할에게 이 경로가 명시 거부인가. `/*` 접미는 접두 매칭. */
export const isRouteDenied = (role: string | undefined, route: string): boolean => {
  if (!role) return false;
  const list = ROLE_ROUTE_DENY[role];
  if (!list) return false;
  return list.some(p => (p.endsWith('/*') ? route.startsWith(p.slice(0, -2)) : route === p));
};
