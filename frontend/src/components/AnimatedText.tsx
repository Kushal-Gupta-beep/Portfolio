import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={containerRef} className={`relative ${className}`} style={style}>
      {/* Invisible placeholder for layout */}
      <span className="invisible">{text}</span>
      {/* Animated characters */}
      <span className="absolute inset-0" style={{ whiteSpace: 'pre-wrap' }}>
        {chars.map((char, i) => (
          <AnimatedChar
            key={i}
            char={char}
            index={i}
            total={chars.length}
            progress={scrollYProgress}
          />
        ))}
      </span>
    </p>
  )
}

interface AnimatedCharProps {
  char: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}

const AnimatedChar: React.FC<AnimatedCharProps> = ({
  char,
  index,
  total,
  progress,
}) => {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  )
}

export default AnimatedText
