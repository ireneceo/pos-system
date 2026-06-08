'use strict';

/**
 * Shared availability-schedule evaluation for the mobile customer menu.
 *
 * A "schedule entry" describes WHEN a menu category is available to customers.
 * It is stored per category inside `restaurant.mobile_settings.category_schedules[]`.
 * The same shape is reusable for per-item scheduling later (Product-level) — the
 * evaluation lives here once so category and item paths never diverge.
 *
 * Entry shape (all of days/dates/display are OPTIONAL — absent = legacy behaviour):
 *   {
 *     category_id,
 *     start_time: "HH:MM",  end_time: "HH:MM",   // daily time window; end<start = overnight
 *     days: [0..6],                              // JS getDay() (0=Sun); empty/absent = every day
 *     start_date: "YYYY-MM-DD", end_date: "YYYY-MM-DD", // optional event window; absent = unbounded
 *     display: "hide" | "disable"                // how to show when OUT of schedule; absent = "hide"
 *   }
 *
 * Restaurant-local time is authoritative — the timezone comes from
 * operation_settings.timeZone (default Asia/Kuala_Lumpur), never the server clock.
 */

const DOW = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/**
 * Resolve the current date / time-of-day / day-of-week in a given IANA timezone.
 * @returns {{date:string, time:string, dow:number}} date "YYYY-MM-DD", time "HH:MM", dow 0-6
 */
function localParts(now, tz) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz || 'Asia/Kuala_Lumpur',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
    weekday: 'short'
  }).formatToParts(now);
  const m = {};
  for (const p of parts) m[p.type] = p.value;
  const hour = (m.hour === '24') ? '00' : m.hour; // some runtimes emit "24" at midnight
  return {
    date: `${m.year}-${m.month}-${m.day}`,
    time: `${hour}:${m.minute}`,
    dow: DOW[m.weekday]
  };
}

/**
 * Is the schedule currently in its available window?
 * No schedule (null/undefined) → always available.
 */
function isWithinSchedule(sched, now, tz) {
  if (!sched) return true;
  const { date, time, dow } = localParts(now, tz);

  // Event date range (inclusive). Absent bound = open.
  if (sched.start_date && date < sched.start_date) return false;
  if (sched.end_date && date > sched.end_date) return false;

  // Day-of-week. Empty/absent = every day.
  if (Array.isArray(sched.days) && sched.days.length > 0 && !sched.days.includes(dow)) return false;

  // Daily time window. end<start = overnight (e.g. 22:00–02:00).
  const s = sched.start_time, e = sched.end_time;
  if (s && e) {
    const inRange = (s <= e) ? (time >= s && time < e) : (time >= s || time < e);
    if (!inRange) return false;
  }
  return true;
}

/** Off-schedule display mode for an entry: 'disable' keeps it visible-but-greyed, else 'hide'. */
function offScheduleMode(sched) {
  return sched && sched.display === 'disable' ? 'disable' : 'hide';
}

module.exports = { isWithinSchedule, offScheduleMode, localParts };
