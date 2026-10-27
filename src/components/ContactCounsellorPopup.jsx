import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, Headphones, ShieldCheck, Phone, MessageSquare } from 'lucide-react'
import { submitLead } from '../config/leads'
import RecaptchaCheckbox from './RecaptchaCheckbox'

const SHOW_DELAY = 3000
const COUNSELLOR_WHATSAPP = '918956963953'
const COUNSELLOR_PHONE = '8956963953'
const CALLBACK_ALERT_EMAIL = 'sakshigaikwad1305@gmail.com'

export default function ContactCounsellorPopup() {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaError, setCaptchaError] = useState(false)

  const recaptchaRef = useRef(null)
  const shownRef = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem('neoskills_counsellor_popup_shown')) return
    const timer = setTimeout(() => {
      if (!shownRef.current) {
        shownRef.current = true
        sessionStorage.setItem('neoskills_counsellor_popup_shown', '1')
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

    const name = form.name.trim()
    const phone = form.phone.trim()

    if (!name) {
      setError('Please enter your full name.')
      return
    }
    if (!phone || phone.length < 8) {
      setError('Please enter a valid phone number.')
      return
    }

    // If reCAPTCHA loaded cleanly but user hasn't ticked it yet
    if (!captchaToken && !captchaError) {
      setError('Please check the verification box to continue.')
      return
    }

    setSending(true)
    const effectiveToken = captchaToken || 'verified-popup-lead'

    try {
      await submitLead(
        {
          name,
          phone,
          email: CALLBACK_ALERT_EMAIL,
          course: 'Free Counsellor Callback',
          message: `Candidate requested a free counsellor callback. Contact: ${phone}`,
          captchaToken: effectiveToken,
          source: 'counsellor-popup',
        },
        {
          emailjsParams: {
            name,
            from_name: name,
            user_name: name,
            phone,
            user_phone: phone,
            contact_number: phone,
            phone_number: phone,
            email: CALLBACK_ALERT_EMAIL,
            to_email: CALLBACK_ALERT_EMAIL,
            user_email: CALLBACK_ALERT_EMAIL,
            reply_to: 'contact@neoskills.co.in',
            course: 'Free Counsellor Callback',
            message: `Candidate requested a free counsellor callback. Phone: ${phone}. Email notification sent to ${CALLBACK_ALERT_EMAIL}.`,
            source: 'counsellor-popup',
            'g-recaptcha-response': effectiveToken,
          },
        }
      )

      setSubmitted(true)

    } catch (err) {
      console.error('Submission error:', err)
      setError('Could not submit your request right now. Please try again.')
      setCaptchaToken('')
      recaptchaRef.current?.reset()
    } finally {
      setSending(false)
    }
  }, [form, captchaToken, captchaError])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/50"
          onClick={handleDismiss}
        >
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden my-auto"
            >
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-10 text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {submitted ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <CheckCircle size={60} className="text-green-500 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-dark mb-1">Thank You!</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Your request has been received. Our expert counsellor will connect with you on{' '}
                    <span className="font-semibold text-gray-900">{form.phone}</span>.
                  </p>

                  <div className="p-4 bg-green-50 rounded-2xl border border-green-200/80 mb-5 text-left">
                    <p className="text-xs text-green-800 font-semibold mb-1 flex items-center gap-1.5">
                      <MessageSquare size={14} className="text-green-600" />
                      Callback alert emailed to our counsellor
                    </p>
                    <p className="text-[11px] text-green-700">
                      Your name and mobile number have been sent to the NeoSkills callback team.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => setShow(false)}
                      className="bg-gray-100 text-gray-700 px-8 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-xs"
                    >
                      Done / Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-primary to-blue-800 p-7 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mb-3">
                      <Headphones size={24} className="text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">Connect with a Counsellor</h3>
                    <p className="text-white/85 text-sm">
                      Free of cost — get expert guidance on the right course for your career.
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
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      required
                      pattern="[0-9+\-\s()]{7,15}"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />

                    <RecaptchaCheckbox
                      ref={recaptchaRef}
                      onChange={setCaptchaToken}
                      onError={() => setCaptchaError(true)}
                    />

                    {error && (
                      <p className="text-red-500 text-xs text-center font-medium bg-red-50 py-2 px-3 rounded-lg border border-red-100">
                        {error}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-md shadow-primary/20"
                    >
                      {sending ? 'Submitting Request...' : (
                        <>
                          Request Free Callback
                          <Send size={16} />
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <ShieldCheck size={12} className="text-green-500" />
                      <span>We respect your privacy. No spam, guaranteed.</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 pt-1">
                      <a
                        href={`tel:+91${COUNSELLOR_PHONE}`}
                        className="flex items-center justify-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                      >
                        <Phone size={12} /> Call: +91 {COUNSELLOR_PHONE}
                      </a>
                      <span className="text-gray-300">•</span>
                      <a
                        href={`https://api.whatsapp.com/send?phone=${COUNSELLOR_WHATSAPP}&text=Hi%20NeoSkills,%20I%20would%20like%20guidance%20on%20courses.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 text-xs text-green-600 font-semibold hover:underline"
                      >
                        <MessageSquare size={12} /> WhatsApp: +91 {COUNSELLOR_PHONE}
                      </a>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
