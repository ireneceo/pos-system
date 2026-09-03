const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');
const { DeployRecord } = require('../models');

/**
 * 배포 기록 조회 — 시스템 관리자 전용, **읽기만**.
 * 기록의 단일 소스는 저장소의 `releases/*.json` 이고 배포 스크립트가 적재한다.
 * 화면에서 고칠 수 있으면 코드와 기록이 갈라지므로 쓰기 API 를 두지 않는다.
 */

const count = (s, k) => (s && s[k] && s[k] !== 'none' ? s[k].length : 0);
const openIssues = (s) => (s && Array.isArray(s.issues) ? s.issues.filter(i => i.status === 'open').length : 0);

// GET /api/admin/deploy-records — 목록(최신순)
router.get('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const rows = await DeployRecord.findAll({ order: [['deployed_at', 'DESC']], limit: 100 });
    res.json({
      success: true,
      data: rows.map(r => ({
        id: r.id, tag: r.tag, deployed_at: r.deployed_at,
        sw_version: r.sw_version, public_release: r.public_release, git_commit: r.git_commit,
        completed_count: count(r.sections, 'completed'),
        open_issue_count: openIssues(r.sections),
        check_area_count: count(r.sections, 'check_areas'),
        // 화면이 "반영: <태그>" 를 계산할 수 있게 번호만 내려준다
        resolves: (r.sections && Array.isArray(r.sections.resolves)) ? r.sections.resolves : [],
      })),
    });
  } catch (error) {
    console.error('List deploy records error:', error);
    res.status(500).json({ success: false, message: 'Failed to load deploy records' });
  }
});

// GET /api/admin/deploy-records/:id — 상세(7섹션 전체)
router.get('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const r = await DeployRecord.findByPk(req.params.id);
    if (!r) return res.status(404).json({ success: false, message: 'Deploy record not found' });
    res.json({ success: true, data: r });
  } catch (error) {
    console.error('Get deploy record error:', error);
    res.status(500).json({ success: false, message: 'Failed to load deploy record' });
  }
});

module.exports = router;
