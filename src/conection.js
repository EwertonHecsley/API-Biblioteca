const { Pool } = require('pg');

const client = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'biblioteca'
});

module.exports = client;