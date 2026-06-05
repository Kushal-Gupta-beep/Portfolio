import { Request, Response, NextFunction } from 'express'

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    res.status(500).json({ error: 'Admin auth not configured' })
    return
  }

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.slice(7)
  if (token !== adminSecret) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  next()
}
