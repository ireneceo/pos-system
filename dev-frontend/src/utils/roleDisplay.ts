/**
 * Role display helper.
 *
 * The internal ENUM value `Restaurant Owner` is misleading — that role manages
 * multiple restaurants (ownership relationships through restaurant_managers).
 * In all user-facing UI we show "Multi-Restaurant Owner" to communicate intent
 * without the cost of a destructive ENUM migration.
 *
 * Backend code that checks role strings (`if (user.role === 'Restaurant Owner')`)
 * is unchanged. Only display goes through this helper.
 */
const ROLE_DISPLAY_OVERRIDES: Record<string, string> = {
  'Restaurant Owner': 'Multi-Restaurant Owner'
};

export function getRoleDisplayName(role: string | null | undefined): string {
  if (!role) return '';
  return ROLE_DISPLAY_OVERRIDES[role] ?? role;
}
