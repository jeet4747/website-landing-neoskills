import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEnroll } from '../context/EnrollContext'
import {
  MessageCircle, Send, Bot, User, X,
  Award, Cloud, Shield, BookOpen, Users, Briefcase,
  ArrowRight, BarChart3, Cpu, CheckCircle, Loader2
} from 'lucide-react'
import emailjs from '@emailjs/browser'

const allCourses = [
  { keywords: ['pmp', 'project management', 'project manager'], title: 'PMP Certification', cat: 'Project Management' },
  { keywords: ['capm', 'entry level project'], title: 'CAPM', cat: 'Project Management' },
  { keywords: ['prince2', 'prince 2'], title: 'PRINCE2 Foundation & Practitioner', cat: 'Project Management' },
  { keywords: ['aws', 'amazon web services', 'cloud practitioner'], title: 'AWS Cloud Practitioner', cat: 'Cloud' },
  { keywords: ['azure', 'microsoft azure', 'az-900'], title: 'Microsoft Azure AZ-900', cat: 'Cloud' },
  { keywords: ['scrum', 'scrum master', 'csm', 'psm'], title: 'Certified Scrum Master (CSM)', cat: 'Agile' },
  { keywords: ['pspo', 'product owner'], title: 'Professional Scrum Product Owner (PSPO)', cat: 'Agile' },
  { keywords: ['itil', 'service management', 'it service'], title: 'ITIL 4 Foundation', cat: 'IT Service' },
  { keywords: ['security', 'security+', 'comptia'], title: 'CompTIA Security+', cat: 'Cybersecurity' },
  { keywords: ['cisa', 'auditor', 'information system audit'], title: 'CISA', cat: 'Cybersecurity' },
  { keywords: ['cism', 'security manager'], title: 'CISM', cat: 'Cybersecurity' },
  { keywords: ['ceh', 'ethical hacking', 'hacker'], title: 'CEH (Certified Ethical Hacker)', cat: 'Cybersecurity' },
  { keywords: ['devops', 'dev ops', 'ci/cd'], title: 'DevOps Tools & Training', cat: 'DevOps' },
  { keywords: ['togaf', 'enterprise architecture'], title: 'TOGAF Level 1 & 2', cat: 'Architecture' },
  { keywords: ['power bi', 'powerbi', 'data analytics'], title: 'Power BI', cat: 'Data & Analytics' },
  { keywords: ['cbap', 'business analysis', 'business analyst'], title: 'CBAP', cat: 'Business Analysis' },
  { keywords: ['six sigma', 'green belt', 'black belt'], title: 'Six Sigma Green / Black Belt', cat: 'Quality' },
  { keywords: ['servicenow', 'service now'], title: 'ServiceNow', cat: 'IT Service' },
  { keywords: ['istqb', 'testing', 'software testing'], title: 'ISTQB Foundation', cat: 'Quality' },
  { keywords: ['ai', 'artificial intelligence', 'machine learning', 'cpmai'], title: 'CPMAI & AI Project Management', cat: 'AI' },
  { keywords: ['data science', 'data', 'analytics', 'big data'], title: 'Data Science & Big Data', cat: 'Data & Analytics' },
]

const quickReplies = [
  'I want to get into cloud computing',
  'I need project management certification',
  'I am interested in cyber security',
  'I want agile / scrum training',
  'Show me all courses',
]

const EMAILJS_SERVICE = 'service_62ub16q'
const EMAILJS_TEMPLATE = 'template_l3twvqg'
const EMAILJS_KEY = 'S3TiyuUzfI2FRb5RG'

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

