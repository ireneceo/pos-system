// Parse a standardized API error response into a flat shape the UI can render.
// Backend shape (after middleware/errorHandler.js):
//   { success: false, error: { message, code, fieldErrors?, hint?, details?, timestamp } }
//
// Usage:
//   const result = await fetch(...);
//   if (!result.ok) {
//     const err = await parseApiError(result);
//     // err.message — top-level toast/banner
//     // err.fieldErrors — { fieldName: message } to render under each input
//     // err.hint — optional secondary line ("Try X")
//     // err.code — programmatic switch (e.g. 'DUPLICATE', 'TOKEN_EXPIRED')
//   }

export interface ParsedApiError {
  message: string;
  code: string;
  fieldErrors?: Record<string, string>;
  hint?: string;
  status?: number;
}

const FALLBACK: ParsedApiError = {
  message: 'Something went wrong. Please try again.',
  code: 'UNKNOWN'
};

export async function parseApiError(response: Response): Promise<ParsedApiError> {
  let payload: unknown = null;
  try {
    const text = await response.text();
    payload = text ? JSON.parse(text) : null;
  } catch {
    return { ...FALLBACK, status: response.status };
  }
  return parseApiErrorBody(payload, response.status);
}

export function parseApiErrorBody(payload: unknown, status?: number): ParsedApiError {
  const data = (payload || {}) as Record<string, unknown>;
  // Modern format: { success: false, error: { message, code, fieldErrors, hint } }
  const errObj = (data.error && typeof data.error === 'object' ? data.error : null) as Record<string, unknown> | null;
  if (errObj) {
    const fieldErrors = errObj.fieldErrors && typeof errObj.fieldErrors === 'object'
      ? errObj.fieldErrors as Record<string, string>
      : undefined;
    // Legacy details: [{field, message}] → fieldErrors map
    const details = Array.isArray(errObj.details) ? errObj.details : null;
    let mergedFieldErrors = fieldErrors;
    if (!mergedFieldErrors && details) {
      mergedFieldErrors = {};
      details.forEach((d: any) => {
        if (d && d.field) mergedFieldErrors![d.field] = d.message || 'Invalid';
      });
    }
    return {
      message: (errObj.message as string) || FALLBACK.message,
      code: (errObj.code as string) || 'UNKNOWN',
      fieldErrors: mergedFieldErrors && Object.keys(mergedFieldErrors).length > 0 ? mergedFieldErrors : undefined,
      hint: typeof errObj.hint === 'string' ? errObj.hint : undefined,
      status
    };
  }
  // Legacy formats: { error: 'string' } or { message: '...' }
  if (typeof data.error === 'string') {
    return { message: data.error, code: 'LEGACY', status };
  }
  if (typeof data.message === 'string') {
    return { message: data.message, code: 'LEGACY', status };
  }
  return { ...FALLBACK, status };
}

// Pretty toast/alert string from a parsed error.
export function formatErrorMessage(err: ParsedApiError): string {
  const parts = [err.message];
  if (err.hint) parts.push(err.hint);
  return parts.join('\n');
}
