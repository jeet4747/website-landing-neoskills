import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, BookOpen, Award, Cpu, Zap, Users, ArrowRight, Cloud, Briefcase, Code, TrendingUp, Lightbulb, Globe, ChevronDown, BarChart3 } from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

const CoursesSection = () => {
  const [activeTab, setActiveTab] = useState('certification')
  const [expandedCategory, setExpandedCategory] = useState('Project Management')
  const { openPayment } = useEnroll()

  const courseStructure = {
    certification: {
      label: 'Certification Courses',
      categories: {
        'Project Management': {
          icon: Briefcase,
          description: 'Master project delivery and planning',
          courses: [
            { 
              title: 'PMP', 
              icon: Award,
              description: 'Project Management Professional - Industry-leading certification for experienced project managers'
            },
            { 
              title: 'CAPM', 
              icon: Award,
              description: 'Certified Associate in Project Management - Entry-level certification for aspiring project managers'
            }
          ]
        },
        'PRINCE2': {
          icon: BookOpen,
          description: 'PRINCE2 structured project management framework',
          courses: [
            { 
              title: 'PRINCE2 Foundation', 
              icon: BookOpen,
              description: 'Foundational knowledge of PRINCE2 methodology - Perfect for project team members',
              level: 'Beginner',
              duration: '3-4 weeks'
            },
            { 
              title: 'PRINCE2 Practitioner', 
              icon: BookOpen,
              description: 'Advanced PRINCE2 application - For practitioners managing projects using PRINCE2',
              level: 'Advanced',
              duration: '4-6 weeks'
            },
            { 
              title: 'PRINCE2 Agile Foundation', 
              icon: Zap,
              description: 'Blend PRINCE2 governance with Agile practices - Perfect for hybrid environments',
              level: 'Beginner',
              duration: '3-4 weeks'
            },
            { 
              title: 'PRINCE2 Agile Practitioner', 
              icon: Zap,
              description: 'Advanced PRINCE2 Agile - Apply hybrid methodologies in complex projects',
              level: 'Advanced',
              duration: '5-6 weeks'
            }
          ]
        },
        'Cloud Computing': {
          icon: Cloud,
          description: 'Cloud infrastructure and services',
          courses: [
            { title: 'AWS Cloud', icon: Cloud },
            { title: 'Microsoft Azure Cloud', icon: Cloud },
            { title: 'Google Cloud', icon: Cloud }
          ]
        },
        'Agile & Scrum': {
          icon: Zap,
          description: 'Agile methodologies and frameworks',
          courses: [
            { 
              title: 'Agile Scrum Master', 
              icon: Zap,
              description: 'Comprehensive Agile and Scrum framework training - Build leadership and facilitation skills',
              level: 'Intermediate',
              duration: '6-8 weeks'
            },
            { 
              title: 'Certified Scrum Master (CSM)', 
              icon: Award,
              description: 'Official Scrum Alliance certification - Master Scrum practices and servant leadership',
              level: 'Intermediate',
              duration: '3-4 weeks'
            },
            { 
              title: 'Professional Scrum Master I (PSM I)', 
              icon: Award,
              description: 'Scrum.org certification - Demonstrate deep understanding of Scrum framework',
              level: 'Intermediate',
              duration: '4-5 weeks'
            },
            { 
              title: 'PRINCE2 Agile Foundation', 
              icon: BookOpen,
              description: 'Blend PRINCE2 governance with Agile practices - Perfect for hybrid environments',
              level: 'Beginner',
              duration: '3-4 weeks'
            },
            { 
              title: 'PRINCE2 Agile Practitioner', 
              icon: BookOpen,
              description: 'Advanced PRINCE2 Agile - Apply hybrid methodologies in complex projects',
              level: 'Advanced',
              duration: '5-6 weeks'
            }
          ]
        },
        'IT Service & Architecture': {
          icon: Users,
          description: 'IT service management expertise',
          courses: [
            { title: 'ITIL 4 Foundation', icon: Users }
          ]
        },
        'Quality Management': {
          icon: BarChart3,
          description: 'Quality assurance and improvement',
          courses: [
            { title: 'ISTQB Foundation', icon: BookOpen },
            { title: 'Six Sigma Green Belt', icon: TrendingUp },
            { title: 'Six Sigma Yellow Belt', icon: TrendingUp },
            { title: 'Six Sigma Black Belt', icon: TrendingUp }
          ]
        },
        'DevOps': {
          icon: Code,
          description: 'Development and operations integration',
          courses: [
            { title: 'DevOps Fundamentals', icon: Code },
            { title: 'Kubernetes & Container Orchestration', icon: Code }
          ]
        },
        'Big Data': {
          icon: Cpu,
          description: 'Large-scale data management',
          courses: [
            { title: 'Big Data Fundamentals', icon: Cpu },
            { title: 'Apache Spark & Hadoop', icon: Cpu }
          ]
        },
        'Cyber Security': {
          icon: Shield,
          description: 'Information and network security',
          courses: [
            { title: 'CompTIA Security+', icon: Shield },
            { title: 'CISA', icon: Shield },
            { title: 'CISM', icon: Shield }
          ]
        },
        'AI & Machine Learning': {
          icon: Lightbulb,
          description: 'Artificial intelligence technologies',
          courses: [
            { title: 'Machine Learning Fundamentals', icon: Lightbulb },
            { title: 'Deep Learning & Neural Networks', icon: Lightbulb }
          ]
        },
        'Business Analysis': {
          icon: TrendingUp,
          description: 'Business requirements and solutions',
          courses: [
            { title: 'CBAP', icon: Award },
            { title: 'ECBA', icon: Award }
          ]
        },
        'Advanced Excel Training': {
          icon: BarChart3,
          description: 'Advanced spreadsheet skills',
          courses: [
            { title: 'Excel Advanced Formulas', icon: BarChart3 },
            { title: 'Data Analysis & Visualization', icon: BarChart3 }
          ]
        },
        'Data Science & BI': {
          icon: Cpu,
          description: 'Data analytics and intelligence',
          courses: [
            { title: 'Data Science Fundamentals', icon: Cpu },
            { title: 'Business Intelligence Tools', icon: BarChart3 }
          ]
        },
        'Digital Marketing': {
          icon: Globe,
          description: 'Online marketing strategies',
          courses: [
            { title: 'Digital Marketing Fundamentals', icon: Globe },
            { title: 'SEO & SEM', icon: Globe }
          ]
        },
        'Technology Training': {
          icon: Code,
          description: 'Core technology skills',
          courses: [
            { title: 'Python Programming', icon: Code },
            { title: 'Java Development', icon: Code }
          ]
        },
        'Soft Skills & Foreign Language': {
          icon: Users,
          description: 'Communication and language training',
          courses: [
            { title: 'Professional Communication', icon: Users },
            { title: 'English Language', icon: Globe }
          ]
        },
        'IT Governance': {
          icon: Briefcase,
          description: 'IT governance frameworks',
          courses: [
            { title: 'COBIT Foundation', icon: Briefcase }
          ]
        },
        'Software Development': {
          icon: Code,
          description: 'Software engineering practices',
          courses: [
            { title: 'Full Stack Development', icon: Code },
            { title: 'Cloud Native Development', icon: Cloud }
          ]
        }
      }
    },
    masters: {
      label: 'Masters Program',
      categories: {
        'Cyber Security Expert': {
          icon: Shield,
          description: 'Advanced cybersecurity expertise',
          courses: [
            { title: 'Advanced Threat Analysis', icon: Shield },
            { title: 'Security Architecture Design', icon: Shield }
          ]
        },
        'Big Data Engineer': {
          icon: Cpu,
          description: 'Master-level big data engineering',
          courses: [
            { title: 'Advanced Data Engineering', icon: Cpu },
            { title: 'Real-time Data Processing', icon: Cpu }
          ]
        },
        'IT Service Management (Master)': {
          icon: Users,
          description: 'Strategic IT service management',
          courses: [
            { title: 'ITIL 4 Expert', icon: Users },
            { title: 'ITIL 4 Master Strategy', icon: Users }
          ]
        },
        'Automation Testing Master\'s': {
          icon: Code,
          description: 'Advanced automation testing',
          courses: [
            { title: 'Test Automation Framework Design', icon: Code },
            { title: 'AI in Testing', icon: Lightbulb }
          ]
        },
        'Integrated Big Data & Data Science': {
          icon: Cpu,
          description: 'Combined big data and data science',
          courses: [
            { title: 'Advanced Analytics & ML', icon: Cpu },
            { title: 'Big Data AI Integration', icon: Lightbulb }
          ]
        }
      }
    }
  }


  const currentTab = courseStructure[activeTab]
  const categories = Object.keys(currentTab.categories)

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-light-gray">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Comprehensive Learning Programs
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore our professionally designed courses across certifications and advanced masters programs
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
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

        {/* Categories and Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Sidebar Categories */}
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

          {/* Courses Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={expandedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border border-border-gray p-8"
            >
              {/* Category Header */}
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

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentTab.categories[expandedCategory].courses.map((course, index) => {
                  const Icon = course.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 86, 210, 0.1)' }}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-border-gray p-6 overflow-hidden group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          className="p-3 rounded-lg bg-primary/10"
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

                      <p className="text-gray-600 text-sm mt-2 mb-4">
                        {course.description || 'Professional certification and skill development'}
                      </p>

                      {/* Show level and duration if available */}
                      {(course.level || course.duration) && (
                        <div className="space-y-2 mb-6 py-3 border-t border-border-gray text-xs">
                          {course.level && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Level</span>
                              <span className="font-semibold text-primary">{course.level}</span>
                            </div>
                          )}
                          {course.duration && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration</span>
                              <span className="font-semibold text-primary">{course.duration}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <motion.button
                        onClick={() => openPayment({ 
                          course: course.title, 
                          baseAmount: 5999 
                        })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-2"
                      >
                        Explore Course
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
