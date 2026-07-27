import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ClipboardList, Zap, Shield, Users, Award } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import GlowButton from '../ui/GlowButton'

// ─────────────────────────────────────────────────────────────────
//  REPLACE this URL with your actual SurveyHeart form link
//  e.g. "https://surveyheart.com/form/YOUR_FORM_ID"
// ─────────────────────────────────────────────────────────────────
const SURVEYHEART_URL = 'https://surveyheart.com/form/YOUR_FORM_ID'
const SURVEYHEART_EMBED = 'https://surveyheart.com/form/YOUR_FORM_ID#welcome'

const perks = [
  { icon: <Shield size={18} />, text: 'Free entry to all events & workshops' },
  { icon: <Award size={18} />, text: 'Participation certificate for all attendees' },
  { icon: <Users size={18} />, text: 'Network with 1200+ cyber professionals' },
  { icon: <Zap size={18} />, text: 'Compete in CTF and win ₹1,00,000+ in prizes' },
]

const Registration: React.FC = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  return (
    <section
      id="register"
      className="relative py-24 bg-bg-primary overflow-hidden"
      aria-label="Participant registration"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,165,233,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Join The Event"
          title="Register"
          highlight="Now"
          subtitle="Fill out the registration form below to secure your spot at The Shield Protocol 2026. Free for all students."
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-10 items-start">

          {/* Left — perks + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Info card */}
            <div className="glass-card p-7">
              <h3 className="font-sora font-bold text-xl text-white mb-5">
                Why <span className="gradient-text">Register?</span>
              </h3>
              <ul className="space-y-4">
                {perks.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-blue-primary/10 text-blue-accent shrink-0">
                      {p.icon}
                    </div>
                    <span className="text-muted text-sm leading-snug">{p.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Event details card */}
            <div className="glass-card p-7 space-y-4">
              <h3 className="font-sora font-bold text-lg text-white mb-1">
                Event <span className="gradient-text">Details</span>
              </h3>
              {[
                ['📅 Date', 'September 15 – 17, 2026'],
                ['📍 Venue', 'Engineering College Auditorium'],
                ['💸 Entry Fee', 'Absolutely Free'],
                ['📋 Registration', 'Open Now'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-sm font-space font-semibold text-muted w-28 shrink-0">
                    {label}
                  </span>
                  <span className="text-sm text-white">{value}</span>
                </div>
              ))}
            </div>

            {/* Open in new tab button */}
            <GlowButton
              variant="outline"
              size="md"
              fullWidth
              icon={<ExternalLink size={16} />}
              onClick={() => window.open(SURVEYHEART_URL, '_blank', 'noopener,noreferrer')}
            >
              Open Form in New Tab
            </GlowButton>

            {/* Note */}
            <p className="text-muted/50 text-xs text-center font-space">
              Powered by SurveyHeart · Your responses are secure
            </p>
          </motion.div>

          {/* Right — SurveyHeart iframe embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass-card overflow-hidden relative" style={{ minHeight: 700 }}>

              {/* Loading skeleton while iframe loads */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-bg-secondary">
                  <div className="relative">
                    <div className="w-14 h-14 border-2 border-blue-primary/30 border-t-blue-primary rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ClipboardList size={20} className="text-blue-accent" />
                    </div>
                  </div>
                  <p className="text-muted text-sm font-space">Loading registration form…</p>
                </div>
              )}

              <iframe
                src={SURVEYHEART_EMBED}
                title="The Shield Protocol 2026 — Registration Form"
                width="100%"
                height="700"
                frameBorder="0"
                allow="camera; microphone"
                className={`w-full transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIframeLoaded(true)}
                aria-label="Registration form powered by SurveyHeart"
              />

              {/* Bottom glow edge */}
              <div
                className="absolute bottom-0 inset-x-0 h-1 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #0EA5E9, #38BDF8, #0EA5E9, transparent)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* Placeholder notice when URL is not yet set */}
            {SURVEYHEART_URL.includes('YOUR_FORM_ID') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl border border-warning/30 bg-warning/5 text-warning text-sm font-space flex items-start gap-3"
                role="alert"
              >
                <span className="text-lg shrink-0">⚠️</span>
                <div>
                  <strong>Setup required:</strong> Replace{' '}
                  <code className="text-xs bg-white/10 px-1 py-0.5 rounded">YOUR_FORM_ID</code>{' '}
                  in{' '}
                  <code className="text-xs bg-white/10 px-1 py-0.5 rounded">
                    src/components/sections/Registration.tsx
                  </code>{' '}
                  with your actual SurveyHeart form ID.
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Registration
