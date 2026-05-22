import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEnroll } from '../context/EnrollContext'
import { getAllResolvedCourses } from '../data/catalogBuilder'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)
  const { openEnroll } = useEnroll()
  const navigate = useNavigate()

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
    const all = getAllResolvedCourses()
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
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const [dropdownOpen, setDropdownOpen] = useState(null)

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
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
            href="#home"
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

            {/* CTA */}
            <motion.button
              onClick={openEnroll}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all shadow-md shadow-primary/20 text-sm"
            >
              Enroll Now
            </motion.button>

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

              {/* Mobile CTA */}
              <button
                onClick={() => { openEnroll(); setIsOpen(false) }}
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl mt-3"
              >
                Enroll Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
