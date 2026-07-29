import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, MapPin, Users, Trophy, Flag,
  BookOpen, Mic, Network, Award, ChevronRight,
  DollarSign, FileText, HelpCircle, Shield, Lock
} from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import GlowButton from '../ui/GlowButton'

const scheduleData = [
  {
    day: 'Day 1',
    date: 'Aug 11, 2026',
    events: [
      { time: '9:00 AM', title: 'Podcast with Santosh Chaluvadi', type: 'talk', duration: '2h', venue: 'Seminar hall' },
      { time: '11:30 AM', title: 'Workshop: Penetration Testing Fundamentals', type: 'workshop', duration: '2h', venue: 'Lab 1' },
      { time: '2:00 PM', title: 'Talk: AI in Cybersecurity', type: 'talk', duration: '1.5h', venue: 'Seminar Hall' },
      { time: '4:00 PM', title: 'Workshop: Cloud Security Best Practices', type: 'workshop', duration: '2h', venue: 'Lab 2' },
      { time: '6:00 PM', title: 'Hackathon Kickoff & Team Formation', type: 'hackathon', duration: '2h', venue: 'Main Auditorium' },
      { time: '8:00 PM', title: 'Networking Dinner', type: 'networking', duration: '2h', venue: 'Cafeteria' },
    ],
  },
  {
    day: 'Day 2',
    date: 'Aug 12, 2026',
    events: [
      { time: '9:00 AM', title: 'CTF Competition Launch', type: 'ctf', duration: '8h', venue: 'Online + Lab 3' },
      { time: '10:00 AM', title: 'Workshop: Digital Forensics', type: 'workshop', duration: '2h', venue: 'Lab 1' },
      { time: '12:00 PM', title: 'Panel: Careers in Cybersecurity', type: 'panel', duration: '2h', venue: 'Seminar Hall' },
      { time: '2:00 PM', title: 'Workshop: Secure Code Review', type: 'workshop', duration: '2h', venue: 'Lab 2' },
      { time: '4:00 PM', title: 'Hackathon Checkpoint', type: 'hackathon', duration: '1h', venue: 'Main Hall' },
      { time: '5:00 PM', title: 'Bug Hunt Competition', type: 'ctf', duration: '3h', venue: 'Online' },
    ],
  },
  {
    day: 'Day 3',
    date: 'Aug 13, 2026',
    events: [
      { time: '9:00 AM', title: 'Hackathon Final Submissions', type: 'hackathon', duration: '2h', venue: 'Main Hall' },
      { time: '11:00 AM', title: 'Hackathon Demo Day & Judging', type: 'hackathon', duration: '3h', venue: 'Main Auditorium' },
      { time: '2:00 PM', title: 'CTF Prize Ceremony', type: 'ctf', duration: '1h', venue: 'Main Auditorium' },
      { time: '3:00 PM', title: 'Talk: Future of Cybersecurity', type: 'talk', duration: '1h', venue: 'Seminar Hall' },
      { time: '4:30 PM', title: 'Prize Distribution Ceremony', type: 'ceremony', duration: '1.5h', venue: 'Main Auditorium' },
      { time: '6:00 PM', title: 'Closing Ceremony', type: 'ceremony', duration: '1h', venue: 'Main Auditorium' },
    ],
  },
  {
    day: 'Day 4',
    date: 'Aug 14, 2026',
    events: [
      { time: '10:00 AM', title: 'Shield-X', type: 'hackathon', duration: '9hrs', venue: 'Seminar Hall' },
      { time: '6:00 PM', title: 'closing ceremony', type: 'ceremony', duration: '1hr', venue: 'Seminar Hall' }
    ]
  }
]

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  workshop: { color: 'text-blue-accent', bg: 'bg-blue-accent/10 border-blue-accent/20', label: 'Workshop' },
  talk: { color: 'text-blue-highlight', bg: 'bg-blue-highlight/10 border-blue-highlight/20', label: 'Talk' },
  hackathon: { color: 'text-warning', bg: 'bg-warning/10 border-warning/20', label: 'Hackathon' },
  ctf: { color: 'text-success', bg: 'bg-success/10 border-success/20', label: 'CTF' },
  panel: { color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20', label: 'Panel' },
  networking: { color: 'text-pink-400', bg: 'bg-pink-400/10 border-pink-400/20', label: 'Networking' },
  ceremony: { color: 'text-blue-primary', bg: 'bg-blue-primary/10 border-blue-primary/20', label: 'Ceremony' },
}

const speakers = [
  {
    name: 'Santosh Chaluvadi',
    title: 'Founder & CEO',
    company: 'Supraja Technologies',
    topic: 'Future of Cyber Security and AI Opportunities in Cyber Domain',
    tag: 'Keynote Speaker',
    image: '/santosh-chaluvadi.png',
  },
]

