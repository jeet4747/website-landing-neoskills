import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { getAllResolvedCourses } from '../src/data/catalogBuilder.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const courses = getAllResolvedCourses()
const outPath = resolve(__dirname, '..', 'server', 'courses.json')
writeFileSync(outPath, JSON.stringify(courses, null, 2), 'utf-8')
console.log(`Dumped ${courses.length} courses to ${outPath}`)
