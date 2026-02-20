import React, { useState } from 'react'
import { useEnroll } from '../context/EnrollContext'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)
}

export default function PaymentPage() {
  const { isPaymentOpen, paymentData, closePayment } = useEnroll()
  const [customAmount, setCustomAmount] = useState(null)

  if (!isPaymentOpen || !paymentData) return null

  const defaultBase = Number(paymentData.amount || paymentData.baseAmount || 5999)
  const base = customAmount !== null ? Number(customAmount) : defaultBase
  const gst = +(base * 0.18).toFixed(2)
  const total = +(base + gst).toFixed(2)

  const loadRazorpay = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true)
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => reject(new Error('Razorpay SDK failed to load'))
      document.body.appendChild(script)
    })

  const handlePay = async () => {
    try {
      await loadRazorpay()

      // create order on backend (amount in rupees)
      const res = await fetch('http://localhost:4000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })
      if (!res.ok) throw new Error('Failed to create order')
      const { order, key } = await res.json()

      const options = {
        key: key, // public key from server
        amount: order.amount,
        currency: order.currency,
        name: 'Neoskills',
        description: paymentData.course || paymentData.plan || 'Course Payment',
        order_id: order.id,
        prefill: {
          name: paymentData.name || '',
          email: paymentData.email || '',
          contact: paymentData.phone || '',
        },
        handler: async (response) => {
          // verify on server
          try {
            const verify = await fetch('http://localhost:4000/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            })
            const json = await verify.json()
            if (verify.ok && json.ok) {
              alert(`Payment successful! Paid ${formatINR(total)}`)
              setCustomAmount(null)
              closePayment()
            } else {
              console.error('Verification failed', json)
              alert('Payment verification failed. Contact support.')
            }
          } catch (err) {
            console.error('Verification error', err)
            alert('Payment verification failed. Contact support.')
          }
        },
        modal: { escape: true },
        theme: { color: '#0056D2' },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed', response)
        alert('Payment failed. Please try again.')
      })
      rzp.open()
    } catch (err) {
      console.error('Payment initiation error', err)
      alert('Could not start payment. Please try again later.')
    }
  }

  const handleCustomAmountChange = (e) => {
    const value = e.target.value
    if (value === '' || value === '-') {
      setCustomAmount(null)
    } else if (!isNaN(value) && Number(value) >= 0) {
      setCustomAmount(value)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl w-11/12 max-w-md p-8 relative"
      >
        {/* Close Button */}
        <motion.button 
          onClick={closePayment}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </motion.button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-dark mb-2">Payment Details</h2>
          <p className="text-gray-600">
            Course: <span className="font-semibold text-primary">{paymentData.course || paymentData.plan || 'Professional Course'}</span>
          </p>
        </div>

        {/* Price Section */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            {/* Offered Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Our Offered Price</label>
              <div className="text-3xl font-bold text-primary">{formatINR(defaultBase)}</div>
            </div>

            {/* Custom Price Input */}
            <div className="border-t-2 border-gray-200 pt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Or Enter Your Custom Price (₹)
              </label>
              <motion.input
                type="number"
                min="0"
                placeholder="Enter custom amount"
                value={customAmount !== null ? customAmount : ''}
                onChange={handleCustomAmountChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors text-lg font-semibold"
                whileFocus={{ borderColor: '#0056D2' }}
              />
              {customAmount !== null && customAmount !== '' && (
                <p className="text-sm text-primary mt-2 font-medium">
                  Custom amount: {formatINR(customAmount)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <motion.div 
          layout
          className="space-y-3 mb-6 bg-white rounded-lg border-2 border-gray-200 p-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Base Amount</span>
            <motion.span 
              key={base}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-bold text-lg text-dark"
            >
              {formatINR(base)}
            </motion.span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-t-2 border-dashed border-gray-300">
            <span className="text-gray-700 font-medium">GST (18%)</span>
            <motion.span 
              key={gst}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-bold text-lg text-accent"
            >
              {formatINR(gst)}
            </motion.span>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t-2 border-primary bg-primary/10 px-3 py-2 rounded-lg">
            <span className="text-dark font-bold text-lg">Total Amount</span>
            <motion.span 
              key={total}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-bold text-2xl text-primary"
            >
              {formatINR(total)}
            </motion.span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={handlePay}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0, 86, 210, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-2/3 font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Pay Now
          </motion.button>
          <motion.button
            onClick={() => {
              setCustomAmount(null)
              closePayment()
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline w-1/3 font-bold py-3 rounded-lg border-2"
          >
            Cancel
          </motion.button>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-600 text-center mt-4">
          💳 You will be redirected to a secure Razorpay checkout to complete payment.
        </p>
      </motion.div>
    </motion.div>
  )
}
