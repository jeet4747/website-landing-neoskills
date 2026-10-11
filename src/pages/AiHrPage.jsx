import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Calendar, Clock, Users2, CheckCircle, ArrowRight, Phone,
  Sparkles, Zap, TrendingUp, Lightbulb,
  Workflow, MessageSquare, Send, MonitorPlay, IndianRupee, ClipboardList,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, EMAILJS_PUBLIC_KEY } from '../config/emailjs'
import RecaptchaCheckbox from '../components/RecaptchaCheckbox'
import { useEnroll } from '../context/EnrollContext'

const HR_COURSE = 'AI-Powered HR Professional Workshop'
const HR_FEE = 3000
const HR_ORIGINAL_FEE = 5000

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

const modules = [
  {
    icon: ClipboardList,
    module: 'Module 1',
    title: 'Recruitment AI Workflows',
    scenario: '20 CVs + 1 Job Description — extract, compare, identify gaps and prepare interview questions instead of manually reading every profile.',
    demo: ['Extracting structured candidate data from unstructured CVs', 'Comparing multiple candidates against the job description at once', 'Identifying skill gaps and areas needing clarification', 'Auto-generating tailored, role-specific interview questions'],
    handsOn: 'Work in pairs with a sample CV set and job description to shortlist candidates and draft interview questions.',
    value: 'Faster first-level analysis and better interview preparation.',
  },
  {
    icon: MessageSquare,
    module: 'Module 2',
    title: 'HR Communication AI Workflows',
    scenario: 'One HR situation → multiple communications — employee email, manager talking points, FAQ and short announcement from a single requirement.',
    demo: ['Turning one requirement into multiple, audience-specific communications', 'Maintaining consistent tone and messaging across formats', 'Adapting the same core message for employees, managers and announcements'],
    handsOn: 'Take a real HR communication scenario and generate the same four communication formats.',
    value: 'Less repetitive drafting and rewriting.',
  },
  {
    icon: Lightbulb,
    module: 'Module 3',
    title: 'Learning & Development AI Workflows',
    scenario: '"Our managers need better people-management skills" — transform a business requirement into a full training design.',
    demo: ['Breaking a vague requirement into concrete capability areas', 'Drafting measurable learning objectives', 'Structuring a training programme with activities and assessments'],
    handsOn: 'Take an L&D requirement from your own organisation and produce a first-draft training design.',
    value: 'Faster L&D design and more time for stakeholder engagement and programme quality.',
  },
  {
    icon: Workflow,
    module: 'Module 4',
    title: 'HR Information & Documents AI Workflows',
    scenario: 'A lengthy policy / SOP / HR document → summary, key points, employee FAQ, manager checklist and quick reference.',
    demo: ['Converting a long policy document into a concise summary', 'Extracting key points and generating an employee-facing FAQ', 'Producing a manager checklist and quick-reference version'],
    handsOn: 'Bring a real HR policy/SOP and produce the five output formats using the demonstrated workflow.',
    value: 'Less time spent searching, summarising and restructuring information.',
  },
]

const laterSessions = [
  { title: 'Session 7 — From AI Tool to AI-Enabled Workflow', time: '30 min', desc: 'See the practical difference between using an individual AI tool and designing an AI-enabled workflow — moving from AI Tool → AI Productivity → AI Workflow → AI Application.' },
  { title: 'Session 8 — HR AI Opportunity Mapping Workshop', time: '45 min', desc: 'Identify AI opportunities in your own HR function by mapping the repetitive tasks from Session 1 against the day\u2019s workflows — what would AI assist with, what still needs human judgement.' },
  { title: 'Session 9 — Responsible AI: Judgement, Confidentiality & Governance', time: '20 min', desc: 'Where human judgement stays central, confidentiality with HR data, recognising bias risk in AI-assisted recruitment, and building organisational guardrails.' },
  { title: 'Session 10 — What Next: From AI Awareness to AI Adoption', time: '20 min', desc: 'A simple roadmap — Identify → Assess → Design → Implement → Measure — to take back to your team.' },
]

const takeaways = [
  'Recognise repetitive activities where AI can potentially save time',
  'Understand practical AI applications across key HR functions',
  'See how one input can be transformed into multiple HR outputs',
  'Understand the difference between using an AI tool and designing an AI workflow',
  'Identify potential AI opportunities within your own HR function',
  'Understand where human judgement, confidentiality and responsible AI remain essential',
]

const shift = [
  { from: 'Repetitive Work', to: 'AI-Assisted Work' },
  { from: 'Manual Information Processing', to: 'Intelligent Workflows' },
  { from: 'AI Curiosity', to: 'AI Opportunities' },
]

const schedule = [
  { time: '09:00 – 09:30', name: 'Session 1 · Welcome & The HR Productivity Challenge' },
  { time: '09:30 – 10:15', name: 'Session 2 · AI for HR — Foundations' },
  { time: '10:15 – 11:15', name: 'Module 1 · Recruitment AI Workflows (Live + Hands-On)' },
  { time: '11:15 – 11:30', name: 'Break' },
  { time: '11:30 – 12:30', name: 'Module 2 · HR Communication AI Workflows (Live + Hands-On)' },
  { time: '12:30 – 13:15', name: 'Lunch' },
  { time: '13:15 – 14:15', name: 'Module 3 · Learning & Development AI Workflows (Live + Hands-On)' },
  { time: '14:15 – 15:15', name: 'Module 4 · HR Information & Documents AI Workflows (Live + Hands-On)' },
  { time: '15:15 – 15:30', name: 'Break' },
  { time: '15:30 – 16:00', name: 'Session 7 · From AI Tool to AI-Enabled Workflow' },
  { time: '16:00 – 16:45', name: 'Session 8 · HR AI Opportunity Mapping Workshop' },
  { time: '16:45 – 17:05', name: 'Session 9 · Responsible AI — Judgement, Confidentiality & Governance' },
  { time: '17:05 – 17:30', name: 'Session 10 · What Next — From AI Awareness to AI Adoption' },
]

const audit = ['Corporate HR Professionals', 'HR Business Partners', 'Talent Acquisition', 'L&D', 'HR Operations teams']

