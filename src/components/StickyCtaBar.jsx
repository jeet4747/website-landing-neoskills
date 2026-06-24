import React, { useState, useEffect } from 'react'
import { X, Phone, GraduationCap } from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { openEnroll } = useEnroll()

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return
      const hero = document.getElementById('home')
      if (!hero) return
      const heroBottom = hero.getBoundingClientRect().bottom
      setVisible(heroBottom < 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  if (!visible || dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl animate-slide-up">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-gray-700">
            <Phone size={16} className="text-primary" />
            <a href="tel:+918956963953" className="text-sm font-medium hover:text-primary">+91 89569 63953</a>
          </div>
          <span className="hidden md:inline text-sm text-gray-500">Enroll in 2 minutes</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openEnroll({ course: '', baseAmount: 0 })}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-all shadow-sm"
          >
            <GraduationCap size={16} />
            Enroll Now
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StickyCtaBar
