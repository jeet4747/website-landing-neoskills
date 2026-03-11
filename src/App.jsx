import React from 'react'
import TopBar from './components/TopBar.jsx'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/herosection.jsx'
import CoursesSection from './components/coursessection.jsx'
import WhyChooseUs from './components/whyChooseUs.jsx'
import TestimonialsSection from './components/testimonialsSection.jsx'
import ContactForm from './components/contactform.jsx'
import Footer from './components/footer.jsx'
import UpcomingBatches from './components/UpcomingBatches.jsx'
import { EnrollProvider } from './context/EnrollContext.jsx'
import Enroll from './components/enroll.jsx'
import PaymentPage from './components/paymentpage.jsx'

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
