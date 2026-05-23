import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEnroll } from '../context/EnrollContext'
import {
  ArrowRight, ArrowLeft, Check, Compass, Briefcase,
  Terminal, Cloud, Shield, Users, BarChart3, Lightbulb, Cpu,
  Database, Cog, LineChart, BookOpen, HelpCircle
} from 'lucide-react'

const questions = [
  {
    id: 'interest',
    question: 'Which area interests you the most?',
    options: [
      { value: 'cloud', label: 'Cloud Computing', icon: Cloud, desc: 'AWS, Azure, GCP — architect, deploy, and manage cloud infrastructure' },
      { value: 'project-mgmt', label: 'Project Management', icon: Briefcase, desc: 'PMP, PRINCE2, CAPM — lead projects and programs effectively' },
      { value: 'security', label: 'Cyber Security', icon: Shield, desc: 'CompTIA Security+, CEH, CISSP, CISA — protect and defend' },
      { value: 'agile', label: 'Agile & Scrum', icon: Users, desc: 'CSM, PSM, SAFe, CSPO — master agile frameworks' },
      { value: 'itsm', label: 'IT Service Management', icon: Cog, desc: 'ITIL 4, TOGAF, ServiceNow — align IT with business' },
      { value: 'data', label: 'Data & Analytics', icon: BarChart3, desc: 'Power BI, Six Sigma — turn data into decisions' },
      { value: 'devops', label: 'DevOps', icon: Terminal, desc: 'CI/CD, automation, DevSecOps — streamline delivery' },
      { value: 'ai', label: 'AI & Machine Learning', icon: Cpu, desc: 'CPMAI, AI in Testing — build intelligent solutions' },
      { value: 'testing', label: 'Software Testing', icon: Database, desc: 'ISTQB, automation testing — ensure quality' },
      { value: 'ba', label: 'Business Analysis', icon: LineChart, desc: 'CBAP, TOGAF — bridge business and tech' },
    ]
  },
  {
    id: 'goal',
    question: 'What is your primary goal?',
    options: [
      { value: 'certify', label: 'Get Certified', icon: Check, desc: 'Earn an industry-recognized certification' },
      { value: 'upskill', label: 'Build Job-Ready Skills', icon: Lightbulb, desc: 'Gain practical skills for my current role' },
      { value: 'masters', label: 'Complete a Master\'s Program', icon: BookOpen, desc: 'Advanced specialization with depth' },
      { value: 'team', label: 'Train My Team', icon: Users, desc: 'Corporate training for my organization' },
    ]
  },
  {
    id: 'experience',
    question: 'Your experience level?',
    options: [
      { value: 'beginner', label: 'Beginner', icon: Users, desc: '0-1 years — new to this domain' },
      { value: 'intermediate', label: 'Intermediate', icon: BarChart3, desc: '2-5 years — some hands-on experience' },
      { value: 'advanced', label: 'Advanced', icon: Cpu, desc: '5+ years — experienced professional' },
    ]
  },
  {
    id: 'exam-plan',
    question: 'Do you plan to take the certification exam?',
    options: [
      { value: 'yes', label: 'Yes — Get Certified', icon: Check, desc: 'I want the full training + exam preparation' },
      { value: 'later', label: 'Maybe Later', icon: HelpCircle, desc: 'Training first, exam decision later' },
      { value: 'no', label: 'Skills Only', icon: Lightbulb, desc: 'Just the knowledge, no exam needed' },
    ]
  },
  {
    id: 'commitment',
    question: 'How many hours per week can you dedicate?',
    options: [
      { value: 'light', label: 'Less than 5 hrs/week', icon: Users, desc: 'Busy schedule — need a relaxed pace' },
      { value: 'moderate', label: '5-10 hrs/week', icon: BarChart3, desc: 'Can commit regular study time' },
      { value: 'intensive', label: '10-15 hrs/week', icon: Cpu, desc: 'Ready for an accelerated program' },
      { value: 'fulltime', label: '15+ hrs/week', icon: Terminal, desc: 'Full focus on upskilling quickly' },
    ]
  },
  {
    id: 'schedule',
    question: 'When do you prefer to learn?',
    options: [
      { value: 'weekday-evening', label: 'Weekday Evenings', icon: Briefcase, desc: 'After work — 6 PM to 9 PM' },
      { value: 'weekend', label: 'Weekends', icon: Cloud, desc: 'Saturday or Sunday batches' },
      { value: 'flexible', label: 'Fully Flexible', icon: Compass, desc: 'I will adjust to available slots' },
    ]
  },
  {
    id: 'format',
    question: 'How do you learn best?',
    options: [
      { value: 'live', label: 'Live Instructor-Led', icon: Users, desc: 'Structured classes with real-time interaction' },
      { value: 'hands-on', label: 'Hands-on Labs', icon: Terminal, desc: 'Learn by doing — labs and projects' },
      { value: 'mixed', label: 'Mixed (Live + Labs)', icon: Lightbulb, desc: 'Best of both — classes plus practice' },
    ]
  },
]

