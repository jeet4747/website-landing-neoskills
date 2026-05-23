const express = require('express')
const Razorpay = require('razorpay')
const cors = require('cors')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const { query } = require('./db.cjs')

const app = express()
app.use(cors({ origin: true }))
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true, limit: '20mb' }))

// ─── Razorpay ───
let razorpay
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
} catch {
  console.warn('Razorpay not configured — payment endpoints disabled')
}

// ─── Nodemailer ───
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
})

const sendConfirmationEmail = async ({ name, email, course, amount }) => {
  const mailOptions = {
    from: `"Neoskills" <${process.env.ZOHO_EMAIL}>`,
    to: email,
    subject: '✅ Payment Confirmation - Neoskills',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0056D2; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Payment Confirmed! 🎉</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
          <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>
          <p style="font-size: 16px; color: #333;">Thank you for enrolling with <strong>Neoskills</strong>! Your payment has been successfully received.</p>
          <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #0056D2;">
            <h3 style="color: #0056D2; margin-top: 0;">Payment Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Course</td><td style="padding: 8px 0; font-weight: bold; color: #333;">${course}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Amount Paid</td><td style="padding: 8px 0; font-weight: bold; color: #0056D2;">₹${amount}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Status</td><td style="padding: 8px 0; font-weight: bold; color: green;">✅ Confirmed</td></tr>
            </table>
          </div>
          <p style="font-size: 15px; color: #333;">Our team will contact you shortly with <strong>batch details</strong> and next steps.</p>
          <p style="font-size: 15px; color: #333;">Questions? Reach us at <a href="mailto:contact@neoskills.co.in" style="color: #0056D2;">contact@neoskills.co.in</a> or call <strong>+91 8087020031</strong>.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
            <p style="color: #999; font-size: 13px;">© ${new Date().getFullYear()} Neoskills Learning Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  }
  await transporter.sendMail(mailOptions)
  console.log(`Confirmation email sent to ${email}`)
}

// ─── Helper: read/write app_data ───

function getJsonPath(key) {
  const map = { courses: 'courses.json', jobs: 'jobs.json', hero_slides: 'hero-slides.json' }
  return path.join(__dirname, map[key] || `${key}.json`)
}

async function getData(key) {
  if (!process.env.DATABASE_URL) {
    const p = getJsonPath(key)
    if (!fs.existsSync(p)) return null
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  }
  const result = await query('SELECT data FROM app_data WHERE key = $1', [key])
  return result.rows[0]?.data || null
}

async function setData(key, data) {
  if (!process.env.DATABASE_URL) {
    const p = getJsonPath(key)
    fs.writeFileSync(p, JSON.stringify(data, null, 2))
    return
  }
  await query(
    `INSERT INTO app_data (key, data, updated_at) VALUES ($1, $2, NOW())
     ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = NOW()`,
    [key, JSON.stringify(data)]
  )
}

// ─── Auth middleware ───
const ADMIN_PW = process.env.ADMIN_PASSWORD || 'neoskills2026'
function requireAdmin(req, res, next) {
  const pw = req.headers['x-admin-password'] || req.body?._password
  if (pw !== ADMIN_PW) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

// ─── Health ───
app.get('/api/health', async (req, res) => {
  try {
    await query('SELECT 1')
    res.json({ status: 'ok', db: true, dbConfigured: !!process.env.DATABASE_URL })
  } catch (err) {
    res.json({
      status: 'ok',
      db: false,
      dbConfigured: !!process.env.DATABASE_URL,
      dbError: process.env.DATABASE_URL ? err.message : 'DATABASE_URL not set',
    })
  }
})

// ─── Razorpay routes ───
app.post('/api/create-order', async (req, res) => {
  if (!razorpay) return res.status(500).json({ error: 'Payments not configured' })
  try {
    const { amount } = req.body
    if (!amount || isNaN(amount)) return res.status(400).json({ error: 'Invalid amount' })
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    }
    const order = await razorpay.orders.create(options)
    return res.json({ order, key: process.env.RAZORPAY_KEY_ID })
  } catch (err) {
    console.error('create-order error', err)
    return res.status(500).json({ error: err.message })
  }
})

app.post('/api/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, course, amount } = req.body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ ok: false, error: 'Missing parameters' })
  }
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex')
  if (generated_signature === razorpay_signature) {
    try {
      await sendConfirmationEmail({ name, email, course, amount })
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr)
    }
    return res.json({ ok: true })
  }
  return res.status(400).json({ ok: false, error: 'Invalid signature' })
})

// ─── Courses API ───
app.get('/api/courses', async (req, res) => {
  try {
    const data = await getData('courses')
    if (!data) return res.json([])
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to read courses' })
  }
})

app.post('/api/courses', requireAdmin, async (req, res) => {
  let newCourses = req.body
  if (!Array.isArray(newCourses)) return res.status(400).json({ error: 'Courses must be an array' })
  newCourses = newCourses.map(c => {
    if (!c.feeDetails) return c
    const training = Number(c.feeDetails.training || 0)
    const exam = Number(c.feeDetails.exam || 0)
    return { ...c, feeDetails: { ...c.feeDetails, total: training + exam } }
  })
  try {
    await setData('courses', newCourses)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save courses' })
  }
})

// ─── Jobs API ───
app.get('/api/jobs', async (req, res) => {
  try {
    const data = await getData('jobs')
    if (!data) return res.json([])
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to read jobs' })
  }
})

app.post('/api/jobs', requireAdmin, async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Jobs must be an array' })
  try {
    await setData('jobs', req.body)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save jobs' })
  }
})

// ─── Hero Slides API ───
app.get('/api/hero-slides', async (req, res) => {
  try {
    const data = await getData('hero_slides')
    if (!data) return res.json([])
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to read hero slides' })
  }
})

app.post('/api/hero-slides', requireAdmin, async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Slides must be an array' })
  try {
    await setData('hero_slides', req.body)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save hero slides' })
  }
})

// ─── Serve frontend (production) ───
const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'API route not found' })
  res.sendFile(path.join(distPath, 'index.html'))
})

// ─── Start ───
// ─── Auto-seed on first run ───
async function seedIfEmpty() {
  try {
    const courses = await getData('courses')
    if (courses && Array.isArray(courses) && courses.length > 0) {
      console.log('  Data already seeded, skipping.')
      return
    }
  } catch { /* assume empty */ }

  console.log('  Seeding initial data from JSON files...')
  const seeds = [
    { key: 'courses', file: 'courses.json' },
    { key: 'jobs', file: 'jobs.json' },
    { key: 'hero_slides', file: 'hero-slides.json' },
  ]
  for (const { key, file } of seeds) {
    const p = path.join(__dirname, file)
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'))
      await setData(key, data)
      console.log(`    ✅ ${key} (${Array.isArray(data) ? data.length : 'ok'})`)
    }
  }
}

// ─── Start ───
const PORT = process.env.PORT || 4000
app.listen(PORT, async () => {
  console.log(`Neoskills server running on http://localhost:${PORT}`)
  if (process.env.DATABASE_URL) await seedIfEmpty()
  console.log(`  API:    http://localhost:${PORT}/api/health`)
  console.log(`  Frontend (if built): http://localhost:${PORT}/`)
})
