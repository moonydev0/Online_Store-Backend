const {Sequelize} = require("sequelize")

const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', (err, client) => {
  if (err) console.error(err);
  console.log(client);
  console.log('Successfully connected to postgres.');
});

module.exports = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect:"postgres",
        host: "localhost",
        port: 5000
    }
)