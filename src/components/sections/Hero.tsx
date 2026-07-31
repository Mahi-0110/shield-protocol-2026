import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Zap, Shield } from 'lucide-react'
import GlowButton from '../ui/GlowButton'
import ShieldLogo from '../ui/ShieldLogo'
import StatCard from '../ui/StatCard'
import { randomBetween } from '../../lib/utils'

// Countdown timer
const TARGET_DATE = new Date('2026-08-11T09:00:00')

function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = TARGET_DATE.getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

// Particle component
const Particles: React.FC = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    size: randomBetween(1, 3),
    duration: randomBetween(10, 25),
    delay: randomBetween(0, 15),
    drift: randomBetween(-30, 30),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-primary"
          style={{
            left: `${p.x}%`,
            bottom: '-4px',
            width: p.size,
            height: p.size,
            opacity: 0,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, p.drift],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// Animated circuit lines
const CircuitLines: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      {/* Horizontal lines */}
      {[150, 300, 450, 600, 750].map((y, i) => (
        <motion.line
          key={`h${i}`}
          x1="0" y1={y} x2="1440" y2={y}
          stroke="rgba(14,165,233,0.06)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: i * 0.4 }}
        />
      ))}
      {/* Vertical lines */}
      {[200, 400, 600, 800, 1000, 1200].map((x, i) => (
        <motion.line
          key={`v${i}`}
          x1={x} y1="0" x2={x} y2="900"
          stroke="rgba(14,165,233,0.04)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: i * 0.3 }}
        />
      ))}
      {/* Circuit path */}
      <motion.path
        d="M0 450 L200 450 L200 300 L400 300 L400 450 L700 450 L700 200 L1000 200 L1000 450 L1440 450"
        stroke="rgba(14,165,233,0.12)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="8 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5, delay: 0.5, ease: 'easeInOut' }}
      />
      {/* Nodes */}
      {[
        { x: 200, y: 300 }, { x: 400, y: 450 }, { x: 700, y: 200 }, { x: 1000, y: 450 }
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x} cy={node.y} r="4"
          fill="#0EA5E9"
          opacity="0"
          animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
          transition={{ duration: 2, delay: 2 + i * 0.5, repeat: Infinity }}
        />
      ))}
    </svg>
  </div>
)

// Moving light beams
const LightBeams: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-blue-primary/30 to-transparent"
        style={{ width: '60%', top: `${25 + i * 25}%`, left: '-60%' }}
        animate={{ left: ['−60%', '160%'] }}
        transition={{
          duration: 4 + i,
          delay: i * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 3,
        }}
      />
    ))}
  </div>
)

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="glass-card w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mb-1.5 sm:mb-2 border border-blue-primary/20">
      <motion.span
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="font-sora font-bold text-lg sm:text-2xl md:text-3xl text-white"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
    </div>
    <span className="text-muted text-[10px] sm:text-xs font-space uppercase tracking-wider">{label}</span>
  </div>
)

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const countdown = useCountdown()

  // Mouse glow interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Canvas binary rain
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cols = Math.floor(canvas.width / 20)
    const drops = Array(cols).fill(0)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

    const draw = () => {
      ctx.fillStyle = 'rgba(5,5,5,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = '12px monospace'
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const alpha = Math.random() * 0.15 + 0.03
        ctx.fillStyle = `rgba(14,165,233,${alpha})`
        ctx.fillText(char, i * 20, y * 20)
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0
        else drops[i] += 0.5
      })
    }

    const id = setInterval(draw, 60)
    return () => {
      clearInterval(id)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollToExplore = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
      aria-label="Hero section"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
        aria-hidden="true"
      />

      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20" aria-hidden="true" />

      {/* Circuit lines */}
      <CircuitLines />

      {/* Light beams */}
      <LightBeams />

      {/* Particles */}
      <Particles />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,165,233,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Mouse glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)',
        }}
        animate={{
          x: mouseRef.current.x - 192,
          y: mouseRef.current.y - 192,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-primary/20 mb-6 sm:mb-8"
        >
          <Zap size={13} className="text-blue-accent shrink-0" />
          <span className="text-[10px] sm:text-xs font-space font-semibold text-blue-accent tracking-wider sm:tracking-widest uppercase">
            Flagship Cybersecurity Event 2026
          </span>
        </motion.div>

        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <ShieldLogo size={96} animated glow className="mx-auto mb-4 sm:mb-6 sm:w-[120px] sm:h-[120px]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sora font-bold tracking-tight mb-4 px-2"
        >
          <span className="block text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight sm:leading-none">
            THE SHIELD
          </span>
          <span className="block text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text leading-tight sm:leading-none">
            PROTOCOL 2026
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="neon-line w-32 sm:w-48 mx-auto mb-6 sm:mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-muted text-sm sm:text-base md:text-xl max-w-3xl leading-relaxed mb-4 px-3 sm:px-0"
        >
          The flagship cybersecurity and innovation event of the college — where students,
          developers, ethical hackers, AI enthusiasts, and industry experts converge to
          <span className="text-blue-accent"> protect, build, innovate, and secure</span> the digital future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-space text-muted mb-8 sm:mb-10 flex-wrap justify-center px-2"
        >
          {['August 11-13 & 14 2026', 'Bits Vizag Campus'].map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-blue-primary/40">•</span>}
              {item}
            </span>
          ))}
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-[10px] sm:text-xs font-space text-muted uppercase tracking-widest mb-4 sm:mb-6">
            Event begins in
          </p>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="text-blue-primary text-base sm:text-2xl font-bold pb-4 sm:pb-6">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="text-blue-primary text-base sm:text-2xl font-bold pb-4 sm:pb-6">:</span>
            <CountdownUnit value={countdown.minutes} label="Minutes" />
            <span className="text-blue-primary text-base sm:text-2xl font-bold pb-4 sm:pb-6">:</span>
            <CountdownUnit value={countdown.seconds} label="Seconds" />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
        >
          {[
            { value: 200, suffix: '', label: 'Student Delegates' },
            { value: 50, label: 'Teams' },
            { value: 10, suffix: '+', label: 'Sessions' },
            { value: 9, suffix: 'Hrs', label: 'Hackathon' },
          ].map((stat, i) => (
            <StatCard key={i} {...stat} delay={1.1 + i * 0.1} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-blue-accent transition-colors"
        aria-label="Scroll to explore"
      >
        <span className="text-xs font-space uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </motion.button>
    </section>
  )
}

export default Hero
