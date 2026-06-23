import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Rohit Deshmukh',
      role: 'Project Manager',
      company: 'Infosys',
      testimonial: 'The PMP training at Neoskills was exceptional. The trainer had deep industry knowledge and the mock exams closely mirrored the actual test. Cleared PMP on first attempt with Above Target in all domains.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Ananya Sharma',
      role: 'Cloud Engineer',
      company: 'Amazon',
      testimonial: 'I took the AWS Solutions Architect course and it was worth every rupee. The hands-on labs, real-world scenarios, and exam-focused approach helped me get certified in just 5 weeks. The batch timings were flexible too.',
      rating: 5,
      image: '👩‍💻'
    },
    {
      name: 'Suresh Iyer',
      role: 'Scrum Master',
      company: 'TCS',
      testimonial: 'Neoskills CSM program is top-notch. The instructor made complex Scrum concepts easy to understand with practical examples from their own industry experience. Our entire team of 12 trained here and all passed.',
      rating: 5,
      image: '👨‍🏫'
    },
    {
      name: 'Priya Kulkarni',
      role: 'IT Service Manager',
      company: 'Wipro',
      testimonial: 'ITIL 4 Foundation training was well-structured and engaging. The study materials were comprehensive and the trainer ensured every concept was crystal clear. Received my certificate within a week of the exam.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Amit Joshi',
      role: 'DevOps Lead',
      company: 'Microsoft',
      testimonial: 'The DevOps Tools & Training program at Neoskills gave me practical exposure to Jenkins, Docker, Kubernetes, and CI/CD pipelines. The project-based learning approach helped me immediately apply skills at work.',
      rating: 5,
      image: '👨‍🔧'
    },
    {
      name: 'Divya Nair',
      role: 'Information Security Analyst',
      company: 'Deloitte',
      testimonial: 'CISA certification was intense but Neoskills made it manageable. The study plan, practice questions, and one-on-one doubt sessions were invaluable. Proud to say I scored above 650 on my first attempt!',
      rating: 5,
      image: '👩‍🔬'
    },
    {
      name: 'Vijay Pawar',
      role: 'Business Analyst',
      company: 'Accenture',
      testimonial: 'Completed Six Sigma Green Belt training with Neoskills. The trainers brought real manufacturing and IT case studies which made the statistical concepts practical and easy to grasp. Highly recommend their corporate training.',
      rating: 5,
      image: '👨‍💻'
    },
    {
      name: 'Sneha Patil',
      role: 'Azure Administrator',
      company: 'Cognizant',
      testimonial: 'Microsoft Azure AZ-104 training was incredibly detailed. The trainer had hands-on experience with Azure deployments and shared tips that aren\'t in the official docs. Lab sessions were the highlight. Got certified in 4 weeks!',
      rating: 5,
      image: '👩‍💻'
    },
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
            Student Voices
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
              <p className="text-3xl font-bold text-primary">4.9★</p>
              <p className="text-sm text-gray-600 mt-2">Google Rating</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border-gray">
              <p className="text-3xl font-bold text-primary">728</p>
              <p className="text-sm text-gray-600 mt-2">Google Reviews</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border-gray">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-gray-600 mt-2">Success Rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
