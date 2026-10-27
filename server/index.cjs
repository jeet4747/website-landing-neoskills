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
const MAIL_USER = process.env.ZOHO_EMAIL
const MAIL_PASS = process.env.ZOHO_PASSWORD
const MAIL_FROM = process.env.MAIL_FROM || MAIL_USER
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : null

// Prefer explicit SMTP host when provided (works for Zoho/custom/Workspace).
// Otherwise fall back to Gmail's well-known service (Gmail address + App Password).
const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: SMTP_PORT || 465,
      secure: (SMTP_PORT || 465) === 465,
      auth: { user: MAIL_USER, pass: MAIL_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })
  : nodemailer.createTransport({
      service: 'gmail',
      auth: { user: MAIL_USER, pass: MAIL_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })

// ─── Mail delivery ───
// Render's free tier blocks outbound SMTP (ports 25/465/587), so prefer an
// HTTPS email API when a key is configured (Resend / SendGrid / Brevo), and
// only fall back to SMTP (works locally and on paid instances).
const hasEmailProvider = () =>
  !!(process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY || process.env.BREVO_API_KEY || (MAIL_USER && MAIL_PASS))

const deliverMail = async ({ to, subject, html, replyTo, from }) => {
  const senderEmail = MAIL_FROM || 'onboarding@resend.dev'
  const recipients = Array.isArray(to) ? to : [to]

  if (process.env.RESEND_API_KEY) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: from || `Neoskills <${senderEmail}>`, to: recipients, subject, html, reply_to: replyTo || undefined }),
    })
    if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`)
    return { provider: 'resend' }
  }

  if (process.env.SENDGRID_API_KEY) {
    const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: recipients.map((email) => ({ email })) }],
        from: { email: senderEmail, name: 'Neoskills' },
        reply_to: replyTo ? { email: replyTo } : undefined,
        subject,
        content: [{ type: 'text/html', value: html }],
      }),
    })
    if (!r.ok) throw new Error(`SendGrid ${r.status}: ${await r.text()}`)
    return { provider: 'sendgrid' }
  }

  if (process.env.BREVO_API_KEY) {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { email: senderEmail, name: 'Neoskills' },
        to: recipients.map((email) => ({ email })),
        replyTo: replyTo ? { email: replyTo } : undefined,
        subject,
        htmlContent: html,
      }),
    })
    if (!r.ok) throw new Error(`Brevo ${r.status}: ${await r.text()}`)
    return { provider: 'brevo' }
  }

  await transporter.sendMail({ from: from || `"Neoskills" <${senderEmail}>`, to, subject, html, replyTo })
  return { provider: 'smtp' }
}

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
  await deliverMail(mailOptions)
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
  const map = { courses: 'courses.json', jobs: 'jobs.json', hero_slides: 'hero-slides.json', webinars: 'webinars.json', page_pricing: 'page-pricing.json' }
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
    sendConfirmationEmail({ name, email, course, amount }).catch(err => console.error('Email sending failed:', err))
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
    // Deduplicate: if same paymentId already exists, return its id
    if (paymentId) {
      const dup = enrollments.find(e => e.paymentId === paymentId)
      if (dup) return dup.id
    }
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
  // trust whatever the admin sent — no recalculation that would overwrite admin's values
  try {
    await setData('courses', newCourses)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save courses' })
  }
})

// ─── One-time cleanup: strip stale computed fields from DB ───
app.post('/api/reset-exam-fields', requireAdmin, async (req, res) => {
  try {
    const data = await getData('courses')
    if (!Array.isArray(data) || data.length === 0) return res.json({ status: 'ok', message: 'No courses to clean' })
    const cleaned = data.map(c => {
      const copy = { ...c }
      delete copy.examBody
      delete copy.examBodyUrl
      delete copy.certValidity
      return copy
    })
    await setData('courses', cleaned)
    res.json({ status: 'ok', message: `Cleaned examBody/certValidity from ${cleaned.length} courses` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Categories API ───
app.get('/api/categories', async (req, res) => {
  try {
    const data = await getData('categories')
    res.json(Array.isArray(data) ? data : [])
  } catch {
    res.status(500).json({ error: 'Failed to read categories' })
  }
})

app.post('/api/categories', requireAdmin, async (req, res) => {
  const cat = req.body
  if (!Array.isArray(cat)) return res.status(400).json({ error: 'Categories must be an array' })
  try {
    await setData('categories', cat)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save categories' })
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
const sendHiringEmail = async ({ name, email, phone, jobTitle, message, cvLink }) => {
  try {
    const hrEmail = 'resume@neoskill.co.in'
    await deliverMail({
      from: `"Neoskills Hiring" <${process.env.ZOHO_EMAIL}>`,
      to: hrEmail,
      subject: `📋 Hiring Application: ${jobTitle} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0056D2; padding: 25px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">New Job Application</h2>
          </div>
          <div style="background: #f9f9f9; padding: 25px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 100px;">Position</td><td style="padding: 8px 0; font-weight: bold;">${jobTitle}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0056D2;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${phone || 'N/A'}</td></tr>
            </table>
            ${message ? `<div style="margin-top: 16px; padding: 12px; background: white; border-radius: 8px; border-left: 3px solid #0056D2;"><p style="margin: 0; color: #333; font-size: 14px;">${message}</p></div>` : ''}
            ${cvLink ? `<div style="margin-top: 16px;"><a href="${cvLink}" style="display: inline-block; background: #0056D2; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">Download CV</a></div>` : ''}
            <p style="margin-top: 20px; color: #999; font-size: 12px;">Submitted via NeoSkills Careers</p>
          </div>
        </div>
      `,
    })
    console.log(`Hiring email sent to ${hrEmail} for ${jobTitle}`)
  } catch (err) {
    console.error('Failed to send hiring email:', err.message)
  }
}

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

    // Send email notification to HR via Nodemailer (no EmailJS template needed)
    const protocol = req.headers['x-forwarded-proto'] || req.protocol
    const host = req.headers['x-forwarded-host'] || req.get('host')
    const cvLink = application.cvFile
      ? `${protocol}://${host}/uploads/cvs/${application.cvFile}`
      : ''
    sendHiringEmail({ name, email, phone, jobTitle: jobTitle || '', message: message || '', cvLink })

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

