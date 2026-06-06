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
    let dbSaved = false
    if (supabase) {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({ name, email, message })

      if (dbError) {
        console.error('DB error:', dbError.message)
      } else {
        dbSaved = true
      }
    } else {
      console.log('⚠️  Supabase not configured — contact not saved to DB')
    }

    // Send email via Resend
    let emailSent = false
    let emailError: string | null = null

    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)
        const { data: emailData, error: resendError } = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'kushalgt37@gmail.com',
          replyTo: email,
          subject: `New Portfolio Contact from ${name}`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #7621B0; padding-bottom: 10px;">
                📬 New Contact Form Submission
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 80px;">Name:</td>
                  <td style="padding: 8px 12px; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 12px; color: #333;">
                    <a href="mailto:${email}" style="color: #7621B0;">${email}</a>
                  </td>
                </tr>
              </table>
              <div style="background: #f9f9f9; border-left: 4px solid #7621B0; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #999; font-size: 12px;">
                Sent from your portfolio at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
          `,
        })

        if (resendError) {
          console.error('Resend error:', JSON.stringify(resendError))
          emailError = resendError.message || 'Resend delivery failed'
        } else {
          emailSent = true
          console.log('Email sent successfully, id:', emailData?.id)
        }
      } catch (resendErr) {
        console.error('Resend exception:', resendErr)
        emailError = resendErr instanceof Error ? resendErr.message : 'Email sending failed'
      }
    } else {
      console.log('⚠️  RESEND_API_KEY not set in environment variables')
      emailError = 'Email service not configured'
    }

    // Return success if at least the DB save or email worked
    return res.status(200).json({
      success: true,
      dbSaved,
      emailSent,
      emailError,
    })
  } catch (err) {
    console.error('Contact error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
