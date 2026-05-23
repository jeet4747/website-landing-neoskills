require('dotenv').config({ path: require('path').join(__dirname, '.env') })

const { query } = require('./db.cjs')
const fs = require('fs')
const path = require('path')

async function init() {
  console.log('Initializing database...')

  // Create the app_data table
  await query(`
    CREATE TABLE IF NOT EXISTS app_data (
      key TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)
  console.log('  ✅ app_data table ready')

  // Seed courses from JSON file
  const coursesPath = path.join(__dirname, 'courses.json')
  if (fs.existsSync(coursesPath)) {
    const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'))
    await query(
      `INSERT INTO app_data (key, data) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = NOW()`,
      ['courses', JSON.stringify(courses)]
    )
    console.log(`  ✅ Seeded ${courses.length} courses`)
  }

  // Seed jobs from JSON file
  const jobsPath = path.join(__dirname, 'jobs.json')
  if (fs.existsSync(jobsPath)) {
    const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'))
    await query(
      `INSERT INTO app_data (key, data) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = NOW()`,
      ['jobs', JSON.stringify(jobs)]
    )
    console.log(`  ✅ Seeded ${jobs.length} jobs`)
  }

  // Seed hero slides from JSON file
  const slidesPath = path.join(__dirname, 'hero-slides.json')
  if (fs.existsSync(slidesPath)) {
    const slides = JSON.parse(fs.readFileSync(slidesPath, 'utf8'))
    await query(
      `INSERT INTO app_data (key, data) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = NOW()`,
      ['hero_slides', JSON.stringify(slides)]
    )
    console.log(`  ✅ Seeded ${slides.length} hero slides`)
  }

  console.log('\nDatabase initialization complete!')
  process.exit(0)
}

init().catch(err => {
  console.error('Database initialization failed:', err)
  process.exit(1)
})
