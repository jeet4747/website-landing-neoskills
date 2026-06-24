import React from 'react'
import { motion } from 'framer-motion'

const trainers = [
  {
    name: 'Rajesh Kumar',
    role: 'PMP, PMI-ACP, PRINCE2 Practitioner',
    domain: 'Project Management',
    experience: '18+ years',
    bio: 'Led enterprise transformations across IT, BFSI, and telecom. Has trained 5,000+ professionals in PMP, PRINCE2, and Agile methodologies.',
    image: '/images/nsl_logo__Logo_.svg',
  },
  {
    name: 'Priya Sharma',
    role: 'AWS Certified Solutions Architect, Azure AZ-305',
    domain: 'Cloud Computing',
    experience: '14+ years',
    bio: 'Cloud architect with hands-on experience designing scalable solutions on AWS and Azure. Previously at major Indian SI and global SaaS firms.',
    image: '/images/nsl_logo__Logo_.svg',
  },
  {
    name: 'Vikram Mehta',
    role: 'CSM, CSPO, SAFe SPC, ITIL 4 Managing Professional',
    domain: 'Agile, Scrum & IT Service Management',
    experience: '16+ years',
    bio: 'Enterprise Agile coach and ITIL expert. Has helped 20+ organisations adopt SAFe and Scrum at scale across delivery teams.',
    image: '/images/nsl_logo__Logo_.svg',
  },
  {
    name: 'Ananya Das',
    role: 'CEH, CompTIA Security+, CISA, CISSP',
    domain: 'Cybersecurity',
    experience: '12+ years',
    bio: 'Cybersecurity practitioner specialising in threat analysis, governance, and compliance. Has conducted audits for Fortune 500 clients.',
    image: '/images/nsl_logo__Logo_.svg',
  },
]

const TrainersSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our expert trainers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every program is delivered by certified practitioners with deep industry experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-white">{t.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">{t.name}</h3>
              <p className="text-xs text-primary font-semibold mt-1 uppercase tracking-wide">{t.domain}</p>
              <p className="text-xs text-gray-500 mt-1">{t.role}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t.experience}</p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{t.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrainersSection
