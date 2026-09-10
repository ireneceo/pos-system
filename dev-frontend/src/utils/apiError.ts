// Extract a human-readable message string from a parsed API error body.
// Backend error shapes vary: { error: { message, code } } (standard), { message },
// or legacy { error: 'string' }. Passing the raw { message, code } object into a
// React child or setState<string> throws React error #31 / renders "[object Object]".
export function getErrorMessage(data: any, fallback = 'Something went wrong. Please try again.'): string {
  if (!data) return fallback;
  // message 가 글자일 때만 쓴다 — 객체가 들어오면 그걸 그대로 돌려주는 순간
  // 이 함수가 막으려던 React #31 이 그대로 난다 (2026-09-10 회귀 테스트가 잡음).
  if (typeof data.error === 'object' && typeof data.error?.message === 'string' && data.error.message) return data.error.message;
  if (typeof data.message === 'string' && data.message) return data.message;
  if (typeof data.error === 'string' && data.error) return data.error;
  return fallback;
}
