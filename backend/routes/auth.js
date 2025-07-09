const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ success: true, data: { token } });
  } catch (error) {
    res.status(401).json({ success: false, error: { message: error.message }});
  }
});

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { storeInfo, adminInfo } = req.body;
    const { storeId, userId } = await authService.register(storeInfo, adminInfo);
    res.json({ success: true, data: { storeId, userId, message: '회원가입 완료' }});
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message }});
  }
});

module.exports = router;