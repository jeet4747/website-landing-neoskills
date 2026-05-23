import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Award, Users, BookOpen, Star, Globe, Shield,
  ArrowRight, Building2, Target, Eye, Heart, MapPin, Mail, Phone,
  Quote, CheckCircle, ChevronRight
} from 'lucide-react'

const stats = [
  { value: '50K+', label: 'Certified Professionals', icon: Users },
  { value: '95%', label: 'Placement Rate', icon: Award },
  { value: '50+', label: 'Programs', icon: BookOpen },
  { value: '4.8/5', label: 'Learner Rating', icon: Star },
  { value: '500+', label: 'Hiring Partners', icon: Building2 },
  { value: '7+', label: 'Global Partners', icon: Globe },
]

const milestones = [
  { year: '2018', title: 'Founded', desc: 'NeoSkills established to transform professional training in India.' },
  { year: '2019', title: '1,000 Learners', desc: 'Crossed first 1,000 certified professionals.' },
  { year: '2020', title: 'Global Ties', desc: 'Authorized partner of AWS, Microsoft, PMI & PeopleCert.' },
  { year: '2021', title: '10K Milestone', desc: '10,000+ professionals across 30+ programs.' },
  { year: '2023', title: '50+ Programs', desc: 'Expanded to AI, DevOps & Cybersecurity.' },
  { year: '2024', title: '50K Certified', desc: '50,000+ certified at 95% placement rate.' },
]

const ratings = [
  { platform: 'Google Reviews', rating: '4.7', count: '2,500+ reviews' },
  { platform: 'Trustpilot', rating: '4.6', count: '1,800+ reviews' },
  { platform: 'Course Report', rating: '4.8', count: '950+ reviews' },
  { platform: 'Annual Survey', rating: '4.8', count: 'Learner satisfaction 2024' },
]

const values = [
  { icon: Target, title: 'Quality First', desc: 'Courses designed and delivered by certified practitioners with real-world experience.' },
  { icon: Users, title: 'Learner-Centric', desc: 'Programs built around your needs — flexible schedules and dedicated support.' },
  { icon: Shield, title: 'Integrity', desc: 'Authorized partner of global certification bodies. Every certificate is authentic.' },
  { icon: Heart, title: 'Career-Focused', desc: 'Placement support, resume building, and interview prep with every program.' },
]

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & CEO', initials: 'RK' },
  { name: 'Priya Sharma', role: 'Head of Training', initials: 'PS' },
  { name: 'Amit Verma', role: 'Director — Cloud & DevOps', initials: 'AV' },
  { name: 'Sneha Patel', role: 'Head — Placements', initials: 'SP' },
]

const partners = ['AWS', 'Microsoft', 'PMI', 'PeopleCert', 'Scrum Alliance', 'IEEE', 'SAFe']

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About NeoSkills — India's Trusted IT Training Partner</title>
        <meta name="description" content="Since 2018, NeoSkills has certified 50,000+ professionals. Authorized partner of AWS, Microsoft, PMI, PeopleCert. 95% placement rate." />
      </Helmet>

      <main className="bg-white">
        {/* ──────── Hero ──────── */}
        <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
          <div className="max-w-5xl mx-auto px-4 py-20 md:py-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                <Building2 size={12} /> About NeoSkills
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Certifications That<br />Launch Careers
              </h1>
              <p className="text-base md:text-lg text-gray-300 mt-5 leading-relaxed max-w-2xl mx-auto">
                Since 2018, NeoSkills has been India's trusted partner for professional certifications. 
                We've helped 50,000+ professionals earn globally recognized credentials and advance their careers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ──────── Stats ──────── */}
        <section className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {stats.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-center"
                  >
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{s.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ──────── Intro ──────── */}
        <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                From Pune to the World
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm">
                NeoSkills started in 2018 with a simple belief — that quality professional training should be accessible 
                to everyone. What began as a small classroom in Baner, Pune, has grown into a trusted platform 
                serving learners across 15+ countries. We partner with the world's leading certification bodies 
                to deliver programs that are rigorous, relevant, and recognized.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <Quote size={28} className="text-primary/30 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600 italic text-sm leading-relaxed">
                    "Our mission is simple — help every professional earn the certification they deserve and build 
                    the career they aspire to. We measure our success by the success of our learners."
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">Rajesh Kumar</p>
                    <p className="text-xs text-gray-400">Founder & CEO, NeoSkills</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ──────── Mission & Vision ──────── */}
        <section className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 md:p-8 border border-gray-200"
              >
                <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center mb-4">
                  <Target size={18} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Mission</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  To make world-class certification training accessible, affordable, and effective for every 
                  aspiring professional. We bridge talent and opportunity through industry-aligned programs 
                  and unwavering placement support.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                className="bg-white rounded-xl p-6 md:p-8 border border-gray-200"
              >
                <div className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center mb-4">
                  <Eye size={18} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Vision</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  To be India's most trusted certification training provider — empowering over a million 
                  professionals with skills, credentials, and confidence to lead in the global economy.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ──────── Timeline ──────── */}
        <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Journey</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">Key milestones that shaped NeoSkills.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">{m.year}</span>
                <h3 className="text-sm font-bold text-gray-900 mt-2">{m.title}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────── Values ──────── */}
        <section className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">What We Stand For</h2>
              <p className="text-sm text-gray-500 max-w-lg mx-auto">Our principles guide every decision we make.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-3">
                      <Icon size={16} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{v.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{v.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ──────── Ratings ──────── */}
        <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ratings & Reviews</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">What learners say about their experience with us.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ratings.map((r, i) => (
              <motion.div
                key={r.platform}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-xl border border-gray-200 p-5 text-center"
              >
                <p className="text-2xl font-bold text-gray-900">{r.rating}<span className="text-sm text-gray-300">/5</span></p>
                <div className="flex items-center justify-center gap-0.5 my-1.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={11} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-700">{r.platform}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{r.count}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ──────── Team ──────── */}
        <section className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Leadership</h2>
              <p className="text-sm text-gray-500 max-w-lg mx-auto">Industry veterans committed to your success.</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {team.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-xl border border-gray-200 p-5 text-center hover:shadow-sm transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-700 text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                    {t.initials}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────── Partners ──────── */}
        <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Trusted by Global Leaders</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto mb-8">Authorized training partners of the world's leading certification bodies.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {partners.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm"
                >
                  {p}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ──────── CTA ──────── */}
        <section className="bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Your Next Step</h2>
              <p className="text-sm text-gray-400 max-w-lg mx-auto mb-7">
                Join 50,000+ professionals who have transformed their careers with NeoSkills.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/enroll" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-primary/20 text-sm">
                  Enroll Now <ArrowRight size={16} />
                </Link>
                <Link to="/contact-support" className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all border border-white/20 text-sm">
                  Contact Us
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-5 mt-7 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><Phone size={12} /> +91 8087020031</span>
                <span className="flex items-center gap-1.5"><Mail size={12} /> contact@neoskills.co.in</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} /> Baner, Pune</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