// ─── Leads (contact / callback forms) ───
// Use a comma-separated LEAD_EMAIL value to notify multiple team members.
const LEAD_INBOXES = (process.env.LEAD_EMAIL || 'sakshigaikwad1305@gmail.com')
  .split(',')
  .map((email) => email.trim())
  .filter(Boolean)

const sendLeadEmail = async ({ name, email, phone, course, message, source }) => {
  try {
    const rawPhone = String(phone || '').replace(/[^0-9]/g, '')
    const whatsappNum = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone
    const isValidEmail = email && email.includes('@') && email.includes('.') && !email.includes('not-provided')

    await deliverMail({
      from: `"Neoskills Leads" <${MAIL_FROM}>`,
      to: LEAD_INBOXES,
      replyTo: isValidEmail ? email : undefined,
      subject: `🔔 [CALL REQUEST] ${name} — ${course || 'Counsellor Callback'}${phone ? ' (' + phone + ')' : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0056D2; padding: 25px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 22px;">📞 New Callback Request</h2>
            <p style="color: #e0edff; margin: 6px 0 0; font-size: 14px;">A student requested a counsellor callback on NeoSkills</p>
          </div>
          <div style="background: #f9f9f9; padding: 25px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; color: #666; width: 120px;">Candidate Name</td><td style="padding: 10px 0; font-weight: bold; font-size: 16px; color: #222;">${name || 'N/A'}</td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Phone Number</td><td style="padding: 10px 0; font-weight: bold; font-size: 18px; color: #0056D2;"><a href="tel:${phone}" style="color: #0056D2; text-decoration: none;">${phone || 'N/A'}</a></td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Email</td><td style="padding: 10px 0;">${isValidEmail ? `<a href="mailto:${email}" style="color: #0056D2;">${email}</a>` : '<span style="color: #888;">(Phone callback requested)</span>'}</td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Interested Course</td><td style="padding: 10px 0; font-weight: 600; color: #333;">${course || 'Free Counsellor Callback'}</td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Source</td><td style="padding: 10px 0;"><span style="background: #eef2ff; color: #3730a3; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">${source || 'counsellor-popup'}</span></td></tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #0056D2;">
              <p style="margin: 0; color: #555; font-size: 14px;"><strong>Message / Notes:</strong></p>
              <p style="margin: 6px 0 0; color: #222; font-size: 14px;">${message || 'Candidate requested an urgent callback from a counsellor regarding course guidance.'}</p>
            </div>

            <div style="margin-top: 25px; text-align: center;">
              <a href="tel:${phone}" style="display: inline-block; background: #0056D2; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-right: 10px;">
                📞 Call Candidate Now
              </a>
              ${whatsappNum ? `
                <a href="https://wa.me/${whatsappNum}?text=Hi%20${encodeURIComponent(name || 'there')},%20this%20is%20NeoSkills%20regarding%20your%20counsellor%20callback%20request." style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                  💬 WhatsApp
                </a>
              ` : ''}
            </div>

            <p style="margin-top: 25px; color: #999; font-size: 11px; text-align: center;">
              Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST • NeoSkills Learning Solutions
            </p>
          </div>
        </div>
      `,
    })
    console.log(`Lead email sent to ${LEAD_INBOXES.join(', ')} for ${name} (${phone})`)
    return { ok: true }
  } catch (err) {
    console.error('Failed to send lead email:', err.code || '', err.message)
    return { ok: false, error: err.message }
  }
}

// ─── Automated WhatsApp Notifications to 7666621156 ───
const WHATSAPP_COUNSELLOR_NUMBER = process.env.WHATSAPP_COUNSELLOR_NUMBER || '917666621156'

const sendWhatsAppNotification = async ({ name, phone, course, message }) => {
  const apikey = process.env.CALLMEBOT_APIKEY
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL
  const waText = `🔔 *New NeoSkills Lead*\n👤 Candidate: ${name}\n📱 Mobile: ${phone}\n🎯 Course: ${course || 'Free Counsellor Callback'}`

  if (apikey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_COUNSELLOR_NUMBER}&text=${encodeURIComponent(waText)}&apikey=${apikey}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`CallMeBot returned ${response.status}: ${await response.text()}`)
      }
      console.log(`[WHATSAPP ALERT] Sent to ${WHATSAPP_COUNSELLOR_NUMBER}`)
    } catch (e) {
      console.error('CallMeBot notification error:', e.message)
    }
  }

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: WHATSAPP_COUNSELLOR_NUMBER, name, phone, course, message, text: waText }),
      })
      console.log(`[WHATSAPP WEBHOOK] Dispatched to ${webhookUrl}`)
    } catch (e) {
      console.error('WhatsApp webhook error:', e.message)
    }
  }
}

// Best-effort reCAPTCHA verification. Never blocks lead capture, only records the result.
async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return null
  if (!token) return false
  if (token.startsWith('verified-') || token.startsWith('fallback-')) return true
  try {
    const body = new URLSearchParams({ secret, response: token })
    const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = await r.json()
    return !!data.success
  } catch (err) {
    console.error('reCAPTCHA verify error:', err.message)
    return null
  }
}

app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, course, message, source, 'g-recaptcha-response': recaptchaToken } = req.body || {}
    if (!name || (!phone && !email)) {
      return res.status(400).json({ error: 'Name and a phone or email are required' })
    }

    const captchaOk = await verifyRecaptcha(recaptchaToken)

    const lead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      phone: String(phone || '').trim(),
      course: course || 'Free Counsellor Callback',
      message: message || '',
      source: source || 'counsellor-popup',
      status: 'new',
      notes: '',
      captchaOk,
      createdAt: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
    }

    // Always persist the lead first so it is never lost
    const existing = await getData('leads')
    const leads = Array.isArray(existing) ? existing : []
    leads.push(lead)
    await setData('leads', leads)
    console.log(`[LEAD RECEIVED] ${lead.name} | ${lead.phone} | ${lead.course} [${lead.source}]`)

    // Automated WhatsApp alert to 7666621156 if provider/webhook configured
    sendWhatsAppNotification({ name: lead.name, phone: lead.phone, course: lead.course, message: lead.message }).catch(() => {})

    // Best-effort email notification. Only attempt it when a provider is
    // configured, and never block the response on it (SMTP can take ~10s to
    // time out on hosts that block the ports, which would stall the form).
    const emailProvider = hasEmailProvider()
    if (emailProvider) {
      sendLeadEmail({ name: lead.name, email: lead.email, phone: lead.phone, course: lead.course, message: lead.message, source: lead.source }).catch(() => {})
    }

    res.json({ success: true, lead, emailProvider })
  } catch (err) {
    console.error('lead error', err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/leads', requireAdmin, async (req, res) => {
  try {
    const data = await getData('leads')
    res.json(Array.isArray(data) ? data : [])
  } catch (err) {
    res.status(500).json({ error: 'Failed to read leads' })
  }
})

app.patch('/api/leads/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { status, notes } = req.body || {}
    const existing = await getData('leads')
    const leads = Array.isArray(existing) ? existing : []
    const idx = leads.findIndex(l => l.id === id)
    if (idx === -1) return res.status(404).json({ error: 'Lead not found' })

    if (status !== undefined) leads[idx].status = status
    if (notes !== undefined) leads[idx].notes = notes
    leads[idx].updatedAt = new Date().toISOString()

    await setData('leads', leads)
    res.json({ success: true, lead: leads[idx] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/leads/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const existing = await getData('leads')
    const leads = Array.isArray(existing) ? existing : []
    const updated = leads.filter(l => l.id !== id)
    await setData('leads', updated)
    res.json({ success: true, removedId: id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Mail configuration diagnostic — shows which provider is active and verifies SMTP.
app.get('/api/mail-check', requireAdmin, async (req, res) => {
  const providers = {
    resend: !!process.env.RESEND_API_KEY,
    sendgrid: !!process.env.SENDGRID_API_KEY,
    brevo: !!process.env.BREVO_API_KEY,
    smtp: !!(MAIL_USER && MAIL_PASS),
  }
  const active = providers.resend ? 'resend' : providers.sendgrid ? 'sendgrid' : providers.brevo ? 'brevo' : providers.smtp ? 'smtp' : null
  const out = { configured: !!active, active, providers, from: MAIL_FROM || null, user: MAIL_USER || null }
  if (active === 'smtp') {
    try {
      await transporter.verify()
      out.ok = true
    } catch (err) {
      out.ok = false
      out.code = err.code
      out.error = err.message
    }
  } else {
    out.ok = !!active
  }
  res.json(out)
})

// Send a live test email through the active provider.
app.get('/api/mail-test', requireAdmin, async (req, res) => {
  const to = req.query.to || LEAD_INBOX
  try {
    const result = await deliverMail({ to, subject: '✅ NeoSkills mail test', html: '<p>This is a test message from your NeoSkills backend. If you got this, lead emails will work.</p>' })
    res.json({ ok: true, ...result, to })
  } catch (err) {
    res.json({ ok: false, to, error: err.message })
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

// ─── Page Pricing API ───
const DEFAULT_PAGE_PRICING = { aiHrFee: 25000, aiPmFee: 5999 }
const PAGE_PRICING_KEYS = ['aiHrFee', 'aiPmFee']

app.get('/api/page-pricing', async (req, res) => {
  try {
    const data = await getData('page_pricing')
    res.json({ ...DEFAULT_PAGE_PRICING, ...(data || {}) })
  } catch (err) {
    res.status(500).json({ error: 'Failed to read page pricing' })
  }
})

app.post('/api/page-pricing', requireAdmin, async (req, res) => {
  const updates = {}
  for (const key of PAGE_PRICING_KEYS) {
    if (req.body?.[key] === undefined) continue
    const fee = Number(req.body[key])
    if (!Number.isFinite(fee) || fee <= 0) {
      return res.status(400).json({ error: `${key} must be a positive number` })
    }
    updates[key] = Math.round(fee)
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No pricing values provided' })
  }
  try {
    const existing = await getData('page_pricing')
    const pricing = { ...DEFAULT_PAGE_PRICING, ...(existing || {}), ...updates }
    await setData('page_pricing', pricing)
    res.json({ success: true, ...pricing })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save page pricing' })
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
app.use(express.static(publicPath, {
  maxAge: '1d',
  setHeaders(res, filePath) {
    if (/\.(svg|png|jpg|jpeg|webp|ico)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=604800')
    }
    if (filePath.endsWith('.xml') || filePath.endsWith('.txt')) {
      res.setHeader('Cache-Control', 'public, max-age=3600')
    }
  }
}))
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
  // Courses: merge new entries from courses.json into existing DB courses
  // so newly added static courses (e.g. PSK) appear in admin without overwriting admin edits.
  const coursesPath = path.join(__dirname, 'courses.json')
  if (fs.existsSync(coursesPath)) {
    const fileCourses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'))
    const dbCourses = await getData('courses')
    if (!dbCourses || !Array.isArray(dbCourses) || dbCourses.length === 0) {
      await setData('courses', fileCourses)
      console.log(`    ✅ courses seeded from file (${fileCourses.length} courses)`)
    } else {
      // Strip stale examBody/examBodyUrl from all courses — these are always
      // computed from the title by the frontend catalogBuilder at runtime.
      // Old saved data (e.g. "PMI®" on a Scrum.org course) would otherwise
      // override the correct generated values.
      let changed = false
      const cleaned = dbCourses.map(c => {
        if ('examBody' in c || 'examBodyUrl' in c) {
          changed = true
          const { examBody, examBodyUrl, ...rest } = c
          return rest
        }
        return c
      })
      // Merge new entries from courses.json into existing DB courses
      const dbSlugs = new Set(cleaned.map(c => (c.slug || '').toLowerCase()))
      const newCourses = fileCourses.filter(c => !dbSlugs.has((c.slug || '').toLowerCase()))
      if (changed || newCourses.length > 0) {
        await setData('courses', [...cleaned, ...newCourses])
        const msgs = []
        if (changed) msgs.push('stripped stale examBody/examBodyUrl')
        if (newCourses.length > 0) msgs.push(`${newCourses.length} new course(s) added (${newCourses.map(c => c.slug).join(', ')})`)
        console.log(`    ✅ courses: ${msgs.join('; ')}`)
      } else {
        console.log('    ⏭ courses: no changes')
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
