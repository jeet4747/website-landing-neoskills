import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Briefcase, MapPin, Clock, IndianRupee, Calendar, Filter, Search, ChevronRight, Building2, Users, BookOpen, ExternalLink, X, Upload, CheckCircle, AlertCircle } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const API_URL = BACKEND_URL ? `${BACKEND_URL}/api/jobs` : '/api/jobs'
const APPLY_API = BACKEND_URL ? `${BACKEND_URL}/api/job-applications` : '/api/job-applications'

const typeStyles = {
  'Full-time': 'bg-blue-50 text-blue-700 border-blue-200',
  'Part-time': 'bg-purple-50 text-purple-700 border-purple-200',
  'Contract': 'bg-amber-50 text-amber-700 border-amber-200',
  'Internship': 'bg-green-50 text-green-700 border-green-200',
}

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDept, setFilterDept] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [selectedJob, setSelectedJob] = useState(null)

  // Application modal state
  const [showApply, setShowApply] = useState(false)
  const [appForm, setAppForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [appFile, setAppFile] = useState(null)
  const [appSubmitting, setAppSubmitting] = useState(false)
  const [appSubmitted, setAppSubmitted] = useState(false)
  const [appError, setAppError] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        const active = (Array.isArray(data) ? data : []).filter(j => j.status !== 'closed')
        setJobs(active)
      })
      .catch(() => setJobs([]))
      .finally(() => setLoading(false))
  }, [])

  const departments = [...new Set(jobs.map(j => j.department).filter(Boolean))]
  const types = [...new Set(jobs.map(j => j.type).filter(Boolean))]

  const filtered = jobs.filter(j => {
    if (filterDept !== 'all' && j.department !== filterDept) return false
    if (filterType !== 'all' && j.type !== filterType) return false
    if (search) {
      const q = search.toLowerCase()
      const match = j.title?.toLowerCase().includes(q) || j.department?.toLowerCase().includes(q) || j.summary?.toLowerCase().includes(q) || j.requirements?.some(r => r.toLowerCase().includes(q))
      if (!match) return false
    }
    return true
  })

  const handleApplyOpen = (job) => {
    setSelectedJob(job)
    setAppForm({ name: '', email: '', phone: '', message: '' })
    setAppFile(null)
    setAppSubmitted(false)
    setAppError('')
    setShowApply(true)
  }

  const handleAppSubmit = async (e) => {
    e.preventDefault()
    setAppError('')
    if (!appForm.name || !appForm.email) {
      setAppError('Name and email are required')
      return
    }
    setAppSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('name', appForm.name)
      fd.append('email', appForm.email)
      fd.append('phone', appForm.phone)
      fd.append('message', appForm.message)
      fd.append('jobId', selectedJob?.id || '')
      fd.append('jobTitle', selectedJob?.title || '')
      if (appFile) fd.append('cv', appFile)

      const res = await fetch(APPLY_API, { method: 'POST', body: fd })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Submission failed')

      emailjs.send(
        'service_62ub16q',
        'template_l3twvqg',
        {
          user_name: appForm.name,
          user_email: appForm.email,
          user_phone: appForm.phone,
          course: `Job Application: ${selectedJob?.title || ''}`,
          message: `${appForm.message || ''}\n\nJob: ${selectedJob?.title || ''}\nCV: ${window.location.origin}/uploads/cvs/${data.application?.cvFile || ''}`,
          domain: window.location.hostname,
        },
        'S3TiyuUzfI2FRb5RG'
      )

      setAppSubmitted(true)
    } catch (err) {
      setAppError(err.message)
    }
    setAppSubmitting(false)
  }

  return (
    <>
      <Helmet>
        <title>Placement Openings - NeoSkills</title>
        <meta name="description" content="Explore current placement job openings through NeoSkills. We connect certified professionals with top companies for rewarding careers." />
      </Helmet>

      <main className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-4 backdrop-blur-sm">
                <Briefcase size={16} /> Placement Openings
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Placement Openings</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                We connect our certified professionals with top companies. Explore current placement opportunities and take the next step in your career.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats strip */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{jobs.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Open Positions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{departments.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Departments</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{types.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Employment Types</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-xs text-gray-500 mt-0.5">Certified Professionals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, departments, skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterDept}
                onChange={e => setFilterDept(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              >
                <option value="all">All Departments</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              >
                <option value="all">All Types</option>
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading jobs...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No placement openings right now</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">There are no active placements at the moment. Check back soon or contact us for upcoming opportunities.</p>
              <a href="/contact-support" className="btn-primary inline-flex items-center gap-2">Contact Us</a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Job list */}
              <div className="lg:col-span-1 space-y-3">
                {filtered.map(job => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`w-full text-left p-5 bg-white rounded-xl border shadow-sm transition-all hover:shadow-md ${
                      selectedJob?.id === job.id ? 'border-primary ring-2 ring-primary/10' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{job.department}</p>
                      </div>
                      <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${typeStyles[job.type] || 'bg-gray-50 text-gray-600'}`}>
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{job.experience}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Job detail */}
              <div className="lg:col-span-2">
                {!selectedJob ? (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">Select a position to view details</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                          <p className="text-sm text-gray-500 mt-1">{selectedJob.department}</p>
                        </div>
                        <span className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border ${typeStyles[selectedJob.type] || 'bg-gray-50 text-gray-600'}`}>
                          {selectedJob.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><MapPin size={15} />{selectedJob.location}</span>
                        <span className="flex items-center gap-1.5"><Clock size={15} />Exp: {selectedJob.experience}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={15} />Posted: {selectedJob.postedDate}</span>
                        {selectedJob.salaryRange && (
                          <span className="flex items-center gap-1.5"><IndianRupee size={15} />{selectedJob.salaryRange}</span>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-6">
                      {selectedJob.summary && (
                        <p className="text-gray-600 leading-relaxed">{selectedJob.summary}</p>
                      )}

                      {selectedJob.description && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">About This Role</h3>
                          <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">{selectedJob.description}</p>
                        </div>
                      )}

                      {selectedJob.responsibilities?.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Key Responsibilities</h3>
                          <ul className="space-y-2">
                            {selectedJob.responsibilities.map((r, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <ChevronRight size={14} className="mt-0.5 shrink-0 text-primary" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedJob.requirements?.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Requirements</h3>
                          <ul className="space-y-2">
                            {selectedJob.requirements.map((r, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <ChevronRight size={14} className="mt-0.5 shrink-0 text-primary" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedJob.niceToHave?.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Nice to Have</h3>
                          <ul className="space-y-2">
                            {selectedJob.niceToHave.map((r, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <ChevronRight size={14} className="mt-0.5 shrink-0 text-primary" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedJob.benefits?.length > 0 && (
                        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                          <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-3">Benefits</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedJob.benefits.map((b, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <p className="text-xs text-gray-500">
                          Qualified candidates can apply through NeoSkills. Submit your CV and details below.
                        </p>
                        <button
                          onClick={() => handleApplyOpen(selectedJob)}
                          className="btn-primary inline-flex items-center gap-2 text-sm"
                        >
                          <ExternalLink size={15} />
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <Building2 size={40} className="mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Hired</h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Complete one of our certification programs and get access to exclusive placement opportunities with our partner companies.
            </p>
            <a href="/enroll" className="btn-primary inline-flex items-center gap-2">
              Enroll in a Program
            </a>
          </div>
        </section>

        {/* ─── Apply Modal ─── */}
        <AnimatePresence>
          {showApply && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => { if (!appSubmitting) setShowApply(false) }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Apply for this Position</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{selectedJob?.title}</p>
                  </div>
                  <button onClick={() => setShowApply(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                    <X size={18} />
                  </button>
                </div>

                {appSubmitted ? (
                  <div className="p-8 text-center">
                    <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-sm text-gray-500 mb-6">Your CV has been received. Our team will review your application and reach out.</p>
                    <button onClick={() => setShowApply(false)} className="btn-primary text-sm">Done</button>
                  </div>
                ) : (
                  <form onSubmit={handleAppSubmit} className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input type="text" required value={appForm.name} onChange={e => setAppForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input type="email" required value={appForm.email} onChange={e => setAppForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" value={appForm.phone} onChange={e => setAppForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CV / Resume *</label>
                      <div className="relative">
                        <input type="file" accept=".pdf,.doc,.docx" onChange={e => setAppFile(e.target.files[0] || null)}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white file:cursor-pointer hover:file:bg-blue-800" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5">Accepted: PDF, DOCX (max 10MB)</p>
                    </div>
                    {appFile && (
                      <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <Upload size={14} />
                        {appFile.name} ({(appFile.size / 1024 / 1024).toFixed(1)} MB)
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                      <textarea value={appForm.message} onChange={e => setAppForm(f => ({ ...f, message: e.target.value }))} rows={3}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Anything you'd like to add..." />
                    </div>

                    {appError && (
                      <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                        <AlertCircle size={15} />
                        {appError}
                      </div>
                    )}

                    <button type="submit" disabled={appSubmitting}
                      className="w-full py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {appSubmitting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Submitting...</> : 'Submit Application'}
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}
