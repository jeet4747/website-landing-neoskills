import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'What courses does NeoSkills offer?',
    a: 'We offer 40+ certification and training programs across Project Management (PMP, CAPM, PRINCE2), Cloud Computing (AWS, Azure, Google Cloud), IT Service Management (ITIL, ServiceNow), Agile & Scrum (CSM, PSM, SAFe), Cyber Security (CompTIA Security+, CISA, CISM, CEH), DevOps, Data Science, Business Analysis, and AI/ML.'
  },
  {
    q: 'Are the courses live or recorded?',
    a: 'All our programs are instructor-led live online sessions. You interact with trainers in real-time, ask questions, and participate in discussions. Recordings are provided for revision as per batch policy.'
  },
  {
    q: 'What is the class schedule like?',
    a: 'Batches run on weekdays (morning/evening) and weekends. Most programs are 3-8 weeks long with 2-3 sessions per week. Check the Upcoming Batches section for the latest schedule.'
  },
  {
    q: 'Do you provide certification exam vouchers?',
    a: 'Training fees cover instruction, study materials, and practice tests. Vendor exam fees are separate and payable directly to the certification body (PMI, AWS, PeopleCert, etc.). We guide you through the exam registration process.'
  },
  {
    q: 'What is your refund policy?',
    a: 'Refunds follow NeoSkills enrollment terms. Typically, you can cancel within the first week of batch start for a full refund minus administrative fees. Contact our admissions team for specific terms applicable to your program.'
  },
  {
    q: 'Do you offer corporate / group training?',
    a: 'Yes! We provide customized training programs for organizations. Choose from any of our courses delivered exclusively for your team with flexible scheduling. Contact us for bulk pricing and tailored curriculum.'
  },
  {
    q: 'Is there any placement assistance?',
    a: 'We provide resume guidance, mock interview preparation, and career counseling. While we do not guarantee placements, our programs are designed to make you job-ready with industry-recognized certifications.'
  },
  {
    q: 'Can I switch batches if I miss a session?',
    a: 'Yes, you can attend missed sessions with another batch running the same module, subject to seat availability. Recordings are also accessible for catch-up.'
  },
]

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <HelpCircle size={16} />
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Quick Answers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our programs, schedules, pricing, and support.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border transition-all duration-300 ${
                openIndex === i
                  ? 'border-primary shadow-lg shadow-primary/5'
                  : 'border-border-gray hover:border-primary/30'
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-dark text-base md:text-lg pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    openIndex === i ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0 border-t border-gray-100 mt-0">
                      <p className="text-gray-600 leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-500">
            Still have questions?{' '}
            <a href="#contact" className="text-primary font-semibold hover:underline">
              Contact our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQAccordion
