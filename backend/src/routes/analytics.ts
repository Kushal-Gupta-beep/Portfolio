import { Router, Request, Response } from 'express'
import { createHash } from 'crypto'
import { supabase } from '../db/supabase.js'

const router = Router()

// POST track page view
router.post('/track', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, referrer, userAgent } = req.body
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
    const ipString = Array.isArray(ip) ? ip[0] : ip
    const ipHash = createHash('sha256').update(ipString).digest('hex')

    if (supabase) {
      const { error } = await supabase
        .from('page_views')
        .insert({
          page: page || '/',
          referrer: referrer || '',
          user_agent: userAgent || '',
          ip_hash: ipHash,
        })

      if (error) {
        console.error('Analytics track error:', error.message)
      }
    } else {
      console.log('📊 Page view (no DB):', { page, referrer, ipHash: ipHash.slice(0, 8) })
    }

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Track error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET analytics (last 30 days)
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    if (!supabase) {
      res.json({ totalVisits: 0, uniqueVisitors: 0, pageViews: [] })
      return
    }

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const since = thirtyDaysAgo.toISOString()

    // Get total visits
    const { count: totalVisits } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', since)

    // Get all views for unique visitors count
    const { data: allViews } = await supabase
      .from('page_views')
      .select('ip_hash, created_at')
      .gte('created_at', since)

    const uniqueVisitors = allViews
      ? new Set(allViews.map((v) => v.ip_hash)).size
      : 0

    // Get daily page views
    const dailyCounts: Record<string, number> = {}
    if (allViews) {
      for (const view of allViews) {
        const date = view.created_at.slice(0, 10)
        dailyCounts[date] = (dailyCounts[date] || 0) + 1
      }
    }

    const pageViews = Object.entries(dailyCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    res.json({
      totalVisits: totalVisits || 0,
      uniqueVisitors,
      pageViews,
    })
  } catch (err) {
    console.error('Analytics error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
