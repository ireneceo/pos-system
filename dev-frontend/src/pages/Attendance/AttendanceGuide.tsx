/**
 * 출퇴근 화면 맨 위 «사용 순서» 안내 (2026-10-20 Irene «메뉴 어딨는지 알려주고 안내도 제대로 · 스탭 추가해서 있어야 적용되는 것도 이어서 스탭 추가하게»).
 * 출퇴근은 이 매장에 추가된 직원(Staff)만 대상 → 직원이 없으면 1단계를 강조하고 «직원 추가» 로 Staff 화면의 추가 창을 바로 연다.
 * 접어 두기는 이 기기 편의만(localStorage) — 직원이 없거나 PIN 없는 직원이 있으면 접혀 있어도 다시 펼친다.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/UI/Button';
import { attendanceApi, StaffProfile } from './attendanceApi';
import { Card, CardTitle, Muted, Row, Spacer, Badge, Steps, Step, Num, StepBody, StepTitle, StepActions } from './attendanceStyles';

interface Props { restaurantId: string; onOpenTab: (tab: 'leave' | 'settings') => void; }

const COLLAPSE_KEY = 'attendance.guide.collapsed';

const MenuPath = styled.span`
  font-weight: 600;
  color: #0A2540;
`;

const readCollapsed = () => { try { return localStorage.getItem(COLLAPSE_KEY) === '1'; } catch { return false; } };
const writeCollapsed = (v: boolean) => { try { localStorage.setItem(COLLAPSE_KEY, v ? '1' : '0'); } catch { /* 저장 못 해도 화면은 그대로 */ } };

