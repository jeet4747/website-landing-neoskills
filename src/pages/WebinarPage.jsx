import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Users, CheckCircle, ArrowRight, MessageCircle, Zap, ExternalLink } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_GENERAL, EMAILJS_PUBLIC_KEY } from '../config/emailjs'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const WEBINARS_API = BACKEND_URL ? `${BACKEND_URL}/api/webinars` : '/api/webinars'

const DEFAULT_WEBINAR = {
  slug: 'ai-data-science',
  title: 'Beyond Coding',
  fullTitle: 'Beyond Coding: Prompt Engineering & Generative AI in Modern Software Engineering',
  date: 'TBD',
  time: 'TBD',
  platform: 'JSPM Narhe Technical Campus',
  seats: 100,
  description: 'An industry-oriented demonstration session that introduces students to the rapidly evolving world of AI-assisted software engineering and Prompt Engineering. Bridges the gap between academic learning and industry application.',
  whatYouLearn: [
    'Understand modern AI engineering workflows',
    'Explore practical Prompt Engineering',
    'Experience AI-assisted development',
    'Gain exposure to future industry practices',
    'AI-assisted code generation & debugging',
    'Documentation automation with AI',
  ],
  agenda: [
    { time: 'Seg 1', title: 'Future of AI-Assisted Software Engineering', desc: 'Overview of AI transforming coding, debugging, documentation and workflows' },
    { time: 'Seg 2', title: 'Introduction to Prompt Engineering', desc: 'Fundamentals of crafting effective prompts for AI systems' },
    { time: 'Seg 3', title: 'Live AI Demonstrations', desc: 'Real-time demos of AI tools in action' },
    { time: 'Seg 4', title: 'AI-Based Coding & Debugging', desc: 'Using AI to generate, review and debug code' },
    { time: 'Seg 5', title: 'Practical Prompting Frameworks', desc: 'Structured approaches to prompt engineering' },
    { time: 'Seg 6', title: 'Future AI Engineering Careers', desc: 'Career paths in AI-assisted software engineering' },
    { time: 'Seg 7', title: 'Interactive Q&A', desc: 'Open discussion with the industry mentor' },
  ],
  speaker: {
    name: 'Rahul Shah',
    role: 'AI Educator | Industry Mentor | AI Transformation Speaker',
    bio: 'AI Educator and Industry Mentor specializing in AI transformation and Prompt Engineering.',
  },
  tools: ['ChatGPT', 'Claude', 'NotebookLM', 'Gamma AI', 'Cursor AI', 'Canva AI'],
  audience: 'AI & Data Science Students (SE & TE) - JSPM Narhe Technical Campus',
  whatsappLink: 'https://chat.whatsapp.com/GRTh5uIPNllL6vFssZJT3r',
}

export default function WebinarPage() {
  const { slug } = useParams()
  const [webinar, setWebinar] = useState(DEFAULT_WEBINAR)
  const [registered, setRegistered] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '' })

  useEffect(() => {
    fetch(WEBINARS_API)
      .then(r => r.json())
      .then(data => {
        const found = Array.isArray(data) ? data.find(w => w.slug === slug) : null
        if (found) setWebinar({ ...DEFAULT_WEBINAR, ...found })
      })
      .catch(() => {})
  }, [slug])

  useEffect(() => {
    const s = slug || DEFAULT_WEBINAR.slug
    const saved = sessionStorage.getItem(`webinar_${s}`)
    if (saved) setRegistered(true)
  }, [slug])

  const activeWebinar = webinar

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_GENERAL, {
        user_name: form.name,
        user_email: form.email,
        user_phone: form.phone,
        course: `Webinar: ${activeWebinar.title}`,
        message: `Registering for ${activeWebinar.fullTitle} on ${activeWebinar.date} at ${activeWebinar.time}. Experience: ${form.experience || 'Not specified'}`,
      }, EMAILJS_PUBLIC_KEY)

      sessionStorage.setItem(`webinar_${slug || DEFAULT_WEBINAR.slug}`, 'true')
      setRegistered(true)
    } catch {
      setError('Something went wrong. Please try again or email us.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{activeWebinar.fullTitle} | NeoSkills</title>
        <meta name="description" content={activeWebinar.description} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Nav */}
        <div className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-sm text-gray-500 hover:text-primary">← Home</Link>
            <span className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full">Free Webinar</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Content */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  <Zap size={14} />
                  Live Workshop • Sat, 30 May 2026
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {activeWebinar.fullTitle}
                </h1>
                <p className="text-gray-600 mt-3 text-lg">{activeWebinar.description}</p>
                {activeWebinar.audience && (
                  <p className="text-sm text-primary font-medium mt-2 flex items-center gap-1.5">
                    <Users size={14} /> {activeWebinar.audience}
                  </p>
                )}
              </motion.div>

              {/* Info bar */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: Calendar, label: activeWebinar.date },
                    { icon: Clock, label: activeWebinar.time },
                    { icon: Users, label: `${activeWebinar.seats} live spots` },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600">
                      <item.icon size={16} className="text-primary" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What you'll learn */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeWebinar.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {activeWebinar.tools && activeWebinar.tools.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Tools & Platforms</h2>
                  <div className="flex flex-wrap gap-2">
                    {activeWebinar.tools.map((tool, i) => (
                      <span key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700">{tool}</span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Agenda */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Agenda</h2>
                <div className="space-y-3">
                  {activeWebinar.agenda.map((item, i) => (
                    <div key={i} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4">
                      <div className="w-16 text-sm font-bold text-primary flex-shrink-0">{item.time}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Speaker */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Meet Your Instructor</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {activeWebinar.speaker.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{activeWebinar.speaker.name}</h4>
                    <p className="text-sm text-primary font-medium">{activeWebinar.speaker.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{activeWebinar.speaker.bio}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Registration */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:sticky lg:top-24"
              >
                {registered ? (
                  <div className="bg-white border border-green-200 rounded-3xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
                      <CheckCircle size={48} className="mx-auto mb-3" />
                      <h3 className="text-xl font-bold">You're Registered! 🎉</h3>
                      <p className="text-white/80 text-sm mt-1">Check your email for the join link</p>
                    </div>
                    <div className="p-6 text-center space-y-4">
                      <p className="text-gray-600 text-sm">Join our WhatsApp group for updates, reminders, and community discussions:</p>
                      <a
                        href={activeWebinar.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-all"
                      >
                        <MessageCircle size={20} />
                        Join WhatsApp Group
                      </a>
                      <p className="text-xs text-gray-400">Stay updated on webinar reminders, resources & upcoming sessions</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-8 text-white">
                      <h3 className="text-xl font-bold">Reserve Your Spot</h3>
                      <p className="text-white/80 text-sm mt-1">Limited to {activeWebinar.seats} live attendees</p>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name *"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                      />
                      <select
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-white"
                      >
                        <option value="">Experience Level</option>
                        <option value="student">Student / Fresher</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>

                      {error && <p className="text-red-500 text-xs">{error}</p>}

                      <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                        <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                        <span>I Authorize NEOSKILLS to send Notification via SMS/RCS/CALL/Email/Whatsapp.</span>
                      </label>

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-gradient-to-r from-purple-700 to-blue-700 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {sending ? 'Registering...' : (
                          <>
                            Register Free
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-400 text-center">Free • 90 mins • Live & Interactive</p>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
