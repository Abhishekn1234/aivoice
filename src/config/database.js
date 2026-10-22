const path = require('node:path');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');


dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const required = ['DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missing = required.filter(key => {
  const value = process.env[key];
  return typeof value !== 'string' || value.trim().length === 0;
});

if (missing.length > 0) {
  throw new Error(
    `Missing required MySQL settings: ${missing.join(', ')}. ` +
    'Create .env from .env.example and set its database credentials.'
  );
}

const portValue = process.env.DB_PORT || '3306';
const port = Number(portValue);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DB_PORT must be a valid TCP port between 1 and 65535.');
}

const sequelize = new Sequelize({
  database: process.env.DB_NAME.trim(),
  username: process.env.DB_USER.trim(),

  password: process.env.DB_PASSWORD,
  host: (process.env.DB_HOST || '127.0.0.1').trim(),
  port,
  dialect: 'mysql',
  logging: false,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  },
  dialectOptions: {
    charset: 'utf8mb4'
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
