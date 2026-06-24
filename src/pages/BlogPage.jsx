import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Calendar, User, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react'

const categories = ['All', 'Project Management', 'Cloud Computing', 'Agile & Scrum', 'Cybersecurity', 'Data Science', 'Career Advice']

const articles = [
  {
    title: 'PMP Certification: Complete Guide for 2025',
    slug: 'pmp-certification-guide-2025',
    category: 'Project Management',
    excerpt: 'Everything you need to know about PMP certification — eligibility, exam format, cost, application process, and study tips to pass on your first attempt.',
    author: 'Rajesh Kumar',
    date: '2025-06-15',
    readTime: '8 min read',
    image: '',
  },
  {
    title: 'AWS vs Azure vs Google Cloud: Which Certification Should You Choose?',
    slug: 'aws-vs-azure-vs-google-cloud',
    category: 'Cloud Computing',
    excerpt: 'Compare AWS, Azure, and Google Cloud certifications across cost, difficulty, career opportunities, and market demand to pick the right one for your goals.',
    author: 'Priya Sharma',
    date: '2025-06-10',
    readTime: '10 min read',
    image: '',
  },
  {
    title: 'CSM vs PSM: Which Scrum Master Certification Is Right for You?',
    slug: 'csm-vs-psm-scrum-master',
    category: 'Agile & Scrum',
    excerpt: 'Scrum Alliance CSM vs Scrum.org PSM — a detailed comparison of acceptance criteria, exam difficulty, renewal costs, and industry recognition.',
    author: 'Vikram Mehta',
    date: '2025-06-05',
    readTime: '6 min read',
    image: '',
  },
  {
    title: 'Top 5 Cybersecurity Certifications for 2025',
    slug: 'top-cybersecurity-certifications-2025',
    category: 'Cybersecurity',
    excerpt: 'From CompTIA Security+ to CISSP — explore the most valued cybersecurity certifications and which path suits your experience level.',
    author: 'Ananya Das',
    date: '2025-05-28',
    readTime: '7 min read',
    image: '',
  },
  {
    title: 'How to Become a Data Scientist in 2025',
    slug: 'become-data-scientist-2025',
    category: 'Data Science',
    excerpt: 'A step-by-step roadmap covering the skills, tools, certifications, and projects you need to break into data science this year.',
    author: 'NeoSkills Editorial',
    date: '2025-05-20',
    readTime: '9 min read',
    image: '',
  },
  {
    title: 'ITIL 4 Foundation: Is It Worth It in 2025?',
    slug: 'itil-4-foundation-worth-2025',
    category: 'Project Management',
    excerpt: 'An honest look at the ITIL 4 Foundation certification — its value, who should take it, exam changes, and career impact in 2025.',
    author: 'Vikram Mehta',
    date: '2025-05-12',
    readTime: '5 min read',
    image: '',
  },
  {
    title: 'PRINCE2 vs PMP: Which Project Management Certification?',
    slug: 'prince2-vs-pmp',
    category: 'Project Management',
    excerpt: 'Understand the key differences between PRINCE2 and PMP — methodology, global recognition, exam structure, and which employers prefer.',
    author: 'Rajesh Kumar',
    date: '2025-05-05',
    readTime: '7 min read',
    image: '',
  },
  {
    title: 'Top 10 In-Demand IT Certifications for Higher Salary',
    slug: 'top-it-certifications-higher-salary',
    category: 'Career Advice',
    excerpt: 'Which IT certifications command the highest salaries in 2025? We rank the top 10 based on industry surveys and placement data.',
    author: 'Sneha Patel',
    date: '2025-04-28',
    readTime: '8 min read',
    image: '',
  },
  {
    title: 'How to Prepare for Azure AZ-900 in 2 Weeks',
    slug: 'azure-az-900-prep-2-weeks',
    category: 'Cloud Computing',
    excerpt: 'A focused 14-day study plan for Azure AZ-900 — what to study, practice tests, labs, and exam day tips to pass with confidence.',
    author: 'Priya Sharma',
    date: '2025-04-20',
    readTime: '6 min read',
    image: '',
  },
  {
    title: 'Scrum vs SAFe: Which Agile Framework Should You Learn?',
    slug: 'scrum-vs-safe-agile',
    category: 'Agile & Scrum',
    excerpt: 'Compare Scrum and SAFe frameworks — team-level agility vs enterprise scaling, certification paths, and when to choose each approach.',
    author: 'Vikram Mehta',
    date: '2025-04-12',
    readTime: '7 min read',
    image: '',
  },
  {
    title: 'CEH vs CompTIA Security+: Entry-Level Cybersecurity Showdown',
    slug: 'ceh-vs-comptia-security-plus',
    category: 'Cybersecurity',
    excerpt: 'A side-by-side comparison of CEH and CompTIA Security+ — cost, exam difficulty, hands-on labs, and which employer values more.',
    author: 'Ananya Das',
    date: '2025-04-05',
    readTime: '6 min read',
    image: '',
  },
  {
    title: 'CPMAI Certification: AI Project Management for Modern Teams',
    slug: 'cpmai-certification-ai-project-management',
    category: 'Data Science',
    excerpt: 'Learn about the CPMAI certification — how it blends AI and project management, who should pursue it, and career opportunities post-certification.',
    author: 'Rajesh Kumar',
    date: '2025-03-28',
    readTime: '5 min read',
    image: '',
  },
]

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('All')
  const [searchQ, setSearchQ] = useState('')

  const filtered = useMemo(() => {
    let result = articles
    if (activeCat !== 'All') {
      result = result.filter(a => a.category === activeCat)
    }
    if (searchQ.trim().length >= 2) {
      const q = searchQ.toLowerCase()
      result = result.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
    }
    return result
  }, [activeCat, searchQ])

  return (
    <>
      <Helmet>
        <title>Blog & Resources | NeoSkills Learning Solutions</title>
        <meta name="description" content="Explore articles, guides, and resources on PMP, AWS, Scrum, cybersecurity certifications, career advice, and professional development." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
          <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <BookOpen size={12} /> Resources
              </span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Blog & Resources</h1>
              <p className="text-gray-300 mt-3 text-sm md:text-base">Guides, comparisons, and career advice to help you choose the right certification path.</p>
            </motion.div>
            {/* Search */}
            <div className="max-w-md mx-auto mt-8 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-white/30"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <div className="bg-white border-b border-gray-100 sticky top-20 z-30">
          <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCat === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="max-w-5xl mx-auto px-4 py-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No articles found matching your criteria.</p>
              <button type="button" onClick={() => { setActiveCat('All'); setSearchQ('') }} className="text-primary text-sm font-semibold mt-2 hover:underline">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col"
                >
                  <div className="h-40 bg-gradient-to-br from-primary/5 to-blue-50 flex items-center justify-center">
                    <BookOpen size={48} className="text-primary/30" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-full">{article.category}</span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
                    </div>
                    <h2 className="font-bold text-gray-800 text-base mb-2 leading-snug">{article.title}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <User size={11} />
                        <span>{article.author}</span>
                        <span className="text-gray-300">|</span>
                        <Calendar size={11} />
                        <span>{new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <ArrowRight size={14} className="text-primary shrink-0" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
