import React, { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #0EA5E9, #38BDF8, #7DD3FC)',
        boxShadow: '0 0 8px rgba(14,165,233,0.6)',
      }}
      aria-hidden="true"
    />
  )
}

export default ScrollProgress
