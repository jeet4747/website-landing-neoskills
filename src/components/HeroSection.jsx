import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

const HeroSection = () => {
  const { openPayment } = useEnroll()
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
      image: '/images/prince2-hero.jpg'
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
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
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
            <motion.div key={slides[current].id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4 md:space-y-6">
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
                <button onClick={() => openPayment({ course: slides[current].title, baseAmount: slides[current].amount })} className="btn-primary flex items-center gap-2">
                  Enroll Now
                  <ArrowRight size={16} />
                </button>
                <button onClick={() => setShowUpcoming(true)} className="btn-outline">Upcoming Trainings</button>
              </div>
            </motion.div>
          </div>

          {/* Right - visual / logo */}
          <div className="hidden lg:flex lg:w-1/3 items-center justify-center">
            <div className="w-56 h-56 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
              <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img src={slides[current].image || '/images/nls-logo.svg'} alt={slides[current].title || 'Neoskill'} className="h-20 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)} className="p-3 rounded-full bg-white border hover:shadow">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button key={s.id} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full ${i === current ? 'bg-primary' : 'bg-gray-300'}`}></button>
            ))}
          </div>
          <button onClick={() => setCurrent((p) => (p + 1) % slides.length)} className="p-3 rounded-full bg-white border hover:shadow">
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
                  <div className="font-semibold">ITIL 4 Foundation</div>
                  <div className="text-xs text-gray-500">Start: 20 Feb 2026 • 2 weeks</div>
                </div>
                <button onClick={() => { openPayment({ course: 'ITIL 4 Foundation', baseAmount: 5999 }); setShowUpcoming(false) }} className="btn-primary text-sm">Enroll</button>
              </li>
              <li className="flex justify-between items-center border rounded p-3">
                <div>
                  <div className="font-semibold">PRINCE2 Foundation</div>
                  <div className="text-xs text-gray-500">Start: 5 Mar 2026 • 3 weeks</div>
                </div>
                <button onClick={() => { openPayment({ course: 'PRINCE2 Foundation', baseAmount: 6999 }); setShowUpcoming(false) }} className="btn-primary text-sm">Enroll</button>
              </li>
              <li className="flex justify-between items-center border rounded p-3">
                <div>
                  <div className="font-semibold">PMP Bootcamp</div>
                  <div className="text-xs text-gray-500">Start: 12 Mar 2026 • 4 weeks</div>
                </div>
                <button onClick={() => { openPayment({ course: 'PMP Bootcamp', baseAmount: 9999 }); setShowUpcoming(false) }} className="btn-primary text-sm">Enroll</button>
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
