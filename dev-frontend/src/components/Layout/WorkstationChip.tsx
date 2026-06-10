/**
 * Header chip showing this device's bound workstation.
 *
 * Multi-POS shops: every POS device shares the Restaurant record, but each
 * one binds to a single workstation entry (localStorage.workstation_id) so
 * receipts route to the right counter printer.
 *
 * Click → dropdown lists every workstation defined in Settings → Printer
 * Workstations. Picking one calls `setActiveWorkstationId()`, which writes
 * localStorage and fires `workstation-changed` so other components re-render.
 *
 * Hidden when there is only one workstation (single-POS shops never see this).
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getActiveWorkstationId, setActiveWorkstationId } from '../../utils/billPrint';

type Workstation = { id: string; name: string };

const ChipButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  background: #fff;
  color: #1F2937;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.2); }

  .icon { font-size: 14px; }
  .caret { font-size: 10px; color: #4B5563; margin-left: 2px; }

  /* Compact on the mobile header (≤768px) so it never overflows the fixed 80px bar and
     pushes the title/actions off-screen. Drop the "Workstation:" label + max-width the
     name; the dropdown header ("This device prints to") still gives full context. */
  @media (max-width: 768px) {
    padding: 6px 8px;
    max-width: 120px;
    .label { display: none; }
    & > span:not(.caret):not(.label) { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  }
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 220px;
  background: #fff;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
  z-index: 1200;
  overflow: hidden;
`;

const MenuHeader = styled.div`
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 700;
  color: #4B5563;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-bottom: 1px solid #F1F4F8;
`;

const MenuItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  border: 0;
  background: ${p => p.$active ? '#F5F3FF' : 'transparent'};
  color: #1F2937;
  font-size: 13px;
  font-weight: ${p => p.$active ? 600 : 500};
  text-align: left;
  cursor: pointer;

  &:hover { background: ${p => p.$active ? '#F5F3FF' : '#F9FAFB'}; }

  .check { color: #635BFF; width: 14px; display: inline-block; text-align: center; }
`;

const MenuFooter = styled.button`
  display: block;
  width: 100%;
  padding: 10px 14px;
  border: 0;
  border-top: 1px solid #F1F4F8;
  background: transparent;
  color: #635BFF;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;

  &:hover { background: #F9FAFB; }
`;

interface WorkstationChipProps {
  /** Restaurant id used to deep-link to Settings → Printer. */
  restaurantId?: number | string;
}

export const WorkstationChip: React.FC<WorkstationChipProps> = ({ restaurantId }) => {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(() => getActiveWorkstationId());
  const [workstations, setWorkstations] = useState<Workstation[]>([]);

  const refreshWorkstations = useCallback(() => {
    try {
      const raw = localStorage.getItem('printerSettings');
      if (!raw) { setWorkstations([]); return; }
      const ps = JSON.parse(raw);
      const list = Array.isArray(ps.workstations) ? ps.workstations : [];
      setWorkstations(list.map((w: any) => ({ id: w.id, name: w.name || 'Unnamed' })));
      // If no active id yet and only one workstation, auto-bind so prints work immediately.
      if (!getActiveWorkstationId() && list.length === 1) {
        setActiveWorkstationId(list[0].id);
      }
    } catch {
      setWorkstations([]);
    }
  }, []);

  useEffect(() => {
    refreshWorkstations();
    const onChange = (e: Event) => setActiveId(((e as CustomEvent).detail?.id) || null);
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'printerSettings' || e.key === 'workstation_id') refreshWorkstations();
    };
    window.addEventListener('workstation-changed', onChange);
    window.addEventListener('storage', onStorage);
    // Re-read after the StoreContext finishes syncing printer_settings to localStorage
    const t = setTimeout(refreshWorkstations, 800);
    return () => {
      window.removeEventListener('workstation-changed', onChange);
      window.removeEventListener('storage', onStorage);
      clearTimeout(t);
    };
  }, [refreshWorkstations]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Single-POS shops (0 or 1 workstation) never need the switcher — hide it entirely.
  // The model always returns a default "Main POS", so a 1-workstation shop must NOT
  // see "Workstation: Main POS" cluttering the header — only multi-POS shops (≥2) do.
  if (workstations.length <= 1) return null;

  const active = workstations.find(w => w.id === activeId) || workstations[0];

  const goManage = () => {
    setOpen(false);
    if (restaurantId) navigate(`/restaurant/${restaurantId}/settings?tab=printer`);
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>
      <ChipButton type="button" onClick={() => setOpen(o => !o)} title="This device's POS workstation">
        <span className="label">Workstation:</span>
        <span>{active.name}</span>
        <span className="caret">▾</span>
      </ChipButton>
      {open && (
        <Menu role="menu">
          <MenuHeader>This device prints to</MenuHeader>
          {workstations.map(ws => (
            <MenuItem
              key={ws.id}
              type="button"
              $active={ws.id === active.id}
              onClick={() => { setActiveWorkstationId(ws.id); setOpen(false); }}
            >
              <span className="check">{ws.id === active.id ? '✓' : ''}</span>
              <span>{ws.name}</span>
            </MenuItem>
          ))}
          {restaurantId && (
            <MenuFooter type="button" onClick={goManage}>+ Manage workstations</MenuFooter>
          )}
        </Menu>
      )}
    </div>
  );
};

export default WorkstationChip;
