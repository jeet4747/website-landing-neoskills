import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, BookOpen, Star, Building2 } from 'lucide-react'

const stats = [
  { value: '50K+', label: 'Professionals Trained', icon: Users },
  { value: '50+', label: 'Certification Courses', icon: BookOpen },
  { value: '95%', label: 'Placement Rate', icon: Award },
  { value: '4.8/5', label: 'Learner Rating', icon: Star },
  { value: '7+', label: 'Cities Served', icon: Building2 },
]

export default function TrustBadges() {
  return (
    <section className="py-10 bg-gradient-to-r from-primary/5 via-white to-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
