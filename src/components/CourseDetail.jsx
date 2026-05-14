
import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'
import { allCourses, courseCategories } from './courseData'

const CourseDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { openEnroll } = useEnroll()
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)


  // Find course by slug
  const course = allCourses.find(c => c.slug === slug) || allCourses[0]
  const IconComponent = LucideIcons[course.icon] || LucideIcons.BookOpen
  const otherCourses = allCourses.filter(c => c.slug !== course.slug)
  const category = courseCategories.find(cat => cat.slug === course.categorySlug) || { name: course.category }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', contactForm)
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <LucideIcons.ArrowLeft size={20} />
            Back
          </button>
          <span className="text-xs text-gray-400">Category: {category.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
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
                  <p className="text-primary/90 text-lg mt-1">{course.summary}</p>
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
                <h2 className="text-2xl font-bold text-gray-800 mb-2">About this Program</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{course.description}</p>
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 text-primary">Course Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                        <LucideIcons.CheckCircle size={16} className="text-green-500" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 text-primary">Who Should Join?</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.whoShouldJoin.map((w, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                        <LucideIcons.User size={16} className="text-blue-500" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Certificate Preview */}
              <div className="w-full md:w-80 flex flex-col items-center justify-center">
                <img src={course.certificate.image} alt="Certificate" className="rounded-xl shadow-lg mb-4 w-full object-cover" />
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h4 className="font-bold text-gray-700 mb-1">{course.certificate.title}</h4>
                  <p className="text-xs text-gray-500">{course.certificate.description}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Syllabus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.BookOpen size={24} className="text-primary" />
                Syllabus
              </h3>
              <div className="grid gap-4">
                {course.syllabus.map((week, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">{week.week}</h4>
                    <ul className="list-disc ml-6 text-gray-700 text-sm">
                      {week.topics.map((topic, j) => (
                        <li key={j}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trainers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.GraduationCap size={24} className="text-purple-500" />
                Program Trainers
              </h3>
              <div className="grid gap-6">
                {course.trainers.map((trainer, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                    <img src={trainer.image} alt={trainer.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg">{trainer.name}</h4>
                      <p className="text-purple-600 font-medium">{trainer.role}</p>
                      <p className="text-gray-600 text-sm">{trainer.experience} experience</p>
                      <p className="text-gray-500 text-sm">{trainer.certifications}</p>
                      <p className="text-gray-500 text-xs mt-1">{trainer.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fee Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.DollarSign size={24} className="text-green-500" />
                Fee Details & Financing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Training Fee</p>
                  <p className="text-2xl font-bold text-primary">₹{course.feeDetails.training.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Exam Fee</p>
                  <p className="text-2xl font-bold text-primary">₹{course.feeDetails.exam.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">Total Investment</p>
                  <p className="text-3xl font-bold text-blue-600">₹{course.feeDetails.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-3">Financing Options</h4>
                <ul className="list-disc ml-6 text-gray-700 text-sm">
                  <li>{course.feeDetails.emi}</li>
                  <li>{course.feeDetails.refund}</li>
                  {course.feeDetails.includes.map((inc, i) => (
                    <li key={i}>{inc}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.Mail size={24} className="text-primary" />
                Get In Touch
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Have questions about this course? Contact our experts directly.
              </p>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <LucideIcons.CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-800 mb-2">Message Sent!</h4>
                  <p className="text-gray-600 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Tell us about your questions or requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3"
                  >
                    <LucideIcons.Send size={18} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <LucideIcons.Phone size={20} className="text-primary" />
                Quick Contact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <LucideIcons.Phone size={16} className="text-gray-500" />
                  <div>
                    <p className="font-medium">+91 8087020031</p>
                    <p className="text-gray-500">Mon-Fri 9AM-7PM IST</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <LucideIcons.Mail size={16} className="text-gray-500" />
                  <div>
                    <p className="font-medium">contact@neoskills.co.in</p>
                    <p className="text-gray-500">Response within 24hrs</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enroll CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-primary to-primary/90 rounded-xl shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-bold mb-2">Ready to Enroll?</h3>
              <p className="text-primary/90 mb-4 text-sm">
                Join {course.highlights.length}+ professionals who have transformed their careers.
              </p>
              <motion.button
                onClick={() => {
                  try {
                    localStorage.setItem('preferredCourse', course.title)
                  } catch (e) {}
                  openEnroll()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Enroll Now - ₹{course.feeDetails.total.toLocaleString()}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Other Courses Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Other Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCourses.map((oc) => {
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
                      <p className="text-xs text-gray-500">{oc.stats.level} &bull; {oc.stats.duration}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">{oc.summary}</p>
                  <span className="inline-block text-xs text-blue-600 font-semibold mt-auto">View Details &rarr;</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
