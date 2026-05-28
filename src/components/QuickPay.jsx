import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, IndianRupee, CreditCard, ArrowLeft } from 'lucide-react'
import { getAllResolvedCourses } from '../data/catalogBuilder'
import { fetchBackendCourses } from '../data/courseService'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

export default function QuickPay() {
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [amount, setAmount] = useState('')
  const [allCourses, setAllCourses] = useState([])

  useEffect(() => {
    const courses = getAllResolvedCourses()
    setAllCourses(courses)
    fetchBackendCourses().then(data => {
      if (data && data.length > 0) setAllCourses(data)
    })
  }, [])

  const courseOptions = useMemo(() => {
    const options = []
    const seen = new Set()
    for (const c of allCourses) {
      if (!c.title || seen.has(c.slug)) continue
      seen.add(c.slug)
      options.push({ value: c.slug, label: c.fullTitle || c.title })
    }
    options.sort((a, b) => a.label.localeCompare(b.label))
    return options
  }, [allCourses])

  const selectedLabel = courseOptions.find(c => c.value === selectedCourse)?.label || ''
  const total = Number(amount) || 0

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
    if (!selectedCourse) { alert('Please select a training module'); return }
    if (total < 1) { alert('Please enter a valid amount'); return }
    setProcessing(true)
    try {
      await loadRazorpay()
      const res = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })
      if (!res.ok) throw new Error('Failed to create order')
      const { order, key } = await res.json()
      if (!key) throw new Error('Razorpay key not configured on server')

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: 'NeoSkills',
        description: selectedLabel || 'Training Payment',
        order_id: order.id,
        handler: async (response) => {
          try {
            const verify = await fetch(`${BACKEND_URL}/api/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                name: 'Student',
                email: '',
                phone: '',
                course: selectedLabel,
                amount: total,
                hasGst: false,
                source: 'quick-pay',
              }),
            })
            const json = await verify.json()
            if (verify.ok && json.ok) {
              navigate('/payment/success', {
                state: {
                  enrollmentId: json.enrollmentId,
                  name: 'Student',
                  email: '',
                  phone: '',
                  course: selectedLabel,
                  amount: total,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                },
              })
            } else {
              if (json.enrollmentId) {
                navigate('/payment/success', {
                  state: {
                    enrollmentId: json.enrollmentId,
                    name: 'Student',
                    email: '',
                    phone: '',
                    course: selectedLabel,
                    amount: total,
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                  },
                })
              } else {
                alert('Payment verification failed. Contact support.')
              }
            }
          } catch {
            alert('Payment verification failed. Contact support.')
          }
        },
        modal: { escape: true },
        theme: { color: '#0056D2' },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => {
        alert('Payment failed. Please try again.')
        setProcessing(false)
      })
      rzp.open()
    } catch {
      alert('Could not start payment. Please try again later.')
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm font-medium">
            <ArrowLeft size={18} /> Back
          </Link>
          <span className="text-sm text-gray-400 font-medium">Quick Pay</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-primary/10 rounded-xl"><CreditCard className="text-primary" size={24} /></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quick Pay</h1>
              <p className="text-sm text-gray-500">Select training and enter the amount to pay</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Training Module</label>
              <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option value="">Choose a training...</option>
                {courseOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount (₹)</label>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-medium text-lg"><IndianRupee size={20} className="inline" /></span>
                <input type="number" min="1" placeholder="Enter the amount to pay"
                  value={amount} onChange={e => setAmount(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Enter the exact amount as agreed. No additional taxes or fees.</p>
            </div>

            {total > 0 && selectedCourse && (
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">{selectedLabel}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Amount to pay</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}

            <motion.button onClick={handlePay} disabled={processing || !selectedCourse || total < 1}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base">
              {processing ? (
                <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
              ) : (
                <>Pay ₹{total.toLocaleString('en-IN')} via Razorpay <Lock size={18} /></>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Lock size={12} /> Secured by Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
