const express = require('express')
const Razorpay = require('razorpay')
const cors = require('cors')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const { query } = require('./db.cjs')

const app = express()
app.use(cors({ origin: true }))
app.use(express.json({ limit: '20mb', verify: (req, _res, buf) => { req.rawBody = buf.toString() } }))
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

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')
const CV_DIR = path.join(UPLOAD_DIR, 'cvs')
if (!fs.existsSync(CV_DIR)) fs.mkdirSync(CV_DIR, { recursive: true })

const cvStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, CV_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const safeName = `cv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    cb(null, safeName)
  },
})
const upload = multer({
  storage: cvStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx']
    const ext = path.extname(file.originalname).toLowerCase()
    if (!allowed.includes(ext)) return cb(new Error('Only PDF and DOCX files are allowed'))
    cb(null, true)
  },
})

function getJsonPath(key) {
  const map = { courses: 'courses.json', jobs: 'jobs.json', hero_slides: 'hero-slides.json', webinars: 'webinars.json' }
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
    const { amount, name, email, phone, course } = req.body
    if (!amount || isNaN(amount)) return res.status(400).json({ error: 'Invalid amount' })
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
      notes: { name: name || '', email: email || '', phone: phone || '', course: course || '' },
    }
    const order = await razorpay.orders.create(options)
    return res.json({ order, key: process.env.RAZORPAY_KEY_ID })
  } catch (err) {
    console.error('create-order error', err)
    return res.status(500).json({ error: err.message })
  }
})

app.post('/api/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, phone, course, amount, hasGst, source } = req.body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ ok: false, error: 'Missing parameters' })
  }
  const secret = process.env.RAZORPAY_KEY_SECRET || ''
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex')
  if (generated_signature === razorpay_signature) {
    const enrollmentId = await storeEnrollment({ name, email, phone, course, amount: Number(amount) || 0, paymentId: razorpay_payment_id, orderId: razorpay_order_id, status: 'captured', hasGst: hasGst !== false, source: source || 'enroll' })
    try {
      await sendConfirmationEmail({ name, email, course, amount })
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr)
    }
    return res.json({ ok: true, enrollmentId })
  }
  console.error('Signature mismatch', { order: razorpay_order_id, payment: razorpay_payment_id, got: razorpay_signature, expected: generated_signature, secretLength: secret.length, source: source || 'enroll' })
  const enrollmentId = await storeEnrollment({ name, email, phone, course, amount: Number(amount) || 0, paymentId: razorpay_payment_id, orderId: razorpay_order_id, status: 'unverified', hasGst: hasGst !== false, source: source || 'enroll' })
  return res.status(400).json({ ok: false, error: 'Invalid signature', enrollmentId })
})

// ─── Payment Webhook (Razorpay server-to-server) ───
app.post('/api/payment-webhook', async (req, res) => {
  const raw = req.rawBody
  if (!raw) return res.status(400).json({ ok: false, error: 'No raw body' })
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  const signature = req.headers['x-razorpay-signature']
  if (secret) {
    const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex')
    if (signature !== expected) return res.status(400).json({ ok: false, error: 'Invalid webhook signature' })
  }
  let event
  try { event = JSON.parse(raw) } catch { return res.status(400).json({ ok: false, error: 'Invalid JSON' }) }
  if (event.event === 'payment.captured') {
    const p = event.payload.payment.entity
    const notes = p.notes || {}
    await storeEnrollment({
      name: notes.name || p.email || 'Student',
      email: p.email || notes.email || '',
      phone: p.contact || notes.phone || '',
      course: notes.course || 'Professional Course',
      amount: (p.amount || 0) / 100,
      paymentId: p.id,
      orderId: p.order_id,
      status: 'captured',
      hasGst: notes.hasGst !== 'false',
      source: notes.source || 'webhook',
    })
  }
  res.json({ ok: true })
})

async function storeEnrollment({ name, email, phone, course, amount, paymentId, orderId, status, hasGst, source }) {
  try {
    const existing = await getData('enrollments')
    const enrollments = Array.isArray(existing) ? existing : []
    const id = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
    enrollments.push({
      id,
      name: name || 'Unknown',
      email: email || '',
      phone: phone || '',
      course: course || 'Unknown',
      amount: amount || 0,
      hasGst: hasGst !== false,
      source: source || 'enroll',
      paymentId: paymentId || '',
      orderId: orderId || '',
      status: status || 'captured',
      address: '',
      city: '',
      state: '',
      pincode: '',
      company: '',
      gst: '',
      preferredBatch: '',
      createdAt: new Date().toISOString(),
    })
    await setData('enrollments', enrollments)
    return id
  } catch (err) {
    console.error('Failed to store enrollment:', err)
    return null
  }
}

app.get('/api/enrollments', requireAdmin, async (req, res) => {
  try {
    const data = await getData('enrollments')
    res.json(Array.isArray(data) ? data : [])
  } catch {
    res.status(500).json({ error: 'Failed to read enrollments' })
  }
})

app.post('/api/enrollment-details', async (req, res) => {
  const { enrollmentId, address, city, state, pincode, company, gst, preferredBatch } = req.body
  if (!enrollmentId) return res.status(400).json({ ok: false, error: 'Missing enrollmentId' })
  try {
    const existing = await getData('enrollments')
    const enrollments = Array.isArray(existing) ? existing : []
    const idx = enrollments.findIndex(e => e.id === enrollmentId)
    if (idx === -1) return res.status(404).json({ ok: false, error: 'Enrollment not found' })
    enrollments[idx] = {
      ...enrollments[idx],
      address: address || '',
      city: city || '',
      state: state || '',
      pincode: pincode || '',
      company: company || '',
      gst: gst || '',
      preferredBatch: preferredBatch || '',
    }
    await setData('enrollments', enrollments)
    res.json({ ok: true })
  } catch (err) {
    console.error('Failed to update enrollment details:', err)
    res.status(500).json({ ok: false, error: 'Failed to update enrollment details' })
  }
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

// ─── Job Applications API ───
app.post('/api/job-applications', upload.single('cv'), async (req, res) => {
  try {
    const { name, email, phone, jobId, jobTitle, message } = req.body
    if (!name || !email || !jobId) return res.status(400).json({ error: 'Name, email, and job are required' })

    const application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: jobTitle || '',
      name,
      email,
      phone: phone || '',
      message: message || '',
      cvFile: req.file ? req.file.filename : null,
      cvOriginalName: req.file ? req.file.originalname : null,
      createdAt: new Date().toISOString(),
    }

    const existing = await getData('job_applications')
    const apps = Array.isArray(existing) ? existing : []
    apps.push(application)
    await setData('job_applications', apps)

    res.json({ success: true, application })
  } catch (err) {
    console.error('job-application error', err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/job-applications', requireAdmin, async (req, res) => {
  try {
    const data = await getData('job_applications')
    res.json(Array.isArray(data) ? data : [])
  } catch (err) {
    res.status(500).json({ error: 'Failed to read applications' })
  }
})

// ─── Serve uploads ───
app.use('/uploads', express.static(UPLOAD_DIR))

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

// ─── Webinars API ───
app.get('/api/webinars', async (req, res) => {
  try {
    const data = await getData('webinars')
    if (!data) return res.json([])
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to read webinars' })
  }
})

app.post('/api/webinars', requireAdmin, async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Webinars must be an array' })
  try {
    await setData('webinars', req.body)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save webinars' })
  }
})

// ─── Batches API ───
app.get('/api/batches', async (req, res) => {
  try {
    let data = await getData('batches')
    if (!data) {
      const defaultBatches = [
        { id: '1', slug: '', title: '', course: 'aws-cloud-practitioner', date: '30-05-2026', mode: 'Evening • 4:00 PM - 7:00 PM', seats: 8, active: true },
        { id: '2', slug: '', title: '', course: 'certified-scrum-master-csm', date: '23-05-2026', mode: 'Live online', seats: 5, active: true },
        { id: '3', slug: '', title: '', course: 'devops-tools-and-training', date: '06-06-2026', mode: 'Live online', seats: 12, active: true },
        { id: '4', slug: '', title: '', course: 'itil-4-foundation', date: '23-05-2026', mode: 'Weekend cohort', seats: 6, active: true },
        { id: '5', slug: '', title: '', course: 'agile-safe-advanced-scrum-master-sasm', date: '23-05-2026', mode: 'Advanced cohort', seats: 4, active: true },
        { id: '6', slug: '', title: '', course: 'pmp', date: '23-05-2026', mode: 'Live bootcamp', seats: 3, active: true },
        { id: '7', slug: '', title: '', course: 'power-bi', date: '23-05-2026', mode: 'Data analytics track', seats: 10, active: true },
        { id: '8', slug: '', title: '', course: 'professional-scrum-master-i-psm-i', date: '23-05-2026', mode: 'Live online', seats: 7, active: true },
        { id: '9', slug: '', title: '', course: 'professional-scrum-master-ai-essentials-certification', date: '30-05-2026', mode: 'AI-enabled Scrum', seats: 9, active: true },
        { id: '10', slug: '', title: '', course: 'professional-scrum-product-owner-i-pspo-i', date: '23-05-2026', mode: 'Live online', seats: 6, active: true },
        { id: '11', slug: '', title: '', course: 'servicenow', date: '23-05-2026', mode: 'Evening cohort', seats: 8, active: true },
        { id: '12', slug: '', title: '', course: 'professional-scrum-product-owner-ii-pspo-ii', date: '30-05-2026', mode: 'Live online', seats: 11, active: true },
      ]
      await setData('batches', defaultBatches)
      return res.json(defaultBatches)
    }
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to read batches' })
  }
})

app.post('/api/batches', requireAdmin, async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Batches must be an array' })
  try {
    await setData('batches', req.body)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save batches' })
  }
})

// ─── Multer error handler ───
app.use((err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File too large. Max 10MB allowed.' })
    return res.status(400).json({ error: err.message })
  }
  if (err.message?.includes('PDF and DOCX')) return res.status(400).json({ error: err.message })
  next(err)
})

// ─── Serve frontend (production) ───
const distPath = path.join(__dirname, '..', 'dist')
const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath))
app.use(express.static(distPath, {
  maxAge: '1y',
  immutable: true,
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0')
    }
  }
}))

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'API route not found' })
  res.sendFile(path.join(distPath, 'index.html'))
})

// ─── Start ───
// ─── Auto-seed on first run ───
async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS app_data (
      key TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)
}

async function seedIfEmpty() {
  await ensureTable()
  console.log('  Syncing data to database...')
  // Always sync courses from file (curriculum updates go live on deploy)
  const coursePath = path.join(__dirname, 'courses.json')
  if (fs.existsSync(coursePath)) {
    const data = JSON.parse(fs.readFileSync(coursePath, 'utf8'))
    await setData('courses', data)
    console.log(`    ✅ courses (${Array.isArray(data) ? data.length : 'ok'})`)
  }
  // Only seed jobs/hero_slides if empty (preserve admin edits)
  const onlyIfEmpty = ['jobs', 'hero_slides']
  for (const key of onlyIfEmpty) {
    const existing = await getData(key)
    if (!existing || (Array.isArray(existing) && existing.length === 0)) {
      const p = path.join(__dirname, `${key}.json`)
      if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'))
        await setData(key, data)
        console.log(`    ✅ ${key} seeded (${Array.isArray(data) ? data.length : 'ok'})`)
      }
    }
  }
}

// ─── Start ───
const PORT = process.env.PORT || 4000
app.listen(PORT, async () => {
  console.log(`Neoskills server running on http://localhost:${PORT}`)
  if (process.env.DATABASE_URL) await seedIfEmpty()
  // expose manual re-seed endpoint for admin
  app.post('/api/reseed', requireAdmin, async (req, res) => {
    await seedIfEmpty()
    res.json({ status: 'ok', message: 'Data synced from JSON files' })
  })
  console.log(`  API:    http://localhost:${PORT}/api/health`)
  console.log(`  Frontend (if built): http://localhost:${PORT}/`)
})
