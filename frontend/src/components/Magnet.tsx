import React, { useRef, useState, useCallback } from 'react'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  strength?: number
  className?: string
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  strength = 3,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)
      const activationZone = Math.max(rect.width, rect.height) / 2 + padding

      if (distance < activationZone) {
        setIsActive(true)
        setPosition({ x: distX / strength, y: distY / strength })
      } else {
        setIsActive(false)
        setPosition({ x: 0, y: 0 })
      }
    },
    [padding, strength]
  )

  const handleMouseLeave = useCallback(() => {
    setIsActive(false)
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive
          ? 'transform 0.3s ease-out'
          : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

export default Magnet
