import React from 'react'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CoursesSection from './components/CoursesSection'
import WhyChooseUs from './components/WhyChooseUs'
import TestimonialsSection from './components/TestimonialsSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import { EnrollProvider } from './context/EnrollContext'
import Enroll from './components/enroll'
import paymentpage from './components/paymentpage'

export default function App() {
  return (
    <EnrollProvider>
      <div className="bg-white min-h-screen">
        <TopBar />
        <Navbar />
        <section id="home"><HeroSection /></section>
        <section id="courses"><CoursesSection /></section>
        <section id="why-us"><WhyChooseUs /></section>
        <section id="testimonials"><TestimonialsSection /></section>
        <section id="contact"><ContactForm /></section>
        <Footer />
        <Enroll />
        <paymentpage />
      </div>
    </EnrollProvider>
  )
}
