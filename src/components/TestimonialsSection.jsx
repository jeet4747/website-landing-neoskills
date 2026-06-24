import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const avatarColors = ['#0056D2', '#0D9488', '#7C3AED', '#DC2626', '#EA580C', '#0891B2', '#D946EF', '#16A34A']

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Rohit Deshmukh',
      role: 'Project Manager',
      company: 'Infosys',
      testimonial: 'The PMP training at Neoskills was exceptional. The trainer had deep industry knowledge and the mock exams closely mirrored the actual test. Cleared PMP on first attempt with Above Target in all domains.',
      rating: 5,
    },
    {
      name: 'Ananya Sharma',
      role: 'Cloud Engineer',
      company: 'Amazon',
      testimonial: 'I took the AWS Solutions Architect course and it was worth every rupee. The hands-on labs, real-world scenarios, and exam-focused approach helped me get certified in just 5 weeks. The batch timings were flexible too.',
      rating: 5,
    },
    {
      name: 'Suresh Iyer',
      role: 'Scrum Master',
      company: 'TCS',
      testimonial: 'Neoskills CSM program is top-notch. The instructor made complex Scrum concepts easy to understand with practical examples from their own industry experience. Our entire team of 12 trained here and all passed.',
      rating: 5,
    },
    {
      name: 'Priya Kulkarni',
      role: 'IT Service Manager',
      company: 'Wipro',
      testimonial: 'ITIL 4 Foundation training was well-structured and engaging. The study materials were comprehensive and the trainer ensured every concept was crystal clear. Received my certificate within a week of the exam.',
      rating: 5,
    },
    {
      name: 'Amit Joshi',
      role: 'DevOps Lead',
      company: 'Microsoft',
      testimonial: 'The DevOps Tools & Training program at Neoskills gave me practical exposure to Jenkins, Docker, Kubernetes, and CI/CD pipelines. The project-based learning approach helped me immediately apply skills at work.',
      rating: 5,
    },
    {
      name: 'Divya Nair',
      role: 'Information Security Analyst',
      company: 'Deloitte',
      testimonial: 'CISA certification was intense but Neoskills made it manageable. The study plan, practice questions, and one-on-one doubt sessions were invaluable. Proud to say I scored above 650 on my first attempt!',
      rating: 5,
    },
    {
      name: 'Vijay Pawar',
      role: 'Business Analyst',
      company: 'Accenture',
      testimonial: 'Completed Six Sigma Green Belt training with Neoskills. The trainers brought real manufacturing and IT case studies which made the statistical concepts practical and easy to grasp. Highly recommend their corporate training.',
      rating: 5,
    },
    {
      name: 'Sneha Patil',
      role: 'Azure Administrator',
      company: 'Cognizant',
      testimonial: 'Microsoft Azure AZ-104 training was incredibly detailed. The trainer had hands-on experience with Azure deployments and shared tips that aren\'t in the official docs. Lab sessions were the highlight. Got certified in 4 weeks!',
      rating: 5,
    },
  ]

  const t = testimonials[currentIndex]
  const initial = t.name.charAt(0).toUpperCase()
  const color = avatarColors[currentIndex % avatarColors.length]

  return (
    <section className="relative py-20 md:py-32 bg-light-gray overflow-hidden">
      <div className="container mx-auto px-4">
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
            Real reviews from professionals certified through Neoskills
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-5">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              "{t.testimonial}"
            </p>

            {/* Avatar + Name + Google badge */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
                style={{ backgroundColor: color }}
              >
                {initial}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span className="text-[11px] text-gray-400 font-medium">Google</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button onClick={() => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-primary hover:shadow transition-all">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
                  }`} />
              ))}
            </div>

            <button onClick={() => setCurrentIndex((p) => (p + 1) % testimonials.length)}
              className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-primary hover:shadow transition-all">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-3 gap-6 text-center"
          >
            <a
              href="https://www.google.com/search?q=Neoskills+Learning+Solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl py-6 px-4 border border-gray-200 shadow-sm hover:border-primary/30 hover:shadow-md transition-all block"
            >
              <p className="text-3xl font-bold text-primary">4.7★</p>
              <p className="text-sm text-gray-500 mt-1">Google Rating</p>
              <p className="text-xs text-primary font-semibold mt-0.5">2,500+ reviews →</p>
            </a>
            <div className="bg-white rounded-xl py-6 px-4 border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-gray-500 mt-1">Success Rate</p>
            </div>
            <div className="bg-white rounded-xl py-6 px-4 border border-gray-200 shadow-sm">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-gray-500 mt-1">Success Rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
