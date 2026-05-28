import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, IndianRupee, ArrowLeft, Building, MapPin, Clock, FileText } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

export default function PostPaymentForm() {
  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state || !state.enrollmentId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No payment data found</h1>
          <p className="text-gray-500 mb-6">Please complete a payment first.</p>
          <Link to="/" className="text-primary hover:underline">Go to Home</Link>
        </div>
      </div>
    )
  }

  const [details, setDetails] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    company: '',
    gst: '',
    preferredBatch: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${BACKEND_URL}/api/enrollment-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId: state.enrollmentId, ...details }),
      })
      const json = await res.json()
      if (res.ok && json.ok) {
        setDone(true)
      } else {
        alert('Failed to save details. Please contact support.')
      }
    } catch {
      alert('Failed to save details. Please contact support.')
    }
    setSubmitting(false)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
          <p className="text-gray-500 mb-6">Your details have been saved. Our team will contact you within 24 hours with batch confirmation and next steps.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm text-gray-600 space-y-1">
            <p><strong>Course:</strong> {state.course || '—'}</p>
            <p><strong>Amount Paid:</strong> ₹{Number(state.amount || 0).toLocaleString('en-IN')}</p>
            <p><strong>Payment ID:</strong> <span className="text-xs font-mono">{state.paymentId || '—'}</span></p>
          </div>
          <button onClick={() => navigate('/')} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-all">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm font-medium">
            <ArrowLeft size={18} /> Home
          </Link>
          <span className="text-sm text-gray-400 font-medium">Complete Your Profile</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-green-100 rounded-full"><CheckCircle className="text-green-600" size={24} /></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
              <p className="text-gray-500">Please provide your details so we can activate your enrollment.</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <span><strong>Course:</strong> {state.course || '—'}</span>
            <span><strong>Amount Paid:</strong> <IndianRupee size={12} className="inline" />{Number(state.amount || 0).toLocaleString('en-IN')}</span>
            <span><strong>Payment ID:</strong> <span className="font-mono text-xs">{(state.paymentId || '').slice(-12)}</span></span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Additional Details</h2>
          <p className="text-sm text-gray-500 mb-6">This helps us generate your invoice and coordinate batch allocation.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <MapPin size={14} /> Full Address
              </label>
              <textarea name="address" value={details.address} onChange={handleChange} rows={2}
                placeholder="Street, locality, landmark..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                <input type="text" name="city" value={details.city} onChange={handleChange}
                  placeholder="Mumbai"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">State</label>
                <input type="text" name="state" value={details.state} onChange={handleChange}
                  placeholder="Maharashtra"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pincode</label>
                <input type="text" name="pincode" value={details.pincode} onChange={handleChange}
                  placeholder="400001"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Building size={14} /> Company Name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input type="text" name="company" value={details.company} onChange={handleChange}
                  placeholder="ABC Corp"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <FileText size={14} /> GST Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input type="text" name="gst" value={details.gst} onChange={handleChange}
                  placeholder="27ABCDE1234F1Z5"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Clock size={14} /> Preferred Batch Timing
              </label>
              <select name="preferredBatch" value={details.preferredBatch} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option value="">Select a batch time...</option>
                <option value="weekday-morning">Weekday Morning (8-10 AM)</option>
                <option value="weekday-evening">Weekday Evening (7-9 PM)</option>
                <option value="weekend">Weekend (Sat/Sun, 10 AM - 4 PM)</option>
                <option value="flexible">Flexible / Self-Paced</option>
              </select>
            </div>

            <button type="submit" disabled={submitting}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed text-base">
              {submitting ? 'Saving...' : 'Confirm & Complete Enrollment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
