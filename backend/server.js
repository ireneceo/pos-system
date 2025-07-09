const express = require('express');
const app = express();

// Express 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 연결
const authRouter = require('./routes/auth');
const menuRouter = require('./routes/menu');
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});