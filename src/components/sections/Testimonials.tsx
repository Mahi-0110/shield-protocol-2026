import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const testimonials = [
  { name: 'Arjun Krishnamurthy', role: 'CS Student', college: 'NIT Trichy', content: 'Shield Protocol was a game-changer. The CTF challenges were brutally realistic and the workshops gave me skills I use every day. The community here is incredible — made connections that led to my first internship.', rating: 5, category: 'student', initials: 'AK' },
  { name: 'Divya Ramesh', role: 'Hackathon Winner', college: 'BITS Pilani', content: 'Our team built an AI threat detection system in 36 hours. The mentors were top-notch and the problem statements were actually used by real companies. We won ₹25k and three internship offers. Unreal experience.', rating: 5, category: 'winner', initials: 'DR' },
  { name: 'Prof. Suresh Babu', role: 'HOD, Computer Science', college: 'VIT Chennai', content: 'As a faculty member, I was impressed by the quality of industry interaction. The panel discussions were at par with national conferences. Our students came back with a completely different perspective on cybersecurity careers.', rating: 5, category: 'faculty', initials: 'SB' },
  { name: 'Keerthi Nair', role: 'Security Engineer', college: 'Flipkart', content: 'I was invited as a mentor and was blown away by the talent in these student teams. Shield Protocol is producing the next generation of security professionals. I hired two interns directly from the event.', rating: 5, category: 'industry', initials: 'KN' },
  { name: 'Rahul Sharma', role: 'IT Student', college: 'SRM University', content: 'I joined with zero CTF experience. After the beginner workshop on Day 1, I solved 8 challenges in the competition. The learning curve here is vertical — in the best possible way. Attending again this year!', rating: 5, category: 'student', initials: 'RS' },
  { name: 'Anjali Patel', role: 'Cloud Security Architect', college: 'AWS India', content: 'The depth of technical content surprised me. Students were asking questions that even senior professionals struggle with. Shield Protocol is building a remarkable cybersecurity community.', rating: 5, category: 'industry', initials: 'AP' },
]

const categoryColors: Record<string, string> = {
  student: 'text-blue-accent bg-blue-accent/10 border-blue-accent/20',
  winner: 'text-warning bg-warning/10 border-warning/20',
  faculty: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  industry: 'text-success bg-success/10 border-success/20',
}

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [filter, setFilter] = useState<string | null>(null)
  const [autoplay, setAutoplay] = useState(true)

  const filtered = filter ? testimonials.filter(t => t.category === filter) : testimonials

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => setCurrent(c => (c + 1) % filtered.length), 4000)
    return () => clearInterval(id)
  }, [autoplay, filtered.length])

  useEffect(() => { setCurrent(0) }, [filter])

  return (
    <section id="testimonials" className="relative py-24 bg-bg-secondary overflow-hidden" aria-label="Testimonials">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Testimonials" title="What People" highlight="Say" subtitle="Hear from students, faculty, and industry experts who've experienced The Shield Protocol." />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 mb-12">
          {[null, 'student', 'faculty', 'industry', 'winner'].map(cat => (
            <button key={cat || 'all'} onClick={() => { setFilter(cat); setAutoplay(false) }} className={`px-4 py-2 rounded-full text-xs font-space font-semibold transition-all capitalize ${filter === cat ? 'bg-blue-primary text-white' : 'glass border border-white/10 text-muted hover:text-white'}`} aria-pressed={filter === cat}>
              {cat || 'All'}
            </button>
          ))}
        </div>

        {/* Featured testimonial */}
        <div className="relative mb-8">
          <AnimatePresence mode="wait">
            {filtered[current] && (
              <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-card p-8 md:p-12 max-w-3xl mx-auto text-center relative overflow-hidden">
                <Quote size={60} className="absolute top-6 right-6 text-blue-primary/10" />
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-primary/30 to-transparent flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-blue-accent font-sora border border-blue-primary/20">
                  {filtered[current].initials}
                </div>
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: filtered[current].rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-warning fill-current" />
                  ))}
                </div>
                <blockquote className="text-white text-lg leading-relaxed mb-6 font-outfit italic">"{filtered[current].content}"</blockquote>
                <div className="font-sora font-bold text-white mb-1">{filtered[current].name}</div>
                <div className="text-blue-accent text-sm font-space">{filtered[current].role}</div>
                {filtered[current].college && <div className="text-muted text-xs mt-1">{filtered[current].college}</div>}
                <div className="mt-4">
                  <span className={`text-xs px-3 py-1 rounded-full border capitalize font-space ${categoryColors[filtered[current].category]}`}>
                    {filtered[current].category}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => { setCurrent(c => (c - 1 + filtered.length) % filtered.length); setAutoplay(false) }} className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="Previous testimonial">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {filtered.map((_, i) => (
                <button key={i} onClick={() => { setCurrent(i); setAutoplay(false) }} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-blue-primary w-6' : 'bg-white/20'}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => { setCurrent(c => (c + 1) % filtered.length); setAutoplay(false) }} className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="Next testimonial">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Grid of testimonials */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-5 text-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-primary/20 to-transparent flex items-center justify-center text-sm font-bold text-blue-accent font-sora border border-blue-primary/10">{t.initials}</div>
                <div>
                  <div className="font-space font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
              <p className="text-muted text-xs leading-relaxed line-clamp-3">"{t.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
