const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 로그인 API
router.post('/login', authController.login);

// 회원가입 API  
router.post('/register', authController.register);

// 토큰 검증 API
router.get('/verify', authController.verifyToken);

module.exports = router;