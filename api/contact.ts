import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { supabase } from './_lib/supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body

    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
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

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
