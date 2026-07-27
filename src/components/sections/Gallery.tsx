import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Filter } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const categories = ['All', 'Opening', 'Workshops', 'Hackathon', 'CTF', 'Speakers', 'Closing']

const galleryItems = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  category: categories[(i % (categories.length - 1)) + 1],
  title: `Event Moment ${i + 1}`,
  span: [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1][i] || 1,
  color: [
    'from-blue-900/40', 'from-slate-800/40', 'from-blue-800/40', 'from-slate-900/40',
    'from-blue-700/40', 'from-slate-700/40',
  ][i % 6],
}))

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter(g => g.category === filter)

  return (
    <section id="gallery" className="relative py-24 bg-bg-primary overflow-hidden" aria-label="Event gallery">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Gallery" title="Event" highlight="Highlights" subtitle="A visual journey through The Shield Protocol 2025. From intense CTF battles to inspiring keynotes." />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-space font-semibold transition-all ${filter === cat ? 'bg-blue-primary text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'glass border border-white/10 text-muted hover:text-white'}`} aria-pressed={filter === cat}>
              {cat === 'All' && <Filter size={12} />}{cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className={`break-inside-avoid mb-4 ${item.span === 2 ? 'aspect-video' : 'aspect-square'} relative rounded-xl overflow-hidden cursor-pointer group`} onClick={() => setLightbox(item.id)} role="button" tabIndex={0} aria-label={`View ${item.title}`} onKeyDown={(e) => e.key === 'Enter' && setLightbox(item.id)}>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-slate-900`} />
                <div className="absolute inset-0 cyber-grid-bg opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <ZoomIn size={24} className="text-white mb-2" />
                  <span className="text-xs text-white font-space">{item.title}</span>
                </div>
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-xs px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-blue-accent font-space">{item.category}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl opacity-10 font-sora font-bold text-blue-primary">{item.id + 1}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Image lightbox">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative max-w-3xl w-full aspect-video glass-card overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className={`absolute inset-0 bg-gradient-to-br ${galleryItems[lightbox]?.color || 'from-blue-900/40'} to-slate-900`} />
                <div className="absolute inset-0 cyber-grid-bg opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center text-8xl font-sora font-bold text-blue-primary/20">{lightbox + 1}</div>
                <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="Close lightbox">
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-space font-semibold text-white">{galleryItems[lightbox]?.title}</div>
                  <div className="text-xs text-muted">{galleryItems[lightbox]?.category}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery
