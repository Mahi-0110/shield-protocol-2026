import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PosterModalProps {
  isOpen: boolean
  onClose: () => void
}

const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const handleClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-transparent cursor-pointer select-none"
        onClick={handleClick}
        role="dialog"
        aria-modal="true"
        aria-label="Event Poster"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-[92vw] sm:max-w-5xl max-h-[85vh] sm:max-h-[90vh] flex items-center justify-center overflow-hidden rounded-xl bg-transparent cursor-pointer"
        >
          {/* Responsive HD Poster Image (Mobile vs Desktop) */}
          <picture className="w-full h-auto flex items-center justify-center">
            <source media="(max-width: 639px)" srcSet="/event-poster-mobile.png" />
            <source media="(min-width: 640px)" srcSet="/event-poster.png" />
            <img
              src="/event-poster.png"
              alt="The Shield Protocol 2026 Poster"
              className="w-full h-auto max-h-[85vh] sm:max-h-[90vh] object-contain rounded-xl block drop-shadow-2xl"
            />
          </picture>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default PosterModal
