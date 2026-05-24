import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Menu, X, Smartphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getAllResolvedCourses } from '../data/catalogBuilder'
import { fetchBackendCourses } from '../data/courseService'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)
  const courseCache = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBackendCourses().then(data => { courseCache.current = data })
  }, [])

  // Close search on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearch = (e) => {
    const q = e.target.value
    setSearchQuery(q)
    if (q.trim().length < 2) {
      setSearchResults([])
      return
    }
    const all = courseCache.current || getAllResolvedCourses()
    const results = all.filter((c) =>
      c.title.toLowerCase().includes(q.toLowerCase())
    )
    setSearchResults(results.slice(0, 8))
  }

  const handleSearchSelect = (slug) => {
    setSearchQuery('')
    setSearchResults([])
    setSearchOpen(false)
    navigate(`/course/${slug}`)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSearchSelect(searchResults[0].slug)
    }
    if (e.key === 'Escape') {
      setSearchOpen(false)
      setSearchResults([])
    }
  }

  const menuItems = [
    { label: 'Home', href: '#home' },
    {
      label: 'Courses',
      href: '#courses',
      dropdown: [
        { label: 'All Courses', href: '#courses' },
        { label: 'Upcoming Batches', href: '#upcoming' },
        { label: 'Project Management', href: '#courses' },
        { label: 'Cloud Computing', href: '#courses' },
        { label: 'Cyber Security', href: '#courses' },
        { label: 'Agile & Scrum', href: '#courses' },
      ]
    },
    { label: 'Corporate', href: '#corporate' },
    { label: 'Placements', href: '/placements' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const [dropdownOpen, setDropdownOpen] = useState(null)

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const onHome = window.location.pathname === '/' || window.location.pathname === ''
      if (onHome) {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setIsOpen(false)
        }
      } else {
        navigate('/' + href)
      }
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 w-full bg-white/95 backdrop-blur-md text-dark z-40 shadow-sm border-b border-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <img
              src="/images/nsl_logo__Logo_.svg"
              alt="Neoskills Learning Solutions"
              className="h-20 w-auto object-contain transform scale-125"
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => item.dropdown && setDropdownOpen(i)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (!item.dropdown) handleNavClick(e, item.href)
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 ${
                    dropdownOpen === i
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen === i ? 'rotate-180' : ''}`} />
                  )}
                </a>
                {item.dropdown && (
                  <AnimatePresence>
                    {dropdownOpen === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                      >
                        {item.dropdown.map((sub, si) => (
                          <a
                            key={si}
                            href={sub.href}
                            onClick={(e) => handleNavClick(e, sub.href)}
                            className="block px-5 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right side: Search + CTA */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-primary hover:text-primary transition-all"
              >
                <Search size={16} />
                <span className="hidden xl:inline">Search courses...</span>
                <span className="hidden md:inline xl:hidden">Search</span>
                <kbd className="hidden md:inline-flex text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded ml-2">⌘K</kbd>
              </motion.button>

              {/* Search Overlay */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="flex items-center gap-2 p-3 border-b border-gray-100">
                      <Search size={16} className="text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search 40+ courses..."
                        className="flex-1 text-sm outline-none text-dark placeholder-gray-400"
                        autoFocus
                      />
                      <button
                        onClick={() => { setSearchOpen(false); setSearchResults([]) }}
                        className="text-xs text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-1 rounded"
                      >
                        ESC
                      </button>
                    </div>
                    {searchResults.length > 0 && (
                      <div className="max-h-72 overflow-y-auto p-2">
                        <p className="text-xs text-gray-400 px-2 py-1 font-medium">Courses</p>
                        {searchResults.map((r) => (
                          <button
                            key={r.slug}
                            onClick={() => handleSearchSelect(r.slug)}
                            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-dark hover:bg-primary/5 transition-colors flex items-center gap-3"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {r.title}
                          </button>
                        ))}
                      </div>
                    )}
                    {searchQuery.length >= 2 && searchResults.length === 0 && (
                      <div className="p-6 text-center text-sm text-gray-400">
                        No courses found for "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Download App */}
            <div className="relative hidden md:block group">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-primary hover:text-primary transition-all"
              >
                <Smartphone size={16} />
                <span>Download App</span>
              </motion.button>
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a
                  href="https://play.google.com/store/apps/details?id=co.marshal.xtdcq&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
                    <path d="M3.18 23.5c.3.17.64.2.96.1L14.72 12 3.14.4a1.1 1.1 0 0 0-.96.1C1.77 1 1.5 1.7 1.5 2.5v19c0 .8.27 1.5.68 2z" fill="#EA4335" />
                    <path d="M20.5 10.22 17.1 8.3l-3.72 3.7 3.72 3.72 3.43-1.94A2.02 2.02 0 0 0 20.5 10.22z" fill="#FBBC04" />
                    <path d="M3.14.4 14.72 12 3.14 23.6c-.04-.03-.08-.06-.12-.1A2 2 0 0 1 2.5 22V2c0-.72.24-1.35.64-1.6z" fill="#4285F4" />
                    <path d="M3.18.5 17.1 8.3 13.38 12 3.18.5z" fill="#34A853" />
                  </svg>
                  Google Play
                </a>
                <a
                  href="https://apps.apple.com/in/app/myinstitute/id1472483563"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>
              </div>
            </div>



            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 mb-3">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search courses..."
                  className="flex-1 text-sm outline-none bg-transparent text-dark"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="mb-3 bg-gray-50 rounded-xl overflow-hidden">
                  {searchResults.map((r) => (
                    <button
                      key={r.slug}
                      onClick={() => { handleSearchSelect(r.slug); setIsOpen(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm text-dark hover:bg-primary/5 border-b border-gray-100 last:border-0"
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Mobile Nav Items */}
              {menuItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Download App */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 px-4 mb-2 font-medium">Download Our App</p>
                <div className="flex gap-2 px-4">
                  <a
                    href="https://play.google.com/store/apps/details?id=co.marshal.xtdcq&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:border-primary hover:text-primary transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                      <path d="M3.18 23.5c.3.17.64.2.96.1L14.72 12 3.14.4a1.1 1.1 0 0 0-.96.1C1.77 1 1.5 1.7 1.5 2.5v19c0 .8.27 1.5.68 2z" fill="#EA4335" />
                      <path d="M20.5 10.22 17.1 8.3l-3.72 3.7 3.72 3.72 3.43-1.94A2.02 2.02 0 0 0 20.5 10.22z" fill="#FBBC04" />
                      <path d="M3.14.4 14.72 12 3.14 23.6c-.04-.03-.08-.06-.12-.1A2 2 0 0 1 2.5 22V2c0-.72.24-1.35.64-1.6z" fill="#4285F4" />
                      <path d="M3.18.5 17.1 8.3 13.38 12 3.18.5z" fill="#34A853" />
                    </svg>
                    Google Play
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/myinstitute/id1472483563"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:border-primary hover:text-primary transition-all"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    App Store
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
