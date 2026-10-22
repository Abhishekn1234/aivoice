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
  process.exit(1);
});
