import React, { createContext, useState, useContext } from 'react';

const EnrollContext = createContext();

export const EnrollProvider = ({ children }) => {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const openEnroll = () => setIsEnrollOpen(true);
  const closeEnroll = () => setIsEnrollOpen(false);

  const openPayment = (data) => {
    setPaymentData(data || null);
    setIsPaymentOpen(true);
  };

  const closePayment = () => {
    setPaymentData(null);
    setIsPaymentOpen(false);
  };

  return (
    <EnrollContext.Provider value={{ isEnrollOpen, openEnroll, closeEnroll, isPaymentOpen, openPayment, closePayment, paymentData }}>
      {children}
    </EnrollContext.Provider>
  );
};

export const useEnroll = () => {
  const context = useContext(EnrollContext);
  if (!context) {
    throw new Error('useEnroll must be used within EnrollProvider');
  }
  return context;
};