const recommendations = {
  // Cloud Computing
  'cloud_certify_beginner_yes': { title: 'AWS Cloud Practitioner', desc: 'Start your cloud journey with AWS fundamentals certification.', action: 'enroll' },
  'cloud_certify_beginner_later': { title: 'AWS Cloud Practitioner', desc: 'Build cloud foundation skills at your own pace.', action: 'enroll' },
  'cloud_certify_intermediate_yes': { title: 'AWS Solutions Architect', desc: 'Design and deploy scalable AWS solutions. The most sought-after cloud cert.', action: 'enroll' },
  'cloud_certify_intermediate_later': { title: 'Azure Administrator AZ-104', desc: 'Manage Azure infrastructure with hands-on training.', action: 'enroll' },
  'cloud_certify_advanced_yes': { title: 'Azure Solutions Architect AZ-305', desc: 'Master advanced Azure architecture and design patterns.', action: 'enroll' },
  'cloud_upskill_beginner_yes': { title: 'Microsoft Azure AZ-900', desc: 'Learn Azure cloud fundamentals from scratch.', action: 'enroll' },
  'cloud_upskill_intermediate_yes': { title: 'AWS Solutions Architect', desc: 'Deepen your AWS expertise with architecture training.', action: 'enroll' },
  'cloud_upskill_advanced_yes': { title: 'Azure DevOps AZ-400', desc: 'Implement DevOps practices on Azure at scale.', action: 'enroll' },
  'cloud_masters_any_any': { title: 'Cloud Computing Master\'s Program', desc: 'Comprehensive multi-cloud mastery across AWS, Azure, and DevOps.', action: 'enroll' },
  'cloud_team_any_any': { title: 'Corporate Cloud Training', desc: 'Custom cloud certification programs for your team.', action: 'contact' },

  // Project Management
  'project-mgmt_certify_beginner_yes': { title: 'CAPM', desc: 'Start your project management journey with CAPM certification.', action: 'enroll' },
  'project-mgmt_certify_intermediate_yes': { title: 'PMP', desc: 'The gold standard in project management. Globally recognized.', action: 'enroll' },
  'project-mgmt_certify_advanced_yes': { title: 'PMP', desc: 'Validate your senior project leadership with PMP certification.', action: 'enroll' },
  'project-mgmt_upskill_intermediate_yes': { title: 'PRINCE2 Foundation', desc: 'Learn structured project management methodology.', action: 'enroll' },
  'project-mgmt_upskill_advanced_yes': { title: 'PRINCE2 Practitioner', desc: 'Apply PRINCE2 methodology in real-world projects.', action: 'enroll' },
  'project-mgmt_masters_any_any': { title: 'Project Management Master\'s Program', desc: 'Advanced program covering PMP, PRINCE2, Agile, and leadership.', action: 'enroll' },
  'project-mgmt_team_any_any': { title: 'Corporate PM Training', desc: 'Bulk PMP/PRINCE2/Agile training programs for your team.', action: 'contact' },

  // Cyber Security
  'security_certify_beginner_yes': { title: 'CompTIA Security+', desc: 'Foundational cyber security certification — the perfect starting point.', action: 'enroll' },
  'security_certify_intermediate_yes': { title: 'CEH', desc: 'Master ethical hacking, penetration testing, and offensive security.', action: 'enroll' },
  'security_certify_advanced_yes': { title: 'CISSP', desc: 'Advanced security leadership certification for experienced professionals.', action: 'enroll' },
  'security_upskill_beginner_yes': { title: 'CompTIA Security+', desc: 'Build your security foundation from the ground up.', action: 'enroll' },
  'security_upskill_intermediate_yes': { title: 'CISA', desc: 'Develop information systems audit and assurance expertise.', action: 'enroll' },
  'security_upskill_advanced_yes': { title: 'CISM', desc: 'Lead enterprise information security programs.', action: 'enroll' },
  'security_masters_any_any': { title: 'Cyber Security Expert Program', desc: 'Advanced multi-domain program covering threat analysis, architecture, and compliance.', action: 'enroll' },
  'security_team_any_any': { title: 'Corporate Security Training', desc: 'Customized security training programs for your organization.', action: 'contact' },

  // Agile & Scrum
  'agile_certify_beginner_yes': { title: 'Certified Scrum Master (CSM)', desc: 'Start your agile journey with industry-standard Scrum Master certification.', action: 'enroll' },
  'agile_certify_intermediate_yes': { title: 'Professional Scrum Master I (PSM I)', desc: 'Validate your Scrum mastery with PSM I certification.', action: 'enroll' },
  'agile_certify_advanced_yes': { title: 'Agile SAFe Advanced Scrum Master', desc: 'Lead agile transformations at enterprise scale with SAFe.', action: 'enroll' },
  'agile_upskill_beginner_yes': { title: 'Certified Scrum Product Owner (CSPO)', desc: 'Learn product ownership and backlog management.', action: 'enroll' },
  'agile_upskill_intermediate_yes': { title: 'Professional Scrum Product Owner I (PSPO I)', desc: 'Master product ownership with Scrum.org certification.', action: 'enroll' },
  'agile_upskill_advanced_yes': { title: 'Advanced Certified ScrumMaster (A-CSM)', desc: 'Take your Scrum Master skills to the next level.', action: 'enroll' },
  'agile_masters_any_any': { title: 'Agile Leadership Master\'s Program', desc: 'Comprehensive program across Scrum, SAFe, and Lean practices.', action: 'enroll' },
  'agile_team_any_any': { title: 'Corporate Agile Training', desc: 'Bulk Scrum and SAFe certification programs for teams.', action: 'contact' },

  // IT Service Management
  'itsm_certify_beginner_yes': { title: 'ITIL 4 Foundation', desc: 'Learn IT service management best practices. The global standard.', action: 'enroll' },
  'itsm_certify_intermediate_yes': { title: 'ITIL 4 Managing Professional', desc: 'Deepen your ITSM expertise with ITIL 4 MP.', action: 'enroll' },
  'itsm_certify_advanced_yes': { title: 'TOGAF Level 1 & 2', desc: 'Master enterprise architecture with TOGAF certification.', action: 'enroll' },
  'itsm_upskill_beginner_yes': { title: 'ITIL 4 Foundation', desc: 'Build a solid foundation in IT service management.', action: 'enroll' },
  'itsm_upskill_intermediate_yes': { title: 'ServiceNow', desc: 'Learn the leading ITSM platform for digital workflows.', action: 'enroll' },
  'itsm_upskill_advanced_yes': { title: 'TOGAF Level 1 & 2', desc: 'Architect enterprise solutions with TOGAF framework.', action: 'enroll' },
  'itsm_masters_any_any': { title: 'ITIL 4 Expert / Master\'s Program', desc: 'Complete path to ITIL 4 Expert and Master level.', action: 'enroll' },
  'itsm_team_any_any': { title: 'Corporate ITSM Training', desc: 'ITIL, TOGAF, and ServiceNow programs for your team.', action: 'contact' },

  // Data & Analytics
  'data_certify_beginner_yes': { title: 'Power BI', desc: 'Build data visualization and business intelligence skills.', action: 'enroll' },
  'data_certify_intermediate_yes': { title: 'Six Sigma Green Belt', desc: 'Learn data-driven process improvement methodology.', action: 'enroll' },
  'data_certify_advanced_yes': { title: 'Six Sigma Black Belt', desc: 'Lead quality improvement initiatives with advanced analytics.', action: 'enroll' },
  'data_upskill_beginner_yes': { title: 'Power BI', desc: 'Turn raw data into actionable dashboards and insights.', action: 'enroll' },
  'data_upskill_intermediate_yes': { title: 'Six Sigma Green Belt', desc: 'Apply statistical methods to solve business problems.', action: 'enroll' },
  'data_upskill_advanced_yes': { title: 'Six Sigma Black Belt', desc: 'Drive enterprise-wide process excellence.', action: 'enroll' },
  'data_masters_any_any': { title: 'Big Data & Data Science Program', desc: 'Advanced program covering big data, analytics, and ML integration.', action: 'enroll' },
  'data_team_any_any': { title: 'Corporate Data Training', desc: 'Custom Power BI, Six Sigma, and data science programs.', action: 'contact' },

  // DevOps
  'devops_certify_beginner_yes': { title: 'DevOps Tools & Training', desc: 'Start your DevOps journey with CI/CD and automation fundamentals.', action: 'enroll' },
  'devops_certify_intermediate_yes': { title: 'DevOps Exin Master', desc: 'Comprehensive DevOps certification covering the full lifecycle.', action: 'enroll' },
  'devops_certify_advanced_yes': { title: 'Azure DevOps AZ-400', desc: 'Master DevOps on Microsoft Azure at an expert level.', action: 'enroll' },
  'devops_upskill_beginner_yes': { title: 'DevOps Tools & Training', desc: 'Learn Docker, Jenkins, Kubernetes, and CI/CD pipelines.', action: 'enroll' },
  'devops_upskill_intermediate_yes': { title: 'DevOps Exin Master', desc: 'Deepen your DevOps knowledge with an industry-recognized cert.', action: 'enroll' },
  'devops_upskill_advanced_yes': { title: 'Azure DevOps AZ-400', desc: 'Implement end-to-end DevOps practices on Azure.', action: 'enroll' },
  'devops_team_any_any': { title: 'Corporate DevOps Training', desc: 'Custom DevOps upskilling programs for your engineering team.', action: 'contact' },

  // AI & ML
  'ai_certify_beginner_yes': { title: 'CPMAI & AI Project Management', desc: 'Learn AI project management and implementation fundamentals.', action: 'enroll' },
  'ai_upskill_beginner_yes': { title: 'CPMAI & AI Project Management', desc: 'Build practical AI skills for managing ML projects.', action: 'enroll' },
  'ai_upskill_intermediate_yes': { title: 'AI in Testing (Automation)', desc: 'Apply AI and ML techniques to automated testing.', action: 'enroll' },
  'ai_masters_any_any': { title: 'AI & Machine Learning Master\'s Program', desc: 'Comprehensive AI program spanning ML, deep learning, and AI project management.', action: 'enroll' },
  'ai_team_any_any': { title: 'Corporate AI Training', desc: 'Custom AI/ML training programs for your organization.', action: 'contact' },

  // Software Testing
  'testing_certify_beginner_yes': { title: 'ISTQB Foundation', desc: 'Start your software testing career with ISTQB certification.', action: 'enroll' },
  'testing_certify_intermediate_yes': { title: 'Automation Testing Master\'s Program', desc: 'Master test automation frameworks and tools.', action: 'enroll' },
  'testing_upskill_beginner_yes': { title: 'ISTQB Foundation', desc: 'Learn software testing principles and best practices.', action: 'enroll' },
  'testing_upskill_intermediate_yes': { title: 'Automation Testing Master\'s Program', desc: 'Build expertise in Selenium, frameworks, and CI/CD testing.', action: 'enroll' },
  'testing_team_any_any': { title: 'Corporate Testing Training', desc: 'Custom ISTQB and automation testing programs for teams.', action: 'contact' },

  // Business Analysis
  'ba_certify_beginner_yes': { title: 'CBAP', desc: 'Start your business analysis career with CBAP certification.', action: 'enroll' },
  'ba_certify_intermediate_yes': { title: 'CBAP', desc: 'Validate your business analysis expertise with IIBA certification.', action: 'enroll' },
  'ba_certify_advanced_yes': { title: 'TOGAF Level 1 & 2', desc: 'Combine BA skills with enterprise architecture expertise.', action: 'enroll' },
  'ba_upskill_intermediate_yes': { title: 'CBAP', desc: 'Deepen your business analysis skills and advance your career.', action: 'enroll' },
  'ba_upskill_advanced_yes': { title: 'TOGAF Level 1 & 2', desc: 'Architect business solutions with the TOGAF framework.', action: 'enroll' },
  'ba_team_any_any': { title: 'Corporate BA Training', desc: 'Customized business analysis training for your team.', action: 'contact' },
}

