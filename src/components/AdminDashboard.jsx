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
  }, [])

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
      })
      .catch(() => {
        setError('Failed to save changes')
        setSaving(false)
      })
  }

  if (!isAuthenticated) {
    return (
      <div style={{maxWidth:400,margin:'80px auto',padding:20,border:'1px solid #ccc',borderRadius:8}}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{width:'100%',padding:8,marginBottom:12}}
        />
        <button
          onClick={() => {
            if (password === ADMIN_PASSWORD) setIsAuthenticated(true)
            else setError('Incorrect password')
          }}
          style={{padding:'10px 24px',fontSize:16}}
        >
          Login
        </button>
        {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
      </div>
    )
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{color:'red'}}>{error}</div>

  return (
    <div style={{maxWidth:600,margin:'40px auto',padding:20,border:'1px solid #ccc',borderRadius:8}}>
      <h2>Admin Dashboard: Edit Courses</h2>
      {courses.map((course, idx) => (
        <div key={course.id} style={{marginBottom:24,padding:16,border:'1px solid #eee',borderRadius:6}}>
          <input
            value={course.name}
            onChange={e => handleChange(idx, 'name', e.target.value)}
            style={{fontWeight:'bold',fontSize:18,width:'100%',marginBottom:8}}
          />
          <div>
            <label>Price: ₹ </label>
            <input
              type="number"
              value={course.price}
              onChange={e => handleChange(idx, 'price', e.target.value)}
              style={{width:100,marginRight:16}}
            />
            <label>Next Batch Date: </label>
            <input
              type="date"
              value={course.nextBatchDate}
              onChange={e => handleChange(idx, 'nextBatchDate', e.target.value)}
              style={{marginRight:16}}
            />
          </div>
          <div style={{marginTop:8}}>
            <label>Curriculum: </label>
            <textarea
              value={course.curriculum}
              onChange={e => handleChange(idx, 'curriculum', e.target.value)}
              style={{width:'100%',minHeight:40}}
            />
          </div>
        </div>
      ))}
      <button onClick={handleSave} disabled={saving} style={{padding:'10px 24px',fontSize:16}}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}
