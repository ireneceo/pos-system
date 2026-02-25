/**
 * Server Health Monitor
 * Periodically checks production server health via SSH and logs to system_logs.
 * Runs every 30 minutes. Mirrors invoiceScheduler.js pattern.
 */

const cron = require('node-cron');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const systemLogger = require('../utils/systemLogger');

const PROD_SERVER = 'irene@87.106.78.146';
const SSH_TIMEOUT = 15;
const SERVICE = 'server-health';
const CATEGORY = 'system';

// Thresholds for alert levels
const THRESHOLDS = {
  disk: { warning: 80, critical: 90 },
  memory: { warning: 80, critical: 90 },
  cpu: { warning: 80, critical: 95 }
};

class ServerHealthMonitor {
  constructor() {
    this.job = null;
    this.lastCheck = null;
    this.isRunning = false;
  }

  start() {
    // Run every 30 minutes
    this.job = cron.schedule('*/30 * * * *', async () => {
      await this.runHealthCheck();
    });

    console.log('[ServerHealthMonitor] Started - checking every 30 minutes');

    // Run initial check after 10 seconds
    setTimeout(() => this.runHealthCheck(), 10000);
  }

  stop() {
    if (this.job) {
      this.job.stop();
      console.log('[ServerHealthMonitor] Stopped');
    }
  }

  async runHealthCheck() {
    if (this.isRunning) {
      console.log('[ServerHealthMonitor] Already running, skipping');
      return null;
    }

    this.isRunning = true;
    const startTime = Date.now();

    try {
      const healthData = await this.collectHealthData();
      this.lastCheck = healthData;

      const level = this.determineAlertLevel(healthData);
      const message = this.buildMessage(healthData, level);

      await systemLogger[level](CATEGORY, SERVICE, message, healthData, {
        duration: Date.now() - startTime
      });

      return healthData;
    } catch (error) {
      await systemLogger.critical(CATEGORY, SERVICE, `Health check failed: ${error.message}`, {
        server: 'production',
        ip: '87.106.78.146',
        error: error.message
      });
      return null;
    } finally {
      this.isRunning = false;
    }
  }

  async collectHealthData() {
    const sshCmd = `ssh -o ConnectTimeout=${SSH_TIMEOUT} -o StrictHostKeyChecking=accept-new ${PROD_SERVER}`;

    // Collect basic metrics (no PM2 - fetched separately to avoid quoting issues)
    const basicScript = `
echo "===CPU===";
top -bn1 | grep "Cpu(s)" | awk '{print \\$2}';
echo "===MEMORY===";
free -m | grep "Mem:";
echo "===DISK===";
df -h / | tail -1;
echo "===NGINX===";
systemctl is-active nginx 2>/dev/null || echo "unknown";
echo "===MYSQL===";
systemctl is-active mysql 2>/dev/null || echo "unknown";
echo "===UPTIME===";
uptime -s;
echo "===UPDATES===";
apt list --upgradable 2>/dev/null | grep -c upgradable || echo 0
`.trim();

    // Fetch PM2 separately with proper quoting
    const [basicResult, pm2Result] = await Promise.all([
      execAsync(`${sshCmd} '${basicScript}'`, { timeout: 30000 }),
      execAsync(`${sshCmd} "pm2 jlist 2>/dev/null"`, { timeout: 15000 }).catch(() => ({ stdout: '[]' }))
    ]);

    return this.parseOutput(basicResult.stdout, pm2Result.stdout);

    return this.parseOutput(stdout);
  }

