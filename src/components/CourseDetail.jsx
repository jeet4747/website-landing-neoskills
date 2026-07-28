import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award, Cloud, Users, BookOpen, Zap, Briefcase, BarChart3,
  TrendingUp, Code, Shield, Lightbulb, Cpu,
  IndianRupee, ArrowLeft, Check, ChevronDown, ChevronRight,
  Download, FileText, Clock, Mail, Phone, MapPin, MessageSquare,
  Send, ExternalLink, Calendar, GraduationCap, CheckCircle,
  User, Banknote, X
} from 'lucide-react'

const LucideIcons = {
  Award, Cloud, Users, BookOpen, Zap, Briefcase, BarChart3,
  TrendingUp, Code, Shield, Lightbulb, Cpu,
  IndianRupee, ArrowLeft, Check, ChevronDown, ChevronRight,
  Download, FileText, Clock, Mail, Phone, MapPin, MessageSquare,
  Send, ExternalLink, Calendar, GraduationCap, CheckCircle,
  User, Banknote, X,
}
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE_GENERAL, EMAILJS_PUBLIC_KEY } from '../config/emailjs'
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
  const [showEnrollmentToast, setShowEnrollmentToast] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)
  const [brochureOpen, setBrochureOpen] = useState(false)
  const [brochureForm, setBrochureForm] = useState({ name: '', email: '', phone: '' })
  const [brochureSent, setBrochureSent] = useState(false)
  const [brochureError, setBrochureError] = useState('')

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

  useEffect(() => {
    if (course?.enrollmentCount > 0) {
      const timer = setTimeout(() => setShowEnrollmentToast(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [course])

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
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE_GENERAL,
        {
          user_name: contactForm.name,
          user_email: contactForm.email,
          user_phone: contactForm.phone || 'N/A',
          course: courseLabel,
          message: contactForm.message || `Inquiry about ${courseLabel}`,
        },
        EMAILJS_PUBLIC_KEY
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
                  <LucideIcons.Clock size={16} className="inline mr-1" /> {course.stats?.duration}
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.Calendar size={16} className="inline mr-1" /> Next: {course.stats?.nextBatch}
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.Award size={16} className="inline mr-1" /> {course.stats?.level}
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.Users size={16} className="inline mr-1" /> {course.stats?.mode}
                </div>
              </div>
            </div>
              {course.stats && (course.stats.hours || course.stats.certificate || course.stats.placement) && (
              <div className="flex flex-wrap gap-4 mt-4">
                {course.stats.hours && (
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.BookOpen size={16} className="inline mr-1" /> {course.stats.hours}
                </div>
                )}
                {course.stats.certificate && (
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.GraduationCap size={16} className="inline mr-1" /> {course.stats.certificate}
                </div>
                )}
                {course.stats.placement && (
                <div className="bg-white/20 rounded-lg px-4 py-2 text-sm">
                  <LucideIcons.TrendingUp size={16} className="inline mr-1" /> {course.stats.placement}
                </div>
                )}
              </div>
              )}
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
                  src={course.certificate?.image || '/images/nsl-logo.svg'}
                  alt=""
                  width="400"
                  height="224"
                  className="rounded-xl shadow-lg mb-4 w-full max-h-56 object-contain bg-gray-50 p-4 border border-gray-100"
                  loading="lazy"
                />
                <div className="bg-gray-50 rounded-lg p-4 text-center w-full">
                  <h4 className="font-bold text-gray-700 mb-1">{course.certificate?.title || 'Certificate'}</h4>
                  <p className="text-xs text-gray-500">{course.certificate?.description || 'Official certificates or digital badges are issued by the accrediting vendor when you meet their exam and eligibility rules. NeoSkills training focuses on readiness and applied skills.'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
            <LucideIcons.Award size={24} className="text-primary" />
            Why this course
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: GraduationCap, title: 'Accredited curriculum', desc: 'Aligned with latest exam objectives and industry standards for globally recognised certifications.' },
              { icon: Users, title: 'Expert instructors', desc: 'Learn from certified professionals with 10+ years of real-world industry experience.' },
              { icon: BookOpen, title: 'Flexible learning', desc: 'Live online instructor-led sessions with recordings and materials accessible on demand.' },
              { icon: Briefcase, title: 'Career support', desc: 'Resume guidance, interview prep, and placement assistance to help you land your next role.' },
              { icon: Clock, title: 'Lifetime access', desc: 'Course materials, updates, and recordings remain available per batch policy.' },
              { icon: Shield, title: 'Money-back guarantee', desc: 'Risk-free enrollment with transparent refund and transfer policy.' },
            ].map((item, i) => {
              const FeatureIcon = item.icon
              return (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FeatureIcon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
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
                {(course.trainers && course.trainers.length > 0 ? course.trainers : [{
                  name: 'Expert Instructor',
                  role: 'Lead Instructor',
                  experience: '10+ years',
                  certifications: 'Industry certifications aligned to this track',
                  bio: 'Certified professional with extensive industry experience in this domain.',
                  image: '/images/nsl-logo.svg',
                }]).map((trainer, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100"
                  >
                    <img
                      src={trainer.image || '/images/nsl-logo.svg'}
                      alt=""
                      width="64"
                      height="64"
                      className="w-16 h-16 rounded-full object-contain border-2 border-primary bg-white p-1"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-lg">{trainer.name || 'Expert Instructor'}</h4>
                      <p className="text-purple-600 font-medium text-sm">{trainer.role || 'Lead Instructor'}</p>
                      {trainer.experience && <p className="text-gray-600 text-sm">{trainer.experience} experience</p>}
                      {trainer.certifications && <p className="text-gray-500 text-sm">{trainer.certifications}</p>}
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{trainer.bio || ''}</p>
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
                Fees & Financing
              </h3>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 mb-6">
                <p className="text-sm text-blue-600 font-medium mb-1">Total program fee</p>
                <p className="text-4xl font-bold text-blue-600">₹{catalogAmount.toLocaleString('en-IN')}</p>
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-600 flex-wrap">
                  <span>Training & Certification: ₹{catalogAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
              {course.feeDisclaimer && (
                <p className="text-xs text-gray-500 mb-4 italic">*{course.feeDisclaimer}</p>
              )}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-3">What is included</h4>
                <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                  {(course.feeDetails?.includes || course.feeDetails?.emi || course.feeDetails?.refund
                    ? [
                        ...(course.feeDetails?.includes || []),
                        ...(course.feeDetails?.emi ? [course.feeDetails.emi] : ['EMI or installment options may be available — ask admissions']),
                        ...(course.feeDetails?.refund ? [course.feeDetails.refund] : ['Refund and transfer policy as per NeoSkills enrollment terms']),
                      ]
                    : [
                        'Live training and mentor support',
                        'Practice materials and assignments (where applicable)',
                        'Batch coordination and learner success check-ins',
                        'EMI or installment options may be available — ask admissions',
                        'Refund and transfer policy as per NeoSkills enrollment terms',
                      ]
                  ).map((inc, i) => (
                    <li key={i}>{inc}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Urgency — Limited Seats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6"
            >
              <div className="flex items-start gap-3 mb-5">
                <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Clock size={22} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-800">Limited seats — Next batch starting soon</h3>
                  <p className="text-amber-700 text-sm mt-0.5">
                    Demand is high and cohorts fill quickly. Secure your spot before registration closes.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { value: '10,000+', label: 'Professionals trained', icon: Users },
                  { value: '4.7★', label: 'Google rating', icon: TrendingUp },
                  { value: '95%', label: 'Exam success rate', icon: Shield },
                ].map((stat, i) => {
                  const StatIcon = stat.icon
                  return (
                    <div key={i} className="bg-white/70 backdrop-blur rounded-lg p-3 text-center border border-amber-100">
                      <StatIcon size={18} className="text-amber-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-amber-900">{stat.value}</p>
                      <p className="text-xs text-amber-700">{stat.label}</p>
                    </div>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  try { localStorage.setItem('preferredCourse', course.title) } catch (e) { /* ignore */ }
                  openEnroll({
                    course: course.fullTitle || course.title,
                    baseAmount: catalogAmount,
                  })
                }}
                className="w-full bg-amber-600 text-white font-bold py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                <Zap size={18} />
                Reserve Your Seat
              </button>
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
                      Phone *
                    </label>
                    <input
                      id="cd-phone"
                      type="tel"
                      required
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

                  <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                    <span>I Authorize NEOSKILLS to send Notification via SMS/RCS/CALL/Email/Whatsapp.</span>
                  </label>

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

            {course.enrollmentCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <LucideIcons.Users size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{course.enrollmentCount}</p>
                  <p className="text-sm text-gray-600">people have enrolled in this batch</p>
                </div>
              </div>
            </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.67 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <LucideIcons.FileText size={20} className="text-primary" />
                Course brochure
              </h3>
              <p className="text-sm text-gray-500 mb-4">Get the detailed syllabus, batch schedule, and fee breakdown delivered to your inbox.</p>
              <button
                type="button"
                onClick={() => { setBrochureOpen(true); setBrochureSent(false); setBrochureError('') }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary/20 transition-all text-sm"
              >
                <LucideIcons.Download size={16} />
                Download Brochure
              </button>
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

            {course.examBody && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <LucideIcons.Award size={20} className="text-primary" />
                Official certification body
              </h3>
              <p className="text-sm font-semibold text-gray-800">{course.examBody}</p>
              {course.examBodyUrl && course.examBody !== 'NeoSkills' && (
                <a
                  href={course.examBodyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline mt-0.5"
                >
                  Visit website &rarr;
                </a>
              )}
              {course.certValidity && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Validity</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{course.certValidity}</p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                {course.examBody === 'NeoSkills'
                  ? 'NeoSkills issues a course completion certificate recognised by industry partners. Certification details are shared at enrollment.'
                  : 'The official certification is issued and administered by the body listed above. NeoSkills training focuses on skill building and exam readiness.'}
              </p>
            </motion.div>
            )}

            {(course.careerOpportunities || []).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <LucideIcons.TrendingUp size={20} className="text-primary" />
                Roles you can pursue
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.careerOpportunities.map((role, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-700 font-medium px-3 py-1.5 rounded-full border border-blue-100">
                    {role}
                  </span>
                ))}
              </div>
            </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.79 }}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
            >
              <a
                href="https://www.google.com/search?q=Neoskills+Learning+Solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Google Reviews</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="text-yellow-400 text-sm">★</span>
                    ))}
                    <span className="text-sm font-bold text-gray-800 ml-1.5">4.7</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Based on 2,500+ reviews</p>
                </div>
                <LucideIcons.ExternalLink size={16} className="text-primary shrink-0" />
              </a>
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
                  Enroll — ₹{catalogAmount.toLocaleString('en-IN')} (+18% GST)
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Frequently asked questions</h2>
          <p className="text-gray-600 mb-8">Everything you need to know before enrolling.</p>
          <div className="space-y-3 max-w-3xl">
            {((() => {
              const perCourse = {
                'professional-scrum-with-kanban-psk': [
                  { q: 'What is the difference between PSK I and other Scrum certifications?', a: 'PSK I focuses on combining Scrum with Kanban practices, flow metrics, and managing work-in-progress. Unlike CSM or PSM which cover Scrum fundamentals, PSK I teaches you how to visualize workflow, limit WIP, and optimize flow within a Scrum framework.' },
                  { q: 'Do I need prior Scrum experience to take PSK I?', a: 'Yes, it is recommended that you have at least 6 months of Scrum experience or hold a PSM I / CSM certification. PSK I is an advanced certification that builds on existing Scrum knowledge.' },
                  { q: 'How does Kanban complement Scrum in the PSK I course?', a: 'Kanban provides visual workflow management techniques that enhance Scrum by making work items visible, limiting WIP to reduce context switching, and using flow metrics (cycle time, throughput) to predict delivery and identify bottlenecks.' },
                  { q: 'What is the exam format for PSK I?', a: 'The PSK I assessment is a 60-minute, 40-question multiple-choice exam administered by Scrum.org. You need at least 85% to pass. The exam tests your understanding of how to apply Kanban within a Scrum context.' },
                  { q: 'How long is the PSK I certification valid?', a: 'The Professional Scrum with Kanban (PSK I) certification from Scrum.org is a lifetime certification — it does not expire and does not require renewal.' },
                ],
              }
              const slug = (course.slug || '').toLowerCase()
              return perCourse[slug] || [
                { q: 'What certification will I receive?', a: 'You will receive a course completion certificate from NeoSkills. If the program is tied to an official certification (e.g. PMP, AWS, CSM), we also prepare you for the governing body\'s exam — the official certificate is issued directly by that body.' },
                { q: 'Are classes live or recorded?', a: 'All sessions are instructor-led and conducted live online. Recordings and materials are shared after each class for self-paced revision.' },
                { q: 'What is the refund policy?', a: 'You can request a full refund within 7 days of enrollment if no sessions have been attended. After the first session, a partial refund or batch transfer option applies. T&C details are shared at checkout.' },
                { q: 'Do you offer corporate or group training?', a: 'Yes, we offer tailored corporate training programs with volume pricing. Contact us via the form or call +91 89569 63953 for a custom quote.' },
                { q: 'Is placement assistance included?', a: 'Most certification and upskilling programs include resume review, mock interviews, and job referrals. Specific details vary by program and are shared during onboarding.' },
              ]
            })()).map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-sm">{item.q}</span>
                  <LucideIcons.ChevronDown
                    size={18}
                    className={`text-gray-500 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

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
                        {oc.stats?.level || ''}{oc.stats?.level && oc.stats?.duration ? ' · ' : ''}{oc.stats?.duration || ''}
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

    {/* Brochure Modal */}
    <AnimatePresence>
      {brochureOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setBrochureOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
          >
            <button
              type="button"
              onClick={() => setBrochureOpen(false)}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LucideIcons.X size={20} />
            </button>

            {brochureSent ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <LucideIcons.CheckCircle size={28} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Brochure sent!</h3>
                <p className="text-sm text-gray-500">Check your inbox — we have emailed the brochure for <strong>{course.title}</strong>.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <LucideIcons.FileText size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Download Brochure</h3>
                    <p className="text-sm text-gray-500">{course.title}</p>
                  </div>
                </div>
                {brochureError && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm mb-4">{brochureError}</div>}
                <form onSubmit={(e) => {
                  e.preventDefault()
                  setBrochureError('')
                  emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_GENERAL, {
                    user_name: brochureForm.name,
                    user_email: brochureForm.email,
                    user_phone: brochureForm.phone,
                    course: `${course.title} — Brochure Request`,
                    message: `Please share the brochure for ${course.title}`,
                  }, EMAILJS_PUBLIC_KEY)
                    .then(() => setBrochureSent(true))
                    .catch(() => setBrochureError('Could not send. Please email contact@neoskills.co.in.'))
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your name *</label>
                    <input type="text" required value={brochureForm.name} onChange={(e) => setBrochureForm({...brochureForm, name: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Rajesh" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
                    <input type="email" required value={brochureForm.email} onChange={(e) => setBrochureForm({...brochureForm, email: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="rajesh@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" required value={brochureForm.phone} onChange={(e) => setBrochureForm({...brochureForm, phone: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="+91" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition-all text-sm">
                    <LucideIcons.Download size={16} />
                    Send Brochure
                  </button>
                  <p className="text-xs text-gray-400 text-center">We will email you the PDF. No spam, ever.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {course.enrollmentCount > 0 && showEnrollmentToast && (
      <motion.div
        initial={{ opacity: 0, y: 40, x: 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-6 right-6 z-50 max-w-xs"
      >
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
            <LucideIcons.Users size={16} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">{course.enrollmentCount} people have enrolled</p>
            <p className="text-xs text-gray-500 mt-0.5">in this program</p>
          </div>
          <button
            type="button"
            onClick={() => setShowEnrollmentToast(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 mt-0.5"
            aria-label="Dismiss"
          >
            <LucideIcons.X size={16} />
          </button>
        </div>
      </motion.div>
    )}
    </>
  )
}

export default CourseDetail
