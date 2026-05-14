const express = require('express')
const Razorpay = require('razorpay')
const cors = require('cors')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Nodemailer Zoho transporter
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
          <p style="font-size: 16px; color: #333;">
            Thank you for enrolling with <strong>Neoskills</strong>! Your payment has been successfully received.
          </p>
          <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #0056D2;">
            <h3 style="color: #0056D2; margin-top: 0;">Payment Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666;">Course</td>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">${course}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Amount Paid</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0056D2;">₹${amount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Status</td>
                <td style="padding: 8px 0; font-weight: bold; color: green;">✅ Confirmed</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 15px; color: #333;">
            Our team will contact you shortly with <strong>batch details</strong> and next steps.
          </p>
          <p style="font-size: 15px; color: #333;">
            Questions? Reach us at 
            <a href="mailto:contact@neoskills.co.in" style="color: #0056D2;">contact@neoskills.co.in</a>
            or call <strong>+91 8087020031</strong>.
          </p>
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

app.get('/', (req, res) => {
  res.json({ status: 'Neoskills Payment Server is running' })
})

app.post('/api/create-order', async (req, res) => {
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

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Razorpay backend listening on http://localhost:${PORT}`))