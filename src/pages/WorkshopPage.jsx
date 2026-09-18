import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Calendar, Clock, Users2, CheckCircle, ArrowRight, Phone,
  Sparkles, Target, Zap, TrendingUp, Lightbulb, Briefcase, Layers,
  Workflow, MessageSquare, Send, IndianRupee,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, EMAILJS_PUBLIC_KEY } from '../config/emailjs'
import { useEnroll } from '../context/EnrollContext'

const WORKSHOP_COURSE = 'AI Essentials for Project Managers Workshop'
const WORKSHOP_FEE = 5999

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

const roles = [
  {
    number: '01',
    icon: Briefcase,
    title: 'AI Project Coordinator',
    desc: 'Routine project work, documentation, meeting outputs and follow-ups.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'AI Peer Project Manager',
    desc: 'Reviews risks, plans, assumptions, gaps and options alongside you.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'AI Project Director',
    desc: 'Helps think through escalations, trade-offs and difficult decisions.',
  },
]

const trainingValue = [
  { icon: Users2, title: 'AI Project Management Team', desc: 'Coordinator • Peer PM • Project Director' },
  { icon: MessageSquare, title: 'Project Context Engineering', desc: 'Give AI the right project context so it can work effectively with you.' },
  { icon: Workflow, title: 'AI Across The Project Lifecycle', desc: 'Initiation → Planning → Execution → M&C → Closing' },
  { icon: Target, title: 'PM Decision Support', desc: 'Risks • Issues • Trade-offs • Escalations • Options' },
  { icon: Zap, title: 'PM Productivity', desc: 'Reports • Meetings • Documentation • Communication • Analysis' },
  { icon: Lightbulb, title: 'Prompt Engineering for PMs', desc: 'Build clear, reusable prompts and workflows for real PM work.' },
]

const processSteps = [
  { title: 'Real Project Scenario', desc: 'Start with a realistic Project Management challenge.' },
  { title: 'Add Project Context', desc: 'Give AI the information, constraints and background it needs.' },
  { title: 'Work With AI', desc: 'Create prompts, analyse, challenge and refine the output.' },
  { title: 'Ready-to-Use Output', desc: 'Walk away with a usable artifact, analysis or decision support.' },
]

const learnOutcomes = [
  'Build your AI Project Management Team',
  'Set up the right project context',
  'Build your Personal PM Prompt Library',
  'Apply AI to real PM use cases',
  'Evaluate and refine AI outputs',
]

const audience = [
  'Project Managers',
  'Program Managers',
  'PMO Professionals',
  'Project Leads',
  'Delivery Managers',
  'Associate Project Managers',
  'Scrum Masters',
]

