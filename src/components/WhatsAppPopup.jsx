import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Users, ArrowRight } from 'lucide-react'

const WHATSAPP_NUMBER = '919975214585'

function whatsappLink() {
  const page = typeof window !== 'undefined' ? window.location.href : 'https://neoskills.co.in'
  const msg = `Hi, I was browsing ${page} and would like to know more about your courses. Could you please help me with the details?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function WhatsAppPopup() {
  const [show, setShow] = useState(false)
  const [bubble, setBubble] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setBubble(true), 4000)
    const t2 = setTimeout(() => setBubble(false), 15000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <>
      <div className="fixed left-4 bottom-6 z-40 flex items-end gap-3">
        <AnimatePresence>
          {bubble && !show && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              className="relative bg-white rounded-2xl rounded-bl-sm shadow-xl border border-gray-200 px-4 py-3 mb-1"
            >
              <p className="text-sm text-gray-700 whitespace-nowrap">Connect with a trainer! 💬</p>
              <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setShow(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 bg-green-500 text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center hover:bg-green-600 transition-colors flex-shrink-0"
          aria-label="Join WhatsApp community"
        >
          <MessageCircle size={24} />
        </motion.button>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShow(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full z-10"
              >
                <X size={18} />
              </button>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={36} />
                </div>
                <h3 className="text-2xl font-bold">Connect with a Mentor</h3>
                <p className="text-white/80 text-sm mt-1">Talk to our expert trainers on WhatsApp</p>
              </div>

              <div className="p-6 text-center">
                <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-4 mb-6 text-left">
                  <Users size={24} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Talk to a Trainer</p>
                    <p className="text-xs text-gray-500">Get personalized guidance on courses, batches & career path</p>
                  </div>
                </div>

                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  Start Chat
                  <ArrowRight size={18} />
                </a>
                <p className="text-xs text-gray-400 mt-3">Free. No spam. Leave anytime.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
