# NeoSkills Learning Solutions — neoskills.co.in

## Standard Operating Procedure

**NeoSkills Website — Operations Runbook**

A complete guide for managing, maintaining, and troubleshooting the NeoSkills website — written for anyone, regardless of technical background.

**Version 1.1 | July 2026 | Internal Use Only**
**Maintained by:** NeoSkills Development Team
**CONFIDENTIAL — DO NOT SHARE PUBLICLY**

---

> **INFO:** This document is designed so that anyone — even without prior technical experience — can keep the NeoSkills website running smoothly. Read each section carefully and follow steps exactly as written.

---

## Table of Contents

1. [Landing Pages Inventory](#1-landing-pages-inventory)
2. [How to Access](#2-how-to-access)
3. [Common Tasks](#3-common-tasks)
4. [Deployment](#4-deployment)
5. [Troubleshooting](#5-troubleshooting)
6. [Architecture Overview](#6-architecture-overview)
7. [Important Credentials](#7-important-credentials)
8. [EmailJS Documentation](#8-emailjs-documentation)
9. [Domain & DNS](#9-domain--dns)
10. [Forms Documentation](#10-forms-documentation)
11. [Database Documentation](#11-database-documentation)
12. [Folder Structure](#12-folder-structure)
13. [Backup Procedure](#13-backup-procedure)
14. [Monitoring](#14-monitoring)
15. [Monthly Maintenance Checklist](#15-monthly-maintenance-checklist)
16. [Emergency Recovery](#16-emergency-recovery)
17. [Third-Party Services](#17-third-party-services)
18. [Change Management](#18-change-management)
19. [Contact Details](#19-contact-details)
20. [Version History](#20-version-history)
- [Quick Reference / Emergency](#quick-reference--emergency-action-table)
- [Credentials Appendix](#credentials-appendix)

---

## 1 Landing Pages Inventory

| Page | URL Path | Source File | Technology | Form Used | Status |
|------|----------|-------------|------------|-----------|--------|
| Homepage | `/` | `src/App.jsx` (inline sections) | React + Tailwind | Contact form (Section), Lead popup, AI Courses popup, Hiring popup, WhatsApp popup, Course Finder AI chatbot | Live |
| Course Detail | `/course/:slug` | `src/components/CourseDetail.jsx` | React + Tailwind | Contact form, Brochure request form | Live |
| Enrollment | `/enroll` | `src/components/enroll.jsx` | React + Tailwind | Enrollment form (EmailJS) | Live |
| Payment | `/payment` | `src/components/paymentpage.jsx` | React + Tailwind | Razorpay checkout | Live |
| Payment Success | `/payment/success` | `src/components/PostPaymentForm.jsx` | React + Tailwind | Address/GST form | Live |
| Quick Pay | `/quick-pay` | `src/components/QuickPay.jsx` | React + Tailwind | Quick payment form | Live |
| Admin Panel | `/admin` | `src/components/AdminDashboard.jsx` | React + Tailwind | Course/Batch/Job/Slide management | Live |
| Jobs / Placements | `/placements` | `src/pages/JobsPage.jsx` | React + Tailwind | Job application form (with CV upload) | Live |
| About | `/about` | `src/pages/AboutPage.jsx` | React + Tailwind | None | Live |
| Contact Support | `/contact-support` | `src/pages/ContactSupport.jsx` | React + Tailwind | Contact support form | Live |
| Webinar | `/webinar/:slug` | `src/pages/WebinarPage.jsx` | React + Tailwind | Webinar registration form | Live |
| Blog | `/blog` | `src/pages/BlogPage.jsx` | React + Tailwind | None | Live |
| Course Compare | `/compare` | `src/pages/CourseCompare.jsx` | React + Tailwind | None | Live |
| FAQ | `/faq` | `src/pages/FAQPage.jsx` | React + Tailwind | None | Live |
| Enrollment Guide | `/enrollment-guide` | `src/pages/EnrollmentGuide.jsx` | React + Tailwind | None | Live |
| Privacy Policy | `/privacy-policy` | `src/pages/PrivacyPolicy.jsx` | React + Tailwind | None | Live |
| Terms of Service | `/terms-of-service` | `src/pages/TermsOfService.jsx` | React + Tailwind | None | Live |
| Cookie Policy | `/cookie-policy` | `src/pages/CookiePolicy.jsx` | React + Tailwind | None | Live |

**Global Components (appear on all pages):**
- TopBar (`src/components/TopBar.jsx`)
- Navbar (`src/components/Navbar.jsx`)
- Footer (`src/components/footer.jsx`)
- CourseFinderAI chatbot (`src/components/CourseFinderAI.jsx`)
- AICoursesPopup (`src/components/AICoursesPopup.jsx`)
- HiringPopup (`src/components/HiringPopup.jsx`)
- LeadPopup (`src/components/LeadPopup.jsx`)
- WhatsAppPopup (`src/components/WhatsAppPopup.jsx`)
- StickyCtaBar (`src/components/StickyCtaBar.jsx`)

---

## 2 How to Access

> **WARNING:** Keep all login credentials secure. Never share passwords or API keys in public chats, emails, or the public GitHub repository.

### 2.1 Admin Panel (Day-to-Day Management)

This is where you'll spend most of your time. Everything you need to manage is here.

1. Open your browser and go to: `https://neoskills.co.in/admin`
2. Enter the password: `neoskills2026`
3. You'll see the dashboard with tabs: **Courses | Batches | Jobs | Enrollments | Applications | Hero Slides | Webinars | Categories**
4. Use each tab to manage the relevant content (details in Section 3).

### 2.2 Render Dashboard (Server & Hosting)

Render hosts the backend server. Go here if the site is down, you need to view error logs, or re-deploy.

1. Go to: https://dashboard.render.com
2. Log in with the team's GitHub account credentials.
3. Click on the `neoskills-api` web service.
4. From here you can: view deploy history, manually redeploy, view error logs, and edit environment variables.

### 2.3 Supabase Dashboard (Database)

Supabase stores all your data (courses, enrollments, job applications). Go here to inspect data directly or run queries.

1. Go to: https://supabase.com/dashboard
2. Log in with team credentials.
3. Select the `neoskills` project.
4. Use the **Table Editor** to view/edit data, or the **SQL Editor** for advanced queries.

### 2.4 GitHub Repository (Code)

All the website's code lives here. When code is pushed to the main branch, the site automatically updates.

- **Repository URL:** https://github.com/jeet4747/website-landing-neoskills
- **Main branch:** `main` (every push triggers an automatic deploy — site updates in ~2–3 minutes)

> **NOTE:** Never push untested code directly to main. Always test locally first or use a separate branch.

---

## 3 Common Tasks

These are the tasks you'll perform most often. Each one includes step-by-step instructions anyone can follow.

### 3.1 Add a New Course

> **TIP:** Use Method A (Admin Panel) unless you're a developer. It's simpler and safer.

**Method A — Via Admin Panel (Recommended)**

1. Go to `https://neoskills.co.in/admin` and log in.
2. Click the **Courses** tab, then click the **+** (Add New) button.
3. Fill in the **Details & Dates** tab: Title, slug (URL name), category, duration, level, cohort date, pricing.
4. Fill in the **Pricing** tab: Exam body, certification validity, total fee, EMI info, refund policy.
5. Fill in the **Content** tab: Summary, description, highlights, who should join, career opportunities, syllabus.
6. Click **Save All Changes**. The course will go live on the website immediately.

**Method B — Via Code (Developers Only)**

Only use this if you're comfortable with code and Git.

1. Open `server/courses.json` and add a new course object (copy an existing one as a template).
2. Fill in: slug, title, category, description, highlights, whoShouldJoin, careerOpportunities, syllabus, feeDetails, certificate.
3. Add the course to `src/data/courseStructure.js` under the correct category.
4. Add a certificate image to `public/certificates/{slug}.webp`.
5. Commit and push to GitHub `main` branch. The site auto-updates in ~3 minutes.

> **IMPORTANT:** When adding a new course via code, the `examBody`, `examBodyUrl`, and `certificate.image` fields are **auto-computed from the course title** at runtime. Do NOT hardcode them in `courses.json` — the system finds the correct values from the static catalog data. Only `certValidity`, `careerOpportunities`, and `whoShouldJoin` can be overridden via the admin panel.

### 3.2 Update Batch Dates or Seats

1. Go to `/admin` → click the **Batches** tab.
2. Find the batch you want to change and click on it.
3. Update any of: start date, mode (e.g. "Evening 4–7 PM"), seats available, active/inactive status.
4. Click **Save All Changes**.

### 3.3 Add a Job Posting

1. Go to `/admin` → **Job Postings** tab → click **+**.
2. Fill in: Title, Department, Location, Type (full-time/contract), Experience required.
3. Add Summary, full Description, Responsibilities list, and Requirements list.
4. Set `contactEmail` to `contact@neoskills.co.in`.
5. Click **Save All Changes**. The job will appear on the `/placements` page.

> **NOTE:** When someone applies for a job, two things happen: (1) the CV is uploaded to the server and saved in `uploads/cvs/`, and (2) a hiring notification email is sent to `resume@neoskills.co.in` via Nodemailer.

### 3.4 Update Homepage Carousel (Hero Slides)

1. Go to `/admin` → **Hero Slides** tab.
2. Edit an existing slide or click **+** to add a new one.
3. Set: Title, Description, gradient colors (background), and the link to the relevant course.
4. Click **Save All Changes**. Changes appear on the homepage immediately.

### 3.5 View Student Enrollments

Go to `/admin` → **Enrollments** tab. You can see: student name, email, course, amount paid, payment ID, and status. This is **read-only** — you cannot edit enrollments from here.

### 3.6 View Job Applications

Go to `/admin` → **Applications** tab. Shows all applicants with name, email, phone, position applied for, and a CV download link. This is **read-only**.

### 3.7 Change the Contact Email Address Across the Site

> **NOTE:** The inquiry email `contact@neoskills.co.in` is hardcoded in multiple files. To change it: search for `contact@neoskills.co.in` in all `.jsx` and `.js` files and replace with the new address.

**Files where the email appears:**

| File | Where / Context |
|------|-----------------|
| `src/components/TopBar.jsx` | Top bar email link shown to all users |
| `src/components/footer.jsx` | Footer email link |
| `src/components/CourseDetail.jsx` | Error messages & contact sidebar |
| `src/components/contactform.jsx` | Contact form fallback email |
| `src/pages/ContactSupport.jsx` | Support page email |
| `src/pages/PrivacyPolicy.jsx` | Privacy policy contact |
| `src/pages/TermsOfService.jsx` | Terms of service contact |
| `src/pages/CookiePolicy.jsx` | Cookie policy contact |
| `src/pages/EnrollmentGuide.jsx` | Enrollment guide contact |
| `src/pages/AboutPage.jsx` | About page contact |
| `src/App.jsx` | Structured data (SEO / Google) |
| `server/index.cjs` | Payment confirmation email template |

**How to do a global find-and-replace:**

1. Open VS Code (or any code editor) and open the project folder.
2. Press `Ctrl+Shift+H` (or `Cmd+Shift+H` on Mac) to open Find & Replace.
3. In the **Find** box: type the old email address.
4. In the **Replace** box: type the new email address.
5. Click **Replace All** and confirm.
6. Push the changes to GitHub. The site will update in ~3 minutes.

### 3.8 Reseed Database (Restore Default Data)

Use this if data disappears after a server restart (common on Render's free tier). Reseeding restores course/job/batch data from the built-in JSON files.

1. Go to `https://neoskills.co.in/admin` and log in.
2. Look for the **Reseed** button in the dashboard.
3. Click it and confirm. Data will be restored from the backup JSON files.
4. Alternatively, visit `POST /api/reseed` with the admin password header (for developers).

> **WARNING:** Reseeding restores default course/job data but does NOT recover student enrollments or job applications — always back those up from Supabase first.

---

## 4 Deployment

### How Deployment Works — The Simple Version

You never need to manually upload files. The site updates automatically every time a developer pushes code to GitHub.

| Step | What Happens | Time |
|------|-------------|------|
| 1 | Developer pushes code to GitHub (`main` branch) | Instant |
| 2 | Render detects the new push automatically | ~10 seconds |
| 3 | Render installs packages and builds the site (`npm install && npm run build`) | ~60 seconds |
| 4 | Render starts the server (`node server/index.cjs`) | ~30 seconds |
| 5 | Live site is updated and available to everyone | **~2–3 min total** |

### Local Setup

1. Clone the repository: `git clone https://github.com/jeet4747/website-landing-neoskills.git`
2. Install dependencies: `npm install`
3. Create `server/.env` with required variables (see Section 7)
4. Run dev server: `npm run dev`
5. Run backend: `node server/index.cjs` (in a separate terminal)
6. Open `http://localhost:5173`

### Git Workflow

```bash
# Pull latest changes
git pull origin main

# Make your changes, then:
git add -A
git commit -m "description of changes"
git push origin main
# Site auto-deploys in ~2-3 minutes
```

### Manual Deployment

1. Go to https://dashboard.render.com and log in.
2. Click on `neoskills-api` web service.
3. Click **Manual Deploy** → **Deploy latest commit**.
4. Wait 2–3 minutes. Check `https://neoskills.co.in/api/health` to confirm.

### Rollback Process

1. Go to GitHub repository → **Commits** tab
2. Find the last known good commit
3. Click **Revert** on the bad commit, or run `git revert <commit-hash>` locally
4. Push to `main` → Render auto-deploys the reverted code

### NPM Scripts Reference

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend hot-reload) |
| `npm run build` | Build production bundle (generates `dist/`) |
| `npm run start` | Start production server (`node server/index.cjs`) |
| `npm run init-db` | Initialize/reset database tables and seed data |
| `npm run generate-sitemap` | Generate XML sitemap for SEO |

### Environment Variables

These are secret configuration values stored securely in Render. **Never hardcode these in the code.** To view or change them: Render Dashboard → `neoskills-api` → Settings → Environment Variables.

| Variable Name | Purpose | Where to Update | Where to Find |
|--------------|---------|-----------------|---------------|
| `DATABASE_URL` | PostgreSQL connection string | Render env vars | Supabase → Settings → Database |
| `RAZORPAY_KEY_ID` | Razorpay public API key | Render env vars | Razorpay Dashboard → API Keys |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | Render env vars | Razorpay Dashboard → API Keys |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook verification | Render env vars | Razorpay Dashboard → Webhooks |
| `ADMIN_PASSWORD` | Admin panel password | Render env vars | Set to `neoskills2026` |
| `ZOHO_EMAIL` | Nodemailer sender email | Render env vars | Gmail account |
| `ZOHO_PASSWORD` | Nodemailer app password | Render env vars | Google Account → App Passwords |
| `PORT` | Server port | Render env vars | Set to `4000` |
| `VITE_BACKEND_URL` | Frontend → Backend URL | `.env` file / Render | `https://neoskills.co.in` (prod) |
| `VITE_ADMIN_PASSWORD` | Client-side admin check | `.env` file / Render | `neoskills2026` |

### Keep Render Alive (Free Tier)

Render's free tier puts the server to sleep after 15 minutes of inactivity. A cron job pings `https://neoskills.co.in/api/health` every 5 minutes via cron-job.org to keep it awake.

> **NOTE:** If you notice the site is very slow on first visit, it's because the server was asleep. This is normal on the free tier. Upgrading to Render's paid plan ($7/month) eliminates this delay.

---

## 5 Troubleshooting

> **INFO:** Before panicking: check `https://neoskills.co.in/api/health` first. If it shows the server is running, the problem is likely frontend. If it times out, the server is down — go to Render.

### Problem: Site is completely down / not loading

**What to check first:**
- Visit `https://neoskills.co.in/api/health` — does it respond?
- Check https://dashboard.render.com → `neoskills-api` → **Logs** for error messages.

**How to fix it:**
- Click **Manual Deploy** → **Deploy latest commit** in Render.
- Wait 3 minutes and try again.
- If still failing, check the error in Render logs and contact the developer.

### Problem: Payments are failing / students can't pay

**What to check first:**
- Is Razorpay in live mode? (Check Razorpay Dashboard — top right shows Test/Live).
- Are `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` correct in Render env vars?
- Is the webhook set up? URL should be: `https://neoskills.co.in/api/payment-webhook`

**How to fix it:**
- Switch Razorpay to Live mode if it's in Test mode.
- Copy the correct keys from Razorpay Dashboard and update them in Render env vars.
- Add the webhook URL in Razorpay → Settings → Webhooks.

### Problem: Emails not being received

**What to check first:**
- For contact/lead forms: Check https://dashboard.emailjs.com — is the service active?
- For payment confirmations & job alerts: Check `ZOHO_EMAIL` and `ZOHO_PASSWORD` in Render env vars.

**How to fix it:**

**EmailJS (inquiry forms, lead popups, chatbot, webinar, brochure):**
1. Log in to https://dashboard.emailjs.com with `neoskillstech@gmail.com`
2. Check **Email Services** → service `service_1wdyrv6` is connected to Gmail
3. Check **Email Templates** → both templates are Active (not Draft):
   - `template_a2o3cnp` — Subject: `New Inquiry from {{name}}` (inquiry forms)
   - `template_5j2k85s` — Subject: `Enrollment - {{user_name}}` (enrollment form)
4. Config is centralized in `src/config/emailjs.js` — update there only

**Nodemailer (payment confirmations, hiring notifications):**
1. Check `ZOHO_EMAIL` and `ZOHO_PASSWORD` in Render env vars
2. If Gmail blocked the app password, generate a new one at Google Account → Security → App Passwords
3. Hiring notification emails go to `resume@neoskills.co.in`

### Problem: A course is not showing on the website

**How to fix it:**
- If course is missing from admin: Click **Reseed** to restore from JSON files.
- If slug is wrong: Edit the course in admin and correct the slug.
- Newly added courses auto-merge into the DB on server restart via `seedIfEmpty()`.

### Problem: Admin panel not accessible / wrong password

- Try the password: `neoskills2026`
- If it was changed, check `VITE_ADMIN_PASSWORD` in Render env vars.

### Problem: Data disappeared after a deploy

- Make sure `DATABASE_URL` env var is set in Render.
- Use `/admin` → **Reseed** button to restore course/job/batch data.
- For lost enrollments or job applications, check Supabase directly.

### Problem: Site is slow on first visit

- Expected on free tier — server was asleep. It will be fast after first load.
- Long-term solution: upgrade to Render paid plan ($7/month).

---

## 6 Architecture Overview

### Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                     VISITOR'S BROWSER                    │
│                                                          │
│  courseStructure.js  ──┐                                 │
│  courseDataRich.js   ──┤── catalogBuilder.js ──┐         │
│                         │                      │         │
│                         │              Frontend React     │
│                         │                      │         │
│  Backend API ───────────┤──────────────────────┘         │
│  (server/index.cjs)    │                                 │
│       │                │                                 │
│       ▼                │                                 │
│  PostgreSQL            │                                 │
│  (Supabase)            │                                 │
└─────────────────────────────────────────────────────────┘

External Services:
├── EmailJS ──────── Contact/inquiry/lead form emails
├── Nodemailer ───── Payment confirmations + hiring notifications
├── Razorpay ─────── Payment processing
└── Cloudflare ───── Domain + SSL
```

### Key Business Rules

| Rule | How It Works |
|------|-------------|
| Exam body & certificate image | Auto-computed from course title at runtime. Never stored in DB. Admin cannot override. |
| Cert validity & career opportunities | Admin-editable. Falls back to generated values if not set. |
| New course auto-merge | `seedIfEmpty()` merges new courses from `courses.json` by slug — preserves admin edits. |
| Stale field cleanup | On deploy, `examBody`/`examBodyUrl` are stripped from all DB courses to prevent stale values. |
| Hiring notifications | Applied via backend Nodemailer → `resume@neoskills.co.in` (not EmailJS). |
| Payment confirmations | Sent via Nodemailer to the student's email. |
| Inquiry/lead emails | Sent via EmailJS to `contact@neoskills.co.in`. |

### API Endpoints Reference

| Endpoint | Method | Auth | What It Does |
|----------|--------|------|-------------|
| `/api/health` | GET | No | Check if server and database are running |
| `/api/courses` | GET | No | Fetch all courses |
| `/api/courses` | POST | Admin | Save/update all courses |
| `/api/batches` | GET | No | Fetch all batch schedules |
| `/api/batches` | POST | Admin | Save batch data |
| `/api/jobs` | GET | No | Fetch all job postings |
| `/api/jobs` | POST | Admin | Save job postings |
| `/api/hero-slides` | GET | No | Fetch homepage carousel slides |
| `/api/hero-slides` | POST | Admin | Save hero slides |
| `/api/webinars` | GET | No | Fetch webinars |
| `/api/webinars` | POST | Admin | Save webinars |
| `/api/categories` | GET | No | Fetch course categories |
| `/api/categories` | POST | Admin | Save categories |
| `/api/enrollments` | GET | Admin | List all student enrollments |
| `/api/enrollment-details` | POST | No | Update enrollment address/GST |
| `/api/job-applications` | POST | No | Submit job application (with CV upload) |
| `/api/job-applications` | GET | Admin | View all job applications |
| `/api/create-order` | POST | No | Create Razorpay payment order |
| `/api/verify-payment` | POST | No | Verify completed payment |
| `/api/payment-webhook` | POST | No | Razorpay webhook |
| `/api/reseed` | POST | Admin | Restore data from JSON files |
| `/api/reset-exam-fields` | POST | Admin | Strip stale exam fields |

---

## 7 Important Credentials

> **SECURITY WARNING:** Keep this in a secure, password-protected location. Never share publicly.

### Where Passwords Are Stored

| Service | Login URL | Account Email | Password Stored In | Owner | Notes |
|---------|-----------|---------------|-------------------|-------|-------|
| GitHub | https://github.com | jeet4747 | Company password manager | Admin | Code repository |
| Cloudflare | https://dash.cloudflare.com | — | Company password manager | Admin | DNS & domain |
| Render | https://dashboard.render.com | — | Company password manager | Admin | Server hosting |
| Supabase | https://supabase.com/dashboard | — | Company password manager | Admin | Database |
| EmailJS | https://dashboard.emailjs.com | neoskillstech@gmail.com | Company password manager | Admin | Inquiry emails |
| Razorpay | https://dashboard.razorpay.com | — | Company password manager | Admin | Payments |
| Google Workspace | https://workspace.google.com | — | Company password manager | Admin | Email hosting |
| GoDaddy | — | — | Company password manager | Admin | Domain registrar (if used) |

> **NOTE:** Do NOT store actual passwords in this document. The table above shows where each password is managed.

---

## 8 EmailJS Documentation

### Credentials

| Item | Value |
|------|-------|
| Service ID | `service_1wdyrv6` |
| Inquiry Template | `template_a2o3cnp` |
| Enrollment Template | `template_5j2k85s` |
| Public Key | `r41Jkgv_e8C8336oD` |
| Connected Gmail | `neoskillstech@gmail.com` |
| Config file | `src/config/emailjs.js` |

### Template Variable Reference

**Inquiry Template (`template_a2o3cnp`):**
```
{{name}}       — Sender's full name
{{email}}      — Sender's email
{{phone}}      — Sender's phone
{{course}}     — Course or subject of inquiry
{{experience}} — Experience level (optional)
{{message}}    — Message body
```

**Enrollment Template (`template_5j2k85s`):**
```
{{user_name}}  — Student's full name
{{user_email}} — Student's email
{{user_phone}} — Student's phone
{{course}}     — Course being enrolled in
{{Amount}}     — Payment amount
{{message}}    — Additional notes
```

### How to Reconnect Gmail

1. Go to https://dashboard.emailjs.com → **Email Services**
2. Click on the service → **Reconnect** or **Connect New Account**
3. Authorize the Gmail/Google Workspace account
4. Update Service ID in `src/config/emailjs.js` if changed

### How to Create a New Template

1. Go to https://dashboard.emailjs.com → **Email Templates** → **Create New Template**
2. Set the **Subject** line (use `{{variable}}` syntax for dynamic values)
3. Design the email body with template variables
4. Click **Save**
5. Update the template ID in `src/config/emailjs.js`

### How to Test Email Delivery

1. Open the template in EmailJS dashboard
2. Click **Send test email** button
3. Enter test values for each variable
4. Check the recipient inbox
5. Check **Email History** tab for delivery status

### Current Template Subjects

| Template | Subject Line |
|----------|-------------|
| `template_a2o3cnp` (Inquiry) | `New Inquiry from {{name}}` |
| `template_5j2k85s` (Enrollment) | `Enrollment - {{user_name}}` |

---

## 9 Domain & DNS

| Item | Details |
|------|---------|
| Domain Registrar | Cloudflare (or GoDaddy — check with admin) |
| DNS Provider | Cloudflare |
| Domain Name | `neoskills.co.in` |
| SSL Certificate | Managed automatically by Cloudflare (HTTPS always on) |
| DNS Record | CNAME pointing `neoskills.co.in` → Render URL |

### How to Update DNS

1. Log in to Cloudflare dashboard
2. Select `neoskills.co.in` domain
3. Go to **DNS** → **Records**
4. Edit the CNAME record to point to the current Render URL

### How to Create Subdomains

1. In Cloudflare → DNS → Add Record
2. Type: `CNAME`
3. Name: the subdomain (e.g., `blog`)
4. Target: the target domain or Render URL
5. Proxy status: Proxied (orange cloud)

> **NOTE:** After DNS changes, propagation can take up to 24 hours (usually 5–15 minutes).

---

## 10 Forms Documentation

### 10.1 Contact Form (Homepage)

| Item | Details |
|------|---------|
| File | `src/components/contactform.jsx` |
| Validation | Required: name, email, phone, course |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_a2o3cnp` (Inquiry) |
| Database | None (email only) |

### 10.2 Course Detail Contact Form

| Item | Details |
|------|---------|
| File | `src/components/CourseDetail.jsx` (lines 121–149) |
| Validation | Required: name, email; Optional: phone, message |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_a2o3cnp` (Inquiry) |
| Database | None (email only) |

### 10.3 Brochure Request Form

| Item | Details |
|------|---------|
| File | `src/components/CourseDetail.jsx` (lines 970–984) |
| Validation | Required: name, email; Optional: phone |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_a2o3cnp` (Inquiry) |
| Database | None (email only) |

### 10.4 Enrollment Form

| Item | Details |
|------|---------|
| File | `src/components/enroll.jsx` |
| Validation | Required: name, phone, email, course, experience |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_5j2k85s` (Enrollment) |
| Database | Stored after payment via `/api/verify-payment` |

### 10.5 Job Application Form

| Item | Details |
|------|---------|
| File | `src/pages/JobsPage.jsx` |
| Validation | Required: name, email, phone, CV upload |
| Email Recipient | `resume@neoskills.co.in` (Nodemailer) + `contact@neoskills.co.in` (EmailJS) |
| Database | `app_data` table (key: `job_applications`) |
| File Upload | CV saved to `uploads/cvs/` |

### 10.6 Lead Popup

| Item | Details |
|------|---------|
| File | `src/components/LeadPopup.jsx` |
| Validation | Required: name, email, phone |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_a2o3cnp` (Inquiry) |
| Trigger | Shows after 2 minutes on homepage |

### 10.7 AI Courses Popup

| Item | Details |
|------|---------|
| File | `src/components/AICoursesPopup.jsx` |
| Validation | Required: name, email, phone, course selection |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_a2o3cnp` (Inquiry) |

### 10.8 Hiring Popup

| Item | Details |
|------|---------|
| File | `src/components/HiringPopup.jsx` |
| Validation | Required: name, email, phone, CV upload |
| Email Recipient | `resume@neoskills.co.in` (Nodemailer) |
| Trigger | Shows after 5 seconds on homepage |
| Backend | `POST /api/job-applications` with CV upload |

### 10.9 Webinar Registration Form

| Item | Details |
|------|---------|
| Files | `src/components/WebinarPopup.jsx` (popup) + `src/pages/WebinarPage.jsx` (page) |
| Validation | Required: name, email, phone |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_a2o3cnp` (Inquiry) |

### 10.10 Course Finder AI Chatbot

| Item | Details |
|------|---------|
| File | `src/components/CourseFinderAI.jsx` |
| Validation | Name, email, phone collected during conversation |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_a2o3cnp` (Inquiry) |

### 10.11 Contact Support Form

| Item | Details |
|------|---------|
| File | `src/pages/ContactSupport.jsx` |
| Validation | Required: name, email, subject, message |
| Email Recipient | `contact@neoskills.co.in` |
| EmailJS Template | `template_a2o3cnp` (Inquiry) |

---

## 11 Database Documentation

### Connection

- **Engine:** PostgreSQL via Supabase
- **Connection:** `server/db.cjs` using `pg` library
- **SSL:** Enabled (`rejectUnauthorized: false`)

### Table Structure

The database uses a **single table** with a key-value JSONB pattern:

```sql
CREATE TABLE IF NOT EXISTS app_data (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

### Data Keys

| Key | Content | Seeded From |
|-----|---------|-------------|
| `courses` | Array of all course objects (56 courses) | `server/courses.json` |
| `jobs` | Array of all job postings (25 openings) | `server/jobs.json` |
| `hero_slides` | Array of homepage carousel slides | `server/hero-slides.json` |
| `batches` | Array of batch schedules | `server/batches.json` |
| `job_applications` | Array of job applications with CV references | Created at runtime |
| `enrollments` | Array of student enrollments with payment data | Created at runtime |
| `webinars` | Array of webinar configurations | `server/` seed scripts |
| `categories` | Array of course categories | `server/categories.json` |

### Backup

1. Go to Supabase dashboard → **Table Editor** → select `app_data` table
2. Click **Export** → download as CSV/JSON
3. Or use SQL: `SELECT * FROM app_data` and export results

### Restore

1. Use admin panel **Reseed** button, or
2. Run `POST /api/reseed` with admin password header, or
3. Run `npm run init-db` locally (requires `DATABASE_URL`)

> **WARNING:** Reseeding overwrites all data in the `app_data` table. Back up first if you have important enrollments or job applications.

---

## 12 Folder Structure

### Project Root

```
website-landing-page/
├── src/                    # Frontend source code (React)
├── server/                 # Backend source code (Node.js/Express)
├── public/                 # Static assets (images, certificates)
├── uploads/                # User uploads (CV files)
├── dist/                   # Build output (auto-generated, do not edit)
├── scripts/                # Utility scripts (sitemap generation)
├── .env                    # Frontend environment variables
├── .gitignore              # Files excluded from Git
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── DEPLOY.md               # Deployment guide
├── SOP.md                  # This document
└── README.md               # Project readme
```

### `src/` — Frontend

| Folder | Purpose |
|--------|---------|
| `src/components/` | All UI components (36 files) — the building blocks of the site |
| `src/pages/` | Route-based page components (11 files) |
| `src/data/` | Course data layer — how courses are built and served |
| `src/config/` | Configuration files (EmailJS credentials) |
| `src/context/` | React context providers (EnrollContext) |
| `src/App.jsx` | Main router — defines all page routes |
| `src/main.jsx` | App entry point |
| `src/index.css` | Global styles + Tailwind imports |

### `server/` — Backend

| File | Purpose |
|------|---------|
| `server/index.cjs` | **ALL server routes** — the heart of the backend |
| `server/db.cjs` | PostgreSQL connection setup |
| `server/init-db.cjs` | Database initialization script |
| `server/courses.json` | Seed data for 56 courses |
| `server/jobs.json` | Seed data for 25 job postings |
| `server/hero-slides.json` | Homepage carousel slides |
| `server/batches.json` | Batch schedule data |
| `server/categories.json` | Course categories |
| `server/.env` | **Secret credentials** (NOT uploaded to GitHub) |

### `public/` — Static Assets

| Folder | Purpose |
|--------|---------|
| `public/certificates/` | Certificate preview images for each course (`.webp` format) |
| `public/images/` | Logos, icons, and other images |
| `public/` | Favicon, robots.txt, sitemap.xml |

### `src/data/` — Course Data Layer

| File | Purpose |
|------|---------|
| `courseStructure.js` | Master list of all courses with pricing, categories, syllabus |
| `courseDataRich.js` | Rich content (detailed syllabus, highlights) for key courses |
| `catalogBuilder.js` | Combines course structure + rich content + backend data into complete objects |
| `courseService.js` | Fetches courses from backend API + merges with static data |

---

## 13 Backup Procedure

### Database Backup

**Frequency:** Before every major change + weekly

1. Go to Supabase dashboard → **SQL Editor**
2. Run: `SELECT * FROM app_data`
3. Export results as JSON
4. Save the file with date prefix (e.g., `backup-2026-07-28.json`)

### Code Backup

- All code is backed up automatically via GitHub
- Every push to `main` is a backup point
- To create a manual backup branch: `git checkout -b backup-2026-07-28 && git push`

### Restore Process

1. **Data restore:** Use admin panel Reseed, or run `npm run init-db`
2. **Code restore:** `git revert <bad-commit>` → push to main
3. **Full restore:** Clone fresh from GitHub → `npm install` → `npm run init-db` → deploy

### Frequency

| What | How Often | How |
|------|-----------|-----|
| Code | Every push | Git (automatic) |
| Database | Weekly + before changes | Manual export from Supabase |
| JSON seed files | Every code push | Git (automatic) |

---

## 14 Monitoring

### Server Health

- **Health endpoint:** `https://neoskills.co.in/api/health`
- **Cron job:** Pings every 5 minutes via cron-job.org to keep alive
- **Check manually:** Visit the URL — should return `{"status":"ok"}`

### Render Logs

1. Go to https://dashboard.render.com → `neoskills-api` → **Logs**
2. Look for error messages, stack traces, or warning patterns
3. Common issues: DB connection errors, missing env vars, crashes

### Error Monitoring

- **Frontend errors:** Check browser console (F12) on the live site
- **Backend errors:** Check Render logs
- **Email failures:** Check EmailJS dashboard → **Email History** tab

### Analytics

- Google Analytics: check with admin for tracking ID
- Google Search Console: monitor indexing and search performance

### Email Failure Monitoring

1. EmailJS: https://dashboard.emailjs.com → **Email History** tab
2. Nodemailer: Check Render logs for SMTP errors
3. Common issues: Gmail app password expired, rate limits, template variables mismatch

---

## 15 Monthly Maintenance Checklist

| Task | How | Priority |
|------|-----|----------|
| Test contact form | Fill and submit on live site | High |
| Test enrollment flow | Submit enrollment + check email received | High |
| Test payment (small amount) | Make a test payment via Razorpay | High |
| Check SSL certificate | Visit site → click lock icon → check expiry | Medium |
| Check DNS | Verify `neoskills.co.in` resolves correctly | Medium |
| Check Render logs | Look for errors or warnings | Medium |
| Check EmailJS quota | EmailJS dashboard → check usage (200 requests/month free) | Medium |
| Check backups | Verify latest database backup exists | High |
| Test all landing pages | Visit each page, check for broken images/links | Medium |
| Check Render uptime | Verify no extended downtimes | Low |
| Update npm packages | `npm update` locally → test → push | Low |
| Check job applications | Review new applications in admin panel | Medium |
| Verify hiring emails arriving | Check `resume@neoskills.co.in` inbox | High |

---

## 16 Emergency Recovery

### Website Down

1. Check `https://neoskills.co.in/api/health`
2. Go to Render dashboard → check logs
3. Click **Manual Deploy** → **Deploy latest commit**
4. If deploy fails: check env vars, check for syntax errors in latest commit
5. If still down: revert last commit → push → auto-deploys

### Email Not Working

1. **EmailJS:** Check dashboard → Email Services → verify service is connected
2. **Nodemailer:** Check `ZOHO_EMAIL`/`ZOHO_PASSWORD` in Render env vars
3. Generate new Gmail App Password if needed
4. Update env vars in Render → service restarts automatically

### Payment Failure

1. Check Razorpay dashboard → is it in Live mode?
2. Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in Render
3. Check webhook URL: `https://neoskills.co.in/api/payment-webhook`
4. Check Render logs for payment-related errors

### Database Issue

1. Check Supabase dashboard → is the project active?
2. Verify `DATABASE_URL` in Render env vars
3. If data is corrupted: Reseed via admin panel
4. If table is missing: run `npm run init-db`

### DNS Issue

1. Check Cloudflare dashboard → is DNS resolving?
2. Verify CNAME record points to correct Render URL
3. Check SSL status in Cloudflare

### SSL Issue

1. SSL is managed by Cloudflare — usually auto-renews
2. If showing expired: go to Cloudflare → SSL/TLS → enable "Full (Strict)"
3. Check origin certificate in Render (if applicable)

### Deployment Failure

1. Check Render logs for build errors
2. Common causes: syntax error in code, missing dependency, env var issue
3. Revert the last commit → push → auto-deploys
4. If still failing: check `package.json` for dependency issues

---

## 17 Third-Party Services

| Service | Purpose | Dashboard URL | Account |
|---------|---------|---------------|---------|
| GitHub | Code hosting + CI/CD | https://github.com/jeet4747/website-landing-neoskills | jeet4747 |
| Render | Server hosting | https://dashboard.render.com | Team account |
| Supabase | PostgreSQL database | https://supabase.com/dashboard | Team account |
| Cloudflare | Domain + DNS + SSL | https://dash.cloudflare.com | Team account |
| Razorpay | Payment processing | https://dashboard.razorpay.com | Team account |
| EmailJS | Client-side email sending | https://dashboard.emailjs.com | neoskillstech@gmail.com |
| Google Workspace | Business email | https://workspace.google.com | Team account |
| Google Analytics | Website analytics | https://analytics.google.com | Team account |
| Google Search Console | SEO monitoring | https://search.google.com/search-console | Team account |
| cron-job.org | Keep Render alive | https://cron-job.org | Team account |

---

## 18 Change Management

### Before Deployment

- [ ] Test all changes locally (`npm run dev` + `node server/index.cjs`)
- [ ] Check for console errors in browser
- [ ] Verify no hardcoded secrets or credentials
- [ ] Run `npm run build` to confirm build succeeds
- [ ] Test critical flows: enrollment, payment, contact form

### After Deployment

- [ ] Visit `https://neoskills.co.in/api/health` — confirm server is up
- [ ] Test the specific feature that was changed
- [ ] Check Render logs for errors
- [ ] Test in incognito browser (avoid cache issues)

### Testing Checklist

| Test | Expected Result |
|------|----------------|
| Contact form submission | Email received at `contact@neoskills.co.in` |
| Enrollment form submission | Email received, redirects to payment |
| Payment (test mode or live) | Payment succeeds, confirmation email sent |
| Job application with CV | CV uploaded, email to `resume@neoskills.co.in` |
| Admin panel access | Password `neoskills2026` works |
| All pages load | No 404 errors, no broken images |

### Rollback Checklist

1. Identify the last working commit: `git log --oneline`
2. Revert: `git revert <commit-hash>`
3. Push: `git push origin main`
4. Wait 2–3 minutes for Render to deploy
5. Verify site is working

---

## 19 Contact Details

| Purpose | Contact |
|---------|---------|
| Website Owner | **[FILL IN]** |
| Technical Lead | **[FILL IN]** |
| Hosting Support (Render) | https://render.com/help |
| Domain Support (Cloudflare) | https://support.cloudflare.com |
| Database Support (Supabase) | https://supabase.com/support |
| Razorpay Support | https://razorpay.com/support |
| EmailJS Support | https://www.emailjs.com/support |
| HR (Hiring Emails) | `resume@neoskills.co.in` |
| General Inquiries | `contact@neoskills.co.in` |
| Phone | `+91 89569 63953` |

---

## 20 Version History

| Version | Date | Updated By | Changes |
|---------|------|------------|---------|
| 1.0 | July 2026 | NeoSkills Dev Team | Initial SOP — basic sections 1–7 |
| 1.1 | July 2026 | NeoSkills Dev Team | Complete rewrite — 20 sections, EmailJS migration, HiringPopup, Nodemailer, credentials appendix |

---

## Quick Reference — Emergency Action Table

Something's broken and you need to act fast? Use this table.

| Symptom / Problem | Immediate Action |
|-------------------|-----------------|
| **Site is completely down** | Render Dashboard → `neoskills-api` → Logs → Manual Deploy |
| **Payments not working** | Razorpay Dashboard → verify Live mode → check keys in Render |
| **Emails not sending** | Check which system: EmailJS (inquiries) or Render `ZOHO_*` (payments/hiring) |
| **Database issues** | Supabase Dashboard → verify `DATABASE_URL` in Render |
| **Need to rollback** | GitHub → Revert last commit → Push → Render auto-deploys |
| **Data disappeared** | Admin panel → Reseed button |
| **Admin not accessible** | Password: `neoskills2026` → check `VITE_ADMIN_PASSWORD` in Render |
| **Course not showing** | Admin → Courses → check slug/category → Reseed |
| **Site slow on first visit** | Expected on free tier — server was sleeping |
| **Hiring emails missing** | Check Render logs → verify `ZOHO_*` → check `resume@neoskills.co.in` |

---

## Credentials Appendix

> **SECURITY:** Do NOT write actual passwords here. This appendix shows where each credential is managed.

| Platform | Login URL | Account Email | Password Stored In | Owner | Notes |
|----------|-----------|---------------|-------------------|-------|-------|
| GitHub | https://github.com | jeet4747 | Company vault | Admin | Code repo, auto-deploy |
| Cloudflare | https://dash.cloudflare.com | — | Company vault | Admin | DNS, SSL |
| Render | https://dashboard.render.com | — | Company vault | Admin | Server hosting |
| Supabase | https://supabase.com/dashboard | — | Company vault | Admin | PostgreSQL database |
| EmailJS | https://dashboard.emailjs.com | neoskillstech@gmail.com | Company vault | Admin | Inquiry email service |
| Razorpay | https://dashboard.razorpay.com | — | Company vault | Admin | Payment gateway |
| Google Workspace | https://workspace.google.com | — | Company vault | Admin | Business email |
| Google Analytics | https://analytics.google.com | — | Company vault | Admin | Website analytics |
| Google Search Console | https://search.google.com/search-console | — | Company vault | Admin | SEO monitoring |
| GoDaddy | — | — | Company vault | Admin | Domain (if used) |
| cron-job.org | https://cron-job.org | — | Company vault | Admin | Keep-alive ping |

---

*This document was prepared by the NeoSkills Development Team — July 2026*
*neoskills.co.in | contact@neoskills.co.in | INTERNAL — CONFIDENTIAL*
