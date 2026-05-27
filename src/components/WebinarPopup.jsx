import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, Users, Send, CheckCircle, MessageCircle, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const WEBINARS_API = BACKEND_URL ? `${BACKEND_URL}/api/webinars` : '/api/webinars'

export default function WebinarPopup() {
  const [show, setShow] = useState(false)
  const [webinar, setWebinar] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const dismissedRef = useRef(false)

  useEffect(() => {
    fetch(WEBINARS_API)
      .then(r => r.json())
      .then(data => {
        const active = Array.isArray(data) ? data.find(w => w.active !== false) : null
        if (active) {
          setWebinar(active)
          const timer = setTimeout(() => {
            if (!dismissedRef.current) setShow(true)
          }, 60000)
          const interval = setInterval(() => {
            if (!dismissedRef.current) setShow(true)
          }, 300000)
          return () => { clearTimeout(timer); clearInterval(interval) }
        }
      })
      .catch(() => {})
  }, [])

  const handleDismiss = useCallback(() => {
    dismissedRef.current = true
    setShow(false)
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.send('service_62ub16q', 'template_l3twvqg', {
        user_name: form.name,
        user_email: form.email,
        user_phone: form.phone,
        course: `Webinar: ${webinar?.title || 'Free Webinar'}`,
        message: `[Source: Homepage Webinar Popup]\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nWebinar: ${webinar?.fullTitle || webinar?.title}`,
        domain: window.location.origin,
      }, 'S3TiyuUzfI2FRb5RG')
      setSubmitted(true)
    } catch {
      /* */
    } finally {
      setSending(false)
    }
  }

  if (!webinar) return null

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
            onClick={e => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <button onClick={handleDismiss} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-10 text-white"><X size={18} /></button>

            {submitted ? (
              <div className="p-10 text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-dark mb-2">You're Registered! 🎉</h3>
                <p className="text-gray-500 mb-2">Join the WhatsApp group for reminders & updates:</p>
                {webinar.whatsappLink && (
                  <a href={webinar.whatsappLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all mt-2"
                  >
                    <MessageCircle size={20} />
                    Join WhatsApp Group
                  </a>
                )}
                <p className="text-xs text-gray-400 mt-4">
                  <Link to={`/webinar/${webinar.slug}`} className="text-primary hover:underline" onClick={handleDismiss}>View webinar details →</Link>
                </p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-8 text-white">
                  <div className="flex items-center gap-2 text-purple-200 font-semibold text-sm mb-2">
                    <Calendar size={14} />
                    {webinar.date} {webinar.time ? `• ${webinar.time}` : ''}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Free Webinar</h3>
                  <p className="text-white/90 text-lg font-semibold">{webinar.fullTitle || webinar.title}</p>
                  <p className="text-white/70 text-sm mt-2">{webinar.description}</p>
                  <div className="flex gap-4 mt-4 text-xs text-white/70">
                    {webinar.audience && <span className="flex items-center gap-1"><Users size={12} /> {webinar.audience}</span>}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 font-medium">Reserve your free spot:</p>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />

                  <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-700 to-blue-700 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? 'Registering...' : <><Send size={16} /> Register Free</>}
                  </motion.button>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Free • Live & Interactive</span>
                    <Link to={`/webinar/${webinar.slug}`} className="text-primary hover:underline flex items-center gap-1" onClick={handleDismiss}>
                      Details <ExternalLink size={10} />
                    </Link>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
