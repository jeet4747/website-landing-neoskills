import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin,
  ArrowRight, ChevronRight, Shield
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  const footerLinks = {
    'Courses': [
      { label: 'All Courses', href: '/#courses' },
      { label: 'PMP Certification', href: '/course/pmp' },
      { label: 'AWS Training', href: '/course/aws-cloud-practitioner' },
      { label: 'ITIL Foundation', href: '/course/itil-4-foundation' },
      { label: 'Azure Cloud', href: '/course/microsoft-azure-az-900' },
    ],
    'Company': [
      { label: 'About Us', href: '/about' },
      { label: 'Upcoming Batches', href: '/#upcoming' },
      { label: 'Placements', href: '/placements' },
      { label: 'Testimonials', href: '/#testimonials' },
      { label: 'Contact', href: '/#contact' },
    ],
    'Support': [
      { label: 'FAQ', href: '/faq' },
      { label: 'Enrollment Guide', href: '/enrollment-guide' },
      { label: 'Contact Support', href: '/contact-support' },
    ],
    'Legal': [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ]
  }

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
  ]

  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Top section: Main content */}
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-16">
            {/* Brand column - spans 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl p-2 w-fit mb-5">
                <img
                  src="/images/nsl_logo__Logo_.svg"
                  alt="Neoskill Learning Solutions"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                India's trusted training partner for professional certifications. 50K+ professionals certified across 50+ programs.
              </p>

              {/* Social + Contact inline */}
              <div className="flex flex-wrap gap-3 mb-6">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={i}
                      href={social.href}
                      className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400"
                      title={social.label}
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>

              {/* Contact strip */}
              <div className="space-y-2.5">
                <a href="tel:+918087020031" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                  <Phone size={14} className="text-primary shrink-0" />
                  +91 8087020031 / +91 9975214585
                </a>
                <a href="mailto:contact@neoskills.co.in" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
                  <Mail size={14} className="text-primary shrink-0" />
                  contact@neoskills.co.in
                </a>
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <MapPin size={14} className="text-primary shrink-0" />
                  Baner, Pune, Maharashtra, India
                </div>
              </div>
            </motion.div>

            {/* Link columns - spans 4 */}
            {Object.entries(footerLinks).map(([title, links], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="lg:col-span-1"
              >
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group"
                      >
                        <ChevronRight size={12} className="text-primary/0 group-hover:text-primary transition-all" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Middle bar: Newsletter + App + Trust */}
        <div className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Newsletter */}
              <div className="md:col-span-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Stay Updated</p>
                <p className="text-sm text-gray-400 mb-3">Get latest batch schedules and career tips.</p>
                {subscribed ? (
                  <p className="text-green-400 text-sm font-medium">Thanks for subscribing!</p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2.5 bg-primary rounded-lg hover:bg-blue-800 transition-all flex items-center justify-center"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </form>
                )}
              </div>

              {/* App Downloads */}
              <div className="md:col-span-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3 text-center md:text-left">Download Our App</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=co.marshal.xtdcq&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-white/5 border border-white/10 hover:border-white/30 transition-all rounded-lg px-3.5 py-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
                      <path d="M3.18 23.5c.3.17.64.2.96.1L14.72 12 3.14.4a1.1 1.1 0 0 0-.96.1C1.77 1 1.5 1.7 1.5 2.5v19c0 .8.27 1.5.68 2z" fill="#EA4335" />
                      <path d="M20.5 10.22 17.1 8.3l-3.72 3.7 3.72 3.72 3.43-1.94A2.02 2.02 0 0 0 20.5 10.22z" fill="#FBBC04" />
                      <path d="M3.14.4 14.72 12 3.14 23.6c-.04-.03-.08-.06-.12-.1A2 2 0 0 1 2.5 22V2c0-.72.24-1.35.64-1.6z" fill="#4285F4" />
                      <path d="M3.18.5 17.1 8.3 13.38 12 3.18.5z" fill="#34A853" />
                    </svg>
                    <div className="text-left">
                      <p className="text-gray-500 text-[10px] leading-none mb-px">GET IT ON</p>
                      <p className="text-white text-xs font-semibold leading-none">Google Play</p>
                    </div>
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/myinstitute/id1472483563"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-white/5 border border-white/10 hover:border-white/30 transition-all rounded-lg px-3.5 py-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-gray-500 text-[10px] leading-none mb-px">DOWNLOAD ON THE</p>
                      <p className="text-white text-xs font-semibold leading-none">App Store</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Trust badge */}
              <div className="md:col-span-1 text-center md:text-right">
                <div className="inline-flex items-center gap-2 bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                  <Shield size={18} className="text-primary shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Trusted by 50K+</p>
                    <p className="text-[11px] text-gray-500">Professionals worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs">
              &copy; {currentYear} NeoSkills Learning Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs">
              <a href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="/cookie-policy" className="text-gray-500 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer