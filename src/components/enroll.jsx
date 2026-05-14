import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEnroll } from '../context/EnrollContext'
import emailjs from '@emailjs/browser'
import './enroll.css'

const courseOptions = [
  { value: 'pmp', label: 'PMP' },
  { value: 'scrum-master', label: 'Scrum Master / Agile Certifications' },
  { value: 'aws', label: 'AWS Training' },
  { value: 'azure', label: 'Azure Cloud' },
  { value: 'devops', label: 'DevOps Tools & Training' },
  { value: 'power-bi', label: 'Power BI' },
  { value: 'itil', label: 'ITIL FND' },
  { value: 'cisa', label: 'CISA' },
  { value: 'cbap', label: 'CBAP Training & Certification' },
  { value: 'togaf', label: 'TOGAF Level 1 & Level 2' },
  { value: 'prince2', label: 'Prince 2 F & P' },
  { value: 'ai-project-management', label: 'CPMAI & AI Project Management' },
  { value: 'other', label: 'Other / Need Guidance' },
]

const priceMap = {
  pmp: 4999,
  'scrum-master': 3999,
  aws: 4499,
  azure: 4499,
  devops: 4999,
  'power-bi': 3499,
  itil: 2999,
  cisa: 5499,
  cbap: 4999,
  togaf: 3999,
  prince2: 4499,
  'ai-project-management': 4999,
  other: 2999,
}

export default function Enroll() {
  const { openPayment } = useEnroll()
  const navigate = useNavigate()
  const location = useLocation()
  const form = useRef()  // ✅ Change 2

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
        try {
          return localStorage.getItem('preferredCourse')
        } catch {
          return null
        }
      })()

    if (preferredCourse) {
      setFormData((prev) => ({
        ...prev,
        course: mapCourseToValue(preferredCourse),
      }))
    }
  }, [location.state])

  const mapCourseToValue = (courseName) => {
    const text = (courseName || '').toLowerCase()
    if (text.includes('pmp')) return 'pmp'
    if (text.includes('scrum') || text.includes('agile') || text.includes('psm') || text.includes('csm')) return 'scrum-master'
    if (text.includes('aws')) return 'aws'
    if (text.includes('azure')) return 'azure'
    if (text.includes('devops')) return 'devops'
    if (text.includes('power bi')) return 'power-bi'
    if (text.includes('itil')) return 'itil'
    if (text.includes('cisa')) return 'cisa'
    if (text.includes('cbap')) return 'cbap'
    if (text.includes('togaf')) return 'togaf'
    if (text.includes('prince')) return 'prince2'
    if (text.includes('ai project') || text.includes('cpmai')) return 'ai-project-management'
    return 'other'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // ✅ Change 3 - EmailJS send
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

    const baseAmount = preferNavAmount ? stateAmt : priceMap[formData.course] || 2999

    const paymentPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: selectedCourseLabel,
      experience: formData.experience,
      message: formData.message,
      baseAmount,
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      experience: '',
      message: '',
    })

    openPayment(paymentPayload)
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

        {/* ✅ Change 4 - ref={form} added */}
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