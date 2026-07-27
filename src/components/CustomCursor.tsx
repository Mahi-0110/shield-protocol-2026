import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    if ('ontouchstart' in window) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const hoverable = target.closest('button, a, [role="button"], input, select, textarea')
      setHovering(!!hoverable)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousemove', checkHover)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Only render on non-touch, non-mobile
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        animate={{
          x: pos.x - (hovering ? 12 : 6),
          y: pos.y - (hovering ? 12 : 6),
          width: hovering ? 24 : 12,
          height: hovering ? 24 : 12,
          backgroundColor: hovering ? 'rgba(14,165,233,0.2)' : 'rgba(14,165,233,0.8)',
          borderWidth: hovering ? 1.5 : 0,
          borderColor: '#38BDF8',
          scale: clicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.5 }}
        style={{ borderStyle: 'solid' }}
        aria-hidden="true"
      />
      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] w-6 h-6 rounded-full"
        animate={{
          x: pos.x - 12,
          y: pos.y - 12,
          opacity: 0.15,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
        style={{ background: 'radial-gradient(circle, #0EA5E9, transparent)' }}
        aria-hidden="true"
      />
    </>
  )
}

export default CustomCursor