const AttendanceGuide: React.FC<Props> = ({ restaurantId, onOpenTab }) => {
  const { t } = useTranslation('attendance');
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffProfile[] | null>(null);
  const [networkOn, setNetworkOn] = useState<boolean | null>(null);
  const [collapsed, setCollapsed] = useState(readCollapsed);

  const load = useCallback(async () => {
    const [p, s] = await Promise.all([
      attendanceApi<StaffProfile[]>(restaurantId, '/profiles'),
      attendanceApi<{ network_restriction: boolean }>(restaurantId, '/settings'),
    ]);
    if (p.ok) setStaff(p.data || []);
    if (s.ok) setNetworkOn(!!s.data?.network_restriction);
  }, [restaurantId]);
  useEffect(() => {
    load();
    window.addEventListener('attendance:settings-saved', load);
    return () => window.removeEventListener('attendance:settings-saved', load);
  }, [load]);

  // 관리자 본인(Restaurant Admin)도 목록에 오므로 «직원» 은 Staff 역할만 센다.
  const staffOnly = (staff || []).filter(s => s.role === 'Staff');
  const noPin = staffOnly.filter(s => !s.has_pin).length;
  const needsStaff = staff !== null && staffOnly.length === 0;
  const open = !collapsed || needsStaff || noPin > 0;

  const staffUrl = `/restaurant/${restaurantId}/staff`;
  const addStaff = () => navigate(`${staffUrl}?add=1&from=attendance`);
  const toggle = () => { const next = open; setCollapsed(next); writeCollapsed(next); };

  return (
    <Card>
      <Row>
        <CardTitle style={{ margin: 0 }}>{t('guide.title', 'How attendance works')}</CardTitle>
        {needsStaff && <Badge tone="amber">{t('guide.needStaffBadge', 'Add staff first')}</Badge>}
        <Spacer />
        {!needsStaff && noPin === 0 && (
          <Button size="small" variant="secondary" onClick={toggle}>{open ? t('guide.hide', 'Hide') : t('guide.show', 'Show steps')}</Button>
        )}
      </Row>
      {open && (
        <Steps>
          <Step attention={needsStaff || noPin > 0}>
            <Num done={!needsStaff && noPin === 0}>{!needsStaff && noPin === 0 ? '✓' : '1'}</Num>
            <StepBody>
              <StepTitle>{t('guide.step1Title', 'Add your staff')}</StepTitle>
              <Muted>
                {t('guide.step1Help', 'Attendance only covers staff added to this store. Add each person in')}{' '}
                <MenuPath>{t('guide.staffMenuPath', 'Team & Marketing › Staff')}</MenuPath>{' '}
                {t('guide.step1Pin', 'with a 4-digit PIN — the PIN is what they type on the Time Clock.')}
              </Muted>
              <Muted style={{ marginTop: 4 }}>
                {staff === null ? '' : needsStaff
                  ? <strong style={{ color: '#B45309' }}>{t('guide.noStaffYet', 'No staff in this store yet — nobody can clock in until you add them.')}</strong>
                  : <>
                      {t('guide.staffCount', '{{count}} staff added', { count: staffOnly.length })}
                      {noPin > 0 && <> · <strong style={{ color: '#B45309' }}>{t('guide.noPinCount', '{{count}} without a PIN (cannot use Time Clock)', { count: noPin })}</strong></>}
                    </>}
              </Muted>
            </StepBody>
            <StepActions>
              <Button size="small" variant="primary" onClick={addStaff}>{t('guide.addStaff', 'Add staff')}</Button>
              {!needsStaff && <Button size="small" variant="secondary" onClick={() => navigate(staffUrl)}>{noPin > 0 ? t('guide.setPin', 'Set PINs') : t('guide.openStaff', 'Open Staff')}</Button>}
            </StepActions>
          </Step>

          <Step>
            <Num>2</Num>
            <StepBody>
              <StepTitle>{t('guide.step2Title', 'Choose where staff can clock in (optional)')}</StepTitle>
              <Muted>{t('guide.step2Help', 'In the Settings tab you can allow clocking only on the store Wi-Fi, and choose phone and/or store tablet.')}</Muted>
              {networkOn !== null && (
                <Muted style={{ marginTop: 4 }}>
                  {networkOn ? t('guide.networkOn', 'Store network check: on') : t('guide.networkOff', 'Store network check: off — staff can clock in from anywhere')}
                </Muted>
              )}
            </StepBody>
            <StepActions>
              <Button size="small" variant="secondary" onClick={() => onOpenTab('settings')}>{t('guide.openSettings', 'Open Settings')}</Button>
            </StepActions>
          </Step>

          <Step>
            <Num>3</Num>
            <StepBody>
              <StepTitle>{t('guide.step3Title', 'Staff clock in and out')}</StepTitle>
              <Muted>
                <strong>{t('guide.step3TabletLead', 'Store tablet (Time Clock):')}</strong>{' '}
                {t('guide.step3TabletA', 'a manager logs in on the tablet once, opens')} <MenuPath>{t('guide.timeClockMenu', 'Time Clock')}</MenuPath>{' '}
                {t('guide.step3TabletB', 'in the left menu (under POS Terminal — it opens in a new full-screen window) and leaves it open. Staff only type their 4-digit PIN there — they do not log in.')}
              </Muted>
              <Muted style={{ marginTop: 4 }}>
                <strong>{t('guide.step3PhoneLead', 'Own phone:')}</strong>{' '}
                {t('guide.step3PhoneA', 'staff log in with their own account and open')} <MenuPath>{t('guide.myMenuPath', 'Team & Marketing › My Attendance')}</MenuPath>.
              </Muted>
            </StepBody>
            <StepActions>
              <Button size="small" variant="secondary" onClick={() => window.open(`/restaurant/${restaurantId}/time-clock`, '_blank', 'noopener')}>{t('guide.openTimeClock', 'Open Time Clock')}</Button>
            </StepActions>
          </Step>

          <Step>
            <Num>4</Num>
            <StepBody>
              <StepTitle>{t('guide.step4Title', 'Check hours and approve leave')}</StepTitle>
              <Muted>{t('guide.step4Help', 'Today shows who is working now. Records has hours per day and month. Staff request leave in My Attendance and you approve it in the Leave tab.')}</Muted>
            </StepBody>
            <StepActions>
              <Button size="small" variant="secondary" onClick={() => onOpenTab('leave')}>{t('guide.openLeave', 'Open Leave')}</Button>
            </StepActions>
          </Step>
        </Steps>
      )}
    </Card>
  );
};

export default AttendanceGuide;
