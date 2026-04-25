/**
 * Scheduler Runs API — read-only monitoring of cron jobs.
 *
 * GET /api/admin/scheduler-runs?job_name=...&status=...&limit=50
 *   200 { success, data: SchedulerRun[], summary }
 * GET /api/admin/scheduler-runs/jobs
 *   200 { success, jobs: [{ job_name, latest_run, latest_status, total_runs, error_runs_24h }] }
 *
 * Restricted to System Admin.
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { SchedulerRun } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.get('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const where = {};
    if (req.query.job_name) where.job_name = String(req.query.job_name);
    if (req.query.status) where.status = String(req.query.status);
    if (req.query.since) {
      const since = new Date(String(req.query.since));
      if (!isNaN(since.getTime())) where.started_at = { [Op.gte]: since };
    }
    const limit = Math.min(parseInt(req.query.limit) || 50, 500);

    const runs = await SchedulerRun.findAll({
      where,
      order: [['started_at', 'DESC']],
      limit
    });

    // Summary across the same filter — total counts per status
    const counts = await SchedulerRun.findAll({
      where,
      attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['status'],
      raw: true
    });
    const summary = counts.reduce((acc, c) => { acc[c.status] = Number(c.count); return acc; }, {});

    res.json({ success: true, data: runs, summary });
  } catch (error) {
    console.error('Scheduler runs list error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch scheduler runs' });
  }
});

router.get('/jobs', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    // Distinct job_name + latest run + 24h error count
    const jobs = await SchedulerRun.findAll({
      attributes: [
        'job_name',
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_runs'],
        [sequelize.fn('MAX', sequelize.col('started_at')), 'latest_started_at']
      ],
      group: ['job_name'],
      raw: true
    });

    const enriched = await Promise.all(jobs.map(async (j) => {
      const latest = await SchedulerRun.findOne({
        where: { job_name: j.job_name, started_at: j.latest_started_at },
        attributes: ['id', 'status', 'finished_at', 'duration_ms', 'results', 'error_message']
      });
      const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const errors24h = await SchedulerRun.count({
        where: { job_name: j.job_name, status: 'error', started_at: { [Op.gte]: since24h } }
      });
      return {
        job_name: j.job_name,
        total_runs: Number(j.total_runs),
        latest_started_at: j.latest_started_at,
        latest_status: latest?.status || null,
        latest_finished_at: latest?.finished_at || null,
        latest_duration_ms: latest?.duration_ms || null,
        latest_results: latest?.results || null,
        latest_error: latest?.error_message || null,
        errors_24h: errors24h
      };
    }));

    enriched.sort((a, b) => new Date(b.latest_started_at) - new Date(a.latest_started_at));
    res.json({ success: true, jobs: enriched });
  } catch (error) {
    console.error('Scheduler jobs summary error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch scheduler jobs summary' });
  }
});

module.exports = router;
