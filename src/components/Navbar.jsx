import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Search } from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { openEnroll } = useEnroll()

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'All Courses', href: '#courses' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

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
      className="sticky top-0 w-full bg-white text-dark z-40 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/nsl_logo__Logo_.svg"
            alt="Neoskill Learning Solutions"
            className="h-24 w-auto object-contain"
          />
        </motion.div>

        {/* Desktop Menu Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex items-center gap-8 flex-1 justify-center"
        >
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-dark hover:text-primary transition-colors font-medium text-sm cursor-pointer relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center bg-light-gray rounded-lg px-3 py-2 ml-4 flex-1 max-w-xs border border-transparent focus-within:border-primary transition-all"
        >
          <Search size={16} className="text-primary" />
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="bg-transparent ml-2 w-full text-sm outline-none text-dark placeholder-gray-500"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={openEnroll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:block btn-primary ml-4"
        >
          Enroll Now
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 hover:bg-light-gray rounded-lg transition-colors ml-auto"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden border-t border-border-gray bg-light-gray"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">

            {/* Mobile Logo */}
            <div className="flex justify-center mb-2">
              <img
                src="/images/nsl_logo__Logo_.svg"
                alt="Neoskill Learning Solutions"
                className="h-20 w-auto object-contain"
              />
            </div>

            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-dark hover:text-primary transition-colors font-medium py-2 cursor-pointer border-b border-gray-100 last:border-0"
              >
                {item.label}
              </a>
            ))}

            <div className="flex items-center bg-white rounded-lg px-3 py-2 my-2 border border-transparent focus-within:border-primary transition-all">
              <Search size={16} className="text-primary" />
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="bg-transparent ml-2 w-full text-sm outline-none text-dark placeholder-gray-500"
              />
            </div>

            <button onClick={openEnroll} className="btn-primary w-full">
              Enroll Now
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar