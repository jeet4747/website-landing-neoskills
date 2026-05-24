import { courseStructure } from './courseStructure.js'
import { getAllResolvedCourses, getTotal } from './catalogBuilder.js'

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
          return mergeCourseData(staticCourse, backendCourse)
        }),
      }
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
  if (course) return course
  return getAllResolvedCourses().find((c) => normalizeKey(c.slug) === normalizedSlug)
}
