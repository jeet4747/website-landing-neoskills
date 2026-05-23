import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Star, Award, TrendingUp, AlertCircle } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const SLIDES_API = BACKEND_URL ? `${BACKEND_URL}/api/hero-slides` : '/api/hero-slides'

function buildFallbackSlides() {
  return [
    {
      id: 'pmp',
      title: 'Project Management Professional (PMP)',
      subtitle: 'Professional Certification',
      description: 'Globally recognised certification for project managers. Master leadership, agile, and strategic business management skills.',
      badge: 'GOLD STANDARD',
      gradient: 'from-amber-600 to-amber-800',
      courseSlug: 'pmp',
      duration: '4 Days',
      nextBatch: 'Jun 15',
      active: true,
      order: 1,
    },
    {
      id: 'itil-4-foundation',
      title: 'ITIL 4 Foundation',
      subtitle: 'Professional Certification',
      description: 'The world\'s leading framework for IT service management. Align IT services with business needs and deliver value.',
      badge: 'FEATURED PROGRAM',
      gradient: 'from-blue-600 to-blue-800',
      courseSlug: 'itil-4-foundation',
      duration: '3 Days',
      nextBatch: 'Jun 20',
      active: true,
      order: 2,
    },
    {
      id: 'prince2-f-and-p',
      title: 'PRINCE2 Foundation & Practitioner',
      subtitle: 'Professional Certification',
      description: 'The most widely recognised project management methodology. Gain end-to-end control of any project, any size, any industry.',
      badge: 'MOST POPULAR',
      gradient: 'from-purple-600 to-purple-800',
      courseSlug: 'prince2-f-and-p',
      duration: '5 Days',
      nextBatch: 'Jun 25',
      active: true,
      order: 3,
    },
  ]
}

const HeroSection = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(SLIDES_API, { signal: AbortSignal.timeout(4000) })
      .then(res => res.json())
      .then(data => {
        if (cancelled) return
        const active = (Array.isArray(data) ? data : [])
          .filter(s => s.active !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
        if (active.length > 0) {
          setSlides(active)
        } else {
          setSlides(buildFallbackSlides())
        }
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setSlides(buildFallbackSlides())
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [slides.length])

  if (loading) {
    return (
      <section className="min-h-[85vh] flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      </section>
    )
  }

  if (slides.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center text-gray-400 flex items-center gap-2">
          <AlertCircle size={20} /> No slides available
        </div>
      </section>
    )
  }

  const slide = slides[current]

  return (
    <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/5 via-accent/5 to-transparent rounded-full -mr-72 -mt-72 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/8 via-accent/5 to-transparent rounded-full -ml-64 -mb-64 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-primary/20 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-accent/30 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">

          {/* Left Content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
            >
              <div className="flex -space-x-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white text-[8px] text-white flex items-center justify-center font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Trusted by 50,000+ professionals</span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-xs font-bold tracking-wider mb-4">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  {slide.badge || 'COURSE'}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-dark mb-3">
                  {slide.title}
                </h1>

                {slide.subtitle && (
                  <p className="text-xl sm:text-2xl font-semibold text-primary mb-4">
                    {slide.subtitle}
                  </p>
                )}

                <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed mb-6">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  {slide.duration && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-sm text-gray-600">
                        <span className="font-semibold text-dark">{slide.duration}</span>
                        <span className="text-gray-400 ml-1">Duration</span>
                      </span>
                    </div>
                  )}
                  {slide.nextBatch && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-sm text-gray-600">
                        <span className="font-semibold text-dark">{slide.nextBatch}</span>
                        <span className="text-gray-400 ml-1">Next Batch</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    onClick={() => navigate(`/course/${slide.courseSlug || slide.id}`)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-800 transition-all shadow-xl shadow-primary/25 text-base"
                  >
                    View Program
                    <ArrowRight size={18} />
                  </motion.button>
                  <motion.a
                    href="#courses"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 border-2 border-gray-200 text-dark font-semibold px-8 py-4 rounded-xl hover:border-primary hover:text-primary transition-all text-base"
                  >
                    View All Courses
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Visual */}
          <div className="hidden lg:flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="relative w-80 h-96 rounded-3xl bg-gradient-to-br from-primary to-accent/80 p-[2px] shadow-2xl">
                  <div className="w-full h-full rounded-3xl bg-white p-8 flex flex-col items-center justify-center">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${slide.gradient || 'from-primary to-blue-700'} flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg`}>
                      {slide.title.charAt(0)}
                    </div>
                    <h3 className="text-2xl font-bold text-dark text-center mb-2">{slide.title}</h3>
                    <p className="text-gray-500 text-sm text-center mb-4">{slide.subtitle}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={14} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/course/${slide.courseSlug || slide.id}`)}
                      className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/25"
                    >
                      View Program <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Award size={20} className="text-accent" />
                    <div>
                      <p className="text-xs text-gray-500">Certification</p>
                      <p className="text-sm font-bold text-dark">Guaranteed</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-3"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-500" />
                    <div>
                      <p className="text-xs text-gray-500">Placement</p>
                      <p className="text-sm font-bold text-dark">95% Rate</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-8">
              <motion.button
                onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </motion.button>
              <div className="flex gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <motion.button
                onClick={() => setCurrent(p => (p + 1) % slides.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
