const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transcription = sequelize.define('Transcription', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(120), allowNull: false, defaultValue: 'Voice note' },
  text: { type: DataTypes.TEXT('long'), allowNull: false },
  language: { type: DataTypes.STRING(16), allowNull: false, defaultValue: 'en-IN' }
}, {
  tableName: 'transcriptions',
  timestamps: true,
  indexes: [{ fields: ['updatedAt'] }]
});

module.exports = Transcription;
