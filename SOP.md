# Standard Operating Procedure — NeoSkills Website

> **Purpose:** This document enables anyone (even without prior experience) to maintain, troubleshoot, and manage the NeoSkills website. Follow the steps exactly as written.

---

## Table of Contents

1. [What This Site Is](#1-what-this-site-is)
2. [How to Access](#2-how-to-access)
3. [Common Tasks](#3-common-tasks)
4. [Deployment](#4-deployment)
5. [Troubleshooting](#5-troubleshooting)
6. [Architecture Overview](#6-architecture-overview)
7. [Important Credentials](#7-important-credentials)

---

## 1. What This Site Is

The NeoSkills website is a **full-stack web application** that:
- Lists 40+ professional certification courses (PMP, AWS, Azure, Scrum, etc.)
- Allows students to enroll and pay via Razorpay
- Has an admin panel to manage courses, batches, jobs, and more
- Accepts job applications and sends hiring notifications to HR

### Tech Stack

| Layer | Technology | What It Does |
|-------|-----------|--------------|
| Frontend | React + Tailwind CSS | What users see in the browser |
| Backend | Node.js + Express | Server that handles API requests |
| Database | PostgreSQL (Supabase) | Stores courses, enrollments, jobs, etc. |
| Hosting | Render | Runs the server (free tier) |
| Domain | Cloudflare | DNS and domain management |
| Payments | Razorpay | Processes course payments |
| Email | EmailJS + Nodemailer | Sends inquiry & notification emails |

### Key URLs

| URL | Purpose |
|-----|---------|
| `https://neoskills.co.in` | Live website |
| `https://neoskills.co.in/admin` | Admin panel (password required) |
| `https://neoskills.co.in/api/health` | Health check (shows if server is running) |

---

## 2. How to Access

### 2.1 Admin Panel

1. Go to `https://neoskills.co.in/admin`
2. Enter password: `neoskills2026`
3. You'll see the dashboard with tabs for Courses, Batches, Jobs, Enrollments, etc.

### 2.2 Render Dashboard (Server Hosting)

1. Go to https://dashboard.render.com
2. Log in with the team's GitHub credentials
3. Click on `neoskills-api` web service
4. Here you can:
   - View deploy history
   - Manually redeploy
   - View logs (if something breaks)
   - Edit environment variables

### 2.3 Supabase Dashboard (Database)

1. Go to https://supabase.com/dashboard
2. Log in with the team credentials
3. Select the `neoskills` project
4. Here you can:
   - View/edit database tables directly
   - Check database size and usage
   - Run SQL queries (advanced)

### 2.4 GitHub Repository

1. Go to https://github.com/jeet4747/website-landing-neoskills
2. All code is here — changes pushed to `main` branch auto-deploy to Render

---

## 3. Common Tasks

### 3.1 Add a New Course

**Method A — Via Admin Panel (Easier)**
1. Go to `/admin` → Click the **+** button in Courses tab
2. Fill in the course details:
   - **Details & Dates tab:** Title, slug, category, duration, level, cohort date, pricing
   - **Pricing tab:** Exam body, cert validity, total fee, EMI info, refund policy
   - **Content tab:** Summary, description, highlights, who should join, career opportunities, certificate info, syllabus
3. Click **Save All Changes**
4. The course will appear on the website

**Method B — Via Code (Advanced)**
1. Open `server/courses.json`
2. Add a new course object (copy an existing one as template)
3. Fill in: slug, title, category, description, highlights, whoShouldJoin, careerOpportunities, syllabus, feeDetails, certificate
4. Add the course to `src/data/courseStructure.js` under the appropriate category
5. Add a certificate image to `public/certificates/{slug}.webp`
6. Push to GitHub → auto-deploys

### 3.2 Update Batch Dates / Seats

1. Go to `/admin` → **Batches** tab
2. Click on the batch you want to edit
3. Update: date, mode (e.g., "Evening 4-7 PM"), seats available, active status
4. Click **Save All Changes**

### 3.3 Add Job Postings

1. Go to `/admin` → **Job Postings** tab → Click **+**
2. Fill in: title, department, location, type, experience, summary, description, responsibilities, requirements
3. Set `contactEmail` to `contact@neoskills.co.in`
4. Click **Save All Changes**
5. Job will appear on the `/placements` page

### 3.4 Update Hero Slides (Homepage Carousel)

1. Go to `/admin` → **Hero Slides** tab
2. Edit existing slides or add new ones
3. Set: title, description, gradient colors, course link
4. Click **Save All Changes**

### 3.5 View Enrollments

1. Go to `/admin` → **Enrollments** tab
2. Shows all student enrollments with: name, email, course, amount, payment ID, status
3. This is read-only — you can view but not edit

### 3.6 View Job Applications

1. Go to `/admin` → **Applications** tab
2. Shows all job applications with: name, email, phone, position, CV link
3. Download CVs from the link provided
4. This is read-only

### 3.7 Change Contact Email Across the Site

The inquiry email `contact@neoskills.co.in` is hardcoded in these files:

| File | Line(s) | Context |
|------|---------|---------|
| `src/components/TopBar.jsx` | 28 | Top bar email link |
| `src/components/footer.jsx` | 102-104 | Footer email link |
| `src/components/CourseDetail.jsx` | 147, 703, 984 | Error messages & contact sidebar |
| `src/components/contactform.jsx` | 276-277 | Contact form fallback email |
| `src/pages/ContactSupport.jsx` | 26, 93 | Support page email |
| `src/pages/PrivacyPolicy.jsx` | 44 | Privacy policy contact |
| `src/pages/TermsOfService.jsx` | 32, 50 | Terms contact |
| `src/pages/CookiePolicy.jsx` | 43 | Cookie policy contact |
| `src/pages/EnrollmentGuide.jsx` | 8 | Enrollment guide contact |
| `src/pages/AboutPage.jsx` | 344 | About page contact |
| `src/App.jsx` | 91 | Structured data (SEO) |
| `server/index.cjs` | 60 | Payment confirmation email template |

**To change the email:** Search for `contact@neoskills.co.in` in all `.jsx` and `.js` files and replace with the new email.

### 3.8 Reseed Database from JSON Files

If data gets corrupted or you need to reset:
1. Go to `/admin`
2. Use the **Reseed** button (if available)
3. Or visit `POST /api/reseed` with admin password header

---

## 4. Deployment

### How Deploy Works

The site uses **continuous deployment**:
1. Developer pushes code to GitHub `main` branch
2. Render automatically detects the push
3. Render runs: `npm install && npm run build`
4. Render starts: `node server/index.cjs`
5. Live site updates in ~2-3 minutes

### To Manually Redeploy

1. Go to https://dashboard.render.com → `neoskills-api`
2. Click **Manual Deploy** → **Deploy latest commit**
3. Wait 2-3 minutes

### Environment Variables (Render Dashboard)

These are set in Render → Settings → Environment Variables:

| Variable | Purpose | Where to Find |
|----------|---------|---------------|
| `DATABASE_URL` | PostgreSQL connection string | Supabase → Settings → Database |
| `RAZORPAY_KEY_ID` | Razorpay API key | Razorpay Dashboard → Settings → API Keys |
| `RAZORPAY_KEY_SECRET` | Razorpay API secret | Razorpay Dashboard → Settings → API Keys |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook verification | Razorpay Dashboard → Settings → Webhooks |
| `ADMIN_PASSWORD` | Admin panel password | Set to `neoskills2026` |
| `ZOHO_EMAIL` | Nodemailer sender email | Gmail/Google account |
| `ZOHO_PASSWORD` | Nodemailer app password | Google Account → Security → App Passwords |
| `PORT` | Server port | Set to `4000` |

### Keep Render Alive (Free Tier)

Render free tier sleeps after 15 minutes of no traffic.
1. Go to https://cron-job.org
2. Create a cron job:
   - URL: `https://neoskills.co.in/api/health`
   - Schedule: Every 5 minutes
3. This keeps the server awake

---

## 5. Troubleshooting

### Problem: Website is not loading / showing error

**Check if server is running:**
1. Visit `https://neoskills.co.in/api/health`
2. If it returns `{"status":"ok"}` → server is running, issue is elsewhere
3. If it doesn't load → server is down or sleeping

**Fix:**
- Wait 30 seconds (Render may be waking up from sleep)
- If still down, go to Render dashboard → Manual Deploy
- Check Render logs for error messages

### Problem: Payments not working

**Check:**
1. Is Razorpay in live mode? (Check Razorpay dashboard)
2. Are the Razorpay env vars correct in Render?
3. Is the webhook set up? (Razorpay → Settings → Webhooks → URL: `https://neoskills.co.in/api/payment-webhook`)

### Problem: Emails not sending

**EmailJS (lead forms, contact form):**
1. Go to https://dashboard.emailjs.com
2. Check if the email service is still active
3. Check if templates exist and are published

**Nodemailer (payment confirmations, job application notifications):**
1. Check `ZOHO_EMAIL` and `ZOHO_PASSWORD` env vars in Render
2. Note: Despite the name "ZOHO", this uses Gmail SMTP
3. If Gmail blocked the app password, generate a new one:
   - Go to https://myaccount.google.com → Security → 2-Step Verification → App Passwords
   - Generate new password, update `ZOHO_PASSWORD` in Render

### Problem: Course not showing on website

**Check:**
1. Does the course exist in `/admin` → Courses tab?
2. Is the course slug correct? (Must match between `courses.json` and `courseStructure.js`)
3. Is the course's category correct?

**Fix:**
1. Go to `/admin` → check if course is there
2. If not, the auto-seed may not have added it → click Reseed or manually add via admin

### Problem: Admin panel not accessible

1. Check the password: `neoskills2026`
2. If password was changed, check `VITE_ADMIN_PASSWORD` env var in Render
3. Note: This is a client-side check — anyone can view it in browser source code

### Problem: Data disappeared after deploy

**This happens because:**
- Render free tier restarts the server periodically
- If `DATABASE_URL` is not set, data is stored in local JSON files (not persisted)

**Fix:**
1. Make sure `DATABASE_URL` env var is set in Render
2. If data is lost, use `/admin` → Reseed to restore from JSON files
3. Always back up important data (enrollments, job applications)

### Problem: Site is slow on first visit

- Render free tier takes ~30 seconds to wake up from sleep
- After first visit, it stays awake for ~15 minutes
- This is expected on free tier — upgrade to paid ($7/month) for instant response

---

## 6. Architecture Overview

### Data Flow

```
┌─────────────────────────────────────────────────────┐
│                    USER'S BROWSER                    │
│                                                      │
│  courseStructure.js  ──┐                             │
│  courseDataRich.js   ──┤── catalogBuilder.js ──┐     │
│                         │                      │     │
│                         │              Frontend React │
│                         │                      │     │
│  Backend API ───────────┤──────────────────────┘     │
│  (server/index.cjs)    │                             │
│       │                │                             │
│       ▼                │                             │
│  PostgreSQL            │                             │
│  (Supabase)            │                             │
└─────────────────────────────────────────────────────┘
```

### API Endpoints Reference

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/health` | GET | No | Check if server + DB are running |
| `/api/courses` | GET | No | List all courses |
| `/api/courses` | POST | Admin | Save all courses |
| `/api/batches` | GET | No | List all batches |
| `/api/batches` | POST | Admin | Save all batches |
| `/api/jobs` | GET | No | List all job postings |
| `/api/jobs` | POST | Admin | Save all job postings |
| `/api/hero-slides` | GET | No | List homepage slides |
| `/api/hero-slides` | POST | Admin | Save hero slides |
| `/api/webinars` | GET | No | List webinars |
| `/api/webinars` | POST | Admin | Save webinars |
| `/api/categories` | GET | No | List course categories |
| `/api/categories` | POST | Admin | Save categories |
| `/api/enrollments` | GET | Admin | List all enrollments |
| `/api/enrollment-details` | POST | No | Update enrollment address/GST |
| `/api/job-applications` | POST | No | Submit job application (with CV upload) |
| `/api/job-applications` | GET | Admin | List all job applications |
| `/api/create-order` | POST | No | Create Razorpay order |
| `/api/verify-payment` | POST | No | Verify Razorpay payment |
| `/api/payment-webhook` | POST | No | Razorpay webhook |
| `/api/reseed` | POST | Admin | Re-seed data from JSON files |
| `/api/reset-exam-fields` | POST | Admin | Strip stale exam fields |

### File Structure Map

```
website-landing-page/
├── src/                          # Frontend (React)
│   ├── App.jsx                   # Router + all page routes
│   ├── components/               # UI components (30+ files)
│   │   ├── AdminDashboard.jsx    # Admin panel (most complex file)
│   │   ├── CourseDetail.jsx      # Individual course page
│   │   ├── HiringPopup.jsx       # Homepage hiring popup
│   │   ├── LeadPopup.jsx         # Homepage lead capture popup
│   │   ├── AICoursesPopup.jsx    # Homepage AI courses popup
│   │   ├── CourseFinderAI.jsx    # AI chatbot widget
│   │   ├── contactform.jsx       # Contact form
│   │   ├── enroll.jsx            # Enrollment form
│   │   ├── paymentpage.jsx       # Razorpay payment page
│   │   ├── footer.jsx            # Site footer
│   │   ├── Navbar.jsx            # Navigation bar
│   │   └── ...                   # Other components
│   ├── data/                     # Course data layer
│   │   ├── courseStructure.js    # Master course list with pricing
│   │   ├── courseDataRich.js     # Rich content for key courses
│   │   ├── catalogBuilder.js     # Builds complete course objects
│   │   └── courseService.js      # Fetches from backend + merges
│   └── pages/                    # Route pages
│       ├── JobsPage.jsx          # /placements
│       ├── AboutPage.jsx         # /about
│       ├── ContactSupport.jsx    # /contact-support
│       └── ...                   # Other pages
│
├── server/                       # Backend (Express.js)
│   ├── index.cjs                 # ALL server routes (single file)
│   ├── db.cjs                    # PostgreSQL connection
│   ├── courses.json              # Course seed data (56 courses)
│   ├── jobs.json                 # Job postings (25 openings)
│   ├── hero-slides.json          # Homepage slides
│   ├── batches.json              # Batch schedule data
│   └── .env                      # Server secrets (gitignored)
│
├── public/                       # Static files (images, certificates)
├── scripts/                      # Utility scripts
├── dist/                         # Build output (auto-generated)
├── uploads/cvs/                  # Uploaded CV files
├── DEPLOY.md                     # Deployment guide
├── SOP.md                        # This document
└── package.json                  # Dependencies + scripts
```

---

## 7. Important Credentials

> **SECURITY WARNING:** Some credentials below are real values. Do NOT share this document publicly. Keep it in a secure location.

### Where to Find Credentials

| Credential | Where It's Stored |
|------------|-------------------|
| Admin password | `neoskills2026` (set in Render env: `VITE_ADMIN_PASSWORD` + `ADMIN_PASSWORD`) |
| Razorpay keys | Render env vars `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` |
| Database URL | Render env var `DATABASE_URL` (from Supabase) |
| Nodemailer email | Render env var `ZOHO_EMAIL` |
| Nodemailer password | Render env var `ZOHO_PASSWORD` (Gmail app password) |
| EmailJS service | `service_62ub16q` |
| EmailJS template | `template_l3twvqg` (general), `template_e15u3k6` (enrollment) |
| EmailJS public key | `S3TiyuUzfI2FRb5RG` |

### GitHub Repository

- **URL:** https://github.com/jeet4747/website-landing-neoskills
- **Branch:** `main` (auto-deploys to Render)

### Domain & DNS

- **Registrar:** Cloudflare
- **DNS:** CNAME record pointing to Render URL
- **SSL:** Managed by Cloudflare (automatic)

---

## Quick Reference — Emergency Contacts

| Issue | Action |
|-------|--------|
| Site down | Check Render dashboard → Logs → Redeploy if needed |
| Payments failing | Check Razorpay dashboard → verify keys in Render |
| Emails not sending | Check ZOHO_EMAIL/PASSWORD in Render; regenerate Gmail app password |
| Database issues | Check Supabase dashboard → verify DATABASE_URL in Render |
| Need to rollback | Git revert last commit → push → Render auto-deploys |
| Data lost | Use admin panel Reseed, or run `npm run init-db` locally |

---

*Last updated: July 2026*
*Document maintained by: NeoSkills Development Team*
