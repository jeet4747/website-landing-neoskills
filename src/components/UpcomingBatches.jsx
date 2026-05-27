import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react'
import './upcoming.css'
import { useEnroll } from '../context/EnrollContext'

const staticBatches = [
  { id: 1, slug: 'aws-cloud-practitioner', title: 'AWS Cloud Practitioner', mode: 'Evening • 4:00 PM - 7:00 PM', date: '30-05-2026', category: 'Cloud Computing', seats: 8 },
  { id: 2, slug: 'certified-scrum-master-csm', title: 'Certified Scrum Master (CSM)', mode: 'Live online', date: '23-05-2026', category: 'Agile & Scrum', seats: 5 },
  { id: 3, slug: 'devops-tools-and-training', title: 'DevOps Tools & Training', mode: 'Live online', date: '06-06-2026', category: 'DevOps', seats: 12 },
  { id: 4, slug: 'itil-4-foundation', title: 'ITIL 4 Foundation', mode: 'Weekend cohort', date: '23-05-2026', category: 'IT Service', seats: 6 },
  { id: 5, slug: 'agile-safe-advanced-scrum-master-sasm', title: 'Leading SAFe Agile in AI Empowered', mode: 'Advanced cohort', date: '23-05-2026', category: 'Agile & Scrum', seats: 4 },
  { id: 6, slug: 'pmp', title: 'PMP Certification', mode: 'Live bootcamp', date: '23-05-2026', category: 'Project Management', seats: 3 },
  { id: 7, slug: 'power-bi', title: 'Power BI', mode: 'Data analytics track', date: '23-05-2026', category: 'Data & Analytics', seats: 10 },
  { id: 8, slug: 'professional-scrum-master-i-psm-i', title: 'Professional Scrum Master (PSM I)', mode: 'Live online', date: '23-05-2026', category: 'Agile & Scrum', seats: 7 },
  { id: 9, slug: 'professional-scrum-master-ai-essentials-certification', title: 'PSM AI Essentials', mode: 'AI-enabled Scrum', date: '30-05-2026', category: 'Agile & Scrum', seats: 9 },
  { id: 10, slug: 'professional-scrum-product-owner-i-pspo-i', title: 'Professional Scrum Product Owner (PSPO I)', mode: 'Live online', date: '23-05-2026', category: 'Agile & Scrum', seats: 6 },
  { id: 11, slug: 'servicenow', title: 'ServiceNow', mode: 'Evening cohort', date: '23-05-2026', category: 'IT Service', seats: 8 },
  { id: 12, slug: 'professional-scrum-product-owner-ii-pspo-ii', title: 'Professional Scrum Product Owner II (PSPO II)', mode: 'Live online', date: '30-05-2026', category: 'Agile & Scrum', seats: 11 },
]

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function UpcomingBatches() {
  const sliderRef = useRef(null)
  const animationRef = useRef(null)
  const isHoveredRef = useRef(false)
  const { openEnroll } = useEnroll()
  const [isPaused, setIsPaused] = useState(false)
  const [batches, setBatches] = useState(staticBatches)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('carousel')
  const [calMonth, setCalMonth] = useState(() => {
    const n = new Date()
    return { month: n.getMonth(), year: n.getFullYear() }
  })

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const url = API_BASE ? `${API_BASE}/api/courses` : '/api/courses'
        const res = await fetch(url)
        if (!res.ok) throw new Error('Fetch failed')
        const courses = await res.json()
        if (Array.isArray(courses) && courses.length > 0) {
          const mapped = courses
            .filter(c => c.stats?.nextBatch)
            .map((c, i) => ({
              id: i + 1,
              slug: c.slug,
              title: c.title || c.fullTitle,
              mode: c.stats?.mode || 'Live online',
              date: c.stats.nextBatch,
              category: c.category || 'Professional',
              seats: Math.floor(Math.random() * 15) + 3,
            }))
          if (mapped.length > 0) setBatches(mapped)
        }
      } catch (err) {
        console.warn('Using static batch data:', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBatches()
  }, [])

  const parseDate = (d) => {
    const parts = (d || '').split('-')
    if (parts.length === 3) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
    return new Date(d)
  }

  const calendarGroups = useMemo(() => {
    const groups = {}
    for (const b of batches) {
      const d = parseDate(b.date)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      if (!groups[key]) groups[key] = { date: d, label: b.date, batches: [] }
      groups[key].batches.push(b)
    }
    return Object.values(groups).sort((a, b) => a.date - b.date)
  }, [batches])

  const calMonthBatches = useMemo(() => {
    return calendarGroups.filter(g => g.date.getMonth() === calMonth.month && g.date.getFullYear() === calMonth.year)
  }, [calendarGroups, calMonth])

  const daysInMonth = new Date(calMonth.year, calMonth.month + 1, 0).getDate()
  const firstDayOfWeek = new Date(calMonth.year, calMonth.month, 1).getDay()
  const monthName = new Date(calMonth.year, calMonth.month).toLocaleString('en-US', { month: 'long', year: 'numeric' })

  const calGrid = useMemo(() => {
    const cells = []
    for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${calMonth.year}-${String(calMonth.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const dayBatches = calMonthBatches.filter(g => {
        const gk = `${g.date.getFullYear()}-${String(g.date.getMonth() + 1).padStart(2, '0')}-${String(g.date.getDate()).padStart(2, '0')}`
        return gk === key
      })
      cells.push({ day: d, batches: dayBatches.flatMap(g => g.batches) })
    }
    return cells
  }, [calMonthBatches, daysInMonth, firstDayOfWeek, calMonth])

  const prevMonth = () => setCalMonth(c => ({ month: c.month === 0 ? 11 : c.month - 1, year: c.month === 0 ? c.year - 1 : c.year }))
  const nextMonth = () => setCalMonth(c => ({ month: c.month === 11 ? 0 : c.month + 1, year: c.month === 11 ? c.year + 1 : c.year }))

  const duplicated = [...batches, ...batches]

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const speed = 1.1
    const animate = () => {
      if (!slider) return
      if (!isHoveredRef.current) {
        slider.scrollLeft += speed
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [batches])

  return (
    <section id="upcoming" className="upcoming-section">
      <div className="upcoming-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="ub-header"
        >
          <span className="ub-badge">
            <Calendar size={14} />
            Upcoming Batches
          </span>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <h2 className="upcoming-title">Pick Your Batch</h2>
            <button onClick={() => setViewMode(v => v === 'carousel' ? 'calendar' : 'carousel')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all"
              style={{
                backgroundColor: viewMode === 'calendar' ? '#0056D2' : 'transparent',
                color: viewMode === 'calendar' ? 'white' : '#6b7280',
                borderColor: viewMode === 'calendar' ? '#0056D2' : '#d1d5db',
              }}>
              {viewMode === 'calendar' ? <List size={14} /> : <LayoutGrid size={14} />}
              {viewMode === 'calendar' ? 'Carousel View' : 'Calendar View'}
            </button>
          </div>
          <p className="upcoming-subtitle">
            Join live instructor-led batches. Limited seats available — secure yours today.
          </p>
        </motion.div>

        {viewMode === 'carousel' ? (
          <>
            <div
              className="ub-slider-wrap"
              onMouseEnter={() => { isHoveredRef.current = true; setIsPaused(true) }}
              onMouseLeave={() => { isHoveredRef.current = false; setIsPaused(false) }}
            >
              <div className="ub-slider" ref={sliderRef}>
                {duplicated.map((b, index) => (
                  <article className="ub-card" key={`${b.id}-${index}`}>
                    <div className="ub-card-inner">
                      <div className="ub-card-top">
                        <span className="ub-category">{b.category}</span>
                        <span className="ub-badge-urgent">
                          <span className="pulse-dot" /> {b.seats} seats
                        </span>
                      </div>
                      <h3 className="ub-card-title">{b.title}</h3>
                      <p className="ub-card-sub">{b.mode}</p>
                      <div className="ub-card-details">
                        <div className="ub-detail-item">
                          <Calendar size={15} />
                          <span><span className="ub-date-value">{b.date}</span></span>
                        </div>
                        <div className="ub-detail-item">
                          <Users size={15} />
                          <span>{b.seats} seats left</span>
                        </div>
                      </div>
                      <div className="ub-card-actions">
                        <button className="ub-btn-primary" onClick={() => openEnroll()}>
                          Enroll Now
                        </button>
                        <Link className="ub-btn-secondary" to={`/course/${b.slug}`}>
                          Details
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="ub-fade ub-fade-left" />
              <div className="ub-fade ub-fade-right" />
            </div>
            <div className="ub-footer-note">
              {loading ? 'Loading batches...' : isPaused ? 'Paused — hover off to resume scrolling' : 'Auto-scrolling through upcoming batches'}
            </div>
          </>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            {/* Month navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <button onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
                <ChevronLeft size={20} />
              </button>
              <h3 className="text-lg font-semibold text-white">{monthName}</h3>
              <button onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-white/5">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-center py-2 text-xs font-medium text-gray-500">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {calGrid.map((cell, i) => (
                <div key={i} className={`min-h-[90px] border-b border-r border-white/5 p-1.5 ${!cell ? 'bg-white/[0.02]' : ''}`}>
                  {cell && (
                    <>
                      <span className={`text-xs font-semibold ${cell.batches.length > 0 ? 'text-primary' : 'text-gray-500'}`}>
                        {cell.day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {cell.batches.slice(0, 2).map(b => (
                          <Link key={b.id} to={`/course/${b.slug}`}
                            className="block text-[10px] leading-tight bg-primary/20 text-primary rounded px-1.5 py-0.5 truncate hover:bg-primary/30 transition-colors"
                            title={b.title}>
                            {b.title}
                          </Link>
                        ))}
                        {cell.batches.length > 2 && (
                          <span className="text-[10px] text-gray-500 pl-1">+{cell.batches.length - 2} more</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="px-6 py-3 border-t border-white/5 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {calendarGroups.length} batch dates scheduled</span>
              {calendarGroups.filter(g => g.date.getMonth() === calMonth.month && g.date.getFullYear() === calMonth.year).length > 0 && (
                <span className="flex items-center gap-1.5"><Users size={12} /> {calMonthBatches.reduce((s, g) => s + g.batches.length, 0)} batches this month</span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
