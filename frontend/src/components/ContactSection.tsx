import React, { useState } from 'react'
import { Mail, Linkedin, Github, Phone } from 'lucide-react'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'


const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
)

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
      const data = await res.json()
      if (data.success) {
        showToast('success', 'Message sent successfully! 🎉')
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error('Unexpected response')
      }
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

      {/* Footer — Contact Links */}
      <div className="flex justify-center items-center gap-6 mt-20 flex-wrap">
        <a
          href="mailto:kushalgt37@gmail.com"
          className="text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Email"
          title="Email"
        >
          <Mail size={24} />
        </a>
        <a
          href="tel:+919076860157"
          className="text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Phone"
          title="Call +91 90768 60157"
        >
          <Phone size={24} />
        </a>
        <a
          href="https://wa.me/919076860157"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="WhatsApp"
          title="WhatsApp +91 90768 60157"
        >
          <WhatsAppIcon size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/kushalgupta2003/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://github.com/Kushal-Gupta-beep"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D7E2EA] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="GitHub"
          title="GitHub"
        >
          <Github size={24} />
        </a>
      </div>

      {/* Phone number text display */}
      <FadeIn delay={0.5} y={10}>
        <p className="text-center text-[#D7E2EA] opacity-40 mt-4 font-light text-sm tracking-wider">
          +91 90768 60157
        </p>
      </FadeIn>

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
