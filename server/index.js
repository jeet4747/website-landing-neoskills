const express = require('express')
const Razorpay = require('razorpay')
const cors = require('cors')
const crypto = require('crypto')
require('dotenv').config()

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('Warning: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set in environment')
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

// Create an order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount } = req.body
    if (!amount || isNaN(amount)) return res.status(400).json({ error: 'Invalid amount' })

    const amountPaise = Math.round(Number(amount) * 100)
    const options = {
      amount: amountPaise,
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

// Verify payment signature
app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ ok: false, error: 'Missing parameters' })
  }

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex')

  if (generated_signature === razorpay_signature) return res.json({ ok: true })
  return res.status(400).json({ ok: false, error: 'Invalid signature' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Razorpay backend listening on http://localhost:${PORT}`))
