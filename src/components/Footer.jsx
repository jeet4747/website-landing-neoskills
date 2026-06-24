import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowRight, Award, BookOpen, Users } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { label: 'PMP Certification', slug: 'pmp' },
    { label: 'AWS Cloud Practitioner', slug: 'aws-cloud-practitioner' },
    { label: 'CompTIA Security+', slug: 'comptia-security' },
    { label: 'Certified Scrum Master', slug: 'certified-scrum-master-csm' },
    { label: 'ITIL 4 Foundation', slug: 'itil-4-foundation' },
    { label: 'DevOps Tools & Training', slug: 'devops-tools-and-training' },
  ]

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div>
            <div className="bg-white rounded-xl p-2 w-fit mb-5">
              <img
                src="/images/nsl_logo__Logo_.svg"
                alt="NeoSkills Learning Solutions"
                width="145"
                height="80"
                className="h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              India's premier IT training provider empowering professionals with industry-recognized certifications across Pune, Mumbai, Bangalore, and all major cities.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
              <MapPin size={16} className="shrink-0 text-primary" />
              <span>Pune, Maharashtra, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Popular Courses</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    to={`/course/${link.slug}`}
                    className="text-gray-300 text-sm hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={12} className="shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Placements', href: '/placements' },
                { label: 'Enrollment Guide', href: '/enrollment-guide' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Blog', href: '/blog' },
                { label: 'Compare Courses', href: '/compare' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-of-service' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-300 text-sm hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={12} className="shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+918956963953" className="text-gray-300 text-sm hover:text-primary transition-colors flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-primary" />
                  +91 89569 63953
                </a>
              </li>
              <li>
                <a href="tel:+919975214585" className="text-gray-300 text-sm hover:text-primary transition-colors flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-primary" />
                  +91 99752 14585
                </a>
              </li>
              <li>
                <a href="mailto:contact@neoskills.co.in" className="text-gray-300 text-sm hover:text-primary transition-colors flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-primary" />
                  contact@neoskills.co.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <Clock size={16} className="shrink-0 text-primary" />
                Mon – Sat: 10:00 AM – 7:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-gray-800">
          {[
            { icon: Award, value: '50K+', label: 'Professionals Trained' },
            { icon: BookOpen, value: '50+', label: 'Certification Courses' },
            { icon: Users, value: '95%', label: 'Placement Rate' },
            { icon: MapPin, value: '7+', label: 'Cities Served' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-gray-800 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} NeoSkills Learning Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
