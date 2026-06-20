import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { getAuthToken } from '../../utils/auth';
import { useAuth } from '../../contexts/AuthContext';
import AutoSaveField, { AutoSaveHandle } from '../Common/AutoSaveField';

interface ReservationSettings {
  enabled: boolean;
  auto_confirm: boolean;
  slot: {
    min_party: number;
    max_party: number;
    turn_time_minutes: number;
    min_advance_hours: number;
    duration_minutes: number;
    max_covers_per_slot: number;
    advance_booking_days: number;
    floor_lead_minutes: number;   // P2-6: 플로어플랜에 예약을 미리 띄우는 리드타임(분)
  };
  cancellation_policy: {
    free_until_hours: number;
  };
  no_show_policy: {
    grace_minutes: number;
    block_after_count: number;
  };
  closed_dates: string[];
}

const DEFAULTS: ReservationSettings = {
  enabled: false,
  auto_confirm: false,
  slot: { min_party: 1, max_party: 20, turn_time_minutes: 90, min_advance_hours: 1, duration_minutes: 30, max_covers_per_slot: 40, advance_booking_days: 60, floor_lead_minutes: 120 },
  cancellation_policy: { free_until_hours: 24 },
  no_show_policy: { grace_minutes: 30, block_after_count: 3 },
  closed_dates: []
};

export default function ReservationSettingsTab() {
  const { user } = useAuth();
  const restaurantId = user?.restaurantId;
  const [settings, setSettings] = useState<ReservationSettings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  const enabledRef = useRef<AutoSaveHandle>(null);
  const autoConfirmRef = useRef<AutoSaveHandle>(null);
  const minPartyRef = useRef<AutoSaveHandle>(null);
  const maxPartyRef = useRef<AutoSaveHandle>(null);
  const turnTimeRef = useRef<AutoSaveHandle>(null);
  const advanceHoursRef = useRef<AutoSaveHandle>(null);
  const floorLeadRef = useRef<AutoSaveHandle>(null);
  const cancelHoursRef = useRef<AutoSaveHandle>(null);
  const graceRef = useRef<AutoSaveHandle>(null);
  const blockAfterRef = useRef<AutoSaveHandle>(null);

  useEffect(() => {
    if (!restaurantId) return;
    const token = getAuthToken();
    fetch(`/api/store/settings?restaurantId=${restaurantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(j => {
        if (j.success && j.data?.reservation_settings) {
          const r = j.data.reservation_settings;
          setSettings({
            ...DEFAULTS,
            ...r,
            slot: { ...DEFAULTS.slot, ...(r.slot || {}) },
            cancellation_policy: { ...DEFAULTS.cancellation_policy, ...(r.cancellation_policy || {}) },
            no_show_policy: { ...DEFAULTS.no_show_policy, ...(r.no_show_policy || {}) }
          });
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [restaurantId]);

  const save = useCallback(async (override?: Partial<ReservationSettings>) => {
    if (!restaurantId) return;
    const final = override ? { ...settings, ...override } : settings;
    const token = getAuthToken();
    await fetch(`/api/store/settings?restaurantId=${restaurantId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ reservation_settings: final })
    });
  }, [restaurantId, settings]);

  if (!loaded) return <Empty>Loading…</Empty>;

  return (
    <Container>
      <Card>
        <CardTitle>Reservation Acceptance</CardTitle>
        <Hint>Allow customers to make reservations from your mobile menu.</Hint>
        <Row>
          <RowLabel>
            <strong>Accept reservations</strong>
            <Sub>Show the "Reserve" button in mobile menu</Sub>
          </RowLabel>
          <AutoSaveField ref={enabledRef} onSave={save} type="toggle">
            <ToggleSwitch>
              <ToggleInput type="checkbox" checked={settings.enabled}
                onChange={e => { setSettings({ ...settings, enabled: e.target.checked }); enabledRef.current?.triggerSave(); }} />
              <ToggleSlider />
            </ToggleSwitch>
          </AutoSaveField>
        </Row>
        <Row>
          <RowLabel>
            <strong>Auto-confirm reservations</strong>
            <Sub>Skip staff approval — reservations go straight to "Confirmed"</Sub>
          </RowLabel>
          <AutoSaveField ref={autoConfirmRef} onSave={save} type="toggle">
            <ToggleSwitch>
              <ToggleInput type="checkbox" checked={settings.auto_confirm}
                onChange={e => { setSettings({ ...settings, auto_confirm: e.target.checked }); autoConfirmRef.current?.triggerSave(); }} />
              <ToggleSlider />
            </ToggleSwitch>
          </AutoSaveField>
        </Row>
      </Card>

      <Card>
        <CardTitle>Booking Rules</CardTitle>
        <Hint>Constraints applied when customers submit a reservation.</Hint>
        <Grid>
          <Field>
            <Label>Min party size</Label>
            <AutoSaveField ref={minPartyRef} onSave={save}>
              <Number value={settings.slot.min_party} min={1} max={20}
                onChange={v => { setSettings({ ...settings, slot: { ...settings.slot, min_party: v } }); minPartyRef.current?.triggerSave(); }} />
            </AutoSaveField>
          </Field>
          <Field>
            <Label>Max party size</Label>
            <AutoSaveField ref={maxPartyRef} onSave={save}>
              <Number value={settings.slot.max_party} min={1} max={50}
                onChange={v => { setSettings({ ...settings, slot: { ...settings.slot, max_party: v } }); maxPartyRef.current?.triggerSave(); }} />
            </AutoSaveField>
          </Field>
          <Field>
            <Label>Turn time (minutes per table)</Label>
            <AutoSaveField ref={turnTimeRef} onSave={save}>
              <Number value={settings.slot.turn_time_minutes} min={30} max={240} step={15}
                onChange={v => { setSettings({ ...settings, slot: { ...settings.slot, turn_time_minutes: v } }); turnTimeRef.current?.triggerSave(); }} />
            </AutoSaveField>
            <Sub>How long a typical table stays. Used to space out slots.</Sub>
          </Field>
          <Field>
            <Label>Min hours in advance</Label>
            <AutoSaveField ref={advanceHoursRef} onSave={save}>
              <Number value={settings.slot.min_advance_hours} min={0} max={72}
                onChange={v => { setSettings({ ...settings, slot: { ...settings.slot, min_advance_hours: v } }); advanceHoursRef.current?.triggerSave(); }} />
            </AutoSaveField>
            <Sub>Customers cannot book closer than this many hours.</Sub>
          </Field>
          <Field>
            <Label>Floor plan lead time (minutes)</Label>
            <AutoSaveField ref={floorLeadRef} onSave={save}>
              <Number value={settings.slot.floor_lead_minutes} min={0} max={1440} step={30}
                onChange={v => { setSettings({ ...settings, slot: { ...settings.slot, floor_lead_minutes: v } }); floorLeadRef.current?.triggerSave(); }} />
            </AutoSaveField>
            <Sub>How early a table shows "Reserved" on the floor plan before the booking time.</Sub>
          </Field>
        </Grid>
      </Card>

      <Card>
        <CardTitle>Cancellation &amp; No-Show</CardTitle>
        <Grid>
          <Field>
            <Label>Free cancellation (hours before)</Label>
            <AutoSaveField ref={cancelHoursRef} onSave={save}>
              <Number value={settings.cancellation_policy.free_until_hours} min={0} max={168}
                onChange={v => { setSettings({ ...settings, cancellation_policy: { ...settings.cancellation_policy, free_until_hours: v } }); cancelHoursRef.current?.triggerSave(); }} />
            </AutoSaveField>
          </Field>
          <Field>
            <Label>No-show grace period (minutes)</Label>
            <AutoSaveField ref={graceRef} onSave={save}>
              <Number value={settings.no_show_policy.grace_minutes} min={0} max={120} step={5}
                onChange={v => { setSettings({ ...settings, no_show_policy: { ...settings.no_show_policy, grace_minutes: v } }); graceRef.current?.triggerSave(); }} />
            </AutoSaveField>
            <Sub>Auto-mark as no-show this many minutes after reservation time.</Sub>
          </Field>
          <Field>
            <Label>Block after N no-shows</Label>
            <AutoSaveField ref={blockAfterRef} onSave={save}>
              <Number value={settings.no_show_policy.block_after_count} min={1} max={10}
                onChange={v => { setSettings({ ...settings, no_show_policy: { ...settings.no_show_policy, block_after_count: v } }); blockAfterRef.current?.triggerSave(); }} />
            </AutoSaveField>
            <Sub>Customers reaching this no-show count are blocked from new reservations.</Sub>
          </Field>
        </Grid>
      </Card>
    </Container>
  );
}

function Number({ value, min, max, step, onChange }: { value: number; min?: number; max?: number; step?: number; onChange: (v: number) => void }) {
  return (
    <NumInput type="number" value={value} min={min} max={max} step={step}
      onChange={e => onChange(parseInt(e.target.value) || 0)} />
  );
}

const Container = styled.div`display:flex;flex-direction:column;gap:20px;`;
const Card = styled.div`background:white;border:1px solid #C7CED6;border-radius:12px;padding:20px 24px;`;
const CardTitle = styled.h3`font-size:15px;font-weight:600;color:#0A2540;margin:0 0 4px;`;
const Hint = styled.p`color:#4B5563;font-size:13px;margin:0 0 16px;`;
const Sub = styled.div`color:#4B5563;font-size:12px;margin-top:4px;`;
const Row = styled.div`display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #F0F4F8;&:last-child{border-bottom:none;}`;
const RowLabel = styled.div`display:flex;flex-direction:column;color:#0A2540;font-size:14px;`;
const Grid = styled.div`display:grid;grid-template-columns:repeat(2,1fr);gap:16px 20px;@media(max-width:768px){grid-template-columns:1fr;}`;
const Field = styled.div`display:flex;flex-direction:column;`;
const Label = styled.label`font-size:13px;font-weight:500;color:#4B5563;margin-bottom:6px;`;
const NumInput = styled.input`padding:8px 12px;border:1px solid #C7CED6;border-radius:6px;font-size:14px;color:#0A2540;max-width:140px;`;
const Empty = styled.div`text-align:center;padding:40px;color:#4B5563;`;
const ToggleSwitch = styled.label`position:relative;display:inline-block;width:44px;height:24px;`;
const ToggleInput = styled.input`opacity:0;width:0;height:0;&:checked + span{background-color:#635BFF;}&:checked + span:before{transform:translateX(20px);}`;
const ToggleSlider = styled.span`position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#CBD5E0;transition:.3s;border-radius:24px;&:before{position:absolute;content:"";height:18px;width:18px;left:3px;bottom:3px;background-color:white;transition:.3s;border-radius:50%;}`;
