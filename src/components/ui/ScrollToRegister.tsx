import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

const ScrollToRegister: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [isNearRegister, setIsNearRegister] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const regElement = document.getElementById('register')

      // Show floating widget after scrolling past hero section (300px)
      const isPastHero = scrollY > 300

      if (regElement) {
        const rect = regElement.getBoundingClientRect()
        // Check if register section is near or in view
        const near = rect.top <= window.innerHeight * 0.85
        setIsNearRegister(near)
      }

      if (isPastHero) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = () => {
    const regElement = document.getElementById('register')
    if (regElement) {
      regElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.8 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
          className={`fixed right-6 z-40 transition-all duration-500 pointer-events-none select-none ${
            isNearRegister ? 'bottom-28 opacity-90 scale-95' : 'bottom-8 opacity-100'
          }`}
        >
          <div
            className="relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-bg-primary/90 backdrop-blur-xl border border-blue-primary/40 text-white shadow-[0_0_30px_rgba(14,165,233,0.35)] overflow-hidden"
          >
            {/* Background glowing ambient light */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-primary/20 via-blue-accent/15 to-transparent opacity-70" />
            <span className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-primary/50 via-cyan-400/50 to-blue-accent/50 blur-sm opacity-50" />

            {/* Icon & Label */}
            <div className="relative z-10 flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-blue-primary/20 text-blue-accent">
                <Sparkles size={14} className="animate-pulse" />
              </span>

              <div className="text-left font-space leading-none">
                <div className="text-[10px] text-muted tracking-wider uppercase">Scroll Down</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  Scroll to <span className="gradient-text">Pay & Register</span>
                </div>
              </div>

              {/* Bouncing Arrow Mark */}
              <span className="ml-1 p-2 rounded-xl bg-blue-accent/10 text-blue-accent border border-blue-accent/30">
                <ArrowDown size={16} className="animate-bounce" />
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToRegister
