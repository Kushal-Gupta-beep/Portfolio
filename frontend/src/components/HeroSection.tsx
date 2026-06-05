import React from 'react'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import Magnet from './Magnet'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const HeroSection: React.FC = () => {
  return (
    <section className="h-screen flex flex-col relative" style={{ overflowX: 'clip' }}>
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider
                text-sm md:text-lg lg:text-[1.4rem]
                hover:opacity-70 transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero heading */}
      <FadeIn delay={0.15} y={40} className="overflow-hidden z-0 mt-8 sm:mt-12 md:mt-16 w-full flex justify-center">
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-none
            whitespace-nowrap text-center
            text-[9vw] sm:text-[10vw] md:text-[11vw] lg:text-[12vw]"
        >
          Hi, i&apos;m kushal
        </h1>
      </FadeIn>

      {/* Spacer to push bottom content down */}
      <div className="flex-1" />

      {/* Bottom bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
              max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            an engineer driven by building intelligent systems and impactful digital experiences
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Hero Portrait */}
      <div className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 z-10 w-[280px] sm:w-[380px] md:w-[460px] lg:w-[540px] pointer-events-auto">
        <FadeIn delay={0.6} y={40} className="w-full flex justify-center">
          <Magnet padding={80} strength={4}>
            <img
              src="https://i.imgur.com/WL7zNzr.png"
              alt="Kushal Gupta"
              className="w-full h-auto max-h-[65vh] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  )
}

export default HeroSection
