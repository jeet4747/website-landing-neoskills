import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEnroll } from '../context/EnrollContext'
import { getAllResolvedCourses, effectiveListedPrice } from '../data/catalogBuilder'
import emailjs from '@emailjs/browser'
import './enroll.css'

function buildOptionsAndPrices() {
  const courses = getAllResolvedCourses()
  const options = []
  const prices = {}
  for (const c of courses) {
    if (!c.title) continue
    const price = effectiveListedPrice(c) || c.feeDetails?.total || 0
    options.push({ value: c.slug, label: c.fullTitle || c.title })
    if (price > 0) prices[c.slug] = price
  }
  options.sort((a, b) => a.label.localeCompare(b.label))
  return { options, prices }
}

export default function Enroll() {
  const { openPayment } = useEnroll()
  const navigate = useNavigate()
  const location = useLocation()
  const form = useRef()

  const { options: courseOptions, prices: priceMap } = useMemo(() => buildOptionsAndPrices(), [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    experience: '',
    message: '',
  })

  useEffect(() => {
    const preferredCourse =
      location.state?.course ||
      (() => {
        try { return localStorage.getItem('preferredCourse') } catch { return null }
      })()

    if (preferredCourse) {
      const matched = mapCourseToValue(preferredCourse, courseOptions)
      if (matched) {
        setFormData((prev) => ({ ...prev, course: matched }))
      }
    }
  }, [location.state, courseOptions])

  const mapCourseToValue = (courseName, options) => {
    const text = (courseName || '').toLowerCase().trim()
    // Try direct slug match first
    const bySlug = options.find(o => o.value === text)
    if (bySlug) return bySlug.value

    // Try keyword matching against course labels
    const byLabel = options.find(o => o.label.toLowerCase().includes(text))
    if (byLabel) return byLabel.value

    // Legacy keyword matching
    if (text.includes('pmp')) return 'pmp'
    if (text.includes('scrum') || text.includes('agile') || text.includes('psm') || text.includes('csm')) return 'certified-scrum-master-csm'
    if (text.includes('aws')) return 'aws-cloud-practitioner'
    if (text.includes('azure')) return 'microsoft-azure-az-900'
    if (text.includes('devops')) return 'devops-tools-and-training'
    if (text.includes('power bi')) return 'power-bi'
    if (text.includes('itil')) return 'itil-4-foundation'
    if (text.includes('prince')) return 'prince2-f-and-p'
    if (text.includes('cisa')) return 'cisa'
    if (text.includes('cbap')) return 'cbap'
    if (text.includes('togaf')) return 'togaf'
    return options.length > 0 ? options[0].value : ''
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs.sendForm(
      'service_62ub16q',
      'template_e15u3k6',
      form.current,
      'S3TiyuUzfI2FRb5RG'
    ).then(() => {
      console.log('Email sent successfully!')
    }).catch((error) => {
      console.error('EmailJS error:', error)
    })

    const selectedCourseLabel =
      courseOptions.find((item) => item.value === formData.course)?.label || 'Course Inquiry'

    const stateAmt = Number(location.state?.baseAmount)
    const preferNavAmount =
      location.state?.baseAmount != null && !Number.isNaN(stateAmt) && stateAmt > 0

    const catalogPrice = priceMap[formData.course] || 0
    const baseAmount = preferNavAmount ? stateAmt : (catalogPrice || 2999)

    const paymentPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: selectedCourseLabel,
      experience: formData.experience,
      message: formData.message,
      baseAmount,
    }

    openPayment(paymentPayload)

    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      experience: '',
      message: '',
    })
  }

  return (
    <div className="modal-overlay" onClick={() => navigate('/')}>
      <div className="modal-content enroll-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => navigate('/')} aria-label="Close">
          &times;
        </button>

        <div className="enroll-header">
          <span className="enroll-badge">NeoSkills Enrollment</span>
          <h2>Reserve Your Seat</h2>
          <p>
            Fill in your details to continue with enrollment. Our team will guide you with
            batch details, course support, and the next steps.
          </p>
        </div>

        <div className="enroll-info-strip">
          <div className="info-chip">Live Instructor-Led Training</div>
          <div className="info-chip">Upcoming Batches Available</div>
          <div className="info-chip">Quick Enrollment Support</div>
        </div>

        <form className="enroll-form" onSubmit={handleSubmit} ref={form}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course">Select Course</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a course</option>
                {courseOptions.map((course) => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="experience">Your Background</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              >
                <option value="">Select your experience level</option>
                <option value="student">Student / Fresher</option>
                <option value="beginner">Beginner</option>
                <option value="working-professional">Working Professional</option>
                <option value="career-switcher">Career Switcher</option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="message">Additional Notes</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us the course you are interested in, preferred batch timing, or any question you have"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
              />
            </div>
          </div>

          <div className="enroll-footer">
            <p className="enroll-note">
              By continuing, you can proceed toward payment and enrollment support for your selected course.
            </p>
            <button type="submit" className="submit-btn">
              Continue to Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
