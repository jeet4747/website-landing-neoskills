import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, Clock, Users } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_GENERAL, EMAILJS_PUBLIC_KEY } from '../config/emailjs'

const SHOW_DELAY = 120000

export default function LeadPopup() {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const shownRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!shownRef.current) {
        shownRef.current = true
        setShow(true)
      }
    }, SHOW_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = useCallback(() => {
    setShow(false)
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_GENERAL, {
        user_name: form.name,
        user_email: form.email,
        user_phone: form.phone,
        course: form.course || 'Popup inquiry',
        message: 'Interested in learning more',
      }, EMAILJS_PUBLIC_KEY)
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }, [form])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-10 text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-dark mb-2">Thank You!</h3>
                <p className="text-gray-500 mb-6">We'll contact you shortly with batch details.</p>
                <button
                  onClick={() => setShow(false)}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                >
                  Got it
                </button>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-primary to-blue-800 p-8 text-white">
                  <div className="flex items-center gap-2 text-accent font-semibold text-sm mb-2">
                    <Clock size={14} />
                    Limited Seats Available
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Get Free Career Counselling</h3>
                  <p className="text-white/80 text-sm">
                    Fill in your details and our counsellor will reach out within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                  >
                    <option value="">Select a course *</option>
                    <option value="PMP">PMP</option>
                    <option value="ITIL 4 Foundation">ITIL 4 Foundation</option>
                    <option value="PRINCE2">PRINCE2</option>
                    <option value="Certified Scrum Master">Certified Scrum Master</option>
                    <option value="AWS Cloud Practitioner">AWS Cloud Practitioner</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Power BI">Power BI</option>
                    <option value="Other">Other</option>
                  </select>

                  {error && (
                    <p className="text-red-500 text-xs text-center">{error}</p>
                  )}

                  <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                    <span>I Authorize NEOSKILLS to send Notification via SMS/RCS/CALL/Email/Whatsapp.</span>
                  </label>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users size={12} />
                    <span>We respect your privacy. No spam, guaranteed.</span>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? 'Sending...' : (
                      <>
                        Get Free Counselling
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