  parseOutput(stdout, pm2Raw = '[]') {
    const sections = {};
    let currentSection = '';

    for (const line of stdout.split('\n')) {
      const match = line.match(/^===(\w+)===$/);
      if (match) {
        currentSection = match[1];
        sections[currentSection] = '';
      } else if (currentSection) {
        sections[currentSection] += (sections[currentSection] ? '\n' : '') + line;
      }
    }

    // Parse CPU
    const cpuUsage = parseFloat(sections.CPU || '0');

    // Parse Memory: "Mem: total used free shared buff/cache available"
    const memParts = (sections.MEMORY || '').trim().split(/\s+/);
    const memTotal = parseInt(memParts[1]) || 0;
    const memUsed = parseInt(memParts[2]) || 0;
    const memFree = parseInt(memParts[3]) || 0;
    const memAvailable = parseInt(memParts[6]) || 0;
    const memUsagePercent = memTotal > 0 ? Math.round((memUsed / memTotal) * 100 * 10) / 10 : 0;

    // Parse Disk: "/dev/vda1 blocks used available use% mount"
    const diskParts = (sections.DISK || '').trim().split(/\s+/);
    const diskUsagePercent = parseInt((diskParts[4] || '0').replace('%', '')) || 0;

    // Parse PM2 (from separate SSH call)
    let pm2Processes = [];
    try {
      const pm2Data = JSON.parse(pm2Raw.trim() || '[]');
      pm2Processes = pm2Data.map(p => ({
        name: p.name,
        status: p.pm2_env?.status || 'unknown',
        cpu: p.monit?.cpu || 0,
        memory: Math.round((p.monit?.memory || 0) / 1024 / 1024),
        uptime: p.pm2_env?.pm_uptime || 0,
        restarts: p.pm2_env?.restart_time || 0
      }));
    } catch (e) {
      pm2Processes = [{ name: 'parse-error', status: 'error', error: e.message }];
    }

    // Parse services
    const nginx = (sections.NGINX || 'unknown').trim();
    const mysql = (sections.MYSQL || 'unknown').trim();

    // Parse uptime
    const serverUptime = (sections.UPTIME || '').trim();

    // Parse updates
    const securityUpdates = parseInt(sections.UPDATES || '0') || 0;

    return {
      server: 'production',
      ip: '87.106.78.146',
      timestamp: new Date().toISOString(),
      cpu: { usage: cpuUsage },
      memory: {
        total: memTotal,
        used: memUsed,
        free: memFree,
        available: memAvailable,
        usagePercent: memUsagePercent
      },
      disk: {
        total: diskParts[1] || 'N/A',
        used: diskParts[2] || 'N/A',
        available: diskParts[3] || 'N/A',
        usagePercent: diskUsagePercent
      },
      pm2: pm2Processes,
      services: { nginx, mysql },
      serverUptime,
      securityUpdates
    };
  }

  determineAlertLevel(data) {
    // Critical checks
    if (data.disk?.usagePercent >= THRESHOLDS.disk.critical) return 'critical';
    if (data.memory?.usagePercent >= THRESHOLDS.memory.critical) return 'critical';
    if (data.cpu?.usage >= THRESHOLDS.cpu.critical) return 'critical';
    if (data.services?.nginx !== 'active') return 'critical';
    if (data.services?.mysql !== 'active') return 'critical';

    // Error: PM2 processes down
    const stoppedPm2 = (data.pm2 || []).filter(p => p.status !== 'online');
    if (stoppedPm2.length > 0) return 'error';

    // Warning checks
    if (data.disk?.usagePercent >= THRESHOLDS.disk.warning) return 'warn';
    if (data.memory?.usagePercent >= THRESHOLDS.memory.warning) return 'warn';
    if (data.cpu?.usage >= THRESHOLDS.cpu.warning) return 'warn';
    if (data.securityUpdates > 10) return 'warn';

    return 'info';
  }

  buildMessage(data, level) {
    const parts = [
      `CPU:${data.cpu?.usage || 0}%`,
      `MEM:${data.memory?.usagePercent || 0}%`,
      `DISK:${data.disk?.usagePercent || 0}%`,
      `PM2:${(data.pm2 || []).filter(p => p.status === 'online').length}/${(data.pm2 || []).length}`,
      `Nginx:${data.services?.nginx}`,
      `MySQL:${data.services?.mysql}`
    ];

    if (data.securityUpdates > 0) {
      parts.push(`Updates:${data.securityUpdates}`);
    }

    const prefix = level === 'info' ? 'Production server healthy' : 'Production server alert';
    return `${prefix} - ${parts.join(', ')}`;
  }

  getLastCheck() {
    return this.lastCheck;
  }
}

module.exports = new ServerHealthMonitor();
