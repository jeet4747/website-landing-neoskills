import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, LayoutGrid, List } from 'lucide-react'
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
    if (!d) return null
    const parts = (d || '').split('-')
    if (parts.length === 3) {
      if (parts[0].length === 4) return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`)
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
    }
    const t = new Date(d)
    return isNaN(t.getTime()) ? null : t
  }

  const calendarGroups = useMemo(() => {
    const n = new Date()
    const today = new Date(n.getFullYear(), n.getMonth(), n.getDate())
    const groups = {}
    for (const b of batches) {
      const d = parseDate(b.date)
      if (!d) continue
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      if (!groups[key]) groups[key] = { date: d, label: b.date, batches: [] }
      groups[key].batches.push({ ...b, expired: d < today })
    }
    return Object.values(groups).sort((a, b) => a.date - b.date)
  }, [batches])

  const monthGroups = useMemo(() => {
    const n = new Date()
    const today = new Date(n.getFullYear(), n.getMonth(), n.getDate())
    const groups = {}
    const upcoming = []
    const expired = []
    for (const g of calendarGroups) {
      const key = `${g.date.getFullYear()}-${String(g.date.getMonth() + 1).padStart(2, '0')}`
      if (!groups[key]) groups[key] = { year: g.date.getFullYear(), month: g.date.getMonth(), label: g.date.toLocaleString('en-US', { month: 'long', year: 'numeric' }), dates: [] }
      groups[key].dates.push(g)
      ;(g.date >= today ? upcoming : expired).push(g)
    }
    return { monthGroups: Object.values(groups), upcoming, expired }
  }, [calendarGroups])

  const { monthGroups: monthGroupsList, upcoming: upcomingGroups, expired: expiredGroups } = monthGroups
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
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all shadow-sm"
              style={{
                backgroundColor: viewMode === 'calendar' ? '#0056D2' : 'white',
                color: viewMode === 'calendar' ? 'white' : '#0056D2',
                borderColor: '#0056D2',
              }}>
              {viewMode === 'calendar' ? <List size={16} /> : <LayoutGrid size={16} />}
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
          <div className="space-y-8">
            {calendarGroups.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">No batch dates scheduled.</div>
            ) : (
              <>
                {upcomingGroups.length > 0 && monthGroupsList.map(mg => {
                  const dates = upcomingGroups.filter(g => g.date.getMonth() === mg.month && g.date.getFullYear() === mg.year)
                  if (dates.length === 0) return null
                  return (
                    <div key={mg.label}>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar size={18} className="text-primary" />
                        {mg.label}
                      </h3>
                      <div className="space-y-3">
                        {dates.map((g, i) => (
                          <div key={i} className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
                              <div className="flex items-center gap-2 text-primary">
                                <Calendar size={16} />
                                <span className="font-bold text-primary text-base">{g.date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long' })}</span>
                              </div>
                              <span className="text-xs text-gray-400 ml-auto">{g.batches.length} batch{g.batches.length > 1 ? 'es' : ''}</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                              {g.batches.map(b => (
                                <div key={b.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                                  <div className="flex-1 min-w-0">
                                    <Link to={`/course/${b.slug}`} className="text-sm font-semibold text-gray-800 hover:text-primary transition-colors truncate block">
                                      {b.title}
                                    </Link>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                      <span>{b.mode || 'N/A'}</span>
                                      <span>{b.category || ''}</span>
                                    </div>
                                  </div>
                                  <span className="text-xs text-amber-600 font-medium whitespace-nowrap">{b.seats} seats</span>
                                  <button onClick={() => openEnroll()}
                                    className="shrink-0 px-5 py-2 text-xs font-semibold bg-primary text-white rounded-xl hover:bg-blue-800 transition-all shadow-sm">
                                    Enroll
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
                {expiredGroups.length > 0 && (
                  <details className="group">
                    <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2 py-2">
                      <span className="transition-transform group-open:rotate-90 inline-block mr-1">▶</span>
                      Past Batches ({expiredGroups.length} date{expiredGroups.length > 1 ? 's' : ''})
                    </summary>
                    <div className="mt-3 space-y-3">
                      {monthGroupsList.map(mg => {
                        const dates = expiredGroups.filter(g => g.date.getMonth() === mg.month && g.date.getFullYear() === mg.year)
                        if (dates.length === 0) return null
                        return (
                          <div key={`exp-${mg.label}`}>
                            <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              {mg.label}
                            </h4>
                            {dates.map((g, i) => (
                              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden mb-2">
                                <div className="flex items-center gap-3 px-5 py-3 bg-gray-100/50 border-b border-gray-100">
                                  <Calendar size={14} className="text-gray-400" />
                                  <span className="font-medium text-gray-500 text-sm">{g.date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long' })}</span>
                                  <span className="text-[10px] text-gray-400 ml-auto">Expired</span>
                                </div>
                                <div className="divide-y divide-gray-100/50">
                                  {g.batches.map(b => (
                                    <div key={b.id} className="flex items-center gap-3 px-5 py-2.5 opacity-50">
                                      <span className="text-xs text-gray-500">{b.title}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  </details>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
