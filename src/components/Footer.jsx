import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Courses': ['All Courses', 'CompTIA Certifications', 'CISA & CISM', 'Agile & Scrum', 'IT Service Management'],
    'Company': ['About Us', 'Blog', 'Careers', 'Press', 'Contact'],
    'Support': ['Help Center', 'FAQ', 'Documentation', 'Community', 'Status'],
    'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer']
  }

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' }
  ]

  return (
    <footer className="bg-dark text-white py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            {/* Logo */}
            <div className="mb-4">
              <div className="bg-white rounded-xl p-2 w-fit">
                <img
                  src="/images/nsl_logo__Logo_.svg"
                  alt="Neoskill Learning Solutions"
                  className="h-24 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Transforming careers through world-class professional training and certifications.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
                    title={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>

            {/* App Download Badges */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">Download Our App</p>
              <div className="flex flex-col gap-3">

                {/* Google Play Badge */}
                <motion.a
                  href="https://play.google.com/store/apps/details?id=co.marshal.xtdcq&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-black border border-gray-700 hover:border-gray-400 transition-all rounded-xl px-4 py-2.5 w-fit"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="none">
                    <path d="M3.18 23.5c.3.17.64.2.96.1L14.72 12 3.14.4a1.1 1.1 0 0 0-.96.1C1.77 1 1.5 1.7 1.5 2.5v19c0 .8.27 1.5.68 2z" fill="#EA4335" />
                    <path d="M20.5 10.22 17.1 8.3l-3.72 3.7 3.72 3.72 3.43-1.94A2.02 2.02 0 0 0 20.5 10.22z" fill="#FBBC04" />
                    <path d="M3.14.4 14.72 12 3.14 23.6c-.04-.03-.08-.06-.12-.1A2 2 0 0 1 2.5 22V2c0-.72.24-1.35.64-1.6z" fill="#4285F4" />
                    <path d="M3.18.5 17.1 8.3 13.38 12 3.18.5z" fill="#34A853" />
                  </svg>
                  <div className="text-left">
                    <p className="text-gray-400 text-xs leading-none mb-0.5">GET IT ON</p>
                    <p className="text-white text-sm font-semibold leading-none">Google Play</p>
                  </div>
                </motion.a>

                {/* App Store Badge */}
                <motion.a
                  href="https://apps.apple.com/in/app/myinstitute/id1472483563"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-black border border-gray-700 hover:border-gray-400 transition-all rounded-xl px-4 py-2.5 w-fit"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-gray-400 text-xs leading-none mb-0.5">DOWNLOAD ON THE</p>
                    <p className="text-white text-sm font-semibold leading-none">App Store</p>
                  </div>
                </motion.a>

              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-white mb-4">{section[0]}</h3>
              <ul className="space-y-2">
                {section[1].map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-12 mb-8"
        >
          <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-3">
              <Phone className="text-primary flex-shrink-0" size={24} />
              <div>
                <p className="text-gray-400 text-sm mb-1">India</p>
                <a href="tel:+918087020031" className="text-white hover:text-primary transition-colors font-semibold block">
                  +91 8087020031
                </a>
                <a href="tel:+919975214585" className="text-white hover:text-primary transition-colors font-semibold block">
                  +91 9975214585
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="text-primary flex-shrink-0" size={24} />
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <a href="mailto:contact@neoskills.co.in" className="text-white hover:text-primary transition-colors font-semibold">
                  contact@neoskills.co.in
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="text-primary flex-shrink-0" size={24} />
              <div>
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white font-semibold">
                  Baner Pune, Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {currentYear} Neoskills Learning Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              Cookie Settings
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer