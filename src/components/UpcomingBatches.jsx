import React, { useRef } from 'react'
import './upcoming.css'
import { useEnroll } from '../context/EnrollContext'

const batches = [
  { id: 1, title: 'PMP', subtitle: 'Project Management', instructor: 'Mr. A', mode: 'Offline', time: '12:00 PM', date: '18th February 2026' },
  { id: 2, title: 'ITIL', subtitle: 'Service Management', instructor: 'Ms. B', mode: 'Online', time: '1:00 PM', date: '20th February 2026' },
  { id: 3, title: 'Clouds', subtitle: 'AWS / Azure / GCP', instructor: 'Mr. C', mode: 'Offline & Online', time: '4:00 PM', date: '22nd February 2026' },
  { id: 4, title: 'Python Full Stack', subtitle: 'AI Integration & DSA', instructor: 'Mr. Srinivas', mode: 'Offline & Online', time: '12:30 PM', date: '25th February 2026' },
  { id: 5, title: 'Data Science', subtitle: 'AI & ML', instructor: 'Dr. D', mode: 'Online & Offline', time: '12:00 PM', date: '28th February 2026' },
]

const accentColor = (title) => {
  if (/PMP/i.test(title)) return '#FF7A59'
  if (/ITIL/i.test(title)) return '#7B61FF'
  if (/Cloud/i.test(title)) return '#3B82F6'
  if (/Python|Data Science|AI/i.test(title)) return '#F59E0B'
  return '#10B981'
}

export default function UpcomingBatches() {
  const sliderRef = useRef(null)
  const { openEnroll } = useEnroll()

  const scroll = (direction) => {
    const el = sliderRef.current
    if (!el) return
    const scrollAmount = el.offsetWidth * 0.8
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  const handleContact = (course) => {
    try { localStorage.setItem('preferredCourse', course) } catch (e) {}
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="upcoming" className="upcoming-section">
      <div className="upcoming-inner container">
        <h2 className="upcoming-title">New Batches</h2>
        <div className="upcoming-controls">
          <button className="btn-scroll" onClick={() => scroll('left')} aria-label="Previous">‹</button>
          <button className="btn-scroll" onClick={() => scroll('right')} aria-label="Next">›</button>
        </div>

        <div className="ub-slider" ref={sliderRef}>
          {batches.map((b) => {
            const color = accentColor(b.title)
            return (
              <article className="ub-card" key={b.id}>
                <div className="ub-image" aria-hidden style={{ background: `linear-gradient(135deg, ${color}20, #fff)` }}>
                  <div className="ub-image-label" style={{ color }}>{b.title}</div>
                </div>
                <div className="ub-body">
                  <h3 className="ub-title">{b.title}</h3>
                  <p className="ub-sub">{b.subtitle}</p>
                  <ul className="ub-meta">
                    <li>Mode: {b.mode}</li>
                    <li>Instructor: {b.instructor}</li>
                    <li>Timing: {b.time}</li>
                    <li>Date: {b.date}</li>
                  </ul>

                  <div className="ub-actions">
                    <button className="btn-enroll" onClick={() => openEnroll()}>Enroll</button>
                    <button className="btn-contact" onClick={() => handleContact(b.title)}>Contact</button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="ub-contact-preview">
          <p className="ub-contact-note">Want help choosing a batch? Use the contact form below.</p>
        </div>
      </div>
    </section>
  )
}
