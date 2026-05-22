/**
 * Table label helper — table_number 만 있을 때 Floor Plan v2 의 zone/group 정보로
 * 풀 라벨 (e.g., "Indoor / Main · T001") 을 만든다.
 *
 * 사용처: LiveOrders 리스트, Floor Plan TableDetailPanel, Order 상세 모달.
 */

export interface FloorZoneLike { id: string; name: string }
export interface FloorTableGroupLike { id: string; zone_id: string; name: string; prefix: string }
export interface FloorTableLike { tableNumber: string; group_id?: string }
export interface FloorPlanLike {
  zones?: FloorZoneLike[];
  table_groups?: FloorTableGroupLike[];
  tables?: FloorTableLike[];
}

export interface TableLabelInfo {
  tableNumber: string;        // e.g., "T001"
  groupName?: string;         // e.g., "Main Hall"
  zoneName?: string;          // e.g., "Indoor"
  display: string;            // e.g., "Indoor / Main Hall · T001"
  short: string;              // e.g., "Main · T001"  (zone 1개일 때 zone 생략)
}

/**
 * tableNumber 로 zone / group / 풀라벨 매핑.
 * floor_plan v1 (legacy, zones/groups 미존재) 면 display = tableNumber 자체.
 */
export function getTableLabel(tableNumber: string, floorPlan: FloorPlanLike | null | undefined): TableLabelInfo {
  if (!tableNumber) return { tableNumber: '', display: '', short: '' };
  if (!floorPlan) return { tableNumber, display: tableNumber, short: tableNumber };

  const tables = floorPlan.tables || [];
  const groups = floorPlan.table_groups || [];
  const zones = floorPlan.zones || [];

  const table = tables.find(t => t.tableNumber === tableNumber);
  if (!table || !table.group_id) {
    return { tableNumber, display: tableNumber, short: tableNumber };
  }
  const group = groups.find(g => g.id === table.group_id);
  if (!group) {
    return { tableNumber, display: tableNumber, short: tableNumber };
  }
  const zone = zones.find(z => z.id === group.zone_id);
  const groupName = group.name;
  const zoneName = zone?.name;
  // tableNumber 가 group prefix 를 포함 안 하면 자동 결합 (e.g., prefix='A', tableNumber='4' → 'A4').
  const fullLabel = group.prefix && !tableNumber.startsWith(group.prefix)
    ? `${group.prefix}${tableNumber}`
    : tableNumber;
  // Zone 1개뿐이면 zone 생략. group name 은 노출 X (prefix 가 이미 tableNumber 식별자에 포함).
  const showZone = zoneName && zones.length > 1;
  const display = showZone ? `${zoneName} / ${fullLabel}` : fullLabel;
  return { tableNumber, groupName, zoneName, display, short: fullLabel };
}
