import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Award, Cloud, Users, BookOpen, Zap, Briefcase, BarChart3,
  TrendingUp, Code, Shield, Lightbulb, Cpu,
  IndianRupee, ArrowLeft, Check, ChevronDown, ChevronRight,
  Download, FileText, Clock, Mail, Phone, MapPin, MessageSquare,
  Send, ExternalLink, Calendar, GraduationCap, CheckCircle,
  User, Banknote
} from 'lucide-react'

const LucideIcons = {
  Award, Cloud, Users, BookOpen, Zap, Briefcase, BarChart3,
  TrendingUp, Code, Shield, Lightbulb, Cpu,
  IndianRupee, ArrowLeft, Check, ChevronDown, ChevronRight,
  Download, FileText, Clock, Mail, Phone, MapPin, MessageSquare,
  Send, ExternalLink, Calendar, GraduationCap, CheckCircle,
  User, Banknote,
}
import emailjs from '@emailjs/browser'
import { useEnroll } from '../context/EnrollContext'
import { allCourses, courseCategories, getAllResolvedCourses, getMergedCourseCategories, getTotal } from './courseData'
import { fetchBackendCourses, loadCourseBySlug } from '../data/courseService.js'

const CourseDetail = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [contactError, setContactError] = useState('')

  const { slug } = useParams()
  const navigate = useNavigate()
  const { openEnroll } = useEnroll()
  const [course, setCourse] = useState(null)
  const [otherCourses, setOtherCourses] = useState([])
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    fetchBackendCourses().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setOtherCourses(data.filter(c => c.slug !== slug))
      } else {
        setOtherCourses(getAllResolvedCourses().filter(c => c.slug !== slug))
      }
    }).catch(() => {
      setOtherCourses(getAllResolvedCourses().filter(c => c.slug !== slug))
    })
  }, [slug])

  useEffect(() => {
    setLoading(true)
    loadCourseBySlug(slug)
      .then((loadedCourse) => {
        if (loadedCourse) {
          setCourse(loadedCourse)
          setError(null)
        } else {
          setError('Course not found')
        }
      })
      .catch((err) => {
        console.error('Course load error', err)
        setCourse(allCourses.find((c) => c.slug === slug) || allCourses[0])
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Course page not available</h1>
          <p className="text-gray-600 mb-6">
            We do not have a dedicated detail page for this program yet. Contact us for the syllabus, batch schedule, and fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" onClick={() => navigate('/#contact')} className="btn-primary">
              Contact us
            </button>
            <button type="button" onClick={() => navigate('/#courses')} className="btn-outline">
              Browse all courses
            </button>
          </div>
        </div>
      </div>
    )
  }

  const IconComponent = LucideIcons[course.icon] || LucideIcons.BookOpen
  const category =
    getMergedCourseCategories().find((cat) => cat.slug === course.categorySlug) || {
      name: course.category,
    }

  const catalogAmount = getTotal(course)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactError('')
    const courseLabel = course.fullTitle || course.title

    emailjs
      .send(
        'service_62ub16q',
        'template_l3twvqg',
        {
          user_name: contactForm.name,
          user_email: contactForm.email,
          user_phone: contactForm.phone || 'N/A',
          course: courseLabel,
          message: `[Course page: /course/${course.slug}]\n\n${contactForm.message}`,
          domain: window.location.origin,
          source: 'NeoSkills Course Detail Page',
        },
        'S3TiyuUzfI2FRb5RG'
      )
      .then(() => {
        setFormSubmitted(true)
        setContactForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setFormSubmitted(false), 5000)
      })
      .catch((err) => {
        console.error('EmailJS error', err)
        setContactError('Could not send your message. Please email contact@neoskills.co.in or call +91 89569 63953.')
      })
  }

  const RupeeIcon = LucideIcons.IndianRupee || LucideIcons.Banknote

  const PRIMARY_CITY = 'Pune'
  const IT_CITIES = ['Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR', 'Kolkata']
  const citiesStr = IT_CITIES.slice(1).join(', ')

  const courseName = course.fullTitle || course.title
  const pageTitle = `${courseName} Certification Training in ${PRIMARY_CITY} | NeoSkills`
  const pageDesc = course.summary || `Get certified with ${courseName} training in ${PRIMARY_CITY}. We also offer this course in ${citiesStr}. Live instructor-led sessions, exam prep, and career support.`
  const pageUrl = `https://www.neoskills.co.in/course/${course.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${courseName} Certification Training in ${PRIMARY_CITY}`,
    description: pageDesc,
    provider: {
      '@type': 'Organization',
      name: 'NeoSkills Learning Solutions',
      sameAs: 'https://www.neoskills.co.in',
      address: {
        '@type': 'PostalAddress',
        addressLocality: PRIMARY_CITY,
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    contentLocation: {
      '@type': 'City',
      name: PRIMARY_CITY,
      address: {
        '@type': 'PostalAddress',
        addressLocality: PRIMARY_CITY,
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    areaServed: IT_CITIES.map(c => ({ '@type': 'City', name: c })),
    offers: {
      '@type': 'Offer',
      price: getTotal(course),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    educationalCredentialAwarded: course.certificate?.title || '',
    timeRequired: course.stats?.duration || '',
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors shrink-0"
          >
            <LucideIcons.ArrowLeft size={20} />
            Back
          </button>
          <div className="flex items-center gap-3 text-right">
            <span className="text-xs text-gray-500 hidden sm:inline">Category: {category.name}</span>
            <Link to="/" className="text-sm font-semibold text-primary hover:underline shrink-0">
              Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {course.learnMoreUrl && (
          <p className="text-sm text-gray-500 mb-4">
            Program overview aligned with our public page:{' '}
            <a href={course.learnMoreUrl} className="text-primary font-medium hover:underline" target="_blank" rel="noopener noreferrer">
              {course.learnMoreUrl.replace(/^https?:\/\//, '')}
            </a>
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <IconComponent size={40} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{course.fullTitle || course.title}</h1>
                  <p className="text-white/90 text-lg mt-1">{course.summary}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 md:ml-auto">
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.Clock size={16} className="inline mr-1" /> {course.stats.duration}
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.Calendar size={16} className="inline mr-1" /> Next: {course.stats.nextBatch}
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.Award size={16} className="inline mr-1" /> {course.stats.level}
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.Users size={16} className="inline mr-1" /> {course.stats.mode}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                <LucideIcons.BookOpen size={16} className="inline mr-1" /> {course.stats.hours}
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                <LucideIcons.GraduationCap size={16} className="inline mr-1" /> {course.stats.certificate}
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                <LucideIcons.TrendingUp size={16} className="inline mr-1" /> {course.stats.placement}
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">About this program</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{course.description}</p>
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 text-primary">Course highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <LucideIcons.CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 text-primary">Who should join</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.whoShouldJoin.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <LucideIcons.User size={16} className="text-blue-500 shrink-0 mt-0.5" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-80 flex flex-col items-center justify-center">
                <img
                  src={course.certificate.image}
                  alt=""
                  width="400"
                  height="224"
                  className="rounded-xl shadow-lg mb-4 w-full max-h-56 object-contain bg-gray-50 p-4 border border-gray-100"
                  loading="lazy"
                />
                <div className="bg-gray-50 rounded-lg p-4 text-center w-full">
                  <h4 className="font-bold text-gray-700 mb-1">{course.certificate.title}</h4>
                  <p className="text-xs text-gray-500">{course.certificate.description}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.BookOpen size={24} className="text-primary" />
                Curriculum
              </h3>
              <div className="grid gap-4">
                {course.syllabus.map((week, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">{week.week}</h4>
                    <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                      {week.topics.map((topic, j) => (
                        <li key={j}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.GraduationCap size={24} className="text-purple-500" />
                Program trainers
              </h3>
              <div className="grid gap-6">
                {course.trainers.map((trainer, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100"
                  >
                    <img
                      src={trainer.image}
                      alt=""
                      width="64"
                      height="64"
                      className="w-16 h-16 rounded-full object-contain border-2 border-primary bg-white p-1"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-lg">{trainer.name}</h4>
                      <p className="text-purple-600 font-medium text-sm">{trainer.role}</p>
                      <p className="text-gray-600 text-sm">{trainer.experience} experience</p>
                      <p className="text-gray-500 text-sm">{trainer.certifications}</p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{trainer.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <RupeeIcon size={24} className="text-green-600" />
                Fees & financing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Training fee</p>
                  <p className="text-2xl font-bold text-primary">₹{course.feeDetails.training.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Exam fee (estimate)</p>
                  <p className="text-2xl font-bold text-primary">
                    {course.feeDetails.exam > 0 ? `₹${course.feeDetails.exam.toLocaleString('en-IN')}` : 'Vendor actuals'}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">Amount due (catalog)</p>
                  <p className="text-3xl font-bold text-blue-600">₹{catalogAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
              {course.feeDisclaimer && (
                <p className="text-sm text-gray-600 mb-4 border-l-4 border-primary pl-3">{course.feeDisclaimer}</p>
              )}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-3">What is included</h4>
                <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                  <li>{course.feeDetails.emi}</li>
                  <li>{course.feeDetails.refund}</li>
                  {course.feeDetails.includes.map((inc, i) => (
                    <li key={i}>{inc}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.Mail size={24} className="text-primary" />
                Get in touch
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Questions about this program? Send a message—our team usually replies within one business day.
              </p>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <LucideIcons.CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">Message sent</h4>
                  <p className="text-gray-600 text-sm">Thank you. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {contactError && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{contactError}</p>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cd-name">
                      Full name *
                    </label>
                    <input
                      id="cd-name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cd-email">
                      Email *
                    </label>
                    <input
                      id="cd-email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cd-phone">
                      Phone
                    </label>
                    <input
                      id="cd-phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+91"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cd-msg">
                      Message *
                    </label>
                    <textarea
                      id="cd-msg"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Batch timing, corporate invoice, or syllabus questions…"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3"
                  >
                    <LucideIcons.Send size={18} />
                    Send message
                  </motion.button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.Phone size={20} className="text-primary" />
                Quick contact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <LucideIcons.Phone size={16} className="text-gray-500 shrink-0" />
                  <div>
                    <p className="font-medium">+91 89569 63953</p>
                    <p className="text-gray-500">Mon–Fri, 9am–7pm IST</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <LucideIcons.Mail size={16} className="text-gray-500 shrink-0" />
                  <div>
                    <p className="font-medium">contact@neoskills.co.in</p>
                    <p className="text-gray-500">We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-primary to-primary/90 rounded-xl shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-2">Ready to enroll?</h3>
              <p className="text-white/90 mb-4 text-sm leading-relaxed">
                Continue to secure your seat. You will confirm details and complete payment on the next steps.
              </p>
              {catalogAmount > 0 ? (
                <motion.button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.setItem('preferredCourse', course.title)
                    } catch (e) {
                      /* ignore */
                    }
                    openEnroll({
                      course: course.fullTitle || course.title,
                      baseAmount: catalogAmount,
                    })
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Enroll — ₹{catalogAmount.toLocaleString('en-IN')} (+ GST at checkout)
                </motion.button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/#contact')}
                  className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Request pricing and batch schedule
                </button>
              )}
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Other programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCourses.slice(0, 9).map((oc) => {
              const OCIcon = LucideIcons[oc.icon] || LucideIcons.BookOpen
              return (
                <Link
                  to={`/course/${oc.slug}`}
                  key={oc.slug}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3 hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <OCIcon size={28} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary mb-1">{oc.title}</h4>
                      <p className="text-xs text-gray-500">
                        {oc.stats.level} · {oc.stats.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">{oc.summary}</p>
                  <span className="inline-block text-xs text-blue-600 font-semibold mt-auto">View details →</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CourseDetail
