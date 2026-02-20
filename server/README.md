# Razorpay Backend (minimal)

This small Express server creates Razorpay orders and verifies signatures. It is intentionally minimal — keep secrets out of source control.

Setup

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
