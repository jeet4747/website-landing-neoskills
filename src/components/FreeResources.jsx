import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, BookOpen, FileText, Video, BarChart3, ArrowRight, Check } from 'lucide-react'

const resources = [
  {
    icon: FileText,
    title: 'Certification Roadmap 2026',
    desc: 'Complete guide to choosing the right IT certification for your career path.',
    type: 'PDF Guide',
    downloads: '2.4K+',
  },
  {
    icon: BookOpen,
    title: 'PMP Exam Prep Checklist',
    desc: '60-day study plan with key topics, mock tests, and exam day tips.',
    type: 'Checklist',
    downloads: '1.8K+',
  },
  {
    icon: Video,
    title: 'Cloud Career Masterclass',
    desc: 'Recorded webinar: How to break into cloud computing with AWS & Azure.',
    type: 'Video',
    downloads: '3.1K+',
  },
  {
    icon: BarChart3,
    title: 'IT Salary Benchmark Report',
    desc: '2026 salary trends for certified IT professionals across India & USA.',
    type: 'Report',
    downloads: '5.6K+',
  },
]

const FreeResources = () => {
  const [downloaded, setDownloaded] = useState({})

  const handleDownload = (title) => {
    setDownloaded((prev) => ({ ...prev, [title]: true }))
    setTimeout(() => {
      setDownloaded((prev) => ({ ...prev, [title]: false }))
    }, 3000)
  }

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Download size={16} />
            Free Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Accelerate Your Learning Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download free guides, checklists, and reports crafted by industry experts to help you stay ahead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((item, i) => {
            const Icon = item.icon
            const isDownloaded = downloaded[item.title]

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-border-gray p-6 shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                  <Icon size={24} className="text-primary" />
                </div>

                <h3 className="font-bold text-dark text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">{item.desc}</p>

                <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2.5 py-1 rounded-full font-medium">{item.type}</span>
                  <span>{item.downloads} downloads</span>
                </div>

                <motion.button
                  onClick={() => handleDownload(item.title)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    isDownloaded
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-primary text-white hover:bg-blue-800'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <Check size={16} /> Downloaded
                    </>
                  ) : (
                    <>
                      <Download size={16} /> Download Free
                    </>
                  )}
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 text-sm">
            Join <span className="font-bold text-primary">50,000+</span> professionals who use NeoSkills resources.{' '}
            <a href="#contact" className="text-primary font-semibold hover:underline">
              Suggest a resource
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FreeResources
