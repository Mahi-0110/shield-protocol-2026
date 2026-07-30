import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Filter } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const categories = ['All', 'Opening', 'Speakers', 'Workshops', 'Hackathon', 'CTF', 'Awards']

interface GalleryItem {
  id: number
  src?: string
  category: string
  title: string
  span: number
  color?: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 0,
    src: '/gallery/gallery-2.jpg',
    category: 'Opening',
    title: "The Shield Protocol '25 Inauguration & Keynote",
    span: 2,
    color: 'from-blue-900/40',
  },
  {
    id: 1,
    src: '/gallery/gallery-10.jpg',
    category: 'Event Organiser',
    title: 'Keynote Address by Mr.P.Joshua Raju',
    span: 1,
    color: 'from-slate-800/40',
  },
  {
    id: 2,
    src: '/gallery/gallery-6.jpg',
    category: 'Student Delegate',
    title: 'Student Delegate Speaker Presentation',
    span: 1,
    color: 'from-blue-800/40',
  },
  {
    id: 3,
    src: '/gallery/gallery-7.jpg',
    category: 'Workshops',
    title: 'Full Auditorium Workshop & Lab Session',
    span: 2,
    color: 'from-slate-900/40',
  },
  {
    id: 4,
    src: '/gallery/gallery-1.jpg',
    category: 'Hackathon',
    title: 'Team Collaboration & Live Coding',
    span: 1,
    color: 'from-blue-700/40',
  },
  {
    id: 5,
    src: '/gallery/gallery-3.jpg',
    category: 'CTF',
    title: 'Hands-on CTF Challenge Solving',
    span: 1,
    color: 'from-blue-900/40',
  },
  {
    id: 6,
    src: '/gallery/gallery-4.jpg',
    category: 'Workshops',
    title: 'Interactive Cybersecurity Lab Session',
    span: 2,
    color: 'from-slate-800/40',
  },
  {
    id: 7,
    src: '/gallery/gallery-8.jpg',
    category: 'CTF',
    title: 'Focused Cybersecurity Challenge Analysis',
    span: 1,
    color: 'from-blue-800/40',
  },
  {
    id: 8,
    src: '/gallery/gallery-5.jpg',
    category: 'Workshops',
    title: 'Mentorship & Technical Discussion',
    span: 1,
    color: 'from-slate-900/40',
  },
  {
    id: 9,
    src: '/gallery/gallery-9.jpg',
    category: 'Opening',
    title: 'Main Auditorium & Stage Setup',
    span: 2,
    color: 'from-blue-700/40',
  },
  {
    id: 10,
    src: '/gallery/gallery-11.jpg',
    category: 'CTF',
    title: 'Kali Linux, Nmap & Metasploit Lab Environment',
    span: 2,
    color: 'from-blue-900/40',
  },
  {
    id: 11,
    src: '/gallery/gallery-12.jpg',
    category: 'Workshops',
    title: 'Wireshark Network Packet Analysis Session',
    span: 1,
    color: 'from-slate-800/40',
  },
  {
    id: 12,
    src: '/gallery/gallery-13.jpg',
    category: 'Opening',
    title: 'Dignitaries & Chief Guests Panel on Stage',
    span: 2,
    color: 'from-blue-800/40',
  },
  {
    id: 13,
    src: '/gallery/gallery-14.jpg',
    category: 'Speakers',
    title: 'Eat Sleep Hack Repeat — Expert Speaker Address',
    span: 1,
    color: 'from-slate-900/40',
  },
  {
    id: 14,
    src: '/gallery/gallery-15.jpg',
    category: 'Hackathon',
    title: 'Full Auditorium Hackathon & Workshop Workspace',
    span: 2,
    color: 'from-blue-700/40',
  },
  {
    id: 15,
    src: '/gallery/gallery-16.jpg',
    category: 'Workshops',
    title: 'Hands-on Security Team Practice & Learning',
    span: 1,
    color: 'from-slate-800/40',
  },
  {
    id: 16,
    src: '/gallery/gallery-17.jpg',
    category: 'Opening',
    title: "The Shield Protocol '25 Official Podium Banner",
    span: 1,
    color: 'from-blue-900/40',
  },
  {
    id: 17,
    src: '/gallery/gallery-18.jpg',
    category: 'Principal',
    title: 'Event Wall Signing Ceremony',
    span: 1,
    color: 'from-blue-900/40',
  },
  {
    id: 18,
    src: '/gallery/gallery-19.jpg',
    category: 'Awards',
    title: 'Department of Cyber Security Certificate & Felicitation',
    span: 2,
    color: 'from-blue-800/40',
  },
]

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter(g => g.category === filter)

  return (
    <section id="gallery" className="relative py-24 bg-bg-primary overflow-hidden" aria-label="Event gallery">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Gallery" title="Event" highlight="Highlights" subtitle="A visual journey through The Shield Protocol 2025. Real moments captured during keynotes, workshops, CTF battles, and hackathons." />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-space font-semibold transition-all ${filter === cat ? 'bg-blue-primary text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'glass border border-white/10 text-muted hover:text-white'}`} aria-pressed={filter === cat}>
              {cat === 'All' && <Filter size={12} />}{cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className={`relative ${item.span === 2 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'} rounded-xl overflow-hidden cursor-pointer group border border-white/10 glass-card`} onClick={() => setLightbox(item.id)} role="button" tabIndex={0} aria-label={`View ${item.title}`} onKeyDown={(e) => e.key === 'Enter' && setLightbox(item.id)}>
                {item.src ? (
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-slate-900`} />
                    <div className="absolute inset-0 cyber-grid-bg opacity-20" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 p-4 text-center">
                  <ZoomIn size={28} className="text-blue-accent mb-2 drop-shadow-md" />
                  <span className="text-sm font-sora font-semibold text-white mb-1">{item.title}</span>
                  <span className="text-xs text-muted font-space">{item.category}</span>
                </div>
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-xs px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-blue-accent font-space border border-blue-primary/30">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && galleryItems[lightbox] && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Image lightbox">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative max-w-4xl w-full glass-card overflow-hidden p-2 rounded-2xl border border-white/20" onClick={e => e.stopPropagation()}>
                {galleryItems[lightbox].src ? (
                  <img src={galleryItems[lightbox].src} alt={galleryItems[lightbox].title} className="w-full max-h-[75vh] object-contain rounded-xl" />
                ) : (
                  <div className="aspect-video flex items-center justify-center text-6xl font-sora text-blue-primary/30">
                    {galleryItems[lightbox].title}
                  </div>
                )}
                <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-white bg-black/50 hover:bg-black/80 transition-colors z-20" aria-label="Close lightbox">
                  <X size={20} />
                </button>
                <div className="p-4 bg-bg-secondary/80 backdrop-blur-md rounded-b-xl border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-sora font-semibold text-white text-base">{galleryItems[lightbox].title}</div>
                    <div className="text-xs text-muted font-space">The Shield Protocol 2025 • {galleryItems[lightbox].category}</div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-primary/20 text-blue-accent font-space border border-blue-primary/30 self-start sm:self-auto">
                    {galleryItems[lightbox].category}
                  </span>
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
