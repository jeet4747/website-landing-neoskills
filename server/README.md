# Razorpay Backend (minimal)

This small Express server creates Razorpay orders and verifies signatures. It is intentionally minimal — keep secrets out of source control.

## Local Setup

1. Install dependencies

```bash
cd server
npm install
```

2. Create `.env` by copying `.env.example` and adding your keys

```bash
cp .env.example .env
# edit .env and set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
```

3. Start server

```bash
npm start
```

By default the server runs on port `4000` and exposes:

- `POST /api/create-order` — body `{ amount: <rupees> }` returns `{ order, key }`
- `POST /api/verify-payment` — verifies the payment signature

Ensure your frontend calls the server (CORS is enabled for development). Do not commit your `.env` containing secrets.

## Deploy to Railway

1. Push the `server/` folder to a **separate GitHub repo** (or use the root repo and Railway will detect the start command).

2. Create a new project on [Railway](https://railway.app) and connect your GitHub repo (or use the Railway CLI).

3. Set the following **environment variables** in Railway dashboard:
   - `RAZORPAY_KEY_ID` — your Razorpay test/live key ID
   - `RAZORPAY_KEY_SECRET` — your Razorpay test/live key secret
   - `ZOHO_EMAIL` — (optional) for payment confirmation emails
   - `ZOHO_PASSWORD` — (optional) for payment confirmation emails

4. Railway will auto-detect the Node.js app and run `npm start`. The server listens on `process.env.PORT` (Railway sets this automatically).

5. Once deployed, Railway gives you a URL like `https://your-app.up.railway.app`. Set this as `VITE_BACKEND_URL` in your **frontend** env vars (Vercel dashboard → your project → Environment Variables).

### Notes
- `railway.json` is already configured — no additional config needed.
- The `/api/courses` (admin) endpoint uses a local JSON file, which is **not persisted** across Railway restarts. For production, consider adding a database.
