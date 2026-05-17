import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
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

const Enroll = lazy(() => import('./components/enroll.jsx'))
const PaymentPage = lazy(() => import('./components/paymentpage.jsx'))
const CourseDetail = lazy(() => import('./components/CourseDetail.jsx'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard.jsx'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="inline-flex items-center justify-center rounded-full bg-white p-4 shadow-lg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <EnrollProvider>
        <div className="bg-white min-h-screen">
          <TopBar />
          <Navbar />

          <Suspense fallback={<PageLoader />}>
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
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={
                <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                  <div className="text-center max-w-md">
                    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                    <p className="text-xl text-gray-700 mb-2">Page not found</p>
                    <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                    <Link to="/" className="btn-primary inline-block">Go Home</Link>
                  </div>
                </main>
              } />
            </Routes>
          </Suspense>

          <Footer />
        </div>
      </EnrollProvider>
    </BrowserRouter>
  )
}
