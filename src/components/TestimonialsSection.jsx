import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Ajay Kumar',
      role: 'Security Analyst',
      company: 'TechCorp India',
      testimonial: 'Neoskills CompTIA Security+ course was comprehensive and practical. The instructors were incredibly supportive, and I cleared the exam on my first attempt. Highly recommended!',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Priya Sharma',
      role: 'Project Manager',
      company: 'Digital Solutions LLC',
      testimonial: 'The Agile Scrum Master training transformed how I manage projects. The hands-on approach and real-world examples made learning engaging and immediately applicable.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Rahul Verma',
      role: 'CISA Certified Professional',
      company: 'Enterprise Security Ltd',
      testimonial: 'CISA certification through Neoskills was challenging but rewarding. The structured curriculum and expert guidance made the complex topics easy to understand.',
      rating: 5,
      image: '👨‍💻'
    },
    {
      name: 'Neha Singh',
      role: 'AI & Security Specialist',
      company: 'InnovateTech Inc',
      testimonial: 'The AI in Cybersecurity module opened new career opportunities for me. The instructors\' industry experience and current content made all the difference.',
      rating: 5,
      image: '👩‍🔬'
    },
    {
      name: 'Vikram Patel',
      role: 'IT Manager',
      company: 'Global Tech Solutions',
      testimonial: 'Neoskills provides world-class training with flexible schedules. I completed my CompTIA Core certification while managing my full-time job. Great support team!',
      rating: 5,
      image: '👨‍💼'
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative py-20 md:py-32 bg-light-gray overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from professionals who transformed their careers with Neoskills
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 border border-border-gray shadow-lg"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="fill-accent text-accent" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-lg text-gray-700 mb-8 italic leading-relaxed">
              "{testimonials[currentIndex].testimonial}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="text-4xl">{testimonials[currentIndex].image}</div>
              <div>
                <p className="font-bold text-dark text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-sm text-primary font-semibold">
                  {testimonials[currentIndex].role}
                </p>
                <p className="text-xs text-gray-500">
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white border border-border-gray hover:border-primary hover:shadow-lg transition-all"
            >
              <ChevronLeft size={24} className="text-primary" />
            </motion.button>

            {/* Indicators */}
            <div className="flex gap-2 justify-center flex-1 mx-4">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  animate={{
                    width: index === currentIndex ? 32 : 8,
                    backgroundColor: index === currentIndex ? '#0056D2' : '#e0e0e0',
                  }}
                  className="h-2 rounded-full transition-all"
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white border border-border-gray hover:border-primary hover:shadow-lg transition-all"
            >
              <ChevronRight size={24} className="text-primary" />
            </motion.button>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-3 gap-6 text-center"
          >
            <div className="bg-white rounded-xl p-6 border border-border-gray">
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-sm text-gray-600 mt-2">Happy Students</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border-gray">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-gray-600 mt-2">Success Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border-gray">
              <p className="text-3xl font-bold text-primary">4.8★</p>
              <p className="text-sm text-gray-600 mt-2">Average Rating</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
