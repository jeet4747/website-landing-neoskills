import React, { useState } from 'react'
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
  Globe,
  BarChart3,
} from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

const formatINR = (amount) => {
  if (!amount) return null
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

const PricingBlock = ({ trainingFee, trainingExam }) => {
  const hasPricing = trainingFee || trainingExam

  if (!hasPricing) {
    return (
      <div className="mt-4 rounded-xl border border-dashed border-border-gray bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-600">Pricing: Contact us for details</p>
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-xl border border-border-gray bg-white p-4 shadow-sm">
      <h5 className="text-sm font-bold text-dark mb-3">Pricing</h5>
      <div className="space-y-2 text-sm">
        {trainingFee && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Training Fee</span>
            <span className="font-bold text-primary">{formatINR(trainingFee)}</span>
          </div>
        )}
        {trainingExam && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Training + Exam</span>
            <span className="font-bold text-primary">{formatINR(trainingExam)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState('certification')
  const [expandedCategory, setExpandedCategory] = useState('Project Management')
  const { openEnroll } = useEnroll()

  const courseStructure = {
    certification: {
      label: 'Certification Courses',
      categories: {
        'Project Management': {
          icon: Briefcase,
          description: 'Master project delivery, planning, governance, and certification readiness.',
          courses: [
            {
              title: 'PMP',
              icon: Award,
              description: 'Project Management Professional certification for experienced project managers.',
              cohort: '21-Mar-2026',
              level: 'Advanced',
              duration: '6-8 weeks',
              trainingFee: 50000,
              trainingExam: 50000,
              supportCost: 50000,
            },
            {
              title: 'PMP Morning Batch',
              icon: Award,
              description: 'Morning batch for PMP preparation with guided mentorship.',
              cohort: '14-Mar-2026',
              level: 'Advanced',
              duration: '6-8 weeks',
              trainingFee: 50000,
              trainingExam: 50000,
              supportCost: 50000,
            },
            {
              title: 'CAPM',
              icon: Award,
              description: 'Entry-level project management certification for aspiring professionals.',
              cohort: 'Launching Soon',
              level: 'Beginner',
              duration: '4-6 weeks',
              trainingFee: 25000,
              trainingExam: 35000,
              supportCost: 25000,
            },
          ],
        },

        PRINCE2: {
          icon: BookOpen,
          description: 'Structured project management framework with Foundation and Practitioner pathways.',
          courses: [
            {
              title: 'PRINCE2 Foundation',
              icon: BookOpen,
              description: 'Foundational knowledge of the PRINCE2 methodology.',
              level: 'Beginner',
              duration: '3-4 weeks',
              cohort: 'Launching Soon',
              trainingExam: 33600,
              supportCost: 30800,
            },
            {
              title: 'PRINCE2 Practitioner',
              icon: BookOpen,
              description: 'Advanced PRINCE2 application for project practitioners.',
              level: 'Advanced',
              duration: '4-6 weeks',
              cohort: 'Launching Soon',
              trainingExam: 34800,
              supportCost: 31900,
            },
            {
              title: 'PRINCE2 Agile Foundation',
              icon: Zap,
              description: 'Blend PRINCE2 governance with Agile practices.',
              level: 'Beginner',
              duration: '3-4 weeks',
              cohort: 'Launching Soon',
              trainingExam: 26400,
              supportCost: 24200,
            },
            {
              title: 'PRINCE2 Agile Practitioner',
              icon: Zap,
              description: 'Apply hybrid PRINCE2 Agile methods in real project environments.',
              level: 'Advanced',
              duration: '5-6 weeks',
              cohort: 'Launching Soon',
              trainingExam: 27600,
              supportCost: 25300,
            },
            {
              title: 'PRINCE2 F & P',
              icon: BookOpen,
              description: 'Combined PRINCE2 Foundation and Practitioner fast-track batch.',
              level: 'Intermediate',
              duration: '5-7 weeks',
              cohort: '28-Mar-2026',
              trainingFee: 15000,
              trainingExam: 29500,
              supportCost: 25000,
            },
          ],
        },

        'Cloud Computing': {
          icon: Cloud,
          description: 'Cloud infrastructure, services, architecture, and certification programs.',
          courses: [
            {
              title: 'AWS Cloud Practitioner',
              icon: Cloud,
              description: 'AWS cloud fundamentals and certification training.',
              cohort: '14-Mar-2026',
              level: 'Beginner',
              duration: '3-4 weeks',
              trainingFee: 10000,
              trainingExam: 18500,
              supportCost: 18500,
            },
            {
              title: 'AWS Solutions Architect Associate',
              icon: Cloud,
              description: 'Architecture-focused AWS associate certification training.',
              cohort: 'Launching Soon',
              level: 'Intermediate',
              duration: '5-6 weeks',
              trainingFee: 15000,
              trainingExam: 35000,
              supportCost: 25000,
            },
            {
              title: 'AWS SysOps Administrator',
              icon: Cloud,
              description: 'Operations, monitoring, and administration on AWS.',
              cohort: 'Launching Soon',
              level: 'Intermediate',
              duration: '5-6 weeks',
              trainingFee: 15000,
              trainingExam: 35000,
              supportCost: 25000,
            },
            {
              title: 'AWS Certified Developer Associate',
              icon: Cloud,
              description: 'Application development and deployment on AWS cloud.',
              cohort: 'Launching Soon',
              level: 'Intermediate',
              duration: '5-6 weeks',
              trainingFee: 15000,
              trainingExam: 35000,
              supportCost: 25000,
            },
            {
              title: 'Microsoft Azure AZ-900',
              icon: Cloud,
              description: 'Azure fundamentals and beginner cloud certification training.',
              cohort: '4-Apr-2026',
              level: 'Beginner',
              duration: '3-4 weeks',
              trainingFee: 5000,
              trainingExam: 18000,
              supportCost: 15000,
            },
            {
              title: 'Azure Administrator AZ-104',
              icon: Cloud,
              description: 'Azure administration training for managing cloud infrastructure.',
              cohort: '6-Apr-2026',
              level: 'Intermediate',
              duration: '5-6 weeks',
              trainingFee: 12000,
              trainingExam: 25000,
              supportCost: 15000,
            },
            {
              title: 'Azure Solutions Architect AZ-305',
              icon: Cloud,
              description: 'Design Microsoft Azure solutions with advanced architectural concepts.',
              cohort: 'Launching Soon',
              level: 'Advanced',
              duration: '5-6 weeks',
              trainingFee: 15000,
              trainingExam: 25000,
              supportCost: 15000,
            },
            {
              title: 'Microsoft Azure DevOps (AZ-400)',
              icon: Cloud,
              description: 'DevOps practices, CI/CD pipelines, and Azure automation.',
              cohort: 'Launching Soon',
              level: 'Advanced',
              duration: '5-7 weeks',
              trainingExam: 25000,
              supportCost: 15000,
            },
            {
              title: 'Google Cloud',
              icon: Cloud,
              description: 'Google Cloud fundamentals and certification pathway.',
              cohort: 'Launching Soon',
              level: 'Intermediate',
              duration: '5-6 weeks',
              trainingExam: 35000,
            },
          ],
        },

        'Agile & Scrum': {
          icon: Zap,
          description: 'Agile methodologies, Scrum roles, scaled frameworks, and certification paths.',
          courses: [
            {
              title: 'Certified Scrum Master (CSM)',
              icon: Award,
              description: 'Official Scrum training focused on Scrum practices and servant leadership.',
              level: 'Intermediate',
              duration: '3-4 weeks',
              cohort: '14-Mar-2026',
              trainingExam: 29500,
              supportCost: 25000,
            },
            {
              title: 'Professional Scrum Master I (PSM I)',
              icon: Award,
              description: 'Scrum.org certification to demonstrate strong understanding of Scrum.',
              level: 'Intermediate',
              duration: '4-5 weeks',
              cohort: '14-Mar-2026',
              trainingFee: 20000,
              trainingExam: 35000,
              supportCost: 15000,
            },
            {
              title: 'Professional Scrum Master II (PSM II)',
              icon: Award,
              description: 'Advanced Scrum leadership and coaching capability.',
              level: 'Advanced',
              duration: '4-5 weeks',
              cohort: '14-Mar-2026',
              trainingFee: 20000,
              trainingExam: 45000,
              supportCost: 35000,
            },
            {
              title: 'Professional Scrum Product Owner I (PSPO I)',
              icon: Award,
              description: 'Product ownership, value delivery, and backlog strategy.',
              level: 'Intermediate',
              duration: '4-5 weeks',
              cohort: '14-Mar-2026',
              trainingFee: 18000,
              trainingExam: 35000,
              supportCost: 30000,
            },
            {
              title: 'Professional Scrum Product Owner II (PSPO II)',
              icon: Award,
              description: 'Advanced product ownership in complex product environments.',
              level: 'Advanced',
              duration: '4-6 weeks',
              cohort: '14-Mar-2026',
              trainingFee: 18000,
              trainingExam: 35000,
              supportCost: 30000,
            },
            {
              title: 'Professional Scrum Master™ - AI Essentials Certification',
              icon: Award,
              description: 'AI-focused Scrum implementation and certification readiness.',
              level: 'Intermediate',
              duration: '6-8 weeks',
              cohort: '25-Apr-2026',
              trainingFee: 20000,
              trainingExam: 35000,
              supportCost: 15000,
            },
            {
              title: 'Advanced Certified Scrum Product Owner (A-CSPO)',
              icon: Award,
              description: 'Advanced product ownership, roadmapping, and stakeholder management.',
              level: 'Advanced',
              duration: '4-6 weeks',
              cohort: '14-Mar-2026',
              trainingFee: 18000,
              trainingExam: 35000,
              supportCost: 30000,
            },
            {
              title: 'Agile Advanced Certified ScrumMaster (A-CSM)',
              icon: Award,
              description: 'Advanced ScrumMaster practices, facilitation, and agile coaching.',
              level: 'Advanced',
              duration: '4-6 weeks',
              cohort: '14-Mar-2026',
              trainingFee: 20000,
              trainingExam: 45000,
              supportCost: 35000,
            },
            {
              title: 'Agile Certified Scrum Product Owner (CSPO)',
              icon: Award,
              description: 'Certified Scrum Product Owner training and applied product thinking.',
              level: 'Intermediate',
              duration: '3-4 weeks',
              cohort: '14-Mar-2026',
              trainingFee: 35000,
              trainingExam: 35000,
              supportCost: 30000,
            },
            {
              title: 'Agile SAFe Advanced Scrum Master (SASM)',
              icon: Award,
              description: 'Scaled Agile Framework training for Scrum Masters working in enterprise setups.',
              level: 'Advanced',
              duration: '4-6 weeks',
              cohort: '14-Mar-2026',
              trainingExam: 53000,
              supportCost: 45000,
            },
          ],
        },

        'IT Service & Architecture': {
          icon: Users,
          description: 'IT service management, enterprise architecture, and platform-based training.',
          courses: [
            {
              title: 'ITIL 4 Foundation',
              icon: Users,
              description: 'Foundation certification in IT service management practices.',
              cohort: '14-Mar-2026',
              level: 'Beginner',
              duration: '3-4 weeks',
              trainingExam: 29400,
              supportCost: 26950,
            },
            {
              title: 'TOGAF Level 1 & 2 Certification',
              icon: Briefcase,
              description: 'Enterprise architecture certification for strategic IT design.',
              cohort: '21-Mar-2026',
              level: 'Advanced',
              duration: '5-6 weeks',
              trainingFee: 25000,
              trainingExam: 85000,
              supportCost: 85000,
            },
            {
              title: 'ServiceNow',
              icon: Users,
              description: 'Instructor-led ServiceNow training with practical learning support.',
              cohort: 'Every Monday • 5:00 PM',
              level: 'Intermediate',
              duration: '4-6 weeks',
            },
            {
              title: 'ServiceNow Demo',
              icon: Users,
              description: 'Demo batch to understand course structure and platform basics.',
              cohort: 'Every Monday • 7 AM & 7 PM',
              level: 'Beginner',
              duration: 'Demo Session',
            },
          ],
        },

        'Quality Management': {
          icon: BarChart3,
          description: 'Quality assurance, reliability, and process improvement programs.',
          courses: [
            {
              title: 'ISTQB Foundation',
              icon: BookOpen,
              description: 'Software testing fundamentals and ISTQB exam preparation.',
              level: 'Beginner',
              duration: '3-4 weeks',
              cohort: 'Launching Soon',
              supportCost: 15000,
            },
            {
              title: 'Six Sigma Green Belt',
              icon: TrendingUp,
              description: 'Process improvement methodology and lean quality practices.',
              level: 'Intermediate',
              duration: '4-5 weeks',
              cohort: 'Launching Soon',
              trainingExam: 21600,
              supportCost: 19800,
            },
            {
              title: 'Six Sigma Black Belt',
              icon: TrendingUp,
              description: 'Advanced Six Sigma implementation and statistical quality leadership.',
              level: 'Advanced',
              duration: '5-6 weeks',
              cohort: 'Launching Soon',
              trainingExam: 26400,
              supportCost: 24200,
            },
          ],
        },

        DevOps: {
          icon: Code,
          description: 'Development and operations integration with tools, practices, and automation.',
          courses: [
            {
              title: 'DevOps Exin Master',
              icon: Code,
              description: 'Advanced DevOps certification with integrated support.',
              cohort: 'Launching Soon',
              level: 'Advanced',
              duration: '5-6 weeks',
              trainingFee: 15000,
              trainingExam: 29500,
              supportCost: 25000,
            },
            {
              title: 'DevOps Tools & Training',
              icon: Code,
              description: 'Practical DevOps tools training with guided support.',
              cohort: '28-Mar-2026',
              level: 'Intermediate',
              duration: '4-6 weeks',
              trainingFee: 15000,
              trainingExam: 29500,
              supportCost: 25000,
            },
          ],
        },

        'Cyber Security': {
          icon: Shield,
          description: 'Information security, audits, governance, and defensive security certifications.',
          courses: [
            {
              title: 'CompTIA Security+',
              icon: Shield,
              description: 'Security fundamentals and certification preparation.',
              cohort: 'Launching Soon',
              level: 'Beginner',
              duration: '4-5 weeks',
              trainingFee: 25000,
              supportCost: 35000,
            },
            {
              title: 'CISA',
              icon: Shield,
              description: 'Certified Information Systems Auditor training and support.',
              cohort: '14-Mar-2026',
              level: 'Advanced',
              duration: '5-6 weeks',
              trainingFee: 50000,
              supportCost: 50000,
            },
            {
              title: 'CISM',
              icon: Shield,
              description: 'Information security management certification training.',
              cohort: 'Launching Soon',
              level: 'Advanced',
              duration: '5-6 weeks',
              trainingFee: 50000,
              supportCost: 50000,
            },
            {
              title: 'CEH',
              icon: Shield,
              description: 'Certified Ethical Hacker training with practical security learning.',
              cohort: 'Launching Soon',
              level: 'Intermediate',
              duration: '5-6 weeks',
              trainingFee: 25000,
              supportCost: 35000,
            },
          ],
        },

        'AI & Machine Learning': {
          icon: Lightbulb,
          description: 'Artificial intelligence, machine learning, and AI-driven project programs.',
          courses: [
            {
              title: 'CPMAI & AI Project Management',
              icon: Lightbulb,
              description: 'AI project management concepts with practical business relevance.',
              cohort: '14-Mar-2026',
              level: 'Intermediate',
              duration: '4-6 weeks',
              trainingFee: 50000,
              supportCost: 50000,
            },
          ],
        },

        'Business Analysis': {
          icon: TrendingUp,
          description: 'Business analysis frameworks, certifications, and requirement mastery.',
          courses: [
            {
              title: 'CBAP',
              icon: Award,
              description: 'Advanced business analysis certification training and exam readiness.',
              cohort: '14-Mar-2026',
              level: 'Advanced',
              duration: '5-6 weeks',
              trainingFee: 50000,
              supportCost: 50000,
            },
          ],
        },

        'Data Science & BI': {
          icon: Cpu,
          description: 'Data analytics, dashboards, reporting, and business intelligence training.',
          courses: [
            {
              title: 'Power BI',
              icon: BarChart3,
              description: 'Power BI dashboarding, reporting, and business analytics training.',
              cohort: '28-Mar-2026',
              level: 'Intermediate',
              duration: '4-5 weeks',
              trainingFee: 15000,
              trainingExam: 35000,
              supportCost: 25000,
            },
          ],
        },
      },
    },

    masters: {
      label: 'Masters Program',
      categories: {
        'Cyber Security Expert': {
          icon: Shield,
          description: 'Advanced cybersecurity expertise for long-term career growth.',
          courses: [
            {
              title: 'Advanced Threat Analysis',
              icon: Shield,
              description: 'Master enterprise-grade threat analysis and monitoring.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
            {
              title: 'Security Architecture Design',
              icon: Shield,
              description: 'Design secure enterprise systems and security frameworks.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
          ],
        },

        'Big Data Engineer': {
          icon: Cpu,
          description: 'Master-level learning in data engineering and processing systems.',
          courses: [
            {
              title: 'Advanced Data Engineering',
              icon: Cpu,
              description: 'Build scalable data pipelines and processing workflows.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
            {
              title: 'Real-time Data Processing',
              icon: Cpu,
              description: 'Work with streaming systems and real-time analytics pipelines.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
          ],
        },

        'IT Service Management (Master)': {
          icon: Users,
          description: 'Strategic IT service management and operational leadership.',
          courses: [
            {
              title: 'ITIL 4 Expert',
              icon: Users,
              description: 'Advanced ITIL pathway for service management professionals.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
            {
              title: 'ITIL 4 Master Strategy',
              icon: Users,
              description: 'Strategic planning and service transformation training.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
          ],
        },

        "Automation Testing Master's": {
          icon: Code,
          description: 'Automation testing with modern frameworks and AI-assisted QA.',
          courses: [
            {
              title: 'Test Automation Framework Design',
              icon: Code,
              description: 'Build robust automation testing frameworks and practices.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
            {
              title: 'AI in Testing',
              icon: Lightbulb,
              description: 'Use AI-assisted workflows and smart testing techniques.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
          ],
        },

        'Integrated Big Data & Data Science': {
          icon: Cpu,
          description: 'Combined big data and data science learning journey.',
          courses: [
            {
              title: 'Advanced Analytics & ML',
              icon: Cpu,
              description: 'Applied analytics and machine learning for decision-making.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
            {
              title: 'Big Data AI Integration',
              icon: Lightbulb,
              description: 'Integrate AI use cases into large-scale data systems.',
              level: 'Advanced',
              duration: '3-4 months',
              cohort: 'Launching Soon',
            },
          ],
        },
      },
    },
  }

  const currentTab = courseStructure[activeTab]
  const categories = Object.keys(currentTab.categories)

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
            Comprehensive Learning Programs
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
          {Object.entries(courseStructure).map(([key, value]) => (
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
                          <span className="text-gray-600">Level</span>
                          <span className="font-semibold text-primary text-right">
                            {course.level ?? 'Intermediate'}
                          </span>
                        </div>
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

                      <motion.button
                        onClick={() => {
                          try {
                            localStorage.setItem('preferredCourse', course.title)
                          } catch (e) {}
                          openEnroll()
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-3 mt-5 rounded-xl"
                      >
                        Enroll Now
                        <ArrowRight size={16} />
                      </motion.button>
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