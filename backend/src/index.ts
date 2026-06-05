import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contact.js'
import projectRoutes from './routes/projects.js'
import analyticsRoutes from './routes/analytics.js'
import { seedProjects } from './db/supabase.js'

dotenv.config()

const app = express()
const PORT = parseInt(process.env.PORT || '3001', 10)

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/analytics', analyticsRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  await seedProjects()
})