const defaultRecommendation = { title: 'Contact us', desc: 'Talk to our learning advisor for personalized guidance.', action: 'contact' }

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
    const interest = answers.interest || 'any'
    const goal = answers.goal || 'any'
    const exp = answers['exam-plan'] || 'any'
    const key = `${interest}_${goal}_${answers.experience || 'any'}_${exp}`
    const direct = recommendations[key]
    if (direct) return direct
    const fallbackKey = `${interest}_${goal}_any_any`
    const fallback = recommendations[fallbackKey]
    if (fallback) return fallback
    const categoryFallback = `${interest}_certify_any_any`
    return recommendations[categoryFallback] || defaultRecommendation
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
            Find Your Perfect Fit
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer 7 quick questions and we'll recommend the perfect training program for your goals.
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
                    <div className={`grid gap-3 ${currentQ.options.length > 6 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
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

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10 mb-8">
                  <h4 className="text-3xl font-bold text-primary mb-2">{result.title}</h4>
                  <p className="text-gray-600">{result.desc}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-left">
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-border-gray">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Interest</span>
                    <p className="text-sm font-semibold text-dark mt-0.5 capitalize">{answers.interest?.replace(/-/g, ' ') || '-'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-border-gray">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Goal</span>
                    <p className="text-sm font-semibold text-dark mt-0.5 capitalize">{answers.goal || '-'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-border-gray">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Experience</span>
                    <p className="text-sm font-semibold text-dark mt-0.5 capitalize">{answers.experience || '-'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-border-gray">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Exam Plan</span>
                    <p className="text-sm font-semibold text-dark mt-0.5">
                      {answers['exam-plan'] === 'yes' ? 'Get Certified' :
                       answers['exam-plan'] === 'later' ? 'Maybe Later' :
                       answers['exam-plan'] === 'no' ? 'Skills Only' : '-'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-border-gray">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Commitment</span>
                    <p className="text-sm font-semibold text-dark mt-0.5">
                      {answers.commitment === 'light' ? '<5 hrs/wk' :
                       answers.commitment === 'moderate' ? '5-10 hrs/wk' :
                       answers.commitment === 'intensive' ? '10-15 hrs/wk' :
                       answers.commitment === 'fulltime' ? '15+ hrs/wk' : '-'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-border-gray">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Schedule</span>
                    <p className="text-sm font-semibold text-dark mt-0.5">
                      {answers.schedule === 'weekday-evening' ? 'Evenings' :
                       answers.schedule === 'weekend' ? 'Weekends' :
                       answers.schedule === 'flexible' ? 'Flexible' : '-'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-border-gray">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Format</span>
                    <p className="text-sm font-semibold text-dark mt-0.5">
                      {answers.format === 'live' ? 'Live' :
                       answers.format === 'hands-on' ? 'Hands-on' :
                       answers.format === 'mixed' ? 'Mixed' : '-'}
                    </p>
                  </div>
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
