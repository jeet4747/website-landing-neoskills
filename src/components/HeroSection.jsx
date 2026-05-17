import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

// Professional SVG illustrations for each course
const ITILIllustration = () => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40">
    <circle cx="80" cy="80" r="60" fill="#EEF4FF" />
    {/* Gear 1 */}
    <circle cx="60" cy="70" r="18" fill="#0056D2" opacity="0.15" />
    <circle cx="60" cy="70" r="12" fill="#0056D2" opacity="0.3" />
    <circle cx="60" cy="70" r="6" fill="#0056D2" />
    {/* Gear teeth */}
    {[0,45,90,135,180,225,270,315].map((angle, i) => (
      <rect key={i} x="57" y="48" width="6" height="8" rx="2" fill="#0056D2"
        transform={`rotate(${angle} 60 70)`} />
    ))}
    {/* Gear 2 */}
    <circle cx="95" cy="90" r="14" fill="#F59E0B" opacity="0.2" />
    <circle cx="95" cy="90" r="9" fill="#F59E0B" opacity="0.4" />
    <circle cx="95" cy="90" r="4.5" fill="#F59E0B" />
    {[0,60,120,180,240,300].map((angle, i) => (
      <rect key={i} x="92.5" y="73" width="5" height="7" rx="1.5" fill="#F59E0B"
        transform={`rotate(${angle} 95 90)`} />
    ))}
    {/* Service flow arrows */}
    <path d="M 45 100 Q 80 115 115 100" stroke="#0056D2" strokeWidth="2.5" fill="none" strokeDasharray="4 2" strokeLinecap="round" />
    <polygon points="115,97 120,100 115,103" fill="#0056D2" />
    {/* IT text */}
    <text x="80" y="135" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0056D2" fontFamily="Arial">IT SERVICE</text>
  </svg>
)

const PRINCE2Illustration = () => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28">
    <circle cx="80" cy="80" r="60" fill="#EEF4FF" />
    {/* Project board */}
    <rect x="30" y="45" width="100" height="75" rx="8" fill="white" stroke="#0056D2" strokeWidth="2" />
    {/* Columns */}
    <rect x="38" y="55" width="25" height="55" rx="4" fill="#EEF4FF" />
    <rect x="68" y="55" width="25" height="55" rx="4" fill="#EEF4FF" />
    <rect x="98" y="55" width="25" height="55" rx="4" fill="#EEF4FF" />
    {/* Column headers */}
    <rect x="38" y="55" width="25" height="10" rx="4" fill="#0056D2" />
    <rect x="68" y="55" width="25" height="10" rx="4" fill="#F59E0B" />
    <rect x="98" y="55" width="25" height="10" rx="4" fill="#10B981" />
    {/* Cards */}
    <rect x="41" y="70" width="19" height="10" rx="3" fill="#0056D2" opacity="0.3" />
    <rect x="41" y="83" width="19" height="10" rx="3" fill="#0056D2" opacity="0.3" />
    <rect x="71" y="70" width="19" height="10" rx="3" fill="#F59E0B" opacity="0.4" />
    <rect x="101" y="70" width="19" height="10" rx="3" fill="#10B981" opacity="0.4" />
    <rect x="101" y="83" width="19" height="10" rx="3" fill="#10B981" opacity="0.4" />
    {/* Crown on top */}
    <path d="M65 42 L72 30 L80 38 L88 30 L95 42 Z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" />
  </svg>
)

const PMPIllustration = () => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28">
    <circle cx="80" cy="80" r="60" fill="#EEF4FF" />
    {/* Certificate shape */}
    <rect x="35" y="40" width="90" height="70" rx="8" fill="white" stroke="#0056D2" strokeWidth="2" />
    {/* Certificate lines */}
    <rect x="45" y="55" width="70" height="4" rx="2" fill="#0056D2" opacity="0.3" />
    <rect x="45" y="64" width="50" height="3" rx="2" fill="#0056D2" opacity="0.2" />
    <rect x="45" y="72" width="60" height="3" rx="2" fill="#0056D2" opacity="0.2" />
    {/* PMP badge */}
    <circle cx="80" cy="90" r="14" fill="#0056D2" />
    <text x="80" y="95" textAnchor="middle" fontSize="10" fontWeight="800" fill="white" fontFamily="Arial">PMP</text>
    {/* Star burst */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
      <line key={i}
        x1={80 + 16 * Math.cos(angle * Math.PI/180)}
        y1={90 + 16 * Math.sin(angle * Math.PI/180)}
        x2={80 + 20 * Math.cos(angle * Math.PI/180)}
        y2={90 + 20 * Math.sin(angle * Math.PI/180)}
        stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    ))}
    {/* Ribbon */}
    <path d="M70 110 L75 120 L80 115 L85 120 L90 110" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const illustrations = {
  itil: <ITILIllustration />,
  prince2: <PRINCE2Illustration />,
  pmp: <PMPIllustration />,
}

