import { useState, useEffect } from 'react'
import { getAllResolvedCourses, getCourseBySlug } from '../data/catalogBuilder'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const COURSES_API = BACKEND_URL ? `${BACKEND_URL}/api/courses` : '/api/courses'

let apiCache = null
let cacheTime = 0
const CACHE_TTL = 60000

export function useCourses() {
  const [courses, setCourses] = useState(() => apiCache || getAllResolvedCourses())

  useEffect(() => {
    if (apiCache && Date.now() - cacheTime < CACHE_TTL) return
    fetch(COURSES_API, { signal: AbortSignal.timeout(4000) })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          apiCache = data
          cacheTime = Date.now()
          setCourses(data)
        }
      })
      .catch(() => {})
  }, [])

  return courses
}

export function useCourseBySlug(slug) {
  const [course, setCourse] = useState(() => {
    if (apiCache) return apiCache.find(c => c.slug === slug || c.id === slug) || null
    return getCourseBySlug(slug)
  })

  useEffect(() => {
    if (apiCache) {
      setCourse(apiCache.find(c => c.slug === slug || c.id === slug) || null)
      return
    }
    fetch(COURSES_API, { signal: AbortSignal.timeout(4000) })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          apiCache = data
          cacheTime = Date.now()
          setCourse(data.find(c => c.slug === slug || c.id === slug) || null)
        }
      })
      .catch(() => {})
  }, [slug])

  return course
}
