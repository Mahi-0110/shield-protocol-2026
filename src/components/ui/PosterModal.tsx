import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface PosterModalProps {
  isOpen: boolean
  onClose: () => void
}

const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/30 backdrop-blur-[3px] cursor-pointer select-none"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Event Poster"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative inline-block max-w-5xl max-h-[92vh] overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.85)] group"
        >
          {/* High Resolution HD Poster Image */}
          <img
            src="/event-poster.png"
            alt="The Shield Protocol 2026 Poster"
            className="w-full h-auto max-h-[85vh] object-contain rounded-xl block shadow-2xl"
          />

          {/* Minimal Explore Event Button Positioned in Poster Gap Slot */}
          <div
            className="absolute z-20"
            style={{
              left: '41.2%',
              bottom: '24.5%',
              transform: 'translate(-50%, 50%)',
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-[#051329]/90 hover:bg-blue-primary text-[#38bdf8] hover:text-white border border-[#0ea5e9]/60 hover:border-blue-primary font-space font-semibold text-[10px] sm:text-xs tracking-wider shadow-[0_0_20px_rgba(14,165,233,0.7)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Explore Event</span>
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default PosterModal
