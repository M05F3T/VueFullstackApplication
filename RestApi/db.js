const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    host: 'danielsejersen.com',
    database: 'students',
    password: '123',
    port: 25565,
});

module.exports = pool;