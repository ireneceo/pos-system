/**
 * Restaurant display name utility.
 * Combines restaurant name with branch name when available.
 *
 * Usage:
 *   getRestaurantDisplayName({ name: 'Korean BBQ', branch_name: 'Bukit Bintang' })
 *   // → "Korean BBQ (Bukit Bintang)"
 *
 *   getRestaurantDisplayName({ name: 'Korean BBQ' })
 *   // → "Korean BBQ"
 */
export function getRestaurantDisplayName(
  restaurant: { name: string; branch_name?: string | null; branchName?: string | null }
): string {
  const branch = restaurant.branch_name || restaurant.branchName;
  return branch ? `${restaurant.name} (${branch})` : restaurant.name;
}

/**
 * Returns only the branch name, or null if not set.
 */
export function getBranchName(
  restaurant: { branch_name?: string | null; branchName?: string | null }
): string | null {
  return restaurant.branch_name || restaurant.branchName || null;
}
