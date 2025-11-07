const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function login(emailOrUsername, password) {
  // Try to find user by email or username
  const { Op } = require('sequelize');
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    }
  });

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid email/username or password');
  }

  const token = jwt.sign({
    userId: user.id,
    email: user.email,
    role: user.role,
    username: user.username
  }, process.env.JWT_SECRET || 'dev-secret-key', { expiresIn: '24h' });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      restaurant_id: user.restaurant_id,
      manager_id: user.manager_id
    }
  };
}

async function register(userData) {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || 'staff'
  });
  
  return { userId: user.id, email: user.email, username: user.username };
}

module.exports = { login, register };