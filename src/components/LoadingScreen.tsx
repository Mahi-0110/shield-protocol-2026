import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShieldLogo from './ui/ShieldLogo'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing...')
  const [scanLine, setScanLine] = useState(0)

  const statusMessages = [
    'Initializing security protocols...',
    'Loading encryption modules...',
    'Establishing secure connection...',
    'Validating certificates...',
    'Deploying firewall...',
    'System ready.',
  ]

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 12 + 3
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => onComplete(), 600)
      }
      setProgress(Math.min(p, 100))
      const idx = Math.floor((p / 100) * (statusMessages.length - 1))
      setStatus(statusMessages[idx])
    }, 120)

    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100)
    }, 30)

    return () => {
      clearInterval(interval)
      clearInterval(scanInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-primary overflow-hidden"
        aria-label="Loading screen"
        role="status"
      >
        {/* Cyber grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12)_0%,transparent_70%)]" />

        {/* Animated scan line */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-primary to-transparent opacity-60"
          animate={{ y: ['0vh', '100vh'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Binary rain (decorative) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 text-blue-primary/20 text-xs font-mono pointer-events-none select-none"
            style={{ left: `${10 + i * 12}%` }}
            animate={{ y: ['-100px', '110vh'] }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
            ))}
          </motion.div>
        ))}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Rotating ring around logo */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full border border-blue-primary/30"
              style={{ width: 140, height: 140, margin: '-20px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-accent rounded-full" />
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full border border-blue-accent/20"
              style={{ width: 160, height: 160, margin: '-30px' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-primary rounded-full" />
            </motion.div>

            {/* Pulse rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-blue-primary/20"
                style={{
                  width: 80 + i * 40,
                  height: 80 + i * 40,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}

            <ShieldLogo size={100} animated glow />
          </div>

          {/* Event name */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="section-badge mb-2"
            >
              THE SHIELD PROTOCOL
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-sora text-4xl font-bold gradient-text"
            >
              2026
            </motion.div>
          </div>

          {/* Progress section */}
          <div className="w-72">
            {/* Progress bar */}
            <div className="relative h-1 bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-primary to-blue-accent rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
              <motion.div
                className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ left: `${progress - 4}%` }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </div>

            {/* Percentage + status */}
            <div className="flex items-center justify-between text-xs font-space">
              <span className="text-muted">{status}</span>
              <span className="text-blue-accent font-semibold">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-primary/40" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-blue-primary/40" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-primary/40" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-primary/40" />
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 text-xs text-muted font-space tracking-widest uppercase"
        >
          Protect • Build • Innovate • Secure
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingScreen
