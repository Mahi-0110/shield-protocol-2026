import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, MapPin, Users, Trophy, Flag,
  BookOpen, Mic, Network, Award, ChevronRight,
  DollarSign, FileText, HelpCircle, Shield, Lock, X, CheckCircle2
} from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import GlowButton from '../ui/GlowButton'

const scheduleData = [
  {
    day: 'Day 1',
    date: 'Aug 11, 2026',
    events: [
      { title: 'Podcast with Santosh Chaluvadi', type: 'Podcast', venue: 'Seminar hall' },
      { title: 'INTRODUCTION TO WEB APP PENTESTING ', type: 'workshop', venue: 'Seminar hall' },
      { title: 'AUTOMATED TESTING', type: 'workshop', venue: 'Seminar Hall' },
      { title: 'MANUAL TESTING ', type: 'workshop', venue: 'Seminar Hall' },
      { title: 'OWASP TOP 10 ', type: 'workshop', venue: 'Seminar Hall' },

    ],
  },
  {
    day: 'Day 2',
    date: 'Aug 12, 2026',
    events: [
      { title: 'OWASP TOP 10 2025 ', type: 'workshop', venue: 'Seminar Hall' },
      { title: 'SQL INJECTIONS ', type: 'workshop', venue: 'Seminar Hall' },
      { title: 'BUSINESS LOGIC VULNERABILITIES ', type: 'workshop', venue: 'Seminar Hall' },
      { title: 'REPORT WRITING ', type: 'workshop', venue: 'Seminar Hall' },
    ],
  },
  {
    day: 'Day 3',
    date: 'Aug 13, 2026',
    events: [
      { title: 'FUNDAMENTALS OF CYBER FORENSICS ', type: 'workshop', venue: 'Seminar Hall' },
      { title: 'EVIDENCE ACQUISITION ', type: 'workshop', venue: 'Seminar Hall' },
      { title: 'PASSWORD RECOVERY', type: 'workshop', venue: 'Seminar Hall' },
      { title: 'CYBER CRIME ANALYSIS ', type: 'workshop', venue: 'Seminar Hall' },
    ],
  },
  {
    day: 'Day 4',
    date: 'Aug 14, 2026',
    events: [
      { title: ' Shield-X Hackathon', type: 'Hackathon', venue: 'Seminar Hall' },
      { title: 'Closing Ceremony', type: 'ceremony', venue: 'Seminar Hall' }
    ]
  }
]

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  podcast: { color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20', label: 'Podcast' },
  Podcast: { color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20', label: 'Podcast' },
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
  {
    name: 'Kumar',
    title: 'Security Analyst',
    company: 'Supraja Technologies',
    topic: 'Cyber Security Operations & Threat Analysis',
    tag: 'Guest Speaker',
    image: '/kumar.jpg',
  },
  {
    name: 'Krishna',
    title: 'Security Analyst',
    company: 'Supraja Technologies',
    topic: 'Vulnerability Assessment & Network Defense',
    tag: 'Guest Speaker',
    image: '/krishna.jpg',
  },
]

const CurrentEvent: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0)
  const [activeTab, setActiveTab] = useState<'schedule' | 'speakers' | 'info'>('schedule')
  const [selectedEvent, setSelectedEvent] = useState<{
    event: typeof scheduleData[0]['events'][0];
    day: string;
    date: string;
    isLocked: boolean;
  } | null>(null)

  return (
    <section id="current-event" className="relative py-24 bg-bg-secondary overflow-hidden" aria-label="Current event details">
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Current Event"
          title="The Shield Protocol"
          highlight="2026"
          subtitle="Four days. Unlimited possibilities. Join the most anticipated cybersecurity event of the year."
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
                  const cfg = typeConfig[ev.type] || typeConfig[ev.type?.toLowerCase()] || {
                    color: 'text-blue-accent',
                    bg: 'bg-blue-accent/10 border-blue-accent/20',
                    label: ev.type || 'Event',
                  }
                  // All events are currently UNLOCKED.
                  const isLocked = false

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => {
                        if (!isLocked) {
                          setSelectedEvent({ event: ev, day: scheduleData[activeDay].day, date: scheduleData[activeDay].date, isLocked: false })
                        }
                      }}
                      className={`glass-card p-4 flex items-center gap-4 group relative overflow-hidden border border-white/5 transition-all ${isLocked ? 'cursor-not-allowed' : 'hover:border-blue-primary/40 hover:scale-[1.005] active:scale-[0.995] cursor-pointer'
                        }`}
                    >
                      {/* Inner event content (blurred if locked) */}
                      <div className={`flex items-center gap-4 w-full ${isLocked ? 'filter blur-[5px] opacity-30 select-none pointer-events-none' : ''}`}>
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

                      {/* Lock Overlay (Fully Locked - Cannot be opened or accessed) */}
                      {isLocked && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center p-3 bg-bg-primary/70 backdrop-blur-[4px] select-none cursor-not-allowed">
                          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-bg-primary/95 border border-blue-primary/30 text-blue-accent shadow-[0_0_20px_rgba(14,165,233,0.25)] text-xs font-space font-semibold tracking-wide">
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
                    title: 'Registration Steps',
                    icon: <FileText size={20} />,
                    items: [
                      'Step 1: Complete registration form with accurate personal & college details',
                      'Step 2: Submit fee payment via UPI/QR and enter valid UTR / Transaction ID',
                      'Step 3: Upload clear payment proof screenshot for admin verification',
                      'Step 4: Receive official confirmation email with your unique Registration ID',
                    ],
                  },
                  {
                    title: 'Registration Rules',
                    icon: <Shield size={20} />,
                    items: [
                      'Registration ID & Pass email are mandatory for physical entry at venue',
                      'Fees are strictly non-refundable and non-transferable once submitted',
                      'Provide valid email & phone number to ensure pass delivery',
                      'Individual registration for sessions',
                      'Registrations strictly close on 7th August 2026 at 11:59 PM',
                    ],
                  },
                  {
                    title: 'Eligibility',
                    icon: <Users size={20} />,
                    items: [
                      'No prior cybersecurity experience required for workshops',
                      'CTF and Hackathon: Teams of 1–4 members',
                      'Valid Registration ID mandatory for on-site events',
                    ],
                  },
                  {
                    title: 'Venue & Location',
                    icon: <MapPin size={20} />,
                    items: [
                      'Bits Vizag',
                      'Central Seminar Hall',
                    ],
                  },
                  {
                    title: 'Important Dates',
                    icon: <Calendar size={20} />,
                    items: [
                      'Registration Opens: 31st July 2026',
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
                      'Certificate of Excellence',
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

        {/* Session Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xl bg-bg-primary/80">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg glass-card p-6 sm:p-8 border border-blue-primary/40 rounded-2xl shadow-[0_0_50px_rgba(14,165,233,0.3)] my-8 text-left"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 text-muted hover:text-white glass rounded-xl border border-white/10 hover:border-blue-primary/40 transition-all cursor-pointer"
                  aria-label="Close session modal"
                >
                  <X size={18} />
                </button>

                {/* Modal Category Badge */}
                {(() => {
                  const cfg = typeConfig[selectedEvent.event.type] || typeConfig[selectedEvent.event.type?.toLowerCase()] || {
                    color: 'text-blue-accent',
                    bg: 'bg-blue-accent/10 border-blue-accent/20',
                    label: selectedEvent.event.type || 'Session',
                  }
                  return (
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3.5 py-1 rounded-full text-xs font-space font-bold border ${cfg.bg} ${cfg.color}`}>
                        Session Type: {cfg.label}
                      </span>
                      {selectedEvent.isLocked && (
                        <span className="px-3 py-1 rounded-full text-xs font-space font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                          <Lock size={12} /> Locked Session
                        </span>
                      )}
                    </div>
                  )
                })()}

                {/* Session Title */}
                <h3 className="font-sora font-extrabold text-xl sm:text-2xl text-white mb-4 leading-snug">
                  {selectedEvent.event.title}
                </h3>

                {/* Info Grid */}
                <div className="space-y-3 glass p-4 rounded-xl border border-white/5 mb-6 text-xs sm:text-sm font-outfit">
                  <div className="flex items-center justify-between text-muted border-b border-white/5 pb-2">
                    <span className="font-space font-medium">Session Type:</span>
                    <span className="text-blue-accent font-bold uppercase tracking-wider">{selectedEvent.event.type}</span>
                  </div>

                  <div className="flex items-center justify-between text-muted border-b border-white/5 pb-2">
                    <span className="font-space font-medium">Schedule Day:</span>
                    <span className="text-white font-medium">{selectedEvent.day} ({selectedEvent.date})</span>
                  </div>

                  <div className="flex items-center justify-between text-muted">
                    <span className="font-space font-medium">Venue:</span>
                    <span className="text-emerald-400 font-semibold">{selectedEvent.event.venue}</span>
                  </div>
                </div>

                {/* Status Note */}
                {selectedEvent.isLocked ? (
                  <div className="p-4 rounded-xl bg-blue-primary/10 border border-blue-primary/30 text-blue-accent text-xs font-space flex items-center gap-3">
                    <Lock size={18} className="shrink-0 animate-pulse" />
                    <p className="leading-relaxed">
                      <strong>Upcoming Session Notice:</strong> Updates of the upcoming session will be given soon. Stay tuned!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-space flex items-center gap-3">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <p className="leading-relaxed">
                      <strong>Session Unlocked:</strong> Keynote podcast featuring Santosh Chaluvadi (Founder & CEO, Supraja Technologies).
                    </p>
                  </div>
                )}

                <div className="mt-6 text-right">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-6 py-2.5 rounded-xl bg-blue-primary text-white font-space font-semibold text-xs hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

export default CurrentEvent
