import { motion, type HTMLMotionProps } from 'framer-motion'
import React from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}

const FadeIn: React.FC<FadeInProps & Omit<HTMLMotionProps<'div'>, keyof FadeInProps>> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
