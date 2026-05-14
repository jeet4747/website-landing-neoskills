import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import CoursesSection from './components/CoursesSection.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import PartneringSection from './components/partneringsection.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import UpcomingBatches from './components/UpcomingBatches.jsx'
import { EnrollProvider } from './context/EnrollContext.jsx'
import Enroll from './components/enroll.jsx'
import PaymentPage from './components/paymentpage.jsx'
import CourseDetail from './components/CourseDetail.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <EnrollProvider>
        <div className="bg-white min-h-screen">
          <TopBar />
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section id="home">
                    <HeroSection />
                  </section>

                  <section id="upcoming">
                    <UpcomingBatches />
                  </section>

                  <section id="courses">
                    <CoursesSection />
                  </section>

                  <section id="why-us">
                    <WhyChooseUs />
                  </section>

                  <PartneringSection />
                  <VideoShowcase />

                  <section id="testimonials">
                    <TestimonialsSection />
                  </section>

                  <section id="contact">
                    <ContactForm />
                  </section>
                </>
              }
            />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/course/:slug" element={<CourseDetail />} />
          </Routes>

          <Footer />
        </div>
      </EnrollProvider>
    </BrowserRouter>
  )
}
