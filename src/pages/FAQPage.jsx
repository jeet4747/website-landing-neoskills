import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HelpCircle } from 'lucide-react'
import FAQAccordion from '../components/FAQAccordion.jsx'

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | NeoSkills Learning Solutions</title>
        <meta name="description" content="Find answers to common questions about NeoSkills courses, enrollment, payments, certifications, and more." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <Link to="/" className="text-primary hover:underline text-sm">&larr; Home</Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl"><HelpCircle className="text-primary" size={28} /></div>
            <div><h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <FAQAccordion />
          </div>
          <div className="mt-8 text-center bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h2>
            <p className="text-gray-600 mb-4">Our support team is happy to help.</p>
            <Link to="/contact-support" className="btn-primary inline-block">Contact Support</Link>
          </div>
        </div>
      </div>
    </>
  )
}
