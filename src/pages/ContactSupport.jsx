import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function ContactSupport() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    emailjs.send('service_62ub16q', 'template_l3twvqg', {
      name: form.name,
      email: form.email,
      phone: form.phone || 'N/A',
      course: form.subject || 'General inquiry',
      message: `[Contact Support page]\n\n${form.message}`,
      domain: window.location.origin,
      source: 'NeoSkills Contact Support Page',
    }, 'S3TiyuUzfI2FRb5RG')
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
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="+91" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="e.g. Enrollment help" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
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
                    <div><p className="font-medium text-gray-800">+91 8087020031</p><p className="text-sm text-gray-500">+91 9975214585</p><p className="text-xs text-gray-400 mt-1">Mon–Fri, 9am–7pm IST</p></div></div>
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
        </div>
      </div>
    </>
  )
}
