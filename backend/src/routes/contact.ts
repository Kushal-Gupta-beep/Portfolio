import { Router, Request, Response } from 'express'
import { Resend } from 'resend'
import { supabase } from '../db/supabase.js'

const router = Router()

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body

    // Validate
    if (!name || !email || !message) {
      res.status(400).json({ error: 'All fields are required' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' })
      return
    }

    // Save to Supabase
    if (supabase) {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({ name, email, message })

      if (dbError) {
        console.error('DB error:', dbError.message)
      }
    } else {
      console.log('⚠️  Supabase not configured — contact not saved to DB')
      console.log('Contact submission:', { name, email, message })
    }

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: 'kushalgt37@gmail.com',
        subject: `New Portfolio Contact from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr />
          <p><small>Sent at ${new Date().toISOString()}</small></p>
        `,
      })
    } else {
      console.log('⚠️  Resend API key not set — email not sent')
    }

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
