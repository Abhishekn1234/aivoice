require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');

const port = Number(process.env.PORT || 3000);

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(port, () => console.log(`Sayso is running at http://localhost:${port}`));
}

start().catch(error => {
  const databaseError = error.original || error.parent || error;
  console.error('Unable to connect to MySQL or initialize the database.');
  console.error({
    name: databaseError.name || error.name,
    code: databaseError.code || error.code,
    errno: databaseError.errno || error.errno,
    message: databaseError.message || error.message || String(databaseError),
    sqlState: databaseError.sqlState
  });
  if (databaseError.code === 'ENOTFOUND') {
    console.error('DB_HOST did not resolve. Copy the service hostname exactly from your database provider and check that DNS/internet access is available.');
  }
  if (databaseError.code === 'ECONNREFUSED' || databaseError.code === 'ETIMEDOUT') {
    console.error('Check DB_HOST and DB_PORT, confirm the database service is running, and verify that its network access rules allow this client.');
  }
  process.exit(1);
});
