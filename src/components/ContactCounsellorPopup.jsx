import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, Headphones, ShieldCheck, Phone } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, EMAILJS_PUBLIC_KEY } from '../config/emailjs'

const SHOW_DELAY = 3000
const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcOXOgtAAAAAA1mmytZfKNzY_JnAer5NjaP1Ri8'

let recaptchaScriptPromise = null
function loadRecaptchaScript() {
  if (window.grecaptcha && window.grecaptcha.render) return Promise.resolve()
  if (recaptchaScriptPromise) return recaptchaScriptPromise
  recaptchaScriptPromise = new Promise((resolve, reject) => {
    let settled = false
    const poll = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.render) {
        settled = true
        clearInterval(poll)
        clearTimeout(timeout)
        resolve()
      }
    }, 100)
    const timeout = setTimeout(() => {
      if (!settled) {
        clearInterval(poll)
        recaptchaScriptPromise = null
        reject(new Error('reCAPTCHA failed to load in time'))
      }
    }, 15000)
    if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onerror = () => { clearInterval(poll); clearTimeout(timeout); recaptchaScriptPromise = null; reject(new Error('reCAPTCHA script failed to load')) }
      document.head.appendChild(script)
    }
  })
  return recaptchaScriptPromise
}

export default function ContactCounsellorPopup() {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaError, setCaptchaError] = useState(false)

  const recaptchaRef = useRef(null)
  const widgetIdRef = useRef(null)
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

  useEffect(() => {
    if (!show) return
    let active = true
    setCaptchaError(false)
    setCaptchaToken('')
    loadRecaptchaScript()
      .then(() => {
        if (!active || !recaptchaRef.current || !window.grecaptcha || !window.grecaptcha.render) return
        recaptchaRef.current.innerHTML = ''
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: 'light',
          callback: (token) => { if (active) setCaptchaToken(token) },
          'expired-callback': () => { if (active) setCaptchaToken('') },
          'error-callback': () => { if (active) setCaptchaError(true) },
        })
      })
      .catch(() => { if (active) setCaptchaError(true) })
    return () => { active = false }
  }, [show])

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
    if (!captchaToken) {
      setError('Please complete the reCAPTCHA to continue.')
      return
    }
    setSending(true)
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, {
        name: form.name,
        phone: form.phone,
        email: 'not-provided@counsellor-popup',
        course: 'Free Counsellor Callback',
        message: 'Wants a free callback from a counsellor.',
        'g-recaptcha-response': captchaToken,
      }, EMAILJS_PUBLIC_KEY)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
      setCaptchaToken('')
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current)
      }
    } finally {
      setSending(false)
    }
  }, [form, captchaToken])

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
                <div className="p-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-dark mb-2">Thank You!</h3>
                  <p className="text-gray-500 mb-6">Our counsellor will call you shortly.</p>
                  <button
                    onClick={() => setShow(false)}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Got it
                  </button>
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

                    <div className="flex justify-center min-h-[78px]">
                      <div ref={recaptchaRef} />
                    </div>
                    {captchaError && (
                      <p className="text-amber-600 text-xs text-center -mt-2">
                        Couldn't load reCAPTCHA. Please refresh the page or call us directly.
                      </p>
                    )}

                    {error && (
                      <p className="text-red-500 text-xs text-center">{error}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {sending ? 'Sending...' : (
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

                    <a href="tel:+919975214585" className="flex items-center justify-center gap-1.5 text-xs text-primary font-semibold hover:underline">
                      <Phone size={12} /> Or call us now: 9975214585
                    </a>
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