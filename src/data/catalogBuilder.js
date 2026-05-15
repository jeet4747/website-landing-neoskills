import { courseStructure } from './courseStructure.js'
import {
  pmpCourse,
  awsTrainingCourse,
  azureAiTrainingCourse,
  itil5FoundationCourse,
  courseCategories as baseCourseCategories,
} from './courseDataRich.js'

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
  if (t.includes('azure') || t.includes('az-') || t.includes('microsoft azure'))
    return '/certificates/azure-certificate-1.webp'
  return '/images/nsl-logo.svg'
}

function pickRichTemplate(row) {
  const t = (row.title || '').toLowerCase()
  if (t.includes('pmp')) return pmpCourse
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

function buildGeneratedBase(row) {
  const listed = effectiveListedPrice(row)
  const num = (v) => {
    if (v == null || v === '') return 0
    const n = Number(v)
    return Number.isNaN(n) ? 0 : n
  }
  const training = num(row.trainingFee)
  const exam = num(row.trainingExam)
  const support = num(row.supportCost)

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
    syllabus: defaultSyllabus(row),
    certificate: {
      title: `${row.title} — credential pathway`,
      description:
        'Official certificates or digital badges are issued by the accrediting vendor when you meet their exam and eligibility rules. NeoSkills training focuses on readiness and applied skills.',
      image: certificateImageFor(row),
    },
    feeDetails: {
      training,
      exam,
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
        ? 'Final fees, taxes, and vendor exam costs are confirmed at enrollment. Use “Enquire” if pricing shows as on request.'
        : 'Listed amount follows the same display rule as the catalog (training+exam bundle when shown, else training or support line). Vendor exam fees may still be billed separately depending on the program — confirm with admissions.',
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
  const exam = num(row.trainingExam)
  const support = num(row.supportCost)

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
      exam,
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
