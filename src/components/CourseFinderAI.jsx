import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEnroll } from '../context/EnrollContext'
import {
  MessageCircle, Send, Bot, User, X, Zap,
  Award, Cloud, Shield, BookOpen, Users, Briefcase,
  ArrowRight, BarChart3, Cpu
} from 'lucide-react'

const allCourses = [
  { keywords: ['pmp', 'project management', 'project manager'], title: 'PMP Certification', color: '#0056D2', icon: 'Award' },
  { keywords: ['capm', 'entry level project'], title: 'CAPM', color: '#0056D2', icon: 'Award' },
  { keywords: ['prince2', 'prince 2'], title: 'PRINCE2 Foundation & Practitioner', color: '#7B61FF', icon: 'BookOpen' },
  { keywords: ['aws', 'amazon web services', 'cloud practitioner'], title: 'AWS Cloud Practitioner', color: '#FF9900', icon: 'Cloud' },
  { keywords: ['azure', 'microsoft azure', 'az-900'], title: 'Microsoft Azure AZ-900', color: '#0078D4', icon: 'Cloud' },
  { keywords: ['scrum', 'scrum master', 'csm', 'psm'], title: 'Certified Scrum Master (CSM)', color: '#10B981', icon: 'Zap' },
  { keywords: ['itil', 'service management', 'it service'], title: 'ITIL v5 Foundation', color: '#7B61FF', icon: 'Users' },
  { keywords: ['security', 'security+', 'comptia'], title: 'CompTIA Security+', color: '#DC2626', icon: 'Shield' },
  { keywords: ['cisa', 'auditor', 'information system audit'], title: 'CISA', color: '#DC2626', icon: 'Shield' },
  { keywords: ['cism', 'security manager'], title: 'CISM', color: '#DC2626', icon: 'Shield' },
  { keywords: ['ceh', 'ethical hacking', 'hacker'], title: 'CEH (Certified Ethical Hacker)', color: '#DC2626', icon: 'Shield' },
  { keywords: ['devops', 'dev ops', 'ci/cd'], title: 'DevOps Tools & Training', color: '#0F172A', icon: 'Zap' },
  { keywords: ['togaf', 'enterprise architecture'], title: 'TOGAF Level 1 & 2', color: '#7B61FF', icon: 'Briefcase' },
  { keywords: ['power bi', 'powerbi', 'data analytics'], title: 'Power BI', color: '#F2C811', icon: 'BarChart3' },
  { keywords: ['cbap', 'business analysis', 'business analyst'], title: 'CBAP', color: '#0056D2', icon: 'Award' },
  { keywords: ['six sigma', 'green belt', 'black belt'], title: 'Six Sigma Green / Black Belt', color: '#059669', icon: 'BarChart3' },
  { keywords: ['servicenow', 'service now'], title: 'ServiceNow', color: '#00A3E0', icon: 'Users' },
  { keywords: ['istqb', 'testing', 'software testing'], title: 'ISTQB Foundation', color: '#059669', icon: 'BookOpen' },
  { keywords: ['ai', 'artificial intelligence', 'machine learning', 'cpmai'], title: 'CPMAI & AI Project Management', color: '#8B5CF6', icon: 'Cpu' },
  { keywords: ['data science', 'data', 'analytics'], title: 'Data Science & BI', color: '#F59E0B', icon: 'Cpu' },
]

const quickReplies = [
  'I want to get into cloud computing',
  'I need project management certification',
  'I am interested in cyber security',
  'I want agile / scrum training',
  'Show me all courses',
]

const greetings = [
  'Hello! I am Neo, your learning assistant.',
  'Tell me what you are looking for, and I will find the right course for you.',
]

const CourseFinderAI = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef(null)
  const { openEnroll } = useEnroll()

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let i = 0
      const timer = setInterval(() => {
        setMessages((prev) => [...prev, { text: greetings[i], sender: 'bot' }])
        i++
        if (i >= greetings.length) {
          clearInterval(timer)
          setShowQuickReplies(true)
        }
      }, 600)
      return () => clearInterval(timer)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const findCourses = (query) => {
    const q = query.toLowerCase()
    const results = allCourses.filter((c) =>
      c.keywords.some((k) => q.includes(k))
    )
    return results
  }

  const handleSend = (text) => {
    const message = text || input
    if (!message.trim()) return
    setMessages((prev) => [...prev, { text: message, sender: 'user' }])
    setInput('')
    setShowQuickReplies(false)

    setTimeout(() => {
      const results = findCourses(message)

      if (results.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            text: `I could not find a match for "${message}". Try describing your role or goal (e.g., "cloud", "project management", "security").`,
            sender: 'bot',
          },
        ])
        setTimeout(() => setShowQuickReplies(true), 500)
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          text: `I found ${results.length} course${results.length > 1 ? 's' : ''} that match your interest:`,
          sender: 'bot',
          courses: results.slice(0, 5),
        },
      ])
    }, 800)
  }

  const handleQuickReply = (text) => {
    handleSend(text)
  }

  const handleEnroll = (title) => {
    try { localStorage.setItem('preferredCourse', title) } catch (e) { /* ignore */ }
    openEnroll({ course: title })
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-blue-800 transition-colors"
        aria-label="Open course finder"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] md:w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-border-gray overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Neo Course Finder</p>
                  <p className="text-xs text-white/80">AI-powered • Instant results</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[420px] overflow-y-auto p-4 bg-gray-50/50 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-1' : ''}`}>
                    <div className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                        msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div>
                        <div className={`rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender === 'user'
                            ? 'bg-primary text-white rounded-tr-md'
                            : 'bg-white text-dark border border-border-gray rounded-tl-md shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                        {msg.courses && (
                          <div className="mt-2 space-y-1.5">
                            {msg.courses.map((c, ci) => (
                              <button
                                key={ci}
                                onClick={() => handleEnroll(c.title)}
                                className="w-full flex items-center gap-2 bg-white border border-border-gray rounded-xl px-3 py-2.5 text-left hover:border-primary transition-colors text-sm"
                              >
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: c.color }}
                                />
                                <span className="font-medium text-dark flex-1">{c.title}</span>
                                <ArrowRight size={14} className="text-primary flex-shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <AnimatePresence>
              {showQuickReplies && messages.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-2 overflow-hidden"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {quickReplies.map((qr, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(qr)}
                        className="text-xs bg-gray-100 hover:bg-primary/10 hover:text-primary text-gray-600 rounded-full px-3 py-1.5 transition-colors font-medium"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-border-gray p-3 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your career interest..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-border-gray rounded-xl text-sm outline-none focus:border-primary transition-colors"
                />
                <motion.button
                  onClick={() => handleSend()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors flex-shrink-0"
                >
                  <Send size={16} />
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
