import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { BookOpen, Search, Phone, CreditCard, Play, Award } from 'lucide-react'

const steps = [
  { icon: Search, title: 'Choose Your Course', desc: 'Browse our 50+ certification programs. Compare course details, syllabus, batch schedules, and fees. Use the course finder or contact us for personalized recommendations.' },
  { icon: Phone, title: 'Contact & Enroll', desc: 'Reach out via phone (+91 89569 63953), email (contact@neoskills.co.in), or the contact form on our website. Our admissions team will guide you through the enrollment process, confirm batch availability, and share payment options.' },
  { icon: CreditCard, title: 'Complete Payment', desc: 'Pay the course fee via our secure payment gateway. We accept credit/debit cards, UPI, net banking, and EMI options (subject to eligibility). You will receive a payment confirmation and invoice via email.' },
  { icon: Play, title: 'Access Live Training', desc: 'Join live instructor-led sessions as per your batch schedule. You will receive login details, course materials, and session links before the batch starts. Sessions are conducted via Zoom/Google Meet.' },
  { icon: Award, title: 'Get Certified', desc: 'Complete the training, practice with mock exams, and appear for the vendor certification exam. We provide exam registration guidance and preparation support to help you succeed.' },
]

export default function EnrollmentGuide() {
  return (
    <>
      <Helmet>
        <title>Enrollment Guide | NeoSkills Learning Solutions</title>
        <meta name="description" content="Step-by-step guide to enroll in NeoSkills courses. Choose a course, complete payment, attend live training, and get certified." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <Link to="/" className="text-primary hover:underline text-sm">&larr; Home</Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl"><BookOpen className="text-primary" size={28} /></div>
            <div><h1 className="text-3xl font-bold text-gray-900">Enrollment Guide</h1><p className="text-gray-500">Your step-by-step path to certification success</p></div>
          </div>
          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="bg-white rounded-2xl shadow-sm border p-6 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="text-primary" size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to start your journey?</h2>
            <p className="text-white/90 mb-6">Browse our courses and enroll today.</p>
            <Link to="/#courses" className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">Browse All Courses</Link>
          </div>
        </div>
      </div>
    </>
  )
}
