import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, Users2, Sparkles, ArrowRight, IndianRupee } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEnroll } from '../context/EnrollContext'

const SHOW_DELAY = 15000
const SESSION_KEY = 'neoskills_workshop_popup_shown'

export default function WorkshopPopup() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { openPayment } = useEnroll()
  const scheduledRef = useRef(false)

  useEffect(() => {
    if (scheduledRef.current) return
    scheduledRef.current = true
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      /* ignore */
    }
    if (dismissed) return
    const timer = setTimeout(() => setShow(true), SHOW_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const markShown = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const handleDismiss = useCallback(() => {
    markShown()
    setShow(false)
  }, [markShown])

  const handleReserve = useCallback(() => {
    markShown()
    setShow(false)
    navigate('/workshop')
  }, [markShown, navigate])

  const handlePay = useCallback(() => {
    markShown()
    setShow(false)
    openPayment({
      name: '',
      email: '',
      phone: '',
      course: 'AI Essentials for Project Managers Workshop',
      amount: 5999,
      source: 'workshop-popup',
    })
  }, [markShown, openPayment])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="bg-gradient-to-br from-primary to-blue-800 p-6 text-white relative">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/30 transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-accent uppercase mb-3">
                <Sparkles size={13} /> 1-Day Practical Workshop | Pune
              </span>
              <h3 className="text-2xl font-extrabold leading-tight mb-2">AI Essentials for Project Managers</h3>
              <p className="text-white/85 text-sm">
                Build your AI Project Management Team — Coordinator, Peer PM & Director.
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="bg-light-gray rounded-xl p-3 text-center">
                  <Clock className="text-primary mx-auto mb-1" size={18} />
                  <p className="text-xs font-bold text-dark">8 Hours</p>
                  <p className="text-[10px] text-gray-500">Hands-on</p>
                </div>
                <div className="bg-light-gray rounded-xl p-3 text-center">
                  <Calendar className="text-primary mx-auto mb-1" size={18} />
                  <p className="text-xs font-bold text-dark">1 Day</p>
                  <p className="text-[10px] text-gray-500">Pune venue</p>
                </div>
                <div className="bg-light-gray rounded-xl p-3 text-center">
                  <IndianRupee className="text-primary mx-auto mb-1" size={18} />
                  <p className="text-xs font-bold text-dark">₹5,999</p>
                  <p className="text-[10px] text-gray-500">per seat</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <Users2 size={15} className="text-primary shrink-0" />
                Reclaim 20–30 working hours every month with AI.
              </p>
              <p className="text-xs text-gray-400 mb-5">
                No coding required · Instructor: Abhijit Ambulkar, PMP, CPMAI
              </p>

              <motion.button
                onClick={handleReserve}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
              >
                Reserve Your Seat <ArrowRight size={16} />
              </motion.button>

              <div className="mt-3 text-center">
                <button onClick={handlePay} className="text-xs text-gray-400 hover:text-primary underline underline-offset-2">
                  Or pay ₹5,999 directly via Razorpay
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}