import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHash } from 'crypto'
import { supabase } from '../_lib/supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { page, referrer, userAgent } = req.body
    const ip = req.headers['x-forwarded-for'] || 'unknown'
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

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Track error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
