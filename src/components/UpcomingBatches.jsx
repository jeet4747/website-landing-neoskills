import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './upcoming.css'
import { useEnroll } from '../context/EnrollContext'

const staticBatches = [
  { id: 1, slug: 'aws-cloud-practitioner', title: 'AWS Cloud Practitioner', subtitle: '4:00 PM - 7:00 PM', date: '17-05-2026', urgent: true },
  { id: 2, slug: 'certified-scrum-master-csm', title: 'Certified Scrum Master (CSM)', subtitle: 'Live online training', date: '16-05-2026', urgent: true },
  { id: 3, slug: 'devops-tools-and-training', title: 'DevOps Tools & Training', subtitle: 'Live online training', date: '06-06-2026', urgent: true },
  { id: 4, slug: 'itil-4-foundation', title: 'ITIL v5 Foundation', subtitle: 'Weekend cohort', date: '16-05-2026', urgent: true },
  { id: 5, slug: 'agile-safe-advanced-scrum-master-sasm', title: 'Leading SAFe Agile in AI Empowered', subtitle: 'Advanced SAFe cohort', date: '14-05-2026', urgent: true },
  { id: 6, slug: 'pmp', title: 'PMP', subtitle: 'Live certification bootcamp', date: '23-05-2026', urgent: true },
  { id: 7, slug: 'power-bi', title: 'Power BI', subtitle: 'Data analytics certification', date: '23-05-2026', urgent: true },
  { id: 8, slug: 'professional-scrum-master-i-psm-i', title: 'Professional Scrum Master (PSM)', subtitle: 'Live online training', date: '16-05-2026', urgent: true },
  { id: 9, slug: 'professional-scrum-master-ai-essentials-certification', title: 'PSM AI Essentials', subtitle: 'AI-enabled Scrum essentials', date: '30-05-2026', urgent: true },
  { id: 10, slug: 'professional-scrum-product-owner-i-pspo-i', title: 'Professional Scrum Product Owner (PSPO)', subtitle: 'Live online training', date: '16-05-2026', urgent: true },
  { id: 11, slug: 'servicenow', title: 'Service Now', subtitle: '5:00 PM cohort', date: '23-05-2026', urgent: true },
]

const API_BASE = import.meta.env.VITE_API_URL || ''

const accentColor = (title) => {
  if (/PMP/i.test(title)) return '#FF7A59'
  if (/ITIL/i.test(title)) return '#7B61FF'
  if (/Cloud|AWS|Azure/i.test(title)) return '#3B82F6'
  if (/Python|Data Science|AI|PSM/i.test(title)) return '#F59E0B'
  if (/Scrum|Agile|CSM|CSPO|SAFe/i.test(title)) return '#10B981'
  return '#0F172A'
}

export default function UpcomingBatches() {
  const sliderRef = useRef(null)
  const animationRef = useRef(null)
  const isHoveredRef = useRef(false)
  const { openEnroll } = useEnroll()
  const [isPaused, setIsPaused] = useState(false)
  const [batches, setBatches] = useState(staticBatches)
  const [loading, setLoading] = useState(true)

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
              subtitle: c.stats?.mode || 'Live online training',
              date: c.stats.nextBatch,
              urgent: true,
            }))
          if (mapped.length > 0) setBatches(mapped)
        }
      } catch (err) {
        console.warn('Could not fetch batches from server, using static data:', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBatches()
  }, [])

  const duplicatedBatches = [...batches, ...batches]

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
          <span className="ub-badge">Upcoming Batches</span>
          <h2 className="upcoming-title">Choose Your Next Learning Sprint</h2>
          <p className="upcoming-subtitle">
            Explore our latest certification and training batches. Enroll early to secure your seat in the most in-demand programs.
          </p>
        </motion.div>

        <div
          className="ub-slider-wrap"
          onMouseEnter={() => { isHoveredRef.current = true; setIsPaused(true) }}
          onMouseLeave={() => { isHoveredRef.current = false; setIsPaused(false) }}
        >
          <div className="ub-slider" ref={sliderRef}>
            {duplicatedBatches.map((b, index) => {
              const color = accentColor(b.title)
              return (
                <article className="ub-card" key={`${b.id}-${index}`}>
                  <div className="ub-top" style={{ background: `linear-gradient(135deg, ${color}22, #ffffff 70%)` }}>
                    <div className="ub-tag" style={{ color, borderColor: `${color}33`, background: `${color}10` }}>
                      Live Batch
                    </div>
                    <div className="ub-icon" style={{ background: color }}>
                      {b.title.charAt(0)}
                    </div>
                  </div>
                  <div className="ub-body">
                    <h3 className="ub-title">{b.title}</h3>
                    {b.subtitle ? (
                      <p className="ub-sub">{b.subtitle}</p>
                    ) : (
                      <p className="ub-sub ub-sub--muted">Instructor-led live training with guided learning support</p>
                    )}
                    <div className="ub-meta">
                      <div className="ub-meta-row">
                        <span className="ub-meta-label">Batch Date</span>
                        <span className="ub-date">{b.date}</span>
                      </div>
                      {b.urgent && (
                        <div className="ub-seat-alert">
                          <span className="ub-pulse" />
                          Limited seats available
                        </div>
                      )}
                    </div>
                    <div className="ub-actions">
                      <button className="btn-enroll" onClick={() => openEnroll()}>Enroll Now</button>
                      <Link className="btn-contact" to={`/course/${b.slug}`}>More Info</Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="ub-fade ub-fade-left" />
          <div className="ub-fade ub-fade-right" />
        </div>

        <div className="ub-footer-note">
          <p>{loading ? 'Loading batches...' : isPaused ? 'Slider paused while you explore.' : 'Auto-scrolling through latest batches.'}</p>
        </div>
      </div>
    </section>
  )
}
