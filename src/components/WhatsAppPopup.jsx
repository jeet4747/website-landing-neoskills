import React from 'react'
import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = '919975214585'

function whatsappLink() {
  const page = typeof window !== 'undefined' ? window.location.href : 'https://neoskills.co.in'
  const message = `Hi NeoSkills, I was browsing ${page} and would like help with a course.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 32 32" width="29" height="29" aria-hidden="true" fill="none">
      <path d="M16 4.2a11.8 11.8 0 0 0-10.07 17.95L4.3 27.8l5.82-1.53A11.8 11.8 0 1 0 16 4.2Z" fill="white" />
      <path d="M16 6.3a9.7 9.7 0 0 0-5.09 17.95l.38.23-3.15.83.84-3.06.24.38A9.7 9.7 0 1 0 16 6.3Z" fill="#25D366" />
      <path d="M21.77 19.13c-.3-.15-1.78-.88-2.06-.98-.28-.1-.49-.15-.7.15-.2.3-.8.98-.98 1.18-.18.2-.36.23-.67.08a7.93 7.93 0 0 1-2.34-1.44 8.83 8.83 0 0 1-1.63-2.03c-.17-.3 0-.47.13-.62.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.53h-.59c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5s1.09 2.9 1.24 3.1c.15.2 2.14 3.27 5.18 4.59.72.31 1.29.5 1.73.64.73.23 1.4.2 1.93.12.59-.09 1.78-.73 2.03-1.44.25-.7.25-1.31.18-1.44-.08-.13-.28-.2-.58-.35Z" fill="white" />
    </svg>
  )
}

export default function WhatsAppPopup() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      className="group fixed bottom-24 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center hover:bg-[#1fba57] transition-colors"
      aria-label="Chat with NeoSkills on WhatsApp"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-green-400/70"
        animate={{ scale: [1, 1.28, 1.28], opacity: [0.5, 0, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3.2, ease: 'easeOut' }}
      />
      <WhatsAppLogo />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white shadow-lg opacity-0 translate-x-[6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        Chat on WhatsApp
      </span>
    </motion.a>
  )
}
