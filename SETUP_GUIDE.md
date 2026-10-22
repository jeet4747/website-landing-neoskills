# NeoSkills Platform — Full Setup Guide (New Machine / New Developer)

This repo is **one project with two halves**:

| Half | Tech | Entry point | Port |
|------|------|-------------|------|
| Frontend | React 18 + Vite 4 + Tailwind | `src/` | `5173` (dev) |
| Backend / API | Express (CommonJS) | `server/index.cjs` | `4000` |

In **production** they are the *same* service: `npm start` runs the Express server, which also serves the built `dist/` folder. In **development** they run as two separate processes (Vite dev server + API), and Vite proxies `/api` → `:4000`.

> **Repo:** `https://github.com/jeet4747/website-landing-neoskills.git`

---

## 1. Prerequisites

Install these first:

| Tool | Version | Check | Install |
|------|---------|-------|---------|
| **Node.js** | 18+ (project developed on 24.x) | `node -v` | `brew install node` (macOS) or https://nodejs.org (LTS) |
| **npm** | 9+ (ships with Node) | `npm -v` | bundled |
| **Git** | any recent | `git --version` | `brew install git` or https://git-scm.com |
| **PostgreSQL** | optional, 14+ | `psql --version` | only if using a local DB (see §6) |

**macOS note:** Apple Silicon (M1/M2/M4) users may hit an `esbuild` architecture error because your shell runs under Rosetta (x86_64). If a build fails with *"You installed esbuild for another platform…"*, run:

```bash
arch -arm64 npm run build
```

---

## 2. Clone

```bash
git clone https://github.com/jeet4747/website-landing-neoskills.git
cd website-landing-neoskills
```

---

## 3. Install dependencies

A **single root install is enough** — it covers both the frontend and the backend (`express`, `pg`, `multer`, `nodemailer`, `razorpay`, `cors`, `dotenv` all live in the root `package.json`):

```bash
npm install
```

The `server/` folder also has its own small `package.json`. It is **optional** (Node resolves missing packages by walking up to the root `node_modules`), but you can install it for isolation:

```bash
cd server && npm install && cd ..
```

> `node_modules/` is gitignored — every new machine needs this step.

---

## 4. Environment files (there are TWO)

### 4a. Root `.env` — used by Vite (frontend only)

```bash
cp .env.example .env
```

Working local values:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_ADMIN_PASSWORD=neoskills2026
VITE_RECAPTCHA_SITE_KEY=6LcOXOgtAAAAACQR5nrlqBYsQ67QnvD0Wj-tsDuV
```

| Variable | Purpose |
|----------|---------|
| `VITE_BACKEND_URL` | API base URL. Local = `http://localhost:4000`. **Production = leave EMPTY** (same-origin) |
| `VITE_ADMIN_PASSWORD` | Password shown in the admin UI |
| `VITE_RECAPTCHA_SITE_KEY` | reCAPTCHA v2 **site** key rendered by the forms |
| `VITE_API_URL` | optional extra API base |

> ⚠️ Only variables prefixed with `VITE_` reach the browser. Anything else is ignored at build time.

### 4b. `server/.env` — used by the Express API (the server reads **only this file**)

```bash
cp server/.env.example server/.env
```

```env
PORT=4000
ADMIN_PASSWORD=neoskills2026

# Database — leave EMPTY for local dev (data is stored in server/*.json files)
DATABASE_URL=

# Razorpay (test keys are in server/.env.example)
RAZORPAY_KEY_ID=rzp_test_SUYgxzXg55LcOm
RAZORPAY_KEY_SECRET=871hdCqef6hntnMPk0xqrDa6
RAZORPAY_WEBHOOK_SECRET=

# reCAPTCHA v2 server-side validation (logging only — never blocks a lead)
RECAPTCHA_SECRET_KEY=6LcOXOgtAAAAAA1mmytZfKNzY_JnAer5NjaP1Ri8

# Lead / notification inbox
LEAD_EMAIL=contact@neoskills.co.in

# Email delivery — choose ONE path (see §7)
# HTTPS provider (works on Render FREE tier): pick one
RESEND_API_KEY=
SENDGRID_API_KEY=
BREVO_API_KEY=
MAIL_FROM=onboarding@resend.dev

# SMTP fallback (works LOCALLY and on PAID Render only — blocked on free tier)
ZOHO_EMAIL=
ZOHO_PASSWORD=
SMTP_HOST=
SMTP_PORT=
```

> ⚠️ **Gotcha:** putting `RESEND_API_KEY`, `ZOHO_EMAIL`, `DATABASE_URL`, etc. in the *root* `.env` will do nothing — `server/index.cjs` loads only `server/.env`. Keep the two files separate.

---

## 5. Run locally (two terminals)

**Terminal 1 — backend (leave this running):**

```bash
node server/index.cjs
# or: npm start
```

**Terminal 2 — frontend:**

```bash
npm run dev
```

Then open **http://localhost:5173**

| URL | What it is |
|-----|------------|
| http://localhost:5173 | Site |
| http://localhost:5173/admin | Admin dashboard (password `neoskills2026`) |
| http://localhost:4000/api/health | API health → `{"status":"ok","db":true\|false}` |
| http://localhost:4000/api/mail-check | Mail provider diagnostic (admin header) |

Vite's dev proxy forwards `/api` → `http://localhost:4000`, so the frontend reaches the API automatically.

**Quick smoke test** (no captcha needed):

```bash
curl -X POST http://localhost:4000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"+910000000000","source":"setup-test"}'
```

Expect: `{"success":true,"lead":{...},"emailProvider":false}`

---

## 6. Database (optional for local dev)

- **No `DATABASE_URL` →** the API persists data in JSON files inside `server/` (`leads.json`, `courses.json`, …). Perfect for local dev.
- **With `DATABASE_URL` →** data goes to Postgres (Supabase in production).

```bash
# server/.env
DATABASE_URL=postgresql://postgres:PASSWORD@db.XXXXX.supabase.co:5432/postgres
```

Seed initial data (optional, needs `DATABASE_URL`):

```bash
npm run init-db
```

Check it worked: `curl http://localhost:4000/api/health` → `"db":true`.

---

## 7. Email — read this before you deploy

Three mail senders exist: **lead/callback forms**, **payment confirmations**, **job applications**.

- **Render FREE tier blocks outbound SMTP (ports 25/465/587).** Server-side `nodemailer` **cannot work there** — you'll see `ETIMEDOUT`.
- **Fix:** set an HTTPS email API key (`RESEND_API_KEY` / `SENDGRID_API_KEY` / `BREVO_API_KEY`) in **Render's** env vars. The server auto-selects it. Test with:
  ```bash
  curl -H "x-admin-password: neoskills2026" https://YOUR-APP.onrender.com/api/mail-test
  ```
- **Without any key**, the API skips server-side email and the **frontend sends via EmailJS** instead (`emailProvider:false`).

> **EmailJS gotcha:** both EmailJS templates have reCAPTCHA validation enabled, and sends fail with `400 reCAPTCHA: invalid-input-response` unless the secret stored *inside the EmailJS template* matches your site key. Fix in EmailJS → *Email Templates* → Settings, or disable it there (forms still show the checkbox client-side).

---

## 8. Build & run production locally

```bash
npm run build     # runs generate-sitemap, then vite build → dist/
npm start         # serves dist/ + the API on :4000
```

Open http://localhost:4000 — the built site and the API are served by the same process.

Other scripts:

| Script | What it does |
|--------|--------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Sitemap + production bundle to `dist/` |
| `npm run preview` | Preview `dist/` on `:4173` (**static only, no API**) |
| `npm start` | Production: Express serves `dist/` + `/api` |
| `npm run generate-sitemap` | Regenerates `public/sitemap.xml` |
| `npm run init-db` | Seeds the Postgres DB (needs `DATABASE_URL`) |

> 🔴 **Never ship a build made with `VITE_BACKEND_URL=http://localhost:4000`.** For production builds, set `VITE_BACKEND_URL` empty/absent so calls go to same-origin `/api/...`.

---

## 9. Deploy (production)

Full step-by-step is in [`DEPLOY.md`](./DEPLOY.md). Summary:

1. **Supabase** (free) → copy the connection string → this becomes `DATABASE_URL`.
2. **Render** → New *Web Service* → connect the GitHub repo:
   - **Build command:** `npm install && npm run build`
   - **Start command:** `node server/index.cjs`
   - **Plan:** Free
