import React from 'react'
import { Phone, Mail, Gift } from 'lucide-react'
import { useEnroll } from '../context/EnrollContext'

const TopBar = () => {
  const { openEnroll } = useEnroll()
  return (
    <div className="bg-primary text-white py-3 text-sm animate-slide-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={16} />
              <a href="tel:+918956963953">+91 89569 63953</a>
            </div>
            <div className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={16} />
              <a href="tel:+919975214585">+91 9975214585</a>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center flex-1 md:flex-none">
            <Gift size={18} />
            <span className="font-semibold">Empower Your Future</span>
          </div>
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
    </div>
  )
}

export default TopBar
