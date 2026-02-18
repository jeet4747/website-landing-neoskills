import React from 'react'
import { motion } from 'framer-motion'
import { useEnroll } from '../context/EnrollContext'
import { Users, Clock, CheckCircle, Award, Zap, BarChart3 } from 'lucide-react'

const WhyChooseUs = () => {
  const { openEnroll } = useEnroll()
  const differentiators = [
    {
      icon: Users,
      title: 'Virtual Classroom',
      description: 'Interactive live sessions with experienced instructors, Q&A, and real-time feedback'
    },
    {
      icon: Clock,
      title: 'Flexible Learning Modes',
      description: 'Choose from live classes, self-paced, or hybrid options that fit your schedule'
    },
    {
      icon: CheckCircle,
      title: 'Guaranteed Batch Runs',
      description: 'Regular batches throughout the year, ensuring you never miss enrollment deadlines'
    },
    {
      icon: Award,
      title: 'Experienced Instructors',
      description: 'Learn from industry experts with 10+ years of experience in their domains'
    },
    {
      icon: Zap,
      title: 'Exam Prep Support',
      description: 'Comprehensive mock exams, study materials, and guidance for certification success'
    },
    {
      icon: BarChart3,
      title: 'Post-Training Assistance',
      description: 'Career counseling, job placement support, and lifetime access to course materials'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Why Choose Neoskills?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive training with the support you need to succeed in your career
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 25px -5px rgba(0, 86, 210, 0.15)',
                }}
                className="group bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-primary/10 overflow-hidden relative"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="inline-flex p-3 rounded-lg bg-primary text-white mb-4 relative z-10"
                >
                  <Icon size={32} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-dark mb-3 relative z-10">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                  {item.description}
                </p>

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-6">
            Ready to transform your career?
          </p>
          <button onClick={openEnroll} className="btn-primary">
            Start Your Learning Journey
          </button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default WhyChooseUs
