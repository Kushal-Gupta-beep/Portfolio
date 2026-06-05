import React, { useRef, useEffect, useState } from 'react'

const allImages = [
  'https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif',
  'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHE0Zm45cDk5YmxmMHprYmNwdmtpajVwbm0zbzJrbmJ3NWJ6aGdoayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fRgwpuil2wHww7OXjT/giphy.gif',
  'https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif',
  'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
  'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExejg5YmhjajQ4czI2MXU1cW5leWs4em5kcnZiNDA3cWYwbndnMW5zNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12W5Sg2koWYnwA/giphy.gif',
  'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
  'https://media.giphy.com/media/xT9IgG6NQRFBYkqALK/giphy.gif',
  'https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif',
  'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3hhMmdvOWxkN3o5czlnNmt5aXkzcjA2bHh1ejgybHRrbWpndm0yOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12W5Sg2koWYnwA/giphy.gif',
  'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGpsY3FnaWkxbWRsNXhnM3ZxYWM4bXhwcGM0Z3QybHFvOHIyaXgxMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9WC8WTZsFxkRi/giphy.gif',
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjFjdXNld28zZGFxY3Z5N2l6MTJ2eXBod3UzamMzanRiMHJzcmhwcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/doXBzUFJRxpaUbuaqz/giphy.gif',
  'https://media.giphy.com/media/xT9IgG6NQRFBYkqALK/giphy.gif',
  'https://media.giphy.com/media/3oKIPrc2ngFZ6BTyww/giphy.gif',
  'https://media.giphy.com/media/l46Cx9GTWGR9XEmco/giphy.gif',
  'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
  'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
  'https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif',
]

const row1Images = allImages.slice(0, 11)
const row2Images = allImages.slice(11)

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(raw)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tripled1 = [...row1Images, ...row1Images, ...row1Images]
  const tripled2 = [...row2Images, ...row2Images, ...row2Images]

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      {/* Row 1 — moves RIGHT */}
      <div className="flex gap-3 mb-3" style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}>
        {tripled1.map((src, i) => (
          <img
            key={`r1-${i}`}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{ width: '420px', height: '270px' }}
          />
        ))}
      </div>

      {/* Row 2 — moves LEFT */}
      <div className="flex gap-3" style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}>
        {tripled2.map((src, i) => (
          <img
            key={`r2-${i}`}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{ width: '420px', height: '270px' }}
          />
        ))}
      </div>
    </section>
  )
}

export default MarqueeSection
