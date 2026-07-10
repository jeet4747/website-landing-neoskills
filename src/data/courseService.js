import { courseStructure } from './courseStructure.js'
import { getAllResolvedCourses, getTotal, slugify } from './catalogBuilder.js'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
// Set VITE_BACKEND_URL in production to your deployed backend URL (e.g. https://your-app.vercel.app)

const normalizeKey = (text) => String(text || '').toLowerCase().trim()

const findBackendMatch = (staticCourse, backendCourses) => {
  const title = normalizeKey(staticCourse.title || staticCourse.name)
  return backendCourses.find((backend) => {
    return (
      normalizeKey(backend.slug) === normalizeKey(staticCourse.slug) ||
      normalizeKey(backend.title) === title ||
      normalizeKey(backend.name) === title
    )
  })
}

const mergeCourseData = (staticCourse, backendCourse) => {
  if (!backendCourse) return staticCourse

  const training = backendCourse.feeDetails?.training ?? backendCourse.trainingFee ?? staticCourse.trainingFee
  const exam = backendCourse.feeDetails?.exam ?? 0
  const total = getTotal(backendCourse) || Number(training) + Number(exam) || staticCourse.trainingExam

  return {
    ...staticCourse,
    slug: backendCourse.slug ?? staticCourse.slug,
    title: backendCourse.title ?? staticCourse.title,
    fullTitle: backendCourse.fullTitle ?? staticCourse.fullTitle,
    description: backendCourse.summary || backendCourse.description || staticCourse.description,
    summary: backendCourse.summary ?? staticCourse.summary,
    cohort: backendCourse.stats?.nextBatch ?? backendCourse.cohort ?? staticCourse.cohort,
    duration: backendCourse.stats?.duration ?? backendCourse.duration,
    level: backendCourse.stats?.level ?? backendCourse.level,
    trainingFee: training,
    trainingExam: total,
    supportCost: backendCourse.feeDetails?.support ?? staticCourse.supportCost,
    learnMoreUrl: backendCourse.learnMoreUrl ?? staticCourse.learnMoreUrl,
    feeDisclaimer: backendCourse.feeDisclaimer ?? staticCourse.feeDisclaimer,
    highlights: backendCourse.highlights ?? staticCourse.highlights,
    syllabus: backendCourse.syllabus ?? staticCourse.syllabus,
    stats: backendCourse.stats ?? staticCourse.stats,
    feeDetails: {
      ...(backendCourse.feeDetails ?? staticCourse.feeDetails ?? {}),
      training: Number(training),
      exam: Number(exam),
      total: Number(total),
    },
  }
}

export async function fetchBackendCourses() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/courses`)
    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`)
    }
    const data = await response.json()
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Backend returned no courses')
    }
    return data
  } catch (error) {
    console.warn('Failed to load backend courses:', error)
    return getAllResolvedCourses()
  }
}

export async function loadCoursesForDisplay() {
  const backendCourses = await fetchBackendCourses()
  const mergedStructure = {}
  const matchedBackendSlugs = new Set()

  // 1. Process all static courses and track which backend ones got matched
  for (const [tabKey, tabValue] of Object.entries(courseStructure)) {
    mergedStructure[tabKey] = {
      ...tabValue,
      categories: {},
    }

    for (const [categoryKey, categoryValue] of Object.entries(tabValue.categories)) {
      mergedStructure[tabKey].categories[categoryKey] = {
        ...categoryValue,
        courses: categoryValue.courses.map((staticCourse) => {
          const backendCourse = findBackendMatch(staticCourse, backendCourses)
          if (backendCourse) {
            matchedBackendSlugs.add(normalizeKey(backendCourse.slug))
          }
          return mergeCourseData(staticCourse, backendCourse)
        }),
      }
    }
  }

  // 2. Build category lookup: all normalized forms → { tab, key }
  const categoryLookup = {}
  for (const [tabKey, tabValue] of Object.entries(courseStructure)) {
    for (const [categoryKey] of Object.entries(tabValue.categories || {})) {
      const forms = [
        normalizeKey(categoryKey),
        categoryKey.toLowerCase().replace(/[^a-z0-9]/g, ''),
        slugify(categoryKey),
      ]
      for (const form of forms) {
        if (!categoryLookup[form]) {
          categoryLookup[form] = { tab: tabKey, key: categoryKey }
        }
      }
    }
  }

  // 3. Add backend-only courses (created via admin dashboard)
  for (const backendCourse of backendCourses) {
    const slug = normalizeKey(backendCourse.slug)
    if (matchedBackendSlugs.has(slug)) continue

    const rawCategorySlug = (backendCourse.categorySlug || '').toLowerCase().trim()
    if (!rawCategorySlug) continue

    const match = categoryLookup[rawCategorySlug] ||
                  categoryLookup[rawCategorySlug.replace(/[^a-z0-9]/g, '')] ||
                  categoryLookup[slugify(rawCategorySlug)]

    if (match) {
      const mergedCourse = {
        ...backendCourse,
        _isAdminCourse: true,
        title: backendCourse.title || backendCourse.fullTitle || 'Untitled Course',
        description: backendCourse.summary || backendCourse.description || '',
        duration: backendCourse.stats?.duration || backendCourse.duration,
        cohort: backendCourse.stats?.nextBatch || backendCourse.cohort,
        level: backendCourse.stats?.level || backendCourse.level,
      }
      if (!mergedCourse.feeDetails) {
        mergedCourse.feeDetails = { training: 0, exam: 0, total: 0 }
      }
      mergedStructure[match.tab].categories[match.key].courses.push(mergedCourse)
    }
  }

  return mergedStructure
}

export async function loadCourseBySlug(slug) {
  const backendCourses = await fetchBackendCourses()
  const normalizedSlug = normalizeKey(slug)
  const course = backendCourses.find(
    (c) => normalizeKey(c.slug) === normalizedSlug || normalizeKey(c.title) === normalizedSlug
  )
  if (course) {
    const gen = getAllResolvedCourses().find((c) => normalizeKey(c.slug) === normalizedSlug)
    if (gen) {
      return {
        ...gen,
        ...course,
        stats: { ...gen.stats, ...(course.stats || {}) },
        feeDetails: { ...gen.feeDetails, ...(course.feeDetails || {}) },
        certificate: { ...gen.certificate, ...(course.certificate || {}), image: gen.certificate?.image || '/images/nsl-logo.svg' },
        examBody: gen.examBody || '',
        examBodyUrl: gen.examBodyUrl || '',
        certValidity: course.certValidity || gen.certValidity || '',
        careerOpportunities: course.careerOpportunities ?? gen.careerOpportunities ?? [],
        enrollmentCount: course.enrollmentCount ?? gen.enrollmentCount,
      }
    }
    return course
  }
  return getAllResolvedCourses().find((c) => normalizeKey(c.slug) === normalizedSlug)
}