const HeroSection = () => {
  const { openEnroll } = useEnroll()
  const [current, setCurrent] = useState(0)
  const [showUpcoming, setShowUpcoming] = useState(false)

  const slides = [
    {
      id: 'itil',
      title: 'ITIL 4 Foundation',
      subtitle: 'Master IT Service Management & best practices',
      description: 'Practical ITIL training for delivering superior IT services and improving processes.',
      amount: 5999
    },
    {
      id: 'prince2',
      title: 'PRINCE2 Certification',
      subtitle: 'Structured project management for any environment',
      description: 'Learn PRINCE2 principles, tailor them to your projects and pass Foundation & Practitioner.',
      amount: 7999,
    },
    {
      id: 'pmp',
      title: 'PMP Certification',
      subtitle: 'Project Management Professional (PMP)',
      description: 'Industry-recognized PMP training to advance your project management career.',
      amount: 9999
    }
  ]

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative bg-white py-12 md:py-20 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative flex items-center">
          {/* Left / Slide content */}
          <div className="w-full lg:w-2/3">
            <motion.div
              key={slides[current].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-dark rounded-full px-4 py-2 w-fit">
                <Zap size={16} className="text-accent" />
                <span className="text-sm font-semibold">FEATURED TRAINING</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-dark">
                {slides[current].title}
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl">
                {slides[current].subtitle} — {slides[current].description}
              </p>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => openEnroll({ course: slides[current].title, baseAmount: slides[current].amount })}
                  className="btn-primary flex items-center gap-2"
                >
                  Enroll Now
                  <ArrowRight size={16} />
                </button>
                <button onClick={() => setShowUpcoming(true)} className="btn-outline">
                  Upcoming Trainings
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right - SVG Illustration */}
          <div className="hidden lg:flex lg:w-1/3 items-center justify-center">
            <motion.div
              key={slides[current].id + '-illustration'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-56 h-56 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center"
            >
              <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg">
                {illustrations[slides[current].id]}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
            className="p-3 rounded-full bg-white border hover:shadow"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full ${i === current ? 'bg-primary' : 'bg-gray-300'}`}
              ></button>
            ))}
          </div>
          <button
            onClick={() => setCurrent((p) => (p + 1) % slides.length)}
            className="p-3 rounded-full bg-white border hover:shadow"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Upcoming Trainings Modal */}
      {showUpcoming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-lg p-6 relative">
            <button onClick={() => setShowUpcoming(false)} className="absolute top-3 right-3 text-gray-600">&times;</button>
            <h3 className="text-2xl font-bold mb-3">Upcoming Trainings</h3>
            <p className="text-sm text-gray-600 mb-4">Join our upcoming instructor-led sessions — limited seats available.</p>
            <ul className="space-y-3 mb-4">
              <li className="flex justify-between items-center border rounded p-3">
                <div>
                  <div className="font-semibold">ITIL v5 Foundation</div>
                  <div className="text-xs text-gray-500">Start: 20 Feb 2026 • 2 weeks</div>
                </div>
                <button onClick={() => { openEnroll({ course: 'ITIL v5 Foundation', baseAmount: 5999 }); setShowUpcoming(false) }} className="btn-primary text-sm">Enroll</button>
              </li>
              <li className="flex justify-between items-center border rounded p-3">
                <div>
                  <div className="font-semibold">PRINCE2 Foundation</div>
                  <div className="text-xs text-gray-500">Start: 5 Mar 2026 • 3 weeks</div>
                </div>
                <button onClick={() => { openEnroll({ course: 'PRINCE2 Foundation', baseAmount: 6999 }); setShowUpcoming(false) }} className="btn-primary text-sm">Enroll</button>
              </li>
              <li className="flex justify-between items-center border rounded p-3">
                <div>
                  <div className="font-semibold">PMP Bootcamp</div>
                  <div className="text-xs text-gray-500">Start: 12 Mar 2026 • 4 weeks</div>
                </div>
                <button onClick={() => { openEnroll({ course: 'PMP Bootcamp', baseAmount: 9999 }); setShowUpcoming(false) }} className="btn-primary text-sm">Enroll</button>
              </li>
            </ul>
            <div className="text-right">
              <button onClick={() => setShowUpcoming(false)} className="btn-outline">Close</button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  )
}

export default HeroSection