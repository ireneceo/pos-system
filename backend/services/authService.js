const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

async function login(email, password) {
  const user = await db.users.findByEmail(email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid email or password');
  }
  
  const token = jwt.sign({
    userId: user.id,
    email: user.email,
    role: user.role,
    storeId: user.storeId
  }, process.env.JWT_SECRET, { expiresIn: '24h' });

  return token;
}

async function register(storeInfo, adminInfo) {
  const store = await db.stores.create(storeInfo);
  const hashedPassword = await bcrypt.hash(adminInfo.password, 10);
  const user = await db.users.create({ ...adminInfo, password: hashedPassword, storeId: store.id });
  return { storeId: store.id, userId: user.id };
}

module.exports = { login, register };