import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | NeoSkills Learning Solutions</title>
        <meta name="description" content="NeoSkills Learning Solutions cookie policy. Learn about the cookies we use and how to control your cookie preferences." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <Link to="/" className="text-primary hover:underline text-sm">&larr; Home</Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl"><Cookie className="text-primary" size={28} /></div>
            <div><h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1><p className="text-gray-500">Last updated: May 2026</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6 text-gray-700 leading-relaxed">
            <section><h2 className="text-xl font-bold text-gray-900 mb-3">1. What Are Cookies</h2>
            <p>Cookies are small text files stored on your device by your web browser. They help websites remember your preferences, understand how you use the site, and improve your experience.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">2. Cookies We Use</h2>
            <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="bg-gray-100"><th className="text-left p-2 border">Type</th><th className="text-left p-2 border">Purpose</th><th className="text-left p-2 border">Duration</th></tr></thead><tbody>
              <tr><td className="p-2 border">Essential</td><td className="p-2 border">Session management, security, form submissions</td><td className="p-2 border">Session / persistent</td></tr>
              <tr><td className="p-2 border">Analytics</td><td className="p-2 border">Page views, traffic sources, user behavior (Google Analytics)</td><td className="p-2 border">Up to 2 years</td></tr>
              <tr><td className="p-2 border">Preference</td><td className="p-2 border">Remember language, region, and display settings</td><td className="p-2 border">1 year</td></tr>
              <tr><td className="p-2 border">Marketing</td><td className="p-2 border">Personalized ads and campaign tracking</td><td className="p-2 border">90 days</td></tr>
            </tbody></table></div></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">3. Third-Party Cookies</h2>
            <p>We use trusted third-party services that may set their own cookies: Google Analytics (website analytics), Google Ads (marketing), Razorpay (payment processing), and EmailJS (contact forms). These providers have their own privacy and cookie policies.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">4. Managing Cookies</h2>
            <p>You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling essential cookies may affect website functionality. <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary">Learn how to manage cookies</a>.</p></section>

            <section><h2 className="text-xl font-bold text-gray-900 mb-3">5. Contact</h2>
            <p>For questions about this policy, email <a href="mailto:contact@neoskills.co.in" className="text-primary font-medium">contact@neoskills.co.in</a>.</p></section>
          </div>
        </div>
      </div>
    </>
  )
}