const CurrentEvent: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0)
  const [activeTab, setActiveTab] = useState<'schedule' | 'speakers' | 'info'>('schedule')

  return (
    <section id="current-event" className="relative py-24 bg-bg-secondary overflow-hidden" aria-label="Current event details">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Current Event"
          title="The Shield Protocol"
          highlight="2026"
          subtitle="Three days. Unlimited possibilities. Join the most anticipated cybersecurity event of the year."
        />

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mt-12 mb-10">
          {[
            { id: 'schedule', label: 'Schedule', icon: <Calendar size={16} /> },
            { id: 'speakers', label: 'Speakers', icon: <Mic size={16} /> },
            { id: 'info', label: 'Info & Rules', icon: <Shield size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-space font-medium transition-all ${activeTab === tab.id
                ? 'bg-blue-primary text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                : 'glass border border-white/10 text-muted hover:text-white hover:border-white/20'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'schedule' && (
            <motion.div key="schedule" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Day selector */}
              <div className="flex gap-2 mb-8 justify-center flex-wrap">
                {scheduleData.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`px-6 py-3 rounded-xl text-sm font-space font-semibold transition-all ${activeDay === i
                      ? 'glass-card border-blue-primary/50 text-blue-accent'
                      : 'glass text-muted hover:text-white border border-white/5'
                      }`}
                  >
                    <div>{d.day}</div>
                    <div className="text-xs opacity-70 mt-0.5">{d.date}</div>
                  </button>
                ))}
              </div>

              {/* Events */}
              <div className="space-y-3">
                {scheduleData[activeDay].events.map((ev, i) => {
                  const cfg = typeConfig[ev.type]
                  // Day 1, 9:00 AM (activeDay === 0 && i === 0) is UNLOCKED. All others are LOCKED.
                  const isLocked = !(activeDay === 0 && i === 0)

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="glass-card p-4 flex items-center gap-4 group relative overflow-hidden border border-white/5 hover:border-blue-primary/30 transition-all"
                    >
                      {/* Inner event content (blurred if locked) */}
                      <div className={`flex items-center gap-4 w-full ${isLocked ? 'filter blur-[5px] opacity-30 select-none pointer-events-none' : ''}`}>
                        <div className="w-20 shrink-0 text-center">
                          <div className="font-space text-sm font-semibold text-white">{ev.time}</div>
                          <div className="text-xs text-muted mt-0.5">{ev.duration}</div>
                        </div>
                        <div className="w-px h-10 bg-white/10 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-space font-semibold text-white truncate">{ev.title}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-muted">
                              <MapPin size={11} /> {ev.venue}
                            </span>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full border font-space shrink-0 ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>

                      {/* Lock Overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center p-3 bg-bg-primary/50 backdrop-blur-[2px]">
                          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-bg-primary/90 border border-blue-primary/40 text-blue-accent shadow-[0_0_20px_rgba(14,165,233,0.3)] text-xs font-space font-semibold tracking-wide">
                            <Lock size={14} className="text-blue-accent shrink-0 animate-pulse" />
                            <span className="text-white/95">Updates of the upcoming session will be given soon</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'speakers' && (
            <motion.div key="speakers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {speakers.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-primary/20 to-transparent flex items-center justify-center text-xl font-bold text-blue-accent font-sora shrink-0 overflow-hidden border border-blue-primary/30 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                        {s.image ? (
                          <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                        ) : (
                          s.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-sora font-bold text-white">{s.name}</div>
                        <div className="text-blue-accent text-xs font-space">{s.title}</div>
                        <div className="text-muted text-xs">{s.company}</div>
                      </div>
                    </div>
                    <div className="border-t border-white/5 pt-4">
                      <div className="text-sm text-muted font-space mb-2">Session</div>
                      <div className="text-white text-sm font-medium">{s.topic}</div>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-primary/10 text-blue-accent border border-blue-primary/20 font-space">
                        {s.tag}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'info' && (
            <motion.div key="info" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Eligibility',
                    icon: <Users size={20} />,
                    items: [
                      'Open to all undergraduate and postgraduate students',
                      'Students from any college/university can participate',
                      'No prior cybersecurity experience required for workshops',
                      'CTF and Hackathon: Teams of 1–4 members',
                      'Valid college ID mandatory for on-site events',
                    ],
                  },
                  {
                    title: 'Venue & Location',
                    icon: <MapPin size={20} />,
                    items: [
                      'Main Auditorium — Opening, Closing, Hackathon Demo',
                      'Seminar Hall — Talks & Panel Discussions',
                      'Lab 1, 2, 3 — Workshops & Competitions',
                      'Cafeteria — Networking & Dining',
                      'Online — CTF Platform accessible worldwide',
                    ],
                  },
                  {
                    title: 'Important Dates',
                    icon: <Calendar size={20} />,
                    items: [
                      'Registration Opens:31st July 2026',
                      'Early Bird Deadline: 31st July 2026',
                      'Registration Closes: 7th August 2026',
                      'Event Day 1: August 11 2026',
                      'Event Day 2: August 12 2026',
                      'Event Day 3: August 13 2026',
                      'Hackathon starts: August 14 2026',

                    ],
                  },
                  {
                    title: 'Rules & Guidelines',
                    icon: <Shield size={20} />,
                    items: [
                      'All participants must abide by the code of conduct',
                      'No plagiarism or copying in hackathon projects',
                      'CTF: No sharing of flags or cheating',
                      'Respect fellow participants and mentors',
                      'Decisions of judges are final and binding',
                    ],
                  },
                  {
                    title: 'Certificates',
                    icon: <Award size={20} />,
                    items: [
                      'Participation certificates for all registered attendees',
                      'Workshop completion certificates',
                      'Winner certificates',


                    ],
                  },
                  {
                    title: 'Accommodation & Food',
                    icon: <FileText size={20} />,
                    items: [
                      'No accommodation available',
                      'No Meals provided',

                    ],
                  },
                ].map((sec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card p-6"
                  >
                    <h3 className="font-sora font-bold text-lg text-white mb-4 flex items-center gap-3">
                      <span className="text-blue-accent">{sec.icon}</span>
                      {sec.title}
                    </h3>
                    <ul className="space-y-2">
                      {sec.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted">
                          <ChevronRight size={14} className="text-blue-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

export default CurrentEvent
