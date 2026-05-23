const { Pool } = require('pg')
const dns = require('dns')

const rawUrl = process.env.DATABASE_URL

function parseDbUrl(url) {
  const m = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  if (!m) return null
  return { user: decodeURIComponent(m[1]), password: decodeURIComponent(m[2]), host: m[3], port: parseInt(m[4]), database: m[5] }
}

let pool
let ready

async function init() {
  if (!rawUrl) {
    pool = new Pool({})
    return
  }
  const p = parseDbUrl(rawUrl)
  if (!p) {
    pool = new Pool({ connectionString: rawUrl, ssl: { rejectUnauthorized: false } })
    return
  }
  const v4 = await new Promise(r => dns.resolve4(p.host, (e, a) => r(e ? null : a)))
  const host = v4 && v4.length > 0 ? v4[0] : p.host
  pool = new Pool({
    user: p.user, password: p.password, host, port: p.port, database: p.database,
    ssl: { rejectUnauthorized: false },
  })
  console.log(`DB connected via ${host} (IPv4: ${!!v4})`)
}

ready = init().catch(e => { console.error('DB init error:', e); pool = new Pool({}) })

pool = new Pool({}) // fallback until init finishes

pool.on('error', err => console.error('DB pool error:', err))

async function query(text, params) {
  await ready
  return pool.query(text, params)
}

module.exports = { query }
