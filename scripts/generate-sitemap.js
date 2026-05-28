import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const slugs = [
  'pmp','pmp-morning-batch','capm','prince2-foundation','prince2-practitioner',
  'prince2-agile-foundation','prince2-agile-practitioner','prince2-f-and-p',
  'aws-cloud-practitioner','aws-solutions-architect-associate','aws-sysops-administrator',
  'aws-certified-developer-associate','microsoft-azure-az-900','azure-administrator-az-104',
  'azure-solutions-architect-az-305','microsoft-azure-devops-az-400','google-cloud',
  'certified-scrum-master-csm','professional-scrum-master-i-psm-i','professional-scrum-master-ii-psm-ii',
  'professional-scrum-product-owner-i-pspo-i','professional-scrum-product-owner-ii-pspo-ii',
  'professional-scrum-master-ai-essentials-certification','advanced-certified-scrum-product-owner-a-cspo',
  'agile-advanced-certified-scrummaster-a-csm','agile-certified-scrum-product-owner-cspo',
  'agile-safe-advanced-scrum-master-sasm','itil-4-foundation','togaf-level-1-and-2-certification',
  'servicenow','servicenow-demo','istqb-foundation','six-sigma-green-belt','six-sigma-black-belt',
  'devops-exin-master','devops-tools-and-training','comptia-security','cisa','cism','ceh',
  'cpmai-and-ai-project-management','cbap','power-bi','advanced-threat-analysis',
  'security-architecture-design','advanced-data-engineering','real-time-data-processing',
  'itil-4-expert','itil-4-master-strategy','test-automation-framework-design','ai-in-testing',
  'advanced-analytics-and-ml','big-data-ai-integration',
]

const SITE_URL = 'https://neoskills.co.in'
const today = new Date().toISOString().split('T')[0]

const staticPages = [
  { loc: '', priority: '1.0', changefreq: 'weekly' },
  { loc: '/enroll', priority: '0.8', changefreq: 'monthly' },
  { loc: '/admin', priority: '0.3', changefreq: 'monthly' },
  { loc: '/privacy-policy', priority: '0.6', changefreq: 'monthly' },
  { loc: '/terms-of-service', priority: '0.6', changefreq: 'monthly' },
  { loc: '/cookie-policy', priority: '0.5', changefreq: 'monthly' },
  { loc: '/faq', priority: '0.7', changefreq: 'weekly' },
  { loc: '/enrollment-guide', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact-support', priority: '0.6', changefreq: 'monthly' },
  { loc: '/placements', priority: '0.7', changefreq: 'weekly' },
  { loc: '/about', priority: '0.8', changefreq: 'monthly' },
]

const urls = [
  ...staticPages.map(p => ({
    loc: `${SITE_URL}${p.loc}`,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority,
  })),
  ...slugs.map(slug => ({
    loc: `${SITE_URL}/course/${slug}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.9',
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`Sitemap generated: ${outPath} (${urls.length} URLs)`)
