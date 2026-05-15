import React, { useEffect, useState } from 'react'
import { getAllResolvedCourses } from '../data/catalogBuilder'

const API_URL = 'http://localhost:4000/api/courses'

export default function AdminDashboard() {
  const [courses, setCourses] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const ADMIN_PASSWORD = 'neoskills2026' // Change this to your desired password

  const loadCourses = () => {
    setLoading(true)
    setError('')
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // If server has data, use it; otherwise use full catalog
        const result = Array.isArray(data) && data.length > 0 ? data : getAllResolvedCourses()
        setCourses(result)
        setSelectedCourseId(result[0]?.id ?? result[0]?.slug ?? null)
        setLoading(false)
      })
      .catch(() => {
        // Fallback to full catalog if server fails
        const fallbackCourses = getAllResolvedCourses()
        setCourses(fallbackCourses)
        setSelectedCourseId(fallbackCourses[0]?.slug ?? null)
        setError('Using full course catalog (server JSON not available).')
        setLoading(false)
      })
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadCourses()
    }
  }, [isAuthenticated])

  const selectedIndex = courses.findIndex(course => String(course.id ?? course.slug) === String(selectedCourseId))
  const selectedCourse = selectedIndex >= 0 ? courses[selectedIndex] : courses[0] || null

  const setNestedValue = (target, path, value) => {
    const keys = path.split('.')
    const lastKey = keys.pop()
    let node = target
    for (const key of keys) {
      if (typeof node[key] !== 'object' || node[key] === null) {
        node[key] = {}
      }
      node = node[key]
    }
    node[lastKey] = value
  }

  const highlightText = selectedCourse ? (selectedCourse.highlights || []).join('\n') : ''
  const syllabusText = selectedCourse
    ? (selectedCourse.syllabus || []).flatMap(item => [item.week ? `${item.week}:` : '', ...(item.topics || [])]).join('\n')
    : ''

  const handleChange = (field, value) => {
    if (!selectedCourse) return
    const updated = [...courses]
    const next = { ...updated[selectedIndex] }

    const fieldMapping = {
      title: 'title',
      fullTitle: 'fullTitle',
      summary: 'summary',
      description: 'description',
      learnMoreUrl: 'learnMoreUrl',
      duration: 'stats.duration',
      nextBatch: 'stats.nextBatch',
      level: 'stats.level',
      mode: 'stats.mode',
      trainingFee: 'feeDetails.training',
      examFee: 'feeDetails.exam',
      totalFee: 'feeDetails.total',
      feeDisclaimer: 'feeDisclaimer',
    }

    if (field === 'highlights') {
      next.highlights = value.split('\n').map(line => line.trim()).filter(Boolean)
    } else if (field === 'syllabusText') {
      const lines = value.split('\n').map(line => line.trim()).filter(Boolean)
      next.syllabus = [{ week: 'Curriculum', topics: lines }]
    } else {
      const backendField = fieldMapping[field] || field
      setNestedValue(next, backendField, value)
    }

    updated[selectedIndex] = next
    setCourses(updated)
  }

  const handleSave = () => {
    if (!selectedCourse) return
    setSaving(true)
    setError('')
    setSuccess('')

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courses),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error('Save failed')
        setSaving(false)
        setSuccess('Course details saved to server JSON successfully.')
        loadCourses()
      })
      .catch(() => {
        setError('Failed to save changes to server')
        setSaving(false)
      })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={() => {
              if (password === ADMIN_PASSWORD) {
                setIsAuthenticated(true)
                setPassword('')
              } else {
                setError('Incorrect password')
              }
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        </div>
      </div>
    )
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-gray-600">Loading courses...</div>
    </div>
  )

  if (error && courses.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-red-500 text-xl">{error}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Dashboard: Edit Course Details</h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select course/module to edit</label>
            <select
              value={selectedCourseId ?? ''}
              onChange={e => setSelectedCourseId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {courses.map(course => (
                <option key={course.id ?? course.slug} value={course.id ?? course.slug}>
                  {course.title ?? course.name ?? course.slug}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input
                  type="text"
                  value={selectedCourse.title ?? selectedCourse.name ?? ''}
                  onChange={e => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg"
                  placeholder="Enter course title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Full Title</label>
                <input
                  type="text"
                  value={selectedCourse.fullTitle ?? ''}
                  onChange={e => handleChange('fullTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the full course headline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Learn More URL</label>
                <input
                  type="text"
                  value={selectedCourse.learnMoreUrl ?? ''}
                  onChange={e => handleChange('learnMoreUrl', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the course landing page URL"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Training Fee (₹)</label>
                  <input
                    type="number"
                    value={selectedCourse.feeDetails?.training ?? selectedCourse.trainingFee ?? ''}
                    onChange={e => handleChange('trainingFee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter training fee"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Fee (₹)</label>
                  <input
                    type="number"
                    value={selectedCourse.feeDetails?.exam ?? ''}
                    onChange={e => handleChange('examFee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter exam fee"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Batch / Cohort</label>
                  <input
                    type="text"
                    value={selectedCourse.stats?.nextBatch ?? selectedCourse.stats?.cohort ?? ''}
                    onChange={e => handleChange('nextBatch', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 15-Mar-2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={selectedCourse.stats?.duration ?? ''}
                    onChange={e => handleChange('duration', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 6-8 weeks"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={selectedCourse.stats?.level ?? ''}
                    onChange={e => handleChange('level', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                  <input
                    type="text"
                    value={selectedCourse.stats?.mode ?? ''}
                    onChange={e => handleChange('mode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Live online"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Summary</label>
                <textarea
                  value={selectedCourse.summary ?? ''}
                  onChange={e => handleChange('summary', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Short course summary for the dashboard"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                <textarea
                  value={selectedCourse.description ?? ''}
                  onChange={e => handleChange('description', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter detailed course description, curriculum, and module information..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Highlights</label>
                <textarea
                  value={highlightText}
                  onChange={e => handleChange('highlights', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter one highlight per line"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum / Syllabus</label>
                <textarea
                  value={syllabusText}
                  onChange={e => handleChange('syllabusText', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter one syllabus item per line"
                />
              </div>
            </>
          ) : (
            <p className="text-gray-600">No course available to edit.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
          <button
            onClick={handleSave}
            disabled={saving || !selectedCourse}
            className="w-full sm:w-auto bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          >
            {saving ? 'Saving...' : 'Save to JSON'}
          </button>
          <button
            onClick={loadCourses}
            className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Refresh from server
          </button>
        </div>

        {success && <div className="text-green-600 text-center mb-4">{success}</div>}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Saved courses in JSON</h2>
          <p className="text-sm text-gray-600">Changes are stored in the backend `courses.json` file when you click Save.</p>
        </div>
      </div>
    </div>
  )
}
