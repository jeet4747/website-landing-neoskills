import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
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
import CorporateTraining from './components/CorporateTraining.jsx'
import FreeResources from './components/FreeResources.jsx'
import CareerPathQuiz from './components/CareerPathQuiz.jsx'
import FAQAccordion from './components/FAQAccordion.jsx'
import CourseFinderAI from './components/CourseFinderAI.jsx'
import AICoursesPopup from './components/AICoursesPopup.jsx'
import LeadPopup from './components/LeadPopup.jsx'
import WhatsAppPopup from './components/WhatsAppPopup.jsx'
import WebinarPopup from './components/WebinarPopup.jsx'
import { EnrollProvider } from './context/EnrollContext.jsx'

const Enroll = lazy(() => import('./components/enroll.jsx'))
const PaymentPage = lazy(() => import('./components/paymentpage.jsx'))
const CourseDetail = lazy(() => import('./components/CourseDetail.jsx'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))
const TermsOfService = lazy(() => import('./pages/TermsOfService.jsx'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy.jsx'))
const FAQPage = lazy(() => import('./pages/FAQPage.jsx'))
const EnrollmentGuide = lazy(() => import('./pages/EnrollmentGuide.jsx'))
const ContactSupport = lazy(() => import('./pages/ContactSupport.jsx'))
const JobsPage = lazy(() => import('./pages/JobsPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const WebinarPage = lazy(() => import('./pages/WebinarPage.jsx'))
const QuickPay = lazy(() => import('./components/QuickPay.jsx'))

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

const SITE_URL = 'https://www.neoskills.co.in'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <EnrollProvider>
          <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <title>NeoSkills Learning Solutions - IT Training & Certifications</title>
            <meta name="description" content="Transform your career with world-class IT training from NeoSkills. 95% job placement rate, 50K+ certified professionals. CompTIA, PMP, CISA, AWS, Azure, Scrum and 50+ certification courses." />
            <meta name="keywords" content="IT training, cybersecurity certification, CompTIA Security+, PMP, CISA, CISM, AWS, Azure, project management, agile scrum, professional development, NeoSkills" />
            <meta property="og:title" content="NeoSkills Learning Solutions - Professional IT Training" />
            <meta property="og:description" content="Transform your career with world-class IT training. 95% job placement. 50K+ certified professionals." />
            <meta property="og:url" content={SITE_URL} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="NeoSkills Learning Solutions - Professional IT Training" />
            <meta name="twitter:description" content="Transform your career with world-class IT training. 95% job placement. 50K+ certified professionals." />
            <link rel="canonical" href={SITE_URL} />
          </Helmet>
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

                    <PartneringSection />

                    <section id="upcoming">
                      <UpcomingBatches />
                    </section>

                    <section id="courses">
                      <CoursesSection />
                    </section>

                    <section id="quiz">
                      <CareerPathQuiz />
                    </section>

                    <VideoShowcase />

                    <section id="why-us">
                      <WhyChooseUs />
                    </section>

                    <FreeResources />

                    <section id="testimonials">
                      <TestimonialsSection />
                    </section>

                    <section id="corporate">
                      <CorporateTraining />
                    </section>

                    <section id="faq">
                      <FAQAccordion />
                    </section>

                    <section id="contact">
                      <ContactForm />
                    </section>
                  </>
                }
              />
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/quick-pay" element={<QuickPay />} />
              <Route path="/course/:slug" element={<CourseDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/enrollment-guide" element={<EnrollmentGuide />} />
              <Route path="/contact-support" element={<ContactSupport />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/placements" element={<JobsPage />} />
              <Route path="/webinar/:slug" element={<WebinarPage />} />
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

          <CourseFinderAI />
          <AICoursesPopup />
          <WhatsAppPopup />
          <WebinarPopup />
          <LeadPopup />
          <Footer />
        </div>
      </EnrollProvider>
    </BrowserRouter>
    </HelmetProvider>
  )
}
