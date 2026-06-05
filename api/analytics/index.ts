import type { VercelRequest, VercelResponse } from '@vercel/node'
import { supabase } from '../_lib/supabase'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (_req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (_req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!supabase) {
      return res.json({ totalVisits: 0, uniqueVisitors: 0, pageViews: [] })
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

    return res.json({
      totalVisits: totalVisits || 0,
      uniqueVisitors,
      pageViews,
    })
  } catch (err) {
    console.error('Analytics error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
