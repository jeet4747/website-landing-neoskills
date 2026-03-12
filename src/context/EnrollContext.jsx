import React, { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const EnrollContext = createContext()

export const EnrollProvider = ({ children }) => {
  const navigate = useNavigate()

  const openEnroll = (options = {}) => {
    navigate('/enroll', { state: options })
  }

  const openPayment = (paymentData = {}) => {
    navigate('/payment', { state: paymentData })
  }

  return (
    <EnrollContext.Provider value={{ openEnroll, openPayment }}>
      {children}
    </EnrollContext.Provider>
  )
}

export const useEnroll = () => {
  const context = useContext(EnrollContext)
  if (!context) {
    throw new Error('useEnroll must be used within EnrollProvider')
  }
  return context
}
