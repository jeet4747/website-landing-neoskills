import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useEnroll } from '../context/EnrollContext'
import { getAllResolvedCourses, effectiveListedPrice, getTotal } from '../data/catalogBuilder'
import { fetchBackendCourses } from '../data/courseService'
import emailjs from '@emailjs/browser'
import { ArrowRight, IndianRupee } from 'lucide-react'
import './enroll.css'

function buildOptionsAndPrices(courses) {
  const options = []
  const prices = {}
  for (const c of courses) {
    if (!c.title) continue
    const price = getTotal(c) || effectiveListedPrice(c) || 0
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

  const [allCourses, setAllCourses] = useState(() => getAllResolvedCourses())

  useEffect(() => {
    fetchBackendCourses().then(data => {
      if (data && data.length > 0) setAllCourses(data)
    })
  }, [])

  const { options: courseOptions, prices: priceMap } = useMemo(() => buildOptionsAndPrices(allCourses), [allCourses])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    experience: '',
    message: '',
  })

  const [submitting, setSubmitting] = useState(false)

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
    const bySlug = options.find(o => o.value === text)
    if (bySlug) return bySlug.value
    const byLabel = options.find(o => o.label.toLowerCase().includes(text))
    if (byLabel) return byLabel.value
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
    setSubmitting(true)

    emailjs.sendForm(
      'service_62ub16q',
      'template_e15u3k6',
      form.current,
      'S3TiyuUzfI2FRb5RG'
    ).then(() => {
      /* email sent */
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
      source: location.state?.source || 'enroll',
    }

    openPayment(paymentPayload)
    setSubmitting(false)
  }

  const selectedPrice = formData.course ? (priceMap[formData.course] || 0) : 0

  return (
    <div className="enroll-page">
      <div className="enroll-header-bar">
        <div className="enroll-header-inner">
          <Link to="/">Home</Link>
          <span className="text-sm text-gray-400">Enrollment</span>
        </div>
      </div>

      <div className="enroll-form-wrap">
        <div className="enroll-card">
          <h1>Enroll Now</h1>
          <p className="subtitle">Fill in your details below to proceed to payment. We'll confirm your batch within 24 hours.</p>

          <form className="enroll-form" onSubmit={handleSubmit} ref={form}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input id="name" type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="course">Select Course</label>
                <select id="course" name="course" value={formData.course} onChange={handleInputChange} required>
                  <option value="">Choose a course</option>
                  {courseOptions.map((course) => (
                    <option key={course.value} value={course.value}>{course.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="experience">Experience Level</label>
                <select id="experience" name="experience" value={formData.experience} onChange={handleInputChange}>
                  <option value="">Select your level</option>
                  <option value="student">Student / Fresher</option>
                  <option value="beginner">Beginner</option>
                  <option value="working-professional">Working Professional</option>
                  <option value="career-switcher">Career Switcher</option>
                </select>
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="message">Additional Notes</label>
                <textarea id="message" name="message" placeholder="Preferred batch timing, questions about the course, or special requirements" value={formData.message} onChange={handleInputChange} rows={3} />
              </div>
            </div>

            <div className={`price-row ${selectedPrice > 0 ? 'visible' : ''}`}>
              <span className="label">Course Fee</span>
              <span className="amount">
                <IndianRupee size={18} className="inline" />
                {selectedPrice.toLocaleString('en-IN')}
                <small> + GST</small>
              </span>
            </div>

            <div className="form-footer">
              <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                <span>I Authorize Event Update to send Notification via SMS/RCS/CALL/Email/Whatsapp.</span>
              </label>
              <p>By submitting, you agree to our enrollment terms. A confirmation will be sent to your email after payment.</p>
              <button type="submit" disabled={submitting} className="submit-btn">
                {submitting ? 'Processing...' : (
                  <span className="flex items-center justify-center gap-2">
                    Continue to Payment <ArrowRight size={18} />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
