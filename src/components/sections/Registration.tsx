import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Shield, Award, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import GlowButton from '../ui/GlowButton'

// =================================================================
//  REPLACE this URL with your actual Google Form or SurveyHeart link
//  e.g. "https://forms.google.com/..." or "https://surveyheart.com/form/..."
// =================================================================
const REGISTRATION_FORM_URL = 'https://forms.google.com'

const perks = [
  { icon: <Shield size={20} />, text: 'Access to all Keynotes & Cyber Workshops' },
  { icon: <Award size={20} />, text: 'Participation Certificate for all attendees' },
  { icon: <Users size={20} />, text: 'Network with 200+ Cyber Professionals & Mentors' },
  { icon: <Zap size={20} />, text: 'Compete in Shield X Hackathon & CTF' },
]

const Registration: React.FC = () => {
  return (
    <section
      id="register"
      className="relative py-24 bg-bg-primary overflow-hidden"
      aria-label="Event registration"
    >
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px neon-line" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(14,165,233,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Join The Event"
          title="Register"
          highlight="Now"
          subtitle="Secure your spot at The Shield Protocol 2026. Click the link below to open the official registration form."
        />

        <div className="mt-14 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12 relative overflow-hidden border border-blue-primary/30 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-primary/10 text-blue-accent border border-blue-primary/20 text-xs font-space font-semibold mb-6">
              <CheckCircle size={14} /> Registration Open
            </div>

            <h3 className="font-sora font-bold text-2xl md:text-4xl text-white mb-4">
              Ready to Join <span className="gradient-text">The Shield Protocol 2026?</span>
            </h3>

            <p className="text-muted text-base max-w-2xl mx-auto mb-8 font-outfit leading-relaxed">
              Fill out our simple online form to complete your registration.— just click below to fill out the form!
            </p>

            {/* Event Perks Grid */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
              {perks.map((p, i) => (
                <div key={i} className="flex items-center gap-3 glass p-4 rounded-xl border border-white/5">
                  <div className="p-2 rounded-lg bg-blue-primary/10 text-blue-accent shrink-0">
                    {p.icon}
                  </div>
                  <span className="text-white text-sm font-space leading-snug">{p.text}</span>
                </div>
              ))}
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={REGISTRATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-primary text-white font-space font-bold text-base hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] hover:scale-[1.02] transition-all"
              >
                <span>Complete Registration Form</span>
                <ExternalLink size={18} />
              </a>
            </div>

            <p className="text-xs text-muted font-space mt-4">
              ℹ️ Clicking will open the Registration Form in a new tab.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Registration
