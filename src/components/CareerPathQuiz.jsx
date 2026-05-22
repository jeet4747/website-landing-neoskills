import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEnroll } from '../context/EnrollContext'
import {
  ArrowRight, ArrowLeft, Check, Compass, Briefcase,
  Terminal, Cloud, Shield, Users, BarChart3, Lightbulb, Cpu
} from 'lucide-react'

const questions = [
  {
    id: 'role',
    question: 'What describes you best?',
    options: [
      { value: 'it-pro', label: 'IT Professional', icon: Terminal, desc: 'Working in IT operations, support, or infrastructure' },
      { value: 'manager', label: 'Project / Delivery Manager', icon: Briefcase, desc: 'Leading teams, projects, or programs' },
      { value: 'security', label: 'Security Enthusiast', icon: Shield, desc: 'Interested in cyber security and information assurance' },
      { value: 'cloud', label: 'Cloud Practitioner', icon: Cloud, desc: 'Working with or moving to cloud technologies' },
      { value: 'analyst', label: 'Business Analyst', icon: BarChart3, desc: 'Bridging business needs and technical solutions' },
      { value: 'student', label: 'Student / Fresher', icon: Users, desc: 'Starting your career and looking for direction' },
    ]
  },
  {
    id: 'goal',
    question: 'What is your primary goal?',
    options: [
      { value: 'certify', label: 'Get Certified', icon: Check, desc: 'Earn a recognized certification for career growth' },
      { value: 'upskill', label: 'Learn New Skills', icon: Lightbulb, desc: 'Build practical skills for my current role' },
      { value: 'switch', label: 'Career Switch', icon: Compass, desc: 'Transition into a new field or role' },
      { value: 'team', label: 'Train My Team', icon: Users, desc: 'Upskill my organization / team' },
    ]
  },
  {
    id: 'experience',
    question: 'Your experience level?',
    options: [
      { value: 'beginner', label: 'Beginner', icon: Users, desc: '0-1 years — new to the field' },
      { value: 'intermediate', label: 'Intermediate', icon: BarChart3, desc: '2-5 years — some hands-on experience' },
      { value: 'advanced', label: 'Advanced', icon: Cpu, desc: '5+ years — experienced professional' },
    ]
  },
]

const recommendations = {
  'it-pro_certify_beginner': { title: 'CompTIA Security+', slug: null, desc: 'Start your IT career with foundational security knowledge.', action: 'enroll' },
  'it-pro_certify_intermediate': { title: 'AWS Cloud Practitioner', slug: null, desc: 'Move to cloud with AWS fundamentals certification.', action: 'enroll' },
  'it-pro_certify_advanced': { title: 'AWS Solutions Architect', slug: null, desc: 'Deepen your cloud expertise with advanced AWS architecture.', action: 'enroll' },
  'it-pro_upskill_beginner': { title: 'ITIL 4 Foundation', slug: null, desc: 'Learn IT service management best practices.', action: 'enroll' },
  'it-pro_upskill_intermediate': { title: 'Microsoft Azure AZ-104', slug: null, desc: 'Build Azure administration skills.', action: 'enroll' },
  'it-pro_upskill_advanced': { title: 'DevOps Tools & Training', slug: null, desc: 'Master CI/CD and automation practices.', action: 'enroll' },
  'it-pro_switch_beginner': { title: 'CISA', slug: null, desc: 'Transition into IT auditing and information systems.', action: 'enroll' },
  'it-pro_switch_intermediate': { title: 'CISM', slug: null, desc: 'Move into information security management.', action: 'enroll' },
  'it-pro_switch_advanced': { title: 'CEH', slug: null, desc: 'Become a certified ethical hacker.', action: 'enroll' },
  'it-pro_team_beginner': { title: 'Corporate Training', slug: null, desc: 'Custom team training programs.', action: 'contact' },
  'manager_certify_intermediate': { title: 'CAPM', slug: null, desc: 'Start your project management journey.', action: 'enroll' },
  'manager_certify_advanced': { title: 'PMP', slug: null, desc: 'The gold standard in project management certification.', action: 'enroll' },
  'manager_upskill_intermediate': { title: 'PRINCE2 Foundation', slug: null, desc: 'Learn structured project management methodology.', action: 'enroll' },
  'manager_upskill_advanced': { title: 'PRINCE2 Practitioner', slug: null, desc: 'Apply PRINCE2 in real projects.', action: 'enroll' },
  'manager_switch_intermediate': { title: 'Agile SAFe Advanced Scrum Master', slug: null, desc: 'Move into scaled agile leadership.', action: 'enroll' },
  'manager_switch_advanced': { title: 'Leading SAFe', slug: null, desc: 'Lead agile transformations at enterprise scale.', action: 'enroll' },
  'manager_team_any': { title: 'Corporate Training', slug: null, desc: 'Bulk PMP/PRINCE2/Agile training for your team.', action: 'contact' },
  'security_certify_beginner': { title: 'CompTIA Security+', slug: null, desc: 'Foundational cyber security certification.', action: 'enroll' },
  'security_certify_intermediate': { title: 'CEH', slug: null, desc: 'Master ethical hacking and penetration testing.', action: 'enroll' },
  'security_certify_advanced': { title: 'CISSP', slug: null, desc: 'Advanced security professional certification.', action: 'enroll' },
  'security_upskill_beginner': { title: 'CompTIA Security+', slug: null, desc: 'Build your security foundation.', action: 'enroll' },
  'security_upskill_intermediate': { title: 'CISA', slug: null, desc: 'Develop information audit and assurance skills.', action: 'enroll' },
  'security_upskill_advanced': { title: 'CISM', slug: null, desc: 'Lead information security programs.', action: 'enroll' },
  'security_switch_any': { title: 'CompTIA Security+', slug: null, desc: 'Begin your transition into cyber security.', action: 'enroll' },
  'security_team_any': { title: 'Corporate Training', slug: null, desc: 'Custom security training for your team.', action: 'contact' },
  'cloud_certify_beginner': { title: 'AWS Cloud Practitioner', slug: null, desc: 'Start with AWS cloud fundamentals.', action: 'enroll' },
  'cloud_certify_intermediate': { title: 'AWS Solutions Architect', slug: null, desc: 'Design and deploy scalable AWS solutions.', action: 'enroll' },
  'cloud_certify_advanced': { title: 'Azure Solutions Architect AZ-305', slug: null, desc: 'Master advanced Azure architecture.', action: 'enroll' },
  'cloud_upskill_beginner': { title: 'Microsoft Azure AZ-900', slug: null, desc: 'Learn Azure cloud fundamentals.', action: 'enroll' },
  'cloud_upskill_intermediate': { title: 'Azure Administrator AZ-104', slug: null, desc: 'Manage Azure infrastructure.', action: 'enroll' },
  'cloud_upskill_advanced': { title: 'Azure DevOps AZ-400', slug: null, desc: 'Implement DevOps on Azure.', action: 'enroll' },
  'cloud_switch_any': { title: 'AWS Cloud Practitioner', slug: null, desc: 'Transition into cloud with AWS.', action: 'enroll' },
  'cloud_team_any': { title: 'Corporate Training', slug: null, desc: 'Cloud certification programs for your team.', action: 'contact' },
  'analyst_certify_beginner': { title: 'CBAP', slug: null, desc: 'Advanced business analysis certification.', action: 'enroll' },
  'analyst_certify_intermediate': { title: 'CBAP', slug: null, desc: 'Validate your business analysis expertise.', action: 'enroll' },
  'analyst_certify_advanced': { title: 'TOGAF', slug: null, desc: 'Enterprise architecture certification.', action: 'enroll' },
  'analyst_upskill_beginner': { title: 'Power BI', slug: null, desc: 'Build data visualization and reporting skills.', action: 'enroll' },
  'analyst_upskill_intermediate': { title: 'Six Sigma Green Belt', slug: null, desc: 'Learn process improvement methodology.', action: 'enroll' },
  'analyst_upskill_advanced': { title: 'Six Sigma Black Belt', slug: null, desc: 'Lead quality improvement initiatives.', action: 'enroll' },
  'analyst_switch_any': { title: 'CBAP', slug: null, desc: 'Transition into business analysis.', action: 'enroll' },
  'student_certify_beginner': { title: 'CompTIA Security+', slug: null, desc: 'Kickstart your IT career.', action: 'enroll' },
  'student_upskill_beginner': { title: 'AWS Cloud Practitioner', slug: null, desc: 'Start with cloud — the most in-demand skill.', action: 'enroll' },
  'student_switch_beginner': { title: 'CAPM', slug: null, desc: 'Begin your project management journey.', action: 'enroll' },
}

