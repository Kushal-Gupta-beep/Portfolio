import React, { useEffect } from 'react'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import ExperienceSection from './components/ExperienceSection'

const App: React.FC = () => {
  useEffect(() => {
    // Track page view silently
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {})
  }, [])

  return (
    <main style={{ overflowX: 'clip', background: '#0C0C0C' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}

export default App
