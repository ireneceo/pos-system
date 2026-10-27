/**
 * 매장 관리자 «Attendance» — /restaurant/:restaurantId/attendance
 * 탭: Today · Records · Leave · Calendar · Settings (설계 .claude/fable-design-20261016-staff-attendance.md §4-1).
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  // 폰에선 위 «사용 순서» 안내가 첫 화면을 다 차지해 탭 내용이 한참 아래에 있다(2026-10-27 Irene «이런 메뉴 자체가 없어»).
  // 탭을 지정한 링크로 들어오거나 안내의 «… 열기» 버튼을 누르면 탭 줄까지 내려 준다. 탭을 직접 누를 때는 그대로.
  const tabsRef = useRef<HTMLDivElement>(null);
  const scrollToTabs = useCallback(() => {
    // 안내 카드가 직원 수를 읽어 와 높이가 바뀐 뒤에 내린다
    window.setTimeout(() => tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 600);
  }, []);
  useEffect(() => {
    if (params.get('tab') && !window.location.hash) scrollToTabs();
    // 처음 들어올 때 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (k: TabKey) => {
    const next = new URLSearchParams(params);
    next.set('tab', k);
    setParams(next, { replace: true });
  };
  const openFromGuide = (k: TabKey) => { go(k); scrollToTabs(); };

  return (
    <Container>
      <Header>
        <Title>{t('attendance:page.title', 'Attendance')}</Title>
      </Header>
      <Content>
        <AttendanceGuide restaurantId={restaurantId} onOpenTab={openFromGuide} />
        <div ref={tabsRef} style={{ scrollMarginTop: 96 }} />
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
