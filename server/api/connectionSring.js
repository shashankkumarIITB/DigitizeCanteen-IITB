const { connect } = require("http2");

const DB_HOST = 'localhost';
const DB_PORT = '5310';
const DB_NAME = 'hostel2';
const DB_USER = 'labuser';
const DB_PASSWORD = '';

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = connectionString;