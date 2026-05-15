/**
 * Course catalog + detail resolution.
 * Rich program copy: `src/data/courseDataRich.js`
 * Flat catalog + slug resolution: `src/data/catalogBuilder.js`
 * Raw structure for the homepage grid: `src/data/courseStructure.js`
 */

export {
  pmpCourse,
  awsTrainingCourse,
  azureAiTrainingCourse,
  itil5FoundationCourse,
} from '../data/courseDataRich'

import {
  getMergedCourseCategories,
  getCourseBySlug,
  getDetailSlugForCatalogTitle,
  getAllResolvedCourses,
  getCertificateFilenameManifest,
  effectiveListedPrice,
} from '../data/catalogBuilder'

export {
  getCourseBySlug,
  getDetailSlugForCatalogTitle,
  getAllResolvedCourses,
  getMergedCourseCategories,
  getCertificateFilenameManifest,
  effectiveListedPrice,
}

export const courseCategories = getMergedCourseCategories()
export const allCourses = getAllResolvedCourses()
