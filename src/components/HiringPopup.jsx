import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle, Briefcase, MapPin, Clock, Upload, AlertCircle } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const JOBS_API = BACKEND_URL ? `${BACKEND_URL}/api/jobs` : '/api/jobs'
const APPLY_API = BACKEND_URL ? `${BACKEND_URL}/api/job-applications` : '/api/job-applications'

export default function HiringPopup() {
  const [show, setShow] = useState(false)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState('list')
  const [selectedJob, setSelectedJob] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [file, setFile] = useState(null)
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const shownRef = useRef(false)

  useEffect(() => {
    fetch(JOBS_API)
      .then(r => r.json())
      .then(data => {
        const active = (Array.isArray(data) ? data : []).filter(j => j.status !== 'closed')
        setJobs(active)
      })
      .catch(() => setJobs([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!shownRef.current) {
        shownRef.current = true
        setShow(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = useCallback(() => {
    setShow(false)
  }, [])

  const handleSelectJob = (job) => {
    setSelectedJob(job)
    setForm({ name: '', email: '', phone: '', message: '' })
    setFile(null)
    setSubmitted(false)
    setError('')
    setStep('form')
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email) {
      setError('Name and email are required')
      return
    }
    setSending(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('message', form.message)
      fd.append('jobId', selectedJob?.id || '')
      fd.append('jobTitle', selectedJob?.title || '')
      if (file) fd.append('cv', file)

      const res = await fetch(APPLY_API, { method: 'POST', body: fd })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Submission failed')

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10 text-gray-600"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-500 mb-6">We have received your application for <strong>{selectedJob?.title}</strong>. Our HR team will review and get back to you.</p>
                <button
                  onClick={() => setShow(false)}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : step === 'list' ? (
              <>
                <div className="bg-gradient-to-r from-primary to-blue-800 p-8 text-white">
                  <div className="flex items-center gap-2 text-accent font-semibold text-sm mb-2">
                    <Briefcase size={14} />
                    We're Hiring!
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Join Our Team</h3>
                  <p className="text-white/80 text-sm">
                    Explore open positions and apply directly. We're looking for talented individuals.
                  </p>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="text-center py-8 text-gray-400">Loading positions...</div>
                  ) : jobs.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Briefcase size={40} className="mx-auto mb-3 text-gray-300" />
                      <p>No open positions right now.</p>
                      <p className="text-xs mt-1">Check back later!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {jobs.map((job) => (
                        <button
                          key={job.id}
                          onClick={() => handleSelectJob(job)}
                          className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-primary/40 hover:bg-blue-50/30 transition-all group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h4 className="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors">{job.title}</h4>
                              <div className="flex flex-wrap gap-2 mt-1.5">
                                {job.department && (
                                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                    <Briefcase size={12} />
                                    {job.department}
                                  </span>
                                )}
                                {job.location && (
                                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                    <MapPin size={12} />
                                    {job.location}
                                  </span>
                                )}
                                {job.type && (
                                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                    <Clock size={12} />
                                    {job.type}
                                  </span>
                                )}
                              </div>
                              {job.experience && (
                                <p className="text-xs text-gray-400 mt-1">Exp: {job.experience}</p>
                              )}
                            </div>
                            <span className="shrink-0 text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1 group-hover:bg-primary group-hover:text-white transition-all">
                              Apply
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-primary to-blue-800 p-8 text-white">
                  <button
                    onClick={() => setStep('list')}
                    className="text-white/70 hover:text-white text-sm mb-3 flex items-center gap-1 transition-colors"
                  >
                    ← Back to positions
                  </button>
                  <h3 className="text-xl font-bold mb-1">Apply for {selectedJob?.title}</h3>
                  <p className="text-white/80 text-sm">
                    {selectedJob?.department} &middot; {selectedJob?.location}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">Upload CV (PDF/DOC, max 10MB)</label>
                    <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary/40 transition-colors text-sm text-gray-500">
                      <Upload size={18} className="text-gray-400" />
                      <span className="flex-1">{file ? file.name : 'Choose file'}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Cover note (optional)"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  />

                  {error && (
                    <div className="flex items-center gap-2 text-red-500 text-xs">
                      <AlertCircle size={14} />
                      {error}
                    </div>
                  )}

                  <label className="flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 shrink-0 accent-primary" />
                    <span>I authorize NeoSkills to process my application and contact me regarding this position.</span>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? 'Submitting...' : (
                      <>
                        Submit Application
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
