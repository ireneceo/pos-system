/**
 * 매장 관리자 «Attendance» — /restaurant/:restaurantId/attendance
 * 탭: Today · Records · Leave · Calendar · Settings (설계 .claude/fable-design-20261016-staff-attendance.md §4-1).
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { TabContainer, Tab } from '../../components/UI/Tabs';
import { attendanceApi } from './attendanceApi';
import TodayTab from './tabs/TodayTab';
import RecordsTab from './tabs/RecordsTab';
import LeaveTab from './tabs/LeaveTab';
import CalendarTab from './tabs/CalendarTab';
import SettingsTab from './tabs/SettingsTab';
import AttendanceGuide from './AttendanceGuide';

const TABS = ['today', 'records', 'leave', 'calendar', 'settings'] as const;
type TabKey = typeof TABS[number];

const AttendancePage: React.FC = () => {
  const { t } = useTranslation(['attendance', 'common']);
  const { restaurantId = '' } = useParams<{ restaurantId: string }>();
  const [params, setParams] = useSearchParams();
  const tab: TabKey = (TABS as readonly string[]).includes(params.get('tab') || '') ? (params.get('tab') as TabKey) : 'today';
  const [timeZone, setTimeZone] = useState<string>('Asia/Kuala_Lumpur');
  const [pendingLeave, setPendingLeave] = useState(0);

  const loadMeta = useCallback(async () => {
    const [s, live] = await Promise.all([
      attendanceApi(restaurantId, '/settings'),
      attendanceApi(restaurantId, '/live'),
    ]);
    if (s.ok && s.data?.time_zone) setTimeZone(s.data.time_zone);
    if (live.ok) setPendingLeave(live.data?.pending_leave || 0);
  }, [restaurantId]);

  useEffect(() => { loadMeta(); }, [loadMeta]);

  const go = (k: TabKey) => {
    const next = new URLSearchParams(params);
    next.set('tab', k);
    setParams(next, { replace: true });
  };

  return (
    <Container>
      <Header>
        <Title>{t('attendance:page.title', 'Attendance')}</Title>
      </Header>
      <Content>
        <AttendanceGuide restaurantId={restaurantId} onOpenTab={go} />
        <TabContainer>
          <Tab active={tab === 'today'} onClick={() => go('today')}>{t('attendance:tabs.today', 'Today')}</Tab>
          <Tab active={tab === 'records'} onClick={() => go('records')}>{t('attendance:tabs.records', 'Records')}</Tab>
          <Tab active={tab === 'leave'} onClick={() => go('leave')}>
            {t('attendance:tabs.leave', 'Leave')}{pendingLeave > 0 ? ` (${pendingLeave})` : ''}
          </Tab>
          <Tab active={tab === 'calendar'} onClick={() => go('calendar')}>{t('attendance:tabs.calendar', 'Calendar')}</Tab>
          <Tab active={tab === 'settings'} onClick={() => go('settings')}>{t('attendance:tabs.settings', 'Settings')}</Tab>
        </TabContainer>
        <div style={{ marginTop: 20 }}>
          {tab === 'today' && <TodayTab restaurantId={restaurantId} timeZone={timeZone} onOpenLeave={() => go('leave')} />}
          {tab === 'records' && <RecordsTab restaurantId={restaurantId} timeZone={timeZone} />}
          {tab === 'leave' && <LeaveTab restaurantId={restaurantId} timeZone={timeZone} onChanged={loadMeta} />}
          {tab === 'calendar' && <CalendarTab restaurantId={restaurantId} timeZone={timeZone} />}
          {tab === 'settings' && <SettingsTab restaurantId={restaurantId} timeZone={timeZone} />}
        </div>
      </Content>
    </Container>
  );
};

export default AttendancePage;
