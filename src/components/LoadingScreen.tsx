import React, { useEffect, useRef, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

interface Shard {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  angle: number
  vAngle: number
  color: string
  opacity: number
  shape: number // 0: triangle, 1: quad, 2: polygon
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [phase, setPhase] = useState<'idle' | 'swing' | 'shatter' | 'reveal'>('idle')
  const [showShield, setShowShield] = useState(true)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    let animationFrameId: number
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Generate 85 Explosive Metallic Shards from impact center
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const shards: Shard[] = []
    const shardCount = 85
    const colors = [
      '#0EA5E9', '#38BDF8', '#7DD3FC', '#00F0FF',
      '#E2E8F0', '#94A3B8', '#FFFFFF', '#0284C7', '#1E293B'
    ]

    for (let i = 0; i < shardCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 16 + Math.random() * 36 // High-velocity radial explosion
      shards.push({
        x: centerX + (Math.random() - 0.5) * 60,
        y: centerY + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 8 + Math.random() * 26,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        shape: Math.floor(Math.random() * 3),
      })
    }

    const startTime = performance.now()

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000 // elapsed in seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 0.0s - 0.12s: Instant Action - Big Hammer Swing Strike
      if (elapsed < 0.12) {
        setPhase('swing')
      } 
      // 0.12s - 0.45s: One-Hit Instant Shatter
      else if (elapsed >= 0.12 && elapsed < 0.55) {
        if (showShield) {
          setShowShield(false)
          setPhase('shatter')
          setShake(true)
          setTimeout(() => setShake(false), 150)
        }

        const shatterTime = elapsed - 0.12

        // Explosive shockwave ring expansion
        const shockwaveRadius = shatterTime * 2800
        const opacity = Math.max(0, 1 - shatterTime * 3.2)
        
        ctx.save()
        ctx.beginPath()
        ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`
        ctx.lineWidth = 18
        ctx.stroke()
        ctx.restore()

        // High-intensity impact flash (0.12s - 0.22s)
        if (shatterTime < 0.12) {
          ctx.save()
          const flashGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 350)
          flashGlow.addColorStop(0, 'rgba(255, 255, 255, 0.98)')
          flashGlow.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)')
          flashGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.4)')
          flashGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = flashGlow
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.restore()
        }

        // Render Metallic Shards with specular rims
        shards.forEach(shard => {
          shard.x += shard.vx
          shard.y += shard.vy
          shard.angle += shard.vAngle
          shard.opacity = Math.max(0, shard.opacity - 0.035)

          ctx.save()
          ctx.translate(shard.x, shard.y)
          ctx.rotate(shard.angle)
          ctx.globalAlpha = shard.opacity

          ctx.fillStyle = shard.color
          ctx.beginPath()
          if (shard.shape === 0) {
            // Triangle Shard
            ctx.moveTo(0, -shard.size / 2)
            ctx.lineTo(shard.size / 2, shard.size / 2)
            ctx.lineTo(-shard.size / 2, shard.size / 2)
          } else if (shard.shape === 1) {
            // Diamond / Quad Shard
            ctx.moveTo(0, -shard.size / 2)
            ctx.lineTo(shard.size / 3, 0)
            ctx.lineTo(0, shard.size / 2)
            ctx.lineTo(-shard.size / 3, 0)
          } else {
            // Angular Fragment Shard
            ctx.moveTo(-shard.size / 3, -shard.size / 2)
            ctx.lineTo(shard.size / 2, -shard.size / 4)
            ctx.lineTo(shard.size / 3, shard.size / 2)
            ctx.lineTo(-shard.size / 2, shard.size / 3)
          }
          ctx.closePath()
          ctx.fill()

          // Specular Metallic Highlight Edge
          ctx.strokeStyle = '#FFFFFF'
          ctx.lineWidth = 1.2
          ctx.stroke()

          ctx.restore()
        })
      }
      // 0.55s+: Application Reveal (Total entrance sequence < 1.0s)
      else if (elapsed >= 0.55) {
        setPhase('reveal')
        onComplete()
        return
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [onComplete, showShield])

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-200 ${
        phase === 'reveal' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${shake ? 'animate-shake' : ''}`}
    >
      {/* 60fps Canvas for Shatter Particles & Shockwave */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

      {/* Centered Prominent Metallic Security Shield */}
      {showShield && (
        <div className="relative z-10 flex items-center justify-center">
          <img
            src="/metallic-shield.jpg"
            alt="Metallic Security Shield"
            className="w-72 sm:w-96 md:w-[420px] h-auto object-contain shadow-[0_0_120px_rgba(14,165,233,0.7)] transform scale-100"
          />

          {/* Big Metallic Hammer (0.0s Strike at Center) */}
          <div
            className={`absolute z-30 pointer-events-none origin-bottom-right transition-transform ease-in-out ${
              phase === 'swing'
                ? 'translate-x-[-20px] translate-y-[40px] rotate-[15deg] scale-125 opacity-100'
                : 'translate-x-[340px] -translate-y-[340px] rotate-[-75deg] scale-150 opacity-100'
            }`}
            style={{
              top: '-20%',
              right: '20%',
              transitionDuration: '110ms',
              willChange: 'transform',
            }}
          >
            {/* Big 3D Metallic Sledgehammer SVG */}
            <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="big-hammer-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#CBD5E1" />
                  <stop offset="70%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
                <linearGradient id="big-hammer-handle" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
                <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Heavy Handle */}
              <rect x="58" y="25" width="16" height="85" rx="5" transform="rotate(35 58 25)" fill="url(#big-hammer-handle)" stroke="#7DD3FC" strokeWidth="2" filter="url(#cyan-glow)" />
              {/* Heavy Sledgehead */}
              <rect x="10" y="5" width="60" height="34" rx="5" transform="rotate(35 10 5)" fill="url(#big-hammer-metal)" stroke="#F8FAFC" strokeWidth="2.5" />
              {/* Reinforced Strike Surface */}
              <polygon points="4,32 16,18 32,36 20,50" fill="#FFFFFF" stroke="#00F0FF" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      )}

      {/* Screen Shake CSS keyframes inline style */}
      <style>{`
        @keyframes shakeAnimation {
          0% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(-8px, 6px) scale(1.02); }
          40% { transform: translate(8px, -6px) scale(0.98); }
          60% { transform: translate(-6px, -4px) scale(1.01); }
          80% { transform: translate(6px, 4px) scale(1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-shake {
          animation: shakeAnimation 150ms ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen
