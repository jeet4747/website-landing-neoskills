const { Pool } = require('pg')

const rawUrl = process.env.DATABASE_URL

let pool = rawUrl
  ? new Pool({ connectionString: rawUrl, ssl: { rejectUnauthorized: false } })
  : new Pool({})

pool.on('error', err => console.error('DB pool error:', err))

async function query(text, params) {
  return pool.query(text, params)
}

module.exports = { query }
