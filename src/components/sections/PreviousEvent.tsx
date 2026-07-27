import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mic, BookOpen, Code2, Trophy, Flag, Gift, X as Close,
  Star, Users, Calendar, MapPin
} from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const timeline = [
  {
    icon: <Star size={20} />,
    title: 'Opening Ceremony',
    date: 'Day 1 • 9:30 AM',
    description: 'Keynote by the Mr.Santosh Chaluvadi , inauguration of The Shield Protocol 2025, and an inspiring address from the Heads of Department setting the tone for three days of innovation.',
    highlights: ['Keynote by the Mr.Santosh Chaluvadi', 'Event Launch'],
    color: 'blue-primary',
  },
  {
    icon: <Mic size={20} />,
    title: 'Guest Talks',
    date: 'Day 1 • 11:00 AM',
    description: 'Industry veterans and cybersecurity experts shared real-world threat intelligence, career insights, and the future of AI-driven security. A series of inspiring sessions that kept the audience riveted.',
    highlights: ['8 Expert Speakers', 'Live Q&A Sessions', 'Career Panel'],
    color: 'blue-accent',
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Hands-on Workshops',
    date: 'Day 2 • All Day',
    description: 'Technical workshops covering Penetration Testing, Cloud Security, Digital Forensics, AI Security Tools, and Secure Software Development. Participants got hands-on lab access.',
    highlights: ['3 Workshops', '200+ Participants', 'Live Labs'],
    color: 'blue-highlight',
  },

  {
    icon: <Flag size={20} />,
    title: 'Capture The Flag',
    date: 'Day 3 • 10:00 AM',
    description: 'A high-stakes CTF competition with 50 challenges across Web Exploitation, Cryptography, Reverse Engineering, Forensics, and OSINT. The scoreboard kept everyone on edge.',
    highlights: ['50 Challenges', '200+ Players', 'Live Leaderboard'],
    color: 'blue-accent',

  },
  {
    icon: <Code2 size={20} />,
    title: 'Shield X Hackathon',
    date: 'Day 4 • 9 Hours',
    description: 'An intense 9-hour hackathon where 120+ teams built innovative cybersecurity solutions across AI, Blockchain, IoT, and Cloud domains. Mentored by 25+ industry experts.',
    highlights: ['50+ Teams', '9 Hours', 'Internship Offers.'],
    color: 'blue-primary',
  },
  {
    icon: <Users size={20} />,
    title: 'Competitions & Events',
    date: 'Day 4 ',
    description: 'Multiple side competitions including Bug Hunt, Social Engineering Awareness, Secure Coding Challenge, and Security Quiz Bowl added to the competitive spirit.',
    highlights: ['6 Competitions', 'All Levels Welcome', 'Special Awards'],
    color: 'blue-highlight',
  },
  {
    icon: <Trophy size={20} />,
    title: 'Prize Distribution',
    date: 'Day 4 • 4:00 PM',
    description: 'The Internship Offer Letters ceremony honored the best hackers and builders internship offers and Participation Certificates were awarded to  performers.',
    highlights: ['Internship Offers', 'Certificates'],
    color: 'blue-primary',
  },
  {
    icon: <Gift size={20} />,
    title: 'Closing Ceremony',
    date: 'Day 4 • 6:00 PM',
    description: 'A memorable closing ceremony with performances, reflections, and announcements for The Shield Protocol 2026. The community came together to celebrate achievement and growth.',
    highlights: ['Announcements'],
    color: 'blue-accent',
  },
]

const PreviousEvent: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="previous-event" className="relative py-24 bg-bg-secondary overflow-hidden" aria-label="Previous event proceedings">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Event Proceedings"
          title="Previous Event"
          highlight="Highlights"
          subtitle="Relive the incredible journey of The Shield Protocol 2025 — a three-day cybersecurity extravaganza that brought together over 200+ participants."
        />

        {/* Event meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-8 mb-16 text-sm text-muted"
        >
          {[
            { icon: <Calendar size={14} />, label: 'September 8–11, 2025' },
            { icon: <MapPin size={14} />, label: 'BITS VIZAG Auditorium' },
            { icon: <Users size={14} />, label: '200+ Participants' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/10">
              <span className="text-blue-accent">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-primary/50 via-blue-primary/20 to-transparent md:-translate-x-px" aria-hidden="true" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-8 h-8 rounded-full bg-bg-secondary border-2 border-${item.color} flex items-center justify-center text-blue-accent cursor-pointer`}
                    onClick={() => setSelected(selected === i ? null : i)}
                    role="button"
                    aria-label={`View ${item.title} details`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelected(selected === i ? null : i)}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`ml-14 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelected(selected === i ? null : i)}
                    className={`glass-card p-6 cursor-pointer transition-all ${selected === i ? 'border-blue-primary/50 shadow-[0_0_20px_rgba(14,165,233,0.15)]' : ''
                      }`}
                    role="button"
                    aria-expanded={selected === i}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-xs font-space text-blue-accent uppercase tracking-wider">
                          {item.date}
                        </span>
                        <h3 className="font-sora font-bold text-lg text-white mt-1">{item.title}</h3>
                      </div>
                      <div className={`p-2 rounded-lg bg-${item.color}/10 text-blue-accent shrink-0`}>
                        {item.icon}
                      </div>
                    </div>

                    <p className="text-muted text-sm leading-relaxed mb-4">{item.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h, j) => (
                        <span
                          key={j}
                          className="text-xs px-3 py-1 rounded-full bg-blue-primary/10 text-blue-accent border border-blue-primary/20 font-space"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-card p-8 text-center"
        >
          <h3 className="font-sora font-bold text-2xl text-white mb-8">
            By the <span className="gradient-text">Numbers</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '200+', label: 'Total Participants' },
              { value: '6', label: 'Events & Competitions' },
              { value: '3', label: 'Days of Action' },
              { value: '1', label: 'Day of Hackathon' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-sora font-bold text-3xl gradient-text mb-1">{s.value}</div>
                <div className="text-muted text-sm font-space uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PreviousEvent
