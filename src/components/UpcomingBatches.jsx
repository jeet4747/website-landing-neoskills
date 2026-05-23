import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
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
          <h2 className="upcoming-title">Pick Your Batch</h2>
          <p className="upcoming-subtitle">
            Join live instructor-led batches. Limited seats available — secure yours today.
          </p>
        </motion.div>

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
      </div>
    </section>
  )
}
