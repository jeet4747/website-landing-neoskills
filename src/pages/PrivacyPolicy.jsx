import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | NeoSkills Learning Solutions</title>
        <meta name="description" content="NeoSkills Learning Solutions privacy policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <Link to="/" className="text-primary hover:underline text-sm">&larr; Home</Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl"><Shield className="text-primary" size={28} /></div>
            <div><h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1><p className="text-gray-500">Last updated: May 2026</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6 text-gray-700 leading-relaxed">
            <section><h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly: name, email address, phone number, and payment details when you enroll in a course, contact us, or sign up for updates. We also automatically collect usage data (pages visited, time spent, device type) via cookies and analytics tools.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 space-y-1"><li>To process enrollments and deliver training</li><li>To communicate about batches, schedules, and account updates</li><li>To improve our website and course offerings</li><li>To send promotional communications (you may opt out anytime)</li><li>To comply with legal obligations</li></ul></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with trusted service providers (payment processors, email delivery services) who are contractually bound to protect your data. We may disclose information if required by law.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Retention</h2>
            <p>We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You may withdraw consent for marketing communications at any time by contacting us. Under applicable law (including DPDP Act 2023), you may also request data portability.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">6. Security</h2>
            <p>We implement industry-standard security measures including SSL/TLS encryption, secure payment gateways, and restricted data access to protect your information.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
            <p>For privacy-related inquiries, contact us at <a href="mailto:contact@neoskills.co.in" className="text-primary font-medium">contact@neoskills.co.in</a> or call <a href="tel:+918956963953" className="text-primary font-medium">+91 89569 63953</a>.</p></section>
          </div>
        </div>
      </div>
    </>
  )
}
