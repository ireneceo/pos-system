/**
 * Standard Support Services catalog for Brand/Foodcourt contracts.
 * Grouped per design I2. Each service has a stable `code` for sync/tracking.
 *
 * On Setup stage transition, services with `included: true` auto-create
 * contract_tasks (source_type='support_service', source_code=<code>).
 */

const BRAND_SERVICES = [
  // Initial Setup
  { code: 'brand_rights',       group: 'initial_setup', title: 'Brand rights & trademark license' },
  { code: 'market_research',    group: 'initial_setup', title: 'Market research & location survey' },
  { code: 'operation_manual',   group: 'initial_setup', title: 'Operation manual delivery' },
  { code: 'opening_support',    group: 'initial_setup', title: 'Grand opening support' },
  { code: 'supply_package',     group: 'initial_setup', title: 'Initial supply package' },
  // Operations
  { code: 'kitchen_setup',      group: 'operations',    title: 'Kitchen layout & equipment setup' },
  { code: 'order_ordering_system', group: 'operations', title: 'Order & ordering system integration' },
  { code: 'custom_order_process',  group: 'operations', title: 'Custom order process configuration' },
  // Training
  { code: 'recipe_training',    group: 'training',      title: 'Recipe training' },
  { code: 'intensive_training', group: 'training',      title: 'Intensive operator training' },
  // Design
  { code: 'brand_design',       group: 'design',        title: 'Brand design materials (signage, menu)' },
  { code: 'pos_setup',          group: 'design',        title: 'POS / menu setup & theming' }
];

// Foodcourt operators use a similar core set — landlord-side responsibilities.
const FOODCOURT_SERVICES = [
  { code: 'handover_condition',  group: 'initial_setup', title: 'Unit handover in agreed condition' },
  { code: 'utility_connection',  group: 'initial_setup', title: 'Utility connections (water/power/gas)' },
  { code: 'common_area_signage', group: 'initial_setup', title: 'Common area signage slots' },
  { code: 'waste_disposal',      group: 'operations',    title: 'Centralized waste disposal' },
  { code: 'cleaning_common',     group: 'operations',    title: 'Common area cleaning' },
  { code: 'security',            group: 'operations',    title: '24/7 security & CCTV' },
  { code: 'mall_marketing',      group: 'operations',    title: 'Mall-wide marketing campaigns' },
  { code: 'tenant_training',     group: 'training',      title: 'Tenant orientation training' },
  { code: 'pos_integration',     group: 'operations',    title: 'Centralized POS integration' },
  { code: 'pest_control',        group: 'operations',    title: 'Pest control & sanitation' },
  { code: 'maintenance_response', group: 'operations',   title: 'Maintenance response SLA' },
  { code: 'directory_placement', group: 'design',        title: 'Directory & wayfinding placement' }
];

const getTemplate = (entityType) => {
  const list = entityType === 'brand' ? BRAND_SERVICES : FOODCOURT_SERVICES;
  return list.map(s => ({ ...s, included: false, notes: '' }));
};

const findServiceTitle = (entityType, code) => {
  const list = entityType === 'brand' ? BRAND_SERVICES : FOODCOURT_SERVICES;
  const match = list.find(s => s.code === code);
  return match ? match.title : code;
};

module.exports = { BRAND_SERVICES, FOODCOURT_SERVICES, getTemplate, findServiceTitle };
