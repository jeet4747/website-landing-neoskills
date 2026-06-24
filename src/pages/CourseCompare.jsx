import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, X, Check, Minus, BarChart3, BookOpen, Clock, Users, Briefcase, Award, IndianRupee, GraduationCap } from 'lucide-react'
import { getAllResolvedCourses } from '../components/courseData'

const rows = [
  { label: 'Category', key: 'category', icon: BookOpen },
  { label: 'Level', key: 'stats.level', icon: BarChart3 },
  { label: 'Duration', key: 'stats.duration', icon: Clock },
  { label: 'Mode', key: 'stats.mode', icon: GraduationCap },
  { label: 'Exam body', key: 'examBody', icon: Award },
  { label: 'Total fee', key: 'fee', icon: IndianRupee },
  { label: 'Career roles', key: 'careerRoles', icon: Briefcase },
  { label: 'Enrolled', key: 'enrollmentCount', icon: Users },
]

function getVal(obj, path) {
  const parts = path.split('.')
  let v = obj
  for (const p of parts) {
    if (v == null) return ''
    v = v[p]
  }
  return v ?? ''
}

export default function CourseCompare() {
  const allCourses = useMemo(() => getAllResolvedCourses(), [])
  const [selected, setSelected] = useState([null, null, null])

  const handleSelect = (idx, slug) => {
    const next = [...selected]
    next[idx] = slug || null
    setSelected(next)
  }

  const selectedCourses = selected.map((slug) => slug ? allCourses.find((c) => c.slug === slug) : null)

  const availableFor = (idx) => {
    const currentSlugs = selected.filter((_, i) => i !== idx).filter(Boolean)
    return allCourses.filter((c) => !currentSlugs.includes(c.slug))
  }

  return (
    <>
      <Helmet>
        <title>Compare Courses | NeoSkills Learning Solutions</title>
        <meta name="description" content="Compare certification courses side-by-side. Evaluate PMP, AWS, Scrum, ITIL, and more based on fee, duration, level, and career outcomes." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
            <Link to="/" className="text-primary hover:underline text-sm flex items-center gap-1"><ArrowLeft size={14} /> Home</Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-xl"><BarChart3 className="text-primary" size={28} /></div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compare Courses</h1>
              <p className="text-gray-500 text-sm">Select up to 3 courses to compare fees, duration, career outcomes, and more.</p>
            </div>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[0, 1, 2].map((idx) => (
              <div key={idx}>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Course {idx + 1}</p>
                <select
                  value={selected[idx] || ''}
                  onChange={(e) => handleSelect(idx, e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">-- Select a course --</option>
                  {availableFor(idx).map((c) => (
                    <option key={c.slug} value={c.slug}>{c.title}</option>
                  ))}
                </select>
                {selected[idx] && (
                  <button
                    type="button"
                    onClick={() => handleSelect(idx, '')}
                    className="text-xs text-red-500 hover:text-red-700 mt-1.5 flex items-center gap-1"
                  >
                    <X size={12} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          {selectedCourses.some(Boolean) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-5 text-xs font-semibold text-gray-400 uppercase w-44">Feature</th>
                      {selectedCourses.map((c, i) => (
                        <th key={i} className={`text-left py-4 px-5 text-sm font-bold text-gray-800 min-w-[200px] ${!c ? 'opacity-30' : ''}`}>
                          {c ? c.title : '—'}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => {
                      const Icon = row.icon
                      return (
                        <tr key={row.key} className={`border-b border-gray-100 ${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="py-4 px-5 flex items-center gap-2 text-gray-600 font-medium">
                            <Icon size={14} className="text-primary shrink-0" />
                            {row.label}
                          </td>
                          {selectedCourses.map((c, ci) => {
                            let val
                            if (row.key === 'fee') {
                              val = c ? `₹${(c.feeDetails?.total || c.trainingFee || 0).toLocaleString('en-IN')}` : '—'
                            } else if (row.key === 'careerRoles') {
                              val = c?.careerOpportunities?.length ? c.careerOpportunities.slice(0, 3).join(', ') + (c.careerOpportunities.length > 3 ? '...' : '') : '—'
                            } else if (row.key === 'enrollmentCount') {
                              val = c?.enrollmentCount ? `${c.enrollmentCount.toLocaleString('en-IN')} enrolled` : '—'
                            } else {
                              val = c ? getVal(c, row.key) || '—' : '—'
                            }
                            return (
                              <td key={ci} className={`py-4 px-5 text-gray-700 ${!c ? 'opacity-30' : ''}`}>
                                {typeof val === 'string' && val.startsWith('http') ? (
                                  <a href={val} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">Visit website</a>
                                ) : (
                                  <span className="text-xs leading-relaxed">{val}</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5 bg-gray-50 border-t border-gray-200">
                {selectedCourses.map((c, i) => (
                  <div key={i}>
                    {c ? (
                      <Link
                        to={`/course/${c.slug}`}
                        className={`block text-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          i === 0
                            ? 'bg-primary text-white hover:bg-blue-800'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                        }`}
                      >
                        View {c.title}
                      </Link>
                    ) : (
                      <div className="text-center px-4 py-2.5 rounded-xl text-sm text-gray-300 bg-gray-100 border border-dashed border-gray-200">
                        No course selected
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {!selectedCourses.some(Boolean) && (
            <div className="text-center py-20 text-gray-400">
              <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Select at least one course above to start comparing.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
