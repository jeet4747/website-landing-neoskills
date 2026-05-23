import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, GraduationCap, CalendarCheck, ArrowRight } from 'lucide-react'

const CorporateTraining = () => {
  const benefits = [
    {
      icon: Building2,
      title: 'Custom Curriculum',
      description: 'Programs tailored to your organization\'s goals, skill gaps, and industry requirements.'
    },
    {
      icon: Users,
      title: 'Dedicated Cohort',
      description: 'Private batch for your team with flexible scheduling — no mixing with public cohorts.'
    },
    {
      icon: GraduationCap,
      title: 'Bulk Certification',
      description: 'Upskill your entire workforce with volume pricing and consolidated reporting.'
    },
    {
      icon: CalendarCheck,
      title: 'Flexible Delivery',
      description: 'Choose live online, on-site at your office, or hybrid — whatever works for your team.'
    }
  ]

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#0a1628] to-[#1a2744] overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Building2 size={16} />
              For Organizations
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Upskill Your
              <span className="text-accent"> Entire Team</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Equip your workforce with industry-recognized certifications and future-ready skills.
              We partner with organizations to deliver customized training programs that drive business results.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <Icon size={24} className="text-accent mb-2" />
                    <h4 className="text-white font-semibold text-sm mb-1">{b.title}</h4>
                    <p className="text-gray-400 text-xs">{b.description}</p>
                  </motion.div>
                )
              })}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-dark font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-accent/25 text-lg"
            >
              Request Corporate Pricing
              <ArrowRight size={20} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Trusted by Industry Leaders</h3>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {['PMP', 'AWS', 'Azure', 'ITIL', 'PRINCE2', 'Scrum', 'CISA', 'DevOps'].map((cert, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">{cert} Certification</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Minimum batch size</span>
                <span className="text-white font-semibold">5 learners</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Delivery format</span>
                <span className="text-white font-semibold">Live online / On-site</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Volume discount</span>
                <span className="text-accent font-bold">Available</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">LMS reporting</span>
                <span className="text-white font-semibold">Included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CorporateTraining
