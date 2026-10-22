const path = require('node:path');
const express = require('express');
const sequelize = require('./config/database');
const transcriptionRoutes = require('./routes/transcriptionRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', async (_req, res, next) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) { next(error); }
});

app.use('/api/transcriptions', transcriptionRoutes);
app.use('/api', notFound);
app.use(errorHandler);

module.exports = app;
