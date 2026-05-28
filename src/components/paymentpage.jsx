import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Shield, CheckCircle, IndianRupee, CreditCard, ArrowLeft } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)
}

export default function PaymentPage() {
  const navigate = useNavigate()
  const { state: paymentData } = useLocation()
  const [customAmount, setCustomAmount] = useState(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!paymentData) {
      navigate('/', { replace: true })
    }
  }, [paymentData, navigate])

  if (!paymentData) return null

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
    setProcessing(true)
    try {
      await loadRazorpay()

      const res = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          name: paymentData.name || 'Student',
          email: paymentData.email || '',
          phone: paymentData.phone || '',
          course: paymentData.course || paymentData.plan || 'Professional Course',
        }),
      })
      if (!res.ok) throw new Error('Failed to create order')
      const { order, key } = await res.json()
      if (!key) throw new Error('Razorpay key not configured on server')

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: 'NeoSkills',
        description: paymentData.course || paymentData.plan || 'Course Payment',
        order_id: order.id,
        prefill: {
          name: paymentData.name || '',
          email: paymentData.email || '',
          contact: paymentData.phone || '',
        },
        handler: async (response) => {
          try {
            const verify = await fetch(`${BACKEND_URL}/api/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                name: paymentData.name || 'Student',
                email: paymentData.email || '',
                phone: paymentData.phone || '',
                course: paymentData.course || paymentData.plan || 'Professional Course',
                amount: total,
                hasGst: true,
                source: paymentData.source || 'enroll',
              }),
            })
            const json = await verify.json()
            if (verify.ok && json.ok) {
              navigate('/payment/success', {
                state: {
                  enrollmentId: json.enrollmentId,
                  name: paymentData.name || 'Student',
                  email: paymentData.email || '',
                  phone: paymentData.phone || '',
                  course: paymentData.course || paymentData.plan || 'Professional Course',
                  amount: total,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                },
              })
            } else {
              console.error('Verification failed', json)
              if (json.enrollmentId) {
                navigate('/payment/success', {
                  state: {
                    enrollmentId: json.enrollmentId,
                    name: paymentData.name || 'Student',
                    email: paymentData.email || '',
                    phone: paymentData.phone || '',
                    course: paymentData.course || paymentData.plan || 'Professional Course',
                    amount: total,
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                  },
                })
              } else {
                alert('Payment could not be verified. Contact support.')
              }
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
        setProcessing(false)
      })
      rzp.open()
    } catch (err) {
      console.error('Payment initiation error', err)
      alert('Could not start payment. Please try again later.')
      setProcessing(false)
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm font-medium">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <span className="text-sm text-gray-400 font-medium">Secure Checkout</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl"><CreditCard className="text-primary" size={24} /></div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
                  <p className="text-sm text-gray-500">{paymentData.course || paymentData.plan || 'Professional Course'}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-700">Order Summary</span>
                  <span className="text-xs text-gray-400">{paymentData.name || 'Student'}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Course Fee</span>
                    <span className="font-semibold text-gray-900">{formatINR(base)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-semibold text-gray-900">{formatINR(gst)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total Due</span>
                    <span className="font-bold text-xl text-primary">{formatINR(total)}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Override base amount (optional)</label>
                <p className="text-xs text-gray-400 mb-3">If your invoice reflects a different agreed fee, enter it here.</p>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-medium"><IndianRupee size={16} className="inline" /></span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Leave blank for default"
                    value={customAmount !== null ? customAmount : ''}
                    onChange={handleCustomAmountChange}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              <motion.button
                onClick={handlePay}
                disabled={processing}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-base"
              >
                {processing ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
                ) : (
                  <>Pay {formatINR(total)} <Lock size={18} /></>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Lock size={12} /> Secured by Razorpay</span>
                <span className="flex items-center gap-1"><Shield size={12} /> 256-bit SSL</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                What You Get
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> Live instructor-led training</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> Course materials & recordings</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> Mock exams & practice tests</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> Exam registration guidance</li>
                <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> Batch coordination support</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-6 text-white">
              <Shield size={32} className="mb-3 opacity-90" />
              <h3 className="font-bold text-lg mb-1">Secure Payment</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Your payment is processed through Razorpay's secure gateway. We do not store your card or UPI details.
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
                <span>Razorpay</span>
                <span className="w-px h-4 bg-white/30"></span>
                <span>PCI DSS</span>
                <span className="w-px h-4 bg-white/30"></span>
                <span>SSL</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancel and return home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
