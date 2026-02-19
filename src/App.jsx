import React from 'react'
import TopBar from './components/TopBar'
import Navbar from './components/navbar'
import HeroSection from './components/herosection'
import CoursesSection from './components/coursessection'
import WhyChooseUs from './components/whyChooseUs'
import TestimonialsSection from './components/testimonialsSection'
import ContactForm from './components/contactform'
import Footer from './components/footer'
import UpcomingBatches from './components/UpcomingBatches'
import { EnrollProvider } from './context/EnrollContext'
import Enroll from './components/enroll'
import PaymentPage from './components/paymentpage'

export default function App() {
  return (
    <EnrollProvider>
      <div className="bg-white min-h-screen">
        <TopBar />
        <Navbar />
        <section id="home"><HeroSection /></section>
        <section id="upcoming"><UpcomingBatches /></section>
        <section id="courses"><CoursesSection /></section>
        <section id="why-us"><WhyChooseUs /></section>
        <section id="testimonials"><TestimonialsSection /></section>
        <section id="contact"><ContactForm /></section>
        <Footer />
        <Enroll />
        <PaymentPage />
      </div>
    </EnrollProvider>
  )
}