3. Add **environment variables on Render** (not in git — `.env` is gitignored):
   `DATABASE_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `ADMIN_PASSWORD`, `RECAPTCHA_SECRET_KEY`, `LEAD_EMAIL`, plus **one** email API key (`RESEND_API_KEY`, …).
   Leave `VITE_BACKEND_URL` **unset**.
4. Visit `/api/health` → `{"status":"ok","db":true}`.
5. **cron-job.org** pings `/api/health` every 5 min so the free instance doesn't sleep.
6. Point the domain (Cloudflare CNAME → Render).

**Deploy flow:** `git push` to `main` → Render auto-builds and redeploys.

---

## 10. Troubleshooting

| Symptom | Cause / fix |
|---------|-------------|
| `esbuild … another platform / not running under Rosetta 2` | Shell is x86_64 on an arm64 Mac → `arch -arm64 npm run build` |
| `EADDRINUSE :4000` | Something already running → `lsof -ti:4000 \| xargs kill -9` |
| `EADDRINUSE :5173` | Same, for Vite → kill it or `npm run dev -- --port 5174` |
| Forms say success but **no email arrives** | SMTP is blocked on Render free tier (§7), or the EmailJS reCAPTCHA gate. Check `/api/mail-test` and EmailJS → Email History |
| API returns `"API route not found"` | Dev server not running, or wrong port/proxy |
| `"db":false` in `/api/health` | No `DATABASE_URL`, or invalid connection string |
| Admin login rejected | `ADMIN_PASSWORD` in `server/.env` differs from `VITE_ADMIN_PASSWORD` in root `.env` (they must match) |
| Leads missing from the dashboard | They're stored first — check `GET /api/leads` with header `x-admin-password: <admin password>` |
| Build worked yesterday, fails today | `node_modules` mismatch → `rm -rf node_modules && npm install` |

---

## 11. Windows notes (Windows 10 / 11)

Everything in this guide works on Windows. Use **PowerShell** (default on Win 10/11) or **Command Prompt**. The only differences are the shell syntax:

### Install tools
```powershell
# Node.js LTS — https://nodejs.org  (the .msi installer, x64)
# Git — https://git-scm.com/download/win
node -v    # 18+
npm -v
git --version
```
`brew install node` does not exist — use the installers above (or `winget install OpenJS.NodeJS.LTS` / `winget install Git.Git`).

### Clone + install
```powershell
git clone https://github.com/jeet4747/website-landing-neoskills.git
cd website-landing-neoskills
npm install
```
Identical to macOS/Linux. (If npm errors on file paths, run PowerShell **as Administrator** and enable long paths, then reboot:
`New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force` — then reboot.)

### Create the two `.env` files
```powershell
Copy-Item .env.example .env
Copy-Item server\.env.example server\.env
```
> ⚠️ **Do not create `.env` in Notepad** — it silently saves it as `.env.txt` and the app won't find it. Use `Copy-Item`, then edit it:
> ```powershell
> notepad .env
> notepad server\.env
> ```

### Run (two windows)
```powershell
# Window 1 — API
node server\index.cjs        # or: npm start

# Window 2 — site
npm run dev
```
Same URLs: site `http://localhost:5173`, API `http://localhost:4000`.
Windows Firewall will pop up asking to allow Node — click **Allow** (private network) so port 4000 stays reachable.

### Health / smoke checks
In PowerShell, `curl` is an alias for a *different* command, so use `curl.exe`, or better, `Invoke-RestMethod`:
```powershell
curl.exe http://localhost:4000/api/health

Invoke-RestMethod -Uri http://localhost:4000/api/leads -Method Post `
  -ContentType "application/json" `
  -Body '{"name":"Test","phone":"+910000000000","source":"win-test"}'
```
(CMD users: plain `curl` works with escaped quotes — `curl -X POST http://localhost:4000/api/leads -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"phone\":\"+910000000000\",\"source\":\"win-test\"}"`.)

### Kill a process holding a port
`lsof`/`kill` don't exist on Windows. Pick one:
```powershell
# PowerShell
Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force }
```
```bat
:: Command Prompt
netstat -ano | findstr :4000
taskkill /PID <pid> /F
```

### Things that do NOT apply on Windows
- **`arch -arm64 npm run build`** — that fix is Apple-Silicon/Rosetta only. Skip it.
- macOS `.DS_Store` / `brew` commands — ignore those parts of the guide.
- Apple Silicon/arm64 esbuild mismatch — on Windows you'll have `@esbuild/win32-x64` automatically. (On an ARM64 Windows laptop, run `npm install --force` if esbuild complains.)

### Easiest option: Git Bash
If you install **Git for Windows**, you can run the *original* macOS-style commands (`cp`, `ls`, `grep`) inside **Git Bash** — only `lsof -ti | xargs kill` needs the Windows alternative above.

### Build & production
Identical on every OS:
```powershell
npm run build      # → dist/
npm start          # serves dist/ + API on :4000
```

---

## 12. Handy commands

```bash
# clone + setup (copy/paste)
git clone https://github.com/jeet4747/website-landing-neoskills.git
cd website-landing-neoskills
npm install
cp .env.example .env
cp server/.env.example server/.env

# dev (two terminals)
node server/index.cjs      # terminal 1 — API on :4000
npm run dev                # terminal 2 — site on :5173

# production
npm run build && npm start # site + API on :4000

# ship
git add -A
git commit -m "your message"
git push                   # Render auto-deploys
```

### Project layout

```
├── src/                 # React app (components, pages, config)
│   ├── config/leads.js  # submitLead() — API first, EmailJS fallback
│   ├── config/emailjs.js# EmailJS IDs + reCAPTCHA site key
│   └── components/RecaptchaCheckbox.jsx  # shared reCAPTCHA v2 widget
├── server/
│   ├── index.cjs        # Express API + serves dist/
│   ├── db.cjs           # Postgres (or JSON files if no DATABASE_URL)
│   ├── init-db.cjs      # DB seed script
│   └── .env             # server config (NOT in git)
├── scripts/             # sitemap generator
├── public/              # static assets (robots, sitemap, favicon)
├── dist/                # build output (gitignored)
├── .env                 # Vite config (NOT in git)
├── DEPLOY.md            # Render/Supabase/domain guide
└── SETUP_GUIDE.md       # this file
```
