import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { getAllResolvedCourses } from '../data/catalogBuilder'
import { courseStructure } from '../data/courseStructure'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const COURSES_API = BACKEND_URL ? `${BACKEND_URL}/api/courses` : '/api/courses'
const JOBS_API = BACKEND_URL ? `${BACKEND_URL}/api/jobs` : '/api/jobs'
const HERO_SLIDES_API = BACKEND_URL ? `${BACKEND_URL}/api/hero-slides` : '/api/hero-slides'
const WEBINARS_API = BACKEND_URL ? `${BACKEND_URL}/api/webinars` : '/api/webinars'
const APPLICATIONS_API = BACKEND_URL ? `${BACKEND_URL}/api/job-applications` : '/api/job-applications'
const BATCHES_API = BACKEND_URL ? `${BACKEND_URL}/api/batches` : '/api/batches'
const ENROLLMENTS_API = BACKEND_URL ? `${BACKEND_URL}/api/enrollments` : '/api/enrollments'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'neoskills2026'

export default function AdminDashboard() {
  const [section, setSection] = useState('courses')

  const [courses, setCourses] = useState([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')
  const [backendOnline, setBackendOnline] = useState(null)
  const [activeTab, setActiveTab] = useState('details')
  const [unsaved, setUnsaved] = useState(false)

  // Job state
  const [jobs, setJobs] = useState([])
  const [selectedJobId, setSelectedJobId] = useState('')
  const [jobsSearch, setJobsSearch] = useState('')
  const [jobsLoading, setJobsLoading] = useState(false)

  // Hero slides state
  const [slides, setSlides] = useState([])
  const [selectedSlideId, setSelectedSlideId] = useState('')
  const [slidesLoading, setSlidesLoading] = useState(false)

  // Webinar state
  const [webinars, setWebinars] = useState([])
  const [selectedWebinarId, setSelectedWebinarId] = useState('')
  const [webinarsLoading, setWebinarsLoading] = useState(false)
  const [webinarsSearch, setWebinarsSearch] = useState('')

  // Applications state
  const [applications, setApplications] = useState([])
  const [applicationsLoading, setApplicationsLoading] = useState(false)
  const [applicationsSearch, setApplicationsSearch] = useState('')
  const [selectedAppJobId, setSelectedAppJobId] = useState('all')

  // Batches state
  const [batches, setBatches] = useState([])
  const [selectedBatchId, setSelectedBatchId] = useState('')
  const [batchesLoading, setBatchesLoading] = useState(false)
  const [batchesSearch, setBatchesSearch] = useState('')

  // Enrollments state
  const [enrollments, setEnrollments] = useState([])
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false)
  const [enrollmentsSearch, setEnrollmentsSearch] = useState('')

  // Categories state
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(-1)

  const fallbackCategoryNames = useMemo(() => {
    const names = new Set()
    for (const tab of Object.values(courseStructure)) {
      for (const name of Object.keys(tab.categories || {})) {
        names.add(name)
      }
    }
    return [...names]
  }, [])

  const GRADIENT_OPTIONS = [
    'from-amber-600 to-amber-800',
    'from-blue-600 to-blue-800',
    'from-purple-600 to-purple-800',
    'from-green-600 to-green-800',
    'from-red-600 to-red-800',
    'from-teal-600 to-teal-800',
    'from-indigo-600 to-indigo-800',
    'from-pink-600 to-pink-800',
    'from-primary to-blue-700',
  ]

  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/health`, { signal: AbortSignal.timeout(3000) })
      setBackendOnline(res.ok)
    } catch {
      setBackendOnline(false)
    }
  }, [])

  const loadCourses = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(COURSES_API, { signal: AbortSignal.timeout(5000) })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const fallback = getAllResolvedCourses()
        const merged = data.map(apiCourse => {
          const gen = fallback.find(c =>
            (c.slug || '').toLowerCase() === (apiCourse.slug || '').toLowerCase() ||
            c.id === apiCourse.id ||
            (c.title || '').toLowerCase() === (apiCourse.title || '').toLowerCase()
          )
          const base = gen
            ? {
                ...gen,
                ...apiCourse,
                stats: { ...gen.stats, ...(apiCourse.stats || {}) },
                feeDetails: { ...gen.feeDetails, ...(apiCourse.feeDetails || {}) },
                certificate: { ...gen.certificate, ...(apiCourse.certificate || {}) },
                enrollmentCount: apiCourse.enrollmentCount ?? gen.enrollmentCount,
              }
            : { ...apiCourse }
          const genOk = gen || fallback.find(c =>
            (c.slug || '').toLowerCase() === (apiCourse.slug || '').toLowerCase() ||
            (c.title || '').toLowerCase() === (apiCourse.title || '').toLowerCase()
          )
          if (genOk) {
            base.examBody = genOk.examBody ?? ''
            base.examBodyUrl = genOk.examBodyUrl ?? ''
            base.certValidity = genOk.certValidity ?? ''
            base.careerOpportunities = genOk.careerOpportunities ?? []
          } else {
            base.examBody = ''
            base.examBodyUrl = ''
            base.certValidity = ''
            base.careerOpportunities = []
          }
          return base
        })
        // Append catalog-only courses (e.g. newly added courses like PSK that aren't in DB yet)
        const dbSlugs = new Set(merged.map(c => (c.slug || '').toLowerCase()))
        for (const staticCourse of fallback) {
          if (!dbSlugs.has((staticCourse.slug || '').toLowerCase())) {
            merged.push({ ...staticCourse, _isCatalogOnly: true })
          }
        }
        setCourses(merged)
        if (!selectedSlug) setSelectedSlug(merged[0]?.slug || merged[0]?.id || '')
      } else {
        throw new Error('Empty data')
      }
    } catch {
      const fallback = getAllResolvedCourses()
      setCourses(fallback)
      setError('Note: Using local catalog (server offline). Edits cannot be saved.')
      if (!selectedSlug) setSelectedSlug(fallback[0]?.slug || '')
    }
    setLoading(false)
  }, [])

  const loadJobs = useCallback(async () => {
    setJobsLoading(true)
    setError('')
    try {
      const res = await fetch(JOBS_API, { signal: AbortSignal.timeout(5000) })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      if (Array.isArray(data)) {
        setJobs(data.length > 0 ? data : [])
        if (!selectedJobId && data.length > 0) setSelectedJobId(data[0].id)
      }
    } catch {
      setJobs([])
      setError('Backend offline. Jobs can be edited locally but saving requires the server.')
    }
    setJobsLoading(false)
  }, [])

  const DEFAULT_SLIDES = [
    {
      id: 'slide_pmp',
      title: 'Project Management Professional (PMP)',
      subtitle: 'Professional Certification',
      description: 'Globally recognised certification for project managers. Master leadership, agile, and strategic business management skills.',
      badge: 'GOLD STANDARD',
      gradient: 'from-amber-600 to-amber-800',
      courseSlug: 'pmp',
      duration: '4 Days',
      nextBatch: 'Jun 15',
      active: true,
      order: 1,
    },
    {
      id: 'slide_itil',
      title: 'ITIL 4 Foundation',
      subtitle: 'Professional Certification',
      description: 'The world\'s leading framework for IT service management. Align IT services with business needs and deliver value.',
      badge: 'FEATURED PROGRAM',
      gradient: 'from-blue-600 to-blue-800',
      courseSlug: 'itil-4-foundation',
      duration: '3 Days',
      nextBatch: 'Jun 20',
      active: true,
      order: 2,
    },
    {
      id: 'slide_prince2',
      title: 'PRINCE2 Foundation & Practitioner',
      subtitle: 'Professional Certification',
      description: 'The most widely recognised project management methodology. Gain end-to-end control of any project, any size, any industry.',
      badge: 'MOST POPULAR',
      gradient: 'from-purple-600 to-purple-800',
      courseSlug: 'prince2-f-and-p',
      duration: '5 Days',
      nextBatch: 'Jun 25',
      active: true,
      order: 3,
    },
  ]

  const loadSlides = useCallback(async () => {
    setSlidesLoading(true)
    setError('')
    try {
      const res = await fetch(HERO_SLIDES_API, { signal: AbortSignal.timeout(5000) })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0))
        setSlides(sorted)
        if (!selectedSlideId) setSelectedSlideId(sorted[0].id)
      } else {
        setSlides(DEFAULT_SLIDES)
        if (!selectedSlideId) setSelectedSlideId(DEFAULT_SLIDES[0].id)
      }
    } catch {
      setSlides(DEFAULT_SLIDES)
      if (!selectedSlideId) setSelectedSlideId(DEFAULT_SLIDES[0].id)
      setError('Backend offline. Slides can be edited locally but saving requires the server.')
    }
    setSlidesLoading(false)
  }, [])

  const loadWebinars = useCallback(async () => {
    setWebinarsLoading(true)
    setError('')
    try {
      const res = await fetch(WEBINARS_API, { signal: AbortSignal.timeout(5000) })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      if (Array.isArray(data)) {
        setWebinars(data.length > 0 ? data : [])
        if (!selectedWebinarId && data.length > 0) setSelectedWebinarId(data[0].id || data[0].slug)
      }
    } catch {
      setWebinars([])
      setError('Backend offline. Webinars can be edited locally but saving requires the server.')
    }
    setWebinarsLoading(false)
  }, [])

  const loadApplications = useCallback(async () => {
    setApplicationsLoading(true)
    setError('')
    try {
      const res = await fetch(APPLICATIONS_API, {
        headers: { 'x-admin-password': ADMIN_PASSWORD },
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      setApplications(Array.isArray(data) ? data : [])
    } catch {
      setApplications([])
      setError('Failed to load applications')
    }
    setApplicationsLoading(false)
  }, [])

  const loadBatches = useCallback(async () => {
    setBatchesLoading(true)
    setError('')
    try {
      const res = await fetch(BATCHES_API, { signal: AbortSignal.timeout(5000) })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      if (Array.isArray(data)) {
        setBatches(data.length > 0 ? data : [])
        if (!selectedBatchId && data.length > 0) setSelectedBatchId(data[0].id || data[0].slug)
      }
    } catch {
      setBatches([])
      setError('Backend offline. Batches can be edited locally but saving requires the server.')
    }
    setBatchesLoading(false)
  }, [])

  const loadEnrollments = useCallback(async () => {
    setEnrollmentsLoading(true)
    setError('')
    try {
      const res = await fetch(ENROLLMENTS_API, {
        headers: { 'x-admin-password': ADMIN_PASSWORD },
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      setEnrollments(Array.isArray(data) ? data : [])
    } catch {
      setEnrollments([])
      setError('Failed to load enrollments')
    }
    setEnrollmentsLoading(false)
  }, [])

  const CATEGORIES_API_URL = BACKEND_URL ? `${BACKEND_URL}/api/categories` : '/api/categories'

  const loadCategories = useCallback(async () => {
    setCategoriesLoading(true)
    setError('')
    try {
      const res = await fetch(CATEGORIES_API_URL, { signal: AbortSignal.timeout(5000) })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        setCategories(data)
        if (selectedCategoryIdx === -1) setSelectedCategoryIdx(0)
      } else {
        setCategories(fallbackCategoryNames.map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-') })))
      }
    } catch {
      setCategories(fallbackCategoryNames.map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-'), description: '' })))
    }
    setCategoriesLoading(false)
  }, [])

  const switchSection = (s) => {
    setSection(s)
    setError('')
    setSuccess('')
    setUnsaved(false)
    if (s === 'jobs' && jobs.length === 0) loadJobs()
    if (s === 'hero-slides' && slides.length === 0) loadSlides()
    if (s === 'webinars' && webinars.length === 0) loadWebinars()
    if (s === 'applications') loadApplications()
    if (s === 'batches' && batches.length === 0) loadBatches()
    if (s === 'enrollments') loadEnrollments()
    if (s === 'categories' && categories.length === 0) loadCategories()
    if (s === 'keywords' && courses.length === 0) loadCourses()
  }

  useEffect(() => {
    if (auth) {
      checkHealth()
      if (section === 'courses') { loadCourses(); loadCategories() }
      if (section === 'jobs') loadJobs()
    }
  }, [auth])

  useEffect(() => {
    if (auth && section === 'courses') loadCourses()
    if (auth && section === 'jobs') loadJobs()
    if (auth && section === 'hero-slides') loadSlides()
    if (auth && section === 'webinars') loadWebinars()
    if (auth && section === 'applications') loadApplications()
    if (auth && section === 'batches') loadBatches()
    if (auth && section === 'enrollments') loadEnrollments()
    if (auth && section === 'categories') loadCategories()
  }, [section])

  const addCourse = () => {
    const newSlug = `course-${Date.now()}`
    const newCourse = {
      slug: newSlug,
      category: '',
      title: 'New Course',
      fullTitle: 'New Course Title',
      icon: 'Award',
      summary: 'Course summary here.',
      description: 'Full course description.',
      stats: { duration: '', nextBatch: '', level: 'Beginner', mode: 'Live online', hours: '', certificate: '', placement: '' },
      highlights: ['Key highlight 1', 'Key highlight 2'],
      whoShouldJoin: ['Target audience 1'],
      syllabus: [{ week: 'Module 1 — Introduction', topics: ['Topic 1', 'Topic 2'] }],
      certificate: { title: 'Certificate title', description: 'Official certificates or digital badges are issued by the accrediting vendor when you meet their exam and eligibility rules. NeoSkills training focuses on readiness and applied skills.', image: '/images/nsl-logo.svg' },
      feeDetails: { training: 0, exam: 0, support: 0, total: 0, emi: 'EMI or installment options may be available — ask admissions', refund: 'Refund and transfer policy as per NeoSkills enrollment terms', includes: ['Live training and mentor support', 'Practice materials and assignments (where applicable)', 'Batch coordination and learner success check-ins', 'EMI or installment options may be available — ask admissions', 'Refund and transfer policy as per NeoSkills enrollment terms'] },
      feeDisclaimer: '',
      trainers: [{ name: 'Expert Instructor', bio: 'Certified professional with extensive industry experience in this domain.', role: 'Lead Instructor', experience: '10+ years', certifications: 'Industry certifications aligned to this track', image: '/images/nsl-logo.svg' }],
      examBody: '',
      examBodyUrl: '',
      certValidity: '',
      enrollmentCount: 0,
      careerOpportunities: [],
      categorySlug: '',
      learnMoreUrl: 'https://www.neoskills.co.in/',
      alternateSlugs: [],
    }
    setCourses(prev => [...prev, newCourse])
    setSelectedSlug(newSlug)
    setUnsaved(true)
  }

  const deleteCourse = () => {
    if (!selectedSlug) return
    setCourses(prev => prev.filter(c => (c.slug || c.id) !== selectedSlug))
    const remaining = courses.filter(c => (c.slug || c.id) !== selectedSlug)
    setSelectedSlug(remaining[0]?.slug || remaining[0]?.id || '')
    setUnsaved(true)
  }

  const rawSelected = courses.find(c => (c.slug || c.id) === selectedSlug) || null
  const selected = useMemo(() => {
    if (!rawSelected) return null
    const gen = getAllResolvedCourses().find(g =>
      (g.slug || '').toLowerCase() === (rawSelected.slug || '').toLowerCase() ||
      (g.title || '').toLowerCase() === (rawSelected.title || '').toLowerCase()
    )
    return gen ? {
      ...rawSelected,
      examBody: gen.examBody || '',
      examBodyUrl: gen.examBodyUrl || '',
      certValidity: gen.certValidity || '',
      careerOpportunities: gen.careerOpportunities || [],
    } : rawSelected
  }, [rawSelected])
  const filtered = courses.filter(c =>
    !search || (c.title || c.fullTitle || c.slug || '').toLowerCase().includes(search.toLowerCase())
  )

  const setField = (path, value) => {
    setCourses(prev => {
      const next = prev.map(c => {
        if ((c.slug || c.id) !== selectedSlug) return c
        const clone = JSON.parse(JSON.stringify(c))
        const keys = path.split('.')
        let node = clone
        for (let i = 0; i < keys.length - 1; i++) {
          if (!node[keys[i]] || typeof node[keys[i]] !== 'object') node[keys[i]] = {}
          node = node[keys[i]]
        }
        node[keys[keys.length - 1]] = value
        return clone
      })
      return next
    })
    if (path === 'slug' && value) setSelectedSlug(value)
    setUnsaved(true)
  }

  const handleSave = async () => {
    if (!selected || !backendOnline) {
      setError('Backend is offline. Cannot save.')
      return
    }
    setSaving(true)
    setError('')
    setSuccess('')
    const fixed = courses.map(c => {
      const { _isCatalogOnly, ...clean } = c
      if (!clean.feeDetails) return { ...clean, feeDetails: { total: 0 } }
      return clean
    })
    try {
      const res = await fetch(COURSES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(fixed),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Save failed')
      setSuccess('All course changes saved successfully.')
      setUnsaved(false)
      loadCourses()
    } catch (err) {
      setError('Save failed: ' + (err.message || 'Connection error'))
    }
    setSaving(false)
  }

  // ─── Job Handlers ───
  const selectedJob = jobs.find(j => j.id === selectedJobId) || null
  const filteredJobs = jobs.filter(j =>
    !jobsSearch || j.title?.toLowerCase().includes(jobsSearch.toLowerCase()) || j.department?.toLowerCase().includes(jobsSearch.toLowerCase())
  )

  const setJobField = (path, value) => {
    setJobs(prev => {
      const next = prev.map(j => {
        if (j.id !== selectedJobId) return j
        const clone = JSON.parse(JSON.stringify(j))
        const keys = path.split('.')
        let node = clone
        for (let i = 0; i < keys.length - 1; i++) {
          if (!node[keys[i]] || typeof node[keys[i]] !== 'object') node[keys[i]] = {}
          node = node[keys[i]]
        }
        node[keys[keys.length - 1]] = value
        return clone
      })
      return next
    })
    setUnsaved(true)
  }

  const addJob = () => {
    const newId = `job-${Date.now()}`
    const newJob = {
      id: newId,
      title: 'New Position',
      department: '',
      location: '',
      type: 'Full-time',
      experience: '',
      postedDate: new Date().toISOString().split('T')[0],
      closingDate: '',
      status: 'active',
      summary: '',
      description: '',
      responsibilities: [''],
      requirements: [''],
      niceToHave: [''],
      benefits: [''],
      salaryRange: '',
      contactEmail: 'careers@neoskills.co.in',
      applicationUrl: '',
    }
    setJobs(prev => [...prev, newJob])
    setSelectedJobId(newId)
    setUnsaved(true)
  }

  const deleteJob = () => {
    if (!selectedJobId) return
    setJobs(prev => prev.filter(j => j.id !== selectedJobId))
    setSelectedJobId(jobs.filter(j => j.id !== selectedJobId)[0]?.id || '')
    setUnsaved(true)
  }

  const toggleJobStatus = () => {
    if (!selectedJob) return
    setJobField('status', selectedJob.status === 'active' ? 'closed' : 'active')
  }

  const handleJobsSave = async () => {
    if (!backendOnline) {
      setError('Backend is offline. Cannot save.')
      return
    }
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(JOBS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(jobs),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Save failed')
      setSuccess('All job postings saved successfully.')
      setUnsaved(false)
      loadJobs()
    } catch (err) {
      setError('Save failed: ' + (err.message || 'Connection error'))
    }
    setSaving(false)
  }

  // ─── Slide Handlers ───
  const selectedSlide = slides.find(s => s.id === selectedSlideId) || null

  const setSlideField = (field, value) => {
    setSlides(prev => prev.map(s => s.id === selectedSlideId ? { ...s, [field]: value } : s))
    setUnsaved(true)
  }

  const addSlide = () => {
    const newId = `slide-${Date.now()}`
    const newSlide = {
      id: newId,
      title: 'New Training Program',
      subtitle: 'Professional Certification',
      description: 'Describe this training program here.',
      badge: 'FEATURED',
      gradient: 'from-primary to-blue-700',
      courseSlug: '',
      duration: '',
      nextBatch: '',
      active: true,
      order: slides.length + 1,
    }
    setSlides(prev => [...prev, newSlide])
    setSelectedSlideId(newId)
    setUnsaved(true)
  }

  const deleteSlide = () => {
    if (!selectedSlideId) return
    setSlides(prev => prev.filter(s => s.id !== selectedSlideId))
    setSelectedSlideId(slides.filter(s => s.id !== selectedSlideId)[0]?.id || '')
    setUnsaved(true)
  }

  const toggleSlideActive = () => {
    if (!selectedSlide) return
    setSlideField('active', !selectedSlide.active)
  }

  const moveSlide = (dir) => {
    const idx = slides.findIndex(s => s.id === selectedSlideId)
    if (idx === -1) return
    const newIdx = idx + dir
    if (newIdx < 0 || newIdx >= slides.length) return
    const next = [...slides]
    const temp = { ...next[idx], order: next[newIdx].order }
    next[newIdx] = { ...next[newIdx], order: next[idx].order }
    next[idx] = temp
    setSlides(next.sort((a, b) => (a.order || 0) - (b.order || 0)))
    setUnsaved(true)
  }

  const handleSlidesSave = async () => {
    if (!backendOnline) {
      setError('Backend is offline. Cannot save.')
      return
    }
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(HERO_SLIDES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(slides),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Save failed')
      setSuccess('Hero slides saved successfully.')
      setUnsaved(false)
      loadSlides()
    } catch (err) {
      setError('Save failed: ' + (err.message || 'Connection error'))
    }
    setSaving(false)
  }

  // ─── Webinar Helpers ───
  const selectedWebinar = webinars.find(w => w.id === selectedWebinarId || w.slug === selectedWebinarId) || null
  const filteredWebinars = webinars.filter(w =>
    !webinarsSearch || w.title?.toLowerCase().includes(webinarsSearch.toLowerCase()) || w.slug?.toLowerCase().includes(webinarsSearch.toLowerCase())
  )

  const setWebinarField = (field, value) => {
    setWebinars(prev => prev.map(w => (w.id === selectedWebinarId || w.slug === selectedWebinarId) ? { ...w, [field]: value } : w))
    setUnsaved(true)
  }

  // Batches derived data
  const courseOptions = courses.map(c => ({ value: c.slug || c.id, label: c.fullTitle || c.title || c.slug }))
  const selectedBatch = batches.find(b => b.id === selectedBatchId || b.slug === selectedBatchId) || null
  const filteredBatches = batches.filter(b =>
    !batchesSearch || b.title?.toLowerCase().includes(batchesSearch.toLowerCase()) || b.slug?.toLowerCase().includes(batchesSearch.toLowerCase()) || b.course?.toLowerCase().includes(batchesSearch.toLowerCase())
  )

  const setBatchField = (field, value) => {
    setBatches(prev => prev.map(b => (b.id === selectedBatchId || b.slug === selectedBatchId) ? { ...b, [field]: value } : b))
    setUnsaved(true)
  }

  const handleBatchesSave = async () => {
    if (!backendOnline) {
      setError('Backend is offline. Cannot save.')
      return
    }
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(BATCHES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(batches),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Save failed')
      setSuccess('Batches saved successfully.')
      setUnsaved(false)
      loadBatches()
    } catch (err) {
      setError('Save failed: ' + (err.message || 'Connection error'))
    }
    setSaving(false)
  }

  const handleWebinarsSave = async () => {
    if (!backendOnline) {
      setError('Backend is offline. Cannot save.')
      return
    }
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(WEBINARS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(webinars),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Save failed')
      setSuccess('Webinars saved successfully.')
      setUnsaved(false)
      loadWebinars()
    } catch (err) {
      setError('Save failed: ' + (err.message || 'Connection error'))
    }
    setSaving(false)
  }

  // ─── Auth Screen ───
  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">NeoSkills Management</p>
          </div>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && password === ADMIN_PASSWORD && (setAuth(true), setPassword(''))}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all mb-4"
            autoFocus
          />
          <button
            onClick={() => password === ADMIN_PASSWORD ? (setAuth(true), setPassword('')) : setError('Incorrect password')}
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-md shadow-primary/20"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-gray-900">Admin</h1>
            <div className="flex bg-gray-100 rounded-xl p-0.5">
              <button
                onClick={() => switchSection('courses')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'courses' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => switchSection('jobs')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'jobs' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Job Postings
              </button>
              <button
                onClick={() => switchSection('hero-slides')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'hero-slides' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Hero Slides
              </button>
              <button
                onClick={() => switchSection('webinars')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'webinars' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Webinars
              </button>
              <button
                onClick={() => switchSection('batches')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'batches' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Batches
              </button>
              <button
                onClick={() => switchSection('enrollments')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'enrollments' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Enrollments
              </button>
              <button
                onClick={() => switchSection('applications')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'applications' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => switchSection('categories')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'categories' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => switchSection('keywords')}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  section === 'keywords' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Keywords
              </button>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              backendOnline === true ? 'bg-green-50 text-green-700 border border-green-200'
              : backendOnline === false ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-gray-100 text-gray-500'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                backendOnline === true ? 'bg-green-500'
                : backendOnline === false ? 'bg-red-500'
                : 'bg-gray-400'
              }`} />
              {backendOnline === true ? 'Connected'
                : backendOnline === false ? 'Offline'
                : 'Checking...'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {unsaved && (
              <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Unsaved changes
              </span>
            )}
            <button
              onClick={() => setAuth(false)}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {error && (
          <div className="mb-4 px-5 py-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 ml-3">&times;</button>
          </div>
        )}
        {success && (
          <div className="mb-4 px-5 py-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center justify-between">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="text-green-400 hover:text-green-600 ml-3">&times;</button>
          </div>
        )}

        {/* ─── COURSES SECTION ─── */}
        {section === 'courses' && (
          <>
            {loading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading courses...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <button onClick={addCourse} className="shrink-0 w-9 h-9 bg-primary text-white rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center" title="Add new course">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                    {filtered.map(c => {
                      const active = (c.slug || c.id) === selectedSlug
                      return (
                        <button
                          key={c.slug || c.id}
                          onClick={() => { setSelectedSlug(c.slug || c.id); setUnsaved(false) }}
                          className={`w-full text-left px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            active ? 'bg-primary/5 border-l-[3px] border-l-primary' : ''
                          }`}
                        >
                          <p className={`text-sm font-semibold ${active ? 'text-primary' : 'text-gray-800'}`}>
                            {c.title || c.fullTitle || c.slug}
                            {c._isCatalogOnly && <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 uppercase tracking-wide">New</span>}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{c.stats?.nextBatch || c.cohort || 'No batch date'}</p>
                        </button>
                      )
                    })}
                    {filtered.length === 0 && (
                      <p className="p-5 text-sm text-gray-400 text-center">No courses match your search.</p>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  {!selected ? (
                    <div className="p-12 text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <p>Select a course to edit</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-200 px-6">
                        <div className="flex">
                          {['details', 'pricing', 'content'].map(tab => (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`px-5 py-3.5 text-sm font-medium capitalize border-b-2 transition-colors ${
                                activeTab === tab
                                  ? 'border-primary text-primary'
                                  : 'border-transparent text-gray-500 hover:text-gray-700'
                              }`}
                            >
                              {tab === 'details' ? 'Details & Dates'
                                : tab === 'pricing' ? 'Pricing'
                                : 'Description & Content'}
                            </button>
                          ))}
                        </div>
                        <button onClick={deleteCourse} className="text-xs text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium shrink-0">Delete</button>
                      </div>

                      <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(100vh-340px)]">
                        {activeTab === 'details' && (
                          <>
                            <Field label="Course Title" value={selected.title || ''} onChange={v => setField('title', v)} />
                            <Field label="Full Title" value={selected.fullTitle || ''} onChange={v => setField('fullTitle', v)} />
                            <Field label="Slug" value={selected.slug || ''} onChange={v => setField('slug', v)} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Field label="Next Batch Date" value={selected.stats?.nextBatch || selected.cohort || ''} onChange={v => setField('stats.nextBatch', v)} />
                              <Field label="Duration" value={selected.stats?.duration || ''} onChange={v => setField('stats.duration', v)} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Level</label>
                                <select
                                  value={selected.stats?.level || ''}
                                  onChange={e => setField('stats.level', e.target.value)}
                                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                >
                                  <option value="">Select level</option>
                                  <option value="Beginner">Beginner</option>
                                  <option value="Intermediate">Intermediate</option>
                                  <option value="Advanced">Advanced</option>
                                </select>
                              </div>
                              <Field label="Mode (e.g. Live online)" value={selected.stats?.mode || ''} onChange={v => setField('stats.mode', v)} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Icon</label>
                              <select
                                value={selected.icon || 'Award'}
                                onChange={e => setField('icon', e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                              >
                                {['Award', 'BookOpen', 'Shield', 'Cloud', 'Cpu', 'Zap', 'Users', 'Briefcase', 'Code', 'TrendingUp', 'Lightbulb', 'BarChart3'].map(n => (
                                  <option key={n} value={n}>{n}</option>
                                ))}
                              </select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <Field label="Contact Hours" value={selected.stats?.hours || ''} onChange={v => setField('stats.hours', v)} />
                              <Field label="Certificate Type" value={selected.stats?.certificate || ''} onChange={v => setField('stats.certificate', v)} />
                              <Field label="Placement Support" value={selected.stats?.placement || ''} onChange={v => setField('stats.placement', v)} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                              <select
                                value={selected.category || selected.categorySlug || ''}
                                onChange={e => { setField('category', e.target.value); setField('categorySlug', e.target.value) }}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                              >
                                <option value="">Select category</option>
                                {categories.map((cat, i) => (
                                  <option key={i} value={cat.slug || cat.name}>{cat.name}</option>
                                ))}
                              </select>
                            </div>
                            <Field label="Learn More URL" value={selected.learnMoreUrl || ''} onChange={v => setField('learnMoreUrl', v)} />
                            <Field label="Alternate Slugs (comma-separated)" value={(selected.alternateSlugs || []).join(', ')} onChange={v => setField('alternateSlugs', v.split(',').map(s => s.trim()).filter(Boolean))} />
                          </>
                        )}

                        {activeTab === 'pricing' && (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                              <Field label="Exam Body (e.g. PMI®)" value={selected.examBody || ''} onChange={v => setField('examBody', v)} />
                              <Field label="Exam Body Website URL" value={selected.examBodyUrl || ''} onChange={v => setField('examBodyUrl', v)} />
                              <Field label="Cert Validity (e.g. 3 years)" value={selected.certValidity || ''} onChange={v => setField('certValidity', v)} />
                              <Field label="Enrollment Count" value={String(selected.enrollmentCount ?? 0)} onChange={v => setField('enrollmentCount', Number(v) || 0)} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Program Fee (₹)</label>
                                <input
                                  type="number"
                                  value={selected.feeDetails?.total ?? ''}
                                  onChange={e => setField('feeDetails.total', Number(e.target.value))}
                                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                              </div>
                            </div>
                            <TextAreaField label="Fee Disclaimer" value={selected.feeDisclaimer || ''} onChange={v => setField('feeDisclaimer', v)} rows={2} />
                            <Field label="EMI Info" value={selected.feeDetails?.emi || ''} onChange={v => setField('feeDetails.emi', v)} />
                            <TextAreaField label="Refund Policy" value={selected.feeDetails?.refund || ''} onChange={v => setField('feeDetails.refund', v)} rows={2} />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">What's Included (one per line)</label>
                              <textarea
                                value={(selected.feeDetails?.includes || []).join('\n')}
                                onChange={e => setField('feeDetails.includes', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))}
                                rows={4}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs"
                              />
                            </div>
                          </>
                        )}

                        {activeTab === 'content' && (
                          <>
                            <TextAreaField label="Summary (short)" value={selected.summary || ''} onChange={v => setField('summary', v)} rows={3} />
                            <TextAreaField label="Description" value={selected.description || ''} onChange={v => setField('description', v)} rows={6} />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Highlights (one per line)</label>
                              <textarea
                                value={(selected.highlights || []).join('\n')}
                                onChange={e => setField('highlights', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))}
                                rows={4}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Who Should Join (one per line)</label>
                              <textarea
                                value={(selected.whoShouldJoin || []).join('\n')}
                                onChange={e => setField('whoShouldJoin', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))}
                                rows={3}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Career Opportunities (one per line)</label>
                              <textarea
                                value={(selected.careerOpportunities || []).join('\n')}
                                onChange={e => setField('careerOpportunities', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))}
                                rows={3}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs"
                              />
                            </div>
                            <div className="border-t border-gray-200 pt-4 mt-2">
                              <h4 className="text-sm font-semibold text-gray-800 mb-3">Certificate</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Certificate Title" value={selected.certificate?.title || ''} onChange={v => setField('certificate.title', v)} />
                                <Field label="Certificate Image URL" value={selected.certificate?.image || ''} onChange={v => setField('certificate.image', v)} />
                              </div>
                              <div className="mt-3">
                                <TextAreaField label="Certificate Description" value={selected.certificate?.description || ''} onChange={v => setField('certificate.description', v)} rows={2} />
                              </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4 mt-2">
                              <h4 className="text-sm font-semibold text-gray-800 mb-3">Program Trainers</h4>
                              {(selected.trainers || []).map((trainer, tIdx) => (
                                <div key={tIdx} className="mb-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Trainer {tIdx + 1}</span>
                                    <button onClick={() => {
                                      const t = (selected.trainers || []).filter((_, i) => i !== tIdx)
                                      setField('trainers', t)
                                    }} className="text-xs text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors">Remove</button>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Field label="Name" value={trainer.name || ''} onChange={v => {
                                      const t = [...(selected.trainers || [])]
                                      t[tIdx] = { ...t[tIdx], name: v }
                                      setField('trainers', t)
                                    }} />
                                    <Field label="Role" value={trainer.role || ''} onChange={v => {
                                      const t = [...(selected.trainers || [])]
                                      t[tIdx] = { ...t[tIdx], role: v }
                                      setField('trainers', t)
                                    }} />
                                    <Field label="Experience" value={trainer.experience || ''} onChange={v => {
                                      const t = [...(selected.trainers || [])]
                                      t[tIdx] = { ...t[tIdx], experience: v }
                                      setField('trainers', t)
                                    }} />
                                    <Field label="Certifications" value={trainer.certifications || ''} onChange={v => {
                                      const t = [...(selected.trainers || [])]
                                      t[tIdx] = { ...t[tIdx], certifications: v }
                                      setField('trainers', t)
                                    }} />
                                    <Field label="Image URL" value={trainer.image || ''} onChange={v => {
                                      const t = [...(selected.trainers || [])]
                                      t[tIdx] = { ...t[tIdx], image: v }
                                      setField('trainers', t)
                                    }} className="sm:col-span-2" />
                                  </div>
                                  <div className="mt-3">
                                    <TextAreaField label="Bio" value={trainer.bio || ''} onChange={v => {
                                      const t = [...(selected.trainers || [])]
                                      t[tIdx] = { ...t[tIdx], bio: v }
                                      setField('trainers', t)
                                    }} rows={2} />
                                  </div>
                                </div>
                              ))}
                              <button onClick={() => {
                                setField('trainers', [...(selected.trainers || []), { name: '', bio: '', role: '', experience: '', certifications: '', image: '' }])
                              }} className="text-sm text-primary font-medium hover:text-blue-800 transition-colors">+ Add Trainer</button>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Syllabus (modules & topics)</label>
                              {(selected.syllabus || []).map((mod, modIdx) => (
                                <div key={modIdx} className="mb-3 p-3 border border-gray-200 rounded-xl bg-gray-50/50">
                                  <div className="flex items-center gap-2 mb-2">
                                    <input
                                      value={mod.week || ''}
                                      onChange={e => {
                                        const s = [...(selected.syllabus || [])]
                                        s[modIdx] = { ...s[modIdx], week: e.target.value }
                                        setField('syllabus', s)
                                      }}
                                      placeholder="Module title (e.g. Module 1 — Introduction)"
                                      className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-primary"
                                    />
                                    <button onClick={() => {
                                      const s = (selected.syllabus || []).filter((_, i) => i !== modIdx)
                                      setField('syllabus', s)
                                    }} className="text-xs text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors">Remove</button>
                                  </div>
                                  <textarea
                                    value={(mod.topics || []).join('\n')}
                                    onChange={e => {
                                      const s = [...(selected.syllabus || [])]
                                      s[modIdx] = { ...s[modIdx], topics: e.target.value.split('\n').map(l => l.trim()).filter(Boolean) }
                                      setField('syllabus', s)
                                    }}
                                    placeholder="One topic per line"
                                    rows={3}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-mono text-xs"
                                  />
                                </div>
                              ))}
                              <button onClick={() => {
                                setField('syllabus', [...(selected.syllabus || []), { week: '', topics: [] }])
                              }} className="text-sm text-primary font-medium hover:text-blue-800 transition-colors">+ Add Module</button>
                            </div>
          </>
        )}
                      </div>

                      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50/50 rounded-b-2xl">
                        <p className="text-xs text-gray-400">{courses.length} courses loaded</p>
                        <div className="flex gap-3">
                          <button onClick={() => loadCourses()} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                            Refresh
                          </button>
                          <button onClick={handleSave} disabled={saving || !backendOnline}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2">
                            {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</> : 'Save All Changes'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* ─── JOBS SECTION ─── */}
        {section === 'jobs' && (
          <>
            {jobsLoading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading job postings...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={jobsSearch}
                      onChange={e => setJobsSearch(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <button onClick={addJob} className="shrink-0 w-9 h-9 bg-primary text-white rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center" title="Add new job">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                    {filteredJobs.map(j => {
                      const active = j.id === selectedJobId
                      return (
                        <button key={j.id} onClick={() => { setSelectedJobId(j.id); setUnsaved(false) }}
                          className={`w-full text-left px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${active ? 'bg-primary/5 border-l-[3px] border-l-primary' : ''}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-sm font-semibold truncate ${active ? 'text-primary' : 'text-gray-800'}`}>{j.title || 'Untitled'}</p>
                            <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${j.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{j.status || 'draft'}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{j.department || j.location || 'No department'}</p>
                        </button>
                      )
                    })}
                    {filteredJobs.length === 0 && (
                      <div className="p-5 text-center">
                        <p className="text-sm text-gray-400 mb-3">{jobs.length === 0 ? 'No job postings yet.' : 'No jobs match your search.'}</p>
                        {jobs.length === 0 && <button onClick={addJob} className="text-sm text-primary font-semibold hover:underline">+ Add your first job</button>}
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  {!selectedJob ? (
                    <div className="p-12 text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <p>Select or create a job to edit</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
                        <div className="flex items-center gap-3">
                          <h2 className="text-sm font-semibold text-gray-900">Edit Job Posting</h2>
                          <button onClick={toggleJobStatus}
                            className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${selectedJob.status === 'active' ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                          >{selectedJob.status === 'active' ? 'Active' : 'Closed'}</button>
                        </div>
                        <button onClick={deleteJob} className="text-xs text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium">Delete</button>
                      </div>
                      <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(100vh-340px)]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Job Title" value={selectedJob.title || ''} onChange={v => setJobField('title', v)} />
                          <Field label="Department" value={selectedJob.department || ''} onChange={v => setJobField('department', v)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Location" value={selectedJob.location || ''} onChange={v => setJobField('location', v)} />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Type</label>
                            <select value={selectedJob.type || 'Full-time'} onChange={e => setJobField('type', e.target.value)}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            ><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Field label="Experience" value={selectedJob.experience || ''} onChange={v => setJobField('experience', v)} />
                          <Field label="Posted Date" value={selectedJob.postedDate || ''} onChange={v => setJobField('postedDate', v)} />
                          <Field label="Closing Date" value={selectedJob.closingDate || ''} onChange={v => setJobField('closingDate', v)} />
                        </div>
                        <Field label="Salary Range" value={selectedJob.salaryRange || ''} onChange={v => setJobField('salaryRange', v)} />
                        <Field label="Contact Email" value={selectedJob.contactEmail || ''} onChange={v => setJobField('contactEmail', v)} />
                        <Field label="Application URL" value={selectedJob.applicationUrl || ''} onChange={v => setJobField('applicationUrl', v)} />
                        <TextAreaField label="Summary" value={selectedJob.summary || ''} onChange={v => setJobField('summary', v)} rows={3} />
                        <TextAreaField label="Full Description" value={selectedJob.description || ''} onChange={v => setJobField('description', v)} rows={5} />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Responsibilities (one per line)</label>
                          <textarea value={(selectedJob.responsibilities || []).join('\n')}
                            onChange={e => setJobField('responsibilities', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))} rows={4}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirements (one per line)</label>
                          <textarea value={(selectedJob.requirements || []).join('\n')}
                            onChange={e => setJobField('requirements', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))} rows={4}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nice to Have (one per line)</label>
                          <textarea value={(selectedJob.niceToHave || []).join('\n')}
                            onChange={e => setJobField('niceToHave', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))} rows={3}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Benefits (one per line)</label>
                          <textarea value={(selectedJob.benefits || []).join('\n')}
                            onChange={e => setJobField('benefits', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))} rows={3}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xs" />
                        </div>
                      </div>
                      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50/50 rounded-b-2xl">
                        <p className="text-xs text-gray-400">{jobs.length} job{jobs.length !== 1 ? 's' : ''} total</p>
                        <div className="flex gap-3">
                          <button onClick={() => loadJobs()} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Refresh</button>
                          <button onClick={addJob} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">+ Add</button>
                          <button onClick={handleJobsSave} disabled={saving || !backendOnline}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2">
                            {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</> : 'Save All Jobs'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* ─── HERO SLIDES SECTION ─── */}
        {section === 'hero-slides' && (
          <>
            {slidesLoading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading hero slides...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Slide list panel */}
                <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">{slides.length} slide{slides.length !== 1 ? 's' : ''}</span>
                    <button onClick={addSlide} className="shrink-0 w-9 h-9 bg-primary text-white rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center" title="Add new slide">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                    {slides.map(s => {
                      const active = s.id === selectedSlideId
                      return (
                        <button key={s.id} onClick={() => { setSelectedSlideId(s.id); setUnsaved(false) }}
                          className={`w-full text-left px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${active ? 'bg-primary/5 border-l-[3px] border-l-primary' : ''}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-sm font-semibold truncate ${active ? 'text-primary' : 'text-gray-800'}`}>
                              {s.title || 'Untitled'}
                            </p>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {!s.active && <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Hidden</span>}
                              <span className={`w-2 h-2 rounded-full ${s.active ? 'bg-green-400' : 'bg-gray-300'}`} />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {s.badge && <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full truncate max-w-[100px]">{s.badge}</span>}
                            <span className="text-xs text-gray-400">#{s.order || '-'}</span>
                          </div>
                        </button>
                      )
                    })}
                    {slides.length === 0 && (
                      <div className="p-5 text-center">
                        <p className="text-sm text-gray-400 mb-3">No slides yet.</p>
                        <button onClick={addSlide} className="text-sm text-primary font-semibold hover:underline">+ Add your first slide</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Slide editor panel */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  {!selectedSlide ? (
                    <div className="p-12 text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                      <p>Select or create a slide to edit</p>
                      <p className="text-xs text-gray-400 mt-1">These slides appear in the hero section on the homepage.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-semibold text-gray-900">Edit Slide</h2>
                          <button onClick={toggleSlideActive}
                            className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${selectedSlide.active ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                          >{selectedSlide.active ? 'Active' : 'Hidden'}</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => moveSlide(-1)} disabled={slides.findIndex(s => s.id === selectedSlideId) <= 0}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed" title="Move up">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                          </button>
                          <button onClick={() => moveSlide(1)} disabled={slides.findIndex(s => s.id === selectedSlideId) >= slides.length - 1}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed" title="Move down">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                          <button onClick={deleteSlide}
                            className="text-xs text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium">Delete</button>
                        </div>
                      </div>

                      <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(100vh-340px)]">
                        <Field label="Slide Title" value={selectedSlide.title || ''} onChange={v => setSlideField('title', v)} />
                        <Field label="Subtitle" value={selectedSlide.subtitle || ''} onChange={v => setSlideField('subtitle', v)} />
                        <TextAreaField label="Description" value={selectedSlide.description || ''} onChange={v => setSlideField('description', v)} rows={3} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Badge Text (e.g. GOLD STANDARD)" value={selectedSlide.badge || ''} onChange={v => setSlideField('badge', v)} />
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Gradient</label>
                            <select value={selectedSlide.gradient || ''} onChange={e => setSlideField('gradient', e.target.value)}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            >
                              {GRADIENT_OPTIONS.map(g => (
                                <option key={g} value={g}>{g.replace('from-', '').replace(' to-', ' → ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                              ))}
                            </select>
                            <div className={`mt-2 h-6 rounded-lg bg-gradient-to-r ${selectedSlide.gradient || 'from-primary to-blue-700'}`} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Field label="Course Slug (e.g. pmp)" value={selectedSlide.courseSlug || ''} onChange={v => setSlideField('courseSlug', v)} />
                          <Field label="Duration (e.g. 4 Days)" value={selectedSlide.duration || ''} onChange={v => setSlideField('duration', v)} />
                          <Field label="Next Batch (e.g. Jun 15)" value={selectedSlide.nextBatch || ''} onChange={v => setSlideField('nextBatch', v)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Order (lower = first)" value={String(selectedSlide.order || 0)} onChange={v => setSlideField('order', Number(v) || 0)} />
                        </div>

                        {/* Preview */}
                        <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
                          <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Preview</p>
                          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedSlide.gradient || 'from-primary to-blue-700'} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                              {(selectedSlide.title || 'T').charAt(0)}
                            </div>
                            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">
                              <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                              {selectedSlide.badge || 'BADGE'}
                            </div>
                            <p className="text-base font-bold text-gray-900 mb-1">{selectedSlide.title || 'Slide Title'}</p>
                            {selectedSlide.subtitle && <p className="text-sm text-primary font-semibold mb-1">{selectedSlide.subtitle}</p>}
                            <p className="text-xs text-gray-500 line-clamp-2">{selectedSlide.description || 'Description'}</p>
                            <div className="flex gap-3 mt-3">
                              {selectedSlide.duration && <span className="text-[10px] text-gray-400"><span className="font-semibold text-gray-600">{selectedSlide.duration}</span> Duration</span>}
                              {selectedSlide.nextBatch && <span className="text-[10px] text-gray-400"><span className="font-semibold text-gray-600">{selectedSlide.nextBatch}</span> Next Batch</span>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50/50 rounded-b-2xl">
                        <p className="text-xs text-gray-400">{slides.length} slide{slides.length !== 1 ? 's' : ''} total</p>
                        <div className="flex gap-3">
                          <button onClick={() => loadSlides()} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Refresh</button>
                          <button onClick={addSlide} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">+ Add</button>
                          <button onClick={handleSlidesSave} disabled={saving || !backendOnline}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2">
                            {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</> : 'Save All Slides'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* ─── WEBINARS SECTION ─── */}
        {section === 'webinars' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Webinars</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{webinars.length} webinar{webinars.length !== 1 ? 's' : ''}</span>
                <button onClick={() => {
                  const n = { id: Date.now().toString(), slug: '', title: '', fullTitle: '', date: '', time: '', description: '', whatYouLearn: [], agenda: [], speaker: { name: '', role: '', bio: '' }, whatsappLink: '', platform: 'Google Meet', seats: 50, active: true }
                  setWebinars(prev => [...prev, n])
                  setSelectedWebinarId(n.id)
                  setUnsaved(true)
                }} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  New Webinar
                </button>
              </div>
            </div>

            {webinarsLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div></div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <input placeholder="Search webinars..." value={webinarsSearch} onChange={e => setWebinarsSearch(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                    {filteredWebinars.map(w => {
                      const active = w.id === selectedWebinarId || w.slug === selectedWebinarId
                      return (
                        <button key={w.id || w.slug} onClick={() => { setSelectedWebinarId(w.id || w.slug); setUnsaved(false) }}
                          className={`w-full text-left px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${active ? 'bg-primary/5 border-l-[3px] border-l-primary' : ''}`}
                        >
                          <p className={`text-sm font-semibold truncate ${active ? 'text-primary' : 'text-gray-800'}`}>{w.title || 'Untitled Webinar'}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {w.date && <span className="text-xs text-gray-400">{w.date}</span>}
                            <span className={`w-2 h-2 rounded-full ${w.active !== false ? 'bg-green-400' : 'bg-gray-300'}`} />
                          </div>
                        </button>
                      )
                    })}
                    {filteredWebinars.length === 0 && (
                      <div className="p-5 text-center"><p className="text-sm text-gray-400">No webinars yet.</p></div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  {!selectedWebinar ? (
                    <div className="p-12 text-center text-gray-400"><p>Select or create a webinar to edit</p></div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-semibold text-gray-900">Edit Webinar</h2>
                          <button onClick={() => {
                            setWebinars(prev => prev.map(w => (w.id === selectedWebinarId || w.slug === selectedWebinarId) ? { ...w, active: !w.active } : w))
                            setUnsaved(true)
                          }} className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${selectedWebinar.active !== false ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                            {selectedWebinar.active !== false ? 'Active' : 'Hidden'}
                          </button>
                        </div>
                        <button onClick={() => {
                          setWebinars(prev => prev.filter(w => w.id !== selectedWebinarId && w.slug !== selectedWebinarId))
                          setSelectedWebinarId(webinars.length > 1 ? (webinars[0].id || webinars[0].slug) : '')
                          setUnsaved(true)
                        }} className="text-xs text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium">Delete</button>
                      </div>

                      <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(100vh-340px)]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Slug (e.g. ai-data-science)" value={selectedWebinar.slug || ''} onChange={v => setWebinarField('slug', v)} />
                          {selectedWebinar.slug && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Webinar Page Link</label>
                              <div className="flex items-center gap-2">
                                <input type="text" readOnly value={`${window.location.origin}/webinar/${selectedWebinar.slug}`}
                                  className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-600 font-mono text-xs select-all" />
                                <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/webinar/${selectedWebinar.slug}`); setSuccess('Link copied!'); setTimeout(() => setSuccess(''), 2000) }}
                                  className="shrink-0 px-3 py-2.5 text-xs font-medium text-primary bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors">Copy</button>
                                <a href={`/webinar/${selectedWebinar.slug}`} target="_blank" rel="noopener noreferrer"
                                  className="shrink-0 px-3 py-2.5 text-xs font-medium text-white bg-primary rounded-xl hover:bg-blue-800 transition-colors">Open</a>
                              </div>
                            </div>
                          )}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Active</label>
                            <select value={selectedWebinar.active !== false ? 'true' : 'false'} onChange={e => setWebinarField('active', e.target.value === 'true')}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary">
                              <option value="true">Active</option><option value="false">Hidden</option>
                            </select>
                          </div>
                        </div>
                        <Field label="Title (short)" value={selectedWebinar.title || ''} onChange={v => setWebinarField('title', v)} />
                        <Field label="Full Title" value={selectedWebinar.fullTitle || ''} onChange={v => setWebinarField('fullTitle', v)} />
                        <TextAreaField label="Description" value={selectedWebinar.description || ''} onChange={v => setWebinarField('description', v)} rows={3} />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Field label="Date (e.g. 30 May 2026)" value={selectedWebinar.date || ''} onChange={v => setWebinarField('date', v)} />
                          <Field label="Time (e.g. 5:00 PM IST)" value={selectedWebinar.time || ''} onChange={v => setWebinarField('time', v)} />
                          <Field label="Platform" value={selectedWebinar.platform || ''} onChange={v => setWebinarField('platform', v)} />
                        </div>
                        <Field label="WhatsApp Group Link" value={selectedWebinar.whatsappLink || ''} onChange={v => setWebinarField('whatsappLink', v)} />
                        <Field label="Seats" value={String(selectedWebinar.seats || 50)} onChange={v => setWebinarField('seats', Number(v) || 50)} />
                        <Field label="Audience (e.g. AI & Data Science Students)" value={selectedWebinar.audience || ''} onChange={v => setWebinarField('audience', v)} />

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tools & Platforms (one per line)</label>
                          <textarea value={(selectedWebinar.tools || []).join('\n')}
                            onChange={e => setWebinarField('tools', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))} rows={3}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary font-mono text-xs" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">What You'll Learn (one per line)</label>
                          <textarea value={(selectedWebinar.whatYouLearn || []).join('\n')}
                            onChange={e => setWebinarField('whatYouLearn', e.target.value.split('\n').map(l => l.trim()).filter(Boolean))} rows={4}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary font-mono text-xs" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Agenda (format: time|title|desc, one per line)</label>
                          <textarea value={(selectedWebinar.agenda || []).map(a => `${a.time}|${a.title}|${a.desc}`).join('\n')}
                            onChange={e => setWebinarField('agenda', e.target.value.split('\n').filter(Boolean).map(l => { const [time, title, desc] = l.split('|'); return { time: time || '', title: title || '', desc: desc || '' } }))} rows={4}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary font-mono text-xs" />
                        </div>

                        <div className="border-t border-gray-200 pt-5">
                          <p className="text-sm font-semibold text-gray-700 mb-3">Speaker Details</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Field label="Speaker Name" value={selectedWebinar.speaker?.name || ''} onChange={v => setWebinarField('speaker', { ...selectedWebinar.speaker, name: v })} />
                            <Field label="Speaker Role" value={selectedWebinar.speaker?.role || ''} onChange={v => setWebinarField('speaker', { ...selectedWebinar.speaker, role: v })} />
                            <TextAreaField label="Speaker Bio" value={selectedWebinar.speaker?.bio || ''} onChange={v => setWebinarField('speaker', { ...selectedWebinar.speaker, bio: v })} rows={2} />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50/50 rounded-b-2xl">
                        <p className="text-xs text-gray-400">Webinars sync across homepage popup + webinar detail page</p>
                        <div className="flex gap-3">
                          <button onClick={() => loadWebinars()} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Refresh</button>
                          <button onClick={handleWebinarsSave} disabled={saving || !backendOnline}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm">
                            {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</> : 'Save All Webinars'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── BATCHES SECTION ─── */}
        {section === 'batches' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Batches</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{batches.length} batch{batches.length !== 1 ? 'es' : ''}</span>
                <button onClick={() => {
                  const n = { id: Date.now().toString(), slug: '', title: '', course: '', date: '', mode: 'Live online', seats: 20, active: true }
                  setBatches(prev => [...prev, n])
                  setSelectedBatchId(n.id)
                  setUnsaved(true)
                }} className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  New Batch
                </button>
              </div>
            </div>

            {batchesLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div></div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <input placeholder="Search batches..." value={batchesSearch} onChange={e => setBatchesSearch(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                    {filteredBatches.map(b => {
                      const active = b.id === selectedBatchId || b.slug === selectedBatchId
                      const courseInfo = courses.find(c => (c.slug || c.id) === b.course)
                      return (
                        <button key={b.id || b.slug} onClick={() => { setSelectedBatchId(b.id || b.slug); setUnsaved(false) }}
                          className={`w-full text-left px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${active ? 'bg-primary/5 border-l-[3px] border-l-primary' : ''}`}
                        >
                          <p className={`text-sm font-semibold truncate ${active ? 'text-primary' : 'text-gray-800'}`}>{b.title || courseInfo?.fullTitle || courseInfo?.title || 'Untitled Batch'}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {b.date && <span className="text-xs text-gray-400">{b.date}</span>}
                            <span className={`w-2 h-2 rounded-full ${b.active !== false ? 'bg-green-400' : 'bg-gray-300'}`} />
                          </div>
                        </button>
                      )
                    })}
                    {filteredBatches.length === 0 && (
                      <div className="p-5 text-center"><p className="text-sm text-gray-400">No batches yet.</p></div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  {!selectedBatch ? (
                    <div className="p-12 text-center text-gray-400"><p>Select or create a batch to edit</p></div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-semibold text-gray-900">Edit Batch</h2>
                          <button onClick={() => {
                            setBatches(prev => prev.map(b => (b.id === selectedBatchId || b.slug === selectedBatchId) ? { ...b, active: !b.active } : b))
                            setUnsaved(true)
                          }} className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${selectedBatch.active !== false ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                            {selectedBatch.active !== false ? 'Active' : 'Hidden'}
                          </button>
                        </div>
                        <button onClick={() => {
                          setBatches(prev => prev.filter(b => b.id !== selectedBatchId && b.slug !== selectedBatchId))
                          setSelectedBatchId(batches.length > 1 ? (batches[0].id || batches[0].slug) : '')
                          setUnsaved(true)
                        }} className="text-xs text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium">Delete</button>
                      </div>

                      <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(100vh-340px)]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Batch Title" value={selectedBatch.title || ''} onChange={v => setBatchField('title', v)} placeholder="e.g. Evening batch" />
                          <Field label="Slug" value={selectedBatch.slug || ''} onChange={v => setBatchField('slug', v)} placeholder="e.g. evening-may-2026" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Module / Course</label>
                          <select value={selectedBatch.course || ''} onChange={e => setBatchField('course', e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary">
                            <option value="">— Select a course —</option>
                            {courseOptions.map(o => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </select>
                        </div>
                        <Field label="Date" value={selectedBatch.date || ''} onChange={v => setBatchField('date', v)} placeholder="e.g. 15-06-2026" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mode</label>
                            <select value={selectedBatch.mode || 'Live online'} onChange={e => setBatchField('mode', e.target.value)}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary">
                              <option>Live online</option><option>Weekend cohort</option><option>Evening • 4:00 PM - 7:00 PM</option>
                              <option>Advanced cohort</option><option>Data analytics track</option><option>AI-enabled Scrum</option>
                              <option>Live bootcamp</option><option>Evening cohort</option>
                            </select>
                          </div>
                          <Field label="Seats" value={String(selectedBatch.seats || 20)} onChange={v => setBatchField('seats', Number(v) || 20)} />
                        </div>
                      </div>

                      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50/50 rounded-b-2xl">
                        <p className="text-xs text-gray-400">{batches.length} batch{batches.length !== 1 ? 'es' : ''} total</p>
                        <div className="flex gap-3">
                          <button onClick={() => loadBatches()} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Refresh</button>
                          <button onClick={handleBatchesSave} disabled={saving || !backendOnline}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm">
                            {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</> : 'Save All Batches'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── ENROLLMENTS SECTION ─── */}
        {section === 'enrollments' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Enrollments</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{enrollments.length} enrollment{enrollments.length !== 1 ? 's' : ''}</span>
                <input type="text" placeholder="Search by name, email, course..."
                  value={enrollmentsSearch} onChange={e => setEnrollmentsSearch(e.target.value)}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary w-64" />
                <button onClick={() => loadEnrollments()} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Refresh</button>
              </div>
            </div>
            {enrollmentsLoading ? (
              <div className="text-center py-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-gray-500">Loading enrollments...</p></div>
            ) : enrollments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center"><p className="text-gray-400">No enrollments yet. Payments will appear here automatically.</p></div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">Course</th>
                        <th className="text-right px-5 py-3 font-semibold text-gray-600">Amount</th>
                        <th className="text-center px-5 py-3 font-semibold text-gray-600">GST</th>
                        <th className="text-center px-5 py-3 font-semibold text-gray-600">Source</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">Payment ID</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">Date</th>
                        <th className="text-center px-5 py-3 font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {enrollments.filter(e => !enrollmentsSearch || e.name?.toLowerCase().includes(enrollmentsSearch.toLowerCase()) || e.email?.toLowerCase().includes(enrollmentsSearch.toLowerCase()) || e.course?.toLowerCase().includes(enrollmentsSearch.toLowerCase()) || e.paymentId?.includes(enrollmentsSearch)).map(e => (
                        <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="font-medium text-gray-800">{e.name}</div>
                            <div className="text-xs text-gray-400">{e.email}{e.phone ? ` • ${e.phone}` : ''}</div>
                          </td>
                          <td className="px-5 py-3 text-gray-700 max-w-[200px] truncate">{e.course}</td>
                          <td className="px-5 py-3 text-right font-medium text-gray-800">₹{Number(e.amount).toLocaleString('en-IN')}</td>
                          <td className="px-5 py-3 text-center">
                            <span className={`inline-block text-[10px] font-semibold px-2 py-1 rounded-full ${e.hasGst ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                              {e.hasGst ? 'With GST' : 'No GST'}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <span className="inline-block text-[10px] font-medium px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                              {e.source || 'enroll'}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-xs text-gray-400 font-mono">{e.paymentId}</td>
                          <td className="px-5 py-3 text-gray-500 text-xs">{e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                          <td className="px-5 py-3 text-center"><span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">Paid</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── APPLICATIONS SECTION ─── */}
        {/* ─── CATEGORIES SECTION ─── */}
        {section === 'categories' && (
          <>
            {categoriesLoading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading categories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-gray-900 flex-1">Categories</h2>
                    <button onClick={() => {
                      setCategories(prev => [...prev, { name: 'New Category', slug: '', icon: 'Award', description: '', courses: [] }])
                      setSelectedCategoryIdx(categories.length)
                      setUnsaved(true)
                    }} className="shrink-0 w-9 h-9 bg-primary text-white rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center" title="Add new category">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                    {categories.map((cat, idx) => (
                      <button key={idx} onClick={() => { setSelectedCategoryIdx(idx); setUnsaved(false) }}
                        className={`w-full text-left px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${idx === selectedCategoryIdx ? 'bg-primary/5 border-l-[3px] border-l-primary' : ''}`}
                      >
                        <p className={`text-sm font-semibold ${idx === selectedCategoryIdx ? 'text-primary' : 'text-gray-800'}`}>{cat.name || 'Unnamed'}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{cat.slug || 'No slug'}</p>
                      </button>
                    ))}
                    {categories.length === 0 && <p className="p-5 text-sm text-gray-400 text-center">No categories yet.</p>}
                  </div>
                </div>
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  {selectedCategoryIdx === -1 || !categories[selectedCategoryIdx] ? (
                    <div className="p-12 text-center text-gray-400">
                      <p>Select or create a category</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
                        <h2 className="text-sm font-semibold text-gray-900">Edit Category</h2>
                        <button onClick={() => {
                          setCategories(prev => prev.filter((_, i) => i !== selectedCategoryIdx))
                          setSelectedCategoryIdx(Math.min(selectedCategoryIdx, categories.length - 2))
                          setUnsaved(true)
                        }} className="text-xs text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium">Delete</button>
                      </div>
                      <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(100vh-340px)]">
                        <Field label="Category Name" value={categories[selectedCategoryIdx]?.name || ''}
                          onChange={v => {
                            const next = [...categories]
                            next[selectedCategoryIdx] = { ...next[selectedCategoryIdx], name: v }
                            setCategories(next)
                            setUnsaved(true)
                          }} />
                        <Field label="Slug" value={categories[selectedCategoryIdx]?.slug || ''}
                          onChange={v => {
                            const next = [...categories]
                            next[selectedCategoryIdx] = { ...next[selectedCategoryIdx], slug: v }
                            setCategories(next)
                            setUnsaved(true)
                          }} />
                        <TextAreaField label="Description" value={categories[selectedCategoryIdx]?.description || ''}
                          onChange={v => {
                            const next = [...categories]
                            next[selectedCategoryIdx] = { ...next[selectedCategoryIdx], description: v }
                            setCategories(next)
                            setUnsaved(true)
                          }} rows={3} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => loadCategories()} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Refresh</button>
              <button onClick={async () => {
                if (!backendOnline) { setError('Backend is offline'); return }
                setSaving(true)
                setError('')
                setSuccess('')
                try {
                  const res = await fetch(CATEGORIES_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
                    body: JSON.stringify(categories),
                  })
                  const data = await res.json()
                  if (!data.success) throw new Error(data.error || 'Save failed')
                  setSuccess('Categories saved successfully.')
                  setUnsaved(false)
                  loadCategories()
                } catch (err) {
                  setError('Save failed: ' + (err.message || 'Connection error'))
                }
                setSaving(false)
              }} disabled={saving || !backendOnline}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2">
                {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Saving...</> : 'Save Categories'}
              </button>
            </div>
          </>
        )}

        {section === 'applications' && (
          <>
            {applicationsLoading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Loading applications...</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <input type="text" placeholder="Search by name, email, or job..."
                    value={applicationsSearch}
                    onChange={e => setApplicationsSearch(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  <select value={selectedAppJobId} onChange={e => setSelectedAppJobId(e.target.value)}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                    <option value="all">All Jobs</option>
                    {[...new Set(applications.map(a => a.jobId).filter(Boolean))].map(id => {
                      const app = applications.find(a => a.jobId === id)
                      return <option key={id} value={id}>{app?.jobTitle || id}</option>
                    })}
                  </select>
                  <button onClick={() => loadApplications()} className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Refresh</button>
                </div>
                <div className="overflow-x-auto">
                  {applications.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <p className="mt-2">No applications received yet.</p>
                    </div>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-600">Phone</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-600">Job</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-600">CV</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-600">Message</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications
                          .filter(a => {
                            if (selectedAppJobId !== 'all' && a.jobId !== selectedAppJobId) return false
                            if (applicationsSearch) {
                              const q = applicationsSearch.toLowerCase()
                              return a.name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.jobTitle?.toLowerCase().includes(q)
                            }
                            return true
                          })
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                          .map(app => (
                            <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                              <td className="px-4 py-3 font-medium text-gray-900">{app.name}</td>
                              <td className="px-4 py-3 text-gray-600">
                                <a href={`mailto:${app.email}`} className="text-primary hover:underline">{app.email}</a>
                              </td>
                              <td className="px-4 py-3 text-gray-600">{app.phone || '-'}</td>
                              <td className="px-4 py-3 text-gray-600">{app.jobTitle || '-'}</td>
                              <td className="px-4 py-3">
                                {app.cvFile ? (
                                  <a href={`/uploads/cvs/${app.cvFile}`} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-xs">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    {app.cvOriginalName || 'Download CV'}
                                  </a>
                                ) : (
                                  <span className="text-gray-400 text-xs">No file</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate" title={app.message}>{app.message || '-'}</td>
                              <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/50">
                  <p className="text-xs text-gray-400">{applications.length} application{applications.length !== 1 ? 's' : ''} total</p>
                </div>
              </div>
            )}
          </>
        )}

        {section === 'keywords' && (
          <KeywordsSection courses={courses} />
        )}

      </div>
    </div>
  )
}

function KeywordsSection({ courses }) {
  const IT_CITIES = ['Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi NCR', 'Kolkata']
  const [copiedIdx, setCopiedIdx] = useState(-1)
  const [filterCity, setFilterCity] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  let keywords = []
  for (const c of courses) {
    const name = c.fullTitle || c.title
    if (!name) continue
    for (const city of IT_CITIES) {
      keywords.push({
        course: name,
        slug: c.slug,
        city,
        keyword: `${name} Training in ${city}`,
        matchType: 'Phrase',
        ad: `${name} | ${city}`,
      })
    }
  }

  if (filterCity) keywords = keywords.filter(k => k.city === filterCity)
  if (filterCourse) keywords = keywords.filter(k => k.slug === filterCourse)
  if (categoryFilter) keywords = keywords.filter(k => k.keyword.toLowerCase().includes(categoryFilter.toLowerCase()))

  const copyAll = () => {
    const text = keywords.map(k => k.keyword).join('\n')
    navigator.clipboard.writeText(text)
    setCopiedIdx(-2)
    setTimeout(() => setCopiedIdx(-3), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-bold text-gray-900">Keywords for Google Ads</h2>
          <p className="text-xs text-gray-500 mt-0.5">{keywords.length} keyword{keywords.length !== 1 ? 's' : ''} from {courses.length} courses × {IT_CITIES.length} cities</p>
        </div>
        <button onClick={copyAll}
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-blue-800 transition-all">
          {copiedIdx === -2 ? 'Copied!' : 'Copy All'}
        </button>
      </div>
      <div className="px-6 py-3 border-b border-gray-100 flex flex-wrap gap-3">
        <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50">
          <option value="">All Cities</option>
          {IT_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50">
          <option value="">All Courses</option>
          {courses.filter(c => c.fullTitle || c.title).map(c => (
            <option key={c.slug} value={c.slug}>{c.fullTitle || c.title}</option>
          ))}
        </select>
        <input type="text" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
          placeholder="Search keywords..." className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 w-48" />
      </div>
      <div className="overflow-auto max-h-[500px]">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Course</th>
              <th className="text-left px-4 py-2.5 text-gray-500 font-medium">City</th>
              <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Keyword</th>
              <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Match Type</th>
              <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Ad Headline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {keywords.map((k, i) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="px-4 py-2 text-gray-700">{k.course}</td>
                <td className="px-4 py-2"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium">{k.city}</span></td>
                <td className="px-4 py-2 text-gray-900 font-medium">{k.keyword}</td>
                <td className="px-4 py-2 text-gray-500">{k.matchType}</td>
                <td className="px-4 py-2 text-gray-600">{k.ad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-400">
        Copy these keywords into Google Ads → Keywords → Add phrase match keywords to target IT professionals searching for certification courses in major Indian cities.
      </div>
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
      />
    </div>
  )
}

function TextAreaField({ label, value, onChange, rows = 4 }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
      />
    </div>
  )
}
