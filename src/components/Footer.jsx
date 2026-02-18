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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold">
                NS
              </div>
              <span className="text-xl font-bold">Neoskills</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Transforming careers through world-class professional training and certifications.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
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
                <a href="tel:+918087020031" className="text-white hover:text-primary transition-colors font-semibold">
                  +91 8087020031 
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
            <a href="#" cursor="pointer" className="text-gray-400 hover:text-primary transition-colors">
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
