import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | NeoSkills Learning Solutions</title>
        <meta name="description" content="NeoSkills Learning Solutions terms of service. Enrollment terms, payment policies, refund policy, and user agreements." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <Link to="/" className="text-primary hover:underline text-sm">&larr; Home</Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl"><FileText className="text-primary" size={28} /></div>
            <div><h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1><p className="text-gray-500">Last updated: May 2026</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6 text-gray-700 leading-relaxed">
            <section><h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using NeoSkills Learning Solutions website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">2. Enrollment & Payment</h2>
            <p>Course fees are as listed on the website. Payment must be completed before batch commencement. All fees are in Indian Rupees (INR) and are subject to applicable taxes (GST). EMI options may be available — contact admissions for details.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">3. Refund & Cancellation</h2>
            <p>Cancellations made within 7 days of batch start are eligible for a full refund minus administrative fees. No refunds are issued after the first session. Refund processing takes 7–14 business days. Contact <a href="mailto:contact@neoskills.co.in" className="text-primary">contact@neoskills.co.in</a> for refund requests.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
            <p>All course materials, recordings, slides, and content provided during training are the intellectual property of NeoSkills Learning Solutions. You may not distribute, reproduce, or resell any materials without written permission.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">5. User Conduct</h2>
            <p>You agree to use our platform responsibly. Harassment, disruptive behavior, or misuse of course materials may result in removal from the program without refund.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p>NeoSkills Learning Solutions is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the fees paid for the specific course.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">7. Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Users will be notified of material changes via email or website notice. Continued use constitutes acceptance of updated terms.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
            <p>For questions about these terms, email <a href="mailto:contact@neoskills.co.in" className="text-primary font-medium">contact@neoskills.co.in</a> or call <a href="tel:+918956963953" className="text-primary font-medium">+91 89569 63953</a>.</p></section>
          </div>
        </div>
      </div>
    </>
  )
}
