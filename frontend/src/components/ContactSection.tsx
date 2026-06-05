import React, { useState } from 'react'
import { Mail, Linkedin, Github } from 'lucide-react'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'


const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [sending, setSending] = useState(false)

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      showToast('error', 'Please fill in all fields')
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      showToast('success', 'Message sent!')
      setForm({ name: '', email: '', message: '' })
    } catch {
      showToast('error', 'Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Let&apos;s Talk
        </h2>
      </FadeIn>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-6"
      >
        <FadeIn delay={0.1} y={20}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-transparent border-b-2 border-[#D7E2EA]/40
              text-[#D7E2EA] font-light py-4
              focus:border-[#D7E2EA] transition-colors duration-200
              outline-none placeholder:text-[#D7E2EA]/30"
          />
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent border-b-2 border-[#D7E2EA]/40
              text-[#D7E2EA] font-light py-4
              focus:border-[#D7E2EA] transition-colors duration-200
              outline-none placeholder:text-[#D7E2EA]/30"
          />
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <textarea
            rows={5}
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-transparent border-b-2 border-[#D7E2EA]/40
              text-[#D7E2EA] font-light py-4 resize-none
              focus:border-[#D7E2EA] transition-colors duration-200
              outline-none placeholder:text-[#D7E2EA]/30"
          />
        </FadeIn>

        <FadeIn delay={0.4} y={20} className="mt-4">
          <ContactButton type="submit" />
        </FadeIn>
      </form>

      {/* Footer */}
      <div className="flex justify-center gap-6 mt-20">
        <a
          href="mailto:kushalgt37@gmail.com"
          className="text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Email"
        >
          <Mail size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/kushalgupta2003/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="LinkedIn"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://github.com/Kushal-Gupta-beep"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="GitHub"
        >
          <Github size={24} />
        </a>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </section>
  )
}

export default ContactSection
