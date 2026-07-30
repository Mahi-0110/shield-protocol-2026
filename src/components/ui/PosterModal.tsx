import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface PosterModalProps {
  isOpen: boolean
  onClose: () => void
}

const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const handleExplore = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
    const target = document.querySelector('#currentevent') || document.querySelector('#about')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-[4px] cursor-pointer select-none"
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

          {/* Minimal Explore Event Button Positioned in Poster Gap Slot Below 3-Day Workshop & 1-Day Hackathon */}
          <div
            className="absolute z-20"
            style={{
              left: '43.2%',
              bottom: '25.8%',
              transform: 'translate(-50%, 50%)',
            }}
          >
            <button
              onClick={handleExplore}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full bg-[#051329]/95 hover:bg-[#0ea5e9] text-[#38bdf8] hover:text-white border border-[#0ea5e9]/70 hover:border-cyan-400 font-space font-semibold text-[10px] sm:text-xs tracking-wider shadow-[0_0_25px_rgba(14,165,233,0.8)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
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
