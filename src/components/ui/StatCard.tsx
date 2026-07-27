import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

interface StatCardProps {
  value: number
  suffix?: string
  label: string
  icon?: React.ReactNode
  delay?: number
  className?: string
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix = '+',
  label,
  icon,
  delay = 0,
  className = '',
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`glass-card p-6 text-center group ${className}`}
    >
      {icon && (
        <div className="flex justify-center mb-3 text-blue-primary group-hover:text-blue-accent transition-colors">
          {icon}
        </div>
      )}
      <div className="font-sora font-bold text-3xl md:text-4xl text-white mb-1">
        {inView ? (
          <CountUp end={value} duration={2.5} delay={0.2} separator="," />
        ) : (
          '0'
        )}
        <span className="gradient-text">{suffix}</span>
      </div>
      <div className="text-muted text-sm font-space font-medium uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}

export default StatCard
