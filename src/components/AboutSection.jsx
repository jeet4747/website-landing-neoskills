import React from 'react'
import { motion } from 'framer-motion'
import { Award, Briefcase, Users, BookOpen } from 'lucide-react'

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const highlights = [
    {
      icon: Award,
      title: 'Expert Trainers',
      description: 'Industry veterans with 15+ years of cybersecurity experience'
    },
    {
      icon: Briefcase,
      title: 'Real-World Projects',
      description: 'Hands-on labs simulating actual security scenarios'
    },
    {
      icon: Users,
      title: 'Career Guidance',
      description: 'Dedicated mentoring and placement support'
    },
    {
      icon: BookOpen,
      title: 'Certifications',
      description: 'Industry-recognized global certifications'
    }
  ]

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 neo-grid opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6 text-gradient">
            About Neoskills Learning Solutions
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Neoskills Learning Solutions is a global training provider empowering professionals through internationally recognized certifications. Our goal is to help learners upskill in Cybersecurity, Cloud, and AI with structured learning paths, real-world projects, and career mentoring.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-6 rounded-xl border border-neo-green/30 bg-neo-gray/50 backdrop-blur hover:border-neo-green/60 transition-all duration-300 card-hover"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block p-3 rounded-lg bg-gradient-to-br from-neo-green to-neo-blue mb-4"
                >
                  <Icon size={24} className="text-neo-darker" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {[
            { value: '10,000+', label: 'Students Trained' },
            { value: '98%', label: 'Certification Success Rate' },
            { value: '500+', label: 'Industry Partners' }
          ].map((stat, index) => (
            <div key={index} className="p-6">
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-4xl md:text-5xl font-bold text-gradient font-mono mb-2"
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-400 text-lg">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
