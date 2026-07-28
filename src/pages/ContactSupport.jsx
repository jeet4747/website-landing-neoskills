import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, Clock, Globe, ExternalLink } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_GENERAL, EMAILJS_PUBLIC_KEY } from '../config/emailjs'

export default function ContactSupport() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_GENERAL, {
      user_name: form.name,
      user_email: form.email,
      user_phone: form.phone || 'N/A',
      course: form.subject || 'General inquiry',
      message: form.message,
    }, EMAILJS_PUBLIC_KEY)
      .then(() => { setSent(true); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) })
      .catch(() => setError('Could not send message. Please email contact@neoskills.co.in directly.'))
  }

  return (
    <>
      <Helmet>
        <title>Contact Support | NeoSkills Learning Solutions</title>
        <meta name="description" content="Contact NeoSkills Learning Solutions support team. Get help with courses, enrollment, payments, and more." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <Link to="/" className="text-primary hover:underline text-sm">&larr; Home</Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl"><MessageSquare className="text-primary" size={28} /></div>
            <div><h1 className="text-3xl font-bold text-gray-900">Contact Support</h1><p className="text-gray-500">We are here to help. Reach out anytime.</p></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Message sent!</h3>
                    <p className="text-gray-500">We will reply within 1 business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">{error}</div>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="+91" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Enrollment help" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
                    <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                      <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                      <span>I Authorize NEOSKILLS to send Notification via SMS/RCS/CALL/Email/Whatsapp.</span>
                    </label>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary flex items-center gap-2 py-3 px-6">
                      <Send size={18} /> Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="font-bold text-gray-900 mb-5">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex gap-3"><Phone className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <div><p className="font-medium text-gray-800">+91 89569 63953</p><p className="text-sm text-gray-500">+91 9975214585</p><p className="text-xs text-gray-400 mt-1">Mon–Fri, 9am–7pm IST</p></div></div>
                  <div className="flex gap-3"><Mail className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <div><a href="mailto:contact@neoskills.co.in" className="font-medium text-primary hover:underline">contact@neoskills.co.in</a><p className="text-xs text-gray-400">We reply within 24 hours</p></div></div>
                  <div className="flex gap-3"><MapPin className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <div><p className="font-medium text-gray-800">Baner, Pune</p><p className="text-sm text-gray-500">Maharashtra, India</p></div></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Quick links</h3>
                <div className="space-y-2 text-sm">
                  <Link to="/faq" className="block text-white/90 hover:text-white">FAQ</Link>
                  <Link to="/enrollment-guide" className="block text-white/90 hover:text-white">Enrollment Guide</Link>
                  <Link to="/#courses" className="block text-white/90 hover:text-white">Browse Courses</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps & Office */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              <div className="aspect-[16/9] bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.579662675937!2d73.779747!3d18.558339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf3f5c5f5c5f%3A0x5c5f5c5f5c5f5c5f!2sBaner%2C+Pune%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NeoSkills Office Location"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl shadow-sm border p-6"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                Our office
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">NeoSkills Learning Solutions</p>
                    <p className="text-gray-500">Office No. 301, Third Floor,<br />Business Square, Baner,<br />Pune — 411045, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">Business hours</p>
                    <p className="text-gray-500">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                    <p className="text-gray-400 text-xs mt-0.5">Sunday: Closed</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Globe size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">Connect with us</p>
                    <div className="flex gap-3 mt-1.5">
                      <a href="https://www.linkedin.com/company/neoskills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1">
                        LinkedIn <ExternalLink size={12} />
                      </a>
                      <a href="https://www.youtube.com/@neoskills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1">
                        YouTube <ExternalLink size={12} />
                      </a>
                      <a href="https://www.instagram.com/neoskills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1">
                        Instagram <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
