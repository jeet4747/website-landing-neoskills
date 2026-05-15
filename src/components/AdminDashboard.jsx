import React, { useEffect, useState } from 'react'

const API_URL = 'http://localhost:4000/api/courses'

export default function AdminDashboard() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const ADMIN_PASSWORD = 'neoskills2026' // Change this to your desired password

  useEffect(() => {
    if (isAuthenticated) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          setCourses(data)
          setLoading(false)
        })
        .catch(() => {
          setError('Failed to load courses')
          setLoading(false)
        })
    }
  }, [isAuthenticated])

  const handleChange = (idx, field, value) => {
    const updated = [...courses]
    updated[idx][field] = value
    setCourses(updated)
  }

  const handleSave = () => {
    setSaving(true)
    setError('')
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courses),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error('Save failed')
        setSaving(false)
        alert('Changes saved successfully!')
      })
      .catch(() => {
        setError('Failed to save changes')
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

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-red-500 text-xl">{error}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Dashboard: Edit Courses</h1>
        
        {courses.map((course, idx) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
              <input
                value={course.name}
                onChange={e => handleChange(idx, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={course.price}
                  onChange={e => handleChange(idx, 'price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Batch Date</label>
                <input
                  type="date"
                  value={course.nextBatchDate}
                  onChange={e => handleChange(idx, 'nextBatchDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum</label>
              <textarea
                value={course.curriculum}
                onChange={e => handleChange(idx, 'curriculum', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course curriculum..."
              />
            </div>
          </div>
        ))}
        
        <div className="text-center">
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
        
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>
    </div>
  )
}
