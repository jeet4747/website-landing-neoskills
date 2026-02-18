import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Gift } from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

const TopBar = () => {
  const { openEnroll } = useEnroll()
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary text-white py-3 text-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left - Contact Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={16} />
              <a href="tel:+918087020031">+91 8087020031</a>
            </div>
            <div className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={16} />
              <a href="tel:+13073875278">+91 9975214585</a>
            </div>
          </div>

          {/* Center - Offer */}
          <div className="flex items-center gap-2 justify-center flex-1 md:flex-none">
            <Gift size={18} />
            <span className="font-semibold">20% Off | Get Certified. Get Ahead!</span>
          </div>

          {/* Right - Contact & CTA */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail size={16} />
              <a href="mailto:contact@neoskills.co.in">contact@neoskills.co.in</a>
            </div>
            <button onClick={openEnroll} className="bg-accent text-dark px-3 py-1 rounded font-semibold hover:bg-yellow-400 transition-colors text-xs">
              Talk to Advisor
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TopBar
