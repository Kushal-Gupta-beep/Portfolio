# Kushal's Portfolio

A modern, full-stack developer portfolio built with React, TypeScript, and Vite — featuring dynamic project showcases, contact form with email notifications, and real-time analytics.

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Framer Motion, Tailwind CSS, Lucide Icons  
**Backend (Serverless):** Vercel Serverless Functions, Supabase, Resend  
**Deployment:** Vercel

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
# Install frontend dependencies
cd frontend
npm install

# Start frontend dev server (with API proxy to backend)
npm run dev
```

To run the Express backend locally (optional):

```bash
# Install backend dependencies
cd backend
npm install

# Copy and configure environment variables
cp .env.example .env

# Start backend dev server
npm run dev
```

### Environment Variables

Set these in your Vercel dashboard for production:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `ADMIN_SECRET` | Secret token for admin API routes |

## Project Structure

```
├── api/                  # Vercel Serverless Functions
│   ├── _lib/             # Shared utilities (Supabase client, auth)
│   ├── analytics/        # Analytics endpoints
│   ├── contact.ts        # Contact form endpoint
│   ├── projects.ts       # Projects CRUD endpoint
│   └── health.ts         # Health check
├── frontend/             # Vite + React app
│   ├── src/
│   └── ...
├── backend/              # Express server (local dev)
│   ├── src/
│   └── ...
├── vercel.json           # Vercel deployment config
└── README.md
```

## Deployment

Connected to Vercel for automatic deployments on push to `main`.

## License

MIT
