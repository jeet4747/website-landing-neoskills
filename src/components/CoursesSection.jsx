import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield,
  BookOpen,
  Award,
  Cpu,
  Zap,
  Users,
  ArrowRight,
  Cloud,
  Briefcase,
  Code,
  TrendingUp,
  Lightbulb,
  BarChart3,
} from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'
import { courseStructure } from '../data/courseStructure'
import { getDetailSlugForCatalogTitle, effectiveListedPrice } from './courseData'
import { loadCoursesForDisplay } from '../data/courseService.js'

const formatINR = (amount) => {
  if (!amount) return null
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

const PricingBlock = ({ trainingFee, trainingExam, supportCost }) => {
  const price = Number(trainingExam || trainingFee || supportCost || 0)

  if (!price) {
    return (
      <div className="mt-4 rounded-xl border border-dashed border-border-gray bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-600">Pricing: Contact us for details</p>
      </div>
    )
  }

  const showExam = trainingExam && trainingFee && Number(trainingFee) !== Number(trainingExam)
  const label = showExam ? 'Training + Exam' : supportCost ? 'Program fee' : 'Pricing'

  return (
    <div className="mt-4 rounded-xl border border-border-gray bg-white p-4 shadow-sm">
      <h5 className="text-sm font-bold text-dark mb-3">Pricing</h5>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-bold text-primary">{formatINR(price)}</span>
      </div>
    </div>
  )
}

const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState('certification')
  const [expandedCategory, setExpandedCategory] = useState('Project Management')
  const [loadedStructure, setLoadedStructure] = useState(courseStructure)
  const [isLoading, setIsLoading] = useState(true)
  const { openEnroll } = useEnroll()
  const navigate = useNavigate()

  useEffect(() => {
    loadCoursesForDisplay()
      .then((merged) => {
        setLoadedStructure(merged)
        setIsLoading(false)
      })
      .catch(() => {
        setLoadedStructure(courseStructure)
        setIsLoading(false)
      })
  }, [])

  const currentTab = loadedStructure[activeTab]
  const categories = Object.keys(currentTab.categories)

  if (isLoading) {
    return (
      <section className="relative py-20 md:py-32 overflow-hidden bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center rounded-full bg-white p-4 shadow-lg">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
            <p className="mt-6 text-xl text-gray-600">Loading course catalog...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-light-gray">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Expert-Led Programs
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore NeoSkills certification and advanced learning programs across Agile,
            Cloud, Project Management, Cyber Security, IT Service, and Business domains.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {Object.entries(loadedStructure).map(([key, value]) => (
            <motion.button
              key={key}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => {
                setActiveTab(key)
                setExpandedCategory(Object.keys(value.categories)[0])
              }}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 text-lg ${
                activeTab === key
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-dark border-2 border-border-gray hover:border-primary'
              }`}
            >
              {value.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-border-gray overflow-hidden sticky top-4">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-4">
                <h3 className="font-bold text-white text-lg">Categories</h3>
              </div>
              <div className="divide-y divide-border-gray max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ paddingLeft: 12 }}
                    onClick={() => setExpandedCategory(category)}
                    className={`w-full text-left px-4 py-3 transition-all duration-200 font-medium text-sm ${
                      expandedCategory === category
                        ? 'bg-primary/10 text-primary border-l-4 border-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={expandedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border border-border-gray p-8"
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  {(() => {
                    const Icon = currentTab.categories[expandedCategory].icon
                    return <Icon size={40} className="text-primary" />
                  })()}
                  <div>
                    <h3 className="text-3xl font-bold text-dark">{expandedCategory}</h3>
                    <p className="text-gray-600 mt-1">
                      {currentTab.categories[expandedCategory].description}
                    </p>
                  </div>
                </div>
                <div className="h-1 w-20 bg-primary rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentTab.categories[expandedCategory].courses.map((course, index) => {
                  const Icon = course.icon

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{
                        y: -8,
                        boxShadow: '0 20px 25px -5px rgba(0, 86, 210, 0.10)',
                      }}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-border-gray p-6 overflow-hidden group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          whileHover={{ scale: 1.08, rotate: -4 }}
                          className="p-3 rounded-xl bg-primary/10"
                        >
                          <Icon size={24} className="text-primary" />
                        </motion.div>

                        <ArrowRight
                          size={20}
                          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>

                      <h4 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>

                      <p className="text-gray-600 text-sm mt-2 mb-4 min-h-[48px]">
                        {course.description || 'Professional certification and skill development'}
                      </p>

                      <div className="space-y-2 mb-4 py-3 border-t border-border-gray text-xs">
                        <div className="flex justify-between gap-3">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-semibold text-primary text-right">
                            {course.duration ?? '4-6 weeks'}
                          </span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-gray-600">Cohort</span>
                          <span className="font-semibold text-primary text-right">
                            {course.cohort ?? 'Launching Soon'}
                          </span>
                        </div>
                      </div>

                      <PricingBlock
                        trainingFee={course.trainingFee}
                        trainingExam={course.trainingExam}
                        supportCost={course.supportCost}
                      />

                      <div className="flex gap-3 mt-5">
                        <motion.button
                          type="button"
                          onClick={() => {
                            try {
                              localStorage.setItem('preferredCourse', course.title)
                            } catch (e) {
                              /* ignore */
                            }
                            const amt = effectiveListedPrice(course)
                            if (amt != null && amt > 0) {
                              openEnroll({ course: course.title, baseAmount: amt })
                            } else {
                              openEnroll({ course: course.title })
                            }
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-3 rounded-xl"
                        >
                          Enroll Now
                          <ArrowRight size={16} />
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={() => {
                            const detailSlug = getDetailSlugForCatalogTitle(course.title)
                            if (detailSlug) {
                              navigate(`/course/${detailSlug}`)
                              return
                            }
                            try {
                              localStorage.setItem('preferredCourse', course.title)
                            } catch (e) {
                              /* ignore */
                            }
                            const el = document.getElementById('contact')
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          {getDetailSlugForCatalogTitle(course.title) ? 'More info' : 'Request details'}
                          <BookOpen size={16} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CoursesSection