const CourseFinderAI = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [lead, setLead] = useState({ name: '', email: '', phone: '', course: '' })
  const [collecting, setCollecting] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { openEnroll } = useEnroll()

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let i = 0
      const timer = setInterval(() => {
        setMessages((prev) => [...prev, { text: ['Hi! I am Neo, your learning assistant.', 'Tell me what you are looking for, and I will match you with the right course.'][i], sender: 'bot' }])
        i++
        if (i >= 2) {
          clearInterval(timer)
          setShowQuickReplies(true)
        }
      }, 500)
      return () => clearInterval(timer)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen, collecting])

  const findCourses = (query) => {
    const q = query.toLowerCase().trim()
    if (q === 'show me all courses' || q === 'all courses') return allCourses
    return allCourses.filter((c) => c.keywords.some((k) => q.includes(k)))
  }

  const addBotMessage = useCallback((text) => {
    setMessages((prev) => [...prev, { text, sender: 'bot' }])
  }, [])

  const sendLeadEmail = useCallback(async () => {
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        name: lead.name,
        email: lead.email,
        phone: lead.phone || 'N/A',
        course: lead.course || 'Chatbot inquiry',
        message: `[Source: Course Finder Chatbot]\n\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}\nCourse interested: ${lead.course || 'Not specified'}`,
        domain: window.location.origin,
        source: 'NeoSkills Course Finder Chatbot',
      }, EMAILJS_KEY)
    } catch (err) {
      console.error('EmailJS chatbot error:', err)
    }
  }, [lead])

  const startLeadCollection = useCallback((courseTitle) => {
    setSelectedCourse(courseTitle)
    setCollecting('name')
    setShowQuickReplies(false)
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      addBotMessage(`Great choice! To get started with **${courseTitle}**, I just need a few quick details.`)
      setTimeout(() => {
        addBotMessage('What is your full name?')
        setCollecting('name')
      }, 600)
    }, 800)
  }, [addBotMessage])

  const handleLeadInput = useCallback((value) => {
    if (collecting === 'name') {
      setLead((prev) => ({ ...prev, name: value, course: selectedCourse }))
      setThinking(true)
      setTimeout(() => {
        setThinking(false)
        addBotMessage(`Nice to meet you, ${value}! What is your email address?`)
        setCollecting('email')
      }, 500)
    } else if (collecting === 'email') {
      if (!value.includes('@') || !value.includes('.')) {
        addBotMessage('That does not look like a valid email. Please enter a correct email address (e.g. name@example.com).')
        return
      }
      setLead((prev) => ({ ...prev, email: value }))
      setThinking(true)
      setTimeout(() => {
        setThinking(false)
        addBotMessage('Thanks! And your phone number with country code (e.g. +91 9876543210)?')
        setCollecting('phone')
      }, 500)
    } else if (collecting === 'phone') {
      setLead((prev) => ({ ...prev, phone: value }))
      setCollecting(null)
      setThinking(true)
    }
  }, [collecting, selectedCourse, addBotMessage])

  useEffect(() => {
    if (collecting === null && lead.name && lead.email) {
      sendLeadEmail()
      setTimeout(() => {
        setThinking(false)
        addBotMessage('Thank you! Your details are confirmed. Our team will reach out within 24 hours with batch details and next steps.')
        setTimeout(() => {
          addBotMessage('Is there anything else I can help you with? 🙂')
          setShowQuickReplies(true)
          setLead({ name: '', email: '', phone: '', course: '' })
        }, 1200)
      }, 800)
    }
  }, [collecting, lead, addBotMessage, sendLeadEmail])

  const handleSend = (text) => {
    const message = (text || input).trim()
    if (!message || thinking) return

    if (collecting) {
      setMessages((prev) => [...prev, { text: message, sender: 'user' }])
      setInput('')
      handleLeadInput(message)
      return
    }

    setMessages((prev) => [...prev, { text: message, sender: 'user' }])
    setInput('')
    setShowQuickReplies(false)
    setThinking(true)

    setTimeout(() => {
      const results = findCourses(message)

      if (results.length === 0) {
        setThinking(false)
        setMessages((prev) => [
          ...prev,
          { text: `I could not find a match for "${message}". Try describing your role or goal (e.g. "cloud", "project management", "security").`, sender: 'bot' },
        ])
        setTimeout(() => setShowQuickReplies(true), 500)
        return
      }

      setThinking(false)
      setMessages((prev) => [
        ...prev,
        { text: `I found ${results.length} course${results.length > 1 ? 's' : ''} that match your interest:`, sender: 'bot', courses: results.slice(0, 5) },
      ])
    }, 1000)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-primary to-blue-700 text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:shadow-primary/40 transition-shadow"
        aria-label="Open course finder"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.93 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] md:w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary to-blue-800 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Bot size={22} />
                </div>
                <div>
                  <p className="font-bold text-sm">Neo Course Finder</p>
                  <p className="text-[11px] text-white/70">Online • Typically replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="h-[440px] overflow-y-auto p-4 bg-[#f5f6f8] space-y-3" style={{ background: '#f5f6f8' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[88%]`}>
                    <div className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-xs ${
                        msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-200'
                      }`}>
                        {msg.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
                      </div>
                      <div>
                        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-primary text-white rounded-br-sm'
                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                        }`}>
                          {msg.text}
                        </div>
                        {msg.courses && (
                          <div className="mt-2 space-y-1.5">
                            {msg.courses.map((c, ci) => (
                              <motion.button
                                key={ci}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: ci * 0.08 }}
                                onClick={() => startLeadCollection(c.title)}
                                className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3.5 py-3 text-left hover:border-primary hover:shadow-sm transition-all"
                              >
                                <span className="w-2 h-2 rounded-full flex-shrink-0 bg-primary" />
                                <div className="flex-1 min-w-0">
                                  <span className="font-semibold text-gray-800 text-sm block truncate">{c.title}</span>
                                  <span className="text-[11px] text-gray-400">{c.cat}</span>
                                </div>
                                <ArrowRight size={15} className="text-primary flex-shrink-0" />
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {thinking && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Bot size={13} className="text-gray-500" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                      <ThinkingDots />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 pb-3 bg-[#f5f6f8]">
              <AnimatePresence>
                {showQuickReplies && messages.length > 0 && !collecting && !thinking && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-2"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {quickReplies.map((qr, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(qr)}
                          className="text-xs bg-white hover:bg-primary/10 hover:text-primary text-gray-600 rounded-full px-3.5 py-2 transition-colors font-medium border border-gray-200 shadow-sm"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1.5 shadow-sm">
                <input
                  ref={inputRef}
                  type={collecting === 'email' ? 'email' : collecting === 'phone' ? 'tel' : 'text'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={collecting === 'name' ? 'Enter your full name...' : collecting === 'email' ? 'Enter your email...' : collecting === 'phone' ? 'Enter your phone...' : 'Type your career interest...'}
                  disabled={thinking}
                  className="flex-1 px-3 py-2 text-sm outline-none bg-transparent placeholder:text-gray-400 disabled:opacity-50"
                />
                <motion.button
                  onClick={() => handleSend()}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors flex-shrink-0 disabled:opacity-50"
                  disabled={thinking || !input.trim()}
                >
                  <Send size={15} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CourseFinderAI
