import React from 'react'
import { motion } from 'framer-motion'

interface ShieldLogoProps {
  size?: number
  animated?: boolean
  className?: string
  glow?: boolean
}

const ShieldLogo: React.FC<ShieldLogoProps> = ({
  size = 60,
  animated = true,
  className = '',
  glow = true,
}) => {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={animated ? { filter: glow ? ['drop-shadow(0 0 8px #0EA5E9)', 'drop-shadow(0 0 20px #38BDF8)', 'drop-shadow(0 0 8px #0EA5E9)'] : undefined } : undefined}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Shield Protocol Logo"
        role="img"
      >
        <defs>
          <linearGradient id="shieldGradMain" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="shieldGradInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101820" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <filter id="shieldGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="innerGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer shield */}
        <path
          d="M50 5L8 22V56C8 78 26 98 50 115C74 98 92 78 92 56V22L50 5Z"
          fill="url(#shieldGradMain)"
          filter="url(#shieldGlow)"
        />

        {/* Inner shield background */}
        <path
          d="M50 12L15 27V56C15 74 30 92 50 106C70 92 85 74 85 56V27L50 12Z"
          fill="url(#shieldGradInner)"
        />

        {/* Inner shield border */}
        <path
          d="M50 12L15 27V56C15 74 30 92 50 106C70 92 85 74 85 56V27L50 12Z"
          fill="none"
          stroke="rgba(14,165,233,0.3)"
          strokeWidth="1"
        />

        {/* Circuit lines */}
        <line x1="50" y1="35" x2="50" y2="55" stroke="#0EA5E9" strokeWidth="1.5" opacity="0.4" />
        <line x1="35" y1="50" x2="65" y2="50" stroke="#0EA5E9" strokeWidth="1.5" opacity="0.4" />
        <circle cx="50" cy="50" r="3" fill="#0EA5E9" opacity="0.3" />

        {/* Center checkmark / lock */}
        <path
          d="M35 52L44 62L65 40"
          stroke="url(#shieldGradMain)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#innerGlow)"
        />

        {/* Corner dots */}
        <circle cx="25" cy="35" r="2" fill="#38BDF8" opacity="0.5" />
        <circle cx="75" cy="35" r="2" fill="#38BDF8" opacity="0.5" />
        <circle cx="25" cy="65" r="2" fill="#38BDF8" opacity="0.3" />
        <circle cx="75" cy="65" r="2" fill="#38BDF8" opacity="0.3" />

        {/* Top highlight */}
        <path
          d="M50 12L15 27"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M50 12L85 27"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}

export default ShieldLogo
