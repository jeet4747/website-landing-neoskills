import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

const ContactForm = () => {
  const { openEnroll } = useEnroll()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const courses = [
    'CompTIA Security+',
    'CISA',
    'CISM',
    'CompTIA Core',
    'AI in Cybersecurity',
    'Agile Scrum Master',
    'PMP Certification',
    'ITIL Foundation'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', phone: '', course: '', message: '' })
  }

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Talk to Our Learning Advisor
          </h2>
          <p className="text-lg text-gray-600">
            Get personalized guidance on choosing the right course for your career goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Course Interested In
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">Select a course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-border-gray focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Tell us about your career goals..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary py-3 font-semibold"
              >
                {submitted ? 'Request Submitted!' : 'Request a Callback'}
              </motion.button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-primary font-semibold"
                >
                  ✓ Our advisor will contact you soon!
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10"
            >
              <div className="flex gap-4 items-start">
                <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-dark mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm">India</p>
                  <a href="tel:+918087020031" className="text-primary font-semibold hover:underline">
                    +91 8087020031
                  </a>
                  <p className="text-gray-600 text-sm mt-2">India</p>
                  <a href="tel:+13073875278" className="text-primary font-semibold hover:underline">
                    +91 9975214585
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10"
            >
              <div className="flex gap-4 items-start">
                <Mail className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-dark mb-2">Email</h3>
                  <a href="mailto:contact@neoskills.co.in" className="text-primary font-semibold hover:underline">
                    contact@neoskills.co.in
                  </a>
                  <p className="text-gray-600 text-sm mt-2">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10"
            >
              <div className="flex gap-4 items-start">
                <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-dark mb-2">Support Hours</h3>
                  <p className="text-gray-600 text-sm">Monday - Saturday</p>
                  <p className="text-primary font-semibold">9:00 AM - 7:00 PM IST</p>
                  <p className="text-gray-600 text-sm mt-2">Saturday - Sunday</p>
                  <p className="text-primary font-semibold">10:00 AM - 3s:00 PM IST</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 86, 210, 0.15)' }}
              className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl p-8 border border-primary/20 text-center"
            >
              <h3 className="text-2xl font-bold mb-3">Limited Time Offer</h3>
              <p className="text-white/90 mb-4">
                Register now and get 20% off on your first course
              </p>
              <button onClick={openEnroll} className="bg-white text-primary font-bold px-6 py-2 rounded-lg hover:bg-accent transition-colors">
                Claim Offer
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
