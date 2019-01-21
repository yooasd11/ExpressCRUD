const path = require('path');

require('dotenv-safe').load({
    path: path.join(__dirname, '../.env.dev'),
    sample: path.join(__dirname, '../.env.example'),
})

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
};