export default function AiHrPage() {
  const { openPayment } = useEnroll()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [registered, setRegistered] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleReserve = async (e) => {
    e.preventDefault()
    setError('')
    setCaptchaError('')
    if (!captchaToken) {
      setCaptchaError('Please complete the reCAPTCHA to continue.')
      return
    }
    setSending(true)
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: HR_COURSE,
        message: 'Reserve my seat for the 1-Day AI-Powered HR Professional online course.',
        'g-recaptcha-response': captchaToken,
      }, EMAILJS_PUBLIC_KEY)
      setRegistered(true)
      openPayment({
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: HR_COURSE,
        amount: HR_FEE,
        source: 'ai-hr-workshop',
      })
    } catch {
      setError('Something went wrong. Please try again or call us at +91 9975214585.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>1-Day AI-Powered HR Professional Online Course | NeoSkills</title>
        <meta name="description" content="1-Day Live Online AI course for Corporate HR Professionals. From repetitive work to intelligent work — Live Demos + Hands-On Practice across Recruitment, HR Communication, L&D and HR Documents. Festive offer ₹3,000." />
        <meta property="og:title" content="1-Day AI-Powered HR Professional Online Course | NeoSkills" />
        <meta property="og:description" content="Give back hours of repetitive work to AI and use that time for people, decisions and strategy. Live online, hands-on. Festive special ₹3,000." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Nav */}
        <div className="bg-primary border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-sm text-white/80 hover:text-white">← Home</Link>
            <span className="text-xs font-semibold text-accent bg-white/10 px-3 py-1 rounded-full">1-Day Live Online Course</span>
          </div>
        </div>

        {/* Hero */}
        <header className="bg-gradient-to-br from-primary via-primary to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #FFC300 0, transparent 40%), radial-gradient(circle at 80% 70%, #4facfe 0, transparent 40%)' }} />
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-accent mb-4 uppercase">
                1-Day Online Course · Live Instructor-Led
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                AI-Powered <span className="text-accent">HR Professional</span>
              </h1>
              <p className="text-xl md:text-2xl font-semibold mb-3">From Repetitive Work to Intelligent Work</p>
              <p className="text-white/80 max-w-2xl text-sm md:text-base leading-relaxed">
                A 1-Day, live online AI course for <strong className="text-white">Corporate HR Professionals</strong> —
                with live demonstrations and hands-on practice across Recruitment, HR Communication, L&D and
                HR Documents.
              </p>

              <div className="flex flex-wrap gap-4 items-center mt-6 text-sm md:text-base">
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> Live Demos</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> Hands-On Practice</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> Opportunity Mapping Workshop</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> No AI Experience Required</span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a href="#reserve" className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-black/20">
                  Reserve Your Seat <ArrowRight size={18} />
                </a>
                <div className="text-sm text-white/90">
                  <span className="line-through text-white/50 mr-2">₹5,000</span>
                  <span className="text-accent font-extrabold text-lg">₹3,000</span>{' '}
                  <span className="text-white/80">Festive Offer</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80 border-t border-white/15 pt-5">
                <span className="flex items-center gap-2"><Calendar size={15} className="text-accent" /> 1-Day Course</span>
                <span className="flex items-center gap-2"><Clock size={15} className="text-accent" /> 6 Hours · Live & Hands-On</span>
                <span className="flex items-center gap-2"><MonitorPlay size={15} className="text-accent" /> Online, Instructor-Led</span>
                <span className="flex items-center gap-2"><Users2 size={15} className="text-accent" /> Corporate HR Professionals</span>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Course Overview */}
        <section className="py-14 md:py-20 bg-light-gray">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: ClipboardList, label: 'Course', big: 'AI-Powered HR Professional' },
                { icon: Clock, label: 'Duration', big: '1 Day · 6 Hours' },
                { icon: MonitorPlay, label: 'Delivery', big: 'Online, Instructor-Led' },
                { icon: Users2, label: 'Audience', big: 'Corporate HR Teams' },
                { icon: Sparkles, label: 'Prerequisites', big: 'None Required' },
              ].map((s, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <s.icon className="text-primary mb-2" size={22} />
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{s.label}</p>
                  <p className="text-sm font-extrabold text-dark mt-1 leading-snug">{s.big}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="bg-primary text-white rounded-3xl p-7 md:p-10 mt-8">
              <p className="text-lg md:text-xl font-semibold mb-3 italic">
                "Don't ask 'What can AI do?' — ask 'What HR work should we stop doing manually?'"
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                HR teams regularly spend significant time on drafting, reviewing, comparing, summarising,
                documenting and restructuring information. AI can now assist with many of these activities —
                this course demonstrates how, not through a generic presentation on AI, but through realistic
                HR situations, live demonstrations and hands-on practice.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Day Schedule */}
        <section className="py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">Your Day, Hour by Hour</h2>
              <p className="text-gray-600">Structure of the 1-Day course (approx. 6 hours of session time)</p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {schedule.map((s, i) => (
                <div key={i} className={`flex items-center gap-4 px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-light-gray'}`}>
                  <span className="text-[11px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md shrink-0 w-32">{s.time}</span>
                  <span className={`text-gray-700 ${s.name.startsWith('Break') || s.name.startsWith('Lunch') ? 'italic text-gray-400' : 'font-medium'}`}>{s.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* The 4 Modules */}
        <section className="py-14 md:py-20 bg-light-gray">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">The Four Core Modules</h2>
              <p className="text-gray-600">Realistic HR scenarios, live AI demonstrations and guided practice</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {modules.map((m, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl"><m.icon className="text-primary" size={20} /></div>
                    <div>
                      <p className="text-[11px] font-bold text-accent uppercase tracking-wide">{m.module}</p>
                      <h3 className="font-extrabold text-dark">{m.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4"><strong className="text-primary">Scenario: </strong>{m.scenario}</p>
                  <div className="bg-light-gray rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Zap size={13} className="text-primary" /> Live Demonstration</p>
                    <ul className="space-y-1.5">
                      {m.demo.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={14} className="text-green-600 shrink-0 mt-0.5" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3"><strong className="text-primary">Hands-On: </strong>{m.handsOn}</p>
                  <p className="text-xs font-semibold text-primary bg-accent/15 rounded-lg px-3 py-2 inline-block"><TrendingUp size={12} className="inline mr-1" /> Value: {m.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sessions 7-10 */}
        <section className="py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">From AI Awareness to AI Adoption</h2>
              <p className="text-gray-600">Closing sessions that turn the day into an action plan</p>
            </motion.div>

            <div className="space-y-4">
              {laterSessions.map((s, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
                  <div className="shrink-0">
                    <div className="p-2.5 bg-accent/20 rounded-xl"><Lightbulb className="text-primary" size={20} /></div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-dark">{s.title}</h3>
                      <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">{s.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Take Away + Why it matters */}
        <section className="py-14 md:py-20 bg-primary text-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4">What Participants Take Away</h2>
                <ul className="space-y-3">
                  {takeaways.map((o, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                      <span className="p-1 bg-green-500/20 rounded-full shrink-0"><CheckCircle size={14} className="text-green-400" /></span>
                      {o}
                    </li>
                  ))}
                </ul>
                <p className="text-white/70 text-xs mt-5 leading-relaxed">
                  The intended outcome: participants don't just leave knowing more about AI — they leave
                  <strong className="text-white"> seeing AI opportunities in their own work</strong>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Why This Course Matters</h2>
                <p className="text-white/80 text-sm mb-5">The objective is not to make HR professionals "AI experts" in one day. It is to trigger a practical shift:</p>
                <div className="bg-white/10 rounded-2xl border border-white/15 p-5 mb-5">
                  <table className="w-full text-sm">
                    <tbody>
                      {shift.map((r, i) => (
                        <tr key={i} className="border-b border-white/10 last:border-0">
                          <td className="py-3 text-white/60 line-through">{r.from}</td>
                          <td className="py-3 text-center text-accent font-bold">→</td>
                          <td className="py-3 font-semibold">{r.to}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  AI can help HR reduce effort in activities involving{' '}
                  <strong className="text-accent">Drafting · Reviewing · Comparing · Summarising · Documenting · Restructuring</strong>.
                  The opportunity is not simply to complete these tasks faster, but to redirect saved time towards{' '}
                  <strong className="text-white">employee engagement, stakeholder interaction, decision-making and strategic HR work</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Audience + Reserve */}
        <section id="reserve" className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">Reserve Your Seat</h2>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {audit.map((a, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-light-gray border border-gray-100 rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-600">
                    <Users2 size={12} className="text-primary" /> {a}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                1-Day Live Online Course · <span className="line-through">₹5,000</span>{' '}
                <span className="text-primary font-extrabold text-xl">₹3,000</span>{' '}
                <span className="bg-accent/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">Festive Offer</span>
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8">
              {registered ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                  <CheckCircle className="text-green-600 mx-auto mb-2" size={36} />
                  <h3 className="font-bold text-green-700 mb-1">Almost there!</h3>
                  <p className="text-sm text-green-600">Complete the secure payment to confirm your seat.</p>
                </div>
              ) : (
                <form onSubmit={handleReserve} className="space-y-4">
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="Email Address *"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text" name="phone" value={form.phone} onChange={handleChange} required
                      placeholder="Phone Number *"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm sm:col-span-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    <div className="bg-accent/20 rounded-xl px-4 py-3 flex items-center justify-center gap-2">
                      <IndianRupee size={16} className="text-primary" />
                      <span className="font-extrabold text-primary">3,000</span>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                  <RecaptchaCheckbox onChange={setCaptchaToken} />

                  {captchaError && <p className="text-red-500 text-xs text-center">{captchaError}</p>}

                  <motion.button
                    type="submit" disabled={sending}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? 'Reserving...' : (
                      <>
                        Reserve Your Seat — ₹3,000 <Send size={16} />
                      </>
                    )}
                  </motion.button>

                  <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                    <span>I Authorize NEOSKILLS to send Notification via SMS/RCS/CALL/Email/Whatsapp.</span>
                  </label>
                </form>
              )}
            </motion.div>

            <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="text-center text-sm text-gray-500 mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span>www.neoskills.co.in</span>
              <span className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></span>
              <a href="tel:+919975214585" className="flex items-center gap-1.5 text-primary font-semibold hover:underline">
                <Phone size={14} /> 9975214585
              </a>
            </motion.p>
          </div>
        </section>
      </div>
    </>
  )
}