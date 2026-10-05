import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

/**
 * Staff 권한 피커 — 직원 추가/수정 모달(StaffPage)과 역할 요청 승인 패널(ContextRequestsPanel)이 같이 쓴다.
 * 2026-10-05 StaffPage 에서 **그대로 옮겼다**(렌더 결과 동일 — 기존 영어 문구도 그대로, 번역은 별건).
 *
 * ⚠ 키 목록(WORK_ACCESS ∪ MENU_GROUPS)은 서버 services/userContexts.STAFF_PERMISSION_KEYS 와 같아야 한다.
 *   dev-backend/tests/context-requests.test.js ⑪ 이 이 파일을 읽어 대조한다 — 키를 바꾸면 서버도 같이.
 */

// Staff 권한 토글용 메뉴 그룹 (hasMenuPermission으로 체크하는 항목만)
// Dashboard, POS Terminal, Live Orders, Kitchen/Customer Display, Mobile Order, Profile은
// MainLayout에서 항상 표시되므로 여기에 포함하지 않음
export const MENU_GROUPS: { key: string; label: string; alwaysOn: boolean }[] = [
  { key: 'menu_management', label: 'Products (Menu / Categories / Options / Recipe)', alwaysOn: false },
  { key: 'inventory', label: 'Stock Management (Suppliers / Inventory / Purchase Orders)', alwaysOn: false },
  { key: 'marketing', label: 'Marketing (Customers / Coupons)', alwaysOn: false },
  { key: 'reports', label: 'Analytics (Reports / Activity History)', alwaysOn: false },
  { key: 'support', label: 'Communication (Notices / Manuals / Inquiries)', alwaysOn: false },
  { key: 'settings', label: 'Settings (Store / Company / Notifications)', alwaysOn: false },
];

// 작업 접근(운영 화면) — 직원이 보는 작업 화면 결정. docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md
// 체크 = 그 권한을 줌(허용). 서버(홀) 역할 = POS/Counter 만 켜고 Payment·Cancel/Void 는 끈다.
export const WORK_ACCESS: { key: string; label: string }[] = [
  { key: 'access_pos', label: 'POS / Counter — take orders, add items, move tables' },
  { key: 'access_payment', label: 'Payment — collect payment from customers' },
  { key: 'access_void', label: 'Cancel / Void — cancel orders and void items' },
  { key: 'access_serving', label: 'Serving — serve only (item list), no ordering' },
  { key: 'access_kitchen', label: 'Kitchen — Kitchen Display only' },
];

export const STAFF_PERMISSION_KEYS: string[] = [...WORK_ACCESS, ...MENU_GROUPS].map(g => g.key);

// Menu Access 체크박스 스타일
const PermissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
`;

const PermissionLabel = styled.label<{ alwaysOn?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  background: ${props => props.alwaysOn ? '#F0FDF4' : 'white'};
  border: 1px solid ${props => props.alwaysOn ? '#BBF7D0' : '#C7CED6'};
  cursor: ${props => props.alwaysOn ? 'default' : 'pointer'};
  font-size: 13px;
  color: ${props => props.alwaysOn ? '#166534' : '#1F2937'};
  opacity: ${props => props.alwaysOn ? 0.8 : 1};
  transition: all 0.15s;

  &:hover {
    border-color: ${props => props.alwaysOn ? '#BBF7D0' : '#635BFF'};
  }
`;

const AlwaysOnBadge = styled.span`
  font-size: 11px;
  color: #16A34A;
`;

interface StaffPermissionPickerProps {
  value: string[];
  onChange: (updated: string[]) => void;
}

const StaffPermissionPicker: React.FC<StaffPermissionPickerProps> = ({ value: permissions, onChange }) => {
  const { t } = useTranslation('staff');
  return (
    <div style={{ marginTop: '20px', padding: '16px', background: '#F1F4F8', borderRadius: '8px', border: '1px solid #C7CED6' }}>
      {/* 작업 접근 — 어떤 운영 화면(포스/서빙/주방)을 보는지. 최소 1개 선택 권장. */}
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', marginBottom: '4px' }}>Work access</div>
      <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '12px' }}>
        Which work screens this staff can open. Serving-only staff (no POS) won't see payment/cancel.
      </div>
      <PermissionGrid>
        {WORK_ACCESS.map(group => (
          <PermissionLabel key={group.key} alwaysOn={false}>
            <input
              type="checkbox"
              checked={permissions.includes(group.key)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...permissions, group.key]
                  : permissions.filter(p => p !== group.key);
                onChange(updated);
              }}
              style={{ accentColor: '#635BFF' }}
            />
            {group.label}
          </PermissionLabel>
        ))}
      </PermissionGrid>
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', margin: '16px 0 4px' }}>{t('staff:staffPage.menuAccess')}</div>
      <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '4px' }}>
        Always visible: Profile. Back-office sections below are optional:
      </div>
      <PermissionGrid>
        {MENU_GROUPS.map(group => (
          <PermissionLabel key={group.key} alwaysOn={group.alwaysOn}>
            <input
              type="checkbox"
              checked={group.alwaysOn || permissions.includes(group.key)}
              disabled={group.alwaysOn}
              onChange={(e) => {
                if (group.alwaysOn) return;
                const updated = e.target.checked
                  ? [...permissions, group.key]
                  : permissions.filter(p => p !== group.key);
                onChange(updated);
              }}
              style={{ accentColor: '#635BFF' }}
            />
            {group.label}
            {group.alwaysOn && <AlwaysOnBadge>(Always ON)</AlwaysOnBadge>}
          </PermissionLabel>
        ))}
      </PermissionGrid>
    </div>
  );
};

export default StaffPermissionPicker;
