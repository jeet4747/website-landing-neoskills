import { courseStructure } from './courseStructure.js'
import {
  pmpCourse,
  awsTrainingCourse,
  azureAiTrainingCourse,
  itil5FoundationCourse,
  capmCourse,
  courseCategories as baseCourseCategories,
} from './courseDataRich.js'

/** Always compute total as training + exam — never trust stored total. */
export function getTotal(c) {
  const total = Number(c.feeDetails?.total ?? 0)
  if (total > 0) return total
  const training = Number(c.feeDetails?.training ?? c.trainingFee ?? 0)
  const exam = Number(c.feeDetails?.exam ?? 0)
  if (training > 0 || exam > 0) return training + exam
  if (c.trainingExam != null && c.trainingExam !== '') return Number(c.trainingExam)
  if (c.supportCost != null && c.supportCost !== '') return Number(c.supportCost)
  return 0
}

/** Same rule as PricingBlock in CoursesSection: primary list price. */
export function effectiveListedPrice(c) {
  if (c.trainingExam != null && c.trainingExam !== '') return Number(c.trainingExam)
  if (c.trainingFee != null && c.trainingFee !== '') return Number(c.trainingFee)
  if (c.supportCost != null && c.supportCost !== '') return Number(c.supportCost)
  return null
}

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function iconNameFromComponent(icon) {
  if (!icon) return 'BookOpen'
  if (typeof icon === 'string') return icon
  return icon.displayName || icon.name || 'BookOpen'
}

function categorySlug(name) {
  return slugify(name)
}

function buildFlatRows() {
  const used = new Set()
  const rows = []

  for (const tabKey of Object.keys(courseStructure)) {
    const tab = courseStructure[tabKey]
    for (const categoryName of Object.keys(tab.categories)) {
      const cat = tab.categories[categoryName]
      const courses = cat.courses || []
      courses.forEach((course, idx) => {
        let base = slugify(course.title)
        if (!base) base = `course-${tabKey}-${idx}`
        let slug = base
        let n = 0
        while (used.has(slug)) {
          n += 1
          slug = `${base}-${n}`
        }
        used.add(slug)

        rows.push({
          slug,
          title: course.title,
          description: course.description,
          cohort: course.cohort,
          level: course.level,
          duration: course.duration,
          trainingFee: course.trainingFee,
          trainingExam: course.trainingExam,
          supportCost: course.supportCost,
          tabKey,
          categoryName,
          categorySlug: categorySlug(categoryName),
          iconName: iconNameFromComponent(course.icon),
          syllabus: course.syllabus,
        })
      })
    }
  }
  return rows
}

const FLAT = buildFlatRows()

const TITLE_TO_ROW = new Map(FLAT.map((r) => [r.title, r]))
const SLUG_TO_ROW = new Map(FLAT.map((r) => [r.slug, r]))

function certificateImageFor(row) {
  const t = (row.title || '').toLowerCase()
  if (t.includes('itil')) return '/certificates/itil-v5-certi.png'
  if (t.includes('pmp')) return '/certificates/PMI-Certification-page-0001.webp'
  if (t.includes('google cloud')) return '/images/nsl-logo.svg'
  if (t.includes('aws')) return '/certificates/AWS-Certificate.jpg'
  if (t.includes('psk')) return '/certificates/psk.webp'
  if (t.includes('azure') || t.includes('az-') || t.includes('microsoft azure'))
    return '/certificates/azure-certificate-1.webp'
  return '/images/nsl-logo.svg'
}

function pickRichTemplate(row) {
  const t = (row.title || '').toLowerCase()
  if (t.includes('pmp')) return pmpCourse
  if (t.includes('capm')) return capmCourse
  if (t.includes('itil')) return itil5FoundationCourse
  if (t.includes('google cloud')) return null
  if (t.includes('aws')) return awsTrainingCourse
  if (t.includes('azure') || t.includes('az-') || t.includes('microsoft azure')) return azureAiTrainingCourse
  return null
}

function defaultSyllabus(row) {
  const title = row.title
  const d = (row.duration || '').toLowerCase()
  let modules = 4
  if (d.includes('demo')) modules = 1
  else if (d.includes('3-4') || d.includes('3–4')) modules = 4
  else if (d.includes('4-5') || d.includes('4–5')) modules = 5
  else if (d.includes('5-6') || d.includes('5-7') || d.includes('5–6') || d.includes('5–7')) modules = 5
  else if (d.includes('6-8') || d.includes('6–8')) modules = 6
  else if (d.includes('month')) modules = 6

  const out = []
  for (let i = 1; i <= Math.min(modules, 8); i += 1) {
    out.push({
      week: `Module ${i}`,
      topics: [
        `Foundations and key concepts for ${title}`,
        'Instructor-led sessions, guided practice, and Q&A',
        'Hands-on exercises aligned to certification or job outcomes',
      ],
    })
  }
  return out
}

function genericTrainers() {
  return [
    {
      name: 'NeoSkills Instructor Team',
      role: 'Certified practitioner trainers',
      experience: '10+ years combined',
      certifications: 'Industry certifications aligned to this track',
      image: '/images/nsl_logo__Logo_.svg',
      bio: 'NeoSkills trainers combine delivery experience with structured exam and workplace preparation, aligned with programs listed on neoskills.co.in.',
    },
  ]
}

function defaultCareerRoles(row) {
  const t = (row.title || '').toLowerCase()
  const cat = (row.categoryName || '').toLowerCase()

  // ── Project Management ──────────────────────────────────────────
  if (t.includes('pmp') || row.title === 'PMP Morning Batch') {
    return ['Project Manager', 'Program Manager', 'PMO Lead', 'Delivery Lead', 'Portfolio Manager', 'Project Consultant']
  }
  if (t.includes('capm')) {
    return ['Junior Project Manager', 'Project Coordinator', 'Project Analyst', 'Assistant Project Manager']
  }
  if (t.includes('prince2')) {
    if (t.includes('foundation') && !t.includes('practitioner')) {
      return ['Project Coordinator', 'Project Support Officer', 'Project Administrator', 'Team Member']
    }
    if (t.includes('practitioner')) {
      return ['Project Manager', 'Programme Manager', 'Change Manager', 'Project Consultant']
    }
    return ['Project Manager', 'Programme Manager', 'Project Coordinator', 'Change Manager']
  }

  // ── Cloud Computing ──────────────────────────────────────────────
  if (t.includes('aws') || t.includes('amazon web services')) {
    if (t.includes('cloud practitioner')) return ['Cloud Practitioner', 'Cloud Associate', 'Cloud Administrator']
    if (t.includes('solutions architect')) return ['Solutions Architect', 'Cloud Architect', 'Infrastructure Architect', 'Technical Lead']
    if (t.includes('sysops')) return ['SysOps Administrator', 'Cloud Operations Engineer', 'Cloud Administrator']
    if (t.includes('developer')) return ['Cloud Developer', 'DevOps Engineer', 'Full Stack Developer (Cloud)']
    return ['Cloud Engineer', 'Solutions Architect', 'DevOps Engineer', 'Cloud Administrator']
  }
  if (t.includes('azure') || t.includes('az-') || t.includes('microsoft')) {
    if (t.includes('az-900') || t.includes('fundamental')) return ['Cloud Administrator', 'Azure Administrator (entry)', 'Cloud Engineer']
    if (t.includes('az-104') || t.includes('administrator')) return ['Azure Administrator', 'Cloud Administrator', 'Infrastructure Engineer']
    if (t.includes('az-305') || t.includes('architect')) return ['Solutions Architect', 'Cloud Architect', 'Enterprise Architect']
    if (t.includes('az-400') || t.includes('devops')) return ['DevOps Engineer', 'Release Engineer', 'Automation Engineer', 'Cloud DevOps Lead']
    return ['Azure Administrator', 'Cloud Solutions Architect', 'DevOps Engineer', 'AI Engineer', 'Cloud Consultant']
  }
  if (t.includes('google cloud')) {
    return ['Cloud Engineer', 'Cloud Architect', 'Data Engineer', 'Cloud Consultant']
  }

  // ── Cybersecurity ────────────────────────────────────────────────
  if (t.includes('comptia') || t.includes('security+')) {
    return ['Security Analyst', 'Security Specialist', 'IT Auditor', 'SOC Analyst', 'Security Consultant']
  }
  if (t.includes('ceh') || t.includes('ethical') || t.includes('hacker')) {
    return ['Ethical Hacker', 'Penetration Tester', 'Security Analyst', 'Security Consultant', 'Red Team Engineer']
  }
  if (t.includes('threat')) {
    return ['Threat Analyst', 'SOC Analyst', 'Security Operations Lead', 'Threat Intelligence Analyst']
  }
  if (t.includes('security architecture')) {
    return ['Security Architect', 'Security Engineer', 'Enterprise Security Lead', 'Security Consultant']
  }

  // ── Agile, Scrum ─────────────────────────────────────────────────
  // AI Scrum (must come before general Scrum checks)
  if (t.includes('professional scrum master') && t.includes('ai')) {
    return ['Scrum Master (AI Teams)', 'AI Product Owner', 'Agile Coach (AI)', 'AI Delivery Manager']
  }
  // Scrum Alliance — A-CSPO (Advanced Certified Scrum Product Owner)
  if (t.includes('a-cspo')) {
    return ['Senior Product Owner', 'Product Manager', 'Business Analyst Lead', 'Product Strategist']
  }
  // Scrum Alliance — A-CSM (Advanced Certified ScrumMaster)
  if (t.includes('a-csm')) {
    return ['Senior Scrum Master', 'Agile Coach', 'Enterprise Coach', 'Agile Delivery Lead']
  }
  // Scrum Alliance — CSPO (Certified Scrum Product Owner)
  if (t.includes('cspo')) {
    return ['Product Owner', 'Product Analyst', 'Requirements Manager', 'Business Analyst']
  }
  // Scrum Alliance — CSM (Certified Scrum Master)
  if (t.includes('csm') || t.includes('certified scrum master')) {
    return ['Scrum Master', 'Agile Coach', 'Team Coach', 'Project Facilitator']
  }
  // Scrum.org — PSPO II (Professional Scrum Product Owner II)
  if (t.includes('pspo') && (t.includes('ii') || t.includes('2'))) {
    return ['Senior Product Owner', 'Product Lead', 'Product Strategist', 'Business Line Owner']
  }
  // Scrum.org — PSPO I
  if (t.includes('pspo')) {
    return ['Product Owner', 'Product Manager', 'Requirements Analyst', 'Business Analyst']
  }
  // Scrum.org — PSM II (Professional Scrum Master II)
  if (t.includes('psm') && (t.includes('ii') || t.includes('2'))) {
    return ['Senior Scrum Master', 'Agile Coach', 'Team Lead', 'Agile Delivery Manager']
  }
  // Scrum.org — PSM I (Professional Scrum Master I) — must come after PSM II check
  if (t.includes('psm') || t.includes('professional scrum')) {
    return ['Scrum Master', 'Agile Coach', 'Team Facilitator', 'Agile Practitioner']
  }
  // Scaled Agile — SAFe SASM
  if (t.includes('sasm') || t.includes('safe')) {
    return ['SAFe Scrum Master', 'Release Train Engineer', 'Agile Program Manager', 'Enterprise Agile Coach']
  }

  // ── DevOps ───────────────────────────────────────────────────────
  if (t.includes('devops exin') || t.includes('exin devops')) {
    return ['DevOps Engineer', 'DevOps Lead', 'Automation Engineer', 'DevOps Consultant']
  }
  if (t.includes('devops') && !t.includes('exin')) {
    return ['DevOps Engineer', 'CI/CD Engineer', 'Build & Release Engineer', 'Automation Specialist']
  }

  // ── IT Service Management ───────────────────────────────────────
  if (t.includes('itil')) {
    if (t.includes('foundation')) return ['IT Service Desk Analyst', 'IT Support Specialist', 'Service Management Associate']
    if (t.includes('expert')) return ['ITSM Consultant', 'Service Management Lead', 'IT Director', 'Process Owner']
    if (t.includes('master') || t.includes('strategy')) return ['IT Strategy Manager', 'Service Transformation Lead', 'Enterprise Architect']
    return ['IT Service Manager', 'Service Desk Lead', 'IT Operations Manager', 'Service Delivery Manager', 'ITSM Consultant']
  }
  if (t.includes('servicenow')) {
    return ['ServiceNow Administrator', 'ServiceNow Developer', 'ServiceNow Architect', 'ITSM Process Manager']
  }

  // ── Software Development ─────────────────────────────────────────
  if (t.includes('istqb')) {
    return ['Test Engineer', 'QA Analyst', 'Test Analyst', 'Software Tester', 'QA Lead']
  }
  if (t.includes('test automation') || t.includes('automation framework')) {
    return ['Automation Engineer', 'QA Lead', 'SDET', 'Test Architect']
  }
  if (t.includes('ai in testing') || t.includes('ai testing')) {
    return ['AI Test Engineer', 'QA Automation Architect', 'Quality Engineer (AI)', 'SDET Lead']
  }

  // ── ISO / ISACA ──────────────────────────────────────────────────
  if (t.includes('cisa')) {
    return ['IT Auditor', 'IS Auditor', 'Compliance Analyst', 'Risk & Compliance Manager']
  }
  if (t.includes('cism')) {
    return ['Security Manager', 'IS Manager', 'Risk & Compliance Manager', 'SOC Manager']
  }

  // ── Six Sigma ────────────────────────────────────────────────────
  if (t.includes('six sigma')) {
    if (t.includes('black belt')) return ['Quality Manager', 'Process Excellence Manager', 'Operations Lead', 'Continuous Improvement Manager']
    return ['Quality Analyst', 'Process Improvement Lead', 'Operations Analyst', 'Continuous Improvement Specialist']
  }

  // ── IT Governance ────────────────────────────────────────────────
  if (t.includes('cbap') || t.includes('iiba') || t.includes('ecba') || t.includes('ccba')) {
    return ['Business Analyst Lead', 'Business Architect', 'Product Manager', 'Strategy Analyst', 'Requirements Manager']
  }

  // ── Data Science ─────────────────────────────────────────────────
  if (t.includes('cpmai') || t.includes('ai project management')) {
    return ['AI Project Manager', 'AI Program Manager', 'ML Project Lead', 'Data Science Manager']
  }
  if (t.includes('data engineering')) {
    return ['Data Engineer', 'Data Architect', 'Big Data Engineer', 'ETL Developer']
  }
  if (t.includes('real-time') || t.includes('streaming') || t.includes('data processing')) {
    return ['Data Engineer (Streaming)', 'Real-time Analytics Engineer', 'Pipeline Engineer', 'Data Platform Engineer']
  }
  if (t.includes('analytics') && (t.includes('ml') || t.includes('machine learning'))) {
    return ['Data Scientist', 'ML Engineer', 'Analytics Manager', 'Decision Scientist']
  }
  if (t.includes('big data') || t.includes('ai integration')) {
    return ['AI Engineer', 'Data Architect', 'ML Engineer', 'Big Data Architect']
  }

  // ── Business Intelligence ────────────────────────────────────────
  if (t.includes('power bi')) {
    return ['BI Analyst', 'Data Analyst', 'Reporting Lead', 'Dashboard Developer', 'BI Consultant']
  }

  // ── Category-based fallbacks ─────────────────────────────────────
  if (cat.includes('project management')) return ['Project Coordinator', 'Project Manager (entry)', 'PMO Analyst']
  if (cat.includes('cloud computing')) return ['Cloud Engineer', 'Cloud Administrator', 'Cloud Support Associate']
  if (cat.includes('cyber') || cat.includes('security')) return ['Security Analyst', 'Security Consultant', 'SOC Analyst']
  if (cat.includes('agile') || cat.includes('scrum')) return ['Agile Practitioner', 'Scrum Master', 'Product Owner', 'Agile Team Member']
  if (cat.includes('devops')) return ['DevOps Practitioner', 'Automation Engineer', 'CI/CD Specialist']
  if (cat.includes('it service')) return ['Service Desk Analyst', 'IT Support Specialist', 'ITSM Practitioner']
  if (cat.includes('software') || cat.includes('development')) return ['Software Tester', 'QA Analyst', 'Developer', 'Automation Engineer']
  if (cat.includes('six sigma') || cat.includes('quality')) return ['Quality Analyst', 'Process Improvement Specialist']
  if (cat.includes('data')) return ['Data Analyst', 'Data Engineer', 'Data Scientist (entry)', 'BI Analyst']
  if (cat.includes('business intelligence')) return ['BI Analyst', 'Data Analyst', 'Reporting Specialist']

  return ['Career outcomes vary by program — ask our team for typical roles']
}

function examBodyInfo(row) {
  const t = (row.title || '').toLowerCase()
  const cat = (row.categoryName || '').toLowerCase()

  if (t.includes('pmp') || t.includes('capm')) return { name: 'PMI\u00ae', url: 'https://www.pmi.org' }
  if (t.includes('prince2')) return { name: 'AXELOS', url: 'https://www.axelos.com' }
  if (t.includes('itil')) return { name: 'PeopleCert', url: 'https://www.peoplecert.org' }
  if (t.includes('aws')) return { name: 'AWS', url: 'https://aws.amazon.com/certification' }
  if (t.includes('azure') || t.includes('microsoft')) return { name: 'Microsoft', url: 'https://learn.microsoft.com/en-us/credentials' }
  if (t.includes('google cloud')) return { name: 'Google Cloud', url: 'https://cloud.google.com/learn/certification' }
  if (t.includes('comptia')) return { name: 'CompTIA', url: 'https://www.comptia.org/certifications' }
  if (t.includes('ceh') || t.includes('ethical')) return { name: 'EC-Council', url: 'https://www.eccouncil.org' }
  if (t.includes('cisa') || t.includes('cism')) return { name: 'ISACA', url: 'https://www.isaca.org' }
  if (t.includes('six sigma')) return { name: 'CSSC / IASSC', url: 'https://www.sixsigma.org' }
  if (t.includes('istqb')) return { name: 'ISTQB', url: 'https://www.istqb.org' }
  if (t.includes('cbap') || t.includes('iiba') || t.includes('ecba') || t.includes('ccba'))
    return { name: 'IIBA', url: 'https://www.iiba.org' }
  if (t.includes('servicenow')) return { name: 'ServiceNow', url: 'https://www.servicenow.com/certification' }
  if (t.includes('psm') || t.includes('pspo') || t.includes('professional scrum'))
    return { name: 'Scrum.org', url: 'https://www.scrum.org' }
  if (t.includes('safe') || t.includes('sasm')) return { name: 'Scaled Agile', url: 'https://scaledagile.com' }
  if (t.includes('scrum master') || t.includes('csm') || t.includes('cspo') || t.includes('a-csm') || t.includes('a-cspo'))
    return { name: 'Scrum Alliance', url: 'https://www.scrumalliance.org' }
  if (t.includes('devops exin') || t.includes('exin')) return { name: 'EXIN', url: 'https://www.exin.com' }
  if (t.includes('power bi')) return { name: 'Microsoft', url: 'https://learn.microsoft.com/en-us/credentials' }
  if (t.includes('cpmai')) return { name: 'PMI\u00ae', url: 'https://www.pmi.org/certifications/ai-project-management-cpmai' }
  if (t.includes('compensation') || t.includes('ccp') || t.includes('worldatwork'))
    return { name: 'WorldatWork', url: 'https://worldatwork.org' }

  return null
}

function certValidityInfo(row) {
  const t = (row.title || '').toLowerCase()

  if (t.includes('pmp') || t.includes('capm')) return '3 years'
  if (t.includes('prince2')) return '3 years'
  if (t.includes('itil')) return '3 years (renewable)'
  if (t.includes('aws')) return '3 years'
  if (t.includes('azure') || t.includes('microsoft')) return '1 year'
  if (t.includes('google cloud')) return '3 years'
  if (t.includes('comptia')) return '3 years'
  if (t.includes('ceh') || t.includes('ethical')) return '3 years'
  if (t.includes('cisa') || t.includes('cism')) return '3 years'
  if (t.includes('six sigma')) return 'No expiry (lifetime)'
  if (t.includes('istqb')) return 'No expiry (lifetime)'
  if (t.includes('cbap') || t.includes('iiba') || t.includes('ecba') || t.includes('ccba')) return '3 years'
  if (t.includes('servicenow')) return '1 year'
  if (t.includes('psm') || t.includes('pspo') || t.includes('professional scrum')) return 'No expiry (lifetime)'
  if (t.includes('safe') || t.includes('sasm')) return '1 year'
  if (t.includes('scrum master') || t.includes('csm') || t.includes('cspo') || t.includes('a-csm') || t.includes('a-cspo')) return '2 years'
  if (t.includes('devops exin') || t.includes('exin')) return 'No expiry (lifetime)'
  if (t.includes('power bi')) return '1 year'
  if (t.includes('cpmai')) return '3 years'
  if (t.includes('compensation') || t.includes('ccp') || t.includes('worldatwork')) return '3 years'

  return 'Course completion — no expiry'
}

function buildGeneratedBase(row) {
  const listed = effectiveListedPrice(row)
  const num = (v) => {
    if (v == null || v === '') return 0
    const n = Number(v)
    return Number.isNaN(n) ? 0 : n
  }
  const training = num(row.trainingFee)
  const examTotal = num(row.trainingExam)
  const support = num(row.supportCost)
  const examComponent = Math.max(0, examTotal - training)

  const ebInfo = examBodyInfo(row)

  return {
    slug: row.slug,
    category: row.categoryName,
    title: row.title,
    fullTitle: row.title,
    icon: row.iconName,
    summary: row.description,
    description: `${row.description}\n\nThis NeoSkills program is listed under our ${row.tabKey === 'masters' ? 'Masters' : 'Certification'} catalog. Schedules, cohorts, and fees are maintained to match the training desk. For the latest brochure and batch plan, use the enquiry form or call us.`,
    stats: {
      duration: row.duration || 'As scheduled',
      nextBatch: row.cohort || 'Contact admissions',
      level: row.level || 'All levels',
      mode: 'Live online (instructor-led) or hybrid — confirm for your cohort',
      hours: 'Contact hours vary by certification; see syllabus modules below',
      certificate: 'Vendor or professional credential pathway (where applicable)',
      placement: 'Resume guidance and interview preparation support (program-dependent)',
    },
    highlights: [
      `Structured, instructor-led coverage for ${row.title}`,
      'Materials, assignments, and cohort coordination through NeoSkills',
      'Exam or certification guidance where applicable',
      'Access to recordings and updates per batch policy',
    ],
    whoShouldJoin: [
      row.level === 'Beginner'
        ? 'Beginners building foundational skills'
        : 'Working professionals upgrading or certifying',
      'Teams aligning to industry-standard practices',
      'Anyone seeking a clear learning path with mentor support',
    ],
    syllabus: row.syllabus || defaultSyllabus(row),
    certificate: {
      title: `${row.title} — credential pathway`,
      description:
        'Official certificates or digital badges are issued by the accrediting vendor when you meet their exam and eligibility rules. NeoSkills training focuses on readiness and applied skills.',
      image: certificateImageFor(row),
    },
    feeDetails: {
      training,
      exam: examComponent,
      support,
      total: listed != null && !Number.isNaN(listed) ? listed : 0,
      emi: 'EMI or installment options may be available — ask admissions',
      refund: 'Refund and transfer policy as per NeoSkills enrollment terms',
      includes: [
        'Live training and mentor support',
        'Practice materials and assignments (where applicable)',
        'Batch coordination and learner success check-ins',
      ],
    },
    feeDisclaimer:
      listed == null
        ? 'Final fees, taxes, and vendor exam costs are confirmed at enrollment. Use "Enquire" if pricing shows as on request.'
        : 'Listed amount follows the same display rule as the catalog (training+exam bundle when shown, else training or support line). Vendor exam fees may still be billed separately depending on the program — confirm with admissions.',
    examBody: ebInfo ? ebInfo.name : 'NeoSkills',
    examBodyUrl: ebInfo ? ebInfo.url : 'https://www.neoskills.co.in',
    certValidity: certValidityInfo(row),
    enrollmentCount: 0,
    careerOpportunities: defaultCareerRoles(row),
    trainers: genericTrainers(),
    categorySlug: row.categorySlug,
    learnMoreUrl: 'https://www.neoskills.co.in/',
  }
}