const defaultRecommendation = { title: 'Contact us', slug: null, desc: 'Talk to our learning advisor for personalized guidance.', action: 'contact' }

const CareerPathQuiz = () => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const { openEnroll } = useEnroll()

  const currentQ = questions[step]
  const progress = ((step) / questions.length) * 100

  const selectOption = (value) => {
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setAnswers(newAnswers)
      setShowResult(true)
    }
  }

  const goBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const getRecommendation = () => {
    const key = `${answers.role}_${answers.goal}_${answers.experience || 'any'}`
    return recommendations[key] || defaultRecommendation
  }

  const result = getRecommendation()

  const handleResultAction = () => {
    if (result.action === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      try { localStorage.setItem('preferredCourse', result.title) } catch (e) { /* ignore */ }
      openEnroll({ course: result.title })
    }
  }

  return (
    <section className="relative py-20 md:py-32 bg-light-gray overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Compass size={16} />
            Find Your Path
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer 3 quick questions and we'll recommend the perfect course for your career goals.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden"
          >
            {!showResult ? (
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Step {step + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-primary font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-dark mb-6">{currentQ.question}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQ.options.map((opt) => {
                        const Icon = opt.icon
                        const isSelected = answers[currentQ.id] === opt.value
                        return (
                          <motion.button
                            key={opt.value}
                            onClick={() => selectOption(opt.value)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-border-gray hover:border-primary/40 bg-white'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                              <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className={`font-semibold block ${isSelected ? 'text-primary' : 'text-dark'}`}>
                                {opt.label}
                              </span>
                              <span className="text-xs text-gray-500 mt-0.5 block">{opt.desc}</span>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {step > 0 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={goBack}
                    className="mt-6 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium"
                  >
                    <ArrowLeft size={16} /> Back
                  </motion.button>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-2">We Found Your Match!</h3>
                <p className="text-gray-500 mb-6">Based on your answers, we recommend:</p>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10 mb-6">
                  <h4 className="text-3xl font-bold text-primary mb-2">{result.title}</h4>
                  <p className="text-gray-600">{result.desc}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleResultAction}
                    className="btn-primary inline-flex items-center gap-2 justify-center"
                  >
                    {result.action === 'contact' ? 'Contact Us' : 'Enroll Now'}
                    <ArrowRight size={16} />
                  </button>
                  <button onClick={reset} className="btn-outline">
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CareerPathQuiz
