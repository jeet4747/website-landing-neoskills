import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, Cpu, Lightbulb, Bot, Sparkles, Send, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'

const aiCourses = [
  { title: 'CPMAI & AI Project Management', slug: 'cpmai-and-ai-project-management', icon: Brain, desc: 'AI project management concepts with practical business relevance.', badge: 'AI & ML' },
  { title: 'Professional Scrum Master™ - AI Essentials', slug: 'professional-scrum-master-ai-essentials-certification', icon: Bot, desc: 'AI-focused Scrum implementation and certification readiness.', badge: 'Agile & AI' },
  { title: 'AI in Testing', slug: 'ai-in-testing', icon: Cpu, desc: 'AI-assisted workflows and smart testing techniques.', badge: 'AI & QA' },
  { title: 'Advanced Analytics & ML', slug: 'advanced-analytics-and-ml', icon: Lightbulb, desc: 'Applied analytics and machine learning for decision-making.', badge: 'Data & AI' },
  { title: 'Big Data AI Integration', slug: 'big-data-ai-integration', icon: Sparkles, desc: 'Integrate AI use cases into large-scale data systems.', badge: 'Data & AI' },
]

export default function AICoursesPopup() {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [step, setStep] = useState('list')
  const navigate = useNavigate()
  const shownRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!shownRef.current) {
        shownRef.current = true
        setShow(true)
      }
    }, 180000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = useCallback(() => {
    setShow(false)
  }, [])

  const handleCourseClick = (course) => {
    setSelectedCourse(course.title)
    setStep('form')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.send('service_62ub16q', 'template_l3twvqg', {
        user_name: form.name,
        user_email: form.email,
        user_phone: form.phone,
        course: selectedCourse || 'AI Course Inquiry',
        message: `[Source: AI Courses Popup]\n\nInterested in: ${selectedCourse}`,
        domain: window.location.origin,
      }, 'S3TiyuUzfI2FRb5RG')
      setSubmitted(true)
    } catch {
      /* ignore */
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            onClick={e => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <button onClick={handleDismiss} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full z-10">
              <X size={18} />
            </button>

            <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-8 text-white">
              <div className="flex items-center gap-2 text-purple-200 font-semibold text-sm mb-2">
                <Brain size={16} />
                AI Training Programs
              </div>
              <h3 className="text-2xl font-bold">Master Artificial Intelligence</h3>
              <p className="text-white/80 text-sm mt-1">Hands-on AI training with certification</p>
            </div>

            {submitted ? (
              <div className="p-10 text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-dark mb-2">Thank You!</h3>
                <p className="text-gray-500 mb-4">Our team will reach out with AI course details.</p>
                <button onClick={() => { handleDismiss(); setSubmitted(false); setStep('list') }} className="bg-primary text-white px-8 py-3 rounded-xl font-semibold">Got it</button>
              </div>
            ) : step === 'list' ? (
              <div className="p-6 space-y-3">
                <p className="text-sm text-gray-500 mb-4">Choose an AI program to learn more:</p>
                {aiCourses.map((course, i) => {
                  const Icon = course.icon
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => handleCourseClick(course)}
                      className="w-full flex items-center gap-4 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-2xl p-4 text-left transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors flex-shrink-0">
                        <Icon size={24} className="text-purple-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm">{course.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{course.desc}</p>
                      </div>
                      <span className="text-[10px] font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full flex-shrink-0">{course.badge}</span>
                    </motion.button>
                  )
                })}
                <p className="text-xs text-gray-400 text-center pt-2">Click any course to get details and free counselling</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <p className="text-sm text-gray-600 mb-2">Interested in <strong>{selectedCourse}</strong>? Enter your details:</p>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" required className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                  <span>I Authorize NEOSKILLS to send Notification via SMS/RCS/CALL/Email/Whatsapp.</span>
                </label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep('list')} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Back</button>
                  <button type="submit" disabled={sending} className="flex-1 bg-purple-700 text-white font-bold py-3 rounded-xl hover:bg-purple-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                    {sending ? 'Sending...' : <><Send size={16} /> Submit</>}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
