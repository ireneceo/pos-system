// Extract a human-readable message string from a parsed API error body.
// Backend error shapes vary: { error: { message, code } } (standard), { message },
// or legacy { error: 'string' }. Passing the raw { message, code } object into a
// React child or setState<string> throws React error #31 / renders "[object Object]".
export function getErrorMessage(data: any, fallback = 'Something went wrong. Please try again.'): string {
  if (!data) return fallback;
  if (typeof data.error === 'object' && data.error?.message) return data.error.message;
  if (typeof data.message === 'string' && data.message) return data.message;
  if (typeof data.error === 'string' && data.error) return data.error;
  return fallback;
}