export default function WorkshopPage() {
  const navigate = useNavigate()
  const { openPayment } = useEnroll()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [registered, setRegistered] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleReserve = async (e) => {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_INQUIRY, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: WORKSHOP_COURSE,
        message: 'Reserve my seat for the 1-Day AI Essentials for Project Managers workshop (Pune).',
      }, EMAILJS_PUBLIC_KEY)
      setRegistered(true)
      openPayment({
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: WORKSHOP_COURSE,
        amount: WORKSHOP_FEE,
        source: 'workshop',
      })
    } catch {
      setError('Something went wrong. Please try again or call us at +91 9975214585.')
    } finally {
      setSending(false)
    }
  }

  const handlePayDirect = () => {
    openPayment({
      name: '',
      email: '',
      phone: '',
      course: WORKSHOP_COURSE,
      amount: WORKSHOP_FEE,
      source: 'workshop',
    })
  }

  return (
    <>
      <Helmet>
        <title>1-Day AI Essentials for Project Managers Workshop | Pune | NeoSkills</title>
        <meta name="description" content="1-Day Practical Classroom Workshop in Pune. Learn to use AI as your Project Coordinator, Peer Project Manager and Project Director. Live & hands-on, no coding required. ₹5,999 per participant." />
        <meta property="og:title" content="1-Day AI Essentials for Project Managers Workshop | Pune | NeoSkills" />
        <meta property="og:description" content="Invest 8 hours at NeoSkills. Learn to work with AI as Project Coordinator, Peer Project Manager and Project Director. Reclaim 20-30 hours of capacity every month." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Nav */}
        <div className="bg-primary border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-sm text-white/80 hover:text-white">← Home</Link>
            <span className="text-xs font-semibold text-accent bg-white/10 px-3 py-1 rounded-full">1-Day Practical Workshop</span>
          </div>
        </div>

        {/* Hero */}
        <header className="bg-gradient-to-br from-primary via-primary to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #FFC300 0, transparent 40%), radial-gradient(circle at 80% 70%, #4facfe 0, transparent 40%)' }} />
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 relative">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-accent mb-4 uppercase">
                1-Day Practical Classroom Workshop | Pune
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                AI Essentials for <span className="text-accent">Project Managers</span>
              </h1>
              <p className="text-xl md:text-2xl font-semibold mb-3">Build Your AI Project Management Team</p>
              <p className="text-white/80 max-w-2xl text-sm md:text-base leading-relaxed">
                Stop using AI just for writing emails, MOMs and answering ad-hoc queries. Learn how to
                use AI as a <strong className="text-white">Project Coordinator</strong>,{' '}
                <strong className="text-white">Peer Project Manager</strong> and{' '}
                <strong className="text-white">Project Director</strong> — working alongside you on real project work.
              </p>

              <div className="flex flex-wrap gap-4 items-center mt-6 text-sm md:text-base">
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> Think better</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> Decide faster</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> Work smarter</span>
                <span className="flex items-center gap-2"><CheckCircle size={16} className="text-accent" /> Lead better</span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#reserve" className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-black/20">
                  Reserve Your Seat <ArrowRight size={18} />
                </a>
                <a href="tel:+919975214585" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all">
                  <Phone size={18} /> 9975214585
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80 border-t border-white/15 pt-5">
                <span className="flex items-center gap-2"><Calendar size={15} className="text-accent" /> 1-Day Classroom Workshop</span>
                <span className="flex items-center gap-2"><Clock size={15} className="text-accent" /> 8 Hours · 9 AM – 6 PM</span>
                <span className="flex items-center gap-2"><Users2 size={15} className="text-accent" /> Hotel Venue · Pune</span>
                <span className="flex items-center gap-2"><Sparkles size={15} className="text-accent" /> Live & Hands-On | No Coding Required</span>
              </div>

              <p className="mt-6 text-sm text-white/70">
                <strong className="text-white">Instructor:</strong> Abhijit Ambulkar, PMP, CPMAI · Live & Hands-On · No Coding Required
              </p>
            </motion.div>
          </div>
        </header>

        {/* Why This Works */}
        <section className="py-14 md:py-20 bg-light-gray">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">Why This Works</h2>
              <p className="text-gray-600">
                Invest 8 Hours. <strong>Reclaim 20–30 Hours Every Month.</strong>
              </p>
              <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
                A Project Manager can spend around 170 working hours every month managing emails, meetings,
                reports, documentation, follow-ups, analysis and project information. The goal isn't simply
                to work less — it's to spend more of your time on decisions, stakeholders, leadership and
                higher-value project work.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Clock, big: '8 Hours', label: 'One-day hands-on workshop' },
                { icon: Zap, big: '20–30 Hrs', label: 'Capacity potentially reclaimed every month' },
                { icon: TrendingUp, big: '240–360 Hrs', label: 'Potential capacity reclaimed in a year' },
                { icon: IndianRupee, big: '₹5,999', label: 'Investment → potential to recover far more value in month one' },
              ].map((s, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                  <s.icon className="text-primary mx-auto mb-3" size={26} />
                  <p className="text-xl md:text-2xl font-extrabold text-primary">{s.big}</p>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Core Idea */}
        <section className="py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">The Core Idea</h2>
              <p className="text-gray-600">What If AI Became Part Of Your Project Team?</p>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Instead of using AI only as a writing assistant, learn to work with AI in three roles —
                members of one project team.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {roles.map((r, i) => (
                <motion.div key={r.number} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl"><r.icon className="text-primary" size={24} /></div>
                    <span className="text-4xl font-extrabold text-primary/10">{r.number}</span>
                  </div>
                  <h3 className="font-bold text-dark mb-2">{r.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="text-center text-gray-500 text-sm mt-8 max-w-2xl mx-auto">
              This is more than learning prompts — you're learning how to <strong className="text-primary">work with AI as a project professional</strong>.
            </motion.p>
          </div>
        </section>

        {/* Training Value */}
        <section className="py-14 md:py-20 bg-light-gray">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">Training Value</h2>
              <p className="text-gray-600">Learn AI Through Real Project Management Work</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trainingValue.map((v, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="p-2.5 bg-accent/20 rounded-lg inline-flex mb-3"><v.icon className="text-primary" size={20} /></div>
                  <h3 className="font-bold text-dark mb-1.5">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Not Just Theory */}
        <section className="py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">Not Just Theory</h2>
              <p className="text-gray-600">Don't Just Watch AI. <strong>Work With It.</strong></p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="relative">
                  <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-6 text-white h-full">
                    <span className="text-4xl font-extrabold text-white/20">0{i + 1}</span>
                    <h3 className="font-bold mt-3 mb-1.5">{step.title}</h3>
                    <p className="text-white/75 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 z-10 text-primary -translate-y-1/2" size={20} />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="text-center mt-8">
              <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wide">
                LEARN → TRY → REVIEW → REFINE → APPLY
              </span>
            </motion.p>
          </div>
        </section>

        {/* Beyond the Tools */}
        <section className="py-14 md:py-20 bg-primary text-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-extrabold mb-3">AI Tools Will Change. This Skill Will Not.</h2>
                <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                  Your ability to communicate clearly with AI, provide the right project context, evaluate
                  its output and refine the result will remain valuable.
                </p>
                <div className="bg-white/10 rounded-xl p-5 border border-white/15">
                  <p className="text-xs font-bold tracking-widest text-accent mb-4 uppercase">Prompt + Context Engineering</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    {['Role', 'Context', 'Task', 'Constraints', 'Deliverable', 'Review', 'Refine'].map((k, i, arr) => (
                      <React.Fragment key={k}>
                        <span className="bg-white/15 px-3 py-1.5 rounded-full">{k}</span>
                        {i < arr.length - 1 && <span className="text-accent">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-white/70 text-xs mt-4">Better context → Better AI output → Better PM outcomes</p>
                </div>
              </div>

              <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="bg-white text-dark rounded-2xl p-7">
                  <h3 className="font-extrabold text-lg mb-4">By the end of the workshop, you will understand how to:</h3>
                  <ul className="space-y-3">
                    {learnOutcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="p-1 bg-green-100 rounded-full shrink-0"><CheckCircle size={14} className="text-green-600" /></span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Audience Fit */}
        <section className="py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-dark mb-3">Is This Workshop For You?</h2>
              <p className="text-gray-600">
                Built for professionals who plan, coordinate, manage and deliver projects.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-3 mb-8">
              {audience.map((a, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-light-gray border border-gray-100 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700">
                  <Users2 size={15} className="text-primary" /> {a}
                </span>
              ))}
            </motion.div>

            <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="text-sm text-gray-500">
              No coding or technical AI background required.
            </motion.p>
          </div>
        </section>

        {/* Instructor */}
        <section className="py-14 md:py-20 bg-light-gray">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden md:flex">
              <div className="bg-gradient-to-br from-primary to-blue-800 p-8 md:w-2/5 flex flex-col items-center justify-center text-white text-center">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-extrabold mb-4">
                  AA
                </div>
                <h3 className="text-xl font-extrabold mb-1">Abhijit Ambulkar</h3>
                <p className="text-accent text-sm font-semibold">PMP · CPMAI</p>
                <p className="text-white/75 text-xs mt-3 leading-relaxed">
                  Project Management Practitioner | AI Transformation Practitioner | Oracle PPM Cloud SME
                </p>
                <a href="https://www.linkedin.com/in/abhijit-ambulkar" target="_blank" rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 bg-white text-primary text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  linkedin.com/in/abhijit-ambulkar
                </a>
              </div>
              <div className="p-8 md:w-3/5">
                <h3 className="text-2xl font-extrabold text-dark mb-4">Your Instructor</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  AI taught by a <strong className="text-primary">Project Management practitioner</strong> —
                  not a generic technology trainer.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { big: '20+', label: 'Years of Project Management experience' },
                    { big: '200+', label: 'Enterprise projects delivered' },
                    { big: '1,000+', label: 'Professionals mentored' },
                  ].map((m, i) => (
                    <div key={i} className="bg-light-gray rounded-xl p-4 text-center">
                      <p className="text-2xl font-extrabold text-primary">{m.big}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reserve Your Seat */}
        <section id="reserve" className="py-14 md:py-20 bg-gradient-to-br from-primary to-blue-900 text-white">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-3">Reserve Your Seat</h2>
              <p className="text-white/80">Your 8 Hours Could Change How You Work Every Day.</p>
              <p className="text-white/60 text-sm mt-2">
                1-Day Practical Classroom Workshop | Pune (Hotel Venue) |{' '}
                <span className="text-accent font-bold">₹5,999 per participant</span>
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white text-dark rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-light-gray rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-primary">8 Hours</p>
                  <p className="text-xs text-gray-500 mt-1">Your investment</p>
                </div>
                <div className="bg-light-gray rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-primary">20–30 Hrs</p>
                  <p className="text-xs text-gray-500 mt-1">Potential capacity every month</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                What will you do with those extra hours? Decision Making? Stakeholder Leadership?
                Risk Anticipation? Team Coaching? Strategic Work?
              </p>

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
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />

                  {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                  <motion.button
                    type="submit" disabled={sending}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? 'Reserving...' : (
                      <>
                        Reserve Your Seat — ₹5,999 <Send size={16} />
                      </>
                    )}
                  </motion.button>

                  <div className="flex items-center justify-center">
                    <button type="button" onClick={handlePayDirect}
                      className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2">
                      Or pay ₹5,999 directly via Razorpay
                    </button>
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                    <span>I Authorize NEOSKILLS to send Notification via SMS/RCS/CALL/Email/Whatsapp.</span>
                  </label>
                </form>
              )}
            </motion.div>

            <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="text-center text-sm text-white/70 mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span>www.neoskills.co.in</span>
              <span className="hidden sm:block w-1 h-1 bg-white/40 rounded-full"></span>
              <a href="tel:+919975214585" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Phone size={14} /> 9975214585
              </a>
            </motion.p>
            <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="text-center text-xs text-white/50 mt-2">
              One Day. Real Project Work. Practical AI.
            </motion.p>
          </div>
        </section>
      </div>
    </>
  )
}