const { Pool } = require('pg')
const DATABASE_URL = process.env.DATABASE_URL

async function seed() {
  if (!DATABASE_URL) {
    console.log('No DATABASE_URL set, seeding to webinars.json instead')
    const webinar = [{ id: "webinar-1", slug: "ai-data-science", title: "AI + Data Science", fullTitle: "AI + Data Science: Build Real-World Models in 90 Minutes", date: "30 May 2026", time: "5:00 PM - 6:30 PM IST", platform: "Google Meet", seats: 50, description: "Join our live, hands-on workshop and learn how to build machine learning models from scratch. No prior coding experience needed.", whatYouLearn: ["Python basics for data science in 15 mins", "Build your first ML model (regression/classification)", "Data visualization techniques used by top analysts", "AI career roadmap: certifications & job roles", "Live Q&A with industry expert"], agenda: [{ time: "5:00 PM", title: "Introduction to AI & Data Science", desc: "Industry overview, career opportunities, and learning path" }, { time: "5:15 PM", title: "Hands-On: Python & Data Exploration", desc: "Real dataset walkthrough — clean, analyze, visualize" }, { time: "5:45 PM", title: "Build Your First ML Model", desc: "Train a model, evaluate accuracy, make predictions" }, { time: "6:15 PM", title: "Career Roadmap & Certifications", desc: "Which certs matter: AWS, Azure, Google, SAS, and more" }, { time: "6:25 PM", title: "Live Q&A", desc: "Ask anything — career, projects, salaries, next steps" }], speaker: { name: "Industry Expert", role: "Senior Data Scientist", bio: "8+ years in data science & AI. Has trained 5,000+ professionals across top global companies." }, whatsappLink: "https://chat.whatsapp.com/GRTh5uIPNllL6vFssZJT3r", active: true }]
    require('fs').writeFileSync(require('path').join(__dirname, 'webinars.json'), JSON.stringify(webinar, null, 2))
    console.log('✅ webinars.json created')
    return
  }

  const pool = new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } })
  try {
    const webinar = [{ id: "webinar-1", slug: "ai-data-science", title: "AI + Data Science", fullTitle: "AI + Data Science: Build Real-World Models in 90 Minutes", date: "30 May 2026", time: "5:00 PM - 6:30 PM IST", platform: "Google Meet", seats: 50, description: "Join our live, hands-on workshop and learn how to build machine learning models from scratch.", whatYouLearn: ["Python basics for data science in 15 mins", "Build your first ML model", "Data visualization techniques", "AI career roadmap", "Live Q&A with industry expert"], agenda: [{ time: "5:00 PM", title: "Introduction to AI & Data Science", desc: "Industry overview" }, { time: "5:15 PM", title: "Hands-On: Python & Data Exploration", desc: "Real dataset walkthrough" }, { time: "5:45 PM", title: "Build Your First ML Model", desc: "Train a model" }, { time: "6:15 PM", title: "Career Roadmap & Certifications", desc: "Which certs matter" }, { time: "6:25 PM", title: "Live Q&A", desc: "Ask anything" }], speaker: { name: "Industry Expert", role: "Senior Data Scientist", bio: "8+ years in data science & AI." }, whatsappLink: "https://chat.whatsapp.com/GRTh5uIPNllL6vFssZJT3r", active: true }]
    await pool.query(`INSERT INTO app_data (key, data, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET data = $2, updated_at = NOW()`, ['webinars', JSON.stringify(webinar)])
    console.log('✅ Webinar seeded to Supabase!')
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
  }
  await pool.end()
}

seed()
