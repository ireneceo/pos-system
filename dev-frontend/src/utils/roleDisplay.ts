/**
 * Role display helper.
 *
 * 내부 ENUM 값 `Restaurant Owner`는 multi-restaurant ownership을 가지는 역할이라
 * 사용자 노출 표시는 "Multi-Restaurant Owner" (4언어 번역) 로 분기한다.
 *
 * 백엔드 권한 비교 (`if (user.role === 'Restaurant Owner')`)는 ENUM 값 그대로 유지.
 * 모든 변수 표시 (예: `<Td>{user.role}</Td>`)는 헬퍼/hook 으로 wrap한다.
 *
 * 사용 패턴:
 *   1) 컴포넌트 내부 (권장):
 *      const roleLabel = useRoleDisplayName();
 *      <Td>{roleLabel(user.role)}</Td>
 *
 *   2) 이미 `t` 인스턴스를 가진 자리:
 *      <Td>{getRoleDisplayName(user.role, t)}</Td>
 */
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

/** Internal ENUM 값 → common.json `role.*` 키 매핑 */
const ROLE_TO_KEY: Record<string, string> = {
  'System Admin': 'role.systemAdmin',
  'Brand General': 'role.brandGeneral',
  'Brand Manager': 'role.brandManager',
  'Foodcourt General': 'role.foodcourtGeneral',
  'Foodcourt Manager': 'role.foodcourtManager',
  'Restaurant Owner': 'role.restaurantOwner',
  'Restaurant Admin': 'role.restaurantAdmin',
  'Staff': 'role.staff',
  'Supplier Admin': 'role.supplier_admin',
  'Supplier Staff': 'role.supplierStaff',
  'Referral Partner': 'role.referralPartner',
};

export function getRoleDisplayName(role: string | null | undefined, t: TFunction): string {
  if (!role) return '';
  const key = ROLE_TO_KEY[role];
  if (!key) return role;
  return t(`common:${key}`, { defaultValue: role });
}

export function useRoleDisplayName(): (role: string | null | undefined) => string {
  const { t } = useTranslation('common');
  return (role) => getRoleDisplayName(role, t);
}
