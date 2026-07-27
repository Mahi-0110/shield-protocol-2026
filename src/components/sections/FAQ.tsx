import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const faqs = [
  { q: 'Who can register for The Shield Protocol 2026?', a: 'The event is open to all undergraduate and postgraduate students from any college or university. No prior cybersecurity experience is required for workshops and talks, but CTF and Hackathon participants should have basic programming knowledge.' },
  { q: 'Is there any registration fee?', a: 'No! The Shield Protocol 2026 is completely free for all registered participants. This includes access to all workshops, talks, competitions, meals, and certificates.' },
  { q: 'Can I participate individually or do I need a team?', a: 'Both! You can register as an individual for talks and workshops. For the Hackathon and CTF, you can either participate solo or form a team of 2–4 members.' },
  { q: 'What is the difference between CTF and Hackathon?', a: 'CTF (Capture The Flag) is a cybersecurity competition where you solve challenges in categories like Web Exploitation, Cryptography, Forensics, and Reverse Engineering. The Hackathon is a 36-hour event where you build a security tool or solution from scratch.' },
  { q: 'Will accommodation be provided?', a: "Limited accommodation is available on request. Indicate your requirement during registration, and we'll confirm availability. Priority is given to participants traveling from outside the city." },
  { q: 'What should I bring on the event day?', a: "Bring your Registration ID (or QR code), a valid college ID card, and a laptop (required for workshops, CTF, and hackathon). Chargers and accessories are your responsibility." },
  { q: 'Are meals provided during the event?', a: "Yes! All registered participants will receive complimentary breakfast, lunch, and dinner for all three days. Vegetarian and non-vegetarian options will be available." },
  { q: 'What if I register but cannot attend?', a: "Please cancel your registration as soon as possible so someone from the waitlist can attend. Email support@shieldprotocol2026.in with your Registration ID." },
  { q: 'Will I receive a certificate?', a: 'Yes. All participants receive a digital participation certificate. Workshop attendees receive completion certificates. Winners receive special certificates with digital badges.' },
  { q: 'Can I volunteer at The Shield Protocol 2026?', a: 'Absolutely! Volunteers are the backbone of this event. Email volunteer@shieldprotocol2026.in with your details. Volunteers receive certificates, goodies, and direct networking opportunities.' },
]

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))

  return (
    <section id="faqs" className="relative py-24 bg-bg-primary overflow-hidden" aria-label="Frequently asked questions">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="FAQs" title="Got" highlight="Questions?" subtitle="Find answers to the most common questions about The Shield Protocol 2026." />

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mt-10 mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input type="search" placeholder="Search FAQs..." value={search} onChange={e => setSearch(e.target.value)} className="input-cyber w-full pl-12 pr-4 py-3 rounded-xl text-sm" aria-label="Search FAQs" />
        </motion.div>

        {/* FAQs */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.05 }} className="glass-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group" aria-expanded={open === i} aria-controls={`faq-${i}`}>
                <span className="font-space font-semibold text-white group-hover:text-blue-accent transition-colors">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-blue-accent shrink-0">
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted">No matching questions found. Try a different search term.</div>
        )}

        {/* Still have questions */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 glass-card p-8 text-center">
          <h3 className="font-sora font-bold text-xl text-white mb-3">Still have questions?</h3>
          <p className="text-muted text-sm mb-5">Our support team is happy to help you.</p>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-primary text-white font-space font-semibold hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all">
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
