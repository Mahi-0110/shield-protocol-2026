import React from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <div className="h-px w-8 bg-blue-primary" />
          <span className="section-badge">{badge}</span>
          <div className="h-px w-8 bg-blue-primary" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="section-title text-3xl md:text-4xl lg:text-5xl text-white mb-4"
      >
        {title}{' '}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`neon-line mt-6 ${centered ? 'mx-auto w-24' : 'w-24'}`}
      />
    </div>
  )
}

export default SectionHeader
