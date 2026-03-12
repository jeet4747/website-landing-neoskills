import React, { useRef, useEffect, useState } from 'react'
import './upcoming.css'
import { useEnroll } from '../context/EnrollContext'

const batches = [
  { id: 1, title: 'Service Now', subtitle: '5:00 PM', date: 'Every Monday', urgent: true },
  { id: 2, title: 'Professional Scrum Master™ - AI Essentials Certification', subtitle: '', date: '25-Apr-2026', urgent: true },
  { id: 3, title: 'Devops Tools & Training', subtitle: '', date: '28-Mar-2026', urgent: true },
  { id: 4, title: 'Power BI', subtitle: '', date: '28-Mar-2026', urgent: true },
  { id: 5, title: 'Prince 2 F & P', subtitle: '9:30 AM - 1:30 PM', date: '28-Mar-2026', urgent: true },
  { id: 6, title: 'PMP', subtitle: '6:00 PM - 10:00 PM Batch', date: '21-Mar-2026', urgent: true },
  { id: 7, title: 'TOGAF Level 1 and Level 2 Certification', subtitle: '', date: '21-Mar-2026', urgent: true },
  { id: 8, title: 'Professional Scrum Master™ - AI Essentials Certification', subtitle: '', date: '18-Mar-2026', urgent: true },
  { id: 9, title: 'Advanced Certified Scrum Product Owner (A-CSPO)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 10, title: 'Agile Advanced Certified ScrumMaster (A-CSM)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 11, title: 'Agile Certified Scrum Product Owner (CSPO)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 12, title: 'Agile Certified ScrumMaster (CSM)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 13, title: 'Agile Professional Scrum Master I (PSM I)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 14, title: 'Agile Professional Scrum Master II (PSM II)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 15, title: 'Agile Professional Scrum Product Owner I (PSPO I)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 16, title: 'Agile Professional Scrum Product Owner II (PSPO II)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 17, title: 'Agile SAFe Advanced Scrum Master (SASM)', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 18, title: 'AWS Training', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 19, title: 'Azure Cloud', subtitle: '', date: '4-Apr-2026', urgent: true },
  { id: 20, title: 'Azure Cloud', subtitle: 'Weekday Batch • 8:00 AM - 10:00 AM', date: '6-Apr-2026', urgent: true },
  { id: 21, title: 'CBAP Training and Certification', subtitle: '12:30 PM - 6:30 PM', date: '14-Mar-2026', urgent: true },
  { id: 22, title: 'ITIL FND', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 23, title: 'CISA', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 24, title: 'CPMAI & AI Project Management', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 25, title: 'PMP', subtitle: 'Morning Batch', date: '14-Mar-2026', urgent: true },
  { id: 26, title: 'Professional Scrum Master™ - AI Essentials Certification', subtitle: '', date: '14-Mar-2026', urgent: true },
  { id: 27, title: 'Professional Scrum Master™ - AI Essentials Certification', subtitle: '', date: '11-Mar-2026', urgent: true },
]
const accentColor = (title) => {
  if (/PMP/i.test(title)) return '#FF7A59'
  if (/ITIL/i.test(title)) return '#7B61FF'
  if (/Cloud|AWS|Azure/i.test(title)) return '#3B82F6'
  if (/Python|Data Science|AI/i.test(title)) return '#F59E0B'
  if (/Scrum|Agile|PSM|CSM|CSPO|SAFe/i.test(title)) return '#10B981'
  return '#0F172A'
}

export default function UpcomingBatches() {
  const sliderRef = useRef(null)
  const animationRef = useRef(null)
  const isHoveredRef = useRef(false)
  const { openEnroll } = useEnroll()
  const [isPaused, setIsPaused] = useState(false)

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
  }, [])

  const handleContact = (course) => {
    try {
      localStorage.setItem('preferredCourse', course)
    } catch (e) {}

    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="upcoming" className="upcoming-section">
      <div className="upcoming-inner">
        <div className="ub-header">
          <span className="ub-badge">Upcoming Batches</span>
          <h2 className="upcoming-title">Choose Your Next Learning Sprint</h2>
          <p className="upcoming-subtitle">
            Explore our latest certification and training batches. Enroll early to secure your seat in the most in-demand programs.
          </p>
        </div>

        <div
          className="ub-slider-wrap"
          onMouseEnter={() => {
            isHoveredRef.current = true
            setIsPaused(true)
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false
            setIsPaused(false)
          }}
        >
          <div className="ub-slider" ref={sliderRef}>
            {duplicatedBatches.map((b, index) => {
              const color = accentColor(b.title)

              return (
                <article className="ub-card" key={`${b.id}-${index}`}>
                  <div
                    className="ub-top"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, #ffffff 70%)`,
                    }}
                  >
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
                      <button className="btn-enroll" onClick={() => openEnroll()}>
                        Enroll Now
                      </button>
                      <button className="btn-contact" onClick={() => handleContact(b.title)}>
                        Contact Us
                      </button>
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
          <p>{isPaused ? 'Slider paused while you explore.' : 'Auto-scrolling through latest batches.'}</p>
        </div>
      </div>
    </section>
  )
}