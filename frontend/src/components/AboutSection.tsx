import React from 'react'
import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

const decorImages = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    className: 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] left-[4%]',
    x: -80,
    delay: 0.1,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    className: 'w-[100px] sm:w-[140px] md:w-[180px] bottom-[8%] left-[10%]',
    x: -80,
    delay: 0.25,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    className: 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] right-[4%]',
    x: 80,
    delay: 0.15,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    className: 'w-[130px] sm:w-[170px] md:w-[220px] bottom-[8%] right-[10%]',
    x: 80,
    delay: 0.3,
  },
]

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen px-5 sm:px-8 md:px-10 py-20 relative bg-[#0C0C0C]
        flex flex-col items-center justify-center"
    >
      {/* Corner decorations */}
      {decorImages.map((img, i) => (
        <FadeIn
          key={i}
          x={img.x}
          y={0}
          delay={img.delay}
          duration={0.9}
          className={`absolute ${img.className} pointer-events-none hidden sm:block`}
        >
          <img src={img.src} alt="" className="w-full" />
        </FadeIn>
      ))}

      {/* Center content */}
      <div className="flex flex-col items-center text-center z-10">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatedText
            text="With a background in Electronics and Instrumentation Engineering from BITS Pilani, I focus on machine learning, full-stack development, and data-driven systems. I enjoy building things that are both technically rigorous and visually sharp. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] mx-auto"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.3} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
