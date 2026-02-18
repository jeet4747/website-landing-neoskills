import React from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react'

const AISection = () => {
  const aiFeatures = [
    {
      icon: Brain,
      title: 'Intelligent Threat Detection',
      description: 'AI algorithms analyze patterns to detect anomalies and emerging threats in real-time'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Forecast potential vulnerabilities before they become critical security issues'
    },
    {
      icon: AlertTriangle,
      title: 'Automated Response',
      description: 'AI-powered systems that respond to threats faster than any human operator'
    },
    {
      icon: Sparkles,
      title: 'Continuous Learning',
      description: 'Machine learning models that improve with every new threat encountered'
    }
  ]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-neo-gray/30">
      <div className="absolute inset-0 neo-grid opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6 text-gradient">
              AI in Cybersecurity
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Artificial Intelligence is revolutionizing cybersecurity. Our specialized course teaches you how to harness AI and machine learning to detect threats, predict vulnerabilities, and automate security responses.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Learn from experts who are building the next generation of AI-powered security systems. Master the technologies that are reshaping the entire cybersecurity industry.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient px-8 py-3"
            >
              Explore AI Course
            </motion.button>
          </motion.div>

          {/* Right - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-lg border border-neo-green/20 bg-neo-gray hover:border-neo-green/60 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    className="inline-block p-3 rounded-lg bg-gradient-to-br from-neo-green/20 to-neo-blue/20 mb-4 group-hover:from-neo-green/40 group-hover:to-neo-blue/40 transition-all"
                  >
                    <Icon size={24} className="text-neo-green" />
                  </motion.div>
                  <h3 className="font-bold mb-2 text-white group-hover:text-neo-green transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Animation visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-xl border border-neo-green/30 bg-gradient-to-br from-neo-green/5 to-neo-blue/5 overflow-hidden"
        >
          <div className="relative h-64 flex items-center justify-center">
            {/* Central Node */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-neo-green to-neo-blue flex items-center justify-center"
            >
              <Brain size={40} className="text-neo-darker" />
            </motion.div>

            {/* Orbiting Nodes */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, linear: true }}
                className="absolute w-40 h-40"
                style={{
                  transformOrigin: '0 0',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-80px',
                  marginTop: '-80px'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-neo-blue to-neo-green flex items-center justify-center"
                  style={{
                    right: '0',
                    top: '50%',
                    marginTop: '-24px'
                  }}
                >
                  <Sparkles size={20} className="text-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            AI-Powered Security System - Multi-Layer Threat Detection & Response Network
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AISection
