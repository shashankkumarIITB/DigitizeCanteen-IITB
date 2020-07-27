const { Pool, Client } = require('pg');
const connectionString = require('./connectionSring');

const pool = new Pool({
  connectionString: connectionString,
})

const connect = async () => {
  console.log('Returning a client from the connection pool');
  return pool.connect();
}

const close = () => {
  console.log('Closing the connection pool')
  pool.end();
}

exports.connect = connect;
exports.close = close;
