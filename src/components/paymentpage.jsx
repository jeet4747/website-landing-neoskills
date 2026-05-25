import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Shield, CheckCircle, IndianRupee, CreditCard, ArrowLeft, Copy, ExternalLink, Smartphone } from 'lucide-react'
import { getAllResolvedCourses } from '../data/catalogBuilder'
import { fetchBackendCourses } from '../data/courseService'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const UPI_ID = 'neoskills@sbi'
const UPI_NAME = 'NeoSkills Learning Solutions'

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)
}

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state: paymentData } = location
  const [customAmount, setCustomAmount] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [allCourses, setAllCourses] = useState([])

  useEffect(() => {
    if (!paymentData && !selectedCourse) {
      navigate('/', { replace: true })
    }
  }, [paymentData, selectedCourse, navigate])

  useEffect(() => {
    const courses = getAllResolvedCourses()
    setAllCourses(courses)
    fetchBackendCourses().then(data => {
      if (data && data.length > 0) setAllCourses(data)
    })
  }, [])

  useEffect(() => {
    if (paymentData?.course && !selectedCourse) {
      setSelectedCourse(paymentData.course)
    }
  }, [paymentData])

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

  const selectedLabel = courseOptions.find(c => c.value === selectedCourse || c.label === selectedCourse)?.label || paymentData?.course || 'Professional Course'

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${total}&cu=INR`
  const paymentLink = `${window.location.origin}/enroll?course=${selectedCourse}`

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!paymentData && !selectedCourse) return null

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
        body: JSON.stringify({ amount: total }),
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
                course: paymentData.course || paymentData.plan || 'Professional Course',
                amount: total,
              }),
            })
            const json = await verify.json()
            if (verify.ok && json.ok) {
              alert(`Payment successful! A confirmation email has been sent to ${paymentData.email}`)
              setCustomAmount(null)
              navigate('/')
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
          <div className="lg:col-span-3 space-y-6">
            {/* ─── Order Summary ─── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl"><CreditCard className="text-primary" size={24} /></div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Complete Payment</h1>
                  <p className="text-sm text-gray-500">{selectedLabel}</p>
                </div>
              </div>

              {/* ─── Select Module ─── */}
              <div className="border border-gray-200 rounded-xl p-5 mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Module / Course</label>
                <p className="text-xs text-gray-400 mb-3">Choose the course you want to pay for.</p>
                <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                  <option value="">Select a course</option>
                  {courseOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-700">Order Summary</span>
                  <span className="text-xs text-gray-400">{paymentData?.name || 'Student'}</span>
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
                  <input type="number" min="0" placeholder="Leave blank for default"
                    value={customAmount !== null ? customAmount : ''}
                    onChange={handleCustomAmountChange}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                </div>
              </div>

              {/* ─── Pay via Razorpay ─── */}
              <motion.button onClick={handlePay} disabled={processing}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-base">
                {processing ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
                ) : (
                  <>Pay {formatINR(total)} via Card / UPI / NetBanking <Lock size={18} /></>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Lock size={12} /> Secured by Razorpay</span>
                <span className="flex items-center gap-1"><Shield size={12} /> 256-bit SSL</span>
              </div>
            </div>

            {/* ─── Direct UPI Payment ─── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-green-50 rounded-xl"><Smartphone className="text-green-600" size={22} /></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Direct UPI Payment</h3>
                  <p className="text-xs text-gray-500">Pay directly via any UPI app</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100">
                    {/* Simple QR representation */}
                    <div className="w-32 h-32 bg-white border-2 border-green-300 rounded-lg flex items-center justify-center">
                      <a href={upiLink} target="_blank" rel="noopener noreferrer" className="text-center p-2">
                        <Smartphone size={40} className="text-green-600 mx-auto mb-1" />
                        <span className="text-[10px] font-semibold text-gray-600 block">Scan to Pay</span>
                      </a>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs text-gray-500 mb-1">UPI ID</p>
                    <div className="flex items-center gap-2 mb-3">
                      <code className="text-lg font-bold text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200">{UPI_ID}</code>
                      <button onClick={handleCopyUpi}
                        className="shrink-0 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">Open any UPI app (Google Pay, PhonePe, Paytm) and scan the QR or send to this UPI ID.</p>
                    <a href={upiLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-green-700 bg-green-100 px-4 py-2 rounded-xl hover:bg-green-200 transition-colors">
                      Pay via UPI <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Payment Link ─── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-blue-50 rounded-xl"><ExternalLink className="text-blue-600" size={22} /></div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Payment Link</h3>
                  <p className="text-xs text-gray-500">Share this link with students for quick payment</p>
                </div>
              </div>
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Payment URL for {selectedLabel}</label>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={paymentLink}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 font-mono text-xs select-all" />
                  <button onClick={() => { navigator.clipboard.writeText(paymentLink); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                    className="shrink-0 px-4 py-2.5 text-xs font-medium text-primary bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors flex items-center gap-1">
                    <Copy size={14} /> Copy
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Students clicking this link will be taken directly to the enrollment page with this course preselected.</p>
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
              <button onClick={() => navigate('/')}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Cancel and return home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
