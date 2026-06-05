import type { VercelRequest, VercelResponse } from '@vercel/node'

export function adminAuth(req: VercelRequest, res: VercelResponse): boolean {
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    res.status(500).json({ error: 'Admin auth not configured' })
    return false
  }

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }

  const token = authHeader.slice(7)
  if (token !== adminSecret) {
    res.status(403).json({ error: 'Forbidden' })
    return false
  }

  return true
}
