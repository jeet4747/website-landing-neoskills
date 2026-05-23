# Deploy Guide — NeoSkills Platform

## Cost
| Item | Cost |
|------|------|
| Domain (Cloudflare) | ~₹800/year |
| Render hosting | ₹0/month (free tier) |
| Supabase database | ₹0/month (free tier) |
| cron-job.org (keep awake) | ₹0/month |
| **Total** | **~₹800/year** |

## Step 1 — Buy Domain
- Go to **Cloudflare** (cheapest, no markup) or **Hostinger**
- Search and buy your domain (e.g., `neoskills.in`)
- Cloudflare: ~₹800/year. Hostinger: ~₹900-1200/year

## Step 2 — Create Supabase Database (Free)

1. Go to https://supabase.com → Sign up free (Google/GitHub)
2. Click **New Project**
   - Name: `neoskills`
   - Database Password: **Save this somewhere safe**
   - Region: **Singapore** (closest to India)
   - Wait ~2 minutes for it to create
3. Go to **Project Settings → Database → Connection string**
   - Copy the connection string (starts with `postgresql://...`)
   - It looks like: `postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres`

## Step 3 — Deploy to Render (Free)

1. Go to https://render.com → Sign up free (GitHub)
2. Click **New + → Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Name**: `neoskills-api`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server/index.cjs`
   - **Plan**: Free
5. Click **Advanced** → **Add Environment Variable**
   - Add ALL of these:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres
RAZORPAY_KEY_ID=rzp_test_SHuRY29JLienj8
RAZORPAY_KEY_SECRET=Sek9yF1fh4uC7zobNC5vLPlJ
ADMIN_PASSWORD=neoskills2026
ZOHO_EMAIL=your-email@gmail.com
ZOHO_PASSWORD=your-app-password
```

6. Click **Create Web Service**
7. Wait ~3-5 minutes for first deploy
8. Once done, you'll get a URL like `https://neoskills-api.onrender.com`

## Step 4 — Initialize Database

After first deploy succeeds, run this once:

```
https://neoskills-api.onrender.com/api/health
```
(Visit this URL in browser — if it shows `{"status":"ok","db":true}`, the database is connected)

Then you need to seed the data. Use the init script:
- Option A: Run locally: `npm run init-db` (after setting DATABASE_URL in your local .env)
- Option B: Or just visit your admin dashboard at `/admin` and start editing (data will populate as you save)

## Step 5 — Keep It Alive (Free Tier)

Render free tier goes to sleep after 15 min idle.
Go to https://cron-job.org → Sign up free
Create a cron job:
- **URL**: `https://neoskills-api.onrender.com/api/health`
- **Every**: 5 minutes
- This keeps your app awake for ₹0

## Step 6 — Point Domain

1. In Cloudflare → Add your domain → Follow DNS setup instructions
2. In Render dashboard → Your web service → Settings → Custom Domain
3. Add your domain (e.g., `neoskills.in`)
4. Copy the provided `target` URL
5. In Cloudflare → DNS → Add record:
   - Type: **CNAME**
   - Name: `@`
   - Target: `neoskills-api.onrender.com`
   - Proxy: **DNS Only** (grey cloud, not orange)

Wait 5-30 min for DNS to propagate.

## Step 7 — Google Ads

Once domain is live:
1. Go to Google Ads → Create campaign
2. Destination URL: `https://neoskills.in`
3. Since Render free tier + cron-job keeps it alive, ads will work fine

## Running Ads Without Worry

- Render free tier: **100 GB bandwidth/month**
- cron-job pings every 5 min → instant response for visitors
- Supabase free: **500 MB data, 5 GB bandwidth/month** — plenty for your app
- If traffic grows, Render upgrades to $7/month (no sleep, more bandwidth)

## Local Development (after deploy)

The app still works locally with Vite proxy:
```bash
npm run dev          # Frontend on :5173
node server/index.cjs  # Backend on :4000
```

For local DB access, set `DATABASE_URL` in `server/.env` to your Supabase URL.