function mergeRich(row, gen, rich) {
  const useRichBody =
    row.title === 'PMP' ||
    row.title.toLowerCase().includes('itil') ||
    row.title.toLowerCase().includes('aws') ||
    row.title.toLowerCase().includes('azure') ||
    row.title.toLowerCase().includes('az-') ||
    row.title.toLowerCase().includes('microsoft azure')

  const num = (v) => {
    if (v == null || v === '') return 0
    const n = Number(v)
    return Number.isNaN(n) ? 0 : n
  }
  const listed = effectiveListedPrice(row)
  const training = num(row.trainingFee)
  const examTotal = num(row.trainingExam)
  const support = num(row.supportCost)
  const examComponent = Math.max(0, examTotal - training)

  return {
    ...gen,
    ...rich,
    slug: gen.slug,
    title: row.title,
    fullTitle: row.title === 'PMP' ? rich.fullTitle : `${row.title}`,
    icon: gen.icon,
    category: row.categoryName,
    categorySlug: gen.categorySlug,
    summary: useRichBody ? rich.summary : gen.summary,
    description: useRichBody ? rich.description : gen.description,
    stats: {
      ...rich.stats,
      duration: row.duration || rich.stats.duration,
      nextBatch: row.cohort || rich.stats.nextBatch,
      level: row.level || rich.stats.level,
    },
    highlights: rich.highlights?.length ? rich.highlights : gen.highlights,
    whoShouldJoin: rich.whoShouldJoin?.length ? rich.whoShouldJoin : gen.whoShouldJoin,
    syllabus: rich.syllabus?.length ? rich.syllabus : gen.syllabus,
    trainers: rich.trainers?.length ? rich.trainers : gen.trainers,
    certificate: {
      ...rich.certificate,
      image: certificateImageFor(row),
    },
    feeDetails: {
      training,
      exam: examComponent,
      support,
      total: listed != null && !Number.isNaN(listed) ? listed : 0,
      emi: rich.feeDetails?.emi || gen.feeDetails.emi,
      refund: rich.feeDetails?.refund || gen.feeDetails.refund,
      includes: rich.feeDetails?.includes || gen.feeDetails.includes,
    },
    feeDisclaimer: rich.feeDisclaimer || gen.feeDisclaimer,
    learnMoreUrl: rich.learnMoreUrl || gen.learnMoreUrl,
  }
}

function buildResolvedCourse(row) {
  const gen = buildGeneratedBase(row)
  const rich = pickRichTemplate(row)
  if (!rich) return gen
  return mergeRich(row, gen, rich)
}

let _resolvedCache = null
function allResolved() {
  if (!_resolvedCache) _resolvedCache = FLAT.map((r) => buildResolvedCourse(r))
  return _resolvedCache
}

export function getAllResolvedCourses() {
  return allResolved()
}

export function getCourseBySlug(raw) {
  const slug = decodeURIComponent(String(raw || ''))
    .toLowerCase()
    .trim()
  if (!slug) return null
  const row = SLUG_TO_ROW.get(slug)
  if (!row) return null
  return buildResolvedCourse(row)
}

export function getDetailSlugForCatalogTitle(title) {
  const row = TITLE_TO_ROW.get(title)
  return row ? row.slug : null
}

export function getMergedCourseCategories() {
  const map = new Map(baseCourseCategories.map((c) => [c.slug, c]))
  for (const r of FLAT) {
    if (!map.has(r.categorySlug)) {
      map.set(r.categorySlug, { slug: r.categorySlug, name: r.categoryName })
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * For operations: add `public/certificates/{slug}.webp` (or .png/.jpg) to override the default logo
 * on course pages that do not yet have a branded certificate image.
 */
export function getCertificateFilenameManifest() {
  return FLAT.map((r) => ({
    slug: r.slug,
    courseTitle: r.title,
    suggestedPath: `/public/certificates/${r.slug}.webp`,
  }))
}
