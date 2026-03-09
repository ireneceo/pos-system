const cron = require('node-cron');
const { getSiteTimezone, getTimezoneOffset } = require('../utils/dateTimeHelper');
const systemLogger = require('../utils/systemLogger');

class DemoResetScheduler {
  constructor() {
    this.job = null;
  }

  start() {
    // Run every hour, check if it's midnight in site timezone
    this.job = cron.schedule('0 * * * *', async () => {
      try {
        const siteTimezone = await getSiteTimezone();
        const now = new Date();
        const localHour = parseInt(
          now.toLocaleString('en-US', { timeZone: siteTimezone, hour: 'numeric', hour12: false })
        );

        // Only run at midnight (0:00) in site timezone
        if (localHour !== 0) return;

        console.log('🎭 [DEMO RESET] Running daily demo data reset...');
        await systemLogger.info('system', 'demo-reset', 'Daily demo data reset started');

        const { seedDemoData } = require('../seed-demo-data');
        await seedDemoData();

        console.log('✅ [DEMO RESET] Demo data reset completed');
        await systemLogger.info('system', 'demo-reset', 'Daily demo data reset completed successfully');

      } catch (error) {
        console.error('❌ [DEMO RESET] Failed:', error.message);
        await systemLogger.error('system', 'demo-reset', `Demo data reset failed: ${error.message}`);
      }
    });

    console.log('🎭 [DEMO RESET] Scheduler started - resets daily at midnight (site timezone)');
  }

  stop() {
    if (this.job) {
      this.job.stop();
      this.job = null;
    }
  }
}

module.exports = new DemoResetScheduler();
