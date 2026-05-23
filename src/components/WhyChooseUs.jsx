import React from 'react'
import { motion } from 'framer-motion'
import { useEnroll } from '../context/EnrollContext'
import {
  Users, Monitor, Award, BarChart3, BadgeCheck,
  GraduationCap, BookOpen, Globe, Star, Shield,
  CheckCircle, ArrowRight
} from 'lucide-react'

const stats = [
  { value: '50K+', label: 'Professionals Certified', icon: Users },
  { value: '95%', label: 'Placement Rate', icon: BarChart3 },
  { value: '50+', label: 'Certification Programs', icon: BookOpen },
  { value: '4.8/5', label: 'Learner Satisfaction', icon: Star },
]

const benefits = [
  {
    icon: Monitor,
    title: 'Live Instructor-Led Training',
    desc: 'Interactive virtual classrooms with real-time Q&A, hands-on labs, and direct access to certified practitioners with 10+ years of industry experience.',
    highlight: 'Industry experts',
  },
  {
    icon: Shield,
    title: 'Guaranteed Batch Runs',
    desc: 'Every scheduled batch runs as planned — no cancellations, no delays. Your training timeline is protected from day one.',
    highlight: '100% batch assurance',
  },
  {
    icon: GraduationCap,
    title: 'End-to-End Exam Support',
    desc: 'Mock tests, exam dumps, study kits, and registration guidance included. We prepare you to pass on your first attempt.',
    highlight: '90% first-attempt pass rate',
  },
  {
    icon: Globe,
    title: 'Flexible Learning Options',
    desc: 'Choose weekday evenings, weekend batches, or self-paced learning. Switch between modes if your schedule changes mid-course.',
    highlight: '3 flexible formats',
  },
  {
    icon: BadgeCheck,
    title: 'Globally Recognized Certifications',
    desc: 'Official partner of AWS, Microsoft, PMI, PeopleCert, Scrum Alliance, and IEEE. Your certificate is respected worldwide.',
    highlight: '7 global partnerships',
  },
  {
    icon: Award,
    title: 'Career Acceleration Program',
    desc: 'Resume building, LinkedIn optimization, mock interviews, and direct placement support with 500+ hiring partners.',
    highlight: '500+ hiring partners',
  },
]

const trustSignals = [
  { icon: CheckCircle, text: 'ISO Certified Learning Provider' },
  { icon: CheckCircle, text: 'Govt. Registered Training Institute' },
  { icon: CheckCircle, text: 'EMI & Refund Options Available' },
  { icon: CheckCircle, text: 'Lifetime Access to Course Materials' },
]

export default function WhyChooseUs() {
  const { openEnroll } = useEnroll()

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,86,210,0.03)_0%,_transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,86,210,0.03)_0%,_transparent_60%)]"></div>

      {/* Stats Strip — anchored to top */}
      <div className="relative z-10 border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => {
              const SvgIcon = s.icon
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 text-primary mb-3">
                    <SvgIcon size={18} />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-primary/5 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Star size={14} />
            Why NeoSkills?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Built for Your Success
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Every element of our training is designed around one goal — helping you earn your certification and advance your career with confidence.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white shadow-sm">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1.5">{b.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                    <span className="inline-block mt-3 text-xs font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                      {b.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustSignals.map((t, i) => {
              const Icon = t.icon
              return (
                <div key={i} className="flex items-center gap-3">
                  <Icon size={18} className="text-primary shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{t.text}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={openEnroll}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/20"
          >
            Start Your Journey <ArrowRight size={18} />
          </button>
          <p className="text-xs text-gray-400 mt-3">No commitment required. Free career counseling available.</p>
        </motion.div>
      </div>
    </section>
  )
}


